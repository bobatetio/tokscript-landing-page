"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Languages,
  Globe2,
  RefreshCw,
  MessageSquare,
  ArrowRight,
  Repeat,
  CheckCircle2,
  ListVideo,
  PlaySquare,
  Smartphone,
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

// FAUX UIs Specific to Translations

const AnimatedLanguageSwitcher = ({ hovering }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 600)); // Click dropdown
      timers.push(setTimeout(() => setStep(2), 1200)); // Select Spanish
      timers.push(setTimeout(() => setStep(3), 1800)); // Translated
    } else {
      setStep(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ position: 'relative', width: '320px', background: '#0d0d0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
      {/* Top Bar: Language Select */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <Globe2 size={14} color="#818cf8" />
          <span style={{ fontSize: '12px', color: '#c7d2fe', fontWeight: '500' }}>
            {step < 2 ? "English (US)" : "Spanish (ES)"}
          </span>
          <motion.div animate={{ rotate: step === 1 ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L5 5L9 1" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2a2a2a' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2a2a2a' }}></div>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2a2a2a' }}></div>
        </div>
      </div>

      {/* Dropdown Menu Overlay */}
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            style={{ position: 'absolute', top: '56px', left: '16px', width: '140px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', zIndex: 10, boxShadow: '0 10px 25px rgba(0,0,0,0.5)', overflow: 'hidden' }}
          >
            <div style={{ padding: '8px 12px', fontSize: '12px', color: '#7a7a7a', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>English (US)</div>
            <div style={{ padding: '8px 12px', fontSize: '12px', color: '#fff', background: 'rgba(99, 102, 241, 0.2)' }}>Spanish (ES)</div>
            <div style={{ padding: '8px 12px', fontSize: '12px', color: '#7a7a7a' }}>French (FR)</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transcript Area */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10px', color: '#818cf8', marginBottom: '8px', fontWeight: 'bold' }}>00:00 - 00:05</div>
          <div style={{ fontSize: '12px', color: '#e6e6e6', lineHeight: 1.5, position: 'relative' }}>
            {step < 3 ? "This hook works every single time for my videos." : "Este gancho funciona todas las veces en mis videos."}
            {step === 2 && (
              <motion.div 
                initial={{ left: 0 }} 
                animate={{ left: '100%' }} 
                transition={{ duration: 0.6, ease: "linear" }}
                style={{ position: 'absolute', top: 0, bottom: 0, width: '2px', background: '#818cf8', boxShadow: '0 0 8px #818cf8' }} 
              />
            )}
          </div>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10px', color: '#818cf8', marginBottom: '8px', fontWeight: 'bold' }}>00:05 - 00:08</div>
          <div style={{ fontSize: '12px', color: '#e6e6e6', lineHeight: 1.5, position: 'relative' }}>
            {step < 3 ? "Watch carefully what I do next." : "Observa atentamente lo que hago a continuación."}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnimatedReTranslate = ({ hovering }) => {
  return (
    <div style={{ width: '280px', height: '180px', background: 'linear-gradient(180deg, #0d0d0d 0%, #020617 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ background: '#1a1a1a', padding: '4px', borderRadius: '4px' }}><MessageSquare size={10} color="#818cf8" /></div>
          <span style={{ fontSize: '10px', color: '#e6e6e6', fontWeight: '500' }}>Transcript Library</span>
        </div>
        <div style={{ fontSize: '9px', color: '#7a7a7a' }}>42 Items</div>
      </div>
      
      {/* List Item */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#fff', fontWeight: '600', marginBottom: '2px' }}>Viral Hook Format #4</div>
            <div style={{ fontSize: '9px', color: '#7a7a7a' }}>Added Oct 12 • 45s audio</div>
          </div>
          <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', color: '#7a7a7a' }}>EN</div>
        </div>
        
        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
             <div style={{ width: '16px', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
             <div style={{ width: '24px', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
          </div>
          <motion.div 
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: hovering ? 'rgba(99, 102, 241, 0.15)' : '#1a1a1a', border: hovering ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
          >
            <motion.div animate={{ rotate: hovering ? 180 : 0 }} transition={{ duration: 0.5 }}>
              <RefreshCw size={10} color={hovering ? "#818cf8" : "#7a7a7a"} />
            </motion.div>
            <span style={{ fontSize: '9px', color: hovering ? '#818cf8' : '#7a7a7a', fontWeight: '500' }}>Translate</span>
          </motion.div>
        </div>
        
        {/* Translation Overlay */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={hovering ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(30,27,75,0.95) 0%, rgba(13,13,13,0.95) 100%)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Languages size={14} color="#818cf8" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '10px', color: '#fff', fontWeight: '600' }}>Gancho Viral #4</span>
              <span style={{ fontSize: '8px', color: '#34d399' }}>Translated Successfully</span>
            </div>
          </div>
          <div style={{ background: 'rgba(99,102,241,0.2)', color: '#c7d2fe', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', border: '1px solid rgba(99,102,241,0.3)' }}>ES</div>
        </motion.div>
      </div>
    </div>
  );
};

const AnimatedCrossPlatform = ({ hovering }) => {
  return (
    <div style={{ width: '280px', height: '180px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Search Input Simulation */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Globe2 size={12} color="#7a7a7a" />
        <span style={{ fontSize: '10px', color: '#7a7a7a', fontFamily: 'monospace' }}>Paste TikTok, IG Reel, or YT Link...</span>
      </div>
      
      {/* Platform grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', flex: 1 }}>
        {[
          { icon: <Smartphone size={12} color="#ec4899" />, name: 'TikTok', count: '1.2M views', bg: 'rgba(236,72,153,0.1)' },
          { icon: <PlaySquare size={12} color="#ef4444" />, name: 'YT Shorts', count: '450K views', bg: 'rgba(239,68,68,0.1)' },
          { icon: <ListVideo size={12} color="#a855f7" />, name: 'IG Reels', count: '890K views', bg: 'rgba(168,85,247,0.1)' },
          { icon: <CheckCircle2 size={12} color="#34d399" />, name: 'Auto-Detect', count: 'Native Support', bg: 'rgba(52,211,153,0.1)' }
        ].map((item, i) => (
          <div key={i} style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '6px', padding: '10px', position: 'relative', overflow: 'hidden' }}>
            {hovering && <motion.div initial={{ left: '-100%' }} animate={{ left: '100%' }} transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', top: 0, bottom: 0, width: '20px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', transform: 'skewX(-20deg)' }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <div style={{ padding: '4px', background: item.bg, borderRadius: '4px' }}>{item.icon}</div>
              <span style={{ fontSize: '10px', color: '#e6e6e6', fontWeight: '500' }}>{item.name}</span>
            </div>
            <div style={{ fontSize: '8px', color: '#7a7a7a' }}>{item.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedClientNative = ({ hovering }) => {
  return (
    <div style={{ width: '280px', height: '180px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', gap: '16px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      {/* Sidebar */}
      <div style={{ width: '80px', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '12px' }}>
        <div style={{ fontSize: '9px', color: '#7a7a7a', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Export As</div>
        <div style={{ padding: '6px', background: '#1a1a1a', border: '1px solid rgba(99,102,241,0.4)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '4px', height: '4px', background: '#818cf8', borderRadius: '50%' }} />
          <span style={{ fontSize: '9px', color: '#c7d2fe' }}>.TXT</span>
        </div>
        <div style={{ padding: '6px', background: 'transparent', border: '1px solid transparent', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '4px', height: '4px', background: '#2a2a2a', borderRadius: '50%' }} />
          <span style={{ fontSize: '9px', color: '#7a7a7a' }}>.PDF</span>
        </div>
        <div style={{ padding: '6px', background: 'transparent', border: '1px solid transparent', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '4px', height: '4px', background: '#2a2a2a', borderRadius: '50%' }} />
          <span style={{ fontSize: '9px', color: '#7a7a7a' }}>.DOCX</span>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: '600' }}>Preview</span>
          <div style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', padding: '2px 6px', borderRadius: '10px', fontSize: '8px', border: '1px solid rgba(52,211,153,0.2)' }}>Client Ready</div>
        </div>
        
        {/* Document Simulation */}
        <div style={{ background: '#1a1a1a', borderRadius: '6px', padding: '12px', flex: 1, border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
            <div style={{ width: '30px', fontSize: '8px', color: '#818cf8', fontFamily: 'monospace' }}>00:00</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '100%', height: '3px', background: '#e6e6e6', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#e6e6e6', borderRadius: '2px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: '30px', fontSize: '8px', color: '#818cf8', fontFamily: 'monospace' }}>00:15</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ width: '90%', height: '3px', background: '#e6e6e6', borderRadius: '2px' }} />
              <div style={{ width: '40%', height: '3px', background: '#e6e6e6', borderRadius: '2px' }} />
            </div>
          </div>
          
          <motion.div 
            initial={{ bottom: -20, opacity: 0 }}
            animate={hovering ? { bottom: 8, opacity: 1 } : { bottom: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', left: '12px', right: '12px', background: '#6366f1', color: '#fff', padding: '6px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', fontSize: '9px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(99,102,241,0.3)' }}
          >
            <CheckCircle2 size={10} /> Copy to Clipboard
          </motion.div>
        </div>
      </div>
    </div>
  );
};


export default function TranslationsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "Can I translate transcripts I extracted months ago?", a: "Yes. Any transcript saved in your TokScript library can be re-translated with one click. You don't have to scan the video all over again; just select your target language and the engine processes the translation instantly." },
    { q: "Does the translation work for TikTok, Instagram, and YouTube?", a: "Absolutely. No matter where the video originated—TikTok, Instagram Reels, or YouTube Shorts—our platform perfectly processes the transcript into any supported native language." },
    { q: "Will the translated transcript maintain the timestamps?", a: "Yes, if you choose to export with timestamps, the translated text will perfectly map to the original pacing of the video, making it seamless for dubbing or native subtitling." },
    { q: "How many languages are supported?", a: "We support over 50 of the most widely spoken languages globally, ensuring that you can reach your native clients and customers wherever they are." },
    { q: "Do I need to leave the platform to translate?", a: "No. Everything happens natively within the TokScript dashboard. Say goodbye to copying text, pasting into external translators, and losing your formatting." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#6366f1' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge" style={{ borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.1)' }}>
                  <Languages size={14} color="#818cf8" />
                  <span style={{ color: '#c7d2fe' }}>TRANSLATE TRANSCRIPTS</span>
                </div>
                <h1 className="ts-hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Translate Any Video Instantly.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Turn TikToks, Reels, and Shorts into the language your clients speak. No manual copying and pasting.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#6366f1', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)' }}>
                    Start Translating Videos <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(99, 102, 241, 0.2)' }}>
                  <AnimatedLanguageSwitcher hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Don't lose clients over language barriers.</h2>
              <p className="ts-cv-subtitle">
                You pulled a great video, but your client speaks Spanish. Instead of pasting text into Google Translate and ruining the format, just click one button inside TokScript and get a perfect translation.
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
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>📄 Copy English text</div>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>🌐 Open external translator app</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>⚠️ Formatting and timestamps lost</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>The Copy-Paste Nightmare</h3>
                    <p>Jumping between tabs, pasting blocks of text into generic translation tools, manually fixing broken paragraphs, and completely losing your timestamps.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedLanguageSwitcher hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#818cf8' }}>TokScript Native</div>
                        <h3>1-Click Translations</h3>
                        <p>Keep your workflow centralized. Select your target language directly within the platform and watch the transcript instantly transform while retaining its exact structure.</p>
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
            <p className="ts-section-subheading ts-text-center">Convert content into the language you actually need in three simple steps.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #6366f1, #4f46e5)' }}></div></div>

              {[
                { title: "Pick a Video", desc: "Paste a new link or open a transcript you already saved." },
                { title: "Choose a Language", desc: "Pick from over 50 languages in the dropdown." },
                { title: "Get the Translation", desc: "Keep the exact formatting and timestamps. Ready to share." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#818cf8', background: '#312e81', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(99,102,241,0.4)' } : {}}>{i + 1}</div>
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
          <div className="ts-bg-aurora" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)' }}></div>
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">Stop relying on external tools.</h2>
            <p className="ts-section-subheading ts-text-center">Manage all your translations inside TokScript.</p>
            
            <div className="ts-bento-grid-3" style={{ marginTop: '48px' }}>
              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.15) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <AnimatedReTranslate hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#818cf8' }}>Feature</div>
                      <h3>1-Click Re-Translation</h3>
                      <p>Translate transcripts you already saved without wasting credits or re-scanning the video. Just click and translate.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedCrossPlatform hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#818cf8' }}>Feature</div>
                      <h3>Works on All Platforms</h3>
                      <p>Fully supports extracting and translating audio directly from TikTok, Instagram Reels, and YouTube Shorts.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedClientNative hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#818cf8' }}>Feature</div>
                      <h3>Client-Ready Texts</h3>
                      <p>Keep the timestamps and formatting exactly how it was, so you can send it straight to your team or clients without cleaning it up.</p>
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
            <h2 className="ts-section-heading ts-text-center">Got translation questions?</h2>
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
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop letting language slow you down.</h2>
              <p className="ts-cta-desc">
                Translate any video directly inside your TokScript library.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#6366f1', color: '#fff', border: 'none' }}>Start Translating Videos →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
