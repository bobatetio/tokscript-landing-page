# Dev Notes: SEO Cleanup (Developer Feedback Items)

**Branch:** `homeupdates2`
**Commit:** `399498c`
**Date:** 2026-03-03

---

## What Changed

### 1. Removed `<em>` wrappers on Instagram page

**File:** `src/templates/instagram-reels/LandingPage.js`

Two paragraphs in the "About TokScript" section were wrapped in `<em>` tags, which is semantically incorrect for body copy (screen readers announce emphasized text differently, and search engines may interpret it as keyword emphasis).

- **Line 1722** ("Instagram Ads Research" paragraph): removed `<em>` wrapper
- **Line 1726** ("UGC Creator Workflows" paragraph): removed `<em>` wrapper
- **Line 995** (`<em>(paid plans)</em>`): kept, this is correct inline annotation usage

No CSS anywhere targets `em` elements, so the only visual change is those two paragraphs are no longer italicized.

### 2. Footer column titles: `<h5>` to `<span>`

**Files:** `src/components/Footer.jsx`, `src/assets/scss/components.scss`

The footer used `<h5>` for "Generators", "Product", and "Company" column titles. This created a heading hierarchy skip (page goes h1 > h2 > h3, then jumps to h5 in the footer). Since these are navigational labels, not content headings, `<span>` is the correct element.

**Footer.jsx changes (3 lines):**
- Line 85: `<h5>` to `<span className="footer-col-title">`
- Line 103: `<h5>` to `<span className="footer-col-title">`
- Line 123: `<h5>` to `<span className="footer-col-title">`

**components.scss change (line ~1094):**
- Selector changed from `.right-section h5` to `.right-section .footer-col-title`
- Added `display: block` (span is inline by default, h5 was block)
- All other properties unchanged (font-weight: 700, font-size: 15px, color: white, etc.)

### 3. LEARNING.md updated

The "Known Remaining Issues" entry for footer h5 tags was updated to reflect the fix and document the new selector pattern.

---

## What Was NOT Changed (and why)

- **`next.config.mjs`** redirect for `/youtube-shorts-transcript` to `/youtube-transcript-generator`: this 308 redirect is intentional and correct. The developer feedback about broken links was from cached/pre-deploy pages; the source code already uses the correct URLs everywhere.
- **`global.scss` bare `h5` rule (line 125)**: stays in place, it applies to actual h5 elements used elsewhere in the codebase.
- **YouTube template**: already clean, no `<em>` tags present.

---

## Risk Assessment

| Area | Risk |
|------|------|
| Footer visual appearance | None. Same styles, just different selector. |
| IG page visual | Minimal. Two paragraphs lose italic styling. |
| Other pages | None. Footer component is shared by all 27 pages, change is universal and consistent. |
| Accessibility | Improved. No more heading skip in the document outline. |
| SEO | Improved. Clean heading hierarchy, proper use of emphasis tags. |

---

## How to Verify

1. Check any page's footer: "Generators", "Product", "Company" should look identical (white, bold, 15px)
2. Inspect the DOM: should be `<span class="footer-col-title">` not `<h5>`
3. IG page "About TokScript" section: "Instagram Ads Research" and "UGC Creator Workflows" paragraphs should be regular weight (not italic)
4. IG page pricing section: "(paid plans)" should still be italic
