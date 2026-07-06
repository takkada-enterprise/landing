import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import ComparisonSection from '../components/ComparisonSection';
import WhatsAppCTA from '../components/WhatsAppCTA';
import { softwareApplicationSchema, breadcrumbSchema } from '../data/schema';
import { appLinks } from '../data/siteContent';
import { track } from '../lib/track';

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

const relatedPosts = [
  {
    to: '/blog/biz-analyst-alternative/',
    label: 'Biz Analyst alternative',
    line: 'Where Biz Analyst stops at viewing and reminding, and what that means for collections.',
  },
  {
    to: '/blog/livekeeping-alternative-for-distributors/',
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

const decisionGuide = [
  {
    title: 'You only want to see your books from your phone',
    body:
      'All three apps in the matrix show your Tally data on mobile and send payment reminders. If viewing and reminding is genuinely all you need, any of them will do that job.',
  },
  {
    title: 'Your team raises invoices outside the office',
    body:
      'Takkada and Livekeeping both create vouchers from mobile, including e-invoice and e-way bill. Takkada adds role-based controls per salesman, so a field team sees only its own parties and stock.',
  },
  {
    title: 'Collections are the actual problem',
    body:
      'This is where the columns separate. Takkada puts a UPI payment link on every invoice, charges zero MDR on UPI, and posts the receipt entry into Tally by itself when the payment lands. The other two stop before collection.',
  },
];

function TallyMobileComparison() {
  return (
    <>
      <Seo
        title={SEO.title}
        description={SEO.description}
        path={SEO.path}
        schemas={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tally Mobile App Comparison', path: '/tally-mobile-app-comparison/' },
          ]),
        ]}
      />

      {/* ── Hero ── */}
      <section className="hero icp-hero" id="hero">
        <div className="container">
          <div className="hero-content icp-hero-content">
            <nav aria-label="Breadcrumb" className="icp-breadcrumb">
              <span>
                <a href="https://takkada.com/">Home</a>
              </span>
              <span>
                <span className="icp-breadcrumb-sep" aria-hidden="true">/</span>
                <span aria-current="page">Tally Mobile App Comparison</span>
              </span>
            </nav>
            <span className="section-label hero-overline">Comparison</span>
            <h1 className="hero-title icp-hero-title">
              Choosing a Tally mobile app: the feature-by-feature picture.
            </h1>
            <p className="hero-subtitle icp-hero-subtitle">
              Takkada, Biz Analyst, and Livekeeping all put your Tally on your phone.
              They stop at very different points after that. The matrix below shows
              exactly where, so you can match the app to what your business actually needs.
            </p>
            <div className="hero-ctas">
              <WhatsAppCTA context="comparison" />
              <a
                href={appLinks.bookDemo}
                className="cta-btn cta-btn--secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: 'comparison' })}
              >
                Book a 15-min demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The matrix (same data source as home) ── */}
      <ComparisonSection />

      {/* ── How to choose ── */}
      <section className="tally-section" id="how-to-choose">
        <div className="container">
          <div className="section-header">
            <span className="section-label">How to Choose</span>
            <h2 className="section-title">Match the app to your actual problem</h2>
          </div>
          <div className="tally-grid comparison-guide-grid">
            {decisionGuide.map((item) => (
              <div key={item.title} className="tally-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Head-to-head deep dives ── */}
      <section className="grid-section" id="head-to-head">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Head-to-Head Reads</span>
            <h2 className="section-title">Comparing against one app in particular</h2>
          </div>
          <div className="feature-grid-wrap home-audience-grid">
            {relatedPosts.map((post) => (
              <Link key={post.to} to={post.to} className="grid-card home-audience-card">
                <div>
                  <h3 className="grid-card-title">{post.label}</h3>
                  <p className="grid-card-desc">{post.line}</p>
                </div>
                <ArrowRight size={18} className="home-audience-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              See the difference
              <br />
              on your own books.
            </h2>
            <p>
              A 15-minute walkthrough with your Tally version and your receivables,
              so the comparison stops being theoretical.
            </p>
            <div className="final-cta-actions">
              <WhatsAppCTA context="comparison" variant="dark" />
              <a
                href={appLinks.bookDemo}
                className="final-cta-secondary-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: 'comparison' })}
              >
                or book a 15-min demo <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TallyMobileComparison;
