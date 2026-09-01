// Scene 6 — Gold: Scarcity in Matter (9 beats, the legacy pacing).
//
// The winner takes its station. GOLD arrives on the rail with SCARCITY IN
// MATTER landing at it; then the record recedes to the legacy's deep dim and
// the stylized table rises over it, and the periodic elimination runs EXACTLY
// as `2-05-two-survivors` performs it — one wave per advance, each wave the
// ElementGrid's own auto-timed gesture, one wave line at a time, the verdict
// at the end (Ruling 3 struck, master §13; do not recompress it). The rail
// waits beneath, all the way through. Then it returns with GOLD crowned, and
// the mass state names gold's own weakness before the rail comes back carrying
// it as gold's dependency note.
//
// The scene enters from Scene 5 as a continuous world, because the world IS
// continuous now: the exit question clears, the camera opens right, and GOLD
// arrives. There is no cut — the amendment's rail never fully leaves the
// screen, and the seam between two scenes is a camera move like any other.
//
// Landed states — the approved r2 cells, by construction: s6-b1, s6-b2, the
// five carried elimination interiors, s6-b8, s6-b9 — and `s6-b9-return` one
// state past the last beat, the rail returned with gold's dependency note,
// which is where Scene 7's morph launches from (`_railStates.js`).

import { gsap } from 'gsap';
import { GEOM, setVisible } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';
import { S6_RETURN } from './_railStates.js';

const ID = 'scarcity-in-matter';

// GOLD arrives: the camera opens right to take in the new head, the station
// comes up at the legacy stop's own 800ms, and the beat's sentence lands at it.
function arriveGold(mod, stage, tl, at = 0) {
  const st = stage.states[ID][0];
  stage.railTo(tl, st.rail, { at, grow: true });
  stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), at + 2.0);
}

function entry(mod, stage) {
  const tl = stage.timeline();
  arriveGold(mod, stage, tl, 0);
  tl.add(() => stage.applyState(ID, 0), 3.1);
}

// The seam from Scene 5: the question clears off the receded record, the record
// comes back up as the camera opens, and GOLD takes its station. One world.
function morphIn(mod, stage) {
  stage.applyState('the-function-stayed', 7);
  const tl = stage.timeline();
  tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
  arriveGold(mod, stage, tl, 0.4);
  tl.add(() => stage.applyState(ID, 0), 3.5);
}

// One elimination wave, exactly as the legacy performs it: the grid's own live
// wave, exactly one wave line visible, the verdict with the furnace. The rail
// holds its deep dim beneath, untouched — the interiors are the approved cells
// and nothing about them moves.
const wave = (n, settle) => (mod, stage) => {
  const tl = stage.timeline();
  tl.add(() => {
    stage.grid.applyState(n - 1, { live: true });
    stage.waveLines.forEach((line) => setVisible(line, n === Number(line.dataset.step)));
    setVisible(stage.verdict, n >= 6);
  }, 0.05);
  tl.add(() => stage.applyState(ID, n), settle);
};

const transitions = {
  // beat 2 — the record recedes to the legacy's deep dim and the table rises
  // over it: `.s2o-rail`'s own 800ms out, and the legacy's own arrival (kicker
  // at 800ms, the grid's 900/1100ms rise). Gold's gain settles into the record
  // beneath as its landing leaves.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, stage.states[ID][1].rail, { at: 0, camera: false });
    tl.add(() => {
      stage.grid.applyState(0, { live: false });
      setVisible(stage.survKicker, true);
      stage.gridWrap.dataset.visible = 'true';
    }, 0.35);
    tl.add(() => stage.applyState(ID, 1), 1.9);
  },

  // beats 3–7 — the waves, one per advance: gases drift, corrosion sweeps, the
  // radioactive row pulses out, the shapeless settle, the furnace decides.
  // Settle times cover each wave's own auto-timing.
  2: wave(2, 3.3),
  3: wave(3, 2.7),
  4: wave(4, 2.3),
  5: wave(5, 2.1),
  6: wave(6, 2.6),

  // beat 8 — the table gives the stage back to the record: the elimination
  // clears, the rail comes back up out of its deep dim, and the answer lands
  // at the station it was about. GOLD crowned.
  7: (mod, stage) => {
    const st = stage.states[ID][7];
    const tl = stage.timeline();
    tl.to([stage.survKicker, stage.gridWrap, ...stage.waveLines, stage.verdict],
      { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, st.rail, { at: 0.35 });
    stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), 1.7);
    tl.add(() => stage.applyState(ID, 7), 2.9);
  },

  // beat 9 — the mass state. The record recedes again and the counted load
  // stacks course by course — one, four, twelve — the growth arithmetic and
  // unarguable; the baseline draws on, the three stations land left to right.
  8: (mod, stage) => {
    const refs = stage.buildMassDiagram();
    const len = GEOM.mass.lineX[1] - GEOM.mass.lineX[0];
    refs.baseline.setAttribute('stroke-dasharray', String(len));
    refs.baseline.setAttribute('stroke-dashoffset', String(len));
    refs.stations.forEach((s) => {
      s.dot.setAttribute('opacity', '0');
      gsap.set(s.label, { opacity: 0 });
      gsap.set(s.marks, { opacity: 0, y: 12 });
    });

    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, stage.states[ID][8].rail, { at: 0, camera: false });
    tl.to(refs.baseline, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.out' }, 0.6);
    refs.stations.forEach((s, i) => {
      const at = 1.1 + i * 0.55;
      tl.add(() => s.dot.setAttribute('opacity', '1'), at);
      tl.to(s.label, { opacity: 1, duration: 0.4, ease: 'power1.out' }, at + 0.05);
      tl.to(s.marks, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.07 }, at + 0.15);
    });
    stage.railBlock(tl, stage.stmtEls[0],
      () => stage.railStatement(stage.states[ID][8], 0), 3.0, { rise: 10, dur: 0.6 });
    tl.add(() => stage.applyState(ID, 8), 4.2);
  }
};

// The return seam, played by Scene 7's morph: the mass state clears, the rail
// comes back up, and the overlay's answer lands as GOLD's dependency note at
// full voice — the state the sheet records as `s6-b9-return`.
export function railReturn(stage, tl, at = 0) {
  const st = stage.states[ID][S6_RETURN];
  tl.to([stage.diagSvg, stage.diagEls],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, at);
  stage.railTo(tl, st.rail, {
    at: at + 0.45, camera: false, land: [['gold', 'row146']], arriveAt: 0
  });
  return at + 2.0;
}

export default makeSceneModule({
  id: ID,
  number: 6,
  title: 'Gold: Scarcity in Matter',
  entry,
  morphIn,
  transitions,
  notes: `[→] Gold. Before it was jewelry, before it was treasure, it was the answer to a question: what, in the physical world, is genuinely hard to make more of? Scarcity — in matter itself.

[→] Here's my favorite way to see how narrow that answer is. Forget history for a moment, and run the competition across every element that exists.

[→] The gases are out — your money should not float away.

[→] Everything that rusts, burns, or dissolves in water — out. That removes most of the table, including iron, and it’s why the rainstorm mattered.

[→] The radioactive row — out, for reasons I hope are obvious.

[→] And strip away what will not hold a shape — the metal that pours, the ones no fire of the age could work at all. What’s left is a small family: the noble metals, the ones that simply refuse to corrode.

[→] And now the furnace decides. The platinum group melts at temperatures no ancient furnace could reach, and hides in ores no ancient chemist could crack — which is why the world would not even meet one of them until 1803. Remember that; it has a part to play later. So: not culture, not politics — chemistry and the forge leave you two survivors: silver, and gold. Every civilization that could refine metals converged on the same two, without consulting each other. That is what convergence on properties looks like at planetary scale. And between the two, the scarcer one, the one that doesn’t tarnish at all, took the throne: gold won everything.

[→] So the claim had found its strongest body yet: hard to create, hard to destroy.

[→] But not hard to *move*. That is gold's own weakness, and it grows with success: the more value your claim represents, the more metal you must drag through the world to carry it. Watch what people built to escape that weight.`
});
