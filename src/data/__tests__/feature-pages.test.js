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
import { ICON_NAMES } from '../../components/FeaturePage';

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

  // Captures that carry a real customer's name, balance, invoice number or
  // bank reference. Phase 3 found five of them sitting in the published
  // screenshot library and one already live on the homepage, and the only
  // thing standing between them and a page was somebody remembering. On
  // 2026-08-08 somebody did not: settlement.webp went in as the
  // /biz-analyst-alternative hero and was caught by eye, not by a test. It
  // shows a named individual and two real bank UTRs.
  //
  // Everything under public/assets/screenshots ships to the CDN and is
  // fetchable by URL whether or not a page links it, so this guard is about
  // what the site puts in front of a reader, not about what exists on disk.
  // Add to this list rather than deleting the file, so the reason survives.
  const UNSAFE_CAPTURES = [
    'invoice-detail', // a real customer's invoice, named party
    'share-ledger', // real party name, real receivable, real invoice numbers
    'bankbook', // real company names and bank balances
    'inventory-supplier', // real supplier names
    'party-list', // known-banned since the homepage v3 round
    'settlement', // named individual, two real bank UTRs
  ];
  const isUnsafe = (src) => {
    const file = src.split('/').pop().replace(/\.(webp|png|jpg)$/, '');
    return UNSAFE_CAPTURES.includes(file);
  };

  // Placeholder artwork the operator still owes us, and the pages allowed to
  // reference it. Both halves are load-bearing:
  //
  //   - a placeholder may only appear on a page that is behind a release gate,
  //     so removing the page from HELD_PAGES turns the guard red until the real
  //     image lands. That is the merge-day step, not a reviewer's memory.
  //   - the sha256 pins the stamped artwork itself. Replace the file and this
  //     goes red, which is what forces the entry out of the list rather than
  //     letting it rot into a lie about what ships.
  //
  // The placeholder is a hazard-striped slab reading PLACEHOLDER. It is ugly on
  // purpose: a tasteful grey box is the kind of thing that survives a review.
  const PLACEHOLDER_ASSETS = {
    'order-link-inbox-mockup':
      '9810c7339e2303f880dda060f5f7f464a93e044aae27941d8e0ded5b5df2f113',
  };
  const HELD_PAGES = {
    'order-booking-app-tally':
      'Order Link v2 is stage-only. Prod customer_order_links still has the v1 shape and zero rows (verified 2026-08-11), so this page cannot publish yet.',
  };

  it('every held page is a real page, so the gate list cannot rot', () => {
    const slugs = FEATURE_PAGES.map((p) => p.slug);
    for (const slug of Object.keys(HELD_PAGES)) {
      expect(slugs, `HELD_PAGES names "${slug}", which is not a page`).toContain(slug);
    }
  });

  it('places every placeholder asset on a page that is still behind a gate', () => {
    for (const page of FEATURE_PAGES) {
      const used = [page.hero.image, ...page.walkthrough.map((s) => s.image)];
      const placeholders = used
        .map((src) => src.split('/').pop().replace(/\.(webp|png|jpg)$/, ''))
        .filter((file) => file in PLACEHOLDER_ASSETS);
      if (placeholders.length === 0) continue;
      expect(
        HELD_PAGES,
        `${page.slug} publishes placeholder artwork (${placeholders.join(', ')}) ` +
          'but is not behind a release gate. Land the real image before releasing it.'
      ).toHaveProperty(page.slug);
    }
  });

  it('has not quietly swapped a placeholder for real artwork', async () => {
    const { createHash } = await import('node:crypto');
    for (const [file, expected] of Object.entries(PLACEHOLDER_ASSETS)) {
      const path = resolve(repoRoot, `public/assets/screenshots/${file}.webp`);
      const actual = createHash('sha256').update(readFileSync(path)).digest('hex');
      expect(
        actual,
        `${file}.webp is no longer the stamped placeholder. Drop it from ` +
          'PLACEHOLDER_ASSETS in the same commit that lands the real image.'
      ).toBe(expected);
    }
  });

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: uses no screenshot carrying real customer data',
    (_slug, page) => {
      const used = [page.hero.image, ...page.walkthrough.map((s) => s.image)];
      const offenders = used.filter(isUnsafe);
      expect(
        offenders,
        `${page.slug} publishes a real capture. Use the sanitised -mockup variant.`
      ).toEqual([]);
    }
  );

  // Icon names are strings on this side of the boundary, so a typo would
  // render a step with no icon and nothing would fail. This is the check that
  // the string actually resolves in FeaturePage's ICONS map.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: every walk-through icon name resolves to a real icon',
    (_slug, page) => {
      for (const step of page.walkthrough) {
        expect(ICON_NAMES).toContain(step.icon);
      }
    }
  );

  // Deck guardrail: competitors stay unnamed on feature pages, and the named
  // grid lives on /tally-mobile-app-comparison.
  //
  // Relaxed 2026-08-08 for the Phase 5 alternative pages, which cannot exist
  // without naming the product someone is searching for an alternative to. The
  // relaxation is opt-in per page through `namesCompetitor` and is narrow on
  // purpose: a page may name the one competitor it is about and no other. That
  // keeps the blast radius of the exception to two pages instead of turning the
  // whole guard off, and it stops an alternative page quietly growing into a
  // roundup that name-drops the rest of the category.
  // \bmarg\b rather than the bare /marg/ the original guard used: that form
  // matched the word "margins", so a page talking about a distributor's margin
  // was indistinguishable from one name-dropping Marg ERP.
  const COMPETITORS = /biz\s*analyst|livekeeping|khatabook|credflow|vyapar|\bmarg erp\b/gi;
  const NAMEABLE = ['Biz Analyst', 'Livekeeping'];

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: names at most the one competitor it opted into',
    (_slug, page) => {
      expect(page.comparison.rows.length).toBeGreaterThan(0);
      const mentioned = [...JSON.stringify(page).matchAll(COMPETITORS)].map((m) =>
        m[0].toLowerCase().replace(/\s+/g, ' ')
      );

      if (!page.namesCompetitor) {
        expect(mentioned, `${page.slug} must not name a competitor`).toEqual([]);
        return;
      }

      expect(NAMEABLE).toContain(page.namesCompetitor);
      const allowed = page.namesCompetitor.toLowerCase();
      for (const name of mentioned) {
        expect(name, `${page.slug} may only name ${page.namesCompetitor}`).toBe(allowed);
      }
      // An alternative page that never says the name in its comparison column
      // has opted in for nothing, which means the reader never sees who the
      // column is.
      expect(page.comparison.othersLabel).toBe(page.namesCompetitor);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: names a live plan and writes no rupee figure of its own',
    (_slug, page) => {
      const planNames = pricing.plans.map((p) => p.plan);
      expect(planNames).toContain(page.planPointer.plan);
      // Every price on the site is derived through planPricing (CLAUDE.md §3).
      // A hand-typed rupee amount anywhere in a page entry is the failure this
      // catches. relatedPosts is excluded because those titles are quoted
      // verbatim from blog frontmatter and pinned character-for-character by
      // the test above, so a rupee inside one is the post's own headline
      // ("Clear ₹50,000+ Shipments…"), not a price this page invented. Editing
      // it to dodge this guard would break the title-match test instead.
      const { relatedPosts, ...priceBearing } = page;
      expect(JSON.stringify(priceBearing)).not.toMatch(/₹|\\u20B9/);
    }
  );

  // Claims that depend on a government facility being live need a guard, not a
  // memory. This one shipped to a live page on 2026-08-08: the comparison table
  // said Takkada can "close" an e-way bill from the phone. GSTN Advisory No. 668
  // of 29 July 2026 put the closure facility in abeyance until further notice,
  // so nobody can offer it, and our own blog had said so since 2026-08-04.
  // Cancellation is real and code-verified; closure is not. If GSTN revives the
  // facility and we build against it, delete this test deliberately.
  // Refined 2026-08-08 when /e-way-bill-from-phone was added. The original
  // form scanned the whole page object, which is right for every selling
  // surface but wrong for the FAQ: the highest-value answer that page can give
  // someone searching "eway bill closing on phone" is that closure does not
  // exist yet and why, and a flat ban made writing that truth impossible. So
  // the ban stays absolute everywhere a claim can live, and the FAQ is allowed
  // to discuss closure only while denying it and citing the advisory.
  const CLOSURE = /clos(e|ing|ure)[^.,"]{0,40}(e-?way|eway)|(e-?way|eway)[^.,"]{0,40}clos(e|ing|ure)/;

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: never claims e-way bill closure on any selling surface',
    (_slug, page) => {
      // Everything except the FAQ: hero, answer, walk-through, comparison
      // table, llms summary, plan pointer, WhatsApp message. relatedPosts is
      // out for the same reason it is out of the rupee guard, and here it
      // matters more: the most useful post to link from an e-way page is the
      // one titled "E Way Bill Closure: What Is Paused", whose subject is
      // precisely that closure does not exist.
      const { faqs, relatedPosts, ...selling } = page;
      expect(JSON.stringify(selling).toLowerCase()).not.toMatch(CLOSURE);
      // The compact list form the original bug took: "generate, cancel, and close".
      expect(JSON.stringify(page).toLowerCase()).not.toMatch(/cancel,?\s+and\s+close/);
    }
  );

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: any FAQ that raises closure denies it and says why',
    (_slug, page) => {
      for (const faq of page.faqs) {
        const answer = faq.a.toLowerCase();
        if (!CLOSURE.test(`${faq.q} ${faq.a}`.toLowerCase())) continue;
        // A denial names the advisory that put the facility in abeyance. An
        // answer that raises closure without it is either a claim or a vague
        // half-answer, and both are failures.
        expect(answer, `${page.slug}: closure FAQ must cite the advisory`).toContain('abeyance');
        expect(answer, `${page.slug}: closure FAQ must cite the advisory`).toMatch(/advisory no\. 668/);
        // And it must actually say no.
        expect(answer, `${page.slug}: closure FAQ must deny, not claim`).toMatch(/\bno\b|\bnot\b|cannot/);
      }
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
