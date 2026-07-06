import CTAButton from './CTAButton';
import { appLinks } from '../data/siteContent';
import { track } from '../lib/track';

// The one calendar-booking action, everywhere it appears. Calendar booking
// is the site-wide secondary path next to the WhatsApp CTA; keeping it a
// single component means the URL, the rel attributes, and the
// `calendar_open` event stay in lockstep across every surface (a missed
// copy would silently corrupt the funnel metrics this overhaul measures).
// U9 note: when the /demo/ share page ships and CTA hierarchies shift,
// this is the only file the calendar action changes in.
function CalendarCTA({
  context,
  variant = 'button',
  buttonVariant = 'secondary',
  className = '',
  children,
}) {
  const label = children || (
    <>
      Book a <span className="tabular-nums">15-min</span> demo
    </>
  );
  const handleClick = () => track('calendar_open', { cta_context: context });

  if (variant === 'link') {
    return (
      <a
        href={appLinks.bookDemo}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
      >
        {label}
      </a>
    );
  }

  return (
    <CTAButton
      variant={buttonVariant}
      className={className}
      href={appLinks.bookDemo}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {label}
    </CTAButton>
  );
}

export default CalendarCTA;
