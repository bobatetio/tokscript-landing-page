# UX-54 / 01: result card, every row state, and the wall (built + written decisions)

Built as working code in the live landing page. Reuses the existing card (`BulkTranscriptResult.jsx`)
and the site shell. Every new string is a `Not written yet. Michael writes it.` placeholder. No em
dashes, no en dashes. No red or pink.

## The five row states (all live)

- Waiting: label "Queued", clock icon, full opacity. It no longer looks identical to failed. A wall of
  queued rows reads as "this is coming", not as failure.
- Working: label "In Progress", active.
- Ready: teal check, "Complete", the row is clickable and opens the transcript.
- Failed / unavailable: muted, dimmed to 0.6, "No Transcript Available". This is the only state that
  dims, so dimming means failure and nothing else.
- Locked (new): full opacity, thumbnail and title fully visible, a small lock over the thumbnail and a
  teal "Locked" chip. It never reuses the dimmed broken look.

## The 30 open / 20 locked run

Config driven in one place (`BULK_MAX = 50`, `BULK_FREE_CAP = 30` in `HomePage.js`). A run of more than
30 links renders 30 open rows followed by locked ones. A run of 30 or fewer renders zero locked rows,
no locked pill, and no wall anywhere. Verified: at 50 links the card reads Total (50), Completed (27),
Unavailable (1), Locked (20), which is 30 open plus 20 locked. At 30 links there is no Locked pill and
no wall.

Review URLs: `/?demo=locked` (30 open, 20 locked, wall fires), `/?demo=nolock` (30 in, nothing locked),
`/?demo=paid` (50 in, 50 open, no wall, no upsell).

## Written decision: the two dead icons (copy and export on a finished row)

Removed. They were non-functional images sitting inside a row that is itself a single `<button>`, so
they could never have become real buttons without nesting interactive elements, which is invalid. Copy
and export already live in the transcript detail pane, which is the honest home for them. The row's one
job is selection.

## Written decision: does the lock get a fourth filter pill

Yes, but conditionally. The card shows Total, Completed, Unavailable, and now Locked. The Locked pill
appears only when the run actually locked rows, so a paid user or anyone who pasted 30 or fewer never
sees a fourth pill or any hint of gating. This makes "what am I missing" a filter the visitor can pull,
which is the strongest sales argument this product has, without imposing it on runs that have nothing
locked.

## Written decision: keep, repurpose, or remove the summary strip

Keep, repurposed. The strip at the top of the list ("Processed X of Y") is retained because it is the
honest running total of the job, and it already reads as a count rather than a bare fraction of a
sentence. It is not upsell furniture, so it stays on the paid screen too. Michael writes the exact
words; the shape stays.

## Written decision: rhythm, what stops twenty locked rows reading as a toll booth

Two things. First, locked rows keep full brightness and their real thumbnail and title, so the eye
reads twenty more real videos, not twenty greyed out error rows. The list reads as "more of your
collection", momentum, not a barrier. Second, the wall is one popup that fires once at the very end
after the open rows have finished landing, never mid scroll and never per locked row, so the locked
run is experienced as "here is everything, and here is where the free part ends", a single honest
boundary, rather than a row by row toll booth. The lock is a state on a real row, not a gate slammed
across the list.

## The wall

`BulkUpgradeWall.jsx`. One popup, fires once at the end (guarded by a run key so closing it does not
reopen it), never for a paid plan. It names what they got and what is waiting as two real numbers, never
a bare fraction. Guest and free are the same wall with a different glyph, hue, and copy (see
`02-spent-allowance.md` for why one design, not two). Verified: fires at `/?demo=locked`, does not fire
at `/?demo=nolock` or `/?demo=paid`.
