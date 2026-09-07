// guideContract — the structural, visibility and app-label rules the public
// manual has to keep satisfying after everybody has moved on to other work.
//
// A guide is a set of instructions someone follows while stuck inside the app.
// The failure this file exists to stop is not a broken page: it is a page that
// still renders perfectly and is quietly wrong. A button gets renamed in
// Flutter, a feature is pulled back behind a dark flag, a topic is deleted
// while the app still links to its slug — and the site keeps serving confident
// steps for software that no longer exists. Nothing in a normal build notices.
//
// Three rules carry most of the weight:
//
//   1. Every app label a guide puts in quotes must be declared, and must be
//      findable in the real Dart file the author says it came from.
//   2. That file may not be help copy, a test or a fixture. Those are written
//      by the same hand as the guide and would agree with it forever, which is
//      a guard that cannot fail — the worst kind, because it reads as coverage.
//   3. A topic may only be published if its feature key is customer-visible in
//      the live feature_definitions evidence. An entitlement is not visibility;
//      the demo company holds dark keys, and a public takkada.com URL for a
//      product with no purchase path is exactly what we are not allowed to ship.
//
// The label check is a presence guard, not proof of behaviour. It tells you the
// words on the page still exist in the app; a human still has to have followed
// the procedure, which is what `checkedAgainstAppOn` records. That date is
// editorial evidence supplied by the author and is never generated from build
// time — a build that stamps today's date turns the freshness claim into a lie
// that renews itself nightly.
//
// This module is pure and dependency-light on purpose: `validateGuideContract`
// takes plain data and returns every error it found, so the mutation tests can
// damage a fixture without a repository, a checkout or a network. The real
// paired-repo wiring lives in ../checkGuideContract.mjs.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import matter from 'gray-matter';
import { marked } from 'marked';

/** A slug is a public URL segment; keep it boring. */
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** A short git sha or a full one. Anything else is not a revision. */
const REVISION_RE = /^[0-9a-f]{7,40}$/;

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// KD-7 permits an in-app explanation of "Entries waiting for approval" and
// nothing more. It has no public slug, so it must never reach topics.json, the
// hub, the manifest or an app slug reference.
export const INTERNAL_TOPIC_IDS = new Set(['entries-waiting-approval']);

// Help copy cannot vouch for itself. Neither can a test or a fixture: they are
// written to agree with the implementation under test, so a label lifted from
// one proves only that two files the same author wrote say the same thing.
const SELF_VALIDATING_PREFIXES = ['lib/help/', 'lib/widgets/help/'];
const SELF_VALIDATING_SEGMENTS = new Set([
  'test',
  'tests',
  'testing',
  'fixture',
  'fixtures',
  'mocks',
  'golden',
  'goldens',
]);
const SELF_VALIDATING_FILE_RE = /(?:^|[._])(?:test|fixture|mock|golden)s?\.dart$/;

// ── path safety ────────────────────────────────────────────────────────────

/**
 * A repository-relative POSIX path that cannot escape the app checkout.
 * Absolute paths, Windows separators, `.`/`..` segments and doubled slashes are
 * all refused here rather than left to a `resolve()` somewhere downstream.
 */
export function isAppRelativePath(path) {
  if (typeof path !== 'string' || path.trim() === '') return false;
  if (path.includes('\\')) return false;
  if (path.startsWith('/') || /^[A-Za-z]:/.test(path)) return false;
  if (path.includes('//')) return false;
  const segments = path.split('/');
  return segments.every((segment) => segment !== '' && segment !== '.' && segment !== '..');
}

/**
 * May a quoted app label be sourced from this file? Screen and model code only:
 * see SELF_VALIDATING_* above for why help, tests and fixtures are excluded.
 */
export function isQuotableSource(path) {
  if (!isAppRelativePath(path)) return false;
  if (!path.startsWith('lib/')) return false;
  if (SELF_VALIDATING_PREFIXES.some((prefix) => path.startsWith(prefix))) return false;
  const segments = path.split('/');
  if (segments.slice(0, -1).some((segment) => SELF_VALIDATING_SEGMENTS.has(segment))) return false;
  return !SELF_VALIDATING_FILE_RE.test(segments[segments.length - 1]);
}

// ── Dart literal handling ──────────────────────────────────────────────────

const DART_LITERAL = String.raw`'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"`;
const ADJACENT_RUN = new RegExp(`(?:(?:${DART_LITERAL})\\s*){2,}`, 'g');

/**
 * Dart concatenates adjacent string literals, so a label a user reads as one
 * phrase is often two literals wrapped across lines. A raw substring search for
 * that phrase finds nothing, and the tempting fixes — soften the check, or
 * quote half a button — both make the guard worse.
 *
 * Instead, append the joined forms to the source text. The original is kept, so
 * ordinary single-literal labels still match exactly as before.
 */
export function concatenateAdjacentLiterals(source) {
  if (typeof source !== 'string' || source === '') return source ?? '';
  const joined = [];
  for (const [run] of source.matchAll(ADJACENT_RUN)) {
    const parts = [...run.matchAll(new RegExp(DART_LITERAL, 'g'))].map(([literal]) =>
      literal.slice(1, -1)
    );
    if (parts.length > 1) joined.push(parts.join(''));
  }
  return joined.length > 0 ? `${source}\n${joined.join('\n')}` : source;
}

// ── small helpers ──────────────────────────────────────────────────────────

const isFilledString = (value) => typeof value === 'string' && value.trim() !== '';

const normaliseTitle = (title) => String(title ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

const normalisePath = (path) => String(path ?? '').replace(/\/+$/, '') || '/';

/**
 * YAML turns an unquoted `2026-09-07` into a Date. Bring it back to the string
 * the author wrote so nobody has to remember quotes in frontmatter.
 */
export function toIsoDateString(value) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return typeof value === 'string' ? value.trim() : value;
}

/** A real calendar day, not merely ten characters shaped like one. */
function isCalendarDate(value) {
  if (!isFilledString(value) || !ISO_DATE_RE.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

// ── the contract ───────────────────────────────────────────────────────────

/**
 * @param {object} input
 * @param {Array} input.topics             content/guide/topics.json records
 * @param {Array} input.guides             GuideDocument[] from readGuides
 * @param {Array<string>} input.referencedSlugs  slugs the app already links to
 * @param {Record<string,string>} input.sourceByPath  app-relative path -> source text
 * @param {Set<string>|Array<string>} input.publicFeatureKeys  customer-visible keys
 * @param {{titles?: string[], paths?: string[]}} [input.existingPages]
 *        titles and canonical paths already used elsewhere on the site
 * @returns {string[]} every error found, never just the first
 */
export function validateGuideContract({
  topics,
  guides,
  referencedSlugs,
  sourceByPath,
  publicFeatureKeys,
  existingPages,
} = {}) {
  const errors = [];

  if (!Array.isArray(topics)) return ['topics: not a list of topic records'];
  if (!Array.isArray(guides)) return ['guides: not a list of guide documents'];

  const references = Array.isArray(referencedSlugs) ? referencedSlugs : [];
  const sources = sourceByPath ?? {};
  const publicKeys =
    publicFeatureKeys instanceof Set ? publicFeatureKeys : new Set(publicFeatureKeys ?? []);
  const takenTitles = new Set((existingPages?.titles ?? []).map(normaliseTitle));
  const takenPaths = new Set((existingPages?.paths ?? []).map(normalisePath));

  // ── topics ───────────────────────────────────────────────────────────────
  const seenIds = new Set();
  const seenTopicSlugs = new Set();
  const seenTitles = new Set();
  const topicBySlug = new Map();

  for (const [index, topic] of topics.entries()) {
    const id = topic?.id;
    const slug = topic?.slug;
    const where = isFilledString(id) ? `topic ${id}` : `topic #${index + 1}`;

    if (!isFilledString(id)) {
      errors.push(`${where}: missing id`);
    } else if (seenIds.has(id)) {
      errors.push(`${where}: duplicate id`);
    } else {
      seenIds.add(id);
    }

    if (INTERNAL_TOPIC_IDS.has(id) || INTERNAL_TOPIC_IDS.has(slug)) {
      errors.push(`topic ${id ?? slug}: internal-only, it has no public slug`);
    }

    if (!isFilledString(slug) || !SLUG_RE.test(slug)) {
      errors.push(`${where}: slug ${JSON.stringify(slug)} is not a safe url segment`);
    } else if (seenTopicSlugs.has(slug)) {
      errors.push(`${where}: duplicate slug`);
    } else {
      seenTopicSlugs.add(slug);
      topicBySlug.set(slug, topic);
    }

    if (!isFilledString(topic?.title)) {
      errors.push(`${where}: missing title`);
    } else {
      const title = normaliseTitle(topic.title);
      if (takenTitles.has(title)) {
        errors.push(`${where}: the title "${topic.title}" is already used by a page on the site`);
      }
      if (seenTitles.has(title)) {
        errors.push(`${where}: the title "${topic.title}" is already used by another guide`);
      }
      seenTitles.add(title);
    }

    if (isFilledString(slug) && takenPaths.has(`/guide/${slug}`)) {
      errors.push(`${where}: /guide/${slug} is already a page on the site`);
    }

    if (topic?.featureKey !== null && !isFilledString(topic?.featureKey)) {
      errors.push(`${where}: featureKey must be a feature key or null`);
    } else if (topic.featureKey && !publicKeys.has(topic.featureKey)) {
      errors.push(`guide ${slug}: feature is not verified public`);
    }

    if (!Array.isArray(topic?.sourceFiles) || topic.sourceFiles.length === 0) {
      errors.push(`${where}: lists no app source files`);
    } else {
      for (const path of topic.sourceFiles) {
        if (!isAppRelativePath(path)) {
          errors.push(`${where}: source file ${JSON.stringify(path)} escapes the app checkout`);
        }
      }
    }
  }

  // ── guides ───────────────────────────────────────────────────────────────
  const bySlug = new Map();
  for (const guide of guides) {
    const slug = guide?.slug;
    if (!isFilledString(slug) || !SLUG_RE.test(slug)) {
      errors.push(`guide ${JSON.stringify(slug)}: slug is not a safe url segment`);
      continue;
    }
    if (bySlug.has(slug)) {
      errors.push(`guide ${slug}: duplicate guide slug`);
      continue;
    }
    bySlug.set(slug, guide);

    if (INTERNAL_TOPIC_IDS.has(slug)) {
      errors.push(`guide ${slug}: internal-only, it has no public page`);
    }
    if (isFilledString(guide.file) && guide.file !== `${slug}.md`) {
      errors.push(`guide ${slug}: file ${guide.file} does not match its slug`);
    }
    if (!topicBySlug.has(slug)) {
      errors.push(`guide ${slug}: no topic record`);
    }
  }

  // ── slugs the app already points at ──────────────────────────────────────
  for (const slug of references) {
    if (INTERNAL_TOPIC_IDS.has(slug)) {
      errors.push(`app slug ${slug}: internal-only, it must not be linked publicly`);
      continue;
    }
    if (!bySlug.has(slug)) errors.push(`app slug ${slug}: no guide page`);
  }

  // ── each topic's page ────────────────────────────────────────────────────
  for (const topic of topics) {
    const slug = topic?.slug;
    if (!isFilledString(slug)) continue;

    const guide = bySlug.get(slug);
    if (!guide) {
      errors.push(`guide ${slug}: missing content`);
      continue;
    }

    const topicKey = topic.featureKey ?? null;
    const guideKey = guide.featureKey ?? null;
    if (topicKey !== guideKey) {
      errors.push(
        `guide ${slug}: featureKey ${guideKey} does not match topic featureKey ${topicKey}`
      );
    }
    if (guideKey && !publicKeys.has(guideKey)) {
      errors.push(`guide ${slug}: feature is not verified public`);
    }

    if (isFilledString(guide.title) && isFilledString(topic.title)) {
      if (normaliseTitle(guide.title) !== normaliseTitle(topic.title)) {
        errors.push(`guide ${slug}: title does not match its topic title`);
      }
    } else if (!isFilledString(guide.title)) {
      errors.push(`guide ${slug}: missing title`);
    }

    const checked = toIsoDateString(guide.checkedAgainstAppOn);
    if (!isCalendarDate(checked)) {
      errors.push(
        `guide ${slug}: checkedAgainstAppOn ${JSON.stringify(checked)} is not a YYYY-MM-DD date`
      );
    }
    if (!isFilledString(guide.appRevision) || !REVISION_RE.test(guide.appRevision.trim())) {
      errors.push(
        `guide ${slug}: appRevision ${JSON.stringify(guide.appRevision)} is not a git revision`
      );
    }

    // Sections may narrow a procedure to a feature; a dark one may not appear.
    for (const section of guide.sections ?? []) {
      const sectionId = isFilledString(section?.id) ? section.id : '(unnamed)';
      for (const key of section?.featureKeys ?? []) {
        if (!publicKeys.has(key)) {
          errors.push(
            `guide ${slug}: section ${sectionId} uses ${key}, which is not verified public`
          );
        }
      }
    }

    // ── the app labels ─────────────────────────────────────────────────────
    if (!Array.isArray(guide.quotes)) {
      errors.push(`guide ${slug}: quotes must be a list of app labels`);
      continue;
    }
    if (guide.quotes.length === 0) {
      errors.push(`guide ${slug}: declares no app labels in quotes`);
      continue;
    }

    for (const label of guide.quotes) {
      if (!isFilledString(label)) {
        errors.push(`guide ${slug}: quotes contains ${JSON.stringify(label)}, not an app label`);
        continue;
      }

      const declared = guide.quoteSources?.[label];
      if (!Array.isArray(declared) || declared.length === 0) {
        errors.push(`guide ${slug}: no quoteSources entry for "${label}"`);
        errors.push(`guide ${slug}: missing app label "${label}"`);
        continue;
      }

      for (const path of declared) {
        if (!isAppRelativePath(path)) {
          errors.push(
            `guide ${slug}: quote source ${JSON.stringify(path)} escapes the app checkout`
          );
        } else if (!isQuotableSource(path)) {
          errors.push(
            `guide ${slug}: quote source ${path} is help copy, a test or a fixture, ` +
              'so it cannot prove the label'
          );
        } else if (!(path in sources)) {
          errors.push(`guide ${slug}: quote source ${path} is not in the app checkout`);
        }
      }

      const usable = declared.filter(isQuotableSource);
      const proven =
        usable.length === declared.length &&
        usable.some((path) => String(sources[path] ?? '').includes(label));
      if (!proven) errors.push(`guide ${slug}: missing app label "${label}"`);
    }
  }

  return errors;
}

// ── reading the corpus ─────────────────────────────────────────────────────

/**
 * Load `content/guide/*.md` from a website checkout with the repository's own
 * gray-matter + marked pipeline, the same pair `vite.config.js` uses, so a page
 * validated here is the page that gets rendered.
 *
 * @param {string} root website repository root
 * @returns {Array<object>} GuideDocument[]
 */
export function readGuides(root) {
  const dir = resolve(root, 'content/guide');
  if (!existsSync(dir)) return [];

  return readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const raw = readFileSync(resolve(dir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        file,
        slug: isFilledString(data.slug) ? data.slug.trim() : file.replace(/\.md$/, ''),
        title: data.title ?? '',
        metaTitle: data.meta_title ?? null,
        metaDescription: data.meta_description ?? null,
        featureKey: data.featureKey ?? null,
        quotes: data.quotes ?? [],
        quoteSources: data.quoteSources ?? {},
        checkedAgainstAppOn: toIsoDateString(data.checkedAgainstAppOn),
        appRevision: typeof data.appRevision === 'string' ? data.appRevision.trim() : '',
        relatedGuides: data.relatedGuides ?? [],
        sections: data.sections ?? [],
        images: data.images ?? [],
        frontmatter: data,
        body: content,
        html: marked(content),
        raw,
      };
    });
}

/** Read topics.json from a website checkout. Returns `[]` when it is absent. */
export function readTopics(root) {
  const file = resolve(root, 'content/guide/topics.json');
  if (!existsSync(file)) return [];
  const parsed = JSON.parse(readFileSync(file, 'utf-8'));
  return Array.isArray(parsed.topics) ? parsed.topics : [];
}
