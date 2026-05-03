"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  FileText,
  Link as LinkIcon,
  Zap,
  Copy,
  CheckCircle2,
  Clock,
  ArrowRight,
  PlaySquare,
  MessageSquare
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

// FAUX UIs Specific to Transcript Generator

const AnimatedUrlImport = ({ hovering }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 500)); // Paste URL
      timers.push(setTimeout(() => setStep(2), 1200)); // Processing / Thumbnail appears
    } else {
      setStep(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ width: '280px', height: '180px', background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Input Bar */}
      <div style={{ background: '#1a1a1a', border: step >= 1 ? '1px solid #00B8B2' : '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s' }}>
        <LinkIcon size={14} color={step >= 1 ? "#00B8B2" : "#7a7a7a"} />
        <span style={{ fontSize: '11px', color: step >= 1 ? '#e6e6e6' : '#7a7a7a', fontFamily: 'monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {step >= 1 ? "tiktok.com/@creator/video/1234..." : "Paste video URL here..."}
        </span>
      </div>

      {/* Video Preview / Loading Area */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AnimatePresence mode="wait">
          {step < 2 ? (
            <motion.div
              key="empty"
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PlaySquare size={16} color="#2a2a2a" />
              </div>
              <span style={{ fontSize: '9px', color: '#3a3a3a' }}>Waiting for link...</span>
            </motion.div>
          ) : (
            <motion.div
              key="loaded"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ width: '100%', height: '100%', background: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(0, 184, 178, 0.3)', display: 'flex', alignItems: 'center', padding: '12px', gap: '12px' }}
            >
              <div style={{ width: '48px', height: '72px', background: 'linear-gradient(135deg, #00B8B2 0%, #00b8b2 100%)', borderRadius: '6px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlaySquare size={16} color="#fff" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <div style={{ width: '80%', height: '6px', background: '#e6e6e6', borderRadius: '3px' }} />
                <div style={{ width: '60%', height: '6px', background: '#7a7a7a', borderRadius: '3px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <CheckCircle2 size={10} color="#00B8B2" />
                  <span style={{ fontSize: '8px', color: '#00B8B2' }}>Ready to extract</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const AnimatedExtractionSpeed = ({ hovering }) => {
  return (
    <div style={{ width: '280px', height: '180px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color="#00B8B2" />
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>Extracting...</span>
        </div>
        <span style={{ fontSize: '10px', color: '#00B8B2', fontFamily: 'monospace' }}>1.2s</span>
      </div>

      {/* Waveform to Text Area */}
      <div style={{ flex: 1, background: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '12px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Animated Scanner Line */}
        <motion.div 
          initial={{ left: 0 }}
          animate={hovering ? { left: '100%' } : { left: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', background: '#00B8B2', boxShadow: '0 0 12px #00B8B2', zIndex: 10 }}
        />

        {/* Fake Waveform */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '24px', opacity: hovering ? 0.3 : 0.8, transition: 'opacity 0.3s' }}>
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              animate={hovering ? { height: ['4px', '20px', '4px'] } : { height: '8px' }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.05 }}
              style={{ width: '4px', background: '#7a7a7a', borderRadius: '2px' }}
            />
          ))}
        </div>

        {/* Emerging Text */}
        <div style={{ position: 'absolute', inset: '12px', display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center', opacity: hovering ? 1 : 0, transition: 'opacity 0.5s' }}>
          <div style={{ width: '90%', height: '4px', background: '#e6e6e6', borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '4px', background: '#e6e6e6', borderRadius: '2px' }} />
          <div style={{ width: '75%', height: '4px', background: '#e6e6e6', borderRadius: '2px' }} />
        </div>
      </div>
    </div>
  );
};

const AnimatedCopyPaste = ({ hovering }) => {
  return (
    <div style={{ width: '280px', height: '180px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', gap: '16px', flexDirection: 'column', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Transcript Block */}
      <div style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '12px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <MessageSquare size={12} color="#7a7a7a" />
          <span style={{ fontSize: '10px', color: '#7a7a7a', fontWeight: '500' }}>Final Transcript</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <div style={{ width: '100%', height: '4px', background: '#7a7a7a', borderRadius: '2px' }} />
          <div style={{ width: '85%', height: '4px', background: '#7a7a7a', borderRadius: '2px' }} />
          <div style={{ width: '95%', height: '4px', background: '#7a7a7a', borderRadius: '2px' }} />
          <div style={{ width: '60%', height: '4px', background: '#7a7a7a', borderRadius: '2px' }} />
        </div>

        {/* Hover Copy Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={hovering ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
          style={{ position: 'absolute', bottom: '12px', right: '12px', background: '#00B8B2', color: '#fff', padding: '6px 10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 184, 178, 0.4)' }}
        >
          <Copy size={12} />
          <span style={{ fontSize: '10px', fontWeight: 'bold' }}>Copy All</span>
        </motion.div>
      </div>

      {/* Notification Toast */}
      <div style={{ height: '24px', display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence>
          {hovering && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4 }}
              style={{ background: 'rgba(52, 211, 153, 0.1)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '4px 12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <CheckCircle2 size={10} color="#34d399" />
              <span style={{ fontSize: '9px', color: '#34d399' }}>Copied to clipboard</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function TranscriptGeneratorPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "Do I need to create an account to use the generator?", a: "You can try it out for free, but creating an account lets you save your transcripts directly to your cloud library." },
    { q: "What video platforms do you support?", a: "We support TikTok, Instagram Reels, and YouTube Shorts. Just paste the URL and we'll extract the text." },
    { q: "How fast is the extraction?", a: "Almost instant. Our engine extracts and processes the transcript in seconds, no matter how long the short-form video is." },
    { q: "Are the transcripts accurate?", a: "Extremely. We pull the exact captions/subtitles natively when available, ensuring word-for-word accuracy." },
    { q: "Can I get timestamps with my transcript?", a: "Yes. You have the option to view and copy your transcript with exact timestamps, making it easy to reference specific moments." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#00B8B2' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge" style={{ borderColor: 'rgba(0, 184, 178, 0.3)', background: 'rgba(0, 184, 178, 0.1)' }}>
                  <FileText size={14} color="#00B8B2" />
                  <span style={{ color: '#00b8b2' }}>TRANSCRIPT GENERATOR</span>
                </div>
                <h1 className="ts-hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #00b8b2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Video to Text in Seconds.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Stop pausing and typing. Paste a link and get the exact script from any TikTok, Reel, or Short instantly.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#00B8B2', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(0, 184, 178, 0.4)' }}>
                    Get Your Transcript <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(0, 184, 178, 0.2)' }}>
                  <AnimatedExtractionSpeed hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Don't waste time transcribing manually.</h2>
              <p className="ts-cv-subtitle">
                You found a viral video and want to study the hook, the body, and the CTA. But typing it out by hand takes forever. Copy a URL, paste it into TokScript, and the exact words are ready to use.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '280px', padding: '24px', opacity: 0.8 }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>The Manual Slog</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#7a7a7a' }}>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>⏯ Pause the video</div>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>⌨️ Type a sentence</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>⏪ Rewind because you missed it</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>The Pause and Type Nightmare</h3>
                    <p>Switching between your phone and your notes app, constantly rewinding, and taking 10 minutes to transcribe a 60-second video.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedExtractionSpeed hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#00B8B2' }}>TokScript</div>
                        <h3>Instant Extraction</h3>
                        <p>One click pulls the exact transcript out of the video immediately. Zero manual work. Absolute accuracy.</p>
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
            <h2 className="ts-section-heading ts-text-center">How It Works</h2>
            <p className="ts-section-subheading ts-text-center">Get your transcript in three simple steps.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #00B8B2, #00b8b2)' }}></div></div>

              {[
                { title: "Copy Link", desc: "Grab the URL from any TikTok, Instagram Reel, or YouTube Short." },
                { title: "Paste into TokScript", desc: "Drop the link into the generator bar and hit enter." },
                { title: "Get the Transcript", desc: "Copy the exact text instantly and use it for your content." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#00B8B2', background: '#083344', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(0, 184, 178,0.4)' } : {}}>{i + 1}</div>
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
          <div className="ts-bg-aurora" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0, 184, 178,0.15) 0%, transparent 70%)' }}></div>
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">Extract fast. Create faster.</h2>
            <p className="ts-section-subheading ts-text-center">Everything you need to turn inspiration into actual text.</p>
            
            <div className="ts-bento-grid-3" style={{ marginTop: '48px' }}>
              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', background: 'radial-gradient(ellipse at center, rgba(0, 184, 178, 0.15) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <AnimatedUrlImport hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#00B8B2' }}>Feature</div>
                      <h3>Simple Link Import</h3>
                      <p>Just copy the video link and paste it. No downloading files, no clunky uploads. We handle the extraction instantly from the URL.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedExtractionSpeed hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#00B8B2' }}>Feature</div>
                      <h3>Lightning Fast</h3>
                      <p>Don't wait around. Our engine pulls the exact text out of the video in seconds, saving you hours of manual transcription work.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedCopyPaste hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#00B8B2' }}>Feature</div>
                      <h3>1-Click Copy</h3>
                      <p>Hit the copy button and paste the perfectly formatted transcript directly into your notes, scripts, or content planners.</p>
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
        <section className="ts-section ts-final-cta" style={{ background: '#0a0a0a' }}>
          <div className="ts-container ts-container-narrow">
            <div className="ts-cta-box">
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(0, 184, 178, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop typing manually.</h2>
              <p className="ts-cta-desc">
                Paste a link and get the exact transcript from any video instantly.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#00B8B2', color: '#fff', border: 'none' }}>Get Your First Transcript →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
