// checkGuideContract — run the guide contract against the real app checkout.
//
// scripts/lib/guideContract.mjs holds the rules and knows nothing about disks
// or repositories, so the mutation tests can damage a fixture without either.
// This file is the other half: it finds the paired Flutter checkout, reads the
// actual Dart the guides quote, reads the live customer-visibility evidence,
// and hands all of it to the pure validator.
//
// It is deliberately unskippable. A missing app checkout or missing visibility
// evidence is a hard, named failure, never a quiet pass — the whole point of
// the gate is that the site cannot publish a procedure for a screen nobody
// checked, or a page for a feature that is dark to customers. "The build box
// did not have the other repository" is exactly the situation in which the
// wrong thing gets published.
//
// Usage:
//   TAKKADA_APP_ROOT=/path/to/takkada node scripts/checkGuideContract.mjs
//   TAKKADA_APP_ROOT=/path/to/takkada node scripts/checkGuideContract.mjs --slug dispatch
//
// `--slug` narrows the run to one topic so an author can check the guide they
// are writing without the other twenty unwritten pages drowning the output. It
// is an authoring convenience only: the release gate runs unfiltered.

import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  concatenateAdjacentLiterals,
  readGuides,
  readTopics,
  validateGuideContract,
} from './lib/guideContract.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

class ContractError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GuideContractError';
  }
}

// ── the paired app checkout ────────────────────────────────────────────────

export function resolveAppRoot(env = process.env) {
  const raw = env.TAKKADA_APP_ROOT;
  if (!raw || raw.trim() === '') {
    throw new ContractError(
      'TAKKADA_APP_ROOT is not set. The guide contract is checked against the real ' +
        'Flutter checkout at a recorded revision; it is never skipped because the ' +
        'checkout is missing. Export TAKKADA_APP_ROOT and run again.'
    );
  }
  const root = resolve(raw.trim());
  if (!existsSync(resolve(root, 'lib'))) {
    throw new ContractError(
      `TAKKADA_APP_ROOT points at ${root}, which has no lib/ directory. That is not ` +
        'the takkada Flutter checkout.'
    );
  }
  return realpathSync(root);
}

export function readVisibilityEvidence(appRoot) {
  const file = resolve(appRoot, 'tool/help/visibility-evidence.json');
  if (!existsSync(file)) {
    throw new ContractError(
      `visibility evidence not found at ${file}. A guide may only be published for a ` +
        'feature that the live feature_definitions export marks customer-visible; an ' +
        'entitlement, a demo grant or a backend fallback is not evidence. Capture the ' +
        'export into tool/help/visibility-evidence.json and run again.'
    );
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, 'utf-8'));
  } catch (error) {
    throw new ContractError(`visibility evidence at ${file} is not valid JSON: ${error.message}`);
  }

  const features = parsed?.features;
  if (!features || typeof features !== 'object' || Object.keys(features).length === 0) {
    throw new ContractError(
      `visibility evidence at ${file} has no "features" map. Expected feature_key -> ` +
        'is_customer_visible from the deployed environment.'
    );
  }

  const publicFeatureKeys = new Set(
    Object.entries(features)
      .filter(([, visible]) => visible === true)
      .map(([key]) => key)
  );
  return { publicFeatureKeys, source: parsed.source ?? null, file };
}

export function readAppRevision(appRoot) {
  try {
    return execFileSync('git', ['-C', appRoot, 'rev-parse', 'HEAD'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (error) {
    throw new ContractError(
      `could not read the app revision from ${appRoot}: ${error.message}. The contract ` +
        'records which revision the guides were checked against, so an unversioned ' +
        'directory cannot be used.'
    );
  }
}

/**
 * Slugs the app already points at. Read from the app's own declarations, never
 * guessed from route names: the plan set is explicit that a topic is chosen by
 * a person, not derived from a router path.
 *
 * Both files are produced by the app-side tasks (A5/A6), so before those land
 * there is legitimately nothing to satisfy and the list is empty.
 */
export function readReferencedSlugs(appRoot) {
  const slugs = new Set();
  const sources = [];

  const published = resolve(appRoot, 'tool/help/published_guides.json');
  if (existsSync(published)) {
    const parsed = JSON.parse(readFileSync(published, 'utf-8'));
    for (const slug of parsed?.slugs ?? []) slugs.add(slug);
    sources.push(published);
  }

  const placements = resolve(appRoot, 'tool/help/placements.json');
  if (existsSync(placements)) {
    const parsed = JSON.parse(readFileSync(placements, 'utf-8'));
    for (const record of parsed?.placements ?? []) {
      // A placement with an explicit null publicSlug is internal-only by
      // design (KD-7); absent the field, the topic id is the public slug.
      if (record?.publicSlug === null) continue;
      const slug = record?.publicSlug ?? record?.topicId;
      if (slug) slugs.add(slug);
    }
    sources.push(placements);
  }

  return { slugs: [...slugs].sort(), sources };
}

// ── the Dart the guides quote ──────────────────────────────────────────────

/**
 * Read every app file the corpus declares, with adjacent string literals joined
 * so a label wrapped across two lines still matches the phrase a user reads.
 *
 * Containment is re-checked here with realpath: the pure validator refuses
 * `..` and absolute paths, and this refuses a symlink that would land outside
 * the checkout anyway.
 */
export function readAppSources(appRoot, paths) {
  const sourceByPath = {};
  const prefix = appRoot.endsWith(sep) ? appRoot : appRoot + sep;

  for (const path of new Set(paths)) {
    if (typeof path !== 'string' || path === '') continue;
    const absolute = resolve(appRoot, path);
    if (!absolute.startsWith(prefix)) continue;
    if (!existsSync(absolute)) continue;
    const real = realpathSync(absolute);
    if (!real.startsWith(prefix)) continue;
    sourceByPath[path] = concatenateAdjacentLiterals(readFileSync(real, 'utf-8'));
  }

  return sourceByPath;
}

// ── the pages the site already serves ──────────────────────────────────────

/**
 * Titles and canonical paths already in use, so a guide cannot quietly become a
 * second page competing for the same query as a feature page or a blog post.
 * The editorial boundary is the reason: a feature page owns the buying query, a
 * blog post owns the curiosity query, a guide owns "I am stuck right now".
 */
export async function readExistingPages(root = repoRoot) {
  const titles = [];
  const paths = [];

  const { FEATURE_PAGES, featurePagePath } = await import('../src/data/featurePages.js');
  for (const page of FEATURE_PAGES) {
    paths.push(featurePagePath(page));
    if (page.seo?.title) titles.push(page.seo.title);
    if (page.headline) titles.push(page.headline);
  }

  const { routeMetadata } = await import('../src/data/siteMetadata.js');
  for (const route of routeMetadata) {
    paths.push(route.path);
    if (route.llms?.title) titles.push(route.llms.title);
  }

  const blogDir = resolve(root, 'content/blog');
  if (existsSync(blogDir)) {
    const { readdirSync } = await import('node:fs');
    const matter = (await import('gray-matter')).default;
    for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
      const { data } = matter(readFileSync(resolve(blogDir, file), 'utf-8'));
      const slug = data.slug ?? file.replace(/\.md$/, '');
      paths.push(`/blog/${slug}`);
      if (data.title) titles.push(data.title);
      if (data.meta_title) titles.push(data.meta_title);
    }
  }

  return { titles, paths };
}

// ── the run ────────────────────────────────────────────────────────────────

export function parseArgs(argv) {
  const options = { slug: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--slug') {
      options.slug = argv[i + 1] ?? null;
      i += 1;
    } else if (argv[i].startsWith('--slug=')) {
      options.slug = argv[i].slice('--slug='.length);
    }
  }
  if (options.slug !== null && options.slug.trim() === '') options.slug = null;
  return options;
}

async function main() {
  const { slug } = parseArgs(process.argv.slice(2));

  const appRoot = resolveAppRoot();
  const { publicFeatureKeys, source, file: evidenceFile } = readVisibilityEvidence(appRoot);
  const appRevision = readAppRevision(appRoot);

  let topics = readTopics(repoRoot);
  let guides = readGuides(repoRoot);
  const { slugs: allReferenced, sources: referenceSources } = readReferencedSlugs(appRoot);
  let referencedSlugs = allReferenced;

  if (slug) {
    const known = topics.some((topic) => topic.slug === slug);
    if (!known) {
      process.stderr.write(
        `checkGuideContract: --slug ${slug} is not a topic in content/guide/topics.json\n`
      );
      process.exit(1);
    }
    topics = topics.filter((topic) => topic.slug === slug);
    guides = guides.filter((guide) => guide.slug === slug);
    referencedSlugs = referencedSlugs.filter((each) => each === slug);
  }

  const declaredPaths = [
    ...topics.flatMap((topic) => topic.sourceFiles ?? []),
    ...guides.flatMap((guide) => Object.values(guide.quoteSources ?? {}).flat()),
  ];
  const sourceByPath = readAppSources(appRoot, declaredPaths);
  const existingPages = await readExistingPages(repoRoot);

  const errors = validateGuideContract({
    topics,
    guides,
    referencedSlugs,
    sourceByPath,
    publicFeatureKeys,
    existingPages,
  });

  // A revision mismatch is reported, not failed: guides are checked against the
  // revision an author actually walked, and the checkout moving on afterwards
  // does not retroactively make the page wrong. What it does mean is that the
  // label evidence below came from newer code than the author reviewed, which a
  // reviewer should know.
  for (const guide of guides) {
    if (guide.appRevision && !appRevision.startsWith(guide.appRevision)) {
      process.stdout.write(
        `checkGuideContract: note — ${guide.slug} was checked against ${guide.appRevision}, ` +
          `labels verified against ${appRevision.slice(0, 12)}\n`
      );
    }
  }

  if (referenceSources.length === 0) {
    process.stdout.write(
      'checkGuideContract: note — the app declares no guide slugs yet ' +
        '(no tool/help/published_guides.json or placements.json), so no app link is checked.\n'
    );
  }

  if (errors.length > 0) {
    for (const error of errors) process.stderr.write(`checkGuideContract: ${error}\n`);
    process.stderr.write(`checkGuideContract: ${errors.length} problem(s).\n`);
    process.exit(1);
  }

  const scope = slug ? `guide ${slug}` : `${topics.length} topics`;
  process.stdout.write(
    `checkGuideContract: OK (${scope}, ${guides.length} pages, ` +
      `${Object.keys(sourceByPath).length} app files read at ${appRevision.slice(0, 12)}, ` +
      `${publicFeatureKeys.size} customer-visible features from ` +
      `${source?.environment ?? 'unknown environment'} in ${evidenceFile})\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((error) => {
    if (error instanceof ContractError) {
      process.stderr.write(`checkGuideContract: ${error.message}\n`);
      process.exit(1);
    }
    throw error;
  });
}
