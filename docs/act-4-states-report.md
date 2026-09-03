# Act IV States — Session Report
## The eight rulings recorded · the seam closed · the waypoint retired · the frozen argument rendered as stills

**Session:** act-4-states (Session 2 of `docs/act-4-kickoff-brief.md`) · 3 September 2026 · prior tag `act-4-foundation` · tag on completion **`act-4-states`**.

## Mode

**FAST — lean scope.** Exactly the checks the brief lists ran, plus the splice's boundary check the presenter asked for. They are: the per-cell checks on all 43 cells, the production build, the boot smoke, the boundary proof both ways, commit granularity, the clean tree, the tag, this report. Nothing else ran. The deck-wide suites, the direct-entry matrix, the register and brightness audits, and the freeze checks are the GATE's, before the recording merge. A report that does not name its mode is claiming the strong one; this one is FAST.

## Implemented

**The rulings, recorded first.** Each one is its own commit in the master's freeze register (§13), with the trail written where it lands. Nothing on the sheet was touched until all eight were in.

1. **Row 1 = A.** The candidate lineup ports whole before the table. S23-F1 is PORT. No ADAPT enters the map and no candidate is generated.
2. **Row 2 = A.** The phrase-under-a-lens beat is retired. Scene 16 stays the homecoming. The legacy 4-01 slide stays in the deck until the Batch D splice retires it with the rest of the Section 4 sources.
3. **Row 3 = A.** The four claim-and-carrier beats close Scene 16, the crescendo included. S16 is 8 beats, S17 is 5. With this row the map is RULED: 21 PORT · 0 ADAPT · 0 NEW · 2 retired.
4. **The legacy waypoint 3-08 is retired from the deck.** It was the ruling Batch C asked for. The file stays on disk. The deck goes from 39 slides to 38.
5. **Scene 15 stands at 7 beats.** The kickoff brief's "8" is corrected in place with a pointer to the row. The discrepancy the foundation report recorded is closed.
6. **Scene 22 stands at the default.** Four advances, three compositions. With this row the Act IV beat maps are frozen at 43.
7. **The two dead pointer sentences in Scene 23's stability armor are cut.** Nothing is written in their place. The cuts are in the adaptation ledger and the harness applies them.
8. **Scene 16 beat 1's join is written.** The return line, then your bridge sentence, then the legacy passage uncut from "this is the moment to pay a debt" onward. The four pre-spoken sentences are cut. The seam marker is gone from the package.

**The seam closed.** The installed Scene 16 beat 1 now reads: *"We left this exchange open. What has to survive until we close it? The surgeon is still holding the claim he accepted that day. And this is the moment to pay a debt — because a few minutes ago I asked you to hold a question: every layer is a claim on the layer below, so what is the bottom layer a claim on? Here is the answer."* The installation harness assembles that from the legacy notes through the ledger and proves it word for word and character for character. One mechanical reading is recorded, not decided: the legacy sentence opens with *And*. The package keeps that word so no legacy character is altered. If you meant the sentence to begin at *This*, it is one word.

**The waypoint retired, with proofs.** The manifest entry for 3-08 leaves. Old and new counts are stated in the manifest and in the register: 39 slides before, 38 after. The function section keeps 3-00 and 3-04, still flagged and still yours to rule. The boundary is proven through the live deck both ways. Forward: from 3-04 at build 0, through its two builds, one more advance lands on 4-01 at build 0. Backward, as the engine defines it outside a scene group: the left arrow from 4-01 lands on 3-04 at build 0, and the jump-to-end key lands on 3-04 at its last build. The retired id's deep link falls back to the first slide, which is the engine's rule for any unknown id. The act's exit is unchanged: one advance from the tower's last beat lands on 3-00.

**The sheet.** All 43 settled states of Scenes 16–23 are rendered into `review/act-4/states/` as the flipbook (`sheet.html`) and the record (`states.json`). Every cell is a PORT and the sheet designed nothing. Each cell mounts the legacy slide module itself at the build the ruled map names, through the same render, enter and build calls the deck runs, and the legacy stylesheet places every element. The homecoming cell mounts the film's own Act I stage at Scene 4's approved save state through the stage's own state law. A check gates that at the source: the builders create exactly one element, the stage container. No candidates exist anywhere. Cell classes: **32 approved by provenance · 11 pending review**, each pending cell carrying a plain-English flag.

**The homecoming.** s16-b1 is the approved s4-b4-b at zero differing pixels, measured across all 2,073,600 of them. The claim rests on the save road, the terminal is dissolved, the road draws on into black, and the spend road sits subdued on the left. The return line and your join are spoken over it. The recede to the claim alone is the gesture into beat 2, where the definition lands over the disc released to the fork's apex. That apex is the legacy's own release point, so the disc travels from its rest on the save road to the very point it rose to before it took the road.

## Files changed

- `docs/what-is-money-master.md` — eight new §13 rows, one per ruling, each with its trail.
- `docs/act-4-provenance.md` — status RULED; the S23-F1 row PORT; the lens row retired; the three §2 rows closed with their rulings; §4 seams 2, 3, 4 and 8 closed; §5 amended.
- `docs/batch-d-package.md` — §1 frozen at 43 with the rulings recorded in its table; §1.1 the ledger grown to seven entries (five substitutions, two cuts) with the join recorded before and after; §1.2 seams 1, 2 and 3 closed; §2 the join installed and the seam marker gone, the two armor sentences cut; §4 ruled.
- `docs/act-4-kickoff-brief.md` — Part A §3's "S15 = 8" struck in place with a pointer.
- `docs/batch-c-package.md` — §1's parenthetical closed.
- `src/slides/manifest.js` — the 3-08 import and entry removed; the Act IV foundation block records the ruling; the deck at 38. **The only `src/` change.**
- `review/act-4/harness/script-install.cjs` — the ledger carries the join and the two cuts; the JOIN and ARMOR checks; the deck list drops 3-08. `review/act-4/script-install.json` re-cut, 25/25.
- `review/act-4/harness/smoke-deck.cjs` + `review/act-4/smoke-deck.json` — the boot smoke and the boundary proof.
- `review/act-4/harness/states.mjs`, `capture-states.cjs`, `check-cells.cjs` + `check-cells.json` — the sheet pipeline.
- `review/act-4/states/` — 43 PNGs, `sheet.html`, `states.json`.
- This report.

**Out of scope, changed anyway: none.** No Act I, II or III scene, no Act IV scene module, no legacy slide file, no frozen data file, no wording beyond the ruled changes.

**Commits, in order:**

```
d60b611  record(act-4 ruling 1)   Row 1 = A — the candidate lineup ports whole
0ae7c35  record(act-4 ruling 2)   Row 2 = A — the lens retired
576193a  record(act-4 ruling 3)   Row 3 = A — 4-06 closes Scene 16; the map RULED
1b5a136  record(act-4 ruling 4)   3-08 retired from the deck
76912af  record(act-4 ruling 5)   Scene 15 stands at 7
7ae3f4e  record(act-4 ruling 6)   Scene 22 at the default; the maps frozen at 43
d31e965  record(act-4 ruling 7)   the two dead pointer sentences cut
b6349a1  record(act-4 ruling 8)   Scene 16 b1's join written; the seam closed
78ef56a  splice(act-4 foundation) 3-08 leaves the deck — 39 → 38
a3fd301  review(act-4)            the splice proof, both ways
b6b483c  sheet(act-4)             the beat-state sheet — 43 cells
7e1b818  review(act-4)            the per-cell checks — 24/24
2606d83  review(act-4)            the closing boot smoke
```
Plus this report. **Tag `act-4-states`** at the report commit.

## Validation

- `review/act-4/harness/script-install.cjs` — **25/25 green.** The installed scripts are the legacy notes with exactly the seven-entry ledger applied, word for word and character for character. Every scene's advance count is the frozen map, 43 in all. The join is verified: the return line, the bridge, the passage from "And this is the moment to pay a debt"; the cut span absent from the package and present once in the legacy source; the bridge sentence once, and nowhere in the legacy. The two armor cuts are verified the same way. The protected lines stand as before. The frozen data is unchanged. The virginity grep is clean across 28 files, and the only horizon mention left before Act IV is Scene 9's honesty line.
- `review/act-4/harness/smoke-deck.cjs` — **9/9 green, run twice** (after the splice and at the close): 38 slides in the spliced order; the function section at two; 3-08 absent and its deep link falling back; the boundary forward, by the left arrow, and by the jump-to-end key; the act's exit unchanged; 0 console errors.
- `review/act-4/harness/capture-states.cjs` — 43 cells captured, **103 probes green**, 0 console errors. A probe counts the elements a still is asserted to show, measured in the mounted DOM: the fifty revealed scores, the ten mapped rows, the four statements, the released claim, the shell's future focus, and so on.
- `review/act-4/harness/check-cells.cjs` — **24/24 green.** All 43 cells at corner and border 0 luminance, content present, 1920 × 1080. The map RULED and every transcribed PORT frame agreeing with it; no ARGUABLE class left; the two retired rows recorded. Every beat of the frozen map exactly once. No candidate system. The two review classes only; every pending cell flagged and every flag on a pending cell. The source gate: one element created, twelve legacy modules plus the Act I stage imported and nothing else, every builder a mount or the homecoming. The homecoming at **0 of 2,073,600 pixels differing** from the approved s4-b4-b, and its recorded state equal to Scene 4's save state read from the stage's own geometry law. The two frozen data files at the blob ids the map records, the working tree carrying no change to them. The splice smoke on file green.
- `npm run build` — **clean.**
- The sheet was walked visually during the session, scene by scene, at 1920 × 1080. Two legacy facts were found at the walk and flagged rather than fixed; both were checked against the live deck and the deck renders them the same way. They are listed below.
- Notes status: no scene notes changed. The installed scripts live in the package and changed only by the rulings. Reduced motion: not applicable to stills; deferred to implementation as always.

**Not run, and not claimed:** the deck-wide register, brightness and composition audits; the freeze-check suites; the full-deck traversal; the direct-entry matrix; the second-window notes check. Those are the GATE's.

## Flagged, not improvised

Every flag is on its cell in plain English and gathered at the top of the sheet. The eleven, in short.

- **s16-b1** — the entry seam. The whole fork returns at rest, both roads, rather than the save road with the held claim alone. The pair beneath it does not return and no words are put on the frame, because the return line is spoken and no legacy treatment carries it on screen. The recede to the claim alone is the gesture into beat 2, not a settled state. Each of the three is one word to change.
- **s16-b2** — the definition stands at the legacy's build-3 composition, the scene gone and the headline risen. The legacy landed the sentence low first, under the still-present exchange; in the film that scene is Scene 4's fork and it recedes during beat 1. One word lands the definition low first instead. The disc's travel from the save road to the apex, and its size, are wiring.
- **s16-b3** — beat 2's frame, held. The legacy has one state fewer here than the film has beats. The social claim lands in the spoken word alone. A landed line would be a NEW element, and the map names none.
- **s16-b5** — the disc re-centers and returns to its shell size between beat 4 and beat 5. One number places it.
- **s16-b6** — the BITCOIN position in the carrier lineage carries a photograph of a physical coin, the legacy source's own V-1 flag, restored by your R7.2 ruling and carried as ruled. One word returns it to the grammar mark.
- **s19-b1** — 4-10's build 0, the governing question with the direct framing beneath it, has no spoken advance once the slides are one act. It is either the first movement of this beat's gesture or skipped.
- **s19-b2** — a legacy fact found at the walk: since R7.4 deleted the corner brackets, Scene 19's two beats share one still. The carrier stands on the bench from the moment the inversion lands. If you want it to arrive on beat 2, that is one word in the source's state, a ruled change on a proven treatment.
- **s22-b1** — 4-13's build 0, all ten failures standing unmapped, is the composition the first sweep starts from, with no advance of its own.
- **s22-b3** — the grid gives way to the two-column list with no legacy morph between them; the two compositions are the legacy's, untouched.
- **s23-b5** — the empty table has no advance of its own once 4-15 and 4-16 are one scene. It enters with beat 4's recede or as the first movement of the scores' gesture. And a legacy fact found at the walk: the kicker THE COMPARISON and the MONETARY ASSETS group label stack with no air between them, in the deck as here. One number opens the gap.
- **s23-b6** — the same tight stack under the closing line.

**Missing renders: none.** Every subject the act needs is in the shipping register, the five candidates included.

## Remaining judgment calls

- **The eleven pending cells** await your verdicts at the flipbook walk, each "as rendered" or one word that changes it. Nothing else on the sheet asks anything.
- **The join's one word.** The package keeps the legacy *And* at "And this is the moment to pay a debt". Say so if you meant *This*.
- **Two survivors still unruled.** 3-00 and 3-04 remain in the deck after the act, flagged since Batch C. The act still exits onto 3-00.
- **The 4-01 lens slide** stays in the deck until the Batch D splice, by the deletion rule. Its retirement from the film is ruled; its manifest entry leaves with the sources Act IV supersedes.
- Deferred to the GATE, per FAST: the deck-wide suites, the traversals, the audits.

## Recommended next step

**The flipbook walk.** Open `review/act-4/states/sheet.html` through the dev server and walk the act once as stills, in beat order: the return, the definition, the claim and its carrier, the test, the inversion, the failures, the requirements, the candidates, the fifty scores landing at once, the closing line. At every frame ask whether you can follow the argument by eye alone. Then return your verdicts on the eleven pending cells and the go-ahead. That unlocks Batch D implementation under the sizing law.
