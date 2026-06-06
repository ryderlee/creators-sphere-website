#!/usr/bin/env bash
#
# Deploy helper for the Creators Sphere website.
#   npm run deploy                 # commits staged + unstaged changes as "content update"
#   npm run deploy -- "my message" # commits with your own message
#
# What it does:
#   1. Builds locally first (fails fast — a broken build never gets pushed)
#   2. Commits any changes
#   3. Pushes to origin/main  (this is what triggers the GitHub Pages deploy)
#   4. Watches the GitHub Actions run and prints the live URL
#
set -euo pipefail

cd "$(dirname "$0")/.."

LIVE_URL="https://ryderlee.github.io/creators-sphere-website/"
GREEN=$'\033[32m'; YELLOW=$'\033[33m'; RED=$'\033[31m'; DIM=$'\033[2m'; OFF=$'\033[0m'

# ── 0. Must be on main (Pages only deploys from main) ───────────────────────
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$BRANCH" != "main" ]; then
  echo "${RED}✗ You are on '$BRANCH', not 'main'. Deploys only run from main.${OFF}" >&2
  exit 1
fi

# ── 1. Build locally to catch errors before pushing ─────────────────────────
echo "${YELLOW}▶ Building locally to verify…${OFF}"
npm run build

# ── 2. Commit changes (if any) ──────────────────────────────────────────────
if [ -n "$(git status --porcelain)" ]; then
  MSG="${1:-content update}"
  echo "${YELLOW}▶ Committing changes:${OFF} ${MSG}"
  git add -A
  git commit -q -m "$MSG"
else
  echo "${DIM}▶ No file changes — will push any unpushed commits.${OFF}"
fi

# ── 3. Anything to push? ────────────────────────────────────────────────────
if [ -z "$(git log origin/main..HEAD --oneline 2>/dev/null)" ]; then
  echo "${GREEN}✓ Already up to date with origin/main. Nothing to deploy.${OFF}"
  exit 0
fi

# ── 4. Push (triggers the GitHub Pages deploy) ──────────────────────────────
echo "${YELLOW}▶ Pushing to origin/main…${OFF}"
git push origin main

# ── 5. Watch the deploy ─────────────────────────────────────────────────────
if command -v gh >/dev/null 2>&1; then
  echo "${YELLOW}▶ Watching GitHub Actions deploy…${OFF}"
  sleep 4
  RUN="$(gh run list --limit 1 --json databaseId --jq '.[0].databaseId' 2>/dev/null || true)"
  if [ -n "$RUN" ]; then
    gh run watch "$RUN" --exit-status --interval 6 >/dev/null 2>&1 \
      && echo "${GREEN}✓ Deployed.${OFF}" \
      || { echo "${RED}✗ Deploy failed — see: gh run view $RUN --log-failed${OFF}"; exit 1; }
  fi
else
  echo "${DIM}  (install GitHub CLI 'gh' to auto-watch the run)${OFF}"
fi

echo "${GREEN}✓ Live in ~1 min:${OFF} ${LIVE_URL}"
