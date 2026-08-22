// 2.8 — the pattern and the ?. The camera pulls back and the full rail
// stands in one frame for the first time: contenders, metals, gold with its
// coinage rung, and the FIAT mark floating above the line, touching nothing
// (R2.1 §D.2 — inherited from the severance). The frame is composed
// monumental, not top-heavy (§F.4): the rail at ~62% stage height, the
// thesis block optically centered in the space above it, nothing below the
// rail but the floating FIAT mark and the stop labels — the wounds settle
// away with the pull-back. The two-chapter thesis lands across advances;
// the rail extends right into dark and the protected ? appears; the entrant
// takes the dark edge — named BITCOIN in stop typography (§D.1), described
// in the deck’s most neutral register, the honest limitation in the same
// breath. The section refuses to judge — the tools arrive next.

import { FRAMES } from '../../components/section-2/EvolutionRail.js';
import {
  ensureRailScene,
  releaseRailScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_railScene.js';

const THESIS = [
  'In the free competition, monies fell when something categorically better arrived.',
  'The last incumbent didn’t fall that way — it was captured: custody centralized, claims over-issued, redemption cancelled.',
  'Either way, the role moves. And the record has no reason to be finished.'
];

const STOPS_SEVERED = (wounds) => ({
  cattle: { state: 'defeated', wound: wounds },
  salt:   { state: 'defeated', wound: wounds },
  shells: { state: 'defeated', wound: wounds },
  iron:   { state: 'defeated', wound: wounds },
  metals: { state: 'defeated' },
  gold:   { state: 'defeated', wound: wounds }
});

const RISERS = { coinage: true, paper: true };

function railState(n) {
  return {
    // Build 0 holds the severed frame; the pull-back settles the wounds
    // away — at the full-rail camera the historical entries are labels-only
    // (stops, names and marks stay; the wound lines go), which is what makes
    // room for the thesis above them (§F.4, R7.3 §3).
    camera: n >= 1 ? FRAMES.full : FRAMES.severance,
    stops: STOPS_SEVERED(n === 0),
    risers: RISERS,
    severed: true,
    fiat: true,
    extension: n >= 4,
    entrant: n >= 5,
    limitation: n >= 6,
    // The BITCOIN block is two sentences one build apart: the three facts, then
    // the honest limitation. Each speaks on its own build (§9.4 rule 10).
    latest: n === 5 ? 'entrant' : (n === 6 ? 'limitation' : '')
  };
}

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-08-the-pattern',
  section: 'origin',
  number: 13,
  title: 'The Pattern',
  totalBuildSteps: 6,
  sceneGroup: 'evolution-rail',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureRailScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-pattern';

    const thesis = document.createElement('div');
    thesis.className = 's2o-pattern__thesis';
    const thesisLines = THESIS.map((copy, index) => {
      const line = document.createElement('p');
      line.className = 's2o-pattern__thesisline';
      line.dataset.index = String(index);
      line.textContent = copy;
      thesis.appendChild(line);
      return line;
    });
    root.appendChild(thesis);

    container.appendChild(root);

    this._refs = {
      root, rail: scene.rail, thesisLines,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff from the severance: the chart fades with its overlay and
      // the rail re-brightens into the severed frame.
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

    const n = Math.max(0, Math.min(6, Number(step) || 0));
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

    refs.rail.applyState(railState(n), { live: railLive });

    // The thesis stacks: each chapter lands at full voice on its advance and
    // the one before it settles to the dimmed-prior step (CSS keys the settling
    // on data-step). Once the record extends into the dark and the entrant
    // takes the edge, the first two chapters clear: the frame's end state is
    // the closing line, the stop labels and the entrant's block, and three
    // 40px lines competing with it is the crowding R7.3 §3 exists to remove.
    refs.thesisLines.forEach((line, index) => {
      setVisible(line, n >= index + 2 && (n < 5 || index === 2));
    });
  },

  notes: `[→] Pull back, and look at the whole record at once. Every stop on this line was money — real money, someone’s life’s work — somewhere, for a long time. And no stop held the role forever.

[→] In the free competition, the pattern is clean: monies fell when something categorically better arrived. Not slightly better — categorically. Metal over shell. Coin over ingot. Each transition, a property revolution.

[→] The last transition broke the pattern. Gold was never out-competed — nothing categorically better ever arrived. It was captured. Its custody centralized into a few vaults, the claims on it over-issued, and when the claims came due, redemption was cancelled. The incumbent that reigns today didn’t win the competition. It ended it. That’s why it sits above the line, touching nothing.

[→] Either way — beaten or captured — the role moves. And there is no reason to believe the record is finished. Which brings us to the newest mark on the line.

[→] In 2009, something appeared that had never existed before: a digital good, issued by no state and no company, with a supply fixed by its own rules. I’m going to describe it in exactly that neutral register, because describing is all we’re equipped to do so far.

[→] And in the same breath, the honest part: it is very young. Its price still swings far more than the monies it would compete with. It is not yet twenty years into a hundred-year question. Does it belong on this rail? I’m not going to answer that — because we don’t yet have the tools to answer it. To judge *any* candidate for this role, we need to know precisely what a money must do. That’s the second question on our line — and it’s next.`
};
