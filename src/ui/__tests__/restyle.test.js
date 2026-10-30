import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const read = (f) => readFileSync(resolve(SRC, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
// Innermost rules, @media bodies included: [{ sel, body }].
const rules = (css) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, sel, body]) => ({ sel: sel.trim(), body }));
// Every body whose selector list contains `selector` exactly, joined.
const body = (css, selector) =>
  rules(css).filter((r) => r.sel.split(',').map((s) => s.trim()).includes(selector)).map((r) => r.body).join('\n');
const walk = (dir, re, out = []) => {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) { if (n !== '__tests__') walk(p, re, out); } else if (re.test(n) && !/\.test\./.test(n)) out.push(p);
  }
  return out;
};
const ui = read('ui/ui.css');

describe('button recipe (audit 8)', () => {
  const allCss = walk(SRC, /\.css$/).map((p) => [p, readFileSync(p, 'utf8')]);
  const allJs = walk(SRC, /\.jsx?$/).map((p) => [p, readFileSync(p, 'utf8')]);

  it('defines the 12px control radius and puts every Pill on it', () => {
    expect(body(ui, ':root')).toMatch(/--radius-control:\s*12px;/);
    expect(body(ui, '.ui-pill')).toMatch(/border-radius:\s*var\(--radius-control\)/);
  });
  it('fills the accent Pill marigold with ink text and outlines the ghost', () => {
    expect(body(ui, '.ui-pill--accent')).toMatch(/background:\s*var\(--accent\)/);
    expect(body(ui, '.ui-pill--accent')).toMatch(/color:\s*var\(--ink\)/);
    expect(body(ui, '.ui-pill--ghost')).toMatch(/background:\s*transparent/);
    expect(body(ui, '.ui-pill--ghost')).toMatch(/currentColor/);
  });
  it('centres a wrapped label and leaves nowrap to the minimal nav only', () => {
    expect(body(ui, '.ui-pill')).toMatch(/justify-content:\s*center/);
    expect(body(ui, '.ui-pill')).toMatch(/text-align:\s*center/);
    expect(body(ui, '.ui-pill')).not.toMatch(/white-space:\s*nowrap/);
  });
  it('shows a focus ring, marigold on the navy band', () => {
    expect(body(ui, '.ui-pill:focus-visible')).toMatch(/outline:\s*2px solid/);
    expect(body(ui, '.ui-band--band .ui-pill:focus-visible')).toMatch(/outline-color:\s*var\(--accent\)/);
  });
  it('rings the text link marigold on the navy band (Tally blue reads 2.95:1 there)', () => {
    expect(body(ui, '.ui-band--band .ui-textlink:focus-visible')).toMatch(/outline-color:\s*var\(--accent\)/);
  });
  it('leaves no arrow disc and no dark tone in any stylesheet or component', () => {
    for (const [p, t] of allCss) expect(t, p).not.toMatch(/ui-pill-arrow|ui-pill--dark/);
    for (const [p, t] of allJs) expect(t, p).not.toMatch(/tone="dark"|ui-pill-arrow/);
  });
  it('glues no lucide arrow to any link or button', () => {
    for (const [p, t] of allJs) expect(t, p).not.toMatch(/import\s*\{[^}]*\bArrow(Right|UpRight)\b[^}]*\}\s*from\s*'lucide-react'/);
  });
  it('puts the modal submit on the primary recipe, motion named and reduced', () => {
    const modal = read('ui/modal.css');
    const submit = body(modal, '.phone-btn-submit');
    expect(submit).toMatch(/background:\s*var\(--accent\)/);
    expect(submit).toMatch(/color:\s*var\(--ink\)/);
    expect(submit).toMatch(/border-radius:\s*var\(--radius-control\)/);
    const reduced = modal.split(/@media\s*\(prefers-reduced-motion:\s*reduce\)/).slice(1).join('');
    expect(reduced).toMatch(/\.phone-btn-submit[^{]*\{[^}]*transform:\s*none/);
  });
  it('names every transitioned property (no transition: all anywhere)', () => {
    for (const [p, t] of allCss) expect(t, p).not.toMatch(/transition:\s*all\b/);
  });
});

describe('one-colour headings (audit 9)', () => {
  it('leaves no ui-accent class and no accent prop anywhere in src', () => {
    for (const p of walk(SRC, /\.(css|jsx?)$/)) {
      expect(readFileSync(p, 'utf8'), p).not.toMatch(/ui-accent|\baccent=\{|\baccent="/);
    }
  });
});

describe('one left axis (audit 10)', () => {
  const home = read('ui/home.css');
  it('has no centred section-head variant', () => {
    expect(ui).not.toMatch(/\.ui-section-head--center/);
  });
  it.each([
    ['ui/feature.css', '.ui-feature .ui-answer'], ['ui/feature.css', '.ui-feature .ui-footnote'], ['ui/feature.css', '.ui-feature .ui-detail-more'],
    ['ui/feature.css', '.ui-feature .faq-list'], ['ui/feature.css', '.ui-feature .ui-related'],
    ['ui/home.css', '.ui-home .ui-label'], ['ui/home.css', '.ui-home .ui-after-grid'], ['ui/home.css', '.ui-home .trust-article-link'], ['ui/home.css', '.ui-home .faq-list'],
  ])('%s %s starts on the container edge', (file, sel) => {
    const b = body(read(file), sel);
    expect(b, sel).not.toBe('');
    expect(b, sel).not.toMatch(/margin[^;]*\bauto\b/);
    expect(b, sel).not.toMatch(/text-align:\s*center/);
  });
  it('underlines the trust article link', () => {
    expect(body(home, '.ui-home .trust-article-link a')).toMatch(/text-decoration:\s*underline/);
  });
  it('overrides the centred .trust-article-link in parts.css', () => {
    expect(body(read('ui/parts.css'), '.trust-article-link')).toMatch(/text-align:\s*center/);
    expect(body(home, '.ui-home .trust-article-link')).toMatch(/text-align:\s*left/);
  });
});

describe('surface step (audit 11, 14)', () => {
  const lum = (hex) => {
    const [r, g, b] = hex.replace('#', '').match(/\w\w/g).map((h) => {
      const c = parseInt(h, 16) / 255;
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const token = (name) => body(ui, ':root').match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
  it('steps ground and white far enough apart to read at a seam', () => {
    expect(lum('#FFFFFF') / lum(token('ground'))).toBeGreaterThanOrEqual(1.12);
  });
  it('gives a card the opposite surface of its band', () => {
    expect(token('card').toUpperCase()).toBe('#FFFFFF');
    expect(body(ui, '.ui-band--white')).toMatch(/--card:\s*var\(--ground\)/);
  });
  it('never stacks two same-tone bands at full padding', () => {
    for (const sel of ['.ui-band--ground + .ui-band--ground', '.ui-band--white + .ui-band--white'])
      expect(body(ui, sel), sel).toMatch(/padding-top:\s*0/);
  });
});

describe('grid counts (audit 3)', () => {
  it('widens the first card of a lead grid at the 3-column breakpoint', () => {
    const after = ui.slice(ui.indexOf('@media (min-width: 900px)'));
    expect(body(after, '.ui-grid--lead > :first-child')).toMatch(/grid-column:\s*span 2/);
  });
});

describe('type (audit 12, 13)', () => {
  it('sets the hero head fluid: 48px or less at 1280, 40px at 390, never past 64px', () => {
    const m = body(ui, '.ui-hero-title').match(/font-size:\s*clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)/);
    expect(m).not.toBeNull();
    const at = (vw) => Math.min(Number(m[3]), Math.max(Number(m[1]), (Number(m[2]) * vw) / 100));
    expect(at(1280)).toBeLessThanOrEqual(48);
    expect(at(390)).toBe(40);
    expect(Number(m[3])).toBeLessThanOrEqual(64);
    const phone = ui.split(/@media\s*\(max-width:\s*767px\)/).slice(1).join('');
    expect(phone).not.toMatch(/\.ui-hero-title\s*\{/);
  });
  it.each(['.ui-hero-title', '.ui-section-title', '.ui-close-title', '.ui-card-title'])('%s balances its lines', (sel) => {
    expect(body(ui, sel)).toMatch(/text-wrap:\s*balance/);
  });
  it('tracks body text at zero and sets figures tabular', () => {
    const b = body(read('styles.css'), 'body');
    expect(b).not.toMatch(/letter-spacing:\s*-/);
    expect(b).toMatch(/font-variant-numeric:\s*tabular-nums/);
  });
});

describe('placement polish (audit 5, 13, 15)', () => {
  it('top-aligns zig-zag copy with its picture', () => {
    expect(body(ui, '.ui-altrow')).toMatch(/align-items:\s*start/);
  });
  it('keeps the right hero chip inside the grid from 900px up', () => {
    const home = read('ui/home.css');
    const px = (sel) => body(home, sel).match(/width:\s*min\((\d+)px,\s*(\d+)vw\)/).slice(1).map(Number);
    const [sMax, sVw] = px('.ui-home .ui-hero-stage');
    const [fMax, fVw] = px('.ui-home .ui-hero-float');
    for (let vw = 900; vw <= 1600; vw += 10) {
      const stage = Math.min(sMax, (sVw * vw) / 100);
      const chip = Math.min(fMax, (fVw * vw) / 100);
      const column = (Math.min(vw, 1180) - 48 - 48) / 2;
      expect(stage - 40 + chip, `${vw}px`).toBeLessThanOrEqual(column);
    }
  });
  it('gives the footer one track per filled group', () => {
    expect(body(read('ui/footer.css'), '.ui-footer-top')).toMatch(/repeat\(var\(--footer-groups/);
  });
});
