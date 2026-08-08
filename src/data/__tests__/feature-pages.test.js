import { describe, expect, it } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  FEATURE_PAGES,
  featureFooterLinks,
  featureRouteMetadata,
  featurePagePath,
  getFeaturePage,
} from '../featurePages';
import { routeMetadata } from '../siteMetadata';
import { footerColumns, pricing } from '../siteContent';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';
import { SECTION_ORDER } from '../../../scripts/generate-llms-txt.mjs';
import { BUDGETS } from '../../../scripts/checkImageBudgets.mjs';
import { findImagePreloads } from '../../../scripts/stripImagePreloads.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

// Content-side guards on the feature-page data. The page engine is only worth
// having if a new entry cannot ship broken, so the contract each entry has to
// satisfy is asserted here rather than left to a reviewer's eye.

describe('feature page data contract', () => {
  it('ships at least one page', () => {
    expect(FEATURE_PAGES.length).toBeGreaterThan(0);
  });

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))('%s: slug is url-safe and unique', (slug) => {
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(FEATURE_PAGES.filter((p) => p.slug === slug)).toHaveLength(1);
  });

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: the exact search phrase appears in the h1 and the title',
    (_slug, page) => {
      expect(page.headline.toLowerCase()).toContain(page.searchPhrase.toLowerCase());
      expect(page.seo.title.toLowerCase()).toContain(page.searchPhrase.toLowerCase());
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: title is under 60 chars and description under 160',
    (_slug, page) => {
      expect(page.seo.title.length).toBeLessThanOrEqual(60);
      expect(page.seo.description.length).toBeLessThanOrEqual(160);
    }
  );

  // The front-loaded answer is the passage AI-search engines lift. Too short
  // and it does not answer; too long and the citation-eligible opening is
  // diluted. The plan's band is 40-60 words.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: the answer block lands in the 40-60 word band and answers in sentence one',
    (_slug, page) => {
      const words = page.answer.trim().split(/\s+/);
      expect(words.length).toBeGreaterThanOrEqual(40);
      expect(words.length).toBeLessThanOrEqual(60);
      const firstSentence = page.answer.split(/(?<=\.)\s/)[0].toLowerCase();
      expect(firstSentence).toContain(page.searchPhrase.toLowerCase());
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: the hero mockup exists, is sized, and stays inside its byte budget',
    (_slug, page) => {
      expect(page.hero).toBeDefined();
      const abs = resolve(repoRoot, `public${page.hero.image}`);
      expect(existsSync(abs)).toBe(true);
      expect(page.hero.width).toBeGreaterThan(0);
      expect(page.hero.height).toBeGreaterThan(0);
      expect(page.hero.alt.length).toBeGreaterThan(0);
      // The hero is the LCP element on these pages. Every hero image must be
      // budgeted in checkImageBudgets.mjs, or a re-export can silently put the
      // bytes back and nothing fails the build.
      const budgeted = BUDGETS.find(([p]) => p === `public${page.hero.image}`);
      expect(budgeted).toBeDefined();
      expect(statSync(abs).size).toBeLessThanOrEqual(budgeted[1]);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: every walk-through step has a real screenshot with explicit dimensions',
    (_slug, page) => {
      expect(page.walkthrough.length).toBeGreaterThan(0);
      for (const step of page.walkthrough) {
        expect(existsSync(resolve(repoRoot, `public${step.image}`))).toBe(true);
        expect(step.alt.length).toBeGreaterThan(0);
        // Explicit width/height are what keep CLS at 0 on these pages.
        expect(step.width).toBeGreaterThan(0);
        expect(step.height).toBeGreaterThan(0);
      }
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: the comparison table keeps competitors unnamed',
    (_slug, page) => {
      // Deck guardrail: competitors stay unnamed on feature pages. The named
      // grid lives only on /tally-mobile-app-comparison.
      const banned = /biz\s*analyst|livekeeping|khatabook|credflow|vyapar|marg/i;
      const text = JSON.stringify(page.comparison);
      expect(text).not.toMatch(banned);
      expect(page.comparison.rows.length).toBeGreaterThan(0);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: names a live plan and writes no rupee figure of its own',
    (_slug, page) => {
      const planNames = pricing.plans.map((p) => p.plan);
      expect(planNames).toContain(page.planPointer.plan);
      // Every price on the site is derived through planPricing (CLAUDE.md §3).
      // A hand-typed rupee amount anywhere in a page entry is the failure this
      // catches.
      expect(JSON.stringify(page)).not.toMatch(/₹|\\u20B9/);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: uses no banned marketing words',
    (_slug, page) => {
      const banned =
        /\b(seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|cutting-edge)\b/i;
      expect(JSON.stringify(page)).not.toMatch(banned);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: every related post exists on disk with the title claimed here',
    (_slug, page) => {
      for (const post of page.relatedPosts) {
        const file = resolve(repoRoot, `content/blog/${post.slug}.md`);
        expect(existsSync(file)).toBe(true);
        const frontmatterTitle = readFileSync(file, 'utf-8').match(/^title:\s*"?(.+?)"?\s*$/m);
        expect(frontmatterTitle?.[1]).toBe(post.title);
      }
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))('%s: has quotable FAQs', (_slug, page) => {
    expect(page.faqs.length).toBeGreaterThanOrEqual(3);
    for (const faq of page.faqs) {
      expect(faq.q.endsWith('?')).toBe(true);
      // Self-contained answers are what an AI can lift without the question.
      expect(faq.a.split(/\s+/).length).toBeGreaterThanOrEqual(25);
    }
  });

  it('resolves a page by slug and returns undefined for an unknown one', () => {
    expect(getFeaturePage(FEATURE_PAGES[0].slug)).toBe(FEATURE_PAGES[0]);
    expect(getFeaturePage('no-such-page')).toBeUndefined();
  });
});

describe('feature page registration is automatic', () => {
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: is in routeMetadata, the sitemap, and llms.txt',
    (_slug, page) => {
      const entry = routeMetadata.find((r) => r.path === featurePagePath(page));
      expect(entry).toBeDefined();
      // sitemap !== false means it is emitted into sitemap.xml.
      expect(entry.sitemap).not.toBe(false);
      expect(entry.llms).toBeDefined();
      expect(SECTION_ORDER).toContain(entry.llms.section);
      expect(entry.llms.summary.length).toBeGreaterThan(40);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: is linked from the footer Features column',
    (_slug, page) => {
      const features = footerColumns.find((c) => c.title === 'Features');
      expect(features).toBeDefined();
      expect(features.links.some((l) => l.page === page.slug)).toBe(true);
    }
  );

  // Asserting WHATSAPP_MESSAGES[waContext] === waMessage would be circular:
  // whatsapp.js builds that map from these same entries, so both sides move
  // together and the test could never go red. What can actually break is a page
  // shipping without a message of its own, or reusing a context that already
  // means something else. Those are what this checks.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: carries its own substantive WhatsApp message on an unclaimed context',
    (_slug, page) => {
      expect(typeof page.waMessage).toBe('string');
      expect(page.waMessage.trim().length).toBeGreaterThan(40);
      expect(page.waMessage).not.toBe(WHATSAPP_MESSAGES.default);
      // The context must not collide with a hand-written one, or the feature
      // page would silently overwrite another surface's message.
      expect(page.waContext).toMatch(/^feature-/);
      expect(FEATURE_PAGES.filter((p) => p.waContext === page.waContext)).toHaveLength(1);
    }
  );

  it('derives one route metadata entry and one footer link per page', () => {
    expect(featureRouteMetadata).toHaveLength(FEATURE_PAGES.length);
    expect(featureFooterLinks).toHaveLength(FEATURE_PAGES.length);
  });

  // vite-react-ssg injects a preload for every <img>; stripImagePreloads keeps
  // only the deliberate ones. On a feature page that must resolve to exactly
  // one: the hero. If a walk-through image ever loses loading="lazy" its
  // preload survives and starts competing with the hero for bandwidth, which is
  // the failure mode that cost the homepage 0.7s of LCP.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: the built page preloads the hero and nothing else',
    (slug, page) => {
      const built = resolve(repoRoot, `dist/${slug}/index.html`);
      if (!existsSync(built)) return; // dist/ only exists after a build
      const html = readFileSync(built, 'utf-8');
      const preloads = findImagePreloads(html);
      expect(preloads).toHaveLength(1);
      expect(preloads[0]).toContain(page.hero.image);
    }
  );

  it('keeps the committed public/llms.txt in step with the pages', () => {
    const llms = readFileSync(resolve(repoRoot, 'public/llms.txt'), 'utf-8');
    for (const page of FEATURE_PAGES) {
      expect(llms).toContain(`https://takkada.com/${page.slug}/`);
    }
  });
});
