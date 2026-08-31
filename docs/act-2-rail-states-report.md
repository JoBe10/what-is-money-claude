# Act II Rail States — Report
## The staging amendment rendered: one rail, growing right — every settled state as a still

**Mode: FAST — and deliberately lean, as ordered.** This session built the rail states and nothing else. The verification run is exactly the brief's §4 list; no unrequested check was added.
**Branch:** `film-rebuild`. **Prior tag:** `batch-b`. **Tag:** `act-2-rail-states`.
**Date:** 1 September 2026.

---

# 1. How to review this — the flipbook protocol, in plain English

Open **`review/act-2/rail/sheet.html`** and walk it top to bottom like a flipbook of the act. The cells are every settled state of Act II's 37 beats, in the exact order the film plays them: the rail growing to the right as history advances, the overlays rising over the deep-dimmed record and returning with their answers landed, the statements landing over the receded rail. At every frame there is a single question: **can you follow money's history by eye alone?**

If the answer stays yes from the first frame to the last, say so, and the implementation sessions rewire the scenes to this rail world. If any frame breaks the thread, name that frame, and it comes back re-staged. Nothing else on the sheet asks you for anything: there are no candidates — this is your approved map, rendered — and the six cells marked *carried* are the approved overlay interiors, byte-identical to the states sheet.

# 2. The records (§1 of the brief), each its own commit

| # | Record | Where | Commit |
|---|---|---|---|
| 1 | **The staging amendment, presenter-approved verbatim (1 Sep 2026)** — Act II's visual anchor amended to the continuous rail; narrative structure, scripts, and the 37 beats untouched | `docs/act-2-staging-amendment.md` committed + the freeze-register row, master §13 | `33c505a` |
| 2 | **The survival-brightness ruling** — an undefeated station holds full voice; fallen stations dim with their wounds; shells read as alive until Zanzibar lands | `AGENTS.md` §6, beside the rails law | `60574fe` |
| 3 | **The regenerated `gold.png` gated and ingested** — 5 clauses of 5 through the standard harness; the whole shipping set re-gated **24 images, 120 checks, 0 failures**; measured framing row `gold: [1.469, -0.7, -3.5]`; the retired first-shoot study to file at `review/act-2/dark-field/gold--retired.png` | `src/dark-field.js`, manifest §2/drop block, evidence `review/act-2/grade-gold-drop.json` + `grade-shipping-set-rail.json` | `059e2d8` |

**The gold render had been swept into commit `40ca46a` ungated** (the presenter's own commit carrying the amendment's grounds in its message). This session moved it back through the drop zone and the standard harness — the exact `fiat` precedent — so the register's every render remains gate-proven. The new render is 1672×941, the `fiat`/`metals` near-16:9 family, so **every box that displays gold now derives from the new render's own aspect** (the `ledger_glow` precedent): the rail's GOLD band boxes, and P1's morph cell.

**The P1 gold-form cell (`p1-b5`) is re-rendered from the new row** — the one Batch A touch this session makes. The form box becomes 960×540 at (480, 380) — the recorded P1-F2 height and centre applied to the new aspect. The landed proof is **7 checks of 7** (`review/act-2/proof-p1-gold.json`): the cell differs from its bytes at tag `batch-b`, the lit subject sits inside the new box and extends past both side edges of the retired 720-wide box, and the ground holds the gate's corner/border clauses. Commit `5dca6ec`. Nothing else in Act I moved.

# 3. The build

**The rail composition system** (`review/act-2/harness/rail.mjs`, commit `2f00ff4`): one world model — the legacy `EvolutionRail` spine verbatim for the six legacy stations, extended right at the metals→gold pitch to COINAGE · CLAIM ON GOLD · LEDGER · BITCOIN — rendered through one camera per state. Every drawn value is transcribed from its named source (the component, its stylesheet, the strip's approved staging, the service-path grammar); every string is recorded film material (the legacy wounds, the strip's gain/dependency pairs, the riser notes, the installed scripts, the evidence-grammar specimens). The overlay seams are built by **the approved cells' own builders imported from `states.mjs`** — the same no-drift construction the r2 sheet used — over the rail at the legacy's deep table-dim.

**The sheet** (`review/act-2/rail/`, commit `1cc4e98`): **39 cells covering all 37 beats** — 33 rendered, 6 carried byte-identical (the five elimination waves `s6-b3`–`s6-b7` and the palladium bar `s10-b4`). Two overlays whose return seam is not itself a mapped beat carry an extra `-return` cell (`s6-b9-return`, `s8-b4-return`), which is why 37 beats make 39 files. `sheet.html` is ordered as the flipbook; `states.json` is the record.

What the frames carry, per the brief §2: cumulative history (every settled frame shows station one to the newest arrival — the amendment's own "each beat's settled frame now shows history-so-far"), the object band above the line with the new gold, wounds and annotations beneath, the featured moments at their stations in the approved dated-fact typography, the claim riding as the traveler, the survival-brightness ruling throughout, and the overlay seams as two states each.

# 4. Files changed

## New
| file | what |
|---|---|
| `docs/act-2-rail-states-brief.md` · this report | the brief as placed, and the report |
| `review/act-2/dark-field/gold--retired.png` | the retired first-shoot gold study (1448×1086), on file |
| `review/act-2/grade-gold-drop.json` · `grade-shipping-set-rail.json` | the gate evidence — drop zone 5/5; full set 24 images, 120 checks, 0 failures |
| `review/act-2/harness/proof-p1-gold.cjs` · `review/act-2/proof-p1-gold.json` | the P1 gold-cell landed proof, 7/7 |
| `review/act-2/harness/rail.mjs` · `capture-rail.cjs` | the rail composition system and its capture pipeline |
| `review/act-2/rail/` (39 PNGs · `sheet.html` · `states.json`) | the rail sheet |
| `review/act-2/harness/check-rail-cells.cjs` · `check-rail-cells.json` | the per-cell checks — 33/33 green |
| `review/act-2/harness/smoke-rail-boot.cjs` · `review/act-2/smoke-rail-boot.json` | the one boot smoke — 39 slides, 0 errors |

## Modified
| file | what |
|---|---|
| `docs/what-is-money-master.md` | §13 — the staging-amendment row |
| `AGENTS.md` | §6 — the survival-brightness ruling, beside the rails law |
| `src/dark-field.js` | the re-measured gold framing row and the aspect-family note — **the session's one `src/` change** |
| `docs/dark-field-manifest.md` | the gold row amended; the rail-states drop block |
| `review/prologue/harness/states.mjs` | `formWide` (960×540) and `p1-b5` re-rendered from it — the ordered Batch A touch |
| `review/prologue/states/p1-b5.png` | the re-rendered gold-form cell |
| `review/act-2/harness/states.mjs` | `SPECIMEN` and `ENTRANT` exported (one word each, the r2 precedent) — no cell changed |

**Out of scope, changed anyway: none.** No scene rewiring, no motion, no deck/engine/manifest change, no Act III, and no Act I beyond the ordered `p1-b5` touch.

## Commits and tag

```
993005a  docs: the Act II rail-states brief arrives
33c505a  docs: the staging amendment recorded - Act II re-anchored to the continuous rail, presenter-approved verbatim
60574fe  docs: the survival-brightness ruling recorded beside the rails law - undefeated stations hold full voice, fallen stations dim with their wounds
059e2d8  assets: gold regenerated and re-ingested - 5 clauses of 5, the re-measured row governs every gold box, the retired study to file
5dca6ec  review(prologue): the P1 gold-form cell re-rendered from the new row - 960x540 box, landed proof 7/7
2f00ff4  review(act-2): the rail composition system - one world, one camera, the amendment's spine in the transcribed grammar
1cc4e98  review(act-2): the rail sheet rendered - 37 beats as 39 cells, 33 new, 6 carried byte-identical, 0 console errors
764aef6  review(act-2): the rail cell checks - 33/33 new cells green, carried cells proven by copy
0376232  review(act-2): the boot smoke - 39 slides, 0 errors, the new gold live in the register, build clean
```
Plus this report's commit. **Tag: `act-2-rail-states`** at the report commit.

# 5. Validation (the brief's §4 list, complete, nothing more)

| check | result |
|---|---|
| **Gold gate evidence** | drop zone **5 clauses of 5** (corner 0.10, border 0.09, 78.6% dark, R−B +147.8, warm 99.2%, one key at spread 0.993); post-ingest full set **24 images, 120 checks, 0 failures** |
| **P1 gold-cell landed proof** | **7/7** — re-rendered vs the tag, inside the new 960×540 box, wider than the retired box on both sides, ground clauses green |
| **Per-cell checks on the new rail cells** | **33/33** — corner ≤ 0.00, border ≤ 0.04, content present, 1920×1080 (6 carried cells ship the approved bytes, measured green at r2, byte-identity by file copy) |
| `npm run build` | clean |
| **One boot smoke** | **39 slides · 0 console errors**, the new gold live in the register — the deck's only owed proof, since nothing in it changed but the render and its row |
| **Commit granularity / tree / tag** | each record and each construction its own commit; tree clean at every stop; `act-2-rail-states` cut |
| Capture console | 0 errors across all renders |

Notes status: no scene module was touched, so no notes moved. Reduced-motion status: no motion was built (stills only), so there is nothing to check; parity remains guaranteed by the standing Batch B evidence and re-proves at the GATE.

# 6. Flagged, not improvised — the map's genuine underdeterminations, one honest render each

Under the brief's rule, each of these got exactly one rendering and a plain-English note. None is a candidate set.

1. **COINAGE has no render in the register.** The spine makes it a station and the rails law makes stations photographic, but no coinage study exists (the register's 24 subjects don't include one). The station shows its grammar-glyph stub, `data-pending`, exactly as the pipeline stages a missing render — visible on `s7-b1` through `s10-b5`. **Waiting on:** a presenter-generated coinage study through the standard harness (the master template with a subject line like *"A small stack of ancient hammered coins, edges catching the light"*); it lights the station with no code change.
2. **Where the claim rides.** The map says the claim rides the rail throughout but does not say which station carries it at every beat. It is staged along the carrier chain the map itself narrates: shells (S5 b1–b6) → metals (S5 b7–b8) → gold (S6) → coinage (S7 b1–b2) → claim on gold (S7 b3–b5) → **ledger from S8 through S10** — bitcoin is an entrant, not the claim's carrier, so the traveler stays on the money the world actually uses. If you want the disc elsewhere at any beat, it is one word in the state table.
3. **The pair text is small at the complete-rail cameras.** The amendment's cumulative rule fixes every late frame's span at all ten stations, which puts S9–S10 at about half scale: the gain/dependency rows render near 10px. The stills are honest to the rule; if the pairs must read at the strip's own size, that is the implementation's camera traveling in motion (dwelling per station as the pairs light), or a ruling that the pairs take stage register on the final frames. Named for your eye at `s10-b1`.
4. **Landings versus settled rows.** The map lands whole sentences at stations ("SCARCITY IN MATTER lands as its annotation", "the honest strengths land at the station"). A 17px world row cannot carry a landing sentence legibly at the wide cameras, so the staging translates: **a beat's sentence lands at stage scale anchored at its station, and settles into the rail's recorded world rows afterward** (the strip's pairs, the legacy wounds). This is the one systematic translation the map underdetermined; it is applied uniformly and is visible on every landing beat.
5. **The residue at LEDGER** (`s8-b4-return`) is noted as the strip's recorded dependency, *"the window closed."* If you want the chart's own residue — *"measurably poor at storing it"* — as the row instead, one string changes.
6. **The receded rail sits at 0.35 in the stills**, not the recorded 0.16 chart-dim. A still has no motion to carry "receded and returning," so the statement frames keep the record readable beneath the line; the implementation recedes to the recorded values in motion. The deep overlay dim is the legacy's own 0.08, unaltered.
7. **Palladium has no separate returned-rail frame.** The map gives b4 to the insufficiency line inside the carried frame and b5 to the exit question over the receded rail, so the palladium overlay's "return with the answer landed" has no mapped state of its own. If you want one between b4 and b5, it is one small render.
8. **METALS recedes without a wound** from GOLD's arrival — absorbed into its champion, not defeated. That is the legacy's own treatment (2-06 marks metals defeated under reigning gold), noted because the survival-brightness ruling dims stations *with their wounds* and metals never takes one.
9. **The metals band box is taller here than on the r2 `s5-b5` cell.** That cell mirrored the component's markup at 240×135; the rail stages every render at the band's shared height (188 world) per the rails law's one-band-scale clause, so metals rides at the same height as its neighbors. One system, one scale — but it is a visible difference from the r2 cell you approved, so it is named.
10. **The dependency line persists on `s7-b4` and `s7-b5` only** — from S8 the certificate has dissolved into the ledger and the line would be an anachronism. Routed under the coinage station's stub so it crosses no glyph.

# 7. Deferred to the GATE

Everything the standing record already defers: the deck-wide suites, traversals, reduced-motion passes, the brightness and composition audits over the legacy slides, and `gates-r7-4.cjs`'s known stale baseline. Nothing in the deck changed this session beyond the gold render and its row, and the boot smoke covers exactly that. **No gate was widened.**

# 8. Remaining judgment calls — all yours

- **The flipbook verdict** (§1) — the go-ahead, or the frames that break the thread.
- **The coinage study** (flag 1) — the register's one new gap, created by the spine itself.
- **The pair-legibility question on the final frames** (flag 3) — camera motion, or stage register.
- Everything the r2 report §9 left standing rides on unchanged (the Act III timeline flag, the CLAIM-accent question — now the traveler's accent riding beside monochrome stations, visible on every rail frame here).

# 9. Recommended next step

**Your flipbook walk of `review/act-2/rail/sheet.html`.** On the go-ahead, implementation r2 begins — two sessions under the sizing law, rewiring Scenes 5–10 to this shared rail world, with your act viewing as the gate.
