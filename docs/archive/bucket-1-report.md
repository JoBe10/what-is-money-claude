> **Historical record — archived, not authoritative.** The session it reports is complete; its rulings are absorbed into `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as evidence: measurements, screenshots and decision logs referenced elsewhere still resolve here. Nothing here governs.

# Bucket 1 — Implementation Report

**Branch:** `bucket-1-review-fixes` (branched from `b6aebdc`, the tip of `main`)
**Brief:** `docs/bucket-1-implementation-brief.md`
**Date:** 27 July 2026
**Status:** All seven phases implemented, verified and committed. **Not merged** — awaiting your review.

---

## 0. How to read this

Seven commits, one per phase, each carrying its own verification record. Every
browser claim below was produced by driving the **built `dist/`** in headless
Chrome over the DevTools Protocol at a forced 1920×1080 viewport, extracting
*genuinely painted* text — every text node whose ancestors are all visible and
whose cumulative opacity exceeds 0.04 — and reading computed geometry. Nothing
below is inferred from source or from eyeballing a screenshot unless it says so.

**What was not run.** `package.json` still defines only `dev`, `build` and
`preview`. There is no lint script and no test script, so none was run and none
is claimed. `npm run build` is the only project command that exists; it passes.

| Commit | Phase |
|---|---|
| `c47b5fc` | A — engine and navigation fixes |
| `e7d73d6` | B — repository hygiene |
| `76d7427` | C — Section 4 and close content and wording fixes |
| `5667708` | D — comparison table and 4.22 refinements |
| `efc54a2` | E — notes qualifications |
| `b27aba6` | F — American English sweep, deck-wide |
| `7b81240` | G — documentation sync |

Whole branch: **76 files changed, 793 insertions, 1,864 deletions.** The deck is
still 56 slides across 144 build states.

---

## 1. What changed, per phase

### Phase A — Critical engine and navigation fixes

**A1 (F-01) — stale-scene corruption on second traversal.** Implemented the
brief's stronger alternative rather than the minimal fix. The module-level
`this._scene` cache is gone entirely; the container expando (`__evolution` /
`__monetisation`) is the single source of truth in `render`, `onEnter` and
`onExit`. `SlideEngine` now passes the outgoing container into `onExit`, so
teardown no longer needs a cached reference — that is the one engine change the
stronger fix required, and it is additive (a new field on an existing ctx
object). Both scene components carry a comment recording the invariant.

**A2 (F-04) — notes overlay clipped long notes.** `.notes-card` is a capped flex
column (`max-height: calc(100vh - 80px)`); kicker, title and footer are pinned
and only `.notes-card__body` scrolls (`overflow-y: auto`, `min-height: 0`,
`overscroll-behavior: contain`). `NotesOverlay.setSlide` resets `body.scrollTop`
so a new slide never opens part-way down the previous slide's offset.

**A3 (6.7) — self-hosted runtime font dependencies.** Both CDN `<link>` tags are
gone. Inter is served from `assets/fonts/` via `src/styles/fonts.css` — the same
woff2 files Google serves, weights 300–700, latin + latin-ext. Inter is a
variable font, so all five weights resolve to two files; the per-weight faces
mirror Google's own CSS exactly (same unicode-ranges, same weights) so metrics
and every measured line break are unchanged. The Tabler webfont is replaced by
`src/styles/icons.css`, which reproduces the `ti ti-*` class API with inline SVG
masks for the eleven glyphs the deck actually uses: `bread`, `apple`, `meat`,
`egg`, `arrows-exchange`, `ruler-measure`, `shield-check`, `diamonds`, `palette`,
`maximize`, `minimize`.

### Phase B — Repository hygiene

**B1 (F-08).** Deleted the thirteen inactive Section 4 modules,
`_problem-solving-rows.js` and `ProblemSolvingScene.js`; removed the ten
`assets.js` imports/exports used only by them, the unused `orangePillIngredients`
export and the dead `images.iconArt` entry; deleted the eleven now-unreferenced
PNGs. `src/slides/section-4-ideal-store/` went from 36 files to 25 — 23 slides
plus two data files. `assets/images/` went from 43 files to 32.

**B2 (F-10).** `main.js` sets `slide.number = index + 1` at boot, with a comment
recording that the manifest is the single source of truth for ordering. No slide
module was hand-edited.

### Phase C — Section 4 and close

| | |
|---|---|
| **C1** | 4.05's redeemed claim is `opacity: 0`, not `0.1`. The document said "disappears completely"; now it does. |
| **C2** | Removed the art clauses from 4.19's and 4.20's notes. Neither slide renders an art asset. No art render was added. |
| **C3** | 4.04's notes carry the earned-at-origination clarification. The visible definition is unchanged. |
| **C4** | 4.23 is the true final frame; 5.01 is a silent release. |

On **4.23**: the dim bottom line that repeated the kicker verbatim is deleted;
the three-line conclusion is optically centered (y 540, 1200 px wide, the
authored line breaks preserved); and a 900 ms delay on the conclusion's entrance
gives a genuine hold on pure black after the summary clears. The delay sits on
the *visible* state, so stepping backward is still immediate, and the
reduced-motion block overrides it to 0.

On **5.01**: reduced to `Thank you.` on black. Second line and the 720 px
bitcoin-symbol watermark removed. Notes rewritten from scratch — no
"engineered", no universal-history accumulation claim, no price-independent
advice, no hard-coded time of day, no transcript quotation marks or hard
wrapping, and the educational-purposes / not-investment-advice disclaimer now
lands at the end of the talk rather than only on slide 8.

### Phase D — Comparison table and 4.22

**D1.** The real-estate asset is `REAL ESTATE`; the row-header column keeps
`PROPERTY`. Every slide reads the label from `_comparison-data.js`, so the rename
reaches 4.15–4.21 from one edit, with visible copy updated on 4.19
(`REAL ESTATE SHELTERS.`) and 4.20 (`It does not need to replace real estate.`),
the alt text updated, and the notes updated on 4.15–4.20 and 4.23. The 4.15
holding assumption keeps its substance verbatim (direct, unlevered title, no REIT
or tokenized wrapper). No file, slide id, CSS class or JS identifier renamed.

**D2.** Empty rating dots raised from `rgba(255,255,255,0.12)` to `0.18`; the
filled treatment is untouched. The five 4.16 header renders normalized to
consistent optical weight with CSS scale and brightness only — measured as
painted, apparent size went from a 1.28× spread to **1.06×**, and mean luminance
from 2.45× to **1.29×**.

**D3 (V-2).** 4.22 centered on x 960 (was ≈ 807); repriced field raised to **58%**
of the margin column's fill (0.42 against 0.72); `PRICE DISCOVERED HERE` promoted
to 18 px accent orange directly beneath the margin column; the two supporting
labels to 16 px at `--text-muted`. The existing right-to-left `--reprice-order`
staging was already 58 ms per column / 348 ms end to end and is unchanged. Copy,
build count and the incoming ClaimObjects' contact point are untouched.

### Phase E — Notes qualifications

Notes only. No visible copy, no score and no dot rendering was touched, and all
fifty scores were re-verified as rendered. Added: the downside symmetry to 4.22;
the missing non-monetary demand floor to 4.19; the self-custody assumption behind
the 5/5 on resistance to control and the rationale for the 4/5 on carrying costs
to 4.16; and the durability defense to 4.16 with the score staying **5/5**.

### Phase F — American English sweep

21 spelling edits across 16 files and 15 typographic edits across 11 files,
covering visible copy, slide titles, aria-labels, alt text and speaker notes in
all five sections. 4.15 now renders `The framework is explicit. The scores are
judgments.`

### Phase G — Documentation sync

The master document's contradictions-register items are resolved (4.11 dilution
wording, 4.09 title, 4.05 opacity, `Real Estate` naming, 4.23's final frame),
Section 11 records the close decision as a decision rather than a question, and
Section 9's `Colour` heading is now `Color`. `AGENTS.md` §3 says twenty-three
slides, and the repository conventions carry the American-English standard.

---

## 2. Verification results

### 2.1 Build (§10.1)

`npm run build` — **passes**, clean, after every phase and at completion. 3.9 s,
`dist/` 40 MB, 35 emitted assets.

### 2.2 Three-pass traversal (§10.2, §10.4)

Full forward walk → full backward walk to slide 1 → second full forward walk,
capturing painted text at **every one of the 144 build states**, not just at
slide level.

```
(forward 1: 144 build states)
(backward:   56 build states)
(forward 2: 144 build states)
PASS  no unexpected blank build state on the first pass (0)
PASS  no unexpected blank build state on the second pass (0)
PASS  4.02 build 2 is still the deliberate black breath (untouched on this branch)
PASS  every build state paints identically on both forward passes (0 differ)
PASS  both forward passes visited the same 144 states
PASS  console: zero errors and zero warnings across all three walks (0 errors, 0 warnings)
```

**The F-01 fix is confirmed against a control.** The same probe was run against a
build of the *pre-fix* code: **11 of 13 continuation slides painted different
content on the second pass**, with the five consecutive Evolution slides rendering
an empty rail exactly as the master review reported. Post-fix: 0 of 13. That
control run is the reason this result means something.

One state paints nothing, and it is meant to: **4.02 build 2**. The master
document's movement for that slide is `STORE OF VALUE → emphasize VALUE → clear
the slide → question → prompt`; build 2 is the "clear the slide" beat, and the
module was not touched on this branch. It is the only intentionally blank state
in the deck and is called out explicitly rather than silently excluded.

### 2.3 Direct entry and refresh at a nonzero build (§10.3)

```
PASS  direct entry ?slide=<id> for all 15 continuation slides (0 bad)
      4-11-carrier-failures-i build 3: before #3, after #3, text identical
      4-05-spend-or-save      build 4: before #4, after #4, text identical
PASS  refresh at a nonzero build restores the same state and painted content (0 bad)
```

Fifteen, not thirteen: the six Section 2 Evolution slides, the five Section 3
monetisation slides, both chain heads, and the 1.6 ↔ 1.7 orange-pill pair.

### 2.4 Grep gates (§10.5)

Run over the active tree (`src/`, `index.html`, `assets/`):

| Gate | Hits |
|---|---|
| `engineered` | **0** |
| `stack sats` | **0** |
| `repurposed` | **0** |
| `purpose-built` | **0** |
| `CRITERION` | **0** |
| British spellings — user-visible copy, aria-labels, alt text | **0** (all 144 states walked) |
| British spellings — speaker notes and slide titles | **0** |
| ASCII apostrophes in visible copy | **0** |
| ASCII quotation marks in visible copy | **0** |
| The asset label `PROPERTY` | **0** — the only `'PROPERTY'` string left is `AssetComparisonTable.js:52`, the row header, which is the intended one |

19 British-spelling matches remain in the tree. Every one is in a category the
brief protects: **8 in code comments** and **11 in identifiers** — slide ids
(`3-06-monetisation-intro`), an import path, the `MonetisationScene` module and
its `getOrCreateMonetisationScene` / `__monetisation` API, the
`--destination-centre-x` custom property and the `data-emphasised` attribute.
Renaming any of them would break deep links or session restoration. Zero of the
19 are user-visible.

### 2.5 Offline load (§10.6)

Chrome launched with every non-loopback hostname blackholed
(`--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1`):

```
PASS  zero external requests with all non-loopback DNS blackholed (0)
PASS  zero failed external resource loads (0)
PASS  Inter loads and applies from assets/fonts (3 faces)
      Inter at 600 weight measured 333 px vs 306 px for the serif fallback
PASS  all 11 Tabler glyphs render offline (ok)
PASS  deck navigates offline (reached 03-why-care#4, painting content)
```

The built `index.html` also fingerprints and emits the favicon, so the page makes
no request that leaves the machine.

### 2.6 Screenshots at 1920×1080 (§10.7)

Captured and inspected: 4.16 builds 0/1/2, 4.22 builds 0/1/2, 4.23 build 4, 5.01,
and the notes overlay on 4.16. Notable confirmations from the images themselves:

- **4.16** — `REAL ESTATE` fits without wrapping or clipping; the empty dots are
  now discernible; the header row scans as a set.
- **4.22** — the composition sits on the center line; the repriced field visibly
  changes state while the margin column stays brightest; `PRICE DISCOVERED HERE`
  is legible.
- **4.23** — the sentence appears once, centered, with nothing below it.
- **5.01** — `Thank you.` alone on black.
- **Notes overlay on 4.16** (2,352 characters, the deck's longest) — kicker,
  title and footer all in frame; the card measures 1000 px in a 1080 px viewport;
  the body scrolls to its final sentence; both footer buttons are on-screen and
  hit-testable.

### 2.7 Per-phase checks

Each phase was verified before its commit; the details are in the commit
messages. Highlights not already listed:

- **B2** — 56 slides, zero duplicate numbers (33 and 34 were previously doubled),
  zero duplicate ids, every `slide.number` equal to its manifest index + 1, and
  the chrome counter, notes meta and second-window broadcast payload agreeing on
  sampled slides 1, 23, 33, 34 and 56.
- **C4** — at +700 ms after the step to 4.23 build 4, both the summary and the
  conclusion measure opacity 0: the black beat is real, not asserted. Stepping
  back to build 3 reconstructs all four summary lines.
- **D3** — margin column never dimmer than the field at any build; sweep delays
  measured 0 s at column 6 through 0.348 s at column 0; both labels
  mathematically centered on the margin column (1226 vs 1226).
- **Reduced motion** — verified on the states this pass touched: 4.23's
  conclusion delay resolves to `0s` and lands instantly; 4.22's per-column delays
  all collapse to `0s` and the field jumps straight to its end state; 5.01 paints
  correctly. (F-03's twelve legacy reduced-motion gaps are explicitly deferred and
  were not addressed.)

---

## 3. Where I exercised judgment beyond the brief

Five places. All are small, all are reversible, and each is flagged here so you
can overrule it.

**3.1 — Two extra files in the F-01 fix.** The brief lists eleven modules. I also
fixed the two chain heads, `section-2-history/08-evolution-intro.js` and
`section-3-functions/06-monetisation-intro.js`. They carry the identical cache
and are entered *continuously* on backward navigation, so leaving them would have
left F-01 reproducible via backward-then-forward — the exact traversal the brief's
own verification step performs. Same bug, same fix, same commit.

**3.2 — One engine change to support the stronger F-01 fix.** `SlideEngine` now
passes `container` into `onExit`. Without it, removing `this._scene` leaves no
way to reach `cleanup()`. It is a new field on an existing context object; no
other slide reads it.

**3.3 — CSS masks instead of rewritten call sites for the Tabler glyphs.** The
brief prefers inline SVGs over a self-hosted subset font. Taking it literally
would have meant editing icon rendering in Section 1–3 modules, which the
Protected List and your instruction both forbid. `src/styles/icons.css` delivers
inline SVGs — no font load, no FOUT, no external failure mode — while keeping the
`ti ti-*` class API byte-identical, so **not one Section 1–3 module was touched
for A3**. I judged this to satisfy the intent of both constraints; if you would
rather have real `<svg>` elements at the call sites, that is a follow-up.

**3.4 — One character changed on a Protected List line.** 4.16's challenge line
is protected, and it contained the deck's last ASCII apostrophe. It now reads
`Don’t trust the table. Verify every score.` — same sentence, same words, one
glyph. I made the call because Phase F mandates typographic apostrophes in *all*
visible copy with no carve-out, and leaving a straight quote on the deck's
most-screenshotted slide would be the more visible defect. **If you disagree,
this is a one-character revert in `16-the-comparison.js:48`.**

**3.5 — Comments left in British English.** Phase F is scoped to "visible copy,
speaker notes, aria-labels, alt text, and user-facing strings". Code comments are
none of those, and sweeping them would have widened the Section 1–3 diff past what
is authorized. So `MonetisationScene.js`'s header comment still says
"Monetisation" while the slide it builds now says "Monetization". Deliberate, and
trivial to change if you want the repo internally uniform.

---

## 4. Residual issues worth your eye

Neither is a defect against the brief; both are places where the result is
slightly short of ideal and you may want a different call.

**4.1 — 4.22 build 0 sits left of center.** D3 centers the composition on x 960,
and it measures exactly 960 at build 2 and 967 at build 1. At build 0 only the
neutral grid and its label are painted — the margin column, bracket, labels and
incoming claims all arrive at build 1 — so the painted center at build 0 is
x 916. The group *grows rightward* into its centered position. That is inherent
to the build sequence, not to the offset; centering build 0 would decenter builds
1 and 2. The screenshot is in the set if you want to judge it.

**4.2 — The header-render normalization has a floor.** D2 got the five renders to
a 1.06× size spread and a 1.29× luminance spread, which is a genuine improvement
on 1.28× and 2.45×. But FIAT and SHARES remain two light-toned paper rectangles,
and equalizing their optical weight — as instructed — makes them marginally
*more* alike, not less. Real estate also still sits at the bottom of the
luminance range after a `brightness(1.58)` boost; pushing further washes the art.
Logged as O-07 for the art pass, where it pairs naturally with V-1.

---

## 5. Deferred to `docs/bucket-1-observations.md`

Eight items logged and deliberately not fixed:

| | |
|---|---|
| **O-01** | `OrangePillCapsule` (1.6/1.7) carries the same stale-cache pattern as F-01 — Section 1, out of scope |
| **O-02** | Both scene `cleanup()` methods still leak their 800 ms cross-fade timers (F-09) |
| **O-03** | Continuation slides have two construction paths; the review's suggested loud invariant check was not added |
| **O-04** | Three image assets unreferenced but predating the Phase B deletions, including `essence_of_money.png` (2.4 MB) |
| **O-05** | 3.04 still names `images.iconArt`, now `undefined`; behavior verified unchanged |
| **O-06** | `ComparisonTable.js`, `PropertiesTable.js` and `AmbientCrystal.js` orphaned by the Phase B deletions (tree-shaken, ship no bytes) |
| **O-07** | FIAT/SHARES renders still confusable; real estate still dimmest — art pass |
| **O-08** | 2.11 has **8 px** of vertical headroom; 2.09 has 34 px. Neither slide's copy was touched, but the next Section 2 copy edit will overflow silently |

Everything the brief explicitly deferred was left alone: F-03, F-06, F-07, F-09,
the 2.14 image overflow, V-1, V-3, image/WebP optimization, `docs/SOURCES.md`,
and the Section 2–3 factual corrections.

---

## 6. Protected List — audit

Every item confirmed intact:

| Protected item | Status |
|---|---|
| No total score, no winner badge, no Bitcoin-column highlight | Intact — verified in the rendered table |
| `Don't trust the table. Verify every score.` | Present, wording identical; one apostrophe glyph normalized (see 3.4) |
| All fifty scores, incl. Bitcoin 2/5 track record, 4/5 fungibility, **5/5 durability** | Re-verified as rendered against the master document's table — 0 mismatches |
| The `PROPERTY` row-header label | Intact — the only `'PROPERTY'` string in the tree |
| The inversion method (4.10) and failure-derived sequence (4.11–4.14) | Untouched — no diff against `b6aebdc` |
| Claim/carrier distinction, ClaimObject / CarrierShell | Untouched except 4.05's redeemed opacity, which C1 mandates |
| 4.21's composition | Untouched — no diff against `b6aebdc` |
| "The monetary competition is decided at the margin." spoken only | Confirmed absent from painted text across all 144 states |
| 4.15 holding assumptions (bullion, self-custody, unlevered) | Substance identical; only the asset's name and the D1/F wording changed |
| The `?` between FIAT and BITCOIN | Untouched |
| The 2.05 murmuration and its reduced-motion substitute | Untouched |
| Section 4's `_applyBuild(n)` pattern | Untouched |
| The 1920×1080 logical stage with uniform letterbox scaling | Untouched |
| All Sections 1–3 content, copy, mechanics and visuals | Only the F-01 engine fix and the Phase F spelling/apostrophe sweep, as authorized. No Section 1–3 module was touched for A3, B, C, D or E |

---

## 7. Recommended next step

Review the branch — particularly the two judgment calls in 3.4 (the one-character
apostrophe on a protected line) and 3.3 (CSS masks in place of rewritten icon
call sites) — then decide whether to merge. Nothing here is merged, and no
destructive Git operation was used.
