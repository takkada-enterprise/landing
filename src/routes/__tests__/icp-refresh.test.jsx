import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import MobileTally from '../MobileTally';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

afterEach(cleanup);

function renderPage() {
  return render(
    <MemoryRouter>
      <MobileTally />
    </MemoryRouter>
  );
}

// Phase 3 row 8. /mobile-tally is one of the six older feature pages that pull
// zero search entries. The refresh gave it the two things the ranking blog
// posts have and it did not, and fixed two live copy defects it had been
// carrying. These assertions are what stop either regressing.

describe('/mobile-tally after the Phase 3 refresh', () => {
  it('opens with a front-loaded answer directly under the h1', () => {
    const { container } = renderPage();
    const answer = container.querySelector('.feature-answer');
    expect(answer).not.toBeNull();

    // It must actually answer, not tease. The band matches the feature pages.
    const words = answer.textContent.trim().split(/\s+/);
    expect(words.length).toBeGreaterThanOrEqual(40);
    expect(words.length).toBeLessThanOrEqual(60);

    // And it must come before the walk-through content, because the value of
    // the block is being in the first 30% of the page.
    const h1 = container.querySelector('h1');
    expect(h1.compareDocumentPosition(answer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    const firstH2 = container.querySelector('h2');
    expect(answer.compareDocumentPosition(firstH2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('links out to blog posts that exist, under the titles they really carry', () => {
    const { container } = renderPage();
    const links = [...container.querySelectorAll('.feature-related-list a')];
    expect(links.length).toBeGreaterThanOrEqual(3);

    for (const link of links) {
      const slug = link.getAttribute('href').replace('/blog/', '');
      const file = resolve(repoRoot, `content/blog/${slug}.md`);
      expect(existsSync(file), `${slug} has no post on disk`).toBe(true);
      const title = readFileSync(file, 'utf-8').match(/^title:\s*"?(.+?)"?\s*$/m)?.[1];
      expect(link.textContent).toContain(title);
    }
  });

  // Both of these shipped in the page's FAQ copy and were live on takkada.com.
  it('names no retired plan', () => {
    const { container } = renderPage();
    const text = container.textContent;
    for (const retired of ['Voucher Model', 'Collections Model', 'Full Access', 'View Only']) {
      expect(text).not.toContain(retired);
    }
    // The specific wording that was live: "the Voucher and Collections plans".
    expect(text).not.toMatch(/Voucher and Collections plans/i);
  });

  it('quotes no price of its own in the FAQ', () => {
    const { container } = renderPage();
    // Scoped to the FAQ deliberately. CLAUDE.md §5 *wants* rupee amounts as
    // proof points, which is what the scenario paragraph uses them for
    // ("a UPI credit of ₹38,000"). §3 is the narrower rule: a price must be
    // derived from the rate card, never typed. The defect this catches is the
    // one that was live here, a hand-written extra-user rate in an answer.
    const faq = container.querySelector('.faq-list');
    expect(faq).not.toBeNull();
    expect(faq.textContent).not.toMatch(/₹/);
  });
});
