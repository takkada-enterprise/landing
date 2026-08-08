import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseFaqs } from './parseFaqs';

const STANDARD_BLOCK = `# Some Article

Intro paragraph that is not part of the FAQ.

## Frequently Asked Questions

**Q: Does it sync with Tally?**

A: Yes, it reads the same Tally data file through the XML API.

**Q: Will it break my data?**

A: No, Tally remains the source of truth.

**Q: Is there a mobile app?**

A: Yes, on Android and iOS.

**Q: How much does it cost?**

A: Plans start at a fixed annual MRP.

## Internal Links

- Some other article
`;

describe('parseFaqs', () => {
  it('parses a standard FAQ block into one object per Q/A pair with prefixes and ** stripped', () => {
    const faqs = parseFaqs(STANDARD_BLOCK);
    expect(faqs).toHaveLength(4);
    expect(faqs[0]).toEqual({
      question: 'Does it sync with Tally?',
      answer: 'Yes, it reads the same Tally data file through the XML API.',
    });
    // No residual markdown bold markers or Q:/A: prefixes anywhere.
    for (const { question, answer } of faqs) {
      expect(question).not.toMatch(/\*\*/);
      expect(question).not.toMatch(/^Q:/);
      expect(answer).not.toMatch(/^A:/);
    }
  });

  it('joins a multi-paragraph answer into a single space-separated string', () => {
    const md = `## Frequently Asked Questions

**Q: Can I run both at once?**

A: Technically yes, both read your Tally file independently.

A one-month parallel run before switchover is reasonable.

**Q: Next question?**

A: Next answer.
`;
    const faqs = parseFaqs(md);
    expect(faqs).toHaveLength(2);
    expect(faqs[0].answer).toBe(
      'Technically yes, both read your Tally file independently. A one-month parallel run before switchover is reasonable.'
    );
  });

  it('returns [] when there is no FAQ heading', () => {
    expect(parseFaqs('# Title\n\nJust body copy, no FAQ here.')).toEqual([]);
  });

  it('returns [] when the FAQ heading is immediately followed by another section', () => {
    const md = `## Frequently Asked Questions

## Internal Links

- a link
`;
    expect(parseFaqs(md)).toEqual([]);
  });

  // Fixture swapped 2026-08-08: biz-analyst-alternative.md was retired when the
  // alternative landing page took over its query, so this parses a different
  // real corpus entry. A synthetic string would not do, because the point of
  // this case is that the parser survives the exact markdown the corpus writes.
  it('parses the real khatabook-alternative fixture to exactly 5 pairs with the first question verbatim', () => {
    const raw = readFileSync(
      resolve(__dirname, '../../content/blog/khatabook-alternative-for-distributors-india.md'),
      'utf-8'
    );
    const faqs = parseFaqs(raw);
    expect(faqs).toHaveLength(5);
    expect(faqs[0].question).toBe('Is Khatabook bad for distributors?');
    expect(faqs[0].answer.length).toBeGreaterThan(0);
  });

  it('preserves question text containing ? and inline punctuation intact', () => {
    const md = `## Frequently Asked Questions

**Q: Is it ₹7,200/year, and does that include e-invoicing?**

A: Yes.
`;
    const faqs = parseFaqs(md);
    expect(faqs).toHaveLength(1);
    expect(faqs[0].question).toBe('Is it ₹7,200/year, and does that include e-invoicing?');
  });

  it('reduces inline markdown in answers to plain text for the schema', () => {
    const md = `## Frequently Asked Questions

**Q: Where do I learn more?**

A: See the [DSO guide](/blog/days-sales-outstanding/) and **book** a \`free\` demo.
`;
    const faqs = parseFaqs(md);
    expect(faqs[0].answer).toBe('See the DSO guide and book a free demo.');
    expect(faqs[0].answer).not.toMatch(/[[\]()*`]/);
  });

  it('reduces inline markdown in question text too', () => {
    const md = `## Frequently Asked Questions

**Q: Is the [demo](/demo) really free?**

A: Yes.
`;
    expect(parseFaqs(md)[0].question).toBe('Is the demo really free?');
  });

  it('leaves no markdown link/emphasis syntax in any real corpus answer', () => {
    const { readdirSync } = require('node:fs');
    const dir = resolve(__dirname, '../../content/blog');
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.md'))) {
      const faqs = parseFaqs(readFileSync(resolve(dir, f), 'utf-8'));
      for (const { question, answer } of faqs) {
        expect(answer).not.toMatch(/\[[^\]]+\]\([^)]*\)/);
        expect(question).not.toMatch(/\[[^\]]+\]\([^)]*\)/);
      }
    }
  });

  it('fails safe to [] for non-string / undefined input without throwing', () => {
    expect(parseFaqs(undefined)).toEqual([]);
    expect(parseFaqs(null)).toEqual([]);
    expect(parseFaqs(42)).toEqual([]);
    expect(parseFaqs({})).toEqual([]);
  });
});
