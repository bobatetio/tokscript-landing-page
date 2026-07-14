# BOB: Instagram, YouTube and Shorts

**For Bob.** No code in this document. If you find any, it is a bug in the document and it should be
reported, not decoded.

**Its twin:** `04-AGENT-platform-variants.md`, in this folder. That one is for Claude Code. Same scope,
same swap sheet, same definition of done, written in the language a machine needs. Drag it in when you
are ready. Do not read it. You are not missing anything.

**Size: extra small. This one is nearly free and it is meant to stay that way.**

**Blocked by:** deliverable 03. These pages are that page with different words, so that page settles
first.

**Blocks:** deliverable 06.

---

## The most important fact in this document

**These are the same page with different words and a different platform mark.** The Instagram and
YouTube generator pages that already ship are not separate designs. They are the homepage, rendered
with a different set of strings. One shell. The words swap. Nothing else moves.

Open all three. It takes thirty seconds and it is the entire argument of this brief:

- https://tokscript.com/ , which is the TikTok generator
- https://tokscript.com/instagram-transcript-generator
- https://tokscript.com/youtube-transcript-generator

**So: zero new comps by default.** The deliverable is a swap sheet, not a design. There is nothing to
redesign here. There is a table to fill in.

### Why the last version of this was wrong

The previous ticket set told you to produce a full comp set for each of these, nine states, desktop and
narrow. It was written without access to the code and it was simply wrong about how the site works. It
would have had you draw the same page four times.

**It is cancelled.** Do this one, and go and spend the time on deliverable 01, which is the only real
design problem in the set.

---

## The tripwire

**If you find yourself making a layout decision while doing this brief, something has gone wrong.
Stop and raise it.**

Not because you are wrong. Because a layout decision surfacing here means one of two things, and both
of them are findings worth interrupting for:

- the bulk page did not generalise the way we thought, or
- one of these platforms has a constraint nobody knew about.

**Either way, that is far more valuable than quietly solving it in a comp nobody asked for.** Say what
forced the decision. Do not draw your way past it.

---

## What you are producing

**One swap sheet.** A single document or one board, whichever you prefer, listing:

1. **Every string that changes per platform**, with a slot for each page. Every slot reads
   `Not written yet. Michael writes it.` except where a string already exists live, in which case
   quote it exactly.
2. **Every mark that changes per platform**, named and shown at the size it appears.
3. **A written confirmation, in one line, that nothing else shifts.** If you can honestly write that
   line, this brief is done. **If you cannot, then what does shift is the most valuable thing you will
   produce here.**

That is the whole deliverable.

### The four pages

| | The page | Status today |
|---|---|---|
| 1 | Bulk TikTok | Deliverable 03. The master. |
| 2 | Bulk Instagram | The shell ships today at the Instagram generator address. |
| 3 | Bulk YouTube, long form | See the open question below. **Read it before you start.** |
| 4 | Bulk YouTube Shorts | See the open question below. |

### The strings that change

You will find more once you actually walk the master page. Add them.

- The pill label above the heading.
- The heading.
- The subhead under the heading.
- The placeholder inside the paste box.
- The line beneath the paste box.
- The stat line.
- The bulk import block, its body and its four bullets.
- The quick download block, its body and its four bullets.
- The three AI agent lines.
- The five who it is for cards.
- The questions and their answers.
- The closing call to action.
- The page's own name wherever a sibling page links to it.

### The marks that change, and an honest correction

**Official platform marks only. Never approximations, never redrawn, never recoloured to fit the
palette.** That rule stands and it is not negotiable, for design reasons and for trademark reasons.

**But here is something that was checked in the code, and it contradicts what an earlier version of
this ticket told you.** That earlier version said the site "already displays official marks, so reuse
those exact ones." **That is false.**

The marks currently sitting under the paste box, in the strip that reads `Supports:`, are **not the
official brand assets.** They are glyphs from a general purpose open source icon set, which is that
set's own interpretation of each brand, drawn to match its own house style and rendered in whatever
colour the surrounding text happens to be.

**So the correct assets are not already on the site, and somebody has to source them.** That is a real
finding, it is small, and it is exactly the kind of thing this brief exists to catch. Flag it. Do not
quietly reuse the approximations because a previous document said they were fine.

---

## The one real open question. Raise it. Do not answer it.

**Long form YouTube and YouTube Shorts would carry the same mark.**

There is one YouTube logo. Both of those pages are YouTube pages. So a visitor who lands on one of
them, sees a YouTube mark in the pill above the heading and a YouTube mark on every result row, has
**nothing at a glance** to tell them which of the two pages they are on. The only thing separating them
is a word in the heading, which is precisely the thing a visitor skims past.

**And it is already worse than that.** The YouTube page that ships today is, in its own words, mostly a
Shorts page already. Its heading says YouTube. Its placeholder asks for Shorts links. The line under
the box talks about Shorts. Its stat line counts Shorts. Its closing call to action asks whether you
are ready to convert your Short. **One page, two identities, live right now.** So "YouTube versus
Shorts" is not a question you would be introducing. It is a question the site already has and has not
answered.

**Put it in front of Michael and let him decide whether it is even a question.** It might be a "these
should be one page with a toggle" problem, which is what the MCP page already does with Claude and
ChatGPT. It might be a "these should never have been two pages" problem. It might be a "the mark is
fine, the heading does the work, stop worrying" problem.

**What it is definitely not is a thing for you to solve with a custom badge or a modified YouTube
logo.** That would be the wrong answer twice over, once for the design and once for the trademark.

---

## Copy

**Quote anything that already exists.** The live placeholder on the homepage is
`Paste up to 50 video links here (or tiktok collection)` and the live action button is `Scan Video`.

**Deliverable 03 flags a conflict** between that button and the `Get Transcripts` the original spec
proposed. **That conflict is Michael's to resolve, not yours.** Whatever he resolves it to, it flows
down to all four of these pages identically, because they all render the same button.

**Every string that does not already exist reads `Not written yet. Michael writes it.`** in the slot,
at a realistic length. **Do not write good placeholder copy. It ships.**

**No em dashes. No en dashes. Anywhere. Ever.** Not in a label, not in a caption, not in a cell of the
swap sheet. Commas, colons and periods.

---

## Every state

**This deliverable adds no states.** These pages render exactly the states the master page renders, and
the ones that matter live inside the results card, which is deliverable 01's.

**If you find yourself enumerating a state here, you are in the wrong brief.**

---

## The visual language, and the shots

**Read `tasks/VISUAL-REFERENCE.md`** if you have not already. The screenshots are in
`tasks/visual-reference-shots/`. Only two matter here:

| File | What it shows |
|---|---|
| `home-01.jpg` | **The one that matters most.** The hero, and at the bottom of it the `Supports:` strip carrying the three platform marks. Look closely at those marks. They are the approximations described above, not the official assets. |
| `home-full.jpg` | The whole homepage, so you can confirm for yourself that nothing else on it is platform specific. |

**The honest gap:** there is **no shot of the Instagram or YouTube generator page** in the folder, and
none of the results card. Open the two live addresses at the top of this brief and compare them against
the homepage yourself. That comparison is the check this entire brief turns on, and it is not something
a screenshot in a folder can do for you.

---

## Done looks like

- [ ] One swap sheet. One column per page, listing every string that changes.
- [ ] Every mark that changes, per page, shown at the size it appears, **using official assets, which
      somebody first has to source, because the ones on the site today are not official.**
- [ ] **A written line from you confirming that nothing except strings and marks shifts between these
      pages.** If you cannot honestly write that line, say what does shift and why. That is the most
      valuable thing this brief can produce.
- [ ] The YouTube versus Shorts question raised, **not answered.**
- [ ] The mark sourcing problem raised.
- [ ] **Zero new comps**, unless you found a reason for one, in which case say what the reason was
      before you drew it.
- [ ] Zero em dashes and zero en dashes.

---

## Out of scope

- **The master page.** Deliverable 03.
- **The results card and everything inside it.** Deliverable 01.
- **The spent allowance screen.** Deliverable 02.
- **The collection page.** Deliverable 05.
- **Redesigning anything at all. If this brief produces a redesign, it has failed.**
- Whether these pages should exist. They should, and that is settled.

---

## Open questions. Michael answers these. Do not resolve one yourself.

1. **How does a visitor tell the long form YouTube page from the Shorts page at a glance, when both
   carry the same YouTube mark?** And, before that: given that the YouTube page shipping today already
   talks about Shorts in almost every line, **are these two pages or one?**
2. **Who sources the official platform marks?** The ones on the site are approximations from a general
   icon set. This brief cannot be completed correctly without the real ones.
3. **Should the Instagram page say Instagram, or Reels, or both?** The strip under the paste box says
   `Reels`. The page is called the Instagram Transcript Generator. **Two names for one platform,
   already, on the live site.**
4. **`Scan Video` or `Get Transcripts`?** Raised in deliverable 03. It flows down to all four of these
   pages identically.
