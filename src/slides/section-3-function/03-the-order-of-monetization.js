// 3.3 — the order of monetization, after Vijay Boyapati (attributed on
// stage per §3.4 of the governing brief). The empty rising line enters
// first; the four stages reveal in order, each gate lighting as its logic
// is stated; store of value takes the foundation state — the ladder’s only
// orange. First slide of the `stage-ladder` scene group: the ladder this
// slide builds persists untorn into the signatures slide. Build 0 is the
// authored black beat before the line enters.

import {
  ensureLadderScene,
  releaseLadderScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_ladderScene.js';

const KICKER = 'after Vijay Boyapati.';
const GATELINE_ONE = 'Nobody accepts as payment what they don’t expect to hold value.';
const GATELINE_TWO = 'Nobody writes contracts in what nobody accepts.';
// R3.1 §B2: "must win it first" collided with COLLECTIBLE being the
// ladder’s first *stage*. The structural phrasing matches what the visual
// already says — the things above stand on this one.
const FOUNDATION_LINE =
  'Store of value is the foundation function. The other functions are built on it.';

const stageState = (revealed, foundation) => {
  const keys = ['collectible', 'sov', 'moe', 'uoa'];
  const stages = {};
  keys.forEach((key, index) => {
    stages[key] = index < revealed ? 'revealed' : 'upcoming';
  });
  if (foundation) stages.sov = 'foundation';
  return stages;
};

// Threshold schedule (R3.1 §B1): each tick appears dim as soon as the
// stage below it stands on the line — the next threshold is visible before
// it is explained — and goes warm white on the build that states its
// gating logic (g1 with the store-of-value reveal, g2 with the acceptance
// gate line, g3 with the contracts gate line).
const LADDER_STATES = [
  { line: false, stages: stageState(0), gates: {} },
  { line: true, stages: stageState(0), gates: {} },
  { line: true, stages: stageState(1), gates: { g1: 'dim' } },
  { line: true, stages: stageState(2), gates: { g1: 'bright', g2: 'dim' } },
  { line: true, stages: stageState(3), gates: { g1: 'bright', g2: 'bright', g3: 'dim' } },
  { line: true, stages: stageState(4), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } },
  { line: true, stages: stageState(4, true), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-03-the-order-of-monetization',
  section: 'function',
  number: 17,
  title: 'The Order of Monetization',
  totalBuildSteps: 6,
  sceneGroup: 'stage-ladder',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureLadderScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's3f s3f--overlay s3f-order';

    const kicker = document.createElement('p');
    kicker.className = 's3f-order__kicker';
    kicker.textContent = KICKER;
    root.appendChild(kicker);

    const gatelineOne = document.createElement('p');
    gatelineOne.className = 's3f-order__gateline';
    gatelineOne.dataset.q = '1';
    gatelineOne.textContent = GATELINE_ONE;
    root.appendChild(gatelineOne);

    const gatelineTwo = document.createElement('p');
    gatelineTwo.className = 's3f-order__gateline';
    gatelineTwo.dataset.q = '2';
    gatelineTwo.textContent = GATELINE_TWO;
    root.appendChild(gatelineTwo);

    const foundation = document.createElement('p');
    foundation.className = 's3f-order__foundation';
    foundation.textContent = FOUNDATION_LINE;
    root.appendChild(foundation);

    container.appendChild(root);

    this._refs = {
      root, ladder: scene.ladder, kicker, gatelineOne, gatelineTwo, foundation,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (backward from the signatures slide): the bracket lifts
      // with its overlay and the foundation emphasis re-ignites.
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

    const n = Math.max(0, Math.min(6, Number(step) || 0));
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

    setVisible(refs.kicker, n >= 1);
    setVisible(refs.gatelineOne, n >= 4);
    setVisible(refs.gatelineTwo, n >= 5);
    setVisible(refs.foundation, n >= 6);
  },

  notes: `[→] There is an order, and it’s one of the most useful ideas in all of monetary thinking. The framing follows Vijay Boyapati. Monetary goods have historically climbed four stages.

[→] They start as collectibles — held by a few people for their own strange reasons. Shells. Beads. Something scarce and interesting, valuable to somebody.

[→] Then, if enough people notice it holds its worth, it becomes a store of value — a place to park purchasing power on purpose.

[→] Only then can it become a medium of exchange — and look at *why* the order can’t run backward: nobody accepts as payment what they don’t expect to hold value until they spend it. Store-of-value belief is the gate to acceptance.

[→] And only a widely accepted good becomes the unit of account — because nobody writes contracts in a measuring stick nobody accepts. Each stage gates the next.

[→] Which makes the second stage the foundation of the entire structure. Note the distinction: collectible is where a good *starts* — but it isn’t yet a monetary function. Of the three functions themselves, store of value is the one a good must win before the others can exist — the function the rest are built on. Not a law of nature; a pattern with a logic. But keep it in front of you, because it tells us exactly where to aim our judgment later: at the foundation, before anything else.`
};
