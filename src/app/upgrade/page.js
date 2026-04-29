"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  animate,
  AnimatePresence,
} from "framer-motion";
import {
  Check,
  X,
  Zap,
  Crown,
  Sparkles,
  ChevronDown,
  ArrowRight,
  TrendingUp,
  Video,
  Layers,
  Lock,
  ShieldCheck,
  Globe,
  Star,
} from "lucide-react";
import Background from "@/components/Background";
import Header from "@/components/Header";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/Footer"));
import { LemonProducts } from "@/components/LemonProducts";
import { LemonProductsStaging } from "@/components/LemonProductsStaging";

const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });
const CheckoutOverlay = dynamic(() => import("@/components/modals/CheckoutOverlay"), { ssr: false });
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

// import "@/assets/scss/pricing.scss";

// --- Subcomponents ---

const Counter = ({ from, to, label, suffix = "" }) => {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    const controls = animate(from, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (node)
          node.textContent = Math.floor(value).toLocaleString() + suffix;
      },
    });
    return () => controls.stop();
  }, [from, to, inView, suffix]);

  return (
    <div className="stat-item">
      <div ref={nodeRef} className="stat-val">
        {from}
      </div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
};

// --- Icons ---
const TikTokIcon = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const InstagramIcon = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={style}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className, style }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={style}
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const Feature = ({ text, excluded, bold, sub }) => (
  <div className="feature-item">
    <div className={`icon-box ${excluded ? "excluded" : ""}`}>
      {excluded ? (
        <X size={10} strokeWidth={3} />
      ) : (
        <Check size={10} strokeWidth={3} />
      )}
    </div>
    <div style={{ lineHeight: 1 }}>
      <div
        className="feat-text"
        style={{
          color: bold ? "white" : "#d4d4d4",
          fontWeight: bold ? 600 : 500,
        }}
      >
        {text}
      </div>
      {sub && <div className="feat-sub">{sub}</div>}
    </div>
  </div>
);

const FAQItem = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item ${isOpen ? "open" : ""}`}>
      <div className="faq-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="faq-q">{q}</span>
        <div
          className="arrow-icon"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s",
            backgroundColor: isOpen ? "#00D9B4" : "#1a1a1a",
            color: isOpen ? "#020617" : "#7a7a7a",
          }}
        >
          <ChevronDown size={16} strokeWidth={2.5} />
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="faq-a"
          >
            {a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ResultWidget = ({ value, label, desc, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className="result-widget"
  >
    <div className="result-icon">{icon}</div>
    <div style={{ marginTop: "2rem" }}>
      <div className="result-val">{value}</div>
      <div className="result-lbl">{label}</div>
      <div className="result-desc">{desc}</div>
    </div>
  </motion.div>
);

// --- Main Component ---

export default function PricingPage() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);
  const [activeTab, setActiveTab] = useState("annual");
  const [dontMissOutModalShow, setDontMissOutModalShow] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  // CheckoutOverlay states
  const [checkoutOverlayShow, setCheckoutOverlayShow] = useState(false);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const router = useRouter();
  const getProduct = async () => {
    // try {
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_API_URL}/subscription/plans`
    //   );
    //   const _product = response.data;
    //   console.log("_product", _product);
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

  const fetchUserData = useCallback(async () => {
    setProfileLoading(true);
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
      setProfileLoading(false);
    } finally {
      setProfileLoading(false);
    }
  }, [token]);

  // Check user authentication on component mount
  useEffect(() => {
    getProduct();
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken"); // Use authToken to match backend
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setProfileLoading(false);
      }
    } else {
      setProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  const handleDontMissOutModalClose = () => {
    setDontMissOutModalShow(false);
  };
  const faqs = [
    {
      q: "What is TokScript?",
      a: "TokScript is a powerful research tool that allows you to download transcripts, videos, and metadata from viral short-form content to reverse-engineer success.",
    },
    {
      q: "Which platforms are supported?",
      a: "We currently support TikTok, Instagram Reels, and YouTube Shorts. You can paste a link from any of these platforms to extract data.",
    },
    {
      q: "Is the transcript download unlimited?",
      a: "On the Free plan, you get 3 transcripts per day. On the Monthly and Annual plans, transcript downloads are completely unlimited.",
    },
    {
      q: "How does the AI Script Writer work?",
      a: "We use OpenAI's GPT-4o and Anthropic's Claude 3.5 Sonnet tailored with our proprietary datasets. The AI analyzes the viral structure of the source video and rewrites it for your specific niche.",
    },
    {
      q: "Does it work for non-English videos?",
      a: "Yes! TokScript supports transcription and translation for over 50 languages. You can analyze a viral video in Spanish and have the AI rewrite the script in English (or vice versa).",
    },
    {
      q: "Can I use TokScript for my agency clients?",
      a: "Absolutely. Many agencies use TokScript to speed up research and scriptwriting for multiple clients. We do not charge extra for commercial use.",
    },
    {
      q: "Is there a Chrome Extension?",
      a: "Yes. The TokScript Chrome Extension allows you to view transcripts and analytics directly on TikTok and Instagram while you scroll. It is included in all Paid plans.",
    },
    {
      q: "What is the refund policy?",
      a: "We offer a 30-day money-back guarantee for Annual plans. For monthly plans, if you are not satisfied, contact us within 48 hours for a full refund.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. You can cancel your subscription instantly from your dashboard. You will retain access to Pro features until the end of your billing cycle.",
    },
    {
      q: "Do I need technical skills?",
      a: "No. TokScript is designed to be as simple as 'Copy Link' -> 'Paste Link'. The AI handles the complex analysis for you.",
    },
  ];

  // Enhanced checkout handler with authentication check
  const handleCheckout = async (product) => {
    console.log("product", product);
    const buyUrl = `https://tokscript.lemonsqueezy.com/checkout/buy/${product?.attributes?.slug}`;
    // Check if user is logged in
    if (!user || !token) {
      // Open CheckoutOverlay modal instead of redirecting
      setPendingCheckoutUrl(buyUrl);
      setPendingPlan({
        name: product?.attributes?.name_simple || "Pro Plan",
        price: product?.attributes?.price
          ? `$${product?.attributes?.price / 100}`
          : "$39",
        period: product?.attributes?.interval?.toLowerCase()?.includes("year")
          ? "/year"
          : "/month",
        badge: product?.attributes?.interval?.toLowerCase()?.includes("year")
          ? "Save $81/year"
          : null,
        features: [
          "Viral Hook Generator",
          "Viral Script Generator",
          "Unlimited transcripts",
          "Unlimited translations",
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

    const productId = product?.id || "monthly";
    setLoadingStates((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    try {
      // Option 2: Direct LemonSqueezy URL (primary method)
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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedVarient, setSelectedVarient] = useState(null);

  // Function to open the confirmation dialog for upgrade
  const openConfirmation = (variantId, plan, variant) => {
    setSelectedProductId(variantId);
    setSelectedPlan(plan);
    setSelectedVarient(variant);
    setShowConfirmation(true);
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
        const selectedPlanDetails = productsData?.data?.[2]?.variants?.find(
          (plan) => plan?.id === selectedProductId,
        );
        const billingCycle =
          selectedVarient.toLowerCase().includes("annual") ||
            selectedVarient.toLowerCase().includes("year")
            ? "yearly"
            : "monthly";

        const requestPayload = {
          plan: selectedPlan.toLowerCase(),
          billingCycle: billingCycle,
          variantId: selectedProductId,
          productId: productsData?.data?.[2]?.id || null, // Include product ID if available
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

  const handleUpgradeClick = (variantId, plan, variant) => {
    openConfirmation(variantId, plan, variant);
  };

  // Show loading screen while profile data is loading
  if (profileLoading) {
    return (
      <div className="pricing-page-new">
        <Background />
        <Header />
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#7a7a7a",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                border: "3px solid #1a1a1a",
                borderTop: "3px solid #00D9B4",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 1rem",
              }}
            />
            <p>Loading...</p>
          </div>
        </div>
        <style jsx>{`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="pricing-page-new">
      <Background />

      {/* Decorative Gradients (Fixed) */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "50%",
          height: "50%",
          background: "rgba(34, 211, 238, 0.05)",
          filter: "blur(120px)",
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div className="page-bottom-gradient" />
      <Header />

      <main className="container hero-wrapper">
        {/* Hero */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="hero-section"
        >
          <div className="badge-pill">
            <Sparkles size={10} /> <span>Used by 41,000+ Creators</span>
          </div>

          <h1 className="hero-headline">
            Pricing that pays for <br className="hidden-mobile" />
            <span className="text-gradient">itself in 24 hours.</span>
          </h1>

          <p className="hero-sub">
            Reverse-engineer viral videos into your own scripts.{" "}
            <span style={{ color: "#d4d4d4" }}>
              Start for free. Upgrade for power.
            </span>
          </p>

          {/* Stats Dashboard */}
          <div className="stats-container">
            <div className="stats-grid">
              <Counter
                from={0}
                to={2.6}
                suffix="M+"
                label="Videos Processed"
              />
              <Counter
                from={0}
                to={190}
                suffix="K+"
                label="Profiles Downloaded"
              />
              <Counter from={0} to={120} suffix="K+" label="Hours Saved" />
            </div>
            <div className="stats-footer">
              <Zap size={14} fill="currentColor" />
              <span>99% accurate transcription across 100+ languages</span>
            </div>
          </div>
        </motion.div>

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
          <div className="row justify-content-center">
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
                      <Feature text="Unlimited translations" />
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
                      {profile?.plan == "pro" &&
                        profile?.subscription?.lemonSqueezyVariantId ==
                        productsData?.data?.[2]?.variants?.[2]?.id &&
                        profile.subscription.status === "active" ? (
                        <button disabled={true} className="btn btn-outline">
                          Current Plan
                        </button>
                      ) : profile?.plan == "pro" &&
                        profile?.plan !== "free" &&
                        profile.subscription.status === "active" ? (
                        <button
                          disabled={
                            loadingStates[
                            productsData?.data?.[2]?.variants?.[2]?.id
                            ]
                          }
                          onClick={() =>
                            handleUpgradeClick(
                              productsData?.data?.[2]?.variants?.[2]?.id,
                              productsData?.data?.[2]?.variants?.[2]?.attributes.name
                                ?.toLowerCase()
                                ?.includes("pro")
                                ? "pro"
                                : productsData?.data?.[2]?.variants?.[2]
                                  ?.attributes.name,
                              productsData?.data?.[2]?.variants?.[2]?.attributes.name
                                ?.toLowerCase()
                                ?.includes("annual") ||
                                productsData?.data?.[2]?.variants?.[2]?.attributes.name
                                  ?.toLowerCase()
                                  ?.includes("year")
                                ? "yearly"
                                : "monthly",
                            )
                          }
                          className="btn btn-outline"
                        >
                          {loadingStates[
                            productsData?.data?.[2]?.variants?.[2]?.id
                          ]
                            ? "Processing..."
                            : "Upgrade"}
                        </button>
                      ) : (
                        <>
                          {/* Desktop: Button opens modal */}
                          <button
                            onClick={() =>
                              handleCheckout(
                                productsData?.data?.[2]?.variants?.[2],
                              )
                            }
                            className="btn btn-primary d-none d-md-flex"
                          >
                            Get Annual - Save $81
                            <ArrowRight size={20} strokeWidth={3} />
                          </button>
                          {/* Mobile: Anchor redirects to signin */}
                          {!user || !token ? (<a
                            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=https://tokscript.lemonsqueezy.com/checkout/buy/${productsData?.data?.[2]?.variants?.[2]?.attributes.slug}`}
                            className="btn btn-primary d-flex d-md-none"
                          >
                            Get Annual - Save $81
                            <ArrowRight size={20} strokeWidth={3} />
                          </a>) : (
                            <button
                              className="btn btn-primary d-flex d-md-none"
                              onClick={() => {
                                const buyUrl = `https://tokscript.lemonsqueezy.com/checkout/buy/${productsData?.data?.[2]?.variants?.[2]?.attributes?.slug}`;
                                const checkoutUrl =
                                  buyUrl +
                                  `?checkout[email]=${encodeURIComponent(
                                    user.email,
                                  )}&checkout[name]=${encodeURIComponent(
                                    user.name || user.email,
                                  )}&checkout[custom][user_id]=${user?.id || user._id}`;
                                window.location.href = checkoutUrl;
                              }}
                            >
                              Get Annual — Save $81
                            </button>
                          )}
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
                      <h3 className="card-title" style={{ color: "#e6e6e6" }}>
                        Monthly
                      </h3>
                      <p className="card-desc">Full power, flexible billing</p>
                    </div>
                    <div className="price-row">
                      <span className="price-val" style={{ color: "#e6e6e6" }}>
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
                      <div style={{ color: "#7a7a7a", fontSize: "0.75rem" }}>
                        = $120/year
                      </div>
                      <div style={{ color: "#7a7a7a", fontSize: "0.625rem" }}>
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
                      <span style={{ color: "#eab308", fontSize: "10px" }}>
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
                      {profile?.plan == "pro" &&
                        profile?.subscription?.lemonSqueezyVariantId ==
                        productsData?.data?.[2]?.variants?.[1]?.id ? (
                        <button disabled={true} className="btn btn-outline">
                          Current Plan
                        </button>
                      ) : profile?.plan == "pro" &&
                        profile?.plan !== "free" &&
                        profile.subscription.status === "active" ? (
                        <button
                          disabled={
                            loadingStates[
                            productsData?.data?.[2]?.variants?.[1]?.id
                            ]
                          }
                          onClick={() =>
                            handleUpgradeClick(
                              productsData?.data?.[2]?.variants?.[1]?.id,
                              productsData?.data?.[2]?.variants?.[1]?.attributes.name
                                ?.toLowerCase()
                                ?.includes("pro")
                                ? "pro"
                                : productsData?.data?.[2]?.variants?.[1]
                                  ?.attributes.name,
                              productsData?.data?.[2]?.variants?.[1]?.attributes.name
                                ?.toLowerCase()
                                ?.includes("annual") ||
                                productsData?.data?.[2]?.variants?.[1]?.attributes.name
                                  ?.toLowerCase()
                                  ?.includes("year")
                                ? "yearly"
                                : "monthly",
                            )
                          }
                          className="btn btn-outline"
                        >
                          {loadingStates[
                            productsData?.data?.[2]?.variants?.[1]?.id
                          ]
                            ? "Processing..."
                            : "Upgrade"}
                        </button>
                      ) : (
                        <>
                          {/* Desktop: Button opens modal */}
                          <button
                            className="btn btn-outline d-none d-md-flex"
                            onClick={() =>
                              handleCheckout(
                                productsData?.data?.[2]?.variants?.[1],
                              )
                            }
                            style={{
                              background: "rgba(13, 13, 13, 0.5)",
                              border: "1px solid #2a2a2a",
                            }}
                          >
                            Get Monthly
                          </button>
                          {/* Mobile: Anchor redirects to signin */}
                          {!user || !token ? (<a
                            href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=https://tokscript.lemonsqueezy.com/checkout/buy/${productsData?.data?.[2]?.variants?.[1]?.attributes.slug}`}
                            className="btn btn-outline d-flex d-md-none"
                            style={{
                              background: "rgba(13, 13, 13, 0.5)",
                              border: "1px solid #2a2a2a",
                            }}
                          >
                            Get Monthly
                          </a>) : (
                            <button
                              className="btn btn-primary d-flex d-md-none"
                              onClick={() => {
                                const buyUrl = `https://tokscript.lemonsqueezy.com/checkout/buy/${productsData?.data?.[2]?.variants?.[1]?.attributes?.slug}`;
                                const checkoutUrl =
                                  buyUrl +
                                  `?checkout[email]=${encodeURIComponent(
                                    user.email,
                                  )}&checkout[name]=${encodeURIComponent(
                                    user.name || user.email,
                                  )}&checkout[custom][user_id]=${user?.id || user._id}`;
                                window.location.href = checkoutUrl;
                              }}
                            >
                              Get Monthly
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Results Section */}
        <div className="results-section">
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "300px",
              height: "300px",
              background: "rgba(57, 72, 75, 0.05)",
              filter: "blur(100px)",
              borderRadius: "9999px",
              pointerEvents: "none",
            }}
          />

          <div
            className="text-center section-title"
            style={{ marginBottom: "3rem", position: "relative", zIndex: 10 }}
          >
            <h2>Real Results from Real Users</h2>
            <p style={{ color: "#7a7a7a", fontSize: "16px" }}>
              We track our users' success. The data doesn't lie.
            </p>
          </div>

          <div className="results-grid">
            <ResultWidget
              value="41K+"
              label="Active Creators"
              desc="2.6M+ videos transcribed"
              icon={
                <Globe
                  className="text-zinc-400"
                  style={{ color: " #60a5fa" }}
                />
              }
              delay={0}
            />
            <ResultWidget
              value="2.6M+"
              label="Videos Processed"
              desc="Using our AI script writer"
              icon={
                <Video
                  className="text-purple-400"
                  style={{ color: " #c084fc" }}
                />
              }
              delay={0.1}
            />
            <ResultWidget
              value="99%"
              label="Accuracy"
              desc="Across 100+ languages"
              icon={
                <Zap className="text-yellow-400" style={{ color: "#facc15" }} />
              }
              delay={0.2}
            />
          </div>

          {/* Testimonial Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="testimonial"
          >
            <div className="testimonial-bar"></div>
            <div className="testimonial-text">
              "TokScript paid for itself in the first hour. I generated 50 hooks
              from my competitor's top videos and posted content for the next
              month."
            </div>
            <div
              className="d-flex justify-content-center"
              style={{ gap: "0.75rem" }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#1a1a1a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#7a7a7a",
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <div style={{ textAlign: "left" }}>
                <div
                  style={{
                    fontSize: "13px",
                    lineHeight: "18px",
                    fontWeight: 700,
                    color: "white",
                  }}
                  className="mb-1"
                >
                  Verified TokScript Pro User
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    lineHeight: "14px",
                    color: "#00D9B4",
                    fontWeight: 700,
                    textTransform: "uppercase",
                  }}
                >
                  TikTok Shop Seller
                </div>
              </div>
            </div>
          </motion.div>

          <div className="text-center" style={{ marginTop: "3rem" }}>
            {profile?.plan == "free" && (
              <button
                onClick={() =>
                  handleCheckout(productsData?.data?.[2]?.variants?.[2])
                }
                className="btn-style btn-blue"
              >
                Get Started - $25/year
              </button>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div
          style={{ maxWidth: "48rem", margin: "0 auto 5rem auto" }}
          className="faq-section"
          id="faq"
        >
          <div className="section-title">
            <h2
              className="text-center "
              style={{
                fontSize: "31px",
                fontWeight: 700,
                marginBottom: "1rem",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p>Everything you need to know about the product and billing.</p>
          </div>
          <div style={{ marginTop: "2rem" }}>
            {faqs.map((item, index) => (
              <FAQItem key={index} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="bottom-text-center">
            <p>
              Have more questions?{" "}
              <a href="/contact">Visit our support docs. </a>
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <div className="cta-bg-gradient" />

          <h2 className="cta-title">
            Ready to turn viral videos into <br />
            <span className="">YOUR viral videos?</span>
          </h2>
          <button
            onClick={() => router.push("/app/sign-up")}
            className="btn-white"
          >
            Get Started Now
          </button>
          <p
            style={{
              marginTop: "1.5rem",
              color: "#7a7a7a",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            Secure payment via Stripe. Cancel anytime.
          </p>
        </div>
      </main>
      <Footer />

      <DontMissOutModal
        show={dontMissOutModalShow}
        onHide={handleDontMissOutModalClose}
      />

      {/* Upgrade Confirmation Modal */}
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
    </div>
  );
}
