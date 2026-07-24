# Checklist de segurança antes de abrir um repositório

[Biblioteca](../README.md) · [English](../en/security-checklist.md)

Use este checklist no código atual, no histórico Git e nos serviços conectados.
Apagar um segredo do último commit não o torna seguro.

## Escopo e direitos

- [ ] O repositório não contém código, dados ou assets sem direito de publicação.
- [ ] Contratos e políticas da empresa permitem abrir este material.
- [ ] Dados pessoais, de clientes e de produção foram removidos.
- [ ] Fixtures e screenshots usam conteúdo sintético.
- [ ] Metadados de imagens, PDFs e vídeos foram revisados.

## Arquivos atuais

- [ ] `.env`, credenciais, certificados e chaves privadas estão ignorados.
- [ ] `.env.example` contém apenas placeholders reconhecíveis.
- [ ] Não existem tokens em código, testes, logs, notebooks ou documentação.
- [ ] URLs internas, IDs de projeto, buckets e nomes de contas foram removidos.
- [ ] Dumps de banco, exports, backups e arquivos de debug não estão versionados.
- [ ] Caminhos locais e nomes de usuário não aparecem em exemplos.

Buscas úteis:

```bash
git status --short
git ls-files | rg '(^|/)(\.env|.*\.pem|.*\.key|credentials|secrets?)($|\.)'
rg -n --hidden --glob '!.git/**' \
  '(api[_-]?key|secret|token|password|private[_-]?key|service[_-]?role)'
```

Os comandos encontram candidatos; não provam ausência de segredos.

## Histórico Git

- [ ] O histórico completo foi analisado com scanner de segredos.
- [ ] Branches e tags antigas também foram incluídas.
- [ ] Arquivos grandes e removidos foram inspecionados.
- [ ] Toda credencial encontrada foi revogada no serviço de origem.

Exemplo com Gitleaks:

```bash
gitleaks git . --redact
git rev-list --objects --all
```

Se um segredo foi commitado:

1. Revogue ou rotacione imediatamente.
2. Verifique logs de uso do provedor.
3. Remova-o do histórico com ferramenta apropriada.
4. Force a atualização apenas após coordenar colaboradores.
5. Registre o incidente sem copiar o valor secreto.

## Aplicação e infraestrutura

- [ ] Credenciais de servidor nunca são expostas ao navegador ou app cliente.
- [ ] Chaves públicas e secretas estão claramente diferenciadas.
- [ ] CORS, redirects e webhooks usam allowlists mínimas.
- [ ] Buckets, bancos e painéis não dependem de “URL difícil de adivinhar”.
- [ ] Autorização é validada no servidor para cada operação sensível.
- [ ] Ambientes de exemplo usam projetos isolados da produção.
- [ ] Logs evitam tokens, prompts privados e payloads pessoais.

## Dependências e CI

- [ ] Lockfiles estão presentes e dependências críticas foram auditadas.
- [ ] Actions usam permissões mínimas e versões fixadas.
- [ ] Workflows de pull request de forks não recebem segredos.
- [ ] Tokens de automação possuem escopo e validade mínimos.
- [ ] Artefatos de build não incorporam `.env` ou sourcemaps sensíveis.
- [ ] Dependabot ou mecanismo equivalente está configurado quando fizer sentido.

## Documentação pública

- [ ] README declara quais dados são coletados, armazenados e transmitidos.
- [ ] Chamadas pagas e serviços externos estão identificados.
- [ ] Limitações de segurança e implantação estão explícitas.
- [ ] `SECURITY.md` oferece um canal privado para vulnerabilidades.
- [ ] Issues desencorajam o envio de credenciais e dados pessoais.

## Barreira final

- [ ] Um segundo revisor executou o checklist.
- [ ] O clone público foi testado sem acesso à infraestrutura privada.
- [ ] Existe um plano para revogar rapidamente qualquer segredo descoberto.
- [ ] A equipe sabe quem responde a um alerta após a publicação.

> Encontrou algo duvidoso? Pare a publicação. É mais barato atrasar o lançamento
> do que responder a um vazamento.

