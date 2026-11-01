import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Link from '../components/SiteLink.jsx';
import Seo from '../components/Seo';
import BlogCtaBand from '../components/BlogCtaBand';
import { getAllPosts, getPostBySlug, getSlugs } from '../lib/blogPosts';
import { articleSchema, breadcrumbSchema, faqPageSchema } from '../data/schema';
import { getAuthor } from '../data/authors';
import { pageTitle } from '../lib/pageTitle';

const indianDateFormatter = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  return indianDateFormatter.format(new Date(dateStr));
}

export function getStaticPaths() {
  return getSlugs().map((slug) => `/blog/${slug}`);
}

// Related posts walk a ring: every post, grouped by category and newest first
// within it, links to the next three on the ring. Each post therefore links to
// its nearest same-topic neighbours and is linked FROM three others. This used
// to be "the three newest posts", which put ~676 links on three posts and none
// on the other ~330; Search Console left 86 of them "Discovered, currently not
// indexed" (2026-10-23). scripts/checkInternalLinks.mjs warns on any page with
// fewer than three inbound pages.
const RELATED_COUNT = 3;
function buildRing(posts) {
  return [...posts].sort(
    (a, b) =>
      String(a.category ?? '').localeCompare(String(b.category ?? '')) ||
      new Date(b.date) - new Date(a.date) ||
      a.slug.localeCompare(b.slug)
  );
}
let siteRing;
export function relatedPostsFor(currentSlug, posts) {
  const ring = posts ? buildRing(posts) : (siteRing ??= buildRing(getAllPosts()));
  const at = ring.findIndex((p) => p.slug === currentSlug);
  if (at === -1) return ring.slice(0, RELATED_COUNT);
  const count = Math.min(RELATED_COUNT, ring.length - 1);
  return Array.from({ length: count }, (_, i) => ring[(at + 1 + i) % ring.length]);
}

function RelatedPosts({ currentSlug }) {
  const related = relatedPostsFor(currentSlug);

  if (related.length === 0) return null;

  return (
    <aside className="blog-related">
      <h2 className="blog-related-heading">More from Takkada</h2>
      <div className="blog-related-list">
        {related.map((post) => (
          <article key={post.slug} className="blog-related-card">
            <Link to={`/blog/${post.slug}`} className="blog-related-thumb" aria-hidden="true" tabIndex={-1}>
              <img src={post.heroImage} alt="" loading="lazy" />
            </Link>
            <span className="blog-category-tag">{post.category}</span>
            <h3 className="blog-related-title">
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>
            <p className="blog-related-excerpt">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </aside>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    const container = document.querySelector('.blog-post-body');
    if (!container) return undefined;
    const handleClick = (e) => {
      const playBtn = e.target.closest('.call-player-play');
      if (playBtn) {
        const player = playBtn.closest('.call-player');
        const audio = player?.querySelector('audio');
        if (audio) {
          if (audio.paused) {
            audio.play().catch(() => {});
            player.classList.add('playing');
            playBtn.setAttribute('aria-pressed', 'true');
          } else {
            audio.pause();
            player.classList.remove('playing');
            playBtn.setAttribute('aria-pressed', 'false');
          }
        }
      }
    };
    container.addEventListener('click', handleClick);
    return () => container.removeEventListener('click', handleClick);
  }, [slug]);

  if (!post) {
    return (
      <main className="blog-post-page">
        <div className="container">
          <h1>Post not found</h1>
          <Link to="/blog">← Back to blog</Link>
        </div>
      </main>
    );
  }

  const author = getAuthor(post.author);
  const authorName = author?.name ?? post.author;
  const authorHref = author?.linkedin || author?.url || null;

  const schemas = [
    articleSchema(post),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
      { name: post.title, path: `/blog/${post.slug}` },
    ]),
    post.faqs?.length > 0 ? faqPageSchema(post.faqs) : null,
  ].filter(Boolean);

  return (
    <>
      <Seo
        title={pageTitle(post.title, post.meta_title)}
        description={post.meta_description}
        path={`/blog/${post.slug}`}
        ogImage={post.heroImage}
        ogType="article"
        schemas={schemas}
      />

      <main className="blog-post-page">
        <article className="blog-post-article">
          <header className="blog-post-header">
            <div className="blog-prose">
              <nav className="blog-breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
              </nav>
              <span className="blog-category-tag blog-category-tag--on-dark">
                {post.category}
              </span>
              <h1 className="blog-post-title">{post.title}</h1>
              <div className="blog-post-byline">
                <span className="blog-author">
                  {authorHref ? (
                    <a
                      className="blog-author-link"
                      href={authorHref}
                      target="_blank"
                      rel="noopener noreferrer author"
                    >
                      {authorName}
                    </a>
                  ) : (
                    authorName
                  )}
                </span>
                <span className="blog-byline-sep" aria-hidden="true">·</span>
                <time className="blog-date tabular-nums" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </div>
            </div>
          </header>

          <figure className="blog-post-hero-image">
            <img
              src={post.heroImage}
              alt={post.heroAlt}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </figure>

          <div className="blog-prose">
            <div
              className="blog-post-body"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </article>

        <div className="blog-related-wrap">
          <RelatedPosts currentSlug={slug} />
        </div>

        <BlogCtaBand />
      </main>
    </>
  );
}

export default BlogPost;
