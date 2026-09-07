import { describe, expect, it } from 'vitest';

import { inspectGuideHub, findDanglingRelated } from './checkGuideHub.mjs';

// checkFeaturesHub's first version searched the whole document for the href and
// passed against a page with no hub on it, because the footer links every
// feature page from every page of the site. The guide hub has the same trap
// twice over: the footer will link /guide, and every guide reader renders a
// "related guides" list of /guide/<slug> anchors. So these cases pin the guard
// to the hub's own cards, and keep it red on the two shells that matter.

const PATHS = ['/guide/dispatch', '/guide/tally-sync'];

const CARD = (path) => `<a class="guide-hub-card" href="${path}"><h3>t</h3><p>b</p></a>`;
const FOOTER = (paths) => `<footer>${paths.map((p) => `<a href="${p}">label</a>`).join('')}</footer>`;
const RELATED = (paths) =>
  `<aside class="guide-related"><ul>${paths.map((p) => `<li><a href="${p}">t</a></li>`).join('')}</ul></aside>`;
const page = (body) => `<div id="root">${body}</div>`;

describe('checkGuideHub', () => {
  it('passes when every guide has exactly one card', () => {
    const html = page(PATHS.map(CARD).join('') + FOOTER(PATHS));
    expect(inspectGuideHub(html, PATHS)).toMatchObject({
      emptyRoot: false,
      missing: [],
      duplicated: [],
      stray: [],
    });
  });

  it('fails when the hub prerenders as an empty shell', () => {
    const result = inspectGuideHub('<div id="root"></div>', PATHS);
    expect(result.emptyRoot).toBe(true);
    expect(result.missing).toEqual(PATHS);
  });

  it('fails a shell that carries only a not-found heading', () => {
    // What /guide renders if the hub route stops resolving: prose, an h1, and
    // not one card.
    const notFound = page('<main><h1>Guide not found</h1><p>That guide has moved.</p></main>');
    expect(inspectGuideHub(notFound, PATHS).missing).toEqual(PATHS);
  });

  it('fails a page that has the footer and related links but no hub', () => {
    expect(inspectGuideHub(page(FOOTER(PATHS) + RELATED(PATHS)), PATHS).missing).toEqual(PATHS);
  });

  it('fails when one card is dropped but its footer link remains', () => {
    expect(inspectGuideHub(page(CARD(PATHS[0]) + FOOTER(PATHS)), PATHS).missing).toEqual([PATHS[1]]);
  });

  it('reports a guide listed twice, which is a hub the reader cannot scan', () => {
    const html = page(CARD(PATHS[0]) + CARD(PATHS[0]) + CARD(PATHS[1]));
    expect(inspectGuideHub(html, PATHS)).toMatchObject({ missing: [], duplicated: [PATHS[0]] });
  });

  it('reports a card pointing at something that is not a published guide', () => {
    const html = page(PATHS.map(CARD).join('') + CARD('/guide/entries-waiting-approval'));
    expect(inspectGuideHub(html, PATHS).stray).toEqual(['/guide/entries-waiting-approval']);
  });

  it('does not count a path that only appears in inlined JSON-LD', () => {
    const html = page(`<script type="application/ld+json">{"url":"${PATHS[0]}"}</script>`);
    expect(inspectGuideHub(html, PATHS).missing).toEqual(PATHS);
  });

  it('treats a trailing slash on a card href as the same page', () => {
    expect(inspectGuideHub(page(CARD(`${PATHS[0]}/`) + CARD(PATHS[1])), PATHS).missing).toEqual([]);
  });
});

describe('findDanglingRelated', () => {
  const published = ['dispatch', 'tally-sync'];

  it('passes when every related target is published', () => {
    const guides = [{ slug: 'dispatch', relatedGuides: ['tally-sync'] }];
    expect(findDanglingRelated(guides, published)).toEqual([]);
  });

  it('names the guide and the target it points nowhere at', () => {
    const guides = [{ slug: 'dispatch', relatedGuides: ['tally-sync', 'loading-sheet'] }];
    expect(findDanglingRelated(guides, published)).toEqual(['dispatch -> loading-sheet']);
  });

  it('tolerates a guide with no related list at all', () => {
    expect(findDanglingRelated([{ slug: 'dispatch' }], published)).toEqual([]);
  });
});
