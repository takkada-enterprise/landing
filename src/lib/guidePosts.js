// guidePosts — the public manual's content, loaded the way the blog loads its
// posts: one eager import.meta.glob over content/guide/*.md, transformed at
// build time by markdownPlugin() in vite.config.js into `{ ...frontmatter,
// slug, html, faqs }`.
//
// "Eager" is the important word. Every guide's rendered HTML is compiled into
// whichever chunk imports this file, so this module must only ever be reached
// through the lazy /guide and /guide/:slug routes in src/routes/index.jsx.
// Importing it from Home, Layout, or anything the homepage pulls in would put
// the whole manual into the landing bundle — the exact regression the blog
// already had once, which is why blogPosts.js carries the same warning.
//
// One normalisation happens here and nowhere else. An unquoted YAML date such
// as `checkedAgainstAppOn: 2026-09-07` is parsed by gray-matter into a real
// Date, and markdownPlugin JSON-stringifies it, so what actually reaches the
// browser is '2026-09-07T00:00:00.000Z'. Rendering that would put a timestamp
// in a sentence a human is meant to read and would break the build guard that
// greps for the exact checked line. toCheckedDate() puts it back to the
// calendar day the author wrote — a pure string trim, never a timezone-shifted
// re-derivation, so a guide checked on the 7th cannot be published as the 6th.

const modules = import.meta.glob('/content/guide/*.md', { eager: true });

export function toCheckedDate(value) {
  if (typeof value === 'string') {
    const match = value.match(/^(\d{4}-\d{2}-\d{2})/);
    if (match) return match[1];
    return '';
  }
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return '';
}

const guides = Object.values(modules)
  .map((mod) => mod.default)
  .map((guide) => ({
    ...guide,
    checkedAgainstAppOn: toCheckedDate(guide.checkedAgainstAppOn),
    relatedGuides: Array.isArray(guide.relatedGuides) ? guide.relatedGuides : [],
  }))
  .sort((a, b) => a.title.localeCompare(b.title));

const guidesBySlug = new Map(guides.map((guide) => [guide.slug, guide]));
const cachedSlugs = guides.map((guide) => guide.slug);

export function getAllGuides() {
  return guides;
}

export function getGuideBySlug(slug) {
  return guidesBySlug.get(slug) || null;
}

export function getGuideSlugs() {
  return cachedSlugs;
}
