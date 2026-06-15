/**
 * parseFaqs — turn a blog article's raw markdown into structured FAQ pairs.
 *
 * The corpus FAQ format is uniform: a `## Frequently Asked Questions` section
 * whose questions are `**Q: …**` lines, each followed by an `A: …` paragraph
 * (occasionally spanning multiple paragraphs). This pure function extracts that
 * structure so the build can emit FAQPage JSON-LD without any per-article edits.
 *
 * Fails safe: returns [] for missing sections, empty sections, or bad input.
 * Never throws.
 *
 * @param {string} markdown - raw markdown body (post-frontmatter `content`)
 * @returns {{question: string, answer: string}[]}
 */
export function parseFaqs(markdown) {
  if (typeof markdown !== 'string') return [];

  const lines = markdown.split('\n');

  // Find the FAQ section heading (## ...Frequently Asked Questions... or ## FAQ).
  const headingIndex = lines.findIndex((line) => isFaqHeading(line));
  if (headingIndex === -1) return [];

  // Section runs from just after the heading to the next `## ` heading or EOF.
  let endIndex = lines.length;
  for (let i = headingIndex + 1; i < lines.length; i += 1) {
    if (/^##\s/.test(lines[i])) {
      endIndex = i;
      break;
    }
  }

  const sectionLines = lines.slice(headingIndex + 1, endIndex);

  const faqs = [];
  let current = null;

  const flush = () => {
    if (current) {
      const answer = stripInlineMarkdown(current.answerParts.join(' ')).replace(/\s+/g, ' ').trim();
      faqs.push({ question: current.question, answer });
      current = null;
    }
  };

  for (const rawLine of sectionLines) {
    const line = rawLine.trim();
    const questionMatch = line.match(/^\*\*\s*Q:\s*(.*?)\s*\*\*$/i);
    if (questionMatch) {
      flush();
      current = { question: stripInlineMarkdown(questionMatch[1]).trim(), answerParts: [] };
      continue;
    }
    if (!current) continue; // text before the first question (none expected)
    if (line === '') continue; // paragraph breaks
    // Strip a leading `A:` prefix from the first answer line of each answer.
    const answerText = line.replace(/^A:\s*/i, '').trim();
    if (answerText) current.answerParts.push(answerText);
  }
  flush();

  // Drop any malformed pairs that produced an empty answer.
  return faqs.filter((faq) => faq.question && faq.answer);
}

// Schema `text` must be plain. Reduce the inline markdown the corpus actually
// uses — links `[text](url)` → `text`, and emphasis/code markers — so raw
// syntax never leaks into the FAQPage JSON-LD.
function stripInlineMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [label](url) -> label
    .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** -> bold
    .replace(/(^|[^*])\*([^*]+)\*/g, '$1$2') // *italic* -> italic
    .replace(/`([^`]+)`/g, '$1'); // `code` -> code
}

function isFaqHeading(line) {
  const match = line.match(/^##\s+(.*)$/);
  if (!match) return false;
  const text = match[1].trim().toLowerCase();
  return text.includes('frequently asked questions') || text === 'faq' || text === 'faqs';
}
