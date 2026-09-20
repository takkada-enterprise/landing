// Real screenshots of named page states, so layout is judged by eye and not by
// arithmetic. Chrome is driven through DevTools so below-fold #hash states are
// scrolled into view only after fonts and images have settled.
// Usage: node scripts/shoot.mjs story            (dev server on :5173)
//        node scripts/shoot.mjs all --base http://localhost:4173
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = process.argv.slice(2);
const set = args.find((a) => !a.startsWith('--')) ?? 'all';
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'http://localhost:5173';

const STOPS = ['order', 'bill', 'load', 'send', 'remind', 'recover', 'tally'];
const SETS = {
  home: [['home-top', '/']],
  story: STOPS.map((id) => [`story-${id}`, `/#stop-${id}`]),
  hub: [['hub-top', '/features'], ['hub-sections', '/features#order'], ['hub-mid', '/features#send']],
  // Every feature page, because each one now carries its own screen and the
  // only way to know the right one landed is to look at all 27.
  feature: [
    ['feature-salesman-app-tally', '/salesman-app-tally'],
    ['feature-payment-collection-tally', '/payment-collection-tally'],
    ['feature-payment-reminder-tally', '/payment-reminder-tally'],
    ['feature-e-invoice-from-phone', '/e-invoice-from-phone'],
    ['feature-e-way-bill-from-phone', '/e-way-bill-from-phone'],
    ['feature-tally-reports-on-mobile', '/tally-reports-on-mobile'],
    ['feature-import-purchase-from-pdf', '/import-purchase-from-pdf'],
    ['feature-tally-on-mobile', '/tally-on-mobile'],
    ['feature-outstanding-receivables-on-mobile', '/outstanding-receivables-on-mobile'],
    ['feature-share-ledger-statement-whatsapp', '/share-ledger-statement-whatsapp'],
    ['feature-debtor-ageing-report-on-phone', '/debtor-ageing-report-on-phone'],
    ['feature-tally-on-mobile-without-remote-access', '/tally-on-mobile-without-remote-access'],
    ['feature-send-payment-reminders-automatically', '/send-payment-reminders-automatically'],
    ['feature-bank-statement-import-tally', '/bank-statement-import-tally'],
    ['feature-godown-wise-stock-on-mobile', '/godown-wise-stock-on-mobile'],
    ['feature-multi-company-tally-reports', '/multi-company-tally-reports'],
    ['feature-sales-order-on-mobile', '/sales-order-on-mobile'],
    ['feature-delivery-challan-from-mobile', '/delivery-challan-from-mobile'],
    ['feature-credit-note-from-phone', '/credit-note-from-phone'],
    ['feature-custom-invoice-template-tally', '/custom-invoice-template-tally'],
    ['feature-handwritten-order-to-tally', '/handwritten-order-to-tally'],
    ['feature-order-booking-app-tally', '/order-booking-app-tally'],
    ['feature-biz-analyst-alternative', '/biz-analyst-alternative'],
    ['feature-livekeeping-alternative', '/livekeeping-alternative'],
    ['feature-tally-app-for-fmcg-distributors', '/tally-app-for-fmcg-distributors'],
    ['feature-tally-app-for-pharma-distributors', '/tally-app-for-pharma-distributors'],
    ['feature-tally-app-for-agri-input-distributors', '/tally-app-for-agri-input-distributors'],
  ],
  sheets: [
    ['sheet-loading', '/?sheet=sheet-loading#stop-load'],
    ['sheet-salesman', '/?sheet=sheet-salesman#stop-tally'],
  ],
};
// The same 27 pages scrolled to their story section (walkthrough grid or
// tour), because the cards live below the fold and the hero shot never shows
// them. Layout's useScrollToHash lands on the section id.
SETS.walk = SETS.feature.map(([name, path]) => [
  name.replace(/^feature-/, 'walk-'),
  `${path}${path === '/salesman-app-tally' ? '#tour' : '#walkthrough'}`,
]);
// The in-detail cards on the three import pages (2026-09-20).
SETS.detail = ['import-purchase-from-pdf', 'bank-statement-import-tally', 'handwritten-order-to-tally'].map(
  (slug) => [`detail-${slug}`, `/${slug}#detail`]
);
// The exported sheet on the pages that carry one (2026-09-20).
SETS.sheet = [['sheet-salesman-app-tally', '/salesman-app-tally#sheet']];
SETS.all = [...SETS.home, ...SETS.story, ...SETS.hub, ...SETS.feature, ...SETS.walk, ...SETS.detail, ...SETS.sheet, ...SETS.sheets];

if (!existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);
if (!SETS[set]) throw new Error(`Unknown set "${set}". One of: ${Object.keys(SETS).join(', ')}`);
const outDir = resolve(root, 'shots', set);
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
const profile = mkdtempSync(join(tmpdir(), 'takkada-shoot-'));
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--user-data-dir=${profile}`, '--remote-debugging-port=0', 'about:blank',
], { stdio: 'ignore' });

async function devtoolsPort() {
  const activePort = join(profile, 'DevToolsActivePort');
  for (let n = 0; n < 100; n += 1) {
    if (existsSync(activePort)) return readFileSync(activePort, 'utf8').split('\n')[0];
    await sleep(50);
  }
  throw new Error('Chrome DevTools port did not become ready');
}

async function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    ws.addEventListener('open', resolveOpen, { once: true });
    ws.addEventListener('error', rejectOpen, { once: true });
  });

  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const waiter = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) waiter.reject(new Error(message.error.message));
      else waiter.resolve(message.result);
      return;
    }
    const queue = events.get(message.method);
    if (queue?.length) queue.shift()(message.params);
  });

  return {
    close: () => ws.close(),
    send(method, params = {}) {
      const messageId = ++id;
      return new Promise((resolveSend, rejectSend) => {
        pending.set(messageId, { resolve: resolveSend, reject: rejectSend });
        ws.send(JSON.stringify({ id: messageId, method, params }));
      });
    },
    event(method) {
      return new Promise((resolveEvent) => {
        if (!events.has(method)) events.set(method, []);
        events.get(method).push(resolveEvent);
      });
    },
  };
}

async function shoot(port, name, path, w, h) {
  const url = `${base}${path}`;
  const target = await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent('about:blank')}`, {
    method: 'PUT',
  }).then((response) => response.json());
  const client = await cdp(target.webSocketDebuggerUrl);
  try {
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: w, height: h, deviceScaleFactor: 1, mobile: false,
    });
    const loaded = client.event('Page.loadEventFired');
    await client.send('Page.navigate', { url });
    await loaded;
    await client.send('Runtime.evaluate', {
      expression: 'document.fonts.ready',
      awaitPromise: true,
    });
    if (path.includes('#')) {
      const id = path.slice(path.indexOf('#') + 1);
      const result = await client.send('Runtime.evaluate', {
        expression: `new Promise((resolve) => {
          let attempts = 0;
          const scroll = () => {
            const el = document.getElementById(${JSON.stringify(id)});
            if (el) { el.scrollIntoView({ behavior: 'instant', block: 'start' }); resolve(true); }
            else if (attempts++ < 100) setTimeout(scroll, 50);
            else resolve(false);
          };
          scroll();
        })`,
        awaitPromise: true,
        returnByValue: true,
      });
      if (result.exceptionDetails || !result.result.value) throw new Error(`Could not scroll to #${id}`);
      await sleep(500);
    }
    await client.send('Runtime.evaluate', {
      expression: `Promise.race([
        Promise.all([...document.images].map((img) => {
          img.loading = 'eager';
          return img.decode().catch(() => {});
        })),
        new Promise((resolve) => setTimeout(resolve, 5000)),
      ])`,
      awaitPromise: true,
    });
    // decode() means the bitmap is ready, NOT that the compositor has rastered
    // the layer it goes in. captureScreenshot({fromSurface:true}) reads the
    // surface, so without this a hero image that decoded a frame too late came
    // out as bare background - and did it deterministically, which is what made
    // it look like a page bug. Two frames past the decode, then a settle.
    await client.send('Runtime.evaluate', {
      expression: `new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )`,
      awaitPromise: true,
    });
    await sleep(400);
    const { data } = await client.send('Page.captureScreenshot', {
      format: 'png', fromSurface: true, captureBeyondViewport: false,
    });
    const out = resolve(outDir, `${name}-${w}.png`);
    rmSync(out, { force: true });
    writeFileSync(out, Buffer.from(data, 'base64'));
    console.log(out);
  } finally {
    client.close();
    await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`);
  }
}

try {
  const port = await devtoolsPort();
  for (const [name, path] of SETS[set]) {
    for (const [w, h] of [[1440, 900], [390, 844]]) await shoot(port, name, path, w, h);
  }
} finally {
  if (chrome.exitCode === null) {
    const exited = new Promise((resolveExit) => chrome.once('exit', resolveExit));
    chrome.kill('SIGKILL');
    await exited;
  }
  rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 50 });
}
