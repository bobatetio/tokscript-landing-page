"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  X,
  Crown,
  ArrowRight,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import EnhenceExperience from "@/components/EnhenceExperience";
import { PLATFORM_GLYPH_MAP } from "@/data/pricingFeatures";
import tokscriptLogo from "../../assets/images/icons/logo.png";
import baCardBg from "../../../assets_updated/images/mcp/ba-card-bg.png";
import lightRayBg from "../../assets/images/light-ray-bg-img.webp";
import lightRayBgMobile from "../../assets/images/light-ray-bg-img-mobile.webp";
import baBeforeCompetitor from "../../../assets_updated/images/mcp/ba-before-competitor.png";
import baAfterCompetitor from "../../../assets_updated/images/mcp/ba-after-competitor.png";

const ChatGPTMark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
  </svg>
);
const ClaudeMark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M4.709 15.955l4.72-2.647.079-.23-.079-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.448.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.146-.103.018-.072-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.005 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.139.08-.673 7.245-.316.37-.728.279-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.139.018-1.427 1.959-2.17 2.932-1.716 1.834-.41.164-.711-.37.066-.655.398-.584 2.371-3.018 1.43-1.864.924-1.082-.006-.158h-.055L4.132 18.56l-1.355.176-.583-.546.072-.898.279-.291 2.308-1.586z"/>
  </svg>
);
const PerplexityMark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904.1577v6.932H2.1798v10.7785h2.3106v6.9319l6.9319-6.3543v6.4767h1.1554v-6.4767l7.082 6.4793V17.868h2.3106V7.0896zm-3.4660 0L12.6717 12.485V7.8943h6.2600zM5.6458 1.7574l5.7669 5.3322v4.3429L5.6458 6.083V1.7574zm-2.3104 14.9555V8.2450h7.0673l-7.0673 5.9970V16.7129zm2.3104 5.6038v-7.0571l5.7669-4.8927V17.7430l-5.7669 4.6837zm12.7060 0l-5.7669-4.6837v-9.0353l5.7669 4.8927V22.3167zm2.3106-5.6038H13.5949l7.0717-5.9970v8.4679z"/>
  </svg>
);
const GrokMark = (props) => (
  <svg viewBox="0 0 34 33" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M13.2371 21.0407L24.3186 12.8506C24.8619 12.4491 25.6384 12.6057 25.8973 13.2294C27.2597 16.5185 26.651 20.4712 23.9403 23.1851C21.2297 25.8989 17.4581 26.4941 14.0108 25.1386L10.2449 26.8843C15.6463 30.5806 22.2053 29.6665 26.304 25.5601C29.5551 22.3051 30.562 17.8683 29.6205 13.8673L29.629 13.8758C28.2637 7.99809 29.9647 5.64871 33.449 0.844576C33.5314 0.730667 33.6139 0.616757 33.6964 0.5L29.1113 5.09055V5.07631L13.2343 21.0436"/>
    <path d="M10.9503 23.0313C7.07343 19.3235 7.74185 13.5853 11.0498 10.2763C13.4959 7.82722 17.5036 6.82767 21.0021 8.2971L24.7595 6.55998C24.0826 6.07017 23.215 5.54334 22.2195 5.17313C17.7198 3.31926 12.3326 4.24192 8.67479 7.90126C5.15635 11.4239 4.0499 16.8403 5.94992 21.4622C7.36924 24.9165 5.04257 27.3598 2.69884 29.826C1.86829 30.7002 1.0349 31.5745 0.36364 32.5L10.9474 23.0341"/>
  </svg>
);

import "../mcp/mcp.scss";

const Footer = dynamic(() => import("@/components/Footer"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));

const VS_FAQ = [
  {
    title: "Is TokScript better than Transkriptor for TikTok creators?",
    content:
      "Yes, for TikTok content research. Transkriptor is built for meeting recordings and general audio — it has no TikTok profile scanning, no bulk social video import, and no creator AI agents. TokScript is purpose-built for the TikTok/Reels/Shorts research workflow at a fraction of the price.",
  },
  {
    title: "What's the main difference between TokScript and Transkriptor?",
    content:
      "Transkriptor transcribes meeting calls, lectures, and uploaded audio files. TokScript scans TikTok creator profiles, bulk-imports social video links, and saves everything to a searchable cloud library. Different tools for different jobs.",
  },
  {
    title: "How much does Transkriptor cost compared to TokScript?",
    content:
      "Transkriptor starts at $9.99/month (300 minutes) and goes up to $30/month per seat. TokScript is $3.25/month all-inclusive with no minute limits for social video transcription. For TikTok use, TokScript is 3–9x cheaper.",
  },
  {
    title: "Does Transkriptor support TikTok profile scanning or bulk import?",
    content:
      "No. Transkriptor is designed for uploaded audio/video files and meeting integrations (Zoom, Teams, Google Meet). It has no Chrome extension for scanning TikTok profiles and no bulk social video import. Those are TokScript features.",
  },
  {
    title: "Can TokScript connect to ChatGPT or Claude?",
    content:
      "Yes. TokScript's MCP connector pulls transcripts directly into ChatGPT and Claude, so your AI builds content from real transcript data without leaving the chat. Transkriptor has its own AI assistant for meeting summaries but no MCP integration for content creation.",
  },
  {
    title: "Should I use Transkriptor or TokScript?",
    content:
      "Use Transkriptor if you need to transcribe Zoom calls, interviews, lectures, or uploaded audio files — it's a great tool for that. Use TokScript if your goal is TikTok/Reels/Shorts content research: scanning creators, bulk-importing videos, saving a library, and feeding real transcript data into your AI.",
  },
];

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

const COMPARE_GROUPS = [
  {
    key: "pricing",
    iconImage: "/figma-rows/Direct%20Access.png",
    label: "Pricing & License",
    features: [
      {
        name: "Pricing model",
        tokscript: "$3.25/mo (billed yearly) · Lifetime available",
        competitor: "$9.99–$30/mo · no lifetime option",
      },
      { name: "Lifetime license", tokscript: true, competitor: false },
      { name: "Minute/hour caps", tokscript: false, competitor: true },
    ],
  },
  {
    key: "tiktok",
    iconImage: "/figma-rows/Platforms%20supported.png",
    label: "TikTok Creator Workflow",
    features: [
      { name: "TikTok profile scanning", tokscript: true, competitor: false, platforms: ["tiktok"] },
      { name: "Bulk import (50 social links at once)", tokscript: true, competitor: false, platforms: ["tiktok", "instagram", "youtube"] },
      { name: "Collection / playlist import (up to 5,000)", tokscript: true, competitor: false, platforms: ["tiktok", "instagram", "youtube"] },
      { name: "Single video paste", tokscript: true, competitor: false, platforms: ["tiktok"] },
      { name: "Saved cloud library", tokscript: true, competitor: false },
    ],
  },
  {
    key: "surfaces",
    iconImage: "/figma-rows/Chrome.png",
    label: "Apps & Surfaces",
    features: [
      { name: "Chrome extension (TikTok profile scanner)", tokscript: true, competitor: false },
      { name: "Desktop dashboard", tokscript: true, competitor: true },
      { name: "Mobile app", tokscript: true, competitor: true },
      { name: "Web app", tokscript: true, competitor: true },
    ],
  },
  {
    key: "mcp",
    iconImage: "/figma-rows/Mcp.png",
    label: "MCP Access",
    features: [
      { name: "Claude + ChatGPT MCP connector", tokscript: true, competitor: false, platforms: ["claude", "chatgpt"] },
      { name: "Build content inside your AI chat", tokscript: true, competitor: false, platforms: ["claude", "chatgpt"] },
    ],
  },
  {
    key: "agents",
    iconImage: "/figma-rows/AI%20Agents.png",
    label: "Viral AI Agents",
    features: [
      { name: "Viral Hook Generator", tokscript: true, competitor: false, platforms: ["tiktok", "instagram", "youtube"] },
      { name: "Viral Script Writer", tokscript: true, competitor: false, platforms: ["tiktok", "instagram", "youtube"] },
      { name: "Virality Explainer", tokscript: true, competitor: false, platforms: ["tiktok", "instagram", "youtube"] },
      { name: "Unlimited agent runs", tokscript: true, competitor: false },
    ],
  },
  {
    key: "platforms",
    iconImage: "/figma-rows/Platforms%20supported.png",
    label: "Platforms Supported",
    features: [
      { name: "TikTok videos", tokscript: true, competitor: false, platforms: ["tiktok"] },
      { name: "Instagram Reels", tokscript: true, competitor: false, platforms: ["instagram"] },
      { name: "YouTube Shorts + long-form", tokscript: true, competitor: false, platforms: ["youtube"] },
      { name: "Zoom / Teams / Meet recordings", tokscript: false, competitor: true },
      { name: "Uploaded audio/video files (MP3, MP4, WAV)", tokscript: false, competitor: true },
    ],
  },
];

function CompareCell({ value }) {
  if (value === true) {
    return (
      <span className="pc-cell-yes" aria-label="Included">
        <Check size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="pc-cell-no" aria-label="Not included">
        <X size={14} strokeWidth={2.5} />
      </span>
    );
  }
  if (value === "limited") {
    return <span className="pc-cell-val">Limited</span>;
  }
  return <span className="pc-cell-val">{value}</span>;
}

const VS_BP_TOC = [
  { id: "tldr", label: "TL;DR" },
  { id: "what-is-tokscript", label: "What is TokScript?" },
  { id: "what-is-transkriptor", label: "What is Transkriptor?" },
  { id: "reasons", label: "5 reasons creators choose TokScript" },
  { id: "full-comparison", label: "Full feature comparison" },
  { id: "workflow", label: "The workflow that changes everything" },
  { id: "who-should-use", label: "Who should use which" },
  { id: "faq", label: "Frequently asked questions" },
];

export default function PageData() {
  const [activeTocId, setActiveTocId] = React.useState(VS_BP_TOC[0].id);
  const [tocCollapsed, setTocCollapsed] = React.useState(false);
  const [stickyTop, setStickyTop] = React.useState(96);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const wrapper = document.querySelector(".header-sticky-wrapper");
    if (!wrapper) return;

    const measure = () => {
      const h = wrapper.getBoundingClientRect().height;
      setStickyTop(Math.max(16, Math.round(h + 12)));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const nodes = VS_BP_TOC
      .map((entry) => document.getElementById(entry.id))
      .filter(Boolean);
    if (!nodes.length) return;

    const onScroll = () => {
      let current = nodes[0].id;
      for (const node of nodes) {
        const top = node.getBoundingClientRect().top;
        if (top - 140 <= 0) current = node.id;
      }
      setActiveTocId((prev) => (prev === current ? prev : current));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <Header />

      <div className="vs-bp">
        <header className="vs-bp-hero vs-bp-hero--mcp">
          <div className="vs-bp-hero-flare">
            <img
              src={`${BP}/tokscriptmcp/chatgpt-hero-flare.png`}
              alt=""
              aria-hidden="true"
            />
          </div>

          <div className="vs-bp-hero-inner">
            <p className="vs-bp-eyebrow">
              <span>Honest comparison</span>
              <span className="vs-bp-eyebrow-sep">·</span>
              <span>Updated June 2026</span>
              <span className="vs-bp-eyebrow-sep">·</span>
              <span>TokScript vs Transkriptor</span>
            </p>
            <h1 className="vs-bp-h1">
              TokScript vs Transkriptor: which one is actually right for TikTok creators?
            </h1>
            <p className="vs-bp-lead">
              Transkriptor is a great tool — for Zoom calls and uploaded
              audio files. It has no TikTok profile scanning, no bulk social
              video import, and it costs 3–9x more than TokScript. Here's
              the honest breakdown so you can pick the right tool for your
              workflow.
            </p>

            <div className="vs-bp-meta">
              <div className="vs-bp-meta-row vs-bp-meta-row--info">
                <div className="vs-bp-meta-item vs-bp-meta-item--author">
                  <span className="vs-bp-meta-avatar" aria-hidden="true">
                    <img
                      src={`${BP}/figma-rows/Michael.jpeg`}
                      alt=""
                    />
                  </span>
                  <div className="vs-bp-meta-author-text">
                    <span className="vs-bp-meta-eyebrow">Written by</span>
                    <span className="vs-bp-meta-name">Michael Sanchez</span>
                  </div>
                </div>
                <div className="vs-bp-meta-item">
                  <span className="vs-bp-meta-eyebrow">Published</span>
                  <span className="vs-bp-meta-date-value">June 9, 2026</span>
                </div>
                <div className="vs-bp-meta-item">
                  <span className="vs-bp-meta-eyebrow">Last updated</span>
                  <span className="vs-bp-meta-date-value">June 9, 2026</span>
                </div>

                <div className="vs-bp-share">
                  <span className="vs-bp-share-label">Share on</span>
                  <div className="vs-bp-share-icons">
                    <a
                      className="vs-bp-share-icon"
                      href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                      </svg>
                    </a>
                    <a
                      className="vs-bp-share-icon"
                      href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      className="vs-bp-share-icon"
                      href="https://twitter.com/intent/tweet?url=https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor&text=TokScript+vs+Transkriptor"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on X"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <a
                  className="vs-bp-chrome-cta"
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${BP}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                  />
                  <span>Add Chrome Extension</span>
                </a>
              </div>
              <div className="vs-bp-meta-row vs-bp-meta-row--ai">
                <span className="vs-bp-meta-ai-label">Summarize with</span>
                <div className="vs-bp-ai-buttons">
                  <a
                    className="vs-bp-ai-btn vs-bp-ai-btn--chatgpt"
                    href="https://chatgpt.com/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Summarize with ChatGPT"
                  >
                    <ChatGPTMark width={18} height={18} />
                    <span>ChatGPT</span>
                  </a>
                  <a
                    className="vs-bp-ai-btn vs-bp-ai-btn--perplexity"
                    href="https://www.perplexity.ai/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Summarize with Perplexity"
                  >
                    <PerplexityMark width={18} height={18} />
                    <span>Perplexity</span>
                  </a>
                  <a
                    className="vs-bp-ai-btn vs-bp-ai-btn--claude"
                    href="https://claude.ai/new?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Summarize with Claude"
                  >
                    <ClaudeMark width={18} height={18} />
                    <span>Claude</span>
                  </a>
                  <a
                    className="vs-bp-ai-btn vs-bp-ai-btn--grok"
                    href="https://grok.com/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Summarize with Grok"
                  >
                    <GrokMark width={18} height={18} />
                    <span>Grok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="vs-bp-layout">
          <aside
            className="vs-bp-toc"
            aria-label="On this page"
            style={{
              top: `${stickyTop}px`,
              maxHeight: `calc(100vh - ${stickyTop + 24}px)`,
            }}
          >
            <div className="vs-bp-toc-inner">
              <div className="vs-bp-toc-block vs-bp-toc-block--author">
                <span className="vs-bp-toc-section-label">Written by</span>
                <div className="vs-bp-toc-author-row">
                  <span className="vs-bp-toc-author-avatar" aria-hidden="true">
                    <img
                      src={`${BP}/figma-rows/Michael.jpeg`}
                      alt=""
                    />
                  </span>
                  <div className="vs-bp-toc-author-text">
                    <span className="vs-bp-toc-author-name">Michael Sanchez</span>
                    <span className="vs-bp-toc-author-role">Founder @ TokScript</span>
                  </div>
                </div>
              </div>

              <div className="vs-bp-toc-block vs-bp-toc-block--toc">
                <span className="vs-bp-toc-section-label">Table of Contents</span>
                <nav className="vs-bp-toc-list">
                  {VS_BP_TOC.map((entry) => (
                    <a
                      key={entry.id}
                      href={`#${entry.id}`}
                      className={`vs-bp-toc-link${
                        activeTocId === entry.id ? " is-active" : ""
                      }`}
                      onClick={() => setActiveTocId(entry.id)}
                    >
                      {entry.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="vs-bp-toc-block vs-bp-toc-block--ai">
                <span className="vs-bp-toc-section-label">
                  Summarize with AI
                </span>
                <div className="vs-bp-toc-ai-grid">
                  <a
                    className="vs-bp-toc-ai-card"
                    href="https://chatgpt.com/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="vs-bp-toc-ai-icon vs-bp-toc-ai-icon--chatgpt">
                      <ChatGPTMark width={20} height={20} />
                    </span>
                    <span>ChatGPT</span>
                  </a>
                  <a
                    className="vs-bp-toc-ai-card"
                    href="https://www.perplexity.ai/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="vs-bp-toc-ai-icon vs-bp-toc-ai-icon--perplexity">
                      <PerplexityMark width={20} height={20} />
                    </span>
                    <span>Perplexity</span>
                  </a>
                  <a
                    className="vs-bp-toc-ai-card"
                    href="https://claude.ai/new?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="vs-bp-toc-ai-icon vs-bp-toc-ai-icon--claude">
                      <ClaudeMark width={20} height={20} />
                    </span>
                    <span>Claude</span>
                  </a>
                  <a
                    className="vs-bp-toc-ai-card"
                    href="https://grok.com/?q=Summarize+TokScript+vs+Transkriptor+from+https%3A%2F%2Ftokscript.com%2Ftokscript-vs-transkriptor"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="vs-bp-toc-ai-icon vs-bp-toc-ai-icon--grok">
                      <GrokMark width={20} height={20} />
                    </span>
                    <span>Grok</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <article className="vs-bp-article">
            <p className="vs-bp-paragraph">
              If you're comparing TokScript and Transkriptor as a TikTok creator,
              you're comparing tools built for fundamentally different jobs.
              Transkriptor is excellent at transcribing Zoom calls, uploaded MP3s,
              and lecture recordings. TokScript is built specifically for social
              video research — scanning TikTok profiles, pulling transcripts in
              bulk, saving a library, and feeding that content into your AI for
              hook and script generation. One tool is for meetings. The other is
              for content research. Here's what that means for your wallet and
              your workflow.
            </p>

            <p className="vs-bp-paragraph vs-bp-paragraph--video-intro">
              Watch the full breakdown to see both tools in action:
            </p>
            <figure className="vs-bp-figure vs-bp-figure--video">
              <iframe
                src="https://www.youtube.com/embed/DaRx77UYIEQ?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
                title="TokScript vs Transkriptor walkthrough"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
              />
            </figure>

            <section id="tldr" className="vs-bp-section">
              <h2 className="vs-bp-h2">TL;DR: the 5 things that matter</h2>
              <p className="vs-bp-sub">
                The critical differences in one glance. Full feature table below.
              </p>
              <div className="vs-bp-table-wrap">
                <table className="vs-bp-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>
                        <span className="vs-bp-th-pill vs-bp-th-pill--us">
                          TokScript (recommended for creators)
                        </span>
                      </th>
                      <th>Transkriptor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Best for</th>
                      <td>TikTok/Reels/Shorts content research</td>
                      <td>Meeting & audio file transcription</td>
                    </tr>
                    <tr>
                      <th scope="row">Price</th>
                      <td>$3.25/mo · all-inclusive</td>
                      <td>$9.99–$30/mo · minute caps</td>
                    </tr>
                    <tr>
                      <th scope="row">TikTok profile scanning</th>
                      <td><span className="vs-bp-yes">
                        <Check size={16} strokeWidth={2.75} /> Chrome extension
                      </span></td>
                      <td><span className="vs-bp-no">
                        <X size={16} strokeWidth={2.75} /> Not supported
                      </span></td>
                    </tr>
                    <tr>
                      <th scope="row">Bulk social video import</th>
                      <td><span className="vs-bp-yes">
                        <Check size={16} strokeWidth={2.75} /> 50 links · 5,000 from a playlist
                      </span></td>
                      <td><span className="vs-bp-no">
                        <X size={16} strokeWidth={2.75} /> Upload files only
                      </span></td>
                    </tr>
                    <tr>
                      <th scope="row">Creator AI agents</th>
                      <td><span className="vs-bp-yes">
                        <Check size={16} strokeWidth={2.75} /> Hook, script, virality tools
                      </span></td>
                      <td><span className="vs-bp-no">
                        <X size={16} strokeWidth={2.75} /> Meeting summaries only
                      </span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="vs-bp-paragraph vs-bp-paragraph--tldr">
                Need to transcribe Zoom calls or uploaded audio → <strong>Transkriptor</strong>.
                Need to research TikTok creators, bulk-import social videos, and build
                content from real transcript data → <strong>TokScript</strong>.
              </p>
            </section>

            <section id="what-is-tokscript" className="vs-bp-section">
              <h2 className="vs-bp-h2">What is TokScript?</h2>
              <figure className="vs-bp-figure">
                <img
                  src={`${BP}/figma-rows/What%20is%20tokscript.png`}
                  alt="What is TokScript"
                />
              </figure>
              <p className="vs-bp-paragraph">
                TokScript is a TikTok content research tool built around the
                workflow, not just the transcript. A Chrome extension scans
                entire creator profiles from inside TikTok. The web
                dashboard handles TikTok, Instagram Reels, and YouTube
                Shorts. Bulk import processes 50 links in one click;
                collection import pulls up to 5,000 videos from a single
                playlist URL. Everything saves to a searchable cloud
                library, syncs across desktop and mobile, and exports to
                TXT, XML, or JSON. The MCP connector feeds real transcript
                data into ChatGPT and Claude for hook and script generation.
                Used by 41,000+ creators who treat transcripts as research,
                not a one-time copy-paste.
              </p>
            </section>

            <section id="what-is-transkriptor" className="vs-bp-section">
              <h2 className="vs-bp-h2">What is Transkriptor?</h2>
              <p className="vs-bp-paragraph">
                Transkriptor is an AI-powered transcription service built for
                professionals who work with audio files and meeting recordings.
                It integrates with Zoom, Microsoft Teams, and Google Meet,
                supports 100+ languages, identifies speakers automatically,
                and generates AI summaries and action items. Plans start at
                $9.99/month for 300 minutes and go up to $30/month per seat
                for teams. It's genuinely excellent at what it does — but
                "what it does" is transcribe uploaded audio and meeting calls.
                It has no TikTok profile scanner, no bulk social video import,
                no creator AI agents, and no MCP connection. If your workflow
                is TikTok research, not meeting notes, Transkriptor is solving
                the wrong problem at 3–9x the price.
              </p>
            </section>

            <section id="reasons" className="vs-bp-section">
              <h2 className="vs-bp-h2">
                5 reasons TikTok creators choose TokScript over Transkriptor
              </h2>
              <p className="vs-bp-sub">An honest list, not a pitch.</p>
              <ul className="vs-bp-reasons">
                <li>
                  <span className="vs-bp-reason-icon">
                    <Check size={18} strokeWidth={2.75} />
                  </span>
                  <div>
                    <strong>Built for TikTok, not Zoom calls.</strong>{" "}
                    Transkriptor is designed for meeting recordings and uploaded
                    audio. TokScript's Chrome extension scans entire TikTok
                    creator profiles directly from inside the app — no file
                    uploads, no manual URL pasting.
                  </div>
                </li>
                <li>
                  <span className="vs-bp-reason-icon">
                    <Check size={18} strokeWidth={2.75} />
                  </span>
                  <div>
                    <strong>3–9x cheaper for social video.</strong> Transkriptor
                    starts at $9.99/month and caps you at 300 minutes. TokScript
                    is $3.25/month with no minute cap for TikTok, Reels, and
                    Shorts transcription.
                  </div>
                </li>
                <li>
                  <span className="vs-bp-reason-icon">
                    <Check size={18} strokeWidth={2.75} />
                  </span>
                  <div>
                    <strong>Bulk and collection import.</strong> Transkriptor
                    needs you to upload individual files. TokScript lets you
                    drop in 50 social video links at once, or paste one
                    playlist URL and pull up to 5,000 videos.
                  </div>
                </li>
                <li>
                  <span className="vs-bp-reason-icon">
                    <Check size={18} strokeWidth={2.75} />
                  </span>
                  <div>
                    <strong>Creator AI agents, not meeting summaries.</strong>{" "}
                    Transkriptor generates meeting action items. TokScript's AI
                    agents generate viral hooks, scripts, and virality analysis
                    built specifically from TikTok transcript data.
                  </div>
                </li>
                <li>
                  <span className="vs-bp-reason-icon">
                    <Check size={18} strokeWidth={2.75} />
                  </span>
                  <div>
                    <strong>MCP connection to ChatGPT and Claude.</strong>{" "}
                    TokScript's MCP connector pulls your transcript library
                    directly into ChatGPT and Claude, so your AI builds
                    content from real data inside the chat. Transkriptor has
                    no MCP integration.
                  </div>
                </li>
              </ul>
            </section>

            <section id="full-comparison" className="vs-bp-section">
              <h2 className="vs-bp-h2">Full feature comparison</h2>
              <p className="vs-bp-sub">
                Every feature, side by side. Last updated June 2026.
              </p>

              <h3 className="vs-bp-h3">TikTok Creator Workflow</h3>
              <div className="vs-bp-table-wrap">
                <table className="vs-bp-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>TokScript</th>
                      <th>Transkriptor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">TikTok profile scanning</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> Chrome extension</span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Bulk social video import</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> 50 links at once</span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Collection / playlist import</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> Up to 5,000 videos</span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Viral Hook Generator</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Viral Script Writer</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Claude + ChatGPT MCP connector</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="vs-bp-h3">Storage &amp; Access</h3>
              <div className="vs-bp-table-wrap">
                <table className="vs-bp-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>TokScript</th>
                      <th>Transkriptor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Saved cloud library</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> Searchable, synced</span></td>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> Per-file storage</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Desktop dashboard</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Mobile app</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Export formats</th>
                      <td>TXT, XML, JSON</td>
                      <td>TXT, DOCX, PDF, SRT</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="vs-bp-h3">Pricing</h3>
              <div className="vs-bp-table-wrap">
                <table className="vs-bp-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>TokScript</th>
                      <th>Transkriptor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Starting price</th>
                      <td>$3.25/month (billed yearly)</td>
                      <td>$9.99/month (300 min cap)</td>
                    </tr>
                    <tr>
                      <th scope="row">Minute / usage caps</th>
                      <td><span className="vs-bp-yes"><X size={16} strokeWidth={2.75} /> None for social video</span></td>
                      <td><span className="vs-bp-no">300–3,000 min/month depending on plan</span></td>
                    </tr>
                    <tr>
                      <th scope="row">Lifetime license</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-no"><X size={16} strokeWidth={2.75} /></span></td>
                    </tr>
                    <tr>
                      <th scope="row">Free to start</th>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /></span></td>
                      <td><span className="vs-bp-yes"><Check size={16} strokeWidth={2.75} /> Free trial</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="vs-bp-footnote">
                Last updated June 2026. Transkriptor pricing from transkriptor.com/pricing.
                Feature data verified against both products' current offerings.
              </p>
            </section>

            <section id="workflow" className="vs-bp-section">
              <h2 className="vs-bp-h2">
                The workflow that changes everything
              </h2>
              <p className="vs-bp-sub">
                Transkriptor does a different job. Here's what each workflow
                actually looks like.
              </p>
              <div className="vs-bp-case">
                <div className="vs-bp-case-card vs-bp-case-card--them">
                  <p className="vs-bp-case-label">With Transkriptor</p>
                  <p className="vs-bp-case-body">
                    Upload a Zoom recording or audio file, get a transcript
                    with speaker labels and an AI meeting summary. Great for
                    calls — but if your content is on TikTok, you're still
                    copying URLs by hand and paying $10–$30/month for the
                    privilege.
                  </p>
                </div>
                <div className="vs-bp-case-card vs-bp-case-card--us">
                  <p className="vs-bp-case-label">With TokScript</p>
                  <p className="vs-bp-case-body">
                    Scan the top 5 creators in your niche from inside TikTok,
                    bulk-import their top 50 videos, save every transcript to
                    your library, and build a viral hook inside Claude —
                    all for $3.25 a month.
                  </p>
                </div>
              </div>
            </section>

            <section id="who-should-use" className="vs-bp-section">
              <h2 className="vs-bp-h2">Who should use which</h2>
              <p className="vs-bp-paragraph">
                <strong>Use Transkriptor</strong> if you transcribe Zoom calls,
                client interviews, lecture recordings, or uploaded audio files.
                It's genuinely good at that job.
              </p>
              <p className="vs-bp-paragraph">
                <strong>Use TokScript</strong> if transcripts are part of how
                you create TikTok, Instagram Reels, or YouTube Shorts content —
                scanning creators, studying what works, and building your next
                script from real viral data. At $3.25/month, it's purpose-built
                for this and a fraction of the Transkriptor price.
              </p>
            </section>

            <section id="faq" className="vs-bp-section vs-bp-section--faq">
              <h2 className="vs-bp-h2">Frequently asked questions</h2>
              <div className="vs-bp-faq">
                {VS_FAQ.map((item) => (
                  <details className="vs-bp-faq-item" key={item.title}>
                    <summary className="vs-bp-faq-q">
                      {item.title}
                      <span className="vs-bp-faq-icon" aria-hidden>+</span>
                    </summary>
                    <div className="vs-bp-faq-a">{item.content}</div>
                  </details>
                ))}
              </div>
            </section>
          </article>
        </div>

        <div className="vs-bp-final-cta-wrap">
          <EnhenceExperience
            subtitle="Scan TikTok creator profiles, bulk-import 50 videos, and save everything in a searchable cloud library — for $3.25 a month."
            cta="Try TokScript free"
            ctaHref="/sign-up"
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
