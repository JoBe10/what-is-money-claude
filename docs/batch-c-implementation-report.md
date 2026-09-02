# Batch C Implementation — Report (Session 2, the batch close)
## Scenes 14–15 built, the act spliced into the film, and every settled state its approved cell — the batch closes on the presenter's viewing

**Mode: FAST.** Scoped verification per the brief §3: the landed-state proofs (10/10 for the new scenes, 25/25 across the act through the spliced deck), the full deck traversal both ways with the boundaries walked in both directions, cold entry and reduced-motion parity at every new build, the static gates (notes, self-reference, splice), the eleven-question scene test with honest verdicts, the completed capture strip, the production build. No deck-wide register/brightness/composition audits — those are the GATE's, before the recording merge.
**Branch:** `film-rebuild`. **Prior tag:** `act-3-impl-1`. **Tag:** `batch-c`.
**Date:** 2 September 2026.

---

# 1. The act-viewing protocol — the gate, in plain English

**The batch is built and proven; the word that closes it is yours, at the act viewing.** Run the deck from Scene 11 — the deep link is `?slide=three-familiar-jobs` — at speaking pace, forward the whole act, then backward; once with motion on, once under reduced motion. The act's own questions, one per scene:

1. **Does the triad feel like home base?** The disc returns at the first beat and holds the center as the jobs radiate; the act keeps returning to this frame.
2. **Does the ladder climb?** The neutral marks arrive with their stations, the thresholds light as their logic is stated, and the foundation takes the act's first orange.
3. **Does the coffee objection die on screen the moment the coin lands at stage two?** The timing is built to protect that landing: the coffee recedes and is answered *before* the coin arrives — alone, the only monetary object on the ladder.
4. **Does the tower's shape argue before a word is spoken?** Candidate A, your selection: wide and faint above, narrow and solid beneath.
5. **Does the held question hold?** Every line of copy clears; the bottom-most claim line reaches into black and dissolves; no disc — the question lives in your spoken word.

Two seams are yours to judge on the same walk: the splice seams (S10 → S11, and S15 → the surviving legacy deck at `3-00-waypoint-function`), reported rather than smoothed. A disappointing seam is one ruled iteration against the pinned states.

# 2. Implemented

**Scene 14 — The Coffee Objection** (4 beats): the coffee study at display scale over the condensed home row (s14-b1, the thrice-carried r1 cell); the ladder returning in `3-07`'s own resolved state with the coffee placed at the MEDIUM OF EXCHANGE berth; **the payoff with its timing protected** — the coffee recedes first, then the coin arrives alone at stage two, nothing else moving while it lands; the pivot to the whole triad, STORE at full voice, the hinge question beneath.

**Scene 15 — The Tower, candidate A in motion**: the descending reveal — each slab landing beneath the last with the legacy slab's own settle-down gesture, width and solidity per the approved cells; **the shiver transcribed value for value from `3-06`'s proven choreography over the A geometry** (the base's 460ms flicker to 0.42/0.88; the shudder climbing through deposits at 220ms and apps at 380ms, +2.5/−1.5/+0.8 over 620ms); the scoping recede as the legacy foundation's own 900ms color transitions on the A properties; the held question over the composition as approved — **no disc**.

**The splice**: Scenes 11–15 enter the deck as one contiguous world after Act II, in place of the five legacy slides the ruled provenance map names:

| scene | supersedes |
|---|---|
| 11 Three Familiar Jobs | `3-01-the-three-functions` |
| 12 We Already Split Those Jobs | `3-02-the-functions-separate` |
| 13 The Order of Monetization | `3-03-the-order-of-monetization` |
| 14 The Coffee Objection | `3-07-where-bitcoin-is` |
| 15 The Tower | `3-06-what-your-money-is` |

**Three legacy slides survive with ambiguous fates — flagged, never decided**: the two waypoint interstitials (`3-00-waypoint-function`, `3-08-waypoint-judge`) and `3-04-stage-signatures`. They stay in the deck after the act in their legacy relative order, files on disk, their entry in the manifest carrying the flag in plain English. Retiring or re-homing them is your ruling to make — the waypoint device is on the architecture's what-dies list, but no batch has been ordered to retire these two, and 3-04's bracket content (spoken inside Scene 13's script) has no named fate. **Old and new counts: the deck was 39 slides and is 39 slides — five legacy slides out, five scenes in; the function section drops from eight to three.**

The act-3 prototypes left `src/proto/registry.js` at the splice, per that file's own rule; the scenes README's stale Scene 13 name was brought current with the LADDER amendment.

# 3. Files changed

## New
| file | what |
|---|---|
| `src/scenes/act-3-the-jobs-of-money/14-…js`, `15-…js` | Scenes 14–15 |
| `docs/batch-c-implementation-report.md` | this report |
| `review/batch-c/harness/proof-impl2-scenes.cjs`, `proof-batch-c.cjs`, `smoke-batch-c.cjs`, `static-gates.cjs`, `capture-strip-batch-c.cjs` | the Session 2 and batch harnesses |
| `review/batch-c/landed-proof-impl2.json`, `landed-proof-batch-c.json`, `smoke-batch-c.json`, `static-gates.json` | the evidence |

## Modified
| file | what |
|---|---|
| `src/scenes/act-3-the-jobs-of-money/_jobsStage.js` | the S14/S15 elements and states (the berths, the study, the row, the statement slot, the A tower), the resolved ladder state, the hardened clear-list (§5's note) |
| `src/slides/manifest.js` | the Batch C splice block with the mapping table and the flagged survivors; the act-3 section |
| `src/proto/registry.js` | the act-3 entries leave at the splice |
| `src/scenes/README.md` | Scene 13's name brought current with the LADDER amendment |
| `review/batch-c/harness/install-scripts.cjs` | S14/S15 join the installer |
| `review/batch-c/strip/` | the strip re-cut complete: the act through the spliced deck |

**Out of scope, changed anyway: none.** No engine change, no legacy edit, no script change, no Act II or Act IV work.

## Commits and tag
```
f6b8582  scenes(act-3): Scene 14 — the objection dies as the coin lands alone at stage two
235bc5e  scenes(act-3): Scene 15 — candidate A descends to the held question, no disc
6dbb470  review(batch-c): the S14–S15 landed proof — 10/10 at zero pixels
3eae129  splice(act-3): Scenes 11–15 enter the deck — five out, three ambiguous fates flagged and kept
a158fed  review(batch-c): the batch landed proof — 25/25 through the spliced deck
dfedcc9  review(batch-c): the batch smoke — 194 states forward exact, parity 25/25
2289b89  review(batch-c): the static gates — 11/11
c50d0a6  review(batch-c): the capture strip completed
```
Plus this report. **Tag: `batch-c`** at the report commit.

# 4. Validation

| check | result |
|---|---|
| **Landed proof, Session 2 scenes** | **10/10 at zero differing pixels** (S14 against s14-b1…b4; S15 against the six candidate-A cells), three comparisons each, through the scratch route pre-splice |
| **Landed proof, the batch** | **25/25 at zero differing pixels** — every settled state of Scenes 11–15 mounted cold through the real engine **at its deck position in the spliced 39-slide deck**, three comparisons each |
| **Smoke** | deck boots 39 slides, the act at index 11 · **full deck traversal: 194 states forward exact, backward monotonic to the top** · the splice seams and all four in-act boundaries walked both directions, landings recorded · **25 cold entries settled** · **reduced-motion parity 25/25** by serialization · **0 console errors** across every run |
| **Static gates** | **11/11** — beats 5·4·6·4·6 = 25; scripts verbatim to the package character-for-character (S13's notes-only armor included); the self-reference ban clean over 26 scene files; the retired-wording and absolute-number sweeps clean (armor vocabulary confined to the armor); the splice proven — 8/8 legacy files on disk, 5/5 superseded out of the manifest, 3/3 survivors kept and flagged |
| **Capture strip** | **completed: 25 settled states + 25 gestures mid-flight**, the act entered across the splice seam from Scene 10's end, through the spliced deck (`review/batch-c/strip/`) |
| `npm run build` | clean |
| **Commit granularity / tree** | each scene, the splice, and each proof its own commit; the tree clean at every stop |

**Not run, and not claimed:** the deck-wide register/brightness/composition audits, the frozen-data and freeze-check suites, the second-window notes check — the GATE's, before the recording merge. FAST verifies the batch locally; the global guarantees are re-established there.

# 5. Flagged, not improvised

1. **The three ambiguous-fate survivors** (3-00, 3-04, 3-08) stand in the deck after the act — kept, flagged in the manifest's own record, never decided. The seam S15 → 3-00 is the deck's one narratively odd moment (a "function" waypoint after the act it once introduced); it is reported here, not smoothed, and it is one ruling to retire or re-home them.
2. **The backward splice-seam landings are the engine's standard**: retreating across a scene-group boundary lands at the previous slide's build 0 (S11 b0 → S10 b0; 3-00 b0 → S15 b0), exactly as every group boundary in the shipped deck behaves since Batch A; within the act, backward handoffs land on the previous scene's end state, as the smoke's boundary table records.
3. **The S13 → S14 and S14 → S15 boundaries are judgments from the paradigm rule**: the ladder world clearing to the coffee study (a cut — the question changes to the objection), and the triad clearing to the tower (the morph through the STORE corner). With Session 1's two, all four in-act boundary judgments are yours at the viewing.
4. **The shiver's caption shudder rides GSAP's `yPercent`** so the link captions keep their centring while they tremble — the one wiring nuance in the transcription, recorded in the scene file at the site.
5. **Session 1's clear-list gap, fixed here**: the S11→S12 morph's continuity fade could leave an inline opacity that shadowed the dataset reveal on a later backward walk; the stage now kills and clears every element any gesture touches. Caught building Session 2, covered by the batch smoke's full backward traversal.
6. **The scene test's two honest tensions** (§6): S13's in-act cut, and S15's spoken-only held question — both designed, both approved, both named rather than silently passed.

# 6. The eleven-question scene test — verdicts per scene

Questions 10 and 11 pass **by construction** for every scene: every settled state is a presenter-approved cell at zero differing pixels (the batch landed proof), so the stills are the stills he approved. Question 8 carries the act's accent law: orange enters Act III at the ladder's foundation beat and returns at the tower's scoping — semantic both times.

| # | question | S11 | S12 | S13 | S14 | S15 |
|---|---|---|---|---|---|---|
| 1 | subject in one second | pass | pass | pass | pass | pass |
| 2 | explains, not decorates | pass | pass | pass | pass | pass |
| 3 | less text possible | pass | pass | pass | pass | pass |
| 4 | discovery over telling | pass | pass | pass | pass | pass |
| 5 | different because the idea is | pass | pass | pass | pass | pass |
| 6 | previous visual transforms naturally | pass | pass | **tension** | pass | pass |
| 7 | creates the next question | pass | pass | pass | pass | pass |
| 8 | orange semantic | null-pass | null-pass | pass | null-pass | pass |
| 9 | survives without notes | pass | pass | pass | pass | **tension** |
| 10 | world-class still | by construction | by construction | by construction | by construction | by construction |
| 11 | key frame intentional | by construction | by construction | by construction | by construction | by construction |

**The two tensions, in one line each, for your eye — designed, not defects:**
- **S13 q6:** the entry is an authored cut (the split clears, the empty line enters) rather than a transform — judged from the paradigm rule because the question changes ("is there an order?" → the order); if the seam reads abrupt at the viewing, it is one ruled iteration.
- **S15 q9:** the held-question beat deliberately puts nothing on screen but the drop line — the question lives in the spoken word, `3-06`'s own proven choice, approved at r2 and carried by candidate A; without the notes a viewer sees intentional mystery, not a stated question. That is the design; it is named here because the test asks honestly.

Notes on the null-passes: S11, S12 and S14 carry no accent by the act's own law (the accent enters at the foundation beat and returns at the tower) — absence is the semantic discipline. S11's q6: the act opens on a group boundary from Scene 10; the disc's return *is* the transform, and the seam is on the viewing's walk.

# 7. Remaining judgment calls — all yours, all at the viewing

- **The act viewing closes the batch** (§1's protocol) — the five scene questions, the four in-act boundaries, the two splice seams.
- **The three survivors' fates** (3-00, 3-04, 3-08) — retire, re-home, or leave for the GATE.
- Everything Session 1 flagged and this session carried: the composed S12 household→Argentina seam, the berth readings, the word-pass items standing since r1 (the "jobs"/"functions" pairs, the household words, the distilled landing lines).

# 8. Recommended next step

**The act viewing.** Run the deck from Scene 11 at speaking pace, forward and backward, motion-on and reduced-motion, and return the word. On it, Batch C closes — and Act IV's kickoff (Scene 16, the return to the open exchange, where the disc the act kept at its center becomes the claim on value) is the next construction.
