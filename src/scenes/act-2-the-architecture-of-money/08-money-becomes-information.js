// Scene 8 — Fiat: Money Becomes Information (5 beats).
//
// The receipt idea followed all the way, and what it cost. The scene morphs in
// from Scene 7 on THE PORTED DISSOLVE — P1's five-form cross-dissolve, whose
// two frames the provenance map names as already approved (`p1-b6` →
// `p1-b7-glow` IS paper → `ledger_glow`): the paper claim takes the study box,
// and the glowing ledger entry rises through it while the paper releases a
// beat later, so the frame never dips to black between two objects. Money
// becomes information on screen rather than in a sentence.
//
// Then 1971 in the evidence grammar's second specimen, the capture named in
// the pattern slide's own words, `2-07`'s chart ported whole with the frozen
// data untouched, and the two balance lines that leave the wound standing.
//
// PORTS MOVE LIKE THEY ALWAYS DID. The dissolve is the dark-field register's
// own 520 ms reveal with the outgoing form released 180 ms late — the exact
// mechanism `.p1-form[data-visible="false"]` ships. The chart's arrival is the
// legacy's own `[data-visible]` reveal off the slide root it carries.
//
// Landed states — approved cells, by construction: s8-b1 … s8-b5.

import { gsap } from 'gsap';
import { GEOM, COPY, setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'money-becomes-information';

// The register's own reveal, and the release the morph is built on.
const REVEAL = 0.52;
const RELEASE = 0.18;

// The evidence grammar landing, in the severance's own reveal character: the
// date rises first, the consequence follows. Shared by the cold entry and the
// beat-2 gesture so the specimen lands the same way either way.
function landEvidence(stage, tl, at) {
  tl.add(() => {
    const ev = GEOM.evidence('severance');
    stage.setText(stage.evDate, ev.date[0], ev.date[1]);
    stage.setText(stage.evFact, ev.fact[0], ev.fact[1]);
    gsap.set(stage.evDate, { opacity: 0, y: 12 });
    gsap.set(stage.evFact, { opacity: 0, y: 10 });
  }, at);
  tl.to(stage.evDate, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, at + 0.1);
  tl.to(stage.evFact, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, at + 0.85);
}

function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    hideInstantly(stage.ledgerStudy, () => setVisible(stage.ledgerStudy, false));
    gsap.set(stage.studyStmtEl, { opacity: 0 });
  }, 0);
  tl.add(() => setVisible(stage.ledgerStudy, true), 0.25);
  tl.to(stage.studyStmtEl, { opacity: 1, duration: 0.55, ease: 'power2.out' }, 0.85);
  tl.add(() => stage.applyState(ID, 0), 1.6);
}

// THE DISSOLVE. The morph from Scene 7: the trade's two lines clear, the paper
// claim takes the approved study box — the thing Scene 7 just sent out of the
// vault — and the ledger entry rises through it as the paper releases. The
// idea persists all the way through; only its body stops being a thing.
function morphIn(mod, stage) {
  stage.applyState('claims-on-gold', 4);
  const tl = stage.timeline();
  tl.add(() => {
    hideInstantly(stage.certForm, () => setVisible(stage.certForm, false));
    hideInstantly(stage.ledgerStudy, () => setVisible(stage.ledgerStudy, false));
    gsap.set(stage.studyStmtEl, { opacity: 0 });
  }, 0);
  tl.to([stage.stmtEls[0], stage.stmtEls[1]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  // SEAM STOPGAP, SESSION 1. Scene 7 now hands over a rail world and Scene 8
  // does not join it until Session 2, so the record is released here on the
  // same `.s2o-rail` 800ms it recedes on everywhere else rather than cutting
  // out under the dissolve. Session 2 replaces this with the LEDGER station's
  // own arrival, which is where the dissolve actually belongs.
  tl.to(stage.railWorld.el, { opacity: 0, duration: 0.8, ease: 'power1.out' }, 0.05);
  // The paper claim arrives in the forms' own box...
  tl.add(() => setVisible(stage.certForm, true), 0.5);
  // ...and the ledger rises through it, the paper released a beat later.
  tl.add(() => setVisible(stage.ledgerStudy, true), 0.5 + REVEAL + 0.5);
  tl.add(() => setVisible(stage.certForm, false), 0.5 + REVEAL + 0.5 + RELEASE);
  tl.add(() => {
    const [copy, styles] = GEOM.studyStatement(COPY.becameInformation);
    stage.setText(stage.studyStmtEl, copy, styles);
    gsap.set(stage.studyStmtEl, { opacity: 0, y: 8 });
  }, 2.15);
  tl.to(stage.studyStmtEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 2.2);
  tl.add(() => stage.applyState(ID, 0), 3.0);
}

const transitions = {
  // beat 2 — the study yields to the dated fact: 1971, alone, in the grammar
  // the Zanzibar receipt established three scenes earlier.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.ledgerStudy, false), 0.05);
    tl.to(stage.studyStmtEl, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0.05);
    landEvidence(stage, tl, 0.5);
    tl.add(() => stage.applyState(ID, 1), 2.4);
  },

  // beat 3 — the capture, named: the record clears and the sentence lands on
  // the black it leaves. This is the beat the whole history turns on, so it
  // gets the frame to itself.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.evDate, stage.evFact],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0.05);
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.captured, 430, 46, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 0.6);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.65);
    tl.add(() => stage.applyState(ID, 2), 1.6);
  },

  // beat 4 — THE RECORD. The sentence clears and the ported chart arrives in
  // the legacy's own reveal — the slide root claimed first, because the series
  // labels are a `data-step` rule and the port is not the port without it.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.stmtEls[0], { opacity: 0, duration: 0.45, ease: 'power1.in' }, 0.05);
    tl.add(() => {
      stage.chartRoot('severance', 4);
      hideInstantly(stage.sevChart.chart, () => {
        stage.sevChart.chart.style.display = '';
        setVisible(stage.sevChart.chart, false);
      });
    }, 0.5);
    tl.add(() => setVisible(stage.sevChart.chart, true), 0.6);
    tl.add(() => stage.applyState(ID, 3), 2.0);
  },

  // beat 5 — both facts on one screen: the chart clears and the pair lands
  // sequenced — the honest strength above, the measured wound below.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.sevChart.chart, false), 0.05);
    tl.add(() => {
      stage.chartRoot(null);
      stage.sevChart.chart.style.display = 'none';
      const a = GEOM.statement(COPY.mostAccepted, 434, 46, 0.72);
      stage.setText(stage.stmtEls[0], a[0], a[1]);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 10 });
      const b = GEOM.statement(COPY.residue, 566, 52, 1);
      stage.setText(stage.stmtEls[1], b[0], b[1]);
      gsap.set(stage.stmtEls[1], { opacity: 0, y: 10 });
    }, 0.85);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.9);
    tl.to(stage.stmtEls[1], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 1.5);
    tl.add(() => stage.applyState(ID, 4), 2.35);
  }
};

export default makeSceneModule({
  id: ID,
  number: 8,
  title: 'Fiat: Money Becomes Information',
  entry,
  morphIn,
  transitions,
  notes: `[→] First, see how far the receipt idea goes when you follow it all the way. The paper doesn't even need to exist — the vault can simply keep a ledger, and move your claim by moving a number. Money became information. And be honest about how good that is: payments have never been faster, cheaper, or easier to divide. Value moves at planetary scale, at the speed of a message.

[→] But the whole tower still stood on redemption — and the notes had been over-issued: spent into wars and programs far beyond the gold behind them. Other countries started showing up with dollars, asking for the metal. There wasn't enough. So in August 1971, the redemption window closed. Officially temporary; permanent ever since. Call it what the record shows: the issuer of the claims could not honor them, and cancelled them instead.

[→] And notice what that was *not*. In the free competition, monies fell when something categorically better arrived — metal over shell, coin over ingot. Gold was never out-competed. Nothing categorically better ever arrived. It was *captured*: its custody centralized into a few vaults, the claims on it over-issued, and when the claims came due, redemption was cancelled. The money that reigns today didn't win the competition. It ended it.

[→] So how has the new arrangement performed at the oldest job — carrying value through time? Here is what one unit of the major currencies still buys, measured from that year. Every line on this chart — including the strongest currency of the era, the Swiss franc — ends far below where it began. Not one government's scandal: every issuer, every continent, the same slope. That is not mismanagement. That is a structural property of the design.

[→] Both facts belong on one screen, because both are true: the reigning money is extraordinary at moving value — and measurably poor at storing it. Keep that exact wound in mind. And keep your eye on the ledger, because the story isn't done with it.`
});
