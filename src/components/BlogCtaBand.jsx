import { Link } from 'react-router-dom';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import { CloseBand } from '../ui';
import { demoEntryLive } from '../data/siteContent';

// The one conversion band under every blog surface (~118 posts + index).
// Being a single component is the point: changing it moves every article
// into the current funnel at once. Since the Campfire rebuild (plan
// 2026-10-30-003, Task 8) it is a CloseBand: WhatsApp is the pill (context
// 'blog'), and the secondary is a text link, the kept CalendarCTA until the
// app entry is live (U9), then an internal link to /demo, where the phone
// capture modal waits. Its lead line and action row are styled by icp.css
// (.ui-icp root on the blog pages).
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
    <CloseBand id="close" title={heading}>
      <p className="ui-close-lead">{body}</p>
      <div className="ui-close-actions">
        <WhatsAppCTA context="blog" tone="accent" />
        {demoEntryLive ? (
          <Link to="/demo" className="ui-textlink">
            Try the demo <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <CalendarCTA context="blog" />
        )}
      </div>
    </CloseBand>
  );
}

export default BlogCtaBand;
