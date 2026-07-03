import { useState, useRef, useEffect } from 'react';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { appLinks } from '../data/siteContent';
import { demoBookingConfig } from '../config/demoBooking';
import {
  sanitizePhoneInput,
  submitDemoBooking,
  validateIndianMobileNumber,
} from '../lib/demoBooking';

const INPUT_FOCUS_DELAY_MS = 150;
const AUTO_CLOSE_DELAY_MS = 800;

function clearTimer(timerRef) {
  if (!timerRef.current) {
    return;
  }

  window.clearTimeout(timerRef.current);
  timerRef.current = null;
}

function PhoneModal({
  isOpen,
  onClose,
  title = 'Book a Demo',
  subtitle = "Enter your phone number and we'll set up a personalized walkthrough.",
  submitLabel = 'Continue to Book',
}) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const inputRef = useRef(null);
  const focusTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      clearTimer(focusTimerRef);
      focusTimerRef.current = window.setTimeout(() => inputRef.current?.focus(), INPUT_FOCUS_DELAY_MS);
    }

    if (!isOpen) {
      clearTimer(closeTimerRef);
      setPhone('');
      setError('');
      setLoading(false);
      setStatus('');
    }

    return () => clearTimer(focusTimerRef);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  useEffect(() => () => {
    clearTimer(focusTimerRef);
    clearTimer(closeTimerRef);
  }, []);

  const handlePhoneChange = (e) => {
    setPhone(sanitizePhoneInput(e.target.value));

    if (error) setError('');
    if (status) setStatus('');
  };

  const validate = () => {
    const validationError = validateIndianMobileNumber(phone);

    if (validationError) {
      setError(validationError);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    // Open the calendar synchronously, inside the click gesture, before any
    // await. Browsers only honor window.open('_blank') while transient user
    // activation is live; awaiting the booking fetch first ends that gesture,
    // so the popup blocker silently swallows the tab and the calendar never
    // opens. Booking capture is secondary and continues in the background.
    window.open(appLinks.bookDemo, '_blank', 'noopener,noreferrer');

    setLoading(true);
    setError('');
    setStatus('');

    try {
      await submitDemoBooking({
        phone,
        pageUrl: window.location.href,
        config: demoBookingConfig,
      });
    } catch {
      setError('Could not save your number. Please try again.');
      setLoading(false);
      return;
    }

    setLoading(false);
    setStatus('success');

    clearTimer(closeTimerRef);
    closeTimerRef.current = window.setTimeout(onClose, AUTO_CLOSE_DELAY_MS);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  if (!isOpen) return null;

  return (
    <div className="phone-modal-overlay" onClick={onClose}>
      <div
        className="phone-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="phone-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="phone-modal-header">
          <div className="phone-modal-icon">
            <Phone size={24} />
          </div>
          <h3 id="phone-modal-title">{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className="phone-modal-body">
          <label className="phone-label" htmlFor="phone-input">Phone Number</label>
          <div className={`phone-input-wrapper ${error ? 'phone-input-error' : ''}`}>
            <span className="phone-country-code">+91</span>
            <input
              ref={inputRef}
              id="phone-input"
              type="tel"
              inputMode="numeric"
              placeholder="9876543210"
              value={phone}
              onChange={handlePhoneChange}
              onKeyDown={handleKeyDown}
              maxLength={10}
              autoComplete="tel-national"
            />
          </div>
          {error && <p className="phone-error">{error}</p>}
          {status === 'success' && (
            <p className="phone-success">Redirecting to calendar...</p>
          )}
        </div>

        <div className="phone-modal-footer">
          <button
            type="button"
            className="phone-btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <><Loader2 size={18} className="spin" /> Submitting...</>
            ) : (
              <>{submitLabel} <ArrowRight size={18} /></>
            )}
          </button>
          <button type="button" className="phone-btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhoneModal;
