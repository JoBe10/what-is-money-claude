# Act II Rail Implementation — Session 2 · The Batch Close
## Scenes 8, 9 and 10 rewired; Act II is one continuous record

**Mode: FAST.** The verification is the brief's §3 list, run in full.
**Branch:** `film-rebuild`. **Prior tag:** `act-2-rail-impl-1`. **Tag:** `batch-b-r2`.
**Date:** 1 September 2026.

---

# 1. The headline

**Act II is one world from Scene 5 to Scene 10, and every settled state of it is your approved cell at zero differing pixels — 33 of 33, with 0 console errors.** The record begins at the left edge, grows rightward through ten stations, and never leaves the screen. The mesh forms out of the LEDGER station where the issuer stood. Scene 10 draws nothing of its own — it reads the same rail again as an argument. There is no claim disc anywhere in the act.

# 2. Implemented

**Scene 8 — the dissolve, restaged.** The ported dissolve was a crossfade inside a study box: the paper claim becoming the glowing ledger entry. On the rail the record says the same sentence more exactly. The certificate's **dependency arc releases** — the one thing on screen asserting that the paper still owes gold — on the register's own 520 ms with the outgoing form let go 180 ms late, the exact mechanism `.p1-form` ships; the note it carried gives way to the named trade in the station's own rows; and LEDGER rises to the right of it. The claim stops being a thing and becomes an entry. Then 1971 lands at the LEDGER station in the ship's own dated-fact treatment, with gold and its claim dimming together — captured, not beaten; the ported chart rises over the deep-dimmed record; and the rail returns with the residue as the ledger's own dependency row before the wound is named over it.

**Scene 9 — the mesh forms out of the LEDGER station.** The record recedes to the legacy's deep dim, **that station alone stays lit** — the issuer the act has just watched fail — and its hub dissolves into the ring, the mesh anchored exactly where the ledger stood. The approved geometry is unchanged in every line, chord and voice; only where it stands has moved, and where it stands is the whole argument. The formation is the batch's own, transcribed move for move: the institutional shape stands first, then the centre steps away while the peer-to-peer chords come in over it. Then the rail returns and BITCOIN takes its station **beside** it, with the facts, the three capabilities and the honest limitation landing as station annotations rather than in mid-air.

**Scene 10 — no second strip.** The scene draws nothing of its own now. It reads the same rail, ten stations wide, and the recapitulation is a **re-lighting**: the pairs land station by station along the four architecture stops, in the wound row's own 900 ms. The history line lands *on* the complete record rather than over a receded one. Palladium stands against the record deep-dimmed rather than clearing it, because the bar is being held up against the history it has to clear. The exit question lands over the receded rail. The claim's walk along the strip is gone with the claim (r2.3).

**Two things the rail world gained.** The **mesh** — the approved `s9-b1-a` geometry in its own layer over the record, anchored at the station it forms out of and drawn at the rail's own scale. And **a station's mark and rows part company**, which is load-bearing: when a station is lit it rides outside the recession, but only its render and its name do. Its rows stay down in the record, because they *are* the record. One wrapper carrying both lit the ledger's own gain and dependency at the exact moment the act is showing them failing — the proof caught it at `s9-b1`, 1068 pixels of it.

**Narrative decisions preserved.** Every script is untouched, verified character for character against tag `batch-b`. The beat map stands at 8 · 9 · 5 · 5 · 5 · 5 = 37, one `[→]` each. The elimination still runs at the legacy pacing. The chart's frozen data and the palladium frame's real figures are ported unchanged.

# 3. Files changed

## New
| file | what |
|---|---|
| this report | the batch close |
| `review/batch-b-r2/harness/proof-rail-batch.cjs` · `landed-proof-batch.json` | the batch landed-state proof — 33/33 |
| `review/batch-b-r2/harness/smoke-batch.cjs` · `smoke-batch.json` | the batch smoke — traversal, boundaries, cold entry, parity |
| `review/batch-b-r2/harness/capture-batch.cjs` · `strip/` (65 frames + index) · `strip-batch.json` | the completed capture strip |
| `review/batch-b-r2/harness/scan-batch.cjs` · `scan-batch.json` | the notes and self-reference scans |

## Modified
| file | what |
|---|---|
| `src/scenes/.../_railWorld.js` | the mesh; the station's mark/rows split |
| `src/scenes/.../_railStates.js` | the settled states of Scenes 8–10, cell by cell; the severance specimen and the entrant's rows |
| `src/scenes/.../_architectureStage.js` | `STATES` is the rail world for all six scenes; `railMesh`; the landing pool at five for Scene 9's entrant beats; the serializer reads the mesh |
| `src/scenes/.../08`, `09`, `10` | the three scenes rewired, spliced around their notes so the scripts could not be touched |

**Out of scope, changed anyway: none.** No manifest change (the scenes hold their spliced positions), no engine feature change, no script change, no legacy file deletion, no design, no Act I or Act III work.

**Owed and not done, deliberately.** The legacy compositions the rewire made unreachable — the contender rail mount, the study boxes, the detachment photographs, the free-standing entrant block, Scene 10's strip geometry, the old network — are still mounted in the stage, hidden. Session 1's handoff said Session 2 would delete them; the brief's §4 says *no legacy file deletion* in either session, and a ~400-line removal touching the file that carries 33 zero-pixel proofs is not a thing to do in the same session that lands them. It is named here as the first cleanup after the act viewing.

## Commits and tag

```
48ce9d1  act 2: Scenes 8-10 rewired onto the rail - the act is one world
4ec1aa6  review(act-2): the batch landed-state proof - 33/33 of Act II at zero differing pixels
0649d2e  review(act-2): the batch smoke - 37 states both ways, 14 boundaries, 37/37 parity
f677321  review(act-2): the capture strip completed - 37 settled states and 28 gestures
e796754  review(act-2): the notes and self-reference scans - scripts byte-identical, 0 hits
```
Plus this report's commit. **Tag: `batch-b-r2`** at the report commit.

# 4. Validation

| check | result |
|---|---|
| **Landed-state proofs** | **33/33 at zero differing pixels** — every settled state of Act II mounted cold through the real engine in the spliced deck at 1920×1080, compared three ways (scene ↔ archived cell · fresh cell ↔ archived cell · scene ↔ fresh cell). 0 console errors |
| **Full act traversal** | **37 states forward in order and back again** monotonically to the start |
| **Boundaries** | **14, both directions** — the five inside the act, plus **in from Act I's world** and **out to the surviving legacy deck** |
| **Cold entry** | **37/37** through the engine's own deep-link path |
| **Reduced-motion parity** | **37/37 identical** — the rail's station geometry, line extent, dependency arc and mesh included |
| **Notes** | **6/6 byte-identical** to tag `batch-b`; every beat maps to exactly one `[→]`, 37 for 37 |
| **Self-reference / stale copy** | **653 on-screen strings scanned, 0 hits** (master §10 and AGENTS.md §14's cleanup list) |
| `npm run build` | **clean** |
| **Capture strip** | **completed** — 65 frames (37 settled states + 28 gestures) with an index, 0 console errors |
| **Commit granularity / tree / tag** | each construction its own commit; the deck runs end to end at every one; tree clean at every stop; `batch-b-r2` cut |

**On the count.** The brief projected **19** landed-state proofs for this session. The sheet's own arithmetic gives **15**, and the harness says so where a reader will count: 39 cells less the **6 carried** ones — the five elimination interiors and the palladium bar — which hold their overlay *without* the rail the film keeps deep-dimmed beneath them, so no deck frame can equal one. 18 in Scenes 5–7, 15 in Scenes 8–10, **33 rendered cells, all proven**. Nothing was skipped; the six that cannot be compared are named in the record and assessed by the scene test instead.

**One control drift, declared not waved through.** The proof's control comparison — does the sheet still draw the bytes it shipped — flags `s10-b3`, the palladium overlay's interior: its fresh render differs from its own archived bytes by **69 pixels at max delta 20**, reproducibly, in every run since the r2 session, and the page-per-cell capture fix does not touch it. **The deck matches the archive there at zero pixels.** Session 1 found it, left the approved bytes alone and flagged it; this session confirms it is stable and declares it in the harness, which fails on any drift that is not on that list. A cold browser per control render was tried and rejected: the two ported charts rasterize their sub-pixel SVG paths differently on a cold start, which invents drift the capture never had.

**Backward across the act's outer boundaries lands the previous slide at build 0.** That is the deck-wide convention the engine states in its own comment for every boundary outside a scene group (`↑` remains the jump-to-end key); the five in-act boundaries hand the shared stage off in reverse and land on the previous scene's end state, which is what a continuous world owes.

# 5. The eleven-question scene test — all six scenes, honest verdicts

Questions 10 and 11 are **answered by construction** wherever a settled state is a presenter-approved cell: the cell *is* the still he approved, and 33 of the act's 37 settled states are proven to be exactly that at zero pixels. The four that are not — Scene 6 beats 3–7 and Scene 10 beat 4 — are assessed in earnest and marked. Question 8 takes its **null-pass**: Act II now carries no accent at all, because the disc that carried it stepped off the rail at r2.3. That is absence by ruling, which is what the null-pass is for — but the arc consequence is raised as a tension below, because it is new.

| | S5 | S6 | S7 | S8 | S9 | S10 |
|---|---|---|---|---|---|---|
| 1 subject in one second | pass | pass | pass | pass | pass | pass |
| 2 explains, not decorates | pass | pass | pass | pass | pass | pass |
| 3 could work with less text | **tension** | pass | pass | pass | pass | **tension** |
| 4 discovering, not told | pass | pass | pass | **tension** | pass | pass |
| 5 different because the idea is | pass | pass | pass | pass | pass | pass |
| 6 previous visual transforms into it | **tension** | pass | pass | pass | pass | pass |
| 7 creates the next question | pass | pass | pass | pass | pass | pass |
| 8 orange carries meaning | null-pass | null-pass | null-pass | null-pass | null-pass | null-pass |
| 9 survives without the notes | pass | pass | **tension** | pass | pass | **tension** |
| 10 world-class as a still | by construction | by construction* | by construction | by construction | by construction | by construction* |
| 11 key frame feels intentional | by construction | by construction* | by construction | by construction | by construction | by construction* |

\* Scene 6's beats 3–7 and Scene 10's beat 4 are the act's four unproven stills: the sheet carries those cells byte-identical from the states sheet, so the approved cell holds the overlay without the rail the film keeps beneath it. Assessed in earnest: at the legacy's deep dim (0.08) the record does not compete with the overlay's own marks — it reads as the history waiting — and the overlay content is the approved cell's, untouched. Verdict pass, and named so nobody later mistakes them for proven.

## The tensions, flagged not fixed

1. **The record's text density at the wide cameras** (Q3, S5 and S10). At Scene 5 beat 5 five stations each carry a name and a one-to-three-line row; at Scene 10 beat 1 there are ten stations, ten lines and four pairs on one frame. Specifically, **the gain/dependency pairs render near 10px at the complete-rail camera** — legible as shape, not as words. This is the r1 flag you left open (camera motion in the implementation, or stage register on the final frames) and it is now live in the film. It is the act's largest open legibility question.
2. **Act I → Act II is a hard start** (Q6, S5). The claim used to cross that boundary; it is off the rail now, so the act opens on a line drawing in out of the dark rather than on an object arriving. The seam is clean but it is a start, not a transformation.
3. **Scene 8's dissolve is a subtraction** (Q4). "The paper became an entry" is now said by the dependency arc *releasing*. That is exact — the arc was the paper's claim on gold — but a subtraction is harder to notice than a transformation, and this is the single biggest change this session makes to a gesture you had already seen. It wants your eye.
4. **Scene 7 beat 4 is quiet without the spoken line** (Q9). The sentence condensing into the station's row, with the arc persisting, can read as a repetition of beat 3 rather than as the record absorbing it.
5. **Scene 10 beat 4's bar reads as a chart conclusion** (Q9). The claim that the bar is held up *against the history it must clear* is carried by the deep-dimmed record behind it, which at 0.08 is nearly invisible — so the relation is in the notes more than in the frame.
6. **The colour arc's Act II stretch is now monochrome end to end.** Master §8.5 has the accent entering at the Claim Mark's birth in Scene 3 and running with the claim; r2.3 takes the claim off the Act II rail, so the film now reads orange (Act I) → none (Act II) → orange (Act III). That is a consequence of the ruling, not a decision made here, and it is the kind of thing that is easier to see in a run than in a report.

# 6. Flagged, not improvised

1. **Where the two return seams settle.** Scenes 6 and 8 each carry one state past their last beat — `s6-b9-return` and `s8-b4-return`, the rail coming back with the overlay's answer landed — because the sheet records those seams as "not itself a mapped beat". Beat 9 of Scene 6 settles on the counted load and Scene 7's morph launches from the return; beat 5 of Scene 8 launches from its return and settles on the wound. The amendment allows reading either beat as settling on the return instead; it is one line in `_railStates.js` each.
2. **`s10-b3`'s control drift** (§4) — declared, stable, and not touched.
3. **Four stills in the act are not pixel-proven** (§5) — the carried interiors over the deep-dimmed record.
4. **The legacy compositions are still mounted** (§3) — unreachable, hidden, and owed a deletion after the viewing.

# 7. Remaining judgment calls — all yours

- **The act viewing itself** (§8) — the gate.
- **The pair-legibility question on the complete rail** (tension 1) — camera motion, or stage register on the final frames. Still yours, still open.
- **Whether the dissolve reads as a dissolve** (tension 3).
- **The colour arc through Act II** (tension 6).
- Anything the viewing turns up: the approved cells stand, and only the motion between them iterates.

# 8. The act viewing — the gate, in plain English

**Run the deck from Scene 5, at speaking pace, forward.** Then run it backward. Then run it again with motion off. That is the whole protocol, and the thing it is judging is one thing: **does the rail hold as one continuous, growing record from the first frame to the last?**

The three holds you checked on the sheet, now in motion:

1. **History writes itself left to right.** The line draws in out of the dark and never doubles back; every station lands to the right of the one before it; nothing you have already seen moves.
2. **Every arrival is introduced by its own line.** No station stands blank — the shells and the metals carry their virtues, the fallen carry their wounds, the architecture stations carry their trades.
3. **No white ball anywhere.** The claim is off this act entirely.

And four seams to watch by name, because a seam is where continuity is won or lost:

- **the ship returning to the oldest station** — Zanzibar landing at the far-left shells, five beats after they were the only thing on screen;
- **the dependency arc** — drawing back from the certificate to the gold that never moved, and staying drawn until the paper becomes an entry;
- **the mesh growing out of the failed ledger** — the record going dark except the one station, and its hub stepping away;
- **the same rail read twice** — Scene 10 lighting the pairs along the record it has been building for six scenes, with nothing new drawn.

If it holds, the batch closes on your word. If a seam breaks the thread, name it: the approved cells stand, and only the motion between them iterates.

# 9. Recommended next step

**Your act viewing of Scenes 5–10 in the deck.** On your word the batch closes, and the first cleanup after it is the legacy compositions the rewire left unreachable.
