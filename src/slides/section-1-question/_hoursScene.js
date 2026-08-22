// The shared scene layer of the `hours-field` continuity group (R2.1 §A).
//
// 1.1 and 1.2 are one continuous visualization — the field a working life
// pours into — so the engine hands the scene across the slide boundary
// instead of tearing down and fading through black. The scene is
// container-scoped (cached on the slide container, per the established
// pattern): on a handoff the incoming slide adopts the mounted UnitField and
// animates from its current state, and only the slide-local text overlays
// transition. Any cold mount (direct entry, refresh, standard transition)
// reconstructs the scene from scratch — the group changes transitions, never
// state ownership.

import { UnitField } from '../../components/UnitField.js';

export function ensureHoursScene(container) {
  const cached = container.__hoursScene;
  if (cached && cached.el.isConnected) return cached;
  const el = document.createElement('div');
  el.className = 's1q s1q-fieldscene';
  // Both caches pre-paid at mount (inside the entry transition), so the
  // field is ready for either slide’s animation regardless of which slide
  // created it — 1.2's collapse must not pay a first-frame hitch on a field
  // it inherited from 1.1.
  const field = UnitField({ preRadial: true, warmAnim: true });
  el.appendChild(field.el);
  container.appendChild(el);
  const scene = { el, field };
  container.__hoursScene = scene;
  return scene;
}

// On a continuous exit the incoming slide adopts the scene; on a real exit
// the field’s RAF loop and listeners die with the slide.
export function releaseHoursScene(container, continuous) {
  const scene = container && container.__hoursScene;
  if (!scene || continuous) return;
  scene.field.destroy();
  delete container.__hoursScene;
}

// Overlay handoff: the outgoing slide’s overlay fades out, the incoming one
// fades in over the persistent field. The removal timer belongs to the
// incoming (active) slide’s refs and is cleared in its onExit, so no timer
// survives navigation.
export function adoptOverlay(container, root, refs) {
  const old = Array.from(container.querySelectorAll('.s1q--overlay'))
    .filter((el) => el !== root);
  old.forEach((el) => { el.dataset.exiting = 'true'; });
  root.dataset.entering = 'true';
  requestAnimationFrame(() => requestAnimationFrame(() => {
    delete root.dataset.entering;
  }));
  refs.overlayCleanup = setTimeout(() => {
    old.forEach((el) => el.remove());
    refs.overlayCleanup = null;
  }, 600);
}

// Called from onExit (any kind): settles pending overlay cleanup
// synchronously so rapid navigation can never stack stale overlays.
export function finishOverlayCleanup(container, refs) {
  if (refs && refs.overlayCleanup) {
    clearTimeout(refs.overlayCleanup);
    refs.overlayCleanup = null;
  }
  if (!container) return;
  container.querySelectorAll('.s1q--overlay[data-exiting="true"]')
    .forEach((el) => el.remove());
}
