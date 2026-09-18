# Site revamp: navy brand, playable phone, "Follow one invoice"

Date: 2026-09-18
Status: design approved in brainstorm, awaiting spec review
Prototypes (throwaway HTML, approved direction): `.superpowers/brainstorm/28334-1789722237/content/` in the main checkout (`idea-phone.html`, `idea-invoice.html`)
New assets: `public/assets/screenshots/latest mockup/` (48 PNGs: 44 phone screens, 4 printed sheets)

## Why

The app moved to a navy and blue look. The site is still sage green with a Fraunces serif, so the site and the product read as two brands. The homepage also lists features as a grid, which undersells 48 screens of real product. The goal is a site that looks better than a funded startup's and sells features through the product itself.

## Decisions made with Ronak

1. **Site matches the app.** Navy and blue tokens, Plus Jakarta Sans everywhere. Fraunces is retired.
2. **Dark hero.** Navy hero that continues the app's own header, light sections lower down.
3. **Scope.** Real redesign for Homepage, Features hub, and the feature-page template. Blog, partners, comparison, company and legal pages get the new tokens and type only.
4. **Hero = playable phone.** The real home screen with tappable tiles. Tapping opens the real screen for that feature and swaps the headline beside it.
5. **Story = "Follow one invoice".** One invoice slip stays pinned while the visitor scrolls seven stops. It gets rubber-stamped at each stop. Features hang off stops as links to their feature pages.
6. **Printed sheets appear as paper.** The loading sheet / picking list shows at the Load stop. The salesman summary export shows at the last stop. Both sit tilted behind the phone and enlarge on tap.
7. **The "₹17Cr+ collected monthly" claim is removed from the whole site.** "100+ businesses" stays.

## Design tokens (replace `:root` in `src/styles.css`, then re-sync landing `CLAUDE.md` §6 and §7)

Values are sampled from the app mockups. Before coding, confirm each against the app's theme file in the `takkada` repo and use the app's exact hex where they differ.

| Role | Token | Value |
|---|---|---|
| Brand navy | `--color-primary` | `#14284B` |
| Deep navy (hero, footer, story band) | `--color-primary-dark`, `--color-ink`, `--color-dark` | `#0A1730` |
| Action blue (buttons, links on light) | `--color-primary-light` | `#0B6AA8` |
| Sky (accent on dark, emphasis words) | `--color-accent` | `#8CCBF2` |
| Icon-container / wash | `--color-sage-bg` renamed `--color-wash` | `#DDEFFA` |
| Amber (time labels, hot dots, active stop) | `--color-highlight` | `#F2A33A` |
| Page background | `--color-bg` | `#F6F9FC` |
| Text / secondary / muted | | `#0E1B2E` / `#5B6B80` / `#94A1B2` |
| Border / hairline | | `#E3EAF2` / `#EDF1F6` |
| Paper (slip and sheets only) | `--color-paper` | `#FBF9F2` |
| Stamp inks (slip only) | | blue `#1F5FBF`, green `#0E8A5F`, red `#C2372F` |

- Old sage token names that components still reference are kept as aliases pointing at the new values for one release, then deleted. No sage hex survives anywhere.
- Shadows change tint from green-ink to navy `rgba(10,23,48,…)`.
- Type: Plus Jakarta Sans for display and body (800 hero, 700 headings). IBM Plex Mono as the one utility face, used only for the slip, time labels and stop labels. Self-hosted through `scripts/vendorFonts.mjs`. Fraunces files, `@font-face` rules, preload and `premium.css` re-point are removed.
- Motion: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Press feedback `scale(0.97)` on every button. Hover effects gated behind `(hover: hover) and (pointer: fine)`. All motion honours `prefers-reduced-motion`.

## Homepage, top to bottom

1. **Hero (deep navy).** Left: overline, H1, one sentence, primary CTA "Try the live demo". Centre: playable phone. Right: six job buttons (Collect, Bill, Dispatch, Stock, Team, Reports) that open the same screens, so keyboard and non-tappers get the same result.
   - 9 hotspots on `homepage.png`: Import, Reminders, Stock, Team, Pending, Dispatch tiles, plus Parties, Collect, Reports in the bottom nav. Amber dot marks each.
   - Open: target screen fades and scales in from the tapped tile's position (260–320ms). Headline, body and a "See how it works" link swap with a short blur crossfade. "Back to home screen" returns.
   - Hotspots are real `<button>`s with labels and visible focus. Initial H1 and copy are server-rendered for SEO; swapped copy is enhancement only.
   - Mobile: phone on top, job buttons become a horizontal chip row under it.
2. **Proof strip.** "100+ businesses" and named-place depth signals. No rupee-volume claim.
3. **Follow one invoice (deep navy band).** Pinned slip on the left, seven stations on the right.

   | Stop | Time label | Screen | Stamp | Feature links |
   |---|---|---|---|---|
   | Order | 10:40 AM, retailer's counter | Pending order | ORDER #118 | Salesman access, Pending orders, Field visits, Sales targets |
   | Bill | 11:05 AM, office | Auto einv and eway | IRN + E-WAY ✓ | Mobile invoicing, E-invoice, E-way bill, Maker checker, Import from PDF |
   | Load | 1:30 PM, godown | Van Loading + **loading sheet paper** | ON VAN 2 | Van loading, Picking list, Godown wise stock, Beat selection |
   | Send | 1:31 PM, retailer's phone | making challans & invoices | WHATSAPP ✓✓ | Auto invoice dispatch, Custom invoice template, Statement sharing |
   | Remind | Day 28, 10:00 AM | Reminder payment | REMINDED | Auto reminders, UPI collection, Payment behaviour |
   | Recover | Day 30, no reply yet | followup log, then Recovery dashboard team logging (phone cycles the two) | AI CALLED · WILL PAY, then PAID | **AI calling**, Follow-up log, Promise to pay, Recovery dashboard, Team recovery |
   | Tally | Day 29, 9 PM | Settlements + **salesman summary paper** | IN TALLY ✓ | Auto reconciliation, Settlements, 20+ reports, Sales analytics |

   - The slip is HTML, not an image: party, place, four item lines, total, a status line that changes per stop. Stamps land with a scale 1.5 → 1 "thunk" (260ms) and lift off again when scrolling back up. Transitions, not keyframes, so they reverse cleanly.
   - The numbering is a true sequence, which is why stops are ordered and timed.
   - Only feature links that resolve to an existing feature page are rendered. A missing page means the pill is dropped, never a dead link.
   - Mobile: the slip collapses to a pinned bar showing invoice number, current status and the latest stamp. Stations stack, phone under text.
4. **Works with your Tally** trust band (existing content, new look).
5. **Pricing, data safety, FAQ, final CTA** on light. Content and pricing logic untouched; restyled by tokens.

Removed from the homepage: the "And The Rest" capability grid, the alternating story sections, the AI import section as a standalone band (it lives at the Bill stop).

### AI calling (new feature, Recover stop)

- Story beat: the WhatsApp reminder went unanswered, so Takkada calls the party in their own language, records what they said ("will pay by 22 Sep"), and the promise shows on the recovery board. The salesman's own calls are logged on the same screen.
- Visuals: the two real recovery screenshots (follow-up log with "Already tried" history and promise-to-pay, and the Recovery Team tab with Recovered, Dealers worked, Promises kept). A small HTML call chip sits beside the phone: "AI call · 1m 42s · Will pay by 22 Sep". The chip is illustrative and must match how the real call outcome is logged; confirm with Ronak before build.
- Claims: AI calling is developed (Ronak, 2026-09-11) and may be written in the present tense. Every mention carries "charged on connected minutes" so nobody reads it as bundled into a plan. No per-minute price on the homepage unless Ronak says so.
- It also gets a hero job button ("Recover") and its own feature page if one does not exist yet (one new page is in scope; copy from Ronak's facts only).

## Features hub

Grouped by the same seven stops instead of the current groups. Each group header shows its stamp and one screen. `src/data/featureGroups.js` is the single place the grouping lives; the homepage stations and the hub both read from it.

## Feature-page template

Navy header band with the feature's real screen from the new mockups, breadcrumb, and a "where this sits in the invoice's journey" strip that highlights its stop. Body, FAQ, schema and internal links unchanged.

## Asset pipeline

- Source PNGs are 1–2 MB. Each used screen is exported to WebP at two widths and renamed to a kebab-case slug under `public/assets/screens/`. Originals stay out of the build. `scripts/checkImageBudgets.mjs` must pass.
- Duplicate files in the mockup folder (`-1` suffixes) are ignored.
- One screen-to-feature map in `src/data/` so hero hotspots, stations and feature pages share one source.

## Claims and copy

- Remove "₹17Cr+ collected monthly" everywhere it renders: homepage proof strip, CountUp test, schema, blog CTAs, `llms.txt` generator, OG cards. Update landing `CLAUDE.md` §5 and §11.4 so the only public scale figure is "100+ businesses". Add a build guard that fails on the phrase returning.
- All landing `CLAUDE.md` voice rules still apply: no em-dashes, no contrast structures, tabular numerals on every figure, distributor-first framing.
- Every capability named on a stop must be live on prod. Verify against prod entitlements before the copy is final, per the pricing section's claims discipline.

## What stays the same

Vite + React + `vite-react-ssg`, plain CSS, no Tailwind, no animation library (CSS transitions and one IntersectionObserver hook). SEO contract in `CLAUDE.md` §9. Pricing data and tests. Blog content. All build guards.

## Testing

- Unit: screen-to-feature map has no broken slugs; every station link resolves; hotspot buttons open the right screen and restore on Back; reduced-motion path renders without transforms.
- Guard: no sage hex, no `Fraunces`, no "17Cr" in `src/`, `content/`, `index.html` or built `dist/`.
- Build: `npm run build` green, prerender checks green, image budgets green.
- Eyeball: `npm run preview`, walk home, hub, two feature pages, one blog post, on desktop and phone width. Ronak looks before the PR merges.

## Shipping

Branch `feat/site-revamp-navy` in worktree `~/.claude/fleet/worktrees/landing__site-revamp`. Build order on the branch: (1) tokens + type, (2) asset pipeline + hero, (3) follow-one-invoice, (4) hub + feature template. Nothing merges to `main` until all four are done and Ronak has looked, because new tokens under the old layout would go live half-done (Cloudflare deploys on merge). The one exception is the "₹17Cr+" claim removal, which ships first as its own small PR.

## Out of scope

Redesign of blog, partners, comparison, ICP and legal pages. New copy for feature-page bodies. Pricing changes. Video. The "A day at your shop" idea (kept as a possible future campaign page).
