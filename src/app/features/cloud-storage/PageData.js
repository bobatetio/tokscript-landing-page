"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Cloud,
  Search,
  FolderOpen,
  Smartphone,
  Tag,
  ArrowRight,
  Database,
  SearchCode,
  LayoutGrid,
  FileText,
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

const AnimatedLibrarySearch = ({ hovering }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 500));
      timers.push(setTimeout(() => setStep(2), 1000));
    } else {
      setStep(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ position: 'relative', width: '320px', background: '#0d0d0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
        <Search size={16} color="#7a7a7a" />
        <span style={{ fontSize: '13px', color: '#fff', fontFamily: 'monospace' }}>
          {step >= 1 ? 'hook' : <span style={{ opacity: 0.5 }}>Search 4,200 transcripts...</span>}
          {step >= 1 && <span style={{ display: 'inline-block', width: '2px', height: '14px', background: '#3b82f6', verticalAlign: 'middle', animation: 'blink 1s infinite' }}></span>}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', opacity: step >= 2 ? 1 : 0.4, transform: step >= 2 ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.3s ease' }}>
          <div style={{ fontSize: '10px', color: '#7a7a7a', marginBottom: '8px' }}>@creator_name • 2 days ago</div>
          <div style={{ fontSize: '11px', color: '#e6e6e6', lineHeight: 1.5 }}>
            "This is the best <span style={{ background: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd', padding: '2px 4px', borderRadius: '4px' }}>hook</span> I've ever tested..."
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', opacity: step >= 2 ? 1 : 0.4, transform: step >= 2 ? 'translateY(0)' : 'translateY(10px)', transition: 'all 0.3s ease 0.1s' }}>
          <div style={{ fontSize: '10px', color: '#7a7a7a', marginBottom: '8px' }}>@another_creator • 1 week ago</div>
          <div style={{ fontSize: '11px', color: '#e6e6e6', lineHeight: 1.5 }}>
            "Stop using that <span style={{ background: 'rgba(59, 130, 246, 0.3)', color: '#93c5fd', padding: '2px 4px', borderRadius: '4px' }}>hook</span> format, try this instead..."
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}} />
    </div>
  );
};

const AnimatedFolderStructure = ({ hovering }) => {
  return (
    <div style={{ width: '240px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', fontFamily: 'monospace', fontSize: '12px', color: '#7a7a7a' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#fff' }}>
        <FolderOpen size={14} color="#3b82f6" /> Clients
      </div>
      <div style={{ paddingLeft: '16px', borderLeft: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: hovering ? '#fff' : '#7a7a7a', transition: 'color 0.3s' }}>
          <FolderOpen size={12} color={hovering ? "#22c55e" : "#7a7a7a"} /> Brand A
        </div>
        <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '8px', height: hovering ? '40px' : '0', overflow: 'hidden', transition: 'height 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#60a5fa' }}><FileText size={10} /> Q1 Campaign (42)</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={10} /> Competitors (18)</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderOpen size={12} /> Brand B
        </div>
      </div>
    </div>
  );
};

const AnimatedDevices = ({ hovering }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '16px', height: '140px' }}>
      <div style={{ width: '120px', height: '80px', background: '#1a1a1a', borderRadius: '8px 8px 0 0', border: '2px solid #2a2a2a', borderBottom: 'none', position: 'relative', display: 'flex', justifyContent: 'center', transform: hovering ? 'translateY(-5px)' : 'none', transition: 'all 0.4s' }}>
        <div style={{ width: '90%', height: '100%', background: '#0d0d0d', borderTop: '2px solid rgba(255,255,255,0.1)' }}>
          <div style={{ width: '100%', height: '8px', background: '#3b82f6', opacity: hovering ? 1 : 0.5 }}></div>
        </div>
      </div>
      <div style={{ width: '40px', height: '80px', background: '#1a1a1a', borderRadius: '6px', border: '2px solid #2a2a2a', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: hovering ? 'translateY(-10px)' : 'none', transition: 'all 0.4s 0.1s' }}>
        <div style={{ width: '80%', height: '90%', background: '#0d0d0d', borderRadius: '2px' }}>
          <div style={{ width: '100%', height: '6px', background: '#3b82f6', opacity: hovering ? 1 : 0.5 }}></div>
        </div>
      </div>
    </div>
  );
};

const AnimatedGlobalSearch = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '120px', height: '140px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', overflow: 'hidden' }}>
      <div style={{ background: '#1a1a1a', borderRadius: '6px', height: '24px', display: 'flex', alignItems: 'center', padding: '0 8px', gap: '6px', marginBottom: '12px' }}>
        <Search size={10} color="#60a5fa" />
        <motion.div style={{ width: '2px', height: '10px', background: '#60a5fa' }} animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ background: '#1a1a1a', borderRadius: '4px', height: '36px', padding: '4px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '80%', height: '4px', background: '#2a2a2a', borderRadius: '2px', marginBottom: '4px' }} />
            <div style={{ width: '60%', height: '4px', background: '#2a2a2a', borderRadius: '2px', marginBottom: '4px' }} />
            <div style={{ width: '90%', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
            
            {i === 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={hovering ? { opacity: [0, 1, 1], scale: [0.8, 1.1, 1] } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                style={{ position: 'absolute', inset: '2px', background: 'rgba(59, 130, 246, 0.2)', border: '1px solid #3b82f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ fontSize: '8px', color: '#60a5fa', fontWeight: 'bold' }}>MATCH</div>
              </motion.div>
            )}
          </div>
        ))}
      </div>
      
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={hovering ? { y: [ -20, 80, 80 ], opacity: [0, 1, 0] } : { y: -20, opacity: 0 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{ position: 'absolute', left: 0, right: 0, height: '2px', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }}
      />
    </div>
  );
};

const AnimatedContext = ({ hovering }) => {
  return (
    <div style={{ width: '160px', height: '120px', display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
      {/* Transcript sliding in */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={hovering ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <FileText size={14} color="#a855f7" />
        <div style={{ width: '60px', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
      </motion.div>
      
      {/* Context Metrics sliding in */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={hovering ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '6px', padding: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
        >
          <div style={{ fontSize: '8px', color: '#7a7a7a' }}>VIEWS</div>
          <div style={{ width: '80%', height: '4px', background: '#a855f7', borderRadius: '2px' }} />
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={hovering ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ flex: 1, background: '#1a1a1a', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '6px', padding: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}
        >
          <div style={{ fontSize: '8px', color: '#7a7a7a' }}>DATE</div>
          <div style={{ width: '60%', height: '4px', background: '#a855f7', borderRadius: '2px' }} />
        </motion.div>
      </div>
    </div>
  );
};


export default function CloudStoragePage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "Do I have to manually save each transcript?", a: "No. Every transcript you extract saves to your library automatically. Single extractions, bulk imports, collection imports: all land in your library without any extra steps." },
    { q: "Is there a limit on how many transcripts I can store?", a: "Paid plans include unlimited transcript storage. Free accounts have limits on extraction, but any transcript you successfully extract will be saved. Most active users have libraries with thousands of transcripts." },
    { q: "Can I export my transcripts?", a: "Yes. You can export individual transcripts as text files, or export multiple transcripts at once. Your data belongs to you. If you ever want to leave TokScript, you can take your library with you." },
    { q: "How does search work?", a: "TokScript searches the full text of every transcript in your library, not just titles or tags. Type any word or phrase, and results appear instantly with your search terms highlighted. You can also filter by platform, date range, or engagement metrics." },
    { q: "Can I access my library on mobile?", a: "Yes. Your library lives in the cloud and is accessible from any device with a web browser. Same interface, same search, same folders. Transcripts you add on desktop appear on mobile immediately." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#22c55e' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Cloud size={14} className="text-green-400" />
                  <span>CLOUD LIBRARY</span>
                </div>
                <h1 className="ts-hero-title">
                  Every Transcript You Extract.<br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #bbf7d0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Saved. Searchable. Forever.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Stop losing references to browser tabs and forgotten bookmarks. TokScript saves every transcript to your cloud library the moment you extract it. Organized, searchable, and accessible from any device you own.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#22c55e', color: '#000', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(34, 197, 94, 0.4)' }}>
                    Start Building Your Library <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(34, 197, 94, 0.2)' }}>
                  <AnimatedLibrarySearch hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Stop building graveyards of good intentions.</h2>
              <p className="ts-cv-subtitle">
                You've extracted hundreds of transcripts. Viral hooks. Winning scripts. Perfect CTAs. But when you actually need that one transcript, you can't find it. Your research is only valuable if you can retrieve it.
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
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>📁 Downloads Folder</div>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>📄 Untitled Document.txt</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>🔍 Search: "hook" (0 results)</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>Scattered Files</h3>
                    <p>Content gold scattered across browser history, random downloads folders, and notes apps you forgot existed. Good luck finding any of it when you actually need it.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedLibrarySearch hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#86efac' }}>TokScript Cloud</div>
                        <h3>Instant Retrieval</h3>
                        <p>Every extraction automatically lands in one centralized database. Search by keyword across thousands of videos and get the exact quote highlighted in seconds.</p>
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
            <h2 className="ts-section-heading ts-text-center">How Your Transcript Library Works</h2>
            <p className="ts-section-subheading ts-text-center">You don't have to change anything about how you work. The library just happens in the background.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #22c55e, #10b981)' }}></div></div>

              {[
                { title: "Extract Transcripts Like Normal", desc: "Use TokScript to extract any transcript: single video, bulk import, or collection import. Nothing changes about your workflow." },
                { title: "Everything Saves Automatically", desc: "Every transcript lands in your cloud library the moment extraction finishes. Video metadata, cover image, engagement stats, all of it captured and stored without you lifting a finger." },
                { title: "Search, Organize, Retrieve", desc: "Search across your entire library by keyword. Create folders for different projects or clients. When you need a transcript, you find it in seconds." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#4ade80', background: '#064e3b', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(34,197,94,0.4)' } : {}}>{i + 1}</div>
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
            <h2 className="ts-section-heading ts-text-center">A Research Library That Actually Works</h2>
            <p className="ts-section-subheading ts-text-center">Find what you saved, the moment you need it.</p>
            
            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ background: 'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.15) 0%, transparent 70%)' }}>
                       <AnimatedFolderStructure hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#4ade80' }}>Folder Organization</div>
                      <h3>Organize However Makes Sense to You</h3>
                      <p>Create folders for projects, clients, niches, content types, whatever system works for you. Drag transcripts between folders. Nest subfolders as deep as you want.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedGlobalSearch hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Search Every Word</h3>
                      <p>TokScript searches across every transcript in your library, not just titles. That hook you half-remember from three weeks ago? Type two words and it's right there.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedDevices hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Access Anywhere</h3>
                      <p>Access your transcript library from any device with a browser. Started research on desktop, need to pull something up on your phone? Same library. Same data. Nothing to sync.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15) 0%, transparent 70%)' }}>
                      <AnimatedContext hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Context Saved With Every Transcript</h3>
                      <p>Transcripts alone aren't enough. TokScript saves the video's view count, likes, comments, posting date, creator handle, and hashtags alongside every transcript. So when you come back to it, you know exactly what you're looking at and why it mattered.</p>
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
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(34, 197, 94, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop Losing Your Best Research.</h2>
              <p className="ts-cta-desc">
                Every transcript you extract is research you've already done. The work is finished. All you need is a place to keep it where you can actually find it again. That's what TokScript's cloud library does.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#22c55e', color: '#000', border: 'none' }}>Start Building Your Library →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
