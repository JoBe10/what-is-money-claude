# Gate 2 Close · Prologue Beat-State Sheet — Report
## The gate did NOT close — the word given is not the gate's word · the Prologue sheet is complete under the full-coverage rule

**Mode: FAST.** Stills and records only: the sheet render, the measured cell
checks, the production build, the deck-boot smoke. No deck, engine, scene,
manifest or script file changed — zero deck impact.
**Branch:** `film-rebuild`. **Prior tag:** `gate-2-r3`. **Tag:** `prologue-states`.
**The `gate-2-closed` tag was NOT cut** — §1 below.
**Date:** 29 August 2026

---

# 1. Gate 2 remains OPEN — §1 of the brief did not execute

**This is the report's most important line, so it comes first.** The session
prompt supplied: *"path 2 selected; the contained spend goods approved; the
word is given — Gate 2 is **average**."*

"Average" is not the gate's word. The word that closes Gate 2 is
***exceptional*** — fixed in `docs/gate-2-brief.md` ("the gate closes when he
says the word *exceptional* … **Do not soften this into 'good enough to
proceed.'**"), restated in the r3 brief §6, in the r3 report §9, and twice in
the handover. The close brief's §1 executes *"only with the presenter's
word"*; a closing protocol run on a word that is not the word — one that, read
plainly, is a verdict in the opposite direction — would put a false closure on
the record and tag it. So, per the brief's own conditional and the standing
law's do-not-soften clause:

- **No closing action was taken.** No path selection recorded in
  `states.json`, no cells re-rendered or promoted, no alternates retired, no
  `s2-b5-b` context re-render, no `gate-2-closed` tag.
- **The rulings received in the prompt are preserved here, verbatim, for the
  closing micro-session:** the failure language is **path 2 — the absence**;
  the contained spend goods (`s4-b2-b2`) are **approved**. They were NOT
  entered into `states.json`, because the brief binds all §1 records to the
  word.
- **What unblocks the close:** the presenter's recorded word *exceptional* —
  or his explicit instruction that the gate now closes on the verdict he
  actually gave. Either arrives in a session prompt; the §1 protocol then runs
  exactly as written (the path-2 records, the re-rendered approved cells
  including `s2-b5-b`'s context, the promotion of `s4-b2-b2`, the alternates
  retired, tag `gate-2-closed`).

If "average" was a transcription slip for a word he did say, nothing is lost —
the closing micro-session is small and fully specified. If "average" is what
he said, closing the gate on it would have been exactly the softening the
gate's law forbids.

# 2. Standing records carried (no decisions)

R5 (micro-motions kept) and D8 (entry accepted) were recorded closed at r3;
nothing here touches them. The `fiat` render is flagged in §6.4 — nothing in
this session waited on it.

# 3. The Prologue beat-state sheet

**`review/prologue/states/`** — 15 cells, all full-size 1920×1080 through the
states pipeline (the same harness discipline as the approved frames and the
Gate 2 sheet); `sheet.html` links every full-size image; `states.json` is the
per-cell record.

**The beat count is the script's, and the map disagrees — flagged (§6.2).**
`docs/batch-a-package.md` §1 says P1 is 10 beats (condensation-into-first-form
as one gesture); the §2 verbatim script carries **11 `[→]` marks** — the
condensation (*"condenses into… this."*) and the shell (*"A shell."*) each
advance. Per the close brief, the sheet renders to the script's count: one
`[→]` = one state. **P1 = 11 states + the authored entry black (`p1-b0`);
P2 = 2 states.**

**Carried approvals ship byte-identical** — their inputs are unchanged since
approval (Gate 1 ruled candidate A, so no P1-F1 re-render; no deck or asset
change since), and the hours field's per-unit jitter is `Math.random`-based,
so a re-render would replace approved pixels with a fresh sampling. Verified
by hash: `p1-b2` = `p1-f1`, `p1-b5` = `p1-f2`, `p1-b11` = `p1-f3`,
`p2-b1` = `p2-f1-plain`. The mapping is explicit in `states.json`'s `carried`
block.

## The cells, by status

| Cell | Beat | Status |
|---|---|---|
| `p1-b0` | entry | DETERMINED — the authored black hold, rendered as its own cell |
| `p1-b1` | b1 | DETERMINED — field complete + counter at 80,000, the deck's proven 1.01 treatment (**C2 resolved as determined** — the counter typography is P1-F1's approved `s1q-hours__counter`; the §1 map and frame specs leave nothing open) |
| `p1-b2` | b2 | CARRIED (`p1-f1`, byte-identical) — the hours line over field + counter |
| `p1-b3` | b3 | DETERMINED — the condensation's settled landing: the field's own units gathered into one dense warm mass at the forms' center. A mass, deliberately **not a disc** (born in Scene 3) and not yet any form (the shell is the next advance's reveal) |
| `p1-b4` | b4 | DETERMINED — SHELL, `single_cowrie` per the recorded assignment (manifest §2.2), P1-F2's scale and center |
| `p1-b5` | b5 | CARRIED (`p1-f2`, byte-identical) — GOLD |
| `p1-b6` | b6 | DETERMINED — PAPER, `paper` per the recorded assignment |
| `p1-b7` | b7 | DETERMINED — LEDGER, `ledger` per the recorded row; **flagged §6.3** (the architecture says "glowing ledger entry") |
| `p1-b8-a` | b8 | **CANDIDATE C1-A** — the `bitcoin` coin render, continuous with the four physical forms; carries the manifest's V-1 flag (a physical object the film argues bitcoin does not have) |
| `p1-b8-b` | b8 | **CANDIDATE C1-B** — the form refusing to condense into an object: structured light — the field's units held in an exact lattice at the forms' center, edges dissolving into dark. Composed entirely from existing vocabulary (the unit grammar's rects, the unit-warm family); no disc, no symbol, no accent, no Claim Mark anticipation |
| `p1-b9` | b9 | DETERMINED — the forms line at the stakes register, alone; the morph layer hands off fully (**recorded handoff**, §6.5) |
| `p1-b10` | b10 | DETERMINED — the question line at the deck's proven big-question register (1.03's), alone; the forms line clears (sequenced, never stacked — 1.02's precedent) |
| `p1-b11` | b11 | CARRIED (`p1-f3`, byte-identical) — the TITLE punchline |
| `p2-b1` | b1 | CARRIED (`p2-f1-plain`, byte-identical) — the mercy line alone (the ghost was retired by ruling 4, 25 Aug) |
| `p2-b2` | b2 | DETERMINED — the spoken promise: **the screen holds** (§1 map; the architecture adds "no agenda, no map on screen" — the waypoint device is retired). Identical to b1 by design, rendered as its own cell per the full-coverage rule (the `s3-b8` precedent). Proven identical: **0 differing pixels** against `p2-b1` |

## Session design choices inside the determined cells (each visible, none silent)

1. **`p1-b3`'s mass** is built from the film's own unit (the hours field's
   rect at its painted proportions, `--unit-warm`/`--unit-warm-bright`), with
   a seeded generator — deterministic re-renders. Density and brightness fall
   off radially; a sparse halo of strays; a few bright glints, as in the
   field. It reads as *the field, condensed* — nothing else it could be
   mistaken for exists yet.
2. **`p1-b8-b`'s lattice** is the same unit held in exact order (29×17
   columns-by-rows footprint at the forms' scale, elliptical), dissolving at
   its edges — order without an object. Unit scale is raised modestly
   (×1.45), as the unit grammar itself scales units with pitch. It went
   through two brightness passes during composition so it stands at honest
   visual weight beside the photographic forms; both passes are the session's
   own self-audit, before any approval.
3. **`p1-b9`/`p1-b10` land alone.** The forms line speaks of all five forms —
   holding only the last on stage would misweight it, so the morph layer
   hands off fully (recorded, §6.5) and the two lines run as the deck's
   proven sequenced-line pattern (1.02: "each line gets the frame alone";
   1.03: clear-to-black before the title).
4. **Form boxes take the aspect their render arrives in** (the framing rule's
   requirement): the 4:3 forms in 720×540 at P1-F2's center, the one 4:5
   portrait (`single_cowrie`) in 432×540 at the same center and height.

# 4. Files changed

| Commit | Change |
|---|---|
| `d4d2d02` | docs: install the close brief |
| `e8f131c` | review(prologue): the beat-state builders and capture harness |
| `d95425f` | review(prologue): the sheet — 15 cells, index, record |
| `8f16d9a` | review(prologue): the FAST checks green |

Plus this report, the handover update, and the tag `prologue-states`.

**Files changed in `src/`: none.** No deck, engine, scene, slide, style,
proto or manifest file changed. The only tree paths touched are
`review/prologue/` and `docs/`.

# 5. Validation

| Check | Result |
|---|---|
| sheet render | 15 cells at 1920×1080 through the states pipeline, **0 console errors** |
| carried-byte proof | 4/4 hashes identical to the approved frames |
| measured cell checks | **15/15 pass** (`check-cells.json`): corner patches and border ring ≤ 6/255 on every cell (all measured 0.00 — authored black ground holds; nothing reaches the frame edge); content present on every non-black cell; `p1-b0` proven pure black (0 pixels above luminance 6) |
| hold proof | `p2-b2` vs `p2-b1`: **0 differing pixels, max channel delta 0** — the pipeline reproduces the approved frame exactly |
| `npm run build` | clean |
| deck boot smoke | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** |
| visual self-audit | every rendered cell reviewed at full size during composition; the one iteration (C1-B's brightness) is §3's note 2 |
| no accent / no Claim Mark | by construction — no accent token, no `ClaimMark` import, no luminous disc anywhere in the Prologue builders; the only warmth is the dark-field renders' own key and the unit-warm family |

**Not run, and not claimed:** no §1 verification (skipped with §1 — no
per-path smoke, no re-render proofs), no deck-wide suites, no register audit
beyond the per-cell measurements above, no notes review (no notes changed).
FAST defers the global suites to the GATE.

# 6. Flagged, not improvised

1. **THE GATE WORD (§1).** The prompt's word "average" is not the closing
   word "exceptional"; Gate 2 remains open, no closing action was taken, and
   the received path-2 / spend-goods rulings are preserved in §1 for the
   closing micro-session. **Waiting on:** the presenter's recorded word, or
   his explicit instruction to close on the verdict as given.
2. **The P1 beat-map/script discrepancy.** `batch-a-package.md` §1 says 10
   beats; the §2 script advances 11 times. Rendered to the script per the
   close brief; the §1 map still reads 10 and was NOT amended (doc amendments
   to the package are presenter-ruled records, and §4 of the brief bars
   manifest/doc changes beyond flags). **Waiting on:** a one-line ruled
   amendment recording P1 = 11.
3. **The ledger form's study.** The recorded assignment row (manifest §2.2)
   gives `ledger` to "display-scale ledger appearances" and reserves
   `ledger_glow` for Scene 8 — so `p1-b7` renders the `ledger` book. But the
   architecture's P1 summary says "glowing ledger entry," and the script line
   is "it stopped looking like anything at all. Numbers in a ledger" — a
   physical book on that line is arguable. **Waiting on:** his verdict on the
   cell (a redo with `ledger_glow` is one word; the alternative study is
   shipping and gated).
4. **`fiat.png` arrived ungated, in the wrong place.** An untracked
   `assets/dark-field/fiat.png` sits in the shipping set — not in
   `incoming/`, never through the grade gate. Because the register's glob is
   eager, the render is already reaching the deck's fiat position on any dev
   server run from this tree, bypassing the manifest's own law ("off-grade
   imagery never reaches a slide"). This session left the file untracked and
   untouched (it is the presenter's drop, and the brief says nothing here
   waits on it). **Waiting on:** the gate — move to `incoming/` and run
   `ingest-r7-2.cjs`, in whichever session the presenter orders.
5. **Two recorded handoffs** (the brightness floors' one exception, recorded
   here as the rule requires): `p1-b9` — the morph layer recedes fully under
   the forms line; `p1-b10` — the forms line clears for the question line.
   Both follow the deck's proven sequenced-line pattern; both are in the
   cells' captions.
6. **`p1-b1`'s field jitter is a fresh sampling.** The cell reconstructs the
   deck's proven 1.01 build-1 state, but the field's per-unit brightness
   jitter is not seeded, so its texture is this render's own. If his verdict
   lands `approved`, the approved pixels are this file's — the same standing
   every gate-2 cell has.

# 7. Remaining judgment calls — all his

- **C1 — the fifth form:** `p1-b8-a` (the coin, continuous with the physical
  forms, off-argument per V-1) vs `p1-b8-b` (structured light, on-argument,
  quieter than a photograph). The session recommends nothing; the cells
  argue for themselves.
- **Per-cell verdicts on all 15 cells** — the full-coverage rule's per-cell
  review; no bulk approval exists.
- **The gate word** (§1, flag 1).
- The flags 2–4 above, each a one-line ruling.

# 8. The review protocol (the presenter's part)

Open **`review/prologue/states/sheet.html`** on the dev server. Every cell is
examined **at full size** — click the image or its "full size" link — and
receives a per-cell verdict: **approved / approved-with-notes / redo /
select A|B** (the select applies to the one open decision, C1). No bulk
verdicts; an unexamined cell stays unreviewed and blocks motion on its beat.
The four CARRIED cells are already-approved pixels shipping byte-identical —
re-examination is his choice, not a requirement. His verdicts + the C1
selection become the Prologue's approved state set; **his approvals + Gate
2's closure unlock the Batch A implementation brief.**

# 9. Recommended next step

**The presenter returns the Gate 2 word (§1) and the Prologue per-cell
verdicts with the C1 selection** — on both, the closing micro-session records
the gate and the Batch A implementation brief is authored.

---

# 10. GATE 2 IS CLOSED (appended 29 August 2026, same day — the word arrived)

**The presenter corrected the word in-session:** *"Sorry, I meant to write
exceptional. Please close that gate now."* On the corrected word —
***exceptional*** — §1's closing protocol executed exactly as written:

| §1 order | Landed |
|---|---|
| The path selection recorded | `states.json` `rulingsClose` + `approvedSetCurrent`; states report §10 (`8978a24`) |
| Path 2 as the prototype's default | `readPathParam` → 2; the b5 record and the S2→S3 lift follow the selection; retired candidates keep the archived r3 behavior (`e459a4c`) |
| The affected cells re-rendered as the new approved states | `s2-b3-p2` · `s2-b4-p2` · `s2-b5-b-p2` · `s3-b1-p2`, through the states pipeline, beside the retired originals (`025b2b2`) |
| `s4-b2-b2` promoted | `states.json`: ruling `approved`, S4 b2's state; `s4-b2-b` retired |
| r3 flag 1 resolved | `s2-b5-b-p2` — the receded record speaks the absence; **the approved record no longer speaks D3-C anywhere** |
| r3 flag 2 | explicitly deferred per the brief — pool is the ruled default; no work |
| The alternates retired to file | paths 1 (reach) and 3 (flow) runtime-selectable on file; every retired cell kept, resolutions recorded per cell |
| Verification | **proof-close.cjs 9/9 green**: no-param default = path 2; the prototype's settled state at each changed site = its approved cell at **0 differing pixels**, fresh = archived at 0. **Smoke on path 2**: deck boot 45/0 · traversal 19 forward + 19 back · 19 cold entries · reduced-motion parity 19/19 · 0 console errors. `npm run build` clean (`f84fc34`) |
| Tag | **`gate-2-closed`** |

**Gate 2 — the film's signature system, Scenes 2–4, the claim's birth — is
closed on the presenter's recorded word.** The failure language of the film
is the absence: no return line before the birth; the claim as the answer to
a void. Batch A implementation now waits only on the Prologue sheet's
per-cell approvals (§8) and the C1 selection.

---

# 11. The condensation ruling (appended 30 August 2026 — letter B)

The Batch A report flagged the condensation as one of the tensions for the
presenter's eye. His ruling arrived as a letter in the session prompt, and it is
**B**:

> **The condensation lands on a smooth luminous ball that is deliberately *not*
> the mark** — pure-white monochrome per P1's register, no warm tone, no orange
> anywhere near it, a tighter and cooler glow falloff than the ClaimMark's,
> sized per the reopened cell's box. It must read as premium and intentional as
> a still and stay clearly distinct from the Claim Mark at a glance.

**What is reopened, audited rather than assumed.** P1 puts the condensed object
on stage at exactly one build — `_applyBuild` sets it visible at `n === 3` and
nowhere else — so **`p1-b3` is the only affected cell**. No adjacent state shows
the condensed mass before the shell, and the letter changes no other beat.
`p1-b3` is presenter-reopened and superseded by **`p1-b3-ball`**; the retired
cell stays on file under the aesthetic law's file-keeping clause, and
`states.json` carries the ruling (`rulings.condensation`), the retirement and
the amended `approvedSet`.

**What is *not* amended.** Letter B leaves the master's no-anticipation rule
exactly where it was. The freeze-register amendment the brief reserves for
letter A — *"the no-anticipation rule is amended for P1's condensation; the birth
in Scene 3 is a knowing reappearance"* — is **not made**, because under B the
condensation is not the mark. Scene 3's birth remains the first appearance of
both the disc and the accent, and the Prologue stays monochrome plus
photographic warmth.

The object's own parameters, and the measured distance between it and the Claim
Mark, are in the fix session's report.
