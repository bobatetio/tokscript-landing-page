#!/usr/bin/env bash
set -Eeuo pipefail

# ---- Defaults (can override via Bamboo SSH task env) ----
DEPLOY_ENV=production
export APP_DIR="${APP_DIR:-/root/tokscript-production/tokscript-nuxt}"
export DEPLOY_ENV="${DEPLOY_ENV:-staging}"

case "${DEPLOY_ENV}" in
  prod|production)
    export APP_NAME="${APP_NAME:-tokscript-v2-next-prod}"
    export PORT="${PORT:-3009}"
    export NODE_ENV_VALUE="production"
    ;;
  staging)
    export APP_NAME="${APP_NAME:-tokscript-v2-next-staging}"
    export PORT="${PORT:-3007}"
    export NODE_ENV_VALUE="production"
    ;;
  dev|development)
    export APP_NAME="${APP_NAME:-tokscript-v2-next-dev}"
    export PORT="${PORT:-3005}"
    export NODE_ENV_VALUE="development"
    ;;
  *)
    export APP_NAME="${APP_NAME:-tokscript-v2-next-unknown}"
    export PORT="${PORT:-3007}"
    export NODE_ENV_VALUE="production"
    ;;
esac

export NODE_ENV="$NODE_ENV_VALUE"
export NEXT_TELEMETRY_DISABLED=1

# Node 22 (nvm) helper
ensure_node() {
  export NVM_DIR="$HOME/.nvm"
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
    nvm install 22 >/dev/null || true
    nvm use 22 >/dev/null || true
    NODE_BIN="$(dirname "$(nvm which 22)")"
    export PATH="$NODE_BIN:/usr/local/bin:/usr/bin:$PATH"
  else
    export PATH="$HOME/.nvm/versions/node/v22.19.0/bin:/usr/local/bin:/usr/bin:$PATH"
  fi
  echo "Node: $(node -v) | npm: $(npm -v 2>/dev/null || echo n/a)"
}
