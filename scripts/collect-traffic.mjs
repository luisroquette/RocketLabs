import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const metricsDir = path.join(root, "metrics");
const snapshotsDir = path.join(metricsDir, "snapshots");
const configPath = path.join(metricsDir, "config.json");
const dashboardPath = path.join(metricsDir, "README.md");
const dailyPath = path.join(metricsDir, "daily.csv");
const validateOnly = process.argv.includes("--validate");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

function writeAtomic(file, content) {
  const temporary = `${file}.tmp`;
  writeFileSync(temporary, content);
  renameSync(temporary, file);
}

function validateDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    fail(`invalid snapshot date: ${value}`);
  }
  return value;
}

function snapshotDate() {
  const argument = process.argv.find((item) => item.startsWith("--date="));
  return validateDate(
    argument?.slice("--date=".length) ??
      process.env.SNAPSHOT_DATE ??
      new Date().toISOString().slice(0, 10)
  );
}

function loadConfig() {
  if (!existsSync(configPath)) fail("metrics/config.json is missing");
  const config = readJson(configPath);

  if (!config.owner || !Array.isArray(config.repositories)) {
    fail("metrics/config.json must define owner and repositories");
  }

  const names = new Set();
  for (const repository of config.repositories) {
    if (!repository.name || !repository.label) {
      fail("every tracked repository needs name and label");
    }
    if (names.has(repository.name)) {
      fail(`duplicate tracked repository: ${repository.name}`);
    }
    names.add(repository.name);
  }

  return config;
}

function ghApi(endpoint) {
  try {
    const output = execFileSync(
      "gh",
      [
        "api",
        endpoint,
        "-H",
        "Accept: application/vnd.github+json",
        "-H",
        "X-GitHub-Api-Version: 2022-11-28"
      ],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
    return JSON.parse(output);
  } catch (error) {
    const details = error.stderr?.toString().trim() || error.message;
    fail(`GitHub API request failed for ${endpoint}: ${details}`);
  }
}

function csv(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function readDailyRows() {
  if (!existsSync(dailyPath)) return new Map();
  const lines = readFileSync(dailyPath, "utf8").trim().split("\n").slice(1);
  const rows = new Map();

  for (const line of lines) {
    if (!line) continue;
    const [date, repository, views, uniqueVisitors, clones, uniqueCloners] =
      line.split(",");
    rows.set(`${date}|${repository}`, {
      date,
      repository,
      views: Number(views),
      uniqueVisitors: Number(uniqueVisitors),
      clones: Number(clones),
      uniqueCloners: Number(uniqueCloners)
    });
  }

  return rows;
}

function mergeDaily(snapshot) {
  const rows = readDailyRows();

  for (const repository of snapshot.repositories) {
    const byDate = new Map();

    for (const item of repository.views.daily) {
      const date = item.timestamp.slice(0, 10);
      byDate.set(date, {
        date,
        repository: repository.name,
        views: item.count,
        uniqueVisitors: item.uniques,
        clones: 0,
        uniqueCloners: 0
      });
    }

    for (const item of repository.clones.daily) {
      const date = item.timestamp.slice(0, 10);
      const row = byDate.get(date) ?? {
        date,
        repository: repository.name,
        views: 0,
        uniqueVisitors: 0,
        clones: 0,
        uniqueCloners: 0
      };
      row.clones = item.count;
      row.uniqueCloners = item.uniques;
      byDate.set(date, row);
    }

    for (const row of byDate.values()) {
      rows.set(`${row.date}|${row.repository}`, row);
    }
  }

  const ordered = [...rows.values()].sort(
    (a, b) =>
      a.date.localeCompare(b.date) || a.repository.localeCompare(b.repository)
  );
  const header =
    "date,repository,views,unique_visitors,clones,unique_cloners\n";
  const body = ordered
    .map((row) =>
      [
        row.date,
        row.repository,
        row.views,
        row.uniqueVisitors,
        row.clones,
        row.uniqueCloners
      ]
        .map(csv)
        .join(",")
    )
    .join("\n");

  writeAtomic(dailyPath, `${header}${body}${body ? "\n" : ""}`);
}

function listSnapshots(excludeDate) {
  if (!existsSync(snapshotsDir)) return [];
  return readdirSync(snapshotsDir)
    .filter((file) => /^\d{4}-\d{2}-\d{2}\.json$/.test(file))
    .filter((file) => !excludeDate || file !== `${excludeDate}.json`)
    .sort()
    .map((file) => ({
      file,
      data: readJson(path.join(snapshotsDir, file))
    }));
}

function conversion(current, previous) {
  if (!previous || current.views.uniques === 0) return "—";
  const prior = previous.repositories.find(
    (repository) => repository.name === current.name
  );
  if (!prior) return "—";
  const delta = Math.max(0, current.stars - prior.stars);
  return `${((delta / current.views.uniques) * 100).toFixed(1)}%`;
}

function updateDashboard(snapshot, previousSnapshots) {
  const dashboard = readFileSync(dashboardPath, "utf8");
  const previous = previousSnapshots.at(-1)?.data;
  const mostVisited = [...snapshot.repositories].sort(
    (a, b) => b.views.uniques - a.views.uniques
  )[0];
  const rows = snapshot.repositories
    .map((repository) => {
      const referrer = repository.referrers[0];
      const origin = referrer
        ? `${referrer.referrer} (${referrer.uniques} unique)`
        : "—";
      return `| [${repository.label}](${repository.url}) | ${repository.views.count} | ${repository.views.uniques} | ${repository.clones.count} | ${repository.clones.uniques} | ${origin} | ${repository.stars} | ${conversion(repository, previous)} |`;
    })
    .join("\n");
  const history = [
    ...previousSnapshots.map(({ file }) => file),
    `${snapshot.date}.json`
  ]
    .sort()
    .reverse()
    .map((file) => `- [${file.replace(".json", "")}](./snapshots/${file})`)
    .join("\n");
  const generated = `<!-- TRAFFIC:START -->
## Latest snapshot

Collected **${snapshot.collectedAt}**. Traffic totals cover GitHub's rolling
14-day window.

**Most accessed project:** ${mostVisited.label} with ${mostVisited.views.uniques}
unique visitors.

| Project | Views | Unique visitors | Clones | Unique cloners | Top referrer | Stars | Approx. conversion |
|---|---:|---:|---:|---:|---|---:|---:|
${rows}

### Snapshot history

${history}
<!-- TRAFFIC:END -->`;
  const marker = /<!-- TRAFFIC:START -->[\s\S]*<!-- TRAFFIC:END -->/;

  if (!marker.test(dashboard)) {
    fail("metrics/README.md is missing traffic markers");
  }
  writeAtomic(dashboardPath, dashboard.replace(marker, generated));
}

function validateStoredMetrics(config) {
  const dashboard = readFileSync(dashboardPath, "utf8");
  if (
    !dashboard.includes("<!-- TRAFFIC:START -->") ||
    !dashboard.includes("<!-- TRAFFIC:END -->")
  ) {
    fail("metrics dashboard markers are missing");
  }

  const snapshots = listSnapshots();
  for (const { file, data } of snapshots) {
    if (data.schemaVersion !== 1 || !Array.isArray(data.repositories)) {
      fail(`invalid snapshot schema: ${file}`);
    }
    const names = new Set(data.repositories.map((repository) => repository.name));
    for (const repository of config.repositories) {
      if (!names.has(repository.name)) {
        fail(`snapshot ${file} is missing ${repository.name}`);
      }
    }
  }

  console.log(
    `Traffic metrics valid: ${config.repositories.length} repositories, ${snapshots.length} snapshots.`
  );
}

const config = loadConfig();

if (validateOnly) {
  validateStoredMetrics(config);
  process.exit(0);
}

const date = snapshotDate();
const collectedAt = new Date().toISOString();
const repositories = config.repositories.map(({ name, label }) => {
  const base = `repos/${config.owner}/${name}`;
  const metadata = ghApi(base);
  const views = ghApi(`${base}/traffic/views?per=day`);
  const clones = ghApi(`${base}/traffic/clones?per=day`);
  const referrers = ghApi(`${base}/traffic/popular/referrers`);
  const popularPaths = ghApi(`${base}/traffic/popular/paths`);

  return {
    name,
    label,
    nameWithOwner: `${config.owner}/${name}`,
    url: metadata.html_url,
    stars: metadata.stargazers_count,
    forks: metadata.forks_count,
    views: {
      count: views.count,
      uniques: views.uniques,
      daily: views.views
    },
    clones: {
      count: clones.count,
      uniques: clones.uniques,
      daily: clones.clones
    },
    referrers,
    popularPaths
  };
});
const snapshot = {
  schemaVersion: 1,
  date,
  collectedAt,
  timezone: "UTC",
  windowDays: 14,
  repositories
};

mkdirSync(snapshotsDir, { recursive: true });
const previousSnapshots = listSnapshots(date);
writeAtomic(
  path.join(snapshotsDir, `${date}.json`),
  `${JSON.stringify(snapshot, null, 2)}\n`
);
mergeDaily(snapshot);
updateDashboard(snapshot, previousSnapshots);
validateStoredMetrics(config);

console.log(`Traffic snapshot saved for ${date}.`);
