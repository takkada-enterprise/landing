# Site Revamp Repair: Visual Defects, Tile Navigation and Feature-Page Screens — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Pass `model: "opus"` on every subagent dispatch (PaySaathi CLAUDE.md: never Fable for subagents).

**Goal:** Make the navy revamp branch look right in a real browser: fix every overlap and white-on-white defect Ronak found on 2026-09-19, turn the hero's tiles and job buttons into links to the feature detail pages (with a clear way back home), and put the right new app screen and matching copy on every feature page.

**Architecture:** No new libraries. A small headless-Chrome screenshot script becomes the verification tool for every task, because the first plan was reviewed from code alone and shipped layout bugs nobody saw. The hero phone stops opening screens in place and becomes a set of positioned links; the in-phone layering, the copy crossfade and the sizer stack are deleted. Feature pages read their hero image from the existing screen registry (`src/data/screens.js`) through one new field, `hero.screen`.

**Tech Stack:** Vite 7, React 19, `vite-react-ssg`, react-router-dom 6, plain CSS, Vitest + Testing Library (jsdom), Google Chrome headless (already installed at `/Applications/Google Chrome.app`), `cwebp`.

**Spec:** `docs/brainstorms/2026-09-18-site-revamp-navy-follow-one-invoice-requirements.md`, amended by Ronak's review of 2026-09-19 (recorded verbatim in "Owner review" below). Where the two disagree, the owner review wins.

**Predecessor:** `docs/plans/2026-09-18-001-feat-site-revamp-navy-design-track-plan.md` (all 11 tasks built on this branch). Its ledger, with 37 rulings and every deferred minor, is at `.superpowers/sdd/2026-09-18-001-feat-site-revamp-navy-design-track-plan/progress.md` (git-ignored, on this machine only). Read it before Task 1. State at hand-off (2026-09-19 00:50): HEAD `01376ea`, nothing pushed; the final review's fix wave (`5fd72fa`..`01376ea`: station `:focus-within`, lazy dialog images, reduced-motion press, `data-not-a-price` rate-card exemption, claims guard after the llms generator, `invoice-sent` screen removed so the registry is 17 slugs) has NOT had its scoped re-review and the build has not been re-run since; Task 9 covers both. A vite dev server may still be running on :5173 from this worktree.

## Owner review (2026-09-19, verbatim)

> "all images show how fucked up things are ,, we have not replaces any feature screenshot/ mockups or copy, we have attached random sreenshots on buttons on the menu we need to imaprove all of it when clicked on any icon it should take into the feature detail page,a nd they should be able to come back to home page whenever needed, alot of things are white on white"

What his seven screenshots showed (1440px-wide desktop, Zen browser):

| # | Where | Defect |
|---|---|---|
| D1 | Story, Send stop | WhatsApp message body text is white on the white card (only readable when selected) |
| D2 | Story, Remind / Recover / Bill stops | The tucked second phone sits on top of the headline and body text |
| D3 | Story, Recover stop | Feature pills run under the phones and are clipped ("Receivables on mobi…") |
| D4 | Story, Load / Tally stops | The tilted paper sheet sits on top of the body text |
| D5 | Slip | Stamps are printed over the item lines (IRN + E-WAY over "Groundnut Oil", ON VAN 2 over the amounts, WHATSAPP over "+ 4 more items"); a large empty area at the bottom of the paper |
| D6 | Sheet dialog | Opens pinned to the top-left, top of the sheet cut off, Close button over the content |
| D7 | Nav, scrolled, over navy | The scrolled bar is translucent; over navy it turns washed grey with low-contrast links |
| D8 | Hero | Overline "For Indian distributors on Tally" is pale text in a pale pill (white on white) |
| D9 | Hero | "Try the demo" is a dark blue button on navy; a large hole sits between the body text and the button |
| D10 | Hero tiles / job buttons | The screen that opens does not match the button (Stock opens Add Items, Team opens a leaderboard, Import opens a queue) |
| D11 | `/features` | Section mark is a tiny phone in the far corner; cards fill two of three columns; section titles slide under the fixed nav |
| D12 | Feature pages | Still the old screenshots and the old copy |

## Global Constraints

- Worktree: `~/.claude/fleet/worktrees/landing__site-revamp`, branch `feat/site-revamp-navy`. Never work in the Desktop checkout. **Nothing merges to `main` and no PR is opened until Ronak has looked again.** PR #119 (claim removal) stays open and unmerged.
- **Every task ends with screenshots.** Run `node scripts/shoot.mjs <set>` (Task 0), open each PNG with the Read tool, and confirm the task's acceptance list by eye at 1440px AND 390px. A task reviewer must open the same PNGs. "Tests pass" is not evidence of layout.
- Heavy commands: `npm run dev` is allowed (Ronak runs it himself). The full suite and the build run ONLY in Task 9, with `TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__promote-0907` (the guide tests read visibility evidence from an app checkout) and **`INDEXNOW_DRY_RUN=true`** (a plain `npm run build` pings IndexNow with 297 live URLs; that mistake was made once on 2026-09-19). During Tasks 1–8 run single test files.
- Colours: Marine tokens on `:root` in `src/styles.css` only. No sage hex, no Fraunces (`src/__tests__/brand-guard.test.js`). Marigold `var(--color-highlight)` is an accent dot, time label, active marker and focus ring only; never a button or pill fill. Readable text on navy is white or `rgba(255,255,255,≥0.72)`; readable text on white/paper is `var(--color-text)` or `var(--color-text-secondary)`; never `--color-text-muted` for body text.
- **Contrast rule, stated as a test of the eye:** in every screenshot, every piece of text must be readable without selecting it. Text ≥ 4.5:1 (≥ 3:1 for ≥ 24px or ≥ 19px bold).
- **Containment rule:** no image, phone, sheet or chip may overlap a text block, at any width. Visuals live inside their own grid column.
- Motion (Emil Kowalski rules): animate only `transform`, `opacity`, `filter` (colour/background/border-colour transitions on hover and selected states allowed); never `transition: all`; easing `var(--ease-out)`; press feedback `transform: scale(0.97)` at 160ms; nothing enters from `scale(0)`; UI transitions ≤ 320ms; exits faster than enters; hover only inside `@media (hover: hover) and (pointer: fine)`; `prefers-reduced-motion: reduce` keeps opacity fades, drops transform transitions, and keeps the press state (it snaps).
- CSS scope tests already on the branch: every rule head in `src/home.css` starts with `.home-v3`; in `src/journey.css` with `.home-v3 ` or `.journey-strip`.
- Copy (landing `CLAUDE.md` §5): no em-dashes, no "Not X. Y." contrast structures, none of: seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer. Rupee amounts, percentages, times and dates carry `className="tabular-nums"`. "₹17Cr" nowhere; "100+ businesses" is the only scale figure; AI calling copy always says "charged on connected minutes"; no "12 at once" bulk import, no UPI QR code. State only what the product does today.
- Screens: every app screenshot published under `public/assets/screens/` needs a provenance record (demo company 143) and goes through `scripts/screens.manifest.json` → `node scripts/exportScreens.mjs` → `src/data/screens.js`. Source PNGs live in the git-ignored `mockups/` folder. **A screen that shows a phone number, a real person's name with a number, or a GSTIN is not published**; known today: `Auto einv and eway.png` (9573440784), `Van Loading.png` and `making challans & invoices.png` ("ronak / 919435977777"). Ronak is re-capturing those.
- Commits: small, staged by path (never `git add -A`), truthful `Co-Authored-By` trailer for the model that wrote the commit. Do not push until Task 9.

## File structure

| File | Responsibility |
|---|---|
| `scripts/shoot.mjs` (create) | Headless-Chrome screenshots of named page states at 1440 and 390 wide |
| `src/components/PlayablePhone.jsx` (rewrite, smaller) | The home screen image with nine positioned LINKS to feature pages |
| `src/data/heroHotspots.js` (modify) | `HOTSPOTS: {key,label,box,href}`, `JOBS: {key,label,hint}`, `HERO_HOME` |
| `src/routes/Home.jsx`, `src/home.css` (modify) | Static hero copy; job links; white CTA; no sizer stack, no swap |
| `src/components/BackHome.jsx` (create) | "← Home" link used in the feature-page hero and the hub hero |
| `src/components/FollowOneInvoice.jsx`, `InvoiceSlip.jsx`, `PaperSheet.jsx`, `src/journey.css` (modify) | Contained visual column, stamp zone, readable message card, centred dialog |
| `src/styles.css` (modify) | Opaque scrolled nav |
| `src/routes/Features.jsx`, `src/feature-page.css` (modify) | Hub section mark and card grid |
| `scripts/screens.manifest.json`, `src/data/screens.js`, `content/image-provenance.json` (modify) | New screens for feature pages |
| `src/data/featurePages*.js`, `src/components/FeaturePage.jsx` (modify) | `hero.screen` resolved through the registry; copy aligned to the screen |

---

### Task 0: Screenshot tool and the "before" set

**Files:**
- Create: `scripts/shoot.mjs`
- Modify: `.gitignore` (add `/shots/`)

**Interfaces:**
- Produces: `node scripts/shoot.mjs <set> [--base http://localhost:5173]` writes `shots/<set>/<name>-<width>.png`. Sets: `home`, `story`, `hub`, `feature`, `all`. Later tasks name the set they need.

- [ ] **Step 1: Make sure a dev server is up**

Run: `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:5173/`
Expected: `200`. If not, start one in the background from the worktree: `npx vite --port 5173 --strictPort` and wait for 200.

- [ ] **Step 2: Write the script**

```js
// scripts/shoot.mjs
// Real screenshots of named page states, so layout is judged by eye and not by
// arithmetic. Headless Chrome cannot scroll, so a state below the fold is
// reached with a #hash (Layout's useScrollToHash scrolls to it on load).
// Usage: node scripts/shoot.mjs story            (dev server on :5173)
//        node scripts/shoot.mjs all --base http://localhost:4173
import { execFileSync } from 'node:child_process';
import { mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = process.argv.slice(2);
const set = args.find((a) => !a.startsWith('--')) ?? 'all';
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:5173';

const STOPS = ['order', 'bill', 'load', 'send', 'remind', 'recover', 'tally'];
const SETS = {
  home: [['home-top', '/']],
  story: STOPS.map((id) => [`story-${id}`, `/#stop-${id}`]),
  hub: [['hub-top', '/features'], ['hub-sections', '/features#order'], ['hub-mid', '/features#send']],
  feature: [
    ['feature-reminders', '/send-payment-reminders-automatically'],
    ['feature-einvoice', '/e-invoice-from-phone'],
    ['feature-offjourney', '/biz-analyst-alternative'],
  ],
};
SETS.all = [...SETS.home, ...SETS.story, ...SETS.hub, ...SETS.feature];

if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);
if (!SETS[set]) throw new Error(`Unknown set "${set}". One of: ${Object.keys(SETS).join(', ')}`);
const outDir = resolve(root, 'shots', set);
mkdirSync(outDir, { recursive: true });

for (const [name, path] of SETS[set]) {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const out = resolve(outDir, `${name}-${w}.png`);
    execFileSync(CHROME, [
      '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
      `--user-data-dir=${resolve(root, 'shots', '.chrome-profile')}`,
      `--window-size=${w},${h}`, '--virtual-time-budget=6000',
      `--screenshot=${out}`, `${base}${path}`,
    ], { stdio: 'ignore', timeout: 60_000 });
    console.log(out);
  }
}
```

Add `/shots/` to `.gitignore`.

- [ ] **Step 3: Shoot the "before" set and look at it**

Run: `node scripts/shoot.mjs all`
Expected: 28 PNG paths printed. Open each with the Read tool. If the 390-wide shots come out wider than 390px (Chrome enforces a minimum window width on some versions), change the narrow size to `[500, 900]` in the script and say so in the commit body. If a `#stop-…` shot shows the top of the page instead of the stop, raise `--virtual-time-budget` to `10000`.
Write down, in the task report, which of D1–D12 you can see in which file. This list is the acceptance baseline for Tasks 1–6.

- [ ] **Step 4: Commit**

```bash
git add scripts/shoot.mjs .gitignore
git commit -m "chore(shoot): headless-Chrome screenshots of named page states"
```

---

### Task 1: Hero tiles and job buttons go to the feature pages

Fixes D8, D9, D10 and implements the owner's instruction: "when clicked on any icon it should take into the feature detail page".

**Files:**
- Rewrite: `src/components/PlayablePhone.jsx`, `src/components/__tests__/playable-phone.test.jsx`
- Modify: `src/data/heroHotspots.js`, `src/data/__tests__/journey.test.js`, `src/routes/Home.jsx`, `src/home.css`, `src/journey.css` (the `.pphone*` block), `src/routes/__tests__/home-v3.test.jsx`

**Interfaces:**
- Produces: `<PlayablePhone />` takes NO props. `HOTSPOTS: [{ key, label, box: {left,top,width,height}, href }]`. `JOBS: [{ key, label, hint }]` where `key` matches a hotspot. `HERO_HOME = { headline, body }`.

- [ ] **Step 1: Rewrite the component test first**

```jsx
// src/components/__tests__/playable-phone.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PlayablePhone from '../PlayablePhone';
import { HOTSPOTS } from '../../data/heroHotspots';
import { FEATURE_PAGES, featurePagePath } from '../../data/featurePages';

const FUTURE = { v7_startTransition: true, v7_relativeSplatPath: true };
const mount = () => render(<MemoryRouter future={FUTURE}><PlayablePhone /></MemoryRouter>);

describe('PlayablePhone', () => {
  it('shows the real home screen', () => {
    mount();
    expect(ui.getByAltText(/home screen/i)).toBeInTheDocument();
  });
  it('makes every hotspot a link to a real feature page, named for where it goes', () => {
    mount();
    const paths = new Set(FEATURE_PAGES.map(featurePagePath));
    const links = ui.getAllByRole('link');
    expect(links).toHaveLength(HOTSPOTS.length);
    for (const h of HOTSPOTS) {
      const a = ui.getByRole('link', { name: `${h.label}: see how it works` });
      expect(a).toHaveAttribute('href', h.href);
      expect(paths.has(h.href), h.href).toBe(true);
    }
  });
  it('opens nothing in place: no buttons, no second screen', () => {
    mount();
    expect(ui.queryAllByRole('button')).toHaveLength(0);
    expect(ui.getAllByRole('img')).toHaveLength(1);
  });
});
```

Run: `npx vitest run src/components/__tests__/playable-phone.test.jsx` — Expected: FAIL (the component still renders buttons and takes `activeKey`).

- [ ] **Step 2: Rewrite the component**

```jsx
// src/components/PlayablePhone.jsx
// The hero: the app's real home screen, with each marked tile a LINK to that
// feature's detail page. It used to open a screenshot inside the phone; the
// owner's review (2026-09-19) replaced that: a tap goes to the feature page,
// and the feature page carries a "Home" link back.
// Motion: the marigold hint dot's ping is the only ambient motion (transform +
// opacity, off under prefers-reduced-motion). A tile presses to scale(0.97).
import { Link } from 'react-router-dom';
import { HOTSPOTS } from '../data/heroHotspots';
import { screen } from '../data/screens';

export default function PlayablePhone() {
  const home = screen('home');
  return (
    <div className="pphone">
      <img className="pphone-base" src={home.src} srcSet={home.srcSet}
        sizes="(max-width: 700px) 70vw, 340px" width={home.width} height={home.height}
        alt={home.alt} fetchPriority="high" decoding="async" />
      {HOTSPOTS.map((h, i) => (
        <Link key={h.key} to={h.href} className="pphone-hot"
          style={{ ...h.box, '--ping-delay': `${(i % 3) * 0.7}s` }}
          aria-label={`${h.label}: see how it works`} />
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Trim the data**

In `src/data/heroHotspots.js` delete the `screen`, `overline`, `headline` and `body` fields from every hotspot (they fed the in-phone preview and the copy swap, both gone) and rewrite the header comment to say a hotspot is `{ key, label, box, href }`. Keep every `box` and `href` exactly as it is. Set:

```js
export const HERO_HOME = {
  headline: 'Your Tally, in your pocket.',
  body: 'This is the real home screen. Tap any tile with a yellow dot to see how that part works, then come back here.',
};
```

In `src/data/__tests__/journey.test.js`: delete the assertion that hotspots use registered screens; keep the box tests, the href test and the copy sweep.

- [ ] **Step 4: Rewrite the hero in `Home.jsx`**

Delete: the `hot` state, `swapTo`, the `is-swapped` ref, the sizer stack (`.hv3-hero-swap-stack`, every `.hv3-hero-sizer`), `.hv3-hero-more-slot` and its twin. The hero becomes:

```jsx
<section className="hv3-hero" id="product">
  <div className="hv3-hero-grid">
    <div className="hv3-hero-copy">
      <span className="hv3-hero-overline">{heroContent.overline}</span>
      <h1 className="hero-title">{HERO_HOME.headline}</h1>
      <p className="hero-subtitle">{HERO_HOME.body}</p>
      <div className="hv3-hero-cta"><DemoTryCTA context="home-hero" /></div>
      <p className="hv3-hero-promise">{heroContent.promise}</p>
    </div>
    <PlayablePhone />
    <nav className="hv3-hero-jobs" aria-label="Go to a feature">
      <span className="hv3-hero-jobs-label">Or pick a job</span>
      {JOBS.map((j) => {
        const h = HOTSPOTS.find((x) => x.key === j.key);
        return (
          <Link key={j.key} to={h.href} className="hv3-job">
            {j.label}<small>{j.hint}</small>
          </Link>
        );
      })}
    </nav>
  </div>
</section>
```

Note the overline is now a plain `<span className="hv3-hero-overline">`: it no longer carries `section-label hero-overline`, because `premium.css` paints `.hero-overline` as a pale chip, which is D8 (pale text in a pale pill).

- [ ] **Step 5: Hero CSS in `src/home.css`**

Delete the rules for `.hv3-hero-swap-stack`, `.hv3-hero-sizer`, `.hv3-hero-swap`, `.is-swapped`, `.hv3-hero-more`, `.hv3-hero-more-slot`, `.hv3-job.is-on` and their reduced-motion and ≤1000px counterparts. Add or replace:

```css
.home-v3 .hv3-hero-overline { display: block; font: 400 13px var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); background: none; padding: 0; }
.home-v3 .hv3-hero-copy { align-self: center; }
.home-v3 .hv3-hero .hero-subtitle { min-height: 0; }
/* D9: the site's primary button is a navy gradient, invisible on a navy hero. */
.home-v3 .hv3-hero .cta-btn--primary { background: #fff; color: var(--color-navy); border: 1.5px solid #fff; box-shadow: 0 10px 30px rgba(5, 12, 28, 0.35); }
.home-v3 .hv3-hero .cta-btn--primary::before, .home-v3 .hv3-hero .cta-btn--primary::after { display: none; }
@media (hover: hover) and (pointer: fine) {
  .home-v3 .hv3-hero .cta-btn--primary:hover { background: var(--color-wash); color: var(--color-navy); }
}
.home-v3 .hv3-job { text-decoration: none; }
```

In `src/journey.css` `.pphone*` block: delete `.pphone-screen`, `.pphone-back`, `.is-leaving` rules and their reduced-motion lines; keep `.pphone`, `.pphone-base`, `.pphone-hot` (now an `<a>`: add `display: block;`), the ping, the hover tint, the focus ring, and the `:active { transform: scale(0.97) }` press.

- [ ] **Step 6: Update `home-v3.test.jsx`**

Replace the swap, sizer, `is-swapped`, `aria-pressed` and "See how it works" cases with: exactly one `<h1>` whose text is `HERO_HOME.headline`; the hero contains one `nav` named "Go to a feature" with `JOBS.length` links, each `href` equal to its hotspot's `href`; the overline element does not carry the class `hero-overline`; `home.css` declares a white `background` for `.home-v3 .hv3-hero .cta-btn--primary`; no selector in `home.css` contains `hv3-hero-sizer` or `is-swapped`.

- [ ] **Step 7: Run and shoot**

Run: `npx vitest run src/components/__tests__/playable-phone.test.jsx src/routes/__tests__/home-v3.test.jsx src/data/__tests__/journey.test.js`
Expected: PASS, output silent.
Run: `node scripts/shoot.mjs home`. Open both PNGs. Acceptance: overline readable with no pill; headline, body and a WHITE "Try the demo" button with no hole between body and button; nine yellow dots sit on the named tiles and nav items; at 390 the phone is on top, copy centred, job links in one scrolling row, button centred.

- [ ] **Step 8: Commit**

```bash
git add src/components/PlayablePhone.jsx src/components/__tests__/playable-phone.test.jsx src/data/heroHotspots.js src/data/__tests__/journey.test.js src/routes/Home.jsx src/home.css src/journey.css src/routes/__tests__/home-v3.test.jsx
git commit -m "feat(hero): tiles and job buttons go to the feature pages; static copy, white CTA"
```

---

### Task 2: A way back home from every feature page

**Files:**
- Create: `src/components/BackHome.jsx`, `src/components/__tests__/back-home.test.jsx`
- Modify: `src/components/FeaturePage.jsx` (hero, above the `<Breadcrumb>` at ~line 165), `src/routes/Features.jsx` (hub hero, above its breadcrumb), `src/feature-page.css`

**Interfaces:**
- Produces: `<BackHome />`, a `<Link to="/">` reading "← Home", class `back-home`.

- [ ] **Step 1: Failing test**

```jsx
// src/components/__tests__/back-home.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackHome from '../BackHome';

describe('BackHome', () => {
  it('is a link to the homepage with a clean accessible name', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><BackHome /></MemoryRouter>);
    const a = ui.getByRole('link', { name: 'Home' });
    expect(a).toHaveAttribute('href', '/');
  });
});
```

Run: `npx vitest run src/components/__tests__/back-home.test.jsx` — Expected: FAIL, module not found.

- [ ] **Step 2: Component and styles**

```jsx
// src/components/BackHome.jsx
// The owner's rule: a visitor who tapped a tile on the homepage must be able to
// get back whenever they want. Sits at the top of the navy hero on every
// feature page and on the features hub.
import { Link } from 'react-router-dom';

export default function BackHome() {
  return (
    <Link to="/" className="back-home">
      <span aria-hidden="true">←</span> Home
    </Link>
  );
}
```

```css
/* src/feature-page.css, inside the navy-hero block */
.back-home { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 14px; padding: 8px 14px 8px 12px; border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.22); color: #fff; font: 600 14px var(--font-sans); text-decoration: none; transition: background-color 160ms var(--ease-out), transform 160ms var(--ease-out); }
.back-home:active { transform: scale(0.97); }
.back-home:focus-visible { outline: 3px solid var(--color-highlight); outline-offset: 2px; }
@media (hover: hover) and (pointer: fine) { .back-home:hover { background-color: rgba(255, 255, 255, 0.12); } }
@media (prefers-reduced-motion: reduce) { .back-home { transition: background-color 160ms var(--ease-out); } }
```

Mount `<BackHome />` as the first child of the hero's copy column in `FeaturePage.jsx` and in the hub hero in `Features.jsx`. Add one assertion to `src/routes/__tests__/feature-page.test.jsx` and `features-hub.test.jsx`: a link named "Home" with `href="/"` exists inside the hero.

- [ ] **Step 3: Run, shoot, commit**

Run: `npx vitest run src/components/__tests__/back-home.test.jsx src/routes/__tests__/features-hub.test.jsx` then `node scripts/shoot.mjs feature`. Acceptance: a white "← Home" pill above the breadcrumb on navy, readable, not touching the fixed nav.

```bash
git add src/components/BackHome.jsx src/components/__tests__/back-home.test.jsx src/components/FeaturePage.jsx src/routes/Features.jsx src/feature-page.css src/routes/__tests__/feature-page.test.jsx src/routes/__tests__/features-hub.test.jsx
git commit -m "feat(feature-page): a Home link at the top of every feature page and the hub"
```

---

### Task 3: Story layout: visuals stay in their own column, stamps stay off the text

Fixes D1, D2, D3, D4, D5.

**Files:**
- Modify: `src/journey.css` (`.foi-*`, `.slip*`, `.sheet`, `.wa-*`/message card rules), `src/components/InvoiceSlip.jsx`, `src/components/FollowOneInvoice.jsx`, `src/components/__tests__/follow-one-invoice.test.jsx`

**Interfaces:**
- Produces: `InvoiceSlip` renders stamps inside `<div className="slip-stamps">`, placed AFTER the status line, never absolutely positioned over the slip's text.

- [ ] **Step 1: Failing structural tests** (append to `follow-one-invoice.test.jsx`)

```jsx
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
const css = readFileSync(resolve(__dirname, '../../journey.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const block = (head) => { const i = css.indexOf(`${head} {`); return i < 0 ? '' : css.slice(i, css.indexOf('}', i)); };

it('keeps every stamp in a stamp zone below the status line, not over the items', () => {
  mount();
  const zone = document.querySelector('.slip-stamps');
  expect(zone).not.toBeNull();
  expect(zone.querySelectorAll('.slip-stamp')).toHaveLength(7);
  const status = ui.getByTestId('slip-status');
  expect(status.compareDocumentPosition(zone) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(block('.home-v3 .slip-stamp')).not.toMatch(/position:\s*absolute/);
});
it('keeps the tucked phone and the sheet inside the visual column', () => {
  expect(block('.home-v3 .foi-phone--1')).not.toMatch(/left:\s*-/);
  expect(block('.home-v3 .sheet')).not.toMatch(/left:\s*-/);
});
it('gives the message card its own dark text', () => {
  expect(block('.home-v3 .foi-message')).toMatch(/color:\s*var\(--color-text\)/);
});
```

(If the message card's root class is not `.foi-message`, read `FollowOneInvoice.jsx` and use its real class in both the test and Step 3.)
Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx` — Expected: the three new cases FAIL.

- [ ] **Step 2: Stamps into a stamp zone**

In `InvoiceSlip.jsx` move the `STOPS.map(… slip-stamp …)` spans out of the slip body into a wrapper placed after the status line:

```jsx
<div className="slip-status" data-testid="slip-status" aria-live="polite">{STOPS[activeIndex].status}</div>
<div className="slip-stamps" aria-hidden="true">
  {STOPS.map((s, i) => (
    <span key={s.id}
      className={`slip-stamp slip-stamp--${s.id} slip-stamp--${s.stamp.tone}${s.stamp.size === 'lg' ? ' slip-stamp--lg' : ''}${i <= activeIndex ? ' is-on' : ''}${i === activeIndex ? ' is-current' : ''}`}
      aria-hidden="true">{s.stamp.text}</span>
  ))}
</div>
```

In `journey.css` replace the seven absolute `.slip-stamp--<id>` offset rules and the slip's 116px bottom padding with a flow layout. Each stamp keeps its slot whether pressed or not (opacity only), so the paper never changes height:

```css
.home-v3 .slip { padding: 26px 24px 28px; }
.home-v3 .slip-stamps { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 10px; margin-top: 16px; padding-top: 14px; border-top: 1.5px dashed rgba(29, 36, 51, 0.25); }
.home-v3 .slip-stamp { position: static; font: 800 12px/1 var(--font-sans); letter-spacing: 0.08em; padding: 5px 9px; border: 2.5px solid currentColor; border-radius: 6px; mix-blend-mode: multiply; opacity: 0; transform: scale(1.5) rotate(var(--r, 0deg)); transition: opacity 120ms var(--ease-out), transform 160ms var(--ease-out); }
.home-v3 .slip-stamp.is-on { opacity: 0.9; transform: scale(1) rotate(var(--r, 0deg)); transition: opacity 180ms var(--ease-out), transform 260ms var(--ease-out); }
.home-v3 .slip-stamp--order { --r: -5deg; } .home-v3 .slip-stamp--bill { --r: 3deg; }
.home-v3 .slip-stamp--load { --r: -3deg; } .home-v3 .slip-stamp--send { --r: 4deg; }
.home-v3 .slip-stamp--remind { --r: -2deg; } .home-v3 .slip-stamp--tally { --r: 3deg; }
.home-v3 .slip-stamp--recover { --r: -8deg; }
.home-v3 .slip-stamp--lg { font-size: 18px; padding: 6px 14px; border-width: 3px; }
```

Keep the tone colour rules, the reduced-motion rule (stamps fade in at their resting rotation) and the mobile bar's "only `.is-current` shows" rules; in the ≤900px block the zone becomes the bar's fixed-height stamp row (`.home-v3 .slip-stamps { border: 0; margin: 6px 0 0; padding: 0; height: 21px; position: relative; }` with stamps `position: absolute; left: 0; top: 0` inside that row only, which is a stamp-only box and cannot cover text). Re-derive `--foi-bar-h` from the declarations and write the sum in the comment.

- [ ] **Step 3: Contain the visuals, free the copy, fix the message card**

```css
/* One station = copy column + a visual column wide enough to hold two phones
   or a phone and a sheet. Nothing in the visual column is positioned outside it. */
.home-v3 .foi-grid { grid-template-columns: 340px minmax(0, 1fr); gap: 56px; }
.home-v3 .foi-station { grid-template-columns: minmax(0, 1fr) 380px; gap: 40px; }
.home-v3 .foi-copy { min-width: 0; }
.home-v3 .foi-station h3 { font-size: clamp(28px, 2.6vw, 38px); }
.home-v3 .foi-pills { flex-wrap: wrap; }
.home-v3 .foi-visual { position: relative; isolation: isolate; width: 380px; min-height: 520px; display: flex; justify-content: flex-end; align-items: flex-start; }
.home-v3 .foi-phone { width: 236px; height: auto; position: relative; z-index: 2; }
.home-v3 .foi-phone--1 { position: absolute; left: 0; top: 56px; width: 184px; z-index: 1; opacity: 0.92; }
.home-v3 .sheet { position: absolute; left: 0; bottom: 0; width: 230px; z-index: 1; }
.home-v3 .foi-callchip { right: 0; top: auto; bottom: 8px; z-index: 3; }
/* D1: `.foi-station p` paints body copy white; the message card is a white
   surface and must carry its own ink. */
.home-v3 .foi-message { color: var(--color-text); }
.home-v3 .foi-message p, .home-v3 .foi-message span { color: inherit; }
.home-v3 .foi-message .foi-message-meta { color: var(--color-text-secondary); }
```

Use the message card's real class names (read `FollowOneInvoice.jsx`); the sender label above the card sits on navy and stays light. Between 901px and 1180px the two-column station no longer fits beside the 340px slip: add `@media (max-width: 1180px) and (min-width: 901px) { .home-v3 .foi-station { grid-template-columns: 1fr; } .home-v3 .foi-visual { margin-top: 28px; justify-content: flex-start; } }` so the visual drops under the copy instead of squeezing it. Update the station `<img sizes>` strings in `FollowOneInvoice.jsx` to the new widths (236px main, 184px tucked, 230px sheet on desktop).

- [ ] **Step 4: Run, shoot, look**

Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx src/routes/__tests__/home-v3.test.jsx` — Expected: PASS.
Run: `node scripts/shoot.mjs story`. Open all 14 PNGs. Acceptance, every stop, both widths: no phone, sheet or chip touches any headline, body text or pill; every pill is fully visible; the message card's text is dark and readable; every stamp sits in the stamp zone under the status line and none touches an item line, an amount or the total; the slip has no large blank area. Fix and re-shoot until all true; attach the final PNG list to the report.

- [ ] **Step 5: Commit**

```bash
git add src/journey.css src/components/InvoiceSlip.jsx src/components/FollowOneInvoice.jsx src/components/__tests__/follow-one-invoice.test.jsx
git commit -m "fix(story): visuals stay in their column, stamps get their own zone, message card is readable"
```

---

### Task 4: The enlarged sheet opens centred and whole

Fixes D6. Cause: the site's CSS reset zeroes `margin` on every element, and a modal `<dialog>` is centred by the browser's `margin: auto`.

**Files:**
- Modify: `src/journey.css` (`.sheet-dialog*`), `src/components/__tests__/follow-one-invoice.test.jsx`

- [ ] **Step 1: Failing test**

```jsx
it('centres the sheet dialog itself instead of relying on the reset-away UA margin', () => {
  const d = block('.home-v3 .sheet-dialog');
  expect(d).toMatch(/margin:\s*auto/);
  expect(d).toMatch(/inset:\s*0/);
});
```

- [ ] **Step 2: Fix**

```css
.home-v3 .sheet-dialog { position: fixed; inset: 0; margin: auto; width: fit-content; height: fit-content; max-width: min(1100px, 92vw); max-height: 88vh; max-height: 88dvh; padding: 0; border: 0; border-radius: 12px; background: #fff; overflow: hidden; }
.home-v3 .sheet-dialog img { display: block; width: auto; height: auto; max-width: min(1100px, 92vw); max-height: 88vh; max-height: 88dvh; object-fit: contain; }
.home-v3 .sheet-close { position: absolute; top: 10px; right: 10px; }
```

Keep the existing `@starting-style` enter (opacity + `scale(0.96)`, 200ms) and backdrop rules. `transform-origin` stays centre: a modal is not origin-aware.

- [ ] **Step 3: See it open**

A dialog cannot be opened by URL. Add a dev-only switch in `PaperSheet.jsx`: inside a `useEffect`, if `new URLSearchParams(window.location.search).get('sheet') === slug`, call `dialog.current?.showModal()`. Add `['sheet-loading', '/?sheet=sheet-loading#stop-load']` and `['sheet-salesman', '/?sheet=sheet-salesman#stop-tally']` to a new `sheets` set in `scripts/shoot.mjs` (and to `all`). Run `node scripts/shoot.mjs sheets`. Acceptance: the whole sheet, title row included, centred on a dim backdrop, Close inside the top-right corner, at both widths.

- [ ] **Step 4: Commit**

```bash
git add src/journey.css src/components/PaperSheet.jsx src/components/__tests__/follow-one-invoice.test.jsx scripts/shoot.mjs
git commit -m "fix(sheet): centre the dialog with its own margin and show the whole sheet"
```

---

### Task 5: The scrolled nav is opaque

Fixes D7.

**Files:**
- Modify: `src/styles.css` (`.site-nav.scrolled`, ~line 300–310), `src/routes/__tests__/home-v3.test.jsx`

- [ ] **Step 1: Read the current rule**, then write a test that the `.site-nav.scrolled` background alpha is ≥ 0.94 (parse the `rgba(...)` or accept a solid hex/token). Expected: FAIL on today's translucent value.

- [ ] **Step 2: Fix**

```css
.site-nav.scrolled { background: rgba(247, 250, 252, 0.96); backdrop-filter: saturate(140%) blur(10px); -webkit-backdrop-filter: saturate(140%) blur(10px); box-shadow: 0 1px 0 var(--color-border), 0 8px 24px rgba(10, 23, 48, 0.08); }
```

Keep the rule's other declarations. Links in the scrolled state stay `var(--color-text-secondary)` on that near-white bar (5.9:1).

- [ ] **Step 3: Shoot** `node scripts/shoot.mjs story` and open `story-remind-1440.png`: the bar is near-white with dark, readable links over the navy band. Commit:

```bash
git add src/styles.css src/routes/__tests__/home-v3.test.jsx
git commit -m "fix(nav): opaque scrolled bar so it reads over the navy bands"
```

---

### Task 6: Hub section headers and card grid

Fixes D11.

**Files:**
- Modify: `src/feature-page.css` (hub section rules), `src/routes/Features.jsx`, `src/routes/__tests__/features-hub.test.jsx`

- [ ] **Step 1: Failing tests** (CSS-parsing, in the style of the file's existing stop-header tests): the hub card grid rule uses `auto-fit` with a max track (`minmax(280px, 380px)`) and `justify-content: start`; `.features-hub-stop-shot` width is ≥ 120px; `.features-hub-group` declares `scroll-margin-top`.

- [ ] **Step 2: Fix**

```css
.features-hub-group { scroll-margin-top: 110px; }
.features-hub-group-header { grid-template-columns: minmax(0, 1fr) auto; align-items: center; column-gap: 40px; }
.features-hub-stop { display: flex; align-items: center; gap: 18px; }
.features-hub-stop-shot { width: 132px; height: auto; }
.features-hub-stamp { font-size: 13px; }
.features-hub-group .tally-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 380px)); justify-content: start; }
```

Order inside the mark: stamp first, then the phone, so the stamp sits next to the title it belongs to. Mobile (≤767px) keeps: image hidden, stamp inline under the title.

- [ ] **Step 3: Run, shoot** `node scripts/shoot.mjs hub`. Acceptance: each section header shows title and intro on the left and a clearly visible stamp + phone on the right at the same right edge as the cards; one-, two- and three-card sections all start at the left edge with equal-width cards and no stretched card; jumping to `/features#send` lands with the section title below the nav.

- [ ] **Step 4: Commit**

```bash
git add src/feature-page.css src/routes/Features.jsx src/routes/__tests__/features-hub.test.jsx
git commit -m "fix(hub): visible section marks, even card grid, titles clear of the nav"
```

---

### Task 7: The right new screen on every feature page

Fixes D12 (screens).

**Files:**
- Modify: `scripts/screens.manifest.json`, `src/data/screens.js`, `content/image-provenance.json`, `src/data/__tests__/screens.test.js`, `src/data/featurePages.js` and its sibling batch files (`grep -ln "hero:" src/data/featurePages*.js`), `src/components/FeaturePage.jsx` (~lines 148 and 179–191), `src/data/__tests__/feature-pages.test.js`, `scripts/checkImageBudgets.mjs` if a page's LCP image changes budget rows
- Output: `public/assets/screens/<slug>-360.webp` and `-720.webp`

**Interfaces:**
- Consumes: `screen(slug)` → `{ slug, src, srcSet, width, height, alt }`.
- Produces: a feature page's `hero` may be `{ screen: '<slug>' }`. `FeaturePage.jsx` resolves it with `const shot = page.hero?.screen ? screen(page.hero.screen) : null` and renders `src/srcSet/sizes/width/height/alt` from `shot`; a page still carrying `{ image, alt, width, height }` renders as today. The preload/LCP path at ~line 148 uses `shot?.src ?? page.hero?.image`.

- [ ] **Step 1: Look at every mockup.** `ls mockups` lists 48 PNGs (ignore the four `-1` duplicates). Open each with the Read tool. For each, record in the task report: filename → what the screen really shows (filenames lie: `Team Sales.png` is "Review invoices, Create 7 invoices") → any phone number, real name with a number, or GSTIN visible (if so: NOT publishable, list it for Ronak to re-capture).

- [ ] **Step 2: Build the page → screen table.** Start from this proposal and correct it against what you saw. A page gets a screen only when the screen shows the thing the page is about; otherwise the page keeps its current image and goes on the "needs a capture" list for Ronak.

| Feature page slug | Proposed source PNG (registry slug) |
|---|---|
| `salesman-app-tally` | `Field visit tracking` (new `field-visits`) |
| `payment-collection-tally` | `Settlements` (`settlements`) |
| `payment-reminder-tally` | `reminder logs` (`reminders`) |
| `send-payment-reminders-automatically` | `Reminder payment` (`reminder-schedule`) |
| `e-invoice-from-phone` | `Invoice summary` if it shows the e-invoice toggle with no phone number (new `invoice-summary`); `Auto einv and eway` is blocked by its phone number |
| `e-way-bill-from-phone` | none exists: keep current image, list for capture |
| `tally-reports-on-mobile` | `Sales Anlaytics` (`sales-analytics`) |
| `multi-company-tally-reports` | `Total FY` if it shows company-level totals (new `total-fy`); else keep |
| `import-purchase-from-pdf`, `bank-statement-import-tally`, `handwritten-order-to-tally` | `DOCUMENT import` (`document-import`) |
| `tally-on-mobile`, `tally-on-mobile-without-remote-access` | `homepage` (`home`) |
| `outstanding-receivables-on-mobile` | `Party list color coded due overdue` (`party-list`) |
| `debtor-ageing-report-on-phone` | `Bills Recievables Report` (new `receivables-report`) |
| `share-ledger-statement-whatsapp` | `Statement setting` (new `statement-settings`) |
| `godown-wise-stock-on-mobile` | `Godown Wise stock` (`godown-stock`) |
| `sales-order-on-mobile`, `order-booking-app-tally` | `Pending order` (`pending-orders`) / `Party Selection` (new `party-selection`) |
| `delivery-challan-from-mobile` | `Load Grid` or `dispatch beat selection` if clean (new slug); the two van screens are blocked by a phone number |
| `custom-invoice-template-tally` | `Invoice setting 1` (new `invoice-settings`) |
| `credit-note-from-phone` | none exists: keep, list for capture |
| `biz-analyst-alternative` | `Customer Analytics` (new `customer-analytics`) |
| `livekeeping-alternative` | `Payment Behavior report` (new `payment-behaviour`) |
| `tally-app-for-fmcg-distributors` | `Load Grid` or `Item wise sale report` (new slug) |
| `tally-app-for-pharma-distributors` | `Maker Checker approval feature` (new `maker-checker`) |
| `tally-app-for-agri-input-distributors` | `Party Detail` (new `party-detail`) |

- [ ] **Step 3: Failing tests.** In `src/data/__tests__/feature-pages.test.js` add: every page whose `hero.screen` is set names a registered slug; at least 20 of the 27 pages use `hero.screen`; no page's `hero.screen` is one of the blocked slugs (`einvoice-eway`, `van-loading`) until Ronak's re-captures land. In `screens.test.js` the manifest/registry/provenance invariants already cover new rows.
Run: `npx vitest run src/data/__tests__/feature-pages.test.js` — Expected: FAIL on the 20-page floor.

- [ ] **Step 4: Export.** Add one manifest row per new slug (`slug`, `source`, honest `shows`, honest `alt`, `q` only if a 720w export exceeds 64,000 bytes), add the matching `phone(...)` entries to `src/data/screens.js` with the TRUE intrinsic height of the 360w export (`sips -g pixelHeight`), run `node scripts/exportScreens.mjs`, and add one provenance record per exported file in the exact shape of the existing `public/assets/screens/` records (`kind: "appScreenshot"`, company 143, `reviewedOn: "2026-09-19"`, `origin` naming the source PNG in `mockups/` and its `shows`). Run `node scripts/checkScreenshotProvenance.mjs` and `node scripts/checkImageBudgets.mjs` until both pass.

- [ ] **Step 5: Wire the pages.** Replace each mapped page's `hero: { image, alt, width, height }` with `hero: { screen: '<slug>' }`. Update `FeaturePage.jsx` as in Interfaces, with `sizes="(max-width: 767px) 70vw, 300px"`. If a build guard or schema field reads `page.hero.image` (`grep -rn "hero\.image\|hero?.image" src scripts`), route it through one helper `heroShot(page)` exported from `src/data/featurePages.js` that returns `{ src, srcSet?, width, height, alt }` for both shapes, and use it everywhere.

- [ ] **Step 6: Run, shoot, look.** Run the two data tests plus `npx vitest run src/routes/__tests__/feature-page.test.jsx`. Extend the `feature` set in `scripts/shoot.mjs` to all 27 slugs, run it, and open every desktop PNG: each page's phone shows the feature the page is about, framed cleanly on navy, nothing cropped.

- [ ] **Step 7: Commit** (two commits: screens export + provenance; page wiring).

---

### Task 8: Copy that matches the screen and the product

Fixes D12 (copy). Scope is bounded on purpose: every claim must come from a source that already exists.

**Files:**
- Modify: `src/data/featurePages*.js` (fields `headline`, `subheadline`, `answer`, `hero` alt via the registry), tests as needed
- Read-only sources: `/Users/ronak/Desktop/PaySaathi/docs/manuals/document-import-capabilities.md` (the model: rows marked **Live** / **Stage only** / **Built, switched off**), `loading-sheet-manual.md`, `stock-control-manual.md`, `autoparts-billing-manual.md`, and the live guides in this repo's `content/guide/`

- [ ] **Step 1:** For each of the 27 pages, open its new hero screenshot (Task 7 shots) beside its `headline`, `subheadline` and `answer`. Where the text names something the screen contradicts, or names a control by a label the screen shows differently, change the minimum words so the text is true of the screen. Record every edit as before → after → why.
- [ ] **Step 2:** For the families with a source file (document import; van loading and loading sheet; stock and godowns; reminders and collections via the guides), check each page's claims against the source. Remove or reword anything the source marks **Stage only** or **Built, switched off**. Do not add a capability the source does not mark **Live**. AI calling is the one cleared exception and always carries "charged on connected minutes".
- [ ] **Step 3:** Run `npx vitest run src/data/__tests__/feature-pages.test.js src/data/schema.test.js src/__tests__/claims-guard.test.js` and `node scripts/checkRetiredClaims.mjs`. Expected: PASS.
- [ ] **Step 4:** Commit per family (`docs(copy): align <family> pages with their screens and the live capability rows`). Put the full before → after table in the task report; Ronak reads it.

Pages whose family has no source file keep their copy apart from Step 1 edits; list them in the report as "needs a capabilities file" for a follow-up.

---

### Task 9: Night checks, then hand back to Ronak

- [ ] **Step 1: Full suite.** `TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__promote-0907 npm test` — Expected: all files green. If that app worktree is gone, pick another from `ls -d ~/.claude/fleet/worktrees/takkada__*/tool/help/visibility-evidence.json`.
- [ ] **Step 2: Build, dry-run.** `INDEXNOW_DRY_RUN=true TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__promote-0907 npm run build` — Expected: exit 0, every `check*` guard OK, `submitIndexNow` reports a dry run.
- [ ] **Step 3: Raw HTML.** `grep -c "<h1" dist/index.html` → 1; `grep -rIlE "17 ?Cr|Fraunces|#344E41" dist | head` → no output.
- [ ] **Step 4: Shoot the built site.** `npx vite preview --port 4173` in the background, then `node scripts/shoot.mjs all --base http://localhost:4173`. Open every PNG. Walk D1–D12 one by one and write "fixed, see <file>" or what is still wrong. Anything still wrong goes back into a fix round before Step 5.
- [ ] **Step 5: Push the branch, no PR.** `git push -u origin feat/site-revamp-navy`. Tell Ronak in plain language: what is fixed (by defect number), what still needs him (re-captures with dummy phone numbers; an e-way bill screen; a credit-note screen; the real wording of a finished AI call; whether "Shreeji Distributors" may appear as the sender), and give him a numbered list of one-line checks (do X → expect Y) for `localhost`. Merge nothing.

## Self-review notes

- Owner review coverage: D1→T3, D2→T3, D3→T3, D4→T3, D5→T3, D6→T4, D7→T5, D8→T1, D9→T1, D10→T1, D11→T6, D12→T7+T8; "tap goes to the feature page"→T1; "come back home whenever needed"→T2.
- Deleted on purpose in T1: the in-phone screen layering, the copy crossfade and the sizer stack built on 2026-09-18. They existed to support opening screens in place, which the owner replaced.
- Names used across tasks: `HOTSPOTS[].href`, `JOBS[].key`, `HERO_HOME.{headline,body}`, `screen(slug)`, `hero.screen`, `heroShot(page)`, `.slip-stamps`, `.foi-message`, `BackHome`, `scripts/shoot.mjs <set>`.
- Known open items carried from the first plan's ledger that this plan does NOT fix: OG and blog card images still green/Fraunces; `--foi-nav-h` unmeasured; pre-existing `transition: all` in `styles.css`/`wuxia-quotes.css`; `aria-live` on the slip announces seven times per pass.
