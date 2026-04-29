"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Layers,
  Database,
  Check,
  FolderOpen,
  ArrowRight,
  UserCheck,
  PlaySquare,
  Calendar,
  FileSpreadsheet,
  Search,
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

const InViewWrapper = ({ className, children, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={className} style={style}>
      {typeof children === 'function' ? children(isInView) : children}
    </div>
  );
};

// FAUX UIs

const AnimatedCollectionVisual = ({ hovering }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers = [ setTimeout(() => setStep(1), 300), setTimeout(() => setStep(2), 600), setTimeout(() => setStep(3), 900) ];
    } else { setStep(3); }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ position: 'relative', width: '280px', height: '200px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', opacity: step >= 1 ? 1 : 0.5, transition: 'opacity 0.4s' }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: step >= 2 ? 1 : 0.8, opacity: step >= 2 ? 1 : 0 }} transition={{ delay: i * 0.05 }}
            style={{ width: '100%', aspectRatio: '9/16', background: '#1e293b', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} 
          >
            {step >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.05 }} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(transparent, rgba(168, 85, 247, 0.4))' }} />}
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {step >= 3 && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', color: '#d8b4fe', fontSize: '13px', fontWeight: 'bold', backdropFilter: 'blur(8px)', whiteSpace: 'nowrap', boxShadow: '0 10px 20px rgba(0,0,0,0.5)' }}
          >
            <FolderOpen size={16} /> Extracted @alex_hormozi
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedFolderTree = ({ hovering }) => {
  const [nodes, setNodes] = useState(0);
  useEffect(() => {
    if (hovering) {
      setNodes(0);
      const int = setInterval(() => { setNodes(prev => prev < 4 ? prev + 1 : 4); }, 200);
      return () => clearInterval(int);
    } else { setNodes(4); }
  }, [hovering]);

  return (
    <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#0f172a', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ fontSize: '12px', color: '#d8b4fe', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Database size={14} /> /creator_archives/
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: '6px' }}>
        {['Q1_viral_hits.csv', 'hook_patterns_2023.json', 'all_transcripts.txt', 'cover_thumbnails/'].map((file, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: nodes >= i + 1 ? 1 : 0, x: nodes >= i + 1 ? 0 : -10 }} style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '12px', height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            {file}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AnimatedProfileCard = ({ hovering }) => {
  return (
    <div style={{ width: '100%', maxWidth: '260px', background: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #3b82f6)' }}></div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff' }}>@creator_name</div>
          <div style={{ fontSize: '11px', color: '#94a3b8' }}>1.2M Followers</div>
        </div>
      </div>
      <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
        <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Collection Stats</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0' }}><span>Videos Mapped</span> <strong>342</strong></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#e2e8f0', marginTop: '4px' }}><span>Total Words</span> <strong>47,000</strong></div>
      </div>
      <div style={{ width: '100%', padding: '8px', background: 'rgba(168, 85, 247, 0.1)', color: '#d8b4fe', textAlign: 'center', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', border: '1px solid rgba(168, 85, 247, 0.2)' }}>Profile Synced</div>
    </div>
  );
};

const AnimatedHistorySearch = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '120px', height: 'auto', minHeight: '120px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', overflow: 'hidden' }}>
      <div style={{ background: '#1e293b', borderRadius: '6px', height: '20px', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '6px', marginBottom: '8px' }}>
        <Search size={10} color="#60a5fa" />
        <div style={{ width: '40px', height: '4px', background: '#334155', borderRadius: '2px' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1, scale: 1 }}
            animate={hovering ? { opacity: i === 4 ? 1 : 0.2, scale: i === 4 ? 1.1 : 0.9, background: i === 4 ? '#60a5fa' : '#1e293b' } : { opacity: 1, scale: 1, background: '#1e293b' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ width: '100%', aspectRatio: '1/1', background: '#1e293b', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}
          />
        ))}
      </div>
    </div>
  );
};

const AnimatedDateFilter = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '120px', height: 'auto', minHeight: '120px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <Calendar size={12} color="#a855f7" />
        <div style={{ fontSize: '8px', color: '#94a3b8' }}>NOV 2023</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', flex: 1 }}>
        {Array.from({ length: 28 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ background: '#1e293b' }}
            animate={hovering ? { background: i >= 10 && i <= 18 ? 'rgba(168, 85, 247, 0.4)' : '#1e293b', boxShadow: i >= 10 && i <= 18 ? '0 0 5px rgba(168, 85, 247, 0.5)' : 'none' } : { background: '#1e293b' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ width: '100%', aspectRatio: '1/1', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)' }}
          />
        ))}
      </div>
    </div>
  );
};

const AnimatedPlaylistSupport = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '140px', height: 'auto', minHeight: '120px', background: '#0f172a', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
        <PlaySquare size={12} color="#f43f5e" />
        <div style={{ fontSize: '9px', color: '#f43f5e', fontWeight: 'bold' }}>HOW TO GO VIRAL SERIES</div>
      </div>
      {[1, 2, 3].map((part, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e293b', padding: '6px', borderRadius: '6px' }}>
          <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '8px', color: '#fff' }}>Pt {part}</div>
          <div style={{ flex: 1, height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={hovering ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1, delay: i * 0.4 }}
              style={{ height: '100%', background: '#f43f5e' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedExportReady = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '160px', height: 'auto', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={hovering ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ position: 'absolute', width: '100px', height: '100px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '12px', fontFamily: 'monospace', fontSize: '8px', color: '#60a5fa', display: 'flex', flexDirection: 'column', gap: '4px' }}
      >
        <div>{`{`}</div>
        <div style={{ paddingLeft: '8px' }}>"id": "123",</div>
        <div style={{ paddingLeft: '8px' }}>"views": 4000,</div>
        <div style={{ paddingLeft: '8px' }}>"text": "..."</div>
        <div>{`}`}</div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={hovering ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
        style={{ position: 'absolute', width: '140px', height: '80px', background: '#0f172a', border: '1px solid #22c55e', borderRadius: '8px', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 10px 20px rgba(34,197,94,0.2)' }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '4px', borderBottom: '1px solid #334155', paddingBottom: '4px', marginBottom: '4px' }}>
          <div style={{ width: '100%', height: '4px', background: '#22c55e', borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '4px', background: '#22c55e', borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '4px', background: '#22c55e', borderRadius: '2px' }} />
        </div>
        {[1, 2, 3].map((r) => (
          <div key={r} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '4px' }}>
            <div style={{ width: '80%', height: '4px', background: '#334155', borderRadius: '2px' }} />
            <div style={{ width: '60%', height: '4px', background: '#334155', borderRadius: '2px' }} />
            <div style={{ width: '90%', height: '4px', background: '#334155', borderRadius: '2px' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function PageData() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "What's the difference between Collection and Bulk Import?", a: "Bulk Import requires you to paste a list of specific video URLs. Collection Import is smarter: you just give it ONE link to a creator's profile, and it grabs every video from that profile automatically." },
    { q: "Can I import private profiles?", a: "No. We respect privacy boundaries. TokScript only extracts data from publicly available videos and profiles." },
    { q: "Is there a limit on how big a collection can be?", a: "On Pro plans, there's effectively no limit. We regularly handle profile imports containing 800+ videos. It just takes a few minutes longer to process." },
    { q: "Does this work for Instagram or YouTube?", a: "This specific 'One-Link Collection' feature is currently optimized for TikTok profiles and playlists. For IG/YouTube, use the Bulk Import tool with a list of URLs." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#a855f7' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Layers size={14} className="text-purple-400" />
                  <span>COLLECTION IMPORT</span>
                </div>
                <h1 className="ts-hero-title">
                  One Link. Every Video.
                  <br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #d8b4fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Zero Copy-Paste.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Paste a TikTok collection link or creator profile URL. TokScript imports every video automatically: transcripts, metadata, cover images. Study an entire content catalog in minutes, not hours.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/pricing" style={{ background: '#a855f7', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)' }}>
                    Try it now <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(168, 85, 247, 0.2)' }}>
                  <AnimatedCollectionVisual hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">One video is a fluke.<br/>A profile is a formula.</h2>
              <p className="ts-cv-subtitle">
                If you want to understand how top creators operate, you can't just study their viral hits. You need to see their dud videos, their format pivots, and their daily reps.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '300px', padding: '24px' }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>The Manual Slog</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#94a3b8' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Open profile in browser</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Right click video 1, Copy Link</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Paste into spreadsheet</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Repeat 150 times...</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Tools</div>
                    <h3>Data Entry Hell</h3>
                    <p>Building a swipe file of a specific creator used to mean hours of mindless copying and pasting. It's why most people give up after saving 5 videos.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedFolderTree hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker">TokScript Collection Import</div>
                        <h3>Instant Structuring</h3>
                        <p>Feed us the profile URL. We do the crawling, the downloading, and the transcribing. You get a neatly organized folder of their entire history.</p>
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
            <h2 className="ts-section-heading ts-text-center">Zero to Archive in 3 Steps</h2>
            <p className="ts-section-subheading ts-text-center">No complex configurations. Just paste a link and let the engine work.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow"></div></div>

              {[
                { title: "Drop the Link", desc: "Grab the URL of any public TikTok profile or curated playlist. Just the main link, no need to open individual videos. We handle the routing automatically." },
                { title: "We Map the Grid", desc: "TokScript's engine scans the profile, counts the videos, and begins extracting the transcripts and metadata in parallel. 100 videos take about 3 minutes." },
                { title: "Analyze the Data", desc: "Download the entire batch as a single CSV, or browse the transcripts in your cloud dashboard. Find out when they started using that new hook format." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node">{i + 1}</div>
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
            <h2 className="ts-section-heading ts-text-center">Built for Deep Dives</h2>
            <p className="ts-section-subheading ts-text-center">Stop scratching the surface. Get the full picture of any creator's strategy.</p>
            
            <div className="ts-bento-grid-3">
              <div className="ts-bento-card-visual ts-span-2-desktop">
                <div className="ts-card-graphic">
                  <AnimatedProfileCard hovering={true} />
                </div>
                <div className="ts-card-text-content">
                  <div className="ts-kicker">Client Onboarding</div>
                  <h3>Audit a brand in seconds.</h3>
                  <p>Taking on a new client? Don't spend hours watching their old content. Import their profile, export to CSV, and walk into the kickoff meeting knowing which topics drove 80% of their views last year.</p>
                </div>
              </div>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedHistorySearch hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Search Their History</h3>
                      <p>Once imported, you can Ctrl+F through a creator's entire history to find when they talked about a specific topic.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedDateFilter hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Filter by Date</h3>
                      <p>Only care about their recent pivot? Set a date range and extract only the videos from the last 90 days.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>
              
              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedPlaylistSupport hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Playlist Support</h3>
                      <p>Creators often group multi-part series into Playlists. You can import just a specific playlist rather than the whole profile.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedExportReady hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Export Ready</h3>
                      <p>Get the raw transcripts, view counts, and publish dates neatly organized in a CSV, ready for your own pivot tables.</p>
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
            <h2 className="ts-section-heading ts-text-center">Questions? We got you.</h2>
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
        <section className="ts-section ts-final-cta" style={{ background: '#09090b' }}>
          <div className="ts-container ts-container-narrow">
            <div className="ts-cta-box">
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(168, 85, 247, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Ready to dig deep?</h2>
              <p className="ts-cta-desc">
                Stop guessing what works. Download the data and know for sure.
              </p>
              <a href="/pricing" className="ts-btn-primary">Get Access Now</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
