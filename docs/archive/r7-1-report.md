> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R7.1 Phase Report — Section 4: Visual Harmonization

**Branch:** `rebuild-r7-1-harmonization` (not merged) · **Base:** `main` at `b029e4d`
**Brief:** `docs/r7-1-session-brief.md` · **Governing:** `docs/sections-1-3-rebuild-brief.md` §9.4, `docs/section-4-master-document-v2.md`, `docs/icon-grammar.md`
**Date:** 1 August 2026

> **Status: complete, and superseded in one respect.** The merge precondition
> and Phases A–E are done. Section 4 holds no boxed panel and no header
> convention; the claim is literally the Section 1 token; the argument, the
> scripts' content and all fifty scores are untouched, and 4.23 is
> pixel-identical to `main`. Verification is §6; the per-slide decision log
> is §5.
>
> **Superseded:** this phase's reading of §9.4.3 as an absolute ban on
> photography — "Section 4 holds no photograph" throughout the document below —
> was overturned by the presenter's Option A ruling on 1 August 2026.
> **`docs/r7-2-report.md` is the current state of Section 4's visual system**,
> and it explains what R7.1 got right about the problem and wrong about the
> remedy. Everything else here still stands, including every glyph this phase
> drew: the four Icon Studio families all still ship. The section now speaks two
> registers, and this document describes only one of them.

---

## 0. The merge precondition

Executed per the brief. `rebuild-r7-section-4` merged into `main` with
`--no-ff` as **`Merge R7: Section 4 execution rebuild`** — **`b029e4d`**.
`npm run build` verified clean on `main` at that commit before branching.
`rebuild-r7-1-harmonization` cut from `b029e4d`; the R7.1 brief committed onto
it as `31afc50`.

---

## 1. Phase A — The compositional standard, and the header convention

### 1.1 §9.4 codified

Added verbatim to `docs/sections-1-3-rebuild-brief.md` as §9.4, after §9.3 and
before §10, with a closing line recording that it was codified at R7.1 from the
delivered Sections 1–3.

### 1.2 The header convention is retired

The Section 4 header was the deck's only persistent per-slide chrome: an accent
26px caption behind a 56px orange rule, at identical 120/78 coordinates on
twenty-two of twenty-three slides. Two findings from studying the delivered
sections settled how completely it had to go:

- **Sections 1–3 never used it.** `KickerLabel` had no callers outside Section 4. It was not a deck convention that Section 4 followed; it was a Section 4 habit.
- **It made the accent chrome**, which §9.4.6 forbids outright — orange marks argument, never decoration. A band of orange at the top of every frame is the definition of decoration.

**Nineteen headers deleted.** **Two survive** as frames that must be named —
`THE COMPARISON` (4.16) and `WHAT WOULD CHANGE THESE SCORES` (4.20b) — restyled
to the Sections 1–3 register through a new `QuietKicker` component: 20px, 0.3em
tracking, `--text-muted`, no rule line, centered. The type scale is taken from
`.s2o-survivors__kicker` and `.s3f-separate__kicker` rather than invented.

**One survives untouched.** 4.23's frame is frozen by the R7 argument freeze,
and C4 says to touch nothing on it, so it keeps the retired treatment *by
design*. Its shared CSS rule was split so its declarations remain byte-identical
while the six dead selectors go. This is a real conflict between A2 ("every
other header is deleted") and C4 ("touch nothing on 4.23"), resolved in favour
of the freeze, and **flagged**: if the presenter wants 4.23 harmonized too, that
is a freeze decision, not an implementation one.

No attribution-class kicker exists in Section 4 — that class lives in Sections
1–3 (Boyapati at 3.3) — so the brief's third expected survivor has no instance.

---

## 2. Phase B — The claim is the disc; the carrier is a grammar shell

### 2.1 One render path, literally

`src/components/LuminousDisc.js` is now the deck's single render of stored
value. 1.2's conversion token, 1.3's small token and every Section 4 claim are
the same component with the same gradient and the same glow — not two drawings
that resemble each other. The glow radii are expressed as fractions of the
diameter (34/176 and 110/176), so the object survives scaling without becoming a
different drawing, and a 56px claim on a row is the 176px token seen further
away.

What it replaced: a faceted orange capsule with bevels, an inset path and a
highlight stroke — a construction that existed nowhere else in the deck and read
as *a token-shaped object* rather than as *the* token. The rhyme the deck's
whole first act sets up ("that's what you've been holding all along," 4.04) now
happens on screen instead of in the script.

### 2.2 Section 1 does not change on the way past

R7.1's scope is Section 4, so the shared-render refactor had to leave the
delivered frames untouched. `review/rebuild-r7-1/harness/pxdiff.cjs` decodes two
PNGs and compares them channel-by-channel; 1.2 b1, 1.2 b3 and 1.3 b1 are
**pixel-identical** to their pre-R7.1 captures.

It caught one real regression on the way: the shared class scales the glow with
the diameter, but the old rule gave 1.3's 120px token the *176px* token's glow.
The first refactor therefore changed 1.3 by 1.43% of pixels (max channel delta
8). The original absolute radii are restored for that one selector, with the
reason recorded in the CSS.

### 2.3 The carrier

Two open arcs at the grammar's single 2.5 stroke with dot terminals, generous
negative space between shell and disc, and the accent as its color — the carrier
is the thing under judgment, and §9.4.6 says orange marks argument. Open form is
argument too: a sealed capsule contradicts 4.06–4.09, where the whole point is
that a carrier can fail.

Every state API (`visible` / `emphasis` / `redeemed`, `visible` / `focus`) and
every transition timing is unchanged, so all existing choreography is preserved
motion-for-motion. `emphasis: focus` changed meaning rather than timing: it was
a drop-shadow under the capsule, and is now a brightening of the disc's own
light, because a disc that glows harder reads as emphasis while a shadow reads
as a card.

**Not yet done for Phase B:** the brief's item 3 — reduced-motion and
direct-entry parity re-verified for every claim/carrier build — is Phase E work
and has not been run.

---

## 3. Phase C — Flagship recompositions (part-done)

### 3.1 The Icon Studio extension (done)

Four new families, three genuinely distinct constructions each, on the 48-grid
at the single 2.5 stroke, with candidates, standalone SVGs and a regenerated
contact sheet kept under `review/rebuild-r7-1/icon-studio/`:

| glyph | selected | why, and what the other two did |
|---|---|---|
| **operation** | **A — the steadying pulse** | *Second studio round, new semantic direction.* The first round drew the **procedure** — an incision, an instrument, a monitor trace — and the best of the three still read as a comb. This round draws the **value delivered**: one line whose beats start irregular and settle into an even rhythm. It states the outcome, needs no knowledge of surgery, and survives riser scale. *B, the mending arc,* was the alternative direction the round was set against — repair as continuity restored — and it fails because its closed break is invisible: three smooth segments read as a plain arch. *C, the settled interval,* makes A's argument without a waveform and lands as a bar chart, which the grammar already rejected once at the ledger's tally column. |
| **shoe** | **B — the head-on last** | Symmetry and three lace rungs carry it where silhouette could not. *A, the profile,* reads as a wedge even after a re-cut; *C, the print,* reads as a foot rather than as footwear. |
| **meal** | **B — the plate and cover** | The cloche is the oldest unambiguous sign for a served meal and survives riser scale intact. *A, the cut and bone,* reads as a blob with a stem; *C, the fork and cut,* reads as cutlery beside an egg. |
| **wine** | **A — the glass** | Bowl, stem, foot: the most legible wine mark at every size. *B, the bottle,* puts dot terminals on the neck where they read as antennae; *C, the amphora,* reads as an urn. |

The **shoe family was re-cut once**: the first pass at all three candidates
failed the legibility rule outright (the profile read as a rock, the high-top as
a bird). A was rebuilt around the three features that actually make a shoe
legible — flat sole, ankle opening, toe spring — and B was replaced with the
head-on construction that became the selection.

### 3.2 C1 — 4.03 rebuilt as a node-scene (done)

The surgeon photograph is gone from the slide. The beat is now two node dots,
one thin edge inset at both ends, names on the outside of the shape, and the
service riding the drawn line from surgeon to patient — `_exchangeScene.js`,
built as Section 2's triad construction reused deliberately, so that exchange
*succeeding* is drawn in the same hand that drew exchange *failing* eight beats
earlier. The viewer has seen this diagram before.

Two restaging decisions:

- **The six capabilities stay one build.** C1 says they should "land per the pacing rule, one per advance"; the frozen script has one `[→]` for the whole sentence, and §9.4.1 names this exact case — *a list being built is one accumulating element*. Six advances would require six `[→]` where the script has one. The script is untouched, the labels arrive in the order the sentence names them (3.2's Argentina-row pattern, live only), and this is **flagged**.
- **When the receipt lands, the capabilities clear rather than dim** (§9.4.1). Two stacked blocks of text under one diagram is precisely the density this phase exists to remove.

The `$400` stays, accent and display scale, and now sits on the lower lane at
the edge's midpoint: the service crosses above the line, the money crosses back
below it. The counter-flow is drawn instead of captioned.

The script's four `[→]` are unchanged.

---

### 3.3 C2 — the stability frame (4.20)

As shipped, six text blocks stood on one frame. It is now four sequential
builds — **STABILITY** alone; the two questions hiding inside it as a mirrored
pair; what each half is responsible for; what Bitcoin actually fixes — each
dimming as the next lands. The column headings give up the accent, so the
closing pair is the only orange text on the slide (§9.4.6).

The script gains one `[→]` and **no words**: the split falls on a sentence
boundary the spoken text already had. 4.20 goes from seven builds to eight.

### 3.4 C3 — the monetary premium (4.18)

The equation assembles term by term on the advances the script already
provides — "the part that is easy to defend" *is* the utility term, "the other
part" *is* the premium — so no re-map was needed. The three asset tiles are
de-boxed: the premium was a bordered octagon drawn around each mark, and is now
a warm halo on the mark itself, which says the same thing in the deck's own
language. The closing pair lands alone with everything above it dimmed.

### 3.5 C4 — the margin and case frames

4.21 already complied. **4.22 did not:** the Phase B disc re-skin had blown out
its demand claims — they arrive as marginal savings against the stock and were
rendering at the section's hero scale, dwarfing the margin column they bid for
and overrunning the `PRICE DISCOVERED HERE` label. Sized to the field's own
units. C3's de-boxing applies here too: the repricing frame was a bordered
rectangle around the whole stock, and redundant besides, since the units
visibly relight across the sweep. One rule under the stock remains.

4.23 verified and untouched.

---

## 4. Phase D — the standard sweep, measured

Retiring the header moved the top of nineteen frames, and "does this look
centered now" is not a judgment to make by eye nineteen times. The sweep is a
gate: `review/rebuild-r7-1/harness/compose-r7-1.cjs` walks every build of every
Section 4 slide and the close, computes the union bounding box of what is
actually visible, and checks the two things §9.4.4 cares about — nothing within
100px of a frame edge, and the settled frame vertically centered.

**It found two flaws in itself before it found anything else, and those
mattered more.** It measured element boxes, so every centered line in a
`left:0/right:0` container reported as touching both edges; it now measures ink
via a `Range` over the text. And it demanded centering on *every* build, which
is wrong — a frame that accumulates downward is designed around its last build
and legitimately sits high before it. Centering is now judged on the settled
frame only. Those two corrections took 75 failures to 16, of which the survivors
were real.

**Final: 128 checks, 0 failures.**

---

## 5. The per-slide decision log

| slide | what changed |
|---|---|
| **4.01** define the job | Header removed. Already compliant otherwise — centered, one idea per build. |
| **4.03** simple exchange | Rebuilt as a node-scene (C1). Photograph deleted. Capabilities clear when the receipt lands; `$400` moved to the lower lane at the edge's midpoint so the counter-flow is drawn. |
| **4.04** unfinished exchange | Rebuilt as the return leg (C1). Photograph deleted; goods become glyphs, dim at the frame's right. Claim rides the lane back, then is released to stage center. Definition line lowered to center the settled frame. |
| **4.05** spend or save | Photographs → drawn goods; carrier shell now encloses the disc on the save road. R7's fork choreography and V-3's dormant tine preserved. Save support moved clear of the disc's halo. |
| **4.06** claim and carrier | Header removed. Re-skinned by Phase B; composition already compliant. |
| **4.07** store-of-value function | Header removed. Already compliant. |
| **4.08** the 100-year test | Header removed. Already compliant. |
| **4.09** the future is unknowable | Header removed. Already compliant. |
| **4.10** invert the question | Header removed; **recomposed** — framing and stress stage shifted +102px, the space the header had occupied. |
| **4.11** carrier failures I | Header removed. Structural diagram; keeps its pattern (§9.4.8). Compliant on measurement. |
| **4.12** carrier failures II | Header removed. As 4.11. |
| **4.13** failure to requirement | Header removed; **recomposed** — main line and grid shifted +108px. |
| **4.14** the ten properties | Header removed. Already compliant — two balanced columns. |
| **4.15** framework to comparison | Header removed. Already compliant. |
| **4.16** the comparison | Header **retained** as a quiet kicker, restyled to the S1–3 register and centered; moved from 46px to 104px (it was the nearest thing to a frame edge in the section); closing line raised to keep the bottom margin. |
| **4.17** migration | Header removed. Already compliant. |
| **4.18** the monetary premium | C3: equation assembles term by term; tiles de-boxed to glyph + label + sub-label with a premium halo; closing pair lands alone. |
| **4.19** other assets | Header removed. Already compliant. |
| **4.20** coexistence + stability | C2: stability restaged from one dense frame to four sequential builds; one `[→]` added, no words; headings give up the accent. Header removed. |
| **4.20b** what would change these scores | Header **retained** as a quiet kicker, centered. |
| **4.21** the marginal decision | Header removed. Verified against the standard; already compliant, and the disc re-skin improved it. |
| **4.22** fixed supply | Header removed. Demand claims resized to the field's units; repricing frame de-boxed to a single rule. |
| **4.23** the case | **Untouched.** Frozen frame; keeps the retired header treatment by design. Pixel-identical to `main` at all three builds. |
| **5.01** the close | Header n/a. Already compliant; settled frame centered exactly. |

---

## 6. Verification

Everything below was run against the final tree on this branch. The baseline
for every comparison is `main` at **`b029e4d`**.

| harness | what it proves | result |
|---|---|---|
| `gates-r7-1.cjs` | the freeze, the language rules, and the three things this phase removed | **24 checks, 0 failures** |
| `compose-r7-1.cjs` | §9.4.4 measured: edge clearance and settled-frame centering, every build | **128 checks, 0 failures** |
| `verify-r7.cjs --part=traversal --emit-live` | forward/back/fast-forward walks; captures 113 live signatures | **5 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=direct --use-live` | direct entry, reconstruction, named assertions, mid-animation refresh | **244 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=traversal,direct --reduced` | the same matrix under `prefers-reduced-motion` | **249 checks, 0 failures**, console clean |
| `verify-r7.cjs --part=settle` | the reduced-motion settle gate | **32 checks, 0 failures** |
| `flash-r7.cjs` (+ `--rm`) | frame capture at 16 boundaries, 15 frames each | **16 / 0 in both variants** |
| `rhyme-r7-1.cjs` | the claim and the token are one render | **4 checks, 0 failures** |

**702 assertions, none failing.** `npm run build` clean.

### 6.1 The freeze

`_comparison-data.js` is **untouched entirely** against `b029e4d` — not merely
its scores block; the whole file is byte-identical, ten properties × five
candidates = fifty scores. `23-investment-case-from-first-principles.js` is
byte-identical too, and **4.23 renders pixel-identical to `main` at b0, b1 and
b2** — captured from a detached worktree of `b029e4d` served alongside, and
compared channel-by-channel. That is the strongest available form of "touch
nothing on 4.23".

### 6.2 Pacing

Regenerated for all of Section 4: **23 slides, 87 builds, 87 `[→]`, zero
mismatches** (89/89 including the close and the two Section 3 seam slides the
gate walks). The only build-count change in this phase is 4.20, seven → eight.

### 6.3 What this phase removed, verified by gate

- **No `<img>` and no raster reference anywhere in `src/`.** `assets/images/` holds one file, the favicon. `GoodsCluster.js` and `src/assets.js` are deleted — the manifest had no consumers left.
- **No boxed-panel border on any Section 4 selector.**
- **`KickerLabel` has exactly one caller**, the frozen 4.23. `QuietKicker` has exactly two, the comparison table and the falsifiability beat. No retired per-slide header selector survives in CSS.
- `"Don't trust. Verify."` on stage exactly twice; banned terms absent; American English; typographic apostrophes.

### 6.4 The rhyme

`rhyme-r7-1.cjs` proves the claim and the token are the same render rather than
similar drawings: both carry `luminous-disc`, their computed `background-image`
strings are identical, their glow colors are identical, and both are circular.
The side-by-side sheet at matched scale is
`review/rebuild-r7-1/screenshots/rhyme-side-by-side.png`.

### 6.5 Two stale checks that passed while testing nothing

Both were mine, and both are worth recording because they are the failure mode
a verification pass cannot afford.

1. **A named assertion aimed at a build that had moved.** `4.20 b7: the coexistence frame has cleared` was written when b7 was the stability module's last build. C2 made it b8. The assertion still passed — against the wrong frame. Rewritten to the new build map, asserting the dim states C2 introduced.
2. **A flash boundary that no longer existed.** `4.20 b7 → 4.20b b0` tested a seam that C2 had moved: from b7 the arrow now advances *within* the slide. It passed because the authored-black rule only requires "never relights after going void," and a frame that never goes void never violates it. Corrected to b8, and both variants re-run.

### 6.6 Evidence

- `review/rebuild-r7-1/screenshots/` — **116 PNGs**: every build of all 24 changed slides, plus the rhyme sheet and its two crops.
- `review/rebuild-r7-1/icon-studio/` — contact sheet and per-glyph rows for all four new families; candidates and standalone SVGs kept in `assets/icons/candidates/`.
- `review/rebuild-r7-1/freeze-main/` and `freeze-now/` — the 4.23 baseline and current captures behind §6.1.
- `gates-r7-1.json`, `compose-r7-1.json`, `rhyme-r7-1.json` — machine-readable results.

`playwright` is now a **declared devDependency**, locked at 1.62.1 — the version
R7's evidence was produced with. The harness has never been installable from a
clean checkout; R7 flagged that a clean install silently disarms it, and it then
did so a second time on 31 July. That is fixed rather than noted.

---

## 7. Flagged for presenter review

1. **4.23 keeps the retired header treatment** (§1.2), confirmed. It is the one frame in Section 4 still carrying the accent caption and rule line. Harmonizing it is a freeze decision, not an implementation one.
2. **The six capabilities remain one build** (§3.2), confirmed — the frozen script and §9.4.1 against C1's "one per advance." The same ruling was applied to 4.18's three asset tiles, which are also one spoken sentence naming three things.
3. **The `operation` glyph now reads, but it is an abstraction.** "The steadying pulse" states the *outcome* of the hour rather than depicting surgery, which is why it works at riser scale where the procedural marks did not. If the presenter would rather the surgeon's delivered value not be drawn as an object at all, the node-scene works with the edge alone — the glyph is one line to delete.
4. **4.20 is now eight builds.** The added advance is a real change to the recording's pacing, even though it adds no words.

---

## 8. What changed, in one place

**Removed from Section 4:** every photograph (5 renders, ~7 MB), the
`GoodsCluster` component, `src/assets.js`, the header convention on 19 slides
(and its CSS), every boxed-panel border, and the faceted capsule.

**Added:** `LuminousDisc` (shared with Section 1), `QuietKicker`,
`_exchangeScene.js`, four glyph families with candidates and contact sheets,
and three verification harnesses — composition, rhyme, and the R7.1 gates.

**Untouched:** the argument, the scripts' content (one `[→]` added at 4.20, no
words), all fifty scores, and 4.23.

---

## 9. Commits

- `31afc50` R7.1 brief committed to the branch
- `592578b` Phase A: the compositional standard, and the header convention retired
- `4782d7e` Phase B: the claim is the disc, the carrier is a grammar shell
- `d8c15f6` Phase C1 (part): the Icon Studio extension and 4.03 as a node-scene
- `3b6f739` interim report
- `a303a0d` declare playwright as a devDependency
- `e8a1224` Phase C1 (complete): 4.04 and 4.05, and the last photographs deleted
- `29b5c77` Phase C: C2, C3 and C4 — the density exemplars
- `18e2cee` Phase D: the standard sweep, measured rather than eyeballed
- Phase E: verification, evidence, and this report — the commit this document arrives in

Base: `main` at `b029e4d`. **Not merged.**
