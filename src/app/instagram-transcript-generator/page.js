import HomePage from "../HomePage";

export const metadata = {
  title: "Instagram Transcript Generator - Free AI Tool | TokScript",
  description:
    "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text. Bulk process up to 50 Reels.",
  alternates: {
    canonical: "https://tokscript.com/instagram-transcript-generator",
  },
  openGraph: {
    title: "Instagram Transcript Generator - Free AI Tool | TokScript",
    description:
      "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text.",
    url: "https://tokscript.com/instagram-transcript-generator",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Instagram Transcript Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Transcript Generator - Free AI Tool | TokScript",
    description:
      "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text.",
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
        { "@type": "ListItem", position: 2, name: "Instagram Transcript Generator", item: "https://tokscript.com/instagram-transcript-generator" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript Instagram Transcript Generator",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "All",
      offers: [
        { "@type": "Offer", price: "0", priceCurrency: "USD" },
        { "@type": "Offer", price: "39", priceCurrency: "USD", billingIncrement: "P1Y" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "How do I download an Instagram Reels transcript?", acceptedAnswer: { "@type": "Answer", text: "Open the Reel in Instagram, tap the paper plane share icon, and select Copy Link. Paste the URL into TokScript and hit Scan Video — your transcript is ready in 5–10 seconds." }},
        { "@type": "Question", name: "Does it work with all Instagram content?", acceptedAnswer: { "@type": "Answer", text: "TokScript works with public Instagram Reels only. Stories, feed posts, and Lives are not supported." }},
        { "@type": "Question", name: "Can I bulk download Reels transcripts?", acceptedAnswer: { "@type": "Answer", text: "Yes — paste up to 50 Reels links at once. Bulk import is included on paid plans." }},
        { "@type": "Question", name: "Is it free?", acceptedAnswer: { "@type": "Answer", text: "Free accounts get 5 Reels transcripts per day. Paid plans start at $39/year for unlimited transcripts, AI agents, and HD downloads." }},
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <HomePage platform="instagram" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
