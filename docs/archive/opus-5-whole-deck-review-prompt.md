> **Build prompt, executed — archived, not authoritative.** ChatGPT/Codex-era working material for the original Section 4 build.
> Superseded by `docs/what-is-money-master.md` and `docs/synthesis-architecture.md` (Stage 0, 25 August 2026). Nothing here governs.

# Claude Opus 5 — Whole-Deck Narrative, Visual, and Codebase Review

You are reviewing a cinematic HTML presentation repository:

> **What Is Money? — And How Does Bitcoin Fit In?**

This is not a conventional web-application review.

Treat the repository as a designed audiovisual argument. Correctness includes:

- narrative architecture;
- intellectual coherence;
- visible copy;
- speaker notes;
- visual hierarchy;
- progressive builds;
- transitions;
- animation state;
- reverse navigation;
- reduced motion;
- code quality;
- factual accuracy;
- originality;
- audience comprehension.

---

# 1. Primary objective

Perform the strongest possible independent review of the complete presentation.

Understand the deck deeply, but do not merely validate the existing decisions. Challenge the:

- overall narrative arc;
- storytelling;
- intellectual framework;
- terminology and wording;
- slide order;
- pacing;
- visuals;
- motion;
- technical implementation;
- factual claims;
- score matrix;
- final investment thesis.

Your goal is to identify changes that would make the presentation:

- clearer;
- more original;
- more persuasive;
- more memorable;
- more intellectually robust;
- more visually exceptional;
- more reliable in code;
- more credible to sophisticated sceptics.

Do not invent problems merely to appear useful. Protect strong work where it is already working.

---

# 2. Mandatory source files

Read these before forming conclusions:

1. `AGENTS.md`
2. `README.md`
3. `package.json`
4. `docs/what-is-money-presentation-master-document.md`
5. `src/slides/manifest.js`
6. every active slide module referenced by the manifest
7. every active slide's speaker notes
8. `src/main.js`
9. `src/assets.js`
10. every file in `src/engine/`
11. all shared components used by active slides
12. `src/styles/globals.css`
13. `src/styles/slides.css`
14. the newest slide-specific Section 4 briefs
15. current Git status and recent history relevant to the rebuild

Use this authority order:

1. The current running presentation and active modules are the source of truth for what is implemented.
2. The active speaker notes are the source of truth for what will be spoken.
3. `docs/what-is-money-presentation-master-document.md` is the source of truth for whole-deck intent, intellectual boundaries, narrative purpose and desired audience experience.
4. The newest approved slide-specific brief governs its named slides where it is more precise.
5. Older prompts, rejected versions, inactive slide files and transcripts are historical context only.

Explicitly report any contradiction between:

- the running slide;
- its notes;
- the master document;
- a newer approved brief;
- the code.

Do not silently reconcile contradictions.

---

# 3. Non-destructive rule

This first pass is **review only**.

Do not:

- edit production files;
- rewrite copy;
- replace assets;
- refactor;
- commit;
- install dependencies;
- delete inactive files;
- run destructive Git commands.

You may create review artefacts only under:

```text
review/opus-5/
```

Do not implement changes until the user has reviewed and approved the findings.

---

# 4. Phase 1 — Repository and architecture audit

Before opening the deck, report:

- current branch;
- current HEAD;
- Git status;
- package scripts;
- active slide count;
- section counts;
- every active slide ID, title and module path;
- every build-step count;
- every `continuesFrom` relationship;
- primary shared visual components;
- active image assets;
- any inactive or superseded Section 4 files that could confuse future agents.

Then:

1. Install dependencies only if they are not already installed and the repository instructions permit it.
2. Run the production build.
3. Run every existing non-destructive validation command honestly.
4. Do not claim a lint or test run if no such script exists.

Inspect for:

- duplicate IDs;
- slide-number or manifest-index mismatches;
- invalid continuation targets;
- dead code;
- duplicated visual systems;
- stale rejected components still imported;
- leaking GSAP timelines;
- uncancelled timers, RAF loops, listeners or observers;
- build states that assume prior mutations;
- direct-entry failures;
- refresh/restoration failures;
- reverse-navigation failures;
- reduced-motion gaps;
- notes-overlay and second-window sync defects;
- asset-path problems;
- accessibility issues;
- avoidable performance risks;
- CSS collisions or excessive global selectors;
- unused assets retained in the production bundle.

Review the whole active codebase, not merely the latest diff.

---

# 5. Phase 2 — Reconstruct the actual narrative

Reconstruct the presentation from the actual:

- slide order;
- visible copy;
- speaker notes;
- build sequence;
- transitions.

For every active slide, create a compact causal record:

```text
Slide / build purpose
Question inherited from the previous slide
Answer delivered here
Question or tension created for the next slide
Visual mechanism
Spoken qualification
```

Then answer:

1. What is the presentation's central thesis?
2. At what point does the thesis first become clear?
3. Where is it repeated unnecessarily?
4. Where is it insufficiently supported?
5. Which slides are structurally indispensable?
6. Which slides could be combined, shortened or removed?
7. Which transitions are weak or unearned?
8. Where could a sceptical viewer mentally exit?
9. Where does the deck feel promotional rather than analytical?
10. Does the ending resolve the opening?
11. Does every major section answer a meaningful question?
12. Does each section create the need for the next?
13. Is the runtime appropriate for the intended talk or recording?

Do not assess the narrative from the master document alone. The implemented deck may differ.

---

# 6. Phase 3 — Browser-based visual review

Run the presentation locally and inspect it in a real browser.

Use Claude Code's Chrome integration where available.

Review:

- every slide;
- every build state;
- every transition;
- the complete sequence forward;
- the complete sequence backward;
- direct semantic entry;
- representative numeric deep links;
- refresh at nonzero builds;
- reduced-motion mode;
- notes overlay;
- second-window presenter notes;
- overview mode;
- fullscreen;
- representative touch behaviour if practical.

Review at minimum:

```text
1920 × 1080
intended recording viewport
one smaller desktop viewport
```

Create screenshots for:

- every final slide state;
- every visually meaningful intermediate build;
- every defect;
- every high-value visual opportunity.

Store them under:

```text
review/opus-5/screenshots/
```

Create a labelled screenshot index or contact sheet.

For each slide, evaluate:

- one-second comprehension;
- hierarchy;
- balance;
- alignment;
- scale;
- negative space;
- contrast;
- typography;
- image quality;
- consistency;
- concept-to-visual fit;
- build pacing;
- transition meaning;
- screenshot quality;
- recording suitability;
- whether the visual is doing intellectual work or merely decorating.

Do not infer visual quality from source code alone.

---

# 7. Phase 4 — Adversarial intellectual review

Adopt each of these lenses separately.

## A. General-audience viewer

Identify where a smart non-specialist would:

- become confused;
- lose the thread;
- encounter unexplained terminology;
- feel overloaded;
- perceive an unsupported leap.

## B. Institutional investor

Identify what an investment committee would challenge about:

- assumptions;
- scores;
- architecture-versus-valuation distinctions;
- risk;
- liquidity;
- custody;
- regulation;
- the marginal repricing argument;
- the absence of a valuation framework.

## C. Austrian-economics critic

Examine:

- subjective value;
- monetary emergence;
- the definition of money;
- the unfinished-exchange idea;
- claim versus carrier;
- inflation language;
- money creation;
- salability;
- monetisation stages.

## D. Bitcoin protocol expert

Examine:

- decentralisation;
- governance;
- unilateral control;
- self-custody assumptions;
- fungibility;
- censorship resistance;
- supply rules;
- consensus change;
- settlement;
- protocol dependencies;
- mining and network risk.

## E. Mainstream monetary economist

Challenge:

- the treatment of fiat;
- inflation and purchasing power;
- money supply;
- bank deposits;
- central-bank objectives;
- the three functions of money;
- store-of-value migration;
- monetary premium;
- the monetary-history simplifications.

## F. Narrative editor

Ask:

- Does each slide answer the prior question?
- Does each slide create the next?
- Are there redundant beats?
- Is the climax placed correctly?
- Does the ending feel inevitable rather than promotional?

## G. Presentation art director

Ask:

- Is the hierarchy clear in one second?
- Is the visual metaphor conceptually direct?
- Does the deck feel premium throughout?
- Are any slides generic, crowded or visually weak?
- Is the ending the strongest image in the presentation?

## H. Motion designer

Ask:

- Does every animation explain causality or transformation?
- Are any reveals repetitive?
- Are transitions meaningful?
- Does motion remain coherent during fast navigation?
- Is reduced motion complete rather than degraded?

## I. Frontend engineer

Ask:

- Are state transitions deterministic?
- Is cleanup complete?
- Are shared components appropriately scoped?
- Is implementation maintainable?
- Are there unnecessary abstractions?
- Are there fragile cross-slide dependencies?

## J. Originality reviewer

Determine whether any active sequence still feels recognisably derived from the rejected Florian Bruce Boye framework, especially:

- evolution of problem solving;
- repurposed versus purpose-built;
- lighting, communication or refrigeration analogies;
- engineered perfect solution;
- 90% or 99% convergence;
- full-market-cap absorption logic.

Distinguish common Bitcoin concepts from a recognisable narrative fingerprint.

---

# 8. Phase 5 — Section-specific scrutiny

## Sections 1–3

These sections were retained from the original presentation.

Compare their:

- visual maturity;
- density;
- motion;
- typography;
- storytelling sophistication;
- speaker-note quality;
- factual freshness;

against Section 4.

Determine whether they now feel like an older presentation attached to a newer one.

Do not assume they require redesign. Recommend changes only where the benefit is material.

## Section 4

This is the heart of the review.

Challenge:

- the `claim on value` language;
- `earned` versus later transferred, inherited or gifted claims;
- the surgeon example;
- the unfinished-exchange model;
- the claim/carrier distinction;
- the store-of-value definition;
- purchasing power versus redeemability;
- the 100-Year Test;
- all ten failure modes;
- all ten properties;
- candidate definitions;
- every score in the comparison table;
- the no-total-score presentation;
- the architecture-versus-valuation bridge;
- store-of-value migration;
- monetary premium;
- Bitcoin's monetary utility;
- Gold's special status;
- marginal savings allocation;
- fixed-supply repricing;
- the final conclusion.

For every challenge, classify it as one of:

- fatal conceptual flaw;
- high-impact fixable issue;
- missing qualification;
- reasonable disagreement;
- subjective preference;
- speculative alternative.

Do not blur these categories.

---

# 9. Phase 6 — Visual invention pass

After critiquing the current visuals, propose genuinely better alternatives only where you have a strong case.

Do not suggest generic ideas such as:

- add an icon;
- use a chart;
- make it more dynamic;
- add more animations;
- use a gradient;
- use glassmorphism;
- add decorative particles.

For each proposed visual alternative, specify:

1. slide and build;
2. concept to communicate;
3. current visual;
4. proposed visual;
5. exact 16:9 composition;
6. visual hierarchy;
7. progressive-build logic;
8. transition in;
9. transition out;
10. why it is better;
11. what could be lost;
12. implementation difficulty;
13. whether it requires a new asset;
14. whether it preserves the black/orange identity.

Pay special attention to:

- repeated ClaimObject usage;
- typographic-list fatigue;
- comparison-table legibility;
- asset-render consistency;
- visual continuity between Sections 1–3 and 4;
- whether 4.23 is the most memorable frame;
- whether any strong idea currently lacks an equally strong visual;
- whether any visual overstates the intellectual claim.

Prefer fewer high-impact alternatives over a redesign suggestion for every slide.

---

# 10. Phase 7 — Factual and sourcing audit

Create a list of every active claim that is:

- time-sensitive;
- numerical;
- historical;
- institutional;
- regulatory;
- technical;
- market-related;
- dependent on a specific date.

For each, report:

- exact slide and note location;
- exact claim;
- whether it is currently sourced;
- whether it is current;
- whether it needs verification;
- what primary source type is appropriate;
- whether wording should be narrowed;
- whether it should be removed if it cannot be supported.

Do not silently rewrite facts.

---

# 11. Phase 8 — Final report

Create:

```text
review/opus-5/MASTER_REVIEW.md
```

Use this structure.

## 1. Executive judgment

Include:

- strongest aspects;
- weakest aspects;
- whether the deck is ready to record;
- the single most important improvement;
- expected benefit of the recommended changes.

## 2. Top ten findings

Rank by impact, not ease.

## 3. Narrative review

Cover:

- whole deck;
- Section 1;
- Section 2;
- Section 3;
- Section 4;
- close.

## 4. Intellectual review

Cover:

- definitions;
- causal claims;
- qualifications;
- objections;
- all ten properties;
- all fifty scores;
- investment thesis.

## 5. Visual and motion review

Cover:

- whole-deck system;
- section consistency;
- slide-by-slide observations;
- transitions;
- screenshots;
- proposed visual alternatives.

## 6. Technical review

Cover:

- bugs;
- architecture;
- deterministic state;
- cleanup;
- performance;
- accessibility;
- reduced motion;
- notes;
- restoration;
- direct links;
- inactive legacy code.

## 7. Factual audit

List claims requiring verification or updates.

## 8. Proposed visual alternatives

Make them detailed enough for implementation.

## 9. Changes not recommended

Identify strong choices that should be protected and explain why.

## 10. Prioritised improvement plan

Divide into:

- must fix before recording;
- high-value refinements;
- optional experiments;
- do not change.

---

# 12. Finding format

Every substantive finding must use:

```text
ID:
Severity / opportunity:
Confidence:
Section / slide / build:
Files:
Observation:
Evidence:
Why it matters:
Recommendation:
Alternative:
Trade-off:
Estimated effort:
```

Use severity values:

```text
Critical
High
Medium
Low
Opportunity
Speculative
```

Use confidence values:

```text
High
Medium
Low
```

Separate objective defects from subjective art direction.

---

# 13. Final behavioural instructions

- Be independent.
- Do not flatter.
- Do not invent problems to appear useful.
- Do not preserve weak work merely because it is approved.
- Do not reject strong work merely to be novel.
- Verify the running deck visually.
- Use evidence from actual slides and notes.
- Separate defects, improvements, alternatives and experiments.
- Prefer fewer, higher-impact recommendations.
- Explain why every proposed change is better.
- Do not implement anything until the user approves the review.
