// Scene 10 — The Trade-Off Keeps Moving (5 beats).
//
// The act's own recapitulation — and NO SECOND STRIP. This scene used to draw
// its own four-station strip and walk the claim along it. It draws nothing
// now: the rail it reads is the rail the act has been building since station
// one, ten stations wide, and Scene 10's whole job is to read it again as an
// argument rather than as a history. That is the amendment's own line — "this
// is the same rail" — and it is the reason the strip's geometry is gone.
//
// So the recapitulation is a RE-LIGHTING. The record comes back from the
// statement it receded under, and the gain-and-dependency pairs light station
// by station along the four architecture stops — gold, the claim on it, the
// ledger, the entrant — each pair landing in the rail's own row register at
// the wound row's own 900ms. Every earlier station still says why it entered
// and how it left. Then the history line lands ON the complete record, not
// over a receded one: the sentence and its evidence share the frame.
//
// Then palladium — `3-05`'s frame ported with its real sourced figures and its
// two-epoch honesty, standing against the deep-dimmed record as the bar any
// candidate must clear — and the pivot that opens Act III over the receded
// rail. THE CLAIM IS NOT HERE: it stepped off the Act II rail at r2.3, so the
// walk that used to end this scene ends nothing now. The record is the
// through-line, and it has never left the screen.
//
// PORTS MOVE LIKE THEY ALWAYS DID. The palladium frame arrives in the legacy's
// own `[data-visible]` reveals off the slide root the stage carries, and the
// epoch lines settle back by the legacy's own `data-step` rule.
//
// Landed states — the approved r2 cells, by construction: s10-b1 … s10-b5.
// Beat 4 is the one state of the act with no pixel proof: the sheet carries
// `s10-b4` byte-identical from the states sheet, so the approved cell holds
// the palladium frame WITHOUT the rail the film keeps deep-dimmed beneath it,
// exactly as Scene 6's elimination interiors do.

import { setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'the-trade-off-keeps-moving';

// The four architecture stations, in the order the act reached them. The pairs
// light along the record in that order, which is the amendment's own
// "station by station".
const PAIRS = [
  ['gold', 'row64'], ['gold', 'row146'],
  ['claim', 'row64'], ['claim', 'row146'],
  ['ledger', 'row64'], ['ledger', 'row146'],
  ['bitcoin', 'row64'], ['bitcoin', 'row146']
];

// The record read again as argument: it comes back from the recession and the
// pairs light along it, one station at a time.
function readAgain(mod, stage, tl, at = 0) {
  stage.railTo(tl, stage.states[ID][0].rail, { at, land: PAIRS, arriveAt: 0 });
}

function entry(mod, stage) {
  const tl = stage.timeline();
  readAgain(mod, stage, tl, 0);
  tl.add(() => stage.applyState(ID, 0), 2.9);
}

// The morph from Scene 9: the idea persists — the word "architecture" crosses
// the boundary intact — so the world does not cut. The distinction clears and
// the record it stood over comes back up to be read.
function morphIn(mod, stage) {
  stage.applyState('scarcity-becomes-digital', 4);
  const tl = stage.timeline();
  tl.to([stage.stmtEls[0], stage.stmtEls[1]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  readAgain(mod, stage, tl, 0.5);
  tl.add(() => stage.applyState(ID, 0), 3.4);
}

// The palladium frame's arrival, in the legacy's own reveals. The slide root
// is claimed first: the hook's lift and the epoch lines' recession are both
// `data-step` rules, and without them this is not the treatment.
function landPalladium(stage, tl, at) {
  const P = stage.palladium;
  tl.add(() => {
    stage.chartRoot('palladium', 3);
    P.wrap.style.display = '';
    hideInstantly(P.wrap, () => {
      [P.hook, P.chart, P.timing].forEach((el) => setVisible(el, false));
      setVisible(P.narrowed, false);
      setVisible(P.bar, false);
    });
  }, at);
  tl.add(() => setVisible(P.hook, true), at + 0.1);
  tl.add(() => setVisible(P.chart, true), at + 0.75);
  tl.add(() => setVisible(P.timing, true), at + 2.1);
}

const transitions = {
  // beat 2 — the history line, on the record it names.
  1: (mod, stage) => {
    const st = stage.states[ID][1];
    const tl = stage.timeline();
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railStatement(st, 0), 0.05, { dur: 0.7 });
    tl.add(() => stage.applyState(ID, 1), 1.1);
  },

  // beat 3 — PALLADIUM, against the extended rail. The record recedes to the
  // legacy's deep dim rather than clearing: the bar is being held up against
  // the history it has to clear, and that history stays in the room.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
    stage.railTo(tl, stage.states[ID][2].rail, { at: 0, camera: false });
    landPalladium(stage, tl, 0.8);
    tl.add(() => stage.applyState(ID, 2), 4.2);
  },

  // beat 4 — THE BAR. The second epoch lands, then the sentence every later
  // candidate is held to; the two epoch lines settle back by the legacy's own
  // step rule, so the bar is the brightest thing on the frame.
  3: (mod, stage) => {
    const tl = stage.timeline();
    const P = stage.palladium;
    tl.add(() => stage.chartRoot('palladium', 5), 0.05);
    tl.add(() => setVisible(P.narrowed, true), 0.15);
    tl.add(() => setVisible(P.bar, true), 1.15);
    tl.add(() => stage.applyState(ID, 3), 2.4);
  },

  // beat 5 — the pivot that opens Act III, over the receded complete record.
  // Ten stations, each with its line beneath it, and one question none of them
  // has answered.
  4: (mod, stage) => {
    const st = stage.states[ID][4];
    const tl = stage.timeline();
    const P = stage.palladium;
    tl.add(() => {
      [P.hook, P.chart, P.timing, P.narrowed, P.bar].forEach((el) => setVisible(el, false));
    }, 0.05);
    tl.add(() => {
      stage.chartRoot(null);
      P.wrap.style.display = 'none';
    }, 0.95);
    stage.railTo(tl, st.rail, { at: 0.6 });
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railQuestion(st), 1.6, { dur: 0.75 });
    tl.add(() => stage.applyState(ID, 4), 2.9);
  }
};

export default makeSceneModule({
  id: ID,
  number: 10,
  title: 'The Trade-Off Keeps Moving',
  entry,
  morphIn,
  transitions,
  notes: `[→] Lay the whole architecture on one line. Gold: scarce in matter — and heavy. The claim on gold: light as paper — and hanging from the issuer's honesty. The ledger: instant — and standing on the very redemption that was cancelled. And the newest mark: digital scarcity — and young, still earning its place. Every architecture bought a gain, and paid for it with a dependency.

[→] The history of money is a history of changing trade-offs.

[→] But be careful — not every improvement moves the crown, and here is the proof. Palladium. Discovered in 1803, scarcer in supply than gold — the world mines about fifteen times as much gold each year — genuinely useful, and in some stretches pricier per ounce than gold itself. And it never became money. Not anywhere. Not in any era. It walked in scarcer than the reigning metal, against a network thousands of years old — and a monetary good's value *is* that network: what everyone else will accept. A latecomer doesn't start a few laps behind; it starts at zero. Rarer, pricier — and monetarily, nothing. Price is not moneyness.

[→] Which gives us the bar, and it may be the most important sentence of this chapter: marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.

[→] So the question is no longer *which object*. The question is: better for what *job*? Because money, it turns out, is not one job at all. That's next.`
});
