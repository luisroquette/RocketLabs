import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projects = JSON.parse(await readFile(path.join(root, "projects.json"), "utf8"));
const allowedStatuses = new Set(["active", "evolving", "reference"]);
const allowedAccess = new Set(["mit", "public-code"]);
const required = [
  "slug",
  "name",
  "descriptionPt",
  "descriptionEn",
  "category",
  "status",
  "repository",
  "featured",
  "access"
];
const seenSlugs = new Set();
const seenRepositories = new Set();
const errors = [];
let flagshipCount = 0;

if (!Array.isArray(projects) || projects.length === 0) {
  errors.push("projects.json precisa conter pelo menos um projeto.");
}

for (const [index, project] of projects.entries()) {
  for (const field of required) {
    if (project[field] === undefined || project[field] === "") {
      errors.push(`[${index}] campo obrigatório ausente: ${field}`);
    }
  }

  if (seenSlugs.has(project.slug)) errors.push(`slug duplicado: ${project.slug}`);
  if (seenRepositories.has(project.repository)) errors.push(`repositório duplicado: ${project.repository}`);
  seenSlugs.add(project.slug);
  seenRepositories.add(project.repository);

  if (!allowedStatuses.has(project.status)) errors.push(`status inválido em ${project.slug}`);
  if (!allowedAccess.has(project.access)) errors.push(`acesso inválido em ${project.slug}`);
  if (typeof project.featured !== "boolean") errors.push(`featured precisa ser booleano em ${project.slug}`);
  if (project.featured && !project.image) errors.push(`projeto em destaque sem imagem: ${project.slug}`);
  if (project.flagship) {
    flagshipCount += 1;
    if (!project.featured) errors.push(`flagship precisa ser featured em ${project.slug}`);
    if (!/^v\d+\.\d+\.\d+$/.test(project.release ?? "")) {
      errors.push(`release inválida no flagship ${project.slug}`);
    }
    if (!project.install) errors.push(`comando de instalação ausente no flagship ${project.slug}`);
  }
  for (const field of ["descriptionPt", "descriptionEn", "category"]) {
    if (typeof project[field] === "string" && /[|\r\n]/.test(project[field])) {
      errors.push(`${field} contém caractere incompatível com tabela em ${project.slug}`);
    }
  }
  if (!/^https:\/\/github\.com\/[^/]+\/[^/]+$/.test(project.repository)) {
    errors.push(`URL de repositório inválida em ${project.slug}`);
  }
  if (project.demo && !/^https:\/\//.test(project.demo)) {
    errors.push(`URL de demo inválida em ${project.slug}`);
  }
  if (project.image) {
    try {
      await access(path.join(root, project.image));
    } catch {
      errors.push(`imagem ausente em ${project.slug}: ${project.image}`);
    }
  }
}

if (flagshipCount !== 1) {
  errors.push(`catálogo precisa ter exatamente um flagship; encontrados: ${flagshipCount}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Catálogo válido: ${projects.length} projetos, ${seenSlugs.size} slugs únicos.`);
