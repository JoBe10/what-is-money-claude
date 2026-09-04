# Batch E Implementation — Batch Report
## Act V enters the deck, the legacy deck leaves it, and the film is whole

**Mode: FAST.** Scoped verification, and the batch-level verification the brief names: all 27 Act V states proven against their approved cells in the spliced deck, the full film traversed both ways, cold entry and reduced-motion parity across the act, the protected lines and the self-reference ban re-verified where the film ships, the capture strip completed, the eleven-question scene test on all seven scenes, the production build. No deck-wide register, brightness or composition audit; no static-gate suite; no freeze-check suites. **The GATE is not this batch** — it is its own brief, and nothing here begins it.
**Branch:** `film-rebuild`. **Prior tag:** `act-5-impl-1`. **Tag:** `batch-e`.
**Date:** 4 September 2026.

---

# 1. What stands, in plain English

**The deck is the film.** Thirty-one scenes, 164 beats, black to black. The first slide is `eighty-thousand-hours`; the last is `the-close`. There is no legacy slide left in the running order — not one — and the sections list is a prologue and five acts.

- **Scenes 28, 29 and 30 are built and proven.** Every settled state is its approved cell at zero differing pixels.
- **The last splice is made.** Eight legacy slides out, seven scenes in; 32 → 31. The mapping table is in the manifest, row by row. The legacy files stay on disk and in history, and their treatments live on inside the four act stages that mount them.
- **Both boundaries are proven both ways.** Scene 23's *"Don't trust. Verify."* into Scene 24's crossfade, and Scene 30 as the deck's final state with nothing after it — advancing at the end is a no-op and the deck holds.
- **All 27 Act V states are proven in the spliced deck**, three comparisons each, at zero pixels.
- **The film's last frame is two words on black**, and the self-reference ban is verified there on the live deck: no medium, no sequel, no waypoint, no second line.

**What this asks of you: the act viewing, and then the film.** §7 has the protocol. What remains after your word is the GATE, the voice pass, and the recording.

---

# 2. The build — Scenes 28, 29, 30

The three scenes join the act's shared stage on the same terms as the first four: the legacy modules are **re-homed, not transcribed**. Each renders once into a layer of its own and is driven through its own public surface — the same render, enter and build calls the deck runs — so a settled state is the legacy's own direct-entry frame, the legacy stylesheet places every element, and a live advance is the legacy's own choreography at the legacy's own durations. **Act V authors no motion of its own.**

**Scene 28 — the field returns, and the bookend is real by construction.** Legacy `4-22` whole: the margin lit under its bracket with the three demand claims waiting at the right; the claims travelling to the margin and taking their focus; the repricing sweeping right to left across the whole stock, 58ms a column, with PRICE DISCOVERED HERE beneath the margin and the final line under the opening one. The field draws its thirty-five units with `UnitGrid` from `src/components/UnitField.js` — the same module the Prologue's hours field draws its eighty thousand units from, both reading one `UNIT_GRAMMAR`. Neither component was touched. **The rhyme is structural, and nothing on screen or in a script points at it.**

The entry is the ruled seam: the boundary from Scene 27 is the legacy crossfade onto `4-22`'s build 0 — the stock at rest — and then its build-1 reveal, so **the margin lights as the words land**. That build 0 is in no state, which is what "it is the composition the gesture starts from" means when it is built rather than described. **The through-line's last journey rides that same crossfade:** Scene 27's one decision claim dissolves as the three demand claims appear at the field's right edge. Neither end's frame is redesigned, which is the whole of the wiring the ruling asked for.

**Scene 29 — the full clear, then the frozen final frame.** Legacy `4-23` whole and frozen. Scene 28's field, its claims and its lines dissolve **completely** while `4-23`'s build 0 — the kicker on black and nothing else — rises beneath them; then the four summary lines land as one gesture in the order the sentence closes them. On the second advance the summary clears, the stage holds on pure black for the legacy's authored 900ms, and the conclusion lands alone at the optical center: the protected line character for character, its two accent terms the accent's last deployment in the film.

**The rules line is spoken and never staged**, exactly where Row 3 placed it: inside beat 2, immediately before *"The case is not that the price will behave."*, with the three sentences after it kept together so *"the whole case, in eleven words"* still points at the pair beside it. Its only on-screen home was `4-20`'s retired stability frame, which Ruling 5 cut; no Act V scene stages it, and the verification asserts that.

**Scene 30 — the silence, then the two words.** Legacy `5-01`, re-homed as the act's one ADAPT. Beat 1 is black: the case dissolves into it, the callback is spoken over it, nothing is on the frame. Beat 2 is *Thank you.* — one line at the film's final register, no second line, no watermark, no kicker, no chrome, no waypoint.

**The one ruled change, and the one consequence nobody had costed.** `5-01`'s build 1 brought the method line back with all three waypoints completed and a warmth pulse along it; the waypoint device is retired by the structure freeze, so that build is in no state and is never shown. But retiring it leaves a hole in the legacy module's own build numbering, and the legacy `_snapFrame` contract reads any apply that is not `appliedStep + 1` as a reconstruction — which arms the snap the stylesheet reads as "no transitions". Left alone, **the film's last words would have popped onto the screen instead of playing the legacy's authored 1000ms fade from black.** The stage's `liveAcrossRetiredBuild` clears that snap in the same task, before style is resolved, so the legacy's own fade runs exactly as it always did. It is the one place this stage reaches past the legacy's public surface; it changes no legacy file, no settled state and no timing, and the smoke measures the result rather than asserting it — 300ms after the advance the line stands at **0.40 opacity**, mid-fade, and settles at 1. Under reduced motion the same measurement is 1: instantly complete, as it must be.

**Session 1's open wiring choice is closed, and stated.** The handoff asked Session 2 to stand one reading of Scene 30's black beat rather than choose silently. **The reading taken: the `5-01` layer stands at build 0 like any other layer**, rather than a black beat with no layer shown. It is the simpler law — one layer per state, always — and it keeps the boundary from Scene 29 a real crossfade between two layers rather than a fade to an empty stage. The approved cell is black either way, and the smoke asserts the live frame carries no text at all.

# 3. The last splice

**The deck is 31 slides (was 32): eight legacy slides out, seven scenes in.** 164 beats. First `eighty-thousand-hours`, last `the-close`.

| scene | supersedes |
|---|---|
| 24 Migration | `4-17-store-of-value-function-migrates` |
| 25 The Monetary Premium | `4-18-monetary-premium` |
| 26 When Other Assets Do Money's Job | `4-19-other-assets-do-moneys-job` · `4-20-bitcoin-does-not-replace-everything` (builds 1–4 only; its builds 5–7, the stability contrast, are cut by architecture Ruling 5 — the steelman is Scene 23's notes-only armor and the rules line is Scene 29's script) |
| 27 The Marginal Decision | `4-21-marginal-store-of-value-decision` |
| 28 Fixed Supply Reprices at the Margin | `4-22-fixed-supply-reprices-at-margin` |
| 29 The Case from First Principles | `4-23-investment-case-from-first-principles` |
| 30 Close | `5-01-thank-you` (build 1, the wayline, retired by architecture Ruling 1 — in no state, never shown) |

Every row is a ruled PORT but the last, which is the act's one ADAPT with its one change named.

**No legacy slide remains in the manifest.** The `ideal-store` and `close` sections leave the sections list, as `question`, `origin` and `function` did before them, and with them the last of the 45-slide deck. The smoke asserts this by **id shape** rather than by counting — every legacy id begins with a digit, every scene id is a name — so it cannot pass by accident if something is left behind under a different count.

**The legacy files stay on disk and in history** (`AGENTS.md` §5). What left is only the running order. The treatments themselves are still running: the four act stages mount them, and `src/scenes/act-5-the-case/_caseStage.js` is where the last eight live on.

**The splice, batch by batch, for the record.** Batch A took `1-01`–`1-05`, `2-01`–`2-03` and `4-03`–`4-05`; Batch B took `2-04`–`2-08` and `3-05`; Batch C took `3-01`, `3-02`, `3-03`, `3-06`, `3-07`; the Act IV foundation took `3-08`; Batch D took `4-01` and `4-06`–`4-16`; the Acts III–IV final rulings took `3-00` and `3-04`; Batch E takes the last eight.

**Both seams, proven both ways:**

- **Scene 23 → Scene 24** — the crossfade Session 1 could not smoke, because Scene 23 was not in the scratch route. Forward: `the-comparison:5 → migration:0`, the Act V stage standing at `4-17`'s build 0. Backward: `migration:0 → the-comparison:0`. A cross-group boundary, so it is the engine's own crossfade — which is exactly the boundary the legacy deck played between `4-16` and `4-17`. The question changes and the film cuts.
- **Scene 30 as the final state** — `the-close:1`, index 30 of 31; advancing again returns `the-close:1`. Nothing after it.

# 4. Files changed

## New
| file | what |
|---|---|
| `src/scenes/act-5-the-case/28-…js`, `29-…js`, `30-the-close.js` | Scenes 28, 29, 30 |
| `review/batch-e/harness/proof-impl2-scenes.cjs` + `landed-proof-impl2.json` | the new scenes proven before the splice (7/7) |
| `review/batch-e/harness/proof-batch-e.cjs` + `landed-proof-batch-e.json` | the batch proof in the spliced deck (27/27) |
| `review/batch-e/harness/smoke-batch-e.cjs` + `smoke-batch-e.json` | the batch smoke |
| `review/batch-e/harness/verify-installed.cjs` + `verify-installed.json` | protected lines, notes and the ban, in the installed deck |
| `review/batch-e/harness/capture-strip-batch-e.cjs` + `strip-batch-e.json` | the completed strip |
| `review/batch-e/harness/probe-motion-raster.cjs` + `motion-raster.json` | the walk-only differences attributed |
| `docs/batch-e-implementation-report.md` | this report |

## Modified
| file | what |
|---|---|
| `src/scenes/act-5-the-case/_caseStage.js` | the last three legacy layers, their state lists, and `liveAcrossRetiredBuild` |
| `src/slides/manifest.js` | **the splice** — Act V in, the last eight legacy slides out, the mapping table and the counts |
| `src/proto/registry.js` | the Act V entries leave the list, as every batch's have |
| `review/batch-e/harness/install-scripts.cjs` | extended to all seven scenes |
| `review/batch-e/strip/` | the strip re-walked in the deck and completed |

**Out of scope, changed anyway: none.** No Act I–IV scene module, no legacy slide file, no component, no frozen data file, no engine file, no wording anywhere.

## Commits and tag
```
83044f7  scenes(act-5)     the stage takes the act's last three layers, and the close's one gesture
25ee2b9  scenes(act-5)     Scene 28 — the field returns, the bookend real by construction
7b37397  scenes(act-5)     Scene 29 — the full clear onto the kicker, then the frozen final frame
3a8688f  scenes(act-5)     Scene 30 — the silence, then Thank you.; the seven scenes at ?proto=act5
f8f0242  review(batch-e)   the new scenes proven before the splice — 7/7 at zero pixels
0ff6072  splice(batch-e)   Act V enters the deck and the legacy deck leaves it — 31 scenes
25c8f34  review(batch-e)   the batch landed-state proof — 27/27 at zero pixels in the spliced deck
9608bdd  review(batch-e)   the batch smoke — 31 scenes black to black, both seams, parity 27/27
ecf4ee7  review(batch-e)   the installed deck verified — 28/28
3630aa2  review(batch-e)   the capture strip completed — 27 settled + 26 gestures
fc2b5d7  review(batch-e)   the walk-only differences attributed — introduced by Batch E: none
```
Plus this report. **Tag: `batch-e`** at the report commit.

# 5. Validation

| check | result |
|---|---|
| **Batch landed-state proof** (`proof-batch-e.cjs`) | **27/27 at zero differing pixels** in the spliced deck: deck↔archived cell, fresh cell↔archived, deck↔fresh cell, every state, every shot on a fresh page. 0 console errors |
| **Pre-splice proof** (`proof-impl2-scenes.cjs`) | **7/7 at zero pixels** for Scenes 28–30 at `?proto=act5`, before the manifest moved |
| **Batch smoke** (`smoke-batch-e.cjs`) | ten proofs, all green: 31 slides · 164 beats · last id `the-close` · **no legacy slide in the running order** · **full-film traversal exact forward and monotonic backward** · Scene 30 holds as the final state · both splice seams both ways · the six in-act boundaries both ways · **27 cold entries settled** · **reduced-motion parity 27/27** · **the close's fade alive at 0.40 mid-flight, instant under reduced motion** · the silence black with no text · the last frame "Thank you." alone · the retired builds unreachable. **0 console errors** |
| **Installed deck verified** (`verify-installed.cjs`) | **28/28**: the seven scripts character for character from the package, 27 arrows one per beat; the rules line once in Scene 29 at Row 3's place with its sentences kept together and staged nowhere; the conclusion on screen character for character with its two accent terms; the callback, covenant, disclaimer and the final "Thank you."; the road sentence cut; the asked-calmly line at its relocated home; "The monetary competition is decided at the margin." spoken and on no on-screen string; **"Don't trust. Verify." on stage in exactly one scene of the whole film — Scene 23, walked not sampled**; the self-reference ban clean across all seven and at the close; no `L1:`, no retired ids, no absolute slide numbers |
| **Scripts** | `install-scripts.cjs --check`: **7/7 identical to the package** — 4 + 4 + 9 + 3 + 3 + 2 + 2 = **27 arrows** |
| `npm run build` | clean |
| **Strip** | **27 settled + 26 gesture frames**, walked in the spliced deck from Scene 24 to "Thank you."; 0 console errors; the settled frames pinned to the approved cells by the batch proof and separately measured on the continuous walk — §6 |
| **Commit granularity / tree** | each scene, the splice and each proof its own commit; the tree clean at every stop |

**Not run, and not claimed:** the deck-wide register, brightness and composition audits; the static-gate suites; the freeze-check suites; the second-window notes check; the direct-entry matrix outside Act V; visual review at the recording display size. **Those are the GATE's, and the GATE is its own brief.** FAST's two standing obligations are met: no gate was widened to make this session pass, and the mode is named.

**Three harness defects found and fixed in-session, recorded rather than smoothed.** All three were in the checks, not in the film. (1) The first silence check tested each element's own computed style, which reports a normal `display` for a descendant of a `display:none` ancestor — so it read the text of all seven hidden legacy layers and called the black frame full of words; it now walks the ancestor chain, the rule the states sheet's own probe uses. (2) The on-stage test for *"Don't trust. Verify."* looked for both halves inside one leaf element, and the legacy sets them as two spans. (3) That same walk began wherever the previous deep-link check had left the deck, because the engine persists every landing — it started at Scene 29 and reported the film's one on-stage *Verify* as absent; it now clears the key, enters at slide 1, and **asserts it started at the top before it moves**.

# 6. Flagged, not improvised

1. **Five settled frames differ from their approved cells on a continuous walk, and none of it is Batch E's.** Every one of the 27 states matches its cell at zero on a cold mount. A viewing is a walk, so the strip measures that too: 22 of 27 at zero, and five differ — `s27-b2` and `s27-b3` by 7,083 px (max channel delta 61, across the row of five compact-box renders), `s24-b3` and `s24-b4` by 6 px (delta 7, inside the third migrating claim's disc), and `s28-b2` by 15 px (delta 4, in a **one-pixel-wide column** down the right edge of the lit margin column). **The attribution is measured twice, not asserted.** Session 1 walked the untouched legacy deck and found the same difference at the same states by the same counts. That control is gone — the splice took the legacy slides out of the manifest — so this session used a stricter one: **the legacy module mounted bare, with no stage, no scene module and no engine**, produced cold and live. Legacy cold matches every cell at zero; legacy live differs by exactly 6, 6 and 15 px, the film's own numbers. **Introduced by Batch E: none.** Two mechanisms, both the legacy's: the browser resampling a dark-field subject already painted at another box size, and an element's rasterization after it has been animated. Left as it stands, because fixing either would mean touching the render pipeline, which no port may do. **What it means at the viewing:** Scene 27's five candidate renders may read very slightly softer than the approved still; the other two are invisible at 6 and 15 pixels.
2. **The premium's halo reads as a soft rectangle, not as light on the object.** At Scene 25 beat 3 the warm glow is a `drop-shadow` on a rectangular raster, so its silhouette is the render's box rather than the object's outline — which is not quite what R7.1 §C3's "light on the mark, not a box around it" describes. It is the approved cell exactly, and it is the legacy's own treatment; it is flagged because the walk is the first time it is seen at speaking pace beside the un-haloed beat before it. One ruled change if it disappoints.
3. **Scene 24's lane is weighted to the right.** Once the three claims have migrated, the left half of the flow lane stands empty between the fiat note and gold — the origin is unmarked, because the claim that stood there has left. Approved as rendered, and the emptiness is arguably the point; noted because it is the one composition in the act that reads unbalanced as a still.
4. **Scene 25's equation wraps its second term.** UNDERLYING UTILITY / PRODUCTIVE VALUE breaks across two lines with the slash opening the second. A legacy fact of the approved frame, untouched.
5. **The two items Session 1 left for the viewing still stand** — the fiat note's size in Scene 23's header band (noted, not ruled), and the exit's two wiring numbers with Scene 16's entry.
6. **The word pass still owns what the map's §4 lists**: the two self-reference substitutions, "in eleven words", the passage's pointers at the table, whether "Thank you." is spoken or only shown, and the premium line's unspaced dash.

# 7. The eleven-question scene test — all seven scenes, honest verdicts

Run per `docs/scene-test.md`: a verdict per scene per question, **pass** or **tension** with a one-line note. Questions 10 and 11 are answered by construction wherever a settled state is a presenter-approved cell — every settled state in this act is, and the batch proof pins each one at zero pixels. Tensions are flagged, never fixed.

| | S24 | S25 | S26 | S27 | S28 | S29 | S30 |
|---|---|---|---|---|---|---|---|
| 1 subject in one second | pass | pass | pass | pass | pass | pass | pass |
| 2 explains or decorates | pass | **tension** | pass | pass | pass | pass | pass |
| 3 could work with less text | pass | **tension** | **tension** | pass | pass | pass | pass |
| 4 discovering or being told | pass | pass | **tension** | pass | pass | **tension** | pass |
| 5 different because the idea is | pass | pass | pass | pass | pass | pass | pass |
| 6 previous transforms naturally | pass | pass | pass | pass | pass | pass | pass |
| 7 creates the next question | pass | pass | pass | pass | pass | n/a — it answers | pass |
| 8 orange carries meaning | pass | pass | pass | pass | pass | pass | pass (absent by rule) |
| 9 survives without the notes | pass | pass | pass | pass | pass | pass | **tension** |
| 10 world-class as a still | by construction | by construction | by construction | by construction | by construction | by construction | by construction |
| 11 key frame feels intentional | by construction | by construction | by construction | by construction | by construction | by construction | by construction |

**The tensions, in full sentences.**

- **S25, question 2.** The premium is meant to be light on the object; on a rectangular render the drop-shadow's silhouette is the render's box, so the halo reads as a soft rectangle around each mark. The idea still lands — the three marks visibly gain something the beat before did not have — but the form is closer to the boxed tile R7.1 retired than the frame intends. §6 item 2.
- **S25, question 3.** The frame carries the equation's five terms, three renders with two labels each, a shared label and a supporting line — eleven text elements at once. It is the densest frame in the act, and the act's law is that each scene holds fewer things than the last.
- **S26, question 3.** Nine beats is the act's longest scene, and beats 6–9 restate in three sentences what beat 5 states in one. The legacy needed the repetition because it was two slides; merged into one scene, the last four beats read as a list.
- **S26, question 4.** The four roles are told rather than discovered: each statement arrives above its render already complete. The scene's discovery is the reframe at beat 5, which the first four beats set up rather than earn.
- **S29, question 4.** The four summary lines are the argument recapitulated, not rediscovered — by design, since the discovery already happened across Acts I–IV. Recorded as a tension because the question asks it honestly, not because the frame is wrong.
- **S30, question 9.** The silence beat is black. Without the spoken callback there is nothing on screen at all, so the frame cannot survive its notes — which is exactly what a scripted black beat is, and the master permits it (§3.5). Recorded rather than waved away.

**Question 7 at S29** is marked *n/a — it answers*: Scene 29 is the true final frame of the argument (master §3.7), and its job is to close the loop rather than open the next question. Scene 30 then asks nothing and releases.

**The retelling test** is the presenter's, at the viewing.

# 8. The presenter's review — the viewing protocol

**The act viewing is the gate for the batch — and this time, keep going.**

**First, the act.** From Scene 23's closing line — the fifty scores, the render band, *Don't trust. Verify.* — forward at speaking pace, without stopping: the migration (fiat with its two jobs, the demand to save, the lane and its three destinations); the premium (the equation assembling, the halo, the closing pair); the other assets (four roles, the three coexistence statements, the law — and the falsifiability passage spoken over that last frame); the marginal decision (one claim, five paths, the supporting line); the field returning (the margin, the demand arriving, the repricing — the hours field's rhyme, running on the same component); the case (four lines, then the conclusion alone); the silence; and the two words.

**Then the film.** Walk the whole thing once, black to black, without stopping. It is thirty-one scenes and 164 beats, and this is the first time it has ever been possible.

**What to watch for, since it is the only thing this session cannot judge for you:** whether the descent reads — whether each scene holds fewer things than the one before it, and whether the last thing standing is a sentence.

**The word that closes the batch is yours.** With it, the film is whole. What remains is the GATE, the voice pass, and the recording.

# 9. Recommended next step

**The act viewing, then the full-film walk** — and on your word, the batch closes. The GATE is the next session's own brief; nothing in this batch begins it.
