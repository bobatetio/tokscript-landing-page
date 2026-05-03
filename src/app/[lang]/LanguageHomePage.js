"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Header from "../../components/Header";
import magicIcon from "../../assets/images/icons/magicIcon.svg";
import coverImg from "../../assets/images/icons/coverImg.svg";
import downloadIcon from "../../assets/images/icons/download-lg.svg";
import generateIcon from "../../assets/images/icons/generate-viral.svg";
import scriptIcon from "../../assets/images/icons/script.svg";
import analyzeImg from "../../assets/images/icons/analyze.svg";
import { IoLockClosed, FaBolt, FaChevronDown, TbBrandTiktok, TbBrandInstagram, TbBrandYoutube, HiLanguage } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";
import tiktok1Icon from "../../assets/images/icons/tiktok1-icon.svg";
import instagram1Icon from "../../assets/images/icons/insta1-con.svg";
import youtube1Icon from "../../assets/images/icons/youtube1-icon.svg";
import dynamic from "next/dynamic";
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
import extensionImg from "../../assets/images/extension-panel.webp";
import workspceImg from "../../assets/images/ai-dashboard.webp";
import collectImg from "../../assets/images/collection-import.webp";
import teamworkImg from "../../assets/images/team-workspace.webp";
const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const LoadingScreenComponent = dynamic(() => import("@/components/LoadingScreenComponent"));
import axios from "axios";
import unlockImg from "../../assets/images/UnLock-agent.webp";
import { useRouter } from "next/navigation";
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });
import { toast } from "react-toastify";
const EnhenceExperience = dynamic(() => import("@/components/EnhenceExperience"));
const CounterComponent = dynamic(() => import("@/components/CounterComponent"));
import LegalDisclaimer from "@/components/LegalDisclaimer";
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
const CheckoutOverlay = dynamic(() => import("@/components/modals/CheckoutOverlay"), { ssr: false });
const DemoPage = dynamic(() => import("@/components/modals/DemoPage"), { ssr: false });

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

export default function LanguageHomePage({ lang, t, langConfig }) {

  useEffect(() => {
    if (langConfig) {
      document.documentElement.lang = langConfig.code;
    }
    return () => { document.documentElement.lang = "en"; };
  }, [lang, langConfig]);

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
        setDontMissOutModalShow(true);
        return;
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}`;
      }
    } else {
      // Single link - proceed with normal fetchTikTokData
      if (!user || user == null) {
        if (
          videoLink?.includes("youtube.com") ||
          videoLink?.includes("youtu.be") ||
          videoLink?.includes("instagram.com")
        ) {
          setDontMissOutModalShow(true);
          return;
        }
        fetchTikTokData();
      } else {
        const linksParam = encodeURIComponent(links.join(","));
        window.location.href =
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/?links=${linksParam}` +
          (selectedLanguage !== "none" ? `&translate=${selectedLanguage}` : "");
      }
    }
  };

  const fetchTikTokData = async () => {
    if (!videoLink.trim()) {
      setError(t.hero.error.emptyLink);
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
        },
      );

      // Proper error handling
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
      setError(error.message || t.toast.failedToFetch);
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
          ? t.checkout.saveBadge
          : null,
        features: [
          t.checkout.features.hookGenerator,
          t.checkout.features.scriptGenerator,
          t.checkout.features.unlimitedTranscripts,
          t.checkout.features.unlimitedTranslations,
          t.checkout.features.bulkImport,
          t.checkout.features.hdDownloads,
          t.checkout.features.chromeExtensionPro,
          t.checkout.features.allExportFormats,
          t.checkout.features.prioritySupport,
          t.checkout.features.commercialUse,
        ],
        buttonText: t.checkout.continueToCheckout,
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
      toast.error(t.toast.checkoutError);
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
          toast.success(t.toast.subscriptionUpdated);
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
          toast.error(t.toast.subscriptionError);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error(
          error.response?.data?.message || t.toast.subscriptionError,
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
      <Header t={t} />
      <div className="inner-page">
        <div className="banner-section">
          <div className="container">
            <div className="inner-section">
              <div className="banner-content-wrapper">
                <button className="ai-btn">
                  <Image src={magicIcon} alt="" width={20} height={20} priority />
                  {t.hero.aiBadge}
                </button>
                <h1 className="cyan-pink-gradient w-600 large">
                  {t.hero.headingLine1 ? (
                    <>{t.hero.headingLine1}<br />{t.hero.headingLine2}</>
                  ) : t.hero.heading}
                </h1>
                <p>
                  {t.hero.subheading}
                </p>
              </div>
              <div
                className={`chat-input-container${error ? " has-error" : ""}`}
              >
                <textarea
                  placeholder={
                    error ||
                    t.hero.input.placeholder
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
                            ? t.hero.input.translateLabel
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
                      disabled={isLoading}
                    >
                      <FaBolt />
                      {isLoading
                        ? t.hero.input.loadingButton
                        : videoLink.trim()
                          ? t.hero.input.downloadButton
                          : t.hero.input.scanButton}
                    </button>
                  </div>
                </div>
              </div>
              <p className="helper-text">
                {t.hero.helperText}
              </p>
              <div className="social-platform-buttons">
                <span className="platform-label">{t.hero.platforms.label}</span>
                <span className="platform-btn">
                  <TbBrandTiktok />
                  {t.hero.platforms.tiktok}
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandInstagram />
                  {t.hero.platforms.reels}
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandYoutube />
                  {t.hero.platforms.shorts}
                </span>
              </div>
              {error && (
                <div className="error-message" style={{ marginTop: "10px" }}>
                  {error}
                </div>
              )}
              <Image
                src={tiktok1Icon}
                alt="TikTok"
                className="tiktok-icon"
                width={80}
                height={80}
                priority
              />
              <Image
                src={youtube1Icon}
                alt="YouTube"
                className="youtube-icon"
                width={80}
                height={80}
                priority
              />
              <Image
                src={instagram1Icon}
                alt="Instagram"
                className="instagram-icon"
                width={80}
                height={80}
                priority
              />
            </div>
            <div className="about-toktools-section">
              <div className="inner-section-wrapper">
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
                  {t.aiFeatures.title}
                </strong>
              </div>
              <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 justify-content-center">
                <div className="col mb-5">
                  <div className="feature-card">
                    <Image
                      src={coverImg}
                      alt={t.aiFeatures.cards.coverImage.title}
                      className="blue"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="content-div">
                      <strong className="ex-small white w-700">
                        {t.aiFeatures.cards.coverImage.title}
                      </strong>
                      <p className="ex-small w-500">{t.aiFeatures.cards.coverImage.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col mb-5">
                  <div className="feature-card">
                    <Image
                      src={downloadIcon}
                      alt={t.aiFeatures.cards.downloadVideo.title}
                      className="purple"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="content-div">
                      <strong className="ex-small white w-700">
                        {t.aiFeatures.cards.downloadVideo.title}
                      </strong>
                      <p className="ex-small w-500">{t.aiFeatures.cards.downloadVideo.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col mb-5">
                  <div className="feature-card">
                    <Image
                      src={generateIcon}
                      alt={t.aiFeatures.cards.viralHooks.title}
                      className="green"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="content-div">
                      <strong className="ex-small white w-700">
                        {t.aiFeatures.cards.viralHooks.title}
                      </strong>
                      <p className="ex-small w-500">{t.aiFeatures.cards.viralHooks.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col mb-5">
                  <div className="feature-card">
                    <Image
                      src={scriptIcon}
                      alt={t.aiFeatures.cards.rewriteScripts.title}
                      className="yellow"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="content-div">
                      <strong className="ex-small white w-700">
                        {t.aiFeatures.cards.rewriteScripts.title}
                      </strong>
                      <p className="ex-small w-500">{t.aiFeatures.cards.rewriteScripts.description}</p>
                    </div>
                  </div>
                </div>
                <div className="col mb-5">
                  <div className="feature-card">
                    <Image
                      src={analyzeImg}
                      alt={t.aiFeatures.cards.analyzeVirality.title}
                      className="orange"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 20vw"
                    />
                    <div className="content-div">
                      <strong className="ex-small white w-700">
                        {t.aiFeatures.cards.analyzeVirality.title}
                      </strong>
                      <p className="ex-small w-500">{t.aiFeatures.cards.analyzeVirality.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="preview-section">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <h3>
                  {t.preview.title} <br /> {t.preview.titleLine2}
                </h3>
                <p className="fw-medium w-500">
                  {t.preview.description}
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
                        {t.preview.ctaLoggedIn}
                      </Link>
                    ) : (
                      <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/sign-up`}
                        className="btn-style"
                      >
                        <IoLockClosed />
                        {t.preview.ctaLoggedOut}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="about-platform-section" id="how-it-works">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <h3>
                  {t.platform.title} <br /> {t.platform.titleLine2}
                </h3>
                <p className="">
                  {t.platform.subtitle}
                </p>
              </div>
              <div className="bulk-import-section light">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.bulkImport.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.bulkImport.description}
                      </p>
                      <ul>
                        <li>{t.platform.bulkImport.feature1}</li>
                        <li>{t.platform.bulkImport.feature2}</li>
                        <li>{t.platform.bulkImport.feature3}</li>
                        <li>{t.platform.bulkImport.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.bulkImport.cta}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-4">
                      <Image src={bulkProcess} alt={t.platform.bulkImport.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={collectImg} alt={t.platform.collection.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.collection.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.collection.description}
                      </p>
                      <ul>
                        <li>{t.platform.collection.feature1}</li>
                        <li>{t.platform.collection.feature2}</li>
                        <li>{t.platform.collection.feature3}</li>
                        <li>{t.platform.collection.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.collection.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.cloudStorage.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.cloudStorage.description}
                      </p>
                      <ul>
                        <li>{t.platform.cloudStorage.feature1}</li>
                        <li>{t.platform.cloudStorage.feature2}</li>
                        <li>{t.platform.cloudStorage.feature3}</li>
                        <li>{t.platform.cloudStorage.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.cloudStorage.cta}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-3">
                      <Image src={cloudSync} alt={t.platform.cloudStorage.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={historyImg} alt={t.platform.history.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.history.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.history.description}
                      </p>
                      <ul>
                        <li>{t.platform.history.feature1}</li>
                        <li>{t.platform.history.feature2}</li>
                        <li>{t.platform.history.feature3}</li>
                        <li>{t.platform.history.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.history.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.mediaDownload.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.mediaDownload.description}
                      </p>
                      <ul>
                        <li>{t.platform.mediaDownload.feature1}</li>
                        <li>{t.platform.mediaDownload.feature2}</li>
                        <li>{t.platform.mediaDownload.feature3}</li>
                        <li>{t.platform.mediaDownload.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.mediaDownload.cta}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={mediaImg} alt={t.platform.mediaDownload.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={excessImg} alt={t.platform.quickUrl.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.quickUrl.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.quickUrl.description}
                      </p>
                      <ul>
                        <li>{t.platform.quickUrl.feature1}</li>
                        <li>{t.platform.quickUrl.feature2}</li>
                        <li>{t.platform.quickUrl.feature3}</li>
                        <li>{t.platform.quickUrl.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.quickUrl.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.chromeExtension.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.chromeExtension.description}
                      </p>
                      <ul>
                        <li>{t.platform.chromeExtension.feature1}</li>
                        <li>{t.platform.chromeExtension.feature2}</li>
                        <li>{t.platform.chromeExtension.feature3}</li>
                        <li>{t.platform.chromeExtension.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.chromeExtension.cta}
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={extensionImg} alt={t.platform.chromeExtension.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={teamworkImg} alt={t.platform.teamCollab.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.teamCollab.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.teamCollab.description}
                      </p>
                      <ul>
                        <li>{t.platform.teamCollab.feature1}</li>
                        <li>{t.platform.teamCollab.feature2}</li>
                        <li>{t.platform.teamCollab.feature3}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.teamCollab.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h4>{t.platform.aiAgents.title}</h4>
                      <p className="bulk-text-div">
                        {t.platform.aiAgents.description}
                      </p>
                      <div className="ai-listing">
                        <ul>
                          <li>
                            {t.platform.aiAgents.hookGenerator.title}
                            <p>
                              {t.platform.aiAgents.hookGenerator.description}
                            </p>
                          </li>
                          <li>
                            {t.platform.aiAgents.scriptWriter.title}
                            <p>
                              {t.platform.aiAgents.scriptWriter.description}
                            </p>
                          </li>
                          <li>
                            {t.platform.aiAgents.viralityExplainer.title}
                            <p>
                              {t.platform.aiAgents.viralityExplainer.description}
                            </p>
                          </li>
                        </ul>
                      </div>
                      <ul>
                        <li>{t.platform.aiAgents.feature1}</li>
                        <li>{t.platform.aiAgents.feature2}</li>
                        <li>{t.platform.aiAgents.feature3}</li>
                        <li>{t.platform.aiAgents.feature4}</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        {t.platform.aiAgents.cta}
                      </Link>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={workspceImg} alt={t.platform.aiAgents.imageAlt} loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
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
              <h3>{t.pricing.title}</h3>
              <p>{t.pricing.subtitle}</p>
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
                    {t.pricing.tabs.free}
                  </button>
                  <button
                    className={`tab-btn featured ${
                      activeTab === "annual" ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab("annual")}
                  >
                    {t.pricing.tabs.annual}
                  </button>
                  <button
                    className={`tab-btn ${
                      activeTab === "monthly" ? "active" : "inactive"
                    }`}
                    onClick={() => setActiveTab("monthly")}
                  >
                    {t.pricing.tabs.monthly}
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
                              {t.pricing.free.title}
                            </h3>
                            <p className="card-desc">{t.pricing.free.description}</p>
                          </div>
                          <div className="price-row">
                            <span
                              className="price-val"
                              style={{ color: "#e6e6e6" }}
                            >
                              {t.pricing.free.price}
                            </span>
                            <span className="price-period">{t.pricing.free.period}</span>
                          </div>
                          <div className="feature-group">
                            <Feature text={t.pricing.free.feature1} />
                            <Feature text={t.pricing.free.feature2} />
                            <Feature text={t.pricing.free.feature3} />
                            <Feature text={t.pricing.free.feature4} />
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
                              {t.pricing.free.notIncludedLabel}
                            </div>
                            <Feature text={t.pricing.free.excluded1} excluded />
                            <Feature text={t.pricing.free.excluded2} excluded />
                          </div>
                          <div
                            style={{ marginTop: "auto", paddingTop: "1.5rem" }}
                          >
                            {user && user?.plan == "free" ? (
                              <button
                                disabled={true}
                                className="btn btn-outline"
                              >
                                {t.pricing.free.ctaCurrentPlan}
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
                                        t.pricing.free.feature1,
                                        t.checkoutOverlay.freeCheckout.tiktokOnly,
                                        t.checkoutOverlay.freeCheckout.chromeExtensionFree,
                                      ],
                                      buttonText: t.checkout.createFreeAccount,
                                    });
                                    setCheckoutOverlayShow(true);
                                  }}
                                  className="btn btn-outline d-none d-md-flex justify-content-center"
                                >
                                  {t.pricing.free.ctaGetStarted}
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin`}
                                  className="btn btn-outline d-flex d-md-none justify-content-center"
                                >
                                  {t.pricing.free.ctaGetStarted}
                                </a>
                              </>
                            ) : (
                              <button
                                onClick={() => setDontMissOutModalShow(true)}
                                className="btn btn-outline"
                              >
                                {t.pricing.free.ctaGetStarted}
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
                          <Crown size={12} fill="currentColor" /> {t.pricing.annual.recommended}
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
                            <h3 className="card-title">{t.pricing.annual.title}</h3>
                            <p className="card-desc">
                              {t.pricing.annual.description}
                            </p>
                          </div>
                          <div className="price-row">
                            <span className="price-val">{t.pricing.annual.price}</span>
                            <span className="price-period">{t.pricing.annual.period}</span>
                          </div>

                          <div className="calc-box">
                            <div className="calc-box-highlight"></div>
                            <div
                              style={{
                                color: "#00B8B2",
                                fontWeight: 700,
                                fontSize: "12px",
                                lineHeight: "17px",
                                position: "relative",
                              }}
                            >
                              {t.pricing.annual.monthlyBreakdown}
                            </div>
                            <div
                              style={{
                                color: "#7a7a7a",
                                fontSize: "10px",
                                lineHeight: "16px",
                                position: "relative",
                              }}
                            >
                              {t.pricing.annual.monthlyComparison}
                            </div>
                          </div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Sparkles
                                size={12}
                                className="text-yellow-400"
                                style={{ color: "#facc15" }}
                              />{" "}
                              {t.pricing.annual.aiAgentsLabel}
                            </div>
                            <Feature
                              text={t.pricing.annual.hookGenerator.title}
                              sub={t.pricing.annual.hookGenerator.sub}
                              bold
                            />
                            <Feature
                              text={t.pricing.annual.scriptWriter.title}
                              sub={t.pricing.annual.scriptWriter.sub}
                              bold
                            />
                            <Feature
                              text={t.pricing.annual.viralityExplainer.title}
                              sub={t.pricing.annual.viralityExplainer.sub}
                            />
                          </div>

                          <div className="divider"></div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-emerald-400"
                                style={{ color: "#00B8B2" }}
                              />{" "}
                              {t.pricing.annual.bulkLabel}
                            </div>
                            <Feature text={t.pricing.annual.feature1} />
                            <Feature text={t.pricing.annual.feature2} />
                            <Feature text={t.pricing.annual.feature3} />
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
                                {t.pricing.annual.allPlatforms}
                              </span>
                            </div>
                            <Feature text={t.pricing.annual.feature4} />
                          </div>

                          <div style={{ marginTop: "2rem" }}>
                            {loading ? (
                              <button disabled className="btn btn-primary">
                                {t.pricing.annual.ctaLoading}
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
                                  {t.pricing.annual.ctaCurrentPlan}
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
                                    ? t.pricing.annual.ctaProcessing
                                    : t.pricing.annual.ctaUpgrade}
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
                                    {t.pricing.annual.ctaGetAnnual}
                                    <ArrowRight size={20} strokeWidth={3} />
                                  </button>
                                  {/* Mobile: Anchor redirects to signin */}
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                                    className="btn btn-primary d-flex d-md-none"
                                  >
                                    {t.pricing.annual.ctaGetAnnual}
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
                                  {t.pricing.annual.ctaGetAnnual}
                                  <ArrowRight size={20} strokeWidth={3} />
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl}`}
                                  className="btn btn-primary d-flex d-md-none"
                                >
                                  {t.pricing.annual.ctaGetAnnual}
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
                              {t.pricing.monthly.title}
                            </h3>
                            <p className="card-desc">
                              {t.pricing.monthly.description}
                            </p>
                          </div>
                          <div className="price-row">
                            <span
                              className="price-val"
                              style={{ color: "#e6e6e6" }}
                            >
                              {t.pricing.monthly.price}
                            </span>
                            <span className="price-period">{t.pricing.monthly.period}</span>
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
                              {t.pricing.monthly.yearlyEquivalent}
                            </div>
                            <div
                              style={{ color: "#7a7a7a", fontSize: "0.625rem" }}
                            >
                              {t.pricing.monthly.annualSaves}
                            </div>
                          </div>

                          <div className="feature-group">
                            <p
                              className="stat-lbl"
                              style={{ marginBottom: "0.5rem" }}
                            >
                              {t.pricing.monthly.everythingInAnnual}
                            </p>
                            <Feature text={t.pricing.monthly.feature1} />
                            <Feature text={t.pricing.monthly.feature2} />
                            <Feature text={t.pricing.monthly.feature3} />
                            <Feature text={t.pricing.monthly.feature4} />
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
                              {t.pricing.monthly.costsMore}
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
                                {t.pricing.annual.ctaLoading}
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
                                  {t.pricing.monthly.ctaCurrentPlan}
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
                                    ? t.pricing.monthly.ctaProcessing
                                    : t.pricing.monthly.ctaUpgrade}
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
                                    {t.pricing.monthly.ctaGetMonthly}
                                  </button>
                                  {/* Mobile: Anchor redirects to signin */}
                                  <a
                                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                                    className="btn btn-outline d-flex d-md-none"
                                    style={{
                                      background: "rgba(13, 13, 13, 0.5)",
                                      border: "1px solid #2a2a2a",
                                    }}
                                  >
                                    {t.pricing.monthly.ctaGetMonthly}
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
                                  {t.pricing.monthly.ctaGetMonthly}
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl}`}
                                  className="btn btn-outline d-flex d-md-none"
                                  style={{
                                    background: "rgba(13, 13, 13, 0.5)",
                                    border: "1px solid #2a2a2a",
                                  }}
                                >
                                  {t.pricing.monthly.ctaGetMonthly}
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
                <p>{t.stats.description}</p>
              </div>
              <CounterComponent counterData={[
                { amount: t.stats.counter.videosProcessed.amount, description: t.stats.counter.videosProcessed.label },
                { amount: t.stats.counter.profilesDownloaded.amount, description: t.stats.counter.profilesDownloaded.label },
                { amount: t.stats.counter.hoursSaved.amount, description: t.stats.counter.hoursSaved.label },
                { amount: t.stats.counter.minutesTotal.amount, description: t.stats.counter.minutesTotal.label },
              ]} />
            </div>
          </div>
        </section>
        <EnhenceExperience
          title={t.chromeExtensionBanner.title}
          cta={t.chromeExtensionBanner.cta}
          imageAlt={t.chromeExtensionBanner.imageAlt}
        />
        <FaqSection
          faqData={Object.keys(t.faq)
            .filter(k => k.startsWith('q'))
            .sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)))
            .map(k => ({ title: t.faq[k].title, content: t.faq[k].answer }))}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
          bottomText={t.faq.bottomText}
        />
        <div className="disclaimer-section">
          <div className="container">
            <div className="inner-section">
              <div className="content">
                <h4>{t.disclaimer.about.title}</h4>
                <p>
                  {t.disclaimer.about.paragraph1}
                  <br />
                  {t.disclaimer.about.paragraph2}
                </p>
                <p>
                  {t.disclaimer.about.paragraph3}
                </p>
              </div>
              <div className="content">
                <h4>{t.disclaimer.tiktokAds.title}</h4>
                <p>
                  {t.disclaimer.tiktokAds.content}
                </p>
              </div>
              <div className="content">
                <h4>{t.disclaimer.ugcCreators.title}</h4>
                <p>
                  {t.disclaimer.ugcCreators.content}
                </p>
              </div>
              <div className="content">
                <h4>{t.disclaimer.ai.title}</h4>
                <p>
                  {t.disclaimer.ai.content}
                </p>
              </div>
              <br />
              <br />
              <div className="content">
                <h4>{t.disclaimer.legal.title}</h4>
                <p>
                  {t.disclaimer.legal.content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <LegalDisclaimer /> */}
        <Footer t={t} />
      </div>
      {isClient && (
        <DontMissOutModal
          show={dontMissOutModalShow}
          onHide={handleDontMissOutModalClose}
          t={t}
        />
      )}
      {showConfirmation && (
        <ConfirmationModal
          setShowConfirmation={setShowConfirmation}
          handleConfirmation={handleConfirmation}
          showConfirmation={showConfirmation}
          t={t}
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
        t={t}
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
