import { Suspense } from "react";
import PageData from "./PageData";

export const metadata = {
  title: "TokScript vs Transkriptor — Which Is Better for TikTok Creators?",
  description:
    "Side-by-side comparison: features, pricing, and platforms. TokScript at $3.25/mo is built for creator research. Transkriptor ($9.99+/mo) is built for meeting recordings. See which fits your workflow.",
  keywords: [
    "TokScript vs Transkriptor",
    "Transkriptor alternative",
    "TikTok transcript tool comparison",
    "best TikTok transcriber",
    "Transkriptor pricing",
    "Transkriptor review",
  ],
  alternates: {
    canonical: "https://tokscript.com/tokscript-vs-transkriptor",
  },
  openGraph: {
    title: "TokScript vs Transkriptor — Which Is Better for TikTok Creators?",
    description:
      "Compare features, pricing, and use cases. TokScript is built for TikTok content research. Transkriptor is built for meetings. See which one fits.",
    url: "https://tokscript.com/tokscript-vs-transkriptor",
    type: "website",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript vs Transkriptor Comparison",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript vs Transkriptor — Side-by-Side Comparison",
    description:
      "Features, pricing, and use cases compared. See which tool fits TikTok creators.",
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
      name: "TokScript vs Transkriptor",
      item: "https://tokscript.com/tokscript-vs-transkriptor",
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
