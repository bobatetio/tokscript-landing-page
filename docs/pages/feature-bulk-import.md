# Bulk Import Feature Page Documentation

**URL:** https://tokscript.com/features/bulk-import

**Source Files:**
- src/app/features/bulk-import/page.js
- src/app/features/bulk-import/PageData.js

## Metadata

- **Title:** Bulk TikTok Transcript Generator | Process 100+ Videos | TokScript
- **Description:** Generate transcripts for multiple TikTok videos at once. Bulk import and process 100+ videos simultaneously. Perfect for agencies and content creators.
- **Canonical:** https://tokscript.com/features/bulk-import
- **Keywords:** bulk TikTok transcript, batch TikTok transcription, multiple TikTok videos, bulk video transcription, mass TikTok download, TikTok batch processing
- **OpenGraph Title:** Bulk TikTok Transcript Generator | TokScript
- **OpenGraph Description:** Process 100+ TikTok videos at once with bulk transcription.
- **OpenGraph URL:** https://tokscript.com/features/bulk-import

## Page Sections

### Header Component
- Standard TokScript header navigation

### Hero Section
- **Kicker Badge:**
  - Icon: Database icon
  - Text: "BULK EXTRACTION"
- **H1 Title:** "Import 100 Transcripts While You Grab Coffee"
  - Subtitle gradient: linear-gradient(135deg, #ffffff 0%, #bae6fd 100%)
- **Description:** "Paste a list of URLs. Click process. Walk away. TokScript extracts every transcript in the background and notifies you when your library is ready."
- **CTA Button:**
  - Text: "Start Batch" with ArrowRight icon
  - Link: "/"
  - Background: #0ea5e9 (sky blue)
  - Shadow: 0 4px 14px rgba(14, 165, 233, 0.4)
- **Visual:** Animated batch processing UI showing 50 URL detection with status indicators (pending, processing, done)

### Core Value Section
- **Title:** "Don't do robot work."
- **Subtitle:** "If you're paying a VA to copy and paste links for hours, you're wasting money. If you're doing it yourself, you're wasting time. Software should handle the extraction; you should handle the strategy."

#### Comparison: Without TokScript vs With TokScript
**Without (Left side):**
- Label: "Standard Process"
- Heading: "The Assembly Line"
- Copy: "Processing 100 videos manually takes hours. It's error-prone, boring, and completely unscalable for any serious agency or research team."
- Visual: Faux UI panel showing manual workflow with error states

**With (Right side - Hover Interactive):**
- Label: "TokScript Bulk Engine"
- Heading: "Parallel Extraction"
- Copy: "We take your list and run it through multiple extraction servers at once. A batch of 50 videos takes about 2 minutes. Go get a coffee."
- Visual: Animated progress indicator showing processing steps

### Timeline Section: How to Bulk Import
**Section Title:** "How to Bulk Import"
**Subtitle:** "Drop the links in. Get a structured database out. Three steps."

#### Three Steps

1. **Compile Your Links**
   - Watermark: "01"
   - Title: "Compile Your Links"
   - Description: "Gather all the TikTok or Instagram Reels URLs you want to analyze. Drop them into a simple text file or copy the column directly from Google Sheets."

2. **Paste and Run**
   - Watermark: "02"
   - Title: "Paste and Run"
   - Description: "Open the TokScript dashboard, navigate to Bulk Import, and paste your list. The system validates the links immediately and starts extraction."

3. **Download Master CSV**
   - Watermark: "03"
   - Title: "Download Master CSV"
   - Description: "Once finished, you get a single, unified CSV file. Every video's transcript, engagement stats, and metadata lined up in columns and ready to work with."

### Bento Grid Section: Built for Scale
**Section Title:** "Built for Scale"
**Subtitle:** "The kind of features that matter when you're processing hundreds of videos at a time, not one."

#### Five Feature Cards

1. **Graceful Failure** (spans 2 columns on desktop)
   - Kicker: "Graceful Failure" (color: #38bdf8)
   - Heading: "Never loses progress."
   - Copy: "In a batch of 500, a few videos might be deleted or private. Standard tools crash and lose your progress. TokScript marks the bad link as failed, logs the error, and keeps processing the other 499."
   - Visual: Animated error handling UI showing video status indicators with failure states

2. **TikTok, Reels, Shorts** (1 column)
   - Heading: "TikTok, Reels, Shorts"
   - Copy: "Your research list probably includes videos from multiple platforms. Paste TikTok, Instagram, and YouTube URLs together. TokScript detects each automatically."
   - Visual: Animated multi-platform visualization with logo blocks (TikTok black, Instagram gradient, YouTube red)

3. **Email Notifications** (1 column)
   - Heading: "Email Notifications"
   - Copy: "If you're processing hundreds of videos, we'll shoot you a quick email the second the master file is ready for download."
   - Visual: Animated email notification appearance with progress bar

4. **Trend Hunting** (1 column)
   - Heading: "Trend Hunting"
   - Copy: "Input URLs from the top 100 trending sounds this week, export the CSV, and find the exact script formats that are working right now."
   - Visual: Animated bar chart with trending indicator badge

5. **Agency Workflows** (1 column)
   - Heading: "Agency Workflows"
   - Copy: "Built for onboarding multiple clients at once. Run a batch extraction for every competitor in their niche before the kickoff call."
   - Visual: Animated client workflow cards with progress indicators

### FAQ Section
**Section Title:** "Questions? We got you."

#### FAQ Items (4 total)

1. **Q:** "How many videos can I process at once?"
   **A:** "With a Pro plan, you can batch up to 500 URLs at a single time. We utilize parallel processing so large batches complete rapidly."

2. **Q:** "What formats do you support for import?"
   **A:** "You can simply copy and paste a list of URLs from any spreadsheet, text file, or database. As long as there's one URL per line, we'll detect and process it."

3. **Q:** "What happens if a link is broken or private?"
   **A:** "Our system gracefully handles errors. If a video is deleted or private, it will be marked as 'Failed' in your batch report, but the rest of the batch will continue processing normally."

4. **Q:** "Do I get a single export file?"
   **A:** "Yes. Once a batch completes, you can download a master CSV file containing every transcript, title, view count, and publish date across all the URLs you provided."

### Final CTA Section
- **Background:** #020617
- **Heading:** "Ready to scale up?"
- **Copy:** "Stop pasting links one by one. Process your entire backlog today."
- **CTA Button:** "Start Bulk Import"
  - Link: "/"
  - Background: #0ea5e9

### Footer Component
- Standard TokScript footer

## Technical Implementation

- Client-side rendered component ("use client")
- Uses Framer Motion for animations
- Interactive state management for FAQ accordion
- Multiple animated component visualizations
- Hover-triggered animations on feature cards
- Responsive grid layout (3 columns desktop, adapts mobile)
- Noise overlay SVG effect
- Glass-panel design for hero visual
- Color-coded accent elements matching feature theme (sky blue #0ea5e9)
