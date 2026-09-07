import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from './Seo';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import Breadcrumb from './Breadcrumb';
import FAQItem from './FAQItem';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';

// `answer` and `relatedPosts` are optional and were added 2026-08-08 for the
// Phase 3 refresh of the older ICP pages. Clarity's week-of-07-26 data showed
// these pages pulling zero search entries while blog posts pulled all of them,
// and the two things the posts had that these did not were a front-loaded
// answer paragraph and internal links. Both render only when supplied, so the
// ICP pages that have not been refreshed are byte-identical to before.
function ICPTemplate({
  overline,
  headline,
  subheadline,
  answer,
  relatedPosts = [],
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
            <Breadcrumb trail={breadcrumb} />
            <span className="section-label hero-overline">{overline}</span>
            <h1 className="hero-title icp-hero-title">{headline}</h1>
            <p className="hero-subtitle icp-hero-subtitle">{subheadline}</p>
            {answer && <p className="feature-answer">{answer}</p>}
            <div className="hero-ctas">
              <WhatsAppCTA context={waContext} />
              <CalendarCTA context={waContext}>{ctaPrimary.text}</CalendarCTA>
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

      {/* ── Related reading ── */}
      {relatedPosts.length > 0 && (
        <section className="feature-related" id="related">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Read further</h2>
            </div>
            <ul className="feature-related-list">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`}>
                    {post.title}
                    <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

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
              <CalendarCTA context={waContext} variant="link" className="final-cta-secondary-link">
                or book a <span className="tabular-nums">15-min</span> demo <ArrowRight size={16} />
              </CalendarCTA>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ICPTemplate;
