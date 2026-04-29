import PageData from "./PageData";

export const metadata = {
  title: "About TokScript | 84M+ Minutes Transcribed for 41,000+ Creators",
  description:
    "TokScript extracts transcripts from TikTok, Instagram Reels, and YouTube Shorts. 41,000+ creators use it to turn short-form video into searchable, exportable text. Free to start.",
  alternates: {
    canonical: "https://tokscript.com/about-us",
  },
  openGraph: {
    title: "About TokScript | Used by 41,000+ Creators",
    description:
      "Extract transcripts from TikTok, Instagram Reels, and YouTube Shorts. Free to start, no account required.",
    url: "https://tokscript.com/about-us",
    type: "website",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "About TokScript",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TokScript | Used by 41,000+ Creators",
    description:
      "Extract transcripts from TikTok, Instagram Reels, and YouTube Shorts. Free to start, no account required.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TokScript",
  url: "https://tokscript.com",
  logo: "https://tokscript.com/og-image.png",
  description: "TokScript extracts transcripts from TikTok, Instagram Reels, and YouTube Shorts. Used by 41,000+ creators to turn short-form video into searchable, exportable text.",
  foundingDate: "2024",
  sameAs: [
    "https://x.com/tokscript",
    "https://tiktok.com/@tokscript",
    "https://instagram.com/tokscript",
    "https://youtube.com/@tokscript",
    "https://linkedin.com/company/tokscript"
  ]
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://tokscript.com"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://tokscript.com/about-us"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is TokScript free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Your first transcripts are completely free — no account required. Premium plans unlock unlimited bulk processing and AI agents."
      }
    },
    {
      "@type": "Question",
      name: "What platforms does TokScript support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TikTok (up to 10 minutes), Instagram Reels, and YouTube Shorts."
      }
    },
    {
      "@type": "Question",
      name: "How accurate are the transcripts?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Expect 99% accuracy for videos with clear audio, across 100+ languages."
      }
    },
    {
      "@type": "Question",
      name: "Can I use TokScript for commercial purposes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Agencies, consultants, e-commerce sellers, and researchers all use it commercially with no restrictions."
      }
    },
    {
      "@type": "Question",
      name: "Do the AI agents cost extra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. All three AI agents are included with your premium subscription at no additional charge."
      }
    },
    {
      "@type": "Question",
      name: "Can TokScript transcribe videos in languages other than English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. TokScript extracts transcripts in 100+ languages, whatever is spoken in the original video."
      }
    },
    {
      "@type": "Question",
      name: "Is there a limit on transcript extractions?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Free users have daily limits. Premium users have zero limits."
      }
    },
    {
      "@type": "Question",
      name: "What happens to my data if I cancel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "All your transcripts remain saved. You revert to free plan limits for new transcriptions."
      }
    },
    {
      "@type": "Question",
      name: "Does TokScript work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The web platform is fully responsive."
      }
    },
    {
      "@type": "Question",
      name: "How is TokScript different from generic tools?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Otter.ai is for meetings. TokScript is built specifically for short-form social video, with 15-second extraction and viral AI."
      }
    },
    {
      "@type": "Question",
      name: "How is it different from video downloaders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Downloaders only remove watermarks. TokScript extracts transcripts, downloads videos, AND provides AI-powered content generation."
      }
    }
  ]
};

export default function AboutUs() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageData />
    </>
  );
}
