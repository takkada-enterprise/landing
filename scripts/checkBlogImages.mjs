// checkBlogImages — every blog post must have a header image on disk.
//
// Why this guard exists: `src/lib/blogPosts.js` derives `heroImage` as
// `/assets/blog/${slug}.png` with no existence check, and `src/data/schema.js`
// turns the same path into the page's `og:image`. A post whose PNG was never
// generated therefore ships a broken hero and a 404 social card, silently, and
// the only symptom is a link that unfurls blank on WhatsApp.
//
// That is not hypothetical. Forty of the July 2026 batch shipped that way and
// sat broken across roughly a third of the corpus until somebody looked. The
// cause is structural: `scripts/generate-blog-images.py` carries a hand-kept
// ARTICLES list, so adding a post and forgetting the list entry is a silent
// failure with no build signal. This guard is the signal.
//
// Runs inside `npm run build`, so a missing image fails the build rather than
// the customer's unfurl. Fix by adding the slug to ARTICLES in
// scripts/generate-blog-images.py and re-running it.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const blogDir = resolve(repoRoot, 'content/blog');
const imageDir = resolve(repoRoot, 'public/assets/blog');

const slugs = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => f.replace(/\.md$/, ''));

const missing = slugs.filter((slug) => !existsSync(resolve(imageDir, `${slug}.png`)));

if (missing.length > 0) {
  console.error(
    `checkBlogImages: ${missing.length} post(s) have no header image in public/assets/blog/.\n` +
      'Each ships a broken hero and a 404 og:image. Add the slug to ARTICLES in\n' +
      'scripts/generate-blog-images.py and run it (needs Pillow), then rebuild.\n'
  );
  for (const slug of missing) console.error(`  ${slug}.png`);
  process.exit(1);
}

console.log(`checkBlogImages: OK (${slugs.length} posts, every slug has a header image)`);
