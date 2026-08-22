# Rebuild Session Brief — R2.1 (Section 1–2 Revisions: Continuity, Icons, Rail)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Presenter-review revisions to the delivered Sections 1–2. Seven changes (A–G) plus verification. Standards in force per `docs/sections-1-3-rebuild-brief.md` and the R1/R2 session briefs. On-screen copy and scripts below are implement-verbatim.
**Branch:** continue on `rebuild-r2-section-2` (unmerged).
**Date:** 29 July 2026

---

# A. Engine: continuity groups (kill the black flash)

**Problem:** the engine's default transition (teardown → fade through black → mount) fires between slides that share one continuous visualization, producing a black flash mid-scene (e.g. the hours field between slides 01→02; the rail between the ladder, severance, and pattern slides).

**Fix:** add a continuity-group mechanism:

1. Manifest entries may declare `sceneGroup: "<key>"` (e.g. `hours-field`, `evolution-rail`). Consecutive slides with the same key form a group.
2. At a within-group boundary the engine performs a **handoff**: no fade-to-black, no unmount of the shared scene layer. The shared component (container-scoped, per the established pattern) stays mounted; the incoming slide adopts it and animates from its current state; only slide-local overlays (text layers) transition.
3. Between groups (or where no group is declared) the existing transition is unchanged.
4. Direct entry and refresh at any slide/build still reconstruct the full scene state from scratch — the group changes *transitions*, never state ownership. Back-navigation across a group boundary hands off in reverse.
5. Reduced motion: handoffs resolve instantly (already no fade).

**Apply groups:** `hours-field` → slides 01, 02 (Section 1). `evolution-rail` → the merged competition-record slide (§E), the abstraction ladder, the severance, and the pattern slide.

**Designed exception — the periodic table:** the rail → table → rail boundaries do not join the rail group. Instead: on entry, the table rises **over the rail, which dims in place beneath it** (rail stays mounted, heavily dimmed); on exit, the table lifts away and the rail re-brightens. Spatial continuity, no void, and the return to the rail reads as a return. Reduced motion: instant states.

---

# B. Merge the waypoint ignition into 1.5 (delete `00-waypoint-origin`)

**Rationale:** the waypoint device's value is the line *returning after absence*; at the S1→S2 boundary it reappeared four seconds after 1.5 introduced it, creating redundancy plus a black gap. The device now debuts as an interstitial at the S2→S3 boundary (designed in R3).

**Changes:**

1. `05-the-promise` gains a final build (Build 6): **the first waypoint ignites** — the first orange in the presentation. Ignition spec (also the standard for all future waypoint returns): the active marker scales to ~2× the inactive markers; full accent orange with a soft bloom halo; a single slow ignition pulse (~1.2s) as it lights; its label ("Ask where it came from.") rises to warm white; the other two labels and markers dim a step further. Reduced motion: end state instantly.
2. Delete `src/slides/section-2-origin/00-waypoint-origin.js`; manifest renumbers.
3. `05-the-promise` script: replace the final paragraph block (from "One promise before we start…" to the end) with:

> One promise before we start. By the end you'll have a framework — not my conclusions, a framework you can check for yourself. Nothing in this presentation is financial advice; it's an education in a thing you were never taught. And you shouldn't take anyone's word on money anyway. By the end, you'll see why that's rather the point.
>
> [→] So — first question. Where does money come from? Not who prints it, not whose face is on it — where the *phenomenon* comes from. Because if you want to know what something is, the single most revealing thing you can do is watch it be born. So let's take money away — completely — and watch what happens.

4. Update `docs/sections-1-3-rebuild-brief.md` §9.3: the waypoint return appears at section boundaries **from S2→S3 onward**; at S1→S2 the ignition lives inside 1.5. Add the ignition spec (point 1) as the device's standard.

---

# C. Icon grammar (custom glyph set + placement rules)

**Problem:** the current glyphs read as icon-library stock — below the deck's craft standard — and their placement is asymmetric (off-center from their nodes; goods travel on free arcs).

**Fix — the WIM icon grammar:** design and hand-draw a custom SVG glyph set on one system: a shared geometric construction grid (~48u), one stroke weight, consistent corner treatment, distinctive simplified silhouettes (not clip-art poses), monochrome, with the deck's soft luminance treatment (subtle glow matching the unit-field tone; the glow token, not a new one). Redraw: fish, grain, sandals, cattle, salt, shells, iron, metals, gold, plus the ladder-riser marks. Document the grammar in a short comment header or `docs/icon-grammar.md` so R3's glyphs (functions, stages, palladium) inherit it.

**Placement rules (symmetry):**

1. Every node icon centers on a consistent anchor: icon centered directly above its node dot, fixed offset, identical across all nodes of a slide.
2. Goods-in-transit travel **along the triangle's edges** (the drawn lines), not free arcs — the fish's journey in the discovery slide follows FISHERMAN→SANDAL-MAKER edge, then SANDAL-MAKER→FARMER edge, glyph riding the line with a small consistent normal offset.
3. Labels (name, HAS/WANTS) keep one shared baseline grid across the three nodes.
4. Contender rows and rail stops: glyph centered above marker, label centered below, one vertical rhythm (see §G2).

Apply across slides 01–02 of Section 2 (triangle slides), the merged competition-record slide, and all rail stops.

---

# D. Rail final state: name the entrant; seat fiat

1. **BITCOIN is named.** The entrant stop carries the label `BITCOIN` in the same stop typography as every other rail stop. Beneath it, unchanged, the two-line neutral description: `2009: digital · no state, no company · supply fixed by its own rules.` and the limitation line. Naming is description; withholding the name reads as coyness. Update the pattern slide's builds accordingly (the name appears with the entrant build).
2. **FIAT joins the rail — as the one stop that does not touch the line.** After the severance, the detached paper layer settles as a marker labeled `FIAT` floating a fixed distance *above* the rail line, to the right of GOLD, with **no connector down to the line** — every money in the record sits on the line; the current one hovers over it, unanchored. One small line beneath the label: `1971– : decree.` In the severance slide (08), the cut animation resolves into exactly this state (the paper rung *becomes* the FIAT marker — one continuous idea across the group). The pattern slide (09) inherits it in the full-rail frame.
3. Script touch-ups (severance, final paragraph of the second script block): append one sentence — *"And that floating mark is where the world's money still sits today: on the record, but not on the line."* Pattern-slide script: in the chapter-two paragraph, after "It ended it.", insert: *"That's why it sits above the line, touching nothing."*

---

# E. Merge the competition and rail-rises slides

Replace `04-the-competition` and `05-the-rail-rises` with a single slide, `04-the-competition-record`, in the `evolution-rail` scene group. The redundancy (wounds revealed twice) is eliminated by transformation: the contenders' row **becomes** the rail.

**Builds:**

- **Build 0:** four contenders in a row (custom glyphs per §C): CATTLE · SALT · SHELLS · IRON. No line yet.
- **Builds 1–4:** one wound per advance, verbatim as delivered (cattle/salt/shells/iron lines unchanged).
- **Build 5:** the law, on-screen: **"The market keeps re-running one experiment — and keeps selecting the good that survives across space, across time, across scale."**
- **Build 6:** the transformation: the law line clears; **a line draws itself horizontally through the four contenders** — stops form beneath each glyph, the wound texts condense to the small faint `defeated` treatment, the composition eases into rail geometry. The row the viewer has been watching *is* the record.
- **Build 7:** the receipt: the SHELLS stop takes its dated defeat line (West Africa aggry-beads text, verbatim as delivered).
- **Build 8:** the camera eases right; METALS rises and brightens (active/orange emphasis per rail rules).

**Script (replaces both former scripts; verbatim):**

[→] Once you know the contest is about salability, all of monetary history snaps into focus. Every culture entered its own candidates. Cattle — genuinely valuable, and genuinely useless the moment you need to make change. You cannot divide a cow and keep it a cow.

[→] Salt — precious, portable, and gone in one bad storm.

[→] Shells — beautiful and scarce, right up until scarcity turned out to be local. Their supply was one ship away from collapse. Remember that one; you're about to see the ship arrive.

[→] Iron — abundant, which is the problem. It rusts, and anyone with a furnace can make more of it.

[→] Different centuries, different continents, same experiment — and the market keeps selecting for the same thing: the good that survives across space, across time, across scale. Hold those three dimensions. They will follow us for the rest of this presentation.

[→] Now watch what these four have been standing on all along. Lay the whole record on one line — this is the rail we'll ride for the rest of the story, and every mark on it was money, somewhere, for centuries.

[→] And here is the shell story ending, exactly as promised. When European ships reached West Africa carrying industrially produced beads, the beads' scarcity — which had always been an accident of distance — collapsed. The people holding their savings in beads were not out-traded. They were out-*supplied*. Remember this defeat; it is the oldest version of a very modern problem.

[→] Out of the wreckage, one family of goods keeps rising, on every continent that has them: the metals. Hard to make more of. Slow to decay. Divisible without dying. The competition is about to get much narrower.

---

# F. Craft punch list

1. **Label clipping (bug):** at every rail camera position, all visible stop labels and wound texts must lay out fully inside the viewport — no text may clip at frame edges (the shells wound text currently clips left at the metals position). Implement camera-aware label layout or padding constraints; verify at every build's camera.
2. **Vertical rhythm:** wound texts and stop labels sit on a consistent two-row rhythm (label row; wound row), identical heights across stops — no staggered baselines.
3. **Discovery paths:** per §C.2 — goods ride the edges; remove the crossing free arcs.
4. **Full-rail frame composition (pattern slide, Build 0 and thesis builds):** recompose so the frame reads monumental, not top-heavy: rail at ~62% stage height; thesis block optically centered in the space above it, max width ~1400px; nothing below the rail but the floating FIAT mark and stop labels. Verify at 1920×1080 against screenshots.
5. **Waypoint ignition retrofit:** apply the §B ignition spec to the 1.5 final build (it is the reference implementation of the device).

---

# G. Verification

1. Build clean; full deck traversal forward/back/forward. **Zero black flashes inside scene groups** — verify by frame-capture across the 01→02 boundary and every rail-group boundary, both directions; the table rise/lift transition verified likewise.
2. Direct entry and mid-animation refresh at every build of every changed slide, including the merged 04 (all nine states) and the new 1.5 Build 6.
3. Reduced-motion pass over all changed builds (handoffs, ignition, line-draw, table rise).
4. Pacing audit: updated `[→]`/build table for 1.5 and the merged 04; counts must match.
5. Constitution gates re-run on changed files (color-arc rule: orange only at ignition and rail active/emphasis; banned terms; American English; apostrophes).
6. Icon grammar: all redrawn glyphs render at their placements; symmetry rules verified by screenshot overlay (node anchor offsets identical); no legacy icon-font glyph remains in Sections 1–2.
7. Screenshots: every build of changed slides; the ignition; the line-draw transformation sequence; the FIAT floating mark in both severance end-state and full-rail frame; a clipping sweep at every rail camera. Save under `review/rebuild-r2/screenshots-r2-1/`.
8. Append an R2.1 section to `docs/r2-report.md`: changes, verification evidence, the frame-capture results for flash checks, deviations with rationale.

Stop after the report. Do not merge.
