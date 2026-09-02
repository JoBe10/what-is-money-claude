// Scene 14 — The Coffee Objection (4 beats).
//
// The objection made sensory, then killed on the ladder. The coffee cup at
// display scale over the condensed home row (the approved study geometry);
// the ladder returns in `3-07`'s own resolved state with the coffee placed
// at the MEDIUM OF EXCHANGE berth; then THE SCENE'S PAYOFF, protected by the
// climbers ruling and by this file's timing: the coffee recedes first, and
// only then does the coin arrive at its berth above STORE OF VALUE — alone,
// the only monetary object on the ladder, nothing else moving while it
// lands. The pivot returns the whole triad with STORE at full voice and the
// act's hinge question beneath.
//
// MOTION IS TRANSCRIBED. The ladder's return is `StageLadder`'s own
// resolved-state reveal, exactly as `3-07` build 1 mounts it live; the
// berth arrivals ride the register's own 520ms reveal with the dot beneath
// (3-07's entity gesture through the icons-to-renders change); the study
// reveals as every display-scale photograph in the film reveals; the
// landings rise as the rail's landings rise.
//
// Landed states — the approved cells s14-b1 … s14-b4 (s14-b1 carried
// byte-identical from r1 through every session), by construction.

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

// The study's own reveal with its words and the condensed home row.
function studyEntry(stage, tl, at) {
  tl.add(() => {
    stage.study.style.display = '';
    hideInstantly(stage.study, () => { stage.study.dataset.visible = 'false'; });
    requestAnimationFrame(() => { stage.study.dataset.visible = 'true'; });
    gsap.fromTo([stage.studyStmt, ...stage.rowEls],
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.06, delay: 0.25 });
  }, at);
}

// The seam from Scene 13: the ladder world holds its foundation as it gives
// the frame to the objection — the overlay clears, the study reveals.
function morphIn(mod, stage) {
  stage.applyState('the-order-of-monetization', 5);
  const tl = stage.timeline();
  tl.to([stage.ladderLayer, stage.orderLayer, stage.social],
    { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.1);
  tl.add(() => {
    stage.ladderLayer.style.display = 'none';
    stage.orderLayer.style.display = 'none';
  }, 0.72);
  studyEntry(stage, tl, 0.8);
  tl.add(() => stage.applyState(ID, 0), 2.2);
}

// Cold entry at beat 1: the study reveals over black.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => {
    gsap.set([stage.studyStmt, ...stage.rowEls], { opacity: 0 });
  }, 0.05);
  studyEntry(stage, tl, 0.1);
  tl.add(() => stage.applyState(ID, 0), 1.8);
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
  // beat 2 — the objection goes on the ladder: the study clears, the ladder
  // returns in 3-07's own resolved state, the record's lines land beneath,
  // and the coffee takes the MEDIUM OF EXCHANGE berth.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.study, stage.studyStmt, ...stage.rowEls],
      { opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0.1);
    tl.add(() => {
      stage.ladderLayer.style.display = '';
      stage.ladderLayer.style.opacity = '1';
      stage.lad.applyState({ line: false, stages: {}, gates: {} }, { live: false });
    }, 0.62);
    tl.add(() => stage.lad.applyState(LADDER_STATES.resolved, { live: true }), 0.85);
    L4.forEach((key, i) => landArrival(stage, tl, key, 1.15 + i * 0.12));
    tl.add(() => revealBerth(stage, 'coffee', 1), 1.75);
    landStatement(stage, tl, stage.states[ID][1].statement, 2.1);
    tl.add(() => stage.applyState(ID, 1), 3.1);
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
