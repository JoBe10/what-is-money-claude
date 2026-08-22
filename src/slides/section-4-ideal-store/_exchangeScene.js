// The exchange scene — slides 4.03–4.05, told in the deck's line language
// (R7.1 §C1). Deliberately the same construction as Section 2's triad: node
// dots with their names on the outside of the shape, one thin edge between
// them inset at both ends to give the dots air, and goods that ride the drawn
// edge rather than floating across free space.
//
// The rhyme is the argument. Section 2 showed exchange failing between three
// people because no good was salable enough to bridge them; Section 4 opens on
// exchange *succeeding* between two — the same drawing, one wall removed. The
// viewer has seen this diagram before and does not need to be taught it again.
//
// Scope narrowed at R7.2: this scene is 4.04's alone. 4.03 tells the surgeon's
// hour on the dark-field register now (§9.4.9 — sensory concreteness is that
// beat's argument), and the abstraction into two nodes and an edge is the first
// move 4.04 makes rather than the frame 4.03 opens on. The construction is
// unchanged; only the slide that speaks it moved.

import { glyph } from '../../components/section-2/glyphs.js';

// Node anchors on the 1920×1080 stage, mirror-symmetric about center. The band
// sits in the frame's upper third (R7.2 §C2): the mechanism is one half of
// 4.04, and the goods the claim cannot yet reach are the other, so the scene
// gives up the middle of the stage to make room for them.
export const EXCHANGE_NODES = [
  { id: 'surgeon', name: 'SURGEON', x: 600, y: 380 },
  { id: 'patient', name: 'PATIENT', x: 1320, y: 380 }
];

// The drawn edge is shortened at both ends by the same inset the triad uses.
const EDGE_INSET = 78;
// A resting good centers this far above its node dot — Section 2's GOOD_LIFT.
const GOOD_LIFT = 78;

const nodeById = (id) => EXCHANGE_NODES.find((n) => n.id === id);

export function edgeGeometry() {
  const a = nodeById('surgeon');
  const b = nodeById('patient');
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  return {
    x1: a.x + ux * EDGE_INSET,
    y1: a.y + uy * EDGE_INSET,
    x2: b.x - ux * EDGE_INSET,
    y2: b.y - uy * EDGE_INSET
  };
}

// Where a good rests at a node — centered directly above its dot, which is
// Section 2's icon anchor rule. A good that stops short of its node reads as
// dropped in transit rather than delivered.
export function restSlot(nodeId) {
  const n = nodeById(nodeId);
  return { x: n.x, y: n.y - GOOD_LIFT };
}

// The path a good travels between the two rest slots. `dir` 'forward' runs
// surgeon → patient (the service delivered), 'back' runs patient → surgeon
// (the claim returning, 4.04). The ride bows slightly above the edge so the
// good is visibly traveling over the line rather than along it.
export function travelPath(dir = 'forward') {
  const a = restSlot(dir === 'forward' ? 'surgeon' : 'patient');
  const b = restSlot(dir === 'forward' ? 'patient' : 'surgeon');
  const f = (v) => Number(v.toFixed(1));
  const cx = (a.x + b.x) / 2;
  const cy = Math.min(a.y, b.y) - 66;
  return `M ${f(a.x)} ${f(a.y)} Q ${f(cx)} ${f(cy)} ${f(b.x)} ${f(b.y)}`;
}

// Builds the two nodes and the edge into `root`. Returns refs the slide drives.
export function buildExchange(root, { names = true } = {}) {
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.classList.add('s4-exchange__svg');

  const { x1, y1, x2, y2 } = edgeGeometry();
  const edge = document.createElementNS(svgNS, 'line');
  edge.setAttribute('x1', x1);
  edge.setAttribute('y1', y1);
  edge.setAttribute('x2', x2);
  edge.setAttribute('y2', y2);
  edge.classList.add('s4-exchange__edge');
  edge.style.setProperty('--len', Math.hypot(x2 - x1, y2 - y1).toFixed(1));
  svg.appendChild(edge);
  root.appendChild(svg);

  const nodes = {};
  EXCHANGE_NODES.forEach((n) => {
    const node = document.createElement('div');
    node.className = 's4-exchange__node';
    node.dataset.node = n.id;
    node.style.left = `${n.x}px`;
    node.style.top = `${n.y}px`;

    const dot = document.createElement('div');
    dot.className = 's4-exchange__dot';
    node.appendChild(dot);

    if (names) {
      // The outside rule: names sit below the dots, where no edge runs.
      const name = document.createElement('p');
      name.className = 's4-exchange__name';
      name.textContent = n.name;
      node.appendChild(name);
    }

    root.appendChild(node);
    nodes[n.id] = node;
  });

  return { svg, edge, nodes };
}

// A good riding the lane: the grammar glyph in a small carrier div that the
// slide animates along `travelPath`.
export function goodToken(name, size = 46) {
  const el = document.createElement('div');
  el.className = 's4-exchange__good';
  el.dataset.good = name;
  el.innerHTML = glyph(name, size);
  return el;
}

export default buildExchange;
