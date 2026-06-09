import { Suspense } from "react";
import PageData from "./PageData";

export const metadata = {
  title: "TokScript vs GetThisScript — Which TikTok Transcriber Wins?",
  description:
    "Side-by-side comparison: features, pricing, and platforms supported. See why 41,000+ creators pick TokScript over GetThisScript for TikTok, Instagram Reels, and YouTube Shorts transcription.",
  keywords: [
    "TokScript vs GetThisScript",
    "GetThisScript alternative",
    "TikTok transcript tool comparison",
    "best TikTok transcriber",
    "GetThisScript pricing",
  ],
  alternates: {
    canonical: "https://tokscript.com/tokscript-vs-getthisscript",
  },
  openGraph: {
    title: "TokScript vs GetThisScript — Which TikTok Transcriber Wins?",
    description:
      "Compare features, pricing, and supported platforms side by side. See why creators are switching from GetThisScript to TokScript.",
    url: "https://tokscript.com/tokscript-vs-getthisscript",
    type: "website",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript vs GetThisScript Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript vs GetThisScript — Side-by-Side Comparison",
    description:
      "Features, pricing, and platforms compared. See why creators pick TokScript.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://tokscript.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "TokScript vs GetThisScript",
      item: "https://tokscript.com/tokscript-vs-getthisscript",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Suspense fallback={null}>
        <PageData />
      </Suspense>
    </>
  );
}
