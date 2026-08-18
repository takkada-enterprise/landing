---
title: "feat: Header demo CTA and symbolic Tally Connector mark"
type: feat
status: completed
created: 2026-08-19
depth: standard
repo: takkada website/landing
branch_target: main (PR)
---

# feat: Header demo CTA and symbolic Tally Connector mark

**Target repo:** `takkada website/landing` (the takkada.com marketing site, separate from the three PaySaathi repos). PRs go to `main`; Cloudflare deploys on merge. This repo does **not** follow the "push to stage" rule.

---

## Summary

Two changes to the site header, on every page:

1. Put the **live self-serve demo** in the header as `Try the demo`. It currently exists only on the homepage hero and `/try-demo`, so a visitor reading any of the 26 feature pages or 170 blog posts has no way into the product. `Book a Demo` gives up its header slot to make room; it keeps every other placement it has today.
2. Bring the **Tally Connector** back into the desktop header as a small symbolic mark rather than a bordered pill.

The connector was deliberately removed from the desktop header in an earlier PR. The commit comment is the constraint this plan works inside:

> Two primary actions, both conversations. The connector download used to sit here as a third pill, which made a Windows installer look like a peer of "Book a Demo" to someone who had never heard of Takkada.

That reasoning still holds. The correction is not to undo the removal but to change the treatment: the connector returns as a muted utility link with a plug glyph, visually a tier below the pills, so a first-time visitor's eye skips it and a returning customer looking for the installer finds it.

---

## Problem Frame

**Today's desktop header (live on `main`):**

```
[logo]   Product  Features ⌄  Pricing  Partners  Blog      ( Book a Demo )  ( Chat on WhatsApp )
```

Two problems with it.

**The demo is invisible.** `demoEntryLive` has been `true` for a while, so the phone-to-OTP-to-app path works. But `DemoTryCTA` is rendered on exactly two routes: the homepage hero and `/try-demo`. Every feature page, the features hub, the pricing section and the whole blog corpus send a curious reader to WhatsApp or a calendar booking, never into the product. The header is the one surface that reaches all of them.

**The connector has no desktop home.** After the earlier removal it lives in the footer's Product column and the mobile menu. A returning customer on a laptop who needs to reinstall the connector has to scroll to the footer of whatever page they landed on.

**The constraint that shapes everything:** the desktop nav starts at 768px and already carries a logo, five nav items and two pills. There is no room for a third pill, and no room at all for a fourth action. Whatever goes in has to displace something or drop a tier.

---

## Requirements

| ID | Requirement | Source |
|---|---|---|
| R1 | The live demo is reachable from the header on every page of the site | Request |
| R2 | The demo button carries one name across the whole site, header and hero alike | Request + `CLAUDE.md` §11.10 (one component vocabulary) |
| R3 | The Tally Connector is present in the desktop header as a small symbolic mark, not a pill | Request ("symbolic and not too big") |
| R4 | The connector never reads as a peer of the primary CTAs to a first-time visitor | Prior PR rationale, carried forward |
| R5 | The header holds at most two pills at any viewport, and does not overflow at 768–1023px | Existing layout constraint |
| R6 | `Book a Demo` remains reachable from the site — it loses the header slot, not its existence | Operator decision, 2026-08-19 |
| R7 | Nothing regresses when `demoEntryLive` is flipped back to `false` | `DemoTryCTA` fallback behaviour |

---

## Key Technical Decisions

### D1. `Try the demo` takes the `Book a Demo` header slot

Operator decision, 2026-08-19. `Book a Demo` (phone → Notion calendar) and the live demo (phone → OTP → app) are genuinely different destinations, but as adjacent header labels a visitor cannot tell them apart. The self-serve one converts without occupying the founder's calendar, so it wins the slot.

`Book a Demo` keeps: the homepage hero region, the pricing section, the footer, and the mobile menu. It is not removed from the site.

Resulting header:

```
[logo]   Product  Features ⌄  Pricing  Partners  Blog    ⊟ Tally Connector   ( Try the demo )  ( Chat on WhatsApp )
                                                         └ muted, no pill     └ white pill      └ green pill
```

### D2. The action is named `Try the demo` everywhere

Operator decision, 2026-08-19. `DemoTryCTA`'s default label today is `Try it yourself`, which appears on the homepage hero and `/try-demo`. Two names for one door is the failure the site's own craft bar calls out (§11.10). Changing the component default renames all four call sites at once and keeps the flow coherent through to the modal, which already says "Open the live demo".

Rejected: `Checkout Demo` as literally typed. On a site whose product collects UPI payments, "checkout" is the word for paying, and the site's copy rules call for sentence case. Rejected: `See it working` — warmer, but a visitor has to infer that it opens a real app rather than a video.

### D3. The connector mark is a plug glyph and a muted label, with no pill chrome

What made the old treatment read as a third CTA was the chrome, not the icon: a full pill radius, a 1.5px border, 14px type at weight 600, in `--color-primary`. The mark keeps the same information and drops all of it.

| | Old (removed) | New |
|---|---|---|
| Shape | pill, `--radius-full`, 1.5px border | no border, no background |
| Type | 14px / 600 / `--color-primary` | 13px / 500 / `--color-text-secondary` |
| Glyph | `Download` (16px) | `Plug` (15px) |
| Hover | background + border fill | colour lift to `--color-text`, hairline underline |
| Padding | 9px 13px | 10px 0 (matches `.nav-links a`) |

The glyph swap is the substantive part. A download arrow announces "get this file", which is a call to action and is what made it a peer. A plug announces "this joins two things", which is what the connector is and what the mark is there to *mention*. It reads as a member of the nav-link family rather than the button family, which is exactly the tier it belongs to.

The href, the `download` attribute and the S3 target are unchanged — an existing customer still gets the installer in one click. Honesty about the destination moves into `aria-label` and `title`: "Download the Tally Connector for Windows".

**Considered and cut:** a `Download` arrow that fades in on hover (motion that discloses the file type at the moment of click). It is defensible under craft bar §11.5, but it adds a third moving element to a bar that should be quiet, and the `title` tooltip already covers the disclosure. Cut per the one-accessory rule.

### D4. The connector mark stays desktop-only at ≥1024px

`styles.css` already hides `.nav-actions .nav-connector-link` below 1024px, and that rule survived the JSX removal. Reusing it keeps the 768–1023px band at exactly two pills, which is the width where the bar is tightest (R5). The mobile menu already carries the connector as a full-size link and does not change.

### D5. The header must not render two WhatsApp buttons when `demoEntryLive` is `false`

**This is the sharp edge of the whole change.** `DemoTryCTA` falls back to `<WhatsAppCTA context="demo" />` when the flag is off, so dropping it naively beside the header's existing `<WhatsAppCTA context="header" />` produces two identical green WhatsApp pills side by side, on every page, the moment anyone flips the flag.

The header therefore branches on `demoEntryLive` itself rather than delegating to the component's fallback: flag on → `Try the demo`; flag off → the current `Book a Demo` button, unchanged. This makes the change fully reversible by the flag alone and is the single most important test in this plan (R7).

---

## Implementation Units

### U1. Rename the demo action to `Try the demo`

**Goal:** One name for the demo door across the site, before it appears in a second place.

**Requirements:** R2

**Dependencies:** none

**Files:**
- `src/components/DemoTryCTA.jsx` — default `children` fallback, and the header comment that quotes the old name
- `src/components/__tests__/demo-try-cta.test.jsx` — three accessible-name matchers
- `src/routes/__tests__/try-demo.test.jsx` — one accessible-name matcher
- `src/routes/__tests__/home-v3.test.jsx` — the `demo-entry gate` negative assertion

**Approach:** The four call sites (`Home.jsx` hero, `TryDemo.jsx` ×2, and the new header in U2) all rely on the component default, so no call site changes. Only the default string and the tests that pin it move.

The `home-v3.test.jsx` assertion is a `.skipIf(demoEntryLive)` negative check that the label is *absent* while the flag is off. It has to move to the new string or it silently stops guarding anything.

**Patterns to follow:** the existing `vi.hoisted` + module-mock pattern at the top of `demo-try-cta.test.jsx`, which gives both branches of the flag real coverage regardless of the shipped value.

**Test scenarios:**
- With `demoEntryLive` true, the component renders a button whose accessible name is `Try the demo`.
- No surface anywhere in `src/` still renders the string `Try it yourself` — a repo-wide grep assertion, so a missed call site fails loudly instead of shipping two names.
- The flag-off branch still renders the WhatsApp fallback and opens no modal (existing test, must stay green).
- Clicking still calls `openWith` with `destination: 'demo'` and `submitLabel: 'Send code'` (existing tests, must stay green).

**Verification:** `npm run test` green. Grepping `src/` for `try it yourself` returns nothing outside git history.

---

### U2. Put `Try the demo` in the desktop header and retire `Book a Demo` from it

**Goal:** The live demo is one click away from every page.

**Requirements:** R1, R5, R6, R7

**Dependencies:** U1

**Files:**
- `src/Layout.jsx` — `SiteHeader`
- `src/Layout.test.jsx` — new header-actions describe block

**Approach:** `SiteHeader` imports `DemoTryCTA` and `demoEntryLive`, and branches per D5:

- `demoEntryLive === true` → `<DemoTryCTA context="header" variant="secondary" />` in the slot `Book a Demo` occupies today, followed by the unchanged `<WhatsAppCTA context="header" />`.
- `demoEntryLive === false` → today's `Book a Demo` `CTAButton`, unchanged.

`context="header"` is a new Clarity funnel key, so header demo clicks are separable from `home-hero` and `demo-page` clicks in the existing `demo_try_click_<context>` event scheme. No change to `src/lib/track.js`.

Watch for `setOpen` from `usePhoneModal()` becoming referenced only inside the flag-off branch — it must stay in scope for that branch, not be deleted.

**Test scenarios:**
- With the flag on, the header renders exactly one button named `Try the demo` and exactly one link named `Chat on WhatsApp`.
- **With the flag on, the header renders exactly one WhatsApp link.** This is the D5 guard: it goes red if `DemoTryCTA`'s fallback is ever allowed to reach the header. Assert on the count of links whose `href` contains `wa.me`, not on the label.
- With the flag on, the header renders no button named `Book a Demo`.
- With the flag off, the header renders `Book a Demo` and exactly one WhatsApp link, and no `Try the demo`.
- With the flag on, clicking the header button opens the capture modal with `destination: 'demo'` — it does not navigate, and the header contains no anchor pointing at `app.takkada.com` (the middle-click hole `DemoTryCTA` exists to close).
- The mobile menu is unaffected by this unit — `Book a Demo` still renders inside `.mobile-overlay`.

**Verification:** `npm run test` green. In `npm run dev`, the header on `/`, `/features`, a feature page and a blog post all show the demo button; clicking opens the phone modal titled "Open the live demo".

---

### U3. Restore the Tally Connector as a symbolic mark

**Goal:** The connector is findable on desktop without competing with the CTAs.

**Requirements:** R3, R4, R5

**Dependencies:** U2 (both edit the same `nav-actions` block; sequencing avoids a conflict)

**Files:**
- `src/Layout.jsx` — `SiteHeader`, a `Plug` import from `lucide-react`
- `src/styles.css` — restyle the existing `.nav-connector-link` rule (~line 548) and keep the ≥1024px gate (~line 2078)
- `src/Layout.test.jsx` — connector describe block

**Approach:** The mark sits inside `.nav-actions`, before the pills, separated by a larger gap so the tiering is legible:

```
⊟ Tally Connector      ( Try the demo )  ( Chat on WhatsApp )
└─ 16px gap ─────────┘ └─ 10px gap ────┘
```

`.nav-connector-link` is restyled per the D3 table. `lucide-react@0.577.0` ships `Plug`; confirmed present in `node_modules`. The hover underline should reuse the `.nav-links a::after` sweep already defined in `premium.css` rather than introducing a second underline treatment, so the mark reads as nav family.

The `href`, `download` attribute and `appLinks.tallyConnector` value are untouched. Add `aria-label` and `title` naming Windows explicitly.

Leave `.mobile-connector-link` alone — the mobile menu has room and its full-size treatment is correct there.

**Patterns to follow:** `.nav-links a` for type size, weight, colour and vertical padding; `premium.css` `.nav-links a::after` for the hover underline; the existing `@media (max-width: 1023px)` hide rule.

**Test scenarios:**
- The desktop header renders a link whose `href` equals `appLinks.tallyConnector` and which carries the `download` attribute.
- That link's accessible name names both the connector and Windows, so a screen-reader user knows an installer is coming.
- The link carries `nav-connector-link` and **not** any `cta-btn` class — the guard against it drifting back into pill treatment (R4).
- The header still renders exactly two `cta-btn` elements with the flag on, so the mark did not become a third button.
- The mobile menu's connector link still renders and still uses `mobile-connector-link`.

**Verification:** `npm run test` green. Visually at 1440px: the mark is legibly subordinate to both pills and does not draw the eye first.

---

### U4. Mobile menu parity for the demo

**Goal:** The demo is reachable on phones, which is the surface the OTP flow is actually designed for.

**Requirements:** R1, R6, R7

**Dependencies:** U1

**Files:**
- `src/Layout.jsx` — `MobileMenu`
- `src/Layout.test.jsx` — mobile menu describe block

**Approach:** Insert `<DemoTryCTA context="mobile-menu" variant="primary" fullWidth />` above the existing WhatsApp CTA, behind the same `demoEntryLive` branch as U2 so the double-WhatsApp failure (D5) cannot appear here either. Order becomes: nav links → connector link → `Try the demo` → `Chat on WhatsApp` → `Book a Demo`.

`DemoTryCTA` does not currently forward a `fullWidth` prop to `CTAButton`; it needs one, and the prop must reach the WhatsApp fallback too or the flag-off menu gets a half-width button among full-width ones.

The overlay's `inert` handling, focus trap and Escape behaviour are untouched — the new button is inside the existing `<nav>` and inherits all of it.

Unlike the desktop header, the mobile menu **keeps `Book a Demo`**: there is vertical room, and the two destinations are separated by enough space that the label confusion driving D1 does not apply.

**Test scenarios:**
- With the flag on, the open mobile menu renders `Try the demo`, `Chat on WhatsApp` and `Book a Demo`, in that DOM order.
- With the flag on, the mobile menu renders exactly one `wa.me` link — the D5 guard again, on this surface.
- With the flag off, the mobile menu renders `Book a Demo` and exactly one `wa.me` link, and no `Try the demo`.
- Every action button in the open menu carries `cta-btn--full`, including the flag-off WhatsApp fallback.
- Clicking `Try the demo` in the menu closes the overlay and opens the phone modal — it does not leave the menu open behind the modal.
- Focus still returns to the hamburger when the menu closes (existing behaviour, must stay green).

**Verification:** `npm run test` green. At 390px in `npm run dev`, open the menu, tap `Try the demo`, confirm the overlay closes and the modal is focused.

---

### U5. Walk the store and confirm the bar holds at every width

**Goal:** The header change is verified where it actually lives, not only in jsdom. `CLAUDE.md` §12 makes this a gate, not a nicety.

**Requirements:** R5, and the §11 craft bar generally

**Dependencies:** U2, U3, U4

**Files:** none — this unit produces evidence, not code

**Approach:** `npm run build` then `npm run preview`, and capture the header at **390px, 768px, 1024px and 1440px** on at least the homepage, `/features`, one feature page and one blog post. The 768px shot is the load-bearing one: it is the width where the desktop nav switches on and the bar is tightest, and it is where an overflow would first appear.

Then re-run with `demoEntryLive` flipped to `false` locally (reverted before commit) and re-shoot 1440px and 390px, to confirm D5 by eye and not only by test.

**Test expectation:** none — this unit adds no code. Its output is screenshots and the §12 checklist.

**Verification:**
- No horizontal overflow of `.nav-inner` at any of the four widths, on any of the four page types.
- At 768–1023px: two pills, no connector mark, no clipping.
- At ≥1024px: connector mark plus two pills, and the mark is visibly the quietest thing in the bar.
- `npm run build` passes, including `lint:content` and the six `check*.mjs` build guards.
- `cat dist/features/index.html` shows the new header markup prerendered, not an empty root div.
- Grep the changed files for the §5 banned words. Read `Try the demo` aloud against the §11.7 test: would a top-5% Indian distributor site have this exact label.

---

## Scope Boundaries

**In scope:** the desktop header, the mobile menu, the shared `DemoTryCTA` label, and the `.nav-connector-link` styling.

**Not in scope:**
- The `Features ⌄` disclosure panel, its hover-intent timings, or any nav link
- `PhoneModal`, the OTP flow, `demoBooking`, or anything on the app side of the handoff
- The `demoEntryLive` flag's value — it stays `true`; the plan only makes the code correct at both values
- The footer's Product column, which keeps its own connector link
- `appLinks.tallyConnector` and the S3 installer

### Deferred to Follow-Up Work
- **`Book a Demo` placement audit.** It loses the header slot here. Whether the homepage hero region and pricing section still surface it prominently enough is a separate question, answerable from Clarity funnel data once `demo_try_click_header` has a week of numbers.
- **`.nav-connector-link` at 768–1023px.** Left hidden by the existing rule. If the tablet band turns out to matter, an icon-only variant is the obvious next move, but it needs its own accessibility pass and should not ride along here.

---

## Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Two WhatsApp pills appear if `demoEntryLive` flips to `false` | High if unguarded — it is `DemoTryCTA`'s designed fallback | D5 branch in both `SiteHeader` and `MobileMenu`, plus a `wa.me`-count assertion on each surface (U2, U4) |
| Header overflows at 768–1023px | Medium — the bar is already tight there | The connector stays ≥1024px only (D4); U5 shoots 768px explicitly |
| The rename misses a call site and the site ships two names for one action | Medium — four call sites and four test files | Repo-wide grep assertion in U1, not just per-file matchers |
| The connector mark drifts back into pill treatment in a later edit | Low, but it already happened once | U3 asserts the absence of `cta-btn` classes on the link |
| `lucide-react` lacks `Plug` at the pinned version | Resolved | Confirmed present in `node_modules` at 0.577.0 |

---

## System-Wide Impact

`Layout.jsx` renders on **every route**: the homepage, `/features`, 26 feature pages, `/partners`, `/blog` and ~170 posts, `/try-demo`, and every ICP and comparison page. A header regression is a whole-site regression, which is why U5 is a unit and not a footnote.

Prerendering: `vite-react-ssg` bakes the header into every `dist/**/index.html`. The `demoEntryLive` branch is evaluated at build time, so flipping the flag requires a rebuild and redeploy, not just a page refresh. Worth knowing before anyone tries to flip it as a hotfix.

Telemetry: two new Clarity funnel keys, `demo_try_click_header` and `demo_try_click_mobile-menu`, arrive automatically through the existing `track()` contract. No dashboard changes needed.

---

## Prerequisites

Cut a worktree off `origin/main` before starting. The main checkout sits on `feat/features-hub-internal-linking`, which **predates the header rework** — its `Layout.jsx` still has the old connector pill and no `Features` disclosure panel. Building on that branch would silently revert the live header.

```
git worktree add "../lw-wt-header-demo" -b feat/header-demo-cta origin/main
```

Ship as a PR to `main`. Cloudflare deploys on merge.
