import { execFileSync } from 'node:child_process';
import { writeFileSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMetadata } from '../src/data/siteMetadata.js';
import { INTERNAL_TOPIC_IDS, readGuides, readTopics, toIsoDateString } from './lib/guideContract.mjs';

const SITE_URL = 'https://takkada.com';
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// A lastmod is only worth sending if it moves when the page's content moves.
// This used to be the source file's mtime, which on a fresh CI checkout is the
// build time, so 387 of 409 URLs advertised the same build date and Google
// stopped trusting the field (Search Console audit, 2026-10-23). The order now:
//   1. an explicit content date on the entry (blog `updated`/`date`, feature
//      page `updated`/`datePublished`, guide `checkedAgainstAppOn`);
//   2. the last commit that touched the source file, when full git history is
//      available;
//   3. nothing. A missing lastmod is valid and honest; a fake one is not.
// changefreq and priority are no longer written: Google ignores both.
let historyAvailable;
function gitHistoryAvailable() {
  if (historyAvailable === undefined) {
    try {
      // A shallow clone would date every file to the one fetched commit.
      historyAvailable =
        execFileSync('git', ['rev-parse', '--is-shallow-repository'], { cwd: repoRoot, encoding: 'utf-8' })
          .trim() === 'false';
    } catch {
      historyAvailable = false;
    }
  }
  return historyAvailable;
}

function lastCommitDate(relPath) {
  if (!relPath || !gitHistoryAvailable()) return undefined;
  try {
    const date = execFileSync('git', ['log', '-1', '--format=%cs', '--', relPath], {
      cwd: repoRoot,
      encoding: 'utf-8',
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
  } catch {
    return undefined;
  }
}

function frontmatterDate(raw, key) {
  const m = raw.match(new RegExp(`^${key}:\\s*"?(\\d{4}-\\d{2}-\\d{2})`, 'm'));
  return m ? m[1] : undefined;
}

export function loc(path) {
  if (path === '/') return `${SITE_URL}/`;
  const withLead = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${withLead.endsWith('/') ? withLead : `${withLead}/`}`;
}

function getBlogPostEntries() {
  const blogDir = resolve(repoRoot, 'content/blog');
  if (!existsSync(blogDir)) return [];
  return readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const filePath = resolve(blogDir, f);
      const raw = readFileSync(filePath, 'utf-8');
      const slugMatch = raw.match(/^slug:\s*"?([^"\n]+)"?/m);
      const slug = slugMatch ? slugMatch[1].trim() : f.replace(/\.md$/, '');
      return {
        path: `/blog/${slug}`,
        sourceFile: `content/blog/${f}`,
        lastmod: frontmatterDate(raw, 'updated') ?? frontmatterDate(raw, 'date'),
      };
    });
}

/**
 * The manual's URLs, hub first.
 *
 * A guide's `lastmod` is its `checkedAgainstAppOn` date, not the file's mtime.
 * That is the only date on the page that means anything to a crawler: it is the
 * day a person opened the app and confirmed the steps still work. A mtime would
 * move every time somebody fixed a typo — or, worse, every time the file was
 * checked out on a build box — and would advertise freshness nobody verified.
 * It also makes the sitemap deterministic for a given commit, which an mtime
 * never is.
 *
 * Internal-only topics (KD-7) have no public page, so they are excluded here
 * exactly as they are from the hub, the prerender guard and the app manifest.
 *
 * @param {Array} topics content/guide/topics.json records
 * @param {Array} guides GuideDocument[] from readGuides
 */
export function guideSitemapEntries(topics, guides) {
  const bySlug = new Map((guides ?? []).map((guide) => [guide.slug, guide]));
  const pages = (topics ?? [])
    .filter((topic) => !INTERNAL_TOPIC_IDS.has(topic?.id) && bySlug.has(topic?.slug))
    .map((topic) => ({
      path: `/guide/${topic.slug}`,
      lastmod: toIsoDateString(bySlug.get(topic.slug).checkedAgainstAppOn),
    }));

  if (pages.length === 0) return [];

  // The hub is as fresh as the most recently checked guide on it.
  const hubLastmod = pages.map((page) => page.lastmod).sort().at(-1);

  return [
    { path: '/guide', lastmod: hubLastmod },
    ...pages,
  ];
}

/** One `<url>` block per entry, in the order given. */
export function buildSitemapXml(entries) {
  const urls = entries
    .map(({ path, sourceFile, lastmod }) => {
      const date = lastmod ?? lastCommitDate(sourceFile);
      const dateLine = date ? `\n    <lastmod>${date}</lastmod>` : '';
      return `  <url>\n    <loc>${loc(path)}</loc>${dateLine}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function siteEntries(root = repoRoot) {
  const posts = getBlogPostEntries();
  // The blog index is as fresh as the most recently edited post on it.
  const blogIndex = {
    path: '/blog',
    lastmod: posts.map((post) => post.lastmod).filter(Boolean).sort().at(-1),
  };

  return [
    // Entries flagged sitemap:false (e.g. the /become-a-partner alias) stay
    // routable but are kept out of the sitemap.
    ...routeMetadata.filter((r) => r.sitemap !== false),
    blogIndex,
    ...posts,
    ...guideSitemapEntries(readTopics(root), readGuides(root)),
  ];
}

function main() {
  const distDir = resolve(repoRoot, 'dist');
  if (!existsSync(distDir)) {
    console.error(`generate-sitemap: dist/ not found at ${distDir}. Run vite-react-ssg build first.`);
    process.exit(1);
  }

  const allEntries = siteEntries(repoRoot);
  const outPath = resolve(distDir, 'sitemap.xml');
  writeFileSync(outPath, buildSitemapXml(allEntries));
  console.log(`generate-sitemap: wrote ${outPath} (${allEntries.length} urls)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
