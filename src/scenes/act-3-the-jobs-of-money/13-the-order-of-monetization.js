// Scene 13 — The Order of Monetization (7 beats — the r2 split; the ladder
// restored, after Vijay Boyapati — attributed on stage from beat 1 per the
// LADDER ruling).
//
// The authored cut from Scene 12 (the question changes: "is there an order?"
// → the order): the split world clears and the empty rising line enters with
// the attribution — genuinely empty, nothing on the ascent. Then the stages
// climb in `3-03`'s own state table at the amended 7-beat map (r2 ruling 3):
// COLLECTIBLE, STORE OF VALUE, the social-technology beat holding the ladder
// while the reason the order cannot run backward lands in the clear sky, the
// ACCEPTANCE GATE — MEDIUM OF EXCHANGE landing with its gate line alone, the
// third threshold sitting dim, legacy build 4 restored — the CONTRACTS GATE
// — UNIT OF ACCOUNT with the second gate line, every threshold lit, legacy
// build 5 — and the foundation, renumbered to b7 with its look unchanged:
// the store-of-value stop taking the act's accent, the ladder's only orange,
// exactly as the approved cell has it.
//
// MOTION IS TRANSCRIBED. The ladder's motion is `StageLadder`'s own —
// `applyState(state, { live: true })` at the states legacy `3-03` drives,
// with the component's stylesheet carrying the line draw, the stop reveals
// and the threshold ticks. The neutral marks ride INSIDE the stops (the one
// ruled change), so each render arrives with its station's own reveal — the
// Act II band's proven arrival gesture. The copy overlay (kicker, gate
// lines, foundation line) is `3-03`'s dataset choreography against its own
// classes, the foundation-step settle included (`data-step="7"` under the
// amended map — the stylesheet's step-6 rule extended). The arrival lines beneath
// the stops land in the rail's own row register (the arrival-line rule),
// rising as the rail's landings rise.
//
// Landed states — the approved cells s13-b1 … s13-b7 (the r2 record), by
// construction.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { setVisible, hideInstantly, LADDER_STATES } from './_jobsStage.js';

const ID = 'the-order-of-monetization';

// The empty rising line enters with the attribution. The ladder is prepared
// off-stage at its pre-line state (snap), then the line draws live and the
// kicker rises — 3-03's own build 1.
function lineEntry(stage, tl, at) {
  tl.add(() => {
    stage.ladderLayer.style.display = '';
    stage.orderLayer.style.display = '';
    stage.orderLayer.dataset.step = '1';
    stage.lad.applyState({ line: false, stages: {}, gates: {} }, { live: false });
    hideInstantly(stage.orderKicker, () => setVisible(stage.orderKicker, false));
  }, at);
  tl.add(() => {
    stage.lad.applyState(LADDER_STATES.line, { live: true });
    setVisible(stage.orderKicker, true);
  }, at + 0.25);
}

// The cut from Scene 12: the split world clears, and the empty line enters.
function morphIn(mod, stage) {
  // S12's last state is its beat 3 since the Acts III–IV final ruling 1 (the
  // household frame retired; the principle is build 2).
  stage.applyState('we-already-split-those-jobs', 2);
  const tl = stage.timeline();
  tl.to(stage.splitLayer, { opacity: 0, duration: 0.55, ease: 'power1.inOut' }, 0.1);
  lineEntry(stage, tl, 0.7);
  tl.add(() => stage.applyState(ID, 0), 2.4);
}

// Cold entry at beat 1: the line enters over black.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  lineEntry(stage, tl, 0.1);
  tl.add(() => stage.applyState(ID, 0), 1.9);
}

// An arrival line lands beneath its stop — the rail's landing gesture (rise
// 10, 0.6s) in the rail's row register. `latest` carries full voice; a
// landing at the dimmed-prior step (the gate beats' rows, whose voice the
// gate lines carry) lands at 0.58.
function landArrival(stage, tl, key, at, { latest = true } = {}) {
  tl.add(() => {
    stage.setArrival(key, { latest });
    gsap.fromTo(stage.arrivalEls[key],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, at);
}

// A standing line settles to the dimmed-prior step (opacity is compositing-
// equivalent to the settled color alpha over the black stage; applyState
// swaps it for the recorded color at the snap).
function dimArrival(stage, tl, key, at) {
  tl.to(stage.arrivalEls[key], { opacity: 0.58, duration: 0.5, ease: 'power1.inOut' }, at);
}

const transitions = {
  // beat 2 — COLLECTIBLE stands on the line: the stop's own reveal carries
  // the gem crystal up with it, the first threshold sits dim, the arrival
  // line lands at full voice.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.lad.applyState(LADDER_STATES.collectible, { live: true }), 0.12);
    landArrival(stage, tl, 'collectible', 0.6);
    tl.add(() => stage.applyState(ID, 1), 1.9);
  },

  // beat 3 — STORE OF VALUE arrives: the hourglass steps up the line, the
  // first gate brightens, the prior line settles to the dimmed step.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.lad.applyState(LADDER_STATES.sov, { live: true }), 0.12);
    dimArrival(stage, tl, 'collectible', 0.25);
    landArrival(stage, tl, 'sov', 0.6);
    tl.add(() => stage.applyState(ID, 2), 1.9);
  },

  // beat 4 — the social-technology beat: the ladder holds at two stages
  // while the line lands in the clear sky the un-arrived stages leave open.
  3: (mod, stage) => {
    const tl = stage.timeline();
    dimArrival(stage, tl, 'sov', 0.12);
    tl.add(() => {
      stage.orderLayer.dataset.step = '4';
      stage.social.style.cssText = 'position:absolute; margin:0; ' +
        'left:200px; top:200px; width:640px; text-indent:0;' +
        'font-size:40px; font-weight:540; letter-spacing:-0.012em; line-height:1.3;' +
        'color:rgba(255,255,255,1);';
      gsap.fromTo(stage.social,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
    }, 0.18);
    tl.add(() => stage.applyState(ID, 3), 1.2);
  },

  // beat 5 — the acceptance gate (the r2 split, legacy build 4 restored):
  // MEDIUM OF EXCHANGE stands with its object, the third threshold sits
  // dim, the first gate line lands alone, and the social line recedes to
  // the dimmed-prior step.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.lad.applyState(LADDER_STATES.moe, { live: true }), 0.12);
    tl.to(stage.social, { opacity: 0.55, duration: 0.6, ease: 'power1.inOut' }, 0.2);
    landArrival(stage, tl, 'moe', 0.75, { latest: false });
    tl.add(() => {
      stage.orderLayer.dataset.step = '5';
      setVisible(stage.gatelines[0], true);
    }, 0.85);
    tl.add(() => stage.applyState(ID, 4), 2.1);
  },

  // beat 6 — the contracts gate (legacy build 5 restored): UNIT OF ACCOUNT
  // completes the neutral object sequence, every threshold lights, the
  // second gate line lands beneath the first.
  5: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => stage.lad.applyState(LADDER_STATES.all, { live: true }), 0.12);
    landArrival(stage, tl, 'uoa', 0.55, { latest: false });
    tl.add(() => {
      stage.orderLayer.dataset.step = '6';
      setVisible(stage.gatelines[1], true);
    }, 0.7);
    tl.add(() => stage.applyState(ID, 5), 1.9);
  },

  // beat 7 — the foundation (renumbered from b6 by the split, its look
  // unchanged): the store-of-value stop takes the act's accent (the
  // component's own foundation state, the ladder's only orange), the gate
  // lines settle to the legacy's own dimmed step, the foundation line lands
  // at full voice.
  6: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.lad.applyState(LADDER_STATES.foundation, { live: true });
      stage.orderLayer.dataset.step = '7';
    }, 0.12);
    tl.add(() => setVisible(stage.foundationLine, true), 0.55);
    tl.add(() => stage.applyState(ID, 6), 1.8);
  }
};

export default makeSceneModule({
  id: ID,
  number: 13,
  title: 'The Order of Monetization',
  entry,
  morphIn,
  transitions,
  notes: `[→] There is an order, and it's one of the most useful ideas in all of monetary thinking. The framing follows Vijay Boyapati. Monetary goods have historically climbed four stages.

[→] They start as collectibles — held by a few people for their own strange reasons. Shells. Beads. Something scarce and interesting, valuable to somebody.

[→] Then, if enough people notice it holds its worth, it becomes a store of value — a place to park purchasing power on purpose.

[→] Now — why can't the order run backward? Because money is not like other goods. A tool is useful even if you're the only person on earth who owns one. Money is the opposite: it is the one good you use *because everyone else uses it* — a social technology, whose whole power is the network of people who will take it. That's why the stages gate the way they do: holding needs only one person's decision. Spending needs two people to agree. Pricing needs everyone to converge.

[→] So a good becomes a medium of exchange only after enough people already trust it to hold value — because nobody accepts as payment what they don't expect to hold value until they spend it. Store-of-value belief is the gate to acceptance.

[→] And only a widely accepted good becomes the unit of account — nobody writes contracts in a measuring stick nobody takes. Each stage gates the next.

[→] Which makes the second stage the foundation of the entire structure. Note the distinction: collectible is where a good *starts* — but it isn't yet a monetary job. Of the three jobs themselves, store of value is the one a good must win before the others can exist — the job the rest are built on. Not a law of nature; a pattern with a logic. Keep it in front of you, because it tells us exactly where to aim our judgment: at the foundation, before anything else.

**[Notes-only — Q&A armor, never spoken: the contested-history dossier (Mesopotamian silver as unit-of-account-first inside temple/palace administration — a state system, outside the market-emergence claim; the chartalist/debt-money line — obligation monies, likewise outside it; the POW-camp cigarettes — a medium within weeks, answered by horizon-relative store-of-value: within camp horizons, cigarettes were the best available store, and acceptance tracked expected retention; no documented case exists of a market-emergent money generally accepted as payment by people who did not expect it to hold value until they spent it — and no prehistoric stage transition is documented in either direction, which is why the film argues this as logic, not chronology). The vocabulary, on request: network effects, Schelling point, salability.]**`
});
