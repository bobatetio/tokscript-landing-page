# Affiliate Page Expansion — Shared Build Spec

## SCSS Variables Reference
```scss
$body_bg_color: #0a1025;
$primary_bg_color: #08182d;
$primary_cyan: #00f2ea;
$border_primary: #212f42;
$heading_primary: #ececec;
$text_primary: #9ca3af;
$text_light: #d1d5db;
$white: #ffffff;
$pink: #ff6393;
$inter: "Inter", sans-serif;
```

## Global Fix (at `.affiliate-page` scope)
```scss
.affiliate-page {
  li {
    color: #d1d5db !important;
    display: block !important;
  }
}
```

---

## Section 1: Hero (UPDATE `.heading-wrapper`)

### JSX
```jsx
<div className="heading-wrapper">
  <div className="badge-wrapper gradient-border d-inline-flex">
    <strong className="text-gradient w-600">AFFILIATE PROGRAM</strong>
  </div>
  <h1>Turn Content Into Cash Flow</h1>
  <p>
    Earn <strong>40% recurring commission</strong> on every referral — plus unlock
    <strong> pay-per-view bonuses up to $1,000</strong>. Two ways to earn, one powerful platform.
  </p>
  <div className="hero-cta">
    <a
      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?ref=affiliate`}
      className="btn-style has-shadow w-500"
    >
      Become an Affiliate
    </a>
  </div>
  <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`} className="hero-login-link">
    Already an affiliate? Log in →
  </a>
</div>
```

### SCSS (add inside `.heading-wrapper`)
```scss
.hero-login-link {
  display: inline-block;
  margin-top: 16px;
  color: $primary_cyan;
  font-size: 14px;
  text-decoration: none;
  transition: $transition;
  &:hover {
    opacity: 0.8;
  }
}
```

---

## Section 2: Why Join (REPLACES `.benefits-section` → `.why-join-section`)

### JSX
```jsx
<div className="affiliate-section why-join-section">
  <h2>Why Join?</h2>
  <div className="benefits-grid">
    <div className="benefit-card">
      <div className="benefit-icon">💰</div>
      <h4>Earn Big, Effortlessly</h4>
      <p>
        Earn 40% recurring commission on every referral — plus bonus pay-per-view
        payouts. No cap on your earnings, ever.
      </p>
    </div>
    <div className="benefit-card">
      <div className="benefit-icon">📦</div>
      <h4>Ready-to-Go Marketing Materials</h4>
      <p>
        Get banners, email templates, social posts, and video scripts — everything
        you need to start promoting immediately.
      </p>
    </div>
    <div className="benefit-card">
      <div className="benefit-icon">✅</div>
      <h4>Dependable Payouts</h4>
      <p>
        Monthly payouts via PayPal or Stripe. Real-time dashboard so you always
        know exactly what you've earned.
      </p>
    </div>
    <div className="benefit-card">
      <div className="benefit-icon">🤝</div>
      <h4>Your Go-To Support Crew</h4>
      <p>
        Dedicated affiliate manager, priority support, and a community of fellow
        affiliates to share strategies.
      </p>
    </div>
  </div>
  <div className="section-bottom-cta">
    <a
      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?ref=affiliate`}
      className="btn-style has-shadow w-500"
    >
      Start earning in just 5 minutes
    </a>
  </div>
</div>
```

### SCSS
`.why-join-section` inherits from `.affiliate-section` + `.benefits-grid` / `.benefit-card` already defined. Add:
```scss
.section-bottom-cta {
  text-align: center;
  margin-top: 40px;
  .btn-style {
    padding: 14px 40px;
    font-size: 16px;
    border-radius: 10px;
  }
}
```

---

## Section 3: How It Works (UPDATE `.how-it-works-section`)

### JSX
```jsx
<div className="affiliate-section how-it-works-section">
  <h2>Apply and Earn With Ease</h2>
  <div className="steps-grid">
    <div className="step-card">
      <div className="step-number">1</div>
      <h3>Apply to Join</h3>
      <p>
        Fill out a quick application. Once approved, you'll get instant access
        to your affiliate dashboard and unique referral link.
      </p>
    </div>
    <div className="step-card">
      <div className="step-number">2</div>
      <h3>Get Your Unique Link</h3>
      <p>
        Share your personalized link via social media, email, YouTube, TikTok,
        or anywhere your audience lives. 30-day cookie window.
      </p>
    </div>
    <div className="step-card">
      <div className="step-number">3</div>
      <h3>Earn Cash</h3>
      <p>
        Every signup through your link earns you 40% recurring commission —
        plus pay-per-view bonuses on qualifying content.
      </p>
    </div>
  </div>
</div>
```

### SCSS — No changes needed.

---

## Section 4: Two Ways to Earn (NEW — `.two-ways-section`)

### JSX
```jsx
<div className="affiliate-section two-ways-section">
  <h2>Two Ways to Earn</h2>
  <p className="section-subtitle">
    Choose your path — or combine both for maximum earnings.
  </p>
  <div className="two-ways-grid">
    {/* Track 1 - Teal */}
    <div className="earn-track-card track-teal">
      <div className="track-badge">TRACK 1</div>
      <h3>Revenue Share</h3>
      <p className="track-headline">40% Recurring Commission</p>
      <p className="track-desc">
        Earn 40% of every payment your referrals make — monthly or annual.
        Commission continues for the entire customer lifetime.
      </p>
      <div className="track-table">
        <div className="track-table-row">
          <span>Monthly plan ($19/mo)</span>
          <strong>$7.60/mo per referral</strong>
        </div>
        <div className="track-table-row">
          <span>Annual plan ($99/yr)</span>
          <strong>$39.60/yr per referral</strong>
        </div>
        <div className="track-table-row">
          <span>Cookie window</span>
          <strong>30 days</strong>
        </div>
        <div className="track-table-row">
          <span>Payout frequency</span>
          <strong>Monthly</strong>
        </div>
      </div>
    </div>

    {/* Track 2 - Gold */}
    <div className="earn-track-card track-gold">
      <div className="track-badge">TRACK 2</div>
      <h3>Pay-Per-Views</h3>
      <p className="track-headline">Earn Up to $1,000 Per Video</p>
      <p className="track-desc">
        Create content featuring TokScript — tutorials, reviews, demos.
        Get paid based on verified view counts.
      </p>
      <div className="track-table">
        <div className="track-table-row">
          <span>50,000 views</span>
          <strong>$100</strong>
        </div>
        <div className="track-table-row">
          <span>100,000 views</span>
          <strong>$250</strong>
        </div>
        <div className="track-table-row">
          <span>500,000 views</span>
          <strong>$500</strong>
        </div>
        <div className="track-table-row">
          <span>1,000,000 views</span>
          <strong>$1,000</strong>
        </div>
      </div>
    </div>
  </div>

  <div className="stacking-callout">
    <strong>💡 Stack both tracks!</strong>
    <span> Earn recurring commissions AND pay-per-view bonuses simultaneously.
    A single viral video could earn you $1,000+ in view bonuses while also
    driving dozens of referrals worth $7.60/mo each.</span>
  </div>
</div>
```

### SCSS
```scss
.two-ways-section {
  .section-subtitle {
    text-align: center;
    color: $text_primary;
    margin: -24px 0 40px;
    font-size: 16px;
  }

  .two-ways-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
    }
  }

  .earn-track-card {
    background: $primary_bg_color;
    border-radius: 20px;
    padding: 36px 32px;
    border: 1px solid $border_primary;

    @media screen and (max-width: 576px) {
      padding: 28px 20px;
      border-radius: 16px;
    }

    &.track-teal {
      border-color: rgba(0, 242, 234, 0.25);

      .track-badge {
        background: rgba(0, 242, 234, 0.15);
        color: $primary_cyan;
      }

      .track-headline {
        color: $primary_cyan;
      }
    }

    &.track-gold {
      border-color: rgba(251, 191, 36, 0.25);

      .track-badge {
        background: rgba(251, 191, 36, 0.15);
        color: #fbbf24;
      }

      .track-headline {
        color: #fbbf24;
      }
    }

    .track-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 16px;
    }

    h3 {
      font-size: 22px;
      margin: 0 0 4px;
      color: $heading_primary;
    }

    .track-headline {
      font-size: 18px;
      font-weight: 700;
      margin: 0 0 12px;
    }

    .track-desc {
      color: $text_light;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 24px;
    }

    .track-table {
      .track-table-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        font-size: 14px;

        &:last-child {
          border-bottom: none;
        }

        span {
          color: $text_primary;
        }

        strong {
          color: $heading_primary;
          font-weight: 600;
        }
      }
    }
  }

  .stacking-callout {
    margin-top: 24px;
    padding: 20px 28px;
    background: linear-gradient(
      135deg,
      rgba(0, 242, 234, 0.08) 0%,
      rgba(251, 191, 36, 0.08) 100%
    );
    border: 1px solid rgba(0, 242, 234, 0.15);
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.6;
    color: $text_light;

    strong {
      color: $heading_primary;
      display: block;
      margin-bottom: 4px;
    }

    @media screen and (max-width: 576px) {
      padding: 16px 20px;
    }
  }
}
```

---

## Section 5: Earnings Calculator (NEW — `.earnings-calculator-section`)

### JSX
```jsx
<div className="affiliate-section earnings-calculator-section">
  <h2>Your Earning Potential</h2>
  <p className="section-subtitle">
    Based on annual plan referrals at 40% commission ($39.60/referral/year).
  </p>
  <div className="calculator-grid">
    <div className="calculator-card">
      <div className="scenario-label">Getting Started</div>
      <div className="scenario-value">10 referrals</div>
      <div className="scenario-earning">$396 <span>/year</span></div>
      <p>~$33/month in passive income</p>
    </div>
    <div className="calculator-card featured">
      <div className="scenario-label">Building Momentum</div>
      <div className="scenario-value">50 referrals</div>
      <div className="scenario-earning">$1,980 <span>/year</span></div>
      <p>~$165/month in passive income</p>
    </div>
    <div className="calculator-card">
      <div className="scenario-label">Fully Established</div>
      <div className="scenario-value">200 referrals</div>
      <div className="scenario-earning">$7,920 <span>/year</span></div>
      <p>~$660/month in passive income</p>
    </div>
  </div>
  <p className="calculator-footnote">
    * Based on annual plan pricing. Pay-per-view bonuses are additional. Monthly plan
    referrals earn $7.60/mo each.
  </p>
</div>
```

### SCSS
```scss
.earnings-calculator-section {
  .section-subtitle {
    text-align: center;
    color: $text_primary;
    margin: -24px 0 40px;
    font-size: 16px;
  }

  .calculator-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .calculator-card {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 20px;
    padding: 36px 28px;
    text-align: center;

    @media screen and (max-width: 576px) {
      padding: 28px 20px;
      border-radius: 16px;
    }

    &.featured {
      border-color: rgba(0, 242, 234, 0.3);
      background: linear-gradient(
        180deg,
        rgba(0, 242, 234, 0.06) 0%,
        $primary_bg_color 100%
      );
    }

    .scenario-label {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: $primary_cyan;
      margin-bottom: 12px;
    }

    .scenario-value {
      font-size: 20px;
      font-weight: 700;
      color: $heading_primary;
      margin-bottom: 8px;
    }

    .scenario-earning {
      font-size: 32px;
      font-weight: 800;
      color: $primary_cyan;
      margin-bottom: 8px;

      span {
        font-size: 16px;
        font-weight: 500;
        color: $text_primary;
      }
    }

    p {
      color: $text_primary;
      font-size: 13px;
      margin: 0;
    }
  }

  .calculator-footnote {
    text-align: center;
    color: $text_primary;
    font-size: 13px;
    margin-top: 24px;
    font-style: italic;
  }
}
```

---

## Section 6: Who Can Join (NEW — `.who-can-join-section`)

### JSX
```jsx
<div className="affiliate-section who-can-join-section">
  <h2>Who Can Join?</h2>
  <p className="section-subtitle">
    If you have an audience interested in social media, content creation, or AI tools — you're a perfect fit.
  </p>
  <div className="primary-personas-grid">
    <div className="persona-card primary">
      <div className="persona-icon">🎬</div>
      <h4>Content Creators</h4>
      <p>YouTubers, TikTokers, and Instagram creators who review tools, share tutorials, or create "how-to" content.</p>
    </div>
    <div className="persona-card primary">
      <div className="persona-icon">📚</div>
      <h4>Educators & Coaches</h4>
      <p>Course creators, social media coaches, and digital marketing educators who recommend tools to their students.</p>
    </div>
    <div className="persona-card primary">
      <div className="persona-icon">🏢</div>
      <h4>Agencies & Freelancers</h4>
      <p>Social media agencies and freelance managers who can recommend TokScript to clients as part of their workflow.</p>
    </div>
  </div>
  <div className="secondary-personas-grid">
    <div className="persona-card secondary">
      <div className="persona-icon">📩</div>
      <h4>Newsletter Writers</h4>
      <p>Curate tool recommendations for your subscribers.</p>
    </div>
    <div className="persona-card secondary">
      <div className="persona-icon">👥</div>
      <h4>UGC Communities</h4>
      <p>Discord, Reddit, and Facebook group admins in the creator space.</p>
    </div>
    <div className="persona-card secondary">
      <div className="persona-icon">🛍️</div>
      <h4>TikTok Shop Sellers</h4>
      <p>Sellers who use TokScript to find winning content strategies.</p>
    </div>
  </div>
  <div className="section-bottom-cta">
    <a
      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?ref=affiliate`}
      className="btn-style has-shadow w-500"
    >
      Apply Now — It's Free
    </a>
  </div>
</div>
```

### SCSS
```scss
.who-can-join-section {
  .section-subtitle {
    text-align: center;
    color: $text_primary;
    margin: -24px 0 40px;
    font-size: 16px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .primary-personas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 24px;

    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .secondary-personas-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media screen and (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .persona-card {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 20px;
    padding: 32px 24px;

    @media screen and (max-width: 576px) {
      padding: 24px 20px;
      border-radius: 16px;
    }

    &.primary {
      .persona-icon {
        font-size: 36px;
      }
    }

    &.secondary {
      padding: 24px 20px;

      .persona-icon {
        font-size: 28px;
      }

      h4 {
        font-size: 16px;
      }

      p {
        font-size: 13px;
      }
    }

    .persona-icon {
      margin-bottom: 16px;
    }

    h4 {
      color: $heading_primary;
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    p {
      color: #d1d5db !important;
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
```

---

## Section 7: Affiliate Resource Hub (NEW — `.resource-hub-section`)
Uses `useState` for tabs. Import `useState` at top.

### JSX
```jsx
const [activeTab, setActiveTab] = useState("social");

// Resource hub data
const resourceTabs = {
  social: {
    label: "Social Media Posts",
    items: [
      {
        title: "Twitter/X Thread Hook",
        content: "I just found a tool that turns any TikTok into a full transcript + AI-powered insights in seconds. Here's why TokScript is a game-changer for creators 🧵"
      },
      {
        title: "Instagram Caption",
        content: "Stop guessing what makes TikToks go viral. TokScript analyzes any video's transcript and gives you AI-powered insights to replicate their success. Link in bio 🔗"
      },
      {
        title: "LinkedIn Post",
        content: "If you work in social media marketing, you need to know about TokScript. It transcribes TikTok videos and runs AI analysis on the content strategy. Our team saves 10+ hours/week."
      }
    ]
  },
  banners: {
    label: "Banners & Graphics",
    items: [
      {
        title: "Leaderboard (728x90)",
        content: "Pre-designed banner with your affiliate link baked in. Perfect for blog sidebars and headers."
      },
      {
        title: "Square (300x300)",
        content: "Optimized for social media and email newsletters. Clean design with clear CTA."
      }
    ]
  },
  emails: {
    label: "Pre-Written Emails",
    items: [
      {
        title: "Cold Introduction",
        subject: "Quick tool rec for your TikTok workflow",
        content: "Hey [Name], I've been using this tool called TokScript that transcribes TikTok videos and runs AI analysis on them. If you're creating content or researching trends, it's a massive time-saver..."
      },
      {
        title: "Newsletter Feature",
        subject: "Tool of the week: TokScript",
        content: "This week's featured tool is TokScript — an AI-powered platform that turns TikTok videos into searchable transcripts with strategic insights..."
      }
    ]
  },
  scripts: {
    label: "Video Scripts",
    items: [
      {
        title: "60-Second YouTube Short",
        content: "Hook: 'This tool just changed how I research TikTok content forever.' Body: Walk through pasting a TikTok URL, getting the transcript, and showing AI insights. CTA: 'Link in description to try it free.'"
      },
      {
        title: "3-Minute Review",
        content: "Hook: 'Is TokScript worth it? I tested it for 30 days.' Cover: transcription accuracy, AI agent features, pricing value, who it's best for. CTA: 'Use my link for the best deal.'"
      }
    ]
  }
};
```

```jsx
<div className="affiliate-section resource-hub-section">
  <h2>Affiliate Resource Hub</h2>
  <p className="section-subtitle">
    Ready-made promotional materials to help you start earning immediately.
  </p>
  <div className="resource-tabs">
    {Object.entries(resourceTabs).map(([key, tab]) => (
      <button
        key={key}
        className={`resource-tab-btn ${activeTab === key ? "active" : ""}`}
        onClick={() => setActiveTab(key)}
      >
        {tab.label}
      </button>
    ))}
  </div>
  <div className="resource-tab-content">
    <div className="resource-preview-grid">
      {resourceTabs[activeTab].items.map((item, index) => (
        <div key={index} className="resource-preview-card">
          <h4>{item.title}</h4>
          {item.subject && <p className="email-subject">Subject: {item.subject}</p>}
          <p className="preview-content">{item.content}</p>
        </div>
      ))}
    </div>
  </div>
</div>
```

### SCSS
```scss
.resource-hub-section {
  .section-subtitle {
    text-align: center;
    color: $text_primary;
    margin: -24px 0 40px;
    font-size: 16px;
  }

  .resource-tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .resource-tab-btn {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 10px;
    padding: 10px 20px;
    color: $text_primary;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: $transition;

    &:hover {
      border-color: rgba(0, 242, 234, 0.3);
      color: $heading_primary;
    }

    &.active {
      background: rgba(0, 242, 234, 0.1);
      border-color: rgba(0, 242, 234, 0.4);
      color: $primary_cyan;
    }
  }

  .resource-preview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .resource-preview-card {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 16px;
    padding: 24px;

    h4 {
      color: $heading_primary;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 12px;
    }

    .email-subject {
      color: $primary_cyan;
      font-size: 13px;
      font-weight: 500;
      margin: 0 0 8px;
    }

    .preview-content {
      color: $text_light;
      font-size: 13px;
      line-height: 1.6;
      margin: 0;
    }
  }
}
```

---

## Section 8: Why Promote TokScript (NEW — `.why-promote-section`)

### JSX
```jsx
<div className="affiliate-section why-promote-section">
  <h2>Why Promote TokScript?</h2>
  <div className="why-promote-grid">
    <div className="reason-card">
      <div className="reason-icon">🔍</div>
      <h4>Proven Search Demand</h4>
      <p>46K+ monthly organic clicks — people are already searching for this.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">💲</div>
      <h4>Low Price, High Conversion</h4>
      <p>Starting at $19/mo — easy impulse buy with massive perceived value.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">🔄</div>
      <h4>Strong Retention</h4>
      <p>Users stick around — meaning your recurring commission keeps flowing.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">🎯</div>
      <h4>Optimized Funnel</h4>
      <p>High-converting landing pages, free trial, and onboarding built to convert.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">📊</div>
      <h4>Massive Market</h4>
      <p>2B+ TikTok users worldwide. The addressable market is enormous.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">🌎</div>
      <h4>Global Reach</h4>
      <p>Users in 100+ countries — promote to any audience, anywhere.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">🎬</div>
      <h4>2.6M+ Videos Processed</h4>
      <p>Battle-tested platform with proven demand and reliability.</p>
    </div>
    <div className="reason-card">
      <div className="reason-icon">💵</div>
      <h4>Two Income Streams</h4>
      <p>Stack revenue share + pay-per-views for maximum earning potential.</p>
    </div>
  </div>
</div>
```

### SCSS
```scss
.why-promote-section {
  .why-promote-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;

    @media screen and (max-width: 576px) {
      grid-template-columns: 1fr;
      gap: 16px;
    }
  }

  .reason-card {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 576px) {
      padding: 20px;
    }

    .reason-icon {
      font-size: 28px;
      margin-bottom: 12px;
    }

    h4 {
      color: $heading_primary;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 6px;
    }

    p {
      color: #d1d5db !important;
      font-size: 14px;
      line-height: 1.5;
      margin: 0;
    }
  }
}
```

---

## Section 9: See TokScript in Action (NEW — `.in-action-section`)

### JSX
```jsx
<div className="affiliate-section in-action-section">
  <h2>See TokScript in Action</h2>
  <p className="section-subtitle">
    Show your audience exactly what they get — in 4 simple steps.
  </p>
  <div className="walkthrough-grid">
    <div className="walkthrough-step">
      <div className="step-number">1</div>
      <h4>Paste Any TikTok Link</h4>
      <p>Users simply paste a TikTok URL into TokScript — no downloads or extensions needed.</p>
    </div>
    <div className="walkthrough-step">
      <div className="step-number">2</div>
      <h4>Get Full Transcript</h4>
      <p>TokScript generates an accurate, searchable transcript of the video in seconds.</p>
    </div>
    <div className="walkthrough-step">
      <div className="step-number">3</div>
      <h4>Run AI Agents</h4>
      <p>Powerful AI agents analyze the content — extracting hooks, strategies, trends, and insights.</p>
    </div>
    <div className="walkthrough-step">
      <div className="step-number">4</div>
      <h4>Export & Take Action</h4>
      <p>Export transcripts, save insights, and build a content strategy based on real data.</p>
    </div>
  </div>
</div>
```

### SCSS
```scss
.in-action-section {
  .section-subtitle {
    text-align: center;
    color: $text_primary;
    margin: -24px 0 40px;
    font-size: 16px;
  }

  .walkthrough-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media screen and (max-width: 767px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    @media screen and (max-width: 576px) {
      grid-template-columns: 1fr;
    }
  }

  .walkthrough-step {
    background: $primary_bg_color;
    border: 1px solid $border_primary;
    border-radius: 16px;
    padding: 28px 20px;
    text-align: center;

    @media screen and (max-width: 576px) {
      padding: 24px 20px;
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(
        180deg,
        rgba(0, 242, 234, 0.2) 0%,
        rgba(0, 242, 234, 0.05) 100%
      );
      border: 1px solid rgba(0, 242, 234, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      color: $primary_cyan;
      font-weight: 700;
      font-size: 16px;
    }

    h4 {
      color: $heading_primary;
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px;
    }

    p {
      color: #d1d5db !important;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
  }
}
```

---

## Section 10: Stats & Social Proof Bar (NEW — `.stats-bar-section`)

### JSX
```jsx
<div className="affiliate-section stats-bar-section">
  <div className="stats-bar">
    <div className="stat-item">
      <div className="stat-value">30K+</div>
      <div className="stat-label">Users</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">2.6M+</div>
      <div className="stat-label">Videos Processed</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">$10M+</div>
      <div className="stat-label">Creator Sales Tracked</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">46K+</div>
      <div className="stat-label">Monthly Organic Clicks</div>
    </div>
    <div className="stat-item">
      <div className="stat-value">100+</div>
      <div className="stat-label">Countries</div>
    </div>
  </div>
</div>
```

### SCSS
```scss
.stats-bar-section {
  .stats-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: linear-gradient(
      164.95deg,
      rgba(0, 242, 234, 0.1) 0%,
      rgba(0, 242, 234, 0.02) 50%,
      rgba(0, 242, 234, 0.06) 100%
    );
    border: 1px solid rgba(0, 242, 234, 0.1);
    border-radius: 24px;
    padding: 40px 32px;
    flex-wrap: wrap;
    gap: 24px;

    @media screen and (max-width: 767px) {
      padding: 32px 24px;
      gap: 20px;
    }

    @media screen and (max-width: 576px) {
      flex-direction: column;
      text-align: center;
      padding: 32px 20px;
    }
  }

  .stat-item {
    text-align: center;

    .stat-value {
      font-size: 32px;
      font-weight: 800;
      color: $primary_cyan;
      line-height: 1.2;

      @media screen and (max-width: 767px) {
        font-size: 26px;
      }
    }

    .stat-label {
      font-size: 13px;
      color: $text_primary;
      margin-top: 4px;
    }
  }
}
```

---

## Section 11: FAQ (NEW — `.faq-main-section` wrapper)
Import: `import Accordion from "react-bootstrap/Accordion";`

### JSX
```jsx
<div className="faq-main-section affiliate-faq">
  <div className="faq-section">
    <h2>Frequently Asked Questions</h2>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>How do I sign up for the affiliate program?</Accordion.Header>
        <Accordion.Body>
          Click the "Become an Affiliate" button on this page to create your account. Once approved, you'll get instant access to your affiliate dashboard with your unique referral link and marketing materials.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>How much commission do I earn?</Accordion.Header>
        <Accordion.Body>
          You earn 40% recurring commission on every payment your referrals make — whether monthly or annual. For a monthly subscriber ($19/mo), that's $7.60/mo. For annual ($99/yr), that's $39.60/yr. Commission continues for the entire customer lifetime.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>What is the pay-per-view program?</Accordion.Header>
        <Accordion.Body>
          Our Track 2 program pays you for creating content about TokScript. Earn $100 for 50K views, $250 for 100K views, $500 for 500K views, and $1,000 for 1M views. You can stack this with referral commissions.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3">
        <Accordion.Header>How long does the cookie last?</Accordion.Header>
        <Accordion.Body>
          We use a 30-day cookie window. If someone clicks your referral link and signs up within 30 days, you receive credit for that referral.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4">
        <Accordion.Header>When and how do I get paid?</Accordion.Header>
        <Accordion.Body>
          Payouts are processed monthly via PayPal or Stripe. You can track your earnings in real-time through your affiliate dashboard. Minimum payout threshold is $50.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5">
        <Accordion.Header>Can I promote TokScript on any platform?</Accordion.Header>
        <Accordion.Body>
          Yes! You can share your affiliate link on YouTube, TikTok, Instagram, Twitter/X, your blog, email newsletter, Discord communities, or anywhere your audience is. We provide ready-made content for all major platforms.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6">
        <Accordion.Header>Do I need to be a TokScript user to be an affiliate?</Accordion.Header>
        <Accordion.Body>
          While it's not required, we highly recommend it. Being a user gives you authentic experience to share, which significantly improves conversion rates. Most of our top affiliates are active TokScript users.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7">
        <Accordion.Header>Is there a minimum number of referrals?</Accordion.Header>
        <Accordion.Body>
          No minimum. Whether you refer 1 person or 1,000, you earn 40% on each. There's also no cap on earnings — the more you refer, the more you earn.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="8">
        <Accordion.Header>What marketing materials do you provide?</Accordion.Header>
        <Accordion.Body>
          We provide banners, social media post templates, pre-written emails, video scripts, and more. All materials are available in your affiliate dashboard and designed to convert.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="9">
        <Accordion.Header>Can I earn from both tracks simultaneously?</Accordion.Header>
        <Accordion.Body>
          Absolutely! You can earn recurring commissions from referrals AND pay-per-view bonuses from content creation at the same time. They stack — a viral video could earn you view bonuses while also driving referral sign-ups.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="10">
        <Accordion.Header>How do I track my performance?</Accordion.Header>
        <Accordion.Body>
          Your affiliate dashboard provides real-time tracking of clicks, conversions, active subscriptions, and earnings. You can see exactly which links are performing best and optimize your strategy accordingly.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  </div>
</div>
```

### SCSS
```scss
.affiliate-faq {
  padding: 0 0 80px !important;
  max-width: 1000px;
  margin: 0 auto;

  .faq-section {
    h2 {
      text-align: center;
      margin: 0 0 40px;
      color: $heading_primary;

      @media screen and (max-width: 576px) {
        margin: 0 0 24px;
      }
    }
  }
}
```

---

## Section 12: Final CTA (UPDATE `.cta-section`)

### JSX
```jsx
<div className="affiliate-section cta-section">
  <div className="cta-card">
    <h2>Start Earning With TokScript Today</h2>
    <p>
      Whether you're building a content empire or looking for reliable passive income,
      TokScript's affiliate program gives you two powerful ways to earn. 40% recurring
      commission on referrals plus pay-per-view bonuses — no cap, no limits.
    </p>
    <div className="cta-buttons">
      <a
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?ref=affiliate`}
        className="btn-style has-shadow w-500"
      >
        Become an Affiliate
      </a>
      <a
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`}
        className="btn-outline"
      >
        Log In to Dashboard
      </a>
    </div>
    <p className="cta-contact">
      Questions? Contact us at{" "}
      <a href="mailto:affiliates@tokscript.com">affiliates@tokscript.com</a>
    </p>
  </div>
</div>
```

### SCSS (add inside `.cta-section .cta-card`)
```scss
.cta-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 24px;

  .btn-outline {
    padding: 14px 40px;
    font-size: 16px;
    border-radius: 10px;
    border: 1px solid rgba(0, 242, 234, 0.4);
    background: transparent;
    color: $primary_cyan;
    font-weight: 500;
    text-decoration: none;
    transition: $transition;

    &:hover {
      background: rgba(0, 242, 234, 0.1);
    }
  }
}

.cta-contact {
  color: $text_primary !important;
  font-size: 14px !important;
  margin: 0 !important;

  a {
    color: $primary_cyan;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
```

---

## page.js Metadata Update

```js
export const metadata = {
  title: "TokScript Affiliate Program — Earn 40% Recurring + Pay-Per-View Bonuses",
  description:
    "Join the TokScript affiliate program and earn 40% recurring commission plus pay-per-view bonuses up to $1,000. Two earning tracks, ready-made marketing materials, and monthly payouts.",
  alternates: {
    canonical: "https://tokscript.com/affiliate",
  },
  openGraph: {
    title: "TokScript Affiliate Program — Earn 40% Recurring + Pay-Per-View Bonuses",
    description:
      "Earn 40% recurring commission plus pay-per-view bonuses up to $1,000. Two earning tracks, no cap on earnings.",
    url: "https://tokscript.com/affiliate",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Affiliate Program",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript Affiliate Program — Earn 40% + Pay-Per-View Bonuses",
    description:
      "Earn 40% recurring commission plus pay-per-view bonuses up to $1,000. Two earning tracks, no cap.",
    images: ["https://tokscript.com/og-image.png"],
  },
};
```
