---
name: new-component
description: Cria um componente React novo seguindo a arquitetura do projeto (pasta certa, reaproveitando ui/, sem lógica de dados). Use ao pedir "crie um componente", card, seção ou formulário.
---

# Novo componente

1. **Escolha a pasta** pela responsabilidade:
   - genérico e usado em várias telas: `src/components/ui/`
   - específico de uma funcionalidade: `src/components/<funcionalidade>/`
   - estrutura da página (cabeçalho, rodapé): `src/components/layout/`
2. **Procure antes de criar.** Leia `src/components/ui/` e veja se `Button`, `Card`,
   `Skeleton`, `Badge` ou `QueryState` já resolvem. Estenda o existente em vez de duplicar.
3. **Separe lógica de apresentação.** Se precisar de dados, crie ou use um hook em
   `src/hooks/` que chama um serviço de `src/services/`. O componente só recebe props
   ou chama o hook e desenha.
4. **Estados obrigatórios** para dado remoto: carregando (skeleton do mesmo tamanho),
   erro com botão de tentar de novo, e vazio. Use `QueryState`.
5. **Nomes e arquivo:** `PascalCase.jsx`, um componente por arquivo, `export default`.
6. **Estilo:** Tailwind com os tokens (`bg-surface`, `text-ink`, `text-muted`,
   `border-line`, `text-accent`). Não use cores soltas; elas quebram o tema escuro.
7. **Acessibilidade:** elementos semânticos, `aria-label` em botões só com ícone,
   foco visível já vem do `index.css`.
8. **Teste** quando houver regra (validação, bloqueio, condição). Arquivo
   `Nome.test.jsx` ao lado do componente.
9. Rode `npm run lint && npm test` e finalize com a skill `commit-conventional`.
