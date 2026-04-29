# Faux UI Mockup Spec — About V3 Product Previews

## Goal
Replace bland "Product Preview" gray boxes with rich CSS-only faux UI mockups that look like actual dark-mode product screenshots. These mockups should be LARGE (min-height 400px desktop) and visually dominant within their feature cards.

## Files
- JSX: `src/app/about-us/PageData.js`
- SCSS: `src/App.scss` (inside `.about-v3 {}` scope)

---

## Shared HTML Pattern (all mockups use this frame)

Every mockup starts with a "window frame" look:
```html
<div className="av3-ui [type-specific-class]">
  <div className="av3-ui__topbar">
    <div className="av3-ui__dots"><span></span><span></span><span></span></div>
    <div className="av3-ui__titlebar"></div>
  </div>
  <div className="av3-ui__body">
    <!-- Type-specific content here -->
  </div>
</div>
```

---

## Mockup A — Dashboard (Section 3: What Is TokScript)
**Location in JSX:** Lines ~327-329, replace the `av3-what__preview` contents

```jsx
<div className="av3-what__preview">
  <div className="av3-ui av3-ui--dashboard">
    <div className="av3-ui__topbar">
      <div className="av3-ui__dots"><span></span><span></span><span></span></div>
      <div className="av3-ui__titlebar"></div>
    </div>
    <div className="av3-ui__body">
      <div className="av3-ui__sidebar">
        <div className="av3-ui__nav-item av3-ui__nav-item--active"></div>
        <div className="av3-ui__nav-item"></div>
        <div className="av3-ui__nav-item"></div>
        <div className="av3-ui__nav-item"></div>
        <div className="av3-ui__nav-item"></div>
      </div>
      <div className="av3-ui__main">
        <div className="av3-ui__search-bar"></div>
        <div className="av3-ui__content-grid">
          <div className="av3-ui__video-thumb">
            <div className="av3-ui__play-btn"></div>
          </div>
          <div className="av3-ui__transcript-lines">
            <div className="av3-ui__line av3-ui__line--full"></div>
            <div className="av3-ui__line av3-ui__line--medium"></div>
            <div className="av3-ui__line av3-ui__line--full"></div>
            <div className="av3-ui__line av3-ui__line--short"></div>
            <div className="av3-ui__line av3-ui__line--full"></div>
            <div className="av3-ui__line av3-ui__line--medium"></div>
          </div>
        </div>
        <div className="av3-ui__action-row">
          <div className="av3-ui__action-btn"></div>
          <div className="av3-ui__action-btn av3-ui__action-btn--primary"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Visual Description
- Left sidebar (dark strip ~60px wide) with 5 nav items (small horizontal bars), first one has cyan left accent
- Main area:
  - Top: Search bar (rounded rect, full width, subtle border)
  - Middle: 2-column grid
    - Left: Video thumbnail (darker rect with centered play triangle in cyan)
    - Right: 6 transcript text lines (horizontal bars of varying widths)
  - Bottom: 2 action buttons (one outline, one solid cyan)

---

## Mockup B — AI Chat (Section 6A: AI Agents)
**Location in JSX:** Lines ~575-577, first `av3-feature-block__preview`

```jsx
<div className="av3-feature-block__preview">
  <div className="av3-ui av3-ui--chat">
    <div className="av3-ui__topbar">
      <div className="av3-ui__dots"><span></span><span></span><span></span></div>
      <div className="av3-ui__titlebar"></div>
    </div>
    <div className="av3-ui__body">
      <div className="av3-ui__sidebar">
        <div className="av3-ui__agent av3-ui__agent--active">
          <span className="av3-ui__agent-dot av3-ui__agent-dot--cyan"></span>
          <span className="av3-ui__agent-name"></span>
        </div>
        <div className="av3-ui__agent">
          <span className="av3-ui__agent-dot av3-ui__agent-dot--pink"></span>
          <span className="av3-ui__agent-name"></span>
        </div>
        <div className="av3-ui__agent">
          <span className="av3-ui__agent-dot av3-ui__agent-dot--amber"></span>
          <span className="av3-ui__agent-name"></span>
        </div>
      </div>
      <div className="av3-ui__main">
        <div className="av3-ui__message av3-ui__message--user">
          <div className="av3-ui__msg-line"></div>
        </div>
        <div className="av3-ui__message av3-ui__message--ai">
          <div className="av3-ui__msg-line av3-ui__msg-line--full"></div>
          <div className="av3-ui__msg-line av3-ui__msg-line--full"></div>
          <div className="av3-ui__msg-line av3-ui__msg-line--medium"></div>
        </div>
        <div className="av3-ui__message av3-ui__message--ai">
          <div className="av3-ui__msg-line av3-ui__msg-line--full"></div>
          <div className="av3-ui__msg-line av3-ui__msg-line--short"></div>
        </div>
        <div className="av3-ui__chat-input"></div>
      </div>
    </div>
  </div>
</div>
```

### Visual Description
- Left sidebar (~100px): 3 agent items, each with a colored dot (cyan/pink/amber) and a name bar. Active one has subtle cyan bg highlight.
- Main chat area:
  - User message: right-aligned bubble in slightly lighter bg
  - AI responses: left-aligned bubbles with multiple text line bars
  - Bottom: chat input bar (rounded rect with border)

---

## Mockup C — Batch Queue (Section 6B: Bulk Processing)
**Location in JSX:** Lines ~625-627, second `av3-feature-block__preview`

```jsx
<div className="av3-feature-block__preview">
  <div className="av3-ui av3-ui--bulk">
    <div className="av3-ui__topbar">
      <div className="av3-ui__dots"><span></span><span></span><span></span></div>
      <div className="av3-ui__titlebar"></div>
    </div>
    <div className="av3-ui__body av3-ui__body--list">
      <div className="av3-ui__list-header">
        <span className="av3-ui__col-label"></span>
        <span className="av3-ui__col-label"></span>
        <span className="av3-ui__col-label"></span>
      </div>
      <div className="av3-ui__list-row av3-ui__list-row--done">
        <span className="av3-ui__status-icon av3-ui__status-icon--done"></span>
        <span className="av3-ui__url-bar"></span>
        <span className="av3-ui__progress-bar av3-ui__progress-bar--full"></span>
      </div>
      <div className="av3-ui__list-row av3-ui__list-row--done">
        <span className="av3-ui__status-icon av3-ui__status-icon--done"></span>
        <span className="av3-ui__url-bar"></span>
        <span className="av3-ui__progress-bar av3-ui__progress-bar--full"></span>
      </div>
      <div className="av3-ui__list-row av3-ui__list-row--active">
        <span className="av3-ui__status-icon av3-ui__status-icon--active"></span>
        <span className="av3-ui__url-bar"></span>
        <span className="av3-ui__progress-bar av3-ui__progress-bar--partial"></span>
      </div>
      <div className="av3-ui__list-row av3-ui__list-row--pending">
        <span className="av3-ui__status-icon av3-ui__status-icon--pending"></span>
        <span className="av3-ui__url-bar"></span>
        <span className="av3-ui__progress-bar av3-ui__progress-bar--empty"></span>
      </div>
      <div className="av3-ui__list-row av3-ui__list-row--pending">
        <span className="av3-ui__status-icon av3-ui__status-icon--pending"></span>
        <span className="av3-ui__url-bar"></span>
        <span className="av3-ui__progress-bar av3-ui__progress-bar--empty"></span>
      </div>
      <div className="av3-ui__list-footer">
        <span className="av3-ui__footer-stat"></span>
        <span className="av3-ui__footer-bar"></span>
      </div>
    </div>
  </div>
</div>
```

### Visual Description
- Full-width list layout (no sidebar)
- Header row with 3 column labels (small text bars)
- 5 URL rows, each with:
  - Status icon: green circle (done), cyan spinning indicator (active), gray dot (pending)
  - URL text bar (varying width)
  - Progress bar: green/full, cyan/partial (60%), gray/empty
- Footer with stat bar + overall progress bar

---

## Mockup D — Browser Extension (Section 6C: Chrome Extension)
**Location in JSX:** Lines ~675-677, third `av3-feature-block__preview`

```jsx
<div className="av3-feature-block__preview">
  <div className="av3-ui av3-ui--browser">
    <div className="av3-ui__topbar">
      <div className="av3-ui__dots"><span></span><span></span><span></span></div>
      <div className="av3-ui__address-bar"></div>
      <div className="av3-ui__ext-icon"></div>
    </div>
    <div className="av3-ui__body av3-ui__body--browser">
      <div className="av3-ui__page-content">
        <div className="av3-ui__video-area">
          <div className="av3-ui__play-btn"></div>
        </div>
        <div className="av3-ui__page-text">
          <div className="av3-ui__line av3-ui__line--full"></div>
          <div className="av3-ui__line av3-ui__line--medium"></div>
        </div>
      </div>
      <div className="av3-ui__extension-popup">
        <div className="av3-ui__ext-header">
          <span className="av3-ui__ext-logo"></span>
          <span className="av3-ui__ext-title"></span>
        </div>
        <div className="av3-ui__ext-body">
          <div className="av3-ui__line av3-ui__line--full"></div>
          <div className="av3-ui__line av3-ui__line--medium"></div>
          <div className="av3-ui__line av3-ui__line--full"></div>
          <div className="av3-ui__line av3-ui__line--short"></div>
        </div>
        <div className="av3-ui__ext-actions">
          <div className="av3-ui__action-btn av3-ui__action-btn--primary"></div>
          <div className="av3-ui__action-btn"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Visual Description
- Browser chrome at top: dots, wide address bar, small cyan extension icon (square with rounded corners)
- Page content (dimmed/blurred):
  - Large video player area (dark rect with play button)
  - Some text lines below the video
- Extension popup (floating card, positioned top-right, with subtle shadow):
  - Header: small logo square + title bar
  - Body: 4 transcript text lines
  - Actions: 2 buttons (primary cyan + outline)

---

## SCSS Requirements

### 1. Update preview containers (lines 2354-2370)
```scss
.av3-what__preview,
.av3-feature-block__preview {
  background: #141414;
  border-radius: 16px;
  min-height: 400px;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  border: 1px solid rgba(255, 255, 255, 0.06);
  overflow: hidden;
  padding: 16px;
  // REMOVE aspect-ratio: 16/10
  // REMOVE the span child styling
}
```

### 2. Shared `.av3-ui` base frame
```scss
.av3-ui {
  background: #0d0d0d;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;

  &__topbar {
    background: #161616;
    padding: 10px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-shrink: 0;
  }

  &__dots {
    display: flex;
    gap: 6px;
    flex-shrink: 0;

    span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      display: block !important;

      &:nth-child(1) { background: #ff5f57; }
      &:nth-child(2) { background: #febc2e; }
      &:nth-child(3) { background: #28c840; }
    }
  }

  &__titlebar {
    flex: 1;
    height: 10px;
    background: rgba(255,255,255,0.05);
    border-radius: 5px;
    max-width: 200px;
  }

  &__body {
    flex: 1;
    display: flex;
    min-height: 0;
  }

  &__sidebar {
    width: 60px;
    background: #111111;
    border-right: 1px solid rgba(255,255,255,0.06);
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }

  &__main {
    flex: 1;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  // Reusable content lines
  &__line {
    height: 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);

    &--full { width: 100%; }
    &--medium { width: 70%; }
    &--short { width: 45%; }
  }

  &__search-bar {
    height: 32px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    flex-shrink: 0;
  }

  &__nav-item {
    height: 8px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;

    &--active {
      background: rgba(0,242,234,0.3);
      border-left: 2px solid #00f2ea;
    }
  }

  // Action buttons
  &__action-row {
    display: flex;
    gap: 8px;
    margin-top: auto;
    padding-top: 12px;
  }

  &__action-btn {
    height: 28px;
    border-radius: 6px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.08);
    flex: 1;
    max-width: 100px;

    &--primary {
      background: rgba(0,242,234,0.2);
      border-color: rgba(0,242,234,0.3);
    }
  }
}
```

### 3. Dashboard-specific (Mockup A)
```scss
.av3-ui--dashboard {
  .av3-ui__content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    flex: 1;
  }

  .av3-ui__video-thumb {
    background: #0a0a0a;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
  }

  .av3-ui__play-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(0,242,234,0.15);
    border: 2px solid rgba(0,242,234,0.4);
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 14px;
      top: 9px;
      border-style: solid;
      border-width: 8px 0 8px 14px;
      border-color: transparent transparent transparent rgba(0,242,234,0.6);
    }
  }

  .av3-ui__transcript-lines {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px 0;
  }
}
```

### 4. Chat-specific (Mockup B)
```scss
.av3-ui--chat {
  .av3-ui__sidebar {
    width: 120px;
    padding: 12px;
    gap: 4px;
  }

  .av3-ui__agent {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 6px;

    &--active {
      background: rgba(0,242,234,0.08);
    }
  }

  .av3-ui__agent-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    display: block !important;

    &--cyan { background: #00f2ea; }
    &--pink { background: #ff6393; }
    &--amber { background: #f59e0b; }
  }

  .av3-ui__agent-name {
    height: 8px;
    flex: 1;
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    display: block !important;
  }

  .av3-ui__message {
    padding: 10px 12px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 80%;

    &--user {
      background: rgba(255,255,255,0.06);
      align-self: flex-end;

      .av3-ui__msg-line { width: 120px; }
    }

    &--ai {
      background: rgba(0,242,234,0.04);
      border: 1px solid rgba(0,242,234,0.08);
      align-self: flex-start;
    }
  }

  .av3-ui__msg-line {
    height: 7px;
    border-radius: 3px;
    background: rgba(255,255,255,0.08);

    &--full { width: 100%; }
    &--medium { width: 70%; }
    &--short { width: 45%; }
  }

  .av3-ui__chat-input {
    height: 32px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    margin-top: auto;
    flex-shrink: 0;
  }

  .av3-ui__main {
    gap: 10px;
  }
}
```

### 5. Bulk-specific (Mockup C)
```scss
.av3-ui--bulk {
  .av3-ui__body--list {
    flex-direction: column;
    padding: 0;
  }

  .av3-ui__list-header {
    display: flex;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .av3-ui__col-label {
    height: 6px;
    background: rgba(255,255,255,0.1);
    border-radius: 3px;
    display: block !important;

    &:nth-child(1) { width: 40px; }
    &:nth-child(2) { flex: 1; }
    &:nth-child(3) { width: 80px; }
  }

  .av3-ui__list-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255,255,255,0.03);
  }

  .av3-ui__status-icon {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    flex-shrink: 0;
    display: block !important;

    &--done { background: #28c840; }
    &--active {
      background: #00f2ea;
      box-shadow: 0 0 8px rgba(0,242,234,0.4);
    }
    &--pending { background: rgba(255,255,255,0.1); }
  }

  .av3-ui__url-bar {
    flex: 1;
    height: 8px;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    display: block !important;
  }

  .av3-ui__progress-bar {
    width: 80px;
    height: 6px;
    border-radius: 3px;
    background: rgba(255,255,255,0.04);
    overflow: hidden;
    display: block !important;
    position: relative;

    &--full::after {
      content: "";
      position: absolute;
      inset: 0;
      background: #28c840;
      border-radius: 3px;
    }

    &--partial::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 60%;
      background: #00f2ea;
      border-radius: 3px;
    }

    &--empty { /* already gray from base */ }
  }

  .av3-ui__list-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    margin-top: auto;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .av3-ui__footer-stat {
    width: 60px;
    height: 8px;
    background: rgba(255,255,255,0.08);
    border-radius: 4px;
    display: block !important;
  }

  .av3-ui__footer-bar {
    flex: 1;
    height: 6px;
    background: rgba(255,255,255,0.04);
    border-radius: 3px;
    position: relative;
    display: block !important;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 40%;
      background: linear-gradient(90deg, #28c840, #00f2ea);
      border-radius: 3px;
    }
  }
}
```

### 6. Browser-specific (Mockup D)
```scss
.av3-ui--browser {
  .av3-ui__address-bar {
    flex: 1;
    height: 24px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
  }

  .av3-ui__ext-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: rgba(0,242,234,0.3);
    border: 1px solid rgba(0,242,234,0.4);
    flex-shrink: 0;
  }

  .av3-ui__body--browser {
    position: relative;
    flex-direction: column;
    padding: 0;
  }

  .av3-ui__page-content {
    flex: 1;
    padding: 16px;
    opacity: 0.4;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .av3-ui__video-area {
    flex: 1;
    min-height: 120px;
    background: #0a0a0a;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .av3-ui__page-text {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .av3-ui__extension-popup {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 200px;
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 14px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .av3-ui__ext-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .av3-ui__ext-logo {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: rgba(0,242,234,0.2);
    border: 1px solid rgba(0,242,234,0.3);
    flex-shrink: 0;
    display: block !important;
  }

  .av3-ui__ext-title {
    height: 8px;
    flex: 1;
    background: rgba(255,255,255,0.1);
    border-radius: 4px;
    display: block !important;
  }

  .av3-ui__ext-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .av3-ui__ext-actions {
    display: flex;
    gap: 8px;
    margin-top: 4px;
  }
}
```

### 7. Responsive updates
At 991px and below: `min-height: 300px`
At 767px and below: `min-height: 260px`
At 480px: `min-height: 220px; padding: 10px;`

The extension popup at 480px: `width: 160px; padding: 10px;`
The chat sidebar at 767px and below: `width: 80px;` with agent names hidden
The dashboard sidebar at 767px: `width: 44px;`
