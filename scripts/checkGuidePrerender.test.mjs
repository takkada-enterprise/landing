import { describe, expect, it } from 'vitest';

import { inspectGuidePage, expectationsFor, CHECKED_PREFIX, GUIDE_HUB } from './checkGuidePrerender.mjs';

// A prerender guard is worth exactly as much as the pages it rejects. The two
// cases that matter are below and must stay red forever:
//
//   - an empty #root, which is what a lazy route that stopped being resolved
//     at build time produces; and
//   - a shell carrying only the reader's own not-found heading, which is what
//     a broken slug, a renamed file or a dropped includedRoutes entry
//     produces. That page has an <h1> and real prose, so a "has a heading and
//     five paragraphs" check — the shape checkBlogPrerender uses — waves it
//     straight through. This is the failure mode a manual has and a blog does
//     not, and it is the reason this file exists.

const expected = {
  path: '/guide/dispatch',
  slug: 'dispatch',
  h1: 'How to load and dispatch goods',
  title: 'How to load and dispatch goods in Takkada',
  description: 'Load a van and record what went out.',
  checkedAgainstAppOn: '2026-09-07',
};

const shell = (body, head = '') => `<!DOCTYPE html><html><head>${head}</head><body><div id="root">${body}</div></body></html>`;

const HEAD = `<title>${expected.title}</title><meta name="description" content="${expected.description}"><link rel="canonical" href="https://takkada.com/guide/dispatch/">`;

const goodBody = `<main class="guide-page" data-guide-slug="dispatch"><h1>${expected.h1}</h1><p class="guide-checked">${CHECKED_PREFIX}${expected.checkedAgainstAppOn}</p><p>Open Dispatch.</p></main>`;

describe('checkGuidePrerender', () => {
  it('passes a real, fully rendered guide page', () => {
    expect(inspectGuidePage(shell(goodBody, HEAD), expected)).toEqual([]);
  });

  it('fails an empty root', () => {
    const html = `<!DOCTYPE html><html><head>${HEAD}</head><body><div id="root"></div></body></html>`;
    expect(inspectGuidePage(html, expected)).toEqual(['prerendered as an empty shell (#root is empty)']);
  });

  it('fails a shell carrying only the not-found heading', () => {
    const notFound = '<main class="guide-page guide-page--missing"><h1>Guide not found</h1><p>That guide has moved.</p><a href="/guide">All guides</a></main>';
    const errors = inspectGuidePage(shell(notFound, HEAD), expected);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.join('\n')).toMatch(/h1 is "Guide not found"/);
    expect(errors.join('\n')).toMatch(/data-guide-slug is null/);
  });

  it('fails a page that renders another guide entirely', () => {
    const other = goodBody.replace('dispatch', 'tally-sync').replace(expected.h1, 'How to check and fix Tally sync');
    expect(inspectGuidePage(shell(other, HEAD), expected).length).toBeGreaterThan(0);
  });

  it('fails when the checked-against-the-app line is missing', () => {
    const body = goodBody.replace(`${CHECKED_PREFIX}${expected.checkedAgainstAppOn}`, 'Recently checked');
    expect(inspectGuidePage(shell(body, HEAD), expected)).toEqual([
      `missing the line "${CHECKED_PREFIX}${expected.checkedAgainstAppOn}"`,
    ]);
  });

  it('fails a stale date rather than accepting any date at all', () => {
    const body = goodBody.replace(expected.checkedAgainstAppOn, '2025-01-01');
    expect(inspectGuidePage(shell(body, HEAD), expected).length).toBeGreaterThan(0);
  });

  it('fails a blog canonical left behind on a guide page', () => {
    const head = HEAD.replace('/guide/dispatch/', '/blog/dispatch/');
    expect(inspectGuidePage(shell(goodBody, head), expected).join('\n')).toMatch(/canonical is/);
  });

  it('fails a second h1 on the page', () => {
    const body = `${goodBody}<h1>${expected.h1}</h1>`;
    expect(inspectGuidePage(shell(body, HEAD), expected)).toContain('expected exactly one h1, found 2');
  });

  it('reads an escaped apostrophe back as the author wrote it', () => {
    const withQuote = { ...expected, description: "Your company's dispatch setting." };
    const head = HEAD.replace(expected.description, 'Your company&#x27;s dispatch setting.');
    expect(inspectGuidePage(shell(goodBody, head), withQuote)).toEqual([]);
  });
});

describe('expectationsFor', () => {
  const topics = [
    { id: 'dispatch', slug: 'dispatch' },
    { id: 'entries-waiting-approval', slug: 'entries-waiting-approval' },
  ];
  const guides = [
    {
      slug: 'dispatch',
      title: expected.h1,
      metaTitle: expected.title,
      metaDescription: expected.description,
      checkedAgainstAppOn: expected.checkedAgainstAppOn,
    },
  ];

  it('always expects the hub, then one page per publishable topic', () => {
    const pages = expectationsFor(topics, guides);
    expect(pages[0]).toMatchObject({ file: 'dist/guide/index.html', h1: GUIDE_HUB.h1 });
    expect(pages.map((p) => p.file)).toEqual([
      'dist/guide/index.html',
      'dist/guide/dispatch/index.html',
    ]);
  });

  it('flags a topic with no markdown instead of skipping it', () => {
    const pages = expectationsFor([...topics, { id: 'ghost', slug: 'ghost' }], guides);
    expect(pages.at(-1)).toMatchObject({ file: 'dist/guide/ghost/index.html', missingContent: true });
  });

  it('falls back to the site title suffix when a guide has no meta_title', () => {
    const [, page] = expectationsFor(topics, [{ ...guides[0], metaTitle: null }]);
    expect(page.title).toBe(`${expected.h1} — Takkada`);
  });
});
