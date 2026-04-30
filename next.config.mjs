/** @type {import('next').NextConfig} */
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
    experimental: {
        optimizePackageImports: ['lucide-react', 'framer-motion', 'react-bootstrap'],
    },
    compiler: {
        removeConsole: {
            exclude: ['error', 'warn'],
        },
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: isStaticExport ? '/tokscript-landing-page' : '',
    },
    ...(isStaticExport
        ? {
              output: 'export',
              trailingSlash: true,
              basePath: '/tokscript-landing-page',
              assetPrefix: '/tokscript-landing-page',
              images: { unoptimized: true },
          }
        : {
              async redirects() {
                  return [
                      { source: '/instagram-reels', destination: '/instagram-transcript-generator', permanent: true },
                      { source: '/instagram-reels-transcript', destination: '/instagram-transcript-generator', permanent: true },
                      { source: '/youtube-shorts', destination: '/youtube-transcript-generator', permanent: true },
                      { source: '/youtube-shorts-transcript', destination: '/youtube-transcript-generator', permanent: true },
                      { source: '/tiktok-transcript-generator', destination: '/', permanent: true },
                      { source: '/bulk-tiktok-transcript', destination: '/features/bulk-import', permanent: true },
                      { source: '/tiktok-collection-downloader', destination: '/features/collection-import', permanent: true },
                      { source: '/tiktok-video-downloader', destination: '/features/hd-downloads', permanent: true },
                  ];
              },
              async headers() {
                  return [
                      { source: '/llms.txt', headers: [
                          { key: 'X-Robots-Tag', value: 'noindex' },
                          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
                      ]},
                      { source: '/llms-full.txt', headers: [
                          { key: 'X-Robots-Tag', value: 'noindex' },
                          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
                      ]},
                      { source: '/(.*)\\.(svg|png|jpg|jpeg|webp|avif|ico|gif)', headers: [
                          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                      ]},
                  ];
              },
              images: {
                  formats: ['image/avif', 'image/webp'],
                  remotePatterns: [
                      { protocol: 'https', hostname: '**' },
                      { protocol: 'http', hostname: '**' },
                  ],
              },
          }),
};

export default nextConfig;
