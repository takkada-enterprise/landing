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
import { appLinks, pricing, testimonials } from './siteContent';

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

describe('pricing data (Master Distributor rate card, June 2026)', () => {
  it('maps each plan to its current rate-card MRP', () => {
    const byPlan = Object.fromEntries(pricing.plans.map((p) => [p.plan, p.price]));
    expect(byPlan['View Only']).toBe('₹2,700');
    expect(byPlan['Voucher Model']).toBe('₹4,500');
    expect(byPlan['Collections Model']).toBe('₹6,480');
    expect(byPlan['Full Access']).toBe('₹8,499');
  });

  it('carries no superseded prices', () => {
    const prices = pricing.plans.map((p) => p.price);
    expect(prices).not.toContain('₹2,500');
    expect(prices).not.toContain('₹6,000');
    expect(prices).not.toContain('₹7,500');
    expect(prices).not.toContain('₹7,200');
  });

  it('offers Import from PDF as a ₹4,000 / year add-on', () => {
    const pdfAddon = pricing.addons.find((a) => a.label === 'Import from PDF');
    expect(pdfAddon).toBeDefined();
    expect(pdfAddon.price).toBe('₹4,000 / year');
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

  it('references the organization as publisher by @id, not an inline copy', () => {
    expect(softwareApplicationSchema().publisher).toEqual({ '@id': ORG_ID });
  });

  it('derives separator-free INR Offer prices from the rate-card MRPs', () => {
    const offers = Object.fromEntries(
      softwareApplicationSchema().offers.map((o) => [o.name, o])
    );
    expect(offers['View Only']).toMatchObject({ price: '2700', priceCurrency: 'INR' });
    expect(offers['Voucher Model']).toMatchObject({ price: '4500', priceCurrency: 'INR' });
    expect(offers['Collections Model']).toMatchObject({ price: '6480', priceCurrency: 'INR' });
    expect(offers['Full Access']).toMatchObject({ price: '8499', priceCurrency: 'INR' });
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
