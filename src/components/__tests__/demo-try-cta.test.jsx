import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

// The flag's live branch is unreachable in a normal run: demoEntryLive is false
// in the shipped source, so every assertion about the live path would be
// vacuous and would only start executing on the day of the flip, when nobody
// is watching it go red. Mocking the module gives BOTH branches real coverage
// today, at either value of the real flag.
const siteContentMock = vi.hoisted(() => ({ demoEntryLive: true }));

vi.mock('../../data/siteContent', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get demoEntryLive() {
      return siteContentMock.demoEntryLive;
    },
  };
});

import DemoTryCTA from '../DemoTryCTA';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

const openWith = vi.fn();

vi.mock('../../context/PhoneModalContext', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    usePhoneModal: () => ({ openWith, open: false, setOpen: vi.fn(), options: {} }),
  };
});

function renderCta() {
  return render(
    <PhoneModalProvider>
      <DemoTryCTA context="demo-page" />
    </PhoneModalProvider>
  );
}

beforeEach(() => {
  openWith.mockClear();
  siteContentMock.demoEntryLive = true;
});

afterEach(cleanup);

describe('DemoTryCTA with the demo entry live', () => {
  it('renders a button, never an anchor into the app', () => {
    const { container } = renderCta();

    expect(screen.getByRole('button', { name: /try it yourself/i })).toBeInTheDocument();
    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href') ?? '');
    expect(hrefs.filter((h) => h.includes('app.takkada.com'))).toEqual([]);
  });

  it('opens the capture modal with the demo destination and demo copy', () => {
    window.clarity = vi.fn();
    renderCta();

    fireEvent.click(screen.getByRole('button', { name: /try it yourself/i }));

    expect(openWith).toHaveBeenCalledTimes(1);
    const options = openWith.mock.calls[0][0];
    // Without this key reaching PhoneModal the CTA opens the Notion calendar
    // and every demo lead is tagged landing_page.
    expect(options.destination).toBe('demo');
    expect(options.submitLabel).toBe('Send code');
    expect(options.title).toMatch(/demo/i);

    expect(window.clarity).toHaveBeenCalledWith('event', 'demo_try_click');
    delete window.clarity;
  });

  it('never says OTP to the visitor', () => {
    // Internal names stay out of outbound copy. The visitor-facing word is
    // "code".
    renderCta();
    fireEvent.click(screen.getByRole('button', { name: /try it yourself/i }));

    const copy = JSON.stringify(openWith.mock.calls[0][0]);
    expect(copy).not.toMatch(/\bOTP\b/i);
    expect(copy).toMatch(/code/i);
  });
});

describe('DemoTryCTA with the demo entry not yet live', () => {
  it('falls back to WhatsApp and opens no modal', () => {
    siteContentMock.demoEntryLive = false;
    renderCta();

    const wa = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(wa.getAttribute('href')).toContain('wa.me');
    expect(openWith).not.toHaveBeenCalled();
    expect(screen.queryByRole('button', { name: /try it yourself/i })).toBeNull();
  });
});
