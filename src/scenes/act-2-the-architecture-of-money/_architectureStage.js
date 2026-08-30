// Act II — the shared stage for Scenes 5, 6 and 7 (Batch B, Session 1).
//
// One continuous visual world: the three scene modules share this one stage
// object, cached on the engine's container across within-group handoffs, so
// the S5→S6 and S6→S7 boundaries are real shared-DOM continuity and never a
// remount. Scenes 8–10 join this stage in Session 2. The scenes drive it
// through two surfaces only, exactly as Act I's stage established:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any of the 22 builds, instantly. Direct
//                                 entry, backward movement, reduced motion
//                                 and interrupted animations all resolve
//                                 here.
//   timeline()                  — a registered GSAP timeline for a forward
//                                 gesture. Every timeline ends by snapping to
//                                 applyState, so a settled frame is always
//                                 exactly the approved cell it must match.
//
// THE GEOMETRY IS LAW, NOT DESIGN — and under the full-coverage rule the law
// is the beat-state sheet. Every coordinate, style string and component
// mount below is transcribed from `review/act-2/harness/states.mjs` — the
// builders that rendered the approved cells (states.json `approvedSet`,
// ruling 4 of the Batch B brief §1) — so the settled states match the
// approved cells by construction. The landed-state proof proves it
// mechanically, pixel against pixel. Derivation is banned: nothing settled
// here exists outside an approved cell.
//
// PORTS MOUNT THE COMPONENTS THE LEGACY RUNS. The competition record is
// `EvolutionRail` at the states the legacy 2-04 drives it through; the
// elimination is `ElementGrid` behind the legacy 2-05's own DOM against the
// legacy's own classes (the stage root carries `s2o`, so the legacy
// stylesheet does the placing); the through-line composition is `ClaimObject`
// in `CarrierShell` exactly as 4-06 stages them. Their motion is the
// components' own — the wound landings, the camera move, the elimination
// waves are CSS and camera state the components already ship.
//
// THE ROOT'S CLASSES ARE LOAD-BEARING: `s2o s3f s4-opening` are the legacy
// section roots the states builders carried, which is what lets a ported
// element rebuild a legacy slide's DOM and have the legacy stylesheet place
// it exactly — and `.s2o[data-snap]` is the stage-wide transition kill that
// makes instant reconstruction exact. The opaque black ground is half the
// rasterization contract; the shared rasterHint claim is the other half.

import { gsap } from 'gsap';
import { DarkFieldImage } from '../../components/DarkField.js';
import { ClaimObject } from '../../components/section-4/ClaimObject.js';
import { CarrierShell } from '../../components/section-4/CarrierShell.js';
import { ElementGrid } from '../../components/section-2/ElementGrid.js';
import { EvolutionRail, FRAMES } from '../../components/section-2/EvolutionRail.js';
import { glyph } from '../../components/section-2/glyphs.js';
import { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';

const svgNS = 'http://www.w3.org/2000/svg';

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- type registers
//
// The deck's registers at the values the states builders ship
// (review/act-2/harness/systems.mjs — KICKER, CAPS, STATEMENT, RAIL_LABEL,
// RAIL_ROW). Transcribed verbatim, concatenation order included: a duplicated
// property in a cssText string resolves to the later declaration, so the
// order is part of the geometry.

const KICKER = (a = 0.5) => 'font-size:20px; font-weight:500; letter-spacing:0.32em;' +
  `text-indent:0.32em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
const CAPS = (a = 0.75, size = 26) => `font-size:${size}px; font-weight:560;` +
  `letter-spacing:0.14em; text-transform:uppercase; color:rgba(255,255,255,${a});`;
const STATEMENT = (a = 1, size = 46) => `font-size:${size}px; font-weight:540;` +
  `letter-spacing:-0.012em; line-height:1.3; color:rgba(255,255,255,${a});`;
const RAIL_LABEL = (a = 0.75) => `font-size:25px; font-weight:500; letter-spacing:0.16em;` +
  `color:rgba(255,255,255,${a});`;

// The film's line-system voices (systems.mjs VOICE), for the mass diagram.
const VOICE = { line: 0.35, lineDim: 0.18, dot: 0.7 };

// ---------------------------------------------------------------- geometry law
//
// Transcribed from the states builders; nothing settled here is chosen.

export const GEOM = {
  // P1-F2's approved display-scale study box: 540 tall, centred at (960, 650)
  // — the gold study (s6-b1) and the vault study (s7-b3) both land in the
  // builders' default landscape box.
  studyBox: [600, 380, 720, 540],
  // WIRING (the sheet's): the statement over a study sits at y 246.
  studyStatement: (copy) => [copy,
    'left:200px; right:200px; top:246px; text-align:center; text-indent:0;' + CAPS(0.92, 40)],

  // The claim label under the 4-06 scene box (states.mjs claimInCarrier).
  claimLabel: (voice) => 'left:660px; top:700px; width:600px; text-align:center; text-indent:0;' +
    RAIL_LABEL(voice),
  // The claim-in-carrier composition's centre — the scene box (700, 400,
  // 520 × 240) and the claim stage centre both resolve to (960, 520); the
  // slide's own CSS places them, so the numbers here serve only the entry
  // gesture's travel target.
  claimCentre: [960, 520],
  // Scene 4's resting claim (s4-b5-b, `_exchangeStage.js` GEOM.markSaveB) —
  // where the held claim enters Act II from.
  s4Rest: [1530, 630],
  claimSize: 116,

  // The deck's statement register on this stage (states.mjs statement()).
  statement: (copy, top = 812, size = 46, a = 1) => [copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` + STATEMENT(a, size)],

  // The evidence grammar's Zanzibar specimen (states.mjs evidence + SPECIMEN).
  evidence: {
    place: ['WEST AFRICA', 'left:0; right:0; top:372px; text-align:center; text-indent:0;' + KICKER(0.5)],
    date: ['1800s',
      'left:0; right:0; top:424px; text-align:center; text-indent:0;' +
      'font-size:128px; font-weight:650; letter-spacing:-0.02em;' +
      'font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);'],
    fact: ['Shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.',
      'left:300px; right:300px; top:634px; text-align:center; text-indent:0;' +
      'font-size:33px; font-weight:460; line-height:1.45; letter-spacing:-0.008em;' +
      'color:rgba(255,255,255,1);']
  },

  // The detachment (s7-b4): the photograph-plus-line pattern's boxes and the
  // dependency line in Act I's own service-path grammar.
  vaultPhoto: [340, 208, 500, 625],
  certPhoto: [1230, 187, 340, 425],
  depLine: [890, 512, 1180, 428, 0.35, 1.5],
  depDots: [[890, 512, 3.5, 0.7], [1180, 428, 3.5, 0.7]],

  // The metals render box on S5's record (s5-b5): the component's own render
  // markup mirrored at the band's world baseline (bottom −52).
  metalsBox: { w: 240, h: 135 },

  // The mass state (s6-b9 — the selected counted load, massCounted()).
  mass: {
    y: 380, xs: [430, 960, 1490], lineX: [250, 1670],
    steps: [
      { value: 'ONE CLAIM', bars: 1 },
      { value: 'FOUR', bars: 4 },
      { value: 'TWELVE', bars: 12 }
    ]
  }
};

// The S5 record's rail states (states.mjs s5Row / the s5-b5 builder).
const S5_ROW_CAM = { camera: FRAMES.row, contenders: true, renders: true, line: false };
const ROW_STOP = (state, wound = false, latest = false) => ({ state, wound, latest });
export const s5Row = (wounded, latest) => ({
  ...S5_ROW_CAM,
  stops: {
    cattle: ROW_STOP('lit', wounded.includes('cattle') && 'contender', latest === 'cattle'),
    salt: ROW_STOP('lit', wounded.includes('salt') && 'contender', latest === 'salt'),
    // Shells is still standing: its wound is the Zanzibar receipt, and that is
    // beat 6's own frame, not a line on this row.
    shells: ROW_STOP('lit', false),
    iron: ROW_STOP('lit', wounded.includes('iron') && 'contender', latest === 'iron'),
    metals: ROW_STOP('hidden'),
    gold: ROW_STOP('hidden')
  }
});
const S5_RECORD = {
  camera: FRAMES.metals,
  renders: true,
  stops: {
    cattle: ROW_STOP('defeated', 'contender'),
    salt: ROW_STOP('defeated', 'contender'),
    shells: ROW_STOP('lit', false),
    iron: ROW_STOP('defeated', 'contender'),
    metals: ROW_STOP('active'),
    gold: ROW_STOP('upcoming')
  }
};

// On-screen copy — every string a verbatim element of an approved cell.
export const COPY = {
  functionStayed: 'The function stayed. The carrier changed.',
  whyChanged: 'Why did the carrier keep changing?',
  hardCreate: 'Hard to create. Hard to destroy.',
  massGrows: 'As the value grows, the weight grows.',
  goldWound: 'Heavy · hard to verify · dangerous to move',
  mint: 'Solves verification and division. Trust required: the mint.',
  claimOnGold: 'A claim on gold in a vault.',
  portability: 'Portability improved.',
  trust: 'Trust moved to the issuer.',
  scarcity: 'SCARCITY IN MATTER',
  goldStops: 'THE GOLD STOPS HERE'
};

// --------------------------------------------------------------- settled states
//
// The 22 builds as complete declarative states — each one an approved cell of
// the beat-state sheet, named in its annotation.

export const STATES = {
  'the-function-stayed': [
    // beat 1 — s5-b1: the claim in construction C's carrier, SHELLS.
    { claim: { label: 'SHELLS', voice: 0.75 } },
    // beat 2 — s5-b2: CATTLE falls on the contender row.
    { rail: s5Row(['cattle'], 'cattle') },
    // beat 3 — s5-b3: SALT falls; CATTLE's wound recedes (§9.4 rule 10).
    { rail: s5Row(['cattle', 'salt'], 'salt') },
    // beat 4 — s5-b4: IRON falls; SHELLS still standing.
    { rail: s5Row(['cattle', 'salt', 'iron'], 'iron') },
    // beat 5 — s5-b5: the record — METALS active, the object band riding the
    // rail under the rails law, the fallen renders at the dimmed-prior step.
    { rail: S5_RECORD, railBand: true },
    // beat 6 — s5-b6: the Zanzibar receipt, the evidence grammar's specimen.
    { evidence: true },
    // beat 7 — s5-b7: the composition returns, carrier unnamed; the pair.
    { claim: {}, stmts: [[COPY.functionStayed, 812, 46, 1]] },
    // beat 8 — s5-b8: the exit question on the same composition.
    { claim: {}, stmts: [[COPY.whyChanged, 812, 46, 1]] }
  ],
  'scarcity-in-matter': [
    // beat 1 — s6-b1: the gold study with the display rule's statement.
    { study: 'gold', studyStmt: COPY.scarcity },
    // beats 2–7 — s6-b2 … s6-b7: the restored elimination, one legacy build
    // per advance (Ruling 3 struck — the legacy pacing, exactly as 2-05
    // performs it).
    { survivors: 1 },
    { survivors: 2 },
    { survivors: 3 },
    { survivors: 4 },
    { survivors: 5 },
    { survivors: 6 },
    // beat 8 — s6-b8: the claim's strongest body yet.
    { claim: { label: 'GOLD', voice: 1 }, stmts: [[COPY.hardCreate, 812, 46, 1]] },
    // beat 9 — s6-b9: the mass state — the selected counted load.
    { mass: true, stmts: [[COPY.massGrows, 848, 40, 1]] }
  ],
  'claims-on-gold': [
    // beat 1 — s7-b1: gold's weaknesses on the body that has them.
    { claim: { label: 'GOLD', voice: 1 }, stmts: [[COPY.goldWound, 812, 40, 1]] },
    // beat 2 — s7-b2: the body becomes the coin.
    { claim: { label: 'COINAGE', voice: 1 }, stmts: [[COPY.mint, 812, 40, 1]] },
    // beat 3 — s7-b3: custody — the vault study.
    { study: 'vault', studyStmt: COPY.goldStops },
    // beat 4 — s7-b4: the detachment, restaged photographically.
    { detachment: true, stmts: [[COPY.claimOnGold, 866, 46, 1]] },
    // beat 5 — s7-b5: the trade named honestly, on cleared black.
    { stmts: [[COPY.portability, 452, 54, 1], [COPY.trust, 560, 54, 1]] }
  ]
};

export const TOTAL_BUILDS = {
  'the-function-stayed': STATES['the-function-stayed'].length - 1,
  'scarcity-in-matter': STATES['scarcity-in-matter'].length - 1,
  'claims-on-gold': STATES['claims-on-gold'].length - 1
};

const WAVE_LINES = [
  'Anything that floats away is out.',
  'Anything that rusts, burns, or dissolves is out.',
  'Anything that kills the holder is out.',
  'Anything that will not hold a shape is out.'
];

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

class Act2Stage {
  constructor(container) {
    this.container = container;
    this.motion = new Set();
    this.scene = null;
    this.build = 0;
    this.states = STATES;
    this._build();
  }

  _build() {
    const root = document.createElement('div');
    // The legacy section roots plus this act's own marker. The inline ground
    // duplicates `.s2o`'s — deliberately: the opaque black is load-bearing
    // for the rasterization contract and must not depend on a class resolving.
    root.className = 'act2-stage s2o s3f s4-opening';
    root.dataset.register = 'mixed';
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:#000;';
    this.root = root;

    // The drawn layer beneath everything — the dependency line lives here,
    // under the photographs, exactly as the sheet's svg-first stacking has it.
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', '1920');
    svg.setAttribute('height', '1080');
    svg.style.cssText = 'position:absolute; inset:0;';
    root.appendChild(svg);
    this.svg = svg;

    // A second drawn layer for the mass diagram, rebuilt per state — its
    // lines sit beneath the diagram's marks and labels like the sheet's.
    const diagSvg = document.createElementNS(svgNS, 'svg');
    diagSvg.setAttribute('viewBox', '0 0 1920 1080');
    diagSvg.setAttribute('width', '1920');
    diagSvg.setAttribute('height', '1080');
    diagSvg.style.cssText = 'position:absolute; inset:0;';
    root.appendChild(diagSvg);
    this.diagSvg = diagSvg;

    // ---- the Evolution Rail, mounted (the S5-F2 port in its strongest form)
    this.railWrap = document.createElement('div');
    this.railWrap.style.cssText = 'position:absolute; inset:0; display:none;';
    this.rail = EvolutionRail();
    this.railWrap.appendChild(this.rail.el);
    root.appendChild(this.railWrap);

    // The METALS render box on the record (s5-b5): the component's own render
    // markup mirrored at the band's world baseline.
    const { w: M_W, h: M_H } = GEOM.metalsBox;
    const metalsStop = this.rail.el.querySelector('[data-stop="metals"]');
    this.metalsBox = document.createElement('div');
    this.metalsBox.className = 's2o-rail__render';
    const metalsDf = DarkFieldImage({
      name: 'metals', width: M_W, height: M_H,
      alt: 'A stack of cast metal ingots', stubSize: 64
    });
    metalsDf.el.dataset.visible = 'true';
    this.metalsBox.style.top = `${-52 - M_H}px`;
    this.metalsBox.style.display = 'none';
    this.metalsBox.appendChild(metalsDf.el);
    metalsStop.appendChild(this.metalsBox);
    this.fallenRenders = ['cattle', 'salt', 'iron'].map((id) =>
      this.rail.el.querySelector(`[data-stop="${id}"] .s2o-rail__render`));

    // ---- the elimination (2-05's own DOM against the legacy classes)
    this.survKicker = document.createElement('p');
    this.survKicker.className = 's2o-survivors__kicker';
    this.survKicker.textContent = 'Run the competition over the whole table.';
    root.appendChild(this.survKicker);

    this.gridWrap = document.createElement('div');
    this.gridWrap.className = 's2o-survivors__grid';
    this.grid = ElementGrid();
    this.gridWrap.appendChild(this.grid.el);
    root.appendChild(this.gridWrap);

    this.waveLines = WAVE_LINES.map((copy, i) => {
      const line = document.createElement('p');
      line.className = 's2o-survivors__waveline';
      line.dataset.step = String(i + 2);
      line.textContent = copy;
      root.appendChild(line);
      return line;
    });

    this.verdict = document.createElement('p');
    this.verdict.className = 's2o-survivors__verdict';
    this.verdict.textContent = 'Workable nobility leaves two.';
    root.appendChild(this.verdict);

    // ---- the studies (P1-F2's box, the register's own reveal)
    this.goldStudy = this._study('gold', 'A cast gold bar emerging from darkness');
    this.vaultStudy = this._study('vault', 'A vault door, closed, emerging from darkness');
    this.studyStmtEl = this._text();

    // ---- the detachment's photographs (transition disabled — the still is
    // the settled state, the photo() pattern)
    this.vaultPhoto = this._photo('vault', 'The vault, closed, holding the gold', GEOM.vaultPhoto);
    this.certPhoto = this._photo('gold_certificate', 'The gold certificate, traveled outward', GEOM.certPhoto);
    this.depLineEl = this._line();
    this.depDotEls = [this._dot(), this._dot()];

    // ---- the evidence block (the Zanzibar specimen's three elements)
    this.evPlace = this._text();
    this.evDate = this._text();
    this.evFact = this._text();

    // ---- the claim in construction C's carrier (4-06's own scene box; the
    // slide's CSS places it — `.s4-claim-carrier__scene` at (700, 400))
    this.claimScene = document.createElement('div');
    this.claimScene.className = 's4-claim-carrier__scene';
    this.shell = CarrierShell({ className: 's4-claim-carrier__shell' });
    this.claimScene.appendChild(this.shell.el);
    const claimStage = document.createElement('div');
    claimStage.className = 's4-claim-carrier__claim-stage';
    this.claim = ClaimObject({ className: 's4-claim-carrier__claim' });
    claimStage.appendChild(this.claim.el);
    this.claimScene.appendChild(claimStage);
    root.appendChild(this.claimScene);
    this.claimLabelEl = this._text();

    // ---- the mass diagram's element layer, rebuilt per state
    this.diagEls = document.createElement('div');
    this.diagEls.style.cssText = 'position:absolute; inset:0; pointer-events:none;';
    root.appendChild(this.diagEls);

    // ---- the statements (last — over everything, as the builders append)
    this.stmtEls = [this._text(), this._text()];

    // ---- the traveler: the held claim in motion between compositions. The
    // same component as the in-carrier claim at the same 116, so the handoff
    // at a gesture's end is a same-pixel swap. Motion-only; never settled.
    this.traveler = document.createElement('div');
    this.traveler.style.cssText = 'position:absolute; width:116px; height:116px; opacity:0; pointer-events:none;';
    const travelerClaim = ClaimObject();
    travelerClaim.el.style.transition = 'none';
    travelerClaim.applyState({ visible: true });
    this.traveler.appendChild(travelerClaim.el);
    root.appendChild(this.traveler);

    this.container.appendChild(root);
  }

  // ---- element factories ----

  _study(name, alt) {
    const [x, y, w, h] = GEOM.studyBox;
    const df = DarkFieldImage({ name, width: w, height: h, alt });
    df.el.style.position = 'absolute';
    df.el.style.left = `${x}px`;
    df.el.style.top = `${y}px`;
    setVisible(df.el, false);
    this.root.appendChild(df.el);
    return df.el;
  }

  _photo(name, alt, [x, y, w, h]) {
    const df = DarkFieldImage({ name, width: w, height: h, alt });
    df.el.dataset.visible = 'true';
    df.el.style.transition = 'none';
    df.el.style.position = 'absolute';
    df.el.style.left = `${x}px`;
    df.el.style.top = `${y}px`;
    df.el.style.opacity = '0';
    this.root.appendChild(df.el);
    return df.el;
  }

  _text() {
    const el = document.createElement('p');
    el.style.cssText = 'position:absolute; margin:0; display:none;';
    this.root.appendChild(el);
    return el;
  }

  _line() {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('stroke-linecap', 'round');
    l.setAttribute('opacity', '0');
    this.svg.appendChild(l);
    return l;
  }

  _dot() {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('opacity', '0');
    this.svg.appendChild(c);
    return c;
  }

  // ---- shared setters ----

  setText(el, copy, styles) {
    el.textContent = copy;
    el.style.cssText = 'position:absolute; margin:0; ' + styles;
  }

  hideText(el) {
    el.style.cssText = 'position:absolute; margin:0; display:none;';
  }

  setSeg(line, [x1, y1, x2, y2, o, w]) {
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', `rgba(255,255,255,${o})`);
    line.setAttribute('stroke-width', w);
    line.setAttribute('opacity', '1');
    line.removeAttribute('stroke-dasharray');
    line.removeAttribute('stroke-dashoffset');
  }

  setDot(dot, x, y, r, o) {
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dot.setAttribute('r', r);
    dot.setAttribute('fill', `rgba(255,255,255,${o})`);
    dot.setAttribute('opacity', r > 0 && o > 0 ? '1' : '0');
  }

  setBox(el, [x, y, w, h]) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }

  setTraveler(cx, cy, opacity) {
    this.traveler.style.left = `${cx - 58}px`;
    this.traveler.style.top = `${cy - 58}px`;
    this.traveler.style.opacity = String(opacity);
  }

  // Draw-on for an svg line — dash the segment to its own length and sweep
  // the offset from the (x1, y1) end, so the caller chooses the draw
  // direction by the order it writes the endpoints.
  drawSeg(tl, line, at, dur, ease, [x1, y1, x2, y2, o, w]) {
    tl.add(() => {
      this.setSeg(line, [x1, y1, x2, y2, o, w]);
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      line.setAttribute('stroke-dasharray', String(len));
      line.setAttribute('stroke-dashoffset', String(len));
    }, at);
    tl.to(line, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease }, at + 0.02);
  }

  // ---- the mass diagram (s6-b9 — massCounted(), transcribed) ----

  buildMassDiagram() {
    this.clearMassDiagram();
    const { y: Y, xs: XS, lineX, steps } = GEOM.mass;
    const refs = { baseline: null, stations: [] };

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', lineX[0]); line.setAttribute('y1', Y);
    line.setAttribute('x2', lineX[1]); line.setAttribute('y2', Y);
    line.setAttribute('stroke', `rgba(255,255,255,${VOICE.lineDim})`);
    line.setAttribute('stroke-width', 2);
    line.setAttribute('stroke-linecap', 'round');
    this.diagSvg.appendChild(line);
    refs.baseline = line;

    steps.forEach((s, i) => {
      const x = XS[i];
      const station = { dot: null, label: null, marks: [] };
      const dot = document.createElementNS(svgNS, 'circle');
      dot.setAttribute('cx', x); dot.setAttribute('cy', Y); dot.setAttribute('r', 5);
      dot.setAttribute('fill', `rgba(255,255,255,${VOICE.dot})`);
      this.diagSvg.appendChild(dot);
      station.dot = dot;

      const label = document.createElement('p');
      label.textContent = s.value;
      label.style.cssText = 'position:absolute; margin:0; ' +
        `left:${x - 200}px; top:${Y - 92}px; width:400px; text-align:center; text-indent:0;` + CAPS(0.8, 24);
      this.diagEls.appendChild(label);
      station.label = label;

      // The stack hangs from the baseline, three marks to a course — twelve
      // is four courses, which is what fixes the composition's depth.
      for (let k = 0; k < s.bars; k += 1) {
        const col = k % 3;
        const rowN = Math.floor(k / 3);
        const cx = x - 62 + col * 62;
        const cy = Y + 74 + rowN * 62;
        const size = 46;
        const box = document.createElement('div');
        box.style.cssText = `position:absolute; left:${cx - size / 2}px; top:${cy - size / 2}px;` +
          `width:${size}px; height:${size}px; color:rgba(255,255,255,0.72);`;
        box.innerHTML = glyph('metals', size);
        this.diagEls.appendChild(box);
        station.marks.push(box);
      }
      refs.stations.push(station);
    });
    return refs;
  }

  clearMassDiagram() {
    this.diagSvg.textContent = '';
    this.diagEls.textContent = '';
  }

  // ---- the scene contract's state law ----

  applyState(sceneId, build) {
    this.killMotion();
    const st = this.states[sceneId][build];
    this.scene = sceneId;
    this.build = build;

    // Snap mode: the `.s2o[data-snap] *` rule kills every CSS transition on
    // the stage so a reconstructed frame lands instantly and exactly; a
    // double-rAF restores them once the state has painted.
    this.root.dataset.snap = 'true';

    // The rail.
    if (st.rail) {
      this.railWrap.style.display = '';
      this.railWrap.style.opacity = '';
      this.rail.applyState(st.rail, { live: false });
    } else {
      this.railWrap.style.display = 'none';
      this.railWrap.style.opacity = '';
    }
    this.metalsBox.style.display = st.railBand ? '' : 'none';
    this.metalsBox.style.opacity = '';
    this.fallenRenders.forEach((box) => {
      if (box) box.style.opacity = st.railBand ? 'var(--dim-prior)' : '';
    });

    // The elimination.
    const surv = st.survivors || 0;
    setVisible(this.survKicker, surv >= 1);
    this.gridWrap.dataset.visible = String(surv >= 1);
    this.survKicker.style.opacity = '';
    this.gridWrap.style.opacity = '';
    this.grid.applyState(Math.max(0, surv - 1), { live: false });
    this.waveLines.forEach((line) => {
      setVisible(line, surv === Number(line.dataset.step));
      line.style.opacity = '';
    });
    setVisible(this.verdict, surv >= 6);
    this.verdict.style.opacity = '';

    // The studies.
    const study = (el, on) => {
      setVisible(el, Boolean(on));
      el.style.display = '';
      el.style.opacity = '';
    };
    study(this.goldStudy, st.study === 'gold');
    study(this.vaultStudy, st.study === 'vault');
    if (st.studyStmt) {
      const [copy, styles] = GEOM.studyStatement(st.studyStmt);
      this.setText(this.studyStmtEl, copy, styles);
      gsap.set(this.studyStmtEl, { clearProps: 'opacity,y' });
    } else this.hideText(this.studyStmtEl);

    // The detachment.
    if (st.detachment) {
      this.setBox(this.vaultPhoto, GEOM.vaultPhoto);
      this.vaultPhoto.style.opacity = '1';
      this.setBox(this.certPhoto, GEOM.certPhoto);
      this.certPhoto.style.opacity = '1';
      this.setSeg(this.depLineEl, GEOM.depLine);
      GEOM.depDots.forEach(([x, y, r, o], i) => this.setDot(this.depDotEls[i], x, y, r, o));
    } else {
      this.setBox(this.vaultPhoto, GEOM.vaultPhoto);
      this.vaultPhoto.style.opacity = '0';
      this.setBox(this.certPhoto, GEOM.certPhoto);
      this.certPhoto.style.opacity = '0';
      this.depLineEl.setAttribute('opacity', '0');
      this.depDotEls.forEach((d) => this.setDot(d, 0, 0, 0, 0));
    }

    // The evidence.
    if (st.evidence) {
      const ev = GEOM.evidence;
      this.setText(this.evPlace, ev.place[0], ev.place[1]);
      this.setText(this.evDate, ev.date[0], ev.date[1]);
      this.setText(this.evFact, ev.fact[0], ev.fact[1]);
      [this.evPlace, this.evDate, this.evFact].forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,y' });
      });
    } else {
      [this.evPlace, this.evDate, this.evFact].forEach((el) => this.hideText(el));
    }

    // The claim in its carrier.
    if (st.claim) {
      this.shell.applyState({ visible: true });
      this.claim.applyState({ visible: true });
      if (st.claim.label) {
        this.setText(this.claimLabelEl, st.claim.label, GEOM.claimLabel(st.claim.voice));
        gsap.set(this.claimLabelEl, { clearProps: 'opacity,y' });
      } else this.hideText(this.claimLabelEl);
    } else {
      this.shell.applyState({ visible: false });
      this.claim.applyState({ visible: false });
      this.hideText(this.claimLabelEl);
    }
    gsap.set([this.shell.el, this.claim.el], { clearProps: 'opacity' });

    // The mass diagram.
    gsap.set([this.diagSvg, this.diagEls], { clearProps: 'opacity' });
    if (st.mass) this.buildMassDiagram();
    else this.clearMassDiagram();

    // The statements.
    this.stmtEls.forEach((el, i) => {
      const conf = st.stmts && st.stmts[i];
      if (conf) {
        const [copy, styles] = GEOM.statement(conf[0], conf[1], conf[2], conf[3]);
        this.setText(el, copy, styles);
        gsap.set(el, { clearProps: 'opacity,y' });
      } else this.hideText(el);
    });

    // Motion-only elements never survive a reconstruction.
    this.traveler.style.opacity = '0';
    gsap.set(this.traveler, { clearProps: 'x,y,scale' });

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
    const attr = (el, names) => names.map((n) => el.getAttribute(n));
    const railWorld = this.rail.el.querySelector('.s2o-rail__world');
    return {
      scene: this.scene,
      build: this.build,
      rail: {
        display: this.railWrap.style.display,
        datasets: { ...this.rail.el.dataset },
        stops: ['cattle', 'salt', 'shells', 'iron', 'metals', 'gold'].map((id) => {
          const s = this.rail.el.querySelector(`[data-stop="${id}"]`);
          return [id, s.dataset.state, s.dataset.wound, s.dataset.latest];
        }),
        camera: railWorld.style.transform,
        metalsBox: [this.metalsBox.style.display, this.metalsBox.style.opacity],
        fallen: this.fallenRenders.map((b) => (b ? b.style.opacity : null))
      },
      survivors: {
        kicker: [this.survKicker.dataset.visible, getComputedStyle(this.survKicker).opacity],
        grid: [this.gridWrap.dataset.visible, this.grid.el.dataset.step],
        waves: this.waveLines.map((l) => [l.dataset.visible, getComputedStyle(l).opacity]),
        verdict: [this.verdict.dataset.visible, getComputedStyle(this.verdict).opacity]
      },
      studies: [this.goldStudy, this.vaultStudy].map((el) => [
        el.dataset.visible, el.style.display, getComputedStyle(el).opacity
      ]),
      studyStmt: text(this.studyStmtEl),
      photos: [this.vaultPhoto, this.certPhoto].map((el) => [
        el.style.left, el.style.top, el.style.width, el.style.height, el.style.opacity
      ]),
      depLine: attr(this.depLineEl, ['x1', 'y1', 'x2', 'y2', 'stroke', 'opacity']),
      depDots: this.depDotEls.map((d) => attr(d, ['cx', 'cy', 'r', 'fill', 'opacity'])),
      evidence: [this.evPlace, this.evDate, this.evFact].map(text),
      claim: {
        shell: [this.shell.el.dataset.visible, getComputedStyle(this.shell.el).opacity],
        disc: [this.claim.el.dataset.visible, getComputedStyle(this.claim.el).opacity],
        label: text(this.claimLabelEl)
      },
      mass: {
        svgNodes: this.diagSvg.childNodes.length,
        els: this.diagEls.childNodes.length
      },
      stmts: this.stmtEls.map(text),
      traveler: this.traveler.style.opacity
    };
  }

  destroy() {
    this.killMotion();
    gsap.killTweensOf(this.root.querySelectorAll('*'));
    gsap.killTweensOf(this.root);
    this.rail.destroy();
    this.grid.destroy();
    this.root.remove();
  }
}

// The stage rides the engine's container so a within-group handoff finds it
// alive; a cold mount builds it fresh. Deterministic init, tolerant re-entry.
export function ensureStage(container) {
  if (container.__act2Stage) return container.__act2Stage;
  container.innerHTML = '';
  // While Act II is on stage, release the deck canvas's layer hint so its
  // text rasterizes the way the approved cells did (components/rasterHint.js).
  const canvas = claimRasterHint(container);
  const stage = new Act2Stage(container);
  stage._canvas = canvas;
  container.__act2Stage = stage;
  window.__act2 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize()
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__act2Stage;
  if (!stage) return;
  releaseRasterHint(stage._canvas);
  stage.destroy();
  delete container.__act2Stage;
  if (window.__act2) delete window.__act2;
}
