// The <title> a blog post or guide is served with.
//
// CLAUDE.md §9 caps titles at 60 characters. The brand suffix used to be
// appended unconditionally (`${title} — Takkada`), which pushed 30 blog titles
// past the limit, so Google cut them off mid-word and the brand never showed
// anyway. The suffix is now added only when it fits, and a hand-written
// meta_title that ends in the brand loses it before it is allowed to run long.
// The separator is a pipe, matching every other page, because §5 bans the
// em-dash as a stylistic break.
//
// Plain ESM with no React import, so scripts/checkGuidePrerender.mjs can load
// it and assert against the exact string the route serves.

export const MAX_TITLE_LENGTH = 60;
export const BRAND_SUFFIX = ' | Takkada';

const TRAILING_BRAND = /\s*[|—–-]\s*Takkada\s*$/;

export function pageTitle(title, metaTitle) {
  const base = String(metaTitle || title || '').trim();
  if (metaTitle) {
    if (base.length <= MAX_TITLE_LENGTH) return base;
    return base.replace(TRAILING_BRAND, '');
  }
  const branded = `${base}${BRAND_SUFFIX}`;
  return branded.length <= MAX_TITLE_LENGTH ? branded : base;
}
