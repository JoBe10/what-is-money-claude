> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R7.2 Phase Report — The Two-Register System & Section 4 Completion

**Branch:** `rebuild-r7-1-harmonization` (not merged) · **Base:** `main` at `b029e4d` · **Continues:** `docs/r7-1-report.md`
**Brief:** `docs/r7-2-session-brief.md` · **Governing:** `docs/sections-1-3-rebuild-brief.md` §9.4 (rule 9 added here), `docs/section-4-master-document-v2.md`, `docs/icon-grammar.md`
**Date:** 1 August 2026

> **Status: complete.** Phases A–E are done. The deck speaks two registers, the
> grade is enforced rather than trusted, Section 4's derivation run is finished
> under both registers, the two designated Section 1–3 moments are built, and
> the verification in §6 was actually run. Five images stand between the deck and
> a complete dark-field register; every slide that needs one is already built
> around it and says so. The argument, the scripts' content and all fifty scores
> are untouched; 4.23 is byte-identical.
>
> This report supersedes `docs/r7-1-report.md` in one respect only — that
> phase's reading of §9.4.3 as an absolute ban on photography. Everything else
> R7.1 delivered still stands, including every glyph it drew.

---

## 0. What was actually decided, and why R7.1 was half right

R7.1 deleted every photograph in Section 4 and recorded the reasoning in the
icon grammar: the photographic register was "a licence for the one register the
deck could not make cohere." The observation was correct. The remedy was not.

The presenter's side-by-side review found the old imagery **tonally right** —
black ground, single warm light — and its chrome wrong. That is a precise
diagnosis, and it points somewhere different: the photography was incoherent
because *nothing governed it*, not because photography cannot be governed. Six
images from six different generations, at six different framings, dropped onto
slides carrying an orange rule and a caption band, will never cohere. Six images
generated from one prompt, gated on their ground and their key, normalized to
one framing rule, and placed on frames built to §9.4's density, are a register.

So R7.1's abolition is repealed and replaced with a boundary. Section 4 lost
something real when the photographs went: line work can make a viewer
*understand* a good, and it cannot make them *want* one. The whole force of
"he has not received them" is appetite. That is why the register is admitted at
exactly four surfaces in the finished deck and nowhere else — the surgeon's
hour (4.03), the three final goods (4.04 and 4.05), the carriers people's
savings actually lived in (4.06), and Section 2's four contenders before the
record's line turns them into entries (2.4). Everything else in forty-six
slides is drawn.

**Option A, in one sentence:** the line grammar is the deck's default and the
only register a diagram may speak; the dark-field register is admitted where
sensory concreteness *is* the argument, under a fixed grade that a machine
checks.

---

## 1. Phase A — the standard amended

### 1.1 §9.4.9 codified

Added verbatim to `docs/sections-1-3-rebuild-brief.md` §9.4 as rule 9, after
rule 8, with a closing line recording that rule 3's "no photography" is **scoped
by it rather than repealed** — the line grammar remains the default and the only
register a diagram may speak.

### 1.2 The v2 document records the ruling

`docs/section-4-master-document-v2.md` §3.7 carries the amendment in the
document's own established form (the same shape as item 2's R7 disposition
note): what the two registers are, and the three consequences for Section 4's
visual system — the disc-in-shell retained, photography restored **under grade**
rather than restored as it was, and a recorded register assignment per slide
behind a machine gate. §1 gains a "What R7.2 changed" block, and R7.1's "Section
4 holds no photography" bullet is marked superseded in place rather than
rewritten, so the record of the decision survives.

`docs/icon-grammar.md` carries the same amendment from the grammar's side. The
grammar lost no scope — it gained a stated boundary, which is what R7's
"draw what you argue about, photograph what you argue *for*" was reaching for
and could not enforce.

---

## 2. Phase B — the dark-field pipeline

### 2.1 Inventory

Nine renders recovered from git at `85bad44^` — the last commit that held them:
the surgeon, the three final goods, and the five carrier candidates. Restored
into `assets/dark-field/`, **keyed by subject**, and the key is the same string
the icon grammar uses for that subject's mark. That is the two-register system
made literal: `shells` names one thing that exists as a render for its sensory
introduction and as a cowrie mark for its structural life, and the 2.4
transformation is a crossfade between two lookups of one name.

### 2.2 The grade gate, and where its limits come from

`review/rebuild-r7-2/harness/grade-r7-2.cjs` measures three of §9.4.9's five
clauses directly — the ground, the key, and the falloff into darkness — and a
fourth, "one consistent look," through the framing rule in §2.3. The fifth,
"no text baked in," and the visual read of single-key consistency stay on the
contact sheet, where a human belongs.

The two limits that matter most are the ground limits, and **they are derived
from the stage, not from the sample**: the deck's background is pure black and
these images are composited onto it, so the question is whether an image's own
frame edge is visible against the slide. On sRGB a large flat area separates
from black at roughly 5–6/255. That is where the limits sit.

| clause (§9.4.9) | measured as | limit |
|---|---|---|
| pure black ground, no environment | mean luminance of four corner patches (6% of the short side) | ≤ 6 |
| — and none reaching the frame | mean luminance of the outer 2% border ring | ≤ 6 |
| emerging from darkness | share of frame below luminance 16 | ≥ 50% |
| a single warm key (≈2700–3200K) | R − B across highlight pixels | ≥ +18 |
| — one key, not two | share of highlight pixels individually warm | ≥ 90% |

**Seven pass, two fail.** The failures are not marginal and they are not
arbitrary:

| image | corner | border | verdict |
|---|---|---|---|
| shoe · wine · shells · gold · paper · ledger · bitcoin | 0.08 – 2.28 | 0.07 – 1.12 | pass, by 2.6× or better |
| **meal** (the steak) | **20.86** | **8.98** | fails — it sits on a lit stone surface that fills the frame |
| **surgeon** | **33.17** | **21.67** | fails — an operating theater: a wall, a table, a draped patient, and the lamp itself in shot |

The limits were not placed between those two groups; they landed there. And the
surgeon is the one image in the restored set that plainly did not come from the
same shoot as the other seven — the presenter's read that the old photography
was tonally right holds for the *light*; it is the *room* that fails.

Both rejects are kept as evidence at
`review/rebuild-r7-2/dark-field/rejected/`, and neither reaches a slide:
§9.4.9's outliers-are-regenerated rule is enforced by the pipeline rather than
by discipline.

### 2.3 The framing rule — a defect the eye found and the gate now measures

The first integrated row looked wrong on screen, and measuring said why: subject
extent across the set ran from 0.36 of frame width (gold) to 0.72 (shoe, ledger).
A **two-to-one spread in apparent size** — the old O-07 optical-weight problem
arriving by a different door, and exactly what "one consistent look, as if from
a single shoot" fails to mean if only the light is checked.

One rule fixes it, and it is the icon grid's own rule: every subject's longer
relative axis is scaled to **88% of its box's matching axis**, exactly as the
48-unit glyph grid normalizes every mark into a 40-unit live area. The numbers
are *measured, not eyeballed* — the gate prints the `FRAMING` block that
`src/dark-field.js` carries, and a regenerated render produces its own row by
re-running it. That is what makes this a rule rather than the five hand-tuned
per-asset corrections R7 recorded as never converging.

### 2.4 The manifest, the drop zone, and the stubs

`docs/dark-field-manifest.md` carries the master template, a generation prompt
per required image (subject line adapted, every other clause verbatim), the
measured status of all seven passers, and the pipeline.

- Presenter drops into `assets/dark-field/incoming/` → `ingest-r7-2.cjs` grade-gates and moves only the passes across → `src/dark-field.js` is an `import.meta.glob`, so the slide that was stubbing starts rendering, **with no code change**.
- A subject with no render shows its grammar mark, marked `data-pending="true"`, with a `DARK-FIELD PENDING` comment at the call site. Never blocking, never off-grade.
- A static gate asserts every pending subject is documented in the manifest, so no stub can become an orphan.

**Five images stand between this deck and a complete register:** `surgeon` and
`meal` (regenerate), `cattle`, `salt` and `iron` (new). Two of the brief's new
subjects need nothing: the restored `shells` render *is* a cowrie cluster and
passes, and the restored `gold` render serves the flagged 2.5 arrival.

### 2.5 The register's one render path

`src/dark-field.js` (the subject-keyed manifest, the framing table) and
`src/components/DarkField.js` (the one component) are the deck's entire raster
surface. The gates assert it: exactly one file in `src/` references a raster,
exactly one constructs an image element, and no dark-field surface carries a
border, a radius or a shadow — the images are graded to black, so the frame edge
is invisible because the *image* is black there, not because CSS hid it.

---

## 3. Phase C — Section 4 under the two registers

### 3.1 C1 — 4.03 becomes the dark-field anchor; the node-scene moves to 4.04

The surgeon's hour is photographed again, and the abstraction moves one slide
later. That is the change that makes the register switch a *designed moment*
rather than an inconsistency: **4.03 shows you the hour; 4.04 abstracts it.**
R7.1's node-scene at 4.03 was correct and cold — two dots and an edge state that
an exchange occurred, which is precisely what the next slide needs to say and
not what this one does.

4.03 is restaged to §9.4 density, which the old photographic slide never was:
the image holds one half of the frame and the argument stacks in the other, one
element per build. The six capabilities land as the single accumulating element
§9.4.1 names (the frozen script gives the whole sentence one `[→]`), and the
`$400` takes the slot they vacate — its own landing, per C1, rather than a
fourth line stacked under them. Four builds, four `[→]`, script untouched.

**One defect found by looking at the captures**, not by a gate. The headline's
`SPECIALIZED` collapses to zero width before it ignites, and the space that
followed it belonged to the *tail* — so build 0 rendered `1 HOUR OF  SURGERY`
with two spaces, the hidden span between the two text nodes preventing the
browser from collapsing them. Shipped that way since R7.1. The space now belongs
to the word it follows, which is where it belonged. No copy changed; the frame
reads `1 HOUR OF SURGERY` at b0 and `1 HOUR OF SPECIALIZED SURGERY` at b1, and
the state signature is unaffected because it trims each leaf's text. Worth
recording because it is the class of thing no gate in this suite would ever
have caught: every check passed on that frame, and the frame was wrong.

The **`operation` mark keeps one surface**: 4.04 build 0, where the service
rests already delivered at the patient's end. That is also what lets 4.04
establish its own scene instead of inheriting a diagram the previous slide no
longer draws. The brief's conditional — run the studio round if a slide retains
the node-scene — is satisfied by R7.1's second round, which already took the
settling-pulse direction and recorded its selection; nothing about the mark or
its scale changed, and a round with no new question to answer is ceremony. This
is recorded, not skipped.

### 3.2 C2 — 4.04 and 4.05 finished, and two R7.1 states replaced

Both are **line-led mechanism slides with dark-field goods**. The mechanism is
abstract because it argues a structure; the goods are photographic at display
scale because they argue an appetite. No render enters a diagram on either
slide.

Two states are replaced rather than adjusted:

1. **The goods were a column of glyphs pinned at 4.04's right edge**, reading as ornament — three small marks in the margin of a diagram. They now have their own band across the frame's lower third, and **the empty space between the exchange and that row is the argument**: there is no line reaching the goods, because the exchange is not finished. The node band moved up to y 380 to make the room.
2. **At 4.04 b2 the claim disc landed on top of the definition.** The deck's central sentence rendered as `AN EA●ED, TRANSFERABLE CLAIM ON VALUE`. The definition now has a lane of its own — below the scene while the scene exists, rising into the middle the scene vacates on the one build that is about things leaving. A named geometric assertion in the suite prevents its return.

At 4.05 the goods sit at the spend road's end, just under the point the claim
arrives at and dissolves, so redemption reads as the claim *becoming* them. The
fork's choreography, V-3's dormant tine and R7's routes are unchanged.

### 3.3 C3 — the carrier gains a wall

Three constructions were drawn and judged at the three scales the shell ships at
(the 4.06/4.07 scene, 4.05's save road, the 4.10–4.12 stress stage), each with
the claim disc inside it — the legibility rule says a mark is judged at the
surface, and the question here is not "is this a nice ring" but "does this read
as a body around *that*". Contact sheet:
`review/rebuild-r7-2/carrier-studio/contact-sheet.png`.

| candidate | verdict |
|---|---|
| **A — the doubled arc** | R7.1's pair at a heavier stroke with a hairline echo inside. Weight by thickening. Reads as a bolder annotation — more ink, not more object — and the echo aliases into the outer stroke at the stress-stage scale. |
| **B — the stave ring** | Six short segments, three a side. Weight by repetition. Reads as a dial or a loading spinner: the repeated gaps quantize the ring, and it fights the disc, whose whole identity is that it is continuous. |
| **C — the banded wall (SELECTED)** | Each side becomes a band with an inner and an outer wall closed at both ends. The shell has real thickness — a vessel wall seen edge-on, with an inside and an outside. The only candidate that answers "material presence" literally instead of decoratively, and it collapses gracefully into a single heavier arc at riser scale. |

The stroke stays the grammar's 2.5 in all three: hierarchy comes from
silhouette, never from weight, so C gets its weight from *construction*, which
is the grammar's own answer to this problem. The glow is tuned deliberately
below the disc's — the thing being tested must not out-shine the thing being
carried. **One correction from the contact sheet:** C's first cut put dot
terminals at the mid-radius of each end cap, where they sat exactly on the cap
stroke and were invisible at every shipping scale. Removed — the band is one
closed outline and has no stroke ends to punctuate, like the cowrie and the
gable. Invisible ink is worse than absent ink.

### 3.4 C3 — the carrier lineup, and a flagged conflict

The 4.06 lineup takes the dark-field register at display scale (150 × 112 per
position); the glyph twins are untouched in every diagram context — the
comparison table's headers, the Evolution Rail's stops, 4.21's decision row. The
row runs at 0.94 rather than the glyph row's 0.76: 0.76 on a drawn mark reads as
quiet, and on a photograph it reads as underexposed.

**Flagged, and it is a real conflict.** The `bitcoin` render is a photograph of a
physical coin. R7 retired exactly that render as defect **V-1** — it asserts an
object 4.15 spends its script denying, and the deck holds that bitcoin is held
directly, with no counterparty and no physical form. R7.2's brief names it among
the renders to restore. It is restored because the presenter ruled it, and the
lineup is data-driven so reverting that one position is one word:
`['bitcoin', 'BITCOIN', 'bitcoin', 'glyph']` in `06-claim-and-carrier.js` drops
it back to the struck ₿ and leaves the other four photographic. **This is a
freeze-adjacent decision, not an implementation one.**

### 3.5 C2 / C3 / C4 — the structural frames, unchanged

4.20's stability restage, 4.18's monetary premium, 4.21 and 4.22 are as R7.1
left them and stay **pure line grammar**. The register audit confirms it
independently: every one of them reports `line` with zero renders across every
build.

**The 4.18 call, recorded.** The brief allows the three asset examples to take
small dark-field renders or glyphs, decided by scale. They render through
`ComparisonAssetHeader` in a 180 × 150 box, which is above the carrier lineup's
150 × 112 — so by scale alone they would qualify. **They stay glyphs**, for
three reasons, any one of which is sufficient:

1. They are the *comparison table's own component*. The same asset must not be a photograph at 4.18 and a mark in the table two slides later, with no designed handoff between them.
2. The premium is drawn as a warm halo *on the mark* — a line-grammar device that reads on a monochrome stroke and would read as bloom on a photograph.
3. Two of the three are **REAL ESTATE** and **SHARES**. There is no honest dark-field subject for a share. Extending the register to abstractions is exactly the drift §9.4.9 exists to stop.

### 3.6 The sweep

`compose-r7-2.cjs` re-walks every build of every Section 4 slide and the close,
plus the two Section 2 slides this phase touches, measuring the union bounding
box of what is actually visible. It inherits R7.1's ink correction for text and
adds the mirror-image correction for photographs: a dark-field render carries a
measured scale transform inside a clipping box, so its `<img>` rect is *larger*
than what the viewer sees. **`.df` is the ink element for the register**, and
everything inside one is skipped — measuring the image would report an edge
violation that does not exist on screen.

The rail slides get a narrower gate with its reason attached: the rail runs off
both frame edges on purpose (the record continues past the viewport, and the
extension into dark is the point at 2.8), so the union box is meaningless there.
It is recorded, and what R7.2 added to those slides — the contender renders — is
gated exactly: every render clears 100px of frame edge on every build.

**Final: 150 checks, 0 failures.**

---

## 4. Phase D — the two Section 1–3 moments

### 4.1 The contenders' introduction, and the transformation

2.4's four contenders arrive on the **dark-field register** for builds 0–5:
cattle, salt, shells and iron as goods a family's savings lived in. "You cannot
divide a cow and keep it a cow" bites differently when the viewer has seen the
animal.

At build 6 the record's line draws through the row, and **each render collapses
into the mark that will carry it for the rest of the deck.** The render sits on
the mark's own baseline and scales about it, so the switch is one object
becoming another rather than two things swapping places. The register switch is
the beat's own meaning: this is the moment history stops holding a good and
starts keeping an entry about it, and every later appearance of cattle, salt,
shells or iron — on the rail, in the wound rows, at 2.8's pull-back — is that
entry.

It needed no new build and no new `[→]`. `renders` defaults to whatever
`contenders` says, so the crossfade and the line's arrival are one gesture
rather than two sequenced ones, and every other caller of the rail is unaffected
by construction.

**This is also where "dark-field never enters a diagram" gets its sharpest
form.** What makes the rail a diagram is *the line*. Before it, the four
contenders are a row of goods; after it, they are entries on a record. The audit
asserts exactly that: a render may never be standing on a drawn line. It holds
on every build of every slide the rail appears on.

Three of the four are `DARK-FIELD PENDING` — `shells` is the one restored render
that fits, and it demonstrates the transformation in full while cattle, salt and
iron scale their own marks down. The mechanism is real either way; the images
drop in.

### 4.2 The gold arrival — flagged candidate, off by default

2.5's final build can land the dark-field gold study as the "gold won
everything" arrival, behind a single exported constant (`GOLD_ARRIVAL` in
`05-two-survivors.js`). **Default off**, and the reason is on the record: the
frame's own claim is *"Workable nobility leaves two,"* and which of the two took
the throne is left to the spoken line — a gold study on stage resolves visually
what the frame deliberately holds open, and it is the beat's last sentence, not
its argument. It uses the restored `gold.png`, which passes the gate, so no
generation is needed to rule on it. Both variants are screenshotted
(`gold-arrival-on.png`, `gold-arrival-off.png`); the ruling is the presenter's
and flipping the constant is the whole change.

### 4.3 Nothing else in Sections 1–3 changed

Proved by gate, not by assertion: `git diff` against the R7.1 report commit
across all three sections returns exactly the two files above. The exchange
triangle, the rail's other beats, the murmuration, the tower, the ladder and the
waypoints remain pure line grammar by rule.

---

## 5. The register and decision log

Register assignment for all 46 slides, measured from the live DOM rather than
declared (`review/rebuild-r7-2/register-r7-2.json`). The convention: **a slide
that declares no register speaks the line grammar** — silence means line,
because the line grammar is the default and the only register a diagram may
speak.

| slide | register | renders | pending | what changed at R7.2 |
|---|---|---|---|---|
| **1.01 – 1.05** | line | 0 | 0 | Untouched. |
| **2.01 – 2.03** | line | 0 | 0 | Untouched. |
| **2.04** competition record | **mixed** | 1 | 3 | The contenders' sensory introduction and the transformation into their marks. `shells` renders; `cattle`, `salt`, `iron` pending. |
| **2.05** two survivors | line | 0 | 0 | The gold arrival implemented behind `GOLD_ARRIVAL`, **off**; register follows the toggle. |
| **2.06 – 2.08** | line | 0 | 0 | Untouched. |
| **3.00 – 3.08** | line | 0 | 0 | Untouched. |
| **4.01** define the job | line | 0 | 0 | Unchanged from R7.1. |
| **4.03** simple exchange | **dark-field** | 0 | 1 | Rebuilt as the sensory anchor; node-scene retired to 4.04; restaged to §9.4 density. `surgeon` pending. |
| **4.04** unfinished exchange | **mixed** | 2 | 1 | Node-scene establishes here; goods become a dark-field band; the definition gets its own lane (the occlusion fixed). `meal` pending. |
| **4.05** spend or save | **mixed** | 2 | 1 | Goods become dark-field at the spend road's end; shell inset widened for the banded wall. `meal` pending. |
| **4.06** claim and carrier | **mixed** | 5 | 0 | The carrier lineup takes the register at display scale; the claim/shell scene stays line grammar; shell gains its wall. |
| **4.07 – 4.09** | line | 0 | 0 | Re-skinned by the new shell only; composition unchanged. |
| **4.10** invert the question | line | 0 | 0 | Re-skinned by the new shell through `CarrierStressStage`; composition unchanged. |
| **4.11 – 4.17** | line | 0 | 0 | Unchanged from R7.1. |
| **4.18** monetary premium | line | 0 | 0 | Unchanged. The tile-scale call recorded in §3.5: glyphs. |
| **4.19 – 4.20b** | line | 0 | 0 | Unchanged from R7.1. |
| **4.21** the marginal decision | line | 0 | 0 | Unchanged. Glyph twins of the five candidates, as R7 left them. |
| **4.22** fixed supply | line | 0 | 0 | Unchanged from R7.1. |
| **4.23** the case | line | 0 | 0 | **Untouched.** Byte-identical to `main`. |
| **5.01** the close | line | 0 | 0 | Unchanged from R7.1. |

---

## 6. Verification

Everything below was run against the final tree on this branch — every suite
re-run after the last change to source or harness, so no number here was quoted
from an earlier state. The freeze baseline is `main` at **`b029e4d`**; this
phase's own starting line is the R7.1 report commit **`ca7ca49`**. The totals
are tallied from the machine-readable results, not counted by hand.

| harness | what it proves | result |
|---|---|---|
| `grade-r7-2.cjs` | the dark-field grade, per image, per clause | **7 images, 35 checks, 0 failures** |
| `gates-r7-2.cjs` | the freeze, the scope, register containment, chrome, language, pacing | **30 checks, 0 failures** |
| `register-r7-2.cjs` | the register audit, every build of all 46 slides | **271 checks, 0 failures** |
| `compose-r7-2.cjs` | §9.4.4 measured, with the dark-field ink correction | **150 checks, 0 failures** |
| `verify-r7.cjs --part=traversal --emit-live` | forward/back/fast-forward walks; captures 129 live signatures | **5 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=direct --use-live` | direct entry, reconstruction, named assertions, mid-animation refresh | **281 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=traversal,direct --reduced` | the same matrix under `prefers-reduced-motion` | **286 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=settle` | the reduced-motion settle gate | **40 checks, 0 failures** |
| `flash-r7.cjs` (+ `--rm`) | frame capture at 19 boundaries, 15 frames each | **19 / 0 in both variants** |
| `rhyme-r7-1.cjs` | R7.1's check, re-run: the claim and 1.2's token are still one render | **4 checks, 0 failures** |

**1,140 assertions, none failing.** `npm run build` clean, and the production
bundle was served and walked to confirm the register survives it: all seven
renders load under their hashed names, zero console errors.

Four named assertions are new, and each one pins something this phase could
otherwise have lost quietly: 4.03 declares the dark-field register and holds no
node-scene; 4.04 b2's claim disc does not overlap the definition (asserted
geometrically, so the occlusion cannot return through a layout change nobody
screenshots); 2.4 b5 stands on four renders with no line drawn; 2.4 b6 has the
line drawn with every render become its mark. Three flash boundaries are new
too — the 4.03 → 4.04 register crossing, and 2.4's switch in both directions.

### 6.1 The freeze

`_comparison-data.js` is **untouched entirely** against `b029e4d` — the whole
file is byte-identical, ten properties × five candidates = fifty scores.
`23-investment-case-from-first-principles.js` is byte-identical too. The scope
gate proves the converse for Sections 1–3: measured against `ca7ca49`, exactly
two slide files changed, and they are the two the brief designates.

**Every script is byte-identical.** The `notes:` block of all six slides this
phase rewrote — 4.03, 4.04, 4.05, 4.06, 2.04, 2.05 — hashes identically to
`ca7ca49`. No word changed, and no `[→]` moved: the register switch at 2.4
rides an advance the script already had, and 4.03's restaging kept its four.

### 6.2 Pacing

Regenerated across Section 4, the close and all of Sections 1–2 (the sections
this phase touched): **37 slides, 144 builds, 144 `[→]`, zero mismatches**.
**No build count changed in this phase** — the register switch at 2.4 rides an
existing advance, and 4.03's restaging kept its four.

### 6.3 What the register gate proves

- Exactly one file in `src/` references a raster (`src/dark-field.js`), and exactly one constructs an image element (`src/components/DarkField.js`).
- No dark-field render appears inside any of ten enumerated structural-diagram containers, on any build of any slide.
- No render stands on the rail while the line is drawn — the rail's own exact form of the rule.
- Every slide showing a render declares a non-line register; every slide that declares one is on the log's list.
- No border, radius or shadow on any dark-field surface.
- Every pending subject is documented in `docs/dark-field-manifest.md`.
- `assets/images/` still holds only the favicon.

### 6.4 Four corrections, all mine

Recorded because a verification pass that quietly widens its own tolerances is
worse than no verification pass.

1. **A gate repealed on purpose, not by neglect.** R7.1's `gates-r7-1.cjs` asserts "no `<img>` or raster asset reference anywhere in `src/`". That encodes the rule the presenter overturned, so **it now fails if you run it.** It is kept unmodified as R7.1's evidence, with a header recording the repeal and pointing at its replacement; `gates-r7-2.cjs` restates the rule in the narrower and stronger form — raster references may exist, but every one flows through one module and none reaches a diagram. A gate that says "none" is easy to pass and stops describing the system the moment the system has one; a gate that says "all of them, through here" keeps describing it. Deleting the old file instead would have erased the record of what R7.1 actually checked.
2. **A signature that was reading how a frame arrived.** The suite's state signature excludes `data-live` and `data-snap` because they describe arrival, not state. `data-step-live` is a third member of that family — Section 2's grid and triad set it to the step number on a live advance and to `''` on a reconstruction, to gate one-shot choreography — and it was missing from the exclusion only because no slide carrying it had ever been in `CHANGED`. Widening `CHANGED` to the two Section 2 slides surfaced it as five reconstruction "failures" whose entire content was that attribute. Added to the exclusion, with the reason.
3. **A clock that was too fast for Section 2.** With that fixed, one failure survived: 2.05 b2 reported four noble-gas cells visible live and gone cold. They were still in flight — the gas drift is `opacity 1700ms` on a per-cell random delay of up to 800ms, 2500ms worst case, and the walk was sampling changed builds at 1800ms. Section 4 has nothing that slow, which is why the value had never been wrong before. Raised to 2700ms, which also clears the rail's 1700ms camera tween.
4. **A signature whose two halves disagreed.** Under reduced motion, where builds are sampled at 420ms, 2.05 b0 reported a mismatch consisting entirely of 2.04's departing text layer. The scene-group handoff marks an outgoing overlay `data-exiting` — which puts it at opacity 0 *immediately*, reduced motion or not — and removes it 650ms later. The visible-text half of the signature already ignored it (an opacity-0 parent fails the visibility walk); the attribute half did not. Aligning them drops nothing that is on screen.

None of (2), (3) or (4) was a deck defect, and all three would have *hidden* a
real Section 2 regression had one existed. They are the good version of
R7.1 §6.5's two stale checks: found by widening the suite's scope rather than by
luck. Every number in the table above was produced by the harness in its final
state — the standard traversal and direct passes were re-run after the last
correction rather than quoted from before it.

### 6.5 Evidence

- `review/rebuild-r7-2/dark-field/contact-sheet.png` — every render at the size it ships at, through the shipping component, with pending stubs marked. The two clauses the gate cannot measure are judged here.
- `review/rebuild-r7-2/dark-field/rejected/` — the two off-grade originals, kept.
- `review/rebuild-r7-2/carrier-studio/contact-sheet.png` — three shell constructions at three scales, each around the claim.
- `review/rebuild-r7-2/screenshots/` — 69 PNGs: every build of the six changed slides (2.04, 2.05, 4.03–4.06) and of 4.07–4.12 (the four that inherit the new shell, plus the two failure grids beside them for continuity). `screenshots/before/` holds 4.03–4.06 exactly as R7.1 shipped them, for the side-by-side. `gold-arrival-on.png` / `gold-arrival-off.png` are the flagged candidate's two variants.
- `review/rebuild-r7/flash-frames/` and `flash-frames-rm/` — the boundary windows, including the three new ones (4.03 → 4.04 and 2.4's switch in both directions). This is a shared directory the flash harness overwrites each time it runs, as R7.1's pass did before this one; the frames there are the current tree's.
- `review/rebuild-r7-1/screenshots/rhyme-*.png` are **left as R7.1 captured them**. The rhyme gate was re-run against this tree and passed (4 checks, 0 failures) — the claim and 1.2's token are still literally one render — but its sheet crops 4.04, whose frame this phase changed, and overwriting R7.1's evidence with a different frame would misrepresent that phase.
- `grade-r7-2.json`, `gates-r7-2.json`, `register-r7-2.json`, `compose-r7-2.json`, `pacing-r7-2.json` — machine-readable results.

`playwright` was already a declared devDependency at `a303a0d`, locked at
1.62.1 — the version this evidence was produced with. Confirmed present in
`package.json` and `package-lock.json` before verification ran.

---

## 7. Flagged for presenter review

1. **The bitcoin carrier render reintroduces V-1** (§3.4). It is on grade and off argument: a photograph of a physical coin, nine slides before 4.15 explains that bitcoin is held directly with no counterparty and no physical form. Restored because the brief named it; revertible in one word. **This is the flag most worth ruling on.**
2. **Five images are pending**, and the two that matter most are the flagship beats: `surgeon` (4.03) and `meal` (4.04, 4.05). Both slides are finished and choreographed around them; both currently show a grammar mark with a `DARK-FIELD PENDING` marker. Prompts are in `docs/dark-field-manifest.md` §3.
3. **The gold arrival is off by default** (§4.2). Both variants are screenshotted; the reasoning for the default is recorded and is a judgment, not a constraint.
4. **4.18's three asset examples stay glyphs** (§3.5) even though their tile scale would admit renders. The decisive reason is that "shares" has no honest photograph.
5. **4.03 is balanced, not centered.** §9.4.4 asks for centered or mirror-symmetric compositions; 4.03 puts a portrait image on the left and the argument on the right, balanced about the stage rather than mirrored. A portrait subject has no mirror, and forcing one would mean cropping the image or shrinking it out of its job. The frame passes the measured edge and centering checks; the departure is from the *habit*, not from the rule's purpose, and it is the one composition in the deck that works this way.
6. **The new shell re-skins six slides, not two.** `CarrierShell` appears at 4.05, 4.06, 4.07, 4.08, 4.09 and — through `CarrierStressStage` — 4.10, so giving it a wall changes all six. Composition is unchanged on every one and the state API is untouched, but 4.07 through 4.10 are slides the brief did not name; the presenter should look at them knowing why they moved. Screenshots of all six are in the evidence.
7. **The register costs ~7.4 MB of bundle** across seven PNGs, and will cost more as the five pending images land. The deck is a local-first recorded presentation, so this is a load-time cost on first paint of a few slides, not a bandwidth cost — but it is a real number and the presenter should see it rather than discover it.
8. **Carried forward from R7.1, unchanged:** 4.23 keeps the retired header treatment by design; the six capabilities remain one build; 4.20 is eight builds.

---

## 8. What changed, in one place

**Added:** the two-register standard (§9.4.9); `src/dark-field.js` and
`src/components/DarkField.js` (the register's one render path); seven graded
renders under `assets/dark-field/`; `docs/dark-field-manifest.md`; seven
harnesses under `review/rebuild-r7-2/harness/` — the grade gate, the ingest
pipeline, the static gates, the register audit, the composition sweep, and the
two contact sheets.

**Changed:** 4.03 (rebuilt on the dark-field register), 4.04 and 4.05
(recomposed, goods to dark-field, the occlusion fixed), 4.06 (lineup to
dark-field), `CarrierShell` (the banded wall — which re-skins 4.05–4.10),
`EvolutionRail` (the contenders' render layer), 2.04 (the register switch),
2.05 (the flagged arrival). Three harnesses were amended in place with their
reasons: the R7 verify suite (signature exclusions, sample timing, the new
named assertions, and the two Section 2 slides added to its scope), the flash
harness (three new boundaries), and R7.1's static gates (a header recording the
repeal).

**Removed:** `src/components/ComparisonTable.js` — dead since before the R7
rebuild, no importer, reading an `asset.image` field that no longer exists in
the frozen data. The register containment gate found it.

**Untouched:** the argument, every script's content, all fifty scores, 4.23,
every glyph R7.1's studio drew, all of Sections 1 and 3, and every slide from
4.11 to 5.01.

---

## 9. Commits

- `4411e73` R7.2 Phases A–D: the two-register system, the dark-field pipeline, Section 4 and the two Section 1–3 moments
- `9ac440c` R7.2 Phase E: verification, the evidence, and this report

Base: `main` at `b029e4d`. **Not merged.** The presenter's review follows: the
finished old-versus-new comparison this decision was waiting for.
