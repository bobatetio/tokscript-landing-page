# Japanese Translation - TokScript Landing Page

**Translation Date:** 2026-02-26
**Target Language:** Japanese (日本語)
**Source Language:** English
**Total Strings:** 385
**Status:** Complete and Validated

---

## Key Terminology Decisions

### Transcription & Text
- **Transcript** → 「文字起こし」(moji okoshi)
  - Primary term for transcription service; most natural Japanese search term
  - Alternative when context requires: 「字幕」(jimaku) for subtitles/captions

- **Download** → 「ダウンロード」(katakana standard in Japanese tech marketing)

- **Script/Video script** → 「台本」(daihon) for theatrical/video scripts
  - Used in contexts like "viral script", "rewrite scripts"

### Platform & Marketing Terms
- **Viral/Virality** → 「バイラル」(バイラル) / 「バズ」(bazaru, more colloquial)
  - Used "バイラル" consistently as the standard marketing term
  - "バズる" avoided to maintain formal tone

- **Hooks** (viral engagement) → 「フック」(fukku)
  - Standard katakana term in Japanese marketing/content creation

- **Bulk import** → 「一括インポート」
  - Standard Japanese technical term for batch operations

- **Cloud storage** → 「クラウドストレージ」
  - Standard katakana, universally understood

- **Cover image** → 「カバー画像」
  - Alternative "サムネイル" (thumbnail) avoided as it implies smaller size

- **Watermark** → 「ウォーターマーク」(katakana)
  - Alternative "透かし" (sukashi) less common in modern marketing context

- **Bookmark/Bookmarking** → 「ブックマーク」
  - Katakana standard, aligns with global platform conventions

### Technical Terms (Preserved as Katakana/English)
- TikTok, Instagram Reels, YouTube Shorts (brand names - kept in English)
- Chrome (browser name - kept in English)
- Google, ChatGPT, Claude (company/product names - kept in English)
- PDF, TXT, XML, JSON, CSV (file formats - kept as-is)
- HD, URL, SEO, UGC, API (technical abbreviations - kept as-is)

### Formality & Tone
- **Main copy:** Polite/desu-masu form (です/ます) standard for B2B/SaaS
  - Example: 「TokScriptはAI搭載プラットフォームで、TikTok動画の文字起こしを生成できます。」

- **CTAs:** Mixed casual and formal depending on context
  - "今すぐ始める" (Let's start now) - inviting
  - "アップグレード" (Upgrade) - direct action

### Currency & Numbers
- Price in USD preserved: $0, $39, $10 (unchanged)
- Number formats localized: "260万本" (2.6 million videos) instead of "2.6M"
- Kept {year} and {count} placeholders exactly as in source

### Punctuation
- **NO em dashes (—) or en dashes (–)** per LEARNING.md requirement
- Used Japanese punctuation: 「」for quotation, 、 for commas, 。 for periods
- Periods used naturally in sentence-final positions only

---

## Sections Translated (All 18)

1. **meta** - Page titles, descriptions, OG tags (10 strings)
2. **header** - Navigation, auth buttons, hamburger menu (12 strings)
3. **hero** - Hero section, input placeholder, platform support (8 strings)
4. **aiFeatures** - Feature cards for AI capabilities (6 strings)
5. **preview** - Dashboard preview section (5 strings)
6. **platform** - 8 feature sections with detailed descriptions (75 strings)
7. **pricing** - 3 pricing tiers with features and CTAs (53 strings)
8. **checkout** - Checkout feature list and CTAs (11 strings)
9. **stats** - User stats and counter labels (5 strings)
10. **chromeExtensionBanner** - Extension promotion (3 strings)
11. **faq** - 18 FAQ questions and answers (37 strings)
12. **disclaimer** - Legal disclaimers and use cases (7 strings)
13. **footer** - Footer links and CTA (15 strings)
14. **languages** - Language selector options (11 strings)
15. **dontMissOutModal** - Feature upgrade modal (17 strings)
16. **checkoutOverlay** - Login/signup forms and validation (28 strings)
17. **confirmationModal** - Subscription upgrade confirmation (4 strings)
18. **toast** - Notification messages (4 strings)

---

## Validation Results

✓ **All 385 keys matched between en.json and ja.json**
- No missing keys
- No extra keys
- JSON structure identical

---

## SEO Considerations for Japanese Market

1. **文字起こし** (transcription) is the primary search term Japanese creators use
2. **バイラル** marketing language resonates with content creator demographic
3. **一括インポート** (bulk import) terminology matches Japanese SaaS conventions
4. Formal tone establishes trust with Japanese business users
5. Katakana used consistently for marketing terms (not mixed with Chinese characters)

---

## Notes for Future Updates

- If adding new strings, follow the terminology decisions above
- Maintain desu-masu formality for main copy
- Keep all brand/product names in English (TikTok, Google, etc.)
- Avoid em/en dashes; use Japanese punctuation instead
- Test Japanese SEO rankings for key terms before major revisions
