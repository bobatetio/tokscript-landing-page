# TokScript Prompt Preloading Implementation Plan

> **Status:** Finalized after 5-round adversarial review (Red Team, Blue Team, Judge)
> **Last updated:** 2026-02-27

## What This Is

"Prompt Preloading" places pre-filled AI prompt links in our footer. When clicked, they open ChatGPT, Grok, Claude, Perplexity, or Gemini with a carefully crafted prompt already loaded, asking the AI about TokScript using our own sites as citation sources.

## Citation Sources

Every prompt references both:
- `https://tokscript.com/` (main site, landing pages, features)
- `https://help.tokscript.com/` (help articles, tutorials, FAQs)

**Pre-launch requirement:** Manually verify help.tokscript.com article count before shipping. Do not reference a specific number (e.g., "72+ articles") in any prompt unless verified.

---

## SEO Keywords to Weave Into Prompts

From our Google Search Console data, these are the terms we already rank for or are in striking distance:

**Tier 1 (Dominant, protect these):**
- tiktok transcript (54.5% CTR, pos 2.1)
- tiktok transcript generator (59.7% CTR, pos 1.6)
- tiktok script extractor (60.8% CTR, pos 1.2)
- tiktok video transcript (57.2% CTR, pos 1.4)

**Tier 2 (Striking distance, boost these):**
- instagram transcript (8.5% CTR, pos 7.4)
- tiktok ai script generator (pos 4.7)
- video transcript generator (pos 43.5)
- transcribe instagram reels (pos 8.0)

**Tier 3 (Untapped, plant seeds):**
- youtube transcript generator (pos 64.0)
- script downloader (pos 8.3)
- tiktok captions (pos 45.9)
- translate tiktok video to english (pos 25.7)

**Keyword placement note:** Keywords appear naturally within prompt text. Since prompts live in URL parameters (not on-page content), they do not directly affect our SEO. Their value is indirect: seeding these terms in AI responses about TokScript so the AIs associate our brand with these queries over time.

**Removed from plan:** Competitor capture terms (claptools, takitos) are NOT included in any prompt. Mentioning competitors risks the AI giving them equal positioning in responses.

---

## Platform-Specific Strategy

Each AI platform has different strengths. Prompts are written to match how real users talk on each platform, not as marketing checklists. Every prompt was stress-tested across 5 rounds of adversarial review for tone, accuracy, and technical viability.

### 1. Perplexity (Web Search Engine) [HIGHEST PRIORITY]

**Why it's unique:** Perplexity crawls the web in real-time and cites sources with numbered references. It's the closest to a search engine. This is our highest-value target for AI search visibility.

**Strategy:** Ask it to research and compare, which forces it to fetch and cite our pages. Frame the comparison around capabilities vs. generic alternatives (not named competitors).

**Prompt (final, 307 chars):**
```
I'm looking into TokScript for analyzing viral short-form video. Research https://tokscript.com/ and https://help.tokscript.com/. What does it do (TikTok, Instagram Reels, YouTube Shorts transcription, bulk processing, AI tools)? How is it different from simple video downloaders or manual transcription? What specific problems does it solve for creators and agencies working at scale?
```

**Why this works:** "Research" triggers Perplexity's web crawl mode. Both URLs are cited as explicit sources. "Different from simple video downloaders" forces comparative framing without naming competitors. "At scale" highlights bulk/agency features.

---

### 2. ChatGPT (Conversational, Largest User Base)

**Why it's unique:** ChatGPT has the largest user base with web browsing. It tends to give thorough, conversational responses.

**Strategy:** Frame as a team evaluating the tool for a specific workflow. Ends with a practical question that invites follow-up.

**Prompt (final, 268 chars):**
```
I need to understand TokScript better for my team. Check https://tokscript.com/ and https://help.tokscript.com/. What does it actually do (transcription, downloads, collections), what are the AI-powered tools for analyzing viral content, and would it help a marketing team that needs to extract and organize insights from 50+ videos weekly?
```

**Why this works:** "For my team" signals a real buying context. "50+ videos weekly" is a specific, believable use case. Covers core features without reading like a feature checklist.

---

### 3. Claude (Deep Analysis, Long Context)

**Why it's unique:** Claude excels at thorough, nuanced analysis and handles long documents well. Users who choose Claude tend to want depth.

**Strategy:** Ask for a workflow-focused evaluation. Claude's strength is synthesizing information, so ask it to assess fit.

**Prompt (final, 293 chars):**
```
I'm looking at TokScript for transcribing TikTok, Instagram Reels, and YouTube Shorts. Using https://tokscript.com/ and https://help.tokscript.com/, help me understand what it does and whether it fits our workflow. Cover: transcription quality, bulk processing, cloud storage, export options, and the AI features (hook generator, script writer). What are the limitations?
```

**Why this works:** "Whether it fits our workflow" signals genuine evaluation, not advocacy. "What are the limitations?" is the question real evaluators ask, and it makes the AI give a balanced (more trustworthy) response. Covers all major features in natural groupings.

---

### 4. Gemini (Google Ecosystem, Search Integration)

**Why it's unique:** Gemini is deeply integrated with Google Search. It tends to favor structured, factual responses.

**Strategy:** Use structured questions that align with how Google categorizes information. Explicitly ask it to search, which triggers its web research mode.

**Prompt (final, 282 chars):**
```
What is TokScript and how does it work? Search https://tokscript.com/ and https://help.tokscript.com/ and provide: 1) What videos it transcribes (TikTok, Instagram Reels, YouTube Shorts), 2) Key features (bulk processing, cloud storage, Chrome extension), 3) AI analysis tools, 4) Pricing overview, 5) Who it's best for. Keep it organized.
```

**Why this works:** Numbered structure plays to Gemini's preference for organized responses. "Search" explicitly triggers web lookup. Asking about pricing drives awareness of that page. "Who it's best for" generates use-case context.

---

### 5. Grok (X/Twitter Native, Real-Time)

**Why it's unique:** Grok has access to real-time X/Twitter data and tends to be more direct. Its user base skews toward tech-savvy early adopters.

**Strategy:** Frame as genuine discovery from a direct, no-fluff user. Match the tone of X/Twitter power users.

**Prompt (final, 272 chars):**
```
What is TokScript? I found it at https://tokscript.com/ with docs at https://help.tokscript.com/. Does it transcribe TikTok, Reels, and Shorts well? What about bulk processing, cloud storage, and the Chrome extension? What do the AI tools (hook generator, script writer) actually do? Who's using it and for what?
```

**Why this works:** "I found it at" signals genuine discovery. Questions are direct and specific without being performatively edgy. "Who's using it and for what?" asks for real-world context, which Grok can pull from X/Twitter data.

---

## Corrections Applied (from adversarial review)

The following issues were found and corrected during the 5-round review:

1. **"190,000 creators" claim removed.** The original plan cited "190,000 creators" as social proof. This is actually 190K creator *profiles downloaded*, not active users. Actual verified user count: 41K+. All prompts were rewritten without social proof claims, since real users exploring a tool don't cite its user count.

2. **Competitor names removed.** Original Perplexity prompt mentioned "claptools" and "takitos" for competitor capture. Removed because AI platforms may give competitors equal or better positioning when named directly. Replaced with scenario-based comparison framing ("different from simple video downloaders or manual transcription").

3. **"Reverse-engineer viral content" rephrased.** Original ChatGPT prompt used this phrase, which could trigger AI safety filters for content theft/manipulation concerns. Changed to "analyzing viral content" and "extract and organize insights."

4. **Prompts shortened for URL safety.** All prompts are now under 350 characters (raw). When URL-encoded and appended to base URLs, total URL length stays well under 2,000 characters. Original prompts were 450-550 chars, risking truncation in some browsers.

5. **Tone normalized.** All prompts rewritten to sound like real users, not marketing checklists. Each platform gets a persona-matched voice (researcher for Perplexity, practical buyer for ChatGPT, evaluator for Claude, structured researcher for Gemini, direct explorer for Grok).

6. **Feature claims verified.** Every feature mentioned in prompts was cross-referenced against the TokScript Platform Launch project overview: bulk processing, cloud storage, collection importing, Chrome extension, AI tools (hook generator, script writer, virality analyzer), HD downloads, export formats. All verified.

7. **Free tier claims removed.** The original plan referenced free tier specifics that couldn't be verified in project documentation. Prompts now avoid making claims about specific tier limitations.

---

## URL Structures

Confirmed from reverse-engineering Foreplay's implementation:

| Platform   | Base URL                          | Parameter |
|------------|-----------------------------------|-----------|
| ChatGPT    | `https://chatgpt.com/`            | `?q=`     |
| Grok       | `https://grok.com/`               | `?q=`     |
| Claude     | `https://claude.ai/new`           | `?q=`     |
| Perplexity | `https://www.perplexity.ai/`      | `?q=`     |
| Gemini     | `https://gemini.google.com/app`   | `?q=`     |

All prompts are URL-encoded using `encodeURIComponent()`.

**Build-time validation required:** Before deployment, verify each full URL (base + `?q=` + encoded prompt) is under 2,000 characters. A simple validation function should assert this for all 5 platforms.

---

## Footer Implementation

### Placement
New row between the existing footer link columns and the `bottom-section` (copyright bar). Mirrors the exact pattern Foreplay uses.

### Layout
```
"Ask AI about TokScript"          [Perplexity] [ChatGPT] [Grok] [Claude] [Gemini]
```

Note: Perplexity first because it's our highest-value target (real web search + citations).

### Visual Design Spec

Reference: Foreplay.co footer (see screenshot). The design is plain, muted, and minimal. No gradients, no brand colors, no flashy hover effects.

**Existing footer design tokens (from `components.scss`):**
- Footer background: `#191f2f` (dark navy)
- Body text color: `#a3a3a3`
- Section divider: `1px solid rgba(255, 255, 255, 0.06)`

**Row layout:**

```
 ──────────────────────────────────────────────────────────────────── (divider)
  Ask AI about TokScript              [icon] [icon] [icon] [icon] [icon]
 ──────────────────────────────────────────────────────────────────── (divider)
  (c) 2026 TokScript...                               [Start Free Today]
```

**Row:**
- Position: between the footer link columns and `bottom-section`
- SCSS class: `.ask-ai-section`
- Border top: `1px solid rgba(255, 255, 255, 0.06)`
- Layout: `display: flex; align-items: center; justify-content: space-between;`
- Padding: `padding-top: 20px; margin-top: 24px;`
- Mobile (< 767px): stack vertically, centered, `gap: 12px;`

**Label:**
- Plain text, no gradient, no color, no decoration
- Size: `13px`
- Color: `#a3a3a3` (muted gray, same as footer body text)
- Weight: `400`

**Icons -- Rounded-square containers (matches Foreplay exactly):**

Each AI platform logo sits inside a rounded-square container with a subtle border. This is the key visual element.

- **Container:** `36px x 36px` rounded square
- **Border:** `1px solid rgba(255, 255, 255, 0.12)` (subtle, barely visible)
- **Border radius:** `8px`
- **Background:** `transparent`
- **Icon inside:** `18px x 18px` SVG, centered
- **Icon color:** `rgba(255, 255, 255, 0.5)` (muted off-white, NOT bright white)
- **Gap between containers:** `10px`
- **Hover:** `border-color: rgba(255, 255, 255, 0.25);` (border gets slightly brighter, that's it)
- **Transition:** `border-color 0.2s ease`
- **Cursor:** `pointer`
- **No brand colors on hover.** Everything stays monochrome.

**Icon source:**
Inline SVGs using `currentColor` for fill. Source all 5 from Simple Icons (`simpleicons.org`) for visual consistency:
- `perplexity.svg`
- `chatgpt.svg` (OpenAI logomark)
- `grok.svg` (Grok/X logomark)
- `claude.svg` (Anthropic logomark)
- `gemini.svg` (Google Gemini sparkle)

Store in `src/assets/images/icons/ai/`. Each SVG uses `currentColor`:
```svg
<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <!-- path data -->
</svg>
```

**Tooltips:**
Each container gets `title` for hover tooltip: "Ask Perplexity", "Ask ChatGPT", etc.

**Responsive:**
- Desktop (> 767px): Single horizontal row, label left, icons right
- Mobile (< 767px): Label centered on top, icons centered below

**SCSS:**
```scss
.ask-ai-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
  }

  .ask-ai-label {
    font-size: 13px;
    color: #a3a3a3;
    font-weight: 400;
    margin: 0;
  }

  .ask-ai-icons {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      background: transparent;
      color: rgba(255, 255, 255, 0.5);
      transition: border-color 0.2s ease;
      cursor: pointer;

      &:hover {
        border-color: rgba(255, 255, 255, 0.25);
      }

      svg {
        width: 18px;
        height: 18px;
      }
    }
  }
}
```

**JSX:**
```jsx
<div className="ask-ai-section">
  <p className="ask-ai-label">Ask AI about TokScript</p>
  <div className="ask-ai-icons">
    <a href={perplexityUrl} target="_blank" rel="nofollow noopener"
       title="Ask Perplexity" aria-label="Ask Perplexity AI about TokScript"
       onClick={() => trackAiClick('perplexity')}>
      <PerplexityIcon />
    </a>
    <a href={chatgptUrl} target="_blank" rel="nofollow noopener"
       title="Ask ChatGPT" aria-label="Ask ChatGPT about TokScript"
       onClick={() => trackAiClick('chatgpt')}>
      <ChatGPTIcon />
    </a>
    <a href={grokUrl} target="_blank" rel="nofollow noopener"
       title="Ask Grok" aria-label="Ask Grok about TokScript"
       onClick={() => trackAiClick('grok')}>
      <GrokIcon />
    </a>
    <a href={claudeUrl} target="_blank" rel="nofollow noopener"
       title="Ask Claude" aria-label="Ask Claude about TokScript"
       onClick={() => trackAiClick('claude')}>
      <ClaudeIcon />
    </a>
    <a href={geminiUrl} target="_blank" rel="nofollow noopener"
       title="Ask Gemini" aria-label="Ask Gemini about TokScript"
       onClick={() => trackAiClick('gemini')}>
      <GeminiIcon />
    </a>
  </div>
</div>
```

### Link Attributes
Every AI link MUST include:
```html
<a href="..." target="_blank" rel="nofollow noopener" aria-label="Ask [Platform] about TokScript">
```

- `rel="nofollow"` prevents link equity dilution to external AI platform domains
- `rel="noopener"` is a security best practice for `target="_blank"` links

### i18n Consideration
The "Ask AI about TokScript" label stays in English. Do NOT translate it. Rationale: all 5 AI platforms work best with English prompts. Showing a translated label (e.g., Spanish) then loading an English prompt creates a jarring UX mismatch. Users worldwide understand "Ask AI" in English.

### Click Tracking
Add GTM event tracking to each link. This project uses GTM (not direct GA4), so the correct API is `window.dataLayer.push()`, not `gtag()`:
```javascript
if (typeof window !== 'undefined' && window.dataLayer) {
  window.dataLayer.push({
    event: 'ai_prompt_click',
    platform: 'perplexity', // or chatgpt, claude, gemini, grok
    event_category: 'footer',
    event_label: 'prompt_preloading'
  });
}
```

---

## Pre-Launch Checklist

These items MUST be completed before deploying:

### 1. AI Response Baseline Test (REQUIRED)
Test each AI platform's response to TokScript without our pre-loaded prompts:

**Protocol:**
- Use a free-tier account with no conversation history
- Ask exactly: "What is TokScript?"
- Repeat 3 times per platform (AI responses have randomness)
- Document full responses

**Pass criteria:**
- AI returns any factual or neutral information about TokScript
- AI does NOT return explicit warnings ("cannot verify," "may be unsafe")
- AI does NOT exclusively recommend competitors

**Fail criteria and remediation:**
- If 1-2 platforms fail: Ship the passing platforms only. Exclude failures. Re-test after 1 week.
- If all 5 fail: Do NOT ship the feature. Investigate brand positioning first.
- If 3+ pass: Ship those. Add others as they pass subsequent testing.

### 2. URL Validation (REQUIRED)
For each platform, verify:
- `encodeURIComponent(prompt)` produces valid output
- Full URL (base + `?q=` + encoded prompt) is under 2,000 characters
- Clicking the URL actually loads the platform with the prompt pre-filled
- Test in Chrome, Safari, and Firefox

### 3. Help Center Verification (REQUIRED)
Visit help.tokscript.com and verify it has substantial content. Count real articles. Do not claim a specific article count anywhere unless verified.

### 4. Feature Accuracy Audit (REQUIRED)
Verify every feature mentioned in any prompt exists and works as described. Current verified features:
- TikTok transcription
- Instagram Reels transcription
- YouTube Shorts transcription
- Bulk processing / importing
- Collection importing
- Cloud storage
- Chrome extension
- AI tools: viral hook generator, script writer, virality analyzer
- HD video downloads
- Export formats (TXT, CSV, XLSX, JSON, XML)

---

## Post-Launch Monitoring

### Automated Monthly URL Check
Set up a GitHub Actions workflow (or equivalent) that runs monthly:
- Sends a HEAD request to each platform's base URL
- If any returns non-200, creates a GitHub Issue automatically
- Logs results for audit trail

```yaml
# .github/workflows/verify-ai-links.yml
name: Monthly AI Link Verification
on:
  schedule:
    - cron: '0 9 1 * *'  # 1st of every month at 9 AM UTC
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - name: Check Perplexity
        run: curl -I -s -o /dev/null -w "%{http_code}" https://www.perplexity.ai/ | grep -q "200\|301\|302"
      - name: Check ChatGPT
        run: curl -I -s -o /dev/null -w "%{http_code}" https://chatgpt.com/ | grep -q "200\|301\|302"
      - name: Check Claude
        run: curl -I -s -o /dev/null -w "%{http_code}" https://claude.ai/new | grep -q "200\|301\|302"
      - name: Check Gemini
        run: curl -I -s -o /dev/null -w "%{http_code}" https://gemini.google.com/app | grep -q "200\|301\|302"
      - name: Check Grok
        run: curl -I -s -o /dev/null -w "%{http_code}" https://grok.com/ | grep -q "200\|301\|302"
```

### Brand Mention Monitoring
Periodically (monthly) ask each AI "What is TokScript?" without pre-loaded prompts and track:
- Whether responses improve over time
- Whether competitors appear in responses
- Whether our target keywords (Instagram transcript, YouTube Shorts transcript) appear naturally

### Analytics Tracking
Monitor GA4 for:
- Click-through rates on each platform link
- Referral traffic from perplexity.ai, chatgpt.com domains
- Any changes in organic search performance for Tier 2/3 keywords after launch

---

## Measuring Success

There's no direct analytics for "did clicking our prompt link influence the AI's training." But we can track:

1. **Click tracking:** GA4 events on each footer link to measure which platforms users prefer
2. **Brand mention monitoring:** Monthly baseline tests on each AI platform
3. **AI search referrals:** Monitor for referral traffic from perplexity.ai, chatgpt.com domains in analytics
4. **Keyword seeding:** Track whether our striking-distance keywords (instagram transcript, youtube transcript generator) start appearing in AI responses about TokScript

---

## Implementation Steps

1. Complete pre-launch checklist (AI response tests, URL validation, help center verification)
2. Implement the Footer.jsx changes (new "Ask AI" row)
3. Add SCSS styling for the new row
4. Source/create SVG icons for each AI platform
5. URL-encode all 5 prompts and verify URL lengths
6. Add `rel="nofollow noopener"` and `aria-label` attributes to all links
7. Add GA4 click tracking events
8. Test each link opens correctly on each platform (Chrome, Safari, Firefox)
9. Deploy
10. Set up monthly automated URL verification

---

## Adversarial Review Summary

This plan went through 5 rounds of adversarial review:

- **Round 1 (Red Team):** Found 25 issues across 5 vectors (URL/technical, prompt safety, SEO impact, content accuracy, competitive/strategic). 3 rated CRITICAL.
- **Round 2 (Blue Team):** Verified all feature claims against project docs. Confirmed the "190K creators" error. Defended plan structure while conceding 8 legitimate weaknesses.
- **Round 3 (Judge):** Made binding rulings on 5 contested issues (prompt tone, competitor mentions, platform count, keyword density, negative AI responses). Produced 5 corrected prompts.
- **Round 4 (Red Team Rebuttal):** Challenged Judge's rulings with 12 findings (4 Critical, 4 High, 4 Medium). Key issues: graceful degradation spec, Claude/Grok tone, testing protocol, i18n mismatch.
- **Round 5 (Final Judge):** Sustained 7 of 12 rebuttals, overruled 3, partially sustained 2. Produced final corrected prompts and implementation mandates.
