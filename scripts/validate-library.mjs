import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const guides = [
  "open-source-playbook.md",
  "security-checklist.md",
  "launch-checklist.md",
  "distribution-playbook.md",
  "project-comparison.md"
];
const libraryDocs = [
  "docs/README.md",
  ...guides.flatMap((guide) => [
    `docs/pt-BR/${guide}`,
    `docs/en/${guide}`
  ])
];
const errors = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    errors.push(`arquivo ausente: ${relativePath}`);
    return false;
  }
}

await exists("docs/README.md");
await exists("templates/README.pt-BR.md");
await exists("templates/README.en.md");

for (const guide of guides) {
  const ptPath = `docs/pt-BR/${guide}`;
  const enPath = `docs/en/${guide}`;
  const [hasPt, hasEn] = await Promise.all([exists(ptPath), exists(enPath)]);

  if (hasPt) {
    const content = await readFile(path.join(root, ptPath), "utf8");
    if (!content.includes(`../en/${guide}`)) {
      errors.push(`link para inglês ausente: ${ptPath}`);
    }
  }

  if (hasEn) {
    const content = await readFile(path.join(root, enPath), "utf8");
    if (!content.includes(`../pt-BR/${guide}`)) {
      errors.push(`link para português ausente: ${enPath}`);
    }
  }
}

const readmes = {
  "README.md": [
    "./docs/pt-BR/open-source-playbook.md",
    "./docs/pt-BR/security-checklist.md",
    "./templates/README.pt-BR.md",
    "./docs/pt-BR/launch-checklist.md",
    "./docs/pt-BR/distribution-playbook.md",
    "./docs/pt-BR/project-comparison.md"
  ],
  "README.en.md": [
    "./docs/en/open-source-playbook.md",
    "./docs/en/security-checklist.md",
    "./templates/README.en.md",
    "./docs/en/launch-checklist.md",
    "./docs/en/distribution-playbook.md",
    "./docs/en/project-comparison.md"
  ]
};

for (const [readme, links] of Object.entries(readmes)) {
  const content = await readFile(path.join(root, readme), "utf8");
  for (const link of links) {
    if (!content.includes(link)) errors.push(`link ausente em ${readme}: ${link}`);
  }
}

for (const relativePath of libraryDocs) {
  const content = await readFile(path.join(root, relativePath), "utf8");
  const links = content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g);

  for (const match of links) {
    const target = match[1].split("#")[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;

    const resolved = path.resolve(root, path.dirname(relativePath), target);
    try {
      await access(resolved);
    } catch {
      errors.push(`link local inválido em ${relativePath}: ${target}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Biblioteca válida: ${guides.length + 1} recursos, 2 idiomas.`);
