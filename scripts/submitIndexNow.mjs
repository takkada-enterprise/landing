import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOST = 'takkada.com';
const KEY = '8b2d41f3e79040aa912e58c381da22bf';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = resolve(repoRoot, 'dist/sitemap.xml');

export function extractUrlsFromSitemap(xmlContent) {
  const matches = xmlContent.match(/<loc>(https?:\/\/[^<]+)<\/loc>/g) || [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim());
}

export async function submitIndexNow(urls, options = {}) {
  const fetchFn = options.fetch || globalThis.fetch;
  if (!urls || urls.length === 0) {
    return { success: false, message: 'No URLs provided' };
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  if (options.dryRun) {
    return { success: true, dryRun: true, count: urls.length, payload };
  }

  try {
    const res = await fetchFn(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    // IndexNow returns 200, 202 (accepted), or 204
    const success = res.status >= 200 && res.status < 300;
    return { success, status: res.status, count: urls.length };
  } catch (error) {
    return { success: false, error: error?.message || String(error) };
  }
}

async function main() {
  if (!existsSync(sitemapPath)) {
    console.error(`submitIndexNow: dist/sitemap.xml not found. Run generate-sitemap.mjs first.`);
    process.exit(1);
  }

  const xmlContent = readFileSync(sitemapPath, 'utf-8');
  const urls = extractUrlsFromSitemap(xmlContent);

  console.log(`submitIndexNow: Submitting ${urls.length} URLs to IndexNow (${INDEXNOW_ENDPOINT})...`);
  const result = await submitIndexNow(urls);

  if (result.success) {
    console.log(`submitIndexNow: Successfully submitted ${urls.length} URLs (HTTP ${result.status || 200}).`);
  } else {
    console.warn(`submitIndexNow: Submission warning/failed: ${result.error || `HTTP ${result.status}`}`);
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
