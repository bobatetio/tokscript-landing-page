#!/usr/bin/env bash
set -Eeuo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
"$DIR/next_release.sh"
"$DIR/next_start.sh"
