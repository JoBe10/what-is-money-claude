# Rebuild Session Brief — R3.1 (Section 3 Revisions)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Four changes (A–D) plus verification, on the delivered Section 3. All governing standards in force. On-screen copy and scripts below are implement-verbatim; scripts marked "full replacement" replace that slide's notes entirely.
**Branch:** continue on `rebuild-r3-section-3` (unmerged).
**Date:** 30 July 2026

---

# A. Argentina slide (`02-the-functions-separate`)

1. On-screen SAVED IN column: **dollars · real estate** (replacing "dollars and bricks"). Keep the brick glyph — the idiom lives in the spoken layer.
2. Script: replace the middle paragraph (the Argentina description) with:

> [→] Argentina has been the world's clearest demonstration for fifty years. Apartments are priced and sold in dollars. Daily life is paid in pesos. And savings go into dollars and real estate — Argentines literally call it "saving in bricks," buying a floor at a time as the money comes in, because the bricks hold what the peso cannot. Three functions, three different goods. And before anyone reads politics into it: this pattern has persisted across administrations of every stripe — left, right, military, civilian. It isn't a story about one government. It's what people *do* when one function of their money breaks.

---

# B. StageLadder (`03-the-order-of-monetization`, `04-stage-signatures`, `07-where-bitcoin-is`)

1. **Gate marks:** the half-dot gate affordances are unreadable and are replaced. New treatment: a single short perpendicular tick crossing the rising line at each between-stage position — a threshold mark — dim by default, brightening (warm white, not orange) at the build where its gate line is stated. **Design rule (add to `docs/icon-grammar.md`):** any mark whose meaning a viewer cannot infer without a legend fails the grammar — encode it legibly or delete it. If the tick still reads as ambiguous at render, delete the gate marks entirely and let the gate text lines carry the logic.
2. **Foundation line reworded** (Build 5 on-screen copy, replacing "Store of value is the foundation function. Every monetary good must win it first."):

> **"Store of value is the foundation function. The other functions are built on it."**

Rationale: "first" collided with COLLECTIBLE being the ladder's first *stage*; the structural phrasing matches the visual (things above stand on it) and removes the ambiguity.
3. Script for `03`: replace the final paragraph with:

> [→] Which makes the second stage the foundation of the entire structure. Note the distinction: collectible is where a good *starts* — but it isn't yet a monetary function. Of the three functions themselves, store of value is the one a good must win before the others can exist — the function the rest are built on. Not a law of nature; a pattern with a logic. But keep it in front of you, because it tells us exactly where to aim our judgment later: at the foundation, before anything else.

---

# C. Palladium reframe (`05-the-palladium-test`) — the two-epoch honesty

**Problem:** the 1990–2026 price chart invites a fair objection: "gold wasn't used as money by 1990, so 'palladium didn't replace gold as money' is confused." The fix is to *concede and use* the fact — which the deck has already taught (2.7–2.8: gold was captured; the functions separate; gold kept the store-of-value role). Palladium's failure spans **both epochs of gold's monetary life**, and that makes the beat stronger, not weaker.

**Revised builds:**

- **Build 0** (hook, unchanged): "Palladium: rarer than gold. Genuinely useful. At times more expensive. It never became money."
- **Build 1** (chart, unchanged design; retitle the price panel: **PRICE OF ONE OUNCE · MODERN ERA**).
- **Build 2** (timing, unchanged): "Discovered in 1803 — facing a monetary network thousands of years old."
- **Build 3 (new):** on-screen: **"And when gold's role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium."**
- **Build 4** (the bar, unchanged): "Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown."

**Script (full replacement):**

[→] So if properties decide the competition — here's a puzzle that tests whether we actually understand it. Palladium. Rarer in the Earth's crust than gold. Genuinely useful — industry needs it. There have been long stretches where an ounce of palladium cost *more* than an ounce of gold. And it never became money. Not anywhere. Not in any era.

[→] Here's the comparison — scarcity, and the modern price record, side by side with gold. And let me be precise about what this chart can and can't say, because you already know gold's story. By this period, gold was no longer the world's money in daily use — you watched it get captured in Section One's history. What gold kept, after the capture, was exactly the function our ladder calls the foundation: the store of value. Central banks hold it. Savers hold it. That is gold's remaining monetary role.

[→] Now run palladium against gold in *both* of gold's eras. Eighteen-oh-three: palladium is discovered — rarer than gold — and walks into a world where gold is the base money of civilization, the metal behind every certificate, with a network thousands of years old. Nothing happens. Because a monetary good's value *is* that network — salability is other people's acceptance, and a latecomer doesn't start a few laps behind; it starts at zero.

[→] Then the modern era: gold's role narrows to store of value — and palladium never touches that role either. There have been years when palladium was the more expensive metal, ounce for ounce. No monetary premium followed. No central bank holds palladium reserves. No saver anywhere treats it as the safe place for a life's work. Rarer, pricier — and monetarily, nothing. Price is not moneyness.

[→] Which gives us the bar — maybe the most important sentence in this section: for anything to earn a place on the rail, marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown. Metal over shell was categorical. Note over wagon-of-coins was categorical. "A bit scarcer" moved nothing — in either century. Remember the height of that bar. Before this presentation ends, we're going to hold a candidate up against it.

---

# D. The layer tower rebuilt (`06-what-your-money-is`)

**Problem:** the current three-boxes-and-side-text layout is org-chart generic; the tower metaphor isn't *felt*; the tie-marks are illegible; the dangling question has no visual moment. Full rebuild of the slide's visual on one idea: **the geometry carries the argument.**

**The visual — an inverted tower:** three horizontal slabs (thin-stroke, grammar-consistent, no rounded-app energy), centered, stacked with each resting visibly on the one below — and **widths that tell the truth: BASE MONEY is the narrowest slab, at the bottom; BANK DEPOSITS is distinctly wider above it; PAYMENT APPS wider still on top.** More claims than base is not a decoration — it *is* the bank-run mechanic, drawn. (Widths qualitatively honest, not to-scale; no figures displayed; note in code comment.)

**Builds:**

- **Build 0:** PAYMENT APPS slab alone, top of stage.
- **Build 1:** it settles downward as BANK DEPOSITS lands beneath it (visible rest — a small settle easing as the upper slab takes support); thin claim-line between them, labeled: **a claim on your deposit.**
- **Build 2:** both settle onto BASE MONEY — narrowest, bottom; claim-line labeled: **a claim on base money.** The inverted proportion is now unmistakable. On-screen, beneath: **"More claims than base. That is what a bank run runs on."**
- **Build 3:** the tremor: the base slab dims/flickers once, and a quiet ripple propagates *upward* through both layers (~1s, restrained — a shudder, not a collapse; reduced motion: skip entirely). On-screen: **"Layers are not a scam — they are how money scales. But layers inherit the soundness of their base."**
- **Build 4:** the scope: the upper slabs recede to dim outlines; BASE MONEY takes the foundation emphasis (the slide's only orange). On-screen: **"This presentation's question is about the foundation asset — underneath them all."**
- **Build 5:** the held question: a thin claim-line extends *downward* from the base slab into empty black — pointing at nothing — and holds. **No text.** (The visual rhyme is deliberate: fiat floats above the rail with no rung beneath; here the whole tower's bottom-most claim-line reaches into darkness. Same missing-anchor motif, never explained on screen.)

Composition centered; all copy lands beneath the tower (no side text). Claim-line labels sit beside their lines, right of center, one shared alignment.

**Script (full replacement):**

[→] Now let me pull the rug slightly. This whole time I've said "money" — but is the thing in your bank account actually the base good we've been talking about? Start from the top, where you live: the payment app.

[→] The app balance is not money. It's a claim on your bank deposit — a number that points at another number.

[→] And the deposit — this is the part almost nobody is ever told — is not money sitting in a vault with your name on it either. It is your bank's IOU: a claim, redeemable on demand, in base money — cash if you withdraw it, central-bank reserves when your bank settles with another. And look at the shape of the tower we just built, because the proportions are the point: the claims stacked above are *wider* than the base beneath them. There are far more claims on base money than there is base money. That's not a metaphor and not a scandal — it's arithmetic, and it's exactly what a bank run runs on: it's all fine, right up until too many claimants ask at once.

[→] So let me be fair to the tower in both directions. Layers are not a scam. Notes on gold, deposits on notes, apps on deposits — every mature money has grown credit layers, because layers are how money scales to daily commerce; they're as old as sound money itself. But feel what just happened when the foundation shivered: every layer above it moved. Layers inherit the soundness of their base. A tower is only as good as what it stands on.

[→] Which finally makes the real question of this presentation precise. It was never about payment apps, and it was never about banking layers — those are engineering on top, and engineering can be excellent. The question is about the foundation asset underneath them all.

[→] And before we go find it — sit with this for a moment. Every layer is a claim on the layer below. So what is the bottom layer a claim on? … Hold that question. We're coming back to it.

---

# E. Verification

1. Build clean; traversal both directions across Section 3; direct entry + refresh at every build of the four changed slides (including tremor and downward-line states); reduced motion (tremor skipped; all states instant).
2. Pacing audit: updated `[→]`/build tables for 02, 03, 05, 06 (06 now has six builds — count must match the new script).
3. Gates: "claim" occurrences in Section 3 remain confined to slide 06 copy/script (the new lines keep it there — verify count); banned terms; color audit (orange only: ignitions, ladder foundation, tower Build 4); American English; apostrophes.
4. Ladder: threshold ticks legible in screenshot review (or removed per the B1 decision rule, recorded in the report); reworded foundation line rendered.
5. Palladium: new Build 3 line rendered; retitled chart panel; PROVISIONAL flags intact.
6. Tower: proportions read at 1920×1080 (deposits distinctly wider than base; apps widest); tremor restrained; the downward claim-line-into-darkness holds as the final state with no text.
7. Screenshots: every build of the four changed slides. Save under `review/rebuild-r3/screenshots-r3-1/`.
8. Append an R3.1 section to `docs/r3-report.md` with evidence and deviations.

Stop after the report. Do not merge.
