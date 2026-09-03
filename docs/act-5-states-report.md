# Act V States — Session Report
## The seven rulings recorded · Scene 23 re-proven at its legacy pitch · the film's ending rendered as stills

**Session:** act-5-states (Session 2 of `docs/act-5-kickoff-brief.md`) · 4 September 2026 · prior tag `act-5-foundation` · tag on completion **`act-5-states`**.

## Mode

**FAST — lean scope.** Exactly the checks the established lean list names ran: the per-cell checks on all 27 cells, the production build, the boot smoke, commit granularity, the clean tree, the tag, this report. Plus the one proof the presenter asked for in the prompt: Scene 23 re-rendered and re-proven in the deck. Nothing else ran. The deck-wide suites, the direct-entry matrix, the register and brightness audits, and the freeze checks are the GATE's. A report that does not name its mode is claiming the strong one; this one is FAST.

## Implemented

**The rulings, recorded first.** Each one is its own commit in the master's freeze register (§13), with the trail written where it lands. Nothing on any sheet and nothing in the source was touched until all seven were in.

1. **Row 1 = A.** The three entry lines become beats. S24 = 4, S25 = 4, S27 = 3. Act V is 27.
2. **Row 2 = A.** The falsifiability passage is spoken over Scene 26's last frame, the coexistence law, with no advance. Scene 23 is not reopened.
3. **Row 3 = A.** The rules line sits before "The case is not that the price will behave." in Scene 29's second beat, as installed.
4. **Row 4 = A.** Scene 28's field is legacy 4-22's field, ported whole. The rhyme with P1 is structural. The four Scene 28 frames are PORT.
5. **Row 5 = A.** The savings vehicles stay renders in Scenes 24 and 25.
6. **Row 6 = A.** The silence is its own beat at the close. S30 = 2. With this row the map is **RULED**: 22 PORT, 1 ADAPT, 0 NEW, 1 retired. The beat maps are **frozen at 27**.
7. **Part A.** At Scene 23 the ten score rows return to the legacy 60 px pitch and the header band shrinks to a 100 by 100 box. The exit's two wiring numbers and Scene 16's entry stand as built, to be judged at the viewing.

**Scene 23, re-rendered and re-proven.** The change is at the source: the legacy 4-16 slide's band box is 100, the stylesheet places the band at 132 with the table beneath it at 244, and the 48 px rule is gone. The heading row stays at its label. The two table cells are re-rendered as the updated approved states. The landed proof mounts all six Scene 23 states cold through the real engine at their deck positions and compares each with its archived cell and with a fresh cell. All six match at zero differing pixels. The ruling's numbers are measured in the deck: ten rows at 60, the band 100 tall, the table's last row ending at 911 under the closing line at 930.

**The sheet.** All 27 settled states of Scenes 24–30 are rendered into `review/act-5/states/` as the flipbook and the record. Every cell mounts the legacy slide module itself at the build the ruled map names, through the same render, enter and build calls the deck runs, and the legacy stylesheet places every element. The harness creates one element, the stage container, and a check gates that at the source. No candidates exist anywhere. Cell classes: **21 approved by provenance, 6 pending review**, each pending cell carrying a plain-English flag. Every cell is built on a fresh page, so each still is the deck's own cold direct-entry frame by construction.

**The rhyme is real.** The Scene 28 cells mount legacy 4-22, whose field draws its thirty-five units with the grid renderer from the shared unit-field module, the same module P1's canvas draws its eighty thousand units from. The check reads the grammar from that module's source, derives the unit box and the gaps, and compares them with what the mounted grid actually carries. All three cells agree: a 102 by 62 pitch, units 84 by 46, gaps 18 and 16, seven by five. Both components stand at the blob ids the foundation recorded, untouched. The sheet stands the Prologue's approved P1 cell beside the three Scene 28 cells, shown from the Prologue's own record and not re-rendered, so the bookend can be seen at both ends.

**The close.** The silence cell is black by the map and the check asserts it: no pixel above the floor, no text. The last cell's visible text is read from the frame and is "Thank you." and nothing else. No medium, no sequel, no waypoint.

## Files changed

- `docs/what-is-money-master.md` — seven new §13 rows, one per ruling, each with its trail.
- `docs/act-5-provenance.md` — status RULED; the six §2 rows closed with their rulings; the table's ARGUABLE notes replaced by the rulings.
- `docs/batch-e-package.md` — §1 FROZEN at 27; the status line; §1.2's first seam closed.
- `docs/act-4-provenance.md` — the S23-F2 row records the fit ruling.
- `docs/dark-field-manifest.md` — the shares row's band appearance at the ruled box.
- `src/slides/section-4-ideal-store/16-the-comparison.js` · `src/styles/slides.css` — the fit ruling at the source. **The only `src/` change.**
- `review/act-4/harness/states.mjs`, `capture-states.cjs`, `check-cells.cjs` + `check-cells.json` — the ruling on the two cells; the record re-cut at this session.
- `review/act-4/states/` — s23-b5 and s23-b6 re-rendered; the sheet and record re-cut.
- `review/act-5/harness/proof-s23-band.cjs` + `review/act-5/landed-proof-s23-band.json` — the Scene 23 proof.
- `review/act-5/harness/states.mjs`, `capture-states.cjs`, `check-cells.cjs` + `check-cells.json`, `smoke-deck.cjs` + `review/act-5/smoke-deck.json` — the sheet pipeline, its checks, the smoke.
- `review/act-5/states/` — 27 PNGs, `sheet.html`, `states.json`.
- This report.

**Out of scope, changed anyway: none.** No Act I, II, III or IV scene module, no Act V scene, no frozen data file, no component, no wording beyond the rulings.

**Commits, in order:**

```
e106eaf  record(act-5 ruling 1)   Row 1 = A — the entry lines become beats; Act V is 27
7842436  record(act-5 ruling 2)   Row 2 = A — the passage over Scene 26's last frame
f14da69  record(act-5 ruling 3)   Row 3 = A — the rules line before "The case is not…"
9900232  record(act-5 ruling 4)   Row 4 = A — Scene 28's field ported whole
90a2f6f  record(act-5 ruling 5)   Row 5 = A — the renders stand in Scenes 24 and 25
678c14b  record(act-5 ruling 6)   Row 6 = A — the silence its own beat; the map RULED, 27 frozen
ad12f8d  record(part-a ruling)    Scene 23 — the legacy pitch returns, the band shrinks to 100
d102129  legacy(4-16)             the fit ruling at the source
f683acd  cells(act-4)             s23-b5 and s23-b6 re-rendered — 27/27
917c6f2  review(act-5)            the Scene 23 landed proof — 6/6 at zero pixels
98df6ad  sheet(act-5)             the beat-state sheet — 27 cells
4dc916f  review(act-5)            the per-cell checks — 41/41
cfd1942  review(act-5)            the closing boot smoke — 6/6
```
Plus this report. **Tag `act-5-states`** at the report commit.

## Validation

- `review/act-5/harness/capture-states.cjs` — 27 cells captured on fresh pages, **127 probes green**, 0 console errors. A probe counts the elements a still is asserted to show, measured in the mounted DOM: the four renders on the lane and the three claims at focus, the three halos, the four roles, the five assets, the five candidates in the compact box, the thirty-five units and the five at the margin, the two bold terms, the one line on black.
- `review/act-5/harness/check-cells.cjs` — **41/41 green.** All 27 cells at corner and border 0 luminance and 1920 × 1080; 26 with content present and the silence black. The map RULED and every transcribed frame agreeing with it, no ARGUABLE class or note left, the one retired row recorded, the package frozen at 27. Every beat exactly once. No candidate system. The two review classes only; every pending cell flagged, every flag on a pending cell, every flag in full sentences; the one ADAPT cell pending with its change named. The rhyme from the source: the mounted grid's geometry equals the grammar's derivation, the two components import from one file and stand at the recorded blob ids, the P1 cell is the Prologue's approved cell for its beat. The close's frame black and its last text two words. The source gate: one element created, eight legacy modules imported and nothing else, every builder a mount. The comparison data at its recorded blob id. Scene 23's proof green, the Act IV record green and re-cut, the source carrying the ruling.
- `review/act-5/harness/proof-s23-band.cjs` — **6/6 states at zero differing pixels**, three comparisons each, mounted cold at the deck position in the 32-slide deck; the ruling's geometry measured; 0 console errors.
- `review/act-4/harness/check-cells.cjs` — **27/27 green** after the two cells re-rendered.
- `review/act-5/harness/smoke-deck.cjs` — **6/6 green**: the deck boots at 32 slides; the eight Act V sources follow Scene 23 directly, the close last; Scene 23 direct-enters at its closing line with the band's five renders, ten rows at 60, fifty scores and the line; the eight sources walk forward through all 35 legacy states to "Thank you."; 0 console errors.
- `npm run build` — **clean.**
- The sheet was walked visually during the session, scene by scene, at 1920 × 1080: the migration, the premium, the other assets, the marginal decision, the field, the case, the close, and the re-rendered table. One legacy fact was found at the walk and flagged rather than fixed; it is listed below.
- Notes status: no scene notes changed. The installed scripts live in the package and changed only by the rulings. Reduced motion: not applicable to stills; deferred to implementation as always.

**One harness defect found and fixed in-session, recorded rather than smoothed.** The first run of the Scene 23 proof built its six fresh cells one after another on a single page, and the two table cells differed from the archive by 8,289 pixels inside the band alone, while the deck's own cold mount matched the archive at zero. Measured at every delay from 400 ms to 5 s, the difference held when the cell followed the four lineup cells and vanished when the cell was built alone. The cause is the browser's image cache: after the lineup draws the five subjects at the 180 by 150 display box, the band's draw of the same subjects at the 100 box resamples from that cached raster. The proof and the Act V capture now build every cell on a fresh page, which is the cold mount the deck performs, and the proof passed at zero. Act V draws the same five subjects at three box sizes, so this matters for every landed-state proof Batch E will run; the harness headers record it.

**Recorded, not widened.** The acts-3-4-final static gate asserts the 48 px pitch under the band attribute and a 188 box in the legacy 4-16 source. Both are that session's evidence at its tag. Neither was re-run or edited; the fit ruling supersedes those two checks, and re-baselining that gate is the GATE's.

**Not run, and not claimed:** the deck-wide register, brightness and composition audits; the freeze-check suites; the full-deck traversal; the direct-entry matrix; the second-window notes check. Those are the GATE's.

## Flagged, not improvised

Every flag is on its cell in plain English and gathered at the top of the sheet. The six, in short.

- **s24-b1** — the entry seam. Act IV ends on the fifty scores with the band above the table; this frame is fiat standing alone at the left with its two jobs. The legacy played the boundary as its own crossfade and Batch E plays it the same way. The fiat note's box is the 180 by 150 display box the register frames it in, carried as Act IV approved it. Both are wiring.
- **s26-b6** — the merge point inside Scene 26. The four roles and their final line give way to the first coexistence statement with two assets beneath it. The legacy played that as a slide crossfade, and 4-20's build 0 is empty. Inside one scene the boundary is Batch E's to time; the settled frame does not change.
- **s27-b1** — a legacy fact found at the sheet. The map's row describes this frame as the claim alone, and the next row lands the question with the paths. Legacy 4-21 stands the question from its entry frame; the claim and the question are the entry, and the paths and candidates arrive at beat 2. Rendered as the legacy renders it. If you want the question to land with the paths, that is one word in the source's state, a ruled change on a proven treatment.
- **s28-b1** — two wiring readings. The stock at rest, 4-22's build 0, has no spoken advance once the boundary from Scene 27 lands on it; it is the composition this beat's gesture starts from. And the claim's last journey: Scene 27's one decision claim at 116 gives way to three demand claims at 44 arriving from the right. Batch E wires the continuity; each end is rendered as the legacy renders it.
- **s29-b1** — the full clear. Scene 28's world clears completely before the kicker lands, and 4-23's build 0, the kicker alone on black, is the composition the clear lands on. Batch E times it; the settled frame does not change. The kicker is carried as the frozen frame carries it.
- **s30-b1** — the one ADAPT cell. The legacy's first build brought the method line back with all three waypoints completed; that device is retired, so the beat is the black the legacy always started from, with the sentence that named the road cut from the script and nothing written in its place. The cell mounts the legacy at build 0, a state the legacy already performs.

**Also to see at the viewing, not on a pending cell.** At the 100 box the fiat note in Scene 23's band reads small, by the register's own framing of that render. The box caps both axes at 100, the rails law's equal-weight form at the ruled height; if you meant only the height, the wide renders can take up to 188 of width at one number.

**Missing renders: none.** Every subject the act needs is in the shipping register.

## Remaining judgment calls

- **The six pending cells** await your verdicts at the flipbook walk, each "as rendered" or one word that changes it. Nothing else on the sheet asks anything.
- **The word pass** owns what the map's §4 lists: the two self-reference substitutions, "in eleven words", the passage's pointers at the table, whether "Thank you." is spoken or only shown, the premium line's unspaced dash.
- **The exit's two wiring numbers and Scene 16's entry** stand as built, by your ruling, until the act viewing.
- Deferred to the GATE, per FAST: the deck-wide suites, the traversals, the audits, and the re-baseline of the acts-3-4-final static gate's two superseded checks.

## Recommended next step

**The flipbook walk.** Open `review/act-5/states/sheet.html` through the dev server and walk the film's ending once as stills, in beat order: the migration, the premium, the other assets, the marginal decision, the field returning with the hours field beside it, the case, the silence. At every frame ask whether you can follow the argument by eye alone. Then return your verdicts on the six pending cells and the go-ahead. That unlocks Batch E implementation.
