import PageData from "./PageData";

export const metadata = {
  title: "TokScript on ChatGPT | TikTok Research Inside Your AI",
  description:
    "Connect TokScript to ChatGPT. Pull TikTok transcripts, generate hooks, analyze virality, and research creators inside your ChatGPT conversation.",
  alternates: {
    canonical: "https://tokscript.com/chatgpt",
  },
  openGraph: {
    title: "TokScript on ChatGPT",
    description:
      "Connect TokScript to ChatGPT. Research TikTok inside your AI conversation.",
    url: "https://tokscript.com/chatgpt",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript on ChatGPT",
      },
    ],
    type: "website",
  },
};

export default function ChatgptPage() {
  return <PageData />;
}
