# 404 Routing Fix — Shipped

## Summary

Fixed a bug where any invalid URL on the site (e.g., `/aboutdog`, `/foo/bar/baz`) returned HTTP 200 with the full transcript generator page instead of a proper 404. This was an SEO and UX issue: search engines were indexing garbage URLs as duplicate content, and users hitting broken links saw a confusing page instead of a clear error.

## What Was Done

- Added URL validation to the `[...url]` catch-all route. Invalid URLs now return HTTP 404 with our custom 404 page.
- Deleted the old `/404` page route that was serving a "soft 404" (showed error UI but returned HTTP 200 to search engines).
- Added SEO metadata to the 404 page: `noindex` directive, no canonical URL, no OG tags, no hreflang. Prevents search engines from treating 404 pages as indexable content.
- Tightened the video URL regex to only accept recognized platforms (TikTok, YouTube, Instagram) with proper domain boundary checks.

## Verification

All invalid URLs now return HTTP 404. Valid pages (homepage, pricing, features, video URLs) are unaffected.

## Technical Notes

The URL check is intentionally placed after React hooks in the component. This is a React constraint (Rules of Hooks) that cannot be changed without breaking client-side navigation. Documented in code comments and LEARNING.md.

## Branch

`homeupdates2` — commit `7fee1f3`
