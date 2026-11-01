// Post-build guard on internal linking. Runs after generate-sitemap.
//
// 1. Every root-relative page href in dist/ must use the trailing-slash form
//    the sitemap and canonicals use. A slash-less href costs Googlebot a 301;
//    the 2026-10-23 Search Console audit counted ~29,700 of them and 293
//    "Page with redirect" rows. Fix at the source with src/lib/sitePath.js
//    (or the SiteLink component), never by editing dist/.
// 2. Every URL in the sitemap must be linked from at least one OTHER page.
//    A sitemap-only page is an orphan; the audit found three
//    (/mobile-tally/, /whatsapp-invoice-tally/, /tally-mobile-app-comparison/).
//    Pages with fewer than three inbound pages are printed as a warning.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { withTrailingSlash } from '../src/lib/sitePath.js';

const SITE_URL = 'https://takkada.com';
const WEAK_INBOUND = 3;

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name === 'index.html' ? [full] : [];
  });
}

/** `dist/features/index.html` → `/features/` */
export function pagePathFor(distDir, file) {
  const rel = relative(distDir, dirname(file)).split(sep).join('/');
  return rel ? `/${rel}/` : '/';
}

export function internalHrefs(html) {
  // Only real anchors: <link rel="preload|icon|canonical"> etc. are not links.
  const hrefs = [];
  for (const [, attrs] of html.matchAll(/<a\b([^>]*)>/gi)) {
    const m = attrs.match(/\shref="([^"]*)"/i);
    if (m && m[1].startsWith('/') && !m[1].startsWith('//')) hrefs.push(m[1]);
  }
  return hrefs;
}

export function analyse(pages, sitemapPaths) {
  const slashless = new Map(); // href → pages it appears on
  const inbound = new Map(sitemapPaths.map((p) => [p, new Set()]));

  for (const { path, html } of pages) {
    for (const href of internalHrefs(html)) {
      if (withTrailingSlash(href) !== href) {
        if (!slashless.has(href)) slashless.set(href, new Set());
        slashless.get(href).add(path);
      }
      const target = withTrailingSlash(href).replace(/[?#].*$/, '');
      if (target !== path && inbound.has(target)) inbound.get(target).add(path);
    }
  }

  const orphans = [...inbound].filter(([, from]) => from.size === 0).map(([p]) => p);
  const weak = [...inbound]
    .filter(([, from]) => from.size > 0 && from.size < WEAK_INBOUND)
    .map(([p, from]) => ({ path: p, count: from.size }));
  return { slashless, orphans, weak };
}

function main() {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const distDir = resolve(repoRoot, 'dist');
  const sitemapFile = resolve(distDir, 'sitemap.xml');
  if (!existsSync(sitemapFile)) {
    console.error('checkInternalLinks: dist/sitemap.xml not found. Run the build first.');
    process.exit(1);
  }

  const sitemapPaths = [...readFileSync(sitemapFile, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(([, url]) => url.replace(SITE_URL, ''));
  const pages = htmlFiles(distDir).map((file) => ({
    path: pagePathFor(distDir, file),
    html: readFileSync(file, 'utf-8'),
  }));

  const { slashless, orphans, weak } = analyse(pages, sitemapPaths);

  for (const { path, count } of weak) {
    console.warn(`checkInternalLinks: warning: ${path} is linked from only ${count} page(s)`);
  }

  let failed = false;
  if (slashless.size > 0) {
    failed = true;
    console.error(`checkInternalLinks: ${slashless.size} slash-less internal href(s) would 301:`);
    for (const [href, from] of [...slashless].slice(0, 40)) {
      console.error(`  ${href}  (on ${from.size} page(s), e.g. ${[...from][0]})`);
    }
  }
  if (orphans.length > 0) {
    failed = true;
    console.error('checkInternalLinks: sitemap pages no other page links to:');
    for (const p of orphans) console.error(`  ${p}`);
  }
  if (failed) process.exit(1);
  console.log(`checkInternalLinks: ${pages.length} pages, every internal href canonical, no orphans`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
