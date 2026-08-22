# Rebuild Session Brief — R1.1 (Section 1 Revisions: Staging + Script Notes)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Two changes only: (A) presenter-paced staging on slide 1-03, (B) replacement of all Section 1 speaker notes with the verbatim recording script below, plus the corresponding standard change in the governing document. Nothing else in Section 1 changes; Sections 2–5 are untouched.
**Branch:** continue on `rebuild-r0-r1-section-1` (the R0+R1 branch — not yet merged).
**Date:** 28 July 2026

---

# 1. Context

Read `docs/sections-1-3-rebuild-brief.md` §3 and §5, and `docs/r0-r1-session-brief.md`, for the standards in force. The presenter has reviewed the rendered Section 1. The visuals and on-screen copy are **approved as implemented — do not change them** (including the 1.2 lines and the ghost-field treatment). The two approved revisions follow.

---

# 2. Change A — Presenter-paced staging on `03-what-is-money`

**Current behavior:** the three facts in build 2 auto-stagger ~1.2s apart after one advance.
**Problem:** the reveals outrun the spoken delivery; the presenter cannot speak each line over its appearance.
**Required behavior:** each fact is its own build (one advance each). New build structure:

- Build 0: token alone (unchanged)
- Build 1: the question lands (unchanged — held frame for silence)
- Build 2: fact 1 — "It is one side of nearly every trade on Earth."
- Build 3: fact 2 — "It is the most used good in human civilization."
- Build 4: fact 3 — "There is not one hour of school on what it actually is."
- Build 5: clear to black, beat of emptiness, title lands (previously build 3, unchanged in content and choreography)

Question dim-on-first-fact behavior, spacing, and type treatment unchanged. `_applyBuild` reconstruction, direct entry, and reduced motion updated for the new build count.

**New standing rule** (add to `docs/sections-1-3-rebuild-brief.md` §3.5, Language and craft rules, as a new bullet — this governs R2 and R3):

> **The pacing rule: one advance per spoken beat.** Any text element the presenter speaks over gets its own build, advanced manually. Auto-timed staging is reserved for motion *within* a single visual gesture (a field filling, a collapse, a sweep) — never for sequential lines of copy.

---

# 3. Change B — Notes are the script

## 3.1 The standard (replaces the placeholder standard)

In `docs/sections-1-3-rebuild-brief.md`, replace §9.2 in full with:

> ## 9.2 Notes (script standard)
>
> Speaker notes are the **verbatim recording script**: the exact words the presenter reads aloud while screen-recording the deck, slide by slide. They are not slide explainers, design rationale, or delivery instructions.
>
> Format:
> - Flowing spoken prose in the presenter's voice, first person, direct address to the viewer.
> - **`[→]`** marks every advance (arrow press). The words after a `[→]` are spoken over the build it triggers. Every build of the slide appears as exactly one `[→]` in its notes, in order. The advance that *leaves* the slide belongs to the next slide's script, not this one.
> - *Italic bracketed stage directions* are allowed sparingly and only where silence or timing is itself the content — e.g. *[hold — let the silence sit]*. No other meta-commentary.
> - Canonical spoken lines from this brief appear verbatim at their exact positions.
> - American English, typographic apostrophes, no hard-wrapped lines, no wrapping quotation marks.
> - The presenter rewrites and finalizes every script in his own voice at the end of the rebuild (after R6); until then, scripts are drafted to be readable as-is.
>
> Sourcing bases for on-screen figures live in `docs/SOURCES.md` only — never inside the script.

## 3.2 The Section 1 scripts (install verbatim)

Replace the notes of the five Section 1 slides with the following, exactly as written. (The sourcing paragraph currently in 1-01's notes moves to `docs/SOURCES.md` if not already there, and is removed from the notes.)

---

### `01-eighty-thousand-hours`

Let me start with a number.

[→] Every point of light appearing on your screen is one hour of work. One hour of somebody's morning, somebody's commute, somebody's shift. Watch them add up. A year of full-time work is about two thousand hours. A career — call it forty years — is eighty thousand. *[the counter completes with the field]* There they are. All at once.

[→] Eighty thousand hours. That is how much of a human life goes into working. And I want you to notice what those hours have in common: every single one of them is irreplaceable. You don't get any of them back. They only move in one direction.

Hold that picture for a second — because all of those hours get traded for one thing.

---

### `02-the-conversion`

[→] Watch what happens to them. Every hour worked gets converted — poured, one by one, into a single thing. This is what a paycheck actually is: hours, changing shape.

[→] Everything you earn is your time, changing form. Now, to be precise about it: not every hour trades at the same rate. The market doesn't price your hours — it prices what you *make* with them. An hour of specialized, skilled, valuable work converts into more than an hour of unskilled work. That's not a flaw in the system; that's the system working. But notice that whatever the exchange rate — what you *paid* was time. The rate varies. The currency you paid in never does.

[→] Money is where a life's work accumulates. Whatever you own, whatever you've saved, whatever you've built — nearly all of it passed through this on the way. Every working hour, funneled into one vessel.

So here is the question that should bother you far more than it probably does.

---

### `03-what-is-money`

[→] Without saying what it *does* — can you say what money *is*?

*[hold — let the silence sit]*

Everyone knows what it does. It buys groceries. It pays rent. But that's not what I asked. I asked what it *is*. And if you're drawing a blank right now, you're in good company — almost everyone does.

Which is strange. Because think about what this thing is:

[→] It is one side of nearly every trade on Earth. Almost every exchange between human beings, anywhere, has money on one side of it.

[→] It is the most used good in human civilization. Used more than any tool, any machine, any technology we have ever built.

[→] And there is not one hour of school — anywhere — on what it actually is. We are taught the parts of a cell. We are taught the capitals of countries. The thing every one of us trades our life's hours for? Not one lesson.

[→] So that is the question. What is money?

---

### `04-the-stakes`

[→] And here is why the question matters — why it's worth the next hour of your attention.

If you don't understand the thing your life's work is stored in, you are at the mercy of those who do.

That asymmetry is as old as money itself. In every era, the people who understood the monetary system — how it works, who controls it, where its weaknesses are — have held a quiet power over the people who merely used it. Most people live their entire lives on the wrong side of that line without ever knowing the line exists.

The point of this presentation is to move you to the other side of it.

---

### `05-the-promise`

[→] So how do we answer a question like this? The same way you'd come to understand anything mysterious.

[→] Ask where it came from.

[→] Ask what it must do.

[→] Ask how you would judge anything that tries to be it.

That's the whole plan, and it's the whole presentation. First, the history: where money actually comes from — because its origin tells you what it is. Then, the job: what a money has to do, and in what order. And then — the part I think you'll remember — we build a way to judge *any* candidate for the role. Including the money in your bank account. Including the ones in the news.

One promise before we start. By the end you'll have a framework — not my conclusions, a framework you can check for yourself. Nothing in this presentation is financial advice; it's an education in a thing you were never taught. And you shouldn't take anyone's word on money anyway. By the end, you'll see why that's rather the point.

So. Where does money come from?

---

# 4. Verification

1. `npm run build` clean; full traversal forward/back/forward across Section 1 and the seam into legacy Section 2; direct entry at every build of `03-what-is-money` under its new build count; reduced-motion parity on the new builds.
2. The notes overlay and second-window notes render all five scripts correctly (check the longest, 02 and 05, against the Bucket 1 overlay scroll fix; `[→]` markers and italics render legibly).
3. Every build of every Section 1 slide corresponds to exactly one `[→]` in its script, in order — verify by count per slide.
4. `docs/sections-1-3-rebuild-brief.md` updated: §9.2 replaced per §3.1 above; the pacing rule added to §3.5. No other edits to that document.
5. Constitution gates re-run on changed files (banned terms; no "claim" anywhere in Section 1 copy or notes; American English; typographic apostrophes — note the scripts use them throughout).
6. Screenshots: the six builds of `03-what-is-money`; the notes overlay on 02 and 05. Save under `review/rebuild-r1/screenshots-r1-1/`.
7. Append a short section to `docs/r0-r1-report.md` (do not create a new report): what changed in R1.1, verification evidence, build-count table for Section 1.

Stop after the report update. Do not merge.
