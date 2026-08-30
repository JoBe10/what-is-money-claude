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
// **The deck is 39 slides** (was 45): eleven legacy slides out, five scenes in.
// Seams at the new/legacy boundary are reported, not smoothed
// (`docs/batch-a-implementation-report.md`).

import p1 from '../scenes/prologue/p1-eighty-thousand-hours.js';
import p2 from '../scenes/prologue/p2-the-stakes.js';

import scene2 from '../scenes/act-1-the-unfinished-exchange/02-the-direct-exchange.js';
import scene3 from '../scenes/act-1-the-unfinished-exchange/03-the-breakthrough.js';
import scene4 from '../scenes/act-1-the-unfinished-exchange/04-spend-or-save.js';

import s2_04 from './section-2-origin/04-the-competition-record.js';
import s2_05 from './section-2-origin/05-two-survivors.js';
import s2_06 from './section-2-origin/06-the-abstraction-ladder.js';
import s2_07 from './section-2-origin/07-the-severance.js';
import s2_08 from './section-2-origin/08-the-pattern.js';

import s3_00 from './section-3-function/00-waypoint-function.js';
import s3_01 from './section-3-function/01-the-three-functions.js';
import s3_02 from './section-3-function/02-the-functions-separate.js';
import s3_03 from './section-3-function/03-the-order-of-monetization.js';
import s3_04 from './section-3-function/04-stage-signatures.js';
import s3_05 from './section-3-function/05-the-palladium-test.js';
import s3_06 from './section-3-function/06-what-your-money-is.js';
import s3_07 from './section-3-function/07-where-bitcoin-is.js';
import s3_08 from './section-3-function/08-waypoint-judge.js';

import s4_01 from './section-4-ideal-store/01-define-the-job.js';
import s4_06 from './section-4-ideal-store/06-claim-and-carrier.js';
import s4_07 from './section-4-ideal-store/07-store-of-value-function.js';
import s4_08 from './section-4-ideal-store/08-100-year-test.js';
import s4_09 from './section-4-ideal-store/09-future-is-unknowable.js';
import s4_10 from './section-4-ideal-store/10-invert-the-question.js';
import s4_11 from './section-4-ideal-store/11-carrier-failures-i.js';
import s4_12 from './section-4-ideal-store/12-carrier-failures-ii.js';
import s4_13 from './section-4-ideal-store/13-failure-to-requirement.js';
import s4_14 from './section-4-ideal-store/14-ten-properties.js';
import s4_15 from './section-4-ideal-store/15-framework-to-comparison.js';
import s4_16 from './section-4-ideal-store/16-the-comparison.js';
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

// The legacy deck, as it stands after Batch A. Section 1 is gone entire; the
// origin section now opens on the competition record, and the ideal-store
// section runs from its own entry straight to claim-and-carrier.
const section2 = [s2_04, s2_05, s2_06, s2_07, s2_08];
const section3 = [
  s3_00, s3_01, s3_02, s3_03, s3_04,
  s3_05, s3_06, s3_07, s3_08
];
// Section 4 keeps its shipped slide numbers — the whole project, the freeze
// register and every governing document refer to beats as 4.15, 4.23 — so
// structural changes slot in rather than renumbering. R7's merged section entry
// took 01; R7.4 removed the falsifiability beat that had entered as 20b; Batch A
// removes 03, 04 and 05 as Scenes 2, 3 and 4 supersede them. The remaining
// `number:` fields are left alone for the same reason as ever: they are
// documentation, `src/main.js` assigns the real deck position from this array's
// order, and 4.23's file is byte-frozen and cannot be edited to renumber it.
// Deep-link ids for every retained slide are unchanged.
const section4 = [
  s4_01,
  s4_06, s4_07, s4_08, s4_09, s4_10,
  s4_11, s4_12, s4_13, s4_14, s4_15,
  s4_16, s4_17, s4_18, s4_19, s4_20,
  s4_21, s4_22, s4_23
];
const section5 = [s5_01];

export const sections = [
  { id: 'prologue',    label: 'Prologue',                        slides: prologue },
  { id: 'act-1',       label: 'Act I — The Unfinished Exchange', slides: act1 },
  { id: 'origin',      label: 'Origin',                          slides: section2 },
  { id: 'function',    label: 'Function',                        slides: section3 },
  { id: 'ideal-store', label: 'Ideal Store',                     slides: section4 },
  { id: 'close',       label: 'Close',                           slides: section5 }
];

export const slides = sections.flatMap((s) => s.slides);

export default { slides, sections };
