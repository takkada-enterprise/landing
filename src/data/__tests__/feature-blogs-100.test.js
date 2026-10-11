// src/data/__tests__/feature-blogs-100.test.js
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_BLOG_BATCHES } from '../featureBlogs100';
import { FEATURE_PAGES } from '../featurePages';
import { authors } from '../authors';
import { parseFaqs } from '../../lib/parseFaqs';
import { extractLead, countWords } from '../../../scripts/checkLeadAnswer.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const blogDir = resolve(repoRoot, 'content/blog');
const imgDir = resolve(repoRoot, 'public/assets/blog');

const BANNED = /seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|trusted by thousands|millions of|99\.9%/i;
const PRICE = /₹\s?[\d,]+(\.\d+)?\s*(\/|per|a|an)\s*(min|minute|month|year|user|seat|company)\b|₹\s?[\d,]+\s*(\+\s*GST|plan|add-on)/i;
const INTERNAL = /\b(supabase|flutter|angoor|electron|tally-database-loader|loader)\b/i;
const DEVANAGARI = /[ऀ-ॿ]/;
const KINDS = { pillar: 1, usecase: 6, howto: 1, hinglish: 1, compare: 1 };
const featureSlugs = new Set(FEATURE_PAGES.map((p) => p.slug));

const corpusKeywords = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => matter(readFileSync(resolve(blogDir, f), 'utf-8')).data.primary_keyword)
  .filter(Boolean)
  .map((k) => k.trim().toLowerCase());

const read = (slug) => {
  const raw = readFileSync(resolve(blogDir, `${slug}.md`), 'utf-8');
  return { raw, ...matter(raw) };
};

describe('feature blogs 100: manifest shape', () => {
  // Always runs: vitest fails an empty suite, so this keeps the file green before batch 1
  // lands (the per-post suite below is skipped while the manifest is empty).
  it('batch ids and post slugs are unique', () => {
    const ids = FEATURE_BLOG_BATCHES.map((b) => b.id);
    const slugs = FEATURE_BLOG_BATCHES.flatMap((b) => b.posts.map((p) => p.slug));
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  for (const batch of FEATURE_BLOG_BATCHES) {
    it(`${batch.id}: exactly 10 posts with the 1/6/1/1/1 mix and the pillar listed`, () => {
      expect(batch.posts).toHaveLength(10);
      const counts = {};
      for (const p of batch.posts) counts[p.kind] = (counts[p.kind] || 0) + 1;
      expect(counts).toEqual(KINDS);
      expect(batch.posts.find((p) => p.kind === 'pillar').slug).toBe(batch.pillar);
      if (batch.featurePage) expect(featureSlugs.has(batch.featurePage)).toBe(true);
    });
  }
});

describe.skipIf(FEATURE_BLOG_BATCHES.length === 0)('feature blogs 100: every listed post', () => {
  for (const batch of FEATURE_BLOG_BATCHES) {
    for (const { slug, kind } of batch.posts) {
      describe(slug, () => {
        it('exists with its banner (a batch is all-or-nothing)', () => {
          expect(existsSync(resolve(blogDir, `${slug}.md`)), `missing file content/blog/${slug}.md`).toBe(true);
          expect(existsSync(resolve(imgDir, `${slug}.png`)), `missing banner public/assets/blog/${slug}.png`).toBe(true);
        });

        it('has complete frontmatter', () => {
          const { data } = read(slug);
          expect(data.slug).toBe(slug);
          for (const k of ['title', 'meta_description', 'primary_keyword', 'date', 'author', 'category', 'excerpt']) {
            expect(data[k], k).toBeTruthy();
          }
          expect(data.meta_description.length).toBeLessThanOrEqual(160);
          const kw = data.primary_keyword.trim().toLowerCase();
          expect(data.title.toLowerCase(), `title lacks "${kw}"`).toContain(kw);
          expect(data.meta_description.toLowerCase(), `meta_description lacks "${kw}"`).toContain(kw);
          expect(authors[data.author], `unknown author ${data.author}`).toBeTruthy();
          if (data.title.length > 60) expect((data.meta_title || '').length).toBeGreaterThan(0);
          if (data.meta_title) expect(data.meta_title.length).toBeLessThanOrEqual(60);
        });

        it('owns its primary keyword across the whole corpus', () => {
          const kw = read(slug).data.primary_keyword.trim().toLowerCase();
          expect(corpusKeywords.filter((k) => k === kw), `"${kw}" used by more than one post`).toHaveLength(1);
        });

        it('opens with a 134–167-word answer that carries the keyword', () => {
          const { raw, data } = read(slug);
          const lead = extractLead(raw);
          expect(lead.kind).toBe('paragraph');
          expect(lead.wordCount).toBeGreaterThanOrEqual(134);
          expect(lead.wordCount).toBeLessThanOrEqual(167);
          expect(lead.text.toLowerCase()).toContain(data.primary_keyword.trim().toLowerCase());
        });

        it('is 600–900 words with 3–5 FAQs', () => {
          const { content } = read(slug);
          const words = countWords(content);
          expect(words).toBeGreaterThanOrEqual(600);
          expect(words).toBeLessThanOrEqual(900);
          const faqs = parseFaqs(content);
          expect(faqs.length).toBeGreaterThanOrEqual(3);
          expect(faqs.length).toBeLessThanOrEqual(5);
        });

        it('links to the pillar and the feature page', () => {
          const { content } = read(slug);
          if (kind !== 'pillar') expect(content).toContain(`(/blog/${batch.pillar}`);
          if (batch.featurePage) expect(content).toContain(`(/${batch.featurePage}`);
          expect(content).toContain('https://wa.me/919435977777');
        });

        it('passes the copy rules', () => {
          const { content, data } = read(slug);
          const text = `${data.title}\n${data.meta_description}\n${data.excerpt}\n${content}`;
          expect(text).not.toContain('—');
          expect(text).not.toMatch(BANNED);
          expect(text).not.toMatch(PRICE);
          expect(text).not.toMatch(INTERNAL);
          if (kind === 'hinglish') expect(text).not.toMatch(DEVANAGARI);
        });
      });
    }
  }
});
