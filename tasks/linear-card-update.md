# Linear Card Update: Instagram URL Migration

**Copy this into the Linear card as a status update / completion comment.**

---

## Status: Done

### Summary

Migrated the Instagram landing page from `/instagram-reels-transcript` to `/instagram-transcript-generator` to target broader search keyword volume. Both old URLs (`/instagram-reels` and `/instagram-reels-transcript`) now 301/308 redirect to the new canonical.

### What was done

**Route migration**
- Created new route at `/instagram-transcript-generator` with full SEO metadata
- Set up permanent redirects from both old URLs (no redirect chains)
- Deleted old route files

**Metadata overhaul**
- Title: `Instagram Transcript Generator - Free AI Tool | TokScript`
- Description: `Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text. Bulk process up to 50 videos.`
- Canonical, OG, Twitter cards all point to new URL
- JSON-LD schema updated (BreadcrumbList, WebApplication, FAQPage)

**On-page SEO**
- Promoted H3 to H2 for "Instagram Reels Transcript & Download Platform" (retains secondary keyword)
- Removed "#1" unverifiable claim from that heading
- Updated config.js SEO title and keyword ordering ("instagram transcript generator" now primary)

**Internal links updated (10 locations across 7 files)**
- HomePage.js (2 links)
- about-us/PageData.js (3 links)
- pricing/PageData.js (1 link)
- Footer.jsx (link + display text)
- sitemap.js
- llms.txt + llms-full.txt

**Copy cleanup**
- Fixed 4 em dash violations in config.js feature lists
- Updated ShareBar share text (removed em dash, updated URL)

### What was NOT changed
- Page design/layout (zero visual changes)
- FAQ content (all 14 entries stay Reels-scoped, accurate)
- H1 headline (already says "Instagram Transcript Generator")
- Template folder name (`src/templates/instagram-reels/` stays as-is)

### Files touched (13 total)
1. `src/app/instagram-transcript-generator/page.js` (created)
2. `src/app/instagram-reels-transcript/` (deleted)
3. `src/app/instagram-reels/page.js` (deleted)
4. `next.config.mjs`
5. `src/app/sitemap.js`
6. `src/components/Footer.jsx`
7. `src/app/HomePage.js`
8. `src/app/about-us/PageData.js`
9. `src/app/pricing/PageData.js`
10. `src/templates/instagram-reels/LandingPage.js`
11. `src/templates/instagram-reels/config.js`
12. `public/llms.txt`
13. `public/llms-full.txt`

### Verification
- Both old URLs return 308 redirect to new URL
- New page returns 200 with correct title, canonical, and OG tags
- Sitemap contains new URL with zero old references
- Zero stale `/instagram-reels-transcript` references remaining in codebase
- Build passes, dev server loads clean

### Post-deploy action items
- Submit new URL to GSC URL Inspection
- Resubmit sitemap in GSC
- Check GTM triggers and Plausible goals for old path references
- Monitor crawl errors on old URL for 2 weeks
- Run Google Rich Results Test on new URL to confirm schema
