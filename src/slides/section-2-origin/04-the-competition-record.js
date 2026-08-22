// 2.4–2.5 merged (R2.1 §E) — the competition record. Four contenders in a
// row take their wounds, one clean line each; the law lands; and then the
// transformation: the law clears and a line draws itself horizontally
// through the four contenders — stops form beneath each glyph, the wounds
// condense to the faint defeated treatment, the composition eases into rail
// geometry. The row the viewer has been watching IS the record. The shells
// stop takes its dated receipt, and the camera eases right as METALS rises.
//
// First slide of the `evolution-rail` scene group: the rail this slide
// forms out of the contender row persists — untorn — through the table, the
// ladder, the severance, and the pattern.

import { FRAMES, STOP_X } from '../../components/section-2/EvolutionRail.js';
import { RailFeature, RAIL_FEATURE } from '../../components/section-2/RailFeature.js';
import {
  ensureRailScene,
  releaseRailScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_railScene.js';

// The register switch (R7.2 §D1). Builds 0–5 introduce the four contenders on
// the dark-field register: these are goods a family's savings lived in, and
// "you cannot divide a cow and keep it a cow" only bites if the viewer has
// seen the animal. Build 6 is the transformation — the line draws through the
// row and each render collapses into the grammar mark that will carry it for
// the rest of the deck. The switch is the beat's own meaning: it is the moment
// history stops holding a good and starts keeping an entry about it, and every
// later appearance of cattle, salt, shells or iron is that entry.
//
// This is one of the two register switches sanctioned in Sections 1–3. The
// exchange triangle, the murmuration, the ladder, the tower and the waypoints
// stay pure line grammar by rule.

// Builds 0–5: the contender row (no line yet); one wound per advance. `latest`
// names the wound that lands on this build — it speaks at full voice while the
// ones before it hold the dimmed-prior step (§9.4 rule 10, R7.3). Build 5 names
// none: the law is the sentence there, and the four wounds have all receded.
const ROW = ['cattle', 'salt', 'shells', 'iron'];
const rowStops = (wounds, latest) => ({
  ...Object.fromEntries(ROW.map((id, i) => [id, {
    state: 'lit',
    wound: wounds >= i + 1 ? 'contender' : false,
    latest: latest === id
  }])),
  metals: { state: 'hidden' },
  gold:   { state: 'hidden' }
});

// Builds 6–8: the record. The shells wound stays the contender line until
// the receipt replaces it on build 7.
const recordStops = ({ shells, metals, latest }) => ({
  cattle: { state: 'defeated', wound: 'contender' },
  salt:   { state: 'defeated', wound: 'contender' },
  shells: { state: 'defeated', wound: shells, latest: latest === 'shells' },
  iron:   { state: 'defeated', wound: 'contender' },
  metals: { state: metals },
  gold:   { state: 'upcoming' }
});

const BUILD_STATES = [
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(0) },
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(1, 'cattle') },
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(2, 'salt') },
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(3, 'shells') },
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(4, 'iron') },
  { camera: FRAMES.row, contenders: true, renders: true, line: false, stops: rowStops(4) },
  // The transformation. `renders` goes with `contenders`, so the crossfade and
  // the line's arrival are one gesture rather than two sequenced ones.
  { camera: FRAMES.early, stops: recordStops({ shells: 'contender', metals: 'upcoming' }) },
  { camera: FRAMES.early, stops: recordStops({ shells: 'receipt', metals: 'upcoming', latest: 'shells' }) },
  { camera: FRAMES.metals, stops: recordStops({ shells: 'receipt', metals: 'active' }) }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-04-the-competition-record',
  section: 'origin',
  number: 9,
  title: 'The Competition Record',
  totalBuildSteps: 8,
  sceneGroup: 'evolution-rail',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureRailScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-competition';
    // Mixed: the contenders arrive as renders and leave as marks (§9.4.9).
    root.dataset.register = 'mixed';

    const law = document.createElement('p');
    law.className = 's2o-competition__law';
    law.textContent =
      'The market keeps re-running one experiment — and keeps selecting the good that survives across space, across time, across scale.';
    root.appendChild(law);

    // METALS rises: the flagged close-up (R7.3 §7) over the stop that just went
    // active, in stage space so the rail stays a diagram. Dormant until a
    // metals study exists — RailFeature returns null for a subject with no
    // graded render, and the slot costs nothing while it waits.
    let feature = null;
    if (RAIL_FEATURE) {
      const cam = FRAMES.metals;
      feature = RailFeature({
        subject: 'metals',
        x: 960 + (STOP_X.metals - cam.cx) * cam.s,
        bottom: 486
      });
      if (feature) root.appendChild(feature);
    }

    container.appendChild(root);

    this._refs = {
      root, rail: scene.rail, law, feature,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff (backward from the table): the rail re-brightens in place.
      this._build(ctx.container, ensureRailScene(ctx.container));
      adoptOverlay(ctx.container, this._refs.root, this._refs);
      this._refs.reconstruct = true;
      this._refs.handoff = true;
      if ((ctx.targetBuildStep || 0) === 0) this._applyBuild(0);
      return;
    }
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit(ctx) {
    finishOverlayCleanup(ctx?.container, this._refs);
    releaseRailScene(ctx?.container, Boolean(ctx?.continuous));
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(8, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    // A handoff animates the rail from its current state; cold
    // reconstruction snaps it.
    const railLive = live || refs.handoff;
    refs.handoff = false;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    // Reconstructed frames (direct entry, back-navigation) land instantly:
    // the snap attribute suppresses every transition for this apply.
    if (!live && !railLive) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    refs.rail.applyState(BUILD_STATES[n], { live: railLive });

    // Build 5: the law. Build 6: the law line clears as the line draws.
    setVisible(refs.law, n === 5);
    // The arrival moment is the last build; the camera moves on by leaving.
    if (refs.feature) refs.feature.dataset.visible = String(n === 8);
  },

  notes: `[→] Once you know the contest is about salability, all of monetary history snaps into focus. Every culture entered its own candidates. Cattle — genuinely valuable, and genuinely useless the moment you need to make change. You cannot divide a cow and keep it a cow.

[→] Salt — precious, portable, and gone in one bad storm.

[→] Shells — beautiful and scarce, right up until scarcity turned out to be local. Their supply was one ship away from collapse. Remember that one; you’re about to see the ship arrive.

[→] Iron — abundant, which is the problem. It rusts, and anyone with a furnace can make more of it.

[→] Different centuries, different continents, same experiment — and the market keeps selecting for the same thing: the good that survives across space, across time, across scale. Hold those three dimensions. They will follow us for the rest of the inquiry.

[→] Now watch what these four have been standing on all along. Lay the whole record on one line — this is the rail we’ll ride for the rest of the story, and every mark on it was money, somewhere, for centuries.

[→] And here is the shell story ending, exactly as promised. When European ships began landing thousands of tons of cheaper Zanzibar cowries in West Africa, the shells’ scarcity — which had always been an accident of distance — collapsed. The people holding their savings in shells were not out-traded. They were out-*supplied*. Remember this defeat; it is the oldest version of a very modern problem.

[→] Out of the wreckage, one family of goods keeps rising, on every continent that has them: the metals. Hard to make more of. Slow to decay. Divisible without dying. The competition is about to get much narrower.`
};
