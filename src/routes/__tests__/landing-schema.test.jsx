import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render the JSON-LD <script>s inline into the test container instead of
// routing them through react-helmet-async's async document.head writes.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import MobileTally from '../MobileTally';
import AutoReconciliation from '../AutoReconciliation';
import WhatsAppInvoice from '../WhatsAppInvoice';
import ForDistributors from '../ForDistributors';
import { routeMetadata } from '../../data/siteMetadata';

afterEach(cleanup);

const ROUTES = [
  { name: 'MobileTally', Comp: MobileTally, canonical: 'https://takkada.com/mobile-tally/', routePath: '/mobile-tally' },
  { name: 'AutoReconciliation', Comp: AutoReconciliation, canonical: 'https://takkada.com/auto-reconciliation-tally/', routePath: '/auto-reconciliation-tally' },
  { name: 'WhatsAppInvoice', Comp: WhatsAppInvoice, canonical: 'https://takkada.com/whatsapp-invoice-tally/', routePath: '/whatsapp-invoice-tally' },
  { name: 'ForDistributors', Comp: ForDistributors, canonical: 'https://takkada.com/for-distributors/', routePath: '/for-distributors' },
];

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));

function renderRoute(Comp) {
  const { container } = render(
    <MemoryRouter>
      <Comp />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

describe.each(ROUTES)('$name landing schema', ({ Comp, canonical }) => {
  it('emits a BreadcrumbList whose trail ends at the page path', () => {
    const { schemas } = renderRoute(Comp);
    const crumb = byType(schemas, 'BreadcrumbList');
    expect(crumb).toBeDefined();
    const last = crumb.itemListElement[crumb.itemListElement.length - 1];
    expect(last.item).toBe(canonical);
  });

  it('emits breadcrumb item URLs that are absolute and resolve to real routes', () => {
    const { schemas } = renderRoute(Comp);
    const crumb = byType(schemas, 'BreadcrumbList');
    for (const entry of crumb.itemListElement) {
      expect(entry.item.startsWith('https://takkada.com')).toBe(true);
      const path = '/' + entry.item.replace('https://takkada.com/', '').replace(/\/$/, '');
      expect(KNOWN_ROUTES.has(path === '/' ? '/' : path)).toBe(true);
    }
  });

  it('emits a FAQPage whose mainEntity count equals the visible questions', () => {
    const { container, schemas } = renderRoute(Comp);
    const faq = byType(schemas, 'FAQPage');
    expect(faq).toBeDefined();
    const visibleQuestions = container.querySelectorAll('.faq-question');
    expect(faq.mainEntity).toHaveLength(visibleQuestions.length);
    expect(faq.mainEntity.length).toBeGreaterThan(0);
    // Every schema question also appears verbatim in the DOM.
    const domText = container.textContent;
    for (const q of faq.mainEntity) {
      expect(domText).toContain(q.name);
    }
  });

  it('emits a SoftwareApplication with the org publisher @id', () => {
    const { schemas } = renderRoute(Comp);
    const app = byType(schemas, 'SoftwareApplication');
    expect(app).toBeDefined();
    expect(app.publisher).toEqual({ '@id': 'https://takkada.com/#organization' });
  });
});
