> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R7 Phase Report — Section 4: The Execution Rebuild

**Branch:** `rebuild-r7-section-4` (not merged) · **Base:** `main` at `e6bd27f`
**Brief:** `docs/r7-session-brief.md` · **Governing:** `docs/section-4-master-document-v2.md`, `docs/sections-1-3-rebuild-brief.md` §13
**Date:** 31 July 2026

Section 4 is still twenty-three slides and the deck is still forty-six. The
argument spine is untouched: the fifty scores are byte-identical to the branch
point, 4.23's visible frame is byte-identical as rendered, and the ten
failure/property pairs are the same file. What changed is everything around
them — the section's entry, its objections block, the twenty-four scripts, the
pacing those scripts forced, the hand the section is drawn in, and the close.

---

## 0. Preconditions

Performed on `main` before branching, per §0.1:

- `docs/r7-session-brief.md` committed (`74c98d3`).
- `rebuild-r4-data` merged `--no-ff` as **`Merge R4+R4.1: data, sources, and copy rulings`** (`b093ca1`); `npm run build` verified clean on `main` afterward.
- `docs/section-4-master-document-v2.md` committed (`896ea2a`).
- `docs/section-4-master-brief.md` and `docs/section-4-narrative-master-document.md` moved to `docs/archive/` (`cb23f36`) under a one-line superseded-by header (`e6bd27f`).

Branch `rebuild-r7-section-4` cut from `e6bd27f`. Five phase commits follow.

---

## 1. Phase A — Structure

### 1.1 The section entry: a merge, not an opener

`01-ideal-store-of-value.js` — the image-led title card — is deleted, and
`store_of_value.png` with it. The define-the-job content survives as
`01-define-the-job.js`, the section's true first slide, and Section 3's closing
waypoint crossfades straight into it. The old opener's one necessary sentence
opens the new script ("So let's take that third question and answer it
properly — from first principles").

It is also restaged, because the old slide had a blank build: at its build 2
the phrase had cleared and the question had not yet arrived, so the frame was
empty and unspoken-over. Now:

| build | frame |
|---|---|
| 0 | the authored black the waypoint's ignition dissolves into |
| 1 | **STORE OF VALUE** |
| 2 | *VALUE* takes the accent; STORE OF goes quiet |
| 3 | the phrase clears; **What exactly is being stored?** |
| 4 | **Start where money is earned.** |

Four builds, four advances, nothing blank.

### 1.2 The falsifiability beat — `20b-what-would-change-these-scores.js`

New slim slide closing the objections block: a kicker on black, three
conditions accumulating in one centered stack, and — settled beneath them, in
exactly the typographic register 4.16 gives it — the deck's second and final
**"Don't trust. Verify."** Five builds, five advances. The script is installed
verbatim from §3.6; the two-prong displacement writeup from §3.7 is installed
at the end of its notes, marked `— Q&A ARSENAL (not spoken in the recording) —`.

### 1.3 The close carries the completed road

`section-5-close/01-thank-you.js` gains one build before the release. The
method line from 1.5 returns through the shared `WaypointInterstitial` with all
three waypoints in `completed` state, and one slow warmth pulse travels the
whole line, left to right — the order the three questions were asked — and does
not repeat. Then the line dissolves and the retained frame stands alone: the
silent `Thank you.` at 132px, unchanged (the suite asserts the string and the
computed font size).

The close's build 0 is authored black, which is where 4.23's hold now lives:
the conclusion dissolves, black holds, the road returns, the thanks rises.

### 1.4 Numbering: deliberately not renumbered

The brief says "renumbered throughout; deep-link IDs preserved for retained
slides," and those two pull in opposite directions. Resolved in favour of the
ids and of the project's shared vocabulary: **Section 4 keeps its shipped slide
numbers.** Every governing document, the freeze register and the brief itself
speak in 4.NN — the brief names the new slide "20b" — so renumbering would have
invalidated all of it to gain nothing. The merged entry takes the vacated 01;
the new beat enters as 20b; every retained slide keeps its `id`. The absolute
`number` fields (advisory since main.js normalizes them at boot) are corrected
to 23–45 for Section 4 and 46 for the close.

The one id that changes is the merged entry's: `4-02-define-the-job` →
`4-01-define-the-job`. It is a new slide made of two, the brief authorizes the
rename, and both of its predecessors' ids named things that no longer exist.

### 1.5 The displacement disposition, as amended

Implemented per the presenter's ruling: **script level, not slide level.** The
frontier passage extends 4.15; the full two-prong writeup is 20b's Q&A arsenal.
Recorded in `docs/section-4-master-document-v2.md` §3.2 and in the freeze
register at `docs/sections-1-3-rebuild-brief.md` §13.3, both with the
presumes-a-throne rationale.

---

## 2. Phase B — Notes → script, and the pacing the scripts forced

Every Section 4 slide outside the hand-drafted set is now a recording script:
first-person spoken prose, `[→]` on every advance, the argument and every
qualification preserved, no explainer voice (gated). Where the frames outran
the speech — or the speech outran the frames — the builds were restaged.

| slide | builds | why it moved |
|---|---|---|
| 4.05 spend or save | 5 → **4** | build 3 returned the stage to neutral between SPEND and SAVE; nobody spoke over it |
| 4.09 the future is unknowable | 4 → **5** | the known/unknown line had no advance of its own, so the first pair of unknowns landed under it |
| 4.10 invert the question | 2 → **2** | builds 1 and 2 rendered an identical frame. The inversion lands on 1, the stress stage on 2 |
| 4.13 failure to requirement | 1 → **2** | ten inversions under one spoken sentence; they now sweep in the two groups they were derived in |
| 4.14 the ten properties | 0 → **2** | the section's worst pacing defect — the complete list stood at build 0 while all ten were read over it |
| 4.19 other assets | 4 → **5** | real estate stood at build 0, unspoken |
| 4.22 fixed supply | 2 → **3** | the margin appearing and demand arriving were one build carrying two halves of one mechanism |

4.03's six capability labels stay one spoken list and one build, but they now
arrive in the order the sentence names them, live only — 3.2's Argentina-row
pattern, which is the sanctioned form of auto-timing (a sequence *inside* one
gesture, never a sequence of separately advanced lines).

**Architecture.** Every Section 4 and Section 5 slide adopts the reconstruction
snap the deck has used since R2, factored into `src/slides/_snapFrame.js`
(`clampStep` / `markReconstruct` / `beginBuild`). Any apply that is not a live
forward advance carries `data-snap` for two frames, which kills transitions
*and delays* — several Section 4 reveals are authored with 280–320ms delays and
one with a per-column 58ms stagger, and a reconstruction that honours those is a
reconstruction the viewer watches assemble. `data-live` is the other half: every
stagger R7 adds is gated to it, so nothing replays when the snap lifts.

---

## 3. Phase C — The hand-drafted scripts, and the two steelman modules

All ten install-verbatim scripts are installed and their slides restaged to
match. The spot-check gate asserts sixteen of their fixed sentences on stage.

- **4.04** — the definition pays Section 3's planted debt ("what is the bottom layer a claim on?"), lands the social-claim precision and 1971. Restaged so the scene leaves and the claim does not: at build 3 the surgery, the sum and the question all go and the claim stands alone; at build 4 it is released to centre stage, larger, holding the exchange open.
- **4.06** — the money/units bisection is the third beat, and it is *drawn*: the lineage of carriers recedes while the claim inside the shell holds. The bodies are notation; the money was always the thing inside.
- **4.08** — 4 builds → **3**, because the script has three arrows. The four statements are one spoken paragraph, so they stand together as a block (sequenced inside one gesture) instead of replacing one another under a single beat; then the century; then the arrival.
- **4.15** — 3 builds → **4**. A new beat where the five settle into one candidate set carries the "why these five / why no other digital candidate / why not the next one in 2080" passage.
- **4.16** — the on-screen line becomes **"Don't trust. Verify."**, and the specificity moves into the script, where the scores are dated ("my judgments, as of 2026") and every one is called an invitation. The score reveal splits along the two groups the properties were derived in (2 builds → **3**), so a four-minute walk-through has somewhere to breathe. All fifty scores unchanged.
- **4.17** — the diversification concession at the migration claim.
- **4.21** — the asked-calmly line, as the five candidates stand equal.
- **4.23** — 4 builds → **2**, because the script has two arrows. The recap is one paragraph, so its four lines land as one gesture. The final frame is unchanged and gated as such.
- **the close** — §3.12 verbatim, over the completed road and the retained frame.

### 3.1 §3.9 — the steelman modules, and two placement judgments *(flagged for presenter review)*

**The native-yield module → 4.18 and 4.19.** 4.18 takes the saving/investing
distinction and "under depreciating money, investing has become the new saving";
4.19 takes "yield is compensation … and it always has a source" and "the absence
of native yield is not the advantage — the absence of a *required*
yield-producing counterparty is." The existing demand-floor honesty is
preserved alongside it, unchanged.

**The stability module → 4.20's final three builds.** The brief expected it to
go "wherever volatility is answered." Section 4 does not answer the volatility
objection anywhere — it never raises it; 4.22 qualifies a *mechanism* with the
symmetry note and that is all. So the brief's own fallback applies: the module
becomes the final builds of the slide preceding 20b. Executed as pure
typography, no new component: the coexistence frame clears and **STABILITY** is
put under the same lens 4.01 uses on "store of **VALUE**" — the market's
valuation (demand · liquidity · expectations) against the architecture of the
claim (supply rules · ownership rules · verification · control) — resolving on
*Architecture protects the integrity of the claim. The market decides what the
claim can buy*, and then on *Bitcoin does not fix its price. It fixes the rules
through which the market discovers its price.* Slide 4.20 goes from 3 builds to
7.

**What the presenter should decide:** whether the volatility answer belongs at
the end of 4.20 (where it closes the objections block, immediately before the
falsifiability beat) or at 4.22 (where the deck's only other price material
lives, but *after* 20b). The module's argumentative sentences are fixed either
way; only the seam moves.

---

## 4. Phase D — Visual and craft integration

### 4.1 The icon grammar reaches Section 4

Three new glyphs through the studio — three genuinely distinct candidates each,
contact sheet regenerated, selection recorded with the reasons the other two
failed:

| glyph | selected | rationale, and what the other two did |
|---|---|---|
| **real-estate** | **A — the gable** | The building as its own silhouette: two roof strokes to an apex over the walls, a ground line running past both, one door aperture, eaves dotted. Legible at every size. *B, the elevation,* mushed into a grid at riser scale; *C, the plot,* read as a picture frame — a legend problem, which the grammar's legibility rule fails outright. |
| **shares** | **A — the parted round** | The whole with one part taken out and set beside it, on its own radius, the same size as the gap it left: a share is a fraction of an enterprise and the fraction is what you hold. It encodes no data, so it is a diagram of ownership rather than a chart. *B, the divided round,* **is the Mercedes mark** — disqualifying, and recorded as such rather than quietly redrawn; *C, the stacked slips,* is the copy-file icon, and three self-contained rectangles besides. |
| **ledger** | **A — the ruled book** | The account book open on its spine, two ruled entries a page — the record, not the money. *B, the tally column,* reads as a bar chart (fake dataviz); *C, the double entry,* is bookkeeping's real construction and needs a legend, which is the same failure the retired gate and tie marks made at R3.1. |

The first pass at *shares A* was re-cut: the lifted wedge was smaller than the
gap it came from and read as a stray mark at riser size. Enlarged to match the
gap and set on its own radius, it reads at 22px.

**Gold, fiat and bitcoin are the anchors and are reused unchanged** — the R2.2
selections. The gold on the Evolution Rail and the gold in the comparison table
are now one drawing.

**Applied at every comparison surface** — the 4.16 table header, 4.15, 4.17,
4.18, 4.19, 4.20, 4.21 — **and at 4.06's carrier lineage**, which V-1 explicitly
named. Seven photographic renders are retired and deleted: `carrier_shells`,
`carrier_gold`, `carrier_paper`, `carrier_bank_ledgers`, `carrier_bitcoin`,
`comparison_property`, `comparison_shares` (plus `store_of_value` from Phase A).
The bundle loses about 8 MB of PNG.

Three consequences worth stating:

1. **O-07 dissolves.** The renders ranged over a 1.3× spread in apparent size and a 2.5× spread in luminance, and carried five per-asset scale and brightness corrections in CSS that never quite converged. One stroke weight and one grid need none; all five correction rules are deleted.
2. **V-1 closes by construction.** The photographic coin asserted a physical object the deck spends 4.15's assumptions denying. The struck ₿ at display scale says the true thing in the deck's own hand.
3. **The photographic register is scoped, not abolished.** The surgeon stays a photograph, and so do the final goods on 4.04/4.05 — the sneaker, the steak, the wine. The line is meaningful: *the deck draws what it argues about and photographs what it argues for.* Recorded in `docs/icon-grammar.md`.

The asset `alt` strings were corrected to describe the candidates rather than
the retired art ("Physical rendering representing native Bitcoin" → "Native BTC
held in self-custody").

### 4.2 4.22 onto `UnitField`

`UNIT_GRAMMAR` is now the single source of the unit proportions, and `UnitGrid`
is its DOM renderer. `FixedSupplyField` composes it and keeps only its argument
— the margin, the demand arriving at it, the repricing that sweeps back across
the stock. The canvas field reads the same fractions.

Composition and choreography are preserved exactly: centre x = 960, the
right-to-left sweep at 58 ms a column, the same brightness targets, the same
labels. The suite measures the unit box from computed style — 84 × 46 on a
102 × 62 pitch — so the rhyme is now checked rather than asserted. Before R7 it
survived only as a fraction transcribed by hand into `UnitField`'s header
comment while 4.22 owned its own geometry in CSS; either file could have drifted
without the other noticing.

### 4.3 The deferred art tasks

**V-1** — closed by §4.1 above.

**V-3 (4.05 recomposition)** — all three of the original finding's parts:
- the goods cluster moves off the lower-left corner, from centre x ≈ 469 to ≈ 565, and the route's far end shortens to meet it (which also pulls the save-side claim in from x ≈ 1530, the closest element to a frame edge in Section 4);
- the unchosen tine stays **dormant rather than absent** — the route from 0.18 to 0.4 opacity, the label from 0.24 to 0.42. The slide is a fork; both tines should be visible even when one is not taken;
- the black-on-black sneaker is **relit, not replaced**: a brightness/contrast lift plus a warm rim in the deck's own glow family, so the triptych reads as the three final goods 4.04 named. Replacing the art would have needed a new asset and the presenter's approval; relighting is a filter on the existing render.

### 4.4 The colour arc

No new colours. The gate is a diff against the branch point: R7 introduced no
value that was not already on the deck's palette, and every colour in R7's own
new rules is the accent, a neutral, or unit-warm. Section 4 remains the accent's
destination. The S3→S4 ramp reads as arrival: waypoint 3 ignites in full accent,
dissolves to the entry's authored black, the phrase rises in white, and *VALUE*
takes the accent — the section's first orange is on the word the section is
about.

### 4.5 Transitions and continuity groups — a judgment call

**No continuity groups were added; the 300 ms crossfade default carries every
Section 4 boundary, and the frame captures prove it.**

The derivation run 4.03→4.07 was the strongest candidate: the ClaimObject
genuinely persists across it. But it persists at a different stage position,
scale and framing on each of those five slides, so a shared-DOM group would mean
re-authoring five Bucket-1-approved compositions onto one coordinate system —
a change to visible frames that the brief does not ask for and the freeze does
not invite. The crossfade already carries the object across without a seam, and
each of those slides' build 0 is the object's inherited state rather than black,
which is what makes the claim read as persistent. Same reasoning for the table
run. Frame-captured either way, per the brief.

---

## 5. Phase E — Documentation sync

- `docs/section-4-master-document-v2.md`: §1 rewritten to the R7 structure; every §3 decision marked implemented; §3.2 carries the displacement amendment with its rationale; §7's reserved frameworks move from "source material" to "shipped"; the pending rules-lines ruling resolved (both lines are in the install-verbatim scripts, spoken only).
- `docs/sections-1-3-rebuild-brief.md` §13: the same amendment in the freeze register, the falsifiability line marked shipped as 4.20b, the two design-review relocations recorded, and a status line.
- `AGENTS.md`: the Section 4 mission rewritten to current reality (23 slides, deck 46, argument frozen); the instruction hierarchy points at the v2 document; two stale facts corrected that would have misdirected the next agent — the key-paths tree still listed the Section 1–3 directories R2 and R3 deleted, and the definition of done still said "seventeen-slide".
- `docs/icon-grammar.md`: the R7 selections, the scope change, and the draw/photograph line. **This is a deliberate exception to §5's "no other doc edits"** — the grammar document is the glyph set's source of truth and the studio process requires the selections to be recorded there; a grammar document silent about three shipped glyphs is a defect by the master document's own currency rule (§8).

---

## 6. Phase F — Verification

Three harnesses under `review/rebuild-r7/harness-r7/`, driven by
`run-with-server.cjs` — which starts Vite, waits for it to answer, runs the
scripts and stops it again, so a run is one process tree with no orphaned
server:

| harness | what it proves | result |
|---|---|---|
| `gates-r7.cjs` | static: the freeze, the language rules, the pacing arithmetic, the verbatim scripts | **182 checks, 0 failures** |
| `verify-r7.cjs --part=traversal --emit-live` | the forward/backward/fast-forward walks; captures 112 live signatures | **5 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=direct --use-live` | direct entry, reconstruction, named assertions, mid-animation refresh | **242 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=traversal,direct --reduced` | the same matrix under `prefers-reduced-motion: reduce` | **247 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=settle` | the reduced-motion settle gate | **31 checks, 0 failures**, three consecutive runs |
| `flash-r7.cjs` (+ `--rm`) | frame capture at 16 boundaries, 15 frames each at 70 ms | **16 / 0 in both variants** |

**278 distinct assertions under reduced motion, 247 standard, 182 static, 32
frame-capture — 739 in all, none failing.** `npm run build` is clean: 332.76 kB
JS, 138.14 kB CSS.

Scope and motion variant are independent axes in the suite (`--part` takes a
list, `--reduced` is orthogonal), and the traversal pass can write its live
signatures out for a later direct pass to read (`--emit-live` / `--use-live`).
Both exist for the same reason: the reconstruction checks compare a live
signature against a cold direct entry, so those two halves must share state or
112 comparisons silently do not happen — which is not hypothetical. An early
split run reported a confident **`130 checks, 0 failures`** while performing
none of the reconstruction comparisons at all. A suite that can quietly test
less than it claims is the one failure mode a verification pass cannot afford,
so the halves now hand off explicitly rather than by luck of invocation.

### 6.1 The frozen elements — the git-diff review

The freeze is checked twice: by gate, and by reading the diff.

`git diff e6bd27f -- src/slides/section-4-ideal-store/_comparison-data.js` is
**four insertions and nine deletions, every one of them above the scores
block**: five dead `imageKey` fields, three `alt` strings, and one ASCII
apostrophe normalised inside a comment. The `comparisonRows` block — ten
properties × five candidates, **fifty scores — is byte-identical** to the
branch point. The gate compares the extracted block as bytes rather than
parsing it, so a reordering or a whitespace edit would fail it too.

4.23's visible frame is byte-identical **as rendered**: the gate unescapes
before comparing, because Phase D converted that file's literal `\uXXXX`
sequences into the characters they spell (§7.10). The painted frame is
unchanged, and so are its two CSS rules. The ten failure/property pairs are an
untouched file. The five candidates' ids, labels and groups are unchanged.

### 6.2 Pacing

Re-derived from source independently of the gate: **24 slides, 88 builds, 88
`[→]` arrows, zero mismatches** — Section 4 is 86 builds across 23 slides, the
close is 2. Build 0 is never counted, because build 0 is never spoken over: it
is either an authored black beat or the frame the previous slide left behind.

### 6.3 Reconstruction

The dynamic suite's core assertion is a state signature — every `data-*`
attribute on the slide root and its descendants except `data-live`/`data-snap`,
plus the visible text — captured live during a forward traversal, then again on
a cold direct entry to the same build. The two must be identical.

**112 build states** (24 slides, every build including build 0) × live + cold =
224 of the 247 checks. Six more re-enter *mid-animation* — mid statement stagger
at 4.08 b1, mid column stagger at 4.14 b2, mid score reveal at 4.16 b2, mid
repricing sweep at 4.22 b3, mid frame clear at 4.20 b5, mid warmth pulse at the
close b1 — because that is the refresh a presenter actually performs, and it is
the case `data-snap` exists for. Traversal is checked five ways, including a
full backward walk from the close to 1.1 build 0 and a fast re-forward through
Section 4, both asserting exactly one mounted container and no stale overlay.

### 6.4 Frame capture — black is a beat, not a seam

Sixteen boundaries, fifteen frames each at 70 ms, scored by `litFraction`: the
share of pixels with any channel above 12/255, decoded on a canvas in a second
page. Below 0.01% lit is a void. The deck chrome is hidden so the progress bar
cannot mask a black canvas, and the first row is a calibration — 4.01 b0, an
authored black beat, must read as void or the detector is not measuring
anything.

| Boundary | class | void frames | min lit |
|---|---|---|---|
| CALIBRATION — 4.01 b0 authored black | calibration | 15/15 | 0.0000% |
| S3→S4 seam · 3.8 b2 → 4.01 b0 | authored-black | 14/15 | 0.0000% |
| S3→S4 seam back · 4.01 b0 → 3.8 b0 | authored-black | 15/15 | 0.0000% |
| 4.01 b4 → 4.03 | crossfade | 0/15 | 6.4136% |
| 4.04 b4 → 4.05 (the claim carried across) | crossfade | 0/15 | 0.7083% |
| 4.05 b0 → 4.04 (back) | crossfade | 0/15 | 3.2801% |
| 4.06 b4 → 4.07 | crossfade | 0/15 | 1.0563% |
| 4.09 b5 → 4.10 | crossfade | 0/15 | 3.5255% |
| 4.14 b2 → 4.15 | crossfade | 0/15 | 2.1111% |
| 4.16 b3 → 4.17 | crossfade | 0/15 | 0.7840% |
| 4.20 b7 → 4.20b b0 | authored-black | 14/15 | 0.0000% |
| 4.20b b5 → 4.21 | crossfade | 0/15 | 2.1875% |
| 4.22 b3 → 4.23 | crossfade | 0/15 | 0.4630% |
| 4.23 b2 → the close b0 (the black hold) | authored-black | 14/15 | 0.0000% |
| the close b0 → b1 (the road returns) | from-black | 1/15 | 0.0000% |
| the close b1 → b2 (the line dissolves) | build | 0/15 | 1.4244% |

**All ten Section 4 crossfade boundaries carry zero void frames, in both
variants.** The 300 ms default holds every seam, which is what §4.5's decision
against continuity groups rests on. The four authored-black landings dim
monotonically and never relight. Reduced motion reads the same table with the
landings fully void (15/15 rather than 14/15, the crossfade's own first frame
having been removed) and the close's rise lit from frame 0.

### 6.5 What the verification caught

Five findings, all fixed in this phase.

1. **A real deck defect: reduced motion honoured the staggers' delays.** Section 4's per-component reduced-motion rules — inherited, written before R7 — zeroed transition *durations* but not transition *delays*. So under `prefers-reduced-motion: reduce`, 4.08's four statements still assembled over 1.2 seconds and 4.22's repricing still swept column by column: a viewer who asked for no motion still watched the frame arrive in sequence. The suite caught it as a reconstruction mismatch at 4.08 b1, where the live signature was sampled before the last statement had faded in. Fixed with the section-wide block Sections 2 and 3 already use — `.s4-opening`, `.s5c` and their descendants, delays and durations and animations all dead — plus one explicit rule for the close: its warmth sweep is a decorative `::after` that exists only while it animates, so `animation: none` alone would have stranded the gradient across the line as a permanent band. Under reduced motion the pseudo-element is not generated at all.
2. **Two flash boundaries were mis-classified — by me, in the harness.** `←` from 4.01 b0 was typed as a crossfade and read 15/15 void. It is not a crossfade: `←` enters the previous slide **at build 0** (`src/engine/SlideEngine.js:267`), and 3.8's build 0 is `{ visible: false }` — its own authored black beat. That window is black by construction, and R3's flash table classifies the same boundary as `authored-black`. Likewise the close b0 → b1 rises *out of* the authored hold, so demanding zero voids was demanding the hold not be black; it now has its own class, `from-black`, asserting that the window ends lit and never falls back to void once lit. **No capture changed — only the assertion applied to it.** The re-run makes the point on its own: that boundary read 0/15 void under the old class and 1/15 under the new one, the same transition landing either side of a frame boundary, which is exactly the coin-flip a zero-voids rule was never able to describe.
3. **Two weak checks in my own harness, found while writing this section.** The reduced-motion settle gate named six slides and did not name 4.08 or 4.14 — *the two staggers*, and the ones the delay defect actually appeared on. The defect was caught by the reconstruction signature, not by the check written for it; both slides are now in the list. Worse, the check asserting the close's warmth sweep is suppressed ran wherever the previous loop had left the deck: the close's *last* build, where the sweep's own selector (`[data-live="true"][data-step="1"]`) cannot match and `content` reads `none` whatever the CSS says. It passed before the fix existed and would have passed if the fix were deleted. It now advances to b1 live and asserts the preconditions before the suppression, so it fails loudly if it is ever standing on the wrong frame again.
4. **A gate detail string that double-counted.** `FREEZE: comparisonRows` reported "20 rows unchanged" because `property:` appears twice per row — the row's name, and the real-estate score key. The assertion was always the strict one (the whole block, as bytes); only its label was wrong. It now reports the count it means.
5. **Two transient failures, and the rig ceiling behind them.** Twice, a reduced-motion check failed and then passed on re-run with no functional change: the settle gate at 4.01 b3, and the reconstruction comparison at 4.11 b4. A green re-run is not an explanation, so both were traced rather than shrugged off. Every console line the suite has ever captured — 22 of them, across every run — is the same message: `net::ERR_INSUFFICIENT_RESOURCES`. No application error, no page error. Reduced motion caps every settle at 420 ms, so the suite drives roughly four times the navigation rate of the standard variant and reaches Chromium's resource ceiling four times sooner; a frame that loses a resource is a frame that can miss its signature. Recycling the renderer twice as often under reduced motion (`RECYCLE_EVERY = REDUCED ? 12 : 24`) takes the console to **zero** and the suite to 247/0 — which is the confirmation, since a fix that removes both the errors and the flakiness is a fix that identified the cause. The settle gate additionally now waits for `document.fonts.ready` and two clean frames before it starts measuring, because a block that asks "did this land within 420 ms" must not start counting while the page is still resolving its module graph. It has since run clean three times consecutively.

Both transient failures are recorded here rather than quietly re-run away, because a verification pass that hides its own flakiness is worth less than one that names it: the two checks are stable now, but the reader should know they were not, and why.

### 6.6 Screenshots

`review/rebuild-r7/screenshots/` — **113 PNGs**: every build of all 24 changed
slides (112 states), plus 3.8 b2, the frame Section 4 is entered from. The
brief's named subjects are all in it — the new entry from the waypoint
(`4-01-*-b0..b4`), the table with its drawn asset marks (`4-16-*`), 4.22 on
`UnitField` (`4-22-*`), 20b at every build, and the close's completed road
(`5-01-thank-you-b1`). The frame captures sit beside them in `flash-frames/`
and `flash-frames-rm/`.

---

## 7. Deviations and judgment calls

1. **Section 4 is not renumbered** (§1.4). The brief's two instructions conflicted; ids and the project's 4.NN vocabulary won.
2. **The merged entry's id changes** to `4-01-define-the-job` — the one deep-link that moves.
3. **Build 0 is never spoken over.** The deck-wide resolution R2 §6.1 established and R3 inherited: arrows map to builds 1..N, and build 0 is either an authored black beat or the frame the previous slide left behind. In Section 4 the second form does most of the work, because the claim object persists across the derivation run; black is reserved for three designed stops — the section entry, the falsifiability beat, and the close.
4. **Unmarked opening prose** appears at the top of six scripts, covering a content-bearing build 0. Precedent: R2 §3 ("slides 00, 02 and 04 keep their listed build-0 content on entry — unmarked prose covers it"). It carries no `[→]`, so the pacing gate is unaffected.
5. **4.16 gains a third build.** Splitting the score reveal along the 5+5 groups is a change to a Bucket-1 choreography; it was made because a four-minute hold on a static frame is the same defect as an unspoken build, seen from the other side. No score, no row order, no dot value changed.
6. **The stability module lands on 4.20** (§3.1) — flagged.
7. **The 4.06 lineage is converted with the comparison set.** V-1 names it; leaving four photographs beside one drawn mark would have been worse than either extreme. It needed one new glyph (`ledger`).
8. **Seven PNGs deleted.** Recoverable from git at `e6bd27f` if the presenter prefers the photographic register. `icon_bitcoin.png` survives — it is the document favicon.
9. **`_comparison-data.js` was touched.** Five `imageKey` fields removed (dead once the headers draw glyphs) and three `alt` strings corrected. The scores block is byte-identical and gated as such; the whole diff of that file is those five deletions, those three string edits, and one ASCII apostrophe normalised inside a comment — four insertions and nine deletions, every one of them above the scores block.
10. **Literal `\uXXXX` escapes converted to characters.** Four slides carried Codex-era escapes in their notes and copy (`’`, `—`, `→`). They render identically, but they made the arrow count unreadable to any text-level audit and the source inconsistent with every other slide. 43 converted; the 4.23 freeze gate compares as rendered, not as spelled, so it is unaffected.
11. **`AGENTS.md` edits beyond slide counts** (§5) — two stale facts, both defects.
12. **The `data-snap` mechanism is new to Section 4.** The brief asked for `_applyBuild` reconstruction and said Section 4 "largely complies"; it did, in the sense that every slide could rebuild its state — but the *frame* it rebuilt animated into place, honouring delays and staggers. The snap is what makes reconstruction land rather than assemble, and it is what the rest of the deck has shipped since R2.
13. **A reduced-motion CSS fix outside the per-slide work** (§6.5.1). Section 4's inherited reduced-motion rules zeroed durations but not delays, so staggered beats still assembled for a viewer who asked for no motion. The fix is one section-wide block in the form Sections 2 and 3 already use, plus one rule suppressing the close's decorative warmth sweep. The four narrower inherited blocks are left in place: they are pre-existing deck code, they set the same properties to the same values, and removing them would add diff surface for no behavioural change.
14. **Two flash boundaries were reclassified after they failed** (§6.5.2) — the change a reader should scrutinise hardest, since reclassifying a failing check is how a verification pass lies to itself. The defence is on the record: `←` lands on the previous slide's build 0 (`SlideEngine.js:267`) and 3.8's build 0 is `{ visible: false }`, so that window is authored black by construction and R3 classified it identically; the close b0 → b1 rises out of the authored hold, which no zero-voids assertion can express. Neither capture changed — 15/15 void and 1/15 void are still the readings, now checked against what those boundaries actually are. The `from-black` class asserts more than the old one did, not less.
15. **The partial screenshot set was deleted.** Phase D wrote 63 PNGs to `review/rebuild-r7/screenshots-r7/`; the brief §F.5 names `review/rebuild-r7/screenshots/`, which now holds the complete 113. The old directory was a strict subset by name, is recoverable from git, and the capture script's default output path is corrected so the next run lands where the brief says.

---

## 8. Commits on the branch

- `20cb33e` R7 Phase A: the section entry, the falsifiability beat, the completed road
- `a80822e` R7 Phase B: notes to script, and the pacing audit those scripts forced
- `9173b69` R7 Phase C: the hand-drafted scripts, and the two steelman modules placed
- `85bad44` R7 Phase D: the deck's own hand across Section 4; 4.22 onto UnitField; V-1 and V-3
- `b00ca56` R7 Phase E: documentation sync
- R7 Phase F: the verification harness, the evidence, and this report — the commit this document arrives in. It also carries the fixes verification produced: the reduced-motion block, the `\uXXXX` conversions, the 4.18 rewording, and the harness corrections of §6.5.

Base: `main` at `e6bd27f`, itself the head of the §0 precondition sequence that
merged R4+R4.1 and archived the ChatGPT-era Section 4 briefs.

**Stopping here per the brief: no merge.** Section 4 is ready for the viewer
pass. The new material is at slides 23 (the entry), 42 (what would change these
scores), 41's last three builds (what stability actually means), and 46 (the
road, completed).
