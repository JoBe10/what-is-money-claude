// Scene 17 — What the Carrier Must Preserve (5 beats).
//
// Legacy 4-07, re-homed: the question over the claim in its shell at the
// NOW position — the composition 4-06 handed over, the carrier inherited;
// the drawn path NOW → LATER and the carrier stepping along it; PURCHASING
// POWER and REDEEMABILITY landing as the two measures, the shell taking its
// future focus; the three-line definition with its two bold terms, the
// prior elements settling to the quiet step. Every beat is the legacy
// module's own live advance at the legacy stylesheet's durations.
//
// The seam from Scene 16 is the legacy deck's own boundary: the crossfade
// to 4-07's build 0 — the carrier inherited — then the question's own
// landing, one advance.
//
// Landed states — the approved cells s17-b1 … s17-b5, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'what-the-carrier-must-preserve';

const entry = legacyEntry(ID, 's407', 0.9);
const morphIn = legacyBoundary(ID, 0, 's406', 's407', 1.2);

const transitions = {
  // beat 2 — the claim has to cross time: the path appears and the carrier
  // steps from now to later (4-07 build 2).
  1: legacyAdvance(ID, 1, 's407', 2, 1.1),
  // beat 3 — PURCHASING POWER lands; the claim takes its focus (build 3).
  2: legacyAdvance(ID, 2, 's407', 3, 0.9),
  // beat 4 — REDEEMABILITY lands; the shell takes its future focus (build 4).
  3: legacyAdvance(ID, 3, 's407', 4, 1.1),
  // beat 5 — the definition; the question, the path and the measures settle
  // to the quiet step (build 5).
  4: legacyAdvance(ID, 4, 's407', 5, 1.0)
};

export default makeSceneModule({
  id: ID,
  number: 17,
  title: 'What the Carrier Must Preserve',
  entry,
  morphIn,
  transitions,
  notes: `[→] So with the claim and the carrier finally apart, I can ask the question that actually matters, and ask it precisely. What must the carrier preserve?

[→] Because a carrier does not succeed just by surviving. A stone survives a century. It carries nothing. What has to survive is the claim, and it has to cross time — from now, to later.

[→] Two things have to arrive. The first is purchasing power: the person holding it later must still be able to command real value with it. And let me qualify that immediately, because it is easy to overclaim. This does not mean freezing every relative price, or guaranteeing the same basket of goods forever — preferences change, productivity changes, scarcity changes. It means the carrier itself should preserve the claim as faithfully as it can, rather than quietly eroding it.

[→] The second is redeemability. The future holder has to still be able to reach it, verify it, move it, and finally exercise it. A claim you cannot exercise is not a store of value. It is a souvenir.

[→] So here is the definition we will use from here: a store of value is a monetary carrier that preserves the purchasing power of an unredeemed claim, and keeps that claim redeemable through time. Now — the only way I know to test a definition like that is to stop being polite about it, and stretch it until something breaks.`
});
