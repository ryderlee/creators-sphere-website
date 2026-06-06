// Prefix an internal path with the deploy base (e.g. '/creators-sphere-website/').
// Astro auto-prefixes its own assets, but NOT hand-written paths in markup/styles,
// so use this for /img, page routes, favicon, anchors, etc.
// BASE_URL always ends with '/'. Works at root ('/') and at a subpath alike.
const BASE = import.meta.env.BASE_URL;

export const url = (path = ''): string => BASE.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
