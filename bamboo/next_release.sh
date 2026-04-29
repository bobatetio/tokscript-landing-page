#!/usr/bin/env bash
set -Eeuo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
. "$DIR/next_env.sh"
ensure_node

command -v unzip >/dev/null || { echo "ERROR: unzip not installed"; exit 1; }
command -v node  >/dev/null || { echo "ERROR: node not on PATH"; exit 1; }

mkdir -p "$APP_DIR" "$APP_DIR/releases"
cd "$APP_DIR"

# Pick archive
ZIP=""
[ -f source.zip ]  && ZIP="source.zip"
[ -z "$ZIP" ] && [ -f release.zip ] && ZIP="release.zip"
[ -n "$ZIP" ] || { echo "ERROR: no source.zip or release.zip in $APP_DIR"; ls -lah; exit 1; }

# New release dir
ts="$(date +%Y%m%d%H%M%S)"
RELEASE_DIR="$APP_DIR/releases/$ts"
mkdir -p "$RELEASE_DIR"
echo "Unpacking $ZIP -> $RELEASE_DIR"
unzip -oq "$ZIP" -d "$RELEASE_DIR"

# Flatten single-folder zips
cd "$RELEASE_DIR"
if [ ! -f package.json ]; then
  if [ "$(find . -mindepth 1 -maxdepth 1 -type d | wc -l)" -eq 1 ]; then
    inner="$(find . -mindepth 1 -maxdepth 1 -type d | head -n1)"
    if [ -f "$inner/package.json" ]; then
      shopt -s dotglob; mv "$inner"/* "$RELEASE_DIR"/; rmdir "$inner"; shopt -u dotglob
    fi
  fi
fi

# ---------- STRICT ENV HANDOFF ----------
# We expect Bamboo build to include the correct file in the zip.
# - DEPLOY_ENV=staging  -> .env.staging must exist
# - DEPLOY_ENV=prod     -> .env.production must exist
# - DEPLOY_ENV=dev      -> .env.development must exist
case "${DEPLOY_ENV:-staging}" in
  prod|production) ENV_SRC=".env.production" ;;
  staging)         ENV_SRC=".env.staging" ;;
  dev|development) ENV_SRC=".env.development" ;;
  *) echo "ERROR: unknown DEPLOY_ENV='${DEPLOY_ENV:-unset}' (use dev|staging|prod)"; exit 1 ;;
esac

if [ ! -f "$ " ]; then
  echo "ERROR: expected '$ENV_SRC' in the release for DEPLOY_ENV='${DEPLOY_ENV}'."
  exit 1
fi

# Always provide .env for runtime AND .env.production for Next build
cp -f "$ENV_SRC" .env
if [ "$ENV_SRC" != ".env.production" ]; then
  cp -f "$ENV_SRC" .env.production
fi
echo "Using $ENV_SRC -> .env $( [ "$ENV_SRC" != ".env.production" ] && echo '+ .env.production')"

# Install & build
rm -rf .next next-dist || true
set +e; npm ci; ci=$?; set -e
[ $ci -ne 0 ] && { echo "npm ci failed → npm install"; npm install; }
npm run build

# Dist location
DIST=""
[ -d "next-dist" ] && DIST="next-dist"
[ -z "$DIST" ] && [ -d ".next" ] && DIST=".next"
[ -n "$DIST" ] || { echo "ERROR: no .next or next-dist after build"; exit 1; }

# Optional legacy static/ bridge
if [ ! -d "$DIST/static" ] && [ -d "static" ]; then
  echo "Bridging legacy static/ -> $DIST/static"
  mkdir -p "$DIST/static"; cp -a static/. "$DIST/static/"
fi

# Write a release id (helps cross-project rollback)
RID="${RELEASE_ID:-${BAMBOO_DEPLOYMENT_VERSION_NAME:-$ts}}"
echo "$RID" > RELEASE_ID

# Point current → this release
ln -sfn "$RELEASE_DIR" "$APP_DIR/current"

# Keep only last 5
ls -1dt "$APP_DIR"/releases/* 2>/dev/null | tail -n +6 | xargs -r rm -rf

echo "Prepared release: $RELEASE_DIR (RELEASE_ID=$(cat RELEASE_ID))"
