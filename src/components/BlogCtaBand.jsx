import WhatsAppCTA from './WhatsAppCTA';
import { appLinks } from '../data/siteContent';
import { track } from '../lib/track';

// The one conversion band under every blog surface (~118 posts + index).
// Being a single component is the point: changing it moves every article
// into the current funnel at once. WhatsApp leads (context 'blog'),
// calendar stays as the visible secondary path.
// U9 note: when the /demo/ share page ships, add "Try the demo" here as the
// secondary action and demote the calendar link to a text line.
function BlogCtaBand({
  heading = 'See this in action for your business',
  body = '15 minutes. We show you your own Tally data on your phone, live.',
}) {
  return (
    <section className="blog-cta-band">
      <div className="container">
        <div className="blog-cta-card">
          <h2 className="blog-cta-heading">{heading}</h2>
          <p className="blog-cta-body">{body}</p>
          <div className="blog-cta-actions">
            <WhatsAppCTA context="blog" />
            <a
              href={appLinks.bookDemo}
              className="cta-btn cta-btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('calendar_open', { cta_context: 'blog' })}
            >
              Book a 15-min demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogCtaBand;
