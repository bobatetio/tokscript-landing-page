import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export const metadata = {
  title: "Terms of Service | TokScript",
  description:
    "Review the terms and conditions for using TokScript’s TikTok, Instagram, and YouTube transcription services.",
  keywords: [
    "TokScript terms",
    "TikTok transcription terms",
    "Instagram transcription terms",
    "YouTube transcript conditions",
    "AI tool terms",
  ],
  alternates: {
    canonical: "https://tokscript.com/terms",
  },
};

export default function Terms() {
  return (
    <div className="terms-page">
      <Header />
      <div className="inner-page">
        <div className="container">
          <div className="page-wrapper">
            <div className="heading-wrapper">
              <div className="badge-wrapper gradient-border d-inline-flex">
                <strong className="text-gradient w-600">
                  TERMS OF SERVICE
                </strong>
              </div>
              <h1>Terms of Service</h1>
              <p>Last updated: January 2025</p>
            </div>

            <div className="content-wrapper">
              <div className="policy-section">
                <h3>Acceptance of Terms</h3>
                <p>
                  By accessing and using TokScript, you accept and agree to be
                  bound by the terms and provision of this agreement. If you do
                  not agree to abide by the above, please do not use this
                  service.
                </p>
              </div>

              <div className="policy-section">
                <h3>Service Description</h3>
                <p>
                  TokScript is an AI-powered transcription service that converts
                  TikTok videos into accurate text transcripts. Our service is
                  provided &quot;as is&quot; and we reserve the right to modify
                  or discontinue features at any time.
                </p>
              </div>

              <div className="policy-section">
                <h3>User Responsibilities</h3>
                <p>You agree to:</p>
                <ul>
                  <li>
                    Provide accurate and complete information when creating your
                    account
                  </li>
                  <li>Use the service only for lawful purposes</li>
                  <li>
                    Respect intellectual property rights of video creators
                  </li>
                  <li>
                    Not attempt to circumvent usage limits or security measures
                  </li>
                  <li>Not use automated tools to abuse our service</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Content and Copyright</h3>
                <p>
                  You are responsible for ensuring you have the right to
                  transcribe any video content you submit. TokScript does not
                  claim ownership of your content but requires a license to
                  process it for transcription purposes.
                </p>
              </div>

              <div className="policy-section">
                <h3>Usage Limits and Billing</h3>
                <p>
                  Free accounts have usage limitations. Paid subscriptions
                  provide expanded access according to your chosen plan. All
                  billing is handled securely through our payment processors.
                </p>
              </div>

              <div className="policy-section">
                <h3>Service Availability</h3>
                <p>
                  While we strive for high availability, we do not guarantee
                  uninterrupted service. We may perform maintenance or updates
                  that temporarily affect service availability.
                </p>
              </div>

              <div className="policy-section">
                <h3>Limitation of Liability</h3>
                <p>
                  TokScript shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including without
                  limitation, loss of profits, data, use, goodwill, or other
                  intangible losses.
                </p>
              </div>

              <div className="policy-section">
                <h3>Account Termination</h3>
                <p>
                  We reserve the right to terminate accounts that violate these
                  terms. You may delete your account at any time. Upon
                  termination, your access to the service will cease
                  immediately.
                </p>
              </div>

              <div className="policy-section">
                <h3>Modifications to Terms</h3>
                <p>
                  We reserve the right to modify these terms at any time.
                  Material changes will be communicated to users via email or
                  platform notifications. Continued use after changes
                  constitutes acceptance.
                </p>
              </div>

              <div className="policy-section">
                <h3>Governing Law</h3>
                <p>
                  These terms shall be governed by and construed in accordance
                  with the laws of the jurisdiction in which TokScript operates.
                </p>
              </div>

              <div className="policy-section">
                <h3>Contact Information</h3>
                <p>
                  For questions about these terms of service, please contact us
                  at legal@tokscript.com.
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
