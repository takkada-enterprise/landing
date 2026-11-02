import { BarChart3, MessageCircle, Smartphone, Truck } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';
import { appLinks } from '../data/siteContent';

const data = {
  overline: 'FOR INDIAN DISTRIBUTORS',
  headline: 'The mobile Tally app built for distributors.',
  subheadline:
    'If you serve 30 to 300 retailers, raise 20+ invoices a day and run a team in the field, Takkada puts your Tally on every phone in the business.',
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
      icon: BarChart3,
      title: 'Reports, stock and outstanding on your phone',
      body: '20+ Tally reports, godown-wise stock and party outstanding, for every company you run. Check them at the counter or at dinner, without the office desktop.',
    },
    {
      icon: Truck,
      title: 'Salesmen and dispatch from the same app',
      body: 'Each salesman sees only his own parties, books orders and checks in at each visit with a geo-tagged photo. The godown builds the van load and prints the loading sheet from the app.',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp invoices, reminders and UPI collection',
      body: 'Invoices and payment reminders go out on WhatsApp, from Takkada\'s number or from your own with a paid add-on. With Payment Collection, the retailer pays on a UPI link at 0% MDR and the receipt matches back into Tally.',
    },
  ],
  scenario:
    'You run a ₹12 crore annual distribution across three districts in Assam. You cover 140 retailers, have four salesmen and one senior accountant. Before Takkada, every bill, stock check and outstanding question waited for the office desktop. Now your salesmen bill at the counter, the van is loaded from a list built in the app, and you check stock and outstanding at dinner. Receipts match themselves, so your accountant leaves at 7.',
  testimonial: {
    quote:
      'We did not need a new accounting system. We needed Tally to reach our phones. Takkada did that, and then some.',
    author: 'Distributor, Dibrugarh',
  },
  faqs: [
    {
      q: 'What is the best software for distributors using Tally?',
      a: 'The right software depends on your workflow. Takkada is built for Indian distributors who want their Tally on the phone: billing, reports, stock, field sales and dispatch, with WhatsApp reminders and UPI collection built in.',
    },
    {
      q: 'Can distributor software integrate with Tally?',
      a: 'Yes. Takkada uses a two-way Tally Connector that keeps your existing TallyPrime or Tally ERP 9 installation and the app in step, so an entry made on either side shows up on the other.',
    },
    {
      q: 'Can salesmen use Takkada?',
      a: 'Yes. Takkada supports role-based access for field sales teams to check in at retail shops, book orders, raise invoices, and record collections.',
    },
    {
      q: 'Can distributors collect payments through Takkada?',
      a: 'Yes. Takkada supports zero-MDR UPI payment collection attached to WhatsApp invoices and reminders, with automatic receipt posting back into Tally.',
    },
    {
      q: 'Which industries do you work with?',
      a: 'Any Tally-using distributor or wholesaler. Most of our customers are in FMCG, pharma, hardware, stationery, auto parts, and agri-inputs. The product is industry-agnostic: if your books are in Tally, Takkada fits.',
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
      q: 'Can I try before I pay?',
      a: 'Every plan has a 7-day free trial, no card required. You can also see a 15-minute live demo. Book it using the button below.',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'For Distributors', url: 'https://takkada.com/for-distributors/' },
  ],
  seo: {
    title: 'Distributor Management Software for Tally | Takkada',
    description:
      'Software for Indian distributors using Tally. Manage orders, invoices, stock, reports, salesmen, WhatsApp reminders and UPI collection from your phone.',
    canonical: 'https://takkada.com/for-distributors/',
  },
};

function ForDistributors() {
  return <ICPTemplate {...data} />;
}

export default ForDistributors;
