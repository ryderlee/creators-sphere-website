// ─────────────────────────────────────────────────────────────────────────────
// Single source of truth for site-wide constants.
// Change links / contact info here and they propagate everywhere.
// ─────────────────────────────────────────────────────────────────────────────

/** Canonical site origin (used for <link rel=canonical>, sitemap, OG URLs). */
export const SITE_URL = 'https://creatorssphere.sg';

export const SITE_NAME = 'Creators Sphere';
export const SITE_TAGLINE = 'Your next paycheck is one tap away';
export const SITE_DESCRIPTION =
  'Creators Sphere connects creators in Singapore with paid brand campaigns. ' +
  'Discover gigs, create, submit proof, get paid — all from one app.';

/**
 * Admin portal for brands & agencies.
 * TODO(team): confirm the production host. Defaulting to the `admin.` subdomain
 * of the marketing domain. Current dev portal: https://89.116.157.48/admin-dev
 */
export const ADMIN_PORTAL_URL = 'https://admin.creatorssphere.sg';

/**
 * App store links. Apps are not published yet → badges render as
 * "Coming soon" (non-linking) while these are null.
 */
export const APP_STORE_URL: string | null = null;
export const PLAY_STORE_URL: string | null = null;

export const CONTACT_EMAIL = 'hello@creatorssphere.sg';
export const SUPPORT_EMAIL = 'support@creatorssphere.sg';
export const PRIVACY_EMAIL = 'privacy@creatorssphere.sg';

/** Company legal placeholders — replace before publishing legal pages. */
export const LEGAL_ENTITY = '[COMPANY LEGAL NAME] Pte. Ltd.';
export const LEGAL_ADDRESS = '[REGISTERED ADDRESS], Singapore';
export const LEGAL_LAST_UPDATED = '5 June 2026';
export const GOVERNING_LAW = 'Singapore';

/** Social handles (used in footer). Empty string hides the link. */
export const SOCIAL = {
  instagram: 'https://instagram.com/creatorssphere',
  threads: 'https://threads.net/@creatorssphere',
  tiktok: '',
  linkedin: '',
};

export const NAV_LINKS = [
  { href: '/#how', label: 'How it works' },
  { href: '/#creators', label: 'For Creators' },
  { href: '/for-brands', label: 'For Brands' },
  { href: '/#faq', label: 'FAQ' },
];
