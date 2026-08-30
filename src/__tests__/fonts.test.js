import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
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

  it('ships a real woff2 file behind every src', () => {
    const srcs = [...fontsCss.matchAll(/url\((\/assets\/fonts\/[^)]+\.woff2)\)/g)].map((m) => m[1]);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of new Set(srcs)) {
      const file = resolve(repoRoot, 'public', src.replace(/^\//, ''));
      expect(existsSync(file), `${src} is referenced but missing`).toBe(true);
      // Check the wOF2 signature rather than guessing a byte floor: the
      // latin-ext files are legitimately ~1KB after subsetting, so a size
      // threshold either has to be uselessly low or it rejects valid fonts.
      // An HTML error page or a truncated download fails this immediately.
      expect(readFileSync(file).subarray(0, 4).toString('latin1'), `${src} is not a woff2`).toBe(
        'wOF2'
      );
      expect(statSync(file).size).toBeGreaterThan(500);
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

// Comments are allowed to mention Google — these files carry the history of why
// the fonts were vendored, and that context is worth more than a blunt string
// match would be. So rather than stripping comments out (which reads as a
// sanitizer and is easy to get wrong), assert on the things a browser actually
// acts on: link/script tags, and CSS url()/@import targets.
const GOOGLE_FONT_HOST = /fonts\.(googleapis|gstatic)\.com/;

// Case-insensitive throughout: HTML tag names and attributes are not
// case-sensitive, so <LINK HREF=...> is just as load-bearing as <link href=...>.
const linkAndScriptTags = (html) => html.match(/<(?:link|script)\b[^>]*>/gi) || [];
const cssResourceRefs = (css) => [
  ...(css.match(/url\([^)]*\)/gi) || []),
  ...(css.match(/@import[^;]*;/gi) || []),
];

describe('no Google Fonts dependency remains', () => {
  // The whole point of vendoring was to get these two hosts off the critical
  // path. A re-added <link> would quietly undo it and nothing else would fail.
  it('has no markup tag pointing at the Google font hosts', () => {
    for (const tag of linkAndScriptTags(indexHtml)) {
      expect(tag, 'index.html still loads from Google Fonts').not.toMatch(GOOGLE_FONT_HOST);
    }
  });

  it('has no stylesheet fetching from the Google font hosts', () => {
    for (const [name, css] of [
      ['src/fonts.css', fontsCss],
      ['src/styles.css', styles],
      ['src/premium.css', premium],
    ]) {
      for (const ref of cssResourceRefs(css)) {
        expect(ref, `${name} still loads from Google Fonts`).not.toMatch(GOOGLE_FONT_HOST);
      }
    }
  });

  it('keeps no preconnect to the Google font hosts', () => {
    for (const tag of linkAndScriptTags(indexHtml)) {
      if (/rel=["']?preconnect/i.test(tag)) expect(tag).not.toMatch(GOOGLE_FONT_HOST);
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

  // Preloading these was tried, measured, and reverted: it put 93KB of
  // High-priority font requests in front of the hero image, which is the LCP
  // element, and live mobile LCP regressed from 2.6-2.9s to 3.1-4.2s. The
  // fonts now arrive off our own origin rather than Google's, so they compete
  // for the same connection as the image instead of a separate one.
  it('does not preload any font, which would compete with the LCP image', () => {
    const preloads = [...indexHtml.matchAll(/rel=["']preload["'][^>]*href=["']([^"']+)["']/gi)].map(
      (m) => m[1]
    );
    expect(preloads.filter((p) => p.endsWith('.woff2'))).toHaveLength(0);
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

describe('the narrowed latin-ext subset still covers the content', () => {
  // The latin-ext files were re-subset from 81KB down to 2.5KB because the site
  // uses exactly one character from that range: ₹ (U+20B9), 1,710 times.
  // Shipping 81KB to draw one glyph cost the homepage its LCP.
  //
  // The trap that creates: if someone writes a second latin-ext character —
  // an accented name, a † , a € — it silently renders in a system font.
  // No error, no build failure. This test is the only thing that would notice.
  const LATIN_EXT_RANGES = [
    [0x0100, 0x02ba], [0x02bd, 0x02c5], [0x02c7, 0x02cc], [0x02ce, 0x02d7],
    [0x02dd, 0x02ff], [0x0304, 0x0304], [0x0308, 0x0308], [0x0329, 0x0329],
    [0x1d00, 0x1dbf], [0x1e00, 0x1e9f], [0x1ef2, 0x1eff], [0x2020, 0x2020],
    [0x20a0, 0x20ab], [0x20ad, 0x20c0], [0x2113, 0x2113], [0x2c60, 0x2c7f],
    [0xa720, 0xa7ff],
  ];
  const RUPEE = 0x20b9;
  const inLatinExt = (cp) => LATIN_EXT_RANGES.some(([a, b]) => cp >= a && cp <= b);

  it('narrows the unicode-range to exactly the glyph the file contains', () => {
    const extFaces = (fontsCss.match(/@font-face\s*\{[^}]*latin-ext[^}]*\}/g) || []);
    expect(extFaces.length).toBeGreaterThan(0);
    for (const face of extFaces) {
      expect(face).toMatch(/unicode-range:\s*U\+20B9\s*;/i);
    }
  });

  it('finds no content character that the subset would fail to render', () => {
    const roots = ['src', 'content/blog', 'index.html'];
    const offenders = new Map();

    const walk = (rel) => {
      const abs = resolve(repoRoot, rel);
      if (!existsSync(abs)) return;
      if (statSync(abs).isDirectory()) {
        for (const entry of readdirSync(abs)) walk(`${rel}/${entry}`);
        return;
      }
      if (!/\.(jsx?|md|html|css)$/.test(rel)) return;
      if (rel.includes('__tests__') || rel.endsWith('.test.js') || rel.includes('wuxia')) return;
      for (const ch of readFileSync(abs, 'utf-8')) {
        const cp = ch.codePointAt(0);
        if (cp !== RUPEE && inLatinExt(cp)) {
          const key = `U+${cp.toString(16).toUpperCase().padStart(4, '0')} ${JSON.stringify(ch)}`;
          if (!offenders.has(key)) offenders.set(key, rel);
        }
      }
    };
    roots.forEach(walk);

    expect(
      [...offenders].map(([ch, file]) => `${ch} in ${file}`),
      'these characters need latin-ext glyphs the subset no longer carries — ' +
        'either remove them or widen SUBSET_TO_CODEPOINTS in scripts/vendorFonts.mjs and re-vendor'
    ).toEqual([]);
  });
});
