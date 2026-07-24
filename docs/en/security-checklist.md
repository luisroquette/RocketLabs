# Security checklist before opening a repository

[Library](../README.md) · [Português](../pt-BR/security-checklist.md)

Apply this checklist to current files, Git history and connected services.
Deleting a secret from the latest commit does not make it safe.

## Scope and rights

- [ ] The repository contains no code, data or assets you cannot publish.
- [ ] Company policies and contracts permit this release.
- [ ] Personal, client and production data were removed.
- [ ] Fixtures and screenshots use synthetic content.
- [ ] Image, PDF and video metadata were reviewed.

## Current files

- [ ] `.env`, credentials, certificates and private keys are ignored.
- [ ] `.env.example` contains clearly fake placeholders only.
- [ ] No tokens exist in code, tests, logs, notebooks or documentation.
- [ ] Internal URLs, project IDs, buckets and account names were removed.
- [ ] Database dumps, exports, backups and debug files are not tracked.
- [ ] Local paths and usernames do not appear in examples.

Useful searches:

```bash
git status --short
git ls-files | rg '(^|/)(\.env|.*\.pem|.*\.key|credentials|secrets?)($|\.)'
rg -n --hidden --glob '!.git/**' \
  '(api[_-]?key|secret|token|password|private[_-]?key|service[_-]?role)'
```

These commands find candidates; they do not prove that secrets are absent.

## Git history

- [ ] Full history was analyzed with a secret scanner.
- [ ] Old branches and tags were included.
- [ ] Large and deleted files were inspected.
- [ ] Every discovered credential was revoked at its source.

Example with Gitleaks:

```bash
gitleaks git . --redact
git rev-list --objects --all
```

If a secret was committed:

1. Revoke or rotate it immediately.
2. Review provider access logs.
3. Remove it from history with an appropriate tool.
4. Force-update only after coordinating contributors.
5. Record the incident without copying the secret value.

## Application and infrastructure

- [ ] Server credentials are never exposed to browsers or client apps.
- [ ] Public and secret keys are clearly differentiated.
- [ ] CORS, redirects and webhooks use minimum allowlists.
- [ ] Buckets, databases and panels do not rely on an “unguessable URL”.
- [ ] Authorization is enforced server-side for every sensitive operation.
- [ ] Example environments are isolated from production.
- [ ] Logs avoid tokens, private prompts and personal payloads.

## Dependencies and CI

- [ ] Lockfiles exist and critical dependencies were audited.
- [ ] Actions use minimum permissions and pinned versions.
- [ ] Pull-request workflows from forks receive no secrets.
- [ ] Automation tokens have minimum scope and lifetime.
- [ ] Build artifacts contain no `.env` files or sensitive source maps.
- [ ] Dependabot or an equivalent mechanism is configured when appropriate.

## Public documentation

- [ ] README states which data is collected, stored and transmitted.
- [ ] Paid calls and external services are identified.
- [ ] Security and deployment limitations are explicit.
- [ ] `SECURITY.md` provides a private vulnerability channel.
- [ ] Issues discourage credentials and personal data.

## Final gate

- [ ] A second reviewer completed the checklist.
- [ ] The public clone works without private infrastructure.
- [ ] A fast credential-revocation plan exists.
- [ ] The team knows who responds to an alert after publication.

> If anything is uncertain, stop the release. Delaying is cheaper than
> responding to a leak.

