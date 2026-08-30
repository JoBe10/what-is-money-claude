# P1 Restoration · The Provenance Rule · Act II Provenance Map — Report
## The cold open looks like it always did · proven material is now untouchable by law

**Mode: FAST.** Scoped verification: the changed P1 state re-proven per pixel, the deck's own smoke re-run whole, the prologue cell checks re-run, the static gates re-run. No deck-wide suites; what a scoped run defers is named in §8.
**Branch:** `film-rebuild`. **Prior tags:** `batch-a-r2`, `act-2-systems`. **Tag:** `batch-a-r3`.
**Zero design decisions were made in this session.**
**Date:** 30 August 2026

---

# 1. The two ARGUABLE-first things you actually have to decide

Everything else in this report is either a record of your ruling or a proof that it landed. These are the two places I stopped rather than chose.

**A. The four ARGUABLE rows of the Act II map (§6).** S5-F1, S5-F3, S7-F2, S8-F2 — one line per side, no recommendation. Two of them (S5-F3, S8-F2) decide whether two of the systems sheet's five selections are still live.

**B. The disc's rim mixes 18% `--accent` (§7.1).** The restored ball is the deck's `.luminous-disc`, whose outer stop is `color-mix(in srgb, var(--unit-warm) 82%, var(--accent) 18%)` — measured on stage as **rgb(252, 218, 179)**, a cream with no orange read at any size. Net over white that is **34.4% toward the accent**, against the hours field's own **20%**. It is the same warm family as the field it condenses from, and it is the object you ruled restored — but the surviving law says *no accent color in the Prologue*, and this object references the accent token. **I did not change the drawing and I did not change the law.** Your call.

---

# 2. The two records, first and each its own commit

| # | Record | Where |
|---|---|---|
| 1 | **The provenance rule** — PORT / ADAPT / NEW, recorded before any session touches a frame; candidate generation for a PORT frame is a process defect; a class is verified before anything is touched | `AGENTS.md` **§4.9**, appended at the end of §4 so no existing cross-reference moves (the §4.8 precedent). `33d9019` |
| 2 | **The condensation ruling — PORT — with the struck-and-replaced law trail** | `docs/gate-2-close-and-prologue-states-report.md` **§12**; the clause struck in place at its origin in `docs/gate-2-close-and-prologue-states-brief.md` §3; `review/prologue/states/states.json` `rulings.restoration`. `611e6e9` |

## 2.1 The struck-and-replaced law trail

**Struck:** *"no Claim Mark anywhere"* — the Prologue composition-law clause of `docs/gate-2-close-and-prologue-states-brief.md` §3, 29 August 2026. **That document is the only place it ever came from.**

**Replaced by** the architecture's actual law, which is unchanged and was always the law: ***orange enters the film at Scene 3's birth; no accent color in the Prologue*** — `docs/what-is-money-master.md` §8.5, and your own freeze-register ruling of 25 August 2026.

**What went wrong, precisely.** The close brief restated a rule about **the accent** as a rule about **the object**. The disc is a drawing and the accent is a color; the record bans the second from the Prologue and never the first. Then the clause propagated, and each copy read back as independent confirmation of a law with one source:

| Where it landed | Now |
|---|---|
| `docs/gate-2-close-and-prologue-states-brief.md` §3 — **the origin** | Struck in place, with a pointer to the trail and *"do not reintroduce it from this document"* |
| `review/prologue/harness/states.mjs` header — *"the legacy 1.2 token does NOT return"* | Amended; the header now records the strike and says the token did return |
| `review/batch-a/harness/static-gates.cjs` — the REGISTER gate's own regex tested `ClaimMark\|LuminousDisc\|luminous-disc` | Narrowed to `--accent\|#F7931A` and renamed. The old pattern would now **fail the very state you ruled** |
| `src/scenes/prologue/_prologueStage.js`, `p1-eighty-thousand-hours.js` headers | Amended |
| `review/prologue/states/sheet.html` review note | Regenerated |
| `src/styles/slides.css` — the `.p1-ball` block, whose entire rationale was the struck clause | Marked retired; parameters kept in full so its cell can be re-rendered |

**What it cost, in one sentence.** The over-extension is what made P1's condensation a design question at all: it ruled out the one object the deck had already proven for this exact gesture, so the beat went to the candidate process instead — a granular mass, a reopening, a white ball, a second reopening, two retired cells — **for a frame that was never open.** That is the failure §4.9 exists to prevent, and it is the rule's first recorded instance.

**Left as written, deliberately:** §11 of the states report, the p1-fix report, and the retired cells' own captions. They are what was believed when they were written, and that is what makes a trail a trail rather than a tidy-up.

---

# 3. The restoration

## 3.1 What was ported, and from where

Everything in P1's condensation is now transcribed from `src/slides/section-1-question/02-the-conversion.js`. Nothing is chosen.

| | Before (letter B) | Now (PORT) | Source |
|---|---|---|---|
| collapse | 4600 ms | **4600 ms** | 1.02 `COLLAPSE_MS` — unchanged, it was already 1.02's |
| the ball resolves at | 0.45 of the collapse | **0.22** | 1.02 `TOKEN_EMERGE_AT` |
| the object | `.p1-ball`, achromatic, 296 px | **`.luminous-disc` + `.s1q-token`**, 176 px | 1.02, lines 46–49 |
| centre | (960, 650), the forms' centre | **(960, 540)**, the stage centre | `.s1q-token` (`left/top: 50%`, `margin: -88px`) |
| arrival | opacity 1200 ms | **opacity 1100 ms + `scale(0.82)` → `scale(1)` over 1500 ms** | `.s1q-token` |
| reduced motion | a `.p1-ball` rule in the Prologue block | **the legacy `.s1q-token` rule, which already covers it** | `slides.css` Section 1 reduced-motion block |

**The builder now carries no geometry at all, and that absence is the record of the port.** Both retired candidates wrote their own coordinates into `_prologueStage.js`; the restoration needs none, because the legacy classes already hold the size, the centre, the glow, the arrival and the reduced-motion parity. `condensedBall()` is three lines and one of them is `return`.

## 3.2 The mechanism note — what an engine forced, and what it closed

**One difference exists, and it is a closure, not a compromise.** `UnitField`'s collapse converges on the **stage** centre (960, 540). The letter-B ball sat at the **forms'** centre (960, 650), and the p1-fix report flagged that 110 px offset at its §7.3: *"with a hard-edged ball it is visible mid-gesture — the ball sits low in the cleared void."* The legacy token sits at (960, 540) by its own CSS, which is exactly where the collapse converges. **Restoring the legacy geometry closes that flag rather than inheriting it** — see `review/batch-a/strip/g-p1-condense-2.png`, where the ball is dead centre in the consumption front. Nothing was moved to achieve this; it is what the port gives you.

**Two behaviors the legacy gesture does not contain, stated rather than invented:**

1. **The ball's departure.** 1.02's token never left the frame, so the legacy has no exit for it. P1 hides it at beat 4, and it therefore leaves on **`.s1q-token`'s own transition run backwards** — 1100 ms out, settling to `scale(0.82)` over 1500 ms. Nothing was authored for this. It reads as the ball receding under the rising shell (`morph` frames at 260 ms and 1100 ms), which is a cross-dissolve, but it is a direction the legacy never judged and you may want a faster release. Say the word and it is a two-line rule.
2. **The spent field is hidden after the collapse.** P1 sets `display: none` on the field element once the gesture completes; 1.02 left it mounted. This predates the restoration and is measured, not assumed — with the spent canvas in the paint, the bitcoin form's rasterization moved by up to 9/255 and the landed-state proof caught it. At collapse progress 1 the field paints nothing, so the two are visually identical. Kept.

**Nothing else differs.** No new CSS rule was written for the restored object, and no engine file was touched.

## 3.3 The cells

`p1-b3-token` is the approved state for P1 b3. **Both** prior candidates retire and both stay on file under the aesthetic law's file-keeping clause: `p1-b3` (the granular mass) and `p1-b3-ball` (the white monochrome ball), each marked `supersededByRestoration` in `states.json` with its own cell PNG and its own builder intact — a retired candidate that cannot be re-rendered is not on file at all.

**Two gaps closed on the way, both pre-existing:**
- `p1-b3-ball` was never added to `states.json`'s `cells` array by the session that ruled it, so it had never reached `sheet.html` at all. It is on the sheet now, marked retired.
- `capture-states.cjs` could only rebuild the sheet by re-rendering every cell **and overwriting `states.json`** — which has carried hand-written rulings since the C1 selection. It now takes `--index-only`, which rebuilds the index and touches nothing else. That is the path a single ruling actually needs, and the trap is disarmed for the next session.

---

# 4. Proven

| check | result |
|---|---|
| **Landed-state proof** | **33/33 at zero differing pixels**, cold. `p1-b3-token` matches its archived cell **and** a fresh render of it at zero — and so do all five form beats, which was the one thing worth measuring rather than assuming: an opacity-0 element carrying a `transform` sits in those frames and does not move their rasterization by a pixel |
| **Smoke** | deck boots **39 slides**; 201-state traversal forward in exact order and monotonically back; both splice boundaries in both directions; **33 cold entries**; **reduced-motion parity 33/33**; **0 console errors** |
| **Warm path** | **30/33 — unchanged from Batch A.** The three that differ are the same claim-disc-edge states its §7.2 flagged; **every P1 state passes on both paths**, `p1-b3-token` included |
| **Static gates** | **13/13**, with the REGISTER gate narrowed to the surviving law |
| **Prologue cell checks** | **18/18**; `p1-b3-token` corner 0.00, border 0.00 |
| `npm run build` | clean |
| **Captures** | the absorption at **three** points of its 4.6 s (`g-p1-condense-1/-2/-3`) plus the landed ball (`p1-b3.png`), into `review/batch-a/strip/` |

---

# 5. Files changed

## New
| file | what |
|---|---|
| `docs/act-2-provenance.md` | the Act II provenance map |
| `docs/p1-restoration-and-provenance-report.md` | this report |
| `docs/p1-restoration-and-provenance-brief.md` | the session brief |
| `review/prologue/states/p1-b3-token.png` | the restored cell |
| `review/batch-a/strip/g-p1-condense-{1,2,3}.png` | the absorption at three points |

## Modified
| file | what |
|---|---|
| `AGENTS.md` | §4.9, the provenance rule |
| `src/scenes/prologue/_prologueStage.js` | the legacy ball replaces the white ball; the geometry section is gone because the port has none |
| `src/scenes/prologue/p1-eighty-thousand-hours.js` | `BALL_EMERGE_AT` 0.45 → 0.22; the headers |
| `src/styles/slides.css` | `.p1-ball` marked retired beside `.p1-mass`, parameters kept; the Prologue block records that the restored object needs no rule here |
| `review/prologue/harness/states.mjs` | `restoredBall`, the `p1-b3-token` cell, the two retirements, the struck header clause |
| `review/prologue/harness/capture-states.cjs` | `--index-only` |
| `review/prologue/states/states.json`, `sheet.html` | `rulings.restoration`, the cell rows, the amended `approvedSet` |
| `review/batch-a/harness/static-gates.cjs` | the REGISTER gate narrowed |
| `review/batch-a/harness/proof-batch-a.cjs`, `warm-path-proof.cjs` | P1 b3 is `p1-b3-token` |
| `review/batch-a/harness/capture-batch-a.cjs` | the absorption at three points |
| `docs/gate-2-close-and-prologue-states-report.md` | §12 |
| `docs/gate-2-close-and-prologue-states-brief.md` | §3, the clause struck in place |
| `review/batch-a/**`, `review/prologue/harness/check-cells.json` | the evidence re-run |

## Deleted
`review/batch-a/strip/g-p1-condense.png` — it recorded a retired object, and that strip's own header says it is a record of the film **as it now runs**. Its cell is kept at `review/prologue/states/p1-b3-ball.png`, which is where a retirement belongs.

**Out of scope, changed anyway: none.** No Act II scene or script exists and none was written; the systems sheet's eighteen cells are untouched; no engine file was modified; no legacy slide, manifest entry or seam was touched.

## Commits and tag

```
deb6674  docs: the restoration brief arrives
33d9019  process: the provenance rule — PORT, ADAPT, NEW
611e6e9  review(prologue): the condensation ruling is PORT — and the struck law trail
7c7de5f  scenes(P1): the legacy absorption restored — 1.02's gesture and 1.02's ball
0fae5e9  review(prologue): p1-b3-token rendered, and the two candidates it retires marked
73f6366  review(batch-a): the gates and proofs follow the restoration
91271f7  review(batch-a): the restoration proven — 33/33 at zero, the ball among them
f2e4d49  docs: the Act II provenance map — fourteen frames, ten with a source on disk
```
**Tag:** `batch-a-r3` at the report commit. The revert point for the restoration alone is `91271f7` — everything after it is documents.

---

# 6. The Act II provenance map — summary, ARGUABLE first

Full document: **`docs/act-2-provenance.md`**. It is a **proposal**; this session decided no classification.

| Frame | Class | Legacy source / ruling |
|---|---|---|
| **S5-F1 ◆** the through-line composition | **ARGUABLE** PORT ↔ NEW | the judged claim-in-`CarrierShell` composition — vs the unproven staging of a *photographic* carrier against a line-grammar claim |
| **S5-F3 ◆** the Zanzibar receipt | **ARGUABLE** PORT ↔ NEW | the severance's `1971.` dated-fact frame and `2-04`'s receipt wound — vs a standalone system neither one is |
| **S7-F2** the detachment | **ARGUABLE** ADAPT ↔ NEW | the severance's detaching rung — vs a drawing whose argument is the *opposite* of that one's |
| **S8-F2 ◆** the four-currency chart | **ARGUABLE** PORT ↔ ADAPT | the severance's chart, frozen data and all — the only question is whether "at film grade" rules a change |
| **S5-F2** a verdict state | **PORT** | `2-04-the-competition-record` builds 1–4 |
| **S6-F1** the gold study | **PORT** | P1-F2's display-scale study box + master §11's display rule |
| **S7-F1** the vault study | **PORT** | the same box, subject `vault` |
| **S8-F1** the dissolve landing | **PORT** | P1's five-form morph — `p1-b6` → `p1-b7-glow` **is** paper → `ledger_glow`, approved |
| **S9-F2** the asset emerged | **PORT** | `2-08-the-pattern` builds 5–6, the neutral-register entrant block |
| **S10-F1 ◆** the trade-off strip | **PORT** | `EvolutionRail`'s own grammar (icon grammar §4.5) |
| **S6-F2 ◆** the elimination funnel | **ADAPT** | `2-05-two-survivors` + `ElementGrid`; **Ruling 3** — kept, compressed to one continuous beat |
| **S10-F2** palladium: the bar | **ADAPT** | `3-05-the-palladium-test`; **Ruling 4** — placed in Scene 10 as the bar |
| **S6-F3** the mass state | **NEW** | none |
| **S9-F1 ◆** the network formation | **NEW** | none |

**6 PORT · 2 ADAPT · 2 NEW · 4 ARGUABLE.** Ten of fourteen frames have a proven treatment on disk that no session had been told to use.

**The finding worth your attention.** The **funnel** is Ruling 3's compressed periodic elimination, and the **strip** is the rail's own grammar. The systems sheet generated three fresh candidates for each of them a day earlier — and its funnel candidate A (*the element field*) and its strip candidate A (*the rail*) are re-derivations of `ElementGrid` and `EvolutionRail` respectively. **Two of the five selections it asks of you may not be selections you have to make.** Every cell stays on file regardless. This is not a fault of that session, which ran to a brief the rule postdates; it is the evidence the rule was written on.

**One convention decides four rows at once.** The map classifies by **treatment**, not by subject or by words — which is why a vault that has never been on screen is a PORT of an approved study box. Narrowing that convention moves S6-F1, S7-F1, S8-F1 and S9-F2 to NEW together, in one word, and §0 of the map says so.

---

# 7. Flagged, not improvised

1. **The disc's rim references `--accent`.** Restored verbatim, per your ruling. `color-mix(in srgb, var(--unit-warm) 82%, var(--accent) 18%)`, measured on stage as **rgb(252, 218, 179)** — net **34.4% toward the accent over white**, against the hours field's own documented **20%** (`globals.css`: *"blended toward `--accent` at 20% and 10%… proto-value, not yet the deck's accent orange"*). It reads as cream; no orange is visible at any size. But the surviving law is *no accent color in the Prologue*, and this object names the token. **The drawing was not changed and the law was not changed.** The static gate holds the law at the scene files, where it always did; it does not measure pixels, and §7.6 of the p1-fix report records why a per-pixel hue test was thrown away.
2. **The no-anticipation question returns, and I did not answer it.** Under letter B the ball was deliberately not the mark, so Scene 3's birth stayed the disc's first appearance. Under PORT the condensation lands on **the same drawing as the Claim Mark's disc** — 176 px here, 132 px at the birth. Master §8.5 governs the accent's entry and is satisfied; whether the *disc's* first appearance moving to P1 needs a freeze-register note is a ruling, not a session's call. The freeze register is untouched.
3. **Master §8.5 says *"the only warmth on screen is the dark-field register's own key light."*** That sentence was already contradicted by the shipping deck before this session: the hours field paints in `--unit-warm` at beats 1–3 and always has. The restored ball is the same warm family. Named here because a law that the shipped film has never satisfied should be corrected or narrowed by you rather than quietly ignored by sessions.
4. **The ball's release is unjudged** (§3.2). 1.02 never took the token off screen, so its 1100/1500 ms exit is the legacy object's transition run in a direction nobody has looked at.
5. **The `p1-b3` beat-count question is untouched.** The states record's own note stands: the §1 map compresses condensation-into-first-form to one beat while the verbatim script carries eleven `[→]`. Unchanged by this session.
6. **The warm-path residue is unchanged** — three claim-disc-edge states, 2–38 px at ≤39/255, not the same set run to run. Still the GATE's, as Batch A §7.2 left it.
7. **Batch A's and the systems session's flags all ride on.** Nothing was actioned on any of them, which is what the brief ordered. The systems session's §7.3 flag — the condensation's two centres — is the one exception, and it is **closed** by the restoration rather than deferred (§3.2).

---

# 8. Deferred to the GATE

No deck-wide suite ran: no direct-entry matrix beyond the 33 new-scene builds, no brightness gate, no register or composition audit over the legacy slides, no freeze checks, no viewport matrix. The smoke's 201-state traversal did walk the whole 39-slide deck in both directions with zero console errors, which is the deck-wide guarantee a FAST run can honestly claim. **No gate was widened to make this session pass** — the warm path's three failures are reported at their real value.

---

# 9. Remaining judgment calls — all yours

- **The four ARGUABLE rows** of the Act II map, and the §0 convention that decides four more.
- **The disc's rim** (§7.1) and **the no-anticipation question** (§7.2).
- **Master §8.5's warmth sentence** (§7.3).
- **The ball's release timing** (§7.4), if the legacy exit is not what you want.
- Everything Batch A's §12 disposition and the systems session's §7 send to your eye or to the GATE.

---

# 10. Recommended next step

**Rule the provenance map in one pass** — `docs/act-2-provenance.md`, §7 of that document is the protocol. It is the one thing that unblocks the most: it tells the Act II beat-state session which frames it may not design, and it may retire two of the five selections the systems sheet is currently waiting on you for.
