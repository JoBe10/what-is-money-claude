// Scene 6 — Gold: Scarcity in Matter (9 beats, the legacy pacing).
//
// The winner, studied. The gold study lands under the display rule; the
// stylized table rises and the periodic elimination runs EXACTLY as
// `2-05-two-survivors` performs it — one wave of eliminations per advance,
// each wave the ElementGrid's own auto-timed gesture, one wave line at a
// time, the verdict at the end (Ruling 3 struck, master §13; do not
// recompress it). Then the claim returns wearing its strongest body yet, and
// the mass state — the selected counted load — names gold's own weakness.
//
// The scene enters from Scene 5 on an authored cut-with-crossfade: the
// question changed ("why did the carrier keep changing?" → the winner's
// answer), so the composition clears as the study reveals — overlapping,
// never through black.
//
// Landed states — approved cells, by construction: s6-b1 … s6-b9, with
// b2–b7 the restored elimination and b9 the selected mass state carried
// from candidate A.

import { gsap } from 'gsap';
import { GEOM, COPY, setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'scarcity-in-matter';

function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    hideInstantly(stage.goldStudy, () => setVisible(stage.goldStudy, false));
    gsap.set(stage.studyStmtEl, { opacity: 0 });
  }, 0);
  tl.add(() => setVisible(stage.goldStudy, true), 0.25);
  tl.to(stage.studyStmtEl, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.85);
  tl.add(() => stage.applyState(ID, 0), 1.6);
}

// The cut from Scene 5: the through-line composition clears as the study
// reveals — the register's own 520ms — and the statement follows.
function morphIn(mod, stage) {
  stage.applyState('the-function-stayed', 7);
  const tl = stage.timeline();
  tl.add(() => {
    stage.shell.applyState({ visible: false });
    stage.claim.applyState({ visible: false });
  }, 0.05);
  tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.05);
  tl.add(() => setVisible(stage.goldStudy, true), 0.4);
  tl.add(() => {
    const [copy, styles] = GEOM.studyStatement(COPY.scarcity);
    stage.setText(stage.studyStmtEl, copy, styles);
    gsap.set(stage.studyStmtEl, { opacity: 0, y: 8 });
  }, 0.95);
  tl.to(stage.studyStmtEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 1.0);
  tl.add(() => stage.applyState(ID, 0), 1.8);
}

// One elimination wave, exactly as the legacy performs it: the grid's own
// live wave, exactly one wave line visible, the verdict with the furnace.
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
  // beat 2 — the study yields and the table rises: the legacy's own
  // arrival (kicker at 800ms, the grid's 900/1100ms rise).
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.goldStudy, false), 0.05);
    tl.to(stage.studyStmtEl, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0.05);
    tl.add(() => {
      stage.grid.applyState(0, { live: false });
      setVisible(stage.survKicker, true);
      stage.gridWrap.dataset.visible = 'true';
    }, 0.35);
    tl.add(() => stage.applyState(ID, 1), 1.9);
  },

  // beats 3–7 — the waves, one per advance: gases drift, corrosion sweeps,
  // the radioactive row pulses out, the shapeless settle, the furnace
  // decides. Settle times cover each wave's own auto-timing.
  2: wave(2, 3.3),
  3: wave(3, 2.7),
  4: wave(4, 2.3),
  5: wave(5, 2.1),
  6: wave(6, 2.6),

  // beat 8 — the elimination gives the stage back to the claim: the table
  // recedes and the through-line composition returns, the carrier named for
  // the first time by the winner it became.
  7: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.survKicker, stage.gridWrap, ...stage.waveLines, stage.verdict],
      { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.05);
    tl.add(() => stage.claim.applyState({ visible: true }), 0.55);
    tl.add(() => stage.shell.applyState({ visible: true }), 0.75);
    tl.add(() => {
      stage.setText(stage.claimLabelEl, 'GOLD', GEOM.claimLabel(1));
      gsap.set(stage.claimLabelEl, { opacity: 0 });
    }, 0.8);
    tl.to(stage.claimLabelEl, { opacity: 1, duration: 0.5, ease: 'power1.out' }, 0.85);
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.hardCreate, 812, 46, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 1.25);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.3);
    tl.add(() => stage.applyState(ID, 7), 2.2);
  },

  // beat 9 — the mass state draws: the baseline draws on, the three
  // stations land left to right, and the counted load stacks course by
  // course — one, four, twelve — the growth arithmetic and unarguable.
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
    tl.add(() => {
      stage.shell.applyState({ visible: false });
      stage.claim.applyState({ visible: false });
    }, 0.05);
    tl.to([stage.claimLabelEl, stage.stmtEls[0]],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.05);
    tl.to(refs.baseline, { attr: { 'stroke-dashoffset': 0 }, duration: 0.9, ease: 'power2.out' }, 0.6);
    refs.stations.forEach((s, i) => {
      const at = 1.1 + i * 0.55;
      tl.add(() => s.dot.setAttribute('opacity', '1'), at);
      tl.to(s.label, { opacity: 1, duration: 0.4, ease: 'power1.out' }, at + 0.05);
      tl.to(s.marks, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', stagger: 0.07 }, at + 0.15);
    });
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.massGrows, 848, 40, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 10 });
    }, 3.55);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 3.6);
    tl.add(() => stage.applyState(ID, 8), 4.4);
  }
};

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
