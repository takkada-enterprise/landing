// Post-build guard for the preload-stripping mechanism (stripImagePreloads
// .mjs, wired into vite.config.js onPageRendered). Two invariants, checked
// on EVERY page in dist/ so a regression on blog posts can't hide behind a
// clean home page:
//   1. No page carries a blanket image preload (one that is neither
//      fetchpriority="high" nor the hero) — if a vite-react-ssg update
//      changes the injection so the stripper stops matching, this fails.
//   2. Home still carries its hero preload — failing on ZERO preloads
//      catches the opposite drift, where the hero constant/src diverge and
//      the stripper eats the LCP preload.
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_IMAGE, findImagePreloads, isDeliberatePreload } from './stripImagePreloads.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [full] : [];
  });
}

let failures = 0;
let pagesChecked = 0;

for (const file of htmlFiles(distDir)) {
  pagesChecked += 1;
  const preloads = findImagePreloads(readFileSync(file, 'utf-8'));
  const blanket = preloads.filter((tag) => !isDeliberatePreload(tag));
  if (blanket.length > 0) {
    failures += 1;
    console.error(`checkImagePreloads: blanket image preload(s) in ${file}:`);
    for (const tag of blanket) console.error(`  ${tag}`);
  }
}

const homeHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
const homeHero = findImagePreloads(homeHtml).filter((tag) => tag.includes(HERO_IMAGE));
if (homeHero.length === 0) {
  failures += 1;
  console.error(
    `checkImagePreloads: dist/index.html lost its hero preload (${HERO_IMAGE}) — LCP regression`
  );
}

if (failures > 0) process.exit(1);
console.log(`checkImagePreloads: OK (${pagesChecked} pages, hero preload present on home)`);
