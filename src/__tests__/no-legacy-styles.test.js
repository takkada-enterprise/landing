import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// The old visual system is gone (plan 2026-10-30-003, Task 11). Every page is
// built from the nine src/ui primitives, and the stylesheets below were loaded
// globally from main.jsx, so one stray import would put a whole retired skin
// back on every route.

const src = resolve(__dirname, '..');
const read = (p) => readFileSync(p, 'utf8');

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.jsx?$/.test(name)) out.push(p);
  }
  return out;
}

const files = walk(src);
const RETIRED_CSS = ['home.css', 'journey.css', 'premium.css', 'feature-page.css', 'guide.css', 'AutoReconciliation.css'];
const DELETED_MODULES = ['heroHotspots', 'journey', 'CountUp', 'TestimonialCard', 'CTAButton', 'BackHome'];

const importsOf = (code) =>
  [...code.matchAll(/(?:import|from)\s*\(?\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);

describe('no legacy styles', () => {
  it('imports none of the retired stylesheets', () => {
    const hits = files.flatMap((f) =>
      importsOf(read(f))
        // src/ui/home.css is the new home skin and shares the old file's name.
        .filter((spec) => RETIRED_CSS.includes(spec.split('/').pop()) && !spec.includes('ui/'))
        .map((spec) => `${f} -> ${spec}`)
    );
    expect(hits).toEqual([]);
  });

  it('imports none of the deleted modules', () => {
    const hits = files.flatMap((f) =>
      importsOf(read(f))
        .filter((spec) => DELETED_MODULES.some((name) => new RegExp(`/${name}(\\.jsx?)?$`).test(spec)))
        .map((spec) => `${f} -> ${spec}`)
    );
    expect(hits).toEqual([]);
  });

  it('loads exactly fonts.css, ui/ui.css and styles.css from main.jsx', () => {
    const css = importsOf(read(join(src, 'main.jsx'))).filter((s) => s.endsWith('.css'));
    expect(css).toEqual(['./fonts.css', './ui/ui.css', './styles.css']);
  });

  it('keeps styles.css under 400 lines', () => {
    expect(read(join(src, 'styles.css')).split('\n').length).toBeLessThan(400);
  });

  // Each class token is checked on its own, so the new ui-hero-* names pass and
  // a bare hero-title or hv3-stories-card does not.
  it('renders no class from the old system', () => {
    const OLD = /^(hv3|hero|section-label|tally-card|tally-grid|frag|journey|station)(-|$)/;
    const hits = [];
    for (const f of files.filter((p) => !/__tests__|\.test\./.test(p))) {
      for (const m of read(f).matchAll(/className=(?:"([^"]*)"|\{([^}]*)\})/g)) {
        const strings = m[1] !== undefined ? [m[1]] : [...m[2].matchAll(/(['"`])((?:(?!\1).)*)\1/g)].map((s) => s[2]);
        for (const token of strings.join(' ').split(/\s+/)) {
          if (OLD.test(token)) hits.push(`${f}: ${token}`);
        }
      }
    }
    expect(hits).toEqual([]);
  });
});
