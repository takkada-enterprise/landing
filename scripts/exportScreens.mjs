// exportScreens — turn the operator's PNG mockups into the two WebP widths the
// site actually serves.
//
// Phone screens are shown at up to 340 CSS px, so 360w and 720w cover 1x and 2x.
// Sheets (a printed loading sheet, an exported report) are wider on screen, so
// they export at 720w and 1440w instead.
//
// The originals live in `mockups/` at the repo root, deliberately NOT under
// `public/`: Vite copies everything under `public/` into `dist/` verbatim, so a
// source folder there would be served by dev, preview and the built site — ~70 MB
// of unreviewed captures, fetchable by URL, however thoroughly .gitignore kept
// them out of git. `mockups/` is gitignored and never enters the build, so only
// the exports below ship. A fresh checkout has to be given the originals before
// this script can run; src/data/__tests__/screens.test.js fails if they ever
// reappear under `public/`.
//
// Every row of scripts/screens.manifest.json has been opened and checked against
// what the image really shows — the operator's filenames do not always match the
// screen (`Team Sales.png` is the "Review invoices" screen). `shows` is that
// check written down; do not edit it from a filename.
//
// Run: node scripts/exportScreens.mjs

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = resolve(root, 'mockups');
const outDir = resolve(root, 'public/assets/screens');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/screens.manifest.json'), 'utf8'));

// cwebp is usually on PATH, but a GUI-launched shell or a login shell that never
// sourced the Homebrew profile does not have /opt/homebrew/bin on it. Try PATH
// first so a system install wins, then the known Homebrew location.
function resolveCwebp() {
  const candidates = ['cwebp', '/opt/homebrew/bin/cwebp', '/usr/local/bin/cwebp'];
  for (const candidate of candidates) {
    try {
      execFileSync(candidate, ['-version'], { stdio: 'ignore' });
      return candidate;
    } catch {
      // Not this one; try the next.
    }
  }
  throw new Error(
    `cwebp not found (tried ${candidates.join(', ')}). Install it with: brew install webp`
  );
}

const cwebp = resolveCwebp();

mkdirSync(outDir, { recursive: true });
for (const { slug, source, sheet, q } of manifest) {
  const input = resolve(srcDir, source);
  if (!existsSync(input)) throw new Error(`Missing source for ${slug}: ${source}`);
  for (const w of sheet ? [720, 1440] : [360, 720]) {
    execFileSync(cwebp, [
      '-quiet',
      '-q',
      String(q ?? 80),
      '-resize',
      String(w),
      '0',
      input,
      '-o',
      resolve(outDir, `${slug}-${w}.webp`),
    ]);
  }
}
console.log(`Exported ${manifest.length} screens to public/assets/screens`);
