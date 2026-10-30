import { appLinks } from '../data/siteContent';
import { track } from '../lib/track';

// The one calendar-booking action, everywhere it appears, and the only
// "Book a 15-min demo" renderer on the site. Keeping it a single component
// means the URL, the rel attributes, and the `calendar_open` event stay in
// lockstep across every surface (a missed copy would silently corrupt the
// funnel metrics). Since the Campfire rebuild (plan 2026-10-30-003) it is
// always a `ui-textlink` beside a Pill; the old `variant` and `buttonVariant`
// props are ignored until the pages that pass them are re-templated.
function CalendarCTA({ context, className = '', children }) {
  const label = children || (
    <>
      Book a 15-min demo <span aria-hidden="true">→</span>
    </>
  );
  return (
    <a
      href={appLinks.bookDemo}
      className={`ui-textlink${className ? ` ${className}` : ''}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('calendar_open', { cta_context: context })}
    >
      {label}
    </a>
  );
}

export default CalendarCTA;
