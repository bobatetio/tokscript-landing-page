"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Header from "../../components/Header";
const ShareBar = dynamic(() => import("@/components/ShareBar"));
import magicIcon from "../../assets/images/icons/magicIcon.svg";
import coverImg from "../../assets/images/icons/coverImg.svg";
import downloadIcon from "../../assets/images/icons/download-lg.svg";
import generateIcon from "../../assets/images/icons/generate-viral.svg";
import scriptIcon from "../../assets/images/icons/script.svg";
import analyzeImg from "../../assets/images/icons/analyze.svg";
import { IoLockClosed, IoVideocam, HiLanguage, FaBrain, FaBolt, FaCircle, FaCloud, FaCopy, FaDownload, FaFireAlt, FaFolder, FaImage, FaLink, FaPenFancy, FaPlus, FaShare, FaChevronDown, TbBrandTiktok, TbBrandInstagram, TbBrandYoutube } from "@/components/Icons";
import trustPilotLogo from "../../assets/images/trustpilot.svg";
import bulkIcon from "../../assets/images/icons/bulk-card.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import tiktokIocn from "../../assets/images/icons/tiktok.svg";
import sarah from "../../assets/images/sarah.webp";
import john from "../../assets/images/john-smith.webp";
import sparkIcon from "../../assets/images/icons/AI spark.svg";
import tiktokIcon from "../../assets/images/icons/Tiktok logo.svg";
import youtubeIcon from "../../assets/images/icons/Youtube logo.svg";
import instagramIcon from "../../assets/images/icons/Instagram logo.svg";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import tiktok1Icon from "../../assets/images/icons/tiktok1-icon.svg";
import instagram1Icon from "../../assets/images/icons/insta1-con.svg";
import youtube1Icon from "../../assets/images/icons/youtube1-icon.svg";
const Footer = dynamic(() => import("../../components/Footer"));
const FaqSection = dynamic(() => import("../../components/FaqSection"));
const ProcessComponent = dynamic(() => import("@/components/ProcessComponent"));
const VideoLargeComponent = dynamic(() => import("@/components/VideoLargeComponent"));
const TokToolsFeatures = dynamic(() => import("@/components/TokToolsFeatures"));
import bulkProcess from "../../assets/images/bulking-process.webp";
import cloudSync from "../../assets/images/cloud.webp";
import historyImg from "../../assets/images/history-img.webp";
import mediaImg from "../../assets/images/media-dwnld.webp";
import excessImg from "../../assets/images/excess-method.webp";
import workspceImg from "../../assets/images/ai-dashboard.webp";
const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const LoadingScreenComponent = dynamic(() => import("@/components/LoadingScreenComponent"));
import axios from "axios";
import unlockImg from "../../assets/images/UnLock-agent.webp";
import { useRouter } from "next/navigation";
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });
import { toast } from "react-toastify";
const CounterComponent = dynamic(() => import("@/components/CounterComponent"));
import { Modal } from "react-bootstrap";
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

// Icon Components for Pricing
const TikTokIconSVG = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIconSVG = ({ style }) => (
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

const YoutubeIconSVG = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

// Feature Component for Pricing Cards
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
    description: "Pull Shorts thumbnails in HD",
    imageBgClass: "blue",
  },
  {
    icon: downloadIcon,
    title: "Download HD video",
    description: "Original quality, no watermarks",
    imageBgClass: "purple",
  },
  {
    icon: generateIcon,
    title: "Generate Viral Hooks",
    description: "Opening lines that keep viewers",
    imageBgClass: "green",
  },
  {
    icon: scriptIcon,
    title: "Rewrite scripts",
    description: "Build new Shorts from winning ones",
    imageBgClass: "yellow",
  },
  {
    icon: analyzeImg,
    title: "Analyze Virality",
    description: "Understand what drives Shorts views",
    imageBgClass: "orange",
  },
];

const LANGUAGES = [
  { code: "none", name: "English" },
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


export default function YouTubeLandingPage() {
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

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState("annual");
  const [translateDropdownOpen, setTranslateDropdownOpen] = useState(false);
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("none");
  const translateRef = useRef(null);

  const getProduct = async () => {
    var responsed;
    if (process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID == "645484") {
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
        /*if (parsedUser && parsedUser?.plan !== "free") {
           window.location.href = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`;
         } */
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

  // Handle click outside translate dropdown
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
        setDontMissOutModalShow(true);
        return;
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}`;
      }
    } else {
      // Single link - proceed with normal fetchTikTokData
      if (!user || user == null) {
        /* if (
          videoLink?.includes("youtube.com") ||
          videoLink?.includes("youtu.be") ||
          videoLink?.includes("instagram.com")
        ) {
          setDontMissOutModalShow(true);
          return;
        }
        fetchTikTokData(); */
        if (videoLink?.includes("tiktok.com")) {
          /* fetchTikTokData(); */
          window.location.href = `/${videoLink.trim()}`;
        } else {
          setDontMissOutModalShow(true);
          return;
        }
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}` + (selectedLanguage !== "none" ? `&translate=${selectedLanguage}` : "");
      }
    }
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

      let paramValues = {
        video: videoLink.trim(),
        get_transcript: "true",
        ip: userIP,
      }

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
        },
      );

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
    // Check if user is logged in
    if (!user || !token) {
      const returnUrl = encodeURIComponent(window.location.href);
      // Redirect to sign-in with return URL
      router.push(`/app/sign-up?returnUrl=${product.buyUrl}`);
      return;
    }

    const productId = product.id || "monthly";
    setLoadingStates((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    try {
      // Option 2: Direct LemonSqueezy URL (primary method)
      const checkoutUrl =
        product.buyUrl +
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
          plan: selectedPlan.toLowerCase(),
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
    description: "Test the basics",
    price: "$0",
    features: [
      "5 YouTube Shorts transcripts per day",
      "5 translations per day",
      "YouTube Shorts, TikTok, Reels",
      "Basic features included",
    ],
  };

  // Static features for paid plans
  const paidPlanFeatures = [
    "Unlimited transcripts & bulk downloads",
    "Unlimited translations",
    "Bulk import 50 video links at once",
    "Instagram Reels & YouTube Shorts (unlimited)",
    "Download HD videos (no watermark) + Cover Images",
    "Quick URL method: just add tokscript.com/",
    "Export in multiple formats: .txt, .xml, .json, .csv",
  ];

  // Transform API data to match our component structure
  const transformPlansData = () => {
    const productId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID;
    if (!productsData?.data?.find((item) => item?.id == productId)?.variants)
      return [];

    const variants = productsData.data.find(
      (item) => item?.id == productId,
    )?.variants;
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
        description: "Full power, flexible billing",
        price: `$${(monthlyVariant.attributes.price / 100).toFixed(0)}`,
        period: "/ per month",
        features: paidPlanFeatures,
        img: unlockImg,
        variantId: monthlyVariant.id,
        productId: productId, // Include product ID
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${monthlyVariant.attributes.slug}`,
      });
    }

    if (annualVariant) {
      plans.push({
        title: "Pro Annual",
        description: "Best value for serious creators",
        price: `$${(annualVariant.attributes.price / 100).toFixed(0)}`,
        period: "/ per year",
        features: paidPlanFeatures,
        img: unlockImg,
        variantId: annualVariant.id,
        productId: productId, // Include product ID
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${annualVariant.attributes.slug}`,
      });
    }

    return plans;
  };

  // Combine free plan with API plans
  const allPlans = [freePlan, ...transformPlansData()];

  // FAQ data for YouTube Shorts page
  const youtubeFaqData = [
    {
      title: "What is the best free YouTube transcript generator?",
      content:
        <>
          <a href="https://tokscript.com" target="_blank" rel="noopener noreferrer">TokScript</a> is a free YouTube transcript generator that works directly from any YouTube URL with no software, no login, and no file upload. It supports YouTube Shorts, standard videos, and bulk processing of up to 50 links at once.
        </>,
    },
    {
      title: "How do I generate a transcript from a YouTube video?",
      content:
        'Copy the YouTube video URL, paste it into TokScript, and click "Generate Transcript." Your full YouTube transcript is ready in seconds and available to download as TXT, PDF, or XML.',
    },
    {
      title: "How do I convert YouTube video to text for free?",
      content:
        "Use TokScript's free YouTube to text converter. Paste any YouTube link into the tool above, click scan, and download the full transcript at no cost. Free accounts include 5 transcripts per day.",
    },
    {
      title: "Does this YouTube transcript generator work with regular YouTube videos, not just Shorts?",
      content:
        "Yes. TokScript transcribes YouTube Shorts, standard YouTube videos, and longer content. Free plans support shorter videos, while paid plans unlock transcription for videos of any length.",
    },
    {
      title: "Can I generate transcripts from multiple YouTube videos at once?",
      content:
        "Yes. TokScript supports bulk transcript generation. Paste up to 50 YouTube video links at once and get every transcript processed in a single batch.",
    },
    {
      title: "What formats can I download a YouTube transcript in?",
      content:
        "TokScript exports YouTube transcripts in TXT (plain text), PDF (formatted document), and XML (structured data for subtitles or developer use).",
    },
    {
      title: "Can I translate a YouTube transcript into another language?",
      content:
        "Yes. Select your target language before scanning and TokScript delivers the translated transcript alongside the original. 11+ languages are supported on paid plans, with the most popular languages available on the free plan.",
    },
    {
      title: "Do I need a YouTube account to generate a transcript?",
      content:
        "No. You only need the YouTube video URL. No YouTube login, no TokScript account for free usage, and no software installation required.",
    },
    {
      title: "Is this YouTube transcript generator accurate?",
      content:
        "TokScript uses a dual-verification system, pulling YouTube's native caption data and cross-referencing it with an independent AI transcription layer to maximize accuracy across all video types.",
    },
    {
      title: "Can I use the transcript with AI tools like ChatGPT or Claude?",
      content:
        "Yes. Export your YouTube transcript as TXT and paste it directly into ChatGPT, Claude, Gemini, or any other AI tool. TokScript also has built-in AI agents for hook generation, script rewriting, and virality analysis.",
    },
    {
      title: "Can I transcribe unlisted YouTube videos?",
      content:
        "Yes. Unlisted YouTube videos are accessible to anyone with the link, so TokScript can pull the transcript as long as you have the URL.",
    },
    {
      title: "How do I get a YouTube transcript without using YouTube's built-in captions?",
      content:
        "YouTube's built-in captions are view-only and cannot be downloaded as a file. TokScript extracts the full transcript from any YouTube video and lets you download it as TXT, PDF, or XML instantly. No YouTube account needed.",
    },
    {
      title: "What is the most accurate YouTube transcript generator online?",
      content:
        "TokScript uses a dual-verification system that combines YouTube's native caption data with an independent AI speech layer, making it one of the most accurate free YouTube transcript generators available online.",
    },
  ];

  return (
    <div className="landing-page youtube-landing-page">
      <Header />
      <div className="inner-page">
        <div className="banner-section">
          <div className="container">
            <div className="inner-section">
              <div className="banner-content-wrapper">
                <button className="ai-btn">
                  <Image src={magicIcon} alt="" />
                  AI Powered
                </button>
                <h1 className="cyan-pink-gradient w-600 large">
                  YouTube<br />Transcript Generator{" "}
                </h1>
                <p>
                  Generate a transcript from any YouTube video or Short in seconds.
                </p>
              </div>
              <div
                className={`chat-input-container${error ? " has-error" : ""}`}
              >
                <textarea
                  placeholder={error || "Paste up to 50 YouTube Shorts links here"}
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
                              className={`translate-option ${selectedLanguage === lang.name ? "selected" : ""}`}
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
                      disabled={isLoading}
                    >
                      <FaBolt />
                      {isLoading
                        ? "Loading..."
                        : videoLink.trim()
                          ? "Download"
                          : "Scan Video"}
                    </button>
                  </div>
                </div>
              </div>
              <p className="helper-text">
                Process up to 50 YouTube Shorts at once. Bulk transcribe, translate, and export in seconds.
              </p>
              <div className="social-platform-buttons">
                <span className="platform-label">Supports:</span>
                <span className="platform-btn">
                  <TbBrandYoutube />
                  Shorts
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandTiktok />
                  TikTok
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandInstagram />
                  Reels
                </span>
              </div>
              {error && (
                <div className="error-message" style={{ marginTop: "10px" }}>
                  {error}
                </div>
              )}
              <Image
                src={youtube1Icon}
                alt=""
                className="youtube-icon"
              />
              <Image
                src={tiktok1Icon}
                alt=""
                className="tiktok-icon"
              />
              <Image
                src={instagram1Icon}
                alt=""
                className="instagram-icon"
              />
            </div>
            <div className="about-toktools-section">
              <div className="inner-section-wrapper">
                {/* <ProcessComponent /> */}
                {videoData && (
                  <VideoLargeComponent
                    videoData={videoData}
                    user={user}
                    setDontMissOutModalShow={setDontMissOutModalShow}
                  />
                )}
                {videoData && (
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
                  AI-powered tools for YouTube Shorts creators
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
                  Preview: Your Dashboard Awaits
                </h2>
                <p className="fw-medium w-500">
                  Your YouTube Shorts transcripts, AI agents, folders, and bulk tools are ready inside.
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
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section" id="how-it-works-shorts">
          <div className="container">
            <h2>How to Transcribe YouTube Videos</h2>
            <p className="how-it-works-subtitle">TokScript lets you generate a YouTube transcript in three steps.<br />No extensions, no software, and no YouTube account required.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Copy the YouTube Video or Shorts Link</h3>
                  <p>Open the YouTube video or Short you want to transcribe. On mobile, tap Share then Copy Link. On desktop, right-click the video or copy the URL directly from your browser&apos;s address bar. Any public YouTube video URL works: Shorts, long-form videos, and unlisted links included.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Paste the Link into TokScript</h3>
                  <p>Come back to this page and paste your YouTube link into the input field above. Need to generate transcripts in bulk? Paste up to 50 YouTube video links at once. TokScript handles each one in a single batch with no extra steps.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Download Your YouTube Transcript</h3>
                  <p>Click &quot;Generate Transcript&quot; and your full text is ready in seconds. TokScript cross-references YouTube&apos;s native caption data with its own AI speech recognition engine for the highest accuracy across all video types. Download as TXT, PDF, or XML, or feed your transcript directly into ChatGPT, Claude, or Gemini.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-platform-section" id="how-it-works">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <h2>YouTube Shorts Transcript Generator</h2>
                <p className="">
                  2.6M+ videos processed. Built specifically for YouTube Shorts transcripts, not a generic transcription tool that treats every video the same. Convert any public YouTube Short into clean, accurate text in seconds. Paste the YouTube link, get the full transcript, and put it to work: repurpose into scripts, research competitor YouTube Shorts, fuel AI workflows, or create captions without replaying a single video.
                </p>
              </div>

              {/* Section 1: Bulk Importing - text left, image right */}
              <div className="bulk-import-section light">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Bulk YouTube Transcript Generation</h3>
                      <p className="bulk-text-div">
                        Stop processing videos one at a time. TokScript lets you paste up to 50 YouTube video links at once and generates every transcript in a single batch, completely free for your first 5 videos per day, with no account required to get started. While built for YouTube, TokScript also handles TikTok and Instagram Reels in the same import. All transcripts are processed simultaneously and ready to download in seconds.
                      </p>
                      <ul>
                        <li>Process up to 50 YouTube video links in one batch</li>
                        <li>Mix YouTube, TikTok, and Instagram Reels in a single import</li>
                        <li>Download all transcripts at once or select individual results</li>
                        <li>Switch between bulk mode and single-video transcript generation</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-4">
                      <Image src={bulkProcess} alt="Bulk transcript processing interface showing multiple YouTube Shorts URLs being imported" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Cloud Storage - text left, image right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Cloud Library and Transcript History</h3>
                      <p className="bulk-text-div">
                        Every YouTube transcript you generate is saved automatically to your TokScript cloud library. Access your full transcript history from any device, re-download past transcripts in any format, and organize everything into bookmark folders by topic, campaign, or creator. No manual file management, no lost transcripts.
                      </p>
                      <ul>
                        <li>All YouTube transcripts auto-saved to the cloud</li>
                        <li>Access your full library from any browser or device</li>
                        <li>Organize transcripts into folders by channel, topic, or project</li>
                        <li>Re-download any past transcript in TXT, PDF, or XML</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-3">
                      <Image src={cloudSync} alt="Cloud transcript library with saved transcripts organized by date" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: History & Bookmarking - image left, text right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={historyImg} alt="Transcript history panel showing previously processed videos" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>YouTube Video to Text — Multiple Export Formats</h3>
                      <p className="bulk-text-div">
                        Once TokScript converts your YouTube video to text, you choose how to use it. Export your transcript as a plain TXT file for copying into documents, a structured XML file for developers and subtitles, or a formatted PDF for sharing and archiving. Every export is clean, accurate, and ready to use immediately, free to download with no watermarks.
                      </p>
                      <ul>
                        <li>TXT for copy-paste into any document or AI tool</li>
                        <li>PDF for formatted, shareable transcripts</li>
                        <li>XML for structured subtitle and developer use</li>
                        <li>One-click download from your transcript history</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: HD Video & Cover Image Downloads - text left, image right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Translate YouTube Transcripts into 11+ Languages</h3>
                      <p className="bulk-text-div">
                        Select a target language before scanning and TokScript delivers your YouTube transcript already translated. All 11+ languages are available on paid plans, with a selection of the most popular languages available on the free plan. Turn an English-language video into a Spanish, French, Arabic, Japanese, or Portuguese transcript in one click. Perfect for international content research, multilingual subtitles, or adapting viral videos for new audiences.
                      </p>
                      <ul>
                        <li>11+ languages supported on paid plans</li>
                        <li>Most popular languages available on the free plan</li>
                        <li>Translation delivered with the transcript, not after</li>
                        <li>Combine transcript generation and translation in a single step</li>
                        <li>Works across YouTube Shorts, videos, TikTok, and Reels</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={mediaImg} alt="Media download interface with video and cover image save options" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Quick URL Download - image left, text right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={excessImg} alt="Quick URL method showing paste-and-process transcript extraction" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Quick URL Method — Transcript in One Step</h3>
                      <p className="bulk-text-div">
                        Want even faster access? Add tokscript.com/ before any YouTube video URL in your browser address bar and hit Enter. TokScript auto-processes the link and delivers your transcript instantly. No homepage visit, no paste, no extra clicks. The fastest way to convert YouTube to text online on any device.
                      </p>
                      <ul>
                        <li>Add tokscript.com/ before any YouTube URL for instant transcription</li>
                        <li>No need to visit the main site or log in</li>
                        <li>Works for YouTube Shorts, standard videos, TikTok, and Reels</li>
                        <li>Zero extra steps: transcript delivered immediately</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: AI Agents - text left, image right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>AI Agents for YouTube Creators</h3>
                      <p className="bulk-text-div">
                        TokScript includes three AI agents trained specifically on short-form video performance data. Feed any YouTube transcript into the agents and get tools no other transcript generator offers, all available online, no software required.
                      </p>
                      <div className="ai-listing">
                        <ul>
                          <li>
                            Viral Hook Generator:
                            <p>
                              Paste a YouTube transcript and get 20+ opening hooks engineered to retain viewers past the critical first 3 seconds.
                            </p>
                          </li>
                          <li>
                            Viral Script Writer:
                            <p>
                              Take any transcript from a high-performing YouTube video and generate a brand-new script that preserves the structure, pacing, and psychology that made it work.
                            </p>
                          </li>
                          <li>
                            Virality Explainer:
                            <p>
                              Get a full breakdown of why a specific YouTube Short or video went viral, covering hook strength, content pacing, audience psychology, and algorithmic signals.
                            </p>
                          </li>
                        </ul>
                      </div>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={workspceImg} alt="AI-powered dashboard showing transcript analysis and viral hook suggestions" />
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
              <h2>Pricing</h2>
              <p>Find the plan that fits your content workflow</p>
            </div>

            <div className="pricing-page-new youtube-shorts-pricing">
              {/* Mobile Tabs */}
              <div className="mobile-tabs">
                <div className="tab-container">
                  <button
                    className={`tab-btn ${activeTab === "free" ? "active" : "inactive"
                      }`}
                    onClick={() => setActiveTab("free")}
                  >
                    Free
                  </button>
                  <button
                    className={`tab-btn featured ${activeTab === "annual" ? "active" : "inactive"
                      }`}
                    onClick={() => setActiveTab("annual")}
                  >
                    Annual
                  </button>
                  <button
                    className={`tab-btn ${activeTab === "monthly" ? "active" : "inactive"
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
                      className={`pricing-card-wrapper ${activeTab === "free" ? "active" : ""
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
                            <Feature text="5 YouTube Shorts transcripts per day" />
                            <Feature text="5 translations per day" />
                            <Feature text="YouTube Shorts, TikTok, Reels" />
                            <Feature text="Basic features included" />
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
                      className={`pricing-card-wrapper ${activeTab === "annual" ? "active" : ""
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
                                color: "#ff5252",
                                fontWeight: 700,
                                fontSize: "12px",
                                lineHeight: "17px",
                                position: "relative",
                              }}
                            >
                              That&apos;s $3.25/month
                            </div>
                            <div
                              style={{
                                color: "#64748b",
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
                              bold
                              sub="Paste any Shorts transcript, get 20+ proven hooks"
                            />
                            <Feature
                              text="Viral Script Writer"
                              bold
                              sub="Turn any viral Short into YOUR script"
                            />
                            <Feature
                              text="Virality Explainer"
                              bold
                              sub="See exactly WHY Shorts blow up"
                            />
                          </div>

                          <div className="divider"></div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-cyan-400"
                                style={{ color: "#ff5252" }}
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
                              <YoutubeIconSVG
                                style={{ width: "16px", height: "16px" }}
                              />
                              <TikTokIconSVG
                                style={{ width: "16px", height: "16px" }}
                              />
                              <InstagramIconSVG
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
                                  className="btn btn-primary"
                                >
                                  Get Annual, Save $81
                                  <ArrowRight size={20} strokeWidth={3} />
                                </button>
                              )
                            ) : (
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
                                className="btn btn-primary"
                              >
                                Get Annual, Save $81
                                <ArrowRight size={20} strokeWidth={3} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12">
                    {/* Monthly */}
                    <div
                      className={`pricing-card-wrapper ${activeTab === "monthly" ? "active" : ""
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
                              style={{ color: "#64748b", fontSize: "0.625rem" }}
                            >
                              Annual saves $81
                            </div>
                          </div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-cyan-400"
                                style={{ color: "#ff5252" }}
                              />{" "}
                              EVERYTHING IN ANNUAL:
                            </div>
                            <Feature text="All 3 AI Agents (unlimited)" />
                            <Feature text="Unlimited transcripts" />
                            <Feature text="Unlimited translations" />
                            <Feature text="Bulk import 50 videos" />
                          </div>

                          <div className="divider"></div>

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
                            style={{ marginTop: "auto", paddingTop: "1.5rem" }}
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
                                <button
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
                                  className="btn btn-outline"
                                >
                                  Get Monthly
                                </button>
                              )
                            ) : (
                              <button
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
                                className="btn btn-outline"
                              >
                                Get Monthly
                              </button>
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
                <p>41,000+ creators have processed more than 2,600,000 videos across all platforms</p>
              </div>
              <CounterComponent />
            </div>
          </div>
        </section>
        <section className="who-uses-cards-section">
          <div className="container">
            <div className="who-uses-cards-intro">
              <h2>Who Uses TokScript&apos;s YouTube Transcript Generator</h2>
              <p>TokScript is built for anyone who needs to turn YouTube video into usable text, fast.<br />Here&apos;s how different users put it to work.</p>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Content Creators</h3>
                  <p>Generate transcripts from your own YouTube videos to repurpose content into blog posts, newsletters, social captions, and scripts. Feed transcripts into AI tools to speed up your entire content workflow.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Educators and Researchers</h3>
                  <p>Convert YouTube video lectures, tutorials, and documentaries into searchable text. Build a reference library from any channel, create study notes, or analyze what top creators are actually saying.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Marketers and Ad Analysts</h3>
                  <p>Studying competitor YouTube Shorts or analyzing what ad scripts are working? Transcribe any YouTube video ad, extract the copy, and use it to inform your own creative strategy, all in seconds.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>AI and Automation Users</h3>
                  <p>Pull any YouTube video transcript and feed it directly to ChatGPT, Claude, Gemini, or any AI workflow. TokScript is the fastest way to get clean, structured YouTube text into any AI pipeline.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>UGC Creators and Influencers</h3>
                  <p>Stop replaying the same Shorts over and over trying to catch every line. Download the transcript, read it in full, and use TokScript&apos;s AI agents to rewrite it with your own voice and angle in minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FaqSection faqData={youtubeFaqData} />
        <section className="ready-to-convert-section">
          <div className="container">
            <div className="inner-section">
              <h2>Ready to Convert Your YouTube Short?</h2>
              <p>Paste a Shorts link. Get every spoken word back in text. Free.</p>
              <Link href="#" className="ready-to-convert-cta" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Start Transcribing Free</Link>
            </div>
          </div>
        </section>
        <div className="disclaimer-section">
          <div className="container">
            <div className="inner-section">
              <div className="content">
                <h2>About TokScript: Free YouTube Shorts Transcript Generator</h2>
                <p>
                  TokScript was built around one idea: the spoken word inside YouTube Shorts is content most people scroll past but never capture. Creators film, viewers watch, and the script behind every high-performing Short disappears into the feed. We built TokScript to change that.
                </p>
                <p>
                  Paste a link to any public YouTube Short. The full transcript is ready in seconds. No software to install, no files to upload, no account required to start. Built for content creators, educators, marketers, and anyone who wants to turn Shorts into text they can read, search, and reuse.
                </p>
                <p>
                  41,000+ users trust TokScript as part of their daily workflow. Over 2.6 million videos processed and counted.
                </p>
              </div>
              <div className="content">
                <h3>YouTube Ads Research</h3>
                <p>
                  Studying YouTube Shorts ads or researching what competitors are running? Download the transcript from any Shorts ad to break down the hook, the pitch, and the call to action. Pull transcripts in bulk to compare messaging across multiple advertisers and spot the patterns worth applying to your own campaigns.
                </p>
              </div>
              <div className="content">
                <h3>UGC Creator Workflows</h3>
                <p>
                  Stop replaying the same Shorts trying to catch every word. Download the transcript, read through it, and pull the parts that work as a foundation for your next video. See exactly how top creators structure their Shorts: what phrases they lead with, how they build tension, and how they close.
                </p>
              </div>
              <div className="content">
                <h3>AI-Powered Content Production</h3>
                <p>
                  Pull any YouTube Shorts transcript and feed it straight into ChatGPT, Claude, Gemini, or whatever AI tool you use. Generate new video ideas, rewrite scripts for your audience, or analyze patterns across dozens of top-performing Shorts. TokScript&apos;s built-in AI agents also handle hook generation, script rewrites, and virality breakdowns, all from the dashboard.
                </p>
              </div>
              <br />
              <div className="content">
                <p><strong>LEGAL DISCLAIMER:</strong></p>
                <p>
                  Tokscript is not affiliated with, endorsed by, or sponsored by Instagram, Meta, TikTok, TikTok USDS Joint Venture LLC, ByteDance, YouTube, or Google. All trademarks belong to their respective owners.
                </p>
              </div>
            </div>
          </div>
        </div>

        <ShareBar url="https://tokscript.com/youtube-transcript-generator" text="Free YouTube transcript generator. Extract transcripts from any YouTube video or Short in seconds. 41,000+ creators use TokScript." />
        <Footer />
      </div>
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
    </div>
  );
}
