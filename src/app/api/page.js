import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "API Access | TokScript",
  description:
    "Integrate TokScript’s AI transcription into your apps. Scalable and developer-friendly API for TikTok, Instagram, and YouTube video transcripts.",
  keywords: [
    "TokScript API",
    "TikTok API transcription",
    "Instagram API transcription",
    "YouTube API captions",
    "AI video API",
  ],
  alternates: {
    canonical: "https://tokscript.com/api",
  },
};

export default function Api() {
  return (
    <>
      <Header />
      <main className="api-page">
        {/* Hero Section */}
        <section className="api-hero-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 text-center">
                <h1 className="cyan-pink-gradient mb-4">TokScript API</h1>
                <p className="light large-text">
                  Powerful RESTful API that provides developers with seamless
                  access to TokScript&apos;s transcript extraction and AI
                  analysis capabilities. Build custom workflows and integrate
                  with your existing systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* API Features Section */}
        <section className="api-features-section">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="api-content">
                  <h2 className="white mb-4">API Features</h2>
                  <p className="mb-4">
                    Our comprehensive API provides everything you need to
                    integrate video transcript extraction and AI-powered content
                    analysis into your applications.
                  </p>
                  <div className="api-features-list">
                    <div className="api-feature-item">
                      <div className="feature-icon"></div>
                      <span className="white">
                        Real-time transcript extraction
                      </span>
                    </div>
                    <div className="api-feature-item">
                      <div className="feature-icon"></div>
                      <span className="white">
                        AI content analysis endpoints
                      </span>
                    </div>
                    <div className="api-feature-item">
                      <div className="feature-icon"></div>
                      <span className="white">
                        Bulk processing capabilities
                      </span>
                    </div>
                    <div className="api-feature-item">
                      <div className="feature-icon"></div>
                      <span className="white">Webhook notifications</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="api-docs-content">
                  <h3 className="white mb-4">Developer Resources</h3>
                  <p className="mb-3">
                    Get started quickly with our comprehensive documentation,
                    code examples, and developer tools.
                  </p>
                  <div className="api-docs-list">
                    <div className="doc-item">
                      <span className="doc-name">API Documentation</span>
                      <span className="doc-status available">Available</span>
                    </div>
                    <div className="doc-item">
                      <span className="doc-name">Code Examples</span>
                      <span className="doc-status available">Available</span>
                    </div>
                    <div className="doc-item">
                      <span className="doc-name">SDK Libraries</span>
                      <span className="doc-status coming">Coming Soon</span>
                    </div>
                    <div className="doc-item">
                      <span className="doc-name">Postman Collection</span>
                      <span className="doc-status available">Available</span>
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
