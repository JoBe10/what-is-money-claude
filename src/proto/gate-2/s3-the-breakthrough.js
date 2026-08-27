// Prototype Gate 2 r2 — Scene 3, The Breakthrough (9 beats). The heart of the
// film.
//
// Scene 2 morphs into this scene — same stage, no cut: the binding line
// yields, the figures re-gather, the failure's thinning remains rise into the
// unresolved half, and the birth consumes it. The birth is the film's first
// orange and it is **pool** (presenter-ruled 26 August 2026, R3); condense is
// the named banked alternate and all three treatments stay runtime-selectable
// (`?birth=1|2|3`, or keys 1/2/3 while this scene is on stage). The claim's
// micro-motions — the pulse as the contraction completes, the breath at the
// release — are KEPT into r2 to be judged in motion (R5).
//
// The interval's three names are each their own advance (R1: S3 is 9 beats);
// the completion demonstration is D5-B — two phases in one frame: the claim
// departs and the shoes arrive as distinct overlapping events, and at no
// point may the claim read as becoming the shoe. Beat 9 completes a full
// recorded handoff to clean black before the separation lines land (D4-A).
//
// Landed states — approved cells, by construction (states.json rulings):
// s3-b1-c · s3-b2 · s3-b3 · s3-b4-a · s3-b5-a · s3-b6-a · s3-b7-b ·
// s3-b8-a · s3-b9-a.

import { GEOM, reducedMotion } from './_stage.js';
import { makeSceneModule } from './_scene.js';
import { playBirth, applyPreBirth, GATHER, BIRTH_KEYS, BIRTH_NAMES } from './_birth.js';

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
// birth's composition; the failure's thinning remains rise into the
// unresolved half — the same dying line, gathered for what happens to it
// next — and the birth consumes it.
function morphIn(mod, stage) {
  stage.applyState('the-direct-exchange', 4);   // the deterministic launch point
  const tl = stage.timeline();

  tl.to(stage.stmt, { opacity: 0, duration: 0.4 }, 0);
  tl.to([stage.shoe, stage.meal, stage.wine], { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.1);
  tl.to(stage.fragDotEl, { attr: { opacity: 0 }, duration: 0.4 }, 0.35);

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

  // The failure's remains rise into the corridor: the receded thin spans
  // lift from the failure line to the birth's height and gather into the
  // unresolved half — still speaking C, still dying leftward. Spans 0/2/4
  // carry the mass to the three gathered pieces; 1/3/5 are absorbed en route.
  GEOM.thinSpans.forEach((from, i) => {
    const line = stage.frags[i];
    if (i % 2 === 1) {
      tl.to(line, { attr: { opacity: 0 }, duration: 0.6 }, 0.75);
      return;
    }
    const to = GATHER[i / 2];
    const p = { x1: from[0], x2: from[1], y: from[2], o: from[3] * GEOM.b5.fail, w: from[4] };
    tl.to(p, {
      x1: to[0], x2: to[1], y: to[2], o: to[3], w: to[4],
      duration: 1.05, ease: 'power2.inOut',
      onUpdate: () => stage.setSeg(line, p.x1, p.x2, p.y, p.o, p.w)
    }, 0.6);
  });
  // The gathered pieces move onto the pool lines the treatments expect.
  tl.add(() => {
    stage.setFrags(GATHER);
  }, 1.75);

  playBirth(stage, mod._birth, tl);
}

// Cold entry: the substrate assembles quickly — figures, the gathered
// unresolved half — and the selected treatment plays. This is also the replay
// path for the 1/2/3 selector.
function entry(mod, stage) {
  applyPreBirth(stage);
  stage.patient.style.opacity = '0';
  stage.surgeon.style.opacity = '0';
  const gathered = stage.frags.slice(0, GATHER.length);
  gathered.forEach((line) => line.setAttribute('opacity', '0'));
  const tl = stage.timeline();
  tl.to(stage.surgeon, { opacity: 1, duration: 0.6 }, 0);
  tl.to(stage.patient, { opacity: 1, duration: 0.6 }, 0.15);
  gathered.forEach((line, i) => {
    tl.to(line, { attr: { opacity: 1 }, duration: 0.5 }, 0.3 + 0.1 * i);
  });
  playBirth(stage, mod._birth, tl);
}

const transitions = {
  // beat 2 — nobody decided, everyone converged: the contraction completes.
  // The remnant stream is drunk span by span, nearest first, and the claim
  // answers with its micro-pulse — its first breath (kept per R5).
  1: (mod, stage) => {
    const tl = stage.timeline();
    const edge = GEOM.markBirth[0] + GEOM.markBirth[2] / 2;
    [3, 2, 1, 0].forEach((i, k) => {
      const from = GEOM.remnantC[i];
      const p = { x1: from[0], x2: from[1], o: from[3], w: from[4] };
      tl.to(p, {
        x1: edge + 8, x2: edge + 2, o: 0.5, w: Math.max(from[4], 1),
        duration: 0.5, ease: 'power2.in',
        onUpdate: () => stage.setSeg(stage.frags[i], p.x1, p.x2, from[2], p.o, p.w)
      }, 0.15 + 0.16 * k);
      tl.set(stage.frags[i], { attr: { opacity: 0 } }, 0.15 + 0.16 * k + 0.51);
    });
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
