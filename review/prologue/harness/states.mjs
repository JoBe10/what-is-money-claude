// Prologue — the beat-state sheet builders
// (docs/gate-2-close-and-prologue-states-brief.md §3).
//
// Every beat state of Scenes P1 and P2 as a full-size 1920×1080 still, under
// the full-coverage rule (docs/gate-2-states-brief.md header). Runs inside the
// deck page on the dev server: real assets through the dark-field register,
// the deck's real type, brightness rules applied — the same discipline as the
// approved frames (review/frames-a/harness/frames-a.mjs, whose geometry this
// file inherits verbatim wherever a state is a carried approval).
//
// THE BEAT COUNT IS THE SCRIPT'S: the §1 map says 10 beats (condensation into
// first form as one gesture) while the verbatim script carries 11 [→] marks —
// the condensation ("condenses into… this.") and the SHELL ("A shell.") each
// advance. Per the close brief, the sheet renders to the script's count and
// the discrepancy is flagged in the report. Cells: p1-b0 (the authored entry
// black) + p1-b1 … p1-b11; p2-b1 … p2-b2.
//
// Composition law: no accent color anywhere in the Prologue (orange enters at
// Scene 3's birth); no Claim Mark and no luminous disc anywhere (the disc is
// born in Scene 3 and nowhere earlier — the legacy 1.2 token does NOT return);
// the self-reference ban; P1's register is monochrome plus the dark-field
// renders' photographic warmth. Every cell is a frame that could ship.
//
// Determinism note: the condensed-mass and structured-light cells use a seeded
// LCG, never Math.random, so a re-render of those cells is pixel-stable. The
// hours field's own per-unit jitter (UnitField) is Math.random-based, which is
// one reason the four carried approvals ship as byte-copies of the approved
// PNGs rather than re-renders.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { UnitField } from '/src/components/UnitField.js';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'prologue-states-stage';

let cleanup = [];

function stage() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];

  const el = document.createElement('div');
  el.id = STAGE_ID;
  el.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
    'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.setAttribute('width', '1920');
  svg.setAttribute('height', '1080');
  svg.style.cssText = 'position:absolute; inset:0;';
  el.appendChild(svg);
  document.body.appendChild(el);
  return { el, svg };
}

function df(st, name, x, y, w, h, { alt = name, opacity = 1 } = {}) {
  const box = DarkFieldImage({ name, width: w, height: h, alt });
  box.el.dataset.visible = 'true';
  box.el.style.position = 'absolute';
  box.el.style.left = `${x}px`;
  box.el.style.top = `${y}px`;
  if (opacity !== 1) box.el.style.opacity = String(opacity);
  st.el.appendChild(box.el);
  return box;
}

function text(st, copy, styles) {
  const el = document.createElement('p');
  el.textContent = copy;
  el.style.cssText = 'position:absolute; margin:0; ' + styles;
  st.el.appendChild(el);
  return el;
}

// The hours field at a settled state (frames-a.mjs verbatim).
function hoursField(st, mode) {
  const field = UnitField({});
  field.el.style.position = 'absolute';
  field.el.style.inset = '0';
  st.el.appendChild(field.el);
  field.setState({ mode, progress: 1 });
  cleanup.push(() => field.destroy());
  return field;
}

// The deck's proven counter treatment (1.01 / s1q-hours__counter, the class
// P1-F1 was approved with — C2 is determined by it, no candidates).
function hoursCounter(st) {
  const counter = document.createElement('div');
  counter.className = 's1q-hours__counter';
  counter.dataset.visible = 'true';
  counter.textContent = '80,000';
  st.el.appendChild(counter);
  return counter;
}

// ---- the morph geometry ----------------------------------------------------
//
// P1-F2 (approved) fixes the form position: display scale, centered low —
// box center (960, 650), box height 540. Each form's box takes the aspect its
// render arrives in, which is what the framing rule needs to hold
// (src/dark-field.js): 4:3 renders in 720×540 boxes at (600, 380); the one
// 4:5 portrait (single_cowrie) in a 432×540 box at (744, 380); and — after the
// presenter's 29 August ruling that b7 is `ledger_glow` — the one 3:2 landscape
// in an 810×540 box at (555, 380). The height and centre are the rule's; only
// the width follows the render.
const FORM_CX = 960;
const FORM_CY = 650;

function formLandscape(st, name, alt) {
  return df(st, name, FORM_CX - 360, FORM_CY - 270, 720, 540, { alt });
}
function formPortrait(st, name, alt) {
  return df(st, name, FORM_CX - 216, FORM_CY - 270, 432, 540, { alt });
}
function formThreeTwo(st, name, alt) {
  return df(st, name, FORM_CX - 405, FORM_CY - 270, 810, 540, { alt });
}

// ---- seeded randomness (deterministic renders) -----------------------------

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

// The condensation's settled landing: the field's 80,000 points of light
// gathered into one dense mass at the forms' center. It is a MASS, not an
// object — deliberately not a disc (the luminous disc is born in Scene 3) and
// not any named form (the shell is the next advance's reveal). Density and
// brightness fall off radially; a few units glint bright, as in the field.
function condensedMass(st) {
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
    unitRect(st.svg, x, y, UNIT_WARM, alpha);
  }
  // The halo: sparse strays still arriving at the mass's edge.
  for (let i = 0; i < 90; i += 1) {
    const a = rand() * Math.PI * 2;
    const r = CORE_R + Math.pow(rand(), 1.6) * 66;
    const x = cx + Math.cos(a) * r;
    const y = cy + Math.sin(a) * r * 0.92;
    unitRect(st.svg, x, y, UNIT_WARM, 0.05 + rand() * 0.14);
  }
  // The glints.
  for (let i = 0; i < 26; i += 1) {
    const a = rand() * Math.PI * 2;
    const r = CORE_R * 0.85 * Math.pow(rand(), 0.6);
    unitRect(st.svg, cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.92,
      UNIT_WARM_BRIGHT, 0.72 + rand() * 0.2);
  }
}

// THE CONDENSATION'S OBJECT (presenter-ruled 30 August 2026, letter B): a
// smooth luminous ball that is deliberately NOT the Claim Mark. The drawing
// lives in exactly one place — the `.p1-ball` class in src/styles/slides.css,
// which states its parameters *against* the disc's — so the cell and the scene
// cannot drift into two objects that merely resemble each other.
//
// The geometry is the REOPENED CELL'S OWN: the retired mass's core radius was
// 148 at (FORM_CX, FORM_CY), so the ball is 296 across at that same centre.
// Nothing here is chosen — the ruling said "sized per the reopened cell's box,"
// and this is that box.
export const BALL_SIZE = 296;

function condensedBall(st) {
  const el = document.createElement('div');
  el.className = 'p1-ball';
  el.dataset.visible = 'true';
  el.style.position = 'absolute';
  el.style.left = `${FORM_CX - BALL_SIZE / 2}px`;
  el.style.top = `${FORM_CY - BALL_SIZE / 2}px`;
  el.style.setProperty('--ball-size', `${BALL_SIZE}px`);
  st.el.appendChild(el);
  return el;
}

// C1-B — the fifth form refusing to condense into an object: the material
// resolved into STRUCTURED light. The same units, no longer scattered and no
// longer massed — held in exact order, an authored lattice at the forms'
// center, its edges dissolving back into the dark. Composed entirely from the
// film's existing vocabulary (the unit grammar's rects, the unit-warm
// luminance family); no disc, no symbol, no accent, nothing of the Claim Mark.
function structuredLight(st) {
  const rand = lcg(0xB17C01);
  const COLS = 29;
  const ROWS = 19;
  const PITCH = 23;
  const x0 = FORM_CX - ((COLS - 1) * PITCH) / 2;
  const y0 = FORM_CY - ((ROWS - 1) * PITCH) / 2;
  const maxD = Math.hypot((COLS - 1) / 2, ((ROWS - 1) / 2) * 1.3);
  for (let c = 0; c < COLS; c += 1) {
    for (let r = 0; r < ROWS; r += 1) {
      const dx = c - (COLS - 1) / 2;
      const dy = (r - (ROWS - 1) / 2) * 1.3; // elliptical falloff, wider than tall
      const d = Math.hypot(dx, dy) / maxD;
      // The dissolution: the lattice is certain at center, and units thin out
      // toward the edge — the form never closes into an outline.
      const survive = d < 0.56 ? 1 : Math.max(0, 1 - (d - 0.56) / 0.4);
      if (rand() > survive) continue;
      const falloff = Math.max(0.2, 1 - Math.pow(d, 2.1) * 0.62);
      const alpha = (0.68 + rand() * 0.28) * falloff;
      unitRect(st.svg, x0 + c * PITCH, y0 + r * PITCH, UNIT_WARM, alpha, 1.45);
    }
  }
  // Glints inside the certain zone — the lattice alive, not etched.
  for (let i = 0; i < 22; i += 1) {
    const c = Math.floor(rand() * COLS);
    const r = Math.floor(rand() * ROWS);
    const dx = c - (COLS - 1) / 2;
    const dy = (r - (ROWS - 1) / 2) * 1.3;
    if (Math.hypot(dx, dy) / maxD > 0.5) continue;
    unitRect(st.svg, x0 + c * PITCH, y0 + r * PITCH, UNIT_WARM_BRIGHT, 0.95, 1.45);
  }
}

// ---- the line registers ----------------------------------------------------

// The stakes register (s1q-stakes__line, the class p2-f1-plain was approved
// with): 50px/540, centered on the stage's middle.
function stakesLine(st, copy) {
  return text(st, copy,
    'left:280px; right:280px; top:50%; transform:translateY(-50%); text-align:center;' +
    'font-size:50px; font-weight:540; line-height:1.45; letter-spacing:-0.012em; color:#fff;');
}

// The question register (s1q-what__question, the deck's proven big-question
// typography from 1.03): 64px/560.
function questionLine(st, copy) {
  return text(st, copy,
    'left:240px; right:240px; top:506px; text-align:center;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;');
}

// The mercy line — frames-a.mjs `p2-f1-plain` verbatim (the deck's own class).
function mercyLine(st) {
  const line = document.createElement('p');
  line.className = 's1q-stakes__line';
  line.dataset.visible = 'true';
  line.textContent = 'If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do.';
  st.el.appendChild(line);
  return line;
}

// ---- the cells -------------------------------------------------------------

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

// ======== SCENE P1 — Eighty Thousand Hours / What Is Money? ========

cell('p1-b0', {
  beat: 'P1 entry', status: 'determined', decision: null,
  caption: 'Entry · the authored black hold — “Let me start with a number.” is spoken over darkness before the first advance. Rendered as its own cell per the full-coverage rule'
}, () => { /* the stage itself is the frame: pure black */ });

cell('p1-b1', {
  beat: 'P1 beat 1', status: 'determined', decision: null,
  caption: 'Beat 1 · the field complete, the counter at 80,000 — the deck’s proven treatment (1.01 build 1 reconstructed: s1q-hours__counter over the steady field). C2 is determined by P1-F1’s approved counter — no candidates'
}, (st) => {
  hoursField(st, 'steady');
  hoursCounter(st);
});

cell('p1-b2', {
  beat: 'P1 beat 2', status: 'carried', carriedFrom: 'p1-f1', decision: null,
  caption: 'Beat 2 · CARRIED (p1-f1, byte-identical) — the hours line lands over the completed field and counter. Approved as rendered 25 Aug 2026; inputs unchanged, so the approved pixels ship'
}, (st) => {
  // The builder reproduces p1-f1 (frames-a.mjs verbatim) for future context
  // re-renders; the shipped cell is the approved PNG's bytes.
  hoursField(st, 'steady');
  hoursCounter(st);
  const line = document.createElement('p');
  line.className = 's1q-hours__line';
  line.dataset.visible = 'true';
  line.textContent = 'This is how many hours of your life you will spend working.';
  st.el.appendChild(line);
});

cell('p1-b3', {
  beat: 'P1 beat 3', status: 'determined', decision: null,
  caption: 'Beat 3 · the condensation’s settled landing — “condenses into… this.”: the field’s own points of light gathered into one dense mass at the forms’ center. A mass, deliberately not a disc (the disc is born in Scene 3) and not yet any form (the shell is the next advance’s reveal)'
}, (st) => {
  condensedMass(st);
});

cell('p1-b3-ball', {
  beat: 'P1 beat 3', status: 'approved', decision: null,
  caption: 'Beat 3 · APPROVED BY RULING (30 Aug 2026, letter B) — the condensation’s landing is a smooth luminous ball, deliberately NOT the Claim Mark: achromatic white where the disc is warm and ends in the accent, with a halo a little over half the disc’s radius and about two thirds its strength. 296 across at the forms’ centre — the reopened cell’s own box. Replaces the retired p1-b3'
}, (st) => {
  condensedBall(st);
});

cell('p1-b4', {
  beat: 'P1 beat 4', status: 'determined', decision: null,
  caption: 'Beat 4 · SHELL — single_cowrie per the recorded assignment (manifest §2.2: P1 morph, centre scale). 4:5 box at the forms’ center, P1-F2’s scale'
}, (st) => {
  formPortrait(st, 'single_cowrie', 'A single cowrie shell emerging from darkness');
});

cell('p1-b5', {
  beat: 'P1 beat 5', status: 'carried', carriedFrom: 'p1-f2', decision: null,
  caption: 'Beat 5 · GOLD · CARRIED (p1-f2, byte-identical) — the condensed mass as the gold form, display scale, centered low. Approved as rendered 25 Aug 2026'
}, (st) => {
  formLandscape(st, 'gold', 'A gold bar emerging from darkness');
});

cell('p1-b6', {
  beat: 'P1 beat 6', status: 'determined', decision: null,
  caption: 'Beat 6 · PAPER — paper per the recorded assignment (manifest §2.2: P1 morph’s paper form). “Paper, and a promise.”'
}, (st) => {
  formLandscape(st, 'paper', 'A paper note emerging from darkness');
});

cell('p1-b7', {
  beat: 'P1 beat 7', status: 'determined', decision: null,
  caption: 'Beat 7 · LEDGER — ledger per the recorded assignment row (manifest §2.2: ledger serves display-scale ledger appearances; ledger_glow is Scene 8’s). FLAGGED in the report: the architecture’s P1 summary says “glowing ledger entry” — his verdict on this cell settles which study the beat gets'
}, (st) => {
  formLandscape(st, 'ledger', 'A bank ledger emerging from darkness');
});

cell('p1-b7-glow', {
  beat: 'P1 beat 7', status: 'approved', decision: null,
  caption: 'Beat 7 · LEDGER · APPROVED BY RULING (29 Aug 2026) — ledger_glow, the glowing entry, per the presenter’s ruling on the flagged cell: the script’s line is “it stopped looking like anything at all. Numbers in a ledger,” and the architecture’s P1 summary says “glowing ledger entry.” The register’s one 3:2 render, so the form box takes its aspect at the recorded height and centre (810×540 at 555, 380). Replaces the retired p1-b7, which stays on file'
}, (st) => {
  formThreeTwo(st, 'ledger_glow', 'A glowing ledger entry emerging from darkness');
});

cell('p1-b8-a', {
  beat: 'P1 beat 8', status: 'candidate', decision: 'C1',
  caption: 'Beat 8 · C1-A — BITCOIN as the library’s coin render: visually continuous with the four physical forms before it. The manifest flags exactly this (V-1): the render asserts a physical object the film argues bitcoin does not have'
}, (st) => {
  formLandscape(st, 'bitcoin', 'A bitcoin coin emerging from darkness');
});

cell('p1-b8-b', {
  beat: 'P1 beat 8', status: 'candidate', decision: 'C1',
  caption: 'Beat 8 · C1-B — BITCOIN as the form refusing to condense into an object: the material resolved into structured light — the field’s own units held in exact order, edges dissolving into the dark. Composed from the film’s existing vocabulary (the unit grammar, the unit-warm family); no disc, no symbol, no Claim Mark anticipation'
}, (st) => {
  structuredLight(st);
});

cell('p1-b9', {
  beat: 'P1 beat 9', status: 'determined', decision: null,
  caption: 'Beat 9 · the forms line — “The forms could hardly be more different.” at the stakes register, alone. The morph layer hands the frame off fully (recorded handoff — the spoken line speaks of all five forms, and holding only the last would misweight it; the sequenced-lines precedent is 1.02’s)'
}, (st) => {
  stakesLine(st, 'The forms could hardly be more different.');
});

cell('p1-b10', {
  beat: 'P1 beat 10', status: 'determined', decision: null,
  caption: 'Beat 10 · the question line — “So what is the thing that stays the same?” at the deck’s proven big-question register (1.03’s s1q-what__question treatment), alone; the forms line clears (sequenced, never stacked)'
}, (st) => {
  questionLine(st, 'So what is the thing that stays the same?');
});

cell('p1-b11', {
  beat: 'P1 beat 11', status: 'carried', carriedFrom: 'p1-f3', decision: null,
  caption: 'Beat 11 · TITLE · CARRIED (p1-f3, byte-identical) — WHAT IS MONEY? lands as the punchline on cleared black, the deck’s proven title treatment. Approved as rendered 25 Aug 2026'
}, (st) => {
  const title = document.createElement('h1');
  title.className = 's1q-what__title';
  title.dataset.visible = 'true';
  title.textContent = 'WHAT IS MONEY?';
  st.el.appendChild(title);
});

// ======== SCENE P2 — The Stakes ========

cell('p2-b1', {
  beat: 'P2 beat 1', status: 'carried', carriedFrom: 'p2-f1-plain', decision: null,
  caption: 'Beat 1 · CARRIED (p2-f1-plain, byte-identical) — the mercy line alone on black; the hours-field ghost was retired by ruling 4 of 25 Aug 2026'
}, (st) => {
  mercyLine(st);
});

cell('p2-b2', {
  beat: 'P2 beat 2', status: 'determined', decision: null,
  caption: 'Beat 2 · the spoken promise — the screen holds (§1 map: “spoken promise + handoff (screen holds)”; the architecture: no agenda, no map on screen — the waypoint device is retired). Identical to beat 1 by design, rendered as its own cell per the full-coverage rule (the s3-b8 precedent)'
}, (st) => {
  mercyLine(st);
});

// ---- runtime ---------------------------------------------------------------

export const CELL_IDS = Object.keys(CELLS);

export function buildCell(id) {
  const c = CELLS[id];
  if (!c) throw new Error(`no cell builder for "${id}"`);
  const st = stage();
  c.build(st);
  return id;
}

export function cellMeta() {
  return Object.fromEntries(CELL_IDS.map((id) => {
    const { build, ...meta } = CELLS[id];
    return [id, meta];
  }));
}

export function teardown() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
}

export default buildCell;
