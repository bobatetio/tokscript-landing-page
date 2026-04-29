// Central language configuration for multilingual support
export const languages = [
  { code: "en", slug: "/", name: "English", nativeName: "English", hreflang: "en" },
  { code: "pt-BR", slug: "br", name: "Portuguese", nativeName: "Português", hreflang: "pt-BR" },
  { code: "es", slug: "es", name: "Spanish", nativeName: "Español", hreflang: "es" },
  { code: "zh", slug: "zh", name: "Mandarin", nativeName: "中文", hreflang: "zh" },
  { code: "fr", slug: "fr", name: "French", nativeName: "Français", hreflang: "fr" },
  { code: "hi", slug: "hi", name: "Hindi", nativeName: "हिन्दी", hreflang: "hi" },
  { code: "ar", slug: "ar", name: "Arabic", nativeName: "العربية", hreflang: "ar" },
  { code: "de", slug: "de", name: "German", nativeName: "Deutsch", hreflang: "de" },
  { code: "ja", slug: "ja", name: "Japanese", nativeName: "日本語", hreflang: "ja" },
  { code: "ko", slug: "ko", name: "Korean", nativeName: "한국어", hreflang: "ko" },
  { code: "ru", slug: "ru", name: "Russian", nativeName: "Русский", hreflang: "ru" },
  { code: "tr", slug: "tr", name: "Turkish", nativeName: "Türkçe", hreflang: "tr" },
];

export const getValidSlugs = () => languages.filter(l => l.slug !== "/").map(l => l.slug);
export const getLanguageBySlug = (slug) => languages.find(l => l.slug === slug);
