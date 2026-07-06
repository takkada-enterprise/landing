import { writeFileSync, statSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMetadata } from '../src/data/siteMetadata.js';

const SITE_URL = 'https://takkada.com';
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function lastmodFor(relPath) {
  try {
    return statSync(resolve(repoRoot, relPath)).mtime.toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function loc(path) {
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

const distDir = resolve(repoRoot, 'dist');
if (!existsSync(distDir)) {
  console.error(`generate-sitemap: dist/ not found at ${distDir}. Run vite-react-ssg build first.`);
  process.exit(1);
}

const blogIndex = {
  path: '/blog',
  sourceFile: 'content/blog',
  changefreq: 'weekly',
  priority: 0.8,
};

const allEntries = [
  // Entries flagged sitemap:false (e.g. the /become-a-partner alias) stay
  // routable but are kept out of the sitemap.
  ...routeMetadata.filter((r) => r.sitemap !== false),
  blogIndex,
  ...getBlogPostEntries(),
];

const urls = allEntries
  .map(({ path, sourceFile, changefreq, priority }) => (
    `  <url>
    <loc>${loc(path)}</loc>
    <lastmod>${lastmodFor(sourceFile)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`
  ))
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(distDir, 'sitemap.xml');
writeFileSync(outPath, xml);
console.log(`generate-sitemap: wrote ${outPath} (${allEntries.length} urls)`);
