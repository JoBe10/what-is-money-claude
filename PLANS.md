# Section 4 Rebuild Plan

**Revision:** 2.0 — recovery-first, implementation-ready after Phase 0  
**Last reviewed:** 2026-07-17

## Status and scope

This is the implementation plan for the approved seventeen-slide Section 4 rebuild in
`docs/section-4-master-brief.md`. It is based on a full repository audit performed on
2026-07-17. No implementation work is included in this plan.

The master brief is the narrative source of truth. The implementation must preserve its
argument, terminology, qualifications, ten properties, five carriers, and all fifty
comparison scores. Visual composition, build granularity, component boundaries, and the
specific use of shared DOM are implementation judgments, provided they do not change the
approved meaning.

## Phase 0 — Repository recovery and baseline lock

Implementation is **not yet safe** against the current worktree. The audit found:

- Git reports all 110 files in `HEAD` as staged deletions while same-named replacements are
  mostly present as untracked files.
- `src/styles/globals.css`, `src/styles/slides.css`, `vite.config.js`, and
  `tailwind.config.js` are absent from the worktree, although complete versions exist in
  `HEAD`.
- Eight active/helper JavaScript files are zero bytes: Section 4 slides 07 and 09-13, the
  problem-solving row data, and the Section 5 close.
- Eleven referenced PNG files are zero bytes, including the Section 3 opener artwork and
  most large scene artwork. The five comparison icons are intact.
- Dependencies are not installed, so no trustworthy baseline build exists.
- The current branch is `main`; implementation must happen on a dedicated branch.

This phase must be completed before any slide or engine implementation.

### Recovery principle

Do not assume the worktree can simply be discarded. Some same-named untracked files may
contain meaningful local edits. The recovery must therefore be **backup-first and
comparison-aware**.

### Required recovery procedure

1. Record diagnostics before changing anything:
   - current branch and `HEAD`;
   - remotes;
   - `git status --short`;
   - staged name-status;
   - lists of missing tracked files, untracked files, and zero-byte files.
2. Create a timestamped backup **outside the repository** of the entire current worktree,
   excluding `.git`, `node_modules`, and generated build output.
3. Preserve separate verified copies of:
   - `AGENTS.md`;
   - `docs/section-4-master-brief.md`;
   - `PLANS.md`.
4. Compare non-empty same-named worktree files with their `HEAD` versions. Report any files
   whose local contents differ materially from `HEAD`; do not silently discard those
   differences.
5. Unless the user identifies the damaged state as intentional, restore the complete
   tracked baseline from `HEAD`.
6. Restore the three planning files from the external backup.
7. Create and switch to:
   - `rebuild-section-4`
8. Install exactly from the lockfile with `npm ci`.
9. Run the untouched baseline with:
   - `npm run build`;
   - `npm run dev` for a manual/browser smoke review when available.
10. Confirm:
    - required CSS/config files are present;
    - no active JavaScript or referenced image is zero bytes;
    - the existing 46-slide deck loads;
    - Section 3, current Section 4, the close, notes, and navigation work at baseline.
11. Leave the branch clean except for the three planning files, or create one explicit
    checkpoint commit containing only those files if the user authorises commits.

### Phase 0 acceptance gate

Do not proceed until the recovery report confirms:

- the external backup path;
- whether any meaningful local edits differed from `HEAD`;
- the restored `HEAD` commit;
- the active `rebuild-section-4` branch;
- successful `npm ci`;
- successful baseline `npm run build`;
- baseline browser status;
- exact remaining Git changes.

If restoration from `HEAD` does not produce a valid baseline, stop. Do not improvise repairs
inside Milestone 1. Compare against `origin/main` or reclone into a clean sibling directory,
then reapply only the planning files after the user approves the recovery path.

## Current architecture and audit findings

### Runtime and build

- The deck is vanilla JavaScript with ES modules, Vite 5, PostCSS/Tailwind, and GSAP as the
  only runtime dependency. There is no frontend framework.
- `src/main.js` imports the two global stylesheets, creates `SlideEngine`, and passes it the
  static slide manifest.
- `package.json` exposes only `dev`, `build`, and `preview`. There is no lint command and no
  automated test command. Validation therefore needs build, targeted static assertions,
  and browser review.
- GSAP is declared and locked but is not currently imported by the source. The rebuild may
  use it; no dependency addition is required.
- `index.html` loads Inter and the Tabler icon webfont from external CDNs. Section 4's core
  meaning must not depend on those icons loading; CSS/DOM labels remain the fallback.

### Manifest, IDs, and numbers

- `src/slides/manifest.js` uses static imports and five section arrays. The current active
  deck has 46 slides: 7 opening, 15 history, 10 functions, 13 ideal-store, and 1 close.
- Navigation, overview labels, progress, numeric deep links, and the main notes overlay use
  manifest indices. Numeric deep links do not use a slide module's `number` field.
- The module `number` fields contain two historical gaps caused by deleted slides: opening
  slide 4 and functions slide 3. Current Section 4 is numbered 35-47 even though it occupies
  manifest positions 33-45; the close is numbered 48 but occupies position 46.
- `NotesOverlay.setSlide()` receives the manifest position from the engine, but the initial
  render in the popped-out notes window reads `slide.number`. Canonical metadata therefore
  matters for consistent presenter displays.
- Existing Section 4 IDs encode both section and local order. Because the approved order is
  materially different, keeping an old ordinal ID on a new position would make it less
  stable, not more stable. New semantic IDs are proposed for all seventeen slides.

### Slide engine and lifecycle

- Slides render into a fixed 1920x1080 logical canvas that is scaled to the viewport.
- Standard transitions render a new container, fade it in, call `onEnter`, and optionally
  restore a build step from session storage. The URL stores the slide; session storage
  stores slide index plus build step for refresh/HMR recovery.
- A slide with `continuesFrom` reuses the current container. The destination `render()` is
  not called, so both slides must understand one cached scene API and must support direct
  entry independently.
- The continuous branch currently resets `buildStep` to zero and does not honor
  `jumpToEnd` or a requested target build step. A narrow engine correction is required
  before using continuation on build-heavy Section 4 slides.
- The engine handles global reduced-motion slide fades. Existing slide-local delayed
  callbacks still wait under reduced motion, so Section 4 needs an explicit motion scope
  rather than relying on the global CSS rule alone.
- Existing scene components demonstrate the cached-container pattern, but several retain
  uncancelled removal timeouts. The new components should reuse the contract, not copy the
  cleanup weakness.

### Current Section 4

- The active section has 13 slides. Only the transition slide has a build step; the rest are
  static despite the deck's progressive-build style.
- Slides 4.04 and 4.05 contain the exact approved ten properties, five carriers, and score
  matrix. Those data are the strongest reusable part of the current section.
- The comparison notes currently call Bitcoin the clear winner rather than presenting the
  table as a debatable first-principles assessment. The data stay; the posture changes.
- The current volatility slide treats volatility mostly as an adoption consequence and
  implies it will decrease. It does not distinguish market valuation from monetary
  architecture and must be replaced.
- The current cash-flow slide reduces yield to risk, calls Bitcoin and gold pure stores of
  value, and overstates preservation. It must be replaced by the approved saving/investing
  and native-yield framework.
- The standalone `Don't trust, verify` slide repeats the prohibited thought experiment and
  economic-energy language. Its one approved idea moves into the comparison's final build.
- The problem-solving scene, three examples, helper data, and engineered-Bitcoin ending are
  fully obsolete. None of their narrative or notes may survive in active code.
- Every replacement slide must receive complete rehearsal-ready notes in the same change as
  its visible slide.

### Entry from Section 3 and exit to Section 5

- Section 3 ends on `3-11-where-is-bitcoin`, which positions Bitcoin between collectible
  and store of value. Earlier Section 3 copy states that store of value is the foundation.
  Approved slide 4.01 should answer this directly by asking what that function stores. A
  separate Section 4 opener would weaken that handoff and is not retained.
- Section 3 already uses a long shared-DOM monetisation sequence. Section 4 should not
  inherit that scene, but its final store-of-value state provides the visual memory that
  slide 4.01 can briefly echo with `FunctionColumn`.
- The close remains the existing `Thank you` slide and keeps ID, visible copy, and notes.
  Only its absolute number changes. Slide 4.17 uses a standard transition into it so the
  rhetorical pause is not consumed by another morph.

### Styles and assets

- `globals.css` defines the black background, Bitcoin orange, text hierarchy, semantic
  success/danger colors, borders, 1920x1080 canvas, deck chrome, overlays, and the global
  reduced-motion rule.
- `slides.css` defines the shared type scale, kicker, build list, image fade, footer, and
  particle field. New Section 4 selectors should be namespaced `.s4-*` here; no new global
  palette is needed.
- Most slides use inline layout styles. Shared components should move repeated Section 4
  state styling into `slides.css`, while genuinely one-off geometry may stay local.
- `src/assets.js` centrally imports every image. The five asset icons needed by the approved
  comparison and rulebook reveal are intact and reusable.
- The obsolete problem-solving imports keep all related icons in the bundle. Remove those
  imports/exports only after the replacement rulebook sequence works. Keep the physical
  image files unless separate deletion approval is given.
- No new bitmap is required by the approved plan. The surgeon is represented abstractly
  with DOM/SVG and text, not as an identifiable person or stock image. The claim, pools,
  timeline, threats, rulebooks, and network can all be rendered in code.

## Locked narrative constraints

The following decisions are already approved and are not implementation choices:

- The exact seventeen-slide order, titles, purposes, transitions, and narrative spine.
- Value is subjective; the surgeon example must not imply that an hour of labor has
  objective value.
- Money is a transferable counterclaim, with `claim` explained as economic rather than a
  legal demand against a named debtor.
- Claim and carrier are distinct. Economic energy may be a secondary metaphor only after
  that distinction, never the formal definition.
- Saving keeps the final exchange open; a store of value preserves integrity and usability
  of an unredeemed claim through time.
- The claim-pool/output-pool illustration is simplified. It must not imply legal ownership
  of a fixed share of all assets or guaranteed purchasing power.
- The 100-Year Test, the ten failure modes, and derivation of positive properties.
- The exact ordered properties:
  `No inflation possible`, `Divisible`, `Liquid`, `Portable`,
  `No / low cost of storage`, `No one controls it`, `Durable`, `Verifiable`,
  `Fungible`, and `Track record`.
- The five carriers and every current score:

  | Property | Gold | Fiat | Bitcoin | Property | Shares |
  | --- | ---: | ---: | ---: | ---: | ---: |
  | No inflation possible | 4 | 1 | 5 | 3 | 2 |
  | Divisible | 3 | 4 | 5 | 1 | 2 |
  | Liquid | 3 | 5 | 4 | 2 | 5 |
  | Portable | 2 | 4 | 5 | 1 | 4 |
  | No / low cost of storage | 2 | 4 | 4 | 1 | 4 |
  | No one controls it | 4 | 1 | 5 | 1 | 1 |
  | Durable | 5 | 3 | 5 | 4 | 3 |
  | Verifiable | 4 | 4 | 5 | 3 | 4 |
  | Fungible | 5 | 4 | 4 | 1 | 4 |
  | Track record | 5 | 3 | 2 | 4 | 3 |

- The table is the presenter's transparent assessment; scores are debatable and must not
  be attributed to Florian Bruce Boye.
- Stability splits into market valuation and monetary architecture. Bitcoin fixes neither
  demand nor price; it fixes the rules through which the market discovers price.
- Present volatility is a cost or symptom of monetisation, not the feature and not
  guaranteed to decline.
- Saving and investing perform different jobs. No native yield is not itself a virtue; the
  relevant advantage is no required yield-producing counterparty or enterprise.
- All five carriers have dependencies. Bitcoin has a different and unusually transparent
  architecture, not an absence of dependencies or risk.
- The future cannot be predicted and Bitcoin cannot guarantee 2126 purchasing power. The
  claim is delivered as access to a future market under unusually predictable rules.
- The civilization coda concerns coordination and incentive gradients, not monetary
  determinism.
- The final distinction is that price should be free to move while monetary rules should
  be hard to move.
- No old thought experiment, German adviser reference, problem-solving examples, perfect
  solution language, stale notes, or `L1:` artifacts remain active.

## Implementation restraint

The audit provides a strong architecture, but implementation must remain proportional.

- Prefer the smallest abstraction that supports deterministic builds and cleanup.
- Do not create a general animation framework when `gsap.context()` plus a tiny helper is
  sufficient.
- Do not expose a large semantic-state API from the monetary-claim primitive. Scene
  components should translate narrative states into a small set of visual operations.
- Create a shared component only when at least two slides genuinely share behavior or DOM.
- Preserve existing engine and component contracts unless a demonstrated defect blocks an
  approved interaction.
- Prototype the recurring claim motif in the 4.02-4.04 sequence before extending it across
  the section.
- No infrastructure refactor may become larger than the slide work it enables.

The target architecture below is a guide, not permission to over-engineer. Codex must report
any proposed simplification that preserves all acceptance criteria.

## Proposed target architecture

### Section-owned data

Create `src/slides/section-4-ideal-store/_store-of-value-data.js` as the single source for:

- the ten ordered property names and approved meanings;
- the five carrier IDs, labels, and image keys;
- the immutable 10x5 score matrix;
- the five exact dependency lists for the hidden-rulebook reveal.

Use image-key strings rather than importing PNGs into this data module. Slides resolve the
keys through `src/assets.js`. This keeps the data module importable by a Node assertion
command without teaching Node how to load images.

### Orange monetary-claim motif

Create a Section 4 component family under `src/components/section-4/`:

1. `MotionScope.js` or an equivalent thin helper
   - First test whether `gsap.context()` plus direct cleanup is sufficient.
   - Create this helper only if it materially reduces repeated lifecycle code.
   - Keep the public API minimal: register/cancel motion, detect reduced motion, and destroy.
   - Do not build a general-purpose animation framework.
   - Use zero-duration state application under reduced motion.

2. `MonetaryClaim.js`
   - Render one abstract orange aperture/capsule with a stable silhouette, inner core, and
     restrained halo. It is not a coin, dollar sign, battery, or literal substance.
   - Keep the primitive API small, for example
     `{ el, setVisualState, setTransform, duplicate, destroy }`.
   - Scene components map narrative meanings such as created, transferable, diluted, or
     arrived onto a small set of visual properties. Do not put the whole seventeen-slide
     state machine inside the primitive.
   - State changes alter only conceptually meaningful attributes: opacity/clarity, shell
     integrity, obstruction, copies, position, scale, and connection points.
   - Never encode a slide number in the primitive.

3. `ExchangeClaimScene.js`
   - Shared scene API for slides 4.02-4.04, cached on the active container.
   - Own the abstract surgeon/service context, $400 receipt, detachable claim, transfer
     path, and historical carriers.
   - Expose a pure `apply({ mode, step, animate })` method for unfinished exchange,
     definition, and claim/carrier modes.

4. `ClaimIntegrityScene.js`
   - Shared scene API for slides 4.05-4.06.
   - Own the spend/save fork, timeline, claim pool, output pool, reset, and dilution state.
   - Keep the simplified model visually labeled as such and keep real-output and monetary-
     claim changes visually distinct.

5. `CenturyClaimScene.js`
   - Shared visual grammar for slides 4.07-4.08 and, when recreated later, 4.14-4.15.
   - Own the 2026-to-2126 path, unknowns, threat transformations, arrival, and handoff to
     the coordination network.
   - Direct entry to any of those slides constructs the correct scene without depending on
     the earlier visit.

6. `CarrierSet.js`
   - Render the five approved carrier identities in one stable order and geometry.
   - Reuse it in the comparison and hidden-rulebook reveal so the audience recognizes the
     same carriers even though the slides are not adjacent.

7. `RulebookReveal.js`
   - Own the 4.13 surface-removal and dependency-layer reveal.
   - Consume the shared carrier/dependency data; do not embed alternate copy.

8. `CivilizationNetwork.js`
   - Build a deterministic, bounded SVG/DOM network from monetary-claim nodes.
   - Use a fixed node/edge set, transforms and opacity only, and no random O(n^2) simulation.
   - Support a static final network in reduced-motion mode.

The primitive ensures recognition across all seventeen slides; scene components prevent it
from becoming one monolithic component with seventeen unrelated switches.

### Tables and analytical visuals

- Retain `PropertiesTable.js`, but add a deterministic cumulative reveal API and semantic
  row hooks. Preserve the exact order; any optional four-category labels are secondary and
  may not reorder or rename properties.
- Retain `ComparisonTable.js`, but separate its header through `CarrierSet`, expose row and
  score emphasis APIs, replace gratuitous hard-coded presentation values with tokens where
  possible, and keep the five discrete score buckets. The numbers never animate between
  values.
- Keep slides 4.11, 4.12, 4.16, and 4.17 as slide-local compositions around shared
  primitives. Their two-column/path layouts do not recur enough to justify generic
  dashboard components.

## Exact slide, file, ID, number, and build map

The proposed module `number` equals actual one-based manifest position. There will be 50
active slides after the rebuild; Section 4 occupies positions 33-49 and the close is 50.

| Local | Approved title | Proposed file | Semantic ID | Absolute number | Builds | Shared DOM |
| --- | --- | --- | --- | ---: | ---: | --- |
| 4.01 | The Store-of-Value Problem | `01-store-of-value-problem.js` | `4-01-store-of-value-problem` | 33 | 2 | Standard entry from Section 3 |
| 4.02 | The Unfinished Exchange | `02-unfinished-exchange.js` | `4-02-unfinished-exchange` | 34 | 5 | New `ExchangeClaimScene` |
| 4.03 | What Is Money? | `03-what-is-money.js` | `4-03-what-is-money` | 35 | 4 | `continuesFrom: 4-02-unfinished-exchange` |
| 4.04 | The Claim and Its Carrier | `04-claim-and-carrier.js` | `4-04-claim-and-carrier` | 36 | 7 | `continuesFrom: 4-03-what-is-money` |
| 4.05 | Saving Keeps the Exchange Open | `05-saving-keeps-exchange-open.js` | `4-05-saving-keeps-exchange-open` | 37 | 4 | New `ClaimIntegrityScene` |
| 4.06 | The Integrity of the Claim | `06-integrity-of-claim.js` | `4-06-integrity-of-claim` | 38 | 8 | `continuesFrom: 4-05-saving-keeps-exchange-open` |
| 4.07 | The 100-Year Test | `07-100-year-test.js` | `4-07-100-year-test` | 39 | 4 | New `CenturyClaimScene` |
| 4.08 | How Could the Claim Fail? | `08-claim-failure-modes.js` | `4-08-claim-failure-modes` | 40 | 7 | `continuesFrom: 4-07-100-year-test` |
| 4.09 | The Ten Properties of an Ideal Store of Value | `09-ten-properties.js` | `4-09-ten-properties` | 41 | 5 | Standard; `PropertiesTable` |
| 4.10 | Which Carrier Survives Best? | `10-carrier-comparison.js` | `4-10-carrier-comparison` | 42 | 7 | Standard; `ComparisonTable` |
| 4.11 | What Should Actually Be Stable? | `11-two-kinds-of-stability.js` | `4-11-two-kinds-of-stability` | 43 | 6 | Standard |
| 4.12 | Why Doesn't Bitcoin Pay a Native Yield? | `12-native-yield.js` | `4-12-native-yield` | 44 | 5 | Standard |
| 4.13 | Every Carrier Has a Hidden Rulebook | `13-hidden-rulebooks.js` | `4-13-hidden-rulebooks` | 45 | 8 | Standard; matching `CarrierSet` geometry |
| 4.14 | Return to 2126 | `14-return-to-2126.js` | `4-14-return-to-2126` | 46 | 5 | Recreated `CenturyClaimScene` |
| 4.15 | From One Exchange to Civilization | `15-exchange-to-civilization.js` | `4-15-exchange-to-civilization` | 47 | 5 | `continuesFrom: 4-14-return-to-2126` |
| 4.16 | Money Changes the Payoff to Patience | `16-payoff-to-patience.js` | `4-16-payoff-to-patience` | 48 | 3 | Standard |
| 4.17 | The Rules Beneath Everything | `17-rules-beneath-everything.js` | `4-17-rules-beneath-everything` | 49 | 5 | Standard; standard exit to close |

The proposed build counts are implementation judgments. They follow every approved build
beat while grouping only closely related failure modes. They may be reduced after a live
pacing review only by combining visual beats, never by deleting approved reasoning or
speaker-note qualifications.

### Slide-level visual and note contract

1. **4.01:** Reuse `FunctionColumn` to echo the three Section 3 functions. Medium of
   exchange and unit of account recede; store of value remains; the approved question
   replaces the echo. Notes bridge directly from `3-11-where-is-bitcoin`.
2. **4.02:** Show the completed operation abstractly, then knowledge, judgment, training,
   dexterity, and responsibility, then $400, the question, absent final goods/services, and
   `The exchange is not finished.` Notes explicitly reject objective labor-hour value.
3. **4.03:** Reject final-good and physical-substance interpretations, reveal the exact
   formal definition, then show transfer across people, space, and time. Notes define claim
   economically, explain legitimate origin and later rightful transfer, and may include a
   restrained Argentarius attribution.
4. **4.04:** Move the same claim through shells, precious metal, paper, bank ledger, and
   Bitcoin one at a time, then reveal claim/function versus asset/carrier and the four
   outcomes. The battery line remains optional spoken support only.
5. **4.05:** Split spend/redeem-now from save/carry-forward, move the saved claim into time,
   and reveal the exact store-of-value definition. Notes explain integrity and usability.
6. **4.06:** Run the fixed-claims/rising-output case, visibly reset, then run rising-claims/
   unchanged-output dilution. Use all required lines. Notes name preferences, money demand,
   credit, productivity, population, market structure, and available goods as omitted real-
   world variables.
7. **4.07:** Seal one chosen carrier and send the claim toward 2126. Reveal unknown country,
   currency, institutions, technology, political rules, and future needs selectively, then
   ask the approved property question. Avoid science-fiction scenery.
8. **4.08:** Pair the ten approved failure modes into readable visual beats without dropping
   any. Transform threats into positive protections and end on the approved core line.
9. **4.09:** Reveal the ten exact properties cumulatively in exact order. Optional group
   labels remain secondary. Notes present the framework as the presenter's own work.
10. **4.10:** Reveal the immutable table in readable groups, return to the complete matrix,
    state that scores are debatable, and finish with `Don't trust the table. Verify every
    score.` Notes transition to stability.
11. **4.11:** Follow the six approved beats and required lines. The final frame contains
    `Price should be free to move. The monetary rules should be hard to move.` Notes call
    present volatility a cost/symptom and make lower future volatility an expectation, not
    a promise.
12. **4.12:** Open with the exact objection, distinguish save/vault and invest/factory,
    explain what yield compensates, state the required-counterparty distinction, and end on
    `Under depreciating money, investing has become the new saving.` Notes respect
    productive assets and state that Bitcoin is not risk-free.
13. **4.13:** Recreate the exact five-carrier geometry from 4.10, remove surface identities,
    reveal all five approved dependency lists, and deliver both required reveal lines.
    Bitcoin's dependencies remain visible and comparable.
14. **4.14:** Return to the exact century geometry, show changed governments, institutions,
    technology, preferences, and markets, ask which discretionary decisions mattered, and
    state both the limit and benefit of the test. The claim arrives as market access, not a
    guaranteed consumption basket.
15. **4.15:** Transform the arriving claim into connections among workers, businesses,
    savers, pensioners, entrepreneurs, and consumers, then across geography and
    generations. Stop at the approved coordination-protocol reveal.
16. **4.16:** Contrast the two exact causal paths, then reveal both required incentive lines.
    Notes repeatedly frame tendencies rather than inevitabilities.
17. **4.17:** State the non-promise, the single-issuer rulebook benefit, the price/rules
    distinction, and the approved closing question in order. Hold the final state briefly;
    do not add valuation arithmetic or another Bitcoin-is-perfect claim.

## Current Section 4 module disposition

| Current module | Disposition | Replacement/reason |
| --- | --- | --- |
| `01-transition.js` | Replace and remove after M1 validation | `01-store-of-value-problem.js`; preserves the bridge but asks the approved deeper question |
| `02-section-opener.js` | Remove after M1 validation | No standalone opener in the approved arc; its perfect-container/economic-energy framing is obsolete |
| `03-thought-experiment.js` | Replace and remove after M1 validation | `03-what-is-money.js`; old wording and German-adviser attribution are prohibited |
| `04-properties.js` | Retain data only; replace module in M2 | Data moves to `_store-of-value-data.js`; presentation moves to `09-ten-properties.js` |
| `05-comparison.js` | Retain data and component concept; replace module in M2 | Scores move unchanged to shared data; presentation moves to `10-carrier-comparison.js` |
| `06-objection-volatility.js` | Replace and remove in M2 | `11-two-kinds-of-stability.js` implements the approved two-stability framework |
| `07-objection-cashflow.js` | Replace and remove in M2 | `12-native-yield.js` implements saving versus investing and native yield |
| `08-dont-trust-verify.js` | Remove in M2 | Approved verification line becomes the last build of 4.10; old notes are prohibited |
| `09-problem-solving-intro.js` | Replace and remove in M3 | `13-hidden-rulebooks.js` is a different argument and does not reuse the old scene |
| `10-example-light.js` | Remove in M3 | Lighting example is explicitly deleted from the narrative |
| `11-example-communication.js` | Remove in M3 | Communication example is explicitly deleted from the narrative |
| `12-example-food.js` | Remove in M3 | Refrigeration example is explicitly deleted from the narrative |
| `13-bitcoin-solution.js` | Replace and remove in M3 | `17-rules-beneath-everything.js`; removes perfect/purpose-built overclaim and market-size ending |
| `_problem-solving-rows.js` | Remove in M3 | Data belongs only to the deleted examples |

Old files stay on disk but out of the manifest until the corresponding replacements pass
their milestone validation. Deletion then occurs in the same milestone before its final
build, preserving an easy rollback point.

## Shared component disposition

| Component | Decision | Reason |
| --- | --- | --- |
| `KickerLabel` | Reuse unchanged | It is the deck's established section label and already uses the right token/class contract |
| `BuildList` | Reuse selectively | Suitable for cumulative text reveals, but not for every cinematic transformation; static approved HTML only |
| `FunctionColumn` | Reuse unchanged on 4.01 | It creates an exact visual echo of Section 3 without copying that markup |
| `FunctionsRow` | Do not force into 4.01 | Its reveal API cannot focus/recede arbitrary functions; compose the three columns directly instead |
| `PropertiesTable` | Retain and extend | It matches the ten-item analytical job and avoids another local table implementation |
| `ComparisonTable` | Retain and extend | The existing grid is structurally strong and contains the correct score visualization; it needs build APIs and legibility work, not replacement |
| `OrangePillCapsule` | Do not reuse | It is a baked two-PNG crossfade for Section 1, not an abstract monetary claim; use its cached-API pattern only |
| `SectionOpener` | Do not use in Section 4 | The approved first slide is a narrative bridge, not an image-led part opener |
| `CharacterCard` | Do not reuse | Letter avatars and HAS/WANTS rows would trivialize the surgeon example and pull it back toward barter |
| `EvolutionScene` | Do not reuse | Its fixed six-stage history timeline and delayed layer removal are domain-specific |
| `MonetisationScene` | Do not reuse | Its four fixed pills belong to Section 3; retain only as a reference for direct-entry continuation behavior |
| `ProblemSolvingScene` | Remove in M3 | Its complete semantic and asset model is explicitly rejected by the master brief |
| `AmbientCrystal` | Do not reuse | A rotating gem suggests contained substance and its local reduced-motion selector does not target the animated SVG |
| `Murmuration` | Do not reuse | Random O(n^2) flocking is visually unrelated and too expensive/nondeterministic for the civilization network |

`ProblemSolvingScene.js` is the only shared component removed. All other non-reused
components remain untouched because Sections 1-3 still own them.

## Continuation strategy

Use `continuesFrom` only at these five boundaries:

1. `4-02-unfinished-exchange` -> `4-03-what-is-money`: the claim detaches from the concrete
   exchange and becomes the definition.
2. `4-03-what-is-money` -> `4-04-claim-and-carrier`: the same abstract claim enters
   successive carriers.
3. `4-05-saving-keeps-exchange-open` -> `4-06-integrity-of-claim`: the saved claim becomes
   the highlighted claim in the simplified integrity model.
4. `4-07-100-year-test` -> `4-08-claim-failure-modes`: threats act on the claim already
   travelling through the century.
5. `4-14-return-to-2126` -> `4-15-exchange-to-civilization`: the arrived claim multiplies
   into a coordination network.

Do not use `continuesFrom` in these tempting cases:

- 4.06 -> 4.07 uses matching claim geometry but a standard transition, providing a breath
  before the named 100-Year Test.
- 4.09 -> 4.10 aligns property rows visually but uses separate table components, avoiding a
  fragile table-shape morph.
- 4.10 -> 4.13 cannot be a direct continuation because slides 4.11 and 4.12 intervene.
  `CarrierSet` recreates the exact carrier geometry instead.
- 4.13 -> 4.14 changes from a dense dependency reveal to the century resolution. A clean
  transition is clearer than retaining a hidden shared scaffold.
- 4.17 -> close is deliberately standard so the closing slide has its own breath.

Every continuation destination still implements `render()` for overview jumps, semantic
deep links, numeric deep links, reloads, and HMR. The cached API is an optimization for
adjacent narrative flow, never the only construction path.

## Animation and state contract

### Pure cumulative state

Every Section 4 slide implements one cumulative `applyBuild(step, { animate })` function:

- Clamp `step` to `0..totalBuildSteps`.
- Cancel transient motion affecting the same refs.
- Apply the complete target state for that step, including hiding/resetting everything from
  later steps. Never assume step `n - 1` ran.
- `buildStep(0)` is a complete, intelligible initial frame.
- Backward builds call the same function and reconstruct the earlier state.
- A force-next during motion cancels the in-flight tween and lands at the requested state or
  lets `onExit` destroy it; it never leaves an intermediate transform.

### Render, enter, exit, and continuation

- `render(container)` creates DOM, caches only current-container refs, and applies step 0
  without animation.
- Standard `onEnter` starts only the entrance motion for the already-applied state. It does
  not schedule uncancellable raw timeouts.
- Continuous `onEnter` obtains the API from the current container, cancels outgoing motion,
  and calls the destination scene mode with a complete target state.
- `onExit({ continuous: true })` cancels transient motion but leaves the shared DOM and API.
- `onExit({ continuous: false })` kills GSAP contexts, delayed calls, RAFs, listeners, and
  observers; deletes the cached API; clears slide-local refs.
- Lazy style/keyframe injection is not used. Shared `.s4-*` animation/state classes live in
  `slides.css`, preventing duplicates across re-entry and HMR.

### Engine correction

Make one scoped change in `SlideEngine._render`:

- Resolve the destination target step before choosing standard versus continuous rendering.
- Honor `jumpToEnd` and `targetBuildStep` in the continuous branch just as in the standard
  branch.
- Pass the resolved target step to `onEnter` and invoke `buildStep` deterministically after
  mode application.
- Preserve current index-based URL behavior, transition duration, and all existing public
  controls.

Add development-time manifest validation at engine construction or manifest export for
duplicate IDs, duplicate numbers, and invalid `continuesFrom` references. It should fail
loudly during development rather than silently corrupt deep links. Enforce strict
contiguous numbering in the final integration assertion, not in the temporary M1/M2
manifests whose close slide intentionally retains its final-baseline metadata until M3.

### Forward, backward, re-entry, HMR, and deep links

- Normal forward navigation starts each next slide at step 0 and advances through every
  declared step.
- Normal backward navigation follows existing deck semantics and enters the prior slide at
  step 0; Arrow Up/force-previous uses the engine's `jumpToEnd` path and must land at that
  slide's final build, including on continuous boundaries.
- Standard re-entry creates fresh DOM and fresh motion scope. Continuous backward entry
  applies the prior mode from scratch on the shared scene.
- HMR/full reload restores the saved manifest index and build step. The target slide is
  rendered directly, then its cumulative build function applies the saved step without
  replaying intermediate animation.
- A fresh semantic or numeric deep link starts at build 0. Direct links to continuation
  destinations render complete standalone DOM rather than looking for a predecessor.
- Old Section 4 semantic IDs intentionally stop resolving after the replacement. New IDs
  are checked individually; numeric links follow the new manifest positions.

### Reduced motion

- `MotionScope` reads `prefers-reduced-motion` for every scene creation and treats it as an
  explicit zero-duration mode.
- All content and conceptual state changes remain present; only interpolation, pulsing,
  travel, and ambient motion disappear.
- The century path shows start/end positions through static connectors, failure modes use
  static before/after forms, and the civilization network renders its final stable layout.
- There are no delayed text reveals under reduced motion. Each build step lands immediately.
- A media-query change during a running slide cancels current motion and reapplies the same
  logical step in the new mode.

## Manifest and absolute-number changes

### Final manifest

Replace the 13 current Section 4 imports with `s4_01` through `s4_17` in the exact order in
the slide map. Final section counts are:

| Section | Current active | Final active | Manifest positions |
| --- | ---: | ---: | --- |
| Opening | 7 | 7 | 1-7 |
| History | 15 | 15 | 8-22 |
| Functions | 10 | 10 | 23-32 |
| Ideal Store | 13 | 17 | 33-49 |
| Close | 1 | 1 | 50 |

### Canonical number migration

The master brief requires correct absolute numbers, not preservation of two deleted-slide
gaps. Canonicalize all module `number` values to current manifest position during the final
integration pass:

| Files | Current number(s) | Final number(s) |
| --- | --- | --- |
| Opening `01-title.js` through `03-why-care.js` | 1-3 | unchanged 1-3 |
| Opening `05-matrix.js`, `06-orange-pill-ingredients.js`, `07-orange-pill-focus.js`, `08-path-forward.js` | 5-8 | 4-7 |
| All 15 Section 2 files in manifest order | 9-23 | 8-22 |
| Section 3 `01-section-opener.js`, `02-three-roles.js` | 24-25 | 23-24 |
| Section 3 `04-fiat-fails.js` through `11-where-is-bitcoin.js` | 27-34 | 25-32 |
| New Section 4 files | new | 33-49 |
| `section-5-close/01-thank-you.js` | 48 | 50 |

This changes only metadata outside Section 4. It does not change earlier semantic IDs,
manifest order, visible content, notes, or numeric deep-link behavior, because numeric URLs
already resolve by manifest index. It fixes the popped-out notes window and makes `number`
meaningful again. This canonicalization is an implementation judgment, not narrative copy.

## Infrastructure checkpoint — only demonstrated blockers

Complete this after Phase 0 and before Milestone 1.

### Slide-engine continuation defect

The audit identified one real defect: the continuous branch does not reliably honor
`jumpToEnd` or a requested restored build step.

Before changing the engine:

1. Reproduce the defect on an existing continuation sequence.
2. Record the exact expected and actual behavior.
3. Implement the narrowest possible correction.
4. Regression-test every pre-existing continuation in Sections 1-3.
5. Confirm standard transitions, direct entry, refresh restoration, and session restoration
   remain unchanged.

Do not combine unrelated engine cleanup with this fix.

### Manifest validation

Add development-time validation only if it can remain small and non-invasive:
- duplicate IDs;
- duplicate canonical numbers;
- invalid `continuesFrom` targets.

Temporary milestone manifests may have intentionally non-final numbering. Strict 1-N
contiguity belongs to the final integration gate.

### Infrastructure acceptance gate

Before slide implementation:
- baseline build still succeeds;
- existing deck behavior is unchanged except for the reproduced continuation fix;
- no new console errors appear;
- the diff is small and reviewable;
- the user receives a concise report.

If the engine fix becomes broad or risky, abandon shared-DOM continuation for the new
section and use standard transitions with matching geometry. Narrative quality has priority
over clever infrastructure.

## Milestone 1: Essence and object of preservation (4.01-4.06)

### Exact file scope

Create:

- `src/components/section-4/MotionScope.js`
- `src/components/section-4/MonetaryClaim.js`
- `src/components/section-4/ExchangeClaimScene.js`
- `src/components/section-4/ClaimIntegrityScene.js`
- `src/slides/section-4-ideal-store/01-store-of-value-problem.js`
- `src/slides/section-4-ideal-store/02-unfinished-exchange.js`
- `src/slides/section-4-ideal-store/03-what-is-money.js`
- `src/slides/section-4-ideal-store/04-claim-and-carrier.js`
- `src/slides/section-4-ideal-store/05-saving-keeps-exchange-open.js`
- `src/slides/section-4-ideal-store/06-integrity-of-claim.js`

Modify:

- `src/slides/manifest.js` to activate only the six completed new Section 4 slides during
  this milestone, followed by the existing close.
- `src/styles/slides.css` for shared `.s4-*` claim/scene/build states.

Remove only after the six replacements pass browser and build validation:

- `src/slides/section-4-ideal-store/01-transition.js`
- `src/slides/section-4-ideal-store/02-section-opener.js`
- `src/slides/section-4-ideal-store/03-thought-experiment.js`

Do not change package files, assets, comparison data, Sections 1-3, or the close in this
milestone.

### Validation gate

1. Run `npm run build`; record success and any bundle warnings.
2. Run `git diff --check`, inspect `git diff --stat`, and inspect every changed-file diff.
3. Verify the temporary manifest has section counts 7/15/10/6/1, unique IDs, valid
   continuation references, and no import of a zero-byte old Section 4 module.
4. Review `3-11-where-is-bitcoin` -> 4.01 -> 4.06 -> close in sequence at logical
   1920x1080 and the intended recording/display viewport.
5. For all six slides, inspect build 0, every intermediate build, and the final build as a
   static frame. Check title safe zone, wrapping, contrast, and motif identity.
6. Exercise Right/Space, Left, Down/force-next, and Up/force-previous across both shared-DOM
   chains, including navigation while a tween is running.
7. Deep-link directly by ID to 4.02, 4.03, 4.04, and 4.06. Reload at a nonzero build step
   and trigger HMR at a nonzero build step; confirm exact state restoration.
8. Enable reduced motion and repeat each slide/build plus both continuation boundaries.
9. Open notes on every slide and the second-window notes view; confirm current title, notes,
   number, qualifications, and next-slide transition.
10. Open overview, fullscreen, and representative touch navigation; confirm no console
    errors or duplicate styles/listeners.
11. Search the new milestone files for labor-value implications, legal-claim wording,
    economic-energy definition, fixed legal asset share, and claims of guaranteed
    purchasing power.

### User visual-approval gate

Stop after the Milestone 1 report and ask the user to review the six-slide sequence in
`npm run dev`, with particular attention to:
- whether the orange claim feels premium rather than mystical;
- whether the surgeon sequence is immediately understandable;
- whether visible copy density and build pacing feel right;
- whether claim/carrier continuity matches the intended narrative.

Consolidate the user's visual feedback into one revision pass before Milestone 2.

Rollback point: commit the validated six-slide grammar before beginning the century test or
tables. If the shared scene proves fragile, remove only `continuesFrom` while retaining the
same deterministic scene state and narrative.

## Milestone 2: Test, framework, and objections (4.07-4.12)

### Exact file scope

Create:

- `src/components/section-4/CenturyClaimScene.js`
- `src/components/section-4/CarrierSet.js`
- `src/slides/section-4-ideal-store/_store-of-value-data.js`
- `src/slides/section-4-ideal-store/07-100-year-test.js`
- `src/slides/section-4-ideal-store/08-claim-failure-modes.js`
- `src/slides/section-4-ideal-store/09-ten-properties.js`
- `src/slides/section-4-ideal-store/10-carrier-comparison.js`
- `src/slides/section-4-ideal-store/11-two-kinds-of-stability.js`
- `src/slides/section-4-ideal-store/12-native-yield.js`

Modify:

- `src/components/PropertiesTable.js`
- `src/components/ComparisonTable.js`
- `src/components/section-4/MonetaryClaim.js` only if an approved failure state cannot be
  expressed by its M1 API.
- `src/slides/manifest.js` to activate 4.01-4.12.
- `src/styles/slides.css` for century, table focus, stability, and native-yield states.

Remove only after replacements pass validation:

- `04-properties.js`
- `05-comparison.js`
- `06-objection-volatility.js`
- `07-objection-cashflow.js`
- `08-dont-trust-verify.js`

### Validation gate

1. Run `npm run build`, `git diff --check`, full milestone diff review, and inspect output
   warnings.
2. Verify temporary section counts 7/15/10/12/1 and unique IDs/numbers/continuations.
3. Import `_store-of-value-data.js` with a one-line Node assertion and verify exactly ten
   ordered property strings, five carrier IDs, ten score rows, fifty scores, each score in
   1-5, and byte-for-byte equality with the approved matrix above.
4. Review 4.06 -> 4.12 in sequence and then 4.01 -> 4.12 without interruption. Confirm the
   failure modes visibly derive the properties rather than appearing as an unrelated list.
5. Inspect every build state, with particular focus on the 4.07/4.08 continuation, the
   4.06 model reset, the complete comparison matrix, and the final verification line.
6. Test backward/forward/force navigation, direct links to 4.07-4.12, HMR on 4.08 and 4.10
   mid-build, and reduced motion on all six slides.
7. At 1920x1080 and recording size, verify every table label and score is legible, all ten
   properties are present in exact order, no score is hidden by emphasis, and no text
   overlaps the title/footer safe zones.
8. Rehearse notes against visible builds. Check the model qualification on 4.06, all ten
   failure modes on 4.08, debatable-score posture on 4.10, volatility qualification on
   4.11, and saving/investing/yield qualifications on 4.12.
9. Confirm notes overlay, second-window sync, overview, fullscreen, progress, touch, and
   console behavior.
10. Search active `src/` for the old thought experiment, German adviser, obsolete
    volatility/cash-flow copy, standalone verification slide ID, `economic energy`, and
    `L1:` artifacts. References in the master brief/plan are expected; active code is not.

### User visual-approval gate

Stop after the Milestone 2 report and ask the user to review:
- the emotional clarity of the 100-Year Test;
- whether all ten failure modes are legible without feeling list-like;
- table readability at recording size;
- balance and fairness of the stability slide;
- whether the native-yield slide clearly distinguishes saving from investing.

Use one consolidated revision pass before Milestone 3.

Rollback point: commit the validated 100-Year Test plus analytical core before building the
rulebook ending. The immutable data module provides a direct check against score drift.

## Milestone 3: Reveal, ending, and whole-deck integration (4.13-4.17)

### Exact file scope

Create:

- `src/components/section-4/RulebookReveal.js`
- `src/components/section-4/CivilizationNetwork.js`
- `src/slides/section-4-ideal-store/13-hidden-rulebooks.js`
- `src/slides/section-4-ideal-store/14-return-to-2126.js`
- `src/slides/section-4-ideal-store/15-exchange-to-civilization.js`
- `src/slides/section-4-ideal-store/16-payoff-to-patience.js`
- `src/slides/section-4-ideal-store/17-rules-beneath-everything.js`

Modify:

- `src/components/section-4/CenturyClaimScene.js` to add deterministic return and network
  modes.
- `src/slides/section-4-ideal-store/_store-of-value-data.js` only if presentation-neutral
  dependency metadata needs a structural correction; approved strings do not change.
- `src/slides/manifest.js` for all seventeen final imports/order.
- `src/styles/slides.css` for rulebook, future, network, patience, and final-thesis states.
- `src/assets.js` to remove the now-unused `storeOfValue` export plus the obsolete
  `iconEncounterProblem`, `iconRepurposedSolution`, `iconEngineeredSolution`,
  `iconMisuseFire`, `iconMisuseCommunication`, `iconMisuseFood`,
  `iconSolutionLightbulb`, `iconSolutionInternet`, `iconSolutionRefrigerator`, and
  `iconSolutionBitcoin` imports/exports while retaining every physical artwork file.
- `src/slides/section-5-close/01-thank-you.js` number only.
- The 29 earlier slide modules listed in the canonical number migration, changing only
  their `number` fields.

Remove after the new ending passes its focused validation:

- `src/components/ProblemSolvingScene.js`
- `src/slides/section-4-ideal-store/_problem-solving-rows.js`
- `src/slides/section-4-ideal-store/09-problem-solving-intro.js`
- `src/slides/section-4-ideal-store/10-example-light.js`
- `src/slides/section-4-ideal-store/11-example-communication.js`
- `src/slides/section-4-ideal-store/12-example-food.js`
- `src/slides/section-4-ideal-store/13-bitcoin-solution.js`

Do not delete any physical asset file and do not change close-slide copy or notes.

### Focused validation gate

1. Run `npm run build`, `git diff --check`, milestone diff review, and inspect bundle output.
2. Verify 4.13 exposes every approved dependency under the correct carrier and never makes
   Bitcoin dependency-free.
3. Review all builds of 4.13-4.17, both directions, force navigation, direct entry, HMR,
   reduced motion, notes, overview, fullscreen, touch, and console.
4. Record a browser performance trace through 4.13-4.15. Confirm bounded node/edge counts,
   no accumulating RAF/timer activity after exit, transform/opacity animation rather than
   layout churn, and no visible dropped-frame sequence on the target machine.
5. Review the 4.14/4.15 shared scene directly, forward, backward, and via deep links. Confirm
   the arriving claim is access to a future market and becomes the same recognizable claim
   network.
6. Rehearse 4.16 and 4.17 notes for incentive rather than determinist language, then verify
   the standard pause into the unchanged close.

### Final whole-deck integration gate

1. Assert final section counts 7/15/10/17/1, total 50, unique IDs, unique contiguous numbers
   1-50, valid `continuesFrom` targets, and `slide.number === manifest index + 1` everywhere.
2. Run `npm run build` again after all cleanup and renumbering.
3. Navigate every slide from 1 through 50 in presentation order. Pay special attention to
   `3-11-where-is-bitcoin` -> 4.01 and 4.17 -> close.
4. For every Section 4 slide, inspect build 0, every intermediate state, final state, one
   backward reconstruction, direct semantic deep link, and a representative numeric deep
   link. Test HMR/reload on one slide in each continuation group.
5. Test keyboard, force-step keys, touch, fullscreen, overview, progress, notes overlay,
   second-window notes, URL copying, hash links, query links, and session restoration.
6. Repeat the complete Section 4 sequence under reduced motion and check that no slide waits
   on a delayed callback.
7. Review at logical 1920x1080 plus actual recording/projector and mobile aspect-fitted
   viewports. Check overflow, safe zones, wrapping, contrast, alignment, table legibility,
   motif continuity, and whether every final frame works as a screenshot.
8. Keep the console open through forward and backward passes. Confirm no errors, detached
   scene references, duplicate injected styles, orphaned timers, or growth in live DOM after
   repeated loops through Section 4.
9. Rehearse all seventeen notes in sequence. Confirm each includes its qualification and
   exact transition, and that the second-window text matches the active slide.
10. Search active source for old IDs and all prohibited remnants: thought-experiment copy,
    German adviser, lighting, communication example, refrigeration, perfect engineered
    solution, purpose-built perfect store of value, obsolete cash-flow/volatility claims,
    `economic energy` as a definition, and `L1:`.
11. Inspect `src/assets.js` and the production bundle to ensure deleted problem-solving
    images are no longer imported, while the five comparison icons remain.
12. Produce the milestone completion report required by `AGENTS.md`, including every
    out-of-Section-4 number-only edit and all checks actually performed.

### User final visual-approval gate

Before cleanup and canonical renumbering are treated as final, ask the user to watch the
complete Section 4 without interruption and review:
- the hidden-rulebook reveal;
- the emotional payoff of the return to 2126;
- whether the civilization coda is powerful without becoming a separate lecture;
- the final transition into the close;
- overall duration and pacing.

Only then perform the final polish/cleanup pass.

Rollback point: keep the M2 commit intact until the full ending and canonical renumber pass
the final gate. The final manifest/cleanup/renumber should be its own reviewable commit after
the five ending slides are visually approved.

## Risks and mitigations

### Narrative risks

- **Labor theory implication:** The surgeon scene could imply that one hour creates $400 of
  objective value. Mitigate with contextual service labels and an explicit note that market
  valuation is subjective.
- **Legal-claim implication:** `Counterclaim` may sound like a debt enforceable against a
  named party. Pair the formal line with `purchasing-power claim on the market` in notes.
- **Guaranteed-share implication:** Pools can look like literal ownership percentages.
  Label the model simplified, animate only `other things equal` cases, and preserve the full
  qualification in notes.
- **Volatility dismissal:** A strong rules-versus-price visual can accidentally minimize
  market risk. Give both columns equal initial weight and retain every approved caveat.
- **Yield moralization:** Vault/factory can imply saving is good and enterprise is bad.
  Present different jobs, risks, liquidity, and optionality without ranking productive
  assets as morally inferior.
- **Bitcoin exceptionalism:** Rulebook and future slides can imply no dependencies, no rule
  changes, or guaranteed demand. Keep Bitcoin's five dependencies visible and use the exact
  single-issuer formulation.
- **Monetary determinism:** The network/patience coda can outrun the approved bounded thesis.
  Stop at coordination and incentive gradients; do not add war, culture, family, or
  prosperity claims.

### Visual risks

- **Motif fatigue:** Seventeen orange objects can become decoration. Every appearance must
  represent a named state transition; some analytical slides may show only a small anchor.
- **Motif ambiguity:** Too much glow can read as energy or magic. Keep a stable silhouette,
  restrained halo, and carrier labels; use the battery metaphor only in speech after the
  formal distinction.
- **Dense tables and rulebooks:** Ten rows, fifty scores, and twenty-five dependency labels
  can overwhelm projection. Progressive focus, stable geometry, and screenshot review are
  mandatory; do not solve density by shrinking below stage-readable type.
- **Generic future imagery:** The 100-Year Test could become science-fiction decoration.
  Use a disciplined timeline/vault/handoff with institutional unknowns, not neon scenery.
- **Network clutter:** Civilization could resemble a generic dashboard or decorative graph.
  Use named social roles and only enough edges to explain cross-person/place/generation
  coordination.

### Performance risks

- **Network node count:** Cap deterministic nodes and edges; avoid Murmuration/canvas
  flocking and random simulation.
- **Concurrent tweens:** A fast presenter can stack GSAP work. `MotionScope.replace` cancels
  prior animation before applying a new cumulative state.
- **Shared-scene stale layers:** Do not use delayed DOM-removal patterns from the existing
  timeline components. Replace or remove layers synchronously once their exit state is set.
- **Bundle weight:** Removing imports for obsolete problem-solving icons keeps deleted
  narrative assets out of production. No new bitmap or dependency is planned.

### Technical risks

- **Damaged worktree:** This is blocking and must be resolved before coding or baseline
  validation.
- **Continuation restoration:** Current engine behavior loses `jumpToEnd` on continuous
  transitions. Correct it first and test old Section 1-3 continuations for regression.
- **Singleton slide objects:** Module-level refs can point at removed containers. Clear refs
  on non-continuous exit and always verify a cached API belongs to the active container.
- **Number migration:** Two stale historical gaps make a simple `close + 4` update wrong.
  Assert 1-50 contiguity from the final manifest.
- **External fonts/icons:** CDN failure can alter wrapping or remove secondary icons. Core
  diagrams use labels/geometry, and visual validation should include a throttled/offline
  check if the recording environment may lack network access.
- **No test harness:** Static assertion commands and full browser state matrices must be
  treated as release gates, not optional manual polish.

## Implementation judgments already made by this plan

These are not dictated word-for-word by the master brief, but are the recommended concrete
choices after the repository audit:

- Canonicalize every module number to manifest position, yielding Section 4 numbers 33-49
  and close number 50 rather than preserving two deleted-slide gaps.
- Use a stable abstract aperture/capsule as the orange claim rather than a literal coin,
  dollar sign, or glowing gem.
- Use DOM/SVG for the surgeon, pools, century, threats, rulebooks, and network; add no art.
- Use GSAP with scoped cleanup; introduce a thin wrapper only if it demonstrably reduces repeated lifecycle code.
- Use exactly five shared-DOM boundaries and standard transitions elsewhere.
- Reuse and extend both analytical table components instead of replacing them with card
  grids.
- Recreate identical carrier geometry at 4.10 and 4.13 rather than forcing a continuation
  through the two intervening objection slides.
- Integrate the verification line into 4.10 and delete its standalone slide.
- Remove `ProblemSolvingScene.js` after M3 validation but retain obsolete physical artwork.
- Keep Section 5 copy/notes unchanged and use a standard transition into it.

## Blocking question

Is the repository-wide staged deletion/zero-byte worktree state intentional, or may the
tracked baseline be restored from `HEAD` before implementation? No narrative, visual, or
component question is otherwise blocking; the remaining choices are resolved above and can
be reviewed through the milestone gates.
