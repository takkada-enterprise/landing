import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import FeaturePage from '../../components/FeaturePage';
import { getFeaturePage } from '../../data/featurePages';
import { routeMetadata } from '../../data/siteMetadata';
import { heroContent } from '../../data/siteContent';

afterEach(cleanup);

// This file used to assert the opposite of what it asserts now, and that is the
// point of keeping it rather than deleting it.
//
// /tally-on-mobile shipped as `<Home seo={...} />`: the entire home page body
// served under a second canonical, deliberately, on the theory that an
// exact-match URL wins the head term. It did not. The Clarity week-of-07-26
// data had it pulling zero search entries, and a near-duplicate of / is the
// obvious explanation. The operator approved rebuilding it as its own page on
// 2026-08-08.
//
// The old test pinned the duplication in place: it asserted the page contained
// the home hero headline and the home pricing band. Anyone converting the route
// would have hit those two assertions and had to decide whether the test knew
// something they did not. So these assertions now state the reverse, with the
// reason, and the generic feature-page suites cover everything else about it.

const PAGE = getFeaturePage('tally-on-mobile');

function renderRoute() {
  return render(
    <MemoryRouter>
      <FeaturePage page={PAGE} />
    </MemoryRouter>
  );
}

describe('/tally-on-mobile', () => {
  it('is a feature page, not a second copy of the home page', () => {
    expect(PAGE).toBeDefined();
    const { container } = renderRoute();
    const text = container.textContent;

    // The two strings the old test required. Their presence here would mean
    // the homepage body is being served under this canonical again.
    expect(text).not.toContain(heroContent.headline);
    expect(text).not.toContain('₹2,900 to ₹8,500 per year. GST extra.');

    // And it carries the things a feature page has and the home clone did not.
    expect(container.querySelector('.feature-answer')).not.toBeNull();
    expect(container.querySelector('.feature-comparison-table')).not.toBeNull();
    expect(container.querySelectorAll('.feature-related-list a').length).toBeGreaterThan(0);
  });

  it('keeps the exact-match route registered, now via the page engine', () => {
    const entry = routeMetadata.find((r) => r.path === '/tally-on-mobile');
    expect(entry).toBeDefined();
    // Sourced from the data file, so sitemap lastmod tracks content edits.
    expect(entry.sourceFile).toBe('src/data/featurePages.js');
    expect(entry.sitemap).not.toBe(false);
  });

  it('still targets the head term in the h1 and the title', () => {
    const { container } = renderRoute();
    const h1 = container.querySelectorAll('h1');
    expect(h1).toHaveLength(1);
    expect(h1[0].textContent.toLowerCase()).toContain('tally on mobile');
    expect(PAGE.seo.title.toLowerCase()).toContain('tally on mobile');
    expect(PAGE.seo.title.length).toBeLessThanOrEqual(60);
  });
});
