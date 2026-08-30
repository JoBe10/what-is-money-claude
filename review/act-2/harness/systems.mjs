// Act II — the design-systems sheet builders
// (docs/p1-fix-and-act-2-systems-brief.md §3).
//
// The five ◆ candidate frames of `docs/batch-b-package.md` §3, rendered as
// full-size candidate cells through the states pipeline. These decide Act II's
// visual language AHEAD of the scripts, so every cell here is
// SCRIPT-INDEPENDENT: no cell depends on a word the presenter's essay has not
// written yet, and every word that does appear is traced to already-recorded
// film material (the architecture, the master, the batch packages). The
// provenance of each is in `systems.json`.
//
// Line grammar only where the brief says so (the funnel, the network); the
// strip rhymes with the film's own line system; the chart's data is FROZEN and
// untouchable and the candidates vary treatment only.
//
// Composition law in full (master §5): one idea per frame, negative space as a
// material, nothing touching the frame edges, no accent anywhere (none of these
// five frames carries the Claim Mark), the brightness floors, and the
// self-reference ban.

// The type registers, the line-grammar primitives and the strip's recorded
// station set are EXPORTED (31 August 2026) so `states.mjs` reuses them rather
// than transcribing the deck a second time. Nothing about any cell changed:
// the only edit was the word `export`, and the cell checks re-ran green.

import { glyph } from '/src/components/section-2/glyphs.js';
import {
  PURCHASING_POWER, PP_SERIES, PP_YEAR_MIN, PP_YEAR_MAX
} from '/src/data/purchasing-power.js';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'act2-systems-stage';

let cleanup = [];

// The cell registry, declared before the builders that fill it.
export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

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

// ---- the film's own line system, transcribed --------------------------------
//
// Stroke 1.5 with round caps, dot terminals at r 3–3.5, voices carried in the
// color alpha — the values Act I ships (src/scenes/act-1-the-unfinished-exchange
// /_exchangeStage.js `_line`, `_dot`, `GEOM.service`).

const STROKE_W = 1.5;
export const VOICE = {
  line: 0.35,          // a drawn line at full voice
  lineDim: 0.18,       // a line receded (≥ 0.5 of its landed value)
  dot: 0.7,
  dotDim: 0.3,
  labelFull: 0.75,     // a landed label
  labelSpent: 0.42,    // a spent one — 0.56 of its landed value, above the floor
  faint: 0.12          // an element that has not landed, or a population gone dark
};

export function line(svg, x1, y1, x2, y2, alpha = VOICE.line, w = STROKE_W) {
  const l = document.createElementNS(svgNS, 'line');
  l.setAttribute('x1', x1); l.setAttribute('y1', y1);
  l.setAttribute('x2', x2); l.setAttribute('y2', y2);
  l.setAttribute('stroke', `rgba(255,255,255,${alpha})`);
  l.setAttribute('stroke-width', w);
  l.setAttribute('stroke-linecap', 'round');
  svg.appendChild(l);
  return l;
}

export function dot(svg, x, y, r = 3, alpha = VOICE.dot) {
  const c = document.createElementNS(svgNS, 'circle');
  c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
  c.setAttribute('fill', `rgba(255,255,255,${alpha})`);
  svg.appendChild(c);
  return c;
}

export function pathEl(svg, d, alpha = VOICE.line, w = STROKE_W) {
  const p = document.createElementNS(svgNS, 'path');
  p.setAttribute('d', d);
  p.setAttribute('fill', 'none');
  p.setAttribute('stroke', `rgba(255,255,255,${alpha})`);
  p.setAttribute('stroke-width', w);
  p.setAttribute('stroke-linecap', 'round');
  p.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(p);
  return p;
}

export function text(st, copy, styles) {
  const el = document.createElement('p');
  el.textContent = copy;
  el.style.cssText = 'position:absolute; margin:0; ' + styles;
  st.el.appendChild(el);
  return el;
}

// The deck's registers, at the values Act I and the Prologue ship.
export const KICKER = (a = 0.5) => 'font-size:20px; font-weight:500; letter-spacing:0.32em;' +
  `text-indent:0.32em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
export const CAPS = (a = 0.75, size = 26) => `font-size:${size}px; font-weight:560;` +
  `letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
export const STATEMENT = (a = 1, size = 46) => `font-size:${size}px; font-weight:540;` +
  `letter-spacing:-0.012em; line-height:1.3; color:rgba(255,255,255,${a});`;
export const PLAIN = (a = 0.58, size = 22) => `font-size:${size}px; font-weight:460;` +
  `letter-spacing:0.005em; line-height:1.35; color:rgba(255,255,255,${a});`;

/** A grammar mark, centred on (cx, cy) at `size`, in the given voice. */
export function mark(st, name, cx, cy, size = 48, alpha = 0.75) {
  const box = document.createElement('div');
  box.style.cssText = `position:absolute; left:${cx - size / 2}px; top:${cy - size / 2}px;` +
    `width:${size}px; height:${size}px; color:rgba(255,255,255,${alpha});`;
  box.innerHTML = glyph(name, size);
  st.el.appendChild(box);
  return box;
}

// Deterministic scatter — a seeded LCG, never Math.random, so every cell is
// pixel-stable across re-renders.
export function lcg(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// =============================================================== S6-F2 · THE FUNNEL
//
// The act's one new diagrammatic system, and the frame that decides the film's
// diagram grammar. Content is the funnel's own frozen sequence (architecture,
// Scene 6 beat 2; batch-b package §2 S6): gases escape, reactives corrode,
// radioactives are lethal, the forge leaves two, scarcity leaves one.
//
// ALL THREE CANDIDATES RENDER THE SAME MID-ELIMINATION STATE, so the comparison
// is of systems and not of moments: three stages spent and receded, THE FORGE
// landed at full voice and not yet applied, SCARCITY not yet landed.

const FUNNEL_STAGES = ['GASES', 'REACTIVES', 'RADIOACTIVES', 'THE FORGE', 'SCARCITY'];
const LIVE_STAGE = 3;   // THE FORGE has landed; it has not yet run

// The periodic table's own silhouette, as the population. Column lists per
// period — this is the table's real shape, which is what makes a field of dots
// read as "every element" in one second rather than as an abstract grid.
const PERIODS = [
  [1, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  [1, 2, 13, 14, 15, 16, 17, 18],
  Array.from({ length: 18 }, (_, i) => i + 1),
  Array.from({ length: 18 }, (_, i) => i + 1),
  Array.from({ length: 18 }, (_, i) => i + 1),
  Array.from({ length: 18 }, (_, i) => i + 1)
];
const FBLOCK = Array.from({ length: 14 }, (_, i) => i + 3);   // the two f rows

// Which stage takes which slot. Positions are the real ones: the gases sit at
// the top right and along the p-block's edge; the alkali and alkaline-earth
// metals are columns 1–2; the radioactives are period 7 and the actinides, with
// technetium, promethium, polonium and astatine named where they sit. A slot
// dies once, at the earliest stage that claims it.
function stageOf(row, col, isF, fRow) {
  if (isF) return fRow === 1 ? 2 : (col === 5 ? 2 : 3);            // actinides; Pm
  if (row === 6) return 2;                                          // period 7
  const gas = (row === 0)
    || (row === 1 && col >= 15)
    || (row === 2 && col >= 17)
    || (row >= 3 && col === 18);
  if (gas) return 0;
  if (col <= 2) return 1;
  if (row === 5 && (col === 16 || col === 17)) return 2;            // Po, At
  if (row === 4 && col === 7) return 2;                             // Tc
  return 3;
}
function eachElement(fn) {
  PERIODS.forEach((cols, row) => cols.forEach((col) => fn(row, col, false, 0)));
  [0, 1].forEach((fRow) => FBLOCK.forEach((col) => fn(6 + fRow, col, true, fRow)));
}

/** The stage list, in the deck's kicker register: spent, live, and not-yet. */
function stageList(st, x, y0, gap, align = 'left') {
  FUNNEL_STAGES.forEach((name, i) => {
    if (i > LIVE_STAGE) return;                                    // not landed
    const a = i === LIVE_STAGE ? VOICE.labelFull : VOICE.labelSpent;
    text(st, name, `left:${x}px; top:${y0 + gap * i}px; text-align:${align};` + KICKER(a));
  });
}

function funnelField(st) {
  const PITCH = 30;
  const X0 = 925;      // 18 columns × 30 centred on x 1180
  const Y0 = 392;      // 7 periods + the f-block, centred on y 540
  const F_GAP = 26;
  const alive = [];
  eachElement((row, col, isF, fRow) => {
    const x = X0 + (col - 1) * PITCH;
    const y = isF ? Y0 + (7 * PITCH) + F_GAP + (fRow * PITCH) : Y0 + row * PITCH;
    const s = stageOf(row, col, isF, fRow);
    const gone = s < LIVE_STAGE;
    dot(st.svg, x, y, gone ? 2.6 : 3.4, gone ? VOICE.faint : 0.62);
    if (!gone) alive.push([x, y]);
  });
  return alive;
}

cell('s6f2-a', {
  frame: 'S6-F2', system: 'A — the element field',
  caption: 'The population is the periodic table’s own silhouette, in the set’s dot terminals: a field that reads as “every element” in one second. Each stage puts its own region out — the gases at the top right and along the p-block edge, the reactive metals in columns 1–2, the radioactives in period 7 and the actinides — and the sequence is the list at the left. Mid-elimination: three stages spent and receded, THE FORGE landed and not yet run.'
}, (st) => {
  funnelField(st);
  stageList(st, 300, 392, 78);
});

cell('s6f2-b', {
  frame: 'S6-F2', system: 'B — the descending gates',
  caption: 'The funnel as thresholds: five horizontal gates descending, each narrower than the last, the population falling through and thinning between them. The gate is the icon grammar’s own threshold language — a stroke with dot terminals, crossed rather than entered. Rejected marks settle outside the span at the floor. Mid-elimination: three gates passed, THE FORGE the live gate, the last threshold drawn but unlit and unnamed.'
}, (st) => {
  const rand = lcg(0x6F2B);
  const GATES = [
    { y: 285, w: 760 }, { y: 425, w: 600 }, { y: 565, w: 448 },
    { y: 705, w: 292 }, { y: 830, w: 150 }
  ];
  const COUNTS = [118, 106, 94, 66];       // the sequence's own true counts
  const CX = 900;
  // The bands between the gates.
  COUNTS.forEach((n, i) => {
    const top = i === 0 ? 180 : GATES[i - 1].y + 22;
    const bot = GATES[i].y - 22;
    const w = i === 0 ? GATES[0].w : GATES[i - 1].w;
    for (let k = 0; k < n; k += 1) {
      const x = CX - w / 2 + rand() * w;
      const y = top + rand() * (bot - top);
      dot(st.svg, x, y, 3, i === COUNTS.length - 1 ? 0.62 : VOICE.faint);
    }
  });
  // The rejected, settling outside each spent gate.
  GATES.slice(0, 3).forEach((g, i) => {
    const n = [12, 12, 28][i];
    for (let k = 0; k < n; k += 1) {
      const side = rand() < 0.5 ? -1 : 1;
      const x = CX + side * (g.w / 2 + 30 + rand() * 150);
      const y = g.y + 8 + rand() * 46;
      dot(st.svg, x, y, 2.6, VOICE.faint);
    }
  });
  // The gates themselves.
  GATES.forEach((g, i) => {
    const landed = i <= LIVE_STAGE;
    const a = i === LIVE_STAGE ? VOICE.line : (landed ? VOICE.lineDim : VOICE.faint);
    line(st.svg, CX - g.w / 2, g.y, CX + g.w / 2, g.y, a);
    dot(st.svg, CX - g.w / 2, g.y, 3, i === LIVE_STAGE ? VOICE.dot : VOICE.dotDim);
    dot(st.svg, CX + g.w / 2, g.y, 3, i === LIVE_STAGE ? VOICE.dot : VOICE.dotDim);
    if (i > LIVE_STAGE) return;
    text(st, FUNNEL_STAGES[i],
      `left:${CX + g.w / 2 + 44}px; top:${g.y - 14}px;` +
      KICKER(i === LIVE_STAGE ? VOICE.labelFull : VOICE.labelSpent));
  });
});

cell('s6f2-c', {
  frame: 'S6-F2', system: 'C — the tapering corridor',
  caption: 'The funnel drawn as one continuous narrowing rather than as steps: two converging lines carrying the population left to right, the stages as ticks crossing the corridor in the line’s own language (icon grammar §4.7 — a mark that names a position on a line is a tick, not a glyph). The taper is legible without any label; the labels only name the stages. Same mid-elimination state as A and B.'
}, (st) => {
  const rand = lcg(0xC0DE);
  const X_IN = 250;
  const X_OUT = 1670;
  const TICKS = [470, 710, 950, 1190, 1430];
  const topAt = (x) => 320 + ((x - X_IN) / (X_OUT - X_IN)) * 180;
  const botAt = (x) => 800 - ((x - X_IN) / (X_OUT - X_IN)) * 180;
  pathEl(st.svg, `M ${X_IN} ${topAt(X_IN)} L ${X_OUT} ${topAt(X_OUT)}`, VOICE.line);
  pathEl(st.svg, `M ${X_IN} ${botAt(X_IN)} L ${X_OUT} ${botAt(X_OUT)}`, VOICE.line);
  // The population inside, thinning as the corridor narrows.
  const SEGMENTS = [[X_IN + 20, TICKS[0], 118, VOICE.faint],
    [TICKS[0], TICKS[1], 106, VOICE.faint],
    [TICKS[1], TICKS[2], 94, VOICE.faint],
    [TICKS[2], TICKS[3], 66, 0.62]];
  SEGMENTS.forEach(([xa, xb, n, a]) => {
    for (let k = 0; k < n; k += 1) {
      const x = xa + 14 + rand() * (xb - xa - 28);
      const y = topAt(x) + 12 + rand() * (botAt(x) - topAt(x) - 24);
      dot(st.svg, x, y, 3, a);
    }
  });
  TICKS.forEach((x, i) => {
    const landed = i <= LIVE_STAGE;
    const a = i === LIVE_STAGE ? VOICE.line : (landed ? VOICE.lineDim : VOICE.faint);
    line(st.svg, x, topAt(x) - 16, x, botAt(x) + 16, a);
    if (i > LIVE_STAGE) return;
    text(st, FUNNEL_STAGES[i],
      `left:${x - 150}px; top:${botAt(x) + 34}px; width:300px; text-align:center; text-indent:0;` +
      KICKER(i === LIVE_STAGE ? VOICE.labelFull : VOICE.labelSpent));
  });
});

// ================================================================ S10-F1 · THE STRIP
//
// GOLD → CLAIM → LEDGER → BITCOIN, one gain and one dependency each.
//
// EVERY WORD IS RECORDED FILM MATERIAL — see systems.json for the per-slot
// provenance. Nothing here comes from a script that has not been written.
//
// The stations carry the GLYPH set, not renders: a strip is diagram scale, and
// the register boundary is that dark-field never enters a diagram (master §6.3).
// The presenter's C1 coin ruling and that boundary point different ways at the
// bitcoin position — flagged on the sheet and in the report, not resolved here.
//
// The strip is monochrome. Whether the CLAIM station takes the accent — it is a
// claim, and the accent is the claim's — is a real question the selection
// settles; it is flagged rather than decided.

export const STATIONS = [
  { key: 'gold', name: 'GOLD', gain: 'SCARCITY IN MATTER', dep: 'as value grows, weight grows' },
  { key: 'paper', name: 'CLAIM', gain: 'PORTABILITY', dep: 'trust moved to the issuer' },
  { key: 'ledger', name: 'LEDGER', gain: 'INSTANT TRANSFER', dep: 'the window closed' },
  { key: 'bitcoin', name: 'BITCOIN', gain: 'NON-DISCRETIONARY SUPPLY', dep: 'not yet twenty years into a hundred-year question' }
];
const LIVE_STATION = 3;   // activated one at a time; the last one is live

cell('s10f1-a', {
  frame: 'S10-F1', system: 'A — the rail',
  caption: 'One continuous line threading four stations, everything hanging off it: the mark above, the name on the line, the gain and the dependency below. It rhymes directly with Act I’s own line-and-dot-terminal grammar and with the legacy rail’s vertical rhythm, and it reads as a sequence in time. BITCOIN is the activated station; the three behind it are receded.'
}, (st) => {
  const Y = 500;
  const XS = [340, 750, 1160, 1570];
  line(st.svg, 250, Y, 1660, Y, VOICE.lineDim);
  STATIONS.forEach((s, i) => {
    const live = i === LIVE_STATION;
    const a = live ? 1 : 0.55;
    mark(st, s.key, XS[i], Y - 100, 54, 0.8 * a);
    dot(st.svg, XS[i], Y, live ? 4 : 3.2, live ? 0.9 : VOICE.dotDim);
    text(st, s.name, `left:${XS[i] - 180}px; top:${Y + 34}px; width:360px; text-align:center; text-indent:0;` + KICKER(0.55 * a));
    // The gain block is two lines tall for every station whether it needs them
    // or not, so the dependency row keeps one baseline across the strip
    // (icon grammar §4.4) and the longest gain cannot push into it.
    text(st, s.gain, `left:${XS[i] - 180}px; top:${Y + 78}px; width:360px; height:66px; text-align:center;` + CAPS(VOICE.labelFull * a, 22));
    text(st, s.dep, `left:${XS[i] - 175}px; top:${Y + 156}px; width:350px; text-align:center;` + PLAIN(0.58 * a, 20));
  });
});

cell('s10f1-b', {
  frame: 'S10-F1', system: 'B — the ledger of trades',
  caption: 'No connecting line at all: four entries stacked as rows, each with its mark and name at the left and a hairline running right. The gain sits above the rule and the dependency below it — the rule itself is the trade, and the whole strip reads as a record of four bargains rather than a journey. The film’s ledger grammar, applied to its own argument.'
}, (st) => {
  const YS = [270, 450, 630, 810];
  STATIONS.forEach((s, i) => {
    const live = i === LIVE_STATION;
    const a = live ? 1 : 0.55;
    const y = YS[i];
    mark(st, s.key, 300, y, 46, 0.8 * a);
    text(st, s.name, `left:${356}px; top:${y - 13}px;` + KICKER(0.55 * a));
    line(st.svg, 700, y, 1650, y, live ? VOICE.line : VOICE.lineDim);
    dot(st.svg, 700, y, 3, live ? VOICE.dot : VOICE.dotDim);
    text(st, s.gain, `left:720px; top:${y - 44}px;` + CAPS(VOICE.labelFull * a, 22));
    text(st, s.dep, `left:720px; top:${y + 16}px; width:900px;` + PLAIN(0.58 * a, 20));
  });
});

cell('s10f1-c', {
  frame: 'S10-F1', system: 'C — the trade drawn',
  caption: 'The trade-off drawn instead of listed: each station is a small beam pivoted on the strip’s baseline, tilted — the gain end raised, the dependency end lowered. Four beams along one baseline say “every architecture bought something and owed something” before a single word is read. Pure line grammar: strokes, a pivot dot, dot terminals.'
}, (st) => {
  const Y = 560;
  const XS = [340, 750, 1160, 1570];
  line(st.svg, 250, Y, 1660, Y, VOICE.faint);
  STATIONS.forEach((s, i) => {
    const live = i === LIVE_STATION;
    const a = live ? 1 : 0.55;
    const x = XS[i];
    const HALF = 104;
    const RISE = 36;
    mark(st, s.key, x, Y - 246, 48, 0.8 * a);
    // The beam: the gain end raised, the dependency end lowered — the trade
    // drawn. Short risers carry each end to its own label so the geometry and
    // the words are one reading rather than two.
    line(st.svg, x - HALF, Y - RISE, x + HALF, Y + RISE, live ? VOICE.line : VOICE.lineDim, 1.5);
    line(st.svg, x - HALF, Y - RISE, x - HALF, Y - RISE - 34, live ? VOICE.lineDim : VOICE.faint);
    line(st.svg, x + HALF, Y + RISE, x + HALF, Y + RISE + 34, live ? VOICE.lineDim : VOICE.faint);
    dot(st.svg, x - HALF, Y - RISE, 3.2, live ? VOICE.dot : VOICE.dotDim);
    dot(st.svg, x + HALF, Y + RISE, 3.2, live ? VOICE.dot : VOICE.dotDim);
    dot(st.svg, x, Y, live ? 4 : 3, live ? 0.9 : VOICE.dotDim);
    text(st, s.name, `left:${x - 180}px; top:${Y - 200}px; width:360px; text-align:center; text-indent:0;` + KICKER(0.55 * a));
    text(st, s.gain, `left:${x - 180}px; top:${Y - 164}px; width:360px; height:66px; text-align:center;` + CAPS(VOICE.labelFull * a, 22));
    text(st, s.dep, `left:${x - 175}px; top:${Y + 84}px; width:350px; text-align:center;` + PLAIN(0.58 * a, 20));
  });
});

// ============================================================== S9-F1 · THE NETWORK
//
// The central layer receding, a distributed validation network forming. Line
// grammar. NO TEXT ANYWHERE ON ANY OF THE THREE — which is how the brief's "no
// advocacy vocabulary anywhere on the frame" is satisfied absolutely rather
// than by careful word choice. All three render the same mid-formation moment.

cell('s9f1-a', {
  frame: 'S9-F1', system: 'A — the hub dissolving',
  caption: 'The institutional shape and its replacement in one frame: a centre with spokes to a ring, both receded to the floor, and peer-to-peer chords forming between the ring’s own nodes at full voice. Mid-formation — about two thirds of the chords are drawn. The argument is visible in the two weights: what is going out, and what is coming in. No text on the frame.'
}, (st) => {
  const CX = 960; const CY = 540; const R = 330; const N = 12;
  const pt = (i) => [CX + R * Math.cos((i / N) * Math.PI * 2 - Math.PI / 2),
    CY + R * Math.sin((i / N) * Math.PI * 2 - Math.PI / 2)];
  for (let i = 0; i < N; i += 1) {
    const [x, y] = pt(i);
    line(st.svg, CX, CY, x, y, 0.2);        // receding, not gone: the two
  }                                          // weights are the whole argument
  const rand = lcg(0x9F1A);
  for (let i = 0; i < N; i += 1) {
    for (let j = i + 1; j < N; j += 1) {
      if (rand() > 0.34) continue;
      const [x1, y1] = pt(i); const [x2, y2] = pt(j);
      line(st.svg, x1, y1, x2, y2, VOICE.line);
    }
  }
  dot(st.svg, CX, CY, 7, 0.3);
  for (let i = 0; i < N; i += 1) {
    const [x, y] = pt(i);
    dot(st.svg, x, y, 4.5, 0.8);
  }
});

cell('s9f1-b', {
  frame: 'S9-F1', system: 'B — the layer breaking',
  caption: 'The vertical reading: the central layer as one long rule across the top, breaking into segments and receding, while below it a field of independent nodes links to itself. What moves is the centre of gravity — down, and outward. Distinct from A in that nothing is arranged around a centre at all; there is a before and an after in one frame. No text on the frame.'
}, (st) => {
  // The central layer, breaking.
  const SEGS = [[300, 470], [500, 690], [720, 840], [880, 1090], [1130, 1330], [1370, 1620]];
  SEGS.forEach(([a, b], i) => line(st.svg, a, 320, b, 320, i % 2 ? 0.12 : 0.24));
  SEGS.forEach(([a, b]) => { dot(st.svg, a, 320, 2.8, 0.18); dot(st.svg, b, 320, 2.8, 0.18); });
  // The field below. Placed on an irregular lattice rather than scattered: a
  // random field leaves islands, and an island is a different claim from the
  // one this frame makes. Every node has a near neighbour; the mesh is whole.
  const rand = lcg(0x9F1B);
  const LATTICE = [
    [430, 560], [720, 560], [1010, 560], [1300, 560], [1560, 560],
    [570, 710], [860, 710], [1150, 710], [1440, 710],
    [430, 855], [1010, 855], [1560, 855]
  ];
  const NODES = LATTICE.map(([x, y]) => [x + (rand() - 0.5) * 44, y + (rand() - 0.5) * 40]);
  NODES.forEach(([x1, y1], i) => {
    NODES.forEach(([x2, y2], j) => {
      if (j <= i) return;
      if (Math.hypot(x2 - x1, y2 - y1) > 340) return;
      line(st.svg, x1, y1, x2, y2, VOICE.line);
    });
  });
  NODES.forEach(([x, y]) => dot(st.svg, x, y, 4.5, 0.8));
});

cell('s9f1-c', {
  frame: 'S9-F1', system: 'C — the record, copied',
  caption: 'Validation drawn as replication: the record itself is a small stack of ruled lines, and the frame holds one of them receded at the left — the institution’s single copy — and seven identical copies distributed and linked. The mark that repeats is the argument; nothing has to be labelled for “the same record, held independently” to read. No text on the frame.'
}, (st) => {
  // The record mark: an entry with a spine and three ruled lines — big enough
  // to read as a record rather than as a dash.
  const record = (x, y, alpha) => {
    line(st.svg, x - 34, y - 16, x - 34, y + 16, alpha);
    line(st.svg, x - 34, y - 12, x + 34, y - 12, alpha);
    line(st.svg, x - 34, y, x + 34, y, alpha);
    line(st.svg, x - 34, y + 12, x + 16, y + 12, alpha);
  };
  // Placed rather than scattered: a cluster whose links stay local, so the
  // frame reads as a mesh of copies and never encloses empty space.
  const COPIES = [
    [1100, 540], [900, 400], [1160, 356], [1352, 500],
    [1256, 706], [996, 726], [820, 596]
  ];
  COPIES.forEach(([x1, y1], i) => {
    COPIES.forEach(([x2, y2], j) => {
      if (j <= i) return;
      if (Math.hypot(x2 - x1, y2 - y1) > 300) return;
      line(st.svg, x1, y1, x2, y2, VOICE.line);
    });
  });
  // The institution's single copy, left behind and receding.
  record(360, 540, VOICE.faint);
  COPIES.forEach(([x, y], i) => record(x, y, i < 5 ? 0.62 : 0.34));
});

// ============================================================ S5-F3 · THE EVIDENCE
//
// The dated-fact treatment, designed as a SYSTEM because it returns for every
// dated fact in the film. Each candidate is rendered twice: once on the Zanzibar
// specimen (place · date · fact — the S5-F3 frame itself) and once on the 1971
// specimen (date · fact, no place), which is how the system has to degrade.
// Both specimens are recorded film material; nothing is invented, and the 1971
// cells are system proofs rather than Scene 8 style frames.

const SPECIMENS = {
  zanzibar: {
    place: 'ZANZIBAR', date: '1800s',
    fact: 'Shiploads of cheaper imported cowries collapsed the shell rate.'
  },
  severance: {
    place: '', date: '1971',
    fact: 'When redemption was demanded, the window closed.'
  }
};

function evidenceA(st, sp) {
  const head = sp.place ? `${sp.place} · ${sp.date}` : sp.date;
  text(st, head, `left:360px; top:428px; width:1200px; text-align:center;` + KICKER(0.5));
  line(st.svg, 860, 486, 1060, 486, VOICE.lineDim);
  text(st, sp.fact, `left:360px; top:534px; width:1200px; text-align:center;` + STATEMENT(1, 46));
}

function evidenceB(st, sp) {
  const y = 470;
  text(st, sp.date, `left:240px; top:${y}px; width:300px; text-align:left; text-indent:0;` + KICKER(0.62));
  if (sp.place) {
    text(st, sp.place, `left:240px; top:${y + 34}px; width:300px; text-align:left; text-indent:0;` + KICKER(0.42));
  }
  line(st.svg, 580, 430, 580, 650, VOICE.lineDim);
  text(st, sp.fact, `left:640px; top:452px; width:1040px;` + STATEMENT(1, 46));
}

function evidenceC(st, sp) {
  line(st.svg, 240, 560, 1680, 560, VOICE.lineDim);
  if (sp.place) text(st, sp.place, `left:240px; top:512px;` + KICKER(0.5));
  text(st, sp.date, `left:1180px; top:512px; width:500px; text-align:right; text-indent:0;` + KICKER(0.5));
  text(st, sp.fact, `left:240px; top:606px; width:1440px; text-align:center;` + STATEMENT(1, 46));
}

const EVIDENCE = [
  ['a', 'A — the centred dateline', evidenceA,
    'Place and date as one kicker line over a short rule, the fact centred beneath at statement scale. The most restrained of the three: the frame is the fact, and the citation is a whisper above it. Degrades to date-only without moving anything.'],
  ['b', 'B — the hanging citation', evidenceB,
    'The citation hangs in the left margin against a vertical hairline and the fact sets left-aligned beside it — a marginal reference rather than a caption. The asymmetry gives the fact a longer line and leaves the right of the frame open. Degrades by dropping the place line; the hairline holds the composition.'],
  ['c', 'C — the ruled entry', evidenceC,
    'The film’s ledger grammar turned on its own evidence: one hairline the width of the frame, place at its left end and date at its right, the fact centred below. It reads as a record being entered, which is what a dated fact is. Degrades to a single right-hand date.']
];

EVIDENCE.forEach(([k, system, build, note]) => {
  cell(`s5f3-${k}`, {
    frame: 'S5-F3', system,
    caption: `${note} — Specimen: ZANZIBAR · 1800s (architecture, Scene 5 beat 5).`
  }, (st) => build(st, SPECIMENS.zanzibar));
  cell(`s5f3-${k}-1971`, {
    frame: 'S5-F3', system: `${system} · system proof`,
    caption: `The same system carrying the film’s second dated fact — 1971, which has a date and no place. This cell exists to show the system degrading; the Scene 8 frame itself belongs to Batch B. ${note}`
  }, (st) => build(st, SPECIMENS.severance));
});

// =============================================================== S8-F2 · THE CHART
//
// The four-currency purchasing-power chart at film grade. THE DATA IS FROZEN
// AND UNTOUCHABLE: every candidate reads `PURCHASING_POWER` and `PP_SERIES`
// from src/data/purchasing-power.js, plots one vertex per observed year (the
// legacy's own rule — "the line is the record, not a curve fit"), and keeps the
// frozen draw order and per-series alpha, which is where the emphasis lives.
// The candidates vary axes, weight and labeling restraint, and nothing else.

const SERIES = PP_SERIES.map((s) => ({ ...s, values: PURCHASING_POWER[s.id] }));
const PLOT = { x: 360, y: 300, w: 1200, h: 420, top: 105 };

const px = (i, n) => PLOT.x + (i / (n - 1)) * PLOT.w;
const py = (v) => PLOT.y + PLOT.h - (v / PLOT.top) * PLOT.h;

function seriesPaths(st, weight) {
  SERIES.forEach(({ values, alpha }) => {
    const d = values.map((v, i) => `${px(i, values.length).toFixed(1)} ${py(v).toFixed(1)}`);
    pathEl(st.svg, `M ${d.join(' L ')}`, alpha, weight);
  });
}

// The four series end within 25px of each other on this scale, so their labels
// would overlap at any readable size. The dot stays on the datum; the label is
// pushed to the nearest free slot on a 30px ladder and a hairline leader ties
// it back. Nothing about the data moves — only where its name is written.
function terminals(st, withValue) {
  const rows = SERIES.map(({ id, values, alpha }) => {
    const v = values[values.length - 1];
    return { id, v, alpha, x: px(values.length - 1, values.length), y: py(v) };
  }).sort((a, b) => a.y - b.y);
  let last = -Infinity;
  rows.forEach((r) => {
    r.labelY = Math.max(r.y, last + 30);
    last = r.labelY;
  });
  rows.forEach((r) => {
    dot(st.svg, r.x, r.y, 3.2, r.alpha);
    if (Math.abs(r.labelY - r.y) > 1) {
      line(st.svg, r.x + 8, r.y, r.x + 26, r.labelY, VOICE.faint, 1);
    }
    const copy = withValue ? `${r.id}   ${r.v.toFixed(1)}` : r.id;
    text(st, copy, `left:${r.x + 34}px; top:${r.labelY - 13}px;` + KICKER(Math.max(0.42, r.alpha * 0.8)));
  });
}

cell('s8f2-a', {
  frame: 'S8-F2', system: 'A — the bare fall',
  caption: 'No axes, no gridlines, no frame — four lines leaving one origin and falling, and nothing else on the stage. The only marks are the origin’s note and the four terminals with their end values. Maximum restraint: the shape of the record is the whole argument, and every line the eye can see is data.'
}, (st) => {
  seriesPaths(st, 1.6);
  dot(st.svg, PLOT.x, py(100), 3.2, 0.5);
  text(st, '1971 = 100', `left:${PLOT.x - 260}px; top:${py(100) - 13}px; width:240px; text-align:right; text-indent:0;` + KICKER(0.5));
  terminals(st, true);
});

cell('s8f2-b', {
  frame: 'S8-F2', system: 'B — the one line that matters',
  caption: 'A single hairline at the index level the four series start from, running the width of the plot, and the four lines falling away beneath it. One gridline, chosen because it is the argument: every line, including the strongest, ends far below where it began. Years marked only at the two ends.'
}, (st) => {
  line(st.svg, PLOT.x, py(100), PLOT.x + PLOT.w, py(100), VOICE.lineDim);
  text(st, '1971 = 100', `left:${PLOT.x - 260}px; top:${py(100) - 13}px; width:240px; text-align:right; text-indent:0;` + KICKER(0.5));
  seriesPaths(st, 1.6);
  terminals(st, true);
  text(st, String(PP_YEAR_MIN), `left:${PLOT.x - 100}px; top:${PLOT.y + PLOT.h + 30}px; width:200px; text-align:center; text-indent:0;` + KICKER(0.42));
  text(st, String(PP_YEAR_MAX), `left:${PLOT.x + PLOT.w - 100}px; top:${PLOT.y + PLOT.h + 30}px; width:200px; text-align:center; text-indent:0;` + KICKER(0.42));
});

cell('s8f2-c', {
  frame: 'S8-F2', system: 'C — the framed record',
  caption: 'The conventional reading in the deck’s hand: an L-frame with sparse ticks — 0, 50 and 100 on the value axis, the two end years below — and the four lines inside it. It gives the viewer a scale to read against, at the cost of adding chrome the other two refuse. The most legible and the least austere.'
}, (st) => {
  line(st.svg, PLOT.x, PLOT.y - 10, PLOT.x, PLOT.y + PLOT.h, VOICE.lineDim);
  line(st.svg, PLOT.x, PLOT.y + PLOT.h, PLOT.x + PLOT.w + 10, PLOT.y + PLOT.h, VOICE.lineDim);
  [0, 50, 100].forEach((v) => {
    line(st.svg, PLOT.x - 10, py(v), PLOT.x, py(v), VOICE.lineDim);
    text(st, String(v), `left:${PLOT.x - 120}px; top:${py(v) - 13}px; width:96px; text-align:right; text-indent:0;` + KICKER(0.42));
  });
  seriesPaths(st, 1.6);
  terminals(st, false);
  text(st, String(PP_YEAR_MIN), `left:${PLOT.x - 100}px; top:${PLOT.y + PLOT.h + 30}px; width:200px; text-align:center; text-indent:0;` + KICKER(0.42));
  text(st, String(PP_YEAR_MAX), `left:${PLOT.x + PLOT.w - 100}px; top:${PLOT.y + PLOT.h + 30}px; width:200px; text-align:center; text-indent:0;` + KICKER(0.42));
  text(st, '1971 = 100', `left:${PLOT.x}px; top:${PLOT.y - 76}px; width:400px; text-indent:0;` + KICKER(0.5));
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
  return Object.fromEntries(Object.keys(CELLS).map((id) => {
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
