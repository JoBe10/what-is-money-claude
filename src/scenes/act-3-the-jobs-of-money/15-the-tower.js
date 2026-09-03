// Scene 15 — The Tower (7 beats; CANDIDATE A, the presenter's selection —
// the proportional inverted tower — plus the pivot coda as the act's final
// beat, the Act III final ruling 3, 3 Sep 2026, master §13, its visual
// amended by the Acts III–IV final ruling 3 of the same day).
//
// The scene is entered from the ladder world (Scene 14 ends on the coin's
// landing — "Then let's judge it there.") and opens on the ruled line, "But
// before we judge it there, let me pull the rug slightly." After the held
// question THE EXIT LANDS ON THE TOWER: on the final advance the tower
// recedes to its glowing base slab — the upper layers, the claim links and
// the drop dissolve — and the hinge question lands beneath it: "What makes
// something a good store of value?" No return to the triad. The act leaves
// on the question over the base, and Scene 16's homecoming morphs from the
// slab.
//
// The descending reveal: PAYMENT APPS lands at the frame's top, widest and
// faintest; BANK DEPOSITS beneath it, outlined; BASE MONEY at the bottom —
// narrow, solid, near-luminous, the one solid object in the frame. Width is
// claim volume, solidity is realness, and each layer lands beneath the last
// with the legacy slab's own settle-down gesture. The shiver is beat 4's
// event, transcribed value for value from `3-06`'s proven choreography over
// the A geometry; the scoping recede plays the legacy foundation's own
// 900ms color transitions; and the held question is the legacy drop drawing
// itself, reaching from the solid base into black — every line of copy off
// stage, NO DISC (the r2 thread ruling: the disc lives at the triad's
// center, never on the tower).
//
// Landed states — the approved candidate-A cells s15-b1-a … s15-b6-a, and
// the exit s15-b7 (the base slab and the hinge question — the Acts III–IV
// final ruling 3; the triad-return coda on file as s15-b7-triad), by
// construction.

import { gsap } from 'gsap';
import { makeSceneModule } from './_sceneModule.js';
import { A_SLABS, slabLook } from './_jobsStage.js';

const ID = 'the-tower';

// A slab lands beneath the last — the legacy `.s3f-tower__slab` reveal
// transcribed: opacity in as the slab settles down its final 14px
// (the legacy's 700/900ms pair on the settle curve).
function placeSlab(stage, key, foundation = false) {
  const s = A_SLABS.find((x) => x.key === key);
  const { look, labelColor } = slabLook(key, foundation);
  const slab = stage.slabs[key];
  slab.el.style.cssText = `position:absolute; left:${960 - s.w / 2}px; top:${s.top}px;` +
    `width:${s.w}px; height:${s.h}px; display:grid; place-items:center; box-sizing:border-box; ${look}`;
  slab.label.style.cssText = `font-size:25px; font-weight:500; letter-spacing:0.18em; color:${labelColor};`;
  return slab.el;
}
function landSlab(stage, tl, key, at) {
  tl.add(() => {
    const el = placeSlab(stage, key);
    gsap.fromTo(el, { opacity: 0, y: -14 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' });
  }, at);
}

// A claim link lights in its gap — the legacy link's own 800ms fade.
function litLink(stage, tl, key, at) {
  tl.add(() => {
    const { line, caption, spec } = stage.links[key];
    line.style.cssText = `position:absolute; left:959.5px; top:${spec.top}px; width:1px;` +
      `height:${spec.height}px; background:rgba(255,255,255,0.5);`;
    caption.style.cssText = `position:absolute; left:994px; top:${spec.top + spec.height / 2}px;` +
      'transform:translateY(-50%); width:460px; margin:0; font-size:22px; line-height:1.4;' +
      'color:var(--text-secondary);';
    gsap.fromTo([line, caption], { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power1.out' });
  }, at);
}

// The seam from Scene 14 (the Act III final ruling 3): the tower is entered
// from the ladder world — the ladder, its climbers and the coin's landing
// line clear, and the top layer lands where the viewer lives.
function morphIn(mod, stage) {
  stage.applyState('the-coffee-objection', 2);
  const tl = stage.timeline();
  tl.to([stage.ladderLayer, stage.stmt], { opacity: 0, duration: 0.6, ease: 'power1.inOut' }, 0.1);
  tl.add(() => {
    stage.ladderLayer.style.display = 'none';
    stage.towerLayer.style.display = '';
    stage.towerLayer.dataset.step = '1';
    stage.towerLayer.dataset.live = 'false';
  }, 0.7);
  landSlab(stage, tl, 'apps', 0.8);
  tl.add(() => stage.applyState(ID, 0), 2.0);
}

// A statement lands in the deck's slot (the home frame's own question
// register for the coda).
function landStatement(stage, tl, copy, at, { question = false } = {}) {
  tl.add(() => {
    stage.setStatement(copy, { question });
    gsap.fromTo(stage.stmt,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }, at);
}

// Cold entry at beat 1: PAYMENT APPS lands over black.
function entry(mod, stage) {
  stage.applyState(ID, 0);
  const tl = stage.timeline();
  tl.add(() => { stage.slabs.apps.el.style.opacity = '0'; }, 0.05);
  landSlab(stage, tl, 'apps', 0.12);
  tl.add(() => stage.applyState(ID, 0), 1.4);
}

// THE SHIVER — 3-06's proven choreography, value for value, over the A
// geometry: the base flickers once (460ms: 1 → 0.42 at 30% → 0.88 at 62% →
// 1), and the shudder travels upward — deposits and its link at 220ms, apps
// and its link at 380ms (620ms each: +2.5 at 22%, −1.5 at 48%, +0.8 at 74%).
// A shudder, not a collapse; choreography over an unchanged state.
function shiver(stage, tl, at) {
  tl.add(() => {
    gsap.to(stage.slabs.base.el, {
      keyframes: { '30%': { opacity: 0.42 }, '62%': { opacity: 0.88 }, '100%': { opacity: 1 } },
      duration: 0.46, ease: 'power1.inOut'
    });
    const shudder = (els, delay) => gsap.to(els, {
      keyframes: { '22%': { y: 2.5 }, '48%': { y: -1.5 }, '74%': { y: 0.8 }, '100%': { y: 0 } },
      duration: 0.62, delay, ease: 'power1.inOut'
    });
    // The captions hold their -50% centring while they shudder (GSAP's
    // yPercent carries it; the snap restores the recorded transform).
    ['l1', 'l2'].forEach((k) => gsap.set(stage.links[k].caption, { yPercent: -50, y: 0 }));
    shudder([stage.slabs.deposits.el, stage.links.l2.line, stage.links.l2.caption], 0.22);
    shudder([stage.slabs.apps.el, stage.links.l1.line, stage.links.l1.caption], 0.38);
  }, at);
}

const transitions = {
  // beat 2 — the app balance is not money: BANK DEPOSITS lands beneath, the
  // first claim line lights in the gap with its caption.
  1: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => { stage.towerLayer.dataset.step = '2'; }, 0.05);
    landSlab(stage, tl, 'deposits', 0.12);
    litLink(stage, tl, 'l1', 0.6);
    tl.add(() => stage.applyState(ID, 1), 1.8);
  },

  // beat 3 — BASE MONEY: the narrow, solid, near-luminous block completes
  // the shape, the second claim line lights, the run line lands in its slot.
  2: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => { stage.towerLayer.dataset.step = '3'; }, 0.05);
    landSlab(stage, tl, 'base', 0.12);
    litLink(stage, tl, 'l2', 0.6);
    tl.add(() => { stage.towerRows.run.dataset.visible = 'true'; }, 1.0);
    tl.add(() => stage.applyState(ID, 2), 2.2);
  },

  // beat 4 — fair in both directions: the principle lands, and the shiver
  // plays — the proven b4 event over the unchanged A state.
  3: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.towerLayer.dataset.step = '4';
      stage.towerRows.principle.dataset.visible = 'true';
    }, 0.12);
    shiver(stage, tl, 0.55);
    tl.add(() => stage.applyState(ID, 3), 1.8);
  },

  // beat 5 — the scoping: the wide faint layers recede further and the base
  // takes the scene's single allowed orange — the legacy foundation's own
  // 900ms color transitions, played on the A geometry's own properties.
  4: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      const T = 'border-color 900ms ease-out, background-color 900ms ease-out,' +
        ' box-shadow 900ms ease-out, color 900ms ease-out';
      const apps = stage.slabs.apps;
      apps.el.style.transition = T;
      apps.el.style.borderColor = 'rgba(255,255,255,0.07)';
      apps.el.style.background = 'transparent';
      apps.label.style.transition = 'color 900ms ease-out';
      apps.label.style.color = 'rgba(255,255,255,0.18)';
      const dep = stage.slabs.deposits;
      dep.el.style.transition = T;
      dep.el.style.borderColor = 'rgba(255,255,255,0.14)';
      dep.el.style.background = 'rgba(255,255,255,0.012)';
      dep.label.style.transition = 'color 900ms ease-out';
      dep.label.style.color = 'var(--text-dim)';
      const base = stage.slabs.base;
      base.el.style.transition = T;
      base.el.style.borderWidth = '1.5px';
      base.el.style.borderStyle = 'solid';
      base.el.style.borderColor = 'rgba(247, 147, 26, 0)';
      // eslint-disable-next-line no-unused-expressions
      base.el.offsetHeight;
      base.el.style.borderColor = 'rgba(247, 147, 26, 0.85)';
      base.el.style.boxShadow = '0 0 30px rgba(247, 147, 26, 0.5), 0 0 80px rgba(247, 147, 26, 0.2)';
      ['l1', 'l2'].forEach((k) => {
        const { line, caption } = stage.links[k];
        line.style.transition = 'background-color 900ms ease-out';
        line.style.background = 'rgba(255,255,255,0.2)';
        caption.style.transition = 'color 900ms ease-out';
        caption.style.color = 'var(--text-dim)';
      });
      stage.towerLayer.dataset.step = '5';
      stage.towerRows.scoping.dataset.visible = 'true';
    }, 0.12);
    tl.add(() => stage.applyState(ID, 4), 1.6);
  },

  // beat 6 — the held question: every line of copy clears, and the
  // bottom-most claim line draws from the solid base into empty black and
  // dissolves — pointing at nothing. No disc.
  5: (mod, stage) => {
    const tl = stage.timeline();
    tl.add(() => {
      stage.towerLayer.dataset.step = '6';
      ['run', 'principle', 'scoping'].forEach((k) => {
        stage.towerRows[k].dataset.visible = 'false';
      });
    }, 0.12);
    tl.add(() => { stage.drop.dataset.visible = 'true'; }, 0.75);
    tl.add(() => stage.applyState(ID, 5), 2.3);
  },

  // beat 7 — the exit (the Acts III–IV final ruling 3): the tower recedes to
  // its glowing base slab — PAYMENT APPS, BANK DEPOSITS, both claim links
  // and the held question's drop dissolve, the base holding its foundation
  // look and its place — and the hinge question lands beneath it in the
  // deck's question register. No return to the triad. The act leaves on the
  // question over the base; Scene 16's homecoming morphs from the slab.
  6: (mod, stage) => {
    const tl = stage.timeline();
    const upper = [
      stage.slabs.apps.el, stage.slabs.deposits.el,
      ...['l1', 'l2'].flatMap((k) => [stage.links[k].line, stage.links[k].caption]),
      stage.drop
    ];
    tl.to(upper, { opacity: 0, duration: 0.7, ease: 'power1.inOut', stagger: 0.04 }, 0.1);
    landStatement(stage, tl, stage.states[ID][6].question, 0.95, { question: true });
    tl.add(() => stage.applyState(ID, 6), 2.0);
  }
};

export default makeSceneModule({
  id: ID,
  number: 15,
  title: 'The Tower',
  entry,
  morphIn,
  transitions,
  notes: `[→] But before we judge it there, let me pull the rug slightly. Is the thing in your bank account actually the base good we'd be judging? Start from the top, where you live: the payment app.

[→] The app balance is not money. It's a claim on your bank deposit — a number that points at another number.

[→] And the deposit — this is the part almost nobody is ever told — is not money sitting in a vault with your name on it either. It is your bank's IOU: a claim, redeemable on demand, in base money — cash if you withdraw it, central-bank reserves when your bank settles with another. And look at the shape of the tower we just built, because the proportions are the point: the claims stacked above are *wider* than the base beneath them. There are far more claims on base money than there is base money. That's not a metaphor and not a scandal — it's arithmetic, and it's exactly what a bank run runs on: it's all fine, right up until too many claimants ask at once.

[→] So let me be fair to the tower in both directions. Layers are not a scam. Notes on gold, deposits on notes, apps on deposits — every mature money has grown credit layers, because layers are how money scales to daily commerce; they're as old as sound money itself. But feel what just happened when the foundation shivered: every layer above it moved. Layers inherit the soundness of their base. A tower is only as good as what it stands on.

[→] Which finally makes the real question precise. It was never about payment apps, and it was never about banking layers — those are engineering on top, and engineering can be excellent. The question is about the foundation asset underneath them all.

[→] And before we go find it — sit with this for a moment. Every layer is a claim on the layer below. So what is the bottom layer a claim on? … Hold that question. We're coming back to it.

[→] So now we can ask it properly. What makes something a good store of value? That question — asked from first principles — is the rest of this story.`
});
