import { useState } from 'react';
import { ArrowRight, BadgeIndianRupee, Handshake, MessageCircle, Workflow } from 'lucide-react';
import Seo from '../components/Seo';
import CTAButton from '../components/CTAButton';
import FAQItem from '../components/FAQItem';
import { faqPageSchema } from '../data/schema';
import { usePhoneModal } from '../context/PhoneModalContext';

const partnerBenefits = [
  {
    icon: BadgeIndianRupee,
    title: 'Recurring revenue on every client onboarded',
    body: 'Earn commission on the first sale and on every renewal. Distributors stay on the product because their reconciliation is gone, so renewals happen.',
  },
  {
    icon: Handshake,
    title: 'Zero conflict with your Tally licence sales',
    body: 'Takkada runs on top of Tally. Your Tally licence and renewal commercials stay exactly as they are. The same client signs two cheques, you collect on both.',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp-first workflow your clients already use',
    body: 'Reminders, invoices, and payment links flow over WhatsApp. The client does not have to learn a new app to receive money.',
  },
  {
    icon: Workflow,
    title: 'End to end: reminders, UPI, reconciliation, GST',
    body: 'Payment reminders, UPI collection with zero MDR, auto reconciliation into Tally, and e-invoice plus e-way bill from the phone. One product covers the whole receivables loop.',
  },
];

const clientWins = [
  'Higher collection rates from automatic reminders',
  'Auto reconciliation directly into Tally',
  'No manual follow ups, no screenshot verification',
  'T+1 settlement to the bank account',
];

const audienceList = [
  'Tally Solution Partners and Tally Certified Partners',
  'Independent ERP resellers',
  'Practising CAs and accounting firms managing distributor clients',
  'Channel partners with an existing SMB or distributor base',
];

const partnerFaqs = [
  {
    question: 'How does the commission structure work?',
    answer:
      'Partners earn recurring commission on every plan sold and on every renewal, paid out by the 5th of every month via UPI. The exact commercials are confirmed in your partner agreement.',
  },
  {
    question: 'Will Takkada interfere with my Tally licence renewals?',
    answer:
      'No. Takkada is a layer on top of Tally. Your client keeps their Tally licence with you, renews with you, and runs Takkada alongside. Tally is the neighbour, not the competitor.',
  },
  {
    question: 'How long does onboarding a client take?',
    answer:
      'Most distributors are live in under an hour. The Tally connector takes about 30 minutes to set up on the client machine. The mobile app takes 15 minutes for the team to learn. KYC activation finishes within 24 hours and the payment gateway in 4 to 7 working days.',
  },
  {
    question: 'Do I need technical skills to sell or set up Takkada?',
    answer:
      'No. If you can install Tally and understand a distributor’s receivables, you can sell and set up Takkada. The first 3 customers are done with you: Takkada handles those installs end to end while you observe, so you are never left figuring it out alone.',
  },
  {
    question: 'Is there a partner portal or dashboard?',
    // TODO: confirm with founder once portal scope is finalized.
    answer:
      'A partner dashboard with client status, commission tracking, and payouts is on the roadmap. Until then, you receive a monthly statement and can ping the founder directly for any client question.',
  },
];

const seo = {
  title: 'Partner with Takkada | For Tally Partners',
  description:
    'Earn recurring commission on every Tally customer you bring to Takkada. Sell it alongside your Tally licence. Reminders, UPI, auto reconciliation.',
  canonical: '/partners/',
};

const breadcrumb = [
  { name: 'Home', url: 'https://takkada.com/' },
  { name: 'Partners', url: 'https://takkada.com/partners/' },
];

const PARTNER_MODAL_OPTIONS = Object.freeze({
  title: 'Talk to the founder',
  subtitle: 'Drop your number. The next screen books a 20-minute slot with Ronak.',
  submitLabel: 'Continue to calendar',
});

function buildBreadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: entry.url,
    })),
  };
}

function Partners() {
  const { openWith } = usePhoneModal();
  const openPartnerModal = () => openWith(PARTNER_MODAL_OPTIONS);

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.canonical}
        schemas={[
          faqPageSchema(partnerFaqs),
          buildBreadcrumbSchema(breadcrumb),
        ]}
      />

      {/* ── Hero ── */}
      <section className="hero icp-hero" id="hero">
        <div className="container">
          <div className="hero-content icp-hero-content">
            <nav aria-label="Breadcrumb" className="icp-breadcrumb">
              {breadcrumb.map((item, i) => (
                <span key={item.url}>
                  {i > 0 && <span className="icp-breadcrumb-sep" aria-hidden="true">/</span>}
                  {i === breadcrumb.length - 1 ? (
                    <span aria-current="page">{item.name}</span>
                  ) : (
                    <a href={item.url}>{item.name}</a>
                  )}
                </span>
              ))}
            </nav>
            <span className="section-label hero-overline">FOR TALLY PARTNERS</span>
            <h1 className="hero-title icp-hero-title">One customer. Two products.</h1>
            <p className="hero-subtitle icp-hero-subtitle">
              Alongside your Tally, sell Takkada and earn recurring commission on
              every customer, on the first sale and on every renewal. They stay on
              the product because their reconciliation has gone away, so the
              renewals keep coming.
            </p>
            <div className="hero-ctas">
              <CTAButton variant="primary" type="button" onClick={openPartnerModal}>
                Book a meeting with the founder <ArrowRight size={18} />
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why partner ── */}
      <section className="tally-section" id="why-partner">
        <div className="container">
          <div className="section-header">
            <span className="section-label">WHY PARTNER WITH TAKKADA</span>
            <h2 className="section-title">Same customer, deeper wallet share.</h2>
          </div>
          <div className="tally-grid">
            {partnerBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{b.title}</h3>
                  <p>{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Client wins strip ── */}
      <section className="icp-scenario-section" id="client-wins">
        <div className="container">
          <div className="icp-scenario-inner">
            <span className="section-label">WHAT YOUR CLIENT GETS</span>
            <ul className="partner-wins-list">
              {clientWins.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Audience ── */}
      <section className="tally-section" id="audience">
        <div className="container">
          <div className="section-header">
            <span className="section-label">WHO THIS IS FOR</span>
            <h2 className="section-title">If your business already touches Tally users, this fits.</h2>
          </div>
          <div className="partner-audience-list">
            {audienceList.map((line) => (
              <div key={line} className="partner-audience-row">
                <span className="partner-audience-bullet" aria-hidden="true" />
                <p>{line}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQSection items={partnerFaqs} />

      {/* ── Footer CTA ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              Already have a client in mind?
              <br />
              Book a <span className="tabular-nums">20</span>-minute call.
            </h2>
            <p>
              We will walk through their Tally setup, the receivables shape, and exactly what changes when Takkada goes on top.
            </p>
            <div className="final-cta-actions">
              <CTAButton variant="dark" type="button" onClick={openPartnerModal}>
                Book a meeting with the founder <ArrowRight size={18} />
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQSection({ items }) {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Before you sign up</h2>
        </div>
        <div className="faq-list">
          {items.map((item, i) => (
            <FAQItem
              key={item.question}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(i === openIndex ? -1 : i)}
              delay={i * 50}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Partners;
