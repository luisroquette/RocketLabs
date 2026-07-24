# Contribuindo

O RocketLabs é um catálogo curado dos projetos de `@luisroquette`, não uma lista
aberta de links. Issues e pull requests são bem-vindos para:

- corrigir informações ou links;
- melhorar a navegação e a acessibilidade;
- sugerir conexões úteis entre os projetos;
- relatar problemas no catálogo.

Para atualizar um projeto, edite `projects.json` e execute:

```bash
node scripts/render-readme.mjs
node scripts/validate-catalog.mjs
```

Não inclua chaves, tokens, dados pessoais, arquivos `.env` ou métricas não
verificadas. Mudanças em um produto devem ser propostas no repositório daquele
produto.
