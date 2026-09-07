// checkBlogPrerender — fail the build if a blog page ships as an empty shell.
//
// Why this guard exists: the blog routes are lazily imported (see the comment
// in src/routes/index.jsx) so that 160 posts' worth of rendered HTML stays out
// of the main bundle. That only works if the SSG prerenderer still resolves the
// lazy route and bakes real article prose into dist/blog/<slug>/index.html.
// If a future router or vite-react-ssg upgrade stops awaiting `lazy`, every
// blog page would silently become a client-rendered shell: the pages would
// still exist, still return 200, still be in sitemap.xml, and would be worth
// nothing to a crawler. Nothing else in the build would notice.
//
// So this asserts on the raw HTML, which is the thing crawlers actually read.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// A real post renders its prose into <p> tags and its title into an <h1>.
// A shell renders neither.
const MIN_PARAGRAPHS = 5;

// The SSG mount point from index.html, left empty when a page shipped as a
// client-rendered shell. Exported because every prerender guard needs it and a
// second private copy would go blind in step with this one.
export const hasEmptyRoot = (html) => /<div id="root">\s*<\/div>/.test(html);

export function inspectPage(html) {
  const paragraphs = (html.match(/<p[\s>]/g) || []).length;
  const hasH1 = /<h1[\s>]/.test(html);
  const emptyRoot = hasEmptyRoot(html);
  return { paragraphs, hasH1, emptyRoot, ok: !emptyRoot && hasH1 && paragraphs >= MIN_PARAGRAPHS };
}

function main() {
  const blogDir = resolve(repoRoot, 'dist/blog');
  if (!existsSync(blogDir)) {
    process.stderr.write('checkBlogPrerender: dist/blog not found. Run the build first.\n');
    process.exit(1);
  }

  const slugs = readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (slugs.length === 0) {
    process.stderr.write('checkBlogPrerender: no blog pages were prerendered at all.\n');
    process.exit(1);
  }

  const failures = [];
  for (const slug of [...slugs, '']) {
    const file = resolve(blogDir, slug, 'index.html');
    if (!existsSync(file)) {
      failures.push(`${slug || '(index)'}: no index.html`);
      continue;
    }
    const result = inspectPage(readFileSync(file, 'utf-8'));
    if (!result.ok) {
      failures.push(
        `${slug || '(index)'}: ${result.emptyRoot ? 'empty #root' : `${result.paragraphs} paragraphs, h1=${result.hasH1}`}`
      );
    }
  }

  if (failures.length > 0) {
    process.stderr.write(
      `checkBlogPrerender: ${failures.length} blog page(s) shipped without server-rendered content.\n` +
        'The lazy blog routes in src/routes/index.jsx are no longer being resolved at prerender time.\n' +
        failures.slice(0, 10).map((f) => `  - ${f}`).join('\n') +
        (failures.length > 10 ? `\n  ...and ${failures.length - 10} more\n` : '\n')
    );
    process.exit(1);
  }

  process.stdout.write(`checkBlogPrerender: OK (${slugs.length} posts + index, all server-rendered)\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
