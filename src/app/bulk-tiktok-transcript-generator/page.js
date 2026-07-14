import HomePage from "../HomePage";

// UX-54 / deliverable 03: the Bulk TikTok Transcripts page.
// It is the homepage shell rendered with the `bulkTiktok` copy key.
// Slug + SEO metadata copy are provisional and AWAITING MICHAEL.
export const metadata = {
  title: "Bulk TikTok Transcript Downloader | TokScript",
  description:
    "Paste up to 50 TikTok links and get every transcript back in one run. AWAITING MICHAEL: final SEO copy.",
  alternates: {
    canonical: "https://tokscript.com/bulk-tiktok-transcript-generator",
  },
  openGraph: {
    title: "Bulk TikTok Transcript Downloader | TokScript",
    description:
      "Paste up to 50 TikTok links and get every transcript back in one run.",
    url: "https://tokscript.com/bulk-tiktok-transcript-generator",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Bulk TikTok Transcript Downloader",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk TikTok Transcript Downloader | TokScript",
    description:
      "Paste up to 50 TikTok links and get every transcript back in one run.",
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
        { "@type": "ListItem", position: 2, name: "Bulk TikTok Transcript Downloader", item: "https://tokscript.com/bulk-tiktok-transcript-generator" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript Bulk TikTok Transcript Downloader",
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
    <div className="bulk-tiktok-transcript-generator">
      <HomePage platform="bulkTiktok" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
