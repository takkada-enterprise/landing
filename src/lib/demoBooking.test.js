import { describe, expect, it, vi } from 'vitest';
import {
  BOOKING_SOURCE_CALENDAR,
  BOOKING_SOURCE_DEMO,
  buildDemoBookingPayload,
  buildDemoHandoffUrl,
  DEMO_PHONE_STORAGE_KEY,
  DEMO_TIMESTAMP_STORAGE_KEY,
  submitDemoBooking,
  validateIndianMobileNumber,
  sanitizePhoneInput,
} from './demoBooking';
import { hasDemoBookingBackend, resolveDemoBookingConfig } from '../config/demoBooking';
import { appLinks } from '../data/siteContent';

describe('demoBooking helpers', () => {
  it('sanitizes phone input to a 10 digit numeric string', () => {
    expect(sanitizePhoneInput('98 76a54-32109')).toBe('9876543210');
  });

  it('validates Indian mobile numbers', () => {
    expect(validateIndianMobileNumber('')).toBe('Please enter your phone number');
    expect(validateIndianMobileNumber('1234567890')).toBe('Enter a valid 10-digit Indian mobile number');
    expect(validateIndianMobileNumber('9876543210')).toBe('');
  });

  it('builds the booking payload shape expected by the backend', () => {
    expect(
      buildDemoBookingPayload({
        phone: '9876543210',
        pageUrl: 'https://takkada.com',
        timestamp: '2026-03-09T06:00:00.000Z',
      })
    ).toEqual({
      phone: '+919876543210',
      source: 'landing_page',
      page_url: 'https://takkada.com',
      timestamp: '2026-03-09T06:00:00.000Z',
    });
  });

  it('tags the demo funnel separately from the calendar funnel', () => {
    // R2 rests entirely on this string. Calendar and demo are two different
    // events about the same person, and the follow-up differs completely.
    expect(
      buildDemoBookingPayload({
        phone: '9876543210',
        pageUrl: 'https://takkada.com/demo',
        timestamp: '2026-08-04T06:00:00.000Z',
        source: BOOKING_SOURCE_DEMO,
      }).source
    ).toBe('demo_entry');
    expect(BOOKING_SOURCE_CALENDAR).toBe('landing_page');
  });

  it('builds a handoff URL whose query sits inside the fragment', () => {
    // The hash is what keeps the number off every server between here and the
    // app, and 'https://app.takkada.com/demo' (no hash) never resolved at all.
    const url = buildDemoHandoffUrl('9876543210', 'https://app.takkada.com/#/demo');
    expect(url).toBe('https://app.takkada.com/#/demo?phone=919876543210');
    expect(url.indexOf('#')).toBeLessThan(url.indexOf('?phone='));
    expect(appLinks.demoApp).toContain('#');
  });

  it('sends keepalive only when asked, and passes the source through', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: vi.fn() });
    const config = {
      functionUrl: 'https://demo.supabase.co/functions/v1/paysaathi-booking',
      anonKey: 'public-key',
    };

    await submitDemoBooking({
      phone: '9876543210',
      pageUrl: 'https://takkada.com/demo',
      timestamp: '2026-08-04T06:00:00.000Z',
      storage: { setItem: vi.fn() },
      fetchImpl,
      config,
      source: BOOKING_SOURCE_DEMO,
      keepalive: true,
    });

    const [, init] = fetchImpl.mock.calls[0];
    expect(init.keepalive).toBe(true);
    expect(JSON.parse(init.body).source).toBe('demo_entry');

    // The calendar path is unchanged: no keepalive, still landing_page.
    fetchImpl.mockClear();
    await submitDemoBooking({
      phone: '9876543210',
      pageUrl: 'https://takkada.com',
      timestamp: '2026-08-04T06:00:00.000Z',
      storage: { setItem: vi.fn() },
      fetchImpl,
      config,
    });
    const [, calendarInit] = fetchImpl.mock.calls[0];
    expect(calendarInit.keepalive).toBe(false);
    expect(JSON.parse(calendarInit.body).source).toBe('landing_page');
  });

  it('no longer reads the client-side Discord webhook env var anywhere in src/', async () => {
    // The 12-day silent outage: the var is injected only by a disabled
    // workflow, so under Cloudflare it inlines as undefined and every booking
    // fired fetch(undefined) into an empty .catch. Discord notification is a
    // server-side concern now.
    //
    // The needle is assembled at runtime so this assertion does not match
    // itself. Spelling it out here would make the test permanently red.
    const needle = ['VITE', 'DISCORD', 'WEBHOOK', 'URL'].join('_');
    const { execSync } = await import('node:child_process');
    const hits = execSync(`grep -rl ${needle} src/ || true`, { encoding: 'utf8' }).trim();
    expect(hits).toBe('');
  });

  it('stores the lead locally and submits it to the configured backend', async () => {
    const storage = { setItem: vi.fn() };
    const fetchImpl = vi.fn().mockResolvedValue({ ok: true, status: 200, text: vi.fn() });

    await submitDemoBooking({
      phone: '9876543210',
      pageUrl: 'https://takkada.com',
      timestamp: '2026-03-09T06:00:00.000Z',
      storage,
      fetchImpl,
      config: {
        functionUrl: 'https://demo.supabase.co/functions/v1/paysaathi-booking',
        anonKey: 'public-key',
      },
    });

    expect(storage.setItem).toHaveBeenNthCalledWith(1, DEMO_PHONE_STORAGE_KEY, '9876543210');
    expect(storage.setItem).toHaveBeenNthCalledWith(2, DEMO_TIMESTAMP_STORAGE_KEY, '2026-03-09T06:00:00.000Z');
    expect(fetchImpl).toHaveBeenCalledWith(
      'https://demo.supabase.co/functions/v1/paysaathi-booking',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          apikey: 'public-key',
          Authorization: 'Bearer public-key',
        }),
      })
    );
  });

  it('prefers runtime overrides and can fall back to the production booking config', () => {
    const runtimeOverrideConfig = resolveDemoBookingConfig({
      env: {},
      runtime: {
        __BOOKING_FUNCTION_URL__: 'https://runtime.supabase.co/functions/v1/paysaathi-booking',
        __SUPABASE_ANON_KEY__: 'runtime-key',
      },
      includeProductionFallback: false,
    });

    expect(runtimeOverrideConfig).toEqual({
      functionUrl: 'https://runtime.supabase.co/functions/v1/paysaathi-booking',
      anonKey: 'runtime-key',
    });
    expect(hasDemoBookingBackend(runtimeOverrideConfig)).toBe(true);

    const productionFallbackConfig = resolveDemoBookingConfig({
      env: {},
      runtime: {},
      includeProductionFallback: true,
    });

    expect(productionFallbackConfig.functionUrl).toContain('cuwdhditjhocntmxdqiz.supabase.co');
    expect(productionFallbackConfig.anonKey.length).toBeGreaterThan(20);
    expect(hasDemoBookingBackend(productionFallbackConfig)).toBe(true);
  });

  it('throws when the booking backend configuration is missing', async () => {
    const storage = { setItem: vi.fn() };
    const fetchImpl = vi.fn();

    await expect(
      submitDemoBooking({
        phone: '9876543210',
        pageUrl: 'https://takkada.com',
        timestamp: '2026-03-09T06:00:00.000Z',
        storage,
        fetchImpl,
        config: {
          functionUrl: '',
          anonKey: '',
        },
      })
    ).rejects.toThrow('Booking backend configuration is missing');

    expect(fetchImpl).not.toHaveBeenCalled();
    expect(storage.setItem).toHaveBeenCalledTimes(2);
  });
});
