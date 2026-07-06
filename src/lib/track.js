// Thin wrapper over Microsoft Clarity custom events (the snippet in
// index.html defines window.clarity). Tracking is best-effort telemetry:
// it must never throw and never block navigation, so callers fire it
// synchronously inside the click handler and move on. When Clarity is
// absent (tests, SSR, blocked script) this is a silent no-op.

export function track(eventName, tags = {}) {
  if (typeof window === 'undefined') return;
  const clarity = window.clarity;
  if (typeof clarity !== 'function') return;

  try {
    clarity('event', eventName);
    for (const [key, value] of Object.entries(tags)) {
      if (value !== undefined && value !== null) {
        clarity('set', key, String(value));
      }
    }
  } catch {
    // Telemetry failure is never a user-facing problem.
  }
}
