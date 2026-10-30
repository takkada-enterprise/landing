import Pill from '../ui/Pill';
import { usePhoneModal } from '../context/PhoneModalContext';
import { demoEntryLive } from '../data/siteContent';
import { track } from '../lib/track';

// The "try the demo" action, the site's sign-up path. Once live it opens the
// phone capture modal rather than linking out. That is deliberate and not a
// styling choice: the number has to be captured before the visitor leaves
// (D2), and an href would let a middle-click or a copied link reach the demo
// with no lead recorded at all. While demoEntryLive is false it is a plain
// link to the /demo page.
//
// tone and onClick reach BOTH branches on purpose: a caller that needs to
// close itself first (the nav sheet) would otherwise leave its overlay open
// behind the modal on the day the flag moves.
function DemoTryCTA({ context = 'demo', tone = 'accent', onClick, children }) {
  const { openWith } = usePhoneModal();
  const label = children || 'Try the demo';

  if (!demoEntryLive) {
    return (
      <Pill
        to="/demo"
        tone={tone}
        onClick={() => {
          track('demo_try_click', { cta_context: context });
          if (onClick) onClick();
        }}
      >
        {label}
      </Pill>
    );
  }

  return (
    <Pill
      tone={tone}
      onClick={() => {
        track('demo_try_click', { cta_context: context });
        if (onClick) onClick();
        openWith({
          destination: 'demo',
          title: 'Open the live demo',
          subtitle: 'We will text you a 6-digit code to open the demo on this phone.',
          submitLabel: 'Send code',
        });
      }}
    >
      {label}
    </Pill>
  );
}

export default DemoTryCTA;
