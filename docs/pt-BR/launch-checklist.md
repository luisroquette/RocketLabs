# Checklist de lançamento open source

[Biblioteca](../README.md) · [English](../en/launch-checklist.md)

## Produto

- [ ] O problema e o público são entendidos em poucos segundos.
- [ ] O caminho principal funciona em ambiente limpo.
- [ ] O primeiro resultado exige o mínimo possível de decisões.
- [ ] Limitações, plataformas e integrações suportadas estão explícitas.
- [ ] Recursos demonstrativos não são apresentados como produção.

## Repositório

- [ ] README, licença, segurança, contribuição e suporte estão publicados.
- [ ] Social preview, descrição curta e topics estão configurados.
- [ ] Demo visual mostra o resultado, não apenas a arquitetura.
- [ ] Links, âncoras, imagens e comandos foram testados.
- [ ] Issues possuem instruções e templates úteis.
- [ ] Branch principal está protegida e o CI está verde.

## Instalação e release

- [ ] Versão e tag correspondem ao código publicado.
- [ ] Release notes explicam valor, mudanças e limitações.
- [ ] Artefatos possuem nomes previsíveis e checksums.
- [ ] Package manager, imagem ou binário aponta para a versão correta.
- [ ] Upgrade e desinstalação foram documentados quando relevantes.
- [ ] O comando divulgado foi executado do zero.

## Segurança

- [ ] O [checklist de segurança](./security-checklist.md) foi concluído.
- [ ] Segredos encontrados foram rotacionados, não apenas apagados.
- [ ] Nenhum serviço de produção é necessário para testar o projeto.
- [ ] Custos externos e chamadas pagas estão declarados.

## Mensagem de lançamento

- [ ] Começa pelo problema e pelo resultado.
- [ ] Inclui uma demonstração curta.
- [ ] Oferece um único CTA principal.
- [ ] Explica para quem o projeto não serve.
- [ ] Leva diretamente à instalação ou ao primeiro uso.

Modelo:

> **[Projeto]** ajuda **[público]** a **[resultado]** sem **[fricção principal]**.
> Veja **[demo]** ou comece com **[comando/link]**.

## Operação pós-lançamento

- [ ] Existe responsável pela triagem nas primeiras 72 horas.
- [ ] Perguntas recorrentes serão convertidas em documentação.
- [ ] Bugs e pedidos de recurso serão separados.
- [ ] Métricas iniciais foram registradas antes do anúncio.
- [ ] Próxima revisão do projeto tem data definida.

Meça principalmente:

- instalação concluída;
- tempo até o primeiro resultado;
- falhas por etapa;
- issues reproduzíveis;
- retorno de usuários que realmente executaram o produto.

