# Batch D Implementation — Report (Session 2, the batch close)
## Scenes 20–23 built, the act spliced into the film, and every settled state its approved cell — the batch closes on the presenter's viewing

**Mode: FAST.** Scoped verification per the brief §3: the landed-state proofs (19/19 for the new scenes pre-splice, 42/42 across the act through the spliced deck), the full deck traversal both ways with both splice seams and all seven in-act boundaries walked in both directions, cold entry and reduced-motion parity at every act-4 build, the static gates (notes, self-reference, sweeps, guardrails, the protected lines re-verified in the installed deck, the frozen data, the splice), the eleven-question scene test with honest verdicts, the completed capture strip, the production build. No deck-wide register, brightness or composition audits. Those are the GATE's, before the recording merge.
**Branch:** `film-rebuild`. **Prior tag:** `act-4-impl-1`. **Tag:** `batch-d`.
**Date:** 3 September 2026.

---

# 1. The act-viewing protocol — the gate, in plain English

**The batch is built and proven. The word that closes it is yours, at the act viewing.** Run the deck from Act III's exit question at speaking pace. The deep link is `?slide=the-tower`; walk the tower to its last beat, the returned triad with the store-of-value question, and advance into the act. Go forward through all forty-two beats, then backward. Do it once with motion on, once under reduced motion. The brief's own list is the walk, and each item is a question you can answer with a yes or a no:

1. **The world coming home.** The disc Scene 15 left at the triad's center rises to the fork's apex, the two roads draw out of it, and the claim takes the save road and rests on it as the road draws on into black. Does Scene 4's frame come home around the disc, and does the return line land on it?
2. **The test opening clean.** The definition lands over the released claim, the claim takes a body, the carrier steps from now to later, and the four statements of the experiment arrive as one block. Does the test open clean, with nothing before it speaking its phrase?
3. **The inversion.** The direct framing gives way to "How could the carrier fail?" with no carrier on stage.
4. **The carrier on the bench arriving on its word.** At Scene 19's second beat, on "let's put a carrier on the bench," the claim in its shell arrives. This is your ruling 1, built.
5. **The failures.** Ten typographic rows, one per advance, across two scenes.
6. **The ten properties in one landing.** The grid inverts in two sweeps, then all ten properties land in one advance, the left column in reading order and the right following as the left finishes. This is your ruling 2, built.
7. **The lineup.** Five candidates at display scale under the question, monetary then productive, settling into one set, the question receding.
8. **The fifty scores at once.** The empty table enters, then every dot fills in one advance.
9. **The line.** "Don't trust. Verify." beneath the full table, on stage exactly once in the film.

Two seams are yours to judge on the same walk, both reported rather than smoothed. The first is the splice seam in: the engine's crossfade from the tower's exit question into the homecoming's entry. The second is the splice seam out: Scene 23's line dissolves to the flagged legacy waypoint 3-00, whose first build is the waypoint's own authored black. A disappointing seam is one ruled iteration against the pinned states. On your word, the batch closes, and four of five acts are film.

# 2. Implemented

**Scene 20 — How the Carrier Can Fail: I** and **Scene 21 — How the Carrier Can Fail: II** (5 beats each): legacy 4-11 and 4-12 re-homed, the typographic index, one row per advance, the frozen data by its own module. The seam into Scene 20 is the legacy deck's own boundary: the bench dissolves onto the index's empty frame and the first row lands.

**Scene 22 — From Failure to Requirement — the Ten Properties** (3 beats, your ruling 2): legacy 4-13's two sweeps over the grid of ten failures, then legacy 4-14's complete list. **The one ruled change lives at Scene 22's gesture and nowhere else:** the third beat drives both of 4-14's builds in one timeline, the left column's rows arriving at the legacy's own stagger and the right column's as the left finishes, so all ten properties land in one advance and settle on 4-14's own last state, the approved s22-b3. The legacy module is untouched, as the ruled map records.

**Scene 23 — The Comparison** (6 beats, your Row 1 ruling): the candidate lineup stands as its own frame at display scale before the table, monetary then productive, the five settling into one set, the question receding. Then the table: the empty table enters as the first movement of the scores' gesture, exactly as the approved s23-b5 records, and all fifty scores land in one advance. Then the closing line, two spans, on stage exactly once in the film. The kicker-to-table spacing is carried as the legacy renders it, your accepted legacy fact. The stability steelman and the Q&A arsenal ride in the notes as armor, never spoken.

**The splice.** Scenes 16–23 enter the deck directly after Act III as one contiguous world, in place of the legacy slides the ruled provenance map names as their sources:

| scene | supersedes |
|---|---|
| 16 Return to the Open Exchange | `4-06-claim-and-carrier`; `4-01-define-the-job` (retired by your Row 2 ruling); 4-04's builds 3–4 re-homed from disk, 4-04 itself having left the deck at Batch A |
| 17 What the Carrier Must Preserve | `4-07-store-of-value-function` |
| 18 The 100-Year Test | `4-08-100-year-test`, `4-09-future-is-unknowable` |
| 19 Invert the Question | `4-10-invert-the-question` |
| 20 How the Carrier Can Fail: I | `4-11-carrier-failures-i` |
| 21 How the Carrier Can Fail: II | `4-12-carrier-failures-ii` |
| 22 From Failure to Requirement — the Ten Properties | `4-13-failure-to-requirement`, `4-14-ten-properties` |
| 23 The Comparison | `4-15-framework-to-comparison`, `4-16-the-comparison` |

**Old and new counts: the deck was 38 slides and is 34.** Twelve legacy slides out, eight scenes in. The seven Act V sources, 4-17 through 4-23, stay for Batch E. Every legacy file stays on disk, and the act's stage keeps re-homing the superseded modules from disk, so the treatments live on in the film.

**The two ambiguous-fate survivors move, and are still flagged, never decided.** 3-00 and 3-04 stood between Act III and the legacy Section 4. The splice puts Act IV directly after Act III, the seam the brief names, so the two survivors now stand after Act IV, in their legacy relative order and still immediately before the surviving legacy Section 4. Nothing about them is decided. The film is contiguous from the Prologue through Scene 23, and the act exits onto 3-00, the same narratively odd seam Batch C reported after Scene 15, now eight scenes further along. The manifest's own record says so in plain English. Both seams are proven both ways in the smoke.

The act-4 prototypes left the scratch route's registry at the splice, per that file's own rule. The scenes README's Act IV row names the eight scenes.

# 3. Files changed

## New
| file | what |
|---|---|
| `src/scenes/act-4-the-store-of-value-test/20-…js`, `21-…js`, `22-…js`, `23-…js` | Scenes 20–23 |
| `docs/batch-d-implementation-report.md` | this report |
| `review/batch-d/harness/proof-impl2-scenes.cjs`, `proof-batch-d.cjs`, `smoke-batch-d.cjs`, `static-gates.cjs`, `capture-strip-batch-d.cjs` | the Session 2 and batch harnesses |
| `review/batch-d/landed-proof-impl2.json`, `landed-proof-batch-d.json`, `smoke-batch-d.json`, `static-gates.json` | the evidence |

## Modified
| file | what |
|---|---|
| `src/scenes/act-4-the-store-of-value-test/_testStage.js` | the six Session 2 layers (4-11 through 4-16) and the four scenes' state lists |
| `src/slides/manifest.js` | the Batch D splice block with the mapping table and the flagged survivors; the act-4 section; twelve imports out, eight in |
| `src/proto/registry.js` | the act-4 entries leave at the splice |
| `src/scenes/README.md` | the Act IV row names the eight scenes |
| `review/batch-d/harness/install-scripts.cjs` | Scenes 20–23 join the installer, S23's two armor blocks by their own label |
| `review/batch-d/strip/` | the strip re-cut complete: the act through the spliced deck, entered from Act III's exit question |

**Out of scope, changed anyway: none.** No engine change, no legacy edit, no script change, no frozen data touched, no Act I–III scene touched.

## Commits and tag
```
cf86140  scenes(act-4)     Scene 20 — legacy 4-11 re-homed; the stage's six Session 2 layers; the installer extended
f12868d  scenes(act-4)     Scene 21 — legacy 4-12 re-homed
20560cb  scenes(act-4)     Scene 22 — legacy 4-13 and 4-14 re-homed, the ten properties in one advance
e37d8b9  scenes(act-4)     Scene 23 — the lineup whole, the fifty scores at once, the line; the armor in the notes
174ad4f  review(batch-d)   the S20–S23 landed proof — 19/19 at zero pixels
903b779  splice(act-4)     Scenes 16–23 enter the deck — twelve out, eight in, 38 → 34; the survivors moved and flagged
3f45a80  review(batch-d)   the batch landed proof — 42/42 through the spliced deck
d05184c  review(batch-d)   the static gates — 28/28
030d244  review(batch-d)   the capture strip completed
d77c48b  review(batch-d)   the batch smoke — 179 states forward exact, parity 42/42
```
Plus this report. **Tag: `batch-d`** at the report commit.

# 4. Validation

| check | result |
|---|---|
| **Landed proof, Session 2 scenes** | **19/19 at zero differing pixels** (S20 against s20-b1…b5, S21 against s21-b1…b5, S22 against s22-b1…b3, S23 against s23-b1…b6), three comparisons each, through the scratch route pre-splice |
| **Landed proof, the batch** | **42/42 at zero differing pixels**, every settled state of Scenes 16–23 mounted cold through the real engine **at its deck position in the spliced 34-slide deck**, three comparisons each |
| **Smoke** | deck boots 34 slides (was 38), the act at index 16, directly after the tower · **full deck traversal: 179 states forward exact, backward monotonic to the top** (118 steps) · **both splice seams walked three ways each** — forward; ← to the previous slide's build 0; ↑ to its last build — and **all seven in-act boundaries both directions**, landings recorded · **42 cold entries settled** (one direct entry retried once by the harness's own retry loop, then settled) · **reduced-motion parity 42/42** by serialization · **0 console errors** across every run |
| **Static gates** | **28/28**: beats 8 · 5 · 8 · 2 · 5 · 5 · 3 · 6 = 42; the notes-only armor carries no advance; scripts verbatim to the package character for character, S23's two armor blocks included, and the package's own installation harness green at 42; the self-reference ban clean over 36 scene files, the ledger's three live-delivery phrases included; the retired-wording and absolute-number sweeps clean, the stability armor's vocabulary confined to the armor; no prohibited overclaim; **the protected lines re-verified in the installed deck**: the crescendo in S16's notes, the hundred-year sentence in S18's, the dated scores in S23's, the rung 4 phrasing, the spoken definition, the return line, and "Don't trust. Verify." on stage exactly once across the 87 modules the manifest reaches; the frozen data at the recorded blob ids; the splice proven, 15/15 files on disk, 12/12 superseded out, the two survivors kept and flagged, the seven Act V sources kept, 8/8 scenes in, the registry clear |
| **Scripts** | `install-scripts.cjs --check`: **8/8 identical to the package**, 8 + 5 + 8 + 2 + 5 + 5 + 3 + 6 arrows |
| **Capture strip** | **completed: 42 settled states + 44 gestures mid-flight**, entered across the splice seam from the tower's exit question and exited across the seam to 3-00 (`review/batch-d/strip/`) |
| `npm run build` | clean |
| **Commit granularity / tree** | each scene, the splice, and each proof its own commit; the tree clean at every stop |

**One gate brought current, not widened.** The absolute-slide-number sweep first failed on Scene 23 because the notes-only marker labels, which are the package's own labels rather than script, cite Scene 9 and Scene 29 by the film's structure. The sweep now reads the script and the armor's words with the marker labels set aside, the same form Batch C's sweep took for Scene 13's armor. Nothing in the spoken script names a slide.

**Not run, and not claimed:** the deck-wide register, brightness and composition audits; the freeze-check suites; the second-window notes check. Those are the GATE's, before the recording merge. FAST verifies the batch locally; the global guarantees are re-established there.

# 5. Flagged, not improvised

1. **The two ambiguous-fate survivors moved.** 3-00 and 3-04 now stand after Act IV rather than after Act III, because the brief names Act III's exit question into the homecoming as a seam to prove. Their relative order and their place immediately before the surviving legacy Section 4 are unchanged, and nothing about them is decided. The act exits onto 3-00, whose first build is the waypoint's own authored black. It is one ruling to retire or re-home them.
2. **The backward splice-seam landings are the engine's standard.** Retreating across a group boundary lands at the previous slide's build 0 (S16 b0 → S15 b0; 3-00 b0 → S23 b0), and the jump-to-end key lands at its last build, exactly as every group boundary in the shipped deck behaves since Batch A. Within the act, backward handoffs land on the previous scene's end state, as the smoke's boundary table records.
3. **Scene 22's single advance is a composed gesture, flagged.** Both of 4-14's builds play in one timeline with the right column following the left. The alternative reading, both columns at once, is one number. The ruled change lives here and the legacy module is untouched, as the map records.
4. **The boundaries into Scenes 20 and 21 dissolve to an empty frame before the first row lands.** That is the legacy deck's own boundary: 4-11 and 4-12 author their build 0 as an empty list, and the crossfade takes the frame there. The film's rule that black is a beat and not a seam is honored by the slide, not by the engine; if the empty beat reads as a gap at speaking pace, a first row landing inside the crossfade is one ruled iteration.
5. **Session 1's three flags stand:** the composed entry with its two choices (the disc starting at the triad's center, the straight rise to the apex); the carrier's position changing across the Scene 17 → 18 dissolve as the legacy did it; the disc's instant size change at Scene 16 beat 4, the legacy's own pop.
6. **The join's one word is still open**, the legacy "And" at "And this is the moment to pay a debt."
7. **The scene test's honest tensions** (§6): the return's words spoken only at Scene 16's first beat; the carrier's dissolve into Scene 18; the failure index telling rather than discovering, and the cut from the bench into it.

# 6. The eleven-question scene test — verdicts per scene

Questions 10 and 11 pass **by construction** for every scene: every settled state is a presenter-approved cell at zero differing pixels (the batch landed proof), so the stills are the stills you approved. Question 8 carries the act's register: black, white and the accent at full deployment, the accent marking the claim, the carrier, the emphasized terms, the arrows of the inversion, the numbers of the index, the scores, and "Verify."

| # | question | S16 | S17 | S18 | S19 | S20 | S21 | S22 | S23 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | subject in one second | pass | pass | pass | pass | pass | pass | pass | pass |
| 2 | explains, not decorates | pass | pass | pass | pass | pass | pass | pass | pass |
| 3 | less text possible | pass | pass | pass | pass | pass | pass | pass | pass |
| 4 | discovery over telling | pass | pass | pass | pass | **tension** | **tension** | pass | pass |
| 5 | different because the idea is | pass | pass | pass | pass | pass | pass | pass | pass |
| 6 | previous visual transforms naturally | pass | pass | **tension** | pass | **tension** | pass | pass | pass |
| 7 | creates the next question | pass | pass | pass | pass | pass | pass | pass | pass |
| 8 | orange semantic | pass | pass | pass | pass | pass | pass | pass | pass |
| 9 | survives without notes | **tension** | pass | pass | pass | pass | pass | pass | pass |
| 10 | world-class still | by construction | by construction | by construction | by construction | by construction | by construction | by construction | by construction |
| 11 | key frame intentional | by construction | by construction | by construction | by construction | by construction | by construction | by construction | by construction |

**The tensions, in one line each, for your eye. Each is designed and approved, and named here because the test asks honestly:**
- **S16 q9:** the first beat carries no words on the frame, by the reading you approved; the return line lives in the spoken word, and a viewer without the notes sees the saved frame returned and the claim held. If you want the return line on screen, that is a ruling, since no legacy treatment carries it.
- **S18 q6:** the carrier changes position across the dissolve from Scene 17, from the "later" end of the path to the start of the century, exactly as the legacy deck did it. A traveling carrier is one ruled iteration.
- **S20 q4, S21 q4:** the failure index tells. Ten rows land one per advance and the discovery lives in the spoken examples. That is the legacy's own typographic treatment, ported.
- **S20 q6:** the bench does not transform into the index; the carrier dissolves onto an empty frame and the first row lands. The question changes, from the carrier to the ways it fails, so the cut is the paradigm's own. If it reads abrupt at the viewing, it is one ruled iteration.

Notes on the passes that carry a seam: S16's q6 is the homecoming, the one authored morph, and it is on the viewing's walk; S22's q6 covers the grid giving way to the list, the legacy's own crossfade, and S23's q6 the lineup giving way to the empty table, likewise.

# 7. Remaining judgment calls — all yours, all at the viewing

- **The act viewing closes the batch** (§1's protocol): the nine questions of the walk, the seven in-act boundaries, the two splice seams.
- **The two survivors' fates** (3-00, 3-04): retire, re-home, or leave for the GATE.
- Everything Session 1 flagged and this session carried (§5).
- **For Batch E to know:** Scene 23's exit lands on 3-00 today and will land on Act V's first scene once Batch E splices; the falsifiability passage stays Act V material unless you say otherwise, as the states report recorded.

# 8. Recommended next step

**The act viewing.** Run the deck from `?slide=the-tower`, walk the exit question into the act, and go forward through the forty-two beats and back, motion on and reduced motion. Return the word. On it, Batch D closes, four of five acts are film, and Act V's kickoff, Scene 24 and the case, is the next construction.
