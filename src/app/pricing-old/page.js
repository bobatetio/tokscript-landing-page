import PageData from "./PageData";

export const metadata = {
  title: "Pricing | TokScript",
  description:
    "Choose the right plan for your TikTok, Instagram, and YouTube transcription needs. Flexible pricing for creators, teams, and enterprises.",
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
};

// Main component with Suspense wrapper
export default function PricingCards() {
  return (
    <>
      <PageData />
    </>
  );
}
