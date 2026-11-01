import { describe, expect, it } from 'vitest';
import { slashInternalHrefs, withTrailingSlash } from './sitePath.js';

describe('withTrailingSlash', () => {
  it.each([
    ['/features', '/features/'],
    ['/blog/some-post', '/blog/some-post/'],
    ['/blog/some-post#faq', '/blog/some-post/#faq'],
    ['/demo?ref=nav', '/demo/?ref=nav'],
  ])('slashes the page path %s', (input, expected) => {
    expect(withTrailingSlash(input)).toBe(expected);
  });

  it.each([
    '/',
    '/#pricing',
    '/features/',
    '/llms.txt',
    '/assets/blog/x.png',
    '/assets/fonts/plex',
    '/cdn-cgi/l/email-protection',
    'https://takkada.com/features',
    '//cdn.example.com/x',
    '#tally',
    'mailto:admin@paysaathi.com',
  ])('leaves %s alone', (href) => {
    expect(withTrailingSlash(href)).toBe(href);
  });

  it('passes non-strings through (react-router object `to`)', () => {
    const to = { pathname: '/features' };
    expect(withTrailingSlash(to)).toBe(to);
  });
});

describe('slashInternalHrefs', () => {
  it('rewrites root-relative hrefs in markdown HTML and nothing else', () => {
    const html =
      '<a href="/features">a</a> <a href="https://x.com/y">b</a> <a href="/blog/p#q">c</a> <img src="/assets/a.png">';
    expect(slashInternalHrefs(html)).toBe(
      '<a href="/features/">a</a> <a href="https://x.com/y">b</a> <a href="/blog/p/#q">c</a> <img src="/assets/a.png">'
    );
  });
});
