import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  CalendarClock,
  Camera,
  CheckCheck,
  Clock,
  FileCheck2,
  LayoutGrid,
  Link2,
  ListChecks,
  Lock,
  MapPin,
  MessageCircle,
  PackageCheck,
  QrCode,
  Route,
  Send,
  Share2,
  ShieldCheck,
  Target,
  Truck,
  Wallet,
} from 'lucide-react';
import Seo from './Seo';
import FeatureTour from './FeatureTour';
import CallPlayer from './CallPlayer';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import Breadcrumb from './Breadcrumb';
import BackHome from './BackHome';
import FAQItem from './FAQItem';
import JourneyStrip from './JourneyStrip';
import { pricing, planPricing } from '../data/siteContent';
import {
  softwareApplicationSchema,
  faqPageSchema,
  breadcrumbSchema,
  articlePageSchema,
  SITE_URL,
} from '../data/schema';
import { featurePagePath, heroShot, stepShot } from '../data/featurePages';
import { screen } from '../data/screens';

// The feature-landing-page template. One entry in src/data/featurePages.js is
// one page; this renders it. Built as a second template beside ICPTemplate
// rather than an extension of it, because the four ICP pages have no
// screenshots, no comparison table and no Article schema, and widening
// ICPTemplate to cover both would have made every prop optional.
//
// Section order is deliberate and AEO-driven. The answer block sits directly
// under the h1 because roughly 44% of AI-search citations come from the first
// 30% of a page, and the comparison table is real <table> markup rather than a
// styled grid because tables are selected for citation far more often than
// prose. Both are the reason this template exists.
//
// Motion: none of its own (CLAUDE.md craft rule 5). The FAQ accordion is the
// only moving part and it comes from the shared FAQItem.

// Icons are named as strings in featurePages.js (that file must stay
// React-free so Node ESM can load it) and resolved here. A name with no entry
// renders the step without an icon rather than crashing, and the data test
// pins that every name used is present.
const ICONS = {
  Activity,
  BarChart3,
  BookOpen,
  CalendarClock,
  Camera,
  CheckCheck,
  Clock,
  FileCheck2,
  LayoutGrid,
  Link2,
  ListChecks,
  Lock,
  MapPin,
  MessageCircle,
  PackageCheck,
  QrCode,
  Route,
  Send,
  Share2,
  ShieldCheck,
  Target,
  Truck,
  Wallet,
};

export const ICON_NAMES = Object.keys(ICONS);

// Every price on the site is derived, never typed (CLAUDE.md §3). The plan
// pointer names a plan; the rupees come from the live rate card.
function PlanPointer({ planPointer }) {
  const plan = pricing.plans.find((p) => p.plan === planPointer.plan);
  if (!plan) return null;
  const resolved = planPricing(plan);
  return (
    <div className="feature-plan-pointer">
      <p className="feature-plan-pointer-note">{planPointer.note}</p>
      <p className="feature-plan-pointer-price">
        <span className="feature-plan-pointer-plan">{plan.plan}</span>{' '}
        <span className="tabular-nums">{resolved.price}</span>
        <span className="feature-plan-pointer-period">{resolved.period}</span>
        {resolved.totalLabel && (
          <span className="feature-plan-pointer-term tabular-nums">
            {' '}
            on a {resolved.term.years}-year term
          </span>
        )}
      </p>
      <Link to="/#pricing" className="feature-plan-pointer-link">
        See what every plan includes <ArrowRight size={15} />
      </Link>
    </div>
  );
}

function FeaturePage({ page }) {
  const [faqIndex, setFaqIndex] = useState(-1);

  const path = featurePagePath(page);
  // Resolved once: the hero image, the LCP preload and the Article schema image
  // all have to be the same picture.
  const shot = heroShot(page);
  const faqItems = page.faqs.map((f) => ({ question: f.q, answer: f.a }));
  const trail = [
    { name: 'Home', url: `${SITE_URL}/` },
    { name: page.llms.title, url: `${SITE_URL}${path}/` },
  ];

  return (
    <>
      <Seo
        title={page.seo.title}
        description={page.seo.description}
        path={path}
        ogType="article"
        schemas={[
          articlePageSchema({
            headline: page.searchPhrase,
            description: page.seo.description,
            // A page tells its story through a walk-through grid or a scroll
            // tour, so the schema image falls through both before the hero.
            // Without the fallback, a tour-only page emits Article with no
            // image at all.
            image:
              stepShot(page.walkthrough?.[0])?.src ??
              stepShot(page.tour?.stations?.[0])?.src ??
              shot?.src,
            datePublished: page.datePublished,
            dateModified: page.updated,
            author: page.author,
            path,
          }),
          softwareApplicationSchema(),
          faqPageSchema(faqItems),
          breadcrumbSchema(trail.map((e) => ({ name: e.name, path: e.url }))),
        ]}
      />

      {/* ── Hero + front-loaded answer ── */}
      <section className="hero icp-hero feature-hero" id="hero">
        <div className="container">
          <div className="feature-hero-grid">
            <div className="hero-content icp-hero-content">
              <BackHome />
              <Breadcrumb trail={trail} />
              <span className="section-label hero-overline">{page.overline}</span>
              <h1 className="hero-title icp-hero-title">{page.headline}</h1>
              <p className="hero-subtitle icp-hero-subtitle">{page.subheadline}</p>
              <p className="feature-answer">{page.answer}</p>
              <div className="hero-ctas">
                <WhatsAppCTA context={page.waContext} />
                <CalendarCTA context={page.waContext} />
              </div>
              {/* Closes the hero with the one thing the page cannot say about
                  itself: where it sits in the invoice's life. Renders nothing
                  for a page that is not one of the seven stops. */}
              <JourneyStrip slug={page.slug} />
            </div>
            {shot && (
              <div className="feature-hero-shot">
                {/* LCP element on desktop. Eager and high priority, never lazy.
                    Do not hand-write a <link rel=preload> for it: vite-react-ssg
                    injects a preload for every <img>, and stripImagePreloads
                    keeps exactly the ones whose fetchpriority is high. Setting
                    it here is what earns the preload; adding a second one by
                    hand is what breaks checkImagePreloads. */}
                <img
                  src={shot.src}
                  srcSet={shot.srcSet}
                  sizes="(max-width: 767px) 70vw, 300px"
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Walk-through, one real screenshot per step. Only on pages whose
          story is a grid. A page carrying a scroll tour instead tells the same
          day once, below, and rendering both narrated it twice. ── */}
      {page.walkthrough?.length > 0 && (
        <section className="tally-section feature-walkthrough" id="walkthrough">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{page.overline}</span>
              <h2 className="section-title">{page.walkthroughHeading}</h2>
            </div>
            <div className="feature-steps" data-steps={page.walkthrough.length}>
              {page.walkthrough.map((step) => {
                const Icon = ICONS[step.icon];
                const stepImg = stepShot(step);
                return (
                  <article key={step.title} className="feature-step">
                    {/* Media band first and fixed-height (feature-page.css), so
                      every phone in a row starts and is cut at the same y
                      whatever the copy under it does. */}
                    {stepImg && (
                      <div className="feature-step-shot">
                        <img
                          src={stepImg.src}
                          srcSet={stepImg.srcSet}
                          sizes="208px"
                          alt={stepImg.alt}
                          width={stepImg.width}
                          height={stepImg.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    )}
                    <div className="feature-step-copy">
                      <div className="tally-card-icon">{Icon && <Icon size={22} />}</div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── A recording of the thing the page describes, only on pages whose
          data carries one: the AI collection call first (2026-09-20). It sits
          under the walkthrough because the four cards say what happens and
          this says what it sounds like. ── */}
      {page.listen && (
        <section className="tally-section feature-listen" id="listen">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{page.listen.overline}</span>
              <h2 className="section-title">{page.listen.heading}</h2>
              {page.listen.body && <p className="feature-listen-intro">{page.listen.body}</p>}
            </div>
            <CallPlayer listen={page.listen} />
            {page.listen.caption && <p className="feature-listen-caption">{page.listen.caption}</p>}
          </div>
        </section>
      )}

      {/* ── Scroll-driven order tour, only on pages whose data carries one.
          Motion reasons live in FeatureTour.jsx's header. ── */}
      {page.tour && <FeatureTour tour={page.tour} />}

      {/* ── Report gallery, only on pages whose data carries one: the reports
          page first (2026-09-20). Every report there is a screenshot of, as a
          small phone with a title and one line, so a reader sees the registers
          rather than reading a list of their names. ── */}
      {page.gallery && (
        <section className="tally-section feature-gallery" id="gallery">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{page.gallery.overline}</span>
              <h2 className="section-title">{page.gallery.heading}</h2>
              {page.gallery.intro && <p className="feature-gallery-intro">{page.gallery.intro}</p>}
            </div>
            <div className="feature-gallery-grid">
              {page.gallery.items.map((item) => {
                const shot = screen(item.screen);
                return (
                  <article key={item.screen} className="feature-gallery-card">
                    <div className="feature-gallery-shot">
                      <img
                        src={shot.src}
                        srcSet={shot.srcSet}
                        sizes="150px"
                        alt={shot.alt}
                        width={shot.width}
                        height={shot.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── An exported sheet, only on pages whose data carries one: the
          Team Sales export first (2026-09-20). Shown whole, not tucked and
          rotated like the homepage's PaperSheet, because here it is the
          subject, not a prop. ── */}
      {page.sheet && (
        <section className="tally-section feature-sheet" id="sheet">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{page.sheet.overline}</span>
              <h2 className="section-title">{page.sheet.heading}</h2>
              <p className="feature-sheet-intro">{page.sheet.body}</p>
            </div>
            <figure className="feature-sheet-paper">
              <img
                src={screen(page.sheet.screen).src}
                srcSet={screen(page.sheet.screen).srcSet}
                sizes="(max-width: 767px) calc(100vw - 32px), 760px"
                alt={screen(page.sheet.screen).alt}
                width={screen(page.sheet.screen).width}
                height={screen(page.sheet.screen).height}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>
      )}

      {/* ── In detail. Only on pages whose data carries a `detail` block: a
          feature with a lot of behaviour worth naming (document import first,
          2026-09-20) gets a card per topic, each a short list of what the app
          does today, and a link to the full how-to guide. Every line comes
          from a source marked Live; nothing Stage-only is described here.
          A point is a bold lead and one sentence (2026-09-20 evening), never
          a paragraph. ── */}
      {page.detail && (
        <section className="tally-section feature-detail" id="detail">
          <div className="container">
            <div className="section-header">
              <span className="section-label">{page.detail.overline}</span>
              <h2 className="section-title">{page.detail.heading}</h2>
              {page.detail.intro && <p className="feature-detail-intro">{page.detail.intro}</p>}
            </div>
            <div className="tally-grid feature-detail-grid">
              {page.detail.groups.map((group) => (
                <article key={group.title} className="tally-card feature-detail-card">
                  <h3>{group.title}</h3>
                  <ul>
                    {group.points.map((point) => (
                      <li key={point.lead}>
                        <strong className="feature-detail-lead">{point.lead}.</strong> {point.text}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {page.detail.guide && (
              <p className="feature-detail-more">
                <Link to={`/guide/${page.detail.guide.slug}`}>{page.detail.guide.label}</Link>
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── Comparison table. Real <table>, competitors unnamed. ── */}
      <section className="comparison-section feature-comparison" id="comparison">
        <div className="container">
          <div className="section-header">
            <span className="section-label">SIDE BY SIDE</span>
            <h2 className="section-title">{page.comparison.heading}</h2>
          </div>
          <div className="comparison-table-wrapper">
            <table className="comparison-table feature-comparison-table">
              <thead>
                <tr>
                  <th className="comparison-th comparison-th--feature" scope="col">
                    What you need
                  </th>
                  <th className="comparison-th comparison-th--takkada" scope="col">
                    Takkada
                  </th>
                  <th className="comparison-th" scope="col">
                    {page.comparison.othersLabel}
                  </th>
                </tr>
              </thead>
              <tbody>
                {page.comparison.rows.map((row) => (
                  <tr key={row.feature} className="comparison-row">
                    <th className="comparison-td comparison-td--feature" scope="row">
                      {row.feature}
                    </th>
                    <td className="comparison-td comparison-td--takkada-value">{row.takkada}</td>
                    <td className="comparison-td">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="comparison-disclaimer">{page.comparison.disclaimer}</p>
          <PlanPointer planPointer={page.planPointer} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Questions distributors ask</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
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

      {/* ── Related reading. Internal links are what made the blog rank. ── */}
      {page.relatedPosts.length > 0 && (
        <section className="feature-related" id="related">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Read further</h2>
            </div>
            <ul className="feature-related-list">
              {page.relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                    <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              See it in 15 minutes.
              <br />
              Decide with a full picture.
            </h2>
            <p>
              Book a demo. We walk through your setup, your Tally version, and exactly what changes
              for your business.
            </p>
            <div className="final-cta-actions">
              <WhatsAppCTA context={page.waContext} variant="dark" />
              <CalendarCTA
                context={page.waContext}
                variant="link"
                className="final-cta-secondary-link"
              >
                or book a <span className="tabular-nums">15-min</span> demo <ArrowRight size={16} />
              </CalendarCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FeaturePage;
