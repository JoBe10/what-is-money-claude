// Scene 5 — The Function Stayed. The Carrier Changed. (8 beats).
//
// THE RAIL BEGINS HERE. Act II's anchor is one continuous record that never
// fully leaves the screen and extends right as history advances (the staging
// amendment, master §13), and this scene writes its first five stations: the
// line draws in from the left, SHELLS takes station one with its virtue
// beneath it, and CATTLE, SALT and IRON arrive to its right and fall, each
// with its own wound. METALS rises out of the wreckage; the ship comes for the
// shells at the far-left station; and the act's thesis lands over the receded
// record.
//
// THE MOTION IS THE LEGACY RAIL'S, TRANSCRIBED. Every gesture here is one of
// `EvolutionRail`'s own, at its own duration: the camera's 1.7s power2.inOut
// tween, the stop's 800ms arrival, the wound row's 900ms fade and 1100ms rise
// from 6px, and the line's 1500ms extension after a 300ms hold. What this
// session authors is nothing: the rulings fixed the staging, the sheet fixed
// every settled frame, and the legacy fixed the way a rail moves.
//
// THE CLAIM IS NOT HERE, and its absence is a ruling, not an omission (r2.3):
// the ClaimObject appears in no Act II rail beat, station illumination and the
// spoken narrative carry the claim's position, and its on-screen thread
// resumes in Act III and at Act IV's return. So the act no longer opens on the
// disc arriving from Scene 4's world — it opens on the record starting to be
// written, which is the amendment's own S5 b1.
//
// Landed states — the approved r2 cells, by construction: s5-b1 … s5-b8.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'the-function-stayed';

// The act opens: the line draws in out of the dark and the first carrier takes
// its station. The line's growth is `.s2o-rail__line`'s own scaleX transition
// — 1500ms after a 300ms hold — run here in world terms, from behind the
// line's own start so the rail arrives out of nothing.
const RAIL_OFF = -400;

function entry(mod, stage) {
  const st = stage.states[ID][0];
  const tl = stage.timeline();
  stage.railTo(tl, st.rail, {
    at: 0, grow: RAIL_OFF, camera: false,
    arrive: ['shells'], arriveAt: 0.9,
    land: [['shells', 'row64']]
  });
  tl.add(() => stage.applyState(ID, 0), 3.1);
}

const transitions = {
  // beat 2 — CATTLE arrives to the RIGHT of the shells and falls. The camera
  // opens to take it in, the line extends to the new head, and the wound lands
  // at full voice beneath the station that just took it.
  1: (mod, stage) => {
    const tl = stage.timeline();
    stage.railTo(tl, stage.states[ID][1].rail, {
      at: 0, grow: true, land: [['cattle', 'row64']]
    });
    tl.add(() => stage.applyState(ID, 1), 3.1);
  },

  // beats 3–4 — SALT, then IRON. The same sentence each time: the rail reaches
  // one station further right, the newcomer arrives, its wound lands at full
  // voice, and the one before it recedes to the dimmed-prior step.
  2: (mod, stage) => {
    const tl = stage.timeline();
    stage.railTo(tl, stage.states[ID][2].rail, {
      at: 0, grow: true, land: [['salt', 'row64']]
    });
    tl.add(() => stage.applyState(ID, 2), 3.1);
  },
  3: (mod, stage) => {
    const tl = stage.timeline();
    stage.railTo(tl, stage.states[ID][3].rail, {
      at: 0, grow: true, land: [['iron', 'row64']]
    });
    tl.add(() => stage.applyState(ID, 3), 3.1);
  },

  // beat 5 — METALS rises out of the wreckage, and arrives the way every
  // station arrives: with its own line beneath it (r2.2), in the installed
  // script's own words. The three wounds have receded; the rising family is
  // the sentence.
  4: (mod, stage) => {
    const tl = stage.timeline();
    stage.railTo(tl, stage.states[ID][4].rail, {
      at: 0, grow: true, land: [['metals', 'row64']]
    });
    tl.add(() => stage.applyState(ID, 4), 3.3);
  },

  // beat 6 — ZANZIBAR, at the far-left SHELLS station (r2.1): the ship
  // returns to the oldest station on the record. The camera lifts to make room
  // beneath, the shells go dark as their virtue leaves them, and the dated
  // fact lands in the severance's own reveal character — the place and the
  // date rise together, the consequence follows.
  5: (mod, stage) => {
    const st = stage.states[ID][5];
    const tl = stage.timeline();
    stage.railTo(tl, st.rail, { at: 0 });
    tl.add(() => {
      const ev = stage.railDatedFact(st);
      gsap.set([ev.place, ev.date], { opacity: 0, y: 12 });
      gsap.set(ev.fact, { opacity: 0, y: 10 });
    }, 0.9);
    tl.to([stage.evPlace, stage.evDate],
      { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.0);
    tl.to(stage.evFact, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.75);
    tl.add(() => stage.applyState(ID, 5), 3.4);
  },

  // beat 7 — the thesis. The dated fact clears, the record recedes to the
  // statement's ground (`.s2o-rail`'s own 800ms), the shells' defeat settles
  // into their row where the record keeps it, and the sentence lands.
  6: (mod, stage) => {
    const st = stage.states[ID][6];
    const tl = stage.timeline();
    tl.to([stage.evPlace, stage.evDate, stage.evFact],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, st.rail, { at: 0.5, land: [['shells', 'row64']] });
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railStatement(st, 0), 2.1);
    tl.add(() => stage.applyState(ID, 6), 3.4);
  },

  // beat 8 — the exit question, on the record it leaves standing.
  7: (mod, stage) => {
    const st = stage.states[ID][7];
    const tl = stage.timeline();
    tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0);
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railQuestion(st), 0.45, { rise: 8 });
    tl.add(() => stage.applyState(ID, 7), 1.4);
  }
};

export default makeSceneModule({
  id: ID,
  number: 5,
  title: 'The Function Stayed. The Carrier Changed.',
  entry,
  // Scene 5 opens the group; a continuous forward entry cannot reach it, so
  // the morph slot carries the same gesture as the cold entry — the rail
  // beginning either way.
  morphIn: entry,
  transitions,
  notes: `[→] So you've decided to save — to hold your claim open across time. But a claim is invisible. To survive the trip, it needs a body: something that can carry it from hand to hand, from year to year. Here is the first body it ever wore: shells. Beautiful, scarce, hard to fake. For centuries, across whole coastlines, a life's work slept safely inside them. Hold that thought — and remember these shells; there's a ship on the horizon that will come for them before this chapter ends.

[→] Because shells were not the only candidate. Every culture entered its own. Cattle — genuinely valuable, and genuinely useless the moment you need to make change. You cannot divide a cow and keep it a cow.

[→] Salt — precious, portable, and gone in one bad storm.

[→] Iron — abundant, which is the problem. It rusts, and anyone with a furnace can make more of it.

[→] Different centuries, different continents, same experiment — and the market keeps selecting for the same thing: the good that survives across space, across time, across scale. And out of the wreckage, one family keeps rising, on every continent that has it: the metals. Hard to make more of. Slow to decay. Divisible without dying.

[→] And here is the shell story ending, exactly as promised. When European ships began landing thousands of tons of cheaper Zanzibar cowries in West Africa, the shells' scarcity — which had always been an accident of distance — collapsed. The people holding their savings in shells were not out-traded. They were out-*supplied*. Remember this defeat; it is the oldest version of a very modern problem.

[→] Now look at what just happened across all of it. Shells, cattle, salt, iron, metal — the bodies kept changing. But the thing inside them never did: someone's claim, riding whatever would carry it. The function stayed. The carrier changed.

[→] Which leaves the real question of this whole chapter: *why* did the carrier keep changing? What was the competition actually about? Let's follow the winner and find out.`
});
