// Scene 22 — From Failure to Requirement — the Ten Properties (3 beats; the
// Batch D ruling 2, 3 Sep 2026, master §13).
//
// Legacy 4-13 and 4-14, re-homed in the architecture's merge: the mapping
// grid — the ten failures standing under the line "Invert each failure. The
// properties emerge." — with the first five turning around, then the second
// five (4-13's own two sweeps); then the ten properties as two numbered
// columns. THE ONE RULED CHANGE (S22-F2, ADAPT): all ten properties land in
// one advance. The legacy landed five per build; here the third beat's
// gesture drives both of 4-14's builds in one continuous timeline — the
// left column's rows arriving in reading order at the legacy's own stagger,
// the right column's following as the left finishes — and settles on 4-14's
// own last state, the approved s22-b3. The legacy module is untouched.
//
// The seam from Scene 21 is the legacy deck's own boundary: the completed
// index dissolves onto 4-13's build 0 — all ten failures standing in the
// grid, none yet mapped, the composition the approved s22-b1 records as the
// first sweep's first movement — then the first sweep. The composition
// change from the grid to the list (beat 2 → 3) is the legacy's own
// crossfade onto 4-14's empty frame, then the landing.
//
// Landed states — the approved cells s22-b1 … s22-b3, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_testStage.js';

const ID = 'from-failure-to-requirement';

const entry = legacyEntry(ID, 's413', 1.0);
const morphIn = legacyBoundary(ID, 0, 's412', 's413', 1.4);

const transitions = {
  // beat 2 — the second sweep (4-13 build 2).
  1: legacyAdvance(ID, 1, 's413', 2, 1.0),

  // beat 3 — the ten properties in one advance (the ruled change): the grid
  // gives way to 4-14's empty frame in the legacy's crossfade, then both of
  // 4-14's builds play in one timeline, the second column following the
  // first as it finishes (the left column's last row begins at 4 × 80ms and
  // rises for 380ms).
  2: (mod, stage) => {
    const tl = stage.timeline();
    const done = stage.crossfade(tl, 0.05, 's413', 's414', 0);
    tl.add(() => stage.live('s414', 1), done + 0.06);
    tl.add(() => stage.live('s414', 2), done + 0.06 + 0.72);
    tl.add(() => stage.applyState(ID, 2), done + 0.06 + 0.72 + 1.0);
  }
};

export default makeSceneModule({
  id: ID,
  number: 22,
  title: 'From Failure to Requirement — the Ten Properties',
  entry,
  morphIn,
  transitions,
  notes: `[→] Take the first five and turn each one around. If extra units can dilute what is already held, then what you need is a carrier where no one can add units: no supply inflation. Indivisible becomes divisible. Illiquid becomes liquid. Trapped becomes portable. And a carrier that eats the claim through carrying costs becomes one that costs nothing to keep.

[→] And the same operation on the second five. Control becomes resistance to control. Degradation becomes durability. Uncertainty becomes verifiability. Unequal units become fungible ones. And thin evidence becomes the demand for a track record. Notice what just happened, because this is the whole method: I did not choose these. I did not sit down and decide what a good money should look like. Each one is a failure with a minus sign in front of it.

[→] So here is the first five, and every one of them is a question you can put to anything that claims to be money. No supply inflation: can anybody create more units and dilute what I already hold? Divisibility: can it carry both very large and very small value? Liquidity: can I exchange it without waiting and without a haircut? Portability: can it move across distance, and across a border? No carrying costs: can I simply hold it — without paying to? And the second five. Resistance to control: can anyone outside change the access, the ownership, or the rules? Durability: does it survive physical, technical and institutional change? Verifiability: can authenticity, ownership and supply be established — by me, rather than by somebody telling me? Fungibility: is one unit treated as good as another? And track record: what evidence do we actually have that it survives crises and changing regimes? Ten criteria — derived, not chosen. Now let’s point them at something.`
});
