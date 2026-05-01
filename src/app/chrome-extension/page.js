import PageData from "./PageData";

export const metadata = {
  title: "TokScript Chrome Extension | Capture Inspiration Without Breaking Scroll",
  description:
    "Hit the extension, grab the transcript, keep scrolling. Click & capture, keyboard shortcuts, sidebar mode, cloud sync — research without the admin tax.",
  alternates: {
    canonical: "https://tokscript.com/chrome-extension",
  },
  openGraph: {
    title: "TokScript Chrome Extension | Capture Inspiration Without Breaking Scroll",
    description:
      "Hit the extension, grab the transcript, keep scrolling. Click & capture, keyboard shortcuts, sidebar mode, cloud sync — research without the admin tax.",
    url: "https://tokscript.com/chrome-extension",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Chrome Extension",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript Chrome Extension | Capture Inspiration Without Breaking Scroll",
    description:
      "Hit the extension, grab the transcript, keep scrolling. Click & capture, keyboard shortcuts, sidebar mode, cloud sync — research without the admin tax.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

export default function ChromeExtensionPage() {
  return <PageData />;
}
