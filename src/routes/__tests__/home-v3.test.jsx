import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children inline so JSON-LD can be asserted synchronously,
// mirroring home-trust.test.jsx.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import {
  navLinks,
  footerColumns,
  demoEntryLive,
  storyOrderToCash,
  storyTeamSales,
} from '../../data/siteContent';
import { whatsappHref, WHATSAPP_MESSAGES } from '../../lib/whatsapp';
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

describe('Home v3 structure (AE1)', () => {
  it('tells the page story through headings alone: promise, collections, team sales, grid', () => {
    const { container } = renderHome();
    const headings = [...container.querySelectorAll('h1, h2')].map((h) => h.textContent);
    const all = headings.join(' | ');
    expect(all).toContain('Get paid without chasing.');
    expect(all).toContain(storyOrderToCash.heading);
    expect(all).toContain(storyTeamSales.heading);
    expect(all).toContain('Every capability you will actually use');
  });

  it('renders the order-to-cash tour: every station numbered in order, each with its mockup', () => {
    const { container } = renderHome();
    const steps = [...container.querySelectorAll('#digital-collection .hv3-tour-step')];
    expect(steps).toHaveLength(storyOrderToCash.stations.length);
    steps.forEach((step, i) => {
      expect(step.querySelector('.hv3-tour-num')?.textContent).toBe(String(i + 1));
      expect(step.querySelector('.hv3-tour-step-title')?.textContent).toBe(
        storyOrderToCash.stations[i].title
      );
    });
    const imgs = [...container.querySelectorAll('#digital-collection .hv3-tour-phone img')];
    expect(imgs.map((img) => img.getAttribute('src'))).toEqual(
      storyOrderToCash.stations.map((s) => s.screenshot)
    );
    for (const img of imgs) expect(img.getAttribute('alt')).toBeTruthy();
    // Station 1 leads the tour on load.
    expect(steps[0].className).toContain('is-active');
  });

  it('orders the sections hero → story 1 → story 2 → grid → tally → pricing', () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll('section[id]')].map((s) => s.id);
    const order = ['product', 'digital-collection', 'team-sales', 'features', 'tally', 'pricing'];
    const positions = order.map((id) => ids.indexOf(id));
    expect(positions.every((p) => p >= 0), `missing section among ${order}`).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('renders a WhatsApp CTA inside each story section', () => {
    const { container } = renderHome();
    for (const id of ['digital-collection', 'team-sales']) {
      const links = container.querySelectorAll(`#${id} a[href^="https://wa.me/"]`);
      expect(links.length, `no WhatsApp CTA inside #${id}`).toBeGreaterThanOrEqual(1);
    }
  });

  it('renders story 2 safely with its screenshots pending (null screenshot path)', () => {
    const { container } = renderHome();
    const expectedImgs = storyTeamSales.steps.filter((s) => s.screenshot).length;
    expect(container.querySelectorAll('#team-sales .hv3-step-phone img')).toHaveLength(
      expectedImgs
    );
    expect(container.querySelectorAll('#team-sales .hv3-step-title')).toHaveLength(
      storyTeamSales.steps.length
    );
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
    expect(container.textContent).not.toMatch(/try it yourself/i);
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

describe('story WhatsApp contexts', () => {
  it('has a dedicated non-empty prefill for each story context', () => {
    for (const context of ['story-order-to-cash', 'story-team-sales']) {
      expect(WHATSAPP_MESSAGES[context], `missing prefill for ${context}`).toBeTruthy();
      const href = whatsappHref(context);
      expect(href).toContain('https://wa.me/');
      expect(href).toContain(encodeURIComponent(WHATSAPP_MESSAGES[context]).slice(0, 20));
    }
  });

  it('claims nothing unclaimable in the rendered page text', () => {
    const { container } = renderHome();
    const text = container.textContent;
    // Own-number reminders: zero enabled customers — only "early access".
    // Non-empty: the story-1 footnote deliberately carries this mention, so a
    // vacuously green guard means the guard itself broke. (The wider reworded-
    // copy net lives at the data layer in schema.test.js.)
    const mentions = text.match(/[^.]*own WhatsApp[^.]*/gi) ?? [];
    expect(mentions.length).toBeGreaterThan(0);
    for (const mention of mentions) {
      expect(mention).toMatch(/early access/i);
    }
    // Auto-send credit notes does not exist.
    expect(text).not.toMatch(/auto[- ]?(send|dispatch)\w*[^.]{0,60}credit note/i);
  });
});

describe('home.css stays scoped to the homepage', () => {
  it('prefixes every rule head with .home-v3 (or html.js/.no-js .home-v3)', () => {
    // Vitest runs with cwd at the repo root.
    const css = readFileSync('src/home.css', 'utf8');
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    // Selector heads: lines ending in "{" that are not @-rules or keyframe
    // stops. Every one must target .home-v3.
    const heads = noComments
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.endsWith('{') && !l.startsWith('@'))
      .map((l) => l.slice(0, -1).trim())
      .filter((sel) => !/^(from|to|\d+%)(\s*,\s*(from|to|\d+%))*$/.test(sel));
    expect(heads.length).toBeGreaterThan(0);
    for (const head of heads) {
      for (const sel of head.split(',')) {
        expect(
          /^(html\.(js|no-js)\s+)?\.home-v3\b/.test(sel.trim()),
          `unscoped selector in home.css: "${sel.trim()}"`
        ).toBe(true);
      }
    }
    expect(noComments).not.toMatch(/:root/);
  });
});
