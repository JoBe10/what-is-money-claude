// The Prologue's shared machinery — P1 and P2 (Batch A).
//
// The two Prologue scenes are separate visual worlds (the title punchline and
// the mercy line are a cut, not a morph), so there is no shared stage object
// here. What they do share is three things, and each one is load-bearing:
//
//   · the rasterization contract, so a settled frame is the approved cell;
//   · `setVisible`, the deck's own data-attribute reveal;
//   · the form geometry and the condensed mass, transcribed from the beat-state
//     builders that rendered the approved cells.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every coordinate below is transcribed from
// `review/prologue/harness/states.mjs` — the builders the presenter's approved
// cells were rendered from (states.json `approvedSet`, ruled 29 August 2026).
// Nothing settled in P1 or P2 exists outside an approved cell, and the
// landed-state proof checks it per pixel.
//
// Composition law, inherited: no accent color anywhere in the Prologue (orange
// enters at Scene 3's birth), no Claim Mark and no luminous disc, monochrome
// plus the dark-field renders' own photographic warmth, and the self-reference
// ban.

import { DarkFieldImage } from '../../components/DarkField.js';

const svgNS = 'http://www.w3.org/2000/svg';

export function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

// ---- the rasterization contract ---------------------------------------------
//
// Half of it is the shared `rasterHint` helper, re-exported here so a Prologue
// scene has one import; the other half is the scene root's own opaque black
// (`.s1q`). Both are needed for a settled frame to rasterize the way the
// approved cell did.

export { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';

// ---- the morph's form boxes -------------------------------------------------
//
// P1-F2 (approved) fixes the form position: display scale, centered low — box
// center (960, 650), box height 540. Each form's box takes the aspect its
// render arrives in, which is what the framing rule needs to hold
// (`src/dark-field.js`): the 4:3 renders in 720×540 boxes at (600, 380), the
// 4:5 portrait in a 432×540 box at (744, 380), and the one 3:2 landscape —
// `ledger_glow`, the presenter's 29 August ruling for beat 7 — in an 810×540
// box at (555, 380).

export const FORM_CX = 960;
export const FORM_CY = 650;

const BOX = {
  landscape: [720, 540],
  portrait: [432, 540],
  threeTwo: [810, 540]
};

/** The five forms of P1's morph, in order — each an approved cell's subject. */
export const FORMS = [
  { key: 'single_cowrie', box: 'portrait', alt: 'A single cowrie shell emerging from darkness' },
  { key: 'gold', box: 'landscape', alt: 'A gold bar emerging from darkness' },
  { key: 'paper', box: 'landscape', alt: 'A paper note emerging from darkness' },
  { key: 'ledger_glow', box: 'threeTwo', alt: 'A glowing ledger entry emerging from darkness' },
  { key: 'bitcoin', box: 'landscape', alt: 'A bitcoin coin emerging from darkness' }
];

/** One form, positioned exactly as its cell places it. */
export function formBox({ key, box, alt }) {
  const [w, h] = BOX[box];
  const df = DarkFieldImage({ name: key, width: w, height: h, alt });
  df.el.classList.add('p1-form');
  df.el.style.position = 'absolute';
  df.el.style.left = `${FORM_CX - w / 2}px`;
  df.el.style.top = `${FORM_CY - h / 2}px`;
  return df.el;
}

// ---- the condensed mass (p1-b3) ---------------------------------------------
//
// Transcribed verbatim from the cell builder, seed included: a deterministic
// LCG rather than Math.random, so the drawing is the cell's drawing.

function lcg(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// The unit rect — the hours field's own unit, at its painted proportions
// (UNIT_GRAMMAR: pitch 4.58, fill fractions ≈ 0.82/0.74 → ≈ 3.8 × 3.4).
function unitRect(svg, x, y, color, alpha, scale = 1) {
  const w = 3.8 * scale;
  const h = 3.4 * scale;
  const r = document.createElementNS(svgNS, 'rect');
  r.setAttribute('x', (x - w / 2).toFixed(2));
  r.setAttribute('y', (y - h / 2).toFixed(2));
  r.setAttribute('width', w.toFixed(2));
  r.setAttribute('height', h.toFixed(2));
  r.setAttribute('fill', color);
  r.setAttribute('fill-opacity', alpha.toFixed(3));
  svg.appendChild(r);
  return r;
}

const UNIT_WARM = '#FDE9D4';        // --unit-warm (globals.css)
const UNIT_WARM_BRIGHT = '#FEF4E8'; // --unit-warm-bright

/**
 * The condensation's settled landing: the field's 80,000 points of light
 * gathered into one dense mass at the forms' center. It is a MASS, not an
 * object — deliberately not a disc (the disc is born in Scene 3) and not any
 * named form (the shell is the next advance's reveal). Density and brightness
 * fall off radially; a few units glint bright, as in the field.
 */
export function condensedMass(svg) {
  const rand = lcg(0x80000);
  const cx = FORM_CX;
  const cy = FORM_CY;
  const CORE_R = 148;
  // The core: dense center, thinning toward the rim.
  for (let i = 0; i < 980; i += 1) {
    const a = rand() * Math.PI * 2;
    const r = CORE_R * Math.pow(rand(), 0.58);
    const x = cx + Math.cos(a) * r * (0.98 + rand() * 0.04);
    const y = cy + Math.sin(a) * r * 0.92; // slightly held, a settled mass
    const falloff = 1 - 0.4 * Math.pow(r / CORE_R, 2);
    const alpha = (0.3 + rand() * 0.42) * falloff;
    unitRect(svg, x, y, UNIT_WARM, alpha);
  }
  // The halo: sparse strays still arriving at the mass's edge.
  for (let i = 0; i < 90; i += 1) {
    const a = rand() * Math.PI * 2;
    const r = CORE_R + Math.pow(rand(), 1.6) * 66;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.92;
    unitRect(svg, x, y, UNIT_WARM, 0.05 + rand() * 0.14);
  }
  // The glints.
  for (let i = 0; i < 26; i += 1) {
    const a = rand() * Math.PI * 2;
    const r = CORE_R * 0.85 * Math.pow(rand(), 0.6);
    unitRect(svg, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.92,
      UNIT_WARM_BRIGHT, 0.72 + rand() * 0.2);
  }
}

/** The mass's own layer — the cell's stage svg, at the cell's own attributes. */
export function massLayer() {
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.setAttribute('width', '1920');
  svg.setAttribute('height', '1080');
  svg.style.cssText = 'position:absolute; inset:0;';
  svg.classList.add('p1-mass');
  condensedMass(svg);
  return svg;
}
