import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileCheck,
  Calendar,
  AlertCircle,
  MessageSquare,
  PhoneOff,
  Building,
  Zap,
  Play,
  User,
  PhoneCall,
  ChevronDown,
} from 'lucide-react';
import Seo from '../components/Seo';
import WhatsAppCTA from '../components/WhatsAppCTA';
import CalendarCTA from '../components/CalendarCTA';
import FAQItem from '../components/FAQItem';
import { softwareApplicationSchema, faqPageSchema, breadcrumbSchema } from '../data/schema';
import { pricing } from '../data/siteContent';
import './AutoReconciliation.css';

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

function AutoReconciliation() {
  const [faqIndex, setFaqIndex] = useState(-1);

  const faqItems = FAQS.map((f) => ({ question: f.q, answer: f.a }));

  return (
    <div className="recon-page">
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

      {/* ── Hero Band (Matching PDF Page 1) ── */}
      <section className="recon-hero" id="hero">
        <div className="container">
          <div className="recon-hero-grid">
            <div className="recon-hero-left">
              <span className="recon-overline">AUTO-RECONCILIATION</span>
              <h1 className="recon-hero-title">
                No screenshots.
                <br />
                No calls.
                <br />
                Payments update Tally on their own.
              </h1>
              <p className="recon-hero-subheadline">
                Your customer pays from the link in your reminder, by UPI, NEFT, RTGS or card. Takkada marks the invoice paid, sends him the receipt, and posts it in Tally.
              </p>
              <div className="recon-hero-ctas">
                <CalendarCTA context="icp-auto-reconciliation" variant="primary">
                  Book a 15-min demo
                </CalendarCTA>
                <WhatsAppCTA context="icp-auto-reconciliation" variant="secondary">
                  Chat on WhatsApp to know more
                </WhatsAppCTA>
              </div>
              <div className="recon-trust-strip">
                <span className="recon-trust-item">
                  <span className="recon-trust-badge tabular-nums">100+ businesses</span>
                </span>
                <span className="recon-trust-item">&bull; DPIIT Recognized Startup</span>
                <span className="recon-trust-item">&bull; Play Store &amp; App Store</span>
                <span className="recon-trust-item">&bull; Your Tally stays on your PC</span>
              </div>
            </div>

            {/* Right Hero Visual Stack */}
            <div className="recon-hero-visual-stack">
              {/* Chaos Panel */}
              <div className="recon-visual-panel">
                <div className="recon-panel-head">
                  <span>Today, on your phone</span>
                  <span className="recon-panel-tag-bad">Without Takkada</span>
                </div>
                <div className="recon-chaos-chat">
                  <div className="recon-chaos-bubble-in">
                    <span style={{ fontSize: '11px', background: '#334155', padding: '2px 6px', borderRadius: '4px' }} className="tabular-nums">₹2,48,900</span>
                    <span>Bhaiya, payment kar diya.</span>
                  </div>
                  <div className="recon-chaos-bubble-out">
                    Forwarded to Accountant
                  </div>
                  <div style={{ fontSize: '12px', color: '#FCA5A5', marginTop: '4px' }}>
                    Sir, kaunse bill ka hai?
                  </div>
                  <div className="recon-missed-badges">
                    <span className="recon-missed-pill">Missed call &bull; Accountant</span>
                    <span className="recon-missed-pill">Missed call &bull; Annapurna</span>
                    <span className="recon-missed-pill">+2 more</span>
                  </div>
                </div>
              </div>

              {/* Matched Panel */}
              <div className="recon-matched-panel">
                <div className="recon-matched-head">
                  <span>Same payment, in Takkada</span>
                  <span className="recon-panel-tag-good">Matched itself</span>
                </div>
                <div className="recon-matched-row">
                  <div>
                    <div className="recon-matched-party">Annapurna Kirana</div>
                    <div className="recon-matched-inv">INV/26-27/0032</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="recon-matched-amt tabular-nums">₹1,86,420.16</div>
                    <div className="recon-tally-tick">&check; In Tally</div>
                  </div>
                </div>

                <div className="recon-matched-row">
                  <div>
                    <div className="recon-matched-party">Annapurna Kirana</div>
                    <div className="recon-matched-inv">INV/26-27/0047</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="recon-matched-amt tabular-nums">₹62,479.84</div>
                    <div className="recon-tally-tick">&check; In Tally</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #F1F5F9' }}>
                  <span>Receipt sent on WhatsApp</span>
                  <span className="tabular-nums" style={{ fontWeight: 700, color: '#0F1F3D' }}>₹2,48,900 &bull; 0 calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 1: The Problem (Customer Paid - PDF Page 1 & 2 Relay) ── */}
      <section className="recon-section recon-section-light" id="problem">
        <div className="container">
          <div className="section-header">
            <span className="section-label">DAY 28 &bull; THE REMINDER HAS GONE OUT</span>
            <h2 className="section-title">The customer paid. Now the phone calls start.</h2>
          </div>

          <div className="recon-relay-header-actors">
            <div className="recon-actor-card">
              <div className="recon-actor-avatar">C</div>
              <div>
                <div className="recon-actor-name">Customer</div>
                <div className="recon-actor-sub">Annapurna Kirana</div>
              </div>
            </div>

            <div className="recon-actor-card">
              <div className="recon-actor-avatar">O</div>
              <div>
                <div className="recon-actor-name">Owner</div>
                <div className="recon-actor-sub">Shreeji Distributors</div>
              </div>
            </div>

            <div className="recon-actor-card">
              <div className="recon-actor-avatar">A</div>
              <div>
                <div className="recon-actor-name">Accountant</div>
                <div className="recon-actor-sub">In the back office</div>
              </div>
            </div>
          </div>

          <div className="recon-relay-flow">
            <div className="recon-relay-card customer">
              <div className="recon-relay-meta tabular-nums">10:05 AM &bull; WhatsApp &rarr; Owner</div>
              <div className="recon-relay-text">
                Pays and sends a screenshot.
                <br />
                <em>"Bhaiya, payment kar diya. Screenshot bheja hai."</em>
              </div>
            </div>

            <div className="recon-relay-card owner">
              <div className="recon-relay-meta tabular-nums">10:20 AM &bull; Forward &rarr; Accountant</div>
              <div className="recon-relay-text">
                <em>"Annapurna ka payment aaya hai, entry kar dena."</em>
              </div>
            </div>

            <div className="recon-relay-card accountant">
              <div className="recon-relay-meta tabular-nums">11:40 AM &bull; Call &rarr; Owner</div>
              <div className="recon-relay-text">
                <strong className="tabular-nums">₹48,000</strong>. Four bills open. None of them is <strong className="tabular-nums">₹48,000</strong>.
                <br />
                <em>"Sir, kaunse bill ka hai?"</em>
              </div>
            </div>

            <div className="recon-relay-card owner">
              <div className="recon-relay-meta tabular-nums">11:45 AM &bull; Call &rarr; Customer</div>
              <div className="recon-relay-text">
                <em>"Purane wale ka hai, baaki agle hafte."</em>
                <br />
                Which old one? He has hung up.
              </div>
            </div>

            <div className="recon-relay-card accountant">
              <div className="recon-relay-meta tabular-nums">12:30 PM &bull; Call &rarr; Accountant</div>
              <div className="recon-relay-text">
                <em>"Purane wale mein daal do."</em>
                <br />
                The accountant guesses the split.
              </div>
            </div>

            <div className="recon-relay-card customer">
              <div className="recon-relay-meta tabular-nums">Next day &bull; 10:00 AM</div>
              <div className="recon-relay-text">
                Reminded again for the bill he thinks he paid. He calls the owner, annoyed.
              </div>
            </div>
          </div>

          <div className="recon-pull-banner">
            <div className="recon-pull-title">
              One payment. One screenshot. Four calls. And the ledger is still a guess.
            </div>
            <div className="recon-pull-sub">
              Shreeji Distributors gets twenty a day.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: With Takkada (PDF Page 2 Horizontal 5 Stops) ── */}
      <section className="recon-section recon-section-soft" id="solution">
        <div className="container">
          <div className="section-header">
            <span className="section-label">WITH TAKKADA</span>
            <h2 className="section-title">You send one message. The rest happens on its own.</h2>
            <p className="section-subtitle">
              Same Annapurna Kirana, same day 28. Follow the <span className="tabular-nums">₹2,48,900</span>.
            </p>
          </div>

          {/* Product Video Showcase */}
          <div className="recon-video-card">
            <div className="recon-video-header">
              <div className="recon-video-dots">
                <span className="recon-dot red" />
                <span className="recon-dot yellow" />
                <span className="recon-dot green" />
              </div>
              <div className="recon-video-title-bar">
                <span>Takkada Auto-Reconciliation in Action &bull; Real Tally Sync Demo</span>
              </div>
            </div>
            <div className="recon-video-wrapper">
              <video
                className="recon-video-player"
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
            </div>
            <div className="recon-video-caption">
              <span className="recon-live-badge">REAL DEMO</span>
              <span>Watch link payment &rarr; auto-split &rarr; instant WhatsApp receipt &rarr; automatic Tally entry</span>
            </div>
          </div>

          {/* 5 Horizontal Stop Cards */}
          <div className="recon-stops-grid">
            <div className="recon-stop-box">
              <div className="recon-stop-time tabular-nums">STOP 1 &bull; 10:00 AM</div>
              <span className="recon-stop-tag reminded">REMINDED</span>
              <h3 className="recon-stop-head">The reminder carries the link</h3>
              <p className="recon-stop-desc">
                Both open bills, one Pay now link tied to those exact invoices.
              </p>
            </div>

            <div className="recon-stop-box">
              <div className="recon-stop-time tabular-nums">STOP 2 &bull; 4:12 PM</div>
              <span className="recon-stop-tag paid">PAID</span>
              <h3 className="recon-stop-head">He pays the way he likes</h3>
              <p className="recon-stop-desc">
                UPI, NEFT, RTGS, card or netbanking. No screenshot to send.
              </p>
            </div>

            <div className="recon-stop-box">
              <div className="recon-stop-time tabular-nums">STOP 3 &bull; 4:12 PM</div>
              <span className="recon-stop-tag split">SPLIT</span>
              <h3 className="recon-stop-head">The invoices mark themselves paid</h3>
              <p className="recon-stop-desc tabular-nums">
                ₹1,86,420.16 clears 0032. ₹62,479.84 clears 0047.
              </p>
            </div>

            <div className="recon-stop-box">
              <div className="recon-stop-time tabular-nums">STOP 4 &bull; 4:12 PM</div>
              <span className="recon-stop-tag receipt">RECEIPT SENT</span>
              <h3 className="recon-stop-head">The receipt reaches him</h3>
              <p className="recon-stop-desc tabular-nums">
                "₹2,48,900 prapt hue. Dhanyavaad."
              </p>
            </div>

            <div className="recon-stop-box active-green">
              <div className="recon-stop-time tabular-nums">STOP 5 &bull; 4:13 PM</div>
              <span className="recon-stop-tag tally">IN TALLY &check;</span>
              <h3 className="recon-stop-head">Tally already knows</h3>
              <p className="recon-stop-desc tabular-nums">
                Receipt voucher against both bills. ₹0 due. Tomorrow's reminder skips him.
              </p>
            </div>
          </div>

          <div className="recon-zero-bar">
            <div className="recon-zero-title">
              Calls in this story: zero.
            </div>
            <div className="recon-hero-ctas">
              <CalendarCTA context="icp-auto-reconciliation" variant="primary">
                Book a 15-min demo
              </CalendarCTA>
              <WhatsAppCTA context="icp-auto-reconciliation" variant="secondary">
                Chat on WhatsApp to know more
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: What Your Evening Looks Like Now (PDF Page 3) ── */}
      <section className="recon-section recon-section-light" id="outcomes">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What your evening looks like now.</h2>
          </div>

          <div className="recon-bento-4grid">
            <div className="recon-bento-tile">
              <div className="recon-bento-tile-icon">
                <FileCheck size={20} />
              </div>
              <h3>Your ledgers are right tonight</h3>
              <p>
                The outstanding report you open at <span className="tabular-nums">8 AM</span> is true.
              </p>
            </div>

            <div className="recon-bento-tile">
              <div className="recon-bento-tile-icon">
                <ShieldCheck size={20} />
              </div>
              <h3>Nobody gets chased for money paid</h3>
              <p>
                A paid bill drops out of the reminder queue.
              </p>
            </div>

            <div className="recon-bento-tile">
              <div className="recon-bento-tile-icon">
                <Building size={20} />
              </div>
              <h3>It's out of your head</h3>
              <p>
                Matching lives in Tally, where your accountant and partner can see it.
              </p>
            </div>

            <div className="recon-bento-tile">
              <div className="recon-bento-tile-icon">
                <Calendar size={20} />
              </div>
              <h3>You can take a day off</h3>
              <p>
                Nothing piles up waiting for you to match it.
              </p>
            </div>
          </div>

          {/* Quote Box */}
          <div className="recon-quote-box">
            <div className="recon-quote-text">
              "Before Takkada, I couldn't take a single leave. I had to be at the counter to check payments, make vouchers, update Tally. Now it's completely stress-free. Everything happens automatically."
            </div>
            <div className="recon-quote-author">
              &mdash; Rajesh Sharma &bull; FMCG Distributor, Pune
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Real Payments Matrix Table (PDF Page 3) ── */}
      <section className="recon-section recon-section-soft" id="edge-cases">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Real payments are rarely one bill, one amount, one link.</h2>
          </div>

          <div className="recon-table-card">
            <div className="recon-table-row">
              <div className="recon-table-cell-left">One link payment covering three bills</div>
              <div className="recon-table-cell-right">Split across the bills it settles.</div>
            </div>

            <div className="recon-table-row">
              <div className="recon-table-cell-left">NEFT or RTGS through the link</div>
              <div className="recon-table-cell-right">Same as UPI: paid, receipt sent, Tally updated.</div>
            </div>

            <div className="recon-table-row">
              <div className="recon-table-cell-left">
                <span className="tabular-nums">₹50,000</span> against an <span className="tabular-nums">₹80,000</span> bill
              </div>
              <div className="recon-table-cell-right">
                <span className="tabular-nums">₹30,000</span> stays open. Reminders continue for the balance.
              </div>
            </div>

            <div className="recon-table-row">
              <div className="recon-table-cell-left">Direct NEFT or cheque, outside the link</div>
              <div className="recon-table-cell-right">Bank statement import suggests the party and bills.</div>
            </div>

            <div className="recon-table-row">
              <div className="recon-table-cell-left">Cash with the salesman</div>
              <div className="recon-table-cell-right">He records it on his phone against the bill.</div>
            </div>
          </div>

          <p className="recon-table-sub">
            Anything Takkada can't place with certainty waits for you in one list, with its best guess.
          </p>

          {/* Pricing Box (PDF Page 4) */}
          <div className="recon-price-box">
            {/* Add-ons carry no price on the site: partners quote them
                (ruled 2026-10-04). */}
            <div className="recon-price-left">{pricing.addonsCta}</div>
            <div className="recon-price-right">
              Comes with Payment Collection on any Takkada plan. 0% MDR on UPI. 7-day free trial, no card.
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 7: FAQ Accordion (PDF Page 4) ── */}
      <section className="recon-section recon-section-light" id="faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Questions owners ask</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <FAQItem
                key={item.question}
                item={item}
                isOpen={faqIndex === i}
                onToggle={() => setFaqIndex(i === faqIndex ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Related Blog Articles ── */}
      <section className="feature-related recon-related-section" id="related-blogs">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Resources</span>
            <h2 className="section-title">Read further</h2>
            <p className="section-subtitle">
              Deep dives on payment collection, BRS, and bill-wise matching in Tally.
            </p>
          </div>
          <ul className="feature-related-list">
            {RELATED_BLOG_POSTS.map((post) => (
              <li key={post.slug}>
                <Link to={`/blog/${post.slug}`}>
                  <span>{post.title}</span>
                  <ArrowRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Closing Band (PDF Page 4) ── */}
      <section className="recon-final-band" id="final-cta">
        <div className="container">
          <div className="recon-final-content">
            <h2>
              Close the shop.
              <br />
              The books are already done.
            </h2>
            <p>
              Book a 15-minute demo to see how Takkada automates payment reconciliation in your Tally, or chat with us on WhatsApp to learn more.
            </p>
            <div className="recon-hero-ctas">
              <CalendarCTA context="icp-auto-reconciliation" variant="primary">
                Book a 15-min demo
              </CalendarCTA>
              <WhatsAppCTA context="icp-auto-reconciliation" variant="dark">
                Chat on WhatsApp to know more
              </WhatsAppCTA>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AutoReconciliation;
