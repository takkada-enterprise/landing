import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const read = (p) => readFileSync(resolve(repoRoot, p), 'utf-8');

const fontsCss = read('src/fonts.css');
const indexHtml = read('index.html');
const mainJsx = read('src/main.jsx');
const styles = read('src/styles.css');
const premium = read('src/premium.css');

// CLAUDE.md §7 records the failure this file exists to prevent: if the Fraunces
// face stops resolving, every heading on the site silently reverts to Plus
// Jakarta Sans. No error, no build failure, no visual test catches it unless
// someone happens to look. It nearly shipped once (2026-07-06).
const REQUIRED_FAMILIES = ['Fraunces', 'Plus Jakarta Sans'];

describe('self-hosted webfonts', () => {
  it('declares an @font-face for every family the site depends on', () => {
    for (const family of REQUIRED_FAMILIES) {
      expect(fontsCss).toContain(`font-family: '${family}'`);
    }
  });

  it('ships the woff2 file behind every src, at a plausible size', () => {
    const srcs = [...fontsCss.matchAll(/url\((\/assets\/fonts\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of new Set(srcs)) {
      const file = resolve(repoRoot, 'public', src.replace(/^\//, ''));
      expect(existsSync(file), `${src} is referenced but missing`).toBe(true);
      // A truncated or error-page download would be far smaller than this.
      expect(statSync(file).size).toBeGreaterThan(5_000);
    }
  });

  it('keeps every face on font-display: swap so text is never invisible', () => {
    const faces = fontsCss.match(/@font-face\s*\{[^}]*\}/g) || [];
    expect(faces.length).toBeGreaterThan(0);
    for (const face of faces) {
      expect(face).toMatch(/font-display:\s*swap/);
    }
  });

  it('carries a unicode-range on every face so latin-ext is not fetched needlessly', () => {
    for (const face of fontsCss.match(/@font-face\s*\{[^}]*\}/g) || []) {
      expect(face).toMatch(/unicode-range:/);
    }
  });
});

// Comments are allowed to mention Google — the files carry the history of why
// the fonts were vendored, and that context is worth more than a blunt string
// match. What must not survive is a real reference the browser would act on.
const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '');

describe('no Google Fonts dependency remains', () => {
  // The whole point of vendoring was to get these two hosts off the critical
  // path. A re-added <link> would quietly undo it and nothing else would fail.
  it('loads nothing from fonts.googleapis.com or fonts.gstatic.com', () => {
    for (const [name, content] of [
      ['index.html', indexHtml],
      ['src/fonts.css', fontsCss],
      ['src/styles.css', styles],
      ['src/premium.css', premium],
    ]) {
      expect(stripComments(content), `${name} still loads from Google Fonts`).not.toMatch(
        /(href|src|url\()\s*=?\s*["'(]?[^"')]*fonts\.(googleapis|gstatic)\.com/
      );
    }
  });

  it('keeps no preconnect to the Google font hosts', () => {
    const tags = stripComments(indexHtml).match(/<link[^>]*rel="preconnect"[^>]*>/g) || [];
    for (const tag of tags) {
      expect(tag).not.toMatch(/fonts\.(googleapis|gstatic)\.com/);
    }
  });
});

describe('font loading is wired into the page', () => {
  it('imports fonts.css before the stylesheets that use the families', () => {
    const fontsAt = mainJsx.indexOf("'./fonts.css'");
    const stylesAt = mainJsx.indexOf("'./styles.css'");
    expect(fontsAt).toBeGreaterThan(-1);
    expect(fontsAt).toBeLessThan(stylesAt);
  });

  it('preloads the latin file of each family, and nothing heavier', () => {
    const preloads = [...indexHtml.matchAll(/rel="preload"[^>]*href="([^"]+\.woff2)"/g)].map(
      (m) => m[1]
    );
    expect(preloads).toContain('/assets/fonts/fraunces-latin.woff2');
    expect(preloads).toContain('/assets/fonts/plus-jakarta-sans-latin.woff2');
    // latin-ext is NOT preloaded, deliberately, even though most pages do end
    // up fetching it: the rupee sign U+20B9 sits in its unicode-range
    // (U+20AD-20C0), and this site is full of ₹ amounts. Preloading it too
    // would put another 81KB on the critical path to render one glyph that
    // font-display: swap already handles gracefully. Adding it here is a
    // deliberate trade-off, not an oversight — measure before changing it.
    expect(preloads.filter((p) => p.includes('latin-ext'))).toHaveLength(0);
  });

  it('marks font preloads crossorigin, without which the browser fetches twice', () => {
    for (const tag of indexHtml.match(/<link[^>]*as="font"[^>]*>/g) || []) {
      expect(tag).toContain('crossorigin');
    }
  });
});

describe('the dead Inter font is gone', () => {
  it('ships no unreferenced Inter file', () => {
    expect(existsSync(resolve(repoRoot, 'public/assets/fonts/Inter-VariableFont_opsz_wght.ttf'))).toBe(
      false
    );
  });

  it('references no Inter family anywhere in the styles', () => {
    for (const content of [fontsCss, styles, premium, indexHtml]) {
      expect(content).not.toMatch(/['"]Inter['"]/);
    }
  });
});
