# Act II — Rulings, Scripts, and the Beat-State Sheet — Report
## The map governs · the scripts are in · 33 states rendered, and you owe a verdict on 16 of 40

**Mode: FAST.** Records, one script installation, one sheet. Scoped verification: every cell through the pipeline's measured checks, the script diff at three strengths, the sheet's own provenance gates, the production build, the deck-boot smoke. No deck-wide suites.
**Branch:** `film-rebuild`. **Prior tag:** `batch-a-r3`. **Tag:** `act-2-states`.
**Zero deck impact — not one file under `src/` was touched.**
**Date:** 31 August 2026

---

# 1. What you actually have to do

**`review/act-2/states/sheet.html`, opened on the dev server.** It is ordered by what it asks of you, not by beat.

| | cells | what is wanted |
|---|---|---|
| **`pending-selection`** | **9** | **One selection per frame.** Three frames, three candidates each: **S6-F3** the mass state · **S7-F2** the detachment · **S9-F1** the network. S9-F1's three are the systems sheet's own, carried over unchanged. |
| **`pending-review`** | **7** | **Verify the one ruled change landed and nothing else moved.** Each caption says which change to look for. |
| `approved-port` | 16 | Approved by provenance. Look only if something appears wrong. |
| `determined` | 8 | Script landings on compositions already approved above. No decision. |

**Sixteen of forty cells carry a burden, and the ruled map is why the other twenty-four do not.** Under the old process every one of the fourteen ◆ and non-◆ frames would have arrived as a candidate round.

---

# 2. The five rulings, recorded first and each its own commit

| # | Ruling | Where | Commit |
|---|---|---|---|
| 1 | **The four ARGUABLE rows** — S5-F1 **PORT**, S5-F3 **ADAPT**, S7-F2 **NEW**, S8-F2 **PORT** | `docs/act-2-provenance.md` §1, §2 (both sides of each row kept on file) | `940799d` |
| 2 | **The §0 convention — *treatment*** | `docs/act-2-provenance.md` §0 | `b93e371` |
| 3 | **Palladium stays** | `docs/act-2-provenance.md` §4, in the S10-F2 block | `88f086c` |
| 4 | **The standing Act III markup** | **`docs/act-3-provenance.md`** (new; a stub that governs nothing else) | `397aa19` |
| 5 | **The scripts approved as drafted** | `docs/batch-b-package.md` §1–§2 | `09fa00b` |

**The map is now RULED and governs all Act II work: 8 PORT · 3 ADAPT · 3 NEW.** It is reordered into scene order, because a ruled map is looked up by frame rather than read as an argument.

**Two rulings did more than settle their own row.** The §0 answer settled S6-F1, S7-F1, S8-F1 and S9-F2 in one word. And the S5-F1 ruling's clause — *the photographic renders remain the historical objects in the same scenes* — is what dissolved the register objection rather than overruling it: the claim wears the **drawn** carrier and the dark-field goods carry the **verdict** beats, in their own registers and their own moments. Master §6.3's boundary is kept, not crossed, and the sheet's own gate proves it.

**Why item 4 went where it did.** `AGENTS.md` §4.9 says a class lives with the act it governs, so a class recorded only in a report is a class the next session will not find. `docs/act-3-provenance.md` says plainly it is a stub. **It carries one flag, and it is not mine to resolve** — see §7.1.

---

# 3. The scripts, installed and frozen

**Installed programmatically from the draft rather than transcribed**, so zero-difference is a property of how it was done rather than of how carefully it was typed. `review/act-2/harness/script-diff.cjs` proves it at three strengths:

| check | result |
|---|---|
| **WORDS** — the brief's own bar | **zero differences** · S5 348 · S6 300 · S7 218 · S8 338 · S9 287 · S10 254 |
| **CHARACTERS** — catches the smart-quote and dash substitutions a copy-paste introduces silently | **6/6 identical** |
| **BEATS** | S5 8 · S6 5 · S7 5 · S8 5 · S9 5 · S10 5 = **33** |
| **FREEZE** — §1's map states the same counts §2's scripts do | 6/6 agree |

**The beat maps are frozen at 33.** They were provisional until the scripts landed, exactly as the package said they would be. The contracts each script had to satisfy are kept at the end of §2: a satisfied contract is the evidence the script is complete, and your voice pass will want to see what the words had to carry.

---

# 4. The sheet, by review class

## 4.1 `pending-selection` — the three frames Act II designs

**S6-F3 · the mass state** (`s6-b5-a/b/c`). Line grammar, three genuinely different systems for *represented value up, physical mass visibly up*.
- **A — the counted load.** The mass is counted, in the metal's own mark: three stations on a baseline, the value named above, the mass stacked beneath as one, four, twelve marks. Arithmetic and unarguable.
- **B — the column that grows.** One column on one baseline with the three values ticked as thresholds; the level it stands at now is a column, the two it passed are the edges where it used to reach. The most austere.
- **C — the load hung from the claim.** Three rows, the claim's mark fixed at the left of each, the mass hanging as a line that reaches further every time. The dependency drawn as literal length.

**S7-F2 · the detachment** (`s7-b4-a/b/c`). Candidates for **the travel's geometry**, per the ruling. All three render the same instant — the claim arrived at its distance, the tie intact — so what is compared is geometry, not moment.
- **A — the departure arc.** The travel is a curve, the dependency a straight tie: two line qualities for two ideas.
- **B — the custody boundary crossed.** A ring around the vault, and the tie visibly crossing it. The beat's whole sentence in one mark.
- **C — the two positions.** No path at all: the claim receded where it was, at full voice where it is, one line between. The most restrained, and the one that survives being a still.

**S9-F1 · the network** (`s9-b1-a/b/c`). **The systems sheet's own three, carried over unchanged** — these cells run that sheet's builders, so the cell here and the cell there cannot drift. No text on any of the three.

## 4.2 `pending-review` — verify the one change

| cell | the one ruled change to look for |
|---|---|
| `s5-b6` · Zanzibar | The evidence grammar. Type is `2-07`'s to the value (128px/650 tabular date, 33px/460 fact); the only thing that moved is that they became one block that can also carry a **place**. |
| `s8-b2` · 1971 | The same grammar on the specimen it was built from — this is where old and new should look most alike. |
| `s5f3-proof-1803` | **A system proof, not a beat.** The ruling names three specimens; two are beats and the third lives inside Scene 10's ported frame, so it is rendered here to demonstrate the generalization rather than assert it. |
| `s6-b2` · the funnel | The legacy showed **one** wave line per advance. The compressed beat shows the **run** — what has been cut, receded, and the cut now running at full voice. Population, regions and wave language untouched; `ElementGrid` is mounted, not redrawn. |
| `s6-b3` · two survivors | The beat's end state at ElementGrid's own step 5, with the legacy verdict line. **The furnace cut survived the compression** — it is why palladium is a candidate that lost on timing rather than one chemistry had already excluded. |
| `s10-b3`, `s10-b4` · palladium | The beat moved out of Act III's judging position and now stands against the strip. **Nothing inside the frame moved**, and the two-epoch honesty travelled with it. |

## 4.3 `approved-port` — sixteen cells, and how far "verbatim" was taken

Where the named treatment is a **live component, the cell mounts it** rather than redrawing it:
- **S5-F2** (`s5-b2`…`s5-b5`) runs **`EvolutionRail`** at the state the legacy slides run it — the contender row, the dark-field goods, the wound landing at full voice while the earlier ones hold the dimmed-prior step. The wounds are the legacy verdicts, unchanged.
- **S6-F2** runs **`ElementGrid`** at its own steps.
- **S5-F1** (`s5-b1`, `s5-b7`, `s6-b4`, `s7-b2`) mounts **`ClaimObject` inside `CarrierShell`** in `4-06`'s own 520×240 scene box, so the shell lands at 240 and the disc at 116 on one centre — the 27 August centring ruling living in the component.

Where it is a **slide's own composition, the cell rebuilds that slide's DOM against the same CSS classes** — including the legacy slide roots, which turned out to be load-bearing: the severance chart's series labels and the palladium hook's lift are both driven from `[data-step]` on the slide root, and a port that carried only the geometry rendered the plot **without its labels**. Carrying the root is what makes it the treatment.

## 4.4 The claim through-line

On stage at **S5 b1 · S5 b7 · S6 b4 · S7 b1 · S7 b2**, and again as **S10's CLAIM station** — the carrier named in the rail's stop register at each appearance (SHELLS → GOLD → COINAGE), the thing inside unchanged. That is the connective object Gate 3 will animate, and it is legible as a run by walking the sheet's second half.

---

# 5. Verification

| check | result |
|---|---|
| **Script install** | **5/5** — zero word differences, zero character differences, 33 beats, §1 and §2 agree |
| **Sheet checks** | **11/11** — see below |
| **Cells measured** | **40/40** — corner 0.00, border 0.00, content present, all 1920×1080 |
| **Map agreement** | the ruled classes are **read out of `docs/act-2-provenance.md`**, not trusted; 14/14 rows agree, and every cell's class matches its frame's |
| **Beat coverage** | every beat of the frozen map present, once: S5 8 · S6 5 · S7 5 · S8 5 · S9 5 · S10 5 = 33 |
| **Candidates** | every NEW frame carries three; **no PORT or ADAPT frame carries any** |
| **Frozen data** | both charts import their data modules and carry no copy |
| **Register boundary** | no diagram cell puts a dark-field render inside a diagram |
| `npm run build` | clean |
| **Deck smoke** | 39 slides · 201-state traversal both ways · both splice boundaries · 33 cold entries · **reduced-motion parity 33/33** · **0 console errors** |
| **Deck impact** | **zero** — `git status src/` is empty |

**The gate earned its keep during the run.** `check-states.cjs` caught a `determined` cell still claiming the frame whose composition it borrowed, which would have counted on the sheet as a second candidate for a PORT — precisely the defect §4.9 exists to prevent, found by a machine rather than by a reader.

---

# 6. Files changed

## New
| file | what |
|---|---|
| `docs/act-3-provenance.md` | the standing Act III markup, in the file §4.9 sends a session to |
| `docs/act-2-states-report.md` | this report |
| `docs/act-2-states-brief.md`, `docs/batch-b-scripts-draft.md` | the session brief and your draft, committed as placed |
| `review/act-2/harness/script-diff.cjs` | the three-strength install diff |
| `review/act-2/harness/states.mjs` | the 40 cell builders |
| `review/act-2/harness/capture-states.cjs`, `check-states.cjs` | the sheet pipeline and its gates |
| `review/act-2/states/**` | 40 cells, `sheet.html`, `states.json` |

## Modified
| file | what |
|---|---|
| `docs/act-2-provenance.md` | ruled: §0 confirmed, the four rows settled, palladium recorded, reordered into scene order |
| `docs/batch-b-package.md` | §1 frozen at 33, §2 the installed scripts, the contracts kept as the record, the header brought current |
| `review/act-2/harness/systems.mjs` | the shared vocabulary exported — the word `export` and nothing else |
| `review/act-2/script-diff.json`, `review/act-2/harness/check-states.json`, `review/batch-a/smoke-batch-a.json` | the evidence |

**Out of scope, changed anyway: none.** No motion, no Gate 3, no implementation, no legacy-deck change, no dark-field generation, and no Act III work beyond §1.4's record.

## Commits and tag

```
dddf8ec  docs: the Act II states brief arrives
38b5ce6  docs: the presenter's Act II script draft, as placed
940799d  review(act-2): the four ARGUABLE rows ruled — the map becomes law
b93e371  review(act-2): the §0 convention ruled — treatment
88f086c  review(act-2): palladium stays — recorded so the question does not reopen
397aa19  docs: the standing Act III markup, recorded where it will be looked for
09fa00b  docs(batch-b): the Act II scripts installed verbatim, the maps frozen at 33
a21f6f5  review(act-2): export the systems sheet's vocabulary for the states sheet
769ae15  review(act-2): the beat-state builders — 33 beats, each built by its class
8939bff  review(act-2): the states pipeline — capture ordered by burden, checks by class
e8c13ee  review(act-2): the sheet — 40 cells, 33 beats, the record and the evidence
```
**Tag:** `act-2-states` at the report commit.

---

# 7. Flagged, not improvised

1. **The Act III markup and the architecture point at each other, and I did not resolve it.** The pre-classification governs *the monetization-stages timeline*; the architecture's *"what dies"* list retires **the monetization ladder** by name, moving Boyapati's stages to the notes and giving Scene 13 its content. Either the timeline survives as a frame and that line needs an amendment, or the architecture stands and the ADAPT is a class for a frame nobody will build. **One word from you settles it**, and it is raised now — before anyone builds against either reading — rather than when Act III's package is written.
2. **The vault has no grammar glyph, and I did not invent one.** `vault` is a dark-field subject; the register boundary keeps the render out of a diagram (master §6.3). The vault position therefore carries **the gold mark inside a drawn enclosure**, with the word naming it — which is the icon grammar's own recorded answer for a thing with an exact name and no distinctive form. Composed from the existing set; nothing was added to it. **If you want a vault glyph, that is a studio round, not a states session.**
3. **`s7-b5` renders its paired lines on cleared black, and whether the detachment holds under them follows the b4 selection.** Rendering it over one candidate would have pre-empted your choice.
4. **The contender row sits high in the frame at the legacy's own camera**, leaving the lower half open. That is `FRAMES.row`'s own composition and I did not touch it — in the legacy it carried a law line at the last build, and in Scene 5 the wound is the only thing there. Named for your eye, not as a defect.
5. **S8-F2's reservation stands unexercised.** The chart ships as the legacy's, ruled PORT. If it clashes with its neighbours when you watch Scene 8 in sequence, the ADAPT is available — and it would be a **new** ruling rather than a reopening of this one.
6. **The systems sheet's other twelve cells stay on file, unused.** Only S9-F1's three survived the map. Nothing was retired or moved.
7. **The strip's two open questions ride on** (the systems report §7.1–7.2): the bitcoin position's register, and whether the CLAIM station takes the accent. The sheet renders the strip monochrome, as that sheet's candidates did. Not resolved here.
8. **Everything Batch A's §12 disposition and the restoration report §7 send to your eye or to the GATE rides on**, untouched.

---

# 8. Deferred to the GATE

No deck-wide suite ran beyond the smoke's own full traversal: no landed-state proof (nothing in `src/` changed, so Batch A's 33/33 stands untouched), no direct-entry matrix beyond the 33, no brightness or composition audit over the legacy slides, no freeze checks. **No gate was widened.**

---

# 9. Remaining judgment calls — all yours

- **The nine `pending-selection` cells** — one per frame (§4.1).
- **The seven `pending-review` adaptations** — did the one change land, and did anything else move (§4.2).
- **The Act III timeline flag** (§7.1) — the one that blocks a future map rather than this one.
- Whether the vault wants a glyph (§7.2), and the strip's two open questions (§7.7).

---

# 10. Recommended next step

**Your sixteen verdicts on `review/act-2/states/sheet.html`.** They close the last open design questions in Act II and unlock **Prototype Gate 3** — the architecture morph, with the claim threading the carriers — and then Batch B implementation.
