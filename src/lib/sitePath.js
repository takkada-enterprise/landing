// One spelling for every internal URL: the trailing-slash form.
//
// The static build writes each page to `<path>/index.html`, so the host serves
// `/features/` and answers `/features` with a 301. The sitemap and every
// canonical already use the slash form (scripts/generate-sitemap.mjs `loc`).
// Search Console's 2026-10-23 audit found ~29,700 internal links on 404 pages
// still pointing at the slash-less spelling, so Googlebot spent its crawl
// budget following redirects ("Page with redirect": 293). Every internal link
// now goes through this helper, and scripts/checkInternalLinks.mjs fails the
// build if a slash-less internal href reaches dist/.

const FILE_EXTENSION = /\.[a-z0-9]{2,5}$/i;
const NON_PAGE_PREFIXES = ['/assets/', '/cdn-cgi/'];

/**
 * `/features` → `/features/`, `/blog/x#faq` → `/blog/x/#faq`.
 * Leaves alone: the root, anything already slashed, external and
 * protocol-relative URLs, hash-only links, files (`/llms.txt`), and assets.
 */
export function withTrailingSlash(href) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) {
    return href;
  }
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const rest = cut === -1 ? '' : href.slice(cut);
  if (path.endsWith('/')) return href;
  if (NON_PAGE_PREFIXES.some((prefix) => path.startsWith(prefix))) return href;
  if (FILE_EXTENSION.test(path.split('/').pop())) return href;
  return `${path}/${rest}`;
}

/** Rewrites every root-relative `href="…"` in an HTML string (markdown bodies). */
export function slashInternalHrefs(html) {
  return html.replace(/href="(\/[^"]*)"/g, (_, href) => `href="${withTrailingSlash(href)}"`);
}
