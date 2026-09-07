// vite-react-ssg injects a blanket <link rel="preload" as="image"> for every
// <img> in a page's rendered HTML — on home that was 11 preloads (~4 MB of
// PNGs) fighting the LCP hero for bandwidth on cheap Android connections.
// The injection is library behavior, not repo config, so the clean seam is
// the SSG's onPageRendered hook (vite.config.js) calling this rewrite.
//
// Keep rules:
//   1. Preloads carrying fetchpriority="high" survive — these mirror a
//      deliberate fetchPriority on the <img> (blog heroes, the home hero).
//   2. The home hero image survives by href as a belt-and-braces rule — it
//      is the LCP element on / and its clone routes.
// Everything else is stripped; below-the-fold imgs are loading="lazy" now.
//
// Detection is attribute-order- and quote-style-insensitive on purpose: a
// vite-react-ssg update that reorders attributes must not silently defeat
// the stripper. scripts/checkImagePreloads.mjs shares these helpers so the
// post-build guard can never drift from the stripper's idea of a preload.

export const HERO_IMAGE = '/assets/screenshots/home-screen-framed.webp';

const LINK_TAG_RE = /<link\b[^>]*>/g;

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? (match[1] ?? match[2]) : null;
}

export function isImagePreload(tag) {
  return attr(tag, 'rel') === 'preload' && attr(tag, 'as') === 'image';
}

export function isDeliberatePreload(tag) {
  if ((attr(tag, 'fetchpriority') || '').toLowerCase() === 'high') return true;
  return (attr(tag, 'href') || '').includes(HERO_IMAGE);
}

export function findImagePreloads(html) {
  return (html.match(LINK_TAG_RE) ?? []).filter(isImagePreload);
}

export function stripBlanketImagePreloads(html) {
  return html.replace(LINK_TAG_RE, (tag) => {
    if (!isImagePreload(tag)) return tag;
    return isDeliberatePreload(tag) ? tag : '';
  });
}
