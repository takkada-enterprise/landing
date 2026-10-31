import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InlineDemoForm from './InlineDemoForm';
import * as demoBooking from '../lib/demoBooking';

describe('InlineDemoForm', () => {
  const originalWindowOpen = window.open;

  beforeEach(() => {
    window.open = vi.fn();
    window.fbq = vi.fn();
    vi.spyOn(demoBooking, 'submitDemoBooking').mockResolvedValue({ ok: true });
  });

  afterEach(() => {
    cleanup();
    window.open = originalWindowOpen;
    delete window.fbq;
    vi.restoreAllMocks();
  });

  const type = (value) =>
    fireEvent.change(screen.getByLabelText('Mobile number'), { target: { value } });
  const submit = () => fireEvent.click(screen.getByRole('button', { name: /book demo/i }));

  it('shows +91, a labelled number field and a Book Demo button', () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    expect(screen.getByText('+91')).toBeTruthy();
    expect(screen.getByLabelText('Mobile number').getAttribute('inputmode')).toBe('numeric');
    expect(screen.getByRole('button', { name: /book demo/i })).toBeTruthy();
  });

  it('refuses an invalid number without capturing anything', () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    type('12345');
    submit();
    expect(screen.getByRole('status').textContent).toMatch(/valid|mobile|number/i);
    expect(demoBooking.submitDemoBooking).not.toHaveBeenCalled();
    expect(window.fbq).not.toHaveBeenCalled();
  });

  it('books the demo in place: saves the number, opens nothing, confirms on the card', async () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    type('98765 43210');
    submit();
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe(
        'Demo booked. We will call you on this number to fix a time.'
      )
    );
    expect(window.open).not.toHaveBeenCalled();
    expect(demoBooking.submitDemoBooking).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '9876543210', source: demoBooking.BOOKING_SOURCE_CALENDAR })
    );
    const button = screen.getByRole('button', { name: /booked/i });
    expect(button.disabled).toBe(true);
    // Booked is done, not busy: no progress cursor and the success style.
    expect(button.getAttribute('aria-busy')).toBe('false');
    expect(button.className).toContain('is-booked');
  });

  it('matches the number before the Meta Lead fires', async () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    type('9876543210');
    submit();
    await waitFor(() => expect(demoBooking.submitDemoBooking).toHaveBeenCalled());
    const calls = window.fbq.mock.calls;
    const init = calls.findIndex((c) => c[0] === 'init');
    const lead = calls.findIndex((c) => c[0] === 'track' && c[1] === 'Lead');
    expect(calls[init][2]).toEqual({ ph: '919876543210' });
    expect(calls[lead][2]).toEqual({ content_name: 'feature_demo_request' });
    expect(init).toBeLessThan(lead);
  });

  it('says so when the capture fails, and lets the visitor try again', async () => {
    demoBooking.submitDemoBooking.mockRejectedValueOnce(new Error('down'));
    render(<InlineDemoForm context="home-feature-reports" />);
    type('9876543210');
    submit();
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe('Could not save your number. Please try again.')
    );
    expect(screen.getByRole('button', { name: /book demo/i }).disabled).toBe(false);
  });
});
