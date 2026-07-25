import { describe, expect, it } from 'vitest';
import {
  SITE_URL,
  absoluteUrl,
  organizationSchema,
  webSiteSchema,
  softwareApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
  articleSchema,
} from './schema';
import { appLinks, formatInr, planPricing, pricing, testimonials } from './siteContent';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

describe('organizationSchema', () => {
  it('lists both store URLs and the canonical domain in sameAs', () => {
    const { sameAs } = organizationSchema();
    expect(sameAs).toContain(appLinks.appStore);
    expect(sameAs).toContain(appLinks.playStore);
    expect(sameAs).toContain(SITE_URL);
  });

  it('merges every brand string via alternateName', () => {
    const { alternateName } = organizationSchema();
    expect(alternateName).toEqual(
      expect.arrayContaining(['Takkada by Pay Saathi', 'Pay Saathi', 'PaySaathi'])
    );
  });

  it('exposes a stable @id used as the publisher anchor', () => {
    expect(organizationSchema()['@id']).toBe(ORG_ID);
  });
});

describe('webSiteSchema', () => {
  it('returns a WebSite node with @id and a publisher @id ref to the organization', () => {
    const schema = webSiteSchema();
    expect(schema['@type']).toBe('WebSite');
    expect(schema['@id']).toBe(WEBSITE_ID);
    expect(schema.publisher).toEqual({ '@id': ORG_ID });
    expect(schema.url).toBe(SITE_URL);
    expect(schema.inLanguage).toEqual(['en', 'hi']);
  });
});

describe('pricing data (rate card, July 2026)', () => {
  it('maps each plan to its current rate-card MRP', () => {
    const byPlan = Object.fromEntries(pricing.plans.map((p) => [p.plan, p.annualPrice]));
    expect(byPlan).toEqual({
      Clarity: 2900,
      Momentum: 4500,
      Assurance: 6480,
      Copilot: 8500,
    });
  });

  it('keeps the retired plan names off the public site', () => {
    const names = pricing.plans.map((p) => p.plan);
    expect(names).not.toContain('View Only');
    expect(names).not.toContain('Voucher Model');
    expect(names).not.toContain('Collections Model');
    expect(names).not.toContain('Full Access');
  });

  it('carries no superseded prices', () => {
    const prices = pricing.plans.map((p) => p.annualPrice);
    for (const superseded of [2500, 2700, 6000, 7200, 7500, 8499]) {
      expect(prices).not.toContain(superseded);
    }
  });

  it('renders the display price from the annual MRP', () => {
    for (const plan of pricing.plans) {
      expect(plan.price).toBe(formatInr(plan.annualPrice));
    }
  });

  it('sells Payment Collection as a ₹1,500 / year add-on on every plan', () => {
    const collection = pricing.addons.find((a) => a.label === 'Payment Collection');
    expect(collection).toBeDefined();
    expect(collection.price).toBe('₹1,500 / year');
    expect(collection.note).toMatch(/every plan/i);
  });

  it('bundles the former add-on modules into the top plan rather than selling them separately', () => {
    const addonLabels = pricing.addons.map((a) => a.label);
    expect(addonLabels).not.toContain('Import from PDF');
    expect(addonLabels).not.toContain('Auto Invoice Dispatch');
    expect(addonLabels).not.toContain('Reports +');
    expect(addonLabels).not.toContain('Salesman module');

    const topTier = pricing.plans.length - 1;
    const allRows = pricing.matrix.flatMap((g) => g.rows);
    for (const capability of [/Import from PDF/, /Auto Invoice Dispatch/, /Reports \+/, /salesman/i]) {
      const row = allRows.find((r) => capability.test(r.label));
      expect(row, `no matrix row for ${capability}`).toBeDefined();
      expect(row.from).toBe(topTier);
    }
  });
});

describe('pricing matrix', () => {
  const allRows = pricing.matrix.flatMap((g) => g.rows);

  it('anchors every row to a real plan index', () => {
    expect(allRows.length).toBeGreaterThan(0);
    for (const row of allRows) {
      expect(Number.isInteger(row.from)).toBe(true);
      expect(row.from).toBeGreaterThanOrEqual(0);
      expect(row.from).toBeLessThan(pricing.plans.length);
    }
  });

  it('gives every plan at least one capability of its own, so no tier is a pure price bump', () => {
    for (let i = 0; i < pricing.plans.length; i += 1) {
      expect(
        allRows.some((r) => r.from === i),
        `${pricing.plans[i].plan} introduces nothing new`
      ).toBe(true);
    }
  });

  it('makes the ladder cumulative: the top plan carries every row', () => {
    const top = pricing.plans.length - 1;
    for (const row of allRows) {
      expect(top).toBeGreaterThanOrEqual(row.from);
    }
    const entry = allRows.filter((r) => r.from === 0).length;
    expect(entry).toBeGreaterThan(0);
    expect(entry).toBeLessThan(allRows.length);
  });

  it('claims nothing that is not live for real customers in production', () => {
    // Claims discipline: a row here is a public promise. Each was checked
    // against prod company_feature_entitlements on 2026-07-25 and had a
    // non-zero count of companies with it active. Pending Orders failed that
    // check (built, granted to zero companies) and was pulled. Verify against
    // prod before adding anything to this list.
    const NOT_LIVE = [/pending order/i];
    for (const unshipped of NOT_LIVE) {
      expect(
        allRows.find((r) => unshipped.test(r.label)),
        `${unshipped} is not live in prod and must not be advertised`
      ).toBeUndefined();
    }
  });

  it('lists no capability twice', () => {
    const labels = allRows.map((r) => r.label);
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('drops the per-card feature lists the table replaced', () => {
    for (const plan of pricing.plans) {
      expect(plan.features).toBeUndefined();
    }
  });
});

describe('planPricing', () => {
  const plan = pricing.plans.find((p) => p.plan === 'Copilot');

  it('quotes the list rate on the 1-year term with nothing saved', () => {
    const quote = planPricing(plan, '1y');
    expect(quote.perYear).toBe(8500);
    expect(quote.total).toBe(8500);
    expect(quote.saving).toBe(0);
    expect(quote.savingLabel).toBeNull();
    expect(quote.price).toBe('₹8,500');
    // The headline price already is the total on a 1-year term, so no
    // second "billed" line is offered for the card to render.
    expect(quote.totalLabel).toBeNull();
  });

  it('takes exactly 25% off the 3-year term and quotes it per year', () => {
    const quote = planPricing(plan, '3y');
    expect(quote.perYear).toBe(6375);
    expect(quote.total).toBe(19125);
    expect(quote.saving).toBe(8500 * 3 - 19125);
    expect(quote.price).toBe('₹6,375');
    expect(quote.listPrice).toBe('₹8,500');
    expect(quote.totalLabel).toBe('₹19,125 billed once for 3 years');
    expect(quote.savingLabel).toBe('You keep ₹6,375');
  });

  it('discounts every plan by the same 25% on the 3-year term', () => {
    for (const p of pricing.plans) {
      const quote = planPricing(p, '3y');
      expect(quote.total).toBeCloseTo(p.annualPrice * 3 * 0.75, 5);
    }
  });

  it('falls back to the 1-year term when handed an unknown term id', () => {
    expect(planPricing(plan, 'nonsense').perYear).toBe(8500);
  });

  it('defaults the site to the discounted 3-year term', () => {
    expect(pricing.defaultTerm).toBe('3y');
    expect(pricing.terms.map((t) => t.id)).toEqual(['1y', '3y']);
    expect(pricing.terms.find((t) => t.id === '3y').discount).toBe(0.25);
  });
});

describe('formatInr', () => {
  it('groups rupees the Indian way', () => {
    expect(formatInr(2900)).toBe('₹2,900');
    expect(formatInr(19125)).toBe('₹19,125');
    expect(formatInr(100000)).toBe('₹1,00,000');
  });
});

describe('softwareApplicationSchema', () => {
  it('maps testimonials into Review nodes whose count matches the input', () => {
    const reviews = [
      { name: 'A', quote: 'Great' },
      { name: 'B', quote: 'Solid' },
    ];
    const schema = softwareApplicationSchema(reviews);
    expect(schema.review).toHaveLength(2);
    expect(schema.review[0]).toMatchObject({
      '@type': 'Review',
      author: { '@type': 'Person', name: 'A' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Great',
    });
  });

  it('omits aggregateRating while no real ratingCount is configured', () => {
    // appRatingCount is null by default — a fabricated count must never ship.
    expect(softwareApplicationSchema()).not.toHaveProperty('aggregateRating');
  });

  it('returns valid schema with no review key when given empty testimonials', () => {
    const schema = softwareApplicationSchema([]);
    expect(schema).not.toHaveProperty('review');
    expect(schema['@type']).toBe('SoftwareApplication');
    expect(schema.offers.length).toBeGreaterThan(0);
  });

  it('uses the on-site testimonials by default', () => {
    const schema = softwareApplicationSchema();
    expect(schema.review).toHaveLength(testimonials.length);
  });

  it('never emits a placeholder testimonial as a Review node', () => {
    // Voice rule: real quotes only. The testimonials array must hold nothing
    // but founder-supplied quotes — a fabricated Review reaching crawlers
    // would be worse than none.
    expect(testimonials.length).toBeGreaterThan(0);
    for (const t of testimonials) {
      expect(t.placeholder).toBeUndefined();
      expect(t.quote).not.toContain('PLACEHOLDER');
      expect(t.name).not.toContain('Placeholder');
    }
    for (const review of softwareApplicationSchema().review ?? []) {
      expect(review.reviewBody).not.toContain('PLACEHOLDER');
    }
  });

  it('references the organization as publisher by @id, not an inline copy', () => {
    expect(softwareApplicationSchema().publisher).toEqual({ '@id': ORG_ID });
  });

  it('derives separator-free INR Offer prices from the rate-card MRPs', () => {
    const offers = Object.fromEntries(
      softwareApplicationSchema().offers.map((o) => [o.name, o])
    );
    expect(offers['View Only']).toBeUndefined();
    expect(offers['Clarity']).toMatchObject({ price: '2900', priceCurrency: 'INR' });
    expect(offers['Momentum']).toMatchObject({ price: '4500', priceCurrency: 'INR' });
    expect(offers['Assurance']).toMatchObject({ price: '6480', priceCurrency: 'INR' });
    expect(offers['Copilot']).toMatchObject({ price: '8500', priceCurrency: 'INR' });
  });
});

describe('absoluteUrl emissions', () => {
  it('emits absolute takkada.com URLs everywhere a URL appears', () => {
    const org = organizationSchema();
    const app = softwareApplicationSchema();
    const urls = [
      org.url,
      org.logo,
      app.url,
      app.image,
      ...app.screenshot,
      webSiteSchema().url,
    ];
    for (const url of urls) {
      expect(url.startsWith('https://takkada.com')).toBe(true);
    }
  });

  it('returns already-absolute http URLs unchanged', () => {
    expect(absoluteUrl('https://takkada.com/mobile-tally/')).toBe(
      'https://takkada.com/mobile-tally/'
    );
  });

  it('normalizes a route path to a trailing-slash absolute URL', () => {
    expect(absoluteUrl('/partners')).toBe('https://takkada.com/partners/');
  });
});

describe('faqPageSchema', () => {
  it('maps questions one-to-one onto mainEntity', () => {
    const items = [{ question: 'Q?', answer: 'A.' }];
    const schema = faqPageSchema(items);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: 'Q?',
      acceptedAnswer: { '@type': 'Answer', text: 'A.' },
    });
  });
});

describe('breadcrumbSchema', () => {
  it('builds positioned ListItems with absolute item URLs', () => {
    const schema = breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Partners', path: '/partners' },
    ]);
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement[0]).toMatchObject({ position: 1, name: 'Home' });
    expect(schema.itemListElement[1].item).toBe('https://takkada.com/partners/');
  });
});

describe('articleSchema', () => {
  const post = {
    title: 'Test Post',
    meta_description: 'desc',
    heroImage: '/assets/blog/test.png',
    date: '2026-06-06',
    author: 'Takkada',
    slug: 'test-post',
  };

  it('references publisher and isPartOf by @id, not inline duplicates', () => {
    const schema = articleSchema(post);
    expect(schema.publisher).toEqual({ '@id': ORG_ID });
    expect(schema.isPartOf).toEqual({ '@id': WEBSITE_ID });
  });

  it('points url and mainEntityOfPage at the absolute post URL', () => {
    const schema = articleSchema(post);
    expect(schema.url).toBe('https://takkada.com/blog/test-post/');
    expect(schema.mainEntityOfPage).toBe('https://takkada.com/blog/test-post/');
  });

  describe('author resolution', () => {
    // A resolver standing in for a fully-populated registry entry (LinkedIn
    // supplied), so the Person/sameAs path is asserted regardless of whether
    // the operator has pasted the real founder LinkedIn yet.
    const founderResolver = () => ({
      name: 'Ronak Maloo',
      jobTitle: 'Founder',
      linkedin: 'https://www.linkedin.com/in/ronakmalu/',
      knowsAbout: ['Tally', 'Accounts receivable'],
    });

    it('emits a Person author with name, jobTitle, knowsAbout and a LinkedIn sameAs when resolved', () => {
      const schema = articleSchema({ ...post, author: 'founder' }, founderResolver);
      expect(schema.author).toMatchObject({
        '@type': 'Person',
        name: 'Ronak Maloo',
        jobTitle: 'Founder',
      });
      expect(schema.author.sameAs).toContain('https://www.linkedin.com/in/ronakmalu/');
      expect(schema.author.knowsAbout).toContain('Tally');
    });

    it('anchors the Person to the organization via worksFor @id', () => {
      const schema = articleSchema({ ...post, author: 'founder' }, founderResolver);
      expect(schema.author.worksFor).toEqual({ '@id': ORG_ID });
    });

    it('omits sameAs when the resolved author has no LinkedIn yet', () => {
      const noLinkedin = () => ({ name: 'Ronak Maloo', jobTitle: 'Founder' });
      const schema = articleSchema({ ...post, author: 'founder' }, noLinkedin);
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author).not.toHaveProperty('sameAs');
    });

    it('falls back to an Organization author for an unknown/legacy author key', () => {
      const schema = articleSchema({ ...post, author: 'Takkada Team' });
      expect(schema.author).toEqual({ '@type': 'Organization', name: 'Takkada Team' });
    });

    it('resolves the real "founder" key against the shipped registry as a Person with a LinkedIn sameAs', () => {
      const schema = articleSchema({ ...post, author: 'founder' });
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Ronak Maloo');
      expect(schema.author.worksFor).toEqual({ '@id': ORG_ID });
      expect(schema.author.sameAs).toContain('https://www.linkedin.com/in/ronak-maloo/');
    });

    it('resolves the real "harsh" key as a name-only Person (LinkedIn sameAs, no jobTitle)', () => {
      const schema = articleSchema({ ...post, author: 'harsh' });
      expect(schema.author['@type']).toBe('Person');
      expect(schema.author.name).toBe('Harsh Bhudolia');
      expect(schema.author.worksFor).toEqual({ '@id': ORG_ID });
      expect(schema.author.sameAs).toContain('https://www.linkedin.com/in/harsh-bhudolia/');
      expect(schema.author).not.toHaveProperty('jobTitle');
    });
  });

  describe('dateModified', () => {
    it('uses datePublished when no updated field is present', () => {
      expect(articleSchema(post).dateModified).toBe('2026-06-06');
    });

    it('uses the updated field when present', () => {
      expect(articleSchema({ ...post, updated: '2026-06-21' }).dateModified).toBe('2026-06-21');
      expect(articleSchema({ ...post, updated: '2026-06-21' }).datePublished).toBe('2026-06-06');
    });
  });
});
