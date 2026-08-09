import { describe, expect, it } from 'vitest';

import { inspectHub } from './checkFeaturesHub.mjs';

// The first version of this guard searched the whole document for
// `href="/<slug>"`. That looked right and was worthless: SiteFooter renders an
// anchor for all 26 feature pages on every page of the site, so the guard
// passed against a page with no hub on it whatsoever. These cases exist to keep
// the guard falsifiable — each one is a way the hub can be broken, and each
// must stay red.

const FOOTER = (paths) =>
  `<footer>${paths.map((p) => `<a href="${p}">label</a>`).join('')}</footer>`;

const CARD = (path) =>
  `<a class="tally-card features-hub-card" href="${path}"><h3>t</h3><p>b</p></a>`;

const page = (body) => `<div id="root">${body}</div>`;

const PATHS = ['/salesman-app-tally', '/payment-collection-tally'];

describe('checkFeaturesHub', () => {
  it('passes when every feature page has a card', () => {
    const html = page(PATHS.map(CARD).join('') + FOOTER(PATHS));
    expect(inspectHub(html, PATHS)).toMatchObject({ emptyRoot: false, missing: [] });
  });

  it('fails on a page that carries the footer links but no hub', () => {
    // This is the case the original guard passed. dist/partners/index.html is
    // the real-world instance: every footer link present, zero hub cards.
    const { missing } = inspectHub(page(FOOTER(PATHS)), PATHS);
    expect(missing).toEqual(PATHS);
  });

  it('fails when a single card is dropped but its footer link remains', () => {
    const html = page(CARD(PATHS[0]) + FOOTER(PATHS));
    expect(inspectHub(html, PATHS).missing).toEqual([PATHS[1]]);
  });

  it('fails when the hub prerenders as an empty shell', () => {
    expect(inspectHub('<div id="root"></div>', PATHS).emptyRoot).toBe(true);
  });

  it('does not count a path that only appears in inlined JSON', () => {
    const html = page(
      `<script type="application/ld+json">{"url":"${PATHS[0]}"}</script>` + FOOTER(PATHS)
    );
    expect(inspectHub(html, PATHS).missing).toEqual(PATHS);
  });

  it('reports a card pointing somewhere that is not a feature page', () => {
    const html = page(PATHS.map(CARD).join('') + CARD('/not-a-feature') + FOOTER(PATHS));
    const { linked, missing } = inspectHub(html, PATHS);
    expect(missing).toEqual([]);
    expect([...linked].filter((h) => !PATHS.includes(h))).toEqual(['/not-a-feature']);
  });

  it('treats a trailing slash on a card href as the same page', () => {
    const html = page(CARD(`${PATHS[0]}/`) + CARD(PATHS[1]));
    expect(inspectHub(html, PATHS).missing).toEqual([]);
  });
});
