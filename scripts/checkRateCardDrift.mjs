// checkRateCardDrift — fail the build when the site and the partner rate card
// stop agreeing on a price.
//
// The two surfaces have drifted twice (June + August 2026), both times through
// a change that touched only one of them. The checked-in snapshot
// (src/data/rateCardSnapshot.json) is the agreed truth; this guard enforces it
// in the ONE gate that actually runs on every deploy — `npm run build` — since
// the vitest suite does not.
//
// Two layers, because the June failure mode was a hand-typed rupee string in a
// component that no data-level check could see:
//   1. Data: pricing.plans / pricing.addons must equal the snapshot, BOTH
//      directions — a price changed on one side, a pill added without a
//      snapshot entry, or a snapshot entry the site dropped all fail.
//   2. Rendered HTML: every ₹-figure on the prerendered homepage and refund
//      policy must be derivable from the snapshot (annual, the 3-year per-year
//      and billed-once amounts, addon prices, the biggerSetups exemption).
//      Blog HTML is deliberately out of scope — 170 posts legitimately quote
//      prices in prose that goes stale by design.
//
// A page with ZERO rupee figures also fails: a guard that can pass by failing
// to see anything reads as coverage without being any (checkFeaturesHub lesson).

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import snapshot from '../src/data/rateCardSnapshot.json' with { type: 'json' };
import { pricing, formatInr } from '../src/data/siteContent.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Every rupee integer the snapshot can justify on a rendered page. */
export function allowedFigures(snap) {
  const allowed = new Set();
  for (const { annualInr } of Object.values(snap.plans)) {
    const perYear = annualInr * (1 - snap.termDiscount);
    allowed.add(annualInr); // 1-year price
    allowed.add(perYear); // 3-year per-year headline (== the "you keep" saving)
    allowed.add(perYear * snap.termYears); // billed-once total
    allowed.add(annualInr * snap.termYears); // struck-through list total
  }
  for (const { priceInr } of Object.values(snap.addons)) {
    allowed.add(priceInr);
  }
  for (const figures of Object.values(snap.exemptions)) {
    for (const figure of figures) allowed.add(figure);
  }
  return allowed;
}

/** All ₹-figures in a page, as integers. "₹8,500" → 8500. Bare "₹" is ignored. */
export function extractFigures(html) {
  return [...html.matchAll(/₹([\d,]*\d)/g)].map(([, digits]) =>
    Number(digits.replaceAll(',', '')),
  );
}

/** Layer 2: scan one rendered page. */
export function inspectPage(html, allowed) {
  const figures = extractFigures(html);
  return {
    total: figures.length,
    unknown: [...new Set(figures.filter((figure) => !allowed.has(figure)))],
  };
}

/** Layer 1: the site's data must equal the snapshot, both directions. */
export function inspectData(sitePricing, snap) {
  const problems = [];

  const snapPlans = Object.values(snap.plans);
  for (const { publicName, annualInr } of snapPlans) {
    const sitePlan = sitePricing.plans.find((p) => p.plan === publicName);
    if (!sitePlan) {
      problems.push(`plan "${publicName}" is in the snapshot but not on the site`);
    } else if (sitePlan.annualPrice !== annualInr) {
      problems.push(
        `plan "${publicName}": site sells ₹${sitePlan.annualPrice}, snapshot says ₹${annualInr}`,
      );
    }
  }
  for (const sitePlan of sitePricing.plans) {
    if (!snapPlans.some((p) => p.publicName === sitePlan.plan)) {
      problems.push(`plan "${sitePlan.plan}" is on the site but absent from the snapshot`);
    }
  }

  const snapAddons = Object.values(snap.addons);
  for (const { publicLabel, priceInr } of snapAddons) {
    const siteAddon = sitePricing.addons.find((a) => a.label === publicLabel);
    if (!siteAddon) {
      problems.push(`add-on "${publicLabel}" is in the snapshot but not on the site`);
    } else if (!siteAddon.price.includes(formatInr(priceInr))) {
      problems.push(
        `add-on "${publicLabel}": site says "${siteAddon.price}", snapshot says ${formatInr(priceInr)}`,
      );
    }
  }
  for (const siteAddon of sitePricing.addons) {
    if (!snapAddons.some((a) => a.publicLabel === siteAddon.label)) {
      problems.push(
        `add-on "${siteAddon.label}" is on the site but absent from the snapshot — new offers get a snapshot entry AND a dashboard config key in the same change`,
      );
    }
  }

  return problems;
}

// Homepage + refund policy: the two non-blog pages that print prices.
const SCANNED_PAGES = ['dist/index.html', 'dist/refund-policy/index.html'];

function main() {
  const problems = inspectData(pricing, snapshot);

  const allowed = allowedFigures(snapshot);
  for (const page of SCANNED_PAGES) {
    const file = resolve(repoRoot, page);
    if (!existsSync(file)) {
      problems.push(`${page} not found — run after vite-react-ssg build`);
      continue;
    }
    const { total, unknown } = inspectPage(readFileSync(file, 'utf-8'), allowed);
    if (total === 0) {
      problems.push(`${page}: no rupee figures found at all — the scan has gone vacuous`);
    }
    for (const figure of unknown) {
      problems.push(
        `${page}: ₹${figure} is not derivable from rateCardSnapshot.json — either the snapshot is stale or a price was hand-typed`,
      );
    }
  }

  if (problems.length > 0) {
    process.stderr.write(
      `checkRateCardDrift: the site and the rate-card snapshot disagree:\n${problems
        .map((p) => `  - ${p}`)
        .join('\n')}\n`,
    );
    process.exit(1);
  }
  process.stdout.write(
    `checkRateCardDrift: ${SCANNED_PAGES.length} pages consistent with the snapshot.\n`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main();
}
