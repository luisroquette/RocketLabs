# Playbook para publicar um projeto open source

[Biblioteca](../README.md) · [English](../en/open-source-playbook.md)

Um processo em oito etapas para abrir código sem publicar segredos, dependências
do cliente ou promessas que o projeto ainda não sustenta.

## 1. Defina o que está sendo aberto

- Escreva em uma frase o problema que o projeto resolve.
- Separe produto reutilizável, configuração da empresa e dados operacionais.
- Confirme autoria e direito de redistribuição de código, fontes, imagens e dados.
- Escolha o modelo: biblioteca, aplicação, template, skill, CLI ou referência.
- Decida o nível de suporte antes do lançamento.

**Saída:** escopo público explícito e uma lista do que permanecerá privado.

## 2. Extraia tudo que pertence à empresa original

Transforme valores internos em configuração:

| Remover do código | Substituir por |
|---|---|
| Nome, domínio e identidade visual | `brand.example.*` ou arquivo de configuração |
| IDs de projeto, buckets e endpoints | variáveis de ambiente |
| Prompts e regras proprietárias | exemplos neutros |
| Usuários, emails e dados reais | fixtures sintéticas |
| Integrações obrigatórias | adaptadores opcionais |

Não basta trocar o nome da empresa. Procure também subdomínios, nomes de tabelas,
telefones, caminhos locais, IDs de analytics e exemplos copiados da produção.

## 3. Faça a revisão de segurança

Execute o [checklist de segurança](./security-checklist.md). Se uma credencial já
entrou no histórico Git, considere-a comprometida: revogue, gere outra e só
depois limpe o histórico.

**Barreira:** nenhum segredo atual ou histórico; nenhum dado pessoal ou de
cliente; permissões mínimas no CI.

## 4. Torne o caminho principal reproduzível

- Crie `.env.example` apenas com nomes e valores fictícios.
- Documente versões mínimas de runtime, banco e sistema operacional.
- Automatize instalação, migração, seed e teste quando possível.
- Teste a instalação em clone limpo, sem seus caches e arquivos locais.
- Declare integrações opcionais e o comportamento quando elas estão ausentes.

**Barreira:** outra pessoa consegue chegar ao primeiro resultado seguindo apenas
o README.

## 5. Documente a decisão, não só os comandos

Use o [template de README](../../templates/README.pt-BR.md) e responda:

- O que é e para quem serve?
- Qual resultado aparece primeiro?
- O que é real, estimado ou demonstrativo?
- Quais dados entram, onde ficam e para onde saem?
- Quais limitações e custos externos existem?

Inclua uma captura, GIF ou vídeo curto do fluxo principal.

## 6. Adicione governança mínima

O kit mínimo recomendado:

- `LICENSE`
- `SECURITY.md`
- `CONTRIBUTING.md`
- política de suporte ou aviso de melhor esforço
- templates de issue
- CI para teste, lint e consistência da documentação

Código visível sem licença não concede automaticamente permissão de uso.

## 7. Prepare uma versão instalável

- Crie versão semântica, changelog curto e release reproduzível.
- Publique artefatos com checksums quando houver binários.
- Teste exatamente o comando que será divulgado.
- Registre requisitos, migrações e incompatibilidades.
- Prepare social preview, descrição, topics e demonstração.

Use o [checklist de lançamento](./launch-checklist.md) antes de anunciar.

## 8. Publique e aprenda

- Lance com um caso de uso concreto, não com uma lista de funcionalidades.
- Direcione bugs reproduzíveis para issues.
- Registre dúvidas recorrentes e transforme-as em documentação.
- Meça instalação concluída, primeiro resultado e problemas — não apenas estrelas.
- Mantenha roadmap e estado do projeto honestos.

## Definição de pronto

- [ ] Escopo público e limites estão claros.
- [ ] Direitos de redistribuição foram verificados.
- [ ] Segurança atual e histórica foi revisada.
- [ ] Instalação funciona em ambiente limpo.
- [ ] README mostra valor, demonstração e limitações.
- [ ] Licença, segurança, suporte e contribuição estão documentados.
- [ ] Release e canal de distribuição foram testados.
- [ ] Existe um responsável por triagem após o lançamento.

