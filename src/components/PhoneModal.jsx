import { useState, useRef, useEffect } from 'react';
import { X, Phone, ArrowRight, Loader2 } from 'lucide-react';
import { appLinks } from '../data/siteContent';
import { demoBookingConfig } from '../config/demoBooking';
import {
  BOOKING_SOURCE_CALENDAR,
  BOOKING_SOURCE_DEMO,
  buildDemoHandoffUrl,
  sanitizePhoneInput,
  submitDemoBooking,
  validateIndianMobileNumber,
} from '../lib/demoBooking';
import { track } from '../lib/track';

const INPUT_FOCUS_DELAY_MS = 150;
const AUTO_CLOSE_DELAY_MS = 800;

export const DESTINATION_CALENDAR = 'calendar';
export const DESTINATION_DEMO = 'demo';

function defaultNavigate(url) {
  window.location.assign(url);
}

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
  // 'calendar' opens the Notion booking page in a new tab. 'demo' navigates
  // this tab straight into the app's demo entry screen with the number
  // pre-filled. Injected through openWith() so there is one modal, not two.
  destination = DESTINATION_CALENDAR,
  // Seam for the ordering test. jsdom has no popup blocker and refuses real
  // navigation, so the only way to prove the navigation happens BEFORE the
  // capture settles is to observe it.
  navigate = defaultNavigate,
}) {
  const isDemo = destination === DESTINATION_DEMO;
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

    const pageUrl = window.location.href;

    if (isDemo) {
      // Fire the capture and DO NOT await it, then navigate this tab. Same-tab
      // navigation has no user-activation constraint, so there is no popup
      // blocker to work around and no window.open to reintroduce. keepalive is
      // what lets the request finish after this document is gone.
      //
      // The capture is best-effort; entry is not. A visitor must reach the demo
      // even if the lead never lands, so nothing here awaits or throws.
      // try/catch AND .catch(): submitDemoBooking is async today, so a failure
      // arrives as a rejection, but a synchronous throw (a missing config, a
      // fetch that is not a function) would otherwise escape handleSubmit and
      // the navigation below would never run. The visitor would sit on an
      // unchanged modal with no error, which is the worst outcome available.
      try {
        submitDemoBooking({
          phone,
          pageUrl,
          config: demoBookingConfig,
          source: BOOKING_SOURCE_DEMO,
          keepalive: true,
        })?.catch?.(() => {
          // Deliberately silent to the visitor. mark_demo_lead_verified() picks
          // them up if they finish OTP; if they do not, the lead is genuinely
          // lost and there is nothing useful to say on a screen they have left.
        });
      } catch {
        // Same reasoning.
      }

      track('demo_entry_start', { cta_context: 'phone-modal' });
      navigate(buildDemoHandoffUrl(phone, appLinks.demoApp));
      return;
    }

    // Open the calendar synchronously, inside the click gesture, before any
    // await. Browsers only honor window.open('_blank') while transient user
    // activation is live; awaiting the booking fetch first ends that gesture,
    // so the popup blocker silently swallows the tab and the calendar never
    // opens. Booking capture is secondary and continues in the background.
    window.open(appLinks.bookDemo, '_blank', 'noopener,noreferrer');
    track('calendar_open', { cta_context: 'phone-modal' });

    setLoading(true);
    setError('');
    setStatus('');

    try {
      await submitDemoBooking({
        phone,
        pageUrl,
        config: demoBookingConfig,
        source: BOOKING_SOURCE_CALENDAR,
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
          {status === 'success' && !isDemo && (
            <p className="phone-success">Redirecting to calendar...</p>
          )}
          {/* Collection notice at the point of collection. The capture fires
              before OTP and before any other screen, so this is the only place
              a visitor is told what the number is for. */}
          <p className="phone-consent-note">
            {isDemo
              ? 'We will use this number to send your code and to contact you about Takkada. '
              : 'We will use this number to contact you about Takkada. '}
            <a href="/privacy-policy">Privacy policy</a>.
          </p>
          {isDemo && (
            <p className="phone-consent-note">
              The demo takes a few seconds to open on mobile.
            </p>
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
