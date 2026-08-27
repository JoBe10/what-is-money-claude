# Gate 2 — Motion r2 — Report
## The nineteen approved states, in motion — every settled frame an approved cell, proven per pixel

**Mode: FAST.** Prototype work; scoped verification: the production build, the
deck-boot smoke, the prototype's own 19-beat suite, the landed-state proof,
the carrier-centering proof, and the capture strip. No deck-wide suites — no
deck, engine or manifest file changed.
**Branch:** `film-rebuild`. **Prior tag:** `gate-2-states`. **Tag:** `gate-2-r2`.
**Date:** 27 August 2026

---

# 1. The rulings, recorded first (presenter, 27 August 2026)

Each landed as its own commit before any code:

| Ruling | Where it landed |
|---|---|
| **The per-cell verdicts and the eight D-selections** — the approved state set of 19 cells (S2: b1-a, b2, b3-a, b4-c, b5-b · S3: b1-c, b2, b3, b4/5/6-a, b7-b, b8-a, b9-a · S4: b1-b…b5-b) | `states.json` (`ruling`/`rulingNote` per cell, the `rulings` block); the dated selections record appended to `gate-2-states-report.md` §8 (`0845fc3`) |
| **The ClaimMark carrier-centering fix** — the disc sits centered between the carrier arcs, fully symmetric (from the legacy 4.05 markup) | `slides.css` `.s4-claim-object__disc` (`b8d477d`) — see §3 |
| **D3-C propagates into `s2-b5-b`'s context** (the states report's §3.3: contexts follow the selections) | the builder + a same-pipeline re-render; recorded in `states.json` `contextRerender` (`7f4e0ca`) |

# 2. What runs

`?proto=gate2` runs Scenes 2–4 as one continuous world: **19 beats**
(S2 = 5, S3 = 9, S4 = 5), one advance each, the verbatim §2 scripts as the
notes (mechanically diffed: zero word differences, 5/9/5 advance marks).
`?proto=the-breakthrough` runs Scene 3 alone. The presenter's port 5173 was
never touched; this session ran on 5273.

**The full-coverage rule, made checkable and passed.** Every settled state's
geometry is transcribed from the beat-state builders (`states.mjs`), so all 19
landed states are approved cells by construction — derivation banned, and no
derived state exists. The landed-state proof (`proof-r2.cjs`) then mounted
every build cold and pixel-compared it against its cell rendered through the
same pipeline: **19/19 match with zero differing pixels** (channel tolerance
2/255; `review/gate-2/r2/landed-proof.json`).

**The birth is pool** (R3's default), consuming the language-C substrate and
landing on `s3-b1-c` exactly; condense and collapse stay runtime-selectable
(`?birth=1|2|3`, keys 1/2/3 on Scene 3). The claim's micro-motions are kept
(R5), for live judgment.

# 3. The carrier-centering fix (component-level ruling)

The ClaimObject's grid centering silently top-aligned its disc whenever the
box a slide gave it was shorter than the disc — the 180×72 claim stages of
the legacy 4.05, the carrier stress stage and 4.21 left the disc 16–22px
below the center their shells and roads are authored to. That is what the
presenter's markup saw. The disc now centers absolutely at any box size, and
`carrier-proof.cjs` proves it in DOM geometry: the legacy 4.05 at builds 0
and 3 — disc, stage and shell centers identical — and the Gate 1 sheet's
carrier row centered at **every scale (48/116/176) and every candidate**,
0 console errors. The fixed SAVE frame is `review/gate-2/r2/carrier-fix-4-05-b3.png`.
No Gate 2 state uses the carrier; the ruling protects Act II.

# 4. Motion is argument — the session's craft

1. **The S2 entry (D8's motion half).** Not an apparition but an arrival: a
   warm wash lifts the black across the whole frame and hands its light to
   the two people (they brighten past their key a breath and settle), the
   service path draws itself in one confident stroke, and the six
   capabilities land line by line under the sentences that name them, each
   settling from a touch over its voice. Warm white only — no accent exists
   in Scene 2. Mid-flight: `s2-entry-a/b.png`.
2. **The failure speaks language C in both lunges of b3→b4.** The attempt's
   two lunges draw with dying heads — the first confident and guttering, the
   second shorter, dimmer, gone sooner. The failure gesture gathers what the
   attempt left, fuses and *thickens* it (commitment), then pushes across
   the corridor with the stroke visibly thinning, the pace easing off as the
   light runs out, the head narrowing until it gutters out short of
   arriving. No break, no recoil — depletion.
3. **The birth consumes the thinning path.** The S2→S3 morph releases the
   statement, returns both people to full presence at the birth frame, and
   lifts the receded thin spans into the corridor as the unresolved half —
   still speaking C, still dying leftward. The pool drinks it: droplets of
   light leave the dimming husk, pool into a formless warm glow, and the
   disc's form crystallizes out of the light — edge, gradient, accent, in
   that order. The settle is `s3-b1-c` exactly.
4. **The interval, three advances (R1, D6-A).** Each name lands at full
   voice on its own advance and demotes its predecessor — the landing takes
   the frame, the older word steps back as the new one arrives.
5. **The completion, two phases in one frame (D5-B).** The words hand the
   frame down; the claim *departs* — it leaves the hold and travels out
   along the interval, its wake stretching from its tail — and while it is
   still mid-flight the shoes *arrive* from beyond the far edge, moving the
   other way, their own wake reaching back. Two events, opposite directions,
   overlapping in time, never within reach of each other — the claim cannot
   read as becoming the shoe because both are on stage at once, traveling.
   The frame freezes mid-story on the approved cell exactly; the reset melts
   the freeze — the shoes slip back, the claim returns to hand, the line
   re-opens, the words return. Mid-flight: `s3-b7-two-phase-a/b.png`.
6. **Beat 9 hands off before it speaks (D4-A).** The world — surgeon, words,
   line — recedes past the floor to effectively clean black first (a
   recorded layer handoff; the claim alone keeps full voice), and only then
   does the pair land.
7. **Scene 4 entirely in system B's grammar (D7-B).** The S3→S4 morph keeps
   the claim unbroken: the last tenth of the world dissolves as the question
   generalizes, the claim rises to the fork's apex, and the two mirrored
   roads draw *out of it*, named at their destinations. SPEND: the claim
   travels the left road's own geometry — corner by corner, the road
   brightening under its use, the save road dormant — and closes into the
   terminal, redeemed; the goods stand up at the road's end. The reset
   re-poses the fork, the spend road subdued by its own telling. SAVE: the
   names yield to the act; the claim takes the right road and *rests* on it
   — the terminal dissolves and the road draws on past the claim into time
   it cannot see. The pair lands as the roads settle to the floor.

# 5. Scene contract and rasterization

The r1 structure stands: three linked modules, one shared stage on the
engine's continuity group, applyState as the single state law. Direct entry
at all 19 builds, backward traversal across both boundaries, reduced-motion
parity byte-compared, full teardown.

Three rasterization corrections keep every settled frame identical to its
cell (found by the proof, not by eye): the mark wrapper blockifies its
ClaimMark child (inline layout added descender space and sat the disc 3px
high); text voices live in the color alpha exactly as the cells write them
(element opacity below 1 forces a grayscale-AA compositing group); and the
scratch route releases the deck canvas's `will-change: transform` hint while
mounted — the hint forced grayscale text antialiasing where the cells
rasterize subpixel. The last is runtime-only, restored on teardown, and
touches no engine file; the deck never mounts this module.

# 6. Files changed

| Commit | Change |
|---|---|
| `fcf3c8f` | docs: install the r2 brief |
| `0845fc3` | review(gate-2): the per-cell rulings recorded (states.json + report §8) |
| `b8d477d` | fix(claim): the carrier-centering ruling + proof |
| `7f4e0ca` | review(gate-2): D3-C propagated into s2-b5-b (same-pipeline re-render) |
| `3e6366e` | proto(gate-2): r2 — the nineteen approved states, in motion |
| `3c524ac` | review(gate-2): the smoke walks 19 beats |
| `e6a7245` | review(gate-2): the landed-state proof — 19/19, per pixel |
| `bcbc47e` | proto(gate-2): the entry's light falls on the scene, not behind it |
| `c086e58` | review(gate-2): the r2 capture strip |

Plus this report, the handover update, and the tag `gate-2-r2`.

**Files changed in `src/`:** `src/proto/gate-2/` (the five prototype files)
and one rule in `src/styles/slides.css` (`.s4-claim-object__disc` — the
presenter-ordered carrier fix; the only deck-visible change, proven centered
at every scale). **No engine, deck-manifest, scene or slide file changed**;
the deck's 45 slides boot with 0 console errors.

# 7. Validation

| Check | Result |
|---|---|
| `npm run build` | clean (run after every milestone and at completion) |
| deck boot smoke | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** |
| forward traversal | all **19** states, exact beat order |
| backward traversal | all 19 in reverse; boundaries restore the outgoing scene's end state |
| direct entry | every one of the 19 builds mounted cold via the engine's own deep-link path |
| reduced-motion parity | **19/19 serialized stage states byte-identical** to motion-on |
| **landed-state proof** | **19/19 settled states = their approved cells, 0 differing pixels** (tolerance 2/255) |
| carrier-centering proof | legacy 4.05 b0+b3 and the Gate 1 carrier row at 48/116/176 × 3 candidates: all centered |
| verbatim scripts | S2/S3/S4 notes mechanically diffed against the package — zero word differences, 5/9/5 `[→]` |
| capture strip | 19 settled beats + pool birth ×2 + S2 entry ×2 + S3 b7 two-phase ×2 → `review/gate-2/r2/` |
| console | **0 errors** across every run |

**Not run, and not claimed:** no deck-wide traversal or direct-entry matrix,
no register/brightness/composition audits, no second-window notes check, no
recording-size visual review. FAST defers those to the GATE.

# 8. Flagged, not improvised

1. **`s2-b5-b`'s context re-render awaits the presenter's eye.** The
   selected D4-B cell carried the sheet's D3-A baseline in its receded
   failure; the film-wide D3-C ruling propagated into it per the recorded
   context-follows protocol (states report §3.3), one word in the builder,
   re-rendered through the same pipeline. He judges it at the live review;
   the prior render stays in git history.
2. **`s4-b2-b`'s archived PNG is a capture-timing artifact.** The states
   session screenshotted the cell while the three goods were at ~97% of the
   register's 520ms reveal (max channel delta 38). The fresh same-pipeline
   render — the builder's true settle — is what the proof compares against;
   the other 18 archived cells re-render at zero difference. Disclosed, not
   silently reconciled; his eye at the live review is the arbiter.
3. **The pre-birth substrate is motion-only session craft.** The gathered
   unresolved half (the C-speaking spans the birth consumes) appears only
   mid-gesture; no settled state shows it, so no cell governs it. Its
   design — the failure's spans risen and gathered, still thinning — is this
   session's, judged live.
4. **The deck-wide text-antialiasing question is deferred to the GATE.** The
   deck canvas's `will-change` hint renders all deck text grayscale-AA; the
   approved cells (and now the prototype) rasterize subpixel. When the film's
   scenes ship into the deck, the batches will face the same choice this
   prototype faced. Left for the GATE — not this session's scope.
5. **Further S2 temperature work beyond entry motion** (a regenerated patient
   photograph) remains the presenter's own generation, per the states
   report's D8 scope note.

# 9. Remaining judgment calls — all his, live

- The S2 entry's temperature (the wash's warmth, the pacing of the landings).
- The pool birth in context, at the end of the S2→S3 morph.
- The micro-motions (R5): the claim's first-breath pulse and the release
  breath — keep or cut.
- The two-phase freeze's character (how the demonstration holds mid-story).
- The S3→S4 morph as played.
- The whole against the original gate brief's §6 bar.

# 10. The review that follows (the protocol, per the brief's §6)

The presenter reviews r2 **live, as a viewer** — `?proto=gate2` on his own
dev server, beat by beat, **forward and backward, motion-on and
reduced-motion** — judging: the S2 entry's temperature, the pool birth in
context, the micro-motions (keep or cut), the S3→S4 morph, and the whole
against the §6 bar of the original gate brief. His notes drive r3 if needed.
**The gate closes only on his recorded word: *exceptional*.**

# 11. Recommended next step

**The presenter runs `?proto=gate2` and reviews r2 live as a viewer**, per
§10, and returns his notes (screenshots where a frame is wrong) or the word
that closes the gate.
