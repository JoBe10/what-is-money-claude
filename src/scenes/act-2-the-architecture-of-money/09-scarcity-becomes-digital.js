// Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats).
//
// The neutral register, held for a whole scene. Scene 8 ended by telling the
// viewer to keep an eye on the ledger, so the boundary is a morph and the
// ledger is what morphs: THE HUB DISSOLVES — the institution at the centre
// holds the record with its spokes out to the ring, then steps away as
// peer-to-peer chords form between the ring's own nodes. The two weights are
// the whole argument, and no word is on the frame.
//
// Then the entrant block, ported from `2-08` builds 5–6: the coin at its head
// (the display-scale glyph retirement of 31 August 2026, per C1), the name in
// stop typography, the facts — and the honesty ON ITS OWN ADVANCE at full
// voice while everything above it recedes to the prior step. That composition
// is why S9-F2 is a port: it makes "the honesty in the same breath" a
// composition rather than a hope. The scene closes on the two-question
// distinction, spoken over one line.
//
// ZERO ADJECTIVES OF ADVOCACY. Every string is the rail's own or the
// architecture's; the motion describes and never argues.
//
// Landed states — approved cells, by construction: s9-b1 … s9-b5, with b1 the
// presenter-selected network system carried from the systems sheet.

import { gsap } from 'gsap';
import { GEOM, COPY, hideInstantly } from './_architectureStage.js';
import { makeSceneModule } from './_sceneModule.js';

const ID = 'scarcity-becomes-digital';

const SPOKE_LIVE = 'rgba(255,255,255,0.35)';
const SPOKE_GONE = `rgba(255,255,255,${GEOM.net.spoke})`;
const HUB_LIVE = 'rgba(255,255,255,0.8)';
const HUB_GONE = 'rgba(255,255,255,0.3)';

// The formation, authored once and used by both entries: the institutional
// shape stands first, then its centre steps away while the mesh comes in.
function formNetwork(stage, tl, at) {
  const net = stage.net;
  tl.add(() => {
    net.g.style.display = '';
    gsap.set(net.g, { opacity: 1 });
    gsap.set(net.chords, { opacity: 0 });
    gsap.set([...net.spokes, net.hub, ...net.ring], { opacity: 0 });
    gsap.set(net.spokes, { stroke: SPOKE_LIVE });
    gsap.set(net.hub, { fill: HUB_LIVE });
  }, at);
  // The institution, holding the record.
  tl.to(net.hub, { opacity: 1, duration: 0.5, ease: 'power1.out' }, at + 0.05);
  tl.to(net.spokes, { opacity: 1, duration: 0.6, ease: 'power1.out', stagger: 0.03 }, at + 0.25);
  tl.to(net.ring, { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.03 }, at + 0.4);
  // The centre steps away...
  tl.to(net.hub, { fill: HUB_GONE, duration: 1.1, ease: 'power1.inOut' }, at + 1.25);
  tl.to(net.spokes, { stroke: SPOKE_GONE, duration: 1.1, ease: 'power1.inOut' }, at + 1.25);
  // ...and in its place, each node checking all the others.
  tl.to(net.chords, { opacity: 1, duration: 0.5, ease: 'power1.out', stagger: 0.035 }, at + 1.45);
}

// The entrant block's head, landing: the coin, the terminal dot, the name and
// the facts. Shared by the cold entry at beat 2 and the beat-2 gesture.
function landEntrantHead(stage, tl, at) {
  const E = GEOM.entrant;
  tl.add(() => {
    stage.setBox(stage.coinPhoto, E.coin);
    stage.coinPhoto.style.opacity = '0';
    stage.setDot(stage.entrantDot, ...E.dot);
    gsap.set(stage.entrantDot, { opacity: 0 });
    stage.setText(stage.entrantName, E.name, E.nameStyle);
    stage.setText(stage.entrantFacts, E.facts, E.factsStyle(1, false));
    gsap.set([stage.entrantName, stage.entrantFacts], { opacity: 0, y: 10 });
  }, at);
  tl.to(stage.coinPhoto, { opacity: 0.9, duration: 0.7, ease: 'power1.out' }, at + 0.05);
  tl.to(stage.entrantDot, { opacity: 1, duration: 0.4, ease: 'power1.out' }, at + 0.55);
  tl.to(stage.entrantName, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at + 0.65);
  tl.to(stage.entrantFacts, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, at + 0.95);
}

function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => hideInstantly(stage.net.g, () => { stage.net.g.style.display = 'none'; }), 0);
  formNetwork(stage, tl, 0.15);
  tl.add(() => stage.applyState(ID, 0), 3.6);
}

// The morph from Scene 8: "keep your eye on the ledger, because the story
// isn't done with it." The two balance lines clear and the ledger the scene
// just measured becomes the thing that changes shape.
function morphIn(mod, stage) {
  stage.applyState('money-becomes-information', 4);
  const tl = stage.timeline();
  tl.add(() => hideInstantly(stage.net.g, () => { stage.net.g.style.display = 'none'; }), 0);
  tl.to([stage.stmtEls[0], stage.stmtEls[1]],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
  formNetwork(stage, tl, 0.55);
  tl.add(() => stage.applyState(ID, 0), 4.0);
}

const transitions = {
  // beat 2 — the network yields to the entrant: the mesh clears and the block
  // lands, the coin first, the facts under it.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.net.g, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.05);
    tl.add(() => { stage.net.g.style.display = 'none'; }, 0.7);
    landEntrantHead(stage, tl, 0.55);
    tl.add(() => stage.applyState(ID, 1), 2.2);
  },

  // beat 3 — the three capabilities land on their own advance; the facts
  // settle back to the prior step (§9.4 rule 10) and the block lifts the 8px
  // the approved cells give it when the list arrives beneath.
  2: (mod, stage) => {
    const tl = stage.timeline();
    const E = GEOM.entrant;
    tl.add(() => {
      stage.setText(stage.entrantFacts, E.facts, E.factsStyle(0.42, true));
      gsap.set(stage.entrantFacts, { color: 'rgba(255,255,255,1)', y: 8 });
      E.capabilities.forEach((copy, i) => {
        stage.setText(stage.entrantCaps[i], copy, E.capStyle(1, i));
        gsap.set(stage.entrantCaps[i], { opacity: 0, y: 10 });
      });
    }, 0.05);
    tl.to(stage.entrantFacts,
      { color: 'rgba(255,255,255,0.42)', y: 0, duration: 0.55, ease: 'power1.inOut' }, 0.1);
    tl.to(stage.entrantCaps,
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.16 }, 0.45);
    tl.add(() => stage.applyState(ID, 2), 1.7);
  },

  // beat 4 — the honest line, in the same breath. The composition's whole
  // point: the limitation arrives at full voice while every row above it
  // recedes, so the honesty is the brightest thing on the frame.
  3: (mod, stage) => {
    const tl = stage.timeline();
    const E = GEOM.entrant;
    tl.add(() => {
      E.capabilities.forEach((copy, i) => {
        stage.setText(stage.entrantCaps[i], copy, E.capStyle(0.42, i));
        gsap.set(stage.entrantCaps[i], { color: 'rgba(255,255,255,1)' });
      });
      stage.setText(stage.entrantLimit, E.limitation, E.limitStyle(1));
      gsap.set(stage.entrantLimit, { opacity: 0, y: 10 });
    }, 0.05);
    tl.to(stage.entrantCaps,
      { color: 'rgba(255,255,255,0.42)', duration: 0.5, ease: 'power1.inOut' }, 0.1);
    tl.to(stage.entrantLimit,
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.45);
    tl.add(() => stage.applyState(ID, 3), 1.7);
  },

  // beat 5 — the distinction, on cleared black: the block clears and the two
  // lines land sequenced, the second at the quieter voice the cell gives it.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.coinPhoto, stage.entrantName, stage.entrantFacts,
      ...stage.entrantCaps, stage.entrantLimit],
    { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.05);
    tl.to(stage.entrantDot, { opacity: 0, duration: 0.4, ease: 'power1.inOut' }, 0.05);
    tl.add(() => {
      const a = GEOM.statement(COPY.twoQuestions, 430, 46, 1);
      stage.setText(stage.stmtEls[0], a[0], a[1]);
      gsap.set(stage.stmtEls[0], { opacity: 0, y: 12 });
      const b = GEOM.statement(COPY.volatility, 616, 40, 0.72);
      stage.setText(stage.stmtEls[1], b[0], b[1]);
      gsap.set(stage.stmtEls[1], { opacity: 0, y: 10 });
    }, 0.65);
    tl.to(stage.stmtEls[0], { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' }, 0.7);
    tl.to(stage.stmtEls[1], { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 1.35);
    tl.add(() => stage.applyState(ID, 4), 2.2);
  }
};

export default makeSceneModule({
  id: ID,
  number: 9,
  title: 'Bitcoin: Can Scarcity Become Digital?',
  entry,
  morphIn,
  transitions,
  notes: `[→] In 2009, something appeared that had never existed before: a digital good, issued by no state and no company, with a supply fixed by its own rules. Watch what happens to the ledger — the institution at its center steps away, and in its place, a network of independent computers, each holding the whole record, each checking all the others. I'm going to describe this in a strictly neutral register, because describing is all the story has earned so far.

[→] The facts: twenty-one million units — not a promise from an issuer, a property of the thing, fixed by the protocol's own rules. It moves like information, anywhere, at any hour. And it can be held *directly*, with no counterparty — like a bearer asset. Held today by individuals, funds, and lately institutions and states — stated as adoption fact, not as applause.

[→] Three capabilities, then, that had never coexisted: digital mobility. Non-discretionary supply. Independent verification — anyone can check the ledger; no one has to be believed.

[→] And the honest line, in the same breath: it is very young. Its price still swings far more than the monies it would compete with. It is not yet twenty years into a hundred-year question.

[→] One distinction before we go on, because it keeps the thinking clean: the market's valuation of a young asset, and the architecture of the claim itself, are two different questions. Volatility is what the first looks like while adoption is still being decided — a stage, not a verdict. History suggests it can diminish as a monetary good matures; that is an expectation, never a guarantee. The architecture is what the rest of this story knows how to judge.`
});
