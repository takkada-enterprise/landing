// Single source of truth for top-level routes. Consumed by both the router
// (src/routes/index.jsx) and the build-time sitemap generator
// (scripts/generate-sitemap.mjs). Keep this file free of React / JSX imports
// so Node ESM can load it directly.

export const routeMetadata = [
  {
    path: '/',
    sourceFile: 'src/routes/Home.jsx',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about-us',
    sourceFile: 'src/routes/AboutUs.jsx',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/contact-us',
    sourceFile: 'src/routes/ContactUs.jsx',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/privacy-policy',
    sourceFile: 'src/routes/PrivacyPolicy.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/terms-and-conditions',
    sourceFile: 'src/routes/TermsAndConditions.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/refund-policy',
    sourceFile: 'src/routes/RefundPolicy.jsx',
    changefreq: 'yearly',
    priority: 0.3,
  },
  {
    path: '/mobile-tally',
    sourceFile: 'src/routes/MobileTally.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/tally-on-mobile',
    sourceFile: 'src/routes/TallyOnMobile.jsx',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/whatsapp-invoice-tally',
    sourceFile: 'src/routes/WhatsAppInvoice.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/auto-reconciliation-tally',
    sourceFile: 'src/routes/AutoReconciliation.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/for-distributors',
    sourceFile: 'src/routes/ForDistributors.jsx',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/partners',
    sourceFile: 'src/routes/Partners.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/become-a-partner',
    sourceFile: 'src/routes/Partners.jsx',
    changefreq: 'monthly',
    priority: 0.6,
  },
];
