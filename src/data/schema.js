import {
  contactInfo,
  faqItems,
  pricing,
  publishedTestimonials,
  appLinks,
  appRatingCount,
} from './siteContent';
import { getAuthor } from './authors';

export const SITE_URL = 'https://takkada.com';
// Branded 1200×630 card (scripts/generate-og-cards.py), not the logo — the
// logo unfurled as a tiny square on WhatsApp/social shares. Per-page
// overrides pass their own card via the Seo ogImage prop.
export const DEFAULT_OG_IMAGE = '/assets/og/takkada-og-default.png';

// Every brand string the company is known by. Declaring these as
// alternateName on both the Organization and the SoftwareApplication tells
// crawlers that "Takkada", "Pay Saathi", and "PaySaathi" are one entity.
const ALTERNATE_NAMES = ['Takkada by Pay Saathi', 'Pay Saathi', 'PaySaathi'];

// External profiles that resolve to the same entity. The store listings and
// the canonical domain are included so crawlers merge the company, the app
// listing, and every brand string into a single knowledge-graph node.
const SAME_AS = [
  'https://www.linkedin.com/company/takkada/',
  'https://www.facebook.com/profile.php?id=61577621565711',
  appLinks.appStore,
  appLinks.playStore,
  SITE_URL,
];

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path;
  const leading = path.startsWith('/') ? path : `/${path}`;
  if (leading === '/') return `${SITE_URL}/`;
  const lastSegment = leading.split('/').filter(Boolean).pop() || '';
  const isAsset = lastSegment.includes('.');
  if (isAsset) return `${SITE_URL}${leading}`;
  const trailing = leading.endsWith('/') ? leading : `${leading}/`;
  return `${SITE_URL}${trailing}`;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Takkada',
    alternateName: ALTERNATE_NAMES,
    legalName: contactInfo.company,
    url: SITE_URL,
    logo: absoluteUrl('/assets/screenshots/takkada-logo.png'),
    email: contactInfo.email,
    telephone: contactInfo.phone,
    foundingDate: '2025-12',
    sameAs: SAME_AS,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bobagh, Ulubari',
      addressLocality: 'Guwahati',
      addressRegion: 'Assam',
      postalCode: '781008',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contactInfo.phone,
      contactType: 'customer support',
      email: contactInfo.email,
      areaServed: 'IN',
      availableLanguage: ['en', 'hi'],
    },
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Takkada',
    alternateName: ALTERNATE_NAMES,
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['en', 'hi'],
  };
}

function reviewSchema(testimonial) {
  return {
    '@type': 'Review',
    author: { '@type': 'Person', name: testimonial.name },
    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
    reviewBody: testimonial.quote,
  };
}

export function softwareApplicationSchema(reviews = publishedTestimonials) {
  const priceNumber = (price) => price.replace(/[^\d]/g, '');
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Takkada',
    alternateName: ALTERNATE_NAMES,
    description:
      'Mobile-first collections, e-invoicing, and reconciliation layer for businesses running on Tally.',
    url: SITE_URL,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Android, iOS',
    publisher: { '@id': `${SITE_URL}/#organization` },
    image: absoluteUrl('/assets/screenshots/takkada-logo.png'),
    screenshot: [
      absoluteUrl('/assets/screenshots/home-screen.png'),
      absoluteUrl('/assets/screenshots/payment-reminders.png'),
      absoluteUrl('/assets/screenshots/settlement.png'),
    ],
    offers: pricing.plans.map((plan) => ({
      '@type': 'Offer',
      name: plan.plan,
      price: priceNumber(plan.price),
      priceCurrency: 'INR',
      category: 'Annual subscription',
      eligibleCustomerType: 'https://schema.org/BusinessEntity',
    })),
  };

  // aggregateRating is only valid with a real ratingCount. Until a verified
  // count is supplied (appRatingCount), omit it entirely rather than ship a
  // fabricated number — schema.org requires the count and Google rejects
  // aggregateRating without one.
  if (typeof appRatingCount === 'number' && appRatingCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      ratingCount: appRatingCount,
    };
  }

  const reviewNodes = (reviews || []).map(reviewSchema);
  if (reviewNodes.length > 0) {
    schema.review = reviewNodes;
  }

  return schema;
}

export function faqPageSchema(items = faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: absoluteUrl(entry.path),
    })),
  };
}

// Build the Article `author` node. A known author key resolves to a real
// Person with credentials and (when supplied) a LinkedIn `sameAs`; an unknown
// key falls back to the Organization-typed author so legacy posts never lose
// their byline. `resolveAuthor` is injectable for testing, mirroring the
// `reviews` parameter on softwareApplicationSchema.
function authorNode(authorKey, resolveAuthor) {
  const author = resolveAuthor(authorKey);
  if (!author) {
    return { '@type': 'Organization', name: authorKey };
  }
  const node = {
    '@type': 'Person',
    name: author.name,
    worksFor: { '@id': `${SITE_URL}/#organization` },
  };
  if (author.jobTitle) node.jobTitle = author.jobTitle;
  if (author.url) node.url = absoluteUrl(author.url);
  if (author.linkedin) node.sameAs = [author.linkedin];
  if (Array.isArray(author.knowsAbout) && author.knowsAbout.length > 0) {
    node.knowsAbout = author.knowsAbout;
  }
  return node;
}

export function articleSchema(post, resolveAuthor = getAuthor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    image: absoluteUrl(post.heroImage),
    datePublished: post.date,
    // dateModified must reflect real edits, not mirror datePublished. An
    // optional `updated` frontmatter field bumps it; recency is a strong
    // AI-citation signal (plan U2 / GEO §4).
    dateModified: post.updated ?? post.date,
    author: authorNode(post.author, resolveAuthor),
    publisher: { '@id': `${SITE_URL}/#organization` },
    isPartOf: { '@id': `${SITE_URL}/#website` },
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}
