# Linear Card Update: YouTube URL Migration

**Status:** Done
**Branch:** `homeupdates2`
**Date completed:** March 2, 2026

---

## Summary

Migrated YouTube page URL from `/youtube-shorts-transcript` to `/youtube-transcript-generator`. Follows the same pattern as the completed Instagram migration. All internal links, redirects, metadata, sitemap, locale files, and on-page SEO updated. Zero broken links, zero redirect chains.

---

## Completed

### Route Migration
- New canonical route at `/youtube-transcript-generator` with updated metadata (title, description, canonical, OG, Twitter, JSON-LD schema)
- 308 permanent redirects: `/youtube-shorts` and `/youtube-shorts-transcript` both redirect directly to `/youtube-transcript-generator` (single hop, no chain)
- Old route directories and stub files deleted

### Metadata
- Title: "YouTube Transcript Generator - Free AI Tool | TokScript" (55 chars)
- Description: "Generate accurate transcripts from YouTube Shorts and videos instantly. Free AI-powered tool to convert YouTube video to text in seconds." (139 chars)
- JSON-LD: BreadcrumbList, WebApplication, FAQPage (14 entries, unchanged)

### On-Page SEO
- Promoted 2 H3 headings to H2 for better heading hierarchy
- H2 #1: "How to Transcribe YouTube Videos"
- H2 #2: "YouTube Shorts Transcript Generator" (retains secondary keyword)
- Updated ShareBar URL and share text
- SEO config: title and keywords updated, "youtube transcript generator" now primary keyword

### Internal Links (7 occurrences across 4 source files)
- HomePage.js (2 links)
- about-us/PageData.js (3 links)
- pricing/PageData.js (1 link)
- Instagram LandingPage.js cross-link (1 link)

### Footer + Navigation
- Footer href and display text updated across all 12 locale files
- Localized labels: EN, AR, BR, DE, ES, FR, HI, JA, KO, RU, TR, ZH

### Sitemap + LLMs
- sitemap.js updated
- llms.txt and llms-full.txt updated (URL + label)

### Content Fixes (Bonus)
- Removed 4 em dashes from YouTube config.js feature lists
- Fixed "Bard" -> "Gemini" in both YouTube and Instagram config.js (Google rebranded Bard to Gemini)

---

## Verification (All Passed)

- `/youtube-shorts` -> 308 -> `/youtube-transcript-generator`
- `/youtube-shorts-transcript` -> 308 -> `/youtube-transcript-generator`
- `/youtube-transcript-generator` -> 200, correct title + canonical
- `/instagram-transcript-generator` -> 200, not broken
- Sitemap: new URL present, old URL gone
- Codebase grep: zero remaining old URL references
- Dev server: clean compile, no errors

---

## Files Changed: 27 total

1 created, 3 deleted, 23 modified. Full file list in `tasks/yt-migration-dev-handoff.md`.

---

## Post-Deploy (Manual Steps Required)

- Submit new URL to GSC URL Inspection
- Submit updated sitemap in GSC
- Run Rich Results Test on new URL
- Check GTM (GTM-M29738MG) for triggers on old path
- Check Plausible for custom goals on old path
- Monitor crawl errors for 2 weeks
