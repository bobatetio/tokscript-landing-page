import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Page Not Found | TokScript",
  description: "The page you're looking for doesn't exist.",
  robots: { index: false, follow: true },
  alternates: { canonical: null, languages: null },
  openGraph: null,
  twitter: null,
};

export default function NotFound() {
  return (
    <div className="page-not-found-page">
      <Header />
      <section className="not-found-hero">
        <div className="not-found-glow-1" />
        <div className="not-found-glow-2" />
        <div className="container">
          <div className="not-found-content">
            <span className="not-found-code">404</span>
            <h1>This page doesn't exist</h1>
            <p className="not-found-sub">
              The page you were looking for may have been moved, deleted, or
              never existed. Let's get you back on track.
            </p>
            <div className="not-found-actions">
              <Link href="/" className="not-found-cta">
                Back to Home
              </Link>
              <Link
                href="/features"
                className="not-found-link"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
