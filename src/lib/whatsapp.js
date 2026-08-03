import { appLinks } from '../data/siteContent';

// Pre-filled messages per CTA context. The visitor lands in a WhatsApp chat
// with the founder, so each message names what they were reading — that is
// the triage signal. Written in the visitor's voice: plain sentences a
// distributor would actually send.
export const WHATSAPP_MESSAGES = {
  // 'header' and any other context without its own entry resolve to default.
  default:
    'Hi, I am on takkada.com and want to know more about Takkada for my business.',
  'home-hero':
    'Hi, I run a distribution business on Tally. I saw takkada.com and want to see how it works.',
  features:
    'Hi, I am looking at the features on takkada.com and want a walkthrough.',
  pricing:
    'Hi, I am looking at Takkada pricing. Which plan fits my business?',
  'final-cta':
    'Hi, I want to set up Takkada for my business. What is the next step?',
  'icp-mobile-tally':
    'Hi, I want to see my Tally receivables on my phone. Can you show me how Takkada does it?',
  'icp-for-distributors':
    'Hi, I run a distribution business with a big receivable book. I want to see how Takkada handles collections.',
  'icp-whatsapp-invoice':
    'Hi, I want my Tally invoices to reach customers on WhatsApp automatically. Can you show me?',
  'icp-auto-reconciliation':
    'Hi, I want to stop matching payments into Tally by hand. Can you show me how auto-reconciliation works?',
  blog: 'Hi, I was reading an article on takkada.com and want to know more about Takkada.',
  comparison:
    'Hi, I am comparing Tally mobile apps. I want to see a demo of Takkada.',
  demo: 'Hi, I tried the demo company on takkada.com. I want to set this up for my own business.',
  'sticky-bar':
    'Hi, I am reading takkada.com on my phone and want to know more about Takkada.',
  'story-collections':
    'Hi, I saw the payment collection story on takkada.com. I want to see how the invoice-to-UPI loop works for my business.',
  'story-team-sales':
    'Hi, I run a sales team in the field. I want to see how Takkada handles salesman check-ins and orders.',
};

// Builds a wa.me click-to-chat URL for a CTA context. Returns null when no
// WhatsApp number is configured so callers can fall back to the calendar
// link instead of rendering a broken chat link.
export function whatsappHref(context = 'default', messageOverride) {
  const number = String(appLinks.whatsappNumber || '').replace(/\D/g, '');
  if (!number) return null;

  // Unknown contexts fall back to the default message at runtime (right for
  // a marketing site), but a typo'd context key would silently strip the
  // founder's triage signal — surface it during development.
  if (
    !messageOverride &&
    !WHATSAPP_MESSAGES[context] &&
    typeof import.meta !== 'undefined' &&
    import.meta.env?.DEV
  ) {
    console.warn(`[whatsapp] unknown CTA context "${context}" — using the default message`);
  }

  const message =
    messageOverride || WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES.default;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
