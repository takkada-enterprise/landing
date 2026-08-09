import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_PAGES, featurePagePath } from '../featurePages';
import { routeMetadata } from '../siteMetadata';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const blogDir = resolve(repoRoot, 'content/blog');

// Until 2026-08-08 no blog post linked to any feature landing page. The Clarity
// data says the blog is the only thing pulling search entries and the feature
// pages pull none, and missing internal links are a large part of why. These
// guards keep the links the salesman round established from rotting.

const POSTS = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ file: f, body: readFileSync(resolve(blogDir, f), 'utf-8') }));

// [text](/path) — internal links only, ignoring http(s) and anchors.
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function linksIn(body) {
  return [...body.matchAll(LINK_RE)].map(([, text, href]) => ({ text, href }));
}

const normalise = (href) => {
  const path = href.split('#')[0].split('?')[0].replace(/\/$/, '');
  return path === '' ? '/' : path;
};

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));

describe('blog internal links', () => {
  it('resolves every non-blog internal link to a registered route', () => {
    const dead = [];
    for (const { file, body } of POSTS) {
      for (const { href } of linksIn(body)) {
        const path = normalise(href);
        if (path.startsWith('/blog')) continue; // blog slugs are covered elsewhere
        if (!KNOWN_ROUTES.has(path)) dead.push(`${file} -> ${href}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: is linked from at least one blog post',
    (_slug, page) => {
      const target = featurePagePath(page);
      const linking = POSTS.filter(({ body }) =>
        linksIn(body).some(({ href }) => normalise(href) === target)
      );
      expect(linking.length).toBeGreaterThan(0);
    }
  );

  // The cannibalisation guard. A post using a feature page's exact search
  // phrase as anchor text, pointed at some other URL, spends that page's
  // strongest internal signal on a competitor of its own. This is what the
  // corpus was doing: six posts used "salesman app for Tally" as the anchor for
  // /blog/salesman-app-tally-india/ while the landing page targeted the term.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: no post spends its search phrase as anchor text on another URL',
    (_slug, page) => {
      const target = featurePagePath(page);
      // "Salesman app for Tally" also matches "salesman app on Tally".
      const phrase = new RegExp(
        `^${page.searchPhrase.trim().replace(/\s+/g, '\\s+').replace(/\\s\+for\\s\+/, '\\s+(for|on)\\s+')}$`,
        'i'
      );
      const misdirected = [];
      for (const { file, body } of POSTS) {
        for (const { text, href } of linksIn(body)) {
          if (phrase.test(text.trim()) && normalise(href) !== target) {
            misdirected.push(`${file}: "${text}" -> ${href}`);
          }
        }
      }
      expect(misdirected).toEqual([]);
    }
  );
});

// Four posts used to chase the same phrase as one of the feature landing
// pages, so the site was bidding against itself for the head term and the
// blog post, being older, usually won. They were retitled to narrower angles
// (URLs untouched, so the inbound equity survived) and each was given a link
// up to its feature page inside the lead answer. Both halves are pinned here:
// a future edit that re-leads a title with the head phrase, or drops the link
// back out of the lead, reintroduces exactly the problem this fixed.
const RETITLED = [
  ['tally-on-mobile', 'tally-on-mobile'],
  ['view-tally-reports-on-mobile', 'tally-reports-on-mobile'],
  ['salesman-app-tally-india', 'salesman-app-tally'],
  ['how-to-send-payment-reminder-from-tally-whatsapp', 'payment-reminder-tally'],
];

// Everything above the first `##`: the lead-answer block a citation engine
// lifts, and the only place a link counts as "prominent".
const leadBlock = (body) => matter(body).content.split(/^##\s/m)[0];

describe('retitled posts stay off their feature page\'s head phrase', () => {
  it.each(RETITLED)('%s: exists and targets a real feature page', (postSlug, pageSlug) => {
    expect(POSTS.some((p) => p.file === `${postSlug}.md`)).toBe(true);
    expect(FEATURE_PAGES.some((p) => p.slug === pageSlug)).toBe(true);
  });

  it.each(RETITLED)('%s: title does not lead with the feature page phrase', (postSlug, pageSlug) => {
    const post = POSTS.find((p) => p.file === `${postSlug}.md`);
    const phrase = FEATURE_PAGES.find((p) => p.slug === pageSlug).searchPhrase;
    const title = matter(post.body).data.title ?? '';
    expect(title.toLowerCase().startsWith(phrase.toLowerCase())).toBe(false);
  });

  it.each(RETITLED)('%s: links up to its feature page from the lead answer', (postSlug, pageSlug) => {
    const post = POSTS.find((p) => p.file === `${postSlug}.md`);
    const hrefs = linksIn(leadBlock(post.body)).map(({ href }) => normalise(href));
    expect(hrefs).toContain(`/${pageSlug}`);
  });
});
