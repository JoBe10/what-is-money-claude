// Scene 20 — How the Carrier Can Fail: I (5 beats).
//
// Legacy 4-11, re-homed: the typographic failure index — the number, the
// failure, the explanation — one row per advance, five rows: DILUTED ·
// INDIVISIBLE · ILLIQUID · TRAPPED · COSTLY TO HOLD, the frozen data by its
// own module. Every beat is the legacy module's own live advance, the row's
// 400ms rise at the legacy stylesheet's timing.
//
// The seam from Scene 19 is the legacy deck's own boundary: the crossfade
// onto 4-11's build 0 — the empty frame the legacy authored — then the first
// row's own landing, one advance. The carrier leaves the stage here as it
// left it in the legacy deck: the bench gives way to the index.
//
// Landed states — the approved cells s20-b1 … s20-b5, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'how-the-carrier-can-fail-i';

const entry = legacyEntry(ID, 's411', 0.9);
const morphIn = legacyBoundary(ID, 0, 's410', 's411', 1.3);

const transitions = {
  1: legacyAdvance(ID, 1, 's411', 2, 0.8),
  2: legacyAdvance(ID, 2, 's411', 3, 0.8),
  3: legacyAdvance(ID, 3, 's411', 4, 0.8),
  4: legacyAdvance(ID, 4, 's411', 5, 0.8)
};

export default makeSceneModule({
  id: ID,
  number: 20,
  title: 'How the Carrier Can Fail: I',
  entry,
  morphIn,
  transitions,
  notes: `[→] The first one is dilution. If somebody can create additional units of the carrier whenever they choose, then the claim embodied in every unit already held gets quietly divided into a smaller share. Nobody takes anything from you. Your number does not change. What it commands does.

[→] Second: it could be indivisible. It might hold enormous value and be impossible to break into the sizes ordinary life needs — and a carrier you cannot cut is a carrier you can only spend all at once.

[→] Third: illiquid. The claim looks valuable, and the holder still cannot turn it into anything without waiting, without friction, or without taking a real loss to get out.

[→] Fourth: trapped. Value that cannot cross a border, a jurisdiction, or simply a distance may never reach the person who needs it — and the people who most need to move value are usually the people least allowed to.

[→] And fifth: the carrier can eat the claim. Storage, insurance, maintenance, administration — costs that arrive every year and are paid out of the thing you were trying to preserve. Those are five. There are five more, and the second five are the ones that do the most damage.`
});
