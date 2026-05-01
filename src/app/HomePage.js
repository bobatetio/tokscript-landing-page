"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
const ShareBar = dynamic(() => import("@/components/ShareBar"));
import magicIcon from "../assets/images/icons/magicIcon.svg";
import ClaudeIcon from "../assets/images/icons/ai/ClaudeIcon";
import ChatGPTIcon from "../assets/images/icons/ai/ChatGPTIcon";
import coverImg from "../assets/images/icons/coverImg.svg";
import downloadIcon from "../assets/images/icons/download-lg.svg";
import generateIcon from "../assets/images/icons/generate-viral.svg";
import scriptIcon from "../assets/images/icons/script.svg";
import analyzeImg from "../assets/images/icons/analyze.svg";
import { IoLockClosed, FaBolt, FaChevronDown, TbBrandTiktok, TbBrandInstagram, TbBrandYoutube, HiLanguage } from "@/components/Icons";
const Footer = dynamic(() => import("../components/Footer"));
import Link from "next/link";
import Image from "next/image";
import tiktok1Icon from "../assets/images/icons/tiktok1-icon.svg";
import instagram1Icon from "../assets/images/icons/insta1-con.svg";
import youtube1Icon from "../assets/images/icons/youtube1-icon.svg";
import bulkProcess from "../assets/images/bulking-process.webp";
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
const BeforeAfter = dynamic(() => import("@/components/BeforeAfter"), { ssr: false });
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

export default function LandingPage() {
  const [dontMissOutModalShow, setDontMissOutModalShow] = useState(false);
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
    // setDontMissOutModalShow(true);
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
    const rows = document.querySelectorAll("#vt-platform .vt-row");
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
        // Guest user with multiple links - use free bulk processing
        handleGuestBulkProcessing(links);
        return;
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}`;
      }
    } else {
      // Single link - proceed with normal fetchTikTokData
      if (!user || user == null) {
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
        if (errorData?.upgradeUrl) {
          setDontMissOutModalShow(true);
        }
        throw new Error(
          errorData.error || `Failed to process video: ${response.statusText}`,
        );
      }

      const data = await response.json();
      setVideoData(data);
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
    <div className="landing-page">
      <Header />
      <main className="inner-page">
        <div className="banner-section">
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
                  {/* TikTok, Reels & Shorts <br /> Transcript Generator */}
                  TikTok Transcript Generator{" "}
                </h1>
                <p>
                  {/* Turn speech into text from any TikTok, Instagram Reels, &
                  Youtube shorts video */}
                  Turn speech into text for any TikTok, Reels, and Shorts video
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
                  placeholder={
                    error ||
                    "Paste up to 50 video links here (or tiktok collection)"
                  }
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
                      <FaBolt />
                      {isLoading || isBulkProcessing
                        ? "Processing..."
                        : videoLink.trim()
                          ? "Download"
                          : "Scan Video"}
                    </button>
                  </div>
                </div>
              </div>
              <p className="helper-text">
                Download up to 50 videos (any platform) at the same time and
                entire TikTok collections
              </p>
              <div className="social-platform-buttons">
                <span className="platform-label">Supports:</span>
                <span className="platform-btn">
                  <TbBrandTiktok />
                  TikTok
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandInstagram />
                  Reels
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandYoutube />
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
                  <p className="vt-row-body">Bulk import up to 50 TikTok, Instagram, or YouTube Shorts links at once to quickly download transcripts in bulk.</p>
                  <ul className="vt-list">
                    <li>Bulk import up to 50 video links</li>
                    <li>TikTok, Instagram, and YouTube Shorts support</li>
                    <li>Bulk export all transcripts at once</li>
                    <li>Individual or batch processing options</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
                </div>
              </div>
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/01-bulk.png?v=20260430a`} alt="Bulk Importing" />
              </div>
            </div>

            {/* 2. TokScript MCP — visual LEFT, text-card RIGHT (Figma 557:16010) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/02-mcp.png?v=20260430a`} alt="TokScript MCP" />
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
                  <Link href="/mcp" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
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
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
                </div>
              </div>
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/03-collection.png?v=20260430a`} alt="TikTok Collection & Playlist Importing" />
              </div>
            </div>

            {/* 4. History & Bookmarking — visual LEFT, text-card RIGHT (Figma 558:17653) */}
            <div className="vt-row vt-row-reverse" id="history-bookmarking">
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/04-history.png?v=20260430a`} alt="History & Bookmarking" />
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
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
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
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
                </div>
              </div>
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/05-hd-video.png?v=20260430a`} alt="HD Video & Cover Image Downloads" />
              </div>
            </div>

            {/* 6. Quick URL Download — visual LEFT, text-card RIGHT (Figma 558:26755) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/06-quick-url.png?v=20260430a`} alt="Quick URL Download" />
              </div>
              <div className="vt-text">
                <div className="vt-text-inner">
                  <h3 className="vt-row-title">Quick URL Download</h3>
                  <p className="vt-row-body">Just add &lsquo;tokscript.com/&rsquo; in front of any video URL. Instantly redirect and download transcripts without logging in. Fast, automatic, every platform.</p>
                  <ul className="vt-list">
                    <li>Instant URL-based downloading</li>
                    <li>No need to visit main website</li>
                    <li>Works with all supported platforms</li>
                    <li>Automatic redirect and processing</li>
                  </ul>
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
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
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
                </div>
              </div>
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/07-chrome.png?v=20260430a`} alt="Chrome Extension" />
              </div>
            </div>

            {/* 8. AI Agents — visual LEFT, text-card RIGHT (Figma 558:31342) */}
            <div className="vt-row vt-row-reverse">
              <div className="vt-visual">
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH||""}/figma-rows/08-ai-agents.png?v=20260430a`} alt="AI Agents" />
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
                  <Link href="/pricing" className="vt-cta">Get Started now <span aria-hidden className="vt-cta-arrow">→</span></Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <WhoItsFor />

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
                          <li><Check size={16} strokeWidth={3} /><span>5 transcripts per day</span></li>
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
                                <span>Paste any transcript → 20+ proven hooks</span>
                              </div>
                            </li>
                            <li>
                              <Check size={16} strokeWidth={3} />
                              <div>
                                <strong>Viral Script Writer</strong>
                                <span>Turn any viral video into YOUR script</span>
                              </div>
                            </li>
                            <li>
                              <Check size={16} strokeWidth={3} />
                              <div>
                                <strong>Virality Explainer</strong>
                                <span>See exactly WHY videos blow up</span>
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
        <section className="users-info-section">
          <div className="container">
            <div className="inner-section">
              <div className="title-wrappe">
                <p>
                  41,000+ users have processed more than 2,600,000 videos so far
                </p>
              </div>
              <CounterComponent />
            </div>
          </div>
        </section>
        <BeforeAfter />
        <EnhenceExperience />
        <FaqSection />
        <div className="disclaimer-section">
          <div className="container">
            <div className="inner-section">
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
                  If you're struggling to come up with ideas or need to know
                  what a video is talking about you can easily download any
                  videos transcript / subtitles to easily come up with new ideas
                  or use for SEO and topic creation.
                </p>
              </div>
              <div className="content">
                <h4>UGC Creators:</h4>
                <p>
                  If you're struggling with what to say in your videos or just
                  want a quick reminder of what does work and doesn't work, you
                  can now download any transcript subtitles and reuse them for
                  any future video ideas you might have.
                </p>
              </div>
              <div className="content">
                <h4>AI:</h4>
                <p>
                  Easily download any TikTok, Reels, or Shorts video's video
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
