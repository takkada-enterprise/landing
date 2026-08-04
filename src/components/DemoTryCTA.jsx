import CTAButton from './CTAButton';
import WhatsAppCTA from './WhatsAppCTA';
import { usePhoneModal } from '../context/PhoneModalContext';
import { demoEntryLive } from '../data/siteContent';
import { track } from '../lib/track';

// The "try it yourself" action. While demoEntryLive is false this renders the
// WhatsApp CTA with the demo context, so the page never ships a dead app link.
//
// Once live it opens the phone capture modal rather than linking out. That is
// deliberate and not a styling choice: the number has to be captured before the
// visitor leaves (D2), and an href would let a middle-click or a copied link
// reach the demo with no lead recorded at all.
function DemoTryCTA({ context = 'demo', variant = 'primary', children }) {
  const { openWith } = usePhoneModal();

  if (!demoEntryLive) {
    return <WhatsAppCTA context="demo" variant={variant} />;
  }

  return (
    <CTAButton
      variant={variant}
      // A real <button>, not an anchor. CTAButton defaults to <a href="#">,
      // and an anchor here is the middle-click hole described above.
      type="button"
      onClick={() => {
        track('demo_try_click', { cta_context: context });
        openWith({
          destination: 'demo',
          title: 'Open the live demo',
          subtitle: 'We will text you a 6-digit code to open the demo on this phone.',
          submitLabel: 'Send code',
        });
      }}
    >
      {children || 'Try it yourself'}
    </CTAButton>
  );
}

export default DemoTryCTA;
