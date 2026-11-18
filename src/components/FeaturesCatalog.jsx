import { useState } from 'react';
import Link from './SiteLink.jsx';
import {
  ShoppingCart,
  Package,
  CreditCard,
  FileText,
  Smartphone,
  Users,
  Tag,
  Building2,
  ArrowUpRight,
} from 'lucide-react';

export const FEATURE_CATEGORIES = [
  {
    id: 'orders',
    title: 'Take Orders',
    description: 'Manage sales orders and simplify order-taking from anywhere.',
    icon: ShoppingCart,
    colorClass: 'blue',
    links: [
      { label: 'Salesman app', href: '/salesman-app-tally/' },
      { label: 'Sales orders', href: '/sales-order-on-mobile/' },
      { label: 'Voucher approval', href: '/voucher-approval-before-tally/' },
      { label: 'Customer order link', href: '/order-booking-app-tally/' },
      { label: 'Live tracking', href: '/salesman-location-tracking-app/' },
    ],
  },
  {
    id: 'inventory',
    title: 'Manage Inventory',
    description: 'Track stock, manage warehouses and monitor deliveries.',
    icon: Package,
    colorClass: 'green',
    links: [
      { label: 'Godown-wise stock', href: '/godown-wise-stock-on-mobile/' },
      { label: 'Delivery challans', href: '/delivery-challan-from-mobile/' },
      { label: 'Barcode labels', href: '/barcode-in-tally-prime/' },
      { label: 'Stock control', href: '/stock-control-tally/' },
      { label: 'Physical stock count', href: '/physical-stock-verification-tally/' },
      { label: 'Stock count app', href: '/stock-count-app/' },
      { label: 'Proof of delivery', href: '/proof-of-delivery-app-tally/' },
      { label: 'Manufacturing', href: '/manufacturing-in-tally-prime/' },
      { label: 'Serial number tracking', href: '/serial-number-tracking-tally/' },
      { label: 'IMEI tracking', href: '/imei-tracking-tally/' },
      { label: 'Chassis number tracking', href: '/chassis-number-tracking-tally/' },
    ],
  },
  {
    id: 'payments',
    title: 'Collect Payments',
    description: 'Improve collections with automated reminders and payment links.',
    icon: CreditCard,
    colorClass: 'purple',
    links: [
      { label: 'Outstanding receivables', href: '/outstanding-receivables-on-mobile/' },
      { label: 'Debtor ageing', href: '/debtor-ageing-report-on-phone/' },
      { label: 'Payment collection', href: '/payment-collection-tally/' },
      { label: 'AI collection calls', href: '/ai-collection-calls/' },
      { label: 'Payment reminders', href: '/payment-reminder-tally/' },
      { label: 'Automatic reminders', href: '/send-payment-reminders-automatically/' },
    ],
  },
  {
    id: 'billing',
    title: 'Billing & Compliance',
    description: 'Create invoices, e-way bills and manage billing operations.',
    icon: FileText,
    colorClass: 'orange',
    links: [
      { label: 'E-invoice from phone', href: '/e-invoice-from-phone/' },
      { label: 'E-way bill from phone', href: '/e-way-bill-from-phone/' },
      { label: 'Credit and debit notes', href: '/credit-note-from-phone/' },
      { label: 'Import purchase from PDF', href: '/import-purchase-from-pdf/' },
      { label: 'Order from a photo', href: '/handwritten-order-to-tally/' },
      { label: 'Bank statement import', href: '/bank-statement-import-tally/' },
      { label: 'Desktop billing', href: '/desktop-billing-tally/' },
      { label: 'Voucher names', href: '/custom-voucher-type-tally/' },
    ],
  },
  {
    id: 'tally',
    title: 'Tally on Mobile',
    description: 'Access your Tally data and business reports wherever you go.',
    icon: Smartphone,
    colorClass: 'blue',
    links: [
      { label: 'Tally on mobile', href: '/tally-on-mobile/' },
      { label: 'Without remote access', href: '/tally-on-mobile-without-remote-access/' },
      { label: 'Reports on mobile', href: '/tally-reports-on-mobile/' },
      { label: 'Party and item sales', href: '/party-wise-item-wise-sales-report-tally/' },
      { label: 'Sales comparison', href: '/sales-comparison-report-tally/' },
      { label: 'Profit on each invoice', href: '/invoice-wise-profit-tally/' },
      { label: 'Sales insights', href: '/sales-insights-tally/' },
      { label: 'Multi-company', href: '/multi-company-tally-reports/' },
      { label: 'AI agent for Tally', href: '/ai-agent-for-tally-prime/' },
      { label: 'Tally drafts', href: '/optional-voucher-tally-prime/' },
    ],
  },
  {
    id: 'team',
    title: 'Team & Payroll',
    description: 'Manage employees, payroll and daily wage operations.',
    icon: Users,
    colorClass: 'purple',
    links: [
      { label: 'Staff and payroll', href: '/staff-attendance-salary-app/' },
      { label: 'Payroll for Tally', href: '/payroll-software-tally/' },
      { label: 'Daily wage pay', href: '/daily-wage-salary-app/' },
      { label: 'Hindi payslips', href: '/salary-slip-in-hindi/' },
      { label: 'PF and ESI files', href: '/pf-ecr-esi-file-from-salary/' },
    ],
  },
  {
    id: 'schemes',
    title: 'Schemes & Pricing',
    description: 'Manage trade schemes, discounts and distributor-specific pricing.',
    icon: Tag,
    colorClass: 'teal',
    links: [
      { label: 'Schemes', href: '/schemes-tally/' },
      { label: 'FMCG module', href: '/fmcg-module-tally/' },
      { label: 'AutoParts billing', href: '/autoparts-billing-tally/' },
      { label: 'Ladder discount', href: '/ladder-discount-tally/' },
    ],
  },
  {
    id: 'industry',
    title: 'Built for Your Trade',
    description: 'Purpose-built workflows for different distribution businesses.',
    icon: Building2,
    colorClass: 'blue',
    links: [
      { label: 'FMCG distributors', href: '/tally-app-for-fmcg-distributors/' },
      { label: 'Pharma distributors', href: '/tally-app-for-pharma-distributors/' },
      { label: 'Agri-input distributors', href: '/tally-app-for-agri-input-distributors/' },
    ],
  },
];

export default function FeaturesCatalog() {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id, isOpen) => {
    if (isOpen) {
      setOpenId(id);
    } else if (openId === id) {
      setOpenId(null);
    }
  };

  return (
    <section className="tk-features" id="all-features">
      <div className="tk-container">
        <div className="tk-heading">
          <span className="tk-eyebrow">FEATURES</span>
          <h2>Everything a Distributor Needs, in One App</h2>
          <p>
            From orders and inventory to collections and compliance.
            Run your entire distribution business on mobile,
            with deep Tally integration.
          </p>
        </div>

        <div className="tk-grid">
          {FEATURE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isOpen = openId === cat.id;
            return (
              <details
                key={cat.id}
                className="tk-card"
                open={isOpen}
                onToggle={(e) => handleToggle(cat.id, e.currentTarget.open)}
              >
                <summary>
                  <div className={`tk-icon ${cat.colorClass}`} aria-hidden="true">
                    <Icon size={28} />
                  </div>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <span className="tk-arrow" aria-hidden="true">
                    <ArrowUpRight size={22} />
                  </span>
                </summary>
                <ul>
                  {cat.links.map((link) => (
                    <li key={link.href}>
                      <Link to={link.href}>
                        <span>{link.label}</span>
                        <span className="tk-item-arrow" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>

        <div className="tk-trust">
          <strong className="tk-tally">Tally</strong>
          <span>Deep Tally Integration</span>
          <span>Mobile-First</span>
          <span>E-Invoicing & E-way Bill</span>
        </div>
      </div>
    </section>
  );
}
