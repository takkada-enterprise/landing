import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { SHORTCUT_GROUPS } from '../desktopShortcuts.js';

// /keyboard-shortcuts prints keys a clerk will press. A key renamed or moved in
// the app leaves the page confidently wrong, so every row is checked against
// the app file it names, in the paired checkout (TAKKADA_APP_ROOT, the same one
// the guide tests read). Unskippable on purpose, like those tests: without the
// checkout nothing here can be known.
//
// What it proves: the binding with this label still uses this key and this
// modifier (or, for list keys, the exact activator line still exists). It does
// not prove the key behaves; that was driven by hand on SHORTCUTS_CHECKED_ON.

const appRoot = process.env.TAKKADA_APP_ROOT?.trim();
const read = (file) => {
  const path = appRoot ? resolve(appRoot, file) : null;
  return path && existsSync(path) ? readFileSync(path, 'utf-8') : null;
};

const ROWS = SHORTCUT_GROUPS.flatMap((group) => group.rows.map((row) => ({ group: group.id, ...row })));

// The label line, then its key and modifier within the next few lines of the
// same binding. `\b` stops `EntryModifier.alt` matching `altShift`.
function bindingMatches(source, { label, key, mod }) {
  const lines = source.split('\n');
  const quoted = new RegExp(`label:\\s*(['"])${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`);
  const at = lines.findIndex((line) => quoted.test(line));
  if (at < 0) return `label "${label}" not found`;
  const body = lines.slice(at, at + 10).join('\n');
  if (!new RegExp(`LogicalKeyboardKey\\.${key}\\b`).test(body)) return `"${label}" no longer uses ${key}`;
  if (!new RegExp(`modifier:\\s*${mod.replace('.', '\\.')}\\b`).test(body)) return `"${label}" no longer uses ${mod}`;
  return null;
}

describe('desktop keyboard shortcuts page', () => {
  it('has the paired app checkout with the desktop key tables', () => {
    expect(appRoot, 'TAKKADA_APP_ROOT is not set. Export the takkada checkout.').toBeTruthy();
    for (const file of new Set(ROWS.map((row) => row.src.file))) {
      expect(read(file), `${file} is missing from ${appRoot}; pair a checkout with the desktop code`).toBeTruthy();
    }
  });

  it.each(ROWS.map((row) => [`${row.group}: ${row.does}`, row]))('%s is still bound in the app', (_, row) => {
    const source = read(row.src.file);
    expect(source).toBeTruthy();
    if (row.src.snippet) {
      expect(source.includes(row.src.snippet), `${row.src.file} no longer has ${row.src.snippet}`).toBe(true);
    } else {
      expect(bindingMatches(source, row.src)).toBeNull();
    }
  });

  it('prints every key for both Windows and Mac, and lists each action once per section', () => {
    for (const group of SHORTCUT_GROUPS) {
      const seen = new Set();
      for (const row of group.rows) {
        expect(row.win && row.mac, `${row.does} is missing a key`).toBeTruthy();
        expect(seen.has(row.does), `${row.does} listed twice in ${group.id}`).toBe(false);
        seen.add(row.does);
      }
    }
  });

  it('keeps the copy free of em-dashes', () => {
    for (const row of ROWS) expect(`${row.does}${row.win}${row.mac}`).not.toMatch(/—/);
  });
});
