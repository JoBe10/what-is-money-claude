# WHAT IS MONEY? — The Master Document
## The film: structure, constitution, and freeze register — one current document

**Status:** Current and authoritative. Created at **Stage 0, 25 August 2026** (`docs/stage-0-brief.md` §2) by consolidating the whole documentation archaeology — the Sections 1–3 rebuild brief (the old constitution), the Section 4 master document v2, the original presentation master document, `PLANS.md`, and every session brief and report from Bucket 1 through R7.4 — into one place.
**Governs:** everything except the film's structure, which is governed by `docs/synthesis-architecture.md` (frozen), and process law, which is governed by `AGENTS.md`.
**Supersedes:** every document now under `docs/archive/`. Those documents remain readable as history and as evidence records; **none of them governs anything.** Where an archived document disagrees with this one, this one governs — and where this one disagrees with the frozen architecture on structure, the architecture governs.

---

# 0. How the documentation works now

**The live set — five documents and this one:**

| Document | Governs |
|---|---|
| `docs/synthesis-architecture.md` | **The structure.** Frozen. Acts, scenes, beats, what dies, what survives. Amendable by presenter ruling only. |
| **`docs/what-is-money-master.md`** (this) | **The constitution.** Every standing rule of narrative, craft, composition, script, register, accuracy — plus the freeze register. |
| `AGENTS.md` | **Process law.** Commit granularity, revert points, the aesthetic law, the no-invention rule, style-frames, FAST/GATE. |
| `docs/SOURCES.md` | **Sourcing.** Every number that appears on screen, dated and cited. Live. |
| `docs/icon-grammar.md` | **The line grammar's drawing rules** — construction, the don't list, the legibility rule, the set, placement. Live reference. |
| `docs/dark-field-manifest.md` | **The dark-field register's grade, gate, pipeline and prompts.** Live reference. |

Plus the **active working documents** of the current stage — at Stage 0 those are `docs/stage-0-brief.md` and `docs/batch-a-package.md` (scripts, beat maps, style-frame specs, Prototype Gate 1). A batch package governs its own batch's beats and scripts; when its batch lands, it is archived like everything else.

**Everything else lives in `docs/archive/`** behind a superseded-by header. The rule that put it there is permanent:

> **The one-master rule.** The project keeps exactly one current master document. A brief or report that has been executed is archived the moment its content is absorbed here — not left in `docs/` to be read as if it still governed. An archive is history; a live document is law. Nothing is deleted: the archaeology is preserved in full, both on disk and in git history.

> **The documentation currency rule** (adopted at R7, retained): every session that changes the deck ends with a documentation-sync step — the governing documents its changes touched are updated in the same session. **A governing document that disagrees with the repository is a defect, and is reported like any other.**

---

# 1. The film

## 1.1 Purpose and delivery context

The goal is the best presentation and explanation of "What is money?" ever created. The original was delivered live at a Bitcoin Bush Bash in Byron Bay and received exceptionally well; this rebuild produces the **canonical version**: a recorded, screenshared film published on YouTube, built with **no time constraint** — the only criterion for any element is that it deserves to exist.

Consequences of the recorded format:

- The presenter addresses **"you," the viewer.** Direct address works; "everyone in this room" phrasing does not. Rhetorical questions and deliberate silences work on video and are part of the design.
- Pacing is authored, not improvised: holds, pauses and black frames are specified per beat, because the recording preserves them exactly.
- Live deliveries may happen again later; they are cuts of the canonical version, never the other way around.

**Audience priority when needs conflict:** (1) intelligent newcomers / pre-coiners, zero prerequisites assumed; (2) — very close behind — Bitcoin OGs; (3) Austrian economists and skeptical academics. Operating principle: the explanation that most impresses an OG is a *perfect explanation of the fundamentals* (the 3Blue1Brown effect), so designing for the intelligent newcomer at the highest craft level serves both audiences at once.

**Master design principle (the presenter's own words, adopted as law):** *do not hand the audience the conclusion that Bitcoin fits anywhere — give them the knowledge to come to that conclusion themselves.*

## 1.2 The paradigm

**Scenes and beats, not slides.** A scene is one continuous visual world (one HTML scene, shared DOM); a beat is one advance within it. Scenes morph into each other when the idea persists; hard cuts only when the question changes.

**One thread runs the whole film: the unfinished exchange.** The **Claim Mark** — form decided at Prototype Gate 1 — is the only recurring protagonist. It is also the wayfinding: the film has no visible structure, no chapter markers, no map. Act changes are questions the story generates.

**The visual journey:** Prologue mysterious and personal → Act I human, warm, dark-field photographic → Act II material-to-information transformations, object-led → Act III clean and diagrammatic → Act IV abstract black/white/orange first principles → Act V economic consequence, decreasing complexity, final pure typography. One film, different acts.

## 1.3 The structure — index

**`docs/synthesis-architecture.md` is the text of record.** What follows is a navigational index of it, not a second copy: where the two disagree, the architecture governs. Scene numbers are the architecture's own; where it names a run rather than a scene (17–23, 24–29), the index numbers the run's members in the order the architecture lists them, using its content phrases rather than invented titles.

| # | Scene | Act / register |
|---|---|---|
| P1 | Eighty Thousand Hours / What Is Money? | Prologue — personal, mysterious |
| P2 | The Stakes | Prologue |
| 2 | The Direct Exchange | Act I — the unfinished exchange; warm, human, dark-field |
| 3 | The Breakthrough (the Claim Mark is born) | Act I |
| 4 | Spend or Save | Act I |
| 5 | The Function Stayed. The Carrier Changed. | Act II — the architecture of money; object-led |
| 6 | Gold: Scarcity in Matter | Act II |
| 7 | Claims on Gold: Portability Through Trust | Act II |
| 8 | Fiat: Money Becomes Information | Act II |
| 9 | Bitcoin: Can Scarcity Become Digital? | Act II |
| 10 | The Trade-Off Keeps Moving (palladium bar) | Act II |
| 11 | Three Familiar Jobs | Act III — the jobs of money; clean, diagrammatic |
| 12 | We Already Split Those Jobs (Argentina) | Act III |
| 13 | The Order of Monetization *(the ladder restored — the LADDER amendment, 2 Sep 2026, §13)* | Act III |
| 14 | The Coffee Objection | Act III |
| 15 | The Tower | Act III |
| 16 | Return to the Open Exchange — the claim on value | Act IV — the store-of-value test; black/white/orange |
| 17 | What the carrier must preserve (purchasing power + redeemability) | Act IV |
| 18 | The 100-Year Test (unknowable future merged in) | Act IV |
| 19 | Invert the question | Act IV |
| 20 | Carrier failures I | Act IV |
| 21 | Carrier failures II | Act IV |
| 22 | Failure → requirement, merged with the ten properties | Act IV |
| 23 | The comparison — fifty scores in one advance, "Don't trust. Verify." | Act IV |
| 24 | Migration (with the diversification concession) | Act V — the case; decreasing complexity |
| 25 | The monetary premium | Act V |
| 26 | When other assets do money's job | Act V |
| 27 | The marginal decision | Act V |
| 28 | Fixed supply reprices at the margin (the UnitField) | Act V |
| 29 | The case from first principles (the rules line, in script) | Act V |
| 30 | Close | Act V — pure typography |

**Thirty-one scenes.** No scene 1: the Prologue's two scenes carry it, and Act I opens on the exchange.

## 1.4 What died, and what survives

**Dead, for the record** (the architecture's own list): the waypoint device and the 1.5 map scene · the murmuration · the exchange triad · the evolution rail as a persistent spine (its content redistributes into Scenes 5–9) · ~~the monetization ladder (→ coordination logic; Boyapati to the notes)~~ *(struck 2 Sep 2026 — the LADDER freeze amendment, §13: Scene 13 is the ladder restored, Boyapati attributed on screen)* · the standalone falsifiability slide (→ script, already ruled) · the section openers and all visible chapter structure · the "How do you understand anything" scene (its promise moves to spoken P2) · the stability scene (Ruling 5).

**Retired with honor:** the murmuration asset is banked, not deleted from history. Its soul survives as one spoken line in Scene 3 — *nobody decided, and everyone converged.*

**Survives from the repository:** the engine (continuity groups, crossfade, brightness rules, pacing rule, script standard, FAST/GATE) · `UnitField` · the dark-field asset library and its manifest pipeline · the icon grammar at diagram scale · the comparison components and data (frozen) · every script whose scene survives (most of Acts IV–V verbatim; Acts I–III adapted) · `SOURCES.md` · this constitution.

**The legacy deck stays runnable.** Legacy slides are deleted **per batch, as each batch replaces them** — never preemptively. New scenes splice into the manifest as their batches land; seams are noted in the batch report, not smoothed.

---

# 2. Authority hierarchy

When instructions conflict, follow this order:

1. The presenter's explicit instruction in the current session
2. The active session brief / batch package in `docs/`
3. `docs/synthesis-architecture.md` — the frozen structure
4. **This document** — the constitution
5. `AGENTS.md` — process law and repository conventions
6. Existing repository conventions and `README.md`

`docs/SOURCES.md`, `docs/icon-grammar.md` and `docs/dark-field-manifest.md` are binding within their subjects and sit beside this document rather than beneath it.

Do not silently reinterpret an approved narrative decision. Flag a genuine contradiction or technical impossibility before changing the intended meaning.

**Notes are not narrative authority.** The architecture's beats and the batch packages' scripts are; a script installed verbatim is copy, not license.

---

# 3. The Narrative Constitution

Every rule carries its rationale. Future sessions inherit the *why*, not just the *what*. Violating these is a defect regardless of any other instruction.

## 3.1 Emergence rules

- **Never describe Bitcoin as "engineered," "purpose-built," "designed as a solution," or "repurposed."** Grounding: the film's central historical claim is that money is *discovered by markets, not designed by anyone* (D2). Calling Bitcoin engineered-to-be-money would exempt it from the very law the film spends an hour establishing. It is also the historically weaker claim: a cash system was designed; the store-of-value role *emerged* through adoption — the better story and the true one.
- Money is presented as an emergent market phenomenon. The state's real historical role is conceded honestly where it arises — concession of the true part is what disarms the objection.

## 3.2 Neutrality rules

- **Before Act IV, Bitcoin may be *described*, never *argued*.** Facts in the neutral register, at least one honest limitation in the same breath, zero adjectives of advocacy. Bitcoin's descriptive appearances are Scenes 9, 10 and 14. *(Mapped at Stage 0 from the old boundary, "before 4.01," which named a slide that no longer exists; **presenter-ruled 25 August 2026: the boundary is before Act IV** — the same moment in the argument: the store-of-value test is where the case begins.)*
- **The evidence rule:** facts about *the money itself* — purchasing power of a currency, supply data, discovery dates, prices — may appear on screen. Evidence about *social outcomes* with contested causal chains (wealth gaps, inequality since 1971) stays in spoken word and Q&A only. The former survives any skeptic; the latter invites a fight the framework has not yet earned the right to win.
- **The generalized honesty rule:** every monetary good presented on stage gets at least one stated weakness — fiat included, Bitcoin included. An unexplained strength reads as advocacy; an explained weakness reads as rigor.
- **No political sorting:** no villain narratives, no country singled out for monetary failure without the structural framing its scene specifies, no partisan-coded evidence.

## 3.3 Revelation-protection rules

- **The claim ladder — replaced by the enlargement sequence** *(presenter-ruled 25 August 2026)*. The old rule (the word "claim" appears exactly three times, one rung per act, and never as a generalization before Section 4) is **void**: the Claim Mark is now born on screen in Scene 3 and is the film's protagonist. What replaces the ladder is the *sequence of enlargements* — Scenes 3 → 7 → 15 → 16 — and it is still protected:
  - **Scene 3** — the claim is born from one unfinished exchange. Concrete, particular, unnamed as a category.
  - **Scene 7** — a banknote is "a claim on gold in a vault." Plain historical usage.
  - **Scene 15** — every layer is a claim on the layer below; the tower ends on the unanswered question of what the bottom layer is a claim on.
  - **Scene 16** — the generalization: **the claim on value** — *not a legal claim on anyone in particular; a social claim on everyone in general.* It answers Scene 15's question in the same breath.
  No earlier rung may anticipate Scene 16. Scene 16 must land as *recognition*, not as instruction.
- **No property checklist before Act IV.** Act II shows *that* properties decide the competition, through named single-dimension failures; Act III gives the jobs and the coordination logic. The derivation of the ideal property list is Act IV's revelation (Scenes 19–22) and stays virgin.
- **The 100-Year Test and the inversion method never appear before Act IV.**

## 3.4 The one-term rule (retained, where applicable)

Each act before the test may introduce **at most one technical term**, and uses it thereafter. Rationale: a newcomer can absorb one new word per act and no more; jargon density is the fastest way to lose the primary audience.

- **Act I's term is the double coincidence of wants**, spoken at Scene 2's failure, as the approved script has it.
- "Schelling point" remains explicitly excluded — the concept may be present without the label, and the label may be name-dropped in spoken word only.
- **Act II introduces no technical term** *(presenter-ruled 25 August 2026)*. The old allocation gave Section 2 "salability"; it is not inherited — the concept may be present without the label.
- **Act III's term is base money** *(presenter-ruled 25 August 2026)*, entering with the tower, where the layers make it concrete.

## 3.5 Language and craft rules

- **American English throughout**, in all viewer-visible text and in notes ("labor," "monetization," "judgment," "jewelry"). Typographic apostrophes and quotes in visible copy. Identifiers, scene IDs, filenames and CSS classes keep their existing spelling.
- **Neutral register:** no dramatizing adjectives in factual statements (the "violently volatile" class of error). State the fact; let it be heavy on its own.
- **One clean wound.** Each contender or example dies of exactly one failure, on one dimension. No pile-ons.
- **Canonical wording is verbatim.** Wording marked canonical in the architecture, in this document, or in a batch package is installed exactly as written, at the specified register (on-screen vs spoken). The presenter finalizes all wording in his own pass; visible copy changes after that pass require his sign-off.
- **The pacing rule: one advance per spoken beat.** Any text element the presenter speaks over gets its own build, advanced manually. Auto-timed staging is reserved for motion *within* a single visual gesture — a field filling, a collapse, a sweep — never for sequential lines of copy.
- **Black is a beat, not a seam.** Darkness appears only where the design calls for it — a cold open, an authored clear-to-black, a scripted black build; navigation never manufactures it. Between scenes with no shared scene group the transition is a ~300ms crossfade (the outgoing dissolves as the incoming rises, no black frame between); reduced motion cuts instantly.
- **The self-reference ban.** Nothing on screen or in the scripts refers to the film as a film. No "this presentation," "these slides," "my updated slides," "this deck," "this video," "this talk." The permitted forms are *the next hour*, *the inquiry*, *the real question*, *before we're done*, *here* — the viewer is inside an argument, not watching a deliverable. A gate holds this: no scene file may match those phrases.

## 3.6 The acceptance test

After implementation the film is re-walked against one question:

> **"Is there any moment before Scene 23 where a fair viewer could say 'he's selling me something'?"**

Every such moment is a defect. This runs as a formal pass, not as a feeling. *(Mapped at Stage 0 from "before 4.16" — the comparison table; **presenter-ruled 25 August 2026: the moment is Scene 23.**)*

## 3.7 Act IV / Act V integrity (inherited, re-affirmed)

- **No total score, no winner badge, no Bitcoin-column highlight.** The table's closing line is **"Don't trust. Verify."** — on stage exactly once, at the table.
- **All fifty scores stay as they are**, including Bitcoin's 5/5 durability with its notes defense, 2/5 track record, and 4/5 fungibility. The scores are dated: *"my judgments, as of 2026."*
- Row header **PROPERTY**; the real-estate asset is labeled **REAL ESTATE**.
- "The monetary competition is decided at the margin" remains spoken-only.
- **Scene 29 is the true final frame of the argument**; Scene 30 is the close — silence, the callback, the covenant, the disclaimer, a silent *Thank you.*
- Boyapati is attributed where the monetization stages appear — **on stage in Scene 13** *(the LADDER freeze amendment, 2 Sep 2026, §13; Boyapati-to-notes is struck)*. Florian Bruce-Boye's attribution rules are in §11.

---

# 4. The deposits: D1–D9

Act IV's argument presupposes nine deposits in the audience's head. **Every beat before Act IV must trace to at least one deposit; any element tracing to none is deleted, however good.** Scene mappings updated at Stage 0 to the frozen architecture.

- **D1 — The audience owns the question personally.** They know they are deciding where a life's work gets stored, before any framework appears. *(P1, P2.)*
- **D2 — Money is an emergent market phenomenon.** Goods become money by winning a competition; no decree fixes the winner. *(Scene 3: nobody decided, everyone converged.)*
- **D3 — Properties decide the competition.** The most load-bearing deposit: history told as evidence for this law, so Act IV's method feels obviously correct. *(Scenes 5, 6, 10.)*
- **D4 — Every money so far has failed or been displaced — and the record includes today's.** The humility that legitimizes the 100-Year Test, and the fiat purchasing-power evidence deposited where Act V can harvest it. *(Scenes 5, 7, 8 — the four-currency chart.)*
- **D5 — The jobs: what they are, that they separate, and why store of value is the entry point.** *(Scenes 11, 12, 14.)*
- **D6 — The order of monetization, gated by coordination: holding needs one person, spending needs two, pricing needs a network.** Young monetary goods therefore do the jobs in order — a structural fact, not a verdict. *(Scene 13 — the ladder restored (the LADDER freeze amendment, 2 Sep 2026, §13), with the coordination logic spoken inside the scene as the proof of why the stages gate; Boyapati attributed on screen.)*
- **D7 — Incumbency logic: only a categorical difference on the deciding properties has ever moved the crown.** The bar Act IV's comparison holds every candidate to. *(Scene 10, the palladium bar.)*
- **D8 — Minimal neutral Bitcoin literacy.** No state, no company, 2009; 21,000,000 fixed by the protocol's rules; holdable directly, like a bearer asset — with the honest limitation in the same breath. *(Scene 9, completed at Scene 14.)*
- **D9 — The claim is the thread, progressively enlarged.** *(Amended at Stage 0; **presenter-ruled 25 August 2026.** The old D9 seeded a claim intuition that stayed unnamed until Section 4. The architecture names it in Act I instead. What D9 now requires is progressive enlargement: the claim, once born in Scene 3, is present in every act — carried, saved, transferred, layered — and each rung of the enlargement sequence (§3.3) widens it a step, so that the generalization lands as recognition at the return, Scene 16 — recognition of an object the viewer has been watching for forty minutes.)*

**The anti-list.** Before Act IV, do not: pre-argue Bitcoin; run property scoring; state barter-origin as unqualified historical chronology (it is framed as the logical problem, the standard economic account); front-load inflation grievance (that material lives inside D4's historical record at Scene 8).

---

# 5. The compositional standard (film-wide)

What makes the frames read as one hand. Rules 1–10 were codified at R7.1–R7.3 from the delivered work; rules 11–13 were shipped at R7.4 and are written down here for the first time.

1. **One idea per frame.** Each build lands at most one new text element. On-screen text is the distillation — a line, not a paragraph; the script carries everything else. When a new line lands, prior lines dim or clear unless they are being deliberately accumulated (a list being built is one accumulating element).
2. **The two-element budget.** Outside structural diagrams, at most two text elements are fully bright at once (e.g. a kicker-scale label plus one statement). Sparse labels on diagrams do not count against the budget; paragraphs are forbidden.
3. **Line-language visuals.** Nodes, thin strokes, dot terminals, grammar glyphs, luminous discs, canvas fields. No filled panels except structural slabs (the tower), no icon-library stock. Photography enters only through the dark-field register (rule 9).
4. **Negative space is a material.** Centered or mirror-symmetric compositions; generous emptiness; nothing touches the frame edges.
5. **Quiet chrome.** No persistent per-scene header convention. Kickers are rare, small and earned — an attribution, a frame that must be named.
6. **Orange is meaning.** The accent marks argument — the claim, foundations, emphasis — never decoration, never chrome.
7. **Black is a beat, not a seam.** (Restated from §3.5.)
8. **Structural diagrams are exempt from the text budget but not from the hand:** the comparison table, the strip, the tower follow their own established patterns — thin strokes, grammar glyphs, consistent rhythm.
9. **The two registers.** The film speaks one language in two registers, and every visual is assigned to exactly one. See §6.
10. **The brightness floors.** Rule 1 says prior lines dim; these say how far, and what may never be dimmed.
    - **The legibility floor.** No element that has landed and is then dimmed — a dimmed prior, a defeated stop, a settled block — falls below **55% of the brightness it landed at**. (For anything landing at full text brightness, that is ~0.55 alpha on black.) Dimming means *recede*; it never means *vanish into murk*. A frame whose every element sits at a third of full voice has no hierarchy — it is uniformly faint, which reads as an unfinished render rather than as emphasis.
    - **The last-lit invariant.** The most recently landed text element of any build renders at **full brightness** — its own maximum across the scene. Dimming applies only to elements that came before it. A build that lands a statement and dims it in the same breath has nothing at full voice, and the frame no longer says which sentence is being spoken.
    - **One exception, and it is a handoff rather than a dim:** an entire scene layer that has given the frame to a superseding layer may recede past the floor, because nothing on it is being read. Instances are recorded in the decision log rather than granted by the rule.
11. **The display rule.** A statement the argument exists to reach is set at **display scale**, not as a caption under a diagram. The reference failure: the definition — *AN EARNED, TRANSFERABLE CLAIM ON VALUE* — once sat at 44px in secondary text beneath its diagram, and was restaged at 68px with the claim in the accent. If a line is the point of the frame, it is the largest thing in the frame.
12. **Settle-state budgets.** A scene's **final** frame obeys the budget too: one bright statement plus labels. The last word on a frame is never its quietest element. Where a build lands an honesty line or a conclusion last, that line lands at statement scale and the earlier lines settle small and receded — the settle is a *demotion of the prior*, never a shrinking of the current.
13. **The self-reference ban.** (Rule form of §3.5; gated.)

---

# 6. The two registers

**The law:** every visual is assigned to exactly one register, the assignment is recorded, and machine gates hold the boundary.

## 6.1 The line grammar — the default

Carries everything *structural*: mechanisms, records, comparisons, diagrams, labels. Where abstraction is the argument, abstraction is the form. **It is the only register a diagram may speak.**

Its drawing rules are `docs/icon-grammar.md`, binding in full. The load-bearing ones:

- **Construction:** 48 × 48 grid, 40 × 40 live area, one stroke weight for the entire set (2.5u), round caps and joins, dot terminals as punctuation, no fills above dot scale, no gradients, no baked glow, no color — glyphs take `currentColor` and never carry the accent.
- **The don't list:** no filled shapes larger than a dot terminal; no rounded-rectangle app-icon energy; no perspective boxes; no stroke-width variance.
- **The legibility rule:** *any mark whose meaning a viewer cannot infer without a legend fails the grammar — encode it legibly or delete it.* The test is run at the surface, at shipping size, in a render of the scene it ships on — not on the contact sheet. **Deletion is a legitimate outcome**: structure that only decorates is worse than absent, because it spends the viewer's attention and returns nothing.
- **Placement:** one anchor per node, labels outside the shape in mirror symmetry, goods in transit ride the drawn lines, one shared baseline grid, marks that cross a line are ticks rather than glyphs.

## 6.2 The dark-field register — sensory concreteness only

Permitted **only where sensory concreteness is the argument**: a human being's hour, a meal, a good someone's savings lived in.

Its grade is fixed and enforced rather than trusted: **pure black ground** (no environment, no horizon), **a single warm key light** (≈2700–3200K), the subject emerging from darkness with soft falloff, **no text baked in**, one consistent look across every image as if from a single shoot. Four of the five clauses are measured by the grade gate; off-grade imagery is regenerated or regraded, **never grandfathered**.

The pipeline, the master prompt template, the measured limits and the per-subject prompts are `docs/dark-field-manifest.md`. Operationally: generate → drop into `assets/dark-field/incoming/` named for the subject key → run the ingest harness; passes move into the shipping set and appear on their scenes with no code change; failures stay in `incoming/` with the failing measurement printed. **A scene whose render is absent shows its grammar glyph, marked pending, and says so at the call site** — it never improvises a substitute.

**Images are referenced by subject key, never by path.** The subject key is the same string the icon grammar uses for that subject's mark, which is what lets a subject exist in both registers and lets a designed handoff transform one into the other.

## 6.3 The boundary — display scale vs diagram scale

The rule that settled the register war at R7.4, and it is the operative test:

> **Display scale is the sensory register; diagram scale is the grammar.**

Every display-scale appearance of a monetary object is a dark-field render. Grammar glyphs remain at genuine diagram scale — table headers, strips, small structural marks. **Dark-field never enters a diagram; glyphs never carry a sensory beat at display scale.** Register switches are designed moments, not conveniences.

> **Amended for rails of monetary goods — the rails law** (presenter-ordered, 31 August 2026; recorded in `AGENTS.md` §6): on a rail, strip, or timeline of monetary goods, the goods ride above the drawn line as an **object band of dark-field renders at lineup scale**, while the line and its grammar stay beneath; **every station is photographic — the ClaimObject disc is never a station; it is the traveler** (the CERTIFICATE ruling of 31 August 2026, Batch B brief §1.1, superseding the CLAIM-station exception the law carried at its adoption: the strip's claim station is the `gold_certificate` render, relabeled CLAIM ON GOLD). No render stands on the drawn line — that form of the boundary is preserved.

---

# 7. The script standard

Speaker notes are the **verbatim recording script**: the exact words the presenter reads aloud while recording, scene by scene. They are not scene explainers, design rationale, or delivery instructions.

- Flowing spoken prose in the presenter's voice, first person, direct address to the viewer.
- **`[→]` marks every advance.** The words after a `[→]` are spoken over the build it triggers. Every build of the scene appears as exactly one `[→]`, in order. The advance that *leaves* the scene belongs to the next scene's script.
- *Italic bracketed stage directions* are allowed sparingly and only where silence or timing is itself the content — e.g. *[hold — let the silence sit]*. No other meta-commentary.
- Canonical spoken lines appear verbatim at their exact positions.
- American English, typographic apostrophes, no hard-wrapped lines, no wrapping quotation marks.
- Sourcing bases for on-screen figures live in `docs/SOURCES.md` only — never inside the script.
- Material that is prepared but not spoken — Q&A armor, steelman blocks — is installed at the end of the relevant scene's notes and **marked not-spoken**.
- The presenter rewrites and finalizes every script in his own voice at the end of the rebuild; until then, scripts are drafted to be readable as-is.

**Notes are production content**, not scratch space. Every note matches its visible scene, uses approved terminology, carries the qualifications, transitions to the next scene, and contains no obsolete references. When a scene is revised, its notes are revised in the same change. The second-window note mode stays synchronized.

---

# 8. Technical law

## 8.1 The scene module contract

Scenes are built on the pattern Section 4 proved:

- **`_applyBuild(n)` reconstructs full state** from the build number. No timer chains, no incremental-only transitions.
- Data-attribute reveals; design-token discipline (`var(--accent)` and the existing text/border/success/danger tokens; no hard-coded palette values where a token expresses the meaning).
- **Reduced-motion parity for every animation** — the end state is reached instantly, and it is the same end state.
- **Direct-entry correctness at every build** (`?slide=`): entering a scene cold at build *n* renders exactly what advancing to *n* renders.
- `totalBuildSteps` matches the actual build states; `buildStep(0)` is a valid initial state; moving backward reverses or reconstructs correctly; the force-next key never leaves partial state; HMR and deep-link restoration do not break a scene.
- **Lifecycle:** deterministic init, tolerant re-entry, full cleanup of timeouts, intervals, GSAP timelines, listeners, observers and injected styles; no leaked references between scenes; no duplicate keyframe injection.
- Continuation between scenes uses `continuesFrom` or an equivalent shared-DOM technique **when it materially improves continuity** — never because it is technically impressive.

## 8.2 The stage

The logical **1920 × 1080** stage with uniform letterbox scaling. Respect the title safe zone and projection needs. Review at the logical composition *and* at the actual recording size.

## 8.3 Continuities that must be preserved

- **The unit-field rhyme.** P1's hours field and Scene 28's fixed-supply field are one visual grammar at opposite ends of the argument — a life poured in, the container it is poured into. Both run on the shared `UnitField` component. **Never pointed out explicitly.**
- **The Claim Mark is one object across the film.** One component, one API; state changes only for conceptual reasons; it resets deterministically and supports reduced motion. Its form is decided at Prototype Gate 1 and the hours-field unit style is tuned to rhyme with it.

## 8.4 Sourcing

**Every number shown on screen gets a `docs/SOURCES.md` entry**, dated, with its source. No exceptions, including numbers the presenter considers common knowledge.

## 8.5 The color arc

The Prologue is **monochrome plus photographic warmth**: type and line carry no accent, and the only warmth on screen is the dark-field register's own key light. The accent is used sparingly and structurally through Acts I–III, and reaches full deployment in Act IV where it already lives. **The accent is never decorative.**

**The accent's entry point is the Claim Mark's birth in Scene 3** *(presenter-ruled 25 August 2026)* — the film's first argument is the first orange on screen. The arc's old anchor, the first waypoint ignition, died with the waypoint device.

---

# 9. Intellectual foundation

## 9.1 Value

**Value is subjective** — not a substance contained in hours, objects, or money. The surgeon must never imply the labor theory of value: the market pays for the *specialized service* (skill, scarce knowledge, training, judgment, dexterity, responsibility), not the passage of an hour. The guard has a film-wide arc: planted in the Prologue's script (the market does not price your hours — it prices what you make with them), paid off formally at Scene 2.

## 9.2 The unfinished exchange and the definition

Specific contribution → monetary counterclaim → future counter-value. The surgeon completed his side; the final goods remain untaken; the exchange is open.

On-screen definition: **AN EARNED, TRANSFERABLE CLAIM ON VALUE.**

Formal spoken form: *money is the transferable counterclaim created when value is provided to the market without the final counter-value yet being taken.*

"Claim" is economic, not legal: **not a legal claim on anyone in particular — a social claim on everyone in general, enforced by acceptance, not courts.** 1971 removed the legal anchor from beneath the social claim; it did not end money's claim-nature.

## 9.3 The money/units bisection (canonical)

Money is the claim; the unit is the notation. Printing creates units, never claims — no value was delivered — and redistributes purchasing power from every earned unit to the printed ones.

Canonical lines:

> **"You cannot print money. You can only print the units it comes in — and every unit printed drains the ones already earned."**

> **"A government can create currency units. It cannot print the purchasing power those units claim."**

> **"Without corresponding production, new claims on the market do not enlarge the pool of real goods and services. They alter who can command it."**

> *(Argentarius register, spoken/notes)* **"Governments can manufacture money-signs, but not money itself — because they cannot manufacture the earned purchasing power that genuine money embodies."**

**Retired line, permanently void:** *"You can print claims. You cannot print what the claims are trying to buy."* Under the bisection, claims cannot be printed; units can. Do not reintroduce it.

The simplified relative-claim/dilution model stays, with its honesty note intact: purchasing power is also moved by preferences, productivity, demand to hold money, credit and market structure; the model illustrates the holder's relative monetary position, **not literal ownership of a fixed share of all assets.**

## 9.4 Claim and carrier; store of value

The claim is the essence; the asset is the carrier. A store of value is **a monetary carrier that preserves the integrity and usability of an unredeemed claim through time** — integrity (no arbitrary dilution, rule-rewriting, seizure, forgery, subordination) and usability (accessible, verifiable, divisible, transferable, exchangeable).

Sound architecture does not guarantee demand; benign deflation is stated as "other things equal," never as a promise. The battery metaphor stays secondary and only after the distinction is established; "economic energy" is never the formal definition.

## 9.5 The test, the inversion, the properties

The 100-Year Test's object is exact: **an unredeemed purchasing-power claim, sent to descendants in 2126.** The inheritance framing is pure — the claim must *arrive intact* in descendants' hands; no "still yours," no surviving self. One confident sentence justifies the number: *"One hundred years — long enough that you're not allowed to assume any company, any arrangement, any government survives it. That's the point of the number."* No objection-litigation at the introduction.

The ten failure modes — diluted · indivisible · illiquid · trapped · consumed by carrying costs · subject to discretionary control · degraded · unverifiable · non-fungible · untested — invert **one-to-one** into the ten properties, in the table's order. The properties are protections against failure. The comparison is a transparent first-principles assessment whose scores can be challenged — never revealed truth.

**Ordering is deliberate:** derivation before test. The audience must hold the defined object — the claim — before being asked to stress-test carriers of it. Do not reorder toward test-first.

## 9.6 The prepared answers (script-level, never staged)

- **Displacement, two-pronged.** History shows two ways to lose the monetary throne: *beaten* (something categorically better arrives — the commodity era) or *captured* (custody centralizes, claims are over-issued, redemption is cancelled — gold, 1971). Against being beaten: the **frontier argument** — absolute scarcity and near-zero transport and verification costs sit at their theoretical maxima, so categorical improvement needs room that may not exist. Stated as *structure, not prophecy*: the century stays a question, and the table says so. Against being captured: the resistance-to-control property, with the honest note that capture attacked gold's *custodial layer* — so the same vector aimed at Bitcoin runs through custodians and paper claims, which is why the self-custody holding assumption carries real weight.
  **This is never staged.** A scene asking "what displaces Bitcoin?" would presume a throne Bitcoin does not hold, and would manufacture the objection it answers. The frontier passage lives in the candidate-set script; the full two-prong writeup lives as Q&A armor in the comparison scene's notes.
- **Falsifiability.** What would change the scores: a credible supply-integrity failure, sustained security-budget decay, protocol capture. Spoken, not staged.
- **Stability** *(Ruling 5, Stage 0)*. The two-question distinction — the market's valuation vs the architecture of the claim — and the stage-signature inoculation enter **Scene 9's script**. The full steelman (volatility as the cost of monetizing a new fixed-supply asset; reduction an expectation, never a guarantee) enters **Scene 23's notes** as Q&A armor. The rules line — *"Bitcoin does not fix its price. It fixes the rules through which the market discovers its price"* — remains in **Scene 29**. No frame is built for any of it.
- **The trapped-exit honesty.** History's worst store-of-value failures were fast and closed the exit first (the 1933 class of event) — the prepared answer to "I'd adjust in time." Q&A armor, not a beat.
- **Steelman standard:** every objection is checked against the strongest *institutional* form of the objection, never the street form.

---

# 10. Guardrails, registers, terminology

**Do not say or imply:** value is time or labor hours · money is literally energy · Bitcoin is risk-free, perfect, or guaranteed · Bitcoin guarantees purchasing power · present volatility is inherently desirable, or volatility itself is the feature · price perfectly measures fundamental value, or price is omniscient · architecture alone creates value · saving is risk-free · all yield is bad, or the absence of native yield is itself a virtue · every yield is fraudulent · no Bitcoin rule could ever change · Bitcoin has no dependencies · the claim-pool model is literal ownership · one monetary unit legally owns a fixed fraction of every asset · the scores are objective · sound money determines all civilizational outcomes · the framework or table came from Florian Bruce-Boye · "engineered / purpose-built / repurposed" applied to Bitcoin.

**Required distinctions:** value is subjective · money is a transferable counterclaim · claim and carrier are distinct · saving and investing are distinct · market valuation and monetary architecture are distinct · price flexibility and high volatility are distinct · no native yield and no economic function are distinct · lack of a required counterparty and absence of all risk are distinct.

**Preferred registers:**
- *"no single issuer can unilaterally rewrite the rules"*
- *"Bitcoin reduces or removes specific dependencies; it does not eliminate all risk"*
- *"the scores are my judgments, as of 2026, and every one is an invitation to verify"*

**Terminology standard:** claim · counterclaim · purchasing-power claim · carrier · integrity and usability · relative claim · dilution from the money side · units versus money · native yield · saving versus investing. **Never alternate casually between claim, energy, value, time and purchasing power as if they were the same thing.**

---

# 11. Attribution

**The presenter's own:** the ten properties, the five candidates, all fifty scores, the table and its interpretation, the 100-Year Test, the claim/carrier arc as built, the surgeon derivation.

**Attributed on stage:** Vijay Boyapati, for the monetization stages — Scene 13's ladder, on screen *(the LADDER freeze amendment, 2 Sep 2026, §13: the ladder is restored and the attribution returns to the stage with it; attribution travels with the material)*.

**Acknowledged restrainedly** (notes, sources page, video description — never interrupting the visible narrative): Alfred Lansburgh (Argentarius) for the claim framework's inspiration; Charlie Munger for *invert, always invert*.

**No visible Florian Bruce-Boye credit** is required for the table or the property framework; the Florian-inspired sequences remain permanently retired.

---

# 12. Banked material (not in this film)

- **The hidden-rulebook reveal** and the **civilization/patience coda** — comparing systems of rules and dependencies; money as coordination protocol; the payoff to patience. Banked for the future dedicated presentations (*The Essence of Money*; *Money: Civilization's Operating System*).
- **The volatility-as-antifragility essay material** and **BitCredit / Bitcoin-credit-layer advocacy** — excluded from this film; Q&A and essay material.
- **The standalone palladium mini-presentation** — a separate future project.
- **The murmuration** — retired with honor; the asset is banked and its soul is one spoken line in Scene 3.
- German translation and derivative decks — after the canonical English recording.

---

# 13. The freeze register

Every freeze and every amendment, in order. **A freeze is reopened only by the presenter.**

| Date | Event |
|---|---|
| 28 Jul 2026 | **The argument freeze.** Audited from first principles: the 100-Year Test; the definition; the surgeon derivation and the unfinished exchange; claim/carrier; spend-closes / save-keeps-open; the inversion method; the ten failure modes and their one-to-one inversion into the ten properties; the five candidates with their holding assumptions; the no-verdict table and all fifty scores; migration; the marginal decision; fixed-supply repricing; the case as final frame. |
| 30 Jul 2026 | **Ordering confirmed:** derivation before test. Not to be reordered. |
| 31 Jul 2026 | **R7 amendment — the displacement beat is satisfied at script level, not scene level.** Staging it would presume a throne Bitcoin does not hold. Frontier passage → the candidate-set script; the two-prong writeup → Q&A armor in the notes. |
| 31 Jul 2026 | **R7 amendment — the table line** becomes **"Don't trust. Verify."** (protected-list amendment, logged). |
| 31 Jul 2026 | **R7 relocations:** the trapped-exit honesty leaves the 100-Year Test's introduction for the Q&A armor; the *asked-calmly* line moves to the marginal decision, where the candidates stand equal. |
| 1 Aug 2026 | **R7.1 — the compositional standard is codified** (rules 1–8) from the delivered work and applied film-wide. The header convention is retired. |
| 1 Aug 2026 | **R7.2 — the two registers** (rule 9), by presenter ruling: the line grammar for structure, the dark-field register for sensory concreteness, with a fixed grade and a machine gate. Photography is restored *under grade*, never as it was. |
| 11 Aug 2026 | **R7.3 — the brightness floors** (rule 10): the legibility floor and the last-lit invariant, enforced by gate rather than by discipline. |
| 12 Aug 2026 | **R7.4 — five rulings.** Display scale is the sensory register and diagram scale is the grammar; the falsifiability beat leaves the deck for the script and **the second "Don't trust. Verify." is retired** — the line is on stage once, at the table; the stability module is rebuilt around one visual argument; the comparison reveals all fifty scores on one advance; the display rule, the settle budgets and the self-reference ban enter the standard (rules 11–13). |
| 24 Aug 2026 | **The synthesis architecture** is delivered — the blueprint's spine carrying the deck's strongest organs; scenes and beats replace slides; the unfinished exchange becomes the film's single thread. |
| 25 Aug 2026 | **Stage 0 — the structure freeze.** The presenter's five rulings recorded as RULED in `docs/synthesis-architecture.md`: (1) the waypoint device and all visible structure retired; (2) the murmuration retired with honor, the asset banked; (3) the periodic elimination kept, compressed into Scene 6; (4) palladium placed in Scene 10; (5) the stability scene cut, its content distributed to Scene 9's script, Scene 23's notes and Scene 29's rules line. **The structure is closed: craft only hereafter.** |
| 25 Aug 2026 | **Stage 0 — consolidation.** This document created; the archaeology archived; process law amended into `AGENTS.md`; `film-rebuild` opened. Rules mapped rather than invented, and flagged where mapped: the neutrality boundary (§3.2), the acceptance test (§3.6), the claim ladder (§3.3), D9 (§4), the one-term allocations (§3.4), and the color arc's anchor (§8.5). |
| 25 Aug 2026 | **The six Stage-0 flags ruled** (presenter, at the Batch A frames session). The neutrality boundary is **before Act IV** (§3.2); the acceptance test runs **before Scene 23** (§3.6); the claim ladder is **replaced by the enlargement sequence** Scenes 3 → 7 → 15 → 16, Scene 16 landing as recognition (§3.3); **D9 is restated as progressive enlargement landing as recognition at the return** (§4); the one-term allocations are **Act I the double coincidence of wants, Act II none, Act III base money** (§3.4); the accent's entry point is **the Claim Mark's birth in Scene 3**, with the Prologue **monochrome plus photographic warmth** (§8.5). |
| 31 Aug 2026 | **Structure-freeze amendment — architecture Ruling 3 is struck** (presenter). The periodic elimination returns to the legacy pacing: **one wave of eliminations per advance, exactly as `2-05-two-survivors` performs it, nothing inside any step changed one bit.** Trail: ruled 25 Aug 2026 at Stage 0 (*"kept, compressed to one continuous beat inside Scene 6"*); struck 31 Aug 2026; the presenter's grounds: the legacy treatment is proven and preferred. Consequences, recorded where they land: Scene 6's script re-splits to the legacy advance structure and the frozen beat map amends with it (`docs/batch-b-package.md` §1 — S6 = 9 beats, Act II = 37); S6-F2 reverts from ADAPT to **PORT** in `docs/act-2-provenance.md`. |
| 31 Aug 2026 | **Process amendment — Prototype Gate 3 is collapsed into the implementation review** (presenter, Batch B implementation brief §1.3). The prototype gate for the architecture morph is struck from the Batch B pipeline; **the presenter's live viewing of the implemented act is the gate**, with the claim's connective journey — S5 entry → carrier → certificate travel → strip arrival — named as what he judges. Disappointing seams are fixed by ruled iterations against the pinned states. The gate's questions move to the viewing intact (`docs/batch-b-package.md` §4 carries the record); §14's gate list is annotated. Gates 1 and 2 ran and closed as ordered; gates 4 and 5 stand. |
| 1 Sep 2026 | **Presenter staging amendment — Act II's visual anchor is the continuous rail** (`docs/act-2-staging-amendment.md`, approved verbatim). At the Batch B act viewing the presenter judged the implementation as too much movement away from the monetary timeline; the act's visual anchor is amended to **one continuous rail that never fully leaves the screen and extends right as history advances** — the old deck's proven macro-form — with the interludes entering as overlays and the statement beats landing as station annotations. The amendment maps all 37 beats and is the authority for the rail-states session. **The narrative structure, the scripts, and the 37 beats are untouched** — this is a staging amendment, not a structure reopening. |
| 1 Sep 2026 | **Presenter staging amendment, r2 — six rulings on the built rail** (`docs/act-2-staging-amendment.md`, the r2 section; executed per `docs/act-2-rail-r2-brief.md`). Ruled against the rendered sheet at tag `act-2-rail-states`: (1) **the rail fills left to right** — narrative order is spatial order, SHELLS first; (2) **every station arrives with a line beneath it**, always — an undefeated station is never blank; (3) **the claim steps off the Act II rail** — the ClaimObject appears in no Act II rail beat, and **the collapsed Gate 3's judgment object becomes the rail's own continuity**, which the act viewing judges; (4) **the vault overlay folds into the rail** — the standalone seam pair retires to file, S7 b3/b4 restage on the rail; (5) **the band rule becomes equal visual weight** — one shared box, height *and* width capped; (6) **the network forms out of the LEDGER station**, and palladium's placement is confirmed as staged. **The scripts, the 37 beats and the spoken order are untouched** — staging only. Rulings 1, 2 and 5 are film-wide law at `AGENTS.md` §6. |
| 1 Sep 2026 | **The r2 rail sheet is presenter-approved in full** (`docs/act-2-rail-impl-brief.md` §1.1). All **39 cells** approved on his flipbook walk, **including the nine honest-render flags** of `docs/act-2-rail-r2-report.md` §6; the two flags named for his word are **approved as rendered** — the featured-line register at S7 b3, and the mesh belonging to beat 1 with beat 2 showing the rail returned and the coin at its station. The flags are closed and no cell is pending. **The approved set is the visual authority for every landed-state proof of the rail implementation** (`review/act-2/rail/states.json` — `approval`, `approvedSet`): a settled state that is not its approved cell at zero pixels is a defect. |
| 2 Sep 2026 | **Structure-freeze amendment — the LADDER ruling: Scene 13 is the monetization ladder, restored** (presenter; recorded by the act-3-states session). The architecture's *"what dies"* entry retiring the monetization ladder is **amended**: legacy `3-03`'s treatment and script are restored as Scene 13, **Boyapati attributed on screen**, with the standing icons-to-renders ADAPT applied — the stage marks become dark-field renders at lineup scale, staged as an object sequence, nothing else in the treatment moving (`docs/act-3-provenance.md` §1, the 30 Aug pre-classification; its register-boundary test is the frame's *first* test). The coordination logic **survives inside the scene as its proof** (D6 amended, §4); **Boyapati-to-notes is struck** (§1.3, §1.4, §3.5 and §11 amended with this row). The coordination-scales replacement was never built; its NEW row is recorded as *not built* in the ruled Act III provenance map. **Trail:** retired by the architecture, 24 Aug 2026 (*"the monetization ladder (→ coordination logic; Boyapati to notes)"*); the conflict with the standing icons-to-renders ADAPT flagged at the cheapest moment, 31 Aug 2026 (`docs/act-3-provenance.md` §2, and `docs/act-2-states-report.md` §7 so it reached the presenter in a report); raised as the one ruling that unblocks Act III's scripts, with the LADDER recommendation, in `docs/act-3-kickoff.md` §1 (2 Sep 2026); **ruled LADDER by the presenter, 2 Sep 2026** (the Act III states brief §1.1); grounds — proven organ, no true redundancy, the attribution belongs on screen. |
| 2 Sep 2026 | **Presenter script ruling — the social-technology beat** (Scene 13 beat 4; the Act III states brief §1.2, ruled with the LADDER amendment and recorded beside it). The restored ladder script's one drafted addition is **approved as drafted**: money as **the one good you use because everyone else uses it — a social technology — in plain words**, carrying the coordination logic (holding needs only one person's decision, spending needs two people to agree, pricing needs everyone to converge) inside the scene as the proof of why the stages gate — which is how D6's deposit lands under the amended Scene 13. **The terminology law stands unamended** (§3.4): the vocabulary — network effects, Schelling point, salability — is confined to Scene 13's notes-only Q&A armor and is never spoken; Act III's one term remains *base money*, entering with the tower. |
| 2 Sep 2026 | **Presenter thread ruling, r2 — the ClaimObject returns at Scene 11 beat 1, the triad's center** (the Act III states r2 brief §1.1, ruled against the rendered r1 sheet at tag `act-3-states`). The legacy composition's center **is** the disc — `3-01`'s token is literally 1.2's luminous disc, the same render, not a resemblance — and the disc lives at the triad's center **wherever the home base appears across the act**. It is **not on the tower**: the r1 sheet's s15-b6 disc is removed, and the held question plays over the legacy composition as it always did. **Struck as over-extension:** the kickoff's clause *"the claim's on-screen thread resumes here [the held question], exactly where the enlargement sequence needs the viewer's memory of it"*, restated by the r1 states brief §3 as *"the ClaimObject returns at the held question and nowhere earlier in the act."* Same family as the Prologue's struck *"no Claim Mark anywhere"* (`AGENTS.md` §4.9's first recorded instance): a session document legislating the protagonist off a composition the legacy deck had already proven **with the disc at its center**. **Trail:** invented by `docs/act-3-kickoff.md` §2 (2 Sep 2026, approved with the staging map); propagated into the r1 states brief §3, the ruled provenance map's S15-F2 row, the batch-c package's register line, the r1 states builders and the r1 sheet's own thread gate; **struck by the presenter 2 Sep 2026**; corrected at the origin and at every propagation site, each with a pointer to this row. The enlargement sequence (§3.3, Scenes 3 → 7 → 15 → 16) stands as structure — Scene 15's enlargement is the layering argument itself, carried by the tower and the spoken word. |
| 2 Sep 2026 | **Presenter staging ruling, r2 — Scene 12 reverts to its proven staging** (the Act III states r2 brief §1.2, ruled against the r1 sheet). The r1 sheet's standalone dated-fact block (s12-b3) **retires to file** (`s12-b3-block`, the aesthetic law's file-keeping clause). All four spoken beats stand as installed — including the household beat — but **the Argentina evidence lands the legacy way**: `3-02`'s own row arriving in the columns (USD · ARS · dollars-and-bricks), the kicker in the legacy citation register, the five-decade span and the every-stripe clause **spoken, not blocked**. Consequence, recorded where it lands: **S12-F1 reverts from ADAPT to PORT** in `docs/act-3-provenance.md` (the S6-F2 precedent, 31 Aug 2026). **The dated-fact grammar remains film law for Act II's facts** (Zanzibar, 1971 — the featured-moment treatment is untouched); **Act III's Argentina is ruled an exception on the proven treatment's authority.** |
| 2 Sep 2026 | **Presenter design ruling, r2 — the neutral stage system** (the Act III states r2 brief §1.3, replacing the r1 stand-ins). The four presenter-generated renders — **`collectible`** (a raw gem crystal) · **`store`** (an hourglass) · **`medium`** (a handshake) · **`unit`** (a balance scale) — are **gated and ingested through the standard harness** (`review/act-3/grade-neutral-marks-drop.json`, 4/4 accepted, 0 held) and carry the ladder's four stages at the rails-law band scale. **The same three job objects replace Scene 11's grammar glyphs at the triad's spokes**, so the jobs and the stages share one visual family and the film's last basic icons retire from those stations. **Monetary assets appear on the ladder only as climbers:** Scene 14's coin lands at stage two as *the only monetary object in sight* — the scene's payoff, protected by this ruling. The r1 stand-ins (`single_cowrie` ruled, `gold` / `coinage` / `ledger` honest-flagged) retire from the ladder; `docs/act-3-provenance.md` §2 and the S11-F1 row (PORT → ADAPT, the one ruled change named) are amended with this row. |
| 2 Sep 2026 | **Presenter reopening, r2 — Scene 15 is reopened by name** (the Act III states r2 brief §1.4; the first exercise of `AGENTS.md` §4.9's reopening clause — *"unless the presenter explicitly reopens that frame by name."*). **The three-box tower is superseded**; S15-F1 and S15-F2 reclassify **PORT → NEW** in the ruled map, and the act's one open design is ordered as **two genuinely distinct candidates, each rendered across all six beats**: **(A) the proportional inverted tower** — width is claim volume, solidity is realness: base money narrow, solid, near-luminous at the bottom; deposits far wider, outlined; apps widest and faintest; the reveal descending from PAYMENT APPS at the frame's top to the small bright foundation — and **(B) a second system of the session's design, distinct in structure, same argument, same beats.** Constraints carried by the ruling: line grammar throughout (the register boundary holds; no renders enter the tower), the proven shiver choreography kept as the b4 event, all legacy copy in its slots, the claim-thread and scoping beats per the r2 thread ruling (no disc anywhere in the scene; b5's foundation scope as `3-06` performs it). **The selection is the presenter's, at the flipbook walk** (§4.3); both candidates stay on file. |
| 2 Sep 2026 | **Process amendment, r2 — Prototype Gate 4 is recorded as spent** (the Act III states r2 brief §1.5, per the collapsed-gate precedent of 31 Aug 2026). The gate — *"HOLD / SPEND / PRICE legible without narration"* — was written for the coordination-scales staging the LADDER amendment retired; the staging it would have judged was never built, and its NEW row is recorded as not built in the ruled map. **The ladder's motion is judged at the presenter's act viewing**, exactly as the collapsed Gate 3's questions moved to the Batch B viewing. §14's gate list is annotated with this row. Raised as a freeze-register question at the cheapest moment by the r1 report (§ *Remaining judgment calls*); ruled by the presenter, 2 Sep 2026. |
| 2 Sep 2026 | **Presenter selection — Scene 15 is candidate A, the proportional inverted tower** (the Batch C implementation brief §1.1, ruled at the r2 flipbook walk against tag `act-3-states-r2`). Width is claim volume, solidity is realness; the reveal descends from PAYMENT APPS at the frame's top to the narrow near-luminous base; the shiver at b4. **The A cells (`s15-b1-a` … `s15-b6-a`) are the approved S15 states** and the visual authority for the Scene 15 implementation. **Candidate B — the convergence of claims — retires to file** under the aesthetic law's file-keeping clause (`s15-b1-b` … `s15-b6-b`, on disk and in the record): a change of selection is a change of which cells implementation transcribes, never a redraw. The reopened S15-F1/S15-F2 rows are closed by this selection in `docs/act-3-provenance.md`. |
| 2 Sep 2026 | **Presenter approval — the Act III r2 sheet is approved in full; the go-ahead is given** (the Batch C implementation brief §1.2, ruled at the flipbook walk against tag `act-3-states-r2`). All twenty-five beat states stand approved — S11–S14's nineteen cells and the six candidate-A cells — **including, seen and accepted by name: the S12 saved column's legacy brick glyph** (part of the exact `3-02` revert the presenter ordered) **and the deliberate s14-b4 re-render** (the disc at the returning home base, ruling 1's reach beyond the r2 brief's list). The fourteen r2 flags are closed as accepted records; no cell is pending. **The approved set is the visual authority for every landed-state proof of the Batch C implementation** (`review/act-3/states/states.json` — `approval`, `approvedSet`): a settled state that is not its approved cell at zero pixels is a defect. Amended in the same breath by ruling 3 of the same brief: the nine medium-bearing cells re-render with the replaced `medium` mark as *the updated approved states*. |
| 2 Sep 2026 | **Presenter render ruling — the `medium` mark is replaced** (the Batch C implementation brief §1.3): **the handshake read as agreement, not exchange**; the new presenter-generated study — **a hand-off in mid-transfer** — supersedes it behind the same key. Gated and ingested through the standard harness (`review/act-3/grade-medium-drop.json`, 5/5 clauses, 0 held; the shipping set re-proven at 29 images / 145 checks / 0 failures); the retired handshake study is on file at `review/act-3/dark-field/medium--retired.png` (the `gold` regeneration precedent). The new frame is 842 × 474 — the family's near-16:9 aspect at a smaller frame, band boxes unchanged. **The nine medium-bearing cells** — s11-b3 · s11-b4 · s11-b5 · s12-b1 · s13-b5 · s13-b6 · s14-b2 · s14-b3 · s14-b4 — **re-rendered through the states pipeline as the updated approved states, before any scene work**, so implementation transcribes final geometry; every other cell proven byte-identical. **The handshake never ships.** |
| 2 Sep 2026 | **Presenter staging ruling, Batch C r2 — Scene 12's clean handoff** (the Batch C r2 brief §1.1, ruled against the live act at tag `batch-c`). The triad completes its recede **before** the column heads land: **no element of the home frame remains under PRICED IN / PAID IN / SAVED IN — the columns arrive on clean black.** The approved s12-b1 staging (the heads over the triad receded to the overlay grammar's 0.35, the disc receding at its center with it) is superseded; the cell re-renders as the updated approved state on this row's authority, and s12-b1 leaves the disc-cell record with it — the disc's Act III appearances are the S11 home frame and the S14 b4 return. Beat and words unchanged. |
| 2 Sep 2026 | **Presenter render ruling, Batch C r2 — Scene 12's columns get their objects** (the Batch C r2 brief §1.2). The presenter-generated **`usd`** and **`ars`** note studies gate and ingest through the standard harness, and the renders land **at the rails-law band scale above the codes**: USD over the priced-in column, ARS over the paid-in column, and USD **plus the register's real-estate render** over the saved-in column. The real-estate render is **located in the register: `property`** (`assets/dark-field/property.png`, the restored candidate-lineup study — a house on black) — no stub, nothing pending. **The recognizability exception, recorded:** the register's standing note rule (the `fiat` study's own record, `docs/dark-field-manifest.md` — *no denomination reads as a specific currency; the score is about a class of money, not a country*) is ruled **not to govern these two studies: recognizability is their content.** Argentina's evidence is the dollar and the peso as themselves — an anonymous note would un-say the argument. `fiat`'s rule stands unamended for every class-of-money appearance; the exception is these two subjects, by name. **The legacy brick glyph retires to file, superseded by the render** — the saved column's marks row carries the USD code alone, and the `glyph('brick')` drawing stays in the icon grammar as history. The S12 cells re-render as the updated approved states on this row's authority. |
| 2 Sep 2026 | **Presenter map amendment, Batch C r2 — Scene 13's reveal splits: S13 = 7 beats** (the Batch C r2 brief §1.3; amends the frozen beat map of `docs/batch-c-package.md` §1 — S13 6 → 7, Act III 25 → 26). **One `[→]` inserted in the installed script's gate paragraph at zero word changes**, at the legacy slide's own seam: MEDIUM OF EXCHANGE lands with *"Nobody accepts as payment what they don't expect to hold value."*; then UNIT OF ACCOUNT lands with *"Nobody writes contracts in what nobody accepts."* The merged advance was the frozen map's own merge of legacy `3-03` builds 4+5; the split **restores the legacy slide's own state table** — the MOE beat with the third threshold sitting dim (`stages(3)`, g3 dim), the UOA beat lighting it (`stages(4)`, all bright) — so both new states are ports of states the legacy already performed, and the two gate lines land one per beat as the legacy landed them. Downstream states renumber: the foundation beat becomes b7, its look unchanged. The map, the installed scripts, `docs/act-3-provenance.md`'s S13-F1 row, and the S13 cells amend with this row. |
| 2 Sep 2026 | **Presenter staging ruling, Batch C r2 — Scene 14 folds into the ladder world; the standalone objection frame retires** (the Batch C r2 brief §1.4). The display-scale coffee study over the condensed home row — s14-b1, the cell carried byte-identical since r1 — **retires to file** (`s14-b1-study`); the `coffee_cup` render stays in the register, and the berth still carries it. The scene keeps its four spoken beats, **staged continuously on the S13 ladder**: b1 — the coffee cup arrives at the MEDIUM OF EXCHANGE berth at its established perch scale (the 132 visitor cap) as the objection lands as the statement line; b2 — the placement line beneath the ladder as approved; b3 — the coin lands at stage two, alone, with its line; b4 — the pivot to the whole triad, STORE OF VALUE at full voice, per the approved cell (s14-b4, untouched). **The S13 → S14 boundary becomes a pure morph — one world**: the batch-c report's §5.3 authored-cut judgment is superseded for this boundary (the S14 → S15 cut stands). `docs/act-3-provenance.md`'s S14-F1 row and the S14 cells amend with this row; the fold changes no slide count — the scene remains, its world merges. |
| 2 Sep 2026 | **Presenter defect ruling, Batch C r2 — Scene 9's network forms exactly once** (the Batch C r2 brief §1.5). As built, the scene's entry painted the completed mesh for the camera's opening move and only then reset it to play the formation — the network appeared, vanished, and formed again. Ruled a defect: **the overlay entry must never pre-show the completed mesh.** The required behavior, recorded: the entry state is the hub with its spokes — the institutional shape stands first, and nothing of the network shows before it; the formation gesture plays across the entry's advance; the formed mesh persists as the settled state (**s9-b1 unchanged — the approved cell stands, and the settled state still proves against it at zero pixels**); backward traversal reconstructs settled states instantly, never replaying the formation as a flash; reduced-motion parity reaches every settled state instantly. A gesture-wiring fix only — no cell re-renders, no state changes, no script changes. |
| 3 Sep 2026 | **Presenter staging ruling, Act III final — Scene 12: the renders replace the words** (the Act IV kickoff brief, Part A §1; ruled against the live act at tag `batch-c-r2`). In the Argentina columns **each column carries the header, then the render(s), nothing else**: the USD note under PRICED IN; the ARS note under PAID IN; the USD note **plus** the real-estate render under SAVED IN. **The USD / ARS / dollars / pesos text rows retire.** *"Argentina, five decades."* stays; the principle statement (b4) stays. The cells re-render as the updated approved states on this row's authority, and the beats rewire. Consequence, recorded where it lands: **S12-F1 reclassifies PORT → ADAPT** in `docs/act-3-provenance.md` — the one ruled change named as *the renders replace the text rows in the Argentina columns*; everything else (the heads, the household row, the kicker, the principle, the legacy column arrival) is the port. The household row (b2) carries no render and is not named by the ruling; it stands. Beat count unchanged (S12 = 4). |
| 3 Sep 2026 | **Presenter wording ruling, Act III final — Scene 14's contradiction fixed** (the Act IV kickoff brief, Part A §2; a ruled wording change, recorded verbatim). The landed line at S14 b2 becomes **"A monetary good is trusted to hold value before it is used to pay."** — it was *"A monetary good reaches everyday payments last."* The spoken sentence in the installed script changes accordingly: **"A monetary good is trusted to hold value before it is ever used to pay — payments live on the far side of the gate."** replaces *"A monetary good reaches everyday payments \*last\* — after collectibility, after store-of-value belief, on the far side of the gate."*; the rest of the beat's words are unchanged. Amended in the same breath: the script (`docs/batch-c-package.md` §2), the cell (s14-b2 re-rendered as the updated approved state), and the scene. |
| 3 Sep 2026 | **Presenter structural ruling, Act III final — the pivot relocates to the act's exit** (the Act IV kickoff brief, Part A §3; amends the frozen architecture's Scene 14 and Scene 15 entries and the frozen beat map of `docs/batch-c-package.md` §1). The triad-return beat with the store-of-value question moves from Scene 14's final position to **after the tower's held question — the act's final beat.** The ruled bridge wordings, verbatim: **Scene 14 now ends at** *"…points at one job: store of value. Then let's judge it there."* · **the tower's opening line becomes** *"But before we judge it there, let me pull the rug slightly. Is the thing in your bank account actually the base good we'd be judging? Start from the top, where you live: the payment app."* · **the relocated pivot, now the act's final beat, over the returned triad with STORE OF VALUE at full voice:** *"So now we can ask it properly. What makes something a good store of value? That question — asked from first principles — is the rest of this story."* Beat maps amended: **S14 = 3 · S15 = 7 — Act III stays 26.** **Recorded discrepancy:** the brief writes *"S15 = 8 including the pivot coda"*; the ruled wordings carry exactly one new `[→]` for Scene 15 (the six tower beats plus the pivot), and the beat count is the script's own `[→]` count (the package §1's frozen rule), so the map records **7** — an eighth beat is the presenter's to name, with its words, if he meant one. The cells re-sequence: the approved s14-b4 composition (the home base returning whole, the disc at its center, STORE at full voice, the question in the statement slot) **carries its bytes into `s15-b7`**, the act's final state, and the S14 → S15 boundary now morphs from the ladder world (S14 b3) into the tower. **The act's exit now leaves on the question** over the returned triad; the tower's held question (S15 b6) stands unchanged one beat earlier and is still the question Scene 16 answers — §3.3's rung 3 and the enlargement sequence are untouched. `docs/synthesis-architecture.md`'s Scene 14 and 15 entries, the package's §1 map and §2 scripts, `docs/act-3-provenance.md`'s S11-F1, S14-F1 and S15 rows, and `AGENTS.md` §7's continuation line amend with this row. |
| 3 Sep 2026 | **Presenter provenance ruling, Act IV — Row 1: the candidate lineup ports whole** (the presenter's answer to `docs/act-4-foundation-report.md` §1, row 1; recorded by the act-4-states session before the sheet was touched). Scene 23's five candidates stand as their own frame before the table — legacy `4-15`'s display-scale lineup under the question and its two group labels, the holding assumptions spoken over four beats — and the table follows as the next frame, its compact headers the same five candidates in the grammar register. **S23-F1 is PORT** (`docs/act-4-provenance.md` §1; §2 row 1 closed). No ADAPT enters the map, no candidate is generated, and 4-16's anatomy is untouched; the count stands (S23 = 6). |
| 3 Sep 2026 | **Presenter provenance ruling, Act IV — Row 2: the phrase-under-a-lens beat is retired** (the answer to `docs/act-4-foundation-report.md` §1, row 2). Legacy `4-01-define-the-job`'s three builds — STORE OF VALUE at display scale, VALUE alone in the accent, *What exactly is being stored?* — do not come along: Scene 16 opens on the return and the architecture's own line; the value-is-not-a-substance point is planted in the Prologue and paid off at Scene 2 (§9.1); the pivot coda already speaks the lens's opening idea at the act's door. The map's row moves from ARGUABLE to **retired** (`docs/act-4-provenance.md` §1; §2 row 2 closed), and Scene 16 stays the homecoming rather than a section opener. The legacy slide stays in the deck until the Batch D splice retires it with the Section 4 sources Act IV supersedes (`AGENTS.md` §5 — never preemptively). |
| 3 Sep 2026 | **Presenter structural ruling, Act IV — Row 3: the four claim-and-carrier beats close Scene 16, the crescendo included** (the answer to `docs/act-4-foundation-report.md` §1, row 3). Legacy `4-06`'s four advances — the claim needs a body; the claim is the essence and the monetary asset is the carrier, the record reorganizing into carriers; the bisection crescendo; the precise question, *which carrier can transport an unredeemed claim most faithfully through time?* — are Scene 16's b5–b8, exactly where the architecture's Scene 16 text places the crescendo; Scene 17 opens on legacy `4-07`, *what must the carrier preserve*. **S16 = 8 · S17 = 5** (`docs/batch-d-package.md` §1; `docs/act-4-provenance.md` §2 row 3 closed). The architecture is not amended. With this row the map's three ARGUABLE questions are answered A · A · A at their defaults, and **the Act IV provenance map is RULED** — 21 PORT · 0 ADAPT · 0 NEW · 2 retired; it governs all Act IV work (`AGENTS.md` §4.9). |

---

# 14. Process

Process law is `AGENTS.md`: commit granularity, revert points, the aesthetic law, the no-invention rule, the style-frames stage, FAST/GATE modes, and the branch strategy. It is binding and it is not restated here.

What belongs in this document is the shape of the work:

**Prototype gates, before their batches:**
1. **Claim Mark** — A/B/C contact sheet; the presenter selects. The selection becomes the film-wide protagonist.
2. **Scenes 2–4 in the scratch route** — the signature system; not proceeding until exceptional.
3. ~~**The architecture morph** — gold → claim → ledger → bitcoin.~~ *Struck 31 Aug 2026 (§13): collapsed into the Batch B implementation review — the act viewing is the gate.* **Its judgment object was amended on 1 Sep 2026** (§13, the r2 rulings): the claim steps off the Act II rail, so what the act viewing judges there is no longer the claim's connective journey but **the rail's own continuity** — whether the record reads as one continuous, growing history from S5 b1 to S10 b5.
4. ~~**HOLD / SPEND / PRICE** legible without narration.~~ *Spent 2 Sep 2026 (§13, the r2 rulings): written for the retired coordination-scales staging, which was never built. The ladder's motion is judged at the presenter's act viewing, per the collapsed-gate precedent.*
5. **Late-deck sample renders.**

**Then Batches A–F**, FAST per batch, one GATE before the recording merge. Every scene passes the ten-question scene test; the film passes the **retelling test** — a cold viewer can retell the act's idea, unprompted.

**The exit test for any batch:** every beat maps to exactly one `[→]`; every commit is granular; the batch tag is cut; the report names its mode.
