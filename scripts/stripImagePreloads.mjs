// vite-react-ssg injects a blanket <link rel="preload" as="image"> for every
// <img> in a page's rendered HTML — on home that was 11 preloads (~4 MB of
// PNGs) fighting the LCP hero for bandwidth on cheap Android connections.
// The injection is library behavior, not repo config, so the clean seam is
// the SSG's onPageRendered hook (vite.config.js) calling this rewrite.
//
// Keep rules:
//   1. Preloads carrying fetchpriority="high" survive — these are deliberate
//      (blog posts preload their own hero this way).
//   2. The home hero image survives — it is the LCP element on / and its
//      clone routes.
// Everything else is stripped; below-the-fold imgs are loading="lazy" now.

export const HERO_IMAGE = '/assets/screenshots/home-screen.webp';

const IMAGE_PRELOAD_RE = /<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g;

export function stripBlanketImagePreloads(html) {
  return html.replace(IMAGE_PRELOAD_RE, (tag) => {
    if (tag.includes('fetchpriority="high"')) return tag;
    if (tag.includes(HERO_IMAGE)) return tag;
    return '';
  });
}
