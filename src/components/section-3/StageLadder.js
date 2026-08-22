// The monetization-stages visual (R3 §A2): four stages as ascending steps
// on one rising line, left-low to right-high — deliberately not a
// horizontal rail. The rail is the historical record; this is a structural
// ascent. Same line-language as the rail: thin line, dot markers pinned on
// it, glyphs above, labels below, one vertical rhythm across stops.
//
// Per-stage states: `upcoming` (not yet part of the composition),
// `revealed`, `foundation` (the store-of-value emphasis — the only orange
// the ladder ever carries, per the color arc). Thresholds — short ticks
// crossing the line at the segment midpoints — sit dim once the stage
// below them is on the line and brighten to warm white when their gating
// logic is stated (R3.1 §B: the arch glyph that used to mark these read as
// an unexplainable half-dot at ladder scale and failed the legibility rule
// now recorded in docs/icon-grammar.md §1; a perpendicular tick on a line
// is a threshold in any reading, needs no legend, and carries the same
// three-state logic). An entity marker (a glyph, e.g. bitcoin’s) can be
// placed at a stage; a bracket can mark the early stages with the
// signature line.
//
// State-first like the EvolutionRail: applyState(state, { live })
// reconstructs everything from scratch; non-live applies snap (data-snap
// suppresses every transition for the apply). The camera is static — the
// whole ladder composes inside one frame.

import { glyph } from '../section-2/glyphs.js';

// The rising line: stops at fixed stage coordinates, the drawn line
// extending a step beyond the outer stops at both ends.
const STOPS = [
  { key: 'collectible', label: 'COLLECTIBLE', glyph: 'collectible', x: 420, y: 660 },
  { key: 'sov', label: 'STORE OF VALUE', glyph: 'through-time', x: 800, y: 563.3 },
  { key: 'moe', label: 'MEDIUM OF EXCHANGE', glyph: 'between-people', x: 1180, y: 466.7 },
  { key: 'uoa', label: 'UNIT OF ACCOUNT', glyph: 'measure', x: 1560, y: 370 }
];

const LINE = { x: 330, y: 682.9, length: 1362, angle: -14.27 };

// Threshold ticks sit at the segment midpoints, crossing the line at a
// right angle to it (the line runs at LINE.angle, so the tick runs at
// LINE.angle + 90).
const GATES = [
  { key: 'g1', x: 610, y: 611.7 },
  { key: 'g2', x: 990, y: 515 },
  { key: 'g3', x: 1370, y: 418.3 }
];

const GATE_STATES = new Set(['off', 'dim', 'bright']);

const SIGNATURE = 'Early-stage signature: few holders · thin markets · reflexive pricing.';

export function StageLadder() {
  const el = document.createElement('div');
  el.className = 's3f-ladder';
  el.dataset.visible = 'true';

  // The rise lives on a wrapper so the draw (scaleX on the inner bar)
  // never fights the rotation on one transform.
  const lineWrap = document.createElement('div');
  lineWrap.className = 's3f-ladder__linewrap';
  lineWrap.style.left = `${LINE.x}px`;
  lineWrap.style.top = `${LINE.y}px`;
  lineWrap.style.width = `${LINE.length}px`;
  lineWrap.style.transform = `rotate(${LINE.angle}deg)`;
  const line = document.createElement('div');
  line.className = 's3f-ladder__line';
  lineWrap.appendChild(line);
  el.appendChild(lineWrap);

  const stops = {};
  STOPS.forEach((spec) => {
    const stop = document.createElement('div');
    stop.className = 's3f-ladder__stop';
    stop.dataset.stage = spec.key;
    stop.dataset.state = 'upcoming';
    stop.style.left = `${spec.x}px`;
    stop.style.top = `${spec.y}px`;

    const g = document.createElement('div');
    g.className = 's3f-ladder__glyph';
    g.innerHTML = glyph(spec.glyph, 40);
    stop.appendChild(g);

    const dot = document.createElement('div');
    dot.className = 's3f-ladder__dot';
    stop.appendChild(dot);

    const label = document.createElement('div');
    label.className = 's3f-ladder__label';
    label.textContent = spec.label;
    stop.appendChild(label);

    el.appendChild(stop);
    stops[spec.key] = stop;
  });

  const gates = {};
  GATES.forEach((spec) => {
    const gate = document.createElement('div');
    gate.className = 's3f-ladder__gate';
    gate.dataset.gate = spec.key;
    gate.dataset.mark = 'off';
    gate.style.left = `${spec.x}px`;
    gate.style.top = `${spec.y}px`;
    gate.style.transform = `rotate(${LINE.angle + 90}deg)`;
    el.appendChild(gate);
    gates[spec.key] = gate;
  });

  // The early-stages bracket (3.4): a level line under the first two stop
  // columns with end upticks, the signature line beneath its midpoint.
  const bracket = document.createElement('div');
  bracket.className = 's3f-ladder__bracket';
  bracket.dataset.visible = 'false';
  el.appendChild(bracket);

  const signature = document.createElement('p');
  signature.className = 's3f-ladder__signature';
  signature.dataset.visible = 'false';
  signature.textContent = SIGNATURE;
  el.appendChild(signature);

  // The entity berth (3.7): a pinned marker above a stage’s own glyph —
  // dot beneath, entity glyph above, the rail’s glyph-and-marker sentence
  // pinned to the stage column.
  const entity = document.createElement('div');
  entity.className = 's3f-ladder__entity';
  entity.dataset.visible = 'false';
  const entityGlyph = document.createElement('div');
  entityGlyph.className = 's3f-ladder__entityglyph';
  entity.appendChild(entityGlyph);
  const entityDot = document.createElement('div');
  entityDot.className = 's3f-ladder__entitydot';
  entity.appendChild(entityDot);
  el.appendChild(entity);

  function applyState(state = {}, { live = false } = {}) {
    if (!live) {
      el.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete el.dataset.snap;
      }));
    }

    el.dataset.visible = String(state.visible !== false);
    el.dataset.line = String(Boolean(state.line));

    const stages = state.stages || {};
    Object.keys(stops).forEach((key) => {
      stops[key].dataset.state = stages[key] || 'upcoming';
    });

    // Thresholds are three-valued; anything unrecognized reads as `off`.
    const marks = state.gates || {};
    Object.keys(gates).forEach((key) => {
      const mark = marks[key];
      gates[key].dataset.mark = GATE_STATES.has(mark) ? mark : 'off';
    });

    bracket.dataset.visible = String(Boolean(state.bracket));
    signature.dataset.visible = String(Boolean(state.bracket));

    if (state.entity) {
      const at = STOPS.find((s) => s.key === state.entity.at) || STOPS[1];
      entity.style.left = `${at.x}px`;
      entity.style.top = `${at.y}px`;
      entityGlyph.innerHTML = glyph(state.entity.glyph, 36);
      entity.dataset.visible = 'true';
    } else {
      entity.dataset.visible = 'false';
    }
  }

  function destroy() {}

  return { el, applyState, destroy };
}

export default StageLadder;
