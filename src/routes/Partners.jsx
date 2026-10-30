import { useState } from 'react';
import Seo from '../components/Seo';
import Breadcrumb from '../components/Breadcrumb';
import FAQItem from '../components/FAQItem';
import WhatsAppCTA from '../components/WhatsAppCTA';
import { Band, Pill, SectionHead, Card, CardGrid, AltRow, Shot, CloseBand } from '../ui';
// The feature-page skin carries the hero, text cards and FAQ rows this page
// shares with it (every rule is prefixed .ui-feature).
import '../ui/feature.css';
import { breadcrumbSchema, faqPageSchema } from '../data/schema';
import { usePhoneModal } from '../context/PhoneModalContext';
import {
  PARTNER_HERO,
  PARTNER_EARN,
  PARTNER_MODAL_OPTIONS,
  PARTNER_WA_MESSAGE,
  partnerBenefits,
  clientWins,
  audienceList,
  partnerFaqs,
} from '../data/partners';

// /partners on the Campfire template (plan 2026-10-30-003, Task 6). Copy lives
// in src/data/partners.js. No commission percentage anywhere (CLAUDE.md §4).
// Motion: none of its own.

const seo = {
  title: 'Partner with Takkada | For Tally Partners',
  description:
    'Earn recurring commission on every Tally customer you bring to Takkada. Sell it alongside your Tally licence. Reminders, UPI, auto reconciliation.',
  path: '/partners/',
};

const trail = [
  { name: 'Home', url: 'https://takkada.com/', path: '/' },
  { name: 'Partners', url: 'https://takkada.com/partners/', path: seo.path },
];

// A list in a row's media box: the card-line type, no CSS of its own.
const List = ({ items }) => (
  <ul className="ui-card-line">
    {items.map((line) => <li key={line}>{line}</li>)}
  </ul>
);

function Partners() {
  const { openWith } = usePhoneModal();
  const openPartnerModal = () => openWith(PARTNER_MODAL_OPTIONS);
  const [faqIndex, setFaqIndex] = useState(-1);

  return (
    <div className="ui-feature">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        schemas={[
          faqPageSchema(partnerFaqs),
          breadcrumbSchema(trail),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb trail={trail} />
            <h1 className="ui-hero-title">{PARTNER_HERO.headline}</h1>
            <p className="ui-hero-lead">{PARTNER_HERO.lead}</p>
            <div className="ui-hero-actions">
              <Pill onClick={openPartnerModal}>Book a meeting with the founder</Pill>
            </div>
          </div>
          <div className="ui-hero-stage">
            <Shot screen="reminders" eager fetchPriority="high" sizes="(max-width: 767px) 70vw, 300px" />
          </div>
        </div>
      </Band>

      <Band id="how-you-earn">
        <SectionHead title="How you earn" />
        <CardGrid>
          {PARTNER_EARN.map((c) => <Card key={c.title} title={c.title} line={c.line} />)}
        </CardGrid>
      </Band>

      <Band tone="white" id="why-partner">
        <SectionHead title="Same customer, deeper wallet share." />
        <CardGrid>
          {partnerBenefits.map((b) => <Card key={b.title} title={b.title} line={b.body} />)}
        </CardGrid>
      </Band>

      <Band id="client-wins">
        <AltRow title="What your client gets" line="What changes for the distributor once Takkada sits on his Tally.">
          <List items={clientWins} />
        </AltRow>
        <AltRow flip title="Who this is for" line="If your business already touches Tally users, this fits.">
          <List items={audienceList} />
        </AltRow>
      </Band>

      <Band tone="white" id="faq">
        <SectionHead title="Before you sign up" />
        <div className="faq-list">
          {partnerFaqs.map((item, i) => (
            <FAQItem key={item.question} item={item} isOpen={faqIndex === i} onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)} />
          ))}
        </div>
      </Band>

      <CloseBand id="close" title="Sell Takkada alongside your Tally.">
        <WhatsAppCTA context="partners" message={PARTNER_WA_MESSAGE} tone="accent">Become a partner</WhatsAppCTA>
      </CloseBand>
    </div>
  );
}

export default Partners;
