import CompanyPageLayout from '../components/CompanyPageLayout';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

function AboutUs() {
  return (
    <CompanyPageLayout title="About Takkada">
      <Seo
        title="About Takkada. Built for Indian distributors on Tally"
        description={`Takkada is built by ${contactInfo.company} in Guwahati. We help Indian distributors and wholesalers run their Tally from the phone.`}
        path="/about-us"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about-us' },
          ]),
        ]}
      />
      <p>
        Takkada is a mobile app that connects to Tally, so distributors and wholesalers can see their reports, send payment reminders on WhatsApp and collect UPI payments from their phone. It is built by <strong>{contactInfo.company}</strong> in Guwahati.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe business owners should spend their time growing their business, not chasing payments, creating vouchers, or reconciling spreadsheets. Takkada exists to eliminate the manual, repetitive financial tasks that drain hours from your day.
      </p>

      <h2>What We Do</h2>
      <p>
        Takkada connects directly to your Tally installation and gives you a mobile app to manage receivables, send automated payment reminders via WhatsApp, collect payments digitally, and reconcile everything back to Tally automatically.
      </p>

      <h2>Why We Built Takkada</h2>
      <p>
        After working closely with <span className="tabular-nums">100+</span> businesses across India, we saw the same problems everywhere: owners stuck at their counters, hours lost to manual follow-ups, cash stuck in overdue receivables, and accounting teams drowning in repetitive data entry. We built Takkada to solve all of this.
      </p>

      <h2>Our Approach</h2>
      <ul>
        <li><strong>Tally-First:</strong> Takkada runs on top of Tally. Your existing workflow stays exactly the same.</li>
        <li><strong>Mobile-First:</strong> Manage your entire receivables operation from your phone, anywhere.</li>
        <li><strong>Automation-First:</strong> Payment reminders, collection links, and reconciliation all happen automatically.</li>
        <li><strong>India-First:</strong> Built for Indian businesses with GST compliance, UPI payments, WhatsApp integration, and rupee-denominated workflows.</li>
      </ul>

      <h2>Custom Solutions</h2>
      <p>
        Every business is different. If your workflow has unique requirements, we offer customisation to fit Takkada to your specific needs, whether that&apos;s custom reminder flows, tailored reconciliation rules, or bespoke integrations. Reach out to discuss what you need.
      </p>

      <h2>Get In Touch</h2>
      <ul>
        <li>Phone: <a className="tabular-nums" href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a></li>
        <li>Email: <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
        <li>Office: Bobagh, Ulubari, Guwahati, Assam, 781008</li>
      </ul>
    </CompanyPageLayout>
  );
}

export default AboutUs;
