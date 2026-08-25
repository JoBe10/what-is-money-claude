// Prototype Gate 2 — the scene-module contract, in one place.
//
// The three scenes differ only in their states, gestures and notes; the
// contract mechanics (master §8.1) are identical and live here so they can be
// wrong in at most one place:
//
//   · buildStep(n) animates only the single forward step from a settled n−1.
//     Everything else — backward movement, jumps, direct entry, reduced motion,
//     an advance landing mid-gesture — resolves through applyState, which
//     reconstructs the complete state instantly.
//   · An interrupted gesture is first completed (snap to the build it was
//     heading for), so no key sequence can leave partial state.
//   · Cold entry at build 0 plays the scene's entry gesture; cold entry at any
//     other build renders settled — identical to having advanced there.
//   · A within-group handoff (the film's morph) plays the incoming scene's
//     morphIn; backward across the boundary reconstructs the outgoing scene's
//     end state instantly.

import { ensureStage, destroyStage, TOTAL_BUILDS, reducedMotion } from './_stage.js';

export function makeSceneModule({ id, number, title, notes, entry, morphIn, transitions, onEnterExtra, onExitExtra }) {
  return {
    id,
    protoKey: 'gate2',
    sceneGroup: 'act1-exchange',
    section: 'act i — the unfinished exchange',
    number,
    title,
    totalBuildSteps: TOTAL_BUILDS[id],
    notes,

    render(container) {
      this._stage = ensureStage(container);
    },

    onEnter(ctx) {
      const stage = this._stage = ensureStage(ctx.container);
      const target = ctx.targetBuildStep || 0;
      this._build = target;
      onEnterExtra?.(this, stage, ctx);

      if (target === 0 && !reducedMotion()) {
        if (ctx.continuous && ctx.direction === 'forward') {
          morphIn(this, stage);
          return;
        }
        if (!ctx.continuous) {
          entry(this, stage);
          return;
        }
      }
      stage.applyState(id, target);
    },

    buildStep(n) {
      const stage = this._stage;
      if (!stage) return;
      const from = this._build;
      if (stage.hasMotion()) {
        // Finish the interrupted gesture: its destination, instantly.
        stage.applyState(id, from);
      }
      this._build = n;
      if (n === from + 1 && !reducedMotion() && transitions[n]) {
        stage.applyState(id, from);   // the deterministic launch point
        transitions[n](this, stage);
        return;
      }
      stage.applyState(id, n);
    },

    onExit(ctx) {
      onExitExtra?.(this, ctx);
      if (ctx.continuous) {
        this._stage?.killMotion();
        return;
      }
      if (ctx.container) destroyStage(ctx.container);
      this._stage = null;
    }
  };
}
