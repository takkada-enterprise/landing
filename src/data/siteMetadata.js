// Single source of truth for top-level routes. Consumed by the router
// (src/routes/index.jsx), the build-time sitemap generator
// (scripts/generate-sitemap.mjs) and the llms.txt generator
// (scripts/generate-llms-txt.mjs). Keep this file free of React / JSX imports
// so Node ESM can load it directly.
//
// The optional `llms` field is what puts a route into public/llms.txt. Omit it
// and the page is absent from that file. `section` picks the heading it lands
// under ('Key pages' | 'Features' | 'Company'); `title` and `summary` are the
// link text and the one-line description an AI reads. A new feature landing
// page becomes AI-discoverable by adding `llms` here, nothing else.
//
// Feature landing pages are the exception to "add an entry here": they are
// spread in from src/data/featurePages.js, so one object in that file is the
// whole registration (route, sitemap, llms.txt line, footer link).

import { featureRouteMetadata } from './featurePages.js';

export const routeMetadata = [
  {
    path: '/',
    llms: {
      section: 'Key pages',
      title: 'Home',
      summary:
        "What Takkada does for a distributor running Tally: mobile invoicing, WhatsApp dispatch, UPI collection at 0% MDR, and auto-reconciliation back into Tally. Pricing and FAQs.",
    },
    sourceFile: 'src/routes/Home.jsx',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about-us',
    llms: {
      section: 'Company',
      title: 'About Takkada',
      summary:
        "Built by Pay Saathi Innovation LLP in Guwahati, Assam, for Indian distributors and wholesalers on Tally.",
    },
    sourceFile: 'src/routes/AboutUs.jsx',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/contact-us',
    llms: {
      section: 'Company',
      title: 'Contact',
      summary:
        "Phone, email and demo booking.",
    },
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
    llms: {
      section: 'Features',
      title: 'Tally on mobile (receivables view)',
      summary:
        "See Tally outstanding from a phone, send WhatsApp reminders and share ledger statements. Works with TallyPrime and Tally ERP 9.",
    },
    sourceFile: 'src/routes/MobileTally.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/whatsapp-invoice-tally',
    llms: {
      section: 'Features',
      title: 'WhatsApp invoicing from Tally',
      summary:
        "Salesmen raise invoices at the retailer's shop from their phone. Syncs to Tally in real time and the retailer gets the PDF on WhatsApp.",
    },
    sourceFile: 'src/routes/WhatsAppInvoice.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/auto-reconciliation-tally',
    llms: {
      section: 'Features',
      title: 'Auto-reconciliation into Tally',
      summary:
        "Payments auto-match to the correct Tally invoice. Partial, bulk and unreferenced payments handled, entries post into Tally automatically.",
    },
    sourceFile: 'src/routes/AutoReconciliation.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/for-distributors',
    llms: {
      section: 'Key pages',
      title: 'For distributors',
      summary:
        "The collections-heavy distributor workflow, for businesses carrying 30-300 retailer receivables on Tally.",
    },
    sourceFile: 'src/routes/ForDistributors.jsx',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/tally-mobile-app-comparison',
    llms: {
      section: 'Key pages',
      title: 'Tally mobile app comparison',
      summary:
        "Takkada compared with other Tally mobile apps, feature by feature.",
    },
    sourceFile: 'src/routes/TallyMobileComparison.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/demo',
    llms: {
      section: 'Key pages',
      title: 'Live demo',
      summary:
        "Try Takkada on a demo company with real-shaped books, no installation.",
    },
    sourceFile: 'src/routes/TryDemo.jsx',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/features',
    llms: {
      section: 'Key pages',
      title: 'All features',
      summary:
        "Directory of every Takkada feature page, grouped by job: getting paid, receivables, Tally on the phone, field sales, GST documents, billing and stock, imports, and comparisons.",
    },
    sourceFile: 'src/routes/Features.jsx',
    changefreq: 'monthly',
    priority: 0.9,
  },
  {
    path: '/partners',
    llms: {
      section: 'Key pages',
      title: 'Tally partner program',
      summary:
        "The reseller program for Tally partners: recurring commission on every plan and renewal.",
    },
    sourceFile: 'src/routes/Partners.jsx',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/become-a-partner',
    sourceFile: 'src/routes/Partners.jsx',
    changefreq: 'monthly',
    priority: 0.6,
    // Alias of /partners (already canonicals there). Keeping it in the
    // sitemap made crawlers see a duplicate; the route stays live for
    // inbound links but is excluded from sitemap.xml (2026-07 audit item 4).
    sitemap: false,
  },
  ...featureRouteMetadata,
];
