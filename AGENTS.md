# AGENTS.md
## Repository instructions for Codex and other coding agents

This repository contains the cinematic HTML presentation:

> **What Is Money? — And How Does Bitcoin Fit In?**

Treat it as a designed audiovisual argument, not a conventional web application. Code quality, narrative continuity, speaker-note accuracy, animation state, and visual judgment are all part of correctness.

---

# 1. Instruction hierarchy

When instructions conflict, follow this order:

1. The presenter’s latest explicit instruction
2. The active session brief / batch package in `docs/` (the film is built in briefed stages and batches)
3. `docs/synthesis-architecture.md` — **the frozen structure.** Acts, scenes, beats, what dies, what survives. Amendable by presenter ruling only
4. `docs/what-is-money-master.md` — **the constitution.** Every standing rule of narrative, craft, composition, script, register and accuracy, plus the freeze register
5. This `AGENTS.md` — process law and repository conventions
6. Existing repository conventions and README guidance

`docs/SOURCES.md`, `docs/icon-grammar.md` and `docs/dark-field-manifest.md` are binding within their subjects and sit beside the master rather than beneath it.

*(Everything else that once governed — the Sections 1–3 rebuild brief, the Section 4 master documents, the original presentation master, `PLANS.md`, and every session brief and report through R7.4 — was consolidated into the master at Stage 0 and now lives under `docs/archive/` behind superseded-by headers. **None of it governs anything.** It is kept as history and as the evidence record older harnesses and citations point back to.)*

Do not silently reinterpret an approved narrative decision. Flag a genuine contradiction or technical impossibility before changing the intended meaning.

---

# 2. Repository facts

## Stack
- Vanilla JavaScript ES modules
- Vite
- GSAP
- CSS and Tailwind design tokens
- No frontend framework

## Main commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

The current `package.json` does not define lint or automated test scripts. Do not claim to have run them unless they are later added.

## Key paths

```text
index.html
src/
  main.js                  deck, or the scratch route when ?proto= is present
  dark-field.js            the subject-keyed image register
  engine/
    KeyboardController.js
    NotesOverlay.js
    OverviewGrid.js
    SlideEngine.js
    TouchController.js
  components/
  proto/
    registry.js            the prototypes ?proto= can run
  scenes/                  the film — one directory per act, see its README
    prologue/
    act-1-the-unfinished-exchange/
    act-2-the-architecture-of-money/
    act-3-the-jobs-of-money/
    act-4-the-store-of-value-test/
    act-5-the-case/
  slides/                  the legacy deck — deleted per batch as scenes replace it
    manifest.js            the running order, and the only one
    section-1-question/
    section-2-origin/
    section-3-function/
    section-4-ideal-store/
    section-5-close/
  styles/
    globals.css
    slides.css
assets/dark-field/         the graded shipping set
assets/dark-field/incoming/  the drop zone the grade gate reads
```

`src/assets.js` was deleted at R7.1 and is not coming back; `assets/images/`
holds only the favicon.

## Slide module contract

A slide normally exports:

```js
export default {
  id: 'unique-slide-id',
  section: 'section-id',
  number: 1,
  title: 'Slide title',
  totalBuildSteps: 0,
  continuesFrom: 'optional-previous-slide-id',

  render(container) {},
  onEnter(ctx) {},
  onExit(ctx) {},
  buildStep(n) {},

  notes: `Complete speaker notes`
};
```

Audit existing modules before introducing a new pattern.

---

# 3. Mission — the film rebuild

The deck is being rebuilt as a **film**. `docs/synthesis-architecture.md` is the
frozen structure: thirty-one scenes across a prologue and five acts, one thread
(the unfinished exchange), one protagonist (the Claim Mark), and no visible
chapter structure at all. The structure closed at Stage 0, 25 August 2026.
**Craft only hereafter** — no session proposes another architecture, and no
session reopens a freeze. That is the presenter's to do.

The paradigm is **scenes and beats, not slides**: a scene is one continuous
visual world (one module, shared DOM), a beat is one advance within it. Scenes
morph into each other when the idea persists; hard cuts only when the question
changes.

## The branch

All film work lives on **`film-rebuild`**, cut from `main` at the last stable
deck. Batches are **commit ranges on that branch**, never separate branches.
`main` stays the last stable deck until the final GATE merge before recording.

## The legacy deck

The 45-slide deck is the film's source of parts, not its enemy. The engine,
`UnitField`, the dark-field library and its pipeline, the icon grammar, the
comparison components and their frozen data, and every surviving script all
carry over.

**Legacy slides are deleted per batch, as each batch replaces them — never
preemptively.** The deck on `film-rebuild` therefore runs end to end at every
commit: new scenes splice into the manifest as their batches land, and seams are
**noted in the batch report, not smoothed**.

## What is frozen

The argument freeze of 28 July 2026 stands in full, and the structure freeze of
25 August 2026 joins it. No session may alter the 100-Year Test, the definition,
claim/carrier, the inversion, the ten failure modes and properties, the five
candidates, any of the fifty scores, migration, the margin mechanism, or the
case as the final frame. The full register is `docs/what-is-money-master.md`
§13.

Preserve:
- the ten selected properties;
- the five compared assets;
- the existing scores unless explicitly changed;
- the comparison framework as the presenter's own work;
- the film's visual identity.

Stay inside your batch's scope. Touching a scene outside it is permitted only
for manifest integration, a necessary seam, or a confirmed shared-component
improvement. Report every out-of-scope file changed and why.

---

# 4. Process law

Presenter-ordered, 25 August 2026. These are not style preferences: each one
exists because the failure it prevents has already cost this project time.

## 4.1 Commit granularity

**Every self-contained change is committed immediately** — a scene, a component,
a fix, a doc edit — with a message that describes it. **Unrelated changes are
never batched into one commit.** The working tree is clean at every stop.

Purpose: any change is individually revertible. A commit that carries four
unrelated edits cannot be undone without undoing three things that were fine.

## 4.2 Revert points

**Tag every stage and batch completion** — `stage-0`, `batch-a-frames`,
`batch-a`, and so on. A tag is a place the presenter can return to without
reading a log.

## 4.3 The aesthetic law

**No aesthetic decision ships on agent self-selection.** Glyphs, marks, frames,
compositions — each goes to a **contact sheet**, and the presenter selects.
Candidates are rendered at their shipping size, in the context they ship in, and
every candidate stays on file so a selection can be changed by changing one
letter rather than by redrawing.

## 4.4 The no-invention rule

During batches, the CLI **implements approved style frames and approved
scripts.** A visual gap — a missing render, an unspecified state, a composition
the frames do not cover — is **flagged in the report and left visibly pending.**
It is never improvised. A pending element says so at its call site, and the
report says so in words.

This is the rule that makes the style-frames stage worth running: an improvised
frame is indistinguishable from an approved one three weeks later.

## 4.5 The style-frames stage

**Every new or changed scene has its key states rendered and presenter-approved
as stills before any motion is built.** Stills first; the approval loop runs on
the sheet; nothing animates until the frames are approved. Prototype gates, where
the architecture names one, run after the frames and before the batch.

## 4.6 Modes

FAST and GATE are retained (§14). **Batches run FAST. One GATE runs before the
recording merge.** A report that does not name its mode is claiming the strong
one.

## 4.7 The working order

For each batch: **audit → style frames → prototype gate (where one applies) →
implement → review.**

**Audit before editing.** Read, in this order:

1. `docs/synthesis-architecture.md` for the scenes in scope.
2. `docs/what-is-money-master.md` — the constitution.
3. The batch package: beat maps, scripts, style-frame specs.
4. `src/slides/manifest.js` and the scenes on either side of the batch's seams.
5. The scene modules the batch replaces, and their notes.
6. The shared components the batch will use.
7. The slide engine and the notes overlay.
8. `src/styles/globals.css` and `src/styles/slides.css`.
9. `src/dark-field.js` and the dark-field manifest for the assets in scope.

Do not assume a component behaves as its name suggests.

**Implement in scene order, not in file order.** Shared visual language and
narrative continuity matter more than convenient batching; a run of unrelated
scenes implemented independently produces a run of unrelated scenes.

**Review as you go.** After each scene, and again at the end of the batch:

- run the production build;
- inspect the diff;
- run the deck in the browser when available;
- walk the scenes in sequence, forward and backward through every build;
- direct-enter each build;
- check reduced motion;
- read the notes against the frames;
- check the console;
- report unresolved visual judgments.

Do not defer all validation to the end.

## 4.8 The session-sizing law

**Presenter-ordered, 30 August 2026.** **One major construction task per
session.**

A batch is not one session. It is a **sequence of small FAST sessions** — each
under an hour where possible, **each tagged, each independently reviewable** —
plus one closing session for batch-level verification and the batch tag.

**A brief that bundles multiple major constructions is a process defect**, and
is to be split before it runs rather than executed as written.

Purpose, and it is the same purpose as §4.1 one level up: a session that builds
four things cannot be reviewed, cannot be reverted, and cannot be judged. Its
report becomes a summary rather than an account, its tag marks a state nobody
chose, and a defect anywhere inside it puts everything else in the session at
risk with it. Granular commits make a change revertible; small sessions make a
*decision* revertible.

What counts as one major construction: a scene, a systems or beat-state sheet, a
prototype gate round, a splice, an ingest with its records. Records, rulings and
their proofs travel with the construction they belong to.

## 4.9 The provenance rule

**Presenter-ordered, 30 August 2026.** **Every frame and state in the remaining
film carries a provenance class, recorded before any design or implementation
session touches it.**

- **PORT** — a proven legacy treatment exists. It is **transplanted verbatim**:
  grade, type and engine wiring are the only permitted changes. **Redesign is
  forbidden, and generating candidates for a PORT frame is a process defect** —
  unless the presenter explicitly reopens that frame **by name**.
- **ADAPT** — a proven treatment exists, and **one ruled change** applies to it.
  The ruling is named in the map. **Only that change is made**; everything else
  is a PORT.
- **NEW** — no proven treatment exists. The full-coverage rule and the candidate
  process apply as established (§4.3, §4.5).

**Sessions verify the class before touching anything.** An unclassified frame is
not NEW by default — it is unclassified, and classifying it is the presenter's,
through his act's provenance map. A map is a **proposal** until he rules it;
the ruled map then governs that act's work.

The class lives with the act it governs — Act II's is `docs/act-2-provenance.md`
— and every PORT and ADAPT row **names its legacy source slide**, so the claim
"a proven treatment exists" is checkable rather than asserted.

Purpose: the legacy deck is judgment the presenter has already spent and already
approved, and the expensive failure is not a bad candidate — it is a good one,
generated for a frame that was already solved. That failure costs twice: the
session that redesigned what did not need designing, and the delivery that
quietly lost a proven treatment nobody noticed leaving. §4.3 says no aesthetic
decision ships on agent self-selection. This answers the question before it:
**whether there is a decision to make at all** — and that is answered from the
record, not from the blank page.

## 4.10 The plain-English rule

**Presenter-ordered, 31 August 2026.** Any text that asks the presenter for a
decision — ARGUABLE rows, flags, open questions, review protocols in reports
and sheets — is written in **plain English: the question stated simply, the
options in full sentences.** Compressed style stays confined to machine-facing
sections. **Violations are defects.**

Purpose: a decision request the presenter has to decode is a decision delayed
or mis-made. Compression that saves the writer's space spends the reader's
attention, and the presenter's attention is the project's scarcest resource.

---

# 5. Scope and safety

- Work on `film-rebuild`. Never commit film work to `main`.
- Do not use destructive Git operations. Do not force-push.
- **Delete legacy slides only as the batch that replaces them lands** — never preemptively, never as tidying. The deck must run end to end at every commit.
- Do not install new dependencies without explicit approval.
- Do not regenerate or replace existing artwork without approval.
- Do not alter the comparison scores without approval.
- Do not change the project's architectural stack.
- Do not rewrite the slide engine to solve a local scene problem.
- Keep changes reviewable: one self-contained change per commit (§4.1).

If a task is ambiguous but non-blocking, make the most conservative decision consistent with the governing documents and report it. Ask only about genuinely blocking choices.

---

# 6. Design system

Follow the existing repository conventions.

## Core visual identity
- Pure-black primary background
- Bitcoin orange accent: `var(--accent)`
- Existing text, border, success, and danger tokens
- High contrast
- Strong typography
- Disciplined whitespace
- Cinematic progressive reveals

## Token use
- Use CSS variables and existing Tailwind mappings.
- Do not hard-code new palette values when an existing token expresses the meaning.
- `--success` and `--danger` are semantic, not decorative.
- Use existing type classes and spacing patterns before inventing new ones.

## Existing conventions
- American English is the deck-wide standard for all user-visible text and notes. Identifiers, slide IDs, filenames and CSS classes keep their existing spelling.
- Use `KickerLabel` for kicker labels.
- Avoid browser-default bullets.
- Use `BuildList` or a deliberate custom visual when progressive lists are required.
- **Images go through the dark-field register, never through raw paths.** `src/assets.js` is gone; the deck's only raster surface is `src/dark-field.js` (the subject-keyed manifest) rendered by `src/components/DarkField.js`. A slide asks for a subject by name and gets either the graded render or its grammar-glyph stub. Adding a raster reference anywhere else fails `review/rebuild-r7-2/harness/gates-r7-2.cjs`. The register's own rules are `docs/what-is-money-master.md` §6 and `docs/dark-field-manifest.md`.
- Preserve the logical 1920×1080 stage.
- Respect the existing title safe zone and projection needs.
- Whitespace is part of the design.
- Do not add full-width orange bars or generic title underlines.

## The rails law

**Presenter-ordered, 31 August 2026. Film-wide.** Simple icons retire from
monetary-good stations everywhere. On every rail, strip, or timeline of
monetary goods, the goods are carried by their **dark-field renders as an
object band above the line at lineup scale**, while the drawn line, station
marks, labels, wounds and gain/dependency text beneath keep the film's line
grammar unchanged. **Every station is photographic; the ClaimObject disc is
never a station — it is the traveler.**

> **The station clause was amended by the presenter on 31 August 2026** (the
> CERTIFICATE ruling — Batch B implementation brief §1.1). As adopted, the law
> made the CLAIM station an exception carrying the ClaimObject disc itself.
> The ruling supersedes that exception: on Scene 10's strip the claim station
> carries the **`gold_certificate` render, relabeled CLAIM ON GOLD**, all four
> stations are photographic, and the disc's role on any rail is the traveler —
> the through-line moving along it — never a station. The disc-as-station
> staging is retired to file (`s10-b1-disc` · `s10-b2-disc`).

- The band sits **above** the line, never on it: no render stands on a drawn
  line, which is the form of the register boundary (master §6.3) this law
  preserves while amending its rail case.
- Lineup-scale discipline applies (each render in a box of its own aspect
  under the framing rule, one band scale across a surface), and the register
  brightness rules apply to the band (a receded station's render recedes with
  its station; the active station's render carries the full voice).
- Applied on ruling day to `s5-b5` and `s10-b1`/`s10-b2` (the Act II states
  sheet); already pre-recorded for Act III's monetization timeline; governs
  all future rails, strips, and timelines of monetary goods.

### The fill-order ruling

**Presenter-ordered, 1 September 2026 (the rail r2 session).** On every rail
governed by the rails law: **narrative order is spatial order.** A station
stands where the story reaches it, and **the rail fills strictly left to right
at every beat — nothing ever lands to the left of a station already standing.**

Act II's spine is therefore **SHELLS · CATTLE · SALT · IRON · METALS · GOLD ·
COINAGE · CLAIM ON GOLD · LEDGER · BITCOIN**, and Zanzibar's featured moment
returns to the **far-left SHELLS station** when it lands. The legacy
`EvolutionRail` stop positions are unchanged; only which station stands at
which stop changes.

**Recorded with the ruling, because it is what makes the order legitimate:**
the rail is a **competition record, not a chronology.** The only dates on it
are the featured facts. A viewer reading it left to right is reading the order
in which the film enters the carriers into the contest — not the order in
which the world minted them.

### The survival-brightness ruling

**Presenter-ordered, 1 September 2026 (the staging amendment's session).** On
every rail governed by the rails law: **an undefeated station holds full
voice; fallen stations dim with their wounds.** A station is not receded
merely because history has moved past it — it recedes when its defeat lands.
The canonical case: SHELLS reads as alive until Zanzibar lands, even as
CATTLE, SALT and IRON take their wounds around it. The ruling composes with
§9.4 rule 10 unchanged: among the wounds already landed, the latest speaks at
full voice and the prior ones hold the dimmed-prior step; this ruling governs
the *stations*, rule 10 the *sentences beneath them*.

### The arrival-line rule

**Presenter-ordered, 1 September 2026 (the rail r2 session).** The
survival-brightness ruling made an undefeated station read as alive. This one
makes it *say something*: **an undefeated station is never blank. Every
station arrives with a line beneath it, always**, and keeps a line for as long
as it stands.

- **Standing = the virtue, at the station's own voice.** The line is the
  station's own recorded reason for being money, in the installed script's own
  words. SHELLS arrives with **"Beautiful. Scarce. Hard to fake."**; METALS
  with **"Hard to make more of. Slow to decay. Divisible without dying."**
- **Fallen = the wound, at the dimmed-prior step.** The virtue is replaced by
  the wound the moment the defeat lands — SHELLS' virtue gives way to the
  Zanzibar wound at S5 b6.
- A station whose own sentence is landing on that beat is not blank: the
  landing is its line, anchored at it, and settles into the rail's world row
  register on the following beat.

The rule composes with §9.4 rule 10 unchanged: the latest sentence speaks at
full voice, the prior ones hold the dimmed-prior step. A virtue is not a
sentence competing for the beat — it rides at its own station's voice, which
is why it can stand for five beats without ever shouting over the wound that
just landed next to it.

## Anti-slop test
Before adding a decorative element, ask:
- Does it explain the argument?
- Is it visually specific to this presentation?
- Would it look at home in a premium Bitcoin conference talk?
- Would a designer recognise it as purposeful rather than generated filler?

If not, remove it.

Avoid:
- generic dashboard cards;
- repetitive three-column layouts;
- gratuitous glassmorphism;
- excessive glow;
- random gradients;
- fake data visualisations;
- icon walls;
- decorative grids without narrative purpose;
- dense walls of text.

---

# 7. The Claim Mark

## The film's only recurring protagonist

The Claim Mark is the transferable monetary claim, and it runs the whole film —
born in Scene 3, carried, saved, transferred, layered, tested, and repriced. Its
**form is decided at Prototype Gate 1** from a contact sheet the presenter
selects from (§4.3); until that gate rules, prototypes render the gate's
candidate and nothing ships.

It must:
- remain recognizable across every act;
- change state only for conceptual reasons;
- be one component with one API — not seventeen unrelated orange circles;
- support reduced motion;
- reset deterministically;
- avoid becoming a literal dollar symbol too early.

Its states across the film, in order:

1. born from an unfinished exchange (Scene 3);
2. detached from the person who created it, and transferable (Scene 3);
3. spent — travels, redeems, and is gone; or saved — held, the interval open (Scene 4);
4. the through-line, as the carriers change beneath it (Scenes 5–9);
5. detached from custody as a paper claim on a vault (Scene 7);
6. dematerialized into a ledger entry (Scene 8);
7. doing one job at a time — held, spent, priced (Scenes 11–14);
8. layered: a claim on the layer below (Scene 15);
9. generalized — the claim on value (Scene 16);
10. sent toward 2126, and threatened by each failure mode (Scenes 18–22);
11. compared across carriers (Scene 23);
12. the marginal claim, choosing where it goes, and repriced against a fixed supply (Scenes 27–28).

Prefer one component with one API over a fresh orange circle per scene. The
existing implementation to audit first is `src/components/section-4/ClaimObject.js`,
which renders the shared `LuminousDisc`.

## Continuations

Use `continuesFrom` or an equivalent shared-DOM technique **when it materially
improves continuity** — the film's paradigm is that a scene morphs into the next
when the idea persists, and hard-cuts when the question changes.

Continuities the architecture already asks for:
- the hours field condensing into the shifting forms (P1);
- the failing return path contracting into the Claim Mark (Scene 2 → Scene 3);
- the held claim taking either road (Scene 3 → Scene 4);
- the saved claim becoming the through-line as carriers transform around it (Scene 4 → Scene 5);
- the tower's unanswered question opening the return to the exchange (Scene 15 → Scene 16);
- the hours field's rhyme in the fixed-supply field (P1 → Scene 28).

Do not use continuation merely because it is technically impressive.

---

# 8. Motion and lifecycle correctness

## Animation principles
- Motion must explain.
- Builds should reveal one thought at a time.
- Avoid identical fade-up timing on every slide.
- Do not make the presenter wait for long ambient animations.
- Ensure the final state is clear even when motion is disabled.
- Avoid motion that competes with spoken content.

## Lifecycle
Every slide or component must:
- initialise from a deterministic state;
- tolerate re-entry;
- restore the correct state when navigating backward;
- clean up `setTimeout`, `setInterval`, GSAP timelines, listeners, observers, and injected styles;
- avoid leaking references between slides;
- avoid duplicate keyframe injection;
- respect `prefers-reduced-motion`.

Use slide-local references carefully. Never assume the page is loaded only once.

## Build steps
- `totalBuildSteps` must match actual build states.
- `buildStep(0)` must produce a valid initial state.
- Moving backward through a slide must reverse or reconstruct the correct state.
- Skipping forward with the force-next key must not leave partial state.
- HMR and deep-link restoration must not break the slide.

---

# 9. Code style

- Match the existing ES-module style.
- Prefer small, named helpers over deeply nested render functions.
- Create reusable components when the concept recurs or complexity warrants it.
- Do not abstract one-off markup merely to appear elegant.
- Keep DOM creation readable.
- Keep style declarations organised and semantically grouped.
- Avoid `innerHTML` with untrusted content.
- Use `textContent` where markup is not required.
- Use semantic names tied to the presentation concept.
- Comment non-obvious animation or state logic, not self-evident code.
- Do not leave dead code, alternate copy, or abandoned prototypes.

If a component is Section-4-specific, place it where repository conventions make the ownership clear. Do not pollute a generic component with unrelated one-off switches.

---

# 10. Scene IDs, numbers, and the manifest

`src/slides/manifest.js` is the running order and the only source of truth for
it; `src/main.js` assigns each module's deck position from the manifest's order,
so a module's `number:` field is documentation, not authority.

**A scene ID is a deep link and is permanent.** Choose it for what the scene *is*
— never for where it currently sits in the running order. An ID survives
renumbering, resequencing and rewrites; it changes only when the scene stops
being the same scene.

When a batch splices its scenes in:

1. import the scenes and place them in the manifest at their architecture order;
2. delete the legacy slides they replace, in the same batch;
3. check deep links for every ID that moved or left;
4. check the overview grid's labels and the progress readout;
5. search the repository for hard-coded absolute numbers or retired IDs;
6. walk the seams on both sides, and report them rather than smoothing them.

Do not leave two modules with the same ID.

---

# 11. Speaker notes are production content

Speaker notes are not comments or scratch space.

Every note must:
- match the visible slide;
- be ready for rehearsal;
- use the approved terminology;
- include important qualifications;
- contain a transition to the next slide;
- remove obsolete content;
- avoid `L1:` and transcript artifacts;
- avoid references to deleted examples;
- avoid claims stronger than the visible slide can support.

The second-window note mode must remain synchronised.

When revising a slide, revise its notes in the same change.

---

# 12. Content accuracy and rhetoric

Section 4 presents a strong Austrian and Bitcoin-maximalist argument, but it must remain precise.

## Required distinctions
- value is subjective;
- money is framed as a transferable counterclaim;
- claim and carrier are distinct;
- saving and investing are distinct;
- market valuation and monetary architecture are distinct;
- price flexibility and high volatility are distinct;
- no native yield and no economic function are distinct;
- lack of a required counterparty and absence of all risk are distinct.

## Prohibited overclaims
Do not say:
- Bitcoin is risk-free;
- Bitcoin guarantees purchasing power;
- Bitcoin is perfect;
- volatility itself is the feature;
- price is omniscient or perfect;
- saving has no risk;
- every yield is fraudulent;
- Bitcoin has no dependencies;
- no Bitcoin rule can ever change;
- one monetary unit legally owns a fixed fraction of every asset;
- sound money determines all civilizational outcomes.

## Preferred formulations
Use exact approved formulations from `docs/what-is-money-master.md` §9–§10 and from the active batch package's scripts where specified.

Do not weaken them casually and do not intensify them beyond their qualification.

---

# 13. Assets and imagery

- Audit existing assets before creating anything new.
- Reference images through `src/dark-field.js` (the subject-keyed manifest), never by path. Every new render must pass `review/rebuild-r7-2/harness/grade-r7-2.cjs` before it reaches a slide; drop candidates into `assets/dark-field/incoming/` and run `ingest-r7-2.cjs`, which moves only the passes across.
- Do not hotlink.
- Do not introduce copyrighted third-party imagery without explicit approval.
- Prefer abstract, diagrammatic, or code-generated visuals where they fit the deck.
- Do not use stock-photo clichés.
- Do not make the surgeon visually identifiable as a real person.
- Keep imagery subordinate to the conceptual narrative.

If a new asset is genuinely needed, stop and report:
- what is missing;
- why CSS/DOM/SVG cannot solve it;
- the proposed asset;
- licensing or generation implications.

---

# 14. Validation

## 14.0 Session modes: FAST and GATE

Every session runs in one of two modes, and the brief says which. The default
for iteration is FAST.

**FAST — scoped verification.** Build clean; the changed slides only: every
build renders correctly, direct entry and reduced motion pass for those slides,
before/after screenshots of each changed state under `review/rebuild-r<N>/`.
No deck-wide suites. Target well under an hour.

**GATE — the full suite.** Traversals, the direct-entry matrix, the static
gates, the register and composition audits, the brightness gate, frame capture
at every boundary, and the freeze checks. Run **before any merge**, and at the
R5/R6 milestones.

The distinction is about *when* global guarantees are re-established, not about
whether they hold. **A change made in FAST mode is not "unverified": it is
verified locally and guaranteed globally at the next GATE.** What FAST forbids
is shipping a change nobody looked at; what it permits is not re-proving the
other forty slides every time one of them moves.

Two obligations survive into FAST mode and are not negotiable, because they are
the ones that cost nothing now and everything later:

- **Never widen a gate to make a FAST session pass.** If a scoped run surfaces a failure outside its scope, record it — a declared baseline, a flagged item in the report — and leave it for the GATE.
- **Say which mode ran, in the report.** A report that does not name its mode is claiming the strong one.

## Required command
Run:

```bash
npm run build
```

after each milestone and at completion.

## Browser validation
When browser access is available, inspect:
- the first and final build state of every changed slide;
- intermediate build states;
- transition into and out of Section 4;
- forward and backward navigation;
- deep links to representative slides;
- fullscreen;
- overview grid;
- notes overlay;
- second-window notes;
- reduced-motion mode;
- browser console.

## Visual review
Review at the logical 1920×1080 composition and at the actual recording/display size.

Check:
- title safe zones;
- overflow;
- line wrapping;
- table legibility;
- contrast;
- alignment;
- pacing;
- consistency of the orange claim motif;
- visual hierarchy;
- whether the final state is understandable in a screenshot.

## Search-based cleanup
Before completion, search for:
- old thought-experiment wording;
- “German investment advisor”;
- lighting;
- communication;
- refrigeration;
- “perfect engineered solution”;
- obsolete cash-flow copy;
- obsolete volatility copy;
- stale Section 4 IDs;
- `L1:` artifacts;
- old absolute slide numbers.

---

# 15. Definition of done (per batch)

A batch is done only when:

1. Every scene in it is implemented against **presenter-approved style frames** and the batch package's scripts.
2. Every beat maps to exactly one `[→]` in its script, in order.
3. Builds are deterministic forward, backward and on direct entry, with reduced-motion parity at every state.
4. Speaker notes are complete, are the verbatim recording script, and stay synchronized in the second window.
5. `npm run build` succeeds.
6. The legacy slides this batch replaces are deleted **in this batch**, the manifest is spliced, and the deck runs end to end.
7. No guardrail in the master §10 is violated, and nothing on screen or in a script refers to the film as a film.
8. The compositional standard holds: the two-element budget, the brightness floors, the display rule, the settle budgets, and the register boundary.
9. Every visual gap is **flagged in the report** — none improvised (§4.4).
10. Commits are granular, the working tree is clean, and the batch tag is cut.
11. The report names its mode.
12. The scenes pass the ten-question scene test, and the act passes the retelling test — a cold viewer can retell its idea unprompted.

---

# 16. Completion report format

At the end of each stage or batch, report:

## Mode
FAST or GATE. A report that does not name its mode is claiming the strong one.

## Implemented
- scenes and components completed;
- narrative decisions preserved;
- visual system changes.

## Files changed
- file-by-file summary;
- out-of-scope changes and justification;
- the commit list, and the tag cut.

## Validation
- commands run;
- browser states checked;
- console status;
- notes status;
- reduced-motion status.

## Flagged, not improvised
Every visual gap left pending under §4.4, and what each one is waiting on.

## Remaining judgment calls
- aesthetic selections awaiting the presenter (§4.3);
- factual language requiring approval;
- known limitations, and anything a scoped FAST run deferred to the GATE.

## Recommended next step
One clear next action only.

Do not report success for checks that were not actually performed.
