import { describe, expect, it } from 'vitest';
import { relatedPostsFor } from '../BlogPost';
import { getAllPosts } from '../../lib/blogPosts';

describe('related posts ring', () => {
  const posts = getAllPosts();

  it('gives every post three related posts, never itself', () => {
    for (const post of posts) {
      const related = relatedPostsFor(post.slug);
      expect(related).toHaveLength(3);
      expect(related.map((p) => p.slug)).not.toContain(post.slug);
    }
  });

  it('links every post from at least three other posts', () => {
    const inbound = new Map(posts.map((p) => [p.slug, 0]));
    for (const post of posts) {
      for (const r of relatedPostsFor(post.slug)) inbound.set(r.slug, inbound.get(r.slug) + 1);
    }
    expect([...inbound].filter(([, n]) => n < 3)).toEqual([]);
  });

  it('keeps neighbours in the same category where the category allows', () => {
    const sample = [
      { slug: 'a1', category: 'A', date: '2026-01-03' },
      { slug: 'a2', category: 'A', date: '2026-01-02' },
      { slug: 'a3', category: 'A', date: '2026-01-01' },
      { slug: 'a4', category: 'A', date: '2025-12-31' },
      { slug: 'b1', category: 'B', date: '2026-01-01' },
    ];
    expect(relatedPostsFor('a1', sample).map((p) => p.slug)).toEqual(['a2', 'a3', 'a4']);
    expect(relatedPostsFor('a3', sample).map((p) => p.slug)).toEqual(['a4', 'b1', 'a1']);
  });
});
