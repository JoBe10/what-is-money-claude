// Scene 21 — How the Carrier Can Fail: II (5 beats).
//
// Legacy 4-12, re-homed: the second index — CONTROLLED · DEGRADED ·
// UNVERIFIABLE · NON-FUNGIBLE · UNTESTED — one row per advance, the frozen
// data by its own module. Every beat is the legacy module's own live
// advance at the legacy stylesheet's timing.
//
// The seam from Scene 20 is the legacy deck's own boundary: the completed
// first index dissolves onto 4-12's empty frame, then the sixth row lands.
//
// Landed states — the approved cells s21-b1 … s21-b5, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'how-the-carrier-can-fail-ii';

const entry = legacyEntry(ID, 's412', 0.9);
const morphIn = legacyBoundary(ID, 0, 's411', 's412', 1.3);

const transitions = {
  1: legacyAdvance(ID, 1, 's412', 2, 0.8),
  2: legacyAdvance(ID, 2, 's412', 3, 0.8),
  3: legacyAdvance(ID, 3, 's412', 4, 0.8),
  4: legacyAdvance(ID, 4, 's412', 5, 0.8)
};

export default makeSceneModule({
  id: ID,
  number: 21,
  title: 'How the Carrier Can Fail: II',
  entry,
  morphIn,
  transitions,
  notes: `[→] Sixth: it can be controlled. Somebody outside the arrangement can change who may access it, who owns it, or the rules it runs under — after you are already holding it. And notice this one does not need to destroy anything. It only needs a signature.

[→] Seventh: it can degrade. Physical decay, technical failure, damp, fire, a format nobody can read any more. The claim survives only as long as the thing carrying it survives.

[→] Eighth: it can be unverifiable. If the person holding it in 2126 cannot establish that it is authentic, that it is theirs, and how much of it exists — then they are not holding a claim, they are holding a hope.

[→] Ninth: the units may not be fungible. Two units that ought to be identical get treated differently because of where they have been. And a unit that has to be explained is a unit somebody can refuse.

[→] And tenth: it can simply be untested. A short history tells us very little about how something behaves across a war, a crisis, a technological break, a change of regime. This one is uncomfortable, and I want you to remember that I put it on the list myself, before you saw the table. So: ten distinct ways to fail. Now watch what happens when you turn them around.`
});
