// Prototype Gate 1 — the Claim Mark candidates (docs/batch-a-package.md §4).
//
// The film's only recurring protagonist, three candidate forms behind one API,
// exactly as the aesthetic law requires (AGENTS.md §4.3): every candidate stays
// on file, the presenter selects from the contact sheet, and the selection is
// recorded here as one letter. Until the gate rules, SELECTION is null and
// nothing ships — the style frames render every candidate side by side.
//
//   A — the current ClaimObject render: the deck's luminous disc, verbatim.
//       Same class, same gradient, same glow proportions as 1.2's token.
//   B — the blueprint's billet: a flatter elongated form, 2.8:1, chamfered
//       ends, a thin bright top edge catching the key light, no symbol.
//   C — an ultra-minimal flat hexagon: one flat-shaded field, flat-top,
//       no gradient, no edge light, the most restrained reading of "token."
//
// One size parameter, like LuminousDisc. `size` is the optical diameter: each
// candidate is area-matched to a disc of that diameter, so the three forms
// carry the same visual mass at the same nominal scale and the sheet compares
// *form*, never weight. (B: h = 0.53·size, w = 2.8·h ≈ 1.48·size.
// C: across-corners ≈ 1.04·size.)
//
// The material is the disc's own palette — the warm neutrals blended toward
// the accent — because the accent's entry point is the Claim Mark's birth
// (master §8.5, ruled 25 August 2026), and all three candidates must speak it
// identically for the comparison to be fair.

import { LuminousDisc } from '../components/LuminousDisc.js';

export const CLAIM_MARK_CANDIDATES = ['a', 'b', 'c'];

// Ruled at Prototype Gate 1 by the presenter; null until then.
export const CLAIM_MARK_SELECTION = null;

const f = (v) => Number(v.toFixed(2));

// SVG ids are document-global; a sheet renders dozens of billets.
let billetSeq = 0;

// B — the billet. Chamfer runs at 45° on all four corners of the short ends;
// the bright edge is the top facet only, the way a machined billet catches a
// single key from above.
function billet(size) {
  const gradId = `claim-billet-face-${billetSeq += 1}`;
  const h = f(size * 0.53);
  const w = f(h * 2.8);
  const c = f(h * 0.18);
  const el = document.createElement('div');
  el.className = 'claim-mark__billet';
  el.style.cssText = `width:${w}px; height:${h}px; filter:` +
    `drop-shadow(0 0 ${f(size * 0.14)}px rgba(253, 233, 212, 0.30)) ` +
    `drop-shadow(0 0 ${f(size * 0.4)}px rgba(253, 233, 212, 0.16));`;
  // The face is graded deeper than the disc — light entering at the top edge
  // and falling toward the accent — so the thin bright edge has something to
  // read against; a face as bright as the disc's swallowed it.
  el.innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block" aria-hidden="true">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--unit-warm-bright)" />
          <stop offset="0.16" stop-color="var(--unit-warm)" />
          <stop offset="1" stop-color="color-mix(in srgb, var(--unit-warm) 62%, var(--accent) 38%)" />
        </linearGradient>
      </defs>
      <path d="M ${c} 0 L ${f(w - c)} 0 L ${w} ${c} L ${w} ${f(h - c)} L ${f(w - c)} ${h} L ${c} ${h} L 0 ${f(h - c)} L 0 ${c} Z"
            fill="url(#${gradId})" />
      <path d="M ${f(c + 1)} 1 L ${f(w - c - 1)} 1" stroke="rgba(255, 250, 240, 0.95)"
            stroke-width="1.4" stroke-linecap="round" fill="none" />
      <path d="M ${f(c + 0.6)} 1.2 L 0.8 ${f(c + 0.8)} M ${f(w - c - 0.6)} 1.2 L ${f(w - 0.8)} ${f(c + 0.8)}"
            stroke="rgba(255, 250, 240, 0.4)" stroke-width="1.1" stroke-linecap="round" fill="none" />
    </svg>`;
  return el;
}

// C — the hexagon. Flat-top, one flat field, no gradient, no edge light; the
// restrained glow exists only so a flat shape separates from a pure black
// stage at all.
function hexagon(size) {
  const D = f(size * 1.04);          // across corners (horizontal)
  const H = f(D * 0.866);            // across flats (vertical)
  const el = document.createElement('div');
  el.className = 'claim-mark__hex';
  el.style.cssText = `width:${D}px; height:${H}px; ` +
    `filter: drop-shadow(0 0 ${f(size * 0.09)}px rgba(253, 233, 212, 0.2));`;
  const x1 = 0;
  const x2 = f(D * 0.25);
  const x3 = f(D * 0.75);
  const x4 = D;
  el.innerHTML = `
    <svg viewBox="0 0 ${D} ${H}" width="${D}" height="${H}" style="display:block" aria-hidden="true">
      <path d="M ${x2} 0 L ${x3} 0 L ${x4} ${f(H / 2)} L ${x3} ${H} L ${x2} ${H} L ${x1} ${f(H / 2)} Z"
            fill="color-mix(in srgb, var(--unit-warm) 88%, var(--accent) 12%)" />
    </svg>`;
  return el;
}

/**
 * One Claim Mark, in a chosen candidate form.
 *
 * @param {string} candidate 'a' | 'b' | 'c'
 * @param {number} size      optical diameter on the 1920×1080 stage
 */
export function ClaimMark({ candidate = 'a', size = 116, className = '' } = {}) {
  const el = document.createElement('div');
  el.className = `claim-mark ${className}`.trim();
  el.dataset.candidate = candidate;
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', 'An earned, transferable claim on value');
  el.style.cssText = 'display:inline-grid; place-items:center;';

  if (candidate === 'b') el.appendChild(billet(size));
  else if (candidate === 'c') el.appendChild(hexagon(size));
  else el.appendChild(LuminousDisc({ size }));

  return el;
}

/** The candidate's rendered footprint at a nominal size — the sheet and the
 *  frames use this to place surrounding geometry (paths, shells, lanes). */
export function claimMarkExtent(candidate, size) {
  if (candidate === 'b') {
    const h = size * 0.53;
    return { w: h * 2.8, h };
  }
  if (candidate === 'c') {
    const D = size * 1.04;
    return { w: D, h: D * 0.866 };
  }
  return { w: size, h: size };
}

export default ClaimMark;
