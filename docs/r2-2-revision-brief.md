# Rebuild Session Brief — R2.2 (Transitions, Geometry, and the Icon Studio)
## *What Is Money? — And How Does Bitcoin Fit In?*

**Status:** Approved for implementation
**Scope:** Four changes (A–D) plus verification, on the delivered Sections 1–2. Standards per the governing documents; copy unchanged this session.
**Branch:** continue on `rebuild-r2-section-2` (unmerged).
**Date:** 29 July 2026

---

# A. Triangle label placement (outside rule)

The centered-below labels on the exchange-triangle slides collide with the drawn edges. New rule, replacing uniform below-centering for polygonal layouts: **labels sit on the outside of the shape, never crossing an edge, in mirror symmetry across the vertical axis.** Concretely: FISHERMAN's name + HAS/WANTS block left of its dot (right-aligned toward the dot), SANDAL-MAKER's block right of its dot (left-aligned toward the dot), FARMER's centered below its dot (no edge below it). Icon anchors unchanged (centered above dots). Same vertical offset for the two side blocks; verify no text touches any edge at any build. Add the outside rule to the §C placement rules in `docs/r2-1-revision-brief.md`'s icon-grammar doc (or `docs/icon-grammar.md` if created).

---

# B. Transition defaults: crossfade, and black only on purpose

Two changes:

1. **Missing continuity group (bug-adjacent):** the two exchange-triangle slides (the coincidence-of-wants slide and the discovery slide) share one scene and must join a `sceneGroup: "exchange-triangle"` — the triangle persists across the boundary with a handoff, no gap. (The icons appearing on the second slide simply arrive as that slide's first build.)
2. **New global default:** between slides with *no* shared group, replace the fade-through-black with a **~300ms crossfade** (outgoing dissolves as incoming rises; no black frame between). Black becomes a *deliberate* design element only: it appears where a script or build explicitly calls for it (the cold open's darkness, 1.3's clear-to-black before the title, any future scripted black beat) — never as an incidental byproduct of navigation. Reduced motion: instant cut, no crossfade.

Add to `docs/sections-1-3-rebuild-brief.md` §3.5 as a craft rule: **"Black is a beat, not a seam. Darkness appears only where the design calls for it; navigation never manufactures it."**

---

# C. Rail geometry and label fixes

1. **Dots on the line:** after the transformation in the merged competition-record slide (and at every rail state thereafter), all stop markers are vertically centered *on* the rail line — marker center y equals line y, exactly, for every stop at every camera. The current post-transformation state leaves the contender dots off the line.
2. **Camera-stable label centering:** every stop's label and wound text remains horizontally centered under its own stop at every camera position and zoom (the IRON block currently drifts right at the gold camera). Labels are positioned in rail-space and transformed with the camera, not re-laid-out per viewport; combined with the R2.1 clipping rule (padding at frame edges may compress *spacing*, never de-center an individual label under its stop).
3. Re-verify the full clipping sweep after both fixes at every build's camera.

---

# D. The Icon Studio (full custom glyph set)

**Decision context:** the redrawn glyphs still read as generic icon-library work. Generative raster images (DALL·E-class) are rejected for final assets — style drift across a set, raster edges on black, no token-driven color/glow, and a painterly bias that clashes with the deck's vector austerity (the same aesthetic already removed with the section-opener paintings). The fix is a real design pass with a *distinctive* grammar, executed as vectors.

**The grammar — "drawn from the deck's own primitives":** every glyph is constructed from the deck's existing visual language: thin single-weight strokes, small dot terminals, geometric construction on the shared 48u grid — each good rendered as a minimal engraved mark, the way it might be stamped on an ancient coin or drawn as a constellation. Dots may serve as eyes, grains, rivets, bead-knots; lines as horns, planes, stems. The set must be unmistakably *one hand*. No filled shapes larger than a dot terminal; no rounded-rectangle app-icon energy; no perspective boxes. Subtle glow per the deck's luminance token.

**The set (this session):** fish, grain, sandals, cattle, salt, shells, iron, metals, gold, coinage, paper, **fiat**, **bitcoin**. Fiat's glyph: a note-like mark consistent with its floating, unanchored character (design it with the severance state in mind). Bitcoin's glyph: the ₿ symbol *redrawn in the grammar* — same stroke weight and terminal language as every other glyph; the universal mark, in this deck's hand. (Yes: every rail stop gets a glyph, fiat and Bitcoin included — the rail's visual sentence is glyph + marker + label for every entry, no exceptions.) Reserve grammar headroom for R3's future glyphs (functions, stages, palladium).

**Process:**

1. For each glyph, generate **three genuinely distinct candidates** on the grammar (different construction ideas, not stroke-width variants).
2. Render a **contact sheet** (single HTML page, all candidates at display size and at rail size, on black) and screenshot it to `review/rebuild-r2/icon-studio/`.
3. Self-select the strongest candidate per glyph with one line of rationale each (recorded in the report); apply the selections across Sections 1–2 (triangle slides, competition-record, all rail stops).
4. Keep all candidates in the repo (`assets/icons/candidates/`) so any selection can be swapped by the presenter without redesign.
5. Write `docs/icon-grammar.md`: the construction rules, the grid, the do/don't list above, and the contact sheet reference — the binding standard for every future glyph.

---

# E. Verification

1. Build clean; full traversal both directions. Triangle slides: labels collide with no edge at any build; handoff across the new `exchange-triangle` group with zero gap (frame-capture both directions).
2. Global crossfade verified at three non-grouped boundaries (frame captures: no black frame); scripted black beats unaffected (1.3 title clear-to-black intact); reduced-motion instant cuts.
3. Rail geometry: automated check that every stop's marker center sits on the line (pixel-sample or transform assertion) at every build camera; label centering verified at every camera including the gold position; clipping sweep re-run.
4. Icon studio: contact sheet screenshots present; selections applied everywhere (grep: no pre-studio glyph assets referenced); glyphs render correctly at both triangle and rail scales; `docs/icon-grammar.md` exists.
5. Reduced-motion and direct-entry passes over all changed builds.
6. Screenshots: triangle slides (all builds), competition-record transformation end state, the gold camera, the full-rail frame with all thirteen glyphs placed. Save under `review/rebuild-r2/screenshots-r2-2/`.
7. Append an R2.2 section to `docs/r2-report.md` with evidence, the icon selections + rationales, and deviations.

Stop after the report. Do not merge.
