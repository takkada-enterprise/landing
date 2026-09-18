import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import { FEATURE_PAGES, featurePagePath } from '../data/featurePages';
import {
  FEATURE_BLURBS,
  drainedGroupIds,
  leadFeaturePages,
  retiredAnchorsFor,
  secondaryFeatureGroups,
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
// Three tiers, not nine equal groups (2026-08-11). Nine headings over
// twenty-seven identical text cards is a wall of grey to anyone who does not
// already know the name of the thing they want, so the page now opens with the
// features distributors actually arrive for, shown with the screen they will be
// looking at, and lets the rest settle into a compact index underneath. The
// lead card is the one new pattern on the page (craft rule 10) and the only
// place it carries an image; everything below it reuses .tally-card and plain
// links.
//
// Grouped by the invoice's journey (2026-09-18). The themes the compact index
// reads out are now the seven stops of the homepage's story, in that order,
// each under the stamp its slip carries, so somebody who arrives from the
// homepage finds the same seven words rather than a second taxonomy. The seven
// ids that regroup retired are still linkable: RETIRED_GROUP_ANCHORS maps each
// one onto the group that took its pages and the index renders it there.
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
// Both are decoration. The heading beside them already says what the section
// is, so the stamp is hidden from assistive tech and the screen carries an
// empty alt rather than describing a thumbnail nobody can read.
function StopMark({ stopId }) {
  const stop = STOPS.find((s) => s.id === stopId);
  if (!stop) return null;
  const shot = stop.screens.length > 0 ? screen(stop.screens[0]) : null;

  return (
    <div className="features-hub-stop" aria-hidden="true">
      {shot && (
        <img
          className="features-hub-stop-shot"
          src={shot.src}
          srcSet={shot.srcSet}
          sizes="56px"
          width={shot.width}
          height={shot.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}
      <span className={`features-hub-stamp features-hub-stamp--${stop.stamp.tone}`}>
        {stop.stamp.text}
      </span>
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
  const index = secondaryFeatureGroups(FEATURE_PAGES);
  const drained = drainedGroupIds(FEATURE_PAGES);

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
          The page's large images; the index below carries thumbnails a tenth
          the size. Group ids drained by the promotion are re-homed here so
          anchors that have been linkable since the hub shipped still land
          somewhere sensible. Empty today, and kept because the next promotion
          can drain a group again. */}
      <section className="features-hub-lead" id="lead-features">
        <div className="container">
          {drained.map((id) => (
            <span key={id} id={id} className="features-hub-anchor" aria-hidden="true" />
          ))}
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

      {/* ── Labelled sections ──
          Comparisons and trade pages. A visitor reaches these in a different
          frame of mind from someone shopping for a capability, so they keep
          their own headings instead of dissolving into the index below. */}
      <section className="tally-section features-hub-sections">
        <div className="container">
          {sections.map((group) => (
            <div key={group.id} className="features-hub-group" id={group.id}>
              <div className="features-hub-group-header">
                <h2 className="features-hub-group-title">{group.title}</h2>
                <p className="features-hub-group-intro">{group.intro}</p>
              </div>
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
            </div>
          ))}
        </div>
      </section>

      {/* ── Compact index ──
          Everything not already above, title-only. Quiet on purpose: this is
          the part you scan for a name you already have in mind.

          Since the journey regroup these headings are the seven stops of the
          homepage's story, in the order the invoice passes through them, each
          under its stamp and a thumbnail of the screen it opens with. The tier
          itself keeps its shape: the links stay names and nothing else, which
          is what makes this the part you can scan. */}
      <section className="features-hub-index" id="all-features">
        <div className="container">
          <h2 className="features-hub-index-title">Everything else, in the order it happens</h2>
          <div className="features-hub-index-grid">
            {index.map((group) => (
              <div key={group.id} className="features-hub-index-group" id={group.id}>
                {/* Retired group ids, re-homed onto the section that swallowed
                    their pages, so a link written before the regroup lands on
                    the right heading instead of the top of the page. */}
                {retiredAnchorsFor(group.id).map((id) => (
                  <span key={id} id={id} className="features-hub-anchor" aria-hidden="true" />
                ))}
                {/* Sibling of the heading rather than wrapped with it: on a
                    phone the two swap places, and a wrapper would put the
                    reorder out of the flex container's reach. */}
                {group.stop && <StopMark stopId={group.stop} />}
                <h3 className="features-hub-index-heading">{group.title}</h3>
                <ul className="features-hub-index-list">
                  {group.pages.map((page) => (
                    <li key={page.slug}>
                      <Link
                        to={featurePagePath(page)}
                        className="features-hub-card features-hub-card--index"
                      >
                        {page.llms.title}
                      </Link>
                    </li>
                  ))}
                </ul>
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
