// checkGuidePrerender — fail the build if a guide page ships as an empty shell,
// or ships as the wrong page.
//
// The /guide routes are lazy for the same reason the blog routes are: the eager
// import.meta.glob in src/lib/guidePosts.js compiles all 21 guides' rendered
// HTML into whatever chunk imports it, and that must not be the landing bundle.
// Lazy routes only stay useful to a crawler while vite-react-ssg keeps
// resolving them at prerender time. If a router upgrade stops awaiting `lazy`,
// every guide silently becomes a client-rendered shell: still 200, still in the
// sitemap, still linked from the app, and worth nothing. checkBlogPrerender
// covers exactly this failure for /blog and nothing else.
//
// This guard goes further than "is #root empty", because a manual has a second
// failure mode the blog does not: the route resolves, React renders, and what
// comes back is the not-found state. That page has real prose and a real <h1>,
// so a paragraph count would pass it. So every page is matched against what it
// is supposed to be — its own h1, its own slug marker, its own canonical, title
// and description, and the checked-against-the-app line that is the whole
// freshness claim. The expected values are read from content/guide, so this
// cannot drift from the corpus; nothing here is a hardcoded list of 21 titles.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readGuides, readTopics, INTERNAL_TOPIC_IDS } from './lib/guideContract.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Kept equal to the strings GuideIndex.jsx renders; the route test asserts the
// two copies match, so a reworded hub cannot leave this guard asserting copy
// that no longer exists.
export const GUIDE_HUB = {
  path: '/guide',
  h1: 'How to use Takkada',
  title: 'Takkada guides: how to use the app',
  description:
    'Step-by-step guides for Takkada: connecting Tally, mapping ledgers, making bills, recording receipts, loading a van, e-invoices and WhatsApp reminders.',
};

// The sentence GuidePost.jsx prints. It is emitted as one text node precisely
// so this stays a literal substring of the built HTML — interpolating the date
// as a separate child would have React insert a `<!-- -->` marker between the
// words and break the grep without breaking the page.
export const CHECKED_PREFIX = 'Checked against the app on ';

const SITE_URL = 'https://takkada.com';

/** vite-react-ssg with dirStyle 'nested': '/guide/x' -> dist/guide/x/index.html. */
export const canonicalFor = (path) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;

// React escapes &, <, >, " and ' in text and attributes; the built HTML is then
// minified. Nothing else is entity-encoded, so this short table is complete for
// what we compare against.
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', '#x27': "'", '#39': "'" };
const decode = (text) =>
  text.replace(/&(amp|lt|gt|quot|#x27|#39);/g, (_, name) => ENTITIES[name]);

const clean = (text) => decode(text.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();

export const hasEmptyRoot = (html) => /<div id="root">\s*<\/div>/.test(html);

const attr = (html, re) => {
  const match = html.match(re);
  return match ? decode(match[1]) : null;
};

// react-helmet stamps `data-rh="true"` as the FIRST attribute on every tag it
// owns, so `<meta name="description" ...>` never appears in the built HTML.
// Matching a tag by one attribute and pulling another out of it — rather than
// assuming they are adjacent — is what makes this survive both that and the
// minifier.
const tagAttr = (html, tag, matchAttr, matchValue, wanted) => {
  const tags = html.match(new RegExp(`<${tag}\\b[^>]*>`, 'g')) ?? [];
  for (const found of tags) {
    if (!new RegExp(`\\b${matchAttr}="${matchValue}"`).test(found)) continue;
    const value = found.match(new RegExp(`\\b${wanted}="([^"]*)"`));
    if (value) return decode(value[1]);
  }
  return null;
};

/**
 * @param {string} html the built page
 * @param {{h1: string, title: string, description: string, path: string,
 *          slug?: string, checkedAgainstAppOn?: string}} expected
 * @returns {string[]} every way this page is not the page it should be
 */
export function inspectGuidePage(html, expected) {
  const errors = [];

  if (hasEmptyRoot(html)) {
    // Everything below would report a second time; one honest cause is enough.
    return ['prerendered as an empty shell (#root is empty)'];
  }

  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(([, inner]) =>
    clean(inner)
  );
  if (headings.length !== 1) {
    errors.push(`expected exactly one h1, found ${headings.length}`);
  }
  if (!headings.includes(expected.h1)) {
    errors.push(`h1 is ${JSON.stringify(headings[0] ?? null)}, expected ${JSON.stringify(expected.h1)}`);
  }

  if (expected.slug) {
    const marker = attr(html, /data-guide-slug="([^"]*)"/);
    if (marker !== expected.slug) {
      errors.push(`data-guide-slug is ${JSON.stringify(marker)}, expected ${JSON.stringify(expected.slug)}`);
    }
  }

  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/);
  if (title === null || clean(title) !== expected.title) {
    errors.push(`<title> is ${JSON.stringify(title)}, expected ${JSON.stringify(expected.title)}`);
  }

  const description = tagAttr(html, 'meta', 'name', 'description', 'content');
  if (description !== expected.description) {
    errors.push(`meta description is ${JSON.stringify(description)}`);
  }

  const canonical = tagAttr(html, 'link', 'rel', 'canonical', 'href');
  const wanted = canonicalFor(expected.path);
  if (canonical !== wanted) {
    errors.push(`canonical is ${JSON.stringify(canonical)}, expected ${JSON.stringify(wanted)}`);
  }

  if (expected.checkedAgainstAppOn) {
    const line = `${CHECKED_PREFIX}${expected.checkedAgainstAppOn}`;
    if (!decode(html).includes(line)) {
      errors.push(`missing the line "${line}"`);
    }
  }

  return errors;
}

/** What each built page has to be, derived from the real corpus. */
export function expectationsFor(topics, guides) {
  const guideBySlug = new Map(guides.map((guide) => [guide.slug, guide]));
  const pages = [{ file: 'dist/guide/index.html', ...GUIDE_HUB }];

  for (const topic of topics) {
    if (INTERNAL_TOPIC_IDS.has(topic.id)) continue;
    const guide = guideBySlug.get(topic.slug);
    if (!guide) {
      pages.push({ file: `dist/guide/${topic.slug}/index.html`, missingContent: true });
      continue;
    }
    pages.push({
      file: `dist/guide/${guide.slug}/index.html`,
      path: `/guide/${guide.slug}`,
      slug: guide.slug,
      h1: guide.title,
      title: guide.metaTitle || `${guide.title} — Takkada`,
      description: guide.metaDescription ?? '',
      checkedAgainstAppOn: guide.checkedAgainstAppOn,
    });
  }

  return pages;
}

function main() {
  const topics = readTopics(repoRoot);
  const guides = readGuides(repoRoot);

  if (topics.length === 0) {
    process.stderr.write('checkGuidePrerender: content/guide/topics.json has no topics.\n');
    process.exit(1);
  }

  const failures = [];
  for (const page of expectationsFor(topics, guides)) {
    if (page.missingContent) {
      failures.push(`${page.file}: no content/guide markdown for this topic`);
      continue;
    }
    const file = resolve(repoRoot, page.file);
    if (!existsSync(file)) {
      failures.push(`${page.file}: was not prerendered at all`);
      continue;
    }
    for (const error of inspectGuidePage(readFileSync(file, 'utf-8'), page)) {
      failures.push(`${page.file}: ${error}`);
    }
  }

  if (failures.length > 0) {
    process.stderr.write(
      `checkGuidePrerender: ${failures.length} problem(s) in the built manual.\n` +
        'The lazy /guide routes in src/routes/index.jsx may no longer be resolved at prerender time.\n' +
        `${failures.map((f) => `  - ${f}`).join('\n')}\n`
    );
    process.exit(1);
  }

  process.stdout.write(
    `checkGuidePrerender: OK (${topics.length} guides + hub, all server-rendered with their own h1, slug, canonical and checked date)\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
