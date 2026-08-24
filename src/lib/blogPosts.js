const modules = import.meta.glob('/content/blog/*.md', { eager: true });

const posts = Object.values(modules)
  .map((mod) => ({
    ...mod.default,
    heroImage: `/assets/blog/${mod.default.slug}.png`,
    heroAlt: mod.default.title,
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const postsBySlug = new Map(posts.map((p) => [p.slug, p]));
const cachedSlugs = posts.map((p) => p.slug);

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return postsBySlug.get(slug) || null;
}

export function getSlugs() {
  return cachedSlugs;
}

