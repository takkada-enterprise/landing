import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// The band's secondary action swings on demoEntryLive, so both branches are
// driven from a mock rather than from the shipped flag. Asserting only the
// current value means the other branch first executes on flip day.
const siteContentMock = vi.hoisted(() => ({ demoEntryLive: false }));

vi.mock('../../data/siteContent', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get demoEntryLive() {
      return siteContentMock.demoEntryLive;
    },
  };
});

import BlogCtaBand from '../BlogCtaBand';
import { PhoneModalProvider } from '../../context/PhoneModalContext';
import { appLinks } from '../../data/siteContent';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';

beforeEach(() => {
  siteContentMock.demoEntryLive = false;
});

// BlogCtaBand's live branch links internally rather than opening the modal, but
// it shares a tree with components that call usePhoneModal(), which throws
// outside a provider. Wrap once here so the flag flip cannot turn this red.
function renderBand(props) {
  // MemoryRouter as well as the provider: the live branch renders an internal
  // <Link to="/demo">, which needs a router context that this file never had.
  return render(
    <MemoryRouter>
      <PhoneModalProvider>
        <BlogCtaBand {...props} />
      </PhoneModalProvider>
    </MemoryRouter>
  );
}

afterEach(cleanup);

describe('BlogCtaBand', () => {
  it('leads with the WhatsApp CTA carrying the blog context message', () => {
    renderBand();

    const wa = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(wa.getAttribute('href')).toContain('wa.me');
    expect(wa.getAttribute('href')).toContain(encodeURIComponent(WHATSAPP_MESSAGES.blog));
  });

  it('keeps the calendar as secondary while the demo entry is not live', () => {
    renderBand();

    const calendar = screen.getByRole('link', { name: /book a 15-min demo/i });
    // Shared config, not a hardcoded literal — one place to change the URL.
    expect(calendar.getAttribute('href')).toBe(appLinks.bookDemo);
    expect(calendar.getAttribute('rel')).toContain('noopener');
  });

  it('swaps the secondary for an internal demo link once the entry is live', () => {
    siteContentMock.demoEntryLive = true;
    renderBand();

    const demo = screen.getByRole('link', { name: /try the demo/i });
    // Internal, so the visitor lands on the landing page's own /demo and meets
    // the capture modal there. An anchor straight into the app would skip the
    // capture entirely, which is the one thing this funnel exists to do.
    expect(demo.getAttribute('href')).toBe('/demo');
    expect(screen.queryByRole('link', { name: /book a 15-min demo/i })).toBeNull();
  });

  it('never links straight into the app, at either flag value', () => {
    for (const live of [false, true]) {
      siteContentMock.demoEntryLive = live;
      const { container } = renderBand();
      const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href') ?? '');
      expect(hrefs.filter((h) => h.includes('app.takkada.com')), `live=${live}`).toEqual([]);
      cleanup();
    }
  });

  it('renders a custom heading (blog index variant)', () => {
    renderBand({ heading: 'See how Takkada works for your business' });
    expect(screen.getByRole('heading', { name: /see how takkada works/i })).toBeInTheDocument();
  });
});
