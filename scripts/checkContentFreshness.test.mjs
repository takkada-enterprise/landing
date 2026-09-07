import { describe, expect, it } from 'vitest';
import {
  THRESHOLDS,
  ageInDays,
  bucketFor,
  effectiveDate,
  summarise,
} from './checkContentFreshness.mjs';

// A fixed "now" so these assertions do not rot. Every age below is measured
// against this date, not the wall clock.
const NOW = new Date('2026-08-08T11:30:00Z');

describe('ageInDays', () => {
  it('counts whole days back from today, ignoring the time of day', () => {
    expect(ageInDays('2026-08-08', NOW)).toBe(0);
    expect(ageInDays('2026-08-07', NOW)).toBe(1);
    expect(ageInDays('2026-05-10', NOW)).toBe(90);
  });

  it('tolerates a full ISO timestamp in frontmatter', () => {
    expect(ageInDays('2026-08-01T00:00:00.000Z', NOW)).toBe(7);
  });

  it('returns null for a missing or unparseable date rather than NaN', () => {
    expect(ageInDays(undefined, NOW)).toBeNull();
    expect(ageInDays('', NOW)).toBeNull();
    expect(ageInDays('not-a-date', NOW)).toBeNull();
    expect(ageInDays(20260808, NOW)).toBeNull();
  });

  it('reports a future date as a negative age instead of throwing', () => {
    expect(ageInDays('2026-09-08', NOW)).toBe(-31);
  });
});

describe('bucketFor', () => {
  it('places ages on the correct side of each boundary', () => {
    expect(bucketFor(0)).toBe('fresh');
    expect(bucketFor(THRESHOLDS.fresh)).toBe('fresh');
    expect(bucketFor(THRESHOLDS.fresh + 1)).toBe('ageing');
    expect(bucketFor(THRESHOLDS.ageing)).toBe('ageing');
    expect(bucketFor(THRESHOLDS.ageing + 1)).toBe('stale');
  });

  it('treats a missing age as undated, not as fresh', () => {
    expect(bucketFor(null)).toBe('undated');
  });

  it('keeps a future-dated item in the fresh bucket', () => {
    expect(bucketFor(-31)).toBe('fresh');
  });
});

describe('effectiveDate', () => {
  it('prefers updated over the publish date, because that is what dateModified carries', () => {
    expect(effectiveDate({ date: '2026-01-01', updated: '2026-08-01' })).toBe('2026-08-01');
    expect(effectiveDate({ datePublished: '2026-01-01', updated: '2026-08-01' })).toBe('2026-08-01');
  });

  it('falls back to the publish date under either frontmatter key', () => {
    expect(effectiveDate({ date: '2026-01-01' })).toBe('2026-01-01');
    expect(effectiveDate({ datePublished: '2026-02-02' })).toBe('2026-02-02');
  });

  it('ignores a blank updated field instead of shadowing a real publish date', () => {
    expect(effectiveDate({ date: '2026-01-01', updated: '   ' })).toBe('2026-01-01');
  });

  it('returns null when nothing is dated', () => {
    expect(effectiveDate({})).toBeNull();
    expect(effectiveDate(null)).toBeNull();
  });
});

describe('summarise', () => {
  const items = [
    { id: '/a', kind: 'page', effectiveDate: '2026-08-08', days: 0 },
    { id: '/b', kind: 'post', effectiveDate: '2026-04-01', days: 129 },
    { id: '/c', kind: 'post', effectiveDate: '2025-06-01', days: 433 },
    { id: '/d', kind: 'post', effectiveDate: null, days: null },
  ];

  it('counts every item into exactly one bucket', () => {
    const { counts, total } = summarise(items);
    expect(counts).toEqual({ fresh: 1, ageing: 1, stale: 1, undated: 1 });
    expect(total).toBe(4);
    expect(counts.fresh + counts.ageing + counts.stale + counts.undated).toBe(total);
  });

  it('excludes fresh items from the refresh queue', () => {
    const { queue } = summarise(items);
    expect(queue.map((item) => item.id)).not.toContain('/a');
    expect(queue).toHaveLength(3);
  });

  it('sorts the queue oldest first and puts undated items at the very top', () => {
    const { queue } = summarise(items);
    expect(queue.map((item) => item.id)).toEqual(['/d', '/c', '/b']);
  });

  it('returns an empty queue when everything is fresh', () => {
    const { queue, counts } = summarise([items[0]]);
    expect(queue).toEqual([]);
    expect(counts.fresh).toBe(1);
  });

  it('handles an empty corpus without dividing by zero or throwing', () => {
    expect(summarise([])).toEqual({
      counts: { fresh: 0, ageing: 0, stale: 0, undated: 0 },
      queue: [],
      total: 0,
    });
  });
});
