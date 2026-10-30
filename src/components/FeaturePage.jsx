import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from './Seo';
import CallPlayer from './CallPlayer';
import WhatsAppCTA from './WhatsAppCTA';
import DemoTryCTA from './DemoTryCTA';
import Breadcrumb from './Breadcrumb';
import FAQItem from './FAQItem';
import { Band, SectionHead, Card, CardGrid, Shot, AltRow, CloseBand } from '../ui';
import '../ui/feature.css';
import { pricing, planPricing } from '../data/siteContent';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema, articlePageSchema, SITE_URL } from '../data/schema';
import { featurePagePath, heroShot, stepShot } from '../data/featurePages';
import { HOME_CLOSE } from '../data/home';

// One template for every FEATURE_PAGES entry (plan 2026-10-30-003, Task 5). The answer
// sits under the hero (AI search cites a page's first third); the comparison is real
// <table> markup with competitors unnamed. Motion: none of its own.

// Steps still name an icon in featurePages.js and the data test pins each
// name; the Campfire cards draw none.
export const ICON_NAMES = [
  'Activity', 'BarChart3', 'BookOpen', 'CalendarClock', 'Camera', 'CheckCheck', 'Clock', 'FileCheck2',
  'LayoutGrid', 'Link2', 'ListChecks', 'Lock', 'MapPin', 'MessageCircle', 'PackageCheck', 'QrCode', 'Route',
  'Send', 'Share2', 'ShieldCheck', 'Target', 'Truck', 'Wallet',
];

const CARD_SIZES = '(max-width: 899px) 80vw, 300px';
const More = ({ to, children }) => <Link to={to} className="ui-textlink">{children} <ArrowRight size={16} aria-hidden="true" /></Link>;

// A registry picture goes through Shot; a step still carrying a legacy
// `image`/`screenshot` is a plain img with its own alt (Shot throws on it).
function StepPicture({ step }) {
  if (step.screen) return <Shot screen={step.screen} sizes={CARD_SIZES} />;
  const s = stepShot(step);
  return s && <img src={s.src} alt={s.alt} width={s.width} height={s.height} loading="lazy" decoding="async" />;
}

function FeaturePage({ page }) {
  const [faqIndex, setFaqIndex] = useState(-1);
  const path = featurePagePath(page);
  const shot = heroShot(page);
  const steps = page.walkthrough ?? page.tour?.stations ?? [];
  const faqItems = page.faqs.map((f) => ({ question: f.q, answer: f.a }));
  const trail = [{ name: 'Home', url: `${SITE_URL}/` }, { name: page.llms.title, url: `${SITE_URL}${path}/` }];
  // Every price is derived from the rate card, never typed (CLAUDE.md §3).
  const plan = pricing.plans.find((p) => p.plan === page.planPointer.plan);
  const quote = plan && planPricing(plan);
  const { listen, gallery, sheet, detail, comparison } = page;

  return (
    <div className="ui-feature">
      <Seo title={page.seo.title} description={page.seo.description} path={path} ogType="article" schemas={[
          // Image: the first step's picture, else the hero, so a tour-only page
          // still emits Article with an image.
          articlePageSchema({ headline: page.searchPhrase, description: page.seo.description, image: stepShot(steps[0])?.src ?? shot?.src,
            datePublished: page.datePublished, dateModified: page.updated, author: page.author, path }),
          softwareApplicationSchema(),
          faqPageSchema(faqItems),
          breadcrumbSchema(trail.map((e) => ({ name: e.name, path: e.url }))),
      ]} />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <Breadcrumb trail={trail} />
            <h1 className="ui-hero-title">{page.headline}</h1>
            <p className="ui-hero-lead">{page.subheadline}</p>
            <div className="ui-hero-actions">
              <DemoTryCTA context={page.waContext} />
              <WhatsAppCTA context={page.waContext} tone="ghost" />
            </div>
          </div>
          {/* LCP picture: stripImagePreloads keeps only "high" preloads; never hand-write one. */}
          {shot && (
            <div className="ui-hero-stage">
              {page.hero.screen ? (
                <Shot screen={page.hero.screen} eager fetchPriority="high" sizes="(max-width: 767px) 70vw, 300px" />
              ) : (
                <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} fetchPriority="high" />
              )}
            </div>
          )}
        </div>
      </Band>

      <Band id="answer">
        <p className="ui-answer">{page.answer}</p>
        {listen && (
          <div id="listen"><Card title={listen.heading} line={listen.body} className="ui-listen">
            <CallPlayer listen={listen} />
            {listen.caption && <p className="ui-listen-caption">{listen.caption}</p>}
          </Card></div>
        )}
      </Band>

      <Band tone="white" id="how-it-works">
        <SectionHead title={page.walkthroughHeading ?? page.tour.heading} lead={page.tour?.intro} />
        <CardGrid cols={2}>
          {steps.slice(0, 2).map((step) => (
            <Card key={step.title} title={step.title} line={step.body}>
              <StepPicture step={step} />
            </Card>
          ))}
        </CardGrid>
        {steps.length > 2 && (
          <div className="ui-steps-rows">
            {steps.slice(2).map((step, i) => (
              <AltRow key={step.title} title={step.title} line={step.body} flip={i % 2 === 1}>
                <StepPicture step={step} />
              </AltRow>
            ))}
          </div>
        )}
        {page.tour?.footnote && <p className="ui-footnote">{page.tour.footnote}</p>}
      </Band>

      {gallery && (
        <Band id="gallery">
          <SectionHead title={gallery.heading} lead={gallery.intro} />
          <CardGrid cols={4}>
            {gallery.items.map((item) => (
              <Card key={item.screen} title={item.title} line={item.body}>
                <Shot screen={item.screen} sizes="(max-width: 599px) 80vw, 260px" />
              </Card>
            ))}
          </CardGrid>
        </Band>
      )}

      {sheet && (
        <Band id="sheet">
          <Card title={sheet.heading} line={sheet.body} className="ui-sheet">
            <Shot screen={sheet.screen} sizes="(max-width: 767px) calc(100vw - 48px), 1080px" />
          </Card>
        </Band>
      )}

      {detail && (
        <Band tone="white" id="detail">
          <SectionHead title={detail.heading} lead={detail.intro} />
          <CardGrid cols={3}>
            {detail.groups.map((group) => (
              <Card key={group.title} title={group.title} className="ui-detail">
                <ul>
                  {group.points.map((pt) => <li key={pt.lead}><strong>{pt.lead}.</strong> {pt.text}</li>)}
                </ul>
              </Card>
            ))}
          </CardGrid>
          {detail.guide && <p className="ui-detail-more"><More to={`/guide/${detail.guide.slug}`}>{detail.guide.label}</More></p>}
        </Band>
      )}

      <Band id="comparison">
        <Card title={comparison.heading} className="ui-compare-card">
          <table className="ui-compare">
            <thead>
              <tr><th scope="col">What you need</th><th scope="col" className="ui-compare-us">Takkada</th><th scope="col">{comparison.othersLabel}</th></tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.feature}><th scope="row">{row.feature}</th><td className="ui-compare-us">{row.takkada}</td><td>{row.others}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="ui-compare-note">{comparison.disclaimer}</p>
        </Card>
        {quote && (
          <Card title={plan.plan} line={page.planPointer.note} className="ui-plan">
            <p className="ui-plan-figure">
              <span className="ui-plan-price tabular-nums">{quote.price}</span> {quote.period}
              {quote.totalLabel && <span className="tabular-nums"> on a {quote.term.years}-year term</span>}
            </p>
            <More to="/#pricing">See what every plan includes</More>
          </Card>
        )}
      </Band>

      <Band tone="white" id="faq">
        <SectionHead title="Questions distributors ask" />
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <FAQItem key={item.question} item={item} isOpen={faqIndex === i} onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)} />
          ))}
        </div>
      </Band>

      {page.relatedPosts.length > 0 && (
        <Band id="related">
          <SectionHead title="Read further" />
          <ul className="ui-related">
            {page.relatedPosts.map((post) => <li key={post.slug}><More to={`/blog/${post.slug}`}>{post.title}</More></li>)}
          </ul>
        </Band>
      )}

      <CloseBand id="close" title={HOME_CLOSE.title} accent={HOME_CLOSE.accent} cta={HOME_CLOSE.cta}>
        <DemoTryCTA context={page.waContext}>{HOME_CLOSE.cta.label}</DemoTryCTA>
      </CloseBand>
    </div>
  );
}

export default FeaturePage;
