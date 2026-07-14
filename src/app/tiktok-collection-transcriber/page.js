import CollectionTranscriber from "@/components/CollectionTranscriber";

// UX-55 / deliverable 05: the Collection Transcriber page.
// Paste one TikTok collection link, the whole collection renders as a list,
// the first 50 transcripts open free, the rest stay visible but locked.
// Slug + SEO metadata copy are provisional and AWAITING MICHAEL.
export const metadata = {
  title: "TikTok Collection Transcriber | TokScript",
  description:
    "Paste one TikTok collection link and transcribe the whole collection at once. AWAITING MICHAEL: final SEO copy.",
  alternates: {
    canonical: "https://tokscript.com/tiktok-collection-transcriber",
  },
  openGraph: {
    title: "TikTok Collection Transcriber | TokScript",
    description:
      "Paste one TikTok collection link and transcribe the whole collection at once.",
    url: "https://tokscript.com/tiktok-collection-transcriber",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript TikTok Collection Transcriber",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Collection Transcriber | TokScript",
    description:
      "Paste one TikTok collection link and transcribe the whole collection at once.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://tokscript.com" },
        { "@type": "ListItem", position: 2, name: "TikTok Collection Transcriber", item: "https://tokscript.com/tiktok-collection-transcriber" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript TikTok Collection Transcriber",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", price: "39", priceCurrency: "USD", billingIncrement: "P1Y" },
      ],
    },
    // FAQPage entries AWAITING MICHAEL.
  ],
};

export default function Page() {
  return (
    <>
      <CollectionTranscriber />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
