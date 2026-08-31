// Scene 10 — The Trade-Off Keeps Moving (5 beats).
//
// The act's own recapitulation, and the last leg of the claim's journey. The
// scene morphs in from Scene 9 — the idea persists; the word "architecture"
// crosses the boundary intact — and the strip is STAGED RATHER THAN STATED:
// the line draws, the held claim enters at its left end, and it WALKS THE
// STRIP, lighting one station at a time, the station it leaves receding to the
// prior step behind it. At BITCOIN the traveler rises into the newest body and
// is absorbed. That is the arrival: the disc has worn every good on that line,
// which is exactly why it is never a station — it is the thing moving along it
// (the CERTIFICATE ruling, 31 August 2026).
//
// Then palladium — `3-05`'s frame ported with its real sourced figures and its
// two-epoch honesty, standing against the strip as the bar it must clear — and
// the pivot that opens Act III.
//
// PORTS MOVE LIKE THEY ALWAYS DID. The palladium frame arrives in the legacy's
// own `[data-visible]` reveals off the slide root the stage carries, and the
// epoch lines settle back by the legacy's own `data-step` rule; the strip's
// drawn sentence beneath the band is EvolutionRail's rhythm, unchanged.
//
// Landed states — approved cells, by construction: s10-b1 … s10-b5, with b1
// and b2 the certificate strip re-rendered by the §1.1 ruling.

import { gsap } from 'gsap';
import { GEOM, COPY, STATIONS, setVisible, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'the-trade-off-keeps-moving';

const S = GEOM.strip;
// The traveler rides the line at the claim's own 116, and the labels land
// behind it — so the disc never crosses a word it has not passed.
const RIDE_Y = S.y;
// The receded voices are the approved cell's own arithmetic, so a station that
// recedes during the walk lands on exactly what applyState will write.
const RECEDED = { name: 0.58, gain: 0.75 * 0.55, dep: 0.58 * 0.55, photo: 0.58 };

const rowsOf = (stage, i) => [stage.stripNames[i], stage.stripGains[i], stage.stripDeps[i]];

// One station activating: the good lights on the band, its marker takes the
// line, and the gain and dependency land beneath — behind the traveler.
function lightStation(stage, tl, i, at) {
  const s = STATIONS[i];
  const x = S.xs[i];
  tl.add(() => {
    stage.setBox(stage.stripPhotos[i], S.box(s.key, x));
    stage.stripPhotos[i].style.opacity = '0';
    stage.setDot(stage.stripDots[i], x, S.y, 6, 0.85);
    gsap.set(stage.stripDots[i], { opacity: 0 });
    stage.setText(stage.stripNames[i], s.key === 'paper' ? S.claimLabel : s.name,
      S.nameStyle(x, true));
    stage.setText(stage.stripGains[i], s.gain, S.gainStyle(x, 1));
    stage.setText(stage.stripDeps[i], s.dep, S.depStyle(x, 1));
    gsap.set(rowsOf(stage, i), { opacity: 0, y: 8 });
  }, at);
  tl.to(stage.stripPhotos[i], { opacity: 1, duration: 0.5, ease: 'power1.out' }, at + 0.05);
  tl.to(stage.stripDots[i], { opacity: 1, duration: 0.3, ease: 'power1.out' }, at + 0.1);
  tl.to(rowsOf(stage, i),
    { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.1 }, at + 0.42);
}

// And one receding as the claim moves on — the §9.4 rule 10 step, which on
// this strip is carried entirely in the color alpha.
function recedeStation(stage, tl, i, at) {
  const x = S.xs[i];
  tl.to(stage.stripNames[i],
    { color: `rgba(255,255,255,${RECEDED.name})`, duration: 0.5, ease: 'power1.inOut' }, at);
  tl.to(stage.stripGains[i],
    { color: `rgba(255,255,255,${RECEDED.gain})`, duration: 0.5, ease: 'power1.inOut' }, at);
  tl.to(stage.stripDeps[i],
    { color: `rgba(255,255,255,${RECEDED.dep})`, duration: 0.5, ease: 'power1.inOut' }, at);
  tl.to(stage.stripPhotos[i],
    { opacity: RECEDED.photo, duration: 0.5, ease: 'power1.inOut' }, at);
  tl.add(() => stage.setDot(stage.stripDots[i], x, S.y, 6, 0.5), at + 0.25);
}

// THE WALK — the strip staged, and the claim's arrival with it.
function stageStrip(stage, tl, at) {
  tl.add(() => {
    stage.stripLine.setAttribute('opacity', '0');
    stage.stripDots.forEach((d) => stage.setDot(d, 0, 0, 0, 0));
    stage.stripPhotos.forEach((el) => { el.style.opacity = '0'; });
    [...stage.stripNames, ...stage.stripGains, ...stage.stripDeps]
      .forEach((el) => stage.hideText(el));
    stage.setTraveler(S.lineX[0], RIDE_Y, 0);
  }, at);
  stage.drawSeg(tl, stage.stripLine, at + 0.05, 0.85, 'power2.out',
    [S.lineX[0], S.y, S.lineX[1], S.y, 0.18, 2]);
  // The claim enters where the line begins.
  tl.to(stage.traveler, { opacity: 1, duration: 0.4, ease: 'power1.out' }, at + 0.65);

  let t = at + 1.05;
  S.xs.forEach((x, i) => {
    tl.to(stage.traveler, {
      left: `${x - 58}px`, duration: i === 0 ? 0.5 : 0.7, ease: 'power2.inOut'
    }, t);
    const arrive = t + (i === 0 ? 0.5 : 0.7);
    lightStation(stage, tl, i, arrive);
    if (i < S.live) {
      // It moves on, and what it leaves behind settles to the prior step.
      recedeStation(stage, tl, i, arrive + 1.2);
      t = arrive + 1.2;
    } else {
      // The last body: the claim rises into it and is absorbed.
      const box = S.box(STATIONS[i].key, x);
      tl.to(stage.traveler, {
        top: `${box[1] + box[3] / 2 - 58}px`, opacity: 0,
        duration: 0.85, ease: 'power2.inOut'
      }, arrive + 0.15);
      t = arrive + 1.1;
    }
  });
  return t + 0.5;
}

function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  const settle = stageStrip(stage, tl, 0.1);
  tl.add(() => stage.applyState(ID, 0), settle);
}

// The morph from Scene 9: the distinction clears, and the whole architecture
// is laid on one line — the four bodies the claim has worn, in order.
function morphIn(mod, stage) {
  stage.applyState('scarcity-becomes-digital', 4);
  const tl = stage.timeline();
  tl.to([stage.stmtEls[0], stage.stmtEls[1]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  const settle = stageStrip(stage, tl, 0.55);
  tl.add(() => stage.applyState(ID, 0), settle);
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
  // beat 2 — the history line, on the strip it names.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      const [copy, styles] = GEOM.statement(COPY.historyLine, 866, 44, 1);
      stage.setText(stage.stmtEls[0], copy, styles);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 0.05);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.1);
    tl.add(() => stage.applyState(ID, 1), 1.1);
  },

  // beat 3 — PALLADIUM, against the strip. The strip clears entirely: the bar
  // has to be judged on its own figures, not read off the line it is testing.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([...stage.stripPhotos, ...stage.stripNames, ...stage.stripGains,
      ...stage.stripDeps, stage.stmtEls[0]],
    { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 0.05);
    tl.to([stage.stripLine, ...stage.stripDots],
      { attr: { opacity: 0 }, duration: 0.45, ease: 'power1.inOut' }, 0.05);
    landPalladium(stage, tl, 0.7);
    tl.add(() => stage.applyState(ID, 2), 4.1);
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

  // beat 5 — the pivot that opens Act III, alone on cleared black.
  4: (mod, stage) => {
    const tl = stage.timeline();
    const P = stage.palladium;
    tl.add(() => {
      [P.hook, P.chart, P.timing, P.narrowed, P.bar].forEach((el) => setVisible(el, false));
    }, 0.05);
    tl.add(() => {
      stage.chartRoot(null);
      P.wrap.style.display = 'none';
      stage.setText(stage.stmtEls[0], GEOM.question[0], GEOM.question[1]);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
    }, 0.95);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.75, ease: 'power2.out' }, 1.0);
    tl.add(() => stage.applyState(ID, 4), 2.0);
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
