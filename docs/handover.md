# HANDOVER — What Is Money? Film Project
## For the incoming Claude: read this first, then the pointed documents, in this order

**Date of handover:** 25 August 2026
**You are inheriting:** the final production phase of a cinematic educational video ("WHAT IS MONEY?"), built as an HTML deck, to be screen-recorded with the presenter's voiceover for YouTube. The architecture is FROZEN. Your job is craft, precision briefs, and honest counsel — not new architectures.

---

# 1. Read these, in this order (clone the repo; all paths are in it)
Repo: `https://github.com/JoBe10/what-is-money-claude` · working branch **`film-rebuild`** (main is the last stable pre-film deck; untouched until final GATE). Tags so far: `stage-0`, `batch-a-frames`, `batch-a-selections`.
1. `docs/synthesis-architecture.md` — THE structure: five acts, ~30 scenes with beats, all rulings recorded. This is law.
2. `docs/what-is-money-master.md` — the consolidated constitution: narrative rules, D-framework as restated, compositional standard, two registers + dark-field grade, script standard (`[→]` = one advance), display/settle rules, self-reference ban, guardrails, terminology, freeze register.
3. `AGENTS.md` §4 — process law (see §4 below; the six presenter orders).
4. `docs/batch-a-package.md` — the template every batch package follows: verbatim scripts, beat maps, style-frame specs, asset manifest.
4b. `docs/batch-a-selections-report.md` §1 — the presenter's eight rulings of 25 August 2026 (Gate 1, the frame verdicts, the patient, the register assignments). The approval trail for everything Act I now stands on.
5. `docs/archive/` — history; do not resurrect anything from it without the presenter reopening the freeze.

# 2. The one-paragraph history you must respect
This project went through multiple full rebuilds (original Opus 4.7 deck → Sections 1–3 rebuild → Section 4 audit/freeze + execution rebuild → visual harmonization → two-register correction). The presenter (Jonas — quant analyst, Bitcoin maximalist, deep Austrian economics, Argentarius/Vom Gelde as anchor; exceptional taste, brutal honesty welcomed and expected) then commissioned an independent blueprint from ChatGPT; the current **synthesis architecture** fuses that blueprint's spine (single-thread "unfinished exchange" grammar, scenes-and-beats film paradigm, coordination logic) with this project's proven organs (80,000-hours cold open, capture-not-beaten history + four-currency evidence, palladium bar, credit tower, the frozen Section 4 argument). **The structure-freeze was agreed explicitly to end the rebuild loop: if a new architectural idea arises — from anyone — the answer is that structure is closed.** Honest counsel means holding that line kindly.

# 3. The paradigm
Scenes and beats, not slides. A scene = one continuous visual world (one HTML scene) with multiple states; a beat = one advance = one `[→]` in the verbatim script. Scenes morph when the idea persists; cut only when the question changes. Visual journey: Prologue personal/mysterious (monochrome + photographic warmth) → Act I human/warm/dark-field → Act II material-to-information → Act III diagrammatic → Act IV abstract black/white/orange → Act V descending complexity to silence. **Orange enters the film at the Claim Mark's birth (Scene 3)** — the protagonist is the accent. Two registers: line grammar for structure; dark-field photography (pure black, single warm key ~3000K, no environment) only where sensory concreteness is the argument. Speaker notes ARE the recording script (first person, `[→]` markers); Jonas rewrites them in his own voice at the very end.

# 4. Process law (all presenter-ordered; violations are defects)
1. **Commit granularity:** every self-contained change committed immediately, descriptive message, clean tree at every stop; tags at every stage/batch (easy revert was an explicit presenter order).
2. **Aesthetic law:** no aesthetic decision ships on agent self-selection — contact sheets; Jonas selects. (History: three rounds of agent-selected glyphs failed his eye; this law is non-negotiable.)
3. **No-invention rule:** batches implement approved style frames + scripts; gaps are flagged, never improvised.
4. **Style-frames stage:** every new/changed scene's key states are approved as stills BEFORE motion. Decisions are made at the cheapest artifact that carries them: architecture on paper → taste on stills → motion in prototypes → integration in batches.
5. **FAST/GATE:** FAST = verify only what changed (sessions must stay well under an hour where possible; the old 4-hour sessions were a major pain point). GATE = full suite, only before the recording merge.
6. Model strategy: **Fable 5, top effort, for taste sessions** (Gate 2 next; style frames). **Opus 5, max, for batches/mechanical** work. Fresh CLI session per task; effort set at launch (mid-session switches invalidate cache). Fable's weekly budget resets Thursdays.

# 5. Where the project stands RIGHT NOW
- **Stage 0 done** (freeze, master doc, archive of 47 docs, process law, scaffold `src/scenes/`, `?proto=` route).
- **Gate 1 + Style Frames session done** (Fable 5; 11 commits; tag `batch-a-frames`). Deliverables under `review/frames-a/`:
  - `gate-1-claim-mark/contact-sheet.png` — Claim Mark candidates A (current disc-era object), B (chamfered billet), C (flat hexagon), five contexts, three scales.
  - `frames/contact-sheet-markup.png` — the ten §3 frames as 24 stills, the sheet Jonas marked up (mark-bearing frames in all three candidates; S3-F1 in three compositional attempts; P2-F1 ± hours-ghost; S2-F1 photographic patient vs restrained mark).
  - `register/contact-sheet.png` — new dark-field arrivals beside the library, duplicates side by side for his assignment.
- **Selection-application session done** (Opus 5, FAST; 10 commits; tag `batch-a-selections`; `docs/batch-a-selections-report.md`). His rulings are recorded and applied:
  - **Gate 1 ruled: candidate A**, the current disc. `CLAIM_MARK_SELECTION` in `src/proto/claim-mark.js` is `'A'`; B and C stay on file, so changing the protagonist is still one letter. A is the disc the hours field was built against, so no unit-style tuning and **no P1-F1 re-render.**
  - `frames/contact-sheet.png` is now **the approved set of ten** — S2-F1 and S3-F1 re-rendered as finals, the other eight approved as rendered, P2-F1 plain. All 26 stills stay on disk; nothing was deleted.
  - **`patient` is regraded, gated and shipping** (corner 64.73 → 0.08, five clauses of five, zero pixels of the modelled subject changed). The register is 22 images, 110 checks, 0 failures. **Open for his eye:** the warm ambient the regrade cannot reach without touching the figure — measured at 9.2 against `coffee_cup`'s 6.8, above the register's norm but the same order (selections report §6.2).
  - **Duplicate-subject assignments ruled** and recorded (manifest §2.2): `single_cowrie` → P1 morph, `shells` → Scene 5 lineup, `cowrie_shells` banked; `ledger_glow` → Scene 8, `ledger` → lineup; `gold_certificate` → Scene 7, `paper` → P1 morph.
  - **`fiat` render still missing** (pre-existing gap; the gold-certificate distinctness check waits on it). No Act I scene needs it. The S4-F1 wine-edge note was waved off — within the gate, presenter-accepted.
- **Gate 2 r1 built** (Fable 5, top effort; tag `gate-2-r1`; `docs/gate-2-r1-report.md`). Scenes 2–4 run complete in `?proto=gate2` — 17 beats, verbatim notes, approved compositions as landed states, both boundaries morphs, full scene contract green (17/17 reduced-motion parity, zero deck impact). **Three birth treatments** selectable via `?birth=1|2|3` or keys 1/2/3 on Scene 3: collapse / condense / pool. Capture strip in `review/gate-2/r1/`. **Awaiting the presenter's viewer review and his birth-treatment ruling**; the gate closes only on his recorded word *exceptional*.

# 6. Your immediate next actions (in order)
1. ~~Receive his rulings → author the selection-application brief~~ — **done**, tag `batch-a-selections`. He has not yet seen the two new finals rendered; they are on `review/frames-a/frames/contact-sheet.png`.
2. **Prototype Gate 2 — r1 is built** (tag `gate-2-r1`); Jonas now reviews as a viewer (`?proto=gate2`, keys 1/2/3 on the birth beat) and returns notes plus his birth-treatment ruling. Each notes pass is a fresh FAST session against `docs/gate-2-brief.md` + his notes, tagging `-r2`, `-r3`, …. The blueprint's rule holds: do not leave Gate 2 until it is exceptional. Iterate in the prototype, not in the deck.
3. Then **Batch A implementation** (Opus, FAST) against approved frames + the verbatim scripts in `docs/batch-a-package.md`.
4. Then author the **Batch B package here in chat** (Act II, Scenes 5–10) following `batch-a-package.md`'s exact template: beat maps, verbatim scripts (Act II scripts adapt existing material: competition wounds + Zanzibar receipt, chemistry funnel compressed, ladder motivation, the fused fiat scene with severance + four-currency chart, Bitcoin facts + honesty + the distributed stability content, palladium bar), style-frame specs, any asset needs. Then C (Act III: jobs, Argentina fusion, coordination, coffee, tower), D (Act IV: mostly existing frozen scripts re-homed), E (Act V), F (integration + close). GATE, his script pass, record.

# 7. Relationship and communication notes
- **His long pasted messages auto-convert to .txt attachments that arrive EMPTY in the chat context — but the files ARE readable on disk at `/mnt/user-data/uploads/`. Always check disk before reporting an attachment empty.** Chunk-pasting also works on his side.
- He reviews via screenshots; respond to what the screenshots show, and distinguish bugs/unfinished states from design before judging (this mattered repeatedly).
- Be rigorously honest; he explicitly guards against his own sunk-cost bias and expects pushback with reasons — but taste calls on aesthetics are his, full stop.
- Never let the deck name its own medium (no "presentation/slides/video" in any visible line or script).
- Frozen and settled things not to relitigate: the Section 4 argument spine (audited 28 Jul, findings placed), "Don't trust. Verify." (his amendment), "You cannot print money — only the units it comes in" (his Vom Gelde ruling; never say "printed money is money" or "you can print claims"), capture-not-beaten for gold→fiat, all five architecture rulings (waypoints retired, murmuration retired, periodic elimination compressed in Scene 6, palladium in Scene 10, stability scene cut with content distributed to Scenes 9/23/29).

# 8. The finish line
After Batch F: one GATE (full verification on the whole film), Jonas's own script pass (he rewrites every scene's notes in his voice), the recording, YouTube. The goal has never moved: the best "What Is Money?" ever made — in the spirit of Joe Bryan's "What's the Problem?", and better. It is close. Your job is to land it, not to reimagine it.
