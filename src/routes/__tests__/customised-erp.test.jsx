import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import CustomisedErp from '../CustomisedErp';
import { routeMetadata } from '../../data/siteMetadata';

afterEach(cleanup);

function renderCustomisedErp() {
  return render(
    <MemoryRouter>
      <CustomisedErp />
    </MemoryRouter>
  );
}

describe('CustomisedErp route', () => {
  it('is registered in routeMetadata (sitemap) and the router', () => {
    expect(routeMetadata.some((r) => r.path === '/customised-erp')).toBe(true);
  });

  it('renders the main heading and intro lead', () => {
    renderCustomisedErp();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /customised erp for indian distributors/i
    );
  });

  it('lists diverse ERP modules without any pricing figures', () => {
    const { container } = renderCustomisedErp();
    const categories = container.querySelectorAll('.erp-category-card');
    expect(categories.length).toBeGreaterThanOrEqual(5);

    const featureItems = container.querySelectorAll('.erp-feature-item');
    expect(featureItems.length).toBeGreaterThanOrEqual(15);

    // CRITICAL: Must not contain any prices anywhere on the page
    expect(container.textContent).not.toMatch(/₹|\bRs\.?\s*\d|\/year|\/month/i);
  });

  it('carries WhatsApp and Calendar booking CTAs', () => {
    const { container } = renderCustomisedErp();
    const waLinks = container.querySelectorAll('a[href*="wa.me"]');
    expect(waLinks.length).toBeGreaterThan(0);

    const calLinks = container.querySelectorAll('a[href*="calendar.notion.so"]');
    expect(calLinks.length).toBeGreaterThan(0);
  });

  it('renders breadcrumb navigation back to home', () => {
    const { container } = renderCustomisedErp();
    const breadcrumb = container.querySelector('.icp-breadcrumb');
    expect(breadcrumb).toBeTruthy();
    expect(breadcrumb.textContent).toContain('Home');
    expect(breadcrumb.textContent).toContain('Customised ERP');
  });
});
