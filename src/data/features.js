// Centralized feature data for dropdown menu and feature pages
export const features = [
  {
    slug: "transcript-generator",
    path: "/features/transcript-generator",
    title: "Transcript Generator",
    shortDescription: "Video to transcript in seconds",
    color: "#00B8B2", // cyan
  },
  {
    slug: "bulk-import",
    path: "/features/bulk-import",
    title: "Bulk Import",
    shortDescription: "Process 100+ videos at once",
    color: "#f97316", // orange
  },
  {
    slug: "collection-import",
    path: "/features/collection-import",
    title: "Collection Import",
    shortDescription: "One link imports entire profiles",
    color: "#a855f7", // purple
  },
  {
    slug: "hd-downloads",
    path: "/features/hd-downloads",
    title: "HD Downloads",
    shortDescription: "No watermark, original quality",
    color: "#ec4899", // pink
  },
  {
    slug: "cloud-storage",
    path: "/features/cloud-storage",
    title: "Cloud Storage",
    shortDescription: "Save & search all your transcripts",
    color: "#22c55e", // green
  },
  {
    slug: "quick-download",
    path: "/features/quick-download",
    title: "Quick Download",
    shortDescription: "Try free, no account needed",
    color: "#eab308", // yellow
  },
  {
    slug: "chrome-extension",
    path: "/features/chrome-extension",
    title: "Chrome Extension",
    shortDescription: "Extract without leaving TikTok",
    color: "#3b82f6", // blue
  },
  {
    slug: "team-collaboration",
    path: "/features/team",
    title: "Team Collaboration",
    shortDescription: "One library for your whole team",
    color: "#00b8b2", // teal
  },
  {
    slug: "translations",
    path: "/features/translations",
    title: "Translate Transcripts",
    shortDescription: "Transcribe to any native language",
    color: "#3a3a3a", // indigo
  },
  {
    slug: "ai-agents",
    path: "/features/ai-agents",
    title: "AI Agents",
    shortDescription: "Hooks, scripts & frameworks on demand",
    color: "#f43f5e", // rose
  },
];

export const getFeatureBySlug = (slug) => features.find((f) => f.slug === slug);
