import PageData from "./PageData";

export const metadata = {
  title: "TokScript MCP | AI Integration for Claude & ChatGPT",
  description:
    "Connect TokScript to Claude and ChatGPT. Pull transcripts, generate hooks, analyze virality, and research creators directly inside your AI conversation.",
  alternates: {
    canonical: "https://tokscript.com/mcp",
  },
  openGraph: {
    title: "TokScript MCP | AI Integration for Claude & ChatGPT",
    description:
      "Connect TokScript to Claude and ChatGPT. Pull transcripts, generate hooks, analyze virality, and research creators directly in conversation.",
    url: "https://tokscript.com/mcp",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript MCP",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript MCP | AI Integration for Claude & ChatGPT",
    description:
      "Connect TokScript to Claude and ChatGPT. Pull transcripts, generate hooks, analyze virality, and research creators directly in conversation.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

export default function McpPage() {
  return <PageData />;
}
