# Segurança

## Escopo

O RocketLabs é um catálogo estático. Ele não executa aplicações, não recebe
credenciais e não precisa de variáveis de ambiente.

Vulnerabilidades de um projeto listado devem ser relatadas diretamente naquele
projeto. Para um problema neste catálogo:

1. Não abra uma issue pública se o relato contiver segredo, dado pessoal ou
   instruções de exploração.
2. Use o canal privado de
   [security advisories](https://github.com/luisroquette/RocketLabs/security/advisories/new).
3. Inclua impacto, passos mínimos de reprodução e arquivos afetados.

Não há prazo garantido de resposta. Relatos claros e reproduzíveis serão
avaliados em melhor esforço.

## Credenciais

Nunca envie tokens, chaves, arquivos `.env`, cookies ou credenciais reais.
Se uma credencial já tiver sido publicada, revogue-a no provedor antes de
qualquer outra ação; removê-la do Git não invalida o segredo.
