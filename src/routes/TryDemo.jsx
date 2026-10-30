import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import DemoTryCTA from '../components/DemoTryCTA';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import VideoEmbed from '../components/VideoEmbed';
import { Band, Pill, SectionHead, Card, CardGrid, CloseBand } from '../ui';
// The feature-page skin carries the hero this page shares with it (every
// rule is prefixed .ui-feature).
import '../ui/feature.css';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/schema';
import { appLinks, demoEntryLive, demoVideo } from '../data/siteContent';

// The shareable demo landing (plan 2026-07-06-001, U9): referrers forward
// takkada.com/demo/ on WhatsApp (the OG card below owns the unfurl), and the
// page sets expectations before buttoning into the app's anonymous demo
// entry. Copy explains what the visitor will see — a real distributor's
// books, shared sandbox, nightly reset — so the demo is never mistaken for
// their own data (R10 context).
//
// Campfire template since plan 2026-10-30-003 (Task 6): the primary pill is
// DemoTryCTA under the demoEntryLive gate, the store apps sit beside it, the
// demo video is one card. No link into the web app: the number is captured
// first (try-demo.test.jsx). Motion: none of its own.
const SEO = {
  title: 'Try Takkada on a Live Demo Company',
  description:
    'Open a real distributor’s books in Takkada from your phone: parties, invoices, receivables, reports. Enter your number, get a code, look around. Resets nightly.',
  path: '/demo/',
};

const whatYouWillSee = [
  {
    title: 'A full book of parties',
    body: 'Retailers with real balances, overdues, and payment history: the receivables screen a distributor actually opens at 9 PM.',
  },
  {
    title: 'A year of invoices',
    body: 'Sales invoices, receipts, and vouchers across a full financial year. Open any invoice, see the PDF, follow the money.',
  },
  {
    title: 'Reports on real data',
    body: 'Outstanding by age, customer analytics, daybook and stock, every report populated the way it would be on your own books.',
  },
  {
    title: 'A sandbox you cannot break',
    body: 'The demo is shared and resets to the same clean dataset every night. Create, edit, explore, nothing you do is permanent. Owner-only screens like team management and salesman tracking sit outside it.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Enter your number',
    body: 'We text you a 6-digit code. Nothing to install, no password to pick.',
  },
  {
    step: '02',
    title: 'Look around',
    body: 'It works exactly like a set-up Takkada account: home, parties, invoices, reports. Everyone lands in the same sample company, so treat it as a showroom rather than your own books.',
  },
  {
    step: '03',
    title: 'Picture your own books here',
    body: 'When you want this connected to your Tally, message us on WhatsApp from inside the demo or right here.',
  },
];

const STORE_LINK = { target: '_blank', rel: 'noopener noreferrer' };

function TryDemo() {
  return (
    <div className="ui-feature">
      <Seo
        title={SEO.title}
        description={SEO.description}
        path={SEO.path}
        ogImage="/assets/og/takkada-og-demo.png"
        schemas={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Live Demo', path: '/demo/' },
          ]),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb
              trail={[
                { name: 'Home', url: 'https://takkada.com/' },
                { name: 'Live Demo', url: 'https://takkada.com/demo/' },
              ]}
            />
            <h1 className="ui-hero-title">Open a real distributor&rsquo;s books.</h1>
            <p className="ui-hero-lead">
              The demo company is a full year of a distributor&rsquo;s business running
              in Takkada: parties, invoices, receivables, reports. Walk through it
              from your phone{demoEntryLive ? '. Enter your number, we text you a code, and it opens' : ''}.
              Explore freely. The demo resets to a clean state every night.
            </p>
            <div className="ui-hero-actions">
              <DemoTryCTA context="demo-page" />
              <Pill href={appLinks.playStore} tone="ghost" {...STORE_LINK}>Get it on Google Play</Pill>
              <Pill href={appLinks.appStore} tone="ghost" {...STORE_LINK}>Download on the App Store</Pill>
            </div>
          </div>
        </div>
      </Band>

      <Band id="what-you-will-see">
        <SectionHead title="What you&rsquo;ll be looking at" />
        <CardGrid>
          {whatYouWillSee.map((item) => <Card key={item.title} title={item.title} line={item.body} />)}
        </CardGrid>
      </Band>

      <Band tone="white" id="how-it-works">
        <SectionHead title="Three taps, then it&rsquo;s yours to explore" />
        <CardGrid>
          {steps.map((step) => <Card key={step.title} title={step.title} line={step.body} />)}
        </CardGrid>
      </Band>

      <Band id="video">
        <Card title={demoVideo.title}>
          <VideoEmbed />
        </Card>
      </Band>

      {/* The second action follows the same gate the hero used to carry: once
          the demo is live, WhatsApp; before that, the booking link. */}
      <CloseBand id="close" title="See it working, then make it yours.">
        <div className="ui-close-actions">
          {demoEntryLive ? (
            <>
              <DemoTryCTA context="demo-page-final" />
              <WhatsAppCTA context="demo" tone="ghost" />
            </>
          ) : (
            <>
              <WhatsAppCTA context="demo" tone="accent" />
              <CalendarCTA context="demo-page" />
            </>
          )}
        </div>
      </CloseBand>
    </div>
  );
}

export default TryDemo;
