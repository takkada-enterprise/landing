import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cleanup, render, screen as ui, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FollowOneInvoice from '../FollowOneInvoice';
import { STOPS, INVOICE } from '../../data/journey';
import { screen as screenAsset } from '../../data/screens';

const css = readFileSync(resolve(__dirname, '../../journey.css'), 'utf8').replace(
  /\/\*[\s\S]*?\*\//g,
  ''
);
const block = (head) => {
  const i = css.indexOf(`${head} {`);
  return i < 0 ? '' : css.slice(i, css.indexOf('}', i));
};

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
  // The smoke assertion on its own would pass on any seven pictures at all, so
  // each station is also held to the exact screens its own data names.
  it('renders seven stations in order, each with its headline and its own screens', () => {
    mount();
    const stations = ui.getAllByRole('article');
    expect(stations).toHaveLength(7);
    stations.forEach((el, i) => {
      expect(within(el).getByRole('heading', { level: 3 })).toHaveTextContent(STOPS[i].headline);
      expect(within(el).getAllByRole('img').length).toBeGreaterThan(0);

      for (const slug of STOPS[i].screens) {
        const asset = screenAsset(slug);
        const img = within(el).getByAltText(asset.alt);
        expect(img.tagName, `${STOPS[i].id}/${slug}`).toBe('IMG');
        expect(img).toHaveAttribute('src', asset.src);
      }
      if (STOPS[i].sheet) {
        const asset = screenAsset(STOPS[i].sheet);
        // The sheet's picture appears twice: tucked behind the phone, and again
        // inside the dialog that enlarges it.
        const imgs = within(el).getAllByAltText(asset.alt);
        expect(imgs.length, STOPS[i].id).toBe(2);
        for (const img of imgs) expect(img).toHaveAttribute('src', asset.src);
      }
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

  // The pinned mobile bar has room for exactly one stamp and shows this one, so
  // "exactly one" is a layout guarantee, not a detail.
  it('marks exactly one stamp current, and it follows the reader both ways', () => {
    const { container } = mount();
    const current = () => container.querySelectorAll('.slip-stamp.is-current');
    expect(current()).toHaveLength(1);
    expect(current()[0]).toHaveTextContent(STOPS[0].stamp.text);

    const stations = ui.getAllByRole('article');
    arrive(stations[5]);
    expect(current()).toHaveLength(1);
    expect(current()[0]).toHaveTextContent(STOPS[5].stamp.text);

    arrive(stations[1]);
    expect(current()).toHaveLength(1);
    expect(current()[0]).toHaveTextContent(STOPS[1].stamp.text);
  });

  it('carries the full invoice number, which is all the pinned mobile bar shows', () => {
    mount();
    expect(ui.getByText(INVOICE.number)).toBeInTheDocument();
    expect(ui.getByText(INVOICE.short)).toBeInTheDocument();
  });

  // The stamps are decoration at every width: on the pinned mobile bar only one
  // of the seven is even visible, so an assistive reader that was given the
  // landed ones would hear six stamps for a bar showing one. The live status
  // line is the slip's accessible account of itself, and it is enough.
  it('hides every stamp from assistive tech and lets the live status speak instead', () => {
    const { container } = mount();
    const stations = ui.getAllByRole('article');

    for (const at of [0, 5, 1, 6]) {
      if (at > 0) arrive(stations[at]);
      const stamps = container.querySelectorAll('.slip-stamp');
      expect(stamps).toHaveLength(STOPS.length);
      for (const stamp of stamps) {
        expect(stamp, stamp.textContent).toHaveAttribute('aria-hidden', 'true');
      }
      const status = ui.getByTestId('slip-status');
      expect(status).toHaveTextContent(STOPS[at].status);
      expect(status).toHaveAttribute('aria-live', 'polite');
    }
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

  // Both copies of a sheet — the one tucked behind the phone and the enlarged
  // one inside its <dialog> — must be lazy. The dialog's copy is the expensive
  // one: a closed dialog is display:none, so an eager <img> there pulled the
  // 1440w candidate of both sheets (62 KB) on every homepage load for a dialog
  // nobody had opened.
  it('loads every copy of both printed sheets lazily, dialog included', () => {
    mount();
    const sheets = STOPS.filter((s) => s.sheet).map((s) => s.sheet);
    expect(sheets.length, 'no stop carries a sheet; this check is vacuous').toBe(2);

    for (const slug of sheets) {
      const copies = ui.getAllByAltText(screenAsset(slug).alt);
      expect(copies, `${slug} is not drawn twice`).toHaveLength(2);
      for (const img of copies) {
        expect(img.getAttribute('loading'), `${slug} copy is eager`).toBe('lazy');
        expect(img.getAttribute('decoding'), `${slug} copy decodes on the main thread`).toBe(
          'async'
        );
      }
    }
  });

  it('keeps the paper sheet CSS width and every desktop image hint at 230px', () => {
    mount();
    const desktopWidth = '230px';
    const sheets = STOPS.filter((s) => s.sheet).map((s) => s.sheet);
    expect(block('.home-v3 .sheet')).toContain(`width: ${desktopWidth}`);

    for (const slug of sheets) {
      const tucked = ui
        .getAllByAltText(screenAsset(slug).alt)
        .find((img) => img.closest('button.sheet'));
      expect(tucked, `${slug} has no tucked sheet image`).toBeDefined();
      expect(tucked).toHaveAttribute('sizes', `(max-width: 900px) 33vw, ${desktopWidth}`);
    }
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

  it('keeps every stamp in a stamp zone below the status line, not over the items', () => {
    mount();
    const zone = document.querySelector('.slip-stamps');
    expect(zone).not.toBeNull();
    expect(zone.querySelectorAll('.slip-stamp')).toHaveLength(7);
    const status = ui.getByTestId('slip-status');
    expect(status.compareDocumentPosition(zone) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(block('.home-v3 .slip-stamp')).not.toMatch(/position:\s*absolute/);
  });

  it('keeps the tucked phone and the sheet inside the visual column', () => {
    expect(block('.home-v3 .foi-phone--1')).not.toMatch(/left:\s*-/);
    expect(block('.home-v3 .sheet')).not.toMatch(/left:\s*-/);
  });

  it('gives the message card its own dark text', () => {
    expect(block('.home-v3 .wam-bubble')).toMatch(/color:\s*var\(--color-text\)/);
    expect(block('.home-v3 .wam-bubble p, .home-v3 .wam-bubble span')).toMatch(
      /color:\s*inherit/
    );
  });
});
