import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export const metadata = {
  title: "Legal Disclaimer | TokScript",
  description:
    "Read TokScript's legal disclaimer. Learn about our trademark notices and legal information.",
  keywords: [
    "TokScript legal",
    "legal disclaimer",
    "trademark notice",
    "TikTok disclaimer",
    "terms of use",
  ],
  alternates: {
    canonical: "https://tokscript.com/legal",
  },
};

export default function Legal() {
  return (
    <div className="privacy-page">
      <Header />
      <div className="inner-page">
        <div className="container">
          <div className="page-wrapper">
            <div className="heading-wrapper">
              <div className="badge-wrapper gradient-border d-inline-flex">
                <strong className="text-gradient w-600">
                  LEGAL DISCLAIMER
                </strong>
              </div>
              <h1>Legal Disclaimer</h1>
              <p>Last Updated: January 28, 2026</p>
            </div>

            <div className="content-wrapper">
              <div className="policy-section">
                <h3>Trademark Notice</h3>
                <p>
                  TokScript is an independent third-party tool. TokScript is not affiliated with, endorsed
                  by, or sponsored by TikTok, TikTok USDS Joint Venture LLC,
                  TikTok Inc., ByteDance Ltd., Instagram, Meta Platforms Inc.,
                  YouTube, or Google LLC.
                </p>
                <p>
                  All product and company names, logos, and trademarks are the
                  property of their respective owners. Use of these names,
                  logos, and trademarks does not imply any affiliation,
                  endorsement, or sponsorship.
                </p>
              </div>

              <div className="policy-section">
                <h3>Fair Use</h3>
                <p>
                  TokScript references third-party platforms solely to describe
                  the functionality of our service. This constitutes nominative
                  fair use under applicable trademark laws.
                </p>
              </div>

              <div className="policy-section">
                <h3>Service Description</h3>
                <p>
                  TokScript is a transcript extraction and content analysis
                  tool. We do not host, store, or redistribute copyrighted video
                  content. Transcripts are generated for personal use,
                  accessibility, and educational purposes.
                </p>
              </div>

              <div className="policy-section">
                <h3>User Responsibility</h3>
                <p>
                  Users are responsible for ensuring their use of TokScript
                  complies with applicable laws and platform terms of service.
                  TokScript is not liable for how users utilize extracted
                  transcripts.
                </p>
              </div>

              <div className="policy-section">
                <h3>Contact</h3>
                <p>
                  For legal inquiries:{" "}
                  <a href="mailto:legal@tokscript.com">legal@tokscript.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
