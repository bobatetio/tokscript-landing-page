#!/usr/bin/env bash
set -Eeuo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
. "$DIR/next_env.sh"
ensure_node

command -v pm2 >/dev/null || { echo "ERROR: pm2 not on PATH"; exit 1; }

cd "$APP_DIR"

[ -L current ] || { echo "ERROR: current symlink missing"; exit 1; }

PM2_SPEC="/tmp/pm2-${APP_NAME}.json"
cat > "$PM2_SPEC" <<JSON
{
  "apps": [{
    "name": "${APP_NAME}",
    "cwd": "${APP_DIR}/current",
    "script": "npm",
    "args": "start",
    "env": { "NODE_ENV": "production", "PORT": "${PORT}", "HOST": "0.0.0.0", "HOSTNAME": "0.0.0.0" }
  }]
}
JSON

echo "PM2 start/reload ${APP_NAME} on :${PORT}…"
pm2 startOrReload "$PM2_SPEC" || pm2 start npm --name "$APP_NAME" --cwd "$APP_DIR/current" -- start
pm2 save

# Health check
sleep 5
ok=0
for i in $(seq 1 10); do
  if curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null; then echo "App is up on :${PORT}"; ok=1; break; fi
  sleep 5
done
if [ "$ok" -ne 1 ]; then
  echo "Health check failed on :${PORT}"
  pm2 logs "$APP_NAME" --lines 120 || true
  (ss -ltnp 2>/dev/null || netstat -ltnp 2>/dev/null) | grep ":${PORT}\b" || echo "Nothing listening on :${PORT}"
  exit 1
fi

echo "Start complete. $(pm2 list | grep -E "${APP_NAME}|name" || true)"
