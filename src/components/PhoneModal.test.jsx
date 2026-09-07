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

  // ────────────────────────── demo destination ──────────────────────────
  //
  // The demo path must not reuse window.open. Same-tab navigation has no
  // user-activation constraint, which is why the popup-blocker bug cannot
  // recur here rather than merely being worked around.

  it('navigates this tab to the app with the number in the fragment, and never opens a tab', async () => {
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    expect(navigate).toHaveBeenCalledWith('https://app.takkada.com/#/demo?phone=919876543210');
    // The hash is load-bearing: the app is hash-routed, so a URL without it
    // has never resolved to the demo screen.
    expect(navigate.mock.calls[0][0]).toContain('#');
    expect(window.open).not.toHaveBeenCalled();
  });

  it('sends the capture with source demo_entry and keepalive', async () => {
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    expect(submitDemoBookingSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: '9876543210',
        source: 'demo_entry',
        keepalive: true,
      })
    );
  });

  it('navigates BEFORE the capture settles', async () => {
    // THE ordering assertion. jsdom has no popup blocker and does not enforce
    // user activation, so a test that merely observes both happening passes
    // either way. A capture promise that never settles is the only thing that
    // distinguishes "fired and moved on" from "awaited first".
    let resolveCapture;
    submitDemoBookingSpy.mockReturnValue(
      new Promise((resolve) => {
        resolveCapture = resolve;
      })
    );
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    // The capture is still in flight, and the visitor is already gone.
    expect(navigate).toHaveBeenCalledTimes(1);

    resolveCapture?.({ skipped: false, timestamp: '2026-08-04T06:00:00.000Z' });
  });

  it('still navigates when the capture throws synchronously', async () => {
    submitDemoBookingSpy.mockImplementation(() => {
      throw new Error('fetch exploded');
    });
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    // Capture is best-effort. Entry is not.
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('does not navigate or capture on an invalid number', async () => {
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    // Note '98765432109' is deliberately absent: sanitizePhoneInput slices to
    // ten digits, so an 11-digit paste becomes a VALID number by design.
    const cases = [
      ['5555555555', 'Enter a valid 10-digit Indian mobile number'],
      ['987654321', 'Enter a valid 10-digit Indian mobile number'],
      ['abcdefghij', 'Please enter your phone number'],
      ['', 'Please enter your phone number'],
    ];

    for (const [bad, message] of cases) {
      fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: bad } });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
      });
      expect(navigate, `navigated on "${bad}"`).not.toHaveBeenCalled();
      expect(submitDemoBookingSpy, `captured "${bad}"`).not.toHaveBeenCalled();
      expect(screen.getByText(message), `wrong message for "${bad}"`).toBeInTheDocument();
    }
  });

  it('shows no "Redirecting to calendar" line on the demo path', async () => {
    const navigate = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" navigate={navigate} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    expect(screen.queryByText('Redirecting to calendar...')).toBeNull();
  });

  it('renders the collection notice at the point of collection', () => {
    render(<PhoneModal isOpen onClose={vi.fn()} destination="demo" />);

    expect(screen.getByText(/use this number to send your code/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute(
      'href',
      '/privacy-policy'
    );
    expect(screen.getByText(/few seconds to open on mobile/i)).toBeInTheDocument();
  });

  it('renders the collection notice on the calendar path too, without promising a code', () => {
    render(<PhoneModal isOpen onClose={vi.fn()} />);

    expect(screen.getByText(/use this number to contact you about Takkada/i)).toBeInTheDocument();
    expect(screen.queryByText(/send your code/i)).toBeNull();
  });

  it('emits the calendar_open Clarity event when the calendar opens', async () => {
    window.clarity = vi.fn();

    render(<PhoneModal isOpen onClose={vi.fn()} />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '9876543210' },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /continue to book/i }));
    });

    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.clarity).toHaveBeenCalledWith('event', 'calendar_open');
    expect(window.clarity).toHaveBeenCalledWith('set', 'cta_context', 'phone-modal');

    delete window.clarity;
  });
});
