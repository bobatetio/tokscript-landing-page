# 404 Routing Fix — Dev Notes

## Problem

Any invalid URL (e.g., `/aboutdog`, `/foo/bar/baz`) rendered the full transcript generator landing page with HTTP 200 instead of returning a 404. Root cause: the `[...url]` catch-all route had no validation and intercepted everything.

## What Changed

### 1. `src/app/[...url]/page.js` — URL validation + `notFound()`

Added a regex check after all hooks that validates the URL contains a recognized video platform domain before rendering. If the URL doesn't match, `notFound()` is called.

```js
const urlPath = unwrappedParams?.url?.join("/") || "";
const isVideoUrl =
  /(?:^|[./])(?:tiktok\.com|youtube\.com|youtu\.be|instagram\.com)(?:[/:]|$)/.test(urlPath);
if (!isVideoUrl) {
  notFound();
}
```

**Important constraint:** The `notFound()` call MUST stay after all `useState`/`useEffect`/`useRef` hooks. Moving it earlier breaks React's Rules of Hooks during SPA client-side navigation (fewer hooks rendered than previous render). This is documented in the code comment.

### 2. `src/app/not-found.js` — SEO metadata

Added explicit metadata to prevent 404 pages from inheriting homepage title, canonical URL, OG tags, and hreflang:

```js
export const metadata = {
  title: "Page Not Found | TokScript",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: null },
  openGraph: null,
  twitter: null,
};
```

### 3. Deleted `src/app/404/page.js`

This was a "soft 404" — it showed a 404 UI but returned HTTP 200 because it was a regular Next.js page route. Deleted because:
- The `[lang]` route's `dynamicParams=false` already returns a proper HTTP 404 for `/404` (single-segment path that doesn't match any language slug)
- `src/app/not-found.js` handles the actual 404 rendering with correct HTTP status

## How 404s Work Now

| URL Pattern | Handler | HTTP Status |
|---|---|---|
| Single-segment invalid (e.g., `/aboutdog`) | `[lang]` route rejects via `dynamicParams=false` | 404 |
| Multi-segment invalid (e.g., `/foo/bar/baz`) | `[...url]` catch-all → `notFound()` | 404 |
| Valid video URL (e.g., `/tiktok.com/...`) | `[...url]` catch-all → renders page | 200 |
| `/404` | `[lang]` route rejects (not a valid lang slug) | 404 |

## What We Explicitly Decided NOT to Do

- **Middleware-based validation** — `notFound()` already produces real HTTP 404 via SSR. Verified with `curl`. Middleware would add complexity for no benefit.
- **Moving the check before hooks** — Breaks React Rules of Hooks. Non-negotiable.
- **Redirect from `/404` to `/`** — Unnecessary. `dynamicParams=false` handles it. The old redirect was removed.
- **Query-param URL pattern** (`/?url=...`) — Would break all existing deep links and bookmarks.

## Verification

```bash
curl -s -o /dev/null -w "%{http_code}" localhost:3000/aboutdog     # 404
curl -s -o /dev/null -w "%{http_code}" localhost:3000/foo/bar/baz  # 404
curl -s -o /dev/null -w "%{http_code}" localhost:3000/pricing      # 200
curl -s -o /dev/null -w "%{http_code}" localhost:3000/404          # 404
```

Also verified: 404 page has correct `<title>` and no `<link rel="canonical">`.

## Review Process

This fix went through a 5-round adversarial audit with 3 specialized agents (SEO, Code Quality, Architecture). All 3 voted SHIP unanimously. Full debate transcripts are in the `tasks/` directory.
