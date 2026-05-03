"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Users,
  FolderTree,
  ShieldCheck,
  Activity,
  CreditCard,
  Check,
  Building,
  Briefcase,
  UserPlus,
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

const AnimatedWorkspaceSwitcher = ({ hovering }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let int;
    if (hovering) {
      int = setInterval(() => {
        setActive(prev => (prev === 0 ? 1 : 0));
      }, 1500);
    } else {
      setActive(0);
    }
    return () => clearInterval(int);
  }, [hovering]);

  return (
    <div style={{ width: '260px', background: '#0d0d0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
      <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#7a7a7a', marginBottom: '12px', letterSpacing: '0.05em' }}>SELECT WORKSPACE</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ padding: '12px', borderRadius: '10px', background: active === 0 ? 'rgba(20, 184, 166, 0.1)' : '#1a1a1a', border: '1px solid', borderColor: active === 0 ? 'rgba(20, 184, 166, 0.4)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #00b8b2, #00B8B2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>A</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>Acme Agency</div>
              <div style={{ fontSize: '10px', color: '#7a7a7a' }}>14 members • 4.2k videos</div>
            </div>
          </div>
          {active === 0 && <Check size={14} color="#00b8b2" />}
        </div>

        <div style={{ padding: '12px', borderRadius: '10px', background: active === 1 ? 'rgba(168, 85, 247, 0.1)' : '#1a1a1a', border: '1px solid', borderColor: active === 1 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.3s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>S</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#fff' }}>Stark Fitness</div>
              <div style={{ fontSize: '10px', color: '#7a7a7a' }}>3 members • 840 videos</div>
            </div>
          </div>
          {active === 1 && <Check size={14} color="#a855f7" />}
        </div>
      </div>
    </div>
  );
};

const AnimatedTeamActivity = ({ hovering }) => {
  return (
    <div style={{ width: '280px', background: '#0d0d0d', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', padding: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#7a7a7a', marginBottom: '16px', letterSpacing: '0.05em' }}>TEAM ACTIVITY</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {[
          { name: "Sarah J.", action: "imported 50 videos to", target: "Competitor Analysis", time: "2m ago", color: "#3b82f6" },
          { name: "Mike T.", action: "extracted transcript from", target: "Trending Hooks", time: "14m ago", color: "#22c55e" },
          { name: "Alex R.", action: "created new folder", target: "Q3 Campaign", time: "1h ago", color: "#a855f7" }
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', opacity: hovering ? 1 : (i === 0 ? 1 : 0.4), transform: hovering ? 'translateX(0)' : (i === 0 ? 'translateX(0)' : 'translateX(-10px)'), transition: `all 0.4s ease ${i * 0.1}s` }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold', flexShrink: 0 }}>
              {item.name.charAt(0)}
            </div>
            <div style={{ fontSize: '12px', lineHeight: 1.4 }}>
              <span style={{ color: '#fff', fontWeight: 'bold' }}>{item.name}</span> <span style={{ color: '#7a7a7a' }}>{item.action}</span> <span style={{ color: item.color }}>{item.target}</span>
              <div style={{ fontSize: '10px', color: '#7a7a7a', marginTop: '4px' }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnimatedPermissions = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '160px', height: '140px', background: '#0d0d0d', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>
      {[
        { role: 'Admin', color: '#f43f5e', delay: 0 },
        { role: 'Editor', color: '#3b82f6', delay: 1 },
        { role: 'Viewer', color: '#22c55e', delay: 2 },
      ].map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', padding: '6px 8px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={10} color="#7a7a7a" />
          </div>
          <div style={{ flex: 1, height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
          <motion.div
            initial={{ background: '#2a2a2a', color: '#7a7a7a' }}
            animate={hovering ? { 
              background: ['#2a2a2a', item.color, item.color, '#2a2a2a'], 
              color: ['#7a7a7a', '#fff', '#fff', '#7a7a7a'],
              boxShadow: ['none', `0 0 10px ${item.color}`, `0 0 10px ${item.color}`, 'none']
            } : { background: '#2a2a2a', color: '#7a7a7a', boxShadow: 'none' }}
            transition={{ duration: 3, repeat: Infinity, delay: item.delay }}
            style={{ fontSize: '8px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}
          >
            {item.role}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const AnimatedBilling = ({ hovering }) => {
  return (
    <div style={{ position: 'relative', width: '180px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Individual invoices */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ x: (i - 1) * 40, y: 10, scale: 0.8, opacity: 0.5 }}
          animate={hovering ? { x: 0, y: 0, scale: 0, opacity: 0 } : { x: (i - 1) * 40, y: 10, scale: 0.8, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          style={{ position: 'absolute', width: '50px', height: '70px', background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '6px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '4px' }}
        >
          <div style={{ width: '100%', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
          <div style={{ width: '60%', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
          <div style={{ width: '80%', height: '4px', background: '#2a2a2a', borderRadius: '2px', marginTop: 'auto' }} />
        </motion.div>
      ))}

      {/* Merged Company Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={hovering ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.5, opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1, type: 'spring' }}
        style={{ position: 'absolute', width: '120px', height: '80px', background: 'linear-gradient(135deg, #1a1a1a, #0d0d0d)', border: '1px solid rgba(96, 165, 250, 0.4)', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 30px rgba(96, 165, 250, 0.3)' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.4)', marginLeft: '-6px' }} />
          </div>
          <CreditCard size={14} color="#60a5fa" />
        </div>
        <div>
          <div style={{ width: '100%', height: '4px', background: '#2a2a2a', borderRadius: '2px', marginBottom: '4px' }} />
          <div style={{ width: '60%', height: '4px', background: '#2a2a2a', borderRadius: '2px' }} />
        </div>
      </motion.div>
    </div>
  );
};


export default function TeamCollaborationPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    { q: "How many team members can I add?", a: "Pro plans support unlimited team members at $39/year per seat. Add as many people as your team needs, no per-seat limits on features. Everyone gets full access to shared workspaces." },
    { q: "Can I have multiple workspaces?", a: "Yes. Create as many workspaces as you need: one per client, one per project, one for internal research. Each workspace has its own library and access controls." },
    { q: "What happens when someone leaves the team?", a: "Their contributions stay in the workspace. Remove their access, and they can no longer view or add to the library, but everything they added remains. Your team's research is preserved." },
    { q: "Can team members have personal libraries too?", a: "Yes. Team members can have both personal libraries and shared workspace access. Extract to your personal library for individual projects, or to the team workspace for collaborative research." },
    { q: "How does billing work for teams?", a: "Team plans are billed centrally: one invoice for all seats. The workspace admin manages billing. Add or remove seats anytime; billing adjusts automatically." },
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
            <div className="ts-glow-orb ts-glow-orb-1" style={{ background: '#00b8b2' }}></div>
          </div>
          
          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Users size={14} className="text-teal-400" />
                  <span>TEAM WORKSPACES</span>
                </div>
                <h1 className="ts-hero-title">
                  One Library.<br />
                  <span className="ts-text-gradient" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #00b8b2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Zero Duplicated Work.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  Create shared workspaces where your team accesses the same transcript library. Research once, benefit everyone. Stop pinging Slack asking "did anyone already transcribe that video?"
                </p>
                <div className="ts-hero-cta-wrap">
                  <a href="/" style={{ background: '#00b8b2', color: '#fff', padding: '16px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(20, 184, 166, 0.4)' }}>
                    Start Your Team Workspace <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div className="ts-hv-glass-panel" style={{ background: 'rgba(13, 13, 13, 0.85)', borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.1)', boxShadow: '0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(20, 184, 166, 0.2)' }}>
                  <AnimatedWorkspaceSwitcher hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Stop paying for the same research twice.</h2>
              <p className="ts-cv-subtitle">
                Monday: Sarah transcribes 30 videos. Tuesday: Jake transcribes 25 videos, including 15 Sarah already captured. Wednesday: You ask for "that hook" and get three Slack threads with no answers. Individual accounts mean individual libraries.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider"><div className="ts-cv-line"></div><div className="ts-cv-vs">VS</div></div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div className="ts-faux-ui-panel" style={{ width: '100%', maxWidth: '280px', padding: '24px', opacity: 0.8 }}>
                      <div style={{ fontSize: '11px', color: '#fca5a5', fontWeight: 'bold', letterSpacing: '0.1em', marginBottom: '16px', textTransform: 'uppercase' }}>Without Workspaces</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#7a7a7a' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> Fragmented libraries</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> Duplicated transcriptions</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fca5a5' }}><div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}/> Research lost when staff leaves</div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Individual Silos</div>
                    <h3>Fragmented Intelligence</h3>
                    <p>Your team's collective research intelligence stays fragmented across personal accounts nobody else can search. You're paying for the same work twice.</p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedTeamActivity hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker" style={{ color: '#00b8b2' }}>TokScript Teams</div>
                        <h3>Collective Brainpower</h3>
                        <p>Every transcript your team extracts saves to the shared workspace. Individual research becomes searchable by the whole team. No more siloed lookups.</p>
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
            <h2 className="ts-section-heading ts-text-center">How Team Workspaces Work</h2>
            <p className="ts-section-subheading ts-text-center">Set up in minutes. Add members as you grow.</p>
            
            <div className="ts-animated-timeline">
              <div className="ts-timeline-line"><div className="ts-timeline-line-glow" style={{ background: 'linear-gradient(to bottom, #00b8b2, #00B8B2)' }}></div></div>

              {[
                { title: "Create Your Team Workspace", desc: "Set up a shared workspace and invite your team members. Choose a name, add collaborators by email, assign roles. Takes about 2 minutes." },
                { title: "Build Shared Libraries Together", desc: "Every transcript your team extracts can save to the shared library. See what teammates have already captured before duplicating effort." },
                { title: "Search Across Everything", desc: "Need a specific hook? Search the entire team library, not just your own extractions. Find research you didn't even know existed." }
              ].map((step, i) => (
                <HoverStateWrapper key={i} className="ts-step-block-v2">
                  {(hovering) => (
                    <>
                      <div className="ts-step-node-wrap">
                        <div className="ts-step-node" style={hovering ? { borderColor: '#00b8b2', background: '#00b8b2', color: '#fff', transform: 'scale(1.1)', boxShadow: '0 0 20px rgba(20,184,166,0.4)' } : {}}>{i + 1}</div>
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
            <h2 className="ts-section-heading ts-text-center">Collaboration Built for Agencies</h2>
            <p className="ts-section-subheading ts-text-center">The features that matter when you're handling multiple clients at once.</p>
            
            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ background: 'radial-gradient(ellipse at center, rgba(20, 184, 166, 0.15) 0%, transparent 70%)' }}>
                       <AnimatedWorkspaceSwitcher hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker" style={{ color: '#00b8b2' }}>Multiple Workspaces</div>
                      <h3>Separate Spaces for Each Client</h3>
                      <p>Create distinct workspaces for different clients, projects, or teams. Client A's research stays in Client A's workspace. No accidental cross-posting, no confidentiality concerns.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedPermissions hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Role-Based Permissions</h3>
                      <p>Assign roles: Admins manage, Editors organize, Viewers can search but not modify. Protect your research from accidents.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <AnimatedTeamActivity hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Activity Tracking</h3>
                      <p>Activity feed shows recent additions across the workspace. Know what's being researched without asking. Spot patterns in team behavior.</p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div className="ts-card-graphic" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)' }}>
                      <AnimatedBilling hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Billing for the Whole Team</h3>
                      <p>No juggling individual subscriptions. Team workspaces run on one invoice, one payment. Add or remove seats as your team changes.</p>
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
              <div className="ts-cta-glow" style={{ background: 'radial-gradient(ellipse at top, rgba(20, 184, 166, 0.4) 0%, transparent 70%)' }}></div>
              <h2 className="ts-cta-title">Stop Paying for the Same Research Twice.</h2>
              <p className="ts-cta-desc">
                Your team's best research shouldn't live in personal silos. Create a shared workspace where everyone contributes.
              </p>
              <a href="/" className="ts-btn-primary" style={{ background: '#00b8b2', color: '#fff', border: 'none' }}>Start Your Team Workspace →</a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
