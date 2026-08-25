# Stage 0 — Report
## Freeze & consolidation · *WHAT IS MONEY?* — the film rebuild

**Mode: FAST.** Mechanical session — docs, process law, branch, scaffold. No scene implementation, no deletions.
**Branch:** `film-rebuild`, cut from `main` at `a7d6de4` (the last stable deck). **Tag:** `stage-0`.
**Date:** 25 August 2026

---

# 1. Implemented

**The freeze.** `docs/synthesis-architecture.md` is committed as the governing structure beneath presenter instruction, with the five rulings recorded inside it as **RULED** — a ruling register at the head and each ruling marked in place: (1) the waypoint device and all visible structure retired; (2) the murmuration retired with honor, the asset banked; (3) the periodic elimination kept, compressed into one beat in Scene 6; (4) palladium placed in Scene 10; (5) the stability scene cut, its content distributed to Scene 9's script, Scene 23's notes as Q&A armor, and Scene 29's rules line. The freeze section now reads *in effect*.

**One master.** `docs/what-is-money-master.md` replaces the archaeology: the structure index, the narrative constitution, the D1–D9 deposits, the compositional standard, the two registers, the script standard, technical law, the intellectual foundation, guardrails and terminology, attribution, banked material, and the freeze register with every amendment from the 28 July argument freeze to Stage 0.

Three standing rules that shipped at R7.4 but had never been written into the constitution are now written down: **the display rule** (rule 11), **settle-state budgets** (rule 12) and **the self-reference ban** (rule 13).

**The archive.** Thirty-eight documents moved to `docs/archive/` behind superseded-by headers, in three commits by kind. `docs/` now holds only the live set: the frozen architecture, the master, `SOURCES.md`, the icon grammar, the dark-field manifest, and the current stage's brief, batch package and report. Nothing was deleted; the two documents already in the archive were restamped so the chain of supersession resolves to the current master.

**Process law.** `AGENTS.md` §4 is the presenter's six orders, each with the failure it prevents: commit granularity, revert points, the aesthetic law, the no-invention rule, the style-frames stage, FAST/GATE. The rest of the file was brought with it — the authority hierarchy, the mission (the film rebuild, the branch, per-batch deletion), scope and safety, the Claim Mark as the film's protagonist, scene IDs and splicing, per-batch definition of done, and a report format that must name its mode.

**The branch.** `film-rebuild` carries every Stage 0 commit. `main` is untouched and remains the last stable deck until the final GATE merge.

**The scaffold.** `src/scenes/` with one directory per act and a README carrying the scene map, the naming convention, the scene contract and the splice procedure. `src/proto/registry.js` and the `?proto=` scratch route in `src/main.js`: prototypes run through the real engine — same builds, notes, reduced motion and direct entry — and never touch the deck. **No scene content.**

---

# 2. Files changed

Fifteen commits, `d47aad2`…`02576a3` — 72 files, +1412 / −176.

| Commit | Change |
|---|---|
| `d47aad2` | freeze the synthesis architecture as the film's structure |
| `0893497` | add the Stage 0 brief and the Batch A package |
| `3335bb9` | consolidate the archaeology into one current master |
| `de426ca` | archive the superseded masters and the old plan |
| `70257d9` | archive the round-by-round briefs and reports |
| `fe866dc` | archive the Codex-era build prompts and the whole-deck review prompt |
| `5cd87eb` | repoint live references after the archive move |
| `8b320fc` | repoint the authority hierarchy at the frozen architecture |
| `dd7e0d1` | restate the mission, scope and definition of done |
| `938ef8c` | install the process law for the film rebuild |
| `96d55fa` | scaffold the act-organized scene tree |
| `e1539e3` | add the `?proto=` scratch route |
| `3b63bea` | carry the conventions over to scenes (key paths, Claim Mark, manifest) |
| `223e838` | the Stage 0 smoke harness and its result |
| `02576a3` | document the scratch route in the README, correct the layout |

**New:** `docs/what-is-money-master.md` · `docs/stage-0-report.md` · `src/scenes/README.md` + six act directories · `src/proto/registry.js` · `review/stage-0/`.
**Modified:** `docs/synthesis-architecture.md` (the rulings) · `AGENTS.md` · `README.md` · `src/main.js` · `src/styles/globals.css` (the scratch index's styles) · `docs/icon-grammar.md`, `docs/dark-field-manifest.md`, `docs/SOURCES.md`, `src/components/section-2/glyphs.js`, `src/data/purchasing-power.js` (reference repointing only).
**Moved:** 38 documents into `docs/archive/`.

**Out of scope, and why.** Three things were touched that the brief did not name:

1. **`PLANS.md` was archived.** It is the Section 4 rebuild's implementation plan, complete since July, and `AGENTS.md` cited it as authority. Leaving it live would have left a governing pointer at a finished plan — the defect the documentation currency rule exists to prevent. It moved with the other masters; reverting is one `git mv`.
2. **Reference repointing.** Two live technical documents cited the two-register law by its old address; five historical citations in `SOURCES.md` and two source files pointed at documents that had just moved. Every path in the live tree resolves again.
3. **The README's layout block.** It described `src/assets.js` (deleted at R7.1) and a directory that has not existed since the Sections 1–3 rebuild. Corrected while documenting the scratch route.

---

# 3. Validation

| Check | Result |
|---|---|
| `npm run build` | clean |
| the deck boots from the production build | 45 slides, counter `01 / 45`, first slide `1-01-eighty-thousand-hours` |
| deep link `?slide=23` | resolves to `4-01-define-the-job` |
| `?proto=` with an empty registry | the index renders; the deck does **not** mount |
| `?proto=<unknown>` | the same index, not a blank page |
| console on all four | **0 errors** |
| the scratch route's main path, with a temporary prototype registered | runs one by id and by `protoKey`, runs all, `?proto=list` shows the index with working links, arrow advances the build, `n` opens the notes overlay, `/` still runs the 45-slide deck — console clean |

The temporary prototype existed only for that run and was removed before the commit; the registry ships empty. Harness and results: `review/stage-0/harness/smoke-stage-0.mjs`, `review/stage-0/smoke-stage-0.json`.

**FAST scope.** Nothing functional changed for the deck, so no deck-wide suite was run. What FAST covered is what this stage touched: the build, the two routes in `src/main.js`, and the deck's continued boot and deep-link behavior.

**What the next GATE owes.** The R3 and R4 verification harnesses read session briefs from `docs/` at runtime (`docs/r3-session-brief.md`, `docs/r3-1-revision-brief.md`); those files are now under `docs/archive/`, so those harnesses will fail on a path until repointed. They verify a deck the film replaces, so they were left alone rather than repaired — recorded here rather than fixed, per FAST's standing rule.

---

# 4. Flagged, not improvised

Six standing rules named a slide number, a device or a boundary that the new architecture retires. **None was rewritten on judgment**; each is mapped in place, marked in the master where it sits, and listed here for the presenter to rule on:

1. **The neutrality boundary** (master §3.2) — "before 4.01" became "before Act IV." Same moment in the argument; the slide number no longer exists.
2. **The acceptance test** (§3.6) — "any moment before 4.16" became "before Scene 23," the comparison.
3. **The claim ladder** (§3.3) — the old rule (claim named three times, never generalized before Section 4) is void: the Claim Mark is born on screen in Scene 3. What survives is the *sequence of enlargements* — Scene 3 → Scene 7 → Scene 15 → Scene 16 — with the protection intact: Scene 16 must land as recognition.
4. **D9** (§4) — was "the claim intuition seeded, never named." Restated as: the claim is the thread, present in every act from its birth, so Scene 16 generalizes an object the viewer has watched for forty minutes.
5. **The one-term rule** (§3.4) — the per-act budget survives; Act I's term is the double coincidence of wants, from the approved Batch A script. **Acts II and III have no allocation**: the old brief gave Section 2 "salability," and whether Act II keeps it is a Batch B script decision, not an inheritance.
6. **The color arc's anchor** (§8.5) — the accent used to enter at the first waypoint ignition, and the waypoint device is retired. The natural anchor is the Claim Mark's birth in Scene 3, but that is an aesthetic decision and aesthetic decisions are the presenter's (`AGENTS.md` §4.3). **Recorded as a flag, not a ruling.**

Nothing else was invented: no scene, no glyph, no frame, no composition.

---

# 5. Remaining judgment calls

- **The six mappings above** — each needs a yes or a correction. Five are mechanical; the sixth (the color arc) is a design decision.
- **Scene numbering inside the derivation runs.** The architecture names Scenes 17–23 and 24–29 as runs rather than one by one. The master's index numbers them in the order the architecture lists their contents — 17 carrier-preserve, 18 the test, 19 invert, 20/21 failures I and II, 22 failure→requirement + properties, 23 the comparison; 24 migration through 29 the case. Both runs resolve 1:1 and match Ruling 5's own references to Scene 23 and Scene 29, but the numbering is an index, not the architecture's own words.
- **The archived R3/R4 harnesses** (§3) — repair or retire, at the GATE.

---

# 6. Recommended next step

**Prototype Gate 1 — the Claim Mark contact sheet.** The Batch A package specifies it: three candidates (A the current `ClaimObject`, B the flatter elongated billet, C an ultra-minimal flat hexagon), each rendered in five contexts at three scales, plus a mid-transfer behavior still. Everything downstream waits on that selection — the hours field's unit style is tuned to rhyme with it, and no Act I frame can be composed without it.
