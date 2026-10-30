# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. Product one-liner

Takkada is Tally on your phone: reports, overdue reminders and salesman tracking for distributors. It sits on top of the distributor's existing Tally installation and adds mobile invoicing (including e-invoice and e-way bill), auto invoice dispatch on WhatsApp, UPI payment collection, and auto-reconciliation back into Tally.

## 2. Primary ICP

Indian offline distributors and wholesalers using Tally. Typically 5–50 person businesses, family-run, ₹2cr to ₹200cr annual turnover, with receivables scattered across 30–300 retail parties on 30–90 day terms.

Four sub-ICPs:
- Owners who want visibility and reminders only (no voucher creation, no collection)
- Accountants and operators who need voucher creation on mobile
- Collections-heavy distributors (e-invoicing + e-way bill + payment links are the whole point)
- Team-based distributors needing role-based access for multiple salesmen

## 3. Pricing (GST extra on all prices, annual per-customer MRP)

Rate card rebuilt 2026-07-25 to anchor against Livekeeping's ₹3,000 / ₹5,000 / ₹7,000 ladder. The live source of truth is `pricing` in `src/data/siteContent.js`; this section mirrors it and `src/data/schema.test.js` pins it. Every price string on the site is derived from `annualPrice` through `formatInr` / `planPricing` — never hand-write a rupee figure into a component.

Plans (ladder rebuilt 2026-10-04, plan 2026-10-04-002):
- **Momentum: ₹4,500.** The entry plan. Read the books on mobile (receivables, automated WhatsApp reminders, ledger/invoice share, 20+ reports, unlimited companies, 1 user) plus voucher creation and editing from mobile and web, delivery challans, sales orders, custom invoice PDF template.
- **Assurance: ₹6,480.** Adds E-Invoice (IRN + QR) and E-Way Bill generation from the phone, written back into Tally against the same voucher.
- **Copilot: ₹9,000** (raised from ₹8,500 on 2026-10-04, Ronak). Import from PDF, bank statement import, Auto Invoice Dispatch, Reports +, role-based salesman access. This is the highlighted "Most Popular" card.
- **Enterprise: ₹24,000.** Badge "Most complete", not highlighted. Everything in Copilot plus these modules: schemes and scheme credit notes, recovery dashboard, customer order link and personal party links, AI calling (billed per connected minute), and exactly ONE billing engine of FMCG billing, Auto parts billing or Ladder discount. Its own matrix group ("Modules switched on") is what makes the column differ from Copilot. It does NOT carry every module: Payment Collection, your own WhatsApp number, the message pack, extra users and the other two billing engines stay add-ons, so never write "every module" or "all modules" about it (`src/routes/__tests__/pricing-table.test.jsx` guards the homepage). The card line is "Schemes, recovery, order links, AI calling and one billing engine, in one price." and the add-on strip is titled "Add-ons" (AI calling is already in Enterprise, so "Add to any plan" was wrong).

  Claims discipline: every capability row in the matrix was checked against prod `company_feature_entitlements` on 2026-07-25 (bank statement import 90 companies active, e-invoice/e-way 87, auto dispatch 58, PDF import 35, Reports + 23, payment collection 12); the Enterprise module rows were checked 2026-10-04 (billing_module 18, autoparts_billing 6, ladder_discount 2, schemes 4, scheme_credit_notes 13, recovery_followups 25, public_customer_ordering 33, ai_calling 2, own_whatsapp_number 24 active prod companies). `personal_order_links` is a new entitlement in plan 2026-10-04-002; the per-party links themselves already exist under `public_customer_ordering`. Capability claims only, never adoption claims. **Pending Orders stays out of the pricing matrix.** It was pulled on 2026-07-25 (zero active companies); re-verified 2026-08-03 it is a paid add-on active on 3 prod companies, so a capability claim (no adoption claim) is allowed on the homepage feature grid — but it is not a rate-card row. Re-check before adding any new row.

Retired plan names — do not reintroduce; `src/data/schema.test.js` asserts each stays absent: **Clarity** (₹2,900, retired from sale 2026-10-04; existing subscribers renew it through the partner config, the site never offers it), **View Only** (₹2,700), **Voucher Model**, **Collections Model**, **Full Access / Auto Dispatch** (₹8,499).

**3-year term: 25% off, billed once.** Per-year effective rates ₹3,375 / ₹4,860 / ₹6,750 / ₹18,000 (Copilot ₹20,250 billed once). The site defaults to the 3-year column (`pricing.defaultTerm`).

Add-ons: **add-ons never show a price on the site — partners quote them (ruled 2026-10-04).** `pricing.addons` items are `{ label, note }` with no `price` key, and the strip closes on one shared line, `pricing.addonsCta` ("Ask your partner for pricing"), plus a WhatsApp CTA. `src/data/rateCardSnapshot.json` carries `addons: {}` and lists every add-on key under `dashboardOnlyKeys`; `scripts/checkRateCardDrift.mjs` fails the build on any rupee figure on the homepage or refund policy that a plan cannot justify, so a typed add-on price anywhere there goes red. The list, in order: FMCG billing, Auto parts billing, Schemes, Ladder discount, Recovery dashboard, Customer order link, Personal party links, AI calling, Your own WhatsApp number, Payment Collection, Barcode labels (added 2026-10-25, operator-confirmed add-on on every plan), Extra user. The WhatsApp 8,000-message pack card was removed 2026-10-29 (Ronak). Every card is a link: `slug` opens its feature page, no slug opens the WhatsApp ask.
- Your own WhatsApp number: the rendered-page guard (`src/routes/__tests__/home.test.jsx`) and the data guard in `src/data/schema.test.js` still require "early access" beside every own-number mention, so the note leads with it. The guards date from zero enabled customers (2026-08-03); prod showed 24 active companies on 2026-10-04, so dropping the wording is an operator call, not a cleanup.
- Extra device: removed 2026-08-12 — nothing in the product or the partner rate card sells a per-device price; it was drift, not an offer. Do not re-add without asking
- Extra business: removed from the public rate card 2026-08-04 (operator direction) — do not re-add without asking

Import from PDF, Auto Invoice Dispatch, Reports +, and the Salesman module are **no longer sold as add-ons**. They are bundled into Copilot.

**Bigger setups** (published on the public rate card 2026-08-11; the live source is `biggerSetups` in `src/data/siteContent.js`, pinned by `src/routes/__tests__/pricing-table.test.jsx`):
- **Consolidated reports across companies: custom pricing.** One combined view of receivables, sales and reports across every company the customer runs.

The self-hosting line (own server, one-time implementation plus yearly maintenance) was removed from the site in df3bef1; do not re-add it without asking.

The consolidated-reports line is operator-supplied (2026-08-06) and prints on slide 13 of `pitch-deck/takkada-product-deck-2026-08.html`; the site copy is adapted from that slide on purpose, so the deck prospect and the site prospect read the same offer. The flow is deck → site, not the reverse.

It is deliberately **not** a plan column and **not** a capability-matrix row: it is not priced per user. It closes the rate table as its own block. Do not "tidy" it into the matrix or the add-on list.

Claims discipline: a capability claim with **zero delivered deployments as of 2026-08-11**. No adoption language anywhere near it, and the first buyer is also the first implementation.

## 4. GTM motion

Reseller-led through the Tally partner network (~18,000 certified partners nationally). Partners earn recurring commission on every plan sold and every renewal, with the exact percentage confirmed in the partner agreement. Do not publish a fixed commission percentage on the public site; the agreement governs the commercials. Commissions paid 5th of every month via UPI. "First 3 customers done-with-you": Takkada handles the first three sales end-to-end for each new partner.

## 5. Voice and copy rules (strict)

Do:
- Lead with the specific behavior the product changes (invoice creation from the phone, WhatsApp auto-dispatch, the 9 PM reconciliation going away)
- Use rupee amounts, time savings, and party counts as proof points when true
- Write sentences a working distributor would say out loud. "bhai, statement bhej do", "baaki baad mein"
- Hinglish is acceptable when the audience is Tier 2/3; it reads as trustworthy, not try-hard
- Hinglish is not used on takkada.com (owner ruling 2026-10-28); write the site in plain English.
- Name what the product does not do when it clarifies scope

Don't:
- No em-dashes as stylistic breaks (use periods)
- No "Not X. Y." or "It is not X, it is Y" contrast structures (reads as AI-generated)
- No staccato three-word fragments for emphasis ("This. Changes. Everything." is banned)
- No framework name-dropping (no Thiel, no Moore, no blitzscaling)
- No cheap shots at competitors or the customer's current workflow
- No AI/roadmap promises that aren't shipped
- End sections with statements, not questions
- No vanity numbers. The one public scale figure is **100+ businesses** (platform-wide, founder-confirmed 2026-07-06). The monthly rupee volume was retired on 2026-09-18 and must not return. "~20" refers to paying Takkada customers and does not constrain site copy; do not "correct" the 100+ stat down to it. Beyond that one confirmed figure, do not invent numbers ("trusted by thousands" stays banned). If a claim isn't true, it goes on the editing floor. `scripts/checkRetiredClaims.mjs` runs in the `build` chain and keeps the retired figure out; `src/__tests__/claims-guard.test.js` exercises it.

Positioning guardrail: Tally is the neighbour, not the enemy. Takkada is built on top of Tally, not against it.

Lead-answer convention (blog posts): every `content/blog/*.md` post opens with a self-contained answer paragraph immediately under the title, before any `##` subheading. Target 134–167 words of prose (not a bullet list, not a "## Key Highlights" block) that answers the post's title question in the first one or two sentences, then completes the answer on its own. This is the passage AI-search engines lift as a citation, so it earns the front-loaded slot. The guard `scripts/checkLeadAnswer.mjs` (run via `npm run lint:content`, also wired into `npm run build`) hard-fails a post that opens with a list or heading and warns when the lead falls outside a 120–180-word band. Every post is enforced; the legacy grandfather list was backfilled and deleted on 2026-10-23, so do not reintroduce an exemption. When a post is meaningfully edited, bump its `updated:` frontmatter field so `dateModified` reflects the real edit (recency is a strong citation signal).

## 6. Design tokens (the live source of truth is `src/ui/ui.css` `:root`; this section mirrors it)

The Campfire rebuild (plan 2026-10-30-003) defines the page tokens in `src/ui/ui.css` `:root`. These values match it exactly. If they ever diverge, `:root` wins and this section must be re-synced. Typography is separate (section 7).

Page tokens (`src/ui/ui.css`):
- Ground #F3F1EC (`--ground`): the warm paper band behind cards
- Card #FFFFFF (`--card`) on ground bands; on white bands `--card` resolves to `var(--ground)`, so a card always takes the opposite surface of its band
- Band #0F1F3D (`--band`): deep navy. The hero band, the close band, the footer and the border of the highlighted pricing column
- Accent #FCAF1B (`--accent`): marigold. The fill of the primary (`accent`) `Pill` only, and its focus ring over the navy band
- Arrow #006EA6 (`--arrow`): Tally blue. Focus rings, ticks and links (no disc)
- Tint #DCF2FB (`--tint`): the pale wash behind the quote band
- Ink #111418 (`--ink`) for text, muted #5B6670 (`--muted`) for secondary text
- On band #FFFFFF (`--on-band`) and #C9D3E3 (`--on-band-muted`): text on the navy band
- `--radius-card` 24px, `--radius-pill` 999px, `--radius-control` 12px (the `Pill`), `--max` 1180px content width

Legacy Marine tokens live in `src/styles.css` `:root`, cut down to the ones the older rules still read: the pricing matrix (`src/ui/pricing.css`), the phone-number modal (`src/ui/modal.css`), and the video embed, FAQ rows, trust link and blog figures (`src/ui/parts.css`). `src/__tests__/brand-guard.test.js` pins seven of them: `--color-primary` #006EA6, `--color-navy` #1E3A6B, `--color-ink` #0F1F3D, `--color-wash` #DCF2FB, `--color-highlight` #FCAF1B, `--color-bg` #F7FAFC, `--color-text` #0E1C2A. The same test fails the suite if #344E41 or any of its sage family reappears anywhere under `src/`. New work reads the page tokens, never the legacy ones.

Marigold rule: marigold fills the primary Pill. It is never a card fill, a band, a text background or a headline colour.

Hero: every page opens on a navy band (`Band tone="band"`) with a one-colour headline at weight 600, one lead line (the homepage carries five ticked pointers instead), a `Pill` and a text link. On the homepage, the feature pages, `/features`, `/partners` and `/demo` a product picture from the screens registry sits on the right (`.ui-hero-stage`). The homepage hero adds two small floating cards cut from captures (`.ui-hero-float`), hidden under 900px. The nav (`src/ui/nav.css`) is a white, 64px, sticky bar with a hairline bottom border on every page, and it keeps its colours over the band.

Component patterns:
- Cards: the opposite surface of their band (`--card`), 24px radius, flat, no shadow and no outline. A card's picture sits in `.ui-card-media` (16px radius) under its title and line; a text card has no media box
- Pills: 48px min height, 12px radius, weight 600, no disc. Accent (marigold fill, ink text) and ghost (transparent, 1px `currentColor` border). Text links are underlined and carry no icon
- Bands: `--ground`, white, `--tint` or `--band`, padded 96px on desktop and 64px on a phone; two adjacent bands of the same tone share one top padding
- Shadows: cards have none. The few floating layers that carry one (the hero floats, the nav's panels, the modal) use a navy tint, `rgba(10, 23, 48, …)`
- No overlines or eyebrows above headings, and no icon tiles

## 7. Typography rule

The shipped site uses **two families**, both self-hosted from our own origin. There is no Google Fonts `<link>` in `index.html` any more (it was render-blocking for 1.3s) and the faces are deliberately not preloaded (preloading them put 93KB in front of the LCP image and pushed live mobile LCP from 2.6–2.9s to 3.1–4.2s). The `@font-face` block lives in `src/fonts.css`, which is **generated** by `scripts/vendorFonts.mjs` and imported first in `src/main.jsx` so the faces are declared before any rule references them. Do not hand-edit `src/fonts.css`; regenerate it.

- **Plus Jakarta Sans** (weights 400, 500, 600, 700, 800) carries everything: body, UI and every heading. It is the exact family the Takkada Flutter app uses via `google_fonts` (see `takkada/lib/theme/design_tokens.dart`). Exposed as `--font-sans`, and `--font-serif` is an alias that resolves to the same stack.
- **IBM Plex Mono** (weights 400, 500, 600) is declared in `src/fonts.css`, required by `src/__tests__/fonts.test.js` and budgeted in `scripts/checkImageBudgets.mjs`, but no rule on the site uses it, so browsers never download it.
- **Headings** get their size and weight from the type scale in `src/ui/ui.css`, not from a display face: the hero title (`.ui-hero-title`) is `clamp(40px, 3.75vw, 64px)` (48px at 1280) and balanced, the section title (`.ui-section-title`) 44px and 32px, both at weight 600 (raised from 500 on 2026-10-31, owner: 500 read too light); the close-band title is 600 too; the card title (`.ui-card-title`) is 22px at weight 600 and its line (`.ui-card-line`) is ink, not muted; display and card heads use `text-wrap: balance`; body copy is 18px and 16px at weight 400, tracking 0, with tabular lining figures by default (`body` sets `font-variant-numeric: tabular-nums lining-nums`). Display line-height is 1.15 and body 1.5. `src/data/__tests__/display-heading-weights.test.js` pins the three weights and fails if `src/styles.css` restyles a `ui-` heading.

**Fraunces is retired** (2026-09-18 revamp). `src/__tests__/brand-guard.test.js` walks every `.css`, `.js` and `.jsx` file under `src/` and fails if the word "Fraunces" appears anywhere, comments included. Do not reintroduce it.

Do not introduce any other font family. No Inter, no DM Serif Display, no Hedvig Letters, no Bdo Grotesk. `public/assets/fonts/` holds only the two vendored families' `.woff2` subsets; the old unreferenced Inter `.ttf` is gone.

Before writing any component, confirm the font stack by reading `--font-sans` in `src/styles.css` `:root`, the type scale in `src/ui/ui.css` and `src/fonts.css`, then match it exactly. `src/__tests__/fonts.test.js` guards the loading strategy.

Numbers use tabular lining figures. The utility class `.tabular-nums` lives in `src/ui/ui.css`; apply it to every ₹ amount, percentage, and date on the site.

## 8. Tech stack (this project)

- Vite 7 + React 19 (already installed. Don't replace)
- TypeScript (check if installed, add if missing. Don't migrate existing `.jsx` to `.tsx`)
- SSG via `vite-react-ssg` (added in Session 1)
- Head management via `vite-react-ssg`'s built-in `Head` component (which wraps `react-helmet-async` internally). Do not add `@unhead/react` or any other head library; `vite-react-ssg` already provides one and a second system would be dead weight.
- Existing styling approach is preserved; do not introduce Tailwind or styled-components unless the repo already uses them
- **Deployment: Cloudflare on merge to `main`.** Cloudflare builds and publishes `dist/` automatically when a PR merges to `main`; new URLs are live within a few minutes. `main` is PR-protected, so direct pushes are rejected (GH013) and a PR is mandatory. The repo's `.github/workflows/deploy.yml` ("Deploy to GitHub Pages") is intentionally disabled and is **not** the deploy path. The apex domain `takkada.com` is served via the `CNAME` file at the repo root (mirrored into `public/CNAME`). There is no `www` CNAME; all canonicals and schema URLs use the apex `https://takkada.com`. The legacy `vercel.json` has been removed and is not part of the deploy path.

Current entry points and commands:
- Dev: `npm run dev` (Vite dev server on port 5173, host enabled)
- Build: `npm run build`
- Preview built site: `npm run preview`
- Test: `npm test` (Vitest single run, jsdom), `npm run test:watch` for watch mode
- Single test: `npx vitest run src/lib/demoBooking.test.js` or `npx vitest -t "<test name>"`
- Setup file for tests: `src/test/setup.js`
- App entry: `src/main.jsx` mounts `src/App.jsx` into `index.html`
- Content source of truth for the landing page: `src/data/siteContent.js` (pricing, testimonials, trust, FAQ, footer columns). The homepage's own sections (the hero and its floats, the four used-for cards, the Tally-in-charge cards, the alternating rows and the close band) are in `src/data/home.js`, rendered by `src/routes/Home.jsx`. Feature pages are the `FEATURE_PAGES` entries in the `src/data/featurePages*.js` files, rendered by `src/components/FeaturePage.jsx`; the features hub groups them through `src/data/featureGroups.js`. Partners copy is in `src/data/partners.js`
- Styles: `src/main.jsx` imports `fonts.css`, `ui/ui.css` and `styles.css`, in that order, and no other stylesheet (`src/__tests__/no-legacy-styles.test.js` pins it). The page skins in `src/ui/` (`nav.css`, `footer.css`, `home.css`, `feature.css`, `icp.css`, `prose.css`) are imported by their components, load before `ui.css`, and prefix every rule with the page's root class
- App screenshots: `src/data/screens.js` is the single registry of screen images, rendered through the `Shot` primitive on the homepage, the hub and the feature pages. The files are exported by `node scripts/exportScreens.mjs` from the gitignored `mockups/` folder, `scripts/screens.manifest.json` records the check made against each source, and `content/image-provenance.json` (demo company 143 on prod, or 7088 on stage) carries the provenance review that `scripts/checkScreenshotProvenance.mjs` enforces
- Demo booking integration: `src/lib/demoBooking.js` + `src/config/demoBooking.js` (Supabase Edge Function; anon key and URL resolved from runtime globals, then `VITE_SUPABASE_*` env, then a production fallback)
- Client-side company pages: `about-us`, `contact-us`, `privacy-policy`, `terms-and-conditions`, `refund-policy` are routed by path inspection in `App.jsx` (`VALID_PAGES` array + `popstate` handling). When adding pages under SSG, migrate routes out of this manual switch.

## 9. SEO/AEO requirements on every page

- Full HTML must be in the static output (verifiable via `curl`. Every page must pass the raw-HTML test)
- Unique `<title>` per page, under 60 chars
- Unique meta description per page, under 160 chars
- Canonical `<link>` tag pointing to `https://takkada.com/<path>` (apex, matching the `CNAME`; no `www` subdomain)
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter card tags
- Organization JSON-LD schema on layout (site-wide)
- Page-specific JSON-LD where applicable (SoftwareApplication, FAQPage, BreadcrumbList, Product)
- All schema uses INR for pricing
- `robots.txt` explicitly allows Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended

## 10. What to never put in outbound content

- Internal tech stack names (don't mention Vite, Supabase, Flutter, any internal tool)
- Internal failures, bug counts, root-cause analyses
- Specific reseller names unless publicly announced
- Internal attempt / rejection / conversion counters
- Specific roadmap dates
- Team comp, valuation, runway, cash position
- Vanity stats we don't have ("thousands of businesses", "99.9% accuracy", "trusted across India" when we're still provincial)

## 11. CRAFT BAR. Read this before writing any component

The Takkada site is not a marketing brochure. It's the first place a distributor, a Tally partner, or an investor forms an opinion about the quality of the product behind it. If the site feels slow, cluttered, or generic, they assume the product is too. The website is the product's first demo.

The craft bar is borrowed, with modification, from Stripe's website redesign principles. Stripe's principles come from a company with global scale; ours have to work at an early-stage startup that is honest about its real numbers (see §5). Translate the principles, don't imitate the execution.

Eleven craft commandments. Every component Claude Code writes must satisfy these, or the work is incomplete:

1. **One coherent story, not a product snapshot list.** The site tells one story: "Tally On Mobile." Every page reinforces this. The chasing/collecting taglines ("Get paid without chasing", "Stop chasing. Start collecting.", "Get Paid On Time. Automatically.") were retired on 2026-10-26 (operator direction) and must not return. If a section feels like a feature dump, it's wrong. Rewrite to show the specific behavior that changes for the distributor. The reader should never feel like they're reading a product catalogue.

2. **Progressive disclosure over long scrolls.** Modular sections (think "bento box") with depth available to those who want it. A section summarizes in two lines and offers "see how this works" for the curious. Users in "lean-back" discovery mode must not be punished with a 4000-word landing page. If a section exceeds 300 words of body copy, it splits into a summary and an expandable or linked detail view.

3. **Every claim must be a specific behavior, not a superlative.** "Fast", "seamless", "enterprise-grade", "world-class" are banned. Replace with: "invoice reaches the customer in under 10 seconds of save", "₹1,00,000 across three invoices auto-splits", "works in 2G-zone villages where Tally can't load." Specificity is the signature of someone who has actually seen the problem.

4. **Honest scale signals only.** Stripe uses a GDP counter because they process the world's GDP. The one public scale figure is **100+ businesses** (platform-wide, founder-confirmed 2026-07-06). The monthly rupee volume was retired on 2026-09-18 and must not return (see §5). Beyond that figure, our equivalent is naming the depth of understanding: one real scenario from a Dibrugarh wholesaler, one from a Guwahati FMCG distributor, one from a Barpeta family operation. Depth of domain knowledge is our trust signal. We do not say "thousands", "millions", or "trusted by India's biggest." We say true things that prove we've been in the room.

5. **Motion serves meaning or it doesn't exist.** No decorative animations. If a button, card, or transition moves, the motion must reflect what the product actually does. A reconciliation card matching and snapping into place, an invoice PDF sliding toward a WhatsApp bubble. Motion that doesn't teach is deleted. Default state: no motion. Opt-in per-component with a reason documented in the component file header.

   Motion contract (its file-level statement is the header of `src/ui/ui.css`):
   - Animate only `transform` and `opacity`. Never write `transition: all`; name the properties
   - Easing is cubic-bezier(0.23, 1, 0.32, 1) unless a rule has a stated reason to differ
   - UI transitions run at 320ms or under, and an exit is faster than the matching enter
   - Press feedback is `scale(0.97)`
   - Nothing enters from `scale(0)`. Start at 0.96 or above and carry the rest on opacity
   - No `@keyframes` on the Campfire surfaces: anything that can reverse mid-flight is a **transition**, so a second tap retargets instead of queueing. The phone-number modal's enter animation and its submit spinner, in `src/ui/modal.css`, are the only keyframes on the site
   - Hover effects sit behind `@media (hover: hover) and (pointer: fine)` so a touch device does not get stuck in a hover state
   - Under `prefers-reduced-motion` the opacity fades stay and the transforms drop
   - Modals stay centred rather than origin-aware

6. **Walk the store before committing.** Before any session ends, Claude Code navigates the rendered site end-to-end in `npm run preview` and reports: (a) is there a dead end anywhere. A CTA that leads nowhere, a broken internal link, a page with no clear next step? (b) does the tone shift anywhere. Does one page feel more corporate than its neighbour? (c) does a distributor reading this get confused at any point? Fix these before committing.

7. **The gravitational pull to mediocrity is real.** "Good enough" output is not acceptable. If a headline reads as something an AI wrote, rewrite it. If a section is technically correct but boring, rewrite it. If a card is functional but ugly, restyle it. Claude Code must flag its own mediocre output rather than shipping it. Mediocre means: a competitor could have the same sentence on their site, word for word, and it would fit.

8. **AI-assisted, human-judged.** Claude Code writes drafts. Every draft needs one pass of craft review before commit. The review question is: "would a top-5% Indian distributor website have this exact sentence / component?" If no, iterate. If unsure, flag for human review before commit. AI speed does not excuse mediocre taste.

9. **Tabular numbers, always.** Every rupee amount, percentage, time span, and date uses tabular lining figures (see Section 7). Numbers aligning cleanly across rows is the smallest craft signal that compounds across the entire site.

10. **Compose from a small, consistent component vocabulary.** Don't invent new patterns per section. Every page is built from the nine primitives in `src/ui/` (exported from `src/ui/index.js`): `Band`, `Pill` (accent, ghost), `SectionHead`, `Card`, `CardGrid`, `Shot`, `AltRow`, `QuoteBand` and `CloseBand`, plus the FAQ rows (`FAQItem`), the breadcrumb, `DemoTryCTA` (the phone-number demo entry) and `CalendarCTA` (the "Book a 15-min demo" link). There is no overline. If a new pattern is needed, document why in the component file. Visual consistency across pages is how a small team fakes design-team scale.

11. **The hero of every page is the distributor, not Takkada.** Copy frames the distributor's world first ("you reach for your phone at 9 PM to check which retailer paid"), then shows what Takkada does for them. Takkada is a supporting character. If a section leads with "Takkada does X", rewrite to lead with "You need X, and here's what happens when you have it."

## 12. Session-end checklist (enforced, every session)

Before committing, Claude Code runs:

- [ ] `npm run build`. Passes without errors
- [ ] `npm run preview` and mentally walk every page changed in this session
- [ ] Curl-equivalent check: `cat dist/<page>/index.html` shows real content, not empty root div
- [ ] Every new page has unique title and description under the character limits
- [ ] Every new page has canonical, OG tags, and relevant schema
- [ ] No banned words from Section 5 appear in new copy (grep the changed files for: seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer)
- [ ] Tabular-nums class applied to every rupee amount and percentage in changed files
- [ ] One "craft review" pass: read new copy aloud. If a sentence sounds like stock SaaS marketing, rewrite.

If any check fails, fix before commit. Do not commit with outstanding craft issues and a "TODO fix later" note.

## 13. Company details (for schema and footer)

Legal entity: Pay Saathi Innovation LLP
Founded: December 2025
Registered in Guwahati, Assam
Contact: ronak@paysaathi.com, +91 70191 52071
Scheduling link: https://calendar.notion.so/meet/ronakmalu/takkada
Domains: takkada.com (primary), takkada.in, paysaathi.com
