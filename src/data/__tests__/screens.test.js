// The screen registry is the one place the hero, the journey, the features hub
// and the feature pages look up an app screenshot. If it drifts from what
// scripts/exportScreens.mjs actually wrote, the site renders broken images or
// shifts layout on load, and nothing else catches it — these pages read the
// registry, not the filesystem.
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SCREENS, screen } from '../screens';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/screens.manifest.json'), 'utf8'));

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
    const sizeOf = (url) => {
      const bytes = readFileSync(resolve(root, 'public', url.replace(/^\//, '')));
      // VP8L (lossless) and VP8 (lossy) carry their dimensions in different
      // places; these exports are all lossy VP8, whose 10-byte frame header
      // ends with 14-bit width and height.
      const vp8 = bytes.indexOf('VP8 ', 12, 'ascii');
      expect(vp8, `${url} is not a lossy VP8 WebP`).toBeGreaterThan(0);
      const frame = vp8 + 8;
      return {
        width: bytes.readUInt16LE(frame + 6) & 0x3fff,
        height: bytes.readUInt16LE(frame + 8) & 0x3fff,
      };
    };

    for (const s of Object.values(SCREENS)) {
      expect(sizeOf(s.src), s.slug).toEqual({ width: s.width, height: s.height });
    }
  });

  it('throws on an unknown slug instead of rendering a broken image', () => {
    expect(() => screen('nope')).toThrow(/Unknown screen/);
  });
});
