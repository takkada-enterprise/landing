// checkGuideHub — /guide must link every guide, exactly once, in raw HTML, and
// every "related guides" link in the manual must land on a page that exists.
//
// The hub is the only page on the site that links all 21 guides. If it renders
// client-side, or loses a card, those guides become orphans: reachable only by
// someone who already knows the URL, which is nobody. That failure is silent —
// the pages still exist and still return 200.
//
// The card anchors are matched on the `guide-hub-card` class, exactly as
// checkFeaturesHub matches `features-hub-card`, and for the same reason: the
// site footer and the reader's own "related guides" list both render /guide/
// anchors, so a document-wide href search would pass against a page with no hub
// on it at all. That class is therefore a BUILD CONTRACT, not a style hook.
//
// The second half is the dangling-link check. `relatedGuides` is hand-authored
// frontmatter; a typo or a retired slug produces a link to a 404 from inside a
// procedure, which is where a stuck customer is least able to recover.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readGuides, readTopics, INTERNAL_TOPIC_IDS } from './lib/guideContract.mjs';
import { hasEmptyRoot } from './checkGuidePrerender.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const CARD_RE = /<a\b[^>]*\bclass="[^"]*\bguide-hub-card\b[^"]*"[^>]*\bhref="([^"]+)"/g;

const normalise = (href) => href.replace(/\/$/, '');

/**
 * @param {string} html dist/guide/index.html
 * @param {string[]} expectedPaths every publishable '/guide/<slug>'
 */
export function inspectGuideHub(html, expectedPaths) {
  const linked = [...html.matchAll(CARD_RE)].map(([, href]) => normalise(href));
  const counts = new Map();
  for (const href of linked) counts.set(href, (counts.get(href) ?? 0) + 1);

  return {
    emptyRoot: hasEmptyRoot(html),
    linked,
    missing: expectedPaths.filter((path) => !counts.has(path)),
    duplicated: [...counts].filter(([, n]) => n > 1).map(([path]) => path),
    stray: [...counts.keys()].filter((path) => !expectedPaths.includes(path)),
  };
}

/**
 * Every relatedGuides target has to be a published slug.
 * @returns {string[]} 'from -> to' for each dangling link
 */
export function findDanglingRelated(guides, publishedSlugs) {
  const published = new Set(publishedSlugs);
  return guides.flatMap((guide) =>
    (guide.relatedGuides ?? [])
      .filter((target) => !published.has(target))
      .map((target) => `${guide.slug} -> ${target}`)
  );
}

function main() {
  const topics = readTopics(repoRoot).filter((topic) => !INTERNAL_TOPIC_IDS.has(topic.id));
  const guides = readGuides(repoRoot);
  const publishedSlugs = topics.map((topic) => topic.slug);
  const expected = publishedSlugs.map((slug) => `/guide/${slug}`);

  const file = resolve(repoRoot, 'dist/guide/index.html');
  if (!existsSync(file)) {
    process.stderr.write('checkGuideHub: dist/guide/index.html not found. Run the build first.\n');
    process.exit(1);
  }

  const { emptyRoot, linked, missing, duplicated, stray } = inspectGuideHub(
    readFileSync(file, 'utf-8'),
    expected
  );

  const failures = [];
  if (emptyRoot) failures.push('/guide prerendered as an empty shell');
  for (const path of missing) failures.push(`the hub has no card linking ${path}`);
  for (const path of duplicated) failures.push(`the hub links ${path} more than once`);
  for (const path of stray) failures.push(`the hub links ${path}, which is not a published guide`);

  // A card can only be "working" if the page behind it was actually built.
  for (const path of linked) {
    if (!existsSync(resolve(repoRoot, `dist${path}/index.html`))) {
      failures.push(`the hub links ${path}, which was not prerendered`);
    }
  }

  for (const link of findDanglingRelated(guides, publishedSlugs)) {
    failures.push(`related guide link goes nowhere: ${link}`);
  }

  if (failures.length > 0) {
    process.stderr.write(
      `checkGuideHub: ${failures.length} problem(s).\n${failures.map((f) => `  - ${f}`).join('\n')}\n`
    );
    process.exit(1);
  }

  process.stdout.write(
    `checkGuideHub: OK (${linked.length} guide cards in raw HTML, every related link resolves)\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
