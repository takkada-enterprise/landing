import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import DemoTryCTA from '../components/DemoTryCTA';
import FAQItem from '../components/FAQItem';
import VideoTestimonials from '../components/VideoTestimonials';
import Seo from '../components/Seo';
import { Band, SectionHead, Card, CardGrid, Shot, AltRow, QuoteBand, CloseBand } from '../ui';
import '../ui/home.css';
import { whatsappHref } from '../lib/whatsapp';
import { track } from '../lib/track';
import { softwareApplicationSchema, faqPageSchema, videoObjectSchema } from '../data/schema';
import { HOME_HERO, HOME_USED_FOR, HOME_IN_CHARGE, HOME_ROWS, HOME_CLOSE } from '../data/home';
import {
  appLinks,
  pricing,
  biggerSetups,
  planPricing,
  planPriceRange,
  formatInr,
  homeFaqItems,
  testimonials,
  trustSection,
} from '../data/siteContent';

// SEO defaults for the home route. Exposed as props so a sibling route can
// reuse this exact page body under a different canonical URL without forking
// the markup. One body, many entry points, no drift.
const HOME_SEO = {
  title: 'Takkada | Mobile Tally App for Indian Distributors',
  // The price range is derived from pricing.plans — this description ships in
  // the prerendered meta tag, so a typed figure here would be drift the page
  // itself can't see.
  // Opens on the same entity sentence as the About page lead, so search and
  // AI summaries read one definition of what Takkada is. The snippet's range
  // stops at Copilot and leaves Enterprise out (operator call, 2026-10-21);
  // the pricing section still shows the full ladder.
  description: `Takkada is a mobile app for Tally. See reports, send WhatsApp payment reminders and collect UPI from your phone. ${planPriceRange(
    pricing.plans.filter((p) => p.plan !== 'Enterprise')
  )}/year.`,
  path: '/',
};

// The Campfire home (plan 2026-10-30-003, Task 4): dark hero, used-for cards,
// quote band, Tally-in-charge cards, alternating rows, data safety, video
// stories, the rate matrix, FAQ and a dark close band. Copy lives in
// src/data/home.js and siteContent.js; nothing here types a figure.
function Home({ seo = HOME_SEO }) {
  const [faqIndex, setFaqIndex] = useState(-1);
  const [pricingTerm, setPricingTerm] = useState(pricing.defaultTerm);
  // Which plan column the narrow-viewport table shows; it opens on the
  // highlighted plan. Desktop ignores it.
  const [activePlan, setActivePlan] = useState(
    Math.max(0, pricing.plans.findIndex((p) => p.highlighted))
  );

  return (
    <div className="ui-home">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[softwareApplicationSchema(), faqPageSchema(homeFaqItems), ...videoObjectSchema()]}
      />

      <Band tone="band" id="product">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <h1 className="ui-hero-title">{HOME_HERO.headline}</h1>
            <ul className="ui-hero-points">
              {HOME_HERO.points.map((point) => (
                <li key={point}>
                  <Check size={18} aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="ui-hero-actions">
              <DemoTryCTA context="home-hero" />
              <CalendarCTA context="home-hero" />
            </div>
          </div>
          <div className="ui-hero-stage">
            <Shot screen={HOME_HERO.screen} eager sizes="(max-width: 767px) 72vw, 360px" />
            {HOME_HERO.floats.map(({ id, screen, ...pos }) => (
              <div key={id} className="ui-hero-float" style={pos}>
                <Shot screen={screen} sizes="260px" />
              </div>
            ))}
          </div>
        </div>
      </Band>

      <Band id="used-for">
        <p className="ui-label">Distributors use Takkada for:</p>
        <CardGrid cols={4}>
          {HOME_USED_FOR.map((c) => (
            <Card key={c.id} title={c.title} line={c.line} to={`/${c.slug}`}>
              <Shot screen={c.screen} sizes="(max-width: 599px) 90vw, (max-width: 1099px) 45vw, 260px" />
            </Card>
          ))}
        </CardGrid>
        <div className="ui-after-grid">
          <DemoTryCTA context="home-used-for" />
        </div>
      </Band>

      <Band>
        <QuoteBand
          id="testimonial"
          quote={testimonials[0].quote}
          name={testimonials[0].name}
          role={testimonials[0].role}
          note="100+ businesses run their Tally on Takkada."
          cta={{ to: '/#pricing', label: 'See pricing' }}
        />
      </Band>

      <Band tone="white" id="tally">
        <div id="why-takkada">
          <SectionHead title="Tally stays in charge." />
          <CardGrid cols={3}>
            {HOME_IN_CHARGE.map((c) => (
              <Card key={c.title} title={c.title} line={c.line}>
                <Shot screen={c.screen} sizes="(max-width: 899px) 90vw, 340px" />
              </Card>
            ))}
          </CardGrid>
        </div>
      </Band>

      <Band id="rows">
        <SectionHead title="Built for a distributor's day." />
        {HOME_ROWS.map((r, i) => (
          <AltRow key={r.title} title={r.title} line={r.line} flip={i % 2 === 1} to={`/${r.slug}`}>
            <Shot screen={r.screen} sizes="(max-width: 899px) 80vw, 320px" />
          </AltRow>
        ))}
      </Band>

      <Band tone="white" id="data-safety">
        <SectionHead title={trustSection.heading} lead={trustSection.subtitle} />
        <CardGrid cols={4}>
          {trustSection.points.map((point) => (
            <Card key={point.title} title={point.title} line={point.body}>
              {point.links && (
                <p className="ui-store-links">
                  {point.links.map((link) => (
                    <a key={link.label} className="ui-textlink" href={appLinks[link.hrefKey]} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ))}
                </p>
              )}
            </Card>
          ))}
        </CardGrid>
        <p className="trust-article-link">
          <Link to={trustSection.articleLink.href}>
            {trustSection.articleLink.label}
          </Link>
        </p>
      </Band>

      <Band>
        <VideoTestimonials />
      </Band>

      {/* ── Pricing: the .rate-* matrix, markup and data flow as before
           (pinned by pricing-table.test.jsx); src/ui/home.css re-skins it. ── */}
      <Band tone="white" id="pricing">
        {/* Header and term switch share one row so the title is still on
            screen when the first price is. The old stacked header pushed
            the table 450px down and the section lost its own heading. */}
        <div className="rate-head">
          <div className="rate-head-copy">
            <h2 className="ui-section-title rate-title tabular-nums">
              {planPriceRange()} per year. GST extra.
            </h2>
            <p className="ui-section-lead rate-subtitle">
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
          {/* The plan head sticks for as long as this box lasts, so the box
              holds exactly the head and the capability rows. The add-ons and
              bigger-setups strips below have no plan columns to label. */}
          <div className="rate-matrix">
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
                  className={`rate-col rate-col--${i} rate-plan${plan.highlighted ? ' rate-plan--hero ui-pricing-highlight' : ''}`}
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
                      className={`rate-col rate-col--${i} rate-cell${plan.highlighted ? ' rate-cell--hero ui-pricing-highlight' : ''}`}
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
          </div>

          {/* Add-ons close the table rather than sitting below it as an
              orphan block, because any plan can take them (Enterprise
              already includes some of them). */}
          <div className="rate-addons">
            <div className="rate-addons-title">Add-ons</div>
            <ul className="rate-addons-list">
              {pricing.addons.map((addon) => (
                <li key={addon.label}>
                  {addon.slug ? (
                    <Link to={`/${addon.slug}`} className="rate-addon">
                      <span className="rate-addon-label">{addon.label}</span>
                      <span className="rate-addon-note">{addon.note}</span>
                      <span className="rate-addon-cta">
                        See how it works
                      </span>
                    </Link>
                  ) : (
                    <a
                      href={whatsappHref('pricing')}
                      className="rate-addon"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('whatsapp_cta_click', { cta_context: `addon-${addon.label}` })}
                    >
                      <span className="rate-addon-label">{addon.label}</span>
                      <span className="rate-addon-note">{addon.note}</span>
                      <span className="rate-addon-cta">
                        Ask on WhatsApp
                      </span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
            {/* Add-ons carry no price on the site: partners quote them
                (ruled 2026-10-04). One shared line, not a figure per pill. */}
            <div className="rate-addons-foot">
              <p className="rate-addons-cta">{pricing.addonsCta}</p>
              <WhatsAppCTA context="pricing" tone="ghost">
                Ask about add-ons on WhatsApp
              </WhatsAppCTA>
            </div>
          </div>

          {/* Bigger setups close the table for the same reason add-ons do:
              they sit outside the plan columns and none of them is a plan.
              A card rather than a pill, so the custom-pricing line can carry
              its own note beside the price. */}
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
              <WhatsAppCTA context="bigger-setups" tone="ghost">
                {biggerSetups.ctaLabel}
              </WhatsAppCTA>
            </div>
          </div>
        </div>

        <div className="home-pricing-strip-cta">
          <WhatsAppCTA context="pricing">Ask about pricing on WhatsApp</WhatsAppCTA>
          <CalendarCTA context="pricing" className="home-pricing-strip-link">
            or get full pricing in a 15-min demo <span aria-hidden="true">→</span>
          </CalendarCTA>
        </div>
      </Band>


      <Band id="faq">
        <SectionHead title="What distributors ask before signing up" />
        <div className="faq-list">
          {homeFaqItems.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={faqIndex === i}
              onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)}
            />
          ))}
        </div>
      </Band>

      <CloseBand id="close" title={HOME_CLOSE.title} cta={HOME_CLOSE.cta}>
        <DemoTryCTA context="home-close">{HOME_CLOSE.cta.label}</DemoTryCTA>
      </CloseBand>
    </div>
  );
}

export default Home;
