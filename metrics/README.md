# RocketLabs traffic history

[Versão em português](#como-ler) · [English notes](#how-to-read)

This directory preserves aggregate GitHub traffic before the rolling 14-day
window disappears. It contains no visitor identities, credentials or private
repository data.

<!-- TRAFFIC:START -->
## Latest snapshot

Collected **2026-08-17T18:43:16.967Z**. Traffic totals cover GitHub's rolling
14-day window.

**Most accessed project:** NotchAgent with 12
unique visitors.

| Project | Views | Unique visitors | Clones | Unique cloners | Top referrer | Stars | Approx. conversion |
|---|---:|---:|---:|---:|---|---:|---:|
| [RocketLabs](https://github.com/luisroquette/RocketLabs) | 5 | 3 | 77 | 35 | github.com (2 unique) | 0 | 0.0% |
| [NotchAgent](https://github.com/luisroquette/notchagent) | 28 | 12 | 242 | 91 | github.com (2 unique) | 1 | 0.0% |
| [MemoryGuard](https://github.com/luisroquette/memoryguard) | 1 | 1 | 103 | 50 | — | 0 | — |
| [Social Machine](https://github.com/luisroquette/social-machine-for-all) | 9 | 4 | 47 | 25 | github.com (4 unique) | 0 | 0.0% |
| [My_Blog_Makes_Neil_Proud](https://github.com/luisroquette/My_Blog_Makes_Neil_Proud) | 5 | 2 | 103 | 54 | github.com (2 unique) | 0 | 0.0% |
| [Carousel Engine](https://github.com/luisroquette/carousel-story-engine) | 2 | 1 | 48 | 27 | github.com (1 unique) | 0 | 0.0% |

### Snapshot history

- [2026-08-17](./snapshots/2026-08-17.json)
- [2026-08-10](./snapshots/2026-08-10.json)
- [2026-08-03](./snapshots/2026-08-03.json)
- [2026-07-27](./snapshots/2026-07-27.json)
- [2026-07-25](./snapshots/2026-07-25.json)
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
