# About Page v3 Rewrite Spec

## Overview
Rewrite `src/app/about-us/PageData.js` to use the correct SCSS class names from `src/App.scss` (starting at line 9984, `.about-v3 {}` block) and update all copy from the new content document.

## CRITICAL RULES
- **NEVER use em dashes (—) or en dashes (–) anywhere.** Replace with commas, periods, semicolons, or colons.
- **NEVER use `&mdash;`** in JSX either.
- Keep the existing utility components: `AnimatedCounter`, `useScrollReveal`, `AnimatedSection`, `StaggerSection`
- Keep the `useInView` import from framer-motion (used by AnimatedCounter)
- Keep the Accordion import from react-bootstrap
- Keep the Link import from next/link
- Keep Header and Footer imports
- The `<main>` tag must have `className="about-v3"` (NOT about-page-v2)

## Section-by-Section Structure

### 1. Hero (`.av3-hero`)
```
<AnimatedSection className="av3-hero" immediate>
  <div className="av3-hero__glow"></div>
  <div className="container">
    <div className="av3-hero__badge">About TokScript</div>
    <h1 className="av3-hero__heading">The Story Behind 84M+ Minutes.</h1>
    <p className="av3-hero__subtitle">
      Every viral video has a script nobody talks about. The hook that stopped the scroll. The CTA that closed the sale. The structure that made 10 million people watch til the end. We've pulled the text out of 2.6 million videos so you don't have to guess what works. You just look.
    </p>
  </div>
</AnimatedSection>
```

### 2. Stats Ticker (`.av3-ticker`)
Scrolling marquee with stats. The SCSS has styling for a horizontal scrolling ticker.
```
<section className="av3-ticker">
  <div className="av3-ticker__fade-left"></div>
  <div className="av3-ticker__fade-right"></div>
  <div className="av3-ticker__track">
    <!-- Duplicate items twice for infinite scroll -->
    {[repeat twice]}
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Videos Processed</span>
      <span className="av3-ticker__value">2.6M+</span>
    </div>
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Profiles Analyzed</span>
      <span className="av3-ticker__value">190,000+</span>
    </div>
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Hours Saved</span>
      <span className="av3-ticker__value">120,000+</span>
    </div>
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Minutes Transcribed</span>
      <span className="av3-ticker__value">84M+</span>
    </div>
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Active Monthly Users</span>
      <span className="av3-ticker__value">41,000+</span>
    </div>
    <div className="av3-ticker__item">
      <span className="av3-ticker__dot"></span>
      <span className="av3-ticker__label">Tracked Sales</span>
      <span className="av3-ticker__value">$10M+</span>
    </div>
    {[/repeat]}
  </div>
</section>
```

### 3. Mission + Problem (`.av3-mission`)
Two-column layout. Left: "What Is TokScript" mission items. Right: "The Problem We Solve" card.

Left column has section title + 3 mission items with colored icons (indigo, purple, cyan):
- **Content Intelligence** (indigo icon): "We aren't just a downloader. We rip the text out of TikToks, Reels, and Shorts so you can see every hook, every CTA, every transition that made a video perform. You can't learn that by watching. You learn it by reading."
- **Unlocking The Data** (purple icon): "The creator economy runs on video, but the 'alpha' (hooks, scripts, CTAs) is locked inside the file. Nobody gives you the transcript. Nobody breaks down the structure. We do. And once you see it on paper, you can't unsee what makes viral content work."
- **Built for Commerce** (cyan icon): "This isn't for meetings. This isn't for podcasts. This is for the scripts behind videos that move product, build audiences, and generate billions in sales. If you sell on TikTok Shop or run a content agency, this is where your research starts."

Right column is problem card with:
- Title: "The Problem We Solve"
- Bad item 1 (red icon): "Manual Transcription is Dead" / "Manually transcribing a 60-second video takes 15 minutes. Multiply that by the 50 videos you saved this week. That's your entire day gone."
- Bad item 2 (red icon): "Generic Tools Fail" / "Meeting tools like Otter.ai aren't built for TikTok links. They require extra steps, extra downloads, and give you a wall of text with zero structure."
- Divider
- Good item (indigo icon): "The TokScript Solution" / "Paste a URL. Get the text. See the structure. 15 seconds. Done."

Use SVG icons: X-circle for bad items, checkmark-circle for good item. Use the same SVG patterns already in the existing code.

SCSS classes: `.av3-mission`, `.av3-mission__grid`, `.av3-mission__items`, `.av3-mission__item`, `.av3-mission__item-icon`, `.av3-mission__item-icon--indigo/--purple/--cyan`, `.av3-mission__item-title`, `.av3-mission__item-desc`, `.av3-mission__problem-card`, `.av3-mission__problem-glow`, `.av3-mission__problem-title`, `.av3-mission__problem-items`, `.av3-mission__problem-item`, `.av3-mission__problem-item--bad/--good`, `.av3-mission__problem-icon`, `.av3-mission__problem-icon--red/--indigo`, `.av3-mission__problem-divider`

### 4. Digital Graveyard (`.av3-graveyard`)
```
<AnimatedSection className="av3-graveyard">
  <div className="container">
    <div className="av3-graveyard__badge">The "Digital Graveyard"</div>
    <h2 className="av3-graveyard__heading">The Storage-Retrieval Problem</h2>
    <div className="av3-graveyard__prose">
      <p>You already know what this looks like. Hundreds of bookmarked TikToks. Saved Reels you swore you'd come back to. Favorited Shorts sitting in a list you haven't opened in weeks. Every creator has a graveyard of content they saved with good intentions and never touched again.</p>
      <p>The problem isn't saving. The problem is there's no way to search, organize, or do anything useful with what you saved.</p>
    </div>
    <div className="av3-graveyard__callout">
      <p>TokScript fixes that. We take that graveyard and turn it into a searchable, exportable library you can actually work from.</p>
    </div>
  </div>
</AnimatedSection>
```

### 5. Personas + Case Study (`.av3-personas`)
5 persona cards in a grid, then a case study card below.

Persona cards (use the same SVG icons object from existing code - videoCamera, building, shoppingBag, chart, book):
- **Creators & Influencers** (videoCamera): "Stop staring at a blank page. Pull the transcripts from videos that already blew up, study the hooks, study the structure, and build an inspiration library that writes your next script for you."
- **Marketing Agencies** (building): "Paste 50 URLs. Get 50 transcripts. Cut your content research time by 80% and build content calendars based on what's actually going viral right now, not what some trend report said two months ago."
- **TikTok Shop Sellers** (shoppingBag): "The difference between a video that gets 10 sales and one that gets 10,000 is the script. Study the exact words behind the top-converting product videos in your niche. Sellers using TokScript have watched their conversion rates go from 0.5% to 5%."
- **Market Researchers** (chart): "Download transcripts from entire TikTok collections in bulk. Run analysis across thousands of videos. Spot the patterns, track the trends, and find the gaps your competitors are sleeping on."
- **Educators & Students** (book): "Make short-form video accessible. Support deaf/hard of hearing communities. Run academic analysis on viral media with real transcript data."

Case study card below personas:
```
<div className="av3-personas__case-study">
  <div className="av3-personas__case-glow"></div>
  <div className="av3-personas__case-left">
    <div className="av3-personas__case-badge">Case Study</div>
    <h3 className="av3-personas__case-title">TikTok Shop Impact</h3>
    <p className="av3-personas__case-desc">Real numbers from sellers who used TokScript to study what was working, rewrote their scripts based on the data, and watched everything change.</p>
  </div>
  <div className="av3-personas__case-right">
    <!-- 4 metric cards -->
    Conversion Rate: 0.5% → 5.0%
    Avg Order Value: $25 → $35
    Monthly Revenue: $2,000 → $20,000+
    Views to Sale: 200:1 → 20:1
  </div>
</div>
```

Each metric card:
```
<div className="av3-personas__metric">
  <p className="av3-personas__metric-label">LABEL</p>
  <div className="av3-personas__metric-values">
    <span className="av3-personas__metric-before">BEFORE</span>
    <span className="av3-personas__metric-arrow">→</span>
    <span className="av3-personas__metric-after">AFTER</span>
  </div>
</div>
```

### 6. Features Grid + AI Showcase (`.av3-features`)
Section title badge: "Platform Capabilities"
Section heading: "Complete Feature Set"

9 feature cards in `.av3-features__grid` using `.av3-feature-card`:
Each card has: `.av3-feature-card__icon` (with SVG), `.av3-feature-card__title`, `.av3-feature-card__desc`

Features:
1. **Transcript Extraction**: "Accurate text from TikTok (up to 10m), Reels, and Shorts. 100+ languages. Paste a link, get the words. That's it."
2. **Bulk Processing**: "Paste up to 50 URLs at once. What used to be a full day of manual copy-paste is now a 30-second operation."
3. **Collection Import**: "Import an entire TikTok collection or Playlist through one link. Up to 10,000 videos. All of them. At once."
4. **HD Video Download**: "Clean, watermark-free HD downloads (1080p) for repurposing, editing, or archiving."
5. **Viral AI Agents**: "3 custom agents: Hook Generator, Script Writer, and Virality Explainer. Trained on 20,000+ videos that actually went viral. Purpose-built for short-form content."
6. **History Dashboard**: "Every video you've ever transcribed, saved permanently. Searchable, organized, and waiting for you the next time you need it."
7. **Folder System**: "Organize by client, campaign, niche, or whatever system works for you. Syncs across web and Chrome extension."
8. **Chrome Extension**: "Extract transcripts without leaving TikTok, Instagram, or YouTube. No tab switching. No copy-pasting URLs."
9. **6 Export Formats**: "Download as TXT, CSV, XLSX, JSON, XML, or PDF. Individual files or bulk exports."

Use simple SVG icons for each (document, layers, folder, download, sparkles, clock, folder-open, chrome, file-export).

Then AI Showcase card below the grid:
```
<div className="av3-features__showcase">
  <div className="av3-features__showcase-bg"><!-- large SVG icon --></div>
  <div className="av3-features__showcase-inner">
    <div className="av3-features__showcase-left">
      <h3 className="av3-features__showcase-title">Trained on 20,000+ Viral Videos</h3>
      <p className="av3-features__showcase-desc">Most AI tools are trained on internet text and hope for the best. Ours were trained on 20,000+ short-form videos that actually blew up across TikTok, Reels, and Shorts. That's the difference between generic advice and hooks that have already been proven to stop the scroll and drive sales.</p>
      <div className="av3-features__showcase-tags">
        <span className="av3-features__tag">Hook Generator</span>
        <span className="av3-features__tag">Script Rewriter</span>
      </div>
    </div>
    <div className="av3-features__showcase-right">
      <div className="av3-features__io-card av3-features__io-card--input">
        <p className="av3-features__io-label">Input</p>
        <p className="av3-features__io-text">"Stop trying to save money on..."</p>
      </div>
      <div className="av3-features__io-card av3-features__io-card--output">
        <p className="av3-features__io-label">AI Output (Hook)</p>
        <p className="av3-features__io-text">"You're broke because you think saving works."</p>
      </div>
    </div>
  </div>
</div>
```

### 7. Why Different (`.av3-diff`)
Badge: "Why TokScript Is Different"
Heading: "Comparison"

6 cards with green checkmark icons:
1. **Only Multi-Platform Tool**: "TikTok, Reels, and Shorts. One dashboard. Nobody else does all three."
2. **Only Bulk Processor**: "50 URLs at once. Not one at a time like every other tool on the market."
3. **Only Collection Importer**: "Paste one collection link, get up to 10,000 transcripts. Try doing that anywhere else."
4. **Built-In AI Agents**: "Not just text extraction. Our agents generate hooks and scripts trained on what's performing right now, not last year."
5. **HD Video Downloads**: "Clean, watermark-free downloads included with every plan."
6. **Persistent Library**: "Nothing gets deleted. The longer you use TokScript, the bigger and more valuable your research library becomes."

Each card:
```
<div className="av3-diff__card">
  <svg className="av3-diff__check"><!-- checkmark --></svg>
  <h4 className="av3-diff__card-title">TITLE</h4>
  <p className="av3-diff__card-desc">DESC</p>
</div>
```

### 8. How It Works (`.av3-how`)
Badge: "How TokScript Works"

6 steps in `.av3-how__steps`:
1. **Find a Video**: "Browse TikTok, Reels, or Shorts and find any public video."
2. **Copy the URL**: "Copy the link from your browser or share menu."
3. **Paste into TokScript**: "Use the web dashboard, Chrome extension, or Quick URL."
4. **Get Transcript**: "Full text extracted in seconds. Copy, download, or analyze."
5. **Use AI Agents**: "Generate hooks, scripts, or analysis on the spot."
6. **Save & Organize**: "Automatically saved to your history. Add to folders."

Each step:
```
<div className="av3-how__step">
  <span className="av3-how__step-num">01</span>
  <div>
    <h4 className="av3-how__step-title">TITLE</h4>
    <p className="av3-how__step-desc">DESC</p>
  </div>
</div>
```

### 9. Ecosystem (`.av3-ecosystem`)
Heading: "The TokScript Ecosystem"

4 cards with avatar icons:
- **TokBackup** (TB): "Complete TikTok profile archiving. Download every video a creator has ever posted."
- **TokComment** (TC): "TikTok comment analysis and engagement tools."
- **TokAudit** (TA): "TikTok profile auditing and analytics."
- **ReplyGuy** (RG): "Automated engagement and response management."

Each card:
```
<div className="av3-ecosystem__card">
  <div className="av3-ecosystem__card-avatar">TB</div>
  <div>
    <h4 className="av3-ecosystem__card-name">TokBackup <span className="av3-ecosystem__card-arrow">→</span></h4>
    <p className="av3-ecosystem__card-desc">DESC</p>
  </div>
</div>
```

### 10. Specs + Info (`.av3-specs`)
Two-column grid. Left: Technical specs table. Right: Commercial Use + Data Privacy info cards.

Left column - Technical Specs table:
```
<div className="av3-specs__table-card">
  <h3 className="av3-specs__card-title">Technical Specs</h3>
  <!-- rows -->
  Architecture: Cloud SaaS + Chrome Ext
  Processing: < 15s / Video
  Storage: Unlimited (Pro)
  Uptime: 99.9%
  Formats: TXT, CSV, JSON, XML, PDF
  API Access: RESTful API Available
</div>
```

Each row:
```
<div className="av3-spec-row">
  <span className="av3-spec-row__label">LABEL</span>
  <span className="av3-spec-row__value">VALUE</span>
</div>
```

Right column - Info cards:
```
<div className="av3-specs__info-cards">
  <div className="av3-specs__info-card">
    <h3 className="av3-specs__card-title">Commercial Use</h3>
    <p className="av3-specs__card-text">TokScript is built for business. You have full rights to use generated transcripts and content for commercial purposes, client work, and research.</p>
  </div>
  <div className="av3-specs__info-card">
    <h3 className="av3-specs__card-title">Data Privacy</h3>
    <p className="av3-specs__card-text">Your transcript history is private and encrypted. We don't delete your data when you change plans. Full export available anytime. We do not watermark or modify downloaded content.</p>
  </div>
</div>
```

### 11. International (`.av3-intl`)
```
<section className="av3-intl">
  <div className="container">
    <div className="av3-intl__badge">🌐 Global Platform</div>
    <p className="av3-intl__text">Serving 41,000+ users across 6 continents. Supporting transcript extraction in 100+ languages including Spanish, French, Portuguese, Japanese, Arabic, and more.</p>
  </div>
</section>
```

### 12. FAQ (`.av3-faq`)
Use react-bootstrap Accordion (same as current). Badge: "Frequently Asked Questions"

11 FAQ items (see faqData array below).

### 13. Final CTA (`.av3-final-cta`)
```
<AnimatedSection className="av3-final-cta">
  <div className="av3-final-cta__glow"></div>
  <div className="container av3-container">
    <h2 className="av3-final-cta__heading">Start Your Content Intelligence Engine</h2>
    <p className="av3-final-cta__subtitle">Stop guessing what works. 41,000+ creators already know. They pulled the transcripts, studied the scripts, and built their content on data instead of gut feelings. Your move.</p>
    <Link href="/pricing" className="av3-final-cta__btn">Start for Free →</Link>
    <p className="av3-final-cta__note">No Credit Card Required</p>
  </div>
</AnimatedSection>
```

## FAQ Data Array

```js
const faqData = [
  {
    title: "Is TokScript free to use?",
    content: "Yes. Your first transcripts are completely free, no account required (3 per day). With a free account, you get 10 per day. Premium plans ($10/month or $39/year) unlock unlimited transcripts, bulk processing, AI agents, and all advanced features.",
  },
  {
    title: "What platforms does TokScript support?",
    content: "TikTok (all public videos up to 10 minutes), Instagram Reels (all public Reels), and YouTube Shorts (videos up to 60 seconds).",
  },
  {
    title: "How accurate are the transcripts?",
    content: "TokScript extracts the caption data that each platform has already generated. For videos with clear audio, expect 95%+ accuracy.",
  },
  {
    title: "Can I use TokScript for commercial purposes?",
    content: "Yes. Agencies, consultants, e-commerce sellers, and research firms all use TokScript commercially with no restrictions.",
  },
  {
    title: "Do the AI agents cost extra?",
    content: "No. All three AI agents are included with your premium subscription. No additional charges.",
  },
  {
    title: "Can TokScript transcribe videos in languages other than English?",
    content: "Yes. TokScript extracts transcripts in whatever language is spoken, supporting 100+ languages across all platforms.",
  },
  {
    title: "Is there a limit on transcript extractions?",
    content: "Free users get 3 transcripts per day without an account, or 10 per day with a free account. Premium plans unlock unlimited transcript extractions with no daily caps.",
  },
  {
    title: "What happens to my data if I cancel my subscription?",
    content: "All your transcripts remain saved. Folder structure, search, and export abilities stay intact. You revert to free plan limits for new transcriptions only.",
  },
  {
    title: "Does TokScript work on mobile?",
    content: "Yes. The web dashboard is fully responsive and works in any mobile browser. The Chrome extension is available on desktop only, but all core features including transcription, bulk processing, and AI agents work on mobile.",
  },
  {
    title: "How is TokScript different from generic transcription tools?",
    content: "Tools like Otter.ai and Veed are built for long-form content like meetings and podcasts. TokScript is specifically built for short-form video with one-click extraction from a URL, bulk processing of 50+ videos, AI agents trained on viral content, and a persistent content library.",
  },
  {
    title: "How is TokScript different from video downloaders?",
    content: "Video downloaders give you the file. TokScript gives you the text, the script, and the hook structure. We include HD downloads with every plan, but the real value is turning video content into searchable, analyzable text you can study and build on.",
  },
];
```

## page.js Metadata Updates

Title: "About TokScript | The Story Behind 84M+ Minutes of Transcribed Video"
Description: "TokScript has transcribed 84M+ minutes across 2.6M+ videos. Extract transcripts from TikTok, Reels, and Shorts. Study viral scripts. Build better content. 41,000+ creators already do."
OG Title: "About TokScript | The Story Behind 84M+ Minutes of Transcribed Video"
OG Description: same as main description
Twitter title: same as OG title
Twitter description: same as main description
