# AGENT BRIEF: Instagram, YouTube and Shorts

> **You are assisting Bob, a UX designer, on the platform variants.** Read this whole file before you
> act.
>
> **Your job:** produce and then apply a swap sheet. Per platform, exactly which strings and which
> marks change, and which file holds each. **This deliverable is a data change. It is not a design
> change and it is not a component change.**
>
> **The single most important fact, and everything below depends on it:** the Instagram and YouTube
> generator pages are **not separate designs and not separate components.** Each is a thin route file
> rendering `<HomePage platform="..." />`. All platform copy lives in one object,
> `PLATFORM_COPY` in `src/app/platformContent.js`. Verify in ten seconds:
> `src/app/instagram-transcript-generator/page.js:80` and
> `src/app/youtube-transcript-generator/page.js:81`.
>
> **What you may change:** keys inside `PLATFORM_COPY` (`src/app/platformContent.js`), new route files
> under `src/app/`, the Generators column in `src/components/Footer.jsx`, the array in
> `src/app/sitemap.js`.
>
> **What you may NOT change:** `src/app/HomePage.js` layout, `src/components/BulkTranscriptResult.jsx`,
> and any existing value inside the `tiktok`, `instagram` or `youtube` keys. **If this deliverable
> produces a layout diff, it has failed.** Stop and tell Bob.
>
> **What to ask Bob rather than decide:** nothing about layout, because nothing about layout changes.
> If a layout question arises, that is the tripwire in his brief. Escalate it, do not answer it.
>
> **What to never invent:** copy, capitalisation, numbers, and **platform marks**. See section 7,
> trap 1. If a string is not in section 5, it does not exist. Write `AWAITING MICHAEL` and stop.

---

## 1. Current implementation

### The three keys that exist, and the one that does not

`src/app/platformContent.js` exports `PLATFORM_COPY` with **exactly three keys**:

| Key | Lines | Renders at |
|---|---|---|
| `tiktok` | 4 to 50 | `/` , the homepage. `HomePage.js:405` defaults `platform = "tiktok"`. |
| `instagram` | 52 to 108 | `/instagram-transcript-generator` |
| `youtube` | 110 to 166 | `/youtube-transcript-generator` |

**There is no `shorts` key.** A fourth page requires a fourth key. There is no bulk key either. See
deliverable 03.

`getPlatformCopy(platform)` at line 169 returns `PLATFORM_COPY[platform] || PLATFORM_COPY.tiktok`.
**An unknown key silently renders as TikTok.** It does not throw. Assert on the rendered `h1`, never on
the absence of an error.

### The field shape is NOT uniform across the three keys

This matters, because a swap sheet that assumes uniformity will be wrong.

| Field | `tiktok` | `instagram` | `youtube` |
|---|---|---|---|
| `accentClass` | yes | yes | yes |
| `heroPill` | yes | yes | yes |
| `heroH1` | yes | yes | yes |
| `heroSub` | yes, a string | yes, **JSX** | yes, a string |
| `inputPlaceholder` | yes | yes | yes |
| `bottomCopy` | yes | yes | yes |
| `statsCopy` | yes | yes | yes |
| `pricingDailyFreeLine` | yes | yes | yes |
| `bulk` `{ body, bullets[4] }` | yes | yes | yes |
| `quickUrl` `{ body, bullets[4] }` | yes | yes | yes |
| `agents` `{ hook, script, explainer }` | yes | yes | yes |
| `who` `{ creators, researchers, marketers, ai, ugc }` | yes | yes | yes |
| `who.heading` | **NO** | yes (line 87) | yes (line 145) |
| `who.subline` | **NO** | yes (line 88) | yes (line 146) |
| `faq` `{ title, subline }` | **NO** | yes (100 to 103) | yes (158 to 161) |
| `readyToConvert` `{ heading, sub }` | **NO** | yes (104 to 107) | yes (162 to 165) |

**So the shell already tolerates four missing fields on the TikTok key.** Do not assume it tolerates
any others. Verify the fallback in `HomePage.js` before you omit a field from a new key.

**`heroSub` is not always a string.** `platformContent.js:56`:
`<>Generate accurate transcripts from any Instagram Reel <strong>online</strong> in seconds.</>`.

### The YouTube key is already a Shorts key wearing a YouTube name

**Read this before touching anything, because it is the finding that governs the open question.** Every
one of these was read out of the `youtube` key:

| Field | Line | Value |
|---|---|---|
| `heroH1` | 113 | `YouTube Transcript Generator` |
| `heroSub` | 114 | `Generate a transcript from any YouTube video or Short in seconds.` |
| `inputPlaceholder` | 115 | `Paste up to 50 YouTube Shorts links here (or any Short URL)` |
| `bottomCopy` | 116 to 117 | `Download up to 50 Shorts (any platform) at the same time and entire YouTube channels` |
| `statsCopy` | 118 | interpolates users, then `creators have transcribed more than 2,600,000 Shorts so far` |
| `pricingDailyFreeLine` | 119 | `5 YouTube Shorts transcripts per day` |
| `agents.hook` | 140 | `Paste any Shorts transcript → Get 20+ proven hooks` |
| `readyToConvert.heading` | 163 | `Ready to Convert Your YouTube Short?` |

**The heading says YouTube. Almost everything else says Shorts.** One live page, two identities. So a
separate Shorts page is not introducing an ambiguity, it is inheriting one that already exists.
`AWAITING MICHAEL`, and it is his question 6 in the source of record. **Do not resolve it by editing
the `youtube` key.**

### The marks, and the correction

`src/app/HomePage.js:16`:

```
import { FaBolt, FaChevronDown, TbBrandTiktok, TbBrandInstagram, TbBrandYoutube, HiLanguage } from "@/components/Icons";
```

`TbBrand*` are **Tabler icon glyphs**: a general purpose open source icon set's own interpretation of
each brand, drawn to that set's house style and inheriting the surrounding text colour.

**These are approximations. They are not official brand assets.**

The superseded ticket set, in its draft of this deliverable, states that the site "already displays
official TikTok, Instagram and YouTube marks" and instructs the designer to "reuse those exact ones."
**That statement is false and it is corrected here.** The official assets do not exist in this repo's
supports strip. Somebody has to source them. `AWAITING MICHAEL`.

### The supports strip, `HomePage.js:1283` to `1309`

`div.social-platform-buttons`, containing `span.platform-label` reading `Supports:`, then three
`span.platform-btn`. **The order rotates so the current platform leads.** The labels, verbatim:

| Mark component | Label rendered |
|---|---|
| `TbBrandTiktok` | `TikTok` |
| `TbBrandInstagram` | `Reels` |
| `TbBrandYoutube` | `Shorts` |

**Note the naming inconsistency, which is live today:** the Instagram mark is labelled `Reels`, while
the page it sits on is titled `Instagram Transcript Generator`. The YouTube mark is labelled `Shorts`,
on a page titled `YouTube Transcript Generator`. Two names per platform, already shipping. Source of
record Part 7 does not cover this. `AWAITING MICHAEL`.

### The other per platform asset

`HomePage.js:1159` to `1168`, inside `div.banner-flare`:

| Platform | Image |
|---|---|
| `instagram` | `/figma-rows/instagram-flare.png` |
| `youtube` | `/figma-rows/youtube-flare.png` |
| anything else | `/assets/chatgpt-hero-flare.webp` |

**Its `alt` is the hardcoded string `"ChatGPT hero flare"` for all three.** That is an existing
accessibility bug. **It is not in scope. Do not fix it silently. Report it.**

---

## 2. The wireframe, as structure

**There is no wireframe, because no layout changes.** That is the deliverable's entire premise.

What changes is a data object and a set of registrations.

```
PER NEW PLATFORM PAGE, THREE MANUAL REGISTRATIONS. NONE ARE AUTOMATIC.

1. THE ROUTE
   src/app/<slug>/page.js
   └── metadata + JSON-LD schema + <HomePage platform="<key>" />
   Model: src/app/instagram-transcript-generator/page.js, 87 lines total.
   Wrapper div class mirrors the slug, e.g. div.instagram-transcript-generator (line 79).

2. THE FOOTER LINK, hardcoded, NOT generated
   src/components/Footer.jsx, Generators column, lines 80 to 93
   ├── 80     <span className="footer-col-title">  ... "Generators"
   ├── 82     <Link href="/">                                "TikTok Transcript Generator"
   ├── 85-86  <Link href="/instagram-transcript-generator">  "Instagram Transcript Generator"
   └── 90-91  <Link href="/youtube-transcript-generator">    "YouTube Transcript Generator"
   Labels wrap a translation lookup: {t?.footer?.generators?.<key> || "English fallback"}

3. THE SITEMAP ENTRY, hand written, NOT generated from the route tree
   src/app/sitemap.js
   ├── 14  { url: `${baseUrl}/instagram-transcript-generator`, lastModified: '2026-03-07' }
   └── 15  { url: `${baseUrl}/youtube-transcript-generator`,   lastModified: '2026-03-07' }

AND THE TRAP, WHICH IS NOT A REGISTRATION STEP:
   The header Features dropdown renders src/data/features.js (Header.jsx:56, mapped at :422).
   10 entries. NINE are /features/* paths. features.js:47 is "/chrome-extension".
   A generator page will NOT appear there unless it is added to that array.
   AWAITING MICHAEL. Do not add it to that array on your own initiative: it also drives
   the /features hub page and the footer Product column.
```

Full detail on all three is in `03-AGENT-bulk-tiktok-page.md`, section 2.
**It is not duplicated further here.** One source per fact.

---

## 3. Design tokens and values, as they exist today

**This deliverable introduces no tokens, no colours, no radii, no spacing and no type.** Every page
reuses the shell. There is nothing to define and you must not define anything.

The only per platform visual value that exists:

| Field | `tiktok` | `instagram` | `youtube` |
|---|---|---|---|
| `accentClass` | `platform-tiktok` | `platform-instagram` | `platform-youtube` |

Lines 5, 53 and 111. **Its consumer was not traced.** Before relying on it, confirm where
`accentClass` is applied in `HomePage.js` and what the corresponding rules in `src/App.scss` actually
do. Do not assume it is decorative and do not assume it is load bearing.

**A new page needs a fourth value here.** `AWAITING BOB`, and the honest expectation is that it reuses
an existing one.

---

## 4. States, enumerated

**This deliverable adds no states.** These pages render exactly the states the master page renders.

**The five row states and the four card states belong to `BulkTranscriptResult.jsx` and are enumerated
in exactly one place in this project: the deliverable 01 pair,
`01-BOB-result-card-and-wall.md` and `01-AGENT-result-card-and-wall.md`.** They are deliberately
not repeated here.

The three hero button states (`Scan Video`, `Download`, `Processing...`) are enumerated in exactly one
place: `03-AGENT-bulk-tiktok-page.md`, section 4.

**If you find yourself enumerating a state in this file, you are in the wrong file.**

---

## 5. Copy

### THE SWAP SHEET. Every string that changes, per platform, with the line that holds it.

All values below were read from `src/app/platformContent.js`. Quote them exactly. **Do not rewrite one
of them.** A blank cell means the key does not carry that field.

| Field | `tiktok` | `instagram` | `youtube` |
|---|---|---|---|
| `heroPill` | `AI Powered` (6) | `AI Powered` (54) | `AI Powered` (112) |
| `heroH1` | `TikTok Transcript Generator` (7) | `Instagram Transcript Generator` (55) | `YouTube Transcript Generator` (113) |
| `heroSub` | `Turn speech into text for any TikTok, Reels, and Shorts video` (8) | **JSX** (56) | `Generate a transcript from any YouTube video or Short in seconds.` (114) |
| `inputPlaceholder` | `Paste up to 50 video links here (or tiktok collection)` (9) | `Paste up to 50 Instagram Reels links here (or any Reels URL)` (57) | `Paste up to 50 YouTube Shorts links here (or any Short URL)` (115) |
| `bottomCopy` | `Download up to 50 videos (any platform) at the same time and entire TikTok collections` (10) | `Download up to 50 Reels (any platform) at the same time and entire Instagram libraries` (58) | `Download up to 50 Shorts (any platform) at the same time and entire YouTube channels` (116) |
| `statsCopy` | users, then `have processed more than 2,600,000 videos so far` (12) | creators, then `have transcribed more than 2,600,000 Reels so far` (60) | creators, then `have transcribed more than 2,600,000 Shorts so far` (118) |
| `pricingDailyFreeLine` | `5 transcripts per day` (13) | `5 Instagram Reels transcripts per day` (61) | `5 YouTube Shorts transcripts per day` (119) |
| `bulk.body` | (16) | (64) | (122) |
| `bulk.bullets` | 4 items (17 to 22) | 4 items (65 to 70) | 4 items (123 to 128) |
| `quickUrl.body` | (25) | (73) | (131) |
| `quickUrl.bullets` | 4 items (26 to 31) | 4 items (74 to 79) | 4 items (132 to 137) |
| `agents.hook` | (34) | (82) | (140) |
| `agents.script` | (35) | (83) | (141) |
| `agents.explainer` | (36) | (84) | (142) |
| `who.heading` | absent | (87) | (145) |
| `who.subline` | absent | (88) | (146) |
| `who.creators` | (39) | (89) | (147) |
| `who.researchers` | (41) | (91) | (149) |
| `who.marketers` | (43) | (93) | (151) |
| `who.ai` | (45) | (95) | (153) |
| `who.ugc` | (47) | (97) | (155) |
| `faq.title` | absent | `Instagram Transcript Generator: Frequently Asked Questions` (101) | `YouTube Transcript Generator: Frequently Asked Questions` (159) |
| `faq.subline` | absent | (102) | (160) |
| `readyToConvert.heading` | absent | `Ready to Convert Your First Reel?` (105) | `Ready to Convert Your YouTube Short?` (163) |
| `readyToConvert.sub` | absent | (106) | (164) |

### Assets that change, per platform

| Asset | Holder | `tiktok` | `instagram` | `youtube` |
|---|---|---|---|---|
| the platform mark | `HomePage.js:16`, used at `:1283-1309` | `TbBrandTiktok` | `TbBrandInstagram` | `TbBrandYoutube` |
| the mark's label in the supports strip | `HomePage.js:1283-1309` | `TikTok` | `Reels` | `Shorts` |
| the hero flare image | `HomePage.js:1159-1168` | `/assets/chatgpt-hero-flare.webp` | `/figma-rows/instagram-flare.png` | `/figma-rows/youtube-flare.png` |
| the flare `alt` | `HomePage.js:1166` | `ChatGPT hero flare` | `ChatGPT hero flare` | `ChatGPT hero flare` |
| the route wrapper class | the route file | none | `instagram-transcript-generator` | `youtube-transcript-generator` |
| `accentClass` | `platformContent.js` 5, 53, 111 | `platform-tiktok` | `platform-instagram` | `platform-youtube` |

**The marks in row one are approximations, not official assets.** See section 1 and trap 1.

### Strings that render but are NOT in the source of record's inventory

Source of record Part 3 does not list `AI Powered`, any `heroH1`, any `heroSub`, any `bottomCopy` other
than the TikTok one, any `statsCopy`, any `faq` or `readyToConvert` value. **They ship today, and that
does not make them approved.** They are `AWAITING MICHAEL` for the purposes of any new page. Do not
treat them as free to change and do not treat them as blessed.

### Every new string, for every new page

`AWAITING MICHAEL`. Without exception.

**The number rule.** `statsCopy` hardcodes `2,600,000` inline in all three keys (lines 12, 60, 118),
while `siteConfig.js:15` says `"2.6 million"` and the pricing page says `2M+`. Source of record Part 7,
question 5. **Do not write a number into a new key. Do not harmonise the existing ones.**

**No em dashes. No en dashes.** `LEARNING.md` line 4.

---

## 6. What is new

Per new platform page, precisely this:

1. **One new key in `PLATFORM_COPY`.** Every field `AWAITING MICHAEL`. Match the `instagram` shape,
   which is the fullest.
2. **One new route file**, modelled on `src/app/instagram-transcript-generator/page.js`.
3. **One new `<Link>`** in the Footer Generators column.
4. **One new object** in the `src/app/sitemap.js` array.
5. **Official platform marks**, which **do not exist in this repo today** and must be sourced.
   `AWAITING MICHAEL`.

**What is NOT new, and must not be built, duplicated, redesigned or rebuilt:**

- Any layout. Any component. Any token. Any state. Any spacing.
- `HomePage.js`. `BulkTranscriptResult.jsx`.
- The existing `tiktok`, `instagram` and `youtube` values.

**If your diff contains a layout change, this deliverable has failed.** Stop and escalate.

---

## 7. Constraints

### Must not regress

- `/`, `/instagram-transcript-generator` and `/youtube-transcript-generator` render exactly as they do
  now. **All three share the component you are near.** Prefer changing `platformContent.js` only.
- A typo in a `platform` prop silently falls back to TikTok (`platformContent.js:169`). Assert on the
  `h1`.

### Known traps

**Trap 1. The platform marks on the site are not official.** `HomePage.js:16` imports Tabler brand
glyphs. Deliverable 04's rule is official marks only. **The earlier draft told the designer the
official ones were already on the site. They are not.** Do not ship an approximation because a previous
document said it was fine. Do not redraw, recolour or modify any brand mark to fit the palette.
`AWAITING MICHAEL` on sourcing.

**Trap 2. The YouTube key is already a Shorts key.** See section 1. Splitting it into two pages, or
merging the concept into one, is Michael's call. **Do not resolve it by rewriting the `youtube` key.**

**Trap 3. Instagram is called two things and YouTube is called two things.** The supports strip says
`Reels` and `Shorts`; the page titles say `Instagram` and `YouTube`. Live today. Do not unify them
without asking.

**Trap 4. The three registrations fail silently.** Miss the footer link and the page is orphaned. Miss
the sitemap and it is unlinked from the search map. No error, no warning, no failing build.

**Trap 5. The header Features dropdown will not pick these pages up.** `src/data/features.js` holds 10
entries. Nine are `/features/*`. The tenth, at `features.js:47`, is `/chrome-extension`, so the array is
**not** uniformly `/features/*` and a non `/features` path already renders in that menu. A new page
still does not appear there unless it is added to the array, and adding one also changes the `/features`
hub page and the footer Product column. That makes it a product call. `AWAITING MICHAEL`.

**Trap 6. New footer labels have no translations.** Each label is
`{t?.footer?.generators?.<key> || "English fallback"}`. Per `LEARNING.md`, 11 locales exist. A new
entry falls back to English in all of them. `AWAITING MICHAEL`.

**Trap 7. `heroSub` may be JSX.** `platformContent.js:56`. Anything that measures, truncates or
serialises it must handle both a string and a node.

---

## 8. Acceptance criteria (machine checkable)

**The premise of the deliverable**

- [ ] `git diff` touches **zero** lines in `src/components/BulkTranscriptResult.jsx`.
- [ ] `git diff` touches **zero** lines in `src/App.scss`.
- [ ] `git diff` touches **zero** layout lines in `src/app/HomePage.js`. The only acceptable diff in
      that file is a new branch in the supports strip or the flare map, and only if Michael has
      approved a new platform.
- [ ] **Zero new components.** No new file under `src/components/`.

**Per new page**

- [ ] `PLATFORM_COPY` gains one key, supplying at minimum every field the `tiktok` key supplies.
- [ ] `src/app/<slug>/page.js` exists, is under 100 lines, and its default export returns
      `<HomePage platform="<key>" />`.
- [ ] Rendering the new route produces an `h1` equal to the new `heroH1`, and **not** equal to
      `TikTok Transcript Generator`. This catches the silent fallback.
- [ ] `src/components/Footer.jsx` Generators column renders one `<Link>` per generator page.
- [ ] `src/app/sitemap.js` returns one object per generator page.
- [ ] `src/data/features.js` is **byte for byte unchanged**: still exactly 10 entries, nine `/features/*`
      paths and `/chrome-extension` at line 47. None of the new pages was added to it.

**No regression**

- [ ] The three existing `h1` values are unchanged: `TikTok Transcript Generator`,
      `Instagram Transcript Generator`, `YouTube Transcript Generator`.
- [ ] Every existing value inside the `tiktok`, `instagram` and `youtube` keys is byte for byte
      unchanged.

**Copy and marks**

- [ ] A search for the em dash (U+2014) and the en dash (U+2013) across every file touched returns
      zero hits.
- [ ] Every string in a new key is supplied by Michael. **Zero authored strings. Zero invented
      numbers.**
- [ ] No new key contains `2,600,000`, `2.6 million`, `2M`, `71.9K` or `41,000` unless Michael supplied
      it.
- [ ] **No brand mark has been redrawn, recoloured or modified.** If official marks were added, they
      are unaltered official assets. If they were not available, the deliverable is blocked and says so
      rather than shipping the Tabler glyphs as though they were official.

---

## 9. Open, blocking

### AWAITING BOB

| # | What | Blocks |
|---|---|---|
| 1 | The swap sheet itself: the confirmation, in one line, that nothing but strings and marks changes. | Nothing. It **is** the deliverable. |
| 2 | The `accentClass` value for any new page. | The new key. Expected answer: reuse an existing one. |

**Nothing else is Bob's here, and that is the point.** If a layout question reaches him, the tripwire in
his brief has fired and it goes to Michael, not into a comp.

### AWAITING MICHAEL

| # | What | Note |
|---|---|---|
| 1 | **How does a visitor tell long form YouTube from Shorts at a glance, when both carry the same mark?** And, prior to that: **the shipping `youtube` key is already a Shorts key.** Are these two pages or one? | Source of record Part 7, question 6. Section 1 has the evidence. |
| 2 | **Who sources the official platform marks?** The repo has Tabler approximations only. | Trap 1. **This deliverable cannot be completed correctly without them.** |
| 3 | `Reels` or `Instagram`. `Shorts` or `YouTube`. Two names per platform ship today. | Trap 3. Not in the source of record. |
| 4 | **`Scan Video` or `Get Transcripts`.** | Source of record Part 7, question 1. Raised in deliverable 03. It flows down to every one of these pages identically. |
| 5 | Every string in every new key. | Source of record Part 3 is the whole approved inventory. |
| 6 | Do these pages go in the header Features menu? | Trap 5. |

### Known errors in the upstream docs, corrected here

- The superseded ticket set, in its draft of this deliverable, asserts the site "already displays official
  TikTok, Instagram and YouTube marks" and says to "reuse those exact ones." **False.**
  `HomePage.js:16` imports `TbBrandTiktok`, `TbBrandInstagram` and `TbBrandYoutube` from
  `@/components/Icons`. They are Tabler glyphs. No official brand asset is present in the supports
  strip. Corrected here and in `03-AGENT-bulk-tiktok-page.md`.
- The same file, Part 2, implies a fourth Shorts page can simply reuse the YouTube content. **The
  `youtube` key already describes Shorts in seven of its fields.** See section 1.
