import CompanyPageLayout from '../components/CompanyPageLayout';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

function TermsAndConditions() {
  return (
    <CompanyPageLayout>
      <Seo
        title="Terms and Conditions. Takkada by Pay Saathi"
        description={`Terms of use for Takkada, the mobile Tally companion by ${contactInfo.company}. Services, responsibilities, payments, and Tally integration.`}
        path="/terms-and-conditions"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Terms and Conditions', path: '/terms-and-conditions' },
          ]),
        ]}
      />
      <article className="company-article">
        <h1>Terms &amp; Conditions</h1>
        <p className="company-meta tabular-nums">Last Updated: August 4, 2025 &bull; {contactInfo.company}</p>
        <p className="company-lead">
          These Terms and Conditions govern your use of Takkada, a product of {contactInfo.company}. By using our platform, you agree to these terms.
        </p>

        <h2>1. Services Offered</h2>
        <p>
          Takkada provides payment reminder automation, payment collection, and invoice reconciliation services for businesses using Tally or similar accounting systems. We also offer E-Invoicing and E-Way Bill generation.
        </p>

        <h2>2. User Responsibilities</h2>
        <ul>
          <li>Provide accurate business and financial data</li>
          <li>Use the services only for lawful business purposes</li>
          <li>Maintain the confidentiality of your login credentials</li>
          <li>Ensure authorized personnel have appropriate access levels</li>
        </ul>

        <h2>3. Tally Integration</h2>
        <p>
          By using the Tally Connector, you authorize Takkada to access and fetch your invoice data from Tally and make changes in it for reconciliation purposes. This integration is read-write and essential for core functionality.
        </p>

        <h2>4. Payments</h2>
        <p>
          Payments collected via Takkada&apos;s platform may involve third-party payment gateways. The company bears no responsibility for external payment processor issues, downtime, or additional charges imposed by payment providers.
        </p>

        <h2>5. Data Accuracy</h2>
        <p>
          While Takkada strives for complete accuracy in data synchronization, the final responsibility to verify and confirm the data remains with you, the business user. We recommend periodic reconciliation reviews.
        </p>

        <h2>6. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the platform for violation of these terms, misuse of the platform, or non-payment of subscription fees. You may cancel your subscription at any time.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We may revise these terms periodically. Updated terms will be posted on this page with a revised date. Continued use of the platform after changes constitutes acceptance of the updated terms.
        </p>

        <div className="company-contact-block">
          <h3>Have questions?</h3>
          <p>Contact us at <a href="mailto:support@paysaathi.in">support@paysaathi.in</a> or call <span className="tabular-nums">{contactInfo.phone}</span>.</p>
        </div>
      </article>
    </CompanyPageLayout>
  );
}

export default TermsAndConditions;
