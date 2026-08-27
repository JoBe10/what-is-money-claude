// Prototype Gate 2 — the birth of the Claim Mark (docs/gate-2-r2-brief.md §2).
// The film's signature moment: the unresolved half of the exchange contracts
// into the claim.
//
// RULED 26 August 2026: **pool is the birth** (default); condense is the named
// banked alternate; collapse stays on file. All three remain runtime-
// selectable (`?birth=1|2|3`, or keys 1/2/3 while Scene 3 is on stage) per the
// aesthetic law's file-keeping clause.
//
// RULED 27 August 2026: the settled birth frame is **s3-b1-c** — the carried
// composition with the remnant stream in language C, the thinning stroke,
// film-wide (D3-C). Every treatment lands on it exactly: its last act is the
// state law itself. The path the birth consumes arrives already speaking C —
// the substrate is the failing S2 path re-gathered, its stroke still thinning
// toward the point where the claim will form.
//
//   1 COLLAPSE   the path shatters and its fragments accelerate inward; the
//                disc snaps into being at the impact. Gravitational, sudden.
//   2 CONDENSE   the path never breaks: it flows along its own length into
//                the point, and the disc inflates in proportion to what it
//                swallows. Continuous, inevitable.
//   3 POOL       the path's light drains out as droplets that pool into a
//                formless glow; the form resolves out of the light afterward.
//                Liquid, quiet.
//
// Orange enters the film inside this gesture: the pre-birth substrate — path,
// shards, droplets, pool — is warm white only, and the accent arrives with the
// disc itself (its rim gradient), never a frame earlier.

import { gsap } from 'gsap';
import { GEOM } from './_stage.js';

// The pre-birth substrate: the unresolved half hanging between the patient's
// edge (x = 1206, where s3-b1-c's stream begins) and the birth point — in
// language C, so the stroke is already dying toward the left. The S2→S3 morph
// re-gathers the failure's thinning spans into this; a cold entry assembles it
// directly. Motion-only: no settled state shows it.
export const GATHER = [
  [1206, 1108, 540, 0.34, 2.0],
  [1096, 1006, 540, 0.3, 1.6],
  [980, 940, 540, 0.26, 1.1]
];

export const BIRTH_KEYS = ['1', '2', '3'];
export const BIRTH_NAMES = { 1: 'collapse', 2: 'condense', 3: 'pool' };

const BIRTH = { cx: 880, cy: 540 };
const SCENE = 'the-breakthrough';

// The residual stream of the approved cell (s3-b1-c's language-C remnant)
// fades in as a treatment finishes, so the closing snap to applyState changes
// nothing visible.
function landResiduals(stage, tl, at) {
  GEOM.remnantC.forEach((conf, i) => {
    const line = stage.frags[i];
    tl.add(() => {
      stage.setSeg(line, conf[0], conf[1], conf[2], conf[3], conf[4]);
      line.setAttribute('opacity', '0');
    }, at);
    tl.to(line, { attr: { opacity: 1 }, duration: 0.4, ease: 'power1.out' }, at + 0.05 * i);
  });
}

// ---- 1 · COLLAPSE — fragments collapsing inward ----------------------------

function collapse(stage, tl) {
  const at = tl.duration();
  const shards = [];
  // The gathered path shatters: eleven shards scattered off-axis where the
  // path hung, flashing in as the source lines vanish. Pool lines 4–14 (the
  // residual stream lands on 0–3 afterward).
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
    stage.frags.slice(0, 3).forEach((l) => l.setAttribute('opacity', '0'));
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

  landResiduals(stage, tl, impact + 0.15);
  return impact + 0.7;
}

// ---- 2 · CONDENSE — the path condensing along its own length ---------------

function condense(stage, tl) {
  const at = tl.duration();
  const drain = BIRTH.cx + 66 + 2;   // the disc's rim: the mouth of the drain

  // The fragments fuse into one continuous line — the unresolved half whole
  // for the first time, just before it becomes something else.
  const whole = { x1: 1206, x2: drain, o: 0.3 };
  whole.write = () => stage.setSeg(stage.frags[4], whole.x1, whole.x2, 540, whole.o);
  tl.add(() => {
    whole.write();
    stage.frags[4].setAttribute('opacity', '0');
  }, at);
  tl.to(stage.frags[4], { attr: { opacity: 1 }, duration: 0.35, ease: 'power1.inOut' }, at + 0.02);
  tl.to(stage.frags.slice(0, 3), // the gathered pieces yield to the whole
    { attr: { opacity: 0 }, duration: 0.3, ease: 'power1.in' }, at + 0.05);

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
  landResiduals(stage, tl, done - 0.15);
  return done + 0.5;
}

// ---- 3 · POOL — light pooling before the disc resolves (THE BIRTH) ---------

function pool(stage, tl) {
  const at = tl.duration();
  const gathered = stage.frags.slice(0, 3);

  // The path's light drains out of it — the thinning line dims toward a husk
  // as its droplets leave: the C language carried to its end.
  tl.to(gathered, { attr: { opacity: 0.35 }, duration: 1.6, ease: 'power1.inOut' }, at);

  // Droplets: short bright dashes sliding down the line into the point,
  // each one a measure of the path's light changing address.
  const starts = [1188, 1102, 1246, 1018, 1150, 962];
  starts.forEach((x0, i) => {
    const line = stage.frags[4 + i];
    const p = { cx: x0, y: 540, len: 12, op: 0 };
    p.write = () => stage.setSeg(line, p.cx + p.len / 2, p.cx - p.len / 2, p.y, p.op);
    const t0 = at + 0.25 + i * 0.24;
    tl.add(() => p.write(), t0);
    tl.to(p, { op: 0.8, duration: 0.18, onUpdate: p.write }, t0);
    tl.to(p, {
      cx: BIRTH.cx + 14, len: 7, duration: 0.72, ease: 'power1.in', onUpdate: p.write
    }, t0 + 0.08);
    tl.to(p, { op: 0, duration: 0.1, onUpdate: p.write }, t0 + 0.72);
  });

  // The pool: a formless warm glow accumulating where the droplets land —
  // light first, no edge, no form, and no accent yet.
  tl.add(() => {
    stage.blob.style.left = `${BIRTH.cx}px`;
    stage.blob.style.top = `${BIRTH.cy}px`;
  }, at + 0.3);
  tl.fromTo(stage.blob, { opacity: 0, scale: 0.2 },
    { opacity: 0.85, scale: 1.02, duration: 1.9, ease: 'power1.inOut' }, at + 0.35);

  // The condensation: the pool draws inward and the disc's form crystallizes
  // out of it — edge, gradient, accent, in that order of feeling.
  const resolveAt = at + 2.45;
  tl.to(stage.blob, { opacity: 0, scale: 0.6, duration: 0.55, ease: 'power2.in' }, resolveAt);
  tl.add(() => stage.setMark(BIRTH.cx, BIRTH.cy, GEOM.markBirth[2], 1), resolveAt);
  tl.fromTo(stage.markWrap,
    { opacity: 0, scale: 1.16, filter: 'blur(22px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out',
      immediateRender: false, clearProps: 'filter' }, resolveAt + 0.1);

  tl.to(gathered, { attr: { opacity: 0 }, duration: 0.25 }, resolveAt);
  landResiduals(stage, tl, resolveAt + 0.3);
  return resolveAt + 0.95;
}

const TREATMENTS = { 1: collapse, 2: condense, 3: pool };

/**
 * Append the selected birth treatment to a timeline whose current end state is
 * the pre-birth substrate (figures in place, GATHER on the fragment pool). The
 * timeline finishes on the approved cell exactly: its last act is the state
 * law itself.
 */
export function playBirth(stage, treatment, tl) {
  const play = TREATMENTS[treatment] || TREATMENTS[3];
  const end = play(stage, tl);
  tl.add(() => stage.applyState(SCENE, 0), end);
  stage.birthTl = tl;
  stage.tag('birth', tl);
  return tl;
}

/** The substrate, applied instantly: build 0 minus the mark and the remnant,
 *  plus the gathered unresolved half. Every entry into the birth starts here. */
export function applyPreBirth(stage) {
  stage.applyState(SCENE, 0);
  stage.markWrap.style.opacity = '0';
  stage.setFrags(GATHER);
  stage.scene = SCENE;
  stage.build = 0;
}
