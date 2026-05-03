"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import HomeSocialProof from "@/components/HomeSocialProof";
import "../mcp/mcp.scss";
import "./cta-button.css";
import "./cx-testimonials.css";
import "./cx-stats.css";

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

const testimonials = [
  {
    name: "Steve Mellor",
    description:
      "This extension is a cheat code for content creators. Grabs transcripts in seconds and breaks down exactly what's working. If you're creating content or analyzing competitors, this is the tool you need in your stack. Stop sleeping on it.",
    avatar: "https://i.pravatar.cc/96?img=12",
  },
  {
    name: "Mubasher Khan",
    description:
      "One of the best extensions I've used. It surfaces real data on every profile, so you can finally see what's working and gain a real edge when going viral on TikTok, YouTube, and Instagram. Effortless install, instant results.",
    avatar: "https://i.pravatar.cc/96?img=33",
  },
  {
    name: "Randy Stover",
    description:
      "As a full-time creator, this tool saves me so much time it's ridiculous. Transcripts in one click, analytics on every video, and zero context switching. The hours I used to lose to copy-pasting URLs are just gone now. Honestly a game changer.",
    avatar: "https://i.pravatar.cc/96?img=51",
  },
  {
    name: "Faith Williamson",
    description:
      "I run creator campaigns for TikTok Shop brands and was juggling six tabs and overpaying for tools that pulled me out of TikTok. TokScript replaced all of it. One-click transcripts, live analytics, real-time vetting. Saves me hours every week.",
    avatar: "https://i.pravatar.cc/96?img=44",
  },
  {
    name: "Bob Atetio",
    description:
      "I love how TokScript simplifies my workflow. Pulling a full TikTok transcript with one click is a game changer for content research. The interface is clean and the MCP feature plugs straight into Claude. Highly recommended for any creator.",
    avatar: "https://i.pravatar.cc/96?img=68",
  },
];
const duplicatedTestimonials = [...testimonials, ...testimonials];

const hiwCards = [
  {
    step: "Step 01",
    title: "Research Without Breaking Flow.",
    img: "/figma-rows/Research%20without%20breaking%20flow.png?v=20260502c",
    desc: "Stay on TikTok. Keep your scroll going. The transcripts, analytics, and downloads come to you, never the other way around.",
  },
  {
    step: "Step 02",
    title: "See Data TikTok Hides.",
    img: "/figma-rows/See%20data%20tiktok%20hides.png?v=20260502c",
    desc: "Real engagement rates. Posting patterns. Virality distribution. The metrics native analytics will never show you.",
  },
  {
    step: "Step 03",
    title: "AI-Ready, Instantly.",
    img: "/figma-rows/Frame%202121457638.png?v=20260502c",
    desc: "Every transcript exports clean and timestamped, ready to drop straight into Claude or ChatGPT and skip the formatting tax.",
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
    title: "Click & Capture",
    desc: "Hear a hook you want to steal? Click the blue icon. We detect the URL, rip the transcript, and sync it to your library in about 2 seconds.",
    img: wfImg0,
  },
  {
    title: "Sidebar Mode",
    desc: "Opens a sidebar right next to the video. Copy hooks, read the script, take notes without leaving the page or losing your place.",
    img: wfImg1,
  },
  {
    title: "Right-Click Anywhere",
    desc: "Right-click any video link on any webpage to extract it without even opening it. Stay in your feed, capture what matters.",
    img: wfImg2,
  },
];

const faqs = [
  {
    q: "How do I install the Chrome Extension?",
    a: "Install it from the Chrome Web Store, pin the icon to your toolbar, and log in once with your TokScript account. You're connected. Every transcript you grab syncs to your dashboard automatically.",
  },
  {
    q: "How fast is the capture?",
    a: "About 2 seconds. Click the blue icon while you're watching a TikTok, Reel, or Short. We detect the URL, rip the transcript, and sync it straight to your library. No copy-paste, no tab switching.",
  },
  {
    q: "Can I trigger it without using my mouse?",
    a: "Yes. Set up a custom Chrome shortcut and trigger the extraction without taking your hands off the keyboard. Built for keyboard-first creators who don't want to break their flow.",
  },
  {
    q: "Where do my transcripts go?",
    a: "Every transcript syncs directly to your private TokScript dashboard. Organized, searchable, and backed up so you never lose a hook or a script idea again.",
  },
  {
    q: "What is sidebar mode?",
    a: "It opens a sidebar right next to the video so you can copy hooks, read the script, and take notes without leaving the page. The video keeps playing on one side, your research lives on the other.",
  },
  {
    q: "Can I extract a video without opening it?",
    a: "Yes. Right-click any video link on any webpage and use the context menu to extract the transcript directly. No need to open the video at all.",
  },
  {
    q: "Does the extension work with TikTok, Instagram and YouTube?",
    a: "Yes. TikTok, Instagram Reels, and YouTube Shorts are all supported. One extension, every platform you research on.",
  },
  {
    q: "Is the extension free?",
    a: "The basic Chrome Extension is included on the Free plan. Pro features like unlimited transcripts, bulk processing, and HD downloads come with the $39/year or $10/month plan.",
  },
  {
    q: "Is my data private?",
    a: "Yes. You log in directly through TokScript's servers and your transcripts only sync to your private dashboard. Nothing is shared, nothing is public.",
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

  // Scroll-driven feature spotlight: fade non-centered rows in #cx-vt-platform
  useEffect(() => {
    if (typeof window === "undefined") return;

    let obs;
    const attach = () => {
      const rows = document.querySelectorAll("#cx-vt-platform .vt-row");
      if (!rows.length) return false;
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle(
              "vt-row-active",
              entry.isIntersecting,
            );
          });
        },
        { threshold: 0, rootMargin: "-25% 0px -25% 0px" },
      );
      rows.forEach((r) => obs.observe(r));
      return true;
    };

    // Attach now, but if rows haven't rendered yet, retry on next frame.
    if (!attach()) {
      const raf = requestAnimationFrame(() => attach());
      return () => {
        cancelAnimationFrame(raf);
        obs?.disconnect();
      };
    }
    return () => obs?.disconnect();
  }, []);

  // Filter skills
  const filteredSkills = skills.filter(
    (s) => skillsFilter === "all" || s.category === skillsFilter,
  );

  return (
    <div className="mcp-page">
      <Header />

      {/* ── Hero (chatgpt.html style) ── */}
      <section id="cx-hero">
        <div className="cx-hero-aurora"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/assets/chatgpt-hero-flare.png`} alt="" /></div>
        <div className="cx-hero-inner">
          <div className="cx-hero-left">
            <div className="cx-hero-badge">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>
              Chrome Extension
            </div>
            <h1 className="cx-hero-h1">
              See What TikTok
              <br />
              Doesn&apos;t Show You.
            </h1>
            <p className="cx-hero-sub">
              One click pulls clean transcripts, hidden analytics, and HD downloads right inside your TikTok feed.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
              target="_blank"
              rel="noopener noreferrer"
              className="cx-signup-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "24px",
                height: "52px",
                padding: "0 28px 0 22px",
                background: "#ffffff",
                color: "#06091A",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                borderRadius: "18px",
                textDecoration: "none",
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
              }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                alt=""
                aria-hidden="true"
                style={{ flexShrink: 0, display: "block", width: 32, height: 32, objectFit: "contain" }}
              />
              Add TokScript To Chrome
            </a>
            <div className="cx-hero-social-proof">
              <div className="cx-hero-avatars">
                <img src="https://i.pravatar.cc/56?img=5" alt="" loading="lazy" />
                <img src="https://i.pravatar.cc/56?img=12" alt="" loading="lazy" />
                <img src="https://i.pravatar.cc/56?img=32" alt="" loading="lazy" />
                <img src="https://i.pravatar.cc/56?img=47" alt="" loading="lazy" />
              </div>
              <div className="cx-hero-rating">
                <div className="cx-hero-stars" aria-hidden="true">
                  <span className="cx-hero-stars-empty">★★★★★</span>
                  <span className="cx-hero-stars-fill">★★★★★</span>
                </div>
                <div className="cx-hero-rating-text">
                  41k+ creators
                </div>
              </div>
            </div>
          </div>
          <div className="cx-hero-right">
            <div className="cx-hero-video">
              <iframe
                src="https://www.youtube.com/embed/5m37dBH-G_g?autoplay=1&mute=1&loop=1&playlist=5m37dBH-G_g&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
                allow="autoplay; encrypted-media"
                title="TokScript Chrome Extension"
              />
              <div className="cx-hero-video-mask" />
            </div>
          </div>
        </div>

        <style>{`
          #cx-hero { position: relative; overflow: hidden; padding: 44px 0; background: #0d0d0d; }
          .cx-hero-aurora { position: absolute; bottom: 0; left: 0; width: 100%; pointer-events: none; z-index: 0; }
          .cx-hero-aurora img { width: 100%; height: auto; display: block; }
          .cx-hero-inner {
            position: relative; z-index: 2;
            display: grid;
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
            gap: clamp(1rem, 2vw, 2rem);
            width: 100%; max-width: 1440px;
            margin: 0 auto;
            padding-block: clamp(1rem, 2.5vw, 2.5rem);
            padding-inline: clamp(1.5rem, 5vw, 4rem);
            box-sizing: border-box;
            align-items: center; justify-content: center; justify-items: center;
          }
          .cx-hero-left { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; min-width: 0; padding: 0; width: 100%; justify-self: end; }
          .cx-hero-right { min-width: 0; display: flex; align-items: center; justify-content: center; padding: 0; width: 100%; justify-self: start; }
          .cx-hero-badge {
            display: inline-flex; align-items: center; gap: 8px;
            background: #202223; border-radius: 50px;
            height: 35px; padding: 0 14px 0 10px;
            font-size: 10.9px; font-weight: 500; color: #fff;
            margin-bottom: 10px;
          }
          .cx-hero-badge svg { width: 17px; height: 17px; flex-shrink: 0; }
          #cx-hero .cx-hero-h1 {
            font-size: 58px; font-weight: 700; letter-spacing: -1.8px; line-height: 64px;
            margin: 0 auto 16px; color: #fff; max-width: 100%;
          }
          #cx-hero .cx-hero-sub { font-size: 19px; color: rgba(255,255,255,.8); max-width: 580px; margin: 0 auto 24px; line-height: 1.65; font-weight: 400; }
          /* CTA button lives in ./cta-button.css for reliable cache-busting */
          .cx-hero-social-proof {
            display: inline-flex; align-items: center; gap: 12px;
            margin: 0 auto;
          }
          .cx-hero-avatars { display: inline-flex; flex-shrink: 0; }
          .cx-hero-avatars img {
            width: 36px; height: 36px; border-radius: 50%;
            border: 1px solid #fff; object-fit: cover;
            margin-left: -10px; background: #1a1a1a;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
          }
          .cx-hero-avatars img:first-child { margin-left: 0; }
          .cx-hero-rating { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; }
          .cx-hero-stars {
            position: relative; display: inline-block; font-size: 12px;
            letter-spacing: 1.5px; line-height: 1;
          }
          .cx-hero-stars-empty { color: rgba(255, 255, 255, 0.22); }
          .cx-hero-stars-fill {
            position: absolute; top: 0; left: 0;
            color: #f5b700;
            width: 84%; overflow: hidden; white-space: nowrap;
          }
          .cx-hero-rating-text {
            font-size: 12px; color: #fff;
            font-weight: 500; line-height: 1.4; white-space: nowrap;
          }
          .cx-hero-dot { margin: 0 4px; color: rgba(255,255,255,.35); }
          @media (max-width: 480px) {
            .cx-hero-rating-text { white-space: normal; text-align: left; }
          }
          .cx-hero-video {
            position: relative; width: 100%; max-width: 480px; aspect-ratio: 1/1;
            border: 2px solid #00b8b2; border-radius: 14px; overflow: hidden;
            background: #1a1a1a; box-shadow: 0 0 40px rgba(0, 184, 178,.06);
          }
          .cx-hero-video iframe {
            position: absolute; top: -60px; left: -38.9%;
            width: 177.8%; height: calc(100% + 120px);
            border: none; pointer-events: none;
          }
          .cx-hero-video-mask { position: absolute; inset: 0; z-index: 2; }
          @media (max-width: 900px) {
            .cx-hero-inner { grid-template-columns: 1fr; }
            .cx-hero-left, .cx-hero-right { justify-self: center; }
            .cx-hero-h1 { font-size: clamp(1.75rem, 7vw, 2.25rem); white-space: normal; }
            .cx-hero-sub { font-size: 16px; }
          }
        `}</style>
      </section>

      {/* ── Section 2: How It Works ── */}
      <section id="video" style={{ paddingTop: "36px", paddingBottom: "36px" }}>
        <img className="hiw-bg-texture" src={hiwBgTexture.src} alt="" />
        <style>{`
          #video .hiw-h2,
          #video .hiw-sub { white-space: nowrap; }
          #video .hiw-header-content { width: auto; max-width: 100%; }
          @media (max-width: 991px) {
            #video .hiw-h2,
            #video .hiw-sub { white-space: normal; }
          }
        `}</style>

        <div className="hiw-inner" style={{ gap: "24px" }}>
          {/* Header */}
          <div className="hiw-header-block" style={{ height: "auto" }}>
            <div className="hiw-header-content">
              <div className="hiw-pill">Why Install</div>
              <h2 className="hiw-h2">Built For People Who Actually Study TikTok.</h2>
              <p className="hiw-sub">
                Three things TikTok&apos;s interface refuses to give you, built right into the feed where you already work.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="cx-hiw-cards-outer hiw-cards-outer">
            <div className="hiw-cards-row">
              {hiwCards.map((card, i) => (
                <div className="cx-hiw-card hiw-card" key={i}>
                  <img className="hiw-card-bg-img" src={hiwCardBg.src} alt="" />
                  <h3 className="hiw-card-title">{card.title}</h3>
                  <div className="cx-hiw-card-img-wrap hiw-card-img-wrap">
                    <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${card.img}`} alt="" />
                  </div>
                  <p className="hiw-card-desc">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
        </div>
      </section>

      {/* ── Section 2b: The unfair advantage (alternating feature rows) ── */}
      <section id="cx-vt-platform" className="vt-platform-section">
        <div className="vt-platform-inner">
          <div className="vt-platform-header">
            <span className="vt-pill">The Unfair Advantage</span>
            <h2 className="vt-h2">See What TikTok Won&apos;t Show You.</h2>
            <p className="vt-sub">
              The metrics native analytics will never surface: engagement, virality, and posting patterns, pulled live on every profile you visit.
            </p>
          </div>

          {/* Row 1 — Real Engagement Metrics: text-card LEFT, visual RIGHT */}
          <div className="vt-row">
            <div className="vt-text">
              <div className="vt-text-inner">
                <h3 className="vt-row-title">Real Engagement Metrics</h3>
                <p className="vt-row-body">
                  Skip the inflated follower counts. See actual engagement broken down across views, likes, comments, shares, and bookmarks with mean and median for every metric.
                </p>
                <ul className="vt-list">
                  <li>Mean and median for every metric</li>
                  <li>Real engagement rate, not a guess</li>
                  <li>Toggle between full library or last 15 videos</li>
                  <li>Live on every creator profile</li>
                </ul>
                <a
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vt-cta"
                  style={{ height: "44px", gap: "8px", padding: "0 24px 0 20px" }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                    style={{ flexShrink: 0, display: "block", width: 20, height: 20, objectFit: "contain" }}
                  />
                  Add TokScript To Chrome
                </a>
              </div>
            </div>
            <div className="vt-visual">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Real%20Engagement%20Metrics.png?v=20260502c`}
                alt="Real Engagement Metrics"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </div>
          </div>

          {/* Row 2 — The Posting Playbook: visual LEFT, text-card RIGHT */}
          <div className="vt-row vt-row-reverse">
            <div className="vt-visual">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/The%20Posting%20Playbook.png?v=20260502c`}
                alt="The Posting Playbook"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </div>
            <div className="vt-text">
              <div className="vt-text-inner">
                <h3 className="vt-row-title">The Posting Playbook</h3>
                <p className="vt-row-body">
                  Reverse-engineer any creator&apos;s growth. See exactly when they post, how often, and which days drive their results with a full-year heatmap to track patterns over time.
                </p>
                <ul className="vt-list">
                  <li>Posts per day of the week, ranked</li>
                  <li>Daily posting frequency chart</li>
                  <li>Full-year posting heatmap with history</li>
                  <li>Spot the patterns that correlate with growth</li>
                </ul>
                <a
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vt-cta"
                  style={{ height: "44px", gap: "8px", padding: "0 24px 0 20px" }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                    style={{ flexShrink: 0, display: "block", width: 20, height: 20, objectFit: "contain" }}
                  />
                  Add TokScript To Chrome
                </a>
              </div>
            </div>
          </div>

          {/* Row 3 — Format & Duration Intelligence: text-card LEFT, visual RIGHT */}
          <div className="vt-row">
            <div className="vt-text">
              <div className="vt-text-inner">
                <h3 className="vt-row-title">Format &amp; Duration Intelligence</h3>
                <p className="vt-row-body">
                  Understand the format strategy behind every creator. See the long-versus-short split and the exact video durations that cluster at a glance.
                </p>
                <ul className="vt-list">
                  <li>Long vs Short percentage breakdown</li>
                  <li>5 duration buckets (0-15s through 90s+)</li>
                  <li>Spot the format sweet spot for any niche</li>
                  <li>Critical for building your own format strategy</li>
                </ul>
                <a
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vt-cta"
                  style={{ height: "44px", gap: "8px", padding: "0 24px 0 20px" }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                    style={{ flexShrink: 0, display: "block", width: 20, height: 20, objectFit: "contain" }}
                  />
                  Add TokScript To Chrome
                </a>
              </div>
            </div>
            <div className="vt-visual">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Format%20%26%20Duration%20Intelligence.png?v=20260502c`}
                alt="Format and Duration Intelligence"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </div>
          </div>

          {/* Row 4 — Transcripts In Bulk, From Anywhere: visual LEFT, text-card RIGHT */}
          <div className="vt-row vt-row-reverse">
            <div className="vt-visual">
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/bulk%20and%20collections%20link%20paste.png?v=20260502c`}
                alt="Transcripts In Bulk, From Anywhere"
                style={{ width: "100%", height: "auto", display: "block", borderRadius: "16px" }}
              />
            </div>
            <div className="vt-text">
              <div className="vt-text-inner">
                <h3 className="vt-row-title">Built For Bulk Research</h3>
                <p className="vt-row-body">
                  Copy any TikTok transcript to your clipboard, download HD videos without watermarks, and save cover images in original quality, all from the same panel. Or paste up to 50 TikTok links at once and drop them straight into a folder of your choice.
                </p>
                <ul className="vt-list">
                  <li>One-click transcript, HD video, and cover image</li>
                  <li>Up to 50 TikTok links per bulk paste</li>
                  <li>One collection link pulls every video inside</li>
                  <li>Transcripts land straight in your dashboard</li>
                </ul>
                <a
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="vt-cta"
                  style={{ height: "44px", gap: "8px", padding: "0 24px 0 20px" }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                    style={{ flexShrink: 0, display: "block", width: 20, height: 20, objectFit: "contain" }}
                  />
                  Add TokScript To Chrome
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dashboard spotlight (mirrors home page #up-running) ── */}
      <section id="up-running" className="up-running-section">
        <div className="ur-inner">
          <div className="ur-header">
            <span className="ur-pill">Your Dashboard</span>
            <h2 className="ur-title">Where Your Research Actually Comes Together.</h2>
            <p className="ur-sub">Everything you collect on TikTok flows into your TokScript dashboard. Transcripts, videos, profiles, and stats all in one place.</p>
          </div>
          <div className="ur-video">
            <iframe
              src="https://www.youtube.com/embed/5m37dBH-G_g?autoplay=1&mute=1&loop=1&playlist=5m37dBH-G_g&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
              allow="autoplay; encrypted-media"
              title="TokScript dashboard — where your research comes together"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ── Section 3: Who It's For ── */}
      <section id="who">
        <img className="who-bg-spiral" src={whoBgSpiral.src} alt="" />

        <div className="who-inner">
          {/* Header */}
          <div className="who-header-block cx-who-header-block" style={{ height: "auto", padding: "16px 0 0", marginBottom: "56px" }}>
            <img className="who-header-bg" src={whoHeaderBg.src} alt="" />
            <div className="who-header-content">
              <div className="who-pill">Built For The Work</div>
              <h2 className="who-h2">Who Actually Uses TokScript.</h2>
              <p className="who-sub">
                The people who study TikTok like a science, and need the data to back it up.
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
                <p className="who-card-title" style={{ top: "12px" }}>{card.title}</p>
                <div className={`who-card-img ${card.sizeClass}`}>
                  <img src={card.img.src} alt="" />
                </div>
                <p className="who-card-desc">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="who-cta">
            <a
              href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
              target="_blank"
              rel="noopener noreferrer"
              className="who-cta-btn"
              style={{ width: "auto", height: "44px", padding: "0 22px 0 18px", gap: "8px", fontSize: "14.5px", borderRadius: "16px" }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                alt=""
                aria-hidden="true"
                style={{ flexShrink: 0, display: "block", width: 20, height: 20, objectFit: "contain" }}
              />
              Add TokScript To Chrome
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats bar (replicated from homepage HomeSocialProof) ── */}
      <HomeSocialProof />

      {/* ── Section 3b: Testimonials slider ── */}
      <section
        id="cx-testimonials"
        style={{
          position: "relative",
          padding: "clamp(48px, 6vw, 96px) 0",
          backgroundImage: `url(${wfCardBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.7) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 clamp(20px, 4vw, 48px)",
          }}
        >
          <div className="cx-testimonials-header">
            <div className="hiw-pill">Loved By Creators</div>
            <h2 className="hiw-h2">What People Are Saying.</h2>
            <p className="hiw-sub">
              Creators, marketers, and researchers using TokScript to turn TikTok scrolling into structured insight.
            </p>
          </div>

          <div className="cx-testimonials-track-mask">
            <div className="cx-testimonials-track">
              {duplicatedTestimonials.map((t, i) => (
                <div className="cx-testimonial-card" key={i}>
                  <p className="cx-testimonial-quote">&ldquo;{t.description}&rdquo;</p>
                  <div className="cx-testimonial-footer">
                    <div className="cx-testimonial-author">
                      <img src={t.avatar} alt="" />
                      <div className="cx-testimonial-author-meta">
                        <h5>{t.name}</h5>
                        <span className="cx-testimonial-stars" aria-hidden="true">★★★★★</span>
                      </div>
                    </div>
                    <div className="cx-testimonial-divider" aria-hidden />
                    <div className="cx-testimonial-logo" aria-label="Chrome Web Store">
                      <img
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/chrome%20store.png`}
                        alt="Chrome Web Store"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
              <div className="fs-pill">Little Details</div>
              <h2 className="fs-h2">Little Details That Matter</h2>
              <p className="fs-sub">
                One-click capture, keyboard shortcuts, sidebar mode, right-click
                <br />
                context menu, cloud sync, all designed to keep you in the feed.
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
                Got Questions?
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

          <div className="faq-list">
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
            <p className="hiw-cta-text">Still Have Questions?</p>
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

      {/* ── Footer CTA ── */}
      <section className="mcp-cta-wrapper" style={{ padding: "40px 0" }}>
        <div className="container">
          <div
            className="mcp-cta-card"
            style={{ padding: "40px 24px 48px", maxWidth: "1080px", margin: "0 auto" }}
          >
            <div className="mcp-cta-grid" aria-hidden />
            <div className="mcp-cta-glow mcp-cta-glow--left" aria-hidden />
            <div className="mcp-cta-glow mcp-cta-glow--right" aria-hidden />

            <div className="mcp-cta-inner">
              <div className="mcp-cta-avatars cx-cta-avatars-tight">
                <span className="mcp-cta-avatar" style={{ background: "#00b8b2" }}>
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                </span>
                <span className="mcp-cta-avatar" style={{ background: "#a486d4" }}>
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="" />
                </span>
                <span className="mcp-cta-avatar" style={{ background: "#f9bd24" }}>
                  <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="" />
                </span>
                <span className="mcp-cta-avatar" style={{ background: "#f96b24" }}>
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="" />
                </span>
                <span className="mcp-cta-avatar mcp-cta-avatar--count">41K+</span>
              </div>

              <p className="mcp-cta-eyebrow" style={{ whiteSpace: "nowrap" }}>
                4.2&#9733; On The Chrome Web Store{" "}
                <span className="cx-footer-cta-dot">·</span>{" "}
                <span className="cx-eyebrow-creators">41K+ Creators</span>
              </p>

              <h2 className="mcp-cta-title">
                Stop Typing Transcripts. Stop Tab-Hopping. Start Actually Researching.
              </h2>
              <p className="mcp-cta-subtitle">
                Install TokScript and turn every TikTok scroll into a research session.
              </p>

              <div className="cx-footer-cta-actions">
                <a
                  href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cx-signup-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    height: "44px",
                    padding: "0 22px 0 18px",
                    background: "#ffffff",
                    color: "#06091A",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: "14.5px",
                    fontWeight: 500,
                    lineHeight: "23.4px",
                    borderRadius: "16.4px",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition:
                      "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                  }}
                >
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png`}
                    alt=""
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      display: "block",
                      width: 20,
                      height: 20,
                      objectFit: "contain",
                    }}
                  />
                  Add TokScript To Chrome
                </a>
                <Link href="/pricing" className="cx-footer-cta-secondary">
                  See Pricing
                </Link>
              </div>

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
