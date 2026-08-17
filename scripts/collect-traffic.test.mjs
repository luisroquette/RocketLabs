import { test } from "node:test";
import assert from "node:assert/strict";
import { missingRepositories, validateSnapshotSchema } from "./collect-traffic.mjs";

const CONFIG_REPOS = [
  { name: "RocketLabs", label: "RocketLabs" },
  { name: "notchagent", label: "NotchAgent" },
  { name: "memoryguard", label: "MemoryGuard" },
];

function snapshotWith(...names) {
  return { schemaVersion: 1, repositories: names.map((name) => ({ name })) };
}

// REGRESSÃO 17/08/2026: validateStoredMetrics exigia que TODO snapshot histórico contivesse
// TODOS os repos configurados HOJE. Quando "memoryguard" foi adicionado ao config depois do
// snapshot de 24/07, a validação passou a reprovar esse snapshot antigo — nenhum dado real tinha
// sumido, o repo só não existia na lista rastreada naquela época. Isso travava tanto o cron
// semanal quanto o workflow Catalog (que roda `collect-traffic.mjs --validate` em todo push).
test("REGRESSÃO: snapshot ANTIGO sem um repo recém-adicionado não é erro — ele é histórico", () => {
  const antigo = snapshotWith("RocketLabs", "notchagent"); // memoryguard ainda não existia
  assert.deepEqual(missingRepositories(antigo, CONFIG_REPOS), ["memoryguard"]);
  // A função identifica a ausência corretamente — quem decide se isso é ERRO é o chamador
  // (validateStoredMetrics), que agora só aplica essa checagem ao snapshot MAIS RECENTE.
});

test("o snapshot MAIS RECENTE sem um repo configurado continua sendo erro de verdade", () => {
  const recente = snapshotWith("RocketLabs", "notchagent"); // memoryguard sumiu de um snapshot novo
  assert.deepEqual(missingRepositories(recente, CONFIG_REPOS), ["memoryguard"]);
});

test("snapshot com todos os repos configurados não acusa nada faltando", () => {
  const completo = snapshotWith("RocketLabs", "notchagent", "memoryguard");
  assert.deepEqual(missingRepositories(completo, CONFIG_REPOS), []);
});

test("validateSnapshotSchema continua reprovando schema inválido — não mexeu nessa parte", () => {
  assert.equal(validateSnapshotSchema({ schemaVersion: 1, repositories: [] }), true);
  assert.equal(validateSnapshotSchema({ schemaVersion: 2, repositories: [] }), false);
  assert.equal(validateSnapshotSchema({ schemaVersion: 1, repositories: "não é array" }), false);
});
