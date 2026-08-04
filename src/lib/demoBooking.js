import { demoBookingConfig, hasDemoBookingBackend } from '../config/demoBooking';

export const DEMO_PHONE_STORAGE_KEY = 'takkada_demo_phone';
export const DEMO_TIMESTAMP_STORAGE_KEY = 'takkada_demo_timestamp';

const INDIAN_MOBILE_NUMBER_PATTERN = /^[6-9][0-9]{9}$/;

// The two funnels that write to paysaathi_bookings. The edge function validates
// this against the same closed list and answers 400 on anything else, so a typo
// here is a broken capture rather than a silently mis-tagged lead.
export const BOOKING_SOURCE_CALENDAR = 'landing_page';
export const BOOKING_SOURCE_DEMO = 'demo_entry';

export function sanitizePhoneInput(value = '') {
  return value.replace(/\D/g, '').slice(0, 10);
}

export function validateIndianMobileNumber(phone) {
  if (!phone) {
    return 'Please enter your phone number';
  }

  if (!INDIAN_MOBILE_NUMBER_PATTERN.test(phone)) {
    return 'Enter a valid 10-digit Indian mobile number';
  }

  return '';
}

export function buildDemoBookingPayload({
  phone,
  pageUrl,
  timestamp,
  source = BOOKING_SOURCE_CALENDAR,
}) {
  return {
    phone: `+91${phone}`,
    source,
    page_url: pageUrl,
    timestamp,
  };
}

export function persistDemoBooking(storage, { phone, timestamp }) {
  if (!storage?.setItem) {
    return;
  }

  storage.setItem(DEMO_PHONE_STORAGE_KEY, phone);
  storage.setItem(DEMO_TIMESTAMP_STORAGE_KEY, timestamp);
}

export async function submitDemoBooking({
  phone,
  pageUrl,
  timestamp = new Date().toISOString(),
  storage = globalThis.localStorage,
  fetchImpl = globalThis.fetch?.bind(globalThis),
  config = demoBookingConfig,
  source = BOOKING_SOURCE_CALENDAR,
  keepalive = false,
}) {
  persistDemoBooking(storage, { phone, timestamp });

  if (!hasDemoBookingBackend(config) || !fetchImpl) {
    throw new Error('Booking backend configuration is missing');
  }

  const response = await fetchImpl(config.functionUrl, {
    method: 'POST',
    // keepalive lets the POST finish after the document is discarded. On the
    // demo path the browser navigates away in the same tick, so without it the
    // request dies in flight and the drop-off lead -- the one who typed a
    // number and never finished OTP -- is lost with no way to recover it.
    keepalive,
    headers: {
      'Content-Type': 'application/json',
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
    body: JSON.stringify(buildDemoBookingPayload({ phone, pageUrl, timestamp, source })),
  });

  if (!response.ok) {
    const responseBody = typeof response.text === 'function' ? await response.text() : '';
    throw new Error(responseBody || `Booking request failed with status ${response.status}`);
  }

  return { skipped: false, timestamp };
}

/**
 * The handoff URL. The query sits INSIDE the fragment, so it is invisible to
 * every server between here and the app, and the app reads it as a PRE-FILL.
 * It never triggers a send on its own: a crafted link would otherwise deliver a
 * real SMS to a stranger with zero interaction, and loop on reload.
 */
export function buildDemoHandoffUrl(phone, demoAppUrl) {
  return `${demoAppUrl}?phone=91${phone}`;
}
