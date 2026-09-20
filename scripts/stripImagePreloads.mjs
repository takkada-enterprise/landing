// vite-react-ssg injects a blanket <link rel="preload" as="image"> for every
// <img> in a page's rendered HTML — on home that was 11 preloads (~4 MB of
// PNGs) fighting the LCP hero for bandwidth on cheap Android connections.
// The injection is library behavior, not repo config, so the clean seam is
// the SSG's onPageRendered hook (vite.config.js) calling this rewrite.
//
// Keep rules:
//   1. Preloads carrying fetchpriority="high" survive — these mirror a
//      deliberate fetchPriority on the <img> (blog heroes, the home hero).
//   2. The home hero image survives by URL as a belt-and-braces rule — it
//      is the LCP element on / and its clone routes.
// Everything else is stripped; below-the-fold imgs are loading="lazy" now.
//
// Detection is attribute-order- and quote-style-insensitive on purpose: a
// vite-react-ssg update that reorders attributes must not silently defeat
// the stripper. scripts/checkImagePreloads.mjs shares these helpers so the
// post-build guard can never drift from the stripper's idea of a preload.
//
// TO CHANGE THE HOMEPAGE LCP IMAGE: edit HERO_IMAGE below to the new href,
// and nothing else. checkImagePreloads.mjs imports it, so the post-build
// guard follows automatically.
//
// The rule 2 lookup reads imagesrcset as well as href because React 19
// renders a responsive <img> (src + srcSet + sizes) as a preload with NO
// href at all: it emits imagesrcset/imagesizes instead. The playable phone
// in the hero is exactly that shape, so an href-only rule would have been
// dead code the day the revamp landed.

// The 720w cut of the app home screen, served inside the playable phone
// (src/components/PlayablePhone.jsx, via src/data/screens.js). The 360w cut
// is the img's src and rides in the same srcSet; either one identifies the
// tag, and the 720 is named here because it is what a desktop visitor
// actually downloads.
export const HERO_IMAGE = '/assets/screens/home-720.webp';

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
  const urls = `${attr(tag, 'href') || ''} ${attr(tag, 'imagesrcset') || ''}`;
  return urls.includes(HERO_IMAGE);
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
