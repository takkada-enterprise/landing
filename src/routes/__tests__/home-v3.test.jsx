import { readdirSync, readFileSync } from 'node:fs';
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
import { navLinks, footerColumns, demoEntryLive } from '../../data/siteContent';
import { HERO_HOME, HOTSPOTS, JOBS, jobHref } from '../../data/heroHotspots';
import { STOPS } from '../../data/journey';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

// DemoTryCTA calls usePhoneModal(), which throws by design outside a
// provider -- and it throws BEFORE the `if (!demoEntryLive)` early return,
// so this render goes red at either flag value without the wrapper.
// The v7 flags are opted into here so the router stops printing its two future
// warnings on every render: a test file's output has to be readable.
const ROUTER_FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };

function renderHome() {
  return render(
    <MemoryRouter future={ROUTER_FUTURE}>
      <PhoneModalProvider>
        <Home />
      </PhoneModalProvider>
    </MemoryRouter>
  );
}

describe('Home v3 structure (AE1)', () => {
  it('tells the page story through headings alone: the phone, then the invoice', () => {
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

describe('the hero links directly to feature pages', () => {
  it('renders exactly one h1 with the resting headline', () => {
    const { container } = renderHome();
    const headings = container.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0].textContent).toBe(HERO_HOME.headline);
  });

  it('renders every job as a link to its feature page', () => {
    const { container } = renderHome();
    const nav = container.querySelector('nav[aria-label="Go to a feature"]');
    expect(nav).toBeTruthy();
    const links = [...nav.querySelectorAll('a.hv3-job')];
    expect(links).toHaveLength(JOBS.length);
    for (const [index, job] of JOBS.entries()) {
      expect(links[index].getAttribute('href')).toBe(jobHref(job));
      expect(links[index].textContent).toContain(job.label);
    }
  });

  it('keeps the overline out of the pale premium chip style', () => {
    const { container } = renderHome();
    const overline = container.querySelector('.hv3-hero-overline');
    expect(overline).toBeTruthy();
    expect(overline.classList.contains('hero-overline')).toBe(false);
  });

  it('uses a white hero CTA and contains no retired swap selectors', () => {
    const css = readFileSync('src/home.css', 'utf8');
    const cta = cssBlock(css, '.home-v3 .hv3-hero .cta-btn--primary {');
    expect(cta).toMatch(/background:\s*#fff\b/i);
    const heads = cssHeads(css);
    expect(heads.some((head) => head.includes('hv3-hero-sizer'))).toBe(false);
    expect(heads.some((head) => head.includes('is-swapped'))).toBe(false);
  });

  it('gives the hero CTA a scoped 160ms transition without animating its shadow', () => {
    const css = readFileSync('src/home.css', 'utf8');
    const cta = cssBlock(css, '.home-v3 .hv3-hero .cta-btn--primary {');
    const transition = cta.match(/transition:\s*([^;]+);/)?.[1] ?? '';
    for (const property of ['transform', 'background-color', 'border-color']) {
      expect(transition, `${property} is absent or not 160ms`).toMatch(
        new RegExp(`${property}\\s+160ms`)
      );
    }
    expect(transition, 'color is absent or not 160ms').toMatch(/(?:^|,\s*)color\s+160ms/);
    expect(transition).not.toMatch(/box-shadow/);

    const reduced = cssBlock(css, '@media (prefers-reduced-motion: reduce)');
    const reducedCta = cssBlock(reduced, '.home-v3 .hv3-hero .cta-btn--primary {');
    const reducedTransition = reducedCta.match(/transition:\s*([^;]+);/)?.[1] ?? '';
    expect(reducedTransition).not.toMatch(/transform|box-shadow/);
    for (const property of ['background-color', 'border-color']) {
      expect(reducedTransition, `${property} is absent or not 160ms under reduced motion`).toMatch(
        new RegExp(`${property}\\s+160ms`)
      );
    }
    expect(reducedTransition, 'color is absent or not 160ms under reduced motion').toMatch(
      /(?:^|,\s*)color\s+160ms/
    );
    expect(cssBlock(css, '.home-v3 .hv3-hero-cta .cta-btn:active {')).toMatch(
      /transform:\s*scale\(0\.97\)/
    );
  });

  it('keeps every visitor-readable hero navigation label at white alpha 0.72 or higher', () => {
    const css = readFileSync('src/home.css', 'utf8');
    const selectors = [
      '.home-v3 .hv3-hero-promise',
      '.home-v3 .hv3-hero-jobs-label',
      '.home-v3 .hv3-job small',
    ];
    for (const selector of selectors) {
      const block = cssBlock(css, `${selector} {`);
      const alpha = Number(block.match(/color:\s*rgba\(255,\s*255,\s*255,\s*([\d.]+)\)/)?.[1]);
      expect(alpha, `${selector} is below the readable-on-navy floor`).toBeGreaterThanOrEqual(0.72);
    }
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

// Selector heads, whole groups. A group written over several lines is joined
// first: reading only the line that carries the "{" would let an unscoped
// selector ride above a scoped one and never be checked. At-rules and keyframe
// stops are skipped by shape, so nested @media/@starting-style/@keyframes need
// no un-nesting.
const cssHeads = (css) => {
  const heads = [];
  let buffer = '';
  for (const raw of css.replace(/\/\*[\s\S]*?\*\//g, '').split('\n')) {
    const line = raw.trim();
    if (line.endsWith('{')) {
      const head = `${buffer} ${line.slice(0, -1)}`.trim();
      buffer = '';
      if (head.startsWith('@')) continue;
      if (/^(from|to|\d+%)(\s*,\s*(from|to|\d+%))*$/.test(head)) continue;
      heads.push(head);
    } else if (line.endsWith(',')) {
      // A continuation line of a multi-line selector group.
      buffer = `${buffer} ${line}`.trim();
    } else {
      buffer = '';
    }
  }
  return heads;
};

// The balanced body of the block whose head is `header`, so a nested rule can
// be asserted inside one media query rather than anywhere in the file.
const cssBlock = (css, header) => {
  const start = css.indexOf(header);
  if (start < 0) return '';
  let depth = 0;
  for (let i = css.indexOf('{', start); i < css.length; i += 1) {
    if (css[i] === '{') depth += 1;
    if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) return css.slice(start, i);
    }
  }
  return '';
};

describe('the homepage stylesheets stay scoped to the homepage', () => {
  const headsOf = cssHeads;

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

// The nav renders in Layout.jsx, outside the page's own root, so the on-navy
// colours are selected through :has(). That selector is specific enough (0-4-2)
// to beat the panel's own rules, so it must never reach INSIDE the white
// features panel or the white mobile overlay: white on white is an invisible
// menu.
const INSIDE_THE_PANELS = [
  '.nav-features-panel',
  '.nav-features-list',
  '.nav-features-all',
  '.mobile-overlay',
  '.mobile-nav-links',
];

// The pages that go navy at their first pixel AND meet the bar in its
// transparent state: .home-v3 is the homepage, .feature-hero the 26 feature
// pages, .features-hub-hero the /features hub. The bar is fixed and
// transparent until the page scrolls, so each of these needs the on-navy
// colours or the header is dark ink on dark navy on arrival.
//
// What this list is NOT: it is not derived from the stylesheet, so it cannot
// notice a navy page on its own. It is hand-kept, and every check below is
// only as wide as it is. The blog's two navy surfaces (.blog-index-hero,
// .blog-post-header) are deliberately absent for a different reason: Layout
// sets forceLightNav on /blog, which puts the `scrolled` class on the bar at
// scroll 0, so the transparent state never happens there and there is nothing
// for a :has() rule to fix. That protection is pinned in Layout.test.jsx
// ("the nav over the navy blog heroes"), not here — if it is ever removed, the
// blog needs adding to this list and to the :has() block in styles.css.
const NAVY_AT_THE_TOP = ['.home-v3', '.feature-hero', '.features-hub-hero'];

describe('the nav over the navy hero', () => {
  const heads = cssHeads(readFileSync('src/styles.css', 'utf8'));
  const onNavy = heads
    .flatMap((head) => head.split(','))
    .map((sel) => sel.trim())
    .filter((sel) => NAVY_AT_THE_TOP.some((root) => sel.includes(`:has(${root})`)));

  it('has rules at all, so the checks below cannot pass vacuously', () => {
    expect(onNavy.length).toBeGreaterThan(0);
  });

  // The homepage got these rules when it went navy and the other two did not,
  // which left the wordmark at 2.9:1 and the nav links at 2.7:1 over #0F1F3D on
  // 27 pages. This keeps the three that are listed covered and equal; a FOURTH
  // navy page is not caught here, because nothing derives this list from the
  // stylesheets — adding the page to NAVY_AT_THE_TOP is a hand step, and the
  // comment above says where the blog's own protection lives instead.
  it('covers every page listed as navy at its first pixel', () => {
    for (const root of NAVY_AT_THE_TOP) {
      expect(
        onNavy.some((sel) => sel.includes(`:has(${root})`)),
        `no nav-on-navy rule for ${root}: the header is dark ink on navy there`
      ).toBe(true);
    }
  });

  // Each root must carry the whole set, not just the easy one. A page that gets
  // the links but not the hamburger is still broken on a phone.
  it('gives every navy page the same set of nav items', () => {
    const itemsFor = (root) =>
      onNavy
        .filter((sel) => sel.includes(`:has(${root})`))
        .map((sel) => sel.replace(`:has(${root})`, ':has(ROOT)'))
        .sort();
    const [first, ...rest] = NAVY_AT_THE_TOP;
    for (const root of rest) {
      expect(itemsFor(root), `${root} is missing nav items ${first} has`).toEqual(
        itemsFor(first)
      );
    }
  });

  it('never reaches into the features panel or the mobile overlay', () => {
    for (const sel of onNavy) {
      for (const inside of INSIDE_THE_PANELS) {
        expect(sel.includes(inside), `${sel} reaches into ${inside}`).toBe(false);
      }
    }
  });

  it('colours only top-level links, reached by a child combinator', () => {
    for (const sel of onNavy) {
      const parts = sel.split(/\s+/);
      const last = parts[parts.length - 1];
      if (!/^a([:.[]|$)/.test(last)) continue;
      expect(
        parts[parts.length - 2],
        `${sel} colours every descendant <a>, panel rows included`
      ).toBe('>');
    }
  });

  // The wordmark is an <img> of dark ink on transparency, so no colour rule can
  // reach it. Over navy it takes the footer logo's treatment and goes to a flat
  // white silhouette (owner's call, 2026-09-18), and it must come back to the
  // colour mark the moment the bar is paper again.
  it('turns the wordmark into a white silhouette on every navy page', () => {
    const logo = onNavy.filter((sel) => sel.includes('.nav-logo-img'));
    for (const root of NAVY_AT_THE_TOP) {
      expect(
        logo.some((sel) => sel.includes(`:has(${root})`)),
        `no on-navy logo rule for ${root}: the wordmark is dark ink on navy there`
      ).toBe(true);
    }
  });

  it('gives the wordmark back once scrolled, and over the open menu', () => {
    const logo = onNavy.filter((sel) => sel.includes('.nav-logo-img'));
    expect(logo.length).toBeGreaterThan(0);
    for (const sel of logo) {
      expect(sel, `${sel} whitens the logo on the scrolled paper bar`).toContain(
        ':not(.scrolled)'
      );
      expect(sel, `${sel} whitens the logo on the white mobile overlay`).toContain(
        ':not(.menu-open)'
      );
    }
  });

  it('leaves the hamburger alone once the menu is open over a white overlay', () => {
    const hamburger = onNavy.filter((sel) => sel.includes('.mobile-menu-btn'));
    expect(hamburger.length).toBeGreaterThan(0);
    for (const sel of hamburger) {
      expect(sel, `${sel} keeps the close button white on the white overlay`).toContain(
        ':not(.menu-open)'
      );
    }
  });
});

// The stations of the invoice story sit at 0.28 alpha until the scroll observer
// says one is being read. A ring painted on a 0.28 station is a 0.28 ring, so a
// keyboard visitor tabbing the ~20 pills and the two sheet buttons loses the
// only thing telling them where they are.
describe('the invoice story stays visible to a keyboard (journey.css)', () => {
  const css = readFileSync('src/journey.css', 'utf8');

  it('lifts a station out of the dim while anything inside it holds focus', () => {
    const dim = css.indexOf('.home-v3 .foi-station {');
    expect(dim, 'the station dimming rule has moved; this guard is now blind').toBeGreaterThan(-1);

    const lifted = css.indexOf('.home-v3 .foi-station:focus-within {');
    expect(
      lifted,
      'nothing lifts a station when a pill or a sheet inside it takes focus'
    ).toBeGreaterThan(-1);
    // Same specificity as .is-on and as the base rule, so source order is the
    // whole argument: declared earlier, the 0.28 simply wins again.
    expect(
      lifted,
      ':focus-within is declared before the dim, so the dim overrides it'
    ).toBeGreaterThan(dim);
    expect(cssBlock(css, '.home-v3 .foi-station:focus-within {')).toMatch(/opacity:\s*1\b/);
  });
});

// The ruling, one place: under prefers-reduced-motion a pressable DROPS its
// transform transition and KEEPS its scale(0.97) press state, so the press
// snaps. `transform: none` there is the other thing, and it reads as a dead
// control — three call sites had drifted to it.
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');

const reducedMotionBlocks = (css) => {
  const HEAD = '@media (prefers-reduced-motion: reduce)';
  const blocks = [];
  for (let at = css.indexOf(HEAD); at >= 0; at = css.indexOf(HEAD, at + 1)) {
    blocks.push(cssBlock(css.slice(at), HEAD));
  }
  return blocks;
};

const activeRulesIn = (block) =>
  [...stripComments(block).matchAll(/([^{}]*)\{([^{}]*)\}/g)]
    .map(([, head, body]) => [head.trim(), body])
    .filter(([head]) => head.includes(':active'));

describe('reduced motion drops the press transition, never the press (journey.css)', () => {
  const css = readFileSync('src/journey.css', 'utf8');
  const blocks = reducedMotionBlocks(css);
  const rules = blocks.flatMap(activeRulesIn);

  it('has press rules inside its reduced-motion blocks at all', () => {
    expect(blocks.length).toBeGreaterThan(0);
    // The hero hotspots + the back pill, the sheets, the journey strip.
    expect(rules.length, 'no :active rule found; the checks below are vacuous').toBeGreaterThanOrEqual(3);
  });

  it('keeps 0.97 on every one of them and cancels none', () => {
    for (const [head, body] of rules) {
      expect(body, `${head} cancels the press under reduced motion`).not.toMatch(
        /transform:\s*none/
      );
      expect(body, `${head} leaves no press state under reduced motion`).toMatch(/scale\(0\.97\)/);
    }
  });
});

describe('reduced motion drops the press transition, never the press (home.css)', () => {
  const css = readFileSync('src/home.css', 'utf8');
  const block = cssBlock(css, '@media (prefers-reduced-motion: reduce)');
  // The two pressables in the hero: the CTA button and each job row.
  const PRESSABLES = [
    '.home-v3 .hv3-hero .cta-btn--primary',
    '.home-v3 .hv3-job',
  ];
  const bodyOf = (text, head) => {
    const at = text.indexOf(`${head} {`);
    if (at < 0) return null;
    return text.slice(at).match(/\{([^{}]*)\}/)?.[1] ?? null;
  };

  it('restates each hero pressable without its transform transition', () => {
    expect(block, 'home.css has no reduced-motion block').not.toBe('');
    for (const sel of PRESSABLES) {
      const body = bodyOf(stripComments(block), sel);
      expect(body, `${sel} is never restated, so it still eases its press`).toBeTruthy();
      expect(body, `${sel} still transitions transform under reduced motion`).not.toMatch(
        /\btransform\b/
      );
    }
  });

  it('leaves the 0.97 press state standing, and takes it from none of them', () => {
    expect(
      cssBlock(css, '.home-v3 .hv3-hero-cta .cta-btn:active {'),
      'the hero CTA has lost its press state'
    ).toMatch(/scale\(0\.97\)/);
    expect(cssBlock(css, '.home-v3 .hv3-job:active {'), 'the job link has lost its press state').toMatch(
      /scale\(0\.97\)/
    );
    for (const [head, body] of activeRulesIn(block)) {
      expect(body, `${head} cancels the press under reduced motion`).not.toMatch(
        /transform:\s*none/
      );
    }
  });
});

// D7: over the navy story bands the translucent scrolled bar turned washed
// grey and its links dropped below contrast. The bar has to be opaque enough
// that what is behind it stops mattering.
//
// Every stylesheet, not just the first one found: `.site-nav.scrolled` is
// declared twice at the same specificity (styles.css and premium.css), and
// premium.css loads last, so raising only one of them changes nothing on
// screen while a single-file test goes green.
describe('the scrolled nav is opaque over navy (D7)', () => {
  const SHEETS = readdirSync('src').filter((f) => f.endsWith('.css'));

  const scrolledBackgrounds = (css) => {
    const out = [];
    const clean = stripComments(css);
    for (let at = clean.indexOf('.site-nav.scrolled {'); at >= 0; at = clean.indexOf('.site-nav.scrolled {', at + 1)) {
      const body = clean.slice(at).match(/\{([^{}]*)\}/)?.[1] ?? '';
      const background = body.match(/background:\s*([^;]+);/)?.[1]?.trim();
      if (background) out.push(background);
    }
    return out;
  };

  const found = SHEETS.flatMap((f) => scrolledBackgrounds(readFileSync(`src/${f}`, 'utf8')).map((b) => [f, b]));

  it('finds the rule at all', () => {
    expect(found.length, 'no stylesheet paints .site-nav.scrolled').toBeGreaterThan(0);
  });

  it.each(found)('paints %s at alpha >= 0.94, or solid (%s)', (file, background) => {
    const alpha = background.match(/rgba\([^)]*,\s*([\d.]+)\s*\)/)?.[1];
    // A hex or a token is solid by construction; only rgba() can be see-through.
    if (alpha !== undefined) {
      expect(Number(alpha), `${file} paints the scrolled bar at ${alpha}, navy reads through`).toBeGreaterThanOrEqual(0.94);
    }
  });
});
