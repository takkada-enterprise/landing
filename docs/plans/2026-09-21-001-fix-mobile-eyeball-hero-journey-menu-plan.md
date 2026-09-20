# Mobile Eyeball Fixes: Hero Instruction, Job Row Room, Journey Heading, Menu CTAs, Plus the Audit — Implementation Plan

**Status (2026-09-21):** executed; PR #121 open to main, not merged.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Pass `model: "opus"` on every subagent dispatch (PaySaathi CLAUDE.md: never Fable for subagents). Every UI task ends with REAL screenshots at 390 and 1440, opened at full size (memory: UI work is verified by screenshots, never by code review or layout arithmetic). Nothing is built ahead of its task (memory: rulings on a plan mean edit the plan and let the plan process execute it).

**Goal:** Ronak's four phone-screenshot asks of 2026-09-20 22:14–22:18 on the live takkada.com, plus the three same-class problems a full phone walk found beside them, fixed on one branch, screenshot-verified, and put up as a PR to `main` for Ronak to merge.

**Architecture:** Every change is copy, CSS or a one-line JSX swap inside components that already exist; no new component, no new section, no new dependency. The hero instruction becomes a `<strong>` lead inside the existing subtitle with a marigold dot glyph. The job row and proof card get spacing in the two existing mobile media blocks of `src/home.css`. The story heading moves into a `STORY` object in `src/data/journey.js` so the copy-rule sweeps cover it, gains a lead sentence and a per-station `Stop N of 7` line. The mobile menu's two white pills become three different chromes with icons, and the modal-driven button is renamed after what it does ("Book a call") in every renderer plus the modal's own defaults. Audit: tour steps stop dimming on phones, the connector band gets its own headline, the legal name becomes one constant printed everywhere and the copyright year comes from the clock.

**Tech Stack:** Vite 7, React 19, `vite-react-ssg`, plain CSS, Vitest + Testing Library (jsdom), lucide-react icons, headless Chrome via `node scripts/shoot.mjs <set>`.

**Spec:** `docs/brainstorms/2026-09-21-mobile-eyeball-four-asks-handoff.md` (the four screenshots described, the walk's findings, the decisions and the two things Ronak can veto). Branch at planning: worktree `~/.claude/fleet/worktrees/landing__site-revamp` on `feat/site-revamp-navy` at `32dc5bc`, clean, fully contained in `origin/main` (`a1b1803`, PR #120). This plan starts a new branch from `origin/main`.

## Global Constraints

- Worktree `~/.claude/fleet/worktrees/landing__site-revamp`. Task 1 step 1 creates `fix/mobile-eyeball-0921` from `origin/main`; every later task works on it. **Do NOT merge.** Task 6 pushes and opens the PR; Ronak merges. `main` is PR-protected and deploys via Cloudflare on merge (memory: the GitHub Pages workflow is disabled, Actions tells you nothing; verify a release by fetching the live URL).
- Evidence: a UI task is not done until `node scripts/shoot.mjs <set>` has run against `npx vite --port 5173 --strictPort` and the 390 AND 1440 PNGs under `shots/<set>/` have been opened at full size. Headless Chrome's own `--screenshot` with a `#hash` URL captures a blank offset: use the shoot sets. A dev server may already be listening on 5173/4173 from another session (one was on 2026-09-21); if `--strictPort` refuses, use `--port 5199` and `--base http://localhost:5199`.
- Day rule (memory): single test files and headless shots by day. `npm test` (full suite, `TAKKADA_APP_ROOT` set) and `INDEXNOW_DRY_RUN=true npm run build` are night-only and belong to Task 6. A plain `npm run build` pings IndexNow with ~297 live URLs: never run it without `INDEXNOW_DRY_RUN=true`.
- Copy (CLAUDE.md §5, pinned by `src/data/__tests__/journey.test.js` and `src/data/schema.test.js`): no em-dashes; none of seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer, cutting-edge; no "Not X. Y." contrast; no three-word staccato fragments; statements, not questions; the only public scale figure is 100+ businesses.
- Marigold (`--color-highlight`) is the accent dot, the mono time label, the active-stop marker and the focus ring. Never a button fill, a pill fill or a text background (CLAUDE.md §6). The hero dot in Task 1 is a dot.
- Motion contract (CLAUDE.md §11.5): animate only `transform`, `opacity`, `filter`; never `transition: all`; nothing in this plan adds motion.
- Every `home.css` rule head starts with `.home-v3`; every `journey.css` head with `.home-v3` or `.journey-strip` (pinned by `home-v3.test.jsx`).
- Prettier is not configured. Hand-format in the surrounding style: single quotes, 100-column wrap, no trailing comma inside call args in the data files.
- Commits: small, staged by path (never `git add -A`), message describes the diff, trailer lines:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe
  ```
- Subagents: `model: "opus"`. No multi-agent review sweeps unless Ronak asks; review inline.

## Decisions (one per ask; the spec has the reasoning)

| Ask | Decision |
|---|---|
| 1. "Need space here" (job chips) | Row bleeds to the viewport edge with the scrollbar hidden; 48px above it, 64px of navy below; proof card lifted 28px off the navy on phones |
| 2. "Better heading … journey or something" | Title "One invoice, seven stops: from the order at the counter to the receipt in Tally.", one lead sentence, `Stop N of 7` above every station's time label, phone top padding 96 → 64 |
| 3. "Highlight tap any tile, bold it increase the size" | "Tap any tile with a yellow dot." as a 20px/700 white lead with a real marigold dot before it; the rest stays body weight |
| 4. "same thing" (two white pills) | "Book a Demo" → "Book a call" (menu, header fallback, company pages, modal defaults), phone icon, blue outline chrome; "Try the demo" gets a phone-screen icon and keeps the white pill |
| Audit a | `.ftour-step button` opacity 1 below 900px |
| Audit b | Connector band heading → "Your books stay on your PC." |
| Audit c | One legal-name constant, spelled `Pay Saathi Innovation LLP` (CLAUDE.md §13) unless Ronak says otherwise; © year from `new Date().getFullYear()` |

## File structure

| File | Responsibility in this plan |
|---|---|
| `src/data/heroHotspots.js` | Task 1: `HERO_HOME.tap` + `HERO_HOME.body` |
| `src/routes/Home.jsx` | Task 1: the lead `<strong>` in the subtitle |
| `src/home.css` | Task 1: `.hv3-hero-tap`, `.hv3-hero-tap-dot`. Task 2: job-row and proof spacing in the two existing mobile blocks |
| `src/data/journey.js` | Task 3: `STORY` export |
| `src/components/FollowOneInvoice.jsx` | Task 3: title/lead from `STORY`, `Stop N of 7` line |
| `src/journey.css` | Task 3: `.foi-lead`, `.foi-stop-index`, phone `padding-top` |
| `src/Layout.jsx` | Task 4: menu icons, variants, "Book a call". Task 5: © year |
| `src/components/CompanyPageLayout.jsx`, `src/components/PhoneModal.jsx`, `src/context/PhoneModalContext.jsx` | Task 4: "Book a call" and the modal's title/subtitle/submit defaults |
| `src/feature-page.css` | Task 5: no dimming below 900px |
| `src/data/siteContent.js` | Task 5: `tallyTrust.heading`, `contactInfo.company` |
| `src/routes/AboutUs.jsx`, `LegalPrivacy.jsx`, `RefundPolicy.jsx`, `TermsAndConditions.jsx` | Task 5: read the name from `contactInfo.company` |
| Tests: `src/routes/__tests__/home-v3.test.jsx`, `src/components/__tests__/follow-one-invoice.test.jsx`, `src/data/__tests__/journey.test.js`, `src/data/schema.test.js`, `src/Layout.test.jsx`, `src/routes/__tests__/feature-page.test.jsx` | Pins for every task |

Test helpers already in place and reused below: `cssBlock(css, header)` (module-level `const` in `home-v3.test.jsx:250`, returns the text of the first block whose header matches, braces balanced), `renderHome()` (`home-v3.test.jsx:28`), `strings(value, path)` (`journey.test.js:17`, flattens every string in an export), `mount()` + `block(head)` (`follow-one-invoice.test.jsx:44`, `:14`), `openMenu()` (`Layout.test.jsx:501`, returns `{ container, menu, actions() }`), `renderLayout()` (`Layout.test.jsx`, returns the container).

---

### Task 1: The tap instruction is the hero's lead line (ask 3)

**Files:**
- Modify: `src/data/heroHotspots.js:21-24` (`HERO_HOME`)
- Modify: `src/routes/Home.jsx:90` (the subtitle)
- Modify: `src/home.css` (after the `.home-v3 .hv3-hero .hero-subtitle` rule, ~line 63)
- Test: `src/routes/__tests__/home-v3.test.jsx`

**Interfaces:**
- Produces: `HERO_HOME = { headline, tap, body }`. `HERO_HOME.body` no longer contains the tap sentence. The only reader of `HERO_HOME.body` is `Home.jsx:90` (verified 2026-09-21 by `grep -rn "HERO_HOME\." src`); `journey.test.js` and `schema.test.js` sweep every string of `HERO_HOME` generically and need no edit.

- [ ] **Step 1: Branch off `origin/main`**

```bash
cd ~/.claude/fleet/worktrees/landing__site-revamp
git status --short            # must print nothing
git fetch -q origin
git checkout -b fix/mobile-eyeball-0921 origin/main
git log --oneline -1          # a1b1803 Merge pull request #120 …
```

- [ ] **Step 2: Write the failing tests**

Append to `src/routes/__tests__/home-v3.test.jsx`, after the `describe('the hero links directly to feature pages', …)` block (it ends after the alpha-floor test, ~line 158):

```jsx
// Ronak, 2026-09-20 22:18, on his phone: "Highlight tap any tile, bold it
// increase the size, otherwise most people will ignore". The instruction was
// body copy at 17px / 72% white. It is now the lead line, and the dot in front
// of it is the same marigold as the dots on the phone it points at.
describe('the tap instruction is the hero lead', () => {
  it('renders the instruction as a bold lead with a marigold dot, then the rest as body', () => {
    const { container } = renderHome();
    const sub = container.querySelector('.hv3-hero .hero-subtitle');
    const lead = sub.querySelector('strong.hv3-hero-tap');
    expect(lead).toBeTruthy();
    expect(lead.textContent.trim()).toBe(HERO_HOME.tap);
    expect(lead.querySelector('.hv3-hero-tap-dot[aria-hidden="true"]')).toBeTruthy();
    expect(sub.textContent).toContain(HERO_HOME.body);
    expect(HERO_HOME.body).not.toMatch(/tap any tile/i);
  });

  it('sets the lead at 20px / 700 in white, and paints the dot in the highlight token', () => {
    const css = readFileSync('src/home.css', 'utf8');
    const lead = cssBlock(css, '.home-v3 .hv3-hero-tap {');
    expect(lead, 'no .hv3-hero-tap rule').not.toBe('');
    expect(Number(lead.match(/font-size:\s*(\d+)px/)?.[1])).toBeGreaterThanOrEqual(20);
    expect(Number(lead.match(/font-weight:\s*(\d+)/)?.[1])).toBeGreaterThanOrEqual(700);
    expect(lead).toMatch(/color:\s*#fff\b/i);
    const dot = cssBlock(css, '.home-v3 .hv3-hero-tap-dot {');
    expect(dot).toMatch(/background:\s*var\(--color-highlight\)/);
    expect(dot).toMatch(/border-radius:\s*50%/);
  });
});
```

- [ ] **Step 3: Run the file, watch the two new tests fail**

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx`
Expected: the two new tests FAIL (`lead` is null; `.hv3-hero-tap` block is `''`). Everything else in the file passes.

- [ ] **Step 4: Split the copy**

In `src/data/heroHotspots.js`, replace lines 21–24:

```js
export const HERO_HOME = {
  headline: 'Your Tally, in your pocket.',
  // The one instruction on the page, on its own line so it cannot be read past
  // (Ronak, 2026-09-20: at body weight "most people will ignore" it).
  tap: 'Tap any tile with a yellow dot.',
  body: 'This is the real home screen. Each dot opens how that part works, then brings you back here.',
};
```

- [ ] **Step 5: Render the lead**

In `src/routes/Home.jsx`, replace line 90 (`<p className="hero-subtitle">{HERO_HOME.body}</p>`) with:

```jsx
            <p className="hero-subtitle">
              <strong className="hv3-hero-tap">
                <span className="hv3-hero-tap-dot" aria-hidden="true" />
                {HERO_HOME.tap}
              </strong>{' '}
              {HERO_HOME.body}
            </p>
```

- [ ] **Step 6: Style it**

In `src/home.css`, directly after the `.home-v3 .hv3-hero .hero-subtitle { … }` rule (ends ~line 63), insert:

```css
/* The instruction is the hero's lead line (Ronak, 2026-09-20: at body weight
   "most people will ignore" it). Its own row, heavier and larger than the body
   under it, and a real marigold dot in front: the same --color-highlight as the
   dots on the phone, so the words and the thing they point at share a colour.
   A dot is inside the marigold rule (§6); it is still never a fill behind text. */
.home-v3 .hv3-hero-tap {
  display: block;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
  color: #fff;
  margin-bottom: 8px;
}

.home-v3 .hv3-hero-tap-dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-highlight);
  box-shadow: 0 0 0 4px rgba(252, 175, 27, 0.22);
  margin-right: 10px;
  vertical-align: 1px;
}
```

- [ ] **Step 7: Run the file green, plus the two copy sweeps**

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx src/data/__tests__/journey.test.js src/data/schema.test.js`
Expected: all PASS.

- [ ] **Step 8: Look at it**

```bash
npx vite --port 5173 --strictPort &      # or 5199 if 5173 is taken
node scripts/shoot.mjs home              # add --base http://localhost:5199 if needed
```
Open `shots/home/home-top-390.png` and `shots/home/home-top-1440.png` at full size. Check: the lead reads as one line on desktop and two at most on the phone, the dot sits on the text baseline and is the same yellow as the phone's dots, the body under it is visibly lighter. If the phone lead wraps to three lines, drop `font-size` to 19px (the test floor is 20; change the floor and this step together, and say so in the commit).

- [ ] **Step 9: Commit**

```bash
git add src/data/heroHotspots.js src/routes/Home.jsx src/home.css src/routes/__tests__/home-v3.test.jsx
git commit -m "fix(home): the tap instruction is the hero lead, with the marigold dot in front of it

Ronak on his phone, 2026-09-20: bold it, make it bigger, or people ignore it.
HERO_HOME splits into tap + body; the tap renders as a 20px/700 <strong>
with a --color-highlight dot glyph, the body stays 17px under it.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe"
```

---

### Task 2: The phone hero gives the job row room and lifts the proof card (ask 1)

**Files:**
- Modify: `src/home.css` — the `@media (max-width: 1000px)` block (~lines 158–186) and the first `@media (max-width: 767px)` block (the proof one, ~lines 258–271)
- Test: `src/routes/__tests__/home-v3.test.jsx`

**Interfaces:**
- Consumes: nothing from Task 1 beyond the branch.
- Produces: CSS only. No class names change.

- [ ] **Step 1: Write the failing tests**

Append to `src/routes/__tests__/home-v3.test.jsx`:

```jsx
// Ronak, 2026-09-20 22:14: "Need space here", on a shot of the job chips sitting
// in a bare navy field under the browser's scrollbar, the fourth chip cut at the
// edge, and the white proof card starting flush against the navy.
describe('the phone hero gives the job row room', () => {
  const css = readFileSync('src/home.css', 'utf8');
  const stacked = cssBlock(css, '@media (max-width: 1000px)');

  it('hides the scrollbar and bleeds the row to the viewport edge', () => {
    const jobs = cssBlock(stacked, '.home-v3 .hv3-hero-jobs {');
    expect(jobs).toMatch(/scrollbar-width:\s*none/);
    expect(jobs).toMatch(/margin:\s*48px -16px 0/);
    expect(jobs).toMatch(/padding:\s*0 16px 8px/);
    expect(stacked).toMatch(/\.hv3-hero-jobs::-webkit-scrollbar\s*\{\s*display:\s*none/);
  });

  it('keeps 64px of navy under the row and lifts the proof card 28px off it', () => {
    expect(cssBlock(stacked, '.home-v3 .hv3-hero {')).toMatch(/padding:\s*96px 0 64px/);
    // The first 767px block in home.css is the proof strip's.
    const phone = cssBlock(css, '@media (max-width: 767px)');
    expect(cssBlock(phone, '.home-v3 .hv3-proof {')).toMatch(/padding:\s*28px 0 72px/);
  });
});
```

- [ ] **Step 2: Run the file, watch the two new tests fail**

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx`
Expected: both new tests FAIL on the first `toMatch`.

- [ ] **Step 3: Edit the stacked block**

In `src/home.css`, inside `@media (max-width: 1000px) { … }`:

Replace
```css
  .home-v3 .hv3-hero {
    padding-top: 96px;
  }
```
with
```css
  .home-v3 .hv3-hero {
    /* 64 below, not 48: the job row is the last thing in the band on a phone
       and sat on its bottom edge (Ronak, 2026-09-20: "Need space here"). */
    padding: 96px 0 64px;
  }
```

Replace
```css
  .home-v3 .hv3-hero-jobs {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    overflow-x: auto;
    padding-bottom: 8px;
    margin-top: 40px;
  }
```
with
```css
  .home-v3 .hv3-hero-jobs {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    overflow-x: auto;
    /* Bleeds to the viewport edge, so a chip cut at the edge reads as "more
       this way" instead of as a layout fault, and the browser's scrollbar
       stays off it: Android painted a grey bar under the row. */
    margin: 48px -16px 0;
    padding: 0 16px 8px;
    scrollbar-width: none;
  }
  .home-v3 .hv3-hero-jobs::-webkit-scrollbar {
    display: none;
  }
```

- [ ] **Step 4: Edit the proof block**

In the first `@media (max-width: 767px)` block, replace
```css
  .home-v3 .hv3-proof { padding: 0 0 72px; }
```
with
```css
  /* 28px off the navy: the card used to start on the band's bottom edge. */
  .home-v3 .hv3-proof { padding: 28px 0 72px; }
```

- [ ] **Step 5: Run the file green**

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx`
Expected: PASS, including the scoping test (every head still starts with `.home-v3`).

- [ ] **Step 6: Look at it**

`node scripts/shoot.mjs home` (dev server from Task 1 step 8). Open `shots/home/home-top-390.png`: the phone hero fold. Then, because the chips are below that fold on a 844px phone, take one more with the page scrolled: temporarily run
```bash
node -e "
const { execSync } = require('node:child_process');
" # (no helper exists for an offset shot; use the story set instead)
node scripts/shoot.mjs story
```
`shots/story/story-order-390.png` lands on `#stop-order`, which is below the proof card, so it does not show the junction. **Do this instead:** in Chrome (not headless) at 390px device emulation, load the page, scroll so the job chips are at the top of the viewport, and screenshot with the DevTools "Capture screenshot" command; save it to `shots/home/home-jobs-390.png`. Check: no scrollbar under the chips, the row's first chip aligns with the 16px gutter, the cut chip sits at the true viewport edge, there is a clear navy margin under the row, and the white card floats off the navy with pale background visible above it. At 1440 nothing may have moved (`home-top-1440.png` is byte-different only if the hero changed; compare against Task 1's).

- [ ] **Step 7: Commit**

```bash
git add src/home.css src/routes/__tests__/home-v3.test.jsx
git commit -m "fix(home): the phone job row bleeds to the edge without a scrollbar, and the proof card lifts off the navy

Ronak, 2026-09-20: \"Need space here\". 48 above the row, 64 below, the
scrollbar hidden, the row bleeding to the viewport edge; the proof strip gets
28px of top padding on phones (desktop already had 24).

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe"
```

---

### Task 3: The story says it is a journey (ask 2)

**Files:**
- Modify: `src/data/journey.js` (add `STORY` after `INVOICE`, before `STOPS`, ~line 79)
- Modify: `src/components/FollowOneInvoice.jsx:70-77` (intro) and `:105-106` (station copy)
- Modify: `src/journey.css` (after `.home-v3 .foi-intro .section-title`, ~line 129; before `.home-v3 .foi-when`, ~line 343; inside the `@media (max-width: 900px)` `.home-v3 .foi` rule, ~line 714)
- Test: `src/components/__tests__/follow-one-invoice.test.jsx`, `src/routes/__tests__/home-v3.test.jsx:47`, `src/data/__tests__/journey.test.js:226-233`, `src/data/schema.test.js:166-174`

**Interfaces:**
- Produces: `export const STORY = { label, title, lead }` from `src/data/journey.js`. `home-v3.test.jsx` imports `STORY` from `'../../data/journey'`.

- [ ] **Step 1: Write the failing tests**

In `src/components/__tests__/follow-one-invoice.test.jsx`, change the import on line 7 to
```js
import { STOPS, STORY, INVOICE } from '../../data/journey';
```
and add inside `describe('FollowOneInvoice', …)`, after the first `it(…)`:

```jsx
  // Ronak, 2026-09-20 22:15, on his phone: "Need better heading so that I
  // understand what to expect going down, journey or something". The title
  // named the two ends and nothing said "stops". On desktop the slip's stop
  // rail carried that; below 900px the rail is hidden, so each station now
  // says where it is in the walk.
  it('tells the reader it is a walk: a lead under the title and a stop counter on every station', () => {
    const { container } = mount();
    expect(container.querySelector('#foi-title').textContent).toBe(STORY.title);
    expect(STORY.title).toMatch(/seven stops/i);
    expect(container.querySelector('.foi-intro .foi-lead').textContent).toBe(STORY.lead);
    const counters = [...container.querySelectorAll('.foi-station .foi-stop-index')].map(
      (el) => el.textContent
    );
    expect(counters).toEqual(STOPS.map((_, i) => `Stop ${i + 1} of ${STOPS.length}`));
  });

  it('styles the counter in the accent blue so the time label stays the one marigold', () => {
    expect(block('.home-v3 .foi-stop-index')).toMatch(/color:\s*var\(--color-accent\)/);
    expect(block('.home-v3 .foi-when')).toMatch(/color:\s*var\(--color-highlight\)/);
  });

  it('opens with 64px of navy on a phone, not 96', () => {
    const phone = css.slice(css.indexOf('@media (max-width: 900px)'));
    expect(block('.home-v3 .foi'), 'desktop padding unchanged').toMatch(/padding:\s*96px 0 40px/);
    const i = phone.indexOf('.home-v3 .foi {');
    expect(phone.slice(i, phone.indexOf('}', i))).toMatch(/padding-top:\s*64px/);
  });
```

In `src/routes/__tests__/home-v3.test.jsx`: change the import on line 16 to `import { STOPS, STORY } from '../../data/journey';` and line 47 to
```js
    expect(h2s).toContain(STORY.title);
```

In `src/data/__tests__/journey.test.js`: line 8 already imports from `'../heroHotspots'`; find the import of `STOPS`/`INVOICE` from `'../journey'` near the top and add `STORY` to it; then in the `exports` object (~line 226) add `STORY,` after `STOPS,`.

In `src/data/schema.test.js`: add `STORY` to the `import { … } from './journey'` line (find it with `grep -n "from './journey'" src/data/schema.test.js`; if the file imports `STOPS` from there, extend that line) and add `STORY,` to `HOME_COPY` after `STOPS,` (~line 170).

- [ ] **Step 2: Run the four files, watch them fail**

Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx src/routes/__tests__/home-v3.test.jsx src/data/__tests__/journey.test.js src/data/schema.test.js`
Expected: FAIL with `STORY` undefined / `does not provide an export named 'STORY'`.

- [ ] **Step 3: Add `STORY`**

In `src/data/journey.js`, after the `INVOICE` object and before `export const STOPS = [`, insert:

```js
// The section's own heading. It says out loud that what follows is a walk
// through stops: below 900px the slip's stop rail is hidden, so on a phone the
// title was the only thing left to say so, and it did not (Ronak, 2026-09-20:
// "so that I understand what to expect going down"). "One invoice, seven stops"
// is the phrase the feature pages' journey strip already uses.
export const STORY = {
  label: 'Follow one invoice',
  title: 'One invoice, seven stops: from the order at the counter to the receipt in Tally.',
  lead: 'Scroll down and follow it. The slip is stamped at every stop, and each stop links to the feature behind it.',
};
```

- [ ] **Step 4: Render it**

In `src/components/FollowOneInvoice.jsx`:

Line 11: `import { STOPS, STORY, liveFeatures } from '../data/journey';`

Replace the intro (lines 70–75):
```jsx
      <div className="foi-intro">
        <span className="section-label">{STORY.label}</span>
        <h2 className="section-title" id="foi-title">
          {STORY.title}
        </h2>
        <p className="foi-lead">{STORY.lead}</p>
      </div>
```

Replace the first line of the station copy (line 105, `<div className="foi-when tabular-nums">{stop.when}</div>`) with:
```jsx
                  <div className="foi-stop-index tabular-nums">{`Stop ${i + 1} of ${STOPS.length}`}</div>
                  <div className="foi-when tabular-nums">{stop.when}</div>
```

- [ ] **Step 5: Style it**

In `src/journey.css`, after the `.home-v3 .foi-intro .section-title { … }` rule:
```css
.home-v3 .foi-lead {
  color: rgba(255, 255, 255, 0.72);
  font-size: 17px;
  line-height: 1.6;
  max-width: 560px;
  margin: 12px 0 0;
}
```

Before `.home-v3 .foi-when {`:
```css
/* "Stop 1 of 7": where the reader is in the walk. On desktop the slip's stop
   rail says the same thing; below 900px that rail is hidden and this is what
   remains. Accent blue, so the marigold time label under it stays the one
   marigold on the station. */
.home-v3 .foi-stop-index {
  font: 500 12px var(--font-mono);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 6px;
}
```

Inside the `@media (max-width: 900px)` block, change
```css
  .home-v3 .foi {
    --foi-nav-h: 56px;
    --foi-bar-h: 118px;
  }
```
to
```css
  .home-v3 .foi {
    --foi-nav-h: 56px;
    --foi-bar-h: 118px;
    /* 96px of empty navy above the eyebrow was a screen's worth of nothing on
       a phone (Ronak's 2026-09-20 shot of this section). */
    padding-top: 64px;
  }
```

- [ ] **Step 6: Run the four files green**

Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx src/routes/__tests__/home-v3.test.jsx src/data/__tests__/journey.test.js src/data/schema.test.js`
Expected: all PASS. If the copy sweep flags `STORY`, the word is in the banned list: rewrite, do not weaken the test.

- [ ] **Step 7: Look at it**

`node scripts/shoot.mjs story`. Open `shots/story/story-order-390.png` and `-1440.png`: the counter sits above the marigold time label in pale blue, one line; the title wraps to three or four lines on the phone at most. The intro is above `#stop-order`, so also open the section top: load `http://localhost:5173/#digital-collection` in Chrome at 390 device emulation and screenshot it into `shots/story/story-intro-390.png`. Check: eyebrow, title, lead, then the slip bar, with visibly less navy above the eyebrow than before.

- [ ] **Step 8: Commit**

```bash
git add src/data/journey.js src/components/FollowOneInvoice.jsx src/journey.css \
  src/components/__tests__/follow-one-invoice.test.jsx src/routes/__tests__/home-v3.test.jsx \
  src/data/__tests__/journey.test.js src/data/schema.test.js
git commit -m "feat(home): the invoice story announces its seven stops and counts them on every station

Ronak, 2026-09-20: the heading did not say what was coming. STORY carries the
title, the eyebrow and one lead sentence; each station prints Stop N of 7
above its time label (the phone's stand-in for the hidden desktop stop rail);
phone top padding 96 -> 64.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe"
```

---

### Task 4: Three menu actions, three looks, and "Book a call" (ask 4)

**Files:**
- Modify: `src/Layout.jsx:4` (lucide import), `:265` (header fallback), `:348-363` (menu actions)
- Modify: `src/components/CompanyPageLayout.jsx:20-22`
- Modify: `src/context/PhoneModalContext.jsx:6-8`, `src/components/PhoneModal.jsx:37-39`
- Test: `src/Layout.test.jsx:527`, `:541`, plus one new test in the same `describe('mobile menu actions', …)`

**Interfaces:**
- Consumes: `DemoTryCTA` accepts `children` (renders them as the button label when the flag is on; ignores them and renders `WhatsAppCTA` when off). `CTAButton` variants: `primary`, `secondary`, `outline`, `dark`, `outline-light` (`src/styles.css:744-806`). `WhatsAppCTA` defaults to `variant = 'primary'`.
- Produces: the label `Book a call` wherever the phone-capture modal is opened for the calendar destination. The calendar *links* ("Book a 15-min demo", `CalendarCTA`) are out of scope and untouched.

- [ ] **Step 1: Write the failing tests**

In `src/Layout.test.jsx`, change line 527 to
```js
    expect(labels).toEqual(['Try the demo', 'Chat on WhatsApp', 'Book a call']);
```
and line 541 to
```js
    expect(labels).toEqual(['Chat on WhatsApp', 'Book a call']);
```
Add inside `describe('mobile menu actions', …)`, after the "in that order" test:

```jsx
  // Ronak, 2026-09-20 22:18, circling both white pills: "same thing". They
  // were two full-width white pills both ending in "demo". Now the live demo
  // keeps the white pill, the conversation keeps the filled one, and the call
  // is a blue outline, each with its own icon and no shared word.
  it('gives the three actions three different chromes and an icon each', () => {
    const { actions } = openMenu();
    const variants = actions().map((el) => el.className.match(/cta-btn--(primary|secondary|outline|dark)\b/)?.[1]);
    expect(variants).toEqual(['secondary', 'primary', 'outline']);
    for (const el of actions()) {
      expect(el.querySelector('svg'), `${el.textContent.trim()} has no icon`).toBeTruthy();
    }
    expect(actions().map((el) => el.textContent.trim()).filter((t) => /demo/i.test(t))).toEqual([
      'Try the demo',
    ]);
  });
```

- [ ] **Step 2: Run the file, watch it fail**

Run: `npx vitest run src/Layout.test.jsx`
Expected: the "in that order", "falls back" and the new test FAIL on `Book a Demo` / `secondary` vs `outline`.

- [ ] **Step 3: The menu and the header fallback**

`src/Layout.jsx` line 4:
```js
import { ArrowRight, ChevronDown, Download, Menu, PhoneCall, Plug, Smartphone, X } from 'lucide-react';
```

Line 265:
```jsx
            <CTAButton variant="secondary" type="button" onClick={() => setOpen(true)}>Book a call</CTAButton>
```

Lines 341–363 (the comment and the three actions) become:
```jsx
        {/* The phone is the surface the OTP handoff was built for, so the demo
            goes first. Guarded by the flag for the same reason as the header:
            DemoTryCTA's fallback is a WhatsApp button and the menu already has
            one. Three actions, three chromes, an icon each, and "demo" appears
            once: the two white pills read as "same thing" to Ronak on
            2026-09-20, and they were not. */}
        {demoEntryLive && (
          <DemoTryCTA
            context="mobile-menu"
            variant="secondary"
            fullWidth
            onClick={() => setMenuOpen(false)}
          >
            <Smartphone size={18} aria-hidden="true" /> Try the demo
          </DemoTryCTA>
        )}
        <WhatsAppCTA context="header" fullWidth onClick={() => setMenuOpen(false)} />
        <CTAButton
          variant="outline"
          type="button"
          fullWidth
          onClick={() => { setMenuOpen(false); setOpen(true); }}
        >
          <PhoneCall size={18} aria-hidden="true" /> Book a call
        </CTAButton>
```
Also update the two comments that quote the old label: line 20 (`on their way to Book a Demo`) → `on their way to Book a call`; line 236 (`"Book a Demo" keeps the hero, …`) → `"Book a call" keeps the hero, …`.

- [ ] **Step 4: The other renderers and the modal's defaults**

`src/components/CompanyPageLayout.jsx:21`: `Book a call <ArrowRight size={18} />`

`src/context/PhoneModalContext.jsx:6-8` and `src/components/PhoneModal.jsx:37-39`, both to:
```js
  title: 'Book a call',
  subtitle: 'Enter your number and pick a 15-minute slot. We call you on it.',
  submitLabel: 'Pick a time',
```
(in `PhoneModal.jsx` these are default parameters: `title = 'Book a call',` etc.)

Then sweep: `grep -rn "Book a Demo\|Continue to Book\|personalized walkthrough" src` must print nothing outside test files; fix any hit.

- [ ] **Step 5: Run the affected files green**

Run: `npx vitest run src/Layout.test.jsx src/components/PhoneModal.test.jsx src/components/__tests__/demo-try-cta.test.jsx`
Expected: all PASS.

- [ ] **Step 6: Look at it**

`node scripts/shoot.mjs menu` shoots the desktop Features dropdown, not the phone menu. For the phone menu: in Chrome at 390 device emulation, tap the hamburger and screenshot into `shots/menu/mobile-menu-390.png`. Check: white pill with a phone-screen icon "Try the demo", filled "Chat on WhatsApp", blue-outline "Book a call" with a handset icon, all three full width, the outline pill visibly different from the auto-width "Tally Connector" link above them. Then tap "Book a call": the modal title reads "Book a call", the button "Pick a time". Also open `/about-us` at 390 and check the company-page CTA reads "Book a call".

- [ ] **Step 7: Commit**

```bash
git add src/Layout.jsx src/components/CompanyPageLayout.jsx src/context/PhoneModalContext.jsx \
  src/components/PhoneModal.jsx src/Layout.test.jsx
git commit -m "fix(nav): the mobile menu's three actions get three chromes, and Book a Demo becomes Book a call

Ronak, 2026-09-20, circling both white pills: \"same thing\". Try the demo
keeps the white pill and gains a phone-screen icon; Chat on WhatsApp stays
filled; the modal path is a blue outline with a handset icon and is named
after what it does. The modal's own title, subtitle and submit label follow.
CalendarCTA links are untouched.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe"
```

---

### Task 5: The audit's three fixes

**Files:**
- Modify: `src/feature-page.css` (after `.ftour-step.is-active button { … }`, ~line 906)
- Modify: `src/data/siteContent.js:67` (`tallyTrust.heading`), `:679` (`contactInfo.company`)
- Modify: `src/Layout.jsx:472` (© year)
- Modify: `src/routes/AboutUs.jsx`, `src/routes/LegalPrivacy.jsx`, `src/routes/RefundPolicy.jsx`, `src/routes/TermsAndConditions.jsx` (each prints the legal name as a literal today)
- Test: `src/routes/__tests__/feature-page.test.jsx`, `src/routes/__tests__/home-v3.test.jsx`, `src/Layout.test.jsx`

**Interfaces:**
- Produces: `contactInfo.company` is the only spelling of the legal name under `src/`. Value `'Pay Saathi Innovation LLP'` (CLAUDE.md §13) **unless Ronak has answered the open question with the plural**, in which case set that value AND correct CLAUDE.md §13 in the same commit.

- [ ] **Step 1: Write the failing tests**

`src/routes/__tests__/feature-page.test.jsx`, append at the end of the file:
```jsx
// The homepage story already carries the ruling "nothing dims on a phone: a
// station fills the screen on its own, so the dim would only read as a broken
// page". The feature-page tour never got it: on /salesman-app-tally at 390 the
// steps below the active one rendered at 40% and read as disabled copy
// (2026-09-21 phone walk).
describe('the feature tour does not dim its steps on a phone', () => {
  it('restores full opacity on .ftour-step button below 900px', () => {
    const css = readFileSync('src/feature-page.css', 'utf8');
    const at = css.indexOf('@media (max-width: 899px)');
    expect(at, 'no 899px block in feature-page.css').toBeGreaterThan(-1);
    expect(css.slice(at)).toMatch(/\.ftour-step button\s*\{\s*opacity:\s*1;?\s*\}/);
  });
});
```

`src/routes/__tests__/home-v3.test.jsx`, append:
```jsx
// Two headlines on one page said the same thing: the hero's "Your Tally, in
// your pocket." and, six screens later, the connector band's "Your Tally. Now
// on your phone." (2026-09-21 phone walk).
describe('the connector band has its own headline', () => {
  it('has no h2 that opens the way the hero does', () => {
    const { container } = renderHome();
    const h2s = [...container.querySelectorAll('h2')].map((h) => h.textContent);
    expect(h2s.filter((t) => /^your tally[,.]/i.test(t))).toEqual([]);
  });
});
```

`src/Layout.test.jsx`, inside the describe that owns `renderLayout()` (the one with "keeps the button row at two pills"), add:
```jsx
  // The footer said "Pay Saathi Innovations LLP" and "© 2025"; the data-safety
  // card two screens up said "Pay Saathi Innovation LLP" (2026-09-21 walk).
  it('prints the current year and the one legal name in the footer', () => {
    const footer = renderLayout().querySelector('.footer-bottom');
    expect(footer.textContent).toContain(`© ${new Date().getFullYear()} ${contactInfo.company}.`);
    expect(contactInfo.company).toBe('Pay Saathi Innovation LLP');
  });
```
(`contactInfo` comes from `'./data/siteContent'`; add it to that import in the test if it is not already imported.)

- [ ] **Step 2: Run the three files, watch the three new tests fail**

Run: `npx vitest run src/routes/__tests__/feature-page.test.jsx src/routes/__tests__/home-v3.test.jsx src/Layout.test.jsx`
Expected: the three new tests FAIL; nothing else changes.

- [ ] **Step 3: Tour steps**

In `src/feature-page.css`, directly after
```css
.ftour-step.is-active button {
  opacity: 1;
}
```
add:
```css
/* Nothing dims on a phone (same ruling as the homepage story in journey.css):
 * a step fills the screen on its own there, so a 40% step reads as disabled
 * copy rather than as "not yet". Desktop keeps the dim; the sticky phone beside
 * the list is what makes it legible as focus. */
@media (max-width: 899px) {
  .ftour-step button {
    opacity: 1;
  }
}
```

- [ ] **Step 4: Connector heading and legal name**

`src/data/siteContent.js:67`: `heading: 'Your books stay on your PC.',`

`src/data/siteContent.js:679`: `company: 'Pay Saathi Innovation LLP',` (or Ronak's answer, see Interfaces).

`src/Layout.jsx:472`:
```jsx
          <p>&copy; {new Date().getFullYear()} {contactInfo.company}. All rights reserved.</p>
```

In each of `src/routes/AboutUs.jsx`, `LegalPrivacy.jsx`, `RefundPolicy.jsx`, `TermsAndConditions.jsx`: `grep -n "Innovations LLP" <file>` and replace each literal `Pay Saathi Innovations LLP` with `{contactInfo.company}` (inside JSX text) or `${contactInfo.company}` (inside a template string), importing `contactInfo` from `'../data/siteContent'` where the file does not already. Where the literal sits inside a longer sentence, keep the sentence and swap only the name. Then:
```bash
grep -rn "Innovations LLP" src && echo "STILL THERE" || echo "clean"
grep -rn "Innovations LLP" content public index.html   # report these in the PR body; blog prose is not this plan's
```

- [ ] **Step 5: Run the three files green, plus the pages you touched**

Run: `npx vitest run src/routes/__tests__/feature-page.test.jsx src/routes/__tests__/home-v3.test.jsx src/Layout.test.jsx src/data/schema.test.js src/routes/__tests__/home-trust.test.jsx`
Expected: all PASS.

- [ ] **Step 6: Look at it**

`node scripts/shoot.mjs walk` is 29 pages; use one: load `http://localhost:5173/salesman-app-tally#tour` in Chrome at 390 device emulation and screenshot into `shots/walk/walk-salesman-app-tally-390-nodim.png`. Check: steps 2 and 3 are as dark as step 1. Connector band: no shoot set lands on it, so open `http://localhost:5173/#tally` in Chrome at 1440 and at 390 device emulation and read "Your books stay on your PC." under the eyebrow. Footer: open `/about-us` at 390, scroll to the bottom, read `© 2026 Pay Saathi Innovation LLP` (or Ronak's spelling).

- [ ] **Step 7: Commit**

```bash
git add src/feature-page.css src/data/siteContent.js src/Layout.jsx \
  src/routes/AboutUs.jsx src/routes/LegalPrivacy.jsx src/routes/RefundPolicy.jsx src/routes/TermsAndConditions.jsx \
  src/routes/__tests__/feature-page.test.jsx src/routes/__tests__/home-v3.test.jsx src/Layout.test.jsx
git commit -m "fix(site): tour steps do not dim on phones, the connector band gets its own headline, one legal name and a live year

From the 2026-09-21 phone walk: .ftour-step button was 40% at every width and
read as disabled on a phone; the connector band repeated the hero's headline;
the footer and four legal pages spelled the LLP one way and the data-safety
card another, under a typed 2025.

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe"
```

---

### Task 6: Night checks, push, PR, memory

**Files:**
- Modify (append a Status line): `docs/plans/2026-09-21-001-fix-mobile-eyeball-hero-journey-menu-plan.md`
- Memory: `/Users/ronak/.claude/projects/-Users-ronak-Desktop-PaySaathi/memory/`

- [ ] **Step 1: Full suite**

```bash
cd ~/.claude/fleet/worktrees/landing__site-revamp
APP=$(ls -d ~/.claude/fleet/worktrees/takkada__*/tool/help/visibility-evidence.json | head -1 | xargs dirname | xargs dirname | xargs dirname)
TAKKADA_APP_ROOT=$APP npm test 2>&1 | tail -15
```
Expected: `Test Files  N passed`, `0 failed`. The eight "built page preloads the hero" tests read `dist/` and go red until step 2 has run once; if they are the only reds, run step 2 and rerun this step.

- [ ] **Step 2: Build with IndexNow dry**

```bash
INDEXNOW_DRY_RUN=true npm run build 2>&1 | tail -25
```
Expected: exit 0, every guard prints OK (`checkFeaturesHub`, `checkRateCardDrift`, `checkImageBudgets`, …). If `checkRateCardDrift` flags the new copy, nothing in this plan carries a rupee figure: read the flagged line and fix the copy, never the guard.

- [ ] **Step 3: Shots on the built site**

```bash
npx vite preview --port 4173 --strictPort &   # or 4199 if taken; then --base http://localhost:4199
node scripts/shoot.mjs home
node scripts/shoot.mjs story
```
Open every 390 and 1440 PNG in `shots/home` and `shots/story` at full size. Compare with the dev shots from Tasks 1–3: same result. Kill the preview.

- [ ] **Step 4: Push and open the PR (do not merge)**

```bash
git push -u origin fix/mobile-eyeball-0921
gh pr create --base main --title "Mobile eyeball fixes: hero instruction, job row room, journey heading, menu CTAs, audit" --body "$(cat <<'EOF'
Ronak's four phone-screenshot asks of 2026-09-20 22:14–22:18 on the live site, plus three same-class findings from a full phone walk. Spec: docs/brainstorms/2026-09-21-mobile-eyeball-four-asks-handoff.md. Plan: docs/plans/2026-09-21-001-fix-mobile-eyeball-hero-journey-menu-plan.md.

- Hero: "Tap any tile with a yellow dot." is a 20px/700 lead with a marigold dot glyph; the rest stays body.
- Hero, phone: job row bleeds to the edge without a scrollbar, 48 above / 64 below; proof card 28px off the navy.
- Story: "One invoice, seven stops: …" title, one lead sentence, "Stop N of 7" on every station; phone top padding 96 → 64.
- Mobile menu: Try the demo (white, phone-screen icon) / Chat on WhatsApp (filled) / Book a call (blue outline, handset icon). "Book a Demo" → "Book a call" in the header fallback, company pages and the modal's defaults. CalendarCTA links untouched.
- Audit: tour steps no longer dim below 900px; connector band heading "Your books stay on your PC."; legal name is one constant (`contactInfo.company`) on the footer and four legal pages; © year from the clock.

Not done: "Innovations LLP" spellings outside src/ (list from `grep -rn "Innovations LLP" content public index.html`): <paste>.

Checks: full suite green with TAKKADA_APP_ROOT; INDEXNOW_DRY_RUN build green; 390 + 1440 shots opened for home, story, the phone menu, /salesman-app-tally#tour and /about-us.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01XGF8HJYMkQkyuvt19h1gTe
EOF
)"
```
Paste the real grep output into the "Not done" line before submitting.

- [ ] **Step 5: Status line and memory**

Append to the top of this plan file, under the header: `**Status (2026-09-21):** executed; PR #<n> open to main, not merged.` Commit it on the branch (`git add docs/plans/… docs/brainstorms/…`, message `docs(plan): mobile eyeball plan + handoff, status`), push.

Write one memory file `project_mobile_eyeball_fixes_pr_2026_09_21.md` (type project) saying: PR #<n> open, what it changes, that Ronak merges, and the two vetoable decisions (legal-name spelling, "Book a call"). Add its line at the top of the Live section of `MEMORY.md`. Update `project_feature_pages_round_two_plan_2026_09_20_002.md` with one line pointing at it.

---

## Self-review

**Spec coverage.** Ask 1 → Task 2. Ask 2 → Task 3. Ask 3 → Task 1. Ask 4 → Task 4. Audit a/b/c → Task 5. "Fixing these things" on the live site → Task 6 (PR; merge is Ronak's, as with #120). The two open questions in the spec are carried into Task 4 and Task 5's Interfaces.

**Placeholders.** Task 2 step 6 and Task 3 step 7 name a manual Chrome capture because `shoot.mjs` has no offset set; the paths and what to check are written out. Task 6 step 4 has one `<paste>` that step 4's own text tells the executor to fill from a named grep. `<n>` in step 5 is the PR number the previous step prints.

**Type consistency.** `HERO_HOME.tap` / `.body` (Task 1) match the test. `STORY.label/title/lead` (Task 3) match the component and all three test edits. `.hv3-hero-tap`, `.hv3-hero-tap-dot`, `.foi-lead`, `.foi-stop-index` are spelled the same in JSX, CSS and tests. `contactInfo.company` is the name used in `Layout.jsx:386` today and in Task 5's tests. Menu variants `['secondary', 'primary', 'outline']` match the JSX in Task 4 step 3 and `WhatsAppCTA`'s default `primary`.

## Open for Ronak

1. **Legal entity spelling.** The plan aligns everything on **"Pay Saathi Innovation LLP"** (CLAUDE.md §13, `public/llms.txt`, the Play/App Store card). The footer, © line and four legal pages currently say "Innovations". If the registered name is the plural, say so before Task 5 runs and it is one constant plus one CLAUDE.md line.
2. **"Book a call"** as the name of the phone-capture-then-calendar path. Any other wording is one constant in Task 4.
