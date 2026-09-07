// Mutation tests for the guide release contract.
//
// The guides are procedures for people who are stuck inside the app right now.
// The single way they go bad is drift: a button gets renamed, a feature is
// pulled back behind a dark flag, a page is deleted while the app still links
// to it, and the page keeps serving confident instructions for software that no
// longer exists. None of that shows up as a broken build — the page still
// returns 200 and every render test still passes.
//
// So each case below is a way the corpus can rot, and each one must stay red.
// The rule that gives the label check its teeth is the self-validation
// exclusion: a quote may only be sourced from real screen/model code, never
// from the help catalog, a test or a fixture, because those are written by the
// same author as the guide and would happily agree with it forever.
//
// The dry-run block at the bottom belongs to W1 as well: every local build in
// this plan set runs `INDEXNOW_DRY_RUN=true npm run build`, so the CLI wiring
// that honours it is part of this task's contract rather than the site's.

import { describe, it, expect, vi } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  validateGuideContract,
  readGuides,
  concatenateAdjacentLiterals,
} from '../lib/guideContract.mjs';
import { cliOptions, submitIndexNow } from '../submitIndexNow.mjs';

// A complete, passing catalog of exactly one topic. Every mutation below
// damages a copy of this, so the fixture itself must be clean — a base that
// already errors would make every `.length > 0` assertion vacuous.
const base = () => ({
  topics: [
    {
      id: 'gst-on-the-bill',
      slug: 'gst-on-the-bill',
      featureKey: null,
      title: 'How to check GST on a bill',
      sourceFiles: ['lib/screens/invoice_summary_screen.dart'],
    },
  ],
  guides: [
    {
      file: 'gst-on-the-bill.md',
      slug: 'gst-on-the-bill',
      title: 'How to check GST on a bill',
      featureKey: null,
      quotes: ['Round Off'],
      quoteSources: { 'Round Off': ['lib/screens/ledger_config_screen.dart'] },
      checkedAgainstAppOn: '2026-09-07',
      appRevision: '523b5637',
      sections: [],
    },
  ],
  referencedSlugs: ['gst-on-the-bill'],
  sourceByPath: {
    'lib/screens/ledger_config_screen.dart': "label: 'Round Off'",
    'lib/screens/invoice_summary_screen.dart': "const Text('GST')",
  },
  publicFeatureKeys: new Set(),
  existingPages: { titles: [], paths: [] },
});

describe('guide release contract', () => {
  it('passes a complete, honest catalog', () => {
    expect(validateGuideContract(base())).toEqual([]);
  });

  // ── The four cases named in the plan ─────────────────────────────────────

  it('names guide and missing label', () => {
    const input = base();
    input.sourceByPath['lib/screens/ledger_config_screen.dart'] = "label: 'Rounding'";
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: missing app label "Round Off"'
    );
  });

  it('cannot satisfy the label using the guide copy itself', () => {
    const input = base();
    input.guides[0].quoteSources = { 'Round Off': ['lib/help/help_catalog.dart'] };
    input.sourceByPath['lib/help/help_catalog.dart'] = "'Round Off'";
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('fails a slug used by the app but absent from content', () => {
    const input = base();
    input.referencedSlugs.push('e-way-bill');
    expect(validateGuideContract(input)).toContain('app slug e-way-bill: no guide page');
  });

  it('cannot publish an entitled but dark feature', () => {
    const input = base();
    input.topics[0].featureKey = 'field_visits';
    input.guides[0].featureKey = 'field_visits';
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  // ── Self-validation: a quote must come from real screen code ─────────────

  it('rejects a quote sourced from the in-app help widgets', () => {
    const input = base();
    input.guides[0].quoteSources = {
      'Round Off': ['lib/widgets/help/help_sheet.dart'],
    };
    input.sourceByPath['lib/widgets/help/help_sheet.dart'] = "'Round Off'";
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: missing app label "Round Off"'
    );
  });

  it('rejects a quote sourced from a test or a fixture', () => {
    for (const path of [
      'test/screens/ledger_config_screen_test.dart',
      'lib/screens/fixtures/ledger_config_fixture.dart',
      'lib/screens/ledger_config_screen_test.dart',
    ]) {
      const input = base();
      input.guides[0].quoteSources = { 'Round Off': [path] };
      input.sourceByPath[path] = "'Round Off'";
      expect(validateGuideContract(input).length).toBeGreaterThan(0);
    }
  });

  it('rejects one bad source even when a good one sits beside it', () => {
    const input = base();
    input.guides[0].quoteSources = {
      'Round Off': ['lib/screens/ledger_config_screen.dart', 'lib/help/help_catalog.dart'],
    };
    input.sourceByPath['lib/help/help_catalog.dart'] = "'Round Off'";
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('names a declared quote source that is not in the app checkout', () => {
    const input = base();
    input.guides[0].quoteSources = { 'Round Off': ['lib/screens/gone_screen.dart'] };
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: quote source lib/screens/gone_screen.dart is not in the app checkout'
    );
  });

  it('rejects a quote source that escapes the app root', () => {
    for (const path of [
      '../../secrets/labels.dart',
      'lib/../../etc/passwd',
      '/Users/ronak/lib/screens/ledger_config_screen.dart',
      'lib\\screens\\ledger_config_screen.dart',
    ]) {
      const input = base();
      input.guides[0].quoteSources = { 'Round Off': [path] };
      input.sourceByPath[path] = "'Round Off'";
      expect(validateGuideContract(input).length).toBeGreaterThan(0);
    }
  });

  it('rejects a topic source file that escapes the app root', () => {
    const input = base();
    input.topics[0].sourceFiles = ['../../../etc/passwd'];
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  // ── Structural integrity of the catalog ──────────────────────────────────

  it('rejects a topic with no id', () => {
    const input = base();
    delete input.topics[0].id;
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('rejects duplicate topic ids', () => {
    const input = base();
    input.topics.push({ ...input.topics[0], slug: 'other-slug' });
    expect(validateGuideContract(input)).toContain('topic gst-on-the-bill: duplicate id');
  });

  it('rejects duplicate topic slugs', () => {
    const input = base();
    input.topics.push({ ...input.topics[0], id: 'other-id' });
    expect(validateGuideContract(input)).toContain('topic other-id: duplicate slug');
  });

  it('rejects a duplicate guide slug', () => {
    const input = base();
    input.guides.push({ ...input.guides[0] });
    expect(validateGuideContract(input)).toContain('guide gst-on-the-bill: duplicate guide slug');
  });

  it('rejects a filename that disagrees with the slug it declares', () => {
    const input = base();
    input.guides[0].file = 'gst.md';
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: file gst.md does not match its slug'
    );
  });

  it('rejects an orphan guide with no topic record', () => {
    const input = base();
    input.guides.push({ ...input.guides[0], slug: 'stowaway', file: 'stowaway.md' });
    expect(validateGuideContract(input)).toContain('guide stowaway: no topic record');
  });

  it('names a topic whose page has not been written', () => {
    const input = base();
    input.guides = [];
    expect(validateGuideContract(input)).toContain('guide gst-on-the-bill: missing content');
  });

  it.each([
    ['GST-On-The-Bill'],
    ['gst_on_the_bill'],
    ['gst on the bill'],
    ['gst--on-the-bill'],
    ['-gst'],
    ['gst-'],
    ['../gst'],
  ])('rejects the unsafe slug %s', (slug) => {
    const input = base();
    input.topics[0].slug = slug;
    input.guides[0].slug = slug;
    input.guides[0].file = `${slug}.md`;
    input.referencedSlugs = [slug];
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('rejects a topic with no title', () => {
    const input = base();
    input.topics[0].title = '   ';
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('rejects a topic that lists no source files', () => {
    const input = base();
    input.topics[0].sourceFiles = [];
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  // ── Evidence fields ──────────────────────────────────────────────────────

  it('rejects a guide that declares no app labels at all', () => {
    const input = base();
    input.guides[0].quotes = [];
    input.guides[0].quoteSources = {};
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: declares no app labels in quotes'
    );
  });

  it.each([['not an array'], [['']], [['   ']], [[42]]])(
    'rejects malformed quotes %s',
    (quotes) => {
      const input = base();
      input.guides[0].quotes = quotes;
      expect(validateGuideContract(input).length).toBeGreaterThan(0);
    }
  );

  it.each([[''], ['07-09-2026'], ['2026-9-7'], ['2026-13-01'], ['2026-02-31'], [undefined]])(
    'rejects the checked date %s',
    (value) => {
      const input = base();
      input.guides[0].checkedAgainstAppOn = value;
      expect(validateGuideContract(input).length).toBeGreaterThan(0);
    }
  );

  it.each([[''], ['   '], ['523b56'], ['not-a-sha'], [undefined]])(
    'rejects the app revision %s',
    (value) => {
      const input = base();
      input.guides[0].appRevision = value;
      expect(validateGuideContract(input).length).toBeGreaterThan(0);
    }
  );

  // ── Visibility and internal-only topics ──────────────────────────────────

  it('accepts a feature key that the live evidence marks customer-visible', () => {
    const input = base();
    input.topics[0].featureKey = 'dispatch_load';
    input.guides[0].featureKey = 'dispatch_load';
    input.publicFeatureKeys = new Set(['dispatch_load']);
    expect(validateGuideContract(input)).toEqual([]);
  });

  it('rejects a guide whose featureKey disagrees with its topic', () => {
    const input = base();
    input.publicFeatureKeys = new Set(['dispatch_load', 'document_import']);
    input.topics[0].featureKey = 'dispatch_load';
    input.guides[0].featureKey = 'document_import';
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: featureKey document_import does not match topic featureKey dispatch_load'
    );
  });

  it('rejects a section that leans on a dark feature', () => {
    const input = base();
    input.guides[0].sections = [
      { id: 'bulk-challans', featureKeys: ['bulk_delivery_challan'] },
    ];
    expect(validateGuideContract(input)).toContain(
      'guide gst-on-the-bill: section bulk-challans uses bulk_delivery_challan, which is not verified public'
    );
  });

  it('keeps the internal approvals topic out of the public catalog', () => {
    const input = base();
    input.topics.push({
      id: 'entries-waiting-approval',
      slug: 'entries-waiting-approval',
      featureKey: null,
      title: 'Entries waiting for approval',
      sourceFiles: ['lib/screens/home_screen.dart'],
    });
    expect(validateGuideContract(input)).toContain(
      'topic entries-waiting-approval: internal-only, it has no public slug'
    );
  });

  it('keeps the internal approvals slug out of app references', () => {
    const input = base();
    input.referencedSlugs.push('entries-waiting-approval');
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  // ── Collisions with the commercial site ──────────────────────────────────

  it('rejects a guide title already used by a page on the site', () => {
    const input = base();
    input.existingPages = { titles: ['How to check GST on a bill'], paths: [] };
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('rejects a guide whose canonical path is already claimed', () => {
    const input = base();
    input.existingPages = { titles: [], paths: ['/guide/gst-on-the-bill'] };
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });

  it('rejects two guides claiming the same title', () => {
    const input = base();
    input.topics.push({
      id: 'sales-invoice',
      slug: 'sales-invoice',
      featureKey: null,
      title: 'How to check GST on a bill',
      sourceFiles: ['lib/screens/invoice_summary_screen.dart'],
    });
    input.guides.push({
      ...input.guides[0],
      slug: 'sales-invoice',
      file: 'sales-invoice.md',
    });
    expect(validateGuideContract(input).length).toBeGreaterThan(0);
  });
});

// A Dart label is often written as two adjacent literals wrapped across lines,
// so a raw substring search for the label a user actually reads returns
// nothing. The answer is to join the fragments the way the compiler does, not
// to soften the check or to quote half a button.
describe('adjacent Dart string literals', () => {
  it('joins fragments the compiler would join', () => {
    const source = [
      "const reason = 'Take the odd ones off so everything on it comes from the same '",
      "    'place. Until then it cannot be sent.';",
    ].join('\n');
    const joined = concatenateAdjacentLiterals(source);
    expect(joined).toContain('comes from the same place. Until then');
  });

  it('leaves the original text intact so single-literal labels still match', () => {
    const source = "labelText: 'Vehicle number (optional)',";
    expect(concatenateAdjacentLiterals(source)).toContain('Vehicle number (optional)');
  });

  it('does not weld two unrelated literals across an operator', () => {
    const source = "final a = 'Van is loaded'; final b = 'Van went out';";
    expect(concatenateAdjacentLiterals(source)).not.toContain('Van is loadedVan went out');
  });

  it('lets a split label satisfy the contract', () => {
    const input = base();
    input.guides[0].quotes = ['Van is loaded and gone'];
    input.guides[0].quoteSources = {
      'Van is loaded and gone': ['lib/models/dispatch_stage_words.dart'],
    };
    input.sourceByPath['lib/models/dispatch_stage_words.dart'] = concatenateAdjacentLiterals(
      "const label = 'Van is loaded '\n    'and gone';"
    );
    expect(validateGuideContract(input)).toEqual([]);
  });
});

describe('readGuides', () => {
  const write = (files) => {
    const root = mkdtempSync(join(tmpdir(), 'guide-contract-'));
    mkdirSync(join(root, 'content/guide'), { recursive: true });
    for (const [name, body] of Object.entries(files)) {
      writeFileSync(join(root, 'content/guide', name), body, 'utf-8');
    }
    return root;
  };

  it('reads frontmatter, body and rendered html', () => {
    const root = write({
      'dispatch.md': [
        '---',
        'slug: dispatch',
        'title: How to load and dispatch goods',
        'featureKey: dispatch_load',
        'checkedAgainstAppOn: 2026-09-07',
        'appRevision: 523b56373606279b51e4e049fd28d5c6dc141e7f',
        'quotes:',
        '  - Van is loaded',
        'quoteSources:',
        '  Van is loaded:',
        '    - lib/models/dispatch_stage_words.dart',
        '---',
        '',
        '## Before you start',
        '',
        'Open Dispatch for your company.',
        '',
      ].join('\n'),
    });

    const [guide] = readGuides(root);
    expect(guide.file).toBe('dispatch.md');
    expect(guide.slug).toBe('dispatch');
    expect(guide.featureKey).toBe('dispatch_load');
    expect(guide.quotes).toEqual(['Van is loaded']);
    expect(guide.quoteSources['Van is loaded']).toEqual([
      'lib/models/dispatch_stage_words.dart',
    ]);
    expect(guide.body).toContain('Before you start');
    expect(guide.html).toContain('<h2');
    expect(guide.raw.startsWith('---')).toBe(true);
  });

  // YAML parses an unquoted 2026-09-07 into a Date, and a Date compared against
  // the YYYY-MM-DD pattern fails for a reason that has nothing to do with the
  // author's evidence. Normalise it here rather than forcing every author to
  // remember quotes.
  it('normalises a YAML date back to YYYY-MM-DD', () => {
    const root = write({
      'dispatch.md': '---\nslug: dispatch\ncheckedAgainstAppOn: 2026-09-07\n---\nbody\n',
    });
    expect(readGuides(root)[0].checkedAgainstAppOn).toBe('2026-09-07');
  });

  it('falls back to the filename when no slug is declared', () => {
    const root = write({ 'tally-sync.md': '---\ntitle: t\n---\nbody\n' });
    expect(readGuides(root)[0].slug).toBe('tally-sync');
  });

  it('returns an empty list when no guide has been written yet', () => {
    expect(readGuides(mkdtempSync(join(tmpdir(), 'guide-empty-')))).toEqual([]);
  });
});

// W1 owns this wiring because every local build in the plan set runs with
// INDEXNOW_DRY_RUN=true, and a verification run must not tell Bing that 250
// URLs changed. Absent the variable the deployment behaviour is untouched.
describe('submitIndexNow dry-run CLI wiring', () => {
  it('turns the environment variable into the dryRun option', () => {
    expect(cliOptions({ INDEXNOW_DRY_RUN: 'true' })).toEqual({ dryRun: true });
  });

  it.each([[{}], [{ INDEXNOW_DRY_RUN: 'false' }], [{ INDEXNOW_DRY_RUN: '1' }]])(
    'leaves normal deployment behaviour alone for %s',
    (env) => {
      expect(cliOptions(env).dryRun).toBe(false);
    }
  );

  it('makes no network call and still counts the URLs', async () => {
    const fetchMock = vi.fn();
    const urls = ['https://takkada.com/guide/', 'https://takkada.com/guide/dispatch/'];
    const result = await submitIndexNow(urls, {
      ...cliOptions({ INDEXNOW_DRY_RUN: 'true' }),
      fetch: fetchMock,
    });

    expect(fetchMock).toHaveBeenCalledTimes(0);
    expect(result).toMatchObject({ success: true, dryRun: true, count: 2 });
  });

  it('still posts when the variable is absent', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ status: 200, ok: true });
    await submitIndexNow(['https://takkada.com/'], { ...cliOptions({}), fetch: fetchMock });
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
