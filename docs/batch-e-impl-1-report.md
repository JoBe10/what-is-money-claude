# Batch E Implementation, Session 1 — Report
## The three records made, and Scenes 24–27 built — the case comes home on the legacy's own motion

**Mode: FAST.** Scoped verification: the three records' own proofs (the sheet checks at 43/43), the 20 built states proven against their approved cells three ways at zero pixels, the route smoked end to end both ways with reduced-motion parity and the interrupted gesture, the production build, and the deck boot proven unchanged. No deck-wide suites. No `src/` file outside the new act was touched, and the batch's own full verification is Session 2's.
**Branch:** `film-rebuild`. **Prior tag:** `act-5-states`. **Tag:** `act-5-impl-1`.
**Date:** 4 September 2026.

---

# 1. The plain-English handoff — what stands, and what Session 2 does

**This session asks nothing of you.** Your rulings are recorded and executed. The place your eye meets this work is **the act viewing after Session 2**, when the film's ending runs from Scene 23's closing line to the two words. Two things below are for that viewing, and neither blocks anything.

**What stands after this session:**

- **The sheet is the approved set.** All 27 cells stand approved, the six that carried a flag approved as rendered, Scene 27's legacy order standing. The flags stay on the sheet as closed records rather than being deleted — what was seen, and what was approved. That set is now the visual authority: a settled state that is not its approved cell at zero pixels is a defect.
- **The six seams are recorded as ruled**, each on the cell that carried it, in the sheet's own record as well as in the map. Two of the six fall in this session's range and are built: the Act IV boundary is a crossfade, and Scene 26's internal merge is the legacy crossfade.
- **The fiat note's size in Scene 23's band is on file as noted, not ruled.** Nothing changed on its account. It joins the exit's two wiring numbers and Scene 16's entry on the list to judge at the viewing.
- **Scenes 24, 25, 26 and 27 are built and proven.** Every settled state is its approved cell at zero differing pixels, twenty of twenty, three comparisons each. They run as one continuous world at `?proto=act5`, behind the untouched 32-slide deck.

**How the scenes are built, in one paragraph.** The legacy Act V slides are the motion authority, and this session re-homed them rather than transcribing them. The shared Act V stage mounts each legacy module once, into a layer of its own, and drives it through its own public surface: the same render, enter and build calls the deck runs. A settled state is therefore the legacy's own direct-entry frame for that build, the legacy stylesheet places every element, and a live advance is the legacy's own dataset choreography at the legacy's own durations. **Act V authors no motion of its own** — Act IV had one composed morph; this act has none, because the descent the map records is carried entirely by the legacy's advances and the legacy deck's own boundaries.

**Session 2 (Opus 5, max, FAST, fresh CLI)** builds Scenes 28, 29 and 30 on the same stage, makes the last splice, runs the batch verification, completes the strip, tags `batch-e`, and reports with the act-viewing protocol. Four things Session 2 should know:

1. **The stage grows by adding layers.** Its legacy map holds `4-17` … `4-21` today. Session 2 adds `4-22`, `4-23` and `5-01` to that map and writes each scene's state list as layer-and-build pairs, exactly as Scenes 24–27 are written. Five gesture helpers cover every beat: a legacy live advance, a legacy boundary onto a build 1, a legacy boundary onto a build 0, a legacy cold entry, and a cut (the frame stands and the deck's own crossfade delivers it).
2. **Scene 30's black beat needs a decision about the layer.** The close's first beat is `5-01` at build 0, which is black, and `applyState` shows exactly one layer. The straightforward reading is that the `s501` layer stands at build 0 like any other; the alternative is a black beat with no layer shown at all. The approved cell is black either way, so this is wiring, and Session 2 should stand one reading and flag it rather than choosing silently.
3. **The splice retires the last eight legacy slides.** Scenes 24–30 enter in place of `4-17` through `4-23` and `5-01`. Expected: **31 scenes**, no legacy slide left in the manifest. The two seams to prove both ways are Scene 23 → Scene 24 (the crossfade this session could not smoke, because Scene 23 is not in the scratch route) and Scene 30 as the deck's final state with nothing after it.
4. **Two frames differ on a continuous walk, and they are the legacy's own.** §6 has the whole account with its evidence. Nothing needs fixing in Session 2; it needs stating in the batch report and at the viewing.

---

# 2. The three records, first, each its own commit

| # | Record | Where it is recorded | Commit |
|---|---|---|---|
| 1 | **The sheet is approved in full.** The six pending cells approved as rendered; Scene 27's legacy order stands — the question hangs over the lone claim before the paths appear; the go-ahead given. | master §13 · `docs/act-5-provenance.md` §5 · `docs/batch-e-package.md` (the pipeline) · the sheet: `states.mjs`'s six cells → `approved-as-rendered`, `capture-states.cjs` carrying `approval` and `approvedSet` with every flag closed, `check-cells.cjs` brought current | `404ff64` |
| 2 | **The six seams are Batch E's to time, as their flags state.** Each boundary is played as the legacy played it; no settled frame changes and nothing is redesigned. | master §13 · `docs/act-5-provenance.md` §4 · `docs/batch-e-package.md` §1.2 · the sheet's own record gains a `seams` block, each seam on the cell that carried it, and a check gates it | `340f6ff` |
| 3 | **The fiat note's size in Scene 23's band — noted for the viewing, not ruled.** | master §13 · `docs/act-4-provenance.md`'s S23-F2 row, beside the fit ruling | `c9111c1` |

Two things about the records worth saying plainly. First, **the flags were closed, not deleted.** An approved-as-rendered cell keeps the flag it carried, so the sheet still says what was seen and what the answer was; a sheet that quietly loses its flags loses the reason its cells are approved. Second, **the seam ruling is recorded where the proofs read.** It is in the map and the package as prose, and in `review/act-5/states/states.json` as six rows keyed to their cells, so a session building a boundary finds the ruling beside the frame rather than three documents away.

# 3. The build — Scenes 24–27 as one continuous world

`src/scenes/act-5-the-case/` — `_caseStage.js` (the shared stage), `_sceneModule.js` (the contract), and the four scene modules, registered at `?proto=act5` while they wait for the splice. **No manifest change; the deck is untouched at 32.**

**Every settled state is its approved cell, by construction.** The stage keeps one layer per legacy slide. A state names a layer and a legacy build. Reconstruction shows that layer alone and puts its module at that build through the module's own reconstruction path, the same path a deep link takes. Hidden layers leave the paint tree entirely — which matters more in this act than in any before it, because Act V paints the same five dark-field subjects at three box sizes. The landed-state proof closes it mechanically: **20/20 at zero differing pixels, three comparisons each.**

**Ports move like they always did.** Scene 24's three advances, Scene 25's three, Scene 26's eight and Scene 27's two are the legacy modules' own live advances — the same dataset flips, the legacy stylesheet carrying every duration and stagger. The longest is Scene 24's third beat, where the lane draws for 620ms, the branches rise behind a 420ms delay and the three claims ride their `offset-path` for 820ms.

**The boundaries are the legacy deck's own boundary.** The engine's 300ms crossfade is transcribed into the stage, ease curve included, and plays between layers. Where the incoming scene's first beat is a legacy build 1 — Scene 26 — the crossfade is followed by that slide's own build-1 reveal, as Act IV's boundaries did. Where the first beat **is** the legacy's build 0 — Scenes 25 and 27, by the entry-line ruling — the crossfade lands on that build and nothing follows it, because that frame is the beat.

**The three entry beats are their own advances**, which is what Row 1 = A asked for. Scene 24 beat 1 is fiat standing with its two jobs; Scene 25 beat 1 is the equation's left-hand side alone; Scene 27 beat 1 is the claim under the standing question. Each has one `[→]` of its own, each is a settled state the proof pins to its cell, and no words changed.

**The Act IV boundary is a crossfade, and this stage authors nothing for it.** Scene 23 and Scene 24 are in different scene groups, so the engine's own non-continuous path runs — mount, then crossfade — which is exactly the boundary the legacy deck played between `4-16` and `4-17`. The scene stands its first frame and lets the crossfade deliver it. That is the ruling executed, not a shortcut around it.

**What is retired stays unreachable.** Legacy `4-20`'s builds 5–7 — the stability contrast — are cut by architecture Ruling 5. Scene 26's state list stops at build 4, the state list is the only thing that can reach the module, and the smoke asserts the maximum build any state drives `4-20` to is 4.

Scripts installed as notes, verbatim from the package's §2 by mechanical injection (4 + 4 + 9 + 3 arrows; `review/batch-e/harness/install-scripts.cjs`, `--check` green), one arrow per beat with the first arrow spoken over the scene's entry. The falsifiability passage rides Scene 26's notes behind its bracketed marker, which carries no arrow, so the scene stays at nine beats. Scene contract in full: cold entry gestures, a morphIn per boundary, backward handoffs to the previous scene's end state, interrupted-gesture completion, reduced-motion parity, teardown.

# 4. Files changed

## New
| file | what |
|---|---|
| `docs/batch-e-implementation-brief.md`, `docs/batch-e-impl-1-report.md` | the brief as given, and this report |
| `src/scenes/act-5-the-case/_caseStage.js`, `_sceneModule.js` | the act's shared stage and contract |
| `src/scenes/act-5-the-case/24-…js`, `25-…js`, `26-…js`, `27-…js` | Scenes 24–27 |
| `review/batch-e/harness/install-scripts.cjs` | the script installer, `--check` green |
| `review/batch-e/harness/proof-impl1-scenes.cjs` + `review/batch-e/landed-proof-impl1.json` | the landed-state proof (20/20) |
| `review/batch-e/harness/smoke-impl1.cjs` + `review/batch-e/smoke-impl1.json` | the smoke |
| `review/batch-e/harness/capture-strip-impl1.cjs` + `review/batch-e/strip/` + `strip-impl1.json` | the capture strip, started (20 settled + 19 gestures), and the walk measured |
| `review/batch-e/harness/probe-walk-artefact.cjs` + `review/batch-e/walk-artefact.json` | the walk artefact attributed |

## Modified
| file | what |
|---|---|
| `docs/what-is-money-master.md` §13 (three rows) | the two rulings and the note, each with its trail |
| `docs/act-5-provenance.md` | §5 the approval; §4 the seam ruling |
| `docs/act-4-provenance.md` | the S23-F2 row carries the fiat-note observation as noted, not ruled |
| `docs/batch-e-package.md` | the pipeline advanced; §1.2 item 6 closed |
| `review/act-5/harness/states.mjs` | the six cells → `approved-as-rendered`, the header's review-class note |
| `review/act-5/harness/capture-states.cjs` | the approval and the approved set in the record; the six seams; the flags closed; the sheet reads as the approved set |
| `review/act-5/harness/check-cells.cjs` + `check-cells.json` | the approval and seam checks; 43/43 |
| `review/act-5/states/sheet.html`, `states.json` | re-cut as the approved set — **the 27 PNGs untouched** (`--record-only`) |
| `src/proto/registry.js` | the four scenes at `?proto=act5` (they leave the list at the splice) |

**Out of scope, changed anyway: none.** No Act I, II, III or IV scene module, no legacy slide, no component, no frozen data file, no manifest entry, no engine file, no wording beyond the records.

## Commits and tag
```
57e5f9c  docs                      the Batch E implementation brief is on file
404ff64  record(batch-e ruling 1)  the sheet approved in full — the six cells as rendered, the go-ahead
340f6ff  record(batch-e ruling 2)  the six seams are Batch E's to time — each boundary as the legacy played it
c9111c1  record(batch-e note)      the fiat note's size in Scene 23's band — noted, not ruled
f9f7dce  scenes(act-5)             the shared stage, the contract, and Scene 24
6bfe5c9  scenes(act-5)             Scene 25
e427096  scenes(act-5)             Scene 26 — the architecture's merge
4d5f7ee  scenes(act-5)             Scene 27; the four scenes registered at ?proto=act5
2d85895  review(batch-e)           the landed-state proof — 20/20 at zero pixels
eeeda43  review(batch-e)           the smoke — zero deck impact, 20 states both ways, parity 20/20
c4fd563  review(batch-e)           the capture strip started, and the walk measured
31a09e4  review(batch-e)           the walk artefact attributed — inherited, not introduced
692f6fb  review(batch-e)           the interrupted gesture proved — 12/12
```
Plus this report. **Tag: `act-5-impl-1`** at the report commit.

# 5. Validation

| check | result |
|---|---|
| **Sheet checks** (`review/act-5/harness/check-cells.cjs`) | **43/43 green**: 27 cells measured; the ruled map agreeing with every cell; every beat once; the approval recorded and the approved set every cell; every flag closed; the six seams recorded on their cells; the rhyme from the source; the close's black and its two words; the source gate |
| **Landed-state proof** (`review/batch-e/harness/proof-impl1-scenes.cjs`) | **20/20 at zero differing pixels**: scene↔archived cell, fresh cell↔archived, scene↔fresh cell, every state; every shot on a fresh page; 0 console errors |
| **Smoke** (`review/batch-e/harness/smoke-impl1.cjs`) | deck boots unchanged (32 slides, first id `eighty-thousand-hours`, 0 errors) · route boots 4 scenes · **20-state traversal exact forward, monotonic backward** · the three boundaries land the previous scene's end state backward and the next scene's first state forward · the merge inside Scene 26 crosses from `4-19` to `4-20` on an advance and back · **20 cold entries settled** · **reduced-motion parity 20/20** by serialization · **interrupted gestures 12/12** land the calm state · the retired stability builds unreachable · **0 console errors** |
| **Scripts** | `install-scripts.cjs --check`: **4/4 identical to the package**, 4 + 4 + 9 + 3 arrows; every beat exactly one `[→]` |
| `npm run build` | clean |
| **Strip** | 20 settled + 19 gesture frames, 0 errors; the settled frames pinned to the approved cells by the proof, and separately measured on the continuous walk — §6 |
| **Commit granularity / tree** | each record, each scene and each proof its own commit; the tree clean at every stop |

**Not run, and not claimed:** no deck-wide register, brightness or composition audit; no static-gate suite (nothing in the deck moved — no legacy source was touched this session); no second-window notes check; no scene test (Session 2's, on all seven scenes); no full-deck traversal. FAST defers the global suites to Session 2's batch verification and the GATE. **The Act IV → Scene 24 boundary is not smoked here** and is not claimed to be: Scene 23 is not in the scratch route, and that seam is proven both ways at Session 2's splice.

# 6. Flagged, not improvised

1. **Two of the twenty settled frames differ on a continuous walk, and both are the legacy deck's own.** The proof mounts every state cold, and all twenty match at zero. A viewing is a continuous walk, so the strip measured that too — and four frames differ from their approved cells: **s24-b3 and s24-b4 by 6 pixels** (max channel delta 7, inside the third migrating claim's disc) and **s27-b2 and s27-b3 by 7,083 pixels** (max delta 61, across the row of five compact-box renders). The second is the image-cache resampling the act-5-states session predicted for Act V: the same five subjects are painted at the 180 × 150 display box in Scenes 24–26 and then at Scene 27's compact box, and the browser resamples the second draw from the first's cached raster. **The attribution is measured, not asserted** (`review/batch-e/walk-artefact.json`): the untouched legacy deck, walked `4-17` → `4-21` and compared with itself direct-entered, differs at the same four states by the same pixel counts — 6, 6, 7,083, 7,083 — and is clean everywhere else. **Inherited from the legacy walk; introduced by nothing this session did.** It is left as it stands, because fixing it would touch the render pipeline, which is not this session's to do. What it means practically: at the viewing, Scene 27's five candidate renders may read very slightly softer than the approved still; the 6-pixel one is invisible. If you want it addressed, it is a component-level change and it belongs to the GATE, not to a port.
2. **Scene 30's black beat is Session 2's one wiring choice**, named here so it is not decided silently there. The stage shows exactly one layer per state; the close's first beat is `5-01` at build 0, which is black. Standing the `5-01` layer at build 0 is the straightforward reading; a black beat with no layer shown at all is the alternative. The approved cell is black either way.
3. **The brief's "12/12" does not match the frozen beat map.** §2 of the brief asks for landed proofs at 12/12, but the map frozen on 4 September (master §13) gives Scenes 24–27 **twenty** settled states — S24 4 · S25 4 · S26 9 · S27 3 — and §1 of the same brief re-affirms that 27-cell sheet. Twenty is the number the frozen map compels, so **all twenty are built and all twenty are proven**, which is strictly more than the brief asked for and contains any twelve of them. Nothing was scaled down; the discrepancy is stated rather than quietly resolved.
4. **Legacy `4-20` carries dead code**, recorded so no session reads it as a treatment: `createBisection` references a `BISECTION` table that does not exist and is never called. Nothing in Scene 26 reaches it. This is the map's own §4 seam 9, re-confirmed by inspection; it is untouched.

# 7. Remaining judgment calls — all yours, all at the viewing

- **The act viewing is the gate,** after Session 2: from Scene 23's closing line, forward at speaking pace through the migration, the premium, the other assets, the marginal decision, the field returning, the case, the silence, and the two words.
- **The fiat note in Scene 23's band**, noted this session and unchanged, and with it the exit's two wiring numbers and Scene 16's entry, which stand as built by your earlier ruling.
- **Scene 27's five candidate renders on a continuous walk** (§6 item 1), should the softening read wrong in context.
- The word pass still owns what the map's §4 lists: the two self-reference substitutions, "in eleven words", the passage's pointers at the table, whether "Thank you." is spoken or only shown, and the premium line's unspaced dash.

# 8. Recommended next step

**Session 2** (Opus 5, max, FAST, fresh CLI): Scenes 28, 29 and 30 on the same stage — the field ported whole with the bookend rhyme real by construction, the full clear onto the case, the silence and the two words — then the last splice with both boundaries proven, the batch verification across all 27 states, the completed strip, tag `batch-e`, and your viewing of the act, which closes the batch on your word.
