// checkFeaturesHub — fail the build if /features ships without its links.
//
// The hub's entire job is being the one page that links to all 26 feature
// landing pages in raw HTML. A crawler that fetches dist/features/index.html
// and finds an empty root div, or a directory rendered client-side, gets
// nothing, and the feature pages go back to being footer-only orphans. That
// failure is invisible: the page would still exist, still return 200, still be
// in sitemap.xml, and every unit test would still pass, because they assert on
// a jsdom render rather than on the file a crawler reads.
//
// The links are counted inside the directory section only. A first version of
// this guard searched the whole document and was unfalsifiable: SiteFooter
// renders an anchor for all 26 feature pages on every page of the site, so the
// check passed against dist/partners/index.html, which has no hub on it at all.
// A guard that cannot fail is worse than no guard, because it reads as
// coverage. Hence CARD_RE, which matches the hub's own card anchors and
// nothing else.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_PAGES, featurePagePath } from '../src/data/featurePages.js';
import { hasEmptyRoot } from './checkBlogPrerender.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// The directory card anchor, as Features.jsx renders it. Deliberately keyed on
// the `features-hub-card` class so a footer link, a nav link, or a path that
// merely appears inside inlined JSON can never satisfy this guard.
//
// That class is therefore a BUILD CONTRACT and not a style hook. The hub was
// re-tiered on 2026-08-11 into lead cards, section cards and a compact index,
// three different-looking things; all three carry `features-hub-card` and take
// their appearance from a modifier class beside it, precisely so this regex
// and the coverage it buys did not have to move. Renaming the class, or
// dropping it from one tier because that tier stopped looking like a card,
// silently un-covers every page in it. Nothing that is not a feature page may
// carry it either — the stray check below is the other half of that.
const CARD_RE = /<a\b[^>]*\bclass="[^"]*\bfeatures-hub-card\b[^"]*"[^>]*\bhref="([^"]+)"/g;

export function inspectHub(html, expectedPaths) {
  const linked = new Set([...html.matchAll(CARD_RE)].map(([, href]) => href.replace(/\/$/, '')));
  return {
    emptyRoot: hasEmptyRoot(html),
    linked,
    missing: expectedPaths.filter((path) => !linked.has(path)),
  };
}

function main() {
  const file = resolve(repoRoot, 'dist/features/index.html');
  if (!existsSync(file)) {
    process.stderr.write('checkFeaturesHub: dist/features/index.html not found.\n');
    process.exit(1);
  }

  const expected = FEATURE_PAGES.map(featurePagePath);
  const { emptyRoot, linked, missing } = inspectHub(readFileSync(file, 'utf-8'), expected);

  if (emptyRoot || missing.length > 0) {
    if (emptyRoot) {
      process.stderr.write('checkFeaturesHub: /features prerendered as an empty shell.\n');
    }
    for (const path of missing) {
      process.stderr.write(`checkFeaturesHub: the hub has no card linking ${path}\n`);
    }
    process.exit(1);
  }

  // A card pointing somewhere unexpected is as wrong as a missing one.
  const stray = [...linked].filter((href) => !expected.includes(href));
  if (stray.length > 0) {
    for (const href of stray) {
      process.stderr.write(`checkFeaturesHub: the hub links ${href}, which is not a feature page\n`);
    }
    process.exit(1);
  }

  process.stdout.write(`checkFeaturesHub: OK (${linked.size} feature cards in raw HTML)\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
