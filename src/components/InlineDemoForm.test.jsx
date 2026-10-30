import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InlineDemoForm from './InlineDemoForm';
import * as demoBooking from '../lib/demoBooking';

describe('InlineDemoForm', () => {
  const originalWindowOpen = window.open;
  let order;

  beforeEach(() => {
    order = [];
    window.open = vi.fn(() => order.push('open'));
    window.fbq = vi.fn((...args) => order.push(`fbq:${args[0]}`));
    vi.spyOn(demoBooking, 'submitDemoBooking').mockImplementation(async () => {
      order.push('capture');
    });
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

  it('refuses an invalid number without opening the calendar or capturing', () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    type('12345');
    submit();
    expect(screen.getByRole('status').textContent).toMatch(/valid|mobile|number/i);
    expect(window.open).not.toHaveBeenCalled();
    expect(demoBooking.submitDemoBooking).not.toHaveBeenCalled();
  });

  it('opens the calendar first, matches the number, then captures it as a calendar booking', async () => {
    render(<InlineDemoForm context="home-feature-reports" />);
    type('98765 43210');
    submit();
    expect(order[0]).toBe('open');
    expect(window.fbq).toHaveBeenCalledWith('init', expect.any(String), { ph: '919876543210' });
    await waitFor(() => expect(screen.getByRole('status').textContent).toMatch(/saved/i));
    expect(order.indexOf('capture')).toBeGreaterThan(order.indexOf('open'));
    expect(demoBooking.submitDemoBooking).toHaveBeenCalledWith(
      expect.objectContaining({ phone: '9876543210', source: demoBooking.BOOKING_SOURCE_CALENDAR })
    );
  });

  it('says so when the capture fails', async () => {
    demoBooking.submitDemoBooking.mockRejectedValueOnce(new Error('down'));
    render(<InlineDemoForm context="home-feature-reports" />);
    type('9876543210');
    submit();
    await waitFor(() =>
      expect(screen.getByRole('status').textContent).toBe('Could not save your number. Please try again.')
    );
  });
});
