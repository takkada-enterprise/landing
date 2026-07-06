import Layout from '../Layout';
import Home from './Home';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import PrivacyPolicy from './PrivacyPolicy';
import TermsAndConditions from './TermsAndConditions';
import RefundPolicy from './RefundPolicy';
import MobileTally from './MobileTally';
import TallyOnMobile from './TallyOnMobile';
import WhatsAppInvoice from './WhatsAppInvoice';
import AutoReconciliation from './AutoReconciliation';
import ForDistributors from './ForDistributors';
import TallyMobileComparison from './TallyMobileComparison';
import TryDemo from './TryDemo';
import Partners from './Partners';
import BlogIndex from './BlogIndex';
import BlogPost from './BlogPost';
import { routeMetadata } from '../data/siteMetadata';

const ELEMENT_FOR_PATH = {
  '/': <Home />,
  '/about-us': <AboutUs />,
  '/contact-us': <ContactUs />,
  '/privacy-policy': <PrivacyPolicy />,
  '/terms-and-conditions': <TermsAndConditions />,
  '/refund-policy': <RefundPolicy />,
  '/mobile-tally': <MobileTally />,
  '/tally-on-mobile': <TallyOnMobile />,
  '/whatsapp-invoice-tally': <WhatsAppInvoice />,
  '/auto-reconciliation-tally': <AutoReconciliation />,
  '/for-distributors': <ForDistributors />,
  '/tally-mobile-app-comparison': <TallyMobileComparison />,
  '/demo': <TryDemo />,
  '/partners': <Partners />,
  '/become-a-partner': <Partners />,
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
      { path: 'blog', element: <BlogIndex /> },
      { path: 'blog/:slug', element: <BlogPost /> },
    ],
  },
];
