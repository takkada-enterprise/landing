import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  RETIRED_CLAIM_RE,
  findRetiredClaims,
  scannedFiles,
} from '../../scripts/checkRetiredClaims.mjs';

// The monthly rupee volume was retired on 2026-09-18 (operator direction).
// The pattern and the walk live in scripts/checkRetiredClaims.mjs, which the
// build chain runs; this suite exercises that one definition rather than
// keeping a second copy that could drift green.

const fixtures = [];

function fixtureTree(fileName, body) {
  const root = mkdtempSync(join(tmpdir(), 'claims-guard-'));
  fixtures.push(root);
  mkdirSync(join(root, 'src'), { recursive: true });
  writeFileSync(join(root, 'src', fileName), body, 'utf-8');
  return root;
}

afterEach(() => {
  while (fixtures.length) rmSync(fixtures.pop(), { recursive: true, force: true });
});

describe('retired public claims', () => {
  it('never states a rupee volume collected per month anywhere in the shipped tree', () => {
    expect(findRetiredClaims()).toEqual([]);
  });

  it('scans the real tree, so a green result is not an empty walk', () => {
    const files = scannedFiles();
    expect(files.length).toBeGreaterThan(100);
    expect(files.some((f) => f.endsWith('src/data/siteContent.js'))).toBe(true);
    expect(files.some((f) => f.endsWith('/index.html'))).toBe(true);
    expect(files.some((f) => f.includes('/public/'))).toBe(true);
    expect(files.some((f) => f.includes('/scripts/'))).toBe(true);
  });

  it('fails on a tree that carries the figure, in every shape it shipped in', () => {
    expect(findRetiredClaims(fixtureTree('hero.js', 'label: "Collected monthly"'))).toEqual([
      'src/hero.js',
    ]);
    expect(findRetiredClaims(fixtureTree('post.md', 'and ₹17Cr+ collected monthly, platform-wide'))).toEqual([
      'src/post.md',
    ]);
    expect(findRetiredClaims(fixtureTree('escaped.js', "prefix: '\\u20B9 17 Cr'"))).toEqual([
      'src/escaped.js',
    ]);
    expect(findRetiredClaims(fixtureTree('prose.md', 'Rs. 17 crore a month'))).toEqual([
      'src/prose.md',
    ]);
  });

  it('leaves unrelated rupee figures and scale words alone', () => {
    expect(findRetiredClaims(fixtureTree('article.md', 'a ₹12 crore distributor paid ₹8,500'))).toEqual(
      []
    );
    expect(RETIRED_CLAIM_RE.test('₹17 lakh outstanding')).toBe(false);
    expect(RETIRED_CLAIM_RE.test('170 crore')).toBe(false);
  });
});
