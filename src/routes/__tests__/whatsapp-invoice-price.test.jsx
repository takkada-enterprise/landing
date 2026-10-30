import { describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({ Head: ({ children }) => children, ClientOnly: ({ children }) => children }));
vi.mock('../../data/siteContent', async (importOriginal) => {
  const m = await importOriginal();
  return {
    ...m,
    pricing: { ...m.pricing, plans: m.pricing.plans.map((p) => (p.plan === 'Momentum' ? { ...p, annualPrice: 5000 } : p)) },
  };
});

import WhatsAppInvoice from '../WhatsAppInvoice';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

describe('WhatsAppInvoice FAQ price', () => {
  it('is derived from the Momentum plan price, never hand-typed', () => {
    const { container } = render(<MemoryRouter><PhoneModalProvider><WhatsAppInvoice /></PhoneModalProvider></MemoryRouter>);
    expect(container.textContent).toContain('Momentum plan (₹5,000/year)');
    expect(container.textContent).not.toContain('₹4,500/year');
    expect(container.querySelectorAll('#capabilities .ui-card')).toHaveLength(4);
  });
});
