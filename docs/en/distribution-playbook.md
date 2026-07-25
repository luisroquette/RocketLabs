# Problem-led distribution playbook

[Versão em português](../pt-BR/distribution-playbook.md)

A catalog organizes projects. Distribution starts with one specific problem
someone already recognizes.

Keep the path short:

```text
recognizable problem → post → relevant project → RocketLabs
```

The post does not need to sell the full portfolio. It should make one person
think, “this is the problem I am trying to solve”.

## The four campaigns

| Project | Entry problem | Visual proof | Destination |
|---|---|---|---|
| NotchAgent | Will your agent run out of quota before it finishes? | [`panel-burn.png`](https://github.com/luisroquette/notchagent/blob/master/docs/img/panel-burn.png) | [NotchAgent](https://github.com/luisroquette/notchagent) |
| Social Machine | Content should not live between spreadsheets and prompts. | [`social-machine-demo.mp4`](https://github.com/luisroquette/social-machine-for-all/blob/master/assets/social-machine-demo.mp4) | [Social Machine](https://github.com/luisroquette/social-machine-for-all) |
| Auto-blog | How do you publish for SEO without handing your content to a platform? | [`pipeline-walkthrough.gif`](https://github.com/luisroquette/autoblog-template/blob/main/assets/pipeline-walkthrough.gif) | [Auto-blog](https://github.com/luisroquette/autoblog-template) |
| Carousel Story Engine | Why do AI carousels all look and sound the same? | [`before-after.png`](https://github.com/luisroquette/carousel-story-engine/blob/main/assets/before-after.png) | [Carousel Engine](https://github.com/luisroquette/carousel-story-engine) |

## 1. NotchAgent

**Primary post**

> Will your agent run out of quota before it finishes?
>
> “42% left” does not answer the useful question. At one pace that balance lasts
> all afternoon. At another, it disappears in forty minutes.
>
> I built NotchAgent to show quota, reset time and projected burn directly in
> the MacBook notch. It reads local Claude Code and Codex sessions, warns when
> the tank is low and sends no telemetry to a backend.
>
> Native Swift, open source and installable with Homebrew:
> https://github.com/luisroquette/notchagent

**Short version**

> 42% of quota left can mean “plenty” or “gone before this task ends”.
> NotchAgent shows balance, reset and burn rate in the MacBook notch.
> https://github.com/luisroquette/notchagent

**Follow-up:** show the BURN chart and explain the difference between official
percentages, local token counts and projections.

## 2. Social Machine

**Primary post**

> Content should not live between spreadsheets and prompts.
>
> When the source sits in one tab, brand voice in a document, the draft in a
> chat and approval in a message, nobody can reconstruct why a post was made.
>
> Social Machine puts discovery, curation, creation, review and publishing in
> one workflow. Each company keeps its own workspace, rules and data.
> Automations and publishing start disabled; the team chooses when to enable them.
>
> The template is self-hosted and MIT licensed:
> https://github.com/luisroquette/social-machine-for-all

**Short version**

> Source in one tab. Brand voice in a document. Draft in a chat. Approval
> somewhere else.
>
> Social Machine connects that history in a self-hosted workflow:
> https://github.com/luisroquette/social-machine-for-all

**Follow-up:** move one topic from signal to approval using the repository demo.

## 3. Auto-blog Template

**Primary post**

> How do you publish for SEO without handing your content to a platform?
>
> Auto-blog Template keeps the blog in your Next.js application and the data in
> your Supabase project. Brand, audience, tone, keywords, internal links and CTA
> live in one editable profile.
>
> The pipeline prevents duplicate daily runs, exposes only articles with
> `published` status to public readers and leaves AI text, cover generation and
> Search Console disabled until you configure each integration.
>
> The template, migration and setup guide are here:
> https://github.com/luisroquette/autoblog-template

**Short version**

> Your blog can live in your repository, on your domain and in your database.
> Next.js + Supabase + a repeatable editorial pipeline:
> https://github.com/luisroquette/autoblog-template

**Follow-up:** open `autoblog-profile.ts` and show exactly what a company changes
to adapt the template.

## 4. Carousel Story Engine

**Primary post**

> Why do AI carousels all look and sound the same?
>
> The prompt usually defines eight slides and skips the editorial work. The cover
> promises an idea, the next slides repeat it and the deck ends by asking people
> to save the post.
>
> Carousel Story Engine compares hooks, chooses a defensible argument, separates
> facts from theses and gives every page a narrative and visual job. It also
> includes a public evaluation suite, so quality is not judged by taste alone.
>
> The skill is plain Markdown, requires no service of its own and can be adapted:
> https://github.com/luisroquette/carousel-story-engine

**Short version**

> The cover makes a promise. Every other slide paraphrases the cover.
>
> Carousel Story Engine adds argument, evidence, progression and visual direction:
> https://github.com/luisroquette/carousel-story-engine

**Follow-up:** publish the before-and-after example and explain which narrative
job changed on each slide.

## Minimum cadence

Focus on one project at a time:

1. **Day 1:** problem and demonstration.
2. **Day 3:** concrete proof of the mechanism.
3. **Day 7:** technical decision, limitation or lesson.
4. **Day 14:** shipped improvement, use case or answer to a real question.

Do not place four project links in one post. The first click should lead to the
project that solves that problem. Its README connects the visitor to RocketLabs.

## What to measure

Record one row per post:

| Date | Project | Channel | Hook | Visual | Unique visitors | Clones | Downloads | Stars |
|---|---|---|---|---|---:|---:|---:|---:|
| YYYY-MM-DD | project | LinkedIn/X | problem | file | 0 | 0 | 0 | 0 |

Use **GitHub Insights → Traffic** for visitors and clones. Use release download
counts when the project has assets. Stars help discovery, while visits, clones
and downloads indicate more concrete intent.

The [public traffic history](../../metrics/README.md) preserves weekly snapshots,
referrers and approximate conversion before GitHub's window expires.

## Pre-publish checklist

- [ ] The opening names a problem, not the portfolio.
- [ ] The post uses visual proof from the project itself.
- [ ] Every claim can be verified in the README, code or release.
- [ ] The post has one destination.
- [ ] The destination README links to RocketLabs.
- [ ] Relevant limitations remain visible.
- [ ] The baseline metric was recorded before publishing.
