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

  it('renders nothing when no WhatsApp number is configured (kill switch)', () => {
    // Every surface keeps a calendar CTA beside the WhatsApp one, so the
    // disabled state must not add a duplicate booking button.
    appLinks.whatsappNumber = '';
    const { container } = render(<WhatsAppCTA context="home-hero" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('runs a caller-supplied onClick after tracking (mobile menu close)', () => {
    window.clarity = vi.fn();
    const onClick = vi.fn();
    render(<WhatsAppCTA context="header" onClick={onClick} />);

    fireEvent.click(screen.getByRole('link'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(window.clarity).toHaveBeenCalledWith('event', 'whatsapp_cta_click');
  });
});
