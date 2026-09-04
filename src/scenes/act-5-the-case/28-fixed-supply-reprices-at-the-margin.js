// Scene 28 — Fixed Supply Reprices at the Margin (3 beats).
//
// THE FILM'S BOOKEND. Legacy 4-22, re-homed whole: FIXED OUTSTANDING STOCK —
// thirty-five units in a seven-by-five grid — with the rightmost column lit as
// AVAILABLE AT THE MARGIN under its bracket and the three demand claims
// waiting at the right; then the claims travelling to the margin and taking
// their focus, bidding against the lit column; then the repricing sweeping
// right to left across the whole stock, 58ms a column, with PRICE DISCOVERED
// HERE beneath the margin and the final line landing under the opening one.
//
// THE RHYME IS REAL BY CONSTRUCTION, NOT RESEMBLED (row 4 ruled A, 4 Sep
// 2026). The field is `FixedSupplyField`, which draws its units with `UnitGrid`
// from `src/components/UnitField.js` — the same module the Prologue's hours
// field draws its eighty thousand units from, both reading the one
// `UNIT_GRAMMAR`: a unit fills 0.8235 of its horizontal pitch and 0.7419 of its
// vertical pitch, at both scales. Eighty thousand hours poured in at the
// opening; thirty-five units of a fixed stock at the close, one sliver of them
// for sale. Nothing here points the rhyme out — it lives in the code, and the
// sheet's check proves the mounted grid against the grammar read from source.
// Neither component is touched by this scene; a change to either is a change to
// both ends of the film.
//
// THE ENTRY, AS RULED (master §13, 4 Sep 2026 — the six seams): 4-22's build 0,
// the stock at rest with no column lit and no claims, has no advance of its own
// — it is the composition this scene's entry gesture starts from, and THE
// MARGIN LIGHTS AS THE WORDS LAND. The boundary from Scene 27 is the legacy
// deck's own crossfade onto that build 0, then 4-22's own build-1 reveal.
//
// THE THROUGH-LINE'S LAST JOURNEY rides that same crossfade, which is the whole
// of the wiring the ruling asks for: Scene 27's one decision claim at the
// default 116 dissolves as the field rises with its three demand claims at 44
// standing at the field's right edge. Neither end's frame is redesigned; the
// claim's continuity across the boundary is the dissolve itself, exactly as the
// legacy deck carried it from 4-21 to 4-22.
//
// Landed states — the approved cells s28-b1 … s28-b3, by construction.

import { makeSceneModule } from './_sceneModule.js';
import { legacyAdvance, legacyBoundary, legacyEntry } from './_caseStage.js';

const ID = 'fixed-supply-reprices-at-the-margin';

const entry = legacyEntry(ID, 's422', 1.1);
const morphIn = legacyBoundary(ID, 0, 's421', 's422', 1.5);

const transitions = {
  // beat 2 — the demand arriving: the three claims travel from the right edge
  // to the margin over 760ms and take their focus, the mechanism line lands at
  // 400/480ms and the opening line settles to the dimmed-prior step (build 2).
  1: legacyAdvance(ID, 1, 's422', 2, 1.1),
  // beat 3 — the repricing: the emphasis sweeps right to left across the stock,
  // 440ms a unit behind a 58ms-per-column delay (~790ms end to end), the rule
  // under the stock draws at 620ms behind its 280ms delay, and PRICE DISCOVERED
  // HERE lands at 460ms behind 320ms (build 3).
  2: legacyAdvance(ID, 2, 's422', 3, 1.3)
};

export default makeSceneModule({
  id: ID,
  number: 28,
  title: 'Fixed Supply Reprices at the Margin',
  entry,
  morphIn,
  transitions,
  notes: `[→] Demand does not have to absorb every existing bitcoin. That is the version of the argument people imagine and then dismiss, and they are right to dismiss it. Look at what is actually for sale. At any moment only a sliver of the outstanding stock is on the market — the rest is held by people who are not selling at today’s price.

[→] So new buyers are not bidding against the whole stock. They are bidding against that sliver, and against existing holders’ willingness to part with it. In most markets that pressure eventually calls forth more supply: a higher price makes it worth producing more, issuing more, digging more. Here it does not. Additional demand meets a supply that cannot expand, because no one has the authority to expand it.

[→] And the price discovered in that narrow band gets applied to the entire outstanding stock. Now, two honest qualifications, because this is where the argument usually gets oversold. It is not a price formula — liquidity, expectations, leverage and holder behavior all still matter, and none of them are in this picture. And the mechanism is symmetric: the same microstructure that lets marginal inflows reprice the stock upward amplifies the falls when marginal flows reverse. Fixed supply explains sensitivity — in both directions. What it does explain is why a growing share of marginal savings can have an effect out of all proportion to its size. Bitcoin does not need to absorb everything. It only needs to win more of the margin.`
});
