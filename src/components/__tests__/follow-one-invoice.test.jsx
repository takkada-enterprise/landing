import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { cleanup, render, screen as ui, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FollowOneInvoice from '../FollowOneInvoice';
import { STOPS, INVOICE } from '../../data/journey';

// vite.config.js leaves vitest globals off, so RTL never registers its own
// afterEach — without this every render stacks up in the same document and the
// slip is found seven times over.
afterEach(cleanup);

let observers;
beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = class {
    constructor(cb) {
      this.cb = cb;
      observers.push(this);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

const arrive = (el) =>
  act(() => observers.forEach((o) => o.cb([{ isIntersecting: true, target: el }])));
// The future flags are opt-ins we are already compatible with; they are set here
// only so the run stays clean and a real warning cannot hide in the noise.
const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };
const mount = () =>
  render(
    <MemoryRouter future={ROUTER_FUTURE}>
      <FollowOneInvoice />
    </MemoryRouter>
  );

describe('FollowOneInvoice', () => {
  it('renders seven stations in order, each with a headline and a screen', () => {
    mount();
    const stations = ui.getAllByRole('article');
    expect(stations).toHaveLength(7);
    stations.forEach((el, i) => {
      expect(within(el).getByRole('heading', { level: 3 })).toHaveTextContent(STOPS[i].headline);
      expect(within(el).getAllByRole('img').length).toBeGreaterThan(0);
    });
  });

  it('starts with only the first stamp pressed', () => {
    mount();
    expect(ui.getByText('ORDER #118')).toHaveClass('is-on');
    expect(ui.getByText('PAID')).not.toHaveClass('is-on');
  });

  it('presses every stamp up to the station the reader reached, and lifts them again on the way back', () => {
    mount();
    const stations = ui.getAllByRole('article');
    arrive(stations[5]);
    expect(ui.getByText('PAID')).toHaveClass('is-on');
    expect(ui.getByText('IN TALLY ✓')).not.toHaveClass('is-on');
    expect(ui.getByTestId('slip-status')).toHaveTextContent(STOPS[5].status);
    arrive(stations[1]);
    expect(ui.getByText('PAID')).not.toHaveClass('is-on');
  });

  it('marks only the unpressed stamps aria-hidden', () => {
    mount();
    expect(ui.getByText('ORDER #118')).not.toHaveAttribute('aria-hidden');
    expect(ui.getByText('PAID')).toHaveAttribute('aria-hidden', 'true');
  });

  it('ignores an observed node it does not track', () => {
    mount();
    const stations = ui.getAllByRole('article');
    arrive(stations[5]);
    arrive(document.body);
    expect(ui.getByTestId('slip-status')).toHaveTextContent(STOPS[5].status);
  });

  it('renders pills only as links to real pages', () => {
    mount();
    for (const a of ui.getAllByTestId('stop-pill')) {
      expect(a.getAttribute('href')).toMatch(/^\/[a-z0-9-]+$/);
    }
  });

  it('shows the two printed sheets, at Load and at Tally', () => {
    mount();
    expect(ui.getByRole('button', { name: /loading sheet/i })).toBeInTheDocument();
    expect(ui.getByRole('button', { name: /team sales sheet/i })).toBeInTheDocument();
  });

  it('prints the slip total with paise and tabular figures', () => {
    mount();
    const total = ui.getByText('₹1,86,420.16');
    expect(total.closest('.tabular-nums')).not.toBeNull();
  });

  it('draws the Send stop as a picture of a message, not a link or a button', () => {
    mount();
    const send = STOPS.findIndex((s) => s.id === 'send');
    const station = ui.getAllByRole('article')[send];
    const card = within(station).getByRole('img', { name: /whatsapp message/i });

    expect(within(card).getByText(new RegExp(INVOICE.number.replace(/\//g, '\\/')))).toBeInTheDocument();
    expect(within(card).getByText(/₹1,86,420\.16/)).toBeInTheDocument();
    expect(within(card).getByText(STOPS[send].message.attachment)).toBeInTheDocument();
    expect(within(card).getByText(STOPS[send].message.cta)).toBeInTheDocument();

    expect(card.querySelectorAll('a, button, [href], [tabindex], [onclick]')).toHaveLength(0);
    expect(card.getAttribute('aria-label')).toContain(INVOICE.number);
  });

  it('gives the Send stop no phone screenshot, as its data has none', () => {
    mount();
    const send = STOPS.findIndex((s) => s.id === 'send');
    const station = ui.getAllByRole('article')[send];
    expect(station.querySelectorAll('.foi-phone')).toHaveLength(0);
  });
});
