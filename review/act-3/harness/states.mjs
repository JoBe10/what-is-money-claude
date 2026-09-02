// Act III — the beat-state sheet builders, r2 (the Act III states r2 brief §2).
//
// THE R2 SHEET EXECUTES FIVE PRESENTER RULINGS ON THE R1 SHEET (master §13,
// 2 September 2026 — recorded before this file was touched):
//
//   1. THE DISC RETURNS AT THE TRIAD'S CENTER. The kickoff's "resumes at the
//      held question and nowhere earlier" clause is STRUCK as over-extension
//      (the Prologue family). The legacy composition's center is literally
//      1.2's luminous token, and this sheet rebuilds it with the legacy's own
//      classes (`luminous-disc s1q-token s1q-token--small s3f-functions__token`)
//      wherever the home base appears: S11 b1–b5, S12 b1 (receded with the
//      home frame), S14 b4. THE DISC IS NOT ON THE TOWER — s15-b6's r1 disc
//      is removed and the held question plays with no disc, as 3-06 always
//      played it.
//   2. SCENE 12 REVERTS TO ITS PROVEN STAGING. The r1 dated-fact block is
//      retired to file (s12-b3-block); Argentina lands the legacy way — the
//      row arriving in the columns under the legacy kicker, the span and the
//      every-stripe clause spoken, not blocked. S12-F1 is PORT again.
//   3. THE NEUTRAL STAGE SYSTEM. The four presenter renders — collectible
//      (a raw gem crystal) · store (an hourglass) · medium (a handshake) ·
//      unit (a balance scale) — gated and ingested 2 Sep 2026, carry the
//      ladder's stages at the rails-law band scale, and the same three job
//      objects replace S11's grammar glyphs at the triad's spokes. MONETARY
//      ASSETS APPEAR ON THE LADDER ONLY AS CLIMBERS: S14's coin at stage two
//      is the only monetary object in sight — the payoff this protects.
//   4. SCENE 15 IS PRESENTER-REOPENED — the act's one open design. The
//      three-box tower is superseded. Two genuinely distinct candidate
//      systems, each across all six beats, line grammar only, the shiver
//      kept as the b4 event, all legacy copy in its slots.
//      RULED AT THE FLIPBOOK WALK (the Batch C implementation brief §1.1):
//      SCENE 15 IS CANDIDATE A — the A cells are the approved S15 states,
//      and candidate B retires to file (review 'on-file', kept on disk).
//        A — THE PROPORTIONAL INVERTED TOWER: width is claim volume,
//            solidity is realness; base money narrow, solid, near-luminous
//            at the bottom; deposits far wider, outlined; apps widest and
//            faintest; the reveal descending from PAYMENT APPS at the
//            frame's top.
//        B — THE CONVERGENCE OF CLAIMS (this session's design): claim
//            volume as multiplicity instead of width — many faint app
//            marks fanning down to few deposit marks, converging on one
//            small bright base point; more lines above than points below
//            is the bank-run arithmetic drawn as counting.
//   5. Gate 4 spent (a records ruling; nothing on this sheet).
//
// EVERY CELL CARRIES ITS PROVENANCE CLASS AND IS BUILT BY IT — the ruled map
// as amended 2 Sep 2026: 1 PORT (S12) · 3 ADAPT (S11, S13, S14) · 2 NEW live
// (S15, presenter-reopened by name). Candidates exist ONLY at S15 and only
// as the two ruled systems. Where a ruling leaves something genuinely
// underdetermined, the cell stands ONE honest render and carries a
// plain-English flag; nothing is decided silently.
//
// THE REGISTER BOUNDARY (master §6.3, the frame's first test at S13 and now
// S11 too): renders never enter a diagram, no render stands on a drawn line.
// The ladder's marks stand above the rising line in the rails-law band box
// (188 × 188, contain, own aspect); the triad's job marks stand above the
// spoke axis at store/medium (the same band form) and in the vacated glyph
// slot at unit of account, whose spoke is vertical and leaves no "above the
// line" to stand in. The tower candidates are pure line grammar.
//
// CARRIED CELLS ARE NOT REBUILT: s14-b1 carries byte-identical from r1 (its
// meta says so and the capture skips it). The r1 stagings this sheet
// supersedes stay on file: s12-b3-block, s15-b1-boxes … s15-b6-boxes.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { StageLadder } from '/src/components/section-3/StageLadder.js';
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

// The four neutral marks all arrive at 1672 × 941 — the near-16:9 family —
// so every band box on this sheet is 188 × 105.8.
const MARK_AR = 1672 / 941;

// The deck's statement slot, centred (review/act-2 states `statement`).
function statement(st, copy, { top = 812, size = 46, a = 1 } = {}) {
  return text(st, copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` +
    STATEMENT(a, size));
}

// ====================================================== S11-F1 · THE TRIAD (ADAPT)
//
// `3-01-the-three-functions`' own DOM against its own classes — and the
// center is the legacy center: THE DISC ITSELF (r2 ruling 1). The token div
// carries the legacy's exact classes, so the legacy stylesheet renders 1.2's
// luminous disc at the token's own 120px box (900, 340), restored glow
// radii included. The ONE RULED CHANGE (r2 ruling 3): the three grammar
// glyphs at the spokes are replaced by the neutral job objects — store (an
// hourglass), medium (a handshake), unit (a balance scale) — in the
// rails-law band box. WIRING, flagged on the cells: at store/medium the
// band box in the glyph's own slot would cross the drawn spoke, so the mark
// stands ABOVE the spoke axis (bottom 32px clear), the entry's text kept at
// its legacy position beneath the spoke — the rails-law band form. At unit
// of account the spoke is vertical, so the mark takes the vacated glyph
// slot and the entry's text flows beneath it.

const JOBS = [
  { key: 'sov', subject: 'store', alt: 'An hourglass', name: 'STORE OF VALUE', sub: 'moves value through time.' },
  { key: 'moe', subject: 'medium', alt: 'A handshake', name: 'MEDIUM OF EXCHANGE', sub: 'moves value between people.' },
  { key: 'uoa', subject: 'unit', alt: 'A balance scale', name: 'UNIT OF ACCOUNT', sub: 'measures value.' }
];
const CONTINUITY =
  'Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside.';

// The spoke axis (the legacy stylesheet's own y for the horizontal spokes)
// and the glyph centers inside the 460px entries at 170 / 1290 / 730.
const SPOKE_Y = 399.5;
const MARK_CLEAR = 32;

function triad(st, { jobs = 3, hub = true, continuity = false, voice = 1, lit = null } = {}) {
  const L = layer(st, { classes: 's3f-functions-layer', voice });
  if (hub) {
    // THE DISC RETURNS (r2 ruling 1): the legacy token, by its own classes —
    // literally 1.2's luminous disc, the same render, not a resemblance.
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token s1q-token--small s3f-functions__token';
    token.dataset.visible = 'true';
    token.style.transition = 'none';
    L.appendChild(token);
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

    // THE ONE RULED CHANGE: the job object in the rails-law band box.
    const [w, h] = bandBox(MARK_AR);
    const df = DarkFieldImage({ name: spec.subject, width: w, height: h, alt: spec.alt });
    df.el.dataset.visible = 'true';
    df.el.style.transition = 'none';
    if (spec.key === 'uoa') {
      // The vertical spoke leaves no "above the line": the mark takes the
      // vacated glyph slot, centred, the entry's text flowing beneath it.
      df.el.style.margin = '0 auto';
      fn.appendChild(df.el);
    } else {
      // The band form: the mark stands above the spoke axis, bottom-aligned
      // 32px clear of the drawn line; the entry keeps a 56px spacer where
      // the glyph stood so the name and sub hold their legacy position
      // beneath the spoke.
      const spacer = document.createElement('div');
      spacer.className = 's3f-functions__glyph';
      spacer.style.height = '56px';
      fn.appendChild(spacer);
      df.el.style.position = 'absolute';
      df.el.style.left = `${230 - w / 2}px`;
      df.el.style.top = `${SPOKE_Y - MARK_CLEAR - h - 372}px`;
      fn.appendChild(df.el);
    }

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

// =============================================== S12-F1 · THE SPLIT (PORT)
//
// `3-02-the-functions-separate`'s own DOM against its own classes — THE
// WHOLE TREATMENT, r2 ruling 2: the r1 dated-fact block is retired to file
// (s12-b3-block) and Argentina lands the legacy way, the row arriving in
// the columns under the legacy kicker. The five-decade span and the
// every-stripe clause ride the spoken beat. The household beat (installed,
// approved) takes the same column treatment; the principle speaks the
// installed script's words, flagged for the word pass as in r1.

const COLS = ['PRICED IN', 'PAID IN', 'SAVED IN'];
const ARGENTINA_CELLS = [
  { marks: [{ text: 'USD' }], word: 'dollars' },
  { marks: [{ text: 'ARS' }], word: 'pesos' },
  { marks: [{ text: 'USD' }, { glyph: 'brick' }], word: 'dollars · real estate' }
];
// The household beat's row (the installed script's own beat: paid in one
// money, the home priced in it, savings elsewhere). The word rows are
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

// ============================================== S13-F1 · THE LADDER (ADAPT)
//
// `StageLadder` MOUNTED — the component the legacy slides run, at the states
// they run it — with exactly the one ruled change applied: each stop's
// grammar glyph is removed and the stage's dark-field render stands above
// the stop in the rails-law band box, bottom-aligned at the stop's own
// clearance, so the ascent reads as an object sequence. The line, dots,
// threshold ticks, labels, and the foundation state are the component's own,
// untouched. NO RENDER STANDS ON THE DRAWN LINE — the box bottoms sit 64px
// above each stop, and the rising segment clears every box. THE MARKS ARE
// THE PRESENTER'S NEUTRAL SET (r2 ruling 3): collectible · store · medium ·
// unit — no monetary asset is a stage mark, because monetary assets appear
// on the ladder only as climbers (S14's coin at stage two, the payoff the
// ruling protects).

const LADDER_STOPS = {
  collectible: [420, 660], sov: [800, 563.3], moe: [1180, 466.7], uoa: [1560, 370]
};
const STAGE_RENDERS = {
  collectible: { subject: 'collectible', ar: MARK_AR, alt: 'A raw uncut gem crystal' },
  sov: { subject: 'store', ar: MARK_AR, alt: 'An hourglass' },
  moe: { subject: 'medium', ar: MARK_AR, alt: 'A handshake' },
  uoa: { subject: 'unit', ar: MARK_AR, alt: 'A balance scale' }
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
  // icons-to-renders change applied to the berth too. The berth is where
  // monetary assets live on this ladder: climbers, never stations.
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

// ================================== S15 · THE TOWER, REOPENED (NEW — r2 ruling 4)
//
// The three-box tower (3-06 + LayerDiagram) is SUPERSEDED; its six r1 cells
// are on file as s15-b1-boxes … s15-b6-boxes. Two candidate systems stand in
// its place, each across all six beats, LINE GRAMMAR ONLY — no render and no
// disc enters either. All legacy copy rides in its own slots: the three
// labels, both link captions, and the run / principle / scoping rows on the
// legacy `.s3f-money__*` classes, whose CSS also supplies the b5 settle
// (the two lines above dim once the scoping sentence lands). The shiver is
// the b4 event in both systems — choreography over an unchanged state, held
// by the caption exactly as the legacy build holds it. b6 is the held
// question with every line of copy off stage and the bottom-most claim line
// reaching into black on the legacy `.s3f-tower__drop` drawing.

const LINK_ONE = 'a claim on your deposit.';
const LINK_TWO = 'a claim on base money.';
const TOWER_RUN = 'More claims than base. That is what a bank run runs on.';
const TOWER_PRINCIPLE =
  'Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.';
const TOWER_SCOPING =
  'The real question is about the foundation asset — underneath them all.';

// The legacy copy rows in their legacy slots, driven by the beat exactly as
// 3-06's _applyBuild drives them: run b3–b5, principle b4–b5, scoping b5,
// everything off at b6.
function towerCopy(L, beat) {
  const rows = [
    ['s3f-money__run', TOWER_RUN, beat >= 3 && beat <= 5],
    ['s3f-money__principle', TOWER_PRINCIPLE, beat >= 4 && beat <= 5],
    ['s3f-money__scoping', TOWER_SCOPING, beat === 5]
  ];
  rows.forEach(([cls, copy, visible]) => {
    const p = document.createElement('p');
    p.className = cls;
    p.dataset.visible = String(visible);
    p.textContent = copy;
    L.appendChild(p);
  });
}

// The legacy link drawing at candidate geometry: a hairline in the gap, its
// caption right of the spine at the legacy caption register.
function towerLink(L, { x, top, height, caption, dim = false }) {
  const line = document.createElement('div');
  line.style.cssText = `position:absolute; left:${x - 0.5}px; top:${top}px; width:1px;` +
    `height:${height}px; background:rgba(255,255,255,${dim ? 0.2 : 0.5});`;
  L.appendChild(line);
  const p = document.createElement('p');
  p.style.cssText = `position:absolute; left:${x + 34}px; top:${top + height / 2}px;` +
    'transform:translateY(-50%); width:460px; margin:0; font-size:22px; line-height:1.4;' +
    `color:${dim ? 'var(--text-dim)' : 'var(--text-secondary)'};`;
  p.textContent = caption;
  L.appendChild(p);
}

// The held question's drop — the legacy drawing itself (.s3f-tower__drop:
// 1px, 212px, dissolving gradient), placed at the candidate's own base.
function towerDrop(L, { x, top }) {
  const drop = document.createElement('div');
  drop.className = 's3f-tower__drop';
  drop.dataset.visible = 'true';
  drop.style.transition = 'none';
  drop.style.left = `${x}px`;
  drop.style.top = `${top}px`;
  L.appendChild(drop);
}

// ---- CANDIDATE A — the proportional inverted tower -------------------------
//
// Width is claim volume, solidity is realness. PAYMENT APPS at the frame's
// top: widest (1240) and faintest. BANK DEPOSITS beneath: far wider than
// base (880), outlined. BASE MONEY at the bottom: narrow (260), SOLID —
// a near-luminous warm-white block, the one solid object in the frame, its
// label dark against it. The proportions are qualitative, deliberately not
// a displayed ratio (the legacy tower's own recorded law).

const A_SLABS = [
  { key: 'apps', label: 'PAYMENT APPS', w: 1240, top: 150, h: 88 },
  { key: 'deposits', label: 'BANK DEPOSITS', w: 880, top: 330, h: 88 },
  { key: 'base', label: 'BASE MONEY', w: 260, top: 498, h: 60 }
];
const A_LINKS = [
  { from: 'apps', top: 238, height: 92, caption: LINK_ONE },
  { from: 'deposits', top: 418, height: 80, caption: LINK_TWO }
];

function candidateA(st, beat) {
  const L = layer(st, { classes: 's3f-money' });
  L.dataset.step = String(beat);
  L.dataset.live = 'false';
  const shown = { apps: beat >= 1, deposits: beat >= 2, base: beat >= 3 };
  const foundation = beat >= 5;

  A_SLABS.forEach((s) => {
    if (!shown[s.key]) return;
    const slab = document.createElement('div');
    let look;
    let labelColor;
    if (s.key === 'base') {
      // Solidity is realness: the base is the one solid, near-luminous block.
      // At the foundation scope the block takes the scene's single allowed
      // orange the way the legacy slab did — an orange edge and glow — so
      // the accent is legible against the warm fill, not just a tint of it.
      const look_border = foundation ? 'border:1.5px solid rgba(247, 147, 26, 0.85);' : 'border:none;';
      const glow = foundation
        ? '0 0 30px rgba(247, 147, 26, 0.5), 0 0 80px rgba(247, 147, 26, 0.2)'
        : '0 0 26px rgba(253, 233, 212, 0.28), 0 0 70px rgba(253, 233, 212, 0.12)';
      look = `${look_border} background:rgba(253,233,212,0.94); box-shadow:${glow};`;
      labelColor = 'rgba(24, 14, 4, 0.92)';
    } else if (s.key === 'deposits') {
      look = foundation
        ? 'border:1px solid rgba(255,255,255,0.14); background:rgba(255,255,255,0.012);'
        : 'border:1px solid rgba(255,255,255,0.34); background:rgba(255,255,255,0.03);';
      labelColor = foundation ? 'var(--text-dim)' : 'rgba(255,255,255,0.68)';
    } else {
      look = foundation
        ? 'border:1px solid rgba(255,255,255,0.07); background:transparent;'
        : 'border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.008);';
      labelColor = foundation ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.40)';
    }
    slab.style.cssText = `position:absolute; left:${960 - s.w / 2}px; top:${s.top}px;` +
      `width:${s.w}px; height:${s.h}px; display:grid; place-items:center; box-sizing:border-box; ${look}`;
    const label = document.createElement('div');
    label.style.cssText = `font-size:25px; font-weight:500; letter-spacing:0.18em; color:${labelColor};`;
    label.textContent = s.label;
    slab.appendChild(label);
    L.appendChild(slab);
  });

  A_LINKS.forEach((lk, i) => {
    const on = (i === 0 && beat >= 2) || (i === 1 && beat >= 3);
    if (!on) return;
    towerLink(L, { x: 960, top: lk.top, height: lk.height, caption: lk.caption, dim: foundation });
  });

  if (beat === 6) towerDrop(L, { x: 960, top: 566 });
  towerCopy(L, beat);
  return L;
}

// ---- CANDIDATE B — the convergence of claims (this session's design) -------
//
// Claim volume as MULTIPLICITY instead of width: twenty-four faint app
// marks across the top, fanning down onto six firmer deposit marks, which
// converge onto ONE small bright base point. "More claims than base" is
// drawn as counting — more lines above than points below — and the whole
// structure is the argument: every mark hangs by a drawn claim-line on the
// row beneath, and everything converges on the one point at the bottom.
// Same beats, same copy, same slots; line grammar only.

const B_APPS = Array.from({ length: 24 }, (_, i) => [320 + (i * 1280) / 23, 190]);
const B_DEPOSITS = Array.from({ length: 6 }, (_, i) => [585 + i * 150, 340]);
const B_BASE = [960, 520];

function bLine(L, [x1, y1], [x2, y2], alpha) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
  const d = document.createElement('div');
  d.style.cssText = `position:absolute; left:${x1}px; top:${y1}px; width:${len}px; height:1px;` +
    `background:rgba(255,255,255,${alpha}); transform:rotate(${ang}deg); transform-origin:left center;`;
  L.appendChild(d);
}

function bMark(L, [x, y], { r, css }) {
  const d = document.createElement('div');
  d.style.cssText = `position:absolute; left:${x - r}px; top:${y - r}px; width:${r * 2}px;` +
    `height:${r * 2}px; border-radius:50%; box-sizing:border-box; ${css}`;
  L.appendChild(d);
}

function bLabel(L, copy, css) {
  const p = document.createElement('p');
  p.style.cssText = 'position:absolute; margin:0; font-size:25px; font-weight:500;' +
    `letter-spacing:0.18em; ${css}`;
  p.textContent = copy;
  L.appendChild(p);
}

function candidateB(st, beat) {
  const L = layer(st, { classes: 's3f-money' });
  L.dataset.step = String(beat);
  L.dataset.live = 'false';
  const foundation = beat >= 5;
  const upperVoice = foundation ? 0.35 : 1;

  // The app row — many, faint, where the viewer lives.
  B_APPS.forEach((p) => bMark(L, p, {
    r: 4.5,
    css: `border:1px solid rgba(255,255,255,${0.42 * upperVoice}); background:transparent;`
  }));
  bLabel(L, 'PAYMENT APPS',
    `left:660px; top:118px; width:600px; text-align:center; color:rgba(255,255,255,${(foundation ? 0.2 : 0.62)});`);

  if (beat >= 2) {
    // The deposit row — fewer, firmer — and the upper fan: each app mark's
    // claim-line drawn down to its deposit.
    B_APPS.forEach((p, i) => {
      bLine(L, [p[0], p[1] + 5], [B_DEPOSITS[Math.floor(i / 4)][0], B_DEPOSITS[Math.floor(i / 4)][1] - 6],
        0.13 * upperVoice);
    });
    B_DEPOSITS.forEach((p) => bMark(L, p, {
      r: 5.5,
      css: `background:rgba(255,255,255,${0.72 * upperVoice});`
    }));
    bLabel(L, 'BANK DEPOSITS',
      `left:1392px; top:325px; width:340px; text-align:left; color:rgba(255,255,255,${(foundation ? 0.2 : 0.62)});`);
    // The fan itself is the claim line, so the caption rides beside the fan
    // with no extra spine — the legacy caption register, right of the drawing.
    const c1 = document.createElement('p');
    c1.style.cssText = 'position:absolute; left:1540px; top:228px; width:340px; margin:0;' +
      `font-size:22px; line-height:1.4; color:${foundation ? 'var(--text-dim)' : 'var(--text-secondary)'};`;
    c1.textContent = LINK_ONE;
    L.appendChild(c1);
  }

  if (beat >= 3) {
    // The convergence: six claim-lines onto one small bright base point.
    B_DEPOSITS.forEach((p) => {
      bLine(L, [p[0], p[1] + 6], [B_BASE[0], B_BASE[1] - 8], 0.2 * upperVoice);
    });
    const baseGlow = foundation
      ? '0 0 22px rgba(247, 147, 26, 0.5), 0 0 60px rgba(247, 147, 26, 0.2)'
      : '0 0 18px rgba(253, 233, 212, 0.4), 0 0 48px rgba(253, 233, 212, 0.16)';
    bMark(L, B_BASE, { r: 7, css: `background:rgba(253,233,212,0.95); box-shadow:${baseGlow};` });
    bLabel(L, 'BASE MONEY',
      `left:760px; top:548px; width:400px; text-align:center; color:${foundation ? 'var(--text-primary)' : 'rgba(255,255,255,0.62)'};`);
    const c2 = document.createElement('p');
    c2.style.cssText = 'position:absolute; left:1220px; top:412px; width:380px; margin:0;' +
      `font-size:22px; line-height:1.4; color:${foundation ? 'var(--text-dim)' : 'var(--text-secondary)'};`;
    c2.textContent = LINK_TWO;
    L.appendChild(c2);
  }

  // The drop continues the convergence axis downward — starting beneath the
  // BASE MONEY label rather than at the point itself, so the drawn line
  // never crosses the label's type on its way into the black.
  if (beat === 6) towerDrop(L, { x: 960, top: 588 });
  towerCopy(L, beat);
  return L;
}

// ============================================================ SCENE 11 (5 beats)

cell('s11-b1', {
  scene: 'S11', beat: 1, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01-the-three-functions, build 1 — the token returns center, AS THE DISC (r2 ruling 1)',
  caption: 'Beat 1 · the go-between good again — and the center is the disc itself, as you ruled it: the legacy token by its own classes, literally 1.2’s luminous disc at the token’s own 120px box, restored glow included. The r1 footprint ring is gone. This is the thread on stage from the act’s first beat, at the triad’s center, where the legacy composition always held it.'
}, (st) => {
  triad(st, { jobs: 0, hub: true });
});

cell('s11-b2', {
  scene: 'S11', beat: 2, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01 build 2 + r2 ruling 3 — the store job object at the first spoke',
  caption: 'Beat 2 · the first job radiates: STORE OF VALUE — moves value through time. The spoke and the entry are the legacy slide’s own; the grammar glyph (the time-gap mark) is retired, and the hourglass — your store mark — stands above the spoke in the rails-law band box, the entry’s words beneath the line.',
  flag: 'Your ruling names the objects but not their scale or position at the spokes. The band box (188) standing in the glyph’s own slot would cross the drawn spoke at store and medium — a render on a drawn line, which the register boundary forbids — so this sheet stands those two marks ABOVE the spoke axis, bottoms 32px clear of the line, entries’ text at its legacy position beneath: the rails-law band form. One number (the clearance, or a smaller cap) re-places them.'
}, (st) => {
  triad(st, { jobs: 1 });
});

cell('s11-b3', {
  scene: 'S11', beat: 3, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01 build 3 + r2 ruling 3 — the medium job object',
  caption: 'Beat 3 · the second job: MEDIUM OF EXCHANGE — moves value between people. The handshake — your medium mark — above the right spoke in the same band form, mirroring store. The disc holds the center between them.'
}, (st) => {
  triad(st, { jobs: 2 });
});

cell('s11-b4', {
  scene: 'S11', beat: 4, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01 build 4 + r2 ruling 3 — the unit job object',
  caption: 'Beat 4 · the quiet third: UNIT OF ACCOUNT — measures value. The balance scale — your unit mark — and the triad complete: the act’s home frame, standing, with the disc at its center and the three job objects at its spokes, one visual family with the ladder to come.',
  flag: 'Unit of account’s spoke is vertical, so there is no “above the line” for its mark to stand in: the balance scale takes the vacated glyph slot instead, and the entry’s words flow beneath it — about 50px lower than the legacy text position. The three marks therefore read symmetrically as objects but not identically in placement; if you want all three re-placed on one rule, it is one ruling.'
}, (st) => {
  triad(st, { jobs: 3 });
});

cell('s11-b5', {
  scene: 'S11', beat: 5, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01-the-three-functions, build 5 — the continuity line',
  caption: 'Beat 5 · the continuity lands under the whole triad, verbatim from the legacy slide: the competition’s three dimensions, seen from the inside.',
  flag: 'One measured crowding, in plain English: with the unit mark in the glyph slot, the unit entry’s wrapped text ends roughly 14px above the continuity line’s slot. Nothing overlaps, but the two read close at the frame’s center; one number (the unit mark’s scale, or the continuity’s legacy top) relieves it if your eye wants air.'
}, (st) => {
  triad(st, { jobs: 3, continuity: true });
});

// ============================================================ SCENE 12 (4 beats)

cell('s12-b1', {
  scene: 'S12', beat: 1, frame: 'S12-F1', klass: 'PORT', review: 'approved',
  source: '3-02-the-functions-separate, build 1 — the three heads land empty',
  caption: 'Beat 1 · the split begins: the home frame recedes to the overlay grammar’s still voice (0.35) — the disc receding at its center with it, per ruling 1 — and the three column heads land empty over it: PRICED IN · PAID IN · SAVED IN, the jobs re-stated as columns. The seam where the spokes become columns is the implementation’s motion; the settled state is this.'
}, (st) => {
  triad(st, { jobs: 3, voice: RECEDE.statement });
  split(st, {});
});

cell('s12-b2', {
  scene: 'S12', beat: 2, frame: 'S12-F1', klass: 'PORT', review: 'approved',
  source: 'the installed household beat through 3-02’s column treatment',
  caption: 'Beat 2 · the household beat: you may already live the split. The columns fill in the legacy’s own word register — one money · the same money · property · shares · gold.',
  flag: 'The household row’s on-screen words are drafted from the installed script (paid in one money, your home priced in it, savings in property, shares, gold) — the legacy columns only ever carried Argentina. Your word pass owns the final copy; the treatment is the legacy’s.'
}, (st) => {
  split(st, { cells: HOUSEHOLD_CELLS });
});

cell('s12-b3', {
  scene: 'S12', beat: 3, frame: 'S12-F1', klass: 'PORT', review: 'approved',
  source: '3-02-the-functions-separate, build 2 — THE REVERT LANDED (r2 ruling 2)',
  caption: 'Beat 3 · Argentina lands the legacy way, as you ruled it: the row arrives in the columns — USD · ARS · USD and the brick — under the legacy kicker, “Argentina, five decades.”, at full voice, exactly as 3-02 builds it. The five-decade span and the every-stripe clause ride the spoken beat, not a block. The r1 dated-fact block staging is retired to file as s12-b3-block.'
}, (st) => {
  split(st, { cells: ARGENTINA_CELLS, kicker: true });
});

cell('s12-b4', {
  scene: 'S12', beat: 4, frame: 'S12-F1', klass: 'PORT', review: 'approved',
  source: '3-02-the-functions-separate, build 3 — the principle',
  caption: 'Beat 4 · the principle lands at full voice in the legacy’s own slot, over the standing Argentina row and its kicker — the legacy slide’s own final state.',
  flag: 'The principle reads “jobs” where the legacy read “functions,” following the installed script and the act’s titles — one word, twice, flagged for your word pass as in r1.'
}, (st) => {
  split(st, { cells: ARGENTINA_CELLS, kicker: true, principle: true });
});

// ============================================================ SCENE 13 (6 beats)

cell('s13-b1', {
  scene: 'S13', beat: 1, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-03-the-order-of-monetization, build 1 — the empty rising line, the attribution',
  caption: 'Beat 1 · there is an order. The empty rising line enters — the ladder’s drawn grammar untouched — and the attribution stands on stage per your ruling: “after Vijay Boyapati.” Nothing else yet; the ascent is genuinely empty.'
}, (st) => {
  ladder(st, LADDER_STATES.line);
  orderOverlay(st, { step: 1 });
});

cell('s13-b2', {
  scene: 'S13', beat: 2, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-03 build 2 + r2 ruling 3 — collectible = your neutral mark',
  caption: 'Beat 2 · COLLECTIBLE stands on the line — the raw gem crystal, your neutral mark, in the rails-law band box above the line at the stop’s own clearance, never on it. No monetary asset is a stage mark anymore: the marks are the stages, not the climbers. Its arrival line beneath, in the script’s own words: “Held by a few people for their own strange reasons.” The first threshold tick sits dim above it.'
}, (st) => {
  ladder(st, LADDER_STATES.collectible, { lines: ['collectible'], latestLine: 'collectible' });
  orderOverlay(st, { step: 2 });
});

cell('s13-b3', {
  scene: 'S13', beat: 3, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-03 build 3 + r2 ruling 3 — store of value = the hourglass',
  caption: 'Beat 3 · STORE OF VALUE arrives: the hourglass steps up the line — the same object that marks the job at the triad’s spoke, one visual family — its arrival line beneath: “A place to park purchasing power on purpose.” The first gate brightens as its logic becomes visible; the second sits dim. The r1 stand-ins (gold · coinage · ledger) are retired by your ruling.'
}, (st) => {
  ladder(st, LADDER_STATES.sov, { lines: ['collectible', 'sov'], latestLine: 'sov' });
  orderOverlay(st, { step: 3 });
});

cell('s13-b4', {
  scene: 'S13', beat: 4, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: 'the social-technology beat (presenter-ruled, 2 Sep 2026) against 3-03’s standing state',
  caption: 'Beat 4 · the social-technology beat, as you ruled it: the ladder holds at two stages while the reason the order cannot run backward lands in the clear sky the un-arrived stages leave open — “The one good you use because everyone else uses it.” The coordination logic (one person holds, two agree, everyone converges) rides in the spoken beat; the vocabulary stays in the notes armor.',
  flag: 'The on-screen line is the installed script’s own clause, distilled by this sheet; its position in the upper-left sky is wiring. Your word pass owns the distillation.'
}, (st) => {
  ladder(st, LADDER_STATES.sov, { lines: ['collectible', 'sov'] });
  orderOverlay(st, { step: 4 });
  socialStatement(st);
});

cell('s13-b5', {
  scene: 'S13', beat: 5, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-03 builds 4–5 (merged by the frozen 6-beat map) + r2 ruling 3',
  caption: 'Beat 5 · the two gates open in one advance, as the frozen map splits it: MEDIUM OF EXCHANGE and UNIT OF ACCOUNT stand — the handshake and the balance scale completing the neutral object sequence — every threshold lit, and the two gate lines landing as a pair in the legacy’s own slots: “Nobody accepts as payment what they don’t expect to hold value.” / “Nobody writes contracts in what nobody accepts.” The social line recedes to the dimmed-prior step.',
  flag: 'The installed script speaks both gates on one advance, so both legacy gate lines land together here — the one beat on the sheet that lands a pair. The arrival lines beneath the two new stages speak S11’s own job lines.'
}, (st) => {
  ladder(st, LADDER_STATES.all, { lines: ['collectible', 'sov', 'moe', 'uoa'] });
  orderOverlay(st, { step: 5, gatelines: true });
  socialStatement(st, { a: 0.55 });
});

cell('s13-b6', {
  scene: 'S13', beat: 6, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-03 build 6 — the foundation state, the ladder’s only orange',
  caption: 'Beat 6 · the foundation: the store-of-value stop takes the accent — the ladder’s only orange, the component’s own foundation state, under the hourglass — and the foundation line lands at full voice while the gate lines settle to the legacy’s own dimmed step. The neutral object sequence stands complete above the drawn ascent.',
  flag: 'The foundation line reads “job” where the legacy read “function,” following the installed script — flagged for your word pass with S12’s principle.'
}, (st) => {
  ladder(st, LADDER_STATES.foundation, { lines: ['collectible', 'sov', 'moe', 'uoa'] });
  orderOverlay(st, { step: 6, gatelines: true, foundation: true });
  socialStatement(st, { a: 0.55 });
});

// ============================================================ SCENE 14 (4 beats)

cell('s14-b1', {
  scene: 'S14', beat: 1, frame: 'S14-F1', klass: 'ADAPT', review: 'approved', carried: true,
  source: 'the legacy objection beat + P1-F2’s display-scale study box — THE ONE RULED CHANGE: the coffee_cup render at display scale against the triad',
  caption: 'Beat 1 · the objection, made sensory: the coffee cup at display scale in the approved study geometry, the objection’s own words over it in the display register, and the triad beneath in its condensed home-base row — MEDIUM OF EXCHANGE at full voice, because that is the one job the objection is actually about. CARRIED BYTE-IDENTICAL FROM R1 — no ruling touches this cell.',
  flag: 'The full radial triad and a 540px study box cannot share the frame — the legacy triad geometry crosses the display box — so the home base recedes to its condensed row beneath the study, the way Act II’s rail kept its world rows beneath a featured moment. If you want the radial triad held instead (at a smaller render, or offset), that is a staging ruling. (Stands from r1, unanswered.)'
}, (st) => {
  photo(st.el, { subject: 'coffee_cup', alt: 'A cup of coffee', box: [744, 380, 432, 540] });
  studyStatement(st, '“But I can’t buy my coffee with Bitcoin.”');
  triadRow(st, { lit: 'moe' });
});

cell('s14-b2', {
  scene: 'S14', beat: 2, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-07-where-bitcoin-is, build 1 (the ladder returns resolved) + r2 ruling 3',
  caption: 'Beat 2 · the objection goes on the ladder you just built: the ladder returns in 3-07’s own resolved state — every stage standing under its neutral mark, every threshold lit — with the coffee cup placed at the MEDIUM OF EXCHANGE berth, above the handshake, and the beat’s line beneath: “A monetary good reaches everyday payments last.”',
  flag: 'Placing the coffee render at the medium stage’s berth is this sheet’s honest reading of “put that objection on the ladder” — one word retires it. The landing line is distilled from the installed script; your word pass owns it. (Stands from r1.)'
}, (st) => {
  ladder(st, LADDER_STATES.resolved, {
    lines: ['collectible', 'sov', 'moe', 'uoa'],
    berths: [{ at: 'moe', subject: 'coffee_cup', ar: 1122 / 1402, alt: 'The coffee objection, placed' }]
  });
  statement(st, 'A monetary good reaches everyday payments last.', { top: 850, size: 40 });
});

cell('s14-b3', {
  scene: 'S14', beat: 3, frame: 'S13-F1', klass: 'ADAPT', review: 'approved',
  source: '3-07-where-bitcoin-is, builds 2–3 (the entity berth at store of value) + r2 ruling 3',
  caption: 'Beat 3 · the placement — the scene’s payoff, now protected by your ruling: bitcoin’s coin stands at the entity berth above STORE OF VALUE, stage two of the ladder, THE ONLY MONETARY OBJECT IN SIGHT — the neutral marks beneath it are a crystal, an hourglass, a handshake, a scale, so the coin’s landing has the frame to itself. The coffee recedes at its berth, answered. The line: “Held on purpose, across years — one job: store of value.”',
  flag: 'The berth carries the coin render at the visitor cap (132 against the band’s 188) so the climber reads as a climber, not a fifth station. The landing line is distilled from the installed script. (Stands from r1.)'
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
  scene: 'S14', beat: 4, frame: 'S11-F1', klass: 'ADAPT', review: 'approved',
  source: '3-01’s triad (the home base returning) + r2 rulings 1 and 3 + the architecture’s own Scene 14 closing question',
  caption: 'Beat 4 · the pivot: the triad returns whole — the disc at its center, the job objects at its spokes — STORE OF VALUE at full voice while the other two jobs recede, and the act’s hinge question lands in the home frame’s own statement slot: “What makes something a good store of value?” This is also the door into the tower: Scene 15 enters through this corner.',
  flag: 'The brief’s re-render list names S14 b2–b3 only, but ruling 1 says the disc lives at the triad’s center wherever the home base appears — and this beat is the home base returning whole. The sheet re-rendered it under rulings 1 and 3 rather than carry a footprint that contradicts the ruling; the r1 cell is in the history if you wanted it untouched.'
}, (st) => {
  triad(st, { jobs: 3, lit: 'sov' });
  text(st, 'What makes something a good store of value?',
    'left:180px; right:180px; top:872px; text-align:center; text-indent:0;' + STATEMENT(1, 46));
});

// ================================== SCENE 15 (6 beats × 2 candidate systems)

const A_SOURCE = 'r2 ruling 4, candidate A — the proportional inverted tower (your spec)';
const B_SOURCE = 'r2 ruling 4, candidate B — the convergence of claims (this session’s design)';

cell('s15-b1-a', {
  scene: 'S15', beat: 1, frame: 'S15-F1', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE,
  caption: 'A · Beat 1 · the reveal opens where you live, at the frame’s top: PAYMENT APPS — the widest slab and the faintest, barely more than a trace. Width is claim volume, solidity is realness, and the top layer has the most claims and the least reality.'
}, (st) => {
  candidateA(st, 1);
});

cell('s15-b2-a', {
  scene: 'S15', beat: 2, frame: 'S15-F1', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE,
  caption: 'A · Beat 2 · the app balance is not money: BANK DEPOSITS lands beneath — narrower, more solid, a real outline — and the first claim line hangs in the gap with the legacy caption in its slot: “a claim on your deposit.” The tower is descending toward something.'
}, (st) => {
  candidateA(st, 2);
});

cell('s15-b3-a', {
  scene: 'S15', beat: 3, frame: 'S15-F1', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE,
  caption: 'A · Beat 3 · BASE MONEY — Act III’s one term, landing at the bottom as a narrow, SOLID, near-luminous block, the one solid object in the frame, its label dark against the light. The shape is complete and it argues by itself: wide and faint above, small and real beneath. The run line lands in its slot: “More claims than base. That is what a bank run runs on.”',
  flag: 'The proportions (1240 · 880 · 260) are qualitative and deliberately not a displayed ratio — the legacy tower’s own recorded law, with the drama turned up as your spec orders. If you want measured ratios, that is a data decision with a source, not a drawing change.'
}, (st) => {
  candidateA(st, 3);
});

cell('s15-b4-a', {
  scene: 'S15', beat: 4, frame: 'S15-F1', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE,
  caption: 'A · Beat 4 · fair in both directions: the principle lands — “Layers are not a scam — they are how money scales. But layers inherit the soundness of their base.” THE SHIVER IS THIS BEAT’S EVENT, kept per your ruling: the luminous base flickers once and the shudder travels up through the outlined layers — choreography over this unchanged state; the still holds the state.'
}, (st) => {
  candidateA(st, 4);
});

cell('s15-b5-a', {
  scene: 'S15', beat: 5, frame: 'S15-F1', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE,
  caption: 'A · Beat 5 · the scoping: the wide faint layers recede further — engineering on top, excellent but not the question — and the solid base takes the scene’s single allowed orange in its glow. The scoping line at full voice in its slot: “The real question is about the foundation asset — underneath them all.”'
}, (st) => {
  candidateA(st, 5);
});

cell('s15-b6-a', {
  scene: 'S15', beat: 6, frame: 'S15-F2', klass: 'NEW', review: 'approved', system: 'A',
  source: A_SOURCE + ' + 3-06’s own held-question beat',
  caption: 'A · Beat 6 · the held question, as 3-06 always played it: every line of copy off stage, and the bottom-most claim line — the legacy drop drawing itself — reaching from the solid base into empty black and dissolving, pointing at nothing. No disc, per ruling 1: the question is spoken and held, and Scene 16 opens through it.'
}, (st) => {
  candidateA(st, 6);
});

cell('s15-b1-b', {
  scene: 'S15', beat: 1, frame: 'S15-F1', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE,
  caption: 'B · Beat 1 · the same opening, drawn as counting: PAYMENT APPS is twenty-four faint open marks scattered across the frame’s top — the balances where you live, many and thin. No boxes anywhere in this system: claim volume is multiplicity.'
}, (st) => {
  candidateB(st, 1);
});

cell('s15-b2-b', {
  scene: 'S15', beat: 2, frame: 'S15-F1', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE,
  caption: 'B · Beat 2 · every app mark hangs by a drawn claim-line on one of SIX deposit marks beneath — the first fan, twenty-four lines onto six points, with the legacy caption beside it: “a claim on your deposit.” A number that points at another number, drawn literally.'
}, (st) => {
  candidateB(st, 2);
});

cell('s15-b3-b', {
  scene: 'S15', beat: 3, frame: 'S15-F1', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE,
  caption: 'B · Beat 3 · BASE MONEY — the six deposit marks converge onto ONE small bright point at the bottom: 24 → 6 → 1, more lines above than points below, the bank-run arithmetic drawn as counting rather than width. The legacy caption beside the convergence — “a claim on base money.” — and the run line in its slot.',
  flag: 'The counts (24 apps · 6 deposits · 1 base) are wiring — the argument is the convergence, not the numbers, and no ratio is displayed or implied. One number changes any row.'
}, (st) => {
  candidateB(st, 3);
});

cell('s15-b4-b', {
  scene: 'S15', beat: 4, frame: 'S15-F1', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE,
  caption: 'B · Beat 4 · the principle lands in its slot, fair in both directions — and THE SHIVER IS THIS BEAT’S EVENT here too: the base point flickers once and the shudder travels up every claim-line of both fans — the same proven choreography, carried by lines instead of slabs. The still holds the state.'
}, (st) => {
  candidateB(st, 4);
});

cell('s15-b5-b', {
  scene: 'S15', beat: 5, frame: 'S15-F1', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE,
  caption: 'B · Beat 5 · the scoping: both fans and the upper rows recede to a third of their voice, and the one base point takes the scene’s single allowed orange in its glow — the question narrowing visibly from many, through few, to one. The scoping line at full voice in its slot.'
}, (st) => {
  candidateB(st, 5);
});

cell('s15-b6-b', {
  scene: 'S15', beat: 6, frame: 'S15-F2', klass: 'NEW', review: 'on-file', system: 'B',
  source: B_SOURCE + ' + 3-06’s own held-question beat',
  caption: 'B · Beat 6 · the held question: all copy off stage, and from the one bright point the bottom-most claim line — the legacy drop drawing — continues downward into empty black and dissolves. Everything above converged on this point; what does the point rest on? No disc, per ruling 1.'
}, (st) => {
  candidateB(st, 6);
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
