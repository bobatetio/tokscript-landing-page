what h# Stage 2 Master Plan — Title/Description Rewrites

**Created:** 2026-02-09
**Status:** AWAITING USER APPROVAL
**Context:** Based on 6 months of Google Search Console data (Aug 8, 2025 – Feb 7, 2026) and Google Analytics data

---

## Executive Summary

tokscript.com is a **one-page SEO machine**. The homepage accounts for 98.7% of all organic clicks (305,233 of 309,000). Pages B–E (Pricing, API, Integration, Contact) combined account for 553 clicks in 6 months — they exist purely as branded sitelinks with negligible organic value.

**Bottom line:** B–E are safe to change without hesitation. The homepage is the only page that requires surgical precision.

---

## Site-Wide Performance Baseline (6 months)

| Metric | Value |
|--------|-------|
| Total clicks | 309,000 |
| Total impressions | 943,000 |
| Average CTR | 32.7% |
| Average position | 8.0 |
| Indexed pages | 67 |
| Not indexed | 77 (38 crawled-not-indexed, 13 alternate canonical, 12 redirects, 9 noindex, 4x 404s, 1 duplicate canonical) |
| Sitemap status | 1 submitted, 8 discovered pages (will update after Stage 1 deploys with 17-URL dynamic sitemap) |

---

## Page-by-Page Analysis & Decisions

---

### PAGE A: Homepage (/) — MODIFY WITH EXTREME CARE

#### Current Performance

| Metric | Value |
|--------|-------|
| Clicks (6mo) | 305,233 |
| Impressions | 888,559 |
| CTR | 34.4% |
| Avg Position | 8.2 |
| GA Views (28d) | 84,124 |
| GA Active Users (28d) | 32,537 |
| Bounce Rate | 70.3% |
| Avg Engagement | 27s |

#### Top 10 Ranking Queries

| Query | Clicks | Impressions | CTR | Position |
|-------|--------|-------------|-----|----------|
| tiktok transcript | 60,601 | 99,573 | 60.9% | 1.3 |
| tokscript | 41,758 | 52,905 | 78.9% | 1.2 |
| tiktok transcript generator | 23,723 | 38,732 | 61.2% | 1.3 |
| tiktok script | 9,491 | 21,084 | 45.0% | 1.3 |
| tiktok video transcript | 7,477 | 13,173 | 56.8% | 1.3 |
| tiktok script extractor | 7,313 | — | — | — |
| tok script | 7,184 | — | — | — |
| tiktok to transcript | 6,480 | — | — | — |
| transcript tiktok | 6,399 | — | — | — |
| tiktok script generator | 4,994 | — | — | — |

#### Risk Assessment: HIGH

- This page IS the business — 98.7% of all organic traffic
- Ranks #1 for virtually every query
- CTR of 34.4% (with individual query CTRs of 45%–79%) is exceptional
- Despite the 88-char title being truncated in SERPs, it clearly works
- Root layout change also bleeds into /instagram-reels and /youtube-shorts

#### Keyword Analysis

**Keywords in current title:** "Video Transcript Downloader", "TikTok", "Reels", "Shorts", "Transcripts"
**Keywords in original proposal:** "TikTok Transcript Generator", "Free AI", "Video to Text", "TokScript"

**Critical issues with original proposal:**
1. DROPS "Reels" and "Shorts" — current broad coverage matches how users search
2. DROPS "Downloader" — "tiktok script downloader" drives 2,160 clicks
3. Narrows to "TikTok" only, losing multi-platform positioning

**What the original proposal gets RIGHT:**
1. Adds "Generator" — your #3 query with 23,723 clicks
2. Adds "Free" — proven CTR booster in SERPs
3. Shorter (69 chars vs 88) — less truncation in SERPs

#### Three Title Options

| Option | Title | Chars | Notes |
|--------|-------|-------|-------|
| **A1: Keep current** | `TokScript - Video Transcript Downloader for TikTok, Reels & Shorts Transcripts Instantly` | 88 | Safe but truncated. Working great despite truncation. |
| **A2: Original proposal** | `TikTok Transcript Generator — Free AI Video to Text Tool \| TokScript` | 69 | Drops Reels/Shorts/Downloader. Risky. |
| **A3: Modified (RECOMMENDED)** | `TikTok Transcript Generator — Free Video to Text \| TokScript` | 59 | Fits SERP display. Preserves #1 and #3 queries. Adds "Free". |

#### Recommended Description (for A3)

**Current:**
```
Download Transcripts, HD Videos & Cover Images, Bulk export from TikTok, Reels, and Shorts Instantly. Plus use our AI viral script generator hook writer analyzer.
```

**Proposed:**
```
Generate TikTok transcripts instantly. Free AI tool that converts TikTok, Instagram Reels & YouTube Shorts to text. Bulk export, HD downloads. Used by 41,000+ creators.
```

**Why:** Preserves Reels & Shorts coverage in the description (even though they leave the title). Adds social proof. Removes keyword-stuffed "viral script generator hook writer analyzer" gibberish.

#### PREREQUISITE: Per-Page Metadata Overrides

Before touching the homepage title, we MUST add metadata exports to these two files so they stop inheriting from root layout:

- `src/app/instagram-reels/page.js` — needs its own title/description
- `src/app/youtube-shorts/page.js` — needs its own title/description

Both are currently `"use client"` with no metadata. They'll need either:
- A wrapper `layout.js` in their folder with metadata, OR
- Conversion to server component that delegates to a client PageData component (pattern used by pricing/contact pages)

**Suggested metadata for instagram-reels:**
```js
title: "Instagram Reels Transcript Generator — Free Video to Text | TokScript"
description: "Download Instagram Reels transcripts instantly. Free AI tool to convert any Reel to text. Bulk export, HD downloads, cover images. No signup required."
```

**Suggested metadata for youtube-shorts:**
```js
title: "YouTube Shorts Transcript Generator — Free Video to Text | TokScript"
description: "Download YouTube Shorts transcripts instantly. Free AI tool to convert any Short to text. Bulk export, HD downloads, cover images. No signup required."
```

#### Files Affected (Homepage Change)

| File | What Changes |
|------|-------------|
| `src/app/layout.js` | title, description, openGraph.title, openGraph.description, twitter.title, twitter.description |
| `src/app/instagram-reels/page.js` | NEW: Add metadata export (prerequisite) |
| `src/app/youtube-shorts/page.js` | NEW: Add metadata export (prerequisite) |

---

### PAGE B: Pricing (/pricing) — APPROVE AS-IS

#### Current Performance

| Metric | Value |
|--------|-------|
| Clicks (6mo) | 436 |
| Impressions | 88,280 |
| CTR | 0.5% |
| Avg Position | 2.5 |
| GA Views (28d) | 1,310 |
| GA Active Users (28d) | 917 |
| Bounce Rate | 22.0% |
| Avg Engagement | 47s |

#### Top Queries: 100% branded ("tokscript", "tok script", "tokscript instagram", etc.)

#### Risk: NEGLIGIBLE

- 436 clicks in 6 months = ~2.4/day
- 0.5% CTR at position 2.5 is extremely poor
- Page itself converts well (22% bounce, 47s engagement) — the problem is nobody clicks through
- Zero non-branded traffic. Nothing to protect.

#### Change

| | Current | New |
|---|---------|-----|
| **Title** | `Pricing \| TokScript` | `TokScript Pricing — Free Plan + Pro from $3.25/mo \| Start Free Today` |
| **Description** | `Choose the right plan for your TikTok, Instagram, and YouTube transcription needs. Flexible pricing for creators, teams, and enterprises.` | `Free: 5 transcripts/day forever. Pro: Unlimited transcripts from $39/year ($3.25/mo). 3 AI agents, bulk import, HD downloads. 41,000+ creators. Cancel anytime.` |

**Also update:** openGraph and twitter objects in same file (added in Stage 1) to match new title/description.

---

### PAGE C: API (/api) — APPROVE AS-IS

#### Current Performance

| Metric | Value |
|--------|-------|
| Clicks (6mo) | 66 |
| Impressions | 29,876 |
| CTR | 0.2% |
| Avg Position | 1.2 |
| GA Views (28d) | 25 |
| GA Active Users (28d) | 21 |
| Avg Engagement | 18s |

#### Top Queries: 100% branded ("tokscript", "tokscript tiktok", "tokscript ai", etc.)

#### Risk: NEGLIGIBLE

- 66 clicks in 6 months = ~0.4/day
- 0.2% CTR is catastrophic — page appears in branded results but nobody clicks
- Zero developer-intent traffic. New title could potentially attract some.

#### Change

| | Current | New |
|---|---------|-----|
| **Title** | `API Access \| TokScript` | `TikTok Transcript API — Developer Docs & Pricing \| TokScript` |
| **Description** | `Integrate TokScript's AI transcription into your apps. Scalable and developer-friendly API for TikTok, Instagram, and YouTube video transcripts.` | `TokScript API: Get video transcripts programmatically. REST API for TikTok, Instagram, YouTube. Free tier available. Full documentation and code examples.` |

**Also update:** openGraph and twitter objects in same file to match.

---

### PAGE D: Integration (/integration) — APPROVE AS-IS

#### Current Performance

| Metric | Value |
|--------|-------|
| Clicks (6mo) | 28 |
| Impressions | 45,113 |
| CTR | 0.1% |
| Avg Position | 1.2 |
| GA Views (28d) | 13 |
| GA Active Users (28d) | 12 |
| Avg Engagement | 7s |

#### Top Queries: 100% branded

#### Risk: NEGLIGIBLE

- 28 clicks in 6 months — worst performing page
- 0.1% CTR — worst CTR of all pages
- 7-second avg engagement — people leave almost immediately (page content itself may need work)

#### Change

| | Current | New |
|---|---------|-----|
| **Title** | `Integrations \| TokScript` | `TokScript Integrations — Chrome Extension, Zapier, Notion & More` |
| **Description** | `Connect TokScript with your favorite tools. Streamline your TikTok, Instagram, and YouTube transcription workflow with smart integrations.` | `Export transcripts to Notion or Google Sheets. Automate with Zapier. Chrome extension for one-click transcript downloads while browsing TikTok. Works everywhere.` |

**Also update:** openGraph and twitter objects in same file to match.

---

### PAGE E: Contact (/contact) — APPROVE AS-IS

#### Current Performance

| Metric | Value |
|--------|-------|
| Clicks (6mo) | 23 |
| Impressions | 44,040 |
| CTR | 0.1% |
| Avg Position | 1.1 |
| GA Views (28d) | 17 |
| GA Active Users (28d) | 15 |
| Avg Engagement | 27s |

#### Top Queries: 100% branded

#### Risk: NEGLIGIBLE

- 23 clicks in 6 months
- 0.1% CTR

#### Change

| | Current | New |
|---|---------|-----|
| **Title** | `Contact Us \| TokScript` | `Contact TokScript — Support, Partnerships & Enterprise Inquiries` |
| **Description** | `Get in touch with TokScript for support, partnerships, or general inquiries about TikTok, Instagram, and YouTube transcription services.` | `Get help with TokScript. support@tokscript.com for questions (response within 24 hours). business@tokscript.com for partnerships and enterprise pricing.` |

**Note:** Including email addresses in meta description is a double-edged sword — increases spam risk but makes SERP listing more actionable. User should decide if they want the emails in the description or prefer a version without them.

**Also update:** openGraph and twitter objects in same file to match.

---

## Execution Plan

### Step 1: Prerequisites (MUST do first)

Add per-page metadata to `/instagram-reels` and `/youtube-shorts` so they stop inheriting from root layout. This is required BEFORE touching the homepage title.

**Files:**
- `src/app/instagram-reels/page.js` — add metadata export
- `src/app/youtube-shorts/page.js` — add metadata export

**Challenge:** Both are `"use client"` components. In Next.js App Router, `"use client"` components can't export metadata. Options:
1. Create a `layout.js` wrapper in each folder with the metadata export
2. Move the client component to a `PageData.js` and make `page.js` a server component (pattern used by pricing + contact)

Option 2 matches existing codebase patterns and is cleaner.

### Step 2: Implement B, C, D, E (zero risk, batch together)

Update title + description + openGraph + twitter in:
- `src/app/pricing/page.js`
- `src/app/api/page.js`
- `src/app/integration/page.js`
- `src/app/contact/page.js`

**Commit separately** from homepage change so it's easy to isolate.

### Step 3: Implement A — Homepage (high risk, separate commit)

Update in `src/app/layout.js`:
- title
- description
- openGraph.title + openGraph.description
- twitter.title + twitter.description

**Commit separately** so it can be independently reverted if rankings dip.

### Step 4: Verify + Document

- `npm run build` passes
- Update `docs/seo/sitewide-seo-changelog.md` with Stage 2 before/after
- Save GSC baseline data to `docs/seo/gsc-data/` for 30-day comparison

---

## Additional Observations from GSC Data

### Indexing Issues Worth Investigating

- **38 pages crawled but not indexed** — This is the single largest indexing issue. Worth investigating what those URLs are. Could be duplicate content, thin pages, or parameter URLs.
- **13 alternate canonical pages** — Check these aren't cannibalizing intended pages.
- **4x 404 errors** — Should be redirected or cleaned up.

### GA4 Gap

- **Zero key events configured** — Cannot track conversions per landing page. Before implementing Stage 2, ideally set up key events (signup, trial start, checkout) so we can measure before/after impact beyond just CTR. This is a separate task but worth noting.

### Sitemap Update

The Stage 1 dynamic sitemap (17 URLs) should replace the old static one (8 URLs) after deployment. Verify in GSC that the new sitemap is picked up and shows 17 discovered URLs.

---

## Decision Matrix (for morning review)

| Page | Risk | GSC Verdict | Action Needed |
|------|------|-------------|---------------|
| **A. Homepage** | HIGH | MODIFY | Choose title option (A1/A2/A3). Add instagram-reels + youtube-shorts metadata first. |
| **B. Pricing** | NEGLIGIBLE | APPROVE | Implement as proposed. |
| **C. API** | NEGLIGIBLE | APPROVE | Implement as proposed. |
| **D. Integration** | NEGLIGIBLE | APPROVE | Implement as proposed. |
| **E. Contact** | NEGLIGIBLE | APPROVE | Implement as proposed. Decide: keep or remove email addresses from description. |

---

## When You Wake Up

Tell me:
1. **Homepage title:** Option A1 (keep current), A2 (original proposal), A3 (modified/recommended), or your own wording?
2. **Contact description:** Keep the email addresses or remove them?
3. **Proceed with B–E immediately?** (yes/no)
4. **Do homepage separately or together?** (recommended: separate commit)

I'll execute everything based on your answers.
