import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const src = resolve(__dirname, '..');
const SAGE = /#(344E41|1B3026|4A7C59|6B9E7A|B8D4BE|E7F0E8|DAE5D6|14241C|E8F0E8|DEEBDD|E4EFE4|DCE9E0|EDF2EA)\b/i;

function cssFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) cssFiles(p, out);
    else if (/\.(css|jsx?)$/.test(name) && !name.endsWith('brand-guard.test.js')) out.push(p);
  }
  return out;
}

describe('Marine brand', () => {
  it('leaves no sage hex anywhere in src', () => {
    const hits = cssFiles(src).filter((f) => SAGE.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  // The revamp retires the display serif: Plus Jakarta Sans carries every
  // heading (800 hero, 700 section) and IBM Plex Mono is the one utility face.
  // The walk covers .js/.jsx too, so a stale comment naming the old family is
  // caught as well — that is deliberate, it is how the last re-point survived.
  it('ships no Fraunces anywhere', () => {
    const hits = cssFiles(src).filter((f) => /Fraunces/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('defines the Marine tokens on :root', () => {
    const css = readFileSync(join(src, 'styles.css'), 'utf8');
    for (const [name, hex] of [
      ['--color-primary', '#006EA6'], ['--color-navy', '#1E3A6B'], ['--color-ink', '#0F1F3D'],
      ['--color-wash', '#DCF2FB'], ['--color-highlight', '#FCAF1B'], ['--color-bg', '#F7FAFC'],
      ['--color-text', '#0E1C2A'],
    ]) {
      expect(css).toMatch(new RegExp(`${name}:\\s*${hex}`, 'i'));
    }
  });

  // theme-color is declared twice — the static shell and the per-route <Head>
  // in Seo.jsx, which wins on every rendered page. Changing only index.html
  // leaves the browser chrome on the old colour everywhere that matters.
  it('paints the browser chrome navy wherever theme-color is declared', () => {
    const files = [resolve(src, '..', 'index.html'), ...cssFiles(src)];
    const declared = files.flatMap((f) =>
      [...readFileSync(f, 'utf8').matchAll(/name=["']theme-color["']\s+content=["']([^"']+)["']/gi)].map(
        (m) => `${f} -> ${m[1].toUpperCase()}`
      )
    );
    expect(declared.length).toBeGreaterThan(1);
    expect(declared.filter((d) => !d.endsWith('#0F1F3D'))).toEqual([]);
  });

  // The swap kept the token NAMES but moved their luminance: --color-accent
  // went from mid-sage to pale blue (white on it is 1.73:1) and
  // --color-primary-light from mid-sage to #149EC2 (3.13:1 with white). These
  // two call sites paint white text on exactly those, so they cannot go back.
  it('keeps white labels off the pale end of the Marine ramp', () => {
    const styles = readFileSync(join(src, 'styles.css'), 'utf8');
    const tag = styles.match(/\.feature-new-tag\s*\{[^}]*\}/)[0];
    expect(tag).toMatch(/color:\s*#fff/i);
    expect(tag, '.feature-new-tag is white text on a pale chip').not.toMatch(
      /background:\s*var\(--color-accent\)/
    );

    const premium = readFileSync(join(src, 'premium.css'), 'utf8');
    for (const ramp of ['--grad-primary', '--grad-text']) {
      const decl = premium.match(new RegExp(`${ramp}:[^;]*;`))[0];
      expect(decl, `${ramp} carries white or gradient-filled text`).not.toMatch(
        /--color-primary-light|#149EC2/i
      );
    }
  });
});
