import { ArrowRight, CheckCircle2, ChevronRight, Layers, Sparkles, Building2, ShoppingBag, ShieldCheck, Truck, Receipt, QrCode, PhoneCall, FileSpreadsheet, Barcode, Users, Cpu } from 'lucide-react';
import Link from '../components/SiteLink.jsx';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import { breadcrumbSchema } from '../data/schema';
import { appLinks } from '../data/siteContent';

const ERP_CATEGORIES = [
  {
    id: 'billing',
    title: 'Custom Billing & Counter Modules',
    subtitle: 'Tailored billing counters and discount schemes configured for your trade.',
    icon: Receipt,
    features: [
      {
        title: 'FMCG Wholesale Billing Counter',
        description: 'High-speed billing counter built for FMCG and retail counters. Set retail margins, item-wise discounts, and quick cash/credit settlements.',
        featureLink: '/fmcg-module-tally',
      },
      {
        title: 'Automobile Spare Parts Billing',
        description: 'Work out selling prices directly from landed container costs, part-number cross-referencing, and rapid vehicle model lookups.',
        featureLink: '/autoparts-billing-tally',
      },
      {
        title: 'Schemes, Slabs & Trade Offers',
        description: 'Configure Buy X Get Y Free offers, quantity slab discounts, and invoice-value promotions that post seamlessly into Tally.',
        featureLink: '/schemes-tally',
      },
      {
        title: 'Step & Ladder Discounts',
        description: 'Apply multi-level named trade discounts in sequential steps, aggregated into clean ledger entries in Tally without cluttering customer bills.',
        featureLink: '/ladder-discount-tally',
      },
      {
        title: 'Custom Invoice & Challan Templates',
        description: 'Design professional invoices with your custom logo, UPI QR code placement, thermal printer support, and specific tax disclosures.',
        featureLink: '/custom-invoice-template-tally',
      },
      {
        title: 'Custom Voucher Types & Branch Series',
        description: 'Maintain independent voucher numbering series and custom prefixes per branch, godown, or counter, synced bidirectionally with Tally.',
      },
    ],
  },
  {
    id: 'sales-distribution',
    title: 'Field Sales & B2B Distribution',
    subtitle: 'Equip your sales reps and retail buyers with mobile ordering tools.',
    icon: ShoppingBag,
    features: [
      {
        title: 'Customer Self-Order Catalog Links',
        description: 'Share a digital catalog link where your retailers browse live inventory, select quantities, and submit orders for your approval into Tally.',
        featureLink: '/order-booking-app-tally',
      },
      {
        title: 'Personalized Party Links',
        description: 'Generate dedicated ordering links for specific parties with their pre-negotiated rates, outstanding balance, and order history.',
      },
      {
        title: 'Field Sales Reps & Beat Management',
        description: 'GPS-verified salesman check-in and check-out at retailer counters, route scheduling, party outstanding view, and on-spot order booking.',
        featureLink: '/salesman-app-tally',
      },
      {
        title: 'Proof of Delivery (POD) Mobile App',
        description: 'Delivery driver app with geo-tagged delivery photos, digital sign-off, and cash or UPI collection approval by the office.',
        featureLink: '/delivery-challan-from-mobile',
      },
      {
        title: 'Photo-to-Order Conversion',
        description: 'Turn photos of handwritten retailer order slips or WhatsApp messages into structured Tally sales orders automatically.',
        featureLink: '/handwritten-order-to-tally',
      },
      {
        title: 'Pre-Tally Voucher Approval Workflows',
        description: 'Hold orders or credit bills for manager sign-off on discounts or credit limit breaches before entries post to Tally.',
        featureLink: '/voucher-approval-before-tally',
      },
    ],
  },
  {
    id: 'collections-automation',
    title: 'Payment Recovery & WhatsApp Automation',
    subtitle: 'Accelerate cash flow with automated follow-ups and zero-MDR collections.',
    icon: PhoneCall,
    features: [
      {
        title: 'Zero-MDR UPI Payment Collection',
        description: 'Embed dynamic UPI payment links and QR codes on invoices and reminder messages. Payments automatically create receipt vouchers in Tally.',
        featureLink: '/payment-collection-tally',
      },
      {
        title: 'Automatic WhatsApp Payment Reminders',
        description: 'Automated WhatsApp reminder schedules based on invoice age and due dates, sent with party outstanding statements attached.',
        featureLink: '/send-payment-reminders-automatically',
      },
      {
        title: 'Dedicated Business WhatsApp API',
        description: 'Send all invoices, payment links, and dispatch alerts from your own verified business WhatsApp number instead of a shared handle.',
      },
      {
        title: 'Debtor Ageing & Recovery Dashboard',
        description: 'Track receivables across 30, 60, and 90+ day overdue buckets. Log promises to pay, follow-up notes, and track broken commitments.',
        featureLink: '/outstanding-receivables-on-mobile',
      },
      {
        title: 'AI Voice Calling for Payment Follow-Ups',
        description: 'Automated conversational AI voice calls that speak with overdue parties in natural Indian languages and record payment commitments.',
        featureLink: '/ai-collection-calls',
      },
      {
        title: 'Live Ledger & Statement Sharing',
        description: 'Generate and send party-wise ledgers, item-wise sales histories, and payment receipts in two taps on WhatsApp.',
        featureLink: '/share-ledger-statement-whatsapp',
      },
    ],
  },
  {
    id: 'compliance-banking',
    title: 'Compliance, GST & Banking Workflows',
    subtitle: 'Eliminate manual data entry and government portal logins.',
    icon: FileSpreadsheet,
    features: [
      {
        title: 'Mobile E-Invoice Generation with IRN & QR',
        description: 'Generate compliant B2B e-invoices with IRN and QR code directly from your phone in seconds. IRN details write back into Tally.',
        featureLink: '/e-invoice-from-phone',
      },
      {
        title: 'One-Tap E-Way Bill Generation & Cancellation',
        description: 'Generate and cancel e-way bills from your phone without logging into the government portal. Updates the corresponding Tally voucher.',
        featureLink: '/e-way-bill-from-phone',
      },
      {
        title: 'Bank Statement PDF Import & Auto-Matching',
        description: 'Upload bank statements in PDF or Excel format. Takkada automatically matches transactions to open party invoices in Tally.',
        featureLink: '/bank-statement-import-tally',
      },
      {
        title: 'Purchase Bill Import from PDF',
        description: 'Import supplier purchase invoices from PDF into Tally without retyping item lines, rates, or GST calculations.',
        featureLink: '/import-purchase-from-pdf',
      },
    ],
  },
  {
    id: 'inventory-manufacturing',
    title: 'Inventory, Barcodes & Manufacturing',
    subtitle: 'Track stock movement, barcode labeling, and production stages.',
    icon: Barcode,
    features: [
      {
        title: 'Barcode Label Designer & Gun Scanning',
        description: 'Design custom barcode stickers with item code, batch, MRP, and box quantities. Scan with mobile cameras or handheld barcode guns.',
        featureLink: '/barcode-in-tally-prime',
      },
      {
        title: 'Multi-Godown Stock & Transit Visibility',
        description: 'Live stock balances across main warehouses, transit vans, and retail outlets. Refresh balances whenever Tally is updated.',
        featureLink: '/godown-wise-stock-on-mobile',
      },
      {
        title: 'Bill of Materials (BOM) & Manufacturing Runs',
        description: 'Define raw material recipes, record production batches, track scrap rates, and post finished goods into Tally stock.',
      },
      {
        title: 'Dispatch Load & Van Loading Sheets',
        description: 'Aggregate multiple delivery orders into route-wise loading sheets. Print loading summaries and dispatch invoices together.',
      },
    ],
  },
  {
    id: 'multi-company-scale',
    title: 'Multi-Company & Enterprise Scaling',
    subtitle: 'Manage complex business groups with unified reporting and role controls.',
    icon: Building2,
    features: [
      {
        title: 'Grouped Companies & Consolidated MIS',
        description: 'Consolidated receivables, payables, stock levels, and sales reports across multiple Tally companies in one unified dashboard.',
        featureLink: '/multi-company-tally-reports',
      },
      {
        title: 'Granular Role-Based Access Control (RBAC)',
        description: 'Control what each team member sees. Restrict salesmen to assigned parties, godown staff to stock, and hide profit margins.',
      },
      {
        title: 'Multi-User Team Logins',
        description: 'Add dedicated logins for billing clerks, dispatch managers, accountants, and field staff with individual activity logs.',
      },
      {
        title: 'AI Business Assistant for Tally',
        description: 'Query your Tally books in plain English or Hindi using conversational AI to get instant financial and stock answers.',
        featureLink: '/ai-agent-for-tally-prime',
      },
    ],
  },
];

const BREADCRUMB_TRAIL = [
  { name: 'Home', url: 'https://takkada.com/' },
  { name: 'Customised ERP', url: 'https://takkada.com/customised-erp' },
];

export default function CustomisedErp() {
  return (
    <div className="customised-erp-page">
      <Seo
        title="Customised ERP for Distributors & Wholesalers | Takkada"
        description="Explore custom Tally ERP modules, advanced billing counters, field sales, barcode systems, manufacturing, and multi-company setups tailored for your business."
        path="/customised-erp"
        schemas={[breadcrumbSchema(BREADCRUMB_TRAIL)]}
      />

      {/* Hero Header */}
      <section className="erp-hero">
        <div className="container">
          <Breadcrumb trail={BREADCRUMB_TRAIL} />
          
          <div className="erp-hero-content">
            <span className="section-label">Tailored Solutions</span>
            <h1 className="erp-hero-title">
              Customised ERP for Indian Distributors &amp; Wholesalers
            </h1>
            <p className="erp-hero-lead">
              Every distribution business runs differently. Pick the exact modules, workflows, and
              integrations you need — synced live with TallyPrime and Tally.ERP 9, without the
              constraints of fixed packages.
            </p>

            <div className="erp-hero-ctas">
              <WhatsAppCTA context="customised-erp">
                Discuss Your Setup on WhatsApp
              </WhatsAppCTA>
              <CalendarCTA context="customised-erp" buttonVariant="secondary">
                Book a 15-min Consultation
              </CalendarCTA>
            </div>

            <div className="erp-hero-badges">
              <span className="erp-badge">
                <CheckCircle2 size={16} aria-hidden="true" /> Works with your existing Tally
              </span>
              <span className="erp-badge">
                <CheckCircle2 size={16} aria-hidden="true" /> Modular configuration
              </span>
              <span className="erp-badge">
                <CheckCircle2 size={16} aria-hidden="true" /> Dedicated deployment support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Directory */}
      <section className="erp-modules-section">
        <div className="container">
          <div className="erp-section-head">
            <span className="section-label">Available Modules</span>
            <h2 className="section-title">Explore Custom Modules &amp; Capabilities</h2>
            <p className="section-subtitle">
              Combine any combination of modules below into a tailored ERP setup designed around your day-to-day operations.
            </p>
          </div>

          <div className="erp-categories-stack">
            {ERP_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.id} id={category.id} className="erp-category-card">
                  <div className="erp-category-header">
                    <div className="erp-category-icon-wrap" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="erp-category-meta">
                      <h3 className="erp-category-title">{category.title}</h3>
                      <p className="erp-category-subtitle">{category.subtitle}</p>
                    </div>
                  </div>

                  <div className="erp-features-grid">
                    {category.features.map((feature) => (
                      <div key={feature.title} className="erp-feature-item">
                        <h4 className="erp-feature-title">{feature.title}</h4>
                        <p className="erp-feature-desc">{feature.description}</p>
                        {feature.featureLink && (
                          <Link to={feature.featureLink} className="erp-feature-link">
                            Learn more about this module <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="erp-process-section">
        <div className="container">
          <div className="erp-section-head">
            <span className="section-label">Implementation</span>
            <h2 className="section-title">How Customised ERP Onboarding Works</h2>
            <p className="section-subtitle">
              From requirement mapping to go-live, your workflow is operational without disrupting your current accounting.
            </p>
          </div>

          <div className="erp-process-grid">
            <div className="erp-process-card">
              <span className="erp-process-step">01</span>
              <h3 className="erp-process-card-title">Workflow Mapping</h3>
              <p className="erp-process-card-body">
                We review your billing process, voucher series, godown setup, and team permissions to outline your module blueprint.
              </p>
            </div>
            <div className="erp-process-card">
              <span className="erp-process-step">02</span>
              <h3 className="erp-process-card-title">Tally Integration &amp; Config</h3>
              <p className="erp-process-card-body">
                The lightweight Takkada desktop connector links to your Tally instance in 30 minutes. Your custom templates, series, and rules are activated.
              </p>
            </div>
            <div className="erp-process-card">
              <span className="erp-process-step">03</span>
              <h3 className="erp-process-card-title">Team Onboarding &amp; Go-Live</h3>
              <p className="erp-process-card-body">
                Your staff, drivers, and sales reps download the mobile app. We verify sync, test print outputs, and hand over your customized environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="erp-cta-section">
        <div className="container">
          <div className="erp-cta-banner">
            <span className="section-label">Start Customising</span>
            <h2 className="erp-cta-title">Tell Us About Your Setup</h2>
            <p className="erp-cta-body">
              Whether you need automated FMCG billing, multi-company consolidation, or custom WhatsApp invoice workflows,
              our team will configure an ERP setup built for your exact distribution business.
            </p>
            <div className="erp-cta-buttons">
              <WhatsAppCTA context="customised-erp" variant="primary">
                Chat on WhatsApp
              </WhatsAppCTA>
              <CalendarCTA context="customised-erp" buttonVariant="secondary">
                Book a 15-min Demo
              </CalendarCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
