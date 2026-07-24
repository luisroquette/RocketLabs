# Playbook de distribuição por problema

[English version](../en/distribution-playbook.md)

Um catálogo organiza projetos. Distribuição começa por um problema específico
que alguém já sente.

O caminho recomendado é curto:

```text
problema reconhecível → publicação → projeto certo → RocketLabs
```

A publicação não precisa vender o portfólio inteiro. Ela precisa fazer uma
pessoa pensar: “é exatamente o problema que estou tentando resolver”.

## As quatro campanhas

| Projeto | Problema de entrada | Prova visual | Destino |
|---|---|---|---|
| NotchAgent | Seu agente vai acabar a quota antes de terminar? | [`panel-burn.png`](https://github.com/luisroquette/notchagent/blob/master/docs/img/panel-burn.png) | [NotchAgent](https://github.com/luisroquette/notchagent) |
| Social Machine | Conteúdo não precisa viver entre planilhas e prompts. | [`social-machine-demo.mp4`](https://github.com/luisroquette/social-machine-for-all/blob/master/assets/social-machine-demo.mp4) | [Social Machine](https://github.com/luisroquette/social-machine-for-all) |
| Auto-blog | Como publicar SEO sem entregar seu conteúdo a uma plataforma. | [`pipeline-walkthrough.gif`](https://github.com/luisroquette/autoblog-template/blob/main/assets/pipeline-walkthrough.gif) | [Auto-blog](https://github.com/luisroquette/autoblog-template) |
| Carousel Story Engine | Por que carrosséis de IA parecem todos iguais? | [`before-after.png`](https://github.com/luisroquette/carousel-story-engine/blob/main/assets/before-after.png) | [Carousel Engine](https://github.com/luisroquette/carousel-story-engine) |

## 1. NotchAgent

**Publicação principal**

> Seu agente vai acabar a quota antes de terminar?
>
> Ver “42% restante” não responde a pergunta importante. Dependendo do ritmo,
> esse saldo pode durar a tarde inteira ou desaparecer em quarenta minutos.
>
> Eu criei o NotchAgent para mostrar quota, horário de reset e projeção de
> consumo direto no notch do MacBook. Ele lê as sessões locais de Claude Code e
> Codex, avisa quando o tanque está baixo e não envia telemetria para um backend.
>
> É nativo em Swift, open source e instalável por Homebrew:
> https://github.com/luisroquette/notchagent

**Versão curta**

> 42% de quota restante pode significar “tranquilo” ou “acaba antes desta tarefa”.
> O NotchAgent mostra saldo, reset e burn rate no notch do Mac.
> https://github.com/luisroquette/notchagent

**Próxima publicação:** mostrar o gráfico BURN e explicar a diferença entre
percentual oficial, tokens locais e projeção.

## 2. Social Machine

**Publicação principal**

> Conteúdo não precisa viver entre planilhas e prompts.
>
> Quando a fonte fica numa aba, a voz da marca num documento, o rascunho num
> chat e a aprovação numa mensagem, ninguém consegue reconstruir por que uma
> publicação foi feita.
>
> O Social Machine coloca descoberta, curadoria, criação, revisão e publicação
> no mesmo fluxo. Cada empresa mantém seu workspace, suas regras e seus dados.
> Automações e publicação começam desligadas; o time decide quando ativá-las.
>
> O template é self-hosted e está disponível sob licença MIT:
> https://github.com/luisroquette/social-machine-for-all

**Versão curta**

> Fonte numa aba. Voz da marca num documento. Rascunho num chat. Aprovação em
> outra ferramenta.
>
> O Social Machine conecta esse histórico num fluxo self-hosted:
> https://github.com/luisroquette/social-machine-for-all

**Próxima publicação:** acompanhar uma pauta do sinal à aprovação usando o vídeo
de demonstração.

## 3. Auto-blog Template

**Publicação principal**

> Como publicar SEO sem entregar seu conteúdo a uma plataforma?
>
> O Auto-blog Template mantém o blog no seu Next.js e os dados no seu Supabase.
> Marca, audiência, tom, palavras-chave, links internos e CTA ficam reunidos num
> perfil editável.
>
> O pipeline evita duas execuções no mesmo dia, expõe para leitura pública
> apenas artigos com status `published` e deixa texto por IA, capas e Search
> Console desligados até você decidir configurar cada integração.
>
> O template, a migration e o guia de instalação estão aqui:
> https://github.com/luisroquette/autoblog-template

**Versão curta**

> Seu blog pode viver no seu repositório, no seu domínio e no seu banco.
> Next.js + Supabase + pipeline editorial replicável:
> https://github.com/luisroquette/autoblog-template

**Próxima publicação:** abrir o arquivo `autoblog-profile.ts` e mostrar tudo que
uma empresa precisa trocar para adaptar o template.

## 4. Carousel Story Engine

**Publicação principal**

> Por que carrosséis de IA parecem todos iguais?
>
> O prompt costuma definir oito slides, mas pula o trabalho editorial. A capa
> promete uma ideia; os slides seguintes repetem a mesma frase e terminam com um
> pedido genérico para salvar o post.
>
> O Carousel Story Engine compara hooks, escolhe um argumento defensável,
> separa fatos de teses e dá uma função narrativa e visual para cada página.
> Também inclui uma suíte pública de avaliação para evitar que a qualidade
> dependa apenas de gosto.
>
> A skill é Markdown, não exige serviço próprio e pode ser adaptada:
> https://github.com/luisroquette/carousel-story-engine

**Versão curta**

> A capa promete. Os slides seguintes parafraseiam a capa.
>
> O Carousel Story Engine adiciona argumento, evidência, progressão e direção
> visual ao processo:
> https://github.com/luisroquette/carousel-story-engine

**Próxima publicação:** publicar o comparativo antes/depois e explicar qual
função narrativa mudou em cada slide.

## Cadência mínima

Use um projeto por vez:

1. **Dia 1:** problema e demonstração.
2. **Dia 3:** prova concreta do mecanismo.
3. **Dia 7:** decisão técnica, limitação ou aprendizado.
4. **Dia 14:** melhoria lançada, caso de uso ou resposta a uma dúvida real.

Não coloque quatro links no mesmo post. O primeiro clique deve levar ao projeto
que resolve aquele problema. O README faz a conexão com o restante do RocketLabs.

## O que medir

Registre uma linha por publicação:

| Data | Projeto | Canal | Gancho | Visual | Visitas únicas | Clones | Downloads | Stars |
|---|---|---|---|---|---:|---:|---:|---:|
| AAAA-MM-DD | projeto | LinkedIn/X | problema | arquivo | 0 | 0 | 0 | 0 |

Use **GitHub Insights → Traffic** para visitantes e clones. Use os downloads da
release quando o projeto tiver artefatos. Stars ajudam na descoberta, mas visitas,
clones e downloads mostram intenção mais concreta.

## Checklist antes de publicar

- [ ] O primeiro parágrafo nomeia um problema, não o portfólio.
- [ ] Existe uma prova visual do próprio projeto.
- [ ] Toda afirmação pode ser confirmada no README, código ou release.
- [ ] O post tem um único destino.
- [ ] O README do destino aponta para RocketLabs.
- [ ] Limitações relevantes continuam visíveis.
- [ ] A métrica inicial foi registrada antes da publicação.
