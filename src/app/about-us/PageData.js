"use client";
import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import ShareBar from "@/components/ShareBar";

// Global Noise Overlay
const NoiseOverlay = () => (
  <svg
    className="ts-noise-overlay"
    viewBox="0 0 100% 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <filter id="noiseFilter">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.8"
        numOctaves="3"
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const FULL_FAQ = [
  { q: "Is TokScript free to use?", a: "Yes. Your first transcripts are completely free, no account required. <a href=\"/pricing\" style=\"color:#60a5fa;text-decoration:underline\">Premium plans</a> unlock unlimited bulk processing and AI agents." },
  { q: "What platforms does TokScript support?", a: "<a href=\"/\" style=\"color:#60a5fa;text-decoration:underline\">TikTok</a> (up to 10 minutes), <a href=\"/instagram-transcript-generator\" style=\"color:#60a5fa;text-decoration:underline\">Instagram Reels</a>, and <a href=\"/youtube-transcript-generator\" style=\"color:#60a5fa;text-decoration:underline\">YouTube Shorts</a>." },
  { q: "How accurate are the transcripts?", a: "Expect 99% accuracy for videos with clear audio, across 100+ languages." },
  { q: "Can I use TokScript for commercial purposes?", a: "Yes. Agencies, consultants, e-commerce sellers, and researchers all use it commercially with no restrictions. <a href=\"/affiliate\" style=\"color:#60a5fa;text-decoration:underline\">Join our affiliate program</a> to earn 40% recurring commissions." },
  { q: "Do the AI agents cost extra?", a: "No. All three AI agents are included with your premium subscription at no additional charge." },
  { q: "Can TokScript transcribe videos in languages other than English?", a: "Yes. TokScript extracts transcripts in 100+ languages, whatever is spoken in the original video." },
  { q: "Is there a limit on transcript extractions?", a: "Free users have daily limits. <a href=\"/pricing\" style=\"color:#60a5fa;text-decoration:underline\">Premium users</a> have zero limits." },
  { q: "What happens to my data if I cancel?", a: "All your transcripts remain saved. You revert to free plan limits for new transcriptions." },
  { q: "Does TokScript work on mobile?", a: "Yes. The web platform is fully responsive." },
  { q: "How is TokScript different from generic tools?", a: "Otter.ai is for meetings. TokScript is built specifically for short-form social video, with 15-second extraction and viral AI." },
  { q: "How is it different from video downloaders?", a: "Downloaders only remove watermarks. TokScript extracts transcripts, downloads videos, AND provides AI-powered content generation. <a href=\"/pricing\" style=\"color:#60a5fa;text-decoration:underline\">Try it free</a>." }
];

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`ts-faq-item ${isOpen ? "is-open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="ts-faq-trigger">
        <h3 className="ts-faq-q">{question}</h3>
        <div className="ts-faq-icon">
          <div className="ts-faq-icon-line-h" />
          <div className="ts-faq-icon-line-v" />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="ts-faq-answer-container"
          >
            <div className="ts-faq-a" dangerouslySetInnerHTML={{ __html: answer }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ----------------------------------------------------
// HOVER STATE WRAPPER
// ----------------------------------------------------
const featureIcons = {
  document: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
  ),
  layers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
  ),
  folderPlus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path><line x1="12" y1="11" x2="12" y2="17"></line><line x1="9" y1="14" x2="15" y2="14"></line></svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
  ),
  sparkles: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"></path><path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z"></path><path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z"></path></svg>
  ),
  clock: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  folderOpen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"></path><polyline points="2 11 22 11"></polyline></svg>
  ),
  puzzle: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 01-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 00-3.214-1.533.5.5 0 00-.26.26 2.501 2.501 0 001.533 3.214c.445.166.855.498.925.968a.979.979 0 01-.276.837l-1.61 1.61a2.404 2.404 0 01-3.407 0l-1.568-1.568a1.026 1.026 0 00-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 01-3.237 1.384.5.5 0 01-.26-.26 2.5 2.5 0 011.384-3.237c.464-.18.894-.527.968-1.02a1.026 1.026 0 00-.29-.877l-1.568-1.568a2.404 2.404 0 010-3.407l1.61-1.61a.98.98 0 01.838-.277c.47.07.8.48.966.926a2.501 2.501 0 003.214 1.532.5.5 0 00.26-.26 2.501 2.501 0 00-1.533-3.213c-.445-.167-.855-.499-.924-.969a.98.98 0 01.276-.837l1.61-1.61a2.404 2.404 0 013.407 0l1.568 1.568c.23.23.556.338.878.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 013.237-1.384c.13.052.208.18.26.26a2.5 2.5 0 01-1.384 3.237c-.464.18-.894.527-.968 1.02z"></path></svg>
  ),
  fileExport: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
  ),
  image: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
  ),
  timestamp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
  ),
  globe: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"></path></svg>
  )
};

const featureList = [
  { id: 'document', title: 'Transcript Extraction', desc: 'Accurate text from TikTok (up to 10m), Reels, and Shorts. 100+ languages. Paste a link, get the words. That\'s it.' },
  { id: 'layers', title: 'Bulk Processing', desc: 'Paste up to 50 URLs at once. What used to be a full day of manual copy-paste is now a 30-second operation.' },
  { id: 'folderPlus', title: 'Collection Import', desc: 'Import an entire TikTok collection or Playlist through one link. Up to 10,000 videos. All of them. At once.' },
  { id: 'download', title: 'HD Video Download', desc: 'Clean, watermark-free HD downloads (1080p) for repurposing, editing, or archiving.' },
  { id: 'sparkles', title: 'Viral AI Agents', desc: '3 custom agents: Hook Generator, Script Writer, and Virality Explainer. Trained on 20,000+ videos that actually went viral. Purpose-built for short-form content.' },
  { id: 'clock', title: 'History Dashboard', desc: 'Every video you\'ve ever transcribed, saved permanently. Searchable, organized, and waiting for you the next time you need it.' },
  { id: 'folderOpen', title: 'Folder System', desc: 'Organize by client, campaign, niche, or whatever system works for you. Syncs across web and Chrome extension.' },
  { id: 'puzzle', title: 'Chrome Extension', desc: 'Extract transcripts without leaving TikTok, Instagram, or YouTube. No tab switching. No copy-pasting URLs.' },
  { id: 'fileExport', title: '6 Export Formats', desc: 'Download as TXT, CSV, XLSX, JSON, XML, or PDF. Individual files or bulk exports.' },
  { id: 'image', title: 'HD Cover Download', desc: 'Save video thumbnails and cover images in original HD quality. Perfect for repurposing content across platforms.' },
  { id: 'timestamp', title: 'Timestamps', desc: 'Every word timestamped for easy navigation. Jump to any point in the transcript. Perfect for video editing and content analysis.' },
  { id: 'globe', title: '100+ Languages', desc: 'Automatic language detection with support for 100+ languages. Spanish, French, Portuguese, Japanese, Arabic, and more.' }
];

// ----------------------------------------------------
// HOVER STATE WRAPPER
// ----------------------------------------------------
const HoverStateWrapper = ({ className, children, style }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div 
      className={className}
      style={style}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {typeof children === 'function' ? children(hovering) : children}
    </div>
  );
};

// ----------------------------------------------------
// IN VIEW WRAPPER
// ----------------------------------------------------
const InViewWrapper = ({ className, children, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={className} style={style}>
      {typeof children === 'function' ? children(isInView) : children}
    </div>
  );
};

// ----------------------------------------------------
// THE NEW ANIMATED CREATOR DASHBOARD COMPONENT
// ----------------------------------------------------
const AnimatedCreatorDashboard = () => {
  const [step, setStep] = useState(0);

  // Stats Counters
  const [views, setViews] = useState(0);
  const [saves, setSaves] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 400), // URL typed, click analyze
      setTimeout(() => setStep(2), 1200), // Scanning
      setTimeout(() => {
        setStep(3); // Results reveal
        // Animate stats
        let start = 0;
        const interval = setInterval(() => {
          start += 1;
          setViews(Math.min((start * 0.2), 4.2).toFixed(1));
          setSaves(Math.min((start * 6), 125));
          setScore(Math.min((start * 5), 98));
          if (start >= 21) clearInterval(interval);
        }, 30);
        timers.push(interval);
      }, 2200), 
      setTimeout(() => setStep(4), 3000), // Badges pop
    ];
    return () => timers.forEach(t => clearTimeout(t) || clearInterval(t));
  }, []);

  return (
    <div className="ts-hero-visual">
      <motion.div 
        className="ts-hv-glass-panel ts-creator-dash"
        initial={{ opacity: 0, rotateY: 10, rotateX: -5, scale: 0.95 }}
        animate={{ opacity: 1, rotateY: -8, rotateX: 4, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="ts-cd-header">
          <div className="ts-hv-dots"><div/><div/><div/></div>
          <div className="ts-cd-url-bar">
            <span className="ts-cd-lock">🔒</span>
            tiktok.com/@creator/viral-hit
            {step < 1 && (
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }} 
                className="ts-cursor"
              >
                |
              </motion.span>
            )}
          </div>
          <div className={`ts-cd-analyze ${step >= 1 ? 'ts-btn-clicked' : ''}`}>Analyze</div>
        </div>
        
        <div className="ts-cd-body">
          {/* Scanning State */}
          <AnimatePresence>
            {step >= 1 && step < 3 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="ts-cd-scanning"
              >
                <div className="ts-scanner-line"></div>
                <div className="ts-scanner-text">Extracting Viral Script...</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results State */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
                className="ts-cd-results"
              >
                {/* Left: Transcript */}
                <div className="ts-cd-transcript">
                  <div className="ts-cd-label">EXTRACTED SCRIPT</div>
                  <p className="ts-cd-text">
                    <span className="ts-cd-highlight">"Stop trying to save money on your coffee."</span>
                    <br/><br/>
                    You're broke because you think saving $5 a day works. Here are the 3 exact steps I took to completely shift my income. 
                    <br/><br/>
                    Link in my bio for the full breakdown.
                  </p>
                </div>
                
                {/* Right: Viral Stats */}
                <div className="ts-cd-stats">
                  <div className="ts-cd-stat">
                    <div className="ts-cd-s-label">VIEWS</div>
                    <div className="ts-cd-s-value ts-val-blue">{views}M</div>
                  </div>
                  <div className="ts-cd-stat">
                    <div className="ts-cd-s-label">SAVES</div>
                    <div className="ts-cd-s-value ts-val-purple">{saves}K</div>
                  </div>
                  <div className="ts-cd-stat">
                    <div className="ts-cd-s-label">HOOK SCORE</div>
                    <div className="ts-cd-s-value ts-val-green">{score}%</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Badges */}
        <AnimatePresence>
          {step >= 4 && (
            <>
              <motion.div 
                initial={{ scale: 0, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                className="ts-hv-float ts-hv-float-1"
              >
                <div className="ts-float-dot ts-dot-yellow"></div>
                <span>Viral Hook Detected</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
                className="ts-hv-float ts-hv-float-2"
              >
                <div className="ts-float-dot ts-dot-green"></div>
                <span>3 AI Agents Built In</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// ----------------------------------------------------
// ANIMATED PROBLEM/SOLUTION COMPONENTS
// ----------------------------------------------------
const AnimatedOldWay = ({ hovering }) => {
  const [progress, setProgress] = useState(85);

  useEffect(() => {
    let interval;
    if (hovering) {
      setProgress(0);
      let current = 0;
      interval = setInterval(() => {
        current += 1.5;
        if (current > 85) current = 85;
        setProgress(current);
      }, 30);
    } else {
      setProgress(85);
    }
    return () => clearInterval(interval);
  }, [hovering]);

  return (
    <div className="ts-faux-loading-modal">
      <div className="ts-lm-header">
        Transcribing 60s Video...
        {progress > 60 && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ts-lm-stuck" style={{ color: '#fca5a5', marginLeft: '8px', fontSize: '10px' }}>Processing...</motion.span>}
      </div>
      <div className="ts-lm-bar-track">
        <div className="ts-lm-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}></div>
      </div>
      <div className="ts-lm-time">Estimated time: 15 mins</div>
    </div>
  );
};

const AnimatedTokScriptWay = ({ hovering }) => {
  const [step, setStep] = useState(3);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers = [
        setTimeout(() => setStep(1), 200),
        setTimeout(() => setStep(2), 400),
        setTimeout(() => setStep(3), 600)
      ];
    } else {
      setStep(3);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div className="ts-faux-success-stack">
      <div className={`ts-fs-item ts-fs-1 ${step >= 1 ? 'ts-fs-active' : ''}`}>
        <div className="ts-fs-icon">{step >= 1 ? '✓' : '1'}</div> Paste URL
      </div>
      <div className={`ts-fs-item ts-fs-2 ${step >= 2 ? 'ts-fs-active' : ''}`}>
        <div className="ts-fs-icon">{step >= 2 ? '✓' : '2'}</div> Extract Text
      </div>
      <div className={`ts-fs-item ts-fs-3 ${step >= 3 ? 'ts-fs-active ts-fs-done' : ''}`}>
        <div className="ts-fs-check">{step >= 3 ? '✓' : '3'}</div>
        15 Seconds. Done.
      </div>
    </div>
  );
};

const AnimatedCreators = ({ hovering }) => {
  const [step, setStep] = useState(2);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers = [
        setTimeout(() => setStep(1), 300),
        setTimeout(() => setStep(2), 600)
      ];
    } else {
      setStep(2);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div className="ts-faux-video-player">
      <motion.div 
        className="ts-vp-play" 
        animate={step >= 1 ? { scale: 0.9, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <AnimatePresence>
        {step >= 2 && (
          <>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="ts-vp-tag ts-tag-tl">Hook</motion.div>
            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ delay: 0.2 }} className="ts-vp-tag ts-tag-br">CTA</motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedAgencies = ({ hovering }) => {
  const [count, setCount] = useState(7);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setCount(0);
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= 7) clearInterval(interval);
      }, 100);
      timers.push(interval);
    } else {
      setCount(7);
    }
    return () => timers.forEach(t => clearInterval(t));
  }, [hovering]);

  return (
    <div className="ts-faux-bulk-grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="ts-fbg-item" style={{ opacity: count >= i ? 1 : 0.1 }}>
          <div className="ts-fbg-line"></div>
          <div className="ts-fbg-line ts-fbg-short"></div>
        </div>
      ))}
      <AnimatePresence>
        {count >= 7 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ts-fbg-overlay">+44 More</motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedCaseStudy = ({ hovering }) => {
  const [key, setKey] = useState(0);
  
  useEffect(() => {
    if (hovering) setKey(k => k + 1);
  }, [hovering]);

  return (
    <svg key={key} className="ts-glow-chart" viewBox="0 -20 400 170" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(52, 211, 153, 0.4)" />
          <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
        </linearGradient>
      </defs>
      <motion.path 
        d="M0,150 L0,120 Q50,130 100,100 T200,80 T300,40 T400,10 L400,150 Z" 
        fill="url(#chartGrad)" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.path 
        d="M0,120 Q50,130 100,100 T200,80 T300,40 T400,10" 
        fill="none" stroke="#34d399" strokeWidth="4" strokeLinecap="round" 
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
      <motion.g 
        transform="translate(280, 10)"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <circle cx="120" cy="0" r="6" fill="#10b981" />
        <rect width="80" height="30" rx="6" fill="#111827" stroke="rgba(255,255,255,0.1)"/>
        <text x="40" y="20" fill="#fff" fontSize="14" fontWeight="bold" textAnchor="middle">5.0%</text>
      </motion.g>
    </svg>
  );
};

const AnimatedResearchers = ({ hovering }) => {
  const [active, setActive] = useState(1);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setActive(0);
      timers = [
        setTimeout(() => setActive(1), 400),
        setTimeout(() => setActive(2), 800),
        setTimeout(() => setActive(1), 1200)
      ];
    } else {
      setActive(1);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div className="ts-faux-filter-modal">
      <div className="ts-ffm-header"><span className="ts-ffm-icon">≡</span> Filters</div>
      <div className="ts-ffm-body">
        <div className={`ts-ffm-row ${active === 0 ? 'ts-ffm-active' : ''}`}><div className="ts-ffm-box"></div> Brand</div>
        <div className={`ts-ffm-row ${active === 1 ? 'ts-ffm-active' : ''}`}><div className="ts-ffm-box"></div> Niche</div>
        <div className={`ts-ffm-row ${active === 2 ? 'ts-ffm-active' : ''}`}><div className="ts-ffm-box"></div> Format</div>
      </div>
    </div>
  );
};

const AnimatedEducators = ({ hovering }) => {
  const [step, setStep] = useState(1);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers = [
        setTimeout(() => setStep(1), 400)
      ];
    } else {
      setStep(1);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div className="ts-faux-cc">
      <div className="ts-fcc-video">
        <div className={`ts-fcc-btn ${step === 1 ? 'ts-fcc-active' : ''}`}>CC</div>
      </div>
      <AnimatePresence>
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0, width: 0 }} 
            animate={{ opacity: 1, width: "auto" }} 
            exit={{ opacity: 0, width: 0 }}
            className="ts-fcc-text"
          >
            "Welcome to today's lecture..."
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ----------------------------------------------------
// THE NEW ANIMATED TIMELINE COMPONENT
// ----------------------------------------------------
const HOW_IT_WORKS_STEPS = [
  { num: "01", t: "Find a Video", d: "Browse TikTok, Reels, or Shorts and find any public video." },
  { num: "02", t: "Copy the URL", d: "Copy the link from your browser or share menu." },
  { num: "03", t: "Paste into TokScript", d: "Use the web dashboard, Chrome extension, or Quick URL." },
  { num: "04", t: "Get Transcript", d: "Full text extracted in seconds. Copy, download, or analyze." },
  { num: "05", t: "Use AI Agents", d: "Generate hooks, scripts, or analysis on the spot." },
  { num: "06", t: "Save & Organize", d: "Automatically saved to your history. Add to folders." }
];

const AnimatedTimeline = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const fillPercentage = hoveredIndex !== null 
    ? (hoveredIndex / (HOW_IT_WORKS_STEPS.length - 1)) * 100 
    : 0;

  return (
    <div className="ts-animated-timeline" onMouseLeave={() => setHoveredIndex(null)}>
      <div className="ts-timeline-line">
        <motion.div 
          className="ts-timeline-line-glow"
          animate={{
            height: `${fillPercentage}%`,
            opacity: hoveredIndex !== null ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      
      {HOW_IT_WORKS_STEPS.map((s, i) => {
        const isHovered = hoveredIndex === i;
        const isPast = hoveredIndex !== null && i <= hoveredIndex;
        
        return (
          <div 
            key={i} 
            className={`ts-step-block-v2 ${isHovered ? 'is-hovered' : ''} ${isPast ? 'is-past' : ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
          >
            <div className="ts-step-node-wrap">
              <div className="ts-step-node">
                {s.num}
                {isHovered && <div className="ts-step-node-glow" />}
              </div>
            </div>
            <div className="ts-step-card-wrap">
              <div className="ts-step-card">
                <div className="ts-step-card-content">
                  <h4 className="ts-step-title">{s.t}</h4>
                  <p className="ts-step-desc">{s.d}</p>
                </div>
                <div className="ts-step-card-glass-shine"></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function PageData() {
  return (
    <div className="ts-about-v4">
      <Header />
      <NoiseOverlay />

      <main className="ts-main">
        {/* HERO SECTION */}
        <section className="ts-hero">
          <div className="ts-hero-bg">
            <div className="ts-hero-grid" />
            <div className="ts-glow-orb ts-glow-orb-1" />
            <div className="ts-glow-orb ts-glow-orb-2" />
          </div>
          
          <div className="ts-container ts-hero-split">
            {/* LEFT: Copy */}
            <div className="ts-hero-content">
              <div className="ts-kicker-badge">
                <span className="ts-kicker-dot" /> 84M+ Minutes Transcribed
              </div>
              
              <h1 className="ts-hero-title">
                The Story Behind<br />
                <div className="ts-text-gradient">84M+ Minutes.</div>
              </h1>
              
              <p className="ts-hero-desc">
                Every viral video has a script nobody talks about. The hook that stopped the scroll. The CTA that closed the sale. The structure that made 10 million people watch til the end. We've pulled the text out of 2.6 million videos so you don't have to guess what works. <strong>You just look.</strong>
              </p>
            </div>

            {/* RIGHT: Animated Creator Dashboard Visual */}
            <div>
              <AnimatedCreatorDashboard />
            </div>
          </div>

          <div className="ts-ticker-band mt-16">
            <div className="ts-ticker-track">
              {[
                { l: "Videos Processed", v: "2.6M+" },
                { l: "Profiles Downloaded", v: "190,000+" },
                { l: "Hours Saved", v: "120,000+" },
                { l: "Users", v: "41,000+" },
                { l: "Languages Supported", v: "100+" },
                { l: "Videos Processed", v: "2.6M+" },
                { l: "Profiles Downloaded", v: "190,000+" },
                { l: "Hours Saved", v: "120,000+" },
                { l: "Users", v: "41,000+" },
                { l: "Languages Supported", v: "100+" },
              ].map((m, i) => (
                <div key={i} className="ts-ticker-stat">
                  <span className="ts-ticker-l">{m.l}</span>
                  <span className="ts-ticker-v">{m.v}</span>
                  <span className="ts-ticker-sep">/</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE EXTRACTION ENGINE (Manifesto + Problem/Solution merged) */}
        <section className="ts-section ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">We aren't just a downloader.</h2>
              <p className="ts-cv-subtitle">
                We rip the text out of <Link href="/" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>TikToks</Link>, <Link href="/instagram-transcript-generator" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>Reels</Link>, and <Link href="/youtube-transcript-generator" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>Shorts</Link> so you can see every hook, every CTA, every transition that made a video perform. You can't learn that by watching. You learn it by reading.
              </p>
            </div>

            <div className="ts-cv-comparison">
              <div className="ts-cv-side ts-cv-old">
                <InViewWrapper className="ts-cv-graphic-wrap">
                  {(inView) => <AnimatedOldWay hovering={inView} />}
                </InViewWrapper>
                <div className="ts-cv-text">
                  <div className="ts-cv-kicker ts-kicker-red">The Old Way</div>
                  <h3>15 minutes per video.</h3>
                  <p>Manually transcribing a 60-second video takes 15 minutes. Multiply that by the 50 videos you saved this week. That's your entire day gone. Tools like Otter.ai require extra steps and give you a wall of text with zero structure.</p>
                </div>
              </div>

              <div className="ts-cv-divider">
                <div className="ts-cv-line"></div>
                <div className="ts-cv-vs">VS</div>
              </div>

              <div className="ts-cv-side ts-cv-new">
                <InViewWrapper className="ts-cv-graphic-wrap">
                  {(inView) => <AnimatedTokScriptWay hovering={inView} />}
                </InViewWrapper>
                <div className="ts-cv-text">
                  <div className="ts-cv-kicker ts-kicker-blue">The TokScript Way</div>
                  <h3>15 seconds. Done.</h3>
                  <p>Paste a URL. Get the text. See the structure. 15 seconds. Done. TokScript fixes the digital graveyard and turns it into a searchable, exportable library you can actually work from.</p>
                </div>
              </div>
            </div>

            <div className="ts-cv-footer">
              <div className="ts-cv-rule"></div>
              <p className="ts-cv-p1">
                The creator economy runs on video, but the "alpha" (hooks, scripts, CTAs) is locked inside the file. Nobody gives you the transcript. Nobody breaks down the structure. We do. And once you see it on paper, you can't unsee what makes viral content work.
              </p>
              <div className="ts-cv-callout">
                <div className="ts-cv-callout-line"></div>
                <p><strong>This isn't for meetings. This isn't for podcasts.</strong><br/>This is for the scripts behind videos that move product, build audiences, and generate billions in sales. If you sell on TikTok Shop or run a content agency, this is where your research starts. <Link href="/pricing" style={{color: '#60a5fa', textDecoration: 'underline', textUnderlineOffset: '3px'}}>See pricing</Link> or <Link href="/affiliate" style={{color: '#60a5fa', textDecoration: 'underline', textUnderlineOffset: '3px'}}>join our affiliate program</Link>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUE VISUAL BENTO: PERSONAS */}
        <section className="ts-section ts-personas">
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">Built for the modern creator economy.</h2>
            <div className="ts-bento-grid-3">
              
              <HoverStateWrapper className="ts-bento-card-visual">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic ts-graphic-purple">
                      <AnimatedCreators hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Creators & Influencers</h3>
                      <p>Stop staring at a blank page. Pull the transcripts from videos that already blew up, study the hooks, and build an inspiration library that writes your next script for you.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-bento-card-visual">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic ts-graphic-teal">
                      <AnimatedAgencies hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Marketing Agencies</h3>
                      <p>Paste 50 URLs. Get 50 transcripts. Cut your content research time by 80% and build content calendars based on what's actually going viral right now.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-bento-card-visual">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic ts-graphic-indigo">
                      <AnimatedResearchers hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Market Researchers</h3>
                      <p>Download transcripts from entire TikTok collections in bulk. Run analysis across thousands of videos. Spot the patterns and track the trends.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic ts-graphic-green">
                      <AnimatedCaseStudy hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker ts-kicker-green">Case Study: TikTok Shop</div>
                      <h3>0.5% to 5.0% Conversion</h3>
                      <p>Study the exact words behind the top-converting product videos in your niche. Sellers using TokScript have watched their conversion rates jump drastically (Avg order value $25 → $35, Monthly Revenue $2K → $20K+).</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-bento-card-visual">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic ts-graphic-yellow">
                      <AnimatedEducators hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Educators & Students</h3>
                      <p>Make short-form video accessible. Support deaf/hard of hearing communities. Run academic analysis on viral media with real transcript data.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

            </div>
          </div>
        </section>

        {/* FEATURES GRID: 12 CARDS */}
        <section className="ts-section ts-features-grid">
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">The most advanced extraction engine.</h2>
            <div className="ts-bento-grid-3">
              {featureList.map((f, i) => (
                <HoverStateWrapper key={i} className="ts-bento-card-visual ts-card-small ts-feature-card-v4-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
                  {(hovering) => (
                    <>
                      <div className="ts-card-graphic ts-graphic-default">
                        {/* We use a subtle visual based on the id */}
                        {f.id === 'document' && (
                          <div className="ts-faux-file-grid" style={{ transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-ffg-file" style={{ borderColor: hovering ? '#3b82f6' : '' }}>TXT</div>
                            <div className="ts-ffg-file">JSON</div>
                            <div className="ts-ffg-file">CSV</div>
                          </div>
                        )}
                        {f.id === 'layers' && (
                          <div className="ts-faux-stack-icon" style={{ transform: hovering ? 'scale(1.1) translateY(-5px)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-fsi ts-fsi-3" style={{ background: hovering ? 'rgba(59,130,246,0.1)' : '' }}></div>
                            <div className="ts-fsi ts-fsi-2" style={{ background: hovering ? 'rgba(59,130,246,0.2)' : '' }}></div>
                            <div className="ts-fsi ts-fsi-1" style={{ background: hovering ? '#3b82f6' : '' }}></div>
                          </div>
                        )}
                        {f.id === 'folderPlus' && (
                          <div className="ts-faux-filter-modal" style={{ width: '180px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-ffm-header" style={{ padding: '8px 12px', fontSize: '11px', color: hovering ? '#3b82f6' : '#fff' }}>+ Import Collection</div>
                            <div className="ts-ffm-body" style={{ padding: '4px 0' }}>
                              <div className="ts-ffm-row" style={{ padding: '4px 12px' }}><div className="ts-ffm-box" style={{ background: hovering ? '#3b82f6' : '' }}></div> 124 Videos</div>
                              <div className="ts-ffm-row" style={{ padding: '4px 12px' }}><div className="ts-ffm-box" style={{ background: hovering ? '#3b82f6' : '' }}></div> 48 Videos</div>
                            </div>
                          </div>
                        )}
                        {f.id === 'download' && (
                          <div className="ts-faux-video-player" style={{ width: '120px', height: '80px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.6 }}>
                            <div className="ts-vp-play" style={{ background: hovering ? '#3b82f6' : '' }}></div>
                          </div>
                        )}
                        {f.id === 'sparkles' && (
                          <div className="ts-faux-ai-chat" style={{ maxWidth: '200px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-fac-in" style={{ padding: '8px 12px', fontSize: '10px' }}>Generate hook...</div>
                            <div className="ts-fac-out" style={{ padding: '8px 12px', fontSize: '10px', background: hovering ? 'linear-gradient(135deg, #3a3a3a 0%, #3b82f6 100%)' : '#1a1a1a', boxShadow: hovering ? '0 5px 15px rgba(59, 130, 246, 0.3)' : 'none' }}>"Stop scrolling..."</div>
                          </div>
                        )}
                        {f.id === 'clock' && (
                          <div className="ts-faux-bulk-grid" style={{ width: '160px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            {[1,2,3,4].map(j => (
                              <div key={j} className="ts-fbg-item" style={{ borderColor: hovering ? 'rgba(59,130,246,0.2)' : '' }}>
                                <div className="ts-fbg-line" style={{ background: hovering ? '#3b82f6' : '' }}></div>
                                <div className="ts-fbg-line ts-fbg-short"></div>
                              </div>
                            ))}
                          </div>
                        )}
                        {f.id === 'folderOpen' && (
                          <div className="ts-faux-filter-modal" style={{ width: '180px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-ffm-body" style={{ padding: '8px 0' }}>
                              <div className="ts-ffm-row" style={{ color: hovering ? '#fff' : '' }}>📁 Client A Campaigns</div>
                              <div className="ts-ffm-row" style={{ color: hovering ? '#fff' : '' }}>📁 Q4 Product Launches</div>
                            </div>
                          </div>
                        )}
                        {f.id === 'puzzle' && (
                          <div className="ts-faux-logos" style={{ transform: hovering ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-fl-circle ts-fl-tk" style={{ zIndex: 3 }}>TT</div>
                            <div className="ts-fl-circle ts-fl-ig" style={{ zIndex: 2 }}>IG</div>
                            <div className="ts-fl-circle ts-fl-yt" style={{ zIndex: 1 }}>YT</div>
                          </div>
                        )}
                        {f.id === 'fileExport' && (
                          <div className="ts-faux-file-grid" style={{ transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-ffg-file" style={{ borderColor: hovering ? '#3b82f6' : '' }}>CSV</div>
                            <div className="ts-ffg-file" style={{ borderColor: hovering ? '#ef4444' : '' }}>PDF</div>
                            <div className="ts-ffg-file" style={{ borderColor: hovering ? '#10b981' : '' }}>XLSX</div>
                            <div className="ts-ffg-file" style={{ borderColor: hovering ? '#eab308' : '' }}>XML</div>
                          </div>
                        )}
                        {f.id === 'image' && (
                          <div className="ts-faux-video-player" style={{ width: '120px', height: '80px', borderRadius: '8px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div style={{ position: 'absolute', inset: 4, border: hovering ? '2px dashed #3b82f6' : '2px dashed rgba(255,255,255,0.2)', borderRadius: '4px', transition: 'border-color 0.4s ease' }}></div>
                          </div>
                        )}
                        {f.id === 'timestamp' && (
                          <div className="ts-faux-cc" style={{ transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-fcc-text" style={{ fontSize: '10px', padding: '6px 12px', background: hovering ? 'rgba(59,130,246,0.2)' : '', color: hovering ? '#93c5fd' : '' }}>00:00:15 - Hook</div>
                            <div className="ts-fcc-text" style={{ fontSize: '10px', padding: '6px 12px', opacity: 0.5 }}>00:00:22 - Value</div>
                          </div>
                        )}
                        {f.id === 'globe' && (
                          <div className="ts-faux-filter-modal" style={{ width: '160px', transform: hovering ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.4s ease', opacity: hovering ? 1 : 0.4 }}>
                            <div className="ts-ffm-body" style={{ padding: '8px 0' }}>
                              <div className="ts-ffm-row" style={{ color: hovering ? '#fff' : '' }}>🌐 English (US)</div>
                              <div className="ts-ffm-row" style={{ color: hovering ? '#fff' : '' }}>🌐 Spanish (ES)</div>
                              <div className="ts-ffm-row" style={{ color: hovering ? '#fff' : '' }}>🌐 French (FR)</div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="ts-card-text-content">
                        <h3>{f.title}</h3>
                        <p>{f.desc}</p>
                      </div>
                    </>
                  )}
                </HoverStateWrapper>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (Timeline) */}
        <section className="ts-section ts-timeline">
          <div className="ts-container ts-container-narrow">
            <h2 className="ts-section-heading">How it works</h2>
            <AnimatedTimeline />
          </div>
        </section>

        {/* FAQ */}
        <section className="ts-section ts-faq-section">
          <div className="ts-container ts-container-narrow">
            <h2 className="ts-section-heading ts-text-center">Frequently Asked Questions</h2>
            <div className="ts-faq-accordion">
              {FULL_FAQ.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="ts-section ts-final-cta">
          <div className="ts-container ts-container-center">
            <div className="ts-cta-box">
              <div className="ts-cta-glow"></div>
              <h2 className="ts-cta-title">Start Your Content Intelligence Engine</h2>
              <p className="ts-cta-desc">Stop guessing what works. 41,000+ creators already know. They pulled the transcripts, studied the scripts, and built their content on data instead of gut feelings. <strong>Your move.</strong></p>
              <div className="ts-cta-actions">
                <Link href="/pricing" className="ts-btn-primary">
                  Start for Free
                </Link>
                <div className="ts-cta-subtext">No credit card required.</div>
              </div>
            </div>
            
            <p className="ts-footer-blurb">
              The most advanced short-form video transcription tool on the market. Extract transcripts from <Link href="/" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>TikTok</Link>, <Link href="/instagram-transcript-generator" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>Reels</Link>, and <Link href="/youtube-transcript-generator" style={{color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(255,255,255,0.3)', textUnderlineOffset: '3px'}}>Shorts</Link> in seconds. Study what's viral. Build what's next.
            </p>
            <ShareBar url="https://tokscript.com/about-us" text="TokScript. 41,000+ creators use it to extract transcripts from TikTok, Reels & Shorts in seconds." />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
