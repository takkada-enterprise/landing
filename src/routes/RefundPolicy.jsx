import CompanyPageLayout from '../components/CompanyPageLayout';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

function RefundPolicy() {
  return (
    <CompanyPageLayout>
      <Seo
        title="Refund Policy. Takkada subscription refunds"
        description="Takkada refund rules across the four subscription plans. 7-day money-back guarantee, eligibility, and how to request a refund."
        path="/refund-policy"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Refund Policy', path: '/refund-policy' },
          ]),
        ]}
      />
      <article className="company-article">
        <h1>Refund &amp; Cancellation Policy</h1>
        <p className="company-meta tabular-nums">Effective: 2025 &bull; {contactInfo.company}</p>
        <p className="company-lead">
          This refund policy outlines the rules and regulations for refunds for Takkada subscription services provided by Pay Saathi Innovations LLP.
        </p>

        <h2>Subscription Plans</h2>
        <div className="policy-plans">
          <div className="policy-plan-card">
            <strong>Voucher Model</strong>
            <span className="tabular-nums">{'₹'}4,500 + GST / year</span>
          </div>
          <div className="policy-plan-card">
            <strong>Collections Model</strong>
            <span className="tabular-nums">{'₹'}6,480 + GST / year</span>
          </div>
          <div className="policy-plan-card">
            <strong>Full Access / Auto Dispatch</strong>
            <span className="tabular-nums">{'₹'}8,499 + GST / year</span>
          </div>
        </div>

        <h2>7-Day Money-Back Guarantee</h2>
        <h3>Full Refund Eligibility</h3>
        <ul>
          <li>First-time Takkada customers only</li>
          <li>Request submitted within <span className="tabular-nums">7 calendar days</span> of activation</li>
          <li>Unresolved technical issues after <span className="tabular-nums">15 business days</span> of support</li>
          <li>Integration failures despite meeting system requirements</li>
        </ul>

        <h3>Not Eligible for Refund</h3>
        <ul>
          <li>Renewal subscriptions (year 2 and onwards)</li>
          <li>Channel partner or distributor purchases</li>
          <li>Requests submitted after the <span className="tabular-nums">30-day</span> window</li>
          <li>User error or system incompatibility issues</li>
          <li>Dissatisfaction with documented features working as intended</li>
        </ul>

        <h2>How to Request a Refund</h2>
        <ol>
          <li>Email <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> with subject: <em>&quot;Refund Request, [License Number]&quot;</em></li>
          <li>Include your name, business details, license number, activation date, and reason for refund</li>
          <li>You will receive an acknowledgment within <span className="tabular-nums">2 business days</span></li>
          <li>Resolution within <span className="tabular-nums">7 business days</span> of review</li>
        </ol>

        <h2>Approved Refunds</h2>
        <p>
          Full license fee is refunded (excluding GST and processing fees) within <span className="tabular-nums">7 to 10 business days</span> to the original payment method. License access terminates immediately upon refund approval.
        </p>
        <p>Partial refunds may be considered on a case-by-case basis at company discretion.</p>

        <h2>Channel Partners</h2>
        <p>
          Direct refunds are not available for purchases made through channel partners or distributors. Refund requests must be submitted through the original seller.
        </p>

        <h2>Chargeback Policy</h2>
        <p>
          We request that you contact our support team before initiating a chargeback with your bank. Unwarranted chargebacks may result in account suspension.
        </p>

        <h2>Special Circumstances</h2>
        <ul>
          <li><strong>Force Majeure:</strong> Refunds processed outside normal terms for product discontinuation or regulatory changes</li>
          <li><strong>Business Closure:</strong> Pro-rated refunds for unused periods if services are discontinued</li>
        </ul>

        <div className="company-contact-block">
          <h3>Need help with a refund?</h3>
          <p>Contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call <span className="tabular-nums">{contactInfo.phone}</span>.</p>
          <p className="tabular-nums">Business hours: Monday to Friday, 9 AM to 6 PM IST</p>
        </div>
      </article>
    </CompanyPageLayout>
  );
}

export default RefundPolicy;
