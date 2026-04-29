# Adversarial Audit: Feature Pages URL Migration

## What Was Changed
4 root-level feature pages moved under /features/, 1 page deleted (redirect to /), new /features hub page created, all references updated.

### URL Mapping
| Old URL | New URL | Redirect |
|---------|---------|----------|
| /tiktok-transcript-generator | / | 301 permanent |
| /bulk-tiktok-transcript | /features/bulk-import | 301 permanent |
| /tiktok-collection-downloader | /features/collection-import | 301 permanent |
| /tiktok-video-downloader | /features/hd-downloads | 301 permanent |

### Files Modified
- next.config.mjs (4 redirects)
- src/data/features.js (4 path updates)
- src/app/sitemap.js (URLs updated, hub added, priorities bumped)
- public/llms.txt (old URLs replaced)
- public/llms-full.txt (old URLs replaced)
- src/components/Footer.jsx (Features link: /#how-it-works -> /features)
- src/app/not-found.js (Explore Features link: /features/chrome-extension -> /features)
- src/App.scss (.ts-features-hub SCSS block added)

### Files Created
- src/app/features/page.js (hub page, server component)
- src/app/features/bulk-import/page.js + PageData.js
- src/app/features/collection-import/page.js + PageData.js
- src/app/features/hd-downloads/page.js + PageData.js

### Files Deleted
- src/app/tiktok-transcript-generator/ (entire directory)
- src/app/bulk-tiktok-transcript/ (entire directory)
- src/app/tiktok-collection-downloader/ (entire directory)
- src/app/tiktok-video-downloader/ (entire directory)

## Critical Areas to Audit

### SEO Attack Surface
1. Redirect chains: old URL -> new URL, but any internal link still pointing to old URL causes double redirect
2. Canonical mismatches: canonical URL in metadata must EXACTLY match the served URL
3. Sitemap completeness: no orphan pages, no missing entries, no duplicate entries
4. Link equity preservation: 301s must be permanent, not 302/307
5. Keyword cannibalization: /tiktok-transcript-generator redirecting to / could be fine or could cause issues
6. Internal linking: any component, page, or data file that still references old URLs
7. hreflang/language pages: do any translation files or language pages reference old feature URLs?
8. Schema/JSON-LD: does any structured data reference old URLs?
9. External backlinks: old URLs with inbound links need permanent redirects (confirmed)
10. Google Search Console: impact of URL changes on existing indexed pages

### Technical Attack Surface
1. PageData.js files: do they contain self-referential URLs or links to other feature pages using old paths?
2. [...url] catch-all route: could it intercept /features/* before the actual route handles it?
3. Hub page: server component importing client-side features data - any issues?
4. Header.jsx: reads from features.js - does the dropdown handle path="/" correctly for transcript-generator?
5. SCSS conflicts: does .ts-features-hub conflict with any existing styles?
6. Build output: verify all routes in build output match expectations
7. Import paths: do any other files import from the deleted directories?
8. Next.js routing: does features/page.js conflict with features/[slug]/page.js pattern (if any)?
9. Metadata: do all new pages have complete metadata (title, description, keywords, canonical, OG)?
10. Component imports: do PageData.js files import components that reference old paths?

## Debate Structure
- Round 1: Independent audit
- Round 2: Cross-examination
- Round 3: Deep dive on critical findings
- Round 4: Final arguments
- Round 5: Judge verdict
