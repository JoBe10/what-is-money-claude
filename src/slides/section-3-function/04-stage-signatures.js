// 3.4 — stage signatures. The ladder stands resolved (the foundation
// emphasis settles back to neutral in the handoff); a bracket marks the
// early stages with the signature line, and the verdict lands: volatility
// and illiquidity are properties of the stage, not verdicts on the good.
// Bitcoin is not mentioned. Second slide of the `stage-ladder` group —
// build 0 is the inherited scene state, per the R2 group precedent.

import {
  ensureLadderScene,
  releaseLadderScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_ladderScene.js';

const VERDICT =
  'Volatility and illiquidity are properties of the stage — not verdicts on the good.';

const STAGES_RESOLVED = {
  collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed'
};
// The inherited ladder arrives with every threshold already stated (R3.1 §B1).
const GATES_LIT = { g1: 'bright', g2: 'bright', g3: 'bright' };

const LADDER_STATES = [
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, bracket: true },
  { line: true, stages: STAGES_RESOLVED, gates: GATES_LIT, bracket: true }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-04-stage-signatures',
  section: 'function',
  number: 18,
  title: 'Stage Signatures',
  totalBuildSteps: 2,
  sceneGroup: 'stage-ladder',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureLadderScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's3f s3f--overlay s3f-signatures';

    const verdict = document.createElement('p');
    verdict.className = 's3f-signatures__verdict';
    verdict.textContent = VERDICT;
    root.appendChild(verdict);

    container.appendChild(root);

    this._refs = {
      root, ladder: scene.ladder, verdict,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff from the order slide: its kicker and lines lift away and
      // the foundation emphasis resolves to neutral.
      this._build(ctx.container, ensureLadderScene(ctx.container));
      adoptOverlay(ctx.container, this._refs.root, this._refs);
      this._refs.reconstruct = true;
      this._refs.handoff = true;
      if ((ctx.targetBuildStep || 0) === 0) this._applyBuild(0);
      return;
    }
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit(ctx) {
    finishOverlayCleanup(ctx?.container, this._refs);
    releaseLadderScene(ctx?.container, Boolean(ctx?.continuous));
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(2, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    const ladderLive = live || refs.handoff;
    refs.handoff = false;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    if (!live && !ladderLive) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    refs.ladder.applyState(LADDER_STATES[n], { live: ladderLive });

    setVisible(refs.verdict, n >= 2);
  },

  notes: `[→] One more thing the ladder teaches, and it’s short but it matters. Look at what a good early in the climb necessarily looks like: few holders. Thin markets. Prices that swing hard, because every new believer and every doubter moves the whole market.

[→] That means volatility and illiquidity are properties of the *stage*, not verdicts on the *good*. Gold itself spent millennia as a collectible curiosity before it was anyone’s savings — if you’d judged it in that stage by its price behavior, you’d have judged the stage, not the metal. File that one away. It’ll matter later, and I won’t have to say why.`
};
