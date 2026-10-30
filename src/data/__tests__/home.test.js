// The Campfire home page is data: the hero, the four "used for" cards, the
// three "Tally stays in charge" cards, the three alternating rows and the close
// band. Each names a registry screen and, where it links, a feature page, and
// each carries copy that has to stay short and inside the §5 rules.
import { describe, it, expect } from 'vitest';
import { HOME_HERO, HOME_USED_FOR, HOME_IN_CHARGE, HOME_ROWS, HOME_CLOSE } from '../home';
import { SCREENS } from '../screens';
import { FEATURE_PAGES } from '../featurePages';

const EXPORTS = { HOME_HERO, HOME_USED_FOR, HOME_IN_CHARGE, HOME_ROWS, HOME_CLOSE };
const COPY_KEYS = new Set(['headline', 'accent', 'lead', 'title', 'line', 'label']);

/** Every [path, key, value] pair reachable from a data export. */
function walk(value, path = '', key = '') {
  if (Array.isArray(value)) return value.flatMap((v, i) => walk(v, `${path}[${i}]`, key));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => walk(v, path ? `${path}.${k}` : k, k));
  }
  return [[path, key, value]];
}
const all = Object.entries(EXPORTS).flatMap(([name, v]) => walk(v, name));
const words = (s) => s.trim().split(/\s+/).length;

describe('home page data', () => {
  it('offers the four used-for cards in order', () => {
    expect(HOME_USED_FOR.map((c) => c.id)).toEqual(['outstanding', 'reminders', 'invoices', 'salesmen']);
  });

  it('names only registered screens', () => {
    const screens = all.filter(([, k]) => k === 'screen');
    expect(screens.length).toBeGreaterThanOrEqual(13);
    for (const [path, , slug] of screens) expect(SCREENS[slug], `${path}: ${slug}`).toBeDefined();
  });

  it('links only to feature pages that exist', () => {
    const slugs = new Set(FEATURE_PAGES.map((p) => p.slug));
    const linked = all.filter(([, k]) => k === 'slug');
    expect(linked.length).toBeGreaterThanOrEqual(7);
    for (const [path, , slug] of linked) expect(slugs.has(slug), `${path}: ${slug}`).toBe(true);
  });

  it('keeps titles to 7 words and lines to 24', () => {
    for (const [path, k, v] of all) {
      if (k === 'title') expect(words(v), `${path}: ${v}`).toBeLessThanOrEqual(7);
      if (k === 'line') expect(words(v), `${path}: ${v}`).toBeLessThanOrEqual(24);
    }
  });

  it('puts the accent phrase inside the headline', () => {
    expect(HOME_HERO.headline).toContain(HOME_HERO.accent);
    expect(HOME_CLOSE.title).toContain(HOME_CLOSE.accent);
  });

  it('keeps each float clear of the middle of the phone', () => {
    expect(HOME_HERO.floats).toHaveLength(2);
    for (const f of HOME_HERO.floats) {
      expect(f.top, f.id).toMatch(/^\d+(\.\d+)?%$/);
      const top = Number.parseFloat(f.top);
      expect((top >= 0 && top <= 30) || (top >= 70 && top <= 100), `${f.id} top ${f.top}`).toBe(true);
    }
  });

  it('writes copy with no em-dash, no "Not " contrast and no number but 100+', () => {
    const copy = all.filter(([, k]) => COPY_KEYS.has(k));
    expect(copy.length).toBeGreaterThan(20);
    for (const [path, , text] of copy) {
      expect(text, path).not.toContain('—');
      expect(text, path).not.toContain('Not ');
      expect(text.replaceAll('100+', ''), `${path}: ${text}`).not.toMatch(/\d/);
    }
  });
});
