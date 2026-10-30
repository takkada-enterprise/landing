import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Seo from '../components/Seo';
import BlogCtaBand from '../components/BlogCtaBand';
import Breadcrumb from '../components/Breadcrumb';
import { Band, SectionHead, Card, CardGrid } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import '../ui/prose.css';
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

function RelatedPosts({ currentSlug }) {
  const related = getAllPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Band tone="ground" id="related">
      <SectionHead title="More from Takkada" />
      <CardGrid cols={3}>
        {related.map((post) => (
          <Card key={post.slug} to={`/blog/${post.slug}`} title={post.title} line={post.excerpt} />
        ))}
      </CardGrid>
    </Band>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    const container = document.querySelector('.ui-prose');
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
      <main className="ui-feature ui-icp">
        <Band tone="band" id="hero">
          <h1 className="ui-hero-title">Post not found</h1>
          <p className="ui-hero-more">
            <Link to="/blog" className="ui-textlink">← Back to blog</Link>
          </p>
        </Band>
      </main>
    );
  }

  const author = getAuthor(post.author);
  const authorName = author?.name ?? post.author;
  const authorHref = author?.linkedin || author?.url || null;

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const schemas = [
    articleSchema(post),
    breadcrumbSchema(trail),
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

      <main className="ui-feature ui-icp">
        <Band tone="band" id="hero">
          <div className="ui-hero">
            <div className="ui-hero-copy">
              <Breadcrumb trail={trail.map((t) => ({ name: t.name, url: t.path }))} />
              <h1 className="ui-hero-title">{post.title}</h1>
              <p className="ui-icp-meta">
                {authorHref ? (
                  <a href={authorHref} target="_blank" rel="noopener noreferrer author">
                    {authorName}
                  </a>
                ) : (
                  authorName
                )}
                {' · '}
                <time className="tabular-nums" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </p>
            </div>
          </div>
        </Band>

        <Band tone="white" id="post">
          <div className="ui-prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </Band>

        <RelatedPosts currentSlug={slug} />

        <BlogCtaBand />
      </main>
    </>
  );
}

export default BlogPost;
