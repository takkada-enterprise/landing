import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from './Seo';
import CTAButton from './CTAButton';
import WhatsAppCTA from './WhatsAppCTA';
import FAQItem from './FAQItem';
import { track } from '../lib/track';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';

function ICPTemplate({
  overline,
  headline,
  subheadline,
  waContext,
  ctaPrimary,
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

  return (
    <>
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
            <span className="section-label hero-overline">{overline}</span>
            <h1 className="hero-title icp-hero-title">{headline}</h1>
            <p className="hero-subtitle icp-hero-subtitle">{subheadline}</p>
            <div className="hero-ctas">
              <WhatsAppCTA context={waContext} />
              <CTAButton
                variant="secondary"
                href={ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: waContext })}
              >
                {ctaPrimary.text}
              </CTAButton>
            </div>
            <p className="hero-tertiary-line">
              {ctaSecondary.href.startsWith('http') ? (
                <a href={ctaSecondary.href}>{ctaSecondary.text}</a>
              ) : (
                <Link to={ctaSecondary.href}>{ctaSecondary.text}</Link>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="tally-section" id="capabilities">
        <div className="container">
          <div className="section-header">
            <span className="section-label">{overline}</span>
            <h2 className="section-title">{capabilitiesHeading}</h2>
          </div>
          <div className="tally-grid">
            {capabilities.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.title} className="tally-card">
                  <div className="tally-card-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Scenario ── */}
      <section className="icp-scenario-section" id="scenario">
        <div className="container">
          <div className="icp-scenario-inner">
            <span className="section-label">A day in the life</span>
            <p className="icp-scenario-body">{scenario}</p>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      {testimonial && (
        <section className="testimonials-section" id="testimonial">
          <div className="container">
            <div className="testimonial-row">
              <article className="testimonial-card">
                <div className="testimonial-quote-mark" aria-hidden="true">&ldquo;</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden="true">
                    {testimonial.author.charAt(0)}
                  </div>
                  <p className="testimonial-name">{testimonial.author}</p>
                </div>
              </article>
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Before you sign up</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={faqIndex === i}
                onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)}
                delay={i * 50}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA Band ── */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <div className="final-cta-content">
            <h2>
              See it in 15 minutes.
              <br />
              Decide with a full picture.
            </h2>
            <p>
              Book a demo. We walk through your setup, your Tally version, and exactly what Takkada changes for your business.
            </p>
            <div className="final-cta-actions">
              <WhatsAppCTA context={waContext} variant="dark" />
              <a
                href={ctaPrimary.href}
                className="final-cta-secondary-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track('calendar_open', { cta_context: waContext })}
              >
                or book a 15-min demo <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ICPTemplate;
