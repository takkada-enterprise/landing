import { ArrowRight, Users, FileText, BarChart2, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import DemoTryCTA from '../components/DemoTryCTA';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/schema';
import { demoEntryLive } from '../data/siteContent';

// The shareable demo landing (plan 2026-07-06-001, U9): referrers forward
// takkada.com/demo/ on WhatsApp (the OG card below owns the unfurl), and the
// page sets expectations before buttoning into the app's anonymous demo
// entry. Copy explains what the visitor will see — a real distributor's
// books, shared sandbox, nightly reset — so the demo is never mistaken for
// their own data (R10 context).
const SEO = {
  title: 'Try Takkada on a Live Demo Company | No Signup',
  description:
    'Open a real distributor’s books in Takkada from your phone: parties, invoices, receivables, reports. No signup, no setup. Resets every night.',
  path: '/demo/',
};

const whatYouWillSee = [
  {
    icon: Users,
    title: 'A full book of parties',
    body: 'Retailers with real balances, overdues, and payment history — the receivables screen a distributor actually opens at 9 PM.',
  },
  {
    icon: FileText,
    title: 'A year of invoices',
    body: 'Sales invoices, receipts, and vouchers across a full financial year. Open any invoice, see the PDF, follow the money.',
  },
  {
    icon: BarChart2,
    title: 'Reports on real data',
    body: 'Outstanding by age, customer analytics, daybook, stock — every report populated the way it would be on your own books.',
  },
  {
    icon: ShieldCheck,
    title: 'A sandbox you cannot break',
    body: 'The demo is shared and resets to the same clean dataset every night. Create, edit, explore — nothing you do is permanent.',
  },
];

const steps = [
  {
    step: '01',
    title: 'Tap the button',
    body: 'The demo opens in your browser. No signup, no OTP, no app install.',
  },
  {
    step: '02',
    title: 'Look around',
    body: 'It works exactly like a set-up Takkada account: home, parties, invoices, reports.',
  },
  {
    step: '03',
    title: 'Picture your own books here',
    body: 'When you want this connected to your Tally, message us on WhatsApp from inside the demo or right here.',
  },
];

function TryDemo() {
  return (
    <>
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

      {/* ── Hero ── */}
      <section className="hero icp-hero" id="hero">
        <div className="container">
          <div className="hero-content icp-hero-content">
            <Breadcrumb
              trail={[
                { name: 'Home', url: 'https://takkada.com/' },
                { name: 'Live Demo', url: 'https://takkada.com/demo/' },
              ]}
            />
            <span className="section-label hero-overline">Live Demo</span>
            <h1 className="hero-title icp-hero-title">
              Open a real distributor&rsquo;s books.
            </h1>
            <p className="hero-subtitle icp-hero-subtitle">
              The demo company is a full year of a distributor&rsquo;s business running
              in Takkada: parties, invoices, receivables, reports. Walk through it
              from your phone{demoEntryLive ? ' — no signup, nothing to install' : ''}.
            </p>
            <div className="hero-ctas">
              <DemoTryCTA context="demo-page" />
              {demoEntryLive ? (
                <WhatsAppCTA context="demo" variant="secondary" />
              ) : (
                <CalendarCTA context="demo-page" />
              )}
            </div>
            <p className="hero-tertiary-line">
              Explore freely. The demo resets to a clean state every night.
            </p>
          </div>
        </div>
      </section>

      {/* ── What you'll see ── */}
      <section className="tally-section" id="what-you-will-see">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Inside the Demo</span>
            <h2 className="section-title">What you&rsquo;ll be looking at</h2>
          </div>
          <div className="tally-grid">
            {whatYouWillSee.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Three taps, then it&rsquo;s yours to explore</h2>
          </div>
          <div className="how-grid">
            {steps.map((step) => (
              <div key={step.title} className="how-card">
                <span className="how-step-num tabular-nums">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              See it working.
              <br />
              Then make it yours.
            </h2>
            <p>
              The demo shows the product. A conversation connects it to your own
              Tally and your own retailers.
            </p>
            <div className="final-cta-actions">
              {demoEntryLive ? (
                <DemoTryCTA context="demo-page-final" variant="dark" />
              ) : (
                <WhatsAppCTA context="demo" variant="dark" />
              )}
              <CalendarCTA context="demo-page" variant="link" className="final-cta-secondary-link">
                or book a <span className="tabular-nums">15-min</span> demo <ArrowRight size={16} />
              </CalendarCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TryDemo;
