// The shared scene layer of the `evolution-rail` continuity group
// (R2.1 §A). The rail persists across the merged competition-record slide,
// the periodic table (which rises over it while it dims in place — the
// designed exception), the abstraction ladder, the severance, and the
// pattern slide. At every within-group boundary the engine hands this layer
// off untouched: the incoming slide adopts the mounted EvolutionRail and
// animates it from its current state (camera, stop states, dimming), while
// only the slide-local overlays crossfade. Any cold mount (direct entry,
// refresh, standard transition) reconstructs the scene from scratch — the
// group changes transitions, never state ownership.

import { EvolutionRail } from '../../components/section-2/EvolutionRail.js';

export function ensureRailScene(container) {
  const cached = container.__railScene;
  if (cached && cached.el.isConnected) return cached;
  const el = document.createElement('div');
  el.className = 's2o s2o-railscene';
  const wrap = document.createElement('div');
  wrap.className = 's2o-railwrap';
  wrap.dataset.visible = 'true';
  const rail = EvolutionRail();
  wrap.appendChild(rail.el);
  el.appendChild(wrap);
  container.appendChild(el);
  const scene = { el, wrap, rail };
  container.__railScene = scene;
  return scene;
}

// On a continuous exit the incoming slide adopts the scene; on a real exit
// the rail’s camera tween dies with the slide.
export function releaseRailScene(container, continuous) {
  const scene = container && container.__railScene;
  if (!scene || continuous) return;
  scene.rail.destroy();
  delete container.__railScene;
}

// Overlay handoff: the outgoing slide’s text layer lifts away while the
// incoming one fades in over the persistent rail. The removal timer belongs
// to the incoming (active) slide’s refs and is cleared in its onExit, so no
// timer survives navigation.
export function adoptOverlay(container, root, refs) {
  const old = Array.from(container.querySelectorAll('.s2o--overlay'))
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
  container.querySelectorAll('.s2o--overlay[data-exiting="true"]')
    .forEach((el) => el.remove());
}
