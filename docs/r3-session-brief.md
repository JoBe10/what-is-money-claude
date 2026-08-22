# Rebuild Session Brief — R3 (Section 3: What Money Must Do)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Governing document:** `docs/sections-1-3-rebuild-brief.md` (§7 is this section's beat map; §13 is the argument freeze — Section 4 is untouched this session). All standards in force: `_applyBuild` reconstruction, continuity groups + crossfade default ("black is a beat, not a seam"), the pacing rule, the script standard, the icon grammar (`docs/icon-grammar.md`), the color arc, American English, typographic apostrophes.
**Model guidance:** highest available effort.
**Date:** 29 July 2026

---

# 0. Preconditions and process

1. Read, in order: this brief; `docs/sections-1-3-rebuild-brief.md` (§3, §4, §7, §9, §13); `docs/r2-report.md`; `docs/icon-grammar.md`; `AGENTS.md`. Study the delivered Sections 1–2 — Section 3 continues their system exactly — and the existing Section 4 opener (4.01/4.02/4.03), because this session builds the seam into it.
2. If `rebuild-r2-section-2` is unmerged: merge to `main` first (no-ff, `Merge R2+R2.1+R2.2: Section 2 rebuild`), build-verify on `main`.
3. Branch: `rebuild-r3-section-3`. Commit per phase. Do not merge at the end.
4. Legacy Section 3 modules, scenes (MonetisationScene and consumers), and their now-unreferenced assets are deleted in the final phase after verification. Log unrelated defects to `docs/rebuild-observations.md`.
5. The seam: the last new slide hands into the existing Section 4 opener via the standard crossfade. A stylistic step-change at that boundary is expected (Section 4's execution rebuild is R7) — note it in the report; do not restyle Section 4.

---

# 1. Phase A — Components and glyph extension

## A1. `WaypointInterstitial.js`

The reusable section-boundary device (governing doc §9.3), debuting here — the line's first *return* after real absence:

- Renders the method line exactly as 1.5 left it, with per-waypoint states: `completed` (settled, dim, its dot filled solid at low warmth — visibly *done*, not merely inactive), `active` (the R2.1 ignition spec: ~2× marker, accent orange, bloom halo, single ~1.2s ignition pulse, label at warm white), `upcoming` (dim).
- API: `setState({ completed: [...], active: n })`, full reconstruction per build; reduced motion instant.
- Used by `00-waypoint-function` now and the S3→S4 boundary slide (§C, slide 08); future R7 use inherits it.

## A2. `StageLadder.js`

The monetization-stages visual for slides 03, 04, and 07 (its own scene group across those slides where consecutive):

- Four stages as ascending steps on a rising line (left-low to right-high): COLLECTIBLE → STORE OF VALUE → MEDIUM OF EXCHANGE → UNIT OF ACCOUNT — deliberately *not* a horizontal rail (the rail is the historical record; this is a structural ascent). Same line-language: thin strokes, dot markers, glyphs above, labels below.
- Per-stage states: `upcoming`, `revealed`, `foundation` (the SoV emphasis state — the only orange on the ladder), plus a `gate` affordance: a small connecting mark between consecutive stages that lights when the gating logic is stated.
- An entity marker (a small glyph, e.g. gold's or Bitcoin's) can be *placed* at a position on the ladder (slide 07).
- Full reconstruction; reduced motion instant; camera static (no panning — the ladder fits one frame).

## A3. `LayerDiagram.js`

The credit-layers visual for slide 06: a vertical stack — BASE MONEY at bottom, BANK DEPOSITS above, PAYMENT APPS above that — each layer a thin-stroke rectangle in the grammar, connected downward by small "claim" tie-marks. States: layers revealed bottom-up or top-down per build spec; a `foundation-emphasis` state (base layer brightens; the single allowed orange on the slide); tie-marks individually addressable. Reduced motion instant.

## A4. Palladium chart

A minimal two-series comparison for slide 05: crustal rarity and long-run price, palladium versus gold, rendered in the deck's chart style (thin strokes, no gridlines beyond a baseline, generous space). Figures flagged `PROVISIONAL` in code comment + `docs/SOURCES.md` stub entries (WIM-PD-001 rarity, WIM-PD-002 price history); shapes must be directionally correct, no invented precision displayed (indexed/relative rendering acceptable). Final data lands in R4.

## A5. Icon Studio extension

Extend the glyph set on the grammar (three candidates each, contact sheet appended to the studio directory, self-select with rationale, keep candidates): **through-time** (store of value), **between-people** (medium of exchange), **measure** (unit of account), **collectible**, **palladium**, **dollar**, **peso**, **brick** (the Argentina triad), plus any riser/tie marks A2–A3 need. One hand with the existing thirteen.

---

# 2. Phase B — Slides

Directory: `src/slides/section-3-function/`. On-screen copy and scripts are implement-verbatim.

---

### `00-waypoint-function` (the device's debut)

**Build 0:** the method line returns (crossfade from the pattern slide's ending) — waypoint 1 in `completed` state for the first time, waypoints 2–3 dim.
**Build 1:** waypoint 2 ignites (full ignition spec): "Ask what it must do."

*Script:*

[→] Remember the plan from the very beginning — three questions. We just spent twenty minutes on the first one. Where money came from, we now know: not from a decree — from a competition. A competition over salability that ran on every continent, produced the same two winners, built a ladder of convenience on top of them, and then, in its last chapter, was ended rather than won.

[→] Second question. What must a money actually *do*? Because "it won the competition" tells us it did the job — it doesn't yet tell us what the job *is*. Let's take the job apart.

---

### `01-the-three-functions` (beat 3.1)

**Build 0:** the neutral token from 1.2, center — the callback anchor.
**Build 1:** first function radiates from it (glyph + label): **STORE OF VALUE — moves value through time.**
**Build 2:** second: **MEDIUM OF EXCHANGE — moves value between people.**
**Build 3:** third: **UNIT OF ACCOUNT — measures value.**
**Build 4:** beneath the triad, the continuity line: **"Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside."**

*Script:*

[→] Here's the go-between good again — the thing every trade in the world now has on one side of it. Watch what it's actually being asked to do.

[→] First: hold value between the moment you earn and the moment you spend. A money is a store of value — it moves value *through time*. Sometimes an afternoon. Sometimes a working life.

[→] Second: be the thing both sides of a trade will take. A money is a medium of exchange — it moves value *between people*, across any distance the trade can reach.

[→] Third, the quiet one: once everything trades against the same good, everything gets *priced* in it. A money is a unit of account — the measuring stick of value itself.

[→] And notice — you've seen these three before. Survives across time. Across space. Across scale. The dimensions that decided the competition in Section One's history are exactly the three functions, seen from the inside. The market wasn't selecting arbitrarily. It was selecting for the job.

---

### `02-the-functions-separate` (beat 3.2)

**Build 0:** three column headers land together, empty: **PRICED IN · PAID IN · SAVED IN**
**Build 1:** the Argentina row fills, one glyph per column with labels: **dollars · pesos · dollars and bricks**. A small kicker above: **Argentina, five decades.**
**Build 2:** the principle, on-screen: **"The functions are separable — across goods, and across time. A good can be money in one function before, or without, the others."**

*Script:*

[→] Now, here's the thing almost every explanation of money skips: nothing says one good has to do all three jobs. And when a money starts failing at one of them, people don't write essays about it — they quietly split the jobs up.

[→] Argentina has been the world's clearest demonstration for fifty years. Apartments are priced and sold in dollars. Daily life is paid in pesos. And savings go into dollars and bricks — real estate, bought floor by floor as the money comes in. Three functions, three different goods. And before anyone reads politics into it: this pattern has persisted across administrations of every stripe — left, right, military, civilian. It isn't a story about one government. It's what people *do* when one function of their money breaks.

[→] So hold this as a principle, because we'll need it twice more: the functions are separable — across goods, and across time. Which means a good can be money in one function before it's money in the others. And that raises the obvious next question: is there an order?

---

### `03-the-order-of-monetization` (beat 3.3)

**Build 0:** the StageLadder, empty rising line. Kicker, small: **after Vijay Boyapati.**
**Build 1:** **COLLECTIBLE** revealed.
**Build 2:** **STORE OF VALUE** revealed; gate mark lights between them.
**Build 3:** **MEDIUM OF EXCHANGE** revealed; gate lights: on-screen gate line beneath: **"Nobody accepts as payment what they don't expect to hold value."**
**Build 4:** **UNIT OF ACCOUNT** revealed; gate lights: **"Nobody writes contracts in what nobody accepts."**
**Build 5:** STORE OF VALUE takes the `foundation` state (the ladder's only orange). On-screen: **"Store of value is the foundation function. Every monetary good must win it first."**

*Script:*

[→] There is an order, and it's one of the most useful ideas in all of monetary thinking. The framing follows Vijay Boyapati. Monetary goods have historically climbed four stages.

[→] They start as collectibles — held by a few people for their own strange reasons. Shells. Beads. Something scarce and interesting, valuable to somebody.

[→] Then, if enough people notice it holds its worth, it becomes a store of value — a place to park purchasing power on purpose.

[→] Only then can it become a medium of exchange — and look at *why* the order can't run backward: nobody accepts as payment what they don't expect to hold value until they spend it. Store-of-value belief is the gate to acceptance.

[→] And only a widely accepted good becomes the unit of account — because nobody writes contracts in a measuring stick nobody accepts. Each stage gates the next.

[→] Which makes the second stage the foundation of the entire structure. Store of value is the function every monetary good must win *first* — the one everything else stands on. Not a law of nature; a pattern with a logic. But keep it in front of you, because it tells us exactly where to aim our judgment later: at the foundation, before anything else.

---

### `04-stage-signatures` (beat 3.4 — StageLadder scene group continues)

**Build 0:** the ladder, all four stages revealed, foundation emphasis resolved to neutral.
**Build 1:** a bracket marks the early stages (COLLECTIBLE → STORE OF VALUE); beneath it: **"Early-stage signature: few holders · thin markets · reflexive pricing."**
**Build 2:** on-screen: **"Volatility and illiquidity are properties of the stage — not verdicts on the good."**

*Script:*

[→] One more thing the ladder teaches, and it's short but it matters. Look at what a good early in the climb necessarily looks like: few holders. Thin markets. Prices that swing hard, because every new believer and every doubter moves the whole market.

[→] That means volatility and illiquidity are properties of the *stage*, not verdicts on the *good*. Gold itself spent millennia as a collectible curiosity before it was anyone's savings — if you'd judged it in that stage by its price behavior, you'd have judged the stage, not the metal. File that one away. It'll matter later, and I won't have to say why.

---

### `05-the-palladium-test` (beat 3.5)

**Build 0:** the hook, on-screen, alone: **"Palladium: rarer than gold. Genuinely useful. At times more expensive. It never became money."**
**Build 1:** the chart (rarity and price, palladium vs gold, PROVISIONAL data).
**Build 2:** the timing line, on-screen: **"Discovered in 1803 — facing a monetary network thousands of years old."**
**Build 3:** the bar, on-screen: **"Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown."**

*Script:*

[→] So if properties decide the competition — here's a puzzle that tests whether we actually understand it. Palladium. Rarer in the Earth's crust than gold. Genuinely useful — industry needs it. There have been long stretches where an ounce of palladium cost *more* than an ounce of gold. And it never became money. Not anywhere. Not even close.

[→] Here's the comparison — scarcity and price, side by side with gold. On raw rarity, palladium wins. So why did nothing happen?

[→] Because of when it arrived. Palladium was discovered in 1803 — and it walked into a world where gold's monetary network was already thousands of years old. And a monetary good's value *is* that network. Salability is other people's acceptance. A latecomer doesn't start the race a few laps behind — it starts at zero, against an incumbent whose entire value is that everyone already accepts it.

[→] Which gives us the bar — maybe the most important sentence in this section: for anything to earn a place on the rail, marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown. Metal over shell was categorical. Note over wagon-of-coins was categorical. "A bit scarcer" moved nothing, ever. Remember the height of that bar. Before this presentation ends, we're going to hold a candidate up against it.

---

### `06-what-your-money-is` (beat 3.6)

**Build 0:** the LayerDiagram: **PAYMENT APPS** appears first, alone, top of the stage.
**Build 1:** **BANK DEPOSITS** appears beneath it; tie-mark down from apps: **a claim on your deposit.**
**Build 2:** **BASE MONEY** appears beneath; tie-mark down from deposits: **a claim on base money.**
**Build 3:** on-screen, beside the stack: **"Layers are not a scam — they are how money scales. But layers inherit the soundness of their base."**
**Build 4:** the base layer takes foundation emphasis. On-screen: **"This presentation's question is about the foundation asset — underneath them all."**

*Script:*

[→] Now let me pull the rug slightly. This whole time I've said "money" — but is the thing in your bank account actually the base good we've been talking about? Start from the top, where you live: the payment app.

[→] The app balance is a claim on your bank deposit. And the deposit — this is the part almost nobody is ever told — is not money sitting in a vault with your name on it. It is your bank's IOU. A claim, redeemable on demand, in base money: cash if you withdraw it, central-bank reserves when your bank settles with another. That's not a metaphor — it's the mechanical reason bank runs exist. The bank has issued more claims than the base it holds, which is fine right up until too many people ask at once.

[→] So the honest picture is a tower of claims, and I want to be fair to it in both directions. Layers are not a scam. Notes on gold, deposits on notes, apps on deposits — every mature money has grown credit layers, because layers are how money scales to daily commerce. They're as old as sound money itself. *But layers inherit the soundness of their base.* A tower is only as good as its foundation.

[→] Which finally makes the real question of this presentation precise. It was never about payment apps, and it was never about banking layers — those are engineering on top. The question is about the foundation asset underneath them all. And before we go find it, sit with this for a second — every layer is a claim on the layer below. So what is the bottom layer a claim on? … Hold that question. We're coming back to it.

---

### `07-where-bitcoin-is` (beat 3.7 — StageLadder returns)

**Build 0:** the StageLadder, resolved.
**Build 1:** the Bitcoin glyph is *placed* on the ladder at STORE OF VALUE: beneath it: **"Collectible, 2009–. Now visibly in the store-of-value stage: held by individuals, funds, institutions, states. Not a medium of exchange or unit of account at scale."**
**Build 2:** the literacy completed, two lines: **"Supply: 21,000,000 units — fixed by the protocol's rules."** / **"Can be held directly, with no counterparty — like a bearer asset."**
**Build 3:** the honesty line: **"Early in a process that history shows can stall. Candidates have died mid-climb before."**
**Build 4:** clear; the handoff, on-screen, alone: **"So how do you tell — for this candidate or any other — whether it deserves the foundation role?"**

*Script:*

[→] So where does the newest mark on our rail sit on this ladder? Let's place it — descriptively, same neutral register as before.

[→] Bitcoin spent its first years as a pure collectible — held by cryptographers and the curious, for their own strange reasons, exactly where every monetary good starts. Today it is visibly in the store-of-value stage: held by individuals, by funds, and lately by institutions and states — I'm stating adoption as fact, not as applause. It is not a medium of exchange at scale. It is not a unit of account. On the ladder's own logic, that's not damning — that's the expected position for its age. But position isn't destiny.

[→] Two facts complete the description — you'll need both later. Its supply: twenty-one million units, fixed by the protocol's own rules — not a promise from an issuer; a property of the thing. And it can be held *directly*, with no counterparty — like a bearer asset. Keep that one especially in mind; you now know, from the tower we just looked at, why how you hold something matters as much as what it is.

[→] And the honest line, in the same breath: it is early in a process that history shows can stall. Candidates have died mid-climb before. Nothing on this ladder guarantees the next rung.

[→] So how do you tell — for this candidate, or any other — whether it deserves the foundation role? Not by anyone's opinion. Not mine either. By a judgment you can build from first principles. That's the third question on our line. And it's where we're going right now.

---

### `08-waypoint-judge` (the S3→S4 boundary)

**Build 0:** the method line returns — waypoints 1 and 2 `completed`, waypoint 3 dim.
**Build 1:** waypoint 3 ignites: "Ask how you would judge anything that tries to be it."

*Script:*

[→] Two questions down. We know where money came from. We know what it must do, and in what order it must do it.

[→] One question left — the one everything has been building toward. How would you judge anything that tries to be it? Not by trusting a chart. Not by trusting me. From first principles — starting with a thought experiment about the next hundred years.

*(Advance hands into the existing Section 4 opener via the standard crossfade; step-change noted, not restyled.)*

---

# 3. Phase C — Verification

1. Build clean; full deck traversal forward/back/forward including both new waypoint interstitials and the seam into Section 4; frame captures at every group boundary (StageLadder group; crossfades elsewhere; zero incidental black).
2. Direct entry + mid-animation refresh at every build of all nine slides; reduced-motion pass over everything (ignitions, ladder reveals, chart, layer stack).
3. Pacing audit table: `[→]` count = build count per slide.
4. Constitution gates: banned terms; **"claim" in Section 3 appears only within slide 06's specified copy and script** (the ladder's second rung — verify no other occurrence); color-arc audit (orange only: ignitions, foundation emphases); American English; apostrophes. The falsifiability and displacement content does NOT appear (R7 territory); Section 4 files untouched (git-verify).
5. Glyph checks: new glyphs render at all placements; contact sheet updated; grammar doc updated.
6. Palladium chart: PROVISIONAL flags in code and `SOURCES.md` stubs present (plus Argentina and 21M entries: WIM-AR-001, WIM-BTC-001).
7. Screenshots: every build of all nine slides; both ignitions; the placed Bitcoin glyph; the layer tower with foundation emphasis. Save under `review/rebuild-r3/screenshots/`.
8. Phase D: delete legacy Section 3 modules/scenes/assets; clean `assets.js`; grep-verify; build.
9. Write `docs/r3-report.md` (standard format: changes, evidence, performance, pacing table, deviations, observations).

Stop after the report. Do not merge.
