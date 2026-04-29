# YouTube URL Migration: Dev/SEO Handoff

**Branch:** `homeupdates2`
**Date:** March 2, 2026
**Status:** Complete, ready for review and deploy

---

## What Changed and Why

The YouTube page URL was migrated from `/youtube-shorts-transcript` to `/youtube-transcript-generator`. This mirrors the completed Instagram migration (`/instagram-reels-transcript` -> `/instagram-transcript-generator`).

**SEO rationale:**
- "YouTube transcript generator" is a broader parent keyword that captures Shorts, long-form videos, and premieres
- "Generator" signals tool intent, improving conversion potential
- Competitors (Transkriptor, Notta, Descript) all target the broad keyword
- "YouTube Shorts transcript" is retained as a secondary keyword in an H2

**What did NOT change:**
- Template folder stays `src/templates/youtube-shorts/` (no SEO benefit to renaming)
- Body text still says "YouTube Shorts" where accurate (the tool's primary use case is Shorts)
- All 14 FAQ entries in JSON-LD schema are unchanged
- H1 was already "YouTube Transcript Generator" (no change needed)
- Subheadline was already broad scope (no change needed)
- Page design/layout: zero visual changes

---

## Redirect Map

| Old URL | New URL | Type | Hops |
|---------|---------|------|------|
| `/youtube-shorts` | `/youtube-transcript-generator` | 308 Permanent | 1 (direct) |
| `/youtube-shorts-transcript` | `/youtube-transcript-generator` | 308 Permanent | 1 (direct) |

The existing `/youtube-shorts` -> `/youtube-shorts-transcript` redirect was **updated in place** (not stacked) to avoid a 2-hop chain. Both old URLs now point directly to the new canonical in a single redirect.

---

## New Page Metadata

| Field | Value |
|-------|-------|
| Title | `YouTube Transcript Generator - Free AI Tool \| TokScript` |
| Meta description | `Generate accurate transcripts from YouTube Shorts and videos instantly. Free AI-powered tool to convert YouTube video to text in seconds.` |
| Canonical | `https://tokscript.com/youtube-transcript-generator` |
| OG title | Same as title |
| OG description | Same as meta description |
| OG URL | `https://tokscript.com/youtube-transcript-generator` |
| OG image alt | `TokScript YouTube Transcript Generator` |
| Twitter title/desc | Same as above |

### JSON-LD Schema
- **BreadcrumbList:** Home > YouTube Transcript Generator
- **WebApplication:** Name = "TokScript YouTube Transcript Generator"
- **FAQPage:** 14 Q&A entries (unchanged from previous page)

---

## On-Page SEO Changes

### Heading Hierarchy Updates (LandingPage.js)

| Location | Before | After |
|----------|--------|-------|
| How-it-works section | `<h3>How to Generate a Transcript from a YouTube Video</h3>` | `<h2>How to Transcribe YouTube Videos</h2>` |
| Feature section | `<h3>Everything You Get with TokScript's Free YouTube Transcript Generator</h3>` | `<h2>YouTube Shorts Transcript Generator</h2>` |

The H1 targets the broad keyword. The second H2 retains "YouTube Shorts Transcript Generator" as a secondary keyword.

### ShareBar Update (LandingPage.js)

| Field | Before | After |
|-------|--------|-------|
| URL | `https://tokscript.com/youtube-shorts-transcript` | `https://tokscript.com/youtube-transcript-generator` |
| Text | `Free YouTube Shorts transcript generator — extract transcripts from any Short in seconds. 41,000+ creators use TokScript.` | `Free YouTube transcript generator. Extract transcripts from any YouTube video or Short in seconds. 41,000+ creators use TokScript.` |

### Config SEO Block (config.js)

| Field | Before | After |
|-------|--------|-------|
| Title | `YouTube Shorts Transcript Generator - TokScript` | `YouTube Transcript Generator - TokScript` |
| Keywords | `["youtube shorts transcript", "shorts captions", "video to text"]` | `["youtube transcript generator", "youtube shorts transcript", "shorts captions", "video to text"]` |

---

## Content Fixes (Applied During Migration)

### Em Dashes Removed (config.js)
4 instances of `—` replaced with `:` in freePlanFeatures and paidPlanFeatures arrays:
- "Quick URL method — just add tokscript.com/" -> "Quick URL method: just add tokscript.com/"
- "Export in multiple formats — .txt, .xml, .json, .csv" -> "Export in multiple formats: .txt, .xml, .json, .csv"

### Bard -> Gemini (Both Configs)
Google renamed Bard to Gemini. Updated the AI tools disclaimer in both:
- `src/templates/youtube-shorts/config.js`
- `src/templates/instagram-reels/config.js`

---

## All Files Changed (27 total)

### Created (1)
| File | What |
|------|------|
| `src/app/youtube-transcript-generator/page.js` | New canonical route with full metadata + JSON-LD |

### Deleted (3)
| File | What |
|------|------|
| `src/app/youtube-shorts-transcript/page.js` | Old canonical route |
| `src/app/youtube-shorts-transcript/` | Old route directory |
| `src/app/youtube-shorts/page.js` | Old stub redirect (client-side) |

### Modified (23)
| File | What Changed |
|------|-------------|
| `next.config.mjs` | Updated youtube-shorts destination, added youtube-shorts-transcript redirect |
| `src/app/HomePage.js` | 2 internal link hrefs |
| `src/app/about-us/PageData.js` | 3 internal link hrefs |
| `src/app/pricing/PageData.js` | 1 internal link href |
| `src/components/Footer.jsx` | href + display text ("YouTube Transcript Generator") |
| `src/app/sitemap.js` | URL updated |
| `public/llms.txt` | URL + link label |
| `public/llms-full.txt` | URL + label |
| `src/templates/youtube-shorts/LandingPage.js` | ShareBar URL+text, 2x H3 promoted to H2 |
| `src/templates/youtube-shorts/config.js` | 4 em dashes, SEO title/keywords, Bard->Gemini |
| `src/templates/instagram-reels/LandingPage.js` | Cross-link href + display text |
| `src/templates/instagram-reels/config.js` | Bard->Gemini |
| `locales/en.json` | Footer: "YouTube Transcript Generator" |
| `locales/ar.json` | Footer: "مولد نصوص YouTube" |
| `locales/br.json` | Footer: "Gerador de Transcrições do YouTube" |
| `locales/de.json` | Footer: "YouTube Transkript-Generator" |
| `locales/es.json` | Footer: "Generador de Transcripciones de YouTube" |
| `locales/fr.json` | Footer: "Générateur de Transcriptions YouTube" |
| `locales/hi.json` | Footer: "YouTube ट्रांसक्रिप्ट जनरेटर" |
| `locales/ja.json` | Footer: "YouTube文字起こしジェネレーター" |
| `locales/ko.json` | Footer: "유튜브 자막 생성기" |
| `locales/ru.json` | Footer: "Генератор транскрипций YouTube" |
| `locales/tr.json` | Footer: "YouTube Transkript Oluşturucu" |
| `locales/zh.json` | Footer: "YouTube 字幕生成器" |

---

## Pre-Deploy Verification (All Passed)

- [x] `/youtube-shorts` -> 308 to `/youtube-transcript-generator` (single hop, no chain)
- [x] `/youtube-shorts-transcript` -> 308 to `/youtube-transcript-generator`
- [x] `/youtube-transcript-generator` -> 200 with correct title, canonical, OG
- [x] `/instagram-transcript-generator` -> 200 (cross-link didn't break it)
- [x] Sitemap contains `/youtube-transcript-generator`, zero references to old URL
- [x] Zero remaining `/youtube-shorts-transcript` references in `src/` and `public/`
- [x] Zero remaining old footer labels in all 12 locale files
- [x] Zero "Bard" references in template configs
- [x] Zero em dashes in YouTube config
- [x] Dev server compiles and loads without errors

---

## Post-Deploy Checklist (Manual)

- [ ] Submit `https://tokscript.com/youtube-transcript-generator` to Google Search Console URL Inspection tool
- [ ] Submit updated sitemap in GSC
- [ ] Request indexing removal for `/youtube-shorts-transcript` if it persists after 1-2 weeks
- [ ] Check GTM container (GTM-M29738MG) for any triggers keyed to old `/youtube-shorts-transcript` path
- [ ] Check Plausible analytics for any custom goals on old path
- [ ] Run Google Rich Results Test on new URL to confirm FAQ + WebApplication schema
- [ ] Monitor GSC crawl errors on old URL for 2 weeks
- [ ] Verify both redirects resolve correctly in production (not just dev)
- [ ] Test from incognito/different browser to confirm no caching issues
