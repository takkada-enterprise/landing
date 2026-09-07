// vendorFonts — pull the webfonts off Google's servers and into ours.
//
// Why: the Google Fonts <link> put two sequential third-party round trips on
// the critical path — fetch a stylesheet from fonts.googleapis.com, parse it,
// only then discover and fetch the woff2 files from fonts.gstatic.com. That
// stylesheet was render-blocking for 1,326ms on live mobile, which is what kept
// homepage LCP at 2.6s against a 2.5s "good" threshold. Self-hosting removes
// the whole chain: the fonts come off the connection the browser has already
// opened, and can be preloaded alongside the HTML.
//
// This deliberately copies Google's @font-face declarations VERBATIM, rewriting
// only the src URL. Same weights, same unicode-ranges, same font-display. Both
// families are variable fonts (one file serves every weight), and instancing
// them ourselves would risk changing how the opsz/wght axes render. Copying the
// declarations makes the output identical to what the browser gets today by
// construction, so there is nothing to reason about.
//
// Run this to refresh the vendored files (e.g. Google ships a new version, or a
// weight is added to the request):
//     node scripts/vendorFonts.mjs
// It rewrites public/assets/fonts/*.woff2 and src/fonts.css. Commit the result.
//
// Not part of `npm run build` on purpose — the build must not depend on a
// network fetch from Google, which is the exact dependency this removes.

import { writeFileSync, mkdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const FONT_DIR = resolve(repoRoot, 'public/assets/fonts');
const CSS_OUT = resolve(repoRoot, 'src/fonts.css');

// Must stay in sync with the families/weights the site actually uses.
// See CLAUDE.md §7: Plus Jakarta Sans for body/UI, Fraunces for headings.
export const GOOGLE_CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700' +
  '&family=Plus+Jakarta+Sans:wght@400;500;600;700;800' +
  '&display=swap';

// latin covers English. latin-ext is NOT optional here despite the name: the
// rupee sign U+20B9 lives in its unicode-range (U+20AD-20C0), and this site is
// wall-to-wall ₹ amounts, so nearly every page fetches it. Dropping it would
// render every price in a fallback system font. Vietnamese and Cyrillic are
// dropped: nothing on this site is written in them, and an unexpected glyph
// falls back exactly as it would have anyway.
export const KEEP_SUBSETS = ['latin', 'latin-ext'];

// Google's latin-ext files are 59KB (Fraunces) and 22KB (Plus Jakarta Sans),
// and this site uses exactly ONE character from that range: the rupee sign
// U+20B9, 1,710 times. Shipping 81KB to draw one glyph cost the homepage its
// LCP — the browser gives a font discovered during layout VeryHigh priority, so
// those two files were stealing bandwidth from the hero image mid-download.
//
// So latin-ext is re-subset down to just the rupee: 81,228 bytes -> 2,568.
// The unicode-range is narrowed to match, which keeps the declaration honest —
// a browser will not request the file for a character it no longer contains.
//
// If a second latin-ext character ever appears in the content, it would
// silently fall back to a system font. src/__tests__/fonts.test.js scans the
// whole site and fails if that happens, so it cannot pass unnoticed.
export const SUBSET_TO_CODEPOINTS = { 'latin-ext': 'U+20B9' };

// pyftsubset ships with fonttools. This script is run by hand, not by the
// build, so a Python dependency here costs nobody anything at build time:
//   python3 -m venv /tmp/fontenv && /tmp/fontenv/bin/pip install fonttools brotli
export const PYFTSUBSET = process.env.PYFTSUBSET || 'pyftsubset';

function subsetFile(path, unicodes) {
  try {
    execFileSync(PYFTSUBSET, [
      path,
      `--unicodes=${unicodes}`,
      '--flavor=woff2',
      `--output-file=${path}`,
      '--no-hinting',
      '--desubroutinize',
    ]);
  } catch (err) {
    throw new Error(
      `vendorFonts: pyftsubset failed for ${path}. Install it with\n` +
        '  python3 -m venv /tmp/fontenv && /tmp/fontenv/bin/pip install fonttools brotli\n' +
        'then re-run with PYFTSUBSET=/tmp/fontenv/bin/pyftsubset node scripts/vendorFonts.mjs\n' +
        String(err.message)
    );
  }
}

// A desktop Chrome UA, because Google serves woff2 only to browsers it knows.
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/**
 * Split Google's stylesheet into blocks tagged with the subset comment that
 * precedes each one.
 * @param {string} css
 * @returns {Array<{subset: string, block: string}>}
 */
export function parseBlocks(css) {
  const out = [];
  const re = /\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g;
  let m;
  while ((m = re.exec(css)) !== null) {
    out.push({ subset: m[1], block: m[2] });
  }
  return out;
}

/**
 * A stable local filename for a remote woff2, derived from the family and
 * subset rather than Google's opaque hash so the repo stays readable and a
 * refresh overwrites in place instead of accumulating orphans.
 */
export function localFileName(block, subset) {
  const family = (block.match(/font-family:\s*'([^']+)'/) || [])[1] || 'font';
  const slug = family.toLowerCase().replace(/\s+/g, '-');
  return `${slug}-${subset}.woff2`;
}

export function srcUrlOf(block) {
  return (block.match(/url\((https:\/\/[^)]+\.woff2)\)/) || [])[1] || null;
}

/**
 * Rewrite a Google @font-face block to point at our own copy.
 */
export function rewriteBlock(block, fileName) {
  return block.replace(/url\(https:\/\/[^)]+\.woff2\)/, `url(/assets/fonts/${fileName})`);
}

/**
 * Build the final stylesheet from the kept blocks.
 * @returns {{css: string, downloads: Map<string,string>}} downloads maps remote url -> local filename
 */
export function buildCss(blocks) {
  const kept = blocks.filter((b) => KEEP_SUBSETS.includes(b.subset));
  const downloads = new Map();
  const parts = [];

  for (const { subset, block } of kept) {
    const url = srcUrlOf(block);
    if (!url) continue;
    const fileName = localFileName(block, subset);
    downloads.set(url, fileName);
    let out = rewriteBlock(block, fileName);
    const narrowed = SUBSET_TO_CODEPOINTS[subset];
    if (narrowed) {
      out = out.replace(/unicode-range:[^;]*;/, `unicode-range: ${narrowed};`);
    }
    parts.push(`/* ${subset} */\n${out}`);
  }

  const header = [
    '/*',
    ' * Self-hosted webfonts. GENERATED — do not hand-edit.',
    ' * Regenerate with: node scripts/vendorFonts.mjs',
    ' *',
    ' * These declarations are copied verbatim from Google Fonts with only the',
    ' * src URL rewritten, so rendering is identical to the hosted version.',
    ' * Loading them from our own origin removes two render-blocking',
    ' * third-party round trips from the critical path (CLAUDE.md §7 explains',
    ' * why the Fraunces face in particular is load-bearing: without it every',
    ' * heading silently reverts to Plus Jakarta Sans).',
    ' *',
    ' * latin-ext carries the rupee sign U+20B9 (range U+20AD-20C0), so most',
    ' * pages fetch it. It is intentionally not preloaded — see index.html.',
    ' */',
    '',
  ].join('\n');

  return { css: `${header}${parts.join('\n')}\n`, downloads };
}

async function main() {
  const res = await fetch(GOOGLE_CSS_URL, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`vendorFonts: Google returned ${res.status}`);
  const css = await res.text();

  const blocks = parseBlocks(css);
  if (blocks.length === 0) throw new Error('vendorFonts: parsed zero @font-face blocks');

  const { css: out, downloads } = buildCss(blocks);
  if (downloads.size === 0) throw new Error('vendorFonts: no fonts matched KEEP_SUBSETS');

  mkdirSync(FONT_DIR, { recursive: true });
  let total = 0;
  for (const [url, fileName] of downloads) {
    // eslint-disable-next-line no-await-in-loop
    const fr = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!fr.ok) throw new Error(`vendorFonts: ${fileName} returned ${fr.status}`);
    // eslint-disable-next-line no-await-in-loop
    const buf = Buffer.from(await fr.arrayBuffer());
    const dest = resolve(FONT_DIR, fileName);
    writeFileSync(dest, buf);

    const subset = [...Object.keys(SUBSET_TO_CODEPOINTS)].find((k) => fileName.includes(`-${k}.`));
    if (subset) {
      subsetFile(dest, SUBSET_TO_CODEPOINTS[subset]);
      const after = statSync(dest).size;
      total += after;
      process.stdout.write(
        `  ${String(after).padStart(7)} bytes  ${fileName}  (subset to ${SUBSET_TO_CODEPOINTS[subset]}, was ${buf.length})\n`
      );
    } else {
      total += buf.length;
      process.stdout.write(`  ${String(buf.length).padStart(7)} bytes  ${fileName}\n`);
    }
  }

  writeFileSync(CSS_OUT, out);
  process.stdout.write(
    `vendorFonts: ${downloads.size} files, ${total} bytes total -> public/assets/fonts/, css -> src/fonts.css\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
