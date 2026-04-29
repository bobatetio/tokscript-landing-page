/**
 * Instagram Reels Landing Page Configuration
 *
 * This config file contains all customizable settings for the landing page.
 * Backend engineers: Update the values below to connect to your backend.
 */

export const config = {
  // ===========================================
  // PLATFORM IDENTIFICATION
  // ===========================================
  platform: "instagram-reels",
  platformName: "Instagram Reels",
  themeClass: "instagram-landing-page", // CSS class for theming

  // ===========================================
  // BRANDING & COPY
  // ===========================================
  branding: {
    siteName: "TokScript",
    headline: "Reels Transcript Generator",
    tagline: "Turn speech into text for any Instagram Reels, TikTok, and Shorts video",
    inputPlaceholder: "Paste your video link here",
    sendButtonText: "Send",
  },

  // ===========================================
  // API ENDPOINTS - UPDATE THESE FOR YOUR BACKEND
  // ===========================================
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    endpoints: {
      fetchVideoData: "/tiktok/fetchTikTokData",
      userProfile: "/user/profile",
      changePlan: "/subscription/change-plan",
      ipLookup: "https://api.ipify.org?format=json",
    },
  },

  // ===========================================
  // APP URLS - UPDATE FOR YOUR DEPLOYMENT
  // ===========================================
  urls: {
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL,
    dashboardPath: "/dashboard",
    signUpPath: "/sign-up",
    pricingPath: "/pricing",
  },

  // ===========================================
  // LEMONSQUEEZY CONFIGURATION
  // ===========================================
  lemonSqueezy: {
    productId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID,
    checkoutBaseUrl: "https://tokscript.lemonsqueezy.com/checkout/buy",
  },

  // ===========================================
  // FEATURE FLAGS - ENABLE/DISABLE SECTIONS
  // ===========================================
  features: {
    showAIFeatures: true,
    showDashboardPreview: true,
    showBulkImport: true,
    showCloudStorage: true,
    showHistoryBookmarking: true,
    showHDDownloads: true,
    showQuickURL: true,
    showChromeExtension: true,
    showTeamCollaboration: true,
    showAIAgents: true,
    showPricing: true,
    showCounterStats: true,
    showEnhanceExperience: true,
    showFAQ: true,
    showDisclaimer: true,
  },

  // ===========================================
  // STATISTICS DISPLAY
  // ===========================================
  stats: {
    usersCount: "41,000+",
    videosSaved: "2,600,000",
  },

  // ===========================================
  // FREE PLAN CONFIGURATION
  // ===========================================
  freePlan: {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
    features: [
      "Download 5 Instagram Reels Transcripts /day",
      "5 translations per day",
      "Download HD videos (no watermark) + Cover Images",
      "Chrome Extension (free features)",
      "History & Bookmarking Dashboard",
      "Quick URL method: just add tokscript.com/",
      "Export in multiple formats: .txt, .xml, .json, .csv",
    ],
  },

  // ===========================================
  // PAID PLAN FEATURES
  // ===========================================
  paidPlanFeatures: [
    "Unlimited transcripts & bulk downloads",
    "Unlimited translations",
    "Bulk import 50 video links at once",
    "Instagram Reels & YouTube Shorts (unlimited)",
    "Download HD videos (no watermark) + Cover Images",
    "Download TikTok Collections & Playlists",
    "Chrome Extension with all Pro Features",
    "Quick URL method: just add tokscript.com/",
    "Export in multiple formats: .txt, .xml, .json, .csv",
  ],

  // ===========================================
  // SEO & META (for page.js metadata export)
  // ===========================================
  seo: {
    title: "Instagram Transcript Generator - TokScript",
    description: "Instantly generate transcripts from any Instagram Reels video. Free tool for creators, marketers, and content professionals.",
    keywords: ["instagram transcript generator", "instagram reels transcript", "reels captions", "video to text"],
  },

  // ===========================================
  // AI FEATURES CARDS
  // ===========================================
  featureCards: [
    {
      id: "cover",
      title: "Save cover image",
      description: "Download HD cover images",
      imageBgClass: "blue",
    },
    {
      id: "download",
      title: "Download HD video",
      description: "No watermarks, full quality",
      imageBgClass: "purple",
    },
    {
      id: "hooks",
      title: "Generate Viral Hooks",
      description: "Create viral hooks instantly",
      imageBgClass: "green",
    },
    {
      id: "scripts",
      title: "Rewrite scripts",
      description: "Turn transcripts to viral videos",
      imageBgClass: "yellow",
    },
    {
      id: "analyze",
      title: "Analyze Virality",
      description: "Learn why video went viral",
      imageBgClass: "orange",
    },
  ],

  // ===========================================
  // DISCLAIMER CONTENT
  // ===========================================
  disclaimer: {
    title: "About TokScript Free Instagram Reels Transcript Generator",
    sections: [
      {
        title: null,
        content: "Download Video Transcripts (captions) For Free. Instantly, without uploading any files! Quick and simple. No catch. Download any video's captions, transcripts, and words for your Instagram Reels, TikTok, and YouTube Shorts videos in seconds.",
      },
      {
        title: "Instagram Reels Ads:",
        content: "If you're struggling to come up with ideas or need to know what a video is talking about you can easily download any videos transcript / subtitles to easily come up with new ideas or use for SEO and topic creation.",
      },
      {
        title: "UGC Creators:",
        content: "If you're struggling with what to say in your videos or just want a quick reminder of what does work and doesn't work, you can now download any transcript subtitles and reuse them for any future video ideas you might have.",
      },
      {
        title: "AI:",
        content: "Easily download any Instagram Reels, TikTok, or Shorts video's video transcript and subtitles so you can use it with any of your favorite Al companies like ChatGPT, Gemini, Claude, and more to easily create User Generated Video Scripts and ideas for your next video!",
      },
    ],
  },
};

export default config;
