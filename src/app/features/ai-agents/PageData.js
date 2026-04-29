"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Bot,
  Sparkles,
  ScrollText,
  GitFork,
  ArrowRight,
  CheckCircle2,
  Flame,
  Target,
  Lightbulb,
  PenTool
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

// --- Animated demos for each AI tool ---

const AnimatedHookGen = ({ hovering }) => {
  const [step, setStep] = useState(0);

  const hooks = [
    "Nobody talks about this, but...",
    "I wasted 2 years before I learned...",
    "This one change tripled my reach."
  ];

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers.push(setTimeout(() => setStep(1), 400));
      timers.push(setTimeout(() => setStep(2), 900));
      timers.push(setTimeout(() => setStep(3), 1400));
    } else {
      setStep(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div style={{ width: '280px', height: '180px', background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Sparkles size={14} color="#f43f5e" />
        <span style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>Hook Generator</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', justifyContent: 'center' }}>
        {hooks.map((hook, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={step > i ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              background: step > i ? 'rgba(244, 63, 94, 0.1)' : 'rgba(255,255,255,0.02)',
              border: step > i ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(255,255,255,0.05)',
              borderRadius: '6px',
              padding: '8px 10px',
              fontSize: '10px',
              color: step > i ? '#fda4af' : '#3a3a3a',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {step > i && <Flame size={10} color="#f43f5e" />}
            {hook}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const AnimatedScriptGen = ({ hovering }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setProgress(0);
      timers.push(setTimeout(() => setProgress(1), 300));
      timers.push(setTimeout(() => setProgress(2), 700));
      timers.push(setTimeout(() => setProgress(3), 1100));
    } else {
      setProgress(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  const sections = [
    { label: "HOOK", color: "#f43f5e", width: "90%" },
    { label: "BODY", color: "#fb923c", width: "100%" },
    { label: "CTA", color: "#34d399", width: "70%" }
  ];

  return (
    <div style={{ width: '280px', height: '180px', background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ScrollText size={14} color="#f43f5e" />
          <span style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>Script Builder</span>
        </div>
        {progress === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={10} color="#34d399" />
            <span style={{ fontSize: '9px', color: '#34d399' }}>Done</span>
          </motion.div>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
        {sections.map((sec, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '8px', fontWeight: 'bold', letterSpacing: '0.1em', color: progress > i ? sec.color : '#2a2a2a', transition: 'color 0.3s' }}>{sec.label}</span>
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={progress > i ? { width: sec.width } : { width: '0%' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ height: '100%', background: sec.color, borderRadius: '2px' }}
              />
            </div>
            {progress > i && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                <div style={{ width: '80%', height: '3px', background: '#2a2a2a', borderRadius: '2px' }} />
                <div style={{ width: '60%', height: '3px', background: '#2a2a2a', borderRadius: '2px' }} />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedFrameworkExtract = ({ hovering }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let timers = [];
    if (hovering) {
      setPhase(0);
      timers.push(setTimeout(() => setPhase(1), 400));
      timers.push(setTimeout(() => setPhase(2), 1000));
    } else {
      setPhase(0);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  const framework = [
    "1. Controversial opener",
    "2. Back with 3 facts",
    "3. Flip the assumption",
    "4. Clear CTA"
  ];

  return (
    <div style={{ width: '280px', height: '180px', background: 'linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <GitFork size={14} color="#f43f5e" />
        <span style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>Framework Extractor</span>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {/* Raw transcript (fades out) */}
        <motion.div
          animate={{ opacity: phase < 2 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}
        >
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{ width: `${85 - i * 8}%`, height: '3px', background: phase >= 1 ? 'rgba(244, 63, 94, 0.3)' : '#1a1a1a', borderRadius: '2px', transition: 'background 0.3s' }} />
          ))}
          {phase >= 1 && (
            <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5 }} style={{ height: '1px', background: 'linear-gradient(90deg, #f43f5e, transparent)', marginTop: '4px' }} />
          )}
        </motion.div>

        {/* Extracted framework (fades in) */}
        <motion.div
          animate={{ opacity: phase >= 2 ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '5px', justifyContent: 'center' }}
        >
          {framework.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 8 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
              style={{
                fontSize: '9px',
                color: '#e6e6e6',
                padding: '4px 8px',
                background: 'rgba(244, 63, 94, 0.08)',
                border: '1px solid rgba(244, 63, 94, 0.2)',
                borderRadius: '4px',
                fontFamily: 'monospace'
              }}
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default function AIAgentsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: "Does this work for any niche?",
      a: "Yes. Whether you create content about fitness, finance, comedy, or cooking, the AI adapts to your topic. The frameworks it pulls from are structural, not niche-specific, so they transfer across categories."
    },
    {
      q: "Can I edit what it generates?",
      a: "Absolutely. Think of the output as a strong first draft. Most creators use it as a starting point and layer their own voice, examples, and personality on top."
    },
    {
      q: "How is this different from using ChatGPT?",
      a: "Generic AI tools know nothing about what performs on short-form video. Our agents are trained on patterns from viral TikToks, Reels, and Shorts, so the pacing, structure, and hook formats actually match what drives views."
    },
    {
      q: "What exactly is a 'script framework'?",
      a: "A framework is the skeleton of a video script with the specific details stripped out. For example: 'Controversial opener, back it up with 3 rapid facts, flip the assumption, then CTA.' That structure works regardless of topic, and you can rebuild it around anything."
    },
    {
      q: "Do I need a paid plan to use AI Agents?",
      a: "You can try the tools on a free account with limited usage. For unlimited generations and full access to all three tools, you'll want a Pro or Team plan."
    },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#f43f5e' }}></div>
          </div>

          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge" style={{ borderColor: 'rgba(244, 63, 94, 0.3)', background: 'rgba(244, 63, 94, 0.1)' }}>
                  <Bot size={14} color="#f43f5e" />
                  <span style={{ color: '#fecdd3' }}>AI AGENTS</span>
                </div>
                <h1 className="ts-hero-title" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', lineHeight: '1.1' }}>
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #fecdd3 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Your Content Team That Never Sleeps.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Three AI tools built for creators who study what works. Generate hooks that stop the scroll, write scripts that hold attention, and pull apart viral frameworks so you can rebuild them as your own.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/app/sign-up" style={{ background: '#f43f5e', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}>
                    Try AI Agents Free <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(244, 63, 94, 0.2)' }}>
                  <AnimatedScriptGen hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Good content starts with good structure. Most creators skip that step.</h2>
              <p className="ts-cv-subtitle">
                You find a viral video and watch it 15 times trying to figure out what made it work. Then you open a blank document and stare at it. Two hours later, you have one mediocre hook. There is a faster way.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '280px', padding: '24px', opacity: 0.8 }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>The Research Spiral</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#7a7a7a' }}>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>Watch viral video 15 times</div>
                        <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px dashed rgba(255,255,255,0.1)' }}>Open blank doc and stare</div>
                        <div style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#fca5a5', borderRadius: '4px', border: '1px dashed rgba(239, 68, 68, 0.3)' }}>Write one mediocre hook in 2 hours</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Process</div>
                    <h3>The Blank Page Problem</h3>
                    <p>Spending hours trying to reverse-engineer why a video went viral, only to end up with something that sounds nothing like the original.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedHookGen hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#f43f5e' }}>TokScript AI</div>
                        <h3>Instant Creative Firepower</h3>
                        <p>Drop a link or a topic. Get hooks, scripts, and frameworks generated from patterns that actually perform. Spend your time creating, not guessing.</p>
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
            <p className="ts-section-subheading ts-text-center">From stuck to scripted in three moves.</p>

            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #f43f5e, #be123c)' }}></div></div>

              {[
                { title: "Pick Your Tool", desc: "Choose between the Hooks Generator, Script Generator, or Framework Extractor depending on where you are stuck." },
                { title: "Give It Context", desc: "Paste a viral video link, describe your niche, or just tell it what you need. The more context you provide, the sharper the output." },
                { title: "Use It Immediately", desc: "Copy the output straight into your workflow. Edit it, split-test it, or use it as-is. It is yours." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#f43f5e', background: '#4c0519', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(244,63,94,0.4)' } : {}}>{i + 1}</div>
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
          <div className="ts-bg-aurora" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.15) 0%, transparent 70%)' }}></div>
          <div className="ts-container">
            <h2 className="ts-section-heading ts-text-center">Three tools. Zero blank pages.</h2>
            <p className="ts-section-subheading ts-text-center">Each one tackles a different part of the content creation process.</p>

            <div className="ts-bento-grid-3" style={{ marginTop: '48px' }}>
              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', background: 'radial-gradient(ellipse at center, rgba(244, 63, 94, 0.15) 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedHookGen hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#f43f5e' }}>Viral Hooks Generator</div>
                      <h3>The First 3 Seconds Decide Everything</h3>
                      <p>This tool studies what makes openers work across top-performing short-form videos and generates hooks matched to your topic. Stop guessing what might grab attention and start knowing what does.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedScriptGen hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#f43f5e' }}>Viral Scripts Generator</div>
                      <h3>Complete Scripts, Not Random Ideas</h3>
                      <p>Give it a topic, a reference video, or both. Get a complete script with opening hook, structured body, and clear call to action. Built around patterns that keep viewers watching past the 3-second mark.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ height: '240px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedFrameworkExtract hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#f43f5e' }}>Script Framework Extractor</div>
                      <h3>X-Ray Vision for Viral Content</h3>
                      <p>Found a video that crushed it? Paste the transcript and this tool strips it down to the structural bones, the actual framework, so you can rebuild it around any topic you want.</p>
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
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(244, 63, 94, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop staring at blank pages.</h2>
              <p className="ts-cta-desc">
                Let AI handle the heavy lifting so you can focus on what you are actually good at. Creating.
              </p>
              <a href="/app/sign-up" className="ts-btn-primary" style={{ background: '#f43f5e', color: '#fff', border: 'none' }}>Try AI Agents Free</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
