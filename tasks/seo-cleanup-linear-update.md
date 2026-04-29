## SEO Cleanup: Developer Feedback Items - Done

Addressed all 4 items from the developer's feedback on heading hierarchy and semantic HTML.

### Items 1 & 2: `/youtube-shorts-transcript` links
Already fixed in source. All references across `src/`, Footer, IG page, and all 11 locale JSON files use the correct `/youtube-transcript-generator` URL. The 308 redirect in `next.config.mjs` catches any cached or external links. No code changes needed.

### Item 3: `<em>` tags on Instagram page
Removed `<em>` wrappers from two body paragraphs ("Instagram Ads Research" and "UGC Creator Workflows") that were incorrectly using emphasis for styling. The `<em>(paid plans)</em>` inline annotation was kept as correct usage.

### Item 4: Footer `<h5>` heading skip
Replaced three `<h5>` column titles (Generators, Product, Company) with `<span className="footer-col-title">`. Updated the SCSS selector to match. Visual appearance is identical. This fixes the heading hierarchy skip (h3 > h5) flagged in the audit.

### Files changed
- `src/templates/instagram-reels/LandingPage.js`
- `src/components/Footer.jsx`
- `src/assets/scss/components.scss`
- `LEARNING.md`
