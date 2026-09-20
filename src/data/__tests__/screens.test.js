// The screen registry is the one place the hero, the journey, the features hub
// and the feature pages look up an app screenshot. If it drifts from what
// scripts/exportScreens.mjs actually wrote, the site renders broken images or
// shifts layout on load, and nothing else catches it — these pages read the
// registry, not the filesystem.
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCREENS, screen } from '../screens';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/screens.manifest.json'), 'utf8'));
const provenance = JSON.parse(readFileSync(resolve(root, 'content/image-provenance.json'), 'utf8'));

/**
 * The real pixel size of an exported file, read out of the WebP header rather
 * than trusted from the registry.
 *
 * VP8L (lossless) and VP8 (lossy) carry their dimensions in different places;
 * these exports are all lossy VP8, whose 10-byte frame header ends with 14-bit
 * width and height.
 */
function intrinsicSize(url) {
  const bytes = readFileSync(resolve(root, 'public', url.replace(/^\//, '')));
  const vp8 = bytes.indexOf('VP8 ', 12, 'ascii');
  expect(vp8, `${url} is not a lossy VP8 WebP`).toBeGreaterThan(0);
  const frame = vp8 + 8;
  return {
    width: bytes.readUInt16LE(frame + 6) & 0x3fff,
    height: bytes.readUInt16LE(frame + 8) & 0x3fff,
  };
}

describe('screen registry', () => {
  it('has one entry per manifest row and nothing else', () => {
    expect(Object.keys(SCREENS).sort()).toEqual(manifest.map((m) => m.slug).sort());
  });

  it('points every src and srcSet candidate at a file on disk', () => {
    for (const s of Object.values(SCREENS)) {
      for (const url of [s.src, ...s.srcSet.split(',').map((c) => c.trim().split(' ')[0])]) {
        expect(existsSync(resolve(root, 'public', url.replace(/^\//, ''))), url).toBe(true);
      }
    }
  });

  it('gives every screen alt text and intrinsic size', () => {
    for (const s of Object.values(SCREENS)) {
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.width).toBeGreaterThan(0);
      expect(s.height).toBeGreaterThan(0);
    }
  });

  it('carries the alt text the manifest recorded against the checked image', () => {
    for (const row of manifest) {
      expect(SCREENS[row.slug].alt, row.slug).toBe(row.alt);
    }
  });

  // A wrong intrinsic size is invisible in a screenshot test and very visible on
  // a phone: the browser reserves the wrong box and the page jumps once the
  // image lands. The numbers below are read back off the exported files.
  it('declares the intrinsic size the exported file really has', () => {
    for (const s of Object.values(SCREENS)) {
      expect(intrinsicSize(s.src), s.slug).toEqual({ width: s.width, height: s.height });
    }
  });

  it('throws on an unknown slug instead of rendering a broken image', () => {
    expect(() => screen('nope')).toThrow(/Unknown screen/);
  });

  // The 2x candidate is the file that actually downloads on a phone, and it is
  // the one a re-export is most likely to get wrong (a stale file, a source at a
  // different aspect ratio). Pin it to exactly double the declared width and,
  // allowing for the encoder's rounding, double the declared height.
  it('serves a 2x srcSet candidate that is really twice the declared size', () => {
    for (const s of Object.values(SCREENS)) {
      const candidates = s.srcSet.split(',').map((c) => c.trim().split(' ')[0]);
      const retina = candidates[candidates.length - 1];
      const { width, height } = intrinsicSize(retina);
      expect(width, `${s.slug} 2x width`).toBe(s.width * 2);
      expect(Math.abs(height - s.height * 2), `${s.slug} 2x height (${height})`).toBeLessThanOrEqual(1);
    }
  });

  // The provenance record is what says these bytes came from demo company 143
  // and what a human saw in them. If it drifts from the manifest row it was
  // written against, the review no longer describes the picture it licenses.
  it('backs every exported file with a provenance record quoting its manifest row', () => {
    const byPath = new Map(
      Object.values(provenance.images).map((record) => [record.path, record])
    );
    for (const row of manifest) {
      for (const w of row.sheet ? [720, 1440] : [360, 720]) {
        const path = `public/assets/screens/${row.slug}-${w}.webp`;
        const record = byPath.get(path);
        expect(record, path).toBeDefined();
        expect(record.kind).toBe('appScreenshot');
        expect(record.companyId).toBe(143);
        expect(record.origin, `${path} origin must name its source PNG`).toContain(row.source);
        expect(record.origin, `${path} origin must carry what was checked`).toContain(row.shows);
      }
    }
  });
});

// The source mockups are ~70 MB of unreviewed captures. Anything under public/
// is copied verbatim into dist/ by Vite and served by dev and preview, so
// keeping them there published them by URL even though .gitignore kept them out
// of the repository — including a screen carrying a legible mobile number.
// They live in mockups/ at the repo root instead, and this is the guard that
// stops them drifting back.
describe('screen sources stay outside public/', () => {
  const filesUnderPublic = (dir, out = []) => {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) filesUnderPublic(full, out);
      else out.push(entry);
    }
    return out;
  };

  it('does not keep the mockup folder under public/', () => {
    expect(existsSync(resolve(root, 'public/assets/screenshots/latest mockup'))).toBe(false);
  });

  it('publishes no file named like a manifest source', () => {
    const sources = new Set(manifest.map((row) => row.source));
    const published = filesUnderPublic(resolve(root, 'public'));
    expect(published.filter((name) => sources.has(name))).toEqual([]);
  });
});
