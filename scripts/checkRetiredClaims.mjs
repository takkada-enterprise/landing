// checkRetiredClaims — fail the build when a retired public claim comes back.
//
// The monthly rupee volume ("₹17Cr+ collected monthly") was retired on
// 2026-09-18 by operator direction. It had spread from one entry in
// heroContent.stats to a test fixture, nine blog posts, a script comment and
// CLAUDE.md, so the only thing that keeps it out is a check on the gate that
// actually runs on every deploy: `npm run build`. The vitest suite does not
// run there, so src/__tests__/claims-guard.test.js imports this file rather
// than keeping a second copy of the pattern and the walk.
//
// A scan that finds no files to read also fails: a guard that passes by
// seeing nothing reads as coverage without being any (checkRateCardDrift and
// checkFeaturesHub lesson).

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// The escaped form (\u20B9) is matched as literal text too, because
// src/data/siteContent.js writes its rupee sign that way.
export const RETIRED_CLAIM_RE =
  /(₹|\\u20B9|Rs\.?)\s*17\s*(Cr|crore)|17\s*Cr\+|Collected monthly/i;

export const SCANNED_DIRS = ['src', 'content', 'scripts', 'public'];
export const SCANNED_FILES = ['index.html'];

const TEXT_FILE_RE = /\.(jsx?|mjs|md|html|css|json|txt|py)$/;
const SKIP_DIRS = new Set(['node_modules', 'dist']);

// The guard and its test carry the pattern itself, so they are the two files
// that must be allowed to state it.
const SELF = new Set(['scripts/checkRetiredClaims.mjs', 'src/__tests__/claims-guard.test.js']);

function walk(dir, out = []) {
  let names;
  try {
    names = readdirSync(dir);
  } catch {
    return out; // a scanned directory that does not exist in this tree
  }
  for (const name of names) {
    if (SKIP_DIRS.has(name) || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (TEXT_FILE_RE.test(name)) out.push(p);
  }
  return out;
}

/**
 * Every text file the guard reads, as absolute paths.
 * @param {string} root - tree to scan; defaults to the repo root
 * @returns {string[]}
 */
export function scannedFiles(root = repoRoot) {
  const files = SCANNED_DIRS.flatMap((dir) => walk(resolve(root, dir)));
  for (const name of SCANNED_FILES) {
    const p = resolve(root, name);
    try {
      if (statSync(p).isFile()) files.push(p);
    } catch {
      /* not in this tree */
    }
  }
  return files.filter((f) => !SELF.has(relative(root, f).split('\\').join('/')));
}

/**
 * Files that still state a retired claim, as repo-relative paths.
 * @param {string} root - tree to scan; defaults to the repo root
 * @returns {string[]}
 */
export function findRetiredClaims(root = repoRoot) {
  return scannedFiles(root)
    .filter((f) => RETIRED_CLAIM_RE.test(readFileSync(f, 'utf-8')))
    .map((f) => relative(root, f).split('\\').join('/'))
    .sort();
}

function main() {
  const scanned = scannedFiles();
  if (scanned.length === 0) {
    process.stderr.write(
      'checkRetiredClaims: scanned zero files — the walk has gone vacuous, check SCANNED_DIRS.\n',
    );
    process.exit(1);
  }

  const hits = findRetiredClaims();
  if (hits.length > 0) {
    process.stderr.write(
      `checkRetiredClaims: the monthly rupee volume figure was retired on 2026-09-18 and is back in:\n${hits
        .map((h) => `  - ${h}`)
        .join('\n')}\n`,
    );
    process.exit(1);
  }
  process.stdout.write(`checkRetiredClaims: ${scanned.length} files clean of retired claims.\n`);
}

// Same main-detection idiom as checkLeadAnswer.mjs and checkRateCardDrift.mjs.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
