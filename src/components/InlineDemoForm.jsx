import { useState } from 'react';
import { CalendarDays, Loader2, Phone } from 'lucide-react';
import { sanitizePhoneInput, validateIndianMobileNumber } from '../lib/demoBooking';
import { startCalendarBooking } from '../lib/bookCall';

// The "+91 | Mobile number | Book Demo" row on the homepage feature cards. A
// new pattern on purpose (craft #10): the visitor reading one feature can ask
// for a call about it without opening the modal. It is the modal's calendar
// flow inline, through the same startCalendarBooking(), so the popup-safe
// ordering, Clarity, Meta matching and the booking capture stay identical.
// `context` names the card, so Clarity can tell which feature drove the call.
function InlineDemoForm({ context, label = 'Book Demo' }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invalid = validateIndianMobileNumber(phone);
    if (invalid) {
      setError(invalid);
      return;
    }

    setError('');
    setStatus('saving');
    try {
      await startCalendarBooking({ phone, context });
      setStatus('saved');
    } catch {
      setStatus('');
      setError('Could not save your number. Please try again.');
    }
  };

  const inputId = `demo-phone-${context}`;
  const messageId = `${inputId}-message`;
  const message = error || (status === 'saved' ? 'Number saved. Pick a time in the calendar tab.' : '');

  return (
    <form className="inline-demo" onSubmit={handleSubmit} noValidate>
      <div className={`inline-demo-row${error ? ' has-error' : ''}`}>
        <span className="inline-demo-code" aria-hidden="true">
          <Phone size={14} />
          +91
        </span>
        <label className="sr-only" htmlFor={inputId}>
          Mobile number
        </label>
        <input
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="Mobile number"
          value={phone}
          onChange={(e) => {
            setPhone(sanitizePhoneInput(e.target.value));
            if (error) setError('');
            if (status === 'saved') setStatus('');
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={message ? messageId : undefined}
        />
        <button type="submit" disabled={status === 'saving'}>
          {status === 'saving' ? (
            <Loader2 size={15} className="spin" aria-hidden="true" />
          ) : (
            <CalendarDays size={15} aria-hidden="true" />
          )}
          {label}
        </button>
      </div>
      {message && (
        <p id={messageId} className={`inline-demo-message${error ? ' is-error' : ''}`} role="status">
          {message}
        </p>
      )}
    </form>
  );
}

export default InlineDemoForm;
