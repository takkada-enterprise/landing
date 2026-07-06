import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import BlogCtaBand from '../BlogCtaBand';
import { appLinks } from '../../data/siteContent';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';

afterEach(cleanup);

describe('BlogCtaBand', () => {
  it('leads with the WhatsApp CTA carrying the blog context message', () => {
    render(<BlogCtaBand />);

    const wa = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(wa.getAttribute('href')).toContain('wa.me');
    expect(wa.getAttribute('href')).toContain(encodeURIComponent(WHATSAPP_MESSAGES.blog));
  });

  it('keeps the calendar as secondary, sourced from the shared config', () => {
    render(<BlogCtaBand />);

    const calendar = screen.getByRole('link', { name: /book a 15-min demo/i });
    // Shared config, not a hardcoded literal — one place to change the URL.
    expect(calendar.getAttribute('href')).toBe(appLinks.bookDemo);
    expect(calendar.getAttribute('rel')).toContain('noopener');
  });

  it('renders a custom heading (blog index variant)', () => {
    render(<BlogCtaBand heading="See how Takkada works for your business" />);
    expect(screen.getByRole('heading', { name: /see how takkada works/i })).toBeInTheDocument();
  });
});
