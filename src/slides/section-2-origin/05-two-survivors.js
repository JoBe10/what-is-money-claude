// 2.5 part two — the periodic elimination. The stylized table rises over
// the rail, which dims in place beneath it (the R2.1 §A designed exception:
// the rail → table → rail boundaries keep spatial continuity — no void, and
// the return to the rail reads as a return). The gases drift off, the
// corrosion wave dims most of the table, the radioactive elements pulse
// out, the shapeless settle — and then the furnace wave takes the noble
// metals that melt too high to work, leaving Au and Ag lit, alone. Each
// wave is one auto-timed visual gesture on its own advance; each
// elimination line renders small beneath the table as its wave runs.
//
// R4.1 (ruling R-03): the furnace wave is new. Chemistry alone does not
// leave two survivors — it leaves the noble family — and saying otherwise
// closed a door that slide 3.5 needs open, because palladium has to be a
// real candidate that lost on timing rather than one chemistry had already
// excluded. Six builds now, six arrows.

import { FRAMES } from '../../components/section-2/EvolutionRail.js';
import { ElementGrid } from '../../components/section-2/ElementGrid.js';
import { DarkFieldImage } from '../../components/DarkField.js';
import {
  ensureRailScene,
  releaseRailScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_railScene.js';

// R7.2 §D2 — a FLAGGED CANDIDATE, off by default. The brief offers the final
// build a dark-field gold study as the "gold won everything" arrival: the
// chemistry resolves to two, and the one that took the throne stands there as
// an object. Both variants are screenshotted for the presenter's ruling
// (review/rebuild-r7-2/screenshots/gold-arrival-*.png).
//
// Off is the default because this beat's on-screen claim is "workable nobility
// leaves two" and the winner is named in the spoken line only — landing gold on
// stage here pre-empts a distinction 2.6 opens with. Flipping this constant to
// true is the whole change; nothing else moves.
export const GOLD_ARRIVAL = false;

// The rail holds the state the competition record left behind. On entry it
// dims in place (build 0 — present, not void); once the table rises over it
// (build 1 on) it recedes to the heavy dim and stays there.
const railState = (n) => ({
  camera: FRAMES.metals,
  dimmed: n === 0 ? true : 'deep',
  stops: {
    cattle: { state: 'defeated', wound: 'contender' },
    salt:   { state: 'defeated', wound: 'contender' },
    shells: { state: 'defeated', wound: 'receipt' },
    iron:   { state: 'defeated', wound: 'contender' },
    metals: { state: 'active' },
    gold:   { state: 'upcoming' }
  }
});

const WAVE_LINES = [
  { step: 2, copy: 'Anything that floats away is out.' },
  { step: 3, copy: 'Anything that rusts, burns, or dissolves is out.' },
  { step: 4, copy: 'Anything that kills the holder is out.' },
  { step: 5, copy: 'Anything that will not hold a shape is out.' }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-05-two-survivors',
  section: 'origin',
  number: 10,
  title: 'Two Survivors',
  totalBuildSteps: 6,
  sceneGroup: 'evolution-rail',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureRailScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-survivors';
    root.dataset.register = GOLD_ARRIVAL ? 'mixed' : 'line';

    const kicker = document.createElement('p');
    kicker.className = 's2o-survivors__kicker';
    kicker.textContent = 'Run the competition over the whole table.';
    root.appendChild(kicker);

    const gridWrap = document.createElement('div');
    gridWrap.className = 's2o-survivors__grid';
    const grid = ElementGrid();
    gridWrap.appendChild(grid.el);
    root.appendChild(gridWrap);

    const waveLines = WAVE_LINES.map(({ step, copy }) => {
      const line = document.createElement('p');
      line.className = 's2o-survivors__waveline';
      line.dataset.step = String(step);
      line.textContent = copy;
      root.appendChild(line);
      return line;
    });

    const verdict = document.createElement('p');
    verdict.className = 's2o-survivors__verdict';
    verdict.textContent = 'Workable nobility leaves two.';
    root.appendChild(verdict);

    let arrival = null;
    if (GOLD_ARRIVAL) {
      arrival = DarkFieldImage({
        name: 'gold',
        width: 320,
        height: 240,
        alt: 'A cast gold bar',
        className: 's2o-survivors__arrival'
      }).el;
      root.appendChild(arrival);
    }

    container.appendChild(root);

    this._refs = {
      root, rail: scene.rail, kicker, gridWrap, grid, waveLines, verdict, arrival,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
      // Handoff: the rail dims in place beneath the slide; the table rises
      // over it on the first advance (forward) or stands already (backward).
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
    // On a handoff the grid leaves with its fading overlay (it owns no
    // timers or listeners); destroying it here would pop the table out of
    // the crossfade.
    if (!ctx?.continuous) this._refs?.grid.destroy();
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

    // Build 0 is the dimmed rail alone; build 1 raises the table over it;
    // builds 2–6 map to the grid’s elimination steps 1–5.
    setVisible(refs.kicker, n >= 1);
    refs.gridWrap.dataset.visible = String(n >= 1);
    refs.grid.applyState(Math.max(0, n - 1), { live: live && n >= 2 });

    // The current wave’s line only; the verdict replaces them at the end.
    refs.waveLines.forEach((line) => {
      setVisible(line, n === Number(line.dataset.step));
    });
    setVisible(refs.verdict, n >= 6);
    // The flagged arrival lands with the verdict, on the last build only.
    if (refs.arrival) refs.arrival.dataset.visible = String(n >= 6);
  },

  notes: `[→] So let’s zoom all the way out — past history, past geography — to the full set of candidates nature ever offered. Here’s my favorite way to see how narrow the funnel really is. Forget history for a moment — run the salability competition across every element that exists.

[→] The gases are out — your money should not float away.

[→] Everything that rusts, burns, or dissolves in water — out. That removes most of the table, including iron, and it’s why the rainstorm mattered.

[→] The radioactive row — out, for reasons I hope are obvious.

[→] And strip away what will not hold a shape — the metal that pours, the ones no fire of the age could work at all. What’s left is a small family: the noble metals, the ones that simply refuse to corrode.

[→] And now the furnace decides. The platinum group melts at temperatures no ancient furnace could reach, and hides in ores no ancient chemist could crack — which is why the world would not even meet one of them until 1803. Remember that; it has a part to play later. So: not culture, not politics — chemistry and the forge leave you two survivors: silver, and gold. Every civilization that could refine metals converged on the same two, without consulting each other. That is what convergence on properties looks like at planetary scale. And between the two, the scarcer one, the one that doesn’t tarnish at all, took the throne: gold won everything.`
};
