#!/usr/bin/env bash
# Hook PreToolUse (Bash): impede commit e push direto na branch main.
# Recebe o JSON do evento no stdin. Saida 2 bloqueia a chamada e devolve a
# mensagem do stderr para a IA, que entao cria uma branch feature/*.
set -euo pipefail

command=$(jq -r '.tool_input.command // ""')

if echo "$command" | grep -Eq 'git (commit|push)'; then
  branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
  if [ "$branch" = "main" ] || echo "$command" | grep -Eq 'git push.*(origin )?main'; then
    echo "Bloqueado: nao faca commit nem push direto na main." >&2
    echo "Crie uma branch (git checkout -b feature/<nome>) e integre com merge --no-ff." >&2
    exit 2
  fi
fi
exit 0
