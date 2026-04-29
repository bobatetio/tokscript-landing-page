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
const Footer = dynamic(() => import("../../components/Footer"));
import tiktok1Icon from "../../assets/images/icons/tiktok1-icon.svg";
import instagram1Icon from "../../assets/images/icons/insta1-con.svg";
import youtube1Icon from "../../assets/images/icons/youtube1-icon.svg";
import bulkProcess from "../../assets/images/bulking-process.webp";
import cloudSync from "../../assets/images/cloud.webp";
import historyImg from "../../assets/images/history-img.webp";
import mediaImg from "../../assets/images/media-dwnld.webp";
import excessImg from "../../assets/images/excess-method.webp";
import workspceImg from "../../assets/images/ai-dashboard.webp";
const LoadingScreenComponent = dynamic(() => import("@/components/LoadingScreenComponent"));
import axios from "axios";
import unlockImg from "../../assets/images/UnLock-agent.webp";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const FaqSection = dynamic(() => import("../../components/FaqSection"));
const ProcessComponent = dynamic(() => import("@/components/ProcessComponent"));
const VideoLargeComponent = dynamic(() => import("@/components/VideoLargeComponent"));
const TokToolsFeatures = dynamic(() => import("@/components/TokToolsFeatures"));
const CounterComponent = dynamic(() => import("@/components/CounterComponent"));
const DontMissOutModal = dynamic(() => import("@/components/modals/DontMissOutModal"), { ssr: false });
const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal"), { ssr: false });
const CheckoutOverlay = dynamic(() => import("@/components/modals/CheckoutOverlay"), { ssr: false });
import { getDeviceFingerprint } from "@/lib/deviceFingerprint";
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
    description: "Grab HD Reels thumbnails",
    imageBgClass: "blue",
  },
  {
    icon: downloadIcon,
    title: "Download HD video",
    description: "Full quality, no watermarks",
    imageBgClass: "purple",
  },
  {
    icon: generateIcon,
    title: "Generate Viral Hooks",
    description: "Hooks that stop the scroll",
    imageBgClass: "green",
  },
  {
    icon: scriptIcon,
    title: "Rewrite scripts",
    description: "Remake any Reel as your own",
    imageBgClass: "yellow",
  },
  {
    icon: analyzeImg,
    title: "Analyze Virality",
    description: "See what made a Reel blow up",
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

const instagramFaqData = [
  {
    title: "What does a Reel transcript tool do?",
    content:
      <>It converts the spoken audio inside an Instagram video into written text, automatically. Paste a public Reel link into <a href="https://tokscript.com" target="_blank" rel="noopener noreferrer">TokScript</a> and the full text is returned in seconds, with no manual typing, no audio editing, and no extra software required.</>,
  },
  {
    title: "How do I extract text from an Instagram Reel?",
    content:
      'Copy the Reel link using Instagram\'s share button. Paste it into the input field above. Click "Scan Video." The transcript is ready in seconds. Download as TXT, XML, or PDF, or copy it to your clipboard directly.',
  },
  {
    title: "How do I copy an Instagram Reel link?",
    content:
      'On mobile: open the Reel, tap the paper plane icon, and select "Copy Link." On desktop: click the three-dot menu on the Reel and choose "Copy Link."',
  },
  {
    title: "Is TokScript free to use?",
    content:
      <>Yes. The free plan includes 5 transcripts and 5 translations per day at no cost. Unlimited transcripts, bulk processing, AI agents, and HD downloads are available on paid plans from <strong>$39 per year</strong>.</>,
  },
  {
    title: "How accurate is the Reel-to-text conversion?",
    content: (
      <>
        Accuracy depends on the audio quality of the original video. Here is what to expect:
        <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
          <li style={{color: '#d1d5db', display: 'list-item', marginBottom: '8px'}}><strong>Clear spoken audio, minimal background noise:</strong> typically <strong>95%+ word accuracy.</strong> Ready for captions, scripts, and publishing with minimal editing.</li>
          <li style={{color: '#d1d5db', display: 'list-item', marginBottom: '8px'}}><strong>Moderate background noise or music overlay:</strong> typically <strong>85-92% accuracy.</strong> Suitable for research and reference use. Light editing recommended before publishing.</li>
          <li style={{color: '#d1d5db', display: 'list-item'}}><strong>Heavy music, multiple overlapping voices, or low recording quality:</strong> typically <strong>70-80% accuracy.</strong> Best for content research and draft scripting. Editing required before any public-facing use. Transcripts from Reels with clear, direct-to-camera speech consistently require the least correction.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Can I transcribe content from private accounts?",
    content:
      "No. TokScript only processes publicly viewable Instagram Reels. Content from private accounts is inaccessible to outside systems. The Reel must be public for the tool to work.",
  },
  {
    title: "What if the Reel contains no spoken audio?",
    content:
      "If a Reel contains only music, ambient sound, or visual content with no spoken words, there is nothing to transcribe. TokScript extracts spoken language only, not instrumental audio or sound effects.",
  },
  {
    title: "Can I process multiple Reels at once?",
    content:
      <>Yes, on paid plans only. Paste up to 50 Reel links in one batch. TokScript processes all links simultaneously and exports every transcript together or individually. <strong>This feature is not available on the free plan.</strong></>,
  },
  {
    title: "What file formats are available for download?",
    content: (
      <>
        Transcripts are available in three formats:
        <ul style={{marginTop: '10px', paddingLeft: '20px'}}>
          <li style={{color: '#d1d5db', display: 'list-item', marginBottom: '8px'}}><strong>TXT:</strong> plain text, compatible with any editor</li>
          <li style={{color: '#d1d5db', display: 'list-item', marginBottom: '8px'}}><strong>XML:</strong> structured data, useful for developers and integrations</li>
          <li style={{color: '#d1d5db', display: 'list-item'}}><strong>PDF:</strong> formatted document, ready to share or file. You can also copy any transcript to your clipboard directly from the dashboard.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Which languages does translation support?",
    content:
      "TokScript supports translation into 11 languages: English, Spanish, Portuguese, Mandarin, French, Hindi, Arabic, German, Japanese, Korean, and Russian. Select your target language before scanning, or translate an existing transcript afterward.",
  },
  {
    title: "Can I use extracted text with AI writing tools?",
    content:
      "Yes. Copy or download any transcript from TokScript and paste it into ChatGPT, Claude, Gemini, or any AI platform for scripting, ideation, summarization, or strategy. TokScript's built-in AI agents handle the most common creator workflows: hooks, script rewrites, and performance analysis, without leaving the platform.",
  },
  {
    title: "Does TokScript work with Instagram Reel ads?",
    content:
      "Yes. Any publicly viewable Reel, including paid promotions, can be transcribed. Media buyers use TokScript to extract hook structures, offer framing, and CTAs from high-converting ads for competitive research and faster campaign development.",
  },
];


export default function InstagramLandingPage() {
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

  // CheckoutOverlay states
  const [checkoutOverlayShow, setCheckoutOverlayShow] = useState(false);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState(null);
  const [pendingPlan, setPendingPlan] = useState(null);
  const translateRef = useRef(null);
  const processRef = useRef(null);
  const videoDetailRef = useRef(null);

  // Bulk processing state
  const [bulkData, setBulkData] = useState(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [processingUrls, setProcessingUrls] = useState([]);
  const [selectedBulkItem, setSelectedBulkItem] = useState(null);
  const [selectedBulkIndex, setSelectedBulkIndex] = useState(null);

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
        // videoLink?.includes("tiktok.com"
        if (true) {
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

      if(selectedLanguage !== "none") {
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

  // Handle bulk processing for guest/free users with SSE streaming
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

    const urlsToProcess = links.slice(0, 30);

    const firstUrl = urlsToProcess[0].toLowerCase();
    let platform = "tiktok";
    if (firstUrl.includes("youtube.com") || firstUrl.includes("youtu.be")) {
      platform = "youtube";
    } else if (firstUrl.includes("instagram.com") || firstUrl.includes("instagr.am")) {
      platform = "instagram";
    }

    setIsBulkProcessing(true);
    setBulkData(null);
    setError("");
    setVideoData(null);
    setProcessingUrls(urlsToProcess);
    setSelectedBulkItem(null);
    setSelectedBulkIndex(null);

    setTimeout(() => {
      processRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${platform}/bulk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            urls: urlsToProcess,
            deviceFingerprint,
            targetLanguage: selectedLanguage !== "none" ? selectedLanguage : null,
          }),
        },
      );

      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream")) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let streamBulkItems = [];
        let firstCompleteFound = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop();

          for (const part of parts) {
            const lines = part.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              try {
                const event = JSON.parse(line.slice(6));

                if (event.type === "start") {
                  streamBulkItems = urlsToProcess.slice(0, event.total).map((url) => ({
                    sourceUrl: url, status: "pending", transcript: null, title: null,
                    duration: null, views: null, thumbnail: null, username: null, author: {},
                  }));
                  setBulkData({
                    transcript: { bulkItems: [...streamBulkItems] },
                    summary: { total: event.total, completed: 0, failed: 0, unavailable: 0 },
                  });
                }

                if (event.type === "processing" && streamBulkItems[event.index]) {
                  streamBulkItems[event.index] = { ...streamBulkItems[event.index], status: "processing" };
                  setBulkData((prev) => ({
                    ...prev,
                    transcript: { ...prev?.transcript, bulkItems: [...streamBulkItems] },
                  }));
                }

                if (event.type === "item") {
                  streamBulkItems[event.index] = event.item;
                  const completed = streamBulkItems.filter((i) => i.status === "complete").length;
                  const failed = streamBulkItems.filter((i) => i.status === "failed").length;
                  const unavailable = streamBulkItems.filter((i) => i.status === "unavailable").length;
                  setBulkData({
                    transcript: { bulkItems: [...streamBulkItems] },
                    summary: { total: streamBulkItems.length, completed, failed, unavailable },
                  });

                  if (!firstCompleteFound && (event.item.status === "complete" || event.item.status === "unavailable")) {
                    firstCompleteFound = true;
                    setSelectedBulkItem(event.item);
                    setSelectedBulkIndex(event.index);
                  }
                }

                if (event.type === "complete") {
                  setBulkData(event);
                }

                if (event.type === "error") {
                  setError(event.message || event.error || "Processing error");
                }
              } catch (parseError) {
                console.error("SSE parse error:", parseError);
              }
            }
          }
        }
      } else {
        const data = await response.json();
        if (!response.ok) {
          if (data.error === "bulk_already_used") {
            setDontMissOutModalShow(true);
            setError("You have already used your free bulk processing. Sign up for unlimited access.");
          } else {
            setError(data.message || data.error || "Failed to process bulk URLs");
          }
          return;
        }
        setBulkData(data);
        const bulkItems = data?.transcript?.bulkItems || [];
        const firstCompleteIndex = bulkItems.findIndex(item => item.status === "complete" || item.status === "unavailable");
        if (firstCompleteIndex !== -1) {
          setSelectedBulkItem(bulkItems[firstCompleteIndex]);
          setSelectedBulkIndex(firstCompleteIndex);
        }
      }

      // Mark bulk as used in localStorage to prevent repeat usage
      try { localStorage.setItem('tokscript_bulk_used', 'true'); } catch (e) { /* localStorage unavailable */ }
    } catch (error) {
      console.error("Bulk processing error:", error);
      setError(error.message || "Failed to process bulk URLs");
    } finally {
      setIsBulkProcessing(false);
    }
  };

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

  const transformBulkItemToVideoData = (item) => {
    if (!item) return null;
    return {
      data: {
        id: null,
        desc: item.title || "",
        video: { cover: item.thumbnail || null, downloadAddr: null },
        author: { uniqueId: item.username || item.author?.username || "" },
      },
      subtitles: item.transcript || "",
    };
  };

  // Enhanced checkout handler with authentication check
  const handleCheckout = async (product) => {
    // Build buyUrl from product data
    const buyUrl =
      product?.buyUrl ||
      `https://tokscript.lemonsqueezy.com/checkout/buy/${product?.attributes?.slug}`;

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
      "5 Instagram Reels transcripts per day",
      "5 translations per day",
      "Instagram Reels, TikTok, Shorts",
      "Basic features included",
    ],
  };

  // Static features for paid plans
  const paidPlanFeatures = [
    "Unlimited transcripts and bulk downloads",
    "Bulk import 50 video links at once",
    "Instagram Reels, TikTok, and YouTube Shorts (unlimited)",
    "Download HD videos (no watermark) and cover images",
    "Quick URL method: just add tokscript.com/",
    "Export in multiple formats: TXT, XML, PDF",
  ];

  // Transform API data to match our component structure
  const transformPlansData = () => {
    // Use index 2 to match HomePage approach (product id 782434)
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

  return (
    <div className="landing-page instagram-landing-page">
      <Header />
      <div className="inner-page">
        <div className="banner-section">
          <div className="container">
            <div className="inner-section">
              <div className="banner-content-wrapper">
                <button className="ai-btn">
                  <Image src={magicIcon} alt="" width={20} height={20} priority />
                  AI Powered
                </button>
                <h1 className="cyan-pink-gradient w-600 large">
                  Instagram<br />Transcript Generator{" "}
                </h1>
                <p>
                  Generate accurate transcripts from any Instagram Reel <strong>online</strong> in seconds.
                </p>
              </div>
              <div
                className={`chat-input-container${error ? " has-error" : ""}`}
              >
                <textarea
                  placeholder={error || "Paste up to 50 Instagram Reels links here"}
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
                Process up to 50 Instagram Reels at once. Bulk transcribe, translate, and export in seconds.
              </p>
              <div className="social-platform-buttons">
                <span className="platform-label">Supports:</span>
                <span className="platform-btn">
                  <TbBrandInstagram />
                  Reels
                </span>
                <span className="platform-separator">·</span>
                <span className="platform-btn">
                  <TbBrandTiktok />
                  TikTok
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
            <div className="about-toktools-section" ref={processRef}>
              <div className="inner-section-wrapper">
                {(bulkData && !isBulkProcessing) && (
                  <ProcessComponent
                    bulkData={bulkData}
                    isProcessing={isBulkProcessing}
                    processingUrls={processingUrls}
                    onSignUp={() => {
                      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`);
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
                  AI-powered tools for Instagram Reels creators
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
                  Your Instagram Reels transcripts, AI agents, folders, and bulk tools are all inside.
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
        <section className="how-it-works-section" id="how-it-works-reels">
          <div className="container">
            <h2>How to Generate a Transcript from Instagram</h2>
            <p className="how-it-works-subtitle">Getting your Instagram transcript takes three steps. No extensions, no software, and no Instagram Login required.</p>
            <div className="row">
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Copy the Instagram Reel Link</h3>
                  <p>Open the Reel inside the Instagram app. Tap the paper plane icon (share button) and select &quot;Copy Link.&quot; On desktop, click the three-dot menu on the Reel and select &quot;Copy Link.&quot; The Instagram URL is now on your clipboard.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Paste It Into TokScript</h3>
                  <p>Drop the link into the input field above. You can paste a single Reel link or up to 50 Instagram links at once for bulk transcript generation.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Download Your Instagram Transcript</h3>
                  <p>Click &quot;Scan Video.&quot; Your transcript is ready in seconds. Download it as TXT, XML, or PDF. Translate it into 11+ languages. Or run it through our AI agents to generate hooks, rewrite scripts, and analyze what made that Reel perform.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-platform-section" id="how-it-works">
          <div className="container">
            <div className="inner-section">
              <div className="title-section">
                <h2>
                  Instagram Reels Transcript <br /> &amp; Download Platform
                </h2>
                <p className="">
                  2.6M+ videos processed. Built specifically for IG content, not bolted onto a generic tool. TokScript converts any public Instagram Reel online into clean, accurate text in seconds. Purpose-built for how Reels content actually works. Paste a link, get the transcript, and use it for captions, scripts, competitor research, or AI workflows.
                </p>
              </div>
              {/* Section 1: Bulk Importing - text left, image right */}
              <div className="bulk-import-section light">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Bulk Instagram Transcript Import</h3>
                      <p className="bulk-text-div">
                        Paste up to 50 Reel links in a single batch and pull every transcript simultaneously. Auditing a competitor&apos;s strategy, building a research swipe file, or processing a full week of Reels: bulk import handles it in one action. Every transcript is ready to export together.
                      </p>
                      <ul>
                        <li>Up to 50 Reel links per batch</li>
                        <li>Export all at once as TXT, XML, or PDF</li>
                        <li>Process simultaneously or select individually</li>
                        <li><strong>Available on paid plans only</strong></li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-4">
                      <Image src={bulkProcess} alt="Bulk transcript processing interface showing multiple Instagram Reels URLs being imported" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 2: Cloud Storage - text left, image right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content-main-wrapper">
                      <h3>Cloud Transcript Library</h3>
                      <p className="bulk-text-div">
                        Every transcript saves automatically to your personal TokScript library. Access your full history from any device: phone, tablet, or desktop. Nothing is lost, and nothing needs manual backup.
                      </p>
                      <ul>
                        <li>Automatic cloud backup for every transcript</li>
                        <li>Full history accessible from any device</li>
                        <li>All files encrypted and stored securely</li>
                        <li>Zero maintenance required</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card mt-3">
                      <Image src={cloudSync} alt="Cloud transcript library with saved transcripts organized by date" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 3: History & Bookmarking - image left, text right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={historyImg} alt="Transcript history panel showing previously processed videos" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>History and Folders</h3>
                      <p className="bulk-text-div">
                        TokScript logs every Reel you convert: original link, date processed, video duration, and word count. Organize transcripts into folders by client, campaign, or topic. Re-download in any format whenever needed.
                      </p>
                      <ul>
                        <li>Full history with video metadata</li>
                        <li>Custom folders by campaign, client, or topic</li>
                        <li>Re-download as TXT, XML, or PDF anytime</li>
                        <li>Bulk folder exports <em>(paid plans)</em></li>
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
                      <h3>HD Video and Cover Image Download (Paid Plan Only)</h3>
                      <p className="bulk-text-div">
                        Save any public Instagram Reel in full HD with no watermark. Download the thumbnail at original resolution too. Archive Reels before they are deleted, repurpose content, or build visual reference libraries.
                      </p>
                      <ul>
                        <li>Full HD download, no watermark</li>
                        <li>Thumbnail at original resolution</li>
                        <li>No compression or quality loss</li>
                      </ul>
                      <Link href="/pricing" className="start-now">
                        Start now
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-6 align-self-center">
                    <div className="img-card">
                      <Image src={mediaImg} alt="Media download interface with video and cover image save options" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Section 5: Quick URL Download - image left, text right */}
              <div className="bulk-import-section">
                <div className="row">
                  <div className="col-12 col-lg-6 order-2 order-lg-1 align-self-center">
                    <div className="img-card">
                      <Image src={excessImg} alt="Quick URL method showing paste-and-process transcript extraction" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6 order-1 order-lg-2 mb-4 mb-lg-0">
                    <div className="content-main-wrapper">
                      <h3>Instagram Transcript URL Shortcut</h3>
                      <p className="bulk-text-div">
                        Place tokscript.com/ before any Instagram Reel URL in your browser bar and press enter. The Reel text extracts right away. No navigation, no extra steps. It works like a shortcut you already know: just edit the URL, hit enter, and your transcript is ready before you even leave your browser tab.
                      </p>
                      <ul>
                        <li>Prefix any Instagram Reel URL with tokscript.com/ to download</li>
                        <li>No login required for this method</li>
                        <li>Works directly from your browser address bar</li>
                        <li>Transcript ready in seconds</li>
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
                      <h3>AI Agents for Instagram Content Creators</h3>
                      <p className="bulk-text-div">
                        Three tools built for Instagram content strategy. Feed any Reel transcript in and get a production-ready output back.
                      </p>
                      <div className="ai-listing">
                        <ul>
                          <li>
                            Hook Generator:
                            <p>Get 20+ opening hook variations from any Reel transcript. Each hook is grounded in the structure of proven, high-performing content, built for the pace and rhythm of Reel videos specifically.</p>
                          </li>
                          <li>
                            Script Writer:
                            <p>Turn any Reel transcript into a new script written in your voice. The agent captures the structure and energy of the original, then rebuilds it around your niche and tone. Ready to film, not just to read.</p>
                          </li>
                          <li>
                            Virality Explainer:
                            <p>Understand exactly why a specific Reel performed. Get a structured breakdown of hook mechanics, psychological triggers, pacing decisions, and content patterns, with clear, actionable takeaways for your own strategy.</p>
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
                      <Image src={workspceImg} alt="AI-powered dashboard showing transcript analysis and viral hook suggestions" loading="lazy" sizes="(max-width: 768px) 100vw, 50vw" />
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

            <div className="pricing-page-new instagram-reels-pricing">
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
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-cyan-400"
                                style={{ color: "#F77737" }}
                              />{" "}
                              FREE FEATURES
                            </div>
                            <Feature text="5 Instagram Reels transcripts per day" />
                            <Feature text="5 translations per day" />
                            <Feature text="Instagram Reels, TikTok, Shorts" />
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
                            ) : !user ? (
                              <>
                                {/* Desktop: Button opens modal */}
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
                                color: "#F77737",
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
                              sub="Paste any Reels transcript, get 20+ proven hooks"
                            />
                            <Feature
                              text="Viral Script Writer"
                              bold
                              sub="Turn any viral Reel into YOUR script"
                            />
                            <Feature
                              text="Virality Explainer"
                              bold
                              sub="See exactly WHY Reels blow up"
                            />
                          </div>

                          <div className="divider"></div>

                          <div className="feature-group">
                            <div className="group-title">
                              <Layers
                                size={12}
                                className="text-cyan-400"
                                style={{ color: "#F77737" }}
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
                              <TikTokIconSVG
                                style={{ width: "16px", height: "16px" }}
                              />
                              <InstagramIconSVG
                                style={{ width: "16px", height: "16px" }}
                              />
                              <YoutubeIconSVG
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
                                    handleCheckout(annualPlan || { title: "Pro Annual", price: "$39", buyUrl: null });
                                  }}
                                  className="btn btn-primary d-none d-md-flex"
                                >
                                  Get Annual - Save $81
                                  <ArrowRight size={20} strokeWidth={3} />
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("annual"))?.buyUrl || ""}`}
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
                                style={{ color: "#F77737" }}
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
                            style={{
                              fontSize: "0.75rem",
                              color: "#64748b",
                              marginTop: "0.5rem",
                              paddingLeft: "0.25rem",
                            }}
                          >
                            Costs $81 more per year
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
                                      background: "rgba(15, 23, 42, 0.5)",
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
                                      background: "rgba(15, 23, 42, 0.5)",
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
                                    handleCheckout(monthlyPlan || { title: "Pro Monthly", price: "$10", buyUrl: null });
                                  }}
                                  style={{
                                    background: "rgba(15, 23, 42, 0.5)",
                                    border: "1px solid #2a2a2a",
                                  }}
                                >
                                  Get Monthly
                                </button>
                                {/* Mobile: Anchor redirects to signin */}
                                <a
                                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up?returnUrl=${allPlans.find((plan) => plan.title?.toLowerCase().includes("monthly"))?.buyUrl || ""}`}
                                  className="btn btn-outline d-flex d-md-none"
                                  style={{
                                    background: "rgba(15, 23, 42, 0.5)",
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
        <section className="who-uses-section">
          <div className="container">
            <div className="title-section">
              <h2>Who Uses TokScript&apos;s Instagram Transcript Generator</h2>
              <p>Content Creators repurpose Reels into captions, newsletters, and articles without rewatching. Social Media Managers build swipe files and deliver transcript-backed reports across client accounts. UGC Creators study the exact hooks driving results before filming. Media Buyers extract hook structures and CTAs from top Reel ads for faster iteration. Journalists create citable text records from public Reels. AI Workflow Users feed transcripts directly into ChatGPT, Claude, or Gemini.</p>
            </div>
          </div>
        </section>
        <section className="users-info-section">
          <div className="container">
            <div className="inner-section">
              <div className="title-wrappe">
                <p>41,000+ users have processed more than 2,600,000 videos across all platforms</p>
              </div>
              <CounterComponent />
            </div>
          </div>
        </section>
        <section className="who-uses-cards-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Content Creators</h3>
                  <p>Generate transcripts from your own Instagram Reels to repurpose content into blog posts, newsletters, social captions, and scripts. Feed transcripts into AI tools to speed up your entire content workflow.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Educators and Researchers</h3>
                  <p>Convert Instagram Reels, tutorials, and educational content into searchable text. Build a reference library from any account, create study notes, or analyze what top creators are actually saying.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>Marketers and Ad Analysts</h3>
                  <p>Studying competitor Reels or analyzing what ad scripts are working? Transcribe any Instagram Reel ad, extract the copy, and use it to inform your own creative strategy, all in seconds.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>AI and Automation Users</h3>
                  <p>Pull any Instagram Reel transcript and feed it directly to ChatGPT, Claude, Gemini, or any AI workflow. The fastest way to get clean, structured Reel text into any AI pipeline.</p>
                </div>
              </div>
              <div className="col-md-6 col-lg-4">
                <div className="who-uses-card">
                  <h3>UGC Creators and Influencers</h3>
                  <p>Stop replaying the same Reels over and over trying to catch every line. Download the transcript, read it in full, and use AI agents to rewrite it with your own voice and angle in minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FaqSection faqData={instagramFaqData} />
        <section className="ready-to-convert-section">
          <div className="container">
            <div className="inner-section">
              <h2>Ready to Convert Your First Reel?</h2>
              <p>Paste any public Reel link above. Get the full text in seconds.</p>
              <Link href="#" className="ready-to-convert-cta" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>Start Transcribing Free</Link>
            </div>
          </div>
        </section>
        <div className="disclaimer-section">
          <div className="container">
            <div className="inner-section">
              <div className="content">
                <h2>About TokScript: Free Instagram Transcript Generator</h2>
                <p>
                  TokScript was built around one idea: the spoken word inside IG Reels is the most underused content asset on the platform. Creators film, post, and move on, but the script behind every high-performing Reel holds patterns worth studying, repurposing, and building on. TokScript makes that content accessible in seconds. No manual retyping, no clunky workarounds. Every feature exists because creators, managers, and researchers asked for it. <strong>41,000+ users</strong> across content teams, agencies, and solo creators trust TokScript as part of their daily workflow. Over <strong>2.6 million Reels</strong> processed and counted.
                </p>
                <p>
                  Pull transcripts from your favorite Instagram Reels instantly and start building a library of content you can actually reference and reuse. TokScript is also the leading <Link href="/">TikTok Transcript Generator</Link> and <Link href="/youtube-transcript-generator">YouTube Transcript Generator</Link>.
                </p>
              </div>
              <div className="content">
                <h3>Instagram Ads Research</h3>
                <p>Studying top-performing Reel ads? Extract the spoken script to analyze hook structure, offer framing, and CTAs, then adapt what is working for your own campaigns faster than rewatching manually.</p>
              </div>
              <div className="content">
                <h3>UGC Creator Workflows</h3>
                <p>Pull the text from any Reel in your niche before filming. Study the exact phrasing and hooks driving engagement, and build your script around what is already proven to land.</p>
              </div>
              <div className="content">
                <h3>AI-Powered Content Production</h3>
                <p>Extract spoken content with TokScript, then feed it into any AI tool for scripting, ideation, or strategy work. Clean input produces better output, every time.</p>
              </div>
              <div className="content" style={{marginTop: '20px'}}>
                <p>TokScript is not affiliated with, endorsed by, or sponsored by Instagram or Meta. All trademarks belong to their respective owners.</p>
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

        <ShareBar url="https://tokscript.com/instagram-transcript-generator" text="Free Instagram transcript generator. Get transcripts from any Reel in seconds. 41,000+ creators use TokScript." />
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
