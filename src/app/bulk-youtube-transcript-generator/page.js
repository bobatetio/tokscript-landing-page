import HomePage from "../HomePage";

// UX-56: standalone SEO page for the bulk YouTube Shorts transcript downloader.
// Same shell as the bulk TikTok page, rendered with the `bulkYoutube` copy key
// and YouTube platform visuals. Slug + SEO copy are example, tune with Michael.
export const metadata = {
  title: "Bulk YouTube Transcript Downloader | Transcribe 50 Shorts at Once",
  description:
    "Paste up to 50 YouTube Shorts links and get every transcript back in one run. Free bulk YouTube Shorts transcript downloader from TokScript.",
  alternates: {
    canonical: "https://tokscript.com/bulk-youtube-transcript-generator",
  },
  openGraph: {
    title: "Bulk YouTube Transcript Downloader | Transcribe 50 Shorts at Once",
    description:
      "Paste up to 50 YouTube Shorts links and get every transcript back in one run.",
    url: "https://tokscript.com/bulk-youtube-transcript-generator",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Bulk YouTube Transcript Downloader",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulk YouTube Transcript Downloader | Transcribe 50 Shorts at Once",
    description:
      "Paste up to 50 YouTube Shorts links and get every transcript back in one run.",
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
        { "@type": "ListItem", position: 2, name: "Bulk YouTube Transcript Downloader", item: "https://tokscript.com/bulk-youtube-transcript-generator" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript Bulk YouTube Transcript Downloader",
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
    <div className="bulk-youtube-transcript-generator">
      <HomePage platform="bulkYoutube" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
