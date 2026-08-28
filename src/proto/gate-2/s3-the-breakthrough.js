// Prototype Gate 2 r2/r3 — Scene 3, The Breakthrough (9 beats). The heart of
// the film.
//
// Scene 2 morphs into this scene — same stage, no cut: the binding line
// yields, the figures re-gather, the receded record rises into the selected
// failure candidate's substrate (r3: `?path=1|2|3`), and the birth consumes
// it. The birth is the film's first orange and it is **pool** (presenter-
// ruled 26 August 2026, R3); condense is the named banked alternate and all
// three treatments stay runtime-selectable (`?birth=1|2|3`, or keys 1/2/3
// while this scene is on stage). The claim's micro-motions — the pulse as
// the contraction completes, the breath at the release — are KEPT (R5,
// closed 28 August 2026).
//
// The interval's three names are each their own advance (R1: S3 is 9 beats);
// the completion demonstration is D5-B — two phases in one frame: the claim
// departs and the shoes arrive as distinct overlapping events, and at no
// point may the claim read as becoming the shoe. Beat 9 completes a full
// recorded handoff to clean black before the separation lines land (D4-A).
//
// Landed states — approved cells, by construction (states.json rulings):
// s3-b2 · s3-b3 · s3-b4-a · s3-b5-a · s3-b6-a · s3-b7-b · s3-b8-a · s3-b9-a.
// Beat 1's remnant is presenter-reopened (rulingsR3): the carried birth
// composition stands, and the remnant renders the selected r3 candidate.

import { GEOM, reducedMotion } from './_stage.js';
import { makeSceneModule } from './_scene.js';
import { playBirth, applyPreBirth, fadeSubstrateIn, BIRTH_KEYS, BIRTH_NAMES } from './_birth.js';

const ID = 'the-breakthrough';
const HELD_SCALE = GEOM.markHeld[2] / GEOM.MARK_BASE;

function readBirthParam() {
  const q = (new URLSearchParams(window.location.search).get('birth') || '').toLowerCase();
  if (['1', '2', '3'].includes(q)) return Number(q);
  const byName = Object.entries(BIRTH_NAMES).find(([, name]) => name === q);
  return byName ? Number(byName[0]) : null;
}

// The morph from Scene 2: the statement has said what it came to say; the
// frame returns to full voice for the birth; the figures re-gather at the
// birth's composition; the receded record rises into the corridor and
// becomes the selected candidate's substrate — the unresolved half, gathered
// for what happens to it next — and the birth consumes it.
function morphIn(mod, stage) {
  stage.applyState('the-direct-exchange', 4);   // the deterministic launch point
  const tl = stage.timeline();

  tl.to(stage.stmt, { opacity: 0, duration: 0.4 }, 0);
  tl.to([stage.shoe, stage.meal, stage.wine], { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.1);

  // Re-gather: both figures come back to full presence at the birth frame —
  // the claim is about to detach *from* this pair, so the frame belongs to
  // them again.
  tl.to(stage.surgeon, {
    left: `${GEOM.surgeonS3[0]}px`, top: `${GEOM.surgeonS3[1]}px`,
    width: `${GEOM.surgeonS3[2]}px`, height: `${GEOM.surgeonS3[3]}px`,
    opacity: 1, duration: 1.05, ease: 'power2.inOut'
  }, 0.45);
  tl.to(stage.patient, {
    left: `${GEOM.patientS3[0]}px`, top: `${GEOM.patientS3[1]}px`,
    width: `${GEOM.patientS3[2]}px`, height: `${GEOM.patientS3[3]}px`,
    opacity: 1, duration: 1.05, ease: 'power2.inOut'
  }, 0.45);

  liftSubstrate(stage, tl);
  playBirth(stage, mod._birth, tl);
}

// The b5 record rises into the corridor as the selected candidate's
// substrate. The record itself still speaks the approved D3-C (s2-b5-b is
// not reopened); what it BECOMES is the candidate's — and from here on no
// degraded stroke survives into any settled frame.
function liftSubstrate(stage, tl) {
  const R = GEOM.pathReach;
  const A = GEOM.pathAbsence;
  const F = GEOM.pathFlow;
  if (stage.path === 1) {
    // The spans fuse into the reach's record — one clean, full-weight short
    // stroke at the birth's height; the terminal dot comes home to the
    // patient's edge, and the stroke's honest end takes its dot.
    GEOM.thinSpans.forEach((from, i) => {
      const line = stage.frags[i];
      if (i > 0) {
        tl.to(line, { attr: { opacity: 0 }, duration: 0.6 }, 0.7);
        return;
      }
      const p = { x1: from[0], x2: from[1], y: from[2], o: from[3] * GEOM.b5.fail, w: from[4] };
      tl.to(p, {
        x1: R.sub[0], x2: R.sub[1], y: R.sub[2], o: R.sub[3], w: R.sub[4],
        duration: 1.05, ease: 'power2.inOut',
        onUpdate: () => stage.setSeg(line, p.x1, p.x2, p.y, p.o, p.w)
      }, 0.6);
    });
    const d = { x: GEOM.attemptDot[0], y: GEOM.attemptDot[1], o: GEOM.attemptDot[3] * GEOM.b5.fail };
    const wd = () => stage.setDot(stage.fragDotEl, d.x, d.y, R.remOrigin[2], d.o);
    tl.to(d, { x: R.remOrigin[0], y: R.remOrigin[1], o: R.remOrigin[3],
      duration: 1.05, ease: 'power2.inOut', onUpdate: wd }, 0.6);
    tl.add(() => {
      stage.setDot(stage.reachDot, ...R.subEnd);
      stage.reachDot.setAttribute('opacity', '0');
    }, 1.55);
    tl.to(stage.reachDot, { attr: { opacity: 1 }, duration: 0.3 }, 1.6);
    tl.add(() => stage.setFrags([R.sub]), 1.75);
  } else if (stage.path === 2) {
    // The record's light goes home: every span slides back into the terminal
    // dot and is absorbed — no line exists before the birth. The dot carries
    // the gathered light to the patient's edge at the birth's height.
    GEOM.thinSpans.forEach((from, i) => {
      const line = stage.frags[i];
      const p = { x1: from[0], x2: from[1], y: from[2], o: from[3] * GEOM.b5.fail };
      const dur = 0.9 + 0.06 * i;
      tl.to(p, {
        x1: A.subDot[0], x2: A.subDot[0] - 5, y: A.subDot[1], o: 0.05,
        duration: dur, ease: 'power2.in',
        onUpdate: () => stage.setSeg(line, p.x1, p.x2, p.y, p.o, from[4])
      }, 0.6 + 0.05 * i);
      tl.set(line, { attr: { opacity: 0 } }, 0.6 + 0.05 * i + dur + 0.01);
    });
    const d = { x: GEOM.attemptDot[0], y: GEOM.attemptDot[1], o: GEOM.attemptDot[3] * GEOM.b5.fail };
    const wd = () => stage.setDot(stage.fragDotEl, d.x, d.y, A.subDot[2], d.o);
    tl.to(d, { x: A.subDot[0], y: A.subDot[1], o: A.subDot[3],
      duration: 1.15, ease: 'power2.inOut', onUpdate: wd }, 0.6);
    tl.add(() => stage.setFrags([]), 2.15);
  } else {
    // The record softens into light: the spans dissolve as the stream's
    // residue forms at the birth's height — a medium that is not a line.
    tl.to(stage.frags.slice(0, 6), { attr: { opacity: 0 }, duration: 0.8, ease: 'power1.inOut' }, 0.65);
    tl.to(stage.fragDotEl, { attr: { opacity: 0 }, duration: 0.6 }, 0.7);
    const p = { w: F.sub[2] * 0.5, o: 0 };
    const wdr = () => stage.setDrift([F.sub[0], F.sub[1], p.w, F.sub[3], p.o]);
    tl.add(wdr, 0.8);
    tl.to(p, { w: F.sub[2], o: F.sub[4], duration: 0.9, ease: 'power1.inOut', onUpdate: wdr }, 0.85);
    tl.add(() => stage.setFrags([]), 1.8);
  }
}

// Cold entry: the substrate assembles quickly — figures, the selected
// candidate's unresolved half — and the selected treatment plays. This is
// also the replay path for the 1/2/3 selector.
function entry(mod, stage) {
  applyPreBirth(stage);
  stage.patient.style.opacity = '0';
  stage.surgeon.style.opacity = '0';
  const tl = stage.timeline();
  tl.to(stage.surgeon, { opacity: 1, duration: 0.6 }, 0);
  tl.to(stage.patient, { opacity: 1, duration: 0.6 }, 0.15);
  fadeSubstrateIn(stage, tl, 0.3);
  playBirth(stage, mod._birth, tl);
}

const transitions = {
  // beat 2 — nobody decided, everyone converged: the contraction completes.
  // The candidate's remnant is drunk, and the claim answers with its
  // micro-pulse — its first breath (kept per R5, closed 28 Aug).
  1: (mod, stage) => {
    const tl = stage.timeline();
    const edge = GEOM.markBirth[0] + GEOM.markBirth[2] / 2;
    if (stage.path === 1) {
      // The clean short stroke is drunk whole: it slides into the disc's
      // edge full-weight to the last, its terminal dot riding in with it.
      const R = GEOM.pathReach;
      const s = { x1: R.rem[0], x2: R.rem[1], o: R.rem[3] };
      const ws = () => stage.setSeg(stage.frags[0], s.x1, s.x2, R.rem[2], s.o, R.rem[4]);
      tl.to(s, { x1: edge + 10, x2: edge + 2, o: 0.5, duration: 0.75, ease: 'power2.in', onUpdate: ws }, 0.3);
      tl.set(stage.frags[0], { attr: { opacity: 0 } }, 1.06);
      const de = { x: R.remEnd[0] };
      const wde = () => stage.setDot(stage.reachDot, de.x, R.remEnd[1], R.remEnd[2], R.remEnd[3]);
      tl.to(de, { x: edge + 2, duration: 0.72, ease: 'power2.in', onUpdate: wde }, 0.3);
      tl.set(stage.reachDot, { attr: { opacity: 0 } }, 1.04);
      tl.to(stage.fragDotEl, { attr: { opacity: 0 }, duration: 0.45 }, 0.75);
    } else if (stage.path === 2) {
      // The void's last light: one quiet streak crosses from the dot's edge
      // into the disc, and the dot lets go.
      const A = GEOM.pathAbsence;
      const g = { x: A.remDot[0] - 6, r: 2.2, o: 0 };
      const wg = () => stage.setPulse(g.x, A.remDot[1], g.r, g.o);
      tl.add(wg, 0.3);
      tl.to(g, { o: 0.55, duration: 0.2, onUpdate: wg }, 0.3);
      tl.to(g, { x: edge + 2, r: 1.3, duration: 0.6, ease: 'power1.in', onUpdate: wg }, 0.4);
      tl.to(g, { o: 0, duration: 0.12, onUpdate: wg }, 1.0);
      tl.to(stage.fragDotEl, { attr: { opacity: 0 }, duration: 0.6, ease: 'power1.inOut' }, 0.55);
    } else {
      // The residue is drunk: the drift leans into the disc and is gone.
      const F = GEOM.pathFlow;
      const dr = { cx: F.rem[0], w: F.rem[2], o: F.rem[4] };
      const wdr = () => stage.setDrift([dr.cx, F.rem[1], dr.w, F.rem[3], dr.o]);
      tl.to(dr, { cx: edge + 24, w: 70, o: 0, duration: 0.85, ease: 'power2.in', onUpdate: wdr }, 0.3);
    }
    tl.to(stage.markWrap, { scale: 1.022, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.95);
    tl.add(() => stage.applyState(ID, 1), 2.1);
  },

  // beat 3 — the patient released. Departure as release, not deletion: he
  // drifts into the darkness unhurried, and the claim answers with one
  // breath of light — detached from him the moment it was accepted (R5).
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.patient, { x: 170, opacity: 0, duration: 1.7, ease: 'power1.inOut' }, 0.1);
    tl.to(stage.markWrap, { filter: 'brightness(1.07)', duration: 0.55, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.9);
    tl.add(() => stage.applyState(ID, 2), 2.1);
  },

  // beat 4 — the interval opens: the stage resettles, the line opens into
  // the dark, and SOMEONE ELSE lands at full voice — its own advance (R1).
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.surgeon, {
      left: `${GEOM.surgeonS3b[0]}px`, top: `${GEOM.surgeonS3b[1]}px`,
      width: `${GEOM.surgeonS3b[2]}px`, height: `${GEOM.surgeonS3b[3]}px`,
      duration: 1.1, ease: 'power2.inOut'
    }, 0);
    tl.to(stage.markWrap, {
      left: `${GEOM.markHeld[0]}px`, top: `${GEOM.markHeld[1]}px`, scale: HELD_SCALE,
      duration: 1.1, ease: 'power2.inOut'
    }, 0);
    const fade = stage.fadeProxy(stage.fade,
      { x1: GEOM.fadeHeld[0], x2: GEOM.fadeHeld[0], y: GEOM.fadeHeld[2], o: GEOM.fadeHeld[3], w: GEOM.fadeHeld[4] });
    tl.add(() => fade.write(), 0.95);
    tl.to(fade, { x2: GEOM.fadeHeld[1], duration: 0.9, ease: 'power2.out', onUpdate: fade.write }, 1.0);
    tl.fromTo(stage.labelsEl[0], { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 1.35);
    tl.add(() => stage.applyState(ID, 3), 2.2);
  },

  // beat 5 — SOMEWHERE ELSE lands at full voice and takes the frame;
  // SOMEONE ELSE gives it up.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.fromTo(stage.labelsEl[1], { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.1);
    tl.to(stage.labelsEl[0], { color: 'rgba(255,255,255,0.72)', duration: 0.4, ease: 'power1.inOut' }, 0.25);
    tl.add(() => stage.applyState(ID, 4), 1.0);
  },

  // beat 6 — LATER lands; SOMEWHERE ELSE demotes. s3-f2-a exactly.
  5: (mod, stage) => {
    const tl = stage.timeline();
    tl.fromTo(stage.labelsEl[2], { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.1);
    tl.to(stage.labelsEl[1], { color: 'rgba(255,255,255,0.72)', duration: 0.4, ease: 'power1.inOut' }, 0.25);
    tl.add(() => stage.applyState(ID, 5), 1.0);
  },

  // beat 7 — the completion demonstration, two phases in one frame (D5-B).
  // The words hand the frame down; the claim DEPARTS — it leaves the hold and
  // travels out along the interval, its wake stretching behind it — and while
  // it is still mid-flight the shoes ARRIVE from the far side with a wake of
  // their own. Two distinct events, opposite directions, overlapping in time;
  // the claim is never within reach of the shoe, so nothing can read as a
  // transformation. The frame freezes mid-story — the settled state is the
  // approved two-phase cell exactly.
  6: (mod, stage) => {
    const tl = stage.timeline();
    stage.tag('demo', tl);
    const TRAVEL = 1.7;
    // The words hand the frame to the demonstration.
    GEOM.demoLabels.forEach((o, i) => {
      tl.to(stage.labelsEl[i], { color: `rgba(255,255,255,${o})`, duration: 0.7, ease: 'power1.inOut' }, 0.05);
    });
    // Phase 1 — departure. The claim leaves; the held line is consumed by
    // the journey it made possible; the wake stretches from its tail.
    tl.to(stage.markWrap, {
      left: `${GEOM.markDemo[0]}px`, duration: TRAVEL, ease: 'power1.inOut'
    }, 0.35);
    tl.to(stage.fade.line, { attr: { opacity: 0 }, duration: 0.9, ease: 'power1.in' }, 0.5);
    const tail0 = GEOM.markHeld[0] - GEOM.markHeld[2] / 2;   // 702
    const wakeOut = stage.fadeProxy(stage.wakeA,
      { x1: tail0, x2: tail0, y: 540, o: 0.12, w: GEOM.wakeOut[4] });
    tl.add(() => wakeOut.write(), 0.4);
    tl.to(wakeOut, {
      x1: GEOM.wakeOut[0], x2: GEOM.wakeOut[1], o: GEOM.wakeOut[3],
      duration: TRAVEL - 0.05, ease: 'power1.inOut', onUpdate: wakeOut.write
    }, 0.4);
    // Phase 2 — arrival, overlapping: the shoes enter from beyond the frame,
    // moving the other way, their own wake reaching back to the edge.
    const ARRIVE_AT = 0.95;
    tl.add(() => {
      stage.setRect(stage.shoe, GEOM.shoeDemo);
      stage.shoe.style.opacity = '0';
    }, ARRIVE_AT);
    tl.fromTo(stage.shoe, { x: 280, opacity: 0 },
      { x: 0, opacity: 1, duration: TRAVEL - 0.6, ease: 'power1.inOut' }, ARRIVE_AT + 0.05);
    const wakeIn = stage.fadeProxy(stage.wakeB,
      { x1: 1960, x2: 1960, y: 540, o: 0.1, w: GEOM.wakeIn[4] });
    tl.add(() => wakeIn.write(), ARRIVE_AT + 0.1);
    tl.to(wakeIn, {
      x1: GEOM.wakeIn[0], x2: GEOM.wakeIn[1], o: GEOM.wakeIn[3],
      duration: TRAVEL - 0.65, ease: 'power1.inOut', onUpdate: wakeIn.write
    }, ARRIVE_AT + 0.1);
    // Both freeze together — the story held mid-flight.
    tl.add(() => stage.applyState(ID, 6), 2.45);
  },

  // beat 8 — but he doesn't have to close it: the demonstration releases.
  // The shoes slip back the way they came; the claim returns to the hold,
  // its wake folding back into it; the line re-opens; the words return.
  7: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.shoe, { x: 280, opacity: 0, duration: 0.9, ease: 'power1.in' }, 0.05);
    const wakeIn = stage.fadeProxy(stage.wakeB);
    tl.to(wakeIn, { x1: 1960, x2: 1960, o: 0, duration: 0.8, ease: 'power1.in', onUpdate: wakeIn.write }, 0.05);
    tl.to(stage.markWrap, {
      left: `${GEOM.markHeld[0]}px`, duration: 1.25, ease: 'power2.inOut'
    }, 0.3);
    const tail0 = GEOM.markHeld[0] - GEOM.markHeld[2] / 2;
    const wakeOut = stage.fadeProxy(stage.wakeA);
    tl.to(wakeOut, { x1: tail0, x2: tail0, o: 0, duration: 1.2, ease: 'power2.inOut', onUpdate: wakeOut.write }, 0.3);
    const fade = stage.fadeProxy(stage.fade,
      { x1: GEOM.fadeHeld[0], x2: GEOM.fadeHeld[0], y: GEOM.fadeHeld[2], o: GEOM.fadeHeld[3], w: GEOM.fadeHeld[4] });
    tl.add(() => fade.write(), 1.5);
    tl.to(fade, { x2: GEOM.fadeHeld[1], duration: 0.8, ease: 'power2.out', onUpdate: fade.write }, 1.55);
    [0.72, 0.72, 1].forEach((o, i) => {
      tl.to(stage.labelsEl[i], { color: `rgba(255,255,255,${o})`, duration: 0.5, ease: 'power1.inOut' }, 1.6 + 0.08 * i);
    });
    tl.add(() => stage.applyState(ID, 7), 2.5);
  },

  // beat 9 — the separation. First the full recorded handoff: the world —
  // surgeon, words, line — recedes past the floor to effectively clean
  // black, a LAYER HANDOFF recorded here and in the cell's own caption
  // (D4-A); only the claim keeps the stage, at full voice. Then the pair
  // lands over the black.
  8: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.surgeon, { opacity: GEOM.b9Surgeon, duration: 1.0, ease: 'power1.inOut' }, 0);
    GEOM.b9Labels.forEach((o, i) => {
      tl.to(stage.labelsEl[i], { color: `rgba(255,255,255,${o})`, duration: 1.0, ease: 'power1.inOut' }, 0.05);
    });
    const fade = stage.fadeProxy(stage.fade);
    tl.to(fade, { o: GEOM.fadeHeldOff[3], duration: 1.0, ease: 'power1.inOut', onUpdate: fade.write }, 0.05);
    tl.add(() => {
      stage.stmtDim.textContent = 'Money separates the two halves of an exchange.';
      stage.stmtDim.style.top = '790px';
      stage.stmt.textContent = 'The exchange can remain unfinished.';
      stage.stmt.style.top = '872px';
    }, 0);
    tl.fromTo(stage.stmtDim, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.2);
    tl.fromTo(stage.stmt, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.7);
    tl.add(() => stage.applyState(ID, 8), 2.6);
  }
};

export default makeSceneModule({
  id: ID,
  number: 3,
  title: 'The Breakthrough',
  entry,
  morphIn,
  transitions,

  onEnterExtra(mod, stage, ctx) {
    mod._birth = readBirthParam() || mod._birth || 3;
    // The presenter's selector: 1/2/3 replays the birth in that treatment
    // while the birth beat is on stage. Scratch-route tooling, removed on exit.
    mod._keys = (e) => {
      if (e.defaultPrevented || !BIRTH_KEYS.includes(e.key)) return;
      mod._birth = Number(e.key);
      if (mod._build !== 0 || !mod._stage) return;
      const st = mod._stage;
      st.killMotion();
      if (reducedMotion()) {
        st.applyState(ID, 0);
        return;
      }
      applyPreBirth(st);
      playBirth(st, mod._birth, st.timeline());
    };
    window.addEventListener('keydown', mod._keys);
  },

  onExitExtra(mod) {
    if (mod._keys) {
      window.removeEventListener('keydown', mod._keys);
      mod._keys = null;
    }
  },

  notes: `[→] Here is the breakthrough — quietly, one of the deepest ideas our species ever had. The surgeon accepts something he does not actually want. Watch the unresolved half of the exchange — the half the patient couldn’t deliver — contract… into this. A claim.

[→] Why would anyone accept a thing they don’t want for itself? Because someone else will. That is the entire trick — and notice that nobody invented it, and nobody decreed it. It was discovered, independently, everywhere trade existed: nobody decided, and everyone converged.

[→] And look what it just did. The patient can leave. This claim is not a claim on *him* — he owes nothing further. It detached from him the moment it was accepted.

[→] The exchange, though — the exchange is still open. Someone else. [→] Somewhere else. [→] Later. The other half of the surgeon’s trade hasn’t been chosen yet.

[→] When he’s ready, the claim travels — to a shoemaker he’s never met, in a place the patient has never been — and the shoes come back. The circle closes. The patient never provided the surgeon’s dinner, and never needed to.

[→] But he doesn’t have to close it. He can simply… hold it.

[→] Money separates the two halves of an exchange. You can give value to one person now, and receive value from somebody else, somewhere else, later. His side is complete. And the exchange can remain unfinished.`
});
