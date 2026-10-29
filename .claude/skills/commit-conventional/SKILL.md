---
name: commit-conventional
description: Faz commits no padrão Conventional Commits do projeto, em português, e confere branch, lint e testes antes. Use ao pedir "commita", "salva isso" ou ao terminar uma tarefa.
---

# Commit padronizado

1. `git branch --show-current`. Se estiver em `main`, pare e crie
   `feature/<nome>` (ou `fix/<nome>`). Nunca commite na `main`.
2. `git status` e `git diff --stat`. Se o diff mistura assuntos, divida em commits
   menores (`git add <arquivos>`), um assunto por commit.
3. Confirme que `npm run lint`, `npm run format:check` e `npm test` passam.
4. Escreva a mensagem: `tipo: descrição no imperativo, em português`
   - `feat`: funcionalidade nova. `fix`: correção. `refactor`: mudança sem alterar
     comportamento. `test`, `docs`, `style`, `perf`, `chore`, `ci`.
   - Até 100 caracteres no título, sem ponto final.
   - Exemplos: `feat: adiciona skeleton nos cards de projeto`,
     `fix: corrige redirecionamento do painel sem login`.
5. Commite normalmente. O Husky roda `lint-staged` e `commitlint`; se recusar, corrija
   a causa. Nunca use `--no-verify`.
6. Para integrar: `git switch main && git merge --no-ff feature/<nome>`.
