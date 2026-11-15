import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FeaturesCatalog, { FEATURE_CATEGORIES } from '../FeaturesCatalog';
import { routeMetadata } from '../../data/siteMetadata';

afterEach(cleanup);

function renderCatalog() {
  return render(
    <MemoryRouter>
      <FeaturesCatalog />
    </MemoryRouter>
  );
}

describe('FeaturesCatalog component', () => {
  it('renders the section heading and eyebrow', () => {
    renderCatalog();
    expect(screen.getByText('FEATURES')).toBeTruthy();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Everything a Distributor Needs, in One App' })
    ).toBeTruthy();
  });

  it('renders all 8 feature categories', () => {
    const { container } = renderCatalog();
    const cards = container.querySelectorAll('.tk-card');
    expect(cards).toHaveLength(8);

    FEATURE_CATEGORIES.forEach((cat) => {
      expect(screen.getByRole('heading', { level: 3, name: cat.title })).toBeTruthy();
      expect(screen.getByText(cat.description)).toBeTruthy();
    });
  });

  it('every link points to an existing registered route with trailing slash', () => {
    const registered = new Set(routeMetadata.map((r) => r.path));
    renderCatalog();

    FEATURE_CATEGORIES.forEach((cat) => {
      cat.links.forEach((link) => {
        const pathNoTrailing = link.href.replace(/\/$/, '');
        expect(
          registered.has(pathNoTrailing),
          `link ${link.href} (${link.label}) is not in routeMetadata`
        ).toBe(true);
      });
    });
  });

  it('renders the trust strip with key promises', () => {
    const { container } = renderCatalog();
    const trust = container.querySelector('.tk-trust');
    expect(trust).toBeTruthy();
    expect(trust.textContent).toContain('Tally');
    expect(trust.textContent).toContain('Deep Tally Integration');
    expect(trust.textContent).toContain('Mobile-First');
    expect(trust.textContent).toContain('E-Invoicing & E-way Bill');
    expect(trust.textContent).not.toContain('No Transaction Fees');
  });

  it('toggles open state when details is clicked', () => {
    const { container } = renderCatalog();
    const firstDetails = container.querySelector('.tk-card');
    expect(firstDetails.open).toBe(false);

    const summary = firstDetails.querySelector('summary');
    fireEvent.click(summary);
  });
});
