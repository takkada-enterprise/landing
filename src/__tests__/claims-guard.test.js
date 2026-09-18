import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const BANNED = /(₹|\\u20B9|Rs\.?)\s?17\s?(Cr|crore)|17\s?Cr\+|Collected monthly/i;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(jsx?|mjs|md|html|css|json|txt)$/.test(name)) out.push(p);
  }
  return out;
}

describe('retired public claims', () => {
  it('never states a rupee volume collected per month', () => {
    const files = [...walk(join(root, 'src')), ...walk(join(root, 'content')), join(root, 'index.html')]
      .filter((f) => !f.endsWith('claims-guard.test.js'));
    const hits = files.filter((f) => BANNED.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
