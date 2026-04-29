# Prompt Preloading Changelog

## Summary
Added "Ask AI about TokScript" section to the footer with pre-crafted prompt links for 5 AI platforms.

## Files Created (8)

### AI Icon Components
- `src/assets/images/icons/ai/PerplexityIcon.jsx` - Inline SVG component (Simple Icons)
- `src/assets/images/icons/ai/ChatGPTIcon.jsx` - Inline SVG component (Simple Icons / OpenAI logo)
- `src/assets/images/icons/ai/GrokIcon.jsx` - Inline SVG component (LobeHub icons)
- `src/assets/images/icons/ai/ClaudeIcon.jsx` - Inline SVG component (Simple Icons)
- `src/assets/images/icons/ai/GeminiIcon.jsx` - Inline SVG component (Simple Icons / Google Gemini)

### Prompt Data Module
- `src/lib/aiPrompts.js` - Contains 5 platform-specific prompts, URL generation via `getAiPromptUrls()`, and build-time URL length validation

### CI/CD
- `.github/workflows/verify-ai-links.yml` - Monthly cron (1st of month, 9 AM UTC) + manual dispatch. HEAD-checks all 5 AI platform base URLs, accepts 200/301/302.

### Documentation
- `tasks/PROMPT-PRELOADING-CHANGELOG.md` - This file

## Files Modified (2)

### `src/components/Footer.jsx`
- Added 6 imports (5 icon components + `getAiPromptUrls`)
- Added `trackAiClick()` function using `window.dataLayer.push()` for GTM event tracking
- Added `aiPromptUrls` constant from `getAiPromptUrls()`
- Inserted `.ask-ai-section` JSX block between `.row` and `.bottom-section`
- All 5 links have: `target="_blank"`, `rel="nofollow noopener"`, `aria-label`, `title`
- Link order: Perplexity, ChatGPT, Grok, Claude, Gemini

### `src/assets/scss/components.scss`
- Inserted `.ask-ai-section` SCSS block (lines 1090-1142) inside `.footer-section`, before `.bottom-section`
- Styles: flex layout, 36x36 rounded-square icon containers, 8px border-radius, subtle border, muted icon color, hover brightens border
- Mobile responsive: stacks vertically at <767px

## Verification Results
- Build: PASS (no errors)
- Dev server: PASS (serving correctly)
- URL lengths: ALL PASS (460-544 chars, well under 2000 limit)
- HTML output: 5 AI links with correct attributes confirmed
- Sitemap: 31 URLs (unchanged)
- aria-labels: All 5 present and correct
- rel attributes: All 5 have "nofollow noopener"

## URL Lengths
| Platform   | URL Length | Status |
|------------|-----------|--------|
| Perplexity | 544 chars | PASS   |
| ChatGPT    | 485 chars | PASS   |
| Grok       | 460 chars | PASS   |
| Claude     | 527 chars | PASS   |
| Gemini     | 501 chars | PASS   |

## What Was NOT Changed
- No changes to any page component (homepage, about, pricing, etc.)
- No changes to sitemap, metadata, robots.txt, or SEO config
- No changes to layout.js, header, or any other shared component
- No changes to existing SCSS rules
- No changes to routing, i18n files, or translation JSON files
