// Prototype Gate 2 — Scene 2, The Direct Exchange (5 beats).
//
// The stage assembles: surgeon left, patient right, the service path drawn;
// the capabilities accumulate as one building list and the delivery travels
// the line; the frame pivots to what the surgeon actually wants; the return
// path attempts, and fails — a felt failure, not a label change; the binding
// line lands at display scale.
//
// Landed states: beat 2 is s2-f1-final and beat 4 is s2-f2, exactly. Beats
// 1, 3 and 5 are derived from those frames' system and flagged in the report.

import { GEOM } from './_stage.js';
import { makeSceneModule } from './_scene.js';

const ID = 'the-direct-exchange';

// Cold entry at the top of the scene: the two figures find their light, then
// the service path draws between them — the first half of the trade.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  const { line, d1, d2 } = stage.service;
  tl.set([d1, d2, line], { attr: { opacity: 0 } }, 0);
  tl.set(stage.patient, { opacity: 0 }, 0);
  tl.fromTo(stage.surgeon, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 0.05);
  tl.to(stage.patient, { opacity: 1, duration: 0.9, ease: 'power1.out' }, 0.45);
  tl.to(d1, { attr: { opacity: GEOM.service.dotO }, duration: 0.25 }, 1.2);
  stage.drawLine(tl, line, 1.25, 0.7);
  tl.to(d2, { attr: { opacity: GEOM.service.dotO }, duration: 0.25 }, 1.9);
  tl.add(() => stage.applyState(ID, 0), 2.3);
}

const transitions = {
  // beat 2 — the capabilities accumulate (one building list), and the
  // delivery rides the drawn line to the patient.
  1: (mod, stage) => {
    const tl = stage.timeline();
    stage.capsItems.forEach((el, i) => {
      tl.fromTo(el, { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.1 + 0.14 * i);
    });
    const s = GEOM.service;
    tl.add(() => stage.setDot(stage.pulse, s.x1, s.y, 4, 0), 1.35);
    tl.to(stage.pulse, { attr: { opacity: 0.9 }, duration: 0.15 }, 1.4);
    tl.to(stage.pulse, { attr: { cx: s.x2 }, duration: 0.85, ease: 'power1.inOut' }, 1.5);
    tl.to(stage.pulse, { attr: { opacity: 0 }, duration: 0.2 }, 2.3);
    tl.to(stage.service.d2, { attr: { r: 5.2 }, duration: 0.18, yoyo: true, repeat: 1 }, 2.28);
    tl.add(() => stage.applyState(ID, 1), 2.75);
  },

  // beat 3 — the frame pivots to the surgeon's wants: the capabilities and the
  // delivered path yield, the patient recedes to a presence, the wanted goods
  // appear as dim possibilities, and the return path leaves him — attempting.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.capsItems, { opacity: 0, y: -6, duration: 0.35, stagger: 0.05 }, 0);
    tl.to([stage.service.line, stage.service.d1, stage.service.d2],
      { attr: { opacity: 0 }, duration: 0.45 }, 0.1);
    tl.to(stage.patient, { opacity: 0, duration: 0.8, ease: 'power1.inOut' }, 0.25);
    tl.to(stage.glyphEl, { opacity: GEOM.glyph.o, duration: 0.7 }, 0.6);
    const col = GEOM.goodsCol;
    [[stage.shoe, col.shoe], [stage.meal, col.meal], [stage.wine, col.wine]].forEach(([el, rect], i) => {
      tl.add(() => { stage.setRect(el, rect); el.style.opacity = '0'; }, 0.5);
      tl.fromTo(el, { opacity: 0, y: 14 },
        { opacity: 0.45, y: 0, duration: 0.7, ease: 'power2.out' }, 0.7 + 0.26 * i);
    });
    // The attempt: a dot terminal leaves the patient's side, and the path
    // probes toward the surgeon in two lunges.
    const d = GEOM.fragDot;
    tl.add(() => stage.setDot(stage.fragDotEl, d.x, d.y, 0, d.o), 1.7);
    tl.to(stage.fragDotEl, { attr: { r: d.r }, duration: 0.25, ease: 'back.out(2)' }, 1.72);
    const [f0, f1] = GEOM.fragsAttempt;
    stage.drawLine(tl, stage.frags[0], 1.8, 0.5, 'power2.out', f0);
    stage.drawLine(tl, stage.frags[1], 2.5, 0.4, 'power2.out', f1);
    tl.add(() => stage.applyState(ID, 2), 3.15);
  },

  // beat 4 — the failure. The probe strains further, stalls, and breaks: the
  // head splinters into dying fragments, the whole line recoils and dims.
  // This is the double coincidence failing as motion, with no label.
  3: (mod, stage) => {
    const tl = stage.timeline();
    const head = stage.frags[1];
    tl.to(head, { attr: { x2: 1184, stroke: 'rgba(255,255,255,0.34)' },
      duration: 0.5, ease: 'power2.out' }, 0.1);
    const [, f1, f2, f3] = GEOM.fragsFail;
    tl.add(() => {
      stage.setSeg(head, f1[0], f1[1], f1[2], f1[3]);
      stage.setSeg(stage.frags[2], f2[0], f2[1], f2[2], 0.3);
      stage.setSeg(stage.frags[3], f3[0], f3[1], f3[2], 0.22);
    }, 0.72);
    tl.to(stage.frags[2], { attr: { stroke: `rgba(255,255,255,${f2[3]})` }, duration: 0.7, ease: 'power1.out' }, 0.85);
    tl.to(stage.frags[3], { attr: { stroke: `rgba(255,255,255,${f3[3]})` }, duration: 0.7, ease: 'power1.out' }, 0.85);
    const chain = [stage.frags[0], stage.frags[1], stage.frags[2], stage.frags[3], stage.fragDotEl];
    tl.to(chain, { x: 7, duration: 0.18, ease: 'power2.out' }, 0.74);
    tl.to(chain, { x: 0, duration: 0.5, ease: 'power2.inOut' }, 0.95);
    // The last of it: a flicker running back down the chain toward the patient.
    [3, 2, 1, 0].forEach((i, k) => {
      tl.to(stage.frags[i], { attr: { opacity: 0.55 }, duration: 0.09, yoyo: true, repeat: 1 },
        1.55 + 0.07 * k);
    });
    tl.add(() => stage.applyState(ID, 3), 2.4);
  },

  // beat 5 — the binding line, display scale; the failure recedes beneath it.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.scenEl, { opacity: 0.55, duration: 0.7, ease: 'power1.inOut' }, 0);
    tl.add(() => {
      stage.stmt.textContent = 'It binds both halves of the trade to the same two people.';
      stage.stmt.style.top = '838px';
    }, 0);
    tl.fromTo(stage.stmt, { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.25);
    tl.add(() => stage.applyState(ID, 4), 1.1);
  }
};

export default makeSceneModule({
  id: ID,
  number: 2,
  title: 'The Direct Exchange',
  entry,
  morphIn: (mod, stage) => stage.applyState(ID, 0),   // no scene precedes it in this route
  transitions,
  notes: `[→] A surgeon, and a patient. One hour of specialized surgery — and let’s be precise about what that hour contains: specialized skill. Scarce knowledge. Years of training. Professional judgment. Dexterity. Responsibility. What the market pays for is never the passage of an hour — it is the specialized service delivered inside it. Keep that distinction; it matters later.

[→] The service is delivered. The patient received something close to priceless. And now — in a world of *direct* exchange — the second half of this trade has to come back from this same patient. The surgeon must receive, from him, something he actually wants.

[→] What does the surgeon ultimately want? Shoes for his daughter. A good dinner. A bottle of wine for the weekend. Real things, from real people — none of whom are on this operating table.

[→] And here the trade breaks. The patient doesn’t have those things — not the right ones, not in the right amounts, not at the right time. Economists have a name for what just failed: the double coincidence of wants. For direct exchange to work, each side must have exactly what the other wants, at the same moment. Wherever exchange happens without money, this wall appears.

[→] That is direct exchange: it binds both halves of the trade to the same two people. And so the question becomes — how could the two halves ever be separated?`
});
