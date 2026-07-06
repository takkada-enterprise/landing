import CTAButton from './CTAButton';
import WhatsAppCTA from './WhatsAppCTA';
import { appLinks, demoEntryLive } from '../data/siteContent';
import { track } from '../lib/track';

// The "try it yourself" action (plan 2026-07-06-001, U9). While the app's
// anonymous demo entry is not yet live (demoEntryLive=false in
// siteContent.js), this renders the WhatsApp CTA with the demo context
// instead — the page never ships a dead app link. Once live, it is a plain
// anchor into the app's /demo route, tracked as demo_try_click.
function DemoTryCTA({ context = 'demo', variant = 'primary', children }) {
  if (!demoEntryLive) {
    return <WhatsAppCTA context="demo" variant={variant} />;
  }

  return (
    <CTAButton
      variant={variant}
      href={appLinks.demoApp}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('demo_try_click', { cta_context: context })}
    >
      {children || 'Try it yourself'}
    </CTAButton>
  );
}

export default DemoTryCTA;
