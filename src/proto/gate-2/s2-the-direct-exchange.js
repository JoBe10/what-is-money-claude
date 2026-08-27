// Prototype Gate 2 r2 — Scene 2, The Direct Exchange (5 beats).
//
// The stage assembles with purpose and warmth (the entry is D8's motion half:
// the presenter is concerned the opening reads somber — so light rises on the
// scene, the service path draws itself, and the capabilities land line by line
// under his voice); the delivery rides the drawn line; the frame pivots to the
// surgeon's wants; the return path attempts and fails in language C — the
// stroke thins and dies before arriving, in both lunges of b3→b4; the binding
// line lands over the two people who stay legible as its anchor.
//
// Landed states — approved cells, by construction (states.json rulings):
// s2-b1-a · s2-b2 · s2-b3-a (D1-A, D2-A) · s2-b4-c (D3-C) · s2-b5-b (D4-B).

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
  // as dim possibilities (D2-A), and the return path leaves the patient's
  // edge — attempting, in two lunges whose strokes already thin and die.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.capsItems, { opacity: 0, y: -6, duration: 0.35, stagger: 0.05 }, 0);
    tl.to([stage.service.line, stage.service.d1, stage.service.d2, ...stage.deliveryEls],
      { attr: { opacity: 0 }, duration: 0.45 }, 0.1);
    tl.to(stage.patient, { opacity: 0.55, duration: 1.0, ease: 'power1.inOut' }, 0.3);
    const col = GEOM.goodsCluster;
    [[stage.shoe, col.shoe], [stage.meal, col.meal], [stage.wine, col.wine]].forEach(([el, rect], i) => {
      tl.add(() => { stage.setRect(el, rect); el.style.opacity = '0'; }, 0.5);
      tl.fromTo(el, { opacity: 0, y: 14 },
        { opacity: GEOM.clusterO, y: 0, duration: 0.7, ease: 'power2.out' }, 0.65 + 0.26 * i);
    });
    // The attempt. A dot terminal leaves the patient's side; the first lunge
    // draws with intent and its head dies early; the second is shorter,
    // dimmer, and dies sooner — the thinning language before the failure.
    const d = GEOM.attemptDot;
    tl.add(() => stage.setDot(stage.fragDotEl, d[0], d[1], 0, d[3]), 1.55);
    tl.to(stage.fragDotEl, { attr: { r: d[2] }, duration: 0.25, ease: 'back.out(2)' }, 1.6);
    const [l1, l2] = GEOM.attempt;
    stage.drawLine(tl, stage.frags[0], 1.75, 0.55, 'power2.out', l1);
    const head1 = { x: l1[0], r: 2.4, o: 0.7 };
    const writeHead = (h) => () => stage.setPulse(h.x, 620, h.r, h.o);
    tl.add(writeHead(head1), 1.75);
    tl.to(head1, { x: l1[1], r: 1.4, o: 0.22, duration: 0.55, ease: 'power2.out', onUpdate: writeHead(head1) }, 1.77);
    tl.to(head1, { o: 0, duration: 0.18, onUpdate: writeHead(head1) }, 2.32);
    const head2 = { x: l2[0], r: 1.7, o: 0.45 };
    stage.drawLine(tl, stage.frags[1], 2.7, 0.45, 'power1.out', l2);
    tl.add(writeHead(head2), 2.7);
    tl.to(head2, { x: l2[1], r: 0.9, o: 0.08, duration: 0.45, ease: 'power1.out', onUpdate: writeHead(head2) }, 2.72);
    tl.to(head2, { o: 0, duration: 0.15, onUpdate: writeHead(head2) }, 3.17);
    tl.add(() => stage.applyState(ID, 2), 3.6);
  },

  // beat 4 — the failure, in language C (D3-C): the path gathers what it has
  // — the two lunges fuse and thicken, committed — then pushes on across the
  // corridor with its stroke visibly thinning, slowing, losing light, until
  // it dies short of arriving. Drawn with intent; failing with meaning. No
  // break, no recoil — depletion.
  3: (mod, stage) => {
    const tl = stage.timeline();
    const spans = GEOM.thinSpans;
    // The gather: lunge 1 → span 1 (thicker, brighter — the commitment),
    // lunge 2 → span 2 (pulled inward to meet it).
    [[stage.frags[0], GEOM.attempt[0], spans[0]], [stage.frags[1], GEOM.attempt[1], spans[1]]]
      .forEach(([line, from, to]) => {
        const p = { x1: from[0], x2: from[1], o: from[3], w: from[4] };
        tl.to(p, {
          x1: to[0], x2: to[1], o: to[3], w: to[4],
          duration: 0.55, ease: 'power2.inOut',
          onUpdate: () => stage.setSeg(line, p.x1, p.x2, 620, p.o, p.w)
        }, 0.1);
      });
    // The push: the remaining spans draw right-to-left in one continuous
    // motion, each thinner and dimmer, the pace easing off as the light runs
    // out; the head narrows and gutters out at the death point.
    const durs = [0.3, 0.32, 0.36, 0.44];
    let at = 0.75;
    spans.slice(2).forEach((conf, i) => {
      stage.drawLine(tl, stage.frags[2 + i], at, durs[i], 'none', conf);
      at += durs[i];
    });
    const head = { x: spans[2][0], r: 1.9, o: 0.5 };
    const writeHead = () => stage.setPulse(head.x, 620, head.r, head.o);
    tl.add(writeHead, 0.75);
    tl.to(head, { x: spans[5][1], r: 0.45, o: 0.05, duration: at - 0.75, ease: 'power1.out', onUpdate: writeHead }, 0.77);
    // The gutter: two failing flickers where it died, then nothing.
    tl.to(head, { o: 0.16, duration: 0.09, yoyo: true, repeat: 1, onUpdate: writeHead }, at + 0.05);
    tl.to(head, { o: 0, duration: 0.12, onUpdate: writeHead }, at + 0.3);
    tl.add(() => stage.applyState(ID, 3), at + 0.75);
  },

  // beat 5 — the binding line (D4-B): the scene recedes element by element
  // but the two people stay legible — the line is about them, and they anchor
  // it. The statement lands at display scale.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.to(stage.surgeon, { opacity: GEOM.b5.surgeon, duration: 0.8, ease: 'power1.inOut' }, 0);
    tl.to(stage.patient, { opacity: GEOM.b5.patient, duration: 0.8, ease: 'power1.inOut' }, 0.05);
    tl.to([stage.shoe, stage.meal, stage.wine],
      { opacity: GEOM.b5.goods, duration: 0.7, ease: 'power1.inOut', stagger: 0.04 }, 0.05);
    tl.to([...stage.frags.slice(0, 6), stage.fragDotEl],
      { attr: { opacity: GEOM.b5.fail }, duration: 0.7, ease: 'power1.inOut' }, 0.1);
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
