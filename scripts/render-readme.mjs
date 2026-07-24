import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projects = JSON.parse(await readFile(path.join(root, "projects.json"), "utf8"));
const readmePath = path.join(root, "README.md");
const readme = await readFile(readmePath, "utf8");

const labels = {
  active: "🟢 Ativo",
  evolving: "🟡 Em evolução",
  reference: "🔵 Referência"
};

const rows = projects.map((project) => {
  const demo = project.demo ? ` · [demo](${project.demo})` : "";
  return `| [${project.name}](${project.repository})${demo} | ${project.description} | ${project.category} | ${labels[project.status]} |`;
});

const table = [
  "| Projeto | O que resolve | Categoria | Estado |",
  "|---|---|---|---|",
  ...rows
].join("\n");

const start = "<!-- PROJECTS:START -->";
const end = "<!-- PROJECTS:END -->";
const pattern = new RegExp(`${start}[\\s\\S]*?${end}`);

if (!pattern.test(readme)) {
  throw new Error("Marcadores PROJECTS não encontrados no README.");
}

const next = readme.replace(pattern, `${start}\n${table}\n${end}`);
await writeFile(readmePath, next);
console.log(`README atualizado com ${projects.length} projetos.`);
