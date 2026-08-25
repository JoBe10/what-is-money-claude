# Batch A — Selection-Application Session — Report
## The Gate 1 ruling recorded · the frame verdicts applied · the patient regraded · the register assignments on file

**Mode: FAST.** Scoped verification: the grade gate on the regraded render and on the whole shipping set, the production build, a deck-boot smoke, and visual review of the two re-rendered frames and the re-cut contact sheet. No deck-wide suite, no traversal matrix, no register or brightness audit — no scene, engine or manifest file changed.
**Branch:** `film-rebuild`. **Prior tag:** `batch-a-frames`. **Tag:** `batch-a-selections`.
**Date:** 25 August 2026

---

# 1. The selections record — the presenter's rulings, 25 August 2026

The approval trail, so it lives in the repository rather than only in chat. These
are the authority for every change in this session; none of them is a session
choice.

| # | Ruling | Where it landed |
|---|---|---|
| 1 | **Prototype Gate 1: the Claim Mark is candidate A** — the current ClaimObject luminous disc, verbatim. Because A is the existing disc, the hours-field unit style already rhymes with it: **no unit-style tuning, no P1-F1 re-render.** | `src/proto/claim-mark.js` — `CLAIM_MARK_SELECTION = 'A'` |
| 2 | **S2-F1: the photographic patient wins** (`s2-f1-photo` over `s2-f1-mark`). | `s2-f1-final` |
| 3 | **S3-F1: compositional attempt 2** — the birth in the scene — **with the patient as a photograph, not the line glyph.** The only frame whose composition changes. | `s3-f1-final` |
| 4 | **P2-F1: the plain variant.** The hours-field ghost is retired for this frame: at ~3–4% luminance it is imperceptible on ordinary displays and will not survive YouTube compression; brighter would compete with the line. | the approved sheet takes `p2-f1-plain` |
| 5 | **Approved as rendered:** P1-F1, P1-F2, P1-F3, S2-F2, S3-F2 (candidate A), S4-F1, S4-F2 (candidate A). | not re-rendered — the stills stand |
| 6 | **The S4-F1 wine-edge observation is waved off** — presenter-accepted judgment, within the gate, no action. | no action |
| 7 | **The patient: regrade first.** Fall back to regeneration only if the regrade cannot pass without visibly damaging the subject. | regrade passed — §3 below |
| 8 | **Duplicate-subject scene assignments** (proposed in chat, approved with veto reserved). | `docs/dark-field-manifest.md` §2.2, `src/dark-field.js` |

The assignments of ruling 8: cowrie — `single_cowrie` to the P1 morph, `shells` to
the Scene 5 carrier lineup, `cowrie_shells` **banked**; ledger — `ledger_glow` to
Scene 8's transformation, `ledger` to the lineup and other display-scale
appearances; note — `gold_certificate` to Scene 7, `paper` to the P1 morph's paper
form and generic notes. **Nothing was deleted to record them.**

# 2. Implemented

**Prototype Gate 1 is recorded.** `CLAIM_MARK_SELECTION` is `'A'`. B and C stay
on file behind the same API, so a change of protagonist remains a one-letter
edit. One small correctness change came with it: `ClaimMark` and
`claimMarkExtent` now fold the candidate's case before dispatching, and
`ClaimMark` defaults to the recorded selection. Without that, the one-letter
guarantee was only true for A — `'B'` and `'C'` would have fallen through to the
disc while appearing to have been selected.

**The patient is regraded, gated and shipping** — §3.

**The two ruled frames are re-rendered**, and only those two. `s2-f1-final` is
the approved photographic composition with the patient drawn from the shipping
library instead of the drop zone and the HELD annotation gone. `s3-f1-final` is
attempt 2 with candidate A and the photograph in place of the line glyph.
`contact-sheet.png` is now the approved set of ten; the 24-cell sheet the
presenter marked up is preserved as `contact-sheet-markup.png`, because the sheet
that produced a ruling is evidence for it.

**Every prior still and candidate is on file** — 26 stills in
`review/frames-a/frames/`, including both S2-F1 options, both P2-F1 variants and
all three S3-F1 attempts in all three candidates. `frames.json` lists them, so
"nothing was deleted" is checkable rather than asserted. The rulings were applied
by *adding* two frames and changing which stills the sheet references — never by
re-rendering a judged frame.

**The register's assignments are recorded** in the manifest and, as a comment
beside the framing table, in `src/dark-field.js`. The code has no assignment field
to fill — a subject key resolves to one file, and which scene calls which key is a
property of the scenes, which this session did not touch — so the ruling is
written where a reader choosing between two cowries will be standing.

# 3. The patient regrade

Held at the Batch A gate on one clause of five: **top-left corner patch 64.73
against a limit of 6**, the key light's shaft in frame. Everything else passed
with room. The surgeon's failure class from R7.2 — a light source reaching the
frame, not a wrong grade.

**R7.4's crop was not available.** The subject already fills 0.70 × 0.90 of the
frame; the crop that removes the shaft removes the head. So the pass is the other
move in the same set — a **corner window**: stage black inside r = 0.12 of the
frame diagonal, smoothstepped back to untouched by r = 0.30.

**The two numbers are measured, not chosen.** The shaft is smooth and the subject
has edges, so local variance separates them exactly: the nearest structured block
sits at **r = 0.319** and the nearest pixel the key modelled at **r = 0.331**,
both outside the window. The consequence is not an estimate — **zero pixels of
L ≥ 90 changed**, and the brightest pixel anywhere in the window's reach is
L = 80, the shaft's own core. The subject cannot be clipped by an operation that
never reaches it.

**What was tried and rejected.** R7.4's third move, the global black-point crush,
was tried at [14, 34] — gentler than either parameter set R7.4 shipped — and it
visibly collapsed the gown's shadow side, taking the right shoulder and the lower
tie to black. The patient is lit far lower-key than the surgeon or the steak, and
its subject *lives* in the tones a crush lifts. That is the brief's stop
condition, so no crush is in the pass. A version masked to the window was also
measured and buys under one unit of ambient, because what remains lies outside
any window that can avoid the figure.

**Result.** Corner 64.73 → **0.08**, border 2.79 → **0.06**, 91.4% dark, R−B
**+122.6**, 100% of the highlight population warm. Five clauses of five; ingested
by the standard harness; the whole shipping set re-gated at **22 images, 110
checks, 0 failures**. The as-generated render is preserved at
`review/frames-a/dark-field/patient--as-generated.png` and the pass is re-runnable
from `review/frames-a/harness/regrade-patient.mjs`.

The framing row changed materially — `[0.976, 14.6, 4.5]` → **`[1.217, 3.4, -5]`**
— because the shaft's own brightness had been sitting inside the lit bounding box
and pulling it 14.6% left of frame centre. The old numbers described the beam as
much as the subject; the new ones describe the figure.

# 4. Files changed

| Commit | Change |
|---|---|
| `549db5d` | docs: the Batch A selection-application brief |
| `28838b2` | proto(claim-mark): record Prototype Gate 1 — the selection is candidate A |
| `bf0d568` | assets(dark-field): regrade the patient's corner — the shaft out, the subject untouched |
| `94ff15a` | assets(dark-field): ingest the regraded patient |
| `1d69355` | feat(dark-field): the patient's measured framing row |
| `5f78784` | docs(dark-field): the patient is regraded, gated and shipping |
| `3b1195d` | docs(dark-field): record the duplicate-subject scene assignments |
| `aeb7c29` | review(frames-a): the two ruled final compositions, and a harness that can render two frames |
| `996314d` | review(frames-a): render the two finals and re-cut the sheet as the approved set |

Plus this report, the handover currency edit (below), and the tag
`batch-a-selections`.

**`src/` changes are three files and no scene:** `src/proto/claim-mark.js` (the
selection and the case fold), `src/dark-field.js` (the patient's framing row and
the assignment comment), and nothing else. **No scene, slide, engine or manifest
module was touched, and nothing animates.**

**Out-of-scope changes, and why.** Two, both small and both named here rather
than done quietly.

1. `capture-frames.cjs` gained `--only` and `--sheet`, amended in place for the
   reason R7.3 amended the grade gate rather than copying it: two harnesses that
   cut the same sheet stop agreeing about it. `--only` exists because the brief
   forbids re-rendering the eight approved frames, and the harness could
   previously only render all twenty-four.
2. `docs/handover.md` §5–§6 said the Gate 1 selection was null, the patient was
   HELD, and the duplicate assignments were awaiting a ruling. It is the document
   an incoming session reads first, so leaving it would have actively misled the
   next one. Only the statements this session falsified were changed.

One operational note, carried from the frames session: the ingest harness re-runs
the gate into R7.2's evidence file as a side effect. That file was restored from
git immediately, and this session's runs are filed under
`review/frames-a/harness/` per the R7.3 `--out` amendment.

# 5. Validation

| Check | Result |
|---|---|
| grade gate — the regraded `patient` alone | 1 image, 5 checks, **0 failures** (`grade-selections-patient.json`) |
| grade gate — the full shipping set, post-ingest | 22 images, 110 checks, **0 failures** (`grade-selections-post-ingest.json`) |
| `npm run build` | clean |
| deck boot smoke (dev server on 5273, Playwright) | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** |
| frame capture | 2 frames rendered, **0 console errors** |
| visual review | `s2-f1-final`, `s3-f1-final`, and `contact-sheet.png` — reviewed at full 1920×1080 and on the sheet |

The presenter's own dev server on port 5173 was left untouched; this session ran
its own on 5273.

**Not run, and not claimed:** no traversal suite, no direct-entry matrix, no
reduced-motion pass, no register or brightness audit, no notes review. The deck's
slides did not change, and FAST guarantees those globally at the next GATE. The
archived R3/R4 harness breakage noted at Stage 0 still stands for that GATE.

# 6. Flagged, not improvised

1. **`fiat` is still missing** (pre-existing, manifest §3.0), and the §5 clause
   that `gold_certificate` be "visually distinct from the fiat note" stays
   unconfirmable until it lands. Both flags were deliberately left open, per the
   brief.
2. **The regraded patient's remaining warm ambient.** The corner window removes
   the shaft; it does not remove the glow the shaft left in the mid-left of the
   frame, because that glow lies between the shaft's tail and the subject, where
   no window can reach it without touching the figure. Measured as the 90th
   percentile of smooth-block brightness it is **9.2, against 6.8 for
   `coffee_cup`** — the highest of the renders already shipping. It is the same
   order, slightly above; it is not a gate clause and the gate passes it; it
   reads as key spill rather than as a beam. **This is a visual judgment, and it
   is the presenter's.** If his eye disagrees with the gate's verdict, the
   alternative is regeneration from the Batch A package §5 item 7, and the
   as-generated file is on record either way. It is visible in both re-rendered
   frames.
3. **One placement the rulings implied rather than stated.** S3-F1's patient had
   to acquire a box, an opacity and a position when it stopped being a 320px
   glyph. The brief's own words settled all three — "matching S2-F1's treatment"
   gives the 4:5 box and full opacity, and S2-F1's mirror symmetry gives the
   placement — and attempt 2's first path segment had to move because it began
   at x = 1470, inside the photograph's footprint. Recorded here because it is
   the one geometry in this session that was derived rather than transcribed.

# 7. Remaining judgment calls

- **The two new finals await the presenter's eye** on `contact-sheet.png`. They
  are the only frames in the approved set he has not yet seen rendered.
- **The patient's ambient** (§6.2) — ship as gated, or regenerate.
- **`fiat`**, and the `gold_certificate` distinctness check that waits on it.
- Deferred to the GATE by this FAST run: everything in §5's not-run list.

# 8. Recommended next step

**Prototype Gate 2 — Scenes 2–4 animated in the `?proto=` scratch route against
the approved frames**, on Fable 5 at top effort. The frames are ruled and the
register is complete but for `fiat`, which no Act I scene needs. The blueprint's
rule holds: do not leave Gate 2 until it is exceptional.
