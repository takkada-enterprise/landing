import Seo from '../components/Seo';
import ComparisonSection from '../components/ComparisonSection';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import Breadcrumb from '../components/Breadcrumb';
import { Band, SectionHead, Card, CardGrid, CloseBand } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/schema';

// Standalone landing for comparison-shopper intent ("best Tally mobile app",
// listicle referrals). Renders the same comparisonSection matrix as home —
// one data source, no fork. Framing stays pricing-agnostic and fair per
// docs/seo/competitor-pages-audit-2026-06-21.md; the per-competitor
// "alternative" posts below own the head-to-head intent, so this page
// cross-links them instead of duplicating them.
const SEO = {
  title: 'Best Tally Mobile App Comparison (2026) | Takkada',
  description:
    'Takkada vs Biz Analyst vs Livekeeping, feature by feature: mobile invoicing, e-invoice, zero-MDR UPI collection, auto-reconciliation into Tally.',
  path: '/tally-mobile-app-comparison/',
};

// The first two are landing pages, not posts. Both blog articles that used to
// sit here were retired on 2026-08-08 and 301'd to these URLs, because two
// pages answering "biz analyst alternative" split the query between them.
// Leaving the old hrefs would have pointed this page at a redirect at best and
// a 404 at worst, and no test on the corpus would have noticed: the internal
// link guard reads content/blog, and these links live in a component.
const relatedPosts = [
  {
    to: '/biz-analyst-alternative/',
    label: 'Biz Analyst alternative',
    line: 'Both apps now create vouchers and GST documents. The split is collection, cancellation and how each one bills you.',
  },
  {
    to: '/livekeeping-alternative/',
    label: 'Livekeeping alternative',
    line: 'What changes when payment collection lives inside the same app as your Tally data.',
  },
  {
    to: '/blog/credflow-alternative-tally-native/',
    label: 'CredFlow alternative',
    line: 'A Tally-native take on collections, compared with a standalone collections tool.',
  },
  {
    to: '/blog/mybillbook-alternative-for-distributors/',
    label: 'myBillBook alternative',
    line: 'Why a distributor already on Tally rarely needs a second billing system.',
  },
  {
    to: '/blog/billbook-alternative-for-distributors/',
    label: 'Bill book app alternative',
    line: 'Moving from a bill book app to invoicing that posts straight into Tally.',
  },
];

// Refreshed 2026-08-08 against pitch-deck/competitor-analysis-2026-08.md. The
// middle card used to say only Takkada and Livekeeping create GST documents
// from mobile. Biz Analyst does too, founder-confirmed, so all three now do
// and the honest dividing line has moved one step later in the workflow.
const decisionGuide = [
  {
    title: 'You only want to see your books from your phone',
    body:
      'All three apps in the matrix show your Tally data on mobile and send payment reminders. If viewing and reminding is genuinely all you need, any of them will do that job, and the one with a support person in your town is a fair way to choose.',
  },
  {
    title: 'Your team raises invoices outside the office',
    body:
      'All three create vouchers from mobile now, and all three generate an e-invoice and an e-way bill. Takkada goes 13 voucher types deep, including credit and debit notes, and sets access per salesman down to the warehouse his stock movements may touch.',
  },
  {
    title: 'Something goes wrong after the document is raised',
    body:
      'The order is cancelled, the truck does not leave, the IRN has to go back. Takkada cancels the e-invoice or the e-way bill from the phone with the portal reason codes and writes the status against the same voucher. Neither of the other two offers cancellation today.',
  },
  {
    title: 'Collections are the actual problem',
    body:
      'This is where the columns separate hardest. Takkada puts a UPI payment link on every invoice, charges zero MDR on UPI collections with no transaction cap and no monthly fee, and posts the receipt entry into Tally by itself when the payment lands. The other two stop before collection.',
  },
];

// The front-loaded answer block, the same pattern the feature pages use. Around
// 44% of AI-search citations come from the first 30% of a page, and this page
// answers a question ("which Tally mobile app") that gets asked of an assistant
// far more often than it gets typed into a search box.
const ANSWER =
  'Takkada, Biz Analyst and Livekeeping all show Tally on a phone, create vouchers and generate an e-invoice or e-way bill. They separate after that. Only Takkada cancels a GST document from the phone, collects on UPI at zero MDR, and posts the receipt back into Tally on its own.';

// On the Campfire pattern (plan 2026-10-30-003, Task 7). The matrix stays
// directly under the answer, where it was: the hero says "the matrix below"
// and the decision guide opens "All three apps in the matrix". Motion: none.
const TRAIL = [
  { name: 'Home', url: 'https://takkada.com/' },
  { name: 'Tally Mobile App Comparison', url: 'https://takkada.com/tally-mobile-app-comparison/' },
];

function TallyMobileComparison() {
  return (
    <div className="ui-feature ui-icp">
      <Seo
        title={SEO.title}
        description={SEO.description}
        path={SEO.path}
        ogImage="/assets/og/takkada-og-comparison.png"
        schemas={[
          softwareApplicationSchema(),
          breadcrumbSchema(TRAIL.map((e) => ({ name: e.name, path: e.url.replace('https://takkada.com', '') }))),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb trail={TRAIL} />
            <h1 className="ui-hero-title">Choosing a Tally mobile app: the feature-by-feature picture.</h1>
            <p className="ui-hero-lead">
              Three apps put your Tally on your phone. They stop at very different
              points after that. The matrix below shows exactly where, so you can
              match the app to what your business actually needs.
            </p>
            <div className="ui-hero-actions">
              <WhatsAppCTA context="comparison" tone="accent" />
              <CalendarCTA context="comparison" />
            </div>
          </div>
        </div>
      </Band>

      <Band id="answer">
        <p className="ui-answer">{ANSWER}</p>
      </Band>

      {/* The matrix (same data source as home). */}
      <Band tone="white" id="comparison">
        <ComparisonSection />
      </Band>

      <Band id="how-to-choose">
        <SectionHead title="Match the app to your actual problem" />
        <CardGrid cols={2}>
          {decisionGuide.map((item) => <Card key={item.title} title={item.title} line={item.body} />)}
        </CardGrid>
      </Band>

      <Band tone="white" id="head-to-head">
        <SectionHead title="Comparing against one app in particular" />
        <CardGrid cols={3}>
          {relatedPosts.map((post) => <Card key={post.to} to={post.to} title={post.label} line={post.line} />)}
        </CardGrid>
      </Band>

      <CloseBand id="final-cta" title="See the difference on your own books.">
        <p className="ui-close-lead">
          A <span className="tabular-nums">15-minute</span> walkthrough with your Tally version and your receivables,
          so the comparison stops being theoretical.
        </p>
        <div className="ui-close-actions">
          <WhatsAppCTA context="comparison" tone="accent" />
          <CalendarCTA context="comparison" />
        </div>
      </CloseBand>
    </div>
  );
}

export default TallyMobileComparison;
