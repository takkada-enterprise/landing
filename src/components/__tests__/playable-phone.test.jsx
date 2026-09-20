import { afterEach, describe, it, expect } from 'vitest';
import { cleanup, render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayablePhone from '../PlayablePhone';
import { HOTSPOTS } from '../../data/heroHotspots';
import { FEATURE_PAGES, featurePagePath } from '../../data/featurePages';

const FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };
const mount = () => render(<MemoryRouter future={FUTURE}><PlayablePhone /></MemoryRouter>);

afterEach(cleanup);

describe('PlayablePhone', () => {
  it('shows the real home screen', () => {
    mount();
    expect(ui.getByAltText(/home screen/i)).toBeInTheDocument();
  });
  it('makes every hotspot a link to a real feature page, named for where it goes', () => {
    mount();
    const paths = new Set(FEATURE_PAGES.map(featurePagePath));
    const links = ui.getAllByRole('link');
    expect(links).toHaveLength(HOTSPOTS.length);
    for (const h of HOTSPOTS) {
      const a = ui.getByRole('link', { name: `${h.label}: see how it works` });
      expect(a).toHaveAttribute('href', h.href);
      expect(paths.has(h.href), h.href).toBe(true);
    }
  });
  it('opens nothing in place: no buttons, no second screen', () => {
    mount();
    expect(ui.queryAllByRole('button')).toHaveLength(0);
    expect(ui.getAllByRole('img')).toHaveLength(1);
  });
});
