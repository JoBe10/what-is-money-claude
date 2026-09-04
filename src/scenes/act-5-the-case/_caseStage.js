// Act V — the shared stage for Scenes 24 through 30 (Batch E).
//
// One continuous visual world: the scene modules share this one stage object,
// cached on the engine's container across within-group handoffs, so every
// in-act boundary — S24→S25, S25→S26, S26→S27, S27→S28, S28→S29 and S29→S30
// — is real shared-DOM continuity and never a remount. The scenes drive it
// through two surfaces only, exactly as Acts I, II, III and IV established:
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
// transcribed, not re-authored. The ruled map (docs/act-5-provenance.md,
// RULED 4 Sep 2026) is PORT throughout the act but for one ADAPT at the close,
// and the approved cells (review/act-5/states, presenter-
// approved in full 4 Sep 2026) were rendered by MOUNTING THE LEGACY SLIDE
// MODULES at their builds. This stage does the same thing in the deck: each
// legacy module is rendered once into a layer of its own and driven through
// its own public surface — render / onEnter / buildStep, the calls the deck
// runs — so a settled state is the legacy's own direct-entry frame for that
// build, the legacy stylesheet places every element, and a live advance is
// the legacy's own dataset choreography at the legacy's own durations (the
// `_snapFrame` contract inside each module handles the reconstruction snap
// and the live flag).
//
// ACT V AUTHORS NO MOTION OF ITS OWN. Act IV had one authored morph (the
// homecoming); this act has none. The descent the map's §0 records — nothing
// grows, everything narrows — is carried entirely by the legacy's own
// advances and the legacy deck's own boundaries. The six seams were ruled on
// 4 September 2026 (master §13; docs/batch-e-package.md §1.2): each boundary
// is played AS THE LEGACY PLAYED IT, no settled frame changes, and nothing is
// redesigned. All six, and where each one lives:
//
//   · Act IV → Scene 24 — a crossfade. It is a cross-group boundary, so the
//     ENGINE's own crossfade plays it (SlideEngine `_render`, the non-
//     continuous path): the fifty scores under "Don't trust. Verify." dissolve
//     while Scene 24 rises at legacy 4-17's build 0, fiat standing alone with
//     its two jobs. The question changes and the film cuts; nothing here is a
//     morph, and this stage authors nothing for it (`legacyCut`).
//   · Inside Scene 26, beat 5 → beat 6 — the legacy crossfade. The four roles
//     and their final line give way to the first coexistence statement,
//     exactly as the legacy played 4-19 → 4-20, whose build 0 is empty
//     (`legacyBoundary`, the same shape Act IV used at its own merges).
//   · Scene 27 → Scene 28 — the legacy boundary onto 4-22's build 0, the stock
//     at rest, then its build-1 reveal: the margin lights as the words land.
//     The through-line's last journey rides that same crossfade — the one
//     decision claim dissolves as the three demand claims appear at the field's
//     right edge — which is the wiring the ruling asks for and the whole of it.
//   · Scene 28 → Scene 29 — the full clear onto the kicker alone: the field,
//     its claims and its lines dissolve completely while 4-23's build 0, the
//     kicker on black, rises beneath them; then the four summary lines land.
//   · Scene 29 → Scene 30 — the case dissolves into black. 5-01's build 0 is
//     black, so the boundary lands on it and nothing follows: the silence is a
//     scripted beat, not a seam (master §3.5).
//
// THE ONE PLACE THIS STAGE REACHES PAST THE LEGACY'S PUBLIC SURFACE, and why.
// The close's ADAPT retires 5-01's build 1 (the wayline), so the film's two
// close beats are that module's builds 0 and 2 — an advance the legacy's own
// `_snapFrame` contract cannot recognise as live, because it tests
// `n === appliedStep + 1` and the film has taken a build out of the middle.
// Left alone, the last frame of the film would POP instead of playing the
// legacy's authored 1000ms fade of "Thank you." from black. `liveAcrossRetiredBuild`
// clears the snap attribute that apply arms, in the same task and before any
// style resolution, so the legacy's own transition runs exactly as it always
// did. It changes no legacy file, no settled state and no timing — it restores
// a fade the retirement would otherwise have taken with it.
//
// WHERE A SCENE'S FIRST BEAT IS A LEGACY BUILD 0 — Scenes 24, 25 and 27, by
// the entry-line ruling (Row 1 = A, 4 Sep 2026: the legacy's own entry advance
// made explicit) — the boundary lands ON that build rather than playing a
// build-1 reveal after it. That is `legacyBoundaryTo0` for a within-act
// handoff and `legacyCut` for a cold arrival: the frame the legacy always
// spoke the entry line over, arriving the way the legacy deck delivered it.
//
// THE ROOT'S OPAQUE BLACK GROUND is half the rasterization contract; the
// shared rasterHint claim is the other half (components/rasterHint.js). A
// hidden layer is `display:none`, never merely transparent — the Batch C
// compositing lesson: a transparent layer beneath text flips its
// antialiasing, and the approved cells carry no such layer. `display:none`
// also keeps every hidden layer out of the paint tree, which matters more in
// this act than in any before it: Act V draws the same five dark-field
// subjects at three box sizes (the display box here, the compact box at
// Scene 27, Scene 23's 100 band just before), and the act-5-states session
// recorded that a subject painted at one box can resample from that cached
// raster when it is next painted at another. One layer paints at a time.

import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { claimRasterHint, releaseRasterHint } from '../../components/rasterHint.js';
import s417 from '../../slides/section-4-ideal-store/17-store-of-value-function-migrates.js';
import s418 from '../../slides/section-4-ideal-store/18-monetary-premium.js';
import s419 from '../../slides/section-4-ideal-store/19-other-assets-do-moneys-job.js';
import s420 from '../../slides/section-4-ideal-store/20-bitcoin-does-not-replace-everything.js';
import s421 from '../../slides/section-4-ideal-store/21-marginal-store-of-value-decision.js';
import s422 from '../../slides/section-4-ideal-store/22-fixed-supply-reprices-at-margin.js';
import s423 from '../../slides/section-4-ideal-store/23-investment-case-from-first-principles.js';
import s501 from '../../slides/section-5-close/01-thank-you.js';

gsap.registerPlugin(CustomEase);

export const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The legacy Act V modules this stage re-homes, by layer key — 4-17 … 4-21 for
// Scenes 24–27, and 4-22, 4-23 and 5-01 for Scenes 28–30. All eight leave the
// manifest at the Batch E splice; the files stay on disk and this stage is
// where they live on. After that splice no legacy slide is in the deck at all,
// and this map is the last place the legacy Act V runs.
const LEGACY = { s417, s418, s419, s420, s421, s422, s423, s501 };

// The deck's own boundary curve — CSS `ease-out`, exactly as SlideEngine's
// crossfade runs it — so the in-act boundaries move as the legacy deck's did.
const DECK_EASE_OUT = CustomEase.create('act5-deck-ease-out', '0,0,0.58,1');
const CROSSFADE = 0.3;

// ------------------------------------------------------------------ the states
//
// One entry per approved cell, in beat order: which layer stands, at which
// legacy build — the beat → build derivation of review/act-5/harness/
// states.mjs, verbatim, at the frozen beat map (master §13, 4 Sep 2026:
// S24 4 · S25 4 · S26 9 · S27 3). The scene ids are permanent deep links,
// chosen for what each scene is.

const at = (layer, build) => ({ layer, build });

export const STATES = {
  // S24 — the approved cells s24-b1 … s24-b4: 4-17 at builds 0–3. Build 0 is
  // the entry beat (Row 1 = A): fiat standing with its two jobs.
  migration: [0, 1, 2, 3].map((b) => at('s417', b)),
  // S25 — s25-b1 … s25-b4: 4-18 at builds 0–3. Build 0 is the entry beat: the
  // equation's left-hand side alone.
  'the-monetary-premium': [0, 1, 2, 3].map((b) => at('s418', b)),
  // S26 — s26-b1 … s26-b9: 4-19 at builds 1–5 (the four roles, then their
  // final line), then 4-20 at builds 1–4 (the three coexistence statements,
  // then the law) — the architecture's own merge. 4-20's builds 5–7, the
  // stability contrast, are retired by Ruling 5 and are never driven.
  'when-other-assets-do-moneys-job': [
    at('s419', 1), at('s419', 2), at('s419', 3), at('s419', 4), at('s419', 5),
    at('s420', 1), at('s420', 2), at('s420', 3), at('s420', 4)
  ],
  // S27 — s27-b1 … s27-b3: 4-21 at builds 0–2. Build 0 is the entry beat, and
  // it is the legacy's own composition: the claim at the decision point WITH
  // the question already standing above it — the order the presenter approved
  // as rendered on 4 September 2026.
  'the-marginal-decision': [0, 1, 2].map((b) => at('s421', b)),
  // S28 — s28-b1 … s28-b3: 4-22 at builds 1–3. Build 0, the stock at rest, is
  // NOT a beat: the boundary from Scene 27 lands on it and the margin lights
  // as the words land (the seam ruling, 4 Sep 2026), so it is the composition
  // this scene's entry gesture starts from.
  'fixed-supply-reprices-at-the-margin': [1, 2, 3].map((b) => at('s422', b)),
  // S29 — s29-b1 · s29-b2: 4-23 at builds 1–2. Build 0, the kicker alone on
  // black, is not a beat either: it is what the full clear lands on.
  'the-case-from-first-principles': [at('s423', 1), at('s423', 2)],
  // S30 — s30-b1 · s30-b2: 5-01 at build 0 (black — the silence, its own beat
  // by Row 6 = A) and build 2 (Thank you.). Build 1, the wayline returning
  // with all three waypoints completed, is the ADAPT's one ruled change: the
  // waypoint device is retired by the structure freeze (architecture Ruling 1),
  // so it is in no state and is never shown.
  'the-close': [at('s501', 0), at('s501', 2)]
};

export const TOTAL_BUILDS = Object.fromEntries(
  Object.entries(STATES).map(([id, states]) => [id, states.length - 1]));

// ------------------------------------------------- the legacy's own gestures
//
// Four shapes cover every beat and boundary in this act. `settle` is the time,
// from the gesture's start, at which the legacy's longest transition for that
// build has landed and the snap may close it.

// A beat that is the legacy's own live advance: the module's buildStep from
// the settled build − 1 (the contract's launch point), then the snap.
export const legacyAdvance = (id, n, key, build, settle) => (mod, stage) => {
  const tl = stage.timeline();
  tl.add(() => stage.live(key, build), 0.05);
  tl.add(() => stage.applyState(id, n), settle);
};

// A boundary between two legacy slides, as the legacy deck played it: the
// crossfade onto the incoming slide's build 0, then that slide's own build-1
// reveal, then the snap to the film's state `n`. Used where the incoming
// scene's first beat is a legacy build 1 — Scene 26's entry, and the merge
// inside it where 4-19 hands to 4-20.
export const legacyBoundary = (id, n, fromKey, toKey, settle) => (mod, stage) => {
  const tl = stage.timeline();
  const done = stage.crossfade(tl, 0.05, fromKey, toKey, 0);
  tl.add(() => stage.live(toKey, 1), done + 0.06);
  tl.add(() => stage.applyState(id, n), settle);
};

// The same boundary where the incoming scene's first beat IS the legacy's
// build 0 — Scenes 25 and 27, by the entry-line ruling. The crossfade lands on
// that build and nothing follows it: the legacy spoke the entry line over this
// exact frame, and the ruling made the advance that lands it the scene's own.
export const legacyBoundaryTo0 = (id, fromKey, toKey, settle) => (mod, stage) => {
  const tl = stage.timeline();
  stage.crossfade(tl, 0.05, fromKey, toKey, 0);
  tl.add(() => stage.applyState(id, 0), settle);
};

// A cold entry that is the legacy's own first advance: the slide at its
// build 0, then its build-1 reveal, then the snap. Scene 26's, whose first
// beat is 4-19's build 1.
export const legacyEntry = (id, key, settle) => (mod, stage) => {
  stage.applyState(id, 0);
  stage.snapTo(key, 0);   // the launch point: the legacy's own build 0
  const tl = stage.timeline();
  tl.add(() => stage.live(key, 1), 0.1);
  tl.add(() => stage.applyState(id, 0), settle);
};

// An advance across a build the film has retired. The legacy's `beginBuild`
// treats any apply that is not `appliedStep + 1` as a reconstruction and arms
// `data-snap`, which the stylesheet reads as "no transitions" — correct for a
// direct entry, wrong for this one advance, which IS the viewer's single step
// forward and only looks like a jump because the ADAPT removed the build in
// between. Clearing the attribute in the same task, before the browser
// resolves style, lets the legacy's own transition play. Nothing else is
// touched: the module set every value it always sets.
export const legacyAdvanceAcrossRetiredBuild = (id, n, key, build, settle) => (mod, stage) => {
  const tl = stage.timeline();
  tl.add(() => stage.liveAcrossRetiredBuild(key, build), 0.05);
  tl.add(() => stage.applyState(id, n), settle);
};

// A cold arrival on a scene whose first beat is a legacy build 0: the frame
// stands, and the deck's own crossfade delivers it. This is the Act IV → Scene
// 24 seam as ruled — the film cuts because the question changes — and it is
// also how Scenes 25 and 27 arrive when they are entered cold rather than
// across their in-act boundary. This stage authors nothing here, which is the
// point: the ruling says the boundary is a crossfade, and the engine's own
// crossfade is the one the legacy deck played.
export const legacyCut = (id) => (mod, stage) => {
  stage.applyState(id, 0);
};

// ------------------------------------------------------------------- the stage

class Act5Stage {
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
    root.className = 'act5-stage';
    root.style.cssText = 'position:absolute; inset:0; overflow:hidden;' +
      'font-family:Inter,sans-serif; background:#000;';
    this.root = root;
    this.container.appendChild(root);

    // The legacy layers: each legacy module rendered once, at its build 0, by
    // its own `render` — its root, its refs, its stylesheet. Layer order is
    // beat order.
    Object.entries(LEGACY).forEach(([key, mod]) => {
      mod.render(this._layer(key));
    });

    // The elements a gesture touches with GSAP outside the legacy's own
    // dataset choreography. In this act that is the layers alone — the
    // crossfade's opacity and scale — because Act V authors no motion of its
    // own. Their inset positioning is never cleared: clearing `top`/`left`
    // would collapse an inset-positioned layer to nothing and clip the slide
    // inside it (the Batch D reconstruction defect, recorded at its session).
    this.animated = [...Object.values(this.layers)];
  }

  _layer(key) {
    const el = document.createElement('div');
    el.className = 'act5-layer';
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

  // Reconstruct a layer at a build with no transition: the legacy module's own
  // direct-entry sequence — onEnter with the target build (which arms its
  // reconstruction snap), then buildStep — exactly as the engine mounts it and
  // exactly as the approved cells were rendered.
  snapTo(key, build) {
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

  // `live`, for the one advance that steps over a retired build (see the
  // header). The module has already written every value; only the snap the
  // contract armed has to go, and it goes before any style resolution.
  liveAcrossRetiredBuild(key, build) {
    const mod = LEGACY[key];
    mod.buildStep(build);
    delete this.layers[key].firstElementChild.dataset.snap;
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
  }

  hasMotion() {
    return this.motion.size > 0;
  }

  // Serialized settled state — the harness compares this between motion-on
  // and reduced-motion runs to prove end-state parity mechanically. The legacy
  // layer's every data attribute (the choreography's whole state, the
  // transient snap excluded) with its computed opacity, and the disc's size.
  serialize() {
    const st = this.states[this.scene]?.[this.build];
    const layer = st ? st.layer : null;
    const out = {
      scene: this.scene,
      build: this.build,
      layer,
      layers: Object.fromEntries(Object.entries(this.layers).map(([k, l]) => [k, l.style.display]))
    };
    if (layer) {
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
    this.root.remove();
  }
}

// The stage rides the engine's container so a within-group handoff finds it
// alive; a cold mount builds it fresh. Deterministic init, tolerant re-entry.
export function ensureStage(container) {
  if (container.__act5Stage) return container.__act5Stage;
  container.innerHTML = '';
  // While Act V is on stage, release the deck canvas's layer hint so its text
  // rasterizes the way the approved cells did (components/rasterHint.js).
  const canvas = claimRasterHint(container);
  const stage = new Act5Stage(container);
  stage._canvas = canvas;
  container.__act5Stage = stage;
  window.__act5 = {
    settled: () => !stage.hasMotion(),
    state: () => stage.serialize(),
    apply: (sceneId, build) => stage.applyState(sceneId, build)
  };
  return stage;
}

export function destroyStage(container) {
  const stage = container.__act5Stage;
  if (!stage) return;
  releaseRasterHint(stage._canvas);
  stage.destroy();
  delete container.__act5Stage;
  if (window.__act5) delete window.__act5;
}
