// The claim — rendered as the deck's luminous disc (R7.1 §2).
//
// Before R7.1 this was a faceted orange capsule with bevels, an inset and a
// highlight: a drawing that existed nowhere else in the deck, and that read as
// a token-shaped object rather than as *the* token. It is now literally 1.2's
// disc — same component, same gradient, same glow proportions — so that when
// 4.04 names the claim, the viewer recognizes the thing their eighty thousand
// hours became rather than being told about it.
//
// The state API is unchanged (visible / emphasis / redeemed) and so are the
// transition timings, because every slide's choreography is preserved
// motion-for-motion: only the skin moved.
//
// The root fills whatever box the slide positions it in and centers the disc,
// so a slide controls placement while the disc keeps its circular identity in
// a container of any aspect ratio.

import { LuminousDisc } from '../LuminousDisc.js';

export const CLAIM_DEFAULT_SIZE = 116;

export function ClaimObject({
  className = '',
  size = CLAIM_DEFAULT_SIZE,
  ariaLabel = 'An earned, transferable claim on value'
} = {}) {
  const el = document.createElement('div');
  el.className = `s4-claim-object ${className}`.trim();
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', ariaLabel);

  const disc = LuminousDisc({ size, className: 's4-claim-object__disc' });
  el.appendChild(disc);

  function applyState({ visible = false, emphasis = 'neutral', redeemed = false } = {}) {
    el.dataset.visible = String(visible);
    el.dataset.emphasis = emphasis;
    el.dataset.redeemed = String(redeemed);
  }

  // Scale is choreography on several slides (the claim released to center
  // stage at 4.04 b4, the small claims on the migration lanes), so the size is
  // addressable after construction.
  function setSize(px) {
    disc.style.setProperty('--disc-size', `${px}px`);
  }

  function destroy() {
    el.remove();
  }

  applyState();
  return { el, disc, applyState, setSize, destroy };
}

export default ClaimObject;
