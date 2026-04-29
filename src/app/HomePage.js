"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header";
const ShareBar = dynamic(() => import("@/components/ShareBar"));
import magicIcon from "../assets/images/icons/magicIcon.svg";
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
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

const featureCards = [
  {
    icon: coverImg,
    title: "Save cover image",
    description: "Download HD cover images",
    imageBgClass: "blue",
    href: "#download-img",
  },
  {
    icon: downloadIcon,
    title: "Download HD video",
    description: "No watermarks, full quality",
    imageBgClass: "purple",
    href: "#download-video",
  },
  {
    icon: generateIcon,
    title: "Generate Viral Hooks",
    description: "Create viral hooks instantly",
    imageBgClass: "green",
    href: "#generate-hooks",
  },
  {
    icon: scriptIcon,
    title: "Rewrite scripts",
    description: "Turn transcripts to viral videos",
    imageBgClass: "yellow",
    href: "#rewrite-scripts",
  },
  {
    icon: analyzeImg,
    title: "Analyze Virality",
    description: "Learn why video went viral",
    imageBgClass: "orange",
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
              <Image src={tiktok1Icon} alt="TikTok" className="tiktok-icon" width={80} height={80} priority />
              <Image src={youtube1Icon} alt="YouTube" className="youtube-icon" width={80} height={80} priority />
              <Image src={instagram1Icon} alt="Instagram" className="instagram-icon" width={80} height={80} priority />
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
            <div className="ai-features-div">
              <div className="title text-center">
                <strong className="white w-600">
                  Try our latest AI features!
                </strong>
              </div>
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                {featureCards.map((item, index) => (
                  <div className="col mb-5" key={index}>
                    <div className="feature-card">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        className={item.imageBgClass}
                        width={35}
                        height={33}
                        loading="lazy"
                      />
                      <div className="content-div">
                        <strong className="ex-small white w-700">
                          {item.title}
                        </strong>
                        <p className="ex-small w-500">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <section className="preview-section">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <h2>
                  Preview: <br /> Your Dashboard Awaits
                </h2>
                <p className="fw-medium w-500">
                  Get instant access to all your transcripts, AI agents,
                  folders, bulk Uploads + more!
                </p>
              </div>
              <div className="dashboard-img-section">
                <div className="bottom-content-wrapper">
                  <div className="sign-up-div">
                    {user ? (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}
                        className="btn-style"
                      >
                        <IoLockClosed />
                        Access your full dashboard
                      </Link>
                    ) : (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/sign-up`}
                        className="btn-style"
                      >
                        <IoLockClosed />
                        Sign in to access your full dashboard
                      </Link>
                    )}
                  </div>
                  {/* <div className="trust-pilot-card">
                    <Image src={trustPilotLogo} alt="Trust Pilot Logo" />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-platform-section" id="how-it-works">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <span className="how-it-works-pill">How It Works</span>
                <h2>
                  #1 Video Transcript <br /> & Download Platform
                </h2>
                <p className="">
                  The best tool for video transcription, bulk <br /> downloads,
                  and AI content
                </p>
              </div>
              <div className="bulk-import-section light">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Bulk Importing</h3>
                      <p className="bulk-text-div">
                        Bulk import up to 50 TikTok, Instagram, or YouTube
                        Shorts links at once to quickly download transcripts in
                        bulk. Save time and manage large volumes of videos
                        efficiently, all in one place.
                      </p>
                      <ul>
                        <li>Bulk import up to 50 video links</li>
                        <li>TikTok, Instagram, and YouTube Shorts support</li>
                        <li>Bulk export all transcripts at once</li>
                        <li>Individual or batch processing options</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-4">
                      <Image
                        src={bulkProcess}
                        alt="Bulk transcript processing interface showing multiple TikTok video URLs being imported"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image
                        src={collectImg}
                        alt="Collection import interface showing TikTok profile videos being bulk downloaded"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>TikTok Collection & Playlist Importing</h3>
                      <p className="bulk-text-div">
                        Users can paste a single link to a public TikTok
                        collection (bookmarks) or a creator&apos;s playlist to
                        automatically import and transcribe all videos contained
                        within it. Playlists often represent a creator&apos;s
                        mini-series based on a specific subject, topic, or
                        series.
                      </p>
                      <ul>
                        <li>Public TikTok collection importing</li>
                        <li>Creator playlist auto-detection</li>
                        <li>Series and topic-based organization</li>
                        <li>Automatic metadata preservation</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Cloud Storage</h3>
                      <p className="bulk-text-div">
                        Store all your video transcripts securely in the cloud
                        with enterprise-grade encryption. Instantly sync and
                        access your files across every device. Anytime,
                        anywhere, with automatic cloud backup and unmatched
                        reliability.
                      </p>
                      <ul>
                        <li>Secure cloud storage with encryption</li>
                        <li>Cross-device automatic sync</li>
                        <li>Access from anywhere, anytime</li>
                        <li>Enterprise-grade reliability</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-3">
                      <Image
                        src={cloudSync}
                        alt="Cloud transcript library with saved transcripts organized by date"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section" id="history-bookmarking">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image
                        src={historyImg}
                        alt="Transcript history panel showing previously processed videos"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>History & Bookmarking</h3>
                      <p className="bulk-text-div">
                        Access a complete transcript history for every video you
                        process, automatically logging download dates,
                        transcript details, video sources, and durations.
                        Instantly re-download transcripts in TXT, XML, or PDF
                        formats, and organize your entire video library with
                        custom bookmark folders. Effortlessly share, bulk
                        export, or review transcripts, collections, and
                        playlists for ultimate video transcript organization and
                        workflow management.
                      </p>
                      <ul>
                        <li>Complete download history with metadata</li>
                        <li>Custom bookmark folders</li>
                        <li>Re-download in TXT, XML, PDF formats</li>
                        <li>Bulk export and sharing capabilities</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>HD Video & Cover Image Downloads</h3>
                      <p className="bulk-text-div">
                        Download TikTok, Instagram Reels, and YouTube Shorts
                        videos in HD quality with no watermarks. Instantly save
                        high-resolution cover images and preserve original video
                        quality across all supported platforms.
                      </p>
                      <ul>
                        <li>HD video downloads without watermarks</li>
                        <li>Cover image extraction and download</li>
                        <li>Multiple platform support</li>
                        <li>Original quality preservation</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image
                        src={mediaImg}
                        alt="Media download interface with video and cover image save options"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image
                        src={excessImg}
                        alt="Quick URL method showing paste-and-process transcript extraction"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Quick URL Download</h3>
                      <p className="bulk-text-div">
                        Instant video transcripts just add ‘tokscript.com/’ in
                        front of any video URL. Instantly redirect and download
                        transcripts without logging in or visiting the main
                        website. Fast, automatic, and works with every platform.
                      </p>
                      <ul>
                        <li>Instant URL-based downloading</li>
                        <li>No need to visit main website</li>
                        <li>Works with all supported platforms</li>
                        <li>Automatic redirect and processing</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Chrome Extension</h3>
                      <p className="bulk-text-div">
                        Use our Chrome extension to instantly copy video
                        transcripts to your clipboard or download them as .txt
                        files while watching TikTok, Instagram Reels, or YouTube
                        Shorts. No need to copy the URL. Works on both web and
                        mobile browsers for ultimate convenience.
                      </p>
                      <ul>
                        <li>One-click transcript download</li>
                        <li>Instant clipboard copying</li>
                        <li>Works on web and mobile browsers</li>
                        <li>No URL copying required</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image
                        src={extensionImg}
                        alt="TokScript Chrome extension panel overlay on a TikTok video page"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image
                        src={teamworkImg}
                        alt="Team workspace with shared transcript library and collaboration tools"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Team Collaboration</h3>
                      <p className="bulk-text-div">
                        For Agencies and Brands. Share, manage, and organize
                        transcripts with your team. Set permissions, collaborate
                        in real-time, and control access. Perfect for agencies,
                        editors, and educators.
                      </p>
                      <ul>
                        <li>Share transcripts with team members</li>
                        <li>Collaborate on projects in real-time</li>
                        <li>Manage workspace permissions</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>AI Agents</h3>
                      <p className="bulk-text-div">
                        AI-Powered Virality: Hooks, Viral Script writing & Video
                        Breakdown Unlock the secret weapons behind today’s top
                        viral videos, powered by AI. Designed for those who want
                        to win attention and grow fast.
                      </p>
                      <div className="ai-listing">
                        <ul>
                          <li>
                            Viral Hook Generator:
                            <p>
                              Generate scroll-stopping, proven hooks in seconds.
                              No more guessing or losing viewers in the first
                              five seconds.
                            </p>
                          </li>
                          <li>
                            Agent #2 Viral Script Writer:
                            <p>
                              Turn any video transcript into a brand new,
                              viral-ready script. Remix, mimic, and create
                              unique content with one click.
                            </p>
                          </li>
                          <li>
                            Agent #3 Virality Explainer:
                            <p>
                              See exactly why a video went viral. Get actionable
                              breakdowns of psychological triggers and algorithm
                              secrets, so you can repeat the formula.viral,
                              teaching and educating users along the way.
                            </p>
                          </li>
                        </ul>
                      </div>
                      <ul>
                        <li>Viral Hook Generator for instant engagement</li>
                        <li>Script rewriter with viral essence preservation</li>
                        <li>Virality psychology analysis and insights</li>
                        <li>One-click content transformation</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Get Started Now
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image
                        src={workspceImg}
                        alt="AI-powered dashboard showing transcript analysis and viral hook suggestions"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pricing-card-detail">
          <div className="container">
            <div className="title-section">
              <h3>Pricing</h3>
              <p>Find the plan that fits your content workflow</p>
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

              {/* Pricing Grid */}
              <div className="pricing-grid">
                <div className="row">
                  {/* Free */}
                  <div className="col-xl-4 col-lg-4 col-md-12">
                    <div
                      className={`pricing-card-wrapper ${
                        activeTab === "free" ? "active" : ""
                      }`}
                    >
                      <div className="pricing-card">
                        <div
                          className="relative z-10"
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ marginBottom: "0.5rem" }}>
                            <h3
                              className="card-title"
                              style={{ color: "#e6e6e6" }}
                            >
                              Free
                            </h3>
                            <p className="card-desc">Test the basics</p>
                          </div>
                          <div className="price-row">
                            <span
                              className="price-val"
                              style={{ color: "#e6e6e6" }}
                            >
                              $0
                            </span>
                            <span className="price-period">forever</span>
                          </div>
                          <div className="feature-group">
                            <Feature text="5 transcripts per day" />
                            <Feature text="5 translations per day" />
                            <Feature text="TikTok, Reels, Shorts" />
                            <Feature text="Basic Chrome Extension" />
                          </div>
                          <div
                            className="feature-group disabled"
                            style={{
                              opacity: 0.4,
                              borderTop: "1px solid var(--border-color)",
                              paddingTop: "1rem",
                            }}
                          >
                            <div
                              className="stat-lbl"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              NOT INCLUDED
                            </div>
                            <Feature text="AI Agents" excluded />
                            <Feature text="Bulk Import" excluded />
                          </div>
                          <div
                            style={{ marginTop: "auto", paddingTop: "1.5rem" }}
                          >
                            {user && user?.plan == "free" ? (
                              <button
                                disabled={true}
                                className="btn btn-outline"
                              >
                                Current Plan
                              </button>
                            ) : !user ? (
                              <>
                                {/* Desktop: Button opens modal */}
                                <button
                                  onClick={() => {
                                    // Open CheckoutOverlay for signup (no checkout redirect)
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
                                  className="btn btn-outline d-none d-md-flex justify-content-center"
                                >
                                  Get Started
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin`}
                                  className="btn btn-outline d-flex d-md-none justify-content-center"
                                >
                                  Get Started
                                </a>
                              </>
                            ) : (
                              <button
                                onClick={() => setDontMissOutModalShow(true)}
                                className="btn btn-outline"
                              >
                                Get Started
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12">
                    {/* Annual (Featured) */}
                    <div
                      className={`pricing-card-wrapper ${
                        activeTab === "annual" ? "active" : ""
                      }`}
                    >
                      <div className="pricing-card featured">
                        <div className="featured-border-gradient"></div>
                        <div className="crown-badge">
                          <Crown size={12} fill="currentColor" /> Recommended
                        </div>
                        <div
                          className="relative z-10"
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ marginBottom: "0.5rem" }}>
                            <h3 className="card-title">Annual</h3>
                            <p className="card-desc">
                              Best value for serious creators
                            </p>
                          </div>
                          <div className="price-row">
                            <span className="price-val">$39</span>
                            <span className="price-period">per year</span>
                          </div>

                          <div className="calc-box">
                            <div className="calc-box-highlight"></div>
                            <div
                              style={{
                                color: "#00D9B4",
                                fontWeight: 700,
                                fontSize: "12px",
                                lineHeight: "17px",
                                position: "relative",
                              }}
                            >
                              That's $3.25/month
                            </div>
                            <div
                              style={{
                                color: "#7a7a7a",
                                fontSize: "10px",
                                lineHeight: "16px",
                                position: "relative",
                              }}
                            >
                              (Monthly plan = $120/year)
                            </div>
                          </div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Sparkles
                                size={12}
                                className="text-yellow-400"
                                style={{ color: "#facc15" }}
                              />{" "}
                              UNLIMITED AI AGENTS
                            </div>
                            <Feature
                              text="Viral Hook Generator"
                              sub="Paste any transcript → Get 20+ proven hooks"
                              bold
                            />
                            <Feature
                              text="Viral Script Writer"
                              sub="Turn any viral video into YOUR script"
                              bold
                            />
                            <Feature
                              text="Virality Explainer"
                              sub="See exactly WHY videos blow up"
                            />
                          </div>

                          <div className="divider"></div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-emerald-400"
                                style={{ color: "#00D9B4" }}
                              />{" "}
                              BULK PROCESSING
                            </div>
                            <Feature text="Unlimited transcripts (no daily cap)" />
                            <Feature text="Unlimited translations (any language)" />
                            <Feature text="Bulk import 50 videos at once" />
                            {/* Platform Logos */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                                margin: "0.75rem 0",
                                paddingLeft: "1.75rem",
                                opacity: 0.9,
                              }}
                            >
                              <TikTokIcon
                                className="w-2 h-2 text-white"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <InstagramIcon
                                className="w-2 h-2 text-white"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <YoutubeIcon
                                className="w-2 h-2 text-white"
                                style={{ width: "16px", height: "16px" }}
                              />
                              <span
                                style={{
                                  fontSize: "0.625rem",
                                  color: "#7a7a7a",
                                  fontWeight: 500,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                All Platforms
                              </span>
                            </div>
                            <Feature text="HD video downloads (no watermark)" />
                          </div>

                          <div style={{ marginTop: "2rem" }}>
                            {loading ? (
                              <button disabled className="btn btn-primary">
                                Loading...
                              </button>
                            ) : user ? (
                              profile?.plan == "pro" &&
                              profile?.subscription?.status === "active" &&
                              profile.subscription.lemonSqueezyVariantId ===
                                allPlans.find((plan) =>
                                  plan.title?.toLowerCase().includes("annual"),
                                )?.variantId ? (
                                <button
                                  disabled={true}
                                  className="btn btn-outline"
                                >
                                  Current Plan
                                </button>
                              ) : profile?.plan == "pro" &&
                                profile?.plan !== "free" &&
                                profile.subscription?.status === "active" ? (
                                <button
                                  disabled={
                                    loadingStates[
                                      allPlans.find((plan) =>
                                        plan.title
                                          ?.toLowerCase()
                                          .includes("annual"),
                                      )?.variantId
                                    ]
                                  }
                                  onClick={() => {
                                    const annualPlan = allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("annual"),
                                    );
                                    if (annualPlan) {
                                      handleUpgradeClick(
                                        annualPlan.variantId,
                                        "annual",
                                      );
                                    }
                                  }}
                                  className="btn btn-outline"
                                >
                                  {loadingStates[
                                    allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("annual"),
                                    )?.variantId
                                  ]
                                    ? "Processing..."
                                    : "Upgrade"}
                                </button>
                              ) : (
                                <>
                                  {/* Desktop: Button opens modal */}
                                  <button
                                    onClick={() => {
                                      const annualPlan = allPlans.find((plan) =>
                                        plan.title
                                          ?.toLowerCase()
                                          .includes("annual"),
                                      );
                                      if (annualPlan) {
                                        handleCheckout(annualPlan);
                                      }
                                    }}
                                    className="btn btn-primary d-none d-md-flex"
                                  >
                                    Get Annual - Save $81
                                    <ArrowRight size={20} strokeWidth={3} />
                                  </button>
                                  {/* Mobile: Anchor redirects to signin */}
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                                    className="btn btn-primary d-flex d-md-none"
                                  >
                                    Get Annual - Save $81
                                    <ArrowRight size={20} strokeWidth={3} />
                                  </a>
                                </>
                              )
                            ) : (
                              <>
                                {/* Desktop: Button opens modal */}
                                <button
                                  onClick={() => {
                                    const annualPlan = allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("annual"),
                                    );
                                    if (annualPlan) {
                                      handleCheckout(annualPlan);
                                    }
                                  }}
                                  className="btn btn-primary d-none d-md-flex"
                                >
                                  Get Annual - Save $81
                                  <ArrowRight size={20} strokeWidth={3} />
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                                  className="btn btn-primary d-flex d-md-none"
                                >
                                  Get Annual - Save $81
                                  <ArrowRight size={20} strokeWidth={3} />
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12">
                    {/* Monthly */}
                    <div
                      className={`pricing-card-wrapper ${
                        activeTab === "monthly" ? "active" : ""
                      }`}
                    >
                      <div className="pricing-card">
                        <div
                          className="relative z-10"
                          style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div style={{ marginBottom: "0.5rem" }}>
                            <h3
                              className="card-title"
                              style={{ color: "#e6e6e6" }}
                            >
                              Monthly
                            </h3>
                            <p className="card-desc">
                              Full power, flexible billing
                            </p>
                          </div>
                          <div className="price-row">
                            <span
                              className="price-val"
                              style={{ color: "#e6e6e6" }}
                            >
                              $10
                            </span>
                            <span className="price-period">per month</span>
                          </div>

                          <div
                            className="calc-box"
                            style={{
                              background: "transparent",
                              border: "1px solid var(--border-color)",
                            }}
                          >
                            <div
                              style={{ color: "#7a7a7a", fontSize: "0.75rem" }}
                            >
                              = $120/year
                            </div>
                            <div
                              style={{ color: "#7a7a7a", fontSize: "0.625rem" }}
                            >
                              Annual saves $81
                            </div>
                          </div>

                          <div className="feature-group">
                            <p
                              className="stat-lbl"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              EVERYTHING IN ANNUAL:
                            </p>
                            <Feature text="All 3 AI Agents (unlimited)" />
                            <Feature text="Unlimited transcripts" />
                            <Feature text="Unlimited translations" />
                            <Feature text="Bulk import 50 videos" />
                          </div>

                          <div
                            className="feature-group listing"
                            style={{
                              display: "flex",
                              gap: "0.5rem",
                              fontSize: "0.625rem",
                              color: "#eab308",
                            }}
                          >
                            <TrendingUp size={12} />{" "}
                            <span
                              style={{ color: "#eab308", fontSize: "10px" }}
                            >
                              Costs $81 more per year
                            </span>
                          </div>
                          <div
                            style={{
                              marginTop: "auto",
                              paddingTop: "1.5rem",
                              borderTop: "1px solid var(--border-color)",
                            }}
                          >
                            {loading ? (
                              <button disabled className="btn btn-outline">
                                Loading...
                              </button>
                            ) : user ? (
                              profile?.plan == "pro" &&
                              profile?.subscription?.status === "active" &&
                              profile.subscription.lemonSqueezyVariantId ===
                                allPlans.find((plan) =>
                                  plan.title?.toLowerCase().includes("monthly"),
                                )?.variantId ? (
                                <button
                                  disabled={true}
                                  className="btn btn-outline"
                                >
                                  Current Plan
                                </button>
                              ) : profile?.plan == "pro" &&
                                profile?.plan !== "free" &&
                                profile.subscription?.status === "active" ? (
                                <button
                                  disabled={
                                    loadingStates[
                                      allPlans.find((plan) =>
                                        plan.title
                                          ?.toLowerCase()
                                          .includes("monthly"),
                                      )?.variantId
                                    ]
                                  }
                                  onClick={() => {
                                    const monthlyPlan = allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("monthly"),
                                    );
                                    if (monthlyPlan) {
                                      handleUpgradeClick(
                                        monthlyPlan.variantId,
                                        "monthly",
                                      );
                                    }
                                  }}
                                  className="btn btn-outline"
                                >
                                  {loadingStates[
                                    allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("monthly"),
                                    )?.variantId
                                  ]
                                    ? "Processing..."
                                    : "Upgrade"}
                                </button>
                              ) : (
                                <>
                                  {/* Desktop: Button opens modal */}
                                  <button
                                    className="btn btn-outline d-none d-md-flex"
                                    onClick={() => {
                                      const monthlyPlan = allPlans.find(
                                        (plan) =>
                                          plan.title
                                            ?.toLowerCase()
                                            .includes("monthly"),
                                      );
                                      if (monthlyPlan) {
                                        handleCheckout(monthlyPlan);
                                      }
                                    }}
                                    style={{
                                      background: "rgba(13, 13, 13, 0.5)",
                                      border: "1px solid #2a2a2a",
                                    }}
                                  >
                                    Get Monthly
                                  </button>
                                  {/* Mobile: Anchor redirects to signin */}
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                                    className="btn btn-outline d-flex d-md-none"
                                    style={{
                                      background: "rgba(13, 13, 13, 0.5)",
                                      border: "1px solid #2a2a2a",
                                    }}
                                  >
                                    Get Monthly
                                  </a>
                                </>
                              )
                            ) : (
                              <>
                                {/* Desktop: Button opens modal */}
                                <button
                                  className="btn btn-outline d-none d-md-flex"
                                  onClick={() => {
                                    const monthlyPlan = allPlans.find((plan) =>
                                      plan.title
                                        ?.toLowerCase()
                                        .includes("monthly"),
                                    );
                                    if (monthlyPlan) {
                                      handleCheckout(monthlyPlan);
                                    }
                                  }}
                                  style={{
                                    background: "rgba(13, 13, 13, 0.5)",
                                    border: "1px solid #2a2a2a",
                                  }}
                                >
                                  Get Monthly
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                                  className="btn btn-outline d-flex d-md-none"
                                  style={{
                                    background: "rgba(13, 13, 13, 0.5)",
                                    border: "1px solid #2a2a2a",
                                  }}
                                >
                                  Get Monthly
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
                    style={{ color: "#00D9B4" }}
                  >
                    Instagram Reels
                  </Link>
                  , and{" "}
                  <Link
                    href="/youtube-transcript-generator"
                    style={{ color: "#00D9B4" }}
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
                    style={{ color: "#00D9B4" }}
                  >
                    YouTube Shorts
                  </Link>
                  , and{" "}
                  <Link
                    href="/instagram-transcript-generator"
                    style={{ color: "#00D9B4" }}
                  >
                    Instagram Reels
                  </Link>{" "}
                  videos instantly! See our{" "}
                  <Link href="/pricing" style={{ color: "#00D9B4" }}>
                    pricing plans
                  </Link>{" "}
                  or learn more{" "}
                  <Link href="/about-us" style={{ color: "#00D9B4" }}>
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
