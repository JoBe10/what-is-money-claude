// 2.2 — the discovery. The triangle from 2.1 — the same drawing, handed off
// through the `exchange-triangle` scene group (R2.2 §B.1), wall still
// standing. The goods arrive as this slide's first build state. Then the
// move: the fisherman hands fish to the sandal-maker — who doesn’t want
// fish — and receives sandals; the fish travels the drawn edge and is held,
// unconsumed. It moves on to the farmer for grain, the cycle clears, and
// the two lines land: the birth of money, then salability.
//
// The goods travel on CSS motion paths (offset-path); every build’s resting
// arrangement is reconstructed exactly by placing each good at its path
// endpoint with motion suppressed — the animation layer sits on top of the
// state, never instead of it.
//
// R2.1 §C.2: goods ride the triangle’s edges, not free arcs — each path
// hops off its rest shelf (centered above the giver’s dot), blends onto the
// edge’s lane at a small fixed normal offset, rides the line, and blends off
// to the receiver’s shelf. Opposing goods on one edge travel in sequence
// (the return leg is delayed inside the same gesture), never in parallel.

import {
  ensureTriadScene, releaseTriadScene,
  FISH_LEG_1, FISH_LEG_2, SANDALS_LEG, GRAIN_LEG
} from './_triadScene.js';
import { adoptOverlay, finishOverlayCleanup } from './_railScene.js';

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-02-the-discovery',
  section: 'origin',
  number: 8,
  title: 'The Discovery',
  totalBuildSteps: 4,
  sceneGroup: 'exchange-triangle',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureTriadScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-discovery';

    const wall = document.createElement('p');
    wall.className = 's2o-discovery__wall';
    wall.textContent = 'The double coincidence of wants.';
    root.appendChild(wall);

    const birth = document.createElement('p');
    birth.className = 's2o-discovery__birth';
    birth.textContent =
      'Money is born the moment someone accepts a good they do not want — to trade it away later.';
    root.appendChild(birth);

    const salability = document.createElement('p');
    salability.className = 's2o-discovery__salability';
    salability.textContent =
      'Some goods are easier to sell on than others. That property has a name: salability.';
    root.appendChild(salability);

    container.appendChild(root);

    this._refs = {
      root, scene, wall, birth, salability,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (forward from 2.1): the triangle persists untouched; the
      // goods fade in on their rest shelves as this slide's build-0 state.
      this._build(ctx.container, ensureTriadScene(ctx.container));
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
    releaseTriadScene(ctx?.container, Boolean(ctx?.continuous));
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  // Places a good at a point on a motion path. `animate: false` lands it
  // instantly (reconstruction); `animate: true` lets the offset transition
  // carry it there from wherever the previous build left it.
  _placeGood(el, path, distance, animate) {
    const pathValue = `path('${path}')`;
    const swap = el.style.offsetPath !== pathValue;
    if (!animate || swap) {
      el.dataset.moving = 'false';
      el.style.offsetPath = pathValue;
      if (animate && swap) {
        // New leg: snap to its start, then travel.
        el.style.offsetDistance = '0%';
        // eslint-disable-next-line no-unused-expressions
        el.offsetHeight;
        el.dataset.moving = 'true';
        el.style.offsetDistance = distance;
        return;
      }
      el.style.offsetDistance = distance;
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;
      el.dataset.moving = 'true';
      return;
    }
    el.dataset.moving = 'true';
    el.style.offsetDistance = distance;
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(4, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    // A handoff animates the scene from its current state (the mode flip);
    // cold reconstruction snaps it.
    const sceneLive = live || refs.handoff;
    refs.handoff = false;
    refs.reconstruct = false;
    refs.appliedStep = n;

    const sceneEl = refs.scene.el;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    sceneEl.dataset.mode = 'discovery';
    sceneEl.dataset.step = String(n);
    sceneEl.dataset.live = String(live);
    sceneEl.dataset.stepLive = live ? String(n) : '';
    // The summary lines take the frame from build 3; the triangle yields to
    // them. Declared rather than implied (§9.4 rule 10, R7.3) — a scene layer
    // that has handed the frame over is exempt from the legibility floor, and
    // the exemption belongs in the DOM where it can be seen and gated.
    sceneEl.dataset.yielded = String(n >= 3);

    // Reconstructed frames (direct entry, back-navigation) land instantly:
    // the snap attribute suppresses every transition for this apply.
    if (!live && !sceneLive) {
      sceneEl.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete sceneEl.dataset.snap;
      }));
    }

    // The goods' resting arrangement per build.
    const { fish, sandals, grain } = refs.scene.goods;
    if (n === 0) {
      this._placeGood(fish, FISH_LEG_1, '0%', false);
      this._placeGood(sandals, SANDALS_LEG, '0%', false);
      this._placeGood(grain, GRAIN_LEG, '0%', false);
    } else if (n === 1) {
      this._placeGood(fish, FISH_LEG_1, '100%', live);
      this._placeGood(sandals, SANDALS_LEG, '100%', live);
      this._placeGood(grain, GRAIN_LEG, '0%', false);
    } else {
      this._placeGood(fish, FISH_LEG_2, '100%', live && n === 2);
      this._placeGood(sandals, SANDALS_LEG, '100%', false);
      this._placeGood(grain, GRAIN_LEG, '100%', live && n === 2);
    }

    setVisible(refs.wall, n <= 1);
    setVisible(refs.birth, n >= 3);
    setVisible(refs.salability, n >= 4);
    // Edge relights, the traced path draw, and the hold ring are CSS keyed
    // on the scene's data-step/data-live.
  },

  notes: `[→] Now watch one person solve it. The sandal-maker accepts the fish — not to eat it. To *pass it on*. That one decision — accepting a good you don’t want, because someone else will — is the invention. Except nobody invented it.

[→] The fish moves on to the farmer, the grain comes back, and the circle clears. Everyone ends up with what they wanted, and the thing that made it possible was a good acting, for one link of the chain, as a go-between.

[→] That is the birth of money. Not a decree, not a committee — a discovery, made independently by every trading society on Earth, because the wall is the same everywhere.

[→] And the moment it’s discovered, a new question appears: *which* good should you accept to pass on? You want the one others are most likely to take. Some goods are easier to sell on than others — and that property has a name: salability. Hold onto that word. The entire history of money is a competition over it.`
};
