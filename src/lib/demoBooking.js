import { demoBookingConfig, hasDemoBookingBackend } from '../config/demoBooking';

export const DEMO_PHONE_STORAGE_KEY = 'takkada_demo_phone';
export const DEMO_TIMESTAMP_STORAGE_KEY = 'takkada_demo_timestamp';

// Discord notification is sent server-side by the paysaathi-booking edge
// function (reads the DISCORD_WEBHOOK_URL Supabase secret). It used to live
// here, inlined at build time from VITE_DISCORD_WEBHOOK_URL; a redeploy without
// that build var silently baked in `undefined` and dropped every notification.

const INDIAN_MOBILE_NUMBER_PATTERN = /^[6-9][0-9]{9}$/;

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

export function buildDemoBookingPayload({ phone, pageUrl, timestamp }) {
  return {
    phone: `+91${phone}`,
    source: 'landing_page',
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
}) {
  persistDemoBooking(storage, { phone, timestamp });

  if (!hasDemoBookingBackend(config) || !fetchImpl) {
    throw new Error('Booking backend configuration is missing');
  }

  const response = await fetchImpl(config.functionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
    },
    body: JSON.stringify(buildDemoBookingPayload({ phone, pageUrl, timestamp })),
  });

  if (!response.ok) {
    const responseBody = typeof response.text === 'function' ? await response.text() : '';
    throw new Error(responseBody || `Booking request failed with status ${response.status}`);
  }

  return { skipped: false, timestamp };
}
