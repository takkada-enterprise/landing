// Tests for the local-filename scheme in vendorFonts.
//
// The failure these exist to prevent leaves NOTHING to look at. Google serves
// a variable family (Plus Jakarta Sans) as one woff2 per subset shared by every
// weight, and a static family (IBM Plex Mono) as a DIFFERENT woff2 per weight
// behind the same family+subset. Name the local files from family+subset alone
// and the static family's cuts all land on one path, each overwriting the last.
// The file exists, it is a valid woff2, the CSS is well-formed, and every
// assertion in src/__tests__/fonts.test.js passes — while all the 400 and 500
// text on the site renders in the 600 cut.
//
// So the guard cannot be "a file exists behind every src". It has to be the two
// properties the naming actually owes:
//   1. two different remote files never share one local name, and
//   2. every src the emitted CSS points at is a file the script downloads.
//
// No network: the blocks are synthesised in exactly Google's stylesheet shape
// and run through the real parseBlocks -> buildCss pipeline.

import { describe, it, expect } from 'vitest';

import { buildCss, parseBlocks, localFileName, weightOf } from '../vendorFonts.mjs';

const GSTATIC = 'https://fonts.gstatic.com/s';

/** One @font-face in Google's exact shape, preceded by its subset comment. */
const face = ({ subset, family, weight, url, range = 'U+0000-00FF' }) =>
  `/* ${subset} */\n` +
  `@font-face {\n` +
  `  font-family: '${family}';\n` +
  `  font-style: normal;\n` +
  `  font-weight: ${weight};\n` +
  `  font-display: swap;\n` +
  `  src: url(${url}) format('woff2');\n` +
  `  unicode-range: ${range};\n` +
  `}\n`;

const sheet = (entries) => entries.map(face).join('');

/** The (weight -> local file) pairs the emitted stylesheet actually declares. */
const emitted = (css) =>
  [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].map((m) => ({
    family: (m[0].match(/font-family:\s*'([^']+)'/) || [])[1],
    weight: (m[0].match(/font-weight:\s*([^;]+);/) || [])[1].trim(),
    file: (m[0].match(/url\(\/assets\/fonts\/([^)]+)\)/) || [])[1],
  }));

describe('vendorFonts: local filenames', () => {
  it('parses the synthetic sheet at all, so no case can pass on an empty parse', () => {
    const blocks = parseBlocks(
      sheet([
        { subset: 'latin', family: 'Static Mono', weight: 400, url: `${GSTATIC}/a.woff2` },
        { subset: 'latin', family: 'Static Mono', weight: 500, url: `${GSTATIC}/b.woff2` },
      ])
    );
    expect(blocks).toHaveLength(2);
    expect(blocks[0].subset).toBe('latin');
  });

  // (a) The IBM Plex Mono case: static cuts, one remote file per weight.
  it('gives every cut of a static family its own local file', () => {
    const { css, downloads } = buildCss(
      parseBlocks(
        sheet([
          { subset: 'latin', family: 'Static Mono', weight: 400, url: `${GSTATIC}/m400.woff2` },
          { subset: 'latin', family: 'Static Mono', weight: 500, url: `${GSTATIC}/m500.woff2` },
          { subset: 'latin', family: 'Static Mono', weight: 600, url: `${GSTATIC}/m600.woff2` },
        ])
      )
    );

    // Three distinct remote files must map to three distinct local names, or
    // one overwrites another on disk.
    expect(downloads.size).toBe(3);
    expect(new Set(downloads.values()).size).toBe(3);
    expect([...downloads.values()].sort()).toEqual([
      'static-mono-400-latin.woff2',
      'static-mono-500-latin.woff2',
      'static-mono-600-latin.woff2',
    ]);

    // And the CSS has to send each weight to ITS file, not just to some file.
    expect(emitted(css)).toEqual([
      { family: 'Static Mono', weight: '400', file: 'static-mono-400-latin.woff2' },
      { family: 'Static Mono', weight: '500', file: 'static-mono-500-latin.woff2' },
      { family: 'Static Mono', weight: '600', file: 'static-mono-600-latin.woff2' },
    ]);
  });

  // (b) The Plus Jakarta Sans case. This pins the shipped filenames: a naming
  // change that suffixed every family would rename two committed woff2 files
  // and break every src in fonts.css until someone re-vendored.
  it('keeps one un-suffixed file for a variable family whose weights share it', () => {
    const url = `${GSTATIC}/pjs-latin.woff2`;
    const { css, downloads } = buildCss(
      parseBlocks(
        sheet(
          [400, 500, 600, 700, 800].map((weight) => ({
            subset: 'latin',
            family: 'Plus Jakarta Sans',
            weight,
            url,
          }))
        )
      )
    );

    expect(downloads.size).toBe(1);
    expect([...downloads.values()]).toEqual(['plus-jakarta-sans-latin.woff2']);
    expect(emitted(css).map((f) => f.file)).toEqual(
      Array(5).fill('plus-jakarta-sans-latin.woff2')
    );
  });

  // (c) The mixed family: Google collapses some weights onto one file and not
  // others. The subset needs weight-suffixed names because two files exist,
  // but the two weights that SHARE a file must also share its name — otherwise
  // the CSS names a file the download loop was never told to fetch, and the
  // site 404s a font that nothing in the build can see is missing.
  it('never points the CSS at a file it does not download', () => {
    const shared = `${GSTATIC}/mixed-shared.woff2`;
    const { css, downloads } = buildCss(
      parseBlocks(
        sheet([
          { subset: 'latin', family: 'Mixed Face', weight: 400, url: shared },
          { subset: 'latin', family: 'Mixed Face', weight: 500, url: shared },
          { subset: 'latin', family: 'Mixed Face', weight: 600, url: `${GSTATIC}/mixed-600.woff2` },
        ])
      )
    );

    const written = new Set(downloads.values());
    const referenced = emitted(css).map((f) => f.file);
    expect(
      referenced.filter((f) => !written.has(f)),
      'the emitted CSS references a local file that vendorFonts never writes'
    ).toEqual([]);

    // Concretely: the two weights behind one remote file share one local file,
    // and the third keeps its own.
    const byWeight = Object.fromEntries(emitted(css).map((f) => [f.weight, f.file]));
    expect(byWeight['400']).toBe(byWeight['500']);
    expect(byWeight['600']).not.toBe(byWeight['400']);
    expect(downloads.size).toBe(2);
  });

  it('keeps the two subsets of one static cut apart', () => {
    const { downloads } = buildCss(
      parseBlocks(
        sheet([
          { subset: 'latin', family: 'Static Mono', weight: 400, url: `${GSTATIC}/m400l.woff2` },
          {
            subset: 'latin-ext',
            family: 'Static Mono',
            weight: 400,
            url: `${GSTATIC}/m400e.woff2`,
            range: 'U+0100-024F',
          },
          { subset: 'latin', family: 'Static Mono', weight: 600, url: `${GSTATIC}/m600l.woff2` },
          {
            subset: 'latin-ext',
            family: 'Static Mono',
            weight: 600,
            url: `${GSTATIC}/m600e.woff2`,
            range: 'U+0100-024F',
          },
        ])
      )
    );
    expect([...downloads.values()].sort()).toEqual([
      'static-mono-400-latin-ext.woff2',
      'static-mono-400-latin.woff2',
      'static-mono-600-latin-ext.woff2',
      'static-mono-600-latin.woff2',
    ]);
  });

  it('drops subsets outside KEEP_SUBSETS without disturbing the naming', () => {
    const { downloads } = buildCss(
      parseBlocks(
        sheet([
          { subset: 'cyrillic', family: 'Static Mono', weight: 400, url: `${GSTATIC}/cyr.woff2` },
          { subset: 'latin', family: 'Static Mono', weight: 400, url: `${GSTATIC}/m400.woff2` },
          { subset: 'latin', family: 'Static Mono', weight: 600, url: `${GSTATIC}/m600.woff2` },
        ])
      )
    );
    expect([...downloads.values()].sort()).toEqual([
      'static-mono-400-latin.woff2',
      'static-mono-600-latin.woff2',
    ]);
  });
});

describe('vendorFonts: weightOf does not fail open', () => {
  it('reads the declared weight, including a variable range', () => {
    expect(weightOf("@font-face { font-weight: 400; }")).toBe('400');
    expect(weightOf("@font-face { font-weight: 200 800; }")).toBe('200-800');
  });

  // Returning '' here would hand localFileName the un-suffixed name — the exact
  // colliding name the suffix exists to avoid — and the script would overwrite
  // one cut with another and report success.
  it('throws rather than returning an empty weight', () => {
    expect(() => weightOf("@font-face { font-family: 'X'; }")).toThrow(/font-weight/i);
  });

  it('fails the whole run when a family needing suffixed names declares no weight', () => {
    const blocks = parseBlocks(
      sheet([
        { subset: 'latin', family: 'Static Mono', weight: 400, url: `${GSTATIC}/m400.woff2` },
        { subset: 'latin', family: 'Static Mono', weight: 600, url: `${GSTATIC}/m600.woff2` },
      ])
    );
    blocks[1].block = blocks[1].block.replace(/\s*font-weight:[^;]*;/, '');

    expect(() => buildCss(blocks)).toThrow(/font-weight/i);
  });

  // A variable family never takes the suffixed path, so a missing weight there
  // is not this function's problem and must not break the run.
  it('does not fail a variable family that shares one file', () => {
    const url = `${GSTATIC}/pjs.woff2`;
    const blocks = parseBlocks(
      sheet([
        { subset: 'latin', family: 'Plus Jakarta Sans', weight: 400, url },
        { subset: 'latin', family: 'Plus Jakarta Sans', weight: 700, url },
      ])
    );
    blocks[1].block = blocks[1].block.replace(/\s*font-weight:[^;]*;/, '');

    expect(() => buildCss(blocks)).not.toThrow();
  });
});

describe('vendorFonts: localFileName', () => {
  const block = "@font-face { font-family: 'IBM Plex Mono'; font-weight: 500; }";

  it('slugifies the family and appends the subset', () => {
    expect(localFileName(block, 'latin')).toBe('ibm-plex-mono-latin.woff2');
  });

  it('places the weight between family and subset when one is given', () => {
    expect(localFileName(block, 'latin-ext', '500')).toBe('ibm-plex-mono-500-latin-ext.woff2');
  });
});
