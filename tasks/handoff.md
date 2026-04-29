# Handoff: Skill Detail Modal Visual Fix

## Status: COMPLETE

## Branch: `homeupdates2`

## What Was Done
Fixed SkillDetailModal to match Figma reference design across 3 files:

### 1. `src/components/modals/SkillDetailModal.jsx`
- Action buttons now have inline SVG icons (copy, download)
- Added Download dropdown with .txt/.md/.pdf/.docx options
- HOW TO USE steps changed from numbered circles to plain text paragraphs
- Added `handleDownload()` function with Blob-based file download
- Added `downloadOpen` state, resets on skill change

### 2. `src/app/mcp/PageData.js`
- All 6 skill prompts replaced with full multi-paragraph text (250-450 words each)
- Prompts include sections, frameworks, output formats, and guidelines
- All include `[TRANSCRIPT]` placeholder
- Zero em dashes or en dashes

### 3. `src/app/mcp/mcp.scss`
- Modal height: added `min-height: 80vh`, `max-height: 90vh`
- Prompt box: teal left border accent only (`border-left: 2px solid rgba(0, 217, 180, 0.4)`)
- Play button: dark gray (`rgba(0, 0, 0, 0.55)`) with backdrop blur, not green
- Steps: plain text with 4px gap, removed `.sd-step` and `.sd-step-num`
- Action bar: full-width flush bar, 48px tall buttons, no border-radius, dividers between
- New dropdown styles: `.sd-download-wrap`, `.sd-dropdown`, `.sd-dropdown-item`
- Responsive updated for new structure

## Verification
- Next.js build passes with zero errors
