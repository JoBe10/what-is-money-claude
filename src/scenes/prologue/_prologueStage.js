// The Prologue's shared machinery — P1 and P2 (Batch A).
//
// The two Prologue scenes are separate visual worlds (the title punchline and
// the mercy line are a cut, not a morph), so there is no shared stage object
// here. What they do share is three things, and each one is load-bearing:
//
//   · the rasterization contract, so a settled frame is the approved cell;
//   · `setVisible`, the deck's own data-attribute reveal;
//   · the form geometry, transcribed from the beat-state builders that
//     rendered the approved cells;
//   · the condensation's object, which since the restoration is the legacy
//     deck's own and carries no geometry here at all.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every coordinate below is transcribed from
// `review/prologue/harness/states.mjs` — the builders the presenter's approved
// cells were rendered from (states.json `approvedSet`, ruled 29 August 2026,
// amended 30 August 2026 by the condensation ruling and again by the
// restoration). Nothing settled in P1 or P2 exists outside an approved cell,
// and the landed-state proof checks it per pixel.
//
// Composition law, inherited: no accent color anywhere in the Prologue — orange
// enters at Scene 3's birth (master §8.5) — monochrome plus the dark-field
// renders' own photographic warmth, and the self-reference ban. The clause that
// once read "and no Claim Mark and no luminous disc" was struck on 30 August
// 2026 as over-extension: the record bans the *accent* in the Prologue, never
// the drawing (states report §12).

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

// ---- the condensation's object (p1-b3-token) --------------------------------
//
// PRESENTER-RULED 30 August 2026: the condensation is **PORT**. The legacy
// deck's absorption is the proven treatment, and the object is the legacy ball,
// verbatim — `1-02-the-conversion`'s token, which is the deck's own
// `.luminous-disc` positioned by `.s1q-token`
// (`src/slides/section-1-question/02-the-conversion.js`, lines 46–49).
//
// THERE IS NO GEOMETRY HERE, AND THAT IS THE POINT. 1.02 wrote two lines and let
// the classes carry everything: `.s1q-token` centres the object on the stage
// (left/top 50%, margin −88) and `.luminous-disc` draws it at 176 across with
// its glow radii as fractions of that diameter. A coordinate written here would
// be a re-authoring of a frame that was already solved, so none is. The two
// retired candidates — the granular mass and the white monochrome ball — kept
// their geometry in this file; the restoration needs none.
//
// The struck clause that forbade this object ("no Claim Mark anywhere",
// `docs/gate-2-close-and-prologue-states-brief.md` §3) is struck as
// over-extension. The law that stands is the accent's: orange enters the film
// at Scene 3's birth, and no accent color appears in the Prologue. The trail is
// `docs/gate-2-close-and-prologue-states-report.md` §12.

/** The condensation's landing — 1.02's token, ported verbatim. */
export function condensedBall() {
  const el = document.createElement('div');
  el.className = 'luminous-disc s1q-token';
  return el;
}
