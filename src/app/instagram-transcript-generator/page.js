import InstagramReelsLandingPage from "../../templates/instagram-reels/LandingPage";

export const metadata = {
  title: "Instagram Transcript Generator - Free AI Tool | TokScript",
  description: "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text. Bulk process up to 50 videos.",
  alternates: {
    canonical: "https://tokscript.com/instagram-transcript-generator",
  },
  openGraph: {
    title: "Instagram Transcript Generator - Free AI Tool | TokScript",
    description: "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text. Bulk process up to 50 videos.",
    url: "https://tokscript.com/instagram-transcript-generator",
    siteName: "Tokscript",
    images: [{ url: "https://tokscript.com/og-image.png", width: 1200, height: 630, alt: "TokScript Instagram Transcript Generator" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Instagram Transcript Generator - Free AI Tool | TokScript",
    description: "Generate accurate transcripts from any Instagram Reel in seconds. Free AI-powered tool to convert Instagram video to text.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

export default function Page() {
  return (
    <>
      <InstagramReelsLandingPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tokscript.com" },
                { "@type": "ListItem", "position": 2, "name": "Instagram Transcript Generator", "item": "https://tokscript.com/instagram-transcript-generator" }
              ]
            },
            {
              "@type": "WebApplication",
              "name": "TokScript Instagram Transcript Generator",
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
                { "@type": "Question", "name": "What is TokScript?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript is an AI-powered transcript platform built for short-form video. It pulls transcripts from Instagram Reels, TikTok, and YouTube Shorts so you can read, search, download, and repurpose the spoken content from any public video. Beyond transcripts, TokScript includes three AI agents that generate viral hooks, rewrite scripts, and analyze why specific videos performed well." }},
                { "@type": "Question", "name": "How do I download an Instagram Reels transcript?", "acceptedAnswer": { "@type": "Answer", "text": "Open the Reel you want to transcribe in the Instagram app or on desktop. Tap the share icon (the paper plane) and select \"Copy Link.\" Come back to this page, paste the link into the input field at the top, and hit \"Scan Video.\" Your transcript will be ready in about 5 to 10 seconds. From there you can copy it, download it as TXT, XML, or PDF, or send it to one of the AI agents." }},
                { "@type": "Question", "name": "Does it work with all types of Instagram content?", "acceptedAnswer": { "@type": "Answer", "text": "TokScript works specifically with Instagram Reels. We do not currently support Instagram Stories, regular feed posts, or Instagram Live recordings. Reels are the only Instagram format that includes embedded transcript data we can extract. If a Reel contains spoken audio, we can transcribe it." }},
                { "@type": "Question", "name": "Can I get transcripts from private Instagram accounts?", "acceptedAnswer": { "@type": "Answer", "text": "No. TokScript can only pull transcripts from public Instagram Reels. If a creator's account is set to private, their Reels are not accessible to anyone outside their approved followers, and that includes our system. The Reel must be publicly viewable for us to extract the transcript." }},
                { "@type": "Question", "name": "How do I copy the link from an Instagram Reel?", "acceptedAnswer": { "@type": "Answer", "text": "On mobile, open the Reel and tap the paper plane icon (share button) at the bottom. Then tap \"Copy Link.\" On desktop, click the three dots on the Reel post and select \"Copy Link.\" Either way, the Reel URL is now on your clipboard and ready to paste into TokScript." }},
                { "@type": "Question", "name": "What if the Reel has music but no one is talking?", "acceptedAnswer": { "@type": "Answer", "text": "If a Reel is entirely music or sound effects with no spoken words, there is no transcript to extract. TokScript pulls the spoken audio content from a video. If the creator isn't saying anything in the Reel, we won't be able to generate a transcript. This is the case on any platform, not just Instagram." }},
                { "@type": "Question", "name": "Can I bulk download Instagram Reels transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Paste up to 50 Instagram Reels links at once into the input field and TokScript will process them all in a single batch. You can export every transcript at once or download them individually. Bulk importing is available on paid plans." }},
                { "@type": "Question", "name": "What formats can I download Instagram Reels transcripts in?", "acceptedAnswer": { "@type": "Answer", "text": "You can download your Reels transcripts in three formats: TXT (plain text), XML (structured data), and PDF (formatted document). You can also copy the transcript directly to your clipboard from the dashboard without downloading a file." }},
                { "@type": "Question", "name": "Can I translate Instagram Reels transcripts to other languages?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. TokScript supports translation into 11 languages including English, Spanish, Portuguese, Mandarin, French, Hindi, Arabic, German, Japanese, Korean, and Russian. Just select your target language before scanning the video, and the transcript will come back translated. You can also re-translate an existing transcript into a different language later." }},
                { "@type": "Question", "name": "Do I need an Instagram account to use this?", "acceptedAnswer": { "@type": "Answer", "text": "No. You do not need an Instagram account, and you do not need to be logged into Instagram. All you need is the link to a public Reel. Paste it into TokScript and the transcript is yours." }},
                { "@type": "Question", "name": "Is it free to download Instagram Reels transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Free accounts can download up to 5 Instagram Reels transcripts per day at no cost. If you need unlimited transcripts, bulk importing, AI agents, and HD video downloads, those are included in the paid plans starting at $39 per year." }},
                { "@type": "Question", "name": "Can I use the AI agents with Instagram Reels transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. All three AI agents work with any Instagram Reels transcript. Paste a Reel transcript into the Viral Hook Generator to get 20+ opening hook ideas. Send it to the Script Writer to create a new script based on the original. Or run it through the Virality Explainer to understand the specific triggers and patterns that drove the Reel's performance." }},
                { "@type": "Question", "name": "How accurate are Instagram Reels transcripts?", "acceptedAnswer": { "@type": "Answer", "text": "Accuracy depends on the audio quality of the original Reel. Clear spoken audio with minimal background noise produces highly accurate transcripts. Reels with heavy music overlays, sound effects, or low-quality audio may result in some inaccuracies. In general, most Reels with clear speech produce transcripts suitable for content creation, research, and repurposing." }},
                { "@type": "Question", "name": "Can I download the Instagram Reel video in HD too?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. TokScript can download any public Instagram Reel in full HD resolution with no watermarks. You can also download the Reel's cover image (thumbnail) at original quality. Both features are available from your dashboard after scanning a video." }}
              ]
            }
          ]
        })}}
      />
    </>
  );
}
