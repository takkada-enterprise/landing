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
  ].join('|'),
  'i',
);

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
      .map(([f, s]) => [f, s.match(ADDON_PRICE)?.[0]])
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
    ]) {
      expect(s).toMatch(ADDON_PRICE);
    }
    expect('View-only apps usually charge per additional user (₹2,000 to ₹4,000 each).').not.toMatch(ADDON_PRICE);
  });
});
