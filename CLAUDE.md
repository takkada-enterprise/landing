# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. Product one-liner

Takkada is a mobile-first SaaS layer for Tally that helps Indian distributors and wholesalers get paid without chasing customers. It sits on top of the distributor's existing Tally installation and adds mobile invoicing (including e-invoice and e-way bill), auto invoice dispatch on WhatsApp, UPI payment collection, and auto-reconciliation back into Tally.

## 2. Primary ICP

Indian offline distributors and wholesalers using Tally. Typically 5–50 person businesses, family-run, ₹2cr to ₹200cr annual turnover, with receivables scattered across 30–300 retail parties on 30–90 day terms.

Four sub-ICPs:
- Owners who want visibility and reminders only (no voucher creation, no collection)
- Accountants and operators who need voucher creation on mobile
- Collections-heavy distributors (e-invoicing + e-way bill + payment links are the whole point)
- Team-based distributors needing role-based access for multiple salesmen

## 3. Pricing (GST extra on all prices, annual per-customer MRP)

Rate card rebuilt 2026-07-25 to anchor against Livekeeping's ₹3,000 / ₹5,000 / ₹7,000 ladder. The live source of truth is `pricing` in `src/data/siteContent.js`; this section mirrors it and `src/data/schema.test.js` pins it. Every price string on the site is derived from `annualPrice` through `formatInr` / `planPricing` — never hand-write a rupee figure into a component.

Plans:
- **Clarity: ₹2,900.** Read the books on mobile. Receivables, automated WhatsApp reminders, ledger/invoice share, 20+ reports, unlimited companies, 1 user.
- **Momentum: ₹4,500.** Adds voucher creation and editing from mobile and web, delivery challans, sales orders, custom invoice PDF template.
- **Assurance: ₹6,480.** Adds E-Invoice (IRN + QR) and E-Way Bill generation from the phone, written back into Tally against the same voucher.
- **Copilot: ₹8,500.** Everything. Import from PDF, bank statement import, Auto Invoice Dispatch, Reports +, role-based salesman access. This is the highlighted "Most Popular" card.

  Claims discipline: every capability row in the matrix was checked against prod `company_feature_entitlements` on 2026-07-25 (bank statement import 90 companies active, e-invoice/e-way 87, auto dispatch 58, PDF import 35, Reports + 23, payment collection 12). **Pending Orders stays out of the pricing matrix.** It was pulled on 2026-07-25 (zero active companies); re-verified 2026-08-03 it is a paid add-on active on 3 prod companies, so a capability claim (no adoption claim) is allowed on the homepage feature grid — but it is not a rate-card row. Re-check before adding any new row.

Retired plan names — do not reintroduce; `src/data/schema.test.js` asserts each stays absent: **View Only** (₹2,700), **Voucher Model**, **Collections Model**, **Full Access / Auto Dispatch** (₹8,499).

**3-year term: 25% off, billed once.** Per-year effective rates ₹2,175 / ₹3,375 / ₹4,860 / ₹6,375. The site defaults to the 3-year column (`pricing.defaultTerm`).

Add-ons (per year):
- **Payment Collection: ₹1,500.** UPI links on every invoice, zero MDR, auto-reconciled into Tally. Available on **every** plan; it is no longer bundled into any tier.
- Extra user: ₹3,000
- Extra device: removed 2026-08-12 — nothing in the product or the partner rate card sells a per-device price; it was drift, not an offer. Do not re-add without asking
- Extra business: removed from the public rate card 2026-08-04 (operator direction) — do not re-add without asking
- WhatsApp 8,000-message pack: ₹2,000
- Your own WhatsApp Business number: ₹2,000 (early access — zero enabled customers as of 2026-08-03; "early access" wording is mandatory anywhere this is mentioned)
- **Customer Order Link: ₹3,999** (operator-set 2026-08-11). Retailers order from a link and the merchant approves each order into Tally as a sales order. Derived through `formatInr(3999)`, not typed. **Ships on the same branch as `/order-booking-app-tally` and behind the same gate**: the v2 backend is stage-only, so publishing this price before it reaches prod would put a figure on something a prod customer cannot be given. Do not lift this pill onto `main` on its own.

Import from PDF, Auto Invoice Dispatch, Reports +, and the Salesman module are **no longer sold as add-ons**. They are bundled into Copilot.

**Bigger setups** (published on the public rate card 2026-08-11; the live source is `biggerSetups` in `src/data/siteContent.js`, pinned by `src/routes/__tests__/pricing-table.test.jsx`):
- **Host it on your own server: ₹30,000 one-time implementation, then ₹15,000/year maintenance from the second year.** The customer's database and backend run on their own server.
- **Consolidated reports across companies: custom pricing.** One combined view of receivables, sales and reports across every company the customer runs.

Both figures are operator-supplied (2026-08-06) and print on slide 13 of `pitch-deck/takkada-product-deck-2026-08.html`; the site copy is adapted from that slide on purpose, so the deck prospect and the site prospect read the same offer. The flow is deck → site, not the reverse.

These are deliberately **not** plan columns and **not** capability-matrix rows: neither is priced per user, and the self-hosting line carries two figures on two different clocks, which the add-on pill strip (label + one price string) cannot render without dropping one. They close the rate table as their own block. Do not "tidy" either one into the matrix or the add-on list.

Claims discipline: both are capability claims with **zero delivered deployments as of 2026-08-11**. No adoption language anywhere near them, and the first buyer is also the first implementation. `pitch-deck/product-deck-claims-2026-08.md` still records these two rows as "not on the public site/rate card" and needs correcting now that they are.

## 4. GTM motion

Reseller-led through the Tally partner network (~18,000 certified partners nationally). Partners earn recurring commission on every plan sold and every renewal, with the exact percentage confirmed in the partner agreement. Do not publish a fixed commission percentage on the public site; the agreement governs the commercials. Commissions paid 5th of every month via UPI. "First 3 customers done-with-you": Takkada handles the first three sales end-to-end for each new partner.

## 5. Voice and copy rules (strict)

Do:
- Lead with the specific behavior the product changes (invoice creation from the phone, WhatsApp auto-dispatch, the 9 PM reconciliation going away)
- Use rupee amounts, time savings, and party counts as proof points when true
- Write sentences a working distributor would say out loud. "bhai, statement bhej do", "baaki baad mein"
- Hinglish is acceptable when the audience is Tier 2/3; it reads as trustworthy, not try-hard
- Name what the product does not do when it clarifies scope

Don't:
- No em-dashes as stylistic breaks (use periods)
- No "Not X. Y." or "It is not X, it is Y" contrast structures (reads as AI-generated)
- No staccato three-word fragments for emphasis ("This. Changes. Everything." is banned)
- No framework name-dropping (no Thiel, no Moore, no blitzscaling)
- No cheap shots at competitors or the customer's current workflow
- No AI/roadmap promises that aren't shipped
- End sections with statements, not questions
- No vanity numbers. The public scale figures are: **100+ businesses and ₹17Cr+ collected monthly — platform-wide figures, founder-confirmed 2026-07-06**. "~20" refers to paying Takkada customers and does not constrain site copy; do not "correct" the 100+/₹17Cr stats down to it. Beyond these two confirmed figures, do not invent numbers ("trusted by thousands" stays banned). If a claim isn't true, it goes on the editing floor.

Positioning guardrail: Tally is the neighbour, not the enemy. Takkada is built on top of Tally, not against it.

Lead-answer convention (blog posts): every `content/blog/*.md` post opens with a self-contained answer paragraph immediately under the title, before any `##` subheading. Target 134–167 words of prose (not a bullet list, not a "## Key Highlights" block) that answers the post's title question in the first one or two sentences, then completes the answer on its own. This is the passage AI-search engines lift as a citation, so it earns the front-loaded slot. The guard `scripts/checkLeadAnswer.mjs` (run via `npm run lint:content`, also wired into `npm run build`) hard-fails a post that opens with a list or heading and warns when the lead falls outside a 120–180-word band. Legacy posts are grandfathered in that script and backfilled opportunistically; new posts must comply from the start. When a post is meaningfully edited, bump its `updated:` frontmatter field so `dateModified` reflects the real edit (recency is a strong citation signal).

## 6. Design tokens (the live source of truth is `src/styles.css` `:root`; this section mirrors it)

The 2026-06-18 teardown defined one authoritative token layer in `src/styles.css` `:root`. These values match it exactly. If they ever diverge again, `:root` wins and this section must be re-synced. Typography is separate (section 7).

Brand sage:
- Primary sage: #344E41 (`--color-primary`)
- Primary dark: #1B3026 (`--color-primary-dark`)
- Secondary / primary-light: #4A7C59 (`--color-primary-light`)
- Accent: #6B9E7A (`--color-accent`, `--color-sage`)
- Label on dark / sage-light: #B8D4BE (`--color-sage-light`)
- Sage wash: #E7F0E8 (`--color-sage-bg`)
- Container tint: #DAE5D6 (`--color-container`)
- On-container: #0D1F12 (`--color-on-container`)
- Ink (darkest band, footer): #14241C (`--color-ink`, `--color-dark`)

Soft sage tints (sage-only; used for feature icon containers and pastel plates):
- Mint #E8F0E8, Peach #DEEBDD, Rose #E4EFE4, Sky #DCE9E0, Sand #EDF2EA
- These are all sage-family greens. The token names (`--tint-peach` etc.) are kept for backward compatibility, but the values are NOT warm pastels anymore. The 2026-06-18-second-pass aligned them to the app's single icon-container fill (#E8F0E8 softTint) because the warm peach/rose/sand pastels were a landing-only invention the app never used and made the site read as a different brand. Do not reintroduce warm tints.

Surfaces & text:
- Background: #FAFAF7 · Surface: #FFFFFF · Surface variant: #F3F3EE
- Text primary: #1A1C1A · secondary: #5F6B64 · muted: #9CA39D
- Outline: #E5E5DF · Hairline: #EEEEEA
- Success #059669 · Danger #DC2626 · Warning #D97706

Hero: layered sage-paper composition (dark sage device band over warm paper), not a flat gradient.

Radii: sm 8 · md 12 · lg 16 · xl 20 · 2xl 28 · full 9999.

Elevation (soft, warm sage-tinted, never 1px outlines): `--shadow-xs/sm/md/lg/xl` plus `--shadow-phone` for the device frames. Shadows carry a green-ink tint (`rgba(20,36,28,…)`), not neutral black.

Motion tokens: `--ease-out` (cubic-bezier(0.16,1,0.3,1)), `--ease-soft`, durations `--dur-fast` 0.18s / `--dur` 0.28s / `--dur-slow` 0.5s / `--dur-reveal` 0.7s. All motion honors `prefers-reduced-motion`.

Component patterns:
- Cards: 16px (`--radius-lg`) radius, soft layered shadow (not 1px outlines)
- Row dividers inside cards: 0.5px hairline #EEEEEA
- Icon containers: rounded squares, soft sage-tint fill (#E8F0E8), sage icon color
- Overline labels: 11–13px, weight 700, 0.06–0.08em letter-spacing, uppercase, sage
- Buttons: pill radius (`--radius-full`), weight 600; primary sage filled, secondary tonal, outline sage, dark (white-on-ink)

## 7. Typography rule

The shipped site uses **two families**: Plus Jakarta Sans for body/UI (the exact font the Takkada Flutter app uses via `google_fonts`; see `takkada/lib/theme/design_tokens.dart`) and **Fraunces as the display serif for headings**, added deliberately by the 2026-06-29 premium overlay (`src/premium.css`, "One tasteful type addition"). `premium.css` imports after `styles.css` in `src/main.jsx` and re-points `--font-serif` at `--font-display: 'Fraunces', …`, so every `var(--font-serif)` heading rule renders Fraunces. The earlier "one family only / the Fraunces link is vestigial" note (2026-06-18 second pass) predates that overlay and is dead — the Fraunces `<link>` in `index.html` is load-bearing; removing it silently reverts every heading to Plus Jakarta Sans (this nearly shipped once, 2026-07-06).

- **Plus Jakarta Sans**, loaded from Google Fonts via the `<link>` in `index.html` (weights 400;500;600;700;800). Used for body and UI, exposed as `--font-sans`.
- **Fraunces** (opsz, weights 500;600;700), same `<link>`. Used for headings via `--font-display`/`--font-serif` in `src/premium.css`.
- **Headings** get their weight from the `:root`-prefixed "Display headings" block near the top of `src/styles.css` (hero/display `--weight-display-hero` 800, section/card headings `--weight-display` 700, soft quote/date 600), not from a serif face. When you add a net-new heading class, add it to that block so it reads as a title rather than body weight.

Do not introduce any other font family. No Inter, no DM Serif Display, no Hedvig Letters, no Bdo Grotesk. The self-hosted Inter `.ttf` under `public/assets/fonts/` is now unreferenced; leave it or delete it, but do not wire it back in.

Before writing any component, confirm the font stack by reading `index.html` (the Plus Jakarta Sans `<link>`) and the top of `src/styles.css` (the `--font-sans` / `--font-serif` tokens and the Display-headings block), then match it exactly.

Numbers use tabular lining figures. Add a utility class `.tabular-nums { font-feature-settings: "tnum" 1, "lnum" 1; }` if one doesn't exist, and apply it to every ₹ amount, percentage, and date on the site.

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
- Content source of truth for the landing page: `src/data/siteContent.js`
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

1. **One coherent story, not a product snapshot list.** The site tells one story: "Get paid without chasing." Every page reinforces this. If a section feels like a feature dump, it's wrong. Rewrite to show the specific behavior that changes for the distributor. The reader should never feel like they're reading a product catalogue.

2. **Progressive disclosure over long scrolls.** Modular sections (think "bento box") with depth available to those who want it. A section summarizes in two lines and offers "see how this works" for the curious. Users in "lean-back" discovery mode must not be punished with a 4000-word landing page. If a section exceeds 300 words of body copy, it splits into a summary and an expandable or linked detail view.

3. **Every claim must be a specific behavior, not a superlative.** "Fast", "seamless", "enterprise-grade", "world-class" are banned. Replace with: "invoice reaches the customer in under 10 seconds of save", "₹1,00,000 across three invoices auto-splits", "works in 2G-zone villages where Tally can't load." Specificity is the signature of someone who has actually seen the problem.

4. **Honest scale signals only.** Stripe uses a GDP counter because they process the world's GDP. Our confirmed public figures are 100+ businesses on the platform and ₹17Cr+ collected monthly (see §5); beyond those, our equivalent is naming the depth of understanding: one real scenario from a Dibrugarh wholesaler, one from a Guwahati FMCG distributor, one from a Barpeta family operation. Depth of domain knowledge is our trust signal. We do not say "thousands", "millions", or "trusted by India's biggest." We say true things that prove we've been in the room.

5. **Motion serves meaning or it doesn't exist.** No decorative animations. If a button, card, or transition moves, the motion must reflect what the product actually does. A reconciliation card matching and snapping into place, an invoice PDF sliding toward a WhatsApp bubble. Motion that doesn't teach is deleted. Default state: no motion. Opt-in per-component with a reason documented in the component file header.

6. **Walk the store before committing.** Before any session ends, Claude Code navigates the rendered site end-to-end in `npm run preview` and reports: (a) is there a dead end anywhere. A CTA that leads nowhere, a broken internal link, a page with no clear next step? (b) does the tone shift anywhere. Does one page feel more corporate than its neighbour? (c) does a distributor reading this get confused at any point? Fix these before committing.

7. **The gravitational pull to mediocrity is real.** "Good enough" output is not acceptable. If a headline reads as something an AI wrote, rewrite it. If a section is technically correct but boring, rewrite it. If a card is functional but ugly, restyle it. Claude Code must flag its own mediocre output rather than shipping it. Mediocre means: a competitor could have the same sentence on their site, word for word, and it would fit.

8. **AI-assisted, human-judged.** Claude Code writes drafts. Every draft needs one pass of craft review before commit. The review question is: "would a top-5% Indian distributor website have this exact sentence / component?" If no, iterate. If unsure, flag for human review before commit. AI speed does not excuse mediocre taste.

9. **Tabular numbers, always.** Every rupee amount, percentage, time span, and date uses tabular lining figures (see Section 7). Numbers aligning cleanly across rows is the smallest craft signal that compounds across the entire site.

10. **Compose from a small, consistent component vocabulary.** Don't invent new patterns per section. Card, icon-container, overline, button (3 variants), section heading, hero, CTA band, FAQ accordion, breadcrumb. If a new pattern is needed, document why in the component file. Visual consistency across pages is how a small team fakes design-team scale.

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
Contact: ronak@paysaathi.com, +91 94359 77777
Scheduling link: https://calendar.notion.so/meet/ronakmalu/takkada
Domains: takkada.com (primary), takkada.in, paysaathi.com
