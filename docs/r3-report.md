# R3 Phase Report — Section 3: What Money Must Do

**Branch:** `rebuild-r3-section-3` (not merged — awaiting the presenter's viewer pass)
**Base:** `main` at `20cca0d` — the §0 merge commit `Merge R2+R2.1+R2.2: Section 2 rebuild`, created this session per the brief's precondition, with `npm run build` verified clean on `main` before branching.
**Brief:** `docs/r3-session-brief.md` · **Date:** 2026-07-29

The deck is now **46 slides**: nine new Section 3 slides replace the ten
legacy ones; Sections 1–2 are untouched beyond the sanctioned `glyphs.js`
selection extension; Section 4 is untouched, git-verified.

---

## 1. Phase A — components and the Icon Studio extension

### A1. `WaypointInterstitial.js` (`src/components/`)

The §9.3 section-boundary device, debuting as a component: the method line
at exactly 1.5's geometry (rail at stage 320/660 × 1280, waypoints centered
at 470/960/1450, the same 10px dots and 30px labels) with per-waypoint
states. `completed` renders the dot solid at low warmth with a faint halo —
the ignition's residue, visibly *done* against `upcoming`'s dim white;
`active` is the full R2.1 ignition standard (2× marker, accent, bloom, one
1.2s pulse gated to the live apply, label at warm white) while the other
waypoints dim a step further, exactly as 1.5 behaves. API:
`setState({ visible, completed: [...], active: n }, { live })` — full
reconstruction from any state; reduced motion lands end states instantly.
Both interstitials and any future R7 boundary consume the same component.

### A2. `StageLadder.js` (`src/components/section-3/`)

Four stages as ascending steps on one rising line, left-low (COLLECTIBLE,
420/660) to right-high (UNIT OF ACCOUNT, 1560/370), the line extending a
step beyond both outer stops — deliberately not a horizontal rail. The
rail's line-language holds: 2px line, 12px markers pinned exactly on it,
glyphs above, labels below, one vertical rhythm. Per-stage states
`upcoming` / `revealed` / `foundation` (the accent marker with bloom — the
ladder's only orange); three `gate` marks (the arch glyph) at the segment
midpoints, lighting in monochrome warmth; an early-stages bracket with the
signature line; and an entity berth that pins a placed glyph (with its own
small marker) to a stage column. State-first `applyState(state, { live })`
with the rail's snap mechanism; the camera is static — the whole ladder
composes in one frame. The rotation lives on a wrapper and the draw-in
scaleX on the inner bar, so the two transforms never collide.

### A3. `LayerDiagram.js` (`src/components/section-3/`)

The credit tower: three thin-stroke chips (520×100 — the riser-chip
language at tower scale) at one x-spine, PAYMENT APPS at the top of the
stage, BANK DEPOSITS and BASE MONEY beneath as the stack grows downward.
Between chips hang the tie-marks — the counterfoil-jog glyph at 64px with
an addressable caption beside each (caption copy belongs to the slide).
`foundation` brightens the base chip with the slide's single allowed
orange. Same applyState/snap contract; the component itself never contains
the reserved word — the slide supplies the captions.

### A4. The palladium chart (in `05-the-palladium-test.js`)

Two panels in the severance chart's idiom — thin strokes, one baseline, no
gridlines, generous space. Left: CRUSTAL RARITY as two indexed line-marks
(gold at 1, palladium drawn rarer at 0.38×) with the honest caption "the
shorter, the rarer" and the palladium glyph as the panel's specimen mark —
relative lengths only, no numeric values anywhere. Right: PRICE OF ONE
OUNCE · 1990–2026, two log-scale series drawn to the two true crossings —
the 2000–2001 spike above a sub-$300 gold and the sustained 2019–2022
stretch above, palladium back beneath from 2023 — with dash-draw on the
live advance. Flagged `PROVISIONAL DATA` in the module header;
`docs/SOURCES.md` gains **WIM-PD-001** (rarity + 1803, with the recorded
caveat that published crustal-abundance estimates disagree across standard
references — the R4 pass settles and cites the series) and **WIM-PD-002**
(price shapes), both marked PROVISIONAL, plus **WIM-AR-001** (Argentina,
five decades) and **WIM-BTC-001** (the 21,000,000 cap).

### A5. The Icon Studio extension

Thirty new candidate drawings — three genuinely distinct constructions for
each of ten glyphs — appended to `assets/icons/candidates/candidates.js`
on the primitives grammar, rendered to standalone `.svg` files, and added
to the contact sheet (`review/rebuild-r2/icon-studio/`, regenerated, with
per-glyph `row-*.png` captures via `capture-rows-r3.cjs`). The studio loop
was real; the failed reads are recorded with the selections:

| Glyph | Selection | Rationale |
|---|---|---|
| through-time (SoV) | A — the hourglass | Time's own instrument with the set's grain dots falling through. The vessel read as a wine glass; the horizon arc read as a cloche. |
| between-people (MoE) | B — the two figures | The only construction that says "people" at every size. The exchange arcs read as an eye at rail scale. |
| measure (UoA) | B — the graduated rule | The script's own metaphor — the measuring stick itself, one good-dot held against the scale. The dividers closed into a triangle. |
| collectible | C — the cut stone | Instant at 22px: crown, girdle, pavilion. The strung beads read as a smile; the kept shelf was mush. |
| palladium | A — the Pallas mark | The sign the metal was named for in 1803 — the glyph carries the beat's own date, exactly as gold carries its ancient sun mark. |
| dollar | A — the struck $ | The universal mark whole, one through-struck stem — the bitcoin selection's rationale verbatim. |
| peso | A — the sol de mayo | The sun from Argentina's own first peso coinage (1813). Rays and an open center keep it clear of gold's sun mark; the $ sign is historically the peso's own, so it could never distinguish the columns. |
| brick | A — the coursing | Instantly brickwork in pure line. The floor-by-floor draft read as a *ladder* — a collision this section cannot afford. |
| gate | B — the arch | Passage drawn as a doorway over the climb line. The gatepost pair read as a media pause mark. |
| tie | B — the counterfoil jog | The tether carrying the paper family's tear — the link that is a redeemable slip. |

`docs/icon-grammar.md` is extended accordingly: the R3 selections table,
two new families (the own-sign pair gold ↔ palladium; the struck marks
bitcoin ↔ dollar; plus the tear running paper → tie), the entity-berth
extension of the rail's visual sentence, and placement rule §4.7 — the
sloped-line label row (below).

## 2. Phase B — the nine slides (`src/slides/section-3-function/`)

All on the delivered architecture: `_applyBuild(n)` full reconstruction,
data-attribute reveals, direct entry at every build, reduced-motion parity,
the root snap-frame mechanism, live-gated choreography, no timers surviving
navigation. All on-screen copy implement-verbatim; all scripts installed
verbatim as notes with the R1.1/R2 apostrophe normalization (and its
double-quote analog — deviation 3). Section identity `function` / label
`Function`.

| Slide | Builds | What happens |
|---|---|---|
| `3-00-waypoint-function` | 2 | Authored black; the method line returns exactly as 1.5 left it — waypoint 1 *completed* for the first time, 2–3 dim; waypoint 2 ignites (full ignition spec). |
| `3-01-the-three-functions` | 5 | Black; the neutral token from 1.2 returns center (the same `s1q-token` object); the three functions radiate on drawn spokes — store of value left, medium of exchange right, unit of account beneath; the continuity line lands: the competition's dimensions seen from the inside. |
| `3-02-the-functions-separate` | 3 | Black; PRICED IN · PAID IN · SAVED IN land together, empty; the Argentina row fills under its kicker — dollars / pesos / dollars and bricks (two glyphs in the saved column); the separability principle. |
| `3-03-the-order-of-monetization` | 6 | Black; the empty rising line enters under the Boyapati kicker; COLLECTIBLE; STORE OF VALUE with the first gate lighting; MEDIUM OF EXCHANGE, gate, and the acceptance gate-line; UNIT OF ACCOUNT, gate, and the contracts gate-line; store of value takes the foundation state — the ladder's only orange — under the foundation line. First slide of the `stage-ladder` group. |
| `3-04-stage-signatures` | 2 | The inherited ladder resolves to neutral in the handoff (foundation settles, 3-03's overlay lifts); the bracket marks the early stages with the signature line; the verdict lands. Bitcoin is not mentioned. |
| `3-05-the-palladium-test` | 4 | Black; the hook lands alone at center; the chart appears as the hook lifts to the top in one transform gesture; the timing line names 1803; the bar — the section's most important sentence — lands in warm white. |
| `3-06-what-your-money-is` | 4 | Black; PAYMENT APPS alone at the top; BANK DEPOSITS beneath with the first tie — *a claim on your deposit.*; BASE MONEY completes the tower with *a claim on base money.* as the layer principle lands beside the stack (one beat — deviation 2); the base takes the foundation emphasis under the scoping line. Claim ladder rung 2 lives here and nowhere else. |
| `3-07-where-bitcoin-is` | 5 | Black; the ladder returns resolved (its own cold instance — the group does not span the tower); the ₿ glyph is placed at STORE OF VALUE (the entity berth) over the descriptive caption; the two literacy lines take the clear sky above the early stages; the honesty line joins them; the frame clears and the handoff question stands alone. No accent anywhere — placement is description. |
| `3-08-waypoint-judge` | 2 | Authored black; the method line returns — waypoints 1 and 2 completed, 3 dim; waypoint 3 ignites. The advance that leaves hands into the existing Section 4 opener through the standard crossfade. |

**Build structure vs. the brief's numbering (deliberate, disclosed).** The
R2 §6.1 resolution applies unchanged: on every non-group slide the script's
first `[→]` speaks over what the brief lists as "Build 0", so that content
is the first advance and build 0 is the authored black beat before it —
"black is a beat, not a seam," and each of Section 3's discrete arguments
opens on one. The one group slide (3-04) is the one slide whose arrow count
matches its listed transitions, and its build 0 is the inherited scene
state — exactly the two patterns R2 shipped. 3-06 needed one further
resolution (deviation 2). Every `[→]` is a manual advance; the §C.3 audit
passes exactly.

## 3. Phase C — verification

Automation: Playwright 1.62.0 Chromium against the Vite dev server on port
4311 (a stale server from an earlier session still owns 4310 — see the
observations log), 1920×1080, DPR 1. Evidence under `review/rebuild-r3/`:
`verification-results-r3*.json`, `flash-check-r3-results*.json`,
`performance-matrix-r3.txt`, `console-log-r3.txt`, `screenshots/`, and the
harness itself under `harness-r3/`. Every suite was re-run at the final
code state — after the Phase D deletion — and the results below are from
those final runs. **Totals: 298 checks, 0 failures — 172 standard, 102
reduced-motion, 12 + 12 flash boundaries; the console log is empty across
every pass.**

1. **Build:** `npm run build` clean at every commit on the branch.
2. **Full deck traversal** (62 checks): forward through all 46 slides to
   `5-01-thank-you`, every Section 3 build probed live during the walk (42
   probes — the same assertions used for direct entry, so live end states
   and reconstructions are verified to agree), ladder geometry live at
   every ladder build (13), the seam into 4-01 checked for a clean landing
   with its opener image loaded, then the full backward walk to 1.1 b0
   (crossing the ladder group and every authored-black landing in
   reverse), the backward group handoff asserted to land 3-03 at build 6
   with the foundation re-ignited, and the fast re-forward through
   Sections 2–3 with zero stale overlays.
3. **Direct entry at every build** (55 checks): all 42 build states of the
   nine slides via `?slide=` + seeded `deck-state` + reload, probed
   exactly — waypoint states and ignition accents (computed color and
   scale), spoke draws, ladder stop states, gate lighting, foundation
   accents, chart dash state and rarity draws, tower chips, tie captions,
   entity placement, world-clear and handoff — plus ladder geometry per
   ladder build (markers pinned on the line to ≤0.75px, labels centered
   under their stops to ≤0.75px, no padded label box intersecting the
   drawn segment, the entity centered on its column — all measured from
   the live DOM), and 42 direct-entry screenshots.
4. **Refresh mid-animation** (4): mid-ignition-pulse on 3-00 b2, mid-line-
   draw on 3-03 b1, mid-chart-draw on 3-05 b2, mid-chip-reveal on 3-06
   b1 — each reconstructs its exact build state.
5. **Named frames, live** (7 + sequences): both ignitions
   (`ignition-waypoint-2/3.png`), the placed bitcoin glyph with its
   geometry probe re-run live (`bitcoin-placed-at-sov.png`), the layer
   tower taking the foundation emphasis (`layer-tower-foundation.png`),
   the ladder handoff as a five-frame sequence resolving to 3-04 b0, and
   the seam crossfade as a five-frame sequence landing 4-01 clean.
6. **Reduced motion** (102 checks): the full direct-entry matrix, the four
   mid-animation refreshes, a live-advance pass asserting every build of
   all nine slides fully settled ≤420ms after the keypress, the ladder
   handoff instant in both directions, and instant cuts at a standard
   boundary and at the Section 4 seam (≤200ms, one container).
7. **The flash suite** (12 boundaries × 2 variants, 0 failures): the
   §C.1 frame-capture proof at every group boundary and the seams,
   inherited R2.2 detector and thresholds (15 frames at ~70ms, void below
   0.01% lit, chrome hidden):

   | Boundary | class | void frames | min lit |
   |---|---|---|---|
   | CALIBRATION — 3-00 b0 authored black | calibration | reads as void | 0.0000% |
   | ladder fwd 3-03 b6 → 3-04 | group | 0/15 | 1.142% |
   | ladder back 3-04 b0 → 3-03 b6 | group | 0/15 | 1.182% |
   | the seam 3-08 b2 → 4-01 | crossfade | 0/15 | 0.109% |
   | S2→S3 seam 2-08 b6 → 3-00 | authored-black | monotonic | 0.0000% |
   | 3-00 b2 → 3-01 | authored-black | monotonic | 0.0000% |
   | 3-02 b3 → 3-03 | authored-black | monotonic | 0.0000% |
   | 3-04 b2 → 3-05 | authored-black | monotonic | 0.0000% |
   | 3-06 b4 → 3-07 | authored-black | monotonic | 0.0000% |
   | 3-07 b5 → 3-08 | authored-black | monotonic | 0.0000% |
   | seam back 4-01 b0 → 3-08 | authored-black | monotonic | 0.0000% |
   | back 3-03 b0 → 3-02 (black to black) | authored-black | monotonic | 0.0000% |

   **Zero void frames at the group handoffs and the Section 4 seam, both
   variants**; every authored-black landing dims monotonically into its
   designed darkness and never relights. The reduced-motion variant is
   identical at 0 failures.
8. **Screenshots** at 1920×1080 under `review/rebuild-r3/screenshots/`:
   every build of all nine slides via direct entry (42 frames), the full
   Section 3 traversal set (42), both ignitions, the placement, the
   tower's foundation frame, the handoff and seam sequences, and the
   flash-frame bursts. 99 frames from the standard suite plus the flash
   captures.

### 3.1 Measured performance

`requestAnimationFrame` delta collection across the section's heavier
animation windows (`performance-matrix-r3.txt`, final run; Section 3 is
CSS-transition work only — no canvas):

| Scenario | avg fps | p95 frame | frames >20ms |
|---|---|---|---|
| waypoint ignition pulse (3-00) | 60.0 | 16.8ms | 0/90 |
| token + spoke draw (3-01) | 60.0 | 16.8ms | 0/109 |
| ladder line draws (3-03) | 56.1 | 16.8ms | 1/101 |
| foundation ignites (3-03) | 60.0 | 16.8ms | 0/78 |
| ladder handoff 3-03 → 3-04 | 58.5 | 16.8ms | 1/76 |
| palladium chart draw + hook lift (3-05) | 59.1 | 16.8ms | 2/130 |
| layer tower completes (3-06) | 60.0 | 16.8ms | 0/96 |
| bitcoin placement settles (3-07) | 60.0 | 16.7ms | 0/90 |

Sustained 60fps by p95 everywhere; the isolated >20ms frames are the
first-composite/style-recalc singles this rig has shown since R2 (a first
measurement run showed two such one-off spikes on the ladder scenarios;
re-runs settle to the table above — same class as R2's corrosion-wave
recalc frame, recorded honestly rather than chased on hardware the R2
report already characterized).

### 3.2 Pacing audit (§C.3)

Every script's `[→]` count equals its slide's build count exactly:

| Slide | Builds | `[→]` | |
|---|---|---|---|
| 3-00-waypoint-function | 2 | 2 | ✓ |
| 3-01-the-three-functions | 5 | 5 | ✓ |
| 3-02-the-functions-separate | 3 | 3 | ✓ |
| 3-03-the-order-of-monetization | 6 | 6 | ✓ |
| 3-04-stage-signatures | 2 | 2 | ✓ |
| 3-05-the-palladium-test | 4 | 4 | ✓ |
| 3-06-what-your-money-is | 4 | 4 | ✓ |
| 3-07-where-bitcoin-is | 5 | 5 | ✓ |
| 3-08-waypoint-judge | 2 | 2 | ✓ |

(33 advances. Auto-timed staging exists only inside single visual
gestures — the sequenced Argentina cells, the two literacy lines, the
principle following the tower's completion, the chart's series draws.)
Beyond the count, every script is verified string-identical to the brief's
after normalization (§3.3 below) — 9/9.

### 3.3 Constitution gates (static suite, 44 checks)

- **Banned terms** (`engineered`, `purpose-built`, `repurposed`, `designed
  as a solution`): zero across all Section 3 sources.
- **The claim ladder:** the word appears in Section 3 exactly where rung 2
  lives — `3-06-what-your-money-is.js` (the two tie captions and its
  script; 12 occurrences, all inside the brief's specified copy) — and
  nowhere else: no other slide, no component, not the CSS region. The
  components were written so the captions arrive from the slide.
- **R7 territory stays out:** no falsifiability content, no displacement
  framework anywhere in the section (grep-gated).
- **The color arc:** in the Section 3 CSS region the accent appears only
  under the ignition rules (`.wayline … [data-state="active"]`, the
  live-gated pulse) and the two foundation emphases
  (`[data-state="foundation"]`, `[data-foundation="true"]`); no accent in
  any Section 3 JS. On stage: two ignitions, the ladder's foundation
  marker, the tower's base — nowhere else. The gates light in monochrome
  warmth; the placed ₿ is monochrome.
- **American English:** zero British spellings in the new sources
  (mechanically checked; the deleted legacy section carried
  "monetisation" out with it).
- **Typographic apostrophes:** zero ASCII apostrophes between letters in
  copy, notes, comments, and the CSS region (the R2 Phase D standard;
  the gate caught two of my own comment lines during the session and they
  were normalized before landing).
- **Scene groups:** declared on exactly 3-03 and 3-04.
- **Verbatim scripts:** all nine notes string-identical to the brief's
  scripts after the disclosed normalization; all 44 on-screen strings
  present verbatim in their modules.
- **Section 4 untouched (git-verified):** `git diff --name-only` from the
  merge base shows no `section-4`/`section-5` file; Sections 1–2 sources
  untouched beyond `glyphs.js`.
- **Glyphs:** 30 new candidate SVGs present; SELECTIONS covers the ten new
  glyphs (23 total); the contact sheet carries all ten new rows; the
  grammar doc records the extension; every new glyph placed and rendering
  at its surfaces (probed live: the ladder's four stage glyphs and gates,
  the functions row, the Argentina row including the two-glyph saved
  column, the palladium mark, the tie marks, the ₿ entity).
- **PROVISIONAL + SOURCES:** the chart module flagged; WIM-PD-001/002
  marked PROVISIONAL; WIM-AR-001 and WIM-BTC-001 present.

## 4. The seams

**S2→S3 (2-08 → 3-00):** the pattern slide's settled frame dims
monotonically into 3-00's authored black beat, and the method line returns
on the first advance — the device's first return after real absence.
Flash-verified both variants; no incidental black, no void-then-relight.

**S3→S4 (3-08 → 4-01):** mechanically clean — the crossfade carries the
ignited third waypoint into the opener's rising kicker with zero void
frames (min lit 0.109%), numbering 23/46, opener image loaded, one
container. The stylistic step-change is real and expected: Section 3 ends
on the deck's quietest device and legacy 4-01 opens its staged
kicker/title/painting entrance. Per the brief, noted here and not
restyled — Section 4's execution rebuild is R7.

## 5. Phase D — legacy deletion

After all suites passed at the pre-deletion state: deleted
`src/slides/section-3-functions/` (ten modules), the six components whose
only consumers they were (`MonetisationScene.js` — and with it the stale
"Sibling of EvolutionScene" comment logged in R2 — `SectionOpener.js`,
`FunctionColumn.js`, `FunctionsRow.js`, `AmbientCrystal.js`,
`CharacterCard.js`), the now-unreferenced assets
(`functions_of_money.png` — the last §9.3 opener painting —
`icon_gold.png`, `icon_fiat.png`, `icon_property.png`, `icon_shares.png`,
`icon_art.emf`), the dead `.title-slide` / `.title-section-opener` type
classes, and the `functionsOfMoney`/icon entries from `assets.js`.
**`icon_bitcoin.png` survives deliberately: it is the document favicon**
(`index.html`) — logged as a presenter decision, since it never appears on
stage. Grep verification: zero references to any deleted module, class, or
asset anywhere in `src/` or `index.html`. Post-deletion: clean build, and
all four suites re-run green at the final state (the totals in §3 are
those final runs). Three empty legacy slide directories
(`section-1-opening/`, `section-2-history/`, `section-3-functions/`) were
removed from disk.

## 6. Deviations and judgment calls (with rationale)

1. **Authored black build 0 on every non-group slide** — the R2 §6.1
   resolution applied to R3's scripts, which all open directly with a
   `[→]`: the first arrow's content is build 1 and build 0 is a designed
   black beat. Section 3's rhythm — eight discrete arguments — opens each
   on a black beat; the flash suite classifies and proves every landing.
2. **3-06 runs four builds, not the brief's five listed states.** The
   script has four arrows; §C.3 requires counts to match. The brief lists
   the tower's completion (BASE MONEY) and the layer principle as separate
   builds, but the third arrow's paragraph speaks both ("the honest
   picture is a tower … *Layers are not a scam*…"). Resolved in the R2
   direction — every spoken beat one manual advance: the base layer and
   the principle land on arrow three as one gesture (the principle follows
   the chip by 550ms, live only), and arrow four carries the foundation
   emphasis with the scoping line, exactly as its paragraph does.
3. **Double-quote normalization joins the apostrophe normalization.** The
   brief's scripts author internal quotations as ASCII `"…"` (three
   occurrences); they are installed as typographic `“…”`, and the
   verbatim gate compares after down-normalizing both marks. The R1.1/R2
   precedent covered apostrophes only because no earlier script contained
   internal quotes.
4. **The ladder's label row sits at +52** (the rail's is +26). Centered
   below-labels on a rising line cross the incoming segment through their
   left half — the geometry probe measured MEDIUM OF EXCHANGE crossing at
   +48 by ~6px. At +52 the padded box of every label in the set clears
   the drawn line (≈20px margin at the widest), one offset for all four
   stops. Recorded as icon-grammar §4.7: sloped lines deepen the label
   row; markers stay pinned on the line exactly as on the rail.
5. **Gates light in monochrome warmth, never the accent.** The brief
   reserves the ladder's only orange for the foundation state, and the
   color arc sanctions accent only for ignitions, rail emphasis, and
   singular argumentative highlights — three gate marks are structure,
   not the argument's subject.
6. **The gate quotes stack centered beneath the ladder** rather than
   hanging at their gates' positions. At the segment midpoints the two
   quote lines would overlap each other horizontally; the centered stack
   keeps the frame calm, both quotes persist (the ladder's logic stated in
   full), and they settle to 55% when the foundation line lands.
7. **The entity berth pins the ₿ above the stage's own glyph** — glyph
   over its own small marker, the rail's visual sentence for an entity
   standing at a stage. On the line itself it would read as a fifth stage;
   floating far off the line is the FIAT float's language (deliberately
   "not on the line" — a negative reading this descriptive beat must not
   inherit); below the line it collides with the label row. The berth
   settles from above on placement, monochrome.
8. **3-02's headers render as three separate header elements.** The
   brief's "PRICED IN · PAID IN · SAVED IN" reads as three column heads
   with typographic separators; the middots are notation, not copy. Each
   head is verbatim; all three land together on the first arrow.
9. **The peso glyph is the sol de mayo, not a $ variant.** The dollar
   sign is historically the peso's own mark, so a struck-$ peso could
   never distinguish the columns at a glance; Argentina's first peso
   coinage carried the sun (1813), the label beneath does the naming, and
   the open-centered, rayed construction stays clear of gold's sun mark.
10. **The price panel runs 1990–2026 on a log scale.** The beat's claim is
    "long stretches more expensive," and both true crossings live after
    1990; a log scale is the only honest way to keep a 30× range legible
    without exaggerating either metal. Shapes PROVISIONAL, no values
    rendered, window years on the axis only.
11. **The interstitial reuses 1.5's geometry without the question line.**
    "The method line exactly as 1.5 left it" is implemented as the rail +
    waypoints at identical stage coordinates; 1.5's dimmed question
    belongs to that slide's own composition, not to the returning device.
12. **Section identity `function` / label `Function`** (was
    `functions`/`Functions`), matching the new directory and the R2
    `origin`/`Origin` precedent. The boot-time numbering normalization
    makes module `number` fields advisory.
13. **`glyphs.js`'s three R2.2-era comment lines were apostrophe-
    normalized in passing** while the file gained the R3 selections — the
    R2 Phase D standard extended to a file this session already touches;
    no selection or code changed.
14. **`icon_bitcoin.png` retained** as the document favicon (§5) — the one
    legacy icon with a consumer outside the deleted section.

## 7. Logged to `docs/rebuild-observations.md`

The favicon decision; the resolved R2 observations (MonetisationScene,
SectionOpener, the opener painting); the stale port-4310 dev server from an
earlier session (R3's harness runs on 4311); the removed empty slide
directories; a miscount in the Phase C commit message (286 where the
suites total 298 — this report carries the exact numbers); and the
unchanged recording-rig checks inherited from R2.

## 8. Commits on the branch

- `20cca0d` Merge R2+R2.1+R2.2: Section 2 rebuild *(on `main`, per §0;
  build verified clean before branching)*
- `c4edaab` R3 Phase A: WaypointInterstitial, StageLadder, LayerDiagram;
  the Icon Studio extension
- `ee82c31` R3 Phase B: the nine Section 3 slides — the waypoint return
  through the third ignition
- `300cca6` R3 Phase C: the verification suites and the honest fixes they
  forced
- (Phase D — the legacy deletion — and this report follow as the final
  commits)

`npm run build` verified clean at the final state; verification evidence
committed under `review/rebuild-r3/` following the precedent set by the
presenter's versioning of the R2.2 evidence.

Stopping here per the brief: no merge. Section 3 is ready for your viewer
pass; the R2→R3 seam, both ignitions, the ladder, and the placed candidate
are waiting at slides 14–22.

---

# R3.1 — Section 3 Revisions

**Branch:** `rebuild-r3-section-3` (still not merged) · **Brief:**
`docs/r3-1-revision-brief.md` · **Date:** 2026-07-30

Four changes on the delivered Section 3 — the Argentina saved column, the
ladder's gate marks and its foundation line, the palladium beat's two-epoch
reframe, and a full rebuild of the layer tower — plus the verification the
brief's §E specifies. Nine slides still, 46 slides still; Sections 1–2 and 4
untouched (git-verified, working tree included). Slide 3.5 grows from four
builds to five and slide 3.6 from four to six; every other build count is
unchanged. **Totals: 387 checks, 0 failures** — 361 across the four suites
(66 static, 105 standard direct, 71 traversal, 119 reduced-motion) plus 26
flash boundaries across both variants. Every suite ran after the last edit to
`src/` (newest source file 12:58 local; the runs are 13:04–13:28), so the
evidence below is all at the shipped state.

New evidence lives beside the R3 evidence, not on top of it:
`review/rebuild-r3/harness-r3-1/`, `screenshots-r3-1/`,
`verification-results-r3-1*.json`, `flash-check-r3-1-results*.json`,
`performance-matrix-r3-1.txt`, `console-log-r3-1.txt`. The R3 files are
byte-unchanged, so §3 above still reads against its own artifacts.

## R3.1.1 — A. The Argentina slide (`3-02`)

The SAVED IN column now reads **dollars · real estate**; the brick glyph stays
beside the dollar mark, and the idiom moved into the spoken layer where the
script can gloss it ("Argentines literally call it 'saving in bricks,' buying
a floor at a time as the money comes in"). Middle script paragraph replaced
verbatim; builds and choreography untouched. `WIM-AR-001` records the revised
column.

The verbatim gate now compares this script as paragraphs 1 and 3 from
`r3-session-brief.md` plus paragraph 2 from `r3-1-revision-brief.md` §A — the
swap is checked, not assumed.

## R3.1.2 — B. The ladder thresholds and the foundation line (`3-03`, `3-04`, `3-07`)

**The gate marks are gone.** The arch glyph at 30px, straddling a 2px sloped
line, rendered as an unexplainable half-dot (visible in the R3 evidence at
`screenshots/3-03-the-order-of-monetization-b6.png`). It is replaced by a
**threshold tick**: a 24 × 1.5px stroke crossing the rising line at each
between-stage position, rotated to exactly the line's normal, in three states
— absent, dim (`rgba(255,255,255,0.26)`), and warm white
(`--unit-warm-bright`, never the accent).

**The B1 decision rule: the ticks are kept.** They were screenshot-reviewed at
1920×1080 (`screenshots-r3-1/ladder-thresholds-b6.png`, plus every build of
3-03, 3-04 and 3-07). A short stroke crossing a line reads as a threshold
without a legend, at ladder scale, in one look. The brief's fallback — delete
the marks and let the gate text carry the logic — was not needed.

The tick geometry is measured, not asserted: the R3.1 geometry probe puts
every visible tick's center on the drawn line (max perpendicular Δ **0.03px**
across all builds), at its authored x within 0.75px, at 75.72° ± 0.5° (the
line's normal), and long enough to cross the line rather than sit beside it.

**The schedule** (deviation 2 below): a tick appears dim the moment the stage
below it stands on the line — the next threshold visible before it is
explained — and goes warm white on the build that states its logic. So g1 dim
at b2, bright at b3 (the store-of-value reveal); g2 dim at b3, bright at b4
(the acceptance gate line); g3 dim at b4, bright at b5 (the contracts gate
line). 3-04 inherits all three bright; 3-07 returns them all bright with the
line.

**The foundation line** now reads **"Store of value is the foundation
function. The other functions are built on it."** — the structural phrasing
the visual already draws, with the COLLECTIBLE-is-the-first-*stage* collision
removed. 3-03's final script paragraph is replaced verbatim, and it now names
the distinction out loud ("collectible is where a good *starts* — but it
isn't yet a monetary function").

**The grammar rule is written down.** `docs/icon-grammar.md` §1 gains **the
legibility rule (R3.1)**: *any mark whose meaning a viewer cannot infer
without a legend fails the grammar — encode it legibly or delete it*, with its
two binding consequences (the test runs at the shipping surface, not in the
studio; deletion is a legitimate outcome). Placement rule §4.7 is new: marks
that name a position *on* a line are ticks in that line's own language, never
glyphs straddling it. The R3 selections table and the post-R3 headroom note
record both retirements and what the studio process was missing.

## R3.1.3 — C. The palladium reframe (`3-05`) — the two-epoch honesty

The chart invited a fair objection: gold was not the world's money by 1990, so
a price panel cannot carry "palladium never replaced gold as money." The beat
now concedes the fact and uses it. Five builds:

| Build | On stage | The beat |
|---|---|---|
| 0 | authored black | — |
| 1 | the hook | rarer, useful, at times pricier, never money — *"not in any era"* |
| 2 | the chart, price panel retitled **PRICE OF ONE OUNCE · MODERN ERA** | what the chart can and cannot say; gold kept the store-of-value role after the capture |
| 3 | "Discovered in 1803 — facing a monetary network thousands of years old." | epoch one: the ancient network it arrived too late for |
| 4 | **"And when gold's role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium."** | epoch two: the narrowed role it never reached — *price is not moneyness* |
| 5 | the bar | "marginally better is structurally insufficient" — *"in either century"* |

The two epochs land in one register (25px, `--text-secondary`), stacked as a
pair, with the bar concluding beneath in warm white. Script replaced in full,
verbatim, five arrows for five builds. The chart's data, geometry and
PROVISIONAL flags are untouched — only the panel title changed, which is a
scope claim, not a data change, and `WIM-PD-002` now says so. The new
on-screen factual claim gets its own source entry: **`WIM-PD-003`** (central
banks hold gold, not palladium), PROVISIONAL like its siblings, with the note
that its second half is a negative existence claim and R4 must source it as
one. That entry is beyond the brief's letter; it is what the deck's own
sourcing standard requires of a new on-screen fact.

## R3.1.4 — D. The layer tower rebuilt (`3-06`)

The three-boxes-and-side-text layout is gone. The new visual is an **inverted
tower** whose geometry carries the argument: three square-cornered hairline
slabs on one centered spine, **narrowest at the bottom** — BASE MONEY 420px,
BANK DEPOSITS 600px, PAYMENT APPS 780px. More issued above than held beneath
is the bank-run mechanic drawn rather than asserted. The widths are
qualitatively honest and deliberately not to scale; no figure appears on
screen or in the code, and the code comment says so (gated).

Six builds:

| Build | The tower | Copy beneath |
|---|---|---|
| 0 | authored black | — |
| 1 | PAYMENT APPS alone, top of stage | — |
| 2 | BANK DEPOSITS lands beneath; the upper slab settles onto it; link line labeled *a claim on your deposit.* | — |
| 3 | BASE MONEY lands; both settle again; link line labeled *a claim on base money.* — the inverted proportion complete | "More claims than base. That is what a bank run runs on." |
| 4 | **the tremor**: the base flickers once and a shudder travels upward | "Layers are not a scam — they are how money scales. But layers inherit the soundness of their base." |
| 5 | the uppers recede to dim outlines; BASE MONEY takes the foundation emphasis (the slide's only orange) | "This presentation's question is about the foundation asset — underneath them all." |
| 6 | **the held question**: a hairline extends downward from the base slab into empty black, dissolving into it, and holds | *none — the stage carries no copy* |

All copy is centered beneath the tower; no side text. Both link captions sit
right of the spine at one shared alignment (measured: identical to within
0.75px). Script replaced in full, verbatim, six arrows for six builds.

**The settle is state, not a gesture.** Each slab sits 7px lower for every
slab that has landed beneath it — apps at +14 once the tower is complete,
deposits at +7, base at 0 — so a live advance and a direct entry land the
identical frame. The probe measures the offset at every build (±0.6px).

**The tremor, measured.** Sampled in-page at frame rate across the whole
window: the base slab's opacity dips to **0.42** and returns; deposits
shudders first (7.0 → 9.5 → 5.5 → 7.0), then apps 220ms later (14.0 → 16.5 →
12.5 → 14.0) — the ripple genuinely propagates *upward* — with **max slab
displacement 2.50px** and a return to the exact build-4 state. A shudder, not
a collapse. Under reduced motion it is skipped entirely: the suite asserts
`animationName` is `none` on every slab and link 80ms after the keypress, and
that the build still lands its exact state. Direct entry at build 4 never
replays it (snap suppresses animation), which is why the mid-animation
refresh at b4 reconstructs exactly.

**The held question.** The downward line is the tower's third link with
nothing at the far end — the same missing-anchor motif as the FIAT float above
the rail, never explained on screen. It hangs from the base slab's bottom edge
(measured), runs 212px, dissolves to transparent rather than stopping at an
edge, and is the final state: the three copy lines clear, and the probe
asserts nothing above 5% opacity remains of them.

## R3.1.5 — E. Verification

1. **Build:** `npm run build` clean at the final state, and at every
   intermediate state during the session.
2. **Traversal** (71 checks): the full 46-slide forward walk with every
   Section 3 build probed live during the pass (45 probes, so live end states
   and reconstructions are verified to agree), ladder *and* tower geometry
   live at every relevant build (19), the seam into 4-01 clean with its opener
   image loaded, the full backward walk to 1.1 b0, the backward ladder handoff
   asserted to land 3-03 at build 6 with the foundation re-ignited, and a fast
   re-forward through Sections 2–3 with zero stale overlays.
3. **Direct entry at every build** (105 checks): all 45 build states of the
   nine slides via `?slide=` + seeded `deck-state` + reload, probed exactly —
   including every new state (the three threshold values, the second-epoch
   line, the slab widths and settle offsets, both link captions, the recede,
   the tremor's settled frame, and the drop line) — plus 19 geometry probes
   and 35 named-frame checks. Six **mid-animation refreshes**: the four R3
   cases plus the two new choreographies (3-06 b4 mid-tremor, b6 mid-draw),
   each reconstructing its exact build state.
4. **Reduced motion** (119 checks): the full direct-entry matrix, the six
   mid-animation refreshes, a live-advance pass asserting every build of all
   nine slides settled ≤420ms after the keypress (36), the tremor-skipped
   assertion, the ladder handoff instant in both directions, and instant cuts
   at two standard boundaries and the Section 4 seam.
5. **Pacing audit (§E.2).** Every script's `[→]` count equals its build count,
   and the module's declared `totalBuildSteps` equals both:

   | Slide | Builds | `[→]` | declared | |
   |---|---|---|---|---|
   | 3-00-waypoint-function | 2 | 2 | 2 | ✓ |
   | 3-01-the-three-functions | 5 | 5 | 5 | ✓ |
   | 3-02-the-functions-separate | 3 | 3 | 3 | ✓ |
   | 3-03-the-order-of-monetization | 6 | 6 | 6 | ✓ |
   | 3-04-stage-signatures | 2 | 2 | 2 | ✓ |
   | **3-05-the-palladium-test** | **5** | **5** | **5** | ✓ |
   | **3-06-what-your-money-is** | **6** | **6** | **6** | ✓ |
   | 3-07-where-bitcoin-is | 5 | 5 | 5 | ✓ |
   | 3-08-waypoint-judge | 2 | 2 | 2 | ✓ |

   35 advances (was 33). Auto-timed staging still exists only inside single
   visual gestures — the sequenced Argentina cells, the two literacy lines,
   the chart's series draws, and now the tower's tremor stagger. All nine
   scripts verified string-identical after the disclosed normalization: five
   against `r3-session-brief.md` unchanged, 3-02 and 3-03 as paragraph swaps,
   3-05 and 3-06 as full replacements from `r3-1-revision-brief.md` — and the
   gate first asserts the R3.1 brief yields 1/1/5/6 script paragraphs for
   §§A/B/C/D, so a mis-parse cannot pass as a match. 46 on-screen strings
   verbatim; the three replaced strings ("dollars and bricks", "Every
   monetary good must win it first", "PRICE OF ONE OUNCE · 1990–2026")
   asserted gone, not merely joined.
6. **The claim-count gate (§E.3).** "claim" appears in Section 3 in
   `3-06-what-your-money-is.js` and nowhere else — no other slide, no
   component, not the CSS region — and the count is decomposed so the revision
   cannot leak the word silently: **12 occurrences = 3 on-screen copy + 7
   script + 2 comment**, gated on each number. The rebuilt component is named
   around this — `link` / `linkline` / `linkcaption` — so the captions still
   arrive from the slide and the reserved word never enters the component or
   the stylesheet. Two near-misses were caught by this gate during the session
   ("the true structural claim" in the component header and "the chart claims
   only its own window" in the palladium header) and were reworded before
   landing.
7. **The color audit (§E.3).** Exactly three rules in the Section 3 CSS region
   carry orange, and the suite now names them: the waypoint ignition dot, the
   ladder's foundation marker, and the tower's base slab under
   `[data-foundation="true"]`. Zero accent in any Section 3 JS. The threshold
   ticks are asserted warm white and *not* orange, in the stylesheet and again
   from computed style at every build. R3.1 introduces no fourth orange.
8. **Banned terms, R7 territory, American English, apostrophes, scene
   groups:** all clean. The apostrophe gate caught four of my own comment
   lines mid-session and they were normalized before landing. Section 4/5
   untouched and Sections 1–2 untouched beyond `glyphs.js`, verified against
   the R2 merge base *and* the working tree.
9. **Tower proportions at 1920×1080 (§E.6).** Measured from the live DOM at
   every build and again in the live walk: `base 420 < deposits 600 < apps
   780`, each pair separated by a >100px margin ("distinctly wider" as a
   threshold, not an impression), every slab centered on the spine to within
   0.75px, every visible slab resting on the one below with a positive gap
   under 60px, and both link lines and the drop line on the spine.
10. **The flash suite** (13 boundaries × 2 variants, 0 failures) — inherited
    R2.2 detector and thresholds (15 frames at ~70ms, void below 0.01% lit,
    chrome hidden). Two boundaries move: 3-06 now exits from build 6, the
    dimmest non-black frame in the section, and 3-05 → 3-06 joins the list
    because both sides of it changed.

    | Boundary | class | void frames | min lit |
    |---|---|---|---|
    | CALIBRATION — 3-00 b0 authored black | calibration | reads as void | 0.0000% |
    | ladder fwd 3-03 b6 → 3-04 | group | 0/15 | 1.156% |
    | ladder back 3-04 b0 → 3-03 b6 | group | 0/15 | 1.178% |
    | the seam 3-08 b2 → 4-01 | crossfade | 0/15 | 0.109% |
    | S2→S3 seam 2-08 b6 → 3-00 | authored-black | monotonic | 0.0000% |
    | 3-00 b2 → 3-01 | authored-black | monotonic | 0.0000% |
    | 3-02 b3 → 3-03 | authored-black | monotonic | 0.0000% |
    | 3-04 b2 → 3-05 | authored-black | monotonic | 0.0000% |
    | **3-05 b5 → 3-06** | authored-black | monotonic | 0.0000% |
    | **3-06 b6 → 3-07** | authored-black | monotonic | 0.0000% |
    | 3-07 b5 → 3-08 | authored-black | monotonic | 0.0000% |
    | seam back 4-01 b0 → 3-08 | authored-black | monotonic | 0.0000% |
    | back 3-03 b0 → 3-02 (black to black) | authored-black | monotonic | 0.0000% |

    Zero void frames at both group handoffs and the Section 4 seam in both
    variants; every authored-black landing dims monotonically and never
    relights. The held question's lit line does not change that — leaving it
    dims into 3-07's black with no void-then-relight dip.
11. **Measured performance** (`performance-matrix-r3-1.txt`, final run):

    | Scenario | avg fps | p95 frame | frames >20ms |
    |---|---|---|---|
    | waypoint ignition pulse (3-00) | 60.0 | 16.8ms | 0/90 |
    | token + spoke draw (3-01) | 60.0 | 16.8ms | 0/108 |
    | ladder line draws (3-03) | 60.0 | 16.8ms | 0/108 |
    | foundation ignites (3-03) | 60.0 | 16.7ms | 0/78 |
    | ladder handoff 3-03 → 3-04 | 60.0 | 16.8ms | 0/78 |
    | palladium chart draw + hook lift (3-05) | 60.0 | 16.8ms | 0/132 |
    | **thresholds brighten (3-03)** | 60.0 | 16.8ms | 0/78 |
    | **tower completes + settle (3-06)** | 60.0 | 16.7ms | 0/96 |
    | **tower tremor ripples upward (3-06)** | 60.0 | 16.8ms | 0/108 |
    | **tower held question draws (3-06)** | 60.0 | 16.8ms | 0/114 |
    | bitcoin placement settles (3-07) | 60.0 | 16.7ms | 0/90 |

    Still CSS-transition-only work — no canvas in Section 3. The first perf
    pass showed one ~250ms hitch on the ignition scenario (avg 51.3fps, p95
    16.7ms, 1/77 frames >20ms); the re-run above is clean, the same
    first-composite class the R3 report characterized on this rig. Recorded
    rather than dropped.
12. **Screenshots (§E.7)** at 1920×1080 under
    `review/rebuild-r3/screenshots-r3-1/`: **138 frames** — 76 top-level (all
    45 direct-entry builds of the nine slides, the 6 live tower builds, 8
    tremor frames, the held question, the two-epoch frame, the ladder
    thresholds, both ignitions, the placement, and the 5-frame ladder-handoff
    and seam sequences), 45 traversal frames, and 17 flash-frame captures. The
    `VOID-*.png` files are the detector recording where a void frame is the
    *correct* reading — the authored-black class — exactly as in R3.
13. **Console:** empty across every run at the final state. One error survives
    in `console-log-r3-1.txt` from an earlier pass —
    `net::ERR_INSUFFICIENT_RESOURCES`, the rig running out of memory
    mid-suite, not a deck fault (deviation 14). It is left in the log rather
    than scrubbed.

## R3.1.6 — Deviations and judgment calls

1. **Build numbering unchanged from R3 deviation 1.** The brief's "Build 0" is
   the implementation's build 1, and build 0 is the authored black beat before
   it. So 3-05's five listed builds are `totalBuildSteps: 5` (b0–b5) and
   3-06's six are `totalBuildSteps: 6` (b0–b6) — each matching its arrow count
   exactly, which is what §C.3 requires and what §E.2 re-checks.
2. **The thresholds are not all dim from the moment the line enters.** The
   brief says "dim by default, brightening at the build where its gate line is
   stated." Taken literally, that puts three ticks on what 3-03's own build 1
   calls *the empty rising line*, where they read as axis graduations. And
   there are three ticks but only two quoted gate lines — g1 (collectible →
   store of value) has none. Resolved as a per-tick progression: dim when the
   stage below it stands on the line, bright on the build that states its logic
   (g1 with the store-of-value reveal, g2 and g3 with their gate lines). The
   literal reading's *intent* — the threshold is visible before it is
   explained — is preserved per tick instead of globally.
3. **Two R3 glyphs are retired, so eight of the ten ship.** `gate` and `tie`
   leave every surface under the legibility rule the brief asked me to write.
   The drawings, the SELECTIONS entries, the contact-sheet rows and the studio
   rationale all stay on file, annotated `RETIRED AT R3.1` with the reason;
   the grammar doc records both retirements and lapses the paper→tie "tear"
   family. Re-placing either needs a legibility read at the shipping surface
   first — the step the R3 studio process was missing, now part of it. The
   static suite asserts the candidates and selections survive *and* that
   neither glyph is placed anywhere.
4. **The `gate` name outlived the gate glyph.** Component state still says
   `gates: { g1, g2, g3 }` and the DOM still carries `data-gate`, because the
   *logic* is still gate logic — only the drawing changed. The visual state
   attribute is new and three-valued: `data-mark="off|dim|bright"`, with
   unrecognized values falling back to `off`.
5. **The tower's settle is state, not a one-shot gesture.** The alternative —
   a keyframe that starts the slab 7px high and drops it — reads as an upward
   jolt before the settle and leaves nothing for a reconstruction to land on.
   Deriving the offset from how many slabs are beneath keeps direct entry
   exact and makes the rest physically true: the tower genuinely sinks as it
   gains layers.
6. **"No text" at the held question means no *copy line*.** The three
   statements clear; the diagram keeps its own slab labels and its two link
   captions. That is deliberate rather than a shortfall: the descending line
   reads as the unanswered third claim only if the two answered ones are still
   legible beside their lines. The frame is one lit hairline into black under
   an emphasized BASE MONEY — verified quiet in
   `screenshots-r3-1/tower-held-question.png`.
7. **The tower's orange enters at Build 4 (impl. b5) and holds through the
   held question.** §E.3's "orange only: … tower Build 4" is read as naming
   where the accent enters, not as requiring its removal one build later; the
   held question carries the same state forward and introduces no new accent.
   The color audit gates the rule set, so this is visible in the evidence
   either way.
8. **The three copy lines accumulate and settle rather than replacing each
   other.** The caption on the geometry and the principle drop to 0.55 when
   the scoping sentence lands — 3-03's gate-line pattern — so the argument
   stays on stage in three registers (caption / principle / scope) instead of
   flashing past. All three clear together at the held question.
9. **The slabs have square corners** (radius 0, against the riser chip's 3px).
   "Thin-stroke, grammar-consistent, no rounded-app energy" taken at its word:
   these are architecture at tower scale, not chips.
10. **The palladium copy stack was re-laid out** (timing 752, second epoch
    806, bar 902) to fit the new line, and the second-epoch line's width is
    1060px so it breaks at its own sentence boundary instead of orphaning
    "palladium." The chart — data, log scale, geometry, PROVISIONAL flags — is
    untouched.
11. **`LayerDiagram.js` keeps its filename and export** while its internals
    and every class name change (`s3f-layers*` → `s3f-tower*`). One consumer,
    one component, one identity in the harness lists and the R3 record; a
    rename would have been churn.
12. **`WIM-PD-003` is beyond the brief's letter.** The brief specifies the
    Build 3 line but not a source entry. The line asserts a fact about
    official reserves on screen, and the deck's standard is that such facts
    are logged — so it is logged, PROVISIONAL, with the note that its second
    half is a negative existence claim R4 must source as one. `WIM-PD-002` and
    `WIM-AR-001` gained R3.1 notes for the retitle and the revised column.
    Three new static checks gate all of it.
13. **The harness is a new directory, and it fixed two of its own faults.**
    `harness-r3-1/` sits beside `harness-r3/` so the R3 evidence §3 cites
    stays byte-intact. Two harness bugs surfaced and were fixed rather than
    worked around: (a) R3's `directEnter(id, n, 0)` cleared `sessionStorage`
    *after* load, leaving the live deck wherever the restored state had put it
    — latent in R3 because no two consecutive cases shared a slide, fatal for
    R3.1's three tower cases (target b4 landed b5; target b6 landed 3-07 b4);
    every build is now seeded and reloaded. (b) The tremor sampler originally
    screenshotted between reads, far too slow to catch a 140ms trough, and
    missed it on one run; it now samples in-page at frame rate, with the
    screenshots taken as a separate pass. Both failures were harness-side —
    the deck's states were correct in each case — and the first is logged as
    an R3 observation for back-porting.
14. **The renderer is recycled every 24 navigations.** This rig has ~1.5GB
    free of 8GB, and the suite exhausted Chromium's budget partway through
    (`ERR_INSUFFICIENT_RESOURCES`, then a `window.__deck` timeout). A fresh
    page every 24 navigations, plus one retry on a failed direct entry, keeps
    the run inside the budget; nothing about the deck survives a navigation,
    so this changes what is measured not at all. Recorded here and in the
    observations log rather than hidden — and the one console error it produced
    before the fix is left in the log.

## R3.1.7 — Logged to `docs/rebuild-observations.md`

The R3 harness driver bug (with a note that the R3 results remain valid and
that the fix is worth back-porting); the rig's memory ceiling and the
recycling it forced; a second dev server now running on the worktree; the two
retired glyphs and where R7 should start if it wants a passage or tether mark;
the `gate` name outliving its glyph; the tower's proportions being qualitative
with no ratio recorded anywhere; and the R2 recording-rig checks still open.

## R3.1.8 — State

`npm run build` clean. Four slides changed, two components changed
(`StageLadder`'s thresholds, `LayerDiagram` rebuilt), one stylesheet region
revised, three docs updated (`icon-grammar.md`, `SOURCES.md`,
`rebuild-observations.md`), and the R3.1 evidence committed under
`review/rebuild-r3/`.

**Stopping here per the brief: no merge.** The four revised beats are waiting
at slides 16, 17, 19 and 20 — the Argentina row, the ladder's thresholds and
its reworded foundation line, the palladium beat run against both of gold's
eras, and the tower that argues with its own proportions and ends by pointing
at nothing.
