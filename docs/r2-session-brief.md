# Rebuild Session Brief — R2 (Section 2: Where Money Comes From)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Governing document:** `docs/sections-1-3-rebuild-brief.md`. This brief (a) updates that document with the decisions logged since R1, then (b) implements Section 2 in full. Read the governing document first, then this brief; where this brief is more specific, it wins.
**Model guidance:** highest available effort — this is the deck's largest visual construction phase.
**Date:** 28 July 2026

---

# 0. Preconditions and process

1. Read, in order: `docs/sections-1-3-rebuild-brief.md`, this brief, `docs/r0-r1-session-brief.md` and `docs/r1-1-revision-brief.md` (for the standards R1 established), `AGENTS.md`. Study the delivered Section 1 (`src/slides/section-1-question/`) and Section 4's architecture — Section 2 must match Section 1's austerity and craft exactly.
2. If branch `rebuild-r0-r1-section-1` is not yet merged into `main`: merge it now (no fast-forward, message `Merge R0+R1+R1.1: Section 1 rebuild`), verify `npm run build` on `main`.
3. Create branch `rebuild-r2-section-2`. Commit per phase below. Do not merge at the end.
4. All standards in force: `_applyBuild` reconstruction, direct entry at every build, reduced-motion parity, the pacing rule (one advance per spoken beat), the script standard (§9.2 — notes are the verbatim recording script with `[→]` markers), American English, typographic apostrophes, no timers surviving navigation, no module-level scene caches.
5. Legacy Section 2 modules and assets are deleted at the end (Phase E), after verification — including all AI-painting section-opener imagery for Section 2. Log unrelated defects to `docs/rebuild-observations.md`; do not fix them.

---

# 1. Phase A — Governing-document updates

Apply these edits to `docs/sections-1-3-rebuild-brief.md` exactly, as the session's first commit (message: `docs: argument freeze, revised 2.8 thesis, wayfinding device`).

## A1. New top-level section: "Argument freeze and R7 requirements"

Append as a new section at the end of the document:

> # 13. Argument freeze and R7 requirements
>
> The Section 4 argument spine was audited from first principles (28 July 2026) and is **frozen**: the 100-Year Test, the definition (an earned, transferable claim on value), the claim/carrier distinction, the inversion method, the ten properties, the five candidates, the no-verdict table, migration, and the marginal repricing mechanism. No future phase may alter these without the presenter reopening the freeze.
>
> The audit's findings are binding requirements for **Phase R7 (Section 4 execution rebuild)**:
>
> 1. **4.03 script:** justify the century as an x-ray for structural dependency (roughly the shortest horizon at which no particular institution's survival may be assumed); concede that trade-offs differ at short horizons; add the trapped-exit honesty (history's worst store-of-value failures were fast and closed the exit first — the 1933 class of event); land the line that the test is *"the question every saver eventually asks — asked calmly, in advance, instead of during the run."*
> 2. **4.04 script:** make the money/units bisection explicit and central — money is the earned claim; units are the notation; printing creates units, never claims, and redistributes purchasing power from every earned unit to the printed ones. Canonical line: **"You cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned."** Add the social-claim precision (not a legal claim on anyone in particular; a social claim on everyone in general — 1971 removed the legal anchor, not the claim-nature). Explicitly answer 3.6's planted question ("what is the bottom layer a claim on?").
> 3. **New beat (objections block): displacement, two-pronged.** History shows two ways to lose the monetary throne — *beaten* (categorically better arrives: the commodity era) or *captured* (custody centralized, claims over-issued, redemption cancelled: gold, 1971). Against being beaten: the frontier argument (absolute scarcity and near-zero transport/verification costs sit at their theoretical maxima; categorical improvement needs room that may not exist — stated as structure, not prophecy; the 2/5 track record already concedes the century stays a question). Against being captured: the resistance-to-control property, with the honest note (script or Q&A) that capture attacked gold's *custodial layer*, so the same vector aimed at Bitcoin runs through custodians and paper claims — which is why 4.15's self-custody holding assumption carries real weight.
> 4. **4.15 script:** the candidate-set line — why these five (where the world's savings actually sit, plus the one new entrant credibly claiming the base role on properties), and the why-no-other-digital-candidate answer (the palladium logic internally: base-layer properties — credible fixed supply, no issuer, resistance to control — plus the network bar leave one candidate; a coin with a foundation, a team, or a changeable schedule fails the properties, not just the network).
> 5. **4.16/4.17 scripts:** date the scores ("my judgments, as of 2026"); concede diversification during transitions at 4.17 (the margin mechanism works whether migration is wholesale or fractional).
> 6. **Steelman standard:** every objection beat is checked against the strongest institutional form of the objection, not the street form.
> 7. **Falsifiability line** (approved): one moment near the table or the close stating what evidence would change the scores (credible supply-integrity failure, sustained security-budget decay, protocol capture). Placement designed in R7.
>
> R7 also applies to Section 4: the script standard (§9.2), the pacing rule, the color arc, visual elevation toward the cold-open standard, and 4.22's harmonization onto the UnitField component.

## A2. Revised canonical thesis line (beat 2.8)

In §6, beat 2.8, replace the italic thesis sentence ("every money in this record was eventually displaced…") with:

> **[canonical, staged across advances]** *"No money in this record held the role forever. In the free competition, monies fell when something categorically better arrived. The last incumbent didn't fall that way — it was captured: its custody centralized, its claims over-issued, its redemption cancelled. Either way, the role moves. And the record has no reason to be finished."*

Rationale (add as a note): the gold→fiat transition was layering-by-choice followed by capture-by-force, not competitive displacement; the two-chapter framing is the historically accurate one and sharpens Section 4's question.

## A3. New subsection in §9: the wayfinding device and the color arc

Add to §9 (cross-cutting design):

> ## 9.3 The wayfinding device and the color arc
>
> Formal section openers (including all AI-painting imagery) are removed. Section boundaries are marked by the **waypoint return**: a brief interstitial in which the method line from 1.5 returns — completed waypoints settled and dim, the current section's waypoint igniting — then dissolves into the section's first beat. Choreography per section is specified in that section's session brief.
>
> **The color arc:** Section 1 is monochrome by design. The deck's accent (orange) enters for the first time at the ignition of the first waypoint, is used sparingly and structurally through Sections 2–3 (waypoint ignitions, rail emphasis, singular argumentative highlights), and reaches full deployment in Section 4 where it already lives. The accent is never decorative.

---

# 2. Phase B — Components

## B1. `EvolutionRail.js` (new; replaces the legacy EvolutionScene for the rebuilt section)

A persistent horizontal rail component used by slides 05–09 (continuity across slides via the container-scoped state pattern — no module-level caches):

- Visual language: a thin horizontal line with stops — the *same line-language* as the waypoint device (deliberate: the rail is the waypoint line's descendant; the deck's history literally runs along the line the method drew).
- Stops: minimal circular markers + small monochrome glyph + label. States per stop: `upcoming` (dim), `active` (lit; the only place rail-orange emphasis is allowed), `defeated` (settled low, with its one-line wound retained faintly), `abstracted` (for the ladder rungs of 2.6, rendered as compact risers above the gold stop).
- Viewport: the rail pans/zooms between builds (GSAP), with full-state reconstruction — any build renders its exact camera and stop states from scratch.
- The final dark extension + `?` marker (protected element) and the entrant marker for 2.8.
- Reduced motion: instant camera and state resolution.

## B2. Murmuration port

Port the legacy murmuration simulation (2.05) into the new architecture as `MurmurationField.js`: phase 1 (pure flocking) as-is in behavior and beauty; add phase 2 (convergence): steering weights shift over ~4–6s so the flock organizes into orbit around a brightening point that resolves into a single token glyph. Reduced motion: two static frames (mid-murmuration; converged). Preserve the legacy static fallback asset if suitable, else render new stills from the simulation.

## B3. Element grid (for the periodic elimination)

A lightweight component rendering a stylized periodic table (element cells: symbol only, monochrome) supporting staged elimination waves with distinct exit treatments (drift-off for gases; corrode/dim for reactive; pulse-out for radioactive; settle-dim for the merely impractical), leaving Au and Ag lit. Canvas or DOM at implementer's discretion; must hold 60fps; reduced-motion: final two-survivor state instantly.

---

# 3. Phase C — Slides

Slide modules in `src/slides/section-2-origin/` (new directory). On-screen copy is implement-verbatim; scripts install verbatim as notes. Register: Section 1's austerity carries through; the first orange in the deck appears exactly where specified.

---

### `00-waypoint-origin` (the first waypoint return)

**Build 0:** black; the method line from 1.5 fades in exactly as 1.5 left it — three waypoints, dim, familiar.
**Build 1:** the first waypoint ignites — **the first orange in the presentation** — a slow warm bloom on the marker; its label brightens: "Ask where it came from." The other two stay dim.

*Script:*

So — first question.

[→] Where does money come from? Not who prints it, not whose face is on it — where the *phenomenon* comes from. Because if you want to know what something is, the single most revealing thing you can do is watch it be born. So let's take money away — completely — and watch what happens.

---

### `01-the-world-without-it` (beat 2.1)

**Build 0:** two minimal figures/nodes, labeled: FISHERMAN — HAS fish · WANTS sandals; SANDAL-MAKER — HAS sandals · WANTS grain. A connecting line attempts to form between them and dies (dims, marks ✕).
**Build 1:** a third node joins: FARMER — HAS grain · WANTS fish. The triangle completes; every pairwise line attempts and dies in sequence. Each HAS points at the *next* person's WANTS — the cycle is visible, and no direct trade works.
**Build 2:** the wall named, on-screen: **"The coincidence of wants."**

*Script:*

[→] Here's a world with no money in it. A fisherman, with fish to spare, who needs sandals. A sandal-maker, with sandals, who needs grain. Trade should be easy — except the sandal-maker doesn't want fish.

[→] Add the farmer, who has grain and wants fish, and look at the shape of the problem: everyone has something someone wants. Nobody has what the person *in front of them* wants. Every direct trade fails. The wealth is all there — it just can't move.

[→] Economists call this the coincidence of wants: for direct exchange to work, you must want exactly what I have, and I must want exactly what you have, at the same time, in the right amounts. Wherever exchange happens without money, this wall appears. And every trading society in history has hit it.

---

### `02-the-discovery` (beat 2.2)

**Build 0:** the triangle, reconstructed, wall still standing.
**Build 1:** the move: the fisherman hands fish to the sandal-maker — who *doesn't want fish* — and receives sandals. The fish glyph travels with a distinct traced path; the sandal-maker holds it, unconsumed.
**Build 2:** the sandal-maker passes the fish onward to the farmer for grain. The cycle clears — all three connecting lines settle lit; everyone holds what they wanted.
**Build 3:** on-screen: **"Money is born the moment someone accepts a good they do not want — to trade it away later."**
**Build 4:** on-screen, beneath: **"Some goods are easier to sell on than others. That property has a name: salability."** (The term's one and only introduction.)

*Script:*

[→] Now watch one person solve it. The sandal-maker accepts the fish — not to eat it. To *pass it on*. That one decision — accepting a good you don't want, because someone else will — is the invention. Except nobody invented it.

[→] The fish moves on to the farmer, the grain comes back, and the circle clears. Everyone ends up with what they wanted, and the thing that made it possible was a good acting, for one link of the chain, as a go-between.

[→] That is the birth of money. Not a decree, not a committee — a discovery, made independently by every trading society on Earth, because the wall is the same everywhere.

[→] And the moment it's discovered, a new question appears: *which* good should you accept to pass on? You want the one others are most likely to take. Some goods are easier to sell on than others — and that property has a name: salability. Hold onto that word. The entire history of money is a competition over it.

---

### `03-the-convergence` (beat 2.3 — the murmuration)

**Build 0:** the murmuration, phase 1 — full screen, thousands of agents, no leader.
**Build 1:** phase 2 — the flock organizes, orbiting and tightening around a brightening point that resolves into a single neutral token glyph.
**Build 2:** on-screen, minimal: **"Nobody decides. Everyone converges."**

*Script:*

[→] So how does a whole society pick its go-between good? Watch. No bird in this flock is in charge. Every one of them is just watching its neighbors and adjusting. And out of thousands of private decisions comes one coherent motion.

[→] Money converges exactly like this. Every trader privately asks: what will *others* accept? And because everyone is watching everyone, the choices collapse toward a single good. The most salable good wins — not by vote, not by decree, by convergence.

[→] Nobody decides, and everyone converges. Money is an emergent order — like language. Nobody invented English; no law requires it; hundreds of millions coordinated on it anyway, because a shared standard is worth more than a private preference. Now — governments have stamped, standardized, and monopolized money throughout history. That's real, and we'll get to it. But the phenomenon itself is older than any state, and it has never needed one to exist.

---

### `04-the-competition` (beat 2.4)

**Build 0:** four contenders appear in a row, minimal monochrome glyphs, labeled: CATTLE · SALT · SHELLS · IRON.
**Builds 1–4:** one advance per contender; each receives its single wound as a settled line beneath it (contender dims as the wound lands):
- CATTLE — **"Cannot be divided. Half a cow is no cow."**
- SALT — **"Dissolves in a rainstorm."**
- SHELLS — **"Scarce only until someone reaches the right beach — supply one ship away from collapse."**
- IRON — **"Rusts. And anyone with a furnace can make more."**
**Build 5:** the law, on-screen: **"The market keeps re-running one experiment — and keeps selecting the good that survives across space, across time, across scale."**

*Script:*

[→] Once you know the contest is about salability, all of monetary history snaps into focus. Every culture entered its own candidates. Cattle — genuinely valuable, and genuinely useless the moment you need to make change. You cannot divide a cow and keep it a cow.

[→] Salt — precious, portable, and gone in one bad storm.

[→] Shells — beautiful and scarce, right up until scarcity turned out to be local. Their supply was one ship away from collapse. Remember that one; you're about to see the ship arrive.

[→] Iron — abundant, which is the problem. It rusts, and anyone with a furnace can make more of it.

[→] Different centuries, different continents, same experiment, and the market keeps selecting for the same thing: the good that survives across space — you can move it; across time — it keeps; across scale — you can split it and lump it. Hold those three dimensions. They will follow us for the rest of this presentation.

---

### `05-the-rail-rises` (beat 2.5, part one — the rail enters; the receipt)

**Build 0:** the rail fades in — the same line-language as the waypoints — carrying the early stops: SHELLS · CATTLE · SALT · IRON (and unlabeled minor marks), all lit as contenders.
**Build 1:** the receipt: the SHELLS stop takes its defeat — one line lands beneath it: **"West Africa, 1500s–1800s: industrial shipping made aggry beads cheap to import. Local savings, wiped out by supply."** The stop settles to `defeated`.
**Build 2:** the camera eases right; the METALS stop rises and brightens.

*Script:*

[→] Let's lay the whole record on one line — the rail we'll ride for the rest of this section. Here are the early contenders, each of them money, somewhere, for centuries.

[→] And here is the shell story ending, exactly as set up. When European ships reached West Africa carrying industrially produced beads, the beads' scarcity — which had always been an accident of distance — collapsed. The people holding their savings in beads were not out-traded. They were out-*supplied*. Remember this defeat; it is the oldest version of a very modern problem.

[→] Out of the wreckage, one family of goods keeps rising, on every continent that has them: the metals. Hard to make more of. Slow to decay. Divisible without dying. The competition is about to get much narrower.

---

### `06-two-survivors` (beat 2.5, part two — the periodic elimination)

**Build 0:** the stylized periodic table, all elements lit, monochrome. On-screen kicker: **"Run the competition over the whole table."**
**Build 1:** the gases drift off — *"Anything that floats away is out."*
**Build 2:** the reactive and corroding metals dim in a corrosion wave — *"Anything that rusts, burns, or dissolves is out."*
**Build 3:** the radioactive elements pulse out — *"Anything that kills the holder is out."*
**Build 4:** the impractical rest settles dim (too common, too hard to work); **Au and Ag remain lit, alone.** One line: **"Chemistry leaves two candidates."**

*(Each elimination line renders small beneath the table as its wave runs; the waves are single visual gestures — auto-timed internally, one advance each, per the pacing rule.)*

*Script:*

[→] Here's my favorite way to see how narrow the funnel really is. Forget history for a moment — run the salability competition across every element that exists.

[→] The gases are out — your money should not float away.

[→] Everything that rusts, burns, or dissolves in water — out. That removes most of the table, including iron, and it's why the rainstorm mattered.

[→] The radioactive row — out, for reasons I hope are obvious.

[→] Strip away what's too common to be scarce and what can't be worked, and chemistry — not culture, not politics, *chemistry* — leaves you two survivors: silver, and gold. Every civilization that could refine metals converged on the same two, without consulting each other. That is what convergence on properties looks like at planetary scale. And between the two, the scarcer one, the one that doesn't tarnish at all, took the throne: gold won everything.

---

### `07-the-abstraction-ladder` (beat 2.6)

**Build 0:** the rail, GOLD stop `active` (its win settled). Gold's own wounds land compactly beside it: *heavy · hard to verify · dangerous to move.*
**Build 1:** the first riser above the gold stop: **COINAGE** — line: *"Solves verification and division. Trust required: the mint."*
**Build 2:** the second riser: **PAPER** — line: *"A claim on gold in a vault. Trust required: the vault."*
**Build 3:** the law, on-screen: **"Each rung buys convenience — and pays for it in trust."**

*Script:*

[→] So why isn't there gold in your pocket? Because winning the properties contest didn't cure gold's own weaknesses. It's heavy. It's hard to verify — bite marks and touchstones only get you so far. And moving a fortune in it is an invitation to lose one.

[→] So people built upward. Stamp the metal into standard coins and you've solved verification and division at a stroke — as long as you trust the mint.

[→] Then the second rung: leave the gold in a vault and trade the paper — a claim on gold in a vault, lighter than air by comparison, good across any distance the issuer's name can travel. As long as you trust the vault.

[→] See the pattern: each rung up the ladder buys convenience, and pays for it in trust. The coin trusts the mint. The note trusts the vault. For a long time, that exchange rate looked like a bargain. Now watch what happens when the trust gets stretched to breaking.

---

### `08-the-severance` (beat 2.7)

**Build 0:** the ladder standing over the gold stop; the date lands, large, alone: **1971.**
**Build 1:** the cut: the link between PAPER and GOLD severs (a clean visual break; the ladder detaches and holds suspended; the gold stop recedes to dim). On-screen: **"Redemption ends. For the first time in the record, the world's money is pure decree — the trust rung with nothing under it."**
**Build 2:** the chart: purchasing power of one unit of major currencies, 1971 = 100, declining — USD, GBP, JPY, CHF on one axis. Chart headline: **"What one unit still buys."** Data flagged `PROVISIONAL` pending R4 sourcing (structure and design final; figures verified in R4; `SOURCES.md` stub entry now).
**Build 3:** the balance, on-screen, both lines: **"The most universally accepted medium of exchange in history."** / **"Extraordinary at moving value. Measurably poor at storing it."**

*Script:*

[→] Nineteen seventy-one. By this point the world's gold sits concentrated in central banks, and the dollar — the vault-note of the whole system — is redeemable in it, at least on paper. But the notes have been over-issued: spent into wars and programs far beyond the gold behind them. Other countries start showing up with dollars, asking for the metal. There isn't enough.

[→] So in August 1971, the redemption window closes. Officially temporary; permanent ever since. Call it what the record shows: the issuer of the claims could not honor them, and cancelled them instead. The paper layer — the whole ladder of convenience — detaches from its base. For the first time in the entire record, the world's money is pure decree. The trust rung, with nothing under it. And to be precise about what keeps it in use now: law. Taxes are payable in it, and only in it. This chapter of the story was not a convergence.

[→] So how has the new arrangement performed at the oldest job — carrying value through time? Here is what one unit of the major currencies still buys, measured from that year. Every line on this chart — including the strongest currency of the era, the Swiss franc — goes one direction. Not one government's scandal. Every issuer, every continent, the same slope. That is not mismanagement. That is a structural property of the design.

[→] And now the honest other half, because it matters: this same system is the most universally accepted medium of exchange in human history. Payments have never been faster, cheaper, or more convenient. Both facts on one screen — because both are true. The reigning money is extraordinary at moving value, and measurably poor at storing it. Keep that exact wound in mind. The entire second half of this presentation walks into it.

---

### `09-the-pattern` (beat 2.8)

**Build 0:** the camera pulls back — **the full rail in one frame for the first time**: contenders → metals → gold with its risers → the severed fiat mark. A held, quiet frame.
**Build 1:** thesis, chapter one, on-screen: **"In the free competition, monies fell when something categorically better arrived."**
**Build 2:** thesis, chapter two, on-screen: **"The last incumbent didn't fall that way — it was captured: custody centralized, claims over-issued, redemption cancelled."**
**Build 3:** the closing of the thesis, on-screen: **"Either way, the role moves. And the record has no reason to be finished."** The rail extends right, into dark; the **`?`** appears.
**Build 4:** the entrant, at the rail's dark edge, smallest type on the slide: **"2009: digital · no state, no company · supply fixed by its own rules."**
**Build 5:** the limitation, same register, beneath: **"Very young. Its price still swings far more than the monies it would compete with. Seventeen years into a hundred-year question."**

*Script:*

[→] Pull back, and look at the whole record at once. Every stop on this line was money — real money, someone's life's work — somewhere, for a long time. And no stop held the role forever.

[→] In the free competition, the pattern is clean: monies fell when something categorically better arrived. Not slightly better — categorically. Metal over shell. Coin over ingot. Each transition, a property revolution.

[→] The last transition broke the pattern. Gold was never out-competed — nothing categorically better ever arrived. It was captured. Its custody centralized into a few vaults, the claims on it over-issued, and when the claims came due, redemption was cancelled. The incumbent that reigns today didn't win the competition. It ended it.

[→] Either way — beaten or captured — the role moves. And there is no reason to believe the record is finished. Which brings us to the newest mark on the line.

[→] In 2009, something appeared that had never existed before: a digital good, issued by no state and no company, with a supply fixed by its own rules. I'm going to describe it in exactly that neutral register, because describing is all we're equipped to do so far.

[→] And in the same breath, the honest part: it is very young. Its price still swings far more than the monies it would compete with. It is seventeen years into a hundred-year question. Does it belong on this rail? I'm not going to answer that — because we don't yet have the tools to answer it. To judge *any* candidate for this role, we need to know precisely what a money must do. That's the second question on our line — and it's next.

---

# 4. Phase D — Verification

1. `npm run build` clean; full deck traversal forward/back/forward (Section 1 → new Section 2 → seam into legacy Section 3 → Section 4 → close); no stale or blank content; the new seam (09 → legacy Section 3 opener) noted in the report, not smoothed.
2. Direct entry at every build of all ten new slides; refresh mid-animation on 03 (murmuration), 06 (elimination), 08 (severance) reconstructs exact state.
3. Reduced-motion pass over every build, including both murmuration phases and all elimination waves.
4. Performance: murmuration phases, elimination waves, and rail camera moves hold 60fps at 1080p; report measurements.
5. Pacing-rule audit: every script `[→]` count matches its slide's build count exactly, per slide, in a table in the report.
6. Constitution gates on new files: banned terms; "claim" appears in Section 2 exactly once as the planted rung (slide 07, build 2 and its script — the 02 slide's "accepts a good… to trade it away later" wording deliberately avoids the word); American English; typographic apostrophes; the color-arc rule (no orange anywhere in Section 2 except the waypoint ignition and rail `active`-stop emphasis).
7. Chart data marked PROVISIONAL in code comment + `SOURCES.md` stub; no invented precision (indexed shapes acceptable pending R4).
8. Screenshots: every build of all ten slides; the full-rail pull-back frame; the first-orange waypoint ignition. Save under `review/rebuild-r2/screenshots/`.
9. Phase E: delete legacy Section 2 modules, scenes (EvolutionScene and its consumers), and now-unreferenced assets including the Section 2 opener painting; clean `assets.js`; grep-verify zero references; build.
10. Write `docs/r2-report.md`: per-phase changes, verification evidence, performance numbers, the `[→]`/build table, deviations with rationale, observations logged.

Stop after the report. Do not merge.
