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
/* Claude: official Anthropic starburst mark (cream) on a coral disc. The
   inner path is the canonical Claude logo geometry, sized to fit inside a
   24×24 viewBox with the disc filling the bounds. */
const ClaudeGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#d97757" />
    <g transform="translate(4 4) scale(0.667)" fill="#faf3e8">
      <path d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z" />
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
    /* Custom PNG icon overrides the default lucide bucket icon. Resolved
       against NEXT_PUBLIC_BASE_PATH in the renderer so static-export builds
       (gh-pages) resolve to /tokscript-landing-page/figma-rows/... */
    iconImage: "/figma-rows/Transcript.png",
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
    iconImage: "/figma-rows/Mcp.png",
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
    iconImage: "/figma-rows/collections%20and%20playlists.png",
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
    iconImage: "/figma-rows/Chrome.png",
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
    iconImage: "/figma-rows/Download.png",
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
    iconImage: "/figma-rows/Cloud.png",
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
    iconImage: "/figma-rows/AI%20Downloads.png",
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
    iconImage: "/figma-rows/AI%20Agents.png",
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
    iconImage: "/figma-rows/API%20Access.png",
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
