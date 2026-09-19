import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import BackHome from '../components/BackHome';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import { FEATURE_PAGES, featurePagePath } from '../data/featurePages';
import {
  FEATURE_BLURBS,
  leadFeaturePages,
  retiredAnchorsFor,
  sectionFeatureGroups,
} from '../data/featureGroups';
import { STOPS } from '../data/journey';
import { screen } from '../data/screens';
import { absoluteUrl, breadcrumbSchema, collectionPageSchema } from '../data/schema';

// The /features hub. Until this page existed the feature landing pages hung off
// the footer alone and the nav's "Features" item scrolled to a homepage
// section, so Google read every one of them as an afterthought. This is their
// index page and the nav's destination.
//
// It renders from FEATURE_PAGES, the same array that drives the routes, the
// sitemap, llms.txt and the footer, so a new landing page joins the hub the
// moment it is added. Tiers and the directory lines come from
// src/data/featureGroups.js.
//
// A lead tier, then a section per group (2026-08-11, re-cut 2026-09-18). Nine
// headings over twenty-seven identical text cards is a wall of grey to anyone
// who does not already know the name of the thing they want, so the page opens
// with the features distributors actually arrive for, shown with the screen
// they will be looking at. The lead card is the one new pattern on the page
// (craft rule 10); everything below it reuses .tally-card. Every section
// subtracts the lead slugs, so no page is linked twice.
//
// Grouped by the invoice's journey (2026-09-18). The sections below the lead
// grid are the seven stops of the homepage's story, in that order, each under
// the stamp its slip carries and the screen it opens with, then the two groups
// that are not moments in that story. A visitor arriving from the homepage
// finds the same seven words rather than a second taxonomy. The ids that
// regroup retired are still linkable: RETIRED_GROUP_ANCHORS maps each one onto
// the section that took its pages, which renders it as a zero-height anchor.
//
// Still no motion of its own beyond the card hover .tally-card already carries.
//
// `features-hub-card` is a BUILD CONTRACT, not styling: scripts/
// checkFeaturesHub.mjs counts anchors carrying that class in the raw HTML and
// fails the build if any feature page is missing one. Every tier's links carry
// it and per-tier appearance comes from the modifier classes beside it. Nothing
// that is not a feature page may carry it.

const WA_CONTEXT = 'features-hub';

// The mark that ties a directory heading back to the homepage's story: the
// stamp that stop's slip carries, and the screen it opens with. Same ink, same
// tilt, same wording as the slips on the homepage, because the point is that a
// visitor who has just read the story recognises where he is rather than
// reading a second name for it.
//
// A stop may have no screen — Send has none, because no capture of a delivered
// invoice exists — so the image is conditional and the stamp is not. Reading
// screens[0] unconditionally took the whole hub down with it.
//
// Both are decoration. The heading and intro beside them already say what the
// section is, so the stamp is hidden from assistive tech and the screen carries
// an empty alt rather than describing a thumbnail nobody can read.
function StopMark({ stopId }) {
  const stop = STOPS.find((s) => s.id === stopId);
  if (!stop) return null;
  const shot = stop.screens.length > 0 ? screen(stop.screens[0]) : null;

  return (
    <div className="features-hub-stop" aria-hidden="true">
      <span className={`features-hub-stamp features-hub-stamp--${stop.stamp.tone}`}>
        {stop.stamp.text}
      </span>
      {shot && (
        <img
          className="features-hub-stop-shot"
          src={shot.src}
          srcSet={shot.srcSet}
          sizes="132px"
          width={shot.width}
          height={shot.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

const seo = {
  title: 'All Features for Distributors on Tally | Takkada',
  description:
    'Every Takkada feature for a distributor on Tally: mobile invoicing, UPI collection, WhatsApp reminders, e-invoice, e-way bill, stock and salesman tracking.',
  path: '/features',
};

// Shape fixed by the shared <Breadcrumb>, which takes { name, url } and strips
// the origin back off for its router links. absoluteUrl owns the trailing-slash
// rule, so it is called rather than restated as a literal.
const trail = [
  { name: 'Home', url: absoluteUrl('/') },
  { name: 'Features', url: absoluteUrl(seo.path) },
];

// Reads the hub as a directory of every feature page. Built from FEATURE_PAGES
// flat rather than from the rendered tiers: the schema states what the
// directory contains, which is a fact about the data, and rebuilding the page's
// layout must never be able to change it. The description is the same string
// the card shows, so a card and its ListItem cannot describe different things.
const hubSchema = () =>
  collectionPageSchema({
    name: 'Takkada features for distributors on Tally',
    description: seo.description,
    path: seo.path,
    items: FEATURE_PAGES.map((page) => ({
      name: page.llms.title,
      description: FEATURE_BLURBS[page.slug] ?? page.llms.summary,
      path: featurePagePath(page),
    })),
  });

function Features() {
  const lead = leadFeaturePages(FEATURE_PAGES);
  const sections = sectionFeatureGroups(FEATURE_PAGES);

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[
          hubSchema(),
          breadcrumbSchema(trail.map((e) => ({ name: e.name, path: e.url }))),
        ]}
      />

      {/* ── Hero ──
          Deliberately three blocks deep. The answer paragraph that used to sit
          here pushed the first card off a phone screen, so it moved below the
          lead grid, where it still opens the prose half of the page. */}
      <section className="hero icp-hero features-hub-hero" id="hero">
        <div className="container">
          <div className="hero-content icp-hero-content">
            <BackHome />
            <Breadcrumb trail={trail} />
            <span className="section-label hero-overline">EVERYTHING TAKKADA DOES</span>
            <h1 className="hero-title icp-hero-title">
              Your Tally, opened from wherever the work is happening.
            </h1>
            <p className="hero-subtitle icp-hero-subtitle">
              The outstanding you were about to start chasing, the e-way bill the driver is waiting
              on, the order your salesman just booked at a counter forty kilometres away. The ones
              below are where most distributors start, and everything else is further down.
            </p>
          </div>
        </div>
      </section>

      {/* ── Lead tier ──
          The page's large images. Every page here is subtracted from the
          section it belongs to below, so no feature is linked twice. */}
      <section className="features-hub-lead" id="lead-features">
        <div className="container">
          <div className="features-hub-lead-grid">
            {lead.map((page, i) => (
              <Link
                key={page.slug}
                to={featurePagePath(page)}
                className="tally-card features-hub-card features-hub-card--lead"
              >
                <div className="features-hub-lead-media">
                  {/* Each page's own hero object, so the card shows the screen
                      the page opens with and there is no second asset list to
                      keep in step. The first card becomes the LCP element once
                      the intro shortens; the rest wait until they are scrolled
                      to. */}
                  <img
                    src={page.hero.image}
                    alt={page.hero.alt}
                    width={page.hero.width}
                    height={page.hero.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    decoding="async"
                  />
                </div>
                <div className="features-hub-lead-body">
                  <h3>{page.llms.title}</h3>
                  <p className="tabular-nums">{page.blurb}</p>
                  <span className="features-hub-card-cue">
                    Read the page <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          {/* The passage an AI-search engine lifts. It answers what this page is
              in its first sentence, so it stays high in the document even after
              leaving the hero. */}
          <p className="feature-answer features-hub-answer">
            Every page here is one job Takkada does on top of your existing Tally. Your licence,
            your company data and your numbering series stay exactly where they are. Start with
            whichever line describes the thing that went wrong last week.
          </p>
        </div>
      </section>

      {/* ── The sections ──
          Seven stops of the invoice's journey in the order it passes through
          them, then the two groups that are not moments in that journey:
          comparing Takkada with another app, and checking it was built for your
          line of trade. Each header carries the group's own intro and, for a
          stop, the stamp and screen that tie it to the homepage. */}
      <section className="tally-section features-hub-sections">
        <div className="container">
          {sections.map((group) => (
            <div key={group.id} className="features-hub-group" id={group.id}>
              {/* Retired ids, re-homed onto the section that swallowed what they
                  used to point at, so a link written before the regroup lands on
                  the right heading instead of the top of the page. */}
              {retiredAnchorsFor(group.id).map((id) => (
                <span key={id} id={id} className="features-hub-anchor" aria-hidden="true" />
              ))}
              <div className="features-hub-group-header">
                {/* Title and intro are one cell, so the mark beside them cannot
                    set the height of the gap between them. */}
                <div className="features-hub-group-prose">
                  <h2 className="features-hub-group-title">{group.title}</h2>
                  <p className="features-hub-group-intro">{group.intro}</p>
                </div>
                {group.stop && <StopMark stopId={group.stop} />}
              </div>
              {group.pages.length > 0 ? (
                <div className="tally-grid">
                  {group.pages.map((page) => (
                    <Link
                      key={page.slug}
                      to={featurePagePath(page)}
                      className="tally-card features-hub-card features-hub-card--text"
                    >
                      <h3>{page.llms.title}</h3>
                      <p className="tabular-nums">{page.blurb}</p>
                      <span className="features-hub-card-cue">
                        Read the page <ArrowRight size={15} />
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                /* A stop whose every page is a lead card at the top. It keeps
                   its header so the seven-stop spine stays whole, and says where
                   its pages went rather than heading nothing. No stop is in this
                   state today; the next lead promotion can put one there. */
                <p className="features-hub-group-empty">
                  Everything at this stop is in the cards at the top of the page.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              Not sure which of these you need.
              <br />
              Show us your Tally and we will say.
            </h2>
            <p>
              Fifteen minutes on a call, your setup on screen. We walk through your Tally version,
              how your team works today, and which of these pages is actually your problem.
            </p>
            <div className="final-cta-actions">
              <WhatsAppCTA context={WA_CONTEXT} variant="dark" />
              <CalendarCTA
                context={WA_CONTEXT}
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

export default Features;
