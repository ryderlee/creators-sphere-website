# Creators Sphere — website

Marketing & App Store website for **Creators Sphere** (`creatorssphere.sg`), the
influencer-marketing platform connecting creators in Singapore with paid brand
campaigns. Dual-audience, creator-forward, with a clear path into the brand
**Admin Portal**.

Built with [Astro](https://astro.build) (static output, near-zero client JS).
The design system is lifted verbatim from the product source of truth (mobile app
`home_mockup_v2.html` + admin portal `prototype/assets/app.css`) — the "Mango
Sunset" palette, Bricolage Grotesque + Manrope, vibrant-magazine aesthetic.

## Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server (http://localhost:4321)
npm run build      # static build → ./dist
npm run preview    # preview the production build
```

## Structure

```
src/
├── consts.ts              # ← edit links/emails/legal placeholders here
├── styles/global.css      # design tokens + base styles
├── layouts/               # Layout.astro (shell), Legal.astro (prose)
├── components/            # Header, Footer, Logo, AppBadges, PhoneMock
└── pages/
    ├── index.astro        # home (creator-forward + brands band)
    ├── for-brands.astro   # B2B → Admin Portal
    ├── support.astro      # help / contact (Apple support URL)
    ├── privacy.astro      # Privacy Policy
    ├── terms.astro        # Terms of Service
    ├── account-deletion.astro
    └── cookies.astro
public/img/                # curated Unsplash photos (see CREDITS.md)
```

## Before launch — checklist

- [ ] Set the real **admin portal URL** (`ADMIN_PORTAL_URL` in `src/consts.ts`).
- [ ] Add live **App Store / Play Store** links (`APP_STORE_URL`, `PLAY_STORE_URL`) — badges auto-switch from "Coming soon" to linked.
- [ ] Replace placeholder **photos** in `public/img/` with real campaign shots (`CREDITS.md` lists each).
- [ ] Fill in legal placeholders (`LEGAL_ENTITY`, `LEGAL_ADDRESS`, emails) and have **counsel review** the legal pages.
- [ ] Confirm contact emails resolve (`hello@`, `support@`, `privacy@`).
