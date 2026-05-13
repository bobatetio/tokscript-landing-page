/* Plain white platform glyphs used as a small row beneath the Transcripts
   section header. Kept inline so the data file is self-contained. */
const TikTokGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);
const InstagramGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeGlyph = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const PLATFORM_GLYPHS = [
  { key: "tiktok", label: "TikTok", Glyph: TikTokGlyph },
  { key: "instagram", label: "Instagram", Glyph: InstagramGlyph },
  { key: "youtube", label: "YouTube", Glyph: YoutubeGlyph },
];

/* Section order is intentional: Bulk Processing first (volume — the most
   tangible upgrade trigger), MCP next (headline integration), AI Agents last
   (lowest-priority basic). Chrome Extension stands alone since its
   capabilities don't belong inside the Library section. */
export const PRICING_CATEGORIES = [
  {
    key: "transcripts",
    tierLabels: {
      free: "Basic Transcripts",
      monthly: "Bulk Processing",
      annual: "Bulk Processing",
      lifetime: "Bulk Processing",
    },
    /* Platform glyph row renders inline after the feature at this index,
       with an "All Platforms" label. Index 2 places it between "Bulk import
       50 videos at once" and "HD video downloads". Only shown on paid tiers
       since free is TikTok-only and "All Platforms" would mislead. */
    inlineGlyphsAfter: 2,
    inlineGlyphsTiers: ["monthly", "annual", "lifetime"],
    features: [
      {
        name: "Unlimited transcripts",
        nameByTier: { free: "5 transcripts per day" },
        tooltip: "Transcribe as many TikTok, Instagram, or YouTube videos as you want — no daily limit.",
        tiers: ["free", "monthly", "annual", "lifetime"],
      },
      {
        name: "Unlimited translations",
        nameByTier: { free: "Translate to 50+ languages" },
        tooltip: "Translate every transcript into any of 50+ supported languages.",
        tiers: ["free", "monthly", "annual", "lifetime"],
      },
      {
        name: "Bulk import 50 videos at once",
        tooltip: "Drop up to 50 URLs in one batch, plus full TikTok collections, Instagram Reels, and YouTube playlists.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "HD video downloads",
        tooltip: "Download the original-quality video file with no watermark.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
  {
    key: "mcp",
    tierLabels: {
      free: "MCP",
      monthly: "MCP Access",
      annual: "MCP Access",
      lifetime: "MCP Access",
    },
    rowIcons: [
      { src: "/figma-rows/Claude.png", alt: "Claude" },
      { src: "/figma-rows/Chatgpt.png", alt: "ChatGPT" },
    ],
    features: [
      {
        name: "Paste a URL in chat",
        tooltip: "Drop any video URL into Claude or ChatGPT and get the transcript inline.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Analyze any creator",
        tooltip: "Pull engagement metrics and top videos on demand.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Bulk research in chat",
        tooltip: "Run research across many creators or videos in one prompt.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Compare across platforms",
        tooltip: "Side-by-side compare TikTok, Instagram, and YouTube.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "28 actions inside chat",
        tooltip: "The full TokScript toolkit, every action available in Claude or ChatGPT.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
  {
    key: "chrome",
    tierLabels: {
      free: "Chrome Extension",
      monthly: "Chrome Extension",
      annual: "Chrome Extension",
      lifetime: "Chrome Extension",
    },
    features: [
      {
        name: "Pull real engagement metrics",
        tooltip: "Skip inflated follower counts. See actual views, likes, comments, shares, and bookmarks with mean and median for every metric.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Reverse-engineer any creator",
        tooltip: "See exactly when they post, how often, and which days drive results, with a full-year heatmap to track patterns over time.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Format & duration intelligence",
        tooltip: "Long-vs-short split and the exact video durations that cluster for any creator, at a glance.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Bulk research, 50 links at once",
        tooltip: "Paste up to 50 TikTok links and drop them straight into a folder. HD videos and cover image downloads included.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
  {
    key: "vault",
    tierLabels: {
      free: "Library & Exports",
      monthly: "Cloud Library & Exports",
      annual: "Cloud Library & Exports",
      lifetime: "Cloud Library & Exports",
    },
    features: [
      {
        name: "Search transcript history",
        tooltip: "Find anything across every URL you have transcribed, in seconds.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Sync across devices",
        tooltip: "Library stays in sync on web, Chrome, and mobile.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Merge all transcripts in one file",
        tooltip: "Roll every transcript you have into a single master file you can hand off in one click.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Export to CSV, TXT, JSON",
        tooltip: "Per-video or bulk, in any format, plus zipped videos and covers.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
  {
    key: "agents",
    tierLabels: {
      free: "AI Agents",
      monthly: "Unlimited AI Agents",
      annual: "Unlimited AI Agents",
      lifetime: "Unlimited AI Agents",
    },
    features: [
      {
        name: "Viral Hook Generator",
        sub: "Paste any transcript → Get 20+ proven hooks",
        tooltip: "Get 20+ hook variations per video, tuned to your style.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Viral Script Writer",
        sub: "Turn any viral video into YOUR script",
        tooltip: "Turn any video into a script in your own voice.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Virality Explainer",
        sub: "See exactly WHY videos blow up",
        tooltip: "Get a breakdown of why a clip went viral.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
];

export default PRICING_CATEGORIES;
