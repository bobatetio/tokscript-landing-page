/* Section order is intentional: MCP first (headline feature), AI Agents
   last (lowest-priority basic). Chrome Extension stands alone since its
   capabilities don't belong inside the Library section. */
export const PRICING_CATEGORIES = [
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
    key: "transcripts",
    tierLabels: {
      free: "Basic Transcripts",
      monthly: "Unlimited Transcripts",
      annual: "Unlimited Transcripts",
      lifetime: "Unlimited Transcripts",
    },
    features: [
      {
        name: "Transcribe any video",
        tooltip: "Paste any TikTok, Instagram, or YouTube URL and get a clean transcript.",
        tiers: ["free", "monthly", "annual", "lifetime"],
      },
      {
        name: "50 videos per batch",
        tooltip: "Drop up to 50 URLs in one batch instead of pasting one by one.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Import collections & playlists",
        tooltip: "Pull whole TikTok collections, Instagram Reels, and YouTube playlists at once.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Translate to 50+ languages",
        tooltip: "Drop your transcript into any of 50+ languages.",
        tiers: ["free", "monthly", "annual", "lifetime"],
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
        name: "Transcribe from any Chrome tab",
        tooltip: "Right-click any video URL inside Chrome and grab the transcript without leaving the page.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Save direct to your library",
        tooltip: "Transcripts you capture in the extension auto-save to your cloud library.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "No copy-paste, ever",
        tooltip: "Skip the URL shuffle — capture from wherever you are browsing.",
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
      monthly: "All AI Agents",
      annual: "All AI Agents",
      lifetime: "All AI Agents",
    },
    features: [
      {
        name: "Generate viral hooks",
        tooltip: "Get 20+ hook variations per video, tuned to your style.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "Rewrite into your script",
        tooltip: "Turn any video into a script in your own voice.",
        tiers: ["monthly", "annual", "lifetime"],
      },
      {
        name: "See why videos blow up",
        tooltip: "Get a breakdown of why a clip went viral.",
        tiers: ["monthly", "annual", "lifetime"],
      },
    ],
  },
];

export default PRICING_CATEGORIES;
