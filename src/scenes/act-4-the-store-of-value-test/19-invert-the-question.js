// Scene 19 — Invert the Question (2 beats).
//
// Legacy 4-10, re-homed, with the presenter's Batch D ruling 1 made at the
// source (3 Sep 2026, master §13): beat 1 is the inverted framing alone —
// ASK INSTEAD: / How could the carrier fail? — with no carrier on stage;
// the carrier — the claim in its shell, on the stress stage, no corner
// frame (R7.4 §D.1) — arrives at beat 2, on its word: "so let's put a
// carrier on the bench and try to break it." Its arrival is the claim's and
// the shell's own reveals; nothing new.
//
// The seam from Scene 18 is the legacy deck's own boundary: the crossfade
// onto 4-10's build 0 — the governing question carried over, quiet and
// high, with DON'T BEGIN BY ASKING: / What makes a good carrier? beneath it
// — then the inversion replacing it in 4-10's own build-1 reveal, as the
// approved s19-b1 records (the direct framing as the beat's first movement).
//
// Landed states — the approved cells s19-b1 · s19-b2 (re-rendered under the
// ruling), by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'invert-the-question';

const entry = legacyEntry(ID, 's410', 1.0);
const morphIn = legacyBoundary(ID, 0, 's409', 's410', 1.3);

const transitions = {
  // beat 2 — the carrier arrives on the bench (4-10 build 2, as ruled).
  1: legacyAdvance(ID, 1, 's410', 2, 1.1)
};

export default makeSceneModule({
  id: ID,
  number: 19,
  title: 'Invert the Question',
  entry,
  morphIn,
  transitions,
  notes: `[→] We could go at that question head-on and start listing everything a good carrier ought to have. That is what almost every conversation about money does. There is a better way, and it is not mine — it is Charlie Munger’s, and he was blunt about it: invert, always invert. So instead of asking what makes a good carrier, ask how a carrier fails.

[→] What could stop this claim from reaching 2126 intact and still redeemable? Because that question has answers we can actually check — history is full of them. And once you have the ways it fails, the properties you need are not a matter of taste any more. They are just the failures, turned around. So let’s put a carrier on the bench and try to break it.`
});
