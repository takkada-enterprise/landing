import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { getAllPosts, getPostBySlug, getSlugs } from '../lib/blogPosts';
import { articleSchema, breadcrumbSchema, faqPageSchema } from '../data/schema';
import { getAuthor } from '../data/authors';

const DEMO_URL = 'https://calendar.notion.so/meet/ronakmalu/takkada';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function getStaticPaths() {
  return getSlugs().map((slug) => `/blog/${slug}`);
}

function RelatedPosts({ currentSlug }) {
  const related = getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

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
        title={post.meta_title || `${post.title} — Takkada`}
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

        <section className="blog-cta-band">
          <div className="container">
            <div className="blog-cta-card">
              <h2 className="blog-cta-heading">See this in action for your business</h2>
              <p className="blog-cta-body">
                15 minutes. We show you your own Tally data on your phone, live.
              </p>
              <a href={DEMO_URL} className="cta-btn cta-btn--primary" target="_blank" rel="noopener noreferrer">
                Book a 15-min demo
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default BlogPost;
