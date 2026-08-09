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
// So this asserts on the built HTML, and counts the links against the same
// FEATURE_PAGES array the page renders from.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_PAGES, featurePagePath } from '../src/data/featurePages.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export function inspectHub(html, expectedPaths) {
  const emptyRoot = /<div id="root">\s*<\/div>/.test(html);
  const missing = expectedPaths.filter((path) => !html.includes(`href="${path}"`));
  return { emptyRoot, missing, ok: !emptyRoot && missing.length === 0 };
}

function main() {
  const file = resolve(repoRoot, 'dist/features/index.html');
  if (!existsSync(file)) {
    process.stderr.write('checkFeaturesHub: dist/features/index.html not found.\n');
    process.exit(1);
  }

  const expected = FEATURE_PAGES.map(featurePagePath);
  const { emptyRoot, missing, ok } = inspectHub(readFileSync(file, 'utf-8'), expected);

  if (!ok) {
    if (emptyRoot) {
      process.stderr.write('checkFeaturesHub: /features prerendered as an empty shell.\n');
    }
    for (const path of missing) {
      process.stderr.write(`checkFeaturesHub: /features is missing a link to ${path}\n`);
    }
    process.exit(1);
  }

  process.stdout.write(`checkFeaturesHub: OK (${expected.length} feature links in raw HTML)\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main();
}
