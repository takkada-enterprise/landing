import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import PhoneModal from './PhoneModal';
import * as demoBooking from '../lib/demoBooking';

describe('PhoneModal', () => {
  const submitDemoBookingSpy = vi.spyOn(demoBooking, 'submitDemoBooking');
  const originalWindowOpen = window.open;

  beforeEach(() => {
    submitDemoBookingSpy.mockResolvedValue({ skipped: false, timestamp: '2026-03-09T06:00:00.000Z' });
    window.open = vi.fn();
  });

  afterEach(() => {
    cleanup();
    if (vi.isFakeTimers()) {
      vi.runOnlyPendingTimers();
      vi.useRealTimers();
    }
    submitDemoBookingSpy.mockReset();
    window.open = originalWindowOpen;
  });

  it('shows a validation error before submitting', async () => {
    render(<PhoneModal isOpen onClose={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    expect(screen.getByText('Please enter your phone number')).toBeInTheDocument();
    expect(submitDemoBookingSpy).not.toHaveBeenCalled();
  });

  it('submits a valid phone number, opens the calendar, and closes the modal', async () => {
    const onClose = vi.fn();
    vi.useFakeTimers();

    render(<PhoneModal isOpen onClose={onClose} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '98 76a54-32109' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    await act(async () => {
      await Promise.resolve();
    });

    expect(submitDemoBookingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '9876543210',
      })
    );

    expect(window.open).toHaveBeenCalledWith(
      'https://calendar.notion.so/meet/ronakmalu/takkada',
      '_blank',
      'noopener,noreferrer'
    );

    await act(async () => {
      vi.advanceTimersByTime(800);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('still opens the calendar but shows an error when backend capture fails', async () => {
    vi.useFakeTimers();
    submitDemoBookingSpy.mockRejectedValue(new Error('booking failed'));

    render(<PhoneModal isOpen onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));

    await act(async () => {
      await Promise.resolve();
    });

    // Booking capture is secondary; the calendar must still open so the user
    // can book even if the background capture request fails.
    expect(window.open).toHaveBeenCalledWith(
      'https://calendar.notion.so/meet/ronakmalu/takkada',
      '_blank',
      'noopener,noreferrer'
    );
    expect(screen.getByText('Could not save your number. Please try again.')).toBeInTheDocument();
  });

  it('opens the calendar synchronously before the booking request settles', async () => {
    // Regression guard for the popup-blocker bug: window.open must run inside
    // the click gesture, not in an async continuation after awaiting the
    // booking fetch. A deferred promise that never settles during this
    // assertion proves the open is not gated behind the await.
    let resolveBooking;
    submitDemoBookingSpy.mockReturnValue(
      new Promise((resolve) => {
        resolveBooking = resolve;
      })
    );

    render(<PhoneModal isOpen onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    // Booking is still pending here, yet the calendar tab is already open.
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      'https://calendar.notion.so/meet/ronakmalu/takkada',
      '_blank',
      'noopener,noreferrer'
    );

    resolveBooking?.({ skipped: false, timestamp: '2026-03-09T06:00:00.000Z' });
  });
});
