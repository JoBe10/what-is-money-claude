// Scene 5 — The Function Stayed. The Carrier Changed. (8 beats).
//
// The act opens on the film's through-line made literal: the held claim —
// resting on Scene 4's save road when Act I left it — enters, travels to the
// stage's centre, and construction C's carrier forms around it. The carrier
// then hands the stage to the competition record (the ported 2-04 contender
// row, mounted as the component the legacy runs), the record transforms
// under the rails law with the renders riding the band, the Zanzibar receipt
// lands in the evidence grammar, and the same claim returns for the closing
// pair — the body changed and the thing inside did not.
//
// PORTS MOVE LIKE THEY ALWAYS DID. The verdict landings (beats 2–4) and the
// row-to-record transformation (beat 5) are EvolutionRail's own state
// transitions and camera move, driven through the states the legacy 2-04
// drives it through. What this session authors is the connective tissue the
// brief names: the claim's entry from Scene 4's world, the carrier's handoff
// to the record, the evidence landing (in the severance's own reveal
// character), and the claim's return.
//
// Landed states — approved cells, by construction (states.json approvedSet):
// s5-b1 … s5-b8, with b5 the rails-law record and b6 the evidence grammar's
// first specimen.

import { gsap } from 'gsap';
import {
  GEOM, COPY, s5Row, setVisible, hideInstantly
} from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'the-function-stayed';

// The claim's entry — the new connective motion (Batch B brief §2): the held
// claim arrives from Scene 4's resting place, finds the stage's centre, and
// the drawn carrier forms around it. The traveler is the same component at
// the same 116, so the closing swap to the in-carrier claim is a same-pixel
// handoff inside one synchronous callback.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    hideInstantly(stage.shell.el, () => stage.shell.applyState({ visible: false }));
    hideInstantly(stage.claim.el, () => stage.claim.applyState({ visible: false }));
    gsap.set(stage.claimLabelEl, { opacity: 0 });
    stage.setTraveler(GEOM.s4Rest[0], GEOM.s4Rest[1], 0);
  }, 0);
  // The claim finds its light where Scene 4 left it resting...
  tl.to(stage.traveler, { opacity: 1, duration: 0.6, ease: 'power1.out' }, 0.2);
  // ...and crosses into the act.
  tl.to(stage.traveler, {
    left: `${GEOM.claimCentre[0] - 58}px`,
    top: `${GEOM.claimCentre[1] - 58}px`,
    duration: 1.4,
    ease: 'power2.inOut'
  }, 0.9);
  // The first body forms around it — the carrier's own reveal.
  tl.add(() => stage.shell.applyState({ visible: true }), 2.35);
  tl.to(stage.claimLabelEl, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 2.7);
  // The handoff: the in-carrier claim takes over at the same pixel.
  tl.add(() => stage.applyState(ID, 0), 3.4);
}

const transitions = {
  // beat 2 — the carrier hands the stage to the record: the composition
  // withdraws as the contender row rises where it stood, and CATTLE takes
  // its wound exactly as the legacy landed it.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.shell.applyState({ visible: false });
      stage.claim.applyState({ visible: false });
    }, 0.05);
    tl.to(stage.claimLabelEl, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    tl.add(() => {
      stage.railWrap.style.opacity = '0';
      stage.railWrap.style.display = '';
      stage.rail.applyState(s5Row([], null), { live: false });
    }, 0.3);
    tl.to(stage.railWrap, { opacity: 1, duration: 0.8, ease: 'power1.inOut' }, 0.35);
    tl.add(() => stage.rail.applyState(s5Row(['cattle'], 'cattle'), { live: true }), 1.35);
    tl.add(() => stage.applyState(ID, 1), 2.5);
  },

  // beats 3–4 — the verdicts, the component's own landings: the new wound at
  // full voice, the prior receding to the dimmed step (§9.4 rule 10).
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.rail.applyState(s5Row(['cattle', 'salt'], 'salt'), { live: true }), 0.05);
    tl.add(() => stage.applyState(ID, 2), 1.3);
  },
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.rail.applyState(s5Row(['cattle', 'salt', 'iron'], 'iron'), { live: true }), 0.05);
    tl.add(() => stage.applyState(ID, 3), 1.3);
  },

  // beat 5 — the transformation: the camera opens to the record, the fallen
  // stops settle, METALS rises with its render, and the goods stay riding
  // the band (the rails law) — receding with their stations instead of
  // collapsing into marks.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.rail.applyState(stage.states[ID][4].rail, { live: true }), 0.05);
    tl.to(stage.fallenRenders, { opacity: 0.58, duration: 1.2, ease: 'power1.inOut' }, 0.5);
    tl.add(() => {
      stage.metalsBox.style.display = '';
      gsap.set(stage.metalsBox, { opacity: 0 });
    }, 0.9);
    tl.to(stage.metalsBox, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 1.0);
    tl.add(() => stage.applyState(ID, 4), 2.6);
  },

  // beat 6 — the record yields to the receipt: the dated fact lands in the
  // severance's own reveal character — the place and the date rise first,
  // the consequence follows.
  5: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.railWrap, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.05);
    tl.add(() => { stage.railWrap.style.display = 'none'; }, 0.7);
    tl.add(() => {
      const ev = GEOM.evidence;
      stage.setText(stage.evPlace, ev.place[0], ev.place[1]);
      stage.setText(stage.evDate, ev.date[0], ev.date[1]);
      stage.setText(stage.evFact, ev.fact[0], ev.fact[1]);
      gsap.set([stage.evPlace, stage.evDate], { opacity: 0, y: 12 });
      gsap.set(stage.evFact, { opacity: 0, y: 10 });
    }, 0.5);
    tl.to([stage.evPlace, stage.evDate], { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.6);
    tl.to(stage.evFact, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.35);
    tl.add(() => stage.applyState(ID, 5), 2.4);
  },

  // beat 7 — the return: the receipt clears, and the same claim comes back —
  // first the thing inside, then the body's wall — under the closing pair.
  // Five bodies have been and gone; this is the argument made visible.
  6: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.evPlace, stage.evDate, stage.evFact],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.05);
    tl.add(() => stage.claim.applyState({ visible: true }), 0.5);
    tl.add(() => stage.shell.applyState({ visible: true }), 0.7);
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.functionStayed, 812, 46, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 1.1);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 1.15);
    tl.add(() => stage.applyState(ID, 6), 2.1);
  },

  // beat 8 — the exit question, on the composition it leaves.
  7: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.35, ease: 'power1.in' }, 0.05);
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.whyChanged, 812, 46, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 8 });
    }, 0.45);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5);
    tl.add(() => stage.applyState(ID, 7), 1.3);
  }
};

export default makeSceneModule({
  id: ID,
  number: 5,
  title: 'The Function Stayed. The Carrier Changed.',
  entry,
  // Scene 5 opens the group; a continuous forward entry cannot reach it, so
  // the morph slot carries the same gesture as the cold entry — the claim
  // arriving from Scene 4's world either way.
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
