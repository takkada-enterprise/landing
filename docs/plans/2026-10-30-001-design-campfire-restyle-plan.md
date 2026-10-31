# Campfire Restyle: One Button, One-Colour Heads, One Axis, Real Surfaces — Implementation Plan

**Status (2026-10-30):** planned, not started. Branch `design/campfire-restyle` (cut from `design/campfire-rebuild`), worktree `/Users/ronak/Desktop/PaySaathi/takkada website/landing-wt-restyle`.

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Pass `model: "opus"` on every subagent dispatch (PaySaathi CLAUDE.md). Nothing is built ahead of its task.

**Goal:** Settle the audit's restyle tier and its cheap polish items on the Campfire rebuild: the layout stays, the system (buttons, heading colour, alignment axis, surfaces, grid counts, type tuning, a few placements) changes.

**Architecture:** Every change lands in the shared primitives (`src/ui/*.jsx`), their stylesheets (`src/ui/*.css`, `src/styles.css`) and the six routes' own JSX. No new component, no new file except one CSS-rules test file (`src/ui/__tests__/restyle.test.js`). CSS rules are pinned the way this repo already pins them (`src/__tests__/nav-breakpoints.test.js`, `src/data/__tests__/display-heading-weights.test.js`): read the stylesheet as text, strip comments, assert on the rule body. Behaviour of components is pinned with Testing Library in the existing test files.

**Tech Stack:** React 19, Vite 7, vite-react-ssg, plain CSS with `:root` tokens in `src/ui/ui.css`, Vitest 3 + jsdom + Testing Library, lucide-react (icons only, being removed from links), Hallmark `capture.mjs` / `sloplint.mjs` on Puppeteer for evidence.

**Spec:** `/private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/takkada-campfire-design-audit.md` (items cited as "audit N"), section "Lightest depth that settles each tier", restyle + polish rows only. Depth definition: `/Users/ronak/.claude/skills/hallmark/references/redesign.md` "Depth" and "Build". Repo rules: `CLAUDE.md` §6, §7, §11 (this plan changes what §6/§7 describe; Task 10 re-syncs them).

## Global Constraints

Copied verbatim from the brief:

1. Every word, claim, price, link href and route stays exactly as is. No copy edits at all, including arrows typed inside link text. Icons (SVG, lucide) are not words and may be removed or changed.
2. Every image referenced by the site must already resolve in `content/image-provenance.json` (`images` or `unprovenAllowlist`, keyed by content hash). No new screenshots, no crops, no re-encodes. "Distinct screens in place of repeated screens" means picking a DIFFERENT already-manifested image for the duplicate slots; if none fits, drop the duplicate image slot rather than adding a new file. Read `scripts/checkScreenshotProvenance.mjs` header and the manifest to learn which images are allowed and where (guide pages need full evidence; feature pages must not use known-sensitive captures).
3. Keep the brand: navy + marigold palette tokens, Plus Jakarta Sans (already loaded in `src/fonts.css`; IBM Plex Mono is also loaded). No new font files, no new dependencies.
4. Tests: `npx vitest run` must stay green; every visual rule that lives in a shared component gets a test that fails on the old behaviour (jsdom tests exist under `src/**/__tests__`; see `src/ui/__tests__` and `src/components/__tests__` for the pattern). Each task ends with a commit on this branch. Commit messages describe the diff. End every commit message with:
   Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
   Claude-Session: https://claude.ai/code/session_01QpqMDg68gBcEsEdTEUPCs2
5. No pushing. No `npm run build` (it pings IndexNow); `INDEXNOW_DRY_RUN=true npm run build` is allowed once in the final task to prove the build gates (provenance, image budgets, prerender checks) still pass.
6. Verification is by real screenshots. Puppeteer is available: `HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/capture.mjs http://localhost:5185 --out <dir> --name <prefix> --routes "/,/features,/schemes-tally,/partners,/demo,/blog" --sizes laptop,phone --full --wait 1500` captures 1280 and 390 full pages. Also `HALLMARK_PUPPETEER=... node /Users/ronak/.claude/skills/hallmark/scripts/sloplint.mjs src --genre modern-minimal --render --url http://localhost:5185/ ...` runs the linter (run it from a scratch cwd so `.hallmark/` does not land in the project). Scratch dir for all captures: `/private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/`.

Plan-level rules on top:

- **Depth is restyle.** Do not build any full-redesign item: no new per-page compositions, no sticky phones, no new display face, no horizontal snap rows, no new photographs, no new sections, no moved sections.
- **Worktree only.** Work in `/Users/ronak/Desktop/PaySaathi/takkada website/landing-wt-restyle`. Never touch `landing-wt-campfire`. The dev server on `http://localhost:5185` already serves this worktree (checked: its cwd is this worktree); do not restart it. Vite hot-reloads every edit.
- **Test runs.** Per task, run only the test files the task touches: `npx vitest run <file> [<file>...]`. The full suite runs in Task 10, with `TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__doc-date-main` set (without it `guide-pages.test.js` fails 49 cases that are not regressions).
- **Known baseline failure.** On the untouched branch the full suite is 3004/3005 with the env var set: `src/data/__tests__/screens.test.js > backs every exported file with a provenance record quoting its manifest row` fails on `public/assets/screens/hero-card-outstanding-720.webp` (no provenance record). It pre-dates this plan; fixing it means writing a provenance record, which this plan may not do. "Green" for this plan = no failure other than that one.
- **Stage by path.** `git add <paths>`; never `git add -A` (`node_modules` is untracked here).
- **Looking at captures.** A full page PNG is too tall to read whole. Cut it into 1600px tiles and Read each tile:
  `python3 -c "import sys;from PIL import Image;p=sys.argv[1];i=Image.open(p);[i.crop((0,y,i.width,min(y+1600,i.height))).save(p[:-4]+f'-t{y//1600:02d}.png') for y in range(0,i.height,1600)]" <file.png>`
- **CSS test helpers.** `src/ui/__tests__/restyle.test.js` (created in Task 1, extended by later tasks) opens with these helpers; every later CSS assertion uses them:

  ```js
  import { describe, expect, it } from 'vitest';
  import { readFileSync, readdirSync, statSync } from 'node:fs';
  import { dirname, join, resolve } from 'node:path';
  import { fileURLToPath } from 'node:url';

  const SRC = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
  const read = (f) => readFileSync(resolve(SRC, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  // Innermost rules, @media bodies included: [{ sel, body }].
  const rules = (css) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, sel, body]) => ({ sel: sel.trim(), body }));
  // Every body whose selector list contains `selector` exactly, joined.
  const body = (css, selector) =>
    rules(css).filter((r) => r.sel.split(',').map((s) => s.trim()).includes(selector)).map((r) => r.body).join('\n');
  const walk = (dir, re, out = []) => {
    for (const n of readdirSync(dir)) {
      const p = join(dir, n);
      if (statSync(p).isDirectory()) { if (n !== '__tests__') walk(p, re, out); } else if (re.test(n) && !/\.test\./.test(n)) out.push(p);
    }
    return out;
  };
  const ui = read('ui/ui.css');
  ```

## Review Focus

The five conditions no task's main assertions cover that are most likely to bite a visitor, each pinned in its owning task:

1. **Keyboard focus on the new buttons over navy.** A Tally-blue ring on a `#0F1F3D` band is invisible; a keyboard user tabbing the hero or close band must see where they are. Pinned in Task 1 (`.ui-band--band .ui-pill:focus-visible` uses `--accent`).
2. **Reduced motion on the modal's submit button.** Its hover lift is new on the recipe; under `prefers-reduced-motion` it must not move. Pinned in Task 1.
3. **A feature group where every screen of a page is already taken.** The distinct-screen pick must fall back to the page's own hero screen, never to `undefined` (which makes `Shot` throw and blanks the hub). Pinned in Task 6.
4. **Grids of 1 item and of hundreds.** A one-card grid must be one column with no lead span; the 336-post blog grid must stay 3-up and gain a lead span only if the count stops dividing by 3. Pinned in Task 5.
5. **Long button labels at 390.** "Download on the App Store", "Chat on WhatsApp to know more" and the sticky WhatsApp bar must wrap centred inside the button, never overflow. Pinned in Task 1 (`.ui-pill` centres its text and never sets `white-space: nowrap` outside `.ui-nav--minimal`), and checked on the 390 captures in Tasks 1 and 10.

---

### Task 1: One button recipe (audit 8) and named transitions

The Pill loses the arrow-in-a-coin, the navy `dark` tone goes, every button is either the filled marigold primary or the 1px outline secondary at a 12px radius, the modal's blue submit joins the primary, and text links lose their glued lucide arrows. The typed `→` inside `CalendarCTA` (`src/components/CalendarCTA.jsx:14`) and `BlogCtaBand` (`src/components/BlogCtaBand.jsx:31`) is link text and STAYS (Global Constraint 1). The Pill's own disc (`src/ui/Pill.jsx:11`) is component chrome rendered next to every label, `aria-hidden`, typed in no copy source: it is an icon and goes.

**Files:**
- Modify: `src/ui/Pill.jsx:6-13` (drop the `arrow` prop and the `.ui-pill-arrow` span)
- Modify: `src/ui/ui.css:12-26` (add `--radius-control: 12px`), `:117-162` (the recipe), `:249`, `:295-302`, `:317` (delete `.ui-textlink svg`)
- Modify: `src/ui/QuoteBand.jsx:11` (`tone="dark"` → `tone="ghost"`)
- Modify: `src/components/WhatsAppCTA.jsx:34` (default `tone = 'ghost'`)
- Modify: `src/Layout.jsx:4,189` (drop `ArrowRight`), `:280` (`tone="ghost"`), `:420` (`tone="accent"` on the sticky bar)
- Modify: `src/ui/nav.css:36-40,68-70,218-219,242`
- Modify: `src/ui/modal.css:45-65,192-214`
- Modify: `src/components/PhoneModal.jsx:2,261` (drop `ArrowRight` from the submit label)
- Modify: `src/components/FeaturePage.jsx:3,31`, `src/components/ICPTemplate.jsx:3,119`, `src/routes/AutoReconciliation.jsx:3,273`, `src/routes/Home.jsx:3,158,168,301,315` (drop `ArrowRight`/`ArrowUpRight` icons and their now-unused imports; keep `Check` in Home)
- Create: `src/ui/__tests__/restyle.test.js`
- Test: `src/ui/__tests__/primitives.test.jsx:13-31,103`, `src/components/__tests__/whatsapp-cta.test.jsx:28-34`, `src/Layout.test.jsx:208-215`, `src/routes/__tests__/home.test.jsx:238`

**Interfaces:**
- Produces: `Pill({ to, href, onClick, tone = 'accent', children, ...rest })`, tones `accent` | `ghost` only. CSS token `--radius-control: 12px`. `src/ui/__tests__/restyle.test.js` with the helpers in Global Constraints.

- [ ] **Step 0: Record the baseline before any edit**

```bash
mkdir -p /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/before
HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/capture.mjs http://localhost:5185 --out /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/before --name before --routes "/,/features,/schemes-tally,/partners,/demo,/blog" --sizes laptop,phone --full --wait 1500
HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/capture.mjs http://localhost:5185 --out /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/before --name fold --routes "/,/schemes-tally" --sizes laptop --wait 1500
```
Expected: 12 full-page PNGs plus 2 fold PNGs (1280x800 viewport) in `restyle/before/`. Task 10 compares against these.

- [ ] **Step 1: Write the failing tests**

In `primitives.test.jsx` replace the two Pill tests (lines 13-31) with:

```js
it('Pill renders its label alone, no arrow disc, with the tone class', () => {
  const a = mount(<Pill to="/demo">Try the demo</Pill>).querySelector('a.ui-pill.ui-pill--accent[href="/demo"]');
  expect(a.textContent).toBe('Try the demo');
  expect(a.querySelector('.ui-pill-arrow')).toBeNull();
});

it('Pill renders an <a> for href and a button for onClick alone', () => {
  const c = mount(<><Pill href="https://wa.me/1" tone="ghost">Chat</Pill><Pill onClick={vi.fn()}>Open</Pill></>);
  expect(c.querySelector('a.ui-pill.ui-pill--ghost[href="https://wa.me/1"]')).toBeTruthy();
  expect(c.querySelector('button.ui-pill.ui-pill--accent[type="button"]').textContent).toBe('Open');
});
```
and at line 103 assert `a.ui-pill.ui-pill--ghost` for the QuoteBand.

`whatsapp-cta.test.jsx`: rename the test to `'renders a ghost Pill by default and takes the caller tone'`; default asserts `ui-pill--ghost`, caller passes `tone="accent"` and asserts `ui-pill--accent`.

`Layout.test.jsx:208-215`: title `'carries exactly two pills, both the outline recipe'`; both `pills[i].classList.contains('ui-pill--ghost')`. Add one test: the sticky bar (`.ui-nav-sticky a.ui-pill`) carries `ui-pill--accent`.

`home.test.jsx:238`: drop `'.ui-pill--dark'` from `allowed`.

New `src/ui/__tests__/restyle.test.js`, `describe('button recipe (audit 8)')`:

```js
const allCss = walk(SRC, /\.css$/).map((p) => [p, readFileSync(p, 'utf8')]);
const allJs = walk(SRC, /\.jsx?$/).map((p) => [p, readFileSync(p, 'utf8')]);

it('defines the 12px control radius and puts every Pill on it', () => {
  expect(body(ui, ':root')).toMatch(/--radius-control:\s*12px;/);
  expect(body(ui, '.ui-pill')).toMatch(/border-radius:\s*var\(--radius-control\)/);
});
it('fills the accent Pill marigold with ink text and outlines the ghost', () => {
  expect(body(ui, '.ui-pill--accent')).toMatch(/background:\s*var\(--accent\)/);
  expect(body(ui, '.ui-pill--accent')).toMatch(/color:\s*var\(--ink\)/);
  expect(body(ui, '.ui-pill--ghost')).toMatch(/background:\s*transparent/);
  expect(body(ui, '.ui-pill--ghost')).toMatch(/currentColor/);
});
it('centres a wrapped label and leaves nowrap to the minimal nav only', () => {
  expect(body(ui, '.ui-pill')).toMatch(/justify-content:\s*center/);
  expect(body(ui, '.ui-pill')).toMatch(/text-align:\s*center/);
  expect(body(ui, '.ui-pill')).not.toMatch(/white-space:\s*nowrap/);
});
it('shows a focus ring, marigold on the navy band', () => {
  expect(body(ui, '.ui-pill:focus-visible')).toMatch(/outline:\s*2px solid/);
  expect(body(ui, '.ui-band--band .ui-pill:focus-visible')).toMatch(/outline-color:\s*var\(--accent\)/);
});
it('leaves no arrow disc and no dark tone in any stylesheet or component', () => {
  for (const [p, t] of allCss) expect(t, p).not.toMatch(/ui-pill-arrow|ui-pill--dark/);
  for (const [p, t] of allJs) expect(t, p).not.toMatch(/tone="dark"|ui-pill-arrow/);
});
it('glues no lucide arrow to any link or button', () => {
  for (const [p, t] of allJs) expect(t, p).not.toMatch(/import\s*\{[^}]*\bArrow(Right|UpRight)\b[^}]*\}\s*from\s*'lucide-react'/);
});
it('puts the modal submit on the primary recipe, motion named and reduced', () => {
  const modal = read('ui/modal.css');
  const submit = body(modal, '.phone-btn-submit');
  expect(submit).toMatch(/background:\s*var\(--accent\)/);
  expect(submit).toMatch(/color:\s*var\(--ink\)/);
  expect(submit).toMatch(/border-radius:\s*var\(--radius-control\)/);
  const reduced = modal.split(/@media\s*\(prefers-reduced-motion:\s*reduce\)/).slice(1).join('');
  expect(reduced).toMatch(/\.phone-btn-submit[^{]*\{[^}]*transform:\s*none/);
});
it('names every transitioned property (no transition: all anywhere)', () => {
  for (const [p, t] of allCss) expect(t, p).not.toMatch(/transition:\s*all\b/);
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/ui/__tests__/primitives.test.jsx src/ui/__tests__/restyle.test.js src/components/__tests__/whatsapp-cta.test.jsx src/Layout.test.jsx src/routes/__tests__/home.test.jsx`
Expected: FAIL on the disc text `'Try the demo→'`, the `--dark` defaults, the missing `--radius-control`, the lucide imports and `modal.css` `transition: all`.

- [ ] **Step 3: Implement**

`src/ui/ui.css` recipe, replacing 117-162 (values pinned; write the rest in the file's style):
- `.ui-pill`: `inline-flex`, `align-items: center`, `justify-content: center`, `gap: 10px`, `min-height: 48px`, `padding: 12px 24px`, `border: 1px solid transparent`, `border-radius: var(--radius-control)`, `font: inherit; font-size: 16px; font-weight: 600; line-height: 1.25`, `text-align: center`, `text-decoration: none`, `cursor: pointer`, the existing `transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1)`.
- `.ui-pill--accent`: `background: var(--accent); border-color: var(--accent); color: var(--ink)`.
- `.ui-pill--ghost`: `background: transparent; border-color: currentColor; color: inherit`.
- `.ui-pill:focus-visible { outline: 2px solid var(--arrow); outline-offset: 3px; }` and `.ui-band--band .ui-pill:focus-visible { outline-color: var(--accent); }`.
- Delete `.ui-pill-arrow`, `.ui-pill--dark*`, `.ui-pill--ghost .ui-pill-arrow`, `.ui-textlink svg`. Keep `--arrow` (focus rings, ticks, links still use it).

`src/ui/nav.css`: line 38 becomes `.ui-nav--minimal .ui-pill { padding: 0 16px; gap: 10px; }` (keep 39); line 68 `.ui-nav .ui-pill { height: 44px; padding: 0 20px; font-size: 15px; }`; delete 69-70 and 219; lines 218 and 242 `justify-content: center`.

`src/ui/modal.css`: `.phone-modal-close` `transition: background-color 200ms cubic-bezier(0.23, 1, 0.32, 1), color 200ms cubic-bezier(0.23, 1, 0.32, 1)`. `.phone-btn-submit`: `color: var(--ink)`, `background: var(--accent)`, `border-radius: var(--radius-control)`, `transition: transform 180ms cubic-bezier(0.23, 1, 0.32, 1)`. Its hover keeps only `transform: translateY(-1px)` (no colour or shadow change) inside `@media (hover: hover) and (pointer: fine)`; add `@media (prefers-reduced-motion: reduce) { .phone-btn-submit, .phone-btn-submit:hover:not(:disabled) { transition: none; transform: none; } }`.

`src/ui/ui.css:249` `.ui-quote .ui-pill { margin-top: 32px; }` stays (class unchanged).

- [ ] **Step 4: Run the tests to verify they pass**

Same command as Step 2. Expected: PASS. Then `npx vitest run src/components src/routes/__tests__/feature-page.test.jsx src/routes/__tests__/icp-refresh.test.jsx src/routes/__tests__/pricing-table.test.jsx src/components/PhoneModal.test.jsx` — Expected: PASS (they render the edited links; a failure here means a test pinned an icon and needs the same "behaviour changed" update, not a revert).

- [ ] **Step 5: Look at it**

Capture `/,/demo,/partners` at `laptop` (viewport, no `--full`) and at `phone --full` into `restyle/t1/`, tile, Read. Check: the hero shows one marigold filled button and the nav two outline buttons; no coin anywhere; the 390 sticky bar label is centred; ghost buttons on navy read white. The modal's submit button is checked in Task 10 Step 2 (it needs a click to open).

- [ ] **Step 6: Commit**

```bash
git add src/ui/Pill.jsx src/ui/ui.css src/ui/QuoteBand.jsx src/ui/nav.css src/ui/modal.css src/components/WhatsAppCTA.jsx src/components/PhoneModal.jsx src/components/FeaturePage.jsx src/components/ICPTemplate.jsx src/routes/AutoReconciliation.jsx src/routes/Home.jsx src/Layout.jsx src/ui/__tests__/restyle.test.js src/ui/__tests__/primitives.test.jsx src/components/__tests__/whatsapp-cta.test.jsx src/Layout.test.jsx src/routes/__tests__/home.test.jsx
git commit -m "ui: one button recipe (marigold fill or 1px outline, 12px radius, no arrow disc), modal submit on it, lucide arrows off text links, named transitions in modal.css

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01QpqMDg68gBcEsEdTEUPCs2"
```

---

### Task 2: One-colour headings (audit 9)

The words stay; the `<em className="ui-accent">` wrapper and its marigold go from the home hero and every CloseBand. The `accent` prop and data keys go with them, since nothing reads them any more.

**Files:**
- Modify: `src/ui/CloseBand.jsx:4-19` (render `{title}` as plain text; signature `CloseBand({ id, title, cta, children })`)
- Modify: `src/routes/Home.jsx:46-57` (delete `withAccent`), `:84` (`{HOME_HERO.headline}`), `:389`
- Modify: `src/data/home.js:8,91` (delete both `accent` keys)
- Modify: `src/ui/ui.css:99-102` (delete `.ui-accent`)
- Modify (drop the `accent=` prop only): `src/routes/Features.jsx:123`, `src/routes/Partners.jsx:108`, `src/routes/TryDemo.jsx:135`, `src/components/FeaturePage.jsx:200`, `src/components/ICPTemplate.jsx:126`, `src/routes/AutoReconciliation.jsx:279`, `src/routes/TallyMobileComparison.jsx:155`, `src/routes/GuidePost.jsx:173`
- Test: `src/ui/__tests__/primitives.test.jsx:105-109`, `src/routes/__tests__/home.test.jsx:46-51`, `src/data/__tests__/home.test.js:50-51`, `src/ui/__tests__/restyle.test.js`

**Interfaces:**
- Consumes: nothing from Task 1.
- Produces: `CloseBand({ id, title, cta, children })`. `HOME_HERO` and `HOME_CLOSE` without `accent`.

- [ ] **Step 1: Write the failing tests**

- `primitives.test.jsx`: the CloseBand half asserts `band.querySelector('h2.ui-close-title').textContent === 'See your Tally on your phone.'` and `band.querySelector('h2 em')` is `null` (render it without `accent`).
- `home.test.jsx:46-51`: title `'sets the headline in one colour'`; `h1.textContent === HOME_HERO.headline` and `h1.querySelector('em')` is `null`.
- `data/__tests__/home.test.js:50-51`: replace with `expect(HOME_HERO).not.toHaveProperty('accent'); expect(HOME_CLOSE).not.toHaveProperty('accent');`.
- `restyle.test.js`, `describe('one-colour headings (audit 9)')`: no file under `src/` (css, js, jsx; tests excluded by `walk`) matches `/ui-accent|\baccent=\{|\baccent="/` (`tone="accent"` does not match: the word before `=` is `tone`).

- [ ] **Step 2: Run to verify they fail**

Run: `npx vitest run src/ui/__tests__ src/routes/__tests__/home.test.jsx src/data/__tests__/home.test.js`
Expected: FAIL on the `em.ui-accent` still rendering and the `accent` keys.

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass**

Same command, then `npx vitest run src/routes/__tests__ src/components/__tests__` (CloseBand renders on every route). Expected: PASS.

- [ ] **Step 5: Look at it** — capture `/,/partners` laptop (viewport) and the close band at phone `--full`; hero and close headlines are all white, wording unchanged.

- [ ] **Step 6: Commit** (stage the files above) with message `ui: headlines in one colour; drop the marigold accent phrase, the accent prop and its data keys` plus the two trailer lines.

---

### Task 3: Section heads and measures on one left axis (audit 10)

Every section head sits on the `.ui-max` left edge, and the centred measures under them (answer paragraph, FAQ list, related list, footnote, "more" link, home label, home CTA row, trust article link) start on that edge too. The CloseBand stays centred: the audit cleared it as a deliberate closing statement ("Navy close band and stock nav: a conventional closing and nav pattern, not a tell"). Images centred inside their own card stay centred.

**Files:**
- Modify: `src/ui/SectionHead.jsx:1-3` (signature `SectionHead({ title, lead, as: Tag = 'h2' })`, class `ui-section-head` only)
- Modify: `src/ui/ui.css:104-115` (delete `--center`/`--left`; `.ui-section-head` keeps `max-width: 760px; margin-bottom: 48px`)
- Modify: `src/ui/feature.css:55-58` (`.ui-answer` `margin: 0`), `:73-79` (`.ui-footnote` `margin: 48px 0 0`, no `text-align`), `:99-102` (`.ui-detail-more` no `text-align`), `:251-254` (`.faq-list` `margin: 0`), `:273-280` (`.ui-related` `margin: 0`)
- Modify: `src/ui/home.css:56-66` (`.ui-label` no `text-align`; rename `.ui-center` → `.ui-after-grid`, no `text-align`), `:86-94` (`.trust-article-link` no `text-align`; its `a` gets `text-decoration: underline; text-underline-offset: 4px`), `:247-250` (`.faq-list` `margin: 0`)
- Modify: `src/routes/Home.jsx:111` (`className="ui-after-grid"`)
- Test: `src/ui/__tests__/primitives.test.jsx:41-49`, `src/ui/__tests__/restyle.test.js`

**Interfaces:**
- Produces: `SectionHead({ title, lead, as })`; no `align` prop. Class `.ui-after-grid` (home.css) replaces `.ui-center`.

- [ ] **Step 1: Write the failing tests**

- `primitives.test.jsx:41-49`: `'SectionHead renders title and lead on the left axis'`: `header.ui-section-head` exists, `header.className === 'ui-section-head'`, title and lead text as before, no lead → no `p`.
- `restyle.test.js`, `describe('one left axis (audit 10)')`:

```js
const home = read('ui/home.css');
it('has no centred section-head variant', () => {
  expect(ui).not.toMatch(/\.ui-section-head--center/);
});
it.each([
  ['ui/feature.css', '.ui-feature .ui-answer'], ['ui/feature.css', '.ui-feature .ui-footnote'], ['ui/feature.css', '.ui-feature .ui-detail-more'],
  ['ui/feature.css', '.ui-feature .faq-list'], ['ui/feature.css', '.ui-feature .ui-related'],
  ['ui/home.css', '.ui-home .ui-label'], ['ui/home.css', '.ui-home .ui-after-grid'], ['ui/home.css', '.ui-home .trust-article-link'], ['ui/home.css', '.ui-home .faq-list'],
])('%s %s starts on the container edge', (file, sel) => {
  const b = body(read(file), sel);
  expect(b, sel).not.toBe('');
  expect(b, sel).not.toMatch(/margin[^;]*\bauto\b/);
  expect(b, sel).not.toMatch(/text-align:\s*center/);
});
it('underlines the trust article link', () => {
  expect(body(home, '.ui-home .trust-article-link a')).toMatch(/text-decoration:\s*underline/);
});
```

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/ui/__tests__`. Expected: FAIL on `--center`, `margin: 0 auto` and `text-align: center`.

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — `npx vitest run src/ui/__tests__ src/routes/__tests__`. Expected: PASS.

- [ ] **Step 5: Look at it** — capture `/,/schemes-tally,/partners` laptop `--full` into `restyle/t3/`. On `/schemes-tally` every section head, the answer paragraph and the FAQ start at the same x as the hero copy (x≈74 at 1280).

- [ ] **Step 6: Commit** — `ui: section heads and their measures start on the container's left edge; centred variants removed; trust link underlined` plus trailers.

---

### Task 4: A visible surface step and no stacked same-tone bands (audit 11, 14)

Ground becomes a warm paper far enough from white to read at a seam; a card always takes the opposite surface of the band it sits on (white on ground, paper on white) by re-scoping `--card`; two adjacent bands of the same tone read as one section by dropping the second one's top padding.

**Files:**
- Modify: `src/ui/ui.css:13-14` (`--ground: #F3F1EC; --card: #FFFFFF;`), `:64-65` (`.ui-band--white { background: #fff; --card: var(--ground); }`), and after `:70` add `.ui-band--ground + .ui-band--ground, .ui-band--white + .ui-band--white { padding-top: 0; }`
- Test: `src/ui/__tests__/restyle.test.js`

**Interfaces:**
- Produces: tokens `--ground: #F3F1EC`, `--card: #FFFFFF` (root), `--card` = `var(--ground)` inside `.ui-band--white`. Every existing `var(--card)` user (`.ui-card`, `.ui-altrow-media`, `home.css` `.rate-term`, `.rate-table`, `.rate-plan`) inherits the step with no edit.

- [ ] **Step 1: Write the failing tests** — `describe('surface step (audit 11, 14)')`:

```js
const lum = (hex) => {
  const [r, g, b] = hex.replace('#', '').match(/\w\w/g).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const token = (name) => body(ui, ':root').match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
it('steps ground and white far enough apart to read at a seam', () => {
  expect(lum('#FFFFFF') / lum(token('ground'))).toBeGreaterThanOrEqual(1.12);
});
it('gives a card the opposite surface of its band', () => {
  expect(token('card').toUpperCase()).toBe('#FFFFFF');
  expect(body(ui, '.ui-band--white')).toMatch(/--card:\s*var\(--ground\)/);
});
it('never stacks two same-tone bands at full padding', () => {
  for (const sel of ['.ui-band--ground + .ui-band--ground', '.ui-band--white + .ui-band--white'])
    expect(body(ui, sel), sel).toMatch(/padding-top:\s*0/);
});
```
Old values: `#F8F8F6` gives a ratio of 1.066, so the first test fails on the old token.

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/ui/__tests__/restyle.test.js`. Expected: FAIL on all three.

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — `npx vitest run src/ui/__tests__ src/__tests__ src/routes/__tests__/home.test.jsx src/routes/__tests__/pricing-table.test.jsx`. Expected: PASS (`brand-guard.test.js` pins legacy tokens in `styles.css` only, not these).

- [ ] **Step 5: Look at it** — capture all six routes laptop `--full` into `restyle/t4/`. Check: on `/` the quote panel sits one band-padding (not two) under the used-for button; cards read as cards on `/features`, `/schemes-tally`, `/blog` against both band tones; the pricing table reads against its white band.

- [ ] **Step 6: Commit** — `ui: warm paper ground (#F3F1EC), cards take the opposite surface of their band, same-tone bands share one top padding` plus trailers.

---

### Task 5: Column counts from item counts (audit 3)

`CardGrid` derives its column count from how many children it holds, so no grid ends on a single orphan. Rule (decided here):

| items `n` | columns | lead |
|---|---|---|
| 1 | 1 | no |
| 2 | 2 | no |
| `n % 3 === 0` | 3 | no |
| other even | 2 | no |
| other odd (5, 7, 11, 13…) | 3 | yes |

"Lead" = the first card spans two columns at the 3-column breakpoint, so 5 lays out 2+3 and 7 lays out 2+3+2. The lead also applies when a caller forces `cols={3}` on a count that does not divide by 3. `ui-grid--3` is one column under 900px and `ui-grid--2` one column under 900px, so every derived count is orphan-free at every width. Home keeps its explicit `cols={4}` on its two 4-item rows (`src/routes/Home.jsx:104,151`: 4 items in a 2-then-4 grid, no orphan, layout unchanged) and FeaturePage keeps `cols={4}` on the gallery (`src/components/FeaturePage.jsx:123`: its only gallery has 12 items). Routes outside the six (`AiAssistant`, `TallyMobileComparison`, `AutoReconciliation`, `GuidePost`, `GuideIndex`, `BlogPost`, `VideoTestimonials`) keep their explicit `cols` and still get the lead fix on 3-column grids.

**Files:**
- Modify: `src/ui/CardGrid.jsx` (export `gridCols(n: number): number`; `CardGrid({ cols, children })` uses `Children.toArray(children).length`, class `ui-grid ui-grid--${c}` plus ` ui-grid--lead` when `c === 3 && n % 3 !== 0`)
- Modify: `src/ui/ui.css:189-192` (inside the `min-width: 900px` block add `.ui-grid--lead > :first-child { grid-column: span 2; }`)
- Modify (drop `cols`): `src/routes/Features.jsx:107`, `src/routes/Partners.jsx:78,85`, `src/routes/TryDemo.jsx:115,122`, `src/routes/BlogIndex.jsx:53`, `src/components/FeaturePage.jsx:101,144`, `src/components/ICPTemplate.jsx:84`
- Test: `src/ui/__tests__/primitives.test.jsx:70-72`, `src/ui/__tests__/restyle.test.js`, `src/routes/__tests__/features-hub.test.jsx`, `src/routes/__tests__/partners.test.jsx`, `src/routes/__tests__/try-demo.test.jsx`

**Interfaces:**
- Produces: `export function gridCols(n)` from `src/ui/CardGrid.jsx` (also re-exported nowhere else; tests import it from `'../CardGrid'` / `'../../ui/CardGrid'`). `CardGrid({ cols?, children })`.

- [ ] **Step 1: Write the failing tests**

`primitives.test.jsx` replaces line 70-72:

```js
it.each([[1, 1], [2, 2], [3, 3], [4, 2], [5, 3], [6, 3], [7, 3], [8, 2], [10, 2], [12, 3], [336, 3]])(
  'gridCols(%i) is %i', (n, c) => expect(gridCols(n)).toBe(c)
);
it('CardGrid derives its columns and leads an odd count', () => {
  const kids = (n) => Array.from({ length: n }, (_, i) => <div key={i} />);
  expect(mount(<CardGrid>{kids(4)}</CardGrid>).querySelector('.ui-grid').className).toBe('ui-grid ui-grid--2');
  expect(mount(<CardGrid>{kids(5)}</CardGrid>).querySelector('.ui-grid').className).toBe('ui-grid ui-grid--3 ui-grid--lead');
  expect(mount(<CardGrid>{kids(1)}</CardGrid>).querySelector('.ui-grid').className).toBe('ui-grid ui-grid--1');
  expect(mount(<CardGrid cols={4}>{kids(4)}</CardGrid>).querySelector('.ui-grid').className).toBe('ui-grid ui-grid--4');
  expect(mount(<CardGrid cols={3}>{kids(4)}</CardGrid>).querySelector('.ui-grid').className).toBe('ui-grid ui-grid--3 ui-grid--lead');
});
```
`restyle.test.js`, `describe('grid counts (audit 3)')`: the text after `@media (min-width: 900px)` contains a `.ui-grid--lead > :first-child` rule with `grid-column: span 2`.
`features-hub.test.jsx`: for each `FEATURE_GROUPS` band, `band.querySelector('.ui-grid')` has class `ui-grid--${gridCols(group.slugs.filter(getFeaturePage).length)}`.
`partners.test.jsx`: `#how-you-earn .ui-grid--3`, `#why-partner .ui-grid--2`. `try-demo.test.jsx`: `#what-you-will-see .ui-grid--2`, `#how-it-works .ui-grid--3`.

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/ui/__tests__ src/routes/__tests__/features-hub.test.jsx src/routes/__tests__/partners.test.jsx src/routes/__tests__/try-demo.test.jsx`. Expected: FAIL (`gridCols` is not exported; groups render `ui-grid--3`).

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — same command, then `npx vitest run src/routes/__tests__ src/components/__tests__`. Expected: PASS.

- [ ] **Step 5: Look at it** — capture `/features,/partners,/demo,/blog` laptop `--full` into `restyle/t5/`. No group on `/features` ends on a lone card; the 5-page "tally" group shows a wide first card then three; `/demo` hero buttons may still wrap 2+1 (copy-width issue, not a grid; out of this tier, note it in Task 10).

- [ ] **Step 6: Commit** — `ui: CardGrid derives its column count from its children and widens the first card of an odd 3-up grid; hub, partners, demo, blog, feature detail and ICP grids derive` plus trailers.

---

### Task 6: Distinct screens where one repeated (audit 4)

On `/features` a card shows the first screen of its own page (hero, then its walkthrough or tour steps in order) that no earlier card in the same group, and no reserved screen, already shows; it falls back to the page's hero only when all of its screens are taken. With `home` reserved for the `/features` hero (Task 7) this resolves every current duplicate using screens each page already shows (computed against today's data):

- bill: `document-import`, `import-picker`, `bank-statement-review` (was `document-import` ×3)
- tally: `party-detail`, `party-list`, `total-fy`, `sales-analytics`, `ai-chat-owes` (was `home` ×3)

All picks already have byte budgets in `scripts/checkImageBudgets.mjs` and records in the manifest.

On `/schemes-tally` the hero moves from `scheme-free-noodles` (an Invoice Summary) to `scheme-buy-x-get-y` ("Scheme editor for buy X get Y free: 5 biscuit cartons earn 1 noodles case", manifest record `deecc1a307…`, demo company 143), which matches the headline's "written once". The two walkthrough Invoice Summaries (`scheme-free-rice`, `scheme-slab-applied`) are different captures showing different lines (a free line, a 1% slab line) and stay: no manifested capture of the Scheme cost report exists, and `src/data/__tests__/feature-pages.test.js:138` requires every step to carry a screen. See the open decision in the report.

**Files:**
- Modify: `src/data/featurePages.js` (add `export function distinctCardScreens(pages, reserved = [])` next to `heroShot`/`stepShot`)
- Modify: `src/routes/Features.jsx:99-121` (compute `const screens = distinctCardScreens(group.pages, HUB_RESERVED)` per group; `<Shot screen={screens[j]} …/>`; `const HUB_RESERVED = ['home']` beside `CARD_SIZES`)
- Modify: `src/data/featurePagesSchemesDiscount.js:52` (`hero: { screen: 'scheme-buy-x-get-y' }`)
- Modify: `scripts/checkImageBudgets.mjs:134-135` (add rows for `public/assets/screens/scheme-buy-x-get-y-360.webp` 32_000 and `-720.webp` 60_000, reason `'feature-page hero (schemes-tally)'`; files are 22,964 B and 55,664 B today; leave the noodles rows in place)
- Test: `src/data/__tests__/feature-pages.test.js`, `src/routes/__tests__/features-hub.test.jsx:231-244`

**Interfaces:**
- Produces: `distinctCardScreens(pages: Page[], reserved: string[] = []): string[]` — same length and order as `pages`; candidate list per page is `[page.hero.screen, ...(page.walkthrough ?? page.tour?.stations ?? []).map((s) => s.screen)].filter(Boolean)`; the taken set starts as `reserved` and grows with each pick; fallback `page.hero.screen`.
- Consumes (Task 7): `HUB_RESERVED = ['home']` matches the `/features` hero screen added there.

- [ ] **Step 1: Write the failing tests**

`feature-pages.test.js`, new `describe('distinct card screens')`:

```js
const pg = (hero, ...steps) => ({ hero: { screen: hero }, walkthrough: steps.map((screen) => ({ screen })) });
it('picks each page its first screen not already taken', () => {
  expect(distinctCardScreens([pg('a', 'a', 'b'), pg('a', 'a', 'c'), pg('d')])).toEqual(['a', 'c', 'd']);
});
it('skips reserved screens', () => {
  expect(distinctCardScreens([pg('a', 'a', 'b')], ['a'])).toEqual(['b']);
});
it('reads tour stations when a page has no walkthrough', () => {
  expect(distinctCardScreens([pg('a'), { hero: { screen: 'a' }, tour: { stations: [{ screen: 'c' }] } }])).toEqual(['a', 'c']);
});
it('falls back to the hero when every screen is taken, never undefined', () => {
  expect(distinctCardScreens([pg('a'), pg('a')])).toEqual(['a', 'a']);
});
it('gives /schemes-tally a hero no walkthrough step repeats', () => {
  const page = getFeaturePage('schemes-tally');
  expect(page.hero.screen).toBe('scheme-buy-x-get-y');
  expect(page.walkthrough.map((s) => s.screen)).not.toContain(page.hero.screen);
});
```
`features-hub.test.jsx:231-244`: rename to `"gives every card the page's title, its directory line and a screen of its own page, distinct within its group"`; keep the title/line/`loading` checks; replace the `heroShot` src/alt check with: per group, the `data-screen` list equals `distinctCardScreens(pages, ['home'])`, has no duplicate, contains no `'home'`, and each `img.alt === SCREENS[slug].alt`. The existing budget test (`'puts every hub image under the byte budget guard'`) stays and must pass unchanged.

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/data/__tests__/feature-pages.test.js src/routes/__tests__/features-hub.test.jsx`. Expected: FAIL (`distinctCardScreens` not exported; duplicates in bill and tally; schemes hero is noodles).

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — same command plus `npx vitest run src/routes/__tests__/feature-page.test.jsx src/data/__tests__/screens.test.js` and `node scripts/checkScreenshotProvenance.mjs`. Expected: tests PASS (screens.test keeps only its one baseline failure); provenance prints `checkScreenshotProvenance: OK`.

- [ ] **Step 5: Look at it** — capture `/features,/schemes-tally` at `laptop,phone --full` into `restyle/t6/`. No two identical phones sit in one group; the schemes hero is the scheme editor.

- [ ] **Step 6: Commit** — `features: hub cards show a screen of their own page distinct within the group; schemes-tally hero is the buy-X-get-Y editor (budgeted)` plus trailers.

---

### Task 7: Pictures in the empty interior hero halves (audit 2, 6)

`/features`, `/partners` and `/demo` put one already-manifested phone screen in the existing hero grid slot (`.ui-feature .ui-hero-stage`, `src/ui/feature.css:37-45`, the same slot FeaturePage fills). `/blog` needs no code: its hero is already a single column with an 880px copy measure (`src/ui/icp.css:15-16`, BlogIndex renders under `.ui-icp`), which is the "collapse" outcome; the audit also cleared it ("Text-only navy hero on /blog: a defensible editorial header").

| route | screen | why |
|---|---|---|
| `/features` | `home` | "Everything Tally does, on your phone." — the app's home screen; reserved from hub cards by Task 6 |
| `/partners` | `reminders` | what the partner's client gets: WhatsApp reminders per party |
| `/demo` | `party-list` | "Open a real distributor's books" — a full book of parties, due and overdue |

All three are budgeted LCP-sized files (`home-360` 22,468 B, `reminders-360` 23,348 B, `party-list-360` 24,786 B) with manifest records.

**Files:**
- Modify: `src/routes/Features.jsx:80-97`, `src/routes/Partners.jsx:63-74`, `src/routes/TryDemo.jsx:88-111` — after `.ui-hero-copy`, add `<div className="ui-hero-stage"><Shot screen="<slug>" eager fetchPriority="high" sizes="(max-width: 767px) 70vw, 300px" /></div>`; import `Shot` from `'../ui'` where missing (Partners, TryDemo)
- Test: `src/routes/__tests__/features-hub.test.jsx`, `src/routes/__tests__/partners.test.jsx`, `src/routes/__tests__/try-demo.test.jsx`

**Interfaces:**
- Consumes: Task 6's `HUB_RESERVED = ['home']`.

- [ ] **Step 1: Write the failing tests** — in each route test, one `it('puts <slug> in the hero picture slot, eager and high priority')`:

```js
const img = container.querySelector('#hero .ui-hero-stage img.ui-shot[data-screen="<slug>"]');
expect(img).not.toBeNull();
expect(img.getAttribute('loading')).toBe('eager');
expect(img.getAttribute('fetchpriority')).toBe('high');
expect(BUDGETS.some(([p]) => p === `public${img.getAttribute('src')}`)).toBe(true);
```
(`BUDGETS` from `'../../../scripts/checkImageBudgets.mjs'`, as features-hub.test already imports.)

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/routes/__tests__/features-hub.test.jsx src/routes/__tests__/partners.test.jsx src/routes/__tests__/try-demo.test.jsx`. Expected: FAIL (no `.ui-hero-stage`).

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — same command plus `node scripts/checkScreenshotProvenance.mjs`. Expected: PASS and `OK`.

- [ ] **Step 5: Look at it** — capture `/features,/partners,/demo,/blog` at `laptop` (viewport) and `phone --full` into `restyle/t7/`. At 1280 the right half of each of the three heroes holds the phone; at 390 the phone sits under the buttons; `/blog` is a single left column.

- [ ] **Step 6: Commit** — `pages: features, partners and demo heroes show a registry screen in the picture slot (home, reminders, party-list)` plus trailers.

---

### Task 8: Type tuning (audit 12, 13 first half)

Hero display size goes fluid so long heads land in four or five lines with the buttons above the fold at 1280x800; every display head and card title balances its lines; body text loses its negative tracking and every figure sets tabular.

**Files:**
- Modify: `src/ui/ui.css:73-78` (`.ui-hero-title { font-size: clamp(40px, 3.75vw, 64px); … text-wrap: balance; }`), `:86-90` (`.ui-card-title` add `text-wrap: balance`), `:253-259` (`.ui-close-title` add `text-wrap: balance`), `:286` (delete the phone `.ui-hero-title { font-size: 40px; }` line; the clamp's floor covers it)
- Modify: `src/styles.css:83-89` (`body`: delete `letter-spacing: -0.01em;`, add `font-variant-numeric: tabular-nums lining-nums;`)
- Test: `src/ui/__tests__/restyle.test.js`

**Interfaces:** none new. Weights stay (pinned by `display-heading-weights.test.js`).

- [ ] **Step 1: Write the failing tests** — `describe('type (audit 12, 13)')`:

```js
it('sets the hero head fluid: 48px or less at 1280, 40px at 390, never past 64px', () => {
  const m = body(ui, '.ui-hero-title').match(/font-size:\s*clamp\((\d+)px,\s*([\d.]+)vw,\s*(\d+)px\)/);
  expect(m).not.toBeNull();
  const at = (vw) => Math.min(Number(m[3]), Math.max(Number(m[1]), (Number(m[2]) * vw) / 100));
  expect(at(1280)).toBeLessThanOrEqual(48);
  expect(at(390)).toBe(40);
  expect(Number(m[3])).toBeLessThanOrEqual(64);
  const phone = ui.split(/@media\s*\(max-width:\s*767px\)/).slice(1).join('');
  expect(phone).not.toMatch(/\.ui-hero-title\s*\{/);
});
it.each(['.ui-hero-title', '.ui-section-title', '.ui-close-title', '.ui-card-title'])('%s balances its lines', (sel) => {
  expect(body(ui, sel)).toMatch(/text-wrap:\s*balance/);
});
it('tracks body text at zero and sets figures tabular', () => {
  const b = body(read('styles.css'), 'body');
  expect(b).not.toMatch(/letter-spacing:\s*-/);
  expect(b).toMatch(/font-variant-numeric:\s*tabular-nums/);
});
```

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/ui/__tests__/restyle.test.js src/data/__tests__/display-heading-weights.test.js`. Expected: restyle FAILs (64px fixed, no balance on three heads, `-0.01em`); weights PASS.

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — same command plus `npx vitest run src/__tests__`. Expected: PASS.

- [ ] **Step 5: Look at it** — capture `/,/schemes-tally` at `laptop` WITHOUT `--full` (1280x800 viewport) into `restyle/t8/`, and all six at `phone --full`. On `/schemes-tally` at 1280x800 both hero buttons are fully visible above the bottom edge; compare with `restyle/before/fold-*schemes-tally*`. If the buttons still fall below 800px, lower the clamp's middle term to `3.5vw` (and its test bound stays `≤ 48`), re-capture, and record the value used.

- [ ] **Step 6: Commit** — `type: fluid hero size (clamp 40-64px, 48px at 1280), balanced display and card heads, body tracking at zero with tabular figures` plus trailers.

---

### Task 9: Placement polish (audit 5, 13 second half, 15)

Zig-zag copy top-aligns with its picture; the home hero chips stay inside the grid and carry a lighter shadow; the footer grid has exactly as many tracks as filled groups.

Float arithmetic (pinned below): the stage sits at the start of its 6fr column; the right chip's right edge is `stage − 40 + chip`, and the column is `(min(vw, 1180) − 48 − 48) / 2`. Old `min(260px, 20vw)` puts the chip 34px past the grid edge at 1280 and 8px past it at 900. `min(220px, 17vw)` keeps it inside from 900 to 1600 and up. The 40px overlap rule (`home.test.jsx:67-86`) is unchanged.

**Files:**
- Modify: `src/ui/ui.css:209` (`.ui-altrow { align-items: start; }`)
- Modify: `src/ui/home.css:45-53` (`.ui-home .ui-hero-float { width: min(220px, 17vw); box-shadow: 0 8px 24px rgba(10, 23, 48, 0.16); … }`)
- Modify: `src/Layout.jsx:341` (`<div className="ui-footer-top" style={{ '--footer-groups': footerGroups }}>` with `const footerGroups = footerColumns.reduce((n, c) => n + (c.links.length > 10 ? 2 : 1), 0);` at module scope beside the `footerColumns` import use)
- Modify: `src/ui/footer.css:25` (`grid-template-columns: 1.4fr repeat(var(--footer-groups, 4), minmax(0, 1fr));`)
- Test: `src/ui/__tests__/restyle.test.js`, `src/Layout.test.jsx`

**Interfaces:** CSS custom property `--footer-groups` set inline on `.ui-footer-top`.

- [ ] **Step 1: Write the failing tests**

`restyle.test.js`, `describe('placement polish (audit 5, 13, 15)')`:

```js
it('top-aligns zig-zag copy with its picture', () => {
  expect(body(ui, '.ui-altrow')).toMatch(/align-items:\s*start/);
});
it('keeps the right hero chip inside the grid from 900px up', () => {
  const home = read('ui/home.css');
  const px = (sel) => body(home, sel).match(/width:\s*min\((\d+)px,\s*(\d+)vw\)/).slice(1).map(Number);
  const [sMax, sVw] = px('.ui-home .ui-hero-stage');
  const [fMax, fVw] = px('.ui-home .ui-hero-float');
  for (let vw = 900; vw <= 1600; vw += 10) {
    const stage = Math.min(sMax, (sVw * vw) / 100);
    const chip = Math.min(fMax, (fVw * vw) / 100);
    const column = (Math.min(vw, 1180) - 48 - 48) / 2;
    expect(stage - 40 + chip, `${vw}px`).toBeLessThanOrEqual(column);
  }
});
it('gives the footer one track per filled group', () => {
  expect(body(read('ui/footer.css'), '.ui-footer-top')).toMatch(/repeat\(var\(--footer-groups/);
});
```
`Layout.test.jsx`: `it('sizes the footer grid to its groups')` — render the full footer; `.ui-footer-top` `getAttribute('style')` matches `/--footer-groups:\s*4\b/` (Product 7, Features 10, Company 8, Connect 3 links: four groups, none over ten).

- [ ] **Step 2: Run to verify they fail** — `npx vitest run src/ui/__tests__/restyle.test.js src/Layout.test.jsx src/routes/__tests__/home.test.jsx`. Expected: FAIL on `align-items: center`, the chip at 900px and 1280px, `repeat(5,` and the missing style.

- [ ] **Step 3: Implement** as listed under Files.

- [ ] **Step 4: Run to verify they pass** — same command. Expected: PASS (home.test's 40px overlap test included).

- [ ] **Step 5: Look at it** — capture `/,/partners` at `laptop --full` into `restyle/t9/`. Home hero: neither chip crosses the right edge of the content; the "distributor's day" rows start their title at the top of the slab; the footer has no empty fifth column and Product/Features links do not wrap.

- [ ] **Step 6: Commit** — `ui: zig-zag copy top-aligned, home hero chips sized to stay inside the grid with a lighter shadow, footer tracks = filled groups` plus trailers.

---

### Task 10: Docs re-sync, full evidence and the before/after note

**Files:**
- Modify: `CLAUDE.md` §6 (lines 81-107), §7 (line 115), §11 point 5 (line 190) and point 10 (line 205) — the doc mirrors `:root` and the components; re-sync to what Tasks 1-9 shipped:
  - §6 tokens: Ground `#F3F1EC`; Card `#FFFFFF` on ground bands and `var(--ground)` on white bands; Accent = the filled primary Pill only (delete "The one accent phrase … `em.ui-accent`"); Arrow = focus rings, ticks, links (no disc); add `--radius-control` 12px.
  - §6 Marigold rule: "marigold fills the primary Pill. It is never a card fill, a band, a text background or a headline colour."
  - §6 Hero: drop "carrying one phrase in marigold"; "a product picture … sits on the right" now also names `/features`, `/partners` and `/demo`.
  - §6 Pills: "48px min height, 12px radius, weight 600, no disc. Accent (marigold fill, ink text) and ghost (transparent, 1px `currentColor` border). Text links are underlined and carry no icon."
  - §6 Bands: add "two adjacent bands of the same tone share one top padding". Cards: "the opposite surface of their band, flat, no shadow".
  - §7: hero title `clamp(40px, 3.75vw, 64px)` (or the Task 8 value), balanced; body tracking 0 with tabular figures by default.
  - §11.5: the `transition: all` debt sentence goes (paid in Task 1).
  - §11.10: `Pill` (accent, ghost).
- Modify: `src/ui/ui.css` line 1 — prepend the Hallmark check stamp:
  ```css
  /* Hallmark · checked: 2026-10-30 · genre: modern-minimal (inferred)
   * floor: <n> FAIL · fixed: restyle tier (audit 3, 4, 8, 9, 10, 11) + polish · structural: printed in the note
   * built: the project · redesign: restyle · v2.0.0 */
  ```
  (`<n>` from Step 3; the `redesign: restyle` field makes sloplint report the layout gates as notes.)
- Create (scratch, not in the repo): `/private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/before-after.md`

- [ ] **Step 1: Docs and stamp** as listed. Run `npx vitest run src/__tests__ src/data/__tests__/display-heading-weights.test.js` — Expected: PASS (`brand-guard` walks src only; CLAUDE.md is not under it).

- [ ] **Step 2: Full captures**

```bash
HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/capture.mjs http://localhost:5185 --out /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/after --name after --routes "/,/features,/schemes-tally,/partners,/demo,/blog" --sizes laptop,phone --full --wait 1500
HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/capture.mjs http://localhost:5185 --out /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle/after --name fold --routes "/,/schemes-tally" --sizes laptop --wait 1500
```
Tile and Read every PNG. Also open the demo modal once by hand-free means: `capture.mjs … --routes "/demo" --sizes laptop,phone --selector ".phone-modal"` only works if the modal is open on load, which it is not; instead drive it with Puppeteer in a scratch script (click the first `button.ui-pill`, wait for `.phone-modal`, screenshot) into `restyle/after/modal-{1280,390}.png`, and check the submit button is marigold with ink text and no arrow.

Expected, page by page: one filled marigold button per first screen; no coin anywhere; all headings one colour; section heads on the left edge; cards visible against both band tones; no orphan card in any grid; no repeated phone inside a `/features` group; `/features`, `/partners`, `/demo` heroes hold a phone at 1280; `/schemes-tally` buttons above the fold at 1280x800; home chips inside the grid; footer with no empty column.

- [ ] **Step 3: Linter**

```bash
cd /private/tmp/claude-501/-Users-ronak-Desktop-PaySaathi/9e9f8dac-9020-4793-b3d8-9089489f12db/scratchpad/restyle && HALLMARK_PUPPETEER="/Applications/antigravity website/node_modules/puppeteer-core" node /Users/ronak/.claude/skills/hallmark/scripts/sloplint.mjs "/Users/ronak/Desktop/PaySaathi/takkada website/landing-wt-restyle/src" --genre modern-minimal --render --url http://localhost:5185/ --url http://localhost:5185/features --url http://localhost:5185/schemes-tally --url http://localhost:5185/partners --url http://localhost:5185/demo --url http://localhost:5185/blog
```
Expected: `.hallmark/` lands in `restyle/`, not the worktree (`git status --short` in the worktree shows no `.hallmark`). Record FAIL / REFLEX / WARN counts against the audit's 80 / 92 / 28 (copy gates set aside, as the audit did). Every remaining FAIL is either fixed here if it is a plain defect inside this tier, or listed in the note with the depth that would settle it (layout gates are notes at restyle). Put the FAIL count into the stamp.

- [ ] **Step 4: Suite and build gates**

```bash
cd "/Users/ronak/Desktop/PaySaathi/takkada website/landing-wt-restyle"
TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__doc-date-main npx vitest run
INDEXNOW_DRY_RUN=true npm run build
```
Expected: vitest all green except the one baseline failure in `screens.test.js` (hero-card-outstanding-720 provenance). Build exits 0, with `checkScreenshotProvenance: OK` (both runs), `checkImageBudgets`, `checkImagePreloads`, `checkRoutePrerender`, `checkFeaturesHub` passing, and IndexNow reporting a dry run. Then `git status --short` shows only `dist/` (if untracked, leave it; never commit it) and your tracked edits.

- [ ] **Step 5: Before/after note** — write `restyle/before-after.md`: per route and width, one line each on what changed, with the before tile and the after tile paths; linter counts before and after; what stayed out of this tier and the depth that settles it (audit 1 card recipe loop, 5 zig-zag slabs, 7 blog wall, 14's /demo nested video card, the /demo hero buttons wrapping 2+1, footer at 390, video poster); the skips with their reason: video poster (no manifested poster image), `nav.css:10` `overflow-x` item (no-op: `nav.css:10` is the deliberate `body.lock-scroll { overflow: hidden }` pinned by `nav-breakpoints.test.js`, and the only `overflow-x` on the site, `styles.css:120`, is already `clip`).

- [ ] **Step 6: Commit** — stage `CLAUDE.md src/ui/ui.css` only: `docs: CLAUDE.md §6, §7, §11 re-synced to the restyled tokens and controls; Hallmark check stamp on ui.css` plus trailers. Do not push.

---

## Self-review notes (done at planning time)

- Coverage: audit 8 → T1; 9 → T2; 10 → T3; 11, 14 → T4; 3 → T5; 4 → T6; 2, 6 → T7; 12, 13 → T8/T9; 5 (top-align), 15 → T9; polish list: balance, tracking, tabular → T8; footer tracks, chips, zig-zag → T9; `transition: all` → T1; `overflow-x` → no-op (T10 note); video poster → skipped (T10 note); hero clamp → T8. Final evidence → T10.
- Names used across tasks: `--radius-control`, `gridCols`, `ui-grid--lead`, `distinctCardScreens`, `HUB_RESERVED`, `--footer-groups`, `.ui-after-grid` — each defined once in the task that produces it.
- Every changed shared rule has a test that fails on the old value (pill disc text, `--dark`, `em.ui-accent`, `--center`, ground ratio 1.066, `ui-grid--3` on 4 items, duplicate screens, no hero stage, 64px fixed, `-0.01em`, `align-items: center`, chip at 1280, `repeat(5,`).
