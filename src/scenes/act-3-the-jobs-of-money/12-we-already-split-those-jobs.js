// Scene 12 — We Already Split Those Jobs (3 beats, the reverted PORT staging
// under the Batch C r2 rulings 1 and 2, the Act III final ruling 1, and the
// Acts III–IV final ruling 1 of 3 Sep 2026, master §13).
//
// THE CLEAN HANDOFF (r2 ruling 1): the triad completes its recede BEFORE the
// column heads land — the home frame fades out fully and leaves the paint
// tree, and the three heads arrive empty on clean black: PRICED IN · PAID IN
// · SAVED IN. No element of the triad remains under the columns. THE
// HOUSEHOLD IS SPOKEN, NOT STAGED (the Acts III–IV final ruling 1): the
// household sentence rides beat 1 as the empty columns land, and the
// text-only household row is retired to file (s12-b2-household). Then
// Argentina arrives THE LEGACY WAY — the row landing in the columns under the
// legacy kicker, exactly as `3-02` build 2 performs it, WITH ITS OBJECTS
// (r2 ruling 2): the usd and ars renders — and the register's real-estate
// render at the saved column — riding inside the cells at the band scale, so
// the legacy arrival carries the objects as one landing; and the principle
// lands in the legacy's own slot.
//
// MOTION IS TRANSCRIBED. `3-02` animates by dataset choreography — heads,
// kicker, cells and principle each carry their reveal in the stylesheet
// (800/900ms, the cells' 120/240ms column stagger under `data-live`). With
// the household row gone, the scene's beats are the legacy slide's own three
// builds: the heads, the Argentina row with its kicker, the principle. The
// recede that precedes the heads is the overlay grammar's own 800ms opacity
// move, run to zero.
//
// Landed states — the approved cells s12-b1 … s12-b3 (s12-b2 and s12-b3 the
// approved Argentina and principle cells, their bytes carried under the new
// beat numbers), by construction.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { setVisible, hideInstantly } from './_jobsStage.js';

const ID = 'we-already-split-those-jobs';

// The heads' own landing (3-02 build 1): the three columns rise together.
function landHeads(stage, tl, at) {
  tl.add(() => stage.heads.forEach((h) => setVisible(h, true)), at);
}

// The seam from Scene 11 — one world, handed off clean (r2 ruling 1): the
// continuity line clears, the whole home frame completes its recede to
// black and leaves the paint tree, and only then do the empty heads land.
function morphIn(mod, stage) {
  stage.applyState('three-familiar-jobs', 4);
  const tl = stage.timeline();
  tl.to(stage.continuity, { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.1);
  tl.to(stage.triadLayer, { opacity: 0, duration: 0.9, ease: 'power1.inOut' }, 0.25);
  tl.add(() => {
    stage.triadLayer.style.display = 'none';
    stage.splitLayer.style.display = '';
    stage.splitLayer.style.opacity = '1';
  }, 1.2);
  landHeads(stage, tl, 1.3);
  tl.add(() => stage.applyState(ID, 0), 2.5);
}

// Cold entry at beat 1: the heads play their own arrival over black.
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
  // beat 2 — Argentina lands the legacy way: the row arrives in the empty
  // columns under the legacy kicker — 3-02 build 2's own composition, cells
  // and citation together, the ruled objects riding inside the cells' own
  // arrival.
  1: (mod, stage) => {
    const tl = stage.timeline();
    landCells(stage, tl, 'argentina', 0.2, { kicker: true });
    tl.add(() => stage.applyState(ID, 1), 1.75);
  },

  // beat 3 — the principle, in the legacy's own slot at full voice.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.principle, true), 0.12);
    tl.add(() => stage.applyState(ID, 2), 1.3);
  }
};

export default makeSceneModule({
  id: ID,
  number: 12,
  title: 'We Already Split Those Jobs',
  entry,
  morphIn,
  transitions,
  notes: `[→] Now, here's the thing almost every explanation of money skips: nothing says one good has to do all three jobs. And when a money starts failing at one of them, people don't write essays about it — they quietly split the jobs up. You may already live this without noticing: paid in one money, your home priced in it — and your savings somewhere else entirely: property, shares, gold. Three jobs, quietly drifting apart.

[→] Argentina has been the world's clearest demonstration for fifty years. Apartments are priced and sold in dollars. Daily life is paid in pesos. And savings go into dollars and real estate — Argentines literally call it "saving in bricks," buying a floor at a time as the money comes in, because the bricks hold what the peso cannot. Three jobs, three different goods. And before anyone reads politics into it: this pattern has persisted across administrations of every stripe — left, right, military, civilian. It isn't a story about one government. It's what people *do* when one job of their money breaks.

[→] So hold this as a principle, because we'll need it twice more: the jobs are separable — across goods, and across time. Which means a good can be money in one job before it's money in the others. And that raises the obvious next question: is there an order?`
});
