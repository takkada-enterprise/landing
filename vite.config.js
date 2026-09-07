import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';
import { parseFaqs } from './src/lib/parseFaqs.js';
import { stripBlanketImagePreloads } from './scripts/stripImagePreloads.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      const { data, content } = matter(code);
      const filename = id.split('/').pop().replace(/\.md$/, '');
      const slug = data.slug || filename;
      const html = marked(content);
      const faqs = parseFaqs(content);
      // Surface a malformed FAQ section (heading present but nothing parsed)
      // as a non-fatal build warning so it shows up in the log without
      // breaking the build.
      if (faqs.length === 0 && /^##\s+.*frequently asked questions/im.test(content)) {
        this.warn(`parseFaqs: FAQ section found but no Q/A pairs parsed in ${slug}.md`);
      }
      return {
        code: `export default ${JSON.stringify({ ...data, slug, html, faqs })}`,
        map: null,
      };
    },
  };
}

function getBlogSlugs() {
  const blogDir = resolve(__dirname, 'content/blog');
  try {
    return readdirSync(blogDir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => {
        const raw = readFileSync(resolve(blogDir, f), 'utf-8');
        const slugMatch = raw.match(/^slug:\s*"?([^"\n]+)"?/m);
        return slugMatch ? slugMatch[1].trim() : f.replace(/\.md$/, '');
      });
  } catch {
    return [];
  }
}

// The manual's pages come from the canonical topic registry, not from a
// directory listing, so a guide can only be prerendered if it is a topic
// somebody committed to publishing. A topic whose markdown is missing fails the
// build here rather than shipping a 404 that the app is already linking to.
function getGuidePaths() {
  const registry = resolve(__dirname, 'content/guide/topics.json');
  const { topics } = JSON.parse(readFileSync(registry, 'utf-8'));
  return topics.map(({ slug }) => {
    if (!existsSync(resolve(__dirname, `content/guide/${slug}.md`))) {
      throw new Error(
        `vite.config: topics.json lists "${slug}" but content/guide/${slug}.md does not exist.`
      );
    }
    return `/guide/${slug}`;
  });
}

export default defineConfig({
  base: '/',
  plugins: [markdownPlugin(), react()],
  server: {
    port: 5173,
    host: true,
  },
  ssgOptions: {
    dirStyle: 'nested',
    formatting: 'minify',
    // The SSG preloads every <img> on a page by default; keep only the
    // deliberate ones (see scripts/stripImagePreloads.mjs). Guarded post-build
    // by scripts/checkImagePreloads.mjs.
    onPageRendered(route, html) {
      return stripBlanketImagePreloads(html);
    },
    // Both the blog and the manual register their reader as a lazy `:slug`
    // route, so the router hands us a literal '/blog/:slug' and '/guide/:slug'
    // that must not become a directory; the real pages are expanded here from
    // content. Everything else `paths` produces — the homepage, the 26 feature
    // landing pages, every static route in siteMetadata — is passed straight
    // through, so adding a route there still enrols it automatically.
    includedRoutes(paths) {
      const blogSlugs = getBlogSlugs();
      return [
        ...new Set([
          ...paths.filter((path) => !path.includes(':')),
          '/blog',
          ...blogSlugs.map((slug) => `/blog/${slug}`),
          '/guide',
          ...getGuidePaths(),
        ]),
      ];
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
