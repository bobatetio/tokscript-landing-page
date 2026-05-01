export const PLATFORM_COPY = {
  tiktok: {
    accentClass: "platform-tiktok",
    heroPill: "AI Powered",
    heroH1: "TikTok Transcript Generator",
    heroSub: "Turn speech into text for any TikTok, Reels, and Shorts video",
    inputPlaceholder: "Paste up to 50 video links here (or tiktok collection)",
    bottomCopy:
      "Download up to 50 videos (any platform) at the same time and entire TikTok collections",
    statsCopy: "41,000+ users have processed more than 2,600,000 videos so far",
    pricingDailyFreeLine: "5 transcripts per day",

    bulk: {
      body: "Bulk import up to 50 TikTok, Instagram, or YouTube Shorts links at once to quickly download transcripts in bulk.",
      bullets: [
        "Bulk import up to 50 video links",
        "TikTok, Instagram, and YouTube Shorts support",
        "Bulk export all transcripts at once",
        "Individual or batch processing options",
      ],
    },
    quickUrl: {
      body: "Add 'tokscript.com/' before any TikTok URL in your browser bar. Hit enter. Transcript ready.",
      bullets: [
        "Works on any TikTok URL",
        "No login required",
        "Runs from your address bar",
        "Transcript ready in seconds",
      ],
    },
    agents: {
      hook: "Paste any TikTok transcript → Get 20+ proven hooks",
      script: "Turn any viral TikTok into YOUR script",
      explainer: "See exactly WHY TikToks blow up",
    },
    who: {
      creators:
        "Generate transcripts from your own TikToks to repurpose into blog posts, newsletters, captions, and scripts. Feed transcripts into AI to speed up your full content workflow.",
      researchers:
        "Convert TikToks, tutorials, and educational content into searchable text. Build a reference library, create study notes, or analyze what top creators are saying.",
      marketers:
        "Studying competitor TikToks or analyzing ad scripts? Transcribe any TikTok ad, extract the copy, and inform your own creative strategy in seconds.",
      ai:
        "Pull any TikTok transcript and feed it directly to ChatGPT, Claude, Gemini, or any AI workflow. The fastest way to get clean TikTok text into any AI pipeline.",
      ugc:
        "Stop replaying TikToks trying to catch every line. Download the transcript, read it in full, and rewrite it in your voice with our AI agents.",
    },
  },

  instagram: {
    accentClass: "platform-instagram",
    heroPill: "AI Powered",
    heroH1: "Instagram Transcript Generator",
    heroSub: "Turn speech into text for any Instagram Reel, TikTok, or Short",
    inputPlaceholder: "Paste up to 50 Instagram Reels links here (or any Reels URL)",
    bottomCopy:
      "Download up to 50 Reels (any platform) at the same time and entire Instagram libraries",
    statsCopy: "41,000+ creators have transcribed more than 2,600,000 Reels so far",
    pricingDailyFreeLine: "5 Instagram Reels transcripts per day",

    bulk: {
      body: "Bulk import up to 50 Instagram, TikTok, or YouTube Shorts links at once to quickly download transcripts in bulk.",
      bullets: [
        "Bulk import up to 50 video links",
        "Instagram, TikTok, and YouTube Shorts support",
        "Bulk export all transcripts at once",
        "Individual or batch processing options",
      ],
    },
    quickUrl: {
      body: "Add 'tokscript.com/' before any Instagram Reel URL in your browser bar. Hit enter. Transcript ready.",
      bullets: [
        "Works on any Reel URL",
        "No login required",
        "Runs from your address bar",
        "Transcript ready in seconds",
      ],
    },
    agents: {
      hook: "Paste any Reel transcript → Get 20+ proven hooks",
      script: "Turn any viral Reel into YOUR script",
      explainer: "See exactly WHY Reels blow up",
    },
    who: {
      creators:
        "Generate transcripts from your own Reels to repurpose into blog posts, newsletters, captions, and scripts. Feed transcripts into AI to speed up your full content workflow.",
      researchers:
        "Convert Reels, tutorials, and educational content into searchable text. Build a reference library, create study notes, or analyze what top creators are saying.",
      marketers:
        "Studying competitor Reels or analyzing ad scripts? Transcribe any Reel ad, extract the copy, and inform your own creative strategy in seconds.",
      ai:
        "Pull any Reel transcript and feed it directly to ChatGPT, Claude, Gemini, or any AI workflow. The fastest way to get clean Reel text into any AI pipeline.",
      ugc:
        "Stop replaying Reels trying to catch every line. Download the transcript, read it in full, and rewrite it in your voice with our AI agents.",
    },
  },

  youtube: {
    accentClass: "platform-youtube",
    heroPill: "AI Powered",
    heroH1: "YouTube Transcript Generator",
    heroSub: "Turn speech into text for any YouTube Short, TikTok, or Reel",
    inputPlaceholder: "Paste up to 50 YouTube Shorts links here (or any Short URL)",
    bottomCopy:
      "Download up to 50 Shorts (any platform) at the same time and entire YouTube channels",
    statsCopy: "41,000+ creators have transcribed more than 2,600,000 Shorts so far",
    pricingDailyFreeLine: "5 YouTube Shorts transcripts per day",

    bulk: {
      body: "Bulk import up to 50 YouTube, TikTok, or Instagram Reels links at once to quickly download transcripts in bulk.",
      bullets: [
        "Bulk import up to 50 video links",
        "YouTube, TikTok, and Instagram Reels support",
        "Bulk export all transcripts at once",
        "Individual or batch processing options",
      ],
    },
    quickUrl: {
      body: "Add 'tokscript.com/' before any YouTube URL in your browser bar. Hit enter. Transcript ready.",
      bullets: [
        "Works on any YouTube URL",
        "No login required",
        "Runs from your address bar",
        "Transcript ready in seconds",
      ],
    },
    agents: {
      hook: "Paste any Shorts transcript → Get 20+ proven hooks",
      script: "Turn any viral Short into YOUR script",
      explainer: "See exactly WHY Shorts blow up",
    },
    who: {
      creators:
        "Generate transcripts from your own YouTube videos to repurpose into blog posts, newsletters, captions, and scripts. Feed transcripts into AI to speed up your full content workflow.",
      researchers:
        "Convert lectures, tutorials, and documentaries into searchable text. Build a reference library, create study notes, or analyze what top creators are saying.",
      marketers:
        "Studying competitor Shorts or analyzing ad scripts? Transcribe any YouTube ad, extract the copy, and inform your own creative strategy in seconds.",
      ai:
        "Pull any YouTube transcript and feed it directly to ChatGPT, Claude, Gemini, or any AI workflow. The fastest way to get clean YouTube text into any AI pipeline.",
      ugc:
        "Stop replaying Shorts trying to catch every line. Download the transcript, read it in full, and rewrite it in your voice with our AI agents.",
    },
  },
};

export function getPlatformCopy(platform = "tiktok") {
  return PLATFORM_COPY[platform] || PLATFORM_COPY.tiktok;
}
