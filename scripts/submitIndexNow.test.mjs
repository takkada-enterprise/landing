import { describe, it, expect, vi } from 'vitest';
import { extractUrlsFromSitemap, submitIndexNow } from './submitIndexNow.mjs';

describe('submitIndexNow', () => {
  it('extracts loc URLs from sitemap XML string', () => {
    const sampleXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://takkada.com/</loc></url>
  <url><loc>https://takkada.com/features/</loc></url>
</urlset>`;

    const urls = extractUrlsFromSitemap(sampleXml);
    expect(urls).toEqual(['https://takkada.com/', 'https://takkada.com/features/']);
  });

  it('supports dryRun mode without making network requests', async () => {
    const result = await submitIndexNow(['https://takkada.com/'], { dryRun: true });
    expect(result.success).toBe(true);
    expect(result.dryRun).toBe(true);
    expect(result.payload.host).toBe('takkada.com');
  });

  it('submits URLs to IndexNow API via custom fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue({ status: 200, ok: true });
    const result = await submitIndexNow(['https://takkada.com/'], { fetch: mockFetch });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.indexnow.org/indexnow',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      })
    );
    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
  });
});
