// Scene P2 — The Stakes (2 beats).
//
// One line on black, and it holds. The mercy line lands as the frame opens and
// stays for the spoken promise: the first-principles method and the handoff to
// the exchange are carried entirely in the voice, because the architecture
// retired the waypoint device and there is no agenda and no map on screen.
//
// LANDED STATES ARE APPROVED CELLS, BY CONSTRUCTION (states.json
// `approvedSet`): p2-b1 · p2-b2. The two are identical by design — the second
// beat is a hold — and the sheet rendered the hold as its own cell and proved
// it identical at zero differing pixels. The line is the deck's own
// `s1q-stakes__line`, which is the class the approved frame was rendered with;
// the hours-field ghost was retired by ruling on 25 August 2026.
//
// The arrival is the boundary's own gesture: P1's title dissolves and this
// frame rises in the engine's crossfade. No accent, no Claim Mark — the
// Prologue is monochrome, and orange enters at Scene 3's birth.

import { setVisible, claimRasterHint, releaseRasterHint } from './_prologueStage.js';

const MAX_STEP = 1;

export default {
  id: 'the-stakes',
  section: 'prologue',
  number: 2,
  title: 'The Stakes',
  totalBuildSteps: MAX_STEP,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's1q p2';

    const line = document.createElement('p');
    line.className = 's1q-stakes__line';
    line.textContent =
      'If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do.';
    root.appendChild(line);

    container.appendChild(root);

    this._canvas = claimRasterHint(container);
    this._refs = { root, line, appliedStep: 0, reconstruct: false };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    releaseRasterHint(this._canvas);
    this._canvas = null;
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(MAX_STEP, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);

    // Both beats show the line. The advance is a hold: the screen does not
    // change while the promise is spoken over it (the §1 map's own reading,
    // and the two approved cells are identical).
    setVisible(refs.line, true);
  },

  notes: `[→] And here is why that question deserves the next hour of your attention. If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do. That asymmetry is as old as money itself: in every era, the people who understood the monetary system have held a quiet power over the people who merely used it. Most people live their whole lives on the wrong side of that line without ever knowing the line exists. The point of everything that follows is to move you to the other side of it.

[→] So how do you truly understand anything — from first principles? Not by memorizing a definition. By watching the thing get born. By watching it change. And by learning how to judge anything that claims to be it. So forget the objects. Forget everything you just saw. We start with something older and simpler than all of them. We start with an exchange.`
};
