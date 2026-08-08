# Measurement log

One row per weekly read. The procedure is in `measurement-loop.md`. Keep the rows even when the numbers are flat, because the shape of the trend is the whole point and a gap in the series is worse than a boring row.

Numbers only. Anything that needs explaining goes in Notes underneath the table, dated.

## Weekly reads

| Week of | Clarity: feature pages in top entries | Clarity: ChatGPT sessions | Clarity: other AI referrers | GSC impressions, all feature URLs | GSC clicks, all feature URLs | Feature URLs indexed / 21 | Demo requests | audit:crawlers |
|---|---|---|---|---|---|---|---|---|
| 2026-07-26 | 0 | 13 | 0 | — | — | 0 / 21 | — | door half shut |
| 2026-08-08 | — | — | — | — | — | — | — | pass, both arms |

**2026-07-26** is the pre-work baseline, carried from the Clarity read the plan was built on. Feature pages did not exist yet, so the 0 in column two is definitional, not a result. The 13 ChatGPT sessions were arriving while Cloudflare's managed robots.txt still disallowed ClaudeBot, GPTBot, Google-Extended and Applebot-Extended, which is the number worth beating.

**2026-08-08** is the day all 21 pages went live (Phases 2 to 4, PRs #66, #70, #71). Dashboard columns are blank because the URLs were hours old and nothing had been crawled. `audit:crawlers` passed both arms against the live site: Googlebot baseline served, all four AI-search bots served, and all eight required crawlers reading `Allow: /` from our own robots.txt after the operator switched Cloudflare's managed file off the same evening. Content freshness the same day: 191 items, 176 fresh, 15 ageing, 0 stale, 0 undated.

The first read with real search data is the week of 2026-08-15 at the earliest. Google needs to crawl and index 21 new URLs first, and "Discovered, currently not indexed" for a week or two on a batch this size is normal rather than a failure.

## Quarterly refreshes

| Date | Items refreshed | Bucket before | Bucket after | Notes |
|---|---|---|---|---|
| — | — | — | — | first refresh due when the ageing bucket stops being all 2026-04/05 blog posts |

As of 2026-08-08 the 15 ageing items are all blog posts from 2026-04-23 to 2026-05-06, none stale, none undated. Nothing is due yet.
