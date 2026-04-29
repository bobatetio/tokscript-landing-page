# MCP Page Mobile Responsive Overhaul

## Batch 1: JSX Refactor + Desktop SCSS Classes
- [x] Refactor Setup section inline styles → classNames (PageData.js)
- [x] Refactor CTA section inline styles → classNames (PageData.js)
- [x] Fix FAQ inline widths: `width` → `maxWidth` + `width: '100%'`
- [x] Fix B&A carousel: hardcoded 1100 → dynamic containerRef width
- [x] Add desktop SCSS class defs for Setup block in mcp.scss
- [x] Add desktop SCSS class defs for CTA block in mcp.scss

## Batch 2: SCSS Mobile Overrides
- [x] Rewrite 960px media query block with all 9 sections
- [x] Rewrite 640px media query block with all 9 sections
- [x] Fix `.who-cards-inner` dead selector → target `.who-cards-outer`
- [x] Fix `.hiw-cards-row` position:absolute blocking flex-wrap
- [x] Add touch target minimums (44px) at 640px
- [x] Add video lightbox responsive rule

## Verification
- [x] Dev server running (HTTP 200)
- [x] Desktop layout unchanged at 1440px
- [x] All 9 sections responsive at 960px
- [x] All 9 sections responsive at 640px
