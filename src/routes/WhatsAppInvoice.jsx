import { FileText, MessageCircle, RefreshCw, Smartphone } from 'lucide-react';
import ICPTemplate from '../components/ICPTemplate';
import { appLinks } from '../data/siteContent';

const data = {
  overline: 'FIELD SALES INVOICING',
  headline: 'Your salesman raises the invoice at the retailer\'s counter. It\'s in Tally before he drives away.',
  subheadline:
    "No calling the office. No paper order books. No accountant spending the first two hours of every morning on data entry. The invoice is raised at the counter, synced to Tally, and on the retailer's WhatsApp before the truck leaves.",
  waContext: 'icp-whatsapp-invoice',
  ctaPrimary: {
    text: 'Book a 15-min demo',
    href: appLinks.bookDemo,
  },
  ctaSecondary: { text: 'See pricing', href: '/#pricing' },
  capabilitiesHeading: 'From the field to Tally, without touching a laptop',
  capabilities: [
    {
      icon: Smartphone,
      title: "Raise any invoice from the phone, at the retailer's counter",
      body: 'Full tax invoices, delivery challans, and sales orders from mobile. All voucher types, all from the field.',
    },
    {
      icon: RefreshCw,
      title: 'Syncs to Tally the moment it is saved',
      body: 'The accountant sees the entry in Tally without doing anything. No re-entry, no import, no end-of-day batch upload.',
    },
    {
      icon: FileText,
      title: 'E-invoice and e-way bill without calling the office',
      body: 'Generate IRN and e-way bill from the phone. The truck does not wait for someone in the office to log into Tally.',
    },
    {
      icon: MessageCircle,
      title: "Invoice reaches the retailer on WhatsApp immediately",
      body: 'PDF and payment link on the retailer\'s WhatsApp before the salesman closes his phone. No forwarding later.',
    },
  ],
  scenario:
    "Your salesman is in Jorhat at a general store. He closes a ₹22,000 order at 6:45 PM. Your office shut at 6:30. He opens Takkada, raises the tax invoice from his phone, generates the e-way bill. The retailer's WhatsApp pings — invoice attached, payment link included. The entry sits in Tally. Your accountant sees it the next morning, reviews it, moves on. No re-entry. No backlog from yesterday's field work.",
  testimonial: {
    quote:
      "My salesman used to write the order on paper and the accountant would enter it the next day. Now it goes straight to Tally from the field. We close the day clean.",
    author: 'Wholesale distributor, Tezpur',
  },
  faqs: [
    {
      q: 'Does the accountant need to do anything after the salesman raises an invoice from the field?',
      a: 'Nothing. The voucher syncs to Tally directly. The accountant reviews it like any entry already in the system — no import, no re-entry.',
    },
    {
      q: 'What voucher types can the salesman raise from the phone?',
      a: 'Tax invoices, delivery challans, and sales orders. E-invoice IRN and e-way bill generation are also available from the phone on the Assurance and Copilot plans.',
    },
    {
      q: 'Does this need the office Tally laptop to be open?',
      a: 'No. The salesman raises the invoice even when the office is closed. It syncs to Tally the next time the office system comes online.',
    },
    {
      q: "Can the salesman see the retailer's outstanding before raising the invoice?",
      a: 'Yes. Current outstanding, overdue amounts, and last payment date are all visible on the salesman\'s phone before he places the order.',
    },
    {
      q: 'What plan do I need for field sales invoicing?',
      a: 'Mobile invoicing is available on the Momentum plan (₹4,500/year) and above. E-invoice and e-way bill are included in the Assurance and Copilot plans.',
    },
  ],
  breadcrumb: [
    { name: 'Home', url: 'https://takkada.com/' },
    { name: 'Field Sales Invoicing', url: 'https://takkada.com/whatsapp-invoice-tally/' },
  ],
  seo: {
    title: 'Field Sales Invoicing | Tally Sync from the Market',
    description:
      'Salesmen raise invoices at retailer shops from their phone. Syncs to Tally in real time. Retailer gets the PDF on WhatsApp. No re-entry in office.',
    canonical: 'https://takkada.com/whatsapp-invoice-tally/',
  },
};

function WhatsAppInvoice() {
  return <ICPTemplate {...data} />;
}

export default WhatsAppInvoice;
