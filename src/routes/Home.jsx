import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Building,
  Camera,
  Check,
  ClipboardList,
  Clock,
  Download,
  FileCheck,
  FileText,
  IndianRupee,
  MessageCircle,
  MonitorCheck,
  RefreshCw,
  Share2,
  Shield,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Database,
  Truck,
} from 'lucide-react';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CountUp from '../components/CountUp';
import CalendarCTA from '../components/CalendarCTA';
import DemoTryCTA from '../components/DemoTryCTA';
import TestimonialCard from '../components/TestimonialCard';
import FAQItem from '../components/FAQItem';
import Seo from '../components/Seo';
import { useScrollReveal } from '../hooks/useScrollFx';
import { softwareApplicationSchema, faqPageSchema } from '../data/schema';
import {
  appLinks,
  pricing,
  planPricing,
  formatInr,
  heroContent,
  storyOrderToCash,
  storyTeamSales,
  aiImport,
  featureGridV3,
  tallyTrust,
  homeFaqItems,
  testimonials,
  trustSection,
  demoEntryLive,
} from '../data/siteContent';

const gridIconMap = {
  fileText: FileText,
  fileCheck: FileCheck,
  bell: Bell,
  shield: Shield,
  clock: Clock,
  truck: Truck,
  building: Building,
  chart: BarChart3,
  share: Share2,
};

const aiIconMap = {
  camera: Camera,
  clipboard: ClipboardList,
  building: Building,
};

const tallyIconMap = {
  refresh: RefreshCw,
  shield: Shield,
  monitor: MonitorCheck,
};

const trustIconMap = {
  database: Database,
  shield: ShieldCheck,
  badge: BadgeCheck,
  monitor: MonitorCheck,
};

// SEO defaults for the home route. Exposed as props so a sibling route can
// reuse this exact page body under a different canonical URL (e.g. the
// exact-match /tally-on-mobile landing) without forking the markup. One body,
// many entry points, no drift.
const HOME_SEO = {
  title: 'Takkada | Mobile Tally App for Indian Distributors',
  description:
    'Invoice from your phone, send on WhatsApp, collect via UPI, auto-reconcile into Tally. Built for Indian distributors. ₹2,900 to ₹8,500/year.',
  path: '/',
};

// One story section = header + numbered step rail + a WhatsApp CTA.
// A step renders its phone only when a screenshot exists, so a story keeps
// working while a capture is pending (story 2 step 3 is text-only today).
function StorySection({ story, alt = false, ctaContext }) {
  return (
    <section className={`hv3-story${alt ? ' hv3-story--alt' : ''}`} id={story.id}>
      <div className="container">
        <div className="hv3-story-head reveal">
          <span className="section-label">{story.overline}</span>
          <h2 className="hv3-story-title">{story.heading}</h2>
          <p className="hv3-story-intro">{story.intro}</p>
        </div>
        {/* Column count follows the data so a future 3- or 5-step story
            keeps its connector geometry. */}
        <div className="hv3-rail" style={{ '--hv3-steps': story.steps.length }}>
          {story.steps.map((step, i) => (
            <div key={step.title} className="hv3-step reveal">
              <span className="hv3-step-num tabular-nums" aria-hidden="true">{i + 1}</span>
              <div className="hv3-step-content">
                {step.screenshot && (
                  <div className="hv3-step-phone">
                    <img src={step.screenshot} alt={step.screenshotAlt || ''} loading="lazy" decoding="async" />
                  </div>
                )}
                <h3 className="hv3-step-title">{step.title}</h3>
                <p className="hv3-step-body">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
        {/* WhatsAppCTA renders nothing under the site-wide kill switch
            (empty whatsappNumber), so the calendar link keeps the story
            from ending in a dead end (§11.6). */}
        <div className="hv3-story-foot reveal">
          <WhatsAppCTA context={ctaContext} variant={alt ? 'primary' : 'outline'}>
            {story.ctaLine}
          </WhatsAppCTA>
          <CalendarCTA context={ctaContext} variant="link" />
        </div>
        {story.footnote && <p className="hv3-story-footnote reveal">{story.footnote}</p>}
      </div>
    </section>
  );
}

// The signature centerpiece (2026-08-04): the order-to-cash tour. The whole
// journey fits one screen: a numbered station list on the left, one phone on
// the right that crossfades between screens. Auto-advances every few seconds
// so the full journey shows itself; a click takes over and stops the tour
// (motion reasons in home.css header). On phones the device sticks to the
// top while the list scrolls under it.
function RoadSection({ story, ctaContext }) {
  const [active, setActive] = useState(0);
  const [userDrove, setUserDrove] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (userDrove || paused) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;
    const timer = setInterval(
      () => setActive((current) => (current + 1) % story.stations.length),
      4500
    );
    return () => clearInterval(timer);
  }, [userDrove, paused, story.stations.length]);

  return (
    <section className="hv3-story hv3-story--road" id={story.id}>
      <div className="container">
        <div className="hv3-story-head reveal">
          <span className="section-label">{story.overline}</span>
          <h2 className="hv3-story-title">{story.heading}</h2>
          <p className="hv3-story-intro">{story.intro}</p>
        </div>
        <div
          className="hv3-tour reveal"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="hv3-tour-phone">
            {story.stations.map((station, i) => (
              <img
                key={station.title}
                src={station.screenshot}
                alt={station.screenshotAlt}
                className={i === active ? 'is-active' : undefined}
                aria-hidden={i !== active}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            ))}
          </div>
          <ol className="hv3-tour-list">
            {story.stations.map((station, i) => (
              <li
                key={station.title}
                className={`hv3-tour-step${i === active ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  aria-expanded={i === active}
                  aria-controls={`hv3-tour-body-${i}`}
                  onClick={() => {
                    setActive(i);
                    setUserDrove(true);
                  }}
                >
                  <span className="hv3-tour-num tabular-nums" aria-hidden="true">{i + 1}</span>
                  <span className="hv3-tour-step-title">{station.title}</span>
                </button>
                <div className="hv3-tour-step-reveal" id={`hv3-tour-body-${i}`}>
                  <p className="hv3-tour-step-body">{station.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="hv3-story-foot hv3-story-foot--road reveal">
          <WhatsAppCTA context={ctaContext}>{story.ctaLine}</WhatsAppCTA>
          <CalendarCTA context={ctaContext} variant="link" />
        </div>
        {story.footnote && <p className="hv3-story-footnote hv3-story-footnote--road reveal">{story.footnote}</p>}
      </div>
    </section>
  );
}

function Home({ seo = HOME_SEO }) {
  const [faqIndex, setFaqIndex] = useState(-1);
  const [pricingTerm, setPricingTerm] = useState(pricing.defaultTerm);
  // Which plan column the narrow-viewport table shows. Desktop ignores it.
  const [activePlan, setActivePlan] = useState(pricing.plans.length - 1);
  useScrollReveal();

  return (
    <div className="home-v3">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[softwareApplicationSchema(), faqPageSchema(homeFaqItems)]}
      />

      {/* ── Hero: split editorial — promise left, product right ── */}
      <section className="hv3-hero" id="product">
        <div className="container">
          <div className="hv3-hero-grid">
            <div className="hv3-hero-copy">
              <span className="section-label hero-overline">{heroContent.overline}</span>
              <h1 className="hero-title">
                <span className="hv3-hero-lead">{heroContent.titleLead}</span>{' '}
                <span className="hero-title-accent hv3-hero-accent">{heroContent.titleAccent}</span>
              </h1>
              <p className="hv3-hero-sub">{heroContent.subtitle}</p>
              <div className="hv3-hero-ctas">
                {demoEntryLive ? (
                  <>
                    <DemoTryCTA context="home-hero" />
                    <WhatsAppCTA context="home-hero" variant="secondary" />
                  </>
                ) : (
                  <>
                    <WhatsAppCTA context="home-hero" />
                    <CalendarCTA context="home-hero" />
                  </>
                )}
              </div>
              <div className="hv3-hero-stats">
                {heroContent.stats.map((s) => (
                  <div key={s.label} className="hv3-stat">
                    <span className="hv3-stat-value tabular-nums">
                      <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    </span>
                    <span className="hv3-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hv3-hero-visual">
              <div className="hv3-hero-phone">
                <img
                  src="/assets/screenshots/home-screen.webp"
                  alt="Takkada home screen showing receivables dashboard"
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <span className="hv3-hero-chip hv3-hero-chip--1" aria-hidden="true">
                <MessageCircle size={15} /> Invoice sent on WhatsApp
              </span>
              <span className="hv3-hero-chip hv3-hero-chip--2" aria-hidden="true">
                <IndianRupee size={15} /> Payment matched in Tally
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Story 1: the order-to-cash road (the signature centerpiece) ── */}
      <RoadSection story={storyOrderToCash} ctaContext="story-order-to-cash" />

      {/* ── Story 2: Team Sales / the field day ── */}
      <StorySection story={storyTeamSales} alt ctaContext="story-team-sales" />

      {/* ── AI showcase: the three places the AI does the typing ── */}
      <section className="hv3-ai" id={aiImport.id}>
        <div className="container">
          <div className="hv3-story-head reveal">
            <span className="section-label">{aiImport.overline}</span>
            <h2 className="hv3-story-title">{aiImport.heading}</h2>
            <p className="hv3-story-intro">{aiImport.intro}</p>
          </div>
          <div className="hv3-ai-cards reveal">
            {aiImport.cards.map((card) => {
              const Icon = aiIconMap[card.icon] || Camera;
              return (
                <div key={card.title} className="hv3-ai-card">
                  <div className="hv3-ai-card-top">
                    <div className="hv3-grid-icon">
                      <Icon size={20} />
                    </div>
                    <span className="hv3-ai-chip">
                      <Sparkles size={12} /> AI reads it
                    </span>
                  </div>
                  <h3 className="hv3-ai-card-title">{card.title}</h3>
                  <p className="hv3-ai-card-body">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Everything else: the compact grid ── */}
      <section className="hv3-grid-section" id="features">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">And The Rest</span>
            <h2 className="section-title">Every capability you will actually use</h2>
          </div>
          <div className="hv3-grid">
            {featureGridV3.map((f) => {
              const Icon = gridIconMap[f.icon] || Check;
              return (
                <div key={f.id} className="hv3-grid-card" id={f.id}>
                  <div className="hv3-grid-icon">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="hv3-grid-title">{f.title}</h3>
                    <p className="hv3-grid-desc">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Compressed Tally trust band ── */}
      <section className="hv3-tally" id="tally">
        <div className="container">
          <div className="reveal">
            <span className="section-label">{tallyTrust.overline}</span>
            <h2 className="hv3-tally-title">{tallyTrust.heading}</h2>
            <p className="hv3-tally-sub">{tallyTrust.subtitle}</p>
          </div>
          <div className="hv3-tally-points reveal">
            {tallyTrust.points.map((point) => {
              const Icon = tallyIconMap[point.icon] || RefreshCw;
              return (
                <div key={point.title} className="hv3-tally-point">
                  <Icon size={22} />
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              );
            })}
          </div>
          <div className="hv3-tally-download reveal">
            <a href={appLinks.tallyConnector} className="cta-btn cta-btn--outline" download>
              <Download size={16} /> Download Tally Connector
            </a>
            <p className="hv3-tally-download-note">{tallyTrust.downloadNote}</p>
          </div>
        </div>
      </section>

      {/* ── Pricing (ported intact from the pre-v3 page; .rate-* DOM is
             pinned by pricing-table.test.jsx — restyle only via .home-v3) ── */}
      <section className="pricing-section" id="pricing">
        <div className="container">
          {/* Header and term switch share one row so the title is still on
              screen when the first price is. The old stacked header pushed
              the table 450px down and the section lost its own heading. */}
          <div className="rate-head reveal">
            <div className="rate-head-copy">
              <span className="section-label">Pricing</span>
              <h2 className="section-title rate-title tabular-nums">
                ₹2,900 to ₹8,500 per year. GST extra.
              </h2>
              <p className="section-subtitle rate-subtitle">
                7-day free trial on every plan. No card required.
              </p>
            </div>
            {/* The 3-year saving is the one number a distributor does the maths
                on before calling, so the switch is the section's only control. */}
            <div className="rate-term" role="group" aria-label="Billing term">
              {pricing.terms.map((term) => (
                <button
                  key={term.id}
                  type="button"
                  className={`rate-term-option${pricingTerm === term.id ? ' rate-term-option--active' : ''}`}
                  aria-pressed={pricingTerm === term.id}
                  onClick={() => setPricingTerm(term.id)}
                >
                  <span>{term.label}</span>
                  {term.badge && <span className="rate-term-badge tabular-nums">{term.badge}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Plan picker. Desktop shows all four columns at once; below 900px
              a table cannot, so this selects the single column on show. */}
          <div className="rate-picker" role="group" aria-label="Choose a plan to compare">
            {pricing.plans.map((plan, i) => (
              <button
                key={plan.plan}
                type="button"
                className={`rate-picker-option${activePlan === i ? ' rate-picker-option--active' : ''}`}
                aria-pressed={activePlan === i}
                onClick={() => setActivePlan(i)}
              >
                {plan.plan}
              </button>
            ))}
          </div>

          <div className="rate-table" data-active-plan={activePlan}>
            <div className="rate-table-head">
              <div className="rate-table-corner">
                <span className="rate-corner-title">What you get</span>
                <span className="rate-corner-note">
                  Every plan carries the one below it. Prices are per business, per year, GST extra.
                </span>
              </div>
              {pricing.plans.map((plan, i) => {
                const quote = planPricing(plan, pricingTerm);
                return (
                  <div
                    key={plan.plan}
                    className={`rate-col rate-col--${i} rate-plan${plan.highlighted ? ' rate-plan--hero' : ''}`}
                  >
                    {plan.badge && <span className="rate-plan-badge">{plan.badge}</span>}
                    <span className="rate-plan-name">{plan.plan}</span>
                    <span className="rate-plan-price tabular-nums">{quote.price}</span>
                    <span className="rate-plan-period">per year</span>
                    <span className="rate-plan-note tabular-nums">
                      {quote.term.discount > 0 ? (
                        <>
                          <s>{quote.listPrice}</s> · {formatInr(quote.total)} upfront
                        </>
                      ) : (
                        'Billed yearly'
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {pricing.matrix.map((group) => (
              <div className="rate-group" key={group.group}>
                <div className="rate-group-title">{group.group}</div>
                {group.rows.map((row) => (
                  <div className="rate-row" key={row.label}>
                    <div className="rate-row-label">{row.label}</div>
                    {pricing.plans.map((plan, i) => (
                      <div
                        key={plan.plan}
                        className={`rate-col rate-col--${i} rate-cell${plan.highlighted ? ' rate-cell--hero' : ''}`}
                      >
                        {i >= row.from ? (
                          <>
                            <Check size={16} className="rate-tick" aria-hidden="true" />
                            <span className="sr-only">{`Included in ${plan.plan}`}</span>
                          </>
                        ) : (
                          <>
                            <span className="rate-dash" aria-hidden="true" />
                            <span className="sr-only">{`Not in ${plan.plan}`}</span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* Add-ons close the table rather than sitting below it as an
                orphan block, because they apply to every column above. */}
            <div className="rate-addons">
              <div className="rate-addons-title">Add to any plan</div>
              <div className="rate-addons-list">
                {pricing.addons.map((addon) => (
                  <span key={addon.label} className="rate-addon">
                    <span className="rate-addon-label">{addon.label}</span>
                    <span className="rate-addon-price tabular-nums">{addon.price}</span>
                  </span>
                ))}
              </div>
              <p className="rate-addons-note">
                Payment Collection puts a UPI link on every invoice at zero MDR and reconciles the
                receipt back into Tally. Every plan includes 1 user.
              </p>
            </div>
          </div>

          <div className="home-pricing-strip-cta">
            <WhatsAppCTA context="pricing">Ask about pricing on WhatsApp</WhatsAppCTA>
            <CalendarCTA context="pricing" variant="link" className="home-pricing-strip-link">
              or get full pricing in a <span className="tabular-nums">15-min</span> demo <ArrowRight size={16} />
            </CalendarCTA>
          </div>
        </div>
      </section>

      {/* ── Testimonials (ported; structure pinned by home-trust.test.jsx) ── */}
      <section className="testimonials-section" id="testimonial">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">From Takkada Customers</span>
            <h2 className="section-title">What our customers say</h2>
          </div>
          <div className="testimonial-row">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} {...t} delay={i * 80} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Data safety / legitimacy (ported; pinned by home-trust.test.jsx) ── */}
      <section className="tally-section trust-section" id="data-safety">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-label">{trustSection.overline}</span>
            <h2 className="section-title">{trustSection.heading}</h2>
            <p className="section-subtitle">{trustSection.subtitle}</p>
          </div>
          <div className="tally-grid">
            {trustSection.points.map((point) => {
              const Icon = trustIconMap[point.icon] || Shield;
              return (
                <div key={point.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                  {point.links && (
                    <p className="trust-store-links">
                      {point.links.map((link) => (
                        <a
                          key={link.label}
                          href={appLinks[link.hrefKey]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label} <ArrowUpRight size={13} />
                        </a>
                      ))}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <p className="trust-article-link">
            <Link to={trustSection.articleLink.href}>
              {trustSection.articleLink.label} <ArrowRight size={15} />
            </Link>
          </p>
        </div>
      </section>

      {/* ── FAQ (ported; feeds faqPageSchema above) ── */}
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

      {/* ── Footer CTA band (ported) ── */}
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
              <CalendarCTA context="final-cta" variant="link" className="final-cta-secondary-link">
                or book a <span className="tabular-nums">15-min</span> demo <ArrowRight size={16} />
              </CalendarCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
