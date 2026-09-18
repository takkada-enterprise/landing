import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Download,
  MonitorCheck,
  RefreshCw,
  Shield,
  ShieldCheck,
  BadgeCheck,
  Database,
} from 'lucide-react';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import DemoTryCTA from '../components/DemoTryCTA';
import FAQItem from '../components/FAQItem';
import PlayablePhone from '../components/PlayablePhone';
import FollowOneInvoice from '../components/FollowOneInvoice';
import Seo from '../components/Seo';
import { useScrollReveal } from '../hooks/useScrollFx';
import { softwareApplicationSchema, faqPageSchema } from '../data/schema';
import { HOTSPOTS, JOBS, HERO_HOME } from '../data/heroHotspots';
import {
  appLinks,
  pricing,
  biggerSetups,
  planPricing,
  planPriceRange,
  formatInr,
  heroContent,
  tallyTrust,
  homeFaqItems,
  testimonials,
  trustSection,
  proofStrip,
  differentiators,
} from '../data/siteContent';

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
  // The price range is derived from pricing.plans — this description ships in
  // the prerendered meta tag, so a typed figure here would be drift the page
  // itself can't see.
  description: `Invoice from your phone, send on WhatsApp, collect via UPI, auto-reconcile into Tally. Built for Indian distributors. ${planPriceRange()}/year.`,
  path: '/',
};

function Home({ seo = HOME_SEO }) {
  // Which hotspot the visitor has open, or null for the home screen. The whole
  // hotspot object, not its key: the phone hands it over on a tap and the copy
  // beside it is read straight off the same object, so the two cannot drift.
  const [hot, setHot] = useState(null);
  const copy = hot ?? HERO_HOME;
  // False on the server render and on the first client paint, true from the
  // first swap onward. It gates the copy block's enter transition, because
  // @starting-style fires on an element's FIRST style resolution and would
  // otherwise fade the H1 — the page's LCP text — in from blurred transparency
  // on every cold load. A ref, not state: it must not schedule a render of its
  // own, and the render that follows setHot reads the value set beside it.
  const swapped = useRef(false);
  const swapTo = (next) => {
    swapped.current = true;
    setHot(next);
  };
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

      {/* ── Hero: the playable phone in the middle, its copy on the left and
             the jobs it does on the right. The server render is the home state
             (hot starts null), so a crawler and a no-JS visitor both get the
             real headline and a phone that simply shows the home screen. ── */}
      <section className="hv3-hero" id="product">
        <div className="hv3-hero-grid">
          <div className="hv3-hero-copy">
            {/* Keyed on the open hotspot so React remounts the block and
                @starting-style can fire: this is the blur crossfade between one
                screen's copy and the next. No aria-live here — the phone
                announces "Showing <label>" from its own region, and a second
                one would read the whole headline over the top of it. */}
            <div
              className={`hv3-hero-swap${swapped.current ? ' is-swapped' : ''}`}
              key={hot?.key ?? 'home'}
            >
              <span className="section-label hero-overline">
                {hot ? hot.overline : heroContent.overline}
              </span>
              <h1 className="hero-title">{copy.headline}</h1>
              <p className="hero-subtitle">{copy.body}</p>
            </div>
            <div className="hv3-hero-cta">
              <DemoTryCTA context="home-hero" />
              {hot && (
                <Link className="hv3-hero-more" to={hot.href}>
                  See how it works <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
            <p className="hv3-hero-promise">{heroContent.promise}</p>
          </div>
          <PlayablePhone activeKey={hot?.key ?? null} onChange={swapTo} />
          {/* Outside the phone by design: the phone owns its hotspots and its
              Back pill, and another button inside that layer would sit in the
              same stack as the screens. Pressing the open job closes it, so
              each button is a real toggle rather than a one-way switch. */}
          <div className="hv3-hero-jobs" role="group" aria-label="Pick a job to see its screen">
            <span className="hv3-hero-jobs-label">Or pick a job</span>
            {JOBS.map((j) => (
              <button
                key={j.key}
                type="button"
                className={`hv3-job${hot?.key === j.key ? ' is-on' : ''}`}
                aria-pressed={hot?.key === j.key}
                onClick={() =>
                  swapTo(hot?.key === j.key ? null : HOTSPOTS.find((h) => h.key === j.key))
                }
              >
                {j.label}
                <small>{j.hint}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof strip: the customer's voice + the confirmed scale figure,
             moved AHEAD of pricing (2026-08-06 conversion pass, R3). The stat
             renders static: the hero is a phone to play with now, not a wall of
             figures, and this is the page's only place for the number. ── */}
      <section className="hv3-proof" id={proofStrip.id}>
        <div className="container">
          <div className="hv3-proof-card reveal">
            <figure className="hv3-proof-quote">
              <blockquote className="hv3-proof-text">{testimonials[0].quote}</blockquote>
              <figcaption className="hv3-proof-attrib">
                <span className="hv3-proof-name">{testimonials[0].name}</span>
                <span className="hv3-proof-role">{testimonials[0].role}</span>
              </figcaption>
            </figure>
            <div className="hv3-proof-stats">
              {heroContent.stats.map((s) => (
                <div key={s.label} className="hv3-stat">
                  <span className="hv3-stat-value tabular-nums">
                    {s.prefix}
                    {s.value}
                    {s.suffix}
                  </span>
                  <span className="hv3-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── The one story: follow one invoice from the counter to Tally. It
             replaces the two story sections, the AI band and the capability
             grid (2026-09-18): one invoice, seven true stops, and the feature
             pages hanging off the stop each of them belongs to. ── */}
      <FollowOneInvoice />

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
            <a href={appLinks.tallyConnector} className="cta-btn cta-btn--outline-light" download>
              <Download size={16} /> Download Tally Connector
            </a>
            <p className="hv3-tally-download-note">{tallyTrust.downloadNote}</p>
          </div>
        </div>
      </section>

      {/* ── Differentiator band: what only Takkada does, competitors
             unnamed (2026-08-06 conversion pass, R4). Claims contract lives
             in siteContent.js + differentiators.test.js. ── */}
      <section className="hv3-diff" id={differentiators.id}>
        <div className="container">
          <div className="hv3-story-head reveal">
            <span className="section-label">{differentiators.overline}</span>
            <h2 className="hv3-story-title">{differentiators.heading}</h2>
            <p className="hv3-story-intro">{differentiators.intro}</p>
          </div>
          <div className="hv3-diff-rows">
            {differentiators.rows.map((row) => (
              <div key={row.stop} className="hv3-diff-row reveal">
                <div className="hv3-diff-cell hv3-diff-cell--others">
                  <span className="hv3-diff-tag">{row.stop}</span>
                  <p className="tabular-nums">{row.others}</p>
                </div>
                <div className="hv3-diff-cell hv3-diff-cell--takkada">
                  <span className="hv3-diff-tag hv3-diff-tag--takkada">Takkada keeps going</span>
                  <p className="tabular-nums">{row.takkada}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="hv3-story-footnote reveal">{differentiators.footnote}</p>
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
                {planPriceRange()} per year. GST extra.
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
                receipt back into Tally. With your own WhatsApp number, early access for now, every
                reminder and invoice goes out from your number instead of ours. The Customer Order
                Link lets your retailers order from a link and you approve each one into Tally.
                Every plan includes 1 user.
              </p>
            </div>

            {/* Bigger setups close the table for the same reason add-ons do:
                both apply across every column above, and neither is a plan.
                Two cards rather than pills, because the self-hosting line
                carries two figures on two different clocks and a pill renders
                one price string. */}
            <div className="rate-bigger">
              <div className="rate-bigger-head">
                <div className="rate-bigger-title">{biggerSetups.title}</div>
                <p className="rate-bigger-intro">{biggerSetups.intro}</p>
              </div>
              <div className="rate-bigger-cards">
                {biggerSetups.items.map((item) => (
                  <div className="rate-bigger-card" key={item.id}>
                    <h3 className="rate-bigger-card-title">{item.title}</h3>
                    <p className="rate-bigger-card-body">{item.body}</p>
                    <div className="rate-bigger-prices">
                      {item.price.map((line) => (
                        <div className="rate-bigger-price" key={line.amount}>
                          <span className="rate-bigger-amount tabular-nums">{line.amount}</span>
                          <span className="rate-bigger-price-note">{line.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rate-bigger-foot">
                <p className="rate-bigger-note">{biggerSetups.note}</p>
                <WhatsAppCTA context="bigger-setups" variant="outline">
                  {biggerSetups.ctaLabel}
                </WhatsAppCTA>
              </div>
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

      {/* ── Data safety / legitimacy (ported; pinned by home-trust.test.jsx).
             The testimonial wall that sat here moved up into the proof strip
             (2026-08-06): proof now lands before the pricing decision. ── */}
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
            {/* The onboarding-speed line ships behind the operator eyeball
                (open question 2 in the 2026-08-06 plan): KYC ~24h and
                same-day Tally connect mirror the long-standing FAQ claim,
                but the operator confirms before merge. */}
            <p className="tabular-nums">
              Talk to us for 15 minutes. Leave with a clear picture of whether Takkada fits your
              business. KYC clears in about 24 hours, and Tally connects the same day.
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
