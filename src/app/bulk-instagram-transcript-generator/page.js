import HomePage from "../HomePage";

// UX-56: standalone SEO page for the bulk Instagram Reels transcript downloader.
// Same shell as the bulk TikTok page, rendered with the `bulkInstagram` copy key
// and Instagram platform visuals. Slug + SEO copy are example, tune with Michael.
export const metadata = {
  title: "Bulk Instagram Transcript Downloader | Transcribe 50 Reels at Once",
  description:
    "Paste up to 50 Instagram Reels links and get every transcript back in one run. Free bulk Instagram Reels transcript downloader from TokScript.",
  alternates: {
    canonical: "https://tokscript.com/bulk-instagram-transcript-generator",
  },
  openGraph: {
    title: "Bulk Instagram Transcript Downloader | Transcribe 50 Reels at Once",
    description:
      "Paste up to 50 Instagram Reels links and get every transcript back in one run.",
    url: "https://tokscript.com/bulk-instagram-transcript-generator",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Bulk Instagram Transcript Downloader",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk Instagram Transcript Downloader | Transcribe 50 Reels at Once",
    description:
      "Paste up to 50 Instagram Reels links and get every transcript back in one run.",
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
        { "@type": "ListItem", position: 2, name: "Bulk Instagram Transcript Downloader", item: "https://tokscript.com/bulk-instagram-transcript-generator" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript Bulk Instagram Transcript Downloader",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", price: "39", priceCurrency: "USD", billingIncrement: "P1Y" },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className="bulk-instagram-transcript-generator">
      <HomePage platform="bulkInstagram" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
