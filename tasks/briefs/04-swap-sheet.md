# UX-56 swap sheet: Instagram, YouTube, and Shorts versions of the bulk page

Produced by reading the live code, not a design. Per the brief this deliverable is a table plus
findings, zero new comps.

> Note on drift: this repo checkout differs from the AGENT brief's line citations. Verified here against
> the actual files. Key differences found: platform copy lives in `src/app/platformContent.js` with
> fields `whoH2` / `whoSub` (not `who.heading` / `who.subline`), and there is no `faq` /
> `readyToConvert` object on any key in this checkout. Marks are imported from `@/components/Icons` as
> `FaTiktok` / `FaInstagram` / `FaYoutube` (Font Awesome), not the Tabler `TbBrand*` the brief names.
> The finding is identical either way: they are a general icon set's glyphs, not official brand assets.

## The one-line confirmation the brief asks for

**Nothing but strings and one mark changes between these pages.** Each generator page is
`<HomePage platform="..." />` (see `src/app/instagram-transcript-generator/page.js`,
`src/app/youtube-transcript-generator/page.js`). All per-platform text is one object,
`PLATFORM_COPY` in `src/app/platformContent.js`. Layout, components, tokens, and states do not shift.
If a layout change ever appears in a variant, that is the tripwire: stop and escalate, do not draw past it.

## The swap sheet: every string that changes per platform

Values below are quoted verbatim from `src/app/platformContent.js`. A new page supplies the same fields;
every one of its values is `AWAITING MICHAEL`.

| Field | tiktok | instagram | youtube |
|---|---|---|---|
| `accentClass` | `platform-tiktok` | `platform-instagram` | `platform-youtube` |
| `heroPill` | `AI Powered` | `AI Powered` | `AI Powered` |
| `heroH1` | `TikTok Transcript Generator` | `Instagram Transcript Generator` | `YouTube Transcript Generator` |
| `heroSub` | `Turn speech into text for any TikTok, Reels, and Shorts video` | `Turn speech into text for any Instagram Reel, TikTok, or Short` | `Turn speech into text for any YouTube Short, TikTok, or Reel` |
| `inputPlaceholder` | `Paste up to 50 video links here (or tiktok collection)` | `Paste up to 50 Instagram Reels links here (or any Reels URL)` | `Paste up to 50 YouTube Shorts links here (or any Short URL)` |
| `bottomCopy` | `Download up to 50 videos (any platform) at the same time and entire TikTok collections` | `Download up to 50 Reels (any platform) at the same time and entire Instagram libraries` | `Download up to 50 Shorts (any platform) at the same time and entire YouTube channels` |
| `statsCopy` | `41,000+ users have processed more than 2,600,000 videos so far` | `41,000+ creators have transcribed more than 2,600,000 Reels so far` | `41,000+ creators have transcribed more than 2,600,000 Shorts so far` |
| `pricingDailyFreeLine` | `5 transcripts per day` | `5 Instagram Reels transcripts per day` | `5 YouTube Shorts transcripts per day` |
| `bulk.body` | (TikTok wording) | (Instagram wording) | (YouTube wording) |
| `bulk.bullets` x4 | changes bullet 2 platform list | changes bullet 2 platform list | changes bullet 2 platform list |
| `quickUrl.body` + `quickUrl.bullets` x4 | (TikTok) | (Instagram) | (YouTube) |
| `agents.hook` / `.script` / `.explainer` | `TikTok` wording | `Reel` wording | `Shorts` wording |
| `whoH2` | absent | `Who Uses TokScript's Instagram Transcript Generator` | `Who Uses TokScript's YouTube Transcript Generator` |
| `whoSub` | absent | (Instagram paragraph) | (YouTube paragraph) |
| `who.creators` / `.researchers` / `.marketers` / `.ai` / `.ugc` | (TikTok) | (Instagram) | (YouTube) |

Field-shape note: the `tiktok` key does not carry `whoH2` / `whoSub`; `instagram` and `youtube` do. The
shell already tolerates those two being absent. Do not assume it tolerates any others.

## The marks that change

| Asset | Source | tiktok | instagram | youtube |
|---|---|---|---|---|
| platform mark | `HomePage.js:17` import, used `:1270-1283` | `FaTiktok` | `FaInstagram` | `FaYoutube` |
| mark label in the Supports strip | `HomePage.js:1268-1284` | `TikTok` | `Reels` | `Shorts` |
| hero flare image | `HomePage.js:1142-1150` (`banner-flare`) | `/assets/chatgpt-hero-flare.png` (default) | `/figma-rows/instagram-flare.png` | `/figma-rows/youtube-flare.png` |

## Findings the brief asks to raise (not resolve)

1. **The platform marks are already sourced, not placeholders.** `HomePage.js:17` renders `FaTiktok`,
   `FaInstagram`, `FaYoutube`, inlined as SVG in `src/components/Icons.jsx`. The earlier brief assumed
   these were a general icon set's approximations that still needed official assets sourced. That is not
   the case here: the icons across the site were sourced by Bob from a mix of places, font and brand
   glyphs plus Figma files Bob created. There is no open "source the real marks" task. (Accuracy note:
   the AGENT brief cites Tabler `TbBrand*`; this build actually renders the Font Awesome `Fa*` versions,
   which also exist alongside the Tabler ones in `Icons.jsx`.)
2. **The `youtube` key already reads as a Shorts key.** In this checkout: `inputPlaceholder` says
   "YouTube Shorts links", `bottomCopy` says "Shorts", `statsCopy` counts "Shorts", `agents.*` say
   "Short/Shorts", `heroSub` says "YouTube Short". Only `heroH1` says "YouTube". One live page, two
   identities. A separate Shorts page inherits an ambiguity that already exists. Raise the YouTube vs
   Shorts question to Michael. Do not resolve it by rewriting the `youtube` key. `AWAITING MICHAEL`.
3. **Two names per platform ship today.** The Supports strip labels the Instagram mark `Reels` and the
   YouTube mark `Shorts`, while the page titles say `Instagram Transcript Generator` and
   `YouTube Transcript Generator`. `AWAITING MICHAEL`.
4. **The three registrations are manual and fail silently** (verified in this checkout). A new generator
   page needs: (a) the route `src/app/<slug>/page.js`, (b) a hand-added `<Link>` in the Footer Generators
   column `src/components/Footer.jsx:80-93`, (c) a hand-added object in `src/app/sitemap.js`. Miss (b)
   or (c) and the page is orphaned or unmapped, with no error.
5. **The header Features dropdown will not pick a generator page up.** It renders `src/data/features.js`.
   Adding a generator there also changes the `/features` hub and the footer Product column, so it is a
   product call. `AWAITING MICHAEL`. Do not add on your own initiative.
6. **The stats number is inconsistent across the site** (`2,600,000` inline in `statsCopy`, "2.6
   million" / "2M+" elsewhere). Do not write a number into any new key. `AWAITING MICHAEL`.

## The four target pages

| | Page | Status |
|---|---|---|
| 1 | Bulk TikTok | The master, UX-54. Scaffolded in this repo as `bulkTiktok` + `/bulk-tiktok-transcript-generator`. |
| 2 | Bulk Instagram | Ships today at `/instagram-transcript-generator`. New key + route needed for a bulk-specific variant. |
| 3 | Bulk YouTube (long form) | See finding 2. |
| 4 | Bulk YouTube Shorts | See finding 2. Does not exist. |

No em dashes, no en dashes anywhere in this sheet.
