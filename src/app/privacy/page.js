import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

export const metadata = {
  title: "Privacy Policy | TokScript",
  description:
    "Read TokScript’s privacy policy. Learn how we collect, use, and protect your data when transcribing TikTok, Instagram, and YouTube videos.",
  keywords: [
    "TokScript privacy",
    "transcription data policy",
    "TikTok data privacy",
    "Instagram privacy",
    "YouTube data protection",
  ],
  alternates: {
    canonical: "https://tokscript.com/privacy",
  },
};

export default function Privacy() {
  return (
    <div className="privacy-page">
      <Header />
      <div className="inner-page">
        <div className="container">
          <div className="page-wrapper">
            <div className="heading-wrapper">
              <div className="badge-wrapper gradient-border d-inline-flex">
                <strong className="text-gradient w-600">PRIVACY POLICY</strong>
              </div>
              <h1>Privacy Policy</h1>
              <p>Last updated: January 2025</p>
            </div>

            <div className="content-wrapper">
              <div className="policy-section">
                <h3>Information We Collect</h3>
                <p>
                  When you use TokScript, we collect information to provide and
                  improve our transcription services:
                </p>
                <ul>
                  <li>Account information (email address, username)</li>
                  <li>TikTok video URLs you submit for transcription</li>
                  <li>Usage data and analytics to improve our service</li>
                  <li>
                    Technical information like IP address and browser type
                  </li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>How We Use Your Information</h3>
                <p>We use the collected information to:</p>
                <ul>
                  <li>Process your video transcription requests</li>
                  <li>
                    Maintain and improve our AI-powered transcription technology
                  </li>
                  <li>
                    Communicate with you about your account and our services
                  </li>
                  <li>Ensure security and prevent abuse of our platform</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Data Security</h3>
                <p>
                  We implement industry-standard security measures to protect
                  your data. Your video content is processed securely and is not
                  stored permanently on our servers after transcription is
                  complete.
                </p>
              </div>

              <div className="policy-section">
                <h3>Data Sharing</h3>
                <p>
                  We do not sell, trade, or share your personal information with
                  third parties except:
                </p>
                <ul>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, safety, or property</li>
                  <li>
                    With service providers who help us operate our platform
                  </li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and update your personal information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt out of non-essential communications</li>
                  <li>Request a copy of your data</li>
                </ul>
              </div>

              <div className="policy-section">
                <h3>Cookies and Tracking</h3>
                <p>
                  We use cookies and similar technologies to enhance your
                  experience, analyze usage patterns, and improve our services.
                  You can control cookie settings through your browser
                  preferences.
                </p>
              </div>

              <div className="policy-section">
                <h3>Changes to This Policy</h3>
                <p>
                  We may update this privacy policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the &quot;Last updated&quot; date.
                </p>
              </div>

              <div className="policy-section">
                <h3>Contact Us</h3>
                <p>
                  If you have any questions about this privacy policy or our
                  data practices, please contact us at privacy@tokscript.com.
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
