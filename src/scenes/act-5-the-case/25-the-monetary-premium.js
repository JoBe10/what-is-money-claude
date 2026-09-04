// Scene 25 — The Monetary Premium (4 beats).
//
// Legacy 4-18, re-homed whole: the equation opening on ASSET VALUE = alone —
// the frame the legacy spoke its entry line over, and the scene's own first
// beat by the entry-line ruling (Row 1 = A, 4 Sep 2026); then the part that is
// easy to defend, UNDERLYING UTILITY / PRODUCTIVE VALUE joining the equation
// with the three examples landing as one accumulating element, real estate,
// shares and gold at the display box with their base labels; then the other
// part, + MONETARY PREMIUM completing the equation in the accent while the
// warm halo lights on each of the three marks — the premium as light on the
// object, not a box around it (R7.1 §C3) — with the shared label and the
// supporting line; then the closing pair alone, everything above it settled to
// the quiet step. Every beat after the first is the legacy module's own live
// advance at the legacy stylesheet's durations.
//
// The seam from Scene 24 is the legacy deck's own boundary, and it lands on a
// build 0: the crossfade brings 4-18 up at the equation's left-hand side and
// nothing follows it, because that frame IS this scene's first beat. The
// migration's lane and its three destinations dissolve beneath the equation
// exactly as the legacy dissolved 4-17 into 4-18.
//
// The descent continues (the map's §0): the world's savings moving between
// assets becomes the split inside one asset's value. Fewer things than the
// scene before it.
//
// Landed states — the approved cells s25-b1 … s25-b4, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundaryTo0, legacyCut } from './_caseStage.js';

const ID = 'the-monetary-premium';

const entry = legacyCut(ID);
const morphIn = legacyBoundaryTo0(ID, 's417', 's418', 0.9);

const transitions = {
  // beat 2 — the part that is easy to defend: the utility term joins at 460ms
  // and the three examples rise together, 420/520ms (4-18 build 1).
  1: legacyAdvance(ID, 1, 's418', 1, 0.9),
  // beat 3 — the other part: the premium term and its mark at 460ms, the halo
  // filtering onto each mark over 520ms, the shared label and the supporting
  // line at 400/480ms (build 2).
  2: legacyAdvance(ID, 2, 's418', 2, 0.9),
  // beat 4 — the closing pair alone: the equation, the examples, the label and
  // the supporting line dim to the quiet step over 460ms while the pair rises
  // at 400/480ms (build 3).
  3: legacyAdvance(ID, 3, 's418', 3, 0.9)
};

export default makeSceneModule({
  id: ID,
  number: 25,
  title: 'The Monetary Premium',
  entry,
  morphIn,
  transitions,
  notes: `[→] An asset’s value, split into two parts.

[→] Start with the part that is easy to defend. Real estate has value because it provides shelter and rental services. Shares have value because businesses produce goods, earn profits, and may distribute cash flows. Gold has ornamental and limited industrial uses — although with gold, a large part of its historical value is already monetary, which is exactly why it sits in this comparison at all.

[→] And then there is the other part. When savers also use these things to preserve purchasing power, that demand adds something on top: a monetary premium. Because people do not buy every asset only for what it produces. They also buy it because they need somewhere to *put* the claim. And here is the distinction the whole objections block rests on. Saving preserves a general monetary claim; investing deploys it into a specific arrangement in pursuit of a return. Those are different acts. Under depreciating money they have been quietly merged — investing has become the new saving — which is precisely the diagnosis this whole inquiry began from. If money itself reliably preserved purchasing power, other assets would likely be valued more for their underlying utility and cash flows, and less for their role as savings vehicles.

[→] Two honest qualifications. We cannot observe monetary premium directly, and we certainly cannot measure it precisely — it is a conceptual distinction, not a line item. But it is an essential one, because it is what Bitcoin is actually competing for. Not the entire value of a house. Not the entire value of a business. The monetary demand embedded inside those markets. So what happens when something whose *only* utility is monetary walks into a market where other assets have been doing money’s job for decades?`
});
