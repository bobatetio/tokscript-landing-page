"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  UploadCloud,
  Layers,
  ShieldCheck,
  Mail,
  Database,
  FileText,
  Zap,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Clock,
  Check,
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

const AnimatedBulkProcessing = ({ hovering }) => {
  const [items, setItems] = useState([
    { status: 'pending' }, { status: 'pending' }, { status: 'pending' }, { status: 'pending' }, { status: 'pending' }
  ]);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setItems(items.map(i => ({ status: 'pending' })));
      items.forEach((_, index) => {
        timers.push(setTimeout(() => {
          setItems(prev => {
            const next = [...prev];
            next[index].status = 'processing';
            return next;
          });
        }, index * 200 + 200));
        
        timers.push(setTimeout(() => {
          setItems(prev => {
            const next = [...prev];
            next[index].status = 'done';
            return next;
          });
        }, index * 200 + 600));
      });
    } else {
      setItems(items.map(i => ({ status: 'done' })));
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ position: 'relative', width: '300px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#7a7a7a', marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <span>BATCH IMPORT</span>
        <span style={{ color: '#38bdf8' }}>50 URLs Detected</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: item.status === 'done' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.03)', borderRadius: '6px', border: '1px solid', borderColor: item.status === 'done' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255,255,255,0.05)', transition: 'all 0.3s' }}>
            <div style={{ fontSize: '11px', color: '#d4d4d4', fontFamily: 'monospace' }}>tiktok.com/@user/vid{i}</div>
            <div>
              {item.status === 'pending' && <span style={{ color: '#64748b', fontSize: '10px' }}>Waiting...</span>}
              {item.status === 'processing' && <span style={{ color: '#eab308', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{ width: '8px', height: '8px', border: '2px solid #eab308', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Processing</span>}
              {item.status === 'done' && <Check size={14} color="#4ade80" />}
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 100% { transform: rotate(360deg); } }`}} />
    </div>
  );
};

const AnimatedBatchAudit = ({ hovering }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (hovering) {
      setProgress(0);
      let current = 0;
      interval = setInterval(() => {
        current += 5;
        if (current > 100) current = 100;
        setProgress(current);
      }, 40);
    } else {
      setProgress(100);
    }
    return () => clearInterval(interval);
  }, [hovering]);

  return (
    <div style={{ width: '100%', maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ padding: '12px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#7a7a7a', display: 'flex', justifyContent: 'space-between' }}>
          <span>1. Paste URL list</span>
          <span style={{ color: '#38bdf8' }}><Check size={14} /></span>
        </div>
        <div style={{ padding: '12px', background: '#1a1a1a', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '12px', color: '#7a7a7a', display: 'flex', justifyContent: 'space-between' }}>
          <span>2. Click Import</span>
          <span style={{ color: '#38bdf8' }}><Check size={14} /></span>
        </div>
      </div>
      
      <div style={{ padding: '16px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 2, fontSize: '14px', fontWeight: 'bold', color: '#fff', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span>TokScript Processing</span>
          <span style={{ color: '#7dd3fc' }}>{progress}%</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(0,0,0,0.3)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: '#38bdf8', borderRadius: '3px', boxShadow: '0 0 10px #38bdf8' }} />
        </div>
      </div>
    </div>
  );
};

const AnimatedErrorHandling = ({ hovering }) => {
  return (
    <div style={{ width: '260px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1a1a1a', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '10px', color: '#7a7a7a', fontFamily: 'monospace' }}>vid_{i}.mp4</div>
          <div style={{ flex: 1, height: '4px', background: '#2a2a2a', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={hovering ? { width: i === 1 ? '40%' : '100%' } : { width: '0%' }}
              transition={{ duration: i === 1 ? 0.5 : 1.5, ease: 'linear', delay: i * 0.2 }}
              style={{ height: '100%', background: i === 1 ? '#ef4444' : '#38bdf8' }}
            />
          </div>
          {hovering && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i === 1 ? 0.7 : 1.5 + i * 0.2 }}>
              {i === 1 ? <span style={{ color: '#ef4444', fontSize: '10px', fontWeight: 'bold' }}>FAIL</span> : <Check size={12} color="#38bdf8" />}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const AnimatedMultiPlatformBatch = ({ hovering }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '120px', flexWrap: 'wrap' }}>
      {[
        { color: '#000', delay: 0 },
        { color: 'linear-gradient(45deg, #f09433, #dc2743)', delay: 0.1 },
        { color: '#ff0000', delay: 0.2 },
        { color: '#000', delay: 0.3 },
      ].map((bg, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={hovering ? { scale: [0.8, 1.1, 1], opacity: 1 } : { scale: 0.8, opacity: 0.5 }}
          transition={{ duration: 0.5, delay: bg.delay }}
          style={{ width: '40px', height: '40px', background: bg.color, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ width: '16px', height: '16px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
        </motion.div>
      ))}
    </div>
  );
};

const AnimatedEmailNotify = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '140px', height: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', height: '6px', background: '#1a1a1a', borderRadius: '3px', overflow: 'hidden', marginBottom: '20px' }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={hovering ? { width: '100%' } : { width: '0%' }}
          transition={{ duration: 1 }}
          style={{ height: '100%', background: '#818cf8' }}
        />
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={hovering ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 1, type: 'spring' }}
        style={{ position: 'absolute', top: '50px', background: '#0d0d0d', border: '1px solid #818cf8', borderRadius: '8px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 20px rgba(129, 140, 248, 0.3)' }}
      >
        <Mail size={16} color="#818cf8" />
        <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff' }}>Batch Ready</span>
      </motion.div>
    </div>
  );
};

const AnimatedTrendHunting = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '140px', height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
      {[20, 30, 25, 45, 60, 80].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: '10px', background: '#1a1a1a' }}
          animate={hovering ? { height: `${h}px`, background: i > 3 ? '#2dd4bf' : '#2a2a2a' } : { height: '10px', background: '#1a1a1a' }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          style={{ flex: 1, borderRadius: '4px 4px 0 0' }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={hovering ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{ position: 'absolute', top: '0', right: '0', background: 'rgba(45, 212, 191, 0.2)', color: '#2dd4bf', padding: '2px 6px', borderRadius: '4px', fontSize: '8px', fontWeight: 'bold' }}
      >
        TRENDING
      </motion.div>
    </div>
  );
};

const AnimatedAgencyWorkflow = ({ hovering }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '140px' }}>
      {[
        { name: 'Client A', color: '#f472b6' },
        { name: 'Client B', color: '#38bdf8' },
        { name: 'Client C', color: '#4ade80' }
      ].map((client, i) => (
        <div key={i} style={{ background: '#1a1a1a', borderRadius: '6px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '9px', color: '#7a7a7a', marginBottom: '4px' }}>{client.name}</div>
          <div style={{ width: '100%', height: '4px', background: '#0d0d0d', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={hovering ? { width: '100%' } : { width: '0%' }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
              style={{ height: '100%', background: client.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


export default function BulkImportPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "How many videos can I process at once?", a: "With a Pro plan, you can batch up to 500 URLs at a single time. We utilize parallel processing so large batches complete rapidly." },
    { q: "What formats do you support for import?", a: "You can simply copy and paste a list of URLs from any spreadsheet, text file, or database. As long as there's one URL per line, we'll detect and process it." },
    { q: "What happens if a link is broken or private?", a: "Our system gracefully handles errors. If a video is deleted or private, it will be marked as 'Failed' in your batch report, but the rest of the batch will continue processing normally." },
    { q: "Do I get a single export file?", a: "Yes. Once a batch completes, you can download a master CSV file containing every transcript, title, view count, and publish date across all the URLs you provided." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#0ea5e9' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Database size={14} className="text-sky-400" />
                  <span>BULK EXTRACTION</span>
                </div>
                <h1 className="ts-hero-title">
                  Import 100 Transcripts<br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #bae6fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    While You Grab Coffee.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Paste a list of URLs. Click process. Walk away. TokScript extracts every transcript in the background and notifies you when your library is ready.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#0ea5e9', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(14, 165, 233, 0.4)' }}>
                    Start Batch <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(15, 23, 42, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(14, 165, 233, 0.2)' }}>
                  <AnimatedBulkProcessing hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Don't do robot work.</h2>
              <p className="ts-cv-subtitle">
                If you're paying a VA to copy and paste links for hours, you're wasting money. If you're doing it yourself, you're wasting time. Software should handle the extraction; you should handle the strategy.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '300px', padding: '24px' }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>The Manual Slog (50 URLs)</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#7a7a7a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Video 1: Copy, paste, save, rename</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Video 2: Copy, paste, save, rename</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fca5a5' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Video 3: Error. Reload. Copy, paste.</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.5 }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}/> Video 50... Time Cost: ~2 Hours</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>The Assembly Line</h3>
                    <p>Processing 100 videos manually takes hours. It's error-prone, boring, and completely unscalable for any serious agency or research team.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedBatchAudit hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker">TokScript Bulk Engine</div>
                        <h3>Parallel Extraction</h3>
                        <p>We take your list and run it through multiple extraction servers at once. A batch of 50 videos takes about 2 minutes. Go get a coffee.</p>
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
            <h2 className="ts-section-heading ts-text-center">How to Bulk Import</h2>
            <p className="ts-section-subheading ts-text-center">Drop the links in. Get a structured database out. Three steps.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow"></div></div>

              {[
                { title: "Compile Your Links", desc: "Gather all the TikTok or Instagram Reels URLs you want to analyze. Drop them into a simple text file or copy the column directly from Google Sheets." },
                { title: "Paste and Run", desc: "Open the TokScript dashboard, navigate to Bulk Import, and paste your list. The system validates the links immediately and starts extraction." },
                { title: "Download Master CSV", desc: "Once finished, you get a single, unified CSV file. Every video's transcript, engagement stats, and metadata lined up in columns and ready to work with." }
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
            <h2 className="ts-section-heading ts-text-center">Built for Scale</h2>
            <p className="ts-section-subheading ts-text-center">The kind of features that matter when you're processing hundreds of videos at a time, not one.</p>
            
            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ background: 'radial-gradient(ellipse at center, rgba(14, 165, 233, 0.15) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <AnimatedErrorHandling hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#38bdf8' }}>Graceful Failure</div>
                      <h3>Never loses progress.</h3>
                      <p>In a batch of 500, a few videos might be deleted or private. Standard tools crash and lose your progress. TokScript marks the bad link as failed, logs the error, and keeps processing the other 499.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedMultiPlatformBatch hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>TikTok, Reels, Shorts</h3>
                      <p>Your research list probably includes videos from multiple platforms. Paste TikTok, Instagram, and YouTube URLs together. TokScript detects each automatically.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedEmailNotify hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Email Notifications</h3>
                      <p>If you're processing hundreds of videos, we'll shoot you a quick email the second the master file is ready for download.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedTrendHunting hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Trend Hunting</h3>
                      <p>Input URLs from the top 100 trending sounds this week, export the CSV, and find the exact script formats that are working right now.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedAgencyWorkflow hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Agency Workflows</h3>
                      <p>Built for onboarding multiple clients at once. Run a batch extraction for every competitor in their niche before the kickoff call.</p>
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
        <section className="ts-section ts-final-cta" style={{ background: '#020617' }}>
          <div className="ts-container ts-container-narrow">
            <div className="ts-cta-box">
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(14, 165, 233, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Ready to scale up?</h2>
              <p className="ts-cta-desc">
                Stop pasting links one by one. Process your entire backlog today.
              </p>
              <a href="/" className="ts-btn-primary">Start Bulk Import</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
