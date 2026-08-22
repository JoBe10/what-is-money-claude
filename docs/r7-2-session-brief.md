# Rebuild Session Brief — R7.2 (The Two-Register System & Section 4 Completion)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation (presenter ruling: Option A — the two-register synthesis)
**Scope:** Codify the two-register visual system; integrate the dark-field register into Section 4 (and two designated Section 1–3 moments); complete every phase R7.1 left unfinished, under the amended standard. Frozen argument, installed scripts, and all fifty scores untouched, as ever.
**Branch:** continue on `rebuild-r7-1-harmonization`.
**Model guidance:** maximum available effort. Contact sheets and candidates everywhere; presenter override preserved.
**Date:** 1 August 2026

---

# 0. Read first

This brief; `docs/r7-1-report.md` (especially §8, the ordered remainder — this session completes it under amended rules); `docs/sections-1-3-rebuild-brief.md` §9.4; `docs/section-4-master-document-v2.md`; `docs/icon-grammar.md`. The presenter's side-by-side review found the old Section 4's dark-field photography *tonally right* (black ground, single warm light) and its chrome wrong — the amendment below makes that judgment law.

---

# 1. Phase A — Amend the standard

## A1. Add to `docs/sections-1-3-rebuild-brief.md` §9.4, verbatim:

> 9. **The two registers.** The deck speaks one language in two registers, and every visual is assigned to exactly one:
>    - **The line grammar** (rules 1–8): for everything *structural* — mechanisms, records, comparisons, diagrams, labels. Where abstraction is the argument, abstraction is the form.
>    - **The dark-field register**: photographic/rendered imagery, permitted only where *sensory concreteness is the argument* — a human being's hour, a meal, a good someone's savings lived in. Its grade is fixed: pure black ground (no environment, no horizon), a single warm key light (≈2700–3200K), the subject emerging from darkness with soft falloff, no text baked in, one consistent look across every image as if from a single shoot. Outliers are regenerated, never grandfathered.
>    - **Governance:** dark-field never enters a diagram; glyphs never carry a sensory beat at display scale. Register switches are designed moments, not convenience. Every slide's register assignment is recorded in the decision log. Each recurring subject may exist in both forms — the dark-field render for its sensory introduction, the grammar glyph for its structural life — and a designed handoff may transform one into the other.

## A2. Update `docs/section-4-master-document-v2.md` §3.7 to record Option A (two-register synthesis; disc-in-shell retained; photography restored under grade).

---

# 2. Phase B — The dark-field asset pipeline

1. **Inventory:** most old Section 4 imagery still exists on this branch (only 4.03's surgeon slide was rebuilt; its photograph is in git history — restore it). Collect: surgeon, sneaker/shoe, steak, wine, and the old carrier-candidate renders (shells, gold, paper, bank ledger, bitcoin).
2. **Grade gate (programmatic + visual):** for every dark-field image — frame-corner luminance near black (no visible cut-out edges or environment), warm-dominant highlight histogram, single-key-light consistency by inspection. Build the check into the harness; contact-sheet every image at slide scale for the presenter.
3. **Regeneration manifest:** for any old image failing the gate, and for the new subjects below, write `docs/dark-field-manifest.md` listing each required image with its **generation prompt**, built from this master template (adapt the subject line only):

> *"[Subject], photographed emerging from pure black darkness. Single warm tungsten key light from the upper left, ~3000K. Deep shadows, soft falloff into black. No background, no environment, no surface visible except where the light defines it. Rich material texture, cinematic chiaroscuro, shallow depth of field. No text, no watermark. Centered composition with generous dark space around the subject."*

New subjects required: **a cattle head or small herd study · a rough salt crystal or block · a cluster of cowrie shells · a rough iron bloom or bar** (Section 2's contenders, §4.1), and optionally **a gold study** for the two-survivors arrival (implement as a flagged candidate). The presenter generates images from the manifest in his image tool and drops them into `assets/dark-field/incoming/`; the session integrates whatever is present, grade-gates it, and **stubs any missing image with its glyph plus a `DARK-FIELD PENDING` code comment** — never blocking, never substituting off-grade imagery.

---

# 3. Phase C — Section 4 under the two registers

1. **The surgeon beat (03):** the photograph returns as the sensory anchor, dark-field graded, on a slide restaged to §9.4 density (headline; capabilities as the one accumulating build per the frozen script; the $400 as its own landing). The R7.1 node-scene retires from 03. (If no slide retains the node-scene, the operation-glyph studio round is moot — record and skip; otherwise run it with the settling-pulse direction.)
2. **The unfinished exchange (04) and spend-or-save (05):** finish C1 properly — these are line-led *mechanism* slides: the claim-disc travels, the circuit closes or holds. The wanted-goods appear as **dark-field renders at display scale** (shoe, steak, wine — they are the sensory point) with correct compositional placement (no more edge-floating, no title occlusion — the R7.1 bug states are replaced by real recompositions matching the installed scripts' `[→]` structure). SPEND resolves disc-into-goods; SAVE holds the disc in the carrier.
3. **The carrier (06):** disc-in-shell retained; **the shell gains material presence** — a fuller enclosure than the two thin arcs, with weight and a subtle glow tuned against the old capsule's confidence (three candidates, contact sheet, selection rationale). The carrier-candidates lineup beneath uses the **restored dark-field renders** (shells, gold, paper, ledger, bitcoin) at display scale — their glyph twins remain in every diagram context (table, rail, 4.21).
4. **C2 (stability restage), C3 (monetary premium), C4 (margin/case verification):** as specified in the R7.1 brief, unchanged — these are structural frames and stay pure line grammar. In C3, the three asset examples may use small dark-field renders *or* glyphs; decide by scale (if rendered at tile scale ≥ the carrier lineup's, dark-field; if label scale, glyph) and record the call.
5. **Phase D sweep:** complete it across all remaining Section 4 slides — recomposition of the nineteen de-headered gaps, density restaging, register assignment per slide, decision log. Structural diagrams stay glyph-only without exception.

---

# 4. Phase D — The two Section 1–3 moments (the only S1–3 changes)

1. **The contenders' introduction (the competition-record slide, builds 0–5):** cattle, salt, shells, iron appear as **dark-field renders** for their sensory introduction — real goods someone's savings lived in — then, at the transformation build, **crossfade into their grammar glyphs as the line draws through them**: the register switch *is* the meaning — the moment history abstracts the good into a record. Reduced motion: instant end states. If the four generated images aren't yet present, implement the mechanism against glyph placeholders with the pending flags.
2. **Optional, flagged candidate:** the two-survivors slide's final build may land a dark-field gold study as the "gold won everything" arrival. Implement behind a single toggle, screenshot both variants, presenter rules on the contact sheet.
3. Nothing else in Sections 1–3 changes. The exchange triangle, rail, murmuration, tower, ladder, waypoints remain pure line grammar by rule.

---

# 5. Phase E — Completion and verification

Everything from the R7.1 brief's Phase E, plus:

1. `playwright` declared as a devDependency (committed) before verification runs.
2. Image grade gates pass for every integrated dark-field asset; contact sheets under `review/rebuild-r7-2/dark-field/`; pending-image stubs listed in the report.
3. Register audit: per-slide register assignments in the decision log; grep/DOM gate that no photographic asset is referenced by any diagram-classed slide.
4. Full verification suite honestly (traversal both directions, reduced-motion matrix, direct entry + mid-animation refresh, pacing tables, frozen-element byte-checks, "Don't trust. Verify." exactly twice, banned terms, zero incidental black, frame captures).
5. Docs sync (§9.4 amendment, v2 doc, decision log); update `docs/r7-1-report.md` into a completed combined R7.1+R7.2 report (or write `docs/r7-2-report.md` referencing it) with §6 verification actually filled.

Stop after the report. Do not merge. The presenter's review follows: the finished old-versus-new comparison this decision was waiting for.
