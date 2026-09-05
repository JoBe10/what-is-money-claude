# Gate 2 — Motion r3 — Report
## The return path's failure language, rebuilt as three live candidates · the spend goods contained

**Mode: FAST.** Two targets only; scoped verification: the production build,
the per-path smoke (deck boot, traversal, direct entry, reduced-motion
parity), the r3 landed-state proof, and the capture strips. No deck-wide
suites — no engine, deck, manifest or script file changed.
**Branch:** `film-rebuild`. **Prior tag:** `gate-2-r2`. **Tag:** `gate-2-r3`.
**Date:** 28 August 2026

---

# 1. The rulings, recorded first (presenter, 28 August 2026)

Each landed as its own commit before any code:

| Ruling | Where it landed |
|---|---|
| **D3-C is rejected in motion** — the gapped attempt, the stepped thinning and the faded remnant read as rendering defects live. Reopened: `s2-b3-a`'s path element, `s2-b4-c`, `s3-b1`'s remnant — the path element only; the compositions around them stand | `states.json` (per-cell `reopened` blocks + the `rulingsR3` record); states report §9.1 (`db4e0c9`) |
| **`s4-b2-b`'s goods layout reopened with the containment markup** — too large, reaching into the frame's center | `states.json`; states report §9.2 (`0d5d190`) |
| **R5 closed** (micro-motions kept) and **D8 closed** (the S2 entry accepted, the temperature concern resolved), by absence of objection; the gate remains open | `states.json`; states report §9.3–9.4 (`911d0d5`) |

# 2. Task 1 — the three failure languages, runtime-selectable

`?proto=gate2&path=1|2|3` (names `reach`/`absence`/`flow` also accepted;
without the param the prototype runs path=1). Each candidate is one
consistent system across its three sites — S2 b3 (the attempt), S2 b4 (the
failure), S3 b1 (what remains, and what the pool birth consumes) — and obeys
the binding principle: **no degraded stroke ever appears in a settled
frame.** No gaps, no stepped fades, no thinning, anywhere, at any settle.

- **path=1 — THE REACH.** The stroke is always clean and full-weight. In
  motion it extends from the patient's edge, decelerates, halts short of the
  surgeon, holds a breath, and withdraws part of the way — failure carried
  entirely by the gesture. Settled frames show a whole short stroke with a
  terminal dot at its honest end, and authored black between it and the
  surgeon. At b4 the reach is longer (to x 880) and the retreat deeper (the
  settled stroke is *shorter* than b3's — the harder try ends more
  defeated). At S3 b1 the same clean short stroke is the remnant; the pool
  drinks it from its near end — droplets cross into the pool as the stroke
  shortens, full-weight to the last: absence grows, the line never degrades.
- **path=2 — THE ABSENCE.** No return line ever exists. The service path
  stays whole (the delivered half stays on record) and the return direction
  is only the terminal dot at the patient's edge, which brightens, strains
  toward the surgeon — its light leaning into the corridor and dying — and
  subsides; harder at b4, settling dimmer (0.55 → 0.4). At S3 b1 the birth
  restages: the settled remnant area holds only the dot, and the pool
  gathers from this absence — three strains, each one's light crossing the
  void to feed it, the dot subsiding spent. The claim as the answer to a
  void.
- **path=3 — THE FLOW.** The attempt is a faint warm stream in the pool's
  family (warm white — no accent exists before the birth): a soft leading
  light flows from the patient toward the surgeon, stalls, and disperses
  short of arrival, the stream's body stretching behind it. Settled frames
  show only a dim residual drift — a medium that is not a line. At b4 the
  surge pushes further and what remains is longer and dimmer. At S3 b1 the
  pool drinks the residue; what remains settles back near the patient's
  edge.

The presenter selects live; nothing here is a session selection. Reduced
motion reaches every settled state instantly and identically (the parity
proof serializes the new elements — the reach's terminal dot, the flow's
drift — alongside everything else). The statement beat (b5) and all other
beats are untouched by all three — proven per §5.

**Mechanics.** The stage reads `path` once at construction and builds its
state table from it; the three sites' settled states are declarative
per-candidate entries, everything else byte-identical to r2's table.
`applyState` remains the single state law, so direct entry, backward
movement, jumps and reduced motion all resolve per candidate with no special
cases. The S2→S3 morph lifts the b5 record and *becomes* the candidate's
substrate (fusing it into the clean stroke / draining it home into the dot /
dissolving it into the drift); the pool birth then consumes that substrate
in the candidate's own terms.

# 3. Task 2 — the spend goods, contained

The direct markup, no candidates: the shoe, steak and wine render at a
reduced uniform scale (188×141 — 62.7% of the reopened layout), arranged as
a compact triangle in the spend terminal's zone — every right edge at
x ≤ 600, wholly inside the frame's left third, never crossing toward center.
The triangle echoes the S2 cluster's own pose (shoe and meal above, wine
below-center): the goods that hung as possibilities at the surgeon's side
land in the same relative arrangement at the road's end, now real. The
legacy `ref-4-05-b2` was studied for its containment and modesty — goods
subordinate to the road — not its geometry. The claim's travel and
redemption motion are unchanged (the reveal simply lands on the new rects).

Re-rendered through the states pipeline as
`review/gate-2/states/s4-b2-b2.png` beside the reopened original
(`render-cell.cjs`, the single-cell path of the states capture), recorded in
`states.json` as `awaiting-verdict`.

# 4. The zero-pixel proof (§4 of the brief, made checkable)

`proof-r3.cjs` mounted every **non-target beat** cold — all 15 beats outside
the four reopened sites — under **every** path value, and pixel-compared
each against r2's approved render of the same beat (`review/gate-2/r2/`,
itself proven equal to the approved cells at r2). It then compared the
prototype's settled S4 b2 (under every path — Scene 4 must not see the path
selection) against a fresh same-pipeline render of `s4-b2-b2`, and that
fresh render against the archived PNG.

**49/49 comparisons at zero differing pixels, max channel delta 0, console
clean** (`review/gate-2/r3/landed-proof-r3.json`). Everything else changes
zero pixels — literally.

# 5. Files changed

| Commit | Change |
|---|---|
| `c8f81f1` | docs: install the r3 brief |
| `db4e0c9` | review(gate-2): the r3 ruling recorded — D3-C rejected in motion, three path elements reopened |
| `0d5d190` | review(gate-2): the r3 ruling recorded — s4-b2-b reopened with the containment markup |
| `911d0d5` | review(gate-2): the r3 ruling recorded — R5 and D8 closed from the live review |
| `f6d6bcf` | proto(gate-2): the three failure languages, runtime-selectable (path=1\|2\|3) |
| `d00c6f5` | proto(gate-2): the spend goods contained (presenter markup) |
| `515a1de` | review(gate-2): s4-b2-b2 rendered through the states pipeline |
| `47d0ee7` | review(gate-2): the r3 landed-state proof — zero pixels on every non-target beat, all three paths |
| `f24cbb1` | review(gate-2): the smoke walks 19 beats under every path candidate |
| `c34bd77` | review(gate-2): the r3 capture strips |

Plus this report, the handover update, and the tag `gate-2-r3`.

**Files changed in `src/`:** `src/proto/gate-2/` only (`_stage.js`,
`_birth.js`, `s2-the-direct-exchange.js`, `s3-the-breakthrough.js`,
`s4-spend-or-save.js`). **No engine, deck-manifest, scene, slide or style
file changed**; the deck's 45 slides boot with 0 console errors (verified
three times, once per path run).

# 6. Validation

| Check | Result |
|---|---|
| `npm run build` | clean (run after every milestone and at completion) |
| deck boot smoke | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** — ×3 (per path) |
| forward traversal | all **19** states in exact beat order — per path value (×3) |
| backward traversal | all 19 in reverse, boundaries restoring the outgoing scene's end state — ×3 |
| direct entry | every one of the 19 builds mounted cold via the engine's deep-link path — ×3 |
| reduced-motion parity | **19/19 serialized stage states byte-identical** to motion-on — ×3 |
| **zero-pixel proof** | **49/49 comparisons, 0 differing pixels, max delta 0**: 15 non-target beats × 3 paths vs r2's approved renders; S4 b2 = `s4-b2-b2` under every path; fresh cell = archived cell |
| capture strips | 6 frames per candidate (b3/b4/S3 b1, settled + mid-gesture) × 3 + the contained `s4-b2` settled + the redemption mid-gesture → `review/gate-2/r3/` (`strip.html`/`strip.png`) |
| console | **0 errors** across every run (proof, smoke ×3, captures) |

**Not run, and not claimed:** no deck-wide traversal or direct-entry matrix,
no register/brightness/composition audits, no second-window notes check, no
recording-size visual review. Notes are untouched from r2 (zero word
changes). FAST defers the global suites to the GATE.

# 7. Flagged, not improvised

1. **`s2-b5-b`'s settled record still speaks D3-C under all three
   candidates.** The cell is not reopened and the zero-pixel law binds it,
   so the b4→b5 gesture crossfades the candidate's failure element into the
   approved receded record, and the settle is the approved cell exactly.
   Per the recorded context-follows protocol (states report §3.3), the b5
   context follows the presenter's path selection at the gate close — the
   closing micro-session re-renders it in the selected language.
2. **The banked birth alternates are not per-candidate authored.** Pool —
   the ruled default — is fully authored per candidate. Collapse
   (`?birth=1`) and condense (`?birth=2`) clear whatever substrate the
   selected candidate assembled and play their own seed geometry; under
   path=2's absence, condense's whole line materializing from nothing
   contradicts that candidate's premise. They remain selectable per the
   file-keeping clause; coherence work waits on the gate-close selection —
   doing it for three candidates × two banked treatments now would be
   speculative.
3. **The wine render's faint lighter ground** is visible around the
   contained wine exactly as in the reopened original — it is the raster's
   own dark field, untouched by this session (the markup only scales and
   places the same renders). His eye at the live review is the arbiter.
4. **No `?path` default was ruled.** The brief names only the three values;
   the prototype runs path=1 when the param is absent. This is a mechanical
   fallback, not a session selection — the review protocol has him pass
   each value explicitly.
5. **`sheet.html` was not regenerated.** `s4-b2-b2.png` sits beside the
   reopened original in `review/gate-2/states/` and is recorded in
   `states.json`; regenerating the whole sheet would re-render 42 archived
   cells for a one-cell addition. The r3 strip is the review surface for
   this state.

# 8. Remaining judgment calls — all his, live

- **The path selection** — reach, absence, or flow (`path=1|2|3`), judged at
  all three sites, forward and backward, motion-on and reduced-motion.
- **The contained spend goods** — the s4-b2-b2 markup implementation.
- The r2 flags that remain open: the `s2-b5-b` context re-render (now also
  carrying flag 7.1 above) and the deck-wide text-antialiasing question
  (deferred to the GATE).
- **The word that closes the gate.**

# 9. The review that follows (the protocol, per the brief's §6)

The presenter runs `?proto=gate2&path=1`, `=2`, and `=3` live on his own dev
server — forward and backward, motion-on and reduced-motion — and returns:
**his path selection**, **his verdict on the contained spend goods**, and —
if it is now truly there — **the word that closes the gate: *exceptional*.**
On the word: a closing FAST micro-session records the path selection,
re-renders the affected cells as the new approved states (including
`s2-b5-b`'s context, per the context-follows protocol), retires the
alternates to file, and tags `gate-2-closed`.

# 10. Recommended next step

**The presenter runs the three path values live per §9** and returns his
selection, his spend-goods verdict, and — if earned — the word.
