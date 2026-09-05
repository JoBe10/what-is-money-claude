> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R2 Phase Report — Section 2: Where Money Comes From

**Branch:** `rebuild-r2-section-2` (not merged — awaiting the presenter's viewer pass)
**Base:** `main` at `7d03c4c` (the §0 merge of R0+R1+R1.1, performed at the start of this session; `npm run build` verified clean on `main` after the merge)
**Brief:** `docs/r2-session-brief.md` · **Date:** 2026-07-28

---

## 1. Phase A — governing-document updates

Applied to `docs/sections-1-3-rebuild-brief.md` exactly, as the session's first
commit (`e256c8a`, which also versions the R2 session brief itself, following
the R1.1 precedent):

- **A1** — new §13 "Argument freeze and R7 requirements" appended verbatim.
- **A2** — §6 beat 2.8's italic thesis sentence replaced with the canonical
  two-chapter thesis, staged across advances, plus the rationale note.
- **A3** — new §9.3 "The wayfinding device and the color arc" added to §9.

## 2. Phase B — components (`src/components/section-2/`)

- **`EvolutionRail.js`** — the rail as a world layer (every stop, wound,
  riser, the extension, the `?`, and the entrant at fixed world coordinates)
  viewed through a camera (translate+scale, GSAP-tweened on live advances).
  State-first: `applyState(state, { live })` reconstructs the entire rail —
  camera, stop states (`upcoming` / `lit` / `active` / `defeated` + wound
  visibility), risers, severance, extension, entrant, dimming — from scratch,
  so every build of every rail slide renders its exact frame cold. Snap mode
  (`data-snap`) suppresses all transitions for reconstruction; reduced motion
  always snaps; `destroy()` kills the camera tween. Monochrome except the
  `active` stop's marker — the single sanctioned rail accent. The rail's
  line-language (2px line, small circular markers) is deliberately the 1.5
  waypoint device's descendant.
- **`MurmurationField.js`** — the legacy boids simulation ported and
  re-staged: same three steering rules plus the drifting soft attractor
  (phase 1 preserves the legacy behavior), now full-stage at 2,200 agents
  with a rebuilt-per-frame spatial hash grid (the legacy O(n²) neighbor scan
  does not survive thousands of agents) and batched-path monochrome
  rendering. Phase 2 (the convergence) ramps steering weights over ~5.2s —
  attractor reeled to center and strengthened, an orbital spring + swirl term
  fades in — while a warm bloom brightens at center. `setState({ phase })`
  reconstructs either build state from scratch (seed + warm-up for
  mid-murmuration; an arranged orbit + settle for converged);
  `animate()` runs the convergence live from the flock on screen. Reduced
  motion renders one still of either state — stills from the simulation
  itself, replacing the legacy radial-gradient fallback (which was a CSS
  gradient, not an asset; nothing worth preserving).
- **`ElementGrid.js`** — the stylized periodic table: 118 symbol-only
  monochrome DOM cells in standard layout (f-block below with a gap), each
  carrying a fate class — gas / reactive-corroding / radioactive /
  impractical / survivor. `applyState(step, { live })` reconstructs any
  elimination step; each wave is one auto-timed CSS gesture (per-cell drift
  vectors, a diagonal corrosion sweep, a live-gated pulse-out keyframe that
  cannot replay on reconstruction). Exits animate opacity/transform only.
- **`glyphs.js`** — one minimal single-weight line drawing per good (fish,
  sandals, grain, cattle, salt, shells, iron, metals, gold), shared by every
  surface that shows a good, so the cattle on 2.4's contender row and the
  cattle on the rail are the same object at different sizes.

## 3. Phase C — the ten slides (`src/slides/section-2-origin/`)

All on Section 1/4's architecture: `_applyBuild(n)` full state
reconstruction, data-attribute reveals, direct entry at every build, reduced
motion parity, no timers surviving navigation, no module-level scene caches.
A uniform snap-frame mechanism (root `data-snap` for two frames around any
non-live apply) makes every reconstruction land instantly and exactly; all
staged choreography is gated to live advances (`data-step-live`), so nothing
replays when the snap lifts. All on-screen copy implement-verbatim; all
scripts installed verbatim as notes (see §6.3 for the one disclosed
normalization).

| Slide | Builds | What happens |
|---|---|---|
| `2-00-waypoint-origin` | 1 | The method line returns exactly as 1.5 left it (same geometry, labels, settled dots), fading in from black; the advance ignites the first waypoint — **the first orange in the presentation** — a slow warm bloom (2.2s) while its label brightens. |
| `2-01-the-world-without-it` | 3 | Black; the fisherman/sandal-maker pair land and their trade line attempts and dies (draw-bright-die animation, ✕ at the midpoint); the farmer completes the triangle, the remaining pairs fail in sequence, and the HAS→WANTS cycle arcs appear around the failed triangle; the wall is named. |
| `2-02-the-discovery` | 4 | The triangle reconstructed, wall still standing (small, top); the fish travels its traced arc to the sandal-maker (sandals come back) and rests, held, unconsumed, in a ring; the fish moves on for grain and all three lines settle lit; the birth line lands where the wall stood; the salability line lands beneath. |
| `2-03-the-convergence` | 3 | Black; the murmuration, full screen, 2,200 agents, no leader; the convergence runs live (~5.2s) into orbit around the brightening point, which resolves into the deck's anonymous token (Section 1's disc, unchanged); the line lands. |
| `2-04-the-competition` | 5 | The four contenders (glyph + label) arrive with a gentle stagger on entry; one advance per wound — the contender dims as its single clean line lands; the law. |
| `2-05-the-rail-rises` | 3 | Black; the rail fades in carrying SHELLS · CATTLE · SALT · IRON lit as contenders (+ unlabeled minor marks), camera on the early era; the shells receipt lands and the stop settles defeated; the camera eases right and METALS rises — the rail's first accent. |
| `2-06-two-survivors` | 5 | Black; the table appears under a monochrome kicker; gases drift off; the corrosion wave sweeps diagonally; the radioactive pulse out; the impractical rest settles dim and Au and Ag stand alone. Each wave's line renders small beneath the table; the verdict replaces them. |
| `2-07-the-abstraction-ladder` | 4 | The rail returns with GOLD active; gold's traits land in its wound slot (italic); COINAGE rises with its trust line; PAPER above it (**claim ladder rung 1**, planted casually, never elaborated); the law. |
| `2-08-the-severance` | 4 | The ladder stands over gold; **1971.** lands large and alone; the cut — the stub shrinks open, the ladder detaches and holds suspended, gold recedes to defeated — with the decree line; the chart (rail recedes to 0.16): four indexed lines draw in, headline "What one unit still buys."; the balance, both lines. |
| `2-09-the-pattern` | 6 | The severed frame; the camera pulls back to **the full rail in one frame for the first time**; the two-chapter thesis stacks across three advances (earlier chapters settle); the rail extends right into dark and the protected `?` appears; the entrant takes the dark edge in the smallest legible type on the slide; the limitation follows beneath. The thesis settles once the entrant appears. |

**Manifest:** the ten modules replace the fifteen legacy Section 2 entries;
section identity `origin` / label `Origin`. Deck is now 49 slides;
boot-time numbering normalization holds. Sections 1, 3, 4, 5 untouched.

**Build structure vs. the brief's build numbering (deliberate, disclosed):**
the brief's §9.2 script standard defines every `[→]` as one manual advance,
and §4.5 requires each slide's `[→]` count to equal its build count exactly.
The Phase C scripts mark 38 advances; the Phase C build listings describe 48
states. The resolution: on slides where the script's first `[→]` speaks over
what the listing calls "Build 0" (01, 03, 05, 06, 07, 08, 09), that content
is the *first advance* (build 1), and build 0 is the quiet frame before it —
black on 01/03/05/06, and on the rail slides 07/08/09 the reconstructed rail
state the previous slide left behind (which is what makes the rail read as
persistent across the engine's crossfade). Slides 00, 02, and 04 keep their
listed build-0 content on entry (unmarked prose covers it). Every `[→]` is a
manual advance; nothing the presenter speaks over is auto-timed; the §4.5
audit passes exactly (see §5.5).

## 4. The chart (PROVISIONAL) and SOURCES.md

The 2.7 chart plots four indexed purchasing-power series (USD, GBP, JPY,
CHF), 1971 = 100, as **shapes only** — log-space interpolation between
decade-scale control points with order-of-magnitude CPI-based endpoints. No
point values are rendered on screen (axis marks 100/0 and decade years
only). Flagged `PROVISIONAL DATA` in the module header per §4.7;
`docs/SOURCES.md` gained **WIM-002** (the provisional stub naming the R4
sourcing plan), plus **WIM-003** (1971, the gold window), **WIM-004** (2009
and "seventeen years"), and **WIM-005** (the West Africa 1500s–1800s
bracket) for the other numbers Section 2 puts on screen.

## 5. Verification (§4) — what was actually run

Automation: Playwright 1.62.0 Chromium against `vite preview` (production
build), 1920×1080, DPR 1, on a port this session started and verified.
Evidence under `review/rebuild-r2/`: `verification-results-*.json` (four
suite runs), `static-checks.json`, `console-log.txt`, `performance-matrix.txt`,
`screenshots/`, and the harness itself under `harness/` (kept for
reproducibility). The full suite was re-run at the final code state — once
before the Phase E deletion and again after it — and the results below are
from the final runs. **Totals: 271 checks, 0 failures; the console log is
empty across every pass.**

1. **Build:** `npm run build` clean at every commit on the branch.
2. **Full deck traversal** (52 checks): forward through all 49 slides and
   every build to `5-01-thank-you` (187 advances), backward to 1.1 build 0,
   fast re-forward through Sections 1–2 (exercises animation cancellation).
   At every step: exactly one mounted container, exactly one active, content
   non-empty, all images loaded (with one settle allowance for Section 4's
   ~2 MB PNGs on first decode — see observations). Every Section 2 build
   passed its state probe *live during the traversal* — the same probes used
   for direct entry, so live-advance end states and reconstructed states are
   verified to agree. Traversal screenshots under `screenshots/traversal/`.
3. **Direct entry at every build** (53 checks): all 48 build states of the
   ten slides via `?slide=<id>` plus seeded `deck-state` and a reload — the
   refresh path. Probes assert the exact reconstructed state per build:
   `data-step`, element visibility and opacity, the ignition dot's accent
   color, node/edge/arc states of the triad, the traveling goods' motion-path
   positions (`offset-distance` per leg), murmuration canvas content (pixel
   sampling), per-element fates in the grid (He/Fe/U/Pt/Au/Ag per step),
   rail stop states and wounds, riser visibility, severance, dimming, chart
   draw state, and the camera transform to ±0.5px against the authored
   frames. Plus the two named frames (§4.8) verified live: the first-orange
   ignition and the full-rail pull-back.
4. **Refresh mid-animation** (3 checks): reload mid-convergence on 03,
   mid-corrosion-wave on 06, mid-cut on 08 — each reconstructs its exact
   build state (per deviation §6.12, the murmuration's exact state is its
   build state).
5. **Reduced motion** (93 checks): the full direct-entry matrix, the three
   mid-animation refreshes, the seam, and a live-advance pass over every
   build of all ten slides asserting the complete end state within 420ms of
   the keypress — the fill fades, the failure choreography, both murmuration
   phases (static stills from the simulation), all elimination waves, camera
   moves, the severance, and the chart draw all collapse to instant states.
6. **Console:** zero errors and zero warnings across all runs
   (`console-log.txt` empty). One earlier warning turned out to be
   harness-induced (the probe's `getImageData` on the deck canvas) and was
   fixed in the harness, not the deck.
7. **Static checks** (73 checks, 0 failures — `static-checks.json`):
   the pacing-rule audit (§5.5 below), verbatim-script verification (each
   installed script string-identical to the brief after the disclosed
   `'`→`’` normalization — 63 ASCII apostrophes normalized across the ten
   scripts), on-screen copy presence (all 34 verbatim strings), the
   constitution gates (§5.6), and the PROVISIONAL/SOURCES checks (§4.7).
8. **Screenshots** at 1920×1080 under `review/rebuild-r2/screenshots/`:
   every build of all ten slides (48 frames), the full-rail pull-back frame,
   the first-orange waypoint ignition, the seam into legacy 3-01, and the
   full traversal set.

### 5.4 Measured performance (§4.4)

Method: a `requestAnimationFrame` delta collector spanning each animation
window (`performance-matrix.txt`), plus a callback-cost profiler that wraps
the deck's own frame callback. Final headless run (software raster):

| Scenario | avg fps | p95 frame | frames >20ms |
|---|---|---|---|
| murmuration phase 1 (ambient flock) | 54.0 | 33.3ms | 17/163 |
| murmuration phase 2 (convergence) | 49.3 | 33.4ms | 60/277 |
| elimination: gases drift-off | 60.0 | 16.8ms | 0/163 |
| elimination: corrosion wave | 39.4* | 16.8ms | 3/107 |
| elimination: radioactive pulse-out | 60.0 | 16.7ms | 0/133 |
| elimination: impractical settle + survivors | 60.0 | 16.8ms | 0/145 |
| rail camera: 05 ease to metals | 60.0 | 16.7ms | 0/127 |
| rail camera: 09 full-rail pull-back | 60.0 | 16.8ms | 0/126 |

\* the corrosion average is one 767ms style-recalc frame at the wave start
in that sample (p95 16.8ms = sustained 60 through the wave; earlier samples
of the same wave averaged 52–56). Every rail camera move and elimination
wave holds a 16.7–16.8ms p95 — sustained 60fps.

**The murmuration, honestly.** The flock's p95 sits at ~33ms in this test
environment in both headless and headed runs. Three findings frame that
number: (1) the deck's own frame callback — physics plus render for all
2,200 agents — profiles at **5.4ms median / 7.9ms worst** even before the
optimization passes, far inside the 16.7ms budget; (2) a minimal control
page (nothing but a 1080p canvas doing the same-shape sprite blits) also
fails to lock 60 on this machine — **53.5 avg** — as does an idle black deck
slide in one sample (54); (3) the harness laptop (Intel UHD 620, unattended,
screen locked for part of the session) proved unable to produce stable
headed measurements at all (identical code measured 40–51 avg across runs).
The conclusion is that full-canvas presentation at 1080p is
environment-limited on this rig, not workload-limited in the deck. Three
optimizations landed while chasing this, each keeping the look exactly:
per-frame path fills replaced by a pre-rendered sprite atlas (heading
quantized to 15° — invisible at 4.6px), the bloom pre-rendered once and
blitted scaled instead of a per-frame radial-gradient fill, and the motion
canvas pinned to native 1080p (reduced-motion stills keep the sharper
DPR-scaled backing). Remaining honest gap: a locked-60 demonstration of the
murmuration needs the real recording hardware; flagged in
`rebuild-observations.md` as a one-glance check before the 2.3 take. The
UnitField reference animation (R1's 59.8fps headed benchmark) measured
58.6–59 headed in this same session, so the measurement rig distinguishes
deck workloads from its own ceiling only for incremental-damage animations.

### 5.5 Pacing-rule audit (§4.5)

Every script `[→]` count matches its slide's build count exactly:

| Slide | Builds | `[→]` in script | |
|---|---|---|---|
| 2-00-waypoint-origin | 1 | 1 | ✓ |
| 2-01-the-world-without-it | 3 | 3 | ✓ |
| 2-02-the-discovery | 4 | 4 | ✓ |
| 2-03-the-convergence | 3 | 3 | ✓ |
| 2-04-the-competition | 5 | 5 | ✓ |
| 2-05-the-rail-rises | 3 | 3 | ✓ |
| 2-06-two-survivors | 5 | 5 | ✓ |
| 2-07-the-abstraction-ladder | 4 | 4 | ✓ |
| 2-08-the-severance | 4 | 4 | ✓ |
| 2-09-the-pattern | 6 | 6 | ✓ |

(38 advances; auto-timed staging exists only inside single visual gestures —
the failure sequence, the goods' travel, the convergence, the elimination
waves, the camera moves, the chart draw-in.)

### 5.6 Constitution gates (§4.6)

- **Banned terms** (`engineered`, `purpose-built`, `repurposed`, `designed
  as a solution`): zero across all Section 2 sources.
- **"bitcoin": zero occurrences anywhere in Section 2** — the 2009 entrant
  is described purely by properties, per the neutrality rules.
- **The claim ladder:** the concept is planted exactly once — PAPER's line
  "A claim on gold in a vault. Trust required: the vault." (07 build 3 and
  its script sentence). Full disclosure of every occurrence of the word:
  the same historical claims-on-gold usage recurs inside the capture
  narrative the brief itself specifies verbatim — 08's script ("the issuer
  of the claims could not honor them"), 09's thesis line 2 on screen
  ("claims over-issued") and its script ("the claims on it over-issued…
  when the claims came due"). No occurrence generalizes beyond claims on
  gold; rung 3's generalization stays virgin for 4.04. The 02 slide's birth
  line deliberately avoids the word, as specified.
- **American English:** zero British spellings — with the disclosed
  exception "cancelled" (four occurrences: 09 on-screen thesis and scripts
  of 08/09), which is the brief's and the governing document's own
  consistent verbatim spelling (see deviation §6.3).
- **Typographic apostrophes:** zero ASCII apostrophes between letters in
  copy, notes, and comments (checked mechanically; CSS motion-path literals
  excluded).
- **The color arc:** the accent appears in Section 2's styles in exactly two
  rule contexts — the waypoint ignition (`.s2o-waypoint[data-step="1"] …
  __dot`) and the rail's active stop (`[data-state="active"] … __dot`) —
  and nowhere in Section 2's JS. The murmuration is monochrome; the token
  and bloom use the warm neutrals; the `?` is monochrome.

## 6. Deviations and judgment calls (with rationale)

1. **Quiet build-0 frames** on 01/03/05/06/07/08/09 — see §3 above; forced
   by the brief's own §4.5 audit against the verbatim scripts, resolved in
   the direction that keeps every spoken beat a manual advance.
2. **Apostrophe normalization at install (R1.1 precedent).** The brief's
   scripts and on-screen copy are authored with ASCII apostrophes
   (em dashes, `·`, `[→]` are proper Unicode — the same authoring slip R1.1
   disclosed). Installed with `'` → `’` normalization only; the harness
   verifies every script is byte-identical to the brief after that one
   substitution (§5.5).
3. **"cancelled" retained.** The brief's on-screen copy (09 thesis), the A2
   canonical thesis, and two script positions spell it "cancelled" —
   consistently, five times, across the governing document and this brief.
   Unlike the apostrophes (where the brief's own standard mandates the
   typographic form), no brief rule prefers "canceled," and the presenter
   wrote "cancelled" as the copy of record — so it is installed verbatim and
   flagged here instead of silently changed: strict American style would use
   one l ("canceled"); "cancelled" is a listed variant. One word, presenter's
   call at the notes pass.
4. **The contender wounds stagger between two depths** (shells/salt at one
   row, cattle/iron lower; gold's traits at the upper row). The wound
   paragraphs are wider than the stop pitch; at any single depth adjacent
   wounds collide at every zoom. The stagger reads as specimen-tag texture
   and survives both the close frames and the full-rail pull-back.
5. **Defeated stops dim part by part, not as a group.** The spec's "settled
   low, with its one-line wound retained faintly" crushed the shells receipt
   at the very beat where it lands (build 2's subject) when applied as a
   group opacity. Dot, glyph and label dim individually; the wound keeps its
   own voice — legible at the receipt beat, naturally faint at full-rail
   scale where it is small.
6. **The cycle arcs of 2.1** ("each HAS points at the next person's WANTS —
   the cycle is visible") are drawn as dashed arrows bowed outside the
   triangle, appearing after the pairwise failures; they do not return in
   2.2 (the goods themselves then move, which is the same information as
   objects instead of annotation).
7. **2.2's goods glyphs sit with their producers from build 0** (fish beside
   the fisherman, sandals beside the sandal-maker, grain beside the farmer).
   The brief introduces the traveling fish at build 1; materializing the
   goods at rest first makes the first handoff legible as *movement of a
   thing* rather than an apparition. 2.1 stays purely typographic.
8. **The severance cut point.** The brief names "the link between PAPER and
   GOLD"; the drawn ladder is gold → spine → COINAGE → spine → PAPER, and
   the cut opens at the spine's base (the stub above the gold stop shrinks
   and dims; the whole ladder — both rungs — floats up and holds). By 1971
   the entire convenience structure was the claim on gold, so the break
   belongs below the whole ladder; a cut between COINAGE and PAPER would
   leave coinage attached to gold, which is not the history.
9. **The ? stays monochrome.** The color-arc rule sanctions orange only at
   the waypoint ignition and the rail's `active` stop. The `?` is the open
   seat, not the record's current subject — an orange `?` would pre-load
   emphasis on the question Section 2 refuses to answer.
10. **No stop is `active` after the severance.** Gold's accent dies with the
    cut (build 2 of 2.8) and the orange does not return in Section 2 — the
    throne on the rail is empty until Section 4 argues about it. The rail's
    accent appears exactly twice: METALS rising (2.5 build 3) and GOLD
    reigning (2.6 build 0 through 2.7 build 1).
11. **The murmuration is monochrome white** (the legacy component was
    accent-orange at 140 birds on a half-canvas). The color arc owns this:
    no orange in Section 2 outside the two sanctioned spots. The converged
    point resolves into Section 1's warm-neutral token — the same object the
    hours poured into, which is the continuity the section wants.
12. **A boid field's "exact state" is its build state.** Refresh
    mid-convergence reconstructs the converged orbit (flock character,
    bloom, token) — not the same 2,200 bird positions, which no
    reconstruction of a chaotic system could honestly promise. The harness
    asserts the build state.
13. **METALS carries no wound** — it settles `defeated` without a line (the
    family narrowed to its winner; nothing defeated it). The `defeated`
    state renders wound-less stops as settled-dim only.
14. **The elimination classes are stylized chemistry, defensible per cut:**
    11 gases; 36 radioactive (Tc, Pm, Po, At, Fr, Ra, the actinides, the
    superheavies); 60 reactive/corroding (everything that rusts, burns,
    tarnishes or dissolves, iron included); 9 merely impractical (the noble
    process metals Ru/Rh/Pd/Os/Ir/Pt, W, Re, Hg); Au and Ag survive. The
    report notes, for the record, that palladium dies here as *impractical*,
    not as corroding — consistent with 3.5's coming argument.
15. **The entry fades of 00 and 04** (the device fade-in, the contender
    stagger) are build-0 entry gestures, not spoken-over builds — they play
    on a live entry and land instantly on any reconstruction, and they wait
    out the snap window (a triple-rAF) so reconstruction's transition
    suppression cannot eat them.
16. **`s1q-token` is reused directly on 2.3** for the resolved token rather
    than duplicating the style under an `s2o` name — it is deliberately the
    same object, and a copy would drift.

## 7. The seam (2-09 → legacy 3-01)

Clean mechanically: numbering 16/49, no console output, forward and backward
navigation exact, the opener's painting loads (verified in traversal and the
dedicated seam check; screenshot `screenshots/seam-2-09-to-3-01.png`). The
stylistic step-change is severe and expected: 2-09 ends on the deck's
quietest frame — the settled monochrome rail, the small entrant type, the
`?` — and legacy 3-01 opens with a full-bleed orange AI painting under
"SECTION 03 / PART TWO / What money does." Not smoothed, per the brief; §9.3
(added in Phase A) removes formal openers deck-wide, so R3 replaces that
opener with the second waypoint return.

## 8. Phase E — legacy deletion

After verification passed in full: deleted `src/slides/section-2-history/`
(15 modules), `src/components/EvolutionScene.js`,
`src/components/Murmuration.js` (ported — the new `MurmurationField` is its
descendant), and eight images — the Section 2 opener painting
(`marketplace.png`), the stage artwork (`barter.png`, `seashells.png`,
`precious_metals.png`, `gold_backed_certificate.png`, `fiat.png`,
`bitcoin.png`), and `essence_of_money.png`, which turned out to be
referenced by no module at all (pre-existing orphan; removed under
"now-unreferenced assets"). `src/assets.js` cleaned. Grep verification:
zero references to any deleted module or asset (two comment-only mentions
of "EvolutionScene" remain — the new rail's historical header note, and a
stale sibling reference in Section 3's legacy `MonetisationScene`, logged
as an R3 item rather than touched out of scope). Post-deletion: clean
build, and the standard traversal + direct-entry suites re-run green
(105 checks, 0 failures). `SectionOpener.js` stays — legacy Section 3's
opener still consumes it (R3 scope). `MonetisationScene.js` stays —
Section 3 scope.

## 9. Logged to `docs/rebuild-observations.md`

- `MonetisationScene.js`'s stale "Sibling of EvolutionScene" comment (R3).
- Legacy Section 3's opener painting + `SectionOpener.js` become deletable
  when R3 lands (§9.3 removes formal openers).
- Section 4's ~2 MB goods PNGs decode slowly on first entry (image-weight
  pass candidate; not an R2 defect).
- The murmuration's one-glance performance check on the real recording rig
  (this harness machine cannot demonstrate locked-60 full-canvas
  presentation for any page; the workload itself profiles at ≤8ms/frame).

## 10. Commits on the branch

- `e256c8a` docs: argument freeze, revised 2.8 thesis, wayfinding device
- `fdb193a` R2 Phase B: EvolutionRail, MurmurationField, ElementGrid components
- `26303dd` R2 Phase C: the ten Section 2 slides — waypoint return through the pattern
- `558e91a` R2 Phase D: murmuration sprite renderer for the 60fps gate; SOURCES entries; typographic comments
- `c3b1e8d` R2 Phase E: delete legacy Section 2, scenes, and orphaned assets
- (this report follows as the final commit)

Base: `main` at `7d03c4c` — the §0 merge commit `Merge R0+R1+R1.1: Section 1
rebuild`, created this session per the brief's precondition, with
`npm run build` verified clean on `main` before branching.

Stopping here per the brief: no merge. Section 2 is ready for your viewer
pass; R3 design follows your review.

---

# R2.1 — Presenter-review revisions (Sections 1–2)

**Brief:** `docs/r2-1-revision-brief.md` · **Branch:** `rebuild-r2-section-2`
(continued, unmerged) · **Date:** 2026-07-29

The deck is now **47 slides** (the waypoint interstitial deleted per §B; the
competition and rail-rises slides merged per §E). Every §G gate below was run
at the final code state.

## 1. §A — Continuity groups

**Engine.** Slides may declare `sceneGroup: '<key>'`; at a boundary between
consecutive slides sharing a key, `_isContinuousTransition` routes through
the existing shared-DOM path: no fade to black, no unmount. The incoming
slide adopts the container (and the scene layer cached on it, per the
established container-scoped pattern), rebuilds only its own overlay, and
applies its build state with the scene animating from its current state
(the handoff flag). Direct entry, refresh, and any non-adjacent jump still
mount cold through `render()` — the group changes transitions, never state
ownership. Reduced motion: the scene components snap internally and the
overlay transitions collapse — handoffs resolve instantly.

**One engine behavior change, forced by §G.1's "both directions":** `←` at
build 0 previously entered the previous slide at build 0 everywhere. Inside
a scene group that lands on the previous slide's *birth state* — for 1.1
that state is authored darkness, i.e. a void inside a continuous scene (the
frame capture caught exactly this). Within a group, `←` now restores the
previous slide's **end state** — the stage of the shared scene the viewer
just came from (1.2 b0 ← lands 1.1 b2: field, counter, line; 2-08 b0 ←
lands 2-07 b4: the chart frame). Outside groups the deck-wide convention is
untouched (`↑` remains the jump-to-end key everywhere).

**Groups applied.** `hours-field` → 1.1, 1.2 (shared `UnitField` via
`_hoursScene.js`; the field the viewer watched fill is literally the field
the collapse consumes). `evolution-rail` → the merged 2-04, 2-05 (the
table — see below), 2-06, 2-07, 2-08 (shared `EvolutionRail` via
`_railScene.js`). Overlay handoffs crossfade (~480ms, exiting overlays lift
away); the cleanup timer belongs to the incoming slide's refs and is
cleared in its `onExit`, so rapid navigation can never stack overlays or
leak timers (the fast re-forward traversal asserts zero stale overlays).

**The designed table exception.** 2-05 joins the rail group mechanically —
the rail never unmounts — but its choreography is the §A exception: on
entry the rail dims **in place** (build 0, the chart-dim level 0.16 —
present, not void), the table rises over it on the first advance and the
rail recedes to the heavy dim (0.08); on exit the table lifts away with its
overlay and the rail re-brightens, the camera riding to wherever the next
beat stands. The return to the rail reads as a return in both directions.

## 2. §B — The ignition lives in 1.5

- `1-05-the-promise` gains **Build 6**: the first waypoint ignites — the
  first orange in the presentation, and the reference implementation of the
  §9.3 ignition standard: marker scales to 2× the inactive markers, full
  accent with the soft bloom halo, a single slow ignition pulse (1.2s,
  gated to the live advance so it can never replay), the label rises to
  warm white (`--unit-warm-bright`), the other two labels and markers dim a
  step further. Reduced motion lands the end state instantly.
- `2-00-waypoint-origin` deleted; its script's final-question payload moved
  into 1.5's new closing block verbatim (§B.3). The manifest renumbers.
- §9.3 of the rebuild brief updated: the waypoint return marks boundaries
  from S2→S3 onward; at S1→S2 the ignition lives inside 1.5; the ignition
  spec added as the device's standard.
- **The R1.1 open item (1-05's 4 arrows vs 5 builds) is resolved**: §G.4
  requires counts to match, so the settle build's advance now carries the
  `[→]` before "That's the whole plan…" — the exact resolution the R1.1
  report proposed. With §B.3's new `[→]`, 1.5 stands at 6 builds / 6
  arrows.

## 3. §C — The WIM icon grammar

- **The set** (`glyphs.js`, documented in `docs/icon-grammar.md`): eleven
  drawings on one construction system — 48u grid, 40u live area, one stroke
  weight (2.5u, a constant, deliberately not a parameter), round caps and
  joins, arcs not polylines, fills banned except the fish's eye. Redrawn:
  fish (vesica body, nose pointing the direction it travels), grain (three
  mirrored kernel pairs, the tip awn leaning one unit — the set's one
  asymmetry), sandals (footprint outsole under the thong V), cattle (lyre
  horns, no face), salt (halite's actual cubic crystal habit), shells (a
  cowrie — the money shell — with aperture teeth), iron (cast ingot,
  three-quarter view), metals (three of iron's trapezoids stacked), gold
  (the unmarked round with one luster arc — the metal, not the stamp),
  plus the ladder-riser marks: coinage (the round taking the incuse-square
  stamp) and paper (the note with its medallion), now set inside the riser
  chips. The soft luminance treatment is the existing unit-warm glow family
  applied by placement CSS (`drop-shadow`, rgba(253, 233, 212, …)) — no new
  token, never baked into a drawing.
- **Symmetry (§C.1–.4).** The triad was re-authored: all three label cards
  sit centered below their dots on one shared baseline grid (name row,
  HAS/WANTS row — the farmer's card no longer lives at a different offset
  than the others); every resting good centers exactly `GOOD_LIFT` above
  its node dot; the diagonal edges take a longer top inset so the drawn
  lines start below the label block. Goods in transit ride the edges — each
  path hops off its shelf, blends tangentially onto the edge's lane at a
  30px normal offset, rides the line, and blends off to the receiver's
  shelf (`travelPath()` computes these from the node geometry; the fish's
  traced legs are the same strings). The free arcs are gone (§F.3).
  Geometry is verified live: the symmetry probes assert identical anchor
  offsets across nodes and stops to within 1.5px.

## 4. §D — The rail's final state

- **BITCOIN is named.** The entrant carries `BITCOIN` in stop typography,
  appearing with the entrant build; beneath it, unchanged, the two-line
  neutral description and the limitation line. The constitution gate was
  re-cut to match §D.1: the word appears on stage exactly once (the label);
  it still appears in no script anywhere in Sections 1–2.
- **FIAT joins the record as the one stop that does not touch the line.**
  The cut now opens at the **coinage–paper** spine segment: the paper rung —
  the claim layer — detaches, drifts up-right and dissolves into the FIAT
  marker settling at its fixed float (world (1800, −150), right of GOLD),
  labeled `FIAT` over `1971– : decree.`, with no connector down to the
  line. One continuous idea: the paper rung *becomes* the floating mark.
  COINAGE — a form of the metal itself — stays standing on gold, under a
  dim stub of the broken spine. (R2 had cut at the ladder's base and left
  the whole ladder suspended; §D.2's resolution replaces that reading —
  deviation 8.5 below.) The pattern slide inherits the mark in the
  full-rail frame; both script touch-ups installed verbatim.

## 5. §E — The merged competition record

`04-the-competition` and `05-the-rail-rises` are replaced by
`04-the-competition-record` (8 builds), first slide of the rail group — the
slide is built **on the rail component from build 0**. Contender mode
renders the four early stops as the 2.4 row (enlarged glyph, label beneath,
full-voice wound, no dots, no line) through transform-only custom
properties, so the transformation back to rail geometry never reflows text.
Builds: 0 — the row (CATTLE · SALT · SHELLS · IRON), no line; 1–4 — one
wound per advance, verbatim as delivered; 5 — the law; 6 — the law clears
and **the line draws itself horizontally through the row** (the camera
eases from the row frame into rail framing, dots form beneath the glyphs,
wounds condense to the faint defeated treatment); 7 — the SHELLS stop takes
its dated receipt (the West Africa line replaces the contender wound); 8 —
the camera eases right and METALS rises active. The rail stop order was
re-authored to the row's order so the row the viewer watched **is** the
record — nothing reshuffles during the transformation (deviation 8.3).
Script installed verbatim from §E: 8 advances, 8 `[→]`.

## 6. §F — Craft punch list

1. **Label clipping.** The rail now does camera-aware label layout: every
   text block registers its world anchor; `applyState` clamps each into the
   target camera's viewport (28px world padding) through a `--clamp` custom
   property consumed inside the text transforms. Clamping is **per stop**
   (a column shifts as one unit, keeping its center alignment) and only for
   columns that actually enter the frame — an off-frame column stays put
   rather than piling onto its neighbors. The metals frame itself was
   recomposed (cx 770, s 1.3) to hold the whole record with no text near an
   edge; at the gold/severance frames the iron column clamps inward intact.
   Verified at every build's camera by the direct-entry screenshot set.
2. **Vertical rhythm.** One two-row rhythm across every stop: label row at
   +26, wound row at +64 — the R2 two-depth stagger is gone. The receipt
   (244u) and wounds (218u) fit inside the stop pitch at every camera that
   shows them.
3. **Discovery paths** — §C.2 above; the crossing free arcs are deleted.
4. **Full-rail composition.** The camera gained a vertical anchor (`cy`);
   the full frame composes the line at 670px (~62% stage height). The
   thesis block is 1400px wide, optically centered in the band above the
   rail. At the pull-back the wounds settle away — below the line stand
   only the stop labels and the floating FIAT mark. The riser notes yield
   at the severance (the record keeps its structure, not its footnotes), so
   the FIAT float has clear air at every post-severance camera.
5. **Ignition retrofit** — §B above; 1.5's Build 6 is the standard.

## 7. §G — Verification

Automation: Playwright 1.62.0 Chromium against `vite preview` (production
build), 1920×1080, DPR 1. Evidence under `review/rebuild-r2/`:
`verification-results-r2-1*.json`, `flash-check-results*.json`,
`static-checks-r2-1.json`, `console-log-r2-1.txt`, `screenshots-r2-1/`, and
the harness under `harness-r2-1/` (kept for reproducibility alongside the
R2 harness).

**Totals across the R2.1 suites: 357 checks, 0 failures; the console log is
empty across every pass.** The dynamic suite ran in four parts at the final
code state — standard traversal (63 checks: the 47-slide forward walk with
every changed build probed live, the seam into legacy 3-01, the full
backward walk through every group boundary in reverse, and the fast
re-forward asserting zero stale overlays after rapid handoffs), standard
direct entry (69: every build of every changed slide reconstructed via
`?slide=` plus seeded `deck-state` and a reload — the merged 04 at all
nine states, the new 1.5 Build 6 — plus the two symmetry probes, the five
named frames, and four mid-animation refreshes including mid-line-draw and
mid-cut), reduced-motion traversal (5), and reduced-motion direct (121:
the full direct-entry matrix, the mid-refreshes, a live-advance pass
asserting every changed build fully settled ≤420ms after the keypress, and
ten instant-handoff checks across every group boundary in both
directions). Static suite: 75 checks, 0 failures (§7.2–7.3). Frame
capture: §7.1. Flash and static suites: 99 further checks, 0 failures.

### 7.1 The frame-capture flash proof (§G.1)

Method: park on one side of a boundary, press the key, capture 15 frames at
~90ms across the transition window, decode each and score
`litFraction` — the share of pixels with any channel above 12/255. A frame
is a **void** below 0.04% lit. Calibration: the authored black frame
(2-01 b0) scores 0.0000% — the detector calls black black — while the
dimmest legitimate group frame sits an order of magnitude above threshold.
The deck chrome is hidden during capture so the progress bar cannot mask a
black canvas.

Standard variant (the reduced-motion variant is identical at 0 voids
everywhere):

| Boundary (both directions) | void frames | min lit fraction |
|---|---|---|
| 1-01 → 1-02 (hours field) | 0/15 | 81.28% |
| 1-02 → 1-01 (hours field, back) | 0/15 | 81.28% |
| 2-04 → 2-05 (table rises over dimming rail) | 0/15 | 0.15% |
| 2-05 → 2-04 (back; table lifts, rail re-brightens) | 0/15 | 0.24% |
| 2-05 → 2-06 (table lifts) | 0/15 | 1.15% |
| 2-06 → 2-05 (back; table rises) | 0/15 | 0.90% |
| 2-06 → 2-07 | 0/15 | 2.24% |
| 2-07 → 2-06 (back) | 0/15 | 2.31% |
| 2-07 → 2-08 | 0/15 | 1.53% |
| 2-08 → 2-07 (back) | 0/15 | 1.59% |

**Zero black flashes inside scene groups, both directions**, the table
rise/lift included. A live standard (non-group) boundary was also captured
as an informational control; its black window is real but brief enough to
fall between 90ms samples, so the deterministic calibration frame above is
the detector's proof of sensitivity.

### 7.2 Pacing audit (§G.4)

Every changed slide's `[→]` count equals its build count exactly:

| Slide | Builds | `[→]` | |
|---|---|---|---|
| 1-01-eighty-thousand-hours | 2 | 2 | ✓ |
| 1-02-the-conversion | 3 | 3 | ✓ |
| 1-05-the-promise | 6 | 6 | ✓ |
| 2-01-the-world-without-it | 3 | 3 | ✓ |
| 2-02-the-discovery | 4 | 4 | ✓ |
| 2-03-the-convergence | 3 | 3 | ✓ |
| 2-04-the-competition-record | 8 | 8 | ✓ |
| 2-05-two-survivors | 5 | 5 | ✓ |
| 2-06-the-abstraction-ladder | 4 | 4 | ✓ |
| 2-07-the-severance | 4 | 4 | ✓ |
| 2-08-the-pattern | 6 | 6 | ✓ |

(Auto-timed staging exists only inside single visual gestures — including
the two new ones: the line-draw transformation and the sequenced return
legs of the discovery trades.)

### 7.3 Constitution gates (§G.5) — static suite: 75 checks, 0 failures

- **Banned terms:** zero across all changed files.
- **"bitcoin":** on stage exactly once — the entrant label (§D.1); zero
  occurrences in any script in Sections 1–2.
- **Color arc:** in Section 1's styles the accent appears only in the
  `.s1q-promise[data-step="6"]` ignition rules (plus the R1-era token
  gradient, which blends the accent at 18% into the warm neutral — not a
  deployment of the accent); in Section 2's styles only under
  `[data-state="active"]`. No accent in any Section 1–2 JS. Orange on
  stage: the ignition, METALS rising, GOLD reigning — nowhere else.
- **American English:** zero British spellings ("cancelled" remains the
  brief's own verbatim spelling, R2 deviation §6.3 still standing).
- **Typographic apostrophes:** zero ASCII apostrophes between letters
  anywhere in the changed files — including code comments, per the R2
  Phase D precedent.
- **Scene groups:** declared on exactly the seven §A slides; the
  non-group slides declare none.
- **Icon grammar (§G.6):** all eleven glyphs drawn; one stroke constant,
  no per-call overrides; no icon-font glyph anywhere in Sections 1–2 (the
  deck chrome's fullscreen control is engine UI); the glow treatment
  present at rail glyphs and traveling goods; `docs/icon-grammar.md`
  present. Placement symmetry verified from live geometry: goods' anchors
  and name baselines identical across the three triad nodes to <1.5px;
  glyph and label offsets identical across composed rail stops.
- **PROVISIONAL chart + SOURCES:** WIM-002…005 intact; the R2.1 changes
  put no new number on screen (FIAT's `1971–` is WIM-003; the entrant's
  `2009` is WIM-004).

### 7.4 Screenshots (§G.7)

Under `review/rebuild-r2/screenshots-r2-1/`: every build of every changed
slide via direct entry (59 frames), the full live traversal set,
the first-orange ignition (live), the line-draw transformation as a
five-frame sequence, the FIAT mark in both the severance end state (live
cut) and the full-rail frame, the 2-08 → legacy 3-01 seam, and the flash
burst frames. The clipping sweep at every rail camera is the direct-entry
set itself — row (2-04 b0–5), early (b6–7), metals (b8; 2-05 all), gold
(2-06 all), severance (2-07 all, 2-08 b0), full (2-08 b1–6).

## 8. Deviations and judgment calls (with rationale)

1. **`←` restores the end state within scene groups** (engine). Forced by
   §G.1's "zero black flashes … both directions": the deck-wide `←`
   convention (previous slide at build 0) lands on authored darkness at
   1.1 b0 — a void inside a continuous scene. Within groups, backing up now
   returns to the stage of the scene the viewer just left; outside groups
   nothing changes. This is also what "hands off in reverse" (§A.4) reads
   as from the presenter's seat.
2. **1.5's fifth `[→]`.** The brief's §B.3 replacement supplies arrows for
   builds 1–4 and 6; build 5 (the settle) had none — the pre-existing R1.1
   open item. §G.4's counts-must-match gate forces the resolution the R1.1
   report proposed: the `[→]` now sits before "That's the whole plan…",
   spoken over the settle. One marker added to a paragraph the brief did
   not otherwise touch; flagged here rather than silently done.
3. **The rail's stop order is the row's order** (CATTLE · SALT · SHELLS ·
   IRON; was SHELLS · CATTLE · SALT · IRON in R2). §E's transformation is
   the row *becoming* the record; reshuffling the four mid-morph would read
   as a trick, not a reveal. The R2 order carried no narrative content —
   the receipt beat and every later camera are unaffected.
4. **The metals frame recomposed** (cx 850 s 1.3 → cx 770 s 1.3). At the
   old frame the leftmost column clipped (the §F.1 bug, cattle after the
   reorder); clamping it inward collided with salt's wound. The wider frame
   holds the entire record — four defeated columns and METALS rising — with
   no text near an edge and no clamp at all; "lay the whole record on one
   line" now shows the whole record.
5. **The cut point moved up one rung** (was: base of the ladder, R2
   deviation §6.8; now: the coinage–paper segment). §D.2's "the paper rung
   becomes the FIAT marker" dictates it: the claim layer departs and
   floats; coinage — stamped metal, not a claim — stays standing on gold.
   The R2 reading (whole ladder suspended) is superseded.
6. **Riser notes yield after the severance.** The coinage note occupied
   exactly the airspace the FIAT mark settles into. The annotations served
   their beat in 2.6; post-cut the record keeps structure (chips, spine),
   not footnotes.
7. **The table dims in two stages** (0.16 at entry, 0.08 once the table
   rises). A single heavy dim at entry left build 0 near-black — the void
   §A's exception exists to prevent. At 0.16 the rail reads present at the
   handoff; at 0.08 it is structure beneath the table, not competing text.
8. **Sequenced returns on shared edges.** Sandals (build 1) and grain
   (build 2) now travel *after* the outbound fish clears the lane (a 1.9s
   delay inside the same gesture) instead of crossing it on a free arc.
   §C.2 leaves opposing goods on one line no other honest option, and the
   exchange reads better: give, then receive. Auto-timing within a single
   visual gesture is sanctioned by the pacing rule (§3.5).
9. **The old 2-04 entry stagger is gone.** The contenders are rail stops
   now; on a cold mount they arrive with the engine's entry fade. The
   stagger was R2 texture, not brief content, and a per-stop delay chain
   inside contender mode would leak into every later state flip.
10. **Clamping is per-stop and viewport-gated** (§F.1 "camera-aware label
    layout", interpreted): a column shifts as one unit only when it
    actually enters the frame. Naive per-element clamping misaligned
    columns and dragged off-frame labels onto on-frame neighbors.
11. **1-01/1-02 build the field with `preRadial` + `warmAnim`** (1-01
    previously used neither). The shared field must be collapse-ready no
    matter which slide created it; both caches are paid once at mount,
    inside the entry transition.
12. **Typographic apostrophes now hold in code comments across all changed
    files** (the R2 Phase D precedent extended to the engine and Section 1
    files this session touched), and two stale legacy slide-id examples in
    engine comments were refreshed in passing.

## 9. Commits (R2.1)

- `4c76f7d` R2.1 docs: ignition standard into §9.3; the WIM icon grammar; the revision brief
- `97f7f75` R2.1 §A: scene-group continuity handoffs in the engine
- `3952a8d` R2.1 §C/§D/§E/§F components: the glyph set on one grammar; the rail rebuilt
- `21e8eb4` R2.1 §B–§F slides: ignition in 1.5; hours-field group; the merged competition record; rail-group handoffs
- (this report and the observations-log entry follow as the final commit)

`npm run build` verified clean at the final state; verification evidence
stays untracked under `review/` per the existing convention (flagged in
the observations log since R0/R1).

Stopping here per the brief: no merge. Sections 1–2 with the R2.1 revisions
are ready for your viewer pass.

---

# R2.2 — Transitions, geometry, and the Icon Studio (Sections 1–2)

**Brief:** `docs/r2-2-revision-brief.md` · **Branch:** `rebuild-r2-section-2`
(continued, unmerged) · **Date:** 2026-07-29

Four changes on the delivered Sections 1–2 — the triangle label outside
rule, the crossfade default plus the missing `exchange-triangle` group, the
rail geometry fixes, and the Icon Studio — plus the §E verification, run at
the final code state. Copy unchanged.

## 1. §A — Triangle labels: the outside rule

The centered-below side labels collided with the drawn edges. New placement
rule (now §4.2 of `docs/icon-grammar.md`): **on polygonal layouts, labels
sit on the outside of the shape, never crossing an edge, in mirror symmetry
across the vertical axis.** The fisherman's name + HAS/WANTS block sits
left of its dot, right-aligned toward it; the sandal-maker's sits right of
its dot, left-aligned toward it — both vertically centered on the dot at
one shared offset; the farmer's stays centered below its dot (no edge below
it). Icon anchors unchanged (goods still rest `GOOD_LIFT` above their
dots — the symmetry probe re-measures this).

With the side labels off the triangle, the diagonal edges' 175px top insets
(authored in R2.1 to duck under the below-labels) return to the uniform
64px — the triangle now draws whole. A new geometric probe
(`triadOutsideProbeInPage`) verifies at every build of both slides: side
cards strictly outside their dots, equal vertical offsets, mirrored gaps,
and a segment–rectangle intersection test (Liang–Barsky against each
visible drawn edge, cards padded 2px) proving **no label card crosses any
edge at any build**.

## 2. §B — Crossfade by default; black only on purpose

**§B.1 — the missing group.** 2-01 and 2-02 now share
`sceneGroup: "exchange-triangle"` with a real scene layer
(`_triadScene.js`, the `_railScene.js` pattern): the triad — SVG edges,
crosses, cycle arcs, nodes, plus 2-02's travel layer (traced legs, hold
ring, goods) — is built once and persists across the boundary untorn. The
scene element carries `data-mode` (`world` | `discovery`) plus the active
slide's step attributes; the triad CSS re-keys from slide roots to scene
mode, so the handoff is pure attribute flips: the cycle arcs fade as the
goods fade in on their rest shelves (the goods arrive as 2-02's build-0
state, per the brief), and the reverse on `←` — which, per the R2.1
within-group rule, lands 2-01 at its **end state** (build 3), never its
black birth state. Frame captures both directions: **zero void frames**
(min lit 1.4% / 1.6% across the burst).

**§B.2 — the global default.** The engine's standard transition
(`SlideEngine._crossfade`) is now a **300ms crossfade**: the incoming
slide mounts over the outgoing and rises (opacity plus a 0.985→1 scale
settle) while the outgoing dissolves in place; teardown follows the fade.
Two consequences worth recording:

- **`onEnter` fires at crossfade start**, not after it — a slide that
  choreographs its own arrival (the section openers' `animateIn`) rises
  *while* the outgoing dissolves. Without this, the 2-08 → 3-01 seam
  produced real void frames: the opener's content sat at opacity 0 waiting
  for its timers while the outgoing died. The opener's first two elements
  (section number, kicker) now also start with the fade itself; the larger
  elements keep their staged rhythm.
- **Reduced motion is an instant cut** — and the legacy `SectionOpener`
  now snaps its entrance under `prefers-reduced-motion` (it previously ran
  its timer choreography regardless, so an RM cut landed on ~100ms of true
  black at the seam; the RM frame captures caught it).

Black remains exactly where it is authored: the calibration frame (2-01
b0) still scores 0.0000% lit; the boundaries that *land* on authored
darkness (1-05 → 2-01 forward; 2-04 → 2-03 backward — 2-03's build 0 is
the black before the murmuration) dim monotonically into it and never
void-then-relight. The craft rule is now §3.5 of the rebuild brief:
**"Black is a beat, not a seam. Darkness appears only where the design
calls for it; navigation never manufactures it."**

## 3. §C — Rail geometry

**Markers on the line (§C.1).** The settle motion (upcoming stops at +6px,
defeated at +4px) lived on the stop root — taking the marker dots off the
line after the transformation. It now lives in a `--settle` custom
property consumed by the glyph, label, and wound transforms only; the dot
is pinned at line y. The new automated assertion
(`railGeometryProbeInPage`) measures every visible stop dot against the
line's rendered center at every build camera of every rail slide:
**|Δy| ≤ 0.75px, all states, all cameras** — the BITCOIN entrant dot
included; the FIAT dot is asserted *off* the line at exactly its designed
−150u float (the §D.2 exception, measured against the live camera scale).

**Camera-stable centering (§C.2).** The R2.1 `--clamp` system
(per-viewport label shifting — the cause of the IRON drift at the gold
camera) is deleted outright: labels live in rail-space, centered under
their stops, transformed only by the camera. The clipping rule moved into
the frames themselves. That exposed a real constraint: the defeated wound
columns sit ~4 world px apart, so **no frame edge can fall between IRON
and SHELLS without slicing one** — see deviation 1 for the recomposition.
The probe asserts, per camera: every stop text centered on its own stop
(|Δx| ≤ 0.75px) and, as the re-run clipping sweep, every visible rail
text block fully inside the frame or fully outside it — never sliced
(minimum edge margins reported per frame).

## 4. §D — The Icon Studio

**Process.** 39 candidate drawings — three genuinely distinct
constructions per glyph, 13 glyphs — authored in
`assets/icons/candidates/candidates.js` on the primitives grammar: the 48u
grid, one 2.5u stroke with round caps and joins, small dot terminals at
stroke scale, open linework; no fills beyond r ≤ 2 dots, no
rounded-rectangle app-icon energy, no perspective boxes (the rule that
retired R2.1's isometric salt cube and three-quarter iron ingot). The
contact sheet (`review/rebuild-r2/icon-studio/contact-sheet.html`,
captured to `contact-sheet.png` + per-glyph `row-*.png`) renders every
candidate at display (96), rail (40), and riser (22) size on black with
the unit-warm treatment. The studio loop was real: the first render sent
the salt row back to the bench (the facet read as dice, the pour as an
umbrella, the lattice as a window — reworked to the heap on its ground
line and the crystal cluster) and re-drew iron A's two casting dimples,
which read as a face (now a row of three rivet dots).

**Selections** (recorded in `glyphs.js` as a letter-per-glyph map — any
selection swaps by changing one letter, no redesign; all 39 candidates
stay in the repo as data plus standalone `.svg` files):

| Glyph | Selection | Rationale |
|---|---|---|
| fish | B — the ichthys | One two-arc stroke crossing at the tail; ancient carved provenance; cleanest 22px silhouette. |
| grain | A — the kernel arcs | Reads as a wheat ear at every size; kernel dots carry the terminal language. |
| sandals | A — the outsole and thong | The only construction still "sandal" at rail size. |
| cattle | A — the lyre head | The silhouette is the animal; the skull hung long, the constellation became a smiley. |
| salt | B — the heap | The measured pile on its ground line under falling grain dots; true to the traded good, no false depth. |
| shells | A — the cowrie | The money shell precisely; the aperture alone loses the shell, the scallop is generic. |
| iron | A — the flat ingot | The family trapezoid face-on; the Mars mark reads as a gender sign to a modern audience. |
| metals | A — the stack | Instantly bullion; iron's trapezoid two-and-one — the explicit family. |
| gold | B — the sun mark | Gold's own ancient sign (circle + center dot); a centration mark, not a stamp — coinage keeps the stamp. |
| coinage | A — the incuse square | The first mint mark in the record; survives the 22px riser scale where the beaded rim mushes. |
| paper | C — the counterfoil | The zigzag tear names the claim — a note cut from a ledger stub; kills the app-icon rectangle. |
| fiat | A — the severed tether | The note floating over its own cut anchor line — the severance drawn into the glyph. |
| bitcoin | A — the struck ₿ | The universal mark whole, in the set's stroke and dot terminals; the reductions traded legibility for concept. |

**Applied everywhere.** All surfaces draw through `glyph()`: the traveling
goods and rest shelves (2-01/2-02), the contender row, every rail stop,
the riser chips — and, new, **the FIAT float and the BITCOIN entrant carry
glyphs** on the standard stop anchor: the rail's visual sentence (glyph +
marker + label) holds for every entry, no exceptions. Static checks:
`glyphs.js` holds no inline drawings (no pre-studio assets referenced),
all 39 candidate `.svg` files present, selections cover 13/13, fiat +
bitcoin placed on the rail, no `--clamp` remains anywhere.
`docs/icon-grammar.md` rewritten as the binding standard: construction
rules, the grid, the don't-list, the three families (trapezoid:
iron→metals; round: gold→coinage; note: paper→fiat), placement rules
including §A's outside rule and §C's marker/centering rules, R3 headroom
guidance, and the contact sheet reference.

## 5. §E — Verification

All suites at the final code state (`harness-r2-2/`), dev server,
1920×1080. Zero console errors or warnings across every pass
(`console-log-r2-2.txt`).

- **Build clean** (`vite build`).
- **Standard direct entry:** 104 checks, 0 failures — every build of
  2-01…2-08 direct-entered and probed (exact state + rail geometry +
  outside rule per build), the scripted black beat (1-03 b5 title on
  black) intact, symmetry probes, named live frames (the line-draw
  transformation with the marker-on-line assertion re-run live, the cut →
  FIAT with its glyph, the full-rail pull-back, a five-frame crossfade
  sequence), mid-animation refresh, static checks.
- **Standard traversal:** 91 checks, 0 failures — full deck forward and
  backward (every group handoff and crossfade boundary in both
  directions, including 2-02 b0 `←` landing 2-01 b3), fast re-forward
  through Sections 1–2 with zero stale overlays.
- **Flash check (frame captures):** 11 boundaries, 0 failures — the
  triangle handoff forward and backward with zero void frames; rail
  handoffs zero voids; crossfades at 1-02→1-03, 2-03→2-04, 2-08→3-01, and
  3-01→2-08 backward zero voids; authored-black landings monotonic;
  calibration black = 0.0000% lit.
- **Reduced motion:** direct entry 139 checks, 0 failures (live advances
  settle ≤420ms; instant handoffs across all five group boundaries in
  both directions, the triangle group included; instant cuts at standard
  boundaries ≤200ms with one container); traversal pass 0 failures; RM
  flash check 11 boundaries, 0 failures.
- **Screenshots** under `review/rebuild-r2/screenshots-r2-2/`: the
  triangle slides at every build (2-01 b0–b3, 2-02 b0–b4), the
  competition-record transformation end state (b6, b8, plus the live
  line-draw sequence), the gold camera, the full-rail frame, the FIAT
  severance end state, the 1-03 title black, the crossfade sequence, the
  flash-frame bursts, and the full traversal set. The contact sheet and
  its row captures live under `review/rebuild-r2/icon-studio/`.

## 6. Deviations and judgment calls (with rationale)

1. **The gold/severance frames open past the defeated record** (gold
   cx 1680 s 1.5; severance cx 1790 s 1.3 — was cx 1620 at s 1.22/1.16).
   §C.2 forbids de-centering labels and slicing text; the wound columns
   sit ~4 world px apart, so no left frame edge can include IRON while
   excluding SHELLS or vice versa — "padding may compress spacing" cannot
   rescue a 4px gap. The only clean composition frames the gold chapter
   as METALS · GOLD · the ladder (the severance adds the FIAT float). The
   early defeated columns leave the chapter frame entirely — they exited
   the story at 2-05; the whole record returns at the 2-08 pull-back.
2. **`onEnter` fires at crossfade start** (engine-wide lifecycle change) —
   required so entrance-choreographed slides rise while the outgoing
   dissolves; without it the seam into legacy Section 3 manufactured
   black. Verified across the full traversal in both variants.
3. **`SectionOpener` touched outside the strict Sections 1–2 scope** (a
   shared legacy component used by the Section 3/4 openers): it now snaps
   under reduced motion and starts its first two elements with the
   crossfade. "Black is a beat, not a seam" is a global craft rule and the
   frame captures showed the violations at the seam; entrance-only, the
   staged rhythm of title/image/subtitle unchanged.
4. **The flash-check void threshold recalibrated** from 0.04% to 0.01%
   lit, and the boundary classes made explicit (`group` / `crossfade` /
   `authored-black`). Pure black — the thing the rule abolishes — measures
   exactly 0.0000% (the calibration frame and both authored-black
   landings); a crossfade trough between two dim compositions legitimately
   samples a few hundredths of a percent while carrying real content
   (~1,500 visible pixels at the seam). The old threshold, calibrated
   before crossfades existed, misclassified dim-but-lit frames as voids.
5. **"The full-rail frame with all thirteen glyphs placed"** (§E.6): the
   full-rail end state carries the nine glyphs that belong to it — cattle,
   salt, shells, iron, metals, gold, coinage, fiat, bitcoin. Paper's chip
   is severed away by design at 2-08 (it *became* the FIAT mark); fish,
   grain, and sandals live on the triangle slides. All thirteen render on
   the contact sheet and all thirteen are placed across Sections 1–2; no
   single frame can show all thirteen without violating the severance.
6. **`←` from 2-04 lands on 2-03's authored black** (build 0, the
   darkness before the murmuration). Outside groups the deck convention
   (`←` enters the previous slide at build 0) is unchanged; the landing is
   scripted darkness, recorded in the flash suite as an authored-black
   boundary, not a seam.
7. **Gold's construction changes** (planchet + luster arc → the sun
   mark). The grammar note "gold is the metal, coinage is the stamp"
   survives — the center dot is the alchemical sign / a centration mark,
   not a die strike — and the grammar doc records it. The R2.1 planchet
   stays in the candidate set one letter away (`gold: 'a'`) if the
   presenter prefers that reading.
8. **The triangle's diagonal edge insets return to uniform 64px** (were
   175px at their top endpoints). The long insets existed solely to duck
   the below-labels the outside rule removed; the drawn triangle now
   closes properly around its dots.

## 7. Commits (R2.2)

- `2d73fab` R2.2 docs: the revision brief; black-is-a-beat into §3.5; the icon grammar rebound to the studio
- `3ff4a87` R2.2 §B: the crossfade default — black is a beat, not a seam
- `a055d6e` R2.2 §A/§B.1/§C/§D: the exchange-triangle scene; the outside rule; rail geometry; the Icon Studio selections
- (this report and the observations-log entry follow as the final commit)

`npm run build` verified clean at the final state; verification evidence
stays untracked under `review/` per the existing convention.

Stopping here per the brief: no merge. Sections 1–2 with the R2.2
revisions are ready for your viewer pass.
