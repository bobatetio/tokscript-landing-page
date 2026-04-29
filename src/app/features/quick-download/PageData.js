"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Zap,
  MousePointerClick,
  Copy,
  Clock,
  Unlock,
  ArrowRight,
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

const AnimatedSpeedTest = ({ hovering }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 300));
      timers.push(setTimeout(() => setStep(2), 600));
      timers.push(setTimeout(() => setStep(3), 1000));
    } else {
      setStep(3);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ position: 'relative', width: '320px', background: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
      {/* Input */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', opacity: step >= 2 ? 0.5 : 1, transition: 'opacity 0.3s' }}>
        <div style={{ flex: 1, background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '10px 12px', fontSize: '12px', color: '#cbd5e1', display: 'flex', alignItems: 'center' }}>
          {step >= 1 ? 'https://tiktok.com/@user/vid' : <span style={{ color: '#64748b' }}>Paste URL</span>}
        </div>
        <div style={{ background: step >= 1 ? '#eab308' : '#334155', color: step >= 1 ? '#000' : '#fff', padding: '10px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', transition: 'all 0.3s' }}>
          Extract
        </div>
      </div>

      {/* Progress & Result */}
      <div style={{ position: 'relative', height: '120px' }}>
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#eab308', fontVariantNumeric: 'tabular-nums' }}>0.00s</div>
            <div style={{ width: '80%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', background: '#eab308' }}></div>
            </div>
          </motion.div>
        )}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', inset: 0, background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', color: '#fef08a', fontWeight: 'bold' }}>SUCCESS</span>
              <span style={{ fontSize: '10px', color: '#eab308', fontWeight: 'bold' }}>⚡ 3.1s</span>
            </div>
            <div style={{ fontSize: '11px', color: '#fff', lineHeight: 1.5 }}>
              "Here is the exact transcript you were looking for..."
            </div>
            {step >= 3 && (
              <div style={{ marginTop: 'auto', alignSelf: 'flex-end', background: '#eab308', color: '#000', padding: '6px 12px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>
                Copy Text
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

const AnimatedOneClickCopy = ({ hovering }) => {
  return (
    <div style={{ width: '200px', background: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '64px', height: '64px', background: hovering ? '#eab308' : '#1e293b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', transform: hovering ? 'scale(1.1)' : 'scale(1)', boxShadow: hovering ? '0 10px 20px rgba(234, 179, 8, 0.4)' : 'none' }}>
          <Copy size={32} color={hovering ? '#000' : '#64748b'} />
        </div>
        <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#22c55e', color: '#fff', padding: '4px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 'bold', opacity: hovering ? 1 : 0, transform: hovering ? 'scale(1)' : 'scale(0.8)', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.1s', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.4)' }}>
          COPIED!
        </div>
      </div>
    </div>
  );
};

const AnimatedNoAccount = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '140px', height: '120px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Login form */}
      <div style={{ width: '80px', height: '60px', background: '#1e293b', borderRadius: '6px', border: '1px dashed #334155', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px', opacity: hovering ? 0.3 : 1, transition: 'opacity 0.4s' }}>
        <div style={{ width: '40%', height: '4px', background: '#334155', borderRadius: '2px', alignSelf: 'center', marginBottom: '4px' }} />
        <div style={{ width: '100%', height: '10px', background: '#0f172a', borderRadius: '2px' }} />
        <div style={{ width: '100%', height: '10px', background: '#0f172a', borderRadius: '2px' }} />
        <div style={{ width: '100%', height: '12px', background: '#334155', borderRadius: '2px', marginTop: 'auto' }} />
      </div>
      
      {/* Glowing bypass line */}
      <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={hovering ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <svg width="140" height="120" viewBox="0 0 140 120">
          <motion.path 
            d="M 20 100 Q 70 100 70 60 T 120 20" 
            fill="none" 
            stroke="#eab308" 
            strokeWidth="3" 
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={hovering ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1 }}
          />
        </svg>
      </motion.div>
      
      {/* Unlock / Transcript appearance */}
      <motion.div
        initial={{ scale: 0, opacity: 0, x: 50, y: -40 }}
        animate={hovering ? { scale: 1, opacity: 1, x: 20, y: -20 } : { scale: 0, opacity: 0, x: 50, y: -40 }}
        transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
        style={{ position: 'absolute', right: '10px', top: '10px', background: '#eab308', borderRadius: '8px', padding: '6px', boxShadow: '0 4px 12px rgba(234, 179, 8, 0.4)' }}
      >
        <Unlock size={16} color="#000" />
      </motion.div>
    </div>
  );
};

const AnimatedEvaluate = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '140px', height: '100px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
      <motion.div 
        animate={hovering ? { filter: ['blur(4px)', 'blur(0px)', 'blur(0px)'] } : { filter: 'blur(4px)' }}
        transition={{ duration: 2, times: [0, 0.2, 1], repeat: Infinity, repeatDelay: 1 }}
        style={{ position: 'absolute', inset: 0, padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <div style={{ width: '100%', height: '8px', background: '#3b82f6', borderRadius: '4px' }} />
        <div style={{ width: '80%', height: '6px', background: '#94a3b8', borderRadius: '3px' }} />
        <div style={{ width: '90%', height: '6px', background: '#94a3b8', borderRadius: '3px' }} />
        <div style={{ width: '70%', height: '6px', background: '#94a3b8', borderRadius: '3px' }} />
      </motion.div>
      
      {/* Click indicator */}
      <motion.div
        initial={{ scale: 2, opacity: 0 }}
        animate={hovering ? { scale: [2, 1, 1], opacity: [0, 1, 0] } : { scale: 2, opacity: 0 }}
        transition={{ duration: 2, times: [0, 0.1, 0.3], repeat: Infinity, repeatDelay: 1 }}
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '20px', height: '20px', border: '2px solid #eab308', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.2)' }}
      />
    </div>
  );
};

export default function QuickDownloadPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "Do I really not need to sign up?", a: "Really. Your first transcript extraction works without any account. Paste a URL, get the transcript. If you want to save transcripts, do bulk imports, or access AI tools, you'll need a free account, but for a quick one-off extraction, no signup required." },
    { q: "How many free extractions do I get?", a: "Without an account, you get one free extraction to test quality. With a free account (just email, no credit card), you get up to 3 extractions per day. Paid plans unlock unlimited extractions." },
    { q: "What if the transcript doesn't extract correctly?", a: "Our AI handles most videos well, but heavy background music or unclear audio can reduce accuracy. If your first extraction doesn't meet expectations, try a video with clearer audio, or create a free account and test a few more." },
    { q: "Where does my transcript go after I copy it?", a: "Without an account, the transcript exists only on that page until you navigate away. If you want transcripts saved automatically to a searchable library, create a free account. Every extraction will save permanently." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#eab308' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Zap size={14} className="text-yellow-400" />
                  <span>QUICK EXTRACTION</span>
                </div>
                <h1 className="ts-hero-title">
                  Paste. Click.<br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fef08a 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Transcript.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  No signup. No waiting. No complexity. Drop a video URL, click one button, copy your transcript. Your first scan is free. See exactly what you get.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#eab308', color: '#000', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(234, 179, 8, 0.4)' }}>
                    Try It Free, No Signup <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(234, 179, 8, 0.2)' }}>
                  <AnimatedSpeedTest hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Skip the onboarding.</h2>
              <p className="ts-cv-subtitle">
                You just need the transcript. One video. Right now. But every tool wants something first. Create an account. Verify your email. Sometimes you just want to paste a URL and get the text. No relationship. No commitment.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '280px', padding: '24px', opacity: 0.8 }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>Other Tools</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>1. Create Account</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>2. Verify Email</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>3. Skip Onboarding</div>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>4. Paste URL</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>Friction Tax</h3>
                    <p>By the time you've jumped through their hoops, you've forgotten why you needed the transcript in the first place.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedSpeedTest hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#fef08a' }}>TokScript Quick Download</div>
                        <h3>Zero Resistance</h3>
                        <p>No account. No credit card. Just an input box and a promise: give us 3 seconds, we'll give you the text.</p>
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
            <h2 className="ts-section-heading ts-text-center">The Fastest Path to Your Transcript</h2>
            <p className="ts-section-subheading ts-text-center">No downloads required. Works entirely in your browser.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #eab308, #ca8a04)' }}></div></div>

              {[
                { title: "Paste Your URL", desc: "Copy the video link from TikTok, Instagram, or YouTube. Paste it into TokScript's input field. That's it, no formatting needed." },
                { title: "Click Extract", desc: "One button. One click. TokScript fetches the video, extracts the audio, converts speech to text. Average time: 3 seconds." },
                { title: "Copy Your Transcript", desc: "Transcript appears. Click the copy button. Text is on your clipboard. Paste it wherever you need it." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#eab308', background: '#713f12', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(234,179,8,0.4)' } : {}}>{i + 1}</div>
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
            <h2 className="ts-section-heading ts-text-center">Simple by Design</h2>
            <p className="ts-section-subheading ts-text-center">Get what you need and get out.</p>
            
            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ background: 'radial-gradient(ellipse at center, rgba(234, 179, 8, 0.15) 0%, transparent 70%)' }}>
                       <AnimatedSpeedTest hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#eab308' }}>3-Second Processing</div>
                      <h3>Faster Than Reading This Sentence</h3>
                      <p>Paste, click, done. TokScript's extraction typically completes in 3 seconds. No queues, no "processing your request," no checking back later. The transcript appears while you're still looking at the screen.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedNoAccount hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>No Account Required</h3>
                      <p>Your first transcript extraction requires zero commitment. No email, no password, no credit card. We earn your signup. We don't demand it.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedOneClickCopy hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>One-Click Copy</h3>
                      <p>No download buttons, no file formats to choose. Click copy, transcript is on your clipboard. Paste it anywhere. Your notes, your doc, your AI tool.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedEvaluate hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Evaluate Before You Buy</h3>
                      <p>You've heard about TokScript but don't want to create yet another account for a tool you might not use. Quick download lets you test the actual output quality before deciding.</p>
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
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(234, 179, 8, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Just Get the Transcript.</h2>
              <p className="ts-cta-desc">
                No account. No commitment. No friction. Paste a URL and see what TokScript can do.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#eab308', color: '#000', border: 'none' }}>Paste a URL and Try It →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
