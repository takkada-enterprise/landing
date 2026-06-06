import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from './Seo';
import CTAButton from './CTAButton';
import FAQItem from './FAQItem';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';

function ICPTemplate({
  overline,
  headline,
  subheadline,
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
              <CTAButton variant="primary" href={ctaPrimary.href}>
                {ctaPrimary.text} <ArrowRight size={18} />
              </CTAButton>
              {ctaSecondary.href.startsWith('http') ? (
                <a href={ctaSecondary.href} className="cta-btn cta-btn--secondary">
                  {ctaSecondary.text}
                </a>
              ) : (
                <Link to={ctaSecondary.href} className="cta-btn cta-btn--secondary">
                  {ctaSecondary.text}
                </Link>
              )}
            </div>
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
              <CTAButton variant="dark" href={ctaPrimary.href}>
                Book a 15-min demo <ArrowRight size={18} />
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ICPTemplate;
