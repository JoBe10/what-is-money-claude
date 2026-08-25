# Batch A — Gate 1 & Style Frames Session — Report
## Rulings recorded · the drop gated · the Claim Mark sheet · the ten frames — stills only

**Mode: FAST.** Scoped verification: the grade gate, the production build, a deck-boot smoke, and visual review of every sheet and still. No deck-wide suite; no scene implemented; nothing animates.
**Branch:** `film-rebuild`. **Tag:** `batch-a-frames`.
**Date:** 25 August 2026

---

# 1. Implemented

**The six Stage-0 flag rulings are recorded in the master** (`docs/what-is-money-master.md`, with a freeze-register row): the neutrality boundary is **before Act IV** (§3.2); the acceptance test runs **before Scene 23** (§3.6); the claim ladder is **replaced by the enlargement sequence** Scenes 3 → 7 → 15 → 16 (§3.3); **D9 is restated as progressive enlargement landing as recognition at the return**, Scene 16 (§4); the one-term allocations are **Act I the double coincidence of wants, Act II none, Act III base money** (§3.4); the accent's entry point is **the Claim Mark's birth in Scene 3**, with the Prologue **monochrome plus photographic warmth** (§8.5).

**The Batch A dark-field drop is gated and ingested.** The full register ran through the R7.2 gate — 22 images, 110 checks, one failure. Six of the seven presenter-generated renders pass all five clauses and ship: `single_cowrie` · `gold_certificate` · `vault` · `ledger_glow` · `palladium` · `coffee_cup`. **`patient` is held in `incoming/`** — top-left corner 64.73 against a limit of 6 (the key light's shaft is in frame; the surgeon's failure class from R7.2). All fifteen library renders re-verified passing. Measured framing rows for the six new subjects entered `src/dark-field.js`; the manifest records the drop, the duplication-by-design, and the hold. **Where subjects duplicate, every passing variant ships and appears on the sheets — nothing was chosen.**

**Prototype Gate 1 — the Claim Mark contact sheet** (`review/frames-a/gate-1-claim-mark/`). Three candidates behind one API in `src/proto/claim-mark.js` — **A** the current ClaimObject disc, verbatim; **B** the blueprint's billet (2.8:1, chamfered ends, thin bright top edge, no symbol); **C** the ultra-minimal flat hexagon — each rendered in the five contexts (birth from the path · spend/save · inside a carrier · the 100-year journey · the marginal decision) at three scales (48/116/176), plus a mid-transfer behavior still per candidate. 48 cells; candidates are area-matched per scale so the sheet compares form, not weight; `CLAIM_MARK_SELECTION` is `null` until the presenter rules, and recording the ruling is one letter.

**The ten style frames** (`review/frames-a/frames/`, 24 stills + the batch's one contact sheet). Every frame 1920×1080, real assets through the register, real type through the deck's classes and tokens, settled states only. Frames without the mark rendered once; frames containing it (S3-F1, S3-F2, S4-F2) in all three candidates; **S3-F1 in three compositional attempts** (the centered contraction · in the scene · display low-center); P2-F1 in both spec'd options (with and without the hours-field ghost); S2-F1 in both patient options (photographic — annotated HELD — and the restrained mark).

**The register sheet** (`review/frames-a/register/`): the new arrivals beside the library with the duplicated subjects in every passing study — cowrie ×3, ledger ×2, note ×2 — for the presenter's scene-assignment rulings.

# 2. Files changed

| Commit | Change |
|---|---|
| `059c12f` | docs(master): record the six Stage-0 flag rulings |
| `01bd216` | assets(dark-field): grade-gate the Batch A drop and ingest the six passes |
| `4881792` | feat(dark-field): measured framing rows for the six Batch A subjects |
| `a1883a8` | docs(dark-field): record the Batch A drop — six ingested, patient held |
| `db25bf3` | proto(claim-mark): the three Gate 1 candidates behind one API |
| `5668b03` | review(frames-a): render the Prototype Gate 1 contact sheet |
| `7f29515` | review(frames-a): the Batch A style-frame compositions and their capture harness |
| `aa1bed9` | review(frames-a): render the ten style frames — 24 stills and the batch sheet |
| `d7374bd` | review(frames-a): the register sheet and the boot smoke |

Plus this report and the tag `batch-a-frames`. **No slide, scene, manifest or engine file changed.** The only `src/` changes are the framing rows (`src/dark-field.js`) and the new prototype module (`src/proto/claim-mark.js`, imported by nothing in the deck). No out-of-scope changes. One operational note: the ingest harness re-runs the gate into R7.2's evidence file as a side effect; that file was restored from git afterward, and this session's runs are filed under `review/frames-a/harness/` (the R7.3 `--out` amendment).

# 3. Validation

| Check | Result |
|---|---|
| grade gate, full register (pre-ingest) | 22 images, 110 checks, **1 failure** (`patient`, held) |
| grade gate, shipping set (post-ingest) | 21 integrated images, all passing |
| `npm run build` | clean |
| deck boot (dev server, Playwright) | 45 slides, first `1-01-eighty-thousand-hours`, **0 console errors** |
| Gate 1 sheet capture | 48 cells, 0 console errors |
| style-frame captures | 24 stills, 0 console errors |
| register sheet capture | 10 surfaces, none missing, 0 console errors |

Two sheet defects were caught in visual review and re-cut before the deliverable commits: candidate B's first cut read as an octagonal pill with an invisible bright edge (chamfer shallowed, face graded deeper, glow calmed), and S3-F1's first arcs read as a parenthesis (attempt 1) and a signal glyph (attempt 3) — attempt 1 now uses shrinking fragments alone, attempt 3 staggered non-concentric arcs. The presenter's own dev server on port 5173 (the sibling checkout) was left untouched; this session ran its own on 5273.

FAST scope: no traversal suites, no direct-entry matrix, no register/brightness audits — the deck's slides did not change. The archived R3/R4 harness breakage noted at Stage 0 still stands for the GATE.

# 4. Flagged, not improvised

1. **`patient` held at the gate** (corner 64.73 / 6). The S2-F1 photographic option renders it from the drop zone with *HELD* annotated on the frame itself; it ships nowhere. Waiting on an R7.4-class corner regrade or a regeneration from manifest §5.7.
2. **`fiat` still missing** (pre-existing, manifest §3.0). No Batch A frame needs it, but the §5 clause that `gold_certificate` be "visually distinct from the fiat note" can only be finally confirmed against a landed `fiat` render.
3. **The Gate 1 selection is open.** `CLAIM_MARK_SELECTION` is null; prototypes render candidates only. The hours-field unit style tuning (and any P1-F1 re-render it triggers) waits on the ruling.
4. **All ten frames await presenter markup.** Nothing animates until the frames are approved; Prototype Gate 2 (Scenes 2–4 in the scratch route) waits behind that approval.
5. **Duplicate-subject scene assignments** — which cowrie/ledger/note study serves which scene — are on the register sheet for ruling, not chosen.
6. **A visual note for the markup pass:** at S4-F1's 380px box the `wine` render's frame edge is faintly separable from stage black on a bright display (its corners measure 2.28, within the gate's 6). Judgment, not a gate failure.

# 5. Remaining judgment calls

- **Prototype Gate 1** — the selection (A / B / C) on `review/frames-a/gate-1-claim-mark/contact-sheet.png`.
- **The frames markup** — including the two option pairs: P2-F1 with or without the hours ghost; S2-F1 photographic patient vs restrained mark.
- **S3-F1's compositional attempt** — the film's signature image; three attempts on the sheet.
- **The register rulings** — cowrie / ledger / note study per scene.

# 6. Recommended next step

**The presenter rules Prototype Gate 1 and marks up the frame sheet** (`review/frames-a/frames/contact-sheet.png`) — the selection is one letter in `src/proto/claim-mark.js`, and approved frames unlock Prototype Gate 2, the Scenes 2–4 scratch route.
