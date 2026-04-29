# Cloud Storage Feature Page Documentation

**URL:** https://tokscript.com/features/cloud-storage

**Source Files:**
- src/app/features/cloud-storage/page.js
- src/app/features/cloud-storage/PageData.js

## Metadata

- **Title:** Transcript Cloud Library - Save, Search & Organize Video Transcripts | TokScript
- **Description:** Every transcript you extract saves to your searchable cloud library. Organize into folders, search by keyword, access from any device. Never lose a reference again.
- **Canonical:** https://tokscript.com/features/cloud-storage
- **Keywords:** transcript cloud storage, video transcript library, save tiktok transcripts, transcript organizer, searchable transcript database, video research library, content swipe file tool
- **OpenGraph Title:** Transcript Cloud Library | TokScript
- **OpenGraph Description:** Every transcript you extract saves to your searchable cloud library.
- **OpenGraph URL:** https://tokscript.com/features/cloud-storage

## Page Sections

### Header Component
- Standard TokScript header navigation

### Hero Section
- **Kicker Badge:**
  - Icon: Cloud icon
  - Text: "CLOUD LIBRARY"
- **H1 Title:** "Every Transcript You Extract. Saved. Searchable. Forever."
  - Subtitle gradient: linear-gradient(135deg, #ffffff 0%, #bbf7d0 100%)
- **Description:** "Stop losing references to browser tabs and forgotten bookmarks. TokScript saves every transcript to your cloud library the moment you extract it. Organized, searchable, and accessible from any device you own."
- **CTA Button:**
  - Text: "Start Building Your Library" with ArrowRight icon
  - Link: "/"
  - Background: #22c55e (green)
  - Text color: #000
  - Shadow: 0 4px 14px rgba(34, 197, 94, 0.4)
- **Visual:** Animated library search UI showing search interaction and results highlighting

### Core Value Section
- **Title:** "Stop building graveyards of good intentions."
- **Subtitle:** "You've extracted hundreds of transcripts. Viral hooks. Winning scripts. Perfect CTAs. But when you actually need that one transcript, you can't find it. Your research is only valuable if you can retrieve it."

#### Comparison: Without Cloud Storage vs With Cloud Storage
**Without (Left side):**
- Label: "Standard Process"
- Heading: "Scattered Files"
- Copy: "Content gold scattered across browser history, random downloads folders, and notes apps you forgot existed. Good luck finding any of it when you actually need it."
- Visual: Faux UI panel showing downloads folder, untitled documents, and failed search states

**With (Right side - Hover Interactive):**
- Label: "TokScript Cloud"
- Heading: "Instant Retrieval"
- Copy: "Every extraction automatically lands in one centralized database. Search by keyword across thousands of videos and get the exact quote highlighted in seconds."
- Visual: Animated library search showing type-ahead with matching results

### Timeline Section: How Your Transcript Library Works
**Section Title:** "How Your Transcript Library Works"
**Subtitle:** "You don't have to change anything about how you work. The library just happens in the background."

#### Three Steps

1. **Extract Transcripts Like Normal**
   - Watermark: "01"
   - Title: "Extract Transcripts Like Normal"
   - Description: "Use TokScript to extract any transcript: single video, bulk import, or collection import. Nothing changes about your workflow."

2. **Everything Saves Automatically**
   - Watermark: "02"
   - Title: "Everything Saves Automatically"
   - Description: "Every transcript lands in your cloud library the moment extraction finishes. Video metadata, cover image, engagement stats, all of it captured and stored without you lifting a finger."

3. **Search, Organize, Retrieve**
   - Watermark: "03"
   - Title: "Search, Organize, Retrieve"
   - Description: "Search across your entire library by keyword. Create folders for different projects or clients. When you need a transcript, you find it in seconds."

### Bento Grid Section: A Research Library That Actually Works
**Section Title:** "A Research Library That Actually Works"
**Subtitle:** "Find what you saved, the moment you need it."

#### Four Feature Cards

1. **Folder Organization** (spans 2 columns on desktop)
   - Kicker: "Folder Organization" (color: #4ade80)
   - Heading: "Organize However Makes Sense to You"
   - Copy: "Create folders for projects, clients, niches, content types, whatever system works for you. Drag transcripts between folders. Nest subfolders as deep as you want."
   - Visual: Animated folder tree structure showing expansion on hover

2. **Search Every Word** (1 column)
   - Heading: "Search Every Word"
   - Copy: "TokScript searches across every transcript in your library, not just titles. That hook you half-remember from three weeks ago? Type two words and it's right there."
   - Visual: Animated global search grid with match highlighting and scanning effect

3. **Access Anywhere** (1 column)
   - Heading: "Access Anywhere"
   - Copy: "Access your transcript library from any device with a browser. Started research on desktop, need to pull something up on your phone? Same library. Same data. Nothing to sync."
   - Visual: Animated device visualization showing laptop and mobile device with sync animation

4. **Context Saved With Every Transcript** (spans 2 columns on desktop)
   - Heading: "Context Saved With Every Transcript"
   - Copy: "Transcripts alone aren't enough. TokScript saves the video's view count, likes, comments, posting date, creator handle, and hashtags alongside every transcript. So when you come back to it, you know exactly what you're looking at and why it mattered."
   - Visual: Animated transcript with metadata cards (views, date, engagement metrics) sliding in

### FAQ Section
**Section Title:** "Got questions?"

#### FAQ Items (5 total)

1. **Q:** "Do I have to manually save each transcript?"
   **A:** "No. Every transcript you extract saves to your library automatically. Single extractions, bulk imports, collection imports: all land in your library without any extra steps."

2. **Q:** "Is there a limit on how many transcripts I can store?"
   **A:** "Paid plans include unlimited transcript storage. Free accounts have limits on extraction, but any transcript you successfully extract will be saved. Most active users have libraries with thousands of transcripts."

3. **Q:** "Can I export my transcripts?"
   **A:** "Yes. You can export individual transcripts as text files, or export multiple transcripts at once. Your data belongs to you. If you ever want to leave TokScript, you can take your library with you."

4. **Q:** "How does search work?"
   **A:** "TokScript searches the full text of every transcript in your library, not just titles or tags. Type any word or phrase, and results appear instantly with your search terms highlighted. You can also filter by platform, date range, or engagement metrics."

5. **Q:** "Can I access my library on mobile?"
   **A:** "Yes. Your library lives in the cloud and is accessible from any device with a web browser. Same interface, same search, same folders. Transcripts you add on desktop appear on mobile immediately."

### Final CTA Section
- **Background:** #020617
- **Heading:** "Stop Losing Your Best Research."
- **Copy:** "Every transcript you extract is research you've already done. The work is finished. All you need is a place to keep it where you can actually find it again. That's what TokScript's cloud library does."
- **CTA Button:** "Start Building Your Library →"
  - Link: "/"
  - Background: #22c55e (green)
  - Text color: #000

### Footer Component
- Standard TokScript footer

## Technical Implementation

- Client-side rendered component ("use client")
- Uses Framer Motion for animations
- Interactive state management for FAQ accordion
- Multiple animated component visualizations including:
  - Library search with typing animation
  - Folder tree expansion on hover
  - Global search grid with match highlights
  - Device visualization with sync animation
  - Metadata cards sliding in from sides
- Hover-triggered animations on feature cards
- Responsive grid layout (3 columns desktop, adapts mobile)
- Noise overlay SVF effect
- Glass-panel design for hero visual
- Timeline line with gradient (green #22c55e to lighter green)
- Color-coded accent elements matching feature theme (green #22c55e)
