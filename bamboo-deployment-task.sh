#!/usr/bin/env bash
set -Eeuo pipefail

### --- CONFIG (override via env on the SSH task) ---
APP_DIR="${APP_DIR:-/root/tokscript-new-design/tokscript-nuxt}"
APP_NAME="${APP_NAME:-tokscript-v2-next-staging}"
PORT="${PORT:-3007}"

# always do npm install/build/start (no yarn, no standalone)
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

### --- Force Node 22 (nvm), fallback to a fixed path if nvm isn’t loaded ---
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # shellcheck source=/dev/null
  . "$NVM_DIR/nvm.sh"
  nvm install 22 >/dev/null || true
  nvm use 22 >/dev/null || true
  NODE_BIN="$(dirname "$(nvm which 22)")"
  export PATH="$NODE_BIN:/usr/local/bin:/usr/bin:$PATH"
else
  export PATH="$HOME/.nvm/versions/node/v22.19.0/bin:/usr/local/bin:/usr/bin:$PATH"
fi
echo "Node: $(node -v) | npm: $(npm -v 2>/dev/null || echo n/a)"

command -v unzip >/dev/null || { echo "ERROR: unzip not installed"; exit 1; }
command -v pm2   >/dev/null || { echo "ERROR: pm2 not on PATH"; exit 1; }
command -v node  >/dev/null || { echo "ERROR: node not on PATH"; exit 1; }

mkdir -p "$APP_DIR" "$APP_DIR/releases"
cd "$APP_DIR"

### --- Pick archive uploaded by Bamboo (source.zip preferred, else release.zip) ---
ZIP=""
[ -f source.zip ]  && ZIP="source.zip"
[ -z "$ZIP" ] && [ -f release.zip ] && ZIP="release.zip"
[ -n "$ZIP" ] || { echo "ERROR: no source.zip or release.zip in $APP_DIR"; ls -lah; exit 1; }

### --- Unpack to new timestamped release dir ---
ts="$(date +%Y%m%d%H%M%S)"
RELEASE_DIR="$APP_DIR/releases/$ts"
mkdir -p "$RELEASE_DIR"
echo "Unpacking $ZIP -> $RELEASE_DIR"
unzip -oq "$ZIP" -d "$RELEASE_DIR"

# Flatten single-folder zips (if the zip contains one top-level dir)
cd "$RELEASE_DIR"
if [ ! -f package.json ]; then
  if [ "$(find . -mindepth 1 -maxdepth 1 -type d | wc -l)" -eq 1 ]; then
    inner="$(find . -mindepth 1 -maxdepth 1 -type d | head -n1)"
    if [ -f "$inner/package.json" ]; then
      shopt -s dotglob
      mv "$inner"/* "$RELEASE_DIR"/
      rmdir "$inner"
      shopt -u dotglob
    fi
  fi
fi

### --- Ensure build-time env file (or create from SSH task env) ---
if [ ! -f .env.production ]; then
  if [ -n "${NEXT_PUBLIC_API_URL:-}" ] && [ -n "${NEXT_PUBLIC_FRONTEND_URL:-}" ]; then
    cat > .env.production <<EOF
NODE_ENV=production
NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
NEXT_PUBLIC_FRONTEND_URL=${NEXT_PUBLIC_FRONTEND_URL}
EOF
    echo "Wrote .env.production from SSH task env."
  else
    echo "ERROR: .env.production missing and NEXT_PUBLIC_* env not provided."
    exit 1
  fi
else
  echo "Using .env.production from the zip."
fi

### --- Clean any old build outputs inside this release, then build fresh ---
rm -rf .next next-dist || true
echo "Installing deps (npm install)…"
npm install
echo "Building (npm run build)…"
npm run build

### --- Figure out dist location used by Next start (.next vs next-dist) ---
DIST=""
if [ -d "next-dist" ]; then
  DIST="next-dist"
elif [ -d ".next" ]; then
  DIST=".next"
else
  echo "ERROR: No .next or next-dist after build."
  exit 1
fi

### --- Asset sanity: ensure static exists beside the build (fix for missing images) ---
# For old repos/zips that left a 'static/' at repo root, copy it into the dist.
if [ ! -d "$DIST/static" ] && [ -d "static" ]; then
  echo "Bridging legacy static/ -> $DIST/static"
  mkdir -p "$DIST/static"
  rsync -a static/ "$DIST/static/"
fi

echo "Static/media quick peek:"
find "$DIST/static" -maxdepth 2 -type f | head -n 25 || echo "(no files found in $DIST/static)"

### --- Switch 'current' symlink to new release ---
ln -sfn "$RELEASE_DIR" "$APP_DIR/current"

### --- PM2: run 'npm start' (no standalone) ---
PM2_SPEC="/tmp/pm2-${APP_NAME}.json"
cat > "$PM2_SPEC" <<JSON
{
  "apps": [{
    "name": "${APP_NAME}",
    "cwd": "${APP_DIR}/current",
    "script": "npm",
    "args": "start",
    "env": {
      "NODE_ENV": "production",
      "PORT": "${PORT}",
      "HOST": "0.0.0.0",
      "HOSTNAME": "0.0.0.0"
    }
  }]
}
JSON

echo "Starting with PM2 via 'npm start' on port ${PORT}…"
pm2 startOrReload "$PM2_SPEC" || pm2 start npm --name "$APP_NAME" --cwd "$APP_DIR/current" -- start
pm2 save

### --- Health check ---
sleep 7
ok=0
for i in $(seq 1 10); do
  if curl -fsS "http://127.0.0.1:${PORT}/" >/dev/null; then
    echo "App is up on :${PORT}"
    ok=1
    break
  fi
  sleep 2
done
if [ "$ok" -ne 1 ]; then
  echo "Health check failed on :${PORT}"
  pm2 logs "$APP_NAME" --lines 100 || true
  (ss -ltnp 2>/dev/null || netstat -ltnp 2>/dev/null) | grep ":${PORT}\b" || echo "Nothing listening on :${PORT}"
  exit 1
fi

### --- Housekeeping & latest info ---
# keep last 5 releases
ls -1dt "$APP_DIR"/releases/* 2>/dev/null | tail -n +6 | xargs -r rm -rf

LATEST="$(ls -1dt "$APP_DIR"/releases/* | head -n1 || true)"
echo "Latest release dir: ${LATEST:-unknown}"
pm2 list | grep -E "${APP_NAME}|name" || true
echo "Deploy complete."
