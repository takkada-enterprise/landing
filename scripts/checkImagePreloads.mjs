// Post-build guard: fails the build if blanket image preloads ever return
// (e.g. a vite-react-ssg update changes the injection internals and the
// onPageRendered hook stops matching). Home must carry at most one image
// preload, and it must be the hero.
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { HERO_IMAGE } from './stripImagePreloads.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const homeHtml = readFileSync(resolve(__dirname, '../dist/index.html'), 'utf-8');

const preloads = homeHtml.match(/<link\b[^>]*rel="preload"[^>]*as="image"[^>]*>/g) ?? [];

if (preloads.length > 1) {
  console.error(`checkImagePreloads: dist/index.html has ${preloads.length} image preloads (max 1):`);
  for (const tag of preloads) console.error(`  ${tag}`);
  process.exit(1);
}

if (preloads.length === 1 && !preloads[0].includes(HERO_IMAGE)) {
  console.error(`checkImagePreloads: the single image preload is not the hero (${HERO_IMAGE}):`);
  console.error(`  ${preloads[0]}`);
  process.exit(1);
}

console.log(`checkImagePreloads: OK (${preloads.length} image preload${preloads.length === 1 ? '' : 's'} on home)`);
