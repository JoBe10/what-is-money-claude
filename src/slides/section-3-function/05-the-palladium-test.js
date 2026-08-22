// 3.5 — the palladium test. The hook lands alone; the chart follows —
// annual mine supply and the long-run price record, palladium beside gold,
// in the deck’s chart style; then the two epochs of gold’s monetary life,
// each one a place palladium failed to reach; and the bar — the sentence the
// rest of the deck holds every candidate to. Build 0 is the authored black
// beat before the hook.
//
// R3.1 §C — the two-epoch honesty. The price panel invites a fair
// objection: gold was not the world’s money by 1990, so “palladium never
// replaced gold as money” would be confused if the chart were the whole
// argument. It is not. The deck has already taught the capture (2.7–2.8):
// gold’s role narrowed to store of value and it kept that. So the beat now
// runs palladium against *both* epochs — the ancient network it arrived
// too late for, and the narrowed store-of-value role it never touched —
// and the panel is titled MODERN ERA so the chart speaks only for its own
// window. Conceding the objection makes the argument stronger.
//
// DATA: final, sourced (R4). Both panels now carry real figures from
// `src/data/palladium.js` (SOURCES.md: WIM-PD-001 mine supply, WIM-PD-002
// prices). Two changes of substance came out of the R4 verification:
//
// 1. The left panel is no longer CRUSTAL RARITY. Standard references
//    disagree about which of the two metals is the scarcer in the crust —
//    and they disagree about the *direction*, not the magnitude (the CRC
//    class of values makes palladium the more abundant; Rudnick & Gao and
//    Wedepohl make it the rarer). A comparison whose sign depends on which
//    reference you open cannot go on screen. The panel now shows annual
//    mine supply, where the answer is unambiguous, every source agrees, and
//    the fact is the one that bears on a monetary argument: gold’s annual
//    mine supply is roughly fifteen times palladium’s. Figures are shown,
//    because now they can be.
// 2. The price panel plots the real LBMA annual averages, 1990–2025. The
//    beat’s sentence survives: palladium closed above gold on annual averages
//    through 1999–2002 and again through 2019–2022.
//
// R4.1 (ruling R-05): the hook is now supply-anchored — “scarcer in supply
// than gold” — and the script says the ratio out loud, because it is a real
// number on the panel behind the presenter. The old crustal-abundance
// sentence is gone from both the hook and the script: it was the one line in
// the beat that no source could carry. The argument is unchanged and lands
// harder, because the scarcity is now measured rather than contested.

import { glyph } from '../../components/section-2/glyphs.js';
import {
  MINE_SUPPLY,
  PD_MINE_SUPPLY_YEAR,
  PRICES,
  PRICE_SERIES as PRICE_SPEC,
  PRICE_YEAR_MIN,
  PRICE_YEAR_MAX
} from '../../data/palladium.js';

const HOOK =
  'Palladium: scarcer in supply than gold. Genuinely useful. At times more expensive. It never became money.';
const TIMING = 'Discovered in 1803 — facing a monetary network thousands of years old.';
const NARROWED =
  'And when gold’s role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium.';
const BAR =
  'Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.';

const PRICE_SERIES = PRICE_SPEC.map((s) => ({ ...s, values: PRICES[s.id] }));

const YEAR_MIN = PRICE_YEAR_MIN;
const YEAR_MAX = PRICE_YEAR_MAX;
const PLOT_W = 660;
const PLOT_H = 330;
const V_MIN = 80;
const V_MAX = 3600;

// Log value axis — the panel’s story is the crossings, and only a log scale
// keeps a 40× range legible without exaggerating either metal. One vertex
// per observed year; no interpolation.
function priceY(v) {
  const t = (Math.log(v) - Math.log(V_MIN)) / (Math.log(V_MAX) - Math.log(V_MIN));
  return PLOT_H - t * PLOT_H;
}

function seriesPath(values) {
  const coords = values.map((v, i) => {
    const px = (i / (values.length - 1)) * PLOT_W;
    return `${px.toFixed(1)} ${priceY(v).toFixed(1)}`;
  });
  return `M ${coords.join(' L ')}`;
}

// Annual mine supply, drawn as relative line lengths against gold, with the
// tonnage stated (WIM-PD-001). The shorter the line, the scarcer the metal’s
// yearly supply — the same reading direction the panel always had.
const SUPPLY_MAX = Math.max(...MINE_SUPPLY.map((s) => s.tonnes));
const SUPPLY = MINE_SUPPLY.map((s) => ({
  ...s,
  rel: s.tonnes / SUPPLY_MAX,
  figure: `${s.tonnes.toLocaleString('en-US')} t`
}));

function setVisible(element, visible) {
  element.dataset.visible = String(visible);
  element.setAttribute('aria-hidden', String(!visible));
}

export default {
  id: '3-05-the-palladium-test',
  section: 'function',
  number: 19,
  title: 'The Palladium Test',
  totalBuildSteps: 5,

  render(container) {
    container.innerHTML = '';

    const root = document.createElement('div');
    root.className = 's3f s3f-palladium';

    const hook = document.createElement('p');
    hook.className = 's3f-palladium__hook';
    hook.textContent = HOOK;
    root.appendChild(hook);

    // ----- The chart: mine-supply panel + price panel -----
    const chart = document.createElement('div');
    chart.className = 's3f-palladium__chart';

    const supply = document.createElement('div');
    supply.className = 's3f-palladium__supply';

    const supplyTitle = document.createElement('p');
    supplyTitle.className = 's3f-palladium__paneltitle';
    supplyTitle.textContent = 'ANNUAL MINE SUPPLY · TONNES';
    supply.appendChild(supplyTitle);

    const supplyMark = document.createElement('div');
    supplyMark.className = 's3f-palladium__supplymark';
    supplyMark.innerHTML = glyph('palladium', 40);
    supply.appendChild(supplyMark);

    SUPPLY.forEach((spec, index) => {
      const row = document.createElement('div');
      row.className = 's3f-palladium__supplyrow';
      row.dataset.series = spec.id;
      row.style.setProperty('--i', String(index));

      const label = document.createElement('span');
      label.className = 's3f-palladium__supplylabel';
      label.style.color = `rgba(255, 255, 255, ${spec.alpha})`;
      label.textContent = `${spec.id}  ${spec.figure}`;
      row.appendChild(label);

      const bar = document.createElement('span');
      bar.className = 's3f-palladium__supplybar';
      bar.style.setProperty('--rel', String(spec.rel));
      bar.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
      row.appendChild(bar);

      const tip = document.createElement('span');
      tip.className = 's3f-palladium__supplytip';
      tip.style.setProperty('--rel', String(spec.rel));
      tip.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
      row.appendChild(tip);

      supply.appendChild(row);
    });

    const supplyNote = document.createElement('p');
    supplyNote.className = 's3f-palladium__panelnote';
    supplyNote.textContent =
      `world mine production, ${PD_MINE_SUPPLY_YEAR} — shorter is scarcer`;
    supply.appendChild(supplyNote);

    chart.appendChild(supply);

    const price = document.createElement('div');
    price.className = 's3f-palladium__price';

    const priceTitle = document.createElement('p');
    priceTitle.className = 's3f-palladium__paneltitle';
    priceTitle.textContent = 'PRICE OF ONE OUNCE · MODERN ERA';
    price.appendChild(priceTitle);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', `-14 -20 ${PLOT_W + 190} ${PLOT_H + 70}`);
    svg.classList.add('s3f-palladium__plot');

    const axis = document.createElementNS(svgNS, 'line');
    axis.setAttribute('x1', 0);
    axis.setAttribute('y1', PLOT_H);
    axis.setAttribute('x2', PLOT_W);
    axis.setAttribute('y2', PLOT_H);
    axis.classList.add('s3f-palladium__axis');
    svg.appendChild(axis);

    [1990, 2000, 2010, 2020].forEach((year) => {
      const x = ((year - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * PLOT_W;
      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', x);
      label.setAttribute('y', PLOT_H + 32);
      label.setAttribute('text-anchor', year === YEAR_MIN ? 'start' : 'middle');
      label.classList.add('s3f-palladium__axislabel');
      label.textContent = String(year);
      svg.appendChild(label);
    });

    // End labels spread apart when the series finish close together.
    const endYs = PRICE_SERIES.map(({ values }) => priceY(values[values.length - 1]) + 5);
    if (Math.abs(endYs[0] - endYs[1]) < 24) {
      const upper = endYs[0] < endYs[1] ? 0 : 1;
      endYs[1 - upper] = endYs[upper] + 24;
    }

    const paths = PRICE_SERIES.map(({ id, alpha, values }, index) => {
      const path = document.createElementNS(svgNS, 'path');
      path.setAttribute('d', seriesPath(values));
      path.classList.add('s3f-palladium__series');
      path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
      path.style.setProperty('--i', String(index));

      const label = document.createElementNS(svgNS, 'text');
      label.setAttribute('x', PLOT_W + 16);
      label.setAttribute('y', endYs[index]);
      label.classList.add('s3f-palladium__serieslabel');
      label.style.fill = `rgba(255, 255, 255, ${alpha})`;
      label.textContent = id;

      svg.appendChild(path);
      svg.appendChild(label);
      return { path, label };
    });

    price.appendChild(svg);
    chart.appendChild(price);
    root.appendChild(chart);

    const timing = document.createElement('p');
    timing.className = 's3f-palladium__timing';
    timing.textContent = TIMING;
    root.appendChild(timing);

    // The second epoch, in the same register as the first — the two land
    // as a pair, then the bar concludes.
    const narrowed = document.createElement('p');
    narrowed.className = 's3f-palladium__narrowed';
    narrowed.textContent = NARROWED;
    root.appendChild(narrowed);

    const bar = document.createElement('p');
    bar.className = 's3f-palladium__bar';
    bar.textContent = BAR;
    root.appendChild(bar);

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
      root, hook, chart, timing, narrowed, bar,
      appliedStep: 0, reconstruct: false
    };
    this._applyBuild(0);
  },

  onEnter(ctx) {
    if (this._refs && (ctx?.targetBuildStep || 0) > 0) this._refs.reconstruct = true;
  },

  onExit() {
    this._refs = null;
  },

  buildStep(step) {
    this._applyBuild(step);
  },

  _applyBuild(step) {
    const refs = this._refs;
    if (!refs) return;

    const n = Math.max(0, Math.min(5, Number(step) || 0));
    const live = !refs.reconstruct && n === refs.appliedStep + 1;
    refs.reconstruct = false;
    refs.appliedStep = n;
    refs.root.dataset.step = String(n);
    refs.root.dataset.live = String(live);
    if (!live) {
      refs.root.dataset.snap = 'true';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        delete refs.root.dataset.snap;
      }));
    }

    setVisible(refs.hook, n >= 1);
    setVisible(refs.chart, n >= 2);
    setVisible(refs.timing, n >= 3);
    setVisible(refs.narrowed, n >= 4);
    setVisible(refs.bar, n >= 5);
  },

  notes: `[→] So if properties decide the competition — here’s a puzzle that tests whether we actually understand it. Palladium. Scarcer in supply than gold: the world mines about fifteen times as much gold each year. Genuinely useful — industry needs it. There have been long stretches where an ounce of palladium cost *more* than an ounce of gold. And it never became money. Not anywhere. Not in any era.

[→] Here’s the comparison — scarcity, and the modern price record, side by side with gold. And let me be precise about what this chart can and can’t say, because you already know gold’s story. By this period, gold was no longer the world’s money in daily use — you watched it get captured in Section One’s history. What gold kept, after the capture, was exactly the function our ladder calls the foundation: the store of value. Central banks hold it. Savers hold it. That is gold’s remaining monetary role.

[→] Now run palladium against gold in *both* of gold’s eras. Eighteen-oh-three: palladium is discovered — scarcer than gold — and walks into a world where gold is the base money of civilization, the metal behind every certificate, with a network thousands of years old. Nothing happens. Because a monetary good’s value *is* that network — salability is other people’s acceptance, and a latecomer doesn’t start a few laps behind; it starts at zero.

[→] Then the modern era: gold’s role narrows to store of value — and palladium never touches that role either. There have been years when palladium was the more expensive metal, ounce for ounce. No monetary premium followed. No central bank holds palladium reserves. No saver anywhere treats it as the safe place for a life’s work. Rarer, pricier — and monetarily, nothing. Price is not moneyness.

[→] Which gives us the bar — maybe the most important sentence in this section: for anything to earn a place on the rail, marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown. Metal over shell was categorical. Note over wagon-of-coins was categorical. “A bit scarcer” moved nothing — in either century. Remember the height of that bar. Before we’re done, we’re going to hold a candidate up against it.`
};
