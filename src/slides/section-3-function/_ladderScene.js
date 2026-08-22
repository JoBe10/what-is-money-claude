// The shared scene layer of the `stage-ladder` continuity group (R2.1 §A
// pattern, R3): the ladder persists across the order-of-monetization and
// stage-signatures slides. At the within-group boundary the engine hands
// this layer off untouched — the incoming slide adopts the mounted
// StageLadder and animates it from its current state while only the
// slide-local overlays crossfade. Any cold mount (direct entry, refresh,
// standard transition) reconstructs the scene from scratch — the group
// changes transitions, never state ownership. The where-bitcoin-is slide
// is not part of the group (the layer tower stands between); it mounts its
// own ladder cold.

import { StageLadder } from '../../components/section-3/StageLadder.js';

export function ensureLadderScene(container) {
  const cached = container.__ladderScene;
  if (cached && cached.el.isConnected) return cached;
  const el = document.createElement('div');
  el.className = 's3f s3f-ladderscene';
  const ladder = StageLadder();
  el.appendChild(ladder.el);
  container.appendChild(el);
  const scene = { el, ladder };
  container.__ladderScene = scene;
  return scene;
}

export function releaseLadderScene(container, continuous) {
  const scene = container && container.__ladderScene;
  if (!scene || continuous) return;
  scene.ladder.destroy();
  delete container.__ladderScene;
}

// Overlay handoff: the outgoing slide’s text layer lifts away while the
// incoming one fades in over the persistent ladder. The removal timer
// belongs to the incoming (active) slide’s refs and is cleared in its
// onExit, so no timer survives navigation.
export function adoptOverlay(container, root, refs) {
  const old = Array.from(container.querySelectorAll('.s3f--overlay'))
    .filter((el) => el !== root);
  old.forEach((el) => { el.dataset.exiting = 'true'; });
  root.dataset.entering = 'true';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    delete root.dataset.entering;
  }));
  refs.overlayCleanup = setTimeout(() => {
    old.forEach((el) => el.remove());
    refs.overlayCleanup = null;
  }, 650);
}

// Called from onExit (any kind): settles pending overlay cleanup
// synchronously so rapid navigation can never stack stale overlays.
export function finishOverlayCleanup(container, refs) {
  if (refs && refs.overlayCleanup) {
    clearTimeout(refs.overlayCleanup);
    refs.overlayCleanup = null;
  }
  if (!container) return;
  container.querySelectorAll('.s3f--overlay[data-exiting="true"]')
    .forEach((el) => el.remove());
}
