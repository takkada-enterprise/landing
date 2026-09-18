import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import JourneyStrip from '../JourneyStrip';
import { STOPS } from '../../data/journey';
import { FEATURE_GROUPS } from '../../data/featureGroups';

afterEach(cleanup);

const inStop = FEATURE_GROUPS.find((g) => g.stop === 'remind').slugs[0];
const offJourney = FEATURE_GROUPS.find((g) => !g.stop).slugs[0];

const renderStrip = (slug) =>
  render(
    <MemoryRouter>
      <JourneyStrip slug={slug} />
    </MemoryRouter>
  );

describe('JourneyStrip', () => {
  it('marks the stop this feature belongs to', () => {
    renderStrip(inStop);
    expect(ui.getByText('Remind').closest('li')).toHaveAttribute('aria-current', 'step');
    expect(ui.getAllByRole('listitem')).toHaveLength(7);
  });

  it('marks exactly one stop, and it is the one the group names', () => {
    const { container } = renderStrip(inStop);
    const marked = [...container.querySelectorAll('li[aria-current="step"]')];
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe('Remind');
  });

  // The li is what the CSS hooks, but a screen-reader user tabs the seven
  // ANCHORS. With the mark on the li alone, focus lands on "Remind" and nothing
  // says it is the stop this page is at — the one thing the strip exists to
  // say. It goes on both, and stays on the li.
  it('marks the current stop on the link a keyboard user actually focuses', () => {
    const { container } = renderStrip(inStop);
    const marked = [...container.querySelectorAll('a[aria-current="step"]')];
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe('Remind');
    expect(marked[0].closest('li')).toHaveAttribute('aria-current', 'step');
    // Every other link says nothing.
    const links = [...container.querySelectorAll('a')];
    expect(links.filter((a) => a.hasAttribute('aria-current'))).toHaveLength(1);
  });

  // The strip is navigation, so it has to read as navigation: a labelled nav
  // wrapping an ordered list, because the seven stops are a sequence.
  it('is a labelled nav around an ordered list of the seven stops in order', () => {
    const { container } = renderStrip(inStop);
    const nav = container.querySelector('nav.journey-strip');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe("Where this sits in an invoice's journey");
    expect(nav.querySelector('ol')).not.toBeNull();
    expect([...nav.querySelectorAll('li')].map((li) => li.textContent)).toEqual(
      STOPS.map((s) => s.label)
    );
    expect(ui.getByText('One invoice, seven stops')).toBeTruthy();
  });

  // Every stop links back to its own station on the homepage story, which is
  // what makes the strip a way back into the narrative rather than decoration.
  // The homepage stations carry id="stop-<id>"; Layout's useScrollToHash is what
  // turns the hash into a scroll once the route lands.
  it('points every stop at its station on the homepage', () => {
    const { container } = renderStrip(inStop);
    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(STOPS.map((s) => `/#stop-${s.id}`));
  });

  it('renders nothing for a page that is not part of the journey', () => {
    const { container } = renderStrip(offJourney);
    expect(container).toBeEmptyDOMElement();
  });

  // A slug in no group at all is the case a `find(...).stop` would throw on.
  // Feature pages and the grouping are two files, and a new page lands in one
  // of them first; the strip has to be absent, never a crash.
  it('renders nothing for a slug that is in no group at all', () => {
    const { container } = renderStrip('a-slug-that-is-in-no-group');
    expect(container).toBeEmptyDOMElement();
  });
});
