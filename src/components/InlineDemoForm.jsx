import { useState } from 'react';
import { CalendarDays, CheckCircle2, Loader2, Phone } from 'lucide-react';
import { sanitizePhoneInput, validateIndianMobileNumber } from '../lib/demoBooking';
import { requestDemoCall } from '../lib/bookCall';

// The "+91 | Mobile number | Explore demo" row on the homepage feature cards. A
// new pattern on purpose (craft #10): the visitor reading one feature books a
// demo about it in place (owner, 2026-10-31). Nothing opens, neither the modal
// nor a calendar tab: the number is saved through requestDemoCall() and the
// card confirms that the team will call. `context` names the card, so Clarity
// can tell which feature drove the booking.
function InlineDemoForm({ context, label = 'Explore demo' }) {
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
      await requestDemoCall({ phone, context });
      setStatus('saved');
    } catch {
      setStatus('');
      setError('Could not save your number. Please try again.');
    }
  };

  const inputId = `demo-phone-${context}`;
  const messageId = `${inputId}-message`;
  const booked = status === 'saved';
  const message = error || (booked ? 'Demo booked. We will call you on this number to fix a time.' : '');

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
        <button
          type="submit"
          disabled={status === 'saving' || booked}
          aria-busy={status === 'saving'}
          className={booked ? 'is-booked' : undefined}
        >
          {status === 'saving' && <Loader2 size={15} className="spin" aria-hidden="true" />}
          {booked && <CheckCircle2 size={15} aria-hidden="true" />}
          {!status && <CalendarDays size={15} aria-hidden="true" />}
          {booked ? 'Booked' : label}
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
