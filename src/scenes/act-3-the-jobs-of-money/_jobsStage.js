// Act III — the shared stage for Scenes 11 through 15 (Batch C).
//
// One continuous visual world: the scene modules share this one stage object,
// cached on the engine's container across within-group handoffs, so every
// in-act boundary — S11→S12, S12→S13, and Session 2's S13→S14, S14→S15 — is
// real shared-DOM continuity and never a remount. Scenes 11–13 landed at
// Session 1; Scenes 14–15 join at Session 2. The scenes drive it through two
// surfaces only, exactly as Act I's and Act II's stages established:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any build, instantly. Direct entry,
//                                 backward movement, reduced motion and
//                                 interrupted animations all resolve here.
//   timeline()                  — a registered GSAP timeline for a forward
//                                 gesture. Every timeline ends by snapping to
//                                 applyState, so a settled frame is always
//                                 exactly the approved cell it must match.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every coordinate, style string and
// component mount below is transcribed from `review/act-3/harness/states.mjs`
// — the builders that rendered the approved cells (states.json `approval` /
// `approvedSet`: the go-ahead of 2 September 2026, with the nine
// medium-bearing cells re-rendered the same day under the medium-replacement
// ruling, before this file was written, so what is transcribed here is final
// geometry). The landed-state proof proves the match mechanically, pixel
// against pixel. Derivation is banned: nothing settled here exists outside an
// approved cell.
//
// THE ACT'S OWN LAW, carried by construction:
//   · THE DISC HOLDS THE TRIAD'S CENTER wherever the home base appears — the
//     legacy token by its own classes (`luminous-disc s1q-token
//     s1q-token--small s3f-functions__token`), literally 1.2's disc. It is
//     built in exactly one place (the triad's hub) and never on the tower.
//   · THE NEUTRAL MARKS arrive at the rails-law band scale (188 contain, own
//     aspect), above the drawn lines, never on them; their arrival rides the
//     legacy reveal of the element that carries them (the fn entry's own
//     rise, the ladder stop's own state gesture — the Act II band's proven
//     arrival), each with its line beneath.
//   · THE FOUNDATION BEAT carries the act's accent exactly as the approved
//     cell has it — `StageLadder`'s own foundation state, nothing else
//     orange in these three scenes.
//
// PORTS MOUNT THE COMPONENTS THE LEGACY RUNS. The ladder is `StageLadder` at
// the states legacy `3-03` drives (with the one ruled change the sheet
// carries: glyphs out, the neutral renders standing in the stops, driven by
// the component's own state machine). Where the port is a slide's own
// composition — the triad (`3-01`), the split (`3-02`) — the stage rebuilds
// that slide's DOM against THE SAME CSS CLASSES, so the legacy stylesheet
// does the placing and the legacy transitions carry the motion: an advance
// here is dataset choreography, exactly as the legacy slides perform it.
//
// THE ROOT'S CLASSES ARE LOAD-BEARING: `s2o s3f s4-opening` are the legacy
// section roots the states builders carried; `.s2o[data-snap]` /
// `.s4-opening[data-snap]` are the stage-wide transition kills that make
// instant reconstruction exact. The opaque black ground is half the
// rasterization contract; the shared rasterHint claim is the other half.

import { gsap } from 'gsap';
import { DarkFieldImage } from '../../components/DarkField.js';
import { StageLadder } from '../../components/section-3/StageLadder.js';
import { glyph } from '../../components/section-2/glyphs.js';
import { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- type registers
//
// The deck's registers at the values the states builders ship
// (review/act-2/harness/systems.mjs — transcribed verbatim, concatenation
// order included: a duplicated property in a cssText string resolves to the
// later declaration, so the order is part of the geometry).

const KICKER = (a = 0.5) => 'font-size:20px; font-weight:500; letter-spacing:0.32em;' +
  `text-indent:0.32em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
const CAPS = (a = 0.75, size = 26) => `font-size:${size}px; font-weight:560;` +
  `letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
const STATEMENT = (a = 1, size = 46) => `font-size:${size}px; font-weight:540;` +
  `letter-spacing:-0.012em; line-height:1.3; color:rgba(255,255,255,${a});`;

// The overlay grammar's recession voices (the Act II grammar the sheet
// carries): a home frame receded beneath a statement holds 0.35.
export const RECEDE = { none: 1, statement: 0.35, deep: 0.08 };

// ---------------------------------------------------------------- geometry law
//
// Transcribed from review/act-3/harness/states.mjs; nothing settled here is
// chosen.

// The rails-law band box as amended by r2.5 (AGENTS.md §6): ONE SHARED BOX,
// both axes capped at 188, each render in a box of its own aspect scaled to
// fit inside it.
const BAND = 188;
const bandBox = (ar) => {
  const h = Math.min(BAND, BAND / ar);
  return [h * ar, h];
};
const MARK_AR = 1672 / 941;
// `medium` was replaced 2 Sep 2026 (Batch C ruling 3): same near-16:9 family,
// its own measured frame (842 × 474).
const MEDIUM_AR = 842 / 474;

// The triad (S11-F1, ADAPT): 3-01's composition with the neutral job objects
// at the spokes. The spoke axis and the mark clearance are the sheet's.
const JOBS = [
  { key: 'sov', subject: 'store', ar: MARK_AR, alt: 'An hourglass', name: 'STORE OF VALUE', sub: 'moves value through time.' },
  { key: 'moe', subject: 'medium', ar: MEDIUM_AR, alt: 'A hand-off in mid-transfer', name: 'MEDIUM OF EXCHANGE', sub: 'moves value between people.' },
  { key: 'uoa', subject: 'unit', ar: MARK_AR, alt: 'A balance scale', name: 'UNIT OF ACCOUNT', sub: 'measures value.' }
];
const CONTINUITY =
  'Across time. Across space. Across scale. The three dimensions of the competition — seen from the inside.';
const SPOKE_Y = 399.5;
const MARK_CLEAR = 32;

// The split (S12-F1, PORT): 3-02's own words and rows.
const COLS = ['PRICED IN', 'PAID IN', 'SAVED IN'];
const SPLIT_CELLS = {
  household: [
    { marks: [], word: 'one money' },
    { marks: [], word: 'the same money' },
    { marks: [], word: 'property · shares · gold' }
  ],
  argentina: [
    { marks: [{ text: 'USD' }], word: 'dollars' },
    { marks: [{ text: 'ARS' }], word: 'pesos' },
    { marks: [{ text: 'USD' }, { glyph: 'brick' }], word: 'dollars · real estate' }
  ]
};
const LEGACY_KICKER = 'Argentina, five decades.';
const PRINCIPLE_SPLIT =
  'The jobs are separable — across goods, and across time. A good can be money in one job before it’s money in the others.';

// The ladder (S13-F1, ADAPT): StageLadder's own stops; the neutral marks.
const LADDER_STOPS = {
  collectible: [420, 660], sov: [800, 563.3], moe: [1180, 466.7], uoa: [1560, 370]
};
const STAGE_RENDERS = {
  collectible: { subject: 'collectible', ar: MARK_AR, alt: 'A raw uncut gem crystal' },
  sov: { subject: 'store', ar: MARK_AR, alt: 'An hourglass' },
  moe: { subject: 'medium', ar: MEDIUM_AR, alt: 'A hand-off in mid-transfer' },
  uoa: { subject: 'unit', ar: MARK_AR, alt: 'A balance scale' }
};
const BAND_CLEAR = 64;

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
export const LADDER_STATES = {
  line: { line: true, stages: stageState(0), gates: {} },
  collectible: { line: true, stages: stageState(1), gates: { g1: 'dim' } },
  sov: { line: true, stages: stageState(2), gates: { g1: 'bright', g2: 'dim' } },
  all: { line: true, stages: stageState(4), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } },
  foundation: { line: true, stages: stageState(4, true), gates: { g1: 'bright', g2: 'bright', g3: 'bright' } }
};

const GATELINE_ONE = 'Nobody accepts as payment what they don’t expect to hold value.';
const GATELINE_TWO = 'Nobody writes contracts in what nobody accepts.';
const FOUNDATION_LINE =
  'Store of value is the foundation job. The other jobs are built on it.';
const SOCIAL_LINE = 'The one good you use because everyone else uses it.';
const ORDER_KICKER = 'after Vijay Boyapati.';

// ------------------------------------------------------------------ the states
//
// One entry per approved cell, in beat order. The scene ids are permanent
// deep links, chosen for what each scene is.

export const STATES = {
  // S11 — the approved cells s11-b1 … s11-b5.
  'three-familiar-jobs': [
    { triad: { jobs: 0 } },
    { triad: { jobs: 1 } },
    { triad: { jobs: 2 } },
    { triad: { jobs: 3 } },
    { triad: { jobs: 3, continuity: true } }
  ],
  // S12 — the approved cells s12-b1 … s12-b4 (the reverted PORT staging).
  'we-already-split-those-jobs': [
    { triad: { jobs: 3, voice: RECEDE.statement }, split: {} },
    { split: { cells: 'household' } },
    { split: { cells: 'argentina', kicker: true } },
    { split: { cells: 'argentina', kicker: true, principle: true } }
  ],
  // S13 — the approved cells s13-b1 … s13-b6.
  'the-order-of-monetization': [
    { ladder: 'line', step: 1 },
    { ladder: 'collectible', lines: ['collectible'], latest: 'collectible', step: 2 },
    { ladder: 'sov', lines: ['collectible', 'sov'], latest: 'sov', step: 3 },
    { ladder: 'sov', lines: ['collectible', 'sov'], social: 1, step: 4 },
    { ladder: 'all', lines: ['collectible', 'sov', 'moe', 'uoa'], social: 0.55, gatelines: true, step: 5 },
    { ladder: 'foundation', lines: ['collectible', 'sov', 'moe', 'uoa'], social: 0.55, gatelines: true, foundation: true, step: 6 }
  ]
};

export const TOTAL_BUILDS = Object.fromEntries(
  Object.entries(STATES).map(([id, states]) => [id, states.length - 1]));

export function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

// Hide an element that carries a CSS reveal transition, instantly — used at
// gesture launch points so an entry can start from darkness without the
// element's own fade playing backwards on the first frame.
export function hideInstantly(el, apply) {
  const prior = el.style.transition;
  el.style.transition = 'none';
  apply();
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight;
  el.style.transition = prior;
}

// ------------------------------------------------------------------- the stage

class Act3Stage {
  constructor(container) {
    this.container = container;
    this.motion = new Set();
    this.scene = null;
    this.build = 0;
    this.states = STATES;
    this._buildDom();
  }

  _buildDom() {
    const root = document.createElement('div');
    // The legacy section roots plus this act's own marker. The inline ground
    // duplicates `.s2o`'s — deliberately: the opaque black is load-bearing
    // for the rasterization contract and must not depend on a class resolving.
    root.className = 'act3-stage s2o s3f s4-opening';
    root.dataset.register = 'mixed';
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:#000;';
    this.root = root;

    // The drawn layer the cell stage carries first (structural parity with
    // the builders' stage(); nothing draws on it in Scenes 11–13).
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', '1920');
    svg.setAttribute('height', '1080');
    svg.style.cssText = 'position:absolute; inset:0;';
    root.appendChild(svg);
    this.svg = svg;

    // ---- THE TRIAD — the act's home base (the disc at its center) ----
    //
    // Built exactly as the cell builders build it, element for element and in
    // the same order: the token first (its glow paints beneath the drawn
    // spokes), then per job its spoke and its entry.
    const triadLayer = document.createElement('div');
    triadLayer.className = 's3f-functions-layer';
    triadLayer.style.cssText = 'position:absolute; inset:0; background:transparent; opacity:1;';
    root.appendChild(triadLayer);
    this.triadLayer = triadLayer;

    // THE DISC RETURNS (the r2 thread ruling): the legacy token, by its own
    // classes — literally 1.2's luminous disc, the same render, not a
    // resemblance. The one and only place the disc is built in this act.
    const token = document.createElement('div');
    token.className = 'luminous-disc s1q-token s1q-token--small s3f-functions__token';
    token.dataset.visible = 'true';
    triadLayer.appendChild(token);
    this.token = token;

    this.spokes = {};
    this.fns = {};
    this.fnMarks = {};
    JOBS.forEach((spec) => {
      const spoke = document.createElement('div');
      spoke.className = 's3f-functions__spoke';
      spoke.dataset.fn = spec.key;
      spoke.dataset.visible = 'false';
      triadLayer.appendChild(spoke);
      this.spokes[spec.key] = spoke;

      const fn = document.createElement('div');
      fn.className = 's3f-functions__fn';
      fn.dataset.fn = spec.key;
      fn.dataset.visible = 'false';

      // THE ONE RULED CHANGE: the job object in the rails-law band box, each
      // render in a box of its own aspect (the cell builders' geometry,
      // verbatim — the band form above the spoke axis at store/medium, the
      // vacated glyph slot at unit of account).
      const [w, h] = bandBox(spec.ar);
      const df = DarkFieldImage({ name: spec.subject, width: w, height: h, alt: spec.alt });
      df.el.dataset.visible = 'true';
      df.el.style.transition = 'none';
      if (spec.key === 'uoa') {
        df.el.style.margin = '0 auto';
        fn.appendChild(df.el);
      } else {
        const spacer = document.createElement('div');
        spacer.className = 's3f-functions__glyph';
        spacer.style.height = '56px';
        fn.appendChild(spacer);
        df.el.style.position = 'absolute';
        df.el.style.left = `${230 - w / 2}px`;
        df.el.style.top = `${SPOKE_Y - MARK_CLEAR - h - 372}px`;
        fn.appendChild(df.el);
      }
      this.fnMarks[spec.key] = df.el;

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
      triadLayer.appendChild(fn);
      this.fns[spec.key] = fn;
    });

    const continuity = document.createElement('p');
    continuity.className = 's3f-functions__continuity';
    continuity.dataset.visible = 'false';
    continuity.textContent = CONTINUITY;
    triadLayer.appendChild(continuity);
    this.continuity = continuity;

    // ---- THE SPLIT — 3-02's own DOM against its own classes ----
    const splitLayer = document.createElement('div');
    splitLayer.className = 's3f-separate';
    splitLayer.style.cssText = 'position:absolute; inset:0; background:transparent; opacity:1;';
    splitLayer.dataset.live = 'false';
    root.appendChild(splitLayer);
    this.splitLayer = splitLayer;

    this.heads = COLS.map((head, i) => {
      const h = document.createElement('p');
      h.className = 's3f-separate__head';
      h.dataset.col = String(i);
      h.dataset.visible = 'false';
      h.textContent = head;
      splitLayer.appendChild(h);
      return h;
    });
    this.cells = [0, 1, 2].map((i) => {
      const c = document.createElement('div');
      c.className = 's3f-separate__cell';
      c.dataset.col = String(i);
      c.dataset.visible = 'false';
      splitLayer.appendChild(c);
      return c;
    });
    this.cellsKind = null;
    const kicker = document.createElement('p');
    kicker.className = 's3f-separate__kicker';
    kicker.dataset.visible = 'false';
    kicker.textContent = LEGACY_KICKER;
    splitLayer.appendChild(kicker);
    this.splitKicker = kicker;
    const principle = document.createElement('p');
    principle.className = 's3f-separate__principle';
    principle.dataset.visible = 'false';
    principle.textContent = PRINCIPLE_SPLIT;
    splitLayer.appendChild(principle);
    this.principle = principle;

    // ---- THE LADDER — StageLadder mounted, the neutral marks in the stops ----
    const ladderLayer = document.createElement('div');
    ladderLayer.style.cssText = 'position:absolute; inset:0; background:transparent; opacity:1;';
    ladderLayer.style.display = 'none';
    root.appendChild(ladderLayer);
    this.ladderLayer = ladderLayer;

    this.lad = StageLadder();
    ladderLayer.appendChild(this.lad.el);

    // THE ONE RULED CHANGE: glyphs out, renders in — inside the stop itself,
    // so the component's own state machine (upcoming/revealed/foundation)
    // drives each render's presence and its arrival gesture exactly as it
    // drove the glyph's (the Act II band's proven arrival: the mark rises
    // with its station's own reveal).
    this.lad.el.querySelectorAll('.s3f-ladder__stop').forEach((stop) => {
      const g = stop.querySelector('.s3f-ladder__glyph');
      if (g) g.remove();
      const spec = STAGE_RENDERS[stop.dataset.stage];
      if (!spec) return;
      const [w, h] = bandBox(spec.ar);
      const df = DarkFieldImage({ name: spec.subject, width: w, height: h, alt: spec.alt });
      df.el.dataset.visible = 'true';
      df.el.style.position = 'absolute';
      df.el.style.left = `${-w / 2}px`;
      df.el.style.top = `${-(BAND_CLEAR + h)}px`;
      stop.appendChild(df.el);
    });

    // The arrival lines (the arrival-line rule applied to the ladder): one
    // row element per stop, rebuilt per state in the rail's own row register.
    this.arrivalEls = {};
    Object.keys(LADDER_STOPS).forEach((key) => {
      const p = document.createElement('p');
      p.style.cssText = 'position:absolute; margin:0; opacity:0;';
      ladderLayer.appendChild(p);
      this.arrivalEls[key] = p;
    });

    // ---- the order overlay — 3-03's copy against its own classes ----
    const orderLayer = document.createElement('div');
    orderLayer.className = 's3f-order';
    orderLayer.style.cssText = 'position:absolute; inset:0; background:transparent; opacity:1;';
    orderLayer.style.display = 'none';
    orderLayer.dataset.step = '0';
    root.appendChild(orderLayer);
    this.orderLayer = orderLayer;

    const ok = document.createElement('p');
    ok.className = 's3f-order__kicker';
    ok.dataset.visible = 'false';
    ok.textContent = ORDER_KICKER;
    orderLayer.appendChild(ok);
    this.orderKicker = ok;
    this.gatelines = [GATELINE_ONE, GATELINE_TWO].map((copy, i) => {
      const p = document.createElement('p');
      p.className = 's3f-order__gateline';
      p.dataset.q = String(i + 1);
      p.dataset.visible = 'false';
      p.textContent = copy;
      orderLayer.appendChild(p);
      return p;
    });
    const found = document.createElement('p');
    found.className = 's3f-order__foundation';
    found.dataset.visible = 'false';
    found.textContent = FOUNDATION_LINE;
    orderLayer.appendChild(found);
    this.foundationLine = found;

    // The social-technology beat's line — after the order layer, exactly as
    // the cell builders append it.
    const social = document.createElement('p');
    social.textContent = SOCIAL_LINE;
    social.style.cssText = 'position:absolute; margin:0; ' +
      'left:200px; top:200px; width:640px; text-indent:0;' + STATEMENT(1, 40);
    social.style.opacity = '0';
    root.appendChild(social);
    this.social = social;
  }

  // ---- per-element appliers (each writes exactly the cell builders' form) ----

  _applyTriad(conf) {
    const layer = this.triadLayer;
    if (!conf) {
      // Out of the paint tree entirely, not merely transparent: a layer held
      // at opacity 0 still composites, and a composited layer beneath text
      // flips that text to grayscale antialiasing — the approved cells carry
      // no such layer, so neither may the settled scene (the landed-state
      // proof caught exactly this, per pixel).
      layer.style.opacity = '0';
      layer.style.display = 'none';
      return;
    }
    layer.style.display = '';
    layer.style.opacity = String(conf.voice == null ? 1 : conf.voice);
    setVisible(this.token, true);
    JOBS.forEach((spec, i) => {
      const on = i < conf.jobs;
      setVisible(this.spokes[spec.key], on);
      setVisible(this.fns[spec.key], on);
      this.fns[spec.key].style.opacity = conf.lit
        ? (spec.key === conf.lit ? '1' : '0.55') : '';
    });
    setVisible(this.continuity, Boolean(conf.continuity));
  }

  // The split cells' content, rebuilt as split() builds it — glyph row then
  // word — so the DOM under each visible cell is the approved cell's own.
  setCellsContent(kind) {
    if (this.cellsKind === kind) return;
    this.cellsKind = kind;
    const spec = SPLIT_CELLS[kind] || SPLIT_CELLS.household;
    this.cells.forEach((c, i) => {
      c.innerHTML = '';
      const glyphs = document.createElement('div');
      glyphs.className = 's3f-separate__glyphs';
      spec[i].marks.forEach((mark) => {
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
      w.textContent = spec[i].word;
      c.appendChild(w);
    });
  }

  _applySplit(conf) {
    const layer = this.splitLayer;
    if (!conf) {
      // Same rule as the triad: absent means out of the paint tree.
      layer.style.opacity = '0';
      layer.style.display = 'none';
      this.heads.forEach((h) => setVisible(h, false));
      this.cells.forEach((c) => setVisible(c, false));
      setVisible(this.splitKicker, false);
      setVisible(this.principle, false);
      return;
    }
    layer.style.display = '';
    layer.style.opacity = '1';
    layer.dataset.live = 'false';
    this.heads.forEach((h) => setVisible(h, true));
    if (conf.cells) this.setCellsContent(conf.cells);
    this.cells.forEach((c) => setVisible(c, Boolean(conf.cells)));
    setVisible(this.splitKicker, Boolean(conf.kicker));
    setVisible(this.principle, Boolean(conf.principle));
  }

  // An arrival line in its settled register (the rail's row register at the
  // stop, the latest at full voice, the prior at the dimmed-prior step).
  setArrival(key, { latest = false } = {}) {
    const [x, y] = LADDER_STOPS[key];
    const el = this.arrivalEls[key];
    el.textContent = STAGE_LINES[key];
    el.style.cssText = 'position:absolute; margin:0; ' +
      `left:${x - 109}px; top:${y + 92}px; width:218px; text-align:center; text-indent:0;` +
      'font-size:17px; font-weight:420; line-height:1.45;' +
      `color:rgba(255,255,255,${latest ? 1 : 0.58});`;
    return el;
  }

  _applyLadder(conf) {
    const on = Boolean(conf && conf.ladder);
    this.ladderLayer.style.display = on ? '' : 'none';
    this.orderLayer.style.display = on ? '' : 'none';
    if (!on) {
      this.social.style.opacity = '0';
      return;
    }
    this.lad.applyState(LADDER_STATES[conf.ladder], { live: false });
    const lines = conf.lines || [];
    Object.keys(this.arrivalEls).forEach((key) => {
      if (lines.includes(key)) {
        this.setArrival(key, { latest: key === conf.latest });
        this.arrivalEls[key].style.opacity = '';
      } else {
        this.arrivalEls[key].style.opacity = '0';
      }
    });
    this.orderLayer.dataset.step = String(conf.step);
    setVisible(this.orderKicker, true);
    this.gatelines.forEach((g) => setVisible(g, Boolean(conf.gatelines)));
    setVisible(this.foundationLine, Boolean(conf.foundation));
    if (conf.social) {
      this.social.style.cssText = 'position:absolute; margin:0; ' +
        'left:200px; top:200px; width:640px; text-indent:0;' + STATEMENT(conf.social, 40);
      this.social.style.opacity = '';
    } else {
      this.social.style.opacity = '0';
    }
  }

  applyState(sceneId, build) {
    this.killMotion();
    const st = this.states[sceneId][build];
    this.scene = sceneId;
    this.build = build;

    this.root.dataset.snap = 'true';
    gsap.killTweensOf([
      this.triadLayer, this.splitLayer, this.social, this.token,
      ...this.cells, ...Object.values(this.arrivalEls), ...this.gatelines
    ]);
    gsap.set([
      this.triadLayer, this.splitLayer, this.social,
      ...this.cells, ...Object.values(this.arrivalEls), ...this.gatelines
    ], { clearProps: 'opacity,y,x,scale' });

    this._applyTriad(st.triad);
    this._applySplit(st.split);
    this._applyLadder(st);

    // Force style resolution while snapped, then restore transitions.
    // eslint-disable-next-line no-unused-expressions
    this.root.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      delete this.root.dataset.snap;
    }));
  }

  // ---- motion registry ----

  timeline(vars = {}) {
    const tl = gsap.timeline(vars);
    this.motion.add(tl);
    tl.eventCallback('onComplete', () => this.motion.delete(tl));
    return tl;
  }

  killMotion() {
    this.motion.forEach((tl) => tl.kill());
    this.motion.clear();
  }

  hasMotion() {
    return this.motion.size > 0;
  }

  // Serialized settled state — the harness compares this between motion-on
  // and reduced-motion runs to prove end-state parity mechanically.
  serialize() {
    const text = (el) => [el.textContent, el.style.cssText, getComputedStyle(el).opacity];
    return {
      scene: this.scene,
      build: this.build,
      triad: {
        voice: this.triadLayer.style.opacity,
        token: [this.token.dataset.visible, getComputedStyle(this.token).opacity],
        spokes: JOBS.map((j) => [j.key, this.spokes[j.key].dataset.visible]),
        fns: JOBS.map((j) => [j.key, this.fns[j.key].dataset.visible,
          this.fns[j.key].style.opacity, getComputedStyle(this.fns[j.key]).opacity]),
        marks: JOBS.map((j) => {
          const el = this.fnMarks[j.key];
          return [j.key, el.dataset.subject, el.style.left, el.style.top,
            el.style.getPropertyValue('--df-w'), getComputedStyle(el).opacity];
        }),
        continuity: [this.continuity.dataset.visible, getComputedStyle(this.continuity).opacity]
      },
      split: {
        voice: this.splitLayer.style.opacity,
        live: this.splitLayer.dataset.live,
        heads: this.heads.map((h) => [h.dataset.visible, getComputedStyle(h).opacity]),
        kind: this.cellsKind,
        cells: this.cells.map((c) => [c.dataset.visible, c.textContent,
          getComputedStyle(c).opacity]),
        kicker: [this.splitKicker.dataset.visible, getComputedStyle(this.splitKicker).opacity],
        principle: [this.principle.dataset.visible, getComputedStyle(this.principle).opacity]
      },
      ladder: {
        display: this.ladderLayer.style.display,
        el: { ...this.lad.el.dataset },
        stops: Object.keys(LADDER_STOPS).map((k) => {
          const s = this.lad.el.querySelector(`[data-stage="${k}"]`);
          return [k, s.dataset.state, getComputedStyle(s.querySelector('.df')).opacity];
        }),
        gates: ['g1', 'g2', 'g3'].map((k) =>
          [k, this.lad.el.querySelector(`[data-gate="${k}"]`).dataset.mark]),
        arrivals: Object.keys(this.arrivalEls).map((k) => [k, ...text(this.arrivalEls[k])])
      },
      order: {
        display: this.orderLayer.style.display,
        step: this.orderLayer.dataset.step,
        kicker: [this.orderKicker.dataset.visible, getComputedStyle(this.orderKicker).opacity],
        gatelines: this.gatelines.map((g) => [g.dataset.visible, getComputedStyle(g).opacity]),
        foundation: [this.foundationLine.dataset.visible, getComputedStyle(this.foundationLine).opacity]
      },
      social: text(this.social),
      root: [this.root.className, this.root.dataset.step || '']
    };
  }

  destroy() {
    this.killMotion();
    gsap.killTweensOf(this.root.querySelectorAll('*'));
    gsap.killTweensOf(this.root);
    this.lad.destroy();
    this.root.remove();
  }
}

// The stage rides the engine's container so a within-group handoff finds it
// alive; a cold mount builds it fresh. Deterministic init, tolerant re-entry.
export function ensureStage(container) {
  if (container.__act3Stage) return container.__act3Stage;
  container.innerHTML = '';
  // While Act III is on stage, release the deck canvas's layer hint so its
  // text rasterizes the way the approved cells did (components/rasterHint.js).
  const canvas = claimRasterHint(container);
  const stage = new Act3Stage(container);
  stage._canvas = canvas;
  container.appendChild(stage.root);
  container.__act3Stage = stage;
  window.__act3 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize(),
    apply: (sceneId, build) => stage.applyState(sceneId, build)
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__act3Stage;
  if (!stage) return;
  releaseRasterHint(stage._canvas);
  stage.destroy();
  delete container.__act3Stage;
  if (window.__act3) delete window.__act3;
}
