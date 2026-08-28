// Prototype Gate 2 r2/r3 — Scene 2, The Direct Exchange (5 beats).
//
// The stage assembles with purpose and warmth (the entry is D8's motion
// half, ACCEPTED and closed 28 August 2026); the delivery rides the drawn
// line; the frame pivots to the surgeon's wants; the return attempt and its
// failure speak the selected r3 failure-language candidate
// (`?proto=gate2&path=1|2|3` — reach, absence, flow), each consistent across
// its sites, no degraded stroke in any settled frame; the binding line lands
// over the two people who stay legible as its anchor.
//
// Landed states — approved cells, by construction (states.json rulings):
// s2-b1-a · s2-b2 · s2-b5-b (D4-B). Beats 3 and 4's path element is
// presenter-reopened (rulingsR3): the wants context (D1-A, D2-A) stands, and
// the return element renders the selected candidate.

import { GEOM } from './_stage.js';
import { makeSceneModule } from './_scene.js';

const ID = 'the-direct-exchange';

// Cold entry at the top of the film's Act I: not an apparition but an arrival.
// The light comes up on the two people — a warm wash lifting the black, their
// forms brightening into it — the service path draws itself with intent, and
// the six capabilities land one by one under the sentences that name them.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  stage.tag('entry', tl);
  const { line, d1, d2 } = stage.service;

  tl.set([line, d1, d2], { attr: { opacity: 0 } }, 0);
  tl.set(stage.capsItems, { opacity: 0 }, 0);
  tl.set([stage.surgeon, stage.patient], { opacity: 0 }, 0);

  // Light rises: the warm wash swells in the dark between the figures and
  // hands its light to them — they brighten past their landed value a breath
  // and settle, the way a scene finds its key.
  tl.to(stage.wash, { opacity: 1, duration: 1.5, ease: 'sine.out' }, 0.05);
  tl.fromTo(stage.surgeon, { opacity: 0, filter: 'brightness(0.55)' },
    { opacity: 1, duration: 1.15, ease: 'power1.out' }, 0.2);
  tl.to(stage.surgeon, { filter: 'brightness(1.05)', duration: 0.9, ease: 'sine.out' }, 0.35);
  tl.to(stage.surgeon, { filter: 'brightness(1)', duration: 0.8, ease: 'sine.inOut' }, 1.25);
  tl.fromTo(stage.patient, { opacity: 0, filter: 'brightness(0.55)' },
    { opacity: 1, duration: 1.15, ease: 'power1.out' }, 0.5);
  tl.to(stage.patient, { filter: 'brightness(1.05)', duration: 0.9, ease: 'sine.out' }, 0.65);
  tl.to(stage.patient, { filter: 'brightness(1)', duration: 0.8, ease: 'sine.inOut' }, 1.55);
  tl.to(stage.wash, { opacity: 0, duration: 1.5, ease: 'sine.inOut' }, 2.4);

  // The service path draws itself — one confident stroke between them.
  tl.to(d1, { attr: { opacity: 1 }, duration: 0.22 }, 1.45);
  stage.drawLine(tl, line, 1.55, 0.7, 'power3.inOut');
  tl.fromTo(d2, { attr: { opacity: 0, r: GEOM.service.dotR } },
    { attr: { opacity: 1, r: GEOM.service.dotR + 1.6 }, duration: 0.2, immediateRender: false }, 2.25);
  tl.to(d2, { attr: { r: GEOM.service.dotR }, duration: 0.35, ease: 'power2.out' }, 2.45);

  // The capabilities, line by line under his voice — each one rises, lands a
  // touch over its voice, and settles into it.
  stage.capsItems.forEach((el, i) => {
    const at = 2.35 + 0.36 * i;
    tl.set(el, { color: 'rgba(255,255,255,0.86)' }, at);
    tl.fromTo(el, { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, at);
    tl.to(el, { color: `rgba(255,255,255,${GEOM.caps.full})`, duration: 0.4, ease: 'sine.out' }, at + 0.5);
  });

  tl.add(() => stage.applyState(ID, 0), 5.0);
}

// ---- the r3 failure-language gestures (one per candidate, two beats each) --

// path=1 — THE REACH, first try: a clean, full-weight stroke extends from
// the patient toward the surgeon, decelerates, halts short, holds a breath,
// and withdraws part of the way. What settles is whole: a short stroke with
// its terminal dot, and authored black between its end and the surgeon.
function reachB3(stage, tl) {
  const R = GEOM.pathReach;
  const [ox, oy, orr, oo] = R.origin;
  tl.add(() => stage.setDot(stage.fragDotEl, ox, oy, 0, oo), 1.55);
  tl.to(stage.fragDotEl, { attr: { r: orr }, duration: 0.25, ease: 'back.out(2)' }, 1.6);
  const p = { x2: R.b3[0] };
  const write = () => stage.setSeg(stage.frags[0], R.b3[0], p.x2, R.b3[2], R.b3[3], R.b3[4]);
  const head = { x: R.b3[0], r: 2.2, o: 0.6 };
  const wh = () => stage.setPulse(head.x, R.b3[2], head.r, head.o);
  tl.add(() => { write(); wh(); }, 1.8);
  tl.to(p, { x2: R.b3Far, duration: 0.9, ease: 'power3.out', onUpdate: write }, 1.82);
  tl.to(head, { x: R.b3Far, duration: 0.9, ease: 'power3.out', onUpdate: wh }, 1.82);
  // the halt holds a breath at full weight — then the withdrawal, part way
  tl.to(p, { x2: R.b3[1], duration: 0.65, ease: 'power2.inOut', onUpdate: write }, 3.05);
  tl.to(head, { x: R.b3[1], o: 0.4, duration: 0.65, ease: 'power2.inOut', onUpdate: wh }, 3.05);
  // the head settles into the terminal dot at the stroke's honest end
  tl.add(() => {
    stage.setDot(stage.reachDot, ...R.b3End);
    stage.reachDot.setAttribute('opacity', '0');
  }, 3.7);
  tl.to(stage.reachDot, { attr: { opacity: 1 }, duration: 0.25 }, 3.73);
  tl.to(head, { o: 0, duration: 0.22, onUpdate: wh }, 3.75);
  return 4.35;
}

// path=1 — the second, harder try: the reach is longer and the retreat
// deeper. The terminal dot lifts back into the moving head; the stroke
// pushes further, holds on longer, and comes back with less.
function reachB4(stage, tl) {
  const R = GEOM.pathReach;
  const p = { x2: R.b3[1] };
  const write = () => stage.setSeg(stage.frags[0], R.b4[0], p.x2, R.b4[2], R.b4[3], R.b4[4]);
  const head = { x: R.b3[1], r: 2.4, o: 0.65 };
  const wh = () => stage.setPulse(head.x, R.b4[2], head.r, head.o);
  tl.add(() => { write(); wh(); }, 0.15);
  tl.to(stage.reachDot, { attr: { opacity: 0 }, duration: 0.2 }, 0.15);
  tl.to(p, { x2: R.b4Far, duration: 1.0, ease: 'power3.out', onUpdate: write }, 0.4);
  tl.to(head, { x: R.b4Far, duration: 1.0, ease: 'power3.out', onUpdate: wh }, 0.4);
  tl.to(p, { x2: R.b4[1], duration: 0.85, ease: 'power2.inOut', onUpdate: write }, 1.85);
  tl.to(head, { x: R.b4[1], o: 0.4, duration: 0.85, ease: 'power2.inOut', onUpdate: wh }, 1.85);
  tl.add(() => {
    stage.setDot(stage.reachDot, ...R.b4End);
    stage.reachDot.setAttribute('opacity', '0');
  }, 2.7);
  tl.to(stage.reachDot, { attr: { opacity: 1 }, duration: 0.25 }, 2.73);
  tl.to(head, { o: 0, duration: 0.22, onUpdate: wh }, 2.75);
  return 3.35;
}

// path=2 — THE ABSENCE: no return line is ever drawn. The terminal dot at
// the patient's edge brightens, strains toward the surgeon — its light
// leaning into the corridor — and subsides; harder at b4, settling dimmer.
function strain(stage, tl, beat) {
  const A = GEOM.pathAbsence;
  const b3 = beat === 'b3';
  const [dx, dy, dr, target] = b3 ? A.b3Dot : A.b4Dot;
  let t0;
  if (b3) {
    tl.add(() => stage.setDot(stage.fragDotEl, dx, dy, 0, 0.5), 1.55);
    tl.to(stage.fragDotEl, { attr: { r: dr }, duration: 0.25, ease: 'back.out(2)' }, 1.6);
    t0 = 1.95;
  } else {
    t0 = 0.35;
  }
  const reach = b3 ? 95 : 165;      // how far the strain's light leans
  const lean = b3 ? 26 : 44;        // how far the dot itself is pulled
  const d = { x: dx, o: b3 ? 0.5 : A.b3Dot[3] };
  const wd = () => stage.setDot(stage.fragDotEl, d.x, dy, dr, d.o);
  tl.to(d, { o: b3 ? 0.95 : 1, duration: 0.45, ease: 'power2.out', onUpdate: wd }, t0);
  tl.to(d, { x: dx - lean, duration: 0.8, ease: 'power2.out', onUpdate: wd }, t0 + 0.25);
  const g = { x: dx - 8, r: 2.2, o: 0 };
  const wg = () => stage.setPulse(g.x, dy, g.r, g.o);
  tl.add(wg, t0 + 0.25);
  tl.to(g, { o: b3 ? 0.5 : 0.65, duration: 0.3, onUpdate: wg }, t0 + 0.3);
  tl.to(g, { x: dx - reach, r: 1.2, o: 0, duration: 0.9, ease: 'power2.out', onUpdate: wg }, t0 + 0.45);
  // the subsiding: the dot eases home and settles dimmer than it began
  tl.to(d, { x: dx, o: target, duration: 0.9, ease: 'power1.inOut', onUpdate: wd }, t0 + 1.35);
  return t0 + 2.5;
}

// path=3 — THE FLOW: a faint warm stream of light flows from the patient
// toward the surgeon, stalls, and disperses short of arrival. Austere, in
// the pool's family. What settles is only a dim residual drift.
function flow(stage, tl, beat) {
  const F = GEOM.pathFlow;
  const b3 = beat === 'b3';
  const conf = b3 ? F.b3 : F.b4;
  const t0 = b3 ? 1.6 : 0.3;
  const startX = b3 ? 1140 : 1090;
  const stall = b3 ? 935 : 870;
  // the stream's body stretches behind the head as it flows
  const p = b3
    ? { cx: 1140, w: 60, o: 0 }
    : { cx: F.b3[0], w: F.b3[2], o: F.b3[4] };
  const wdr = () => stage.setDrift([p.cx, conf[1], p.w, conf[3], p.o]);
  tl.add(wdr, t0);
  tl.to(p, { cx: conf[0] + 15, w: conf[2] * 0.95, o: b3 ? 0.6 : 0.55, duration: 1.15, ease: 'power2.out', onUpdate: wdr }, t0 + 0.05);
  // the head: the stream's leading light, decelerating to its stall
  tl.add(() => {
    stage.flowHead.style.left = `${startX}px`;
    stage.flowHead.style.top = `${conf[1]}px`;
    stage.flowHead.style.opacity = '0';
  }, t0);
  tl.to(stage.flowHead, { opacity: b3 ? 0.85 : 1, duration: 0.3 }, t0 + 0.05);
  tl.to(stage.flowHead, { left: stall, duration: 1.15, ease: 'power3.out' }, t0 + 0.1);
  // the dispersal: the light spreads and lets go, short of arriving
  tl.to(stage.flowHead, { scale: b3 ? 2.1 : 2.6, opacity: 0, duration: 0.6, ease: 'power1.out' }, t0 + 1.25);
  // the drift eases back to what remains
  tl.to(p, { cx: conf[0], w: conf[2], o: conf[4], duration: 0.7, ease: 'sine.inOut', onUpdate: wdr }, t0 + 1.35);
  return t0 + 2.4;
}

const transitions = {
  // beat 2 — the service delivered: the delivery leaves the surgeon's side,
  // rides the drawn line, and comes to rest at the patient's edge; the
  // receiving terminal lights; the capabilities settle to the floor.
  1: (mod, stage) => {
    const tl = stage.timeline();
    const s = GEOM.service;
    tl.add(() => stage.setPulse(s.x1, s.y, 4.5, 0), 0.1);
    const pulse = { o: 0, x: s.x1 };
    const writePulse = () => stage.setPulse(pulse.x, s.y, 4.5, pulse.o);
    tl.to(pulse, { o: 0.9, duration: 0.2, onUpdate: writePulse }, 0.15);
    tl.to(pulse, { x: GEOM.delivery[0][0], duration: 0.95, ease: 'power1.inOut', onUpdate: writePulse }, 0.4);
    // The pulse settles into the delivery at rest; the terminal answers.
    tl.add(() => {
      const [x, y, r, o] = GEOM.delivery[0];
      stage.setDot(stage.deliveryEls[0], x, y, r, o);
      stage.deliveryEls[0].setAttribute('opacity', '0');
    }, 1.3);
    tl.to(stage.deliveryEls[0], { attr: { opacity: 1 }, duration: 0.3 }, 1.35);
    tl.to(pulse, { o: 0, duration: 0.25, onUpdate: writePulse }, 1.4);
    tl.add(() => {
      const [x, y, r, o] = GEOM.delivery[1];
      stage.setDot(stage.deliveryEls[1], x, y, r, o);
      stage.deliveryEls[1].setAttribute('opacity', '0');
    }, 1.45);
    tl.fromTo(stage.deliveryEls[1], { attr: { opacity: 0 } },
      { attr: { opacity: 1 }, duration: 0.35, ease: 'power2.out', immediateRender: false }, 1.5);
    // The capabilities have said their piece; they settle to the floor.
    tl.to(stage.capsItems, {
      color: `rgba(255,255,255,${GEOM.caps.floor})`,
      duration: 0.7, ease: 'power1.inOut', stagger: 0.04
    }, 0.9);
    tl.add(() => stage.applyState(ID, 1), 2.2);
  },

  // beat 3 — the frame pivots to what the surgeon actually wants: the served
  // exchange yields, the patient dims in place (D1-A — he does not move; the
  // light simply turns away from him), the goods gather at the surgeon's side
  // as dim possibilities (D2-A), and the return direction attempts — in the
  // selected candidate's language (r3).
  2: (mod, stage) => {
    const tl = stage.timeline();
    stage.tag('b3', tl);
    tl.to(stage.capsItems, { opacity: 0, y: -6, duration: 0.35, stagger: 0.05 }, 0);
    // path=2's design keeps the service path whole — the delivered half
    // stays on record; the other candidates yield the whole served exchange.
    if (stage.path === 2) {
      tl.to(stage.deliveryEls, { attr: { opacity: 0 }, duration: 0.45 }, 0.1);
    } else {
      tl.to([stage.service.line, stage.service.d1, stage.service.d2, ...stage.deliveryEls],
        { attr: { opacity: 0 }, duration: 0.45 }, 0.1);
    }
    tl.to(stage.patient, { opacity: 0.55, duration: 1.0, ease: 'power1.inOut' }, 0.3);
    const col = GEOM.goodsCluster;
    [[stage.shoe, col.shoe], [stage.meal, col.meal], [stage.wine, col.wine]].forEach(([el, rect], i) => {
      tl.add(() => { stage.setRect(el, rect); el.style.opacity = '0'; }, 0.5);
      tl.fromTo(el, { opacity: 0, y: 14 },
        { opacity: GEOM.clusterO, y: 0, duration: 0.7, ease: 'power2.out' }, 0.65 + 0.26 * i);
    });
    const end = stage.path === 1 ? reachB3(stage, tl)
      : stage.path === 2 ? strain(stage, tl, 'b3')
        : flow(stage, tl, 'b3');
    tl.add(() => stage.applyState(ID, 2), end + 0.25);
  },

  // beat 4 — the failure that sets up the statement: the second, harder try,
  // in the selected candidate's language (r3). Drawn with intent; failing
  // with meaning; nothing degraded survives into the settle.
  3: (mod, stage) => {
    const tl = stage.timeline();
    stage.tag('b4', tl);
    const end = stage.path === 1 ? reachB4(stage, tl)
      : stage.path === 2 ? strain(stage, tl, 'b4')
        : flow(stage, tl, 'b4');
    tl.add(() => stage.applyState(ID, 3), end + 0.3);
  },

  // beat 5 — the binding line (D4-B): the scene recedes element by element
  // but the two people stay legible — the line is about them, and they anchor
  // it. The statement lands at display scale. The candidate's failure element
  // recedes with the frame while the APPROVED cell's receded record (still
  // D3-C — s2-b5-b is not reopened; its context follows the path selection
  // at the gate close) fades in beneath it, so the settle is the approved
  // cell exactly.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.surgeon, { opacity: GEOM.b5.surgeon, duration: 0.8, ease: 'power1.inOut' }, 0);
    tl.to(stage.patient, { opacity: GEOM.b5.patient, duration: 0.8, ease: 'power1.inOut' }, 0.05);
    tl.to([stage.shoe, stage.meal, stage.wine],
      { opacity: GEOM.b5.goods, duration: 0.7, ease: 'power1.inOut', stagger: 0.04 }, 0.05);
    // the candidate's element yields the corridor…
    if (stage.path === 1) {
      tl.to([stage.frags[0], stage.reachDot], { attr: { opacity: 0 }, duration: 0.7, ease: 'power1.inOut' }, 0.1);
    } else if (stage.path === 2) {
      tl.to([stage.service.line, stage.service.d1, stage.service.d2],
        { attr: { opacity: 0 }, duration: 0.7, ease: 'power1.inOut' }, 0.1);
    } else {
      tl.to(stage.drift, { opacity: 0, duration: 0.7, ease: 'power1.inOut' }, 0.1);
    }
    // …the terminal dot takes the record's voice…
    const [ax, ay, ar, ao] = GEOM.attemptDot;
    if (stage.path === 3) {
      tl.add(() => {
        stage.setDot(stage.fragDotEl, ax, ay, ar, ao * GEOM.b5.fail);
        stage.fragDotEl.setAttribute('opacity', '0');
      }, 0.1);
      tl.to(stage.fragDotEl, { attr: { opacity: 1 }, duration: 0.7, ease: 'power1.inOut' }, 0.15);
    } else {
      const d = { o: stage.path === 1 ? GEOM.pathReach.origin[3] : GEOM.pathAbsence.b4Dot[3] };
      const wd = () => stage.setDot(stage.fragDotEl, ax, ay, ar, d.o);
      tl.to(d, { o: ao * GEOM.b5.fail, duration: 0.7, ease: 'power1.inOut', onUpdate: wd }, 0.1);
    }
    // …and the approved receded record fades in on spare pool lines (the
    // closing snap renormalizes it onto the canonical ones).
    GEOM.thinSpans.forEach(([x1, x2, y, o, w], i) => {
      const line = stage.frags[6 + i];
      tl.add(() => {
        stage.setSeg(line, x1, x2, y, o * GEOM.b5.fail, w);
        line.setAttribute('opacity', '0');
      }, 0.1);
      tl.to(line, { attr: { opacity: 1 }, duration: 0.7, ease: 'power1.inOut' }, 0.15);
    });
    tl.add(() => {
      stage.stmt.textContent = 'It binds both halves of the trade to the same two people.';
      stage.stmt.style.top = `${GEOM.b5.stmtY}px`;
    }, 0);
    tl.fromTo(stage.stmt, { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0.35);
    tl.add(() => stage.applyState(ID, 4), 1.25);
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
