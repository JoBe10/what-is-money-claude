> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R7.3 Phase Report — Renders, Brightness, and Craft Fixes

**Branch:** `rebuild-r7-1-harmonization` (not merged) · **Base:** `main` at `b029e4d` · **Continues:** `docs/r7-report.md` → `docs/r7-1-report.md` → `docs/r7-2-report.md`
**Brief:** `docs/r7-3-addendum-brief.md` · **Governing:** `docs/sections-1-3-rebuild-brief.md` §9.4 (rule 10 added here), `docs/icon-grammar.md`, `docs/dark-field-manifest.md`
**Date:** 11 August 2026

> **Status: complete.** All eight sections of the brief are implemented. The
> four presenter-generated renders are graded and integrated, the brightness
> floors are codified as §9.4 rule 10 and enforced deck-wide by a new gate, the
> pattern slide is de-crowded, the ladder script is installed verbatim, the
> three small fixes are in, the glyph studio round stopped at the contact sheet
> as instructed, and the featured-render moments ship behind one toggle, off.
>
> Section 4's direction was out of scope and no Section 4 slide file changed —
> two gates prove it; the brightness floors reached exactly one frame there,
> 4.22, through the stylesheet, which is the propagation the brief admits.
> Waypoint and 1.5 copy are untouched — three gates prove that too. The
> argument, all fifty scores and 4.23 are byte-identical to `main`.
>
> **The one thing this phase found and did not fix** is in §2.4 and it is the
> first item flagged: applying the new rule deck-wide turned up 111 pre-existing
> departures on 21 slides, held at a declared baseline, because fixing them
> means changing delivered frames in three sections — and because on some of
> them the rule may need a clause before the frames need changing.
>
> This document is the R7.3 section of the R7 record. The four reports read in
> order — R7 (the execution rebuild), R7.1 (visual harmonization), R7.2 (the two
> registers), R7.3 (this) — and each supersedes the last only where it says so.
> R7.3 supersedes nothing; it finishes what R7.2 left pending in Section 2 and
> adds one rule the earlier phases did not have.

---

## 0. What the review actually found

Three of the brief's eight sections are craft fixes with obvious remedies —
install a script, restore a class, swap two icons for two words. The other five
share a diagnosis worth stating once, because it is the same diagnosis:

**the deck was correct at every frame and wrong across builds.** Every check in
the R7.2 suite passed against a pattern slide whose final frame had nothing at
full brightness on it. Every check passed against a contender row whose four
renders arrived at four different apparent sizes. Every check passed against
three functions radiating from a token that was not being drawn. What those
three have in common is that no gate in the suite knew what a *state* was
supposed to look like relative to the states around it — the composition sweep
measures one frame, the register audit measures one frame, the signature
compares two copies of one frame.

R7.3's structural contribution is the answer to that: **§9.4 rule 10, and a gate
that walks every build of every slide and compares each element to what it was
on the build it landed.** The murk states the presenter found are one
consequence of not having had it. There were others, and the gate found them.

---

## 1. §1 — the four renders, graded and integrated

The presenter generated `cattle`, `salt`, `cowrie_shells` and `iron` and dropped
them straight into `assets/dark-field/`. All four passed the grade gate
unmodified, first run, no adjustments:

| image | corner | border | dark | R−B | warm% |
|---|---|---|---|---|---|
| `cattle` | 0.09 | 0.09 | 83.0% | +106.3 | 100.0 |
| `salt` | 0.11 | 0.10 | 79.1% | +112.8 | 100.0 |
| `cowrie_shells` | 0.12 | 0.10 | 78.6% | +116.5 | 99.7 |
| `iron` | 0.07 | 0.48 | 86.5% | +75.5 | 97.7 |

Limits are ≤6 / ≤6 / ≥50% / ≥+18 / ≥90%. The whole shipping set is now **11
images, 55 checks, 0 failures**.

### 1.1 The defect that grading alone would have missed

The renders appeared on 2.4 the moment they landed in the directory — that is
what the `import.meta.glob` manifest is for, and it worked. They appeared
**wrong**, and the reason is exactly the failure mode R7.2's framing rule was
built to catch, arriving through a door that rule did not cover.

The four are **portrait, 1122 × 1402**. The first shoot is **landscape, 4:3**,
and the contender row's box was 180 × 135 to match it. The framing rule scales
a subject so its longer relative axis reaches 88% of its box's matching axis —
and that arithmetic assumes the render and its box share an aspect, because
`object-fit: contain` letterboxes a portrait image inside a landscape box
*before* the scale is applied. Every measured scale therefore landed short, by a
different amount per subject: the row came out at four apparent sizes, which is
the two-to-one spread R7.2 named as the O-07 problem arriving by a different
door — arriving again, by a third.

The fix is one line of geometry rather than eleven per-asset corrections: **the
contender row's box is now 150 × 188, the shoot's own 4:5**, and the measured
`FRAMING` rows are correct as printed. `src/dark-field.js` records the rule's
precondition in its own comment now, which it did not before: the box must be
the shape the render arrives in.

### 1.2 `cowrie_shells`, and why it is not `shells`

Both studies are cowries; both pass; they are from different shoots. The
contender row at 2.4 is the four portraits and the carrier lineup at 4.06 is the
five landscapes — **each row is internally one shoot**, which is what §9.4.9's
"as if from a single shoot" means at the level a viewer notices. Merging them
either way breaks one of the two rows.

So the R7.3 study is keyed `cowrie_shells` and `shells.png` keeps 4.06. The
subject-key principle survives intact because the *mark* does not fork:
`DarkFieldImage`'s `STUB_GLYPH` maps `cowrie_shells` → the `shells` glyph, so
2.4's transformation still collapses the render into the same cowrie the rest of
the deck uses. One good, two studies, one mark.

### 1.3 What went with it

The `DARK-FIELD PENDING` stubs are gone from `EvolutionRail.js`, the manifest
doc records the delivered shoot, its aspect, and the reason for the second key,
and the summary is down from *five images pending* to **two**: `surgeon` and
`meal`, both Section 4, both still choreographed around their stubs.

---

## 2. §2 — the brightness floors (§9.4 rule 10)

### 2.1 The rule

Added to `docs/sections-1-3-rebuild-brief.md` §9.4 as rule 10, in the
document's own form, with the closing attribution amended:

- **The legibility floor.** No element that has landed and is then dimmed — a dimmed prior, a `defeated` stop, a settled block — falls below **55% of the brightness it landed at**. Dimming means recede; it never means vanish into murk.
- **The last-lit invariant.** The most recently landed text element of any build renders at **full brightness**. Dimming applies only to elements that came before it.
- **One exception, and it is a handoff rather than a dim:** an entire scene layer that has given the frame to a superseding scene may recede past the floor, because nothing on it is being read.

### 2.2 The gate

`review/rebuild-r7-3/harness/bright-r7-3.cjs` walks every build of all 46
slides, cold-enters each one, and measures one number per ink element: its
**effective alpha** — the alpha of its computed color times every opacity
between it and the slide root. That collapses the three different ways this deck
dims something (a color-token swap, an opacity on the element, an opacity on an
ancestor) into one comparable quantity, and it is what the eye actually gets on
a black stage.

Four exemptions, each declared rather than inferred, each in the harness header
with its reason: a scene layer that has handed the frame over (`data-dimmed` on
the rail beneath the risen periodic table; `data-yielded`, added this phase, on
the exchange triangle beneath its own summary lines); a canvas field, where the
collective state of the members *is* the argument (the periodic table's cells
going out wave by wave — nobody reads "Md" at the end of 2.5); an overlay marked
`data-exiting`; and clearing, which §9.4 rule 1 sanctions in the same breath as
dimming.

Two definitions carry the weight. An element is **dimmed** only if it is dimmer
than it was when it landed — the deck's quiet tokens are not dimmed priors, they
are elements designed quiet, and the floor is not a minimum brightness for the
deck. And rule 2 speaks about **statements**: prose of twenty characters or
more, not a two-letter element symbol, a stop label or a kicker. A build that
lands no statement is a camera move or a diagram beat and has no sentence to be
tested on.

### 2.3 What it found, and what changed

The first deck-wide run failed **169 checks**. Every one was real in the sense
that the measurement was correct; the fixes divide into three kinds.

**The murk the presenter saw.** The rail's `defeated` state rendered its glyph at
0.32 and its label at 0.30 — and at the full-rail camera *every stop on the line
is defeated*, so 2.8's whole pull-back frame sat at a third of full voice. Both
now take `--text-prior` (0.58), and the hierarchy survives the change: **0.58
defeated · 0.75 lit · 0.95 active**. The wounded contenders' renders went 0.42 →
0.58 with them.

**Statements arriving at half voice.** This is the last-lit invariant, and it
was violated wherever the rail carries several text rows at once. A wound line
landed at `--text-muted` under a 0.95 opacity — 47% of full voice for the
sentence being spoken — and then stayed there forever while the next three
landed at the same tone. The rail now takes a `latest` marker from its caller
(per-stop for wounds and receipts, root-level for the riser notes, the entrant's
description and its limitation), because only the slide knows what its build
means. The row that just landed is white; the rows before it hold the floor.
2.5's wave lines went the same way: each is the verdict of its own elimination
and each was at 0.5.

**Three frames outside the rail and the pattern** that the deck-wide run
surfaced, recorded here because the brief scoped the *fixes* to rail and pattern
and the *gate* to the whole deck:

1. **2.2 b4** landed "…that property has a name: salability" at 0.75 beneath a birth line still at 1.0 — the newest line on the frame arriving quieter than the one it extends. The naming line now takes full brightness and the birth line recedes a step. Rank is carried by size and position, which is where it belongs.
2. **2.2 b3–b4's triangle** recedes to 0.45 as the summary lines take the frame. That is a handoff, not a dim, and it is now *declared* — `data-yielded` on the scene — rather than left as a bare opacity keyed on a step number for a reader to interpret.
3. **4.22 b2–b3 — the one frame in Section 4 this phase changes.** The mechanism line landed at 0.75 under an opening still at 1.0, and `data-quiet` then took both to 0.50. It is the same defect as 2.2's, and the brief admits exactly this case: *touch Section 4 only where a shared component fix (brightness floors, disc) necessarily propagates.* The remedy is the rule applied — the line being spoken at full voice, the one before it at the dimmed-prior step — and it went in through the stylesheet: **no Section 4 slide file changed at all.** Two gates hold that: no file in `section-4-ideal-store/` differs from the phase's starting commit, and the only `.s4-` CSS blocks that moved are those three, with nothing changed on them but `color`. Section 4's *direction* remains a separate conversation, and this is not it.

### 2.4 The backlog the deck-wide run found — and why it is not fixed here

Running a new rule over an old deck finds old states, and this found a lot of
them: **111 departures on 21 slides**, none of them introduced by this phase,
none of them on the rail or the pattern. They fall into exactly two idioms.

1. **A dimmed prior settling to `--text-dim` (0.30) or 0.50.** The same murk the presenter flagged on the rail — but in frames where a bright statement still dominates, which is very likely why he did not flag them. 1.3's standing question at 0.30 under three answers; 4.18's dimmed equation terms; 4.20's architecture block at 0.26 behind its closing pair.
2. **A statement landing at `--text-secondary` (0.75) beneath a header still at full brightness.** 1.5's three "Ask…" lines under "How do you understand anything mysterious?", 1.3's three answers under its question, and a dozen more.

The second one is where I would want a ruling before touching anything, because
**the rule may be incomplete rather than the frames wrong.** On several of those
slides the bright element is a *standing subject* and the quieter lines
accumulate beneath it — which §9.4 rule 1 already recognizes as "a list being
built is one accumulating element". The last-lit invariant, as written, does not
name that shape. Fixing those frames would mean inverting which line is bright
on a dozen delivered slides across three sections, including Section 4, whose
direction is explicitly a separate conversation. That is not a session's call to
make on its own authority.

So the gate does two things and keeps them apart. Over the **enforced scope** —
the ten slides this phase fixed — a departure is a failure, and there are none.
Everywhere else it is counted against a **declared per-slide baseline** written
into the harness and the JSON: a slide over its number fails, a slide under it
prints and asks to have the number lowered. A baseline is not an exemption; it
is a count that cannot go up silently, and it turns an invisible permanent
backlog into a visible finishable one.

Final: **0 failures over the enforced scope**, 46 slides walked, every build
cold-entered; **111 pre-existing departures recorded at baseline.** The full
census is in `review/rebuild-r7-3/bright-r7-3.json`.

One thing the gate is honest about not covering: ink drawn as a
`background-color` — the rail's marker dots, its line, the tower's slabs.
Background composites against whatever is behind it and is not comparable to a
text alpha. The dots were brought up with their labels by hand (0.4 → 0.58) and
that change is not gated. It is stated in the harness header rather than left to
be discovered.

---

## 3. §3 — the pattern slide de-crowded

Three changes, all state design, no copy touched.

1. **The wound lines were already gone** at the full-rail camera — `STOPS_SEVERED(n === 0)` shows them only on the inherited severance frame at b0. Verified rather than changed, and the comment now says why the camera drops them.
2. **The BITCOIN block splits.** The three-fact description lands at full voice on b5 and recedes one step on b6, when the limitation lands and holds bright. Before this the description sat at 0.75 and the limitation — the honest half of the beat, the sentence the section exists to be careful with — arrived permanently at 0.5.
3. **The thesis clears.** Each line lands at full voice and the one before it settles to the dimmed-prior step; at b5, when the entrant takes the dark edge, the first two chapters clear entirely and **the closing line holds full brightness as the frame's end state**. It used to dim all three at once from b5, which left the frame's last word at half voice with nothing at full voice anywhere on stage.

Net visible text at b6 is exactly the brief's list: the closing thesis line
(bright), the stop labels, and the Bitcoin limitation (bright), with the
description receded behind it. `verify-r7.cjs` asserts that end state by name
and by measured alpha, so it cannot drift back.

---

## 4. §4 and §5 — the scripts and the small fixes

**§4, the ladder.** The brief's two paragraphs replace the second and third of
2.6's script, installed verbatim. `[→]` count unchanged at four; first and final
paragraphs untouched; `totalBuildSteps` unchanged. The one licensed departure
from *verbatim* is orthographic: the brief is written with ASCII apostrophes and
the deck's language rule requires typographic ones, so `you've` → `you’ve` and
its three siblings. `gates-r7-3.cjs` byte-checks both paragraphs against the
brief with apostrophes normalized, so a later edit cannot drift from an approved
script without the gate saying so.

**§5.1, the missing disc — and it was missing twice.** 3.1's three functions
radiate from `.s1q-token.s1q-token--small`, which since R7.1 carries only
*where the token sits and how it arrives*; the disc's identity — the diameter,
the radius, the gradient — moved to `.luminous-disc`. Two callers were not
updated: 3.1, which the brief names, and **2.3, the convergence**, which it does
not. Both rendered a 0×0 element with a box-shadow: a faint warm glow with no
disc in it. Both are fixed by adding the class, and 2.3 is reported here as an
out-of-scope change made because it is the same regression from the same
migration, one slide earlier in the same section. A named assertion now proves
both tokens are literally the shared render (class, gradient, diameter, radius).

**§5.2, the Argentina columns.** `USD` and `ARS` as typographic marks in the
deck's label register, at glyph scale, sharing the glyph row's color and its warm
luminance. The `$` collision was unfixable as an icon — both currencies use the
sign, so the row that exists to say *three different goods* rendered the same
drawing twice — and the peso's alternative, the sol de mayo, was a second sun
two slides after gold's. The brick keeps its glyph, because a brick is a thing
you can draw. `dollar` and `peso` are retired in `glyphs.js` with their studio
records intact, in the form the gate and tie marks were retired in; a gate
proves neither has a call site left.

**§5.3, the periodic-table bridge.** One sentence, installed at the head of
2.5's opening paragraph — the seam is where the transition happens, and the
sentence begins with "So", which chains from 2.4's closing line about the metals.
No other word moved.

---

## 5. §6 — the studio round, and where it stopped

**Eighteen glyphs, three new candidates each, one contact sheet, no
selections.** `review/rebuild-r7-3/icon-studio/contact-sheet.png`, plus four
group sheets for reading. Every row carries the mark shipping today first, at
the same scales as the proposals — a candidate that cannot beat what is already
on stage is not a candidate — and every row is rendered at **the scales that
glyph actually ships at**, taken from the call sites: 62 and 48 for the
contenders, 22 for the risers, 40 for the ladder, 56 for 3.1 and 3.2, 96 and 56
for the table, 76 for the carrier lineup, 36 for the ladder's entity berth.

The proposals live in `assets/icons/candidates/candidates-r7-3.js`, which has
**no importer in `src/`**. Three gates hold that line: no importer, no selection
changed in `glyphs.js` since the phase's starting commit, and the sheet exists.
The brief's reasoning is recorded in the file itself — prior rounds'
self-selections are what keeps reading as basic, so this round does not select.

The bar was raised to one sentence: *every candidate must carry one memorable
formal idea, something describable in words after seeing it once, not a generic
outline of the object.* Where the idea was available in the record it was taken
from the record — the ox head that became the letter A, the Ethiopian salt bar,
the Kissi penny, the cowrie string of forty, the milled edge that stopped
clipping, the split tally that is the ancestor of every paper claim.

**One finding worth the presenter's attention.** The round's first cut produced,
independently, a Mercedes mark (shares), two bar charts (measure and
real-estate), a second sun two slides from gold's (coinage) and a gender sign
(bitcoin's key, drawn upright). All four had been rejected *by name* in earlier
rounds. They are attractors, not accidents: they are what a mark drifts into
when the idea is thin. All four were re-cut before the sheet shipped, along with
nine other candidates that read as generic at deployed scale, and the re-cuts
are recorded in the candidate file.

Out of this round's scope, named so the boundary is visible: the 2.1–2.2 barter
goods (`fish`, `grain`, `sandals`), Section 4's derivation marks (`operation`,
`shoe`, `meal`, `wine` — R7.1's round, and three of the four now appear as
dark-field renders at their display surfaces), and `ledger`. The brief's
parenthetical enumerates the set; these are outside it.

---

## 6. §7 — the featured-render moments (flagged, off)

Implemented behind **one toggle**, `RAIL_FEATURE` in
`src/components/section-2/RailFeature.js`, shipping `false`.

The pattern is close-up + schematic: at the rail's two arrival moments, a
display-scale render appears **above** the rail as the sensory beat while the
stop below keeps its glyph and the record stays a record, then recedes as the
camera moves on. METALS rising is 2.4 b8, which is that slide's last build — the
camera moves on by leaving. GOLD taking the crown is 2.6 b0–b1, and it recedes
at b2, when the first rung climbs into that airspace.

**The architectural point is where it lives.** The close-up is in the slide's
overlay, in stage coordinates, not in the rail's world layer. A render inside
`.s2o-rail` would travel with the camera and would *be* an entry on the record;
§9.4.9's containment rule and the register audit's rail assertion would both be
right to fail it. Here the schematic is one layer and the close-up is another,
and the slide composes them. `register-r7-3.cjs` asserts it by name on every
build: the close-up is above the rail, never inside it.

**Gold only, for now.** The brief says "a metals study if provided, else gold
only", and no metals render exists. The metals slot is implemented and dormant:
`RailFeature` returns null for a subject with no graded render, so dropping
`metals.png` into `assets/dark-field/` lights the second moment with no code
change. It deliberately does **not** stub to a glyph — the stop below it already
shows that glyph, and two copies of one mark stacked vertically is not a sensory
beat. The manifest records the prompt.

Both toggle states are screenshotted at
`review/rebuild-r7-3/screenshots/feature/`. Note that 2.4 b8 is *identical* in
both states until a metals study exists, which is the honest state of the
pattern rather than a capture error.

---

## 7. The register and decision log

Register assignment for all 46 slides, measured from the live DOM rather than
declared (`review/rebuild-r7-3/register-r7-3.json`). The convention is
unchanged: a slide that declares no register speaks the line grammar.

| slide | register | renders | pending | what changed at R7.3 |
|---|---|---|---|---|
| **1.01 – 1.05** | line | 0 | 0 | Untouched. |
| **2.01** | line | 0 | 0 | Untouched. |
| **2.02** the discovery | line | 0 | 0 | The triangle's yield to its summary lines is now declared (`data-yielded`); the naming line takes full voice and the birth line recedes (§2). |
| **2.03** the convergence | line | 0 | 0 | The token is the shared luminous disc again (§5.1) — the same regression as 3.1, one slide earlier. |
| **2.04** competition record | **mixed** | 4 | 0 | The four contender renders integrated at their own 4:5 box; the wound that just landed speaks and the rest recede; the flagged METALS close-up (dormant, no metals study). |
| **2.05** two survivors | line | 0 | 0 | Each wave's verdict line at full voice (§2). Gold arrival still flagged, still off. |
| **2.06** the ladder | line | 0 | 0 | The brief's two script paragraphs installed verbatim; gold's traits speak on their build and the riser notes speak on theirs; the flagged GOLD close-up (off). |
| **2.07** the severance | line | 0 | 0 | Re-skinned by the rail's brightness floors only; composition unchanged. |
| **2.08** the pattern | line | 0 | 0 | De-crowded (§3): the thesis clears to its closing line, the BITCOIN block splits, the record's labels come up off the floor. |
| **3.00** waypoint | line | 0 | 0 | Untouched — waypoint copy is pending presenter rulings. |
| **3.01** three functions | line | 0 | 0 | The LuminousDisc restored at the center of the triad (§5.1). |
| **3.02** functions separate | line | 0 | 0 | `USD` / `ARS` typographic marks; the peso glyph retired (§5.2). |
| **3.03 – 3.08** | line | 0 | 0 | Untouched. |
| **4.22** fixed supply | line | 0 | 0 | Brightness floors only, through shared CSS — the one Section 4 frame this phase reaches (§2.3). No slide file changed. |
| **4.01 – 4.21, 4.23, 5.01** | as R7.2 | — | 2 | **Untouched.** Section 4's direction is a separate conversation; two gates prove nothing in it moved. |

---

## 8. Verification

Everything below was run against the final tree on this branch — every suite
re-run after the last change to source or harness, so no number here is quoted
from an earlier state. The freeze baseline is `main` at **`b029e4d`**; this
phase's own starting line is **`a956b09`** (R7.2 shipped, plus the presenter's
four renders).

| harness | what it proves | result |
|---|---|---|
| `grade-r7-2.cjs --out review/rebuild-r7-3` | the dark-field grade, per image, per clause | **11 images, 55 checks, 0 failures** |
| `gates-r7-3.cjs` | the freeze, the scope, the registers, the studio round unapplied, the approved scripts, the flagged toggles, language, pacing | **47 checks, 0 failures** |
| `bright-r7-3.cjs` | §9.4 rule 10, every build of all 46 slides | **94 checks, 0 failures** over the enforced scope · 111 backlog at baseline |
| `register-r7-3.cjs` | the register audit, every build of all 46 slides | **271 checks, 0 failures** |
| `compose-r7-3.cjs` | §9.4.4 measured, over Section 4, the close, and the nine Sections 2–3 slides | **180 checks, 0 failures** (6 pre-existing at baseline) |
| `verify-r7.cjs --part=traversal,direct --emit-live --use-live` | forward/back/fast-forward walks, direct entry, reconstruction, named assertions, mid-animation refresh; 165 live signatures | **363 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=traversal,direct --reduced` | the same matrix under `prefers-reduced-motion` | **363 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=settle` | the reduced-motion settle gate | **40 checks, 0 failures** |
| `flash-r7.cjs` (+ `--rm`) | frame capture at 21 boundaries, 15 frames each | **21 / 0 in both variants** |
| `rhyme-r7-1.cjs` | the claim and 1.2's token are still one render | **4 checks, 0 failures** |

Five named assertions are new, and each pins something this phase could
otherwise have lost quietly: 2.4 b0 stands on four renders that are all from the
R7.3 shoot (a silent fall back to the first shoot's `shells` would look almost
right); 2.4 b7's receipt speaks while the other three wounds hold the floor,
asserted as measured alpha rather than as a class name; 2.8 b6's end state is
the closing line and the limitation alone; and 3.1 and 2.3's tokens are
literally the shared luminous disc, asserted by gradient, diameter and radius —
the defect that shipped because every check passed on a frame that was wrong.

Two flash boundaries are new: 2.8 b4 → b5 in both directions, where two 40px
lines clear on the same advance that lands the entrant at the far side of the
frame.

**1,054 assertions over the enforced scope, none failing.** `npm run build`
clean. Pacing regenerated across Sections 1–4 and the close: **no build count
changed in this phase** — every change rides an advance the script already had,
including §3's, and a static gate asserts no `totalBuildSteps` line moved.

### 8.0 The freeze

`_comparison-data.js` is byte-identical to `main` at `b029e4d` — the whole file,
ten properties × five candidates = fifty scores.
`23-investment-case-from-first-principles.js` is byte-identical too. **No file
in `src/slides/section-4-ideal-store/` changed at all**, and the only `.s4-`
CSS block this phase touched is 4.22's two brightness states, with nothing
changed on them but `color` — both gated. Waypoint copy (3.0, 3.8) and 1.5 are
byte-identical to the phase's starting commit, as the brief requires.

### 8.1 Three corrections, all mine

Recorded because a verification pass that quietly widens its own tolerances is
worse than no verification pass.

1. **A statement heuristic that mis-classified two labels.** The last-lit rule needs to know which landed text is the build's *sentence*, and length alone was doing that job. It called `— moves value through time.` a statement — which it is, but it is also the muted half of a two-voice line whose bright half, `STORE OF VALUE`, is fourteen characters and did not count — and it called `dollars · real estate` a statement, which it is not. Two refinements, each narrow: a statement now has to *end* like one (terminal `.`, `?` or `!`), and rule 2 measures per **line**, taking the brightest ink on the line a statement belongs to. Both false positives went; nothing real went with them. This is the correction I most want on the record, because the alternative was three "fixes" to frames that were already right.
2. **A census that moved between runs.** The brightness gate sampled changed builds at 2000ms and the backlog count jittered by a dozen entries — Section 4's carrier slides reporting mid-transition opacities as departures. A baseline that moves is not a baseline. Raised to **2700ms**, the number the R7 verify suite already settled on for the same reason, after which two consecutive runs agree exactly: 111 across 21 slides, both times.
3. **A clock that was too slow for one slide, in the other direction.** Adding 2.3 to the verify suite's scope surfaced a reconstruction "mismatch" whose entire content was the convergence token's `data-visible`. The murmuration runs for 5200ms and resolves the token at 78% of it — 4056ms — and the walk samples changed builds at 2700ms, so it was comparing a frame mid-gesture against a reconstruction of the frame's end state. The frames are identical; the clock was wrong. Fixed with a per-slide override rather than a global raise, which would have cost 130 builds two seconds each to fix one.

None of the three was a deck defect, and all three would have hidden a real
regression on the slides they touched. They are the good kind: found by widening
the suite's scope rather than by luck.

### 8.2 Evidence

- `review/rebuild-r7-3/screenshots/` — every build of the ten changed slides, with `before/` holding the same builds as the branch shipped them. `feature/` holds both states of the flagged close-up.
- `review/rebuild-r7-3/icon-studio/` — the contact sheet, four group sheets, and the page they were rendered from.
- `review/rebuild-r7-3/dark-field/contact-sheet.png` — nineteen surfaces at their shipping sizes, through the shipping component; the two grade clauses a machine cannot judge are judged here.
- `grade-r7-3.json`, `gates-r7-3.json`, `bright-r7-3.json` (with the full census), `register-r7-3.json`, `compose-r7-3.json`, `pacing-r7-3.json` — machine-readable results.
- `review/rebuild-r7/flash-frames/` and `flash-frames-rm/` — the boundary windows, including the two new ones. A shared directory the flash harness overwrites each run, as it did for R7.1 and R7.2.
- R7.2's evidence is untouched: its `grade-r7-2.json` is still its own seven-image run, which is why the grade gate grew an `--out` flag rather than being pointed at a new directory.

---

## 9. Flagged for presenter review

0. **The brightness backlog** (§2.4) is the biggest thing on this list. 111 pre-existing departures from the rule you just approved, on 21 slides across Sections 1, 3 and 4, at a declared baseline. Two idioms; one of them (a statement landing quieter than the standing question above it) may mean the *rule* needs a clause about accumulating lists rather than the frames needing changing. This wants a ruling before anyone touches a delivered frame.
1. **The glyph studio round awaits selections** (§5). Eighteen rows, three candidates each, nothing applied. This is the item the brief is most explicit about and the one with the most work behind it.
2. **The featured-render moments are off** (§6). Both states are screenshotted. If they are ruled in, note that 2.5's gold arrival (R7.2's flag, also off) would put gold on stage on the build immediately before 2.6's close-up — two gold moments in a row. Ruling one in probably means ruling the other out.
3. **A `metals` study is the one asset that would complete §7.** Without it the METALS arrival is implemented and invisible.
4. **The contender row's renders are centered in their boxes, not stood on a common baseline.** That is the measured framing rule behaving exactly as R7.2 specified it — each subject's longer axis normalized to 88% of its box — and the visible consequence is that the cowrie cluster, which is wide and flat, floats higher above the label line than the other three. Bottom-anchoring is derivable from the same measurements if the presenter prefers it; it would be a change to the rule, not a hand-tune, and it is not one this session made on its own authority.
5. **`iron` is the weakest of the four renders on the eye**, though it clears every threshold. It is dark, its silhouette is ambiguous at a glance, and it runs off the bottom edge of its own frame. On grade and on the contact sheet — worth a look before it is final.
6. **The dimmed-prior step is 0.58 deck-wide.** One number, one token, and it is a judgment: 0.55 is the floor the brief sets and 0.58 sits just above it so a prior that recedes has somewhere to go. If the presenter reads the record's stops as still too quiet at the full-rail camera, this is the single value to move.
7. **Carried forward from R7.2, unchanged and still open:** the bitcoin carrier render reintroduces V-1 (a photograph of a physical coin); `surgeon` and `meal` are still pending; 4.18's three asset examples stay glyphs; 4.03 is balanced rather than centered; the new shell re-skins six slides.

---

## 10. What changed, in one place

**Added:** §9.4 rule 10 (the brightness floors); `--dim-prior` and
`--text-prior` in `globals.css`; `src/components/section-2/RailFeature.js` (the
flagged close-up); `assets/icons/candidates/candidates-r7-3.js` (54 proposals,
unwired); four harnesses under `review/rebuild-r7-3/harness/` — the brightness
gate, the R7.3 static gates, the R7.3 register audit, the icon studio — and the
R7.3 contact sheet.

**Changed:** `EvolutionRail` (the contender box's aspect, the subject key, the
`latest` marker); 2.02, 2.03, 2.04, 2.05, 2.06, 2.08, 3.01, 3.02;
`src/dark-field.js` (four framing rows and the aspect precondition);
`components/DarkField.js` (one stub mapping); `glyphs.js` (two retirements);
`slides.css` (the floors, the currency marks, the close-up). Three harnesses
amended in place with their reasons: the R7 verify suite (nine slides added to
its scope, five named assertions, one probe signature), the flash harness (two
new boundaries), and R7.2's grade gate (an `--out` flag, so a later phase can
run an unchanged gate and file its own evidence).

**Removed:** the `DARK-FIELD PENDING` stubs from the contender row; the
`dollar` and `peso` glyphs from the deck's surfaces.

**Untouched:** the argument, all fifty scores, 4.23, every slide in Section 4
and Section 5, Section 1 entirely, the waypoints, and 1.5.

---

## 11. Commits

- `fb25370` R7.3 §§1–7: the renders, the brightness floors, the de-crowding and the craft fixes
- `da90be3` R7.3 §8: verification, the evidence, and this report

Base: `main` at `b029e4d`. **Not merged.** The presenter's review follows: the
glyph selections first, then the brightness backlog, then the two flagged
toggles.
