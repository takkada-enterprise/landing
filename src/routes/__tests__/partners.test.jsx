// /partners on the Campfire template (plan 2026-10-30-003, Task 6): hero,
// three cards on how a partner earns, the benefits, the current partner
// sections as alternating rows, FAQ and a dark close band to WhatsApp.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Partners from '../Partners';
import { PARTNER_EARN, PARTNER_WA_MESSAGE, partnerFaqs, clientWins, audienceList } from '../../data/partners';
import { PhoneModalProvider, usePhoneModal } from '../../context/PhoneModalContext';

afterEach(cleanup);

function ModalProbe() {
  const { open, options } = usePhoneModal();
  return open ? <output data-testid="phone-modal">{options.title}</output> : null;
}

function renderPage() {
  const { container } = render(
    <MemoryRouter>
      <PhoneModalProvider>
        <Partners />
        <ModalProbe />
      </PhoneModalProvider>
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

describe('/partners', () => {
  it('opens on the dark band with the partner headline', () => {
    const { container } = renderPage();
    const hero = container.querySelector('section.ui-band--band');
    expect(hero.querySelector('h1.ui-hero-title').textContent).toBe('One customer, two products, and you earn on both.');
  });

  it('leads with the three ways a partner earns, in order', () => {
    const { container } = renderPage();
    const titles = [...container.querySelectorAll('#how-you-earn .ui-card .ui-card-title')].map(
      (h) => h.textContent
    );
    expect(titles).toEqual([
      'Recurring commission on every sale',
      'Your first three customers, done with you',
      'Paid on the 5th, by UPI',
    ]);
    expect(titles).toEqual(PARTNER_EARN.map((c) => c.title));
  });

  // CLAUDE.md §4: the agreement governs the commercials, so no percentage is
  // published anywhere on the page, the JSON-LD included.
  it('publishes no commission percentage anywhere', () => {
    const { container } = renderPage();
    expect(container.textContent).not.toMatch(/\d+\s?%/);
  });

  it('keeps the client-wins and audience sections as alternating rows', () => {
    const { container } = renderPage();
    const rows = [...container.querySelectorAll('.ui-altrow')];
    expect(rows).toHaveLength(2);
    expect(rows[1].classList.contains('ui-altrow--flip')).toBe(true);
    for (const line of [...clientWins, ...audienceList]) {
      expect(container.textContent).toContain(line);
    }
  });

  it('opens the founder booking modal from the hero pill', () => {
    renderPage();
    fireEvent.click(screen.getAllByRole('button', { name: /book a meeting with the founder/i })[0]);
    expect(screen.getByTestId('phone-modal').textContent).toBe('Talk to the founder');
  });

  it('closes on the dark band with a WhatsApp pill to become a partner', () => {
    const { container } = renderPage();
    const pill = container.querySelector('.ui-close a.ui-pill');
    expect(pill.textContent).toContain('Become a partner');
    const text = decodeURIComponent(pill.getAttribute('href').split('?text=')[1] ?? '');
    expect(text).toBe(PARTNER_WA_MESSAGE);
  });

  it('renders every FAQ and emits FAQPage and BreadcrumbList schema', () => {
    const { container, schemas } = renderPage();
    expect(container.querySelectorAll('#faq .faq-item')).toHaveLength(partnerFaqs.length);
    expect(schemas.find((s) => s['@type'] === 'FAQPage').mainEntity).toHaveLength(partnerFaqs.length);
    expect(schemas.find((s) => s['@type'] === 'BreadcrumbList').itemListElement.at(-1).item).toBe(
      'https://takkada.com/partners/'
    );
  });

  it('derives the earn and benefit grids from their counts', () => {
    const { container } = renderPage();
    expect(container.querySelector('#how-you-earn .ui-grid--3')).not.toBeNull();
    expect(container.querySelector('#why-partner .ui-grid--2')).not.toBeNull();
  });

  it('carries no overline or eyebrow', () => {
    const { container } = renderPage();
    expect(container.querySelector('[class*="overline"], [class*="section-label"]')).toBeNull();
  });
});
