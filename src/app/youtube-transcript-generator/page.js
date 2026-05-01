import HomePage from "../HomePage";

export const metadata = {
  title: "YouTube Transcript Generator - Free AI Tool | TokScript",
  description:
    "Generate accurate transcripts from any YouTube Short in seconds. Free AI-powered tool to convert YouTube video to text. Bulk process up to 50 Shorts.",
  alternates: {
    canonical: "https://tokscript.com/youtube-transcript-generator",
  },
  openGraph: {
    title: "YouTube Transcript Generator - Free AI Tool | TokScript",
    description:
      "Generate accurate transcripts from any YouTube Short in seconds. Free AI-powered tool to convert YouTube video to text.",
    url: "https://tokscript.com/youtube-transcript-generator",
    siteName: "Tokscript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript YouTube Transcript Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Transcript Generator - Free AI Tool | TokScript",
    description:
      "Generate accurate transcripts from any YouTube Short in seconds. Free AI-powered tool to convert YouTube video to text.",
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
        { "@type": "ListItem", position: 2, name: "YouTube Transcript Generator", item: "https://tokscript.com/youtube-transcript-generator" },
      ],
    },
    {
      "@type": "WebApplication",
      name: "TokScript YouTube Transcript Generator",
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
        { "@type": "Question", name: "How do I download a YouTube Shorts transcript?", acceptedAnswer: { "@type": "Answer", text: "Open the Short, tap Share, then Copy Link — or copy the URL directly from the address bar. Paste into TokScript and hit Scan Video. Your transcript is ready in 5–10 seconds." }},
        { "@type": "Question", name: "Does it work with long-form YouTube videos?", acceptedAnswer: { "@type": "Answer", text: "TokScript is built for YouTube Shorts. Long-form videos are supported but optimized for short-form content." }},
        { "@type": "Question", name: "Why is it more accurate than YouTube's own captions?", acceptedAnswer: { "@type": "Answer", text: "TokScript layers AI transcription on top of YouTube's native captions for dual-verification accuracy. Where YouTube auto-captions fall short, our AI fills the gaps." }},
        { "@type": "Question", name: "Can I bulk download Shorts transcripts?", acceptedAnswer: { "@type": "Answer", text: "Yes — paste up to 50 Shorts links at once. Bulk import is included on paid plans." }},
        { "@type": "Question", name: "Is it free?", acceptedAnswer: { "@type": "Answer", text: "Free accounts get 5 Shorts transcripts per day. Paid plans start at $39/year for unlimited transcripts, AI agents, and HD downloads." }},
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <HomePage platform="youtube" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
