# LEARNING.md — TokScript Landing Page

## Copy & Content Rules
- **NEVER use em dashes (—) in any copy.** Em dashes are an obvious AI writing tell. Replace with commas, semicolons, colons, or periods depending on context. This applies to all content: social posts, email templates, video scripts, page copy, FAQ answers, etc.
- En dashes (–) should also be avoided for the same reason.

## Affiliate Page
- Pricing: $39/yr yearly plan, $10/mo monthly plan. Commission is 40% ($15.60/yr, $4.00/mo).
- Payouts handled automatically by Lemon Squeezy via PayPal/Stripe. Minimum payout is $5.
- Resource hub contains 35 social posts, 15 email templates, 11 video scripts.

## Multilingual / i18n Strategy (Modeled After TokiTranscript)
- **Architecture:** Pre-built static language pages at clean URL slugs (/br, /ru, /fr, /ja, /ko, /tr, /es, /de, etc.). NOT real-time translation. Each language page is a separate Next.js route that shares the same component structure but receives localized content from JSON translation files.
- **Language Switcher:** Hover dropdown in the main nav (same UX pattern as the existing "Features" dropdown). Clicking a language redirects to that language's pre-built page. No JavaScript translation layer.
- **Translation Approach:** Feed existing English site content into an LLM for professional-quality translations. Focus on keyword LOCALIZATION, not just literal translation (e.g., Korean users search "자막" for subtitles, not a transliterated "transcript"). Research what native speakers actually type into Google for each target language.
- **Shared Components:** Use a single homepage component structure with JSON translation files per locale. Do NOT duplicate the 2,078-line homepage 7+ times. Next.js pre-renders each locale as a static route at build time.

### Implementation Details (Completed)
- **Route structure:** `src/app/[lang]/page.js` (client component) + `src/app/[lang]/layout.js` (server component with metadata + `generateStaticParams`)
- **Critical:** `generateStaticParams()` CANNOT be exported from a `"use client"` page in Next.js App Router. It must go in the layout.js (server component) of the same route segment.
- **Hreflang tags:** Implemented in both root `layout.js` and `[lang]/layout.js`. All 12 languages + x-default.
- **Sitemap:** All 11 language slugs added at priority 0.9.
- **Language Switcher:** Uses hover dropdown + onClick toggle (needed for mobile where hover doesn't work).
- **Central config:** `src/data/languages.js` has the master language list. Slugs are: br, es, zh, fr, hi, ar, de, ja, ko, ru, tr.
- **dynamicParams = false** in `[lang]/layout.js` prevents invalid slugs from rendering (returns 404).
- **html lang attribute:** Set dynamically via `useEffect` in `[lang]/page.js` using `document.documentElement.lang`. Standard approach when only root layout renders `<html>`.
- **Component translation pattern:** Optional `t` prop with English fallbacks (`t?.key || "English"`). Components: Header (23 strings), Footer (19 strings), FaqSection, EnhenceExperience, CounterComponent, DontMissOutModal (28 strings), CheckoutOverlay (~30 strings), ConfirmationModal (5 strings). Root page.js doesn't pass `t`, so English is unchanged.

## Prompt Preloading (Ask AI Footer Section)
- **Analytics:** Project uses GTM (GTM-M29738MG), not direct GA4/gtag. Always use `window.dataLayer.push()` for event tracking, never `gtag()`.
- **SVG Accessibility:** Decorative SVGs inside labeled containers (`<a>` with `aria-label`) must have `aria-hidden="true"` and `focusable="false"` to prevent screen readers from traversing path data.
- **Footer touch targets:** Icon containers are 36x36px, below the 48px (Google) / 44px (Apple) mobile minimum. Existing social media icons have the same pattern. Address in a future holistic footer accessibility pass.
- **Link equity:** 5 external links per page with `rel="nofollow noopener"` to trusted AI domains. No SEO risk per both audit teams and judge.
- **SCSS location:** `.ask-ai-section` is inside `.footer-section` in `components.scss` (starts at ~line 1090). `.bottom-section` follows at ~line 1144.

## Heading Hierarchy — Confirmed Architecture

### IG/YT Landing Pages (templates/)
Both pages went through a 2-round adversarial heading audit. Final confirmed structure:
- `<h1>` (page title) → `<h2>` (major sections) → `<h3>` (subsections/steps/features) — correct.
- No h4s remain in the template files. Clean.
- `<Accordion.Header as="h3">` is correct — Bootstrap renders `<h3 class="accordion-header"><button>...</button></h3>`. CSS targets class selectors, not element selectors, so no visual regression.
- Bootstrap's default `as` prop for AccordionHeader is `h2`. Always specify `as="h3"` explicitly in FaqSection to prevent FAQ items from rendering as h2.
- `h3::after` / `h4::after` in App.scss have no `content` property — invisible, harmless regardless of which h-level is used.

### Known Remaining Issues (Not Fixed in This Pass)
- `<strong>` used as section header for AI features cards grid (banner section) on both IG and YT pages — should be `<h2>`. Confirmed by rebuttal-seo agent.
- Footer.jsx column titles (Generators, Product, Company) use `<span className="footer-col-title">` instead of heading elements. SCSS selector is `.right-section .footer-col-title` in `components.scss`.
- "Pricing" H2 and "Ready to Convert" H2 have zero keyword value — low priority improvement opportunity.
- FAQ title "Frequently Asked Questions" is generic — a keyword-rich title like "YouTube Shorts Transcript FAQ" would be stronger.
- Keyword repetition in h2s: 3-4 H2s on each page contain "YouTube/Instagram Transcript Generator" — rebuttal confirmed this is NOT cannibalization but removing it from "Who Uses" and "About TokScript" H2s would be a minor improvement.

## Feature Pages URL Structure (Completed)
- **Architecture:** All feature pages live under `/features/`. Data source is `src/data/features.js` which powers the Header dropdown, Footer links, and `/features` hub page.
- **Hub page:** `/features` (server component at `src/app/features/page.js`), SCSS at `.ts-features-hub` in App.scss line 16334.
- **Redirects:** 4 permanent 301s in `next.config.mjs` from old TikTok-branded root URLs to new `/features/*` paths. `/tiktok-transcript-generator` redirects to `/` (homepage IS the transcript generator, ranks #1-2).
- **404 handling:** Only `src/app/not-found.js` exists (the soft `src/app/404/page.js` was deleted because it returned HTTP 200). The `[lang]` route's `dynamicParams=false` handles single-segment invalid paths (e.g., `/aboutdog`) before the `[...url]` catch-all is reached. The `notFound()` call in `[...url]/page.js` must stay AFTER all hooks to avoid violating React's Rules of Hooks during SPA re-renders.
- **Watch for macOS Finder duplicates:** Files like `features 2.js` (space in filename) are invisible to imports but confuse greps and AI agents. Always check for and delete these after file operations.
- **Follow-up needed:** FAQPage schema on feature pages, breadcrumbs/back-links from sub-pages to hub, OG images for new pages, convert raw `<a href>` CTAs to `<Link>` sitewide.

### Future Improvements (Not Implemented Yet)
- **Translation Maintenance Drift:** When the English homepage is updated (new features, pricing changes, FAQ additions), ALL language variants must be updated simultaneously. Build a process for this: update English JSON first, then run translations for all locales before deploying. Stale translations with outdated info are worse than no translation.
- **Localized OG Images:** Currently using the same og-image.png across all languages. Future update should create language-specific social preview images with native-language text for better CTR when shared in non-English markets.
- **Localized Schema Markup:** Each language page should have translated JSON-LD schema (WebApplication + FAQPage) with descriptions and FAQ content in the native language.
- **RTL Language Support:** Arabic page is included but has no RTL CSS handling. If Arabic usage grows, add right-to-left layout styles.
- **Localized Footer/Legal Pages:** Language pages link back to English-only About, Contact, Privacy, Terms pages. Consider creating localized versions for a proper internal link mesh.

## Performance Optimizations (Mobile 50% -> Target 90%+)

### Third-Party Scripts
- **Featurebase SDK** (1,107ms CPU, 296KB JS, 6.8MB images) is the #1 mobile bottleneck. Load on user interaction (scroll/click/touch) or 10s timeout via `src/components/FeaturebaseMessenger.jsx`. CSS loads inline via SDK (28.7KB unused fonts), cannot be disabled without breaking the widget.
- **Google Tag Manager** (354ms CPU, 262KB JS). Wrap in `setTimeout(5000)` in `layout.js` to delay 5 seconds after page load.
- **Lemon Squeezy affiliate script** already uses `strategy="lazyOnload"`.

### Images
- **Hero background** (`light-ray-bg-img.webp`): Compressed from 534KB to 198KB (1440x769). Created mobile version (`light-ray-bg-img-mobile.webp`) at 768px width, 77KB. Use CSS media query in App.scss `.banner-section @media (max-width: 767px)` to serve mobile version.
- Hero image is LCP element. Cannot add `fetchpriority="high"` because it's a CSS `background-image`, not an `<img>` tag. To make it prioritized, would need to refactor to use Next.js `<Image priority>` with absolute positioning.

### CSS Bundle Optimization
- **Bootstrap**: Using selective SCSS imports via `src/bootstrap-custom.scss` (only grid, modal, accordion, progress, dropdown, buttons). Full Bootstrap CSS is 227KB, custom is ~60KB compiled.
- **Modal CSS code-splitting**: Removed `@use "./assets/scss/modal.scss"` (1,507 lines) and `@use "./assets/scss/cancel-flow.scss"` (931 lines) from global App.scss. Now imported directly in modal components (`DontMissOutModal.jsx`, `CheckoutOverlay.jsx`, `ConfirmationModal.jsx`, `CancelSubscriptionFlow.jsx`). Since modals use `dynamic(() => import(), { ssr: false })`, their CSS is code-split into separate webpack chunks (32K + 13K) that only load when modals open.
- **App.scss** still 16,810 lines (466KB uncompressed in build). The biggest remaining bloat, but risky to refactor. Contains critical above-the-fold styles plus all landing page sections. Splitting into critical vs non-critical CSS would require extracting inline critical CSS or moving page-specific sections to their route files.

### JavaScript Polyfills
- **Browserslist** set to modern browsers in `package.json`: `Chrome >= 87, Firefox >= 78, Safari >= 14, Edge >= 88`. Eliminates 13.5KB of polyfills for Array.at, Object.hasOwn, String.trimStart, etc.

### Build Config
- **next.config.mjs** uses `optimizePackageImports: ['lucide-react', 'framer-motion', 'react-bootstrap']` for tree-shaking.
- Turbopack enabled (`--turbopack` flag in build/dev scripts) for faster builds.
- Image cache headers: `Cache-Control: public, max-age=31536000, immutable` for all static images.

## MCP Page (`/mcp`)
- **Architecture:** Top-level route at `src/app/mcp/` with `page.js` (server, metadata) + `PageData.js` (client, all JSX + interactivity). SCSS at `src/app/mcp/mcp.scss` scoped under `.mcp-page`.
- **Images:** 64 assets in `assets_updated/images/mcp/`. Figma MCP asset API serves PNG/JPEG/SVG regardless of URL format. Files were renamed to their actual format (.png, .jpg, .svg). Next.js Turbopack will fail if file extension doesn't match actual image format.
- **Figma source:** `figma.com/design/OplW5nVFf7r071o7uTN2DZ/TokScript-MCP--Copy-` (node-id=0-1)
- **Nav:** "MCP" link added to Header.jsx between Pricing and Affiliate. Not translated (no `t?.` key).
- **`@/` alias** maps to `./src/*` per jsconfig.json. `assets_updated/` is at project root, so imports use relative `../../../assets_updated/` from `src/app/mcp/`.
- **Header wrapper height is 175px** (129px header + spacer div), NOT the visible nav height. The `.header-sticky-wrapper` (175px) and an empty spacer div (175px) both precede `#hero` in the DOM. When positioning absolute elements relative to `#hero`, account for this. The affiliate banner contributes ~46px; if dismissed, header shrinks to ~129px.
- **Section padding override:** The `.mcp-page section` rule applies `padding: 96px 24px` globally. `#hero` must override this with `padding: 0 24px` to prevent double-padding (section padding + hero-body padding).
- **Hero layout fix:** Uses `margin-top: -175px` + `margin-bottom: -175px` + `height: calc(100vh + 175px)` to pull hero behind header. Content clears header via `hero-body padding-top: 217px` (42px + 175px). Video card and flare/sparkles offset by +103px from designer values (compromise for gap + visibility).
- **Gradient text descender clipping:** `background-clip: text` + `WebkitTextFillColor: transparent` + `lineHeight: 1` clips descenders (g, y, p, q) because the gradient only paints within the element's content box. Fix with `paddingBottom` on the element, NOT `lineHeight` adjustments (those are insufficient). The CTA h2 uses `paddingBottom: '6px'` for this reason.

### Mobile Responsive (Completed)
- **Inline styles on `<section>` elements block CSS media query overrides.** Setup and CTA sections had section-level `style={{ padding, display, ... }}` which prevented the `section { padding: 64px 18px }` 640px override from firing. Refactored to SCSS classes.
- **`.who-cards-inner` was a dead selector** in the 960px media query. The actual class in JSX is `.who-cards-outer`. Always verify selector names against JSX before writing media queries.
- **`.hiw-cards-row` uses `position: absolute`** in desktop SCSS. Must explicitly set `position: static` in 960px override for `flex-wrap` to work.
- **`.ba-track` JS inline transform** must be overridden with `transform: none !important` in CSS to disable carousel on mobile.
- **`.mcp-page h2` global reset** clears `-webkit-text-fill-color` and `background`. Any class applying gradient text on an h2 (like `.cta-title`) must explicitly re-set both properties.
- **Breakpoints:** 960px = tablet (layout reflow, position:static, logo hide), 640px = mobile (font sizes, touch targets 44px, decorative elements hidden).

### Still Causing Performance Issues (Not Fixed)
- **Featurebase widget images** (6.8MB from featurebase-attachments.com) only have 4h cache TTL (out of our control).
- **DOM size** (827 elements, max depth 17) is acceptable but on the edge. Caused by feature-rich homepage with multiple sections.
- **Render-blocking CSS** (1,270ms) from App.scss. Can only be fixed by critical CSS extraction or moving non-critical sections to lazy-loaded stylesheets.

