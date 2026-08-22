# Rebuild observations log

Unrelated observations noticed during rebuild sessions — logged, not fixed
(session-brief process rule). Future tasks that fall outside the current
phase's scope also land here.

---

## R0/R1 session (2026-07-28)

- **Future task — unify 4.22 onto UnitField:** 4.22's `FixedSupplyField`
  (35 DOM units) and the new `UnitField` canvas component share one visual
  grammar by design (same unit-to-pitch fill fractions). If 4.22 is ever
  reworked, rendering its field through a shared component would guarantee
  the rhyme stays exact. Not touched this session — 4.22 is out of scope and
  its DOM implementation serves it well at 35 units.
- **Legacy Section 2 opener labels itself "Part One"** (`2-01-section-opener`:
  kicker "Part One", `sectionNumber: 2`). With the new Section 1 in place the
  numbering still reads correctly ("SECTION 02"), but the "Part One" kicker is
  legacy framing that R2 will replace with the rebuilt 2.1.
- **`docs/what-is-money-presentation-master-document.md` §5** still describes
  the legacy seven-slide opening (orange-pill framing). The rebuild brief §2
  notes the master document is updated as the rebuild lands; Section 1's
  entry needs that sync once R1 is approved.
- **`review/` directory is untracked in git** (including `review/opus-5/`
  and the new `review/rebuild-r1/` screenshots). Kept untracked to match the
  existing convention; flag if the presenter wants review evidence versioned.

## R2 session (2026-07-28)

- **`MonetisationScene.js` opens with "Sibling of EvolutionScene"** — that
  sibling was deleted with legacy Section 2 in R2 Phase E. The comment is
  stale but the file is legacy Section 3, which R3 replaces; not touched.
- **Legacy Section 3 still opens with a `SectionOpener` painting**
  (`functions_of_money.png`). Rebuild brief §9.3 (added in R2 Phase A)
  removes formal section openers deck-wide; when R3 lands, `SectionOpener.js`
  and that painting become deletable (they are Section 3's last consumers).
- **`4-04-unfinished-exchange`'s three goods PNGs (~2 MB each) can take over
  a second to decode on first entry** — observed during R2's full-deck
  traversal (images still decoding ~700ms after the slide advance; they
  complete shortly after). Cosmetic on fast hardware, but an image-weight
  pass (R4 or later) would tighten Section 4's entrances. Not an R2 defect;
  nothing in Section 2 uses raster images.
- **Recording-hardware performance check for the murmuration** (2.3): the R2
  harness machine (Intel UHD 620 laptop, unattended, screen-locked part of
  the session) cannot cleanly demonstrate ANY full-canvas 1080p animation at
  a locked 60fps — a minimal control page doing nothing but sprite blits
  measured ~53fps average there. The murmuration's own frame callback costs
  ≤8ms worst-case (profiled), and every other R2 animation holds 60fps
  (p95 ≈16.8ms). Worth one glance at the real recording rig before the 2.3
  take; see the R2 report §5.4 for the full numbers.

## R2.1 session (2026-07-29)

- **The table's heavy-dim constant** (`.s2o-rail[data-dimmed="deep"]`, 0.08)
  is a taste parameter: the rail must read as structure beneath the risen
  periodic table without competing with its text. Worth one glance on the
  recording rig alongside the murmuration check above.
- **The R2 harness under `review/rebuild-r2/harness/` references the
  pre-R2.1 slide ids** (2-00-waypoint-origin, 2-04-the-competition, …).
  Kept as-is — it is the R2 evidence's reproduction script, not a living
  tool; `harness-r2-1/` is current.

## R2.2 session (2026-07-29)

- **The gold/severance chapter framing is a composition decision, not just a
  fix**: with labels honestly centered (the R2.1 clamp deleted), the defeated
  wound columns sit ~4 world px apart, so no frame edge can fall between
  them — the gold and severance cameras now open past the early record and
  frame METALS · GOLD · the ladder at a tighter zoom (s 1.5 / 1.3). Worth
  one glance on the recording rig; the full record still returns at the 2-08
  pull-back.
- **Gold's glyph is now the sun mark** (circle + center dot, its alchemical
  sign). The R2.1 planchet-with-luster reading survives in the candidate set
  one letter away (`gold: 'a'` in `glyphs.js`) if the presenter prefers it.
- **`harness-r2-1/` references pre-R2.2 geometry** (the clamp filter in its
  symmetry probe, the old gold/severance cameras). Kept as-is — it is the
  R2.1 evidence's reproduction script, not a living tool; `harness-r2-2/`
  is current.

## R3 session (2026-07-29)

- **`icon_bitcoin.png` survives the legacy icon purge as the document
  favicon** (`index.html` line 8) — the only remaining consumer of the
  legacy Section 3 icon set. Whether the recorded deck should keep a ₿
  favicon (or take a neutral mark, per the deck's pre-4.01 neutrality
  posture) is the presenter's call; it never appears on stage.
- **Two R2-era observations resolved by Phase D:** `MonetisationScene.js`
  (with its stale "Sibling of EvolutionScene" comment) and
  `SectionOpener.js` + `functions_of_money.png` (legacy Section 3's opener
  painting) are deleted — §9.3's removal of formal openers is now fully
  landed. `AmbientCrystal`, `CharacterCard`, `FunctionColumn`,
  `FunctionsRow`, the remaining legacy category icons (`icon_gold/fiat/
  property/shares.png`, `icon_art.emf`), and the dead `.title-slide` /
  `.title-section-opener` type classes went with them.
- **A dev server from an earlier session still holds port 4310** (node PID
  from 18:41 the same day, predating this session). R3's harness ran on
  **4311**; the harness scripts carry the port as a constant. Worth
  killing the stale process at the next convenient moment.
- **Empty slide directories removed from disk** (`section-1-opening/`,
  `section-2-history/`, `section-3-functions/`) — git-untracked remnants
  of the R0/R2/R3 deletions.
- **The R3 Phase C commit message miscounts the suite total** (says 286;
  the true total at that commit was 298 across the four suites — 172
  standard, 102 reduced-motion, 12 + 12 flash). The r3-report carries the
  exact numbers; left uncorrected rather than amending a pushed-style
  history.
- **The murmuration/table-dim recording-rig checks from R2 remain open**
  (unchanged this session; Section 3 adds no canvas work — its heaviest
  gesture profiles at p95 16.8ms).

## R3.1 session (2026-07-30)

- **The R3 verification suite had a latent driver bug**: `directEnter(id, n,
  0)` cleared `sessionStorage` *after* the page had already loaded, so the
  live deck stayed on whatever build the previous case's restored state had
  put it at. It never fired in R3 because consecutive mid-refresh cases
  never shared a slide; R3.1 added three tower cases on one slide and it
  desynchronized immediately (target b4 landed b5, target b6 landed 3-07
  b4). `harness-r3-1` seeds every build explicitly — 0 included — and
  reloads. The R3 results remain valid: the bug could only mis-drive the
  harness, never mis-report a state it did reach, and the affected R3 cases
  did reach their targets. Worth back-porting if `harness-r3` is ever run
  again.
- **This rig now has ~1.5 GB free of 8 GB**, and a suite that reloads the
  deck ~120 times while screenshotting exhausts Chromium's budget partway
  through (`net::ERR_INSUFFICIENT_RESOURCES`, then a `window.__deck`
  timeout). `harness-r3-1` recycles the renderer every 24 navigations and
  retries a failed direct entry on a fresh page. One console error survives
  in the record, from the pre-fix run; every run after it is clean. Not a
  deck problem — but any future suite that grows should carry the same
  recycling.
- **Two dev servers are now up on this worktree** (4310 from 2026-07-29
  18:41, 4311 from 21:30). The R3 note about the stale 4310 process still
  stands, and there are now two file watchers on one tree. Harnesses run on
  4311.
- **Two R3 glyphs are retired from the deck at R3.1** (`gate`, `tie`) under
  the new legibility rule — sound drawings, unreadable in place. Eight of
  the ten ship. The candidates, the SELECTIONS entries, the contact-sheet
  rows, and the studio rationale all stay on file, annotated; re-placing
  either needs a legibility read at the shipping surface first. If R7 wants
  a passage or tether mark, start there rather than redrawing.
- **The `gate` name outlived its glyph.** The ladder's threshold marks are
  still addressed as `gates` in component state and `data-gate` in the DOM,
  because the *logic* is still the gate logic (`g1`/`g2`/`g3` and the two
  gate lines) — only the drawing changed. Renaming would have churned three
  slides and the probes for no gain; flagged in case it reads as stale later.
- **The tower's proportions are qualitative by design and undocumented as a
  ratio anywhere.** 420 / 600 / 780 px says "each layer issues more than it
  holds" and nothing more precise. If a presenter is ever asked "how much
  more?", that is an R4 sourcing question (no figure is displayed, and none
  should be inferred).
- **The murmuration/table-dim recording-rig checks from R2 remain open**
  (unchanged again; Section 3 is still CSS-transition-only work and the two
  new choreographies — the tower tremor and the drop line — profile at p95
  16.7–16.8 ms with zero frames over 20 ms).

## R4 session (2026-07-30)

- **Every harness generation reads files in a line-ending-dependent way, and
  it silently breaks on a fresh checkout.** The R3.1 static suite extracts
  slide scripts with a regex requiring a bare LF before the closing brace.
  After this session merged R3 to `main` and branched, git materialized the
  tracked sources as CRLF and 23 of 66 static checks failed — the verbatim
  comparisons and the claim-count decomposition were reading empty strings and
  reporting it as a copy failure. Both live suites now normalize on read.
  **The R2, R2.1 and R2.2 harnesses share the pattern and would fail the same
  way**; worth back-porting the one-line fix before anyone trusts their output
  again.
- **The deck chrome is a screenshot hazard.** `IDLE_HIDE_MS = 2000` fades the
  slide counter and progress bar, so whether they appear in a capture depends
  on how long the harness took to get there. The R3.1 baselines caught them
  just before the fade; R4's regression run, 200 ms slower per build, caught
  them just after — producing a 0.1% "diff" on every Section 3 build that had
  nothing to do with the slides. Any future regression suite should either
  mask `y >= 1000` or hide `.deck-chrome` explicitly, and gate the progress
  bar's real content (build counts) statically instead.
- **Both charts now end 2025 and will need an annual refresh.** The
  purchasing-power series and the palladium price series both stop at the last
  complete calendar year. Regenerating is a matter of re-pulling four
  endpoints and two price series — the URLs and series ids are in
  `docs/SOURCES.md` and in each data file's header. The USD 2025 figure is an
  eleven-month average (October 2025 CPI was never published during the
  appropriations lapse) and will not be revised.
- **Do not restore the crustal-rarity panel.** Standard references disagree
  about whether palladium is rarer than gold in the crust *in direction*, not
  just magnitude — CRC-class values make palladium more abundant, Rudnick &
  Gao and Wedepohl make it rarer. The panel measures annual mine supply for
  that reason. WIM-PD-001 carries the table; read it before touching the
  panel.
- **Sections 1–2 carry pre-existing ASCII apostrophes in code comments.** The
  R2-era files predate the R2 Phase D typographic standard, which has only
  ever been applied to files a session actually opened. R4 opened one Section 2
  file and left it clean. Sweeping the rest is a tidy-up for whichever session
  next has a mandate in those files — not worth opening them for on its own.
- **The murmuration cannot be pixel-compared.** `MurmurationField.js` seeds
  bird positions with `Math.random()`, so 2-03's three canvas builds differ by
  ~6% between any two runs. Recorded so no future regression suite treats it
  as a finding.

## R4.1 session (2026-07-31)

- **A new build inside a scene group is the change most likely to break a
  handoff, and pixel regression cannot see it.** Ruling R-03 added a sixth
  build to 2.5, which lives in the `evolution-rail` group. The visual
  regression could only report that 2.5's frames no longer line up with the
  baseline — its b5 is not the baseline's b5 — so a dedicated check
  (`harness-r4/builds-r4-1.cjs`) asserts the elimination waves by counting lit
  cells per fate, and re-checks all three group boundaries in both directions.
  Any future session that adds or removes a build in a group slide should
  write the equivalent rather than trusting a diff.
- **Gates that assert "nothing changed" expire the moment a change is
  authorized.** R4's copy gate proved no copy had moved; R4.1 authorized eight
  edits and the gate had to invert — assert each ruling's wording is on stage
  and each retired wording is gone. The inverted form is the better gate: it
  proves the work landed, not merely that nothing happened. Worth writing that
  way from the start next time.
- **Retired copy hides in the comments that explain its retirement.** Three
  gate failures this session were my own header comments quoting the phrase
  they were documenting the removal of ("rarer than gold", "Rarer in the
  Earth's crust"). The gate was right and the comments were reworded. If a
  future session documents a removed line, describe it rather than quote it.
- **The R3.1 suite carried three assertions R4/R4.1 were authorized to
  break.** Two were inverted (the palladium chart must now carry *no*
  PROVISIONAL flag and must cite its SOURCES entries); one — "Sections 1–2
  untouched" — was retired in favor of `gates-r4.cjs`, which asserts the exact
  file list a cycle may touch. The verbatim gate was kept and amended, not
  waived: it compares the installed script against brief text **plus recorded
  amendments**, and fails loudly if an amendment does not match brief text.
  That pattern is worth reusing whenever an authorized cycle edits copy a
  previous cycle froze.
- **2.5 now runs six builds.** Anything that assumes five — a pacing table, a
  rehearsal clicker count, a recording plan — needs updating. It is the only
  build-count change in Sections 1–3 since the R3 merge, and the regression
  harness gates that fact.
- **Re-running a suite overwrites its own baselines.** `verify-r3-1.cjs
  --part=direct` writes its screenshots to `screenshots-r3-1/` — the same
  directory the R4 regression diffs against. Re-running it as a *check* this
  session silently replaced 45 R3.1 baseline frames with R4.1-state ones,
  which would have made every future regression run report "no change" for
  Section 3. The frames and result JSONs were restored from git and the
  re-run's own results were written to
  `review/rebuild-r4/r3-1-suite-rerun/` instead. **Any suite that both
  produces baselines and is re-run later needs an output-directory switch.**
