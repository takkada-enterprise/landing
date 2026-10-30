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
