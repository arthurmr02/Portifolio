---
name: feature-workflow
description: Fluxo completo de uma funcionalidade, da branch ao deploy. Use ao começar qualquer funcionalidade nova ou quando pedirem "vamos implementar X".
---

# Da ideia ao deploy

1. **Branch:** `git switch main && git switch -c feature/<nome-curto>`.
2. **Entenda o requisito** em `docs/requisitos.md` e confira em qual camada cada parte
   vai (veja a arquitetura no `CLAUDE.md`): serviço, hook, componente, página.
3. **Implemente de baixo para cima:** `services/` → `hooks/` → `components/` → `pages/`
   → rota em `src/app/routes.jsx`.
4. **Estados de dados:** loading, erro e vazio em tudo que vem de API.
5. **Peso:** se a parte for pesada ou só o dono usa, carregue com `lazy`/`import()`.
6. **Teste** a regra principal (Vitest + Testing Library).
7. **Verifique:** `npm run lint && npm run format:check && npm test && npm run build`.
8. **Commits** pela skill `commit-conventional`.
9. **Integração:** merge `--no-ff` na `main` (ou Pull Request). O push na `main`
   dispara o deploy automático da Vercel; o CI do GitHub Actions roda os mesmos checks.
10. Registre decisões novas de stack em `docs/stack-decisions.md`.
