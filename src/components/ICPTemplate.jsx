import { useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from './Seo';
import DemoTryCTA from './DemoTryCTA';
import CalendarCTA from './CalendarCTA';
import Breadcrumb from './Breadcrumb';
import FAQItem from './FAQItem';
import { Band, SectionHead, Card, CardGrid, AltRow, CloseBand } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';
import { HOME_CLOSE } from '../data/home';

// The ICP pages (/for-distributors, /mobile-tally, /whatsapp-invoice-tally) on
// the Campfire pattern (plan 2026-10-30-003, Task 7): hero, answer, capability
// text cards, the scenario as an alternating row, the testimonial as a quote
// card, FAQ, related reading, close band. The page root carries .ui-feature so
// the hero, answer, FAQ and related skins are the feature template's own.
// `overline` and `ctaPrimary` are still passed by the data and no longer drawn
// (no eyebrows; CalendarCTA owns the booking label). A capability `screen` is
// optional and none is set today, so every capability card is text only.
// Motion: none of its own.
function ICPTemplate({
  headline,
  subheadline,
  answer,
  relatedPosts = [],
  waContext,
  ctaSecondary,
  capabilitiesHeading,
  capabilities,
  scenario,
  testimonial,
  faqs,
  breadcrumb,
  seo,
}) {
  const [faqIndex, setFaqIndex] = useState(-1);
  const faqItems = faqs.map((f) => ({ question: f.q, answer: f.a }));
  const secondary = ctaSecondary.href.startsWith('http') ? (
    <a href={ctaSecondary.href} className="ui-textlink">{ctaSecondary.text}</a>
  ) : (
    <Link to={ctaSecondary.href} className="ui-textlink">{ctaSecondary.text}</Link>
  );

  return (
    <div className="ui-feature ui-icp">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.canonical}
        schemas={[
          softwareApplicationSchema(),
          faqPageSchema(faqItems),
          breadcrumbSchema(breadcrumb.map((entry) => ({ name: entry.name, path: entry.url }))),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb trail={breadcrumb} />
            <h1 className="ui-hero-title">{headline}</h1>
            <p className="ui-hero-lead">{subheadline}</p>
            <div className="ui-hero-actions">
              <DemoTryCTA context={waContext} />
              <CalendarCTA context={waContext} />
            </div>
            <p className="ui-hero-more">{secondary}</p>
          </div>
        </div>
      </Band>

      {answer && (
        <Band id="answer">
          <p className="ui-answer">{answer}</p>
        </Band>
      )}

      <Band tone="white" id="capabilities">
        <SectionHead title={capabilitiesHeading} />
        {/* Two columns for an even count, so four cards never leave an orphan. */}
        <CardGrid>
          {capabilities.map((c) => <Card key={c.title} title={c.title} line={c.body} />)}
        </CardGrid>
      </Band>

      <Band id="scenario">
        <AltRow title="A day in the life">
          <p className="ui-icp-scenario">{scenario}</p>
        </AltRow>
      </Band>

      {testimonial && (
        <Band tone="white" id="testimonial">
          <figure className="ui-card ui-icp-quote">
            <blockquote>{testimonial.quote}</blockquote>
            <figcaption className="ui-card-line">{testimonial.author}</figcaption>
          </figure>
        </Band>
      )}

      <Band id="faq">
        <SectionHead title="Before you sign up" />
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <FAQItem key={item.question} item={item} isOpen={faqIndex === i} onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)} />
          ))}
        </div>
      </Band>

      {relatedPosts.length > 0 && (
        <Band tone="white" id="related">
          <SectionHead title="Read further" />
          <ul className="ui-related">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`} className="ui-textlink">{post.title}</Link>
              </li>
            ))}
          </ul>
        </Band>
      )}

      <CloseBand id="close" title={HOME_CLOSE.title} cta={HOME_CLOSE.cta}>
        <DemoTryCTA context={waContext}>{HOME_CLOSE.cta.label}</DemoTryCTA>
      </CloseBand>
    </div>
  );
}

export default ICPTemplate;
