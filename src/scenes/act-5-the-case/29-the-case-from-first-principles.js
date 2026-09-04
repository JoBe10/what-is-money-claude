// Scene 29 — The Case from First Principles (2 beats).
//
// THE TRUE FINAL FRAME OF THE ARGUMENT (master §3.7). Legacy 4-23, re-homed
// whole and frozen: THE CASE FOR BITCOIN — FROM FIRST PRINCIPLES in the one
// surviving kicker of the retired header convention (kept by design, R7.1 A2 —
// carried as the frozen frame carries it, not as a convention), the four
// summary lines landing as one gesture in the order the sentence closes them,
// and then the conclusion alone at the optical center:
//
//     Bitcoin does not need to replace everything.
//     It only needs to become the **preferred place**
//     to store the **next unit of value**.
//
// The protected line, character for character, with its two accent terms — the
// accent's last deployment in the film. Nothing on this scene is touched: the
// file is byte-frozen by the argument freeze of 28 July 2026.
//
// THE FULL CLEAR, AS RULED (master §13, 4 Sep 2026 — the six seams): Scene 28's
// world — the field, its claims and its lines — clears COMPLETELY before the
// kicker lands alone. The boundary is the legacy deck's own crossfade onto
// 4-23's build 0, which is the kicker on black and nothing else, so the field
// dissolves to nothing while the kicker rises beneath it; then the four summary
// lines play their own reveal. Build 0 has no advance of its own — it is what
// the clear lands on.
//
// THE RULES LINE IS SPOKEN, NEVER STAGED, and it sits exactly where Row 3
// placed it (ruled A, 4 Sep 2026): inside beat 2's paragraph, immediately
// before "The case is not that the price will behave." Its only on-screen home
// was legacy 4-20's retired stability frame, which architecture Ruling 5 cut;
// no Act V scene stages it, and the three sentences after it stay together so
// that "the whole case, in eleven words" still points at the pair beside it.
//
// Landed states — the approved cells s29-b1 · s29-b2, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_caseStage.js';

const ID = 'the-case-from-first-principles';

const entry = legacyEntry(ID, 's423', 1.6);
const morphIn = legacyBoundary(ID, 0, 's422', 's423', 2.0);

const transitions = {
  // beat 2 — the conclusion, the frozen final frame: the summary clears, the
  // stage holds on pure black for the legacy's authored 900ms, and the case
  // lands over 500ms (4-23 build 2). The delay lives on the visible state, so
  // stepping back from the conclusion is still immediate.
  1: legacyAdvance(ID, 1, 's423', 2, 1.7)
};

export default makeSceneModule({
  id: ID,
  number: 29,
  title: 'The Case from First Principles',
  entry,
  morphIn,
  transitions,
  notes: `[→] So let’s close the loop we opened an hour ago. Money is an earned, transferable claim on value — the open half of every exchange your working life completes. A store of value is the carrier that must bring that claim through time intact. The future is unknowable, so we refused to predict it — we inverted, derived the ten ways a carrier fails, and turned each failure into a required property. Then we held five candidates against all ten, in the open, scores you can check.

[→] What emerged is not a promise. It’s a structure. One candidate has a supply no issuer can expand, custody no institution has to grant, verification anyone can run — and seventeen years against a hundred-year question, scored honestly at two out of five. Bitcoin does not fix its price. It fixes the rules through which the market discovers its price. The case is not that the price will behave. Price should be free to move. The monetary rules should be hard to move. That’s the whole case, in eleven words — and it was built from first principles, in front of you.`
});
