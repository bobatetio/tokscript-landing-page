"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
const Footer = dynamic(() => import("@/components/Footer"));
import {
  Chrome,
  MousePointerClick,
  RefreshCw,
  Keyboard,
  List,
  Sidebar,
  Layers,
  Zap,
  Check,
  Play,
  ArrowRight,
} from "lucide-react";

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

const HoverStateWrapper = ({ className, children, style }) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className={className}
      style={style}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {typeof children === "function" ? children(hovering) : children}
    </div>
  );
};

const InViewWrapper = ({ className, children, style }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  return (
    <div ref={ref} className={className} style={style}>
      {typeof children === "function" ? children(isInView) : children}
    </div>
  );
};

// FAUX UIs

const AnimatedExtensionVisual = ({ hovering }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    let timers = [];
    if (hovering) {
      setStep(0);
      timers = [
        setTimeout(() => setStep(1), 400),
        setTimeout(() => setStep(2), 800),
        setTimeout(() => setStep(3), 1400),
      ];
    } else {
      setStep(3);
    }
    return () => timers.forEach(clearTimeout);
  }, [hovering]);

  return (
    <div
      style={{
        position: "relative",
        width: "320px",
        height: "240px",
        background: "#0d0d0d",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Browser Header */}
      <div
        style={{
          padding: "8px 12px",
          background: "#1a1a1a",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "6px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#ef4444",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#eab308",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
            }}
          ></div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#0d0d0d",
            borderRadius: "4px",
            height: "20px",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            fontSize: "10px",
            color: "#7a7a7a",
          }}
        >
          tiktok.com/@creator/video
        </div>
        <motion.div
          animate={
            step >= 1
              ? { scale: 1.2, color: "#3b82f6" }
              : { scale: 1, color: "#7a7a7a" }
          }
        >
          <Chrome size={14} />
        </motion.div>
      </div>

      {/* Browser Body (Video Mockup) */}
      <div
        style={{
          position: "absolute",
          inset: "37px 0 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
        }}
      >
        <div
          style={{
            width: "120px",
            height: "180px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px",
            background: "linear-gradient(to bottom, #1a1a1a, #0d0d0d)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={32} color="rgba(255,255,255,0.2)" />
          </div>
        </div>
      </div>

      {/* Extension Popover */}
      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            style={{
              position: "absolute",
              top: "45px",
              right: "12px",
              width: "180px",
              background: "rgba(15,23,42,0.95)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  background: "#3b82f6",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                <Zap size={12} color="#fff" />
              </div>
              <span
                style={{ fontSize: "12px", fontWeight: "bold", color: "#fff" }}
              >
                TokScript
              </span>
            </div>
            {step === 2 && (
              <div
                style={{
                  fontSize: "11px",
                  color: "#7a7a7a",
                  textAlign: "center",
                  padding: "12px 0",
                }}
              >
                Detecting video...
              </div>
            )}
            {step >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#22c55e",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  ✓ 2 MINUTE TRANSCRIPT
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    background: "rgba(255,255,255,0.1)",
                    borderRadius: "2px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#3b82f6",
                      borderRadius: "2px",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    background: "#3b82f6",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "6px",
                    borderRadius: "6px",
                  }}
                >
                  Save to Library
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AnimatedWorkflowCard = ({ hovering }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let int;
    if (hovering) {
      setActiveStep(0);
      let count = 0;
      int = setInterval(() => {
        count++;
        setActiveStep(count % 3);
      }, 800);
    } else {
      setActiveStep(0);
    }
    return () => clearInterval(int);
  }, [hovering]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "280px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {[
        { icon: <Play size={14} />, title: "Scrolling feed" },
        { icon: <Zap size={14} color="#3b82f6" />, title: "Found a banger" },
        {
          icon: <Check size={14} color="#22c55e" />,
          title: "Click extension, saved.",
        },
      ].map((step, i) => (
        <div
          key={i}
          style={{
            padding: "12px",
            background:
              hovering && activeStep === i
                ? "rgba(59, 130, 246, 0.1)"
                : "#1a1a1a",
            border: "1px solid",
            borderColor:
              hovering && activeStep === i
                ? "rgba(59, 130, 246, 0.3)"
                : "rgba(255,255,255,0.05)",
            borderRadius: "8px",
            fontSize: "13px",
            color: hovering && activeStep === i ? "#fff" : "#7a7a7a",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transform:
              hovering && activeStep === i ? "scale(1.02)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ opacity: hovering && activeStep === i ? 1 : 0.5 }}>
            {step.icon}
          </div>
          <span
            style={{
              fontWeight: hovering && activeStep === i ? "bold" : "normal",
            }}
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

const AnimatedKeyboardShortcut = ({ hovering }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        background: "#0d0d0d",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {/* Option Key */}
      <motion.div
        animate={
          hovering
            ? {
                y: 2,
                background: "#3b82f6",
                color: "#fff",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              }
            : {
                y: 0,
                background: "#1a1a1a",
                color: "#7a7a7a",
                boxShadow: "none",
              }
        }
        transition={{
          duration: 0.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "bold",
        }}
      >
        ⌥ Opt
      </motion.div>
      <div style={{ fontSize: "14px", color: "#64748b" }}>+</div>
      {/* T Key */}
      <motion.div
        animate={
          hovering
            ? {
                y: 2,
                background: "#3b82f6",
                color: "#fff",
                boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
              }
            : {
                y: 0,
                background: "#1a1a1a",
                color: "#7a7a7a",
                boxShadow: "none",
              }
        }
        transition={{
          duration: 0.2,
          delay: 0.1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 1,
        }}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: "bold",
        }}
      >
        T
      </motion.div>
    </div>
  );
};

const AnimatedAutoDetect = ({ hovering }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "120px",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <motion.div
          animate={hovering ? { scale: [1, 1.2, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{
            width: "40px",
            height: "40px",
            background: "#3b82f6",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            position: "relative",
          }}
        >
          <Zap size={20} color="#fff" />
        </motion.div>
        {hovering && (
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid #3b82f6",
              borderRadius: "8px",
              zIndex: 1,
            }}
          />
        )}
      </div>
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={hovering ? { y: 10, opacity: 1 } : { y: -10, opacity: 0 }}
        style={{
          background: "#22c55e",
          color: "#fff",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "8px",
          fontWeight: "bold",
        }}
      >
        Video Detected
      </motion.div>
    </div>
  );
};

const AnimatedCloudSync = ({ hovering }) => {
  return (
    <div
      style={{
        width: "140px",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "40px",
          background: "#1a1a1a",
          border: "1px solid #2a2a2a",
          borderRadius: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "6px",
        }}
      >
        <div style={{ width: "100%", height: "2px", background: "#2a2a2a" }} />
        <div style={{ width: "60%", height: "2px", background: "#2a2a2a" }} />
        <div style={{ width: "80%", height: "2px", background: "#2a2a2a" }} />
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          height: "2px",
          background: "#2a2a2a",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={hovering ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "10px",
            height: "100%",
            background: "#3b82f6",
            boxShadow: "0 0 8px #3b82f6",
          }}
        />
      </div>

      <motion.div
        animate={
          hovering
            ? {
                scale: [1, 1.1, 1],
                filter: "drop-shadow(0 0 10px rgba(59,130,246,0.5))",
              }
            : { scale: 1, filter: "none" }
        }
        transition={{ duration: 1, repeat: Infinity }}
        style={{ color: "#3b82f6" }}
      >
        <RefreshCw size={24} />
      </motion.div>
    </div>
  );
};

const AnimatedSidebarMode = ({ hovering }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "160px",
        height: "100px",
        background: "#0d0d0d",
        borderRadius: "8px",
        border: "1px solid #2a2a2a",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          padding: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#1a1a1a",
            borderRadius: "4px",
          }}
        />
        <div
          style={{
            width: "100%",
            flex: 1,
            background: "#1a1a1a",
            borderRadius: "4px",
          }}
        />
      </div>
      <motion.div
        initial={{ width: "0px" }}
        animate={hovering ? { width: "40px" } : { width: "0px" }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{
          background: "#1a1a1a",
          borderLeft: "1px solid #3b82f6",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: hovering ? "8px 4px" : "0",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "4px",
            background: "#3b82f6",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "80%",
            height: "4px",
            background: "#2a2a2a",
            borderRadius: "2px",
          }}
        />
        <div
          style={{
            width: "60%",
            height: "4px",
            background: "#2a2a2a",
            borderRadius: "2px",
          }}
        />
      </motion.div>
    </div>
  );
};

const AnimatedContextMenu = ({ hovering }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "140px",
        height: "120px",
        background: "#0d0d0d",
        borderRadius: "8px",
        border: "1px solid #2a2a2a",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "12px",
          background: "#1a1a1a",
          borderRadius: "4px",
          marginBottom: "12px",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "40px",
          background: "#1a1a1a",
          borderRadius: "4px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={
          hovering
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.9, y: -10 }
        }
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          width: "80px",
          background: "#1a1a1a",
          border: "1px solid #3b82f6",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "6px", fontSize: "6px", color: "#7a7a7a" }}>
          Open Link
        </div>
        <div style={{ padding: "6px", fontSize: "6px", color: "#7a7a7a" }}>
          Copy Address
        </div>
        <motion.div
          animate={
            hovering
              ? { background: "rgba(59, 130, 246, 0.2)" }
              : { background: "transparent" }
          }
          transition={{ delay: 0.5 }}
          style={{
            padding: "6px",
            fontSize: "6px",
            color: "#60a5fa",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Zap size={6} /> Extract Transcript
        </motion.div>
      </motion.div>

      <motion.div
        animate={hovering ? { x: 30, y: 40 } : { x: 80, y: 80 }}
        transition={{ duration: 0.5, type: "spring" }}
        style={{ position: "absolute", zIndex: 10 }}
      >
        <MousePointerClick size={16} color="#fff" />
      </motion.div>
    </div>
  );
};

export default function ChromeExtensionPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = [
    {
      q: "Is the Chrome extension free?",
      a: "Yes. The extension is a free companion tool to your TokScript account. Free accounts can extract a limited number per day; Pro accounts get unlimited extractions.",
    },
    {
      q: "Does it work on Arc, Brave, or Edge?",
      a: "Yes. It works on any Chromium-based browser. Just install it directly from the Chrome Web Store.",
    },
    {
      q: "Do I need to be logged in?",
      a: "Yes. Click the extension icon once to log in. After that, it securely syncs every transcript directly to your cloud dashboard.",
    },
    {
      q: "Which platforms does the extension detect?",
      a: "It currently auto-detects videos on TikTok.com, Instagram.com (Reels), and YouTube.com (Shorts).",
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
            <div
              className="ts-glow-orb ts-glow-orb-1"
              style={{ background: "#3b82f6" }}
            ></div>
          </div>

          <div className="ts-container">
            <div className="ts-hero-split">
              <div className="ts-hero-content">
                <div className="ts-kicker-badge">
                  <Chrome size={14} className="text-blue-400" />
                  <span>CHROME EXTENSION</span>
                </div>
                <h1 className="ts-hero-title">
                  Capture inspiration.
                  <br />
                  <span
                    className="ts-text-gradient"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff 0%, #93c5fd 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Don't break your scroll.
                  </span>
                </h1>
                <p className="ts-hero-desc">
                  The moment you open a new tab to copy-paste a URL, you've
                  ruined your research flow. Hit the extension, grab the
                  transcript, and keep scrolling.
                </p>
                <div className="ts-hero-cta-wrap">
                  <a
                    href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                    target="_blank"
                    style={{
                      background: "#3b82f6",
                      color: "#fff",
                      padding: "16px 24px",
                      borderRadius: "8px",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                    }}
                  >
                    Add to Chrome <ArrowRight size={18} />
                  </a>
                </div>
              </div>
              <div className="ts-hero-visual">
                <div
                  className="ts-hv-glass-panel"
                  style={{
                    background: "rgba(15, 23, 42, 0.85)",
                    borderRadius: "24px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow:
                      "0 24px 48px rgba(0,0,0,0.8), 0 0 80px rgba(59, 130, 246, 0.2)",
                  }}
                >
                  <AnimatedExtensionVisual hovering={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUE */}
        <section className="ts-core-value">
          <div className="ts-container">
            <div className="ts-cv-header">
              <h2 className="ts-cv-title">Friction kills ideas.</h2>
              <p className="ts-cv-subtitle">
                If saving a video feels like doing chores, you'll stop doing it.
                You'll tell yourself "I'll remember that hook," and then you'll
                forget it five minutes later.
              </p>
            </div>

            <div className="ts-cv-comparison-wrap">
              <div className="ts-cv-comparison">
                <div className="ts-cv-divider">
                  <div className="ts-cv-line"></div>
                  <div className="ts-cv-vs">VS</div>
                </div>

                <div className="ts-cv-side ts-cv-old">
                  <div className="ts-cv-graphic-wrap">
                    <div
                      className="ts-faux-ui-panel"
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                        padding: "24px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#fca5a5",
                          fontWeight: "bold",
                          letterSpacing: "0.1em",
                          marginBottom: "16px",
                          textTransform: "uppercase",
                        }}
                      >
                        Context Switching
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          fontSize: "13px",
                          color: "#7a7a7a",
                        }}
                      >
                        <div
                          style={{
                            padding: "12px",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "8px",
                          }}
                        >
                          1. Find cool video
                        </div>
                        <div
                          style={{
                            padding: "12px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#fca5a5",
                            borderRadius: "8px",
                            border: "1px dashed rgba(239, 68, 68, 0.3)",
                          }}
                        >
                          2. Open new tab
                        </div>
                        <div
                          style={{
                            padding: "12px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#fca5a5",
                            borderRadius: "8px",
                            border: "1px dashed rgba(239, 68, 68, 0.3)",
                          }}
                        >
                          3. Navigate to tool
                        </div>
                        <div
                          style={{
                            padding: "12px",
                            background: "rgba(239, 68, 68, 0.1)",
                            color: "#fca5a5",
                            borderRadius: "8px",
                            border: "1px dashed rgba(239, 68, 68, 0.3)",
                          }}
                        >
                          4. Paste and wait
                        </div>
                        <div
                          style={{
                            padding: "12px",
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "8px",
                            opacity: 0.5,
                          }}
                        >
                          5. Forget what you were doing...
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="ts-cv-text">
                    <div className="ts-cv-kicker">Standard Tools</div>
                    <h3>The Admin Tax</h3>
                    <p>
                      Every time you leave the platform to save something,
                      you're paying a tax on your attention. You lose your
                      place, you lose your momentum, and half the time you
                      forget why you opened that tab in the first place.
                    </p>
                  </div>
                </div>

                <HoverStateWrapper className="ts-cv-side ts-cv-new">
                  {(hovering) => (
                    <>
                      <div className="ts-cv-graphic-wrap">
                        <AnimatedWorkflowCard hovering={hovering} />
                      </div>
                      <div className="ts-cv-text">
                        <div className="ts-cv-kicker">TokScript Extension</div>
                        <h3>Stay in the Feed</h3>
                        <p>
                          We built the tool into the browser so you never have
                          to leave the feed. See it, click it, it's saved in
                          your vault. Move on to the next one.
                        </p>
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
            <h2 className="ts-section-heading ts-text-center">
              How it feels to use
            </h2>
            <p className="ts-section-subheading ts-text-center">
              You won't even notice it's there until you need it. That's the
              point.
            </p>

            <div className="ts-animated-timeline">
              <div className="ts-timeline-line">
                <div className="ts-timeline-line-glow"></div>
              </div>

              {[
                {
                  title: "Pin It",
                  desc: "Install from the Web Store and pin the icon to your toolbar. Log in once and you're connected. That's the entire setup.",
                },
                {
                  title: "Scroll Normally",
                  desc: "Go about your day. Doomscroll TikTok, research on Reels, study Shorts. The extension sits in the background doing nothing until you tell it to.",
                },
                {
                  title: "Click & Capture",
                  desc: "Hear a hook you want to steal? Click the blue icon. We detect the URL, rip the transcript, and sync it to your library in about 2 seconds. You never leave the page.",
                },
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
            <h2 className="ts-section-heading ts-text-center">
              Little details that matter
            </h2>
            <p className="ts-section-subheading ts-text-center">
              Built for people who do this hundreds of times a week and don't
              want to think about it.
            </p>

            <div className="ts-bento-grid-3">
              <HoverStateWrapper className="ts-bento-card-visual ts-span-2-desktop">
                {(hovering) => (
                  <>
                    <div
                      className="ts-card-graphic"
                      style={{
                        background:
                          "radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnimatedKeyboardShortcut hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <div className="ts-kicker">Power User Ready</div>
                      <h3>Keyboard Shortcuts</h3>
                      <p>
                        Prefer the keyboard? Set up a custom Chrome shortcut to
                        trigger the extraction without taking your hands off the
                        keys. One keystroke. Done.
                      </p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div
                      className="ts-card-graphic"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnimatedAutoDetect hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Zero Setup Detection</h3>
                      <p>
                        You don't need to highlight or copy anything. If a video
                        is playing on your screen, the extension already knows
                        the URL.
                      </p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div
                      className="ts-card-graphic"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnimatedCloudSync hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Cloud Sync</h3>
                      <p>
                        No text files dumped into your downloads folder. Every
                        transcript syncs directly to your private TokScript
                        dashboard. Organized, searchable, and backed up.
                      </p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div
                      className="ts-card-graphic"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnimatedSidebarMode hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Sidebar Mode</h3>
                      <p>
                        Opens a sidebar right next to the video. Copy hooks,
                        read the script, take notes. All without blocking the
                        content you're watching.
                      </p>
                    </div>
                  </>
                )}
              </HoverStateWrapper>

              <HoverStateWrapper className="ts-feature-card-v4-wrap">
                {(hovering) => (
                  <>
                    <div
                      className="ts-card-graphic"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AnimatedContextMenu hovering={hovering} />
                    </div>
                    <div className="ts-card-text-content">
                      <h3>Context Menu</h3>
                      <p>
                        Right-click any video link on any webpage to extract it
                        without even opening it. The transcript shows up in your
                        dashboard like you were never there.
                      </p>
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
            <h2 className="ts-section-heading ts-text-center">
              Got questions?
            </h2>
            <div className="ts-faq-accordion">
              {faqItems.map((item, idx) => (
                <div
                  key={idx}
                  className={`ts-faq-item ${openFaq === idx ? "is-open" : ""}`}
                >
                  <div
                    className="ts-faq-trigger"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <h3 className="ts-faq-q">{item.q}</h3>
                    <div className="ts-faq-icon">
                      <div className="ts-faq-icon-line-h" />
                      <div className="ts-faq-icon-line-v" />
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ts-faq-answer-container"
                      >
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
        <section
          className="ts-section ts-final-cta"
          style={{ background: "#0a0a0a" }}
        >
          <div className="ts-container ts-container-narrow">
            <div className="ts-cta-box">
              <div
                className="ts-cta-glow"
                style={{
                  background:
                    "radial-gradient(ellipse at top, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                }}
              ></div>
              <h2 className="ts-cta-title">Upgrade your browser.</h2>
              <p className="ts-cta-desc">
                Your Chrome is just a browser right now. Add TokScript and it
                becomes a content research engine. Free to install. Free to try.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                target="_blank"
                className="ts-btn-primary"
              >
                Add to Chrome
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
