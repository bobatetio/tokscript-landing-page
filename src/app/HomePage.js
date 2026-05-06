"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import "./mcp/mcp.scss";
const ShareBar = dynamic(() => import("@/components/ShareBar"));
import { getPlatformCopy } from "./platformContent";
import magicIcon from "../assets/images/icons/magicIcon.svg";
import ClaudeIcon from "../assets/images/icons/ai/ClaudeIcon";
import ChatGPTIcon from "../assets/images/icons/ai/ChatGPTIcon";
import coverImg from "../assets/images/icons/coverImg.svg";
import downloadIcon from "../assets/images/icons/download-lg.svg";
import generateIcon from "../assets/images/icons/generate-viral.svg";
import scriptIcon from "../assets/images/icons/script.svg";
import analyzeImg from "../assets/images/icons/analyze.svg";
import { IoLockClosed, FaBolt, FaSearch, FaChevronDown, FaTiktok, FaInstagram, FaYoutube, HiLanguage } from "@/components/Icons";
const Footer = dynamic(() => import("../components/Footer"));
import Link from "next/link";
import Image from "next/image";
import tiktok1Icon from "../assets/images/icons/tiktok1-icon.svg";
import instagram1Icon from "../assets/images/icons/insta1-con.svg";
import youtube1Icon from "../assets/images/icons/youtube1-icon.svg";
import bulkProcess from "../assets/images/bulking-process.webp";
import bulkInstagramImg from "../assets/images/bulk-import-instagram.png";
import cloudInstagramImg from "../assets/images/cloud-instagram.png";
import historyInstagramImg from "../assets/images/history-instagram.png";
import hdVideoInstagramImg from "../assets/images/hd-video-instagram.png";
import urlShortcutInstagramImg from "../assets/images/url-shortcut-instagram.png";
import aiAgentsInstagramImg from "../assets/images/ai-agents-instagram.png";
import bulkYoutubeImg from "../assets/images/bulk-youtube.png";
import cloudYoutubeImg from "../assets/images/cloud-youtube.png";
import historyYoutubeImg from "../assets/images/history-youtube.png";
import hdVideoYoutubeImg from "../assets/images/hd-video-youtube.png";
import videoToTextYoutubeImg from "../assets/images/video-to-text-youtube.png";
import translateYoutubeImg from "../assets/images/translate-youtube.png";
import urlShortcutYoutubeImg from "../assets/images/url-shortcut-youtube.png";
import aiAgentsYoutubeImg from "../assets/images/ai-agents-youtube.png";
import cloudSync from "../assets/images/cloud.webp";
import historyImg from "../assets/images/history-img.webp";
import mediaImg from "../assets/images/media-dwnld.webp";
import excessImg from "../assets/images/excess-method.webp";
import extensionImg from "../assets/images/extension-panel.webp";
import workspceImg from "../assets/images/ai-dashboard.webp";
import collectImg from "../assets/images/collection-import.webp";
import teamworkImg from "../assets/images/team-workspace.webp";
const LoadingScreenComponent = dynamic(() => import("@/components/LoadingScreenComponent"));
import axios from "axios";
import unlockImg from "../assets/images/UnLock-agent.webp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { LemonProducts } from "@/components/LemonProducts";
import { LemonProductsStaging } from "@/components/LemonProductsStaging";
import {
  Check,
  X,
  Crown,
  ArrowRight,
  Sparkles,
  Layers,
  TrendingUp,
} from "lucide-react";
import { getDeviceFingerprint } from "@/lib/deviceFingerprint";

// Dynamic imports for below-fold & user-triggered components
const FaqSection = dynamic(() => import("../components/FaqSection"));
const ProcessComponent = dynamic(() => import("@/components/ProcessComponent"));
const VideoLargeComponent = dynamic(() => import("@/components/VideoLargeComponent"));
const TokToolsFeatures = dynamic(() => import("@/components/TokToolsFeatures"));
const EnhenceExperience = dynamic(() => import("@/components/EnhenceExperience"));
const HeroFloatingIcons = dynamic(() => import("@/components/HeroFloatingIcons"), { ssr: false });
const WhoItsFor = dynamic(() => import("@/components/WhoItsFor"));
const ViralMomentsCarousel = dynamic(() => import("@/components/ViralMomentsCarousel"), { ssr: false });
const HomeSocialProof = dynamic(() => import("@/components/HomeSocialProof"), { ssr: false });
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), { ssr: false });
const VideoHoverThumb = dynamic(() => import("@/components/VideoHoverThumb"), { ssr: false });
const CounterComponent = dynamic(() => import("@/components/CounterComponent"));
const LegalDisclaimer = dynamic(() => import("@/components/LegalDisclaimer"));
const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const CheckoutOverlay = dynamic(() => import("@/components/modals/CheckoutOverlay"), { ssr: false });
const DemoPage = dynamic(() => import("@/components/modals/DemoPage"), { ssr: false });
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });

// Icon Components
const TikTokIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.069 1.646.069 4.849 0 3.205-.012 3.584-.069 4.849-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.265.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.849C2.295 5.785 2.569 4.518 3.544 3.543c.975-.975 2.242-1.249 3.608-1.311C8.417 2.175 8.796 2.163 12 2.163zm0 1.802c-3.141 0-3.515.012-4.756.069-.928.043-1.852.166-2.426.74-.574.574-.697 1.498-.74 2.426-.057 1.241-.069 1.615-.069 4.8 0 3.184.012 3.558.069 4.799.043.928.166 1.852.74 2.426.574.574 1.498.697 2.426.74 1.241.057 1.615.069 4.756.069 3.141 0 3.515-.012 4.756-.069.928-.043 1.852-.166 2.426-.74.574-.574.697-1.498.74-2.426.057-1.241.069-1.615.069-4.799 0-3.185-.012-3.559-.069-4.8-.043-.928-.166-1.852-.74-2.426-.574-.574-1.498-.697-2.426-.74-1.241-.057-1.615-.069-4.756-.069zm0 3.063A4.972 4.972 0 1 1 12 17.0a4.972 4.972 0 0 1 0-9.972zm0 8.207a3.235 3.235 0 1 0 0-6.47 3.235 3.235 0 0 0 0 6.47zm6.406-8.41a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z"/>
  </svg>
);

const YoutubeIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Feature Component
const Feature = ({ text, excluded = false, bold = false, sub = "" }) => (
  <div className="feature-item">
    <div className="icon-box">
      {excluded ? (
        <X size={10} strokeWidth={3} />
      ) : (
        <Check size={10} strokeWidth={3} />
      )}
    </div>
    <div style={{ lineHeight: 1 }}>
      <div className="feat-text" style={{ fontWeight: bold ? 700 : "normal" }}>
        {text}
      </div>
      {sub && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "#7a7a7a",
            marginTop: "0.25rem",
            lineHeight: "1.2",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  </div>
);

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const featureCards = [
  {
    icon: `${BP}/figma-rows/ai-cover.png`,
    title: "Save cover image",
    description: "Download HD cover images",
    imageBgClass: "blue",
    href: "#download-img",
  },
  {
    icon: `${BP}/figma-rows/ai-video.png`,
    title: "Download HD video",
    description: "No watermarks, full quality",
    imageBgClass: "orange",
    href: "#download-video",
  },
  {
    icon: `${BP}/figma-rows/ai-viral.png`,
    title: "Generate Viral Hooks",
    description: "Create viral hooks instantly",
    imageBgClass: "red",
    href: "#generate-hooks",
  },
  {
    icon: `${BP}/figma-rows/ai-script.png`,
    title: "Rewrite scripts",
    description: "Turn transcripts to viral videos",
    imageBgClass: "purple",
    href: "#rewrite-scripts",
  },
  {
    icon: `${BP}/figma-rows/ai-analyze.png`,
    title: "Analyze Virality",
    description: "Learn why video went viral",
    imageBgClass: "pink",
    href: "#analyze-virality",
  },
];
const priceCard = [
  {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
    features: [
      "Download 25 TikTok transcripts",
      "History & bookmarking",
      "Quick URL download",
      "Chrome Extension (with free features)",
      "Instagram Reels: up to 3 per day",
      "YouTube Shorts: up to 3 per day",
    ],
    recommanded: false,
    plan: "free",
    img: unlockImg,
  },
  {
    title: "Pro Annual ",
    description: "Everything in the Monthly Plan, at a huge discount.",
    price: "$25",
    period: "/ per year",
    features: [
      "Unlimited transcripts & bulk downloads",
      "Unlimited Reels & Shorts",
      "Access to 3 AI Agents: (Create viral hooks, Generate new scripts and Analyze videos)",
      "Advanced downloads (video, cover, collections, playlists)",
      "Chrome Extension (full features)",
      "Unlimited quick URL downloads",
      "AI download formats: .txt, .xml, .json, .csv",
    ],
    recommanded: false,
    plan: "annual",
    img: unlockImg,
  },
  {
    title: "Pro Monthly ",
    description: "For creators & marketers who want full power",
    price: "$5",
    period: "/ per month",
    features: [
      "Unlimited transcript downloads",
      "Bulk transcript downloads (up to 50 at once)",
      "Instagram Reels & YouTube Shorts (unlimited)",
      "Download extras: cover image, video",
      "Download collections & playlists ",
      "Access to 3 AI Agents: (Create viral hooks, Generate new scripts and Analyze videos)",
      "Chrome Extension (with paid features)",
      "Quick URL download (unlimited)",
      "AI download formats: .txt, .xml, .json, .csv",
    ],
    recommanded: true,
    plan: "monthly",
    img: unlockImg,
  },
];

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "pt", name: "Portuguese" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Mandarin" },
  { code: "fr", name: "French" },
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
];

const FREE_DAILY_LIMIT = 5;

export default function LandingPage({ platform = "tiktok" } = {}) {
  const copy = getPlatformCopy(platform);
  const [dontMissOutModalShow, setDontMissOutModalShow] = useState(false);
  const [freeUsedToday, setFreeUsedToday] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("annual");
  const translateRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState("none");
  const [translateDropdownOpen, setTranslateDropdownOpen] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [bulkData, setBulkData] = useState(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [processingUrls, setProcessingUrls] = useState([]);
  const [selectedBulkItem, setSelectedBulkItem] = useState(null);
  const [selectedBulkIndex, setSelectedBulkIndex] = useState(null);
  const processRef = useRef(null);
  const videoDetailRef = useRef(null);
  const router = useRouter();

  // CheckoutOverlay states
  const [checkoutOverlayShow, setCheckoutOverlayShow] = useState(false);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);

  // Filter plans based on active tab
  const getFilteredPlans = (plans, activeTab, isLoggedIn = false) => {
    if (!plans) return [];

    switch (activeTab) {
      case "monthly":
        return plans.filter(
          (plan) =>
            plan.title?.toLowerCase().includes("monthly") ||
            plan.title?.toLowerCase().includes("basic") ||
            (plan.title?.toLowerCase().includes("pro") &&
              !plan.title?.toLowerCase().includes("annual")),
        );
      case "annual":
        return plans.filter(
          (plan) =>
            plan.title?.toLowerCase().includes("annual") ||
            plan.title?.toLowerCase().includes("yearly"),
        );
      case "free":
        return plans.filter((plan) =>
          plan.title?.toLowerCase().includes("free"),
        );
      default:
        return plans;
    }
  };

  const getProduct = async () => {
    // try {
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_API_URL}/subscription/plans`
    //   );
    //   const _product = response.data;
    //   setProductsData(_product);
    //   setLoading(false);
    // } catch (error) {
    //   console.error(error);
    //   setLoading(false);
    // }
    var responsed;
    if (process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID == "782434") {
      responsed = LemonProducts();
    } else {
      responsed = LemonProductsStaging();
    }
    setProductsData(responsed);
  };
  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken"); // Use authToken to match backend
    if (userData && storedToken) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser && parsedUser?.plan !== "free") {
          window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
        }
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }

    getProduct();
  }, []);
  useEffect(() => {
    setIsClient(true);
    try {
      const today = new Date().toISOString().slice(0, 10);
      const used = parseInt(
        localStorage.getItem(`tk_free_count_${today}`) || "0",
        10,
      ) || 0;
      setFreeUsedToday(used);
    } catch (e) { /* ignore */ }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setProfile(response?.data?.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  // Scroll-driven feature spotlight: fade non-centered rows in #vt-platform
  useEffect(() => {
    if (typeof window === "undefined") return;
    const rows = document.querySelectorAll("#vt-platform .vt-row, #platform-about .vt-row");
    if (!rows.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("vt-row-active", entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: "-38% 0px -38% 0px" }
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, []);

  // Close translate dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        translateRef.current &&
        !translateRef.current.contains(event.target)
      ) {
        setTranslateDropdownOpen(false);
      }
    };

    if (translateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [translateDropdownOpen]);

  const handleDontMissOutModalClose = () => {
    setDontMissOutModalShow(false);
  };
  const handleDontMissOutModalShow = () => {
    setDontMissOutModalShow(true);
  };

  // Function to detect multiple links in the textarea
  const detectMultipleLinks = (text) => {
    if (!text.trim()) return [];

    // Regular expression to match URLs (TikTok, Instagram, YouTube links)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = text.match(urlRegex) || [];

    // Also check for line breaks as link separators
    const lines = text
      .split(/[\n\r]+/)
      .filter((line) => line.trim().length > 0);

    // If we have multiple lines or multiple URLs, treat as multiple links
    if (lines.length > 1 || links.length > 1) {
      return lines.length > links.length ? lines : links;
    }

    return links;
  };

  // Handle the send button click with multiple link detection
  const handleSendClick = () => {
    const links = detectMultipleLinks(videoLink);

    if (links.length > 1) {
      if (!user || user == null) {
        // Free / guest user — bulk is gated; surface the upgrade modal.
        setDontMissOutModalShow(true);
        return;
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}`;
      }
    } else {
      // Single link - proceed with normal fetchTikTokData
      if (!user || user == null) {
        // Client-side daily-quota gate (server is the real source of truth)
        try {
          const today = new Date().toISOString().slice(0, 10);
          const used = parseInt(
            localStorage.getItem(`tk_free_count_${today}`) || "0",
            10,
          ) || 0;
          if (used >= FREE_DAILY_LIMIT) {
            setDontMissOutModalShow(true);
            return;
          }
        } catch (e) { /* ignore */ }
        fetchTikTokData();
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href =
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}` +
          (selectedLanguage !== "none" ? `&translate=${selectedLanguage}` : "");
      }
    }
  };

  // Handle bulk processing for guest/free users
  const handleGuestBulkProcessing = async (links) => {
    // Check localStorage first — blocks repeat attempts even if fingerprint/IP change
    try {
      if (localStorage.getItem('tokscript_bulk_used')) {
        setDontMissOutModalShow(true);
        setError("You have already used your free bulk processing. Sign up for unlimited access.");
        return;
      }
    } catch (e) { /* localStorage unavailable */ }

    const deviceFingerprint = getDeviceFingerprint();
    if (!deviceFingerprint) {
      setError("Unable to generate device fingerprint");
      return;
    }

    // Limit to 30 URLs
    const urlsToProcess = links.slice(0, 30);

    // Detect platform from first URL to choose the right endpoint
    const firstUrl = urlsToProcess[0].toLowerCase();
    let platform = "tiktok";
    if (firstUrl.includes("youtube.com") || firstUrl.includes("youtu.be")) {
      platform = "youtube";
    } else if (
      firstUrl.includes("instagram.com") ||
      firstUrl.includes("instagr.am")
    ) {
      platform = "instagram";
    }

    setIsBulkProcessing(true);
    setBulkData(null);
    setError("");
    setVideoData(null);
    setProcessingUrls(urlsToProcess);
    setSelectedBulkItem(null);
    setSelectedBulkIndex(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${platform}/bulk`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            urls: urlsToProcess,
            deviceFingerprint,
            targetLanguage:
              selectedLanguage !== "none" ? selectedLanguage : null,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "bulk_already_used") {
          setDontMissOutModalShow(true);
          setError(
            "You have already used your free bulk processing. Sign up for unlimited access.",
          );
        } else {
          setError(data.message || data.error || "Failed to process bulk URLs");
        }
        return;
      }

      setBulkData(data);

      // Mark bulk as used in localStorage to prevent repeat usage
      try {
        localStorage.setItem('tokscript_bulk_used', 'true');
      } catch (e) { /* localStorage unavailable */ }

      // Auto-select the first completed item
      const bulkItems = data?.transcript?.bulkItems || [];
      const firstCompleteIndex = bulkItems.findIndex(
        (item) => item.status === "complete" || item.status === "unavailable",
      );
      if (firstCompleteIndex !== -1) {
        setSelectedBulkItem(bulkItems[firstCompleteIndex]);
        setSelectedBulkIndex(firstCompleteIndex);
      }

      // Scroll to the process component area
      setTimeout(() => {
        processRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Bulk processing error:", error);
      setError(error.message || "Failed to process bulk URLs");
    } finally {
      setIsBulkProcessing(false);
    }
  };

  // Handle clicking a bulk item to view its details
  const handleBulkItemClick = (item, index) => {
    setSelectedBulkItem(item);
    setSelectedBulkIndex(index);
    // Auto-scroll to video detail on mobile
    if (window.innerWidth < 768) {
      setTimeout(() => {
        videoDetailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Transform a bulk item into the videoData format expected by VideoLargeComponent/TokToolsFeatures
  const transformBulkItemToVideoData = (item) => {
    if (!item) return null;
    return {
      data: {
        id: null,
        desc: item.title || "",
        video: {
          cover: item.thumbnail || null,
          downloadAddr: null,
        },
        author: {
          uniqueId: item.username || item.author?.username || "",
        },
      },
      subtitles: item.transcript || "",
    };
  };

  const fetchTikTokData = async () => {
    if (!videoLink.trim()) {
      setError("Please enter a valid video link");
      return;
    }

    setIsLoading(true);
    setError("");
    setVideoData(null);

    try {
      // Get user's IP address
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;

      // Get device fingerprint for usage tracking
      const deviceFingerprint = getDeviceFingerprint();

      let paramValues = {
        video: videoLink.trim(),
        get_transcript: "true",
        ip: userIP,
      };

      if (selectedLanguage !== "none") {
        paramValues.language = selectedLanguage;
      }
      const queryParams = new URLSearchParams(paramValues);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tiktok/fetchTikTokData?${queryParams}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deviceFingerprint }),
        },
      );

      // ✅ Proper error handling
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const msg = String(errorData?.error || "").toLowerCase();
        const isQuotaError =
          response.status === 429 ||
          !!errorData?.upgradeUrl ||
          msg.includes("limit") ||
          msg.includes("usage") ||
          msg.includes("sign up");
        if (isQuotaError) {
          // Sync local counter so the quota pill matches the server's view
          try {
            const today = new Date().toISOString().slice(0, 10);
            localStorage.setItem(`tk_free_count_${today}`, String(FREE_DAILY_LIMIT));
            setFreeUsedToday(FREE_DAILY_LIMIT);
          } catch (e) { /* ignore */ }
          setDontMissOutModalShow(true);
        }
        throw new Error(
          errorData.error || `Failed to process video: ${response.statusText}`,
        );
      }

      const data = await response.json();

      // Increment client-side daily counter (UX hint only — server is source of truth)
      try {
        const today = new Date().toISOString().slice(0, 10);
        const key = `tk_free_count_${today}`;
        const next = (parseInt(localStorage.getItem(key) || "0", 10) || 0) + 1;
        localStorage.setItem(key, String(next));
        setFreeUsedToday(next);
      } catch (e) { /* ignore */ }

      // Stash in sessionStorage and navigate to dedicated result page
      const id =
        (data?.data?.id && String(data.data.id)) ||
        Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      try {
        sessionStorage.setItem(`tk_transcript_${id}`, JSON.stringify(data));
      } catch (e) { /* sessionStorage unavailable */ }
      router.push(`/transcript/${id}`);
    } catch (error) {
      console.error("Error fetching TikTok data:", error);
      setError(error.message || "Failed to fetch video data");
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced checkout handler with authentication check
  const handleCheckout = async (product) => {
    console.log("product", product);
    // Build buyUrl from product data (handle both transformed and raw product formats)
    const buyUrl =
      product?.buyUrl ||
      `https://tokscript.lemonsqueezy.com/checkout/buy/${product?.attributes?.slug}`;

    console.log("buyUrl", buyUrl);
    console.log("user", user);
    console.log("token", token);

    // Check if user is logged in
    if (!user || !token) {
      // Open CheckoutOverlay modal instead of redirecting
      setPendingCheckoutUrl(buyUrl);
      setPendingPlan({
        name: product?.title || product?.attributes?.name || "Pro Plan",
        price: product?.price || product?.attributes?.price_formatted || "$39",
        period: (product?.title || product?.attributes?.name || "")
          ?.toLowerCase()
          ?.includes("annual")
          ? "/year"
          : "/month",
        badge: (product?.title || product?.attributes?.name || "")
          ?.toLowerCase()
          ?.includes("annual")
          ? "Save $81/year"
          : null,
        features: [
          "Viral Hook Generator",
          "Viral Script Generator",
          "Unlimited transcripts",
          "Unlimited Translations",
          "Bulk Import (50 Videos)",
          "HD Video Downloads",
          "Chrome Extension Pro",
          "All Export Formats",
          "Priority Support",
          "Commercial Use",
        ],
        buttonText: "Continue to Checkout",
      });
      setCheckoutOverlayShow(true);
      return;
    }

    const productId = product?.id || product?.variantId || "monthly";
    setLoadingStates((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    try {
      // Direct LemonSqueezy URL (primary method)
      const checkoutUrl =
        buyUrl +
        `?checkout[email]=${encodeURIComponent(
          user.email,
        )}&checkout[name]=${encodeURIComponent(
          user.name || user.email,
        )}&checkout[custom][user_id]=${user?.id || user._id}`;

      console.log("Redirecting to checkout:", checkoutUrl);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Unable to initiate checkout. Please try again.");
    } finally {
      setLoadingStates((prevState) => ({
        ...prevState,
        [productId]: false,
      }));
    }
  };

  // Function to open the confirmation dialog for upgrade
  const openConfirmation = (variantId, plan) => {
    setSelectedProductId(variantId);
    setSelectedPlan(plan);
    setShowConfirmation(true);
  };

  // Handle upgrade click to open confirmation modal
  const handleUpgradeClick = (variantId, plan) => {
    openConfirmation(variantId, plan);
  };

  // Function to handle the upgrade confirmation
  const handleConfirmation = async (confirmed) => {
    setShowConfirmation(false);
    if (confirmed && selectedProductId && selectedPlan) {
      setLoadingStates((prevState) => ({
        ...prevState,
        [selectedProductId]: true,
      }));

      try {
        // Find the selected plan details to get product information
        const selectedPlanDetails = allPlans.find(
          (plan) => plan.variantId === selectedProductId,
        );
        const billingCycle =
          selectedPlan.toLowerCase().includes("annual") ||
          selectedPlan.toLowerCase().includes("year")
            ? "yearly"
            : "monthly";

        const requestPayload = {
          plan: "pro",
          billingCycle: billingCycle,
          variantId: selectedProductId,
          productId: selectedPlanDetails?.productId || null, // Include product ID if available
        };

        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/subscription/change-plan`,
          requestPayload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200 || response.status === 201) {
          toast.success("Subscription updated successfully");
          // Update user data in localStorage
          const updatedUser = {
            ...user,
            plan: selectedPlan.toLowerCase(),
            subscription: {
              ...user.subscription,
              lemonSqueezyVariantId: selectedProductId,
              billingCycle: billingCycle,
            },
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          window.location.reload();
        } else {
          toast.error("Error while updating subscription");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error(
          error.response?.data?.message || "Error while updating subscription",
        );
      } finally {
        setLoadingStates((prevState) => ({
          ...prevState,
          [selectedProductId]: false,
        }));
      }
    }
  };

  // Static free plan
  const freePlan = {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
    features: [
      "Download 5 TikTok Transcripts /day",
      "Download HD videos (no watermark) + Cover Images ",
      "Chrome Extension (free features)",
      "History & Bookmarking Dashboard",
      "Quick URL method: just add tokscript.com/",
      "Export in multiple formats: .txt, .xml, .json, .csv",
    ],
  };

  // Static features for paid plans
  const paidPlanFeatures = [
    "Unlimited transcripts & bulk downloads",
    "Unlimited translations to any language",
    "Bulk import 50 video links at once",
    "Instagram Reels & YouTube Shorts (unlimited)",
    "Download HD videos (no watermark) + Cover Images",
    "Download TikTok Collections & Playlists",
    "Chrome Extension with all Pro Features",
    "Quick URL method: just add tokscript.com/",
    "Export in multiple formats: .txt, .xml, .json, .csv",
  ];

  // Transform API data to match our component structure
  const transformPlansData = () => {
    // Use index 2 to match pricing/PageData.js approach (product id 782434)
    const variants = productsData?.data?.[2]?.variants;
    const productId = productsData?.data?.[2]?.id;
    if (!variants) return [];

    const plans = [];

    // Find monthly and annual variants
    const monthlyVariant = variants.find(
      (v) =>
        v.attributes.interval === "month" &&
        v.attributes.status === "published",
    );
    const annualVariant = variants.find(
      (v) =>
        v.attributes.interval === "year" && v.attributes.status === "published",
    );

    if (monthlyVariant) {
      plans.push({
        title: "Pro Monthly",
        description: "For creators & marketers who want full power",
        price: `$${(monthlyVariant.attributes.price / 100).toFixed(0)}`,
        period: "/ per month",
        features: paidPlanFeatures,
        img: unlockImg,
        variantId: monthlyVariant.id,
        productId: productId, // Include product ID
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${monthlyVariant.attributes.slug}`,
        recommanded: true, // Make Monthly plan recommended
      });
    }

    if (annualVariant) {
      plans.push({
        title: "Pro Annual",
        description: "Everything in the Monthly Plan, at a huge discount.",
        price: `$${(annualVariant.attributes.price / 100).toFixed(0)}`,
        period: "/ per year",
        features: paidPlanFeatures,
        img: unlockImg,
        variantId: annualVariant.id,
        productId: productId, // Include product ID
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${annualVariant.attributes.slug}`,
        recommanded: false, // Annual plan not recommended
      });
    }

    return plans;
  };

  // Combine free plan with API plans
  const allPlans = [freePlan, ...transformPlansData()];

  return (
    <div className={`landing-page ${copy.accentClass}`}>
      <Header />
      <main className="inner-page">
        <div className="banner-section">
          <div className="banner-flare" aria-hidden="true">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${
                platform === "instagram"
                  ? "/figma-rows/Instagram%20Flare.png"
                  : platform === "youtube"
                    ? "/figma-rows/Youtube%20Flare.png"
                    : "/assets/chatgpt-hero-flare.png"
              }`}
              alt=""
            />
          </div>
          <HeroFloatingIcons />
          <div className="container">
            <div className="inner-section">
              <div className="banner-content-wrapper">
                <button className="ai-btn">
                  <Image src={magicIcon} alt="AI icon" width={20} height={20} priority />
                  AI Powered
                </button>
                {/* <div className="stats-badge">
                  <div className="stat-item">
                    <span className="stat-value">2.6M+</span>
                    <span className="stat-label">VIDEOS PROCESSED</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">41K+</span>
                    <span className="stat-label">ACTIVE USERS</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">99%</span>
                    <span className="stat-label">ACCURACY</span>
                  </div>
                </div> */}
                <h1 className="cyan-pink-gradient w-600 large">
                  {copy.heroH1}{" "}
                </h1>
                <p>
                  {copy.heroSub}
                </p>
              </div>
              {/* <div className="link-field-wrapper">
                <textarea
                  type="text"
                  placeholder="Paste up to 50 video links here (or tiktok collection)"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                <button
                  className="btn-style"
                  onClick={handleSendClick}
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : videoLink.trim()
                      ? "Download"
                      : "Scan Videos"}
                  <FaBolt />
                </button>
              </div> */}
              <div
                className={`chat-input-container${error ? " has-error" : ""}`}
              >
                <textarea
                  placeholder={error || copy.inputPlaceholder}
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
                <div className="chat-input-toolbar">
                  <div className="toolbar-left">
                    <div className="translate-wrapper" ref={translateRef}>
                      <button
                        className={`translate-btn ${selectedLanguage !== "none" ? "active" : ""}`}
                        onClick={() =>
                          setTranslateDropdownOpen(!translateDropdownOpen)
                        }
                      >
                        <HiLanguage />
                        <span>
                          {selectedLanguage === "none"
                            ? "Translate"
                            : LANGUAGES.find((l) => l.name === selectedLanguage)
                                ?.name}
                        </span>
                        <FaChevronDown
                          className={`chevron ${translateDropdownOpen ? "open" : ""}`}
                        />
                      </button>
                      {translateDropdownOpen && (
                        <div className="translate-dropdown">
                          {LANGUAGES.map((lang) => (
                            <button
                              key={lang.code}
                              className={`translate-option ${selectedLanguage === lang.code ? "selected" : ""}`}
                              onClick={() => {
                                setSelectedLanguage(lang.name);
                                setTranslateDropdownOpen(false);
                              }}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="toolbar-right">
                    <button
                      className={`send-btn ${videoLink.trim() ? "active" : ""}`}
                      onClick={handleSendClick}
                      disabled={isLoading || isBulkProcessing}
                    >
                      <FaSearch />
                      {(() => {
                        if (isLoading || isBulkProcessing) return "Processing...";
                        const linkCount = videoLink
                          .split(/[\s,]+/)
                          .filter(Boolean).length;
                        return linkCount > 1 ? "Scan Videos" : "Scan Video";
                      })()}
                    </button>
                  </div>
                </div>
              </div>
              <p className="helper-text">{copy.bottomCopy}</p>
              {!user && (
                <div
                  className="free-quota-pill"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    margin: "8px auto 0",
                    padding: "6px 14px",
                    borderRadius: 999,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color:
                      freeUsedToday >= FREE_DAILY_LIMIT
                        ? "#ff8a8a"
                        : "rgba(255,255,255,0.7)",
                    fontSize: 12,
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background:
                        freeUsedToday >= FREE_DAILY_LIMIT
                          ? "#ff5252"
                          : "#00b8b2",
                    }}
                  />
                  {freeUsedToday >= FREE_DAILY_LIMIT
                    ? "Daily limit reached — upgrade for unlimited"
                    : `Free scans today: ${freeUsedToday} / ${FREE_DAILY_LIMIT}`}
                </div>
              )}
              <div className="social-platform-buttons">
                <span className="platform-label">Supports:</span>
                <span className="platform-btn">
                  <FaTiktok />
                  TikTok
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <FaInstagram />
                  Reels
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <FaYoutube />
                  Shorts
                </span>
              </div>
              {error && (
                <div className="error-message" style={{ marginTop: "10px" }}>
                  {error}
                </div>
              )}
            </div>
            <div className="about-toktools-section" ref={processRef}>
              <div className="inner-section-wrapper">
                {bulkData && (
                  <ProcessComponent
                    bulkData={bulkData}
                    isProcessing={isBulkProcessing}
                    processingUrls={processingUrls}
                    onSignUp={() => {
                      router.push(
                        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`,
                      );
                    }}
                    onItemClick={handleBulkItemClick}
                    selectedIndex={selectedBulkIndex}
                  />
                )}
                {selectedBulkItem && bulkData && !isBulkProcessing && (
                  <div ref={videoDetailRef}>
                  <VideoLargeComponent
                    videoData={transformBulkItemToVideoData(selectedBulkItem)}
                    user={user}
                    setDontMissOutModalShow={setDontMissOutModalShow}
                  />
                  </div>
                )}
                {selectedBulkItem && bulkData && !isBulkProcessing && (
                  <TokToolsFeatures
                    videoData={transformBulkItemToVideoData(selectedBulkItem)}
                    setDontMissOutModalShow={setDontMissOutModalShow}
                  />
                )}
                {videoData && !bulkData && (
                  <VideoLargeComponent
                    videoData={videoData}
                    user={user}
                    setDontMissOutModalShow={setDontMissOutModalShow}
                  />
                )}
                {videoData && !bulkData && (
                  <TokToolsFeatures
                    videoData={videoData}
                    setDontMissOutModalShow={setDontMissOutModalShow}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {(platform === "instagram" || platform === "youtube") && (
          <div className="mcp-page">
            <section
              id={platform === "instagram" ? "how-it-works-reels" : "how-it-works-shorts"}
              className="hiw-platform-section"
              style={{ paddingTop: "36px", paddingBottom: "36px" }}
            >
              <style>{`
                .mcp-page .hiw-platform-section .hiw-inner {
                  margin-left: auto;
                  margin-right: auto;
                }
                @media (min-width: 992px) {
                  .mcp-page .hiw-platform-section .hiw-header-block {
                    width: 100%;
                    height: auto;
                    margin: 0 auto;
                    overflow: visible;
                  }
                  .mcp-page .hiw-platform-section .hiw-header-content {
                    width: 100%;
                    max-width: 100%;
                    margin: 0 auto;
                  }
                  .mcp-page .hiw-platform-section .hiw-h2,
                  .mcp-page .hiw-platform-section .hiw-sub {
                    width: 100%;
                    max-width: 100%;
                    text-align: center;
                    white-space: nowrap;
                    align-self: stretch;
                  }
                }
                @media (min-width: 992px) {
                  .mcp-page .hiw-platform-section .cx-hiw-cards-outer {
                    height: 488px;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card {
                    height: 460px;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-step-label {
                    top: 24px;
                    z-index: 2;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-card-title {
                    top: 44px;
                    left: 20px;
                    right: 20px;
                    z-index: 2;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card-img-wrap {
                    top: 80px;
                    left: 15px;
                    width: 318px;
                    height: 180px;
                    overflow: hidden;
                    border-radius: 12px;
                    z-index: 1;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card-img-wrap img {
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    display: block;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-card-desc {
                    top: 280px;
                    bottom: auto;
                    left: 22px;
                    right: 22px;
                    z-index: 2;
                    font-size: 14px;
                    line-height: 1.55;
                  }
                }
                @media (max-width: 991px) {
                  .mcp-page .hiw-platform-section .cx-hiw-cards-outer {
                    height: auto;
                    padding: 20px;
                    box-sizing: border-box;
                  }
                  .mcp-page .hiw-platform-section .hiw-cards-row {
                    position: static;
                    left: auto;
                    top: auto;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card {
                    position: relative;
                    width: 100%;
                    max-width: 360px;
                    height: auto;
                    min-height: 0;
                    padding: 24px 20px;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    gap: 12px;
                    background: #141414 !important;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    backdrop-filter: none !important;
                    -webkit-backdrop-filter: none !important;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-step-label,
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-card-title,
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-card-desc {
                    position: static;
                    top: auto;
                    left: auto;
                    right: auto;
                    bottom: auto;
                    margin: 0;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card .hiw-card-desc {
                    font-size: 12px;
                    line-height: 1.55;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card-img-wrap {
                    position: static;
                    width: 100%;
                    height: auto;
                    aspect-ratio: 318 / 252;
                    border-radius: 12px;
                    overflow: hidden;
                  }
                  .mcp-page .hiw-platform-section .cx-hiw-card-img-wrap img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                  }
                }
              `}</style>
              <div className="hiw-inner" style={{ gap: "24px" }}>
                <div className="hiw-header-block" style={{ height: "auto" }}>
                  <div className="hiw-header-content">
                    <div className="hiw-pill">How It Works</div>
                    <h2 className="hiw-h2">
                      {platform === "instagram"
                        ? "How to Generate a Transcript from Instagram"
                        : "How to Transcribe YouTube Videos"}
                    </h2>
                    <p className="hiw-sub">
                      {platform === "instagram"
                        ? "Getting your Instagram transcript takes three steps. No extensions, no software, and no Instagram Login required."
                        : "TokScript lets you generate a YouTube transcript in three steps. No extensions, no software, and no YouTube account required."}
                    </p>
                  </div>
                </div>

                <div className="cx-hiw-cards-outer hiw-cards-outer">
                  <div className="hiw-cards-row">
                    {(platform === "instagram"
                      ? [
                          {
                            step: "Step 01",
                            title: "Copy the Instagram Reel Link",
                            img: "/figma-rows/Copy%20the%20Instagram%20Video.png?v=20260505",
                            desc: "Open the Reel inside the Instagram app. Tap the paper plane icon (share button) and select “Copy Link.” On desktop, click the three-dot menu on the Reel and select “Copy Link.” The Instagram URL is now on your clipboard.",
                          },
                          {
                            step: "Step 02",
                            title: "Paste It Into TokScript",
                            img: "/figma-rows/Paste%20Instagram%20the%20Link%20into%20TokScript.png?v=20260505",
                            desc: "Drop the link into the input field above. You can paste a single Reel link or up to 50 Instagram links at once for bulk transcript generation.",
                          },
                          {
                            step: "Step 03",
                            title: "Download Your Instagram Transcript",
                            img: "/figma-rows/Download%20Your%20Instagram%20Transcript.png?v=20260505",
                            desc: "Click “Scan Video.” Your transcript is ready in seconds. Download it as TXT, XML, or PDF. Translate it into 11+ languages. Or run it through our AI agents to generate hooks, rewrite scripts, and analyze what made that Reel perform.",
                          },
                        ]
                      : [
                          {
                            step: "Step 01",
                            title: "Copy the YouTube Video or Shorts Link",
                            img: "/figma-rows/Copy%20the%20YouTube%20Video%20or%20Shorts%20Link.png?v=20260505",
                            desc: "Open the YouTube video or Short you want to transcribe. On mobile, tap Share then Copy Link. On desktop, right-click the video or copy the URL directly from your browser's address bar. Any public YouTube video URL works: Shorts, long-form videos, and unlisted links included.",
                          },
                          {
                            step: "Step 02",
                            title: "Paste the Link into TokScript",
                            img: "/figma-rows/Paste%20youtube%20the%20Link%20into%20TokScript.png?v=20260505",
                            desc: "Come back to this page and paste your YouTube link into the input field above. Need to generate transcripts in bulk? Paste up to 50 YouTube video links at once. TokScript handles each one in a single batch with no extra steps.",
                          },
                          {
                            step: "Step 03",
                            title: "Download Your YouTube Transcript",
                            img: "/figma-rows/Download%20Your%20Youtube%20Transcript.png?v=20260505",
                            desc: "Click “Generate Transcript” and your full text is ready in seconds. TokScript cross-references YouTube's native caption data with its own AI speech recognition engine for the highest accuracy across all video types. Download as TXT, PDF, or XML, or feed your transcript directly into ChatGPT, Claude, or Gemini.",
                          },
                        ]
                    ).map((card, i) => (
                      <div className="cx-hiw-card hiw-card" key={i}>
                        <p className="hiw-step-label">{card.step}</p>
                        <h3 className="hiw-card-title">{card.title}</h3>
                        <div className="cx-hiw-card-img-wrap hiw-card-img-wrap">
                          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}${card.img}`} alt="" />
                        </div>
                        <p className="hiw-card-desc">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        <section id="up-running" className="up-running-section">
          <div className="ur-inner">
            <div className="ur-header">
              <span className="ur-pill">New · TokScript MCP</span>
              <h2 className="ur-title">TokScript now lives inside Claude &amp; ChatGPT.</h2>
              <p className="ur-sub">Connect TokScript to your AI in one click. Pull transcripts, download videos, and analyze creator libraries — all without leaving the conversation.</p>
            </div>
            <div className="ur-video">
              <iframe
                src="https://www.youtube.com/embed/5m37dBH-G_g?autoplay=1&mute=1&loop=1&playlist=5m37dBH-G_g&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0"
                allow="autoplay; encrypted-media"
                title="TokScript MCP — works inside Claude and ChatGPT"
              ></iframe>
            </div>
            <Link href="/mcp" className="ur-cta">Try it Free Today</Link>
          </div>
        </section>
        {platform !== "instagram" && platform !== "youtube" && (
        <section id="vt-platform" className="vt-platform-section">
          <div className="vt-platform-inner">
            <div className="vt-platform-header">
              <span className="vt-pill">Features</span>
              <h2 className="vt-h2">#1 Video Transcript &amp; Download Platform</h2>
              <p className="vt-sub">The best tool for video transcription, bulk downloads, and AI content</p>
            </div>

            {/* All 8 rows: text-card (498) + plain image (748), 22px gap. Strict alternation per Figma 240:2568 */}

            {/* 1. Bulk Importing — text-card LEFT, visual RIGHT (Figma 240:2569) */}
            <div className="vt-row">
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">Bulk Importing</h3>
                  <p className="vt-row-body">{copy.bulk.body}</p>
                  <ul className="vt-list">
                    {copy.bulk.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/01-bulk${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="Bulk Importing" />
              </div>
            </div>

            {/* 2. TokScript MCP — visual LEFT, text-card RIGHT (Figma 557:16010) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/02-mcp${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="TokScript MCP" />
              </div>
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">TokScript MCP</h3>
                  <p className="vt-row-body">TokScript now lives inside Claude and ChatGPT. Pull transcripts, download videos, and analyze creator libraries — all without leaving the conversation.</p>
                  <ul className="vt-list">
                    <li>Native integration with Claude &amp; ChatGPT</li>
                    <li>Pull transcripts directly inside your AI</li>
                    <li>Analyze creator libraries in chat</li>
                    <li>One-click setup — no API wiring required</li>
                  </ul>
                  <Link href="/mcp" className="vt-cta">Get Started now</Link>
                </div>
              </div>
            </div>

            {/* 3. TikTok Collection & Playlist Importing — text-card LEFT, visual RIGHT (Figma 558:16543) */}
            <div className="vt-row">
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">Collection &amp; Playlist Imports</h3>
                  <p className="vt-row-body">Paste a single link to a public TikTok collection (bookmarks) or a creator&apos;s playlist to automatically import and transcribe all videos contained within it.</p>
                  <ul className="vt-list">
                    <li>Public TikTok collection importing</li>
                    <li>Creator playlist auto-detection</li>
                    <li>Series and topic-based organization</li>
                    <li>Automatic metadata preservation</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/03-collection${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="TikTok Collection & Playlist Importing" />
              </div>
            </div>

            {/* 4. History & Bookmarking — visual LEFT, text-card RIGHT (Figma 558:17653) */}
            <div className="vt-row vt-row-reverse" id="history-bookmarking">
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/04-history${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="History & Bookmarking" />
              </div>
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">History &amp; Bookmarking</h3>
                  <p className="vt-row-body">Access a complete transcript history for every video you process, automatically logging download dates, transcript details, video sources, and durations.</p>
                  <ul className="vt-list">
                    <li>Complete download history with metadata</li>
                    <li>Custom bookmark folders</li>
                    <li>Re-download in TXT, XML, PDF formats</li>
                    <li>Bulk export and sharing capabilities</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
            </div>

            {/* 5. HD Video & Cover Image Downloads — text-card LEFT, visual RIGHT (Figma 558:19296) */}
            <div className="vt-row" id="hd-video">
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">HD Video &amp; Cover Downloads</h3>
                  <p className="vt-row-body">Download TikTok, Instagram Reels, and YouTube Shorts videos in HD with no watermarks. Save high-resolution cover images across every platform.</p>
                  <ul className="vt-list">
                    <li>HD video downloads without watermarks</li>
                    <li>Cover image extraction and download</li>
                    <li>Multiple platform support</li>
                    <li>Original quality preservation</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/05-hd-video${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="HD Video & Cover Image Downloads" />
              </div>
            </div>

            {/* 6. Quick URL Download — visual LEFT, text-card RIGHT (Figma 558:26755) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/06-quick-url${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="Quick URL Download" />
              </div>
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">Quick URL Download</h3>
                  <p className="vt-row-body">{copy.quickUrl.body}</p>
                  <ul className="vt-list">
                    {copy.quickUrl.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
            </div>

            {/* 7. Chrome Extension — text-card LEFT, visual RIGHT (Figma 558:27643) */}
            <div className="vt-row">
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">Chrome Extension</h3>
                  <p className="vt-row-body">Copy video transcripts to your clipboard or download them as .txt files while watching TikTok, Instagram Reels, or YouTube Shorts — no URL copying required.</p>
                  <ul className="vt-list">
                    <li>One-click transcript download</li>
                    <li>Instant clipboard copying</li>
                    <li>Works on web and mobile browsers</li>
                    <li>No URL copying required</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/07-chrome${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="Chrome Extension" />
              </div>
            </div>

            {/* 8. AI Agents — visual LEFT, text-card RIGHT (Figma 558:31342) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <VideoHoverThumb src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/08-ai-agents${platform === "tiktok" ? "" : "-" + platform}.png?v=20260501b`} alt="AI Agents" />
              </div>
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">AI Agents</h3>
                  <p className="vt-row-body">AI-Powered Virality: Hooks, Viral Script writing &amp; Video Breakdown. Unlock the secret weapons behind today&rsquo;s top viral videos, powered by AI.</p>
                  <ul className="vt-list">
                    <li>Viral Hook Generator for instant engagement</li>
                    <li>Script rewriter with viral essence preservation</li>
                    <li>Virality psychology analysis and insights</li>
                    <li>One-click content transformation</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        <WhoItsFor platform={platform} />

        {(platform === "instagram" || platform === "youtube") && (
          <section id="platform-about" className="vt-platform-section">
            <div className="vt-platform-inner">
              <div className="vt-platform-header">
                <span className="vt-pill">
                  {platform === "instagram" ? "Built For Reels" : "Built For YouTube"}
                </span>
                <h2 className="vt-h2">
                  {platform === "instagram"
                    ? "Instagram Reels Transcript & Download Platform"
                    : "YouTube Shorts Transcript Generator"}
                </h2>
                <p className="vt-sub">
                  {platform === "instagram"
                    ? "2.6M+ videos processed. Built specifically for IG content, not bolted onto a generic tool. TokScript converts any public Instagram Reel online into clean, accurate text in seconds. Purpose-built for how Reels content actually works. Paste a link, get the transcript, and use it for captions, scripts, competitor research, or AI workflows."
                    : "2.6M+ videos processed. Built specifically for YouTube Shorts transcripts, not a generic transcription tool that treats every video the same. Convert any public YouTube Short into clean, accurate text in seconds. Paste the YouTube link, get the full transcript, and put it to work: repurpose into scripts, research competitor YouTube Shorts, fuel AI workflows, or create captions without replaying a single video."}
                </p>
              </div>

              {(platform === "instagram"
                ? [
                    {
                      title: "Bulk Instagram Transcript Import",
                      body: "Paste up to 50 Reel links in a single batch and pull every transcript simultaneously. Auditing a competitor's strategy, building a research swipe file, or processing a full week of Reels: bulk import handles it in one action. Every transcript is ready to export together.",
                      bullets: [
                        "Up to 50 Reel links per batch",
                        "Export all at once as TXT, XML, or PDF",
                        "Process simultaneously or select individually",
                        "Available on paid plans only",
                      ],
                      img: bulkInstagramImg,
                      alt: "Bulk transcript processing interface showing multiple Instagram Reels URLs being imported",
                    },
                    {
                      title: "Cloud Transcript Library",
                      body: "Every transcript saves automatically to your personal TokScript library. Access your full history from any device: phone, tablet, or desktop. Nothing is lost, and nothing needs manual backup.",
                      bullets: [
                        "Automatic cloud backup for every transcript",
                        "Full history accessible from any device",
                        "All files encrypted and stored securely",
                        "Zero maintenance required",
                      ],
                      img: cloudInstagramImg,
                      alt: "Cloud transcript library with saved transcripts organized by date",
                    },
                    {
                      title: "History and Folders",
                      body: "TokScript logs every Reel you convert: original link, date processed, video duration, and word count. Organize transcripts into folders by client, campaign, or topic. Re-download in any format whenever needed.",
                      bullets: [
                        "Full history with video metadata",
                        "Custom folders by campaign, client, or topic",
                        "Re-download as TXT, XML, or PDF anytime",
                        "Bulk folder exports (paid plans)",
                      ],
                      img: historyInstagramImg,
                      alt: "Transcript history panel showing previously processed Reels",
                    },
                    {
                      title: "HD Video and Cover Image Download (Paid Plan Only)",
                      body: "Save any public Instagram Reel in full HD with no watermark. Download the thumbnail at original resolution too. Archive Reels before they are deleted, repurpose content, or build visual reference libraries.",
                      bullets: [
                        "Full HD download, no watermark",
                        "Thumbnail at original resolution",
                        "No compression or quality loss",
                      ],
                      img: hdVideoInstagramImg,
                      alt: "Media download interface with video and cover image save options",
                    },
                    {
                      title: "Instagram Transcript URL Shortcut",
                      body: "Place tokscript.com/ before any Instagram Reel URL in your browser bar and press enter. The Reel text extracts right away. No navigation, no extra steps. It works like a shortcut you already know: just edit the URL, hit enter, and your transcript is ready before you even leave your browser tab.",
                      bullets: [
                        "Prefix any Instagram Reel URL with tokscript.com/ to download",
                        "No login required for this method",
                        "Works directly from your browser address bar",
                        "Transcript ready in seconds",
                      ],
                      img: urlShortcutInstagramImg,
                      alt: "Quick URL method showing paste-and-process transcript extraction",
                    },
                    {
                      title: "AI Agents for Instagram Content Creators",
                      body: "Three tools built for Instagram content strategy. Feed any Reel transcript in and get a production-ready output back.",
                      bullets: [
                        "Hook Generator: Get 20+ opening hook variations from any Reel transcript. Each hook is grounded in the structure of proven, high-performing content, built for the pace and rhythm of Reel videos specifically.",
                        "Script Writer: Turn any Reel transcript into a new script written in your voice. The agent captures the structure and energy of the original, then rebuilds it around your niche and tone. Ready to film, not just to read.",
                        "Virality Explainer: Understand exactly why a specific Reel performed. Get a structured breakdown of hook mechanics, psychological triggers, pacing decisions, and content patterns, with clear, actionable takeaways for your own strategy.",
                      ],
                      img: aiAgentsInstagramImg,
                      alt: "AI-powered dashboard showing transcript analysis and viral hook suggestions",
                    },
                  ]
                : [
                    {
                      title: "Bulk YouTube Transcript Generation",
                      body: "Stop processing videos one at a time. TokScript lets you paste up to 50 YouTube video links at once and generates every transcript in a single batch, completely free for your first 5 videos per day, with no account required to get started. While built for YouTube, TokScript also handles TikTok and Instagram Reels in the same import. All transcripts are processed simultaneously and ready to download in seconds.",
                      bullets: [
                        "Process up to 50 YouTube video links in one batch",
                        "Mix YouTube, TikTok, and Instagram Reels in a single import",
                        "Download all transcripts at once or select individual results",
                        "Switch between bulk mode and single-video transcript generation",
                      ],
                      img: bulkYoutubeImg,
                      alt: "Bulk transcript processing interface showing multiple YouTube video URLs being imported",
                    },
                    {
                      title: "Cloud Library and Transcript History",
                      body: "Every YouTube transcript you generate is saved automatically to your TokScript cloud library. Access your full transcript history from any device, re-download past transcripts in any format, and organize everything into bookmark folders by topic, campaign, or creator. No manual file management, no lost transcripts.",
                      bullets: [
                        "All YouTube transcripts auto-saved to the cloud",
                        "Access your full library from any browser or device",
                        "Organize transcripts into folders by channel, topic, or project",
                        "Re-download any past transcript in TXT, PDF, or XML",
                      ],
                      img: cloudYoutubeImg,
                      alt: "Cloud transcript library with saved YouTube transcripts organized by date",
                    },
                    {
                      title: "YouTube Video to Text — Multiple Export Formats",
                      body: "Once TokScript converts your YouTube video to text, you choose how to use it. Export your transcript as a plain TXT file for copying into documents, a structured XML file for developers and subtitles, or a formatted PDF for sharing and archiving. Every export is clean, accurate, and ready to use immediately, free to download with no watermarks.",
                      bullets: [
                        "TXT for copy-paste into any document or AI tool",
                        "PDF for formatted, shareable transcripts",
                        "XML for structured subtitle and developer use",
                        "One-click download from your transcript history",
                      ],
                      img: videoToTextYoutubeImg,
                      alt: "Transcript export panel showing TXT, PDF, and XML download options",
                    },
                    {
                      title: "Translate YouTube Transcripts into 11+ Languages",
                      body: "Select a target language before scanning and TokScript delivers your YouTube transcript already translated. All 11+ languages are available on paid plans, with a selection of the most popular languages available on the free plan. Turn an English-language video into a Spanish, French, Arabic, Japanese, or Portuguese transcript in one click. Perfect for international content research, multilingual subtitles, or adapting viral videos for new audiences.",
                      bullets: [
                        "11+ languages supported on paid plans",
                        "Most popular languages available on the free plan",
                        "Translation delivered with the transcript, not after",
                        "Combine transcript generation and translation in a single step",
                        "Works across YouTube Shorts, videos, TikTok, and Reels",
                      ],
                      img: translateYoutubeImg,
                      alt: "Media download interface with video and cover image save options",
                    },
                    {
                      title: "Quick URL Method — Transcript in One Step",
                      body: "Want even faster access? Add tokscript.com/ before any YouTube video URL in your browser address bar and hit Enter. TokScript auto-processes the link and delivers your transcript instantly. No homepage visit, no paste, no extra clicks. The fastest way to convert YouTube to text online on any device.",
                      bullets: [
                        "Add tokscript.com/ before any YouTube URL for instant transcription",
                        "No need to visit the main site or log in",
                        "Works for YouTube Shorts, standard videos, TikTok, and Reels",
                        "Zero extra steps: transcript delivered immediately",
                      ],
                      img: urlShortcutYoutubeImg,
                      alt: "Quick URL method showing paste-and-process transcript extraction",
                    },
                    {
                      title: "AI Agents for YouTube Creators",
                      body: "TokScript includes three AI agents trained specifically on short-form video performance data. Feed any YouTube transcript into the agents and get tools no other transcript generator offers, all available online, no software required.",
                      bullets: [
                        "Viral Hook Generator: Paste a YouTube transcript and get 20+ opening hooks engineered to retain viewers past the critical first 3 seconds.",
                        "Viral Script Writer: Take any transcript from a high-performing YouTube video and generate a brand-new script that preserves the structure, pacing, and psychology that made it work.",
                        "Virality Explainer: Get a full breakdown of why a specific YouTube Short or video went viral, covering hook strength, content pacing, audience psychology, and algorithmic signals.",
                      ],
                      img: aiAgentsYoutubeImg,
                      alt: "AI-powered dashboard showing transcript analysis and viral hook suggestions",
                    },
                  ]
              ).map((row, i) => (
                <div
                  key={i}
                  className={`vt-row${i % 2 === 1 ? " vt-row-reverse" : ""}`}
                >
                  <div className="vt-text">
                    <div className="vt-text-inner">
                      <h3 className="vt-row-title">{row.title}</h3>
                      <p className="vt-row-body">{row.body}</p>
                      <ul className="vt-list">
                        {row.bullets.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                      <Link href="/pricing" className="vt-cta" style={{ height: "44px", gap: "8px", padding: "0 24px" }}>
                        Start Now
                      </Link>
                    </div>
                  </div>
                  <div className="vt-visual">
                    <Image
                      src={row.img}
                      alt={row.alt}
                      style={{ width: "100%", height: "100%", display: "block", objectFit: "contain", objectPosition: "center", borderRadius: "16px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        <ViralMomentsCarousel variant="home" />

        <div className="pricing-card-detail">
          <div className="container">
            <div className="ur-header pricing-header">
              <span className="ur-pill">Pricing</span>
              <h2 className="ur-title">Find the plan that fits your content workflow</h2>
              <p className="ur-sub">Start free, upgrade when you&apos;re ready. Every plan includes Claude and ChatGPT integration, Chrome extension, and full transcript downloads.</p>
            </div>

            {/* Mobile Tabs */}

            <div className="pricing-page-new">
              {/* Mobile Tabs */}
              <div className="mobile-tabs">
                <div className="tab-container">
                  <button
                    className={`tab-btn ${
                      activeTab === "free" ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab("free")}
                  >
                    Free
                  </button>
                  <button
                    className={`tab-btn featured ${
                      activeTab === "annual" ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab("annual")}
                  >
                    Annual
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "monthly" ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab("monthly")}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Pricing Grid — glass card style */}
              <div className="pc-grid">
                  {/* Free */}
                  <div className={`pc-card-wrapper ${activeTab === "free" ? "active" : ""}`}>
                    <div className="pc-card">
                      <div className="pc-header">
                        <div className="pc-plan-row">
                          <div className="pc-plan-name">Free</div>
                          <span className="pc-badge">Forever</span>
                        </div>
                        <p className="pc-description">Test the basics</p>
                        <div className="pc-price-row">
                          <span className="pc-price-main">$0</span>
                          <span className="pc-price-period">forever</span>
                        </div>
                      </div>
                      <div className="pc-cta-wrap">
                        {user && user?.plan == "free" ? (
                          <button disabled className="pc-cta">Current Plan</button>
                        ) : !user ? (
                          <>
                            <button
                              onClick={() => {
                                setPendingCheckoutUrl(null);
                                setPendingPlan({
                                  name: "Free Plan",
                                  price: "$0",
                                  period: "/forever",
                                  badge: null,
                                  features: [
                                    "5 transcripts per day",
                                    "TikTok only",
                                    "Chrome Extension (free features)",
                                  ],
                                  buttonText: "Create Free Account",
                                });
                                setCheckoutOverlayShow(true);
                              }}
                              className="pc-cta d-none d-md-flex"
                            >
                              Get Started
                            </button>
                            <a
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin`}
                              className="pc-cta d-flex d-md-none"
                            >
                              Get Started
                            </a>
                          </>
                        ) : (
                          <button onClick={() => setDontMissOutModalShow(true)} className="pc-cta">Get Started</button>
                        )}
                      </div>
                      <div className="pc-body">
                        <ul className="pc-list">
                          <li><Check size={16} strokeWidth={3} /><span>{copy.pricingDailyFreeLine}</span></li>
                          <li><Check size={16} strokeWidth={3} /><span>5 translations per day</span></li>
                          <li><Check size={16} strokeWidth={3} /><span>TikTok, Reels, Shorts</span></li>
                        </ul>
                        <div className="pc-platforms pc-platforms-row">
                          <span className="pc-ai-logo pc-ai-logo--platform" aria-label="TikTok"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/tiktok-tile.png?v=2`} alt="" /></span>
                          <span className="pc-ai-logo pc-ai-logo--platform" aria-label="Instagram"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/instagram-tile.png?v=2`} alt="" /></span>
                          <span className="pc-ai-logo pc-ai-logo--platform" aria-label="YouTube"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/youtube-tile.png?v=2`} alt="" /></span>
                        </div>
                        <ul className="pc-list">
                          <li><Check size={16} strokeWidth={3} /><span>Basic Chrome Extension</span></li>
                        </ul>
                        <div className="pc-separator">
                          <span className="pc-sep-line" />
                          <span>Not included</span>
                          <span className="pc-sep-line" />
                        </div>
                        <ul className="pc-list pc-list-locked">
                          <li><X size={16} strokeWidth={3} /><span>AI Agents</span></li>
                          <li><X size={16} strokeWidth={3} /><span>Bulk Import</span></li>
                          <li><X size={16} strokeWidth={3} /><span>Claude &amp; ChatGPT</span></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Annual (Featured) */}
                  <div className={`pc-card-wrapper ${activeTab === "annual" ? "active" : ""}`}>
                    <div className="pc-card pc-card-featured">
                      <div className="pc-header">
                        <div className="pc-plan-row">
                          <div className="pc-plan-name">Annual</div>
                          <span className="pc-badge pc-badge-recommended">
                            <Crown size={12} strokeWidth={2.5} /> Recommended
                          </span>
                        </div>
                        <p className="pc-description">Best value for serious creators</p>
                        <div className="pc-price-row">
                          <span className="pc-price-main">$39</span>
                          <span className="pc-price-period">per year</span>
                          <span className="pc-price-original">$120</span>
                        </div>
                        <div className="pc-price-highlight">
                          <span className="pc-price-highlight-pill">That&apos;s $3.25/month</span>
                        </div>
                      </div>
                      <div className="pc-cta-wrap">
                        {loading ? (
                          <button disabled className="pc-cta pc-cta-primary">Loading...</button>
                        ) : user ? (
                          profile?.plan == "pro" &&
                          profile?.subscription?.status === "active" &&
                          profile.subscription.lemonSqueezyVariantId ===
                            allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.variantId ? (
                            <button disabled className="pc-cta">Current Plan</button>
                          ) : profile?.plan == "pro" &&
                            profile?.plan !== "free" &&
                            profile.subscription?.status === "active" ? (
                            <button
                              disabled={loadingStates[allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.variantId]}
                              onClick={() => {
                                const annualPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"));
                                if (annualPlan) handleUpgradeClick(annualPlan.variantId, "annual");
                              }}
                              className="pc-cta pc-cta-primary"
                            >
                              {loadingStates[allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.variantId] ? "Processing..." : "Upgrade"}
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  const annualPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"));
                                  if (annualPlan) handleCheckout(annualPlan);
                                }}
                                className="pc-cta pc-cta-primary d-none d-md-flex"
                              >
                                Get Annual — Save $81 <ArrowRight size={18} strokeWidth={2.5} />
                              </button>
                              <a
                                href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                                className="pc-cta pc-cta-primary d-flex d-md-none"
                              >
                                Get Annual — Save $81 <ArrowRight size={18} strokeWidth={2.5} />
                              </a>
                            </>
                          )
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                const annualPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"));
                                if (annualPlan) handleCheckout(annualPlan);
                              }}
                              className="pc-cta pc-cta-primary d-none d-md-flex"
                            >
                              Get Annual — Save $81 <ArrowRight size={18} strokeWidth={2.5} />
                            </button>
                            <a
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                              className="pc-cta pc-cta-primary d-flex d-md-none"
                            >
                              Get Annual — Save $81 <ArrowRight size={18} strokeWidth={2.5} />
                            </a>
                          </>
                        )}
                      </div>
                      <div className="pc-body">
                        <div className="pc-group">
                          <div className="pc-group-title">Bulk Processing</div>
                          <div className="pc-platforms pc-platforms-row">
                            <span className="pc-ai-logo pc-ai-logo--platform" aria-label="TikTok"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/tiktok-tile.png?v=2`} alt="" /></span>
                            <span className="pc-ai-logo pc-ai-logo--platform" aria-label="Instagram"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/instagram-tile.png?v=2`} alt="" /></span>
                            <span className="pc-ai-logo pc-ai-logo--platform" aria-label="YouTube"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/pricing-icons/youtube-tile.png?v=2`} alt="" /></span>
                          </div>
                          <ul className="pc-list">
                            <li><Check size={16} strokeWidth={3} /><span>Unlimited transcripts</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Unlimited translations</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Bulk import 50 videos at once</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>HD downloads, no watermarks</span></li>
                          </ul>
                        </div>
                        <div className="pc-group">
                          <div className="pc-group-title">Add to Claude &amp; ChatGPT</div>
                          <div className="pc-ai-pair">
                            <span className="pc-ai-logo pc-ai-logo--claude" aria-label="Claude"><ClaudeIcon /></span>
                            <span className="pc-ai-logo pc-ai-logo--chatgpt" aria-label="ChatGPT"><ChatGPTIcon /></span>
                          </div>
                          <p className="pc-group-blurb">Ask anything about any TikTok, Instagram, or YouTube — right inside your AI chat.</p>
                        </div>
                        <div className="pc-group">
                          <div className="pc-group-title">Everywhere You Work</div>
                          <ul className="pc-list">
                            <li><Check size={16} strokeWidth={3} /><span>Chrome Extension</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Mobile + Desktop apps</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Cloud-synced dashboard</span></li>
                          </ul>
                        </div>
                        <div className="pc-group">
                          <div className="pc-group-title">AI Agents</div>
                          <ul className="pc-list pc-list-detailed">
                            <li>
                              <Check size={16} strokeWidth={3} />
                              <div>
                                <strong>Viral Hook Generator</strong>
                                <span>{copy.agents.hook}</span>
                              </div>
                            </li>
                            <li>
                              <Check size={16} strokeWidth={3} />
                              <div>
                                <strong>Viral Script Writer</strong>
                                <span>{copy.agents.script}</span>
                              </div>
                            </li>
                            <li>
                              <Check size={16} strokeWidth={3} />
                              <div>
                                <strong>Virality Explainer</strong>
                                <span>{copy.agents.explainer}</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly */}
                  <div className={`pc-card-wrapper ${activeTab === "monthly" ? "active" : ""}`}>
                    <div className="pc-card">
                      <div className="pc-header">
                        <div className="pc-plan-row">
                          <div className="pc-plan-name">Monthly</div>
                          <span className="pc-badge">Flexible</span>
                        </div>
                        <p className="pc-description">Full power, flexible billing</p>
                        <div className="pc-price-row">
                          <span className="pc-price-main">$10</span>
                          <span className="pc-price-period">per month</span>
                        </div>
                        <div className="pc-price-highlight pc-price-highlight-warn">
                          <span className="pc-price-highlight-equivalent">= $120/year</span>
                          <span className="pc-price-highlight-note">Annual saves $81</span>
                        </div>
                      </div>
                      <div className="pc-cta-wrap">
                        {loading ? (
                          <button disabled className="pc-cta">Loading...</button>
                        ) : user ? (
                          profile?.plan == "pro" &&
                          profile?.subscription?.status === "active" &&
                          profile.subscription.lemonSqueezyVariantId ===
                            allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.variantId ? (
                            <button disabled className="pc-cta">Current Plan</button>
                          ) : profile?.plan == "pro" &&
                            profile?.plan !== "free" &&
                            profile.subscription?.status === "active" ? (
                            <button
                              disabled={loadingStates[allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.variantId]}
                              onClick={() => {
                                const monthlyPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"));
                                if (monthlyPlan) handleUpgradeClick(monthlyPlan.variantId, "monthly");
                              }}
                              className="pc-cta"
                            >
                              {loadingStates[allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.variantId] ? "Processing..." : "Upgrade"}
                            </button>
                          ) : (
                            <>
                              <button
                                className="pc-cta d-none d-md-flex"
                                onClick={() => {
                                  const monthlyPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"));
                                  if (monthlyPlan) handleCheckout(monthlyPlan);
                                }}
                              >
                                Get Monthly
                              </button>
                              <a
                                href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                                className="pc-cta d-flex d-md-none"
                              >
                                Get Monthly
                              </a>
                            </>
                          )
                        ) : (
                          <>
                            <button
                              className="pc-cta d-none d-md-flex"
                              onClick={() => {
                                const monthlyPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"));
                                if (monthlyPlan) handleCheckout(monthlyPlan);
                              }}
                            >
                              Get Monthly
                            </button>
                            <a
                              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                              className="pc-cta d-flex d-md-none"
                            >
                              Get Monthly
                            </a>
                          </>
                        )}
                      </div>
                      <div className="pc-body">
                        <div className="pc-group">
                          <div className="pc-group-title">Everything in Annual</div>
                          <ul className="pc-list">
                            <li><Check size={16} strokeWidth={3} /><span>All 3 AI Agents</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Unlimited transcripts &amp; translations</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Bulk import 50 videos</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Claude &amp; ChatGPT</span></li>
                            <li><Check size={16} strokeWidth={3} /><span>Chrome, mobile &amp; desktop</span></li>
                          </ul>
                        </div>
                        <div className="pc-warn-callout">
                          Costs $81 more per year
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>

        <section className="ai-features-section">
          <div className="ai-features-inner">
            <div className="ai-features-header">
              <span className="ai-features-pill">AI Features</span>
              <h2 className="ai-features-title">Try our latest AI features</h2>
              <p className="ai-features-sub">
                Five purpose-built tools that turn any video into shareable, viral-ready content.
              </p>
            </div>
            <div className="ai-features-grid">
              {featureCards.map((item, index) => (
                <div className={`ai-feature-card ai-feature-card-${item.imageBgClass}`} key={index}>
                  <div className="ai-feature-icon">
                    <img
                      src={item.icon}
                      alt={item.title}
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  </div>
                  <div className="ai-feature-content">
                    <strong className="ai-feature-title">{item.title}</strong>
                    <p className="ai-feature-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <HomeSocialProof />
        <BeforeAfter />
        {platform === "instagram" || platform === "youtube" ? (
          <section className="ready-to-convert-section">
            <div className="container">
              <div className="inner-section">
                <h3>
                  {platform === "instagram"
                    ? "Ready to Convert Your First Reel?"
                    : "Ready to Convert Your YouTube Short?"}
                </h3>
                <p>
                  {platform === "instagram"
                    ? "Paste any public Reel link above. Get the full text in seconds."
                    : "Paste a Shorts link. Get every spoken word back in text. Free."}
                </p>
                <Link
                  href="#"
                  className="ready-to-convert-cta"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Start Transcribing Free
                </Link>
              </div>
            </div>
          </section>
        ) : (
          <EnhenceExperience />
        )}
        <FaqSection
          faqData={
            platform === "instagram"
              ? [
                  { title: "What does a Reel transcript tool do?", content: "It converts the spoken audio inside an Instagram video into written text, automatically. Paste a public Reel link into TokScript and the full text is returned in seconds, with no manual typing, no audio editing, and no extra software required." },
                  { title: "How do I extract text from an Instagram Reel?", content: "Copy the Reel link using Instagram's share button. Paste it into the input field above. Click \"Scan Video.\" The transcript is ready in seconds. Download as TXT, XML, or PDF, or copy it to your clipboard directly." },
                  { title: "How do I copy an Instagram Reel link?", content: "On mobile: open the Reel, tap the paper plane icon, and select \"Copy Link.\" On desktop: click the three-dot menu on the Reel and choose \"Copy Link.\"" },
                  { title: "Is TokScript free to use?", content: "Yes. The free plan includes 5 transcripts and 5 translations per day at no cost. Unlimited transcripts, bulk processing, AI agents, and HD downloads are available on paid plans from $39 per year." },
                  { title: "How accurate is the Reel-to-text conversion?", content: "Accuracy depends on audio quality. Clear spoken audio typically yields 95%+ word accuracy. Moderate background noise produces 85-92% accuracy. Heavy music or overlapping voices yield 70-80% accuracy." },
                  { title: "Can I transcribe content from private accounts?", content: "No. TokScript only processes publicly viewable Instagram Reels. Content from private accounts is inaccessible to outside systems." },
                  { title: "What if the Reel contains no spoken audio?", content: "If a Reel contains only music, ambient sound, or visual content with no spoken words, there is nothing to transcribe. TokScript extracts spoken language only." },
                  { title: "Can I process multiple Reels at once?", content: "Yes, on paid plans only. Paste up to 50 Reel links in one batch. This feature is not available on the free plan." },
                  { title: "What file formats are available for download?", content: "Transcripts are available in three formats: TXT (plain text), XML (structured data), and PDF (formatted document). You can also copy transcripts directly to your clipboard." },
                  { title: "Which languages does translation support?", content: "TokScript supports translation into 11 languages: English, Spanish, Portuguese, Mandarin, French, Hindi, Arabic, German, Japanese, Korean, and Russian." },
                  { title: "Can I use extracted text with AI writing tools?", content: "Yes. Copy or download any transcript and paste it into ChatGPT, Claude, Gemini, or any AI platform. TokScript's built-in AI agents handle hooks, script rewrites, and performance analysis." },
                  { title: "Does TokScript work with Instagram Reel ads?", content: "Yes. Any publicly viewable Reel, including paid promotions, can be transcribed. Media buyers use it to extract hook structures and CTAs from high-converting ads." },
                ]
              : platform === "youtube"
              ? [
                  { title: "What is the best free YouTube transcript generator?", content: "TokScript is a free YouTube transcript generator working directly from any YouTube URL with no software, no login, and no file upload. It supports YouTube Shorts, standard videos, and bulk processing of up to 50 links at once." },
                  { title: "How do I generate a transcript from a YouTube video?", content: "Copy the YouTube video URL, paste it into TokScript, and click \"Generate Transcript.\" Your full YouTube transcript is ready in seconds and available to download as TXT, PDF, or XML." },
                  { title: "How do I convert YouTube video to text for free?", content: "Use TokScript's free YouTube to text converter. Paste any YouTube link into the tool, click scan, and download the full transcript at no cost. Free accounts include 5 transcripts per day." },
                  { title: "Does this YouTube transcript generator work with regular YouTube videos, not just Shorts?", content: "Yes. TokScript transcribes YouTube Shorts, standard YouTube videos, and longer content. Free plans support shorter videos, while paid plans unlock transcription for videos of any length." },
                  { title: "Can I generate transcripts from multiple YouTube videos at once?", content: "Yes. TokScript supports bulk transcript generation. Paste up to 50 YouTube video links at once and get every transcript processed in a single batch." },
                  { title: "What formats can I download a YouTube transcript in?", content: "TokScript exports YouTube transcripts in TXT (plain text), PDF (formatted document), and XML (structured data for subtitles or developer use)." },
                  { title: "Can I translate a YouTube transcript into another language?", content: "Yes. Select your target language before scanning and TokScript delivers the translated transcript alongside the original. 11+ languages are supported on paid plans, with the most popular languages available on the free plan." },
                  { title: "Do I need a YouTube account to generate a transcript?", content: "No. You only need the YouTube video URL. No YouTube login, no TokScript account for free usage, and no software installation required." },
                  { title: "Is this YouTube transcript generator accurate?", content: "TokScript uses a dual-verification system, pulling YouTube's native caption data and cross-referencing it with an independent AI transcription layer to maximize accuracy across all video types." },
                  { title: "Can I use the transcript with AI tools like ChatGPT or Claude?", content: "Yes. Export your YouTube transcript as TXT and paste it directly into ChatGPT, Claude, Gemini, or any other AI tool. TokScript also has built-in AI agents for hook generation, script rewriting, and virality analysis." },
                  { title: "Can I transcribe unlisted YouTube videos?", content: "Yes. Unlisted YouTube videos are accessible to anyone with the link, so TokScript can pull the transcript as long as you have the URL." },
                  { title: "How do I get a YouTube transcript without using YouTube's built-in captions?", content: "YouTube's built-in captions are view-only and cannot be downloaded as a file. TokScript extracts the full transcript from any YouTube video and lets you download it as TXT, PDF, or XML instantly. No YouTube account needed." },
                  { title: "What is the most accurate YouTube transcript generator online?", content: "TokScript uses a dual-verification system that combines YouTube's native caption data with an independent AI speech layer, making it one of the most accurate free YouTube transcript generators available online." },
                ]
              : undefined
          }
        />
        <div className="disclaimer-section">
          <div className="container">
            <div className="inner-section">
              {platform === "instagram" ? (
                <>
                  <div className="content">
                    <h4>About TokScript: Free Instagram Transcript Generator</h4>
                    <p>
                      TokScript was built around one idea: the spoken word
                      inside IG Reels is the most underused content asset on
                      the platform. Creators film, post, and move on, but the
                      script behind every high-performing Reel holds patterns
                      worth studying, repurposing, and building on. TokScript
                      makes that content accessible in seconds. No manual
                      retyping, no clunky workarounds. Every feature exists
                      because creators, managers, and researchers asked for it.{" "}
                      <strong>41,000+ users</strong> across content teams,
                      agencies, and solo creators trust TokScript as part of
                      their daily workflow. Over{" "}
                      <strong>2.6 million Reels</strong> processed and counted.
                    </p>
                    <p>
                      Pull transcripts from your favorite Instagram Reels
                      instantly and start building a library of content you can
                      actually reference and reuse. TokScript is also the
                      leading{" "}
                      <Link href="/" style={{ color: "#00B8B2" }}>
                        TikTok Transcript Generator
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/youtube-transcript-generator"
                        style={{ color: "#00B8B2" }}
                      >
                        YouTube Transcript Generator
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="content">
                    <h4>Instagram Ads Research</h4>
                    <p>
                      Studying top-performing Reel ads? Extract the spoken
                      script to analyze hook structure, offer framing, and
                      CTAs, then adapt what is working for your own campaigns
                      faster than rewatching manually.
                    </p>
                  </div>
                  <div className="content">
                    <h4>UGC Creator Workflows</h4>
                    <p>
                      Pull the text from any Reel in your niche before filming.
                      Study the exact phrasing and hooks driving engagement,
                      and build your script around what is already proven to
                      land.
                    </p>
                  </div>
                  <div className="content">
                    <h4>AI-Powered Content Production</h4>
                    <p>
                      Extract spoken content with TokScript, then feed it into
                      any AI tool for scripting, ideation, or strategy work.
                      Clean input produces better output, every time.
                    </p>
                  </div>
                  <div className="content">
                    <p>
                      TokScript is not affiliated with, endorsed by, or
                      sponsored by Instagram or Meta. All trademarks belong to
                      their respective owners.
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="content">
                    <h4>LEGAL DISCLAIMER:</h4>
                    <p>
                      Tokscript is not affiliated with, endorsed by, or
                      sponsored by Instagram, Meta, TikTok, TikTok USDS Joint
                      Venture LLC, ByteDance, YouTube, or Google. All
                      trademarks belong to their respective owners.
                    </p>
                  </div>
                </>
              ) : platform === "youtube" ? (
                <>
                  <div className="content">
                    <h4>
                      About TokScript: Free YouTube Shorts Transcript Generator
                    </h4>
                    <p>
                      TokScript was built around one idea: the spoken word
                      inside YouTube Shorts is content most people scroll past
                      but never capture. Creators film, viewers watch, and the
                      script behind every high-performing Short disappears into
                      the feed. We built TokScript to change that.
                    </p>
                    <p>
                      Paste a link to any public YouTube Short. The full
                      transcript is ready in seconds. No software to install,
                      no files to upload, no account required to start. Built
                      for content creators, educators, marketers, and anyone
                      who wants to turn Shorts into text they can read, search,
                      and reuse.
                    </p>
                    <p>
                      41,000+ users trust TokScript as part of their daily
                      workflow. Over 2.6 million videos processed and counted.
                    </p>
                  </div>
                  <div className="content">
                    <h4>YouTube Ads Research</h4>
                    <p>
                      Studying YouTube Shorts ads or researching what
                      competitors are running? Download the transcript from
                      any Shorts ad to break down the hook, the pitch, and the
                      call to action. Pull transcripts in bulk to compare
                      messaging across multiple advertisers and spot the
                      patterns worth applying to your own campaigns.
                    </p>
                  </div>
                  <div className="content">
                    <h4>UGC Creator Workflows</h4>
                    <p>
                      Stop replaying the same Shorts trying to catch every
                      word. Download the transcript, read through it, and pull
                      the parts that work as a foundation for your next video.
                      See exactly how top creators structure their Shorts: what
                      phrases they lead with, how they build tension, and how
                      they close.
                    </p>
                  </div>
                  <div className="content">
                    <h4>AI-Powered Content Production</h4>
                    <p>
                      Pull any YouTube Shorts transcript and feed it straight
                      into ChatGPT, Claude, Gemini, or whatever AI tool you
                      use. Generate new video ideas, rewrite scripts for your
                      audience, or analyze patterns across dozens of
                      top-performing Shorts. TokScript&apos;s built-in AI
                      agents also handle hook generation, script rewrites, and
                      virality breakdowns, all from the dashboard.
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="content">
                    <h4>LEGAL DISCLAIMER:</h4>
                    <p>
                      Tokscript is not affiliated with, endorsed by, or
                      sponsored by Instagram, Meta, TikTok, TikTok USDS Joint
                      Venture LLC, ByteDance, YouTube, or Google. All
                      trademarks belong to their respective owners.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="content">
                    <h4>About TokScript Free Video Transcript Generator</h4>
                    <p>
                      Download Video Transcripts (captions) For Free. Instantly,
                      without uploading any files! Quick and simple. No catch.
                      <br />
                      Download any video&apos;s captions, transcripts, and words for
                      your TikTok,{" "}
                      <Link
                        href="/instagram-transcript-generator"
                        style={{ color: "#00B8B2" }}
                      >
                        Instagram Reels
                      </Link>
                      , and{" "}
                      <Link
                        href="/youtube-transcript-generator"
                        style={{ color: "#00B8B2" }}
                      >
                        YouTube Shorts
                      </Link>{" "}
                      videos in seconds. Add your video link, hit start, and
                      instantly get any TikTok, Reels, or Shorts video script within
                      seconds. Perfect for UGC creators, Media Buyers, Ads Experts,
                      Creators, and Influencers who need help coming up with ideas
                      or understanding what videos are saying so they can study
                      winning content and create their own.
                    </p>
                    <p>
                      Easily and instantly download any video transcripts from your
                      favorite TikTok,{" "}
                      <Link
                        href="/youtube-transcript-generator"
                        style={{ color: "#00B8B2" }}
                      >
                        YouTube Shorts
                      </Link>
                      , and{" "}
                      <Link
                        href="/instagram-transcript-generator"
                        style={{ color: "#00B8B2" }}
                      >
                        Instagram Reels
                      </Link>{" "}
                      videos instantly! See our{" "}
                      <Link href="/pricing" style={{ color: "#00B8B2" }}>
                        pricing plans
                      </Link>{" "}
                      or learn more{" "}
                      <Link href="/about-us" style={{ color: "#00B8B2" }}>
                        about us
                      </Link>
                      .
                    </p>
                  </div>
                  <div className="content">
                    <h4>TikTok Ads:</h4>
                    <p>
                      If you&apos;re struggling to come up with ideas or need to know
                      what a video is talking about you can easily download any
                      videos transcript / subtitles to easily come up with new ideas
                      or use for SEO and topic creation.
                    </p>
                  </div>
                  <div className="content">
                    <h4>UGC Creators:</h4>
                    <p>
                      If you&apos;re struggling with what to say in your videos or just
                      want a quick reminder of what does work and doesn&apos;t work, you
                      can now download any transcript subtitles and reuse them for
                      any future video ideas you might have.
                    </p>
                  </div>
                  <div className="content">
                    <h4>AI:</h4>
                    <p>
                      Easily download any TikTok, Reels, or Shorts video&apos;s video
                      transcript and subtitles so you can use it with any of your
                      favorite Al companies like ChatGPT, Bard, Claude, and more to
                      easily create User Generated Video Scripts and ideas for your
                      next video!
                    </p>
                  </div>
                  <br />
                  <br />
                  <div className="content">
                    <h4>LEGAL DISCLAIMER:</h4>
                    <p>
                      Tokscript is not affiliated with, endorsed by, or sponsored by
                      TikTok, TikTok USDS Joint Venture LLC, ByteDance, Instagram,
                      Meta, YouTube, or Google. All trademarks belong to their
                      respective owners.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* <LegalDisclaimer /> */}
        <ShareBar
          url="https://tokscript.com"
          text="TokScript: download transcripts from TikTok, Instagram Reels & YouTube Shorts in seconds. 41,000+ creators use it."
        />
        <Footer />
      </main>
      {isClient && (
        <DontMissOutModal
          show={dontMissOutModalShow}
          onHide={handleDontMissOutModalClose}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          setShowConfirmation={setShowConfirmation}
          handleConfirmation={handleConfirmation}
          showConfirmation={showConfirmation}
        />
      )}
      <CheckoutOverlay
        isOpen={checkoutOverlayShow}
        onClose={() => {
          setCheckoutOverlayShow(false);
          setPendingCheckoutUrl(null);
          setPendingPlan(null);
        }}
        plan={pendingPlan}
        checkoutUrl={pendingCheckoutUrl}
        isLogin={false}
        onAuthSuccess={(authUser) => {
          // After successful auth, redirect to checkout if there's a pending URL
          setCheckoutOverlayShow(false);
          if (pendingCheckoutUrl) {
            const checkoutUrl =
              pendingCheckoutUrl +
              `?checkout[email]=${encodeURIComponent(
                authUser.email,
              )}&checkout[name]=${encodeURIComponent(
                authUser.name || authUser.email,
              )}&checkout[custom][user_id]=${authUser?.id || authUser._id}`;
            window.location.href = checkoutUrl;
          }
          setPendingCheckoutUrl(null);
          setPendingPlan(null);
        }}
      />
      {/* <DemoPage /> */}
    </div>
  );
}
