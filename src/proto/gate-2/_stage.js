// Prototype Gate 2 — the shared stage for Scenes 2–4 (docs/gate-2-brief.md).
//
// One continuous visual world: three scene modules share this one stage object,
// cached on the engine's container across within-group handoffs, so the morphs
// at 2→3 and 3→4 are real shared-DOM continuity and never a remount. Every
// element the three scenes touch is built once, here; the scenes drive it
// through two surfaces only:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any of the 17 builds, instantly. This is the
//                                 scene contract's `_applyBuild(n)`: direct
//                                 entry, backward movement, reduced motion and
//                                 interrupted animations all resolve here.
//   timeline()                  — a registered GSAP timeline for a forward
//                                 gesture. Every timeline ends by snapping to
//                                 applyState, so a settled frame is always
//                                 exactly the still it must match.
//
// THE GEOMETRY IS LAW, NOT DESIGN. Every rect, coordinate and opacity in GEOM
// is transcribed from review/frames-a/harness/frames-a.mjs — the code that
// rendered the approved stills (frames.json marks the set). Motion connects
// these states; it never edits them. States with no approved still are derived
// from the nearest approved frame's system and flagged in the r1 report.

import { gsap } from 'gsap';
import { DarkFieldImage } from '../../components/DarkField.js';
import { LuminousDisc } from '../../components/LuminousDisc.js';

const svgNS = 'http://www.w3.org/2000/svg';

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---------------------------------------------------------------- geometry law

export const GEOM = {
  // Dark-field boxes [x, y, w, h] — all three surgeon boxes share one aspect,
  // and both patient boxes share 4:5, so a box tween is a pure scale.
  surgeonS2: [150, 126, 620, 827],          // s2-f1-final
  patientS2: [1150, 152, 620, 775],         // s2-f1-final
  surgeonS3: [170, 194, 520, 693],          // s3-f1-final
  patientS3: [1230, 215, 520, 650],         // s3-f1-final
  surgeonS3b: [180, 247, 440, 587],         // s3-f2-a

  // Wanted goods as dim possibilities (s2-f2), the demo return (derived from
  // the s2-f2 box size), and the SPEND arrivals (s4-f1).
  goodsCol: { shoe: [850, 165, 300, 225], meal: [850, 428, 300, 225], wine: [850, 691, 300, 225] },
  shoeDemo: [610, 427, 300, 225],
  goodsRow: { shoe: [320, 390, 380, 285], meal: [770, 390, 380, 285], wine: [1220, 390, 380, 285] },

  // The restrained patient mark (s2-f2): centre, box size, landed opacity.
  glyph: { cx: 1610, cy: 540, size: 320, o: 0.4 },

  // The service path (s2-f1-final): the delivered half, dot terminals.
  service: { x1: 820, x2: 1100, y: 620, o: 0.35, w: 1.5, dotR: 3.5, dotO: 0.7 },

  // The capabilities list (s2-f1-final).
  caps: { x: 790, y: 255, w: 340, gap: 12 },

  // Return-path fragment sets [x1, x2, y, opacity] — right to left.
  fragsAttempt: [[1440, 1305, 620, 0.35], [1280, 1236, 620, 0.28]],                       // derived: the probe so far
  fragsFail: [[1440, 1305, 620, 0.35], [1280, 1236, 620, 0.28],
              [1214, 1190, 620, 0.2], [1172, 1163, 620, 0.13]],                            // s2-f2
  fragsBirth: [[1206, 1052, 540, 0.32], [1028, 988, 540, 0.24], [970, 952, 540, 0.16]],    // s3-f1-final
  fragDot: { x: 1444, y: 620, r: 3, o: 0.5 },                                              // s2-f2

  // The Claim Mark's three settled placements [cx, cy, size].
  markBirth: [880, 540, 132],               // s3-f1-final
  markHeld: [760, 540, 116],                // s3-f2-a
  markSave: [620, 460, 132],                // s4-f2-a
  MARK_BASE: 132,

  // The open-interval line [x1, x2, y, opacity, width] — fades to nothing at x2.
  fadeHeld: [842, 1560, 540, 0.22, 1.2],    // s3-f2-a (x1 = 760 + 116/2 + 24)
  fadeSave: [712, 1800, 460, 0.3, 1.5],     // s4-f2-a (x1 = 620 + 132/2 + 26)

  // The closed exchange (s4-f1): one unbroken line, both ends resolved.
  closed: { x1: 460, x2: 1460, y: 800, o: 0.35, w: 1.5, dotR: 3.5, dotO: 0.7 },

  // The interval labels (s3-f2-a): left edge, line centres.
  labels: { x: 1080, ys: [420, 540, 660] }
};

const CAPABILITIES = [
  'Specialized skill',
  'Scarce knowledge',
  'Years of training',
  'Professional judgment',
  'Dexterity',
  'Responsibility'
];

// On-screen copy — every line a verbatim phrase of the §2 scripts or an
// approved-frame element. Nothing here is invented wording.
const COPY = {
  binding: 'It binds both halves of the trade to the same two people.',
  separates: 'Money separates the two halves of an exchange.',
  unfinished: 'The exchange can remain unfinished.',
  spendCloses: 'Spending closes the exchange.',
  saveKeeps: 'Saving keeps it open.',
  intervals: ['SOMEONE ELSE', 'SOMEWHERE ELSE', 'LATER']
};

const FRAG_POOL = 16;

// --------------------------------------------------------------- settled states
//
// The 17 builds as complete declarative states. `null` = absent. Approval
// status is annotated per state; DERIVED states are listed in the r1 report.

const STATES = {
  'the-direct-exchange': [
    // beat 1 — the stage assembles. DERIVED: s2-f1-final minus the capabilities.
    { surgeon: GEOM.surgeonS2, patient: GEOM.patientS2, service: true },
    // beat 2 — capabilities landed, patient received. APPROVED: s2-f1-final.
    { surgeon: GEOM.surgeonS2, patient: GEOM.patientS2, service: true, caps: true },
    // beat 3 — wanted goods as possibilities, the return path attempting.
    // DERIVED from s2-f2's system: the probe is the first two fragments.
    { surgeon: GEOM.surgeonS2, glyph: GEOM.glyph.o, goodsCol: 0.45,
      frags: GEOM.fragsAttempt, fragDot: true },
    // beat 4 — the failure. APPROVED: s2-f2.
    { surgeon: GEOM.surgeonS2, glyph: GEOM.glyph.o, goodsCol: 0.45,
      frags: GEOM.fragsFail, fragDot: true },
    // beat 5 — the binding line at display scale. DERIVED: s2-f2 receded to the
    // brightness floor beneath the statement.
    { surgeon: GEOM.surgeonS2, glyph: GEOM.glyph.o, goodsCol: 0.45,
      frags: GEOM.fragsFail, fragDot: true, dim: 0.55,
      stmt: { y: 838, text: COPY.binding } }
  ],
  'the-breakthrough': [
    // beat 1 — the birth, mid-contraction. APPROVED: s3-f1-final.
    { surgeon: GEOM.surgeonS3, patient: GEOM.patientS3, frags: GEOM.fragsBirth,
      mark: GEOM.markBirth },
    // beat 2 — the contraction completes; the claim held between them.
    // DERIVED: s3-f1-final minus the streaming fragments.
    { surgeon: GEOM.surgeonS3, patient: GEOM.patientS3, mark: GEOM.markBirth },
    // beat 3 — the patient released. DERIVED: beat 2 minus the patient.
    { surgeon: GEOM.surgeonS3, mark: GEOM.markBirth },
    // beat 4 — the open interval. APPROVED: s3-f2-a.
    { surgeon: GEOM.surgeonS3b, mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1] },
    // beat 5 — the completion demonstration's end: shoes arrived, claim spent.
    // DERIVED from s4-f1's system (goods arrived, claim absent) at s3 scale.
    { surgeon: GEOM.surgeonS3b, shoeDemo: true, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1] },
    // beat 6 — the reset to the held claim. APPROVED: s3-f2-a again.
    { surgeon: GEOM.surgeonS3b, mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1] },
    // beat 7 — separation + unfinished, per the display rule. DERIVED: s3-f2-a
    // receded to the floor beneath the pair (the mark, the protagonist, holds).
    { surgeon: GEOM.surgeonS3b, mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      labels: [0.72, 0.72, 1], dim: 0.55,
      stmtDim: { y: 790, text: COPY.separates },
      stmt: { y: 872, text: COPY.unfinished } }
  ],
  'spend-or-save': [
    // beat 1 — the fork named over the held claim. DERIVED: s3-f2-a's held
    // claim and line, the two roads named in s4-f1's kicker register.
    { mark: GEOM.markHeld, fade: GEOM.fadeHeld,
      kickSpend: { cx: 660 }, kickSave: { cx: 1260 } },
    // beat 2 — SPEND resolved. APPROVED: s4-f1.
    { goodsRow: 1, closed: true, kickSpend: { cx: 960 } },
    // beat 3 — the reset: the fork's other road. DERIVED: the held claim
    // restored, SAVE alone in the kicker's approved centre position.
    { mark: GEOM.markHeld, fade: GEOM.fadeHeld, kickSave: { cx: 960 } },
    // beat 4 — SAVE: the interval stretches into black. DERIVED: s4-f2-a
    // minus the closing pair.
    { mark: GEOM.markSave, fade: GEOM.fadeSave },
    // beat 5 — the closing pair lands. APPROVED: s4-f2-a.
    { mark: GEOM.markSave, fade: GEOM.fadeSave,
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

class Gate2Stage {
  constructor(container) {
    this.container = container;
    this.motion = new Set();
    this.birthTl = null;
    this.scene = null;
    this.build = 0;
    this._build();
  }

  _build() {
    const root = document.createElement('div');
    root.className = 'gate2-stage';
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:transparent;';

    // Layer order: the scene (photos, lines, labels) < the mark < statements.
    // The scene layer is what recedes to the brightness floor when a display
    // statement lands; the Claim Mark never recedes with it — the protagonist
    // holds full voice in every approved settle (s4-f2-a).
    const scene = document.createElement('div');
    scene.className = 'gate2-scene';
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

    this.surgeon = this._df('surgeon', 'The surgeon, one hour of specialized surgery');
    this.patient = this._df('patient', 'The patient, the other half of the exchange');
    this.shoe = this._df('shoe', 'Shoes');
    this.meal = this._df('meal', 'A dinner');
    this.wine = this._df('wine', 'A bottle of wine');

    this.glyphEl = this._patientMark();
    this.capsEl = this._caps();

    // The service path: line + two dot terminals, drawn via dash offset.
    this.service = {
      line: this._line(), d1: this._dot(), d2: this._dot()
    };

    // The return path's fragment pool — every configuration of the failing /
    // contracting path is some subset of these lines.
    this.frags = Array.from({ length: FRAG_POOL }, () => this._line());
    this.fragConf = [];
    this.fragDotEl = this._dot();

    // The closed exchange (s4-f1).
    this.closed = { line: this._line(), d1: this._dot(), d2: this._dot() };

    // The open-interval line: a gradient stroke fading to nothing at its far
    // end. One gradient, userSpaceOnUse, retargeted per state.
    const defs = document.createElementNS(svgNS, 'defs');
    const gradId = 'gate2-fade';
    defs.innerHTML = `<linearGradient id="${gradId}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="rgba(255,255,255,0.22)" />
      <stop offset="1" stop-color="rgba(255,255,255,0)" /></linearGradient>`;
    svg.appendChild(defs);
    this.fadeGrad = defs.querySelector('linearGradient');
    this.fadeStop = this.fadeGrad.querySelector('stop');
    this.fadeLine = this._line();
    this.fadeLine.setAttribute('stroke', `url(#${gradId})`);
    this.fadeState = null;

    // A traveling pulse — goods and claims in transit ride the drawn lines.
    this.pulse = this._dot();
    this.pulse.setAttribute('fill', 'rgba(254,244,232,0.95)');

    this.labelsEl = COPY.intervals.map((copy, i) => {
      const p = document.createElement('p');
      p.textContent = copy;
      p.style.cssText = `position:absolute; margin:0; left:${GEOM.labels.x}px;` +
        `top:${GEOM.labels.ys[i]}px; font-size:46px; font-weight:560;` +
        'letter-spacing:0.12em; color:#fff; text-transform:uppercase; opacity:0;';
      gsap.set(p, { yPercent: -50 });
      scene.appendChild(p);
      return p;
    });

    this.kickSpend = this._kicker('SPEND');
    this.kickSave = this._kicker('SAVE');

    // The Claim Mark — candidate A through the film-wide component, at the
    // recorded Gate 1 selection. Positioned by centre; size differences are a
    // pure scale of the base disc, so the glow stays proportional.
    const markLayer = document.createElement('div');
    markLayer.style.cssText = 'position:absolute; inset:0; pointer-events:none;';
    root.appendChild(markLayer);
    this.markWrap = document.createElement('div');
    this.markWrap.style.cssText = 'position:absolute; opacity:0;';
    this.markWrap.appendChild(LuminousDisc({ size: GEOM.MARK_BASE }));
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
    // The proto drives opacity directly; the register's own 520ms reveal
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

  _dot() {
    const c = document.createElementNS(svgNS, 'circle');
    c.setAttribute('fill', 'rgba(255,255,255,0.7)');
    c.setAttribute('opacity', '0');
    this.svg.appendChild(c);
    return c;
  }

  // The restrained patient mark — a presence, not a portrait (s2-f2's
  // treatment): head ring and shoulder arc in the grammar's thin stroke.
  _patientMark() {
    const { cx, cy, size } = GEOM.glyph;
    const wrap = document.createElement('div');
    wrap.style.cssText = `position:absolute; left:${cx}px; top:${cy}px; opacity:0;` +
      'filter: drop-shadow(0 0 10px rgba(253, 233, 212, 0.22));';
    gsap.set(wrap, { xPercent: -50, yPercent: -50 });
    wrap.innerHTML = `
      <svg viewBox="-160 -160 320 320" width="${size}" height="${size}" aria-hidden="true"
           fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round">
        <circle cx="0" cy="-72" r="44" />
        <path d="M -118 118 A 126 126 0 0 1 118 118" />
      </svg>`;
    this.scenEl.appendChild(wrap);
    return wrap;
  }

  _caps() {
    const { x, y, w, gap } = GEOM.caps;
    const list = document.createElement('div');
    list.style.cssText = `position:absolute; left:${x}px; top:${y}px; width:${w}px;` +
      `display:grid; justify-items:center; gap:${gap}px; text-align:center;`;
    this.capsItems = CAPABILITIES.map((copy) => {
      const label = document.createElement('p');
      label.style.cssText = 'margin:0; font-size:24px; font-weight:500; letter-spacing:0.04em;' +
        'line-height:1.15; color:rgba(255,255,255,0.75); opacity:0;';
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
    p.style.cssText = 'position:absolute; margin:0; top:170px; font-size:20px;' +
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

  setDot(dot, x, y, r, o) {
    dot.setAttribute('cx', x); dot.setAttribute('cy', y);
    dot.setAttribute('r', r); dot.setAttribute('opacity', o);
    dot.removeAttribute('transform');
  }

  setFrags(configs) {
    this.fragConf = configs.map((c) => c.slice());
    this.frags.forEach((line, i) => {
      const c = configs[i];
      line.removeAttribute('transform');
      // An unused pool line is reset to one canonical shape, not merely
      // hidden: reconstruction must produce identical DOM regardless of what
      // any gesture left behind, or state parity is only skin-deep.
      if (c) this.setSeg(line, c[0], c[1], c[2], c[3]);
      else {
        this.setSeg(line, 0, 0, 0, 0.35);
        line.setAttribute('opacity', '0');
      }
    });
  }

  // Draw-on for a segment: dash the line to its own length and sweep the
  // offset, x1 end first. Configuring and dashing happen in one callback so no
  // frame ever shows the undrawn line; setSeg (any reconstruction) clears the
  // dashing.
  drawLine(tl, line, at, dur, ease = 'power2.out', conf = null) {
    tl.add(() => {
      if (conf) this.setSeg(line, conf[0], conf[1], conf[2], conf[3], conf[4]);
      const len = Math.abs(Number(line.getAttribute('x2')) - Number(line.getAttribute('x1'))) || 1;
      line.setAttribute('stroke-dasharray', String(len));
      line.setAttribute('stroke-dashoffset', String(len));
      line.setAttribute('opacity', '1');
    }, at);
    tl.to(line, { attr: { 'stroke-dashoffset': 0 }, duration: dur, ease }, at + 0.02);
  }

  // A tweenable proxy over the open-interval line's full state.
  fadeProxy(from = null) {
    const s = from || this.fadeState || { x1: 0, x2: 0, y: 0, o: 0, w: 1.5 };
    const p = { ...s };
    p.write = () => this.setFade([p.x1, p.x2, p.y, p.o, p.w]);
    return p;
  }

  setFade(state) {
    if (!state) {
      this.fadeLine.setAttribute('opacity', '0');
      this.fadeState = null;
      return;
    }
    const [x1, x2, y, o, w] = state;
    this.fadeState = { x1, x2, y, o, w };
    this.fadeLine.setAttribute('x1', x1); this.fadeLine.setAttribute('y1', y);
    this.fadeLine.setAttribute('x2', x2); this.fadeLine.setAttribute('y2', y);
    this.fadeLine.setAttribute('stroke-width', w);
    this.fadeLine.setAttribute('opacity', '1');
    this.fadeGrad.setAttribute('x1', x1); this.fadeGrad.setAttribute('y1', y);
    this.fadeGrad.setAttribute('x2', x2); this.fadeGrad.setAttribute('y2', y);
    this.fadeStop.setAttribute('stop-color', `rgba(255,255,255,${o})`);
  }

  setMark(cx, cy, size, opacity = 1) {
    this.markWrap.style.left = `${cx}px`;
    this.markWrap.style.top = `${cy}px`;
    this.markWrap.style.opacity = String(opacity);
    this.markWrap.style.filter = 'none';
    gsap.set(this.markWrap, { xPercent: -50, yPercent: -50, scale: size / GEOM.MARK_BASE });
  }

  // ---- the scene contract's state law ----

  applyState(sceneId, build) {
    this.killMotion();
    const st = STATES[sceneId][build];
    this.scene = sceneId;
    this.build = build;

    const df = (el, rect, o) => {
      gsap.set(el, { clearProps: 'x,y,scale' });
      if (rect) { this.setRect(el, rect); el.style.opacity = String(o); }
      else el.style.opacity = '0';
    };

    df(this.surgeon, st.surgeon, 1);
    df(this.patient, st.patient, 1);
    this.glyphEl.style.opacity = String(st.glyph || 0);
    gsap.set(this.glyphEl, { x: 0, y: 0, xPercent: -50, yPercent: -50 });

    // One element per good; whichever composition a state names positions it.
    const goods = st.goodsCol
      ? [[this.shoe, GEOM.goodsCol.shoe], [this.meal, GEOM.goodsCol.meal], [this.wine, GEOM.goodsCol.wine]]
      : st.goodsRow
        ? [[this.shoe, GEOM.goodsRow.shoe], [this.meal, GEOM.goodsRow.meal], [this.wine, GEOM.goodsRow.wine]]
        : st.shoeDemo
          ? [[this.shoe, GEOM.shoeDemo]]
          : [];
    const goodsO = st.goodsCol || st.goodsRow || (st.shoeDemo ? 1 : 0);
    [this.shoe, this.meal, this.wine].forEach((el) => { el.style.opacity = '0'; });
    goods.forEach(([el, rect]) => df(el, rect, goodsO));
    [this.shoe, this.meal, this.wine].forEach((el) => gsap.set(el, { clearProps: 'x,y' }));

    this.capsItems.forEach((el) => {
      el.style.opacity = st.caps ? '1' : '0';
      gsap.set(el, { clearProps: 'y' });
    });

    if (st.service) {
      const s = GEOM.service;
      this.setSeg(this.service.line, s.x1, s.x2, s.y, s.o, s.w);
      this.setDot(this.service.d1, s.x1, s.y, s.dotR, s.dotO);
      this.setDot(this.service.d2, s.x2, s.y, s.dotR, s.dotO);
    } else {
      this.service.line.setAttribute('opacity', '0');
      this.service.d1.setAttribute('opacity', '0');
      this.service.d2.setAttribute('opacity', '0');
    }

    this.setFrags(st.frags || []);
    if (st.fragDot) {
      const d = GEOM.fragDot;
      this.setDot(this.fragDotEl, d.x, d.y, d.r, d.o);
    } else this.setDot(this.fragDotEl, 0, 0, 0, 0);

    if (st.closed) {
      const c = GEOM.closed;
      this.setSeg(this.closed.line, c.x1, c.x2, c.y, c.o, c.w);
      this.setDot(this.closed.d1, c.x1, c.y, c.dotR, c.dotO);
      this.setDot(this.closed.d2, c.x2, c.y, c.dotR, c.dotO);
    } else {
      this.closed.line.setAttribute('opacity', '0');
      this.closed.d1.setAttribute('opacity', '0');
      this.closed.d2.setAttribute('opacity', '0');
    }

    this.setFade(st.fade || null);

    this.labelsEl.forEach((el, i) => {
      el.style.opacity = st.labels ? String(st.labels[i]) : '0';
    });

    const kick = (el, conf) => {
      if (conf) {
        el.style.left = `${conf.cx}px`;
        el.style.opacity = '1';
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

    // The recede-to-floor: exactly 55% of every landed value, the floor's own
    // number, applied to the scene layer only — the mark and the statements
    // live outside it and hold full voice.
    this.scenEl.style.opacity = String(st.dim || 1);

    // Motion-only elements never survive a reconstruction.
    this.pulse.setAttribute('opacity', '0');
    this.blob.style.opacity = '0';
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
  }

  hasMotion() {
    return this.motion.size > 0;
  }

  birthProgress() {
    return this.birthTl && this.motion.has(this.birthTl) ? this.birthTl.progress() : null;
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
      glyph: this.glyphEl.style.opacity,
      caps: this.capsItems.map((el) => el.style.opacity),
      goods: [this.shoe, this.meal, this.wine].map(rect),
      service: attr(this.service.line, ['x1', 'x2', 'opacity']),
      frags: this.frags.map((l) => attr(l, ['x1', 'x2', 'y1', 'stroke', 'opacity'])),
      fragDot: attr(this.fragDotEl, ['cx', 'cy', 'r', 'opacity']),
      fade: this.fadeState,
      closed: attr(this.closed.line, ['x1', 'x2', 'opacity']),
      labels: this.labelsEl.map((el) => el.style.opacity),
      kickers: [this.kickSpend, this.kickSave].map((el) => [el.style.left, el.style.opacity]),
      mark: [this.markWrap.style.left, this.markWrap.style.top,
             this.markWrap.style.opacity, gsap.getProperty(this.markWrap, 'scale')],
      stmts: [this.stmtDim, this.stmt].map((el) => [el.textContent, el.style.top, el.style.opacity]),
      dim: this.scenEl.style.opacity
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
  if (container.__gate2Stage) return container.__gate2Stage;
  container.innerHTML = '';
  const stage = new Gate2Stage(container);
  container.__gate2Stage = stage;
  window.__gate2 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize(),
    birthT: () => stage.birthProgress()
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__gate2Stage;
  if (!stage) return;
  stage.destroy();
  delete container.__gate2Stage;
  if (window.__gate2) delete window.__gate2;
}

export { STATES, COPY, CAPABILITIES };
