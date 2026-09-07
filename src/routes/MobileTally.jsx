import { BarChart2, Bell, FileText, Shield } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';
import { appLinks } from '../data/siteContent';

const data = {
  overline: 'TALLY ON MOBILE',
  headline: 'See your Tally receivables from your phone. Send reminders without opening your laptop.',
  subheadline:
    "Most days you do not need to edit anything in Tally. You just want to know who owes what, what is overdue, and whether yesterday's payment landed.",
  // Front-loaded answer, added 2026-08-08. This page had none, which is one of
  // the two things the ranking blog posts have and it did not (the other is
  // internal links, added below as relatedPosts).
  answer:
    'Takkada puts Tally on mobile for the owner who mainly needs to read the books. Party-wise outstanding, ageing, and the reports you check daily, live from your own Tally. Send a WhatsApp reminder or share a ledger statement in two taps. Read-only tracking writes nothing back to Tally.',
  waContext: 'icp-mobile-tally',
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: appLinks.bookDemo,
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing' },
  capabilitiesHeading: 'Visibility and control from your phone',
  capabilities: [
    {
      icon: BarChart2,
      title: 'Real-time receivables on your phone',
      body: 'Party-wise overdue, amount, and days since last payment. Refreshes every time your office laptop opens Tally.',
    },
    {
      icon: Bell,
      title: 'Send a reminder in two taps',
      body: 'Tap a party, send a reminder. Your name, your brand, the invoice number — already filled in.',
    },
    {
      icon: FileText,
      title: 'Ledger statement to WhatsApp instantly',
      body: "Any retailer gets their ledger on WhatsApp in two taps. No more 'bhai, ek baar statement bhejo' at 9 PM.",
    },
    {
      icon: Shield,
      title: 'Read-only — your Tally stays untouched',
      body: 'Read-only tracking does not write anything to Tally. Your data, your formats, your numbering — exactly as they are.',
    },
  ],
  scenario:
    'You are at a wedding in Jorhat. Your phone shows a UPI credit from a retailer in Nagaon — ₹38,000. You open Takkada, see his outstanding drop from ₹1.1 lakh to ₹72,000. You tap, send him a receipt on WhatsApp. Done. No call to the accountant, no laptop. When your office laptop opens Tally on Monday, the entry is already there.',
  testimonial: {
    quote:
      'I used to call my accountant three times a day to check overdues. Now I check from the car. The calls stopped.',
    author: 'Distributor, Assam',
  },
  faqs: [
    {
      q: 'Does my laptop need to be on for the mobile view to update?',
      a: 'Your Tally syncs when the office laptop opens. If that happens once a day, your mobile view is current once a day. Most distributors have Tally open most of the working day, so the view is near real-time.',
    },
    {
      // Named two retired plans ("Voucher and Collections") until 2026-08-08.
      // Those names were withdrawn in the 2026-07-25 rate card rebuild and
      // CLAUDE.md §3 forbids reintroducing them.
      q: 'Is this just a dashboard or can I do more?',
      a: 'Out of the box it is visibility and reminders. Raising vouchers from your phone comes in with the Momentum plan, and payment collection is an add-on that works on any plan including this one. You keep the same account and the same data when you move.',
    },
    {
      // The rupee figure here used to be typed into the copy. Prices are
      // derived from the rate card everywhere else on the site (CLAUDE.md §3),
      // so this answer now points at the pricing table instead of pinning a
      // number that goes stale the next time the card moves.
      q: 'Can my accountant use it too?',
      a: 'Yes. Every plan includes one user, and you can add more. Extra users are priced per year on the rate card on the home page, so an owner and an accountant sharing the same books is a normal setup rather than something that needs a different plan.',
    },
    {
      q: 'What Tally versions work?',
      a: 'TallyPrime and Tally.ERP 9 Release 6 onwards.',
    },
    {
      q: 'Can I export or download the outstanding list?',
      a: 'Yes. Export as PDF or Excel in two taps. Share on WhatsApp or email from the same screen.',
    },
  ],
  // Internal links, added 2026-08-08. Titles are quoted verbatim from blog
  // frontmatter and pinned by src/routes/__tests__/icp-refresh.test.jsx.
  relatedPosts: [
    {
      slug: 'how-to-check-party-outstanding-tally-mobile',
      title: 'How to Check Party Outstanding in Tally on Mobile',
    },
    {
      slug: 'receivables-ageing-on-mobile-tally',
      title: 'Receivables Ageing on Mobile: Catch the 60/90-Day Parties',
    },
    {
      slug: 'how-to-access-tally-on-mobile-step-by-step',
      title: 'How to Access Tally on Mobile: A Step-by-Step Guide',
    },
    {
      slug: 'sundry-debtors-tally-mobile',
      title: 'Sundry Debtors in Tally: See Who Owes You on Mobile',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'Tally on Mobile', url: 'https://takkada.com/mobile-tally/' },
  ],
  seo: {
    title: 'Tally on Mobile | View Receivables, Send Reminders',
    description:
      'See your Tally outstanding from your phone. Send WhatsApp reminders, share ledger statements, track overdues. Works with TallyPrime and Tally ERP 9.',
    canonical: 'https://takkada.com/mobile-tally/',
  },
};

function MobileTally() {
  return <ICPTemplate {...data} />;
}

export default MobileTally;
