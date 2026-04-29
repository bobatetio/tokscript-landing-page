# 404 Routing Fix — Adversarial Debate Document

## The Fix Under Review
We added a `notFound()` check to `src/app/[...url]/page.js` (the catch-all route) so that URLs not matching a video pattern trigger Next.js's `not-found.js` 404 page.

### Code Changed (src/app/[...url]/page.js)
```js
// Added to imports:
import { useRouter, notFound } from "next/navigation";

// Added before the return statement (after all hooks):
const urlPath = unwrappedParams?.url?.join("/") || "";
const isVideoUrl =
  /^https?:/.test(urlPath) ||
  /tiktok\.com|youtube\.com|youtu\.be|instagram\.com|vm\.tiktok\.com/.test(urlPath);
if (!isVideoUrl) {
  notFound();
}
```

## Existing 404 Infrastructure
1. `src/app/not-found.js` — Next.js auto 404 handler (NO metadata export, inherits root layout metadata)
2. `src/app/404/page.js` — Explicit `/404` route with metadata (`title: "Page Not Found | TokScript"`, `robots: { index: false }`)
3. Root `layout.js` metadata title: "TokScript - Video Transcript Downloader..."

## Routing Structure
- Static routes: `/`, `/about-us`, `/pricing`, `/features/*`, `/contact`, etc.
- Dynamic: `[lang]` with `dynamicParams = false` (only br, es, zh, fr, hi, ar, de, ja, ko, ru, tr)
- Catch-all: `[...url]` — handles video deep links like `/https://tiktok.com/@user/video/123`
- Redirects in `next.config.mjs` for old URLs

## Known Concerns to Investigate
1. SEO: Does `not-found.js` return proper 404 HTTP status? (confirmed 404 via curl)
2. SEO: `not-found.js` has NO metadata — title tag will be wrong for 404 pages
3. SEO: `src/app/404/page.js` returns HTTP 200 when visited directly — classic soft 404
4. Code: Is `notFound()` safe in a "use client" component after hooks?
5. Code: What URL patterns might slip through or get false-positived?
6. Architecture: The catch-all loads massive imports even for 404s
7. Architecture: Should middleware handle this instead?

---

## ROUND 1 — Initial Adversarial Analysis

### SEO Adversary Findings
(pending)

### Code Adversary Findings
(pending)

### Architecture Adversary Findings
(pending)
