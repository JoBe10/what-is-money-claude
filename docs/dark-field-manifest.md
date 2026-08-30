# The Dark-Field Manifest

**Standard:** `docs/what-is-money-master.md` §6 (the two registers)
**Gate:** `review/rebuild-r7-2/harness/grade-r7-2.cjs` · results in `review/rebuild-r7-2/grade-r7-2.json`
**Drop zone:** `assets/dark-field/incoming/` · **Shipping set:** `assets/dark-field/`
**Created:** R7.2, 1 August 2026

---

## 0. How this works

The dark-field register has a fixed grade, and the grade is enforced rather than
trusted. Four of its five clauses are measured:

| clause (§9.4.9) | measured as | limit |
|---|---|---|
| pure black ground, no environment | mean luminance of four corner patches (6% of the short side) | ≤ 6 / 255 |
| — and no environment reaching the frame | mean luminance of the outer 2% border ring | ≤ 6 / 255 |
| the subject emerging from darkness | share of the frame below luminance 16 | ≥ 50% |
| a single warm key (≈2700–3200K) | R − B across highlight pixels (L ≥ 128) | ≥ +18 |
| — one key, not two | share of highlight pixels that are individually warm | ≥ 90% |

The two ground limits come from the stage, not from the sample: the deck's
background is pure black and these images are composited onto it, so the
question is whether an image's own frame edge is visible against the slide. On
sRGB a large flat area separates from black at roughly 5–6/255. The gate also
reports the key azimuth and the highlight spread; those two are evidence for
the visual read (single-key-light consistency, and the absence of baked-in
text), which stays a human judgment on the contact sheet.

**The pipeline.** Generate from a prompt below → drop the file into
`assets/dark-field/incoming/` named for its subject key → run
`node review/rebuild-r7-2/harness/ingest-r7-2.cjs`. Passing images move into
`assets/dark-field/` and appear on their slides immediately, with no code
change. Failing images stay in `incoming/` with the failing measurement
printed. **Off-grade imagery never reaches a slide** — a slide whose render is
absent shows its grammar glyph, marked `data-pending="true"`, and says so in a
`DARK-FIELD PENDING` comment at the call site.

**The filename is the subject key**, and the subject key is the same string the
icon grammar uses for that subject's mark (`src/components/section-2/glyphs.js`).
That is what makes a subject exist in both registers and lets 2.4 crossfade
between them.

**Format:** PNG, 4:3 landscape, 1448 × 1086 — matching the shipping set, so the
whole register reads as one shoot at one focal length. The surgeon is the one
portrait frame (3:4, 1086 × 1448) because its slide gives it a portrait box.

---

## 1. The master template

Every prompt below is this template with **only the subject line changed**. Do
not vary the lighting, ground, or composition clauses — that variance is
exactly what the "one consistent look, as if from a single shoot" rule exists
to prevent.

> *"[Subject], photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

---

## 2. Present and passing — no action needed

Seven renders were restored from git history (`85bad44^`) and pass every clause.
They are the register's reference look; anything generated from §3 or §4 should
sit beside them on the contact sheet without standing out.

| subject key | file | used at | corner / border | dark | R−B |
|---|---|---|---|---|---|
| `shoe` | `assets/dark-field/shoe.png` | 4.04 wanted goods · 4.05 SPEND | 0.74 / 0.63 | 82.4% | +56 |
| `wine` | `assets/dark-field/wine.png` | 4.04 wanted goods · 4.05 SPEND | 2.28 / 1.12 | 95.5% | +115 |
| `shells` | `assets/dark-field/shells.png` | 4.06 carrier lineup | 0.10 / 0.08 | 80.2% | +72 |
| `gold` | `assets/dark-field/gold.png` | 4.06 carrier lineup · 2.5 two-survivors (flagged) · 2.6 featured moment (flagged) | 0.08 / 0.07 | 86.7% | +181 |
| `paper` | `assets/dark-field/paper.png` | 4.06 carrier lineup | 0.09 / 0.08 | 80.5% | +80 |
| `ledger` | `assets/dark-field/ledger.png` | 4.06 carrier lineup | 0.10 / 0.08 | 69.0% | +138 |
| `bitcoin` | `assets/dark-field/bitcoin.png` | 4.06 carrier lineup | 0.11 / 0.10 | 77.2% | +154 |

**The R7.3 contender shoot — four more, all passing** (presenter-generated,
grade-gated 11 August 2026; the run is `review/rebuild-r7-3/grade-r7-3.json`):

| subject key | file | used at | corner / border | dark | R−B |
|---|---|---|---|---|---|
| `cattle` | `assets/dark-field/cattle.png` | 2.4 contenders | 0.09 / 0.09 | 83.0% | +106 |
| `salt` | `assets/dark-field/salt.png` | 2.4 contenders | 0.11 / 0.10 | 79.1% | +113 |
| `cowrie_shells` | `assets/dark-field/cowrie_shells.png` | 2.4 contenders | 0.12 / 0.10 | 78.6% | +117 |
| `iron` | `assets/dark-field/iron.png` | 2.4 contenders | 0.07 / 0.48 | 86.5% | +76 |

All four are **portrait, 1122 × 1402 (4:5)**, which is a second family beside the
first shoot's 4:3, and it is why the contender row's render box is 4:5: the
framing rule in `src/dark-field.js` normalizes a subject against its box, and it
can only do that if the box is the shape the render arrives in. Mixed into a
landscape box they came out at four different apparent sizes, which is the exact
defect the rule exists to prevent.

**Why the shells subject is keyed `cowrie_shells` and not `shells`.** Both
studies are cowries and both pass. They belong to different shoots, and a row
reads as one shoot or it reads as none: the contender row at 2.4 is the four
portraits, and the carrier lineup at 4.06 is the five landscapes, `shells`
among them. One good, two studies, one grammar mark — `DarkFieldImage`'s
`STUB_GLYPH` maps `cowrie_shells` back to the `shells` glyph, so the
transformation at 2.4 b6 still collapses into the cowrie the rest of the deck
uses.

**The R7.4 additions — four more, all passing** (the run is
`review/rebuild-r7-4/grade-r7-4.json`; 15 images, 75 checks, 0 failures):

| subject key | file | used at | corner / border | dark | R−B |
|---|---|---|---|---|---|
| `surgeon` | `assets/dark-field/surgeon.png` | 4.03 the sensory anchor | 0.00 / 0.82 | 92.1% | +133 |
| `meal` | `assets/dark-field/meal.png` | 4.04 wanted goods · 4.05 SPEND | 0.00 / 1.28 | 69.2% | +60 |
| `property` | `assets/dark-field/property.png` | the five-candidate lineup, at every display-scale appearance | 0.09 / 0.08 | 79.1% | +124 |
| `shares` | `assets/dark-field/shares.png` | the five-candidate lineup, at every display-scale appearance | 0.17 / 0.15 | 51.9% | +52 |

`surgeon` and `meal` are **graded, not regenerated**: both failed R7.2's gate on
their ground rather than their light (a lamp in shot; a lit stone surface), and
both were tonally right. The pass crops the room out, takes the surround to true
black with a smooth falloff, and lifts the black point — a colorist's three
moves, every parameter recorded and re-runnable in
`review/rebuild-r7-4/harness/regrade-r7-4.mjs`. `property` and `shares` are the
historical `comparison_*.png` files restored from `85bad44^`, unmodified.

**One to watch on `shares`:** the study is a fan of share certificates, and at
180px it reads as banknotes. Beside `fiat` — once `fiat` has its own render —
that is a collision worth the presenter's eye.

**The Batch A drop — all seven now shipping** (presenter-generated from the
Batch A package §5, grade-gated 25 August 2026; the runs are
`review/frames-a/harness/grade-frames-a.json`, `grade-frames-a-post-ingest.json`,
and — for the regraded `patient` and the set it joined —
`grade-selections-patient.json` and `grade-selections-post-ingest.json`):

| subject key | file | used at | corner / border | dark | R−B |
|---|---|---|---|---|---|
| `single_cowrie` | `assets/dark-field/single_cowrie.png` | P1 morph, the SHELL form | 0.58 / 0.49 | 89.0% | +105 |
| `gold_certificate` | `assets/dark-field/gold_certificate.png` | Scene 7, the claim on gold | 0.11 / 0.10 | 58.8% | +132 |
| `vault` | `assets/dark-field/vault.png` | Scene 7 custody | 0.07 / 0.07 | 84.2% | +84 |
| `ledger_glow` | `assets/dark-field/ledger_glow.png` | Scene 8, the transformation | 0.12 / 0.10 | 64.9% | +165 |
| `palladium` | `assets/dark-field/palladium.png` | Scene 10, the bar | 0.10 / 0.09 | 75.3% | +49 |
| `coffee_cup` | `assets/dark-field/coffee_cup.png` | Scene 14, the coffee objection | 0.19 / 0.94 | 86.3% | +86 |
| `patient` | `assets/dark-field/patient.png` | Scene 2, the patient — **regraded**, §2.1 | 0.08 / 0.06 | 91.4% | +123 |

All seven are portraits of the R7.3 contender family (1122 × 1402, 4:5) except
`ledger_glow`, a 1536 × 1024 landscape (3:2) — a third aspect family, so its box
must be 3:2 for the framing rule to hold. Three subjects now duplicate an
earlier study on purpose, and **the duplication is a presenter choice, not a
collision**: `single_cowrie` beside `shells`/`cowrie_shells` (one cowrie for
the P1 morph's center scale against the five-shell cluster and the contender
study), `ledger_glow` beside `ledger` (the transformation close-up against the
carrier lineup's book), and `gold_certificate` beside `paper` (the historical
gold claim against the plain note). All passing variants stay in the register,
and the presenter ruled on the Batch A register sheet which study serves which
scene — the assignments are §2.2 below. Nothing was deleted to record them.

### 2.1 `patient` — regraded and ingested, 25 August 2026

`patient` was held at the Batch A gate on one clause of five: top-left corner
patch **64.73** against a limit of 6, because the key light's shaft is in frame
at the upper left. Border, dark fraction and both warmth clauses passed with
room — the surgeon's failure class from R7.2, a light source reaching the frame
rather than a wrong grade. The presenter ordered the regrade attempted before
any regeneration, and it succeeded: **corner 0.08, border 0.06, 91.4% dark,
R−B +123, 100% of the highlight population warm** — five clauses of five, and
the whole shipping set re-gated at 22 images, 110 checks, 0 failures.

The pass is one operation, and its parameters are measured rather than chosen:
a **corner window** anchored at the top-left, stage black inside r = 0.12 of the
frame diagonal and smoothstepped back to untouched by r = 0.30. R7.4's crop was
unavailable here — the subject already fills 0.70 × 0.90 of the frame, so the
crop that removes the shaft removes the head — but the same power-window falloff
was. Local variance separates the smooth shaft from the structured subject
exactly: the nearest structured block sits at **r = 0.319** and the nearest pixel
the key modelled at **r = 0.331**, both outside the window. The consequence is
not an estimate — **zero pixels of L ≥ 90 changed**, and the brightest pixel
anywhere in the window's reach is L = 80, the shaft's own core.

**R7.4's third move, the global black-point crush, is deliberately not in this
pass.** Tried at [14, 34] — gentler than either parameter set R7.4 shipped — it
visibly collapsed the gown's shadow side, taking the right shoulder and the
lower tie to black. The patient is lit far lower-key than the surgeon or the
steak, and its subject *lives* in the tones a crush lifts. Recorded here because
the next regrade in this register will be tempted by it.

The harness is `review/frames-a/harness/regrade-patient.mjs`, re-runnable and
reversible: the as-generated render is preserved beside it at
`review/frames-a/dark-field/patient--as-generated.png`.

**One visual note for the presenter's eye, not a gate failure.** The regrade
removes the shaft; it does not remove the warm ambient the shaft left in the
mid-left of the frame, because that ambient lies between the shaft's tail and
the subject, where no window can reach it without touching the figure. Measured
as the 90th percentile of smooth-block brightness it sits at 9.2, against 6.8
for `coffee_cup`, the highest of the renders already shipping — the same order,
slightly above. It reads as key spill rather than as a beam. Regeneration from
the Batch A package §5 item 7 remains the alternative if the presenter's eye
disagrees with the gate's verdict.

### 2.2 The duplicate-subject scene assignments (ruled 25 August 2026)

Three subjects hold more than one passing study. The presenter ruled on the
Batch A register sheet which study serves which scene. **Every non-assigned
study stays in the library, banked** — a selection here is a change of
reference, never a deletion, exactly as the aesthetic law requires.

| subject | study | serves |
|---|---|---|
| cowrie | `single_cowrie` | P1 morph, centre scale — one object, rhyming with the sequence's other single forms, which is what it was generated for |
| cowrie | `shells` | Scene 5, the carrier lineup — individual shells stay legible at lineup scale |
| cowrie | `cowrie_shells` | **banked** — no current scene |
| ledger | `ledger_glow` | Scene 8, the transformation — the glowing close-up it was generated for |
| ledger | `ledger` | the carrier lineup and other display-scale ledger appearances |
| note | `gold_certificate` | Scene 7, the claim on gold |
| note | `paper` | P1 morph's paper form, and generic note appearances |

The `used at` columns above and in §2 record the same assignments per row.
`src/dark-field.js` carries them as a comment beside the framing table: the code
has no assignment slot to fill — a subject key resolves to one file, and which
scene calls that key is a property of the scenes — so the record lives where a
reader choosing between two cowries will actually be standing.

Two of the first shoot's renders need a note rather than a regeneration.

- **`shells` satisfies the brief's "cluster of cowrie shells" contender** outright — the restored render *is* a five-shell cowrie cluster on black. No new generation is required for §4.1's shells; if a distinct Section 2 frame is wanted later, the prompt is in §4 anyway.
- **`bitcoin` is on-grade and off-argument.** The render is a physical coin, and R7 retired it for exactly that reason (defect V-1: it asserts an object 4.15 spends its script denying, and the deck holds that bitcoin is held directly, with no counterparty and no physical form). R7.2's brief names it among the renders to restore, so it is restored and shipped — but this is a **flagged presenter decision, not an implementation one.** Reverting it is one line: `['bitcoin', 'BITCOIN', 'bitcoin', 'glyph']` in `06-claim-and-carrier.js`'s `CARRIERS` table drops that one position back to the struck ₿ and leaves the other four photographic.

#### V-1 is RULED (presenter, 29 August 2026) — the coin is accepted

The Prologue beat-state sheet put the question directly: P1's fifth form as the
library's `bitcoin` coin render (`p1-b8-a`, continuous with the four physical
forms before it, and carrying exactly this flag) or as structured light
(`p1-b8-b`, on-argument, composed from the unit grammar). **The presenter
selected the coin — C1 = A.**

The V-1 flag is therefore closed **as a presenter decision, not as an
implementation one**: the physical-coin render is presenter-accepted for **P1's
morph**, and the same ruling governs **Scene 10's trade-off strip** for
consistency — one film, one answer to the same question. *(Batch B's states
session inherits the ruling; no work is done on Scene 10 here.)* The revert path
above is unchanged and stays on file: the ruling is a selection, and a selection
is changed by changing one word.

---

## 3. Failed the gate — regeneration required

### 3.0 `fiat` — the comparison lineup's one gap (R7.4)

The historical `fiat.png` was restored from git history with `property` and
`shares` and is the only one of the three that fails, on four clauses of five:
corner 34.79, border 14.70, 47.8% dark, R−B **+4.6** — a neutral key on a lit
ground, which is a different photograph rather than a badly graded one. It
cannot be rescued by the grade pass that saved the surgeon and the steak,
because there is no warm key in it to preserve.

Every display-scale appearance of the five candidates is a render as of R7.4
(§B), so `fiat` is the one position in the lineup still showing its mark. The
component stubs it automatically; dropping the render in completes the row with
no code change.

> *"A single folded banknote of a major currency, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

*The note's own printing is legible enough to read as a specific currency, which
the deck should avoid — the score is about a class of money, not a country. A
folded or partially shadowed note solves that; so does a denomination-free
angle.*

---


Both were restored from git and both were rejected by the gate. The originals
are kept as evidence at `review/rebuild-r7-2/dark-field/rejected/`. Their
slides are built and choreographed; each currently shows its grammar glyph with
a `DARK-FIELD PENDING` marker and will show the render the moment it lands.

### 3.1 `surgeon` — 4.03, the sensory anchor

**Why it failed:** corner patches 33.17 (limit 6), border ring 21.67 (limit 6).
The frame is an operating theater — a wall, a table, a draped patient, and the
surgical lamp itself in shot at the top left. It is a *scene*, not a subject
emerging from darkness, and it is the one image in the restored set that
plainly did not come from the same shoot as the other seven. The presenter's
read that the old photography was tonally right holds for the light; it is the
room that fails.

**Frame:** portrait, 1086 × 1448. **File:** `incoming/surgeon.png`

> *"A surgeon in surgical cap, mask and gown, seen from behind and slightly above with the face not visible, hands raised and at work, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

*Constraint carried from `AGENTS.md` §13: the surgeon must not be visually identifiable as a real person. Framing from behind with the face unseen satisfies it and is also the better image — the beat is about an hour of delivered skill, not about a face.*

### 3.2 `meal` — 4.04 and 4.05, one of the three final goods

**Why it failed:** corner patches 20.86 (limit 6), border ring 8.98 (limit 6).
The steak sits on a plate on a lit stone surface that fills the frame corner to
corner. The subject is graded correctly; the surface under it is an environment.

**Frame:** landscape, 1448 × 1086. **File:** `incoming/meal.png`

> *"A thick-cut cooked steak resting alone, its crust catching the light, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

---

## 4. Section 2's contenders — DELIVERED at R7.3

The competition-record slide (2.4) introduces four goods that people's savings
actually lived in, then transforms each into its grammar glyph as the line of
the record draws through it. The renders carry the sensory introduction; the
glyphs carry the structural life.

**All four landed on 11 August 2026, passed the gate unmodified, and are
integrated.** The prompts below are kept as the record of what was asked for —
they are what a regeneration would start from, and the delivered set answered
them at 4:5 rather than the 4:3 the section originally specified, which is why
the rail's render box changed shape rather than the images.

### 4.1 `cattle`

> *"The head of a single ox with heavy horns, seen front-on, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

*Front-on deliberately: the grammar's cattle mark is the lyre head seen front-on, so the render and the glyph share a silhouette and the crossfade at 2.4 lands on the same axis.*

### 4.2 `salt`

> *"A rough block of unrefined rock salt, translucent at its edges, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

### 4.3 `iron`

> *"A rough hammered iron bloom, dark and unpolished, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

*Iron is the one contender whose grade is genuinely hard: a dark, matte, unpolished metal on a black ground has very little to separate it from the ground. If the generated render fails `darkFracMin` from the other direction — too little subject rather than too much ground — a slightly harder key and a wetter surface are the two adjustments that keep the subject line honest.*

### 4.4 `cowrie_shells`

Generated after all, and the row is better for it: the contender study is from
the same shoot as the other three, where `shells.png` is from the first. The
first-shoot study keeps the carrier lineup at 4.06. The prompt:

> *"A cluster of five cowrie shells, their apertures toothed and turned toward the light, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

---

## 5. The flagged candidate — the two-survivors arrival (brief §4.2)

2.5's final build may land a dark-field gold study as the "gold won everything"
arrival. It is implemented behind a single toggle
(`GOLD_ARRIVAL` in `src/slides/section-2-origin/05-two-survivors.js`, **off by
default**) and both variants are screenshotted for the presenter's ruling
(`review/rebuild-r7-2/screenshots/gold-arrival-on.png` and
`gold-arrival-off.png`). **It uses the restored `gold.png`, which passes the
gate**, so no generation is required to rule on it.

If the presenter wants the arrival to be a *native* gold study rather than the
carrier-lineup bar — a nugget or a poured ingot rather than a modern cast bar —
the render would be filed under a distinct key (`gold-native`) so the carrier
lineup keeps its own:

> *"A single rough gold nugget, its surface faceted and irregular, photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

---

## 6. Summary

| status | subjects |
|---|---|
| **shipping** (22) | `shoe` · `wine` · `shells` · `gold` · `paper` · `ledger` · `bitcoin` · `cattle` · `salt` · `cowrie_shells` · `iron` · `surgeon` · `meal` · `property` · `shares` · **`single_cowrie`** · **`gold_certificate`** · **`vault`** · **`ledger_glow`** · **`palladium`** · **`coffee_cup`** · **`patient`** |
| **regenerate** (1) | `fiat` — see §3.0 |
| **optional** (2) | `metals`, which would light the second featured moment at 2.4 (R7.3 §7 — implemented, dormant, and it does not stub to a glyph because the stop below it already shows that glyph); `gold-native`, only if the two-survivors arrival is ruled in and wants its own study |

**One image stands between the register and completeness: `fiat` (§3.0).** It is
the only position in the five-candidate lineup still showing its mark, and the
§5 clause that `gold_certificate` be *"visually distinct from the fiat note"*
stays unconfirmable until it lands. Both flags are unchanged by the Batch A
selections session and were deliberately not closed there.

Three images in this register were **graded rather than regenerated**, and all
three failed on their *ground* rather than their light. `surgeon` and `meal`
were cropped free of the lamp and the lit stone surface and their surround taken
to true black at R7.4 (`review/rebuild-r7-4/harness/regrade-r7-4.mjs`).
`patient` was taken by a corner window at the Batch A selections session
(`review/frames-a/harness/regrade-patient.mjs`, §2.1) — a crop was not available
to it. All three now pass all five clauses. `property` and `shares` were
restored from git history and passed unmodified.

If a `metals` study is ever generated, the prompt follows the master template
with the subject line *"A stack of three rough cast metal ingots of different
metals, edges catching the light"* — and nothing in the code changes: the
featured-moment slot at 2.4 asks `hasDarkField('metals')` and lights itself.
