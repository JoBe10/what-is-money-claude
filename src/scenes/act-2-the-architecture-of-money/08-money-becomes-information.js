// Scene 8 — Fiat: Money Becomes Information (5 beats).
//
// The receipt idea followed all the way, and what it cost — on the rail.
//
// THE DISSOLVE, RESTAGED. The ported dissolve was a crossfade inside a study
// box: the paper claim becoming the glowing ledger entry. On the rail the same
// sentence is said by the record itself, and it is said more exactly. The
// certificate's dependency arc — the one thing on screen asserting that the
// paper still owes gold — RELEASES, on the register's own 520 ms with the
// outgoing form let go 180 ms late, the exact mechanism `.p1-form` ships; the
// note it carried gives way to the named trade in the station's own rows; and
// the LEDGER station rises to the right of it as the rail returns. The claim
// stops being a thing and becomes an entry, and the frame never dips to black
// between the two.
//
// Then 1971 in the dated-fact grammar AT THE LEDGER STATION — the ship's own
// treatment, three scenes on — with gold and its claim dimming together:
// captured, not beaten. Then `2-07`'s chart ported whole over the deep-dimmed
// record, the rail returning with the residue noted as the ledger's own
// dependency row, and the measured wound over the receded rail.
//
// Landed states — the approved r2 cells, by construction: s8-b1 … s8-b5, with
// `s8-b4-return` one state past the last beat, the rail returned with the
// residue landed, which beat 5 launches from (`_railStates.js`).

import { gsap } from 'gsap';
import { setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';
import { S8_RETURN } from './_railStates.js';

const ID = 'money-becomes-information';

// The dark-field register's own reveal, and the release the dissolve is built
// on — the values `.p1-form[data-visible="false"]` ships.
const REVEAL = 0.52;
const RELEASE = 0.18;

// LEDGER arrives: the camera opens right to the new head, the line extends,
// the station comes up at the legacy stop's own 800ms, and MONEY BECAME
// INFORMATION lands at it.
function arriveLedger(mod, stage, tl, at = 0) {
  const st = stage.states[ID][0];
  stage.railTo(tl, st.rail, { at, grow: true });
  stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), at + 2.0);
}

function entry(mod, stage) {
  const tl = stage.timeline();
  arriveLedger(mod, stage, tl, 0);
  tl.add(() => stage.applyState(ID, 0), 3.1);
}

// THE DISSOLVE. The morph from Scene 7: the trade's two lines clear, the
// dependency arc releases — the paper's claim on gold dematerializing — and
// the ledger rises as the rail returns.
function morphIn(mod, stage) {
  stage.applyState('claims-on-gold', 4);
  const tl = stage.timeline();
  tl.to([stage.stmtEls[0], stage.stmtEls[1]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  tl.to([stage.railWorld.depPath, ...stage.railWorld.depDots],
    { opacity: 0, duration: REVEAL, ease: 'power1.out' }, 0.05);
  arriveLedger(mod, stage, tl, REVEAL + RELEASE);
  tl.add(() => stage.applyState(ID, 0), REVEAL + RELEASE + 3.1);
}

const transitions = {
  // beat 2 — the honest strengths land at the station, and INSTANT TRANSFER
  // settles into the record beneath them.
  1: (mod, stage) => {
    const st = stage.states[ID][1];
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, st.rail, {
      at: 0.2, camera: false, land: [['ledger', 'row64']], arriveAt: 0
    });
    stage.railBlock(tl, stage.railLandEls[0], () => stage.railLanding(st), 1.5);
    tl.add(() => stage.applyState(ID, 1), 2.6);
  },

  // beat 3 — 1971, the featured moment at the LEDGER station. The camera lifts
  // to make room beneath, gold and its claim dim together as the redemption
  // they stood on is cancelled, and the decree lands in the dated-fact
  // grammar's own reveal character: the date first, the consequence after.
  2: (mod, stage) => {
    const st = stage.states[ID][2];
    const tl = stage.timeline();
    tl.to(stage.railLandEls[0], { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, st.rail, { at: 0 });
    tl.add(() => {
      const ev = stage.railDatedFact(st);
      gsap.set(ev.date, { opacity: 0, y: 12 });
      gsap.set(ev.fact, { opacity: 0, y: 10 });
    }, 0.9);
    tl.to(stage.evDate, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 1.0);
    tl.to(stage.evFact, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.75);
    tl.add(() => stage.applyState(ID, 2), 3.4);
  },

  // beat 4 — THE RECORD. The dated fact clears, the rail recedes to the
  // legacy's deep dim, and the ported chart arrives in the legacy's own reveal
  // — the slide root claimed first, because the series labels are a
  // `data-step` rule and the port is not the port without it.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.evDate, stage.evFact],
      { opacity: 0, duration: 0.45, ease: 'power1.inOut' }, 0);
    stage.railTo(tl, stage.states[ID][3].rail, { at: 0 });
    tl.add(() => {
      stage.chartRoot('severance', 4);
      hideInstantly(stage.sevChart.chart, () => {
        stage.sevChart.chart.style.display = '';
        setVisible(stage.sevChart.chart, false);
      });
    }, 0.6);
    tl.add(() => setVisible(stage.sevChart.chart, true), 0.7);
    tl.add(() => stage.applyState(ID, 3), 2.4);
  },

  // beat 5 — the return, then the measured wound. The chart clears and the
  // rail comes back with the residue noted at the LEDGER station — the
  // chart's slope becoming one line of the record — and only then does the
  // record recede again under the sentence that names it.
  4: (mod, stage) => {
    const st = stage.states[ID][4];
    const ret = stage.states[ID][S8_RETURN];
    const tl = stage.timeline();
    tl.add(() => setVisible(stage.sevChart.chart, false), 0.05);
    tl.add(() => {
      stage.chartRoot(null);
      stage.sevChart.chart.style.display = 'none';
    }, 0.7);
    stage.railTo(tl, ret.rail, {
      at: 0.5, camera: false, land: [['ledger', 'row146']], arriveAt: 0
    });
    stage.railTo(tl, st.rail, { at: 2.0 });
    stage.railBlock(tl, stage.stmtEls[0], () => stage.railStatement(st, 0), 2.6);
    tl.add(() => stage.applyState(ID, 4), 3.9);
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
