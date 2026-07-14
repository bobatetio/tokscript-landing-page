# Handoff: Linear UX deliverables in the live landing page

Repo: `tokscript-landing-page` (Next.js 16 + SCSS). Branch: `feature/transcriber-pages`.
Mission: build the five Linear UX deliverables (UX-54, UX-55, UX-56) as CODE in the LIVE landing page.
Rule: `AWAITING MICHAEL` copy stays as the literal placeholder `Not written yet. Michael writes it.`
(never fabricated). `AWAITING BOB` design choices are made reasonably for Bob to tune. No em/en dashes.
No red/pink for expected states. Numbers on the collection page are labeled assumptions/config.

## Status: all five deliverables built and verified. NOT committed (batch commit, waiting for Bob).

### UX-56 / 04 swap sheet
- `tasks/briefs/04-swap-sheet.md` (table of every per-platform string + 6 findings; zero comps).

### UX-54 / 03 bulk TikTok page
- `src/app/bulk-tiktok-transcript-generator/page.js` (renders `<HomePage platform="bulkTiktok" />`).
- `src/app/platformContent.js` has the `bulkTiktok` key (approved shared strings kept, rest placeholder).
- Registered: `Footer.jsx` Generators column + `sitemap.js`.

### UX-54 / 01 results card row states
- `src/components/BulkTranscriptResult.jsx`: statuses complete / processing ("In Progress") /
  pending ("Queued", full opacity) / unavailable+failed (dimmed 0.6) / locked (full opacity + lock
  overlay + teal "Locked" chip). Removed the two dead per-row copy/export icons (were non-functional
  inside a `<button>`; detail pane still owns copy/export). Duration guard `item.duration > 0`.

### UX-54 / 01b end-of-run wall
- `src/components/BulkUpgradeWall.jsx` (modal, placeholder copy, no red/pink).
- Wired into `src/app/HomePage.js`: dynamic import; state `bulkWall`; guarded `useEffect` (fires once
  per finished run via `bulkWallFiredRef`, only when locked rows exist, never for paid); render near
  `DontMissOutModal`. onPrimary reuses `setDontMissOutModalShow(true)` as a placeholder path.

### UX-54 / 02 spent allowance
- `src/components/SpentAllowanceNotice.jsx` (calm teal inline notice, guest vs free, no red/pink).
- `HomePage.js`: new `allowance` state (separate from `error`, so `.has-error` red never fires for an
  expected limit); helper `flagAllowanceSpent(user)` consolidates all THREE detection spots (daily
  gate, localStorage `tokscript_bulk_used`, server `bulk_already_used`); removed their `setError`
  calls; render the notice under the hero input; clear it on input edit. Verified: `.has-error` false.

### UX-55 / 05 collection transcriber
- `src/app/tiktok-collection-transcriber/page.js` + `src/components/CollectionTranscriber.jsx`.
- Registered: `Footer.jsx` + `sitemap.js`.
- Reuses `BulkTranscriptResult` (rows) + `BulkUpgradeWall` (wall). Config: FREE_CAP=50, PRIMARY_N=312,
  STRESS_N=500. Comps openable by URL: `?comp=scan|locked|paid|failed`, `&stress=1`. Default page runs
  the live transition (scan -> count arrives late -> transcripts fill -> wall).
- `tasks/briefs/05-collection-transcriber.md` holds the two required WRITTEN verdicts (UX-54 row+wall
  hold at 500; count late/climbing/never behavior) + the "3-column card crowds at narrow width" finding
  (fixed here with a 1200px column; responsive pass AWAITING BOB).

## Verification
- All routes return 200, no pageerrors (home, bulk-tiktok, collection + every comp).
- Screenshots were taken to a temp dir and then removed (verification scaffolding, not deliverables).
- Temporary `src/app/carddev` dev harness removed. No dangling refs.

## Checkout drift (still true)
- This checkout lacks a `development` branch (only main, gh-pages, lifetime-plan) and the other brief
  .md files; `platformContent.js` uses `whoH2`/`whoSub` (not `who.heading`) and has no `faq` key.
  Built against the actual code. Slugs / SEO / all new copy are provisional AWAITING MICHAEL.

## Gap-closing pass (done after first audit against the issues' "what done looks like")
- UX-54 bulk mock now produces 30 open + 20 locked (config `BULK_MAX=50`, `BULK_FREE_CAP=30` in
  HomePage.js). Verified pills: Total(50)/Completed(27)/Unavailable(1)/Locked(20).
- `?demo=` review affordance on the home page: `locked`, `nolock`, `paid`, `guest-spent`, `free-spent`.
- 4th "Locked" filter pill in `BulkTranscriptResult.jsx` (conditional on locked>0).
- Calm paid screen: `?demo=paid` = 50 open, no wall, no locked pill (isPaidView guards the wall effect).
- Guest vs free now visually DISTINCT before reading a word, in BOTH `SpentAllowanceNotice.jsx` and
  `BulkUpgradeWall.jsx`: guest = DoorClosed + teal, free = Clock + lilac (#c9a3ff). No red/pink.
- Narrow/mobile: card already collapses at <=1100px; added fluid hero + wrapping input to
  CollectionTranscriber. Verified 390px, no horizontal overflow on bulk or collection.
- Written decision docs added: `tasks/briefs/01-result-card-and-wall.md`, `02-spent-allowance.md`,
  `03-bulk-tiktok-page.md` (dead icons removed, 4th pill yes-conditional, summary strip kept/repurposed,
  rhythm paragraph, one-design-two-states + returning-guest-keeps-paste-box, fifty-placement, width
  paragraph). 05 brief updated to note responsive pass done.

## Coverage vs the three issues' "what done looks like"
- UX-56: complete (swap sheet + findings; official-marks sourcing is Michael's).
- UX-55: complete (all comps desktop + narrow; two written verdicts in 05 brief).
- UX-54: all four moments built + openable by URL, both widths, all written decisions + two paragraphs.
  Remaining nuance (noted, not blocking): paid "no upsell" is satisfied visually (no wall/lock/pill);
  deeper upsell stripping (e.g. export-icon behavior) is a refinement. Real backend wiring AWAITING MICHAEL.

## Next steps
- Await Bob's review of the designed states, then ONE commit when he says done (do not self-commit).
- Follow-ups AWAITING MICHAEL: final slugs + copy, real `GET /tiktok/collection/videos` wiring.
