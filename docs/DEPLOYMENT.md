# Deployment guide

How the Creators Sphere website is hosted, how to ship changes, and how to fix
things when they go wrong.

- **Live site:** https://ryderlee.github.io/creators-sphere-website/
- **Repo:** `ryderlee/creators-sphere-website` (private; the published site is public)
- **Host:** GitHub Pages, built and deployed by GitHub Actions on every push to `main`
- **Type:** static site (Astro) — no server, no database, no runtime

---

## TL;DR — how to ship a change

```bash
cd creators_sphere_website
# edit files…
npm run dev            # preview locally at http://localhost:4321/creators-sphere-website/
npm run deploy -- "describe your change"
```

`npm run deploy` builds locally first (so a broken build never goes live),
commits, pushes to `main`, watches the GitHub Actions run, and prints the live
URL. The site updates ~40–60s after the run goes green.

> **Push is what deploys, not commit.** A commit you never push changes nothing.
> `npm run deploy` handles the push for you.

---

## The two ways to deploy

### 1. `npm run deploy` (recommended)

```bash
npm run deploy                      # commits changes as "content update", pushes, watches
npm run deploy -- "fix FAQ typo"    # same, with your own commit message
```

It will refuse to run if you're not on `main`, and abort if the local build
fails — so you never push something broken.

### 2. Plain git (manual)

```bash
git add -A
git commit -m "your message"
git push origin main
```

Same result — the push to `main` triggers the deploy. Watch it with
`gh run watch` or in the repo's **Actions** tab.

### 3. Edit on github.com (no terminal)

Open any file on github.com, click the pencil ✏️, edit, and "Commit changes" to
`main`. That's a push, so it auto-deploys too. Handy for quick copy fixes.

---

## What happens on a push (the pipeline)

Defined in [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml):

1. Checkout the repo
2. `npm ci` (install exact dependencies from `package-lock.json`)
3. `npm run build` → outputs the static site to `dist/`
4. Upload `dist/` as a Pages artifact
5. Deploy the artifact to GitHub Pages

If the build step fails, **deployment is skipped and the current live site stays
up** — a bad commit can't take the site down.

---

## Where content lives

| Want to change… | Edit… |
| --- | --- |
| Page copy / headings / FAQ | `src/pages/*.astro` (e.g. `index.astro`, `for-brands.astro`) |
| Legal text | `src/pages/privacy.astro`, `terms.astro`, `account-deletion.astro`, `cookies.astro` |
| Links, emails, admin portal URL, app-store links | `src/consts.ts` |
| Photos | `public/img/` (keep filenames to swap in place; see `public/img/CREDITS.md`) |
| Colors, fonts, design tokens | `src/styles/global.css` |
| Header / footer / shared bits | `src/components/`, `src/layouts/` |

After editing, always `npm run dev` to preview before deploying.

---

## Rolling back a bad change

The live site is just whatever `main` last built. To roll back:

```bash
git revert HEAD            # undo the last commit (keeps history)
npm run deploy -- "revert: roll back last change"
```

Or redeploy a known-good commit without changing files: open the repo's
**Actions** tab → pick the last green **Deploy to GitHub Pages** run →
**Re-run all jobs**.

---

## Local preview

```bash
npm install        # first time only
npm run dev        # http://localhost:4321/creators-sphere-website/ (live-reloads)
npm run build      # produce dist/ exactly as CI does (catch build errors)
npm run preview    # serve the built dist/ locally, same as production
```

Use Node 18, 20, or 22 (CI uses 20).

---

## Switching to the custom domain (creatorssphere.sg)

The site currently lives at a GitHub project **subpath**
(`/creators-sphere-website/`). Internal links use the `url()` helper in
`src/base.ts`, so moving to the root domain is a config change, not a rewrite.

1. `src/consts.ts` → `SITE_URL = 'https://creatorssphere.sg'`
2. `astro.config.mjs` → `base: '/'`
3. Create `public/CNAME` containing one line: `creatorssphere.sg`
4. At your DNS provider, point the apex domain at GitHub Pages:
   - `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `AAAA` → `2606:50c0:8000::153`, `…8001::153`, `…8002::153`, `…8003::153`
5. Repo **Settings → Pages** → set the custom domain to `creatorssphere.sg`, wait
   for the DNS check, then tick **Enforce HTTPS**.
6. `npm run deploy -- "chore: switch to creatorssphere.sg"`

After step 6, every link resolves at the root automatically.

---

## Troubleshooting

**Build fails in `npm run deploy`.** Read the error — it's the same as
`npm run build`. Common causes: a typo in an `.astro` file or a bad import. Fix
and re-run. Nothing was pushed.

**Push rejected (non-fast-forward).** Someone (or a github.com edit) pushed
first. Run `git pull --rebase origin main`, resolve any conflicts, then
`npm run deploy`.

**Styles or images missing after deploy.** Almost always a path that isn't
base-aware. Internal paths must go through the `url()` helper, e.g.
`src={url('/img/foo.jpg')}`, not `src="/img/foo.jpg"`. Run `npm run build` and
check that `dist/index.html` references `/creators-sphere-website/…` paths.

**Old content still showing.** Browser/CDN cache. Hard-refresh
(Cmd/Ctrl+Shift+R). GitHub's CDN usually updates within a minute of a green run.

**Deploy run didn't start.** It only triggers on pushes to `main`. Confirm with
`git branch --show-current` and that your commit actually pushed
(`git log origin/main..HEAD` should be empty after a successful deploy).

**Check the latest run from the terminal:**

```bash
gh run list --limit 5
gh run view --log-failed     # logs for the most recent failed run
```
