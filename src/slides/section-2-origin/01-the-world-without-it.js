// 2.1 — the world without it. Two people, HAS and WANTS, and a connecting
// line that attempts to form and dies. The farmer completes the triangle;
// every pairwise trade attempts and dies in sequence, the HAS→WANTS cycle
// arcs make the trapped circulation visible, and the wall gets its name.
//
// Build 0 is black — 1.5's script now ends "let’s take money away —
// completely — and watch what happens" (the waypoint ignition lives inside
// 1.5 since R2.1 §B), and the advance out of Section 1 lands here in
// darkness. Each [→] then builds the world: the failed pair, the failed
// triangle, the named wall.
//
// First slide of the `exchange-triangle` scene group (R2.2 §B.1): the triad
// lives in the shared scene layer and persists — untorn — into the
// discovery slide; this slide's overlay carries only the wall line.

import { ensureTriadScene, releaseTriadScene } from './_triadScene.js';
import { adoptOverlay, finishOverlayCleanup } from './_railScene.js';

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-01-the-world-without-it',
  section: 'origin',
  number: 7,
  title: 'The World Without It',
  totalBuildSteps: 3,
  sceneGroup: 'exchange-triangle',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureTriadScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-world';

    const wall = document.createElement('p');
    wall.className = 's2o-world__wall';
    wall.textContent = 'The double coincidence of wants.';
    root.appendChild(wall);

    container.appendChild(root);

    this._refs = {
      root, scene, wall,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (backward from the discovery): the drawn triangle stands
      // untouched while the goods and traces fade with the mode flip and
      // the cycle arcs return; only the overlays crossfade.
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

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(3, Number(step) || 0));
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
    sceneEl.dataset.mode = 'world';
    sceneEl.dataset.step = String(n);
    sceneEl.dataset.live = String(live);
    // The staged failure choreography (edge draws, dies, ✕ lands) is CSS
    // keyed on data-step + data-live; reconstruction lands the resting
    // failed states instantly.
    sceneEl.dataset.stepLive = live ? String(n) : '';

    // Reconstructed frames (direct entry, back-navigation) land instantly:
    // the snap attribute suppresses every transition for this apply.
    if (!live && !sceneLive) {
      sceneEl.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete sceneEl.dataset.snap;
      }));
    }

    setVisible(refs.wall, n >= 3);
  },

  notes: `[→] Here’s a world with no money in it. A fisherman, with fish to spare, who needs sandals. A sandal-maker, with sandals, who needs grain. Trade should be easy — except the sandal-maker doesn’t want fish.

[→] Add the farmer, who has grain and wants fish, and look at the shape of the problem: everyone has something someone wants. Nobody has what the person *in front of them* wants. Every direct trade fails. The wealth is all there — it just can’t move.

[→] Economists call this the double coincidence of wants: for direct exchange to work, you must want exactly what I have, and I must want exactly what you have, at the same time, in the right amounts. Wherever exchange happens without money, this wall appears. And every trading society in history has hit it.`
};
