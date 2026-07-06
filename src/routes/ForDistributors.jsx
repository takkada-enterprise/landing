import { CheckCircle2, IndianRupee, MessageCircle, Smartphone } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';
import { appLinks } from '../data/siteContent';

const data = {
  overline: 'FOR INDIAN DISTRIBUTORS',
  headline: 'The mobile Tally app built for distributors.',
  subheadline:
    'If you serve 30 to 300 retailers on 30-90 day terms, raise 20+ invoices a day, and lose two evening hours to reconciliation — Takkada is built for exactly your business.',
  waContext: 'icp-for-distributors',
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: appLinks.bookDemo,
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing' },
  capabilitiesHeading: 'The complete distributor workflow, from your phone',
  capabilities: [
    {
      icon: Smartphone,
      title: 'Mobile invoicing including e-invoice and e-way bill',
      body: 'Raise any voucher type from your phone. Generate IRN and e-way bill in seconds. The truck does not wait.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp auto-dispatch of every invoice',
      body: 'Invoice created in Tally or on mobile — customer receives the PDF and a payment link immediately. No copy-paste, no forwarding.',
    },
    {
      icon: IndianRupee,
      title: 'UPI collection with zero platform charges',
      body: 'Customers tap a payment link. Money lands in your bank account. Takkada does not take a cut on UPI transactions.',
    },
    {
      icon: CheckCircle2,
      title: 'Auto-reconciliation back to Tally',
      body: 'Payments auto-match against invoices. Accounting entries post in Tally without your accountant doing anything after 7 PM.',
    },
  ],
  scenario:
    'You run a ₹12 crore annual distribution across three districts in Assam. You cover 140 retailers, have four salesmen and one senior accountant. Before Takkada: your accountant stayed until 9:30 PM every day matching payments. Now he leaves at 7. The reconciliation is already done. You check the outstanding report at dinner, send one reminder to the one retailer who has not paid in 50 days, close the phone, eat.',
  testimonial: {
    quote:
      'We did not need a new accounting system. We needed Tally to reach our phones. Takkada did that, and then some.',
    author: 'Distributor, Dibrugarh',
  },
  faqs: [
    {
      q: 'Which industries do you work with?',
      a: 'Any Tally-using distributor or wholesaler. Most of our customers are in FMCG, pharma, hardware, stationery, auto parts, and agri-inputs. The product is industry-agnostic — if your books are in Tally, Takkada fits.',
    },
    {
      q: 'How long does onboarding take?',
      a: '30 minutes for the Tally connector setup, 15 minutes for your team to learn the mobile app. Most customers are live in under an hour.',
    },
    {
      q: 'What happens to my existing Tally data?',
      a: 'Nothing. Takkada reads from and writes to your existing Tally. Your data, formats, and numbering all stay exactly where they are.',
    },
    {
      q: 'Do you work with my Tally partner?',
      a: 'We prefer to. Tell us who your Tally partner is and we will route the sale through them. If they are not a Takkada partner yet, we will onboard them.',
    },
    {
      q: 'What is the smallest and largest business that uses Takkada?',
      a: 'Smallest: one-person operations doing ₹2 crore annual. Largest: teams of 25+ doing over ₹100 crore annual. The product scales without configuration changes.',
    },
    {
      q: 'Can I try before I pay?',
      a: 'Every plan has a 7-day free trial, no card required. You can also see a 15-minute live demo — book using the button below.',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'For Distributors', url: 'https://takkada.com/for-distributors/' },
  ],
  seo: {
    title: 'Takkada for Distributors | Mobile Tally + Collections',
    description:
      'Built for Indian distributors on Tally with 30-300 retailer receivables. Mobile invoicing, WhatsApp auto-dispatch, UPI collection, auto-reconciliation.',
    canonical: 'https://takkada.com/for-distributors/',
  },
};

function ForDistributors() {
  return <ICPTemplate {...data} />;
}

export default ForDistributors;
