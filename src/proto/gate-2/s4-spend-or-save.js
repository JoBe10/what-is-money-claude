// Prototype Gate 2 — Scene 4, Spend or Save (5 beats).
//
// Scene 3 morphs into this scene — the held claim never blinks. The fork is a
// question about the claim the viewer is already watching, and the surgeon
// dissolving as the scene opens is the story's own generalization — from his
// claim to every claim you ever hold.
//
// RULED at Gate 2 by the presenter, 26 August 2026: **the morph is
// confirmed.** No authored-black variant is built.
// (docs/gate-2-states-brief.md §1 R4.)
//
// SPEND plays the claim down the interval and the goods arrive over a closed,
// unbroken line; the reset returns to the held claim; SAVE stretches the
// interval into black; the closing pair lands.
//
// Landed states: beat 2 is s4-f1 and beat 5 is s4-f2-a, exactly. Beats 1, 3
// and 4 are derived from those frames' system and flagged in the report.

import { GEOM } from './_stage.js';
import { makeSceneModule } from './_scene.js';

const ID = 'spend-or-save';
const HELD_SCALE = GEOM.markHeld[2] / GEOM.MARK_BASE;

// The morph from Scene 3: the statements and the interval's words have said
// their piece; the surgeon dissolves as the question generalizes; the fork is
// named over the claim that stayed.
function morphIn(mod, stage) {
  stage.applyState('the-breakthrough', 6);   // the deterministic launch point
  const tl = stage.timeline();
  tl.to([stage.stmtDim, stage.stmt], { opacity: 0, duration: 0.4 }, 0);
  tl.to(stage.scenEl, { opacity: 1, duration: 0.6, ease: 'power1.inOut' }, 0.1);
  tl.to(stage.labelsEl, { opacity: 0, duration: 0.5, stagger: 0.06 }, 0.15);
  tl.to(stage.surgeon, { opacity: 0, duration: 1.0, ease: 'power1.inOut' }, 0.25);
  tl.add(() => {
    stage.kickSpend.style.left = '660px';
    stage.kickSave.style.left = '1260px';
    stage.kickSpend.style.opacity = '0';
    stage.kickSave.style.opacity = '0';
  }, 0.9);
  tl.to(stage.kickSpend, { opacity: 1, duration: 0.5 }, 1.0);
  tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 1.2);
  tl.add(() => stage.applyState(ID, 0), 1.9);
}

// Cold entry at the fork: the held claim, its open road, the two names.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  stage.fadeLine.setAttribute('opacity', '0');
  const tl = stage.timeline();
  tl.set([stage.kickSpend, stage.kickSave], { opacity: 0 }, 0);
  tl.fromTo(stage.markWrap, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0);
  tl.to(stage.fadeLine, { attr: { opacity: 1 }, duration: 0.7 }, 0.25);
  tl.to(stage.kickSpend, { opacity: 1, duration: 0.5 }, 0.6);
  tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 0.8);
  tl.add(() => stage.applyState(ID, 0), 1.5);
}

const transitions = {
  // beat 2 — SPEND: the claim travels its road and the road closes behind it;
  // the goods arrive; one unbroken line, both ends resolved. Claim gone.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.kickSave, { opacity: 0, duration: 0.4 }, 0);
    tl.to(stage.kickSpend, { left: '960px', duration: 0.8, ease: 'power2.inOut' }, 0.1);
    tl.to(stage.markWrap, { left: '1620px', duration: 1.3, ease: 'power2.in' }, 0.2);
    tl.to(stage.markWrap, { opacity: 0, duration: 0.4, ease: 'power1.in' }, 1.05);
    tl.to(stage.fadeLine, { attr: { opacity: 0 }, duration: 0.55 }, 0.95);
    const row = GEOM.goodsRow;
    [[stage.shoe, row.shoe], [stage.meal, row.meal], [stage.wine, row.wine]].forEach(([el, rect], i) => {
      tl.add(() => { stage.setRect(el, rect); el.style.opacity = '0'; }, 1.6);
      tl.fromTo(el, { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 1.7 + 0.28 * i);
    });
    const c = GEOM.closed;
    tl.add(() => stage.setDot(stage.closed.d1, c.x1, c.y, c.dotR, 0), 2.55);
    tl.add(() => stage.setDot(stage.closed.d2, c.x2, c.y, c.dotR, 0), 2.55);
    tl.to(stage.closed.d1, { attr: { opacity: c.dotO }, duration: 0.25 }, 2.6);
    stage.drawLine(tl, stage.closed.line, 2.62, 0.9, 'power2.out', [c.x1, c.x2, c.y, c.o, c.w]);
    tl.to(stage.closed.d2, { attr: { opacity: c.dotO }, duration: 0.25 }, 3.45);
    tl.add(() => stage.applyState(ID, 1), 3.95);
  },

  // beat 3 — "Or —": the spend rewinds; the held claim and its road return;
  // the fork's other name takes the frame.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.shoe, stage.meal, stage.wine], { opacity: 0, duration: 0.45, stagger: 0.06 }, 0);
    tl.to([stage.closed.line, stage.closed.d1, stage.closed.d2],
      { attr: { opacity: 0 }, duration: 0.5 }, 0.05);
    tl.to(stage.kickSpend, { opacity: 0, duration: 0.4 }, 0.1);
    tl.add(() => stage.setMark(GEOM.markHeld[0], GEOM.markHeld[1], GEOM.markHeld[2], 0), 0.5);
    tl.fromTo(stage.markWrap, { opacity: 0, scale: HELD_SCALE * 0.9 },
      { opacity: 1, scale: HELD_SCALE, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, 0.55);
    const fade = stage.fadeProxy({ x1: GEOM.fadeHeld[0], x2: GEOM.fadeHeld[0], y: GEOM.fadeHeld[2], o: GEOM.fadeHeld[3], w: GEOM.fadeHeld[4] });
    tl.add(() => fade.write(), 0.75);
    tl.to(fade, { x2: GEOM.fadeHeld[1], duration: 0.8, ease: 'power2.out', onUpdate: fade.write }, 0.8);
    tl.add(() => { stage.kickSave.style.left = '960px'; stage.kickSave.style.opacity = '0'; }, 1.1);
    tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 1.15);
    tl.add(() => stage.applyState(ID, 2), 1.9);
  },

  // beat 4 — SAVE: the name yields to the act. The claim settles deeper into
  // the hold and the open interval stretches forward, into time you cannot
  // see — the long quiet extend.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.kickSave, { opacity: 0, duration: 0.6 }, 0);
    tl.to(stage.markWrap, {
      left: `${GEOM.markSave[0]}px`, top: `${GEOM.markSave[1]}px`, scale: 1,
      duration: 1.2, ease: 'power2.inOut'
    }, 0.15);
    const fade = stage.fadeProxy({ x1: GEOM.fadeHeld[0], x2: GEOM.fadeHeld[1], y: GEOM.fadeHeld[2], o: GEOM.fadeHeld[3], w: GEOM.fadeHeld[4] });
    tl.to(fade, {
      x1: GEOM.fadeSave[0], x2: GEOM.fadeSave[1], y: GEOM.fadeSave[2],
      o: GEOM.fadeSave[3], w: GEOM.fadeSave[4],
      duration: 1.7, ease: 'power1.inOut', onUpdate: fade.write
    }, 0.35);
    tl.add(() => stage.applyState(ID, 3), 2.3);
  },

  // beat 5 — the closing pair lands: the first line gives the frame to the
  // second, exactly the approved settle.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.stmtDim.textContent = 'Spending closes the exchange.';
      stage.stmtDim.style.top = '790px';
      stage.stmt.textContent = 'Saving keeps it open.';
      stage.stmt.style.top = '872px';
    }, 0);
    tl.fromTo(stage.stmtDim, { opacity: 0, y: 12 },
      { opacity: 0.66, y: 0, duration: 0.6, ease: 'power2.out' }, 0.1);
    tl.fromTo(stage.stmt, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.6);
    tl.add(() => stage.applyState(ID, 4), 1.5);
  }
};

export default makeSceneModule({
  id: ID,
  number: 4,
  title: 'Spend or Save',
  entry,
  morphIn,
  transitions,
  notes: `[→] So every claim you ever hold faces the same fork. Spend now — or save for later.

[→] Spend, and watch what happens: the claim travels, the shoes and the dinner and the wine come back, and the claim is gone. Redeemed. The exchange that began on an operating table is closed.

[→] Or —

[→] — save. The claim stays. Nothing comes back yet, on purpose. The open interval stretches forward, into time you cannot see. Saving is not the absence of a decision; it is the decision to keep the exchange unresolved.

[→] Spending closes the exchange. Saving keeps it open. And if an exchange can stay open — through months, through years, through a lifetime — then something has to *carry* it. Hold that thought. It is the rest of this story.`
});
