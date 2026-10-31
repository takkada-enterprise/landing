import Seo from '../components/Seo';
import BlogCtaBand from '../components/BlogCtaBand';
import { Band, Card, CardGrid } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import { getAllPosts } from '../lib/blogPosts';
import { breadcrumbSchema } from '../data/schema';

const indianDateFormatter = new Intl.DateTimeFormat('en-IN', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  return indianDateFormatter.format(new Date(dateStr));
}

function BlogIndex() {
  const posts = getAllPosts();

  const schemas = [
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Blog', path: '/blog' },
    ]),
  ];

  return (
    <>
      <Seo
        title="Distributor Collections & Tally Guides | Takkada Blog"
        description="Practical guides for Indian distributors on payment collection, Tally workflows, and reducing outstanding receivables."
        path="/blog"
        ogType="website"
        schemas={schemas}
      />

      <main className="ui-feature ui-icp">
        <Band tone="band" id="hero">
          <div className="ui-hero">
            <div className="ui-hero-copy">
              <h1 className="ui-hero-title">Notes for distributors who run on Tally</h1>
              <p className="ui-hero-lead">
                Practical notes on receivables, Tally workflows, and running a tighter collections operation.
              </p>
            </div>
          </div>
        </Band>

        <Band tone="white" id="posts">
          <CardGrid>
            {posts.map((post) => (
              <Card key={post.slug} to={`/blog/${post.slug}`} title={post.title} line={post.excerpt}>
                <time className="ui-card-line tabular-nums" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
              </Card>
            ))}
          </CardGrid>
        </Band>

        <BlogCtaBand heading="See how Takkada works for your business" />
      </main>
    </>
  );
}

export default BlogIndex;
