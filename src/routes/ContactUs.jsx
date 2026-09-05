import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react';
import CompanyPageLayout from '../components/CompanyPageLayout';
import CTAButton from '../components/CTAButton';
import Seo from '../components/Seo';
import { breadcrumbSchema } from '../data/schema';
import { contactInfo } from '../data/siteContent';
import { usePhoneModal } from '../context/PhoneModalContext';

function ContactUs() {
  const { setOpen } = usePhoneModal();
  return (
    <CompanyPageLayout>
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
      <article className="company-article">
        <h1>Contact Us</h1>
        <p className="company-lead">
          Your feedback matters. Let&apos;s build a better future together.
        </p>

        <div className="contact-cards">
          <div className="contact-card">
            <div className="contact-card-icon"><Phone size={24} /></div>
            <h3>Phone</h3>
            <p className="tabular-nums">{contactInfo.phone}</p>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>Call us</a>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon"><Mail size={24} /></div>
            <h3>Email</h3>
            <p>{contactInfo.email}</p>
            <a href={`mailto:${contactInfo.email}`}>Send email</a>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon"><MapPin size={24} /></div>
            <h3>Office</h3>
            <p>Bobagh, Ulubari, Guwahati, Assam, 781008</p>
          </div>
          <div className="contact-card">
            <div className="contact-card-icon"><Clock size={24} /></div>
            <h3>Business Hours</h3>
            <p className="tabular-nums">Monday to Friday, 9 AM to 6 PM IST</p>
          </div>
        </div>

        <div className="contact-demo-block">
          <h2>Prefer a Live Walkthrough?</h2>
          <p>Book a personalized demo and we&apos;ll show you exactly how Takkada works with your business.</p>
          <CTAButton variant="primary" type="button" onClick={() => setOpen(true)}>
            Book a Meeting <ArrowRight size={18} />
          </CTAButton>
        </div>

        <div className="company-contact-block">
          <h3>Company Details</h3>
          <p><strong>{contactInfo.company}</strong></p>
          <p>Bobagh, Ulubari, Guwahati, Assam, 781008, India</p>
        </div>
      </article>
    </CompanyPageLayout>
  );
}

export default ContactUs;
