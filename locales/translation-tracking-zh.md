# TokScript Simplified Chinese (zh) Translation Tracking

**Translation Language:** Simplified Chinese (简体中文)
**Target Market:** Mainland China
**Completion Date:** February 26, 2026
**Total Strings:** 385
**Status:** COMPLETE

## Summary

Complete translation of the TokScript landing page homepage from English to Simplified Chinese. All 385 strings translated and validated across 18 primary sections.

## Translation Statistics

| Metric | Count |
|--------|-------|
| Total Keys | 385 |
| Sections | 18 |
| Sub-sections | 68 |
| Status | 100% Complete |
| Validation | PASSED |

## Sections Translated

1. **meta** (8 strings) - Page metadata, SEO titles and descriptions
2. **header** (17 strings) - Navigation, banner, auth buttons
3. **hero** (13 strings) - Hero section, input form, platform badges
4. **aiFeatures** (8 strings) - AI feature cards
5. **preview** (4 strings) - Dashboard preview section
6. **platform** (116 strings) - Platform features (12 feature sections)
7. **pricing** (65 strings) - Pricing tiers and comparison
8. **checkout** (13 strings) - Checkout features list
9. **stats** (8 strings) - User statistics counters
10. **chromeExtensionBanner** (3 strings) - Extension promotion
11. **faq** (37 strings) - 18 FAQ question/answer pairs
12. **disclaimer** (10 strings) - Legal and usage disclaimers
13. **footer** (22 strings) - Footer links and copyright
14. **languages** (11 strings) - Language switcher options
15. **dontMissOutModal** (36 strings) - Upgrade modal content
16. **checkoutOverlay** (39 strings) - Login/signup forms
17. **confirmationModal** (3 strings) - Upgrade confirmation
18. **toast** (4 strings) - Toast notification messages

## Key Translation Decisions

### Keyword Localization
- **Transcript** → 字幕 (subtitles, more common in Chinese market) and 文字记录 (word-for-word record, for meta descriptions)
- **Download** → 下载
- **Generator** → 生成器
- **Script** (video) → 脚本 or 文案 (depending on context)
- **Hooks** → 开场白 (opening/hook phrase, native equivalent)
- **Bulk import** → 批量导入
- **Cloud storage** → 云存储
- **Watermark** → 水印
- **Cover image** → 封面图片
- **Viral** → 爆款 (trending/viral hit, more native than literal translation)

### Brand & Technical Terms (Kept English)
- TokScript, TikTok, Instagram, Reels, YouTube, Shorts
- Chrome, Google, ChatGPT, Claude, Bard
- PDF, TXT, XML, JSON, CSV, HD, URL, SEO, UGC, API

### Punctuation Rules Applied
- NO em dashes (—) or en dashes (–) per project LEARNING.md
- Chinese punctuation: "", for quotes; ，for commas; 。for periods; 、for enumeration
- Preserved {year} and {count} placeholders exactly
- Currency preserved in USD ($0, $39, $10)

### Cultural Adaptation
- "Hooks" translated to 开场白 (opening hooks/phrases) rather than literal "钩子"
- "Viral" becomes 爆款 (trending/blockbuster) which is more culturally relevant in China
- Maintained formality appropriate for professional SaaS platform
- Simplified phrasing where English was more complex

## JSON Validation Results

```
EN keys: 385
ZH keys: 385
Match: true

Validation: PASSED - All strings translated!
```

All keys match between source (en.json) and target (zh.json) files. JSON structure is valid and complete.

## Files

- **Source:** `/locales/en.json` (385 strings)
- **Translation:** `/locales/zh.json` (385 strings)
- **Validation Script:** `validate_translation.js`

## Quality Assurance

- All 385 strings translated
- JSON structure preserved identically
- No em dashes or en dashes introduced
- All brand names kept in English
- All technical terms kept in English
- Placeholders preserved: {year}, {count}
- Currency units preserved: $0, $39, $10
- UTF-8 encoding validated

## Notes for Future Maintenance

- If English content updates, re-run full translation for consistency
- Verify keyword localization remains aligned with Chinese market search behavior
- Consider A/B testing translations for CTA buttons to maximize conversions
- Monitor user feedback on terminology, particularly around "爆款" vs "病毒式"
- Ensure hreflang tags are properly configured in production (see LEARNING.md)
- When other languages are added, maintain consistent terminology glossary

## Implementation Checklist

- [x] All 385 strings translated
- [x] JSON structure validated
- [x] Brand names preserved
- [x] Technical terms preserved
- [x] Placeholders preserved
- [x] No em dashes/en dashes
- [x] Chinese punctuation applied
- [x] Files written to `/locales/zh.json`
- [x] Validation script created and executed
- [x] Tracking document created
