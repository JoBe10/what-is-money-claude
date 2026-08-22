# R7.4 Phase Report — Section 4 Resolution

**Branch:** `rebuild-r7-1-harmonization` (not merged) · **Base:** `main` at `b029e4d` · **Continues:** `docs/r7-report.md` → `r7-1` → `r7-2` → `r7-3`
**Brief:** `docs/r7-4-session-brief.md` · **Mode: FAST** (AGENTS.md §14.0, added by this session's §A)
**Date:** 12 August 2026

> **Status: complete.** All seven sections of the brief are implemented, in FAST
> mode: build clean, every build of every changed slide rendered and
> direct-entered, reduced motion passed for those slides, before/after
> screenshots under `review/rebuild-r7-4/`, and the two contact sheets the
> presenter has to rule on delivered. **No deck-wide suites were run** — that is
> what FAST means, and §8 of this report says exactly what the next GATE owes.
>
> The deck is **45 slides**. The argument, all fifty scores and 4.23 are
> untouched.

---

## A. The session modes

`AGENTS.md` §14.0. FAST is scoped verification for iteration; GATE is the full
suite, before any merge and at R5/R6. The wording that matters is the middle
paragraph: *a change made in FAST mode is not "unverified" — it is verified
locally and guaranteed globally at the next GATE.*

Two obligations were written in alongside it, because they are the two ways a
mode like this goes wrong, and both were tested within the hour:

1. **Never widen a gate to make a FAST session pass.** R7.3's static gate now reports eight failures. Every one is this phase doing what it was told, and **not one of them was edited away** — §8 lists them.
2. **Say which mode ran.** This report says FAST four times.

---

## B. The register correction

R7.2 kept Section 4's five candidates in the line grammar at every size, on the
reasoning that one asset must not be a photograph on one slide and a mark on
another with no designed handoff between them. The presenter's ruling reverses
the emphasis, and the correction turned out to be a rule rather than a taste:

> **Display scale is the sensory register; diagram scale is the grammar.**

The handoff exists after all, and it is the one Section 2 already makes at 2.4:
a good is a render where it is being *shown to you* and a mark where it is an
*entry in a structure*. A 180 × 150 candidate standing alone on a frame is the
first; a 56px cell in a fifty-score table is the second.

Because every call site already passed `compact` correctly, the change is
confined to `ComparisonAssetHeader.js`. Now photographic: the five-candidate
lineup (4.15), the migration slide, the monetary-premium and other-assets
slides, the coexistence slide, and the marginal decision. Still grammar: the
comparison table's headers and the rail.

**One call site asks for the register explicitly.** 4.21 passes `compact: true`
for its box and `darkField: true` for its register, because its five candidates
are the choice itself rather than cells in a table. The boundary is function,
not just size, and the component now lets a caller say so.

**The assets.** `property` and `shares` restored from `85bad44^` and passing
unmodified. `fiat` fails four clauses of five — corner 34.79, border 14.70,
R−B **+4.6** — which is a neutral key on a lit ground: a different photograph,
not a badly graded one. It is documented for regeneration with a prompt, and it
stubs to its mark meanwhile, so the lineup completes the moment the render
lands. **That is the one gap left in the register.**

**The flagged toggle.** `TABLE_HEADERS_DARK_FIELD`, shipping `false`. Both
states are at `review/rebuild-r7-4/screenshots/table-headers/`. Worth knowing
before ruling: at 56px the renders read as small photographs and the row is
busier than the glyph row, and `fiat`'s stub sits among four photographs until
its render exists.

---

## C. The carrier — five treatments, contact sheet only

`review/rebuild-r7-4/carrier-studio/contact-sheet.png`. Five different *answers*
rather than five drawings:

| | treatment | the idea, and its cost |
|---|---|---|
| 1 | **the capsule hull** | The old capsule's confidence as an enclosure — dual stroke, low fill, the claim glowing inside. The only candidate that answers "real weight" literally; also the only one that leaves the single-stroke rule. |
| 2 | **the faceted vault ring** | A full octagonal enclosure, material stroke, its own glow. The strongest reading of "vault" — and the least openable, which is a claim the carrier argument may not want to make, since 4.06–4.09 is about carriers that *can* fail. |
| 3 | **the soft vessel** | A continuous rounded body with a low warm fill. The fill is what makes it a container rather than an outline. |
| 4 | **the minimal orbit** | One fine full ring. The quietest thing that is still an enclosure, and the only candidate that never competes with the disc's own light. |
| 5 | **no shell** | The disc alone. The honest test of whether the shell is load-bearing at all. |

Each is shown at the three scales the shell ships at and in the save/carry state
the choreography holds longest, rendered around the deck's own `LuminousDisc`.

**Nothing is applied.** `CarrierShell.js` is untouched and still ships R7.2's
banded wall; the candidates live in the harness with no importer in `src/`, and
a gate proves both. Applying a selection means copying its markup into the
component and changing one letter.

**The 100-YEARS overlap is fixed.** "100 YEARS" sat at −68px, exactly on the
shell's upper arc terminals — label and carrier occupying the same pixels at
every build the shell was on stage. It clears the shell's outer radius now.

---

## D. The deletions

1. **The corner-frame motif** on the inversion stage: four viewfinder brackets that appeared on one slide, meant nothing, and asked to be decoded. Deleted, with its CSS.
2. **4.15's closing line.** "The framework is explicit. The scores are judgments." is off screen; the point survives in the spoken layer and lands again at the table. The build it occupied now recedes the question it has just answered, so the last frame before the table is the five candidates and nothing else — an advance that changed nothing would have been worse than the line.
3. **The comparison table reveals all fifty scores on one advance.** The 5 + 5 split was giving the walk-through somewhere to breathe and asking the viewer to read the table twice. The script's two score paragraphs merge with no words lost. 4.16: three builds → two.
4. **The falsifiability slide is deleted.** Its three conditions, its closing line and its Q&A arsenal are preserved word for word as the closing passages of 4.20's script, and the deck's second **"Don't trust. Verify."** is retired with it — the line is on stage once now, at the table. The freeze register records the amendment; the manifest, the `QuietKicker` note and three harnesses were updated so the next GATE tests the deck that exists.

**The judgment call in §D.4, flagged.** The brief asked for those passages to be
closing `[→]` passages. They are appended verbatim **without their own
advances**, because five advances on a slide whose visual is finished would be
five builds that change nothing — which §9.4.1 forbids and the pacing gate would
fail. The deck already has this convention: the Q&A arsenal has always run after
the last arrow. If the presenter wants the advances back, the natural home is a
build per condition, which means the beat is a slide again.

---

## E. The stability slide

Replaced with one visual argument, exactly as specified: a jagged price line
draws across the upper stage under a small **THE PRICE**; beneath it a dead-flat
accent line draws under **THE RULES**; then the display statement, its second
line in accent. Nothing else on the slide.

The path is hand-authored and deliberately not a chart — no axis, no scale, no
ticks, no data. A shape that means *restless* over a shape that means *fixed*.

The steelman content is preserved word for word in the script and redistributed
across three advances instead of four: the two-question framework lands with the
price line, the architecture half and "both statements are true at once" with the
rules line, and volatility-as-stage and expectation-not-guarantee with the
statement. Two sentences were added to tie the words to the two lines now on
screen ("That is this line: restless, and it is supposed to be." / "That is this
one."). 4.20: eight builds → seven.

The brief pre-authorized deletion to script as a fallback if the rendered slide
fell short of the bar. It does not, in my judgment — the contrast carries the
whole objection in one look — but the fallback stays available and the frame is
screenshotted for the ruling.

---

## F. The carried-over fixes

**F.1 / F.2 — the surgeon and the steak.** Neither was a regression and the
phase did land: both failed R7.2's grade gate **on their ground**, and the
pipeline stubbed them exactly as designed and as recorded in the manifest. What
was true is that they were tonally right — the presenter said so, and the
measurements agreed (+114 and +59 R−B).

So they are **graded rather than regenerated**: the operating lamp and the lit
stone surface are cropped out, the surround taken to true black with a smooth
elliptical falloff, the black point lifted. Three moves a colorist makes, every
parameter recorded and re-runnable in
`review/rebuild-r7-4/harness/regrade-r7-4.mjs`. Both now pass all five clauses —
surgeon 0.00 / 0.82 / 92.1% / +133, meal 0.00 / 1.28 / 69.2% / +60 — and both
now render on their slides. The shipping set is **15 images, 75 checks, 0
failures**.

**F.3 — the migration geometry.** Every claim disc sat 13px off its connector,
and the cause was a coordinate system that did not mean what it said: the
claim's wrapper was a 90 × 36 box, `offset-path` moves a box by its own centre,
and the disc inside it sat somewhere else again. The wrapper is the disc's own
size now, so `left`/`top` *are* the disc's starting centre and each
destination's `centreX` is where that centre lands — one coordinate system for
the connector and the thing standing on it. Measured after: discs at
1110 / 1380 / 1650, connectors at 1110 / 1380 / 1650, connectors meeting the
lane exactly.

**F.4 — the self-reference sweep.** Ten instances, listed in full in §7.

**F.5 — the display rule.** The definition restages to display treatment: **AN
EARNED, TRANSFERABLE / CLAIM ON VALUE** stacked at 68px with the claim in the
accent, beneath the disc. It was 44px in `--text-secondary` — a caption under a
diagram, for the sentence the whole section exists to reach. The Section 4 audit
for other shrunk statements found one more, and it is §F.6's.

**F.6 — settle-state budgets.** 3.7's honesty line was the last word on the
frame and its quietest — 21px in `--text-muted` under three lines still at full
size. It lands at statement scale now and the caption and literacy lines settle
small and receded. Same treatment for 3.5's two epoch lines. Final-frame budget
on both: one bright statement plus labels.

---

## 7. The self-reference sweep, in full

Ten changes. One is visible copy; nine are script.

| # | slide | was | is |
|---|---|---|---|
| 1 | **3.6** *(visible)* | "This presentation's question is about the foundation asset — underneath them all." | **"The real question is about the foundation asset — underneath them all."** |
| 2 | 3.6 | "…makes the real question of this presentation precise." | "…makes the real question precise." |
| 3 | 1.4 | "The point of this presentation is to move you…" | "The point of the next hour is to move you…" |
| 4 | 1.5 | "…and it's the whole presentation." | "…and it's the whole inquiry." |
| 5 | 1.5 | "Nothing in this presentation is financial advice…" | "Nothing here is financial advice…" |
| 6 | 2.4 | "…for the rest of this presentation." | "…for the rest of the inquiry." |
| 7 | 2.7 | "The entire second half of this presentation walks into it." | "The entire second half of the inquiry walks into it." |
| 8 | 3.5 | "Before this presentation ends, we're going to hold…" | "Before we're done, we're going to hold…" |
| 9 | 4.08 | "…the rest of this presentation lives inside." | "…the rest of the inquiry lives inside." |
| 10 | 5.01 | "Nothing in this presentation is investment advice…" | "None of this is investment advice…" |

**One of these needs the presenter's eye.** The falsifiability passage §D.4
preserves *verbatim* contained "don't wait for my updated **slides**", which §F.4
forbids. It reads "my updated **scores**" now — the meaning is intact (the
scores are what would change) and the medium is gone. One word, and reverting it
is a one-word edit. The two instructions genuinely collided on that sentence;
this is the reading that satisfies both.

A gate now holds the sweep: no slide file matches *this presentation / these
slides / my updated slides / this deck / this video / this talk*.

---

## 8. Verification — FAST, and what the GATE owes

**What ran:**

| check | result |
|---|---|
| `npm run build` | clean, every commit |
| every build of every changed slide, rendered and direct-entered | **17 slides, 80 builds, 0 mis-landings, console 0** |
| the same under `prefers-reduced-motion` | **8 slides, 44 builds, 0 mis-landings, console 0** |
| `grade-r7-2.cjs` over the shipping set | **15 images, 75 checks, 0 failures** |
| `gates-r7-4.cjs` (the FAST subset) | **21 checks, 0 failures** |
| before/after screenshots | `review/rebuild-r7-4/screenshots/`, `screenshots-rm/`, `screenshots/before/` |
| the two sheets the presenter must rule on | the carrier studio; the table-header toggle, both states |

The FAST gate covers what this phase claims: the pacing invariant (**173 builds,
173 arrows, 45 slides**), the deleted slide's total absence, both rounds proved
unapplied with `CarrierShell` untouched, the three flagged toggles, every
candidate slide declaring a register, the six new renders shipping, and the
self-reference sweep.

**What the next GATE owes, stated rather than fixed.** R7.3's static gate reports
eight failures against this tree. Every one is R7.4 doing what the brief told
it, and none was edited away:

1. `no Section 4 slide file changed` — ten did. Section 4 *was* this brief.
2. `the only Section 4 CSS changed is 4.22's two brightness states` — the register correction, the stability rebuild, three deletions.
3. `only the eight Section 1–3 slides R7.3 names have changed` — five more, all from the §F.4 sweep.
4. `every shipping render has a grade-gate result` — 15 shipping, 11 in R7.3's run. The R7.4 run has all 15.
5. `1.5 untouched` — R7.3's brief froze waypoint copy; R7.4's §F.4 sweep reaches 1.5's script.
6. `"Don't trust. Verify." on stage exactly twice` — **once**, which is §D.4's ruling.
7. `no build count changed` — two did, both by ruling (4.16, 4.20).

The GATE run should re-base those scope lists on R7.4's own starting line, then
run the full matrix: traversal + direct entry, reduced motion, the register
audit, the composition sweep, the brightness gate (whose backlog baseline will
move — 4.20's and 4.15's frames changed), flash boundaries, and the freeze
checks. Three harnesses were already updated so they describe the deck that
exists rather than the one that did: the flash boundary that spanned the deleted
slide, the verify suite's slide list and its 4.20b assertion, and R7.3's
`QuietKicker` count. **That is not the same act as widening a gate** — those
edits change what a gate *describes*, not how strict it is, and each carries its
reason in the file.

---

## 9. Flagged for the presenter

1. **The carrier selection** (§C). Five treatments, nothing applied. Note the tension worth deciding on: the vault ring is the strongest "vault" and the least *openable*, and 4.06–4.09 is an argument about carriers that can fail.
2. **The table-header toggle** (§B). Both states screenshotted.
3. **`fiat` is the register's one gap.** Until it is generated, the five-candidate lineup shows four photographs and one mark.
4. **`shares` reads as banknotes at 180px.** The study is a fan of share certificates; beside a `fiat` note render, that is a collision. Worth a look before either is final.
5. **The closing-passages judgment** (§D.4) — verbatim, but without their own advances, and why.
6. **"my updated scores"** (§7) — one word changed inside a passage the brief said to preserve verbatim, because §F.4 forbade the word it contained.
7. **The stability slide's fallback** was pre-authorized and not taken. If the rendered frame is short of the bar, deleting it to script is still available and costs one commit.
8. **Carried forward, still open:** the bitcoin carrier render reintroduces V-1; R7.3's glyph studio round still awaits selections; R7.3's brightness backlog (111 departures at baseline) is unchanged and untouched by this phase.

---

## 10. Commits

- `0b526bc` §A + §B + §F.1–2 — session modes, the register correction, the two rejected renders graded
- `b54f3b7` §D + §E — the deletions, and the stability slide rebuilt around one idea
- `fde0766` §F.3–6 — migration geometry, the self-reference sweep, the display rule, settle budgets
- `8776dff` §C — the carrier's decisive round, contact sheet only
- `d89bac0` §G — the FAST gate subset, and the manifest brought up to date

Base: `main` at `b029e4d`. **Not merged.**
