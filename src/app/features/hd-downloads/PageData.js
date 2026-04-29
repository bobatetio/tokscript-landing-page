"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Download,
  Image as ImageIcon,
  MonitorPlay,
  PlaySquare,
  Droplets,
  ArrowRight,
  Check,
  Video,
  EyeOff,
} from "lucide-react";

const NoiseOverlay = () => (
  <svg className="ts-noise-overlay" viewBox="0 0 100% 100%" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const HoverStateWrapper = ({ className, children, style }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div className={className} style={style} onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      {typeof children === 'function' ? children(hovering) : children}
    </div>
  );
};

// FAUX UIs

const AnimatedQualityComparison = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '360px', height: '200px', display: 'flex', gap: '16px' }}>
      {/* Other Downloaders */}
      <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(239, 68, 68, 0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', filter: 'blur(1px)' }}>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', marginBottom: '12px' }}></div>
          <div style={{ fontSize: '14px', fontWeight: '900', color: 'rgba(255,255,255,0.5)', transform: 'rotate(-15deg)', letterSpacing: '2px' }}>@TIKTOK</div>
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '0', width: '100%', textAlign: 'center', fontSize: '10px', color: '#fca5a5', fontWeight: 'bold' }}>OTHER TOOLS</div>
      </div>

      {/* TokScript */}
      <div style={{ flex: 1, background: 'linear-gradient(to bottom, #0d0d0d, #1a1a1a)', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.4)', overflow: 'hidden', position: 'relative', boxShadow: hovering ? '0 10px 30px rgba(59, 130, 246, 0.3)' : 'none', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #00D9B4)', borderRadius: '8px', marginBottom: '12px', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.5)' }}></div>
          <div style={{ fontSize: '10px', color: '#60a5fa', fontWeight: 'bold' }}>1080p HD</div>
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '0', width: '100%', textAlign: 'center', fontSize: '10px', color: '#93c5fd', fontWeight: 'bold' }}>TOKSCRIPT</div>
      </div>
    </div>
  );
};

const AnimatedCoverImagePair = ({ hovering }) => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100px', height: '160px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', padding: '8px', boxShadow: hovering ? '0 10px 20px rgba(0,0,0,0.5)' : 'none', transform: hovering ? 'translateY(-10px)' : 'none', transition: 'all 0.4s ease' }}>
        <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Video size={24} color="rgba(255,255,255,0.2)" />
        </div>
        <div style={{ fontSize: '9px', color: '#7a7a7a', textAlign: 'center', fontFamily: 'monospace' }}>video.mp4</div>
      </div>

      <div style={{ fontSize: '24px', color: '#2a2a2a', fontWeight: '900', opacity: hovering ? 1 : 0.5, transform: hovering ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.4s ease' }}>+</div>

      <div style={{ width: '100px', height: '160px', background: '#0d0d0d', borderRadius: '12px', border: '1px dashed rgba(59, 130, 246, 0.4)', display: 'flex', flexDirection: 'column', padding: '8px', boxShadow: hovering ? '0 10px 30px rgba(59, 130, 246, 0.2)' : 'none', transform: hovering ? 'translateY(10px)' : 'none', transition: 'all 0.4s ease 0.1s' }}>
        <div style={{ flex: 1, background: 'linear-gradient(45deg, #1a1a1a, #0d0d0d)', borderRadius: '6px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ImageIcon size={24} color="#60a5fa" />
        </div>
        <div style={{ fontSize: '9px', color: '#60a5fa', textAlign: 'center', fontFamily: 'monospace' }}>cover.jpg</div>
      </div>
    </div>
  );
};

const AnimatedResolution = ({ hovering }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '200px' }}>
      {[
        { label: "480p SD", color: "#7a7a7a", active: false },
        { label: "720p HD", color: "#7a7a7a", active: false },
        { label: "1080p Original", color: "#3b82f6", active: true }
      ].map((res, i) => (
        <div key={i} style={{ padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: res.active && hovering ? res.color : 'rgba(255,255,255,0.05)', background: res.active && hovering ? 'rgba(59, 130, 246, 0.1)' : '#1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: res.active && hovering ? '#fff' : res.color, transform: res.active && hovering ? 'scale(1.05)' : 'scale(1)', transition: 'all 0.3s ease', boxShadow: res.active && hovering ? `0 0 20px rgba(59, 130, 246, 0.3)` : 'none' }}>
          <span style={{ fontSize: '13px', fontWeight: 'bold' }}>{res.label}</span>
          {res.active && hovering && <Check size={14} color="#60a5fa" />}
        </div>
      ))}
    </div>
  );
};

const AnimatedNoBranding = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '100px', height: '140px', background: '#0d0d0d', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
      {/* Base video layer with watermark */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.6 }}>
           <div style={{ fontSize: '12px', fontWeight: '900', color: '#fff', transform: 'rotate(-15deg)', letterSpacing: '1px', textShadow: '1px 1px 0 #ef4444, -1px -1px 0 #00D9B4' }}>@TIKTOK</div>
        </div>
      </div>
      
      {/* Clean video layer (revealed by scanner) */}
      <motion.div 
        style={{ position: 'absolute', inset: 0, background: '#1a1a1a', overflow: 'hidden', borderRight: '2px solid #3b82f6', boxShadow: '2px 0 10px rgba(59, 130, 246, 0.5)' }}
        initial={{ width: '0%' }}
        animate={hovering ? { width: ['0%', '100%', '0%'] } : { width: '0%' }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{ position: 'absolute', width: '100px', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Video size={32} color="#60a5fa" opacity={0.8} />
        </div>
      </motion.div>
    </div>
  );
};

const AnimatedMultiPlatform = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ y: 0, x: 0, scale: 1, rotate: -10, opacity: 0.7 }}
        animate={hovering ? { y: -10, x: -20, scale: 1.05, opacity: 1 } : { y: 0, x: 0, scale: 1, rotate: -10, opacity: 0.7 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', width: '60px', height: '80px', background: 'linear-gradient(45deg, #f09433, #dc2743)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </motion.div>
      <motion.div
        initial={{ y: 0, x: 0, scale: 1, rotate: 10, opacity: 0.7 }}
        animate={hovering ? { y: -10, x: 20, scale: 1.05, rotate: 15, opacity: 1 } : { y: 0, x: 0, scale: 1, rotate: 10, opacity: 0.7 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ position: 'absolute', width: '60px', height: '80px', background: '#ff0000', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#ff0000"/></svg>
      </motion.div>
      <motion.div
        initial={{ y: 0, scale: 1, zIndex: 10 }}
        animate={hovering ? { y: 10, scale: 1.1 } : { y: 0, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ position: 'absolute', width: '60px', height: '80px', background: '#000', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.5)', zIndex: 10 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
      </motion.div>
    </div>
  );
};

export default function HDVideoDownloaderPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "How do you remove the watermark?", a: "We don't \"remove\" anything. We download the original video file before TikTok adds its watermark. The watermark you see when you watch a video is added by the app for display purposes. The underlying file is clean, and that's what TokScript retrieves." },
    { q: "What resolution do I get?", a: "TokScript downloads the highest resolution available from the platform, typically 1080p for TikTok and Instagram Reels, varying for YouTube Shorts based on upload quality. We don't compress or re-encode files. What the creator uploaded is what you get." },
    { q: "Can I download private videos?", a: "No. TokScript can only access publicly available content. Private accounts, unlisted videos, and content behind login walls aren't accessible. This is a platform limitation that applies to all download tools." },
    { q: "Do I get the cover image automatically?", a: "Yes. Every video download includes its cover image (thumbnail) automatically, no extra steps. Cover images download as separate JPG files alongside your video. Perfect for building visual swipe files." },
    { q: "Is this legal?", a: "Downloading public videos for personal use, research, or reference is generally permitted. However, you should respect creators' rights. Don't re-upload their content as your own or use it commercially without permission." },
  ];

  return (
    <div className="ts-features-v4">
      <NoiseOverlay />
      <Header />
      
      <main className="ts-main">
        {/* HERO */}
        <section className="ts-hero">
          <div className="ts-hero-bg">
            <div className="ts-hero-grid"></div>
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#ec4899' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Download size={14} className="text-pink-400" />
                  <span>HD VIDEO DOWNLOADS</span>
                </div>
                <h1 className="ts-hero-title">
                  Download Videos in HD.
                  <br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fbcfe8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    No Watermark.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Save TikTok, Reels, and Shorts at original quality. Clean files ready for your swipe file, edit timeline, or client presentation. Every download includes the cover image automatically.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#ec4899', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(236, 72, 153, 0.4)' }}>
                    Download First Video Free <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(236, 72, 153, 0.2)' }}>
                  <AnimatedQualityComparison hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Don't settle for potato quality.</h2>
              <p className="ts-cv-subtitle">
                You need the video file. For your swipe file. Your mood board. Your client presentation. Your edit timeline. But every "free downloader" gives you the same thing: a blurry, compressed mess with a giant watermark plastered across the middle.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '280px', padding: '24px', opacity: 0.8 }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>Other Downloaders</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#7a7a7a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> Watermark Burned In</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> Compressed to 480p</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fca5a5' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> No Cover Image</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Tools</div>
                    <h3>Useless Footage</h3>
                    <p>Standard downloaders re-encode the video, dropping the quality and permanently baking the platform's logo into the frame. Useless for professional editing or client decks.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedCoverImagePair hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#fbcfe8' }}>TokScript Engine</div>
                        <h3>The Original Source</h3>
                        <p>We grab the raw, original file from the platform's servers before the watermark is ever applied. Crisp 1080p, and we automatically extract the cover thumbnail too.</p>
                      </div>
                    </>
                  )}
                </HoverStateWrapper>
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="ts-timeline-section">
          <div className="ts-bg-grid"></div>
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">How TokScript Downloads Work</h2>
            <p className="ts-section-subheading ts-text-center">Direct extraction. No loss of quality.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #ec4899, #f43f5e)' }}></div></div>

              {[
                { title: "Paste Your Video URL", desc: "Drop any TikTok, Instagram Reel, or YouTube Short link into TokScript. Same input field you use for transcripts." },
                { title: "Choose Your Download", desc: "Click download to grab the HD video file. We fetch the highest available resolution directly from the platform. Cover image downloads automatically alongside." },
                { title: "Use It However You Need", desc: "Your files download directly to your device. No watermarks, no platform branding, no surprises. Ready for your swipe file or presentation deck." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#f472b6', background: '#831843', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(244,114,182,0.4)' } : {}}>{i + 1}</div>
                      </div>
                      <div className="ts-step-card-wrap">
                        <div className="ts-step-card">
                          <div className="ts-step-watermark">0{i + 1}</div>
                          <div className="ts-step-card-content">
                            <h3 className="ts-step-title">{step.title}</h3>
                            <p className="ts-step-desc">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </HoverStateWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* VISUAL BENTO GRIDS */}
        <section className="ts-bento-section">
          <div className="ts-bg-aurora"></div>
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">Download Quality That Actually Works</h2>
            <p className="ts-section-subheading ts-text-center">The details that separate usable footage from garbage.</p>
            
            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%)' }}>
                       <AnimatedCoverImagePair hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#f472b6' }}>Cover Images Included</div>
                      <h3>Thumbnails Included Automatically</h3>
                      <p>Every video download includes its cover image, the thumbnail creators chose to get clicks. Build visual swipe files. Study thumbnail patterns. No extra steps, no screenshotting required.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedResolution hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Highest Available Quality</h3>
                      <p>We don't compress or re-encode your downloads. TokScript fetches the highest resolution the platform has, typically 1080p for TikTok and Reels.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedNoBranding hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Clean Files, No Branding</h3>
                      <p>Other downloaders give you videos with logos and usernames burned into the footage. TokScript downloads the original file before watermarks are applied.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}>
                      <AnimatedMultiPlatform hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>TikTok, Reels, Shorts</h3>
                      <p>Download from all three major short-form platforms with identical quality. One tool, consistent results. Stop switching between different downloaders.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ts-faq-section">
          <div className="ts-container ts-container-narrow">
            <h2 className="ts-section-heading ts-text-center">Got questions?</h2>
            <div className="ts-faq-accordion">
              {faqItems.map((item, idx) => (
                <div key={idx} className={`ts-faq-item ${openFaq === idx ? "is-open" : ""}`}>
                  <div className="ts-faq-trigger" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    <h3 className="ts-faq-q">{item.q}</h3>
                    <div className="ts-faq-icon"><div className="ts-faq-icon-line-h" /><div className="ts-faq-icon-line-v" /></div>
                  </div>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="ts-faq-answer-container">
                        <div className="ts-faq-a">{item.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="ts-section ts-final-cta" style={{ background: '#020617' }}>
          <div className="ts-container ts-container-narrow">
            <div className="ts-cta-box">
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(236, 72, 153, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop Settling for Watermarked Garbage</h2>
              <p className="ts-cta-desc">
                Your swipe file deserves clean footage. Your client presentations deserve HD quality. Your reference library deserves actual thumbnails.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#ec4899', color: '#fff', border: 'none' }}>Download Your First Video Free →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
