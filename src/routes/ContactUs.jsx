import CompanyPageLayout from '../components/CompanyPageLayout';
import CalendarCTA from '../components/CalendarCTA';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';

function ContactUs() {
  return (
    <CompanyPageLayout title="Contact Us">
      <Seo
        title="Contact Takkada. Call, email, or book a demo"
        description="Reach Takkada by phone at +91 94359 77777, by email at admin@paysaathi.com, or book a personalized demo from our Guwahati office."
        path="/contact-us"
        schemas={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contact-us' },
          ]),
        ]}
      />
      <p>
        Your feedback matters. Let&apos;s build a better future together.
      </p>

      <h2>Phone</h2>
      <p><a className="tabular-nums" href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>{contactInfo.phone}</a></p>

      <h2>Email</h2>
      <p><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></p>

      <h2>Office</h2>
      <p>Bobagh, Ulubari, Guwahati, Assam, 781008</p>

      <h2>Business Hours</h2>
      <p className="tabular-nums">Monday to Friday, 9 AM to 6 PM IST</p>

      <h2>Prefer a Live Walkthrough?</h2>
      <p>Book a personalized demo and we&apos;ll show you exactly how Takkada works with your business.</p>
      <p><CalendarCTA context="contact" /></p>

      <h2>Company Details</h2>
      <p><strong>{contactInfo.company}</strong></p>
      <p>Bobagh, Ulubari, Guwahati, Assam, 781008, India</p>
    </CompanyPageLayout>
  );
}

export default ContactUs;
