# Sitewide SEO Changelog — Stage 1

**Date:** 2026-02-09
**Scope:** Low-risk, additive SEO improvements across all pages (except About Us, which was already done)

---

## 1. Noindex Legal Pages

Added `robots: { index: false, follow: true }` to prevent indexing of thin/legal pages while preserving link equity.

| Page | File | Before | After |
|------|------|--------|-------|
| /terms | `src/app/terms/page.js` | No robots directive | `robots: { index: false, follow: true }` |
| /privacy | `src/app/privacy/page.js` | No robots directive | `robots: { index: false, follow: true }` |
| /legal | `src/app/legal/page.js` | No robots directive | `robots: { index: false, follow: true }` |
| /pricing-old | `src/app/pricing-old/page.js` | No robots directive | `robots: { index: false, follow: true }` |

**Risk:** Zero. These pages have no organic search value.

---

## 2. OG + Twitter Cards (4 pages)

Added `openGraph` and `twitter` metadata objects using each page's existing title/description. Image: `og-image.png`.

| Page | File |
|------|------|
| /pricing | `src/app/pricing/page.js` |
| /api | `src/app/api/page.js` |
| /integration | `src/app/integration/page.js` |
| /contact | `src/app/contact/page.js` |

**Risk:** Zero. Additive only — no existing text changed.

---

## 3. Footer Copyright Year

| File | Before | After |
|------|--------|-------|
| `src/components/Footer.jsx` | `© 2025 TokScript. All rights reserved.` | `© {new Date().getFullYear()} TokScript. All rights reserved.` |

**Risk:** Zero. Dynamic year prevents staleness.

---

## 4. Homepage FAQPage JSON-LD

Added FAQPage structured data to `src/app/page.js` with all 18 Q&As from `FaqSection.js`.

**Pattern:** `<script type="application/ld+json">` with `dangerouslySetInnerHTML`
**Placement:** Inside `<div className="landing-page">`, before `<Header />`

**Risk:** Low. Additive structured data. May trigger FAQ rich snippets in SERPs.

---

## 5. Homepage Organization JSON-LD

Added Organization schema to `src/app/page.js` (same insertion point as FAQ schema).

**Source:** Copied from `src/app/about-us/PageData.js` lines 397-421
**Logo:** `https://tokscript.com/og-image.png`

**Risk:** Zero. Additive structured data matching existing About Us page.

---

## 6. Dynamic Sitemap

| Action | Details |
|--------|---------|
| Created | `src/app/sitemap.js` (Next.js dynamic sitemap) |
| Deleted | `public/sitemap.xml` (static, stale) |

**Included pages (13):**
- `/` (priority 1.0)
- `/pricing` (0.9)
- `/api`, `/integration`, `/instagram-reels`, `/youtube-shorts`, `/tiktok-transcript-generator`, `/tiktok-video-downloader`, `/tiktok-collection-downloader`, `/bulk-tiktok-transcript` (0.8)
- `/contact`, `/about-us` (0.7)
- `/upgrade` (0.5)

**Excluded (noindexed):** `/terms`, `/privacy`, `/legal`, `/pricing-old`
**Excluded (utility):** `/404`, `/[...url]` (catch-all)

**Risk:** Low. Dynamic sitemap auto-updates. Removed stale static file.

---

## Stage 2 — Title/Description Rewrites (B–E)

**Date:** 2026-02-09
**Scope:** Rewrite titles and descriptions for 4 pages with negligible organic traffic (553 clicks combined / 6 months, 100% branded queries). Homepage deferred.

### B. Pricing — `src/app/pricing/page.js`

| Property | Before | After |
|----------|--------|-------|
| title | `Pricing \| TokScript` | `TokScript Pricing — Free Plan + Pro from $3.25/mo \| Start Free Today` |
| description | `Choose the right plan for your TikTok, Instagram, and YouTube transcription needs. Flexible pricing for creators, teams, and enterprises.` | `Free: 5 transcripts/day forever. Pro: Unlimited transcripts from $39/year ($3.25/mo). 3 AI agents, bulk import, HD downloads. 41,000+ creators. Cancel anytime.` |
| OG title/desc | Same as above | Updated to match |
| Twitter title/desc | Same as above | Updated to match |

### C. API — `src/app/api/page.js`

| Property | Before | After |
|----------|--------|-------|
| title | `API Access \| TokScript` | `TikTok Transcript API — Developer Docs & Pricing \| TokScript` |
| description | `Integrate TokScript's AI transcription into your apps. Scalable and developer-friendly API for TikTok, Instagram, and YouTube video transcripts.` | `TokScript API: Get video transcripts programmatically. REST API for TikTok, Instagram, YouTube. Free tier available. Full documentation and code examples.` |
| OG title/desc | Same as above | Updated to match |
| Twitter title/desc | Same as above | Updated to match |

### D. Integration — `src/app/integration/page.js`

| Property | Before | After |
|----------|--------|-------|
| title | `Integrations \| TokScript` | `TokScript Integrations — Chrome Extension, Zapier, Notion & More` |
| description | `Connect TokScript with your favorite tools. Streamline your TikTok, Instagram, and YouTube transcription workflow with smart integrations.` | `Chrome extension for one-click transcript downloads. Automate workflows with Zapier. Notion & Google Sheets coming soon. Connect TokScript to your stack.` |
| OG title/desc | Same as above | Updated to match |
| Twitter title/desc | Same as above | Updated to match |

### E. Contact — `src/app/contact/page.js`

| Property | Before | After |
|----------|--------|-------|
| title | `Contact Us \| TokScript` | `Contact TokScript — Support, Partnerships & Enterprise Inquiries` |
| description | `Get in touch with TokScript for support, partnerships, or general inquiries about TikTok, Instagram, and YouTube transcription services.` | `Get help with TokScript. support@tokscript.com for questions (response within 24 hours). business@tokscript.com for partnerships and enterprise pricing.` |
| OG title/desc | Same as above | Updated to match |
| Twitter title/desc | Same as above | Updated to match |

### Not touched
- Homepage (A) — deferred for separate decision
- Keywords arrays — unchanged on all pages
- Canonical URLs — unchanged on all pages

**Risk:** Near-zero. All 4 pages have negligible organic traffic with 100% branded queries. No non-branded rankings at risk.

---

## Rollback

Every change is independently reversible via git revert. All changes are in separate, identifiable edits.
