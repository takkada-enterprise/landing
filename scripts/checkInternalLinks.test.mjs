import { describe, expect, it } from 'vitest';
import { analyse, internalHrefs, pagePathFor } from './checkInternalLinks.mjs';

describe('checkInternalLinks', () => {
  it('maps a dist file to its page path', () => {
    expect(pagePathFor('/d', '/d/index.html')).toBe('/');
    expect(pagePathFor('/d', '/d/blog/x/index.html')).toBe('/blog/x/');
  });

  it('reads anchor hrefs only, not <link> tags', () => {
    const html = '<link rel="canonical" href="/x"><a class="a" href="/features">f</a><a href="https://e.com">e</a>';
    expect(internalHrefs(html)).toEqual(['/features']);
  });

  it('flags slash-less hrefs, orphans and weakly linked pages', () => {
    const pages = [
      { path: '/', html: '<a href="/a/">a</a><a href="/b">b</a>' },
      { path: '/a/', html: '<a href="/a/">self</a><a href="/b/#x">b</a>' },
      { path: '/b/', html: '<a href="/">home</a>' },
    ];
    const { slashless, orphans, weak } = analyse(pages, ['/', '/a/', '/b/', '/c/']);
    expect([...slashless.keys()]).toEqual(['/b']);
    // A self-link does not count as inbound.
    expect(orphans).toEqual(['/c/']);
    expect(weak.map((w) => w.path)).toEqual(['/', '/a/', '/b/']);
  });
});
