import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children inline so JSON-LD can be asserted synchronously,
// mirroring home-trust.test.jsx.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import { navLinks, footerColumns, demoEntryLive, heroContent } from '../../data/siteContent';
import { HERO_HOME, HOTSPOTS, JOBS } from '../../data/heroHotspots';
import { STOPS } from '../../data/journey';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

// DemoTryCTA calls usePhoneModal(), which throws by design outside a
// provider -- and it throws BEFORE the `if (!demoEntryLive)` early return,
// so this render goes red at either flag value without the wrapper.
function renderHome() {
  return render(
    <MemoryRouter>
      <PhoneModalProvider>
        <Home />
      </PhoneModalProvider>
    </MemoryRouter>
  );
}

const jobButton = (container, key) =>
  [...container.querySelectorAll('.hv3-hero-jobs .hv3-job')][JOBS.findIndex((j) => j.key === key)];

describe('Home v3 structure (AE1)', () => {
  it('tells the page story through headings alone: the phone, then one invoice, stop by stop', () => {
    const { container } = renderHome();
    const h1s = [...container.querySelectorAll('h1')];
    // The server render is the home state, so a crawler and a no-JS visitor
    // both get the real headline rather than an empty shell.
    expect(h1s.map((h) => h.textContent)).toEqual([HERO_HOME.headline]);

    const h2s = [...container.querySelectorAll('h2')].map((h) => h.textContent);
    expect(h2s).toContain('From the order at the counter to the receipt in Tally.');

    const h3s = [...container.querySelectorAll('h3')].map((h) => h.textContent);
    for (const stop of STOPS) {
      expect(h3s, `no heading for the ${stop.id} stop`).toContain(stop.headline);
    }
  });

  it('renders the one story as seven stops inside #digital-collection', () => {
    const { container } = renderHome();
    const stops = [...container.querySelectorAll('#digital-collection article')];
    expect(stops).toHaveLength(STOPS.length);
    expect(stops.map((s) => s.id)).toEqual(STOPS.map((s) => `stop-${s.id}`));
  });

  // The capability grid that used to carry #features is gone; the anchor moved
  // to the station list so the id it left behind still lands on the story.
  it('keeps the #features anchor on the journey station list', () => {
    const { container } = renderHome();
    const features = container.querySelector('[id="features"]');
    expect(features).toBeTruthy();
    expect(features.className).toContain('foi-stations');
  });

  it('orders the sections hero → proof → journey → tally → pricing', () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll('section[id]')].map((s) => s.id);
    const order = ['product', 'testimonial', 'digital-collection', 'tally', 'pricing'];
    const positions = order.map((id) => ids.indexOf(id));
    expect(positions.every((p) => p >= 0), `missing section among ${order}`).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });
});

describe('the hero swaps its copy with the phone', () => {
  it('starts on the home copy, with no "see how it works" link to follow yet', () => {
    const { container } = renderHome();
    // At rest the overline is the positioning line, not the hotspot's own: the
    // page has to say who it is for before it says what to tap.
    expect(container.querySelector('.hero-overline').textContent).toBe(heroContent.overline);
    expect(container.querySelector('.hero-subtitle').textContent).toBe(HERO_HOME.body);
    expect(container.querySelector('.hv3-hero-more')).toBeNull();
    for (const button of container.querySelectorAll('.hv3-job')) {
      expect(button.getAttribute('aria-pressed')).toBe('false');
    }
  });

  it('swaps overline, headline and body to the job the visitor picked', () => {
    const { container } = renderHome();
    fireEvent.click(jobButton(container, 'stock'));
    const stock = HOTSPOTS.find((h) => h.key === 'stock');
    expect(container.querySelector('.hero-overline').textContent).toBe(stock.overline);
    expect(container.querySelector('h1').textContent).toBe(stock.headline);
    expect(container.querySelector('.hero-subtitle').textContent).toBe(stock.body);
    expect(jobButton(container, 'stock').getAttribute('aria-pressed')).toBe('true');
    // The page never grows a second h1 as the copy swaps.
    expect(container.querySelectorAll('h1')).toHaveLength(1);
  });

  it('follows the open job through to its feature page', () => {
    const { container } = renderHome();
    fireEvent.click(jobButton(container, 'reminders'));
    const link = container.querySelector('.hv3-hero-more');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe(
      HOTSPOTS.find((h) => h.key === 'reminders').href
    );
  });

  it('closes on a second press of the job that is already open', () => {
    const { container } = renderHome();
    fireEvent.click(jobButton(container, 'team'));
    expect(jobButton(container, 'team').getAttribute('aria-pressed')).toBe('true');
    fireEvent.click(jobButton(container, 'team'));
    expect(jobButton(container, 'team').getAttribute('aria-pressed')).toBe('false');
    expect(container.querySelector('h1').textContent).toBe(HERO_HOME.headline);
  });

  // The headline is keyed on the open hotspot, so React remounts it on every
  // swap. A live region there would announce the whole headline again on top of
  // the phone's own "Showing <label>", so the hero keeps exactly one.
  it('leaves the announcing to the phone, with one live region in the hero', () => {
    const { container } = renderHome();
    const hero = container.querySelector('#product');
    expect(container.querySelector('h1').hasAttribute('aria-live')).toBe(false);
    expect(hero.querySelectorAll('[aria-live]')).toHaveLength(1);
  });

  // The job buttons drive the phone from outside it: PlayablePhone's own
  // buttons are the hotspots and the Back pill, and nothing else may sit in
  // that layer.
  it('keeps the job buttons outside the phone', () => {
    const { container } = renderHome();
    expect(container.querySelectorAll('.pphone .hv3-job')).toHaveLength(0);
    expect(container.querySelectorAll('.hv3-hero-jobs .hv3-job')).toHaveLength(JOBS.length);
  });
});

describe('anchor contract (no dead anchors, CLAUDE.md §11.6)', () => {
  it('gives every nav and footer hash link a matching element id on Home', () => {
    const { container } = renderHome();
    const hashes = [...navLinks, ...footerColumns.flatMap((c) => c.links)]
      .map((l) => l.href)
      .filter((href) => href && (href.startsWith('#') || href.startsWith('/#')))
      .map((href) => href.replace(/^\/?#/, ''));
    expect(hashes.length).toBeGreaterThan(0);
    for (const id of hashes) {
      expect(
        container.querySelectorAll(`[id="${id}"]`),
        `#${id} must exist exactly once on the home page`
      ).toHaveLength(1);
    }
  });

  it('renders no duplicate element ids anywhere on the page', () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll('[id]')].map((el) => el.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes, `duplicate ids: ${dupes.join(', ')}`).toHaveLength(0);
  });
});

describe('demo-entry gate', () => {
  it.skipIf(demoEntryLive)('renders no demo-entry CTA while demoEntryLive is false', () => {
    const { container } = renderHome();
    expect(container.textContent).not.toMatch(/try the demo/i);
  });

  // Unconditional. The capture modal, not an anchor, is the only way into the
  // demo: a middle-click or a copied href would otherwise reach the app with
  // no lead recorded, which is exactly what R2 exists to prevent. Asserting
  // this only in the flag-false branch would make it vacuous after the flip.
  it('never renders an anchor into the app, at either flag value', () => {
    const { container } = renderHome();
    const appAnchors = [...container.querySelectorAll('a')]
      .map((a) => a.getAttribute('href') ?? '')
      .filter((h) => h.includes('app.takkada.com'));
    expect(appAnchors).toEqual([]);
  });
});

describe('home copy claims', () => {
  it('claims nothing unclaimable in the rendered page text', () => {
    const { container } = renderHome();
    const text = container.textContent;
    // Own-number reminders: zero enabled customers — only "early access".
    // Non-empty: the pricing add-on line deliberately carries this mention, so
    // a vacuously green guard means the guard itself broke. (The wider
    // reworded-copy net lives at the data layer in schema.test.js.)
    const mentions = text.match(/[^.]*own WhatsApp[^.]*/gi) ?? [];
    expect(mentions.length).toBeGreaterThan(0);
    for (const mention of mentions) {
      expect(mention).toMatch(/early access/i);
    }
    // Auto-send credit notes does not exist.
    expect(text).not.toMatch(/auto[- ]?(send|dispatch)\w*[^.]{0,60}credit note/i);
  });
});

describe('the homepage stylesheets stay scoped to the homepage', () => {
  // Selector heads: lines ending in "{" that are not at-rules or keyframe
  // stops. Nesting puts both inside a rule body, so both are skipped by shape
  // rather than by un-nesting the CSS.
  const headsOf = (css) =>
    css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.endsWith('{') && !l.startsWith('@'))
      .map((l) => l.slice(0, -1).trim())
      .filter((sel) => !/^(from|to|\d+%)(\s*,\s*(from|to|\d+%))*$/.test(sel));

  it('prefixes every home.css rule head with .home-v3 (or html.js/.no-js .home-v3)', () => {
    // Vitest runs with cwd at the repo root.
    const css = readFileSync('src/home.css', 'utf8');
    const heads = headsOf(css);
    expect(heads.length).toBeGreaterThan(0);
    for (const head of heads) {
      for (const sel of head.split(',')) {
        expect(
          /^(html\.(js|no-js)\s+)?\.home-v3\b/.test(sel.trim()),
          `unscoped selector in home.css: "${sel.trim()}"`
        ).toBe(true);
      }
    }
    expect(css.replace(/\/\*[\s\S]*?\*\//g, '')).not.toMatch(/:root/);
  });

  // journey.css carries the homepage's hero phone and story, and will also
  // carry the journey strip that renders on feature pages — so a head there
  // may target .home-v3 or .journey-strip, and nothing else.
  it('prefixes every journey.css rule head with .home-v3 or .journey-strip', () => {
    const css = readFileSync('src/journey.css', 'utf8');
    const heads = headsOf(css);
    expect(heads.length).toBeGreaterThan(0);
    for (const head of heads) {
      for (const sel of head.split(',')) {
        expect(
          /^(html\.(js|no-js)\s+)?(\.home-v3\s|\.journey-strip\b)/.test(sel.trim()),
          `unscoped selector in journey.css: "${sel.trim()}"`
        ).toBe(true);
      }
    }
    expect(css.replace(/\/\*[\s\S]*?\*\//g, '')).not.toMatch(/:root/);
  });
});
