// Prototype Gate 2 — the birth of the Claim Mark (docs/gate-2-r2-brief.md §2,
// r3 per docs/gate-2-r3-brief.md §2). The film's signature moment: the
// unresolved half of the exchange contracts into the claim.
//
// RULED 26 August 2026: **pool is the birth** (default); condense is the named
// banked alternate; collapse stays on file. All three remain runtime-
// selectable (`?birth=1|2|3`, or keys 1/2/3 while Scene 3 is on stage) per the
// aesthetic law's file-keeping clause.
//
// RULED 28 August 2026 (r3): the D3-C remnant is rejected in motion and the
// birth's substrate follows the selected failure-language candidate
// (`?path=1|2|3`):
//
//   path=1 REACH     the substrate is the reach's record — one clean,
//                    full-weight short stroke risen to the birth's height.
//                    The pool drinks it from its near end: droplets cross
//                    into the pool as the stroke shortens, never thinning.
//   path=2 ABSENCE   no line exists. The substrate is the terminal dot at
//                    the patient's edge, carrying the gathered light; the
//                    pool gathers from this absence — the dot strains, and
//                    each strain's light crosses to feed it.
//   path=3 FLOW      the substrate is the stream's residue — a dim warm
//                    drift. The pool drinks the residue; what remains
//                    settles back near the patient's edge.
//
// Every treatment still lands on the settled beat-1 frame exactly: its last
// act is the state law itself. Orange enters the film inside this gesture:
// the pre-birth substrate is warm white only, and the accent arrives with the
// disc itself (its rim gradient), never a frame earlier.

import { GEOM } from './_stage.js';

export const BIRTH_KEYS = ['1', '2', '3'];
export const BIRTH_NAMES = { 1: 'collapse', 2: 'condense', 3: 'pool' };

const BIRTH = { cx: 880, cy: 540 };
const SCENE = 'the-breakthrough';

// ---- the pre-birth substrate, per path -------------------------------------

/** The substrate, applied instantly: build 0 minus the mark and the settled
 *  remnant, plus the selected candidate's unresolved half. Every entry into
 *  the birth starts here. */
export function applyPreBirth(stage) {
  stage.applyState(SCENE, 0);
  stage.markWrap.style.opacity = '0';
  const R = GEOM.pathReach;
  const A = GEOM.pathAbsence;
  const F = GEOM.pathFlow;
  if (stage.path === 1) {
    stage.setFrags([R.sub]);
    stage.setDot(stage.fragDotEl, ...R.remOrigin);
    stage.setDot(stage.reachDot, ...R.subEnd);
    stage.setDrift(null);
  } else if (stage.path === 2) {
    stage.setFrags([]);
    stage.setDot(stage.fragDotEl, ...A.subDot);
    stage.setDot(stage.reachDot, 0, 0, 0, 0);
    stage.setDrift(null);
  } else {
    stage.setFrags([]);
    stage.setDot(stage.fragDotEl, 0, 0, 0, 0);
    stage.setDot(stage.reachDot, 0, 0, 0, 0);
    stage.setDrift(F.sub);
  }
  stage.scene = SCENE;
  stage.build = 0;
}

/** Fade the substrate in from black (the cold-entry assembly). */
export function fadeSubstrateIn(stage, tl, at) {
  if (stage.path === 1) {
    [stage.frags[0], stage.fragDotEl, stage.reachDot].forEach((el, i) => {
      tl.set(el, { attr: { opacity: 0 } }, 0);
      tl.to(el, { attr: { opacity: 1 }, duration: 0.5 }, at + 0.1 * i);
    });
  } else if (stage.path === 2) {
    tl.set(stage.fragDotEl, { attr: { opacity: 0 } }, 0);
    tl.to(stage.fragDotEl, { attr: { opacity: 1 }, duration: 0.5 }, at);
  } else {
    tl.set(stage.drift, { opacity: 0 }, 0);
    tl.to(stage.drift, { opacity: GEOM.pathFlow.sub[4], duration: 0.6 }, at);
  }
}

// The banked alternates open by clearing whatever substrate the selected
// path assembled; their own seed geometry then carries the gesture.
function clearSubstrate(stage) {
  stage.setFrags([]);
  stage.setDot(stage.fragDotEl, 0, 0, 0, 0);
  stage.setDot(stage.reachDot, 0, 0, 0, 0);
  stage.setDrift(null);
}

// The settled remnant of the beat-1 frame fades in as a treatment finishes,
// so the closing snap to applyState changes nothing visible. Path-aware: the
// remnant is the selected candidate's.
function landRemnant(stage, tl, at) {
  if (stage.path === 1) {
    const R = GEOM.pathReach;
    tl.add(() => {
      stage.setSeg(stage.frags[0], R.rem[0], R.rem[1], R.rem[2], R.rem[3], R.rem[4]);
      stage.frags[0].setAttribute('opacity', '0');
      stage.setDot(stage.fragDotEl, ...R.remOrigin);
      stage.fragDotEl.setAttribute('opacity', '0');
      stage.setDot(stage.reachDot, ...R.remEnd);
      stage.reachDot.setAttribute('opacity', '0');
    }, at);
    tl.to([stage.frags[0], stage.fragDotEl, stage.reachDot],
      { attr: { opacity: 1 }, duration: 0.4, ease: 'power1.out' }, at + 0.05);
  } else if (stage.path === 2) {
    const A = GEOM.pathAbsence;
    tl.add(() => {
      stage.setDot(stage.fragDotEl, ...A.remDot);
      stage.fragDotEl.setAttribute('opacity', '0');
    }, at);
    tl.to(stage.fragDotEl, { attr: { opacity: 1 }, duration: 0.4, ease: 'power1.out' }, at + 0.05);
  } else {
    const F = GEOM.pathFlow;
    tl.add(() => stage.setDrift([F.rem[0], F.rem[1], F.rem[2], F.rem[3], 0]), at);
    tl.to(stage.drift, { opacity: F.rem[4], duration: 0.4, ease: 'power1.out' }, at + 0.05);
  }
}

// ---- 1 · COLLAPSE — fragments collapsing inward ----------------------------

function collapse(stage, tl) {
  const at = tl.duration();
  const shards = [];
  // The unresolved half shatters: eleven shards scattered off-axis where it
  // hung, flashing in as the substrate vanishes. Pool lines 4–14 (the
  // settled remnant lands afterward).
  const seed = [
    [1180, 518, 34, 0.36], [1252, 552, 26, 0.3], [1118, 562, 40, 0.34],
    [1044, 522, 30, 0.3], [1330, 534, 22, 0.26], [986, 556, 26, 0.28],
    [1210, 584, 18, 0.24], [1076, 500, 22, 0.3], [1286, 508, 18, 0.24],
    [1150, 540, 44, 0.38], [1010, 528, 16, 0.22]
  ];
  seed.forEach(([cx, y, len, op], i) => {
    const line = stage.frags[4 + i];
    const p = { cx, y, len, op };
    p.write = () => stage.setSeg(line, p.cx + p.len / 2, p.cx - p.len / 2, p.y, p.op);
    shards.push(p);
  });

  tl.add(() => {
    clearSubstrate(stage);
    shards.forEach((p) => p.write());
  }, at);

  // A breath of stillness, then the gather: every shard accelerates into the
  // birth point, arriving inside a tight window.
  const gatherAt = at + 0.3;
  shards.forEach((p, i) => {
    tl.to(p, {
      cx: BIRTH.cx + 8, y: BIRTH.cy, len: 5, op: 0.55,
      duration: 0.62, ease: 'power3.in', onUpdate: p.write
    }, gatherAt + 0.045 * i);
    // Absorbed on arrival — an instant vanish into the core, not a fade.
    tl.set(stage.frags[4 + i], { attr: { opacity: 0 } }, gatherAt + 0.045 * i + 0.63);
  });

  // The luminous core grows with the arrivals; the disc snaps into being at
  // the last impact, overshooting a breath before it settles.
  tl.add(() => {
    stage.blob.style.left = `${BIRTH.cx}px`;
    stage.blob.style.top = `${BIRTH.cy}px`;
  }, gatherAt);
  tl.fromTo(stage.blob, { opacity: 0, scale: 0.15 },
    { opacity: 0.75, scale: 0.5, duration: 0.95, ease: 'power2.in' }, gatherAt + 0.15);

  const impact = gatherAt + 1.12;
  tl.add(() => stage.setMark(BIRTH.cx, BIRTH.cy, GEOM.markBirth[2], 1), impact);
  tl.fromTo(stage.markWrap, { opacity: 0, scale: 0.6 },
    { opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2.4)', immediateRender: false }, impact);
  tl.to(stage.blob, { opacity: 0, scale: 1.05, duration: 0.4, ease: 'power2.out' }, impact);

  landRemnant(stage, tl, impact + 0.15);
  return impact + 0.7;
}

// ---- 2 · CONDENSE — the path condensing along its own length ---------------

function condense(stage, tl) {
  const at = tl.duration();
  const drain = BIRTH.cx + 66 + 2;   // the disc's rim: the mouth of the drain

  // The unresolved half fuses into one continuous line — whole for the first
  // time, just before it becomes something else.
  const whole = { x1: 1206, x2: drain, o: 0.3 };
  whole.write = () => stage.setSeg(stage.frags[4], whole.x1, whole.x2, 540, whole.o);
  tl.add(() => {
    whole.write();
    stage.frags[4].setAttribute('opacity', '0');
  }, at);
  tl.to(stage.frags[4], { attr: { opacity: 1 }, duration: 0.35, ease: 'power1.inOut' }, at + 0.02);
  tl.add(() => clearSubstrate(stage), at + 0.3);

  // The drain: the far end sweeps in along the line's own length, the stroke
  // brightening as its mass concentrates. Nothing breaks; it becomes.
  const drainAt = at + 0.5;
  const DRAIN_DUR = 1.7;
  tl.to(whole, {
    x1: drain + 6, o: 0.52, duration: DRAIN_DUR, ease: 'power2.inOut',
    onUpdate: whole.write
  }, drainAt);

  // A bead of light rides at the mouth while the line pours in.
  tl.add(() => stage.setDot(stage.pulse, drain, BIRTH.cy, 3.2, 0), drainAt);
  tl.to(stage.pulse, { attr: { opacity: 0.85 }, duration: 0.3 }, drainAt);
  tl.to(stage.pulse, { attr: { opacity: 0 }, duration: 0.3 }, drainAt + DRAIN_DUR - 0.25);

  // The disc inflates continuously, in proportion to what it swallows.
  tl.add(() => stage.setMark(BIRTH.cx, BIRTH.cy, GEOM.markBirth[2], 1), drainAt);
  tl.fromTo(stage.markWrap, { opacity: 0.12, scale: 0.12 },
    { opacity: 1, scale: 1, duration: DRAIN_DUR, ease: 'power2.inOut', immediateRender: false },
    drainAt);

  const done = drainAt + DRAIN_DUR;
  tl.to(stage.frags[4], { attr: { opacity: 0 }, duration: 0.3 }, done + 0.02);
  landRemnant(stage, tl, done - 0.15);
  return done + 0.5;
}

// ---- 3 · POOL — light pooling before the disc resolves (THE BIRTH) ---------

function pool(stage, tl) {
  const at = tl.duration();
  const R = GEOM.pathReach;
  const A = GEOM.pathAbsence;
  const F = GEOM.pathFlow;

  // The pool: a formless warm glow accumulating at the birth point — light
  // first, no edge, no form, and no accent yet.
  tl.add(() => {
    stage.blob.style.left = `${BIRTH.cx}px`;
    stage.blob.style.top = `${BIRTH.cy}px`;
  }, at + 0.3);
  tl.fromTo(stage.blob, { opacity: 0, scale: 0.2 },
    { opacity: 0.85, scale: 1.02, duration: 1.9, ease: 'power1.inOut' }, at + 0.35);

  if (stage.path === 1) {
    // The reach's record is drunk from its near end: droplets leave the
    // shortening stroke and cross into the pool. The stroke stays clean and
    // full-weight to the last — absence grows; the line never degrades.
    const line = { x2: R.sub[1] };
    const wl = () => stage.setSeg(stage.frags[0], R.sub[0], line.x2, R.sub[2], R.sub[3], R.sub[4]);
    tl.to(line, { x2: R.rem[1], duration: 2.0, ease: 'power1.inOut', onUpdate: wl }, at + 0.35);
    const de = { x: R.subEnd[0] };
    const wde = () => stage.setDot(stage.reachDot, de.x, R.subEnd[1], R.subEnd[2], R.subEnd[3]);
    tl.to(de, { x: R.rem[1], duration: 2.0, ease: 'power1.inOut', onUpdate: wde }, at + 0.35);
    [1020, 1040, 1060, 1080, 1100, 1120].forEach((x0, i) => {
      const dl = stage.frags[4 + i];
      const p = { cx: x0, len: 11, op: 0 };
      p.write = () => stage.setSeg(dl, p.cx + p.len / 2, p.cx - p.len / 2, 540, p.op);
      const t0 = at + 0.4 + i * 0.26;
      tl.add(() => p.write(), t0);
      tl.to(p, { op: 0.75, duration: 0.16, onUpdate: p.write }, t0);
      tl.to(p, { cx: BIRTH.cx + 14, len: 6, duration: 0.66, ease: 'power1.in', onUpdate: p.write }, t0 + 0.06);
      tl.to(p, { op: 0, duration: 0.1, onUpdate: p.write }, t0 + 0.66);
    });
  } else if (stage.path === 2) {
    // The pool gathers from the absence: the dot strains three times, and
    // each strain's light crosses the void to feed it — the third deepest;
    // the dot subsides spent to its settled voice.
    const d = { o: A.subDot[3] };
    const wd = () => stage.setDot(stage.fragDotEl, A.subDot[0], A.subDot[1], A.subDot[2], d.o);
    [[at + 0.35, 0.5], [at + 1.15, 0.65], [at + 1.9, 0.85]].forEach(([t0, power], k) => {
      const g = { x: A.subDot[0] - 6, r: 2.6, o: 0 };
      const wg = () => stage.setPulse(g.x, BIRTH.cy, g.r, g.o);
      tl.add(wg, t0);
      tl.to(g, { o: power, duration: 0.22, onUpdate: wg }, t0);
      tl.to(g, { x: BIRTH.cx + 14, r: 1.4, duration: 0.6, ease: 'power1.in', onUpdate: wg }, t0 + 0.1);
      tl.to(g, { o: 0, duration: 0.12, onUpdate: wg }, t0 + 0.6);
      tl.to(d, { o: Math.min(1, 0.85 + 0.05 * k), duration: 0.2, ease: 'power2.out', onUpdate: wd }, t0);
      tl.to(d, { o: A.subDot[3] - 0.1 * (k + 1), duration: 0.5, ease: 'power1.inOut', onUpdate: wd }, t0 + 0.25);
    });
  } else {
    // The stream's residue is drunk: the drift leans into the pool, its
    // light passes, and what remains settles back near the patient's edge.
    const dr = { cx: F.sub[0], w: F.sub[2], h: F.sub[3], o: F.sub[4] };
    const wdr = () => stage.setDrift([dr.cx, F.sub[1], dr.w, dr.h, dr.o]);
    tl.to(dr, { cx: 990, w: 360, o: 0.55, duration: 1.0, ease: 'power1.inOut', onUpdate: wdr }, at + 0.35);
    tl.to(dr, { cx: F.rem[0], w: F.rem[2], h: F.rem[3], o: F.rem[4], duration: 1.05, ease: 'power1.inOut', onUpdate: wdr }, at + 1.4);
    [1000, 1040, 1080].forEach((x0, i) => {
      const dl = stage.frags[4 + i];
      const p = { cx: x0, len: 10, op: 0 };
      p.write = () => stage.setSeg(dl, p.cx + p.len / 2, p.cx - p.len / 2, 540, p.op);
      const t0 = at + 0.55 + i * 0.42;
      tl.add(() => p.write(), t0);
      tl.to(p, { op: 0.6, duration: 0.16, onUpdate: p.write }, t0);
      tl.to(p, { cx: BIRTH.cx + 14, len: 5, duration: 0.6, ease: 'power1.in', onUpdate: p.write }, t0 + 0.06);
      tl.to(p, { op: 0, duration: 0.1, onUpdate: p.write }, t0 + 0.6);
    });
  }

  // The condensation: the pool draws inward and the disc's form crystallizes
  // out of it — edge, gradient, accent, in that order of feeling.
  const resolveAt = at + 2.45;
  tl.to(stage.blob, { opacity: 0, scale: 0.6, duration: 0.55, ease: 'power2.in' }, resolveAt);
  tl.add(() => stage.setMark(BIRTH.cx, BIRTH.cy, GEOM.markBirth[2], 1), resolveAt);
  tl.fromTo(stage.markWrap,
    { opacity: 0, scale: 1.16, filter: 'blur(22px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out',
      immediateRender: false, clearProps: 'filter' }, resolveAt + 0.1);

  // Paths 1 and 3 end their choreography on the settled remnant already; the
  // absence needs nothing landed — its settled dot voice was reached by the
  // last subsiding. The closing snap normalizes all of it regardless.
  return resolveAt + 0.95;
}

const TREATMENTS = { 1: collapse, 2: condense, 3: pool };

/**
 * Append the selected birth treatment to a timeline whose current end state is
 * the pre-birth substrate (figures in place, the selected path's unresolved
 * half assembled). The timeline finishes on the settled beat-1 frame exactly:
 * its last act is the state law itself.
 */
export function playBirth(stage, treatment, tl) {
  const play = TREATMENTS[treatment] || TREATMENTS[3];
  const end = play(stage, tl);
  tl.add(() => stage.applyState(SCENE, 0), end);
  stage.birthTl = tl;
  stage.tag('birth', tl);
  return tl;
}
