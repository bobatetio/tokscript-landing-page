# SEO URL Migration: Instagram Page

**Date:** March 2, 2026
**Branch:** `homeupdates2`
**Status:** Complete, verified locally, ready for deploy

---

## What Changed

The Instagram landing page URL was migrated from `/instagram-reels-transcript` to `/instagram-transcript-generator` to better target broader keyword volume. Competitors (ElevenLabs, Transcript24, ScreenApp, FreeScribe) all target "instagram transcript generator." The new URL signals tool intent ("generator") rather than informational intent ("transcript").

**Scope stays Reels-only.** No false claims about Stories/IGTV support were added. All existing FAQ content remains accurately Reels-scoped.

---

## Route Changes

| Old URL | New URL | Redirect |
|---------|---------|----------|
| `/instagram-reels` | `/instagram-transcript-generator` | 308 permanent |
| `/instagram-reels-transcript` | `/instagram-transcript-generator` | 308 permanent |

Both old URLs redirect directly to the new canonical. No redirect chains.

**Files:**
- `next.config.mjs` - Redirects array updated (3 entries: both old IG paths + youtube-shorts)
- `src/app/instagram-transcript-generator/page.js` - **New file** (the live route)
- `src/app/instagram-reels-transcript/` - **Deleted** (entire directory)
- `src/app/instagram-reels/` - **Deleted** (stub that could block redirect resolution)

---

## Metadata (New Page)

| Field | Value |
|-------|-------|
| **Title tag** | `Instagram Transcript Generator - Free AI Tool \| TokScript` |
| **Meta description** | `Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text. Bulk process up to 50 videos.` |
| **Canonical** | `https://tokscript.com/instagram-transcript-generator` |
| **OG title** | Same as title tag |
| **OG description** | Same as meta description |
| **OG URL** | `https://tokscript.com/instagram-transcript-generator` |
| **OG image alt** | `TokScript Instagram Transcript Generator` |
| **Twitter title/desc** | Match above |

---

## JSON-LD Schema

Three schema types in `@graph`:

1. **BreadcrumbList** - `Home > Instagram Transcript Generator` (URL: new canonical)
2. **WebApplication** - Name: `TokScript Instagram Transcript Generator`, offers: Free + $39/yr
3. **FAQPage** - 14 Q&A pairs, all unchanged from previous page (Reels-scoped, accurate)

---

## On-Page SEO Changes

### Heading Promotion (LandingPage.js)
- **Before:** `<h3>#1 Instagram Reels Transcript & Download Platform</h3>`
- **After:** `<h2>Instagram Reels Transcript & Download Platform</h2>`
- Rationale: Promoted to H2 to retain "instagram reels transcript" as a secondary keyword in the heading hierarchy. Removed "#1" (unverifiable claim).

### config.js SEO Block
- **Title:** `Instagram Reels Transcript Generator - TokScript` changed to `Instagram Transcript Generator - TokScript`
- **Keywords:** `"instagram transcript generator"` moved to first position in the keywords array

### ShareBar
- **URL:** Updated to `https://tokscript.com/instagram-transcript-generator`
- **Text:** `Free Instagram transcript generator. Get transcripts from any Reel in seconds. 41,000+ creators use TokScript.` (em dash removed per copy rules)

### Em Dash Cleanup (config.js)
Four em dashes replaced with colons in feature list copy:
- `"Quick URL method: just add tokscript.com/"` (was "... — just ...")
- `"Export in multiple formats: .txt, .xml, .json, .csv"` (was "... — .txt ...")
- Same two strings appeared in both `freePlan.features` and `paidPlanFeatures` arrays

---

## Internal Link Updates (6 locations)

All instances of `/instagram-reels-transcript` in href/link attributes updated to `/instagram-transcript-generator`:

| File | Count | Context |
|------|-------|---------|
| `src/app/HomePage.js` | 2 | Disclaimer section links |
| `src/app/about-us/PageData.js` | 3 | FAQ answer, two body paragraphs |
| `src/app/pricing/PageData.js` | 1 | FAQ answer ("Which platforms are supported?") |

---

## Footer Update

**File:** `src/components/Footer.jsx`
- **href:** `/instagram-reels-transcript` changed to `/instagram-transcript-generator`
- **Display text:** `"Instagram Transcripts"` changed to `"Instagram Transcript Generator"`

---

## Sitemap

**File:** `src/app/sitemap.js`
- Entry changed from `/instagram-reels-transcript` to `/instagram-transcript-generator`
- Priority unchanged at `0.8`, changeFrequency unchanged at `weekly`

---

## LLMs Files

| File | Line | Change |
|------|------|--------|
| `public/llms.txt` | 36 | URL updated |
| `public/llms-full.txt` | 266 | URL updated |

---

## What Was NOT Changed

- **Template folder name** (`src/templates/instagram-reels/`) stays as-is. Renaming would cascade import changes across the app for zero SEO benefit.
- **FAQ content** - All 14 FAQ entries remain Reels-scoped and accurate. No false claims.
- **H1 headline** - Already reads "Instagram Transcript Generator," aligned with new URL.
- **Subheadline** - Stays as "Generate accurate transcripts from any Instagram Reel online in seconds."
- **Page design/layout** - Zero visual changes.
- **YouTube Shorts page** - Out of scope for this migration.

---

## Verification Results (Local Dev Server)

| Check | Result |
|-------|--------|
| `GET /instagram-reels` | 308 -> `/instagram-transcript-generator` |
| `GET /instagram-reels-transcript` | 308 -> `/instagram-transcript-generator` |
| `GET /instagram-transcript-generator` | 200, correct title + canonical + OG |
| Sitemap | Contains `/instagram-transcript-generator`, zero old URL references |
| Codebase grep for `/instagram-reels-transcript` in `src/` and `public/` | **Zero matches** |
| Dev server | Loads without errors |

---

## Post-Deploy Checklist (Manual)

- [ ] Submit `https://tokscript.com/instagram-transcript-generator` to Google Search Console URL Inspection tool
- [ ] Submit updated sitemap in GSC
- [ ] Request indexing removal for old URL (`/instagram-reels-transcript`) if it persists in the index
- [ ] Check GTM container (GTM-M29738MG) for any triggers keyed to the old path
- [ ] Check Plausible analytics for any custom goals on the old path
- [ ] Verify redirects are working in production with `curl -sI https://tokscript.com/instagram-reels-transcript`
- [ ] Check Google Rich Results Test with new URL to confirm FAQ + WebApplication schema renders
- [ ] Monitor Search Console for crawl errors on the old URL over the next 2 weeks
- [ ] Update any external backlinks you control (social bios, partner sites, directories) to point to the new URL

---

## Complete File Manifest

| # | File | Action |
|---|------|--------|
| 1 | `src/app/instagram-transcript-generator/page.js` | Created |
| 2 | `src/app/instagram-reels-transcript/page.js` | Deleted |
| 3 | `src/app/instagram-reels/page.js` | Deleted |
| 4 | `next.config.mjs` | Updated |
| 5 | `src/app/sitemap.js` | Updated |
| 6 | `src/components/Footer.jsx` | Updated |
| 7 | `src/app/HomePage.js` | Updated |
| 8 | `src/app/about-us/PageData.js` | Updated |
| 9 | `src/app/pricing/PageData.js` | Updated |
| 10 | `src/templates/instagram-reels/LandingPage.js` | Updated |
| 11 | `src/templates/instagram-reels/config.js` | Updated |
| 12 | `public/llms.txt` | Updated |
| 13 | `public/llms-full.txt` | Updated |
