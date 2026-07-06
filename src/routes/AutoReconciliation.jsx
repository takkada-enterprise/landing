import { Inbox, Layers, RefreshCw, Target } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';
import { appLinks } from '../data/siteContent';

const data = {
  overline: 'AUTO-RECONCILIATION',
  headline: 'Payments match themselves to the right Tally invoice.',
  subheadline:
    'When a payment lands in your bank, Takkada figures out which invoice it belongs to — partial, full, bulk, or without any reference — and posts the entry into Tally. Your evening reconciliation goes away.',
  waContext: 'icp-auto-reconciliation',
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: appLinks.bookDemo,
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing' },
  capabilitiesHeading: 'Two hours of evening work, eliminated',
  capabilities: [
    {
      icon: Target,
      title: 'Smart matching with confidence scoring',
      body: 'Takkada looks at amount, party, recent invoices, and payment patterns. High-confidence matches post automatically. Low-confidence ones queue for your two-tap approval.',
    },
    {
      icon: Layers,
      title: 'Partial and combined payments handled',
      body: '₹10,000 against ₹18,000 splits the invoice cleanly. ₹1,00,000 across three invoices proposes the best combination.',
    },
    {
      icon: Inbox,
      title: 'Unmatched payments go to suspense, not limbo',
      body: 'Payments without a clear match park in a configurable suspense account. They do not block your books — they wait for your resolution.',
    },
    {
      icon: RefreshCw,
      title: 'Every entry lands in Tally automatically',
      body: 'No exports. No imports. The accounting entry appears in your Tally the moment the match is confirmed — auto or manual.',
    },
  ],
  scenario:
    'It is 9 PM. You used to start the reconciliation grind at this hour. Today Takkada has already proposed matches for 31 of the 34 payments that arrived. Three need attention. You approve two from your phone in the car. The third is a partial payment — you split it in one tap. Reconciliation for the day: done in four minutes.',
  testimonial: {
    quote:
      'My two hours every evening were the reconciliation tax I paid for running a distribution business. That tax is gone.',
    author: 'Distributor, Guwahati',
  },
  faqs: [
    {
      q: 'How does Takkada know which invoice a payment belongs to?',
      a: "Three signals — the payer's UPI handle or bank account, the amount, and recent invoices for that party. Takkada scores the match. Above 95% confidence it auto-posts. Below that you approve it.",
    },
    {
      q: 'What if my bank is not supported?',
      a: 'Most major Indian business banks are supported for statement ingestion. If yours is not, you can upload a statement CSV and matching still works.',
    },
    {
      q: 'Does my CA get a full audit trail?',
      a: 'Yes. Every match — auto or manual — has a log entry with timestamp, rule used, and user. Nothing is invisible.',
    },
    {
      q: 'What about TDS deductions on payments?',
      a: 'Handled. Takkada recognises TDS deductions and passes the correct amount through to the ledger.',
    },
    {
      q: 'Can I turn off auto-posting and approve everything manually?',
      a: 'Yes. Conservative mode means every match waits for your approval. Most customers start here and move to auto-posting after two weeks.',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'Auto-Reconciliation', url: 'https://takkada.com/auto-reconciliation-tally/' },
  ],
  seo: {
    title: 'Auto-Reconciliation for Tally | Match Every Payment',
    description:
      'Payments auto-match to the correct Tally invoice. Partial, bulk, and unreferenced payments handled. Entries post into Tally automatically.',
    canonical: 'https://takkada.com/auto-reconciliation-tally/',
  },
};

function AutoReconciliation() {
  return <ICPTemplate {...data} />;
}

export default AutoReconciliation;
