"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import "./mcp.scss";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const VideoLightbox = dynamic(
  () => import("@/components/modals/VideoLightbox"),
  { ssr: false },
);

// Hero Section
import heroClaudeLogo from "../../../assets_updated/images/mcp/hero-claude-logo.png";
import heroChatgptLogo from "../../../assets_updated/images/mcp/hero-chatgpt-logo.png";
import heroFlare from "../../../assets_updated/images/mcp/hero-flare.png";
import badgeIcon from "../../../assets_updated/images/mcp/badge-icon.svg";
import copyIcon from "../../../assets_updated/images/mcp/copy-icon.svg";
import heroVideoBg from "../../../assets_updated/images/mcp/hero-video-bg.png";
import playButtonIcon from "../../../assets_updated/images/mcp/play-button-icon.svg";

// How It Works Section
import hiwBgTexture from "../../../assets_updated/images/mcp/hiw-bg-texture.png";
import hiwHeaderBg from "../../../assets_updated/images/mcp/hiw-header-bg.png";
import hiwCardBg from "../../../assets_updated/images/mcp/hiw-card-bg.png";
import hiwStep1Img from "../../../assets_updated/images/mcp/hiw-step1-img.png";
import hiwStep2Img from "../../../assets_updated/images/mcp/hiw-step2-img.png";
import hiwStep3Img from "../../../assets_updated/images/mcp/hiw-step3-img.png";

// Who It's For Section
import whoBgSpiral from "../../../assets_updated/images/mcp/who-bg-spiral.png";
import whoHeaderBg from "../../../assets_updated/images/mcp/who-header-bg.png";
import whoCardGridBg from "../../../assets_updated/images/mcp/who-card-grid-bg.png";
import whoBrandMarketers from "../../../assets_updated/images/mcp/who-brand-marketers.png";
import whoResearchers from "../../../assets_updated/images/mcp/who-researchers.png";
import whoUgcMarketplaces from "../../../assets_updated/images/mcp/who-ugc-marketplaces.png";
import whoSoloCreator from "../../../assets_updated/images/mcp/who-solo-creator.png";
import whoAgencies from "../../../assets_updated/images/mcp/who-agencies.png";

// Setup Section
import setupBg from "../../../assets_updated/images/mcp/setup-bg.png";
import setupClaudeIcon from "../../../assets_updated/images/mcp/setup-claude-icon.svg";
import setupChatgptIcon from "../../../assets_updated/images/mcp/setup-chatgpt-icon.png";
import setupVideoThumb from "../../../assets_updated/images/mcp/setup-video-thumb.png";
import setupPlayIcon from "../../../assets_updated/images/mcp/setup-play-icon.svg";
import setupImageClaude from "../../../assets_updated/images/mcp/setupImageClaude.png";
import setupImageChatgpt from "../../../assets_updated/images/mcp/setutImageChatgpt.png";

// Free Skills Section
import fsBgBottom from "../../../assets_updated/images/mcp/fs-bg-bottom.png";
import fsHeaderBg from "../../../assets_updated/images/mcp/fs-header-bg.png";
import fsBannerSummary from "../../../assets_updated/images/mcp/fs-banner-summary.jpg";
import fsBadgeSummary from "../../../assets_updated/images/mcp/fs-badge-summary.svg";
import fsBannerHooks from "../../../assets_updated/images/mcp/fs-banner-hooks.jpg";
import fsBadgeHooks from "../../../assets_updated/images/mcp/fs-badge-hooks.svg";
import fsBannerRepurpose from "../../../assets_updated/images/mcp/fs-banner-repurpose.jpg";
import fsBadgeRepurpose from "../../../assets_updated/images/mcp/fs-badge-repurpose.svg";
import fsBannerEngagement from "../../../assets_updated/images/mcp/fs-banner-engagement.jpg";
import fsBadgeEngagement from "../../../assets_updated/images/mcp/fs-badge-engagement.svg";
import fsIconClaude from "../../../assets_updated/images/mcp/fs-icon-claude.svg";
import fsIconChatgpt from "../../../assets_updated/images/mcp/fs-icon-chatgpt.svg";
import fsIconLinkedin from "../../../assets_updated/images/mcp/fs-icon-linkedin.svg";
import fsIconX from "../../../assets_updated/images/mcp/fs-icon-x.svg";
import fsIconTwitter from "../../../assets_updated/images/mcp/fs-icon-twitter.svg";
import fsCopyIcon from "../../../assets_updated/images/mcp/fs-copy-icon.svg";
import fsDownloadSkill from "../../../assets_updated/images/mcp/fs-download-skill.svg";
import fsDownload from "../../../assets_updated/images/mcp/fs-download.svg";
import fsCopyIconAlt from "../../../assets_updated/images/mcp/fs-copy-icon-alt.svg";
import fsDownloadSkillAlt from "../../../assets_updated/images/mcp/fs-download-skill-alt.svg";
import fsDownloadAlt from "../../../assets_updated/images/mcp/fs-download-alt.svg";

// Before & After Section
import baBg from "../../../assets_updated/images/mcp/ba-bg.png";
import baHeaderBgL2 from "../../../assets_updated/images/mcp/ba-header-bg-l2.png";
import baHeaderBgL1 from "../../../assets_updated/images/mcp/ba-header-bg-l1.png";
import baCardBg from "../../../assets_updated/images/mcp/ba-card-bg.png";
import baBeforeCompetitor from "../../../assets_updated/images/mcp/ba-before-competitor.png";
import baAfterCompetitor from "../../../assets_updated/images/mcp/ba-after-competitor.png";
import baBeforeScripting from "../../../assets_updated/images/mcp/ba-before-scripting.png";
import baAfterScripting from "../../../assets_updated/images/mcp/ba-after-scripting.png";
import baBeforeBriefing from "../../../assets_updated/images/mcp/ba-before-briefing.png";
import baAfterBriefing from "../../../assets_updated/images/mcp/ba-after-briefing.png";

// Workflows Section
import wfCardBg from "../../../assets_updated/images/mcp/wf-card-bg.png";
import wfImg0 from "../../../assets_updated/images/mcp/wf-img-0.png";
import wfImg1 from "../../../assets_updated/images/mcp/wf-img-1.png";
import wfImg2 from "../../../assets_updated/images/mcp/wf-img-2.png";

// CTA Section
import ctaBg from "../../../assets_updated/images/mcp/cta-bg.png";
import ctaClaudeLogo from "../../../assets_updated/images/mcp/cta-claude-logo.png";
import ctaChatgptLogo from "../../../assets_updated/images/mcp/cta-chatgpt-logo.png";

// ── Data Arrays ──

const sparkles = [
  {
    dx: "-60px",
    dur: "2.8s",
    delay: "0s",
    left: "230px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.9)",
  },
  {
    dx: "40px",
    dur: "3.2s",
    delay: ".5s",
    left: "270px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.8)",
  },
  {
    dx: "-20px",
    dur: "2.5s",
    delay: "1s",
    left: "250px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(255,255,255,.5)",
  },
  {
    dx: "70px",
    dur: "3.6s",
    delay: ".2s",
    left: "220px",
    w: "3px",
    bg: "#00b8b2",
    shadow: "0 0 5px 2px rgba(0, 184, 178,.6)",
  },
  {
    dx: "-80px",
    dur: "2.9s",
    delay: "1.4s",
    left: "290px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 3px 1px rgba(255,255,255,.7)",
  },
  {
    dx: "30px",
    dur: "3.1s",
    delay: ".8s",
    left: "240px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 5px 2px rgba(0, 184, 178,.7)",
  },
  {
    dx: "-50px",
    dur: "2.6s",
    delay: "2s",
    left: "260px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.5)",
  },
  {
    dx: "90px",
    dur: "3.4s",
    delay: ".3s",
    left: "200px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.9)",
  },
  {
    dx: "-30px",
    dur: "2.7s",
    delay: "1.7s",
    left: "310px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(255,255,255,.4)",
  },
  {
    dx: "55px",
    dur: "3.0s",
    delay: "2.3s",
    left: "245px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 5px 2px rgba(0, 184, 178,.8)",
  },
  {
    dx: "-70px",
    dur: "3.3s",
    delay: ".6s",
    left: "275px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 3px 1px rgba(255,255,255,.6)",
  },
  {
    dx: "20px",
    dur: "2.4s",
    delay: "1.2s",
    left: "235px",
    w: "3px",
    bg: "#00b8b2",
    shadow: "0 0 6px 3px rgba(0, 184, 178,.5)",
  },
  {
    dx: "-45px",
    dur: "3.5s",
    delay: ".4s",
    left: "320px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(255,255,255,.7)",
  },
  {
    dx: "65px",
    dur: "2.6s",
    delay: "1.9s",
    left: "180px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.8)",
  },
  {
    dx: "-15px",
    dur: "3.0s",
    delay: "2.6s",
    left: "255px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 3px 1px rgba(255,255,255,.5)",
  },
  {
    dx: "50px",
    dur: "2.8s",
    delay: ".9s",
    left: "215px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 5px 2px rgba(0, 184, 178,.7)",
  },
  {
    dx: "-90px",
    dur: "3.2s",
    delay: "1.5s",
    left: "285px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.6)",
  },
  {
    dx: "35px",
    dur: "2.7s",
    delay: "2.1s",
    left: "300px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.9)",
  },
  {
    dx: "-55px",
    dur: "3.4s",
    delay: ".1s",
    left: "195px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 3px 1px rgba(255,255,255,.6)",
  },
  {
    dx: "80px",
    dur: "2.9s",
    delay: "1.1s",
    left: "265px",
    w: "3px",
    bg: "#00b8b2",
    shadow: "0 0 6px 3px rgba(0, 184, 178,.6)",
  },
  {
    dx: "-35px",
    dur: "3.1s",
    delay: "2.8s",
    left: "225px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 4px 2px rgba(255,255,255,.5)",
  },
  {
    dx: "10px",
    dur: "2.5s",
    delay: "1.6s",
    left: "340px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 4px 2px rgba(0, 184, 178,.7)",
  },
  {
    dx: "-75px",
    dur: "3.6s",
    delay: ".7s",
    left: "170px",
    w: "2px",
    bg: "#fff",
    shadow: "0 0 3px 1px rgba(255,255,255,.8)",
  },
  {
    dx: "45px",
    dur: "2.3s",
    delay: "2.4s",
    left: "280px",
    w: "2px",
    bg: "#00b8b2",
    shadow: "0 0 5px 2px rgba(0, 184, 178,.5)",
  },
];

const hiwCards = [
  {
    step: "Step 01",
    title: "Copy the URL above",
    img: hiwStep1Img,
    desc: "Hit the copy button, one URL is all it takes to link TokScript to your AI.",
  },
  {
    step: "Step 02",
    title: "Open Claude or ChatGPT",
    img: hiwStep2Img,
    desc: "Go to Settings \u2192 Connectors \u2192 Add Custom Connector, then paste the URL.",
  },
  {
    step: "Step 03",
    title: "Log in. Done.",
    img: hiwStep3Img,
    desc: "Authenticate with your TokScript account. Your entire library is now in your AI.",
  },
];

const whoCards = [
  {
    num: 1,
    title: "Brand Marketers",
    img: whoBrandMarketers,
    desc: "Competitive intelligence through precise transcript and messaging analysis.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 2,
    title: "Researchers",
    img: whoResearchers,
    desc: "Large-scale data extraction to identify patterns and emerging tropes.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 3,
    title: "UGC Marketplaces",
    img: whoUgcMarketplaces,
    desc: "Provide your creator network with high-performing templates from real-time data.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 4,
    title: "Solo Creator",
    img: whoSoloCreator,
    desc: "Instant conversion from viral trends to structured, actionable scripts.",
    sizeClass: "who-card-img-lg",
  },
  {
    num: 5,
    title: "Agencies",
    img: whoAgencies,
    desc: "Automating high-performing script templates for creator rosters.",
    sizeClass: "who-card-img-lg",
  },
];

const skills = [
  {
    category: "summary",
    banner: fsBannerSummary,
    badge: fsBadgeSummary,
    badgeLabel: "Summary",
    uses: "11.3k uses",
    icons: [fsIconClaude, fsIconChatgpt],
    title: "Executive Summary",
    desc: "Condense any transcript into a crisp 3-paragraph summary with key takeaways.",
    tags: ["Summary", "Productivity"],
    prompt:
      "You are a senior communications consultant who specialises in distilling complex content into clear, executive-ready briefings. Your task is to produce a...",
    copyIcon: fsCopyIcon,
    downloadSkillIcon: fsDownloadSkill,
    downloadIcon: fsDownload,
  },
  {
    category: "hooks",
    banner: fsBannerHooks,
    badge: fsBadgeHooks,
    badgeLabel: "Hooks",
    uses: "8.4k uses",
    icons: [fsIconClaude, fsIconChatgpt],
    title: "Viral Hook Generator",
    desc: "Turn your transcript into 5 scroll-stopping opening hooks that grab attention in the first 3 seconds.",
    tags: ["TikTok", "Reels", "Viral"],
    prompt:
      "You are a world-class viral content strategist with deep expertise in short-form video psychology, scroll-stopping copywriting, and platform-specific audience behaviour...",
    copyIcon: fsCopyIcon,
    downloadSkillIcon: fsDownloadSkill,
    downloadIcon: fsDownload,
  },
  {
    category: "summary",
    banner: fsBannerSummary,
    badge: fsBadgeSummary,
    badgeLabel: "Summary",
    uses: "6.9k uses",
    icons: [fsIconClaude, fsIconChatgpt],
    title: "Action Items Extractor",
    desc: "Pull every explicit and implied action item from a transcript into a clean task list.",
    tags: ["Productivity", "Tasks", "Meeting"],
    prompt:
      "You are a professional executive assistant and project manager who has mastered turning messy meeting recordings and video transcripts into crisp, accountable...",
    copyIcon: fsCopyIcon,
    downloadSkillIcon: fsDownloadSkill,
    downloadIcon: fsDownload,
  },
  {
    category: "repurpose",
    banner: fsBannerRepurpose,
    badge: fsBadgeRepurpose,
    badgeLabel: "Repurpose",
    uses: "6.2k uses",
    icons: [fsIconLinkedin, fsIconX],
    title: "LinkedIn Thread Converter",
    desc: "Convert a video transcript into a high-performing LinkedIn carousel or text thread.",
    tags: ["LinkedIn", "B2B", "Thread"],
    prompt:
      "You are a B2B LinkedIn content expert who has helped dozens of thought leaders grow to 50,000+ followers. Your task is to transform the transcript below into a high-performing 7-part LinkedIn text thread...",
    copyIcon: fsCopyIconAlt,
    downloadSkillIcon: fsDownloadSkillAlt,
    downloadIcon: fsDownloadAlt,
  },
  {
    category: "engagement",
    banner: fsBannerEngagement,
    badge: fsBadgeEngagement,
    badgeLabel: "Engagement",
    uses: "5.5k uses",
    icons: [fsIconLinkedin, fsIconX],
    title: "Comment Bait Questions",
    desc: "Generate 10 engagement-driving questions to pin as a comment or use in a caption.",
    tags: ["Comments", "Engagement", "Community"],
    prompt:
      "You are a social media engagement specialist who has grown comment sections to thousands of replies. Generate 10 high-engagement questions from the transcript below that bait genuine responses...",
    copyIcon: fsCopyIconAlt,
    downloadSkillIcon: fsDownloadSkillAlt,
    downloadIcon: fsDownloadAlt,
  },
  {
    category: "repurpose",
    banner: fsBannerRepurpose,
    badge: fsBadgeRepurpose,
    badgeLabel: "Repurpose",
    uses: "5.0k uses",
    icons: [fsIconLinkedin, fsIconTwitter],
    title: "Twitter/X Thread (10 posts)",
    desc: "Transform a transcript into a tightly-crafted 10-post Twitter/X thread built for engagement.",
    tags: ["Twitter/X", "Thread", "Virality"],
    prompt:
      "You are a viral Twitter/X strategist who has built threads with 10M+ impressions. Transform the transcript below into a punchy 10-post thread optimised for maximum reach and retweets...",
    copyIcon: fsCopyIconAlt,
    downloadSkillIcon: fsDownloadSkillAlt,
    downloadIcon: fsDownloadAlt,
  },
];

const slides = [
  {
    title: "Competitor Intelligence",
    beforeImg: baBeforeCompetitor,
    afterImg: baAfterCompetitor,
    beforeDesc:
      "Open 10 tabs, watch videos, take notes by hand, try to spot patterns across creators in your niche.",
    afterDesc:
      "\u201CResearch the top 5 creators in my niche and tell me what they have in common.\u201D Done in under 30 seconds.",
  },
  {
    title: "Rapid Scripting",
    beforeImg: baBeforeScripting,
    afterImg: baAfterScripting,
    beforeDesc:
      "Try to remember what made your last video work, guess at a hook, write something, delete it, start over.",
    afterDesc:
      "Pull your top 5 scripts, generate 20 hooks, pick the best one, and have a full script written in one conversation.",
  },
  {
    title: "Automated Briefing",
    beforeImg: baBeforeBriefing,
    afterImg: baAfterBriefing,
    beforeDesc:
      "Spend hours writing briefs with no real data, guessing at structures that might work based on intuition alone.",
    afterDesc:
      "Analyze top-performing content in your niche and get a proven brief structure ready in 10 minutes.",
  },
];

const workflows = [
  {
    title: "Weekly Competitor Intelligence Report",
    desc: "Analyze the top 5 creators to instantly decode viral hooks. Sync with trending sounds for three content strategies.",
    img: wfImg0,
  },
  {
    title: "Content Idea to Ready-to-Shoot Script",
    desc: "Turn any content idea into a fully structured, ready-to-shoot script with hooks, body, and CTA, all in one conversation.",
    img: wfImg1,
  },
  {
    title: "Brand Partnership Creator Research",
    desc: "Shortlist niche creators to compare engagement and content fit. Analyze audience breakdowns to generate data-backed pitch briefs.",
    img: wfImg2,
  },
];

const faqs = [
  {
    q: "How do I get a TikTok video transcript inside ChatGPT or Claude?",
    a: "Connect your TokScript account using our MCP connector, then paste any TikTok, Instagram Reel, or YouTube Short URL directly into the chat. The AI returns the full transcript with timestamps, engagement stats, hashtags, audio info, and metadata instantly. No extensions, no tab switching. Just paste the link and ask.",
  },
  {
    q: "Can I bulk transcribe multiple TikTok videos at once with AI?",
    a: "Yes. Paste up to 50 video URLs into a single message and the connector transcribes them all automatically. You can mix TikTok, Instagram, and YouTube links in the same batch. You can also paste a TikTok collection or playlist URL to import and transcribe every video in it. Bulk features require a Pro or Premium plan.",
  },
  {
    q: "What data does TokScript return through the MCP connector?",
    a: "Every video returns the full transcript, title, author, duration, views, likes, comments, shares, bookmarks, publish date, hashtags, audio track name, audio URL, and thumbnail. For TikTok profiles, you get follower count, following count, total likes, and video count. It's the complete dataset, same as what you get on the website.",
  },
  {
    q: "Is TokScript's MCP connector free to use?",
    a: "Yes, the connector works on every plan including Free. Free users get 5 transcriptions per day with full data per video. Pro and Premium ($39/year or $10/month) unlock unlimited transcriptions, bulk processing, collection imports, HD video downloads, and bulk cover image downloads. All MCP usage counts against your regular plan limits.",
  },
  {
    q: "Can I download TikTok videos without watermarks using Claude or ChatGPT?",
    a: "Yes. Ask the AI to download any TikTok or Instagram video and you'll get an HD download link with no watermark. Bulk downloads support up to 50 videos per request. YouTube video downloads are not supported due to platform restrictions, but YouTube transcription and cover image downloads work fine. Video downloads require Pro or Premium.",
  },
  {
    q: "Is my data secure when using TokScript through Claude or ChatGPT?",
    a: "Yes. You log in directly on TokScript's servers through OAuth, so your credentials are never shared with the AI platform. All data flows through encrypted servers with the same security as the TokScript website. You can revoke access anytime from your AI platform's settings.",
  },
  {
    q: "What's the difference between using TokScript on the website versus through AI?",
    a: 'Same engine, same data, same quality. The difference is that through AI you type what you want in plain English instead of clicking buttons. The real power is chained analysis: "transcribe these 20 videos and tell me which hooks performed best" and the AI handles the entire workflow in one conversation. Your library syncs across both, so anything saved on the website shows up in AI and vice versa.',
  },
  {
    q: "Does it work with Cursor or Windsurf?",
    a: "Claude and ChatGPT are live now. Support for Cursor, Windsurf, and other AI tools is coming soon. Join the waitlist on the pricing page to be notified first.",
  },
  {
    q: "I'm already a TokScript subscriber. What do I do?",
    a: "Just copy the connector URL at the top of this page, paste it into Claude or ChatGPT, and log in with your existing TokScript account. No upgrade needed, it's included in your current plan.",
  },
];

const ctaFeatures = [
  "No credits",
  "No per-use charges",
  "Cancel anytime",
  "28 tools included",
  "Claude + ChatGPT",
];

// ── Component ──

export default function PageData() {
  const [urlCopied, setUrlCopied] = useState(false);
  const [ctaUrlCopied, setCtaUrlCopied] = useState(false);
  const [setupTab, setSetupTab] = useState("claude");
  const [skillsFilter, setSkillsFilter] = useState("all");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeWorkflow, setActiveWorkflow] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [setupVideoOpen, setSetupVideoOpen] = useState(false);
  const baCarouselRef = useRef(null);

  const MCP_URL = "https://api.tokscript.com/mcp";
  const signUpUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`;

  // Copy URL handler
  const copyUrl = () => {
    navigator.clipboard.writeText(MCP_URL).catch(() => {});
    setUrlCopied(true);
    setTimeout(() => setUrlCopied(false), 2000);
  };

  const copyCtaUrl = () => {
    navigator.clipboard.writeText(MCP_URL).catch(() => {});
    setCtaUrlCopied(true);
    setTimeout(() => setCtaUrlCopied(false), 2000);
  };

  // Carousel navigation
  const totalSlides = slides.length;
  const goToSlide = (n) => {
    setCarouselIndex(((n % totalSlides) + totalSlides) % totalSlides);
  };

  // Scroll reveal
  useEffect(() => {
    const reveals = document.querySelectorAll(".mcp-page .reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.07 },
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 6) * 0.07 + "s";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Filter skills
  const filteredSkills = skills.filter(
    (s) => skillsFilter === "all" || s.category === skillsFilter,
  );

  return (
    <div className="mcp-page">
      <Header />

      {/* ── Section 1: Hero ── */}
      <section id="hero">
        {/* Floating AI logos */}
        <img
          className="hero-claude-logo"
          src={heroClaudeLogo.src}
          alt="Claude"
        />
        <img
          className="hero-chatgpt-logo"
          src={heroChatgptLogo.src}
          alt="ChatGPT"
        />

        {/* Flare */}
        <div className="hero-flare">
          <img src={heroFlare.src} alt="" />
        </div>

        {/* Main content */}
        <div className="hero-body">
          <div className="badge">
            <img src={badgeIcon.src} alt="" />
            New Feature
          </div>
          <h1>
            Tokscript now works inside
            <br />
            Claude and ChatGPT
          </h1>
          <p className="hero-sub">
            Ask your AI to pull transcripts, generate hooks, analyze virality,
            and research creators from any TikTok, Instagram Reel, or YouTube
            Short. Directly in conversation.
          </p>
          <div className="url-bar">
            <span className="url-bar-text">api.tokscript.com/mcp</span>
            <button
              className={`url-bar-copy${urlCopied ? " ok" : ""}`}
              onClick={copyUrl}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "15px",
                  height: "15px",
                  flexShrink: 0,
                }}
              >
                {urlCopied ? (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path
                      d="M2.5 8L5.5 11L12.5 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <img
                    src={copyIcon.src}
                    alt=""
                    style={{
                      width: "15px",
                      height: "15px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                )}
              </span>
              {urlCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Video card */}
        <div className="hero-video-section">
          <div className="container">
            <div className="hero-video">
              <div className="hero-video-bg" />
              <div className="main-img-wrapper">
                <img
                  // className="who-header-bg"
                  src={heroVideoBg.src}
                  alt="heroVideoBg"
                />
              </div>
              <div className="hero-video-glow" />
              <div className="hero-video-fade" />
              <button
                className="hero-play-btn"
                onClick={() => setVideoOpen(true)}
              >
                <img
                  src={playButtonIcon.src}
                  alt=""
                  style={{
                    width: "24px",
                    height: "24px",
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
                Play Video
              </button>
            </div>
          </div>
        </div>

        {/* Sparkles */}
        <div className="hero-sparkles">
          {sparkles.map((s, i) => (
            <span
              key={i}
              style={{
                "--dx": s.dx,
                "--dur": s.dur,
                "--delay": s.delay,
                left: s.left,
                width: s.w,
                height: s.w,
                background: s.bg,
                boxShadow: s.shadow,
              }}
            />
          ))}
        </div>

        <div className="hero-bottom-fade" />
      </section>

      {/* ── Section 2: How It Works ── */}
      <section id="video">
        <img className="hiw-bg-texture" src={hiwBgTexture.src} alt="" />

        <div className="hiw-inner">
          {/* Header */}
          <div className="hiw-header-block">
            <img className="hiw-header-bg" src={hiwHeaderBg.src} alt="" />
            <div className="hiw-header-content">
              <div className="hiw-pill">How it works</div>
              <h2 className="hiw-h2">Getting Started with Tokscript MCP</h2>
              <p className="hiw-sub">
                Integrate TokScript into your AI workflow in under 60 seconds.
                Copy your unique MCP URL, connect it to your preferred LLM, and
                start extracting viral data instantly.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="hiw-cards-outer">
            <div className="hiw-cards-row">
              {hiwCards.map((card, i) => (
                <div className="hiw-card" key={i}>
                  <img className="hiw-card-bg-img" src={hiwCardBg.src} alt="" />
                  <p className="hiw-step-label">{card.step}</p>
                  <h3 className="hiw-card-title">{card.title}</h3>
                  <div className="hiw-card-img-wrap">
                    <img src={card.img.src} alt="" />
                  </div>
                  <p className="hiw-card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="hiw-cta">
            <p className="hiw-cta-text">Don&apos;t have an account?</p>
            <Link href="/app/sign-up" className="hiw-cta-btn">
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 3: Who It's For ── */}
      <section id="who">
        <img className="who-bg-spiral" src={whoBgSpiral.src} alt="" />

        <div className="who-inner">
          {/* Header */}
          <div className="who-header-block">
            <img className="who-header-bg" src={whoHeaderBg.src} alt="" />
            <div className="who-header-content">
              <div className="who-pill">Who It&apos;s For</div>
              <h2 className="who-h2">
                Built for Anyone Who Works With Short-Form Video
              </h2>
              <p className="who-sub">
                TokScript MCP bridges the gap between viral trends and
                structured content data. Move beyond manual research with a
                unified intelligence layer built for your existing AI workspace.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="who-cards-outer">
            {whoCards.map((card) => (
              <div className={`who-card who-card-${card.num}`} key={card.num}>
                <img
                  className="who-card-grid-bg"
                  src={whoCardGridBg.src}
                  alt=""
                />
                <p className="who-card-title">{card.title}</p>
                <div className={`who-card-img ${card.sizeClass}`}>
                  <img src={card.img.src} alt="" />
                </div>
                <p className="who-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="who-cta">
            <p className="who-cta-text">Don&apos;t have an account?</p>
            <Link href="/app/sign-up" className="who-cta-btn">
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 4: Setup ── */}
      <section id="setup">
        {/* Outer card */}
        <div className="setup-card">
          {/* bg image */}
          <img className="setup-bg" src={setupBg.src} alt="" />

          {/* Get Started button */}
          <a href={signUpUrl} className="setup-cta-btn">
            Get Started
          </a>

          {/* Inner content column */}
          <div className="setup-content">
            {/* Title + tab toggle */}
            <div className="setup-title-wrap">
              <h2 className="setup-h2">How To Set Tokscript MCP Up</h2>
              {/* Tab toggle */}
              <div className="setup-tabs">
                <button
                  className="setup-tab"
                  onClick={() => setSetupTab("claude")}
                  style={{
                    border:
                      setupTab === "claude"
                        ? "1px solid #00b8b2"
                        : "1.04px solid rgba(255,255,255,0.1)",
                    background:
                      setupTab === "claude"
                        ? "#1c1c1c"
                        : "radial-gradient(ellipse at bottom right,rgba(255,255,255,0.09) 0%,rgba(128,128,128,0.045) 50%,transparent 100%)",
                  }}
                >
                  <img
                    src={setupClaudeIcon.src}
                    alt=""
                    style={{ width: "15.5px", height: "15.5px", flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "12.8px",
                      fontWeight: 600,
                      color:
                        setupTab === "claude"
                          ? "#00b8b2"
                          : "rgba(255,255,255,0.48)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    For Claude
                  </span>
                </button>
                <button
                  className="setup-tab"
                  onClick={() => setSetupTab("chatgpt")}
                  style={{
                    border:
                      setupTab === "chatgpt"
                        ? "1px solid #00b8b2"
                        : "1.04px solid rgba(255,255,255,0.1)",
                    background:
                      setupTab === "chatgpt"
                        ? "#1c1c1c"
                        : "radial-gradient(ellipse at bottom right,rgba(255,255,255,0.09) 0%,rgba(128,128,128,0.045) 50%,transparent 100%)",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "15.58px",
                      height: "15.58px",
                      flexShrink: 0,
                      overflow: "hidden",
                      opacity: setupTab === "chatgpt" ? 1 : 0.7,
                    }}
                  >
                    <img
                      src={setupChatgptIcon.src}
                      alt=""
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        height: "99.05%",
                        width: "336.91%",
                        maxWidth: "none",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "12.8px",
                      fontWeight: 600,
                      color:
                        setupTab === "chatgpt"
                          ? "#00b8b2"
                          : "rgba(255,255,255,0.48)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    For ChatGpt
                  </span>
                </button>
              </div>
            </div>

            {/* How it works panel */}
            <div className="setup-panel">
              {/* Inner dark card */}
              <div className="setup-inner-card">
                {/* Left column: title + video */}
                <div className="setup-left">
                  <p className="setup-left-title">How it works</p>
                  <p className="setup-left-sub">
                    Paste video links and get clean transcripts in seconds.
                  </p>
                  {/* Setup image based on active tab */}
                  <div
                    className="setup-image-wrapper"
                    onClick={() => setSetupVideoOpen(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        setupTab === "chatgpt"
                          ? setupImageChatgpt.src
                          : setupImageClaude.src
                      }
                      alt={
                        setupTab === "chatgpt"
                          ? "ChatGPT setup"
                          : "Claude setup"
                      }
                      className="setup-image"
                    />
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                        width: "40px",
                        height: "40px",
                        borderRadius: "9999px",
                        background: "rgba(0,0,0,0.7)",
                        backdropFilter: "blur(2px)",
                        WebkitBackdropFilter: "blur(2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={setupPlayIcon.src}
                        alt=""
                        style={{
                          width: "16px",
                          height: "16px",
                          position: "relative",
                          left: "1px",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right column: 3 steps */}
                <div className="setup-right">
                  {/* Step 1 */}
                  <div className="setup-step setup-step-1">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        background: "rgba(0,184,178,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Roboto',sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#00b8b2",
                        }}
                      >
                        1
                      </span>
                    </div>
                    <div className="text-wrapper">
                      <p className="setup-step-title">Copy MCP link</p>
                      <div className="url-bar-mini">
                        <span className="url-bar-mini-text">
                          api.tokscript.com/mcp
                        </span>
                        <button
                          className={`url-bar-mini-copy${urlCopied ? " ok" : ""}`}
                          onClick={copyUrl}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "11px",
                              height: "11px",
                              flexShrink: 0,
                            }}
                          >
                            {urlCopied ? (
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 15 15"
                                fill="none"
                              >
                                <path
                                  d="M2.5 8L5.5 11L12.5 4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <img
                                src={copyIcon.src}
                                alt=""
                                style={{
                                  width: "11px",
                                  height: "11px",
                                  objectFit: "contain",
                                  display: "block",
                                }}
                              />
                            )}
                          </span>
                          {urlCopied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="setup-step setup-step-2">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        background: "rgba(0,184,178,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Roboto',sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#00b8b2",
                        }}
                      >
                        2
                      </span>
                    </div>
                    <div className="text-wrapper">
                      <p className="setup-step-title">Paste link</p>
                      <p className="setup-step-body">
                        Go to Settings &gt; Connectors &gt; Add custom connector
                        then paste the link.
                      </p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="setup-step setup-step-3">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "9999px",
                        background: "rgba(0,184,178,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Roboto',sans-serif",
                          fontSize: "10px",
                          fontWeight: 700,
                          color: "#00b8b2",
                        }}
                      >
                        3
                      </span>
                    </div>
                    <div className="text-wrapper">
                      <p className="setup-step-title">Log in and done</p>
                      <p className="setup-step-body">
                        Log in with your TokScript account and that&apos;s it!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Free Skills ── */}
      {/* <section id="freeskills">
        <img className="fs-bg-bottom" src={fsBgBottom.src} alt="" />

        <div className="fs-inner">
          <div className="fs-header-block">
            <img className="fs-header-bg" src={fsHeaderBg.src} alt="" />
            <div className="fs-header-content">
              <div className="fs-pill">Free Skills</div>
              <h2 className="fs-h2">Try It Today With Free Skills</h2>
              <p className="fs-sub">
                Pre-built prompts you can drop into Claude or ChatGPT right now.
                Pick one,
                <br />
                copy the prompt, and start.
              </p>
            </div>
          </div>

          <div className="fs-tabs">
            {["all", "summary", "hooks", "repurpose", "engagement"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`fs-tab${skillsFilter === cat ? " fs-tab-active" : ""}`}
                  onClick={() => setSkillsFilter(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ),
            )}
          </div>

          <div className="fs-cards">
            {filteredSkills.map((skill, i) => (
              <div className="fs-card" key={i}>
                <div className="fs-card-banner">
                  <img src={skill.banner.src} alt="" />
                </div>
                <div className="fs-card-meta">
                  <div className="fs-card-badge">
                    <img src={skill.badge.src} alt="" />
                    {skill.badgeLabel}
                  </div>
                  <div className="fs-card-meta-right">
                    <span className="fs-card-uses">{skill.uses}</span>
                    <div className="fs-card-icons">
                      {skill.icons.map((icon, j) => (
                        <img key={j} src={icon.src} alt="" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="fs-card-body">
                  <p className="fs-card-title">{skill.title}</p>
                  <p className="fs-card-desc">{skill.desc}</p>
                  <div className="fs-card-tags">
                    {skill.tags.map((tag, j) => (
                      <span className="fs-card-tag" key={j}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="fs-card-prompt">{skill.prompt}</div>
                  <button className="fs-card-show">
                    &rarr; Show full prompt
                  </button>
                </div>
                <div className="fs-card-actions">
                  <button className="fs-btn fs-btn-copy">
                    <img src={skill.copyIcon.src} alt="" /> Copy
                  </button>
                  <button className="fs-btn" style={{ flex: 1 }}>
                    <img src={skill.downloadSkillIcon.src} alt="" /> Download
                    Skill
                  </button>
                  <button className="fs-btn">
                    <img src={skill.downloadIcon.src} alt="" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Link href="/pricing" className="fs-cta">
            Sign Up Today To Access More Skills
          </Link>
        </div>
      </section> */}

      {/* ── Section 6: Before & After ── */}
      <section id="beforeafter">
        <img className="ba-bg" src={baBg.src} alt="" />
        <div className="ba-inner">
          {/* Header */}
          <div className="ba-header-block">
            <div className="ba-header-bg">
              <img className="ba-header-bg-l2" src={baHeaderBgL2.src} alt="" />
              <img className="ba-header-bg-l1" src={baHeaderBgL1.src} alt="" />
            </div>
            <div className="ba-header-content">
              <div className="ba-pill">Before &amp; After</div>
              <h2 className="ba-title">
                From Manual Guesswork to
                <br />
                Automated Viral Systems
              </h2>
              <p className="ba-subtitle">
                Replace manual research with automated viral systems. Build
                data-backed scripts and scale your creative output in seconds.
              </p>
            </div>
          </div>

          {/* Carousel */}
          <div className="ba-carousel-outer" ref={baCarouselRef}>
            <div
              className="ba-track"
              style={{
                transform: `translateX(-${carouselIndex * (baCarouselRef.current?.offsetWidth || 1100)}px)`,
              }}
            >
              {slides.map((slide, i) => (
                <div className="ba-slide" key={i}>
                  <p className="ba-slide-title">{slide.title}</p>
                  <div className="ba-cards-row">
                    <div className="ba-card ba-before">
                      <img className="ba-card-bg" src={baCardBg.src} alt="" />
                      <span className="ba-card-label">Before</span>
                      <img
                        className="ba-card-img"
                        src={slide.beforeImg.src}
                        alt="Before"
                      />
                      <p className="ba-card-desc">{slide.beforeDesc}</p>
                    </div>
                    <div className="ba-card ba-after">
                      <img className="ba-card-bg" src={baCardBg.src} alt="" />
                      <span className="ba-card-label">After</span>
                      <img
                        className="ba-card-img"
                        src={slide.afterImg.src}
                        alt="After"
                      />
                      <p className="ba-card-desc">{slide.afterDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="ba-nav">
            <button
              className="ba-arrow"
              onClick={() => goToSlide(carouselIndex - 1)}
            >
              &#8592;
            </button>
            <div className="ba-dots">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`ba-dot${carouselIndex === i ? " active" : ""}`}
                  onClick={() => goToSlide(i)}
                />
              ))}
            </div>
            <button
              className="ba-arrow"
              onClick={() => goToSlide(carouselIndex + 1)}
            >
              &#8594;
            </button>
          </div>

          {/* CTA */}
          <div className="ba-cta-wrap">
            <Link href="/pricing" className="ba-cta">
              Deploy These Workflows
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 7: Workflows ── */}
      <section id="workflows">
        <div className="wf-card">
          <img className="wf-card-bg" src={wfCardBg.src} alt="" />

          {/* Header */}
          <div className="wf-header">
            <div className="wf-pill">Workflows</div>
            <h2 className="wf-title">Real Workflows, Not Isolated Tools</h2>
            <p className="wf-subtitle">
              The power isn&apos;t in individual tools. It&apos;s in chaining
              them together in a single conversation.
            </p>
          </div>

          {/* Panel */}
          <div className="wf-panel">
            {/* Left: accordion items */}
            <div className="wf-left">
              {workflows.map((wf, i) => (
                <React.Fragment key={i}>
                  <div
                    className={`wf-item${activeWorkflow === i ? " active" : ""}`}
                    onClick={() => setActiveWorkflow(i)}
                  >
                    <div className="wf-item-header">{wf.title}</div>
                    <p className="wf-item-desc">{wf.desc}</p>
                  </div>
                  {i < workflows.length - 1 && <div className="wf-divider" />}
                </React.Fragment>
              ))}
            </div>
            <div className="wf-divider d-block d-md-none" />

            {/* Right: images */}
            <div className="wf-images">
              {workflows.map((wf, i) => (
                <img
                  key={i}
                  className={`wf-img wf-img-${i}${activeWorkflow === i ? " active" : ""}`}
                  src={wf.img.src}
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="wf-cta-wrap">
            <a href={signUpUrl} className="wf-cta">
              Sign Up Now
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 8: FAQ ── */}
      <section id="faq">
        <div className="wrap">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "11px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 14px",
                borderRadius: "20px",
                fontSize: "12px",
                color: "#fff",
                background:
                  "linear-gradient(#0d0d0d,#0d0d0d) padding-box,linear-gradient(135deg,#00b8b2,rgba(255,255,255,.12)) border-box",
                border: "0.5px solid transparent",
              }}
            >
              FAQ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <h2
                style={{
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "-1.4px",
                  lineHeight: 1.12,
                  margin: 0,
                  maxWidth: "568px",
                  width: "100%",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.48)",
                  margin: 0,
                  lineHeight: 1.65,
                  maxWidth: "730px",
                  width: "100%",
                }}
              >
                The power isn&apos;t in individual tools. It&apos;s in chaining
                them together in a single conversation.
              </p>
            </div>
          </div>

          <div className="faq-list reveal">
            {faqs.map((faq, i) => (
              <div className="faq-item" key={i}>
                <button
                  className={`faq-q${openFaq === i ? " open" : ""}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  {faq.q}
                  <span className="faq-icon">+</span>
                </button>
                <div className={`faq-a${openFaq === i ? " open" : ""}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          {/* Help center CTA */}
          <div className="hiw-cta" style={{ marginTop: "40px" }}>
            <p className="hiw-cta-text">Still have questions?</p>
            <a
              href="https://help.tokscript.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hiw-cta-btn"
            >
              Visit Help Center
            </a>
          </div>
        </div>
      </section>

      {/* ── Section 9: CTA ── */}
      <section id="cta">
        <div className="cta-container">
          {/* bg image */}
          <img className="cta-bg" src={ctaBg.src} alt="" />
          {/* left deco (Claude logo) */}
          <img className="cta-logo-claude" src={ctaClaudeLogo.src} alt="" />
          {/* right deco (ChatGPT logo) */}
          <img className="cta-logo-chatgpt" src={ctaChatgptLogo.src} alt="" />
          {/* content */}
          <div className="cta-content">
            <h2 className="cta-title">
              One Plan&nbsp;
              <br />
              Unlimited Intelligence
            </h2>
            <p className="cta-subtitle">
              Unlimited transcripts. All three AI agents. Bulk processing. HD
              downloads.
              <br />
              Creator intelligence. 100+ languages. Claude and ChatGPT.
            </p>
            <div className="cta-features">
              {ctaFeatures.map((feat, i) => (
                <span
                  key={i}
                  style={{
                    display: "flex",
                    gap: "6px",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <span style={{ color: "#00b8b2", fontWeight: 700 }}>
                    {"\u2713"}
                  </span>{" "}
                  {feat}
                </span>
              ))}
            </div>
            {/* URL input */}
            <div className="cta-url-bar">
              <span className="cta-url-text">
                https://api.tokscript.com/mcp
              </span>
              <button className="cta-copy-btn" onClick={copyCtaUrl}>
                {ctaUrlCopied ? (
                  "\u2713 Copied!"
                ) : (
                  <>
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <VideoLightbox
        show={videoOpen}
        onHide={() => setVideoOpen(false)}
        videoUrl={
          videoOpen
            ? "https://www.youtube.com/embed/5m37dBH-G_g?autoplay=1&mute=0&rel=0&modestbranding=1&color=white"
            : ""
        }
      />
      <VideoLightbox
        show={setupVideoOpen}
        onHide={() => setSetupVideoOpen(false)}
        videoUrl={
          setupVideoOpen
            ? setupTab === "chatgpt"
              ? "https://www.youtube.com/embed/rl39iLfyre4?autoplay=1&mute=1&rel=0&modestbranding=1&color=white"
              : "https://www.youtube.com/embed/lfpVSGkCKcc?autoplay=1&mute=1&rel=0&modestbranding=1&color=white"
            : ""
        }
      />

      <Footer />
    </div>
  );
}
