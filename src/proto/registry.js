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

// Act II (Scenes 5–10) ran here as `?proto=act2` while Batch B built it, and
// LEFT THIS LIST AT THE SPLICE of 31 August 2026 — the entry leaves when the
// batch lands, which is this file's own rule. The scenes are in the film now;
// `src/slides/manifest.js` is where they live.

// Act III (Scenes 11–15) runs here as `?proto=act3` while Batch C builds it
// (Scenes 11–13 at Session 1); the entries leave at Session 2's splice.
import threeFamiliarJobs from '../scenes/act-3-the-jobs-of-money/11-three-familiar-jobs.js';
import weAlreadySplitThoseJobs from '../scenes/act-3-the-jobs-of-money/12-we-already-split-those-jobs.js';
import theOrderOfMonetization from '../scenes/act-3-the-jobs-of-money/13-the-order-of-monetization.js';
import theCoffeeObjection from '../scenes/act-3-the-jobs-of-money/14-the-coffee-objection.js';
import theTower from '../scenes/act-3-the-jobs-of-money/15-the-tower.js';

threeFamiliarJobs.protoKey = 'act3';
weAlreadySplitThoseJobs.protoKey = 'act3';
theOrderOfMonetization.protoKey = 'act3';
theCoffeeObjection.protoKey = 'act3';
theTower.protoKey = 'act3';

export const prototypes = [
  theDirectExchange, theBreakthrough, spendOrSave,
  threeFamiliarJobs, weAlreadySplitThoseJobs, theOrderOfMonetization,
  theCoffeeObjection, theTower
];

export default prototypes;
