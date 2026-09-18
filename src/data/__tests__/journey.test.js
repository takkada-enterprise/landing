// The homepage tells one story ("follow one invoice") and offers one toy (the
// playable phone). Both are data, and both make promises a reader can check:
// the slip's arithmetic, the screens behind each stop, the feature pills that
// must not be dead links, and the hotspot boxes that must actually sit over the
// tiles they claim. Nothing else in the build looks at any of that.
import { describe, it, expect } from 'vitest';
import { STOPS, INVOICE, liveFeatures } from '../journey';
import { HOTSPOTS, JOBS, HERO_HOME } from '../heroHotspots';
import { SCREENS } from '../screens';
import { FEATURE_PAGES, getFeaturePage } from '../featurePages';

/** Every string reachable from a data export, so a copy rule can be swept. */
function strings(value, path = '') {
  if (typeof value === 'string') return [[path, value]];
  if (Array.isArray(value)) return value.flatMap((v, i) => strings(v, `${path}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => strings(v, path ? `${path}.${k}` : k));
  }
  return [];
}

const pct = (s) => {
  expect(s, `${s} is not a percentage`).toMatch(/^-?\d+(\.\d+)?%$/);
  return Number.parseFloat(s);
};
const rect = (box) => ({
  left: pct(box.left),
  top: pct(box.top),
  right: pct(box.left) + pct(box.width),
  bottom: pct(box.top) + pct(box.height),
});

describe('journey data', () => {
  it('runs the seven stops in order', () => {
    expect(STOPS.map((s) => s.id)).toEqual([
      'order',
      'bill',
      'load',
      'send',
      'remind',
      'recover',
      'tally',
    ]);
  });

  it('uses only registered screens and sheets', () => {
    for (const s of STOPS) {
      for (const slug of [...s.screens, ...(s.sheet ? [s.sheet] : [])]) {
        expect(SCREENS[slug], slug).toBeDefined();
      }
    }
    for (const h of HOTSPOTS) expect(SCREENS[h.screen], h.screen).toBeDefined();
  });

  it('drops a feature pill whose page does not exist, so no pill is a dead link', () => {
    const pages = [{ slug: 'real-page' }];
    const stop = {
      features: [
        { label: 'A', slug: 'real-page' },
        { label: 'B', slug: 'ghost' },
      ],
    };
    expect(liveFeatures(stop, pages)).toEqual([{ label: 'A', slug: 'real-page' }]);
  });

  it('leaves every stop with at least one live pill on the real page list', () => {
    for (const s of STOPS) expect(liveFeatures(s, FEATURE_PAGES).length, s.id).toBeGreaterThan(0);
  });

  it('says AI calling is charged on connected minutes wherever it is named', () => {
    const recover = STOPS.find((s) => s.id === 'recover');
    expect(`${recover.body} ${recover.note ?? ''}`).toMatch(/charged on connected minutes/);
  });

  it('maps every hero job button to a hotspot', () => {
    for (const j of JOBS) expect(HOTSPOTS.some((h) => h.key === j.key), j.key).toBe(true);
  });

  it('keeps the slip arithmetic honest', () => {
    const sum = INVOICE.lines.reduce((n, l) => n + l.amount, 0);
    expect(Math.round(sum * 100)).toBe(Math.round(INVOICE.total * 100));
  });

  it('sends every hotspot to a feature page that exists', () => {
    for (const h of HOTSPOTS) {
      expect(h.href, h.key).toMatch(/^\//);
      expect(getFeaturePage(h.href.slice(1)), h.href).toBeDefined();
    }
  });
});

describe('hero hotspot boxes', () => {
  it('keeps every box inside the phone', () => {
    for (const h of HOTSPOTS) {
      const r = rect(h.box);
      expect(r.left, `${h.key} left`).toBeGreaterThanOrEqual(0);
      expect(r.top, `${h.key} top`).toBeGreaterThanOrEqual(0);
      expect(r.right, `${h.key} right`).toBeLessThanOrEqual(100);
      expect(r.bottom, `${h.key} bottom`).toBeLessThanOrEqual(100);
    }
  });

  it('never lets two boxes overlap, so a tap has one meaning', () => {
    for (let i = 0; i < HOTSPOTS.length; i += 1) {
      for (let j = i + 1; j < HOTSPOTS.length; j += 1) {
        const a = rect(HOTSPOTS[i].box);
        const b = rect(HOTSPOTS[j].box);
        const overlaps =
          a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
        expect(overlaps, `${HOTSPOTS[i].key} overlaps ${HOTSPOTS[j].key}`).toBe(false);
      }
    }
  });

  it('gives every hotspot a unique key', () => {
    const keys = HOTSPOTS.map((h) => h.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

describe('copy rules (CLAUDE.md §5)', () => {
  const banned = [
    'seamless',
    'world-class',
    'enterprise-grade',
    'revolutionary',
    'unleash',
    'game-changer',
    '17cr',
  ];
  const all = [
    ...strings(STOPS, 'STOPS'),
    ...strings(HOTSPOTS, 'HOTSPOTS'),
    ...strings(JOBS, 'JOBS'),
    ...strings(HERO_HOME, 'HERO_HOME'),
    ...strings(INVOICE, 'INVOICE'),
  ];

  it('has something to scan', () => {
    expect(all.length).toBeGreaterThan(100);
  });

  it('uses no em-dashes', () => {
    for (const [path, text] of all) expect(text, `${path}: ${text}`).not.toContain('—');
  });

  it('uses none of the banned words', () => {
    for (const [path, text] of all) {
      for (const word of banned) {
        expect(text.toLowerCase(), `${path}: ${text}`).not.toContain(word);
      }
    }
  });
});
