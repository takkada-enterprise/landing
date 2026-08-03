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
  storyCollections,
  storyTeamSales,
} from '../../data/siteContent';
import { whatsappHref, WHATSAPP_MESSAGES } from '../../lib/whatsapp';

afterEach(cleanup);

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
}

describe('Home v3 structure (AE1)', () => {
  it('tells the page story through headings alone: promise, collections, team sales, grid', () => {
    const { container } = renderHome();
    const headings = [...container.querySelectorAll('h1, h2')].map((h) => h.textContent);
    const all = headings.join(' | ');
    expect(all).toContain('Get paid without chasing.');
    expect(all).toContain(storyCollections.heading);
    expect(all).toContain(storyTeamSales.heading);
    expect(all).toContain('Every capability you will actually use');
  });

  it('orders the sections hero → story 1 → story 2 → grid → tally → pricing', () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll('section[id]')].map((s) => s.id);
    const order = ['product', 'digital-collection', 'team-sales', 'features', 'tally', 'pricing'];
    const positions = order.map((id) => ids.indexOf(id));
    expect(positions.every((p) => p >= 0), `missing section among ${order}`).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it('renders a WhatsApp CTA in the hero and one per story', () => {
    const { container } = renderHome();
    const waLinks = [...container.querySelectorAll('a[href^="https://wa.me/"]')];
    expect(waLinks.length).toBeGreaterThanOrEqual(3);
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
        container.querySelector(`[id="${id}"]`),
        `dead anchor: #${id} has no element on the home page`
      ).not.toBeNull();
    }
  });
});

describe('demo-entry gate', () => {
  it('renders no demo-entry CTA while demoEntryLive is false', () => {
    expect(demoEntryLive).toBe(false);
    const { container } = renderHome();
    expect(container.querySelector(`a[href="https://app.takkada.com/demo"]`)).toBeNull();
    expect(container.textContent).not.toMatch(/try it yourself/i);
  });
});

describe('story WhatsApp contexts', () => {
  it('has a dedicated non-empty prefill for each story context', () => {
    for (const context of ['story-collections', 'story-team-sales']) {
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
    for (const mention of text.match(/[^.]*own WhatsApp[^.]*/gi) ?? []) {
      expect(mention).toMatch(/early access/i);
    }
    // Auto-send credit notes does not exist.
    expect(text).not.toMatch(/auto[- ]?(send|dispatch)\w*[^.]{0,60}credit note/i);
  });
});
