// Scene 14 — The Coffee Objection (4 beats — folded into the ladder world,
// Batch C r2 ruling 4).
//
// The objection lives and dies on the ladder. The standalone display-scale
// study frame is retired to file (s14-b1-study); the scene stages
// continuously on the S13 ladder: the coffee cup arrives at the MEDIUM OF
// EXCHANGE berth as the objection lands as the statement line; the
// placement line takes the slot; then THE SCENE'S PAYOFF, protected by the
// climbers ruling and by this file's timing: the coffee recedes first, and
// only then does the coin arrive at its berth above STORE OF VALUE — alone,
// the only monetary object on the ladder, nothing else moving while it
// lands. The pivot returns the whole triad with STORE at full voice and the
// act's hinge question beneath.
//
// THE S13 → S14 BOUNDARY IS A PURE MORPH — ONE WORLD (r2 ruling 4): the
// ladder never leaves the stage. The order overlay and the social line
// clear, the foundation accent releases to `3-07`'s resolved state through
// the component's own transition, the arrival lines persist in place, and
// the objection arrives.
//
// MOTION IS TRANSCRIBED. The ladder's states are `StageLadder`'s own,
// exactly as `3-07` drives them; the berth arrivals ride the register's own
// 520ms reveal with the dot beneath (3-07's entity gesture through the
// icons-to-renders change); the landings rise as the rail's landings rise.
//
// Landed states — the approved cells s14-b1 … s14-b4 (s14-b1 the r2 fold
// cell; b2–b4 untouched), by construction.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { setVisible, hideInstantly, LADDER_STATES } from './_jobsStage.js';

const ID = 'the-coffee-objection';
const L4 = ['collectible', 'sov', 'moe', 'uoa'];

// A berth arrival: the visitor's render through the register's own reveal,
// its dot beneath it at the recorded alpha.
function revealBerth(stage, name, o) {
  const b = stage.berths[name];
  b.df.style.display = '';
  b.df.style.opacity = String(o);
  hideInstantly(b.df, () => { b.df.dataset.visible = 'false'; });
  requestAnimationFrame(() => { b.df.dataset.visible = 'true'; });
  b.dot.style.display = '';
  b.dot.style.background = `rgba(255,255,255,${0.8 * o})`;
  gsap.fromTo(b.dot, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power1.out' });
}

// The seam from Scene 13 — A PURE MORPH, one world (r2 ruling 4): the
// ladder never leaves. The order overlay and the social line clear, the
// foundation accent releases to 3-07's resolved state through the
// component's own transition, the arrival lines persist in place, and the
// objection arrives — the coffee at its berth as the statement line lands.
function morphIn(mod, stage) {
  stage.applyState('the-order-of-monetization', 6);
  const tl = stage.timeline();
  tl.to([stage.orderLayer, stage.social],
    { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.1);
  tl.add(() => { stage.orderLayer.style.display = 'none'; }, 0.75);
  tl.add(() => stage.lad.applyState(LADDER_STATES.resolved, { live: true }), 0.8);
  tl.add(() => revealBerth(stage, 'coffee', 1), 1.3);
  landStatement(stage, tl, stage.states[ID][0].statement, 1.7);
  tl.add(() => stage.applyState(ID, 0), 2.7);
}

// Cold entry at beat 1: the ladder world mounts and reveals — 3-07's own
// resolved-state reveal — the record's lines landing beneath, the coffee
// arriving at its berth, the objection landing as the statement line.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    stage.lad.applyState({ line: false, stages: {}, gates: {} }, { live: false });
    gsap.set(Object.values(stage.arrivalEls), { opacity: 0 });
    stage.berths.coffee.df.style.display = 'none';
    stage.berths.coffee.dot.style.display = 'none';
    gsap.set(stage.stmt, { opacity: 0 });
  }, 0.05);
  tl.add(() => stage.lad.applyState(LADDER_STATES.resolved, { live: true }), 0.28);
  L4.forEach((key, i) => landArrival(stage, tl, key, 0.58 + i * 0.12));
  tl.add(() => revealBerth(stage, 'coffee', 1), 1.18);
  landStatement(stage, tl, stage.states[ID][0].statement, 1.55);
  tl.add(() => stage.applyState(ID, 0), 2.55);
}

// An arrival line lands at the dimmed row voice (the resolved ladder's
// standing record — no line is the latest here).
function landArrival(stage, tl, key, at) {
  tl.add(() => {
    stage.setArrival(key, { latest: false });
    gsap.fromTo(stage.arrivalEls[key],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, at);
}

// A statement lands in the deck's slot.
function landStatement(stage, tl, copy, at, { question = false } = {}) {
  tl.add(() => {
    stage.setStatement(copy, { question });
    gsap.fromTo(stage.stmt,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, at);
}

const transitions = {
  // beat 2 — the placement line: the objection's line gives the slot to the
  // placement, the ladder world unmoved around it.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.stmt, { opacity: 0, duration: 0.35, ease: 'power1.inOut' }, 0.1);
    landStatement(stage, tl, stage.states[ID][1].statement, 0.55);
    tl.add(() => stage.applyState(ID, 1), 1.55);
  },

  // beat 3 — THE PAYOFF, its timing protected: the coffee recedes first,
  // answered; then the coin arrives ALONE at stage two — the only monetary
  // object on the ladder, nothing else moving while it lands.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.stmt, { opacity: 0, duration: 0.35, ease: 'power1.inOut' }, 0.1);
    tl.to(stage.berths.coffee.df, { opacity: 0.5, duration: 0.45, ease: 'power1.inOut' }, 0.12);
    tl.to(stage.berths.coffee.dot, { backgroundColor: 'rgba(255,255,255,0.4)', duration: 0.45 }, 0.12);
    tl.add(() => revealBerth(stage, 'bitcoin', 1), 0.95);
    landStatement(stage, tl, stage.states[ID][2].statement, 1.6);
    tl.add(() => stage.applyState(ID, 2), 2.6);
  },

  // beat 4 — the pivot: the ladder gives the frame back to the home base,
  // whole, STORE OF VALUE at full voice, the hinge question beneath.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.ladderLayer, stage.stmt], { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.1);
    tl.add(() => {
      stage.ladderLayer.style.display = 'none';
      stage.triadLayer.style.display = '';
      stage.triadLayer.style.opacity = '0';
      setVisible(stage.token, true);
      ['sov', 'moe', 'uoa'].forEach((k) => {
        setVisible(stage.spokes[k], true);
        setVisible(stage.fns[k], true);
        stage.fns[k].style.opacity = k === 'sov' ? '1' : '0.55';
      });
      setVisible(stage.continuity, false);
      gsap.to(stage.triadLayer, { opacity: 1, duration: 0.9, ease: 'power1.inOut' });
    }, 0.75);
    landStatement(stage, tl, stage.states[ID][3].question, 1.5, { question: true });
    tl.add(() => stage.applyState(ID, 3), 2.6);
  }
};

export default makeSceneModule({
  id: ID,
  number: 14,
  title: 'The Coffee Objection',
  entry,
  morphIn,
  transitions,
  notes: `[→] Which brings us to the objection you've probably heard — maybe made: "But I can't buy my coffee with Bitcoin." It's true. And notice what it's actually about: one job. The middle one. Medium of exchange, at the coffee counter, today.

[→] Now put that objection on the ladder you're looking at. A monetary good reaches everyday payments *last* — after collectibility, after store-of-value belief, on the far side of the gate. Complaining that a rising monetary good isn't yet buying coffee is like complaining that a twenty-year-old isn't yet retired. It describes the stage. It doesn't describe the destination.

[→] So the honest question was never "does it buy coffee?" The question is: which stage is it actually competing at, right now? And everything you've seen — held by individuals, funds, institutions, held *on purpose*, across years — points at one job: store of value.

[→] Then let's judge it there. What makes something a *good* store of value? That question — asked properly, from first principles — is the rest of this story.`
});
