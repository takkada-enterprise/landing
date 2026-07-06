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
