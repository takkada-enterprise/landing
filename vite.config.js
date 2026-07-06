import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync, readFileSync } from 'node:fs';
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
    includedRoutes(paths) {
      const blogSlugs = getBlogSlugs();
      return [
        ...paths,
        '/blog',
        ...blogSlugs.map((slug) => `/blog/${slug}`),
      ];
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
