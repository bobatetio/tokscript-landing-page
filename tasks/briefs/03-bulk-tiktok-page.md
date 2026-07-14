# UX-54 / 03: the bulk TikTok page itself (built + written decisions)

Built as working code: `src/app/bulk-tiktok-transcript-generator/page.js` renders the site shell
(`<HomePage platform="bulkTiktok" />`) with a bulk-specific copy key. Registered in the Footer
Generators column and in `sitemap.js`. Slug and all SEO copy are provisional and AWAITING MICHAEL.
Every new string is a `Not written yet. Michael writes it.` placeholder. No em dashes, no en dashes.

## The four moments are one page

The page carries the whole journey, not four screens:

1. Arriving and pasting: hero, the paste box, the "how it works" rows below. This is what loads before
   anything is pasted, so it has to sell on its own.
2. Watching results land: the result card fills in row by row, every state named (see
   `01-result-card-and-wall.md`).
3. Hitting the wall: one popup at the end when the free portion runs out (see `01-...` and `02-...`).
4. Coming back spent: the returning guest and returning free states in the hero (see
   `02-spent-allowance.md`).

Every moment is openable by URL for review: `/?demo=locked`, `/?demo=nolock`, `/?demo=paid`,
`/?demo=guest-spent`, `/?demo=free-spent`, all on the same page.

## Written decision: where and how the number fifty is stated

The number appears in one canonical place and is config driven, never hardcoded in the JSX. `BULK_MAX`
lives in one constant, and the paste box is the single authoritative statement of the cap ("paste up to
50"). The rule for Michael's copy: state the cap once, at the box, where it is an instruction the
visitor acts on. Do not restate a competing "50" in a different size in the hero heading and again in
the stat line. The capability lines can describe what the product does without repeating the figure at a
third size. One number, one place, one size, driven by the config.

## Written decision: does the page hold when the paste box becomes a much wider result card

Yes. The paste box is a centered element capped around 640 to 720px. When results land, the result card
appears in the same centered column, capped at 1200px. The transition is a width expansion along a
single, consistent center axis, not a layout jump: nothing reflows sideways, the eye stays on the same
vertical line, and the card carries the same dark rounded panel treatment as the paste box, so it reads
as the same surface growing rather than a new component appearing. On narrow width both the paste box
and the card go full width and the card's three columns (list, preview, transcript) stack into one, so
the same center-axis logic holds down to mobile. Verified at 390px: no horizontal overflow, the card
collapses to a single column cleanly.

## Reused, not reinvented

The page reuses the site Header and Footer, the existing hero and paste box, and the existing result
card and its table pattern. The only genuinely new furniture is the locked row state, the wall, and the
spent-allowance notice, each of which is documented in `01-...` and `02-...`.
