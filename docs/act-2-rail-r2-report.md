# Act II Rail — r2 · Report
## Six rulings executed: the rail fills left to right, the claim steps off, the vault folds in, the network grows out of the ledger

**Mode: FAST — and deliberately lean, as ordered.** The verification run is exactly the brief's §4 list; no unrequested check was added, and none of the requested ones was skipped.
**Branch:** `film-rebuild`. **Prior tag:** `act-2-rail-states`. **Tag:** `act-2-rail-r2`.
**Date:** 1 September 2026.

---

# 1. How to review this — the flipbook protocol, in plain English

Open **`review/act-2/rail/sheet.html`** and walk it top to bottom once, like a flipbook of the act. It is the same thirty-nine cells in the same order — every settled state of Act II's 37 beats, in the order the film plays them — with your six rulings applied to every one of them.

Three things should now be true of every frame, and they are the three you asked for:

1. **The rail fills left to right, like history being written.** SHELLS stands first, at the far left, and nothing ever lands to the left of a station already standing. Watch the record grow rightward from beat one to beat thirty-nine and never fold back on itself.
2. **Every station has a line beneath it.** No station stands blank at any beat — the shells and the metals carry their virtues in your script's own words until a wound replaces them, and the architecture stations carry their sentence at their arrival beat and their record afterward.
3. **There is no white ball anywhere.** The claim disc appears in no Act II rail beat.

If all three hold from the first frame to the last, **that is the go-ahead, and it sends Act II to implementation.** If any frame breaks the thread, name that frame and it comes back re-staged. There are no candidates on this sheet — this is your ruled staging, rendered. The nine places a ruling genuinely underdetermined a composition each got exactly one honest rendering and are named in plain English in §6 below; none of them is a candidate set, and none of them blocks the go-ahead.

# 2. The records (§1 of the brief), each its own commit

| # | Record | Where | Commit |
|---|---|---|---|
| 1 | **The fill-order ruling** — narrative order is spatial order; the rail fills strictly left to right and nothing lands to the left of a standing station; SHELLS first; Zanzibar returns to the far-left shells. Recorded with it: **the rail is a competition record, not a chronology** — the only dates on it are the featured facts | `AGENTS.md` §6 (film-wide, beside the rails law) · the amendment's new r2 section · master §13 row for the ruling set | `cefa1ac` |
| 2 | **The arrival-line rule** — an undefeated station is never blank; every station arrives with a line beneath it, always. Standing = the virtue at the station's own voice, in the installed script's own words; fallen = the wound at the dimmed-prior step | `AGENTS.md` §6 (beside the survival-brightness ruling) · the amendment's r2 section | `7fba6a8` |
| 3 | **The claim steps off the Act II rail**, and the gate criterion moves with it: **the collapsed Gate 3's judgment object becomes the rail's own continuity**, which the act viewing judges. The claim's on-screen thread resumes in Act III and at Act IV's return | the amendment's r2 section · `AGENTS.md` §7 (the Claim Mark's Act II state) · master §14 (the struck gate's judgment object annotated) | `008a93d` |
| 4 | **The vault folds into the rail** — the standalone overlay retired to file, render banked; b3 stages the certificate's arrival, the dependency line back to gold, and the vault line as the featured line at full voice; b4 keeps the line in the record. S7 stays 5 beats; the script is untouched; Act II's interludes drop from six to five | the amendment's r2 section, with the map's own overlay list, S7 b3/b4 rows and survives-untouched line amended · `docs/act-2-provenance.md` rows S7-F1 and S7-F2 annotated | `9609212` |
| 5 | **The band rule becomes equal visual weight** — one shared box, height *and* width capped at **188 × 188 world**, every render in a box of its own aspect scaled to fit inside it. **Re-measured and recorded in the band's law entry** | `AGENTS.md` §6 (the rails law's band entry) · the amendment's r2 section | `81eec32` |
| 6 | **The network forms out of the LEDGER station** — the hub dissolves, the mesh stays anchored where the ledger stood, the approved `s9-b1-a` geometry reused with only its origin and anchoring changed. **Palladium's placement confirmed as staged**, closing the question | the amendment's r2 section, with the S9 b1 row annotated | `cee2e18` |
| 7 | **`coinage` gated and ingested** — moved to the drop zone, graded, and moved across by `ingest-r7-2.cjs`. **5 clauses of 5**; post-ingest shipping set **25 images, 125 checks, 0 failures**; framing row `coinage: [1.44, 1.1, -1.3]` | `assets/dark-field/coinage.png` · `src/dark-field.js` · `docs/dark-field-manifest.md` · evidence `review/act-2/grade-coinage-drop.json` + `grade-shipping-set-rail-r2.json` | `7398a56` |

**On the coinage ingest.** The study is a small pile of ancient hammered gold and silver coins, and it passes every clause with a single key (corner 0.09, border 0.07, 78.8% dark, R−B +102.3, warm fraction 99.2%, spread 0.99). Its frame is **1672 × 941 — the near-16:9 family**, so it joins `fiat`, `metals` and `gold` there. **This closes the register's last gap, and it was a gap the spine itself created**: the rails law makes every station photographic, and the staging amendment made COINAGE a station. **No code change lit it** — the eager glob and the pending stub are exactly what that pipeline was built for; the only edit was the measured framing row. One process note: `ingest-r7-2.cjs` writes its grade run to R7.2's own default path, so R7.2's `grade-r7-2.json` was restored from git after the move, and this session's evidence lives under `review/act-2/` like the gold drop's before it.

# 3. The build

**The composition system** (`review/act-2/harness/rail.mjs`, commit `4a9b01c`): the same one world, one camera, one grammar — amended where a ruling reaches it and nowhere else. The stop assignment reorders while the legacy `EvolutionRail` **stop positions stay untouched**, so the spine's geometry is still the legacy's; `VIRTUE` and `NOTE` join `WOUND` and `PAIR` as row sources, all verbatim from the record; `bandBox()` contain-fits every render into one 188 × 188 world box; the `ClaimObject` import is gone; `mesh()` carries the approved `s9-b1-a` geometry transcribed line for line, with its origin moved onto the LEDGER station; and `rail()` gains one `lit` station that rides outside the recession — the mechanism the traveler used before it stepped off, with a new occupant.

**The sheet** (`review/act-2/rail/`, commit `49fd9ce`): **39 cells over 37 beats — 33 re-rendered, 6 carried byte-identical**, unchanged counts from the sheet you walked. `sheet.html` is re-cut in beat order with the r2 protocol at the top in plain English; `states.json` records the seven rulings in place of the retired claim path.

**One defect found and fixed inside the pass, and it is worth naming because it is the ruling's own edge.** With SHELLS moved to the far-left station and the arrival-line rule applied literally, S5 b6 printed the Zanzibar wound **twice** — once as the station's row and once as the dated-fact block landing beside it — and the five-line row ran straight into the block's place kicker. The wound *is* that beat's landing sentence. So the station carries the dated block on b6 and the row settles from b7, which is the arrival-line rule's own landing clause rather than an exception to it. Named again as flag 7 below, because the same reading governs every architecture station's arrival beat.

# 4. Files changed

## New
| file | what |
|---|---|
| `docs/act-2-rail-r2-brief.md` · this report | the brief as placed, and the report |
| `assets/dark-field/coinage.png` | the ingested coinage study (1672 × 941) |
| `review/act-2/grade-coinage-drop.json` · `grade-shipping-set-rail-r2.json` | the gate evidence — drop zone 5/5; full set 25 images, 125 checks, 0 failures |
| `review/act-2/harness/proof-rail-r2.cjs` · `review/act-2/proof-rail-r2.json` | the byte-identity proof — 44 files, 0 failures |

## Modified
| file | what |
|---|---|
| `AGENTS.md` | §6 — the fill-order ruling, the arrival-line rule, and the band's equal-visual-weight amendment with its re-measured box; §7 — the Claim Mark's Act II state |
| `docs/what-is-money-master.md` | §13 — the r2 ruling-set row; §14 — the struck Gate 3's judgment object amended |
| `docs/act-2-staging-amendment.md` | the r2 section added; the spine line, the overlay list, the S7 b3/b4 and S9 b1 rows, and the survives-untouched line amended where a ruling supersedes them |
| `docs/act-2-provenance.md` | rows S7-F1 and S7-F2 annotated — retired to file, banked, not to be re-staged |
| `docs/dark-field-manifest.md` | the rail r2 drop block; the shipping count 24 → 25; the summary's gap note |
| `src/dark-field.js` | the measured `coinage` framing row and the aspect-family note — **the session's one `src/` change** |
| `review/act-2/harness/rail.mjs` · `capture-rail.cjs` | the six rulings in the builders; the sheet's protocol text and `states.json` record |
| `review/act-2/rail/` | 33 re-rendered PNGs · `sheet.html` · `states.json` (the 6 carried PNGs do not appear in the diff at all) |
| `review/act-2/harness/check-rail-cells.cjs` · `.json` · `smoke-rail-boot.cjs` · `review/act-2/smoke-rail-boot.json` | the two checks re-run and re-labelled for r2 |

**Out of scope, changed anyway: none.** No scene rewiring, no deck or manifest splice, no motion, no design candidates, no Act I or Act III work, no deck-wide verification. The provenance annotation is part of recording ruling 4, not separate work: without it the next session reads a retired frame as a live one.

## Commits and tag

```
290944c  docs: the Act II rail r2 brief arrives
cefa1ac  docs: ruling 1 - the fill-order ruling recorded, narrative order is spatial order
7fba6a8  docs: ruling 2 - every station arrives with a line beneath it, always
008a93d  docs: ruling 3 - the claim steps off the Act II rail, and the gate criterion moves with it
9609212  docs: ruling 4 - the vault folds into the rail, the standalone overlay retired to file
81eec32  docs: ruling 5 - the band rule becomes equal visual weight, the box re-measured
cee2e18  docs: ruling 6 - the network forms out of the LEDGER station, palladium confirmed as staged
7398a56  assets: coinage gated and ingested - 5 clauses of 5, the register's last gap closed
4a9b01c  review(act-2): the rail composition system carries the six rulings
49fd9ce  review(act-2): the rail sheet re-cut - 39 cells, 33 re-rendered, 6 carried untouched, 0 console errors
fea4137  review(act-2): the rail cell checks re-run - 33/33 green on the r2 re-render
ce26e80  review(act-2): the byte-identity proof - 44 files, 0 failures
f903630  review(act-2): the boot smoke - 39 slides, 0 errors, coinage live in the register, build clean
```
Plus this report's commit. **Tag: `act-2-rail-r2`** at the report commit.

# 5. Validation (the brief's §4 list, complete, nothing more)

| check | result |
|---|---|
| **Gate evidence for coinage** | drop zone **5 clauses of 5** (corner 0.09, border 0.07, 78.8% dark, R−B +102.3, warm 99.2%, one key at spread 0.99, key azimuth −172°); post-ingest full shipping set **25 images, 125 checks, 0 failures**. No existing framing row drifted — `coinage` is the one new row |
| **Per-cell checks on the re-rendered cells** | **33/33 green** — corner 0.00, border 0.00, content present, 1920 × 1080 on every one |
| **Byte-identity on the untouched overlay interiors** | **44 files, 0 failures** — 6 carried cells byte-identical to *both* their approved states-sheet source *and* their bytes at the tag; the 4 approved interiors whose builders the seams run unmoved since the tag; the retired vault cell banked byte-identical; and all 33 ruled cells proven to have actually moved. Nothing at the tag is missing from the sheet |
| `npm run build` | **clean** — `coinage` emitted into `dist/` |
| **One boot smoke** | **39 slides · 0 console errors** — prologue 2 · act-1 3 · act-2 6 · function 8 · ideal-store 19 · close 1, with the new render live in the register |
| **Capture console** | **0 errors** across all 33 renders |
| **Commit granularity / tree / tag** | each record and each construction its own commit; tree clean at every stop; `act-2-rail-r2` cut |

Notes status: no scene module was touched, so no notes moved. Reduced-motion status: no motion was built (stills only), so there is nothing to check; parity remains guaranteed by the standing Batch B evidence and re-proves at the GATE.

# 6. Flagged, not improvised — where a ruling underdetermined the staging

Each of these got **exactly one rendering and a plain-English note**. None is a candidate set, and none blocks your go-ahead — each is one small change if you want it different.

1. **What "the featured line at full voice" means in register.** Ruling 4 says the vault line lands as *the featured line*. The film's featured-moment register is the dated-fact typography — a 128px date over a place kicker — and this sentence has no date, so that grammar cannot carry it. It is rendered once in the deck's statement register at 36px, anchored at the CLAIM ON GOLD station, at full voice: the same register and roughly the same size the act's other station arrivals use (coinage 36, gold 40, ledger 40). If "featured" should mean *larger than the other arrivals*, that is one number.

2. **What beat 4 carries, now that there is no overlay to return from.** The ruling gives b3 the arrival, the line and the sentence, and says the dependency line persists from that beat onward. It does not say what else b4 shows. Rendered once as: the same rail, the line still drawn, and beat 3's sentence **settled into the CLAIM ON GOLD station's own row** at full voice — the latest sentence on the record under §9.4 rule 10, and the same move coinage's note makes at S7 b2. On the sheet, b3 and b4 read as a sentence condensing into the record, which is what the beat is about. If b4 should carry something more, name it.

3. **The dependency line's route had to move, and the ruling's word for it is "arcs".** The r1 line ran through the band's lower airspace and passed beneath the coinage station's *pending stub*. Coinage now has a photograph standing exactly there, so that route would cross it. It is rendered once as a shallow arc through the corridor between the band's baseline and the rail line — **the airspace the traveler vacated when the claim stepped off** — terminating at each station's band baseline, in the service path's own unchanged grammar (stroke 1.5 at 0.35, dot terminals 3.5 at 0.7). It clears every render and never touches the line. If the dependency should be the straight tie the retired candidate's own note distinguishes from a travel curve, it is one line of code.

4. **The mesh is drawn at the rail's scale, not at its approved absolute size.** Ruling 6 says the geometry is reused and only the origin and anchoring change. Anchored to a station on a camera-scaled rail, it is necessarily drawn at that camera's scale: at the S9 b1 camera it renders at 0.53 of the approved cell's size (radius 176 stage px rather than 330). Every angle, every chord, the seed, the draw order and all four voices are the approved cell's. The alternative — the mesh at its full approved size — runs off the frame at the ledger's position and reads as a diagram pasted over the rail rather than one that grew out of it.

5. **The record still recedes to the deep dim at the network seam, but one station stays lit.** The other four interludes take the whole rail to the legacy 0.08. If S9 b1 did the same, *"anchored where the ledger stood"* would be unreadable — you cannot see the station it grew from. Rendered once with the record at that same deep dim and **the LEDGER station alone outside the recession** at its own voice: its render and label lit, its gain/dependency rows receding with the rest of the record, and **its dot omitted so the mesh's own hub stands in its place** — which is what "the hub dissolves" can mean on a still.

6. **Whether the mesh is still on screen when the coin arrives.** The ruling's sentence — *"the mesh remains anchored where the ledger stood, the rail returns, and the coin takes its station beside it"* — can be read as the mesh persisting into beat 2. The ruling's own scope names the S9 **b1** overlay, and the amendment already gives beat 2 to the arrival ("the return with the answer landed is beat 2: the arrival itself"). Rendered once with the mesh belonging to beat 1, and beat 2 showing the rail returned with BITCOIN at its station. If the mesh should still be drawn at the ledger's place in beat 2, it is one line.

7. **What an architecture station's arrival line is, when its own sentence is already landing.** Ruling 2 names the shells' and the metals' virtues and states the general rule, but the five architecture stations arrive on beats where a sentence is *already* landing at stage register, anchored at them. Rendered once on the reading that **a landing is the station's line, and settles into the rail's world row on the following beat** — so gold's gain row now appears from S6 b2 rather than b8, and no station is blank at any beat of the act. The same reading is what removed the S5 b6 collision. The alternative — a world row at the arrival beat as well — prints the beat's own sentence twice on one frame, which is why it is named here rather than done.

8. **METALS keeps its virtue for the rest of the act.** The ruling's pair is *standing = virtue, fallen = wound*, and metals is never defeated — it is absorbed into its champion. Rendered once with its virtue riding at its station's voice all the way to S10 b5, dimming with the station rather than being replaced. This closes the r1 flag that metals receded without a wound.

9. **The states sheet's three rails-law cells are now behind the amended band rule.** `s5-b5`, `s10-b1` and `s10-b2` on `review/act-2/states/` were staged under the height-only band rule you have now amended. The rail supersedes them as Act II's anchor and re-rendering them is outside this brief's scope, so they are **named, not fixed** — and proven untouched by the byte-identity run.

**Three r1 flags are closed by these rulings**, and they are worth calling out because they were the sheet's open ones: coinage's PENDING station (closed by the ingest), where the claim rides (closed by ruling 3 — it does not), and metals receding without a wound (closed by ruling 2).

**Four r1 flags ride on unchanged**, none of them touched by these rulings: the gain/dependency pair text is still small at the complete-rail cameras (S9–S10 render those rows near 10px, and the choice remains camera motion in the implementation or stage register on the final frames); the receded rail still sits at 0.35 in the stills rather than the recorded 0.16, because a still has no motion to carry the recession; palladium still has no separate returned-rail frame between b4 and b5; and the LEDGER residue row still reads *"the window closed"* rather than the chart's own *"measurably poor at storing it."*

# 7. Deferred to the GATE

Everything the standing record already defers: the deck-wide suites, traversals, reduced-motion passes, the brightness and composition audits over the legacy slides, and `gates-r7-4.cjs`'s known stale baseline. Nothing in the deck changed this session beyond the coinage render and its row, and the boot smoke covers exactly that. **No gate was widened.**

# 8. Remaining judgment calls — all yours

- **The flipbook verdict** (§1) — the go-ahead that sends Act II to implementation, or the frames that break the thread.
- **The nine flags** (§6), each with one honest render standing behind it. The two most likely to want a word from you are flag 1 (how large *the featured line* should be) and flag 6 (whether the mesh is still drawn when the coin arrives).
- **The pair-legibility question on the final frames** — camera motion, or stage register.
- The `s5-b5` / `s10-b1` / `s10-b2` states-sheet cells now standing under the superseded band rule (flag 9) — leave them as the record of what they were, or fold them forward.

# 9. Recommended next step

**Your flipbook walk of `review/act-2/rail/sheet.html`.** On the go-ahead, implementation r2 begins — two sessions under the sizing law, rewiring Scenes 5–10 to this rail world, with your act viewing as the gate, and **the rail's own continuity** as what that gate now judges.
