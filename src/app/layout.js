import { Geist, Inter } from "next/font/google";
import "../bootstrap-custom.scss";
import "./globals.css";
import "../App.scss";
import Script from "next/script";
import dynamic from "next/dynamic";

const PlausibleAnalytics = dynamic(() => import("../components/PlausibleAnalytics"));
const FeaturebaseMessenger = dynamic(() => import("../components/FeaturebaseMessenger"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata = {
  title:
    "TokScript - Video Transcript Downloader for TikTok, Reels & Shorts Transcripts Instantly",
  description:
    "Download Transcripts, HD Videos & Cover Images, Bulk export from TikTok, Reels, and Shorts Instantly. Plus use our AI viral script generator hook writer analyzer.",

  // ✅ Canonical URL + hreflang alternates for all language variants
  alternates: {
    canonical: "https://tokscript.com/",
    languages: {
      "en": "https://tokscript.com/",
      "pt-BR": "https://tokscript.com/br",
      "es": "https://tokscript.com/es",
      "zh": "https://tokscript.com/zh",
      "fr": "https://tokscript.com/fr",
      "hi": "https://tokscript.com/hi",
      "ar": "https://tokscript.com/ar",
      "de": "https://tokscript.com/de",
      "ja": "https://tokscript.com/ja",
      "ko": "https://tokscript.com/ko",
      "ru": "https://tokscript.com/ru",
      "tr": "https://tokscript.com/tr",
      "x-default": "https://tokscript.com/",
    },
  },

  // ✅ Open Graph (for Facebook, LinkedIn, etc.)
  openGraph: {
    title:
      "TokScript - Video Transcript Downloader for TikTok, Reels & Shorts Transcripts Instantly",
    description:
      "Generate TikTok transcripts, analyze videos, and unlock viral growth.",
    url: "https://tokscript.com/",
    locale: "en_US",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tokscript - Social Preview",
      },
    ],
    type: "website",
  },

  // ✅ Twitter Card
  twitter: {
    card: "summary_large_image",
    title:
      "TokScript - Video Transcript Downloader for TikTok, Reels & Shorts Transcripts Instantly",
    description:
      "Generate TikTok transcripts, analyze videos, and unlock viral growth.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://do.featurebase.app" />
        <link rel="dns-prefetch" href="https://lmsqueezy.com" />
      </head>
      <body
        className={`${geistSans.variable} ${inter.variable}`}
        suppressHydrationWarning={true}
      >
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`if(window.location.hostname==='tokscript.com'||window.location.hostname==='www.tokscript.com'){setTimeout(function(){(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M29738MG')},5000)}`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M29738MG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Script id="lemon-squeezy-config" strategy="lazyOnload">
          {`window.lemonSqueezyAffiliateConfig = { store: "tokscript" };`}
        </Script>
        <Script
          src="https://lmsqueezy.com/affiliate.js"
          strategy="lazyOnload"
        />
        <PlausibleAnalytics />
        <FeaturebaseMessenger />
        {children}
      </body>
    </html>
  );
}
