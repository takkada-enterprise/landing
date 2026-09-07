import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getGuideBySlug } from '../lib/guidePosts';
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

function RelatedGuides({ slugs }) {
  const related = (slugs ?? []).map(getGuideBySlug).filter(Boolean);
  if (related.length === 0) return null;

  return (
    <aside className="guide-related" aria-labelledby="guide-related-heading">
      <h2 id="guide-related-heading">Related guides</h2>
      <ul>
        {related.map((guide) => (
          <li key={guide.slug}>
            <Link to={`/guide/${guide.slug}`}>{guide.title}</Link>
            {guide.meta_description ? <span>{guide.meta_description}</span> : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function GuideNotFound() {
  return (
    <main className="guide-page guide-page--missing">
      <div className="guide-container">
        <h1>Guide not found</h1>
        <p>
          That guide has moved or does not exist. The full manual is one page away, and every
          topic is listed on it.
        </p>
        <Link className="guide-back" to="/guide">
          All guides
        </Link>
      </div>
    </main>
  );
}

function GuidePost() {
  const { slug } = useParams();
  const guide = getGuideBySlug(slug);

  if (!guide) return <GuideNotFound />;

  const path = `/guide/${guide.slug}`;
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
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guide' },
      { name: guide.title, path },
    ]),
  ];

  return (
    <>
      <Seo
        title={guide.meta_title || `${guide.title} — Takkada`}
        description={guide.meta_description}
        path={path}
        ogType="article"
        schemas={schemas}
      />

      <main className="guide-page" data-guide-slug={guide.slug}>
        <div className="guide-container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/guide">Guides</Link>
          </nav>

          <article className="guide-article">
            <header className="guide-article-header">
              <h1>{guide.title}</h1>
              <p className="guide-checked">{`${CHECKED_PREFIX}${guide.checkedAgainstAppOn}`}</p>
            </header>

            <div
              className="guide-prose"
              dangerouslySetInnerHTML={{ __html: prepareGuideHtml(guide.html) }}
            />
          </article>

          <RelatedGuides slugs={guide.relatedGuides} />

          <Link className="guide-back" to="/guide">
            All guides
          </Link>
        </div>
      </main>
    </>
  );
}

export default GuidePost;
