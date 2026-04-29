# Multilingual SEO Implementation

## For: Development Team + SEO Team

This document covers TokScript's multilingual support: the architecture, what was built, what was fixed, how components interact, and what to know when maintaining or extending it.

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Before vs After](#before-vs-after)
4. [How It Works](#how-it-works)
5. [File Reference](#file-reference)
6. [Translation Files](#translation-files)
7. [Component Translation Pattern](#component-translation-pattern)
8. [SEO Tags and Metadata](#seo-tags-and-metadata)
9. [Sitemap and Hreflang](#sitemap-and-hreflang)
10. [Route Protection](#route-protection)
11. [Language Switcher](#language-switcher)
12. [Maintenance Guide](#maintenance-guide)
13. [Known Limitations](#known-limitations)

---

## Overview

TokScript serves 11 pre-built language pages at clean URL slugs: `/br`, `/es`, `/zh`, `/fr`, `/hi`, `/ar`, `/de`, `/ja`, `/ko`, `/ru`, `/tr`. These are NOT real-time translations. Each is a statically generated Next.js route that renders the same homepage component structure but with localized content from JSON translation files.

**Supported Languages:**

| Slug | Language | BCP-47 Code | Hreflang |
|------|----------|-------------|----------|
| `/` | English | `en` | `en` |
| `/br` | Portuguese (Brazil) | `pt-BR` | `pt-BR` |
| `/es` | Spanish | `es` | `es` |
| `/zh` | Mandarin | `zh` | `zh` |
| `/fr` | French | `fr` | `fr` |
| `/hi` | Hindi | `hi` | `hi` |
| `/ar` | Arabic | `ar` | `ar` |
| `/de` | German | `de` | `de` |
| `/ja` | Japanese | `ja` | `ja` |
| `/ko` | Korean | `ko` | `ko` |
| `/ru` | Russian | `ru` | `ru` |
| `/tr` | Turkish | `tr` | `tr` |

---

## Architecture

```
Root Layout (src/app/layout.js)
  - Renders <html lang="en"> (default)
  - Has hreflang alternates for all 12 languages + x-default
  - og:locale = "en_US"

Root Page (src/app/page.js)
  - English homepage
  - No translation props passed to components (they use hardcoded English)

[lang] Layout (src/app/[lang]/layout.js)
  - Server component: generates metadata per language
  - generateStaticParams() returns all 11 slugs
  - dynamicParams = false (rejects invalid slugs with 404)

[lang] Page (src/app/[lang]/page.js)
  - Client component ("use client")
  - Loads translation JSON based on slug: translations[lang]
  - Sets document.documentElement.lang via useEffect
  - Passes t={t} to all child components
```

**Key design decision:** Components use an optional `t` prop with English fallbacks. This means:
- The root English homepage (`/`) passes NO props and works exactly as before.
- Language pages (`/br`, `/es`, etc.) pass `t={t}` and components render in the target language.
- Zero risk of breaking existing pages when adding translations.

---

## Before vs After

### Before (Problems Found by SEO Audit)

| # | Issue | Severity | Impact |
|---|-------|----------|--------|
| 1 | `<html lang="en">` hardcoded on ALL 11 language pages | CRITICAL | Google's language classifier receives contradictory signals |
| 2 | `dynamicParams` not set to `false` - any URL like `/en`, `/xx`, `/asdf` renders a full English homepage | CRITICAL | Infinite duplicate content for Googlebot to index |
| 3 | Header renders 100% English on all language pages (~24 hardcoded strings) | CRITICAL | Mixed-language pages confuse Google's language classifier |
| 4 | Footer renders 100% English on all language pages (~20 hardcoded strings) | CRITICAL | Mixed-language signals |
| 5 | FaqSection renders 100% English (18 Q&A pairs + heading) | CRITICAL | Largest content block is wrong language |
| 6 | EnhenceExperience renders English ("Enhance Your Experience...", "Add to Chrome") | HIGH | Mixed-language signals |
| 7 | CounterComponent renders English (4 stat labels) | HIGH | Mixed-language signals |
| 8 | DontMissOutModal renders English (entire upsell modal) | HIGH | User-facing content in wrong language |
| 9 | CheckoutOverlay renders English (auth flow, validation, toasts) | HIGH | Checkout friction for non-English users |
| 10 | ConfirmationModal renders English (upgrade confirmation) | HIGH | User-facing content in wrong language |
| 11 | LanguageSwitcher broken on mobile (hover-only, no click/tap) | MEDIUM | Mobile users cannot switch languages |
| 12 | Root page missing `og:locale` | MEDIUM | Incomplete Open Graph metadata |
| 13 | Root `og:url` trailing slash mismatch with canonical | LOW | URL inconsistency signal |

### After (All Fixed)

| # | Fix Applied | Files Changed |
|---|-------------|---------------|
| 1 | `useEffect` sets `document.documentElement.lang` dynamically per language | `[lang]/page.js` |
| 2 | `export const dynamicParams = false` rejects invalid slugs with 404 | `[lang]/layout.js` |
| 3 | Header accepts optional `t` prop, 23 strings translated | `Header.jsx`, `[lang]/page.js` |
| 4 | Footer accepts optional `t` prop, 19 strings translated | `Footer.jsx`, `[lang]/page.js` |
| 5 | FaqSection accepts `title`, `subtitle`, `bottomText`, `faqData` props | `FaqSection.js`, `[lang]/page.js` |
| 6 | EnhenceExperience accepts `title`, `cta`, `imageAlt` props | `EnhenceExperience.jsx`, `[lang]/page.js` |
| 7 | CounterComponent accepts `counterData` prop | `CounterComponent.jsx`, `[lang]/page.js` |
| 8 | DontMissOutModal accepts `t` prop, 28 strings translated | `DontMissOutModal.jsx`, `[lang]/page.js` |
| 9 | CheckoutOverlay accepts `t` prop, ~30 strings + toasts translated | `CheckoutOverlay.jsx`, `[lang]/page.js` |
| 10 | ConfirmationModal accepts `t` prop, 5 strings translated | `ConfirmationModal.jsx`, `[lang]/page.js` |
| 11 | Added `onClick` toggle to LanguageSwitcher dropdown | `LanguageSwitcher.jsx` |
| 12 | Added `locale: "en_US"` to root openGraph metadata | `layout.js` |
| 13 | Changed `og:url` to `https://tokscript.com/` (trailing slash matches canonical) | `layout.js` |

---

## How It Works

### Request Flow

```
User visits /br
  -> Next.js matches [lang] route
  -> [lang]/layout.js generates Portuguese metadata (title, description, OG, hreflang)
  -> [lang]/page.js renders as client component
     -> Loads translations["br"] from br.json
     -> useEffect sets document.documentElement.lang = "pt-BR"
     -> Passes t={t} to Header, Footer, FaqSection, EnhenceExperience,
        CounterComponent, DontMissOutModal, CheckoutOverlay, ConfirmationModal
     -> Each component renders Portuguese strings via t?.key || "English fallback"
```

```
User visits / (root)
  -> Root layout renders <html lang="en">
  -> Root page.js renders normally
  -> NO t prop passed to any component
  -> All components render their hardcoded English strings
  -> Nothing changed, zero regression risk
```

```
User visits /xx (invalid slug)
  -> Next.js matches [lang] route
  -> dynamicParams = false
  -> Slug "xx" is not in generateStaticParams list
  -> Next.js returns 404 automatically
```

### Component Interaction Diagram

```
[lang]/page.js
  |
  |-- const t = translations[lang]    // loads JSON for this language
  |
  |-- <Header t={t} />                // nav items, banner, auth buttons
  |-- <CounterComponent counterData={[...from t.stats...]} />
  |-- <EnhenceExperience title={t.chromeExtensionBanner.title} ... />
  |-- <FaqSection faqData={[...from t.faq...]} title={t.faq.title} ... />
  |-- <Footer t={t} />                // footer links, descriptions, copyright
  |-- <DontMissOutModal t={t} />      // upsell modal features + AI agents
  |-- <CheckoutOverlay t={t} />       // auth form, toasts, validation
  |-- <ConfirmationModal t={t} />     // upgrade confirmation
```

---

## File Reference

### Core Route Files

| File | Type | Purpose |
|------|------|---------|
| `src/app/layout.js` | Server | Root layout. `<html lang="en">`, hreflang, og:locale |
| `src/app/page.js` | Client | English homepage. Unchanged. |
| `src/app/[lang]/layout.js` | Server | Language metadata, generateStaticParams, dynamicParams=false |
| `src/app/[lang]/page.js` | Client | Language homepage. Loads JSON, sets html lang, passes t to components |

### Translated Components

| File | Prop Interface | String Count |
|------|---------------|--------------|
| `src/components/Header.jsx` | `{ t }` | 23 strings |
| `src/components/Footer.jsx` | `{ t }` | 19 strings |
| `src/components/FaqSection.js` | `{ faqData, title, subtitle, bottomText }` | 3 strings + FAQ array |
| `src/components/EnhenceExperience.jsx` | `{ title, cta, imageAlt }` | 3 strings |
| `src/components/CounterComponent.jsx` | `{ counterData }` | 4 items (amount + label) |
| `src/components/modals/DontMissOutModal.jsx` | `{ show, onHide, t }` | 28 strings |
| `src/components/modals/CheckoutOverlay.jsx` | `{ ..., t }` | ~30 strings |
| `src/components/modals/ConfirmationModal.jsx` | `{ ..., t }` | 5 strings |

### Config and Data

| File | Purpose |
|------|---------|
| `src/data/languages.js` | Master language list (code, slug, name, nativeName, hreflang) |
| `src/components/LanguageSwitcher.jsx` | Dropdown in nav for switching languages |
| `src/app/sitemap.js` | Dynamic sitemap including all 11 language URLs |

---

## Translation Files

Located in `/locales/`. One JSON file per language.

| File | Language |
|------|----------|
| `locales/en.json` | English (reference) |
| `locales/br.json` | Portuguese (Brazil) |
| `locales/es.json` | Spanish |
| `locales/zh.json` | Mandarin |
| `locales/fr.json` | French |
| `locales/hi.json` | Hindi |
| `locales/ar.json` | Arabic |
| `locales/de.json` | German |
| `locales/ja.json` | Japanese |
| `locales/ko.json` | Korean |
| `locales/ru.json` | Russian |
| `locales/tr.json` | Turkish |

### JSON Structure

Each locale file follows this top-level structure:

```json
{
  "meta": { "title", "description", "ogTitle", "ogDescription", ... },
  "header": {
    "banner": { "textDesktop", "textMobile", "cta" },
    "nav": { "home", "features", "pricing", "affiliate", "faqs", ... },
    "auth": { "login", "getStarted", "signUp" }
  },
  "hero": { ... },
  "aiFeatures": { ... },
  "preview": { ... },
  "pricing": { ... },
  "stats": {
    "counter": {
      "videosProcessed": { "amount", "label" },
      "profilesDownloaded": { "amount", "label" },
      "hoursSaved": { "amount", "label" },
      "minutesTotal": { "amount", "label" }
    }
  },
  "chromeExtensionBanner": { "title", "cta", "imageAlt" },
  "faq": {
    "title", "subtitle", "bottomText",
    "q1": { "title", "answer" },
    "q2": { "title", "answer" },
    ... (q1 through q18)
  },
  "footer": {
    "description",
    "generators": { "title", "tiktok", "instagram", "youtube" },
    "product": { "title", "features", "pricing", "api", "integrations", "legal" },
    "company": { "title", "about", "contact", "privacy", "terms", "helpCenter" },
    "copyright", "cta"
  },
  "dontMissOutModal": { "title", "subtitle", "features": { ... }, "aiAgents": { ... }, ... },
  "checkoutOverlay": { "login": { ... }, "signup": { ... }, "form": { ... }, "toasts": { ... } },
  "confirmationModal": { "paragraph1", "paragraph2", "paragraph3", "cancel", "upgrade" }
}
```

---

## Component Translation Pattern

Every translated component follows the same pattern:

```jsx
// Component accepts optional t prop
export default function Header({ t }) {
  return (
    <nav>
      <a>{t?.header?.nav?.home || "Home"}</a>
      <a>{t?.header?.nav?.pricing || "Pricing"}</a>
    </nav>
  );
}
```

**Rules:**
- `t` is always optional. If not passed, the English fallback string (right side of `||`) renders.
- The root English page (`/`) does NOT pass `t`, so English is always the fallback.
- Language pages pass `t={t}` where `t` is the full translation JSON object.
- Nested access uses optional chaining: `t?.header?.nav?.home` prevents crashes if a key is missing.

**For FaqSection, EnhenceExperience, and CounterComponent**, the pattern uses individual props instead of the full `t` object, because these components have simpler interfaces:

```jsx
<FaqSection
  faqData={[...array of {title, content}...]}
  title={t.faq.title}
  subtitle={t.faq.subtitle}
  bottomText={t.faq.bottomText}
/>

<EnhenceExperience
  title={t.chromeExtensionBanner.title}
  cta={t.chromeExtensionBanner.cta}
  imageAlt={t.chromeExtensionBanner.imageAlt}
/>

<CounterComponent counterData={[
  { amount: t.stats.counter.videosProcessed.amount, description: t.stats.counter.videosProcessed.label },
  ...
]} />
```

---

## SEO Tags and Metadata

### Root Page (`/`)

| Tag | Value |
|-----|-------|
| `<html lang>` | `en` |
| `<title>` | English title |
| `canonical` | `https://tokscript.com/` |
| `og:url` | `https://tokscript.com/` |
| `og:locale` | `en_US` |
| `hreflang` | 12 languages + x-default |

### Language Pages (e.g., `/br`)

| Tag | Value |
|-----|-------|
| `<html lang>` | `pt-BR` (set dynamically via useEffect) |
| `<title>` | Portuguese title from `br.json` |
| `canonical` | `https://tokscript.com/br` |
| `og:url` | `https://tokscript.com/br` |
| `og:locale` | `pt-BR` |
| `hreflang` | 12 languages + x-default (same set on every page) |

### How `<html lang>` Works

Since only the root `layout.js` can render the `<html>` tag in Next.js App Router, and the root layout always renders `<html lang="en">`, language pages dynamically update it client-side:

```jsx
// In [lang]/page.js
useEffect(() => {
  if (langConfig) {
    document.documentElement.lang = langConfig.code;
  }
  return () => { document.documentElement.lang = "en"; };
}, [lang, langConfig]);
```

This sets the correct BCP-47 code (e.g., `pt-BR` for Brazilian Portuguese) after hydration. The cleanup function resets to `"en"` when navigating away.

---

## Sitemap and Hreflang

### Sitemap (`src/app/sitemap.js`)

The dynamic sitemap includes:
- 20 existing English pages (root, pricing, affiliate, features, legal pages, etc.)
- 11 language pages (`/br`, `/es`, `/zh`, `/fr`, `/hi`, `/ar`, `/de`, `/ja`, `/ko`, `/ru`, `/tr`)
- **Total: 31 URLs**

Language pages are added at `priority: 0.9` (just below root's 1.0).

### Hreflang Tags

Every page (root and language) includes hreflang `<link>` tags for all 12 languages + `x-default`:

```html
<link rel="alternate" hreflang="en" href="https://tokscript.com/" />
<link rel="alternate" hreflang="pt-BR" href="https://tokscript.com/br" />
<link rel="alternate" hreflang="es" href="https://tokscript.com/es" />
<!-- ... all 12 languages ... -->
<link rel="alternate" hreflang="x-default" href="https://tokscript.com/" />
```

These are set via Next.js `metadata.alternates.languages` in both:
- `src/app/layout.js` (root)
- `src/app/[lang]/layout.js` (language pages)

---

## Route Protection

### `dynamicParams = false`

Set in `src/app/[lang]/layout.js`. This tells Next.js that ONLY the slugs returned by `generateStaticParams()` are valid. Any other slug returns 404.

**Valid slugs:** `br`, `es`, `zh`, `fr`, `hi`, `ar`, `de`, `ja`, `ko`, `ru`, `tr`

**Invalid slugs that now 404:** `/en`, `/xx`, `/asdf`, `/english`, etc.

Without this setting, any URL like `/anything` would render a full English homepage, creating infinite duplicate content for search engines.

---

## Language Switcher

Located at `src/components/LanguageSwitcher.jsx`. Rendered inside the Header nav.

**Behavior:**
- Desktop: Opens on hover (mouseEnter/mouseLeave with 150ms timeout)
- Mobile: Opens on click/tap (onClick toggle)
- Shows all languages except the current one
- Current language displays its native name (e.g., "Portugues" when on /br)
- On English root page, displays "Language"
- Clicking a language navigates to that slug's page

**Styles:** Defined in `src/assets/scss/components.scss` under `.language-dropdown-wrapper`.

---

## Maintenance Guide

### Adding a New Language

1. **Create the translation file:** Copy `locales/en.json` to `locales/{slug}.json` and translate all strings.
2. **Add to language config:** In `src/data/languages.js`, add a new entry:
   ```js
   { code: "it", slug: "it", name: "Italian", nativeName: "Italiano", hreflang: "it" },
   ```
3. **Import in [lang]/page.js:** Add the JSON import and add to the `translations` map.
4. **Import in [lang]/layout.js:** Add the JSON import and add to the `translationMap`.
5. **Update sitemap:** The sitemap auto-generates from the `generateStaticParams` list, but verify.
6. **Update hreflang:** Add the new language to the `alternates.languages` object in both `layout.js` files.

### Updating English Content

When the English homepage content changes (new features, pricing updates, FAQ additions):

1. Update the English strings in the components as usual.
2. Update the English fallback strings in any component where the text changed (right side of the `||`).
3. Update `locales/en.json` with the new content.
4. Translate the changes into ALL locale files. Stale translations with outdated info are worse than no translation.
5. If a new translatable string is added to a component, add the corresponding key to ALL locale JSON files.

### Adding a New Translatable Component

1. Add an optional `t` prop (or individual props) to the component with English fallback:
   ```jsx
   export default function NewComponent({ t }) {
     return <h2>{t?.newComponent?.title || "English Title"}</h2>;
   }
   ```
2. Add the corresponding keys to ALL locale JSON files under a new section.
3. In `[lang]/page.js`, pass the appropriate props from `t`.
4. The root `page.js` needs NO changes (fallback handles English).

---

## Known Limitations

1. **RTL not supported for Arabic.** The `/ar` page renders Arabic text but has no right-to-left CSS layout. If Arabic traffic grows, RTL styles need to be added.

2. **Client-side `<html lang>`.** The lang attribute is set via useEffect after hydration. During the brief server render, it shows `lang="en"`. Search engine crawlers that execute JavaScript (Googlebot does) will see the correct value. Crawlers that don't execute JS will see `lang="en"`.

3. **Localized link targets.** Footer and nav links (About, Contact, Privacy, Terms, etc.) point to the English versions of those pages. There are no localized versions of secondary pages.

4. **No localized OG images.** All languages share the same `og-image.png` with English text.

5. **No localized JSON-LD schema.** Schema markup (WebApplication, FAQPage) is not yet translated per language.

6. **Translation drift.** When the English site updates, all 11 locale files must be updated simultaneously. There is no automated system for detecting stale translations.

7. **`[...url]/page.js` catch-all bug.** In dev mode, invalid slugs that bypass `[lang]` routing (due to how Next.js dev server works) may hit `[...url]/page.js` which has a missing import (`magicIcon`), causing a 500 error. In production builds, `dynamicParams=false` prevents this. This is a pre-existing issue unrelated to multilingual work.
