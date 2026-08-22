// 2.6 — the abstraction ladder. The table lifts away, the rail re-brightens
// and the camera eases right to GOLD igniting active; gold’s own wounds
// land compactly beside it; then the risers — COINAGE, PAPER — stack above
// the stop, each buying convenience and paying for it in trust. The claim
// ladder’s first rung is planted here, casually, in PAPER’s line, and never
// elaborated.

import { FRAMES, STOP_X } from '../../components/section-2/EvolutionRail.js';
import { RailFeature, RAIL_FEATURE } from '../../components/section-2/RailFeature.js';
import {
  ensureRailScene,
  releaseRailScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_railScene.js';

const STOPS_BASE = {
  cattle: { state: 'defeated', wound: true },
  salt:   { state: 'defeated', wound: true },
  shells: { state: 'defeated', wound: true },
  iron:   { state: 'defeated', wound: true },
  metals: { state: 'defeated' },
  gold:   { state: 'active' }
};

const STOPS_WOUNDED_GOLD = {
  ...STOPS_BASE,
  gold: { state: 'active', wound: true }
};

// Gold's traits land as their own sentence on build 1, so that build names them
// `latest`; from build 2 the rungs are speaking and the traits recede to the
// dimmed-prior step (§9.4 rule 10, R7.3).
const STOPS_GOLD_SPEAKING = {
  ...STOPS_BASE,
  gold: { state: 'active', wound: true, latest: true }
};

const BUILD_STATES = [
  { camera: FRAMES.gold, stops: STOPS_BASE },
  { camera: FRAMES.gold, stops: STOPS_GOLD_SPEAKING },
  { camera: FRAMES.gold, stops: STOPS_WOUNDED_GOLD, risers: { coinage: true }, latest: 'coinage' },
  { camera: FRAMES.gold, stops: STOPS_WOUNDED_GOLD, risers: { coinage: true, paper: true }, latest: 'paper' },
  { camera: FRAMES.gold, stops: STOPS_WOUNDED_GOLD, risers: { coinage: true, paper: true } }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-06-the-abstraction-ladder',
  section: 'origin',
  number: 11,
  title: 'The Abstraction Ladder',
  totalBuildSteps: 4,
  sceneGroup: 'evolution-rail',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureRailScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-ladder';
    // The flagged close-up puts a render on this slide (R7.3 §7); with the
    // toggle off it speaks pure line grammar, like every other rail slide.
    root.dataset.register = RAIL_FEATURE ? 'mixed' : 'line';

    const law = document.createElement('p');
    law.className = 's2o-ladder__law';
    law.textContent = 'Each rung buys convenience — and pays for it in trust.';
    root.appendChild(law);

    // GOLD takes the crown: the close-up rides above the stop it belongs to,
    // in stage space, and recedes when the first rung claims that airspace.
    // The stop's own stage x is the camera's — this frame holds FRAMES.gold on
    // every build, so it is a constant here rather than a per-build lookup.
    let feature = null;
    if (RAIL_FEATURE) {
      const cam = FRAMES.gold;
      feature = RailFeature({
        subject: 'gold',
        x: 960 + (STOP_X.gold - cam.cx) * cam.s,
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
      // Handoff: forward from the table (it lifts, the rail re-brightens and
      // rides to gold) or backward from the severance.
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

    const n = Math.max(0, Math.min(4, Number(step) || 0));
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
    setVisible(refs.law, n >= 4);
    // The crown moment holds while gold itself is the subject (builds 0–1) and
    // recedes as the ladder starts climbing into that airspace (R7.3 §7).
    if (refs.feature) refs.feature.dataset.visible = String(n <= 1);
  },

  notes: `[→] So why isn’t there gold in your pocket? Because winning the properties contest didn’t cure gold’s own weaknesses. It’s heavy. It’s hard to verify — bite marks and touchstones only get you so far. And moving a fortune in it is an invitation to lose one.

[→] So people built upward. Stamp the metal into standard coins and you’ve solved verification and division at a stroke — every coin the same weight, the same purity, the same stamp — as long as you trust the mint.

[→] But coins solve the market stall, not the merchant fleet. Move a fortune in coin and you’re back to weight, guards, and dangerous roads — the burden grows with the amount, and so does the risk. And most gold ended up resting in vaults for safekeeping anyway. So the second rung: leave the gold where it’s safe, and trade the *receipt* — a claim on gold in a vault, light as air, divisible by the stroke of a pen, good across any distance the issuer’s name can travel. As long as you trust the vault.

[→] See the pattern: each rung up the ladder buys convenience, and pays for it in trust. The coin trusts the mint. The note trusts the vault. For a long time, that exchange rate looked like a bargain. Now watch what happens when the trust gets stretched to breaking.`
};
