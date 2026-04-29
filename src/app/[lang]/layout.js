import { languages } from "../../data/languages";

// Import all translation files for metadata
import br from "../../../locales/br.json";
import es from "../../../locales/es.json";
import zh from "../../../locales/zh.json";
import fr from "../../../locales/fr.json";
import hi from "../../../locales/hi.json";
import ar from "../../../locales/ar.json";
import de from "../../../locales/de.json";
import ja from "../../../locales/ja.json";
import ko from "../../../locales/ko.json";
import ru from "../../../locales/ru.json";
import tr from "../../../locales/tr.json";

const translationMap = { br, es, zh, fr, hi, ar, de, ja, ko, ru, tr };

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = translationMap[lang];
  if (!t) return {};

  const langConfig = languages.find((l) => l.slug === lang);
  const canonicalUrl = `https://tokscript.com/${lang}`;

  // Build hreflang alternates for all languages
  const hreflangLanguages = {};
  languages.forEach((l) => {
    const url =
      l.slug === "/" ? "https://tokscript.com/" : `https://tokscript.com/${l.slug}`;
    hreflangLanguages[l.hreflang] = url;
  });
  hreflangLanguages["x-default"] = "https://tokscript.com/";

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangLanguages,
    },
    openGraph: {
      title: t.meta.ogTitle,
      description: t.meta.ogDescription,
      url: canonicalUrl,
      siteName: t.meta.ogSiteName,
      images: [
        {
          url: "https://tokscript.com/og-image.png",
          width: 1200,
          height: 630,
          alt: t.meta.ogImageAlt,
        },
      ],
      type: "website",
      locale: langConfig?.code || lang,
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.twitterTitle,
      description: t.meta.twitterDescription,
      images: ["https://tokscript.com/og-image.png"],
    },
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ["br", "es", "zh", "fr", "hi", "ar", "de", "ja", "ko", "ru", "tr"].map((lang) => ({ lang }));
}

export default function LanguageLayout({ children }) {
  return children;
}
