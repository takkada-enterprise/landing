import { BarChart2, Bell, FileText, Shield } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';

const data = {
  overline: 'TALLY ON MOBILE',
  headline: 'See your Tally receivables from your phone. Send reminders without opening your laptop.',
  subheadline:
    "Most days you do not need to edit anything in Tally. You just want to know who owes what, what is overdue, and whether yesterday's payment landed. Takkada gives you that — on your phone, without touching your Tally setup.",
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: 'https://calendar.notion.so/meet/ronakmalu/takkada',
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing-strip' },
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
      q: 'Is this just a dashboard or can I do more?',
      a: 'Out of the box it is visibility and reminders. If you need voucher creation or payment collection, the Voucher and Collections plans add those. You keep the same account and data.',
    },
    {
      q: 'Can my accountant use it too?',
      a: 'Yes. Every plan includes one user. Add an extra user for ₹3,000 per year.',
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
