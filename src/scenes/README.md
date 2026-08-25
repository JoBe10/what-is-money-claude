# `src/scenes/` — the film

One directory per act, one module per scene. **Empty by design at Stage 0:**
scenes arrive with their batches, against presenter-approved style frames and
the batch package's scripts (`AGENTS.md` §4.4 — nothing here is improvised).

The structure is frozen in `docs/synthesis-architecture.md`; the constitution is
`docs/what-is-money-master.md`. Neither is restated here. This file is the map
from a scene number to the file that will hold it.

## The map

| Directory | Scenes |
|---|---|
| `prologue/` | P1 Eighty Thousand Hours / What Is Money? · P2 The Stakes |
| `act-1-the-unfinished-exchange/` | 2 The Direct Exchange · 3 The Breakthrough · 4 Spend or Save |
| `act-2-the-architecture-of-money/` | 5 The Function Stayed. The Carrier Changed. · 6 Gold: Scarcity in Matter · 7 Claims on Gold · 8 Fiat: Money Becomes Information · 9 Bitcoin: Can Scarcity Become Digital? · 10 The Trade-Off Keeps Moving |
| `act-3-the-jobs-of-money/` | 11 Three Familiar Jobs · 12 We Already Split Those Jobs · 13 Different Jobs, Different Coordination · 14 The Coffee Objection · 15 The Tower |
| `act-4-the-store-of-value-test/` | 16 Return to the Open Exchange · 17–22 the derivation run · 23 The Comparison |
| `act-5-the-case/` | 24–29 the case run · 30 Close |

## Naming

`NN-kebab-title.js`, numbered by scene, with the prologue's two scenes as `p1-`
and `p2-`. A scene's module id is its deep link and never changes once shipped —
choose it for what the scene *is*, not for where it currently sits.

Shared machinery for one act lives beside its scenes with a leading underscore
(`_exchangeStage.js`), exactly as the legacy sections do. Anything two acts need
is a component, not a shared underscore file.

## The contract

A scene is a slide module (`AGENTS.md` §2) with one difference of emphasis: it is
**one continuous visual world**, and its beats are advances within it rather than
separate frames. `_applyBuild(n)` reconstructs full state from the build number;
direct entry at build *n* renders exactly what advancing to *n* renders; reduced
motion reaches the same end state instantly; every beat is exactly one `[→]` in
the notes.

## How a scene reaches the film

1. Its style frames are approved (`AGENTS.md` §4.5).
2. It is built and judged in the scratch route — `?proto=` — where it runs
   through the real engine with real builds and real notes.
3. Its batch **splices it into `src/slides/manifest.js`** and deletes the legacy
   slides it replaces, in the same batch. The deck runs end to end at every
   commit; seams are noted in the batch report, not smoothed.
