import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projects = JSON.parse(await readFile(path.join(root, "projects.json"), "utf8"));
const languages = {
  pt: {
    file: "README.md",
    description: "descriptionPt",
    headers: ["Projeto", "O que resolve", "Categoria", "Estado", "Uso"],
    statuses: {
      active: "🟢 Ativo",
      evolving: "🟡 Em evolução",
      reference: "🔵 Referência"
    },
    access: {
      mit: "MIT",
      "public-code": "Código público"
    }
  },
  en: {
    file: "README.en.md",
    description: "descriptionEn",
    headers: ["Project", "What it solves", "Category", "Status", "Use"],
    statuses: {
      active: "🟢 Active",
      evolving: "🟡 Evolving",
      reference: "🔵 Reference"
    },
    access: {
      mit: "MIT",
      "public-code": "Public code"
    }
  }
};

const start = "<!-- PROJECTS:START -->";
const end = "<!-- PROJECTS:END -->";
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);

for (const [language, config] of Object.entries(languages)) {
  const readmePath = path.join(root, config.file);
  const readme = await readFile(readmePath, "utf8");

  const rows = projects.map((project) => {
    const demo = project.demo ? ` · [demo](${project.demo})` : "";
    const access = project.access === "mit"
      ? `[MIT](${project.repository}/blob/HEAD/LICENSE)`
      : config.access[project.access];
    return `| [${project.name}](${project.repository})${demo} | ${project[config.description]} | ${project.category} | ${config.statuses[project.status]} | ${access} |`;
  });

  const header = `| ${config.headers.join(" | ")} |`;
  const separator = `|${config.headers.map(() => "---").join("|")}|`;
  const table = [header, separator, ...rows].join("\n");

  if (!pattern.test(readme)) {
    throw new Error(`Marcadores PROJECTS não encontrados em ${config.file}.`);
  }

  const next = readme.replace(pattern, `${start}\n${table}\n${end}`);
  await writeFile(readmePath, next);
  console.log(`${config.file} atualizado com ${projects.length} projetos (${language}).`);
}
