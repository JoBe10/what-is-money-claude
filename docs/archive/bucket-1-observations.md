> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# Bucket 1 — Out-of-scope observations

Defects and risks noticed while implementing `docs/bucket-1-implementation-brief.md`
that the brief does not authorize fixing. Logged and left alone, per brief §1
("If you notice an unrelated defect, log it in `docs/bucket-1-observations.md` and
move on. Do not fix it.").

---

## O-01 — `OrangePillCapsule` carries the same stale-cache pattern as F-01

**Files:** `src/slides/section-1-opening/06-orange-pill-ingredients.js`,
`src/slides/section-1-opening/07-orange-pill-focus.js`,
`src/components/OrangePillCapsule.js`

Phase A1 removed the module-level `this._scene` cache from all thirteen
`EvolutionScene` / `MonetisationScene` consumers. The 1.6 ↔ 1.7 orange-pill pair
uses the identical shared-DOM continuation mechanism with an identical
module-level cache (`this._capsule`), cleared only on a non-continuous exit:

```js
// 06-orange-pill-ingredients.js
const api = this._capsule ?? ctx.container?.__capsule;   // stale reference wins
```

`07-orange-pill-focus.js` already reads `ctx.container?.__capsule` first, so the
forward direction is safe; `06` is not. The exposure is smaller than F-01's
(a two-slide chain, and 1.6 is entered non-continuously on a linear pass, so
`render()` rebuilds it), but the shape of the bug is the same and it will bite on
backward-then-forward navigation through the pair.

This is Section 1, which the brief's Protected List puts out of scope. The fix is
mechanically identical to the one applied in Phase A1 and should be folded into
the Sections 1–3 rebuild.

*Related: the master review lists this separately as bug 6.2 #9.*

---

## O-02 — `EvolutionScene.cleanup()` and `MonetisationScene.cleanup()` do not cancel their cross-fade timers

**Files:** `src/components/EvolutionScene.js`, `src/components/MonetisationScene.js`

Both `cleanup()` methods consist solely of `delete container.__evolution` /
`__monetisation`. `setActiveStage()` and `setIntroMode()` each schedule an
800 ms `setTimeout` to remove the outgoing content layer, and those handles are
never stored or cleared. Today the engine removes the whole container anyway, so
the orphaned callbacks write to detached nodes and are collected — no visible
symptom. It is still the substrate the master review flags as F-09.

Phase A1 changed how these methods are *reached* (via the container rather than a
cached reference) but deliberately did not change what they do; F-09 is not in
the brief's scope.

---

## O-03 — `.deck-slide` container mounts two paths for continuation slides

Noted only because it is the structural reason F-01 was invisible in rehearsal:
each continuation slide has a `render()` path (deep links, overview jumps) and an
`onEnter({continuous:true})` path (linear traversal), and a linear rehearsal pass
exercises only one of them. The master review §6.3 recommends adding a loud
invariant check in `onEnter` when the scene API is missing. Not implemented — the
brief does not authorize it.

---

## O-04 — Two image assets are unused but predate the Phase B deletions

**Files:** `assets/images/essence_of_money.png` (2.4 MB),
`assets/images/icon_fiat.png`, `assets/images/icon_art.emf`

Phase B removed every asset that became unreferenced when the thirteen
rejected-framework modules were deleted. Three more are unreferenced but were
already unreferenced before that deletion, so they fall outside B1's stated scope
("remove every import/export used only by the deleted files"):

| Asset | Status |
|---|---|
| `essence_of_money.png` | imported and exported by `assets.js`, referenced by no slide. 2.4 MB — the largest single dead payload in the bundle. |
| `icon_fiat.png` | imported and exported by `assets.js`, referenced by no slide. |
| `icon_art.emf` | not imported at all; unrenderable in browsers (see the note in `assets.js`). |

`essence_of_money.png` may be deliberate: *The Essence of Money* is named in the
master document §3 as a separate planned presentation, so the asset could be
being held for it. Worth a decision rather than a silent delete.

---

## O-05 — 3.04 still names `images.iconArt`, which no longer exists

**File:** `src/slides/section-3-functions/04-fiat-fails.js:12`

Phase B removed the `iconArt: null` entry from `assets.js` as the brief directs.
3.04's `SUBSTITUTES` table still reads `images.iconArt`, which now evaluates to
`undefined` rather than `null`. Behavior is unchanged — the tile builder branches
on `if (s.image) … else if (s.fallbackIcon)`, and both values are falsy, so the
Art tile still renders its `ti-palette` glyph (verified in the built deck). The
dangling name should be dropped in the Sections 1–3 rebuild; it is Section 3 copy
and mechanics, which the Protected List puts out of scope here.

---

## O-06 — Three shared components became unreferenced when Phase B deleted their only consumers

**Files:** `src/components/ComparisonTable.js`, `src/components/PropertiesTable.js`,
`src/components/AmbientCrystal.js`

B1 names one component to delete (`ProblemSolvingScene.js`). These three were
used only by the rejected Section 4 modules and are now imported by nothing:

```
$ grep -rl "components/ComparisonTable" src/ --include=*.js | grep -v ComparisonTable.js  →  0
$ grep -rl "components/PropertiesTable"  src/ --include=*.js | grep -v PropertiesTable.js   →  0
$ grep -rl "components/AmbientCrystal"   src/ --include=*.js | grep -v AmbientCrystal.js    →  0
```

They ship no bytes (Vite tree-shakes unimported modules — verified: none of the
three appears in `dist/`), so the cost is confusion rather than payload:
`AGENTS.md` §9 says "do not leave dead code, alternate copy, or abandoned
prototypes". `AmbientCrystal.js:131` also injects a keyframes `<style>` into
`document.head` on first use, which the master review flags under F-09.

Not deleted here — B1 enumerates its deletions explicitly and this is not on the
list. A one-line follow-up.

---

## O-07 — Two 4.16 header renders remain confusable after the D2 normalization

**Files:** `assets/images/carrier_paper.png` (FIAT),
`assets/images/comparison_shares.png` (SHARES)

D2 converged the five header renders to a 1.06x spread in apparent size and a
1.29x spread in mean luminance (from 1.28x and 2.45x). CSS did the job the brief
asked of it. What CSS cannot fix is that FIAT and SHARES are both light-toned
paper rectangles at similar scale, so the header row still needs its labels to
distinguish columns 2 and 5 — the master review's §5.1(a). Equalizing their
optical weight, as instructed, makes them marginally *more* alike, not less.

The real-estate render also still sits at the bottom of the luminance range
(0.335 against the row's 0.397 median) after a `brightness(1.58)` boost; pushing
it further starts to wash the art rather than balance it.

Both are art-pass items, and both pair naturally with V-1 (the deferred
physical-coin Bitcoin render replacement).

---

## O-08 — 2.11 has 8 px of vertical headroom

**File:** `src/slides/section-2-history/12-gold-backed.js` (slide id
`2-11-gold-backed`)

Phase F required confirming that no copy-length change pushed a tight slide past
the stage. Neither 2.09 nor 2.11 had its copy touched, and nothing overflows —
but the measurement is worth recording, because it means the next Section 2 copy
edit will overflow silently:

| Slide | Painted text extent (y) | Bottom headroom |
|---|---|---|
| `2-09-collectibles` | 64 – 1046 | 34 px |
| `2-11-gold-backed` | 64 – 1072 | **8 px** |

2.11 carries the heaviest content layer in the deck (three bullets plus two pain
points) in a flex column with `align-items: center`, so any added word spills
symmetrically above and below. The master review flags the same slide at §5.3.
Any copy change there needs a layout check in the same pass.

*(Separately: 2.14's Bitcoin image overflows the stage bottom by ~61 px. That is
a known finding the brief explicitly defers, not something this pass introduced —
the overflow sweep above only inspects elements carrying text, so it does not
appear in these numbers.)*
