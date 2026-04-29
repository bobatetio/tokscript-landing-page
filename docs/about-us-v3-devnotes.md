# About Us V3 — Developer Notes

**Last updated:** 2026-02-09
**Page route:** `/about-us`
**Files modified:** `src/app/about-us/page.js`, `src/app/about-us/PageData.js`, `src/App.scss`

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Page Sections (13 total)](#page-sections)
3. [Component Architecture](#component-architecture)
4. [CSS Architecture & Gotchas](#css-architecture--gotchas)
5. [SEO Implementation](#seo-implementation)
6. [Animation System](#animation-system)
7. [Known Issues & Caveats](#known-issues--caveats)
8. [How to Modify](#how-to-modify)
9. [Internal Links Roadmap](#internal-links-roadmap)

---

## Architecture Overview

The About Us page was rebuilt from scratch (v1 → v3). The old version was a basic
"about the company" page. The new version is a comprehensive product marketing page
with 13 sections, animated counters, scroll-reveal animations, and 3 JSON-LD schemas.

### File Structure

```
src/app/about-us/
├── page.js          # Next.js metadata (title, description, OG, Twitter, keywords)
└── PageData.js      # All page content, components, data constants, JSON-LD schemas
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single `PageData.js` file | Keeps all About page logic colocated. Components are small and page-specific — no reason to extract to `/components`. |
| CSS scoped under `.about-v3` | Prevents style bleed to other pages. All styles are namespaced. |
| `av3-` class prefix | Short, unique prefix. Easy to grep. No collision with Bootstrap or other page styles. |
| IntersectionObserver over Framer Motion | Framer Motion `whileInView` is unreliable in this project (see [Animation System](#animation-system)). Native IO is more reliable. |
| Data constants at top of file | `METRICS`, `PERSONAS`, `DIFFERENTIATORS`, etc. are plain objects. Easy to update content without touching JSX. |

---

## Page Sections

The page has 13 sections rendered sequentially. Here's a map:

| # | Section | Class | Description |
|---|---------|-------|-------------|
| 1 | Hero | `.av3-hero` | Large heading with gradient text, subtitle |
| 2 | Metrics Ticker | `.av3-ticker` | Auto-scrolling horizontal ticker with 10 stats |
| 3 | Mission | `.av3-mission` | Two-column: mission statement + animated stat counters |
| 4 | Problem → Solution | `.av3-problem` | Before/after comparison grid |
| 5 | Feature Showcase | `.av3-showcase` | 6 feature cards with icons |
| 6 | Who Uses TokScript | `.av3-personas` | 5 persona cards (Creators, Agencies, Sellers, Researchers, Educators) |
| 7 | TikTok Shop Deep Dive | `.av3-shop` | Before/after metrics table for Shop sellers |
| 8 | Why Different | `.av3-diff` | 6 differentiator items with checkmarks |
| 9 | AI Agents Showcase | `.av3-agents` | 3 AI agent cards (Hook Generator, Script Writer, Video Analyzer) |
| 10 | Tech Specs & Trust | `.av3-specs` | Technical details + trust signals |
| 11 | International | `.av3-intl` | Global reach badge |
| 12 | FAQ | `.av3-faq` | 11 expandable Q&A items with accordion behavior |
| 13 | Final CTA | `.av3-final-cta` | "Start for Free" button linking to `/pricing` |

---

## Component Architecture

All components are defined inside `PageData.js`. They are intentionally NOT extracted
to separate files because they are only used on this page.

### Shared Components

| Component | Purpose | Props |
|-----------|---------|-------|
| `AnimatedCounter` | Counts from 0 to `end` when scrolled into view | `end`, `suffix`, `prefix` |
| `AnimatedSection` | Wraps any section with scroll-reveal animation | `children`, `className`, `as`, `immediate` |
| `SectionTitle` | Consistent section header with badge + accent line | `children`, `subtitle` |
| `FeatureCard` | Card with icon, title, description | `icon`, `title`, `desc` |
| `FAQItem` | Expandable accordion item | `question`, `answer` |

### Custom Hooks

| Hook | Purpose | Notes |
|------|---------|-------|
| `useScrollReveal(immediate?)` | Returns a ref. Adds `.in-view` class when element enters viewport. | Uses `IntersectionObserver` with `threshold: 0.15`. Fires once. If `immediate=true`, adds class instantly (for above-the-fold content). |

### Data Constants

All content is stored in plain JS objects at the top of `PageData.js`:

| Constant | Type | Count | Used in |
|----------|------|-------|---------|
| `METRICS` | `{ label, value }[]` | 10 | Ticker section |
| `SHOP_METRICS` | `{ label, before, after }[]` | 4 | TikTok Shop section |
| `PERSONAS` | `{ icon, title, desc }[]` | 5 | Who Uses section |
| `DIFFERENTIATORS` | `{ title, desc }[]` | 6 | Why Different section |
| `ECOSYSTEM` | `{ name, desc, link? }[]` | 4 | Tech Specs section |
| `FULL_FAQ` | `{ q, a }[]` | 11 | FAQ section |

**To update page content**, modify these constants. No JSX changes needed in most cases.

---

## CSS Architecture & Gotchas

### SCSS Location

All About v3 styles live in `src/App.scss` under the `.about-v3 { ... }` scope block.
The block starts at approximately **line 2300** and runs ~1300 lines.

### BEM Naming Convention

All classes follow BEM with the `av3-` prefix:
```
.av3-{block}
.av3-{block}__{element}
.av3-{block}--{modifier}
```

Examples: `.av3-hero__heading`, `.av3-feature-card__icon`, `.av3-ticker__track`

### CRITICAL: Global CSS Override Gotchas

This project has global styles (Bootstrap + custom CSS) that will silently break new
components on dark backgrounds. These are the most common traps:

#### 1. List items are BLACK by default
```scss
// Global rule (outside our control):
ul li { color: rgb(0, 0, 0); }

// FIX — already applied in .about-v3 scope:
li { color: #d1d5db !important; }
```
**If you add ANY new `<li>` elements**, they will be invisible on the dark background
unless they inherit from the `.about-v3` scope or have explicit color.

#### 2. List items are INLINE by default
```scss
// Global rule:
ul li { display: inline-block; }

// FIX — already applied:
li { display: block !important; }
```
**If you need a horizontal list**, use flexbox on the parent instead of relying on
`display: inline-block`.

#### 3. `<span>` ignores margin-bottom
```scss
// Spans are inline by default — vertical margins don't apply.
// If a span needs spacing below it, add display: block or display: inline-block.
```

#### 4. `<p>` font-size is overridden globally
```scss
// Global rule sets p { font-size: 16px; } or similar.
// FIX — already applied:
p { font-size: inherit !important; }
```

### Color Palette

| Variable | Value | Usage |
|----------|-------|-------|
| Background | `#020617` | Page background (slate-950) |
| Text primary | `#fff` | Headings |
| Text secondary | `#94a3b8` | Body text (slate-400) |
| Text tertiary | `#64748b` | Muted text (slate-500) |
| Accent indigo | `#818cf8` | Badges, highlights |
| Accent cyan | `#22d3ee` | Gradient endpoints |
| Accent green | `#4ade80` | Success indicators |
| Card background | `rgba(15, 23, 42, 0.6)` | Glass-morphism cards |
| Border | `rgba(255, 255, 255, 0.05)` | Subtle dividers |

### Responsive Breakpoints

The page uses a mobile-first approach with these breakpoints:
- `768px` — Tablet (2-column grids, larger headings)
- `1024px` — Desktop (3-column grids)

### Animations

All CSS animations are defined at the bottom of the `.about-v3` block:

| Animation | Duration | Usage |
|-----------|----------|-------|
| `av3-scroll` | 40s linear infinite | Metrics ticker auto-scroll |
| `av3-pulse-ring` | 2s ease-out infinite | AI agent card pulse effect |

The `prefers-reduced-motion` media query disables scroll-reveal transitions.

---

## SEO Implementation

### Metadata (`page.js`)

| Field | Notes |
|-------|-------|
| `title` | Long-tail: includes "84M+ Transcripts" social proof |
| `description` | 155 chars, includes primary stats and platform names |
| `keywords` | 20 total (11 original + 9 long-tail additions) |
| `canonical` | `https://tokscript.com/about-us` |
| `openGraph` | Full card with 1200x630 image |
| `twitter` | `summary_large_image` card |

### JSON-LD Schemas (`PageData.js`)

Three `<script type="application/ld+json">` tags are rendered inside the `<main>` wrapper:

| Schema | Key Data | Update Frequency |
|--------|----------|-----------------|
| `FAQPage` | 18 Q&A pairs (sourced from homepage FAQ) | When FAQ content changes |
| `Organization` | Logo, social links, contact email, founding date | When company info changes |
| `SoftwareApplication` | 3 pricing tiers, aggregate rating (4.7/68 reviews) | **When pricing or ratings change** |

**IMPORTANT:** The `SoftwareApplication` schema contains hardcoded pricing and review
data. If pricing changes or review count grows significantly, update the schema to
match. Google can penalize fabricated or outdated rating data.

### Validation

After any schema changes, validate with:
- https://validator.schema.org/ (paste the JSON-LD)
- https://search.google.com/test/rich-results (paste the page URL after deploy)

Full SEO changelog with rollback instructions: `docs/seo/about-us-seo-changelog.md`

---

## Animation System

### Why NOT Framer Motion `whileInView`

We tested Framer Motion's `whileInView` prop extensively and it is **unreliable** in
this project. Symptoms:

- Elements get stuck at partial opacity (~0.28)
- Animations never trigger on some sections
- `useInView` hook + `animate` prop also gets stuck
- Root cause: the `<main>` element has `overflow-x: hidden` which creates a nested
  scroll container. `window.scrollY` stays at 0 — all scrolling happens inside `<main>`.
  Framer Motion's viewport detection doesn't work correctly with this setup.

### What We Use Instead

**`IntersectionObserver` via `useScrollReveal()` hook:**

```jsx
function useScrollReveal(immediate = false) {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el); // Fire once
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [immediate]);
  return ref;
}
```

CSS handles the transition:
```scss
.av3-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Exception: AnimatedCounter

`AnimatedCounter` uses Framer Motion's `useInView` hook (NOT `whileInView` prop) and
works correctly. This is because it only reads a boolean — it doesn't try to animate
a motion element's style properties.

### If You Need to Add Animations

1. Wrap your section in `<AnimatedSection>`: handles scroll-reveal automatically
2. For above-the-fold content, pass `immediate={true}` to skip the delay
3. Do NOT use `<motion.div whileInView={...}>` — it will break
4. `useInView` from Framer Motion is fine for triggering JS logic (counters, etc.)

---

## Known Issues & Caveats

### 1. `.next/` Build Artifacts Were Tracked in Git

Previously, some `.next/` build artifacts were committed to the repo despite `.next/`
being in `.gitignore`. This commit removes them. They should not reappear.

### 2. `overflow-x: hidden` on `<main>` Creates Nested Scroll

The global layout has `overflow-x: hidden` on `<main>`, which creates an
`overflow: hidden auto` computed style. This means:
- `window.scrollY` is always 0
- Scrolling happens on the `<main>` element
- `window.scrollTo()` does nothing
- Use `element.scrollIntoView()` for programmatic scrolling

### 3. FAQ Data is Duplicated

The FAQ schema in `PageData.js` contains 18 Q&As sourced from the homepage FAQ
(`src/components/FaqSection.js`). The inline FAQ accordion has 11 Q&As (a subset).
These are intentionally different — the schema covers more ground for SEO while the
visible FAQ is curated for the About page context. If the homepage FAQ changes,
the schema should be updated to match.

### 4. No Internal Links to Feature Pages

Feature cards and AI agent mentions are **not linked** to feature pages. This is
intentional — 6 of the 11 target routes don't exist yet. See [Internal Links Roadmap](#internal-links-roadmap).

### 5. Ticker Animation May Stutter on Low-End Devices

The metrics ticker uses CSS `animation: av3-scroll 40s linear infinite` with
`will-change: transform`. On very low-end devices, the continuous animation may
cause jank. The `prefers-reduced-motion` query does NOT disable the ticker — it
only disables scroll-reveal transitions.

---

## How to Modify

### Update page content (metrics, personas, features, FAQ)

Edit the data constants at the top of `PageData.js`:
- `METRICS` — ticker stats
- `PERSONAS` — "Who Uses" cards
- `DIFFERENTIATORS` — "Why Different" items
- `FULL_FAQ` — FAQ accordion items
- `SHOP_METRICS` — TikTok Shop before/after table

No JSX changes needed for content updates.

### Add a new section

1. Add your `<AnimatedSection className="av3-newsection">` in `PageData.js`
2. Add `.av3-newsection { ... }` styles inside the `.about-v3 { }` scope in `App.scss`
3. Use the `av3-` prefix for all class names
4. Remember the global CSS gotchas (li color, li display, p font-size)

### Update SEO metadata

- **Title, description, keywords, OG, Twitter:** Edit `page.js`
- **JSON-LD schemas:** Edit the `<script>` tags at the bottom of `PageData.js`
- **After changes:** Validate schemas and update `docs/seo/about-us-seo-changelog.md`

### Update pricing in schema

If pricing changes (currently Free/$0, Monthly/$10, Annual/$39), update the
`SoftwareApplication` JSON-LD in `PageData.js`. Search for `"@type": "SoftwareApplication"`.

### Update review rating in schema

If the aggregate rating changes from 4.7/68 reviews, update the `aggregateRating`
object in the `SoftwareApplication` JSON-LD.

---

## Internal Links Roadmap

**Status:** Deferred (as of 2026-02-09)

### Why Deferred

6 of 11 target feature pages don't exist as routes yet. Linking to non-existent
pages would cause 404s and hurt SEO.

### Missing Routes (Must Be Created First)

- `/features/bulk-import`
- `/features/collection-import`
- `/features/hd-video-download`
- `/features/viral-hook-generator`
- `/features/viral-script-writer`
- `/features/video-analyzer`

### Existing Routes (Can Be Linked Now)

- `/pricing` — already linked in Final CTA
- `tokbackup.com` — already linked in Ecosystem section
- `/features/chrome-extension` — exists but not linked
- `/api` — may or may not exist
- `/contact` — may or may not exist

### Implementation Plan (When Ready)

1. Create the 6 missing feature page routes
2. Add optional `href` prop to `FeatureCard` component:
   ```jsx
   function FeatureCard({ icon, title, desc, href }) {
     const Wrapper = href ? Link : 'div';
     const wrapperProps = href ? { href } : {};
     return (
       <Wrapper {...wrapperProps} className="av3-feature-card">
         ...
       </Wrapper>
     );
   }
   ```
3. Wrap showcase tags and AI agent names in `<Link>` components
4. Add `cursor: pointer` and hover styles to linked cards
5. Full details in `docs/seo/about-us-seo-changelog.md` under "Internal Links Audit"

---

## Quick Reference

```
# Run dev server
npm run dev

# Build (validates no errors)
npm run build

# Key files
src/app/about-us/page.js       # Metadata only
src/app/about-us/PageData.js    # All components + content + JSON-LD
src/App.scss                    # Styles (search for ".about-v3")

# SEO docs
docs/seo/about-us-seo-changelog.md   # Full changelog with rollback instructions

# Validate schemas
# 1. Copy JSON-LD from PageData.js
# 2. Paste at https://validator.schema.org/
# 3. After deploy: https://search.google.com/test/rich-results?url=https://tokscript.com/about-us
```
