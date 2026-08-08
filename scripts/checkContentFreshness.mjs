// checkContentFreshness — turn "quarterly content refresh" from a thing someone
// has to remember into a command that answers it (plan Phase 6).
//
// Recency is a citation signal: content under ~3 months old is materially more
// likely to be lifted by an AI-search engine than the same content a year
// stale. Every blog post and every feature landing page carries an `updated`
// date that feeds `dateModified` in its schema, so the whole corpus is already
// dated. Nobody was reading those dates in aggregate.
//
// This is a REPORT, not a build gate. Content ages every day whether or not
// anyone edited it, so wiring an age threshold into `npm run build` would turn
// the passage of time into a red build. Run it, read the FRESH/AGEING/STALE
// buckets, and pick what to refresh. `--fail-over=N` exists so a future cron or
// CI job can opt into a hard threshold; the default exit code is always 0.
//
// The honesty rule this script cannot enforce, and the operator must: only bump
// `updated:` when the page actually changed in a way a reader would notice.
// A date bumped on an unedited page is a lie told to a crawler, and the site's
// whole citation posture rests on not telling those.
//
// Pure helpers (bucketFor, ageInDays, summarise) are unit-tested in
// scripts/checkContentFreshness.test.mjs; the filesystem scan only runs via CLI.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

// Bucket boundaries in days. FRESH is the "3x more citation-eligible" window
// the plan cites; AGEING is the warning shoulder that gives a quarter's notice
// before a page falls out of it.
export const THRESHOLDS = { fresh: 90, ageing: 180 };

/**
 * Whole days between two dates, floored. Returns null for an unparseable date
 * so a missing or malformed frontmatter value reports as "undated" rather than
 * silently becoming NaN days old.
 * @param {string} isoDate
 * @param {Date} now
 * @returns {number|null}
 */
export function ageInDays(isoDate, now) {
  if (typeof isoDate !== 'string' || isoDate.trim() === '') return null;
  const then = new Date(`${isoDate.trim().slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(then.getTime())) return null;
  const today = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
  return Math.floor((today.getTime() - then.getTime()) / 86_400_000);
}

/**
 * @param {number|null} days
 * @returns {'fresh'|'ageing'|'stale'|'undated'}
 */
export function bucketFor(days) {
  if (days == null) return 'undated';
  if (days <= THRESHOLDS.fresh) return 'fresh';
  if (days <= THRESHOLDS.ageing) return 'ageing';
  return 'stale';
}

/**
 * Roll a list of dated items into counts plus the refresh queue, oldest first.
 * @param {Array<{id: string, kind: string, effectiveDate: string|null, days: number|null}>} items
 * @returns {{counts: Record<string, number>, queue: Array<object>, total: number}}
 */
export function summarise(items) {
  const counts = { fresh: 0, ageing: 0, stale: 0, undated: 0 };
  const enriched = items.map((item) => {
    const bucket = bucketFor(item.days);
    counts[bucket] += 1;
    return { ...item, bucket };
  });
  // Undated sorts to the top: an item with no date is the worst case, because
  // its dateModified is either absent or guessed.
  const queue = enriched
    .filter((item) => item.bucket !== 'fresh')
    .sort((a, b) => (b.days ?? Number.POSITIVE_INFINITY) - (a.days ?? Number.POSITIVE_INFINITY));
  return { counts, queue, total: items.length };
}

/**
 * The date that actually reaches a crawler as dateModified: the explicit
 * `updated` when present, otherwise the publish date.
 * @param {{updated?: string, date?: string, datePublished?: string}} frontmatter
 * @returns {string|null}
 */
export function effectiveDate(frontmatter) {
  const updated = frontmatter?.updated;
  if (typeof updated === 'string' && updated.trim() !== '') return updated.trim();
  const published = frontmatter?.date ?? frontmatter?.datePublished;
  if (typeof published === 'string' && published.trim() !== '') return published.trim();
  return null;
}

function collectBlogPosts(root, now) {
  const dir = resolve(root, 'content/blog');
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const { data } = matter(readFileSync(resolve(dir, name), 'utf8'));
      const date = effectiveDate(data);
      return {
        id: `/blog/${data.slug ?? name.replace(/\.md$/, '')}`,
        kind: 'post',
        effectiveDate: date,
        days: ageInDays(date, now),
      };
    });
}

async function collectFeaturePages(root, now) {
  const { FEATURE_PAGES } = await import(
    new URL('../src/data/featurePages.js', import.meta.url)
  );
  return FEATURE_PAGES.map((page) => {
    const date = effectiveDate(page);
    return {
      id: `/${page.slug}`,
      kind: 'page',
      effectiveDate: date,
      days: ageInDays(date, now),
    };
  });
}

function parseFailOver(argv) {
  const flag = argv.find((arg) => arg.startsWith('--fail-over='));
  if (!flag) return null;
  const value = Number.parseInt(flag.split('=')[1], 10);
  return Number.isFinite(value) ? value : null;
}

async function main() {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const now = new Date();
  const failOver = parseFailOver(process.argv.slice(2));
  const kindFilter = process.argv.includes('--posts')
    ? 'post'
    : process.argv.includes('--pages')
      ? 'page'
      : null;

  const items = [
    ...(await collectFeaturePages(root, now)),
    ...collectBlogPosts(root, now),
  ].filter((item) => !kindFilter || item.kind === kindFilter);

  const { counts, queue, total } = summarise(items);

  const today = now.toISOString().slice(0, 10);
  process.stdout.write(`Content freshness as of ${today} — ${total} items\n\n`);
  process.stdout.write(
    `  fresh   (<= ${THRESHOLDS.fresh}d)  ${String(counts.fresh).padStart(4)}\n` +
      `  ageing  (<= ${THRESHOLDS.ageing}d) ${String(counts.ageing).padStart(4)}\n` +
      `  stale   (>  ${THRESHOLDS.ageing}d) ${String(counts.stale).padStart(4)}\n` +
      `  undated             ${String(counts.undated).padStart(4)}\n\n`
  );

  if (queue.length === 0) {
    process.stdout.write('Nothing outside the fresh window. No refresh due.\n');
    return;
  }

  process.stdout.write(`Refresh queue, oldest first (${queue.length}):\n\n`);
  for (const item of queue) {
    const age = item.days == null ? 'undated' : `${item.days}d`;
    process.stdout.write(
      `  ${item.bucket.padEnd(8)}${age.padEnd(9)}${(item.effectiveDate ?? '-').padEnd(12)}${item.kind.padEnd(6)}${item.id}\n`
    );
  }

  process.stdout.write(
    '\nBump `updated:` only on a page you actually edited. A date moved on an\n' +
      'unedited page is a false freshness signal to the crawlers.\n'
  );

  if (failOver != null) {
    const over = queue.filter((item) => item.days == null || item.days > failOver);
    if (over.length > 0) {
      process.stdout.write(`\n${over.length} item(s) older than ${failOver}d.\n`);
      process.exit(1);
    }
  }
}

// Run the scan only when executed directly, never on import. Decode
// import.meta.url to a path so the compare survives a repo path with a space
// (this repo lives under "takkada website/").
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
