import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import { FEATURE_PAGES, featurePagePath } from '../data/featurePages';
import { FEATURE_BLURBS, groupFeaturePages } from '../data/featureGroups';
import { breadcrumbSchema, SITE_URL, absoluteUrl } from '../data/schema';

// The /features hub. Until this page existed the 26 feature landing pages hung
// off the footer alone and the nav's "Features" item scrolled to a homepage
// section, so Google read every one of them as an afterthought. This is their
// index page and the nav's destination.
//
// It renders from FEATURE_PAGES, the same array that drives the routes, the
// sitemap, llms.txt and the footer, so a new landing page joins the hub the
// moment it is added. Grouping and the directory lines come from
// src/data/featureGroups.js.
//
// Deliberately light: a directory, not 26 hero sections. No motion of its own
// beyond the card hover the shared .tally-card already carries, and no new
// visual pattern (CLAUDE.md craft rule 10) apart from the group spacing.

const WA_CONTEXT = 'features-hub';

const seo = {
  title: 'All Features for Distributors on Tally | Takkada',
  description:
    'Every Takkada feature for a distributor on Tally: mobile invoicing, UPI collection, WhatsApp reminders, e-invoice, e-way bill, stock and salesman tracking.',
  path: '/features',
};

const trail = [
  { name: 'Home', url: `${SITE_URL}/` },
  { name: 'Features', url: `${SITE_URL}/features/` },
];

// CollectionPage wrapping an ItemList, so a crawler reads the hub as a
// directory of 26 named pages rather than one more marketing page.
function collectionSchema(groups) {
  const entries = groups.flatMap((group) => group.pages);
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Takkada features for distributors on Tally',
    description: seo.description,
    url: absoluteUrl('/features'),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: entries.length,
      itemListElement: entries.map((page, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: page.llms.title,
        description: FEATURE_BLURBS[page.slug] ?? page.llms.summary,
        url: absoluteUrl(featurePagePath(page)),
      })),
    },
  };
}

function Features() {
  const groups = groupFeaturePages(FEATURE_PAGES);

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[
          collectionSchema(groups),
          breadcrumbSchema(trail.map((e) => ({ name: e.name, path: e.url }))),
        ]}
      />

      {/* ── Hero ── */}
      <section className="hero icp-hero" id="hero">
        <div className="container">
          <div className="hero-content icp-hero-content">
            <Breadcrumb trail={trail} />
            <span className="section-label hero-overline">EVERYTHING TAKKADA DOES</span>
            <h1 className="hero-title icp-hero-title">
              Your Tally, opened from wherever the work is happening.
            </h1>
            <p className="hero-subtitle icp-hero-subtitle">
              The outstanding you were about to start chasing, the e-way bill the driver is waiting
              on, the order your salesman just booked at a counter forty kilometres away. Each one
              of those is a page below.
            </p>
            <p className="feature-answer">
              Every page here is one job Takkada does on top of your existing Tally. Your licence,
              your company data and your numbering series stay exactly where they are. Start with
              whichever line describes the thing that went wrong last week.
            </p>
          </div>
        </div>
      </section>

      {/* ── The directory ── */}
      <section className="tally-section features-hub" id="all-features">
        <div className="container">
          {groups.map((group) => (
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
                    className="tally-card features-hub-card"
                  >
                    <h3>{page.llms.title}</h3>
                    <p>{FEATURE_BLURBS[page.slug] ?? page.llms.summary}</p>
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
