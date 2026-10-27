import { afterEach, describe, expect, it, vi } from 'vitest';
import { META_PIXEL_ID, setMetaUserPhone, trackMetaLead } from './track';

afterEach(() => {
  delete window.fbq;
});

describe('setMetaUserPhone', () => {
  it('re-inits the pixel with the number in 91XXXXXXXXXX form', () => {
    window.fbq = vi.fn();
    setMetaUserPhone('9876543210');
    expect(window.fbq).toHaveBeenCalledWith('init', META_PIXEL_ID, { ph: '919876543210' });
  });

  it('runs before the Lead so the Lead carries the match', () => {
    window.fbq = vi.fn();
    setMetaUserPhone('9876543210');
    trackMetaLead('try_demo_otp');
    expect(window.fbq.mock.calls.map((c) => c[0])).toEqual(['init', 'track']);
  });

  it('sends nothing for a number that is not a valid Indian mobile', () => {
    window.fbq = vi.fn();
    for (const bad of ['', undefined, '12345', '5876543210', '98765432101', '+919876543210']) {
      setMetaUserPhone(bad);
    }
    expect(window.fbq).not.toHaveBeenCalled();
  });

  it('is a silent no-op without the pixel and never throws', () => {
    expect(() => setMetaUserPhone('9876543210')).not.toThrow();
    window.fbq = () => {
      throw new Error('blocked');
    };
    expect(() => setMetaUserPhone('9876543210')).not.toThrow();
  });

  it('uses the same pixel ID that index.html initialises', async () => {
    const { readFileSync } = await import('node:fs');
    const html = readFileSync('index.html', 'utf8');
    expect(html).toContain(`fbq('init', '${META_PIXEL_ID}'`);
  });
});
