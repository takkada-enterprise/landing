import { Link } from 'react-router-dom';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import { demoEntryLive } from '../data/siteContent';

// The one conversion band under every blog surface (~118 posts + index).
// Being a single component is the point: changing it moves every article
// into the current funnel at once. WhatsApp leads (context 'blog'); the
// secondary is "Try the demo" once the app entry is live (U9), calendar
// booking until then.
function BlogCtaBand({
  heading = 'See this in action for your business',
  body = (
    <>
      <span className="tabular-nums">15</span> minutes. We show you your own Tally data on your
      phone, live.
    </>
  ),
}) {
  return (
    <section className="blog-cta-band">
      <div className="container">
        <div className="blog-cta-card">
          <h2 className="blog-cta-heading">{heading}</h2>
          <p className="blog-cta-body">{body}</p>
          <div className="blog-cta-actions">
            <WhatsAppCTA context="blog" />
            {demoEntryLive ? (
              <Link to="/demo" className="cta-btn cta-btn--secondary">
                Try the demo
              </Link>
            ) : (
              <CalendarCTA context="blog" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogCtaBand;
