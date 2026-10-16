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

// Meta Pixel Lead for a conversion that is not a plain link click. Clicks on
// calendar and wa.me links are already counted by the listener in index.html;
// call this only where the conversion happens without a link (the phone
// modal's window.open), or the same click counts twice. Same contract as
// track(): a silent no-op when the pixel is absent (tests, SSR, local hosts,
// blockers) and never throws.
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
