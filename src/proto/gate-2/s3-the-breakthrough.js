// Prototype Gate 2 — Scene 3, The Breakthrough (7 beats). The heart of the film.
//
// Scene 2 morphs into this scene — same stage, no cut: the binding line yields,
// the figures re-gather, the failure's remains become the unresolved half, and
// it contracts into the Claim Mark. The birth is the film's first orange, and
// it plays in one of three runtime-selectable treatments (docs/gate-2-brief.md
// §4): `?birth=1|2|3` (or collapse|condense|pool), or keys 1/2/3 while this
// scene is on stage — pressing one on the birth beat replays the gesture in
// that treatment. The presenter selects; the default is only a default.
//
// Landed states: beat 1 is s3-f1-final and beats 4 and 6 are s3-f2-a, exactly.
// Beats 2, 3, 5 and 7 are derived from those frames' system and flagged.

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

// The morph from Scene 2: the stage releases the failure frame, re-gathers the
// two figures at the birth's composition, the failure's remains assemble into
// the unresolved half — and it contracts into the mark.
function morphIn(mod, stage) {
  stage.applyState('the-direct-exchange', 4);   // the deterministic launch point
  const tl = stage.timeline();

  // Release: the statement and the possibilities have said what they came to
  // say; the frame comes back to full voice for the birth.
  tl.to(stage.stmt, { opacity: 0, duration: 0.4 }, 0);
  tl.to(stage.scenEl, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 0.1);
  tl.to([stage.shoe, stage.meal, stage.wine], { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.1);
  tl.to(stage.fragDotEl, { attr: { opacity: 0 }, duration: 0.4 }, 0.4);

  // Re-gather: the surgeon settles into the birth's frame; the patient returns
  // from a presence to a person — the claim is about to detach from him.
  tl.to(stage.surgeon, {
    left: `${GEOM.surgeonS3[0]}px`, top: `${GEOM.surgeonS3[1]}px`,
    width: `${GEOM.surgeonS3[2]}px`, height: `${GEOM.surgeonS3[3]}px`,
    duration: 1.0, ease: 'power2.inOut'
  }, 0.5);
  tl.to(stage.glyphEl, { opacity: 0, duration: 0.55 }, 0.55);
  tl.add(() => {
    stage.setRect(stage.patient, GEOM.patientS3);
    stage.patient.style.opacity = '0';
  }, 0.55);
  tl.to(stage.patient, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 0.7);

  // The failure's remains drift up and assemble into the unresolved half —
  // the same line, gathered for what happens to it next.
  GEOM.fragsFail.forEach((from, i) => {
    const line = stage.frags[i];
    const to = GATHER[i];
    if (!to) {
      tl.to(line, { attr: { opacity: 0 }, duration: 0.5 }, 0.6);
      return;
    }
    const p = { x1: from[0], x2: from[1], y: from[2], o: from[3] };
    tl.to(p, {
      x1: to[0], x2: to[1], y: to[2], o: to[3],
      duration: 1.0, ease: 'power2.inOut',
      onUpdate: () => stage.setSeg(line, p.x1, p.x2, p.y, p.o)
    }, 0.6);
  });

  playBirth(stage, mod._birth, tl);
}

// Cold entry: the substrate assembles quickly — figures, the gathered
// unresolved half — and the selected treatment plays. This is also the replay
// path for the 1/2/3 selector.
function entry(mod, stage) {
  applyPreBirth(stage);
  stage.patient.style.opacity = '0';
  const gathered = stage.frags.slice(0, GATHER.length);
  gathered.forEach((line) => line.setAttribute('opacity', '0'));
  const tl = stage.timeline();
  tl.fromTo(stage.surgeon, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0);
  tl.to(stage.patient, { opacity: 1, duration: 0.6 }, 0.15);
  gathered.forEach((line, i) => {
    tl.to(line, { attr: { opacity: 1 }, duration: 0.5 }, 0.3 + 0.1 * i);
  });
  playBirth(stage, mod._birth, tl);
}

const transitions = {
  // beat 2 — nobody decided, everyone converged: the contraction completes.
  // The last of the stream is absorbed and the claim settles into its
  // quiet presence between the two people.
  1: (mod, stage) => {
    const tl = stage.timeline();
    const edge = 880 + 66;
    [2, 1, 0].forEach((i, k) => {
      const from = GEOM.fragsBirth[i];
      const p = { x1: from[0], x2: from[1], o: from[3] };
      tl.to(p, {
        x1: edge + 8, x2: edge + 2, o: 0.5,
        duration: 0.5, ease: 'power2.in',
        onUpdate: () => stage.setSeg(stage.frags[i], p.x1, p.x2, from[2], p.o)
      }, 0.15 + 0.16 * k);
      tl.set(stage.frags[i], { attr: { opacity: 0 } }, 0.15 + 0.16 * k + 0.51);
    });
    tl.to(stage.markWrap, { scale: 1.022, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.75);
    tl.add(() => stage.applyState(ID, 1), 1.9);
  },

  // beat 3 — the patient released. Departure as release, not deletion: he
  // drifts into the darkness unhurried, and the claim answers with one
  // breath of light — detached from him the moment it was accepted.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.patient, { x: 170, opacity: 0, duration: 1.7, ease: 'power1.inOut' }, 0.1);
    tl.to(stage.markWrap, { filter: 'brightness(1.07)', duration: 0.55, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.9);
    tl.add(() => stage.applyState(ID, 2), 2.1);
  },

  // beat 4 — the open interval: the stage resettles, the line opens into the
  // dark, and the three lines land in sequence — each at full voice, each
  // demoting the one before, exactly the approved frame's hierarchy.
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
    const fade = stage.fadeProxy({ x1: GEOM.fadeHeld[0], x2: GEOM.fadeHeld[0], y: GEOM.fadeHeld[2], o: GEOM.fadeHeld[3], w: GEOM.fadeHeld[4] });
    tl.add(() => fade.write(), 0.95);
    tl.to(fade, { x2: GEOM.fadeHeld[1], duration: 0.9, ease: 'power2.out', onUpdate: fade.write }, 1.0);
    const [someone, somewhere, later] = stage.labelsEl;
    tl.fromTo(someone, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.2);
    tl.to(someone, { opacity: 0.72, duration: 0.35 }, 1.95);
    tl.fromTo(somewhere, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.95);
    tl.to(somewhere, { opacity: 0.72, duration: 0.35 }, 2.7);
    tl.fromTo(later, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 2.7);
    tl.add(() => stage.applyState(ID, 3), 3.5);
  },

  // beat 5 — the completion demonstration: the claim travels the interval —
  // someone else, somewhere else — and the shoes come back along the same
  // line. The circle closes without the patient.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.markWrap, { left: '1640px', duration: 1.35, ease: 'power2.in' }, 0.1);
    tl.to(stage.markWrap, { opacity: 0, duration: 0.45, ease: 'power1.in' }, 1.0);
    tl.add(() => {
      stage.setRect(stage.shoe, GEOM.shoeDemo);
      stage.shoe.style.opacity = '0';
    }, 1.9);
    tl.fromTo(stage.shoe, { x: 260, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }, 2.0);
    const pulse = { o: GEOM.fadeHeld[3] };
    tl.to(pulse, {
      o: 0.34, duration: 0.4, yoyo: true, repeat: 1, ease: 'sine.inOut',
      onUpdate: () => stage.fadeStop.setAttribute('stop-color', `rgba(255,255,255,${pulse.o})`)
    }, 2.5);
    tl.add(() => stage.applyState(ID, 4), 3.4);
  },

  // beat 6 — but he doesn't have to close it: the demonstration rewinds to
  // the held claim.
  5: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.shoe, { opacity: 0, duration: 0.5 }, 0);
    tl.add(() => stage.setMark(GEOM.markHeld[0], GEOM.markHeld[1], GEOM.markHeld[2], 0), 0.4);
    tl.fromTo(stage.markWrap, { opacity: 0, scale: HELD_SCALE * 0.9 },
      { opacity: 1, scale: HELD_SCALE, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, 0.45);
    tl.add(() => stage.applyState(ID, 5), 1.3);
  },

  // beat 7 — the separation and unfinished lines, display scale; the interval
  // recedes beneath them and the claim holds its full voice.
  6: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.scenEl, { opacity: 0.55, duration: 0.7, ease: 'power1.inOut' }, 0);
    tl.add(() => {
      stage.stmtDim.textContent = 'Money separates the two halves of an exchange.';
      stage.stmtDim.style.top = '790px';
      stage.stmt.textContent = 'The exchange can remain unfinished.';
      stage.stmt.style.top = '872px';
    }, 0);
    tl.fromTo(stage.stmtDim, { opacity: 0, y: 12 },
      { opacity: 0.66, y: 0, duration: 0.6, ease: 'power2.out' }, 0.2);
    tl.fromTo(stage.stmt, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.7);
    tl.add(() => stage.applyState(ID, 6), 1.6);
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
    mod._birth = readBirthParam() || mod._birth || 1;
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

[→] The exchange, though — the exchange is still open. Someone else. Somewhere else. Later. The other half of the surgeon’s trade hasn’t been chosen yet.

[→] When he’s ready, the claim travels — to a shoemaker he’s never met, in a place the patient has never been — and the shoes come back. The circle closes. The patient never provided the surgeon’s dinner, and never needed to.

[→] But he doesn’t have to close it. He can simply… hold it.

[→] Money separates the two halves of an exchange. You can give value to one person now, and receive value from somebody else, somewhere else, later. His side is complete. And the exchange can remain unfinished.`
});
