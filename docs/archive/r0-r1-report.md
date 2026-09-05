> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# R0 + R1 Phase Report — Scaffold and Section 1: The Question

**Branch:** `rebuild-r0-r1-section-1` (not merged — awaiting the presenter's viewer pass)
**Base:** `main` at `7e5a8c3` (the commit that added the rebuild brief and session brief, per §1 of the session brief)
**Date:** 2026-07-28

---

## 1. What was built

### Phase R0 — Scaffold

- **`src/components/UnitField.js`** — canvas renderer for the 80,000-unit
  hours-field. One unit per working hour; all 80,000 are individually drawn
  (offscreen, then composited). State-first API: `setState({ mode, progress })`
  reconstructs any state instantly (`empty`, `fill`, `steady`, `dim`,
  `collapse`); `animate()` is a layer on top that always resolves to the same
  end state. Reduced motion collapses every animation to its instant end
  state. DPR- and letterbox-aware backing store. All state is instance-scoped
  (no module-level scene caches — the F-01 class of defect is structurally
  impossible); `destroy()` cancels the RAF loop and listeners, so nothing
  survives navigation.
- **`src/slides/section-1-question/`** — five modules on the Section 4
  architecture: `_applyBuild(n)` full state reconstruction, data-attribute
  reveals, direct-entry correctness at every build, reduced-motion parity.
  A `reconstruct` flag set in `onEnter` distinguishes live advances (which
  play the authored animations) from reconstructions (which land instantly
  on the exact end state).
- **Manifest** — the five new slides replace the seven legacy openers;
  Sections 2–5 untouched. Section identity: id `question`, label
  `The Question`. Deck is now 54 slides; boot-time numbering normalization
  (Bucket 1's F-10) verified to hold.
- **Tokens** — `--unit-warm: #FDE9D4`, `--unit-warm-bright: #FEF4E8` added to
  `globals.css` (see §4).
- R0 deliberately scaffolds nothing for Sections 2/3 (per §2.3 of the session
  brief).

### Phase R1 — the five slides

- **1.1 `1-01-eighty-thousand-hours`** (2 builds): black cold open; the fill
  populates in accelerating waves (~8.2s + 800ms authored hold) with a
  synchronized odometer counter (the counter always shows exactly the number
  of units on screen — they complete together); then the line lands verbatim.
- **1.2 `1-02-the-conversion`** (3 builds): the field at steady state
  (counter gone); the collapse streams units toward center — nearest first,
  far corners last, gravitational ease-in, ~4.6s — condensing into a plain,
  softly luminous disc with no symbol or marking; then the two lines,
  sequenced, never stacked.
- **1.3 `1-03-what-is-money`** (3 builds): the token smaller, centered; the
  direct question as a held frame for recorded silence; the question dims and
  the three facts land ~1.2s apart; everything clears, ~600ms beat of black,
  then **WHAT IS MONEY?** at 150px centered — larger than the legacy title
  treatment (132px, left-aligned).
- **1.4 `1-04-the-stakes`** (1 build): the hours-field ghosted at 0.14 canvas
  opacity; the mercy line alone, centered, verbatim. No further elements.
- **1.5 `1-05-the-promise`** (5 builds): the method question; three waypoints
  landing left to right on a single faint line (the Evolution Rail's quiet
  ancestor — unlabeled, unnumbered); build 5 settles the frame (question
  yields, line and dots firm up). The covenant and the light
  educational-purposes sentence are carried verbatim in the notes as spoken
  lines.
- All on-screen copy is implement-verbatim from the session brief, with
  typographic apostrophes. Placeholder notes follow the rebuild brief §9.2
  standard and carry the [canonical] lines verbatim.
- **Deletions (end of R1):** `section-1-opening/` (7 modules),
  `OrangePillCapsule.js`, and the four images referenced only by them
  (`matrix_pills`, `orange_pill_v6`, `orange_pill_v7`, `question_mark`);
  `src/assets.js` cleaned. Post-deletion: clean build, zero orphaned
  references (grep), full-deck traversal with a silent console. The orange
  pill device is gone by design; its effect lives in the close callback,
  which this session did not touch.

---

## 2. Verification (§5 of the session brief) — what was actually run

Automation: Playwright Chromium 151 against `vite preview` (production
build), 1920×1080, DPR 1. Evidence in `review/rebuild-r1/`
(`verification-results.json`, `console-log.txt`, `performance-matrix.txt`,
`screenshots/`). The suite was run in full twice — before the legacy
deletion and re-run at the final commit. Final run: **63 checks, 62 pass,
1 performance sample below threshold** (headless-only variance; see §3 —
the headed numbers meet the gate, and nothing is hidden here).

1. **Build:** `npm run build` clean at every commit on the branch.
2. **Full traversal:** forward through all 54 slides and every build to
   `5-01-thank-you`, backward to slide 1 build 0, forward again (fast, which
   also exercises animation cancellation). At every step: exactly one active
   slide container, exactly one mounted container, non-empty content, all
   images loaded. Per-slide screenshots of pass 1 under
   `screenshots/traversal/`. The seam 1.5 → legacy 2.01 is clean in both
   directions (numbering 06/54, no console output).
3. **Direct entry:** every build of all five slides via `?slide=<id>` plus
   seeded `deck-state` and a reload — the refresh-mid-build path. Assertions
   on canvas pixels (field lit/consumed/ghosted), counter text (`80,000`),
   token/question/facts/title/waypoint visibility, and dim opacity. All pass;
   1.1 and 1.2 reconstruct their exact end states with no replay.
4. **Reduced motion:** the same direct-entry matrix plus a live-advance pass
   under `prefers-reduced-motion: reduce`. Every build resolves completely
   within 380ms of the keypress (fill, collapse, staggers, and the title's
   beat of black all collapse to instant end states). All pass.
5. **Performance:** see §3.
6. **Console:** zero errors and zero warnings across every pass
   (`console-log.txt` is empty).
7. **Constitution gates (new files):** `engineered` / `purpose-built` /
   `repurposed` — zero. `bitcoin` — zero occurrences anywhere in
   `section-1-question/`, including notes. `claim` — zero. British spellings —
   zero. ASCII apostrophes between letters — zero (visible copy, notes, and
   comments).
8. **Screenshots** at 1920×1080 under `review/rebuild-r1/screenshots/`:
   every build of all five slides, the dedicated 1.3 build-3 title frame,
   and the 1.4 frame in a bright rendering plus a simulated dim rendering
   (CSS `brightness(0.55) contrast(1.04)` on the page — method noted
   honestly; the ghost field reads on the bright frame and disappears
   gracefully on the dim one while the line stays legible).
9. **`docs/SOURCES.md`** exists with WIM-001 (the 80,000-hours basis:
   ~40 years × ~2,000 working hours/year).
10. This report.

**Not run** (stated so nothing is over-claimed): no lint/test scripts exist
in the repo; the notes overlay, second-window notes, touch input, and
fullscreen were not exercised this session beyond their untouched engine
code paths.

## 3. Measured performance

Method: a `requestAnimationFrame` delta collector spanning the full
animation window, started immediately before the advancing keypress.
Two independent sample sets, six runs per environment total, at the final
commit (`performance-matrix.txt`):

- **Headed Chromium (GPU-composited — the recording-relevant environment):**
  fill **59.3–59.8 fps** average across all six runs, p95 16.9–17.0ms;
  collapse **58.5–60.0 fps** in five of six runs (three with zero frames
  over 20ms). One headed sample — the first collapse after a fresh browser
  launch — contained a single ~1.1s cold-start frame at the animation
  boundary (its p95 was still 17.0ms; 4 of 237 frames over 20ms); it never
  reproduced in a warm run.
- **Headless (software raster):** 54–60 fps averages with fluctuating
  samples (one collapse sample read 54.0 fps avg / p95 33.3ms — this is the
  single failing check in the final `verification-results.json`, kept there
  deliberately rather than re-rolled until green).
- Across all 12 samples the motion-phase p95 is ≈17ms (~59–60 fps
  sustained); the rare long frames sit at animation start or the at-rest
  sharpen after completion, never mid-motion.

How the gate is met without reducing the count (the count was never
negotiable): the field renders all 80,000 units to a cached offscreen and
composites it; the fill draws only each frame's new units incrementally;
the collapse erases an exact radial consumption front and animates a bounded
sample of units in flight (the brief's batched-wave allowance — visually
indistinguishable, computationally flat). Animations run at native
resolution; static frames re-render supersampled (2×) for crispness, with
per-resolution offscreen caches making the switch a resize + `drawImage`.

## 4. UnitField tokens, color, and geometry

- **Tokens (added to `globals.css`):** `--unit-warm: #FDE9D4` (80%
  `--text-primary` blended toward 20% `--accent`) and `--unit-warm-bright:
  #FEF4E8` (90/10). The canvas reads them via `getComputedStyle` at
  construction; the token disc, glints, and 1.5's settled dots use the same
  two tokens. Rationale: the brief required a warm neutral from the token
  system, explicitly not 4.22's repricing orange — the hours are proto-value,
  not yet the accent. The existing token set (pure white ramp + accent) had
  no warm neutral, so the two blends were added as first-class tokens and
  documented here.
- **Field texture:** per-unit brightness jitter (alpha 0.19–0.53 around a
  0.36 base, 8 quantized buckets) so the field reads as points of light on
  black; most hours sit dim, some glint.
- **Geometry (the 4.22 rhyme):** 4.22's supply-field draws 84×46 units on a
  102×62 pitch — fill fractions 0.8235 horizontal, 0.7419 vertical. The
  hours-field keeps exactly those fractions at a 4.58px pitch: 400×200 grid,
  1832×916px field centered on the stage, units 3.77×3.40px with 0.81/1.18px
  gaps. The rhyme is documented only in code comments (and here), never in
  copy or notes.

## 5. Deviations and judgment calls (with rationale)

1. **The ~800ms hold (1.1 build 0→1).** The brief specifies build 0 as pure
   black with a hold "on entry before any element." Since build 0 contains
   nothing and builds are presenter-advanced, the hold is implemented as
   darkness continuing ~800ms after the advance into build 1, before the
   first unit appears — the authored pause survives even if the presenter
   clicks immediately. Reduced motion drops the hold entirely.
2. **Counter appearance.** The counter fades in with the first countable
   unit (not during the hold), so the hold stays truly empty; it reads `1`,
   `2`, `3…` through the countable phase — it always equals the units on
   screen.
3. **1.3 title frame: the optional faint token is cut.** The brief left it
   to implementer judgment ("if it competes, cut it"). Screenshots showed
   the frame is stronger as pure typography on black.
4. **1.3 fact stagger on reconstruction.** The authored ~1.2s stagger plays
   on the live advance only; direct entry gets a 120/240ms cascade so state
   reconstruction is effectively immediate and exact.
5. **1.5 "settle" (build 5).** Interpreted as: the question dims to 0.3, the
   line brightens (0.18 → 0.30), the dots take the warm token with a faint
   glow. No new elements; the frame holds on the completed line.
6. **Ghost opacity (1.4)** landed at 0.14 canvas opacity after the field
   texture darkened — verified against bright and simulated-dim renderings.
7. **Adaptive resolution** (animations native, statics supersampled) is an
   implementation choice made to pass the 60fps gate honestly on real
   hardware; the visible cost is a single sub-100ms frame at rest after the
   fill completes.
8. **1.2 continuity** is a re-render (the engine's standard 250ms crossfade
   from 1.1), not a shared-DOM continuation — the brief allowed either;
   direct entry and back-navigation are exact, which was the requirement.

## 6. The seam (1.5 → legacy 2.01)

Clean: no console output, chrome and numbering correct (06/54), forward and
backward navigation exact. The expected stylistic step-change is real and
visible — Section 1 ends on a black, typographic method-line frame; legacy
2.01 opens with a full-bleed marketplace photograph and its "Part One"
kicker. Not smoothed, per the brief; R2 replaces that opener.

## 7. Logged to `docs/rebuild-observations.md`

- Future task: unify 4.22's `FixedSupplyField` onto `UnitField` if 4.22 is
  ever reworked (shared grammar is currently maintained by matching
  fractions, not shared code).
- Legacy 2.01 still carries "Part One" framing (R2 scope).
- Master document §5 still describes the legacy opening (documentation sync
  after R1 approval).
- `review/` remains untracked in git, matching the existing convention —
  including this phase's evidence; flag if you want review artifacts
  versioned. (Process note: an over-broad `git add -A` briefly staged
  `review/` during the deletion commit; it was caught and amended out before
  anything else landed on top.)

## 8. Commits on the branch

- `ae060eb` R0: scaffold Section 1 on the Section 4 architecture
- `9fa473b` R1 (1.1/1.2): field texture and animation craft
- `3208208` R1: SOURCES.md and rebuild observations log
- `a1eaf03` R1: UnitField performance — 60fps gate
- `e1b203f` R1: skip static sharpen for empty field states
- `8eda5d5` R1 end: delete legacy Section 1 and its orphaned assets

Stopping here per the session brief: no merge. The rendered Section 1 is
ready for your viewer pass; R2 design follows your review.

---

## 9. R1.1 — Section 1 revisions (staging + script notes)

**Brief:** `docs/r1-1-revision-brief.md` · **Date:** 2026-07-28 · same
branch, continuing after the viewer pass.

### What changed

- **Change A — presenter-paced staging on `1-03-what-is-money`.** The slide
  goes from 3 builds to 5: each of the three facts is now its own build
  (builds 2–4, one advance each); the auto-stagger (~1.2s nth-child delays)
  is removed from live advances. Question dim-on-first-fact (0.3, now held
  through builds 2–4), spacing, type treatment, and the title choreography
  (clear to black, ~600ms beat, title lands — now build 5) are unchanged.
  Direct-entry reconstruction keeps the short 120/240ms cascade so a
  reconstructed frame stays effectively immediate and exact.
- **Change B — notes are the script.** All five Section 1 slides' notes
  replaced with the verbatim recording scripts from the brief §3.2
  (`[→]` advance markers, stage directions, no meta-commentary). The
  sourcing paragraph formerly in 1-01's notes is gone from the script; its
  basis already lives in `docs/SOURCES.md` as WIM-001.
- **Governing document** (`docs/sections-1-3-rebuild-brief.md`): §9.2
  replaced in full with the script standard; the pacing rule ("one advance
  per spoken beat") added as a new bullet at the end of §3.5. No other
  edits to that document.

### Deviation (disclosed, one only)

- **Apostrophe normalization at install.** The brief's §3.2 scripts as
  authored contain only ASCII apostrophes (27 across the five scripts,
  zero U+2019) — contradicting the brief's own §3.1 standard and its §4.5
  note that "the scripts use them throughout" (the em dashes and `→` in the
  same file are proper Unicode, so this is an authoring slip, not encoding
  damage). Installed with `'` → `’` normalization only; verified
  byte-identical to the brief otherwise (string-equality check per slide in
  `static-checks-r1-1.json`). No word, punctuation, or spacing changes.

### Verification (what was actually run)

Automation: Playwright 1.62.0 (Chromium 1234) against `vite preview`
(production build), 1920×1080, DPR 1. Evidence:
`review/rebuild-r1/verification-results-r1-1.json` (58 browser checks,
0 failing), `static-checks-r1-1.json` (41 checks, 1 failing — the known
1-05 mismatch below), `console-log-r1-1.txt` (empty),
`screenshots-r1-1/`. Two process notes, stated so nothing is hidden: the
first traversal run failed spuriously because the harness raced the
engine's transition-time state persistence with fixed sleeps — the harness
was fixed to poll for settle and re-run (the deck needed no change); and
the first two runs unknowingly hit stale preview servers on ports
4173/4174 left over from earlier sessions (they serve `dist/` from disk,
so content was current — confirmed by the build-5 checks passing) — the
recorded final run is against a server this session started on a
verified-free port. The full suite passed 58/58 twice end to end.

1. **Build:** `npm run build` clean.
2. **Traversal:** forward through all Section 1 builds into the legacy
   2-01 seam (images loaded, numbering 06/54), backward to 1.1 build 0,
   fast re-forward (exercises animation cancellation). Exactly one active,
   one mounted, non-empty container at every step; observed build sequence
   exactly matches the new structure (1-03 emits 2,0 → 2,5). Console
   silent throughout.
3. **Direct entry, 1-03, builds 0–5** (seeded `deck-state` + reload):
   token/question/facts/title visibility flags exact per build; question
   opacity 1.00 at build 1 and 0.30 at builds 2–4; revealed facts and the
   title settle at opacity 1.00.
4. **Reduced motion:** the same direct-entry matrix plus a live-advance
   pass under `reducedMotion: reduce` — every build (including the new
   2–4) is fully settled within 380ms of the keypress; the title's beat of
   black collapses to instant.
5. **Notes rendering:** overlay on 1-02 and 1-05 (the two longest
   scripts): body text is string-identical to the installed notes, `[→]`
   markers render legibly, and the Bucket 1 scroll fix is in place
   (`overflow-y: auto`; at 1920×1080 both scripts currently fit without
   scrolling — 02: 369/369px, 05: 528/528px). Second-window notes verified
   string-identical on both, screenshots taken. One honest caveat: notes
   render as plain text, so the scripts' `*italics*` display as literal
   asterisks — legible, but not typographic italics. Changing the notes
   renderer is outside this brief's two-change scope; flagged below.
6. **Build ↔ `[→]` counts** (verification item 3):

   | Slide | Builds | `[→]` in script | |
   |---|---|---|---|
   | 1-01-eighty-thousand-hours | 2 | 2 | ✓ |
   | 1-02-the-conversion | 3 | 3 | ✓ |
   | 1-03-what-is-money | 5 | 5 | ✓ |
   | 1-04-the-stakes | 1 | 1 | ✓ |
   | 1-05-the-promise | 5 | 4 | **✗ FAIL** |

7. **Constitution gates** on changed files: banned terms zero; "claim"
   zero anywhere in Section 1 copy and notes; "bitcoin" zero in
   `section-1-question/`; American English; no ASCII apostrophe between
   letters (after the disclosed normalization); §9.2/§3.5 doc edits
   verified present and the placeholder standard gone.
8. **Screenshots** under `review/rebuild-r1/screenshots-r1-1/`: the six
   builds of 1-03 (live-advance path), notes overlay and second window on
   1-02 and 1-05.

### Open items for the presenter (not fixed — out of scope)

1. **1-05 script/build mismatch (the one failing check).** The slide has
   5 builds; the brief's script has 4 `[→]` markers — build 5 (the
   settle) has no advance in the script. Installed verbatim per the brief;
   fixing requires either a fifth `[→]` in the script (likely before
   "That's the whole plan…", spoken over the settle) or folding the settle
   into build 4. Both alter things this brief locks; your call.
2. **Italics in notes render as asterisks** (plain-text renderer) in both
   the overlay and the second window. If typographic italics are wanted
   for stage directions, `NotesOverlay` needs a minimal formatter.

### Commits (R1.1)

- `08541e2` R1.1: presenter-paced 1-03 staging; Section 1 notes are the
  recording scripts (includes the §9.2/§3.5 doc edits and the R1.1 brief
  itself), plus the report commit that follows it.

Stopping after this report per the brief: no merge.
