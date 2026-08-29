# Gate 2 — Beat-State Sheet Session — Report
## Every state of Scenes 2–4 as a full-size still · candidates at every open decision · the rulings recorded

**Mode: FAST.** Stills and records only: the sheet render, the production
build, the deck-boot smoke, and the r1 prototype's own suite re-run green
after the birth-default change. No deck, engine or scene file changed.
**Branch:** `film-rebuild`. **Prior tag:** `gate-2-r1`. **Tag:** `gate-2-states`.
**Date:** 26 August 2026

---

# 1. The rulings, recorded (presenter, 26 August 2026)

Each landed as its own commit, in docs and code:

| # | Ruling | Where it landed |
|---|---|---|
| R1 | **The interval splits into three advances — S3 is 9 beats.** | `batch-a-package.md` §1 amended; two `[→]` inserted in the S3 interval paragraph, zero word changes (`c402b5b`) |
| R2 | **The capabilities build moves into S2 beat 1**; beat 2 is the delivery and receipt. | `batch-a-package.md` §1 amended; script untouched (`41d8d36`) |
| R3 | **The birth is pool**; condense is the named banked alternate; all three stay selectable. | `s3-the-breakthrough.js` default = 3; recorded in `_birth.js` (`7149750`) |
| R4 | **The Scene 3→4 morph is confirmed**; no authored-black variant. | `s4-spend-or-save.js` (`8b299cc`) |
| R5 | **The claim's micro-motions are kept into r2**, judged in motion. | `s3-the-breakthrough.js` (`8bd4651`) |
| R6 | Housekeeping: the package §2 scripts take **typographic apostrophes** — zero word changes. | `batch-a-package.md` (`1e182c2`) |

The r1 prototype's code was **not** re-implemented — the 19-beat structure
lands in motion r2, against this sheet. Only the records and the birth default
changed, and the r1 suite re-ran green afterward.

# 2. The sheet

**`review/gate-2/states/`** — 42 cells + 5 reference captures, all full-size
1920×1080 through the same harness discipline as the approved frames; `sheet.html`
links every full-size image; `states.json` is the per-cell record. Beat counts:
**S2 = 5, S3 = 9, S4 = 5** (19 base states, every one covered).

**Carried approvals rendered as landed states:** s2-f1-final (S2 b1, now with
the capabilities per R2), s3-f1-final (S3 b1), s3-f2-a (S3 b6-A, and the b8-A
reset), s4-f1 (S4 b2-A), s4-f2-a (S4 b5-A).

**Formally retired:** `s2-f2` — reopened by the presenter (photographic patient
everywhere; goods composition vetoed) and superseded by the S2 beat 3–4
candidates. Kept on file in `review/frames-a/frames/`; the retirement is
recorded in `states.json` and here (the frames-a records are left as the
historical evidence of that session).

## The cells, by status

| Status | Cells |
|---|---|
| CARRIED (5) | s2-b1-a (also D8-A) · s3-b1 · s3-b6-a · s4-b2-a · s4-b5-a |
| NEW, no open decision (3) | s2-b2 (the delivery, R2's new beat) · s3-b2 · s3-b3 |
| D1 patient recession (2) | s2-b3-a (dimmed in place, baseline in all b3/b4 cells) · s2-b3-d (deep recede, recorded handoff) |
| D2 goods arrangements (3) | s2-b3-a (cluster at the surgeon's side) · s2-b3-b (band beneath the path) · s2-b3-c (constellation above) |
| D3 failure languages (3 + 3) | s2-b4-a (misaligning fragments) · s2-b4-b (widening gaps) · s2-b4-c (thinning stroke) — each with its S3 b1 remnant variant (s3-b1-a/b/c) beside the carried s3-b1 |
| D4 statement stages (4) | s2-b5-a / s3-b9-a (full handoff to clean black) · s2-b5-b (the two people as anchor) · s3-b9-b (the interval line as anchor) |
| D5 completion demonstration (3) | s3-b7-a (two roads) · s3-b7-b (two phases, one frame) · s3-b7-c (the circle closes) |
| D6 interval typography (6 + 2) | s3-b4/b5/b6 ×A (the approved system) ×B (the display-scale staircase, no line) · s3-b8-a/b (the reset, follows the selection) |
| D7 Scene 4 systems (10 + 5 refs) | ref-4-05-b0…b4 (the legacy bar) · s4-b1…b5 ×A (approved system, fork and reset upgraded) ×B (the symmetric fork in the film's grammar) |
| D8 patient temperature (2) | s2-b1-b (tighter crop, runs to the frame bottom) · s2-b1-c (reduced scale, repositioned) |

## Session design choices inside the candidates (each visible in its cell, none silent)

1. **The S2 return corridor is restaged.** With the patient photographic
   (ruled) the retired s2-f2 geometry would start the return path on his body.
   All beat 3–5 candidates use a corridor from his near edge (x ≈ 1170) into
   the open dark between the figures; the origin tracks his box in D1-B.
2. **D2-B reads "on the line" as strung beneath it** — goods hanging from the
   road — because boxes straddling the stroke would swallow the failure
   language.
3. **D4/D5 anchors:** the anchoring element in s2-b5-b is the two figures (the
   line names them); in s3-b9-b it is the interval line (it is the unfinished
   exchange). The D5 cells hand the interval's words to the floor of a handoff
   — the demonstration is the beat's one idea, and its travel crosses their
   ground.
4. **D7-A's fork** gives the approved system two real fadeSeg roads (left =
   spend, right = the existing interval) with the kicker names at their
   destinations; **D7-B** takes the legacy's symmetric-fork lesson into the
   film's line grammar — mirrored descending roads, dot terminals, the
   unchosen dormant rather than absent, and no carrier shell (the carrier is
   Act II's story).
5. **D8-B's crop runs to the frame bottom** — a deliberate, captioned
   departure from the edges rule; any floating-box crop of the zoomed render
   showed a hard cut edge.

# 3. Flagged, not improvised

1. **D5-B vs the settle sentence.** The brief's D5-B stages "claim
   mid-departure … shoe mid-arrival" in one frame, while the same item's
   closing sentence requires every candidate's settled state to show the claim
   absent. The cell is rendered as written (both objects mid-flight); its
   caption records that, if selected, the beat's motion settle still ends
   shoe present, claim gone. The presenter's verdict on the cell resolves the
   tension.
2. **The r1 prototype's notes still carry the 7-beat S3 script.** R1's two
   `[→]` marks are in the package; the proto module's notes are r1 code, which
   this session was ordered not to re-implement. Motion r2 rebuilds the module
   at 9 beats with the amended script — until then the proto's notes lag the
   package deliberately.
3. **S3 beats 4–6 and 8 depend on the D6 selection**, and the D5/b8 cells are
   rendered in system-A context; if D6-B is selected, the b7/b9 context
   re-renders in the next pass. Likewise every S2 beat 3–5 cell's context
   follows the D1–D3 selections (baselines: D1-A, D2-A, D3-A, stated per
   caption).
4. **s3-b8 equals s3-b6 by design** (the reset returns to the held claim) —
   rendered as its own cells regardless, per the full-coverage rule.
5. **Further S2 temperature work is out of this session's reach** (D8's own
   scope note): entry motion — light rising, the path drawing itself —
   belongs to motion r2; any regenerated patient photograph is the presenter's
   own generation. No image regeneration was attempted.

# 4. Files changed

| Commit | Change |
|---|---|
| `da17b70` | docs: install the states brief (the full-coverage rule) |
| `c402b5b`–`1e182c2` | the six ruling commits (§1's table) |
| `0ad5fd7` | review(gate-2): the beat-state builders and capture harness |
| `ed60d80` | review(gate-2): the sheet — 42 cells, 5 references, index, record |

Plus this report, the handover update, and the tag `gate-2-states`.

**Files changed in `src/`:** only the two R3/R4/R5 ruling records in
`src/proto/gate-2/` (comments and the birth default). **No deck, engine,
scene, slide or style file changed.**

# 5. Validation

| Check | Result |
|---|---|
| sheet render | 42 cells + 5 references at 1920×1080, **0 console errors** |
| `npm run build` | clean |
| deck boot smoke | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** |
| r1 proto suite after the birth-default change | traversal 17/17 both ways · direct entry 17 · reduced-motion parity **17/17** · 0 errors |
| visual self-audit | every candidate family reviewed at full size during composition; collisions found and fixed (the D8-B crop edge, the D5-B label collision, the S2 corridor) are in this report's §2 notes |
| no accent in S2 cells | by construction — no ClaimMark and no accent token renders in any S2 builder |

**Not run, and not claimed:** no deck-wide suites, no register/brightness
audits, no notes review (no notes changed). FAST defers those to the GATE.

# 6. The review protocol (the presenter's part)

Open **`review/gate-2/states/sheet.html`** on the dev server. Every cell is
examined **at full size** — click the image or its "full size" link — and
receives a per-cell verdict: **approved / approved-with-notes / redo /
select A|B|C**. No bulk verdicts; an unexamined cell stays unreviewed and
blocks motion on its beat. The verdicts and selections become the approved
state set; **motion r2 then implements the 19-beat structure connecting
approved states only**, with derivation banned outright.

The decisions awaiting selection: **D1** (patient recession), **D2** (goods
arrangement), **D3** (failure language, with its S3 remnant), **D4** (statement
stages ×2 scenes), **D5** (the demonstration), **D6** (interval typography),
**D7** (Scene 4's system, against the legacy bar), **D8** (the patient's
presence in beat 1).

# 7. Recommended next step

**The presenter reviews the sheet cell by cell and returns the per-cell
verdicts and the eight D-selections**; motion r2 (Fable, top effort) then
rebuilds the prototype at 19 beats against the approved set.

---

# 8. The selections record (appended 27 August 2026, by the r2 session)

The presenter reviewed the sheet per §6 and returned the per-cell verdicts.
The approved state set — recorded per cell in `states.json` (`ruling` /
`rulingNote`, `rulings` block) — is:

| Beat | Approved state |
|---|---|
| S2 b1 | `s2-b1-a` (carried composition; capabilities accumulate here per R2) |
| S2 b2 | `s2-b2` |
| S2 b3 | `s2-b3-a` — patient dimmed in place (D1-A); goods at the surgeon's side (D2-A) |
| S2 b4 | `s2-b4-c` — **the path-failure language is the thinning stroke (D3-C), film-wide** |
| S2 b5 | `s2-b5-b` — the two people as the statement's anchor (D4-B) |
| S3 b1 | `s3-b1` (carried birth frame) with remnant language C (`s3-b1-c`'s remnant) |
| S3 b2 | `s3-b2` |
| S3 b3 | `s3-b3` |
| S3 b4–b6 | `s3-b4-a`, `s3-b5-a`, `s3-b6-a` — interval typography system A (D6-A) |
| S3 b7 | `s3-b7-b` — completion as two phases in one frame (D5-B) |
| S3 b8 | `s3-b8-a` |
| S3 b9 | `s3-b9-a` — full handoff to clean black under the separation lines (D4-A) |
| S4 b1–b5 | `s4-b1-b` … `s4-b5-b` — **Scene 4 is system B throughout (D7-B)** |

All single-candidate cells: approved as rendered. Non-selected candidates
stay on file (aesthetic law, file-keeping clause). The prior standing rulings
hold: birth default **pool** (condense banked), micro-motions kept for live
judgment, S3→S4 **morph**, no accent before the birth, patient photographic
everywhere.

**One new component-level ruling (27 Aug, presenter markup on the legacy
4.05 reference):** in the ClaimMark's **carrier context** the disc sits
**centered between the carrier arcs, fully symmetric**. The fix lands in the
component in r2 and must hold at every scale of the Gate 1 sheet's carrier
row. No current Gate 2 state uses the carrier — the ruling protects Act II.

Per this report's §3.3 (contexts follow the selections), the D3-C ruling
propagates into the one selected cell whose receded context still carried the
D3-A baseline: `s2-b5-b` re-renders with the thinning-stroke context in r2,
recorded in `states.json` and flagged in the r2 report for the presenter's
eye at the live review.

---

# 9. The r3 reopenings (appended 28 August 2026, by the r3 session)

The presenter reviewed r2 live, as a viewer, per the r2 brief's §6, on
28 August 2026. His rulings:

**9.1 The D3-C failure language is rejected in motion.** Viewed live, the
gapped attempt (S2 b3), the stepped thinning (S2 b4), and the faded remnant
at the birth (S3 b1) all read as rendering defects, not as a path failing.
**Formally reopened:** `s2-b3-a`'s path element, `s2-b4-c`, and `s3-b1`'s
remnant — the path element within these states only. The compositions around
them (patient, surgeon, goods cluster, disc) are NOT reopened. The
replacements are three runtime-selectable failure languages
(`?proto=gate2&path=1|2|3`), judged live; the selection re-enters the
approved record at the gate close. Binding on every candidate: **no degraded
stroke ever appears in a settled frame** — failure is carried by motion, by
absence, or by a medium that is not a line. Recorded per cell in
`states.json` (`reopened` blocks) and in its `rulingsR3` record.
**9.2 The spend goods layout is reopened with an explicit markup.** In
`s4-b2-b` the three goods renders are too large and reach into the frame's
center. The fix is a direct markup, no candidates: the shoe, steak and wine
at a reduced, uniform scale, arranged as a compact triangle within the spend
terminal's zone — wholly inside the frame's left third, never crossing
toward center. The legacy deck's spend arrangement (`ref-4-05-b2`) is the
feel being pointed at (containment, modesty), not the geometry. The road
grammar, the kickers and the claim's redemption motion stand. Re-rendered
through the states pipeline as `s4-b2-b2.png` beside the reopened original.
**9.3 Closed from the live review by absence of objection.** The claim's
micro-motions (the first-breath pulse, the release breath) are **kept — R5
is closed.** The S2 entry is **accepted** and the presenter's original
temperature concern is **resolved — D8 is closed.**

**9.4 The gate remains open;** it closes only on the presenter's recorded
word after r3.

---

# 10. The gate's closure (appended 29 August 2026, by the close session)

**GATE 2 IS CLOSED, on the presenter's recorded word: *exceptional*.**
The word was given 29 August 2026. (The session prompt first carried
"average", which is not the gate's word, and the close was refused on it —
the gate's own law forbids softening. The presenter corrected it in-session:
*"Sorry, I meant to write exceptional. Please close that gate now."* The
close executed only on the corrected word.)

His rulings against r3, recorded:

**10.1 The failure language is path 2 — the absence.** No return line exists
before the birth; the service path stays whole (the delivered half on
record); the terminal dot strains toward the surgeon and subsides, harder at
b4; the birth pools from the void, the dot's final strain feeding it.
Recorded as the prototype's default (`readPathParam` → 2); paths 1 (the
reach) and 3 (the flow) remain runtime-selectable on file, retired per the
aesthetic law's file-keeping clause.

**10.2 The contained spend goods are approved.** `s4-b2-b2` is promoted to
the approved record as S4 b2's state; the reopened `s4-b2-b` layout is
retired to file.

**10.3 The approved record re-rendered in the selected language.** The three
reopened sites take their path-2 settled states as new cells beside the
retired originals: `s2-b3-p2`, `s2-b4-p2`, `s3-b1-p2`. Per §3.3 (contexts
follow the selections) and the r3 report's flag 7.1, `s2-b5-b`'s receded
failure context is re-rendered as `s2-b5-b-p2` — the service path on record
and the terminal dot, both at the b5 recede factor — so the approved record
no longer speaks D3-C anywhere. The authoritative post-close set is
`states.json` `approvedSetCurrent`.

**10.4 The banked birth alternates stay deferred** (the close brief's §1:
pool is the ruled default; coherence work on collapse/condense under the
selected language is not performed).

**Gate 2 is the film's signature system — Scenes 2–4, the claim's birth —
and it is closed on the presenter's recorded word. Tag: `gate-2-closed`.
Batch A implementation is unblocked on the Prologue sheet's approvals.**
