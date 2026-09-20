import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTAButton from './CTAButton';
import { appLinks } from '../data/siteContent';
import { usePhoneModal } from '../context/PhoneModalContext';

function CompanyPageLayout({ children }) {
  const { setOpen } = usePhoneModal();
  return (
    <div className="company-page">
      <div className="container">
        <Link to="/" className="company-back-btn">
          <ArrowLeft size={18} /> Back to Home
        </Link>
        {children}
        <div className="company-page-cta">
          <h3>Ready to get started?</h3>
          <p>See how Takkada can automate your payment collections.</p>
          <div className="company-page-cta-actions">
            <CTAButton variant="primary" type="button" onClick={() => setOpen(true)}>
              Book a call <ArrowRight size={18} />
            </CTAButton>
            <CTAButton variant="secondary" href={appLinks.download}>
              Download App
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPageLayout;
