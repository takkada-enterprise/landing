import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import CalendarCTA from '../CalendarCTA';
import { PhoneModalProvider, usePhoneModal } from '../../context/PhoneModalContext';

afterEach(cleanup);

function Probe() {
  const { open, options } = usePhoneModal();
  return <output data-testid="modal">{open ? options.destination : 'closed'}</output>;
}

// Every calendar link on the site is this one component. A bare link booked a
// slot with no phone number, which the team could not ring back and which
// never reached Discord (owner, 2026-11-24). Both variants must ask first.
describe.each(['button', 'link'])('CalendarCTA variant=%s', (variant) => {
  it('opens the phone modal instead of following the calendar link', () => {
    render(
      <PhoneModalProvider>
        <CalendarCTA context="test" variant={variant} />
        <Probe />
      </PhoneModalProvider>
    );

    expect(screen.getByTestId('modal').textContent).toBe('closed');

    const followed = fireEvent.click(screen.getByRole('link', { name: /book a 15-min demo/i }));

    expect(followed).toBe(false);
    expect(screen.getByTestId('modal').textContent).toBe('calendar');
  });
});
