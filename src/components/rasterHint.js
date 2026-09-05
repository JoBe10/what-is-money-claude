// The rasterization hint — one film-wide helper, because two acts need it.
//
// The approved beat-state cells are rasterized on an opaque black ground with
// subpixel text antialiasing. Inside the deck the canvas carries
// `will-change: transform` (globals.css), which forces it into a composited
// layer whose text drops to grayscale antialiasing — every glyph then differs
// from its cell by a color fringe, and the landed-state proof compares per
// pixel. The hint buys nothing while a scene is on stage: the letterbox
// transform only changes on resize. So a scene that must match its cell
// releases the hint for as long as it is mounted, and restores it on exit.
// This is the mechanism Prototype Gate 2 proved. It changes no engine file.
//
// WHY IT IS REFCOUNTED. The engine mounts the incoming slide *before* it calls
// the outgoing slide's `onExit` (SlideEngine `_render`: render → onEnter →
// crossfade → outgoing.onExit). A naive claim/release therefore has the
// outgoing scene switch the hint back on underneath the incoming scene that
// just claimed it — which is exactly what happened at the P1 → P2 and
// P2 → Scene 2 boundaries, where the shipped frame stopped matching its
// approved cell on the forward walk while every cold entry still passed. The
// count lives on the canvas element, so it is correct across scenes, across
// acts, and across a reload.

const KEY = '__rasterHintClaims';

/**
 * Release the deck canvas's layer hint for as long as this scene is mounted.
 * @param   {HTMLElement} container the scene's own container
 * @returns {HTMLElement|null} the token to pass back to `releaseRasterHint`
 */
export function claimRasterHint(container) {
  const canvas = container?.closest('.deck-canvas');
  if (!canvas) return null;
  canvas[KEY] = (canvas[KEY] || 0) + 1;
  canvas.style.willChange = 'auto';
  return canvas;
}

/** Give the hint back. The last claimant out restores it. */
export function releaseRasterHint(canvas) {
  if (!canvas) return;
  canvas[KEY] = Math.max(0, (canvas[KEY] || 1) - 1);
  if (canvas[KEY] === 0) canvas.style.willChange = '';
}
