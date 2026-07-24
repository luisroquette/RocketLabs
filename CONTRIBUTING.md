# Contribuindo

O RocketLabs é um catálogo curado dos projetos de `@luisroquette`, não uma lista
aberta de links. Issues e pull requests podem:

- corrigir informações ou links;
- melhorar a navegação e a acessibilidade;
- aprimorar os playbooks, checklists e templates da biblioteca;
- sugerir conexões úteis entre os projetos;
- relatar problemas no catálogo.

Para atualizar um projeto, edite `projects.json` e execute:

```bash
node scripts/render-readme.mjs
node scripts/validate-catalog.mjs
node scripts/validate-library.mjs
```

Não inclua chaves, tokens, dados pessoais, arquivos `.env` ou métricas não
verificadas. Mudanças em um produto devem ser propostas no repositório daquele
produto.

As tabelas de `README.md` e `README.en.md` são geradas entre os marcadores
`PROJECTS`; não as edite manualmente. Uma contribuição aceita não cria obrigação
de suporte, manutenção ou prazo de resposta.

Materiais da biblioteca devem permanecer aplicáveis fora da RocketLabs, possuir
versões equivalentes em português e inglês e nunca incluir dados reais em
exemplos.
