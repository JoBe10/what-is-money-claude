# Film Rebuild — Stage 0 (Freeze & Consolidation)
## *WHAT IS MONEY?* — the synthesis architecture takes effect

**Status:** Approved · **Mode: FAST** · **Session type:** mechanical (docs, branch strategy, scaffolding — no scene implementation, no deletion of working scenes)
**Date:** 24 August 2026

# 1. The freeze
Commit `docs/synthesis-architecture.md` (provided by the presenter) as the top governing document beneath presenter instructions. Record the five rulings inside it as RULED: (1) waypoint device retired; (2) murmuration retired with honor (asset banked, not deleted from history); (3) periodic elimination kept, compressed to one beat in Scene 6; (4) palladium placed in Scene 10; (5) stability scene cut — content distributed: the two-question distinction and stage-signature inoculation into Scene 9's script, the full steelman into Scene 23's notes as Q&A armor, the rules line remaining in Scene 29. Structure is closed; craft only hereafter.

# 2. Documentation consolidation
Collapse the archaeology into **one** current master: `docs/what-is-money-master.md` — the synthesis architecture, the constitution (all standing rules: script standard, pacing rule, brightness rules, black-is-a-beat, two registers + dark-field grade, display rule, settle rule, self-reference ban, icon grammar at diagram scale, one-term rule where still applicable, guardrails and terminology from the Section 4 doc, the freeze register with every amendment). Move all superseded briefs and the old masters to `docs/archive/` with superseded-by headers. `SOURCES.md` stays live.

# 3. Process law (amend `AGENTS.md`)
1. **Commit granularity (presenter-ordered):** every self-contained change — a scene, a component, a fix, a doc edit — is committed immediately with a descriptive message; unrelated changes are never batched into one commit; the working tree is clean at every stop. Purpose: any change is individually revertible.
2. **Revert points:** tag every stage and batch completion (`stage-0`, `batch-a-frames`, `batch-a`, …).
3. **Aesthetic law:** no aesthetic decision ships on agent self-selection — glyphs, marks, frames, compositions go to contact sheets; the presenter selects.
4. **No-invention rule:** during batches, the CLI implements approved style frames and scripts; visual gaps are flagged in the report, never improvised.
5. **Style-frames stage:** every new or changed scene has its key states rendered and presenter-approved as stills before any motion is built.
6. FAST/GATE modes retained; batches run FAST; one GATE before the recording merge.

# 4. Branch strategy
Create `film-rebuild` off current `main`. All film work lives there with granular commits; batches are commit ranges, not separate branches; `main` stays the last stable deck until the final GATE merge. The legacy scenes are **deleted per batch, as each batch replaces them** — never preemptively — so the deck on `film-rebuild` remains runnable end-to-end at every commit (new scenes splice into the manifest as their batches land; seams noted, not smoothed).

# 5. Scaffold
Create `src/scenes/` (act-organized per the architecture's scene map) and a scratch route for prototypes (`?proto=`). No scene content yet.

# 6. Verify & report
Build green on `film-rebuild` (nothing functional changed); docs in place; tags working; short report. Stop.
