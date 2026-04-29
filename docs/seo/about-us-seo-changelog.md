# About Us Page — SEO Changelog

**Page:** `/about-us`
**Date:** 2026-02-08
**Files Modified:** `src/app/about-us/page.js`, `src/app/about-us/PageData.js`
**Purpose:** Add structured data and metadata improvements to increase search visibility
**Measurement Period:** 30 days (review on 2026-03-10)

---

## Change 1: OG + Twitter Image Tags

**Before:**
- `openGraph` object had title, description, url, type — but NO `images` property
- `twitter` object had card, title, description — but NO `images` property

**After:**
- Added `openGraph.images: [{ url: "https://tokscript.com/og-image.png", width: 1200, height: 630, alt: "..." }]`
- Added `twitter.images: ["https://tokscript.com/og-image.png"]`

**Expected Result:**
- Social shares of tokscript.com/about-us now show the OG image preview card on Twitter, LinkedIn, Facebook, Slack, etc.
- Previously: shared links showed no image or a default/broken preview

**Risk:** None. Additive only. Does not affect search ranking — only affects social share appearance.

**Rollback:** Remove the `images` property from both `openGraph` and `twitter` objects in `page.js`.

---

## Change 2: FAQPage JSON-LD Structured Data

**Before:**
- No structured data of any kind on `/about-us` page
- No JSON-LD scripts anywhere in the codebase

**After:**
- Added `<script type="application/ld+json">` with FAQPage schema
- Contains 18 Q&A pairs sourced from the homepage FAQ section (`src/components/FaqSection.js`)
- Placed inside `<main>` wrapper in `PageData.js`

**Expected Result:**
- Google may display FAQ rich snippets in search results for `/about-us`
- FAQ rich snippets expand clickable area in SERPs and increase CTR
- Typical CTR improvement: 15-30% for pages with FAQ rich snippets
- Google may take 2-4 weeks to crawl and process the new schema
- Use Google Search Console > Enhancements > FAQ to monitor

**Risk:** Low. If schema has errors, Google ignores it — no ranking penalty. Validate at https://validator.schema.org/ and Google Rich Results Test.

**Rollback:** Remove the FAQPage `<script>` tag from `PageData.js`.

---

## Change 3: Organization JSON-LD Structured Data

**Before:**
- No Organization schema on any page

**After:**
- Added Organization schema with: name, url, logo (og-image.png), description, foundingDate (2024), sameAs (Twitter, TikTok, Instagram), contactPoint (support@tokscript.com)

**Expected Result:**
- Helps Google build a Knowledge Panel for "TokScript" brand searches
- Connects social profiles to the brand entity
- May take weeks/months for Knowledge Panel to appear (if it does)

**Risk:** None. Additive only. Incorrect info is ignored, not penalized.

**Rollback:** Remove the Organization `<script>` tag from `PageData.js`.

---

## Change 4: SoftwareApplication JSON-LD Structured Data

**Before:**
- No SoftwareApplication schema on any page

**After:**
- Added SoftwareApplication schema with: name, category (BusinessApplication), operatingSystem (Web), 3 pricing tiers (Free/$0, Monthly/$10, Annual/$39), aggregateRating (4.7 / 68 reviews)

**Expected Result:**
- Google may show pricing and rating info directly in search results
- Star ratings in SERPs increase CTR significantly (typically 20-35%)
- Pricing transparency in SERPs helps qualified traffic self-select

**Risk:** Low. Rating data (4.7 / 68) must remain accurate. If ratings change significantly, update the schema. Google can penalize fabricated ratings — these numbers are real and verifiable.

**Rollback:** Remove the SoftwareApplication `<script>` tag from `PageData.js`.

---

## Change 5: Long-tail Keywords Added to Meta Keywords

**Before (11 keywords):**
tokscript, tiktok transcript, tiktok transcript generator, about tokscript, tiktok script extractor, instagram transcript generator, youtube shorts transcript, bulk tiktok transcript download, viral hook generator, tiktok video to text, ai script generator tiktok

**After (20 keywords — 9 added):**
All original 11 keywords preserved, plus:
- extract tiktok transcript
- tiktok script download
- how to get transcript of tiktok video
- tiktok transcript generator free
- best tiktok transcript tool
- download tiktok transcript in bulk
- ai viral hook generator for tiktok
- tiktok shop script generator
- tiktok collection transcript downloader

**Expected Result:**
- Marginal. Google has publicly stated they don't use meta keywords for ranking.
- Bing and Yandex may still use them.
- No downside to having them.

**Risk:** None.

**Rollback:** Remove the 9 appended keywords from the `keywords` array in `page.js`.

---

## Change 6: Internal Links Audit (Read-Only)

No code changes — audit only. Results below.

### Links Found (2 of 13)
| Link | Status | Context |
|------|--------|---------|
| `/pricing` | Found | Final CTA button ("Start for Free") |
| `tokbackup.com` | Found | Ecosystem section card |

### Links Missing (11 of 13)
| Link | Notes |
|------|-------|
| `/` (homepage) | No link back to homepage in page content |
| `/features/bulk-import` | Mentioned in FeatureCard but not linked |
| `/features/collection-import` | Mentioned in FeatureCard but not linked |
| `/features/chrome-extension` | Mentioned in FeatureCard but not linked |
| `/features/viral-hook-generator` | Mentioned in showcase + AI Agents but not linked |
| `/features/viral-script-writer` | Mentioned in showcase + AI Agents but not linked |
| `/features/video-analyzer` | Referenced as "Virality Explainer" but not linked |
| `/features/hd-video-download` | Mentioned in FeatureCard but not linked |
| `/api` | "RESTful API Available" in Tech Specs but not linked |
| `/contact` | Not present anywhere |
| `help.tokscript.com` | Not present anywhere |

### Recommendation
Adding these internal links would improve SEO link equity and user navigation. However, this requires visual design changes (making FeatureCards clickable, adding link text). This should be a separate task to avoid risking the current design.

---

## Decision: Internal Links — Deferred

**Date:** 2026-02-09
**Reason:** 6 of 11 target feature pages don't exist yet as routes. Linking to non-existent pages would cause 404s and hurt SEO.

### Missing Routes (Must Be Created First)
- `/features/bulk-import`
- `/features/collection-import`
- `/features/hd-video-download`
- `/features/viral-hook-generator`
- `/features/viral-script-writer`
- `/features/video-analyzer`

### Implementation Plan (When Routes Exist)
1. Create the missing feature pages listed above
2. Extend `FeatureCard` component with optional `href` prop
3. Wrap showcase tags in `<Link>` components
4. Add internal links from About Us to all feature pages

---

## 30-Day Measurement Plan

### Metrics to Track (Google Search Console)
1. **Impressions** for `/about-us` — baseline vs. 30 days after
2. **Clicks** for `/about-us` — baseline vs. 30 days after
3. **Average CTR** for `/about-us` — expect increase if rich snippets appear
4. **Average Position** for `/about-us` — should stay same or improve
5. **Rich Results** — check Enhancements > FAQ in Search Console
6. **Brand searches** — monitor "tokscript" query impressions

### Tools
- Google Search Console (primary)
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/

### Success Criteria
- CTR increase of 10%+ for `/about-us`
- FAQ rich snippets appearing in SERPs
- No drop in existing rankings for primary keywords
- No manual actions or schema errors in Search Console

### If Rankings Drop
1. Check Search Console for manual actions or crawl errors
2. Validate all JSON-LD schemas for errors
3. If drop correlates with changes, rollback in this order:
   - Remove SoftwareApplication schema (most likely culprit if rating data is questioned)
   - Remove FAQPage schema
   - Remove Organization schema
   - Revert keywords to original 11
   - Remove OG/Twitter images (very unlikely cause)
4. Each rollback: deploy, wait 1 week, measure again
