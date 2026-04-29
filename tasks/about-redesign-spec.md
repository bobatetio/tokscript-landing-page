# About Us Page Redesign - Shared Spec

## Design System (from Pricing Page)
- **Card bg**: `rgba(2, 6, 23, 0.4)` + `backdrop-filter: blur(12px)` + `border: 1px solid #1e293b`
- **Accent**: `#22d3ee` (cyan) — replaces all indigo accents in section badges
- **Badge pill**: `background: rgba(34, 211, 238, 0.1)`, `border: 1px solid rgba(34, 211, 238, 0.2)`, `color: #22d3ee`
- **Section bg**: `#020617`
- **Card hover border**: `rgba(34, 211, 238, 0.3)`
- **Text primary**: `#f8fafc`, secondary: `#94a3b8`, muted: `#64748b`
- **Glow color**: `rgba(34, 211, 238, 0.15)` for glows (replaces indigo glows)

## What is UNTOUCHED
- Hero section (`av3-hero`) — JSX and SCSS
- Ticker section (`av3-ticker`) — JSX and SCSS
- Header/Footer components
- All JSON-LD schema markup + page metadata
- `AnimatedCounter`, `useScrollReveal`, `AnimatedSection` utilities
- SectionTitle component (badge gets restyled in SCSS only)
- FAQItem component
- FeatureCard component
- SpecRow component
- All data constants (METRICS, SHOP_METRICS, PERSONAS, DIFFERENTIATORS, ECOSYSTEM, FULL_FAQ)
- SCSS: Everything from `.about-v3 {` through line 10252 (end of ticker keyframes)

## SCSS: What Gets Replaced
Lines 10253-11399 in App.scss — everything from `// SECTION 3: MISSION` through the closing `}` of `.about-v3` responsive overrides. This is replaced with the new section styles below.

## Section Title Badge Restyle
The `.av3-section-title__badge` changes from indigo to cyan:
```scss
&__badge {
  display: inline-block;
  color: #22d3ee;
  font-weight: 700;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.2);
  padding: 4px 12px;
  border-radius: 100px;
}
```

The accent bar also shifts:
```scss
&__accent {
  background: linear-gradient(to right, #22d3ee, #06b6d4);
}
```

---

## Section 1: Mission + Problem (merged from old sections 3+4)
**Class**: `.av3-mission`
**Layout**: Left/right split grid on desktop (same as current). Below the grid, a full-width callout quote band absorbs the "Digital Graveyard" content.
**JSX changes**:
- Keep the existing mission grid (left: mission items, right: problem card) exactly as-is
- REMOVE the standalone `.av3-graveyard` section entirely
- ADD a callout band BELOW the grid, INSIDE `.av3-mission`, with class `.av3-mission__callout-band`
- The callout band contains the graveyard content as a quote-style element

**Callout band JSX** (after closing `</div>` of `.av3-mission__grid`, before closing `</div>` of `.av3-container`):
```jsx
<div className="av3-mission__callout-band">
  <div className="av3-mission__callout-icon">
    <Archive size={20} />
  </div>
  <div className="av3-mission__callout-content">
    <h3 className="av3-mission__callout-title">The "Digital Graveyard" Problem</h3>
    <p className="av3-mission__callout-text">
      People save content constantly. Bookmarked TikToks, saved Reels, favorited Shorts.
      Saved with the intention of studying them later. But "later" never comes, because
      there's no efficient way to retrieve and act on that content.
    </p>
    <p className="av3-mission__callout-highlight">
      TokScript bridges the gap. We turn scattered bookmarks into organized, searchable, exportable libraries.
    </p>
  </div>
</div>
```

**Callout band SCSS** (inside `.av3-mission`):
```scss
&__callout-band {
  margin-top: 64px;
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 32px;
  background: rgba(2, 6, 23, 0.4);
  backdrop-filter: blur(12px);
  border: 1px solid #1e293b;
  border-left: 3px solid #22d3ee;
  border-radius: 16px;
}

&__callout-icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22d3ee;
  flex-shrink: 0;
}

&__callout-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

&__callout-text {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.7;
  margin-bottom: 12px;
}

&__callout-highlight {
  font-size: 14px;
  color: #22d3ee;
  font-weight: 600;
  line-height: 1.7;
}
```

**Mission card accents shift to cyan**:
- Problem glow: `rgba(34, 211, 238, 0.1)` instead of indigo
- Solution icon bg: `#06b6d4` instead of `#6366f1`
- Solution icon shadow: `rgba(6, 182, 212, 0.3)`
- Hover borders on mission items: cyan tints

---

## Section 2: Who Uses TokScript (editorial rows, not card grid)
**Class**: `.av3-personas`
**Layout change**: Personas become horizontal editorial rows with border dividers (not card grid). Each row: icon left, title+desc right, separated by a `border-bottom: 1px solid #1e293b`.
**Case study**: metrics use `AnimatedCounter` for the "after" values.

**JSX changes for personas grid — replace the grid div entirely**:
```jsx
<div className="av3-personas__rows">
  {PERSONAS.map((persona, i) => (
    <div key={i} className="av3-personas__row">
      <div className="av3-personas__row-icon">{persona.icon}</div>
      <div className="av3-personas__row-content">
        <h3 className="av3-personas__row-title">{persona.title}</h3>
        <p className="av3-personas__row-desc">{persona.desc}</p>
      </div>
    </div>
  ))}
</div>
```

**JSX changes for case study metrics** — replace the static `{m.after}` with AnimatedCounter for numeric values:
For "5.0%", "35", "20,000+", "20:1" — use AnimatedCounter where possible. Since some values are complex strings, keep them as-is but wrap in a styled span. The key ones:
- Conversion Rate after: `<AnimatedCounter end={5} suffix=".0%" />`
- AOV after: `<AnimatedCounter end={35} prefix="$" suffix="" />`
- Monthly Revenue after: `<AnimatedCounter end={20} prefix="$" suffix=",000+" />`
- Views ratio after: keep as `"20:1"` (not countable)

**Personas SCSS**:
```scss
.av3-personas {
  padding: 96px 24px;
  background: #020617;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__rows {
    display: flex;
    flex-direction: column;
    margin-bottom: 64px;
  }

  &__row {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    padding: 28px 0;
    border-bottom: 1px solid #1e293b;
    &:first-child { padding-top: 0; }
    &:last-child { border-bottom: none; }
  }

  &__row-icon {
    width: 48px;
    height: 48px;
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid #1e293b;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__row-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 6px;
  }

  &__row-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
  }

  // Case Study — keep existing styles but shift green→cyan accent
  &__case-study {
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid #1e293b;
    border-radius: 24px;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    position: relative;
    overflow: hidden;
    @media (min-width: 992px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__case-glow {
    position: absolute;
    right: 0;
    top: 0;
    width: 256px;
    height: 256px;
    background: rgba(34, 211, 238, 0.05);
    filter: blur(80px);
    border-radius: 50%;
    pointer-events: none;
  }

  &__case-left {
    position: relative;
    z-index: 1;
    @media (min-width: 992px) { flex: 0 0 33.33%; }
  }

  &__case-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 100px;
    background: rgba(34, 211, 238, 0.1);
    color: #22d3ee;
    font-size: 11px;
    font-weight: 700;
    border: 1px solid rgba(34, 211, 238, 0.2);
    margin-bottom: 16px;
  }

  &__case-title {
    font-size: 30px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 8px;
  }

  &__case-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
  }

  &__case-right {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
    position: relative;
    z-index: 1;
    @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
    @media (min-width: 992px) { flex: 0 0 66.66%; }
  }

  &__metric {
    background: rgba(2, 6, 23, 0.8);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #1e293b;
    text-align: center;
  }

  &__metric-label {
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    font-weight: 700;
    margin-bottom: 8px;
  }

  &__metric-values {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  &__metric-before {
    font-size: 12px;
    color: #475569;
    text-decoration: line-through;
    text-decoration-color: rgba(239, 68, 68, 0.5);
  }

  &__metric-arrow { color: #475569; }

  &__metric-after {
    font-size: 20px;
    font-weight: 900;
    color: #22d3ee;
  }
}
```

---

## Section 3: What TokScript Does (merged features + differentiators)
**Class**: `.av3-features`
**Layout**: Two-column on desktop. Left: compact feature list (no cards, just icon+text rows). Right: AI showcase card. Below both: numbered differentiator strip.

**JSX structure**:
```jsx
<AnimatedSection className="av3-features">
  <div className="av3-container av3-container--wide">
    <SectionTitle subtitle="Platform">What TokScript Does</SectionTitle>
    <div className="av3-features__split">
      {/* Left: compact feature list */}
      <div className="av3-features__list">
        {/* 9 feature items as compact rows, NOT FeatureCard */}
        <div className="av3-features__list-item">
          <div className="av3-features__list-icon"><FileText size={18} /></div>
          <div>
            <h4 className="av3-features__list-title">Transcript Extraction</h4>
            <p className="av3-features__list-desc">Extracts accurate text from TikTok (up to 10m), Reels, and Shorts. Supports 100+ languages.</p>
          </div>
        </div>
        {/* ... repeat for all 9 features */}
      </div>
      {/* Right: AI showcase */}
      <div className="av3-features__showcase">
        {/* Same showcase content as current, just restyled */}
      </div>
    </div>
    {/* Differentiators strip below */}
    <div className="av3-features__diff-strip">
      {DIFFERENTIATORS.map((diff, i) => (
        <div key={i} className="av3-features__diff-item">
          <span className="av3-features__diff-num">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h4 className="av3-features__diff-title">{diff.title}</h4>
            <p className="av3-features__diff-desc">{diff.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</AnimatedSection>
```

**Features SCSS**:
```scss
.av3-features {
  padding: 96px 24px;
  background: #020617;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__split {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
    margin-bottom: 64px;
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
      gap: 64px;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__list-item {
    display: flex;
    gap: 16px;
    align-items: flex-start;
    padding: 20px 0;
    border-bottom: 1px solid rgba(30, 41, 59, 0.5);
    &:first-child { padding-top: 0; }
    &:last-child { border-bottom: none; }
  }

  &__list-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid rgba(34, 211, 238, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #22d3ee;
    flex-shrink: 0;
  }

  &__list-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  &__list-desc {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.6;
  }

  // Showcase (right column)
  &__showcase {
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid #1e293b;
    border-radius: 24px;
    padding: 40px;
    position: relative;
    overflow: hidden;
  }

  &__showcase-bg {
    position: absolute;
    top: 0;
    right: 0;
    padding: 32px;
    opacity: 0.15;
    color: #22d3ee;
  }

  &__showcase-inner {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  &__showcase-title {
    font-size: 26px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 16px;
  }

  &__showcase-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
    margin-bottom: 24px;
  }

  &__showcase-tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  &__tag {
    background: rgba(34, 211, 238, 0.1);
    color: #22d3ee;
    font-size: 12px;
    padding: 4px 12px;
    border-radius: 100px;
    border: 1px solid rgba(34, 211, 238, 0.2);
  }

  &__io-card {
    padding: 24px;
    border-radius: 16px;
    &--input {
      background: #020617;
      border: 1px solid #1e293b;
    }
    &--output {
      background: linear-gradient(135deg, #0891b2, #06b6d4);
      box-shadow: 0 20px 25px -5px rgba(8, 145, 178, 0.3);
    }
  }

  &__io-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 12px;
    .av3-features__io-card--input & { color: #64748b; }
    .av3-features__io-card--output & { color: rgba(255, 255, 255, 0.7); }
  }

  &__io-text {
    font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
    .av3-features__io-card--input & {
      color: #94a3b8;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .av3-features__io-card--output & {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      font-family: inherit;
    }
  }

  // Differentiator strip
  &__diff-strip {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    border: 1px solid #1e293b;
    border-radius: 16px;
    overflow: hidden;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__diff-item {
    display: flex;
    gap: 16px;
    padding: 24px;
    border-bottom: 1px solid #1e293b;
    align-items: flex-start;
    @media (min-width: 768px) {
      border-right: 1px solid #1e293b;
      &:nth-child(2n) { border-right: none; }
    }
    @media (min-width: 992px) {
      &:nth-child(2n) { border-right: 1px solid #1e293b; }
      &:nth-child(3n) { border-right: none; }
    }
    &:nth-last-child(-n+3) { border-bottom: none; }
    @media (max-width: 991px) {
      &:nth-last-child(-n+2) { border-bottom: none; }
    }
    @media (max-width: 767px) {
      &:last-child { border-bottom: none; }
    }
  }

  &__diff-num {
    font-size: 24px;
    font-weight: 900;
    color: rgba(34, 211, 238, 0.3);
    font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
    flex-shrink: 0;
    line-height: 1;
    margin-top: 2px;
  }

  &__diff-title {
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
  }

  &__diff-desc {
    font-size: 13px;
    color: #94a3b8;
    line-height: 1.6;
  }
}
```

---

## Section 4: How It Works
**Class**: `.av3-how`
**Layout**: 2-row x 3-col glassmorphic tiles on desktop, stacked on mobile.

**JSX**: Replace the current step list with a tile grid:
```jsx
<AnimatedSection className="av3-how">
  <div className="av3-container">
    <SectionTitle subtitle="Workflow">How TokScript Works</SectionTitle>
    <div className="av3-how__grid">
      {[
        { num: "01", title: "Find a Video", desc: "Browse TikTok, Reels, or Shorts and find any public video.", icon: <Search size={20} /> },
        { num: "02", title: "Copy the URL", desc: "Copy the link from your browser or share menu.", icon: <Globe size={20} /> },
        { num: "03", title: "Paste into TokScript", desc: "Use the web dashboard, Chrome extension, or Quick URL.", icon: <Zap size={20} /> },
        { num: "04", title: "Get Transcript", desc: "Full text extracted in seconds. Copy, download, or analyze.", icon: <FileText size={20} /> },
        { num: "05", title: "Use AI Agents", desc: "Generate hooks, scripts, or analysis instantly.", icon: <Sparkles size={20} /> },
        { num: "06", title: "Save & Organize", desc: "Automatically saved to your history. Add to folders.", icon: <Layers size={20} /> },
      ].map((step, i) => (
        <div key={i} className="av3-how__tile">
          <div className="av3-how__tile-header">
            <span className="av3-how__tile-num">{step.num}</span>
            <div className="av3-how__tile-icon">{step.icon}</div>
          </div>
          <h3 className="av3-how__tile-title">{step.title}</h3>
          <p className="av3-how__tile-desc">{step.desc}</p>
        </div>
      ))}
    </div>
  </div>
</AnimatedSection>
```

**How SCSS**:
```scss
.av3-how {
  padding: 96px 24px;
  background: #020617;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__tile {
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid #1e293b;
    border-radius: 16px;
    padding: 28px;
    transition: all 0.3s;
    &:hover {
      border-color: rgba(34, 211, 238, 0.3);
      background: rgba(15, 23, 42, 0.6);
    }
  }

  &__tile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__tile-num {
    font-size: 32px;
    font-weight: 900;
    color: rgba(34, 211, 238, 0.2);
    font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
    line-height: 1;
  }

  &__tile-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(34, 211, 238, 0.1);
    border: 1px solid rgba(34, 211, 238, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #22d3ee;
  }

  &__tile-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }

  &__tile-desc {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
  }
}
```

---

## Section 5: The Ecosystem (pill-badge band)
**Class**: `.av3-ecosystem`
**Layout**: Compact horizontal band. Heading on left, product pills on right. Single row on desktop.

**JSX**:
```jsx
<AnimatedSection className="av3-ecosystem">
  <div className="av3-container">
    <div className="av3-ecosystem__band">
      <div className="av3-ecosystem__band-left">
        <h2 className="av3-ecosystem__band-heading">The TokScript Ecosystem</h2>
        <p className="av3-ecosystem__band-desc">Tools built for the creator economy.</p>
      </div>
      <div className="av3-ecosystem__pills">
        {ECOSYSTEM.map((item, i) => (
          <a
            href={item.link ? `https://${item.link}` : "#"}
            key={i}
            className="av3-ecosystem__pill"
          >
            <span className="av3-ecosystem__pill-avatar">{item.name[0]}</span>
            <span className="av3-ecosystem__pill-name">{item.name}</span>
            <ArrowRight size={14} className="av3-ecosystem__pill-arrow" />
          </a>
        ))}
      </div>
    </div>
  </div>
</AnimatedSection>
```

**Ecosystem SCSS**:
```scss
.av3-ecosystem {
  padding: 64px 24px;
  background: #020617;

  &__band {
    display: flex;
    flex-direction: column;
    gap: 32px;
    align-items: flex-start;
    padding: 40px;
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    border: 1px solid #1e293b;
    border-radius: 20px;
    @media (min-width: 992px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__band-heading {
    font-size: 24px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 4px;
  }

  &__band-desc {
    font-size: 14px;
    color: #64748b;
  }

  &__pills {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 100px;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid #1e293b;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s;
    &:hover {
      border-color: rgba(34, 211, 238, 0.4);
      background: rgba(34, 211, 238, 0.05);
      color: #fff;
    }
  }

  &__pill-avatar {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(34, 211, 238, 0.1);
    color: #22d3ee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 13px;
  }

  &__pill-arrow {
    color: #475569;
    transition: all 0.3s;
    .av3-ecosystem__pill:hover & {
      color: #22d3ee;
      transform: translateX(2px);
    }
  }
}
```

---

## Section 6: Under the Hood (merged specs + privacy + international)
**Class**: `.av3-specs`
**Layout**: 3-column grid on desktop. Col 1: specs table. Col 2: privacy card. Col 3: commercial use + global platform (stacked).

**JSX**: Keep existing SpecRow data. Add the international content into a third card.
```jsx
<AnimatedSection className="av3-specs">
  <div className="av3-container av3-container--wide">
    <SectionTitle subtitle="Technical">Under the Hood</SectionTitle>
    <div className="av3-specs__grid">
      <div className="av3-specs__table-card">
        <h3 className="av3-specs__card-title">
          <Server size={20} className="av3-text-cyan" /> Technical Specs
        </h3>
        <div className="av3-specs__rows">
          <SpecRow label="Architecture" value="Cloud SaaS + Chrome Ext" />
          <SpecRow label="Processing" value="< 15s / Video" />
          <SpecRow label="Storage" value="Unlimited (Pro)" />
          <SpecRow label="Uptime" value="99.9%" />
          <SpecRow label="Formats" value="TXT, CSV, JSON, XML, PDF" />
          <SpecRow label="API Access" value="RESTful API Available" />
        </div>
      </div>
      <div className="av3-specs__info-card">
        <h3 className="av3-specs__card-title">
          <Lock size={20} className="av3-text-cyan" /> Data Privacy
        </h3>
        <p className="av3-specs__card-text">
          Your transcript history is private and encrypted. We don&apos;t delete your data when you change plans. Full export available anytime. We do not watermark or modify downloaded content.
        </p>
      </div>
      <div className="av3-specs__stacked">
        <div className="av3-specs__info-card">
          <h3 className="av3-specs__card-title">
            <Briefcase size={20} className="av3-text-cyan" /> Commercial Use
          </h3>
          <p className="av3-specs__card-text">
            TokScript is built for business. Full rights to use generated transcripts and content for commercial purposes, client work, and research.
          </p>
        </div>
        <div className="av3-specs__info-card av3-specs__info-card--highlight">
          <h3 className="av3-specs__card-title">
            <Globe2 size={20} className="av3-text-cyan" /> Global Platform
          </h3>
          <p className="av3-specs__card-text">
            Serving 41,000+ users across 6 continents. Supporting transcript extraction in 100+ languages including Spanish, French, Portuguese, Japanese, Arabic, and more.
          </p>
        </div>
      </div>
    </div>
  </div>
</AnimatedSection>
```

**Specs SCSS**:
```scss
.av3-specs {
  padding: 96px 24px;
  background: #020617;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__table-card,
  &__info-card {
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    padding: 32px;
    border-radius: 20px;
    border: 1px solid #1e293b;
  }

  &__info-card--highlight {
    border-color: rgba(34, 211, 238, 0.2);
  }

  &__stacked {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__card-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__card-text {
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
  }
}

.av3-spec-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid rgba(30, 41, 59, 0.5);
  &:last-child { border-bottom: 0; }

  &__label {
    color: #64748b;
    font-size: 14px;
    font-weight: 500;
  }

  &__value {
    color: #e2e8f0;
    font-size: 14px;
    font-family: "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
    text-align: right;
  }
}
```

---

## Section 7: FAQ
**Class**: `.av3-faq`
**JSX**: Same structure, no changes needed. Badge text stays "FAQ".
**SCSS**: Restyle to match pricing page (cyan glow, dark bg, slate borders).

```scss
.av3-faq {
  padding: 96px 24px;
  background: #020617;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  &__list {
    max-width: 896px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__item {
    border: 1px solid #1e293b;
    border-radius: 12px;
    overflow: hidden;
    background: rgba(2, 6, 23, 0.4);
    backdrop-filter: blur(12px);
    transition: border-color 0.3s;
    &--open {
      border-color: rgba(34, 211, 238, 0.3);
      box-shadow: 0 0 20px rgba(34, 211, 238, 0.05);
    }
  }

  &__trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #fff;
    text-align: left;
    transition: background 0.2s;
    &:hover { background: rgba(255, 255, 255, 0.02); }
  }

  &__question {
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  &__icon {
    color: #22d3ee;
    flex-shrink: 0;
    margin-left: 16px;
    display: flex;
    align-items: center;
  }

  &__answer-wrap { overflow: hidden; }

  &__answer {
    padding: 0 24px 20px;
    font-size: 14px;
    color: #94a3b8;
    line-height: 1.7;
  }
}
```

---

## Section 8: Final CTA
**Class**: `.av3-final-cta`
**JSX**: Add gradient text to headline, change glow to cyan.
```jsx
<AnimatedSection className="av3-final-cta">
  <div className="av3-container">
    <div className="av3-final-cta__glow"></div>
    <h2 className="av3-final-cta__heading">
      Start Your <span className="av3-final-cta__gradient">Content Intelligence</span> Engine
    </h2>
    <p className="av3-final-cta__subtitle">
      Stop guessing. Start knowing. Join 41,000+ creators who treat content like a science.
    </p>
    <Link href="/pricing" className="av3-final-cta__btn">
      Start for Free <ArrowRight size={18} />
    </Link>
    <p className="av3-final-cta__note">No credit card required</p>
  </div>
</AnimatedSection>
```

**Final CTA SCSS**:
```scss
.av3-final-cta {
  padding: 128px 24px;
  background: #020617;
  text-align: center;
  position: relative;
  overflow: hidden;

  &__glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: rgba(34, 211, 238, 0.12);
    filter: blur(150px);
    border-radius: 50%;
    pointer-events: none;
  }

  .av3-container {
    position: relative;
    z-index: 1;
  }

  &__heading {
    font-size: 36px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 16px;
    letter-spacing: -0.025em;
    @media (min-width: 768px) { font-size: 48px; }
  }

  &__gradient {
    background: linear-gradient(to right, #22d3ee, #06b6d4, #2dd4bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__subtitle {
    font-size: 18px;
    color: #94a3b8;
    max-width: 640px;
    margin: 0 auto 40px;
    line-height: 1.7;
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 16px 40px;
    background: #fff;
    color: #020617;
    font-weight: 700;
    font-size: 16px;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    box-shadow: 0 0 60px rgba(34, 211, 238, 0.2);
    transition: all 0.3s;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 80px rgba(34, 211, 238, 0.35);
      color: #020617;
    }
  }

  &__note {
    margin-top: 16px;
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
}
```

---

## Responsive Overrides (replaces old block)
```scss
@media (max-width: 1199px) {
  .av3-hero { padding: 120px 24px 80px; }
  .av3-hero__heading { font-size: 72px; }
}

@media (max-width: 991px) {
  .av3-hero__heading { font-size: 56px; }
  .av3-mission__grid { grid-template-columns: 1fr; }
  .av3-features__split { grid-template-columns: 1fr; }
  .av3-specs__grid { grid-template-columns: 1fr; }
}

@media (max-width: 767px) {
  .av3-hero { padding: 100px 16px 64px; }
  .av3-hero__subtitle { font-size: 16px; }
  .av3-ticker__track { gap: 32px; }
  .av3-mission,
  .av3-personas,
  .av3-features,
  .av3-how,
  .av3-ecosystem,
  .av3-specs,
  .av3-faq,
  .av3-final-cta {
    padding: 64px 16px;
  }
  .av3-section-title__heading { font-size: 28px; }
  .av3-final-cta__heading { font-size: 28px; }
  .av3-personas__case-title { font-size: 24px; }
  .av3-features__showcase { padding: 24px; }
  .av3-features__showcase-title { font-size: 24px; }
  .av3-mission__callout-band {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .av3-personas__case-right { grid-template-columns: repeat(2, 1fr); }
  .av3-specs__table-card,
  .av3-specs__info-card { padding: 24px; }
  .av3-ecosystem__band { padding: 24px; }
}
```

## Important Notes for JSX Agent
1. Add `import Background from "@/components/Background";` at the top of PageData.js
2. Place `<Background />` as the first child inside `<main className="about-v3">` (before the hero section)
3. Remove the standalone graveyard section entirely (Section 4)
4. Remove the standalone diff section entirely (Section 7) — differentiators go into features
5. Remove the standalone intl section entirely (Section 11) — content goes into specs
6. Keep all data constants, utility components, and schema markup untouched
7. Use `&apos;` for apostrophes and `&quot;` for quotes in JSX
8. All icon imports from lucide-react are already present

## Important Notes for SCSS Agent
1. Replace lines 10253-11399 (from `// SECTION 3: MISSION` comment through the end of responsive overrides before the closing `}` of `.about-v3`)
2. Also update the section title badge from indigo to cyan (lines ~10050-10060)
3. Keep everything BEFORE line 10253 untouched (global overrides, utilities, container, scroll-reveal, section-title structure, hero, ticker)
4. Keep everything AFTER line 11399 untouched (hd-downloads-page etc.)
5. All styles must remain scoped under `.about-v3`
