// Act I — the birth of the Claim Mark. The film's signature moment: the
// unresolved half of the exchange contracts into the claim.
//
// TRANSPLANTED FROM THE CLOSED GATE: `src/proto/gate-2/_birth.js`, specialized
// to the two rulings that closed it.
//
//   RULED 26 August 2026 — **pool is the birth.** Condense is the named banked
//   alternate and collapse stays on file; both remain runtime-selectable in the
//   prototype (`?proto=gate2&birth=1|2|3`), which is where the aesthetic law's
//   file-keeping clause keeps them. The deck ships the ruling, and only the
//   ruling: there is no birth selector in the film.
//
//   RULED 29 August 2026 — **the failure language is the absence.** No line
//   exists before the birth. The substrate is the terminal dot at the patient's
//   edge, carrying the gathered light; the pool gathers from that absence — the
//   dot strains, and each strain's light crosses the void to feed it.
//
// The treatment lands on the settled beat-1 frame exactly: its last act is the
// state law itself. Orange enters the film inside this gesture — the pre-birth
// substrate is warm white only, and the accent arrives with the disc itself
// (its rim gradient), never a frame earlier.

import { GEOM } from './_exchangeStage.js';

const BIRTH = { cx: 880, cy: 540 };
const SCENE = 'the-breakthrough';

// ---- the pre-birth substrate ------------------------------------------------

/** The substrate, applied instantly: build 0 minus the mark and the settled
 *  remnant, plus the unresolved half. Every entry into the birth starts here. */
export function applyPreBirth(stage) {
  stage.applyState(SCENE, 0);
  stage.markWrap.style.opacity = '0';
  stage.setDot(stage.fragDotEl, ...GEOM.pathAbsence.subDot);
  stage.scene = SCENE;
  stage.build = 0;
}

/** Fade the substrate in from black (the cold-entry assembly). */
export function fadeSubstrateIn(stage, tl, at) {
  tl.set(stage.fragDotEl, { attr: { opacity: 0 } }, 0);
  tl.to(stage.fragDotEl, { attr: { opacity: 1 }, duration: 0.5 }, at);
}

// ---- POOL — light pooling before the disc resolves (THE BIRTH) --------------

function pool(stage, tl) {
  const at = tl.duration();
  const A = GEOM.pathAbsence;

  // The pool: a formless warm glow accumulating at the birth point — light
  // first, no edge, no form, and no accent yet.
  tl.add(() => {
    stage.blob.style.left = `${BIRTH.cx}px`;
    stage.blob.style.top = `${BIRTH.cy}px`;
  }, at + 0.3);
  tl.fromTo(stage.blob, { opacity: 0, scale: 0.2 },
    { opacity: 0.85, scale: 1.02, duration: 1.9, ease: 'power1.inOut' }, at + 0.35);

  // The pool gathers from the absence: the dot strains three times, and each
  // strain's light crosses the void to feed it — the third deepest; the dot
  // subsides spent to its settled voice.
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

  // The condensation: the pool draws inward and the disc's form crystallizes
  // out of it — edge, gradient, accent, in that order of feeling.
  const resolveAt = at + 2.45;
  tl.to(stage.blob, { opacity: 0, scale: 0.6, duration: 0.55, ease: 'power2.in' }, resolveAt);
  tl.add(() => stage.setMark(BIRTH.cx, BIRTH.cy, GEOM.markBirth[2], 1), resolveAt);
  tl.fromTo(stage.markWrap,
    { opacity: 0, scale: 1.16, filter: 'blur(22px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.75, ease: 'power2.out',
      immediateRender: false, clearProps: 'filter' }, resolveAt + 0.1);

  // The absence needs nothing landed — the settled dot voice was reached by
  // the last subsiding. The closing snap normalizes all of it regardless.
  return resolveAt + 0.95;
}

/**
 * Append the birth to a timeline whose current end state is the pre-birth
 * substrate (figures in place, the unresolved half assembled). The timeline
 * finishes on the settled beat-1 frame exactly: its last act is the state law
 * itself.
 */
export function playBirth(stage, tl) {
  const end = pool(stage, tl);
  tl.add(() => stage.applyState(SCENE, 0), end);
  stage.birthTl = tl;
  stage.tag('birth', tl);
  return tl;
}
