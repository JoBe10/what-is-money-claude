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
  main.js
  assets.js
  engine/
    KeyboardController.js
    NotesOverlay.js
    OverviewGrid.js
    SlideEngine.js
    TouchController.js
  components/
  slides/
    manifest.js
    section-1-question/
    section-2-origin/
    section-3-function/
    section-4-ideal-store/
    section-5-close/
  styles/
    globals.css
    slides.css
assets/images/
```

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

# 4. Required workflow

## 4.1 Audit before editing

Before implementation:
1. Read the README.
2. Read `package.json`.
3. Read `src/slides/manifest.js`.
4. Read all current Section 4 modules and notes.
5. Read relevant Section 3 and close slides to understand entry and exit.
6. Read shared components.
7. Read the slide engine and note overlay.
8. Read `src/styles/globals.css` and `src/styles/slides.css`.
9. Read `src/assets.js`.
10. Read `docs/synthesis-architecture.md`, `docs/what-is-money-master.md` and the active session brief or batch package.

Do not assume a component behaves as its name suggests.

## 4.2 Plan before implementation

For a rebuild phase of this size, create or update `PLANS.md` after the audit.

The plan must include:
- current-state findings;
- exact file mapping;
- components to reuse;
- new components to create;
- slide ID and numbering strategy;
- animation-continuation strategy;
- three implementation milestones;
- validation after each milestone;
- risks and rollback points.

Do not begin the complete rebuild from only a high-level prompt.

## 4.3 Implement in coherent milestones

Preferred milestones:
1. Slides 4.01–4.06
2. Slides 4.07–4.12
3. Slides 4.13–4.17
4. Whole-deck integration and review

Do not implement a run of unrelated slides independently. Shared visual language and narrative continuity matter.

## 4.4 Review after each milestone

After each milestone:
- run the production build;
- inspect the diff;
- run the deck in the browser when available;
- review the slides in sequence;
- test forward and backward build steps;
- inspect speaker notes;
- check the console;
- report unresolved visual judgments.

Do not defer all validation to the end.

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

# 7. Section 4 visual system

## The recurring orange claim

Section 4 requires a persistent orange visual motif representing the transferable monetary claim.

It must:
- remain recognisable across slides;
- change state only for conceptual reasons;
- be reusable through a dedicated component or carefully shared implementation;
- support reduced motion;
- reset deterministically;
- avoid becoming a literal dollar symbol too early.

Expected narrative states:
1. created by an unfinished exchange;
2. detached and transferable;
3. carried by different monetary media;
4. preserved when saved;
5. diluted or maintained in a simplified model;
6. sent toward 2126;
7. threatened by failure modes;
8. compared across carriers;
9. linked to hidden rulebooks;
10. delivered to the future;
11. multiplied into a civilization-wide coordination network.

Prefer a reusable component/API over seventeen unrelated orange circles.

## Continuations
Use `continuesFrom` or an equivalent shared-DOM technique when it materially improves continuity. Audit the existing `OrangePillCapsule` continuation pattern before implementation.

Likely continuation candidates:
- unfinished exchange → definition of money;
- definition → claim and carrier;
- saving → integrity model;
- 100-Year Test → failure modes;
- comparison → hidden rulebook;
- return to 2126 → civilization network.

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

# 10. Slide IDs, numbers, and manifest

The current deck stores:
- semantic slide IDs;
- absolute slide numbers;
- ordered imports in `src/slides/manifest.js`.

When Section 4 expands:
1. choose stable semantic IDs;
2. update every Section 4 `number`;
3. update the Section 5 close slide number;
4. update the manifest ordering;
5. check deep links;
6. check overview labels and progress;
7. search the repository for hard-coded absolute numbers or old IDs;
8. preserve IDs only where the slide still represents the same conceptual content.

Do not leave two slides with the same ID or number.

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

At the end of each milestone, report:

## Implemented
- slides and components completed;
- narrative decisions preserved;
- visual system changes.

## Files changed
- file-by-file summary;
- out-of-scope changes and justification.

## Validation
- commands run;
- browser states checked;
- console status;
- notes status;
- reduced-motion status.

## Remaining judgment calls
- visual choices requiring user review;
- factual language requiring approval;
- known limitations.

## Recommended next step
One clear next action only.

Do not report success for checks that were not actually performed.
