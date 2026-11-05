# Repo Map — landing (takkada.com public marketing site, statically generated)

Structure and patterns only — never record live state (prices, schema, deploy status) here; verify those live. Update this file in the same commit as any structural change.

## Stack

- Vite + React + `react-router-dom`, prerendered by **`vite-react-ssg`** (`src/main.jsx`
  exports `createRoot` from `ViteReactSSG`). No TypeScript, no Tailwind, no CSS-in-JS —
  plain `.jsx` plus five hand-written stylesheets imported in a fixed order
  (`src/main.jsx:5` — fonts first, then `styles.css` → `premium.css` → `home.css` →
  `feature-page.css`; `premium.css` overrides tokens, so order is load-bearing).
- Head management is `vite-react-ssg`'s own `Head` (`src/components/Seo.jsx:21`). Do not add
  a second head library — CLAUDE.md §8.
- Markdown blog posts are compiled by an **in-repo Vite plugin** (`vite.config.js:13`):
  gray-matter frontmatter + `marked` HTML + parsed FAQs, emitted as a default-export object.
- Tests: vitest + jsdom + Testing Library (`vite.config.js:77`, setup `src/test/setup.js`).
- Deploy is **Cloudflare on merge to `main`**; the only workflow file
  (`.github/workflows/deploy.yml:1`, GitHub Pages) is recorded by CLAUDE.md §8 as
  intentionally not the deploy path. Apex domain via `CNAME` (root, mirrored in `public/`).

## Directory map

| Path | Purpose |
|---|---|
| `src/routes/` | One `.jsx` per hand-written page + `index.jsx`, the router table |
| `src/routes/index.jsx` | Route registry: elements looked up per path, children built from `routeMetadata`; throws at import time if a metadata path has no element (`:45`) |
| `src/components/` | Shared vocabulary: `Seo`, `FeaturePage`, `Breadcrumb`, `FAQItem`, `CTAButton`, `PhoneMockup`, CTA variants |
| `src/data/` | **The content layer.** `siteContent.js` (homepage + pricing), `siteMetadata.js` (route registry), `featurePages*.js` (feature landing pages), `featureGroups.js` (/features hub grouping), `schema.js` (JSON-LD), `authors.js` |
| `src/lib/` | `blogPosts.js` (glob loader), `parseFaqs.js`, `demoBooking.js`, `whatsapp.js`, `track.js` |
| `content/blog/` | The published post corpus, one `.md` per post — the source of truth for the blog |
| `content/blog-drafts/` | Raw multi-post drafts, converted by `scripts/import-seo-drafts.mjs` |
| `scripts/` | Build-chain generators (`generate-sitemap`, `generate-llms-txt`) and post-build guards (`check*.mjs`), each with a co-located `.test.mjs` |
| `public/` | Served verbatim: `robots.txt`, `llms.txt` (generated but committed), `_redirects`, `404.html`, `CNAME`, `assets/{blog,og,screenshots,fonts}` |
| `docs/plans/`, `docs/brainstorms/` | Plans and requirements docs of record |
| `docs/ops/` | Operator-owned loops: `measurement-loop.md`, `measurement-log.md`, `off-site-presence-geo.md` |
| `.github/prompts/` | Design/brand prompt packs. Not CI — nothing reads them at build time |
| `.claude/` | `commands/blog-batch.md` + `skills/blog-batch/` — the 10-article content pipeline |

## Key patterns

- **One route registry, many consumers.** `routeMetadata` (`src/data/siteMetadata.js:19`) is
  loaded by the router, the sitemap generator and the llms.txt generator, so it must stay
  JSX-free and Node-ESM loadable (extensions in import specifiers are mandatory). An entry's
  optional `llms: {section,title,summary}` block is what puts a page into `public/llms.txt`;
  `sitemap: false` keeps an alias routable but out of `sitemap.xml`
  (`src/data/siteMetadata.js:178`, honoured at `scripts/generate-sitemap.mjs:58`).
- **Feature landing pages are data, not components.** `FEATURE_PAGES`
  (`src/data/featurePages.js:1400`) concatenates four batch files; `featureRouteMetadata`
  (`:1424`) and `featureFooterLinks` (`:1433`) are derived from it, and
  `src/components/FeaturePage.jsx:116` renders any one of them. Adding a page is an object,
  **plus** a slug in `src/data/featureGroups.js:30` and a regenerated `llms.txt` — the
  three-edit rule the file header states.
- **The /features hub is the crawl parent.** `FEATURE_GROUPS` plus `LEAD_FEATURE_SLUGS`
  (`src/data/featureGroups.js:200`) drive the hub's tiers, the header disclosure panel
  (`src/Layout.jsx:99`) and the footer's Features column (`src/data/siteContent.js:14`).
- **Prices are derived, never typed.** `formatInr` (`src/data/siteContent.js:421`) and
  `planPricing` (`:439`) turn `annualPrice` numbers into every rupee string; a feature page
  names a plan and resolves it (`src/components/FeaturePage.jsx:94`). Rate-card blocks that
  are not plan columns live beside it (`biggerSetups`, `:585`).
- **SEO is one component.** `Seo` (`src/components/Seo.jsx:21`) emits title, description,
  canonical, OG, Twitter and an array of JSON-LD blocks; canonicals come from `absoluteUrl`
  (`src/data/schema.js:33`), which forces the apex host and a trailing slash. Site-wide
  Organization/WebSite schema is injected once in the layout (`src/Layout.jsx:444`).
- **Blog payload is deliberately split out.** `src/lib/blogPosts.js:1` is an eager
  `import.meta.glob` over `content/blog/*.md`, so the blog routes are lazily imported
  (`src/routes/index.jsx:71`) to keep the whole corpus out of the main bundle. They are still
  prerendered — `scripts/checkBlogPrerender.mjs` fails the build if a post ships as a shell.
- **Fonts are self-hosted and generated.** `src/fonts.css` is written by
  `scripts/vendorFonts.mjs` and must not be hand-edited; `index.html:10` documents why the
  files are deliberately *not* preloaded (it regressed LCP).

## Content & page conventions

- **Homepage and shared copy** live in `src/data/siteContent.js` (nav links at `:21`,
  pricing at `:460`). Components read from it; copy is not inlined in JSX.
- **A hand-written page** = a `src/routes/*.jsx` file + an entry in `routeMetadata` + an
  element line in `src/routes/index.jsx`. Nav entries that point at a homepage anchor carry
  an anchor contract: the `#id` must exist on the rendered Home page.
- **A feature landing page** = one object in a `featurePages*.js` batch. Its shape is
  documented as a JSDoc typedef at `src/data/featurePages.js:31`: `searchPhrase` must appear
  verbatim in `headline` and `seo.title`, `answer` is the front-loaded AI-citable block, and
  `comparison`, `planPointer`, `faqs`, `relatedPosts` are all required content slots.
  `relatedPosts` duplicates post titles on purpose (importing `blogPosts.js` here would undo
  the bundle split); `src/data/__tests__/feature-pages.test.js` pins them against disk.
- **A blog post** = one `content/blog/*.md` with frontmatter
  (`title, slug, meta_title, meta_description, primary_keyword, date, updated, author,
  category, excerpt`), where `author` is a key into `src/data/authors.js` and `updated` feeds
  `dateModified`. Body opens with the **lead-answer paragraph** before any `##`, then an FAQ
  section that `src/lib/parseFaqs.js` lifts into FAQPage schema. Every post needs a hero PNG
  at `public/assets/blog/<slug>.png` — the path is derived with no existence check
  (`scripts/checkBlogImages.mjs:3`).
- **Retiring a post in favour of a landing page** means deleting the markdown *and* adding a
  301 pair to `public/_redirects`; a rule alone is a no-op while the post still builds
  (`public/_redirects:4`).

## Tests & CI gates

- `npm test` — vitest single run. Suites sit beside what they cover: `src/routes/__tests__/`
  (page + schema + pricing-table tests), `src/data/__tests__/` (feature pages, hub coverage,
  internal links, redirects), `src/components/__tests__/`, `src/__tests__/fonts.test.js`,
  and `scripts/*.test.mjs` for the guards themselves.
- `npm run build` (`package.json:9`) is the real gate and runs, in order: `lint:content`
  (`checkLeadAnswer`) → `generate-llms-txt` → `vite-react-ssg build` → `generate-sitemap` →
  `checkImagePreloads` → `checkBlogImages` → `checkBlogPrerender` → `checkRoutePrerender` →
  `checkFeaturesHub` → `checkImageBudgets`. **Unit tests are not in this chain** — run them
  separately.
- Guards assert on **raw `dist/` HTML**, because a client-rendered shell still returns 200 and
  still passes every jsdom test. `checkRoutePrerender` is the general form (every route in
  `routeMetadata` enrols automatically); the others are per-surface.
- `npm run audit:freshness` and `npm run audit:crawlers` are **reports, not gates** — content
  ageing must not turn into a red build (`scripts/checkContentFreshness.mjs:10`).
- **Merges into `main` use `gh pr merge <n> --merge`, never squash**
  (`docs/plans/2026-06-21-001-DEPLOY-HANDOFF.md:54`). `main` is PR-protected, so direct
  pushes are rejected.

## Conventions & traps

- **`features-hub-card` is a build contract, not a style hook.** `scripts/checkFeaturesHub.mjs:40`
  keys its coverage regex on that class; renaming it, or dropping it from one hub tier because
  that tier stopped looking like a card, silently un-covers every page in it. The first version
  of this guard searched the whole document and could never fail, because the footer links
  every feature page on every page of the site.
- **`src/data/{siteMetadata,featurePages,featureGroups}.js` must stay JSX- and React-free**,
  with explicit `.js` extensions on imports — Node ESM loads them directly in the generators
  and guards.
- **Do not preload the self-hosted fonts** and do not re-add a Google Fonts `<link>`; both were
  measured and both made LCP worse (`index.html:10`). Fraunces resolving is load-bearing —
  lose it and every heading silently reverts to the sans face (`src/__tests__/fonts.test.js:15`).
- **`public/robots.txt` is not the whole story**: Cloudflare's managed robots.txt can inject a
  block ahead of it at the edge, and `checkCrawlerAccess.mjs` cannot see that class of block
  (`public/robots.txt:3`).
- **Never hand-write a rupee figure** into a component, and never reintroduce a retired plan
  name — `src/data/schema.test.js` asserts each stays absent (CLAUDE.md §3).
- CLAUDE.md §5/§10/§11 govern copy: no banned superlatives, no invented numbers, no internal
  tech-stack names in outbound content, and the eleven craft rules apply to every component.
- **Stale in-repo docs:** CLAUDE.md §7 and the header comment at `src/styles.css:5` both
  describe the fonts as loading from a Google Fonts `<link>` in `index.html`. That link is
  gone — `src/fonts.css` (generated by `scripts/vendorFonts.mjs`) is the live mechanism.
- `scripts/generate-blog-images.py` carries a hand-kept article list, so a new post's image is
  a silent omission until `checkBlogImages` runs.
