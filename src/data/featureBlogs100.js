// The 100 feature blogs (plan docs/plans/2026-10-11-001-feat-feature-blogs-100-plan.md).
// One object per feature batch; src/data/__tests__/feature-blogs-100.test.js
// holds every listed post to the spec's rules.
export const FEATURE_BLOG_BATCHES = [
  { id: 'ai-calling', featurePage: 'ai-collection-calls', pillar: 'ai-calling-for-payment-collection-tally', posts: [
    { slug: 'ai-calling-for-payment-collection-tally', kind: 'pillar' },
    { slug: 'ai-collection-calls-fmcg-distributors', kind: 'usecase' },
    { slug: 'ai-payment-reminder-calls-pharma-distributors', kind: 'usecase' },
    { slug: 'ai-collection-calls-agri-input-dealers', kind: 'usecase' },
    { slug: 'ai-collection-calls-hardware-building-material', kind: 'usecase' },
    { slug: 'ai-collection-calls-textile-wholesalers', kind: 'usecase' },
    { slug: 'ai-collection-calls-auto-parts-dealers', kind: 'usecase' },
    { slug: 'how-to-start-ai-collection-calls', kind: 'howto' },
    { slug: 'ai-se-payment-ka-call-kaise-karwaye', kind: 'hinglish' },
    { slug: 'office-staff-calling-vs-ai-calling', kind: 'compare' },
  ]},
  { id: 'fmcg-billing', featurePage: 'fmcg-module-tally', pillar: 'fmcg-billing-software-for-tally', posts: [
    { slug: 'fmcg-billing-software-for-tally', kind: 'pillar' },
    { slug: 'fmcg-billing-biscuit-snacks-distributors', kind: 'usecase' },
    { slug: 'fmcg-billing-personal-care-detergent-distributors', kind: 'usecase' },
    { slug: 'fmcg-billing-beverage-dairy-distributors', kind: 'usecase' },
    { slug: 'fmcg-billing-super-stockists', kind: 'usecase' },
    { slug: 'fmcg-billing-confectionery-wholesalers', kind: 'usecase' },
    { slug: 'fmcg-billing-staples-packaged-food-distributors', kind: 'usecase' },
    { slug: 'how-to-set-retailer-margin-discount-per-item', kind: 'howto' },
    { slug: 'fmcg-distributor-billing-mobile-se-tally-mein', kind: 'hinglish' },
    { slug: 'manual-rate-calculation-vs-margin-based-fmcg-billing', kind: 'compare' },
  ]},
];
