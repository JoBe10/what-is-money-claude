# Prototype Gate 2 — r1 — Report
## Scenes 2–4 animated in the scratch route: the exchange, the birth, the fork

**Mode: FAST.** Scoped verification: production build, deck-boot smoke, and the
prototype's own suite (17-state traversal both directions, cold entry at every
build, mechanical reduced-motion parity, capture strip). No deck-wide suites —
no deck, engine or manifest file changed.
**Branch:** `film-rebuild`. **Prior tag:** `batch-a-selections`. **Tag:** `gate-2-r1`.
**Date:** 25 August 2026

---

# 1. What runs

`?proto=gate2` on the dev server runs Scenes 2–4 as one continuous world:
**17 beats** (S2 = 5, S3 = 7, S4 = 5), each exactly one advance, with the
verbatim §2 scripts as the notes (`n`), `[→]`-aligned. `?proto=the-breakthrough`
runs Scene 3 alone. The presenter's port 5173 was never touched; this session
ran its own server on 5273.

**The birth is selectable at runtime, and the selection is the presenter's:**
`?birth=1|2|3` (or `collapse|condense|pool`), or keys **1/2/3** while Scene 3
is on stage — pressing one on the birth beat replays the gesture in that
treatment on the spot. The default without a parameter is 1, and it is only a
default.

| # | Treatment | Character |
|---|---|---|
| 1 | **collapse** | The path shatters; its fragments accelerate inward; the disc snaps into being at the impact, with a breath of overshoot. Gravitational, sudden. |
| 2 | **condense** | The path never breaks: it flows along its own length into the point, brightening as it shortens, and the disc inflates in proportion to what it swallows. Continuous, inevitable. |
| 3 | **pool** | The path's light drains out as droplets that pool into a formless warm glow; the disc's form crystallizes out of the light afterward. Liquid, quiet. |

All three land on `s3-f1-final`'s exact composition. **Orange enters the film
inside this gesture and nowhere earlier:** the substrate — path, shards,
droplets, pool — is warm white; the accent arrives with the disc itself. Before
the birth beat no accent-colored element is on stage in these scenes.

# 2. Structure — the session's two craft calls

1. **Three linked modules in one scene group** (`the-direct-exchange`,
   `the-breakthrough`, `spend-or-save`), sharing a single stage object across
   the engine's real within-group handoff. Chosen over one 17-build module
   because it proves the morph with the mechanism the film will actually use —
   the engine's continuity groups — and keeps each scene's notes its own
   verbatim script.
2. **Scene 3 → 4 is a morph, not an authored clear-to-black** (the brief left
   this to the session). The fork is a question about the claim the viewer is
   already watching — "every claim you ever hold" — so the claim never blinks:
   the surgeon dissolves as the question generalizes, the interval line
   persists, and the fork's names land over the held claim. The presenter
   judges this in review; an authored black remains buildable in an iteration
   if his eye rules otherwise.

Both scene boundaries reverse correctly: backward across a boundary
reconstructs the outgoing scene's end state instantly (the engine's
jump-to-end handoff).

# 3. The stills hold — landed states vs the approved set

The geometry was transcribed from `review/frames-a/harness/frames-a.mjs` — the
code that rendered the approved stills — so the six approved compositions are
landed states by construction, and the capture strip confirms them by eye:

| Beat | Landed state |
|---|---|
| S2 beat 2 | **s2-f1-final**, exactly |
| S2 beat 4 | **s2-f2**, exactly |
| S3 beat 1 | **s3-f1-final**, exactly |
| S3 beats 4 and 6 | **s3-f2-a**, exactly |
| S4 beat 2 | **s4-f1**, exactly |
| S4 beat 5 | **s4-f2-a**, exactly |

**Derived compositions** (no approved still exists; derived from the nearest
approved frame's system, per the brief §2.1 — each is a candidate for the
presenter's notes):

1. **S2 beat 1** — s2-f1-final minus the capabilities list.
2. **S2 beat 3** — s2-f2's system with the return path still attempting: the
   first two approved fragments as the probe-so-far, plus its dot terminal.
3. **S2 beat 5** — the binding line at display scale (46px, the closing-pair
   register), the failure frame receded to the 55% floor beneath it. The copy
   is the script's own clause: *"It binds both halves of the trade to the same
   two people."*
4. **S3 beat 2** — s3-f1-final with the contraction complete (stream absorbed).
5. **S3 beat 3** — beat 2 minus the patient.
6. **S3 beat 5** — the demonstration's end: shoe render (s2-f2's box size) in
   the held claim's place, from s4-f1's goods-arrived system.
7. **S3 beat 7** — s3-f2-a receded to the floor beneath the pair *"Money
   separates the two halves of an exchange." / "The exchange can remain
   unfinished."* — the claim, outside the receded layer, holds full voice.
8. **S4 beat 1** — the fork: s3-f2-a's held claim and line, SPEND and SAVE in
   s4-f1's kicker register, mirrored around center.
9. **S4 beat 3** — the held claim and line restored, SAVE alone at the
   kicker's approved center position.
10. **S4 beat 4** — s4-f2-a minus the closing pair.

# 4. Flagged, not improvised

1. **The interval's three lines land inside one advance.** The brief §3 says
   SOMEONE ELSE / SOMEWHERE ELSE / LATER are "each its own advance," but the
   binding beat map (S3 = 7) and the verbatim script (one `[→]` for the whole
   interval beat) cannot accommodate three advances. The beat count is law, so
   r1 lands the three lines sequentially *within* beat 4, timed to the spoken
   rhythm, each landing at full voice and demoting its predecessor — settling
   exactly on s3-f2-a. This brushes the pacing rule (sequential copy inside
   one gesture). **Presenter ruling requested:** keep the one-advance interval,
   or split it into three advances — which would change S3's beat count and
   put two `[→]` marks inside the script's fourth paragraph, his call only.
2. **The capabilities are spoken in beat 1 but build in beat 2.** The script
   names the six capabilities in S2's first paragraph; the binding beat map
   places "capabilities (one accumulating build)" at beat 2. r1 follows the
   beat map. If the presenter wants the list accumulating under the words that
   name it, it moves into beat 1's entry gesture in r2.
3. **The patient's register flap.** Approved stills have the patient
   photographic in s2-f1-final, a receded line glyph in s2-f2, and photographic
   again in s3-f1-final. Motion plays this as: the patient recedes to a
   presence when the frame turns to the surgeon's wants (beat 3), and returns
   to a person for the birth — the claim is about to detach *from him*. It is
   the only reading that connects the approved stills without editing them;
   whether the flap reads as intended is his eye's call.
4. **The two statement frames sit over the receded surgeon** (S2 beat 5, S3
   beat 7). The statement band (y 790–872, s4-f2-a's) overlaps the dim
   surgeon's lower region at the left edge of the centered line. Legible —
   the receded pixels are near-black — but it is a derived placement.
5. **The package's S2/S3 apostrophes.** `batch-a-package.md` §2 sets S2 and S3
   with straight apostrophes ("let's"), against the script standard's
   typographic mandate (master §3.5, §7); S4 is typographic. The notes are
   installed word-for-word with typographic apostrophes throughout. Zero word
   differs — verified mechanically against the package. Flagged so the
   presenter knows the source is inconsistent, not the install.
6. **Small settle motions on the claim** — a micro-pulse as the contraction
   completes (S3 beat 2) and one brightness breath as the patient detaches
   (beat 3). Read here as story events (the claim's first breath; the tie
   dissolving); if the presenter's eye says decoration, they are one line each
   to delete.
7. **The birth-treatment ruling is required before the gate can close** (brief
   §4). r1 defaults to treatment 1 only because a default must exist.

# 5. Engine limitations encountered

**None.** The scratch route, continuity groups, per-build restoration,
reduced-motion handling and notes overlay expressed everything the scenes
needed. No engine, deck, or manifest file was touched.

# 6. Files changed

| Commit | Change |
|---|---|
| `8a567a9` | docs: install the Gate 2 brief |
| `ce45020` | proto(gate-2): the shared stage and the scene contract |
| `5b956d4` | proto(gate-2): the three birth treatments |
| `bed8523` | proto(gate-2): the three scenes + registry entry |
| `072c80d` | proto(gate-2): history-independent reconstruction |
| `60df9fd` | review(gate-2): the smoke and capture harness |
| `7d86684` | review(gate-2): the r1 per-beat strip |

Plus this report and the handover update, and the tag `gate-2-r1`.

**`src/` changes:** `src/proto/gate-2/` (five new files) and
`src/proto/registry.js` (the three entries). **No file in `src/scenes/`, no
engine, deck, slide or style file changed** — the deck's 45 slides are
byte-identical in behavior, and the boot smoke proves it.

# 7. Validation

| Check | Result |
|---|---|
| `npm run build` | clean (run after every milestone and at completion) |
| deck boot smoke (Playwright, port 5273) | **45 slides**, first `1-01-eighty-thousand-hours`, **0 console errors** |
| forward traversal | all **17** states, exact beat order |
| backward traversal | all 17 in reverse, boundaries restore the prior scene's end state |
| direct entry | every one of the 17 builds mounted cold via the engine's own deep-link path; each lands on its exact settled state |
| reduced-motion parity | **17/17 serialized stage states byte-identical** to the motion-on settled states (mechanical comparison, not by eye) |
| console | **0 errors** across every run |
| capture strip | 17 settled beats + 3 birth treatments × 2 mid-gesture frames → `review/gate-2/r1/` (`strip.png`, `strip.html`, `beats.json`) |
| approved-still match | the six approved landed states reviewed at full 1920×1080 against the approved frames |
| verbatim scripts | S2/S3/S4 notes mechanically diffed against `batch-a-package.md` §2 — zero word differences (§4.5 covers the apostrophe glyphs) |
| self-reference gate | no banned phrase in the prototype's visible text or notes |

**Not run, and not claimed:** no deck-wide traversal or direct-entry matrix, no
register/brightness/composition audits, no second-window notes check, no
recording-size visual review. FAST guarantees those globally at the next GATE.
The archived R3/R4 harness breakage noted at Stage 0 still stands for that GATE.

# 8. Self-audit against the §6 bar

1. **Motion is argument** — every gesture is a story event: the path failing
   in two lunges and breaking, the birth, the release, the interval opening
   line by line, the claim traveling and the road closing behind it, the
   interval stretching into black. The two smallest motions are named in §4.6
   for the presenter's knife.
2. **Retelling test** — my judgment is that a cold viewer of these three
   scenes retells *money lets an exchange stay open*; the judgment that
   counts is his, as a viewer.
3. **The birth as the defining moment** — three genuinely distinct candidates;
   whether one of them reads as film-defining is exactly what the gate's
   ruling decides.
4. **The stills hold** — the six approved compositions are landed states by
   construction; pausing on any derived beat yields a frame built from the
   approved system (floors, display rule, settle budgets, one idea per frame).
5. **Pacing is authored** — nothing auto-advances across spoken lines;
   auto-timing lives only inside single gestures. The one tension is §4.1,
   flagged rather than resolved.

# 9. Remaining judgment calls

- **The birth treatment** — the required ruling (§4.7).
- The derived compositions (§3) and the flags of §4, all his viewer's notes.
- The S3→S4 morph-vs-black craft call (§2.2) — judged in review.
- Deferred to the GATE by this FAST run: everything in §7's not-run list.

# 10. Recommended next step

**The presenter reviews r1 as a viewer** — `?proto=gate2` on his own dev
server, beat by beat, forward and backward, motion-on and reduced-motion, keys
1/2/3 on the birth beat — and returns notes, screenshots where a frame is
wrong, and his birth-treatment selection. Iterations tag `gate-2-r2`, `-r3`, …
until his recorded word is *exceptional*.
