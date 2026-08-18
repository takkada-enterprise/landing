import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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

    expect(screen.getByRole('button', { name: /try the demo/i })).toBeInTheDocument();
    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href') ?? '');
    expect(hrefs.filter((h) => h.includes('app.takkada.com'))).toEqual([]);
  });

  it('opens the capture modal with the demo destination and demo copy', () => {
    window.clarity = vi.fn();
    renderCta();

    fireEvent.click(screen.getByRole('button', { name: /try the demo/i }));

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
    fireEvent.click(screen.getByRole('button', { name: /try the demo/i }));

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
    expect(screen.queryByRole('button', { name: /try the demo/i })).toBeNull();
  });
});

// Presentation and callbacks belong to the caller, not to whichever branch of
// the flag happens to be live. A prop honoured by one branch and dropped by the
// other is a layout that changes shape on flip day, in a surface nobody is
// looking at when the flag moves.
describe('DemoTryCTA passes its caller through both branches', () => {
  function renderWith(props) {
    return render(
      <PhoneModalProvider>
        <DemoTryCTA context="mobile-menu" {...props} />
      </PhoneModalProvider>
    );
  }

  it.each([true, false])('honours fullWidth at demoEntryLive=%s', (live) => {
    siteContentMock.demoEntryLive = live;
    const { container } = renderWith({ fullWidth: true });
    expect(container.querySelector('.cta-btn').className).toContain('cta-btn--full');
  });

  it.each([true, false])('runs the caller onClick at demoEntryLive=%s', (live) => {
    siteContentMock.demoEntryLive = live;
    const onClick = vi.fn();
    renderWith({ onClick });

    fireEvent.click(document.querySelector('.cta-btn'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

// The demo door is named in one place, the component default, but it now opens
// from five surfaces: the homepage hero, /try-demo twice, the header and the
// mobile menu. A per-file matcher pins the surfaces it happens to know about;
// this pins the whole tree, so a call site that hardcodes the old name fails
// loudly instead of shipping a second name for one action (CLAUDE.md §11.10).
describe('one name for the demo door', () => {
  const srcRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

  function sourceFiles(dir) {
    return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return sourceFiles(path);
      return /\.(jsx?|css)$/.test(entry.name) ? [path] : [];
    });
  }

  const files = sourceFiles(srcRoot);

  // Assembled rather than written out, so this file is not its own offender.
  const OLD_NAME = new RegExp(['try', 'it', 'yourself'].join(String.raw`\s+`), 'i');
  const NEW_NAME = /try the demo/i;

  it('reads the source tree, so the sweep below cannot pass by scanning nothing', () => {
    expect(files.length).toBeGreaterThan(50);
    const named = files.filter((f) => NEW_NAME.test(readFileSync(f, 'utf-8')));
    expect(named.some((f) => f.endsWith('DemoTryCTA.jsx'))).toBe(true);
  });

  it('leaves no surface still saying the old name', () => {
    const offenders = files.filter((f) => OLD_NAME.test(readFileSync(f, 'utf-8')));
    expect(offenders.map((f) => f.slice(srcRoot.length + 1))).toEqual([]);
  });

  it('names the action the same way the blog band already does', () => {
    // BlogCTABand shipped `Try the demo` before the component default caught
    // up. The two must agree or the site has two doors with two names.
    const component = readFileSync(join(srcRoot, 'components/DemoTryCTA.jsx'), 'utf-8');
    const band = readFileSync(join(srcRoot, 'components/BlogCTABand.jsx'), 'utf-8');
    expect(component).toContain('Try the demo');
    expect(band).toContain('Try the demo');
  });
});
