## Heading Structure Issues on `/instagram-transcript-generator` — Response

All 5 issues are already fixed in the local codebase on branch `homeupdates2`. The changes haven't been committed/pushed yet, which is why staging still shows the broken hierarchy.

---

### Issue-by-Issue Status

**1. H1 jumps to H3 (skips H2)** — Fixed
"Preview: Your Dashboard Awaits", "How to Generate a Transcript", "Pricing", "Who Uses", and "Ready to Convert" were all `H3`. Changed to `H2`.

**2. FAQ questions are all tagged as H2** — Fixed
Bootstrap's `Accordion.Header` defaults to `H2`. Added explicit `as="h3"` to every accordion item. The FAQ section title ("Frequently Asked Questions") was `H3`, changed to `H2` so the hierarchy is H2 parent > H3 items.

**3. Stats numbers are tagged as H2** — Fixed
"2.6M+", "190K+", "120K+", "84M+" in `CounterComponent.jsx` changed from `<h2>` to `<span>`.

**4. Feature sections skip H3** — Fixed
"Bulk Instagram Transcript Import", "Cloud Transcript Library", "History and Folders", "HD Video and Cover Image Download", "Instagram Transcript URL Shortcut", and "AI Agents for Instagram Content Creators" were all `H4` under an `H2`. Changed to `H3`.

**5. About section and use cases are H4 with no parent** — Fixed
"About TokScript" changed from `H4` to `H2`. "Instagram Ads Research", "UGC Creator Workflows", "AI-Powered Content Production" changed from `H4` to `H3`.

---

### Files Changed

- `src/templates/instagram-reels/LandingPage.js` — all section heading levels corrected
- `src/components/FaqSection.js` — title H3 > H2, accordion items explicit `as="h3"`
- `src/components/CounterComponent.jsx` — stat amounts `<h2>` > `<span>`

---

### Current Heading Hierarchy (Local)

Matches the requested structure:

```
H1: Instagram Transcript Generator
  H2: Preview: Your Dashboard Awaits
  H2: How to Generate a Transcript from Instagram
    H3: Copy the Instagram Reel Link
    H3: Paste It Into TokScript
    H3: Download Your Instagram Transcript
  H2: Instagram Reels Transcript & Download Platform
    H3: Bulk Instagram Transcript Import
    H3: Cloud Transcript Library
    H3: History and Folders
    H3: HD Video and Cover Image Download
    H3: Instagram Transcript URL Shortcut
    H3: AI Agents for Instagram Content Creators
  H2: Pricing
    H3: Free / Annual / Monthly
  H2: Who Uses TokScript's Instagram Transcript Generator
    H3: Content Creators
    H3: Educators and Researchers
    H3: Marketers and Ad Analysts
    H3: AI and Automation Users
    H3: UGC Creators and Influencers
  H2: Frequently Asked Questions
    H3: (all FAQ items via Bootstrap Accordion as="h3")
  H2: Ready to Convert Your First Reel?
  H2: About TokScript: Free Instagram Transcript Generator
    H3: Instagram Ads Research
    H3: UGC Creator Workflows
    H3: AI-Powered Content Production
```

### Next Step

Commit and push the unstaged changes on `homeupdates2` so staging reflects the fixes.
