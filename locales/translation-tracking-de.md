# German Translation Tracking — TokScript Landing Page

**Language:** German (Deutsch)
**Target Locale:** de
**Translation Date:** 2026-02-26
**Translator:** Claude (Professional German SaaS Translator)
**Status:** COMPLETE

---

## Summary

All 385 strings from `locales/en.json` have been successfully translated to German and saved to `locales/de.json`. JSON structure and key hierarchy are identical to the English source.

**Validation Results:**
- EN keys: 385
- DE keys: 385
- Match: ✅ YES
- All keys present: ✅ YES

---

## Translation Rules Applied

### Language & Formality
- **Standard German (Hochdeutsch)** throughout
- **Formal "Sie"** used consistently for SaaS context
- Professional B2B tone appropriate for content creators and agencies

### Brand Names (Preserved in English)
- TokScript (product name)
- TikTok, Instagram Reels, YouTube Shorts (platforms)
- Chrome (browser)
- Google, ChatGPT, Claude, Bard (external services)
- Featurebase (support tool)

### Technical Terms (English)
- PDF, TXT, XML, JSON, CSV (file formats)
- HD (video quality)
- URL, SEO, API (technical abbreviations)
- UGC (User Generated Content)

### Currency (Preserved)
- $0, $3.25, $10, $39, $39/yr, $120/year, $81 (all in USD as original)

### Punctuation Rules (Per LEARNING.md)
- **NO em dashes (—) or en dashes (–)**
- Replaced all em dashes with commas, semicolons, colons, or periods as appropriate
- Example: "feature A — feature B" → "feature A, feature B"

### Keyword Localization

| English | German Translation | Usage |
|---------|-------------------|-------|
| Transcript | Transkript (formal) / Untertitel (subtitles context) | Both used contextually |
| Download | Herunterladen (verb) / Download (noun/button) | Both used appropriately |
| Generator | Generator | Same in German |
| Script (video) | Skript / Drehbuch | Skript used predominantly |
| Hooks | Hooks (kept as is — common in German marketing) | Maintained as "Hooks" |
| Bulk import | Massenimport | Exact translation |
| Cloud storage | Cloud-Speicher | Standard German term |
| Watermark | Wasserzeichen | Exact translation |
| Cover image | Titelbild | Standard German term |
| Viral | Viral (same in German) | Preserved as "Viral" |

### Placeholders (Preserved Exactly)
- `{year}` → `{year}` (copyright year)
- `{count}` → `{count}` (user count)
- All placeholder syntax preserved for dynamic content injection

---

## Section-by-Section Summary

| Section | Strings | Status | Notes |
|---------|---------|--------|-------|
| meta | 8 | ✅ | Page titles, descriptions, OG tags |
| header | 23 | ✅ | Navigation, buttons, auth labels |
| hero | 14 | ✅ | Main headline, input placeholders, error messages |
| aiFeatures | 11 | ✅ | AI feature cards (hooks, scripts, analysis) |
| preview | 5 | ✅ | Dashboard preview section |
| platform | 80 | ✅ | Feature section with 9 subsections (bulk import, collections, cloud storage, history, media downloads, quick URL, chrome extension, team collab, AI agents) |
| pricing | 59 | ✅ | Three pricing tiers (Free, Annual, Monthly) with full features |
| checkout | 13 | ✅ | Checkout feature list and CTAs |
| stats | 9 | ✅ | User statistics counter (videos, profiles, hours saved, minutes) |
| chromeExtensionBanner | 3 | ✅ | Chrome extension promotion banner |
| faq | 39 | ✅ | 18 FAQ Q&A pairs covering common questions |
| disclaimer | 12 | ✅ | About, TikTok Ads, UGC Creators, AI, legal disclaimer |
| footer | 19 | ✅ | Footer links (Generators, Product, Company) and copyright |
| languages | 11 | ✅ | Language selector options |
| dontMissOutModal | 27 | ✅ | Feature upgrade modal with AI agents |
| checkoutOverlay | 43 | ✅ | Login/signup forms, validation, toasts, account creation |
| confirmationModal | 5 | ✅ | Subscription upgrade confirmation |
| toast | 4 | ✅ | Toast notifications (success, error messages) |

**Total Sections:** 18
**Total Strings:** 385

---

## Quality Checks Performed

✅ **JSON Structure Validation**
- Parsed successfully without syntax errors
- All 385 keys present (no missing, no extra)
- Nested object hierarchy identical to English source

✅ **Placeholder Integrity**
- `{year}` and `{count}` preserved exactly in all contexts
- No accidental placeholder modification

✅ **No Forbidden Punctuation**
- Scanned all translated text for em dashes (—) and en dashes (–)
- None found. Replaced all em dashes with commas/periods
- All punctuation follows LEARNING.md rules

✅ **Brand & Technical Terms**
- All brand names (TokScript, TikTok, Instagram, YouTube, Chrome, Google, ChatGPT, Claude, Bard) preserved in English
- All technical acronyms (PDF, TXT, XML, JSON, CSV, HD, URL, SEO, API, UGC) preserved
- All currency symbols ($) preserved with numeric values

✅ **Formal "Sie" Usage**
- Consistent use of formal German throughout
- All CTAs and user-facing copy use "Sie" (e.g., "Geben Sie ein", "Greifen Sie zu")
- No informal "du" or "ihr" forms used

✅ **Keyword Localization**
- "Transcript" appropriately translated as "Transkript" or "Untertitel" depending on context
- "Download" used as both verb (Herunterladen) and noun (Download) correctly
- "Bulk import" consistently translated as "Massenimport"
- "Cloud storage" consistently translated as "Cloud-Speicher"
- "Watermark" consistently translated as "Wasserzeichen"
- "Hooks" and "Viral" kept as English terms (common in German marketing)

✅ **Contextual Accuracy**
- All UI labels properly translated for German-speaking users
- Pricing and payment terms clear and localized
- FAQ answers fully translated with context preserved
- Feature descriptions maintain original meaning and marketing intent

---

## Special Translation Decisions

### 1. "Transcript" vs. "Transkript" vs. "Untertitel"
- **Primary:** "Transkript" (formal, technical transcription)
- **Secondary:** "Untertitel" (when explicitly referring to subtitles/captions)
- **Context:** Used based on whether the feature refers to text transcription (Transkript) or video captions (Untertitel)

### 2. "Download" as Verb vs. Noun
- **Verb:** "Herunterladen" (e.g., "Laden Sie herunter")
- **Noun/Button:** "Download" or "Herunterladen" (used both, contextually appropriate)
- **Reasoning:** German commonly uses "Herunterladen" in UI, but "Download" also acceptable as noun

### 3. "Hooks" (Marketing Term)
- **Decision:** Kept as English "Hooks"
- **Reasoning:** "Hooks" is industry-standard terminology in German marketing/content creation circles. German alternatives like "Aufhänger" are less common in this context.

### 4. "Viral" (English Adjective)
- **Decision:** Kept as "Viral"
- **Reasoning:** Widely used in German marketing and social media contexts. Pure German equivalent "ansteckend" or "virenähnlich" would be awkward.

### 5. Massenimport & Bulk Processing
- **Translation:** "Massenimport" (mass import), "Massen-Verarbeitung" (batch processing)
- **Reasoning:** Clear, professional German terms for high-volume operations

### 6. Cloud-Speicher
- **Translation:** "Cloud-Speicher" with hyphen
- **Reasoning:** Standard German compound noun formation

### 7. Formal "Sie" Consistency
- All user-facing instructions use "Sie" (e.g., "Geben Sie ein" = "Enter/You enter")
- All CTAs use formal imperative (e.g., "Laden Sie herunter" = "Download")
- Professional SaaS tone appropriate for business users and agencies

---

## Files Modified

1. `/sessions/zen-eloquent-darwin/mnt/tokscript-landing-page/locales/de.json` — Created (COMPLETE)
2. `/sessions/zen-eloquent-darwin/mnt/tokscript-landing-page/validate-translation.js` — Created (validation helper)
3. `/sessions/zen-eloquent-darwin/mnt/tokscript-landing-page/locales/translation-tracking-de.md` — Created (this document)

---

## Next Steps (For Implementation)

1. **Integration:** Add German locale to Next.js i18n routing (`/de` route)
2. **Language Switcher:** Add German to language dropdown in header navigation
3. **Metadata:** Ensure proper hreflang tags for SEO (German page should reference English and other locales)
4. **Testing:**
   - Visual regression testing on German locale pages
   - Translation accuracy review by native German speakers (optional but recommended)
   - Pricing display test (currency/numbers format)
   - Form validation message clarity
5. **Deployment:** Deploy German locale alongside English version
6. **Analytics:** Track German page performance and user feedback for future iterations

---

## Translation Maintenance Notes

- **When English is updated:** Re-run translations for all German keys that changed
- **FAQ updates:** If new FAQs are added to English, translate them to German before deployment
- **Pricing changes:** Ensure currency and pricing descriptions are accurate
- **Marketing copy:** Any new promotional text should be translated consistently using this glossary

---

## Glossary for Future Reference

**Common TokScript Terms in German:**

| English | German | Context |
|---------|--------|---------|
| Video Transcript | Video-Transkript | General term for output |
| Transcript | Transkript | Text version of video |
| Subtitles | Untertitel | Caption-specific context |
| Download | Herunterladen (verb), Download (noun) | Action or file |
| Bulk Import | Massenimport | Feature name |
| Cloud Storage | Cloud-Speicher | Feature name |
| HD Video | HD-Video | Video quality |
| Cover Image | Titelbild | Video cover/thumbnail |
| Watermark | Wasserzeichen | Video artifact |
| Hook (writing) | Hook | Industry term (keep English) |
| Viral | Viral | Industry term (keep English) |
| AI Agent | KI-Agent | Software feature |
| Script Writer | Script Writer / Skript-Schreiber | AI feature |
| Feature | Funktion | General product capability |
| Pricing Plan | Preisplan | Subscription tier |
| Subscribe | Abonnement / Abonnieren | Payment action |
| Chrome Extension | Chrome-Erweiterung | Browser tool |
| Team Collaboration | Teamzusammenarbeit | Feature name |
| Creator | Creator | Keep English (widely used) |
| Content | Inhalt / Content | Use both, contextually |

---

**Document prepared:** 2026-02-26
**Validation status:** All checks passed
**Ready for deployment:** YES
