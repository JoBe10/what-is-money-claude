// Scene 24 — Migration (4 beats).
//
// The act opens. Legacy 4-17, re-homed whole: fiat standing alone at the left
// with its two jobs beneath it — MEDIUM OF EXCHANGE, UNIT OF ACCOUNT — the
// frame the legacy always spoke its entry line over, and the scene's own first
// beat by the entry-line ruling (Row 1 = A, 4 Sep 2026); then the demand to
// save landing at statement scale with the first claim at the lane's origin —
// the protagonist's Act V state begins here, savings demand looking for a
// carrier; then IT MIGRATES., the flow lane drawing from the origin with its
// three branches rising, gold, real estate and shares arriving at the display
// box on the dark-field register, and the three claims riding the lane to
// their destinations at focus; then the final line beneath it all. Every beat
// after the first is the legacy module's own live advance at the legacy
// stylesheet's durations.
//
// THE ENTRY SEAM, AS RULED (master §13, 4 Sep 2026 — the six seams are Batch
// E's to time): the boundary from Act IV is a CROSSFADE. Act IV ends on the
// fifty scores with the render band above the table and "Don't trust. Verify."
// beneath them; this scene rises on fiat standing alone. The question changes
// and the film cuts, so nothing here is a morph — and because Scene 23 and
// Scene 24 are in different scene groups, the boundary is the ENGINE's own
// crossfade, which is precisely the boundary the legacy deck played between
// 4-16 and 4-17. This scene therefore authors nothing for its entry: it stands
// its first frame and lets the crossfade deliver it. The spoken turn is
// already written at both ends.
//
// Landed states — the approved cells s24-b1 … s24-b4, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyCut } from './_caseStage.js';

const ID = 'migration';

const entry = legacyCut(ID);
// Act V's first scene is entered across an act boundary, never as a
// within-group handoff, so the engine's crossfade is the only arrival there
// is. morphIn exists for the contract and lands the same frame.
const morphIn = entry;

const transitions = {
  // beat 2 — the demand to save does not disappear: the opening statement
  // lands and the first claim appears at the lane's origin, neutral
  // (4-17 build 1). The claim's own 420/560ms reveal is the longest move.
  1: legacyAdvance(ID, 1, 's417', 1, 0.9),
  // beat 3 — it migrates: IT MIGRATES. in the accent, the lane's 620ms draw,
  // the branches rising behind their 420ms delay, the three destinations
  // arriving at the display box, and the three claims riding their
  // offset-path for 820ms (build 2) — the act's longest advance.
  2: legacyAdvance(ID, 2, 's417', 2, 1.2),
  // beat 4 — the final line beneath the lane (build 3).
  3: legacyAdvance(ID, 3, 's417', 3, 0.9)
};

export default makeSceneModule({
  id: ID,
  number: 24,
  title: 'Migration',
  entry,
  morphIn,
  transitions,
  notes: `[→] Fiat, holding two of the three jobs — and holding them extremely well.

[→] Because it is genuinely excellent as a medium of exchange and as a unit of account. That is not a grudging concession; it is the most universally accepted payment medium in history. What a great many savers do not trust it to do is the third job — hold value over long periods. And here is the thing people miss: when a money stops doing that job, the *desire* to do it does not go anywhere. The demand to save does not disappear.

[→] It migrates. It comes out as monetary demand for gold, for real estate, for shares, for art, for collectibles — for anything scarce enough to hold a claim. Which means those assets are quietly asked to do two jobs at once: their own, and money’s. And to be precise: migration doesn’t mean everyone’s savings march to one carrier on one day. During transitions, savings diversify — which is exactly what the world looks like right now. The margin mechanism you’re about to see works either way: wholesale or fractional, the direction is set at the edge.

[→] So: when money is not trusted to preserve purchasing power, savings demand moves into other assets. And that additional demand creates something we have to be able to name, because it is not the same thing as what the asset actually does. It creates a monetary premium.`
});
