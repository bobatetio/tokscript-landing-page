import YouTubeShortsLandingPage from "../../templates/youtube-shorts/LandingPage";

export const metadata = {
  title: "YouTube Transcript Generator - Free AI Tool | TokScript",
  description: "Generate accurate transcripts from YouTube Shorts and videos instantly. Free AI-powered tool to convert YouTube video to text in seconds.",
  alternates: {
    canonical: "https://tokscript.com/youtube-transcript-generator",
  },
  openGraph: {
    title: "YouTube Transcript Generator - Free AI Tool | TokScript",
    description: "Generate accurate transcripts from YouTube Shorts and videos instantly. Free AI-powered tool to convert YouTube video to text in seconds.",
    url: "https://tokscript.com/youtube-transcript-generator",
    siteName: "Tokscript",
    images: [{ url: "https://tokscript.com/og-image.png", width: 1200, height: 630, alt: "TokScript YouTube Transcript Generator" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Transcript Generator - Free AI Tool | TokScript",
    description: "Generate accurate transcripts from YouTube Shorts and videos instantly. Free AI-powered tool to convert YouTube video to text in seconds.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <YouTubeShortsLandingPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tokscript.com" },
                { "@type": "ListItem", "position": 2, "name": "YouTube Transcript Generator", "item": "https://tokscript.com/youtube-transcript-generator" }
              ]
            },
            {
              "@type": "WebApplication",
              "name": "TokScript YouTube Transcript Generator",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "All",
              "offers": [
                { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
                { "@type": "Offer", "price": "39", "priceCurrency": "USD", "billingIncrement": "P1Y" }
              ]
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "What is TokScript?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript is an AI transcript platform for short-form video. It extracts transcripts from YouTube Shorts, TikTok, and Instagram Reels and gives you tools to download, translate, organize, and repurpose that content. The platform includes three AI agents for generating hooks, rewriting scripts, and breaking down video performance." }},
                { "@type": "Question", "name": "How do I download a YouTube Shorts transcript?", "acceptedAnswer": { "@type": "Answer", "text": "Go to the YouTube Short you want to transcribe. Tap the Share button and select \"Copy link.\" Paste that link into the input field at the top of this page and click \"Scan Video.\" TokScript compares YouTube's native auto-generated captions against its own AI audio transcription, then uses an AI model to resolve any differences. The result is a more accurate transcript than either source alone. The whole process takes about 5 to 10 seconds." }},
                { "@type": "Question", "name": "Does it work with regular YouTube videos or just Shorts?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript handles YouTube Shorts (under 60 seconds) for all users. Videos between 60 seconds and 2 minutes 30 seconds are available on free and paid plans. Annual plan members with beta access can also download transcripts from full-length YouTube videos using the same process. If you're not sure whether a video qualifies, just paste the link and TokScript will tell you." }},
                { "@type": "Question", "name": "Does it work with YouTube Shorts over 60 seconds?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. YouTube technically classifies videos over 60 seconds as regular videos rather than Shorts, but TokScript processes them the same way. Videos up to 2 minutes 30 seconds work for all users. Annual subscribers with beta access can process longer YouTube videos as well." }},
                { "@type": "Question", "name": "How do I copy the link from a YouTube Short?", "acceptedAnswer": { "@type": "Answer", "text": "On mobile, open the Short and tap the Share button (arrow icon). Select \"Copy link.\" On desktop, click Share below the Shorts player and the link will appear in a popup for you to copy. Paste that URL into TokScript and you're set." }},
                { "@type": "Question", "name": "Can I get transcripts from unlisted YouTube videos?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. An unlisted YouTube video is still accessible to anyone with the link, so TokScript can pull the transcript from it. The only videos we cannot process are ones marked as Private by the uploader. If you have the shareable link to an unlisted video, it will work." }},
                { "@type": "Question", "name": "Can I bulk download YouTube Shorts transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Paste up to 50 YouTube Shorts links into the input field at once, and TokScript processes them all in a single batch. Export all results together or download them one at a time. Bulk importing requires a paid plan." }},
                { "@type": "Question", "name": "What formats can I download YouTube Shorts transcripts in?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript exports transcripts in three formats: TXT for plain text, XML for structured data, and PDF for a formatted document. You can also copy any transcript to your clipboard directly from the dashboard." }},
                { "@type": "Question", "name": "Can I translate YouTube Shorts transcripts to other languages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Select a language before scanning and TokScript delivers the transcript already translated. We support 11 languages: English, Spanish, Portuguese, Mandarin, French, Hindi, Arabic, German, Japanese, Korean, and Russian. You can also translate a transcript you already downloaded into a different language at any time." }},
                { "@type": "Question", "name": "Do I need a YouTube account to use this?", "acceptedAnswer": { "@type": "Answer", "text": "No. You don't need a YouTube account and you don't need to be signed into YouTube. The only thing you need is the link to the Short. Paste it into TokScript and the transcript is generated for you." }},
                { "@type": "Question", "name": "Is it free to download YouTube Shorts transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Free accounts get 5 YouTube Shorts transcripts per day at no cost. For unlimited transcripts, bulk processing, AI agents, and HD video downloads, paid plans start at $39 per year." }},
                { "@type": "Question", "name": "How does TokScript handle YouTube's auto-generated captions?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript uses a dual-verification system. We pull YouTube's native auto-generated captions and separately transcribe the audio using our own AI. Then an AI model compares both versions and picks the most accurate result for each segment. This process also accounts for slang, regional expressions, and informal language that standard auto-captions often get wrong. The result is a cleaner, more accurate transcript than what YouTube provides on its own." }},
                { "@type": "Question", "name": "Can I use the AI agents with YouTube Shorts transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All three agents work with any YouTube Shorts transcript. The Viral Hook Generator creates 20+ hook variations from any transcript. The Script Writer produces a new script based on a Shorts transcript that performed well. The Virality Explainer gives you a detailed breakdown of what drove a Short's views, covering hook strength, pacing, structure, and audience triggers." }},
                { "@type": "Question", "name": "Can I download the YouTube Short video in HD?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. TokScript downloads any public YouTube Short at full HD resolution without watermarks. You can also save the video's thumbnail at its original quality. Both options are accessible from your dashboard after scanning a video." }}
              ]
            }
          ]
        })}}
      />
    </>
  );
}
