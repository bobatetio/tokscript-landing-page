import { languages } from "../../data/languages";
import LanguageHomePage from "./LanguageHomePage";

const localeLoaders = {
  br: () => import("../../../locales/br.json"),
  es: () => import("../../../locales/es.json"),
  zh: () => import("../../../locales/zh.json"),
  fr: () => import("../../../locales/fr.json"),
  hi: () => import("../../../locales/hi.json"),
  ar: () => import("../../../locales/ar.json"),
  de: () => import("../../../locales/de.json"),
  ja: () => import("../../../locales/ja.json"),
  ko: () => import("../../../locales/ko.json"),
  ru: () => import("../../../locales/ru.json"),
  tr: () => import("../../../locales/tr.json"),
};

export default async function LanguagePage({ params }) {
  const { lang } = await params;
  const loader = localeLoaders[lang];
  if (!loader) return null;
  const t = (await loader()).default;
  const langConfig = languages.find((l) => l.slug === lang);

  return <LanguageHomePage lang={lang} t={t} langConfig={langConfig} />;
}
