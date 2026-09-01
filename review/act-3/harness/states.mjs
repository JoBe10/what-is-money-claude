// Act III — the beat-state sheet builders (the Act III states brief §2).
//
// All 25 beats of Scenes 11–15, rendered full-size at 1920×1080 through the
// states pipeline, under the full-coverage rule. The beat map is
// `docs/batch-c-package.md` §1, FROZEN 2 September 2026 at the installed
// scripts' own `[→]` counts: S11 5 · S12 4 · S13 6 · S14 4 · S15 6 = 25.
//
// THIS SHEET STAGES THE APPROVED KICKOFF AND DESIGNS NOTHING. The ruled map
// (`docs/act-3-provenance.md`, 2 September 2026) has no live NEW frame —
// 3 PORT · 3 ADAPT · the coordination-scales row recorded as not built — so
// there are no candidates anywhere on this sheet. Where a port or an adapt
// leaves something genuinely underdetermined, the cell stands ONE honest
// render and carries a plain-English flag in its caption; nothing is decided
// silently.
//
// EVERY CELL CARRIES ITS PROVENANCE CLASS AND IS BUILT BY IT:
//
//   · PORT   — the named legacy treatment, transplanted. Where the treatment
//              is a live component (StageLadder, LayerDiagram, ClaimObject)
//              the CELL MOUNTS THE COMPONENT ITSELF; where it is a slide's
//              own composition (the triad, the split columns) the cell
//              rebuilds that slide's DOM against THE SAME CSS CLASSES, so
//              the legacy stylesheet does the placing.
//   · ADAPT  — exactly the one named change, and nothing else:
//              S12-F1 — the Argentina evidence staged in the film's
//              dated-fact grammar (the approved S5-F3 treatment) instead of
//              the legacy kicker;
//              S13-F1 — the ladder's stage marks become dark-field renders
//              at lineup scale, an object sequence (the standing 30 Aug
//              ruling). THE REGISTER BOUNDARY IS THIS FRAME'S FIRST TEST
//              (docs/act-3-provenance.md §2): every render stands ABOVE the
//              rising line in the rails-law band box (188 × 188, contain,
//              own aspect), no render ever on the drawn line, and the dots,
//              ticks, labels and lines keep the ladder's drawn grammar
//              unchanged;
//              S14-F1 — the coffee_cup render at display scale against the
//              triad.
//
// THE TRIAD IS THE ACT'S HOME BASE (the approved kickoff §2): drawn in S11,
// split into the columns in S12 (the heads are the jobs re-stated:
// PRICED IN = unit, PAID IN = medium, SAVED IN = store), risen through by
// the ladder in S13 (the stage labels ARE the jobs), returned to in S14, and
// left through the STORE corner into the tower in S15. Recede/return seams
// follow the Act II overlay grammar: an interlude world enters over the
// receded home frame (`.s2o-rail[data-dimmed]`'s recorded voices — deep 0.08
// for a full overlay world, 0.35 for a still's readable recession, the same
// wiring note the rail sheet recorded).
//
// THE CLAIM THROUGH-LINE (the brief §3): the ClaimObject returns to the
// screen at S15 b6 — the held question — and NOWHERE EARLIER in the act.
// S11's legacy center token (1.2's luminous disc) therefore cannot port
// as-is; see s11-b1's flag.
//
// THE LADDER'S STAGE-MARK ASSIGNMENTS (docs/act-3-provenance.md §2):
// collectible = `single_cowrie` (presenter-ruled, the brief §2). The
// manifest names no assignment for the other three positions, so this sheet
// stands one honest render at each, chosen from the film's own record and
// flagged: store of value = `gold`, medium of exchange = `coinage`,
// unit of account = `ledger`. One word changes any of them.
//
// Composition law in full (master §5): one idea per frame, negative space as
// a material, nothing touching the frame edges, the brightness floors, the
// display rule, the register boundary, and the self-reference ban. The
// accent appears only where ruled: the ladder's foundation state, the
// tower's base, the disc's return.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { StageLadder } from '/src/components/section-3/StageLadder.js';
import { LayerDiagram } from '/src/components/section-3/LayerDiagram.js';
import { ClaimObject } from '/src/components/section-4/ClaimObject.js';
import { glyph } from '/src/components/section-2/glyphs.js';
import {
  text, KICKER, CAPS, STATEMENT
} from '/review/act-2/harness/systems.mjs';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'act3-states-stage';

let cleanup = [];

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
  // `.s3f` is the legacy section root — opaque black, inset 0. Carrying it
  // (with the Act II roots) is what lets a ported cell rebuild a legacy
  // slide's DOM and have the legacy stylesheet place it exactly
  // (review/act-2/harness/states.mjs §stage, verbatim).
  el.className = 's2o s3f s4-opening';
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

// A stage layer: the overlay grammar's unit of recession. A whole home frame
// recedes as one layer (the recorded exception to the brightness floor — a
// layer that has given the frame to a superseding layer, master §5 rule 10).
const RECEDE = { none: 1, statement: 0.35, deep: 0.08 };
function layer(st, { classes = '', voice = 1 } = {}) {
  const el = document.createElement('div');
  if (classes) el.className = classes;
  el.style.cssText = `position:absolute; inset:0; background:transparent; opacity:${voice};`;
  st.el.appendChild(el);
  return el;
}

// The photograph box — the Act I stage's own dark-field handling: the
// register's reveal transition disabled so the still is the settled state
// (review/act-2/harness/states.mjs `photo`, verbatim; `into` names the layer).
function photo(into, { subject, box: [x, y, w, h], alt, o = 1 }) {
  const df = DarkFieldImage({ name: subject, width: w, height: h, alt });
  df.el.dataset.visible = 'true';
  df.el.style.transition = 'none';
  df.el.style.position = 'absolute';
  df.el.style.left = `${x}px`;
  df.el.style.top = `${y}px`;
  df.el.style.opacity = String(o);
  into.appendChild(df.el);
  return df.el;
}

// The rails-law band box as amended by r2.5 (AGENTS.md §6): ONE SHARED BOX,
// both axes capped at 188, each render in a box of its own aspect scaled to
// fit inside it. The ladder is drawn at world scale (its geometry mirrors
// EvolutionRail's proportions), so the box applies at 1:1.
const BAND = 188;
const bandBox = (ar) => {
  const h = Math.min(BAND, BAND / ar);
  return [h * ar, h];
};

// The deck's statement slot, centred (review/act-2 states `statement`).
function statement(st, copy, { top = 812, size = 46, a = 1 } = {}) {
  return text(st, copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` +
    STATEMENT(a, size));
}

// ====================================================== S11-F1 · THE TRIAD (PORT)
//
// `3-01-the-three-functions`' own DOM against its own classes: the spokes,
// the three job entries with their grammar demonstrations (through-time — a
// time gap; between-people — a hand-off; measure — a shared measuring
// stick), the continuity line. THE CENTER IS THE FLAGGED EXCEPTION: the
// legacy center is literally 1.2's luminous token — the disc's identity —
// and the presenter's thread ruling (the brief §3) reserves the disc for the
// held question. This sheet stands the token's FOOTPRINT in the line
// grammar instead: a thin 120px circle at the token's own position and
// scale, a dot terminal at its center, no fill, no accent. See s11-b1's flag.

const JOBS = [
  { key: 'sov', glyph: 'through-time', name: 'STORE OF VALUE', sub: 'moves value through time.' },
  { key: 'moe', glyph: 'between-people', name: 'MEDIUM OF EXCHANGE', sub: 'moves value between people.' },
  { key: 'uoa', glyph: 'measure', name: 'UNIT OF ACCOUNT', sub: 'measures value.' }
];
const CONTINUITY =
  'Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside.';

function triad(st, { jobs = 3, hub = true, continuity = false, voice = 1, lit = null } = {}) {
  const L = layer(st, { classes: 's3f-functions-layer', voice });
  if (hub) {
    // The token's footprint: the legacy `--small` token is 120px centred at
    // (960, 400) — `.s1q-token`'s 50%/−60px margins with
    // `.s3f-functions__token { top: 400px }`, which is also the spokes' own
    // axis. The ring takes its exact box; the terminal marks the good.
    const ring = document.createElement('div');
    ring.style.cssText = 'position:absolute; left:900px; top:340px; width:120px; height:120px;' +
      'border:1.5px solid rgba(255,255,255,0.35); border-radius:50%; box-sizing:border-box;';
    L.appendChild(ring);
    const c = document.createElement('div');
    c.style.cssText = 'position:absolute; left:955.5px; top:395.5px; width:9px; height:9px;' +
      'border-radius:50%; background:rgba(255,255,255,0.7);';
    L.appendChild(c);
  }
  JOBS.forEach((spec, i) => {
    if (i >= jobs) return;
    const spoke = document.createElement('div');
    spoke.className = 's3f-functions__spoke';
    spoke.dataset.fn = spec.key;
    spoke.dataset.visible = 'true';
    L.appendChild(spoke);

    const fn = document.createElement('div');
    fn.className = 's3f-functions__fn';
    fn.dataset.fn = spec.key;
    fn.dataset.visible = 'true';
    if (lit) fn.style.opacity = spec.key === lit ? '1' : '0.55';
    const g = document.createElement('div');
    g.className = 's3f-functions__glyph';
    g.innerHTML = glyph(spec.glyph, 56);
    fn.appendChild(g);
    const t = document.createElement('p');
    t.className = 's3f-functions__text';
    const name = document.createElement('span');
    name.className = 's3f-functions__name';
    name.textContent = spec.name;
    const sub = document.createElement('span');
    sub.className = 's3f-functions__sub';
    sub.textContent = ` — ${spec.sub}`;
    t.append(name, sub);
    fn.appendChild(t);
    L.appendChild(fn);
  });
  if (continuity) {
    const p = document.createElement('p');
    p.className = 's3f-functions__continuity';
    p.dataset.visible = 'true';
    p.textContent = CONTINUITY;
    L.appendChild(p);
  }
  return L;
}

// The home base in its condensed register: the three job names on one row —
// the settled record the overlay grammar keeps beneath a sensory landing,
// the way the rail kept its world rows beneath a featured moment.
function triadRow(st, { lit = null, y = 940 } = {}) {
  const XS = [340, 960, 1580];
  JOBS.forEach((spec, i) => {
    const on = lit === spec.key;
    text(st, spec.name,
      `left:${XS[i] - 260}px; top:${y}px; width:520px; text-align:center; text-indent:0;` +
      CAPS(on ? 0.95 : 0.42, 24));
  });
}

// =============================================== S12-F1 · THE SPLIT (ADAPT)
//
// `3-02-the-functions-separate`'s own DOM against its own classes. The one
// ruled change: the Argentina evidence lands in the film's dated-fact
// grammar (the approved S5-F3 treatment) instead of the legacy kicker;
// everything else — heads, cells, marks, words, principle — is the port.

const COLS = ['PRICED IN', 'PAID IN', 'SAVED IN'];
const ARGENTINA_CELLS = [
  { marks: [{ text: 'USD' }], word: 'dollars' },
  { marks: [{ text: 'ARS' }], word: 'pesos' },
  { marks: [{ text: 'USD' }, { glyph: 'brick' }], word: 'dollars · real estate' }
];
// The household beat's row (the architecture, Scene 12 beat 1: income,
// prices, payments in fiat; savings branch elsewhere). The word rows are
// drafted from the installed script — flagged for the presenter's word pass.
const HOUSEHOLD_CELLS = [
  { marks: [], word: 'one money' },
  { marks: [], word: 'the same money' },
  { marks: [], word: 'property · shares · gold' }
];
const LEGACY_KICKER = 'Argentina, five decades.';
// The legacy principle with the act's own word — "jobs" for "functions",
// following the installed script; flagged for the word pass.
const PRINCIPLE_SPLIT =
  'The jobs are separable — across goods, and across time. A good can be money in one job before it’s money in the others.';

function split(st, { cells = null, kicker = false, principle = false, voice = 1 } = {}) {
  const L = layer(st, { classes: 's3f-separate', voice });
  L.dataset.live = 'false';
  COLS.forEach((head, i) => {
    const h = document.createElement('p');
    h.className = 's3f-separate__head';
    h.dataset.col = String(i);
    h.dataset.visible = 'true';
    h.textContent = head;
    L.appendChild(h);
  });
  if (cells) {
    cells.forEach((spec, i) => {
      const c = document.createElement('div');
      c.className = 's3f-separate__cell';
      c.dataset.col = String(i);
      c.dataset.visible = 'true';
      const glyphs = document.createElement('div');
      glyphs.className = 's3f-separate__glyphs';
      spec.marks.forEach((mark) => {
        const m = document.createElement('div');
        if (mark.text) {
          m.className = 's3f-separate__mark';
          m.textContent = mark.text;
        } else {
          m.className = 's3f-separate__glyph';
          m.innerHTML = glyph(mark.glyph, 56);
        }
        glyphs.appendChild(m);
      });
      c.appendChild(glyphs);
      const w = document.createElement('p');
      w.className = 's3f-separate__word';
      w.textContent = spec.word;
      c.appendChild(w);
      L.appendChild(c);
    });
  }
  if (kicker) {
    const k = document.createElement('p');
    k.className = 's3f-separate__kicker';
    k.dataset.visible = 'true';
    k.textContent = LEGACY_KICKER;
    L.appendChild(k);
  }
  if (principle) {
    const p = document.createElement('p');
    p.className = 's3f-separate__principle';
    p.dataset.visible = 'true';
    p.textContent = PRINCIPLE_SPLIT;
    L.appendChild(p);
  }
  return L;
}

// The dated-fact grammar — the approved S5-F3 evidence treatment, THE TYPE
// TO THE VALUE (review/act-2/harness/states.mjs `evidence`, verbatim): the
// place kicker, the date at 128px/650/−0.02em tabular, the fact at
// 33px/460/1.45/−0.008em.
function evidence(st, { place, date, fact }) {
  if (place) {
    text(st, place, 'left:0; right:0; top:372px; text-align:center; text-indent:0;' + KICKER(0.5));
  }
  text(st, date,
    `left:0; right:0; top:${place ? 424 : 400}px; text-align:center; text-indent:0;` +
    'font-size:128px; font-weight:650; letter-spacing:-0.02em;' +
    'font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);');
  text(st, fact,
    `left:300px; right:300px; top:${place ? 634 : 610}px; text-align:center; text-indent:0;` +
    'font-size:33px; font-weight:460; line-height:1.45; letter-spacing:-0.008em;' +
    'color:rgba(255,255,255,1);');
}

// The Argentina specimen. Every string is recorded film material: the place
// and span are the legacy kicker's own words (`3-02`; SOURCES WIM-AR-001),
// the fact is the architecture's own Scene 12 content phrase.
const ARGENTINA = {
  place: 'ARGENTINA',
  date: 'five decades',
  fact: 'Priced in dollars. Paid in pesos. Saved in dollars and bricks — across administrations of every stripe.'
};

// ============================================== S13-F1 · THE LADDER (ADAPT)
//
// `StageLadder` MOUNTED — the component the legacy slides run, at the states
// they run it — with exactly the one ruled change applied: each stop's
// grammar glyph is removed and the stage's dark-field render stands above
// the stop in the rails-law band box, bottom-aligned at the stop's own
// clearance, so the ascent reads as an object sequence. The line, dots,
// threshold ticks, labels, and the foundation state are the component's own,
// untouched. NO RENDER STANDS ON THE DRAWN LINE — the box bottoms sit 64px
// above each stop, and the rising segment clears every box (measured: ≥40px
// at the steepest corner). This is the register boundary cleared as the
// frame's FIRST test (docs/act-3-provenance.md §2).

const LADDER_STOPS = {
  collectible: [420, 660], sov: [800, 563.3], moe: [1180, 466.7], uoa: [1560, 370]
};
const STAGE_RENDERS = {
  collectible: { subject: 'single_cowrie', ar: 1122 / 1402, alt: 'A single cowrie shell' },
  sov: { subject: 'gold', ar: 1672 / 941, alt: 'A cast gold bar' },
  moe: { subject: 'coinage', ar: 1672 / 941, alt: 'A small stack of ancient hammered coins' },
  uoa: { subject: 'ledger', ar: 4 / 3, alt: 'A bound ledger' }
};
const BAND_CLEAR = 64;

// The arrival-line rule (AGENTS.md §6), applied to the ladder as the brief
// orders: every stage arrival carries a line beneath it, in the installed
// scripts' own words, at the rail's own row register (17px/1.45 on the 218px
// measure). Collectible and store of value speak S13's script; medium and
// unit speak S11's own job lines.
const STAGE_LINES = {
  collectible: 'Held by a few people for their own strange reasons.',
  sov: 'A place to park purchasing power on purpose.',
  moe: 'The thing both sides of a trade will take.',
  uoa: 'The measuring stick of value itself.'
};

const stageState = (revealed, foundation) => {
  const keys = ['collectible', 'sov', 'moe', 'uoa'];
  const stages = {};
  keys.forEach((key, index) => {
    stages[key] = index < revealed ? 'revealed' : 'upcoming';
  });
  if (foundation) stages.sov = 'foundation';
  return stages;
};
// `3-03`'s own state table, at the frozen 6-beat map: beats 4 and 5 of the
// installed script land against states 3 and 5 (the draft merges the legacy
// builds 4+5 into one advance and adds the social-technology beat at 4).
const LADDER_STATES = {
  line: { line: true, stages: stageState(0), gates: {} },
  collectible: { line: true, stages: stageState(1), gates: { g1: 'dim' } },
  sov: { line: true, stages: stageState(2), gates: { g1: 'bright', g2: 'dim' } },
  all: { line: true, stages: stageState(4), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } },
  foundation: { line: true, stages: stageState(4, true), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } },
  // `3-07`'s own resolved state — the ladder as it returns for the placement.
  resolved: {
    line: true,
    stages: { collectible: 'revealed', sov: 'revealed', moe: 'revealed', uoa: 'revealed' },
    gates: { g1: 'bright', g2: 'bright', g3: 'bright' }
  }
};

function ladder(st, state, { lines = null, latestLine = null, berths = [], voice = 1 } = {}) {
  const L = layer(st, { voice });
  const lad = StageLadder();
  L.appendChild(lad.el);
  lad.applyState(state, { live: false });
  cleanup.push(() => lad.destroy());

  // THE ONE RULED CHANGE: glyphs out, renders in — inside the stop itself,
  // so the component's own state machine (upcoming/revealed/foundation)
  // drives each render's presence exactly as it drove the glyph's.
  lad.el.querySelectorAll('.s3f-ladder__stop').forEach((stop) => {
    const g = stop.querySelector('.s3f-ladder__glyph');
    if (g) g.remove();
    const spec = STAGE_RENDERS[stop.dataset.stage];
    if (!spec) return;
    const [w, h] = bandBox(spec.ar);
    const df = DarkFieldImage({ name: spec.subject, width: w, height: h, alt: spec.alt });
    df.el.dataset.visible = 'true';
    df.el.style.transition = 'none';
    df.el.style.position = 'absolute';
    df.el.style.left = `${-w / 2}px`;
    df.el.style.top = `${-(BAND_CLEAR + h)}px`;
    stop.appendChild(df.el);
  });

  // The arrival lines, beneath the labels at each standing stop.
  (lines || []).forEach((key) => {
    const [x, y] = LADDER_STOPS[key];
    text({ el: L }, STAGE_LINES[key],
      `left:${x - 109}px; top:${y + 92}px; width:218px; text-align:center; text-indent:0;` +
      `font-size:17px; font-weight:420; line-height:1.45;` +
      `color:rgba(255,255,255,${key === latestLine ? 1 : 0.58});`);
  });

  // The entity berth, carried into the object register: a render pinned
  // above a stage's own render, distinctly smaller (132 cap vs the band's
  // 188), its dot beneath it — `3-07`'s berth treatment with the standing
  // icons-to-renders change applied to the berth too.
  berths.forEach(({ at, subject, ar, alt, o = 1 }) => {
    const [sx, sy] = LADDER_STOPS[at];
    const stageH = bandBox(STAGE_RENDERS[at].ar)[1];
    const cap = 132;
    const bh = Math.min(cap, cap / ar);
    const bw = bh * ar;
    const bottom = sy - (BAND_CLEAR + stageH + 48);
    photo(L, { subject, alt, o, box: [sx - bw / 2, bottom - bh, bw, bh] });
    const d = document.createElement('div');
    d.style.cssText = `position:absolute; left:${sx - 4.5}px; top:${sy - (BAND_CLEAR + stageH + 24) - 4.5}px;` +
      `width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,${0.8 * o});`;
    L.appendChild(d);
  });
  return L;
}

// `3-03`'s overlay copy against its own classes: the on-screen attribution
// (the LADDER ruling — Boyapati on stage), the two gate lines, the
// foundation line. The `s3f-order` class on the layer is what lets the
// legacy `[data-step="6"]` settle rule dim the gate lines under the
// foundation, exactly as the legacy slide does it.
const GATELINE_ONE = 'Nobody accepts as payment what they don’t expect to hold value.';
const GATELINE_TWO = 'Nobody writes contracts in what nobody accepts.';
// The legacy foundation line with the act's own word — "job" for
// "function", following the installed script; flagged for the word pass.
const FOUNDATION_LINE =
  'Store of value is the foundation job. The other jobs are built on it.';

function orderOverlay(st, { step, gatelines = false, foundation = false } = {}) {
  const L = layer(st, { classes: 's3f-order' });
  L.dataset.step = String(step);
  const k = document.createElement('p');
  k.className = 's3f-order__kicker';
  k.dataset.visible = 'true';
  k.textContent = 'after Vijay Boyapati.';
  L.appendChild(k);
  if (gatelines) {
    [GATELINE_ONE, GATELINE_TWO].forEach((copy, i) => {
      const p = document.createElement('p');
      p.className = 's3f-order__gateline';
      p.dataset.q = String(i + 1);
      p.dataset.visible = 'true';
      p.textContent = copy;
      L.appendChild(p);
    });
  }
  if (foundation) {
    const p = document.createElement('p');
    p.className = 's3f-order__foundation';
    p.dataset.visible = 'true';
    p.textContent = FOUNDATION_LINE;
    L.appendChild(p);
  }
  return L;
}

// The social-technology beat's on-screen line, in the ladder's clear sky —
// the upper-left the un-arrived stages leave open. The distillation is the
// installed script's own clause; the position is WIRING.
const SOCIAL_LINE = 'The one good you use because everyone else uses it.';
function socialStatement(st, { a = 1 } = {}) {
  return text(st, SOCIAL_LINE,
    `left:200px; top:200px; width:640px; text-indent:0;` + STATEMENT(a, 40));
}

// ====================================== S14-F1 · THE COFFEE OBJECTION (ADAPT)
//
// The legacy objection beat with the one ruled change: the coffee_cup render
// at display scale against the triad. The display box is P1-F2's approved
// study geometry (540 tall at the forms' centre, the render's own 4:5), and
// the statement over it is the master's display rule — the same pairing
// S6-F1 shipped (review/act-2/harness/states.mjs `study`/`studyStatement`).
function studyStatement(st, copy) {
  return text(st, copy,
    'left:200px; right:200px; top:246px; text-align:center; text-indent:0;' + CAPS(0.92, 40));
}

// ================================================= S15-F1/F2 · THE TOWER (PORT)
//
// `3-06-what-your-money-is`, mounted: LayerDiagram at the slide's own state
// table, the run/principle/scoping copy against the slide's own classes, the
// visibility windows the slide's `_applyBuild` defines. Act III's one term —
// BASE MONEY — enters exactly where the legacy slab lands it (beat 3).
const LINK_ONE = 'a claim on your deposit.';
const LINK_TWO = 'a claim on base money.';
const TOWER_RUN = 'More claims than base. That is what a bank run runs on.';
const TOWER_PRINCIPLE =
  'Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.';
const TOWER_SCOPING =
  'The real question is about the foundation asset — underneath them all.';
const TOWER_STATES = [
  { slabs: {}, links: {} },
  { slabs: { apps: true }, links: {} },
  { slabs: { apps: true, deposits: true }, links: { l1: { caption: LINK_ONE } } },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } }
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } }
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } },
    foundation: true
  },
  {
    slabs: { apps: true, deposits: true, base: true },
    links: { l1: { caption: LINK_ONE }, l2: { caption: LINK_TWO } },
    foundation: true,
    drop: true
  }
];

function tower(st, step, { disc = false } = {}) {
  const L = layer(st, { classes: 's3f-money' });
  L.dataset.step = String(step);
  L.dataset.live = 'false';
  const diagram = LayerDiagram();
  L.appendChild(diagram.el);
  diagram.applyState(TOWER_STATES[step], { live: false });
  cleanup.push(() => diagram.destroy());

  const copyRow = (cls, copy, visible) => {
    const p = document.createElement('p');
    p.className = cls;
    p.dataset.visible = String(visible);
    p.textContent = copy;
    L.appendChild(p);
  };
  copyRow('s3f-money__run', TOWER_RUN, step >= 3 && step <= 5);
  copyRow('s3f-money__principle', TOWER_PRINCIPLE, step >= 4 && step <= 5);
  copyRow('s3f-money__scoping', TOWER_SCOPING, step === 5);

  // THE THREAD RETURNS (the brief §3): the ClaimObject, at the held question
  // and nowhere earlier in the act. WIRING, flagged on the cell: it stands
  // at the app layer's level — where the viewer lives, the whole stack
  // beneath it — at the traveler's distance from the tower, so Scene 16 can
  // pull the frame away from under it. It does NOT stand beneath the drop
  // line: the drop points at nothing, and an orange claim in that darkness
  // would visually pre-answer the question Scene 16 answers.
  if (disc) {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute; left:1412px; top:192px; width:116px; height:116px;';
    const claim = ClaimObject();
    claim.el.style.transition = 'none';
    claim.applyState({ visible: true });
    wrap.appendChild(claim.el);
    L.appendChild(wrap);
  }
  return L;
}

// ============================================================ SCENE 11 (5 beats)

cell('s11-b1', {
  scene: 'S11', beat: 1, frame: 'S11-F1', klass: 'PORT', review: 'pending-review',
  source: '3-01-the-three-functions, build 1 — the token returns center',
  caption: 'Beat 1 · the go-between good again, before its jobs are named. The legacy composition, ported — with one honest exception this cell exists to show you.',
  flag: 'The legacy center is literally 1.2’s luminous token — the same disc the film now reserves for the claim, and your ruling holds the ClaimObject off the act until the held question. So this cell stands the token’s footprint in the line grammar instead: a thin 120px circle at the token’s own position and scale, a dot terminal at its center, no accent. If you want something else at the center — the disc after all, a render, or nothing — it is one ruling.'
}, (st) => {
  triad(st, { jobs: 0, hub: true });
});

cell('s11-b2', {
  scene: 'S11', beat: 2, frame: 'S11-F1', klass: 'PORT', review: 'approved-port',
  source: '3-01-the-three-functions, build 2 — the store-of-value spoke',
  caption: 'Beat 2 · the first job radiates: STORE OF VALUE — moves value through time. The spoke, the grammar demonstration (the time-gap mark) and the entry are the legacy slide’s own, placed by its own stylesheet.'
}, (st) => {
  triad(st, { jobs: 1 });
});

cell('s11-b3', {
  scene: 'S11', beat: 3, frame: 'S11-F1', klass: 'PORT', review: 'approved-port',
  source: '3-01-the-three-functions, build 3 — the medium-of-exchange spoke',
  caption: 'Beat 3 · the second job: MEDIUM OF EXCHANGE — moves value between people. The hand-off mark, the legacy entry, the accumulating triad.'
}, (st) => {
  triad(st, { jobs: 2 });
});

cell('s11-b4', {
  scene: 'S11', beat: 4, frame: 'S11-F1', klass: 'PORT', review: 'approved-port',
  source: '3-01-the-three-functions, build 4 — the unit-of-account spoke',
  caption: 'Beat 4 · the quiet third: UNIT OF ACCOUNT — measures value. The triad complete: the act’s home frame, standing.'
}, (st) => {
  triad(st, { jobs: 3 });
});

cell('s11-b5', {
  scene: 'S11', beat: 5, frame: 'S11-F1', klass: 'PORT', review: 'approved-port',
  source: '3-01-the-three-functions, build 5 — the continuity line',
  caption: 'Beat 5 · the continuity lands under the whole triad, verbatim from the legacy slide: the competition’s three dimensions, seen from the inside.'
}, (st) => {
  triad(st, { jobs: 3, continuity: true });
});

// ============================================================ SCENE 12 (4 beats)

cell('s12-b1', {
  scene: 'S12', beat: 1, frame: 'S12-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-02-the-functions-separate, build 1 — the three heads land empty',
  caption: 'Beat 1 · the split begins: the triad recedes to the overlay grammar’s still voice (0.35) and the three column heads land empty over it — PRICED IN · PAID IN · SAVED IN, the jobs re-stated as columns. The seam where the spokes become columns is the implementation’s motion; the settled state is this.'
}, (st) => {
  triad(st, { jobs: 3, voice: RECEDE.statement });
  split(st, {});
});

cell('s12-b2', {
  scene: 'S12', beat: 2, frame: 'S12-F1', klass: 'ADAPT', review: 'pending-review',
  source: 'the architecture, Scene 12 beat 1 (the household) through 3-02’s column treatment',
  caption: 'Beat 2 · the household beat: you may already live the split. The columns fill in the legacy’s own word register — one money · the same money · property · shares · gold.',
  flag: 'The household row’s on-screen words are drafted from the installed script (paid in one money, your home priced in it, savings in property, shares, gold) — the legacy columns only ever carried Argentina. Your word pass owns the final copy; the treatment is the legacy’s.'
}, (st) => {
  split(st, { cells: HOUSEHOLD_CELLS });
});

cell('s12-b3', {
  scene: 'S12', beat: 3, frame: 'S12-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-02 build 2 (the Argentina row, verbatim) + the S5-F3 evidence grammar (approved 31 Aug) — THE ONE RULED CHANGE',
  caption: 'Beat 3 · THE ONE CHANGE, LANDED: Argentina arrives as the film’s dated-fact grammar — ARGENTINA · five decades · the fact — at the approved evidence geometry, over the split columns carrying the legacy’s own Argentina row (USD · ARS · USD + the brick), receded to the deep overlay dim exactly as Act II’s interludes recede the rail. The fact sentence is the architecture’s own Scene 12 phrase; the place and span are the legacy kicker’s own words (SOURCES WIM-AR-001).',
  flag: 'Two honest notes, in plain English. First: the grammar’s date slot carries a span — five decades — for the first time; every earlier specimen carried a year. If you want a year form (1975–, say, from the Rodrigazo dating in SOURCES), it is one string. Second: the evidence lands OVER the deep-dimmed columns (the Act II table-over-rail treatment) because the legacy column geometry leaves no clear sky; if you would rather the columns stay readable beside the block, that is a staging ruling.'
}, (st) => {
  split(st, { cells: ARGENTINA_CELLS, voice: RECEDE.deep });
  evidence(st, ARGENTINA);
});

cell('s12-b4', {
  scene: 'S12', beat: 4, frame: 'S12-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-02-the-functions-separate, build 3 — the principle',
  caption: 'Beat 4 · the principle lands at full voice in the legacy’s own slot, and the evidence settles into the legacy’s own citation register above the columns — “Argentina, five decades.” — the landing become the record. The columns hold Argentina’s row.',
  flag: 'The principle reads “jobs” where the legacy read “functions,” following the installed script and the act’s titles — one word, twice, flagged for your word pass.'
}, (st) => {
  split(st, { cells: ARGENTINA_CELLS, kicker: true, principle: true });
});

// ============================================================ SCENE 13 (6 beats)

cell('s13-b1', {
  scene: 'S13', beat: 1, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-03-the-order-of-monetization, build 1 — the empty rising line, the attribution',
  caption: 'Beat 1 · there is an order. The empty rising line enters — the ladder’s drawn grammar untouched — and the attribution stands on stage per your ruling: “after Vijay Boyapati.” Nothing else yet; the ascent is genuinely empty.'
}, (st) => {
  ladder(st, LADDER_STATES.line);
  orderOverlay(st, { step: 1 });
});

cell('s13-b2', {
  scene: 'S13', beat: 2, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-03 build 2 + the icons-to-renders ruling — collectible = single_cowrie (presenter-ruled)',
  caption: 'Beat 2 · COLLECTIBLE stands on the line — and here is the one ruled change at work: the stage mark is the single_cowrie render in the rails-law band box, standing above the line at the stop’s own clearance, never on it. Its arrival line beneath, in the script’s own words: “Held by a few people for their own strange reasons.” The first threshold tick sits dim above it.'
}, (st) => {
  ladder(st, LADDER_STATES.collectible, { lines: ['collectible'], latestLine: 'collectible' });
  orderOverlay(st, { step: 2 });
});

cell('s13-b3', {
  scene: 'S13', beat: 3, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-03 build 3 + the icons-to-renders ruling — store of value = gold (honest render, flagged)',
  caption: 'Beat 3 · STORE OF VALUE arrives: the gold render steps up the line, its arrival line beneath — “A place to park purchasing power on purpose.” The first gate brightens as its logic becomes visible; the second sits dim.',
  flag: 'The manifest assigns no render to the store-of-value stage mark, so this sheet stands the film’s own store-of-value winner — gold — as the honest render. Same for the two stages above: coinage at medium of exchange, the ledger at unit of account. One word changes any of the three (docs/act-3-provenance.md §2).'
}, (st) => {
  ladder(st, LADDER_STATES.sov, { lines: ['collectible', 'sov'], latestLine: 'sov' });
  orderOverlay(st, { step: 3 });
});

cell('s13-b4', {
  scene: 'S13', beat: 4, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: 'the social-technology beat (presenter-ruled, 2 Sep 2026) against 3-03’s standing state',
  caption: 'Beat 4 · the social-technology beat, as you ruled it: the ladder holds at two stages while the reason the order cannot run backward lands in the clear sky the un-arrived stages leave open — “The one good you use because everyone else uses it.” The coordination logic (one person holds, two agree, everyone converges) rides in the spoken beat; the vocabulary stays in the notes armor.',
  flag: 'The on-screen line is the installed script’s own clause, distilled by this sheet; its position in the upper-left sky is wiring. Your word pass owns the distillation.'
}, (st) => {
  ladder(st, LADDER_STATES.sov, { lines: ['collectible', 'sov'] });
  orderOverlay(st, { step: 4 });
  socialStatement(st);
});

cell('s13-b5', {
  scene: 'S13', beat: 5, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-03 builds 4–5 (merged by the frozen 6-beat map) + the icons-to-renders ruling',
  caption: 'Beat 5 · the two gates open in one advance, as the frozen map splits it: MEDIUM OF EXCHANGE and UNIT OF ACCOUNT stand — coinage and the ledger completing the object sequence — every threshold lit, and the two gate lines landing as a pair in the legacy’s own slots: “Nobody accepts as payment what they don’t expect to hold value.” / “Nobody writes contracts in what nobody accepts.” The social line recedes to the dimmed-prior step.',
  flag: 'The installed script speaks both gates on one advance, so both legacy gate lines land together here — the one beat on the sheet that lands a pair. The arrival lines beneath the two new stages speak S11’s own job lines.'
}, (st) => {
  ladder(st, LADDER_STATES.all, { lines: ['collectible', 'sov', 'moe', 'uoa'] });
  orderOverlay(st, { step: 5, gatelines: true });
  socialStatement(st, { a: 0.55 });
});

cell('s13-b6', {
  scene: 'S13', beat: 6, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-03 build 6 — the foundation state, the ladder’s only orange',
  caption: 'Beat 6 · the foundation: the store-of-value stop takes the accent — the ladder’s only orange, the component’s own foundation state — and the foundation line lands at full voice while the gate lines settle to the legacy’s own dimmed step. The object sequence stands complete above the drawn ascent.',
  flag: 'The foundation line reads “job” where the legacy read “function,” following the installed script — flagged for your word pass with S12’s principle.'
}, (st) => {
  ladder(st, LADDER_STATES.foundation, { lines: ['collectible', 'sov', 'moe', 'uoa'] });
  orderOverlay(st, { step: 6, gatelines: true, foundation: true });
  socialStatement(st, { a: 0.55 });
});

// ============================================================ SCENE 14 (4 beats)

cell('s14-b1', {
  scene: 'S14', beat: 1, frame: 'S14-F1', klass: 'ADAPT', review: 'pending-review',
  source: 'the legacy objection beat + P1-F2’s display-scale study box — THE ONE RULED CHANGE: the coffee_cup render at display scale against the triad',
  caption: 'Beat 1 · the objection, made sensory: the coffee cup at display scale in the approved study geometry, the objection’s own words over it in the display register, and the triad beneath in its condensed home-base row — MEDIUM OF EXCHANGE at full voice, because that is the one job the objection is actually about.',
  flag: 'The full radial triad and a 540px study box cannot share the frame — the legacy triad geometry crosses the display box — so the home base recedes to its condensed row beneath the study, the way Act II’s rail kept its world rows beneath a featured moment. If you want the radial triad held instead (at a smaller render, or offset), that is a staging ruling.'
}, (st) => {
  photo(st.el, { subject: 'coffee_cup', alt: 'A cup of coffee', box: [744, 380, 432, 540] });
  studyStatement(st, '“But I can’t buy my coffee with Bitcoin.”');
  triadRow(st, { lit: 'moe' });
});

cell('s14-b2', {
  scene: 'S14', beat: 2, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-07-where-bitcoin-is, build 1 (the ladder returns resolved) + the icons-to-renders ruling',
  caption: 'Beat 2 · the objection goes on the ladder you just built: the ladder returns in 3-07’s own resolved state — every stage standing, every threshold lit — with the coffee cup placed at the MEDIUM OF EXCHANGE berth, above the far side of the gate, and the beat’s line beneath: “A monetary good reaches everyday payments last.”',
  flag: 'Placing the coffee render at the medium stage’s berth is this sheet’s honest reading of “put that objection on the ladder” — one word retires it. The landing line is distilled from the installed script; your word pass owns it.'
}, (st) => {
  ladder(st, LADDER_STATES.resolved, {
    lines: ['collectible', 'sov', 'moe', 'uoa'],
    berths: [{ at: 'moe', subject: 'coffee_cup', ar: 1122 / 1402, alt: 'The coffee objection, placed' }]
  });
  statement(st, 'A monetary good reaches everyday payments last.', { top: 850, size: 40 });
});

cell('s14-b3', {
  scene: 'S14', beat: 3, frame: 'S13-F1', klass: 'ADAPT', review: 'pending-review',
  source: '3-07-where-bitcoin-is, builds 2–3 (the entity berth at store of value) + the icons-to-renders ruling',
  caption: 'Beat 3 · the placement — the scene’s payoff: bitcoin’s coin render stands at the entity berth above STORE OF VALUE, stage two of the ladder just built, exactly where 3-07 placed its glyph — descriptively, no accent. The coffee recedes at its berth, answered. The line: “Held on purpose, across years — one job: store of value.”',
  flag: 'The berth carries the coin render rather than the legacy’s 36px glyph — the same icons-to-renders change the stage marks take, applied at the berth’s smaller scale (132 cap against the band’s 188) so the visitor reads as a visitor, not a fifth station. The landing line is distilled from the installed script.'
}, (st) => {
  ladder(st, LADDER_STATES.resolved, {
    lines: ['collectible', 'sov', 'moe', 'uoa'],
    berths: [
      { at: 'sov', subject: 'bitcoin', ar: 1448 / 1086, alt: 'The bitcoin coin, placed at store of value' },
      { at: 'moe', subject: 'coffee_cup', ar: 1122 / 1402, alt: 'The coffee objection, answered', o: 0.5 }
    ]
  });
  statement(st, 'Held on purpose, across years — one job: store of value.', { top: 850, size: 40 });
});

cell('s14-b4', {
  scene: 'S14', beat: 4, frame: 'S11-F1', klass: 'PORT', review: 'determined',
  source: '3-01’s triad (the home base returning) + the architecture’s own Scene 14 closing question',
  caption: 'Beat 4 · the pivot: the triad returns whole, STORE OF VALUE at full voice while the other two jobs recede, and the act’s hinge question lands at display scale in the home frame’s own statement slot: “What makes something a good store of value?” — the architecture’s own words, verbatim. This is also the door into the tower: Scene 15 enters through this corner.'
}, (st) => {
  triad(st, { jobs: 3, lit: 'sov' });
  text(st, 'What makes something a good store of value?',
    'left:180px; right:180px; top:872px; text-align:center; text-indent:0;' + STATEMENT(1, 46));
});

// ============================================================ SCENE 15 (6 beats)

cell('s15-b1', {
  scene: 'S15', beat: 1, frame: 'S15-F1', klass: 'PORT', review: 'approved-port',
  source: '3-06-what-your-money-is, build 1 — LayerDiagram mounted',
  caption: 'Beat 1 · the tower opens where you live: PAYMENT APPS, the top slab alone. The world is 3-06’s own, mounted; the entry seam from the triad’s STORE corner is the implementation’s motion, not a settled state.'
}, (st) => {
  tower(st, 1);
});

cell('s15-b2', {
  scene: 'S15', beat: 2, frame: 'S15-F1', klass: 'PORT', review: 'approved-port',
  source: '3-06-what-your-money-is, build 2',
  caption: 'Beat 2 · the app balance is not money: BANK DEPOSITS lands beneath, and the first link hangs in the gap with the slide’s own caption — “a claim on your deposit.” The upper slab settles visibly onto the one below.'
}, (st) => {
  tower(st, 2);
});

cell('s15-b3', {
  scene: 'S15', beat: 3, frame: 'S15-F1', klass: 'PORT', review: 'approved-port',
  source: '3-06-what-your-money-is, build 3 — the act’s one term lands',
  caption: 'Beat 3 · BASE MONEY — Act III’s one term, entering exactly where the legacy slab lands it — and the tower’s honest shape is complete: narrowest at the bottom, more claims above than base beneath. The run line lands: “More claims than base. That is what a bank run runs on.”'
}, (st) => {
  tower(st, 3);
});

cell('s15-b4', {
  scene: 'S15', beat: 4, frame: 'S15-F1', klass: 'PORT', review: 'approved-port',
  source: '3-06-what-your-money-is, build 4 — the shiver is choreography over this state',
  caption: 'Beat 4 · fair in both directions: the principle lands — “Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.” The shiver (the base flickers, the shudder travels up) is the legacy build’s own choreography over this unchanged state; a still holds the state.'
}, (st) => {
  tower(st, 4);
});

cell('s15-b5', {
  scene: 'S15', beat: 5, frame: 'S15-F1', klass: 'PORT', review: 'approved-port',
  source: '3-06-what-your-money-is, build 5 — the foundation scope',
  caption: 'Beat 5 · the scoping: the upper layers recede to dim outlines and the base takes the slide’s single allowed orange — the question narrows to the foundation asset, and the scoping line says so at full voice.'
}, (st) => {
  tower(st, 5);
});

cell('s15-b6', {
  scene: 'S15', beat: 6, frame: 'S15-F2', klass: 'PORT', review: 'pending-review',
  source: '3-06-what-your-money-is, build 6 (the held question) + the presenter’s thread ruling — the ClaimObject returns here and nowhere earlier',
  caption: 'Beat 6 · the held question: the drop line reaches from the base into empty black and dissolves — pointing at nothing — with every line of copy off stage, exactly as the legacy build holds it. And the thread returns: the ClaimObject, on screen for the first time in the act, at the app layer’s level — where the viewer lives, the whole stack beneath it. The question is spoken, not written: every layer is a claim on the layer below; what is the bottom layer a claim on?',
  flag: 'Where the disc returns is this sheet’s wiring. It stands at the top of the tower at the traveler’s distance — deliberately NOT beneath the drop line, because an orange claim sitting in that darkness would visually pre-answer the question Scene 16 answers. If you want it elsewhere, it is one coordinate.'
}, (st) => {
  tower(st, 6, { disc: true });
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
