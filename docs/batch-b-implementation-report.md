# Batch B Implementation, Session 2 — Report
## Scenes 8, 9 and 10 built, Act II spliced into the deck, and the batch closed

**Mode: FAST.** Scoped verification, and this time the scope is the whole batch: the 37 landed states proven per pixel against their approved cells in the spliced deck, the full 39-slide deck traversed both ways, cold entry and reduced-motion parity at every Act II build, the static gates, the eleven-question scene test on all six scenes, and the production build. No deck-wide register/brightness/composition audit and no legacy-slide re-verification — those are the GATE's, and §5 says so by name.
**Branch:** `film-rebuild`. **Prior tag:** `act-2-impl-1`. **Tag:** `batch-b`.
**Date:** 31 August 2026.

---

# 1. The review — in plain English

**Act II is in the film.** The deck runs 39 slides end to end, Scenes 5–10 sit at positions 6–11, and six legacy slides left the running order with their files untouched on disk. Every one of the 37 settled frames is the still you approved, proven pixel against pixel.

**What this asks of you is one thing: watch it.** By your own ruling 3 the act viewing is the gate — run the deck from Scene 5, forward at speaking pace, then backward, motion on and reduced motion. The batch closes on your word.

**What to judge, by name.** These are the four legs of the claim's journey, plus the ports:

1. **The entry (Act I → Scene 5).** The held claim is picked up exactly where Scene 4 set it down and carried into the act, where the first carrier forms around it.
2. **The certificate travel (Scene 7 beat 4).** The vault settles into custody, the certificate leaves its orbit, and the dependency line draws *back* — it went, and it still owes.
3. **The dissolve (Scene 7 → Scene 8).** The paper claim takes the forms' box and the glowing ledger rises through it while the paper releases a beat late. Money becomes information on screen, not in a sentence.
4. **The arrival (Scene 9 → Scene 10).** The strip's line draws, the claim enters at its left end and **walks the strip** — one station lighting at a time, the station behind it receding — and at BITCOIN it rises into the newest body and is absorbed. The frame it leaves is the approved cell exactly: no disc, because the disc is never a station.

And the ports: the competition record, the periodic elimination at the legacy pacing, the four-currency chart, the entrant block, the palladium panels. The test on each is the one you set — **it should move like it always did.**

**Three things I decided that you may want to decide differently.** Each is one word to change, and none of them touches an approved cell.

- **The three new boundaries are all morphs.** Scene 7 into Scene 8, Scene 8 into Scene 9, and Scene 9 into Scene 10 are built as morphs rather than cuts, because in each case the script hands the same subject forward — "watch what happens when the trust gets stretched", "keep your eye on the ledger", "the architecture is what the rest of this story knows how to judge". With Session 1's two, Act II now has one cut (Scene 5 into Scene 6) and four morphs. If that reads as too smooth — if the act wants another hard break — say which boundary and it is one ruled iteration.
- **The thing that dissolves in Scene 8 is the gold certificate, not the Prologue's paper note.** The map says Scene 8's dissolve ports P1's cross-dissolve and names its two approved frames as paper → `ledger_glow`. But `paper` is assigned to the Prologue's morph and is not in Act II's asset manifest, while the certificate is the paper claim this act has been following since Scene 7. I used the certificate. Nothing settled carries it — it exists only inside the gesture.
- **The claim walks the strip at its full size, on the line.** The traveler is the same 116-pixel disc it has been all film, riding the drawn line — which means it is wider than the gap between the line and the station names beneath it, so the walk is timed instead: a station's good and marker light while the claim is standing there, and its words rise only once the claim has moved far enough along to clear them. If the disc should be smaller on this surface, or ride above the line instead, that is a number rather than a redesign.

**Four things I found that are worth your eye, and that I did not change.**

- **The claim is not on screen in Scenes 8 and 9.** `AGENTS.md` §7 lists the Claim Mark as "the through-line, as the carriers change beneath it (**Scenes 5–9**)". In the approved cells the disc appears in Scenes 5, 6 and 7, and in none of Scene 8's or Scene 9's settled frames; it returns as Scene 10's traveler. The approved record is the approved record and I did not add it anywhere — but the architecture's sentence and the approved set disagree, and that is worth one word from you.
- **The two rails read the accent differently.** On Scene 5's ported record the live station's marker is orange, because that is what `EvolutionRail` does with its active stop. On Scene 10's strip the live station's marker is white. Both frames are approved cells. If orange should mean "the live station" on both rails, that is a re-render of two cells.
- **Scene 8's chart leaves its lower third empty** — which is exactly the clash the provenance map reserved an ADAPT for. In the legacy slide the chart stood over a dimmed rail that filled that space; standing alone in Scene 8, the bottom of the frame is black. The map says an ADAPT is available *only* if your in-context viewing rules a clash. This is that viewing.
- **The word "chapter" appears three times in the Act II script** ("before this chapter ends", "the real question of this whole chapter", "the most important sentence of this chapter"). It appears nowhere in Act I's or the Prologue's scripts. It does not name the medium, so it does not violate the self-reference ban, and I did not touch presenter-approved words — but your voice pass may want to look at it.

**What is not in this report, honestly.** No deck-wide brightness, register or composition audit; no re-verification of the surviving legacy slides; no second-window notes check. FAST defers all of those to the GATE, and the report that skipped saying so would be claiming the strong mode.

---

# 2. Implemented

## 2.1 Scenes 8, 9 and 10

Three scene modules joined the act's shared stage, which now spans all six scenes and 37 builds as one continuous world. **No settled state anywhere is authored: every one is transcribed from `review/act-2/harness/states.mjs`**, the builders that rendered the approved cells, and the landed-state proof closes it mechanically.

**Scene 8 — Fiat: Money Becomes Information (5 beats).** The dissolve landing, 1971, the capture named, the record, both facts. The dissolve is the port: the dark-field register's own 520 ms reveal with the outgoing form released 180 ms late — the exact mechanism `.p1-form[data-visible="false"]` ships — running the paper claim into `ledger_glow` in P1-F2's approved study box, each form in the aspect its render arrives in. `2-07`'s chart is rebuilt against the legacy's own classes with `src/data/purchasing-power.js` untouched, and **the stage root carries the slide root's class and `data-step`**, without which the severance's series labels do not render at all. That is what makes it the treatment rather than a copy of its geometry.

**Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats).** The network formation, the facts, the capabilities, the honest line, the distinction. The network is the selected system built from the systems sheet's own numbers and its own seeded LCG, so the chords are the candidate's chords and not a re-roll; the morph shows the institution first — the centre holding the record with spokes to the ring — and then the centre stepping away as the mesh forms, which is the architecture's own sentence performed. The entrant block is `2-08`'s, with the coin at its head per the display-scale glyph retirement, and **the limitation arrives on its own advance at full voice while every row above it recedes** — the composition that makes "the honesty in the same breath" a fact rather than a hope.

**Scene 10 — The Trade-Off Keeps Moving (5 beats).** The strip, the history line, palladium, the bar, the pivot. The strip is staged rather than stated (below), and `3-05`'s palladium frame is ported entire — the hook lifted, both panels with their real sourced figures, the timing line, then the second epoch and the bar with the epoch lines settling back by the legacy's own `data-step` rule.

## 2.2 The new connective motion

- **The dissolve (S7→S8).** Two objects, one box, no black between them.
- **The hub dissolving (S8→S9).** The two weights are the argument: what is going out at 0.2, what is coming in at 0.35.
- **The walk (S9→S10).** The line draws; the claim enters at its left end and travels station to station. Each station lights as the claim arrives — the good on the band, the marker on the line, then the gain and the dependency landing *behind* the disc — and recedes to the prior step as the claim moves on. At BITCOIN the traveler rises into the render's own box and is absorbed. **The settled frame is the approved cell exactly**: the disc is gone, because the ruling of 31 August makes it the traveler and never a station.
- **The two splice seams**, walked and reported rather than smoothed: Scene 4 into Scene 5 (the claim's coordinates match across the engine's standard crossfade) and Scene 10 into the surviving legacy deck.

## 2.3 The manifest splice

Scenes 5–10 enter at their architecture order, immediately after Act I. **Every superseded file stays on disk and in history**; the manifest lost its import and its array entry and nothing else.

| legacy id | superseded by | why — the ruled source, not a resemblance |
|---|---|---|
| `2-04-the-competition-record` | **Scene 5** | S5-F2's PORT source: the contender row Scene 5 mounts, its verdicts and its camera move |
| `2-05-two-survivors` | **Scene 6** | S6-F2's PORT source: the elimination, one wave per advance, exactly as it performs it |
| `2-06-the-abstraction-ladder` | **Scene 7** | the only row whose source is recorded in the **cells** rather than in the map's frame table: `s7-b1`'s source is "the Evolution Rail's own gold wound" and `s7-b2`'s is "EvolutionRail's recorded COINAGE riser note", and both of those are `2-06`'s beats. Scene 7's beats 1–3 are that slide's argument — the wound, the coin, the vault receipt — and the enlargement rung it plants in PAPER's line is the protected phrasing Scene 7's script carries |
| `2-07-the-severance` | **Scene 8** | S8-F2's PORT source: the four-currency chart, ported whole (its dated-fact treatment is also S5-F3's ADAPT source) |
| `2-08-the-pattern` | **Scene 9** | S9-F2's PORT source: the entrant block (its capture thesis line lands on Scene 8's beat 3) |
| `3-05-the-palladium-test` | **Scene 10** | S10-F2's ADAPT source: architecture Ruling 4 placed palladium in Scene 10 as the bar |

**Old count: 39. New count: 39.** Six legacy slides out, six scenes in — the count is unchanged because Act II's six scenes replace exactly six slides, which is a coincidence of arithmetic and not a target. (For the longer record: the pre-film deck was 45, Batch A took it to 39 by putting five scenes in place of eleven slides, and Batch B holds it at 39 with eleven scenes now in the film.) Act II runs at deck positions **6–11**. The `origin` section is now empty and leaves the sections list, exactly as `question` did at Batch A; `act-2` joins with the label *Act II — The Architecture of Money*; `function` keeps eight slides. **The evolution rail dies here as a persistent spine** — the architecture's *what dies* list, in its own words — and its content is redistributed across Scenes 5–9.

**The ambiguous fates, flagged and not decided.** Each of these is on somebody's what-dies list, and none of them is Batch B's to remove:

| what | why it is ambiguous | left as |
|---|---|---|
| `3-00-waypoint-function` and `3-08-waypoint-judge` | The architecture retires "the waypoint device" by name, and Batch A already removed `1-05-the-promise` on that ground. But no Act II scene supersedes either of these, and `3-00` is now the slide Act II hands into — so the film's Act II currently opens the legacy deck through a waypoint interstitial. Removing them is Act III's batch, or a ruling. | **in the deck, untouched** |
| `3-03-the-order-of-monetization` and `3-04-stage-signatures` | The monetization ladder is on the what-dies list and goes to Scene 13's coordination logic — which is Batch C's scene, not this one. | **in the deck, untouched** |
| `2-04`'s featured-moment slot | The `metals` render lit that slot when it was ingested, by that mechanism's own design. `2-04` left the manifest with this splice, so the slot goes dark with the slide. Whether the featured-moment mechanism has any future in the film is not a Batch B question. | **the file and its slot are on disk, out of the running order** |
| the surviving section labels | The architecture retires "the section openers and all visible chapter structure". The overview grid still shows `function`, `ideal-store` and `close` as labelled sections. That is the legacy deck's own structure, still standing where the film has not reached. | **unchanged** |

---

# 3. Files changed

## New
| file | what |
|---|---|
| `src/scenes/act-2-the-architecture-of-money/08-money-becomes-information.js` | Scene 8 |
| `src/scenes/act-2-the-architecture-of-money/09-scarcity-becomes-digital.js` | Scene 9 |
| `src/scenes/act-2-the-architecture-of-money/10-the-trade-off-keeps-moving.js` | Scene 10 |
| `review/batch-b/harness/install-scripts.cjs` | the script installer — the notes are injected from package §2 by machine |
| `review/batch-b/harness/proof-batch-b.cjs` + `landed-proof-deck.json` | the landed-state proof, 37/37 |
| `review/batch-b/harness/smoke-batch-b.cjs` + `smoke-batch-b.json` | the batch smoke |
| `review/batch-b/harness/static-gates.cjs` + `static-gates.json` | the static gates, 17/17 |
| `docs/batch-b-implementation-report.md` | this report |

## Modified
| file | what |
|---|---|
| `src/scenes/act-2-the-architecture-of-money/_architectureStage.js` | the shared stage extended to all six scenes: the `ledger_glow` and certificate study boxes, the evidence grammar's second specimen, the two ported charts with their slide roots, the network, the entrant block, the strip |
| `src/scenes/act-2-the-architecture-of-money/_sceneModule.js` | the `protoKey` dropped at the splice |
| `src/scenes/act-2-the-architecture-of-money/05-the-function-stayed.js` | one call site updated for the evidence-grammar signature — the defect §6.7 records |
| `src/slides/manifest.js` | **the splice** — Act II in, six legacy slides out, the mapping table in the file |
| `src/proto/registry.js` | Act II left the scratch route, which is that file's own rule |
| `src/data/purchasing-power.js`, `src/data/palladium.js` | the header comments now name their real consumers (Scene 8 beat 4, Scene 10 beats 3–4) |
| `review/batch-b/harness/capture-batch-b.cjs` + `review/batch-b/strip/…` | **the completed capture strip** — extended from Session 1's three scenes to all six and re-run against the spliced deck, so the whole strip is one record of one film: **37 settled states and 29 gestures** |
| `docs/dark-field-manifest.md` | `gold_certificate`'s row records Scene 8's motion-only use, with the reason |
| `docs/batch-b-package.md` | the pipeline line: the implementation is done, the viewing is next |

**Out of scope, changed anyway.** Two data-module header comments (`purchasing-power.js`, `palladium.js`) named legacy slides that left the manifest in this batch; both are comments, both are provenance, and leaving them pointing at retired slides would have been a stale record of the kind §14's sweep exists to catch. No engine change, no legacy slide edited, no legacy file deleted, no component changed.

## Commits and tag
```
c3f506d  scenes(act-2): the shared stage carries Scenes 8-10
2bb4c70  scenes(act-2): Scene 8 - the receipt followed all the way
7269f42  scenes(act-2): Scene 9 - the ledger's centre steps away
95eba4d  scenes(act-2): Scene 10 - the strip, and the claim's arrival
9c2eb49  deck(batch-b): the manifest splice - Act II enters, six legacy slides leave
153092a  review(batch-b): the landed-state proof - 37/37 approved cells at zero pixels
620f822  review(batch-b): the batch smoke and the static gates - 199 states, 37/37 parity
c397619  scenes(act-2): the walk re-timed - the claim crosses no word it has not passed
6954ce5  review(batch-b): the capture strip completed - 37 settled states, 29 gestures
```
Plus this report, the handover and the two record updates. **Tag: `batch-b`** at the report commit. The proof, the gates and the smoke were re-run in full on the code that ships — after the walk fix, not before it.

---

# 4. Validation

| check | result |
|---|---|
| **Landed-state proof** | **37/37 at zero differing pixels**, in the spliced deck — 111 comparisons (scene ↔ archived cell, fresh cell ↔ archived, scene ↔ fresh cell), 0 console errors |
| **Static gates** | **17/17** — pacing 37 beats, verbatim 6/6 character for character, the self-reference ban, the retired-wording sweep, master §10's overclaims, the splice both ways, Batch A's eleven still out, the rails law's band clause, dead code |
| **Batch smoke** | green — §4.1 |
| `npm run build` | clean |
| **Commit granularity / tree** | the stage, each scene, the splice, each verification artifact its own commit; the tree clean at every stop |

## 4.1 The smoke, in detail

| proof | result |
|---|---|
| the deck boots spliced | **39 slides** — `prologue:2 · act-1:3 · act-2:6 · function:8 · ideal-store:19 · close:1`; Act II at positions **6–11 in architecture order**, every scene's build count matching its state table |
| forward traversal | **199 states across 39 slides**, the whole film, the sequence exactly the running order |
| backward traversal | back to the film's first frame, **monotonic**, in 85 steps — see §4.2 for why that is fewer than 199 and correct |
| the seven boundaries, both directions | 14 landings recorded: the five in-act handoffs and the two the splice creates (Act I → Scene 5, Scene 10 → the legacy deck) |
| the boundary law | **within-group `←` lands on the previous scene's END state 5/5** · **cross-group `←` enters the previous slide at build 0, 2/2** |
| cold entry | **37/37** Act II builds mounted cold through the engine's own deep-link path, all settled |
| reduced motion | **parity 37/37** — every reduced-motion cold entry serializes identically to its motion-on settled state |
| deep links | **6/6** Act II scene ids resolve · **6/6** retired ids no longer resolve and open the film's first frame |
| console | **0 errors** |

## 4.2 What the backward walk actually does, stated plainly

The film walks backward to its first frame in fewer steps than it walks forward, and that is the engine's designed behavior rather than a defect: **inside a scene group `←` hands the shared stage back to the previous scene's END state** (a scene's build-0 birth is never a valid landing mid-world), and **across a group edge the deck-wide convention is unchanged — `←` enters the previous slide at build 0, with `↑` as the jump-to-end key.** Both splice seams are group edges, so both land at build 0. The smoke asserts both halves of that law rather than counting steps and hoping. Batch A recorded the same shape.

---

# 5. The eleven-question scene test

Run per `docs/scene-test.md`: every scene against every question, **pass** or **tension with a one-line note**, no aggregate and no score. Questions 10 and 11 are answered by construction wherever a settled state is a presenter-approved cell — which here is every settled state of all six scenes, each proven at zero differing pixels. Questions 1–9 are assessed in earnest. **Tensions are flagged, never fixed: a fix is a new decision, and a batch makes none.**

## Scene 5 — The Function Stayed. The Carrier Changed.
| # | verdict | note |
|---|---|---|
| 1 | pass | Every frame's subject reads at a glance: a claim inside a body, a lineup of goods with verdicts, a dated fact. |
| 2 | pass | The wound-per-good structure *is* the argument — a competition with casualties — and the containment composition *is* the thesis. |
| 3 | pass | Beat 5 carries five labels and three wound lines, which is a record rather than prose; removing one removes evidence. |
| 4 | pass | Three eliminations happen before beat 7 names the pattern. The naming arrives after the demonstration. |
| 5 | pass | A lineup because the idea is a sequence of candidates; a containment because the idea is containment. |
| 6 | **tension** | Act I hands over through the engine's standard crossfade, not a shared stage. The claim's coordinates match exactly across it — whether that reads as one object carried over is for the viewing. |
| 7 | pass | Beat 8 is literally the next question. |
| 8 | pass | Orange is the claim, and on the record the live station's marker takes the accent. (See §6.2 — Scene 10's strip does not.) |
| 9 | pass | Every frame carries its own subject; beat 6 is a typographic frame and is its own text. |
| 10 · 11 | pass by construction | `s5-b1` … `s5-b8`, approved cells, zero differing pixels. |

## Scene 6 — Gold: Scarcity in Matter
| # | verdict | note |
|---|---|---|
| 1 | pass | A gold study, then the periodic table — both read instantly. |
| 2 | pass | The elimination performs the argument: each wave removes a region and the survivors are what is left standing. |
| 3 | pass | One wave line on stage at a time, the legacy's own rule. |
| 4 | pass | The viewer reaches "two survivors" as the frame does. |
| 5 | pass | It is the periodic table because the argument is over the elements. |
| 6 | **tension** | The Scene 5 → Scene 6 boundary is a deliberate cut (Session 1's judgment: the question changed), so the previous visual does *not* transform into this one, by design. The paradigm rule permits it; the call is yours at the viewing. |
| 7 | pass | Beat 9 ends on the weight, and the script points straight at what people built to escape it. |
| 8 | pass | The claim returns at beat 8 wearing GOLD; elsewhere the scene is monochrome. |
| 9 | pass | The wave lines carry the frames without the notes. |
| 10 · 11 | pass by construction | `s6-b1` … `s6-b9`, approved cells, zero differing pixels. |

## Scene 7 — Claims on Gold: Portability Through Trust
| # | verdict | note |
|---|---|---|
| 1 | pass | A body, a coin, a vault, a vault-and-a-certificate-with-a-line. |
| 2 | pass | Beat 4 explains detachment-with-dependency in a single drawing. |
| 3 | pass | One line under the detachment, two on cleared black at the close. |
| 4 | pass | The claim is seen leaving, and the tie seen holding, before any word names the trade. |
| 5 | pass | The photograph-plus-line pattern is Act I's, reused because the idea is the same kind of idea. |
| 6 | pass | The Scene 6 → Scene 7 morph: the mass diagram recedes and the composition it interrupted returns under gold's own recorded wound. |
| 7 | pass | The scene ends pointing at the trust being stretched to breaking. |
| 8 | pass | The claim disc is orange at beats 1–2; beats 3–5 carry no accent, and none is needed. |
| 9 | **tension** | The dependency line is the service path's own voice — 1.5 px at 0.35. It is correct and consistent with Act I, and it is also the quietest load-bearing mark in the act. Worth one look at projection size. |
| 10 · 11 | pass by construction | `s7-b1` … `s7-b5`, approved cells, zero differing pixels. |

## Scene 8 — Fiat: Money Becomes Information
| # | verdict | note |
|---|---|---|
| 1 | pass | A glowing ledger entry, a date, a sentence, a chart, two lines. |
| 2 | pass | The chart *is* the evidence; the dissolve *is* the transformation. |
| 3 | pass, with a note | Beat 3 is the act's only paragraph-length frame (21 words, three lines). It is the pattern slide's protected wording — shortening it would weaken protected history, so it stays as it is. |
| 4 | pass | Every line is seen ending below where it began before beat 5 names the residue. |
| 5 | pass | A chart because the argument is a measured record. |
| 6 | pass | The strongest transformation in the act: the paper claim becomes the ledger on screen. |
| 7 | pass | "Keep your eye on the ledger, because the story isn't done with it." |
| 8 | **tension** | No accent anywhere in Scene 8's settled states — the claim is not on screen. See §6.1: the architecture lists the claim as the through-line through Scene 9. |
| 9 | pass | Beats 1, 2 and 4 survive without the notes; 3 and 5 are the notes' own words on screen. |
| 10 · 11 | pass by construction | `s8-b1` … `s8-b5`, approved cells, zero differing pixels. **Observation, not a verdict:** beat 4's chart leaves the lower third of the frame empty, which is the exact clash the map reserved an ADAPT for (§6.3). |

## Scene 9 — Bitcoin: Can Scarcity Become Digital?
| # | verdict | note |
|---|---|---|
| 1 | pass | A network; then a named asset with its facts. |
| 2 | pass | The mesh explains distributed validation without a word on the frame. |
| 3 | pass | Beat 4 holds five text blocks, and the recession does the hierarchy — the honest line is the brightest thing on the frame and the rest has visibly stepped back. |
| 4 | pass | The centre is seen leaving before any word says "no issuer". |
| 5 | pass | A mesh because the idea is a mesh. |
| 6 | **tension** | The morph's premise — the ledger persists — is carried by the script's instruction, not by an object on screen: Scene 8's last settled frame is two statements on black, and the ledger was last *seen* four beats earlier. |
| 7 | pass | Beat 5's distinction hands "the architecture" straight to Scene 10. |
| 8 | **tension** | No accent anywhere in Scene 9's settled states. See §6.1. |
| 9 | **tension** | The still shows a faint hub and a bright mesh — both states at once — but not which one is arriving. The direction of the change is carried by the motion and the script. The selected candidate's own caption says the argument is in the two weights, so this is the system working as chosen; it is still a real limit of the still. |
| 10 · 11 | pass by construction | `s9-b1` … `s9-b5`, approved cells, zero differing pixels. |

## Scene 10 — The Trade-Off Keeps Moving
| # | verdict | note |
|---|---|---|
| 1 | pass | Four goods on a line; then two labelled panels. |
| 2 | pass | The strip explains gain-and-dependency per architecture, one station at a time. |
| 3 | **tension** | Beat 4 is the densest frame in the act — hook, two panels, timing line, second epoch, bar. It is already at its ruled compression (Ruling 4 put the beat here in two advances), and the two-epoch honesty travels with the port by the map's own note, so tightening further would cost the thing that answers the fair objection. |
| 4 | pass | The claim walks the line and the pattern is seen before beat 2 names it. |
| 5 | pass | The strip is the rail grammar because the idea is a sequence of trades. |
| 6 | **tension** | The Scene 9 → Scene 10 link is verbal — "the architecture" carried across — rather than visual: the strip starts from cleared black. Judged a morph on the persistence of the idea; the call is yours. |
| 7 | pass | Beat 5 is the pivot that opens Act III. |
| 8 | **tension** | The strip's live station is white where Scene 5's ported rail marks its live stop in orange. Two rails, two readings of the accent. See §6.2. |
| 9 | pass | The strip and both palladium panels are labelled and survive without the notes. |
| 10 · 11 | pass by construction | `s10-b1` … `s10-b5`, approved cells, zero differing pixels. |

**Ten tensions across six scenes, none of them fixed.** They fall into four groups:

- **Four are boundaries** (question 6): the Act I → Scene 5 seam crossing through the engine's standard crossfade, the deliberate Scene 5 → Scene 6 cut, the Scene 8 → Scene 9 morph whose premise is spoken rather than shown, and the Scene 9 → Scene 10 link that is verbal rather than visual.
- **Three are the accent** (question 8): Scenes 8 and 9 carry no accent because the claim is not on screen in any settled state, and Scene 10's strip marks its live station white where Scene 5's rail marks its live stop orange.
- **Two are what a still can carry without its notes** (question 9): the dependency line's very quiet voice in Scene 7, and the network still in Scene 9 showing both states at once without showing which is arriving.
- **One is density** (question 3): Scene 10's palladium frame, already at its ruled compression.

Every one of them goes to the viewing.

## The retelling test

The act's idea, as a cold viewer should be able to give it back: *money is a competition decided by properties, and every architecture buys a gain by taking on a dependency.* The act states it twice in its own words — beat 7 of Scene 5 ("The function stayed. The carrier changed.") and beat 1 of Scene 10, where all four trades stand on one line with their gains and their dependencies — and the strip is the frame a viewer would draw from memory. **This is preparation for the viewing, not a substitute for it:** the retelling test is passed by a cold viewer, and the only cold viewer who counts is a real one.

---

# 6. Flagged, not improvised

1. **The claim is absent from Scenes 8 and 9.** `AGENTS.md` §7's state list has the Claim Mark as "the through-line, as the carriers change beneath it (**Scenes 5–9**)". In the approved record the disc is on stage in Scenes 5, 6 and 7, and in none of Scene 8's or Scene 9's five settled states; it returns in Scene 10 as the traveler, which the CERTIFICATE ruling makes its only role on a rail. **Nothing was added anywhere** — the approved set governs — but the architecture's sentence and the approved cells disagree, and closing that gap is a ruling, not a session's call.
2. **The accent's two readings.** `EvolutionRail`'s active stop takes `--accent`, so Scene 5's record marks METALS in orange. Scene 10's strip, built by the states sheet, marks its live station in white at 0.85. Both are approved cells and both ship. If the accent should mean "live station" film-wide, two cells re-render.
3. **Scene 8's chart and its reserved ADAPT.** The provenance map ruled S8-F2 a PORT and recorded one reservation in writing: *"an ADAPT is available later only if the presenter's in-context viewing rules a clash"*, weighed against the fact that "Scene 8's chart stands alone where the legacy's stood over a dimmed rail". It does stand alone, and the lower third of the frame is black. This is the viewing the reservation was written for.
4. **The dissolve's outgoing subject is a judgment.** S8-F1's port names `p1-b6` → `p1-b7-glow` — that is, `paper` → `ledger_glow`. I used `gold_certificate` instead, because `paper` is assigned to the Prologue's morph and is absent from Act II's asset manifest, while the certificate is the claim Scene 7 just sent out of the vault. It appears only inside the gesture; no settled state carries it. Recorded in the dark-field manifest's own row, and reversible by one word.
5. **The traveler's ride on the strip is derived motion.** No approved cell fixes where the claim sits while it walks the line, because no settled state carries it there. It rides at the claim's recorded 116, centred on the drawn line, and every station's words land behind it. The absorption target — the centre of the BITCOIN render's box — is the approved cell's own geometry. Nothing else about the walk is derived.
6. **The three new boundaries are judgments from the paradigm rule.** The architecture rules *morph when the idea persists; cut when the question changes* but does not name S7→S8, S8→S9 or S9→S10 individually. All three are built as morphs, for the reasons in §1. Act II now stands at one cut and four morphs.
7. **A defect this session introduced and fixed, recorded rather than smoothed.** Generalizing the evidence grammar to carry a second specimen changed `GEOM.evidence` from an object to a function. `applyState` was updated; **Scene 5's beat-6 gesture was not**, and it threw a `TypeError` mid-flight. Every settled state still matched its cell, so the pixel proof passed clean — the fault lived only in the motion between two correct frames. The batch smoke's console-error check is what caught it. The fix is one call site; the lesson is that a per-pixel proof of settled states is not a proof of the gestures between them, and the smoke is not optional.
8. **A second defect, found in the capture strip and fixed.** The walk's first build claimed in its own comment that the station labels land behind the claim so the disc never crosses a word it has not passed. The capture proved otherwise: the disc parked on the lit `GOLD` label for about a second, because the words landed 0.42 s after the station lit while the claim did not leave for another 1.2 s. **The capture strip is what caught it** — the settled frames were correct, so neither the pixel proof nor the smoke could have. The walk is re-timed on stated clearances rather than taste: a station's good and marker light while the claim stands there, and its words begin to rise 0.95 s later, by which point the disc's near edge has cleared the 340 px label box. A station now holds full voice from its own words landing to the next station's, which is the recession rule read as a journey.
9. **A harness fragility, not a deck fault.** The smoke's first run timed out on its 26th consecutive cold entry: one long-lived page across 74 mounts exhausts the renderer. The page is now recycled on a fixed cadence and on every retry, since a retry on the page that just timed out proves nothing. No deck behavior changed.
10. **"Chapter" appears three times in the Act II script**, and nowhere in the Prologue's or Act I's. It does not name the medium, so the self-reference ban is not engaged and the gate passes. The words are presenter-approved and were not touched.
11. **Backward navigation at the two splice seams, stated so it is not a surprise.** Stepping back with `←` from Scene 5's first frame lands on **Scene 4 at build 0**, not at its end — and likewise from `3-00`'s first frame into Scene 10. That is the engine's deck-wide convention for a cross-group boundary (`↑` is the jump-to-end key), it is what Batch A shipped at its own act boundary, and it is asserted rather than tolerated in the smoke. Inside Act II the five boundaries do hand back to the previous scene's end state, because the six scenes share one group. Nothing here was changed; if the act boundary should reverse into Scene 4's last frame instead, that is an engine convention and a ruling, not a batch's call.
12. **Everything Session 1 sent onward still rides**: its two boundary judgments (S5→S6 the cut, S6→S7 the morph), the entrant head's derived box, S6's notes excluding the package's bracketed re-split annotation (the verbatim gate compares the `[→]` blocks, and this is the recorded reason), the Act III timeline flag, and the systems sheet's unused cells on file. The two items Session 1 said would resolve at the splice have: the legacy `2-08` entrant's drawn glyph left the deck with the slide, and the S4→S5 seam is walked in §4.1.

---

# 7. Remaining judgment calls — all yours, all at the viewing

- **The act viewing is the gate** (ruling 3). The claim's journey by name — the entry, the carrier handoffs, the certificate travel, the dissolve, the arrival at the strip — plus every port moving as it always did, the vault frame, both rails, and the coin everywhere the asset appears.
- **The nine scene-test tensions** (§5), the **four findings** in §1, and the **twelve flags** in §6.
- **The ambiguous splice fates** (§2.3): the two waypoints, the monetization ladder's two slides, `2-04`'s featured-moment slot, and the surviving section labels. All four are recorded and none is decided.

---

# 8. Recommended next step

**Watch the act.** Run the deck from Scene 5 at speaking pace, forward then backward, motion on and reduced motion, and give the word. Ruled iterations follow anything that disappoints; on the word, Batch C's package (Act III) is prepared in chat.
