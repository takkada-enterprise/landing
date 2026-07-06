import { appLinks } from '../data/siteContent';

// Pre-filled messages per CTA context. The visitor lands in a WhatsApp chat
// with the founder, so each message names what they were reading — that is
// the triage signal. Written in the visitor's voice: plain sentences a
// distributor would actually send.
export const WHATSAPP_MESSAGES = {
  default:
    'Hi, I am on takkada.com and want to know more about Takkada for my business.',
  header:
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
};

// Builds a wa.me click-to-chat URL for a CTA context. Returns null when no
// WhatsApp number is configured so callers can fall back to the calendar
// link instead of rendering a broken chat link.
export function whatsappHref(context = 'default', messageOverride) {
  const number = String(appLinks.whatsappNumber || '').replace(/\D/g, '');
  if (!number) return null;

  const message =
    messageOverride || WHATSAPP_MESSAGES[context] || WHATSAPP_MESSAGES.default;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
