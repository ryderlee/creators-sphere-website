// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to the custom domain https://creatorsphere.sg (see public/CNAME).
// All internal links go through src/base.ts `url()`, which follows BASE_URL,
// so switching `base` back to a subpath needs no other edits.
export default defineConfig({
  site: 'https://creatorsphere.sg',
  base: '/',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
