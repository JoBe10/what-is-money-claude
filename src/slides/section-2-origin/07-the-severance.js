// 2.7 — the severance. The ladder stands over the gold stop; 1971 lands
// large and alone; the cut opens at the coinage–paper link and the paper
// rung — the claim layer — departs and settles as the FIAT marker floating
// above the line, right of GOLD, touching nothing (R2.1 §D.2: every money
// in the record sits on the line; the current one hovers over it). Then the
// chart — what one unit of the major currencies still buys, 1971 = 100 —
// and the balance, both lines, because both are true.
//
// DATA: final, sourced (R4). The four series are the real annual national
// CPI records, inverted to purchasing power of one unit and indexed
// 1971 = 100, 1971 through 2025 — every year plotted, no interpolation and
// no control points. Series, sources, retrieval dates and the GBP series
// choice live in `src/data/purchasing-power.js` and `docs/SOURCES.md`
// (WIM-FX-001…004). No point values are rendered on screen.

import { FRAMES } from '../../components/section-2/EvolutionRail.js';
import {
  PURCHASING_POWER,
  PP_SERIES,
  PP_YEAR_MIN,
  PP_YEAR_MAX
} from '../../data/purchasing-power.js';
import {
  ensureRailScene,
  releaseRailScene,
  adoptOverlay,
  finishOverlayCleanup
} from './_railScene.js';

const SERIES = PP_SERIES.map((s) => ({ ...s, values: PURCHASING_POWER[s.id] }));

const YEAR_MIN = PP_YEAR_MIN;
const YEAR_MAX = PP_YEAR_MAX;
const PLOT_W = 1080;
const PLOT_H = 360;

// One vertex per observed year — the line is the record, not a curve fit.
function seriesPath(values) {
  const coords = values.map((v, i) => {
    const px = (i / (values.length - 1)) * PLOT_W;
    const py = PLOT_H - (v / 105) * PLOT_H;
    return `${px.toFixed(1)} ${py.toFixed(1)}`;
  });
  return `M ${coords.join(' L ')}`;
}

const STOPS_REIGNING = {
  cattle: { state: 'defeated', wound: true },
  salt:   { state: 'defeated', wound: true },
  shells: { state: 'defeated', wound: true },
  iron:   { state: 'defeated', wound: true },
  metals: { state: 'defeated' },
  gold:   { state: 'active', wound: true }
};

const STOPS_SEVERED = {
  ...STOPS_REIGNING,
  gold: { state: 'defeated', wound: true }
};

const RISERS = { coinage: true, paper: true };

const BUILD_STATES = [
  { camera: FRAMES.severance, stops: STOPS_REIGNING, risers: RISERS },
  { camera: FRAMES.severance, stops: STOPS_REIGNING, risers: RISERS },
  { camera: FRAMES.severance, stops: STOPS_SEVERED, risers: RISERS, severed: true, fiat: true },
  { camera: FRAMES.severance, stops: STOPS_SEVERED, risers: RISERS, severed: true, fiat: true, dimmed: true },
  { camera: FRAMES.severance, stops: STOPS_SEVERED, risers: RISERS, severed: true, fiat: true, dimmed: true }
];

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '2-07-the-severance',
  section: 'origin',
  number: 12,
  title: 'The Severance',
  totalBuildSteps: 4,
  sceneGroup: 'evolution-rail',

  render(container) {
    container.innerHTML = '';
    this._build(container, ensureRailScene(container));
    this._applyBuild(0);
  },

  _build(container, scene) {
    const root = document.createElement('div');
    root.className = 's2o s2o--overlay s2o-severance';

    const date = document.createElement('p');
    date.className = 's2o-severance__date';
    date.textContent = '1971.';
    root.appendChild(date);

    const decree = document.createElement('p');
    decree.className = 's2o-severance__decree';
    decree.textContent =
      'Redemption ends. For the first time in the record, the world’s money is pure decree — the trust rung with nothing under it.';
    root.appendChild(decree);

    // ----- The chart -----
    const chart = document.createElement('div');
    chart.className = 's2o-severance__chart';

    const headline = document.createElement('p');
    headline.className = 's2o-severance__headline';
    headline.textContent = 'What one unit still buys.';
    chart.appendChild(headline);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `-70 -30 ${PLOT_W + 150} ${PLOT_H + 80}`);
    svg.classList.add('s2o-severance__plot');

    // Reference line at 100 and the base axis.
    const ref = document.createElementNS(svgNS, 'line');
    ref.setAttribute('x1', 0);
    ref.setAttribute('y1', PLOT_H - (100 / 105) * PLOT_H);
    ref.setAttribute('x2', PLOT_W);
    ref.setAttribute('y2', PLOT_H - (100 / 105) * PLOT_H);
    ref.classList.add('s2o-severance__refline');
    svg.appendChild(ref);

    const axis = document.createElementNS(svgNS, 'line');
    axis.setAttribute('x1', 0);
    axis.setAttribute('y1', PLOT_H);
    axis.setAttribute('x2', PLOT_W);
    axis.setAttribute('y2', PLOT_H);
    axis.classList.add('s2o-severance__axis');
    svg.appendChild(axis);

    const refLabel = document.createElementNS(svgNS, 'text');
    refLabel.setAttribute('x', -16);
    refLabel.setAttribute('y', PLOT_H - (100 / 105) * PLOT_H + 7);
    refLabel.setAttribute('text-anchor', 'end');
    refLabel.classList.add('s2o-severance__axislabel');
    refLabel.textContent = '100';
    svg.appendChild(refLabel);

    const zeroLabel = document.createElementNS(svgNS, 'text');
    zeroLabel.setAttribute('x', -16);
    zeroLabel.setAttribute('y', PLOT_H + 7);
    zeroLabel.setAttribute('text-anchor', 'end');
    zeroLabel.classList.add('s2o-severance__axislabel');
    zeroLabel.textContent = '0';
    svg.appendChild(zeroLabel);

    [1971, 1980, 1990, 2000, 2010, 2020].forEach((year) => {
      const x = ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * PLOT_W;
      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', PLOT_H + 34);
      label.setAttribute('text-anchor', year === YEAR_MIN ? 'start' : 'middle');
      label.classList.add('s2o-severance__axislabel');
      label.textContent = String(year);
      svg.appendChild(label);
    });

    // End labels first take their line’s final y, then close pairs are
    // spread apart (USD and GBP end within a label’s height of each other).
    const labelYs = SERIES.map(({ values }) =>
      PLOT_H - (values[values.length - 1] / 105) * PLOT_H + 6);
    const order = labelYs.map((y, i) => [y, i]).sort((a, b) => a[0] - b[0]);
    for (let k = 1; k < order.length; k += 1) {
      if (order[k][0] - order[k - 1][0] < 24) order[k][0] = order[k - 1][0] + 24;
    }
    order.forEach(([y, i]) => { labelYs[i] = y; });

    const paths = SERIES.map(({ id, alpha, values }, index) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', seriesPath(values));
      path.classList.add('s2o-severance__series');
      path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
      path.style.setProperty('--i', String(index));

      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', PLOT_W + 18);
      label.setAttribute('y', labelYs[index]);
      label.classList.add('s2o-severance__serieslabel');
      label.style.fill = `rgba(255, 255, 255, ${alpha})`;
      label.textContent = id;

      svg.appendChild(path);
      svg.appendChild(label);
      return { path, label };
    });

    chart.appendChild(svg);

    const indexNote = document.createElement('p');
    indexNote.className = 's2o-severance__indexnote';
    indexNote.textContent = 'Purchasing power of one unit · 1971 = 100 · as of 2025';
    chart.appendChild(indexNote);

    root.appendChild(chart);

    const balance = document.createElement('div');
    balance.className = 's2o-severance__balance';
    const balanceOne = document.createElement('p');
    balanceOne.className = 's2o-severance__balanceline s2o-severance__balanceline--one';
    balanceOne.textContent = 'The most universally accepted medium of exchange in history.';
    const balanceTwo = document.createElement('p');
    balanceTwo.className = 's2o-severance__balanceline s2o-severance__balanceline--two';
    balanceTwo.textContent = 'Extraordinary at moving value. Measurably poor at storing it.';
    balance.append(balanceOne, balanceTwo);
    root.appendChild(balance);

    container.appendChild(root);

    // Dash geometry for the draw-in, measured once the paths exist.
    requestAnimationFrame(() => {
      paths.forEach(({ path }) => {
        const len = Math.ceil(path.getTotalLength());
        path.style.strokeDasharray = String(len);
        path.style.setProperty('--len', String(len));
      });
      if (this._refs) this._refs.root.dataset.measured = 'true';
    });

    this._refs = {
      root, rail: scene.rail, date, decree, chart, balance,
      appliedStep: 0, reconstruct: false, handoff: false, overlayCleanup: null
    };
  },

  onEnter(ctx) {
    if (ctx && ctx.continuous) {
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

    setVisible(refs.date, n >= 1 && n <= 2);
    setVisible(refs.decree, n === 2);
    setVisible(refs.chart, n >= 3);
    setVisible(refs.balance, n >= 4);
  },

  notes: `[→] Nineteen seventy-one. By this point the world’s gold sits concentrated in central banks, and the dollar — the vault-note of the whole system — is redeemable in it, at least on paper. But the notes have been over-issued: spent into wars and programs far beyond the gold behind them. Other countries start showing up with dollars, asking for the metal. There isn’t enough.

[→] So in August 1971, the redemption window closes. Officially temporary; permanent ever since. Call it what the record shows: the issuer of the claims could not honor them, and cancelled them instead. The paper layer — the whole ladder of convenience — detaches from its base. For the first time in the entire record, the world’s money is pure decree. The trust rung, with nothing under it. And to be precise about what keeps it in use now: law. Taxes are payable in it, and only in it. This chapter of the story was not a convergence. And that floating mark is where the world’s money still sits today: on the record, but not on the line.

[→] So how has the new arrangement performed at the oldest job — carrying value through time? Here is what one unit of the major currencies still buys, measured from that year. Every line on this chart — including the strongest currency of the era, the Swiss franc — ends far below where it began. Not one government’s scandal. Every issuer, every continent, the same slope. That is not mismanagement. That is a structural property of the design.

[→] And now the honest other half, because it matters: this same system is the most universally accepted medium of exchange in human history. Payments have never been faster, cheaper, or more convenient. Both facts on one screen — because both are true. The reigning money is extraordinary at moving value, and measurably poor at storing it. Keep that exact wound in mind. The entire second half of the inquiry walks into it.`
};
