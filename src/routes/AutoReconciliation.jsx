import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import FAQItem from '../components/FAQItem';
import { Band, SectionHead, Card, CardGrid, CloseBand } from '../ui';
import '../ui/feature.css';
import '../ui/icp.css';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';
import { pricing } from '../data/siteContent';

// /auto-reconciliation-tally on the Campfire primitives (plan 2026-10-30-003,
// Task 7). Its own section order is kept: hero, the problem relay, the five
// stops, the evening outcomes, real payments, FAQ, reading, close. The copy is
// unchanged; the overlines, icon tiles and the drawn window chrome are gone.
// Motion: none of its own.

const FAQS = [
  {
    q: 'What does the receipt look like in Tally?',
    a: 'A normal receipt voucher, with bill-wise references against the invoices it settles. Your accountant sees nothing unusual, except that he didn\'t type it.',
  },
  {
    q: 'What if the Tally PC is off when the payment comes in?',
    a: 'The receipt waits and posts the moment Tally opens with the connector running. Takkada\'s own ledger view is right in the meantime.',
  },
  {
    q: 'Can I check what was posted?',
    a: 'Every receipt shows the payment it came from, the bills it settled, and that Takkada posted it.',
  },
  {
    q: 'Do I need to change how I bill?',
    a: 'No. Your invoice format, numbering and GST setup stay exactly as they are.',
  },
  {
    q: 'What about cash?',
    a: 'Salesman records it on his phone against the bill, or you record it as you do today.',
  },
];

const RELATED_BLOG_POSTS = [
  {
    slug: 'how-to-reconcile-bank-statement-tally-mobile',
    title: 'How to Reconcile a Bank Statement With Tally on Mobile',
  },
  {
    slug: 'how-to-split-upi-payment-across-tally-invoices',
    title: 'How to Split One UPI Payment Across Multiple Tally Invoices',
  },
  {
    slug: 'auto-reconciliation-tally',
    title: 'Auto Reconciliation Tally: The Full Mechanic',
  },
  {
    slug: 'bill-by-bill-against-reference-tally',
    title: 'Bill-by-Bill in Tally: What "Against Reference" Means',
  },
  {
    slug: 'zero-mdr-upi-collection-for-distributors-india',
    title: 'Zero MDR UPI Collection for Distributors in India',
  },
];

const BREADCRUMB_TRAIL = [
  { name: 'Home', url: 'https://takkada.com/' },
  { name: 'Auto Reconciliation', url: 'https://takkada.com/auto-reconciliation-tally/' },
];

const ACTORS = [
  { name: 'Customer', sub: 'Annapurna Kirana' },
  { name: 'Owner', sub: 'Shreeji Distributors' },
  { name: 'Accountant', sub: 'In the back office' },
];

const RELAY = [
  { meta: '10:05 AM • WhatsApp → Owner', text: <>Pays and sends a screenshot.<br /><em>"Sir, the payment is done. I have sent the screenshot."</em></> },
  { meta: '10:20 AM • Forward → Accountant', text: <em>"Annapurna's payment has come in. Please make the entry."</em> },
  { meta: '11:40 AM • Call → Owner', text: <><strong className="tabular-nums">₹48,000</strong>. Four bills open. None of them is <strong className="tabular-nums">₹48,000</strong>.<br /><em>"Which bill is it for?"</em></> },
  { meta: '11:45 AM • Call → Customer', text: <><em>"It is for the old one. The rest next week."</em><br />Which old one? He has hung up.</> },
  { meta: '12:30 PM • Call → Accountant', text: <><em>"Put it against the old one."</em><br />The accountant guesses the split.</> },
  { meta: 'Next day • 10:00 AM', text: 'Reminded again for the bill he thinks he paid. He calls the owner, annoyed.' },
];

const STOPS = [
  { meta: 'Stop 1 • 10:00 AM • Reminded', head: 'The reminder carries the link', desc: 'Both open bills, one Pay now link tied to those exact invoices.' },
  { meta: 'Stop 2 • 4:12 PM • Paid', head: 'He pays the way he likes', desc: 'UPI, NEFT, RTGS, card or netbanking. No screenshot to send.' },
  { meta: 'Stop 3 • 4:12 PM • Split', head: 'The invoices mark themselves paid', desc: '₹1,86,420.16 clears 0032. ₹62,479.84 clears 0047.' },
  { meta: 'Stop 4 • 4:12 PM • Receipt sent', head: 'The receipt reaches him', desc: '"₹2,48,900 received. Thank you."' },
  { meta: 'Stop 5 • 4:13 PM • In Tally ✓', head: 'Tally already knows', desc: "Receipt voucher against both bills. ₹0 due. Tomorrow's reminder skips him." },
];

const OUTCOMES = [
  { title: 'Your ledgers are right tonight', line: <>The outstanding report you open at <span className="tabular-nums">8 AM</span> is true.</> },
  { title: 'Nobody gets chased for money paid', line: 'A paid bill drops out of the reminder queue.' },
  { title: "It's out of your head", line: 'Matching lives in Tally, where your accountant and partner can see it.' },
  { title: 'You can take a day off', line: 'Nothing piles up waiting for you to match it.' },
];

const EDGE_CASES = [
  ['One link payment covering three bills', 'Split across the bills it settles.'],
  ['NEFT or RTGS through the link', 'Same as UPI: paid, receipt sent, Tally updated.'],
  [<><span className="tabular-nums">₹50,000</span> against an <span className="tabular-nums">₹80,000</span> bill</>, <><span className="tabular-nums">₹30,000</span> stays open. Reminders continue for the balance.</>],
  ['Direct NEFT or cheque, outside the link', 'Bank statement import suggests the party and bills.'],
  ['Cash with the salesman', 'He records it on his phone against the bill.'],
];

const Actions = () => (
  <div className="ui-hero-actions">
    <WhatsAppCTA context="icp-auto-reconciliation" tone="accent">Chat on WhatsApp to know more</WhatsAppCTA>
    <CalendarCTA context="icp-auto-reconciliation" />
  </div>
);

function AutoReconciliation() {
  const [faqIndex, setFaqIndex] = useState(-1);
  const faqItems = FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="ui-feature ui-icp ui-recon">
      <Seo
        title="Auto Reconciliation in Tally | Payments Match Invoices"
        description="Every payment finds its invoice and posts as a receipt in Tally. Split payments, bank transfers and reminders handled. Built for Indian distributors."
        path="https://takkada.com/auto-reconciliation-tally/"
        schemas={[
          softwareApplicationSchema(),
          faqPageSchema(faqItems),
          breadcrumbSchema(BREADCRUMB_TRAIL.map((entry) => ({ name: entry.name, path: entry.url }))),
        ]}
      />

      <Band tone="band" id="hero">
        <div className="ui-hero">
          <div className="ui-hero-copy">
            <h1 className="ui-hero-title">
              Payments update Tally on their own, with no screenshots and no calls.
            </h1>
            <p className="ui-hero-lead">
              Your customer pays from the link in your reminder, by UPI, NEFT, RTGS or card. Takkada marks the invoice paid, sends him the receipt, and posts it in Tally.
            </p>
            <Actions />
            <p className="ui-recon-trust">
              <span className="tabular-nums">100+ businesses</span> &bull; DPIIT Recognized Startup &bull; Play Store &amp; App Store &bull; Your Tally stays on your PC
            </p>
          </div>

          <div className="ui-recon-stage">
            <Card title="Today, on your phone" line="Without Takkada" className="ui-recon-panel">
              <ul className="ui-recon-lines">
                <li><span className="tabular-nums">₹2,48,900</span> Sir, the payment is done.</li>
                <li>Forwarded to Accountant</li>
                <li>Which bill is it for?</li>
                <li>Missed call &bull; Accountant</li>
                <li>Missed call &bull; Annapurna</li>
                <li>+2 more</li>
              </ul>
            </Card>
            <Card title="Same payment, in Takkada" line="Matched itself" className="ui-recon-panel">
              <ul className="ui-recon-lines">
                <li><span>Annapurna Kirana &bull; INV/26-27/0032</span><span className="tabular-nums">₹1,86,420.16 ✓ In Tally</span></li>
                <li><span>Annapurna Kirana &bull; INV/26-27/0047</span><span className="tabular-nums">₹62,479.84 ✓ In Tally</span></li>
                <li><span>Receipt sent on WhatsApp</span><span className="tabular-nums">₹2,48,900 &bull; 0 calls</span></li>
              </ul>
            </Card>
          </div>
        </div>
      </Band>

      <Band tone="white" id="problem">
        <SectionHead title="The customer paid. Now the phone calls start." />
        <CardGrid cols={3}>
          {ACTORS.map((a) => <Card key={a.name} title={a.name} line={a.sub} />)}
        </CardGrid>
        <div className="ui-recon-gap">
          <CardGrid cols={3}>
            {RELAY.map((r) => <Card key={r.meta} title={<span className="tabular-nums">{r.meta}</span>} line={r.text} />)}
          </CardGrid>
        </div>
        <div className="ui-card ui-recon-pull">
          <p className="ui-card-title">One payment brought a screenshot and four calls, and the ledger is still a guess.</p>
          <p className="ui-card-line">Shreeji Distributors gets twenty a day.</p>
        </div>
      </Band>

      <Band id="solution">
        <SectionHead
          title="You send one message. The rest happens on its own."
          lead={<>Same Annapurna Kirana, same day 28. Follow the <span className="tabular-nums">₹2,48,900</span>.</>}
        />
        <Card
          title="Takkada Auto-Reconciliation in Action • Real Tally Sync Demo"
          line="Watch link payment → auto-split → instant WhatsApp receipt → automatic Tally entry"
          className="ui-recon-video"
        >
          <video
            src="/assets/videos/takkada-reconciliation-music.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
            title="Takkada Auto Reconciliation Tally Demo Video"
          >
            Your browser does not support the video tag.
          </video>
        </Card>
        <div className="ui-recon-gap">
          <CardGrid cols={3}>
            {STOPS.map((stop) => (
              <Card key={stop.meta} title={stop.head} line={<span className="tabular-nums">{stop.desc}</span>} className="ui-recon-stop">
                <p className="ui-recon-meta tabular-nums">{stop.meta}</p>
              </Card>
            ))}
          </CardGrid>
        </div>
        <div className="ui-recon-zero">
          <p className="ui-card-title">Calls in this story: zero.</p>
          <Actions />
        </div>
      </Band>

      <Band tone="white" id="outcomes">
        <SectionHead title="What your evening looks like now." />
        <CardGrid cols={2}>
          {OUTCOMES.map((o) => <Card key={o.title} title={o.title} line={o.line} />)}
        </CardGrid>
        <figure className="ui-card ui-icp-quote ui-recon-gap">
          <blockquote>
            "Before Takkada, I couldn't take a single leave. I had to be at the counter to check payments, make vouchers, update Tally. Now it's completely stress-free. Everything happens automatically."
          </blockquote>
          <figcaption className="ui-card-line">Rajesh Sharma &bull; FMCG Distributor, Pune</figcaption>
        </figure>
      </Band>

      <Band id="edge-cases">
        <SectionHead title="Real payments are rarely one bill, one amount, one link." />
        <div className="ui-card ui-compare-card">
          <div className="ui-compare-scroll">
            <table className="ui-compare">
              <tbody>
                {EDGE_CASES.map(([when, what], i) => (
                  <tr key={i}><th scope="row">{when}</th><td className="ui-compare-us">{what}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="ui-footnote">
          Anything Takkada can't place with certainty waits for you in one list, with its best guess.
        </p>
        {/* Add-ons carry no price on the site: partners quote them (ruled 2026-10-04). */}
        <div className="ui-recon-gap">
          <Card title={pricing.addonsCta} line="Comes with Payment Collection on any Takkada plan. 0% MDR on UPI. 7-day free trial, no card." />
        </div>
      </Band>

      <Band tone="white" id="faq">
        <SectionHead title="Questions owners ask" />
        <div className="faq-list">
          {faqItems.map((item, i) => (
            <FAQItem key={item.question} item={item} isOpen={faqIndex === i} onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)} />
          ))}
        </div>
      </Band>

      <Band id="related-blogs">
        <SectionHead title="Read further" lead="Deep dives on payment collection, BRS, and bill-wise matching in Tally." />
        <ul className="ui-related">
          {RELATED_BLOG_POSTS.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`} className="ui-textlink">{post.title} <ArrowRight size={16} aria-hidden="true" /></Link>
            </li>
          ))}
        </ul>
      </Band>

      <CloseBand id="final-cta" title="Close the shop. The books are already done." accent="The books are already done.">
        <p className="ui-close-lead">
          Book a <span className="tabular-nums">15-minute</span> demo to see how Takkada automates payment reconciliation in your Tally, or chat with us on WhatsApp to learn more.
        </p>
        <div className="ui-close-actions">
          <WhatsAppCTA context="icp-auto-reconciliation" tone="accent">Chat on WhatsApp to know more</WhatsAppCTA>
          <CalendarCTA context="icp-auto-reconciliation" />
        </div>
      </CloseBand>
    </div>
  );
}

export default AutoReconciliation;
