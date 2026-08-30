# P1 Condensation Fix · Act II Design-Systems Sheet — Report
## The condensed hours get their object back · the act's five visual systems become candidates

**Mode: FAST.** Scoped verification: the changed P1 state re-proven per pixel, the
deck's own smoke re-run whole, the systems sheet through the pipeline's checks.
No deck-wide suites; what a scoped run defers is named in §7.
**Branch:** `film-rebuild`. **Prior tag:** `batch-a`. **Tags:** `batch-a-r2`
(after §2), `act-2-systems` (on completion).
**The letter was B.**
**Date:** 30 August 2026

---

# 1. The three records, first and each its own commit

| # | Record | Where |
|---|---|---|
| 1 | **The session-sizing law** — one major construction per session; a batch is a sequence of small tagged FAST sessions plus a closing one; a brief that bundles multiple major constructions is a process defect | `AGENTS.md` **§4.8**, added at the end of §4 so no existing cross-reference moves. The purpose is recorded with it: granular commits make a *change* revertible; small sessions make a *decision* revertible |
| 2 | **The condensation ruling — letter B** | `review/prologue/states/states.json` `rulings.condensation` + the amended `approvedSet`; `docs/gate-2-close-and-prologue-states-report.md` §11 |
| 3 | **The Batch A tensions and flags — presenter-reviewed, accepted as flagged** | `docs/batch-a-implementation-report.md` §12, with **what each of the eight tensions and eleven flags rides to** rather than a blanket acceptance |

**What was reopened, audited rather than assumed.** P1 puts the condensed object
on stage at exactly one build — `_applyBuild` sets it visible at `n === 3` and
nowhere else — so **`p1-b3` is the only affected cell**. No adjacent state shows
the condensed mass before the shell, and the letter changes no other beat.

**What was *not* amended, and this matters.** The brief reserves a freeze-register
amendment for letter **A** — *"the no-anticipation rule is amended for P1's
condensation; the birth in Scene 3 is a knowing reappearance."* The letter was
**B**, under which the condensation is deliberately **not** the mark, so **that
amendment is not made**. Scene 3's birth remains the first appearance of both the
disc and the accent, and the Prologue stays monochrome plus photographic warmth.
The freeze register is untouched, and `states.json` says so explicitly so nobody
later reads the ruling as having moved it.

---

# 2. The condensation object

## 2.1 What it is, and how far it is from the Claim Mark

A smooth luminous ball, **296 px across, centred at (960, 650)** — the reopened
cell's own box: the retired granular mass had a core radius of 148 at the forms'
centre, so the ball is that circle. Nothing about the size or the position was
chosen; the ruling said *"sized per the reopened cell's box"* and this is that box.

The drawing lives in exactly one place — the `.p1-ball` class in
`src/styles/slides.css` — so the approved cell and the shipped scene cannot drift
into two objects that merely resemble each other. Its parameters are written
there **against the disc's**, because that is the ruling's whole point:

| | **ClaimMark disc** (`.luminous-disc`) | **P1 ball** (`.p1-ball`) |
|---|---|---|
| **hue** | warm, ending in the accent: `--unit-warm-bright` → `--unit-warm` → a rim mixed **18% with `--accent`** | **achromatic**: `#FFFFFF` → `#FAFAFA` → `#D6D6D6`. No chroma at all, no warm tone, no orange anywhere near it |
| **glow tone** | `rgba(253, 233, 212, …)` — the warm family | `rgba(255, 255, 255, …)` — white |
| **inner glow radius** | 0.1932 × diameter | **0.11 ×** — 57% of it |
| **outer glow radius** | 0.625 × diameter | **0.34 ×** — 54% of it |
| **glow strength** | 0.38 / 0.22 | **0.30 / 0.14** — about two thirds |
| **core-to-halo** | halo reaches **1.25** core-radii past the edge; footprint **2.25** diameters | halo reaches **0.68**; footprint **1.68** |
| **size where each appears** | 132 at the birth in Scene 3 | **296** — 2.24× |

So: **colder** (the warm key is gone entirely — the ruling's "cooler" read as
achromatic rather than as a blue cast, because a blue cast would introduce a hue
into a monochrome register), **tighter** (a halo a little over half the radius at
about two thirds the strength), and **much larger**. What the two share is the
light: the highlight sits at 50% 42% in both, because one film has one key. The
distinction is carried by hue and falloff, which is what the ruling asked for —
not by lighting two objects differently.

## 2.2 The gesture

**Rebuilt only where the ruling touched it.** The collapse still runs 1.02's
proven 4.6 s; the object still resolves at 0.45 of it; the reveal is still
1200 ms in and 520 ms out; the first morph still departs from the object into the
shell on the register's own cross-dissolve. **The ruling replaced the object, not
the motion**, and the report says so rather than quietly re-timing anything.

One thing was available and deliberately not taken: the legacy conversion's token
arrival (1.2) pairs its fade with a 1500 ms scale settle, and a ball is exactly
the shape that treatment was built for. It was not adopted, because the brief
says the motion character is preserved otherwise. It is named here so the choice
is visible rather than lost.

The retired granular drawing has left the shipped scene and stays where a retired
candidate belongs: the states builders, and its archived cell.

## 2.3 Proven

| check | result |
|---|---|
| **Landed-state proof** | **33/33 at zero differing pixels**, cold. `p1-b3-ball` matches its archived cell **and** a fresh render of it at zero |
| **Warm-path proof** | **30/33** — unchanged from Batch A. The three that differ are the same claim-disc-edge states its report flagged at §7.2 (2–38 px, ≤39/255, on the mark's edge, not the same set run to run); **the condensation's own state passes on both paths** |
| **Smoke** | deck boots **39 slides**; 201-state traversal forward in exact order and monotonically back; both splice boundaries in both directions; **33 cold entries**; **reduced-motion parity 33/33**; **0 console errors** |
| **Static gates** | **13/13** |
| `npm run build` | clean |
| **Captures** | the collapse mid-gesture and the landed object re-taken into `review/batch-a/strip/` (`g-p1-condense.png`, `p1-b3.png`) |

---

# 3. The Act II design-systems sheet

**`review/act-2/systems/`** — 18 candidate cells, `sheet.html`, `systems.json`.
Five ◆ frames, three systems each (the evidence grammar's three are each rendered
twice, on two specimens).

**Every cell is script-independent.** No frame depends on a word the presenter's
essay has not written. Every word that appears is traced to already-recorded film
material, and **`systems.json` carries the per-slot provenance** — architecture
section and verbatim source, slot by slot — rather than asserting it.

**Every cell is a shippable frame** under the composition law, and the measured
checks say so: corner and border below the dark-field gate's own 6/255 on all 18,
content present, all at 1920 × 1080.

## S6-F2 — the elimination funnel *(the frame that sets the film's diagram grammar)*

All three render **the same mid-elimination state** — three stages spent and
receded, THE FORGE landed at full voice and not yet run, SCARCITY not yet landed
— so what is compared is systems, not moments.

- **A — the element field.** The population is the periodic table's own
  silhouette in the set's dot terminals; each stage puts its own real region out
  (the gases at the top right and along the p-block edge, the reactive metals in
  columns 1–2, the radioactives in period 7 and the actinides). Reads as "every
  element" in one second.
- **B — the descending gates.** Five thresholds descending, each narrower, the
  population thinning between them and the rejected settling outside the span.
  The gate is the icon grammar's own threshold language.
- **C — the tapering corridor.** One continuous narrowing rather than steps, the
  stages as ticks crossing the corridor — icon grammar §4.7's own rule that a
  mark naming a position *on* a line is a tick, not a glyph. The taper is legible
  before any label is read.

## S10-F1 — the trade-off strip

Four stations, one gain and one dependency each, BITCOIN activated.

- **A — the rail.** One line threading four stations, everything hanging off it.
  Rhymes directly with Act I's line-and-dot-terminal grammar; reads as a sequence.
- **B — the ledger of trades.** No connecting line: four stacked entries, each
  with a hairline running right, gain above it and dependency below. The rule is
  the trade; the strip is a record of four bargains.
- **C — the trade drawn.** Each station is a small beam pivoted on the baseline
  and tilted — gain end raised, dependency end lowered, short risers carrying
  each end to its own label. The trade is drawn rather than listed.

The eight words are all recorded: SCARCITY IN MATTER · *as value grows, weight
grows* · PORTABILITY · *trust moved to the issuer* · INSTANT TRANSFER · *the
window closed* · NON-DISCRETIONARY SUPPLY · *not yet twenty years into a
hundred-year question*.

## S9-F1 — the network formation

**No text on any of the three** — which is how *"no advocacy vocabulary anywhere
on the frame"* is satisfied absolutely rather than by careful word choice.

- **A — the hub dissolving.** The institutional star receded to a floor that
  still reads, and peer chords forming at full voice. The argument is in the two
  weights.
- **B — the layer breaking.** The vertical reading: the central layer as one rule
  across the top, breaking; a connected field below. Nothing is arranged around a
  centre at all.
- **C — the record, copied.** The record itself is the mark — a spine and three
  ruled lines — with the institution's single copy receded at the left and seven
  identical copies distributed and linked. The mark that repeats is the argument.

## S5-F3 — the evidence grammar

Three systems, each rendered on **two specimens**: ZANZIBAR · 1800s (place · date
· fact) and 1971 (date · fact, no place). Both are recorded film material; the
1971 cells are **system proofs**, not Scene 8 style frames, and they exist because
the brief asks for a system rather than a one-off — a system has to be seen
degrading.

- **A — the centred dateline.** Citation as a kicker over a short rule, the fact
  centred beneath at statement scale. The most restrained.
- **B — the hanging citation.** The citation hangs in the left margin against a
  vertical hairline, the fact set left-aligned beside it. A marginal reference.
- **C — the ruled entry.** One hairline the width of the frame, place at its left
  end and date at its right, the fact centred below — the film's ledger grammar
  turned on its own evidence.

## S8-F2 — the chart at film grade

**The data is frozen and untouchable, and that is gated, not promised:** a source
check asserts the builders import `src/data/purchasing-power.js` and carry no copy
of it. All three plot one vertex per observed year — the legacy chart's own rule,
*"the line is the record, not a curve fit"* — and keep the frozen draw order and
per-series weight, which is where the emphasis lives.

- **A — the bare fall.** No axes, no gridlines, no frame. Every line the eye can
  see is data.
- **B — the one line that matters.** A single hairline at the index level, chosen
  because it *is* the argument: every line ends far below where it began.
- **C — the framed record.** An L-frame with sparse ticks — the most legible and
  the least austere.

One craft note worth recording: the four series end within 25 px of each other,
so their names would overlap at any readable size. **The dot stays on the datum**
and only the label is pushed to the nearest free slot on a 30 px ladder, with a
hairline leader tying it back. Nothing about the data moves — only where its name
is written.

---

# 4. Files changed

## New
| file | what |
|---|---|
| `review/act-2/harness/systems.mjs` | the 18 candidate-cell builders |
| `review/act-2/harness/capture-systems.cjs` | the sheet capture, index and record |
| `review/act-2/harness/check-cells.cjs` | the measured cell checks and the two source checks |
| `review/act-2/systems/**` | 18 cells, `sheet.html`, `systems.json` |
| `review/prologue/states/p1-b3-ball.png` | the ruled condensation cell |
| `docs/p1-fix-and-act-2-systems-report.md` | this report |

## Modified
| file | what |
|---|---|
| `AGENTS.md` | §4.8, the session-sizing law |
| `src/styles/slides.css` | `.p1-ball` and its reduced-motion entry; `.p1-mass` kept because its retired cell is kept |
| `src/scenes/prologue/_prologueStage.js` | the ball replaces the retired mass builder |
| `src/scenes/prologue/p1-eighty-thousand-hours.js` | the condensation lands on the ball |
| `review/prologue/harness/states.mjs` | the `p1-b3-ball` cell builder |
| `review/prologue/states/states.json` | `rulings.condensation`, the retirement of `p1-b3`, the amended `approvedSet` |
| `docs/gate-2-close-and-prologue-states-report.md` | §11, the ruling |
| `docs/batch-a-implementation-report.md` | §12, the disposition of the tensions and flags |
| `review/batch-a/harness/*.cjs` | the three proofs and the capture strip repointed at `p1-b3-ball` |
| `review/batch-a/**` | the evidence re-run |

**Out of scope, changed anyway: none.** No Act II scene or script exists; no
legacy slide, engine file or seam was touched; the Claim Mark component stays
under `src/proto/` as the brief's §4 requires.

## Commits and tags

```
832d615  docs: install the P1 condensation fix and Act II systems brief
107a98e  process: the session-sizing law — one major construction per session
8ac16f2  review(prologue): the condensation ruling recorded — letter B
531a2d6  docs: the Batch A tensions and flags reviewed and accepted as flagged
5a5cffd  scenes(P1): the condensation lands on the ruled ball
00cc2bc  review(act-2): the systems builders — five ◆ frames, eighteen cells
a90a4e6  review(act-2): the sheet — 18 cells at full size, index, record
d8d9b12  review(act-2): the FAST cell checks green — 18/18 plus two source checks
0ebed69  review(batch-a): the condensation fix re-proven — 33/33 at zero pixels
```
**Tags:** `batch-a-r2` at `0ebed69`, `act-2-systems` at the report commit.

---

# 5. A process note I owe you

**This session's own brief is an instance of what §4.8 now forbids.** It ordered
the session-sizing law — *one major construction per session* — and then bundled
two major constructions: a scene fix with its proofs, and an eighteen-cell
candidate sheet. Both landed and both are verified, so nothing was lost; but the
law was written in the same document that broke it, and the cost showed up
immediately and concretely:

**`batch-a-r2` is cut after the Act II commits.** §2's construction landed at
`5a5cffd`, but its evidence was committed once — at the end, after the systems
sheet — so the tag that is supposed to mark "after §2" sits at `0ebed69` and
contains the sheet as well. **The revert point for the P1 fix alone is
`5a5cffd`.** The tag's own message says so. Under §4.8 the two halves would have
been two sessions and two clean tags, which is exactly the argument for the law.

Recorded rather than tidied away, because a law's first violation is the most
useful evidence it will ever have.

---

# 6. The review protocol — your part

> **Select one system per ◆ frame, at full size.**

Open **`review/act-2/systems/sheet.html`** on the dev server. Every cell is
examined **at full size** — click the image or its "full size" link — and each of
the five frames receives **one selection**: `S6-F2 A|B|C`, `S10-F1 A|B|C`,
`S9-F1 A|B|C`, `S5-F3 A|B|C`, `S8-F2 A|B|C`. No bulk verdicts; a frame with no
selection blocks its states.

Your selections **plus the essay's Act II section** unlock the Act II scripts and
the full beat-state sheet, and the selected systems pre-seed every state on it.

For the P1 fix, the frame to look at is `review/batch-a/strip/p1-b3.png` (the
landed object) and `g-p1-condense.png` (the collapse mid-gesture) — or just run
the deck from the top and advance three times.

---

# 7. Flagged, not improvised

1. **The strip's bitcoin position — two recorded rulings point different ways.**
   The register boundary (master §6.3) says dark-field never enters a diagram, so
   a diagram-scale strip takes the struck-₿ glyph, which is what all three
   candidates render. Your C1 ruling as recorded (dark-field manifest §2.2) says
   the physical-coin render governs Scene 10's strip for consistency with P1.
   **Not resolved here.** Reading them together, the coin ruling most likely
   governs Scene 10's *display-scale* appearances and the strip stays grammar —
   but that is your call, not the sheet's.
2. **The strip's accent.** The CLAIM station is a claim, and the accent is the
   claim's — but the strip's claim is the *paper* claim on gold, a carrier, and
   colouring it would collide with the Claim Mark. All three candidates are
   monochrome; the selection settles it.
3. **The condensation's two centres, now sharper.** `UnitField`'s collapse
   converges on the stage centre (960, 540); the approved object sits at the
   forms' centre (960, 650). With a diffuse granular mass the 110 px offset was
   invisible; with a hard-edged ball it is visible mid-gesture — see
   `g-p1-condense.png`, where the ball sits low in the cleared void. Closing it
   would mean moving an approved cell or changing a shared component's collapse
   centre, both out of this session's scope. **This is the Batch A §7.3 flag,
   re-flagged sharper because the ruling made it more visible.**
4. **The funnel's candidate A asserts a shape, not a chemistry.** The population
   is the periodic table's real silhouette and the eliminated regions are the real
   ones, but at dot scale no individual element is identifiable. The frame claims
   a sequence and a shape; it does not claim which element is which.
5. **The evidence grammar's third specimen is not rendered.** Palladium's 1803
   has no recorded one-line form yet, so it is not on the sheet. The two specimens
   that are recorded are.
6. **The accent check is made at the source, not at the pixel.** A per-pixel hue
   test was written first and thrown away: subpixel text antialiasing measures
   r−b up to **215** against the accent's own **221**, so the two are not
   separable per pixel. The measurement is still reported in
   `check-cells.json` with that caveat attached — the three text-free network
   cells measure zero, which is what shows the reading is antialiasing — and the
   *check* is that no builder references the accent, the mark or the disc.
7. **The warm-path residue is unchanged** (Batch A §7.2) — three claim-disc-edge
   states, 2–38 px at ≤39/255, not the same set run to run. Still the GATE's.
8. **The Batch A flags and tensions ride on**, per §12 of that report — no action
   was taken on any of them here, which is what the brief ordered.

---

# 8. Remaining judgment calls — all yours

- The **five system selections** (§6).
- The two strip questions in §7.1 and §7.2.
- The condensation's two centres (§7.3).
- Everything Batch A's §12 disposition sends to your eye or to the GATE.

---

# 9. Recommended next step

**Your five selections on the systems sheet, and the essay's Act II section.**
Together they unlock the Act II scripts and the full beat-state sheet — and, per
§4.8, those are separate sessions.
