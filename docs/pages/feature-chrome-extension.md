# Chrome Extension Feature Page Documentation

**URL:** https://tokscript.com/features/chrome-extension

**Source Files:**
- src/app/features/chrome-extension/page.js
- src/app/features/chrome-extension/PageData.js

## Metadata

- **Title:** Chrome Extension | TokScript
- **Description:** Install the TokScript Chrome extension for one-click video transcription directly on TikTok, Instagram, and YouTube.
- **Canonical:** https://tokscript.com/features/chrome-extension
- **Keywords:** Chrome extension, browser extension, TikTok extension, one-click transcription, browser tool
- **OpenGraph Title:** N/A (not specified in metadata)
- **OpenGraph Description:** N/A (not specified in metadata)
- **OpenGraph URL:** N/A (not specified in metadata)

## Page Sections

### Header Component
- Standard TokScript header navigation

### Hero Section
- **Kicker Badge:**
  - Icon: Chrome icon
  - Text: "CHROME EXTENSION"
- **H1 Title:** "Capture inspiration. Don't break your scroll."
  - Subtitle gradient: linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)
- **Description:** "The moment you open a new tab to copy-paste a URL, you've ruined your research flow. Hit the extension, grab the transcript, and keep scrolling."
- **CTA Button:**
  - Text: "Add to Chrome" with ArrowRight icon
  - Link: "https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
  - Background: #3b82f6 (blue)
  - Opens in new tab with noopener
  - Shadow: 0 4px 14px rgba(59, 130, 246, 0.4)
- **Visual:** Animated browser window showing extension detection and popup workflow

### Core Value Section
- **Title:** "Friction kills ideas."
- **Subtitle:** "If saving a video feels like doing chores, you'll stop doing it. You'll tell yourself 'I'll remember that hook,' and then you'll forget it five minutes later."

#### Comparison: Without Extension vs With Extension
**Without (Left side):**
- Label: "Standard Tools"
- Heading: "The Admin Tax"
- Copy: "Every time you leave the platform to save something, you're paying a tax on your attention. You lose your place, you lose your momentum, and half the time you forget why you opened that tab in the first place."
- Visual: Faux UI panel showing context switching workflow with 5 steps (Find video, Open new tab, Navigate to tool, Paste and wait, Forget what you were doing)

**With (Right side - Hover Interactive):**
- Label: "TokScript Extension"
- Heading: "Stay in the Feed"
- Copy: "We built the tool into the browser so you never have to leave the feed. See it, click it, it's saved in your vault. Move on to the next one."
- Visual: Animated workflow card showing 3 cycling steps (Scrolling feed, Found a banger, Click extension saved)

### Timeline Section: How it feels to use
**Section Title:** "How it feels to use"
**Subtitle:** "You won't even notice it's there until you need it. That's the point."

#### Three Steps

1. **Pin It**
   - Watermark: "01"
   - Title: "Pin It"
   - Description: "Install from the Web Store and pin the icon to your toolbar. Log in once and you're connected. That's the entire setup."

2. **Scroll Normally**
   - Watermark: "02"
   - Title: "Scroll Normally"
   - Description: "Go about your day. Doomscroll TikTok, research on Reels, study Shorts. The extension sits in the background doing nothing until you tell it to."

3. **Click & Capture**
   - Watermark: "03"
   - Title: "Click & Capture"
   - Description: "Hear a hook you want to steal? Click the blue icon. We detect the URL, rip the transcript, and sync it to your library in about 2 seconds. You never leave the page."

### Bento Grid Section: Little details that matter
**Section Title:** "Little details that matter"
**Subtitle:** "Built for people who do this hundreds of times a week and don't want to think about it."

#### Five Feature Cards

1. **Keyboard Shortcuts** (spans 2 columns on desktop)
   - Kicker: "Power User Ready"
   - Heading: "Keyboard Shortcuts"
   - Copy: "Prefer the keyboard? Set up a custom Chrome shortcut to trigger the extraction without taking your hands off the keys. One keystroke. Done."
   - Visual: Animated keyboard shortcut visualization showing Option/Alt + T keys with hover effects

2. **Zero Setup Detection** (1 column)
   - Heading: "Zero Setup Detection"
   - Copy: "You don't need to highlight or copy anything. If a video is playing on your screen, the extension already knows the URL."
   - Visual: Animated detection indicator with pulsing Zap icon and "Video Detected" badge

3. **Cloud Sync** (1 column)
   - Heading: "Cloud Sync"
   - Copy: "No text files dumped into your downloads folder. Every transcript syncs directly to your private TokScript dashboard. Organized, searchable, and backed up."
   - Visual: Animated data sync visualization with document and cloud refresh icon

4. **Sidebar Mode** (1 column)
   - Heading: "Sidebar Mode"
   - Copy: "Opens a sidebar right next to the video. Copy hooks, read the script, take notes. All without blocking the content you're watching."
   - Visual: Animated sidebar panel appearing from right edge with expanding animation

5. **Context Menu** (1 column)
   - Heading: "Context Menu"
   - Copy: "Right-click any video link on any webpage to extract it without even opening it. The transcript shows up in your dashboard like you were never there."
   - Visual: Animated context menu appearing on right-click with "Extract Transcript" option highlighted

### FAQ Section
**Section Title:** "Got questions?"

#### FAQ Items (4 total)

1. **Q:** "Is the Chrome extension free?"
   **A:** "Yes. The extension is a free companion tool to your TokScript account. Free accounts can extract a limited number per day; Pro accounts get unlimited extractions."

2. **Q:** "Does it work on Arc, Brave, or Edge?"
   **A:** "Yes. It works on any Chromium-based browser. Just install it directly from the Chrome Web Store."

3. **Q:** "Do I need to be logged in?"
   **A:** "Yes. Click the extension icon once to log in. After that, it securely syncs every transcript directly to your cloud dashboard."

4. **Q:** "Which platforms does the extension detect?"
   **A:** "It currently auto-detects videos on TikTok.com, Instagram.com (Reels), and YouTube.com (Shorts)."

### Final CTA Section
- **Background:** #09090b
- **Heading:** "Upgrade your browser."
- **Copy:** "Your Chrome is just a browser right now. Add TokScript and it becomes a content research engine. Free to install. Free to try."
- **CTA Button:** "Add to Chrome"
  - Link: "https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
  - Opens in new tab with noopener
  - Background: #3b82f6

### Footer Component
- Standard TokScript footer

## Technical Implementation

- Client-side rendered component ("use client")
- Uses Framer Motion for animations
- Interactive state management for FAQ accordion
- Multiple animated component visualizations including:
  - Extension popup workflow with step timing
  - Workflow card with cycling animation
  - Keyboard shortcut key animations
  - Auto-detect pulsing effect
  - Cloud sync progress animation
  - Sidebar expansion animation
  - Context menu appearance animation
- Hover-triggered animations on feature cards
- Responsive grid layout (3 columns desktop, adapts mobile)
- Noise overlay SVG effect
- Glass-panel design for hero visual
- Color-coded accent elements matching feature theme (blue #3b82f6)
