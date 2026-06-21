import { describe, expect, it } from 'vitest';
import { checkLead, extractLead, countWords } from './checkLeadAnswer.mjs';

const FRONTMATTER = '---\ntitle: "T"\nslug: "t"\n---\n\n';

// Build a markdown doc whose lead paragraph is exactly `n` words.
function postWithLeadWords(n) {
  const words = Array.from({ length: n }, (_, i) => `word${i}`).join(' ');
  return `${FRONTMATTER}${words}\n\n## Next Section\n\nbody\n`;
}

describe('countWords', () => {
  it('counts visible words and ignores link/emphasis/code markup', () => {
    expect(countWords('a normal three words')).toBe(4);
    expect(countWords('see the [pricing guide](/blog/pricing/) now')).toBe(5);
    expect(countWords('**bold** and *italic* and `code`')).toBe(5);
    expect(countWords('![an alt label](/x.png) trailing')).toBe(4);
  });

  it('returns 0 for empty or non-string input', () => {
    expect(countWords('')).toBe(0);
    expect(countWords('   ')).toBe(0);
    expect(countWords(null)).toBe(0);
  });
});

describe('extractLead', () => {
  it('returns the first prose paragraph as the lead', () => {
    const lead = extractLead(`${FRONTMATTER}First answer paragraph here.\n\n## Heading\n`);
    expect(lead.kind).toBe('paragraph');
    expect(lead.text).toBe('First answer paragraph here.');
  });

  it('flags a list-first opening', () => {
    expect(extractLead(`${FRONTMATTER}- bullet one\n- bullet two\n`).kind).toBe('list');
  });

  it('flags a heading-first opening (the "## Key Highlights" shape)', () => {
    expect(extractLead(`${FRONTMATTER}## Key Highlights\n\n- x\n`).kind).toBe('heading');
  });

  it('flags an empty body', () => {
    expect(extractLead(`${FRONTMATTER}`).kind).toBe('empty');
  });
});

describe('checkLead', () => {
  it('passes a 150-word lead paragraph before the first subheading (happy path)', () => {
    expect(checkLead(postWithLeadWords(150)).status).toBe('pass');
  });

  it('fails a post that opens with a "## Key Highlights" heading (error path)', () => {
    const result = checkLead(`${FRONTMATTER}## Key Highlights\n\n- a\n- b\n`);
    expect(result.status).toBe('fail');
    expect(result.message).toMatch(/heading/i);
  });

  it('fails a post that opens with a bullet list', () => {
    const result = checkLead(`${FRONTMATTER}- a\n- b\n`);
    expect(result.status).toBe('fail');
    expect(result.message).toMatch(/list/i);
  });

  it('fails a post with no body before the first subheading', () => {
    expect(checkLead(`${FRONTMATTER}## Only A Heading\n`).status).toBe('fail');
  });

  it('warns on a 90-word lead (below the band)', () => {
    expect(checkLead(postWithLeadWords(90)).status).toBe('warn');
  });

  it('warns on a 220-word lead (above the band)', () => {
    expect(checkLead(postWithLeadWords(220)).status).toBe('warn');
  });

  it('counts words not markup when judging the band', () => {
    // 150 plain words plus a markdown link should still land inside the band.
    const md = `${FRONTMATTER}${Array.from({ length: 150 }, (_, i) => `w${i}`).join(' ')} and a [link](/x/).\n\n## Next\n`;
    expect(checkLead(md).status).toBe('pass');
  });
});
