// The scratch route's registry — the prototypes `?proto=` can run.
//
// A prototype is an ordinary scene module (`src/scenes/`) listed here while it
// is being judged. Listing it costs the deck nothing: the deck's ordering is
// `src/slides/manifest.js` and only a batch splices a scene into it. When the
// batch lands, the entry leaves this list.
//
// Each entry is the scene module itself. An optional `protoKey` on a module
// gives it a shorter address than its id (`?proto=claim-mark`); without one,
// its id is its address. Modules sharing one protoKey run together, in this
// order — `?proto=gate2` is Scenes 2–4 as one continuous world.
//
// Prototype Gate 2 (docs/gate-2-brief.md): Scenes 2–4 in the scratch route,
// built against the approved stills. These modules live under `src/proto/`
// rather than `src/scenes/` because the gate forbids scene files until Batch A
// implements against the presenter's rulings; the birth treatment is selected
// with `?birth=1|2|3` (or keys 1/2/3 on Scene 3), and the selection is his.
import theDirectExchange from './gate-2/s2-the-direct-exchange.js';
import theBreakthrough from './gate-2/s3-the-breakthrough.js';
import spendOrSave from './gate-2/s4-spend-or-save.js';

// Batch B (docs/batch-b-implementation-brief.md §2–§3): Act II as one
// continuous world — `?proto=act2` — running in place behind the existing
// deck count until the splice. These are the real scene modules under
// `src/scenes/`, listed here only while they wait for it; Scenes 5–7 landed
// at Session 1 and Scenes 8–10 join them at Session 2.
import theFunctionStayed from '../scenes/act-2-the-architecture-of-money/05-the-function-stayed.js';
import scarcityInMatter from '../scenes/act-2-the-architecture-of-money/06-gold-scarcity-in-matter.js';
import claimsOnGold from '../scenes/act-2-the-architecture-of-money/07-claims-on-gold.js';
import moneyBecomesInformation from '../scenes/act-2-the-architecture-of-money/08-money-becomes-information.js';
import scarcityBecomesDigital from '../scenes/act-2-the-architecture-of-money/09-scarcity-becomes-digital.js';
import theTradeOffKeepsMoving from '../scenes/act-2-the-architecture-of-money/10-the-trade-off-keeps-moving.js';

export const prototypes = [
  theDirectExchange, theBreakthrough, spendOrSave,
  theFunctionStayed, scarcityInMatter, claimsOnGold,
  moneyBecomesInformation, scarcityBecomesDigital, theTradeOffKeepsMoving
];

export default prototypes;
