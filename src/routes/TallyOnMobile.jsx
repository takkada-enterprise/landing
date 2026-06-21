import Home from './Home';

// Exact-match landing for the "tally on mobile" head term. The SERP for this
// query rewards a vendor landing page on a dedicated, keyword-matched URL
// (counts.ac/tally-on-mobile, tallyglobe.com/tally-on-mobile), not a homepage
// pointed at the term. This route renders the full home page body under its own
// canonical so the content stays identical to / forever, while the title,
// description and canonical target the keyword directly.
const TALLY_ON_MOBILE_SEO = {
  title: 'Tally on Mobile App for Distributors | Takkada',
  description:
    'Run Tally on mobile: invoice, send on WhatsApp, collect via UPI and auto-reconcile back into Tally from your phone. Built for Indian distributors.',
  path: '/tally-on-mobile',
};

function TallyOnMobile() {
  return <Home seo={TALLY_ON_MOBILE_SEO} />;
}

export default TallyOnMobile;
