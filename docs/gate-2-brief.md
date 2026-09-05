# Prototype Gate 2 — The Signature System
## Scenes 2–4 animated in the scratch route: the exchange, the birth, the fork

**Mode: FAST** (scoped verification; this is a prototype session, not a batch).
**Model: Fable 5, top effort. Fresh CLI session.**
**Branch:** `film-rebuild`. **Prior tag:** `batch-a-selections`. **Tag on completion:** `gate-2-r1` (iterations tag `gate-2-r2`, `-r3`, … as they land).
**First step:** commit this brief as `docs/gate-2-brief.md` if it is not already in the repository.
**Standing law applies in full:** commit granularity (AGENTS.md §4.1), the aesthetic law (§4.3), the no-invention rule (§4.4), the scene module contract (master §8.1), the compositional standard (master §5), the registers (master §6), the script standard (master §7).
**Read before writing any code:** `docs/synthesis-architecture.md` (Scenes 2–4), `docs/what-is-money-master.md` §3.5, §5–§8, `docs/batch-a-package.md` §1–§2, `docs/icon-grammar.md`, `src/scenes/README.md`, `src/proto/registry.js`, and the approved stills in `review/frames-a/frames/` (`frames.json` marks the approved set).

---

# 1. What this gate is

The architecture's process law names five prototype gates. This is the second, and it is the one the whole film hangs on:

> **(2) Scenes 2–4 in a scratch route — the signature system, not proceeding until exceptional.**

These three scenes are where the film's grammar is established: one continuous visual world in which an exchange opens, fails to close, gives birth to the Claim Mark, and forks into spend-or-save. Every later scene inherits the language built here. The gate exists so that this language is made exceptional in a scratch route, at prototype cost, before a single deck scene is implemented.

**The exit criterion is the presenter's word, and only his.** He reviews as a viewer — running the prototype himself, advancing beat by beat — and the gate closes when he says the word *exceptional*, recorded in the report of the closing iteration. Until then, iterations continue. Do not soften this into "good enough to proceed."

# 2. Binding inputs — nothing here is this session's choice

1. **The approved stills are law.** The nine approved frames (per `review/frames-a/frames/frames.json`, including `s2-f1-final.png` and `s3-f1-final.png`) define the key states of these scenes: their compositions are states the motion must land on, exactly. Motion connects approved stills; it does not reinterpret them. Where a beat has no approved still, its composition is derived from the nearest approved frame's system and flagged in the report as derived.
2. **The scripts are verbatim** from `docs/batch-a-package.md` §2 — S2, S3, S4 installed word for word as the prototype's notes. The beat maps in §1 are binding: **S2 = 5 beats, S3 = 7, S4 = 5.** One `[→]` per advance; the advance that leaves a scene belongs to the next scene's script.
3. **The Claim Mark is candidate A**, rendered through the `ClaimMark` component with the recorded selection — one object, one API, film-wide. Do not fork a local variant.
4. **The register assignments are recorded** in `docs/dark-field-manifest.md`: surgeon, patient, shoe, steak, wine are dark-field renders at display scale; paths, intervals, and labels are line grammar. Dark-field never enters a diagram; glyphs never carry a sensory beat at display scale.

# 3. The three scenes — what must be true in motion

**One world, two cuts at most.** Scenes 2→3 share the stage (surgeon, patient, the drawn paths persist and transform) — this is a morph, not a cut, because the idea persists. Scene 3→4 keeps the held claim as the through-object; whether it plays as a morph or an authored clear-to-black around the fork is a craft decision this session makes and the presenter judges. Navigation never manufactures black (master §3.5); black appears only where authored.

**Scene 2 — The Direct Exchange (5 beats).** The stage assembles: surgeon left, service path drawn, capabilities accumulate as one building list; patient receives. The return path attempts — wanted goods (shoe, steak, wine) appear as dim possibilities — and fails. The failure must be *felt* motion, not a label change: the return path visibly cannot resolve. Binding line lands per the display rule.

**Scene 3 — The Breakthrough (7 beats).** The heart of the film. The unresolved return path **contracts into the Claim Mark** — its birth, formed from the exchange itself, landing on `s3-f1-final.png`'s exact composition. The patient exits (beat 3): his departure must read as *release*, not deletion — the claim detached from him. The interval expands: SOMEONE ELSE / SOMEWHERE ELSE / LATER, sequential, each its own advance. The completion demonstration travels and returns; the reset returns to the held claim. Separation and unfinished lines land per the display rule.

**Scene 4 — Spend or Save (5 beats).** The fork named; SPEND plays out (claim travels, goods arrive, claim gone) and resets; SAVE holds (claim held, the interval extending into black); the closing pair lands.

**Orange enters the film here.** The accent's first appearance in the entire film is the Claim Mark's birth in Scene 3. **Before that beat, no accent-colored element may be on stage in these scenes.** After it, the accent marks the claim and nothing decorative. This is a film-defining rule; treat a violation as a defect.

# 4. The birth gesture — motion candidates, presenter selects

The contraction-into-the-mark is the film's signature moment, and motion is aesthetic territory the stills could not settle. Per the aesthetic law, it does not ship on self-selection:

- Build **two or three genuinely distinct motion treatments** of the birth (S3 beat 1) — distinct in character, not in easing minutiae: e.g. the path's fragments *collapsing inward* versus the path *condensing along its own length* versus light *pooling* at a point before the disc resolves. Each treatment is selectable at runtime (`?proto=s3&birth=1|2|3` or equivalent) and each lands on the same approved final composition.
- Everything else in the three scenes ships as this session's best craft, subject to the presenter's viewer notes in iteration. Do not multiply variants beyond the birth — the review loop is the selection mechanism for the rest.
- Record the selection point in the report: the presenter's birth-treatment choice is a required ruling before the gate can close.

# 5. Technical requirements

- **Scratch route only.** Register the prototype(s) in `src/proto/registry.js`; run via `?proto=`. **No files in `src/scenes/`, no deck manifest changes, no engine changes** — the deck's 45 slides must be byte-identical in behavior. If the engine genuinely cannot express something the scenes need, stop and flag it; do not patch the engine in this session.
- **The full scene contract applies to prototypes** (master §8.1): `_applyBuild(n)` reconstructs complete state; direct entry at every build renders identically to advancing; backward movement correct; reduced-motion parity — every animation's end state reached instantly and identically; deterministic init, tolerant re-entry, full cleanup; no leaked timelines or listeners.
- Whether Scenes 2–4 are one prototype module with 17 builds or three linked modules is the session's call — judged by which best proves the morph continuity. Either way the beat count and order are exactly the scripts'.
- Notes overlay (`n`) shows the verbatim scripts, `[→]`-aligned.
- Dev server on a port that does not collide with the presenter's 5173.

# 6. What exceptional means — the bar the presenter will hold

The session should self-audit against this bar before every hand-back:

1. **Motion is argument.** Every movement is a story event — a path failing, a claim being born, a patient released, an interval opening. Any motion that merely decorates is deleted (the legibility rule's spirit: what returns nothing spends attention).
2. **The retelling test at gate scale:** a cold viewer of these three scenes alone could retell the idea — *money lets an exchange stay open* — unprompted.
3. **The birth reads as the film's defining moment** at whichever treatment is selected: a viewer who saw only Scene 3 would remember it.
4. **The stills hold.** Pausing on any beat yields a frame that would pass the approved sheet — the brightness floors, the display rule, the settle budgets, one idea per frame.
5. **Pacing is authored.** Holds and silences are specified per beat (the pacing rule); nothing auto-advances across spoken lines; auto-timing lives only inside single gestures.

# 7. The iteration loop

1. This session (`gate-2-r1`) builds the complete three-scene prototype with the birth variants, self-audits against §6, and hands back.
2. The presenter reviews **as a viewer**, in the running prototype — beat by beat, both motion-on and reduced-motion. He returns notes (and screenshots where a frame is wrong).
3. Each notes pass is a fresh FAST session against this brief plus his notes; iterations tag `-r2`, `-r3`, …. Iterate in the prototype, never in the deck.
4. The gate closes on the presenter's recorded word — *exceptional* — plus his birth-treatment ruling. Only then does Batch A implementation begin.

# 8. Verification (FAST scope)

- Proto smoke: direct entry at every one of the 17 builds; forward/backward traversal; reduced-motion pass reaching identical end states; console clean throughout.
- `npm run build` clean; deck boot smoke (45 slides, 0 console errors) proving zero deck impact.
- A per-beat capture strip (all 17 builds) into `review/gate-2/r1/` for the record — the presenter's real review medium is the live prototype, but the strip preserves what each iteration looked like.
- Self-reference gate on the prototype's scripts and visible text.
- **Do not report success for checks not run. Name the mode.**

# 9. Out of scope — explicitly

- No deck scenes, no manifest splicing, no engine modification, no P1/P2 work (Prologue motion is Batch A implementation territory — its frames are proven deck material).
- No new dark-field renders and no `fiat` work (no Act I scene needs it).
- No script edits: gaps or awkwardness in the verbatim scripts are flagged in the report for the presenter, never rewritten in-session.

# 10. Definition of done (for r1)

1. Scenes 2–4 run complete in the scratch route: 17 beats, verbatim notes, approved compositions as landed states.
2. Two or three birth treatments selectable at runtime, all landing on the approved final.
3. The scene contract holds at every build; verification of §8 is green; the capture strip is filed.
4. Zero deck impact, granular commits, clean tree, `gate-2-r1` tagged.
5. The report (AGENTS.md §16, mode named) lists: derived compositions, flagged gaps, the birth-selection ruling awaited, and any engine limitation encountered.
