#!/usr/bin/env bash
# Use Node 18+ so Vite 6 runs (avoids "Unexpected token '||='" on Node 14).
# Prefer nvm's Node 20; fallback to explicit path if nvm is blocked by npm_config_prefix.
unset npm_config_prefix
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [ -f "$NVM_DIR/nvm.sh" ]; then
  source "$NVM_DIR/nvm.sh"
  nvm use 20 2>/dev/null || nvm use 18 2>/dev/null || true
fi
# If we still have Node 14 (nvm may not have switched), use nvm's node 20 explicitly
if command -v node &>/dev/null && [ "$(node -v 2>/dev/null | cut -d. -f1 | tr -d v)" -lt 18 ] 2>/dev/null; then
  for dir in "$NVM_DIR/versions/node"/v2* "$NVM_DIR/versions/node"/v18*; do
    if [ -x "$dir/bin/node" ]; then
      export PATH="$dir/bin:$PATH"
      break
    fi
  done
fi
exec npx vite "$@"
