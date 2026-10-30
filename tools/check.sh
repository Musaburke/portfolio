#!/usr/bin/env bash
# Type check, build, then list every placeholder still to fill.
set -euo pipefail
cd "$(dirname "$0")/.."
npx astro check
npx astro build
echo
echo "== TODO(musa) still open =="
grep -rn "TODO(musa)" src astro.config.mjs || echo "none"
