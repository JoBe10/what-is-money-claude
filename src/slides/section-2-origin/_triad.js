// The triad of 2.1–2.2 — fisherman, sandal-maker, farmer — shared by both
// slides so the reconstructed triangle of 02 is literally the same drawing
// the viewer watched fail in 01. Pure builder, no state of its own: each
// slide owns the refs it gets back and drives them through its `_applyBuild`.
//
// Placement rules (R2.1 §C, revised by R2.2 §A — the outside rule):
//   · labels sit on the outside of the shape, never crossing an edge, in
//     mirror symmetry across the vertical axis: the fisherman’s card left
//     of its dot, the sandal-maker’s right of its dot (both at one shared
//     vertical offset), the farmer’s centered below its dot (no edge below
//     it). Name row and HAS/WANTS row keep one baseline grid per block.
//   · every resting good is centered directly above its node dot at one
//     fixed offset (GOOD_LIFT) — icon anchors unchanged by the outside rule;
//   · goods in transit ride the triangle’s drawn edges at one small normal
//     offset (LANE_OFFSET) — the fs edge on its upper side, the sf edge on
//     its inner side; no free arcs. Opposing goods on one edge travel in
//     sequence, not in parallel.

import { glyph } from '../../components/section-2/glyphs.js';

// Node positions on the 1920×1080 stage (the dot is the node’s anchor).
export const TRIAD_NODES = [
  { id: 'fisherman',    name: 'FISHERMAN',    has: 'fish',    wants: 'sandals', x: 500,  y: 380 },
  { id: 'sandal-maker', name: 'SANDAL-MAKER', has: 'sandals', wants: 'grain',   x: 1420, y: 380 },
  { id: 'farmer',       name: 'FARMER',       has: 'grain',   wants: 'fish',    x: 960,  y: 770 }
];

// The three pairwise edges, in the order their failures land. One uniform
// inset shortens the drawn line at every endpoint to give the dots breathing
// room — since the outside rule (R2.2 §A) moved the side labels off the
// triangle, no edge needs a longer inset to duck under a label card.
export const TRIAD_EDGES = [
  { id: 'fs', from: 'fisherman',    to: 'sandal-maker', insetFrom: 64, insetTo: 64 },
  { id: 'ff', from: 'fisherman',    to: 'farmer',       insetFrom: 64, insetTo: 64 },
  { id: 'sf', from: 'sandal-maker', to: 'farmer',       insetFrom: 64, insetTo: 64 }
];

// The icon anchor (§C.1): a resting good centers this far above its node dot.
export const GOOD_LIFT = 72;
// The travel lane (§C.2): normal offset off the drawn edge, and how far along
// the edge a good joins and leaves the line.
const LANE_OFFSET = 30;
const LANE_INSET = 120;
const LANE_BLEND = 70;

const nodeById = (id) => TRIAD_NODES.find((n) => n.id === id);

// The resting slot of a good at a node — centered directly above the dot.
export function restSlot(nodeId) {
  const n = nodeById(nodeId);
  return { x: n.x, y: n.y - GOOD_LIFT };
}

// A travel path from one node’s rest slot to another’s, riding the edge
// between them: hop from the shelf, blend onto the lane (the edge offset by
// LANE_OFFSET toward `side`), ride the line, blend off to the destination
// shelf. side: 'outer' = away from the triangle’s centroid, 'inner' = toward
// it — chosen per edge so the lane stays clear of the label rows.
export function travelPath(fromId, toId, side = 'outer') {
  const a = nodeById(fromId);
  const b = nodeById(toId);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;

  // Pick the normal pointing toward/away from the centroid of the triad.
  const gx = 960;
  const gy = 510;
  let nx = -uy;
  let ny = ux;
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const inwardDot = nx * (gx - mx) + ny * (gy - my);
  const wantInward = side === 'inner';
  if ((inwardDot > 0) !== wantInward) { nx = -nx; ny = -ny; }

  const j1x = a.x + ux * LANE_INSET + nx * LANE_OFFSET;
  const j1y = a.y + uy * LANE_INSET + ny * LANE_OFFSET;
  const j2x = b.x - ux * LANE_INSET + nx * LANE_OFFSET;
  const j2y = b.y - uy * LANE_INSET + ny * LANE_OFFSET;
  // Blend controls sit on the lane line, so the good enters and leaves the
  // ride tangentially.
  const c1x = j1x - ux * LANE_BLEND;
  const c1y = j1y - uy * LANE_BLEND;
  const c2x = j2x + ux * LANE_BLEND;
  const c2y = j2y + uy * LANE_BLEND;
  const restA = restSlot(fromId);
  const restB = restSlot(toId);

  const f = (v) => Number(v.toFixed(1));
  return `M ${f(restA.x)} ${f(restA.y)} Q ${f(c1x)} ${f(c1y)} ${f(j1x)} ${f(j1y)} ` +
    `L ${f(j2x)} ${f(j2y)} Q ${f(c2x)} ${f(c2y)} ${f(restB.x)} ${f(restB.y)}`;
}

// Builds the triad into `root`: an SVG layer for edges, failure marks and the
// HAS→WANTS cycle arcs, plus DOM nodes for the three people. Returns refs.
export function buildTriad(root) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.classList.add('s2o-triad__svg');

  // Arrowhead for the HAS→WANTS cycle arcs.
  const defs = document.createElementNS(svgNS, 'defs');
  defs.innerHTML =
    '<marker id="s2o-cycle-arrow" viewBox="0 0 10 10" refX="7" refY="5" ' +
    'markerWidth="7" markerHeight="7" orient="auto-start-reverse">' +
    '<path d="M 1 1 L 8 5 L 1 9" fill="none" stroke="rgba(255,255,255,0.4)" ' +
    'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>';
  svg.appendChild(defs);

  const edges = {};
  TRIAD_EDGES.forEach(({ id, from, to, insetFrom, insetTo }) => {
    const a = nodeById(from);
    const b = nodeById(to);
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy);
    const x1 = a.x + (dx / len) * insetFrom;
    const y1 = a.y + (dy / len) * insetFrom;
    const x2 = b.x - (dx / len) * insetTo;
    const y2 = b.y - (dy / len) * insetTo;

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.classList.add('s2o-triad__edge');
    line.dataset.edge = id;
    const edgeLen = Math.hypot(x2 - x1, y2 - y1);
    line.style.setProperty('--len', edgeLen.toFixed(1));
    svg.appendChild(line);

    // The failure mark at the drawn line’s midpoint.
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const cross = document.createElementNS(svgNS, 'path');
    const r = 11;
    cross.setAttribute(
      'd',
      `M ${mx - r} ${my - r} L ${mx + r} ${my + r} M ${mx + r} ${my - r} L ${mx - r} ${my + r}`
    );
    cross.classList.add('s2o-triad__cross');
    cross.dataset.edge = id;
    svg.appendChild(cross);

    edges[id] = { line, cross };
  });

  // The HAS→WANTS cycle arcs (2.1 build 2): each good’s owner connected to
  // the person who wants it, bowed outside the triangle so the circulation
  // that SHOULD exist is visible around the trades that fail inside it.
  const cycle = [];
  const arcFor = {
    // fisherman’s fish → farmer wants it (bow out left/down)
    fish: { from: 'fisherman', to: 'farmer', bow: -170 },
    // sandal-maker’s sandals → fisherman wants them (bow over the top)
    sandals: { from: 'sandal-maker', to: 'fisherman', bow: -190 },
    // farmer’s grain → sandal-maker wants it (bow out right/down)
    grain: { from: 'farmer', to: 'sandal-maker', bow: -170 }
  };
  Object.entries(arcFor).forEach(([good, { from, to, bow }]) => {
    const a = nodeById(from);
    const b = nodeById(to);
    // Control point pushed outward from the triangle’s centroid.
    const cxm = (a.x + b.x) / 2;
    const cym = (a.y + b.y) / 2;
    const gx = 960;
    const gy = 510; // centroid of the three nodes
    const ox = cxm - gx;
    const oy = cym - gy;
    const olen = Math.hypot(ox, oy) || 1;
    const cx = cxm + (ox / olen) * -bow;
    const cy = cym + (oy / olen) * -bow;

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`);
    path.classList.add('s2o-triad__cyclearc');
    path.dataset.good = good;
    path.setAttribute('marker-end', 'url(#s2o-cycle-arrow)');
    svg.appendChild(path);
    cycle.push(path);
  });

  root.appendChild(svg);

  const nodes = {};
  TRIAD_NODES.forEach((n) => {
    const node = document.createElement('div');
    node.className = 's2o-triad__node';
    node.dataset.node = n.id;
    node.style.left = `${n.x}px`;
    node.style.top = `${n.y}px`;

    const dot = document.createElement('div');
    dot.className = 's2o-triad__dot';
    node.appendChild(dot);

    const card = document.createElement('div');
    card.className = 's2o-triad__card';

    const name = document.createElement('p');
    name.className = 's2o-triad__name';
    name.textContent = n.name;
    card.appendChild(name);

    const haswants = document.createElement('p');
    haswants.className = 's2o-triad__haswants';
    const hasKey = document.createElement('span');
    hasKey.className = 's2o-triad__key';
    hasKey.textContent = 'HAS';
    const hasVal = document.createElement('span');
    hasVal.className = 's2o-triad__val';
    hasVal.textContent = ` ${n.has}`;
    const sep = document.createElement('span');
    sep.className = 's2o-triad__sep';
    sep.textContent = ' · ';
    const wantsKey = document.createElement('span');
    wantsKey.className = 's2o-triad__key';
    wantsKey.textContent = 'WANTS';
    const wantsVal = document.createElement('span');
    wantsVal.className = 's2o-triad__val';
    wantsVal.textContent = ` ${n.wants}`;
    haswants.append(hasKey, hasVal, sep, wantsKey, wantsVal);
    card.appendChild(haswants);

    node.appendChild(card);
    root.appendChild(node);
    nodes[n.id] = node;
  });

  return { svg, nodes, edges, cycle };
}

// A traveling good glyph for 2.2 — a small disc carrying the good’s drawing,
// moved along its travel path via CSS offset-path.
export function goodToken(good) {
  const el = document.createElement('div');
  el.className = 's2o-triad__good';
  el.dataset.good = good;
  el.innerHTML = glyph(good, 30);
  return el;
}

export default buildTriad;
