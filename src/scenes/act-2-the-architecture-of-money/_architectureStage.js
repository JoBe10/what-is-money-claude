// Act II — the shared stage for Scenes 5 through 10 (Batch B).
//
// One continuous visual world: the six scene modules share this one stage
// object, cached on the engine's container across within-group handoffs, so
// every in-act boundary — S5→S6, S6→S7, S7→S8, S8→S9, S9→S10 — is real
// shared-DOM continuity and never a remount. Scenes 5–7 landed at Session 1;
// Scenes 8–10 joined at Session 2. The scenes drive it through two surfaces
// only, exactly as Act I's stage established:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any of the 37 builds, instantly. Direct
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
// WHERE THE PORT IS A SLIDE'S OWN COMPOSITION rather than a component — the
// severance chart (S8 b4) and the palladium panels (S10 b3/b4) — the stage
// rebuilds that slide's DOM against THE SAME CSS CLASSES and carries the
// slide root's own class and `data-step` on the stage root, because without
// them the severance's series labels and the palladium hook's lift do not
// render. Every plotted number comes from the frozen data modules untouched.
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
import {
  RailWorld, RAIL_TEXT, RECEDE, X as RAIL_X, ORDER as RAIL_ORDER
} from './_railWorld.js';
import {
  RAIL_STATES, RAIL_BUILDS, RAIL_CELL, RAIL_SPECIMEN, S6_RETURN
} from './_railStates.js';
import {
  PURCHASING_POWER, PP_SERIES, PP_YEAR_MIN, PP_YEAR_MAX
} from '../../data/purchasing-power.js';
import {
  MINE_SUPPLY, PD_MINE_SUPPLY_YEAR, PRICES, PRICE_SERIES,
  PRICE_YEAR_MIN, PRICE_YEAR_MAX
} from '../../data/palladium.js';

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
// The rail's second row — the wound's measure, which the strip's dependency
// line inherits (`.s2o-rail__wound`, 17px/1.45 on 218px).
const RAIL_ROW = (a = 0.58) => `font-size:17px; font-weight:420; line-height:1.45;` +
  `color:rgba(255,255,255,${a});`;
const PLAIN = (a = 0.58, size = 22) => `font-size:${size}px; font-weight:460;` +
  `letter-spacing:0.005em; line-height:1.35; color:rgba(255,255,255,${a});`;

// The film's line-system voices (systems.mjs VOICE), for the mass diagram,
// the network and the strip.
const VOICE = { line: 0.35, lineDim: 0.18, dot: 0.7, labelSpent: 0.42 };

// Deterministic scatter — the seeded LCG the systems sheet ships, never
// Math.random, so the network's chords are the selected candidate's chords.
const lcg = (seed) => {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

// ---------------------------------------------------------------- geometry law
//
// Transcribed from the states builders; nothing settled here is chosen.

// The evidence grammar's specimens (states.mjs SPECIMEN). Every string is
// recorded film material: Zanzibar is the rail's own receipt text split into
// place · date · fact; 1971 is `2-07`'s decree, verbatim.
const SPECIMEN = {
  zanzibar: {
    place: 'WEST AFRICA', date: '1800s',
    fact: 'Shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.'
  },
  severance: {
    place: '', date: '1971',
    fact: 'Redemption ends. For the first time in the record, the world’s money is pure decree — the trust rung with nothing under it.'
  }
};

// The strip's recorded station set (systems.mjs STATIONS) — one gain and one
// dependency each. The claim station's LABEL is the CERTIFICATE ruling's
// (CLAIM ON GOLD); its `name` is kept because the retired disc staging on file
// still speaks it.
export const STATIONS = [
  { key: 'gold', name: 'GOLD', gain: 'SCARCITY IN MATTER', dep: 'as value grows, weight grows' },
  { key: 'paper', name: 'CLAIM', gain: 'PORTABILITY', dep: 'trust moved to the issuer' },
  { key: 'ledger', name: 'LEDGER', gain: 'INSTANT TRANSFER', dep: 'the window closed' },
  { key: 'bitcoin', name: 'BITCOIN', gain: 'NON-DISCRETIONARY SUPPLY', dep: 'not yet twenty years into a hundred-year question' }
];

// The rails law's object band: every station photographic, each render in a
// box of its own aspect at the band's shared height, bottom-aligned on one
// baseline above the drawn line. The claim station carries the certificate
// (the CERTIFICATE ruling, 31 Aug 2026); the disc is never a station.
const BAND_H = 244;    // 188 world × 1.3 — the contender band's stage height
const BAND_GAP = 68;   // 52 world × 1.3 — the rail's render-baseline clearance
const BAND_GOODS = {
  gold: { subject: 'gold', aspect: 4 / 3, alt: 'A cast gold bar' },
  paper: { subject: 'gold_certificate', aspect: 4 / 5, alt: 'The gold certificate — a claim on gold' },
  ledger: { subject: 'ledger_glow', aspect: 3 / 2, alt: 'A glowing ledger entry' },
  bitcoin: { subject: 'bitcoin', aspect: 4 / 3, alt: 'The bitcoin carrier' }
};

export const GEOM = {
  // P1-F2's approved display-scale study box: 540 tall, centred at (960, 650),
  // each subject in the aspect its render arrives in (the framing rule). The
  // gold study (s6-b1) and the vault study (s7-b3) land in the builders'
  // default landscape box; `ledger_glow` is the register's one 3:2 and takes
  // the 810-wide box (s8-b1); the 4:5 portrait is the certificate's, and it is
  // used only mid-gesture, by the S7→S8 dissolve.
  studyBox: [600, 380, 720, 540],
  studyBoxes: {
    landscape: [600, 380, 720, 540],
    portrait: [744, 380, 432, 540],
    threeTwo: [555, 380, 810, 540]
  },
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

  // The evidence grammar (states.mjs `evidence` + SPECIMEN), carrying the two
  // specimens Act II speaks: place · date · fact (Zanzibar, S5 b6) and
  // date · fact (1971, S8 b2). The block shifts up when there is no place —
  // the one ruled generalization of `2-07`'s dated-fact treatment, nothing
  // else. The third specimen, 1803, lives inside Scene 10's ported frame.
  evidence: (name) => {
    const sp = SPECIMEN[name];
    const p = Boolean(sp.place);
    return {
      place: sp.place
        ? [sp.place, 'left:0; right:0; top:372px; text-align:center; text-indent:0;' + KICKER(0.5)]
        : null,
      date: [sp.date,
        `left:0; right:0; top:${p ? 424 : 400}px; text-align:center; text-indent:0;` +
        'font-size:128px; font-weight:650; letter-spacing:-0.02em;' +
        'font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);'],
      fact: [sp.fact,
        `left:300px; right:300px; top:${p ? 634 : 610}px; text-align:center; text-indent:0;` +
        'font-size:33px; font-weight:460; line-height:1.45; letter-spacing:-0.008em;' +
        'color:rgba(255,255,255,1);']
    };
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
  },

  // The network formation (s9-b1 — the selected system, the hub dissolving,
  // run from the systems sheet's own numbers).
  net: { cx: 960, cy: 540, r: 330, n: 12, seed: 0x9F1A, keep: 0.34, spoke: 0.2 },

  // The entrant block (s9-b2 … s9-b4 — `2-08`'s block free-standing, with the
  // coin at its head per the display-scale glyph retirement of 31 Aug 2026).
  // The coin's box is DERIVED GEOMETRY, recorded at the states builder's call
  // site: the render stands at the act's one lineup scale (the rails-law band
  // height) in its own 4:3, bottom-anchored where the retired mark's box ended
  // (y 332), so the drawn rhythm beneath — the dot at 372, the name at 404 —
  // is untouched. The 0.9 is the retired mark's own recorded voice.
  entrant: {
    coin: [960 - Math.round(BAND_H * (4 / 3)) / 2, 332 - BAND_H, Math.round(BAND_H * (4 / 3)), BAND_H],
    coinVoice: 0.9,
    dot: [960, 372, 4.5, 0.85],
    name: 'BITCOIN',
    facts: '2009: digital · no state, no company · supply fixed by its own rules.',
    capabilities: ['DIGITAL MOBILITY', 'NON-DISCRETIONARY SUPPLY', 'INDEPENDENT VERIFICATION'],
    limitation: 'Very young. Its price still swings far more than the monies it would compete with. Not yet twenty years into a hundred-year question.',
    nameStyle: 'left:0; right:0; top:404px; text-align:center; text-indent:0;' + RAIL_LABEL(0.95),
    factsStyle: (voice, raised) =>
      `left:360px; right:360px; top:${raised ? 462 : 470}px; text-align:center; text-indent:0;` +
      STATEMENT(voice, 33),
    capStyle: (voice, i) =>
      `left:0; right:0; top:${568 + i * 52}px; text-align:center; text-indent:0;` + CAPS(voice, 26),
    limitStyle: (voice) =>
      'left:340px; right:340px; top:772px; text-align:center; text-indent:0;' + PLAIN(voice, 27)
  },

  // The trade-off strip (s10-b1 / s10-b2 — EvolutionRail's grammar under the
  // rails law). WIRING: four stations on the stage at the rail's own 340px
  // stop width; everything beneath the line is the component's own rhythm.
  strip: {
    y: 470, xs: [345, 750, 1155, 1560], lineX: [200, 1720],
    bandH: BAND_H, bottom: 470 - BAND_GAP, live: 3,
    claimLabel: 'CLAIM ON GOLD',
    box: (key, x) => {
      const g = BAND_GOODS[key];
      const w = Math.round(BAND_H * g.aspect);
      return [x - w / 2, (470 - BAND_GAP) - BAND_H, w, BAND_H];
    },
    good: (key) => BAND_GOODS[key],
    nameStyle: (x, on) =>
      `left:${x - 170}px; top:${470 + 26}px; width:340px; text-align:center; text-indent:0;` +
      RAIL_LABEL(on ? 1 : 0.58),
    gainStyle: (x, a) =>
      `left:${x - 170}px; top:${470 + 64}px; width:340px; height:68px; text-align:center; text-indent:0;` +
      CAPS(0.75 * a, 20),
    depStyle: (x, a) =>
      `left:${x - 109}px; top:${470 + 146}px; width:218px; text-align:center; text-indent:0;` +
      RAIL_ROW(0.58 * a)
  },

  // The pivot that opens Act III (s10-b5) — the deck's question register,
  // `1.03`'s own big-question type.
  question: [
    'Better for what job?',
    'left:240px; right:240px; top:490px; text-align:center; text-indent:0;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;'
  ]
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
  goldStops: 'THE GOLD STOPS HERE',
  becameInformation: 'MONEY BECAME INFORMATION',
  captured: 'The last incumbent didn’t fall the way the others did — it was captured: custody centralized, claims over-issued, redemption cancelled.',
  mostAccepted: 'The most universally accepted medium of exchange in history.',
  residue: 'Extraordinary at moving value. Measurably poor at storing it.',
  twoQuestions: 'The market’s valuation of a young asset, and the architecture of the claim, are two different questions.',
  volatility: 'Volatility is a stage, not a verdict.',
  historyLine: 'The history of money is a history of changing trade-offs.',
  // `3-05`'s own lines, ported with the frame (ADAPT S10-F2, Ruling 4).
  pdHook: 'Palladium: scarcer in supply than gold. Genuinely useful. At times more expensive. It never became money.',
  pdTiming: 'Discovered in 1803 — facing a monetary network thousands of years old.',
  pdNarrowed: 'And when gold’s role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium.',
  pdBar: 'Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.'
};

// --------------------------------------------------------------- settled states
//
// The 22 builds as complete declarative states — each one an approved cell of
// the beat-state sheet, named in its annotation.

export const STATES = {
  // ACT II IS THE RAIL WORLD, ALL SIX SCENES (the staging amendment, master
  // §13; the r2 rulings; the sheet approved in full 1 September 2026). Every
  // settled state is one transcription of the approved cells, in
  // `_railStates.js` — the legacy per-beat compositions they replace are
  // retired with the amendment, and the beat map is untouched at 8 · 9 · 5 ·
  // 5 · 5 · 5.
  ...RAIL_STATES
};

// The last build the engine advances to, per scene. It is the states array's
// last index everywhere except Scenes 6 and 8, whose arrays carry ONE STATE
// PAST THEIR LAST BEAT — the rail's two return seams, which the sheet records
// as "not itself a mapped beat" and which the gestures after them launch from
// (`_railStates.js`).
export const TOTAL_BUILDS = Object.fromEntries(
  Object.entries(STATES).map(([id, states]) => [
    id, RAIL_BUILDS[id] == null ? states.length - 1 : RAIL_BUILDS[id]
  ])
);

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

    // ---- THE RAIL WORLD, first and beneath everything ----
    //
    // Act II's anchor: one continuous rail carrying the whole act (the staging
    // amendment). It mounts before every other layer because that is the
    // sheet's own stacking — the overlays rise OVER the receded record, and the
    // stage-register landings sit over both. Scenes 5–7 drive it; Scenes 8–10
    // join it at Session 2 and the legacy compositions below retire with them.
    this.railWorld = RailWorld();
    root.appendChild(this.railWorld.el);

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
    this.ledgerStudy = this._study('ledger_glow',
      'A glowing ledger entry emerging from darkness', 'threeTwo');
    // The S7→S8 dissolve's OUTGOING form — the paper claim, in P1-F2's own
    // 4:5 box. Motion-only: no settled state carries it, and the dissolve it
    // serves is the ported one (p1-b6 → p1-b7-glow).
    this.certForm = this._study('gold_certificate',
      'The gold certificate, the paper claim', 'portrait');
    this.studyStmtEl = this._text();

    // ---- the detachment's photographs (transition disabled — the still is
    // the settled state, the photo() pattern)
    this.vaultPhoto = this._photo('vault', 'The vault, closed, holding the gold', GEOM.vaultPhoto);
    this.certPhoto = this._photo('gold_certificate', 'The gold certificate, traveled outward', GEOM.certPhoto);
    this.depLineEl = this._line();
    this.depDotEls = [this._dot(), this._dot()];

    // ---- the evidence block (place · date · fact — both Act II specimens)
    this.evPlace = this._text();
    this.evDate = this._text();
    this.evFact = this._text();

    // ---- Scene 9's network (s9-b1 — the selected system, the hub dissolving)
    //
    // Built once, from the systems sheet's own numbers and its own seeded LCG,
    // so the chords are the selected candidate's chords and not a re-roll. The
    // group's own display carries the state; the elements never move.
    this.net = this._network();

    // ---- Scene 9's entrant block (`2-08`'s block, free-standing)
    this.coinPhoto = this._photo('bitcoin', 'The bitcoin coin', GEOM.entrant.coin);
    this.entrantDot = this._dot();
    this.entrantName = this._text();
    this.entrantFacts = this._text();
    this.entrantCaps = GEOM.entrant.capabilities.map(() => this._text());
    this.entrantLimit = this._text();

    // ---- Scene 10's strip (the rails law's object band over the rail's own
    // drawn sentence). Four photographic stations, the line and its markers
    // beneath — the goods' boxes are fixed, and only the voices change.
    this.stripLine = this._line();
    this.stripDots = STATIONS.map(() => this._dot());
    this.stripPhotos = STATIONS.map((s, i) => {
      const g = GEOM.strip.good(s.key);
      return this._photo(g.subject, g.alt, GEOM.strip.box(s.key, GEOM.strip.xs[i]));
    });
    this.stripNames = STATIONS.map(() => this._text());
    this.stripGains = STATIONS.map(() => this._text());
    this.stripDeps = STATIONS.map(() => this._text());

    // ---- the ported charts, each rebuilding its legacy slide's DOM against
    // the legacy's own classes. The host is inset 0, so `.s2o-severance__chart`
    // and `.s3f-palladium__*` resolve against exactly the root's box, and the
    // stage root carries the slide root's class and `data-step` per state.
    this.chartHost = document.createElement('div');
    this.chartHost.style.cssText = 'position:absolute; inset:0;';
    root.appendChild(this.chartHost);
    this.sevChart = this._severanceChart();
    this.palladium = this._palladiumBlock();

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

    // ---- the statements (last — over everything, as the builders append).
    // `railLandEls` are the sheet's station-anchored landings: a beat's own
    // sentence, landed at its station in the deck's registers.
    // Five, because Scene 9's entrant beats land four rows at once — the facts
    // and the three capabilities — at the BITCOIN station.
    this.railLandEls = [this._text(), this._text(), this._text(), this._text(), this._text()];
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

  _study(name, alt, box = 'landscape') {
    const [x, y, w, h] = GEOM.studyBoxes[box];
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

  // ---- Scene 9's network, transcribed from the selected candidate --------
  //
  // `s9f1-a`, the hub dissolving: a centre with spokes to a ring, both receded
  // to the floor, and peer-to-peer chords at full voice between the ring's own
  // nodes — about two thirds of them drawn. The rand() call happens for EVERY
  // pair whether the chord is kept or not, exactly as the builder writes it,
  // because the sequence is the drawing.
  _network() {
    const { cx, cy, r, n, seed, keep, spoke } = GEOM.net;
    const g = document.createElementNS(svgNS, 'g');
    g.style.display = 'none';
    this.svg.appendChild(g);
    const seg = (x1, y1, x2, y2, a) => {
      const l = document.createElementNS(svgNS, 'line');
      l.setAttribute('x1', x1); l.setAttribute('y1', y1);
      l.setAttribute('x2', x2); l.setAttribute('y2', y2);
      l.setAttribute('stroke', `rgba(255,255,255,${a})`);
      l.setAttribute('stroke-width', 1.5);
      l.setAttribute('stroke-linecap', 'round');
      g.appendChild(l);
      return l;
    };
    const node = (x, y, radius, a) => {
      const c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', radius);
      c.setAttribute('fill', `rgba(255,255,255,${a})`);
      g.appendChild(c);
      return c;
    };
    const pt = (i) => [cx + r * Math.cos((i / n) * Math.PI * 2 - Math.PI / 2),
      cy + r * Math.sin((i / n) * Math.PI * 2 - Math.PI / 2)];

    const spokes = [];
    for (let i = 0; i < n; i += 1) {
      const [x, y] = pt(i);
      spokes.push(seg(cx, cy, x, y, spoke));
    }
    const rand = lcg(seed);
    const chords = [];
    for (let i = 0; i < n; i += 1) {
      for (let j = i + 1; j < n; j += 1) {
        if (rand() > keep) continue;
        const [x1, y1] = pt(i); const [x2, y2] = pt(j);
        chords.push(seg(x1, y1, x2, y2, VOICE.line));
      }
    }
    const hub = node(cx, cy, 7, 0.3);
    const ring = [];
    for (let i = 0; i < n; i += 1) {
      const [x, y] = pt(i);
      ring.push(node(x, y, 4.5, 0.8));
    }
    return { g, spokes, chords, hub, ring };
  }

  // ---- Scene 8's chart — `2-07`'s severance plot, ported whole ------------
  //
  // The frozen data untouched, one vertex per observed year, the frozen draw
  // order and per-series alpha, the 1971 = 100 reference line, the end-label
  // spread where USD and GBP finish within a label's height, the index note.
  _severanceChart() {
    const PP = PP_SERIES.map((s) => ({ ...s, values: PURCHASING_POWER[s.id] }));
    const PLOT_W = 1080;
    const PLOT_H = 360;

    const chart = document.createElement('div');
    chart.className = 's2o-severance__chart';
    chart.dataset.visible = 'true';
    chart.style.display = 'none';

    const headline = document.createElement('p');
    headline.className = 's2o-severance__headline';
    headline.textContent = 'What one unit still buys.';
    chart.appendChild(headline);

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `-70 -30 ${PLOT_W + 150} ${PLOT_H + 80}`);
    svg.classList.add('s2o-severance__plot');

    const yAt = (v) => PLOT_H - (v / 105) * PLOT_H;
    const add = (tag, attrs, cls, copy) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (cls) el.classList.add(cls);
      if (copy != null) el.textContent = copy;
      svg.appendChild(el);
      return el;
    };

    add('line', { x1: 0, y1: yAt(100), x2: PLOT_W, y2: yAt(100) }, 's2o-severance__refline');
    add('line', { x1: 0, y1: PLOT_H, x2: PLOT_W, y2: PLOT_H }, 's2o-severance__axis');
    add('text', { x: -16, y: yAt(100) + 7, 'text-anchor': 'end' }, 's2o-severance__axislabel', '100');
    add('text', { x: -16, y: PLOT_H + 7, 'text-anchor': 'end' }, 's2o-severance__axislabel', '0');
    [1971, 1980, 1990, 2000, 2010, 2020].forEach((year) => {
      add('text', {
        x: ((year - PP_YEAR_MIN) / (PP_YEAR_MAX - PP_YEAR_MIN)) * PLOT_W,
        y: PLOT_H + 34,
        'text-anchor': year === PP_YEAR_MIN ? 'start' : 'middle'
      }, 's2o-severance__axislabel', String(year));
    });

    const labelYs = PP.map(({ values }) => yAt(values[values.length - 1]) + 6);
    const order = labelYs.map((y, i) => [y, i]).sort((a, b) => a[0] - b[0]);
    for (let k = 1; k < order.length; k += 1) {
      if (order[k][0] - order[k - 1][0] < 24) order[k][0] = order[k - 1][0] + 24;
    }
    order.forEach(([y, i]) => { labelYs[i] = y; });

    const series = [];
    PP.forEach(({ id, alpha, values }, index) => {
      const d = values.map((v, i) => `${((i / (values.length - 1)) * PLOT_W).toFixed(1)} ${yAt(v).toFixed(1)}`);
      const path = add('path', { d: `M ${d.join(' L ')}` }, 's2o-severance__series');
      path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
      path.style.setProperty('--i', String(index));
      // The draw-in is a motion property; a settled frame is the drawn state.
      path.style.strokeDasharray = 'none';
      const label = add('text', { x: PLOT_W + 18, y: labelYs[index] }, 's2o-severance__serieslabel', id);
      label.style.fill = `rgba(255, 255, 255, ${alpha})`;
      series.push({ path, label });
    });

    chart.appendChild(svg);

    const note = document.createElement('p');
    note.className = 's2o-severance__indexnote';
    note.textContent = 'Purchasing power of one unit · 1971 = 100 · as of 2025';
    chart.appendChild(note);

    this.chartHost.appendChild(chart);
    return { chart, headline, series, note };
  }

  // ---- Scene 10's palladium block — `3-05`'s frame, ported ---------------
  //
  // The one ruled change (architecture Ruling 4) is the relocation into Scene
  // 10; the frame, its real sourced figures and its two-epoch honesty travel
  // with it. `data-step` on the stage root is what lifts the hook and applies
  // the rule-10 recession to the epoch lines, so it is carried per state.
  _palladiumBlock() {
    const PD_PRICE = PRICE_SERIES.map((s) => ({ ...s, values: PRICES[s.id] }));
    const PD_W = 660;
    const PD_H = 330;
    const V_MIN = 80;
    const V_MAX = 3600;
    const SUPPLY_MAX = Math.max(...MINE_SUPPLY.map((s) => s.tonnes));

    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute; inset:0; display:none;';
    this.chartHost.appendChild(wrap);

    const para = (cls, copy) => {
      const p = document.createElement('p');
      p.className = cls;
      p.dataset.visible = 'true';
      p.textContent = copy;
      wrap.appendChild(p);
      return p;
    };

    const hook = para('s3f-palladium__hook', COPY.pdHook);

    const chart = document.createElement('div');
    chart.className = 's3f-palladium__chart';
    chart.dataset.visible = 'true';

    const supply = document.createElement('div');
    supply.className = 's3f-palladium__supply';
    const supplyTitle = document.createElement('p');
    supplyTitle.className = 's3f-palladium__paneltitle';
    supplyTitle.textContent = 'ANNUAL MINE SUPPLY · TONNES';
    supply.appendChild(supplyTitle);
    const supplyMark = document.createElement('div');
    supplyMark.className = 's3f-palladium__supplymark';
    supplyMark.innerHTML = '';
    supply.appendChild(supplyMark);
    MINE_SUPPLY.forEach((spec, index) => {
      const row = document.createElement('div');
      row.className = 's3f-palladium__supplyrow';
      row.dataset.series = spec.id;
      row.style.setProperty('--i', String(index));
      const label = document.createElement('span');
      label.className = 's3f-palladium__supplylabel';
      label.style.color = `rgba(255, 255, 255, ${spec.alpha})`;
      label.textContent = `${spec.id}  ${spec.tonnes.toLocaleString('en-US')} t`;
      row.appendChild(label);
      const rel = spec.tonnes / SUPPLY_MAX;
      const bar = document.createElement('span');
      bar.className = 's3f-palladium__supplybar';
      bar.style.setProperty('--rel', String(rel));
      bar.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
      row.appendChild(bar);
      const tip = document.createElement('span');
      tip.className = 's3f-palladium__supplytip';
      tip.style.setProperty('--rel', String(rel));
      tip.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
      row.appendChild(tip);
      supply.appendChild(row);
    });
    const supplyNote = document.createElement('p');
    supplyNote.className = 's3f-palladium__panelnote';
    supplyNote.textContent = `world mine production, ${PD_MINE_SUPPLY_YEAR} — shorter is scarcer`;
    supply.appendChild(supplyNote);
    chart.appendChild(supply);

    const price = document.createElement('div');
    price.className = 's3f-palladium__price';
    const priceTitle = document.createElement('p');
    priceTitle.className = 's3f-palladium__paneltitle';
    priceTitle.textContent = 'PRICE OF ONE OUNCE · MODERN ERA';
    price.appendChild(priceTitle);

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `-14 -20 ${PD_W + 190} ${PD_H + 70}`);
    svg.classList.add('s3f-palladium__plot');
    const priceY = (v) => {
      const t = (Math.log(v) - Math.log(V_MIN)) / (Math.log(V_MAX) - Math.log(V_MIN));
      return PD_H - t * PD_H;
    };
    const add = (tag, attrs, cls, copy) => {
      const el = document.createElementNS(svgNS, tag);
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (cls) el.classList.add(cls);
      if (copy != null) el.textContent = copy;
      svg.appendChild(el);
      return el;
    };
    add('line', { x1: 0, y1: PD_H, x2: PD_W, y2: PD_H }, 's3f-palladium__axis');
    [1990, 2000, 2010, 2020].forEach((year) => {
      add('text', {
        x: ((year - PRICE_YEAR_MIN) / (PRICE_YEAR_MAX - PRICE_YEAR_MIN)) * PD_W,
        y: PD_H + 32,
        'text-anchor': year === PRICE_YEAR_MIN ? 'start' : 'middle'
      }, 's3f-palladium__axislabel', String(year));
    });
    const endYs = PD_PRICE.map(({ values }) => priceY(values[values.length - 1]) + 5);
    if (Math.abs(endYs[0] - endYs[1]) < 24) {
      const upper = endYs[0] < endYs[1] ? 0 : 1;
      endYs[1 - upper] = endYs[upper] + 24;
    }
    PD_PRICE.forEach(({ id, alpha, values }, index) => {
      const d = values.map((v, i) => `${((i / (values.length - 1)) * PD_W).toFixed(1)} ${priceY(v).toFixed(1)}`);
      const path = add('path', { d: `M ${d.join(' L ')}` }, 's3f-palladium__series');
      path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
      path.style.setProperty('--i', String(index));
      path.style.strokeDasharray = 'none';
      const label = add('text', { x: PD_W + 16, y: endYs[index] }, 's3f-palladium__serieslabel', id);
      label.style.fill = `rgba(255, 255, 255, ${alpha})`;
    });
    price.appendChild(svg);
    chart.appendChild(price);
    wrap.appendChild(chart);

    const timing = para('s3f-palladium__timing', COPY.pdTiming);
    const narrowed = para('s3f-palladium__narrowed', COPY.pdNarrowed);
    const bar = para('s3f-palladium__bar', COPY.pdBar);

    return { wrap, hook, chart, timing, narrowed, bar };
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

  // A ported chart needs its legacy slide root on the stage root before its own
  // reveal can play — the severance's labels and the palladium hook's lift are
  // both `data-step` rules. A gesture claims it here; applyState re-asserts it.
  chartRoot(kind, step) {
    this.root.classList.toggle('s2o-severance', kind === 'severance');
    this.root.classList.toggle('s3f-palladium', kind === 'palladium');
    if (kind) this.root.dataset.step = String(step);
    else delete this.root.dataset.step;
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

  // ---- the rail's gestures — the legacy rail's own, transcribed ----
  //
  // Every duration below is the legacy rail's, and every one of them is a
  // measured value from a shipped file, not a taste:
  //
  //   the camera            1.7s power2.inOut — EvolutionRail's own gsap tween
  //   a station arriving    800ms ease-out    — `.s2o-rail__stop`'s opacity
  //   a line landing        900ms fade + a rise from 6px over 1100ms —
  //                         `.s2o-rail__wound`, which lands by translating up
  //   the rail growing      1500ms after a 300ms hold — `.s2o-rail__line`'s
  //                         scaleX transition and its delay
  //
  // GSAP eases stand in for the CSS timing functions: `power1.out` for
  // `ease-out`, `power4.out` for `cubic-bezier(0.22, 1, 0.36, 1)`.

  /**
   * Move the rail to `spec`. The camera travels from wherever it is; stations
   * the state adds arrive; named rows land; `grow` runs the line's own
   * extension out to the new head.
   */
  railTo(tl, spec, {
    at = 0, arrive = null, land = [], grow = false, camera = true, arriveAt = 0.5
  } = {}) {
    const world = this.railWorld;
    const prev = world.state();
    const headOf = (s) => (s.headX == null ? RAIL_X[s.head] : s.headX);
    const camFrom = camera && prev ? { ...prev.cam } : { ...spec.cam };
    const headTo = RAIL_X[spec.head];
    const growing = grow !== false && grow != null;
    const headFrom = grow === true
      ? (prev ? headOf(prev) : headTo)
      : (typeof grow === 'number' ? grow : headTo);
    // A station arrives when the state adds it. On a cold entry there is no
    // previous state to diff, so the caller names them.
    const arriving = arrive || (prev
      ? RAIL_ORDER.filter((id) => spec.st[id] && !prev.st[id])
      : []);
    const recedeTo = RECEDE[spec.recede || 'none'];
    const recedeFrom = prev ? RECEDE[prev.recede || 'none'] : recedeTo;
    const drive = { ...camFrom, headX: headFrom, recedeValue: recedeFrom };
    const paint = () => world.apply({
      ...spec,
      cam: { cx: drive.cx, s: drive.s, cy: drive.cy },
      headX: drive.headX,
      recedeValue: drive.recedeValue
    });

    tl.add(() => {
      world.el.style.display = '';
      paint();
      arriving.forEach((id) => {
        const S = world.stations[id];
        gsap.set([S.mark, S.rowsWrap, S.g], { opacity: 0 });
      });
      land.forEach(([id, slot]) => {
        gsap.set(world.stations[id][slot], { opacity: 0, y: 6 });
      });
    }, at);

    if (camera) {
      tl.to(drive, {
        cx: spec.cam.cx, s: spec.cam.s, cy: spec.cam.cy,
        duration: 1.7, ease: 'power2.inOut', onUpdate: paint
      }, at);
    }
    if (growing) {
      tl.to(drive, {
        headX: headTo, duration: 1.5, ease: 'power4.out', onUpdate: paint
      }, at + 0.3);
    }
    if (recedeFrom !== recedeTo) {
      tl.to(drive, {
        recedeValue: recedeTo, duration: 0.8, ease: 'power1.out', onUpdate: paint
      }, at);
    }
    arriving.forEach((id) => {
      const S = world.stations[id];
      tl.to([S.mark, S.rowsWrap, S.g], { opacity: 1, duration: 0.8, ease: 'power1.out' }, at + arriveAt);
    });
    land.forEach(([id, slot], i) => {
      const el = world.stations[id][slot];
      const t = at + arriveAt + 0.25 + i * 0.1;
      tl.to(el, { opacity: 1, duration: 0.9, ease: 'power1.out' }, t);
      tl.to(el, { y: 0, duration: 1.1, ease: 'power4.out' }, t);
    });
    return arriving;
  }

  /**
   * The mesh forming out of the station it is anchored to (r2.6).
   *
   * The choreography is the batch's own, authored for the selected system at
   * Batch B and transcribed here move for move: the institutional shape stands
   * FIRST — the hub at full voice with its spokes out to the ring — and then
   * the centre steps away, the hub and its spokes settling to the receded
   * voices the candidate gives them, while the peer-to-peer chords come in
   * over them. What changed is where it happens: the hub is the LEDGER
   * station's own point on the rail, so the issuer the act has just watched
   * fail is the thing that dissolves.
   */
  railMesh(tl, at) {
    const w = this.railWorld;
    const SPOKE_LIVE = 'rgba(255,255,255,0.35)';
    const SPOKE_GONE = 'rgba(255,255,255,0.2)';
    const HUB_LIVE = 'rgba(255,255,255,0.8)';
    const HUB_GONE = 'rgba(255,255,255,0.3)';
    tl.add(() => {
      w.meshLayer.style.display = '';
      gsap.set(w.meshLayer, { opacity: 1 });
      gsap.set(w.meshChords, { opacity: 0 });
      gsap.set([...w.meshSpokes, w.meshHub, ...w.meshNodes], { opacity: 0 });
      gsap.set(w.meshSpokes, { stroke: SPOKE_LIVE });
      gsap.set(w.meshHub, { fill: HUB_LIVE });
    }, at);
    // The institution, holding the record.
    tl.to(w.meshHub, { opacity: 1, duration: 0.5, ease: 'power1.out' }, at + 0.05);
    tl.to(w.meshSpokes, { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: 0.03 }, at + 0.25);
    tl.to(w.meshNodes, { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.03 }, at + 0.4);
    // The centre steps away...
    tl.to(w.meshHub, { fill: HUB_GONE, duration: 1.1, ease: 'power1.inOut' }, at + 1.25);
    tl.to(w.meshSpokes, { stroke: SPOKE_GONE, duration: 1.1, ease: 'power1.inOut' }, at + 1.25);
    // ...and in its place, each node checking all the others.
    tl.to(w.meshChords, { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.035 }, at + 1.45);
  }

  /** The dependency arc drawing back from the certificate to the gold. */
  railDrawDep(tl, at, dur = 0.9) {
    const p = this.railWorld.depPath;
    const dots = this.railWorld.depDots;
    tl.add(() => {
      const len = p.getTotalLength() || 1;
      p.setAttribute('stroke-dasharray', String(len));
      p.setAttribute('stroke-dashoffset', String(len));
      gsap.set(dots, { opacity: 0 });
      gsap.set(dots[0], { opacity: 1 });
    }, at);
    tl.to(p, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease: 'power2.out' }, at + 0.02);
    tl.add(() => gsap.set(dots[1], { opacity: 1 }), at + dur);
  }

  /**
   * A stage-register block landing over the rail — the deck's own reveal.
   * `write` puts the state's own copy on the element, so a gesture and a
   * reconstruction cannot say different things.
   */
  railBlock(tl, el, write, at, { dur = 0.65, rise = 12 } = {}) {
    tl.add(() => {
      write();
      gsap.set(el, { opacity: 0, y: rise });
    }, at);
    tl.to(el, { opacity: 1, y: 0, duration: dur, ease: 'power2.out' }, at + 0.02);
  }

  // The rail's stage-register blocks, written from the state itself so a
  // gesture and a reconstruction cannot say different things.

  /** The dated fact anchored at its station (S5 b6). */
  railDatedFact(state) {
    const [name, stationId, y0] = state.datedFact;
    const ev = RAIL_TEXT.datedFact(RAIL_SPECIMEN[name], state.rail.cam, stationId, y0);
    if (ev.place) this.setText(this.evPlace, ev.place[0], ev.place[1]);
    else this.hideText(this.evPlace);
    this.setText(this.evDate, ev.date[0], ev.date[1]);
    this.setText(this.evFact, ev.fact[0], ev.fact[1]);
    return { place: this.evPlace, date: this.evDate, fact: this.evFact };
  }

  /**
   * A beat's own sentence, landed at its station. `landing` is the single
   * case; `landings` is the list Scene 9's entrant beats need, and the two are
   * the same shape so a state can use either.
   */
  railLandingList(state) {
    if (state.landings) return state.landings;
    return state.landing ? [state.landing] : [];
  }

  railLanding(state, i = 0) {
    const [copy, id, opts] = this.railLandingList(state)[i];
    const [text, styles] = RAIL_TEXT.landing(copy, state.rail.cam, id, opts);
    this.setText(this.railLandEls[i], text, styles);
    return this.railLandEls[i];
  }

  /** A statement over the receded record. */
  railStatement(state, i) {
    const [copy, opts] = state.statements[i];
    const [text, styles] = RAIL_TEXT.statement(copy, opts);
    this.setText(this.stmtEls[i], text, styles);
    return this.stmtEls[i];
  }

  /** The question register over the receded record. */
  railQuestion(state) {
    const [copy, top] = state.question;
    const [text, styles] = RAIL_TEXT.question(copy, top);
    this.setText(this.stmtEls[0], text, styles);
    return this.stmtEls[0];
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

    // THE RAIL WORLD. One state of the act's anchor, written from the sheet's
    // own camera math; `clearGestureProps` is the settled contract — a
    // reconstruction never inherits a gesture's leftovers.
    if (st.rail) {
      this.railWorld.el.style.display = '';
      this.railWorld.apply(st.rail);
    } else {
      this.railWorld.el.style.display = 'none';
    }
    this.railWorld.el.style.opacity = '';
    this.railWorld.clearGestureProps();

    // The legacy contender rail. Scenes 5–7 left it at the rail rewire and
    // Scenes 8–10 never used it, so nothing sets `legacyRail` any more; the
    // mount stays until Session 2 retires it with the compositions it served.
    if (st.legacyRail) {
      this.railWrap.style.display = '';
      this.railWrap.style.opacity = '';
      this.rail.applyState(st.legacyRail, { live: false });
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
    study(this.ledgerStudy, st.study === 'ledger_glow');
    study(this.certForm, false);          // motion-only: the dissolve's paper
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
      const ev = GEOM.evidence(st.evidence);
      if (ev.place) this.setText(this.evPlace, ev.place[0], ev.place[1]);
      else this.hideText(this.evPlace);
      this.setText(this.evDate, ev.date[0], ev.date[1]);
      this.setText(this.evFact, ev.fact[0], ev.fact[1]);
      [this.evPlace, this.evDate, this.evFact].forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,y' });
      });
    } else {
      [this.evPlace, this.evDate, this.evFact].forEach((el) => this.hideText(el));
    }

    // Scene 9's network — the group's display is the whole state.
    this.net.g.style.display = st.net ? '' : 'none';
    gsap.set([this.net.g, ...this.net.spokes, ...this.net.chords, this.net.hub, ...this.net.ring],
      { clearProps: 'opacity,stroke,fill,scale,transform' });

    // Scene 9's entrant block. The landed row speaks at full voice; the rows
    // before it hold the dimmed-prior step (§9.4 rule 10), which is carried in
    // the color alpha, so the whole state is a style write.
    if (st.entrant) {
      const E = GEOM.entrant;
      const voice = (row) => (row === st.entrant ? 1 : VOICE.labelSpent);
      const raised = st.entrant !== 'facts';
      this.setBox(this.coinPhoto, E.coin);
      this.coinPhoto.style.opacity = String(E.coinVoice);
      this.setDot(this.entrantDot, ...E.dot);
      this.setText(this.entrantName, E.name, E.nameStyle);
      this.setText(this.entrantFacts, E.facts, E.factsStyle(voice('facts'), raised));
      this.entrantCaps.forEach((el, i) => {
        if (raised) this.setText(el, E.capabilities[i], E.capStyle(voice('capabilities'), i));
        else this.hideText(el);
      });
      if (st.entrant === 'limitation') {
        this.setText(this.entrantLimit, E.limitation, E.limitStyle(voice('limitation')));
      } else this.hideText(this.entrantLimit);
      gsap.set([this.entrantName, this.entrantFacts, ...this.entrantCaps, this.entrantLimit],
        { clearProps: 'opacity,y' });
      gsap.set(this.coinPhoto, { clearProps: 'y,scale' });
    } else {
      this.coinPhoto.style.opacity = '0';
      this.setDot(this.entrantDot, 0, 0, 0, 0);
      [this.entrantName, this.entrantFacts, ...this.entrantCaps, this.entrantLimit]
        .forEach((el) => this.hideText(el));
    }

    // Scene 10's strip. The stations are fixed; the live one changes.
    gsap.set([...this.stripPhotos, ...this.stripNames, ...this.stripGains, ...this.stripDeps],
      { clearProps: 'opacity,y,scale' });
    if (st.strip) {
      const S = GEOM.strip;
      this.setSeg(this.stripLine, [S.lineX[0], S.y, S.lineX[1], S.y, VOICE.lineDim, 2]);
      STATIONS.forEach((s, i) => {
        const x = S.xs[i];
        const on = i === S.live;
        const a = on ? 1 : 0.55;
        this.setBox(this.stripPhotos[i], S.box(s.key, x));
        this.stripPhotos[i].style.opacity = String(on ? 1 : 0.58);
        this.setDot(this.stripDots[i], x, S.y, 6, on ? 0.85 : 0.5);
        this.setText(this.stripNames[i], s.key === 'paper' ? S.claimLabel : s.name,
          S.nameStyle(x, on));
        this.setText(this.stripGains[i], s.gain, S.gainStyle(x, a));
        this.setText(this.stripDeps[i], s.dep, S.depStyle(x, a));
      });
    } else {
      this.stripLine.setAttribute('opacity', '0');
      this.stripDots.forEach((d) => this.setDot(d, 0, 0, 0, 0));
      this.stripPhotos.forEach((el) => { el.style.opacity = '0'; });
      [...this.stripNames, ...this.stripGains, ...this.stripDeps]
        .forEach((el) => this.hideText(el));
    }

    // The ported charts, and the slide roots they need. Without the root's own
    // class and step the severance's series labels and the palladium hook's
    // lift do not render — carrying them is what makes this the treatment.
    this.root.classList.toggle('s2o-severance', st.chart === 'severance');
    this.root.classList.toggle('s3f-palladium', Boolean(st.palladium));
    if (st.chart === 'severance') this.root.dataset.step = '4';
    else if (st.palladium) this.root.dataset.step = String(st.palladium);
    else delete this.root.dataset.step;
    this.sevChart.chart.style.display = st.chart === 'severance' ? '' : 'none';
    setVisible(this.sevChart.chart, true);
    gsap.set(this.sevChart.chart, { clearProps: 'opacity,y' });
    this.palladium.wrap.style.display = st.palladium ? '' : 'none';
    [this.palladium.hook, this.palladium.chart, this.palladium.timing]
      .forEach((el) => setVisible(el, true));
    setVisible(this.palladium.narrowed, st.palladium === 5);
    setVisible(this.palladium.bar, st.palladium === 5);
    gsap.set([this.palladium.wrap, this.palladium.hook, this.palladium.chart,
      this.palladium.timing, this.palladium.narrowed, this.palladium.bar],
    { clearProps: 'opacity,y' });

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

    // The rail's dated fact — the evidence grammar anchored at its station
    // (S5 b6's Zanzibar). It writes the same three elements the legacy
    // specimens use, and comes after them so the anchored version wins.
    if (st.datedFact) {
      this.railDatedFact(st);
      [this.evPlace, this.evDate, this.evFact].forEach((el) => {
        gsap.set(el, { clearProps: 'opacity,y' });
      });
    }

    // The rail's station-anchored landing — a beat's own sentence, landed at
    // its station in the deck's registers.
    const landings = this.railLandingList(st);
    this.railLandEls.forEach((el, i) => {
      if (i < landings.length) {
        this.railLanding(st, i);
        gsap.set(el, { clearProps: 'opacity,y' });
      } else this.hideText(el);
    });

    // The statements — the rail's own over the receded record, the legacy
    // scenes' `stmts`, and Scene 10's closing question, which takes the deck's
    // question register rather than the statement one, in the first slot.
    this.stmtEls.forEach((el, i) => {
      const railStmt = st.statements && st.statements[i];
      const conf = st.stmts && st.stmts[i];
      if (i === 0 && st.question) {
        if (Array.isArray(st.question)) this.railQuestion(st);
        else this.setText(el, GEOM.question[0], GEOM.question[1]);
        gsap.set(el, { clearProps: 'opacity,y' });
      } else if (railStmt) {
        this.railStatement(st, i);
        gsap.set(el, { clearProps: 'opacity,y' });
      } else if (conf) {
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
    const rw = this.railWorld;
    return {
      scene: this.scene,
      build: this.build,
      // The rail world — every station's geometry and voice, the line's extent,
      // the dependency arc. This is what the reduced-motion parity check reads
      // to prove that a state reached without motion is the same state.
      world: {
        display: rw.el.style.display,
        recede: getComputedStyle(rw.layer).opacity,
        line: ['x', 'y', 'width', 'height'].map((a) => rw.lineRect.getAttribute(a)),
        ticks: rw.ticks.map((t) => [t.style.display, t.getAttribute('x'), t.getAttribute('width')]),
        stations: Object.entries(rw.stations).map(([id, S]) => [
          id, S.mark.style.display, S.photo.style.left, S.photo.style.top,
          S.photo.style.getPropertyValue('--df-w'), S.photo.style.opacity,
          S.dot.getAttribute('cx'), S.dot.getAttribute('r'), S.dot.getAttribute('fill'),
          text(S.label), text(S.row64), text(S.row146)
        ]),
        dep: [rw.depPath.style.display, rw.depPath.getAttribute('d'),
          rw.depPath.getAttribute('stroke-width')],
        mesh: [rw.meshLayer.style.display, getComputedStyle(rw.meshLayer).opacity,
          rw.meshHub.getAttribute('cx'), rw.meshHub.getAttribute('r'),
          rw.meshChords.length,
          rw.meshNodes.map((c) => [c.getAttribute('cx'), c.getAttribute('r'),
            getComputedStyle(c).opacity]),
          rw.meshSpokes.map((l) => [l.getAttribute('x2'), getComputedStyle(l).opacity])],
        landings: this.railLandEls.map(text)
      },
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
      studies: [this.goldStudy, this.vaultStudy, this.ledgerStudy, this.certForm].map((el) => [
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
      traveler: this.traveler.style.opacity,
      root: [this.root.className, this.root.dataset.step || ''],
      net: [this.net.g.style.display, getComputedStyle(this.net.g).opacity,
        this.net.chords.length],
      entrant: {
        coin: [this.coinPhoto.style.left, this.coinPhoto.style.top,
          this.coinPhoto.style.width, this.coinPhoto.style.height,
          getComputedStyle(this.coinPhoto).opacity],
        dot: attr(this.entrantDot, ['cx', 'cy', 'r', 'fill', 'opacity']),
        rows: [this.entrantName, this.entrantFacts, ...this.entrantCaps, this.entrantLimit].map(text)
      },
      strip: {
        line: attr(this.stripLine, ['x1', 'y1', 'x2', 'y2', 'stroke', 'opacity']),
        dots: this.stripDots.map((d) => attr(d, ['cx', 'cy', 'r', 'fill', 'opacity'])),
        photos: this.stripPhotos.map((el) => [el.style.left, el.style.top,
          el.style.width, el.style.height, getComputedStyle(el).opacity]),
        rows: [...this.stripNames, ...this.stripGains, ...this.stripDeps].map(text)
      },
      charts: {
        severance: [this.sevChart.chart.style.display,
          getComputedStyle(this.sevChart.chart).opacity],
        palladium: [this.palladium.wrap.style.display,
          getComputedStyle(this.palladium.hook).opacity,
          this.palladium.narrowed.dataset.visible, this.palladium.bar.dataset.visible]
      }
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
    state: () => stage.serialize(),
    // The harness's one affordance: apply a stage state by name. It exists for
    // the state Scene 6 carries past its last beat — the rail's return seam,
    // which is not a build and so cannot be reached by advancing (the sheet's
    // `s6-b9-return`). Nothing in the deck calls it.
    apply: (sceneId, build) => stage.applyState(sceneId, build)
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
