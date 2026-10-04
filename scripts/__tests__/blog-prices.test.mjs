// Blog posts are hand-typed copy, so they drift from the rate card in
// src/data/siteContent.js. Two rules from plan 2026-10-04-002:
//   1. Clarity (₹2,900) is retired from sale, so no post may name or price it.
//      "Microsoft Clarity" (the analytics tool) is a different thing and allowed.
//   2. Add-ons never show a price: partners quote them. A rupee figure within a
//      clause of an add-on name, or a rupee figure next to the word "add-on",
//      is a typed add-on price. Competitor per-user prices ("₹2,000 to ₹4,000
//      per additional user" for view-only apps) are left alone, which is why the
//      user pattern is "additional user beyond" (Takkada's phrasing) and not
//      "additional user".
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, it, expect } from 'vitest';

const dir = resolve(dirname(fileURLToPath(import.meta.url)), '../../content/blog');
const RETIRED_PLAN = /2,900|(?<!Microsoft )\bClarity\b/;
const ADDON_PRICE = new RegExp(
  [
    '(Payment Collection|extra user|additional user beyond|(extra|additional) business|own (WhatsApp )?(Business )?number|message pack|Order Link)[^.\\n]{0,60}₹\\s?\\d',
    '\\badd-on\\b[^.\\n]{0,30}₹\\s?\\d',
    '₹\\s?[\\d,]+[^.\\n₹]{0,30}\\badd-on',
    // A price that bundles an add-on in, however far along the sentence:
    // "₹10,000 + GST subscription (Copilot with the Payment Collection add-on)".
    // "₹9,000 ..., plus the add-on priced by your partner" stays legal.
    '₹\\s?[\\d,]+[^.\\n₹]{0,80}\\b(with|including|incl)\\b[^.\\n₹]{0,40}\\badd-on',
  ].join('|'),
  'i',
);
// The add-on modules sold since plan 2026-10-04-002. Case-sensitive on
// purpose: lowercase "schemes" or "AI calling" also describe competitor
// products and trade schemes with real rupee figures, while the module names
// are capitalised the way the rate card prints them. A name followed by
// software/app/tool is a product category ("FMCG billing software costs
// ₹3,600"), never our module. (A scoped `(?-i:...)` inside ADDON_PRICE would
// do this in one regex, but Node 22, the CI runtime, does not support regexp
// modifiers.)
const MODULE_PRICE =
  /\b(Schemes|FMCG billing|Ladder discount|Recovery dashboard|AI calling|Personal party links|Auto ?[Pp]arts billing)\b(?! (?:software|apps?|tools?)\b)[^.\n]{0,60}₹\s?\d/;
const addonPrice = (s) => s.match(ADDON_PRICE)?.[0] ?? s.match(MODULE_PRICE)?.[0];

const posts = readdirSync(dir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => [f, readFileSync(resolve(dir, f), 'utf8')]);

describe('blog prices', () => {
  it('no blog post names Clarity or its ₹2,900 price', () => {
    const hits = posts.filter(([, s]) => RETIRED_PLAN.test(s)).map(([f]) => f);
    expect(hits).toEqual([]);
  });

  it('no blog post quotes an add-on price', () => {
    const hits = posts
      .map(([f, s]) => [f, addonPrice(s)])
      .filter(([, m]) => m)
      .map(([f, m]) => `${f}: ${m}`);
    expect(hits).toEqual([]);
  });

  it('the guards still catch the phrasings they were written for', () => {
    expect('Clarity is ₹2,900').toMatch(RETIRED_PLAN);
    expect('set up Microsoft Clarity on the site').not.toMatch(RETIRED_PLAN);
    for (const s of [
      'Payment Collection is a ₹1,500 a year add-on',
      'UPI collection is a ₹1,500 a year add-on',
      'each additional user beyond the included one is ₹3,000 per year',
      'own WhatsApp Business number is an early access add-on at ₹2,000',
      'Additional businesses are ₹1,000 per business per year',
      'a flat ₹10,000 + GST subscription (Takkada Copilot with the Payment Collection add-on)',
      'Schemes costs ₹3,000 a year',
      'FMCG billing is ₹4,000 per year',
      'Ladder discount comes in at ₹2,500',
      'the Recovery dashboard is ₹3,000 a year on top',
      'AI calling is ₹6 per connected minute',
      'Personal party links run ₹1,500 a year',
      'Auto parts billing is priced at ₹5,000',
      'AutoParts billing is priced at ₹5,000',
    ]) {
      expect(addonPrice(s), s).toBeTruthy();
    }
    for (const s of [
      'View-only apps usually charge per additional user (₹2,000 to ₹4,000 each).',
      'a flat ₹9,000 + GST Copilot subscription, plus the Payment Collection add-on priced by your partner',
      // Competitor and trade-scheme figures in lowercase prose stay legal.
      'The company runs trade schemes worth ₹2 lakh a quarter across the beat.',
      'Generic AI calling tools charge ₹4 to ₹8 a minute.',
      'Their FMCG billing app costs ₹3,600 per user per year.',
      'FMCG billing software usually costs ₹3,000 to ₹6,000 a year.',
      'a ladder discount of ₹5 a case above 50 cases',
    ]) {
      expect(addonPrice(s), s).toBeUndefined();
    }
  });
});
