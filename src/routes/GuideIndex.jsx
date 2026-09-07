import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getAllGuides } from '../lib/guidePosts';
import { breadcrumbSchema, collectionPageSchema } from '../data/schema';

// The manual's hub: every guide, once, grouped by the job somebody came here to
// finish. No search in v1 — twenty-one entries fit on a screen, and a search box
// that returns nothing for "GST return" would be worse than the list.
//
// The grouping is site information architecture, not content, so it lives here
// rather than in content/guide/topics.json: which drawer "party ledger" belongs
// in is a navigation decision, and putting it in the registry would invite the
// next editor to renumber the catalog to fix the hub. The cost of that choice
// is that a new topic could be added to topics.json and forgotten here — so
// src/routes/__tests__/guide-pages.test.jsx asserts, against the real registry,
// that every topic is named in exactly one group. groupGuides() additionally
// keeps an unclaimed guide visible under "More guides" rather than dropping it,
// because a guide missing from the hub is a page nothing links to.

export const GUIDE_GROUPS = [
  {
    id: 'getting-started',
    title: 'Setting up',
    description: 'Connect Tally, tell Takkada which ledgers are which, and add your people.',
    slugs: ['home', 'connect-tally', 'ledger-mapping', 'tally-sync', 'team-access'],
  },
  {
    id: 'money',
    title: 'Money in and out',
    description: 'Who owes what, what you have collected, and chasing the rest.',
    slugs: [
      'bills-and-outstanding',
      'party-ledger',
      'record-receipt',
      'record-payment',
      'whatsapp-reminders',
    ],
  },
  {
    id: 'billing',
    title: 'Bills and notes',
    description: 'Making a bill, checking its GST, and correcting one after it has gone out.',
    slugs: ['sales-invoice', 'gst-on-the-bill', 'purchase-invoice', 'credit-and-debit-notes'],
  },
  {
    id: 'orders-and-dispatch',
    title: 'Orders and dispatch',
    description: 'Taking an order, loading a van, and recording what actually went out.',
    slugs: ['sales-orders', 'dispatch', 'customer-order-link'],
  },
  {
    id: 'gst-documents',
    title: 'E-invoice and e-way bill',
    description: 'Generating the government documents a bill needs before it travels.',
    slugs: ['e-invoice', 'e-way-bill'],
  },
  {
    id: 'sending-and-importing',
    title: 'Sending and importing documents',
    description: 'Getting documents out to customers, and getting paperwork back in.',
    slugs: ['whatsapp-invoice-delivery', 'import-documents'],
  },
];

// The catch-all. It should stay empty; the coverage test above makes sure it
// does, and if a topic ever slips through, the guide is still on the hub.
const UNGROUPED = {
  id: 'more',
  title: 'More guides',
  description: 'Everything else in the manual.',
};

export function groupGuides(guides) {
  const bySlug = new Map(guides.map((guide) => [guide.slug, guide]));
  const claimed = new Set();

  const groups = GUIDE_GROUPS.map((group) => ({
    ...group,
    guides: group.slugs
      .map((slug) => {
        const guide = bySlug.get(slug);
        if (guide) claimed.add(slug);
        return guide;
      })
      .filter(Boolean),
  }));

  const leftovers = guides.filter((guide) => !claimed.has(guide.slug));
  if (leftovers.length > 0) groups.push({ ...UNGROUPED, guides: leftovers });

  return groups.filter((group) => group.guides.length > 0);
}

// Kept in sync with GUIDE_HUB in scripts/checkGuidePrerender.mjs, which greps
// the built HTML for exactly these strings. The route test asserts the two
// copies are equal, so they cannot drift apart silently. The build script
// cannot be imported here — it reads the filesystem.
const HUB_H1 = 'How to use Takkada';
const HUB_TITLE = 'Takkada guides: how to use the app';
const HUB_DESCRIPTION =
  'Step-by-step guides for Takkada: connecting Tally, mapping ledgers, making bills, recording receipts, loading a van, e-invoices and WhatsApp reminders.';

function GuideCard({ guide }) {
  return (
    <Link className="guide-hub-card" to={`/guide/${guide.slug}`}>
      <h3>{guide.title}</h3>
      <p>{guide.meta_description}</p>
    </Link>
  );
}

function GuideIndex() {
  const guides = getAllGuides();
  const groups = groupGuides(guides);

  const schemas = [
    collectionPageSchema({
      name: HUB_TITLE,
      description: HUB_DESCRIPTION,
      path: '/guide',
      items: guides.map((guide) => ({
        name: guide.title,
        description: guide.meta_description,
        path: `/guide/${guide.slug}`,
      })),
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guide' },
    ]),
  ];

  return (
    <>
      <Seo
        title={HUB_TITLE}
        description={HUB_DESCRIPTION}
        path="/guide"
        ogType="website"
        schemas={schemas}
      />

      <main className="guide-hub-page">
        <div className="guide-container">
          <header className="guide-hub-header">
            <p className="overline">TAKKADA GUIDES</p>
            <h1>{HUB_H1}</h1>
            <p className="guide-hub-subtitle">
              Every screen, in the order you would actually use it. Each guide says what your
              company and your login need before you start, then gives you the steps.
            </p>
          </header>

          {groups.map((group) => (
            <section
              className="guide-hub-group"
              key={group.id}
              id={group.id}
              aria-labelledby={`${group.id}-heading`}
            >
              <h2 id={`${group.id}-heading`}>{group.title}</h2>
              <p className="guide-hub-group-blurb">{group.description}</p>
              <div className="guide-hub-grid">
                {group.guides.map((guide) => (
                  <GuideCard key={guide.slug} guide={guide} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

export default GuideIndex;
