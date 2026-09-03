// Ordered slide manifest — the running order, and the only source of truth for
// it (`AGENTS.md` §10). `src/main.js` assigns each module's deck position from
// this array's order, so a module's `number:` field is documentation.
//
// ===== BATCH A, 29 August 2026 — the film enters the deck =====
//
// The first five scenes of the film are spliced in at the top, in place of the
// legacy slides they supersede. **The legacy files stay on disk and in
// history**; only their manifest entries are gone (`AGENTS.md` §5 — delete as
// the batch that replaces them lands, never preemptively).
//
//   scene                                   supersedes
//   P1 Eighty Thousand Hours / What Is      1-01-eighty-thousand-hours
//      Money?                               1-02-the-conversion
//                                           1-03-what-is-money
//   P2 The Stakes                           1-04-the-stakes
//                                           1-05-the-promise
//   2  The Direct Exchange                  4-03-simple-exchange
//                                           2-01-the-world-without-it
//   3  The Breakthrough                     4-04-unfinished-exchange
//                                           2-02-the-discovery
//                                           2-03-the-convergence
//   4  Spend or Save                        4-05-spend-or-save
//
// The two Section 2 retirements are the architecture's own: the
// fisherman/sandal-maker/farmer triad dies with Scene 2 ("redundant with this
// scene") and the murmuration dies with Scene 3, its soul surviving as one
// spoken line in that scene's script. Section 1 is retired entire — the
// waypoint device and the "How do you understand anything" scene are on the
// architecture's what-dies list, and the promise moves to P2's spoken script.
//
// ===== BATCH B, 31 August 2026 — Act II enters the deck =====
//
// Scenes 5–10 are spliced in after Act I, in place of the legacy slides the
// ruled provenance map (`docs/act-2-provenance.md`) names as their sources.
// **The legacy files stay on disk and in history**; only their manifest
// entries are gone.
//
//   scene                                   supersedes
//   5  The Function Stayed.                 2-04-the-competition-record
//      The Carrier Changed.
//   6  Gold: Scarcity in Matter             2-05-two-survivors
//   7  Claims on Gold                       2-06-the-abstraction-ladder
//   8  Fiat: Money Becomes Information      2-07-the-severance
//   9  Bitcoin: Can Scarcity Become         2-08-the-pattern
//      Digital?
//   10 The Trade-Off Keeps Moving           3-05-the-palladium-test
//
// Each row is a ruled PORT or ADAPT source, not a resemblance: 2-04 is the
// contender row Scene 5 mounts, 2-05 the elimination Scene 6 runs wave for
// wave, 2-06 the gold wound and the COINAGE/PAPER risers Scene 7 speaks, 2-07
// the chart Scene 8 ports whole, 2-08 the entrant block Scene 9 ports (its
// capture line landing on Scene 8's beat 3), and 3-05 the palladium frame
// architecture Ruling 4 placed in Scene 10. The evolution rail dies here as a
// persistent spine, exactly as the architecture's what-dies list has it, and
// its content is redistributed across Scenes 5–9.
//
// The `origin` section is now empty and leaves the sections list, as
// `question` did at Batch A. `function` keeps eight slides.
//
// **The deck is 39 slides** (was 39): six legacy slides out, six scenes in.
// Seams at the new/legacy boundary are reported, not smoothed
// (`docs/batch-b-implementation-report.md`).
//
// ===== BATCH C, 2 September 2026 — Act III enters the deck =====
//
// Scenes 11–15 are spliced in after Act II as one contiguous world, in place
// of the legacy slides the ruled provenance map (`docs/act-3-provenance.md`)
// names as their sources. **The legacy files stay on disk and in history**;
// only their manifest entries are gone.
//
//   scene                                   supersedes
//   11 Three Familiar Jobs                  3-01-the-three-functions
//   12 We Already Split Those Jobs          3-02-the-functions-separate
//   13 The Order of Monetization           3-03-the-order-of-monetization
//   14 The Coffee Objection                 3-07-where-bitcoin-is
//   15 The Tower                            3-06-what-your-money-is
//
// Each row is a ruled PORT or ADAPT source: 3-01 is the triad Scene 11
// rebuilds around the disc, 3-02 the columns Scene 12 reverts to whole,
// 3-03 the ladder Scene 13 mounts (the LADDER amendment), 3-07 the resolved
// return and the berths Scene 14 stages the placement with, and 3-06 the
// tower argument Scene 15 carries as candidate A (the presenter's selection,
// 2 Sep 2026) with 3-06's own copy in its slots.
//
// **THREE LEGACY SLIDES SURVIVE WITH AMBIGUOUS FATES — FLAGGED, NOT
// DECIDED** (`docs/batch-c-implementation-brief.md` §3): the two waypoint
// interstitials (3-00-waypoint-function, 3-08-waypoint-judge — the waypoint
// device is on the architecture's what-dies list, but no batch has been
// ordered to retire these two) and 3-04-stage-signatures (the early-stage
// signature bracket — its ladder content is spoken inside Scene 13's script,
// but no ruling has named its fate). They remain in the deck AFTER the act,
// in their legacy relative order, so nothing is deleted and nothing is
// decided; the seam S15 → 3-00 is reported, not smoothed. Retiring or
// re-homing them is the presenter's ruling to make.
// (3-08 is retired by presenter ruling, 3 September 2026 — the Act IV
// foundation block below.)
//
// **The deck is 39 slides** (was 39): five legacy slides out, five scenes in.
//
// ===== ACT IV FOUNDATION, 3 September 2026 — one ambiguous fate ruled =====
//
// The presenter retires the third waypoint interstitial, 3-08-waypoint-judge
// (master §13, 3 Sep 2026 — the Batch C splice ruling it was waiting on).
// The waypoint device is on the architecture's what-dies list, and this
// slide spoke "a thought experiment about the next hundred years" one slide
// before Act IV — the 100-Year Test anticipated, against master §3.3. **The
// legacy file stays on disk and in history**; only its manifest entry is
// gone. 3-00 and 3-04 remain, still flagged, still the presenter's to rule;
// the act's exit onto 3-00 is unchanged, and the new seam 3-04 → 4-01 is
// reported, not smoothed (review/act-4/smoke-deck.json proves it both ways).
//
// **The deck is 38 slides** (was 39): one legacy slide out, nothing in.
//
// ===== BATCH D, 3 September 2026 — Act IV enters the deck =====
//
// Scenes 16–23 are spliced in directly after Act III as one contiguous world
// (`sceneGroup: 'act4-test'`), in place of the legacy slides the ruled
// provenance map (`docs/act-4-provenance.md`) names as their sources. **The
// legacy files stay on disk and in history**; only their manifest entries are
// gone. The act's shared stage re-homes the legacy modules themselves from
// disk (src/scenes/act-4-the-store-of-value-test/_testStage.js), so the
// proven treatments live on in the film rather than being transcribed.
//
//   scene                                   supersedes
//   16 Return to the Open Exchange          4-06-claim-and-carrier
//                                           4-01-define-the-job (retired by
//                                           the presenter's Row 2 ruling,
//                                           3 Sep 2026 — the phrase-under-a-
//                                           lens beat does not come along)
//                                           (4-04-unfinished-exchange's
//                                           builds 3–4 are re-homed from
//                                           disk; 4-04 itself left the deck
//                                           at Batch A, superseded by Scene 3)
//   17 What the Carrier Must Preserve       4-07-store-of-value-function
//   18 The 100-Year Test                    4-08-100-year-test
//                                           4-09-future-is-unknowable
//   19 Invert the Question                  4-10-invert-the-question
//   20 How the Carrier Can Fail: I          4-11-carrier-failures-i
//   21 How the Carrier Can Fail: II         4-12-carrier-failures-ii
//   22 From Failure to Requirement —        4-13-failure-to-requirement
//      the Ten Properties                   4-14-ten-properties
//   23 The Comparison                       4-15-framework-to-comparison
//                                           4-16-the-comparison
//
// Each row is a ruled PORT source, two of them with one ruled change each
// (S19's carrier arriving at beat 2; S22's ten properties landing in one
// advance — the Batch D rulings 1 and 2, master §13). 4-17 through 4-23
// stay: they are Act V's sources, for Batch E.
//
// **THE TWO AMBIGUOUS-FATE SURVIVORS MOVE, AND ARE STILL FLAGGED, NOT
// DECIDED.** 3-00-waypoint-function and 3-04-stage-signatures stood between
// Act III and the legacy Section 4. The splice puts Act IV directly after
// Act III — the seam the brief names, Act III's exit question into Scene
// 16's homecoming — so the two survivors now stand AFTER Act IV, still in
// their legacy relative order and still immediately before the surviving
// legacy Section 4. Nothing about them is decided: the film is contiguous
// from the Prologue through Scene 23, and the act now exits onto 3-00 — the
// same narratively odd seam Batch C reported after Scene 15, now eight
// scenes further along. Retiring or re-homing them is the presenter's
// ruling to make; both seams are reported, not smoothed.
//
// **The deck is 34 slides** (was 38): twelve legacy slides out (4-01 and
// 4-06 through 4-16), eight scenes in. Both splice seams are proven both
// ways in review/batch-d/smoke-batch-d.json.

import p1 from '../scenes/prologue/p1-eighty-thousand-hours.js';
import p2 from '../scenes/prologue/p2-the-stakes.js';

import scene2 from '../scenes/act-1-the-unfinished-exchange/02-the-direct-exchange.js';
import scene3 from '../scenes/act-1-the-unfinished-exchange/03-the-breakthrough.js';
import scene4 from '../scenes/act-1-the-unfinished-exchange/04-spend-or-save.js';

import scene5 from '../scenes/act-2-the-architecture-of-money/05-the-function-stayed.js';
import scene6 from '../scenes/act-2-the-architecture-of-money/06-gold-scarcity-in-matter.js';
import scene7 from '../scenes/act-2-the-architecture-of-money/07-claims-on-gold.js';
import scene8 from '../scenes/act-2-the-architecture-of-money/08-money-becomes-information.js';
import scene9 from '../scenes/act-2-the-architecture-of-money/09-scarcity-becomes-digital.js';
import scene10 from '../scenes/act-2-the-architecture-of-money/10-the-trade-off-keeps-moving.js';

import scene11 from '../scenes/act-3-the-jobs-of-money/11-three-familiar-jobs.js';
import scene12 from '../scenes/act-3-the-jobs-of-money/12-we-already-split-those-jobs.js';
import scene13 from '../scenes/act-3-the-jobs-of-money/13-the-order-of-monetization.js';
import scene14 from '../scenes/act-3-the-jobs-of-money/14-the-coffee-objection.js';
import scene15 from '../scenes/act-3-the-jobs-of-money/15-the-tower.js';

import scene16 from '../scenes/act-4-the-store-of-value-test/16-return-to-the-open-exchange.js';
import scene17 from '../scenes/act-4-the-store-of-value-test/17-what-the-carrier-must-preserve.js';
import scene18 from '../scenes/act-4-the-store-of-value-test/18-the-100-year-test.js';
import scene19 from '../scenes/act-4-the-store-of-value-test/19-invert-the-question.js';
import scene20 from '../scenes/act-4-the-store-of-value-test/20-how-the-carrier-can-fail-i.js';
import scene21 from '../scenes/act-4-the-store-of-value-test/21-how-the-carrier-can-fail-ii.js';
import scene22 from '../scenes/act-4-the-store-of-value-test/22-from-failure-to-requirement.js';
import scene23 from '../scenes/act-4-the-store-of-value-test/23-the-comparison.js';

import s3_00 from './section-3-function/00-waypoint-function.js';
import s3_04 from './section-3-function/04-stage-signatures.js';

import s4_17 from './section-4-ideal-store/17-store-of-value-function-migrates.js';
import s4_18 from './section-4-ideal-store/18-monetary-premium.js';
import s4_19 from './section-4-ideal-store/19-other-assets-do-moneys-job.js';
import s4_20 from './section-4-ideal-store/20-bitcoin-does-not-replace-everything.js';
import s4_21 from './section-4-ideal-store/21-marginal-store-of-value-decision.js';
import s4_22 from './section-4-ideal-store/22-fixed-supply-reprices-at-margin.js';
import s4_23 from './section-4-ideal-store/23-investment-case-from-first-principles.js';

import s5_01 from './section-5-close/01-thank-you.js';

// The film, so far.
const prologue = [p1, p2];
// Scenes 2–4 are one continuous visual world (`sceneGroup: 'act1-exchange'`):
// the engine hands the shared stage across both boundaries rather than
// tearing down, which is what makes the birth and the fork morphs real.
const act1 = [scene2, scene3, scene4];
// Scenes 5–10 are likewise one world (`sceneGroup: 'act2-architecture'`), and
// the whole act is a single shared stage: the claim's journey across it — the
// entry from Scene 4's resting place, the carrier handoffs, the certificate
// travel out of the vault, the walk along the strip — is only continuous
// because the engine never tears the stage down at these five boundaries.
const act2 = [scene5, scene6, scene7, scene8, scene9, scene10];
// Scenes 11–15 are likewise one world (`sceneGroup: 'act3-jobs'`): the disc
// holds the triad's center as the home base recedes, splits, returns and
// finally gives the frame to the tower — continuity the engine preserves by
// never tearing the stage down at these four boundaries.
const act3 = [scene11, scene12, scene13, scene14, scene15];
// Scenes 16–23 are likewise one world (`sceneGroup: 'act4-test'`): the claim
// comes home on the Act I stage's own frame, the legacy Section 4 treatments
// are re-homed as layers of one stage, and every in-act boundary is the
// legacy deck's own crossfade played inside the stage — continuity the engine
// preserves by never tearing the stage down at these seven boundaries.
const act4 = [scene16, scene17, scene18, scene19, scene20, scene21, scene22, scene23];

// The legacy deck, as it stands after Batch D (the block above). The
// function section keeps two ambiguous-fate survivors — the second waypoint
// and the stage-signatures bracket, in their legacy relative order, now after
// Act IV and still immediately before the surviving legacy Section 4; the
// third waypoint (3-08) is retired, its file on disk.
const section3 = [
  s3_00, s3_04
];
// Section 4 keeps its shipped slide numbers — the whole project, the freeze
// register and every governing document refer to beats as 4.15, 4.23 — so
// structural changes slot in rather than renumbering. R7's merged section entry
// took 01; R7.4 removed the falsifiability beat that had entered as 20b; Batch A
// removes 03, 04 and 05 as Scenes 2, 3 and 4 supersede them; Batch D removes
// 01 and 06 through 16 as Scenes 16–23 supersede them, leaving 17 through 23
// for Batch E. The remaining `number:` fields are left alone for the same
// reason as ever: they are documentation, `src/main.js` assigns the real deck
// position from this array's order, and 4.23's file is byte-frozen and cannot
// be edited to renumber it. Deep-link ids for every retained slide are
// unchanged.
const section4 = [
  s4_17, s4_18, s4_19, s4_20,
  s4_21, s4_22, s4_23
];
const section5 = [s5_01];

export const sections = [
  { id: 'prologue',    label: 'Prologue',                          slides: prologue },
  { id: 'act-1',       label: 'Act I — The Unfinished Exchange',   slides: act1 },
  { id: 'act-2',       label: 'Act II — The Architecture of Money', slides: act2 },
  { id: 'act-3',       label: 'Act III — The Jobs of Money',       slides: act3 },
  { id: 'act-4',       label: 'Act IV — The Store-of-Value Test',  slides: act4 },
  { id: 'function',    label: 'Function',                          slides: section3 },
  { id: 'ideal-store', label: 'Ideal Store',                       slides: section4 },
  { id: 'close',       label: 'Close',                             slides: section5 }
];

export const slides = sections.flatMap((s) => s.slides);

export default { slides, sections };
