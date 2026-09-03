# Act V — The Provenance Map
## Every frame of Scenes 24–30, classified against the legacy Act V sources

**Status: PROPOSED, 3 September 2026** — a proposal until the presenter rules it (`AGENTS.md` §4.9). This document classifies every frame of Act V against the legacy deck the way `docs/act-2-provenance.md`, `docs/act-3-provenance.md` and `docs/act-4-provenance.md` did: it names a legacy source for every PORT and ADAPT row, answers the staging question first (§0), and puts the ARGUABLE rows in plain English (§2) — the question stated simply, one full sentence per side, the default the states sheet renders if a row is unanswered at Session 2's launch. **Once ruled it governs all Act V work**, and every Act V session verifies a frame's class here before touching it.
**Scope:** the frames of Scenes 24–30 as the frozen architecture merges them (`docs/synthesis-architecture.md`, Act V; the master's index §1.3, rows 24–30): migration; the monetary premium; when other assets do money's job, merged with does-not-replace-everything; the marginal decision; fixed supply reprices at the margin — the UnitField; the case from first principles; the close.
**Classes:** **PORT** — a proven legacy treatment exists and is transplanted verbatim; redesign is forbidden and generating candidates is a process defect. **ADAPT** — a proven treatment with one ruled change, named here; only that change is made. **NEW** — no proven treatment exists; the full-coverage rule and the candidate process apply. **ARGUABLE** — the presenter's to rule; the two readings are written out in §2, and the table names the default.
**Authority for the treatments:** the legacy `src/slides/section-4-ideal-store/17-…` through `23-…` and `src/slides/section-5-close/01-thank-you.js`, with `src/components/section-4/` and `src/components/UnitField.js` — the frozen, audited Section 4 case (master §13, 28 July 2026: *migration; the marginal decision; fixed-supply repricing; the case as the final frame*) in its R7-through-R7.4 staging, which the architecture's "what survives" list keeps whole: *UnitField · the comparison components and data (frozen) · every script whose scene survives (most of Acts IV–V verbatim)*.
**Proposed:** 3 September 2026 (the Act V kickoff brief, Part B §1). **Ruled:** —.

---

# 0. The staging question, answered first — Act V's anchor: descending complexity to silence

Act II taught the pipeline to answer this before building anything: *what stays on screen and grows, so a viewer can follow by eye alone?* Act III's answer was the triad; Act IV's was the Claim Mark coming home. **Act V's answer is different in kind, and the architecture already wrote it down: nothing grows — everything narrows.** *"Act V economic consequence, decreasing complexity, final pure typography."* The act's anchor is a descent: from the world's savings moving between assets, to the split inside one asset's value, to the assets doing money's job, to **one claim** choosing where to go, to **one field** repriced by a sliver of demand, to **four lines and one conclusion**, to **one line on black**, to black. The viewer follows by eye because each scene holds fewer things than the last and the last thing standing is a sentence. This map records that descent as the anchor rather than proposing one, and it records where each of the brief's named stations stands:

- **The migration and the monetary premium, in the act's abstract register (Scenes 24–25).** Legacy `4-17` and `4-18` are black, white and the accent: typography and line grammar — the flow lane with its three branches, the equation assembling term by term — with the savings vehicles present as display-scale renders (the R7.4 assignment, master §6.3: *every display-scale appearance of a monetary object is a dark-field render*). The three claims that migrate along the lane are the ClaimObject — the protagonist's Act V state (`AGENTS.md` §7, state 12 begins here as savings demand seeking a carrier). Whether the vehicles' renders stand in these two scenes or retire to the grammar is **ARGUABLE row 5**; the default keeps them, on §6.3's authority.
- **The savings-vehicle renders at display scale where the architecture names them (Scene 26).** The architecture names them here — *"when other assets do money's job (merged with does-not-replace-everything; renders at display scale)"* — and the legacy already stages them so: `4-19`'s four roles and `4-20`'s five assets, each a `ComparisonAssetHeader` at the 180 × 150 display box on the dark-field register. PORT.
- **The marginal decision, asked calmly (Scene 27).** Legacy `4-21`: one ClaimObject at the decision point, five drawn paths to five candidates in the compact render box, the question at display scale — *Where does the next unredeemed claim go?* — and the asked-calmly line spoken at its R7-relocated home. PORT. This is the descent's hinge: the world's assets become one claim's choice.
- **The UnitField as the hours-field's visual rhyme — the film's bookend (Scene 28).** Legacy `4-22`'s `FixedSupplyField` is a countable grid of thirty-five units (7 × 5) drawn by `UnitGrid`, which lives in `src/components/UnitField.js` and reads its geometry from the same `UNIT_GRAMMAR` P1's canvas field draws its eighty thousand units from. **The rhyme is structural, not resembled** (master §8.3: *both run on the shared `UnitField` component*), and this map records its source as the brief asks: **P1's implemented field.** The shared geometry is the grammar's two fill fractions — a unit occupies **0.8235** of its horizontal pitch and **0.7419** of its vertical pitch — at both scales; the pitches differ by design (P1's canvas at 4.58 px on a 400 × 200 grid centred on the stage; Scene 28's DOM grid at 102 × 62 px). The density is the argument: **80,000** hours poured in at the opening, **35** units of a fixed stock at the close, one sliver of them for sale. The timing of P1's field is the legacy 1.01/1.02 numbers the Prologue ported (an 8.2 s fill behind an authored 800 ms hold; a 4.6 s collapse); Scene 28's timing is `4-22`'s own stylesheet transitions — the margin's emphasis, the three demand claims' arrival, the repricing sweeping right to left across the stock in `--reprice-order` — and none of it is re-timed here. The blob ids of both components are recorded in §3.1 so the next session proves them untouched. The class is **ARGUABLE row 4** only because the brief's phrase *derived from P1's implemented field* can be read two ways; the default is PORT, because the derivation already exists in the code and the alternative would put a frozen-argument frame back into design.
- **The case from first principles, on a full clear (Scene 29).** Legacy `4-23`: its build 0 is the kicker alone on black, so the boundary from Scene 28 is the field's world clearing fully before the case lands — an authored clear, the architecture's *"full clear"* — then the four summary lines as one gesture, then the conclusion alone: the frozen final frame (master §3.7: *Scene 29 is the true final frame of the argument*). PORT, frozen. The kicker is the one survivor of the retired header convention, kept by design (R7.1 A2); the map carries it as the frozen frame carries it.
- **The close, as final pure typography over silence (Scene 30).** Legacy `5-01`: one line of typography on black — *Thank you.* — retained exactly. Its one build before the release, the method line returning with all three waypoints completed, is the waypoint device, retired by the structure freeze (Ruling 1); the frame that remains is black, and the architecture's Scene 30 opens on it: *"Silence, then the callback."* **ADAPT** — the one ruled change is the wayline build's retirement, already ruled — with **ARGUABLE row 6** asking whether the silence is its own beat.

**The register across the act, recorded:** mixed (renders at display scale over line grammar and typography) for Scenes 24–27; the line grammar's field for Scene 28; pure typography for Scenes 29–30. **The accent's last deployments:** the migrating claims (24), the premium's halo and the closing pair's emphasis (25), the decision claim (27), the demand claims and the repricing (28), the kicker and the two bold terms of the conclusion (29); none at the close.

**The entry seam, after the Acts III–IV final rulings (3 September 2026, master §13).** Act IV now exits onto legacy `4-17` directly (the two survivors retired), so the act is entered from Scene 23's closing line — *Don't trust. Verify.* beneath the fifty scores, the render band above the table — into fiat standing with its two jobs. The legacy deck played this boundary as its own crossfade; Batch E plays it the same way, and Session 2 renders both ends as they stand.

**What the map does not decide.** Whether the three legacy entry lines are beats (row 1); where the falsifiability passage is spoken (row 2); where the rules line sits inside Scene 29's second beat (row 3); the field's class (row 4); the renders in 24–25 (row 5); the close's first beat (row 6). Everything else in the act is a port of a proven, frozen treatment.

---

# 1. The proposed map

| Frame | Class | Legacy source / ruling |
|---|---|---|
| **S24-F1** fiat standing with its two jobs — MEDIUM OF EXCHANGE · UNIT OF ACCOUNT | **PORT** — *ARGUABLE row 1 on its beat* | `4-17-store-of-value-function-migrates` build 0: the `fiat` render at the display box with the two job labels beneath; the entry line *"Fiat, holding two of the three jobs — and holding them extremely well."* is spoken over it. Serves S24 b1 at the default (the entry beat) |
| **S24-F2** the demand to save — the first claim at the lane's origin | **PORT** | `4-17` build 1: *The demand to save does not disappear.* lands; one `ClaimObject` at the origin, neutral. Serves S24 b2 |
| **S24-F3** it migrates — the flow lane, the three destinations, the claims traveling | **PORT** — *ARGUABLE row 5 on the renders* | `4-17` build 2: *It migrates.*; the lane and its three branches draw; gold · real estate · shares at the display box on the dark-field register (R7.4 §B, the R7.2 mixed assignment); the three claims ride their `offset-path` to the destinations at focus. Serves S24 b3 |
| **S24-F4** the final line | **PORT** | `4-17` build 3: *When money is not trusted to preserve purchasing power, savings demand moves into other assets.* Serves S24 b4 |
| **S25-F1** the equation opens — ASSET VALUE = | **PORT** — *ARGUABLE row 1 on its beat* | `4-18-monetary-premium` build 0; the entry line *"An asset's value, split into two parts."* spoken over it. Serves S25 b1 at the default |
| **S25-F2** the part that is easy to defend — the utility term and the three examples | **PORT** — *ARGUABLE row 5 on the renders* | `4-18` build 1: UNDERLYING UTILITY / PRODUCTIVE VALUE; real estate · shares · gold at the display box with their base labels (SHELTER / RENT · PROFITS / CASH FLOWS · ORNAMENTAL / INDUSTRIAL), one accumulating element. Serves S25 b2 |
| **S25-F3** the other part — the premium as a halo on each mark | **PORT** | `4-18` build 2: + MONETARY PREMIUM; the warm halo on the marks (R7.1 §C3 — no boxed tile), the shared label, the supporting line. Serves S25 b3 |
| **S25-F4** the closing pair, alone | **PORT** | `4-18` build 3: everything above settles to the quiet step; *Bitcoin competes for the monetary premium — not the asset's entire value.* — the architecture's own Scene 25 line, on screen. Serves S25 b4 |
| **S26-F1** the four roles, one per advance | **PORT** | `4-19-other-assets-do-moneys-job` builds 1–4: REAL ESTATE SHELTERS. · COMPANIES PRODUCE. · GOLD HAS LONG CARRIED MONETARY VALUE. · BITCOIN'S UTILITY IS MONETARY. — each a statement over its render at the display box with its function label. Serves S26 b1–b4 |
| **S26-F2** the roles' final line | **PORT** | `4-19` build 5: *It competes for the monetary premium attached elsewhere.* Serves S26 b5 |
| **S26-F3** the coexistence statements, with their assets | **PORT** | `4-20-bitcoin-does-not-replace-everything` builds 1–3 (the merge is the architecture's: *merged with does-not-replace-everything*): *It does not need to replace real estate.* · *shares.* · *absorb every store of value.* — one statement per build, the assets arriving as named (bitcoin + property at 1, shares at 2, gold + fiat at 3). Serves S26 b6–b8 |
| **S26-F4** the coexistence law | **PORT** | `4-20` build 4: *Bitcoin competes with their monetary function — not their reason to exist.* over the five assets. Serves S26 b9. **The falsifiability passage is spoken over this frame with no advance at the default (ARGUABLE row 2)** |
| the stability contrast — STABILITY, the restless price line, the flat rules line | **retired** | `4-20` builds 5–7 (the R7.4 §E module: the hand-drawn price path over the flat rules path, the rules line on screen). **Architecture Ruling 5:** the stability scene is cut and no frame is built for it; its three spoken beats are Scene 23's notes-only armor (installed at Batch D), the rules line is Scene 29's (the ledger, §1.1 of the package). The slide's `createBisection` function and its `BISECTION` table are dead code in the legacy source — never called, the table undefined — recorded as a legacy fact, not a task |
| **S27-F1** one claim at the decision point | **PORT** — *ARGUABLE row 1 on its beat* | `4-21-marginal-store-of-value-decision` build 0: the `ClaimObject` at focus at the decision point, nothing else; the entry line *"One claim, and five places it could go."* spoken over it. Serves S27 b1 at the default |
| **S27-F2** the five paths and the five candidates | **PORT** | `4-21` build 1: five drawn paths from the claim to the five candidates in the compact render box (R7.4 §B: the decision row keeps renders in the compact box), the question at display scale — *Where does the next unredeemed claim go?* Serves S27 b2 |
| **S27-F3** the supporting line | **PORT** | `4-21` build 2: *Every new unit of savings creates a new carrier decision.*; the asked-calmly line and *the monetary competition is decided at the margin* spoken (master §3.7: spoken-only). Serves S27 b3 |
| **S28-F1** the fixed stock at rest | **PORT** — *ARGUABLE row 4 on the class* | `4-22-fixed-supply-reprices-at-margin` build 0 + `FixedSupplyField`: FIXED OUTSTANDING STOCK — the 7 × 5 `UnitGrid` from `UnitField`'s grammar (§0, the rhyme's source). No spoken advance of its own; the boundary from Scene 27 lands on it (the Act IV convention for a legacy build 0 with no entry line) |
| **S28-F2** the margin — the sliver actually for sale | **PORT** — *row 4* | `4-22` build 1: *Demand does not need to absorb everything.*; the rightmost column lit as AVAILABLE AT THE MARGIN with its bracket; the three demand claims visible at 44 px, neutral. Serves S28 b1 |
| **S28-F3** the demand arriving | **PORT** — *row 4* | `4-22` build 2: *It only needs to grow against a supply that cannot respond.*; the demand claims at focus, arriving at the margin. Serves S28 b2 |
| **S28-F4** the repricing | **PORT** — *row 4* | `4-22` build 3: PRICE DISCOVERED HERE; the repricing sweeps right to left across the whole stock (`--reprice-order`); *Marginal flows can reprice the entire stock.* Serves S28 b3 |
| **S29-F1** the kicker and the four summary lines | **PORT** (frozen) | `4-23-investment-case-from-first-principles` build 1: THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES in the retired header treatment (frozen by design, R7.1 A2); the four summary lines as one gesture. Serves S29 b1 |
| **S29-F2** the conclusion — the frozen final frame | **PORT** (frozen) | `4-23` build 2: the summary clears; *Bitcoin does not need to replace everything. / It only needs to become the **preferred place** / to store the **next unit of value**.* — the case as the final frame (master §13, 28 Jul 2026). Serves S29 b2; the rules line enters the spoken beat through the ledger |
| **S30-F1** silence — black | **ADAPT** — *ARGUABLE row 6 on the beat* | `5-01-thank-you` build 0: black. **The one ruled change (architecture Ruling 1, the what-dies list):** the wayline build — the method line returning with all three waypoints completed, the warmth pulse — is retired, so nothing stands between the case and the close but silence; the callback is spoken over it. Serves S30 b1 at the default |
| **S30-F2** Thank you. | **PORT** | `5-01` build 2: one line of typography on black, no second line, no watermark, no kicker, no chrome — the frame retained exactly. Serves S30 b2 |

**Proposed: 22 PORT · 1 ADAPT · 0 NEW · 1 retired — with six ARGUABLE questions (§2), each stated with its default, none of them opening a NEW frame at the default.** Act V designs nothing and carries no candidates: the case comes home in its proven treatments, and the act's one visual continuity — the claim's last journey, from the five paths to the field — is wiring the states sheet renders and flags.

---

# 2. The ARGUABLE rows — the two sides, in plain English

Each row states the question, then the two readings in full sentences, then the default the states sheet renders if the row is unanswered at Session 2's launch (the kickoff brief's rule: *defaults flagged if absent*). One word per row closes it.

## Row 1 — Do the three entry lines become beats?

Three legacy slides speak a line over the state they are entered on, before their first `[→]`: `4-17` (*"Fiat, holding two of the three jobs — and holding them extremely well."*), `4-18` (*"An asset's value, split into two parts."*) and `4-21` (*"One claim, and five places it could go."*). In the legacy deck the advance that entered the slide was the previous slide's, so the line had no `[→]` of its own. The film's script standard says the advance that leaves a scene belongs to the next scene's script and every build is exactly one `[→]` (master §7). No Act IV source had such a line, so the question is new here.

- **Reading A — each entry line becomes its scene's first beat (the default).** One `[→]` is prefixed to the line at zero word changes; the scene's first beat is the legacy build 0 the line was always spoken over (fiat with its two jobs; the equation's left-hand side; the claim alone). Scene 24 is 4 beats, Scene 25 is 4, Scene 27 is 3 — Act V is 27. Nothing is written and nothing is dropped; the legacy's own entry advance is made explicit.
- **Reading B — each entry line folds into the first advance's words.** The line is spoken as the first sentence of the scene's first `[→]` paragraph, and the legacy build 0 becomes the first movement of that beat's gesture (the Act IV convention for a legacy build 0 with no words). Scene 24 is 3 beats, Scene 25 is 3, Scene 27 is 2 — Act V is 24. Zero word changes either way; the difference is whether the viewer sees fiat standing alone, the equation's opening, and the lone claim as settled frames or only in passing.

**The default is A**, because it keeps every legacy state a settled frame the sheet can show and the presenter can judge, and because folding a line into a beat it was never spoken over is the reading that loses a proven frame.

## Row 2 — Where is the falsifiability passage spoken?

The passage — *the three things that would send me back to that table with an eraser* — left the deck for the script at R7.4 (master §13) and was never given a scene; its legacy home is `4-20`'s closing passages, spoken over that slide's final frame with no advance. The Act IV foundation flagged its home and the presenter did not move it, so it stays Act V material (`docs/batch-d-implementation-report.md` §7).

- **Reading A — Scene 26's close (the default).** It is spoken over the coexistence law — `4-20`'s last surviving frame once the stability beats are cut — with no advance, as the legacy spoke it over `4-20`'s last frame. The package installs it there behind a marker that carries no `[→]`. Its last sentence names *Don't trust. Verify.* as a spoken mention, which the freeze allows; the line is on stage once, at the table.
- **Reading B — Scene 23's close.** Its last sentence points at the table (*"don't wait for my updated scores"*), so it could be spoken over the fifty scores instead, after *"So — where does that monetary demand actually go right now?"* — which would put it before the turn to Act V and reopen the batch-d package's Scene 23. A third reading, Scene 29's close, would speak it over the frozen final frame; the master reserves that frame for the case alone.

**The default is A**, because it is the passage's legacy home and moves nothing already installed.

## Row 3 — Where does the rules line sit inside Scene 29?

Ruling 5 keeps the rules line — *"Bitcoin does not fix its price. It fixes the rules through which the market discovers its price."* — in Scene 29's script, and the frozen `4-23` script does not contain it, so the package must place it. Its neighbourhood in the second beat is fixed: *"…scored honestly at two out of five. The case is not that the price will behave. Price should be free to move. The monetary rules should be hard to move. That's the whole case, in eleven words…"*

- **Reading A — before *"The case is not that the price will behave."* (the default).** The rules line lands as the turn from the candidate's properties to the case, and the three sentences that follow it stay together, so *"the whole case, in eleven words"* still points at the two sentences beside it.
- **Reading B — after *"The monetary rules should be hard to move."*** The rules line restates the pair it follows, but it separates the pair from *"That's the whole case, in eleven words"*, which then points at the rules line as much as at the pair.

**The default is A.** Either way the line is verbatim from legacy `4-20` and stands once in Scene 29; the presenter's word pass owns the sentence order.

## Row 4 — Is Scene 28's field a port, or is it re-derived from P1's canvas?

The brief asks for the UnitField as the hours-field's rhyme, *its geometry, density, and timing derived from P1's implemented field, recorded as the rhyme's source*. §0 records the derivation as it stands in the code: both fields read one grammar.

- **Reading A — the field is legacy `4-22`'s `FixedSupplyField`, ported whole (the default).** Thirty-five units at the grammar's fill fractions, the margin column, the three demand claims at their ruled 44 px, the repricing sweep — the frozen treatment, and the rhyme is real by construction because `UnitGrid` lives in `UnitField.js` and reads `UNIT_GRAMMAR`. The states sheet renders the cells from that implementation, which is what the brief's Session 2 line asks (*rendered from P1's field implementation so the rhyme is real, not resembled*).
- **Reading B — the field is re-derived from P1's canvas at its own density and timing.** Eighty thousand units, a fill and a collapse, with the margin and the repricing staged on that canvas — a NEW frame, which opens the candidate process on a treatment the argument freeze lists by name (*fixed-supply repricing*) and the architecture lists as surviving (*UnitField*).

**The default is A**, because it is the proven treatment and the rhyme already exists in the code rather than in a resemblance.

## Row 5 — Do the savings vehicles stay renders in Scenes 24 and 25?

The brief's §0 phrase puts the migration and the premium *in the act's abstract register*; the architecture names renders at display scale only for Scene 26. Legacy `4-17` and `4-18` carry the vehicles — gold, real estate, shares; the fiat note — as display-scale renders since R7.4, under the rule that every display-scale appearance of a monetary object is a dark-field render (master §6.3).

- **Reading A — the renders stand (the default).** The two scenes are already the act's abstract register — typography, the drawn lane, the equation — with the objects present where the legacy shows them, and §6.3 governs their form. Nothing changes.
- **Reading B — the vehicles retire to the grammar in these two scenes.** The three destinations on the lane and the three examples under the equation become compact marks — entries in a structure, which §6.3 permits at diagram scale — so the renders enter the act only at Scene 26, where the architecture names them. That is an ADAPT of `4-17` and `4-18` with one named change each, and it moves two display-scale objects to diagram scale, which the same rule treats as a designed moment.

**The default is A.** One word rules B, and the map records two ADAPT rows if it does.

## Row 6 — Is the silence its own beat at the close?

The architecture's Scene 30: *"Silence, then the callback … Thank you. No waypoint line (retired); no sequel teaser."* Legacy `5-01` has two advances: the wayline (retired) and *Thank you.* The master calls the last frame *a silent Thank you.* (§3.7) while the legacy script speaks the words *Thank you.* at its end.

- **Reading A — silence is the first beat (the default).** The advance that leaves the case lands on black; the callback is spoken over it; the second advance lands *Thank you.* Scene 30 is 2 beats, the legacy's own count, with the wayline's build replaced by the black it always started from. Black here is a scripted beat, not a seam (master §3.5).
- **Reading B — the callback is spoken over the case's frozen frame.** Scene 30 is one beat: *Thank you.* alone. The case would stay on screen while the callback runs, and the black between the argument and the close would disappear.

**The default is A.** Whether *Thank you.* is spoken, or only shown as the master's *silent* suggests, is one word in the presenter's pass; the package installs the legacy words as written.

---

# 3. PORT — the proven treatments, with their sources named

| Frame | Legacy source | What is transplanted |
|---|---|---|
| **S24-F1 · F2 · F3 · F4** | `src/slides/section-4-ideal-store/17-store-of-value-function-migrates.js` + `ComparisonAssetHeader` (display box) + `ClaimObject` | Fiat and its two job labels; the demand claim at the origin; the lane and its branches; the three destinations on the dark-field register; the three claims' travel; the two statements and the final line |
| **S25-F1 · F2 · F3 · F4** | `src/slides/section-4-ideal-store/18-monetary-premium.js` + `ComparisonAssetHeader` (display box) | The equation term by term; the three examples with their base labels; the premium halo; the shared label and the supporting line; the closing pair with the quiet settle |
| **S26-F1 · F2** | `src/slides/section-4-ideal-store/19-other-assets-do-moneys-job.js` | The four roles — statement, render, function label — one per advance; the final line |
| **S26-F3 · F4** | `src/slides/section-4-ideal-store/20-bitcoin-does-not-replace-everything.js`, builds 1–4 only | The three coexistence statements with the assets they name; the coexistence law with its qualification span |
| **S27-F1 · F2 · F3** | `src/slides/section-4-ideal-store/21-marginal-store-of-value-decision.js` + `ClaimObject` + `ComparisonAssetHeader` (compact, renders) | The claim at the decision point; the five paths; the five candidates; the question; the supporting line |
| **S28-F1 · F2 · F3 · F4** | `src/slides/section-4-ideal-store/22-fixed-supply-reprices-at-margin.js` + `src/components/section-4/FixedSupplyField.js` + `src/components/UnitField.js` (`UnitGrid`, `UNIT_GRAMMAR`) | The stock; the margin column, its label and bracket; the three demand claims at 44 px; the price-discovery label; the reprice frame and sweep; the three statements |
| **S29-F1 · F2** | `src/slides/section-4-ideal-store/23-investment-case-from-first-principles.js` + `KickerLabel` | The frozen kicker; the four summary lines as one gesture; the conclusion — the frozen final frame |
| **S30-F2** | `src/slides/section-5-close/01-thank-you.js` (`.s5c__thanks`) | One line of typography on black — *Thank you.* — retained exactly |

## 3.1 The frozen data and the rhyme's source, recorded

The comparison data files are untouched by this session and stand at the blob ids the ruled Act IV map records (`docs/act-4-provenance.md` §3.1). The rhyme's source is recorded the same way: `src/components/UnitField.js` and `src/components/section-4/FixedSupplyField.js` at their committed blob ids, printed by `review/act-5/harness/script-install.cjs` into `review/act-5/script-install.json` (`rhyme`), with the grammar's four numbers (102 · 62 · 0.8235 · 0.7419), P1's pitch (4.58) and the two densities (80,000 · 35). Neither component is touched by any Act V session before the presenter rules row 4; a change to either is a change to both ends of the film.

---

# 4. The seams flagged, not written — plain English

These are the places where the legacy material and the architecture's merges do not join mechanically, or where a legacy fact needs the presenter's eye. None is bridged by drafting; each is either closed by a ledger entry the presenter can overrule with one word, or left as it stands.

1. **The entry seam (Scene 23 → Scene 24).** Act IV's closing line — the fifty scores, the render band, *Don't trust. Verify.* — dissolves into fiat standing with its two jobs. The legacy deck played it as its own crossfade; Batch E plays the same. The spoken turn is already written at both ends (*"So — where does that monetary demand actually go right now?"* → *"Fiat, holding two of the three jobs…"*).
2. **Two self-references replaced, for the word pass.** *"the diagnosis this whole section began from"* (S25 b3) reads *"this whole inquiry began from"* — master §3.5's permitted form; *"I've spent this whole section answering objections"* (the passage) reads *"the last few minutes"* — the batch-d ledger's form for a structural reference replaced by the time it names. Both are recorded before → after in the package's ledger; one word each changes them.
3. **The rules line's home in Scene 29** is row 3; the sentence is verbatim and stands once.
4. **"In eleven words."** Scene 29's second beat says *"That's the whole case, in eleven words"* after *"Price should be free to move. The monetary rules should be hard to move."* — fourteen words by count. A legacy fact of the frozen script, untouched; the presenter's word pass owns it.
5. **The passage's pointer.** The falsifiability passage says *"back to that table"* and *"this table would need rebuilding"* — the table stands in Scene 23, three scenes earlier at the default home. Left as written; row 2 decides the home.
6. **The claim's last journey (Scene 27 → Scene 28).** One decision claim at the default size gives way to three demand claims at 44 px arriving at the margin; the through-line's continuity across that boundary is wiring for Session 2 to render once and flag, never a redesign of either frame.
7. **The full clear (Scene 28 → Scene 29).** The field's world clears completely before the kicker lands — the architecture's own words. Recorded as the boundary's form; Batch E times it.
8. **The fiat render's box** (batch-a report §7.6, carried through Act IV): every display-scale call site for `fiat` is the 180 × 150 display box, a 48% aspect departure from the render's near-16:9 frame. Acts IV and V own the box; the Act IV cells were approved with it, and this map carries it as approved.
9. **The dead code in legacy `4-20`.** `createBisection` references a `BISECTION` table that does not exist; the function is never called. Nothing in Act V reaches it; recorded so no session reads it as a treatment.
10. **"A silent Thank you."** Master §3.7 describes the close's last frame as silent; the legacy script ends by speaking *Thank you.* The package installs the legacy words; the presenter's pass decides whether the last words are spoken or only shown.
11. **The kicker at Scene 29** renders the retired Section 4 header treatment — an accent caption with a rule line — because the frame is frozen (R7.1 A2). It is the only such kicker left in the film and is carried as frozen, not as a convention.

---

# 5. What the ruled map assigns to Session 2

Every Act V settled state renders into `review/act-5/states/` (flipbook + `states.json`) by its class: the PORT cells from their named legacy treatments verbatim (`approved-port`, review optional); the one ADAPT cell (S30-F1, the black with the wayline retired) as `pending-review` with its one change named; the six ARGUABLE rows rendered at their defaults unless the presenter's answers arrive in the prompt, each default flagged in plain English. **The Scene 28 cells are rendered from P1's field implementation** — `UnitGrid` from `UnitField.js` — so the rhyme is real, not resembled; the close's typography cells at the film's final register. No candidates: the map names no NEW frame at the defaults. The flipbook protocol is the kickoff brief's: the presenter walks the film's ending as stills — the migration, the premium, the other assets, the marginal decision, the field returning, the case, the silence — and returns his verdicts and the go-ahead that unlocks the final implementation batch.

---

# 6. How this map governs, once ruled

1. **Look the frame up here.** A frame with no row is unclassified, and classifying it is the presenter's.
2. **PORT** — transplant the named treatment verbatim. Grade, type and stage wiring only. **A port that cannot reproduce its treatment without a design decision is a stop-and-flag, not a judgment call.**
3. **ADAPT** — make exactly the one named change. Everything else is a port.
4. **NEW** — none at the defaults. A session that believes it has found one has found an unclassified frame, and stops.

Amendments are presenter rulings only.
