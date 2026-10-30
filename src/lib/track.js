// Thin wrapper over Microsoft Clarity custom events (the snippet in
// index.html defines window.clarity). Tracking is best-effort telemetry:
// it must never throw and never block navigation, so callers fire it
// synchronously inside the click handler and move on. When Clarity is
// absent (tests, SSR, blocked script) this is a silent no-op.
//
// Clarity has no per-event properties: `set` tags are session-scoped, so a
// session with two differently-labelled clicks carries both tag values with
// no event↔tag linkage. For exact per-context funnel counts we therefore
// also emit a combined `<event>_<cta_context>` event; the base event stays
// for the aggregate funnel, the tag stays for session filtering.

export function track(eventName, tags = {}) {
  if (typeof window === 'undefined') return;
  const clarity = window.clarity;
  if (typeof clarity !== 'function') return;

  try {
    clarity('event', eventName);
    if (tags.cta_context) {
      clarity('event', `${eventName}_${tags.cta_context}`);
    }
    for (const [key, value] of Object.entries(tags)) {
      if (value !== undefined && value !== null) {
        clarity('set', key, String(value));
      }
    }
  } catch {
    // Telemetry failure is never a user-facing problem.
  }
}

// Meta Pixel manual advanced matching. The pixel is initialised in index.html
// before the visitor has typed anything, so once the phone modal holds a
// validated number we call init again with it; Meta attaches it to every
// event fired after that, the Lead included. Call it BEFORE trackMetaLead.
// `ph` is digits only with the country code (91XXXXXXXXXX); the pixel hashes
// it with SHA-256 in the browser before it leaves. The privacy policy
// (src/routes/LegalPrivacy.jsx, section 3) discloses this; keep the two in
// step. Same contract as track(): silent no-op without the pixel, never throws.
export const META_PIXEL_ID = '1485519606341338';

export function setMetaUserPhone(phone) {
  if (typeof window === 'undefined') return;
  const fbq = window.fbq;
  if (typeof fbq !== 'function') return;
  if (!/^[6-9]\d{9}$/.test(phone || '')) return;

  try {
    fbq('init', META_PIXEL_ID, { ph: `91${phone}` });
  } catch {
    // Telemetry failure is never a user-facing problem.
  }
}

// Meta Pixel Lead for captured phone submissions (try demo OTP entry and
// calendar booking phone capture in PhoneModal.jsx). These represent real
// contacts with captured phone numbers. Outbound link clicks on WhatsApp and
// calendar links fire 'Contact' instead to avoid counting bounces as leads.
// Same contract as track(): a silent no-op when the pixel is absent (tests,
// SSR, local hosts, blockers) and never throws.
export function trackMetaLead(contentName) {
  if (typeof window === 'undefined') return;
  const fbq = window.fbq;
  if (typeof fbq !== 'function') return;

  try {
    fbq('track', 'Lead', { content_name: contentName });
  } catch {
    // Telemetry failure is never a user-facing problem.
  }
}

// Meta Pixel Contact for outbound intent interactions (e.g. WhatsApp clicks
// and calendar opens). Same silent no-op contract.
export function trackMetaContact(contentName) {
  if (typeof window === 'undefined') return;
  const fbq = window.fbq;
  if (typeof fbq !== 'function') return;

  try {
    fbq('track', 'Contact', { content_name: contentName });
  } catch {
    // Telemetry failure is never a user-facing problem.
  }
}

