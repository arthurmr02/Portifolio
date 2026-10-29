#!/usr/bin/env bash
# Hook PostToolUse (Edit|Write): formata com Prettier o arquivo que a IA acabou de editar.
# Assim o codigo gerado ja nasce no padrao, antes mesmo do lint-staged no commit.
set -euo pipefail

file=$(jq -r '.tool_input.file_path // ""')

case "$file" in
  *.js|*.jsx|*.json|*.css|*.md|*.html|*.yml)
    npx --no-install prettier --write "$file" >/dev/null 2>&1 || true
    ;;
esac
exit 0
