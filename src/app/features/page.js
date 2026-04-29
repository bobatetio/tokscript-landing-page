import { features } from "@/data/features";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { FaFileAlt, FaLayerGroup, FaListUl, FaDownload, FaCloud, FaLink, FaPuzzlePiece, FaUsers, FaGlobe } from "@/components/Icons";

export const metadata = {
  title: "Features | TokScript - All Tools for Video Transcript Extraction",
  description:
    "Explore TokScript's complete feature set: transcript generation, translations, bulk import, collection import, HD downloads, cloud storage, Chrome extension, quick download, and team collaboration tools.",
  alternates: {
    canonical: "https://tokscript.com/features",
  },
  openGraph: {
    title: "Features | TokScript - All Tools for Video Transcript Extraction",
    description:
      "Discover every tool TokScript offers to extract, translate, analyze, and repurpose short-form video content from TikTok, Instagram Reels, and YouTube Shorts.",
    url: "https://tokscript.com/features",
  },
};

// Feature icon mapping
const featureIcons = {
  "transcript-generator": FaFileAlt,
  "bulk-import": FaLayerGroup,
  "collection-import": FaListUl,
  "hd-downloads": FaDownload,
  "cloud-storage": FaCloud,
  "quick-download": FaLink,
  "chrome-extension": FaPuzzlePiece,
  "team-collaboration": FaUsers,
  "translations": FaGlobe,
};

export default function FeaturesHubPage() {
  return (
    <div className="features-hub-page">
      <Header />
      
      {/* Hero Section */}
      <section className="features-hub-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Every Tool You Need for <br />
              <span className="gradient-text">Video Transcript Extraction</span>
            </h1>
            <p className="hero-description">
              Extract, analyze, and repurpose content from TikTok, Instagram Reels, and YouTube Shorts. 
              Built for creators, marketers, and teams who need fast, accurate transcripts.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-hub-grid-section">
        <div className="container">
          <div className="features-hub-grid">
            {features.map((feature) => {
              const IconComponent = featureIcons[feature.slug] || FaFileAlt;
              return (
                <Link
                  key={feature.slug}
                  href={feature.path}
                  className="feature-hub-card"
                >
                  <div className="feature-hub-card-inner">
                    <div 
                      className="feature-icon-wrapper"
                      style={{ backgroundColor: `${feature.color}15` }}
                    >
                      <IconComponent 
                        className="feature-icon" 
                        style={{ color: feature.color }}
                      />
                    </div>
                    <h3 className="feature-card-title">{feature.title}</h3>
                    <p className="feature-card-description">
                      {feature.shortDescription}
                    </p>
                    <div className="feature-card-link">
                      Learn more 
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="features-hub-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join 41,000+ creators using TokScript to extract and analyze video transcripts.
            </p>
            <div className="cta-buttons">
              <Link href="/" className="btn-cta-primary">
                Start Free
              </Link>
              <Link href="/pricing" className="btn-cta-secondary">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
