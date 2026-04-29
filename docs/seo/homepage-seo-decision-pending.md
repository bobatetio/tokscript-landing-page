# Homepage (A) SEO Rewrite — PENDING DECISION

**Status:** Shelved as of Mon 2026-02-09. Revisit Thu/Fri (Feb 12-13).
**Branch:** `homeupdates` (all other SEO work is done here)
**Risk level:** HIGH — homepage = 98.7% of organic traffic (305K clicks / 6 months)

---

## Decisions Needed

### 1. Title — Pick one (or write your own)

| Option | Title | Chars |
|--------|-------|-------|
| **A1: Keep current** | `TokScript - Video Transcript Downloader for TikTok, Reels & Shorts Transcripts Instantly` | 88 (truncated in SERPs but working) |
| **A3: Recommended** | `TikTok Transcript Generator — Free Video to Text \| TokScript` | 59 (fits SERP, adds "Free", keeps top queries) |

### 2. Description — Approve or modify

**Current:**
> Download Transcripts, HD Videos & Cover Images, Bulk export from TikTok, Reels, and Shorts Instantly. Plus use our AI viral script generator hook writer analyzer.

**Proposed:**
> Generate TikTok transcripts instantly. Free AI tool that converts TikTok, Instagram Reels & YouTube Shorts to text. Bulk export, HD downloads. Used by 41,000+ creators.

### 3. Prerequisite — Must happen first

Before touching the homepage title, add standalone metadata to:
- `src/app/instagram-reels/page.js`
- `src/app/youtube-shorts/page.js`

Both currently inherit from `layout.js`. Changing the homepage title without this step would break their titles.

---

## What's Already Done (Stage 1 + Stage 2)

- Pricing, API, Integration, Contact — titles/descriptions rewritten + OG/Twitter
- About page v3 rebuilt
- Noindex legal pages, dynamic sitemap, FAQ schema, Organization schema, footer year
- All on `homeupdates` branch, build passing

---

## Files That Will Change

| File | What Changes |
|------|-------------|
| `src/app/layout.js` | title, description, OG, Twitter |
| `src/app/instagram-reels/page.js` | NEW metadata export (prerequisite) |
| `src/app/youtube-shorts/page.js` | NEW metadata export (prerequisite) |
