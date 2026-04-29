import { Suspense } from "react";
import PageData from "./PageData";
import { LemonProducts } from "@/components/LemonProducts";
import { LemonProductsStaging } from "@/components/LemonProductsStaging";

export const metadata = {
  title: "TokScript Pricing — Free Plan + $39/yr Pro with AI Script Writer & Viral Hook Generator",
  description:
    "Choose the right TokScript plan. Free: 3 transcripts/day. Pro ($39/year or $10/month): unlimited transcripts, AI Script Writer, Viral Hook Generator, Chrome Extension. 41,000+ creators trust TokScript.",
  keywords: [
    "TokScript pricing",
    "TikTok transcription cost",
    "Instagram transcription plans",
    "YouTube subtitles pricing",
    "AI transcript pricing",
  ],
  alternates: {
    canonical: "https://tokscript.com/pricing",
  },
  openGraph: {
    title: "TokScript Pricing — Free Plan + $39/yr Pro with AI Agents",
    description:
      "Free: 3 transcripts/day. Pro: unlimited transcripts, AI Script Writer, Viral Hook Generator, Chrome Extension. Cancel anytime.",
    url: "https://tokscript.com/pricing",
    type: "website",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Pricing Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript Pricing — Free Plan + $39/yr Pro with AI Agents",
    description:
      "Free: 3 transcripts/day. Pro: unlimited transcripts, AI Script Writer, Viral Hook Generator, Chrome Extension. Cancel anytime.",
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
      item: "https://tokscript.com"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Pricing",
      item: "https://tokscript.com/pricing"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TokScript?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "TokScript is a powerful research tool that allows you to download transcripts, videos, and metadata from viral short-form content to reverse-engineer success."
      }
    },
    {
      "@type": "Question",
      name: "Which platforms are supported?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We currently support TikTok, Instagram Reels, and YouTube Shorts. You can paste a link from any of these platforms to extract data."
      }
    },
    {
      "@type": "Question",
      name: "Is the transcript download unlimited?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "On the Free plan, you get 3 transcripts per day. On the Monthly and Annual plans, transcript downloads are completely unlimited."
      }
    },
    {
      "@type": "Question",
      name: "How does the AI Script Writer work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We use OpenAI's GPT-4o and Anthropic's Claude 3.5 Sonnet tailored with our proprietary datasets. The AI analyzes the viral structure of the source video and rewrites it for your specific niche."
      }
    },
    {
      "@type": "Question",
      name: "Does it work for non-English videos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! TokScript supports transcription and translation for over 50 languages. You can analyze a viral video in Spanish and have the AI rewrite the script in English (or vice versa)."
      }
    },
    {
      "@type": "Question",
      name: "Can I use TokScript for my agency clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. Many agencies use TokScript to speed up research and scriptwriting for multiple clients. We do not charge extra for commercial use."
      }
    },
    {
      "@type": "Question",
      name: "Is there a Chrome Extension?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The TokScript Chrome Extension allows you to view transcripts and analytics directly on TikTok and Instagram while you scroll. It is included in all Paid plans."
      }
    },
    {
      "@type": "Question",
      name: "What is the refund policy?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer a 30-day money-back guarantee for Annual plans. For monthly plans, if you are not satisfied, contact us within 48 hours for a full refund."
      }
    },
    {
      "@type": "Question",
      name: "Can I cancel anytime?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can cancel your subscription instantly from your dashboard. You will retain access to Pro features until the end of your billing cycle."
      }
    },
    {
      "@type": "Question",
      name: "Do I need technical skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. TokScript is designed to be as simple as 'Copy Link' -> 'Paste Link'. The AI handles the complex analysis for you."
      }
    }
  ]
};

// Resolve product data on the server (hardcoded JSON, no API call)
function getProductsData() {
  if (process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID == "782434") {
    return LemonProducts();
  }
  return LemonProductsStaging();
}

// Main component with Suspense wrapper
export default function PricingCards() {
  const productsData = getProductsData();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <PageData initialProductsData={productsData} />
      </Suspense>
    </>
  );
}
