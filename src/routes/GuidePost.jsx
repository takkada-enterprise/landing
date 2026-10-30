import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import DemoTryCTA from '../components/DemoTryCTA';
import { Band, SectionHead, Card, CardGrid, CloseBand } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import '../ui/prose.css';
import { HOME_CLOSE } from '../data/home';
import { getGuideBySlug } from '../lib/guidePosts';
import { pageTitle } from '../lib/pageTitle';
import { articlePageSchema, breadcrumbSchema, DEFAULT_OG_IMAGE } from '../data/schema';

// The public manual's reader.
//
// Deliberately NOT a copy of BlogPost.jsx. Two things were left behind on
// purpose:
//
//   - `getStaticPaths`. BlogPost exports one and it has never run: routes are
//     registered with `lazy`, and vite-react-ssg only reads getStaticPaths off
//     the resolved route object, which `lazy: () => ({ Component })` never
//     puts it on. The blog is prerendered by includedRoutes in vite.config.js
//     instead, and so is this. Re-adding the export here would look like the
//     mechanism and be dead code.
//   - Blog-shaped structured data. An Article node is right for a procedure,
//     but every URL in it has to be a /guide URL. A stray /blog path in the
//     schema tells a crawler this page is one of the 232 marketing posts, and
//     nothing in a normal build would notice.
//
// A guide is also not dated content. It has no author byline and no publish
// date; what it has is `checkedAgainstAppOn`, the day a human last followed
// the procedure inside the real app. That date is the honest datePublished and
// dateModified, and it is printed on the page in a fixed sentence that
// scripts/checkGuidePrerender.mjs greps for in the built HTML.

const CHECKED_PREFIX = 'Checked against the app on ';

// marked emits the "Before you start" section as a flat run of top-level
// blocks under an <h2>. Wrapping that run in a <section> in place — never
// reordering it — turns the prerequisites into a visible, labelled callout
// without touching the authored Markdown. Exported so the boundary logic is
// tested rather than eyeballed.
const PREREQ_HEADING = '<h2>Before you start</h2>';

export function highlightPrerequisites(html) {
  const start = html.indexOf(PREREQ_HEADING);
  if (start === -1) return html;
  const next = html.indexOf('<h2', start + PREREQ_HEADING.length);
  const end = next === -1 ? html.length : next;
  return `${html.slice(0, start)}<section class="guide-prereq" aria-label="Before you start">${html.slice(start, end)}</section>${html.slice(end)}`;
}

// A guide's tables are wide (stage names, settings, what each button does) and
// the page body must never scroll sideways on a phone. Each table gets its own
// overflow-x container. marked emits bare `<table>` tags, so this is exact.
export function wrapTables(html) {
  return html
    .replace(/<table>/g, '<div class="guide-table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

export function prepareGuideHtml(html) {
  return wrapTables(highlightPrerequisites(html ?? ''));
}

// Related guides as text cards. `.guide-related` stays on the band: the route
// test finds the related links by it.
function RelatedGuides({ slugs }) {
  const related = (slugs ?? []).map(getGuideBySlug).filter(Boolean);
  if (related.length === 0) return null;

  return (
    <Band tone="ground" id="related" className="guide-related">
      <SectionHead title="Related guides" />
      <CardGrid cols={3}>
        {related.map((guide) => (
          <Card
            key={guide.slug}
            to={`/guide/${guide.slug}`}
            title={guide.title}
            line={guide.meta_description}
          />
        ))}
      </CardGrid>
    </Band>
  );
}

function GuideNotFound() {
  return (
    <main className="ui-feature ui-icp">
      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <h1 className="ui-hero-title">Guide not found</h1>
            <p className="ui-hero-lead">
              That guide has moved or does not exist. The full manual is one page away, and every
              topic is listed on it.
            </p>
            <p className="ui-hero-more">
              <Link className="ui-textlink" to="/guide">
                All guides
              </Link>
            </p>
          </div>
        </div>
      </Band>
    </main>
  );
}

function GuidePost() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);

  if (!guide) return <GuideNotFound />;

  const path = `/guide/${guide.slug}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guide' },
    { name: guide.title, path },
  ];
  const schemas = [
    articlePageSchema({
      headline: guide.title,
      description: guide.meta_description,
      image: DEFAULT_OG_IMAGE,
      // A guide has no publication date; the day it was last walked through in
      // the app is the only honest date it carries.
      datePublished: guide.checkedAgainstAppOn,
      dateModified: guide.checkedAgainstAppOn,
      author: 'Takkada',
      path,
    }),
    breadcrumbSchema(trail),
  ];

  return (
    <>
      <Seo
        title={pageTitle(guide.title, guide.meta_title)}
        description={guide.meta_description}
        path={path}
        ogType="article"
        schemas={schemas}
      />

      <main className="ui-feature ui-icp" data-guide-slug={guide.slug}>
        <Band tone="band" id="hero">
          <div className="ui-hero">
            <div className="ui-hero-copy">
              <Breadcrumb trail={trail.map((t) => ({ name: t.name, url: t.path }))} />
              <h1 className="ui-hero-title">{guide.title}</h1>
              <p className="ui-icp-meta tabular-nums">{`${CHECKED_PREFIX}${guide.checkedAgainstAppOn}`}</p>
            </div>
          </div>
        </Band>

        <Band tone="white" id="guide">
          <div className="ui-prose">
            <div dangerouslySetInnerHTML={{ __html: prepareGuideHtml(guide.html) }} />
            <p>
              <Link className="ui-textlink" to="/guide">
                All guides
              </Link>
            </p>
          </div>
        </Band>

        <RelatedGuides slugs={guide.relatedGuides} />

        <CloseBand id="close" title={HOME_CLOSE.title} accent={HOME_CLOSE.accent} cta={HOME_CLOSE.cta}>
          <DemoTryCTA context="guide">{HOME_CLOSE.cta.label}</DemoTryCTA>
        </CloseBand>
      </main>
    </>
  );
}

export default GuidePost;
