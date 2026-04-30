export const dynamic = "force-static";

export default function sitemap() {
  const baseUrl = "https://tokscript.com";

  return [
    // Homepage
    { url: `${baseUrl}/`, lastModified: '2026-03-07' },
    // Language pages
    { url: `${baseUrl}/br`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/es`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/zh`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/fr`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/hi`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/ar`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/de`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/ja`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/ko`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/ru`, lastModified: '2026-03-13' },
    { url: `${baseUrl}/tr`, lastModified: '2026-03-13' },
    // Core product pages
    { url: `${baseUrl}/mcp`, lastModified: '2026-03-27' },
    { url: `${baseUrl}/pricing`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/instagram-transcript-generator`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/youtube-transcript-generator`, lastModified: '2026-03-07' },
    // Features hub + all sub-pages
    { url: `${baseUrl}/features`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/transcript-generator`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/bulk-import`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/collection-import`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/hd-downloads`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/cloud-storage`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/quick-download`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/chrome-extension`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/team`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/translations`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/features/ai-agents`, lastModified: '2026-03-07' },
    // Stable informational pages
    { url: `${baseUrl}/affiliate`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/api`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/integration`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/contact`, lastModified: '2026-03-07' },
    { url: `${baseUrl}/about-us`, lastModified: '2026-03-07' },
    // Legal pages
    // { url: `${baseUrl}/legal`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/terms`, lastModified: '2026-03-07' },
    // { url: `${baseUrl}/privacy`, lastModified: '2026-03-07' },
  ];
}
