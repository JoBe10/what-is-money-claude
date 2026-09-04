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

// Act III (Scenes 11–15) ran here as `?proto=act3` while Batch C built it,
// and LEFT THIS LIST AT THE SPLICE of 2 September 2026 — the entry leaves
// when the batch lands, which is this file's own rule. The scenes are in the
// film now; `src/slides/manifest.js` is where they live.

// Act IV (Scenes 16–23) ran here as `?proto=act4` while Batch D built it,
// and LEFT THIS LIST AT THE SPLICE of 3 September 2026 — the entry leaves
// when the batch lands, which is this file's own rule. The scenes are in the
// film now; `src/slides/manifest.js` is where they live.

// Act V (Scenes 24–30) runs here as `?proto=act5` while Batch E builds it —
// all seven scenes as of Session 2; the entries leave at this session's splice.
import migration from '../scenes/act-5-the-case/24-migration.js';
import theMonetaryPremium from '../scenes/act-5-the-case/25-the-monetary-premium.js';
import whenOtherAssetsDoMoneysJob from '../scenes/act-5-the-case/26-when-other-assets-do-moneys-job.js';
import theMarginalDecision from '../scenes/act-5-the-case/27-the-marginal-decision.js';
import fixedSupplyRepricesAtTheMargin from '../scenes/act-5-the-case/28-fixed-supply-reprices-at-the-margin.js';
import theCaseFromFirstPrinciples from '../scenes/act-5-the-case/29-the-case-from-first-principles.js';
import theClose from '../scenes/act-5-the-case/30-the-close.js';

migration.protoKey = 'act5';
theMonetaryPremium.protoKey = 'act5';
whenOtherAssetsDoMoneysJob.protoKey = 'act5';
theMarginalDecision.protoKey = 'act5';
fixedSupplyRepricesAtTheMargin.protoKey = 'act5';
theCaseFromFirstPrinciples.protoKey = 'act5';
theClose.protoKey = 'act5';

export const prototypes = [
  theDirectExchange, theBreakthrough, spendOrSave,
  migration, theMonetaryPremium, whenOtherAssetsDoMoneysJob, theMarginalDecision,
  fixedSupplyRepricesAtTheMargin, theCaseFromFirstPrinciples, theClose
];

export default prototypes;
