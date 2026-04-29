# Collection Import Feature Page Documentation

**URL:** https://tokscript.com/features/collection-import

**Source Files:**
- src/app/features/collection-import/page.js
- src/app/features/collection-import/PageData.js

## Metadata

- **Title:** TikTok Collection Downloader | Import Entire Profiles | TokScript
- **Description:** Download entire TikTok collections and profiles with one link. Import all videos from any TikTok user profile or playlist instantly.
- **Canonical:** https://tokscript.com/features/collection-import
- **Keywords:** TikTok collection downloader, TikTok profile downloader, download TikTok playlist, TikTok bulk download, download all TikTok videos, TikTok profile import
- **OpenGraph Title:** TikTok Collection Downloader | TokScript
- **OpenGraph Description:** Import entire TikTok profiles and collections with one link.
- **OpenGraph URL:** https://tokscript.com/features/collection-import

## Page Sections

### Header Component
- Standard TokScript header navigation

### Hero Section
- **Kicker Badge:**
  - Icon: Layers icon
  - Text: "COLLECTION IMPORT"
- **H1 Title:** "One Link. Every Video. Zero Copy-Paste."
  - Subtitle gradient: linear-gradient(135deg, #ffffff 0%, #d8b4fe 100%)
- **Description:** "Paste a TikTok collection link or creator profile URL. TokScript imports every video automatically: transcripts, metadata, cover images. Study an entire content catalog in minutes, not hours."
- **CTA Button:**
  - Text: "Try it now" with ArrowRight icon
  - Link: "/pricing"
  - Background: #a855f7 (purple)
  - Shadow: 0 4px 14px rgba(168, 85, 247, 0.4)
- **Visual:** Animated grid of video thumbnails appearing with extraction confirmation badge

### Core Value Section
- **Title:** "One video is a fluke. A profile is a formula."
- **Subtitle:** "If you want to understand how top creators operate, you can't just study their viral hits. You need to see their dud videos, their format pivots, and their daily reps."

#### Comparison: Without Collection Import vs With Collection Import
**Without (Left side):**
- Label: "Standard Tools"
- Heading: "Data Entry Hell"
- Copy: "Building a swipe file of a specific creator used to mean hours of mindless copying and pasting. It's why most people give up after saving 5 videos."
- Visual: Faux UI panel showing manual workflow (open profile, right click, copy link, paste into spreadsheet, repeat 150 times)

**With (Right side - Hover Interactive):**
- Label: "TokScript Collection Import"
- Heading: "Instant Structuring"
- Copy: "Feed us the profile URL. We do the crawling, the downloading, and the transcribing. You get a neatly organized folder of their entire history."
- Visual: Animated folder tree showing file structure with expanded subfolders

### Timeline Section: Zero to Archive in 3 Steps
**Section Title:** "Zero to Archive in 3 Steps"
**Subtitle:** "No complex configurations. Just paste a link and let the engine work."

#### Three Steps

1. **Drop the Link**
   - Watermark: "01"
   - Title: "Drop the Link"
   - Description: "Grab the URL of any public TikTok profile or curated playlist. Just the main link, no need to open individual videos. We handle the routing automatically."

2. **We Map the Grid**
   - Watermark: "02"
   - Title: "We Map the Grid"
   - Description: "TokScript's engine scans the profile, counts the videos, and begins extracting the transcripts and metadata in parallel. 100 videos take about 3 minutes."

3. **Analyze the Data**
   - Watermark: "03"
   - Title: "Analyze the Data"
   - Description: "Download the entire batch as a single CSV, or browse the transcripts in your cloud dashboard. Find out when they started using that new hook format."

### Bento Grid Section: Built for Deep Dives
**Section Title:** "Built for Deep Dives"
**Subtitle:** "Stop scratching the surface. Get the full picture of any creator's strategy."

#### Five Feature Cards

1. **Client Onboarding** (spans 2 columns on desktop)
   - Kicker: "Client Onboarding"
   - Heading: "Audit a brand in seconds."
   - Copy: "Taking on a new client? Don't spend hours watching their old content. Import their profile, export to CSV, and walk into the kickoff meeting knowing which topics drove 80% of their views last year."
   - Visual: Animated profile card showing creator stats with videos and word counts

2. **Search Their History** (1 column)
   - Heading: "Search Their History"
   - Copy: "Once imported, you can Ctrl+F through a creator's entire history to find when they talked about a specific topic."
   - Visual: Animated grid search showing items with highlight on match

3. **Filter by Date** (1 column)
   - Heading: "Filter by Date"
   - Copy: "Only care about their recent pivot? Set a date range and extract only the videos from the last 90 days."
   - Visual: Animated calendar date picker with range highlight animation

4. **Playlist Support** (1 column)
   - Heading: "Playlist Support"
   - Copy: "Creators often group multi-part series into Playlists. You can import just a specific playlist rather than the whole profile."
   - Visual: Animated playlist cards with progress bars filling in sequence

5. **Export Ready** (1 column)
   - Heading: "Export Ready"
   - Copy: "Get the raw transcripts, view counts, and publish dates neatly organized in a CSV, ready for your own pivot tables."
   - Visual: Animated transition from JSON code to CSV spreadsheet format

### FAQ Section
**Section Title:** "Questions? We got you."

#### FAQ Items (4 total)

1. **Q:** "What's the difference between Collection and Bulk Import?"
   **A:** "Bulk Import requires you to paste a list of specific video URLs. Collection Import is smarter: you just give it ONE link to a creator's profile, and it grabs every video from that profile automatically."

2. **Q:** "Can I import private profiles?"
   **A:** "No. We respect privacy boundaries. TokScript only extracts data from publicly available videos and profiles."

3. **Q:** "Is there a limit on how big a collection can be?"
   **A:** "On Pro plans, there's effectively no limit. We regularly handle profile imports containing 800+ videos. It just takes a few minutes longer to process."

4. **Q:** "Does this work for Instagram or YouTube?"
   **A:** "This specific 'One-Link Collection' feature is currently optimized for TikTok profiles and playlists. For IG/YouTube, use the Bulk Import tool with a list of URLs."

### Final CTA Section
- **Background:** #09090b
- **Heading:** "Ready to dig deep?"
- **Copy:** "Stop guessing what works. Download the data and know for sure."
- **CTA Button:** "Get Access Now"
  - Link: "/pricing"
  - Background: Default primary button color

### Footer Component
- Standard TokScript footer

## Technical Implementation

- Client-side rendered component ("use client")
- Uses Framer Motion for animations
- Interactive state management for FAQ accordion
- Multiple animated component visualizations including:
  - Collection grid with staggered appearance and extraction badge
  - Folder tree with expanding subfolders on hover
  - History search with grid highlighting match
  - Calendar date picker with range animation
  - Playlist cards with sequential progress bar fill
  - JSON to CSV transformation animation
- Hover-triggered animations on feature cards
- Responsive grid layout (3 columns desktop, adapts mobile)
- Noise overlay SVG effect
- Glass-panel design for hero visual
- Color-coded accent elements matching feature theme (purple #a855f7)
