// generate-llms-txt — build public/llms.txt from the same data the site renders
// from, so it can never drift out of date again.
//
// It went stale once: llms.txt still advertised the retired "Voucher Model /
// Collections Model / Full Access ₹8,499" ladder months after the rate card was
// rebuilt, which is exactly the wrong thing to hand an AI-search crawler. The
// fix is to stop hand-writing it. Prices come from `pricing` in
// src/data/siteContent.js, pages come from the `llms` field on entries in
// src/data/siteMetadata.js, and guides come from the blog frontmatter on disk.
//
// Adding a feature landing page adds its llms.txt line automatically: give the
// route an `llms: { section, title, summary }` block and rebuild.
//
// Writes public/llms.txt (committed, so a diff is reviewable) and copies it into
// dist/ when dist/ exists. Pure helpers are unit-tested in
// scripts/generate-llms-txt.test.mjs; the file write only runs when this file is
// executed directly.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { routeMetadata } from '../src/data/siteMetadata.js';
import { pricing, formatInr } from '../src/data/siteContent.js';

export const SITE_URL = 'https://takkada.com';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Order the headings appear in the file. A route whose `llms.section` is not in
// this list is a typo, and buildDoc throws rather than silently dropping it.
export const SECTION_ORDER = ['Key pages', 'Features', 'Company'];

export function url(path) {
  if (path === '/') return `${SITE_URL}/`;
  const withLead = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${withLead.endsWith('/') ? withLead : `${withLead}/`}`;
}

/**
 * The pricing paragraph, derived from `pricing` so a rate-card change lands here
 * on the next build instead of being remembered by a human.
 * @param {typeof pricing} priceData
 * @returns {string}
 */
export function buildPricingBlock(priceData) {
  const ladder = priceData.plans
    .map((p) => `${p.plan} ${formatInr(p.annualPrice)}`)
    .join(' · ');
  const defaultTerm = priceData.terms.find((t) => t.id === priceData.defaultTerm);
  const termLine =
    defaultTerm && defaultTerm.discount > 0
      ? ` A ${defaultTerm.years}-year term is ${Math.round(defaultTerm.discount * 100)}% off, billed once.`
      : '';
  const addons = priceData.addons.map((a) => `${a.label} ${a.price}`).join(' · ');
  return (
    `Pricing (annual list price per business, GST extra): ${ladder}.${termLine}\n\n` +
    `Add-ons: ${addons}.`
  );
}

/**
 * Group the routes that opted into llms.txt under their section headings.
 * @param {typeof routeMetadata} routes
 * @returns {Array<{section: string, entries: Array<{title: string, url: string, summary: string}>}>}
 */
export function buildSections(routes) {
  const listed = routes.filter((r) => r.llms);
  const unknown = listed
    .map((r) => r.llms.section)
    .filter((s) => !SECTION_ORDER.includes(s));
  if (unknown.length > 0) {
    throw new Error(
      `generate-llms-txt: unknown llms.section ${[...new Set(unknown)].map((s) => `"${s}"`).join(', ')}. ` +
        `Valid sections: ${SECTION_ORDER.join(', ')}.`
    );
  }
  return SECTION_ORDER.map((section) => ({
    section,
    entries: listed
      .filter((r) => r.llms.section === section)
      .map((r) => ({ title: r.llms.title, url: url(r.path), summary: r.llms.summary })),
  })).filter((g) => g.entries.length > 0);
}

function frontmatterField(raw, field) {
  const m = raw.match(new RegExp(`^${field}:\\s*"?([^"\\n]+)"?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
}

/**
 * Every blog post on disk, grouped by its frontmatter category. Titles only —
 * 160 posts with descriptions would bury the map under the territory.
 * @param {string} blogDir
 * @returns {Array<{category: string, posts: Array<{title: string, url: string}>}>}
 */
export function buildGuides(blogDir) {
  if (!existsSync(blogDir)) return [];
  const posts = readdirSync(blogDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = readFileSync(resolve(blogDir, f), 'utf-8');
      return {
        title: frontmatterField(raw, 'title') ?? f.replace(/\.md$/, ''),
        category: frontmatterField(raw, 'category') ?? 'Guides',
        url: url(`/blog/${frontmatterField(raw, 'slug') ?? f.replace(/\.md$/, '')}`),
      };
    });
  const categories = [...new Set(posts.map((p) => p.category))].sort();
  return categories.map((category) => ({
    category,
    posts: posts
      .filter((p) => p.category === category)
      .sort((a, b) => a.title.localeCompare(b.title)),
  }));
}

export function buildDoc({ priceData, routes, guides }) {
  const lines = [
    '# Takkada',
    '',
    "> Takkada is a mobile app for Indian distributors and wholesalers who run their books on Tally. It adds mobile invoicing (including e-invoice and e-way bill), automatic invoice dispatch on WhatsApp, UPI payment collection with zero MDR, automated payment reminders, and auto-reconciliation of payments back into Tally. Tally stays the system of record; Takkada syncs with the distributor's own Tally installation through a Windows connector. Built by Pay Saathi Innovation LLP, Guwahati, India.",
    '',
    buildPricingBlock(priceData),
    '',
  ];

  for (const { section, entries } of buildSections(routes)) {
    lines.push(`## ${section}`, '');
    for (const e of entries) lines.push(`- [${e.title}](${e.url}): ${e.summary}`);
    lines.push('');
  }

  if (guides.length > 0) {
    lines.push('## Guides', '');
    lines.push(
      `Practical guides on Tally workflows, receivables and collections. Index: ${url('/blog')}`,
      ''
    );
    for (const { category, posts } of guides) {
      lines.push(`### ${category}`, '');
      for (const p of posts) lines.push(`- [${p.title}](${p.url})`);
      lines.push('');
    }
  }

  lines.push(
    '## Contact',
    '',
    '- WhatsApp/phone: +91 94359 77777 · email: ronak@paysaathi.com',
    '- Demo booking: https://calendar.notion.so/meet/ronakmalu/takkada',
    ''
  );

  return lines.join('\n');
}

function main() {
  const doc = buildDoc({
    priceData: pricing,
    routes: routeMetadata,
    guides: buildGuides(resolve(repoRoot, 'content/blog')),
  });

  writeFileSync(resolve(repoRoot, 'public/llms.txt'), doc);
  const distDir = resolve(repoRoot, 'dist');
  if (existsSync(distDir)) writeFileSync(resolve(distDir, 'llms.txt'), doc);

  const pageCount = buildSections(routeMetadata).reduce((n, g) => n + g.entries.length, 0);
  process.stdout.write(
    `generate-llms-txt: wrote public/llms.txt (${pageCount} pages, ${doc.length} bytes)\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
