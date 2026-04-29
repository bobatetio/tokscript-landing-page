# Round 3 — Proposed Fix Set

Based on 2 rounds of adversarial analysis, here are the exact changes to be made:

## Fix 1: Add metadata to `not-found.js`
```js
// Add at top of file, after imports:
export const metadata = {
  title: "Page Not Found | TokScript",
  description: "The page you're looking for doesn't exist.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {},  // Empty to prevent inheriting root layout's canonical/hreflang
};
```
**Rationale**: SEO adversary confirmed Next.js reads metadata from not-found.js modules. Without this, every 404 inherits the homepage title, canonical, and OG tags.

## Fix 2: Delete `src/app/404/page.js`
Remove the file entirely. Add a redirect in `next.config.mjs` as insurance:
```js
{ source: '/404', destination: '/', permanent: true },
```
**Rationale**: HTTP 200 with "Page Not Found" content is a soft 404. No internal code references this route. The redirect handles any external links.

## Fix 3: Tighten the regex in `[...url]/page.js`
Replace:
```js
const isVideoUrl =
  /^https?:/.test(urlPath) ||
  /tiktok\.com|youtube\.com|youtu\.be|instagram\.com|vm\.tiktok\.com/.test(urlPath);
```
With:
```js
const isVideoUrl =
  /(?:^|[./])(?:tiktok\.com|youtube\.com|youtu\.be|instagram\.com)(?:[/:]|$)/.test(urlPath);
```
**Changes**:
- Removes `^https?:` — any valid video URL already contains a recognized domain
- Removes redundant `vm\.tiktok\.com` (already matched by `tiktok\.com`)
- Adds boundary checks so `notiktok.com` doesn't match (domain must be preceded by start-of-string, `.`, or `/`)
- Adds trailing boundary (must be followed by `/`, `:`, or end-of-string)

## Fix 4: Keep `notFound()` placement after all hooks (NO CHANGE)
Code adversary proved this is the only correct position. Moving it earlier breaks Rules of Hooks during SPA navigation.

## Fix 5: Add code comment explaining the placement
```js
// NOTE: This check must remain AFTER all hooks. Moving it earlier would violate
// React's Rules of Hooks during SPA navigation (fewer hooks than previous render).
// For single-segment invalid paths (e.g., /aboutdog), the [lang] route's
// dynamicParams=false handles 404 before this catch-all is reached.
```

## NOT doing (and why):
- **Middleware**: Not a correctness issue. `notFound()` produces real HTTP 404s. Middleware would be a performance optimization only — not worth the maintenance cost of route enumeration.
- **Moving the check earlier**: Violates Rules of Hooks.
- **Splitting into server/client components**: Unnecessary complexity given `notFound()` works during SSR.
- **Changing URL pattern to query params**: Too disruptive (breaks existing deep links).

## Questions for Round 3 critique:
1. Is `alternates: {}` sufficient to prevent canonical inheritance, or do we need `alternates: { canonical: null }`?
2. Should the 301 redirect for `/404` go to `/` or should it just not exist (no redirect)?
3. Does the tightened regex handle all valid video URL formats?
4. Anything else missed?
