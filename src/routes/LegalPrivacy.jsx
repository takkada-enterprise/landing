import CompanyPageLayout from '../components/CompanyPageLayout';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

function PrivacyPolicy() {
  return (
    <CompanyPageLayout>
      <Seo
        title="Privacy Policy. Takkada by Pay Saathi Innovations"
        description="How Takkada handles personal, financial, and technical data for its mobile Tally companion. Encryption, retention, sharing, and your rights."
        path="/privacy-policy"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Privacy Policy', path: '/privacy-policy' },
          ]),
        ]}
      />
      <article className="company-article">
        <h1>Privacy Policy</h1>
        <p className="company-meta tabular-nums">Effective: September 16, 2025 &bull; {contactInfo.company}</p>
        <p className="company-lead">
          Pay Saathi Innovations LLP is committed to protecting the privacy of all users of Takkada, including businesses, their employees, accountants, and other authorized users.
        </p>

        <h2>1. Information We Collect</h2>
        <h3>Personal Data</h3>
        <p>Names, email addresses, phone numbers, business registration details, and GST identification numbers.</p>
        <h3>Financial Data</h3>
        <p>Tally records, invoices, payment details, and bank account information. All financial data is encrypted end-to-end.</p>
        <h3>Technical Data</h3>
        <p>Device information, IP addresses, usage patterns, and error logs collected to improve our services.</p>
        <h3>Communication Data</h3>
        <p>WhatsApp integration data, support tickets, and feedback submitted through the platform.</p>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li>Payment processing and collection facilitation</li>
          <li>Tally synchronization and data reconciliation</li>
          <li>GST compliance and E-Invoicing</li>
          <li>Business analytics dashboards and reporting</li>
          <li>Credit assessment through payment pattern analysis</li>
          <li>Product improvement and customer support</li>
        </ul>

        <h2>3. Information Sharing</h2>
        <p>
          We do not share your data with any third parties for marketing or commercial purposes. Data is never sold. We do not share your business or financial information beyond what is strictly required to operate the platform (e.g. payment gateways to process transactions). Legal disclosures occur only when required by regulatory bodies and law enforcement under Indian law.
        </p>

        <h2>4. Security Measures</h2>
        <ul>
          <li>End-to-end encryption for all financial data</li>
          <li>AES-256 encryption for data at rest</li>
          <li>Multi-factor authentication</li>
          <li>SOC 2 compliant infrastructure</li>
          <li>Regular security audits</li>
        </ul>

        <h2>5. Data Retention</h2>
        <p>We do not retain your data beyond what is required to deliver the service. Upon account closure, your data is deleted within a reasonable period subject only to legal and regulatory obligations.</p>
        <ul>
          <li><strong>Financial records:</strong> Deleted upon account closure (except where retention is legally mandated)</li>
          <li><strong>Personal data:</strong> Deleted upon account closure</li>
          <li><strong>Technical logs:</strong> <span className="tabular-nums">12 months</span></li>
        </ul>

        <h2>6. Your Rights</h2>
        <p>
          You have the right to access, correct, and delete your personal data at any time. To exercise these rights, contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
        </p>

        <h2>7. Governing Law</h2>
        <p>
          This Privacy Policy is governed by Indian law, including the Information Technology Act 2000 and applicable RBI guidelines.
        </p>

        <div className="company-contact-block">
          <h3>Questions about your data?</h3>
          <p>Contact us at <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a> or call <span className="tabular-nums">{contactInfo.phone}</span>.</p>
        </div>
      </article>
    </CompanyPageLayout>
  );
}

export default PrivacyPolicy;
