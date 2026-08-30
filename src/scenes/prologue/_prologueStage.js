// The Prologue's shared machinery — P1 and P2 (Batch A).
//
// The two Prologue scenes are separate visual worlds (the title punchline and
// the mercy line are a cut, not a morph), so there is no shared stage object
// here. What they do share is three things, and each one is load-bearing:
//
//   · the rasterization contract, so a settled frame is the approved cell;
//   · `setVisible`, the deck's own data-attribute reveal;
//   · the form geometry and the condensation's object, transcribed from the
//     beat-state builders that rendered the approved cells.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every coordinate below is transcribed from
// `review/prologue/harness/states.mjs` — the builders the presenter's approved
// cells were rendered from (states.json `approvedSet`, ruled 29 August 2026 and
// amended 30 August 2026 by the condensation ruling).
// Nothing settled in P1 or P2 exists outside an approved cell, and the
// landed-state proof checks it per pixel.
//
// Composition law, inherited: no accent color anywhere in the Prologue (orange
// enters at Scene 3's birth), no Claim Mark and no luminous disc, monochrome
// plus the dark-field renders' own photographic warmth, and the self-reference
// ban.

import { DarkFieldImage } from '../../components/DarkField.js';

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

// ---- the condensation's object (p1-b3-ball) ---------------------------------
//
// PRESENTER-RULED 30 August 2026, letter B: the condensation lands on a smooth
// luminous ball that is deliberately NOT the Claim Mark. The drawing lives in
// exactly one place — the `.p1-ball` class in `src/styles/slides.css`, which
// states its parameters against the disc's — so the cell and the scene cannot
// drift into two objects that merely resemble each other.
//
// The geometry is the reopened cell's own: the retired granular mass had a core
// radius of 148 at the forms' centre, so the ball is 296 across at that centre.
// The retired drawing is not here — it stays on file in the states builders and
// in its archived cell, which is where a retired candidate belongs.

export const BALL_SIZE = 296;

/** The condensation's landing, at the reopened cell's own size and centre. */
export function condensedBall() {
  const el = document.createElement('div');
  el.className = 'p1-ball';
  el.style.position = 'absolute';
  el.style.left = `${FORM_CX - BALL_SIZE / 2}px`;
  el.style.top = `${FORM_CY - BALL_SIZE / 2}px`;
  el.style.setProperty('--ball-size', `${BALL_SIZE}px`);
  return el;
}
