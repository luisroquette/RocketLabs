# RocketLabs traffic history

[Versão em português](#como-ler) · [English notes](#how-to-read)

This directory preserves aggregate GitHub traffic before the rolling 14-day
window disappears. It contains no visitor identities, credentials or private
repository data.

<!-- TRAFFIC:START -->
## Latest snapshot

Collected **2026-07-24T23:58:03.695Z**. Traffic totals cover GitHub's rolling
14-day window.

**Most accessed project:** NotchAgent with 10
unique visitors.

| Project | Views | Unique visitors | Clones | Unique cloners | Top referrer | Stars | Approx. conversion |
|---|---:|---:|---:|---:|---|---:|---:|
| [RocketLabs](https://github.com/luisroquette/RocketLabs) | 0 | 0 | 0 | 0 | — | 0 | — |
| [NotchAgent](https://github.com/luisroquette/notchagent) | 17 | 10 | 110 | 67 | github.com (3 unique) | 1 | — |
| [Social Machine](https://github.com/luisroquette/social-machine-for-all) | 0 | 0 | 0 | 0 | — | 0 | — |
| [Auto-blog](https://github.com/luisroquette/autoblog-template) | 0 | 0 | 2 | 2 | — | 0 | — |
| [Carousel Engine](https://github.com/luisroquette/carousel-story-engine) | 3 | 2 | 30 | 20 | — | 0 | — |

### Snapshot history

- [2026-07-24](./snapshots/2026-07-24.json)
<!-- TRAFFIC:END -->

## Como ler

- **Visitantes únicos** e **clonadores únicos** são totais dos 14 dias retornados
  pelo GitHub. Não some os valores diários: a mesma pessoa pode aparecer em mais
  de um dia.
- **Conversão aproximada** usa novas stars desde a coleta anterior divididas
  pelos visitantes únicos da janela atual. As janelas se sobrepõem, portanto o
  número indica tendência, não atribuição.
- Clones representam clones completos, não `fetch`. Automações e ambientes
  temporários também podem clonar um repositório.
- Referrers são uma fotografia agregada do momento da coleta.

## How to read

- **Unique visitors** and **unique cloners** are 14-day totals returned by
  GitHub. Do not add daily unique counts because the same person can appear on
  multiple days.
- **Approximate conversion** divides new stars since the previous snapshot by
  unique visitors in the current window. The windows overlap, so this is a trend
  indicator rather than attribution.
- Clones are full clones, not `fetch` operations. Automation and temporary
  environments may also clone a repository.
- Referrers are an aggregate snapshot taken at collection time.

## Automação semanal

The workflow runs every Monday at 08:17 UTC and can also be started manually.
It remains safely inactive until the repository secret
`ROCKETLABS_TRAFFIC_TOKEN` exists.

Create a fine-grained GitHub token with **Administration: read** access limited
to the repositories listed in [`config.json`](./config.json). Add it manually in
**Settings → Secrets and variables → Actions**. Never commit the token or place
it in `config.json`.

The workflow uses its normal `GITHUB_TOKEN` only to commit aggregate snapshots
back to RocketLabs. The traffic token is read-only and is never written to disk.
