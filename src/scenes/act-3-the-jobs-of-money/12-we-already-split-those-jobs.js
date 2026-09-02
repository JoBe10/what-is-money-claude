// Scene 12 — We Already Split Those Jobs (4 beats, the reverted PORT staging).
//
// The split begins over the receded home frame: the triad settles to the
// overlay grammar's still voice (0.35, the disc receding at its center with
// it) and the three column heads land empty — PRICED IN · PAID IN · SAVED IN.
// Then the home frame gives the stage to the columns: the household row fills
// them in the legacy word register; Argentina arrives THE LEGACY WAY — the
// row landing in the columns under the legacy kicker, exactly as `3-02`
// build 2 performs it (the r2 Argentina revert: the five-decade span and the
// every-stripe clause ride the spoken beat, not a block); and the principle
// lands in the legacy's own slot.
//
// MOTION IS TRANSCRIBED. `3-02` animates by dataset choreography — heads,
// kicker, cells and principle each carry their reveal in the stylesheet
// (800/900ms, the cells' 120/240ms column stagger under `data-live`). The
// one gesture the legacy never performed — the household row giving way to
// the Argentina row, a seam the installed beat map creates — is composed
// from the legacy's own vocabulary: the standing row clears, and the
// incoming row plays the cells' own arrival, kicker alongside, exactly as
// build 2 stages it.
//
// Landed states — the approved cells s12-b1 … s12-b4, by construction.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { setVisible, hideInstantly } from './_jobsStage.js';

const ID = 'we-already-split-those-jobs';

// The heads' own landing (3-02 build 1): the three columns rise together.
function landHeads(stage, tl, at) {
  tl.add(() => stage.heads.forEach((h) => setVisible(h, true)), at);
}

// The seam from Scene 11 — one world: the home frame recedes to the overlay
// grammar's still voice (the continuity line clearing with the beat) and the
// empty heads land over it.
function morphIn(mod, stage) {
  stage.applyState('three-familiar-jobs', 4);
  const tl = stage.timeline();
  tl.to(stage.continuity, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.1);
  tl.to(stage.triadLayer, { opacity: 0.35, duration: 0.9, ease: 'power1.inOut' }, 0.25);
  tl.add(() => {
    stage.splitLayer.style.display = '';
    stage.splitLayer.style.opacity = '1';
  }, 0.5);
  landHeads(stage, tl, 0.55);
  tl.add(() => stage.applyState(ID, 0), 1.8);
}

// Cold entry at beat 1: the receded home frame stands; the heads play their
// own arrival over it.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    stage.heads.forEach((h) => hideInstantly(h, () => setVisible(h, false)));
  }, 0.1);
  landHeads(stage, tl, 0.22);
  tl.add(() => stage.applyState(ID, 0), 1.4);
}

// A row arrives in the columns — the legacy build-2 gesture: content set,
// `data-live` on so the columns stagger (120/240ms), the cells' own
// 800/900ms rise carrying them.
function landCells(stage, tl, kind, at, { kicker = false } = {}) {
  tl.add(() => {
    stage.setCellsContent(kind);
    stage.splitLayer.dataset.live = 'true';
    stage.cells.forEach((c) => {
      hideInstantly(c, () => setVisible(c, false));
    });
    gsap.set(stage.cells, { clearProps: 'opacity' });
  }, at);
  tl.add(() => {
    stage.cells.forEach((c) => setVisible(c, true));
    if (kicker) setVisible(stage.splitKicker, true);
  }, at + 0.12);
}

const transitions = {
  // beat 2 — the household fill: you may already live the split. The home
  // frame gives the stage to the columns as the row lands.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.triadLayer, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 0.1);
    landCells(stage, tl, 'household', 0.45);
    tl.add(() => stage.applyState(ID, 1), 2.0);
  },

  // beat 3 — Argentina lands the legacy way: the household row clears, and
  // the Argentina row arrives in the columns under the legacy kicker —
  // 3-02 build 2's own composition, cells and citation together.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.cells, { opacity: 0, duration: 0.35, ease: 'power1.inOut', stagger: 0.05 }, 0.1);
    landCells(stage, tl, 'argentina', 0.62, { kicker: true });
    tl.add(() => stage.applyState(ID, 2), 2.2);
  },

  // beat 4 — the principle, in the legacy's own slot at full voice.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.principle, true), 0.12);
    tl.add(() => stage.applyState(ID, 3), 1.3);
  }
};

export default makeSceneModule({
  id: ID,
  number: 12,
  title: 'We Already Split Those Jobs',
  entry,
  morphIn,
  transitions,
  notes: `[→] Now, here's the thing almost every explanation of money skips: nothing says one good has to do all three jobs. And when a money starts failing at one of them, people don't write essays about it — they quietly split the jobs up.

[→] You may already live this without noticing: paid in one money, your home priced in it — and your savings somewhere else entirely: property, shares, gold. Three jobs, quietly drifting apart.

[→] Argentina has been the world's clearest demonstration for fifty years. Apartments are priced and sold in dollars. Daily life is paid in pesos. And savings go into dollars and real estate — Argentines literally call it "saving in bricks," buying a floor at a time as the money comes in, because the bricks hold what the peso cannot. Three jobs, three different goods. And before anyone reads politics into it: this pattern has persisted across administrations of every stripe — left, right, military, civilian. It isn't a story about one government. It's what people *do* when one job of their money breaks.

[→] So hold this as a principle, because we'll need it twice more: the jobs are separable — across goods, and across time. Which means a good can be money in one job before it's money in the others. And that raises the obvious next question: is there an order?`
});
