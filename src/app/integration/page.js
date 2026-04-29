import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Integrations | TokScript",
  description:
    "Connect TokScript with your favorite tools. Streamline your TikTok, Instagram, and YouTube transcription workflow with smart integrations.",
  keywords: [
    "TokScript integrations",
    "TikTok tools",
    "Instagram tools",
    "YouTube transcript integrations",
    "AI workflow automation",
  ],
  alternates: {
    canonical: "https://tokscript.com/integration",
  },
};

export default function Integrations() {
  return (
    <>
      <Header />
      <main className="integrations-page">
        {/* Hero Section */}
        <section className="integrations-hero-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="cyan-pink-gradient mb-4">Integrations</h1>
                <p className="light large-text">
                  Connect TokScript with your favorite tools and platforms. Our
                  pre-built integrations make it simple to incorporate video
                  transcript analysis into your existing workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="integrations-list-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="integrations-content">
                  <h2 className="white mb-4">Available Integrations</h2>
                  <p className="mb-4">
                    Seamlessly connect TokScript with the tools you already use.
                    Save time and automate your content workflow with our
                    growing list of integrations.
                  </p>
                  <div className="integration-items">
                    <div className="integration-item">
                      <span className="integration-name">Zapier</span>
                      <span className="integration-status available">
                        Available
                      </span>
                    </div>
                    <div className="integration-item">
                      <span className="integration-name">Slack</span>
                      <span className="integration-status available">
                        Available
                      </span>
                    </div>
                    <div className="integration-item">
                      <span className="integration-name">Discord</span>
                      <span className="integration-status coming">
                        Coming Soon
                      </span>
                    </div>
                    <div className="integration-item">
                      <span className="integration-name">Notion</span>
                      <span className="integration-status coming">
                        Coming Soon
                      </span>
                    </div>
                    <div className="integration-item">
                      <span className="integration-name">Airtable</span>
                      <span className="integration-status coming">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="workflow-content">
                  <h3 className="white mb-4">Workflow Automation</h3>
                  <p className="mb-3">
                    Create powerful automated workflows that trigger when
                    transcripts are extracted or when AI analysis is complete.
                  </p>
                  <p className="mb-3">
                    Set up notifications, save results to databases, or
                    automatically share insights with your team.
                  </p>
                  <div className="workflow-features">
                    <div className="workflow-feature">
                      <div className="feature-icon"></div>
                      <span className="white">Automatic notifications</span>
                    </div>
                    <div className="workflow-feature">
                      <div className="feature-icon"></div>
                      <span className="white">Data synchronization</span>
                    </div>
                    <div className="workflow-feature">
                      <div className="feature-icon"></div>
                      <span className="white">Custom triggers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
