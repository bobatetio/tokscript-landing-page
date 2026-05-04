import PageData from "./PageData";

export const metadata = {
  title: "TokScript on Claude | TikTok Research Inside Your AI",
  description:
    "Connect TokScript to Claude. Pull TikTok transcripts, generate hooks, analyze virality, and research creators inside your Claude conversation.",
  alternates: {
    canonical: "https://tokscript.com/claude",
  },
  openGraph: {
    title: "TokScript on Claude",
    description:
      "Connect TokScript to Claude. Research TikTok inside your AI conversation.",
    url: "https://tokscript.com/claude",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript on Claude",
      },
    ],
    type: "website",
  },
};

export default function ClaudePage() {
  return <PageData />;
}
