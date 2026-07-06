import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import WhatsAppCTA from '../WhatsAppCTA';
import { appLinks } from '../../data/siteContent';
import { WHATSAPP_MESSAGES, whatsappHref } from '../../lib/whatsapp';

describe('WhatsAppCTA', () => {
  const originalNumber = appLinks.whatsappNumber;

  afterEach(() => {
    appLinks.whatsappNumber = originalNumber;
    delete window.clarity;
    cleanup();
  });

  it('renders a wa.me anchor with the configured number and encoded context message', () => {
    render(<WhatsAppCTA context="home-hero" />);

    const link = screen.getByRole('link', { name: /chat on whatsapp/i });
    expect(link).toHaveAttribute(
      'href',
      `https://wa.me/${originalNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGES['home-hero'])}`
    );
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('falls back to the default message for an unknown context', () => {
    expect(whatsappHref('no-such-context')).toBe(
      `https://wa.me/${originalNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGES.default)}`
    );
  });

  it('uses a message override when provided', () => {
    render(<WhatsAppCTA context="features" message="Hi, I want to see Import from PDF." />);

    expect(screen.getByRole('link').getAttribute('href')).toContain(
      encodeURIComponent('Hi, I want to see Import from PDF.')
    );
  });

  it('fires the Clarity event with the context key on click and keeps the href intact', () => {
    window.clarity = vi.fn();
    render(<WhatsAppCTA context="pricing" />);

    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(window.clarity).toHaveBeenCalledWith('event', 'whatsapp_cta_click');
    expect(window.clarity).toHaveBeenCalledWith('set', 'cta_context', 'pricing');
    // Navigation never depends on the tracking outcome: the href is a plain
    // anchor attribute, present before and after the click.
    expect(link.getAttribute('href')).toContain('wa.me');
  });

  it('no-ops without throwing when the Clarity script is absent', () => {
    render(<WhatsAppCTA />);

    expect(() => fireEvent.click(screen.getByRole('link'))).not.toThrow();
  });

  it('never blocks navigation even when Clarity itself throws', () => {
    window.clarity = vi.fn(() => {
      throw new Error('clarity exploded');
    });
    render(<WhatsAppCTA />);

    expect(() => fireEvent.click(screen.getByRole('link'))).not.toThrow();
  });

  it('falls back to the calendar link when no WhatsApp number is configured', () => {
    appLinks.whatsappNumber = '';
    render(<WhatsAppCTA context="home-hero" />);

    const link = screen.getByRole('link', { name: /book a 15-min demo/i });
    expect(link).toHaveAttribute('href', appLinks.bookDemo);
    expect(screen.queryByRole('link', { name: /chat on whatsapp/i })).not.toBeInTheDocument();
  });
});
