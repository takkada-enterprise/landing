import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Render the JSON-LD <script>s inline into the test container instead of
// routing them through react-helmet-async's async document.head writes.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import BlogPost from '../BlogPost';
import { getAllPosts, getPostBySlug } from '../../lib/blogPosts';

afterEach(cleanup);

// A FAQ-bearing post and the FAQ-less stub, both real corpus entries.
const FAQ_SLUG = 'khatabook-alternative-for-distributors-india';
const FAQLESS_SLUG = 'distributor-cash-flow-receivables';

function renderPost(slug) {
  const { container } = render(
    <MemoryRouter initialEntries={[`/blog/${slug}`]}>
      <Routes>
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

describe('BlogPost FAQPage schema', () => {
  it('emits a FAQPage whose mainEntity count equals the post pair count', () => {
    const post = getPostBySlug(FAQ_SLUG);
    expect(post.faqs.length).toBeGreaterThan(0);
    const { schemas } = renderPost(FAQ_SLUG);
    const faq = byType(schemas, 'FAQPage');
    expect(faq).toBeDefined();
    expect(faq.mainEntity).toHaveLength(post.faqs.length);
    expect(faq.mainEntity[0]).toMatchObject({
      '@type': 'Question',
      name: post.faqs[0].question,
      acceptedAnswer: { '@type': 'Answer', text: post.faqs[0].answer },
    });
  });

  it('keeps Article and BreadcrumbList present alongside the FAQPage', () => {
    const { schemas } = renderPost(FAQ_SLUG);
    expect(byType(schemas, 'Article')).toBeDefined();
    expect(byType(schemas, 'BreadcrumbList')).toBeDefined();
  });

  it('omits the FAQPage (and any falsy entry) for a post with no FAQ section', () => {
    const post = getPostBySlug(FAQLESS_SLUG);
    expect(post.faqs).toEqual([]);
    const { schemas } = renderPost(FAQLESS_SLUG);
    expect(byType(schemas, 'FAQPage')).toBeUndefined();
    expect(schemas.every(Boolean)).toBe(true);
    // Article and breadcrumb still render for the stub.
    expect(byType(schemas, 'Article')).toBeDefined();
    expect(byType(schemas, 'BreadcrumbList')).toBeDefined();
  });

  it('populates post.faqs for every FAQ-bearing corpus post (only the stub is empty)', () => {
    const posts = getAllPosts();
    const withFaqs = posts.filter((p) => Array.isArray(p.faqs) && p.faqs.length > 0);
    const withoutFaqs = posts.filter((p) => !Array.isArray(p.faqs) || p.faqs.length === 0);
    // Dynamic counts so adding articles does not break this assertion.
    expect(withFaqs.length).toBe(posts.length - withoutFaqs.length);
    expect(withFaqs.length).toBeGreaterThan(0);
    // The known FAQ-less stub is empty.
    expect(getPostBySlug(FAQLESS_SLUG).faqs).toEqual([]);
  });
});
