# Localized Homepage | TokScript

**URL Routes:**
- https://tokscript.com/br (Portuguese/Brazil)
- https://tokscript.com/es (Spanish)
- https://tokscript.com/zh (Mandarin Chinese)
- https://tokscript.com/fr (French)
- https://tokscript.com/hi (Hindi)
- https://tokscript.com/ar (Arabic)
- https://tokscript.com/de (German)
- https://tokscript.com/ja (Japanese)
- https://tokscript.com/ko (Korean)
- https://tokscript.com/ru (Russian)
- https://tokscript.com/tr (Turkish)

**File Sources:**
- Route Handler: src/app/[lang]/page.js (client component)
- Layout: src/app/[lang]/layout.js (server component for metadata)
- Language Data: src/data/languages.js

## Overview

These are localized versions of the main TokScript homepage, available in 11 languages beyond the default English. Each language variant provides the complete homepage experience with translated content and proper SEO markup.

## Architecture

### Dynamic Routing

**Route Pattern:** `/[lang]/` where lang is the language slug

**Valid Language Slugs:**
1. br (Portuguese Brazil)
2. es (Spanish)
3. zh (Mandarin Chinese)
4. fr (French)
5. hi (Hindi)
6. ar (Arabic)
7. de (German)
8. ja (Japanese)
9. ko (Korean)
10. ru (Russian)
11. tr (Turkish)

**Dynamic Params Setting:** `dynamicParams = false`
- Only valid language slugs render successfully
- Invalid slugs trigger 404 Not Found
- Improves build performance by pre-rendering only supported languages

**Static Generation:** generateStaticParams() ensures all 11 language pages are pre-rendered at build time

### Layout Component (Server-Side)

Located: src/app/[lang]/layout.js

**Purpose:** Generate localized metadata and SEO tags

**Metadata Generation:** generateMetadata({ params })
- Reads language parameter
- Loads corresponding translation JSON file
- Generates page metadata with:
  - Localized title and description
  - OpenGraph metadata
  - Twitter card metadata
  - Hreflang alternates for all 12 languages (11 localized + English default)

**Translation File Mapping:**
```
br.json -> Portuguese (Brazil)
es.json -> Spanish
zh.json -> Mandarin Chinese
fr.json -> French
hi.json -> Hindi
ar.json -> Arabic
de.json -> German
ja.json -> Japanese
ko.json -> Korean
ru.json -> Russian
tr.json -> Turkish
```

### Page Component (Client-Side)

Located: src/app/[lang]/page.js

**Type:** Client component ("use client")

**Page Content:** Complete homepage with same sections as English version:
- Hero section with call-to-action
- Feature highlights
- Benefit showcases (Bulk Import, Cloud Storage, History, Media Downloads, Extension, Dashboard, Collections, Teamwork)
- AI analysis and content features
- FAQ section
- Pricing comparison (Free vs Pro)
- Testimonials
- Trust signals
- Call-to-action modals

**Translation System:**
- Imports all 11 locale JSON files
- Receives translations via `t` prop from layout
- Falls back to English strings if translations missing
- Supports approximately 23-28+ translatable strings per section

## Supported Languages

| Language | Code | Slug | Native Name | Hreflang |
|----------|------|------|-------------|----------|
| English | en | / | English | en |
| Portuguese (Brazil) | pt-BR | br | Português | pt-BR |
| Spanish | es | es | Español | es |
| Mandarin Chinese | zh | zh | 中文 | zh |
| French | fr | fr | Français | fr |
| Hindi | hi | hi | हिन्दी | hi |
| Arabic | ar | ar | العربية | ar |
| German | de | de | Deutsch | de |
| Japanese | ja | ja | 日本語 | ja |
| Korean | ko | ko | 한국어 | ko |
| Russian | ru | ru | Русский | ru |
| Turkish | tr | tr | Türkçe | tr |

## Metadata Structure per Language Page

Each language page includes:

**HTML Head Tags:**
- Title: From translation JSON (e.g., "TokScript | Gerar Transcrição do TikTok em Português" for Portuguese)
- Description: From translation JSON with platform context
- Canonical URL: https://tokscript.com/{slug}
- Hreflang Alternates: All 12 language variants + x-default (English)

**OpenGraph Metadata:**
- og:title: Localized from translation JSON
- og:description: Localized from translation JSON
- og:url: https://tokscript.com/{slug}
- og:site_name: From translation JSON
- og:image: https://tokscript.com/og-image.png (same across all languages)
- og:image:width: 1200
- og:image:height: 630
- og:image:alt: From translation JSON
- og:type: website
- og:locale: Language code (pt_BR, es, zh, fr, hi, ar, de, ja, ko, ru, tr)

**Twitter Card Metadata:**
- twitter:card: summary_large_image
- twitter:title: From translation JSON
- twitter:description: From translation JSON
- twitter:image: https://tokscript.com/og-image.png

## Translated Components

The following components receive translation strings via `t` prop:

### Header Component
23+ translatable strings including:
- Navigation labels (Home, Features, Pricing, Affiliate, Contact, About)
- Button labels
- Dropdown menu items

### Footer Component
19+ translatable strings including:
- Section headers
- Link labels
- Copyright text
- Contact information

### Main Page Components
- FAQ Section
- Enhance Experience section
- Counter Component (metrics/statistics labels)
- DontMissOutModal (exit-intent popup) - 28+ strings
- CheckoutOverlay (payment overlay) - ~30 strings
- ConfirmationModal (post-purchase confirmation) - 5+ strings

## Internationalization Details

**Translation File Structure:**
Each locale JSON includes:
- meta.title: Page title
- meta.description: Meta description
- meta.ogTitle: OpenGraph title
- meta.ogDescription: OpenGraph description
- meta.ogSiteName: Site name
- meta.ogImageAlt: Image alt text
- meta.twitterTitle: Twitter card title
- meta.twitterDescription: Twitter card description
- Component-specific translation strings

**Fallback Behavior:**
- English strings are used as defaults
- If translation key missing, component displays English text
- Maintains functionality across all language variants

## SEO Implementation

**Hreflang Tags:**
- All language pages include hreflang alternates pointing to each other
- x-default hreflang points to English homepage (https://tokscript.com/)
- Helps search engines understand language/region targeting
- Prevents duplicate content penalties

**Canonical URLs:**
- Each language page has self-referential canonical
- Prevents indexing of the same content multiple times

**Sitemap Inclusion:**
- All 11 language pages included in sitemap.xml
- Priority: 0.9 (high visibility)
- Change frequency: weekly

## Known Limitations

1. **RTL Support:** No right-to-left CSS handling for Arabic language variant
2. **OG Image:** Same image used across all languages (not localized)
3. **Schema Markup:** No localized structured data/schema markup implemented
4. **Legal Links:** Footer legal pages (Privacy, Terms, Legal) link back to English-only versions
5. **Video Content:** Any embedded videos not subtitled in local languages

## Related Files

- Translation JSON files: /locales/*.json
- Language configuration: /src/data/languages.js
- Main English homepage: src/app/page.js (for comparison)
