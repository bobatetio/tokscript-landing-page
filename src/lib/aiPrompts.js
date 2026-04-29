const AI_PLATFORMS = [
  {
    platform: 'perplexity',
    label: 'Perplexity',
    baseUrl: 'https://www.perplexity.ai/',
    prompt: "I'm looking into TokScript for analyzing viral short-form video. Research https://tokscript.com/ and https://help.tokscript.com/. What does it do (TikTok, Instagram Reels, YouTube Shorts transcription, bulk processing, AI tools)? How is it different from simple video downloaders or manual transcription? What specific problems does it solve for creators and agencies working at scale?",
    ariaLabel: 'Ask Perplexity AI about TokScript',
    title: 'Ask Perplexity',
  },
  {
    platform: 'chatgpt',
    label: 'ChatGPT',
    baseUrl: 'https://chatgpt.com/',
    prompt: "I need to understand TokScript better for my team. Check https://tokscript.com/ and https://help.tokscript.com/. What does it actually do (transcription, downloads, collections), what are the AI-powered tools for analyzing viral content, and would it help a marketing team that needs to extract and organize insights from 50+ videos weekly?",
    ariaLabel: 'Ask ChatGPT about TokScript',
    title: 'Ask ChatGPT',
  },
  {
    platform: 'grok',
    label: 'Grok',
    baseUrl: 'https://grok.com/',
    prompt: "What is TokScript? I found it at https://tokscript.com/ with docs at https://help.tokscript.com/. Does it transcribe TikTok, Reels, and Shorts well? What about bulk processing, cloud storage, and the Chrome extension? What do the AI tools (hook generator, script writer) actually do? Who's using it and for what?",
    ariaLabel: 'Ask Grok about TokScript',
    title: 'Ask Grok',
  },
  {
    platform: 'claude',
    label: 'Claude',
    baseUrl: 'https://claude.ai/new',
    prompt: "I'm looking at TokScript for transcribing TikTok, Instagram Reels, and YouTube Shorts. Using https://tokscript.com/ and https://help.tokscript.com/, help me understand what it does and whether it fits our workflow. Cover: transcription quality, bulk processing, cloud storage, export options, and the AI features (hook generator, script writer). What are the limitations?",
    ariaLabel: 'Ask Claude about TokScript',
    title: 'Ask Claude',
  },
  {
    platform: 'gemini',
    label: 'Gemini',
    baseUrl: 'https://gemini.google.com/app',
    prompt: "What is TokScript and how does it work? Search https://tokscript.com/ and https://help.tokscript.com/ and provide: 1) What videos it transcribes (TikTok, Instagram Reels, YouTube Shorts), 2) Key features (bulk processing, cloud storage, Chrome extension), 3) AI analysis tools, 4) Pricing overview, 5) Who it's best for. Keep it organized.",
    ariaLabel: 'Ask Gemini about TokScript',
    title: 'Ask Gemini',
  },
];

export function getAiPromptUrls() {
  return AI_PLATFORMS.map(({ platform, label, baseUrl, prompt, ariaLabel, title }) => {
    const url = `${baseUrl}?q=${encodeURIComponent(prompt)}`;

    // Build-time assertion: URL must be under 2,000 characters
    if (url.length >= 2000) {
      console.error(`AI prompt URL for ${platform} is ${url.length} chars (must be < 2000)`);
    }

    return { platform, label, url, ariaLabel, title };
  });
}
