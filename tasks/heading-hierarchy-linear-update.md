# Linear Card Update: Heading Hierarchy Fix

**Status:** Done
**Branch:** `homeupdates2`
**Date completed:** March 3, 2026

---

## Summary

Fixed all heading hierarchy violations on both `/youtube-transcript-generator` and `/instagram-transcript-generator`. Both pages now follow a strict H1 → H2 → H3 cascade with zero skipped levels. Decorative stat numbers changed from `<h2>` to `<span>`, FAQ accordion items from `<h2>` to `<h3>`, and 37 total heading tags corrected across both templates. Two shared components (CounterComponent, FaqSection) updated with corresponding SCSS changes. Zero visual regressions; all changes are semantic HTML only.

---

## Completed

### YouTube Page (`/youtube-transcript-generator`)
- Promoted 3 section headings from `<h3>` to `<h2>`: Preview, Pricing, Ready to Convert
- Promoted "About TokScript" from `<h4>` to `<h2>` (major section)
- Demoted 10 feature sub-headings from `<h4>` to `<h3>` (under their H2 parents)
- Demoted 5 "Who Uses" cards from `<h4>` to `<h3>`
- Demoted 3 disclaimer sub-topics from `<h4>` to `<h3>`
- Added new `<h2>`: "Who Uses TokScript's YouTube Transcript Generator" (section had no heading)
- Changed "LEGAL DISCLAIMER" from `<h4>` to `<p><strong>` (not a section heading)
- Fixed typo: "Youtube" → "YouTube" in CTA heading

### Instagram Page (`/instagram-transcript-generator`)
- Promoted 5 section headings from `<h3>` to `<h2>`: Preview, How-It-Works, Pricing, Who Uses, Ready to Convert
- Promoted "About TokScript" from `<h4>` to `<h2>`
- Demoted 8 feature sub-headings from `<h4>` to `<h3>`
- Demoted 5 "Who Uses" cards from `<h4>` to `<h3>`
- Changed 3 disclaimer sub-topics from `<h4><em>` to `<h3>` (removed unnecessary `<em>` wrappers)
- Changed "LEGAL DISCLAIMER" from `<h4>` to `<p><strong>`

### Shared Components
- **CounterComponent.jsx:** Decorative stat numbers (2.6M+, 190K+, etc.) changed from `<h2>` to `<span>`. SCSS updated in 2 locations (App.scss lines 4521, 5242): `.title h2` → `.title span`
- **FaqSection.js:** Section title promoted from `<h3>` to `<h2>`. FAQ accordion items changed from `<h2>` (Bootstrap default) to `<h3>` via `as="h3"` prop. Affects homepage, both template pages, and all language pages. No visual change (Bootstrap targets `.accordion-header` class, not element tag).

---

## Verification (All Passed)

- `/youtube-transcript-generator` → 200, clean compile
- `/instagram-transcript-generator` → 200, clean compile
- `/` (homepage) → 200, shared components render correctly
- Zero `<h4>` remaining in either template
- Zero `.title h2` selectors remaining in SCSS
- CounterComponent uses `<span>`, FaqSection uses `<h2>` title + `<h3>` items
- LEGAL DISCLAIMER renders as `<p><strong>` on both pages
- "Youtube" typo corrected to "YouTube"

---

## Files Changed: 5 total

| File | What Changed |
|------|-------------|
| `src/templates/youtube-shorts/LandingPage.js` | 17 heading tags, 1 new H2, typo fix |
| `src/templates/instagram-reels/LandingPage.js` | 20 heading tags, removed 3 `<em>` wrappers |
| `src/components/CounterComponent.jsx` | `<h2>` → `<span>` for stats |
| `src/components/FaqSection.js` | Title `<h3>` → `<h2>`, accordion `as="h3"` |
| `src/App.scss` | 2 selectors: `.title h2` → `.title span` |

---

## Post-Deploy (Manual Steps)

- Run heading audit tool (HeadingsMap, Screaming Frog) on both pages in production
- Run Lighthouse accessibility audit to confirm heading issues resolved
- Spot-check homepage + one language page for shared component regressions
- Run Google Rich Results Test on both URLs to confirm FAQ schema still valid

---

## Adversarial Audit Results (5 Rounds, 6 Agents)

All changes underwent a rigorous adversarial audit with 6 specialized agents across 5 rounds (SEO Auditor, Regression Hunter, Devil's Advocate, two Rebuttal agents, Final Judge).

### Verdict: SAFE TO DEPLOY

**Final heading counts per page:** 1 H1, 8 H2, 32-33 H3, 0 H4, 3 H5 (footer). Both pages are symmetric.

**Confirmed correct:** All tag changes, CounterComponent span, FaqSection accordion fix, LEGAL DISCLAIMER, CSS selectors, zero regressions on homepage/language pages.

**Dismissed as false positives:** Keyword cannibalization in H2s (standard SaaS practice), "About TokScript" H2 over-promotion (content is substantive), `h3::after` CSS regression (no `content` property = invisible).

### Follow-Up Items Surfaced by Audit

**P1 — `<strong>` acting as section heading (both pages)**
- `<strong className="white w-600">AI-powered tools for [Platform] creators</strong>` is the only label for the AI features grid. Should be `<h2>`.
- **CRITICAL:** CSS at `App.scss` line ~713 targets `.title strong { font-size: 16px }`. Changing to `<h2>` without CSS update causes 48px text (global h2 default). JSX + CSS must change together. 3-file coordinated fix required.

**P1 — Footer H5 skip (H3 → H5)**
- Footer.jsx column titles are `<h5>` with no H4. Footer uses `<div>` not `<footer>`. Low SEO, medium accessibility severity.

**P2 — Generic FAQ/Pricing H2 titles**
- "Frequently Asked Questions" and "Pricing" carry zero keyword value. Consider keyword-rich titles.

Full audit trail: `tasks/agent-seo-auditor.md`, `tasks/agent-regression-hunter.md`, `tasks/agent-devils-advocate.md`, `tasks/agent-rebuttal-seo.md`, `tasks/agent-rebuttal-code.md`, `tasks/agent-final-judge.md`
