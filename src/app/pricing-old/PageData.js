"use client";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"));
const FaqSection = dynamic(() => import("@/components/FaqSection"));
import Header from "@/components/Header";
import DontMissComponent from "@/components/DontMissComponent";

import { FaBrain, FaFireAlt, FaPenFancy } from "@/components/Icons";

import sparkIcon from "../../assets/images/icons/AI spark.svg";
import unlockImg from "../../assets/images/UnLock-agent.webp";
import tiktokIcon from "../../assets/images/icons/Tiktok logo.svg";
import youtubeIcon from "../../assets/images/icons/Youtube logo.svg";
import instagramIcon from "../../assets/images/icons/Instagram logo.svg";
import leftArrowIcon from "../../assets/images/icons/left-arrow.svg";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import LoadingScreenComponent from "@/components/LoadingScreenComponent";
import CounterComponent from "@/components/CounterComponent";
import Link from "next/link";
import { LemonProducts } from "@/components/LemonProducts";
import { LemonProductsStaging } from "@/components/LemonProductsStaging";

const priceCard = [
  {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
    features: [
      "Download 5 TikTok Transcripts /day",
      "Download HD videos (no watermark) + Cover Images ",
      "Chrome Extension (free features)",
      "History & Bookmarking Dashboard",
      "Quick URL method — just add tokscript.com/",
      "Export in multiple formats — .txt, .xml, .json, .csv",
    ],
    recommanded: false,
    plan: "free",
  },
  {
    title: "Annual Plan",
    description: "Everything in the Monthly Plan, at a huge discount.",
    price: "$25",
    period: "/ per year",
    features: [
      "Unlimited transcripts & bulk downloads",
      "Bulk import 50 video links at once",
      "Instagram Reels & YouTube Shorts (unlimited)",
      "Download HD videos (no watermark) + Cover Images ",
      "Download TikTok Collections & Playlists",
      "Chrome Extension with all Pro Features",
      "Quick URL method — just add tokscript.com/",
      "Export in multiple formats — .txt, .xml, .json, .csv",
    ],
    img: unlockImg,
    recommanded: true,
    plan: "annual",
  },
  {
    title: "Monthly Plan",
    description: "For creators & marketers who want full power",
    price: "$5",
    period: "/ per month",
    features: [
      "Unlimited transcripts & bulk downloads",
      "Bulk import 50 video links at once",
      "Instagram Reels & YouTube Shorts (unlimited)",
      "Download HD videos (no watermark) + Cover Images",
      "Download TikTok Collections & Playlists ",
      "Chrome Extension with all Pro Features",
      "Quick URL method — just add tokscript.com/",
      "Export in multiple formats — .txt, .xml, .json, .csv",
    ],
    img: unlockImg,
    recommanded: false,
    plan: "monthly",
  },
];

// Component that uses useSearchParams - needs to be wrapped in Suspense
function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dontMissOutModalShow, setDontMissOutModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  // State for upgrade confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleDontMissOutModalClose = () => {
    setDontMissOutModalShow(false);
  };
  const handleDontMissOutModalShow = () => {
    setDontMissOutModalShow(true);
  };

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
        if(process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID == "645484"){
          responsed = LemonProducts()
        }else{
          responsed = LemonProductsStaging()
        }
    setProductsData(responsed)
  };
  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProfile(response?.data?.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [token]);

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
          user.email
        )}&checkout[name]=${encodeURIComponent(
          user.name || user.email
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
          (plan) => plan.variantId === selectedProductId
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
          }
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
          error.response?.data?.message || "Error while updating subscription"
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
      "Quick URL method — just add tokscript.com/",
      "Export in multiple formats — .txt, .xml, .json, .csv",
    ],
  };

  // Static features for paid plans
  const paidPlanFeatures = [
    "Unlimited transcripts & bulk downloads",
    "Bulk import 50 video links at once",
    "Instagram Reels & YouTube Shorts (unlimited)",
    "Download HD videos (no watermark) + Cover Images",
    "Download TikTok Collections & Playlists",
    "Chrome Extension with all Pro Features",
    "Quick URL method — just add tokscript.com/",
    "Export in multiple formats — .txt, .xml, .json, .csv",
  ];

  // Transform API data to match our component structure
  const transformPlansData = () => {
    const productId = process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID;
    if (!productsData?.data?.find((item) => item?.id == productId)?.variants)
      return [];

    const variants = productsData.data.find(
      (item) => item?.id == productId
    )?.variants;
    const plans = [];

    // Find monthly and annual variants
    const monthlyVariant = variants.find(
      (v) =>
        v.attributes.interval === "month" && v.attributes.status === "published"
    );
    const annualVariant = variants.find(
      (v) =>
        v.attributes.interval === "year" && v.attributes.status === "published"
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
      });
    }

    return plans;
  };

  // Combine free plan with API plans
  const allPlans = [freePlan, ...transformPlansData()];

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

    getProduct();
  }, []);

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  // Handle checkout after successful login
  useEffect(() => {
    const shouldCheckout = searchParams.get("checkout");
    const productId = searchParams.get("productId");
    const checkoutUrl = searchParams.get("checkoutUrl");

    if (
      shouldCheckout === "true" &&
      productId &&
      checkoutUrl &&
      user &&
      token
    ) {
      // User has returned from login and should proceed to checkout
      console.log("Proceeding to checkout after login:", checkoutUrl);
      window.location.href = decodeURIComponent(checkoutUrl);
    }
  }, [user, token, searchParams]);

  return (
    <div className="pricing-page">
      <Header />
      <div className="inner-page">
        <section className="pricing-card-detail">
          <div className="container">
            {/* <DontMissComponent /> */}
            <div className="title-section">
              <Link href="/" className="d-block d-md-none mb-3">
                <Image
                  src={leftArrowIcon}
                  alt="left arrow"
                  width={20}
                  height={20}
                />
              </Link>
              <h3>Pricing </h3>
              <p>Find the plan that fits your content workflow</p>
            </div>
            <div className="row justify-content-center">
              {loading ? (
                <div className="col-12 text-center">
                  <LoadingScreenComponent
                    completion={50}
                    heading="Loading Plans"
                    text1="We're fetching the best plans for you."
                    text2="Please wait a moment."
                  />
                </div>
              ) : user ? (
                allPlans?.slice(1).map((item, index) => (
                  <div
                    className="col-12 col-md-6 col-lg-6 col-xl-4 mb-4"
                    key={index}
                  >
                    <div
                      className={
                        `pricing-card-div` +
                        (item?.recommanded ? " active" : "")
                      }
                    >
                      <div className="card-inner">
                        <div className="ellipce-wrap">
                          <div className="inner-wrap">
                            <div className="inner-div">
                              {/* Add any content here if needed */}
                            </div>
                          </div>
                        </div>
                        {index === 1 && ( // Show recommended for Annual plan (index 1)
                          <div className="recomended-div">
                            <span>
                              <Image src={sparkIcon} alt="" />
                              Recommended
                            </span>
                          </div>
                        )}
                        <div className="amount-detail">
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </div>
                        <h4 className="dollar-price">
                          {item.price}
                          <span>{item.period}</span>
                        </h4>
                        {/* Dynamic button based on subscription status */}
                        {profile &&
                          profile.subscription &&
                          profile.subscription.status === "active" &&
                          (profile.subscription.lemonSqueezyVariantId ===
                            item.variantId ||
                            (item.title === "Free Plan" &&
                              (!profile.subscription ||
                                profile.plan === "free"))) ? (
                          // Show current plan name for subscribed plan
                          <button
                            className="get-started-btn subscribed"
                            disabled
                            style={{
                              backgroundColor: "#28a745",
                              color: "white",
                              cursor: "not-allowed",
                              opacity: 0.8,
                            }}
                          >
                            {profile.plan
                              ? profile.plan.charAt(0).toUpperCase() +
                              profile.plan.slice(1)
                              : "Current Plan"}
                          </button>
                        ) : profile &&
                          profile.subscription &&
                          profile.subscription.status === "active" &&
                          profile?.plan !== "free" &&
                          item.title !== "Free Plan" ? (
                          // Show upgrade button for other plans when user is subscribed
                          <button
                            className="get-started-btn"
                            onClick={() =>
                              handleUpgradeClick(
                                item.variantId,
                                item.title?.toLowerCase()?.includes("pro")
                                  ? "pro"
                                  : item.title
                              )
                            }
                            disabled={loadingStates[item.variantId]}
                          >
                            {loadingStates[item.variantId]
                              ? "Processing..."
                              : "Upgrade"}
                          </button>
                        ) : (
                          // Show get started for non-subscribed users or for free plan
                          <button
                            className="get-started-btn"
                            onClick={() => {
                              if (item.buyUrl) {
                                handleCheckout(item);
                              } else {
                                // For free plan or no buyUrl
                                setDontMissOutModalShow(true);
                              }
                            }}
                            disabled={loadingStates[item.id || item.title]}
                          >
                            {loadingStates[item.id || item.title]
                              ? "Loading..."
                              : "Get Started"}
                          </button>
                        )}
                        <div className="cards-listing-div">
                          <strong>What you will get</strong>
                          <ul>
                            {(item.features || []).map((feature, i) =>
                              i === 0 && index !== 0 ? (
                                <li key={i}>
                                  {feature}
                                  <Image
                                    src={tiktokIcon}
                                    alt="TikTok"
                                    className="social-icon mx-1"
                                  />
                                  <Image
                                    src={youtubeIcon}
                                    alt="YouTube"
                                    className="social-icon me-1"
                                  />
                                  <Image
                                    src={instagramIcon}
                                    alt="Instagram"
                                    className="social-icon"
                                  />
                                </li>
                              ) : (
                                <li key={i}>{feature}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="img-card-div">
                          {item.img && <Image src={item.img} alt="Feature unlock illustration" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                allPlans.map((item, index) => (
                  <div
                    className="col-12 col-md-6 col-lg-6 col-xl-4 mb-4"
                    key={index}
                  >
                    <div
                      className={
                        `pricing-card-div` +
                        (item?.recommanded ? " active" : "")
                      }
                    >
                      <div className="card-inner">
                        <div className="ellipce-wrap">
                          <div className="inner-wrap">
                            <div className="inner-div">
                              {/* Add any content here if needed */}
                            </div>
                          </div>
                        </div>
                        {index === 1 && ( // Show recommended for Annual plan (index 1)
                          <div className="recomended-div">
                            <span>
                              <Image src={sparkIcon} alt="" />
                              Recommended
                            </span>
                          </div>
                        )}
                        <div className="amount-detail">
                          <strong>{item.title}</strong>
                          <p>{item.description}</p>
                        </div>
                        <h4 className="dollar-price">
                          {item.price}
                          <span>{item.period}</span>
                        </h4>
                        {/* Dynamic button based on subscription status */}
                        {profile &&
                          profile.subscription &&
                          profile.subscription.status === "active" &&
                          (profile.subscription.lemonSqueezyVariantId ===
                            item.variantId ||
                            (item.title === "Free Plan" &&
                              (!profile.subscription ||
                                profile.plan === "free"))) ? (
                          // Show current plan name for subscribed plan
                          <button
                            className="get-started-btn subscribed"
                            disabled
                            style={{
                              backgroundColor: "#28a745",
                              color: "white",
                              cursor: "not-allowed",
                              opacity: 0.8,
                            }}
                          >
                            {profile.plan
                              ? profile.plan.charAt(0).toUpperCase() +
                              profile.plan.slice(1)
                              : "Current Plan"}
                          </button>
                        ) : profile &&
                          profile.subscription &&
                          profile.subscription.status === "active" &&
                          profile?.plan !== "free" &&
                          item.title !== "Free Plan" ? (
                          // Show upgrade button for other plans when user is subscribed
                          <button
                            className="get-started-btn"
                            onClick={() =>
                              handleUpgradeClick(item.variantId, item.title)
                            }
                            disabled={loadingStates[item.variantId]}
                          >
                            {loadingStates[item.variantId]
                              ? "Processing..."
                              : "Upgrade"}
                          </button>
                        ) : (
                          // Show get started for non-subscribed users or for free plan
                          <button
                            className="get-started-btn"
                            onClick={() => {
                              if (item.buyUrl) {
                                handleCheckout(item);
                              } else {
                                // For free plan or no buyUrl
                                setDontMissOutModalShow(true);
                              }
                            }}
                            disabled={loadingStates[item.id || item.title]}
                          >
                            {loadingStates[item.id || item.title]
                              ? "Loading..."
                              : "Get Started"}
                          </button>
                        )}
                        <div className="cards-listing-div">
                          <strong>What you will get</strong>
                          <ul>
                            {(item.features || []).map((feature, i) =>
                              i === 0 && index !== 0 ? (
                                <li key={i}>
                                  {feature}
                                  <Image
                                    src={tiktokIcon}
                                    alt="TikTok"
                                    className="social-icon mx-1"
                                  />
                                  <Image
                                    src={youtubeIcon}
                                    alt="YouTube"
                                    className="social-icon me-1"
                                  />
                                  <Image
                                    src={instagramIcon}
                                    alt="Instagram"
                                    className="social-icon"
                                  />
                                </li>
                              ) : (
                                <li key={i}>{feature}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div className="img-card-div">
                          {item.img && <Image src={item.img} alt="Feature unlock illustration" />}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section className="users-cards-section">
          <div className="container">
            <p className="user-detail">
              41,000+ users have processed more than 2,600,000 videos so far
            </p>
            <CounterComponent />
          </div>
        </section>
        <FaqSection />
        <Footer />
      </div>
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
    </div>
  );
}

// Loading fallback component
function PricingLoading() {
  return (
    <div className="pricing-page">
      <Header />
      <div className="inner-page">
        <section className="pricing-card-detail">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p>Loading pricing...</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

// Main component with Suspense wrapper
export default function PageData() {
  return (
    <Suspense fallback={<PricingLoading />}>
      <PricingContent />
    </Suspense>
  );
}
