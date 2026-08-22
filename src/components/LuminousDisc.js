// The luminous disc — the deck's one render of stored value.
//
// It is born in 1.2, where eighty thousand hours collapse into a single
// unmarked token, and it is the same object every time it appears afterward:
// 1.3's small token, and — since R7.1 §2 — every claim in Section 4. That is
// the deck's central rhyme made literal rather than merely alluded to. When
// 4.04 says "that's what you've been holding all along," the viewer is looking
// at the identical drawing they watched their life's work become twenty
// minutes earlier, and the recognition happens on screen instead of in the
// script.
//
// One render path, one set of proportions. Size is the only parameter: the
// glow radii are fractions of the diameter (`--disc-size`), so a 56px claim on
// a comparison row and the 176px token at the conversion are the same object
// seen at different distances, never two drawings that resemble each other.
//
// Deliberately unmarked: no symbol, no currency sign, no bitcoin mark. The
// token's anonymity is load-bearing in Section 1 (neutrality before the
// argument) and in Section 4 (the claim is not any particular money).

export const DISC_DEFAULT_SIZE = 176;

export function LuminousDisc({
  size = DISC_DEFAULT_SIZE,
  className = '',
  element = 'div'
} = {}) {
  const el = document.createElement(element);
  el.className = `luminous-disc ${className}`.trim();
  el.style.setProperty('--disc-size', `${size}px`);
  return el;
}

// Applies the disc's identity to an element that already exists — used where a
// slide owns the element's positioning and lifecycle but wants this render.
export function applyDiscIdentity(el, size = DISC_DEFAULT_SIZE) {
  el.classList.add('luminous-disc');
  el.style.setProperty('--disc-size', `${size}px`);
  return el;
}

export default LuminousDisc;
