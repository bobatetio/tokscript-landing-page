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
import Header from "@/components/Header";
import ShareBar from "@/components/ShareBar";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/components/Footer"));
const ViralMomentsCarousel = dynamic(() => import("@/components/ViralMomentsCarousel"), { ssr: false });
const HomeSocialProof = dynamic(() => import("@/components/HomeSocialProof"), { ssr: false });
const FaqSection = dynamic(() => import("@/components/FaqSection"));

import ClaudeIcon from "../../assets/images/icons/ai/ClaudeIcon";
import ChatGPTIcon from "../../assets/images/icons/ai/ChatGPTIcon";
import { getPlatformCopy } from "../platformContent";

const copy = getPlatformCopy("tiktok");

const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const CheckoutOverlay = dynamic(() => import("@/components/modals/CheckoutOverlay"), { ssr: false });
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

import "@/assets/scss/pricing.scss";
import "@/app/mcp/mcp.scss";
import "@/app/chrome-extension/cta-button.css";

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
            backgroundColor: isOpen ? "#00B8B2" : "#1a1a1a",
            color: isOpen ? "#0a0a0a" : "#7a7a7a",
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
            <span dangerouslySetInnerHTML={{ __html: a }} />
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

export default function PricingPage({ initialProductsData }) {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);
  const [activeTab, setActiveTab] = useState("annual");
  const [openFaq, setOpenFaq] = useState(null);
  const [dontMissOutModalShow, setDontMissOutModalShow] = useState(false);
  const [productsData, setProductsData] = useState(initialProductsData);
  const [loadingStates, setLoadingStates] = useState({});

  // Auth modal state
  const [checkoutOverlayShow, setCheckoutOverlayShow] = useState(false);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const router = useRouter();

  const aff = useSearchParams().get("aff");

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
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("authToken"); // Use authToken to match backend
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
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
      q: "Is there really a free plan?",
      a: "Yes. The free plan is free forever — no trial, no credit card required. You get 5 transcripts per day, 5 translations per day, and access to the basic Chrome extension. Upgrade only if you need more.",
    },
    {
      q: "What's the difference between Annual and Monthly?",
      a: "Same product, same features — just billing cadence. Annual is $39/year ($3.25/month). Monthly is $10/month ($120/year). Annual saves you $81 a year.",
    },
    {
      q: "Can I switch between plans?",
      a: "Yes, anytime. Upgrade from Free to paid in one click. Switch between Monthly and Annual whenever you want — billing prorates automatically.",
    },
    {
      q: "Is there a refund policy?",
      a: "Yes. Refunds are available within 7 days of purchase, no questions asked. After 7 days, cancel anytime and you'll keep access through the end of your billing period.",
    },
    {
      q: "What happens if I cancel?",
      a: "You keep full access until the end of your current billing period. After that, your account drops back to the free plan. Your saved transcripts and library stay intact.",
    },
    {
      q: "Do you offer team or agency plans?",
      a: 'Yes. TokScript supports team workspaces with shared transcripts, real-time collaboration, and permission controls. For team pricing and enterprise plans, <a href="/contact" style="color:#00B8B2;text-decoration:underline">contact us directly</a>.',
    },
    {
      q: "Are there discounts for students or creators?",
      a: "The annual plan ($3.25/month effective) is already heavily discounted compared to monthly. For verified educators or large creator partnerships, reach out — we work with serious users.",
    },
    {
      q: "What payment methods do you accept?",
      a: "All major credit and debit cards, plus standard digital wallets (Apple Pay, Google Pay). Billing runs through Stripe — secure, encrypted, PCI-compliant.",
    },
    {
      q: "Will my price ever go up?",
      a: "Existing subscribers keep their current rate as long as their subscription stays active. We grandfather pricing on annual plans through every renewal cycle.",
    },
    {
      q: "What happens to my data if I cancel?",
      a: 'Your transcripts, folders, and saved videos stay in your account. You can re-subscribe anytime and pick up where you left off. If you want a full data export or deletion, <a href="/contact" style="color:#00B8B2;text-decoration:underline">contact support</a>.',
    },
  ];

  // Enhanced checkout handler with authentication check
  const handleCheckout = async (product) => {
    const buyUrl = `https://tokscript.lemonsqueezy.com/checkout/buy/${product?.attributes?.slug}`;
    // Check if user is logged in
    if (!user || !token) {
      // Open checkout overlay instead of redirecting
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
        )}&checkout[custom][user_id]=${user?.id || user._id}` +
        (aff ? `&aff=${aff}` : "");

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

  // Build the same `allPlans` shape the homepage cards expect.
  const loading = false;
  const freePlan = {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
  };
  const transformPlansData = () => {
    const variants = productsData?.data?.[2]?.variants;
    const productId = productsData?.data?.[2]?.id;
    if (!variants) return [];
    const plans = [];
    const monthlyVariant = variants.find(
      (v) => v.attributes.interval === "month" && v.attributes.status === "published"
    );
    const annualVariant = variants.find(
      (v) => v.attributes.interval === "year" && v.attributes.status === "published"
    );
    if (monthlyVariant) {
      plans.push({
        title: "Pro Monthly",
        variantId: monthlyVariant.id,
        productId,
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${monthlyVariant.attributes.slug}`,
      });
    }
    if (annualVariant) {
      plans.push({
        title: "Pro Annual",
        variantId: annualVariant.id,
        productId,
        buyUrl: `https://tokscript.lemonsqueezy.com/checkout/buy/${annualVariant.attributes.slug}`,
      });
    }
    return plans;
  };
  const allPlans = [freePlan, ...transformPlansData()];

  return (
    <div className="pricing-page-new">
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
          className="hero-section pricing-hero"
        >
          <div className="pricing-hero-eyebrow">Pricing</div>

          <h1 className="pricing-hero-headline">
            Pick A Plan. Get To Work.
          </h1>

          <p className="pricing-hero-sub">
            Free forever for the basics. $39/year for the full toolkit. Built to pay for itself the first week you use it.
          </p>

        </motion.div>

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
      </main>

      {/* Compare Plans */}
      <section className="pricing-compare" aria-labelledby="pricing-compare-heading">
        <div className="pricing-compare-inner">
          <div className="pricing-compare-header">
            <span className="pricing-compare-eyebrow">Compare Plans</span>
            <h2 id="pricing-compare-heading" className="pricing-compare-headline">
              Every Feature, Side By Side.
            </h2>
            <p className="pricing-compare-sub">
              The full breakdown — so you know exactly what you&apos;re getting before you commit.
            </p>
          </div>

          <div className="pricing-compare-table-wrap">
            <table className="pricing-compare-table">
              <thead>
                <tr>
                  <th scope="col" className="pc-feat-col">Feature</th>
                  <th scope="col">Free</th>
                  <th scope="col" className="pc-col-featured">
                    <span className="pc-col-featured-label">
                      <Crown size={14} strokeWidth={2.5} /> Annual
                    </span>
                  </th>
                  <th scope="col">Monthly</th>
                </tr>
              </thead>
              <tbody>
                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">Transcripts</th></tr>
                <tr><th scope="row">Daily transcripts</th><td>5 / day</td><td className="pc-col-featured">Unlimited</td><td>Unlimited</td></tr>
                <tr><th scope="row">Daily translations</th><td>5 / day</td><td className="pc-col-featured">Unlimited</td><td>Unlimited</td></tr>
                <tr><th scope="row">TikTok, Reels, Shorts support</th><td><Check size={16} strokeWidth={3} /></td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Export formats (TXT, PDF, XML)</th><td><Check size={16} strokeWidth={3} /></td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>

                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">Bulk Processing</th></tr>
                <tr><th scope="row">Bulk import up to 50 videos</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">TikTok Collection imports</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Bulk export all transcripts</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">HD video downloads (no watermark)</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Cover image downloads</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>

                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">AI Agents</th></tr>
                <tr><th scope="row">Viral Hook Generator</th><td className="pc-na">—</td><td className="pc-col-featured">Unlimited</td><td>Unlimited</td></tr>
                <tr><th scope="row">Viral Script Writer</th><td className="pc-na">—</td><td className="pc-col-featured">Unlimited</td><td>Unlimited</td></tr>
                <tr><th scope="row">Virality Explainer</th><td className="pc-na">—</td><td className="pc-col-featured">Unlimited</td><td>Unlimited</td></tr>

                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">Integrations</th></tr>
                <tr><th scope="row">Claude integration</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">ChatGPT integration</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Chrome Extension</th><td>Basic</td><td className="pc-col-featured">Full</td><td>Full</td></tr>
                <tr><th scope="row">Mobile + Desktop apps</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Cloud-synced dashboard</th><td><Check size={16} strokeWidth={3} /></td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>

                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">Teams &amp; Sharing</th></tr>
                <tr><th scope="row">Team workspaces</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Real-time collaboration</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">Permission controls</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>

                <tr className="pc-section-row"><th colSpan={4} scope="rowgroup">Billing</th></tr>
                <tr><th scope="row">Price</th><td>$0 forever</td><td className="pc-col-featured">$39 / year</td><td>$10 / month</td></tr>
                <tr><th scope="row">Effective monthly rate</th><td>Free</td><td className="pc-col-featured">$3.25 / month</td><td>$10 / month</td></tr>
                <tr><th scope="row">Annual savings</th><td className="pc-na">—</td><td className="pc-col-featured">Save $81</td><td className="pc-na">—</td></tr>
                <tr><th scope="row">Cancel anytime</th><td><Check size={16} strokeWidth={3} /></td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
                <tr><th scope="row">7-day refund</th><td className="pc-na">—</td><td className="pc-col-featured"><Check size={16} strokeWidth={3} /></td><td><Check size={16} strokeWidth={3} /></td></tr>
              </tbody>
            </table>
          </div>

          <div className="pricing-compare-cta">
            <button
              type="button"
              className="pricing-compare-cta-primary"
              onClick={() => {
                const annualPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"));
                if (annualPlan) handleCheckout(annualPlan);
              }}
            >
              Get Annual — Save $81 <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            <a
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`}
              className="pricing-compare-cta-secondary"
            >
              Start Free
            </a>
          </div>
        </div>
      </section>

      {/* Creators Talking About TokScript Carousel */}
      <ViralMomentsCarousel variant="pricing" />

      <HomeSocialProof />

      {/* FAQ + Final CTA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: typeof item.a === "string" ? item.a.replace(/<[^>]+>/g, "") : "",
              },
            })),
          }),
        }}
      />
      <div style={{ position: "relative", zIndex: 50, background: "#0d0d0d" }}>
        <FaqSection
          faqData={faqs.map((f) => ({ title: f.q, content: f.a }))}
          title="Pricing, Plans, And Everything In Between."
          subtitle="Everything you need to know about pricing, plans, billing, and refunds — answered."
        />
      </div>

      <div className="mcp-page">

      {/* Final CTA Banner — chrome-extension style */}
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
                  4.2&#9733; Trusted By Creators{" "}
                  <span className="cx-footer-cta-dot">·</span>{" "}
                  <span className="cx-eyebrow-creators">41K+ Creators</span>
                </p>

                <h2 className="mcp-cta-title">
                  Stop Stalling. Start Researching.
                </h2>
                <p className="mcp-cta-subtitle">
                  Free forever for the basics. $39/year for the full toolkit. The decision takes 30 seconds. The payoff lasts all year.
                </p>

                <div className="cx-footer-cta-actions">
                  <button
                    type="button"
                    onClick={() => {
                      const annualPlan = allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"));
                      if (annualPlan) {
                        handleCheckout(annualPlan);
                      } else if (!user || !token) {
                        setPendingCheckoutUrl(null);
                        setPendingPlan({
                          name: "TokScript Annual",
                          features: [
                            "Unlimited transcripts & translations",
                            "Bulk import 50 videos",
                            "All 3 AI Agents",
                            "Claude & ChatGPT integration",
                          ],
                          buttonText: "Get Annual",
                        });
                        setCheckoutOverlayShow(true);
                      }
                    }}
                    className="cx-signup-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      height: "44px",
                      padding: "0 22px",
                      background: "#ffffff",
                      color: "#06091A",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: "14.5px",
                      fontWeight: 500,
                      lineHeight: "23.4px",
                      borderRadius: "16.4px",
                      border: "none",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      cursor: "pointer",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                    }}
                  >
                    Get Annual — Save $81
                  </button>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`}
                    className="cx-footer-cta-secondary"
                  >
                    Start Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
      </section>

      </div>
      <Footer />

      <DontMissOutModal
        show={dontMissOutModalShow}
        onHide={handleDontMissOutModalClose}
      />

      {/* Checkout Overlay for auth */}
      <CheckoutOverlay
        isOpen={checkoutOverlayShow}
        onClose={() => {
          setCheckoutOverlayShow(false);
          setPendingCheckoutUrl(null);
          setPendingPlan(null);
        }}
        plan={pendingPlan}
        isLogin={false}
        checkoutUrl={pendingCheckoutUrl}
        onAuthSuccess={(authenticatedUser) => {
          // Update local state with new user
          setUser(authenticatedUser);
          setToken(localStorage.getItem("authToken"));
          setProfile(authenticatedUser);

          // Redirect to checkout if there's a pending checkout URL
          if (pendingCheckoutUrl) {
            const checkoutUrl =
              pendingCheckoutUrl +
              `?checkout[email]=${encodeURIComponent(authenticatedUser.email)}` +
              `&checkout[name]=${encodeURIComponent(authenticatedUser.name || authenticatedUser.email)}` +
              `&checkout[custom][user_id]=${authenticatedUser?.id || authenticatedUser._id}` +
              (aff ? `&aff=${aff}` : "");
            window.location.href = checkoutUrl;
          }
        }}
        aff={aff}
      />

      {/* Upgrade Confirmation Modal */}
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
