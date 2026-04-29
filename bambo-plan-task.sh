#!/bin/sh
set -eu

# (Run your existing "create .env.production" task BEFORE this one)

rm -f release.zip
zip -qr release.zip . \
  -x ".git/*" "node_modules/*" ".next/*" "releases/*" "*.zip" "*.tgz"

ls -lh release.zip




#!/bin/sh
set -eu

# Read values from Bamboo plan variables (set these in the plan):
API_URL="${bamboo.NEXT_PUBLIC_API_URL}"
FRONTEND_URL="${bamboo.NEXT_PUBLIC_FRONTEND_URL}"

# Basic guard so we fail fast if they’re missing
if [ -z "$API_URL" ] || [ -z "$FRONTEND_URL" ]; then
  echo "ERROR: Set Bamboo vars NEXT_PUBLIC_API_URL and NEXT_PUBLIC_FRONTEND_URL."
  exit 1
fi

# 1) Generate .env.production for Next (used at build time on the server)
rm -f .env.production
cat > .env.production <<EOF
NODE_ENV=production
NEXT_PUBLIC_API_URL=$API_URL
NEXT_PUBLIC_FRONTEND_URL=$FRONTEND_URL
EOF

# (Optional) show what we wrote
echo "Wrote .env.production:"
sed -n '1,120p' .env.production