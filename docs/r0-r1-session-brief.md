# Rebuild Session Brief — R0 (Scaffold) + R1 (Section 1: The Question)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Governing document:** `docs/sections-1-3-rebuild-brief.md` — read it in full before writing any code. This session brief specifies *how* to implement phases R0 and R1 of that document; the rebuild brief specifies *what and why* and wins any conflict, except where this brief records a more specific decision.
**Date:** 28 July 2026

---

# 0. Reading order and authority

1. The presenter's instructions in this session
2. This session brief
3. `docs/sections-1-3-rebuild-brief.md` (the narrative contract — especially §3 Narrative Constitution, §4 D1–D9, §5 Section 1 beat map, §9 cross-cutting requirements)
4. `docs/what-is-money-presentation-master-document.md` (for Section 4's architecture, tokens, and craft standards — the model everything new is built to)
5. `AGENTS.md`

Study Section 4's implementation (`src/slides/section-4-ideal-store/`, especially the `_applyBuild(n)` pattern, and `22-fixed-supply-reprices-at-margin.js` for the unit-field precedent) before building anything. The new Section 1 must be indistinguishable from Section 4 in technical quality and visual discipline.

Flag genuine contradictions or technical impossibilities and stop; never silently reinterpret. If a visual specification proves unachievable as written, implement the closest faithful version and record the deviation in the phase report.

---

# 1. Process rules

- **Step 1, before anything else:** confirm `docs/sections-1-3-rebuild-brief.md` exists in the working tree. If it is not yet committed, commit it to `main` with message `docs: add sections 1-3 rebuild brief (narrative contract)`. This document must be in `main`'s history before rebuild work begins.
- Then create the working branch: `rebuild-r0-r1-section-1`. All further work happens there. Do not commit further work to `main`; do not merge.
- Commit at logical milestones (R0 complete; then per-slide or per-pair for R1; then verification). Clear messages.
- `npm run build` must pass at every commit.
- No scope creep: Sections 2, 3, 4, and 5 are untouched this session except the two explicitly authorized edits in §2.4 and §3 (manifest wiring, and the temporary 1.5→2.01 seam). Log unrelated observations in `docs/rebuild-observations.md`; do not fix them.
- American English, typographic apostrophes, the Narrative Constitution's language rules — everywhere, including placeholder notes.
- All on-screen copy in this brief is **implement-verbatim placeholder-final**: render it exactly as written; the presenter finalizes wording in a later pass. Notes follow the placeholder standard (rebuild brief §9.2) and must carry the [canonical] spoken lines verbatim where specified.

---

# 2. Phase R0 — Scaffold

## 2.1 Directory and module structure

Create `src/slides/section-1-question/` with five slide modules on the Section 4 architecture:

- `01-eighty-thousand-hours.js`
- `02-the-conversion.js`
- `03-what-is-money.js`
- `04-the-stakes.js`
- `05-the-promise.js`

Every module: `_applyBuild(n)` full state reconstruction; data-attribute reveals; direct-entry correctness at every build (`?slide=<id>` at any build renders the exact state); reduced-motion parity (every animated state has an instant-resolution equivalent); no timers that survive navigation; no module-level mutable scene caches (the F-01 class of defect must be structurally impossible — follow Section 4's container-scoped state pattern).

## 2.2 Shared component: the unit field

Create `src/components/UnitField.js` — a reusable canvas-based unit-field renderer, because 80,000 DOM nodes is not an option and the rebuild brief requires a shared visual grammar between 1.1's hours-field and 4.22's supply-field (§9.1).

Requirements:

- Canvas rendering at devicePixelRatio-aware resolution inside the 1920×1080 logical stage; crisp under the letterbox scaler.
- Renders N units in a grid (target for 1.1: 80,000 units ≈ 400×200 grid, ~4px units with ~0.8px gap, filling roughly 1920×960 of the stage — every hour literally on screen; tune pitch for exact fit).
- Supports: progressive fill (animated population of the field with an easing curve), steady state, dim/ghost state (for 1.4), and a directed collapse/flow animation (for 1.2 — see §3.2).
- API driven by explicit state (e.g. `setState({ mode, progress })`) so `_applyBuild` can reconstruct any state instantly — the animation layer sits on top of, never instead of, state reconstruction.
- Reduced motion: every mode resolves instantly to its end state.
- Performance gate: 60fps on the fill and collapse animations at 1080p; if 80,000 individually animated units cannot hit 60fps, animate in batched waves (units appear in groups with per-wave jitter — visually indistinguishable, computationally cheap) rather than reducing the count. The count is not negotiable; every hour is on screen.
- Visual grammar: unit geometry (size ratio, spacing rhythm, glow treatment) derived from 4.22's field so the rhyme reads. Color: do **not** reuse 4.22's repricing orange. Use a warm neutral from the token system (the hours are proto-claims, not yet the accent). Document the chosen tokens in the phase report. Do not modify 4.22 in this session; if unifying 4.22 onto this component is worthwhile, note it as a future task in `docs/rebuild-observations.md`.

## 2.3 What R0 does NOT scaffold

Do not stub Section 2/3 beat modules, the rail rebuild, or the murmuration re-staging this session — R2 and R3 scaffold their own material. R0's job is the Section 1 module set, the UnitField component, and the manifest wiring below. (Rationale: stubs wired into the manifest would break whole-deck traversal; stubs not wired in are dead weight.)

## 2.4 Manifest wiring

Rewire `src/slides/manifest.js`: the five new Section 1 modules replace the legacy Section 1 entries. Sections 2–5 remain exactly as they are. Slide numbering is derived from the manifest at boot (Bucket 1's F-10 normalization) — verify it holds. The legacy Section 1 modules are **deleted at the end of R1** (after §5 verification passes, in the final commit), not at scaffold time. Delete any legacy Section 1 assets that become unreferenced (verify by grep + build).

**The temporary seam:** the new `05-the-promise.js` hands off to the legacy Section 2 opener until R2 replaces it. Requirement: the transition must be clean (no console errors, no broken continuity assumptions, chrome and numbering correct). A visible stylistic step-change at the seam is expected and acceptable — note it in the report; do not restyle legacy Section 2 to smooth it.

---

# 3. Phase R1 — Section 1: The Question (five slides)

General register: Section 1 is the quietest, most restrained passage in the deck. Black backgrounds, generous negative space, no chrome noise, no decorative elements. Nothing appears that does not carry the beat. Type sizes are large and calm (title-scale moments specified per slide). All motion defaults to slow and deliberate; nothing bounces.

## 3.1 — `01-eighty-thousand-hours` (beat 1.1: the cold open)

The deck now opens in darkness. No title, no logo, no chrome preamble.

**Build 0:** pure black. Hold ~800ms on entry before any element (authored pause — this is a recorded-delivery design element, rebuild brief §1).

**Build 1:** the field populates. Units appear in accelerating waves (slow first seconds — single units, countable — then acceleration to a flood), total fill duration ~7–9s. Simultaneously a counter ticks from 0 to **80,000** — odometer-style, easing synchronized with the fill so counter and field complete together. Counter: large numerals, top-center or center-right of the field, calm weight (present, not dominant). Reduced motion: field complete + counter at 80,000 instantly.

**Build 2:** the line lands beneath/over the completed field, on-screen, verbatim: **"This is how many hours of your life you will spend working."** Field remains fully lit behind/around it.

Notes (placeholder): the beat's argument per rebuild brief §5 (1.1) — the viewer's own working life, made countable; no mention of money yet. Include the sourcing basis for the figure (~40-year career × ~2,000 working hours/year ≈ 80,000) and create `docs/SOURCES.md` with this as its first entry (id, figure, basis, date). The visual rhyme with 4.22 is never stated in copy or notes-to-be-spoken; it may be documented in a code comment.

## 3.2 — `02-the-conversion` (beat 1.2)

**Build 0:** the field, steady state, counter gone (state reconstruction: direct entry shows the completed field — visual continuity with 1.1's end state; whether implemented as a continuous scene or re-render is the implementer's call, but direct entry and back-navigation must be exact).

**Build 1:** the collapse. The field flows — units stream toward center with a gravitational easing (closer units first, far corners last; a directed, purposeful motion, not a scatter), condensing into a single abstract token: a plain, softly luminous disc. **No symbol, no marking, no currency sign, no ₿** — the token's anonymity is the Narrative Constitution's neutrality rule made visual. Duration ~4–5s. Reduced motion: token alone, instantly.

**Build 2:** one line, on-screen, verbatim: **"Everything you earn is your time, changing form."**

**Build 3:** the line yields to a second, on-screen, verbatim: **"Money is where a life's work accumulates."** Token persists. (Two lines sequenced, never stacked — each gets the frame alone.)

Notes: the beat's argument (rebuild brief §5, 1.2) — D9's seed; no elaboration of "claim," no forward references.

## 3.3 — `03-what-is-money` (beat 1.3: the question and the title punchline)

**Build 0:** the token alone, centered, smaller — the residue of 1.2.

**Build 1:** the direct question, on-screen, verbatim: **"Without saying what it does — can you say what money is?"** Then nothing. No advance hint, no animation. This build is a held frame designed for recorded silence; the presenter controls the pause.

**Build 2:** the question dims; three facts land in sequence (staged ~1.2s apart), sparse lines, verbatim:
- **"It is one side of nearly every trade on Earth."**
- **"It is the most used good in human civilization."**
- **"There is not one hour of school on what it actually is."**

**Build 3:** everything clears to black (beat of emptiness ~600ms), then the title lands at full title scale, centered: **"WHAT IS MONEY?"** — the deck's title treatment (match or deliberately exceed the presence of the current title slide; this is the deck's most important single frame in Section 1). Optionally the token remains, very faint, behind the title — implementer's judgment; if it competes, cut it.

Notes: per rebuild brief §5 (1.3) — the "this is water" argument; the title as punchline, not label.

## 3.4 — `04-the-stakes` (beat 1.4)

**Build 0:** black; the hours-field ghosted at low opacity (UnitField dim mode — clearly present, clearly not the subject; target roughly the legibility of a watermark: visible on a calibrated screen, subliminal on a bad one).

**Build 1:** the mercy line, alone, centered, generous scale, verbatim: **"If you don't understand the thing your life's work is stored in, you are at the mercy of those who do."** No further builds, no supporting elements, no image, no chart (this restraint is specified by ruling — rebuild brief §5, 1.4).

Notes: the asymmetry-of-understanding argument, briefly, without grievance and without historical montage; the spoken support stays at the level specified in the rebuild brief.

## 3.5 — `05-the-promise` (beat 1.5)

**Build 0:** clean black.

**Build 1:** the method question, on-screen, verbatim: **"How do you understand anything mysterious?"**

**Builds 2–4:** three waypoints appear in sequence along a single faint horizontal line (left → right), each a small marked point with a line of text beneath, verbatim:
- **"Ask where it came from."**
- **"Ask what it must do."**
- **"Ask how you would judge anything that tries to be it."**

Design intent: the faint horizontal line with waypoints is the quiet visual ancestor of Section 2's Evolution Rail — same line-language, not the rail itself. Subtle; never labeled with section numbers; this is method, not an agenda.

**Build 5:** the waypoints settle; no closing text on screen (the covenant is spoken). The slide holds on the completed line.

Notes: must carry, verbatim as spoken lines: the covenant — **"By the end you'll have a framework — not my conclusions, a framework you can check for yourself."** — and one light educational-purposes sentence (this deck's early-disclaimer home per the rebuild brief; the full disclaimer remains at the close). Then the handoff question to Section 2: where does money actually come from?

**Seam:** this slide transitions into legacy `2.01` until R2. Verify the transition per §2.4.

---

# 4. Deletions (end of R1 only)

After §5 verification passes in full: delete the legacy Section 1 modules and their now-unreferenced assets (including the orange pill slides and any orange-pill imagery still referenced only by them), clean `src/assets.js` accordingly, and verify the build contains no orphaned references. The orange pill device is removed by design (rebuild brief §8 — its effect lives in the close callback, which is **not** part of this session; do not touch the close).

---

# 5. Verification

1. `npm run build` clean.
2. Full deck traversal: forward, backward to slide 1, forward again — no blank, stale, or double-rendered content anywhere; the new Section 1 and the seam into legacy Section 2 correct on all three passes.
3. Direct entry (`?slide=<id>` and per-build where supported) for all five new slides at every build; refresh mid-build on 1.1 and 1.2 (the animation-heavy slides) reconstructs exact state.
4. Reduced-motion pass: every build of every new slide resolves instantly and completely; nothing depends on an animation having run.
5. Performance: fill (1.1) and collapse (1.2) hold 60fps at 1080p in Chromium; report measured frame rates.
6. Console: zero errors and warnings across all passes.
7. Constitution gates (new files only): grep for banned terms (`engineered`, `purpose-built`, `repurposed` applied to Bitcoin — should be trivially zero since Bitcoin appears nowhere in Section 1; verify Bitcoin genuinely appears nowhere in Section 1, including notes); no British spellings; no ASCII apostrophes in visible copy; the word "claim" appears nowhere in Section 1 copy or notes (the ladder's first rung is 2.6 — Section 1 stays clean).
8. Screenshots at 1920×1080: every build of all five slides, plus the 1.3 build-3 title frame and the 1.4 frame at both a bright and dim rendering (ghost-field legibility check). Save under `review/rebuild-r1/screenshots/`.
9. `docs/SOURCES.md` exists with the 80,000-hours entry.
10. Write `docs/r0-r1-report.md`: per-phase changes, verification evidence, measured performance, token/color choices for the UnitField, any deviations from spec with rationale, the seam's noted step-change, and anything logged to `docs/rebuild-observations.md`.

Stop after the report. Do not merge. The presenter reviews the rendered Section 1 as a viewer before R2 is designed.
