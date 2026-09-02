# Batch C r2 — Report
## Five presenter rulings executed on the live acts: the clean handoff, the columns' objects, the seven-beat ladder reveal, the coffee folded onto the ladder, the network forming exactly once

**Mode: FAST — lean scope.** Exactly the brief §4's verification list ran, and nothing more: the gate evidence for the two renders, the per-cell checks on the re-rendered cells, the landed-state proofs on the rewired scenes, byte-identity on untouched states, the two span traversals both ways, reduced-motion parity on the changed scenes, the production build, the boot smoke, granularity, the tag, this report. No deck-wide audits — those are the GATE's.
**Branch:** `film-rebuild`. **Prior tag:** `batch-c`. **Tag:** `batch-c-r2`.
**Date:** 2 September 2026.

---

# 1. The review protocol — the re-walk, in plain English

**The rulings are executed and proven; the word that closes the batch is yours, at the re-walk.** Open the deck and walk **Scene 9 and Scenes 11 through 15**, forward at speaking pace and then backward, once with motion on and once under reduced motion. The deep links are `?slide=scarcity-becomes-digital` for Scene 9 and `?slide=three-familiar-jobs` for the act. What each ruling asks your eye to confirm:

1. **Scene 9 — does the network form exactly once?** Entering the scene, the first thing you see of the network is the hub with its spokes — the institution — and then the center steps away as the peer-to-peer chords come in. The completed mesh never flashes up ahead of that. Walking backward from the Bitcoin beat, the formed mesh is simply *there*, instantly — no replay, no flash.
2. **Scene 12 — is the handoff clean?** The triad finishes leaving before PRICED IN / PAID IN / SAVED IN land; the columns stand on black with nothing beneath them. And when Argentina lands, the columns carry their objects: the folded dollar over the priced-in column, the peso note over the paid-in column, the dollar and the house over the saved-in column — the notes recognizably the dollar and the peso, as you ruled it.
3. **Scene 13 — does the ladder now reveal stage by stage?** Medium of exchange lands with "Nobody accepts as payment what they don't expect to hold value." — alone, the fourth threshold still dim. Then unit of account lands with "Nobody writes contracts in what nobody accepts." Then the foundation, exactly as before.
4. **Scene 14 — does the objection live and die on the ladder?** No cut to a standalone coffee frame: the ladder never leaves, the coffee cup arrives at its berth as the objection line lands, the placement line answers it, and the coin still lands alone at stage two with nothing else moving.
5. The **S13 → S14 boundary** is now a pure morph — one world. Judge whether it reads that way at speaking pace.

The word you return closes the batch.

# 2. The rulings, recorded and executed

All five recorded first in master §13, each as its own commit, before anything was touched:

1. **The clean handoff** — s12-b1 re-rendered with the triad gone; the morph completes the recede before the heads land; the cell left the disc-cell record.
2. **The columns' objects** — `usd` and `ars` gated and ingested through the standard harness (2 images, 10 checks, 0 failures; the shipping set re-proven at 31 images / 155 checks / 0 failures). **The recognizability exception is recorded** in master §13 and the dark-field manifest: the `fiat` study's no-specific-currency rule does not govern these two — recognizability is their content. **The real-estate render was located in the register: `property`** (`assets/dark-field/property.png`, a house on black) — no stub, nothing pending. The renders land at the band scale above the codes; the brick glyph retired to file.
3. **The S13 split** — the frozen map amended (S13 = 7, Act III = 26), one `[→]` inserted in the package's gate paragraph at zero word changes, and the split lands as a **restoration of legacy `3-03`'s own state table**: the MOE beat is the legacy build 4 (g3 dim, gate line one alone), the UOA beat is build 5. The foundation renumbered to b7 with its look unchanged; the notes re-installed mechanically at 7 arrows, 5/5 scripts verbatim to the package.
4. **The S14 fold** — the standalone study frame retired to file (`s14-b1-study`, its r1 bytes carried into the retired name, sha-proven); all four beats staged continuously on the ladder; the coin still lands alone at stage two; the S13 → S14 boundary a pure morph.
5. **The S9 defect fix** — the entry had painted the completed mesh for the camera's opening move before resetting it to play the formation. The mesh now initializes hidden in the same timeline tick as the first paint: the overlay enters empty, the institutional shape stands first, and the formation is the network's only appearance. The settled state is untouched — s9-b1 proven at zero pixels.

# 3. Files changed

| file | what |
|---|---|
| `docs/what-is-money-master.md` | five §13 rows — the rulings recorded first |
| `docs/batch-c-package.md` | §1 map amendment (S13 = 7 · 26 beats); §2 the ruled `[→]` insertion |
| `docs/act-3-provenance.md` | S13-F1 (b1–b7) and S14-F1 (the fold) amendment annotations |
| `docs/dark-field-manifest.md` | the Batch C r2 drop — the two notes, the recognizability exception, shipping 31 |
| `assets/dark-field/usd.png` · `ars.png` | the presenter's notes, through the gate |
| `src/dark-field.js` | the two framing rows; the near-16:9 family note |
| `src/styles/slides.css` | the order overlay's foundation settle extended to step 7 (legacy step 6 untouched — the legacy slide never reaches 7) |
| `review/act-3/harness/states.mjs`, `capture-states.cjs`, `check-cells.cjs` | the r2 pipeline — builders, record cutter, per-cell checks |
| `review/act-3/states/` | 7 cells re-captured; `s13-b5-pair` and `s14-b1-study` retired to file; `s13-b6` → `s13-b7` renumbered bytes-carried; sheet + states.json re-cut |
| `src/scenes/act-2-the-architecture-of-money/_architectureStage.js`, `09-…js` | `railMesh` gains `initAt`; the entry initializes the mesh hidden at the first paint |
| `src/scenes/act-3-the-jobs-of-money/_jobsStage.js`, `12-…js`, `13-…js`, `14-…js` | the S12 staging, the S13 seven beats, the S14 fold; the study world removed from the stage |
| `review/act-3/grade-notes-drop.json`, `grade-shipping-set-r2-notes.json` | the gate evidence |
| `review/batch-c-r2/` | the r2 proof and smoke harnesses and their evidence |
| `docs/batch-c-r2-brief.md`, this report | the session record |

**Out of scope, changed anyway: none.** No other scene, no Act I/IV work, no script wording beyond the ruled insertion, no legacy deletion (the retired stagings are on file; the brick glyph stays in the icon grammar).

## Commits and tag

```
e3212b3  docs: the batch-c-r2 brief
c98d3a2  record(r2 ruling 1)  the clean handoff
76e5fb8  record(r2 ruling 2)  the columns' objects + the recognizability exception
5113977  record(r2 ruling 3)  the S13 map amendment
c68b4f0  record(r2 ruling 4)  the S14 fold
6a0424d  record(r2 ruling 5)  the network forms exactly once
9baaf27  assets(dark-field)   usd · ars gated and ingested
b131aa4  cells(act-3)         the r2 re-render — 23/23 cell checks green
fcb38a0  scenes(act-2)        Scene 9 — forms exactly once
d0376ca  scenes(act-3)        Scene 12 — the clean handoff, the objects
2135dc7  scenes(act-3)        Scene 13 — the split at seven beats
38e2e82  scenes(act-3)        Scene 14 — the fold
3bebcf0  review(batch-c-r2)   the landed proof — 16/16 at zero pixels
66d1ddf  review(batch-c-r2)   the smoke — spans, forms-once, parity
```
Plus this report. **Tag: `batch-c-r2`** at the report commit.

# 4. Validation (the brief §4's list, and nothing more)

| check | result |
|---|---|
| **Gate evidence, the two renders** | `grade-notes-drop.json`: **2 images, 10 checks, 0 failures, both ingested, 0 held**; post-ingest shipping set **31 / 155 / 0** |
| **Per-cell checks, re-rendered cells** | `check-cells.cjs`: **23/23 green** — 32 cells measured (corner/border/content/size), map agreement, 26-beat coverage, the thread, the neutral marks, the retired bytes sha-proven |
| **Landed proof, the rewired scenes** | **16/16 at zero differing pixels** — S12 b1–b4, S13 b1–b7, S14 b1–b4, S9 b1, each mounted cold at its deck position in the spliced 39-slide deck, three comparisons each; **s9-b1 proves the gesture fix moved nothing settled, s13-b7 proves the renumbering is pure** |
| **Byte-identity, untouched states** | 35 of 38 cell PNGs byte-identical through the session (only s12-b1/b3/b4 changed; s13-b5/b6/s14-b1 are new captures); **s12-b2 re-rendered through the pipeline and came out byte-identical**; the retired study carries its r1 bytes, sha-proven |
| **Traversals** | **S11→S15: forward exact through 26 states, backward monotonic to S11 b0 · S8→S10: forward exact through 15 states, backward monotonic to S8 b0** |
| **The forms-once probe** | entering S9 with motion on: **chord opacity 0.00 at every sample through the pre-formation window** (0.3s–2.7s), the hub standing before any chord, the formed mesh the settled state; **backward b1→b0: chords at 1.00 at every sample — no replay, no flash** |
| **Reduced-motion parity, changed scenes** | **20/20 identical serializations** — S12 (4), S13 (7), S14 (4) by `__act3`, S9 (5) by `__act2` |
| `npm run build` | clean |
| **Boot smoke** | the deck boots **39 slides** (the fold changes no slide count), the act at index 11, Scene 13 at its seven beats, **0 console errors across every run** |
| **Granularity / tree / tag** | each ruling's record, the ingest, the re-render, each scene, and each proof its own commit; the tree clean at every stop; tag `batch-c-r2` |

**Not run, and not claimed:** the deck-wide register/brightness/composition audits, the frozen-data and freeze-check suites, the full-deck traversal, the capture strip, the second-window notes check — the GATE's, before the recording merge.

# 5. Flagged, not improvised

1. **The band's elevation at Scene 12 (wiring, flagged on s12-b3).** Your ruling names the objects and the band scale but not the band's elevation or the pair's gap. Directly above the codes, the column heads and the kicker stand in the way at 188, so the objects ride the columns' clear sky on one shared baseline — box bottoms 64px above the heads' top (the act's own band clearance), the saved pair at the marks row's own 26px gap. **The real-estate render is square, so its box fills the band's full height and its top edge runs 16px above the title-safe line.** One number (the baseline, or a smaller cap for the pair) re-places everything. A related reading for your eye: under the equal-weight band law each render fits its own aspect inside the shared box, so the square house carries more area than the wide notes beside it — that is the law's own recorded behavior, named here so the re-walk judges it knowingly.
2. **The objection's register at Scene 14 b1 (wiring, flagged on s14-b1).** The ruling names the statement line but not its register: the objection lands in the deck's statement slot at the scene's own landing register (top 850, 40px — the slot the b2 placement line then takes), so the two lines hand off in place. One number or one word re-registers it.
3. **The arrival lines' voice at the gate beats (wiring, flagged on s13-b5).** The split restores the legacy state table verbatim; the one reading is the arrival lines' voice — the sheet keeps the approved pair beat's treatment (every arrival line at the dimmed row step, the gate line carrying the beat's voice). One word makes the MOE line the latest instead.

# 6. Remaining judgment calls

- **The re-walk closes the batch** (§1's protocol) — the five confirmations, and the three wiring flags above.
- Everything the batch-c report left standing and this session does not touch: the three ambiguous-fate survivors (3-00, 3-04, 3-08), the word-pass items (the "jobs"/"functions" pairs, the household words, the distilled landing lines), and the S14 → S15 authored cut (the S13 → S14 cut is superseded by the fold; the S14 → S15 judgment stands for the viewing).
- What FAST deferred to the GATE: the deck-wide audits named in §4's last row.

# 7. Recommended next step

**The re-walk.** Scenes 9 and 11–15 in the deck, forward and backward, motion-on and reduced-motion — the network forming once, the clean handoff, the columns carrying their objects, the ladder revealing stage by stage, the objection living and dying on the ladder — and the word that closes Batch C r2.
