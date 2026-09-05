# Batch A Implementation — Report
## The Prologue and Act I are in the deck. The film has a first ten minutes.

**Mode: FAST** (batch scope — the full suite waits for the GATE before the
recording merge). No deck-wide suites were run; what a scoped run deferred is
named in §7.
**Branch:** `film-rebuild`. **Prior tags:** `gate-2-closed`, `prologue-states`.
**Tag:** `batch-a`.
**Date:** 29 August 2026

---

# 1. The headline

The deck's first five slides are now the film's first five scenes, and **every
settled state of every one of them is the presenter's own approved cell at zero
differing pixels** — thirty-three states, mounted cold in the real deck at
1920 × 1080 and compared per pixel. Act I's nineteen are additionally proven
identical to the closed prototype itself, so the transplant is closed from both
sides. Walked forward from the top instead of entered cold, thirty-one of the
thirty-three are still exact and the other two or three differ by a handful of pixels on
the claim's edge — measured, reported, not waved through (§7.2).

**The deck went from 45 slides to 39**: eleven legacy slides left the manifest,
five scenes entered it. Their files are all still on disk.

The register is complete: `fiat` was the last gap, and it passed the grade gate
on all five clauses and was ingested through the standard harness.

---

# 2. The five rulings, recorded first

Each is its own commit, before any build work started (brief §1).

| # | Ruling | Where it is recorded |
|---|---|---|
| 1 | **C1 = the coin.** P1's fifth form is the library `bitcoin` render (`p1-b8-a`); `p1-b8-b` stays on file, not selected. | `review/prologue/states/states.json` `rulings.C1`; `docs/dark-field-manifest.md` §2.2 — **the V-1 flag closes as a presenter decision**, and the same ruling governs Scene 10's strip for consistency (Batch B inherits it; no Scene 10 work here) |
| 2 | **p1-b7 = `ledger_glow`.** | manifest §2.2 (the ledger row now serves P1's morph as well as Scene 8), `src/dark-field.js`'s assignment comment, `states.json` `rulings.p1b7`. The cell was **re-rendered through the states pipeline** as `p1-b7-glow`, beside the retired `p1-b7` |
| 3 | **The 11-beat P1 map is binding.** | `docs/batch-a-package.md` §1, amended: eleven beats plus the authored entry black, with the condensation's landing and the shell each named as their own advance |
| 4 | **All remaining Prologue cells approved.** | `states.json` `rulings.allCells` + the authoritative `approvedSet` (14 cells, one per beat plus the entry black); `p1-b8-b` not-selected, `p1-b7` retired; **C1 closed — the Prologue has no open decision** |
| 5 | **The scene test is on file.** | `docs/scene-test.md` — the eleven questions **verbatim**, with the provenance note (1–10 from the commissioned blueprint; 11 added by the blueprint's author post-prototypes and adopted by the presenter) |

**One geometry the rulings forced, recorded because it was derived rather than
transcribed:** `ledger_glow` is the register's only 3:2 render (1536 × 1024),
and the Prologue's recorded form law fixes the box height (540) and centre
(960, 650) and requires the render's own aspect. That is an **810 × 540 box at
(555, 380)**. Nothing else in this session was derived.

---

# 3. `fiat` — gated, ingested, and the register closed

The presenter's drop was sitting **untracked in the shipping set**, never through
the gate (the Prologue session flagged it: the eager glob meant it was already
reaching the deck on any dev run). Batch A moved it to `incoming/` and put it
through the standard harness.

| step | result |
|---|---|
| grade gate on the drop zone | **5 clauses of 5 pass** — corner 0.32, border 0.30, 79.7% dark, R−B **+130.3**, warm fraction **100%**, single key at azimuth 111°, spread 1 |
| `ingest-r7-2.cjs` | 1 accepted, 0 held back |
| grade gate on the whole shipping set | **23 images, 115 checks, 0 failures** |
| measured framing row | `fiat: [1.127, 0.9, -1.9]`, pasted into `src/dark-field.js` |
| evidence | `review/batch-a/grade-fiat-drop.json`, `review/batch-a/grade-shipping-set.json` — **filed under this batch's folder; no prior evidence was overwritten** (the R7.2 evidence file the ingest harness rewrites was restored byte-for-byte from git) |

**The recorded `gold_certificate` distinctness check ran** now that both renders
exist (`review/batch-a/gold-certificate-vs-fiat.png`, `distinctness.json`):

> **Distinct — and distinct structurally rather than tonally.** The certificate
> is a single flat plane, monochrome gold on cream, with an engraved border and
> a central seal. The note is folded into two planes with a lit crease, and it
> is polychrome — a blue oval left, red-brown bands across the middle — with a
> highlight population a quarter the size (0.036 of the frame against 0.165).
> They do not read as one object at either scale. What does *not* separate them
> is the key: mean highlight RGB differs by (−9, −5, −10), which is the grade
> holding, exactly as it should.

Manifest §3.0 is closed and §6's summary now reads **23 shipping, 0 to
regenerate**.

---

# 4. The build

## 4.1 P1 and P2 — the Prologue as deck scenes

`src/scenes/prologue/` — `p1-eighty-thousand-hours.js` (11 beats + the authored
entry black), `p2-the-stakes.js` (2 beats), `_prologueStage.js` (the shared
machinery).

**Every settled state is its approved cell, transcribed.** The geometry comes
from `review/prologue/harness/states.mjs` — the builders those cells were
rendered from — and the type comes from the deck's own classes, which are the
classes the frames were approved in (`s1q-hours__counter`, `s1q-hours__line`,
`s1q-stakes__line`, `s1q-what__question`, `s1q-what__title`). The condensed mass
is transcribed verbatim, seed included.

**Motion.** The fill and the counter are the legacy deck's proven gesture at its
own timings (1.01: an 8.2 s fill behind an 800 ms authored hold, the counter
fading in with the first countable units and completing with the field). The
condensation is 1.02's proven collapse (4.6 s), landing on the **mass** rather
than on a disc — the disc is born in Scene 3 and nowhere earlier. The five-form
morph is a cross-dissolve in the dark-field register's own reveal, each form its
own advance, the outgoing releasing 180 ms after the incoming begins to rise so
the frame never dips to black between two objects. The two lines and the title
are the deck's sequenced-line treatment, and the title lands after 1.03's proven
beat of emptiness.

**Register:** monochrome plus the renders' photographic warmth. No accent, no
Claim Mark, no luminous disc anywhere in the Prologue — held by a gate, not by
discipline.

## 4.2 Scenes 2–4 — transplanted, not reinterpreted

`src/scenes/act-1-the-unfinished-exchange/` — `_exchangeStage.js`,
`_sceneModule.js`, `_birth.js`, and the three scene modules. This is
`src/proto/gate-2/` as the presenter judged it: the same shared stage, the same
19 states, the same gestures, the same notes, `sceneGroup: 'act1-exchange'` so
both morphs are real shared-DOM continuity.

**Specialized to the rulings, and only to them.** Runtime path selection does not
ship, so the deck's stage carries the ruled failure language (**the absence**)
and the ruled birth (**pool**) and nothing else. The retired candidates — the
reach, the flow, the archived D3-C spans, collapse and condense, the `?path=`
and `?birth=` selectors — stay on file and runnable in `src/proto/gate-2/`,
where the aesthetic law's file-keeping clause keeps them.

Every removal is **inert by construction**: no settled or animated state of the
absence ever touched the retired strokes, the drift or the fragment pool they
were drawn on. One consequence is worth saying out loud — **the shipped stage has
no return-path line element at all.** That is what "the absence" means, made
literal in the DOM.

**Proven, not asserted:** all 19 builds of the deck's Act I are pixel-identical
to the prototype's own frames at its ruled default (`transplant-proof.json`).

**No transplant-forced deviation was found.** Nothing had to be adapted, so
nothing is flagged under that rule.

## 4.3 The manifest splice

| legacy id | superseded by | why |
|---|---|---|
| `1-01-eighty-thousand-hours` | **P1** | the cold open, fused into P1 |
| `1-02-the-conversion` | **P1** | the condensation, fused into P1 |
| `1-03-what-is-money` | **P1** | the title punchline, fused into P1 |
| `1-04-the-stakes` | **P2** | the mercy line, kept |
| `1-05-the-promise` | **P2** | architecture "what dies": the waypoint device and the 1.5 map scene; the promise moves to P2's spoken script |
| `2-01-the-world-without-it` | **Scene 2** | architecture, Scene 2: "Retired: the fisherman/sandal-maker/farmer triad — redundant with this scene" |
| `2-02-the-discovery` | **Scene 3** | the second half of the same retired triad; its breakthrough is Scene 3's |
| `2-03-the-convergence` | **Scene 3** | RULED 2: the murmuration retired with honor, its soul one spoken line in Scene 3's script |
| `4-03-simple-exchange` | **Scene 2** | the surgeon's hour, at the front of the film |
| `4-04-unfinished-exchange` | **Scene 3** | the claim's birth |
| `4-05-spend-or-save` | **Scene 4** | the fork; the Gate 2 sheet used this slide as Scene 4's own reference bar |

**Old count: 45. New count: 39.** Eleven out, five in. Every superseded file is
still on disk and in history — the manifest lost its import and its array entry,
nothing else. A gate checks both halves of that (`static-gates.json`), and a
third checks that **no surviving module references a retired id** — no stale
deep link, continuation or scene group survives.

The Prologue and Act I enter as two new sections (`prologue`, `act-1`); the
`question` section is gone entirely; `origin` keeps five slides, `ideal-store`
nineteen.

---

# 5. Validation

**Commands run:** `npm run build` (clean), the dark-field grade gate and the
standard ingest harness (§3), and six harnesses under
`review/batch-a/harness/` — `static-gates`, `proof-batch-a`, `warm-path-proof`,
`transplant-proof`, `smoke-batch-a`, `capture-batch-a`.

| check | result |
|---|---|
| **Landed-state proof** (`landed-proof.json`) | **33/33 states proven.** Each settled state mounted cold in the deck vs its approved cell: 31 at **zero differing pixels** against the archived cell PNG *and* against a fresh render of it; the two hours-field states at zero against a same-seed render (see §7.1) |
| **Warm-path proof** (`warm-path-proof.json`) | the deck **walked forward from the top**, one advance at a time — the presenter's own review protocol — every settled frame compared to its cell: **31/33 at zero differing pixels** (30/33 on an earlier run); the remainder at 2–12 pixels, ≤23/255, always on the claim disc's edge, and **not the same states run to run** (§7.2). The canvas layer hint stayed released at **all 33** states |
| **Transplant proof** (`transplant-proof.json`) | **19/19 of Act I's builds pixel-identical to the closed prototype** at its ruled default |
| **Full traversal** (`smoke-batch-a.json`) | the **whole 39-slide deck**, every build: **201 states forward in exact order**, and back to the top monotonically |
| **Boundary checks, both directions** | P2 → Scene 2 forward ✓ · Scene 2 → P2 backward ✓ · Scene 4 → legacy forward ✓ · legacy → Scene 4 backward (←, and ↑ to its end) ✓ · P1's cold open ✓ |
| **Direct entry** | **33/33** new-scene builds mounted cold through the engine's own deep-link path, all settled |
| **Reduced-motion parity** | **33/33 identical** to the settled motion-on states, compared by serialization |
| **Console** | **0 errors** in every run — traversal, 66 cold entries, all captures |
| **Static gates** (`static-gates.json`) | **13/13 green** — pacing, verbatim scripts, the self-reference ban, the cleanup sweep, the splice, the register |
| **Notes** | every `[→]` maps to exactly one advance: P1 11→11 (its opening line is spoken over the authored black), P2 2→1, S2 5→4, S3 9→8, S4 5→4 — the extra arrow is the advance that *enters* the scene, per the script standard |
| **Verbatim scripts** | the five installed scripts are `docs/batch-a-package.md` §2's scripts **character for character** — checked mechanically, 5/5 |
| **Capture strip** | 33 settled states + 8 gestures mid-flight → `review/batch-a/strip/` with `strip.html` and `strip.png` |

**Not run, and not claimed:** no deck-wide register or brightness audit, no
composition audit of the 34 legacy slides, no second-window notes check, no
fullscreen or overview pass beyond the labels, no freeze checks. FAST defers the
global suites to the GATE.

---

# 6. The scene test — all five scenes, all eleven questions

Run against `docs/scene-test.md`. **Questions 10 and 11 are answered by
construction wherever a settled state is a presenter-approved cell** — and every
settled state in this batch is one, cited per scene. **Questions 1–9 are
assessed in earnest.** Tensions are flagged for the presenter and **nothing was
fixed on the strength of them** — a fix would be a new decision, and this
session makes none.

## P1 — Eighty Thousand Hours / What Is Money?
*(cells `p1-b0` … `p1-b11`, states.json `approvedSet`)*

| # | verdict |
|---|---|
| 1 | **Pass.** A field of light with a number over it; then one object on black at a time. |
| 2 | **Pass.** The field *is* the argument — one point of light per working hour — and the condensation is the conversion, not a decoration of it. |
| 3 | **Pass.** At most one line per beat; the five forms carry no labels at all. |
| 4 | **Pass, with a tension.** The viewer discovers the field and the forms; but beats 9 and 10 are two consecutive told-lines on cleared black before the title. Flagged. |
| 5 | **Pass.** The unit field exists nowhere else in the film except its deliberate rhyme in Scene 28. |
| 6 | **Pass, with a tension.** Field → mass → five forms is one continuous morph. But the collapse converges on the **stage** centre (960, 540) while the mass settles at the **forms'** centre (960, 650) — a 110 px offset visible mid-gesture. Flagged (§7.3). |
| 7 | **Pass.** It ends on the question, literally. |
| 8 | **Null-pass by law.** No accent exists in the Prologue; orange enters at Scene 3's birth (master §8.5). The warmth is the renders' own key light. Held by a gate. |
| 9 | **Tension.** Beats 1–8 survive; what the visuals alone never say is that the five objects are *money*. The morph's continuity carries "versions of one thing"; "money" is spoken. This is the architecture's own designed mystery ("premium dark-field renders, no labels") — flagged so he judges it as design rather than inherits it as an accident. |
| 10 | **By construction** — twelve approved cells, and `p1-b11` is the frame he approved as the thumbnail candidate (P1-F3). |
| 11 | **By construction** — every beat's key frame *is* its settled approved cell; nothing in P1 lands only in motion. |

## P2 — The Stakes *(cells `p2-b1`, `p2-b2`)*

| # | verdict |
|---|---|
| 1 | **Pass.** One sentence, centred; the sentence is the subject. |
| 2 | **Tension by design.** The frame does not explain — it holds. There is no visual to grade: ruling 4 of 25 August retired the hours-field ghost and left the line alone. Recorded so the answer is his, not the report's. |
| 3 | **Pass.** One canonical sentence; not this session's to shorten. |
| 4 | **Tension.** Told, flatly — the film's one pure assertion before the argument starts. The architecture placed it deliberately ("the stakes precede the puzzle"). Flagged, not fixed. |
| 5 | **Pass.** Statement register against P1's question register. |
| 6 | **Pass.** The title clears; the line rises in the crossfade. A cut, and the question does change. |
| 7 | **Tension.** The *screen* creates no next question — the hold is the point, and the handoff is spoken. Flagged. |
| 8 | **Null-pass by law.** |
| 9 | **Pass.** The sentence is the whole frame. |
| 10 | **By construction** — `p2-b1` is the approved `p2-f1-plain`, byte-identical. |
| 11 | **By construction** — beat 2 is a hold, proven identical to beat 1 at zero differing pixels. There is no motion to remove. |

## Scene 2 — The Direct Exchange *(`s2-b1-a`, `s2-b2`, `s2-b3-p2`, `s2-b4-p2`, `s2-b5-b-p2`)*

| # | verdict |
|---|---|
| 1 | **Pass.** Two people and a line between them. |
| 2 | **Pass.** The path is the exchange; the capabilities name what the hour contains; the goods hang unreachable. |
| 3 | **Tension.** The six capability lines are the densest text in the batch. They are one accumulating element under the sentence that names them, and he ruled them into beat 1 himself (26 August) — flagged for his eye, not touched. |
| 4 | **Pass.** The failure is shown before the term is spoken. |
| 5 | **Pass.** The only photographic two-person stage in the film. |
| 6 | **Pass.** A cut from P2, and appropriately so — the question changes. |
| 7 | **Pass.** "How could the two halves ever be separated?" |
| 8 | **Null-pass by law** — Scene 2 is before the birth; verified by gate. |
| 9 | **Pass, with a tension.** The stage, the delivered half and the unreachable goods read without narration. The *failure* reads as absence — nothing is drawn — which is the ruled language, judged live and closed on his word; it is also the place in the batch that asks the most of a viewer with the sound off. Flagged as a property of the ruling, not a defect. |
| 10 | **By construction** — five approved cells. |
| 11 | **By construction.** |

## Scene 3 — The Breakthrough *(`s3-b1-p2` … `s3-b9-a`)*

| # | verdict |
|---|---|
| 1 | **Pass.** A claim held between two people; then the claim alone with the interval open. |
| 2 | **Pass.** The birth *is* the explanation: the unresolved half becomes an object. |
| 3 | **Pass.** Three interval words and two closing lines across nine beats. |
| 4 | **Pass.** The claim forms and the patient leaves before either is named. |
| 5 | **Pass.** The film has one birth. |
| 6 | **Pass.** Scene 2 morphs in on the shared stage; the record's light goes home into the dot the pool drinks. |
| 7 | **Pass.** "The exchange can remain unfinished" opens Scene 4's fork. |
| 8 | **Pass — the strongest yes in the batch.** The accent's entry point in the whole film is this birth, and it marks exactly one thing: the claim. |
| 9 | **Pass, with a tension at beat 7.** Without narration the two-phase demonstration reads as a disc departing and shoes arriving; *why* (a shoemaker he has never met) is spoken. The composition is D5-B, ruled. Flagged. |
| 10 | **By construction** — nine approved cells. |
| 11 | **By construction** — including beat 7, whose settled cell *is* the two-phase frame. |

## Scene 4 — Spend or Save *(`s4-b1-b`, `s4-b2-b2`, `s4-b3-b`, `s4-b4-b`, `s4-b5-b`)*

| # | verdict |
|---|---|
| 1 | **Pass.** A claim and two roads. |
| 2 | **Pass.** The fork is the decision; the road running past the claim into darkness is saving. |
| 3 | **Pass.** Two kickers and two closing lines. |
| 4 | **Pass.** The claim travels and vanishes, then returns and rests. |
| 5 | **Pass.** The road grammar is introduced here and pays off at Act V's marginal decision. |
| 6 | **Pass.** Scene 3 morphs in; the held claim never blinks. |
| 7 | **Pass.** "Something has to *carry* it" is Act II's door. |
| 8 | **Pass.** The claim is the only orange on the frame. |
| 9 | **Pass — the most self-sufficient scene in the batch.** Both roads are named and both outcomes are drawn. |
| 10 | **By construction** — five approved cells, beat 2 being his own containment markup. |
| 11 | **By construction.** |

**Summary: 55 verdicts across five scenes — no failures; eight tensions
flagged**, every one of them a property of a ruled decision rather than a defect
in the implementation. **His own viewing is the verdict; this is preparation for
it.**

---

# 7. Flagged, not improvised

Nothing in this batch was improvised. These are the open items, each with what
it is waiting on.

## 7.0 One real defect, found and fixed — and how

Worth recording because the cold-entry proof could not see it. The engine mounts
the incoming slide **before** it calls the outgoing slide's `onExit`
(`SlideEngine._render`: render → onEnter → crossfade → outgoing.onExit). The
Prologue and Act I both release the deck canvas's `will-change: transform` hint
while they are on stage, so their text rasterizes the way the approved cells
were rasterized — and with a naive claim/release **the outgoing scene handed the
hint back underneath the incoming scene that had just claimed it.** At the
P1 → P2 and P2 → Scene 2 boundaries the shipped frame therefore stopped matching
its approved cell **on the forward walk**, while every cold entry still passed.

`src/components/rasterHint.js` refcounts the claim on the canvas element, so the
last claimant out restores it. The **warm-path proof** exists to hold that, and
records the hint's state at all 33 walked states.

*This is a new shared component rather than a scene file because two acts need
it — the `src/scenes/README.md` rule. It is nine lines of logic and it touches
no engine file.*

## 7.1 The two hours-field states cannot be pixel-compared to their archive

`p1-b1` and `p1-b2` contain the hours field, whose per-unit brightness jitter is
`Math.random`, unseeded — which is exactly why those approved cells ship as
byte-copies rather than re-renders (the Prologue report flagged it at §6.6).
A deck render can therefore never reproduce the archived cell's own sampling.

**What was proven instead, and it is a real proof:** the landed-state harness
holds that one variable still — `Math.random` is replaced by an LCG re-seeded at
every canvas creation, so the field paints identically in the deck pass and the
cell pass — and the deck's frame equals a same-seed render of the approved cell
at **zero differing pixels**. The delta against the archived cell is reported
rather than hidden (1,284,951 and 1,265,613 pixels at up to 75/255 — the field's
texture, and nothing else). **Waiting on:** nothing, unless he wants the field
seeded film-wide, which is a component change and a decision.

## 7.2 Two or three states differ by a handful of pixels on the forward walk — measured, not waved through

Two or three states — `s3-b8-a`, `s3-b9-a` and `s4-b5-b`, and **not the same set
on two consecutive runs** — match their approved cells exactly on cold entry and
differ by **2 to 12 pixels** on the forward walk. Every differing pixel is on the
**claim disc's left edge column** (x = 702 at the held placement, x = 1472 at the
save placement), at a maximum channel delta of **23/255**, the walked frame being
marginally less anti-aliased.

**It is a compositing residue of the gesture, not a state difference**, and that
is measured rather than assumed: read cold and warm at the same state, the mark
wrap's inline transform, computed transform (`matrix(1, 0, 0, 1, -58, -58)` —
no 3D, no layer promotion recorded), `will-change`, `left`, `top` and
`--disc-size` are **identical**. What differs is how Chromium rasterizes the
disc's curved edge after that element has been moved by a tween.

The run-to-run variation is itself evidence: a state difference would be stable,
a rasterization residue is not. The gate was **not widened to absorb it** — the
warm-path proof reports the exact count and exits non-zero. Chasing it would mean
editing `setMark` inside the transplanted stage, which is exactly what the
transplant rule protects. A dozen pixels at 23/255 on the edge of a glowing disc
are invisible; the record says so precisely, so the GATE can decide whether to
close it. **Waiting on:** the GATE.

## 7.3 The condensation's two centres

The `UnitField` collapse converges on the stage centre (960, 540); the approved
mass sits at the forms' centre (960, 650). Mid-gesture the mass gathers 110 px
below the hole it is being fed from. Both endpoints are approved cells and
neither can move without a ruling; closing the gap would mean either moving an
approved cell or changing the shared component's collapse centre — a component
change, out of Batch A's scope. **Waiting on:** his eye on
`review/batch-a/strip/g-p1-condense.png`.

## 7.4 Three seams at the splice — noted, not smoothed

- **`2-04-the-competition-record` now opens the remaining Section 2** and its
  first line is *"Once you know the contest is about salability…"* — a term the
  retired `2-02` introduced. Act II is Batch B's scope.
- **`4-01-define-the-job` ends** *"let me show you the smallest example I can
  think of"* — a handoff that pointed at the retired `4-03`. It now lands on
  `4-06`.
- **`4-06-claim-and-carrier` opens** *"So the claim is the essence of money"* —
  whose immediate antecedent was the retired `4-04`. The *concept* is now
  established far earlier, in Scene 3; the sentence's "so" is the seam.

None is Batch A's to fix (the batches that replace those slides are C, D and E),
and the deck runs end to end through all three.

## 7.5 The definition leaves the screen until Batch D

`AN EARNED, TRANSFERABLE CLAIM ON VALUE` was staged on `4-04`. With that slide
out of the manifest, the definition has no on-screen appearance until **Scene
16** lands in Batch D, where the architecture puts it. Spoken, it survives in
`4-06`'s script. **Flagged, not decided.**

## 7.6 Ambiguous legacy fates — flagged, never decided

- `3-00-waypoint-function` and `3-08-waypoint-judge` are the waypoint device,
  which the architecture RULED retired — but no Batch A scene supersedes them.
  They stay in the deck. **Batch C's call.**
- `5-01-thank-you` maps to Scene 30 and stays. **Batch F's call.**
- The section-2 and section-4 orphaned helpers (`_hoursScene.js`,
  `_triadScene.js`, `_triad.js`, `_exchangeScene.js`) now have no manifest
  reader. Files kept on disk per the standing rule; deleting them is a later
  batch's tidying, not this one's.

## 7.7 `fiat`'s frame is a fourth aspect family

`fiat.png` is 1672 × 941 — near 16:9 — and every present call site gives it a
6:5 box (`ComparisonAssetHeader`'s 180 × 150 and 96 × 72). That is a 48% aspect
departure, well past the framing rule's "within a few percent", and it is
visible on the distinctness strip: at lineup scale the note renders much smaller
than the certificate because `object-fit: contain` letterboxes it. **Every call
site is an Act IV/V scene** — out of Batch A's scope. **Waiting on:** the batch
that owns those scenes (D and E).

## 7.8 The `shares` / `fiat` collision is now checkable

The manifest has warned since R7.4 that `shares` "reads as banknotes at 180 px,"
and that beside `fiat` it would be "a collision worth the presenter's eye."
Both renders now exist. Not run here — no Batch A scene shows either. **Open.**

## 7.9 The R7.4 static gate no longer describes the deck

`review/rebuild-r7-4/harness/gates-r7-4.cjs` asserts "the deck is 45 slides" and
"the one pending subject (fiat) is documented for regeneration." Both are now
false **by presenter ruling**, not by drift. The archived gate was not widened,
edited or re-run to pass — it is left exactly as it was, and this is the record
that it needs re-baselining. **Waiting on:** the GATE.

## 7.10 The scene test's count

`docs/scene-test.md` carries eleven questions. Three governing documents still
say "the ten-question scene test": `AGENTS.md` §15.12, `docs/batch-a-package.md`
§6, and `docs/synthesis-architecture.md`'s process section. The file's own
provenance note explains the eleventh; **the phrasing in those three documents
was not amended** — the architecture is amendable by presenter ruling only, with
a freeze-register entry, and the other two follow it. **Waiting on:** a one-line
ruling.

## 7.11 The Claim Mark component still lives under `src/proto/`

`src/proto/claim-mark.js` holds the film's only recurring protagonist and the
recorded Gate 1 selection, and three shipped scenes now import it from there.
Moving it into `src/components/` would break three archived harnesses that
import it by absolute path — including `review/gate-2/harness/states.mjs`, which
the landed-state proof depends on. Left where it is. **Waiting on:** a later
batch that can re-point the harnesses, or a ruling that they may go stale.

---

# 8. Files changed

## New

| file | what |
|---|---|
| `docs/scene-test.md` | the eleven questions, verbatim, with provenance |
| `docs/batch-a-implementation-report.md` | this report |
| `src/scenes/prologue/_prologueStage.js` | the Prologue's shared machinery: the rasterization contract, the form boxes, the condensed mass (transcribed) |
| `src/scenes/prologue/p1-eighty-thousand-hours.js` | P1 — 11 beats + the entry black |
| `src/scenes/prologue/p2-the-stakes.js` | P2 — 2 beats |
| `src/scenes/act-1-the-unfinished-exchange/_exchangeStage.js` | the shared Act I stage, transplanted and specialized to the absence |
| `src/scenes/act-1-the-unfinished-exchange/_sceneModule.js` | the scene contract, transplanted |
| `src/scenes/act-1-the-unfinished-exchange/_birth.js` | the birth, transplanted and specialized to pool |
| `src/scenes/act-1-the-unfinished-exchange/02-the-direct-exchange.js` | Scene 2 |
| `src/scenes/act-1-the-unfinished-exchange/03-the-breakthrough.js` | Scene 3 |
| `src/scenes/act-1-the-unfinished-exchange/04-spend-or-save.js` | Scene 4 |
| `src/components/rasterHint.js` | the refcounted canvas layer-hint claim — a new shared component because two acts need it (§7.0) |
| `assets/dark-field/fiat.png` | gated and ingested |
| `review/prologue/states/p1-b7-glow.png` | the ruled ledger cell |
| `review/batch-a/**` | six harnesses, six evidence files, the distinctness strip, and the 41-frame capture strip |

## Modified

| file | what |
|---|---|
| `src/slides/manifest.js` | the splice: five scenes in, eleven legacy entries out, two new sections, the mapping in the header |
| `src/styles/slides.css` | one new block — the Prologue's mass reveal, the morph's dissolve delay, the title's beat of emptiness, and their reduced-motion collapse. Timing only; all geometry is in the scenes |
| `src/dark-field.js` | `fiat`'s measured framing row; the ledger assignment amended; the aspect-families note updated with the flag |
| `docs/dark-field-manifest.md` | §2.2 V-1 ruled and the ledger row amended; the `fiat` row in §2; §3.0 closed with the ingest record and the distinctness read; §6 summary |
| `docs/batch-a-package.md` | §1's P1 map amended to eleven beats (ruling 3) |
| `review/prologue/harness/states.mjs` | the 3:2 form box and the `p1-b7-glow` cell builder |
| `review/prologue/states/states.json` | the rulings block, the approved set, the retirement records |
| `docs/handover.md` | caught up |

## Out of scope, changed anyway — and why

**One file, named rather than glossed:** `src/components/rasterHint.js` is new
shared machinery rather than a scene file, because two acts need it and the
`src/scenes/README.md` rule sends anything two acts need to a component. It
exists for a defect this batch's own scenes surfaced (§7.0), it is nine lines of
logic, and it touches no engine file and no existing component. Everything else
above is a Batch A deliverable, a record of one of the five rulings, or the
manifest integration the splice requires.

`review/rebuild-r7-2/grade-r7-2.json` was rewritten by the standard ingest
harness as a side effect and **restored byte-for-byte from git**, so no prior
evidence was lost. No other file outside the batch's scope was touched — in
particular the closed prototype in `src/proto/gate-2/` is **byte-unchanged**,
which is what lets the transplant proof compare against it.

## Commits, in order

```
f4eba56  docs: install the Batch A implementation brief
4e581e4  docs: record the presenter's Batch B package as dropped
4141e0a  review(prologue): ruling 1 — C1 is the coin, and V-1 closes as a presenter decision
6e60ae1  review(prologue): ruling 2 — p1-b7 is ledger_glow
feaac30  review(prologue): the ruled ledger form rendered through the states pipeline
1f288e4  docs: ruling 3 — the 11-beat P1 map is binding
70964b8  review(prologue): ruling 4 — every remaining Prologue cell approved
867e529  docs: ruling 5 — the scene test on file, eleven questions verbatim
9fcee21  assets: fiat gated, ingested and rowed — the register is complete
7751be9  scenes(prologue): P1 and P2 — the film's opening, against the approved cells
7591be4  scenes(act-1): Scenes 2–4 transplanted from the closed gate
cfee246  deck: the manifest splice — the film's first five scenes enter the deck
de76053  fix(P1): the field leaves the frame once it is spent
aef454a  fix(scenes): the canvas layer hint is refcounted
16f6f8c  review(batch-a): the static gates — 13/13 green
940dc32  review(batch-a): the landed-state proof — 33 approved cells, per pixel
ae58715  review(batch-a): the warm-path proof — the deck walked from the top
3b819d2  review(batch-a): the transplant proof — 19/19 identical to the closed gate
7e0ac92  review(batch-a): the smoke — the whole spliced deck, both ways
e292377  review(batch-a): the capture strip — the opening ten minutes in one page
```
…plus this report and the handover. **Tag: `batch-a`.** Twenty-two commits,
every one self-contained.

---

# 9. Remaining judgment calls — all his

- The **eight scene-test tensions** in §6, and the three verification flags in §7.1–§7.3.
- The **three splice seams** in §7.3 and the definition's absence in §7.4 —
  each belongs to a later batch, and each is his to sequence.
- The **ambiguous legacy fates** in §7.6 — flagged, never decided.
- `fiat`'s box (§7.7) and the `shares` collision (§7.8).
- The scene test's count in three documents (§7.10).
- Deferred to the GATE by this FAST run: everything in §5's not-run list, plus
  the R7.4 gate's re-baselining (§7.9).

---

# 10. The review protocol — the presenter's part

> **He reviews the deck itself now, as a viewer, from the top.**

This is the first continuous viewing of the real film's opening ten minutes.
Run the dev server and open the deck with no parameters — it starts on black,
which is where the film starts — and walk it forward with `→`, at speaking pace,
reading nothing. `N` shows the notes if he wants the script under the frame;
`←` and `↑` go back (`↑` re-enters the previous scene at its end).

The five scenes are slides **1–5**; slide 6 is where the legacy deck resumes,
and the seams from there on are the ones §7.3 names.

`review/batch-a/strip/strip.html` is the record — 33 settled frames and 8
gestures caught mid-flight — but it is **not the review**. The review is the
deck, running.

---

# 11. Recommended next step

**His viewing of the deck from the top**, and his verdicts on the eight
scene-test tensions and the two visual flags. On those, Batch B (Act II, Scenes
5–10) opens against `docs/batch-b-package.md`, which is already on file.

---

# 12. Disposition (appended 30 August 2026 — presenter-reviewed)

The presenter has reviewed §6's **eight scene-test tensions** and §7's **eleven
flags**. All are **accepted as flagged**: nothing here is a defect to fix, and
**no action is taken on any of them in the condensation-fix session**. What each
one rides to is recorded below so none of them can quietly become nobody's.

**The one item that did not ride** is P1's condensation, which he ruled on
separately — the ruling and its execution are `docs/p1-fix-and-act-2-systems-brief.md`
and its report. It reopened `p1-b3` only.

## The eight scene-test tensions

| tension | rides to |
|---|---|
| P1 Q4 — beats 9 and 10 are two consecutive told-lines before the title | **the essay-conversion step** (script) |
| P1 Q6 — the condensation's two centres | **his eye**, and re-flagged sharper after the fix (§7.3, and the fix report) |
| P1 Q9 — the visuals never say the five objects are *money* | **the essay-conversion step** (script) |
| P2 Q2 — the frame holds rather than explains | design by his own ruling of 25 Aug; **no action** |
| P2 Q4 — told, flatly | **the essay-conversion step** (script) |
| P2 Q7 — the screen creates no next question | design by the architecture's own placement; **no action** |
| S2 Q3 — six capability lines, the batch's densest text | his own ruling of 26 Aug; **no action** |
| S3 Q9 — beat 7 needs narration for *why* | **the essay-conversion step** (script) |

## The eleven flags

| flag | rides to |
|---|---|
| §7.1 the hours field's unseeded jitter | **the GATE** (verification method) |
| §7.2 2–12 px on the forward walk | **the GATE** |
| §7.3 the condensation's two centres | **his eye** — see the fix report; the ruling replaced the object, not the geometry |
| §7.4 the three splice seams | **Batches C, D and E**, with the slides they belong to |
| §7.5 the definition off-screen until Scene 16 | **Batch D** |
| §7.6 ambiguous legacy fates (the waypoints, 5-01, the orphaned helpers) | **Batches C and F** |
| §7.7 `fiat`'s frame against a 6:5 box | **Batches D and E** |
| §7.8 the `shares` / `fiat` collision | **his eye**, open |
| §7.9 the R7.4 static gate's re-baselining | **the GATE** |
| §7.10 "ten-question scene test" in three documents | **a one-line ruling**, whenever he gives it |
| §7.11 the Claim Mark component under `src/proto/` | **a later batch** — named a hygiene item that rides, in the fix brief's own §4 |
