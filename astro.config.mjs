// @ts-check
import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages *project* site:
//   https://ryderlee.github.io/creators-sphere-website/
// To move to the custom domain later: set `site: 'https://creatorssphere.sg'`,
// `base: '/'`, and re-add public/CNAME. All internal links use BASE_URL, so
// they adjust automatically.
export default defineConfig({
  site: 'https://ryderlee.github.io',
  base: '/creators-sphere-website',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
