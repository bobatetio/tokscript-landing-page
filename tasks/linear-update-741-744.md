# Linear Card Updates — DEV-741 & DEV-744

---

## DEV-741: Header "Features" Dropdown Links Are Dead / Circular

**Status:** Moving to Staging

### What changed

- `src/data/features.js` — The "Transcript Generator" entry had `path: "/"` (pointing back to the homepage). Updated to `path: "/features/transcript-generator"` so the dropdown link actually routes to its own page.
- `src/data/features.js` — Added new "Translate Transcripts" entry with `path: "/features/translations"` and slug `translations`.
- `src/components/Header.jsx` — Added `Globe` icon import from lucide-react and registered the `"translations"` icon in `FeatureIcons` map so the new dropdown entry renders correctly.
- Indentation cleanup in `Header.jsx` (whitespace only, no logic changes).

### New routes created

- `/features/transcript-generator` — Dedicated feature page with its own `PageData.js` and `page.js`
- `/features/translations` — Dedicated feature page using the video-translator template with its own `PageData.js` and `page.js`

### Files modified

- `src/data/features.js`
- `src/components/Header.jsx`
- `src/app/features/transcript-generator/PageData.js` (new)
- `src/app/features/transcript-generator/page.js` (new)
- `src/app/features/translations/PageData.js` (new)
- `src/app/features/translations/page.js` (new)
- `src/templates/video-translator/LandingPage.js` (new template)
- `src/templates/video-translator/config.js` (new template config)

### How to verify

1. Open the desktop site
2. Hover "Features" in the header nav
3. Click "Transcript Generator" — should navigate to `/features/transcript-generator`
4. Click "Translate Transcripts" — should navigate to `/features/translations`
5. Confirm no circular redirect, each page loads its own content

Branch: `homeupdates2`
Commit: `51ebf72`

---

## DEV-744: /features Page Contains Unapproved AI-Generated Placeholder Content

**Status:** Moving to Staging

### What changed

- Created proper, dedicated feature pages at `/features/transcript-generator` and `/features/translations` with structured page data instead of placeholder content.
- Each page has its own `PageData.js` with real section content (hero, features, FAQ, CTA) specific to that feature.
- The `/features/translations` page uses a new `video-translator` template (`src/templates/video-translator/LandingPage.js`) built for translation-focused feature pages.
- The `/features/transcript-generator` page uses the existing feature page pattern with content specific to transcript generation.

### Files added

- `src/app/features/transcript-generator/PageData.js` — Page data with real feature content
- `src/app/features/transcript-generator/page.js` — Route entry point
- `src/app/features/translations/PageData.js` — Page data with real translation feature content
- `src/app/features/translations/page.js` — Route entry point
- `src/templates/video-translator/LandingPage.js` — New reusable template for translator pages
- `src/templates/video-translator/config.js` — Template configuration

### How to verify

1. Navigate to `/features/transcript-generator` — confirm content is specific to transcript generation, not generic placeholder
2. Navigate to `/features/translations` — confirm content is specific to video translation
3. Check `/features` hub page still renders correctly
4. Confirm no broken imports or console errors on either page

Branch: `homeupdates2`
Commit: `51ebf72`
