import { writeFileSync, statSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMetadata } from '../src/data/siteMetadata.js';
import { INTERNAL_TOPIC_IDS, readGuides, readTopics, toIsoDateString } from './lib/guideContract.mjs';

const SITE_URL = 'https://takkada.com';
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function lastmodFor(relPath) {
  try {
    return statSync(resolve(repoRoot, relPath)).mtime.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
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
        changefreq: 'monthly',
        priority: 0.7,
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
      changefreq: 'monthly',
      priority: 0.7,
    }));

  if (pages.length === 0) return [];

  // The hub is as fresh as the most recently checked guide on it.
  const hubLastmod = pages.map((page) => page.lastmod).sort().at(-1);

  return [
    { path: '/guide', lastmod: hubLastmod, changefreq: 'weekly', priority: 0.8 },
    ...pages,
  ];
}

/** One `<url>` block per entry, in the order given. */
export function buildSitemapXml(entries) {
  const urls = entries
    .map(({ path, sourceFile, changefreq, priority, lastmod }) => (
      `  <url>
    <loc>${loc(path)}</loc>
    <lastmod>${lastmod ?? lastmodFor(sourceFile)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
    ))
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export function siteEntries(root = repoRoot) {
  const blogIndex = {
    path: '/blog',
    sourceFile: 'content/blog',
    changefreq: 'weekly',
    priority: 0.8,
  };

  return [
    // Entries flagged sitemap:false (e.g. the /become-a-partner alias) stay
    // routable but are kept out of the sitemap.
    ...routeMetadata.filter((r) => r.sitemap !== false),
    blogIndex,
    ...getBlogPostEntries(),
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
