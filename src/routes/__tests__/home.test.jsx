// The Campfire home page (plan 2026-10-30-003, Task 4). Replaces
// home-v3.test.jsx and carries its two page-level guards: the own-number
// "early access" rule (CLAUDE.md §3) and the nav/footer anchor contract.
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import { HOME_HERO, HOME_USED_FOR, HOME_ROWS } from '../../data/home';
import { SCREENS } from '../../data/screens';
import {
  navLinks,
  footerColumns,
  pricing,
  planPricing,
  formatInr,
  testimonials,
  trustSection,
  videoTestimonials,
  appLinks,
} from '../../data/siteContent';
import snapshot from '../../data/rateCardSnapshot.json';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

function renderHome() {
  return render(
    <MemoryRouter future={ROUTER_FUTURE}>
      <PhoneModalProvider>
        <Home />
      </PhoneModalProvider>
    </MemoryRouter>
  ).container;
}

describe('hero', () => {
  it('sets the headline with the accent phrase', () => {
    const c = renderHome();
    const h1 = c.querySelector('h1.ui-hero-title');
    expect(h1.textContent).toBe(HOME_HERO.headline);
    expect(h1.querySelector('em.ui-accent').textContent).toBe(HOME_HERO.accent);
  });

  it('shows the home screen eagerly and the two floats where the data puts them', () => {
    const c = renderHome();
    const shot = c.querySelector('.ui-hero-stage img.ui-shot[data-screen="home"]');
    expect(shot.getAttribute('loading')).toBe('eager');
    const floats = [...c.querySelectorAll('.ui-hero-float')];
    expect(floats).toHaveLength(HOME_HERO.floats.length);
    HOME_HERO.floats.forEach((f, i) => {
      expect(floats[i].querySelector('img').getAttribute('src')).toBe(SCREENS[f.screen].src);
      expect(floats[i].style.top).toBe(f.top);
    });
  });
});

describe('sections', () => {
  it('renders the four used-for cards from home.js', () => {
    const cards = [...renderHome().querySelectorAll('#used-for .ui-card')];
    expect(cards).toHaveLength(4);
    HOME_USED_FOR.forEach((d, i) => {
      expect(cards[i].querySelector('h3').textContent).toBe(d.title);
      expect(cards[i].querySelector('p.ui-card-line').textContent).toBe(d.line);
      expect(cards[i].querySelector('img').getAttribute('src')).toBe(SCREENS[d.screen].src);
      expect(cards[i].getAttribute('href')).toBe(`/${d.slug}`);
    });
  });

  it('quotes the lead testimonial beside the one scale figure', () => {
    const band = renderHome().querySelector('#testimonial');
    expect(band.querySelector('blockquote').textContent).toBe(testimonials[0].quote);
    expect(band.textContent).toContain('100+ businesses');
  });

  it('carries three in-charge cards and three alternating rows', () => {
    const c = renderHome();
    expect(c.querySelectorAll('#tally .ui-card')).toHaveLength(3);
    const rows = [...c.querySelectorAll('#rows .ui-altrow')];
    expect(rows).toHaveLength(HOME_ROWS.length);
    expect(rows.map((r) => r.classList.contains('ui-altrow--flip'))).toEqual([false, true, false]);
  });

  it('keeps the data-safety points, store links and explainer', () => {
    const s = renderHome().querySelector('#data-safety');
    for (const p of trustSection.points) {
      expect(s.textContent).toContain(p.title);
      expect(s.textContent).toContain(p.body);
    }
    const store = [...s.querySelectorAll('a')].filter((a) =>
      [appLinks.playStore, appLinks.appStore].includes(a.getAttribute('href'))
    );
    expect(store).toHaveLength(2);
    for (const a of store) expect(a.getAttribute('rel')).toContain('noopener');
    expect(s.querySelector(`a[href="${trustSection.articleLink.href}"]`)).toBeTruthy();
  });

  it('gives every video story its own card', () => {
    expect(renderHome().querySelectorAll('#customer-stories .ui-card')).toHaveLength(
      videoTestimonials.length
    );
  });

  it('orders the sections hero to close', () => {
    const order = ['product', 'used-for', 'testimonial', 'tally', 'rows', 'data-safety', 'customer-stories', 'pricing', 'faq', 'close'];
    const ids = [...renderHome().querySelectorAll('[id]')].map((el) => el.id).filter((id) => order.includes(id));
    expect(ids).toEqual(order);
  });
});

describe('pricing', () => {
  it('still renders the .rate-* matrix, one plan head per plan', () => {
    const s = renderHome().querySelector('#pricing');
    expect(s.querySelectorAll('.rate-table-head .rate-col')).toHaveLength(pricing.plans.length);
  });

  it('prints only rupee figures the rate card can justify', () => {
    const allowed = new Set(Object.values(snapshot.plans).map((p) => formatInr(p.annualInr)));
    for (const plan of pricing.plans) {
      for (const term of pricing.terms) {
        const q = planPricing(plan, term.id);
        [q.price, q.listPrice, formatInr(q.total)].forEach((v) => allowed.add(v));
      }
    }
    const figures = renderHome().querySelector('#pricing').textContent.match(/₹[\d,]+/g) ?? [];
    expect(figures.length).toBeGreaterThan(0);
    for (const f of figures) expect(allowed, f).toContain(f);
  });
});

describe('ported guards (home-v3.test.jsx)', () => {
  it('puts "early access" beside every own-number mention', () => {
    const c = renderHome();
    const hits = [...c.querySelectorAll('*')].filter(
      (el) =>
        /own (WhatsApp|number)/i.test(el.textContent) &&
        ![...el.children].some((ch) => /own (WhatsApp|number)/i.test(ch.textContent))
    );
    expect(hits.length).toBeGreaterThan(0);
    for (const el of hits) expect(el.parentElement.textContent).toMatch(/early access/i);
  });

  it('gives every nav and footer hash link a matching id on Home', () => {
    const c = renderHome();
    const hashes = [...navLinks, ...footerColumns.flatMap((col) => col.links)]
      .map((l) => l.href)
      .filter((h) => h && (h.startsWith('#') || h.startsWith('/#')))
      .map((h) => h.replace(/^\/?#/, ''));
    expect(hashes.length).toBeGreaterThan(0);
    for (const id of hashes) expect(c.querySelectorAll(`[id="${id}"]`), `#${id}`).toHaveLength(1);
  });
});

describe('stylesheet guards', () => {
  const css = ['src/ui/ui.css', 'src/ui/home.css']
    .map((f) => readFileSync(f, 'utf8'))
    .join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  it('has no keyframes and no transition: all', () => {
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/transition:\s*all/);
  });

  it('hides the hero floats once the hero stacks below 900px', () => {
    const blocks = css.split(/@media\s*\(max-width:\s*899px\)/).slice(1);
    expect(blocks.some((b) => /\.ui-hero-float\s*\{[^}]*display:\s*none/.test(b))).toBe(true);
  });

  it('paints --band only on the band, the dark pill, the footer and the pricing highlight', () => {
    const allowed = ['.ui-band--band', '.ui-pill--dark', '.ui-footer', '.ui-pricing-highlight'];
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    const users = rules.filter(([, , body]) => /var\(--band\)/.test(body));
    expect(users.length).toBeGreaterThan(0);
    for (const [, head] of users) {
      expect(allowed.some((a) => head.includes(a)), head.trim()).toBe(true);
    }
  });
});
