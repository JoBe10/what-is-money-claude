// Prototype Gate 2 r2 — Scene 4, Spend or Save (5 beats), in SYSTEM B's
// grammar throughout (presenter-ruled 27 August 2026, D7-B): one claim at the
// fork's apex, two mirrored roads descending from it, dot terminals, the
// unchosen road dormant rather than absent — the legacy 4.05's symmetric-fork
// lesson spoken in the film's own line language.
//
// Scene 3 morphs into this scene — the held claim never blinks: the last of
// the world dissolves as the question generalizes (from his claim to every
// claim you ever hold), the claim rises to the apex, and the two roads draw
// out of it, mirrored. RULED 26 August 2026 (R4): the morph is confirmed; no
// authored-black variant is built.
//
// SPEND: the claim travels the left road's own geometry and closes into its
// terminal — redeemed, gone — and the goods stand up at the road's end. The
// reset re-poses the fork, the spend road subdued by its own telling. SAVE:
// the claim takes the right road and RESTS on it; the terminal dissolves and
// the road draws on into time it cannot see. The pair lands beneath the held
// road.
//
// Landed states — approved cells, by construction (states.json rulings):
// s4-b1-b · s4-b2-b · s4-b3-b · s4-b4-b · s4-b5-b.

import { GEOM } from './_stage.js';
import { makeSceneModule } from './_scene.js';

const ID = 'spend-or-save';

// The left road's corners, apex → terminal, and the right road's, apex → rest.
const LEFT_WAY = [[960, 470], [720, 470], [500, 630], [280, 630]];
const RIGHT_WAY = [[960, 470], [1200, 470], [1420, 630], [1530, 630]];

// The claim rides a road's own polyline: in through the turn, out at the end.
function travel(stage, tl, at, way, durs, eases) {
  way.slice(1).forEach(([x, y], i) => {
    tl.to(stage.markWrap, {
      left: `${x}px`, top: `${y}px`, duration: durs[i], ease: eases[i]
    }, at);
    at += durs[i];
  });
  return at;
}

// Tweenable stroke voice for a road, and fill voice for a terminal.
function roadProxy(road, o) {
  const p = { o };
  p.write = () => {
    road.setAttribute('stroke', `rgba(255,255,255,${p.o})`);
    road.setAttribute('opacity', p.o > 0 ? '1' : '0');
  };
  return p;
}
function dotProxy(dot, o) {
  const p = { o };
  p.write = () => {
    dot.setAttribute('fill', `rgba(255,255,255,${p.o})`);
    dot.setAttribute('opacity', p.o > 0 ? '1' : '0');
  };
  return p;
}

// The morph from Scene 3: the statements and the last tenth of the world go;
// the claim — unbroken — rises to the fork's apex; the two roads draw out of
// it, mirrored; the names land at their destinations.
function morphIn(mod, stage) {
  stage.applyState('the-breakthrough', 8);   // the deterministic launch point
  const tl = stage.timeline();
  tl.to([stage.stmtDim, stage.stmt], { opacity: 0, duration: 0.4 }, 0);
  tl.to(stage.surgeon, { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.15);
  tl.to(stage.labelsEl, { opacity: 0, duration: 0.5, stagger: 0.05 }, 0.15);
  tl.to(stage.fade.line, { attr: { opacity: 0 }, duration: 0.5 }, 0.5);
  tl.to(stage.markWrap, {
    left: `${GEOM.markForkB[0]}px`, top: `${GEOM.markForkB[1]}px`,
    duration: 1.15, ease: 'power2.inOut'
  }, 0.35);
  stage.drawRoad(tl, stage.roadL, 1.15, 1.1, 'power2.inOut', GEOM.roads.fork.left);
  stage.drawRoad(tl, stage.roadR, 1.15, 1.1, 'power2.inOut', GEOM.roads.fork.right);
  tl.add(() => {
    const [lx, ly, lr] = GEOM.roadLeftDot;
    const [rx, ry, rr] = GEOM.roadRightDot;
    stage.setDot(stage.roadDotL, lx, ly, lr, GEOM.roads.fork.leftDot);
    stage.setDot(stage.roadDotR, rx, ry, rr, GEOM.roads.fork.rightDot);
    [stage.roadDotL, stage.roadDotR].forEach((d) => d.setAttribute('opacity', '0'));
  }, 2.2);
  tl.to([stage.roadDotL, stage.roadDotR], { attr: { opacity: 1 }, duration: 0.3 }, 2.25);
  tl.add(() => {
    stage.kickSpend.style.left = `${GEOM.kickSpendB[0]}px`;
    stage.kickSpend.style.top = `${GEOM.kickSpendB[1]}px`;
    stage.kickSave.style.left = `${GEOM.kickSaveB[0]}px`;
    stage.kickSave.style.top = `${GEOM.kickSaveB[1]}px`;
  }, 2.3);
  tl.to(stage.kickSpend, { opacity: 1, duration: 0.5 }, 2.35);
  tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 2.5);
  tl.add(() => stage.applyState(ID, 0), 3.1);
}

// Cold entry at the fork: the held claim finds its light at the apex, the two
// roads draw out of it, the names land.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.set([stage.roadL, stage.roadR, stage.roadDotL, stage.roadDotR], { attr: { opacity: 0 } }, 0);
  tl.set([stage.kickSpend, stage.kickSave], { opacity: 0 }, 0);
  tl.fromTo(stage.markWrap, { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0);
  stage.drawRoad(tl, stage.roadL, 0.35, 0.9, 'power2.inOut', GEOM.roads.fork.left);
  stage.drawRoad(tl, stage.roadR, 0.35, 0.9, 'power2.inOut', GEOM.roads.fork.right);
  tl.to([stage.roadDotL, stage.roadDotR], { attr: { opacity: 1 }, duration: 0.3 }, 1.25);
  tl.to(stage.kickSpend, { opacity: 1, duration: 0.5 }, 1.35);
  tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 1.5);
  tl.add(() => stage.applyState(ID, 0), 2.2);
}

const transitions = {
  // beat 2 — SPEND: the claim takes the left road — its own geometry, corner
  // by corner — the road brightens under its use and the save road waits,
  // dormant; at the terminal the claim closes into the dot and is gone,
  // redeemed; the goods stand up at the road's end.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.kickSave, { opacity: GEOM.kickDormant, duration: 0.5 }, 0.1);
    const rRight = roadProxy(stage.roadR, GEOM.roads.fork.right);
    tl.to(rRight, { o: GEOM.roads.spend.right, duration: 0.7, ease: 'power1.inOut', onUpdate: rRight.write }, 0.2);
    const dRight = dotProxy(stage.roadDotR, GEOM.roads.fork.rightDot);
    tl.to(dRight, { o: GEOM.roads.spend.rightDot, duration: 0.7, ease: 'power1.inOut', onUpdate: dRight.write }, 0.2);

    const arrive = travel(stage, tl, 0.6, LEFT_WAY,
      [0.55, 0.62, 0.5], ['power1.in', 'none', 'power1.out']);
    const rLeft = roadProxy(stage.roadL, GEOM.roads.fork.left);
    tl.to(rLeft, { o: GEOM.roads.spend.left, duration: 1.2, ease: 'power1.inOut', onUpdate: rLeft.write }, 0.9);
    const dLeft = dotProxy(stage.roadDotL, GEOM.roads.fork.leftDot);
    tl.to(dLeft, { o: GEOM.roads.spend.leftDot, duration: 0.35, ease: 'power2.out', onUpdate: dLeft.write }, arrive - 0.1);
    // Redeemed: the claim closes into the terminal.
    tl.to(stage.markWrap, { opacity: 0, scale: 0.3, duration: 0.45, ease: 'power2.in' }, arrive - 0.05);

    const row = GEOM.goodsSpendB;
    [[stage.shoe, row.shoe], [stage.meal, row.meal], [stage.wine, row.wine]].forEach(([el, rect], i) => {
      tl.add(() => { stage.setRect(el, rect); el.style.opacity = '0'; }, arrive + 0.4);
      tl.fromTo(el, { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, arrive + 0.5 + 0.24 * i);
    });
    tl.add(() => stage.applyState(ID, 1), arrive + 2.0);
  },

  // beat 3 — "Or —": the fork re-poses. The goods recede, the spend road is
  // subdued by its own telling, and the claim re-forms at the apex; the save
  // road holds its place and its name takes the frame.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.shoe, stage.meal, stage.wine], { opacity: 0, duration: 0.45, stagger: 0.06 }, 0);
    const rLeft = roadProxy(stage.roadL, GEOM.roads.spend.left);
    tl.to(rLeft, { o: GEOM.roads.reset.left, duration: 0.7, ease: 'power1.inOut', onUpdate: rLeft.write }, 0.15);
    const dLeft = dotProxy(stage.roadDotL, GEOM.roads.spend.leftDot);
    tl.to(dLeft, { o: GEOM.roads.reset.leftDot, duration: 0.7, ease: 'power1.inOut', onUpdate: dLeft.write }, 0.15);
    tl.to(stage.kickSpend, { opacity: GEOM.kickDormant, duration: 0.5 }, 0.2);
    const rRight = roadProxy(stage.roadR, GEOM.roads.spend.right);
    tl.to(rRight, { o: GEOM.roads.reset.right, duration: 0.6, ease: 'power1.inOut', onUpdate: rRight.write }, 0.35);
    const dRight = dotProxy(stage.roadDotR, GEOM.roads.spend.rightDot);
    tl.to(dRight, { o: GEOM.roads.reset.rightDot, duration: 0.6, ease: 'power1.inOut', onUpdate: dRight.write }, 0.35);
    tl.to(stage.kickSave, { opacity: 1, duration: 0.5 }, 0.45);
    tl.add(() => stage.setMark(GEOM.markForkB[0], GEOM.markForkB[1], GEOM.markForkB[2], 0), 0.6);
    tl.fromTo(stage.markWrap, { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)', immediateRender: false }, 0.65);
    tl.add(() => stage.applyState(ID, 2), 1.9);
  },

  // beat 4 — SAVE: the names yield to the act. The claim takes the right
  // road and comes to REST on it — not at an end but on the way — the
  // terminal dissolves, and the road draws on past the claim into time it
  // cannot see.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.to([stage.kickSpend, stage.kickSave], { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 0.05);
    const arrive = travel(stage, tl, 0.5, RIGHT_WAY,
      [0.5, 0.62, 0.42], ['power1.in', 'none', 'power2.out']);
    const rRight = roadProxy(stage.roadR, GEOM.roads.reset.right);
    tl.to(rRight, { o: GEOM.roads.save.right, duration: 1.2, ease: 'power1.inOut', onUpdate: rRight.write }, 0.7);
    const dRight = dotProxy(stage.roadDotR, GEOM.roads.reset.rightDot);
    tl.to(dRight, { o: 0, duration: 0.5, ease: 'power1.inOut', onUpdate: dRight.write }, arrive - 0.15);
    const fade = stage.fadeProxy(stage.fade,
      { x1: GEOM.fadeSaveB[0], x2: GEOM.fadeSaveB[0], y: GEOM.fadeSaveB[2], o: GEOM.fadeSaveB[3], w: GEOM.fadeSaveB[4] });
    tl.add(() => fade.write(), arrive - 0.05);
    tl.to(fade, { x2: GEOM.fadeSaveB[1], duration: 1.1, ease: 'power1.inOut', onUpdate: fade.write }, arrive);
    tl.add(() => stage.applyState(ID, 3), arrive + 1.3);
  },

  // beat 5 — the closing pair lands beneath the held road; the roads settle
  // to the floor and the claim keeps its voice.
  4: (mod, stage) => {
    const tl = stage.timeline();
    const rLeft = roadProxy(stage.roadL, GEOM.roads.save.left);
    tl.to(rLeft, { o: GEOM.roads.floor.left, duration: 0.8, ease: 'power1.inOut', onUpdate: rLeft.write }, 0.05);
    const rRight = roadProxy(stage.roadR, GEOM.roads.save.right);
    tl.to(rRight, { o: GEOM.roads.floor.right, duration: 0.8, ease: 'power1.inOut', onUpdate: rRight.write }, 0.05);
    const dLeft = dotProxy(stage.roadDotL, GEOM.roads.save.leftDot);
    tl.to(dLeft, { o: GEOM.roads.floor.leftDot, duration: 0.8, ease: 'power1.inOut', onUpdate: dLeft.write }, 0.05);
    const fade = stage.fadeProxy(stage.fade);
    tl.to(fade, { o: GEOM.fadeSaveBFloor[3], duration: 0.8, ease: 'power1.inOut', onUpdate: fade.write }, 0.05);
    tl.add(() => {
      stage.stmtDim.textContent = 'Spending closes the exchange.';
      stage.stmtDim.style.top = '790px';
      stage.stmt.textContent = 'Saving keeps it open.';
      stage.stmt.style.top = '872px';
    }, 0);
    tl.fromTo(stage.stmtDim, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.5);
    tl.fromTo(stage.stmt, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 1.0);
    tl.add(() => stage.applyState(ID, 4), 1.9);
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
