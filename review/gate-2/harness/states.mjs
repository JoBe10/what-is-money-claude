// Gate 2 — the beat-state sheet builders (docs/gate-2-states-brief.md §2–§3).
//
// Every beat state of Scenes 2–4 as a full-size 1920×1080 still, with labeled
// candidates at every open decision (the D-list). Runs inside the deck page on
// the dev server: real assets through the dark-field register, real type,
// brightness rules applied — the same discipline that rendered the approved
// frames (review/frames-a/harness/frames-a.mjs, whose geometry this file
// inherits verbatim wherever a state is a carried approval).
//
// Composition law for every cell is the brief's §4: one idea per frame, the
// two-element budget, brightness floors, the display rule, settle budgets,
// no accent in any S2 cell, the patient photographic everywhere. Where a cell
// departs from a floor (the D4 full handoffs, system B's dormant road), the
// departure is the candidate's stated design, recorded in its caption.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { ClaimMark, CLAIM_MARK_SELECTION } from '/src/proto/claim-mark.js';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'gate2-states-stage';
let gradSeq = 0;

function stage() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
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

function seg(svg, x1, y1, x2, y2, opacity = 0.35, width = 1.5) {
  const p = document.createElementNS(svgNS, 'line');
  p.setAttribute('x1', x1); p.setAttribute('y1', y1);
  p.setAttribute('x2', x2); p.setAttribute('y2', y2);
  p.setAttribute('stroke', `rgba(255,255,255,${opacity})`);
  p.setAttribute('stroke-width', width);
  p.setAttribute('stroke-linecap', 'round');
  svg.appendChild(p);
  return p;
}

// A stroke fading to nothing from (x1,y1) toward (x2,y2).
function fadeSeg(svg, x1, y1, x2, y2, opacity = 0.35, width = 1.5) {
  const id = `st-fade-${gradSeq += 1}`;
  const defs = document.createElementNS(svgNS, 'defs');
  defs.innerHTML = `<linearGradient id="${id}" gradientUnits="userSpaceOnUse"
      x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">
    <stop offset="0" stop-color="rgba(255,255,255,${opacity})" />
    <stop offset="1" stop-color="rgba(255,255,255,0)" />
  </linearGradient>`;
  svg.appendChild(defs);
  const p = document.createElementNS(svgNS, 'line');
  p.setAttribute('x1', x1); p.setAttribute('y1', y1);
  p.setAttribute('x2', x2); p.setAttribute('y2', y2);
  p.setAttribute('stroke', `url(#${id})`);
  p.setAttribute('stroke-width', width);
  p.setAttribute('stroke-linecap', 'round');
  svg.appendChild(p);
  return p;
}

function path(svg, d, opacity = 0.3, width = 1.5) {
  const p = document.createElementNS(svgNS, 'path');
  p.setAttribute('d', d);
  p.setAttribute('fill', 'none');
  p.setAttribute('stroke', `rgba(255,255,255,${opacity})`);
  p.setAttribute('stroke-width', width);
  p.setAttribute('stroke-linecap', 'round');
  p.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(p);
  return p;
}

function dot(svg, x, y, r = 3, opacity = 0.6) {
  const c = document.createElementNS(svgNS, 'circle');
  c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
  c.setAttribute('fill', `rgba(255,255,255,${opacity})`);
  svg.appendChild(c);
  return c;
}

function df(st, name, x, y, w, h, { alt = name, opacity = 1, imgTransform = null } = {}) {
  const box = DarkFieldImage({ name, width: w, height: h, alt });
  box.el.dataset.visible = 'true';
  box.el.style.position = 'absolute';
  box.el.style.left = `${x}px`;
  box.el.style.top = `${y}px`;
  if (opacity !== 1) box.el.style.opacity = String(opacity);
  if (imgTransform) {
    const img = box.el.querySelector('img');
    if (img) img.style.transform += ` ${imgTransform}`;
  }
  st.el.appendChild(box.el);
  return box;
}

function mark(st, cx, cy, size = 116, opacity = 1) {
  const m = ClaimMark({ candidate: CLAIM_MARK_SELECTION, size });
  m.style.position = 'absolute';
  m.style.left = `${cx}px`;
  m.style.top = `${cy}px`;
  m.style.transform = 'translate(-50%, -50%)';
  if (opacity !== 1) m.style.opacity = String(opacity);
  st.el.appendChild(m);
  return m;
}

function text(st, copy, styles) {
  const el = document.createElement('p');
  el.textContent = copy;
  el.style.cssText = 'position:absolute; margin:0; ' + styles;
  st.el.appendChild(el);
  return el;
}

// The statement register (s4-f2-a's): 46px/540, centered.
function statement(st, copy, y, color = '#fff') {
  return text(st, copy,
    `left:0; right:0; top:${y}px; text-align:center; font-size:46px; font-weight:540;` +
    `letter-spacing:-0.012em; color:${color};`);
}

// The kicker register (s4-f1's): 20px/500, wide-tracked, centered on cx.
function kicker(st, copy, cx, y, opacity = 1) {
  const el = text(st, copy,
    `left:${cx}px; top:${y}px; font-size:20px; font-weight:500;` +
    'letter-spacing:0.32em; text-indent:0.32em; color:rgba(255,255,255,0.5);' +
    `text-transform:uppercase; transform:translateX(-50%); opacity:${opacity};`);
  return el;
}

// The interval label register (s3-f2-a's): 46px/560, letterspaced uppercase.
function intervalLabel(st, copy, x, y, opacity) {
  return text(st, copy,
    `left:${x}px; top:${y}px; font-size:46px; font-weight:560; letter-spacing:0.12em;` +
    `color:rgba(255,255,255,${opacity}); text-transform:uppercase; transform:translateY(-50%);`);
}

// System B's interval register: display scale, stepping into the dark.
function staircaseLabel(st, copy, x, y, opacity) {
  return text(st, copy,
    `left:${x}px; top:${y}px; font-size:60px; font-weight:560; letter-spacing:0.14em;` +
    `color:rgba(255,255,255,${opacity}); text-transform:uppercase; transform:translateY(-50%);`);
}

const CAPABILITIES = [
  'Specialized skill', 'Scarce knowledge', 'Years of training',
  'Professional judgment', 'Dexterity', 'Responsibility'
];

// ---- shared sub-compositions (geometry law: frames-a.mjs / _stage.js) ------

function surgeonS2(st, opacity = 1) {
  return df(st, 'surgeon', 150, 126, 620, 827,
    { alt: 'The surgeon, one hour of specialized surgery', opacity });
}

// The patient, photographic always. `variant`: null (s2-f1-final box),
// 'crop' (D8-B tighter crop — the box runs to the frame bottom so the crop
// reads as cinema, not as a floating box edge), 'scaled' (D8-C smaller,
// repositioned).
function patientS2(st, opacity = 1, variant = null) {
  if (variant === 'crop') {
    return df(st, 'patient', 1170, 180, 620, 900,
      { alt: 'The patient', opacity, imgTransform: 'translateY(6%) scale(1.28)' });
  }
  if (variant === 'scaled') {
    return df(st, 'patient', 1265, 262, 508, 635, { alt: 'The patient', opacity });
  }
  return df(st, 'patient', 1150, 152, 620, 775, { alt: 'The patient', opacity });
}

function servicePath(st, opacity = 1) {
  seg(st.svg, 820, 620, 1100, 620, 0.35 * opacity, 1.5);
  dot(st.svg, 820, 620, 3.5, 0.7 * opacity);
  dot(st.svg, 1100, 620, 3.5, 0.7 * opacity);
}

function capsList(st, opacity = 0.75) {
  const list = document.createElement('div');
  list.style.cssText = 'position:absolute; left:790px; top:255px; width:340px;' +
    'display:grid; justify-items:center; gap:12px; text-align:center;';
  CAPABILITIES.forEach((copy) => {
    const label = document.createElement('p');
    label.style.cssText = 'margin:0; font-size:24px; font-weight:500; letter-spacing:0.04em;' +
      `line-height:1.15; color:rgba(255,255,255,${opacity});`;
    label.textContent = copy;
    list.appendChild(label);
  });
  st.el.appendChild(list);
}

// D2 — the wanted goods as dim possibilities, three arrangements. The return
// corridor is the open dark between the surgeon (x ≤ 770) and the photographic
// patient (x ≥ 1150); every arrangement leaves it clear so the path-failure
// language has room to read.
function goodsD2(st, arrangement, opacity = 0.45) {
  const o = { opacity };
  if (arrangement === 'cluster') {
    // A — gathered at the surgeon's side: a loose triangle at his shoulder.
    df(st, 'shoe', 690, 140, 260, 195, { alt: 'Shoes', ...o });
    df(st, 'meal', 960, 160, 260, 195, { alt: 'A dinner', ...o });
    df(st, 'wine', 825, 360, 260, 195, { alt: 'A bottle of wine', ...o });
  } else if (arrangement === 'band') {
    // B — a band strung beneath the return path's line: what it reaches for.
    df(st, 'shoe', 480, 650, 250, 188, { alt: 'Shoes', ...o });
    df(st, 'meal', 750, 650, 250, 188, { alt: 'A dinner', ...o });
    df(st, 'wine', 1020, 650, 250, 188, { alt: 'A bottle of wine', ...o });
  } else {
    // C — a constellation over the exchange: real things, out of reach above.
    df(st, 'shoe', 500, 130, 280, 210, { alt: 'Shoes', ...o });
    df(st, 'meal', 820, 110, 280, 210, { alt: 'A dinner', ...o });
    df(st, 'wine', 1130, 130, 280, 210, { alt: 'A bottle of wine', ...o });
  }
}

// The attempt (beat 3): the path leaves the patient's near edge and probes
// toward the surgeon in two lunges. Common to every candidate — the failure
// languages diverge at beat 4. `origin` moves with the patient's box (D1-B).
function returnAttempt(st, opacity = 1, origin = 1170) {
  dot(st.svg, origin, 620, 3, 0.5 * opacity);
  seg(st.svg, origin - 5, 620, origin - 105, 620, 0.35 * opacity, 1.5);
  seg(st.svg, origin - 127, 620, origin - 170, 620, 0.28 * opacity, 1.5);
}

// D3 — the failure languages (beat 4), on the open corridor (x 800–1170).
function failureD3(st, lang, opacity = 1) {
  const y = 620;
  dot(st.svg, 1170, y, 3, 0.5 * opacity);
  if (lang === 'misalign') {
    // A — fragments that fade and misalign as they break.
    seg(st.svg, 1165, y, 1042, y, 0.35 * opacity, 1.5);
    seg(st.svg, 1020, y + 8, 970, y + 8, 0.28 * opacity, 1.5);
    seg(st.svg, 950, y - 10, 922, y - 10, 0.2 * opacity, 1.5);
    seg(st.svg, 900, y + 15, 890, y + 15, 0.13 * opacity, 1.5);
  } else if (lang === 'gaps') {
    // B — drawn full, losing continuity: the gaps widen toward the patient.
    seg(st.svg, 800, y, 900, y, 0.3 * opacity, 1.5);
    seg(st.svg, 914, y, 1000, y, 0.3 * opacity, 1.5);
    seg(st.svg, 1030, y, 1096, y, 0.3 * opacity, 1.5);
    seg(st.svg, 1144, y, 1165, y, 0.3 * opacity, 1.5);
  } else {
    // C — the stroke thins and dies before arriving.
    const spans = [[1165, 1105, 2.2, 0.38], [1105, 1045, 1.9, 0.33], [1045, 985, 1.5, 0.27],
      [985, 925, 1.1, 0.2], [925, 865, 0.7, 0.13], [865, 805, 0.4, 0.07]];
    spans.forEach(([a, b, w, o]) => seg(st.svg, a, y, b, y, o * opacity, w));
  }
}

// The same three languages as the birth's remnant stream (S3 beat 1).
function remnantD3(st, lang) {
  const y = 540;
  if (lang === 'approved') {
    seg(st.svg, 1206, y, 1052, y, 0.32, 1.5);
    seg(st.svg, 1028, y, 988, y, 0.24, 1.5);
    seg(st.svg, 970, y, 952, y, 0.16, 1.5);
  } else if (lang === 'misalign') {
    seg(st.svg, 1206, y, 1052, y, 0.32, 1.5);
    seg(st.svg, 1028, y + 6, 988, y + 6, 0.24, 1.5);
    seg(st.svg, 970, y - 5, 952, y - 5, 0.16, 1.5);
  } else if (lang === 'gaps') {
    seg(st.svg, 1206, y, 1100, y, 0.28, 1.5);
    seg(st.svg, 1076, y, 1010, y, 0.28, 1.5);
    seg(st.svg, 970, y, 952, y, 0.28, 1.5);
  } else {
    const spans = [[1206, 1140, 1.8, 0.3], [1140, 1074, 1.5, 0.25], [1074, 1010, 1.1, 0.18],
      [1010, 950, 0.6, 0.1]];
    spans.forEach(([a, b, w, o]) => seg(st.svg, a, y, b, y, o, w));
  }
}

// S3's settled figures at the birth composition.
function birthFigures(st, { patient = true } = {}) {
  df(st, 'surgeon', 170, 194, 520, 693, { alt: 'The surgeon' });
  if (patient) df(st, 'patient', 1230, 215, 520, 650, { alt: 'The patient' });
}

// The open-interval frame, system A (s3-f2-a's geometry, verbatim).
function intervalA(st, labels, { surgeon = 1, line = 1, claim = true } = {}) {
  df(st, 'surgeon', 180, 247, 440, 587, { alt: 'The surgeon, holding the claim', opacity: surgeon });
  if (claim) mark(st, 760, 540, 116);
  if (line) fadeSeg(st.svg, 842, 540, 1560, 540, 0.22 * line, 1.2);
  const ys = [420, 540, 660];
  ['SOMEONE ELSE', 'SOMEWHERE ELSE', 'LATER'].forEach((copy, i) => {
    if (labels[i]) intervalLabel(st, copy, 1080, ys[i], labels[i]);
  });
}

// The open-interval frame, system B: no line — the words themselves step away
// into the dark, display scale, a staircase of distance.
function intervalB(st, labels) {
  df(st, 'surgeon', 180, 247, 440, 587, { alt: 'The surgeon, holding the claim' });
  mark(st, 760, 540, 116);
  const pos = [[1040, 400], [1080, 540], [1290, 680]];
  ['SOMEONE ELSE', 'SOMEWHERE ELSE', 'LATER'].forEach((copy, i) => {
    if (labels[i]) staircaseLabel(st, copy, pos[i][0], pos[i][1], labels[i]);
  });
}

// S4 system B — the legacy fork's lesson in the film's line grammar: one
// claim, two mirrored roads, the unchosen dormant rather than absent.
function s4RoadsB(st, { left = 0.3, right = 0.3, leftDot = 0.5, rightDot = 0.5 } = {}) {
  path(st.svg, 'M 880 470 H 720 L 500 630 H 280', left, 1.5);
  path(st.svg, 'M 1040 470 H 1200 L 1420 630 H 1640', right, 1.5);
  dot(st.svg, 280, 630, 3.5, leftDot);
  dot(st.svg, 1640, 630, 3.5, rightDot);
}

// ---- the cells -------------------------------------------------------------

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

// ======== SCENE 2 ========

cell('s2-b1-a', {
  beat: 'S2 beat 1', status: 'carried', decision: 'D8',
  caption: 'Beat 1 · CARRIED (s2-f1-final) + D8-A — the assembled stage as approved; capabilities land here per R2'
}, (st) => {
  surgeonS2(st); patientS2(st); servicePath(st); capsList(st);
});

cell('s2-b1-b', {
  beat: 'S2 beat 1', status: 'candidate', decision: 'D8',
  caption: 'Beat 1 · D8-B — tighter crop on the patient: the gown recedes, the lit head and shoulders carry him. The crop runs to the frame bottom (a deliberate departure from the edges rule, this candidate’s design)'
}, (st) => {
  surgeonS2(st); patientS2(st, 1, 'crop'); servicePath(st); capsList(st);
});

cell('s2-b1-c', {
  beat: 'S2 beat 1', status: 'candidate', decision: 'D8',
  caption: 'Beat 1 · D8-C — the patient at reduced scale, seated lower and further right'
}, (st) => {
  surgeonS2(st); patientS2(st, 1, 'scaled'); servicePath(st); capsList(st);
});

cell('s2-b2', {
  beat: 'S2 beat 2', status: 'new', decision: null,
  caption: 'Beat 2 · NEW (R2) — the service delivered: the delivery rides the drawn line to the patient; the capabilities settle to the floor'
}, (st) => {
  surgeonS2(st); patientS2(st); servicePath(st); capsList(st, 0.41);
  dot(st.svg, 1052, 620, 5, 0.9);           // the delivery, arriving
  dot(st.svg, 1100, 620, 4.5, 0.9);         // the receiving terminal, lit
});

cell('s2-b3-a', {
  beat: 'S2 beat 3', status: 'candidate', decision: 'D2',
  caption: 'Beat 3 · D2-A — the goods clustered at the surgeon’s side (patient recession D1-A: dimmed in place to the floor)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'cluster'); returnAttempt(st);
});

cell('s2-b3-b', {
  beat: 'S2 beat 3', status: 'candidate', decision: 'D2',
  caption: 'Beat 3 · D2-B — the goods as a band on the return path’s line: what the path is trying to reach (D1-A)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'band'); returnAttempt(st);
});

cell('s2-b3-c', {
  beat: 'S2 beat 3', status: 'candidate', decision: 'D2',
  caption: 'Beat 3 · D2-C — the goods as a constellation above the exchange: real things, out of reach (D1-A)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'top'); returnAttempt(st);
});

cell('s2-b3-d', {
  beat: 'S2 beat 3', status: 'candidate', decision: 'D1',
  caption: 'Beat 3 · D1-B — the patient’s deeper recession: smaller, toward the frame edge, past the floor as a recorded layer handoff (goods D2-A)'
}, (st) => {
  surgeonS2(st);
  df(st, 'patient', 1430, 320, 440, 550, { alt: 'The patient', opacity: 0.3 });
  goodsD2(st, 'cluster'); returnAttempt(st, 1, 1408);
});

cell('s2-b4-a', {
  beat: 'S2 beat 4', status: 'candidate', decision: 'D3',
  caption: 'Beat 4 · D3-A — the failure as fragments that fade and misalign as they break (context: D2-A, D1-A)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'cluster'); failureD3(st, 'misalign');
});

cell('s2-b4-b', {
  beat: 'S2 beat 4', status: 'candidate', decision: 'D3',
  caption: 'Beat 4 · D3-B — the path drawn full, losing continuity: the gaps widen toward the patient (context: D2-A, D1-A)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'cluster'); failureD3(st, 'gaps');
});

cell('s2-b4-c', {
  beat: 'S2 beat 4', status: 'candidate', decision: 'D3',
  caption: 'Beat 4 · D3-C — the stroke thins and dies before arriving (context: D2-A, D1-A)'
}, (st) => {
  surgeonS2(st); patientS2(st, 0.55); goodsD2(st, 'cluster'); failureD3(st, 'thin');
});

cell('s2-b5-a', {
  beat: 'S2 beat 5', status: 'candidate', decision: 'D4',
  caption: 'Beat 5 · D4-A — the binding line on effectively clean black: the failure frame hands off fully (recorded handoff)'
}, (st) => {
  surgeonS2(st, 0.12); patientS2(st, 0.12); goodsD2(st, 'cluster', 0.06);
  failureD3(st, 'misalign', 0.25);
  statement(st, 'It binds both halves of the trade to the same two people.', 815);
});

cell('s2-b5-b', {
  beat: 'S2 beat 5', status: 'candidate', decision: 'D4',
  caption: 'Beat 5 · D4-B — authored partial recede: the two people stay legible as the anchor beneath the line that names them. (Context re-rendered 27 Aug per the film-wide D3-C ruling — the receded failure is the thinning stroke; the presenter judges it at the r2 live review)'
}, (st) => {
  surgeonS2(st, 0.5); patientS2(st, 0.38); goodsD2(st, 'cluster', 0.12);
  // The cell's own decision is D4-B; its failure context follows the D3
  // selection (this report's §3.3) — re-rendered from the sheet's baseline
  // D3-A to the ruled thinning stroke, 27 August 2026.
  failureD3(st, 'thin', 0.35);
  statement(st, 'It binds both halves of the trade to the same two people.', 815);
});

// ======== SCENE 3 ========

cell('s3-b1', {
  beat: 'S3 beat 1', status: 'carried', decision: null,
  caption: 'Beat 1 · CARRIED — s3-f1-final: the birth, mid-contraction, remnant in the approved language'
}, (st) => {
  birthFigures(st); remnantD3(st, 'approved'); mark(st, 880, 540, 132);
});

cell('s3-b1-a', {
  beat: 'S3 beat 1', status: 'candidate', decision: 'D3',
  caption: 'Beat 1 · D3-A remnant — the arriving stream fades and misaligns'
}, (st) => {
  birthFigures(st); remnantD3(st, 'misalign'); mark(st, 880, 540, 132);
});

cell('s3-b1-b', {
  beat: 'S3 beat 1', status: 'candidate', decision: 'D3',
  caption: 'Beat 1 · D3-B remnant — the stream losing continuity, gaps widening back toward the patient'
}, (st) => {
  birthFigures(st); remnantD3(st, 'gaps'); mark(st, 880, 540, 132);
});

cell('s3-b1-c', {
  beat: 'S3 beat 1', status: 'candidate', decision: 'D3',
  caption: 'Beat 1 · D3-C remnant — the stream thinning as the birth drinks it'
}, (st) => {
  birthFigures(st); remnantD3(st, 'thin'); mark(st, 880, 540, 132);
});

cell('s3-b2', {
  beat: 'S3 beat 2', status: 'new', decision: null,
  caption: 'Beat 2 · the contraction complete — the claim held between the two people (r1 derived state, now a full-size cell)'
}, (st) => {
  birthFigures(st); mark(st, 880, 540, 132);
});

cell('s3-b3', {
  beat: 'S3 beat 3', status: 'new', decision: null,
  caption: 'Beat 3 · the patient released — the darkness where he was; the claim stays'
}, (st) => {
  birthFigures(st, { patient: false }); mark(st, 880, 540, 132);
});

cell('s3-b4-a', {
  beat: 'S3 beat 4', status: 'candidate', decision: 'D6',
  caption: 'Beat 4 · D6-A — SOMEONE ELSE lands at full voice (the approved s3-f2-a system)'
}, (st) => intervalA(st, [1, 0, 0]));

cell('s3-b4-b', {
  beat: 'S3 beat 4', status: 'candidate', decision: 'D6',
  caption: 'Beat 4 · D6-B — SOMEONE ELSE at display scale: the words themselves step into the dark, no line'
}, (st) => intervalB(st, [1, 0, 0]));

cell('s3-b5-a', {
  beat: 'S3 beat 5', status: 'candidate', decision: 'D6',
  caption: 'Beat 5 · D6-A — SOMEWHERE ELSE lands; SOMEONE ELSE demotes'
}, (st) => intervalA(st, [0.72, 1, 0]));

cell('s3-b5-b', {
  beat: 'S3 beat 5', status: 'candidate', decision: 'D6',
  caption: 'Beat 5 · D6-B — the staircase deepens: SOMEWHERE ELSE lands further out'
}, (st) => intervalB(st, [0.72, 1, 0]));

cell('s3-b6-a', {
  beat: 'S3 beat 6', status: 'carried', decision: 'D6',
  caption: 'Beat 6 · D6-A · CARRIED — LATER lands: s3-f2-a exactly'
}, (st) => intervalA(st, [0.72, 0.72, 1]));

cell('s3-b6-b', {
  beat: 'S3 beat 6', status: 'candidate', decision: 'D6',
  caption: 'Beat 6 · D6-B — LATER lands deepest; the interval is the distance the words have walked'
}, (st) => intervalB(st, [0.72, 0.72, 1]));

// The demonstration cells share system-A context. The interval's words hand
// the frame to the demonstration (a recorded handoff — the demonstration is
// the beat's one idea, and its travel crosses their ground); they return with
// the reset.
function demoContext(st) {
  df(st, 'surgeon', 180, 247, 440, 587, { alt: 'The surgeon' });
  const ys = [420, 540, 660];
  ['SOMEONE ELSE', 'SOMEWHERE ELSE', 'LATER'].forEach((copy, i) => {
    intervalLabel(st, copy, 1080, ys[i], i === 2 ? 0.18 : 0.14);
  });
}

cell('s3-b7-a', {
  beat: 'S3 beat 7', status: 'candidate', decision: 'D5',
  caption: 'Beat 7 · D5-A — two distinct roads: the claim went out on the upper, the shoes came back on the lower; the claim is gone'
}, (st) => {
  demoContext(st);
  df(st, 'shoe', 610, 427, 300, 225, { alt: 'The shoes, arrived' });
  fadeSeg(st.svg, 930, 540, 1560, 540, 0.22, 1.2);        // the road out
  fadeSeg(st.svg, 1810, 612, 935, 612, 0.3, 1.2);         // the road back
  dot(st.svg, 938, 612, 3, 0.6);
});

cell('s3-b7-b', {
  beat: 'S3 beat 7', status: 'candidate', decision: 'D5',
  caption: 'Beat 7 · D5-B — two phases in one frame: the claim mid-departure, the shoes mid-arrival, motion in the trails. (This cell depicts the gesture’s character; if selected, the beat’s motion settle still ends shoe present, claim gone)'
}, (st) => {
  demoContext(st);
  mark(st, 1000, 540, 116);
  fadeSeg(st.svg, 935, 540, 660, 540, 0.5, 2.5);          // the claim’s wake
  df(st, 'shoe', 1420, 427, 300, 225, { alt: 'The shoes, arriving' });
  fadeSeg(st.svg, 1728, 540, 1858, 540, 0.4, 2.2);        // the arrival’s wake
});

cell('s3-b7-c', {
  beat: 'S3 beat 7', status: 'candidate', decision: 'D5',
  caption: 'Beat 7 · D5-C — the circle closes: one circuit out and back, turned at the far point, resolved at the shoes'
}, (st) => {
  demoContext(st);
  df(st, 'shoe', 610, 427, 300, 225, { alt: 'The shoes, arrived' });
  seg(st.svg, 935, 515, 1600, 515, 0.25, 1.2);
  path(st.svg, 'M 1600 515 A 47.5 47.5 0 0 1 1600 610', 0.25, 1.2);
  seg(st.svg, 1600, 610, 940, 610, 0.25, 1.2);
  dot(st.svg, 940, 610, 3, 0.6);
  dot(st.svg, 1647.5, 562.5, 2.5, 0.45);                  // the far point, where it was redeemed
});

cell('s3-b8-a', {
  beat: 'S3 beat 8', status: 'follows', decision: 'D6',
  caption: 'Beat 8 · the reset to the held claim — identical to beat 6 in system A (follows the D6 selection)'
}, (st) => intervalA(st, [0.72, 0.72, 1]));

cell('s3-b8-b', {
  beat: 'S3 beat 8', status: 'follows', decision: 'D6',
  caption: 'Beat 8 · the reset in system B (follows the D6 selection)'
}, (st) => intervalB(st, [0.72, 0.72, 1]));

cell('s3-b9-a', {
  beat: 'S3 beat 9', status: 'candidate', decision: 'D4',
  caption: 'Beat 9 · D4-A — the pair on effectively clean black; only the claim keeps the stage (recorded handoff)'
}, (st) => {
  intervalA(st, [0.1, 0.1, 0.14], { surgeon: 0.1, line: 0.45 });
  statement(st, 'Money separates the two halves of an exchange.', 790, 'rgba(255,255,255,0.66)');
  statement(st, 'The exchange can remain unfinished.', 872);
});

cell('s3-b9-b', {
  beat: 'S3 beat 9', status: 'candidate', decision: 'D4',
  caption: 'Beat 9 · D4-B — partial recede: the open interval’s line stays legible as the anchor; it is the unfinished exchange'
}, (st) => {
  intervalA(st, [0.15, 0.15, 0.2], { surgeon: 0.15, line: 1 });
  statement(st, 'Money separates the two halves of an exchange.', 790, 'rgba(255,255,255,0.66)');
  statement(st, 'The exchange can remain unfinished.', 872);
});

// ======== SCENE 4 ========

cell('s4-b1-a', {
  beat: 'S4 beat 1', status: 'candidate', decision: 'D7',
  caption: 'Beat 1 · D7-A — the fork in the approved system, upgraded: two real roads leave the held claim, each named at its destination'
}, (st) => {
  mark(st, 760, 540, 116);
  fadeSeg(st.svg, 678, 540, 240, 540, 0.22, 1.2);
  fadeSeg(st.svg, 842, 540, 1560, 540, 0.22, 1.2);
  kicker(st, 'SPEND', 430, 462);
  kicker(st, 'SAVE', 1330, 462);
});

cell('s4-b1-b', {
  beat: 'S4 beat 1', status: 'candidate', decision: 'D7',
  caption: 'Beat 1 · D7-B — the symmetric fork: two mirrored roads descend from the claim, both real, neither taken'
}, (st) => {
  mark(st, 960, 470, 116);
  s4RoadsB(st);
  kicker(st, 'SPEND', 390, 690);
  kicker(st, 'SAVE', 1530, 690);
});

cell('s4-b2-a', {
  beat: 'S4 beat 2', status: 'carried', decision: 'D7',
  caption: 'Beat 2 · D7-A · CARRIED — s4-f1: SPEND resolved, goods arrived, one unbroken line'
}, (st) => {
  kicker(st, 'SPEND', 960, 170);
  df(st, 'shoe', 320, 390, 380, 285, { alt: 'Shoes, arrived' });
  df(st, 'meal', 770, 390, 380, 285, { alt: 'The dinner, arrived' });
  df(st, 'wine', 1220, 390, 380, 285, { alt: 'The wine, arrived' });
  seg(st.svg, 460, 800, 1460, 800, 0.35, 1.5);
  dot(st.svg, 460, 800, 3.5, 0.7);
  dot(st.svg, 1460, 800, 3.5, 0.7);
});

cell('s4-b2-b', {
  beat: 'S4 beat 2', status: 'candidate', decision: 'D7',
  caption: 'Beat 2 · D7-B — the spend road taken: the claim traveled left and closed; the goods stand at the road’s end; the save road waits, dormant'
}, (st) => {
  s4RoadsB(st, { left: 0.45, right: 0.15, leftDot: 0.85, rightDot: 0.3 });
  kicker(st, 'SPEND', 390, 690);
  kicker(st, 'SAVE', 1530, 690, 0.4);
  df(st, 'shoe', 180, 740, 300, 225, { alt: 'Shoes, arrived' });
  df(st, 'meal', 510, 755, 300, 225, { alt: 'The dinner, arrived' });
  df(st, 'wine', 840, 740, 300, 225, { alt: 'The wine, arrived' });
});

cell('s4-b3-a', {
  beat: 'S4 beat 3', status: 'candidate', decision: 'D7',
  caption: 'Beat 3 · D7-A — the reset: the spend road is spent and gone; the claim is held again; the other road waits'
}, (st) => {
  mark(st, 760, 540, 116);
  fadeSeg(st.svg, 842, 540, 1560, 540, 0.22, 1.2);
  kicker(st, 'SAVE', 1330, 462);
});

cell('s4-b3-b', {
  beat: 'S4 beat 3', status: 'candidate', decision: 'D7',
  caption: 'Beat 3 · D7-B — the fork re-posed: the spend road subdued by its own telling; the save road holds its place'
}, (st) => {
  mark(st, 960, 470, 116);
  s4RoadsB(st, { left: 0.15, right: 0.3, leftDot: 0.3, rightDot: 0.5 });
  kicker(st, 'SPEND', 390, 690, 0.4);
  kicker(st, 'SAVE', 1530, 690);
});

cell('s4-b4-a', {
  beat: 'S4 beat 4', status: 'candidate', decision: 'D7',
  caption: 'Beat 4 · D7-A — SAVE: the claim settles deeper into the hold; the interval stretches into black (s4-f2-a minus the pair)'
}, (st) => {
  mark(st, 620, 460, 132);
  fadeSeg(st.svg, 712, 460, 1800, 460, 0.3, 1.5);
});

cell('s4-b4-b', {
  beat: 'S4 beat 4', status: 'candidate', decision: 'D7',
  caption: 'Beat 4 · D7-B — the claim takes the save road and rests on it; the road continues into time it cannot see'
}, (st) => {
  s4RoadsB(st, { left: 0.15, right: 0.45, leftDot: 0.3, rightDot: 0 });
  mark(st, 1530, 630, 116);
  fadeSeg(st.svg, 1595, 630, 1860, 630, 0.3, 1.5);
});

cell('s4-b5-a', {
  beat: 'S4 beat 5', status: 'carried', decision: 'D7',
  caption: 'Beat 5 · D7-A · CARRIED — s4-f2-a: the closing pair'
}, (st) => {
  mark(st, 620, 460, 132);
  fadeSeg(st.svg, 712, 460, 1800, 460, 0.3, 1.5);
  statement(st, 'Spending closes the exchange.', 790, 'rgba(255,255,255,0.66)');
  statement(st, 'Saving keeps it open.', 872);
});

cell('s4-b5-b', {
  beat: 'S4 beat 5', status: 'candidate', decision: 'D7',
  caption: 'Beat 5 · D7-B — the pair lands beneath the held road; the roads settle to the floor, the claim keeps its voice'
}, (st) => {
  s4RoadsB(st, { left: 0.09, right: 0.25, leftDot: 0.16, rightDot: 0 });
  mark(st, 1530, 630, 116);
  fadeSeg(st.svg, 1595, 630, 1860, 630, 0.17, 1.5);
  statement(st, 'Spending closes the exchange.', 790, 'rgba(255,255,255,0.66)');
  statement(st, 'Saving keeps it open.', 872);
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
}

export default buildCell;
