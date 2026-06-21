// Author registry — the single source of truth for blog post authorship.
//
// Posts reference an author by a stable key in frontmatter (e.g.
// `author: "founder"`). Keeping identity here, not inline in the ~98 post
// files, means credentials live in one place and a future /authors/<slug>
// page can read the same source without touching content.
//
// Resolution is graceful: an unknown key (including the legacy
// "Takkada Team" string) returns null, and src/data/schema.js falls back to
// the Organization-typed author so unmigrated posts never lose their byline.
//
// This file is pure data + a lookup. It must not import from schema.js — the
// org `@id` anchor and absolute-URL handling are applied there, which keeps
// the dependency one-directional (schema.js → authors.js).

export const authors = {
  // Founder. Name matches the public scheduling handle (calendar.notion.so/
  // meet/ronakmalu) and CLAUDE.md §13. jobTitle and bio are factual and carry
  // no fabricated credentials (landing voice rules, CLAUDE.md §5).
  //
  // A linked-in URL lights up the byline link and the Person `sameAs`. When it
  // is null the byline renders as plain text and `sameAs` is omitted (no
  // placeholder URL ever ships).
  founder: {
    name: 'Ronak Maloo',
    jobTitle: 'Founder',
    bio:
      'Ronak Maloo founded Pay Saathi Innovation LLP in Guwahati and built Takkada for Indian distributors and wholesalers who run their books on Tally. He works directly with distributors and Tally partners on receivables collection, UPI payments, and reconciliation.',
    // Future /authors/founder page; null until that page exists.
    url: null,
    linkedin: 'https://www.linkedin.com/in/ronak-maloo/',
    knowsAbout: [
      'Tally',
      'Accounts receivable',
      'UPI payment collection',
      'GST e-invoicing',
      'Distribution and wholesale operations in India',
    ],
  },

  // Second author. Operator chose name + LinkedIn only, no jobTitle/bio, so the
  // Person node carries name, sameAs, worksFor, and the topics he writes about.
  harsh: {
    name: 'Harsh Bhudolia',
    url: null,
    linkedin: 'https://www.linkedin.com/in/harsh-bhudolia/',
    knowsAbout: [
      'UPI payment collection',
      'Accounts receivable',
      'Distribution and wholesale operations in India',
      'Tally',
    ],
  },
};

/**
 * Resolve an author key to its registry entry.
 * @param {string|undefined|null} key - frontmatter `author` value
 * @returns {object|null} the author record, or null when the key is unknown
 */
export function getAuthor(key) {
  if (!key) return null;
  return authors[key] ?? null;
}
