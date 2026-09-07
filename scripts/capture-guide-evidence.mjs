// capture-guide-evidence — write the provenance record for an image that was
// just captured, and refuse to write one for an image that was not.
//
// This is the only supported way to put an `appScreenshot` record into
// content/image-provenance.json. checkScreenshotProvenance.mjs reads those
// records and takes them at face value, so everything that makes them worth
// anything has to happen here, at the moment of capture, while the evidence
// still exists.
//
// What it will not do
// -------------------
// It will not accept `--company-id 143`. A company id typed on a command line
// is an assertion, and the whole point of provenance is that an assertion is not
// evidence. The demo identity comes out of an identity artefact that the capture
// session itself produced — a small JSON file written while the operator was
// looking at the company switcher — and the tool then checks that the artefact
// was observed close enough in time to the image's own mtime to have been the
// same sitting. The artefact's hash goes into the record, so the claim is
// pinned to a specific file that can be produced again later.
//
// It will not read the app revision off a flag either: it asks the paired app
// checkout's git for HEAD.
//
// It will not set `reviewed: true` because a flag was present. Review is a human
// looking at the artwork for customer names, balances, phone numbers and dark
// controls — demo company 143 holds dark feature keys, so "it is the demo
// company" is not the same claim as "this is safe to publish". The operator has
// to type the confirmation sentence.
//
// It will not write anything it would be embarrassing to publish. The manifest
// is committed and served out of a public repository, so the record is scanned
// for tokens, cookies, phone numbers, emails and private URLs before it lands.
//
// Usage
// -----
//   node scripts/capture-guide-evidence.mjs record \
//     --image public/assets/guide/dispatch-van.webp \
//     --route /dispatch \
//     --capture-record demo-dispatch-001 \
//     --identity /path/to/identity.json
//
//   # a crop, redaction or re-encode of an image that already has a record
//   node scripts/capture-guide-evidence.mjs record \
//     --image public/assets/guide/dispatch-van-bar.webp \
//     --route /dispatch --capture-record demo-dispatch-001 \
//     --identity /path/to/identity.json \
//     --derived-from <sha256 of the original> \
//     --derivation "cropped to the bottom action bar"
//
//   # artwork that is not a picture of the application
//   node scripts/capture-guide-evidence.mjs classify \
//     --image public/assets/badges/x.png --kind logo \
//     --origin "third-party recognition badge" --reviewed-by "<name>"
//
//   node scripts/capture-guide-evidence.mjs verify
//
// The identity artefact
// ---------------------
// A JSON file the capture session writes while the demo company is on screen:
//
//   {
//     "companyId": 143,
//     "companyName": "the name shown in the company switcher",
//     "observedAt": "2026-09-07T09:14:00Z",
//     "observedVia": "company switcher, top of the home screen",
//     "observedBy": "who was at the keyboard"
//   }
//
// Only those fields are copied into the manifest, and only after the leak scan.
// Do not put a session token, a console dump, a customer's details or a private
// trace URL in it: the tool will refuse the record, which is the correct
// outcome, but the file itself will already exist on somebody's disk.

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { existsSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  DEMO_COMPANY_ID,
  canonicalManifestPath,
  findMetadataLeaks,
  isSafeRouteTemplate,
  loadManifest,
  validateClassifiedImage,
  validateManifest,
  validateScreenshot,
} from './checkScreenshotProvenance.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MANIFEST = resolve(repoRoot, 'content/image-provenance.json');

const CONFIRMATION =
  'I looked at this image and it shows no customer detail and no dark feature';

const die = (message) => {
  console.error(`capture-guide-evidence: ${message}`);
  process.exit(1);
};

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) args[key] = true;
    else {
      args[key] = next;
      i += 1;
    }
  }
  return args;
}

/** HEAD of the paired app checkout. Asked for, never accepted as a flag. */
function appRevision() {
  const root = process.env.TAKKADA_APP_ROOT;
  if (!root) {
    die(
      'TAKKADA_APP_ROOT is not set. The app revision is read from the paired checkout, ' +
        'because a revision typed by hand records nothing about what was on screen.'
    );
  }
  if (!existsSync(root)) die(`TAKKADA_APP_ROOT does not exist: ${root}`);
  try {
    return execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf-8' }).trim();
  } catch (error) {
    return die(`could not read HEAD from ${root}: ${error.message}`);
  }
}

const sha256Of = (buffer) => createHash('sha256').update(buffer).digest('hex');

function readImage(args) {
  if (typeof args.image !== 'string') die('--image <path> is required');
  const file = resolve(repoRoot, args.image);
  if (!file.startsWith(repoRoot)) die('--image must be inside this repository');
  if (!existsSync(file)) die(`no such image: ${args.image}`);
  const bytes = readFileSync(file);
  return {
    file,
    bytes,
    sha256: sha256Of(bytes),
    // The image's own mtime, not "now". A record that took its timestamp from
    // the clock could claim a capture happened this morning for bytes committed
    // last year, which is exactly the claim provenance is supposed to test.
    modifiedAt: statSync(file).mtime,
    manifestPath: canonicalManifestPath(args.image),
  };
}

/**
 * Read the capture session's identity artefact and check it could plausibly
 * have been the same sitting as the capture.
 */
function readIdentity(args, image) {
  if (typeof args.identity !== 'string') {
    die(
      '--identity <file> is required. The demo company is established by an artefact ' +
        'the capture session wrote, not by a number on this command line.'
    );
  }
  const file = resolve(args.identity);
  if (!existsSync(file)) die(`no such identity artefact: ${args.identity}`);

  const raw = readFileSync(file);
  let identity;
  try {
    identity = JSON.parse(raw.toString('utf-8'));
  } catch (error) {
    return die(`identity artefact is not JSON: ${error.message}`);
  }

  for (const field of ['companyId', 'observedAt', 'observedVia', 'observedBy']) {
    if (identity[field] === undefined || identity[field] === '') {
      die(`identity artefact is missing "${field}"`);
    }
  }
  if (identity.companyId !== DEMO_COMPANY_ID) {
    die(
      `identity artefact records company ${identity.companyId}. Only the demo company ` +
        `(${DEMO_COMPANY_ID}) may be photographed for the public site.`
    );
  }

  const observedAt = new Date(identity.observedAt);
  if (Number.isNaN(observedAt.getTime())) die('identity artefact "observedAt" is not a date');

  const windowMinutes = Number(args['window-minutes'] ?? 60);
  const driftMinutes = Math.abs(observedAt.getTime() - image.modifiedAt.getTime()) / 60000;
  if (driftMinutes > windowMinutes) {
    die(
      `the identity check was observed ${driftMinutes.toFixed(0)} minute(s) from the image's ` +
        `own timestamp, outside the ${windowMinutes}-minute window. An identity check from a ` +
        'different sitting is not evidence about this capture. Recheck the company and ' +
        'recapture, or pass --window-minutes deliberately and say why in --note.'
    );
  }

  return {
    sha256: sha256Of(raw),
    companyId: identity.companyId,
    companyName: typeof identity.companyName === 'string' ? identity.companyName : null,
    observedAt: observedAt.toISOString(),
    observedVia: String(identity.observedVia),
    observedBy: String(identity.observedBy),
    driftMinutes: Number(driftMinutes.toFixed(1)),
  };
}

/** Review is a person looking at the artwork. It is not a command-line flag. */
async function confirmReview(args, image) {
  if (typeof args['reviewed-confirmation'] === 'string') {
    if (args['reviewed-confirmation'].trim() !== CONFIRMATION) {
      die(`--reviewed-confirmation must be exactly:\n  ${CONFIRMATION}`);
    }
    return true;
  }
  if (!process.stdin.isTTY) {
    die(
      'review confirmation is required. Open the image, look at it, and pass\n' +
        `  --reviewed-confirmation "${CONFIRMATION}"\n` +
        'or run this from a terminal and type it.'
    );
  }
  console.log(`\nOpen and look at ${image.manifestPath} before answering.`);
  console.log('Check for: a real customer name, a real balance, an invoice number, a phone');
  console.log('number, a bank reference, and any control belonging to a dark feature.');
  console.log(`Demo company ${DEMO_COMPANY_ID} holds dark feature keys, so being on the demo`);
  console.log('company does not by itself make a screen publishable.\n');
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const typed = await rl.question(`Type exactly:\n  ${CONFIRMATION}\n> `);
  rl.close();
  if (typed.trim() !== CONFIRMATION) die('review not confirmed; nothing written');
  return true;
}

function writeManifest(manifest) {
  const errors = validateManifest(manifest);
  if (errors.length) {
    console.error('capture-guide-evidence: refusing to write, the manifest would be invalid:');
    for (const error of errors) console.error(`  ✗ ${error}`);
    process.exit(1);
  }
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
}

function assertUnclaimed(manifest, image) {
  const claimant = [
    ...Object.entries(manifest.images ?? {}),
    ...Object.entries(manifest.unprovenAllowlist ?? {}),
  ].find(([, record]) => canonicalManifestPath(record.path) === image.manifestPath);
  if (claimant && claimant[0] !== image.sha256) {
    die(
      `${image.manifestPath} already has a record for different bytes (${claimant[0]}). ` +
        'Replacing published artwork under the same filename is a new publication: give the ' +
        'new capture its own filename, or remove the old record deliberately in the same commit.'
    );
  }
}

async function record(args) {
  const image = readImage(args);
  const manifest = loadManifest(repoRoot);
  assertUnclaimed(manifest, image);

  const identity = readIdentity(args, image);
  const revision = appRevision();

  if (typeof args.route !== 'string' || !isSafeRouteTemplate(args.route)) {
    die(
      '--route must be a route TEMPLATE with no query string and no record ids: ' +
        '"/party/:id", not "/party/40213?token=…". The template says which screen was ' +
        'photographed; the values say whose data was on it.'
    );
  }
  if (typeof args['capture-record'] !== 'string' || !args['capture-record'].trim()) {
    die('--capture-record <id> is required: the identifier of the capture session.');
  }

  const derivedFrom = typeof args['derived-from'] === 'string' ? args['derived-from'] : null;
  if (derivedFrom && !(manifest.images ?? {})[derivedFrom]) {
    die(
      `--derived-from ${derivedFrom} is not a record in the manifest. A crop can only claim ` +
        'demo origin through an original that is already proven.'
    );
  }
  if (derivedFrom && typeof args.derivation !== 'string') {
    die('--derivation "<what was done to the original>" is required with --derived-from');
  }

  await confirmReview(args, image);

  const entry = {
    path: `public${image.manifestPath}`,
    kind: 'appScreenshot',
    sha256: image.sha256,
    companyId: identity.companyId,
    captureRecord: args['capture-record'].trim(),
    capturedAt: image.modifiedAt.toISOString(),
    appRevision: revision,
    route: args.route,
    reviewed: true,
    reviewedOn: new Date().toISOString().slice(0, 10),
    identityCheck: {
      sha256: identity.sha256,
      companyName: identity.companyName,
      observedAt: identity.observedAt,
      observedVia: identity.observedVia,
      observedBy: identity.observedBy,
      driftMinutes: identity.driftMinutes,
    },
    ...(derivedFrom ? { derivedFrom, derivation: args.derivation } : {}),
    ...(typeof args.note === 'string' ? { note: args.note } : {}),
  };

  const leaks = findMetadataLeaks(entry);
  if (leaks.length) {
    console.error('capture-guide-evidence: this record would publish private detail:');
    for (const leak of leaks) console.error(`  ✗ ${leak}`);
    die('nothing written. Take it out of the identity artefact and run again.');
  }

  const problems = validateScreenshot({
    bytes: image.bytes,
    evidence: entry,
    parentEvidence: derivedFrom ? manifest.images[derivedFrom] : null,
  });
  if (problems.length) {
    console.error('capture-guide-evidence: the record this would write does not pass the gate:');
    for (const problem of problems) console.error(`  ✗ ${problem}`);
    process.exit(1);
  }

  if (args['dry-run']) {
    console.log(JSON.stringify(entry, null, 2));
    console.log('\n--dry-run: nothing written.');
    return;
  }

  manifest.images = { ...(manifest.images ?? {}), [image.sha256]: entry };
  delete manifest.unprovenAllowlist?.[image.sha256];
  writeManifest(manifest);
  console.log(`capture-guide-evidence: recorded ${image.manifestPath} (${image.sha256}).`);
  console.log('Commit the image bytes and this record together.');
}

/** Artwork that is not a picture of the application, classified explicitly. */
async function classify(args) {
  const image = readImage(args);
  const manifest = loadManifest(repoRoot);
  assertUnclaimed(manifest, image);

  const entry = {
    path: `public${image.manifestPath}`,
    kind: typeof args.kind === 'string' ? args.kind : '',
    sha256: image.sha256,
    reviewed: true,
    reviewedOn: new Date().toISOString().slice(0, 10),
    reviewedBy: typeof args['reviewed-by'] === 'string' ? args['reviewed-by'] : '',
    origin: typeof args.origin === 'string' ? args.origin : '',
  };

  const problems = [...validateClassifiedImage(entry), ...findMetadataLeaks(entry)];
  if (problems.length) {
    console.error('capture-guide-evidence: classification is incomplete:');
    for (const problem of problems) console.error(`  ✗ ${problem}`);
    die('--kind illustration|logo|photograph, --origin "<how this artwork was made>" ' +
      'and --reviewed-by "<who looked at it>" are all required.');
  }

  await confirmReview(args, image);

  if (args['dry-run']) {
    console.log(JSON.stringify(entry, null, 2));
    console.log('\n--dry-run: nothing written.');
    return;
  }

  manifest.images = { ...(manifest.images ?? {}), [image.sha256]: entry };
  writeManifest(manifest);
  console.log(`capture-guide-evidence: classified ${image.manifestPath} as ${entry.kind}.`);
}

function verify() {
  const manifest = loadManifest(repoRoot);
  const errors = validateManifest(manifest);
  let checked = 0;
  for (const [key, group] of [
    ['images', manifest.images ?? {}],
    ['unprovenAllowlist', manifest.unprovenAllowlist ?? {}],
  ]) {
    for (const [sha, entry] of Object.entries(group)) {
      checked += 1;
      const file = resolve(repoRoot, String(entry.path).replace(/^\//, ''));
      if (!existsSync(file)) {
        errors.push(`${key}: ${entry.path} is recorded but not on disk`);
        continue;
      }
      const actual = sha256Of(readFileSync(file));
      if (actual !== sha) errors.push(`${key}: ${entry.path} no longer hashes to its record`);
    }
  }
  if (errors.length) {
    for (const error of errors) console.error(`  ✗ ${error}`);
    process.exit(1);
  }
  console.log(`capture-guide-evidence: ${checked} record(s), every one matches its file.`);
}

const [command, ...rest] = process.argv.slice(2);
const args = parseArgs(rest);

switch (command) {
  case 'record':
    await record(args);
    break;
  case 'classify':
    await classify(args);
    break;
  case 'verify':
    verify();
    break;
  default:
    console.log(readFileSync(fileURLToPath(import.meta.url), 'utf-8').split('\n\n')[0]);
    console.log('\ncommands: record | classify | verify   (see the header of this file)');
    process.exit(command === undefined || command === '--help' ? 0 : 1);
}
