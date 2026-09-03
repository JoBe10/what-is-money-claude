# Batch D Implementation, Session 1 — Report
## The three rulings recorded, and Scenes 16–19 built — the frozen argument comes home on the legacy's own motion

**Mode: FAST.** Scoped verification: the three rulings' own proofs (the script-installation harness at 25/25, the sheet checks at 26/26), the 23 built states proven against their approved cells three ways at zero pixels, the route smoked end to end both ways with reduced-motion parity, the production build, and the deck boot proven unchanged. No deck-wide suites. The deck was not touched beyond the two ruled changes at the source, and the batch's own full verification is Session 2's.
**Branch:** `film-rebuild`. **Prior tag:** `act-4-states`. **Tag:** `act-4-impl-1`.
**Date:** 3 September 2026.

---

# 1. The plain-English handoff — what stands, and what Session 2 does

**This session asks nothing of you.** Your three rulings are recorded and executed. By the shape of the batch, the place your eye meets this work is **the act viewing after Session 2**: the deck run from Act III's exit question at speaking pace, forward and backward, motion on and reduced motion, judging the act's own questions. Those questions are in the brief's §5, and the report for Session 2 will state them in full.

**What stands after this session:**

- **Scene 19 restages as you ruled.** Beat 1 is the inverted framing alone. The carrier arrives at beat 2, on its word. The change was made at the source, in the legacy slide and the stress-stage component, and the two cells were re-rendered. The map records the one change as an ADAPT.
- **Scene 22 merges its list beats as you ruled.** The two paragraphs are one, with one arrow removed and no word changed. Scene 22 is three beats and the act is forty-two. The map, the package, the installation harness and the cells are amended. The merged cell is the complete two-column list, and the five-row cell has left the record.
- **The sheet is approved in full.** The forty-two cells are the approved set. Every flag is closed. The table-kicker spacing is recorded as an accepted legacy fact. That approved set is the visual authority for every landed-state proof of this batch.
- **Scenes 16, 17, 18 and 19 are built and proven.** Every settled state is its approved cell at zero differing pixels, twenty-three of twenty-three, three comparisons each. They run as one continuous world at `?proto=act4`, behind the untouched 38-slide deck.

**How the scenes are built, in one paragraph.** The legacy Section 4 slides are the motion authority, and this session re-homed them rather than transcribing them. The shared Act IV stage mounts each legacy slide module once, into a layer of its own, and drives it through its own public surface: the same render, enter and build calls the deck runs. A settled state is therefore the legacy's own direct-entry frame for that build, the legacy stylesheet places every element, and a live advance is the legacy's own dataset choreography at the legacy's own durations. The homecoming layer mounts the film's own Act I stage and applies Scene 4's approved save state through that stage's own state law. The approved cells were rendered the same way, which is why the proof lands at zero pixels by construction.

**Session 2 (Opus 5, max, FAST, fresh CLI)** builds Scenes 20–23 on the same stage, splices all eight into the manifest, runs the batch verification, completes the strip, tags `batch-d`, and reports with the act-viewing protocol. Three things Session 2 should know:

1. **The stage grows by adding layers.** The stage's legacy map holds 4-04 and 4-06 through 4-10 today. Session 2 adds 4-11 through 4-16 to that map and writes each scene's state list as layer-and-build pairs, exactly as Scenes 16–19 are written. The three gesture helpers cover most beats: a legacy live advance, a legacy boundary (the crossfade onto the incoming slide's build 0, then its build-1 reveal), and a legacy cold entry.
2. **Scene 22's one ruled change needs a decision about where it lives.** The ten properties must land in one advance. The legacy 4-14 lands five per build. The cleanest path is the ruling-1 precedent: amend 4-14 at the source so both groups reveal at build 1, in the same session that retires 4-14 from the deck at the splice. The alternative is a composed gesture that drives both legacy builds in one timeline. Session 2 stands one reading and flags it.
3. **The splice retires the Section 4 sources Act IV supersedes.** Scenes 16–23 enter in place of 4-01 (retired by your Row 2 ruling) and 4-06 through 4-16. Legacy 4-04 already left the deck at Batch A. Slides 4-17 through 4-23 stay, they are Act V's. The two seams to prove both ways are Act III's exit question into the homecoming, and Scene 23 into 4-17. The 3-00 and 3-04 survivors are still yours to rule.

---

# 2. The three rulings, recorded first, each its own commit

| # | Ruling | Where it is recorded | Commit |
|---|---|---|---|
| 1 | **Scene 19 restages.** Beat 1 is the inverted framing alone, no carrier on stage. The carrier arrives at beat 2, timed to "let's put a carrier on the bench and try to break it." | master §13 · `docs/act-4-provenance.md` (S19-F1 PORT → ADAPT, the one change named) · `docs/batch-d-package.md` §1 · the source: `src/slides/section-4-ideal-store/10-invert-the-question.js` keys the carrier to build 2, `src/components/section-4/CarrierStressStage.js` gains a `visible` state · the sheet: s19-b1 and s19-b2 re-rendered, the record recut | `b595562` |
| 2 | **Scene 22 merges its list beats.** All ten properties land in one advance. The two paragraphs merge at zero word changes, one arrow removed. S22 = 3, the act = 42. | master §13 · `docs/act-4-provenance.md` (S22-F2 PORT → ADAPT; the map now 19 PORT · 2 ADAPT · 2 retired) · `docs/batch-d-package.md` §1, §1.1 (the merge in the ledger), §1.2, §2 (the merged script) · `review/act-4/harness/script-install.cjs` (the ledger entry; 42) · the sheet: s22-b3 the complete list, s22-b4 retired, the record recut | `e9e76ec` |
| 3 | **The sheet is approved in full.** The eight remaining flagged cells approved as rendered; the table-kicker spacing an accepted legacy fact; the go-ahead given. | master §13 · `docs/act-4-provenance.md` §5 and the S23-F2 row · `docs/batch-d-package.md` (the pipeline line) · the record: `review/act-4/states/states.json` carries `approval` and `approvedSet`, every flag closed; the sheet recut as the approved set; `check-cells.cjs` brought current | `3d55787` |

Two things about the rulings worth saying plainly. First, ruling 1 changes the live deck as well, because the legacy 4-10 slide is still in the manifest until Session 2's splice retires it: in the deck today the carrier arrives at 4-10's build 2, which is the ruled behavior. Second, the s19-b2 cell re-rendered byte-identical to its previous render, as expected, since the frame itself did not change; only s19-b1 changed. The merged s22-b3 cell is byte-identical to the retired s22-b4, since it is the same legacy state.

# 3. The build — Scenes 16–19 as one continuous world

`src/scenes/act-4-the-store-of-value-test/` — `_testStage.js` (the shared stage), `_sceneModule.js` (the contract), and the four scene modules, registered at `?proto=act4` while they wait for the splice. **No manifest change; the deck is untouched at 38.**

**Every settled state is its approved cell, by construction.** The stage keeps one layer per legacy slide and one for the Act I stage. A state names a layer and a legacy build. Reconstruction shows that layer alone and puts its module at that build through the module's own reconstruction path, the same path a deep link takes. Hidden layers leave the paint tree entirely, which is the Batch C compositing lesson carried forward. The landed-state proof closes it mechanically: **23/23 at zero differing pixels, three comparisons each.**

**Ports move like they always did.** Scene 17's five beats, Scene 18's eight, Scene 19's two, and Scene 16's beats four through eight are the legacy modules' own live advances: the same dataset flips, the legacy stylesheet carrying every duration and stagger. Scene 19's beat 2 is the carrier's arrival on the bench, which is the claim's and the shell's own reveals, now keyed to that build as you ruled.

**The boundaries between legacy slides are the legacy deck's own boundary.** The engine's 300ms crossfade is transcribed into the stage, ease curve included, and plays between the layers: the incoming slide rises at its build 0 while the outgoing dissolves beneath it, then the incoming slide's own build-1 reveal lands. That covers Scene 16 into 17, 17 into 18, 18 into 19, and the merge inside Scene 18 where 4-08 hands to 4-09. The carrier is inherited across each one exactly as the legacy carried it across five slides.

**Where this session's judgment went, all of it flagged in §6:**

- **The entry (the one authored morph).** The Scene 4 frame reconstructs around the disc. The disc finds its light where Scene 15 leaves it, at the triad's center. It rises to the fork's apex and takes its Act I size. The two roads draw out of it at the saved frame's own voices, the spend road already told and subdued, the save road at its voice. The claim takes the save road and comes to rest on it, the terminal dissolved, and the road draws on past it into black. Every move is the Act I stage's own vocabulary, and the settled frame is the approved s4-b4-b. At the splice, the engine's crossfade from Scene 15 carries this gesture, as it carried Scene 11's entry from Scene 10.
- **Beat 1 into beat 2.** Everything recedes but the claim: the roads, the terminal and the continuation dissolve. The disc rises from its rest to the apex, brightening to the claim's focus voice on the way. The legacy 4-04 frame takes over beneath it at the same point and size, and the definition lands in its own reveal.
- **Beat 4 into beat 5.** The definition clears. The disc moves from the apex to the carrier stage's center and returns from 176 to 116, the same drawn disc. Legacy 4-06 takes the frame beneath it and its first build's statements land.

Scripts installed as notes, verbatim from the package's §2 by mechanical injection (8 + 5 + 8 + 2 arrows; `review/batch-d/harness/install-scripts.cjs`, `--check` green), one arrow per beat with the first arrow spoken over the scene's entry. Scene contract in full: cold entry gestures, a morphIn per boundary, backward handoffs to the previous scene's end state, interrupted-gesture completion, reduced-motion parity, teardown.

# 4. Files changed

## New
| file | what |
|---|---|
| `docs/batch-d-implementation-brief.md`, `docs/batch-d-impl-1-report.md` | the brief as given, and this report |
| `src/scenes/act-4-the-store-of-value-test/_testStage.js`, `_sceneModule.js` | the act's shared stage and contract |
| `src/scenes/act-4-the-store-of-value-test/16-…js`, `17-…js`, `18-…js`, `19-…js` | Scenes 16–19 |
| `review/batch-d/harness/install-scripts.cjs` | the script installer, `--check` green |
| `review/batch-d/harness/proof-impl1-scenes.cjs` + `review/batch-d/landed-proof-impl1.json` | the landed-state proof (23/23) |
| `review/batch-d/harness/smoke-impl1.cjs` + `review/batch-d/smoke-impl1.json` | the smoke |
| `review/batch-d/harness/capture-strip-impl1.cjs` + `review/batch-d/strip/` | the capture strip, started (23 settled + 24 gestures) |

## Modified
| file | what |
|---|---|
| `docs/what-is-money-master.md` §13 (three rows) | the three rulings, each with its trail |
| `docs/act-4-provenance.md` | S19-F1 and S22-F2 PORT → ADAPT; the count line; the S23-F2 row's accepted fact; §4 seam 3 superseded; §5 the approval |
| `docs/batch-d-package.md` | §1 S22 = 3, the act = 42, the derivation table; §1.1 the merge in the ledger; §1.2; §2 the merged S22 script; the pipeline line |
| `src/slides/section-4-ideal-store/10-invert-the-question.js` | the carrier keyed to build 2 (ruling 1, at the source) |
| `src/components/section-4/CarrierStressStage.js` | the `visible` state (ruling 1; default true, no other call site) |
| `review/act-4/harness/script-install.cjs` + `review/act-4/script-install.json` | the merge in the ledger; 42; 25/25 |
| `review/act-4/harness/states.mjs`, `capture-states.cjs`, `check-cells.cjs` + `check-cells.json` | the S19 and S22 cells, the review classes, the approval; 26/26 |
| `review/act-4/states/` | s19-b1 re-rendered; s22-b3 the complete list; s22-b4 removed; the sheet and the record recut as the approved set |
| `src/proto/registry.js` | the four scenes at `?proto=act4` (leave the list at the splice) |

**Out of scope, changed anyway: none.** The two legacy-source changes are the ruled change of ruling 1, made where the presenter's words put it. No manifest change, no engine change, no script change beyond the ruled merge, no frozen data touched.

## Commits and tag
```
ebceed5  docs                      the Batch D implementation brief is on file
b595562  record(batch-d ruling 1)  Scene 19 restages — the carrier arrives at beat 2; S19-F1 ADAPT; the cells re-rendered
e9e76ec  record(batch-d ruling 2)  Scene 22 merges its list beats — S22 = 3, the act = 42; S22-F2 ADAPT
3d55787  record(batch-d ruling 3)  the sheet approved in full — the approved set, every flag closed
d352f8a  scenes(act-4)             the shared stage, the contract, and Scene 16
3c97dc6  scenes(act-4)             Scene 17
36cde1c  scenes(act-4)             Scene 18
f5dfcfc  scenes(act-4)             Scene 19; the four scenes registered at ?proto=act4
3baf926  review(batch-d)           the landed-state proof — 23/23 at zero pixels
d94361c  review(batch-d)           the smoke — zero deck impact, 23 states both ways, parity 23/23
a9a00d2  review(batch-d)           the capture strip started
```
Plus this report. **Tag: `act-4-impl-1`** at the report commit.

# 5. Validation

| check | result |
|---|---|
| **Script installation (the act-4 harness)** | **25/25 green** at 42: the installed scripts are the legacy notes with exactly the eight-entry ledger applied, word for word and character for character; the merge once in its source and applied; the protected lines unchanged |
| **Sheet checks** | **26/26 green**: 42 cells measured; the map's 20 PORT rows and 2 ADAPT rows agreeing with the cells; every beat once; the homecoming at 0 of 2,073,600 pixels against s4-b4-b; the approval recorded, every flag closed; the frozen data by blob id; the splice smoke on file |
| **Landed-state proof (the scenes)** | **23/23 at zero differing pixels**: scene↔archived cell, fresh cell↔archived, scene↔fresh cell, every state |
| **Smoke** | deck boots unchanged (38 slides, first id, 0 errors) · route boots 4 scenes · **23-state traversal exact forward, monotonic backward** · the three boundaries land the previous scene's end state backward and the next scene's first state forward · **23 cold entries settled** · **reduced-motion parity 23/23** by serialization · **0 console errors** |
| **Scripts** | `install-scripts.cjs --check`: **4/4 identical to the package**, 8 + 5 + 8 + 2 arrows |
| `npm run build` | clean |
| **Strip** | 23 settled + 24 gesture frames, 0 errors; the settled frames pinned to the approved cells by the proof |
| **Commit granularity / tree** | each ruling, each scene and each proof its own commit; the tree clean at every stop |

**What the proof caught, recorded.** The first run of the landed-state proof failed every state, and the strip was black. The stage's reconstruction was clearing the layers' `top` and `left` along with the gesture values, which stripped the inline inset positioning and collapsed every layer to nothing. The reconstruction now clears only what the gestures write: the layers' opacity and scale, the 4-04 headline's opacity, the 4-04 claim stage's top. The Act I mark is reset by the Act I stage's own state law. The rule is in the stage's comments at the site. The state-only walk had passed before the fix, which is the reason the pixel proof exists.

**Not run, and not claimed:** no deck-wide register, brightness or composition audit; no static-gate suite (nothing in the deck moved but the two ruled source changes); no second-window notes check; no scene test (Session 2's, on all eight scenes). FAST defers the global suites to Session 2's batch verification and the GATE.

# 6. Flagged, not improvised

1. **The entry is composed, and it is the one authored morph the brief names.** It is built from the Act I stage's own moves, and the settled frame is the approved cell. Two choices inside it are mine and are one edit each if they disappoint at the viewing: the disc starts at the triad's center, where Scene 15 leaves it, and it rises straight to the apex rather than retracing the save road. The whole gesture runs about five seconds, under a spoken beat of about fifty words.
2. **The two travels inside Scene 16 are wiring, as the approved cells record them.** From rest to the apex, the disc travels in a straight line and brightens by six percent to match the legacy claim's focus voice at the handover. From the apex to the carrier stage, it moves fifty pixels down and shrinks from 176 to 116 over 0.8 seconds. Both hand the frame to a legacy layer at the same point and size, so the switch is invisible.
3. **The boundaries are the legacy deck's own crossfade, with its consequences.** Three facts the viewing will see, each the legacy's own: across Scene 17 into 18 the carrier changes position in the dissolve, from the "later" end of the path to the start of the century's timeline; across Scene 16 into 17 the shell's future focus relaxes in the dissolve; and at Scene 19's first beat the direct and the inverted framings superimpose for half a second while one replaces the other. A traveling carrier or a staggered replacement is one ruled iteration if any of these reads wrong in context.
4. **One legacy pop is carried as a port.** At Scene 16 beat 4 the disc goes from 116 to 176 instantly, because the legacy 4-04 sets the disc's size without a transition. The legacy deck did the same. Smoothing it is one ruled change if you want it.
5. **Ruling 1 reaches the live deck until the splice.** The legacy 4-10 slide is still in the manifest, and it now plays the carrier's arrival at its build 2. That is the ruled behavior, stated so it is not a surprise.
6. **The join's one word is still open.** The package keeps the legacy "And" at "And this is the moment to pay a debt," as the states report recorded. Say so if you meant "This."
7. **Two survivors remain unruled.** 3-00 and 3-04 stay in the deck after Act III, flagged since Batch C. The act still exits onto 3-00 until Session 2's splice.

# 7. Remaining judgment calls — all yours, all at the viewing

- **The act viewing is the gate,** after Session 2: the world coming home, the test opening clean, the inversion, the carrier on the bench arriving on its word, the failures, the ten properties in one landing, the lineup, the fifty scores at once, the line.
- The entry's two choices and the three crossfade facts above, should any read wrong in context.

# 8. Recommended next step

**Session 2** (Opus 5, max, FAST, fresh CLI): Scenes 20–23 on the same stage, the Scene 22 landing as ruled, the manifest splice with both seams proven, the batch verification across all 42 states, the completed strip, tag `batch-d`, then your viewing of the act, which closes the batch on your word.
