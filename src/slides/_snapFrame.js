// The reconstruction snap frame — the deck standard since R2, brought to
// Sections 4 and 5 at R7. (Sections 1–3 inline the identical mechanism inside
// each slide; this module is the same contract, factored out, because Section 4
// has twenty-three slides that all need it.)
//
// Every apply that is not a live forward advance (direct entry, a refresh
// mid-animation, back-navigation, an overview jump) must land its exact frame
// with no transition, delay or animation running: what the viewer sees is what
// a live advance would have settled on, immediately. Two frames of
// `data-snap` on the slide root do that; the CSS rule that consumes it lives
// beside the Section 4 styles.
//
// `data-live` is the other half of the contract: choreography that may only
// play on a real advance (a stagger, a pulse, a delayed reveal) keys off it,
// so nothing replays when the snap lifts.
//
// Usage — in `render(container)`:
//   this._refs = { root, …, appliedStep: 0, reconstruct: false };
// in `onEnter(ctx)`:
//   markReconstruct(this._refs, ctx);
// and at the top of `_applyBuild(step)`:
//   const n = clampStep(step, MAX);
//   const live = beginBuild(refs, n);

export function clampStep(step, max) {
  return Math.max(0, Math.min(max, Number(step) || 0));
}

// A cold mount that is about to be driven to a build > 0 is a reconstruction,
// not an advance — the engine renders, then calls buildStep() immediately.
export function markReconstruct(refs, ctx) {
  if (refs && (ctx?.targetBuildStep || 0) > 0) refs.reconstruct = true;
}

// Writes `data-step` / `data-live` on the root, arms the snap when the apply is
// a reconstruction, and returns whether this apply is live.
export function beginBuild(refs, n) {
  const { root } = refs;
  const live = !refs.reconstruct && n === refs.appliedStep + 1;
  refs.reconstruct = false;
  refs.appliedStep = n;
  root.dataset.step = String(n);
  root.dataset.live = String(live);
  if (!live) {
    root.dataset.snap = 'true';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      delete root.dataset.snap;
    }));
  }
  return live;
}
