// Scene 27 — The Marginal Decision (3 beats).
//
// The descent's hinge (the map's §0): the world's assets become one claim's
// choice. Legacy 4-21, re-homed whole: the ClaimObject at focus, low on the
// frame at the decision point, with the question already standing above it at
// display scale — Where does the next unredeemed claim go? — and nothing else;
// then the five drawn paths rising from the claim to gold, fiat, bitcoin, real
// estate and shares in the compact render box across the frame; then the
// supporting line beneath the decision. The last two beats are the legacy
// module's own live advances at the legacy stylesheet's durations.
//
// THE LEGACY ORDER STANDS — presenter-ruled, 4 September 2026 (master §13; the
// Batch E implementation brief §1.1). The states sheet raised this as a legacy
// fact against the map's own rows: the map described the entry frame as the
// claim alone and put the question with the paths, but legacy 4-21 stands the
// question from build 0. The sheet rendered it as the legacy renders it, which
// is what PORT means, and the presenter approved that cell AS RENDERED: the
// question hangs over the lone claim before the paths appear. Nothing here is
// re-ordered.
//
// The entry frame is the scene's own first beat by the entry-line ruling
// (Row 1 = A, 4 Sep 2026): the line the legacy always spoke over this frame —
// "One claim, and five places it could go." — now has the advance that lands
// it. So the seam from Scene 26 is the legacy deck's own boundary landing on a
// build 0: the crossfade brings 4-21 up at the claim and the question, and
// nothing follows it. The five coexistence assets dissolve beneath the one
// claim, which is the descent doing its work.
//
// Landed states — the approved cells s27-b1 … s27-b3, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundaryTo0, legacyCut } from './_caseStage.js';

const ID = 'the-marginal-decision';

const entry = legacyCut(ID);
const morphIn = legacyBoundaryTo0(ID, 's420', 's421', 0.9);

const transitions = {
  // beat 2 — the five paths and the five candidates: the paths fade up at
  // 420ms and the candidates rise at 420/500ms (4-21 build 1).
  1: legacyAdvance(ID, 1, 's421', 1, 0.9),
  // beat 3 — the supporting line beneath the decision, 400/480ms (build 2).
  2: legacyAdvance(ID, 2, 's421', 2, 0.9)
};

export default makeSceneModule({
  id: ID,
  number: 27,
  title: 'The Marginal Decision',
  entry,
  morphIn,
  transitions,
  notes: `[→] One claim, and five places it could go.

[→] Here is the thing that makes this tractable, and it is the opposite of how these conversations usually go. The entire existing stock of the world’s wealth does not have to move. Nothing has to be sold. Look instead at the decisions being made right now: every new unit of savings is one. So is every refinancing, every inheritance, every asset sale, every portfolio rebalance. A maturing bond is another. A business exit is another. And notice what this question actually is. It’s the one every saver eventually asks — you’re just asking it calmly, in advance, with time to think. Instead of during the run.

[→] So the question that matters is not who owns what today. It is which carrier wins a growing share of those decisions at the edge. The monetary competition is decided at the margin. Which means: where does the next unredeemed claim go?`
});
