> **Executed and superseded — archived, not authoritative.** Its standing rules live in `docs/what-is-money-master.md` (Stage 0, 25 August 2026).
> Kept as history. Nothing here governs.

# Bucket 1 — Approved Post-Review Implementation Brief
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Basis:** `review/opus-5/MASTER_REVIEW.md` (26 July 2026), filtered and amended by the presenter
**Scope:** Narrative-independent fixes and Section 4 refinements only. Sections 1–3 content and mechanics are deliberately out of scope (they will be rebuilt separately), with one exception: the deck-wide American English sweep in Phase F.
**Date:** 27 July 2026

---

# 0. Authority and context

Read before writing any code, in this order:

1. `AGENTS.md`
2. `docs/what-is-money-presentation-master-document.md`
3. `review/opus-5/MASTER_REVIEW.md` — the findings referenced below (F-01, F-04, V-2, etc.) are defined there
4. This brief

When this brief conflicts with the master review, **this brief wins** — it encodes the presenter's decisions on the review. When this brief conflicts with the master document, this brief wins and Phase G updates the master document to match. Flag any genuine contradiction or technical impossibility before changing intended meaning; do not silently reinterpret.

Three presenter decisions that **override** the master review:

1. **The comparison table's row-header column stays `PROPERTY`.** Do not rename it to `CRITERION`. The entire Section 4 thought experiment deduces the *properties* of an ideal store of value; the header must preserve that link to 4.13/4.14. Instead, the real-estate **asset column** is renamed `REAL ESTATE` (Phase D).
2. **Bitcoin's durability score stays 5/5.** Do not change it. The defense moves into the notes (Phase E).
3. **American English throughout**, not British. This reverses the review's neutral "pick one" stance in a specific direction (Phase F).

---

# 1. Process rules

- Create a working branch: `bucket-1-review-fixes`. Do not commit to `main` directly.
- Commit at the end of each phase with a clear message (`Phase A: engine and navigation fixes`, etc.).
- `npm install` if needed, `npm run build` must pass after every phase.
- Do not run destructive Git commands. Do not touch `review/opus-5/**` except to read it.
- No scope creep. If you notice an unrelated defect, log it in a new file `docs/bucket-1-observations.md` and move on. Do not fix it.
- Where this brief gives exact wording, use it verbatim. Where it gives intent, write the minimal text that fulfils the intent and matches the surrounding voice.
- Notes are speaker notes: flowing prose, no literal quotation marks wrapping them, no hard-wrapping mid-sentence (per `AGENTS.md` §11).

---

# 2. Protected list — do not touch

These are deliberate decisions. Changing any of them is a defect in your work, regardless of any suggestion in the master review or elsewhere:

- The comparison table: no total score, no winner badge, no Bitcoin-column highlight, and the line `Don't trust the table. Verify every score.`
- All fifty scores in `_comparison-data.js`, including Bitcoin's 2/5 track record, 4/5 fungibility, **and 5/5 durability**.
- The `PROPERTY` row-header label (see decision 1 above).
- The inversion method (4.10) and the failure-derived property sequence (4.11–4.14).
- The claim/carrier distinction and the ClaimObject / CarrierShell visual system.
- 4.21's composition (symmetrical, neutral, five equal connectors, no winner treatment).
- The spoken-only status of "The monetary competition is decided at the margin." (4.21) — it must not appear on screen.
- The holding assumptions on 4.15 (bullion not ETF, self-custody not wrapper, unlevered property) — wording updates only where Phase D/F require them.
- The `?` between FIAT and BITCOIN on the Section 2 Evolution rail.
- The murmuration on 2.05 and its reduced-motion static substitute.
- Section 4's `_applyBuild(n)` state-reconstruction pattern.
- The 1920×1080 logical stage with uniform letterbox scaling.
- **All Sections 1–3 content, copy, mechanics, and visuals** — except the spelling/apostrophe sweep in Phase F and the F-01 engine fix in Phase A, which are explicitly authorized. In particular, do NOT implement F-03, F-06, F-07, F-09, the 2.14 image-overflow fix, or any other Section 1–3 finding. These are deferred to the Sections 1–3 rebuild.

Also explicitly deferred (do not implement): V-1 (Bitcoin coin render replacement — art task), V-3 (4.05 recomposition), image/WebP optimization, `docs/SOURCES.md`, the Section 2–3 factual corrections (whitepaper date, debasement baselines, El Salvador, "instantly", 21 million), and any accessibility work beyond what the tasks below inherently produce.

---

# 3. Phase A — Critical engine and navigation fixes

## A1. F-01 — Stale-scene corruption on second traversal (Critical)

**Files:** the six `EvolutionScene` consumers in `src/slides/section-2-history/` (`09-barter.js` … `14-bitcoin.js`), the five `MonetisationScene` consumers in `src/slides/section-3-functions/` (`07-stage-collectible.js` … `11-where-is-bitcoin.js`).

Implement the master review's **alternative** (the stronger fix): remove the module-level scene cache entirely and read the container expando (`ctx.container?.__evolution` / `ctx.container?.__monetisation`) as the single source of truth in `onEnter`/`buildStep`. If any code path genuinely requires retaining `this._scene`, fall back to the review's minimal fix instead: container-first precedence (`ctx.container?.__evolution ?? this._scene`) plus unconditionally nulling `this._scene` in `onExit` (keep the `cleanup()` call gated on `!ctx.continuous`).

Leave the five inactive `__problemSolving` modules alone — they are deleted in Phase B.

**Verify:** traverse the full deck forward, then backward to slide 1, then forward again, and programmatically confirm the painted content of every Section 2 Evolution slide and Section 3 monetisation slide is identical on both forward passes (the review's methodology in `review/opus-5/screenshots/regression/` shows how). Also re-verify direct entry (`?slide=<id>`) for all continuation slides.

## A2. F-04 — Notes overlay clips long notes

**Files:** `src/engine/NotesOverlay.js`, `src/styles/globals.css`.

- Cap the notes card at `max-height: calc(100vh - 80px)`.
- Give `.notes-card__body` `overflow-y: auto`.
- Pin the card footer so "Open in second window" and "Copy slide URL" remain visible and clickable regardless of note length.

**Verify:** open the overlay on 4.16 (longest notes) at 1920×1080; the title, kicker, and footer must all be visible, and the body must scroll to the final sentence.

## A3. 6.7 — Self-host runtime font dependencies

**Files:** `index.html`, `src/styles/globals.css`, new files under `assets/fonts/` (or similar).

- Download and self-host **Inter** as woff2 (the weights actually used) and remove the Google Fonts links.
- Remove the jsDelivr Tabler webfont. Replace the ~10 Tabler glyphs actually used (HAS/WANTS icons on 2.03/2.04, function icons on 3.02/3.05, stage icons on 3.07–3.10, Art tile on 3.04 — sweep for the full list) with either a self-hosted subset font or inline SVGs. Inline SVGs are preferred: no font loading, no FOUT, no external failure mode.

**Verify:** `npm run build`, then load the built deck with network access to external domains blocked (or offline); typography and every glyph must render identically. No request may leave for fonts.googleapis.com, fonts.gstatic.com, or cdn.jsdelivr.net.

---

# 4. Phase B — Repository hygiene

## B1. F-08 — Delete the rejected-framework orphans

Delete these files (Git history preserves them):

- `src/slides/section-4-ideal-store/`: `01-transition.js`, `02-section-opener.js`, `03-thought-experiment.js`, `04-properties.js`, `05-comparison.js`, `06-objection-volatility.js`, `07-objection-cashflow.js`, `08-dont-trust-verify.js`, `09-problem-solving-intro.js`, `10-example-light.js`, `11-example-communication.js`, `12-example-food.js`, `13-bitcoin-solution.js`, `_problem-solving-rows.js`
- `src/components/ProblemSolvingScene.js`

Then clean `src/assets.js`: remove every import/export used only by the deleted files (the solution/misuse icon set, `iconSolutionLightbulb`, `iconSolutionRefrigerator`, `iconMisuseFire`, `iconRepurposedSolution`, and siblings), remove the unused `orangePillIngredients` export if it is referenced by no active slide, and remove the dead `images.iconArt = null` export. Delete the now-unreferenced image files from `assets/images/`.

**Verify:** `npm run build` passes; grep the active tree for imports of the deleted modules (zero hits); the built `dist/` no longer contains the deleted assets.

## B2. F-10 — Normalize slide numbers from the manifest

**File:** `src/main.js`.

Implement the review's recommended alternative: after loading the manifest, set `slides.forEach((s, i) => { s.number = i + 1; })` at boot, with a one-line comment explaining that the manifest is the single source of truth for ordering and per-module `number` fields are historical. Do not hand-edit the 56 modules.

**Verify:** the duplicate-33/34 condition is gone at runtime; overview grid, chrome counter, and second-window notes show consistent numbering.

---

# 5. Phase C — Section 4 and close: content and wording fixes

## C1. 4.05 — Align implementation with intent

**File:** `src/styles/slides.css` (~line 610). The master document says the claim/carrier "disappears completely" when the SPEND NOW goods are established; the CSS implements `opacity: 0.1`. Change it to `0` (keep the transition).

## C2. 4.19 / 4.20 — Remove the art references from the notes

Both slides' notes mention art ("Art provides cultural and aesthetic value" / "Art can still provide…") but no art render exists on either slide. Remove the art clauses from both notes so the notes match the visible slide. Do not add an art render.

## C3. 4.04 — "Earned" clarification (notes only)

Add one sentence to 4.04's notes where the definition lands, in this spirit (adapt to the surrounding voice): *"Earned once, at origination — then transferable indefinitely. The claim does not stop being valid when it is later gifted, inherited, or exchanged."* The visible definition (`AN EARNED, TRANSFERABLE CLAIM ON VALUE`) does not change.

## C4. V-4 + F-02 — Make 4.23 the true final frame; reduce the close

**Files:** `src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js`, `src/slides/section-5-close/01-thank-you.js`, `src/styles/slides.css`.

On **4.23**, final build:

- Remove the duplicate sentence: keep the kicker (`THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES`) and **delete the dim bottom line** that repeats it.
- Optically center the three-line conclusion (target optical center ≈ y 540, max width ~1200 px, preserving the current line breaks). Nothing else on the canvas below it.
- Extend the beat of pure black between the summary clearing and the conclusion appearing slightly, so the final statement lands after a genuine pause. Keep it instant under reduced motion.

On **5.01 (close)**, reduce it to a silent release:

- On screen: `Thank you.` only. Remove `Stay humble, and stack sats.` and the large bitcoin-symbol watermark treatment if it competes with the text; a quiet frame is the goal.
- Rewrite the notes completely. They must: (a) contain no form of "engineered" applied to Bitcoin — this is a banned framing per master document §15 and `AGENTS.md` §14; (b) contain no claim that any accumulation strategy "worked for every monetary good in history"; (c) contain no price-independent buying advice; (d) not hard-code a time of day; (e) include the educational-purposes / not-investment-advice disclaimer so it is present at the end of the talk, not only on slide 8; (f) be brief — this slide releases the audience and invites questions, nothing more. Suggested shape (adapt freely): *"Thank you for your time. I hope this gave you a clearer mental model of what money is, and a framework you can use — and challenge — for yourself. Nothing in this presentation is investment advice; it is educational material, and every score in that table is an invitation to verify. Happy to take questions."*
- Remove the transcript artifacts (wrapping quotation marks, hard-wrapped lines).

**Verify:** grep the entire active tree (code + notes) for `engineered`, `stack sats`, `repurposed`, `purpose-built` — zero hits after this phase (excluding `review/opus-5/**` and the master review itself).

---

# 6. Phase D — Comparison table and 4.22 refinements

## D1. Rename the real-estate asset to `REAL ESTATE`

**Files:** `_comparison-data.js`, `15-framework-to-comparison.js`, `16-the-comparison.js`, `17-store-of-value-function-migrates.js`, `21-marginal-store-of-value-decision.js`, plus any aria-labels, captions, and component data referencing the asset.

- Every user-visible label, caption, and aria-label that names the asset changes from `PROPERTY` to `REAL ESTATE` (title case `Real Estate` where the surrounding labels are title case).
- The **row-header column keeps `PROPERTY`** — that is the point of the change: the collision is resolved from the asset side.
- Update the 4.15 holding-assumption wording for the asset to match, e.g. `REAL ESTATE — direct, unlevered real estate.` Keep the substance (direct, unlevered) identical.
- Update related notes wording (4.15–4.21) where the asset is named, without changing any argument.
- Do not rename files, slide IDs, CSS class names, or JS identifiers — user-visible text only, unless an identifier rename is trivially safe and self-contained.
- Check label fit: `REAL ESTATE` is wider than `PROPERTY`; confirm the table header, 4.17 destination row, and 4.21 candidate labels do not wrap, clip, or misalign at 1920×1080.

## D2. V-5 (as amended) — Table legibility

- Raise the empty-dot contrast in the 4.16 rating rows to approximately `rgba(255,255,255,0.18)` so a 4 remains distinguishable from a 5 after video compression. The filled-dot treatment does not change.
- Normalize the five asset-header renders in 4.16 to consistent optical weight (apparent size and luminance) so the header row scans as a set — CSS sizing/filter adjustments only; do not create new art in this pass. If CSS alone cannot get them acceptably close, note it in `docs/bucket-1-observations.md` for the art pass.

## D3. V-2 — Recompose 4.22 so the repricing reads

**Files:** `22-fixed-supply-reprices-at-margin.js`, `src/styles/slides.css`.

- **Center the stage**: shift the grid/margin/claims group right so the composition centers on x = 960 (currently centered ≈ x 807).
- **Directional propagation**: at the repricing build, run the emphasis right-to-left across the field using the existing `--reprice-order` staging (≈58 ms per column; total sweep ≈350 ms). Raise the end-state brightness of repriced units to roughly 55–60% of the margin column's, so the field visibly changes state while the margin column remains the brightest point at all times.
- **Promote the labels**: `PRICE DISCOVERED HERE` to ~18 px in the accent orange, positioned directly beneath the margin column; `AVAILABLE AT THE MARGIN` and `FIXED OUTSTANDING STOCK` to ~16 px at `--text-muted`.
- Reduced motion: the sweep must resolve instantly to the end state (the existing reduced-motion block covers `.s4-fixed-supply-field__unit` — confirm it covers the new staging too).
- Everything else on the slide (copy, build count, incoming ClaimObjects stopping at the contact point) is unchanged.

**Verify:** screenshot builds 0/1/2 at 1920×1080; composition centered; propagation legible in a single viewing; margin column brightest in every state.

---

# 7. Phase E — Notes qualifications (notes only; no visible copy changes)

## E1. 4.22 — Downside symmetry

Add to the notes, near the existing "not a mechanical price formula" qualification: *"And the mechanism is symmetric. The same microstructure that lets marginal inflows reprice the stock upward amplifies drawdowns when marginal flows reverse. Fixed supply explains sensitivity — in both directions."*

## E2. 4.19 — No non-monetary demand floor

Add to the notes, after the "Bitcoin is different" passage: *"That difference cuts both ways, and it's worth being honest about it. An asset with no non-monetary use also has no floor of non-monetary demand. Gold's jewelry and industrial demand is a cushion Bitcoin does not have. Bitcoin's value rests entirely on its monetary function — that is the source of both its strength and its risk."*

## E3. 4.16 — Self-custody assumption and the carrying-costs rationale

Add to the notes: (a) the 5/5 on resistance to control assumes the self-custody holding defined on 4.15, and self-custody transfers custodial risk to the holder — the score assumes competent key management; (b) why carrying costs is a 4 and not a 5: secure hardware, backups, inheritance planning, and ongoing security discipline are real ongoing costs. An explained 4 reads as rigor.

## E4. 4.16 — Durability defense (score stays 5/5)

Add to the notes, at the durability row discussion: gold's durability is **physical** — the atom survives regardless of institutions. Bitcoin's durability is **informational and social** — the protocol persists like mathematics or language: as long as the source code and the ledger survive anywhere and people have reason to run them, Bitcoin can exist, and a globally distributed network with strong economic incentives for continuation is a different class of dependency from any single institution, government, or company. That is why the 100-Year Test's skepticism about institutional continuity does not apply to it in the same way. The score is a judgment — as every score in this table is — and the audience is invited to challenge it.

Do not change the score, the dot rendering, or any visible copy.

---

# 8. Phase F — American English sweep (deck-wide)

Sweep the **entire active deck** — visible copy, speaker notes, aria-labels, alt text, and user-facing strings in all five sections — to American English. This is the one phase authorized to touch Sections 1–3 text.

- `monetisation` → `monetization`, `judgement(s)` → `judgment(s)`, `-ise/-isation/-ising` → `-ize/-ization/-izing` (mind exceptions that are correct in both, e.g. "exercise", "compromise"), `-our` → `-or` (colour/behaviour → color/behavior), `-re` → `-er` (centre → center), `defence` → `defense`, `licence` → `license` (noun), `jewellery` → `jewelry`, `travelled` → `traveled`, `programme` → `program`, `grey` → `gray`, and any others found.
- **Do not rename files, slide IDs, CSS classes, or JS identifiers** (e.g. `06-monetisation-intro.js`, `MonetisationScene.js`, `3-06-monetisation-intro` stay as they are) — changing IDs breaks deep links and session restoration. User-visible text only.
- Apostrophes: use the typographic apostrophe (') consistently in all visible copy (the deck currently mixes ASCII and typographic, e.g. 1.3 vs 1.4). Same for quotation marks in visible copy: typographic.
- After the sweep, check layout on any slide whose copy length changed near a measured boundary (the review flags 2.09 and 2.11 as having near-zero headroom — spelling changes are same-length or shorter in almost all cases, but confirm nothing overflows).

**Verify:** grep the active tree's user-visible strings and notes for the British forms above — zero hits. Confirm `4.15` now renders `The scores are judgments.`

---

# 9. Phase G — Documentation sync

Update `docs/what-is-money-presentation-master-document.md` to match implemented reality (the review's contradictions register, §10, lists these):

- 4.11 dilution wording: adopt the code's version (*"Additional carrier units can dilute the claim embodied in existing units."*).
- 4.09 title: `The Future Is Unknowable`.
- 4.15 core line spelling: `The scores are judgments.`
- 4.05: "disappears completely" is now literally true (opacity 0).
- The five-asset candidate set and holding assumptions: `Real Estate` naming.
- Section 11 (close): record the decision — 4.23 is the true final frame; 5.01 is a silent `Thank you.` hold with a disclaimer in the notes.
- Section 9/12 spelling where affected by the American English decision.

Also update `AGENTS.md` §3's stale "seventeen slides" description of Section 4 to twenty-three, and add one line to the repository conventions: **American English is the deck-wide standard for all user-visible text and notes.**

Do not otherwise rewrite either document.

---

# 10. Final verification and report

1. `npm run build` passes cleanly.
2. Full forward walk, full backward walk, second forward walk: no blank or stale content anywhere (A1 verified at deck level, not just in isolation).
3. Direct entry to all continuation slides; refresh at a nonzero build on 4.11 and 4.05.
4. Console: zero errors and warnings across the walks.
5. Grep gates, all zero hits in active files: `engineered` (applied to Bitcoin), `stack sats`, `repurposed`, `purpose-built`, `CRITERION`, British spellings from Phase F, and the asset label `PROPERTY` (row header aside).
6. Offline load test (Phase A3).
7. Screenshots at 1920×1080: 4.16 (all builds), 4.22 (all builds), 4.23 (final build), 5.01, and the notes overlay on 4.16.
8. Write `docs/bucket-1-report.md`: what was changed per phase, verification results with evidence, anything deferred to `docs/bucket-1-observations.md`, and any place where you had to exercise judgment beyond this brief.

Do not merge the branch. Stop after the report and wait for the presenter's review.
