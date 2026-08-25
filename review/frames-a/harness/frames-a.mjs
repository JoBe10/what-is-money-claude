// Batch A style frames — the ten §3 compositions as 1920×1080 stills
// (docs/batch-a-package.md §3; captured by capture-frames.cjs).
//
// Runs inside the deck page on the dev server: real assets through the
// dark-field register, real type through the deck's own classes and tokens,
// final composition, brightness rules applied. Frames that contain the Claim
// Mark render in all three Gate 1 candidates; S3-F1 renders in three
// compositional attempts; the two frames with a spec'd alternative (P2-F1's
// hours ghost, S2-F1's patient) render both options. Nothing animates — every
// frame is a settled state.
//
// The one held asset: `patient` failed the grade gate (corner 64.73 / 6) and
// stays in incoming/. The photographic S2-F1 option renders it directly from
// the drop zone with a HELD annotation baked into the frame, so the sheet can
// judge the composition while the frame itself says it is not shippable.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { UnitField } from '/src/components/UnitField.js';
import { ClaimMark, claimMarkExtent } from '/src/proto/claim-mark.js';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'frames-a-stage';

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

function fadeSeg(svg, x1, y1, x2, y2, opacity = 0.35, width = 1.5) {
  const id = `fade-${Math.round(x1)}-${Math.round(y1)}-${Math.round(x2)}`;
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

function arcPath(svg, cx, cy, r, a1, a2, opacity = 0.25, width = 1.5) {
  const rad = (d) => (d * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const x2 = cx + r * Math.cos(rad(a2));
  const y2 = cy + r * Math.sin(rad(a2));
  const p = document.createElementNS(svgNS, 'path');
  p.setAttribute('d', `M ${x1} ${y1} A ${r} ${r} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} 1 ${x2} ${y2}`);
  p.setAttribute('fill', 'none');
  p.setAttribute('stroke', `rgba(255,255,255,${opacity})`);
  p.setAttribute('stroke-width', width);
  p.setAttribute('stroke-linecap', 'round');
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

function mark(st, candidate, size, cx, cy) {
  const m = ClaimMark({ candidate, size });
  m.style.position = 'absolute';
  m.style.left = `${cx}px`;
  m.style.top = `${cy}px`;
  m.style.transform = 'translate(-50%, -50%)';
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

// The restrained patient mark — a presence, not a portrait: head ring and
// shoulder arc in the grammar's thin stroke, at the glyph luminance treatment.
function patientMark(st, cx, cy, scale = 1, opacity = 1) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:absolute; left:${cx}px; top:${cy}px;` +
    `transform:translate(-50%,-50%); opacity:${opacity};` +
    'filter: drop-shadow(0 0 10px rgba(253, 233, 212, 0.22));';
  const s = 320 * scale;
  wrap.innerHTML = `
    <svg viewBox="-160 -160 320 320" width="${s}" height="${s}" aria-hidden="true"
         fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round">
      <circle cx="0" cy="-72" r="44" />
      <path d="M -118 118 A 126 126 0 0 1 118 118" />
    </svg>`;
  st.el.appendChild(wrap);
  return wrap;
}

// The hours field at a settled state. Returns the field so P2-F1 can dim it.
function hoursField(st, mode) {
  const field = UnitField({});
  field.el.style.position = 'absolute';
  field.el.style.inset = '0';
  st.el.appendChild(field.el);
  field.setState({ mode, progress: 1 });
  cleanup.push(() => field.destroy());
  return field;
}

// ---- the frames ------------------------------------------------------------

const CAPABILITIES = [
  'Specialized skill',
  'Scarce knowledge',
  'Years of training',
  'Professional judgment',
  'Dexterity',
  'Responsibility'
];

const BUILDERS = {
  // P1-F1 — the completed hours field: counter at 80,000, the hours line.
  // The deck's proven frame, re-rendered with the deck's own classes.
  'p1-f1': (st) => {
    hoursField(st, 'steady');
    const counter = document.createElement('div');
    counter.className = 's1q-hours__counter';
    counter.dataset.visible = 'true';
    counter.textContent = '80,000';
    st.el.appendChild(counter);
    const line = document.createElement('p');
    line.className = 's1q-hours__line';
    line.dataset.visible = 'true';
    line.textContent = 'This is how many hours of your life you will spend working.';
    st.el.appendChild(line);
  },

  // P1-F2 — mid-morph: the condensed mass as the GOLD form. Display scale,
  // centered low, generous darkness, no text.
  'p1-f2': (st) => {
    df(st, 'gold', 600, 380, 720, 540, { alt: 'A gold bar emerging from darkness' });
  },

  // P1-F3 — the title frame, the thumbnail candidate.
  'p1-f3': (st) => {
    const title = document.createElement('h1');
    title.className = 's1q-what__title';
    title.dataset.visible = 'true';
    title.textContent = 'WHAT IS MONEY?';
    st.el.appendChild(title);
  },

  // P2-F1 — the mercy line, display treatment. Variant b: the hours field's
  // ghost at watermark opacity beneath it.
  'p2-f1-plain': (st) => {
    const line = document.createElement('p');
    line.className = 's1q-stakes__line';
    line.dataset.visible = 'true';
    line.textContent = 'If you don’t understand the thing your life’s work is stored in, you are at the mercy of those who do.';
    st.el.appendChild(line);
  },
  'p2-f1-ghost': (st) => {
    hoursField(st, 'dim');
    BUILDERS['p2-f1-plain'](st);
  },

  // S2-F1 — the full exchange stage: surgeon left, patient right, the service
  // path drawn, capability labels set. Warm register, no accent.
  's2-f1-photo': (st) => {
    buildExchangeStage(st, 'photo');
  },
  's2-f1-mark': (st) => {
    buildExchangeStage(st, 'mark');
  },

  // S2-F2 — the failure state: wanted goods as dim possibilities near the
  // surgeon; the return path visibly failing on its way back.
  's2-f2': (st) => {
    df(st, 'surgeon', 150, 126, 620, 827, { alt: 'The surgeon' });
    df(st, 'shoe', 850, 165, 300, 225, { alt: 'Shoes', opacity: 0.45 });
    df(st, 'meal', 850, 428, 300, 225, { alt: 'A dinner', opacity: 0.45 });
    df(st, 'wine', 850, 691, 300, 225, { alt: 'A bottle of wine', opacity: 0.45 });
    patientMark(st, 1610, 540, 1, 0.4);
    // The return path, right to left, dying before it arrives.
    seg(st.svg, 1440, 620, 1305, 620, 0.35, 1.5);
    seg(st.svg, 1280, 620, 1236, 620, 0.28, 1.5);
    seg(st.svg, 1214, 620, 1190, 620, 0.2, 1.5);
    seg(st.svg, 1172, 620, 1163, 620, 0.13, 1.5);
    dot(st.svg, 1444, 620, 3, 0.5);
  },

  // S4-F1 — SPEND resolution: goods arrived, claim absent, closure legible.
  's4-f1': (st) => {
    const kicker = text(st, 'SPEND',
      'left:0; right:0; top:170px; text-align:center; font-size:20px; font-weight:500;' +
      'letter-spacing:0.32em; color:rgba(255,255,255,0.5); text-transform:uppercase;');
    kicker.style.textIndent = '0.32em';
    df(st, 'shoe', 320, 390, 380, 285, { alt: 'Shoes, arrived' });
    df(st, 'meal', 770, 390, 380, 285, { alt: 'The dinner, arrived' });
    df(st, 'wine', 1220, 390, 380, 285, { alt: 'The wine, arrived' });
    // The exchange, closed: one unbroken line, both ends resolved.
    seg(st.svg, 460, 800, 1460, 800, 0.35, 1.5);
    dot(st.svg, 460, 800, 3.5, 0.7);
    dot(st.svg, 1460, 800, 3.5, 0.7);
  }
};

function buildExchangeStage(st, patientOption) {
  df(st, 'surgeon', 150, 126, 620, 827, { alt: 'The surgeon, one hour of specialized surgery' });

  if (patientOption === 'photo') {
    // HELD AT THE GATE — the patient render failed the grade (corner 64.73
    // against 6) and stays in incoming/. Shown from the drop zone for
    // compositional judgment only, and the frame says so on its face.
    const box = document.createElement('div');
    box.style.cssText = 'position:absolute; left:1150px; top:152px; width:620px; height:775px;' +
      'overflow:hidden; display:grid; place-items:center;';
    const img = document.createElement('img');
    img.src = '/assets/dark-field/incoming/patient.png';
    img.alt = 'The patient (held at the grade gate)';
    img.style.cssText = 'width:100%; height:100%; object-fit:contain;' +
      'transform: translate(14.6%, 4.5%) scale(0.976);';
    box.appendChild(img);
    st.el.appendChild(box);
    text(st, 'PATIENT RENDER HELD AT THE GATE — corner 64.7 / 6 · regrade or regenerate before shipping',
      'left:1150px; top:940px; width:620px; text-align:center; font-size:13px;' +
      'letter-spacing:0.1em; color:#F7931A; text-transform:uppercase;');
  } else {
    patientMark(st, 1460, 540, 1.2, 1);
  }

  // The service path, surgeon to patient, the delivered half.
  const pathY = 620;
  seg(st.svg, 820, pathY, patientOption === 'photo' ? 1100 : 1240, pathY, 0.35, 1.5);
  dot(st.svg, 820, pathY, 3.5, 0.7);
  dot(st.svg, patientOption === 'photo' ? 1100 : 1240, pathY, 3.5, 0.7);

  // What the hour contained — the accumulating inventory, at 4.03's register.
  const list = document.createElement('div');
  list.style.cssText = 'position:absolute; left:790px; top:255px; width:340px;' +
    'display:grid; justify-items:center; gap:12px; text-align:center;';
  CAPABILITIES.forEach((copy) => {
    const label = document.createElement('p');
    label.style.cssText = 'margin:0; font-size:24px; font-weight:500; letter-spacing:0.04em;' +
      'line-height:1.15; color:rgba(255,255,255,0.75);';
    label.textContent = copy;
    list.appendChild(label);
  });
  st.el.appendChild(list);
}

// S3-F1 — the birth: the return path mid-contraction into the Claim Mark.
// Three compositional attempts, each in all three candidates.
function birthAttempt1(st, cand) {
  // Attempt 1 — the contraction, centered: the path's remains streaming in
  // from the patient's side, closing into the mark at dead center.
  const cy = 540;
  const ext = claimMarkExtent(cand, 176);
  const edge = 960 + ext.w / 2;
  seg(st.svg, 1760, cy, 1290, cy, 0.4, 1.5);
  seg(st.svg, 1258, cy, 1186, cy, 0.34, 1.5);
  seg(st.svg, 1160, cy, 1118, cy, 0.28, 1.5);
  seg(st.svg, 1098, cy, Math.max(edge + 24, 1080), cy, 0.2, 1.5);
  mark(st, cand, 176, 960, cy);
}

function birthAttempt2(st, cand) {
  // Attempt 2 — in the scene: the surgeon watches the unresolved half
  // contract into the mark on the path between him and the patient.
  df(st, 'surgeon', 170, 194, 520, 693, { alt: 'The surgeon' });
  patientMark(st, 1600, 540, 1, 0.38);
  const cy = 540;
  seg(st.svg, 1470, cy, 1052, cy, 0.32, 1.5);
  seg(st.svg, 1028, cy, 988, cy, 0.24, 1.5);
  seg(st.svg, 970, cy, 952, cy, 0.16, 1.5);
  mark(st, cand, 132, 880, cy);
}

function birthAttempt3(st, cand) {
  // Attempt 3 — display, low center: the last orbits of the path condensing
  // out of the darkness above the mark. The poster reading.
  // Staggered spans and radii on purpose: concentric arcs sharing one axis
  // read as a signal glyph, which the first render proved.
  const cx = 960;
  const cy = 640;
  arcPath(st.svg, cx, cy, 452, -168, -118, 0.18, 1.5);
  arcPath(st.svg, cx, cy, 344, -118, -40, 0.26, 1.5);
  arcPath(st.svg, cx, cy, 252, -152, -94, 0.33, 1.5);
  arcPath(st.svg, cx, cy, 198, -78, -36, 0.38, 1.5);
  mark(st, cand, 220, cx, cy);
}

// S3-F2 — the open interval: surgeon and held claim left, expanding darkness,
// the three-line interval set right. The list is one accumulating element;
// LATER is the last-lit line and holds full voice.
function openInterval(st, cand) {
  df(st, 'surgeon', 180, 247, 440, 587, { alt: 'The surgeon, holding the claim' });
  mark(st, cand, 116, 760, 540);
  fadeSeg(st.svg, 760 + claimMarkExtent(cand, 116).w / 2 + 24, 540, 1560, 540, 0.22, 1.2);
  const lineStyle = (y, opacity) =>
    `left:1080px; top:${y}px; font-size:46px; font-weight:560; letter-spacing:0.12em;` +
    `color:rgba(255,255,255,${opacity}); text-transform:uppercase; transform:translateY(-50%);`;
  text(st, 'SOMEONE ELSE', lineStyle(420, 0.72));
  text(st, 'SOMEWHERE ELSE', lineStyle(540, 0.72));
  text(st, 'LATER', lineStyle(660, 1));
}

// S4-F2 — SAVE final: the held claim, the interval extending into black, the
// closing pair. The second line is the landing statement.
function saveFinal(st, cand) {
  mark(st, cand, 132, 620, 460);
  fadeSeg(st.svg, 620 + claimMarkExtent(cand, 132).w / 2 + 26, 460, 1800, 460, 0.3, 1.5);
  text(st, 'Spending closes the exchange.',
    'left:0; right:0; top:790px; text-align:center; font-size:46px; font-weight:540;' +
    'letter-spacing:-0.012em; color:rgba(255,255,255,0.66);');
  text(st, 'Saving keeps it open.',
    'left:0; right:0; top:872px; text-align:center; font-size:46px; font-weight:540;' +
    'letter-spacing:-0.012em; color:#fff;');
}

for (const cand of ['a', 'b', 'c']) {
  BUILDERS[`s3-f1-a1-${cand}`] = (st) => birthAttempt1(st, cand);
  BUILDERS[`s3-f1-a2-${cand}`] = (st) => birthAttempt2(st, cand);
  BUILDERS[`s3-f1-a3-${cand}`] = (st) => birthAttempt3(st, cand);
  BUILDERS[`s3-f2-${cand}`] = (st) => openInterval(st, cand);
  BUILDERS[`s4-f2-${cand}`] = (st) => saveFinal(st, cand);
}

export const FRAME_IDS = Object.keys(BUILDERS);

export function buildFrame(id) {
  const build = BUILDERS[id];
  if (!build) throw new Error(`no frame builder for "${id}"`);
  const st = stage();
  build(st);
  return id;
}

export function teardown() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
}

export default buildFrame;
