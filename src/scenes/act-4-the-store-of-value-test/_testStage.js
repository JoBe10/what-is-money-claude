// Act IV — the shared stage for Scenes 16 through 23 (Batch D).
//
// One continuous visual world: the scene modules share this one stage object,
// cached on the engine's container across within-group handoffs, so every
// in-act boundary — S16→S17, S17→S18, S18→S19, and Session 2's S19→S20 …
// S22→S23 — is real shared-DOM continuity and never a remount. Scenes 16–19
// land at Session 1; Scenes 20–23 join at Session 2. The scenes drive it
// through two surfaces only, exactly as Acts I, II and III established:
//
//   applyState(sceneId, build)  — reconstructs the COMPLETE settled state of
//                                 any build, instantly. Direct entry,
//                                 backward movement, reduced motion and
//                                 interrupted animations all resolve here.
//   timeline()                  — a registered GSAP timeline for a forward
//                                 gesture. Every timeline ends by snapping to
//                                 applyState, so a settled frame is always
//                                 exactly the approved cell it must match.
//
// THE TREATMENTS ARE THE LEGACY MODULES THEMSELVES, RE-HOMED — not
// transcribed, not re-authored. The ruled map (docs/act-4-provenance.md,
// 3 Sep 2026) is PORT throughout, with two ruled ADAPTs made at the source
// (the Batch D rulings 1 and 2), and the approved cells (review/act-4/states,
// presenter-approved in full 3 Sep 2026) were rendered by MOUNTING THE
// LEGACY SLIDE MODULES at their builds. This stage does the same thing in
// the deck: each legacy module is rendered once into a layer of its own and
// driven through its own public surface — render / onEnter / buildStep, the
// calls the deck runs — so a settled state is the legacy's own direct-entry
// frame for that build, the legacy stylesheet places every element, and a
// live advance is the legacy's own dataset choreography at the legacy's own
// durations (the `_snapFrame` contract inside each module handles the
// reconstruction snap and the live flag). The homecoming layer mounts the
// film's own Act I stage and applies Scene 4's approved save state through
// the stage's own state law — the approved s4-b4-b by construction.
//
// WHERE THE FILM MOVES AND THE LEGACY DID NOT — the connective motion, all
// of it flagged in the session report: the homecoming's entry (the one
// authored morph the brief names: the Scene 4 frame reconstructing around
// the disc Scene 15 leaves at center, in the Act I stage's own vocabulary);
// the disc's travel from its rest on the save road to the fork's apex as the
// definition lands (S16 b1→b2); and its re-centering to the carrier stage
// (S16 b4→b5) — the last two recorded as wiring on the approved cells. Every
// boundary between two legacy slides plays the legacy deck's own boundary:
// the engine's 300ms crossfade, transcribed (`crossfade`), followed by the
// incoming build's own reveal — "the carrier, inherited", as the legacy
// carried it across five slides.
//
// THE ROOT'S OPAQUE BLACK GROUND is half the rasterization contract; the
// shared rasterHint claim is the other half (components/rasterHint.js). A
// hidden layer is `display:none`, never merely transparent — the Batch C
// compositing lesson: a transparent layer beneath text flips its
// antialiasing, and the approved cells carry no such layer.

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';
import {
  ensureStage as ensureAct1,
  destroyStage as destroyAct1,
  GEOM as ACT1_GEOM
} from '../act-1-the-unfinished-exchange/_exchangeStage.js';
import s404 from '../../slides/section-4-ideal-store/04-unfinished-exchange.js';
import s406 from '../../slides/section-4-ideal-store/06-claim-and-carrier.js';
import s407 from '../../slides/section-4-ideal-store/07-store-of-value-function.js';
import s408 from '../../slides/section-4-ideal-store/08-100-year-test.js';
import s409 from '../../slides/section-4-ideal-store/09-future-is-unknowable.js';
import s410 from '../../slides/section-4-ideal-store/10-invert-the-question.js';
import s411 from '../../slides/section-4-ideal-store/11-carrier-failures-i.js';
import s412 from '../../slides/section-4-ideal-store/12-carrier-failures-ii.js';
import s413 from '../../slides/section-4-ideal-store/13-failure-to-requirement.js';
import s414 from '../../slides/section-4-ideal-store/14-ten-properties.js';
import s415 from '../../slides/section-4-ideal-store/15-framework-to-comparison.js';
import s416 from '../../slides/section-4-ideal-store/16-the-comparison.js';

gsap.registerPlugin(CustomEase);

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { ACT1_GEOM };

// The legacy Section 4 modules this stage re-homes, by layer key — 4-04 and
// 4-06 … 4-10 for Scenes 16–19 (Session 1), 4-11 … 4-16 for Scenes 20–23
// (Session 2). Each leaves the manifest at the Batch D splice; the file stays
// on disk and this stage is where it lives on.
const LEGACY = { s404, s406, s407, s408, s409, s410, s411, s412, s413, s414, s415, s416 };

// The deck's own boundary curve — CSS `ease-out`, exactly as SlideEngine's
// crossfade runs it — so the in-act boundaries move as the legacy deck's did.
const DECK_EASE_OUT = CustomEase.create('act4-deck-ease-out', '0,0,0.58,1');
const CROSSFADE = 0.3;

// ------------------------------------------------------------------ the states
//
// One entry per approved cell, in beat order: which layer stands, at which
// legacy build — the beat → build derivation of review/act-4/harness/
// states.mjs, verbatim. The scene ids are permanent deep links, chosen for
// what each scene is.

const at = (layer, build) => ({ layer, build });

export const STATES = {
  // S16 — the approved cells s16-b1 … s16-b8: the homecoming (the film's own
  // s4-b4-b), 4-04 at builds 3 · 3 (held) · 4, then 4-06 at builds 1–4.
  'return-to-the-open-exchange': [
    at('act1', 3),
    at('s404', 3), at('s404', 3), at('s404', 4),
    at('s406', 1), at('s406', 2), at('s406', 3), at('s406', 4)
  ],
  // S17 — s17-b1 … s17-b5: 4-07 at builds 1–5.
  'what-the-carrier-must-preserve': [1, 2, 3, 4, 5].map((b) => at('s407', b)),
  // S18 — s18-b1 … s18-b8: 4-08 at builds 1–3, then 4-09 at builds 1–5
  // (4-09's build 0 is 4-08's own last state; the merge is the architecture's).
  'the-100-year-test': [
    at('s408', 1), at('s408', 2), at('s408', 3),
    at('s409', 1), at('s409', 2), at('s409', 3), at('s409', 4), at('s409', 5)
  ],
  // S19 — s19-b1 · s19-b2: 4-10 at builds 1–2 (the carrier keyed to build 2
  // at the source — the Batch D ruling 1).
  'invert-the-question': [at('s410', 1), at('s410', 2)],
  // S20 — s20-b1 … s20-b5: 4-11 at builds 1–5, one typographic row per beat.
  'how-the-carrier-can-fail-i': [1, 2, 3, 4, 5].map((b) => at('s411', b)),
  // S21 — s21-b1 … s21-b5: 4-12 at builds 1–5.
  'how-the-carrier-can-fail-ii': [1, 2, 3, 4, 5].map((b) => at('s412', b)),
  // S22 — s22-b1 … s22-b3: 4-13 at builds 1–2 (the two sweeps), then 4-14 at
  // its last build — the complete list, the ten landing in one advance (the
  // Batch D ruling 2; S22-F2's one change, made at Scene 22's gesture).
  'from-failure-to-requirement': [at('s413', 1), at('s413', 2), at('s414', 2)],
  // S23 — s23-b1 … s23-b6: 4-15 at builds 1–4 (the lineup whole, Row 1 = A),
  // then 4-16 at builds 1–2 — the fifty scores in one advance, the line.
  'the-comparison': [
    at('s415', 1), at('s415', 2), at('s415', 3), at('s415', 4),
    at('s416', 1), at('s416', 2)
  ]
};

export const TOTAL_BUILDS = Object.fromEntries(
  Object.entries(STATES).map(([id, states]) => [id, states.length - 1]));

// Hide an element that carries a CSS reveal transition, instantly — used at
// gesture launch points so a reveal can start from darkness without the
// element's own fade playing backwards on the first frame.
export function hideInstantly(el, apply) {
  const prior = el.style.transition;
  el.style.transition = 'none';
  apply();
  // eslint-disable-next-line no-unused-expressions
  el.offsetHeight;
  el.style.transition = prior;
}

// ------------------------------------------------- the legacy's own gestures
//
// Three shapes cover every beat that is the legacy's own motion. `settle` is
// the time, from the gesture's start, at which the legacy's longest
// transition for that build has landed and the snap may close it.

// A beat that is the legacy's own live advance: the module's buildStep from
// the settled build − 1 (the contract's launch point), then the snap.
export const legacyAdvance = (id, n, key, build, settle) => (mod, stage) => {
  const tl = stage.timeline();
  tl.add(() => stage.live(key, build), 0.05);
  tl.add(() => stage.applyState(id, n), settle);
};

// A boundary between two legacy slides, as the legacy deck played it: the
// crossfade onto the incoming slide's build 0 (the carrier inherited), then
// that slide's own build-1 reveal, then the snap to the film's state `n` —
// 0 for a scene's morphIn, the beat index where the merge sits inside a
// scene (S18's 4-08 → 4-09).
export const legacyBoundary = (id, n, fromKey, toKey, settle) => (mod, stage) => {
  const tl = stage.timeline();
  const done = stage.crossfade(tl, 0.05, fromKey, toKey, 0);
  tl.add(() => stage.live(toKey, 1), done + 0.06);
  tl.add(() => stage.applyState(id, n), settle);
};

// A cold entry that is the legacy's own first advance: the slide at its
// build 0, then its build-1 reveal, then the snap.
export const legacyEntry = (id, key, settle) => (mod, stage) => {
  stage.applyState(id, 0);
  stage.snapTo(key, 0);   // the launch point: the legacy's own build 0
  const tl = stage.timeline();
  tl.add(() => stage.live(key, 1), 0.1);
  tl.add(() => stage.applyState(id, 0), settle);
};

// ------------------------------------------------------------------- the stage

class Act4Stage {
  constructor(container) {
    this.container = container;
    this.motion = new Set();
    this.scene = null;
    this.build = 0;
    this.states = STATES;
    this.layers = {};
    this._buildDom();
  }

  _buildDom() {
    const root = document.createElement('div');
    root.className = 'act4-stage';
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:#000;';
    this.root = root;
    // Attached before the layers mount, so the Act I stage's own rasterHint
    // claim finds the deck canvas above it.
    this.container.appendChild(root);

    // The homecoming layer: the film's own Act I stage, mounted whole, driven
    // by its own state law. Layer order is beat order.
    this.act1 = ensureAct1(this._layer('act1'));

    // The legacy layers: each legacy module rendered once, at its build 0,
    // by its own `render` — its root, its refs, its stylesheet.
    Object.entries(LEGACY).forEach(([key, mod]) => {
      mod.render(this._layer(key));
    });

    // The elements a gesture touches with GSAP outside the legacy's own
    // dataset choreography — each given back exactly what the gestures
    // write, at every reconstruction. The layers carry the crossfade's
    // opacity and scale (their inset positioning is never cleared — clearing
    // `top`/`left` would collapse an inset-positioned layer to nothing and
    // clip the slide inside it); the Act I mark is reset by the Act I
    // stage's own applyState; the two 4-04 elements the re-centering tweens
    // give back their top, opacity and transition.
    this.s404Headline = this.el('s404', '.s4-unfinished__headline');
    this.s404ClaimStage = this.el('s404', '.s4-unfinished__claim-stage');
    this.animated = [
      ...Object.values(this.layers),
      this.act1.markWrap,
      this.s404Headline,
      this.s404ClaimStage
    ];
  }

  _layer(key) {
    const el = document.createElement('div');
    el.className = 'act4-layer';
    el.dataset.layer = key;
    el.style.cssText = 'position:absolute; inset:0; display:none;';
    this.root.appendChild(el);
    this.layers[key] = el;
    return el;
  }

  // An element of a legacy layer, by the legacy's own class.
  el(key, selector) {
    return this.layers[key].querySelector(selector);
  }

  // ---- the two legacy drives ----

  // Reconstruct a layer at a build with no transition: the Act I stage's own
  // applyState, or the legacy module's own direct-entry sequence — onEnter
  // with the target build (which arms its reconstruction snap), then
  // buildStep — exactly as the engine mounts it and exactly as the approved
  // cells were rendered.
  snapTo(key, build) {
    if (key === 'act1') {
      this.act1.applyState('spend-or-save', build);
      return;
    }
    const mod = LEGACY[key];
    mod.onEnter({ targetBuildStep: build, container: this.layers[key] });
    mod.buildStep(build);
  }

  // Play the legacy module's own live advance to `build` from a settled
  // build − 1 (the contract's launch point): its dataset choreography, the
  // legacy stylesheet's durations and staggers.
  live(key, build) {
    LEGACY[key].buildStep(build);
  }

  showLayer(key, build) {
    this.layers[key].style.display = '';
    this.snapTo(key, build);
  }

  hideLayer(key) {
    this.layers[key].style.display = 'none';
  }

  // The legacy deck's own boundary between two Section 4 slides — the
  // engine's crossfade (SlideEngine._crossfade), transcribed: the incoming
  // layer rises (opacity, a slight settle of scale from 0.985) while the
  // outgoing dissolves in place beneath it, 300ms ease-out, no black frame
  // between. Returns the time the outgoing layer leaves the paint tree.
  crossfade(tl, atTime, fromKey, toKey, toBuild) {
    const out = this.layers[fromKey];
    const inn = this.layers[toKey];
    tl.add(() => {
      gsap.set(inn, { opacity: 0, scale: 0.985, transformOrigin: 'center center' });
      this.showLayer(toKey, toBuild);
    }, atTime);
    tl.to(inn, { opacity: 1, scale: 1, duration: CROSSFADE, ease: DECK_EASE_OUT }, atTime + 0.02);
    tl.to(out, { opacity: 0, duration: CROSSFADE, ease: DECK_EASE_OUT }, atTime + 0.02);
    const done = atTime + 0.02 + CROSSFADE + 0.02;
    tl.add(() => {
      this.hideLayer(fromKey);
      gsap.set(out, { clearProps: 'opacity' });
    }, done);
    return done;
  }

  // ---- the scene contract's state law ----

  applyState(sceneId, build) {
    this.killMotion();
    const st = this.states[sceneId][build];
    this.scene = sceneId;
    this.build = build;

    // One layer in the paint tree, reconstructed first — its root carries the
    // legacy snap for two frames, so the clearing beneath lands with no
    // transition running.
    Object.entries(this.layers).forEach(([key, layer]) => {
      layer.style.display = key === st.layer ? '' : 'none';
    });
    this.snapTo(st.layer, st.build);

    // No inline motion value survives a reconstruction — cleared under the
    // legacy snap, so a restored opacity lands without its CSS transition.
    gsap.killTweensOf(this.animated);
    gsap.set(Object.values(this.layers), { clearProps: 'opacity,transform' });
    gsap.set(this.s404Headline, { clearProps: 'opacity' });
    gsap.set(this.s404ClaimStage, { clearProps: 'top' });
    this.s404Headline.style.transition = '';
  }

  // ---- motion registry ----

  timeline(vars = {}) {
    const tl = gsap.timeline(vars);
    this.motion.add(tl);
    tl.eventCallback('onComplete', () => this.motion.delete(tl));
    return tl;
  }

  killMotion() {
    this.motion.forEach((tl) => tl.kill());
    this.motion.clear();
    this.act1.killMotion();
  }

  hasMotion() {
    return this.motion.size > 0 || this.act1.hasMotion();
  }

  // Serialized settled state — the harness compares this between motion-on
  // and reduced-motion runs to prove end-state parity mechanically. The
  // legacy layer's every data attribute (the choreography's whole state,
  // the transient snap excluded) with its computed opacity, and the disc's
  // size; the homecoming through the Act I stage's own serializer.
  serialize() {
    const st = this.states[this.scene]?.[this.build];
    const layer = st ? st.layer : null;
    const out = {
      scene: this.scene,
      build: this.build,
      layer,
      layers: Object.fromEntries(Object.entries(this.layers).map(([k, l]) => [k, l.style.display]))
    };
    if (layer === 'act1') {
      out.act1 = this.act1.serialize();
    } else if (layer) {
      const root = this.layers[layer].firstElementChild;
      const data = (el) => {
        const d = { ...el.dataset };
        delete d.snap;
        return d;
      };
      out.legacy = {
        step: root.dataset.step,
        live: root.dataset.live,
        elements: [root, ...root.querySelectorAll('*')]
          .filter((el) => Object.keys(data(el)).length)
          .map((el) => [el.getAttribute('class'), data(el), getComputedStyle(el).opacity]),
        disc: root.querySelector('.s4-claim-object__disc')?.style.getPropertyValue('--disc-size') || null
      };
    }
    return out;
  }

  destroy() {
    this.killMotion();
    gsap.killTweensOf(this.root.querySelectorAll('*'));
    gsap.killTweensOf(this.root);
    Object.entries(LEGACY).forEach(([key, mod]) => {
      mod.onExit?.({ container: this.layers[key] });
    });
    destroyAct1(this.layers.act1);
    this.root.remove();
  }
}

// The stage rides the engine's container so a within-group handoff finds it
// alive; a cold mount builds it fresh. Deterministic init, tolerant re-entry.
export function ensureStage(container) {
  if (container.__act4Stage) return container.__act4Stage;
  container.innerHTML = '';
  // While Act IV is on stage, release the deck canvas's layer hint so its
  // text rasterizes the way the approved cells did (components/rasterHint.js).
  const canvas = claimRasterHint(container);
  const stage = new Act4Stage(container);
  stage._canvas = canvas;
  container.__act4Stage = stage;
  window.__act4 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize(),
    apply: (sceneId, build) => stage.applyState(sceneId, build)
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__act4Stage;
  if (!stage) return;
  releaseRasterHint(stage._canvas);
  stage.destroy();
  delete container.__act4Stage;
  if (window.__act4) delete window.__act4;
}
