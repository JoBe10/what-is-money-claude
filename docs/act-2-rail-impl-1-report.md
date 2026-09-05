# Act II Rail Implementation — Session 1 · Report
## Scenes 5, 6 and 7 rewired onto the shared rail world

**Mode: FAST.** The verification is the brief's §2 list: landed-state proofs, per-scene smoke, build, boot, capture strip, commit granularity, tag.
**Branch:** `film-rebuild`. **Prior tag:** `act-2-rail-r2`. **Tag:** `act-2-rail-impl-1`.
**Date:** 1 September 2026.

---

# 1. The headline

**Act II's first three scenes now run on the rail, in the deck, and every settled state of them is your approved cell at zero differing pixels — 18 of 18, with 0 console errors.** The rail begins at the left edge of the record and grows rightward through Scene 7; every station arrives with a line beneath it; and there is no claim disc anywhere in Act II, in a settled frame or in a gesture.

# 2. The records (§1 of the brief), each its own commit

| # | Record | Where | Commit |
|---|---|---|---|
| 1 | **The r2 sheet is presenter-approved in full** — all 39 cells, including the nine honest-render flags; the two named for your word (the featured-line register at S7 b3; the mesh belonging to beat 1 with the coin arriving on a returned rail at S9 b2) are **approved as rendered**. No cell is pending; the flags are closed. The approved set is the visual authority for every landed-state proof | `review/act-2/rail/states.json` (`approval`, `approvedSet`) via the capture harness, so the record regenerates rather than being asserted · master §13 · the amendment's r2 section · the r2 report's §6 and §8 banners | `4d540a5` |
| 2 | **The act's gate criterion stands as amended** — the collapsed Gate 3's judgment object is **the rail's own continuity**, judged at your act viewing after Session 2, in the three holds you checked on the sheet, now in motion, plus the seams by name. Of the struck gate's three original questions, the first is re-answered by the amendment and the other two stand | `docs/batch-b-package.md` §4, where the gate's scope lives | `95c0383` |

# 3. What was built

**The rail world** (`src/scenes/act-2-the-architecture-of-money/_railWorld.js`, commit `1e630dc`): Act II's anchor as persistent DOM — ten stations, the line and its minor marks, the band under the equal-visual-weight box, the row register that carries a station's one standing line, and the dependency arc. Every coordinate, style string, rounding and append order is transcribed from `review/act-2/harness/rail.mjs`.

The sheet rebuilds the whole world per cell. A deck cannot: it has to *move* between those states. So the world is built once and each state writes its geometry onto it from the sheet's own camera math — which is what makes a camera move possible at all, and is exactly how `EvolutionRail` has always worked. Two consequences are named at their call sites: a row's `cssText` is rewritten on every repaint, so the two properties a gesture owns are carried across it; and the line's extent and the recession are driven as scalars so a repaint cannot wipe a tween mid-flight.

**The states** (`_railStates.js`, same commit): the 22 settled states of Scenes 5–7, cell by cell, each naming the cell it is. The beat map is untouched at 8 · 9 · 5.

**The rewire** (commit `5104a9f`): the stage mounts the rail world first and beneath everything — the overlays rise *over* the receded record and the stage-register landings sit over both, which is the sheet's own stacking. Scenes 8–10 keep their legacy compositions until Session 2, and the legacy contender rail is left mounted but unreachable rather than deleted early.

**The motion is the legacy rail's, at its own durations**, named at every call site: the camera's 1.7s `power2.inOut` tween (EvolutionRail's own), the stop's 800ms arrival, the wound row's 900ms fade and 1100ms rise from 6px, the line's 1500ms extension after a 300ms hold, and `.s2o-rail`'s 800ms recede and return. GSAP eases stand in for the CSS timing functions, the same substitution Batch B's scenes already ship.

What the scenes play:

- **Scene 5** — the line draws in out of the dark and SHELLS takes station one with its virtue; CATTLE, SALT and IRON arrive **to its right** and fall, each wound landing at full voice while the one before it recedes; METALS rises with its own line; the ship returns to the far-left station and the dated fact lands in the severance's own reveal character; the thesis and the exit question land over the receded record.
- **Scene 6** — GOLD arrives and its gain settles as the table rises over the deep-dimmed rail; the elimination runs at the legacy pacing, one wave per advance, untouched; the rail returns crowned; the counted load names gold's weakness.
- **Scene 7** — the rail returns carrying gold's dependency note, COINAGE arrives photographic and its limit lands, and then **the vault folds into the rail**: CLAIM ON GOLD arrives, the dependency arc draws back to the gold through the corridor the traveler left, the featured line lands at full voice and condenses into the station's own row a beat later.

**The claim is in no rail beat — and in no gesture either.** Ruling r2.3 pauses its on-screen thread through Act II, so the act no longer opens on the disc arriving from Scene 4's world; it opens on the record starting to be written, which is the amendment's own S5 b1. Named in §6 below, because it retires a continuity the architecture had listed.

# 4. One defect found, and it was not in the deck

The landed-state proof compares three ways, and the third comparison — a fresh render of the cell's own builder against the archived PNG — is the control. It fired.

**Three cells of the approved sheet did not match their own builders.** `s7-b1`, `s7-b2` and `s7-b3` differed from a fresh render by up to **37/255**, scattered inside the photographs. The cause was page reuse in `capture-rail.cjs`: it refreshed the browser page every eighth cell, and a page that has already built several cells has created and destroyed the same `<img>` elements at many different box sizes — Chromium does not always land on the same downscale afterwards. Those three were shots 14, 15 and 16 on such a page; `s7-b4`, the first shot after a refresh, was exact.

**The capture now pays a page per cell, and the three cells are re-rendered to what their builders draw** (commit `19bf814`). Nothing about any builder, spec, camera or geometry changed — the same drawing, correctly rasterized. The r2 byte-identity proof still passes unchanged.

**One residual, left alone and flagged:** `s10-b3` differs from a fresh render by **69 pixels at max 20**, reproducibly, and the page-per-cell fix does not remove it. It is a Scene 10 cell, outside this session's scope; it is left at its approved bytes for Session 2 to run down.

# 5. Files changed

## New
| file | what |
|---|---|
| `docs/act-2-rail-impl-brief.md` · this report | the brief as placed, and the report |
| `src/scenes/.../_railWorld.js` | the rail world as persistent DOM, transcribed from the sheet's builders |
| `src/scenes/.../_railStates.js` | the 22 settled states of S5–S7, cell by cell |
| `review/batch-b-r2/harness/proof-rail-impl1.cjs` · `landed-proof-rail-impl1.json` | the landed-state proof — 18/18 at zero pixels |
| `review/batch-b-r2/harness/smoke-rail-impl1.cjs` · `smoke-rail-impl1.json` | the scene-contract smoke |
| `review/batch-b-r2/harness/capture-rail-impl1.cjs` · `strip/` (38 frames + index) · `strip-rail-impl1.json` | the capture strip, started |

## Modified
| file | what |
|---|---|
| `src/scenes/.../_architectureStage.js` | mounts the rail world; the S5–S7 states become the rail states; the rail's gesture helpers; the serializer reads the rail world; one harness affordance (`window.__act2.apply`) for the state Scene 6 carries past its last beat |
| `src/scenes/.../05`, `06`, `07` | the three scenes rewired onto the rail world |
| `src/scenes/.../08-money-becomes-information.js` | one line: the S7→S8 seam releases the rail on the same 800ms it recedes on everywhere else — a stopgap Session 2 replaces |
| `review/act-2/harness/capture-rail.cjs` | one page per cell; the approval record written into `states.json` |
| `review/act-2/rail/s7-b1.png` · `s7-b2.png` · `s7-b3.png` · `states.json` | the three corrected cells, and the approval |
| `docs/what-is-money-master.md` · `docs/act-2-staging-amendment.md` · `docs/act-2-rail-r2-report.md` · `docs/batch-b-package.md` | the two records |

**Out of scope, changed anyway: none.** No manifest change (the scenes hold their spliced positions), no engine feature change, no script change, no legacy file deletion, no Act I or Act III work, no design.

## Commits and tag

```
d5dfe7f  docs: the Act II rail implementation brief arrives
4d540a5  docs: record 1 - the r2 rail sheet is presenter-approved in full
95c0383  docs: record 2 - the act's gate criterion stands as amended, the rail's own continuity
19bf814  review(act-2): the capture renders one cell per page - three cells corrected
1e630dc  act 2: the rail world, transcribed from the approved sheet's builders
5104a9f  act 2: Scenes 5-7 rewired onto the shared rail world
c972110  review(act-2): the landed-state proof - 18/18 rail states at zero differing pixels
c9c4e43  act 2: drop two unused imports from the rewire
6193993  review(act-2): the scene-contract smoke - 22 states both ways, 6 boundaries, 22/22 parity
9144461  review(act-2): the capture strip started - 22 settled states and 16 gestures
```
Plus this report's commit. **Tag: `act-2-rail-impl-1`** at the report commit.

# 6. Validation

| check | result |
|---|---|
| **Landed-state proofs** | **18/18 at zero differing pixels**, three comparisons each (scene ↔ archived cell · fresh cell ↔ archived cell · scene ↔ fresh cell), mounted cold through the real engine in the spliced deck at 1920×1080. 0 console errors |
| **Per-scene smoke** | **PASS** — deck boots 39 slides in the spliced order; beat map 8 · 9 · 5; all 22 states traverse forward in order and back monotonically to the start; six boundaries land correctly in both directions; 22/22 cold direct entries; 0 console errors |
| **Reduced-motion parity** | **22/22 identical** — every cold entry under `prefers-reduced-motion` serializes exactly as the settled motion-on state, the rail world's station geometry, line extent and dependency arc included |
| `npm run build` | **clean** |
| **Boot smoke** | covered by the smoke's first check — 39 slides, `prologue:2 · act-1:3 · act-2:6 · function:8 · ideal-store:19 · close:1`, 0 console errors |
| **Capture strip** | **started** — 38 frames out of the film (22 settled states + 16 gestures) with an index, 0 console errors |
| **Commit granularity / tree / tag** | each record and each construction its own commit; the deck runs end to end at every one; tree clean at every stop; `act-2-rail-impl-1` cut |

**Notes status:** the scripts are unchanged and travel with their scenes as notes — no `[→]` moved. **Beats:** 22 states over 22 `[→]` marks, unchanged.

**Not covered by the pixel proof, by construction:** Scene 6's beats 3–7. The sheet carries those five cells byte-identical from the states sheet, so the approved cell is the overlay's content *without* the rail the deck holds beneath it — they cannot be compared to a cell that does not contain the rail. Their content is the legacy `ElementGrid`'s own waves, untouched, and the harness records the exclusion.

# 7. Flagged, not improvised

1. **Where Scene 6's beat 9 settles.** The amendment maps b9 as *"overlay: the mass state … the rail returns carrying it as GOLD's dependency note"*, and the sheet renders both moments — `s6-b9` and `s6-b9-return` — while recording that the return seam "is not itself a mapped beat". Both readings are of approved cells, so no design is at stake either way. **Implemented:** beat 9 settles on the overlay — the counted load is what the beat is about, and settling on the return would mean the approved overlay never settles on screen — and the return is the state Scene 7's morph launches from, the rail coming back before COINAGE arrives. It is one line in `_railStates.js` if you want it the other way.

2. **The claim's entry from Scene 4's world is retired with the disc.** Ruling r2.3 says the ClaimObject appears in no Act II rail beat and its thread resumes in Act III; your own review criterion is "no white ball anywhere". An entry gesture carrying the disc for three seconds would put one on screen. **Implemented:** Act II opens on the rail beginning — the line drawing in and SHELLS taking station one — which is the amendment's own S5 b1, in the legacy's own line-draw and stop-arrival vocabulary. This retires one continuity `AGENTS.md` §7 lists (Scene 4 → Scene 5, the saved claim becoming the through-line). Named because it is a real loss, ruled rather than chosen.

3. **A row's voice changes as a step inside the camera move, not as the legacy's 900ms colour tween.** The rail world bakes a row's voice into its colour exactly as the sheet does, so when a wound recedes from full voice to the dimmed-prior step it lands in one frame while the camera is travelling. The legacy transitions colour over 900ms. The camera motion covers it and no settled frame is affected; naming it because it is the one place the transcription is of a *value* rather than of a *transition*.

4. **The S7 → S8 seam is a stopgap.** Scene 7 now hands over a rail world and Scene 8 does not join it until Session 2, so the record is released on the same 800ms it recedes on everywhere else rather than cutting out under the dissolve. Session 2 replaces it with the LEDGER station's own arrival, which is where that dissolve actually belongs.

5. **`s10-b3` carries a 69-pixel residual** (§4) — outside this session's scope, left at its approved bytes, for Session 2.

# 8. The handoff to Session 2 — in plain English

**What is done.** Scenes 5, 6 and 7 are on the rail, in the film, proven frame for frame against the cells you approved. The rail world itself is finished and complete: all ten stations exist in it, including LEDGER and BITCOIN, and so do the pieces Session 2 needs — the deep dim, the recede-and-return, the dependency arc, and the one station that can ride outside the recession while everything else goes dark.

**What Session 2 does.** Scenes 8, 9 and 10 join the same world, and three things change from what is there today:

- **Scene 8 replaces the seam stopgap.** The LEDGER station arrives on the rail and the paper claim dissolves into it, instead of the rail being released and the study box taking over. The 1971 featured moment goes to the LEDGER station the way Zanzibar went to the shells; the chart overlay uses the same seam gesture the table already uses in Scene 6.
- **Scene 9 stages the network out of the LEDGER station** — the hub dissolving where the issuer stood, the mesh anchored there, and the coin taking its station beside it when the rail returns. The `lit` station mechanism is already built and unused; that beat is what it was built for.
- **Scene 10 reads the same completed rail as argument** — the pairs lighting station by station, palladium over the deep-dimmed record, the exit question over the receded one. No second strip: the strip Scene 10 used to draw is the rail it has been building for six scenes, so the legacy strip geometry retires with the legacy contender rail and the old per-beat compositions in the stage.

**Two things to carry in.** The `s10-b3` residual (§7.5) needs running down before Scene 10's proof can be clean. And the legacy compositions still mounted in the stage — the contender rail, the studies, the detachment photographs, the strip — are dead the moment Scenes 8–10 move, and deleting them is Session 2's, in the session that replaces them.

**Then the gate.** The act viewing, on the criterion recorded here: **the rail's own continuity** — history writing itself left to right, every arrival introduced by its own line, no white ball anywhere — forward at speaking pace, then backward, motion-on and reduced-motion. The word that closes the batch is yours.

# 9. Recommended next step

**Session 2: Scenes 8, 9 and 10 onto the same rail world, then the batch close and your act viewing.**
