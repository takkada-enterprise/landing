import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import WhatsAppCTA from '../components/WhatsAppCTA';
import DemoTryCTA from '../components/DemoTryCTA';
import { Band, SectionHead, Card, CardGrid, Shot, CloseBand } from '../ui';
// The feature-page skin carries the hero this page shares with it (every
// rule is prefixed .ui-feature).
import '../ui/feature.css';
import { FEATURE_PAGES, featurePagePath, getFeaturePage } from '../data/featurePages';
import { FEATURE_BLURBS, FEATURE_GROUPS, retiredAnchorsFor } from '../data/featureGroups';
import { HOME_CLOSE } from '../data/home';
import { absoluteUrl, breadcrumbSchema, collectionPageSchema } from '../data/schema';

// The /features hub on the Campfire template (plan 2026-10-30-003, Task 6): a
// dark hero, then one band per FEATURE_GROUPS entry in order, each a grid of
// picture cards (the page's name, its directory line, the screen the page opens
// with), then the close band. It renders from FEATURE_PAGES, the same array that
// drives the routes, the sitemap and llms.txt, so a new page joins the hub the
// moment featureGroups.js names it.
//
// `features-hub-card` is a BUILD CONTRACT, not styling: scripts/
// checkFeaturesHub.mjs counts anchors carrying that class in the raw HTML and
// fails the build if any feature page is missing one. Nothing that is not a
// feature page may carry it.
//
// Motion: none of its own.

const WA_CONTEXT = 'features-hub';
const CARD_SIZES = '(max-width: 899px) 80vw, 300px';

// Every group with its pages, FEATURE_GROUPS order; an unknown slug drops out
// (the hub test fails on it first).
const GROUPS = FEATURE_GROUPS.map((g) => ({ ...g, pages: g.slugs.map(getFeaturePage).filter(Boolean) }));

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
  return (
    <div className="ui-feature">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[
          hubSchema(),
          breadcrumbSchema(trail.map((e) => ({ name: e.name, path: e.url }))),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb trail={trail} />
            <h1 className="ui-hero-title">Everything Tally does, on your phone.</h1>
            {/* The passage an AI-search engine lifts: what this page is, first sentence. */}
            <p className="ui-hero-lead">
              Every page here is one job Takkada does on top of your existing Tally. Your licence,
              your company data and your numbering series stay exactly where they are. Start with
              whichever line describes the thing that went wrong last week.
            </p>
            <div className="ui-hero-actions">
              <DemoTryCTA context={WA_CONTEXT} />
              <WhatsAppCTA context={WA_CONTEXT} tone="ghost" />
            </div>
          </div>
        </div>
      </Band>

      {GROUPS.map((group, i) => (
        <Band key={group.id} id={group.id} tone={i % 2 ? 'white' : 'ground'}>
          {/* Retired ids, re-homed onto the group that took their pages, so a
              link written before the regroup lands on the right heading. */}
          {retiredAnchorsFor(group.id).map((id) => (
            <span key={id} id={id} aria-hidden="true" />
          ))}
          <SectionHead title={group.title} lead={group.intro} />
          <CardGrid cols={3}>
            {group.pages.map((page) => (
              <Card
                key={page.slug}
                to={featurePagePath(page)}
                className="features-hub-card"
                title={page.llms.title}
                line={FEATURE_BLURBS[page.slug] ?? page.llms.summary}
              >
                <Shot screen={page.hero.screen} sizes={CARD_SIZES} />
              </Card>
            ))}
          </CardGrid>
        </Band>
      ))}

      <CloseBand id="close" title={HOME_CLOSE.title} accent={HOME_CLOSE.accent} cta={HOME_CLOSE.cta}>
        <DemoTryCTA context={WA_CONTEXT}>{HOME_CLOSE.cta.label}</DemoTryCTA>
      </CloseBand>
    </div>
  );
}

export default Features;
