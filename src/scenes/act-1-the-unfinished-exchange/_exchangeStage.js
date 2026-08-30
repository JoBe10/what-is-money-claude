// Act I — the shared stage for Scenes 2, 3 and 4.
//
// TRANSPLANTED FROM THE CLOSED GATE. This file is `src/proto/gate-2/_stage.js`
// as the presenter judged it, specialized to the ruled selection. Prototype
// Gate 2 closed on his recorded word — *exceptional*, 29 August 2026
// (`review/gate-2/states/states.json` `rulingsClose`) — and Batch A ships that
// artifact rather than reinterpreting it. Nothing here is iterated.
//
// One continuous visual world: three scene modules share this one stage object,
// cached on the engine's container across within-group handoffs, so the morphs
// at 2→3 and 3→4 are real shared-DOM continuity and never a remount. Every
// element the three scenes touch is built once, here; the scenes drive it
// through two surfaces only:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any of the 19 builds, instantly. This is the
//                                 scene contract's `_applyBuild(n)`: direct
//                                 entry, backward movement, reduced motion and
//                                 interrupted animations all resolve here.
//   timeline()                  — a registered GSAP timeline for a forward
//                                 gesture. Every timeline ends by snapping to
//                                 applyState, so a settled frame is always
//                                 exactly the approved cell it must match.
//
// THE GEOMETRY IS LAW, NOT DESIGN — and under the full-coverage rule the law
// is the beat-state sheet. Every rect, coordinate, opacity and stroke width in
// GEOM is transcribed from `review/gate-2/harness/states.mjs` — the builders
// that rendered the approved cells — so the settled states match the approved
// cells by construction. The landed-state proof proves it mechanically, pixel
// against pixel. Derivation is banned: nothing settled here exists outside an
// approved cell.
//
// WHAT THE SPECIALIZATION REMOVED, AND WHY. The gate judged three failure
// languages live, runtime-selectable (`?proto=gate2&path=1|2|3`), and three
// birth treatments beside them. **The ruled selections are path 2 — the
// absence — and pool**, and runtime path selection does not ship in the deck.
// So this file carries the absence and the pool only; the retired candidates
// stay on file, runnable, in `src/proto/gate-2/`, exactly as the aesthetic
// law's file-keeping clause requires. The removal is inert by construction: no
// settled or animated state of path 2 ever touched the reach's strokes, the
// flow's drift, the archived D3-C spans or the fragment pool they were drawn
// on, so **the shipped stage has no return-path line element at all** — which
// is what "the absence" means, made literal.
//
// The failure language is THE ABSENCE: no return line exists before the birth;
// the service path stays whole (the delivered half on record); the terminal dot
// strains and subsides; the birth pools from the void.
//
// The approved state set (states.json `approvedSetCurrent`):
//   S2  b1 s2-b1-a · b2 s2-b2 · b3 s2-b3-p2 · b4 s2-b4-p2 · b5 s2-b5-b-p2
//   S3  b1 s3-b1-p2 · b2 s3-b2 · b3 s3-b3 · b4 s3-b4-a · b5 s3-b5-a
//       b6 s3-b6-a · b7 s3-b7-b · b8 s3-b8-a · b9 s3-b9-a
//   S4  b1–b5 s4-b1-b … s4-b5-b (system B throughout; b2 is the contained
//       s4-b2-b2, approved at the close)

import { gsap } from 'gsap';
import { DarkFieldImage } from '../../components/DarkField.js';
import { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';
import { ClaimMark, CLAIM_MARK_SELECTION } from '../../proto/claim-mark.js';

const svgNS = 'http://www.w3.org/2000/svg';

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- geometry law

export const GEOM = {
  // Dark-field boxes [x, y, w, h] — transcribed from states.mjs.
  surgeonS2: [150, 126, 620, 827],          // surgeonS2()
  patientS2: [1150, 152, 620, 775],         // patientS2()
  surgeonS3: [170, 194, 520, 693],          // birthFigures()
  patientS3: [1230, 215, 520, 650],         // birthFigures()
  surgeonS3b: [180, 247, 440, 587],         // intervalA() / demoContext()

  // The wanted goods as dim possibilities (goodsD2 'cluster', D2-A) and the
  // two other goods placements the landed states use.
  goodsCluster: { shoe: [690, 140, 260, 195], meal: [960, 160, 260, 195], wine: [825, 360, 260, 195] },
  clusterO: 0.45,
  shoeDemo: [1420, 427, 300, 225],          // s3-b7-b — the shoes, arriving
  // s4-b2-b2 (presenter markup, 28 Aug): reduced uniform scale, a compact
  // triangle within the spend terminal's zone, wholly inside the left third
  // (every right edge ≤ 600 < 640) — echoing the S2 cluster's own pose
  // (shoe/meal above, wine below-center), contained and modest per the
  // legacy ref-4-05-b2's feel.
  goodsSpendB: { shoe: [178, 726, 188, 141], meal: [412, 726, 188, 141], wine: [295, 880, 188, 141] },

  // The service path (s2-b1-a) and the delivery (s2-b2).
  service: { x1: 820, x2: 1100, y: 620, o: 0.35, w: 1.5, dotR: 3.5, dotO: 0.7 },
  delivery: [[1052, 620, 5, 0.9], [1100, 620, 4.5, 0.9]],

  // The capabilities list (s2-b1-a full voice, s2-b2 settled to the floor).
  caps: { x: 790, y: 255, w: 340, gap: 12, full: 0.75, floor: 0.41 },

  // The return terminal at the patient's near edge (carried from the sheet;
  // s2-b5-b-p2's receded record anchors on it, and the morph's lift starts
  // from it).
  attemptDot: [1170, 620, 3, 0.5],

  // THE ABSENCE — the ruled failure language (the gate's close, 29 August
  // 2026). No return line exists before the birth; the service path stays
  // whole and the return direction is only the terminal dot, which strains in
  // motion and subsides. [x, y, r, opacity].
  pathAbsence: {
    b3Dot: [1170, 620, 3, 0.55],
    b4Dot: [1170, 620, 3, 0.4],
    remDot: [1206, 540, 3, 0.4],
    subDot: [1206, 540, 3, 0.7]                 // the light gathered home, pre-strain
  },

  // The b5 recede (s2-b5-b, D4-B): per-element, the two people the anchor.
  b5: { surgeon: 0.5, patient: 0.38, goods: 0.12, fail: 0.35, stmtY: 815 },

  // The Claim Mark's settled placements [cx, cy, size].
  markBirth: [880, 540, 132],               // s3-b1-p2 … s3-b3
  markHeld: [760, 540, 116],                // s3-b4-a … s3-b6-a, s3-b8-a, s3-b9-a
  markDemo: [1000, 540, 116],               // s3-b7-b — mid-departure
  markForkB: [960, 470, 116],               // s4-b1-b, s4-b3-b
  markSaveB: [1530, 630, 116],              // s4-b4-b, s4-b5-b
  MARK_BASE: 132,

  // The open-interval line (intervalA) [x1, x2, y, opacity, width] — a
  // gradient stroke fading to nothing at x2.
  fadeHeld: [842, 1560, 540, 0.22, 1.2],
  // s3-b9-a's handoff dims the same line to 0.45 of its voice (0.22 × 0.45).
  fadeHeldOff: [842, 1560, 540, 0.099, 1.2],
  // The demonstration's two wakes (s3-b7-b): the claim's, and the arrival's.
  wakeOut: [935, 660, 540, 0.5, 2.5],
  wakeIn: [1728, 1858, 540, 0.4, 2.2],
  // The save road's continuation into unseen time (s4-b4-b / s4-b5-b).
  fadeSaveB: [1595, 1860, 630, 0.3, 1.5],
  fadeSaveBFloor: [1595, 1860, 630, 0.17, 1.5],

  // The interval labels (intervalA): left edge, line centres, voices.
  labels: { x: 1080, ys: [420, 540, 660] },
  demoLabels: [0.14, 0.14, 0.18],           // s3-b7-b — the words hand the frame down
  b9Labels: [0.1, 0.1, 0.14],               // s3-b9-a — the handoff to clean black
  b9Surgeon: 0.1,

  // Scene 4, system B (s4RoadsB): one claim, two mirrored roads, the unchosen
  // dormant rather than absent. Path data verbatim; dot terminals.
  roadLeft: 'M 880 470 H 720 L 500 630 H 280',
  roadRight: 'M 1040 470 H 1200 L 1420 630 H 1640',
  roadLeftDot: [280, 630, 3.5],
  roadRightDot: [1640, 630, 3.5],
  roads: {
    fork: { left: 0.3, right: 0.3, leftDot: 0.5, rightDot: 0.5 },        // s4-b1-b
    spend: { left: 0.45, right: 0.15, leftDot: 0.85, rightDot: 0.3 },    // s4-b2-b2
    reset: { left: 0.15, right: 0.3, leftDot: 0.3, rightDot: 0.5 },      // s4-b3-b
    save: { left: 0.15, right: 0.45, leftDot: 0.3, rightDot: 0 },        // s4-b4-b
    floor: { left: 0.09, right: 0.25, leftDot: 0.16, rightDot: 0 }       // s4-b5-b
  },
  // The kicker names at the roads' destinations [cx, y].
  kickSpendB: [390, 690],
  kickSaveB: [1530, 690],
  kickDormant: 0.4
};

const CAPABILITIES = [
  'Specialized skill',
  'Scarce knowledge',
  'Years of training',
  'Professional judgment',
  'Dexterity',
  'Responsibility'
];

// On-screen copy — every line a verbatim phrase of the batch package's §2
// scripts or an approved-cell element. Nothing here is invented wording.
const COPY = {
  binding: 'It binds both halves of the trade to the same two people.',
  separates: 'Money separates the two halves of an exchange.',
  unfinished: 'The exchange can remain unfinished.',
  spendCloses: 'Spending closes the exchange.',
  saveKeeps: 'Saving keeps it open.',
  intervals: ['SOMEONE ELSE', 'SOMEWHERE ELSE', 'LATER']
};

// --------------------------------------------------------------- settled states
//
// The 19 builds as complete declarative states — each one an approved cell of
// the beat-state sheet, named in its annotation. `null` / absent = off stage.
// Goods entries are [rect, opacity].

const A = GEOM.pathAbsence;

// The wants context — patient dimmed in place (D1-A), goods clustered at the
// surgeon's side (D2-A) — shared by b3 and b4.
const wants = {
  surgeon: [GEOM.surgeonS2, 1], patient: [GEOM.patientS2, 0.55],
  goods: {
    shoe: [GEOM.goodsCluster.shoe, GEOM.clusterO],
    meal: [GEOM.goodsCluster.meal, GEOM.clusterO],
    wine: [GEOM.goodsCluster.wine, GEOM.clusterO]
  }
};

export const STATES = {
  'the-direct-exchange': [
    // beat 1 — s2-b1-a: the assembled stage, capabilities at full voice (R2).
    { surgeon: [GEOM.surgeonS2, 1], patient: [GEOM.patientS2, 1],
      service: true, caps: GEOM.caps.full },
    // beat 2 — s2-b2: the delivery arrived, the receiving terminal lit, the
    // capabilities settled to the floor.
    { surgeon: [GEOM.surgeonS2, 1], patient: [GEOM.patientS2, 1],
      service: true, caps: GEOM.caps.floor, delivery: true },
    // beat 3 — s2-b3-p2: the frame turns to the surgeon's wants; the service
    // path stays whole (the delivered half on record) and the return direction
    // is only the terminal dot, settled at 0.55 after the strain.
    { ...wants, service: true, fragDot: [A.b3Dot, 1] },
    // beat 4 — s2-b4-p2: the second, harder strain has subsided; the dot
    // settles dimmer. No return line ever exists.
    { ...wants, service: true, fragDot: [A.b4Dot, 1] },
    // beat 5 — s2-b5-b-p2: the binding line; authored partial recede, the two
    // people the statement's anchor (D4-B). The receded failure record speaks
    // the absence — the service path on record and the terminal dot, both at
    // the recede factor.
    { surgeon: [GEOM.surgeonS2, GEOM.b5.surgeon], patient: [GEOM.patientS2, GEOM.b5.patient],
      goods: { shoe: [GEOM.goodsCluster.shoe, GEOM.b5.goods], meal: [GEOM.goodsCluster.meal, GEOM.b5.goods], wine: [GEOM.goodsCluster.wine, GEOM.b5.goods] },
      service: GEOM.b5.fail, fragDot: [A.b4Dot, GEOM.b5.fail],
      stmt: { y: GEOM.b5.stmtY, text: COPY.binding } }
  ],
  'the-breakthrough': [
    // beat 1 — s3-b1-p2: the carried birth composition; the remnant area holds
    // only the terminal dot whose final strain fed the pool.
    { surgeon: [GEOM.surgeonS3, 1], patient: [GEOM.patientS3, 1],
      mark: GEOM.markBirth, fragDot: [A.remDot, 1] },
    // beat 2 — s3-b2: the contraction complete; the claim held between them.
    { surgeon: [GEOM.surgeonS3, 1], patient: [GEOM.patientS3, 1], mark: GEOM.markBirth },
    // beat 3 — s3-b3: the patient released; the darkness where he was.
    { surgeon: [GEOM.surgeonS3, 1], mark: GEOM.markBirth },
    // beat 4 — s3-b4-a: the interval opens; SOMEONE ELSE at full voice (D6-A).
    { surgeon: [GEOM.surgeonS3b, 1], mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [1, 0, 0] },
    // beat 5 — s3-b5-a: SOMEWHERE ELSE lands; SOMEONE ELSE demotes.
    { surgeon: [GEOM.surgeonS3b, 1], mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 1, 0] },
    // beat 6 — s3-b6-a: LATER lands — s3-f2-a exactly.
    { surgeon: [GEOM.surgeonS3b, 1], mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1] },
    // beat 7 — s3-b7-b: the completion as two phases in one frame (D5-B) —
    // the claim mid-departure, the shoes mid-arrival, motion in the trails.
    { surgeon: [GEOM.surgeonS3b, 1], labels: GEOM.demoLabels,
      mark: GEOM.markDemo, wakeA: GEOM.wakeOut, wakeB: GEOM.wakeIn,
      goods: { shoe: [GEOM.shoeDemo, 1] } },
    // beat 8 — s3-b8-a: the reset to the held claim — beat 6's frame again.
    { surgeon: [GEOM.surgeonS3b, 1], mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1] },
    // beat 9 — s3-b9-a: the full recorded handoff to clean black (D4-A) —
    // only the claim keeps the stage; the pair lands over it.
    { surgeon: [GEOM.surgeonS3b, GEOM.b9Surgeon], mark: GEOM.markHeld,
      fade: GEOM.fadeHeldOff, labels: GEOM.b9Labels,
      stmtDim: { y: 790, text: COPY.separates },
      stmt: { y: 872, text: COPY.unfinished } }
  ],
  'spend-or-save': [
    // beat 1 — s4-b1-b: the symmetric fork — two mirrored roads descend from
    // the claim, both real, neither taken (D7-B).
    { mark: GEOM.markForkB, roads: GEOM.roads.fork,
      kickSpend: [...GEOM.kickSpendB, 1], kickSave: [...GEOM.kickSaveB, 1] },
    // beat 2 — s4-b2-b2: the spend road taken — the claim traveled left and
    // closed; the goods stand at the road's end, contained per the presenter's
    // markup; the save road waits, dormant.
    { roads: GEOM.roads.spend,
      kickSpend: [...GEOM.kickSpendB, 1], kickSave: [...GEOM.kickSaveB, GEOM.kickDormant],
      goods: { shoe: [GEOM.goodsSpendB.shoe, 1], meal: [GEOM.goodsSpendB.meal, 1], wine: [GEOM.goodsSpendB.wine, 1] } },
    // beat 3 — s4-b3-b: the fork re-posed — the spend road subdued by its own
    // telling; the save road holds its place.
    { mark: GEOM.markForkB, roads: GEOM.roads.reset,
      kickSpend: [...GEOM.kickSpendB, GEOM.kickDormant], kickSave: [...GEOM.kickSaveB, 1] },
    // beat 4 — s4-b4-b: the claim takes the save road and rests on it; the
    // road continues into time it cannot see.
    { mark: GEOM.markSaveB, roads: GEOM.roads.save, fade: GEOM.fadeSaveB },
    // beat 5 — s4-b5-b: the pair lands beneath the held road; the roads
    // settle to the floor, the claim keeps its voice.
    { mark: GEOM.markSaveB, roads: GEOM.roads.floor, fade: GEOM.fadeSaveBFloor,
      stmtDim: { y: 790, text: COPY.spendCloses },
      stmt: { y: 872, text: COPY.saveKeeps } }
  ]
};

export const TOTAL_BUILDS = {
  'the-direct-exchange': STATES['the-direct-exchange'].length - 1,
  'the-breakthrough': STATES['the-breakthrough'].length - 1,
  'spend-or-save': STATES['spend-or-save'].length - 1
};

// ------------------------------------------------------------------- the stage

class Act1Stage {
  constructor(container) {
    this.container = container;
    this.motion = new Set();
    this.birthTl = null;
    this.tagged = {};        // named gestures the verification harness can watch
    this.scene = null;
    this.build = 0;
    this.states = STATES;
    this._build();
  }

  _build() {
    const root = document.createElement('div');
    root.className = 'act1-stage';
    // The authored black is the stage's own (the film's Act I world is pure
    // black), and it is load-bearing for the landed-state proof: an opaque
    // ground lets the engine's transformed canvas keep subpixel text
    // antialiasing, which is how the approved cells were rasterized. On a
    // transparent stage the canvas layer falls back to grayscale AA and every
    // glyph differs from its cell by a color fringe.
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:#000;';

    // Layer order: the scene (lines, photos, labels) < the mark < statements —
    // the sheet's own stacking (the builders append the mark after the scene
    // and the statements last).
    const scene = document.createElement('div');
    scene.className = 'act1-scene';
    scene.style.cssText = 'position:absolute; inset:0;';
    root.appendChild(scene);

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 1920 1080');
    svg.setAttribute('width', '1920');
    svg.setAttribute('height', '1080');
    svg.style.cssText = 'position:absolute; inset:0;';
    scene.appendChild(svg);

    this.root = root;
    this.scenEl = scene;
    this.svg = svg;

    // The service path: line + two dot terminals, then the delivery's two
    // dots — created in the sheet's own order so same-centre overlaps
    // composite identically.
    this.service = { line: this._line(), d1: this._dot(), d2: this._dot() };
    this.deliveryEls = [this._dot(), this._dot()];

    // The return direction's one element. Under the ruled failure language
    // there is no line to draw: the terminal dot at the patient's edge is the
    // whole of it, and the absence around it is the point.
    this.fragDotEl = this._dot();

    // Scene 4's two mirrored roads with their dot terminals (system B).
    this.roadL = this._path(GEOM.roadLeft);
    this.roadR = this._path(GEOM.roadRight);
    this.roadDotL = this._dot();
    this.roadDotR = this._dot();

    // Three gradient lines that fade to nothing at their far end: the open
    // interval / save continuation, and the demonstration's two wakes.
    this.fade = this._fadeLine('act1-fade');
    this.wakeA = this._fadeLine('act1-wake-a');
    this.wakeB = this._fadeLine('act1-wake-b');

    // A traveling pulse — deliveries and heads in transit ride the drawn lines.
    this.pulse = this._dot();
    this.pulse.setAttribute('fill', 'rgba(254,244,232,0.95)');

    this.surgeon = this._df('surgeon', 'The surgeon, one hour of specialized surgery');
    this.patient = this._df('patient', 'The patient, the other half of the exchange');

    this.capsEl = this._caps();

    // The interval words carry their voice in the color alpha, as the cells
    // do (see the capabilities note below).
    this.labelsEl = COPY.intervals.map((copy, i) => {
      const p = document.createElement('p');
      p.textContent = copy;
      p.style.cssText = `position:absolute; margin:0; left:${GEOM.labels.x}px;` +
        `top:${GEOM.labels.ys[i]}px; font-size:46px; font-weight:560;` +
        'letter-spacing:0.12em; color:rgba(255,255,255,1); text-transform:uppercase; opacity:0;';
      gsap.set(p, { yPercent: -50 });
      scene.appendChild(p);
      return p;
    });

    this.kickSpend = this._kicker('SPEND');
    this.kickSave = this._kicker('SAVE');

    // The goods render above the interval words, exactly as the cells stack
    // them (s3-b7-b's arriving shoes cross the dimmed SOMEWHERE ELSE).
    this.shoe = this._df('shoe', 'Shoes');
    this.meal = this._df('meal', 'A dinner');
    this.wine = this._df('wine', 'A bottle of wine');

    // The Claim Mark — candidate A through the film-wide component at the
    // recorded Gate 1 selection, exactly as the sheet renders it. Settled
    // sizes are written to the disc itself (--disc-size), so a settled frame
    // is the sheet's own drawing; gestures scale the wrap and the closing
    // applyState snaps to the exact size at scale 1.
    const markLayer = document.createElement('div');
    markLayer.style.cssText = 'position:absolute; inset:0; pointer-events:none;';
    root.appendChild(markLayer);
    this.markWrap = document.createElement('div');
    // display:grid blockifies the ClaimMark child — as inline content it
    // would add baseline descender space below the disc and the -50%
    // translate would land it ~3px high of the cell's placement.
    this.markWrap.style.cssText = 'position:absolute; opacity:0; display:grid;';
    this.markWrap.appendChild(ClaimMark({ candidate: CLAIM_MARK_SELECTION, size: GEOM.MARK_BASE }));
    this.markDisc = this.markWrap.querySelector('.luminous-disc');
    gsap.set(this.markWrap, { xPercent: -50, yPercent: -50 });
    markLayer.appendChild(this.markWrap);

    // The birth's pooling glow — motion-only, formless, warm white without the
    // accent: orange arrives only as the disc's form resolves.
    this.blob = document.createElement('div');
    this.blob.style.cssText = 'position:absolute; width:220px; height:220px;' +
      'border-radius:50%; opacity:0; pointer-events:none;' +
      'background:radial-gradient(circle, rgba(253,233,212,0.85) 0%, rgba(253,233,212,0.25) 45%, rgba(253,233,212,0) 70%);';
    gsap.set(this.blob, { xPercent: -50, yPercent: -50 });
    markLayer.appendChild(this.blob);

    // The entry's rising light — motion-only, a wide soft warm wash that
    // lifts the black as the scene finds its light. It sits OVER the scene's
    // photographs (light falls on everything; beneath them, their box edges
    // would occlude it into a hard-edged panel) and under the mark and the
    // statements. Warm white; no accent exists in Scene 2.
    this.wash = document.createElement('div');
    this.wash.style.cssText = 'position:absolute; left:960px; top:620px;' +
      'width:1500px; height:900px; border-radius:50%; opacity:0; pointer-events:none;' +
      'background:radial-gradient(ellipse, rgba(253,233,212,0.1) 0%, rgba(253,233,212,0.035) 45%, rgba(253,233,212,0) 72%);';
    gsap.set(this.wash, { xPercent: -50, yPercent: -50 });
    scene.appendChild(this.wash);

    const stmts = document.createElement('div');
    stmts.style.cssText = 'position:absolute; inset:0; pointer-events:none;';
    root.appendChild(stmts);
    this.stmtDim = this._stmt(stmts, 'rgba(255,255,255,0.66)');
    this.stmt = this._stmt(stmts, '#fff');

    this.container.appendChild(root);
  }

  // ---- element factories ----

  _df(name, alt) {
    const box = DarkFieldImage({ name, width: 100, height: 100, alt });
    // The scene drives opacity directly; the register's own 520ms reveal
    // transition would fight every tween and every instant reconstruction.
    box.el.dataset.visible = 'true';
    box.el.style.transition = 'none';
    box.el.style.position = 'absolute';
    box.el.style.opacity = '0';
    this.scenEl.appendChild(box.el);
    return box.el;
  }

  _line() {
    const l = document.createElementNS(svgNS, 'line');
    l.setAttribute('stroke', 'rgba(255,255,255,0.35)');
    l.setAttribute('stroke-width', '1.5');
    l.setAttribute('stroke-linecap', 'round');
    l.setAttribute('opacity', '0');
    this.svg.appendChild(l);
    return l;
  }

  _path(d) {
    const p = document.createElementNS(svgNS, 'path');
    p.setAttribute('d', d);
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'rgba(255,255,255,0.3)');
    p.setAttribute('stroke-width', '1.5');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('opacity', '0');
    this.svg.appendChild(p);
    return p;
  }

  _dot() {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('fill', 'rgba(255,255,255,0.7)');
    c.setAttribute('opacity', '0');
    this.svg.appendChild(c);
    return c;
  }

  // A gradient line fading to nothing at its far end — the sheet's fadeSeg.
  _fadeLine(gradId) {
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `<linearGradient id="${gradId}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="rgba(255,255,255,0.22)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" /></linearGradient>`;
    this.svg.appendChild(defs);
    const grad = defs.querySelector('linearGradient');
    const line = this._line();
    line.setAttribute('stroke', `url(#${gradId})`);
    return { line, grad, stop: grad.querySelector('stop'), state: null };
  }

  _caps() {
    const { x, y, w, gap } = GEOM.caps;
    const list = document.createElement('div');
    list.style.cssText = `position:absolute; left:${x}px; top:${y}px; width:${w}px;` +
      `display:grid; justify-items:center; gap:${gap}px; text-align:center;`;
    this.capsItems = CAPABILITIES.map((copy) => {
      const label = document.createElement('p');
      // The settled voice (0.75 full, 0.41 floor) lives in the COLOR alpha,
      // exactly as the cells write it: element opacity below 1 would force a
      // compositing group and drop the glyphs to grayscale antialiasing,
      // which is not how the approved cells were rasterized. Gestures tween
      // the color and use element opacity only for entrances and exits.
      label.style.cssText = 'margin:0; font-size:24px; font-weight:500; letter-spacing:0.04em;' +
        `line-height:1.15; color:rgba(255,255,255,${GEOM.caps.full}); opacity:0;`;
      label.textContent = copy;
      list.appendChild(label);
      return label;
    });
    this.scenEl.appendChild(list);
    return list;
  }

  _kicker(copy) {
    const p = document.createElement('p');
    p.textContent = copy;
    p.style.cssText = 'position:absolute; margin:0; font-size:20px;' +
      'font-weight:500; letter-spacing:0.32em; text-indent:0.32em;' +
      'color:rgba(255,255,255,0.5); text-transform:uppercase; opacity:0;';
    gsap.set(p, { xPercent: -50 });
    this.scenEl.appendChild(p);
    return p;
  }

  _stmt(parent, color) {
    const p = document.createElement('p');
    p.style.cssText = 'position:absolute; margin:0; left:0; right:0; text-align:center;' +
      `font-size:46px; font-weight:540; letter-spacing:-0.012em; color:${color}; opacity:0;`;
    parent.appendChild(p);
    return p;
  }

  // ---- shared setters (used by applyState and by the choreography) ----

  setRect(el, [x, y, w, h]) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
  }

  setSeg(line, x1, x2, y, o, w = 1.5) {
    line.setAttribute('x1', x1); line.setAttribute('y1', y);
    line.setAttribute('x2', x2); line.setAttribute('y2', y);
    line.setAttribute('stroke', `rgba(255,255,255,${o})`);
    line.setAttribute('stroke-width', w);
    line.setAttribute('opacity', '1');
    line.removeAttribute('stroke-dasharray');
    line.removeAttribute('stroke-dashoffset');
  }

  // The sheet's dot() carries the voice in the FILL alpha (element opacity 1),
  // so a settled dot rasterizes identically to the cell. Gestures may tween
  // the opacity attribute for pops; every reconstruction renormalizes here.
  setDot(dot, x, y, r, o) {
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dot.setAttribute('r', r);
    dot.setAttribute('fill', `rgba(255,255,255,${o})`);
    dot.setAttribute('opacity', r > 0 && o > 0 ? '1' : '0');
    dot.removeAttribute('transform');
  }

  // The traveling pulse keeps its own warm-white material.
  setPulse(x, y, r, o) {
    this.pulse.setAttribute('cx', x); this.pulse.setAttribute('cy', y);
    this.pulse.setAttribute('r', r);
    this.pulse.setAttribute('fill', `rgba(254,244,232,${Math.max(o, 0)})`);
    this.pulse.setAttribute('opacity', o > 0 ? '1' : '0');
  }

  setRoads(conf) {
    if (!conf) {
      [this.roadL, this.roadR, this.roadDotL, this.roadDotR]
        .forEach((el) => el.setAttribute('opacity', '0'));
      this.roadL.removeAttribute('stroke-dasharray');
      this.roadR.removeAttribute('stroke-dasharray');
      this.roadL.removeAttribute('stroke-dashoffset');
      this.roadR.removeAttribute('stroke-dashoffset');
      return;
    }
    const road = (p, o) => {
      p.setAttribute('stroke', `rgba(255,255,255,${o})`);
      p.setAttribute('opacity', o > 0 ? '1' : '0');
      p.removeAttribute('stroke-dasharray');
      p.removeAttribute('stroke-dashoffset');
    };
    road(this.roadL, conf.left);
    road(this.roadR, conf.right);
    const [lx, ly, lr] = GEOM.roadLeftDot;
    const [rx, ry, rr] = GEOM.roadRightDot;
    this.setDot(this.roadDotL, lx, ly, lr, conf.leftDot);
    this.setDot(this.roadDotR, rx, ry, rr, conf.rightDot);
  }

  // Draw-on for a segment: dash the line to its own length and sweep the
  // offset, x1 end first. Configuring and dashing happen in one callback so no
  // frame ever shows the undrawn line; setSeg (any reconstruction) clears the
  // dashing.
  drawLine(tl, line, at, dur, ease = 'power2.out', conf = null) {
    tl.add(() => {
      if (conf) this.setSeg(line, conf[0], conf[1], conf[2], conf[3], conf[4] ?? 1.5);
      const len = Math.abs(Number(line.getAttribute('x2')) - Number(line.getAttribute('x1'))) || 1;
      line.setAttribute('stroke-dasharray', String(len));
      line.setAttribute('stroke-dashoffset', String(len));
      line.setAttribute('opacity', '1');
    }, at);
    tl.to(line, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease }, at + 0.02);
  }

  // Draw-on for one of the two roads (their true path length).
  drawRoad(tl, road, at, dur, ease = 'power2.inOut', opacity = 0.3) {
    tl.add(() => {
      road.setAttribute('stroke', `rgba(255,255,255,${opacity})`);
      const len = road.getTotalLength();
      road.setAttribute('stroke-dasharray', String(len));
      road.setAttribute('stroke-dashoffset', String(len));
      road.setAttribute('opacity', '1');
    }, at);
    tl.to(road, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease }, at + 0.02);
  }

  // A tweenable proxy over a fade line's full state.
  fadeProxy(fadeObj, from = null) {
    const s = from || fadeObj.state || { x1: 0, x2: 0, y: 0, o: 0, w: 1.5 };
    const p = { ...s };
    p.write = () => this.setFade(fadeObj, [p.x1, p.x2, p.y, p.o, p.w]);
    return p;
  }

  setFade(fadeObj, state) {
    if (!state) {
      fadeObj.line.setAttribute('opacity', '0');
      fadeObj.state = null;
      return;
    }
    const [x1, x2, y, o, w] = state;
    fadeObj.state = { x1, x2, y, o, w };
    fadeObj.line.setAttribute('x1', x1); fadeObj.line.setAttribute('y1', y);
    fadeObj.line.setAttribute('x2', x2); fadeObj.line.setAttribute('y2', y);
    fadeObj.line.setAttribute('stroke-width', w);
    fadeObj.line.setAttribute('opacity', '1');
    fadeObj.grad.setAttribute('x1', x1); fadeObj.grad.setAttribute('y1', y);
    fadeObj.grad.setAttribute('x2', x2); fadeObj.grad.setAttribute('y2', y);
    fadeObj.stop.setAttribute('stop-color', `rgba(255,255,255,${o})`);
  }

  setMark(cx, cy, size, opacity = 1) {
    this.markWrap.style.left = `${cx}px`;
    this.markWrap.style.top = `${cy}px`;
    this.markWrap.style.opacity = String(opacity);
    this.markWrap.style.filter = 'none';
    this.markDisc.style.setProperty('--disc-size', `${size}px`);
    gsap.set(this.markWrap, { xPercent: -50, yPercent: -50, scale: 1 });
  }

  // ---- the scene contract's state law ----

  applyState(sceneId, build) {
    this.killMotion();
    const st = this.states[sceneId][build];
    this.scene = sceneId;
    this.build = build;

    const df = (el, conf) => {
      gsap.set(el, { clearProps: 'x,y,scale,filter' });
      if (conf) { this.setRect(el, conf[0]); el.style.opacity = String(conf[1]); }
      else el.style.opacity = '0';
    };

    df(this.surgeon, st.surgeon);
    df(this.patient, st.patient);
    df(this.shoe, st.goods?.shoe);
    df(this.meal, st.goods?.meal);
    df(this.wine, st.goods?.wine);

    this.capsItems.forEach((el) => {
      el.style.color = `rgba(255,255,255,${st.caps || GEOM.caps.full})`;
      el.style.opacity = st.caps ? '1' : '0';
      gsap.set(el, { clearProps: 'y' });
    });

    if (st.service) {
      // `service: true` is the full-voice path; a number is a recede factor
      // (the b5 record keeps the delivered half on record at the recede —
      // s2-b5-b-p2).
      const s = GEOM.service;
      const f = st.service === true ? 1 : st.service;
      this.setSeg(this.service.line, s.x1, s.x2, s.y, s.o * f, s.w);
      this.setDot(this.service.d1, s.x1, s.y, s.dotR, s.dotO * f);
      this.setDot(this.service.d2, s.x2, s.y, s.dotR, s.dotO * f);
    } else {
      this.service.line.setAttribute('opacity', '0');
      this.service.d1.setAttribute('opacity', '0');
      this.service.d2.setAttribute('opacity', '0');
    }

    this.deliveryEls.forEach((el, i) => {
      if (st.delivery) {
        const [x, y, r, o] = GEOM.delivery[i];
        this.setDot(el, x, y, r, o);
      } else this.setDot(el, 0, 0, 0, 0);
    });

    if (st.fragDot) {
      const [[x, y, r, o], factor] = st.fragDot;
      this.setDot(this.fragDotEl, x, y, r, o * factor);
    } else this.setDot(this.fragDotEl, 0, 0, 0, 0);

    this.setRoads(st.roads || null);
    this.setFade(this.fade, st.fade || null);
    this.setFade(this.wakeA, st.wakeA || null);
    this.setFade(this.wakeB, st.wakeB || null);

    this.labelsEl.forEach((el, i) => {
      const v = st.labels ? st.labels[i] : 0;
      el.style.color = `rgba(255,255,255,${v || 1})`;
      el.style.opacity = v ? '1' : '0';
      gsap.set(el, { clearProps: 'y' });
      gsap.set(el, { yPercent: -50 });
    });

    const kick = (el, conf) => {
      if (conf) {
        el.style.left = `${conf[0]}px`;
        el.style.top = `${conf[1]}px`;
        el.style.opacity = String(conf[2]);
        gsap.set(el, { xPercent: -50 });
      } else el.style.opacity = '0';
    };
    kick(this.kickSpend, st.kickSpend);
    kick(this.kickSave, st.kickSave);

    if (st.mark) this.setMark(st.mark[0], st.mark[1], st.mark[2], 1);
    else this.markWrap.style.opacity = '0';

    const stmt = (el, conf) => {
      if (conf) {
        el.textContent = conf.text;
        el.style.top = `${conf.y}px`;
        el.style.opacity = '1';
        gsap.set(el, { clearProps: 'y' });
      } else el.style.opacity = '0';
    };
    stmt(this.stmtDim, st.stmtDim);
    stmt(this.stmt, st.stmt);

    // Motion-only elements never survive a reconstruction.
    this.pulse.setAttribute('opacity', '0');
    this.blob.style.opacity = '0';
    this.wash.style.opacity = '0';
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
    this.birthTl = null;
    this.tagged = {};
  }

  hasMotion() {
    return this.motion.size > 0;
  }

  tag(name, tl) {
    this.tagged[name] = tl;
  }

  birthProgress() {
    return this.birthTl && this.motion.has(this.birthTl) ? this.birthTl.progress() : null;
  }

  gestureProgress(name) {
    const tl = this.tagged[name];
    return tl && this.motion.has(tl) ? tl.progress() : null;
  }

  // Serialized settled state — the harness compares this between motion-on and
  // reduced-motion runs to prove end-state parity mechanically.
  serialize() {
    const rect = (el) => [el.style.left, el.style.top, el.style.width, el.style.height, el.style.opacity];
    const attr = (el, names) => names.map((n) => el.getAttribute(n));
    return {
      scene: this.scene,
      build: this.build,
      surgeon: rect(this.surgeon),
      patient: rect(this.patient),
      goods: [this.shoe, this.meal, this.wine].map(rect),
      caps: this.capsItems.map((el) => [el.style.color, el.style.opacity]),
      service: attr(this.service.line, ['x1', 'x2', 'opacity']),
      serviceDots: [this.service.d1, this.service.d2].map((d) => attr(d, ['cx', 'r', 'fill', 'opacity'])),
      delivery: this.deliveryEls.map((d) => attr(d, ['cx', 'cy', 'r', 'fill', 'opacity'])),
      fragDot: attr(this.fragDotEl, ['cx', 'cy', 'r', 'fill', 'opacity']),
      roads: [this.roadL, this.roadR].map((p) => attr(p, ['stroke', 'opacity'])),
      roadDots: [this.roadDotL, this.roadDotR].map((d) => attr(d, ['cx', 'r', 'fill', 'opacity'])),
      fades: [this.fade, this.wakeA, this.wakeB].map((f) => f.state),
      labels: this.labelsEl.map((el) => [el.style.color, el.style.opacity]),
      kickers: [this.kickSpend, this.kickSave].map((el) => [el.style.left, el.style.top, el.style.opacity]),
      mark: [this.markWrap.style.left, this.markWrap.style.top, this.markWrap.style.opacity,
             gsap.getProperty(this.markWrap, 'scale'),
             this.markDisc.style.getPropertyValue('--disc-size')],
      stmts: [this.stmtDim, this.stmt].map((el) => [el.textContent, el.style.top, el.style.opacity])
    };
  }

  destroy() {
    this.killMotion();
    gsap.killTweensOf(this.root.querySelectorAll('*'));
    gsap.killTweensOf(this.root);
    this.root.remove();
  }
}

// The stage rides the engine's container so a within-group handoff finds it
// alive; a cold mount builds it fresh. Deterministic init, tolerant re-entry.
export function ensureStage(container) {
  if (container.__act1Stage) return container.__act1Stage;
  container.innerHTML = '';
  // While Act I is on stage, release the deck canvas's layer hint so its text
  // rasterizes the way the approved cells did — see `components/rasterHint.js`
  // for the whole reason, including why it is refcounted.
  const canvas = claimRasterHint(container);
  const stage = new Act1Stage(container);
  stage._canvas = canvas;
  container.__act1Stage = stage;
  window.__act1 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize(),
    birthT: () => stage.birthProgress(),
    gestureT: (name) => stage.gestureProgress(name)
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__act1Stage;
  if (!stage) return;
  releaseRasterHint(stage._canvas);
  stage.destroy();
  delete container.__act1Stage;
  if (window.__act1) delete window.__act1;
}

export { COPY, CAPABILITIES };
