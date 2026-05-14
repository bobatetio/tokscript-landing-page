/* Plain white platform glyphs used as inline indicators on the right side of
   each feature row in the pricing cards. Kept inline so the data file is
   self-contained. AI brand marks (Claude / ChatGPT / Manus) carry their own
   brand fills since they're recognized by color rather than monochrome
   silhouette. */
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
/* Claude: coral disc with a cream sparkle/asterisk mark. */
const ClaudeGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#d97757" />
    <g fill="#faf3e8">
      <path d="M12 4.6 L13 11 L19.4 12 L13 13 L12 19.4 L11 13 L4.6 12 L11 11 Z" />
      <path d="M17.3 5.6 L17.8 8.2 L20.4 8.7 L17.8 9.2 L17.3 11.8 L16.8 9.2 L14.2 8.7 L16.8 8.2 Z" />
    </g>
  </svg>
);
/* ChatGPT: green 6-petal mark. */
const ChatGPTGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#10a37f" aria-hidden="true">
    <path d="M22.28 9.82a5.99 5.99 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.99 5.99 0 0 0-4 2.9 6.05 6.05 0 0 0 .74 7.1 5.98 5.98 0 0 0 .51 4.91 6.05 6.05 0 0 0 6.52 2.9A5.99 5.99 0 0 0 13.26 24a6.06 6.06 0 0 0 5.77-4.21 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.07zM13.26 22.43a4.48 4.48 0 0 1-2.87-1.04l.14-.08 4.78-2.76a.8.8 0 0 0 .39-.68v-6.74l2.02 1.17a.07.07 0 0 1 .04.05v5.59a4.5 4.5 0 0 1-4.5 4.49zM3.6 18.3a4.47 4.47 0 0 1-.53-3.01l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06l-4.84 2.79a4.5 4.5 0 0 1-6.14-1.65zM2.34 7.9a4.49 4.49 0 0 1 2.37-1.97v5.68a.77.77 0 0 0 .39.67l5.81 3.36-2.02 1.17a.08.08 0 0 1-.07 0L3.99 14a4.5 4.5 0 0 1-1.65-6.13zm16.6 3.86-5.83-3.39 2.02-1.16a.08.08 0 0 1 .07 0l4.83 2.79a4.49 4.49 0 0 1-.68 8.11v-5.68a.79.79 0 0 0-.41-.67zm2.01-3.02-.14-.09L16.04 5.9a.78.78 0 0 0-.79 0L9.41 9.23V6.9a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.14-2.02-1.17a.08.08 0 0 1-.04-.05V6.08a4.5 4.5 0 0 1 7.38-3.46l-.14.08-4.78 2.76a.8.8 0 0 0-.4.68zm1.1-2.37 2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z" />
  </svg>
);
/* Manus: orange disc with serif M. */
const ManusGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#ff6b00" />
    <text x="12" y="16.8" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontWeight="800" fontSize="13" fill="#ffffff">M</text>
  </svg>
);

export const PLATFORM_GLYPHS = [
  { key: "tiktok", label: "TikTok", Glyph: TikTokGlyph },
  { key: "instagram", label: "Instagram", Glyph: InstagramGlyph },
  { key: "youtube", label: "YouTube", Glyph: YoutubeGlyph },
  { key: "claude", label: "Claude", Glyph: ClaudeGlyph },
  { key: "chatgpt", label: "ChatGPT", Glyph: ChatGPTGlyph },
  { key: "manus", label: "Manus", Glyph: ManusGlyph },
];

/* Look up a glyph by key for easy iteration in renderers. */
export const PLATFORM_GLYPH_MAP = PLATFORM_GLYPHS.reduce((acc, g) => {
  acc[g.key] = g;
  return acc;
}, {});

/* Pricing card section structure. Each entry renders as one collapsible
   bucket in the pricing card; features inside render as individual rows
   with check/dash indicators based on `tiers`. Per-feature `platforms`
   array shows brand glyphs on the right of the row. `onlyForTiers` hides
   the entire bucket on tiers not in the list (used for the Lifetime-only
   Direct Access bucket). */
export const PRICING_CATEGORIES = [
  {
    key: "transcripts",
    label: "Transcripts",
    icon: "transcripts",
    intro: "Time-stamped transcripts from any TikTok, Reel, or YouTube video.",
    features: [
      {
        name: "Individual videos",
        tooltip: "Paste any TikTok, Instagram Reel, or YouTube URL and TokScript returns a clean, time-stamped transcript in seconds.",
        tiers: ["free", "monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Bulk videos",
        tooltip: "Drop in up to 50 URLs at once and TokScript transcribes them all in a single batch — paste once, get everything back together.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "TikTok profiles",
        tooltip: "Pull a creator's whole TikTok profile, every video they've posted, or any saved collection, all from a single link.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok"],
      },
      {
        name: "Instagram profiles",
        tooltip: "Pull every Reel from any Instagram creator's profile in one batch — great for competitor research and trend analysis.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["instagram"],
      },
      {
        name: "YouTube channels",
        tooltip: "Pull YouTube Shorts, full-length videos and podcasts, or entire playlists from any channel — yours or a competitor's.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["youtube"],
      },
      {
        name: "Translations",
        tooltip: "Every transcript can be translated into 50+ languages. Perfect for studying viral content across markets or producing localized versions yourself.",
        tiers: ["free", "monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "mcp",
    label: "MCP Access",
    icon: "mcp",
    intro: "Add TikTok, Instagram, & YouTube directly inside your AI chat.",
    features: [
      {
        name: "Claude",
        tooltip: "Use TokScript inside Claude. Paste any video URL and TokScript returns transcripts, downloads, creator data, and more — without leaving the chat.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["claude"],
      },
      {
        name: "ChatGPT",
        tooltip: "Use TokScript inside ChatGPT via the MCP connector. All 28 TokScript actions available as native tool calls.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["chatgpt"],
      },
      {
        name: "Manus",
        tooltip: "Use TokScript inside Manus AI for autonomous agent workflows. Manus can transcribe, research, and analyze on its own.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["manus"],
      },
    ],
  },
  {
    key: "collections",
    label: "Collections & Playlists",
    icon: "collections",
    intro: "Import full profiles and playlists, up to 3,000 videos per link.",
    features: [
      {
        name: "TikTok Collections",
        tooltip: "Save TikToks into a TikTok Collection, then paste the collection link. TokScript extracts every video in one shot.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok"],
      },
      {
        name: "YouTube Playlists",
        tooltip: "Drop in a YouTube playlist URL and TokScript pulls every video. Works on Shorts playlists and long-form video playlists alike.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["youtube"],
      },
      {
        name: "Instagram Profiles",
        tooltip: "Pull every Reel from any Instagram profile in a single batch, up to 3,000 videos per import.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["instagram"],
      },
      {
        name: "Up to 3,000 videos",
        tooltip: "Each import can process up to 3,000 videos at once. Run multiple imports if you need more — there's no monthly cap.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "chrome",
    label: "Chrome Extension",
    icon: "chrome",
    intro: "Copy, download, and export transcripts from the video page.",
    features: [
      {
        name: "1-click copy transcript",
        tooltip: "Click once and the full transcript is copied to your clipboard, ready to paste anywhere.",
        tiers: ["free", "monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "1-click download transcript",
        tooltip: "Click once and the transcript downloads as a text file to your device.",
        tiers: ["free", "monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Sort & analyze profile data",
        tooltip: "View a creator's videos sorted by performance and surface their top hooks, formats, and posting cadence.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Export full profile data",
        tooltip: "Send a creator's full profile data to your TokScript dashboard for later research.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Bulk export selected videos",
        tooltip: "Multi-select videos on a creator's profile and export all of them at once — transcripts, metadata, the works.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Bulk import social links",
        tooltip: "Paste a list of TikTok, Instagram, or YouTube links and the extension queues them all for processing.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "download",
    label: "Download Media",
    icon: "download",
    intro: "Save HD video, images, audio, transcript, and caption files.",
    features: [
      {
        name: "Download HD Video",
        tooltip: "Original-quality MP4 file with no watermark stamped on it — perfect for repurposing, archiving, or sharing.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Download HD Images",
        tooltip: "Full-resolution thumbnail / cover image exactly as the platform displays it. Useful for re-uploads, mood boards, and design references.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Download Audio",
        tooltip: "Audio extracted from the video file. Useful for podcast clipping, music sampling, or transcription workflows.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Download Transcript",
        tooltip: "The transcript exported as a clean text file — no timestamps, no formatting, just the words.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Download Caption",
        tooltip: "The original caption the creator wrote — useful for hook analysis, CTA studies, and copy benchmarking.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Download Engagement Data",
        tooltip: "Views, likes, comments, and shares captured at the moment of the pull. Use it for benchmarking, trend tracking, or competitor research.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "library",
    label: "Cloud Library",
    intro: "Every transcript and video, searchable and synced across devices.",
    features: [
      {
        name: "Cloud-synced dashboard",
        tooltip: "Your library lives in the cloud. Log in anywhere — web, Chrome, desktop, mobile — and it's already there.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Library search",
        tooltip: "Find any transcript, caption, or video by keyword, creator handle, or date — full-text search across everything you've ever pulled.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Bookmarks",
        tooltip: "Star any video to flag it for later. Bookmarks are searchable separately and synced across devices.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "History",
        tooltip: "Every URL you've ever processed stays in your history. Re-export, re-transcribe, or jump back to it any time.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Cross-device sync",
        tooltip: "Web, Chrome extension, desktop app, and mobile app all stay perfectly in sync in real time.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "exports",
    label: "AI Exports",
    intro: "Structured exports of caption, engagement, and transcript per video.",
    features: [
      {
        name: "Per-video bulk export",
        tooltip: "Each video in your batch gets its own clean file containing transcript, caption, engagement, and metadata.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Combined master file",
        tooltip: "Everything from a batch combined into a single file. Easy to feed into LLMs or load into a database.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "AI-ready video data",
        tooltip: "Caption + engagement + transcript bundled per video in a structured format that loads cleanly into any AI workflow.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "CSV, TXT, JSON formats",
        tooltip: "Choose CSV, TXT, or JSON depending on what your stack needs. Pick once or switch between exports.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "agents",
    label: "Viral AI Agents",
    intro: "Three GPTs that generate hooks, scripts, and viral breakdowns.",
    features: [
      {
        name: "Viral Hook Generator",
        tooltip: "Paste any transcript and the agent returns 20+ proven viral hooks reverse-engineered from the video's structure.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Viral Script Writer",
        tooltip: "Rewrite any viral video as a script in your own niche, voice, and style — while keeping the structural beats that made the original work.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Virality Explainer",
        tooltip: "Get a structural breakdown of exactly why a specific video popped — hook, pacing, retention beats, CTAs, all called out.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Unlimited runs",
        tooltip: "Run every agent as many times as you want. No per-agent caps, no token throttling, no monthly limits.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "api",
    label: "API Access",
    intro: "Every TokScript action as a REST endpoint for scripts and agents.",
    features: [
      {
        name: "REST endpoints",
        tooltip: "Every TokScript action exposed as a clean HTTPS endpoint. Auth via API key, predictable URL structure.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "JSON responses",
        tooltip: "Structured JSON payloads — easy to parse with any HTTP client in any language.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Built for automation",
        tooltip: "Plug into n8n, Zapier, Make, custom scripts, or your own agent stack. TokScript is automation-first.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
      {
        name: "Same 28 actions as MCP",
        tooltip: "Every MCP tool is also a REST endpoint. Use either depending on whether you're building in chat or in code.",
        tiers: ["monthly", "annual", "lifetime"],
        platforms: ["tiktok", "instagram", "youtube"],
      },
    ],
  },
  {
    key: "direct",
    label: "Direct Access",
    intro: "Direct WhatsApp line to the TokScript team, priority support.",
    /* Bucket hidden entirely for tiers not in this list. The other 9 buckets
       render on every tier (with disabled rows for inaccessible items). */
    onlyForTiers: ["lifetime"],
    features: [
      {
        name: "Direct access via WhatsApp",
        tooltip: "Skip the support ticket queue. WhatsApp the TokScript team directly for any question, request, or bug.",
        tiers: ["lifetime"],
      },
      {
        name: "Priority support",
        tooltip: "Lifetime members get bumped to the top of the queue — most messages get a reply within minutes during work hours.",
        tiers: ["lifetime"],
      },
      {
        name: "Early access to new features",
        tooltip: "Lifetime members get every new feature, agent, integration, and tool before anyone else, plus they're included at no extra cost.",
        tiers: ["lifetime"],
      },
      {
        name: "Lifetime updates",
        tooltip: "Pay once. You get every TokScript update we ever ship. No annual renewal, no version lock-in.",
        tiers: ["lifetime"],
      },
    ],
  },
];

export default PRICING_CATEGORIES;
