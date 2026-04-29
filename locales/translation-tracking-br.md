# Brazilian Portuguese (pt-BR) Translation Tracking

## Translation Decisions & Keyword Localization

### SEO-Critical Term Choices
| English | Portuguese | Rationale |
|---------|-----------|-----------|
| Transcript | Transcrição / Legendas | "Transcrição" = transcription (formal). "Legendas" = subtitles/captions (what users actually search). Used both strategically: "legendas" in user-facing copy, "transcrição" in formal/SEO contexts. |
| Download | Baixar | Standard BR-PT for download. "Baixar" is universally used, never "download" in translated contexts. |
| Generator | Gerador | Direct translation, commonly used in BR-PT for tools. |
| Script (video) | Roteiro | "Roteiro" is the standard term for video/film scripts in BR-PT. |
| Hooks (viral) | Ganchos | "Ganchos virais" is the established marketing term in BR-PT creator communities. |
| Bulk import | Importação em massa | "Em massa" = in bulk. Standard technical term. |
| Cloud storage | Armazenamento na nuvem | Direct, standard translation. |
| Watermark | Marca d'água | Standard BR-PT term. |
| Cover image | Imagem de capa | Standard BR-PT for thumbnail/cover. |
| Bookmark | Favorito | "Favoritos" is more natural than "marcador" for bookmarking content. |
| Chrome Extension | Extensão para Chrome | Standard BR-PT phrasing. |
| Checkout | Checkout | Kept in English as it's universally understood in Brazilian e-commerce. |

### Brand Names & Terms Kept in English
- TokScript, TikTok, Instagram Reels, YouTube Shorts, Chrome, Google, ChatGPT, Claude
- AI (used alongside "IA" where natural: "IA" is the Portuguese abbreviation)
- PDF, TXT, XML, JSON, CSV, HD, URL, SEO, UGC, API
- Currency values ($0, $39, $10) remain in USD

### Style Decisions
- Using Brazilian Portuguese (pt-BR), NOT European Portuguese (pt-PT)
- Informal "you" = "você" (not "tu" which is regional)
- No em dashes per LEARNING.md rules
- Maintaining the same energy/tone as English copy: direct, action-oriented, conversational
- FAQ answers adapted for natural BR-PT reading flow, not word-for-word translation

## Section Translation Status

| Section | Keys | Status | Notes |
|---------|------|--------|-------|
| meta | 8 | Complete | SEO-optimized with BR-PT search terms |
| header | 23 | Complete | Nav items translated, brand names kept |
| hero | 14 | Complete | "Gerador de Transcrição" as primary heading |
| aiFeatures | 11 | Complete | |
| preview | 5 | Complete | |
| platform | 80 | Complete | All 9 feature sections |
| pricing | 59 | Complete | Prices kept in USD |
| checkout | 13 | Complete | |
| stats | 9 | Complete | Numbers kept, labels translated |
| chromeExtensionBanner | 3 | Complete | |
| faq | 39 | Complete | All 18 Q&As fully translated |
| disclaimer | 12 | Complete | Legal text adapted |
| footer | 19 | Complete | |
| languages | 11 | Complete | Language names in native language |
| dontMissOutModal | 27 | Complete | |
| checkoutOverlay | 43 | Complete | |
| confirmationModal | 5 | Complete | |
| toast | 4 | Complete | |
| **TOTAL** | **385** | **Complete** | |

## Verification Method
1. JSON structure validation: `node -e "require('./locales/br.json')"`
2. Key count comparison: Ensure br.json has identical key structure to en.json
3. Back-translation of 5 critical sections (meta, hero, pricing, faq sample, checkout) by independent agent
4. Side-by-side comparison document generated for user review
