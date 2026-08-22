// Ordered slide manifest. Section 4 is the final content section.

import s1_01 from './section-1-question/01-eighty-thousand-hours.js';
import s1_02 from './section-1-question/02-the-conversion.js';
import s1_03 from './section-1-question/03-what-is-money.js';
import s1_04 from './section-1-question/04-the-stakes.js';
import s1_05 from './section-1-question/05-the-promise.js';

import s2_01 from './section-2-origin/01-the-world-without-it.js';
import s2_02 from './section-2-origin/02-the-discovery.js';
import s2_03 from './section-2-origin/03-the-convergence.js';
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
import s4_03 from './section-4-ideal-store/03-simple-exchange.js';
import s4_04 from './section-4-ideal-store/04-unfinished-exchange.js';
import s4_05 from './section-4-ideal-store/05-spend-or-save.js';
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

const section1 = [s1_01, s1_02, s1_03, s1_04, s1_05];
const section2 = [
  s2_01, s2_02, s2_03, s2_04,
  s2_05, s2_06, s2_07, s2_08
];
const section3 = [
  s3_00, s3_01, s3_02, s3_03, s3_04,
  s3_05, s3_06, s3_07, s3_08
];
// Section 4 keeps its shipped slide numbers — the whole project, the freeze
// register and every governing document refer to beats as 4.04, 4.15, 4.23 — so
// R7's two structural changes slotted in rather than renumbering: the merged
// section entry took 01 (the retired image-led opener and define-the-job became
// one slide). R7.4 removed the falsifiability beat that had entered as 20b —
// its content is now the closing passages of 4.20's script — and left the
// remaining `number:` fields alone for the same reason: they are documentation,
// `src/main.js` assigns the real deck position from this array's order, and
// 4.23's file is byte-frozen and cannot be edited to renumber it. The deck is
// 45 slides. Deep-link ids for every retained slide are unchanged.
const section4 = [
  s4_01, s4_03, s4_04, s4_05,
  s4_06, s4_07, s4_08, s4_09, s4_10,
  s4_11, s4_12, s4_13, s4_14, s4_15,
  s4_16, s4_17, s4_18, s4_19, s4_20,
  s4_21, s4_22, s4_23
];
const section5 = [s5_01];

export const sections = [
  { id: 'question',    label: 'The Question', slides: section1 },
  { id: 'origin',      label: 'Origin',      slides: section2 },
  { id: 'function',    label: 'Function',    slides: section3 },
  { id: 'ideal-store', label: 'Ideal Store', slides: section4 },
  { id: 'close',       label: 'Close',       slides: section5 }
];

export const slides = sections.flatMap((s) => s.slides);

export default { slides, sections };
