# Features Hub Page Documentation

**URL:** https://tokscript.com/features

**Source Files:**
- src/app/features/page.js
- src/data/features.js

## Metadata

- **Title:** All Features | TokScript
- **Description:** Explore all TokScript features: transcript generation, bulk import, collection import, HD downloads, cloud storage, Chrome extension, quick download, and team collaboration.
- **Canonical:** https://tokscript.com/features
- **OpenGraph Title:** All Features | TokScript
- **OpenGraph Description:** Explore every tool TokScript offers for short-form video research.
- **OpenGraph URL:** https://tokscript.com/features

## Page Structure

### Header Component
- Standard TokScript header navigation

### Hero Section
- **H1 Heading:** "All Features"
- **Subtitle:** "Everything you need to extract, analyze, and repurpose short-form video content."

### Feature Grid Section
Nine feature cards in grid layout, each with:
- Colored accent bar (brand color specific to feature)
- Feature title
- Short description (30-35 words)
- Arrow icon indicating link
- Link to dedicated feature page

#### Feature Cards (9 total)

1. **Transcript Generator**
   - Path: /
   - Short Description: "Video to transcript in seconds"
   - Color: #00f2ea (cyan)

2. **Video Translator**
   - Path: /video-translator
   - Short Description: "Translate videos into 11+ languages"
   - Color: #f43f5e (rose)

3. **Bulk Import**
   - Path: /features/bulk-import
   - Short Description: "Process 100+ videos at once"
   - Color: #f97316 (orange)

4. **Collection Import**
   - Path: /features/collection-import
   - Short Description: "One link imports entire profiles"
   - Color: #a855f7 (purple)

5. **HD Downloads**
   - Path: /features/hd-downloads
   - Short Description: "No watermark, original quality"
   - Color: #ec4899 (pink)

6. **Cloud Storage**
   - Path: /features/cloud-storage
   - Short Description: "Save & search all your transcripts"
   - Color: #22c55e (green)

7. **Quick Download**
   - Path: /features/quick-download
   - Short Description: "Try free, no account needed"
   - Color: #eab308 (yellow)

8. **Chrome Extension**
   - Path: /features/chrome-extension
   - Short Description: "Extract without leaving TikTok"
   - Color: #3b82f6 (blue)

9. **Team Collaboration**
   - Path: /features/team
   - Short Description: "One library for your whole team"
   - Color: #14b8a6 (teal)

### Footer Component
- Standard TokScript footer

## Technical Notes

- Server-side rendered component (not client component)
- No interactive state management
- Feature data sourced from centralized data structure (src/data/features.js)
- Uses Next.js Link component for routing
- No schema markup
- Responsive grid layout that adapts to screen size
