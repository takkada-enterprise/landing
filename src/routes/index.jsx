import Layout from '../Layout';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import LegalPrivacy from './LegalPrivacy';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';
import MobileTally from './MobileTally';
import WhatsAppInvoice from './WhatsAppInvoice';
import AutoReconciliation from './AutoReconciliation';
import ForDistributors from './ForDistributors';
import TallyMobileComparison from './TallyMobileComparison';
import TryDemo from './TryDemo';
import Partners from './Partners';
import Features from './Features';
import ChineseNovelQuotesRoute from './ChineseNovelQuotesRoute';
import FeaturePage from '../components/FeaturePage';
import { routeMetadata } from '../data/siteMetadata';
import { FEATURE_PAGES, featurePagePath } from '../data/featurePages';

// Feature landing pages render from data, so they never need a line here. Every
// other route names its element explicitly.
const FEATURE_ELEMENTS = Object.fromEntries(
  FEATURE_PAGES.map((page) => [featurePagePath(page), <FeaturePage page={page} />])
);

const ELEMENT_FOR_PATH = {
  ...FEATURE_ELEMENTS,
  '/': <Home />,
  '/about-us': <AboutUs />,
  '/contact-us': <ContactUs />,
  '/privacy-policy': <LegalPrivacy />,
  '/terms-and-conditions': <TermsAndConditions />,
  '/refund-policy': <RefundPolicy />,
  '/mobile-tally': <MobileTally />,
  '/whatsapp-invoice-tally': <WhatsAppInvoice />,
  '/auto-reconciliation-tally': <AutoReconciliation />,
  '/for-distributors': <ForDistributors />,
  '/tally-mobile-app-comparison': <TallyMobileComparison />,
  '/demo': <TryDemo />,
  '/features': <Features />,
  '/partners': <Partners />,
  '/become-a-partner': <Partners />,
  '/chinese_novel_quotes_wuxia': <ChineseNovelQuotesRoute />,
};

const children = routeMetadata.map(({ path }) => {
  const element = ELEMENT_FOR_PATH[path];
  if (!element) {
    throw new Error(`No route element registered for path "${path}" in src/routes/index.jsx`);
  }
  if (path === '/') return { index: true, element };
  return { path: path.replace(/^\//, ''), element };
});

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...children,
      // Lazy, and deliberately so. BlogIndex and BlogPost are the only things
      // that reach src/lib/blogPosts.js, whose eager import.meta.glob compiles
      // all 160 posts' rendered HTML into whatever chunk imports it. Imported
      // statically, that chunk was the main bundle, so someone landing on the
      // homepage downloaded every article on the site before the hero could
      // paint. Dynamic imports move the whole blog payload into its own chunk
      // that only /blog and /blog/:slug ever fetch.
      //
      // Both routes are still prerendered to static HTML: the check that this
      // holds is scripts/checkBlogPrerender.mjs, which fails the build if a
      // blog page ships an empty shell.
      { path: 'blog', lazy: async () => ({ Component: (await import('./BlogIndex')).default }) },
      {
        path: 'blog/:slug',
        lazy: async () => ({ Component: (await import('./BlogPost')).default }),
      },
    ],
  },
];
