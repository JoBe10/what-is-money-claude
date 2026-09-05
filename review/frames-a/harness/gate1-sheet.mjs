// Prototype Gate 1 — the Claim Mark contact sheet builder (batch package §4).
//
// Runs inside the deck page on the dev server (capture-gate1.cjs imports it),
// so the candidates render through the real module (src/proto/claim-mark.js)
// with the real tokens, fonts and CarrierShell — the sheet judges the thing
// that will ship, not a mock of it.
//
// Three candidates × five contexts × three scales, plus one behavior still
// (mid-transfer) per candidate. The contexts are the five the package names:
// birth from the path · spend/save · inside a carrier · the 100-year journey ·
// the marginal decision. Line work is the grammar's — thin white strokes, dot
// terminals, no accent (orange belongs to the mark alone).

import { ClaimMark, claimMarkExtent } from '/src/proto/claim-mark.js';
import { CarrierShell } from '/src/components/section-4/CarrierShell.js';

const SCALES = [48, 116, 176];
const CELL = {
  48: { w: 340, h: 200 },
  116: { w: 520, h: 300 },
  176: { w: 700, h: 400 }
};

const CANDIDATE_META = {
  a: ['A — the current ClaimObject', 'The deck’s luminous disc, verbatim: 1.2’s token, every Section 4 claim.'],
  b: ['B — the billet', 'The blueprint’s flatter elongated form: 2.8:1, chamfered ends, a thin bright top edge, no symbol.'],
  c: ['C — the flat hexagon', 'Ultra-minimal: one flat-shaded field, no gradient, no edge light.']
};

const CONTEXTS = ['birth', 'spend-save', 'carrier', 'journey', 'margin'];
const CONTEXT_LABEL = {
  birth: 'birth from the path',
  'spend-save': 'spend / save',
  carrier: 'inside a carrier',
  journey: 'the 100-year journey',
  margin: 'the marginal decision',
  transfer: 'behavior — mid-transfer'
};

const svgNS = 'http://www.w3.org/2000/svg';

function stage(w, h) {
  const el = document.createElement('div');
  el.className = 'g1-stage';
  el.style.cssText = `position:relative; width:${w}px; height:${h}px; background:#000; overflow:hidden; flex:none;`;
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.style.cssText = 'position:absolute; inset:0;';
  el.appendChild(svg);
  return { el, svg, w, h };
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

function dot(svg, x, y, r = 2.5, opacity = 0.6) {
  const c = document.createElementNS(svgNS, 'circle');
  c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
  c.setAttribute('fill', `rgba(255,255,255,${opacity})`);
  svg.appendChild(c);
  return c;
}

function placeMark(st, candidate, size, cx, cy) {
  const mark = ClaimMark({ candidate, size });
  mark.style.position = 'absolute';
  mark.style.left = `${cx}px`;
  mark.style.top = `${cy}px`;
  mark.style.transform = 'translate(-50%, -50%)';
  st.el.appendChild(mark);
  return mark;
}

function label(st, text, x, y, { size = 11, align = 'left', color = 'rgba(255,255,255,0.5)', tracking = '0.16em', tabular = false } = {}) {
  const el = document.createElement('div');
  el.textContent = text;
  el.style.cssText = `position:absolute; left:${x}px; top:${y}px; font-size:${size}px; ` +
    `letter-spacing:${tracking}; text-transform:uppercase; color:${color}; white-space:nowrap; ` +
    (tabular ? 'font-variant-numeric:tabular-nums; ' : '') +
    (align === 'center' ? 'transform:translate(-50%,-50%);' : align === 'right' ? 'transform:translate(-100%,-50%);' : 'transform:translateY(-50%);');
  st.el.appendChild(el);
  return el;
}

// ---- the five contexts + the behavior still --------------------------------

function birth(st, cand, s) {
  const cy = st.h / 2;
  const markX = st.w * 0.60;
  const ext = claimMarkExtent(cand, s);
  const edge = markX - ext.w / 2;
  // The return path, contracting: a continuous run, then shortening fragments
  // closing the gap into the mark.
  seg(st.svg, st.w * 0.06, cy, st.w * 0.38, cy, 0.35, 1.5);
  const frags = [
    [0.405, 0.44, 0.34],
    [0.455, 0.478, 0.30],
    [0.492, 0.505, 0.26]
  ];
  frags.forEach(([a, b, o]) => {
    const x2 = Math.min(st.w * b, edge - 6);
    if (st.w * a < x2) seg(st.svg, st.w * a, cy, x2, cy, o, 1.5);
  });
  placeMark(st, cand, s, markX, cy);
}

function spendSave(st, cand, s) {
  const cy = st.h / 2;
  const ext = claimMarkExtent(cand, s);
  const markX = st.w * 0.30;
  const x0 = markX + ext.w / 2 + 8;
  const xEnd = st.w * 0.78;
  const dy = st.h * 0.26;
  seg(st.svg, x0, cy, xEnd, cy - dy, 0.35, 1.5);
  seg(st.svg, x0, cy, xEnd, cy + dy, 0.35, 1.5);
  dot(st.svg, xEnd, cy - dy);
  dot(st.svg, xEnd, cy + dy);
  const fs = s >= 176 ? 13 : 11;
  label(st, 'Spend', xEnd + 12, cy - dy, { size: fs });
  label(st, 'Save', xEnd + 12, cy + dy, { size: fs });
  placeMark(st, cand, s, markX, cy);
}

function carrier(st, cand, s) {
  const cx = st.w / 2;
  const cy = st.h / 2;
  const ext = claimMarkExtent(cand, s);
  const shellSize = Math.max(2.07 * s, 1.6 * ext.w);
  const box = document.createElement('div');
  box.style.cssText = `position:absolute; left:${cx}px; top:${cy}px; width:${shellSize}px; height:${shellSize}px; transform:translate(-50%,-50%);`;
  const shell = CarrierShell({});
  shell.applyState({ visible: true });
  box.appendChild(shell.el);
  st.el.appendChild(box);
  placeMark(st, cand, s, cx, cy);
}

function journey(st, cand, s) {
  const y = st.h * 0.60;
  const x1 = st.w * 0.08;
  const x2 = st.w * 0.92;
  seg(st.svg, x1, y, x2, y, 0.28, 1);
  seg(st.svg, x1, y - 5, x1, y + 5, 0.45, 1.5);
  seg(st.svg, x2, y - 5, x2, y + 5, 0.45, 1.5);
  const fs = s >= 176 ? 15 : 12;
  label(st, '2026', x1, y + 20, { size: fs, tabular: true, color: 'rgba(255,255,255,0.4)', tracking: '0.08em' });
  label(st, '2126', x2, y + 20, { size: fs, align: 'right', tabular: true, color: 'rgba(255,255,255,0.4)', tracking: '0.08em' });
  placeMark(st, cand, s, x1 + (x2 - x1) * 0.36, y);
}

function margin(st, cand, s) {
  const ext = claimMarkExtent(cand, s);
  const cx = st.w / 2;
  const markY = st.h * 0.28;
  const y0 = markY + ext.h / 2 + 8;
  const yEnd = st.h * 0.72;
  const names = ['Gold', 'Fiat', 'Real estate', 'Shares', 'Bitcoin'];
  names.forEach((name, i) => {
    const x = st.w * (0.14 + 0.18 * i);
    seg(st.svg, cx, y0, x, yEnd, 0.30, 1.2);
    dot(st.svg, x, yEnd, 2.2, 0.55);
    if (s >= 116) label(st, name, x, yEnd + 16, { size: 10, align: 'center', color: 'rgba(255,255,255,0.42)', tracking: '0.14em' });
  });
  placeMark(st, cand, s, cx, markY);
}

function transfer(st, cand, s) {
  const cy = st.h / 2;
  const x1 = st.w * 0.10;
  const x2 = st.w * 0.90;
  dot(st.svg, x1, cy, 3, 0.6);
  dot(st.svg, x2, cy, 3, 0.6);
  seg(st.svg, x1, cy, x2, cy, 0.30, 1.5);
  placeMark(st, cand, s, x1 + (x2 - x1) * 0.56, cy);
}

const BUILDERS = { birth, 'spend-save': spendSave, carrier, journey, margin, transfer };

// ---- the sheet -------------------------------------------------------------

export function buildSheet() {
  const wrap = document.createElement('div');
  wrap.id = 'gate1-sheet';
  wrap.innerHTML = `<style>
    #gate1-sheet { position:absolute; top:0; left:0; min-width:100%; background:#000; color:#fff;
      z-index:9999; font-family:Inter,sans-serif; padding:44px 48px 64px; }
    #gate1-sheet h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase;
      color:#F7931A; margin:0 0 10px; font-weight:500; }
    #gate1-sheet p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 40px; max-width:920px; line-height:1.6; }
    #gate1-sheet h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase;
      color:rgba(255,255,255,.85); margin:48px 0 4px; font-weight:500; }
    #gate1-sheet p.construction { font-size:12px; color:rgba(255,255,255,.45); margin:0 0 22px; }
    #gate1-sheet .row { display:flex; gap:28px; align-items:flex-end; margin:0 0 30px; }
    #gate1-sheet figure { margin:0; }
    #gate1-sheet figcaption { margin-top:8px; font-size:10px; letter-spacing:.14em;
      text-transform:uppercase; color:rgba(255,255,255,.4); }
  </style>`;

  const h1 = document.createElement('h1');
  h1.textContent = 'Prototype Gate 1 — the Claim Mark · three candidates, five contexts, three scales';
  wrap.appendChild(h1);
  const note = document.createElement('p');
  note.className = 'note';
  note.textContent = 'Every cell renders through src/proto/claim-mark.js with the deck’s tokens — the selection becomes the film-wide protagonist by recording one letter there. Candidates are area-matched at each nominal scale so the sheet compares form, not weight. Line work is the grammar’s and carries no accent; orange belongs to the mark alone.';
  wrap.appendChild(note);

  const cells = [];
  for (const cand of ['a', 'b', 'c']) {
    const section = document.createElement('div');
    section.className = 'g1-candidate';
    section.dataset.candidate = cand;
    const [title, construction] = CANDIDATE_META[cand];
    const h2 = document.createElement('h2');
    h2.textContent = title;
    section.appendChild(h2);
    const p = document.createElement('p');
    p.className = 'construction';
    p.textContent = construction;
    section.appendChild(p);

    for (const ctx of CONTEXTS) {
      const row = document.createElement('div');
      row.className = 'row';
      for (const s of SCALES) {
        const { w, h } = CELL[s];
        const fig = document.createElement('figure');
        const st = stage(w, h);
        BUILDERS[ctx](st, cand, s);
        fig.appendChild(st.el);
        const cap = document.createElement('figcaption');
        cap.textContent = `${CONTEXT_LABEL[ctx]} · ${s}px`;
        fig.appendChild(cap);
        row.appendChild(fig);
        cells.push({ candidate: cand, context: ctx, scale: s });
      }
      section.appendChild(row);
    }

    // The behavior still — one per candidate, at the standard scene scale.
    const row = document.createElement('div');
    row.className = 'row';
    const fig = document.createElement('figure');
    const st = stage(CELL[116].w, CELL[116].h);
    BUILDERS.transfer(st, cand, 116);
    fig.appendChild(st.el);
    const cap = document.createElement('figcaption');
    cap.textContent = `${CONTEXT_LABEL.transfer} · 116px`;
    fig.appendChild(cap);
    row.appendChild(fig);
    section.appendChild(row);
    cells.push({ candidate: cand, context: 'transfer', scale: 116 });

    wrap.appendChild(section);
  }

  document.body.appendChild(wrap);
  return cells;
}

export default buildSheet;
