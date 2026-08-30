# Batch A Implementation
## The Prologue and Act I enter the deck: P1, P2, and the closed gate's Scenes 2–4, spliced in place of the legacy slides

**Mode: FAST** (batch scope — the full suite waits for the GATE before the recording merge).
**Model: Opus 5, max effort. Fresh CLI session.**
**Branch:** `film-rebuild`. **Prior tags:** `gate-2-closed`, `prologue-states`. **Tag on completion:** `batch-a`.
**First step:** commit this brief as `docs/batch-a-implementation-brief.md` if not already present.
**Standing law applies in full:** commit granularity, the no-invention rule, the full-coverage rule, the aesthetic law (no new aesthetic decisions exist in this session — any gap that seems to need one is a stop-and-flag), the self-reference ban.
**Read before working:** `docs/batch-a-package.md` (amended maps + verbatim scripts), `docs/synthesis-architecture.md` (P1–S4, the morph/cut rulings), `docs/what-is-money-master.md` §3.5, §5–§8, the approved Prologue cells (`review/prologue/states/`), the closed Gate 2 prototype (`src/proto/gate-2/`, path-2 default) and its states record, `docs/dark-field-manifest.md` §3.0.

---

# 1. Record the Prologue rulings (29 August 2026 — first, as their own commits)

1. **C1 = the coin.** P1's fifth form uses the library `bitcoin` render. This closes the manifest's V-1 flag as a **presenter decision**: record in the manifest that the physical-coin render is presenter-accepted for P1's morph, and note that Scene 10's strip will follow the same ruling for consistency (Batch B's states session inherits it; no work here).
2. **p1-b7 = `ledger_glow`.** Record the assignment.
3. **The 11-beat P1 map is accepted as rendered.** The amended map in `docs/batch-a-package.md` §1 is now binding.
4. **All remaining Prologue cells: approved.** Update `states.json` to the approved set.
5. **The scene test is now on file (presenter-supplied, 29 August 2026).** Create `docs/scene-test.md` with the eleven questions below, **verbatim**, with this provenance note: questions 1–10 from the commissioned blueprint; question 11 added by the blueprint's author post-prototypes and adopted by the presenter. This closes the repo's last dangling reference.

> 1. Can a smart viewer understand the visual's subject in one second?
> 2. Does the visual explain the idea, or merely decorate it?
> 3. Could the scene work with less text?
> 4. Is the audience discovering the point, or simply being told it?
> 5. Is this visual different because the idea is different, or different merely for novelty?
> 6. Does the previous visual transform naturally into this one?
> 7. Does the scene create the next question?
> 8. Is orange carrying semantic meaning?
> 9. Does the visual survive without the speaker notes?
> 10. Would this frame still look world-class as a still image?
> 11. If the animation were removed and I only saw the key frame, would the composition still feel intentional, premium and immediately legible?

# 2. Gate and ingest `fiat`

The presenter's `fiat.png` is in the tree untracked (dropped in `assets/dark-field/`). Run the grade gate on it; on pass, ingest through the standard harness (measured framing row, manifest row, evidence file under the current review folder — never overwriting prior evidence), close manifest §3.0, and run the recorded `gold_certificate` distinctness check now that both exist. On fail: leave it out of the shipping set, file the gate evidence, flag with the failing clauses so the presenter can regenerate — the S8 stub behavior continues, nothing else in this batch depends on it.

# 3. The build — three transplants, one splice

**3.1 — P1 and P2 as deck scenes.** Build `src/scenes/` modules for P1 (11 beats + authored entry black) and P2 (2 beats) against the approved cells. Every settled state is its approved cell — transcribe geometry from the states builders; prove it (§5). Motion: the hours-field fill and counter follow the legacy deck's proven gestures (that treatment is presenter-proven material — reuse its timing character); the condensation and the five-form morph are authored per the architecture (each form its own advance; the condensation-into-first-form one gesture); the title lands as the film's opening statement. No accent, no Claim Mark, monochrome-plus-photographic-warmth register throughout. Verbatim scripts installed as speaker notes, `[→]`-aligned.

**3.2 — Scenes 2–4 transplanted from the closed gate.** The prototype is the proven artifact: transplant its three modules into `src/scenes/` with path-2 as shipped behavior (runtime path selection does not ship in the deck; the retired candidates stay in the proto on file), pool birth, the S2→S3 and S3→S4 morphs, the micro-motions, all 19 beats, the amended scripts as notes. **Iterate nothing:** the gate closed on this exact behavior; any transplant-forced deviation (engine context, manifest lifecycle, continuity-group wiring) must reproduce the judged behavior exactly, and anything that cannot is a stop-and-flag, not an adaptation.

**3.3 — The manifest splice.** The five new scenes enter the deck manifest **in place of the legacy slides they supersede**, per the architecture's scene-to-legacy mapping. Map every replaced legacy slide explicitly in the report (id → superseding scene); where the architecture leaves a legacy slide's fate ambiguous (transitional slides, section dividers), **flag, don't decide**. Legacy slides are removed from the manifest only — files stay on disk and in history. Navigation across the new-scene ↔ legacy boundary must be seamless in both directions; black at the boundary only where authored. The deck's slide count changes for the first time — state old and new counts in the report.

# 4. Out of scope

No Act II work, no Gate 3, no engine feature changes (wiring only), no script wording changes, no new compositions or renders beyond §2's ingest, no legacy-slide file deletion.

# 5. Verification (FAST, batch scope)

- **Landed-state proof** across all P1/P2/S2–4 settled states against their approved cells at zero differing pixels.
- Full deck traversal forward and backward across the spliced manifest; cold direct entry at every new-scene build; reduced-motion parity on all new scenes; 0 console errors everywhere; `npm run build` clean.
- Boundary checks: legacy→P1 entry, S4→legacy exit (or act boundary as mapped), both directions.
- Notes check: every `[→]` in the installed scripts maps to exactly one advance; self-reference scan on all visible text and notes.
- **The scene test:** run all five scenes against all eleven questions of `docs/scene-test.md` and report per-scene, per-question, with honest verdicts — pass, or tension with a one-line note. Questions 10 and 11 are answered by construction where a settled state is a presenter-approved cell (cite the cell); questions 1–9 are assessed in earnest. **Tensions are flagged for the presenter, never silently fixed** — a fix would be a new decision, and this session makes none. The presenter's own viewing remains the real verdict; the report's assessment is preparation for it, not a substitute.
- Capture strip of all new-scene settled states → `review/batch-a/`; commit granularity; clean tree; `batch-a` tagged; report per AGENTS.md §16, mode named, with the legacy mapping table and the presenter's review protocol: **he reviews the deck itself now, as a viewer, from the top — the first continuous viewing of the real film's opening ten minutes.**
