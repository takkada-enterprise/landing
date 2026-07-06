import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  MessageCircle,
  IndianRupee,
  CheckCircle2,
  RefreshCw,
  Zap,
  Check,
  Shield,
  FileCheck,
  Building,
  Bell,
  Link as LinkIcon,
  Share2,
  Download,
  Truck,
  Users,
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import WhatsAppCTA from '../components/WhatsAppCTA';
import TestimonialCard from '../components/TestimonialCard';
import { track } from '../lib/track';
import FAQItem from '../components/FAQItem';
import Seo from '../components/Seo';
import ComparisonSection from '../components/ComparisonSection';
import { useScrollReveal } from '../hooks/useScrollFx';
import { softwareApplicationSchema, faqPageSchema } from '../data/schema';
import {
  appLinks,
  pricing,
  tallyFeatures,
  heroStats,
  painPoints,
  featureGrid,
  howItWorks,
  testimonials,
  coreFeatures,
  advancedFeatures,
} from '../data/siteContent';

const tallyIconMap = {
  refresh: RefreshCw,
  zap: Zap,
  check: Check,
  shield: Shield,
};

// Features added in the 2026-06-18 app refresh — surfaced with a "New" tag.
const NEW_FEATURE_IDS = new Set(['pdf-import', 'reports']);

const gridIconMap = {
  fileText: FileText,
  refresh: RefreshCw,
  fileCheck: FileCheck,
  check: Check,
  building: Building,
  bell: Bell,
  link: LinkIcon,
  share: Share2,
};

const capabilities = [
  {
    icon: FileText,
    title: 'Mobile invoicing, including e-invoice and e-way bill',
    body:
      'Create vouchers, issue invoices, generate e-invoices and e-way bills from your phone. Useful when the laptop is off, when your salesman is in the field, or when you are travelling.',
  },
  {
    icon: MessageCircle,
    title: 'Every invoice reaches the customer on WhatsApp, automatically',
    body:
      'The moment an invoice is created in Tally, the customer receives the PDF plus a payment link on WhatsApp. You do not type, copy, or attach anything.',
  },
  {
    icon: IndianRupee,
    title: 'Collect on UPI with zero charges',
    body:
      'UPI is fully pass-through. Card and netbanking MDR is borne by you. Customers pay the link, the money lands in your bank.',
  },
  {
    icon: CheckCircle2,
    title: 'Payments auto-match to invoices in Tally',
    body:
      'When payment lands, Takkada matches it against the invoice and posts the accounting entry in Tally. Your end-of-day reconciliation ritual disappears.',
  },
];

// Floating feature pills that halo the hero phone, in the style of the existing
// "Import from PDF" chip. Decorative (aria-hidden); positions live in styles.css
// as .hero-pill--N. Order matters: it maps to the position rules.
const heroPills = [
  { icon: FileText, label: 'Import from PDF' },
  { icon: IndianRupee, label: 'UPI Collection' },
  { icon: LinkIcon, label: 'Payment Link' },
  { icon: FileCheck, label: 'E-Invoicing' },
  { icon: Truck, label: 'E-Way Bill' },
  { icon: MessageCircle, label: 'WhatsApp Reminder' },
  { icon: Users, label: 'Field Staff' },
];

const audiences = [
  {
    to: '/mobile-tally',
    label: 'Owners who want visibility',
    line: 'See overdue receivables from your phone. Send reminders. That is it.',
  },
  {
    to: '/for-distributors',
    label: 'Collections-heavy distributors',
    line: 'Big receivable book. E-invoice, e-way bill, UPI links, auto-recon — all in one place.',
  },
  {
    to: '/whatsapp-invoice-tally',
    label: 'Field sales teams',
    line: 'Salesmen raise invoices from the market. Invoice reaches the customer before they leave the shop.',
  },
  {
    to: '/auto-reconciliation-tally',
    label: 'Distributors tired of manual reconciliation',
    line: 'Stop matching bank statements to Tally by hand every evening.',
  },
];

const homeFaqItems = [
  {
    question: 'Do I need to replace Tally?',
    answer:
      'No. Takkada sits on top of your existing Tally installation. Your data stays in Tally. Nothing migrates, nothing moves.',
  },
  {
    question: 'Will my current invoice format and numbering stay the same?',
    answer:
      'Yes. Takkada reads and writes to your Tally. The invoice format you have been using, the numbering series, the GST configuration — all of it stays exactly as it is today.',
  },
  {
    question: 'What happens when my laptop is off and my salesman needs to raise an invoice?',
    answer:
      'The salesman raises the invoice from his phone. When your laptop next opens Tally, the voucher syncs in. The field team never waits.',
  },
  {
    question: 'How much does UPI cost?',
    answer:
      'Zero. UPI is pass-through. For card and netbanking we charge the standard MDR that the payment gateway charges us. No markup from Takkada.',
  },
  {
    question: 'Can I try it before I pay?',
    answer:
      'Yes. Every plan comes with a 7-day free trial, no card required. If you are being onboarded by one of our partners, they will walk you through the setup.',
  },
  {
    question: 'Is there a plan for a business with only one user?',
    answer:
      'Yes. Every plan includes one user. Extra users are ₹3,000 per year each. Extra devices on the same user are ₹1,500 to ₹3,000 per year depending on plan.',
  },
];

// SEO defaults for the home route. Exposed as props so a sibling route can
// reuse this exact page body under a different canonical URL (e.g. the
// exact-match /tally-on-mobile landing) without forking the markup. One body,
// many entry points, no drift.
const HOME_SEO = {
  title: 'Takkada | Mobile Tally App for Indian Distributors',
  description:
    'Invoice from your phone, send on WhatsApp, collect via UPI, auto-reconcile into Tally. Built for Indian distributors. ₹4,500 to ₹8,499/year.',
  path: '/',
};

function Home({ seo = HOME_SEO }) {
  const [faqIndex, setFaqIndex] = useState(-1);
  useScrollReveal();

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[softwareApplicationSchema(), faqPageSchema(homeFaqItems)]}
      />

      {/* ── Hero ── */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <span className="section-label hero-overline">For Indian distributors on Tally</span>
            <h1 className="hero-title">
              Mobile-first Tally app for distributors.
              <br />
              <span className="hero-title-accent">Get paid without chasing.</span>
            </h1>
            <p className="hero-subtitle">
              Invoice from your phone, send on WhatsApp, collect via UPI, auto-reconcile in Tally. Built for Indian distributors and wholesalers.
            </p>
            <div className="hero-ctas">
              <WhatsAppCTA context="home-hero" />
              <CTAButton
                variant="secondary"
                href={appLinks.bookDemo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: 'home-hero' })}
              >
                Book a 15-min demo
              </CTAButton>
            </div>
            <div className="hero-stats">
              {heroStats.map((s) => (
                <div key={s.label} className="hero-stat">
                  <span className="hero-stat-value tabular-nums">{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-phone-frame">
              <img src="/assets/screenshots/home-screen.png" alt="Takkada home screen showing receivables dashboard" />
            </div>
            <div className="hero-pills" aria-hidden="true">
              {heroPills.map((p, i) => {
                const Icon = p.icon;
                return (
                  <span key={p.label} className={`hero-pill hero-pill--${i + 1}`}>
                    <span className="hero-pill-icon"><Icon size={15} /></span>
                    <span className="hero-pill-label">{p.label}</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem: the evenings and 9 PM ritual ── */}
      <section className="problem-section" id="problem">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The 9 PM ritual you know too well</span>
            <h2 className="section-title">Cash sits in receivables. Evenings go to reconciliation.</h2>
            <p className="section-subtitle">Every distributor running Tally has lived some version of this. Takkada moves each of these off your plate.</p>
          </div>
          <div className="pain-grid">
            {painPoints.map((p) => (
              <div key={p.stat} className="pain-card">
                <span className="pain-stat tabular-nums">{p.stat}</span>
                <p className="pain-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intro: three phones + bento headline ── */}
      <section className="intro-section" id="product">
        <div className="container">
          <div className="intro-content">
            <span className="section-label">Built on Tally. Controlled from your phone.</span>
            <h2 className="intro-headline">
              The laptop in your shop stays where it is.<br />
              The business moves to <span className="text-accent">your pocket</span>.
            </h2>
          </div>
          <div className="intro-screenshots">
            <div className="intro-phone">
              <img src="/assets/screenshots/settlement.png" alt="Takkada payment settlement screen" />
            </div>
            <div className="intro-phone intro-phone-center">
              <img src="/assets/screenshots/home-screen.png" alt="Takkada receivables dashboard" />
            </div>
            <div className="intro-phone">
              <img src="/assets/screenshots/payment-reminders.png" alt="Takkada WhatsApp payment reminders" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics bar (honest scale) ── */}
      <section className="metrics-bar">
        <div className="container">
          <div className="metrics-grid">
            <div className="metric">
              <span className="metric-value tabular-nums">₹17+ Crore</span>
              <span className="metric-label">Collected Monthly</span>
            </div>
            <div className="metric-divider" />
            <div className="metric">
              <span className="metric-value tabular-nums">100+</span>
              <span className="metric-label">Businesses Trust Takkada</span>
            </div>
            <div className="metric-divider" />
            <div className="metric">
              <span className="metric-value">Thousands</span>
              <span className="metric-label">Of Reminders Sent Monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── What Takkada does: 4 capabilities (2×2) ── */}
      <section className="tally-section" id="what-takkada-does">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">What Takkada Does</span>
            <h2 className="section-title">
              Everything that happens after the sale, handled from your phone
            </h2>
          </div>
          <div className="tally-grid home-capabilities-grid">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Core features: full rows with phone mockups (PDF leads) ── */}
      <div id="features" />
      {coreFeatures.map((feature, index) => (
        <section
          key={feature.title}
          className={`feature-section ${index % 2 === 1 ? 'feature-section--reversed' : ''}${feature.id === 'pdf-import' ? ' feature-section--headline' : ''}`}
          id={feature.id}
        >
          <div className="container">
            <div className="feature-layout">
              <div className="feature-copy reveal">
                <span className="section-label">{feature.label}</span>
                <h2 className="section-title">
                  {feature.title}
                  {NEW_FEATURE_IDS.has(feature.id) && <span className="feature-new-tag">New</span>}
                </h2>
                <p className="feature-description">{feature.description}</p>
                <WhatsAppCTA
                  context="features"
                  variant="outline"
                  message={`Hi, I want to see how "${feature.title}" works in Takkada.`}
                >
                  See it in action <ArrowRight size={16} />
                </WhatsAppCTA>
              </div>
              <div className="feature-visuals reveal">
                <div className="feature-phone">
                  <img src={feature.screenshot} alt={feature.title} />
                </div>
                {feature.secondaryScreenshot && (
                  <div className="feature-phone feature-phone-back">
                    <img src={feature.secondaryScreenshot} alt={`${feature.title} detail`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Feature grid: eight-tile glance ── */}
      <section className="grid-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Feature Sheet</span>
            <h2 className="section-title">Every capability you will actually use</h2>
          </div>
          <div className="feature-grid-wrap">
            {featureGrid.map((f) => {
              const Icon = gridIconMap[f.icon] || Check;
              return (
                <div key={f.title} className="grid-card">
                  <div className="grid-card-icon">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="grid-card-title">{f.title}</h3>
                    <p className="grid-card-desc">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Advanced features: E-Way Bill / E-Invoicing, RBAC ── */}
      {advancedFeatures.map((feature, index) => (
        <section
          key={feature.title}
          className={`feature-section ${index % 2 === 0 ? 'feature-section--reversed' : ''}`}
          id={feature.id}
        >
          <div className="container">
            <div className="feature-layout">
              <div className="feature-copy reveal">
                <span className="section-label">Advanced</span>
                <h2 className="section-title">{feature.title}</h2>
                <p className="feature-description">{feature.description}</p>
              </div>
              <div className="feature-visuals reveal">
                <div className={`feature-phone ${feature.secondaryScreenshot ? '' : 'feature-phone-single'}`}>
                  <img src={feature.screenshot} alt={feature.title} />
                </div>
                {feature.secondaryScreenshot && (
                  <div className="feature-phone feature-phone-back">
                    <img src={feature.secondaryScreenshot} alt={`${feature.title} detail`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Competitor comparison ── */}
      <ComparisonSection />

      {/* ── Tally connector flow + four trust cards ── */}
      <section className="tally-section" id="tally">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">The Tally Connector</span>
            <h2 className="section-title">Your Tally. Now on your phone.</h2>
            <p className="section-subtitle">
              A lightweight Windows connector sits next to your Tally. Every invoice, every payment, every entry syncs both ways in real time.
            </p>
          </div>

          <div className="tally-visual">
            <div className="tally-flow">
              <div className="tally-node">
                <div className="tally-node-icon">
                  <img src="/assets/screenshots/takkada-logo.png" alt="Takkada app" className="tally-node-img" />
                </div>
                <span className="tally-node-label">Takkada</span>
              </div>
              <div className="tally-arrows">
                <div className="tally-arrow">
                  <RefreshCw size={24} />
                  <span>Real-time sync</span>
                </div>
              </div>
              <div className="tally-node">
                <div className="tally-node-icon tally-node-tally">
                  <img src="/assets/screenshots/tally-erp-logo.png?v=2" alt="Tally Prime" className="tally-node-img" />
                </div>
                <span className="tally-node-label">Tally Prime</span>
              </div>
            </div>
          </div>

          <div className="tally-grid">
            {tallyFeatures.map((f) => {
              const Icon = tallyIconMap[f.icon] || Zap;
              return (
                <div key={f.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={24} />
                  </div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              );
            })}
          </div>

          <div className="tally-download">
            <p className="tally-download-label">Windows PC required. Works with Tally Prime and Tally ERP 9.</p>
            <a href={appLinks.tallyConnector} className="cta-btn cta-btn--outline tally-download-btn" download>
              <Download size={16} /> Download Tally Connector
            </a>
          </div>
        </div>
      </section>

      {/* ── How it works: 3 step cards ── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Getting Started</span>
            <h2 className="section-title">Up and running in days, not months</h2>
          </div>
          <div className="how-grid">
            {howItWorks.map((step) => (
              <div key={step.title} className="how-card">
                <span className="how-step-num tabular-nums">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who it is for ── */}
      <section className="grid-section" id="who-it-is-for">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Who It Is For</span>
            <h2 className="section-title">Pick the setup that matches how you work</h2>
          </div>
          <div className="feature-grid-wrap home-audience-grid">
            {audiences.map((a) => (
              <Link key={a.to} to={a.to} className="grid-card home-audience-card">
                <div>
                  <h3 className="grid-card-title">{a.label}</h3>
                  <p className="grid-card-desc">{a.line}</p>
                </div>
                <ArrowRight size={18} className="home-audience-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Pricing</span>
            <h2 className="section-title tabular-nums">₹4,500 to ₹8,499 per year. GST extra.</h2>
            <p className="section-subtitle">7-day free trial on every plan. No card required.</p>
          </div>
          <div className="home-pricing-strip">
            {pricing.plans.map((plan) => (
              <div
                key={plan.plan}
                className={`home-pricing-strip-card${plan.highlighted ? ' home-pricing-strip-card--highlighted' : ''}`}
              >
                {plan.badge && (
                  <span className="home-pricing-badge">{plan.badge}</span>
                )}
                <span className="home-pricing-strip-name">{plan.plan}</span>
                <span className="home-pricing-strip-price tabular-nums">{plan.price}</span>
                <span className="home-pricing-strip-period tabular-nums">{plan.period}</span>
                {plan.description && (
                  <p className="home-pricing-strip-desc">{plan.description}</p>
                )}
                <ul className="home-pricing-feature-list">
                  {plan.features.map((f) => (
                    <li key={f} className={`home-pricing-feature-item${f.startsWith('Everything') ? ' home-pricing-feature-item--inherit' : ''}`}>
                      {!f.startsWith('Everything') && (
                        <Check size={13} className="home-pricing-feature-check" />
                      )}
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="home-pricing-addons">
            <p className="home-pricing-addons-title">Add-ons</p>
            <div className="home-pricing-addons-row">
              {pricing.addons.map((addon) => (
                <div key={addon.label} className="home-pricing-addon-item">
                  <span className="home-pricing-addon-label">{addon.label}</span>
                  <span className="home-pricing-addon-price tabular-nums">{addon.price}</span>
                  {addon.note && <span className="home-pricing-addon-note">{addon.note}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="home-pricing-strip-cta">
            <WhatsAppCTA context="pricing">Ask about pricing on WhatsApp</WhatsAppCTA>
            <a
              href={appLinks.bookDemo}
              className="home-pricing-strip-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('calendar_open', { cta_context: 'pricing' })}
            >
              or get full pricing in a 15-min demo <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="testimonials-section" id="testimonial">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">From a Takkada Customer</span>
            <h2 className="section-title">What our customers say</h2>
          </div>
          <div className="testimonial-row">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">Questions</span>
            <h2 className="section-title">What distributors ask before signing up</h2>
          </div>
          <div className="faq-list">
            {homeFaqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={faqIndex === i}
                onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)}
                delay={i * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              Stop chasing.
              <br />
              Start collecting.
            </h2>
            <p>
              Talk to us for 15 minutes. Leave with a clear picture of whether Takkada fits your business.
            </p>
            <div className="final-cta-actions">
              <WhatsAppCTA context="final-cta" variant="dark" />
              <a
                href={appLinks.bookDemo}
                className="final-cta-secondary-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: 'final-cta' })}
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

export default Home;
