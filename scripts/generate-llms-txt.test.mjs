import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildDoc,
  buildGuides,
  buildManual,
  buildPricingBlock,
  buildSections,
  url,
  SECTION_ORDER,
} from './generate-llms-txt.mjs';
import { readGuides, readTopics } from './lib/guideContract.mjs';
import { routeMetadata } from '../src/data/siteMetadata.js';
import { pricing } from '../src/data/siteContent.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const committed = readFileSync(resolve(repoRoot, 'public/llms.txt'), 'utf-8');

// The plan names that were pulled from the rate card. llms.txt advertised them
// for months after the rebuild; these assertions are what stops that recurring.
const RETIRED = ['View Only', 'Voucher Model', 'Collections Model', 'Full Access', '8,499', '2,700', 'Clarity', '2,900'];

describe('url', () => {
  it('gives the apex root a bare trailing slash', () => {
    expect(url('/')).toBe('https://takkada.com/');
  });

  it('appends a trailing slash to page paths', () => {
    expect(url('/partners')).toBe('https://takkada.com/partners/');
  });
});

describe('buildPricingBlock', () => {
  it('derives the ladder from annualPrice rather than a hand-written string', () => {
    const block = buildPricingBlock(pricing);
    for (const plan of pricing.plans) {
      expect(block).toContain(plan.plan);
    }
    expect(block).toContain('Momentum ₹4,500');
    expect(block).toContain('Enterprise ₹24,000');
    expect(block).not.toContain('₹2,900');
    expect(block).not.toMatch(/Add-ons:.*₹/s);
    expect(block).toContain('Ask your partner for pricing');
  });

  it('states the default multi-year term and its discount', () => {
    expect(buildPricingBlock(pricing)).toContain('3-year term is 25% off');
  });

  it('tracks a price change instead of pinning the old number', () => {
    const bumped = { ...pricing, plans: [{ plan: 'Momentum', annualPrice: 4700 }], addons: [] };
    const block = buildPricingBlock(bumped);
    expect(block).toContain('₹4,700');
    expect(block).not.toContain('₹4,500');
  });
});

describe('buildSections', () => {
  it('emits sections in SECTION_ORDER and drops empty ones', () => {
    const sections = buildSections(routeMetadata).map((g) => g.section);
    expect(sections).toEqual(SECTION_ORDER.filter((s) => sections.includes(s)));
  });

  it('lists only routes that opted in via an llms block', () => {
    const listed = buildSections(routeMetadata).flatMap((g) => g.entries.map((e) => e.url));
    // /privacy-policy carries no `llms` field, so it must not appear.
    expect(listed).not.toContain(url('/privacy-policy'));
    expect(listed).toContain(url('/partners'));
  });

  it('throws on an unrecognised section rather than silently dropping the page', () => {
    expect(() =>
      buildSections([{ path: '/x', llms: { section: 'Featurez', title: 'X', summary: 'y' } }])
    ).toThrow(/unknown llms.section/);
  });

  it('picks up a newly registered feature page with no other change', () => {
    const withNewPage = [
      ...routeMetadata,
      {
        path: '/salesman-app-tally',
        llms: { section: 'Features', title: 'Salesman app', summary: 'Orders with live stock.' },
      },
    ];
    const features = buildSections(withNewPage).find((g) => g.section === 'Features');
    expect(features.entries.map((e) => e.url)).toContain(url('/salesman-app-tally'));
  });
});

describe('buildDoc', () => {
  it('places the guides section after the page sections', () => {
    const doc = buildDoc({
      priceData: pricing,
      routes: routeMetadata,
      guides: [{ category: 'Collections', posts: [{ title: 'T', url: 'https://takkada.com/blog/t/' }] }],
    });
    expect(doc.indexOf('## Guides')).toBeGreaterThan(doc.indexOf('## Features'));
    expect(doc).toContain('### Collections');
    expect(doc).toContain('- [T](https://takkada.com/blog/t/)');
  });

  it('omits the guides heading entirely when there are no posts', () => {
    const doc = buildDoc({ priceData: pricing, routes: routeMetadata, guides: [] });
    expect(doc).not.toContain('## Guides');
  });
});

describe('the committed public/llms.txt', () => {
  it('is byte-identical to what the generator produces', () => {
    // Regenerating must be a no-op. If this fails, either public/llms.txt was
    // hand-edited or its inputs moved on: run
    // `node scripts/generate-llms-txt.mjs` and commit the result.
    const regenerated = buildDoc({
      priceData: pricing,
      routes: routeMetadata,
      guides: buildGuides(resolve(repoRoot, 'content/blog')),
      manual: buildManual(readTopics(repoRoot), readGuides(repoRoot)),
    });
    expect(committed).toBe(regenerated);
  });

  it('names no retired plan', () => {
    for (const name of RETIRED) {
      expect(committed).not.toContain(name);
    }
  });

  it('names every live plan at its live price', () => {
    for (const plan of pricing.plans) {
      expect(committed).toContain(plan.plan);
    }
    expect(committed).toContain('Momentum ₹4,500');
    expect(committed).toContain('Enterprise ₹24,000');
    expect(committed).toContain('₹6,480');
  });

  it('lists the add-ons without a single price', () => {
    const addonsBlock = committed.slice(committed.indexOf('Add-ons'), committed.indexOf('\n\n', committed.indexOf('Add-ons')));
    expect(addonsBlock).toContain('Ask your partner for pricing');
    expect(addonsBlock).not.toMatch(/₹/);
  });

  it('keeps the mandatory early-access wording on the WhatsApp-number add-on', () => {
    expect(committed).toMatch(/Your own WhatsApp number: Early access/);
  });

  it('uses apex URLs with no www subdomain', () => {
    expect(committed).not.toMatch(/https:\/\/www\./);
  });
});
