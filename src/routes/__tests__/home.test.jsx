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
import { HOME_HERO } from '../../data/home';
import { homeFeatures } from '../../data/siteContent';
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
  it('sets the headline in one colour', () => {
    const c = renderHome();
    const h1 = c.querySelector('h1.ui-hero-title');
    expect(h1.textContent).toBe(HOME_HERO.headline);
    expect(h1.querySelector('em')).toBeNull();
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

  // The hero carries ticked pointers, not a lead sentence (owner ruling
  // 2026-10-31): one line per job, each with a tick icon.
  it('lists the hero pointers with a tick each and no lead paragraph', () => {
    const c = renderHome();
    const hero = c.querySelector('#product');
    expect(hero.querySelector('.ui-hero-lead')).toBeNull();
    const items = [...hero.querySelectorAll('ul.ui-hero-points > li')];
    HOME_HERO.points.forEach((p, i) => expect(items[i].textContent.startsWith(p), p).toBe(true));
    expect(items[0].querySelector('.ui-hero-badge').textContent).toBe('WhatsApp');
    expect(HOME_HERO.points.length).toBeGreaterThanOrEqual(4);
    for (const li of items) expect(li.querySelector('svg')).not.toBeNull();
  });

  // The stage is the 360px phone; a float is a 260px landscape crop. Both
  // shrink with the viewport (home.css), the float in a smaller ratio, so the
  // full-size pair is the tallest case.
  it('keeps each cropped float inside the stage and overlapping the phone by 40px at most', () => {
    const c = renderHome();
    const phone = SCREENS[HOME_HERO.screen];
    const stageH = (360 * phone.height) / phone.width;
    const floats = [...c.querySelectorAll('.ui-hero-float')];
    HOME_HERO.floats.forEach((f, i) => {
      const s = SCREENS[f.screen];
      expect(s.width, f.screen).toBeGreaterThan(s.height);
      expect(floats[i].querySelector('img').getAttribute('src')).toBe(s.src);
      const top = (Number.parseFloat(f.top) / 100) * stageH;
      const height = (260 * s.height) / s.width;
      expect(top, f.id).toBeGreaterThanOrEqual(0);
      expect(top + height, f.id).toBeLessThanOrEqual(stageH);
      const side = f.left ?? f.right;
      const m = /^calc\(100% - (\d+)px\)$/.exec(side);
      expect(m, `${f.id} ${side}`).toBeTruthy();
      expect(Number(m[1]), f.id).toBeLessThanOrEqual(40);
    });
  });
});

describe('sections', () => {
  // Seven text cards from siteContent.homeFeatures (the cofounder's copy,
  // 2026-10-31): title, line, every point ticked, a Try-the-demo button and
  // the page link. No screenshot in any card: the hero phone is the page's
  // one picture.
  it('renders the seven feature cards as text, each with Try the demo and its page link', () => {
    const section = renderHome().querySelector('#features');
    const cards = [...section.querySelectorAll('.ui-card')];
    expect(cards).toHaveLength(homeFeatures.items.length);
    expect(cards).toHaveLength(7);
    homeFeatures.items.forEach((f, i) => {
      expect(cards[i].querySelector('h3').textContent).toBe(f.title);
      expect(cards[i].querySelector('p.ui-card-line').textContent).toBe(f.line);
      const points = [...cards[i].querySelectorAll('.home-feature-points li')];
      expect(points.map((li) => li.textContent)).toEqual(f.points);
      for (const li of points) expect(li.querySelector('svg')).not.toBeNull();
      expect(cards[i].querySelector('img')).toBeNull();
      expect(cards[i].querySelector('button.ui-pill').textContent).toMatch(/Try the demo/);
      expect(cards[i].querySelector(`a.ui-textlink[href="${f.href}"]`).textContent).toBe('See how it works');
    });
    expect(section.querySelector(`a.ui-textlink[href="${homeFeatures.more.href}"]`).textContent).toBe(homeFeatures.more.linkLabel);
    expect(section.querySelector('#tally')).toBeTruthy();
    expect(section.querySelector('#digital-collection')).toBeTruthy();
  });

  it('shows exactly one app screenshot on the page: the hero phone', () => {
    const shots = [...renderHome().querySelectorAll('img.ui-shot')];
    const whole = shots.filter((img) => !img.closest('.ui-hero-float'));
    expect(whole).toHaveLength(1);
    expect(whole[0].closest('.ui-hero-stage')).toBeTruthy();
  });

  it('quotes the lead testimonial beside the one scale figure', () => {
    const band = renderHome().querySelector('#testimonial');
    expect(band.querySelector('blockquote').textContent).toBe(testimonials[0].quote);
    expect(band.textContent).toContain('100+ businesses');
  });

  // The alternating rows left the home page on 2026-10-31 (feature pages
  // still use AltRow), so only the shared rule is pinned here: ui.css orders
  // a flipped row's media first, in the 7fr track.
  it('keeps the flipped alt-row rule for the pages that still use it', () => {
    const ui = readFileSync('src/ui/ui.css', 'utf8');
    expect(ui).toMatch(/\.ui-altrow--flip\s*>\s*:last-child\s*\{\s*order:\s*-1;?\s*\}/);
    expect(ui).toMatch(/\.ui-altrow\s*\{\s*grid-template-columns:\s*5fr 7fr;/);
    expect(ui).toMatch(/\.ui-altrow--flip\s*\{\s*grid-template-columns:\s*7fr 5fr;?\s*\}/);
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

  it('gives every video story its own card, in no more columns than stories', () => {
    const s = renderHome().querySelector('#customer-stories');
    expect(s.querySelectorAll('.ui-card')).toHaveLength(videoTestimonials.length);
    expect(s.querySelector('.ui-grid').classList.contains(`ui-grid--${Math.min(2, videoTestimonials.length)}`)).toBe(true);
  });

  // Separate inline children each got their own underline in a flex link.
  it('renders every 15-min demo link as one text run plus the arrow', () => {
    const links = [...renderHome().querySelectorAll('a.ui-textlink')].filter((a) => /15-min/.test(a.textContent));
    expect(links.length).toBeGreaterThanOrEqual(2);
    for (const a of links) {
      const texts = [...a.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim());
      expect(texts, a.textContent).toHaveLength(1);
      expect([...a.children].map((el) => el.getAttribute('aria-hidden'))).toEqual(['true']);
    }
  });

  it('orders the sections hero to close', () => {
    const order = ['product', 'features', 'testimonial', 'data-safety', 'customer-stories', 'pricing', 'faq', 'close'];
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

  // The group titles span the table; their ::after paints the highlighted
  // column's slice so the white bar runs unbroken. Grid line = label column
  // plus the highlighted plan's index.
  it('paints the highlight slice in the highlighted plan\'s column', () => {
    const home = readFileSync('src/ui/home.css', 'utf8');
    const col = pricing.plans.findIndex((p) => p.highlighted) + 2;
    expect(home).toMatch(new RegExp(`\\.rate-group-title::after\\s*\\{[^}]*grid-column:\\s*${col};`));
  });

  // One plan shows at a time under 900px and the picker chip names it, so the
  // navy column bar has nothing to pick out. Its edges, radius, white fill and
  // the group-title slice all go (Ronak, 2026-10-30: the bar's borders landed
  // mid-row on a phone).
  it('drops every highlight-column decoration under 900px', () => {
    const home = readFileSync('src/ui/home.css', 'utf8');
    const phone = home.split(/@media\s*\(max-width:\s*900px\)/)[1];
    expect(phone).toBeTruthy();
    expect(phone).not.toMatch(/data-active-plan='\d'\]\s*\.rate-group-title\s*\{/);
    expect(phone).toMatch(/\.ui-pricing-highlight[^{]*\{[^}]*border-left:\s*0;[^}]*border-right:\s*0;[^}]*border-radius:\s*0;/);
    // Only the head loses its top edge; a tick cell keeps the row hairline.
    expect(phone).toMatch(/\.rate-plan\.ui-pricing-highlight\s*\{\s*border-top:\s*0;\s*\}/);
    expect(phone).toMatch(/\.rate-row:last-child \.ui-pricing-highlight\s*\{\s*border-bottom:\s*0;/);
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

  it('paints --band only on the band, the footer and the pricing highlight', () => {
    // .rate-group-title paints the pricing highlight's slice across a group
    // title row (home.css), so it is the highlight, not a new use.
    const allowed = ['.ui-band--band', '.ui-footer', '.ui-pricing-highlight', '.rate-group-title'];
    const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
    const users = rules.filter(([, , body]) => /var\(--band\)/.test(body));
    expect(users.length).toBeGreaterThan(0);
    for (const [, head] of users) {
      expect(allowed.some((a) => head.includes(a)), head.trim()).toBe(true);
    }
  });
});
