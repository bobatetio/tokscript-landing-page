# UX-55 Collection Transcriber: build notes, comps, and the two written verdicts

Built as working code in the live landing page, not a static comp. One continuous flow: paste one
TikTok collection link, the whole collection renders as a list (every row visible before anything is
transcribed), the first 50 open free, the rest stay visible but locked.

- Route: `src/app/tiktok-collection-transcriber/page.js` (slug provisional, AWAITING MICHAEL).
- Experience: `src/components/CollectionTranscriber.jsx`.
- Reuses the UX-54 row states (`BulkTranscriptResult`) and the UX-54 wall (`BulkUpgradeWall`)
  unchanged. This ticket runs them at scale, it does not redraw them.
- Registered in `src/components/Footer.jsx` (Generators column) and `src/app/sitemap.js`.

## Numbers are assumptions or config, not copy

Per the brief, every number is labeled here and set in one place at the top of the component.

- `FREE_CAP = 50`, the config-driven free transcripts per collection. Product config, not a guess.
- `PRIMARY_N = 312`, the number the primary case is designed at. An assumption.
- `STRESS_N = 500`, the stress frame. An assumption.

Every new string is a `Not written yet. Michael writes it.` placeholder at a realistic length. The
count banner shows the real numbers (312, 50) as two values, never as a bare fraction, and Michael
writes the sentence around them. No em dashes, no en dashes, no red, no pink.

## The comps, and how to open each one

Bob can open every required comp directly by URL, so each is capturable without stepping through the
flow. Add `&stress=1` to any of them to switch `PRIMARY_N` for `STRESS_N`.

| Required comp | URL |
|---|---|
| The scan, nothing transcribed yet, count up top | `/tiktok-collection-transcriber?comp=scan` |
| The list, 50 open and the rest locked (the hardest comp) | `/tiktok-collection-transcriber?comp=locked` |
| The stress frame at 500 | `/tiktok-collection-transcriber?comp=locked&stress=1` |
| The paid state, all rows open | `/tiktok-collection-transcriber?comp=paid` |
| The scan failed state (private, empty, invalid) | `/tiktok-collection-transcriber?comp=failed` |
| The transition, full list landing then transcripts filling in | default page, paste any link that contains `collection`, `playlist`, or `/@user/` |

Every comp above works at desktop and at narrow width. Verified at 390px: the hero heading is fluid,
the input row wraps to a full width button, the count banner holds, and the reused result card collapses
from three columns to one. No horizontal overflow at any comp.

The default (no `comp`) page is the live transition: submit lands the full list as all-pending, the
true count arrives about a second late, then transcripts fill in, first 50 open, the rest lock, and
the wall follows.

## The four description cases plus missing duration

The first six seeded rows deliberately cover every case the brief names, so a single scan proves the
row survives all of them: one clean sentence, a full paragraph, a wall of hashtags, the literal words
"No description", and a row with the duration missing (which renders with no duration chip at all,
never a stray "0").

## Written verdict: do UX-54's queued row and wall hold at the stress number?

Tested at `STRESS_N = 500`.

- Queued (waiting) row: holds. It stays full opacity and legible, so 450 of them read as "waiting",
  not as failure or as grey texture. The distinct "Queued" label plus the clock icon survive
  repetition. Verdict: no change needed for UX-54.
- Locked row: holds visually (full opacity, lock overlay on the thumbnail, teal "Locked" chip). The
  lock overlay only paints on the first eight rows because only those carry a thumbnail in this build;
  rows past that show the neutral clock placeholder, which is fine and keeps the frame light.
- The wall: holds. It names real numbers (open count and locked count as separate values), so it reads
  the same at 500 as at 50. No fraction, no collapse.
- One real thing that strains, and it is a layout finding, not a row or wall finding: the reused
  result card is a three column layout (list, video preview, AI actions). At a narrow container it
  crowds and the AI action buttons clip. Fixed here by giving the page a 1200px main column, which is
  how the card is used on the bulk page. If a future narrow or mobile comp needs this card, the three
  column card, not the row and not the wall, is what needs a responsive pass. Flagged, not redrawn.

Net: UX-54's row states and wall hold at the stress number. Nothing to send back to UX-54.

## Written note: what happens to the scan if the count arrives late, climbing, or never

The collection count is treated as a separate fact from the list, so the list never waits on it.

- Late: the count banner shows an honest "still counting" state (spinner plus placeholder copy) while
  the rows are already on screen. The list is the wow, the number catches up. In this build the count
  resolves about a second after the list lands.
- Climbing: because the list renders from the rows themselves, a count that climbs never rewrites the
  list, it only resolves the single number in the banner once. There is no flicker of the list
  reflowing as the number grows.
- Never: the banner falls to an "unavailable" state (neutral icon plus placeholder copy) and simply
  does not assert a total. The list still stands on its own. The product does not block on a number it
  never got.

## Open items for Michael and Bob

- Slug, hero copy, banner labels, wall copy, failed-state copy: all AWAITING MICHAEL placeholders.
- Real collection endpoint and cursor pagination: this build uses a synthetic collection so the UI can
  be iterated without the live listing endpoint. Wiring `GET /tiktok/collection/videos` is the
  follow-up. AWAITING MICHAEL for the exact contract.
- Narrow and mobile width: a first responsive pass is done and verified at 390px (card collapses to one
  column, no overflow). Fine tuning of the collapsed layout is AWAITING BOB.
