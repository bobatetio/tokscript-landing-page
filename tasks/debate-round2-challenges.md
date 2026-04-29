# Round 2 — Cross-Examination Challenges

## Live Test Results (verified via curl)
| URL | Status | Caught By |
|-----|--------|-----------|
| `/aboutdog` | 404 | `[lang]` dynamicParams=false |
| `/foo/bar/baz` | 404 | `[...url]` notFound() check |
| `/randomgibberish/with/slashes` | 404 | `[...url]` notFound() check |
| `/https:notaurl/foo` | 404 | HTTP layer/Next.js normalization |
| `/tiktok.com/@user/video/123` | 500 | Regex allows, component fails |
| `/youtube.com/shorts/abc` | 500 | Regex allows, component fails |
| `/features/nonexistent-page` | 404 | Feature routes handle this |
| `/pricing` | 200 | Static route works |

## Challenge for SEO Adversary
Your CRITICAL #1 (not-found.js missing metadata) is the strongest finding. Two questions:
1. In Next.js App Router, can `not-found.js` even export metadata? The docs only mention page.js and layout.js supporting metadata exports. If not-found.js can't export metadata, what's the workaround?
2. You said the pre-fix crawl damage needs Search Console audit. Quantify the realistic risk — how many garbage URLs would Googlebot have actually discovered and indexed? If there are no external broken links pointing to the site, is this concern real or theoretical?

## Challenge for Code Adversary
Your finding about `[lang]` catching single-segment paths is CONFIRMED — `/aboutdog` returns 404 via `[lang]` not `[...url]`. This means the fix is defense-in-depth for multi-segment paths only.
1. The `^https?:` false positive concern: `/https:notaurl/foo` returned 404 in practice despite matching the regex. Investigate why — is the HTTP layer or Next.js normalizing colon-containing paths before they reach the component?
2. You said `notFound()` works fine during SSR. The architecture adversary said it DOESN'T. One of you is wrong. Defend your position with Next.js App Router specifics.
3. The component currently returns 500 for valid video patterns (tiktok.com/...) when accessed without proper protocol. Is THIS a bigger bug than the 404 issue?

## Challenge for Architecture Adversary
1. YOUR CENTRAL CLAIM IS WRONG. You said `notFound()` in a client component "cannot produce a true server-side HTTP 404." I tested with curl (no JavaScript execution) and got HTTP 404. Next.js SSR renders client components on the server. The throw during SSR IS caught by Next.js. Retract or explain.
2. Your middleware proposal has a HUGE maintenance problem: the negative-lookahead matcher regex must be updated every time a new route is added. That's MORE fragile than the current approach. Defend this.
3. You said the file is 2068 lines. But for SSR 404 cases, the component throws during render before any useEffect fires. Client-side JS bundle size is irrelevant for bot crawlers doing direct HTTP requests. How bad is this REALLY for performance?
