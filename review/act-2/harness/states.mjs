// Act II — the beat-state sheet builders (docs/act-2-states-brief.md §2,
// re-rendered where ruled by docs/act-2-states-r2-brief.md).
//
// All 37 beats of Scenes 5–10, rendered full-size at 1920×1080 through the
// states pipeline, under the full-coverage rule. The beat map is
// `docs/batch-b-package.md` §1, FROZEN 31 August 2026 at the installed
// scripts' own `[→]` counts and AMENDED the same day by the Ruling 3 strike
// (master §13): S5 8 · S6 9 · S7 5 · S8 5 · S9 5 · S10 5 = 37 — Scene 6 at
// the legacy pacing, one wave of eliminations per advance.
//
// THE R2 STATE. The presenter's 31 August rulings are applied throughout:
// the three NEW-frame selections landed (S6-F3 = the counted load, S7-F2 =
// the boundary logic restaged photographically, S9-F1 = the hub dissolving),
// the five adaptations verified, the elimination restored to the legacy
// builds, and the rails law staged on s5-b5 and s10-b1/s10-b2. Non-selected
// candidates stay registered here, review class `on-file`, so any selection
// is still one letter's change.
//
// EVERY CELL CARRIES ITS PROVENANCE CLASS AND IS BUILT BY IT. The classes are
// `docs/act-2-provenance.md`, ruled 31 August 2026, and this file obeys them
// rather than restating them:
//
//   · PORT      — the named legacy treatment, transplanted. Grade, type and
//                 stage wiring only. Where the treatment is a live component
//                 (EvolutionRail, ElementGrid, ClaimObject + CarrierShell) the
//                 CELL MOUNTS THE COMPONENT ITSELF rather than redrawing it,
//                 which is the strongest form the word "verbatim" can take.
//                 Where it is a slide's own composition (the severance chart,
//                 the palladium panels, the dated fact) the cell rebuilds that
//                 slide's DOM against THE SAME CSS CLASSES, so the legacy
//                 stylesheet does the placing and no number is re-authored.
//   · ADAPT     — exactly the one named change, and nothing else.
//   · NEW       — two or three genuinely distinct candidates, or the systems
//                 sheet's existing ones where the map applies them (S9-F1).
//
// STAGE WIRING, NAMED. A port fixes a treatment, not a frame. Where this file
// chooses a position the legacy treatment does not fix — where a statement sits
// above a study, where the four strip stations sit along their line — that is
// wiring, it is marked `WIRING:` at its call site, and it is the only latitude
// taken anywhere in the file.
//
// THE CLAIM THROUGH-LINE. The claim enters at S5 b1 wearing construction C's
// carrier and is on stage at every beat where the argument is about the body it
// wears: S5 b1 · S5 b7 · S6 b8 · S7 b1 · S7 b2. On S10's strip the disc is
// NEVER a station — it is the traveler (the CERTIFICATE ruling, 31 Aug 2026,
// Batch B brief §1.1); its journey across the strip is connective motion the
// implementation animates, and no settled still carries it.
//
// Composition law in full (master §5): one idea per frame, negative space as a
// material, nothing touching the frame edges, the brightness floors, the
// display rule, the register boundary (dark-field never inside a diagram), and
// the self-reference ban.

import { DarkFieldImage } from '/src/components/DarkField.js';
import { ClaimObject } from '/src/components/section-4/ClaimObject.js';
import { CarrierShell } from '/src/components/section-4/CarrierShell.js';
import { ElementGrid } from '/src/components/section-2/ElementGrid.js';
import { EvolutionRail, FRAMES } from '/src/components/section-2/EvolutionRail.js';
import {
  PURCHASING_POWER, PP_SERIES, PP_YEAR_MIN, PP_YEAR_MAX
} from '/src/data/purchasing-power.js';
import {
  MINE_SUPPLY, PD_MINE_SUPPLY_YEAR, PRICES, PRICE_SERIES as PRICE_SPEC,
  PRICE_YEAR_MIN, PRICE_YEAR_MAX
} from '/src/data/palladium.js';
import {
  CELLS as SYSTEM_CELLS, VOICE, line, dot, pathEl, text,
  KICKER, CAPS, STATEMENT, PLAIN, mark, lcg, STATIONS
} from './systems.mjs';

const svgNS = 'http://www.w3.org/2000/svg';
const STAGE_ID = 'act2-states-stage';

let cleanup = [];

export const CELLS = {};
function cell(id, meta, build) {
  CELLS[id] = { ...meta, build };
}

function stage() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];

  const el = document.createElement('div');
  el.id = STAGE_ID;
  // `.s2o` and `.s3f` are the legacy section roots — opaque black, inset 0.
  // Carrying both class names is what lets a ported cell rebuild a legacy
  // slide's DOM and have the legacy stylesheet place it exactly.
  el.className = 's2o s3f s4-opening';
  el.style.cssText = 'position:fixed; left:0; top:0; width:1920px; height:1080px;' +
    'background:#000; overflow:hidden; z-index:9999; font-family:Inter,sans-serif;';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 1920 1080');
  svg.setAttribute('width', '1920');
  svg.setAttribute('height', '1080');
  svg.style.cssText = 'position:absolute; inset:0;';
  el.appendChild(svg);
  document.body.appendChild(el);
  return { el, svg };
}

// ---- ported building blocks -------------------------------------------------

// P1-F2's approved display-scale study box: 540 tall, centred at (960, 650),
// each subject in the aspect its render arrives in — the geometry the Prologue's
// approved cells were rendered from (`src/scenes/prologue/_prologueStage.js`).
const FORM_CX = 960;
const FORM_CY = 650;
const BOX = { landscape: [720, 540], portrait: [432, 540], threeTwo: [810, 540] };

function study(st, { subject, box = 'landscape', alt }) {
  const [w, h] = BOX[box];
  const df = DarkFieldImage({ name: subject, width: w, height: h, alt });
  df.el.dataset.visible = 'true';
  df.el.style.position = 'absolute';
  df.el.style.left = `${FORM_CX - w / 2}px`;
  df.el.style.top = `${FORM_CY - h / 2}px`;
  st.el.appendChild(df.el);
  return df.el;
}

// WIRING: a study's box top is y 380, so the statement the display rule puts
// with it sits in the frame's upper third, centred, clear of the box by 100px.
// The register is the deck's own CAPS; only the y is this file's.
const STUDY_STATEMENT_Y = 246;
function studyStatement(st, copy) {
  return text(st, copy,
    `left:200px; right:200px; top:${STUDY_STATEMENT_Y}px; text-align:center; text-indent:0;` +
    CAPS(0.92, 40));
}

// The rail's own stop typography, transcribed from `.s2o-rail__label` and
// `.s2o-rail__wound` (slides.css): the label row at 25px/500/0.16em and the
// second row at 17px/1.45 on a 218px measure. Both are the icon grammar's §4.5
// rhythm — label row, second row, no staggered baselines.
const RAIL_LABEL = (a = 0.75) => `font-size:25px; font-weight:500; letter-spacing:0.16em;` +
  `color:rgba(255,255,255,${a});`;
const RAIL_ROW = (a = 0.58) => `font-size:17px; font-weight:420; line-height:1.45;` +
  `color:rgba(255,255,255,${a});`;

// S5-F1 · PORT — `4-06`'s claim-and-carrier composition, mounted rather than
// redrawn. The scene box, the claim stage and both components are the slide's
// own, so the shell lands at 240×240 and the disc at 116 on one centre — which
// is the presenter's carrier-centring ruling of 27 August 2026, already living
// in `.s4-claim-object__disc`.
function claimInCarrier(st, { label, labelVoice = 0.75 } = {}) {
  const scene = document.createElement('div');
  scene.className = 's4-claim-carrier__scene';

  const shell = CarrierShell({ className: 's4-claim-carrier__shell' });
  shell.applyState({ visible: true });
  scene.appendChild(shell.el);

  const claimStage = document.createElement('div');
  claimStage.className = 's4-claim-carrier__claim-stage';
  const claim = ClaimObject({ className: 's4-claim-carrier__claim' });
  claim.applyState({ visible: true });
  claimStage.appendChild(claim.el);
  scene.appendChild(claimStage);

  st.el.appendChild(scene);

  // WIRING: the carrier's name in the rail's own stop-label register, centred
  // under the scene box (which ends at y 640) on the rail's own +26 offset
  // rhythm carried to stage scale.
  if (label) {
    text(st, label, `left:660px; top:700px; width:600px; text-align:center; text-indent:0;` +
      RAIL_LABEL(labelVoice));
  }
  return scene;
}

// WIRING: the deck's statement register, centred low — the slot P1's own
// sequenced lines use and the one the claim-and-carrier scene leaves open.
function statement(st, copy, { top = 812, size = 46, a = 1 } = {}) {
  return text(st, copy,
    `left:240px; right:240px; top:${top}px; text-align:center; text-indent:0;` +
    STATEMENT(a, size));
}

// The Evolution Rail, mounted. This is the S5-F2 port in its strongest form:
// the cell runs the component the legacy slides run, at the state they run it.
function rail(st, state) {
  const r = EvolutionRail();
  st.el.appendChild(r.el);
  r.applyState(state, { live: false });
  cleanup.push(() => r.destroy());
  return r;
}

const ROW_STOP = (state, wound = false, latest = false) => ({ state, wound, latest });

// ADAPT (S5-F3) — `2-07`'s dated-fact treatment, generalized into the film's
// evidence grammar. THE TYPE IS THE LEGACY'S, TO THE VALUE: the date at
// 128px/650 with tabular figures and −0.02em (`.s2o-severance__date`), the fact
// at 33px/460/1.45 and −0.008em (`.s2o-severance__decree`). The one ruled change
// is that they become one block that also carries a place, so a specimen with a
// place and a specimen without both speak the same grammar.
function evidence(st, { place, date, fact }) {
  if (place) {
    text(st, place, 'left:0; right:0; top:372px; text-align:center; text-indent:0;' + KICKER(0.5));
  }
  text(st, date,
    `left:0; right:0; top:${place ? 424 : 400}px; text-align:center; text-indent:0;` +
    'font-size:128px; font-weight:650; letter-spacing:-0.02em;' +
    'font-variant-numeric:tabular-nums; color:rgba(255,255,255,1);');
  text(st, fact,
    `left:300px; right:300px; top:${place ? 634 : 610}px; text-align:center; text-indent:0;` +
    'font-size:33px; font-weight:460; line-height:1.45; letter-spacing:-0.008em;' +
    'color:rgba(255,255,255,1);');
}

// The three specimens the ruling names. Every string is recorded film material:
// Zanzibar is `EvolutionRail`'s own `receipt` text, split into its place, its
// date and its fact; 1971 is `2-07`'s decree verbatim; 1803 is `3-05`'s timing
// line verbatim.
const SPECIMEN = {
  zanzibar: {
    place: 'WEST AFRICA', date: '1800s',
    fact: 'Shiploads of cheaper Zanzibar cowries collapsed the shell rate. Local savings, out-supplied.'
  },
  severance: {
    place: '', date: '1971',
    fact: 'Redemption ends. For the first time in the record, the world’s money is pure decree — the trust rung with nothing under it.'
  },
  palladium: {
    place: '', date: '1803',
    fact: 'Palladium is discovered — facing a monetary network thousands of years old.'
  }
};

// PORT (S6-F2) — `2-05`'s elimination at the legacy pacing. Architecture
// Ruling 3 (the compression) was STRUCK by the presenter on 31 August 2026
// (master §13; trail: ruled 25 Aug, struck 31 Aug, grounds — the legacy
// treatment is proven and preferred), so the frame reverts to a PORT of the
// legacy build structure, and this builder is `2-05-two-survivors`'
// `_build` + `_applyBuild` transcribed: the legacy's own DOM against the
// legacy's own classes, so the legacy stylesheet does the placing. Per build:
// the kicker from build 1; the table (`ElementGrid` mounted, not redrawn) at
// its own step `build − 1`; EXACTLY ONE wave line, visible only on its own
// build (`setVisible(line, n === step)` — the legacy's rule); the verdict at
// build 6. Nothing inside any step is changed one bit. What does not carry
// over is the dimmed rail beneath the legacy slide — the evolution rail as a
// persistent spine is dead by architecture, and the sheet's r1 funnel cells
// already established the grid-alone staging.
const WAVE_LINES = [
  'Anything that floats away is out.',
  'Anything that rusts, burns, or dissolves is out.',
  'Anything that kills the holder is out.',
  'Anything that will not hold a shape is out.'
];

function survivors(st, build) {
  const k = document.createElement('p');
  k.className = 's2o-survivors__kicker';
  k.dataset.visible = String(build >= 1);
  k.textContent = 'Run the competition over the whole table.';
  st.el.appendChild(k);

  const wrap = document.createElement('div');
  wrap.className = 's2o-survivors__grid';
  wrap.dataset.visible = String(build >= 1);
  const grid = ElementGrid();
  wrap.appendChild(grid.el);
  st.el.appendChild(wrap);
  grid.applyState(Math.max(0, build - 1), { live: false });
  cleanup.push(() => grid.destroy());

  WAVE_LINES.forEach((copy, i) => {
    const line = document.createElement('p');
    line.className = 's2o-survivors__waveline';
    line.dataset.step = String(i + 2);
    line.dataset.visible = String(build === i + 2);
    line.textContent = copy;
    st.el.appendChild(line);
  });

  const verdict = document.createElement('p');
  verdict.className = 's2o-survivors__verdict';
  verdict.dataset.visible = String(build >= 6);
  verdict.textContent = 'Workable nobility leaves two.';
  st.el.appendChild(verdict);
}

// PORT (S8-F2) — `2-07`'s chart, rebuilt against the legacy's own classes so
// `.s2o-severance__chart` places it and every plotted number comes from
// `src/data/purchasing-power.js` untouched. One vertex per observed year; the
// frozen draw order and per-series alpha; the 1971 = 100 reference line; the
// end-label spread; the index note.
const PP = PP_SERIES.map((s) => ({ ...s, values: PURCHASING_POWER[s.id] }));
const PLOT_W = 1080;
const PLOT_H = 360;

function severanceChart(st) {
  // The legacy reveals the series and their end labels from the slide root
  // (`.s2o-severance[data-step="3"|"4"]`), so a port that does not carry the
  // root's own class and step renders the plot without its labels. Carrying
  // them is what makes this the treatment rather than a copy of its geometry.
  st.el.classList.add('s2o-severance');
  st.el.dataset.step = '4';
  const chart = document.createElement('div');
  chart.className = 's2o-severance__chart';
  chart.dataset.visible = 'true';

  const headline = document.createElement('p');
  headline.className = 's2o-severance__headline';
  headline.textContent = 'What one unit still buys.';
  chart.appendChild(headline);

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `-70 -30 ${PLOT_W + 150} ${PLOT_H + 80}`);
  svg.classList.add('s2o-severance__plot');

  const yAt = (v) => PLOT_H - (v / 105) * PLOT_H;
  const add = (tag, attrs, cls, copy) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (cls) el.classList.add(cls);
    if (copy != null) el.textContent = copy;
    svg.appendChild(el);
    return el;
  };

  add('line', { x1: 0, y1: yAt(100), x2: PLOT_W, y2: yAt(100) }, 's2o-severance__refline');
  add('line', { x1: 0, y1: PLOT_H, x2: PLOT_W, y2: PLOT_H }, 's2o-severance__axis');
  add('text', { x: -16, y: yAt(100) + 7, 'text-anchor': 'end' }, 's2o-severance__axislabel', '100');
  add('text', { x: -16, y: PLOT_H + 7, 'text-anchor': 'end' }, 's2o-severance__axislabel', '0');
  [1971, 1980, 1990, 2000, 2010, 2020].forEach((year) => {
    add('text', {
      x: ((year - PP_YEAR_MIN) / (PP_YEAR_MAX - PP_YEAR_MIN)) * PLOT_W,
      y: PLOT_H + 34,
      'text-anchor': year === PP_YEAR_MIN ? 'start' : 'middle'
    }, 's2o-severance__axislabel', String(year));
  });

  // The legacy's own end-label spread: USD and GBP finish within a label's
  // height of each other, so close pairs are pushed apart on a 24px ladder.
  const labelYs = PP.map(({ values }) => yAt(values[values.length - 1]) + 6);
  const order = labelYs.map((y, i) => [y, i]).sort((a, b) => a[0] - b[0]);
  for (let k = 1; k < order.length; k += 1) {
    if (order[k][0] - order[k - 1][0] < 24) order[k][0] = order[k - 1][0] + 24;
  }
  order.forEach(([y, i]) => { labelYs[i] = y; });

  PP.forEach(({ id, alpha, values }, index) => {
    const d = values.map((v, i) => `${((i / (values.length - 1)) * PLOT_W).toFixed(1)} ${yAt(v).toFixed(1)}`);
    const path = add('path', { d: `M ${d.join(' L ')}` }, 's2o-severance__series');
    path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
    path.style.setProperty('--i', String(index));
    // The draw-in is a motion property; a still lands on the drawn state.
    path.style.strokeDasharray = 'none';
    const label = add('text', { x: PLOT_W + 18, y: labelYs[index] }, 's2o-severance__serieslabel', id);
    label.style.fill = `rgba(255, 255, 255, ${alpha})`;
  });

  chart.appendChild(svg);

  const note = document.createElement('p');
  note.className = 's2o-severance__indexnote';
  note.textContent = 'Purchasing power of one unit · 1971 = 100 · as of 2025';
  chart.appendChild(note);

  st.el.appendChild(chart);
  return chart;
}

// ADAPT (S10-F2) — `3-05`'s palladium panels, rebuilt against the legacy's own
// classes. The one ruled change (architecture Ruling 4) is the relocation into
// Scene 10; the frame itself, its data and its two-epoch honesty are ported.
const PD_PRICE = PRICE_SPEC.map((s) => ({ ...s, values: PRICES[s.id] }));
const PD_W = 660;
const PD_H = 330;
const V_MIN = 80;
const V_MAX = 3600;
const SUPPLY_MAX = Math.max(...MINE_SUPPLY.map((s) => s.tonnes));

function palladiumChart(st, step) {
  // Same contract as the severance chart: `.s3f-palladium[data-step]` is what
  // lifts the hook clear of the panels and what applies R7.4 §F.6's rule-10
  // recession to the two epoch lines. The port carries the root, or it is not
  // the treatment.
  st.el.classList.add('s3f-palladium');
  st.el.dataset.step = String(step);
  const chart = document.createElement('div');
  chart.className = 's3f-palladium__chart';
  chart.dataset.visible = 'true';

  const supply = document.createElement('div');
  supply.className = 's3f-palladium__supply';
  const supplyTitle = document.createElement('p');
  supplyTitle.className = 's3f-palladium__paneltitle';
  supplyTitle.textContent = 'ANNUAL MINE SUPPLY · TONNES';
  supply.appendChild(supplyTitle);
  const supplyMark = document.createElement('div');
  supplyMark.className = 's3f-palladium__supplymark';
  supplyMark.innerHTML = '';
  supply.appendChild(supplyMark);
  MINE_SUPPLY.forEach((spec, index) => {
    const row = document.createElement('div');
    row.className = 's3f-palladium__supplyrow';
    row.dataset.series = spec.id;
    row.style.setProperty('--i', String(index));
    const label = document.createElement('span');
    label.className = 's3f-palladium__supplylabel';
    label.style.color = `rgba(255, 255, 255, ${spec.alpha})`;
    label.textContent = `${spec.id}  ${spec.tonnes.toLocaleString('en-US')} t`;
    row.appendChild(label);
    const rel = spec.tonnes / SUPPLY_MAX;
    const bar = document.createElement('span');
    bar.className = 's3f-palladium__supplybar';
    bar.style.setProperty('--rel', String(rel));
    bar.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
    row.appendChild(bar);
    const tip = document.createElement('span');
    tip.className = 's3f-palladium__supplytip';
    tip.style.setProperty('--rel', String(rel));
    tip.style.background = `rgba(255, 255, 255, ${spec.alpha})`;
    row.appendChild(tip);
    supply.appendChild(row);
  });
  const supplyNote = document.createElement('p');
  supplyNote.className = 's3f-palladium__panelnote';
  supplyNote.textContent = `world mine production, ${PD_MINE_SUPPLY_YEAR} — shorter is scarcer`;
  supply.appendChild(supplyNote);
  chart.appendChild(supply);

  const price = document.createElement('div');
  price.className = 's3f-palladium__price';
  const priceTitle = document.createElement('p');
  priceTitle.className = 's3f-palladium__paneltitle';
  priceTitle.textContent = 'PRICE OF ONE OUNCE · MODERN ERA';
  price.appendChild(priceTitle);

  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', `-14 -20 ${PD_W + 190} ${PD_H + 70}`);
  svg.classList.add('s3f-palladium__plot');
  const priceY = (v) => {
    const t = (Math.log(v) - Math.log(V_MIN)) / (Math.log(V_MAX) - Math.log(V_MIN));
    return PD_H - t * PD_H;
  };
  const add = (tag, attrs, cls, copy) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    if (cls) el.classList.add(cls);
    if (copy != null) el.textContent = copy;
    svg.appendChild(el);
    return el;
  };
  add('line', { x1: 0, y1: PD_H, x2: PD_W, y2: PD_H }, 's3f-palladium__axis');
  [1990, 2000, 2010, 2020].forEach((year) => {
    add('text', {
      x: ((year - PRICE_YEAR_MIN) / (PRICE_YEAR_MAX - PRICE_YEAR_MIN)) * PD_W,
      y: PD_H + 32,
      'text-anchor': year === PRICE_YEAR_MIN ? 'start' : 'middle'
    }, 's3f-palladium__axislabel', String(year));
  });
  const endYs = PD_PRICE.map(({ values }) => priceY(values[values.length - 1]) + 5);
  if (Math.abs(endYs[0] - endYs[1]) < 24) {
    const upper = endYs[0] < endYs[1] ? 0 : 1;
    endYs[1 - upper] = endYs[upper] + 24;
  }
  PD_PRICE.forEach(({ id, alpha, values }, index) => {
    const d = values.map((v, i) => `${((i / (values.length - 1)) * PD_W).toFixed(1)} ${priceY(v).toFixed(1)}`);
    const path = add('path', { d: `M ${d.join(' L ')}` }, 's3f-palladium__series');
    path.style.stroke = `rgba(255, 255, 255, ${alpha})`;
    path.style.setProperty('--i', String(index));
    path.style.strokeDasharray = 'none';
    const label = add('text', { x: PD_W + 16, y: endYs[index] }, 's3f-palladium__serieslabel', id);
    label.style.fill = `rgba(255, 255, 255, ${alpha})`;
  });
  price.appendChild(svg);
  chart.appendChild(price);
  st.el.appendChild(chart);
  return chart;
}

// PORT (S9-F2) — `2-08`'s entrant block, free-standing at stage scale. The
// treatment is the block's own: the name in stop typography, the facts beneath
// it, and the honest limitation ON ITS OWN ADVANCE at full voice while the rows
// before it hold the dimmed-prior step (§9.4 rule 10). Every string is the
// rail's own.
const ENTRANT = {
  name: 'BITCOIN',
  facts: '2009: digital · no state, no company · supply fixed by its own rules.',
  capabilities: ['DIGITAL MOBILITY', 'NON-DISCRETIONARY SUPPLY', 'INDEPENDENT VERIFICATION'],
  limitation: 'Very young. Its price still swings far more than the monies it would compete with. Not yet twenty years into a hundred-year question.'
};

// WIRING: the block's rows on one vertical rhythm — mark, name, facts,
// capabilities, limitation — centred on the stage.
function entrantBlock(st, { capabilities = false, limitation = false } = {}) {
  const latest = limitation ? 'limitation' : (capabilities ? 'capabilities' : 'facts');
  const voice = (row) => (row === latest ? 1 : VOICE.labelSpent);
  mark(st, 'bitcoin', 960, 300, 64, 0.9);
  dot(st.svg, 960, 372, 4.5, 0.85);
  text(st, ENTRANT.name, 'left:0; right:0; top:404px; text-align:center; text-indent:0;' +
    RAIL_LABEL(0.95));
  text(st, ENTRANT.facts,
    `left:360px; right:360px; top:${capabilities || limitation ? 462 : 470}px; text-align:center; text-indent:0;` +
    STATEMENT(voice('facts'), 33));
  if (capabilities) {
    ENTRANT.capabilities.forEach((copy, i) => {
      text(st, copy, `left:0; right:0; top:${568 + i * 52}px; text-align:center; text-indent:0;` +
        CAPS(voice('capabilities'), 26));
    });
  }
  if (limitation) {
    text(st, ENTRANT.limitation,
      'left:340px; right:340px; top:772px; text-align:center; text-indent:0;' +
      PLAIN(voice('limitation'), 27));
  }
}

// PORT (S10-F1) — the strip, in EvolutionRail's own grammar, transcribed from
// the component and its stylesheet: a thin threaded line, a 12px marker centred
// ON the line, the label row at +26 in 25px/0.16em, and the second row at +64
// on a 218px measure — one shared rhythm, identical row heights, no staggered
// baselines (icon grammar §4.5). Scene 10's stations put the gain and the
// dependency where the wound sat.
//
// UPGRADED BY THE RAILS LAW (presenter-ordered, 31 August 2026; AGENTS.md §6):
// the simple 40px marks retire from the stations, and the goods ride above the
// line as an OBJECT BAND of dark-field renders at lineup scale — GOLD and
// BITCOIN by their carrier renders (bitcoin per the C1 ruling), LEDGER by
// `ledger_glow` (its Scene 8 assignment) — each in a box of its own aspect
// (the framing rule) at the band's shared height, bottom-aligned on one
// baseline above the line. The band's scale is the contender band's own
// (188 world px at the metals camera's 1.3 = 244 stage px, clearing the line
// by the rail's own 68), so the two rails read as one system. Receded
// stations recede to the dimmed-prior step (§9.4 rule 10); nothing beneath
// the line changed.
//
// THE CLAIM STATION IS THE CERTIFICATE (presenter-ruled, 31 August 2026 —
// Batch B implementation brief §1.1, superseding the CLAIM-station exception
// the rails law carried at its adoption): the station carries the
// `gold_certificate` render, relabeled CLAIM ON GOLD, so all four stations
// are photographic; the ClaimObject disc is never a station — it is the
// traveler, and its journey across the strip is the implementation's motion,
// not a settled still. The disc-as-station staging retires to file below
// (`stripDisc` → the `s10-b1-disc` / `s10-b2-disc` cells), so the selection
// can still be changed by changing one word.
const BAND_H = 244;          // 188 world × 1.3 — the contender band's stage height
const BAND_GAP = 68;         // 52 world × 1.3 — the rail's render-baseline clearance
const BAND_GOODS = {
  gold: { subject: 'gold', aspect: 4 / 3, alt: 'A cast gold bar' },
  paper: { subject: 'gold_certificate', aspect: 4 / 5, alt: 'The gold certificate — a claim on gold' },
  ledger: { subject: 'ledger_glow', aspect: 3 / 2, alt: 'A glowing ledger entry' },
  bitcoin: { subject: 'bitcoin', aspect: 4 / 3, alt: 'The bitcoin carrier' }
};

// The ruled claim station: the certificate render, photographic like every
// other station, in the register's own 4:5 at the band's shared height.
function certificateStation(st, x, bottom, voice) {
  const g = BAND_GOODS.paper;
  const w = Math.round(BAND_H * g.aspect);
  photo(st, {
    subject: g.subject, alt: g.alt, o: voice,
    box: [x - w / 2, bottom - BAND_H, w, BAND_H]
  });
}

// RETIRED TO FILE (the CERTIFICATE ruling, 31 August 2026): the disc as a
// station — the r2 staging, kept runnable per the aesthetic law's
// file-keeping clause. Only the on-file `s10-b1-disc` / `s10-b2-disc` cells
// build with it.
function discStation(st, x, bottom, voice) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `position:absolute; left:${x - 58}px; top:${bottom - BAND_H / 2 - 58}px;` +
    `width:116px; height:116px; opacity:${voice};`;
  const claim = ClaimObject();
  claim.el.style.transition = 'none';
  claim.applyState({ visible: true });
  wrap.appendChild(claim.el);
  st.el.appendChild(wrap);
}

function stripStations(st, { live = 3, claimStation, claimLabel }) {
  const Y = 470;
  // WIRING: four stations on the stage, at the rail's own 340px stop width.
  const XS = [345, 750, 1155, 1560];
  const BOTTOM = Y - BAND_GAP;
  line(st.svg, 200, Y, 1720, Y, VOICE.lineDim, 2);
  STATIONS.forEach((s, i) => {
    const on = i === live;
    const a = on ? 1 : 0.55;
    const voice = on ? 1 : 0.58;
    if (s.key === 'paper') {
      claimStation(st, XS[i], BOTTOM, voice);
    } else {
      const g = BAND_GOODS[s.key];
      const w = Math.round(BAND_H * g.aspect);
      photo(st, {
        subject: g.subject, alt: g.alt, o: voice,
        box: [XS[i] - w / 2, BOTTOM - BAND_H, w, BAND_H]
      });
    }
    dot(st.svg, XS[i], Y, 6, on ? 0.85 : 0.5);
    text(st, s.key === 'paper' ? claimLabel : s.name,
      `left:${XS[i] - 170}px; top:${Y + 26}px; width:340px; text-align:center; text-indent:0;` +
      RAIL_LABEL(on ? 1 : 0.58));
    // The gain takes the stop's own 340px width and the dependency the wound
    // row's 218px measure — both the rail's own numbers. The gain block is
    // reserved at two lines for every station whether it needs them or not, so
    // the dependency row keeps one baseline across the strip: the rail's rule
    // is identical row heights and no staggered baselines (icon grammar §4.5),
    // and the longest gain must not be able to push into the row beneath it.
    text(st, s.gain, `left:${XS[i] - 170}px; top:${Y + 64}px; width:340px; height:68px; text-align:center; text-indent:0;` +
      CAPS(0.75 * a, 20));
    text(st, s.dep, `left:${XS[i] - 109}px; top:${Y + 146}px; width:218px; text-align:center; text-indent:0;` +
      RAIL_ROW(0.58 * a));
  });
}

// The strip as ruled: the certificate at the claim station, relabeled.
function strip(st, { live = 3 } = {}) {
  stripStations(st, { live, claimStation: certificateStation, claimLabel: 'CLAIM ON GOLD' });
}

// The retired r2 staging, on file only.
function stripDisc(st, { live = 3 } = {}) {
  stripStations(st, { live, claimStation: discStation, claimLabel: STATIONS[1].name });
}

// =========================================================== SCENE 5 (8 beats)

cell('s5-b1', {
  scene: 'S5', beat: 1, frame: 'S5-F1', klass: 'PORT', review: 'approved-port',
  source: '4-06-claim-and-carrier — ClaimObject in CarrierShell, construction C',
  caption: 'Beat 1 · the claim needs a body, and wears its first. The through-line composition, ported: the disc centred between construction C’s bands (the carrier-centring ruling of 27 Aug 2026, which lives in the component), the carrier named in the rail’s own stop register. The claim enters Act II here and is on stage at every beat that is about the body it wears.'
}, (st) => {
  claimInCarrier(st, { label: 'SHELLS' });
});

const S5_ROW_CAM = { camera: FRAMES.row, contenders: true, renders: true, line: false };
const s5Row = (wounded, latest) => ({
  ...S5_ROW_CAM,
  stops: {
    cattle: ROW_STOP('lit', wounded.includes('cattle') && 'contender', latest === 'cattle'),
    salt: ROW_STOP('lit', wounded.includes('salt') && 'contender', latest === 'salt'),
    // Shells is still standing: its wound is the Zanzibar receipt, and that is
    // beat 6's own frame, not a line on this row.
    shells: ROW_STOP('lit', false),
    iron: ROW_STOP('lit', wounded.includes('iron') && 'contender', latest === 'iron'),
    metals: ROW_STOP('hidden'),
    gold: ROW_STOP('hidden')
  }
});

cell('s5-b2', {
  scene: 'S5', beat: 2, frame: 'S5-F2', klass: 'PORT', review: 'approved-port',
  source: '2-04-the-competition-record builds 1–4 — the contender row',
  caption: 'Beat 2 · CATTLE falls. The verdict treatment ported by mounting the component itself: the good on the dark-field register, its one wound beneath it at full voice, the row’s shared two-row rhythm. The wound is the legacy verdict, unchanged — “Cannot be divided. Half a cow is no cow.”'
}, (st) => { rail(st, s5Row(['cattle'], 'cattle')); });

cell('s5-b3', {
  scene: 'S5', beat: 3, frame: 'S5-F2', klass: 'PORT', review: 'approved-port',
  source: '2-04-the-competition-record builds 1–4',
  caption: 'Beat 3 · SALT falls. The landed wound speaks at full voice and CATTLE’s recedes to the dimmed-prior step (§9.4 rule 10) — the rule that keeps the sentence being spoken brighter than the ones already said.'
}, (st) => { rail(st, s5Row(['cattle', 'salt'], 'salt')); });

cell('s5-b4', {
  scene: 'S5', beat: 4, frame: 'S5-F2', klass: 'PORT', review: 'approved-port',
  source: '2-04-the-competition-record builds 1–4',
  caption: 'Beat 4 · IRON falls. Three wounds on the record, the newest at full voice. SHELLS is still standing — its defeat is beat 6’s, and it is the one the scene opened on.'
}, (st) => { rail(st, s5Row(['cattle', 'salt', 'iron'], 'iron')); });

// Beat 5 carries THE RAILS LAW (presenter-ordered, 31 August 2026): the goods
// ride the record as an object band of renders above the line, while the
// component's own drawn grammar — the line, the markers, the labels, the four
// wounds, METALS active — is untouched beneath. The four contender renders
// are the component's own (`renders: true` — the same studies s5-b4 mounts);
// what the harness adds is exactly two things, both marked below: the METALS
// render box, mirroring the component's own render markup at the band's
// shared world baseline (bottom −52, the component's RENDER_BOTTOM), in a box
// of the render's own near-16:9 aspect; and the dimmed-prior voice on the
// fallen goods' renders — the component only defines that recession for
// contender mode, because renders never rode the drawn rail before this law.
cell('s5-b5', {
  scene: 'S5', beat: 5, frame: 'S5-F2', klass: 'PORT', review: 'pending-review',
  source: '2-04-the-competition-record build 8 + the rails law (31 Aug 2026) — the goods on the object band',
  caption: 'Beat 5 · the metals rise — THE RAILS LAW STAGED. Beneath the line, the legacy record is untouched: the drawn line, the station markers, the labels and the four wounds, with METALS active. Above it, the goods now ride as an object band of their dark-field renders — the same four studies the contender row uses, receded to the record’s own prior step where their stations have fallen, SHELLS still at full voice — and METALS is carried by the newly gated metals render on the band’s shared baseline. The question for your eye: does the band read as one system with S10’s strip, and is the drawn grammar beneath exactly as it was?'
}, (st) => {
  const r = rail(st, {
    camera: FRAMES.metals,
    renders: true,
    stops: {
      cattle: ROW_STOP('defeated', 'contender'),
      salt: ROW_STOP('defeated', 'contender'),
      shells: ROW_STOP('lit', false),
      iron: ROW_STOP('defeated', 'contender'),
      metals: ROW_STOP('active'),
      gold: ROW_STOP('upcoming')
    }
  });
  // The METALS render box — the component's own render markup, mirrored: the
  // band bottom is the component's RENDER_BOTTOM (world −52), and the box is
  // the render's own aspect (1672×941, near 16:9) at the band's baseline.
  const M_W = 240;
  const M_H = 135;
  const metalsStop = r.el.querySelector('[data-stop="metals"]');
  const renderBox = document.createElement('div');
  renderBox.className = 's2o-rail__render';
  const df = DarkFieldImage({
    name: 'metals', width: M_W, height: M_H,
    alt: 'A stack of cast metal ingots', stubSize: 64
  });
  df.el.dataset.visible = 'true';
  renderBox.style.top = `${-52 - M_H}px`;
  renderBox.appendChild(df.el);
  metalsStop.appendChild(renderBox);
  // The register brightness rule on the band: a fallen station's render
  // recedes to the deck's one dimmed-prior step, as the contender-mode CSS
  // does it; rail mode has no such rule because renders are new here.
  ['cattle', 'salt', 'iron'].forEach((id) => {
    const box = r.el.querySelector(`[data-stop="${id}"] .s2o-rail__render`);
    if (box) box.style.opacity = 'var(--dim-prior)';
  });
});

cell('s5-b6', {
  scene: 'S5', beat: 6, frame: 'S5-F3', klass: 'ADAPT', review: 'approved-adapt',
  source: '2-07-the-severance’s dated-fact treatment · ruled change: generalized as the film-wide evidence grammar',
  caption: 'Beat 6 · THE ZANZIBAR RECEIPT — the evidence grammar’s first specimen. VERIFIED 31 August 2026: the one ruled change landed and nothing else moved. The type is the legacy’s to the value (128px/650 tabular date, 33px/460 fact); the only thing that moved is that the two now stand as one block that can also carry a place. The words are the rail’s own receipt text, split into place · date · fact.'
}, (st) => { evidence(st, SPECIMEN.zanzibar); });

cell('s5-b7', {
  scene: 'S5', beat: 7, frame: 'S5-F1', klass: 'PORT', review: 'approved-port',
  source: '4-06-claim-and-carrier — the same composition, the scene’s closing pair',
  caption: 'Beat 7 · “The function stayed. The carrier changed.” The through-line composition returns with the carrier unnamed — five bodies have been and gone, and the thing inside is the one that did not. This is the frame the whole act hangs from.'
}, (st) => {
  claimInCarrier(st);
  statement(st, 'The function stayed. The carrier changed.');
});

cell('s5-b8', {
  scene: 'S5', beat: 8, frame: '—', klass: 'determined', review: 'determined',
  source: 'the deck’s sequenced-line treatment (P1 b9/b10) on the beat-7 composition',
  caption: 'Beat 8 · the exit question, alone on the composition it leaves. A script landing on an already-approved frame: the line changes, nothing else does.'
}, (st) => {
  claimInCarrier(st);
  statement(st, 'Why did the carrier keep changing?');
});

// =========================================================== SCENE 6 (5 beats)

cell('s6-b1', {
  scene: 'S6', beat: 1, frame: 'S6-F1', klass: 'PORT', review: 'approved-port',
  source: 'P1-F2’s approved display-scale study box (p1-b5) + master §11’s display rule',
  caption: 'Beat 1 · GOLD, and the answer it is. The study box is the Prologue’s approved geometry — 540 tall at the forms’ centre, the render’s own aspect, nothing else in the frame — with the statement in the deck’s caps register above it. WIRING: only the statement’s y is this sheet’s.'
}, (st) => {
  study(st, { subject: 'gold', alt: 'A cast gold bar emerging from darkness' });
  studyStatement(st, 'SCARCITY IN MATTER');
});

// --- The restored elimination: beats 2–7, one legacy build per cell. -------
//
// PORT cells, approved by provenance, no review burden. The presenter's test
// is the one he set at the strike: the sequence should simply look like it
// always did. The compressed r1 cells (the old s6-b2 and s6-b3) are
// superseded and preserved at tag `act-2-states`.

const RESTORED_SOURCE = (n) =>
  `2-05-two-survivors build ${n} + ElementGrid — the legacy pacing (Ruling 3 struck 31 Aug 2026)`;

cell('s6-b2', {
  scene: 'S6', beat: 2, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(1),
  caption: 'Beat 2 · the table rises. Legacy build 1, ported whole: the kicker lands and the stylized table stands at its full population, nothing yet eliminated. From here the film advances one wave at a time, exactly as the legacy performed it.'
}, (st) => { survivors(st, 1); });

cell('s6-b3', {
  scene: 'S6', beat: 3, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(2),
  caption: 'Beat 3 · the gases drift off. Legacy build 2: ElementGrid’s own step 1, and the wave’s single line at full voice — “Anything that floats away is out.” One line on stage at a time, as the legacy showed it.'
}, (st) => { survivors(st, 2); });

cell('s6-b4', {
  scene: 'S6', beat: 4, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(3),
  caption: 'Beat 4 · the corrosion wave. Legacy build 3: everything that rusts, burns, or dissolves goes dark — most of the table, iron included — with the wave’s own line beneath.'
}, (st) => { survivors(st, 3); });

cell('s6-b5', {
  scene: 'S6', beat: 5, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(4),
  caption: 'Beat 5 · the radioactive row pulses out. Legacy build 4: one wave, one line — “Anything that kills the holder is out.”'
}, (st) => { survivors(st, 4); });

cell('s6-b6', {
  scene: 'S6', beat: 6, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(5),
  caption: 'Beat 6 · the shapeless settle out. Legacy build 5: what will not hold a shape goes, and what remains is the small lit family of noble metals.'
}, (st) => { survivors(st, 5); });

cell('s6-b7', {
  scene: 'S6', beat: 7, frame: 'S6-F2', klass: 'PORT', review: 'approved-port',
  source: RESTORED_SOURCE(6),
  caption: 'Beat 7 · the furnace decides, and two survive. Legacy build 6: the furnace wave takes the noble metals no ancient forge could work, Ag and Au stand alone, and the legacy verdict lands — “Workable nobility leaves two.” The 1803 foreshadow is spoken on this advance, where the legacy speaks it, and it is why palladium is a candidate that lost on timing rather than one chemistry had already excluded.'
}, (st) => { survivors(st, 6); });

cell('s6-b8', {
  scene: 'S6', beat: 8, frame: 'S5-F1', klass: 'PORT', review: 'approved-port',
  source: '4-06-claim-and-carrier — the through-line composition, carrier GOLD',
  caption: 'Beat 8 · the claim has found its strongest body yet. The same ported composition, the carrier now named GOLD — which is what makes the argument visible rather than spoken: the body changed and the thing inside did not. (Beat 4 of the r1 sheet, renumbered by the restoration; the render is carried byte-identical.)'
}, (st) => {
  claimInCarrier(st, { label: 'GOLD', labelVoice: 1 });
  statement(st, 'Hard to create. Hard to destroy.');
});

// --- S6-F3 · NEW — the mass state. SELECTED 31 August 2026: A. -------------
//
// The frame: represented value up, physical mass visibly up. Line grammar
// throughout (a diagram — the register boundary keeps renders out), the film's
// own stroke, dot terminals and voices. Content is the architecture's own beat
// and carries no word the installed script has not written.
//
// The presenter selected system A — the counted load — on 31 August 2026
// (states.json `rulingsR2`). The selected builder lands as the beat's cell,
// `s6-b9` (beat 9 after the restoration), carried byte-identical from the
// candidate render; the two non-selected systems stay registered `on-file`,
// so the selection is still one letter's change.

const MASS_STEPS = [
  { value: 'ONE CLAIM', bars: 1 },
  { value: 'FOUR', bars: 4 },
  { value: 'TWELVE', bars: 12 }
];

function massCounted(st) {
  const Y = 380;
  const XS = [430, 960, 1490];
  line(st.svg, 250, Y, 1670, Y, VOICE.lineDim, 2);
  MASS_STEPS.forEach((s, i) => {
    const x = XS[i];
    dot(st.svg, x, Y, 5, VOICE.dot);
    text(st, s.value, `left:${x - 200}px; top:${Y - 92}px; width:400px; text-align:center; text-indent:0;` + CAPS(0.8, 24));
    // The stack hangs from the baseline, three marks to a course — twelve is
    // four courses, which is what fixes the composition's depth.
    for (let k = 0; k < s.bars; k += 1) {
      const col = k % 3;
      const rowN = Math.floor(k / 3);
      mark(st, 'metals', x - 62 + col * 62, Y + 74 + rowN * 62, 46, 0.72);
    }
  });
  statement(st, 'As the value grows, the weight grows.', { top: 848, size: 40 });
}

cell('s6-b9', {
  scene: 'S6', beat: 9, frame: 'S6-F3', klass: 'NEW', review: 'approved-selection',
  system: 'A — the counted load',
  source: 'the presenter’s selection, 31 August 2026 — s6-b5-a carried byte-identical',
  caption: 'Beat 9 · THE MASS STATE — the selected system: the counted load. The mass is COUNTED, in the metal’s own mark: three stations along one baseline, the represented value named above and the required mass stacked beneath as repeated gold marks — one, four, twelve. The growth is arithmetic and unarguable, and it reads before a word is read. Selected 31 August 2026; the render is the candidate’s, byte-identical.'
}, (st) => { massCounted(st); });

cell('s6-b5-a', {
  scene: 'S6', beat: 9, frame: 'S6-F3', klass: 'NEW', review: 'on-file',
  system: 'A — the counted load',
  caption: 'Candidate A — the counted load. SELECTED 31 August 2026: this system lands as the beat cell s6-b9. The candidate keeps its r1 id (the mass state was beat 5 before the restoration) and stays on file per the aesthetic law.'
}, (st) => { massCounted(st); });

cell('s6-b5-b', {
  scene: 'S6', beat: 9, frame: 'S6-F3', klass: 'NEW', review: 'on-file',
  system: 'B — the column that grows',
  caption: 'Candidate B — the column that grows, NOT SELECTED (the presenter chose A, 31 August 2026); kept on file per the aesthetic law. One column on one baseline, with the three represented values ticked on it as thresholds in the line’s own language — the level the mass stands at now drawn as a column, the two it has passed left as the edges where it used to reach.'
}, (st) => {
  const BASE = 786;
  const CX = 780;
  const W = 230;
  const HS = [120, 268, 452];
  line(st.svg, 380, BASE, 1560, BASE, VOICE.lineDim, 2);
  HS.forEach((h, i) => {
    const last = i === HS.length - 1;
    // Only the height it stands at now is a column. The two it has passed are
    // the top edge alone — where the mass used to reach — so the frame reads as
    // ONE quantity that has climbed, rather than as three bars side by side.
    if (last) {
      pathEl(st.svg, `M ${CX - W / 2} ${BASE} L ${CX - W / 2} ${BASE - h} L ${CX + W / 2} ${BASE - h} L ${CX + W / 2} ${BASE}`, VOICE.line);
    } else {
      line(st.svg, CX - W / 2, BASE - h, CX + W / 2, BASE - h, VOICE.faint);
    }
    // The tick that names the height, in the grammar's own threshold language.
    line(st.svg, CX + W / 2, BASE - h, CX + W / 2 + 52, BASE - h, last ? VOICE.line : VOICE.faint);
    dot(st.svg, CX + W / 2 + 52, BASE - h, 3.2, last ? VOICE.dot : VOICE.dotDim);
    text(st, MASS_STEPS[i].value,
      `left:${CX + W / 2 + 72}px; top:${BASE - h - 15}px; width:460px; text-indent:0;` +
      CAPS(last ? 0.85 : 0.4, 24));
  });
  mark(st, 'metals', CX, BASE - 62, 54, 0.82);
  statement(st, 'As the value grows, the weight grows.', { top: 892, size: 40 });
});

cell('s6-b5-c', {
  scene: 'S6', beat: 9, frame: 'S6-F3', klass: 'NEW', review: 'on-file',
  system: 'C — the load hung from the claim',
  caption: 'Candidate C — the load hung from the claim, NOT SELECTED (the presenter chose A, 31 August 2026); kept on file per the aesthetic law. The dependency drawn as literal length: three rows, the claim’s mark fixed at the left of each, and the mass hanging from it as a line that reaches further every time.'
}, (st) => {
  const YS = [380, 560, 740];
  const X0 = 420;
  const LENS = [180, 460, 900];
  MASS_STEPS.forEach((s, i) => {
    const y = YS[i];
    const last = i === MASS_STEPS.length - 1;
    const a = last ? VOICE.line : VOICE.lineDim;
    dot(st.svg, X0, y, 5, last ? VOICE.dot : VOICE.dotDim);
    line(st.svg, X0, y, X0 + LENS[i], y, a, 2);
    mark(st, 'metals', X0 + LENS[i] + 44, y, 44, last ? 0.85 : 0.5);
    text(st, s.value, `left:${X0 - 380}px; top:${y - 15}px; width:340px; text-align:right; text-indent:0;` +
      CAPS(last ? 0.85 : 0.45, 24));
  });
  statement(st, 'As the value grows, the weight grows.', { top: 926, size: 40 });
});

// =========================================================== SCENE 7 (5 beats)

cell('s7-b1', {
  scene: 'S7', beat: 1, frame: '—', klass: 'determined', review: 'determined',
  source: 'S6 b4’s composition (S5-F1, ported) with the rail’s own recorded gold wound',
  caption: 'Beat 1 · gold’s weaknesses named on the body that has them. The composition is beat 4’s; the line is the Evolution Rail’s own gold wound, unchanged — “heavy · hard to verify · dangerous to move.”'
}, (st) => {
  claimInCarrier(st, { label: 'GOLD', labelVoice: 1 });
  statement(st, 'Heavy · hard to verify · dangerous to move', { size: 40 });
});

cell('s7-b2', {
  scene: 'S7', beat: 2, frame: 'S5-F1', klass: 'PORT', review: 'approved-port',
  source: '4-06’s composition + EvolutionRail’s recorded COINAGE riser note',
  caption: 'Beat 2 · the body becomes the coin. The through-line composition with the carrier named COINAGE, and the rail’s own riser note beneath it, verbatim: “Solves verification and division. Trust required: the mint.”'
}, (st) => {
  claimInCarrier(st, { label: 'COINAGE', labelVoice: 1 });
  statement(st, 'Solves verification and division. Trust required: the mint.', { size: 40 });
});

cell('s7-b3', {
  scene: 'S7', beat: 3, frame: 'S7-F1', klass: 'PORT', review: 'approved-port',
  source: 'P1-F2’s approved display-scale study box, subject `vault`',
  caption: 'Beat 3 · CUSTODY — the gold stops. The same approved study geometry as beat 1 of Scene 6, with a subject that has never been on screen. §0’s convention is what makes this a port rather than a new frame: a subject is not a treatment, and the presenter confirmed §0.'
}, (st) => {
  study(st, { subject: 'vault', alt: 'A vault door, closed, emerging from darkness' });
  studyStatement(st, 'THE GOLD STOPS HERE');
});

// --- S7-F2 · NEW — the detachment. SELECTED 31 August 2026: B's logic, -----
// --- restaged photographically (the r2 brief §3). ---------------------------
//
// Ruled NEW 31 August 2026: the legacy detaching rung's meaning is vertical
// abstraction; the film's moment is outward travel with a dependency line
// back. The presenter selected candidate B's logic — the custody boundary
// crossed — and ordered the restage: the frame rebuilt in the film's real
// register as the Act I photograph-plus-line pattern (the s2-* finals), not a
// diagram. The photographic vault render holds the gold; the photographic
// gold_certificate render is detached and traveled outward; one thin
// dependency line runs back, in Act I's own service-path grammar (stroke 1.5
// at 0.35, dot terminals r 3.5 at 0.7 — the values `_exchangeStage.js`
// ships, with the line clearing each box by ~50px exactly as Scene 2's
// service path clears its figures). Both renders are 4:5 portraits of the
// Batch A drop; each box takes the render's own aspect (the framing rule),
// the vault the larger mass — the heavy thing that stays — the certificate
// smaller, at its distance, at full voice. The drawn circle and the ticket
// glyph retire to file with the three drawn candidates below.

const DEP_LINE = 'A claim on gold in a vault.';

// The photograph-plus-line pattern's photo box — the Act I stage's own
// dark-field handling (`_df` in `_exchangeStage.js`): the register's reveal
// transition disabled so the still is the settled state.
function photo(st, { subject, box: [x, y, w, h], alt, o = 1 }) {
  const df = DarkFieldImage({ name: subject, width: w, height: h, alt });
  df.el.dataset.visible = 'true';
  df.el.style.transition = 'none';
  df.el.style.position = 'absolute';
  df.el.style.left = `${x}px`;
  df.el.style.top = `${y}px`;
  df.el.style.opacity = String(o);
  st.el.appendChild(df.el);
  return df.el;
}

cell('s7-b4', {
  scene: 'S7', beat: 4, frame: 'S7-F2', klass: 'NEW', review: 'pending-review',
  system: 'B — the custody boundary crossed · restaged photographically',
  source: 'the presenter’s selection of s7-b4-b’s logic + the r2 brief §3 — the Act I photograph-plus-line pattern',
  caption: 'Beat 4 · THE DETACHMENT, restaged in the film’s real register at your order: the photographic vault holding the gold, the photographic certificate detached and traveled outward across the boundary, and one thin dependency line back — the Act I photograph-plus-line pattern, not a diagram. The drawn circle and the ticket glyph retired to file with the drawn candidates. The question for your eye is the one the brief sets: does this frame sit at the standard of the Act I finals?'
}, (st) => {
  photo(st, { subject: 'vault', box: [340, 208, 500, 625], alt: 'The vault, closed, holding the gold' });
  photo(st, { subject: 'gold_certificate', box: [1230, 187, 340, 425], alt: 'The gold certificate, traveled outward' });
  // The dependency: one thin line back to the vault, dot-terminated — the
  // service path's exact grammar, sloped because the claim sits at its
  // distance above the vault's centre of mass.
  line(st.svg, 890, 512, 1180, 428, 0.35, 1.5);
  dot(st.svg, 890, 512, 3.5, 0.7);
  dot(st.svg, 1180, 428, 3.5, 0.7);
  statement(st, DEP_LINE, { top: 866, size: 46 });
});

// THE VAULT IS NOT A GLYPH, AND IS NOT DRAWN AS ONE. `vault` is a dark-field
// subject; the grammar set has no vault mark, and the register boundary keeps
// the render out of a diagram (master §6.3). The icon grammar's own answer
// applies — "where a thing has an exact name and no distinctive form, set it
// rather than draw it" — so the vault position carries what is actually held,
// the gold mark, inside a drawn enclosure, and the word names it. Composed
// from the existing set; no glyph was invented for this sheet.
function vaultMark(st, x, y, { enclosed = true } = {}) {
  mark(st, 'gold', x, y, 64, 0.62);
  if (enclosed) {
    const R = 66;
    ['M', 'm'].forEach((side, i) => {
      const s = i === 0 ? -1 : 1;
      pathEl(st.svg,
        `M ${x + s * R} ${y - R} L ${x + s * (R + 22)} ${y - R} L ${x + s * (R + 22)} ${y + R} L ${x + s * R} ${y + R}`,
        VOICE.lineDim);
    });
  }
  dot(st.svg, x, y, 3.4, VOICE.dotDim);
}

cell('s7-b4-a', {
  scene: 'S7', beat: 4, frame: 'S7-F2', klass: 'NEW', review: 'on-file',
  system: 'A — the departure arc',
  caption: 'Candidate A — the departure arc, NOT SELECTED (the presenter chose B’s logic, restaged photographically, 31 August 2026); kept on file per the aesthetic law.'
}, (st) => {
  const V = [560, 620];
  const C = [1420, 400];
  vaultMark(st, V[0], V[1]);
  // The travel is a curve; the dependency is a straight tie. Two line qualities
  // for two ideas — it went, and it still owes.
  pathEl(st.svg, `M ${V[0] + 106} ${V[1] - 40} Q ${1000} ${262} ${C[0] - 52} ${C[1] + 4}`, VOICE.line);
  line(st.svg, V[0] + 92, V[1] - 8, C[0] - 44, C[1] + 30, VOICE.faint, 1);
  mark(st, 'paper', C[0], C[1], 76, 0.95);
  dot(st.svg, C[0], C[1], 4.5, VOICE.dot);
  text(st, 'THE VAULT', `left:${V[0] - 200}px; top:${V[1] + 106}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.5));
  text(st, 'THE CLAIM', `left:${C[0] - 200}px; top:${C[1] + 76}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.78));
  statement(st, DEP_LINE, { top: 860, size: 40 });
});

cell('s7-b4-b', {
  scene: 'S7', beat: 4, frame: 'S7-F2', klass: 'NEW', review: 'on-file',
  system: 'B — the custody boundary crossed',
  caption: 'Candidate B — the custody boundary crossed. ITS LOGIC WAS SELECTED (31 August 2026) and restaged photographically as the beat cell s7-b4; this drawn form — the ring and the ticket glyph — retires to file per the aesthetic law.'
}, (st) => {
  const CX = 700; const CY = 500; const R = 216;
  // Custody drawn as a boundary rather than as a place: the tie visibly
  // crosses it, which is the beat's whole sentence in one mark.
  const ring = document.createElementNS(svgNS, 'circle');
  ring.setAttribute('cx', CX); ring.setAttribute('cy', CY); ring.setAttribute('r', R);
  ring.setAttribute('fill', 'none');
  ring.setAttribute('stroke', `rgba(255,255,255,${VOICE.lineDim})`);
  ring.setAttribute('stroke-width', 1.5);
  st.svg.appendChild(ring);
  vaultMark(st, CX, CY, { enclosed: false });
  const C = [1480, 430];
  line(st.svg, CX + 46, CY - 20, C[0] - 48, C[1] + 22, VOICE.line);
  mark(st, 'paper', C[0], C[1], 76, 0.95);
  dot(st.svg, C[0], C[1], 4.5, VOICE.dot);
  text(st, 'THE VAULT', `left:${CX - 200}px; top:${CY + 74}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.5));
  text(st, 'THE CLAIM', `left:${C[0] - 200}px; top:${C[1] + 76}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.78));
  statement(st, DEP_LINE, { top: 860, size: 40 });
});

cell('s7-b4-c', {
  scene: 'S7', beat: 4, frame: 'S7-F2', klass: 'NEW', review: 'on-file',
  system: 'C — the two positions',
  caption: 'Candidate C — the two positions, NOT SELECTED (the presenter chose B’s logic, restaged photographically, 31 August 2026); kept on file per the aesthetic law.'
}, (st) => {
  const V = [520, 500];
  const WAS = [800, 500];
  const NOW = [1440, 440];
  vaultMark(st, V[0], V[1]);
  // No path is drawn. The claim is shown where it was, receded, and where it
  // is, at full voice; the movement is read from the pair.
  mark(st, 'paper', WAS[0], WAS[1], 68, 0.2);
  line(st.svg, WAS[0] + 44, WAS[1] - 6, NOW[0] - 46, NOW[1] + 12, VOICE.line);
  mark(st, 'paper', NOW[0], NOW[1], 76, 0.95);
  dot(st.svg, NOW[0], NOW[1], 4.5, VOICE.dot);
  text(st, 'THE VAULT', `left:${V[0] - 200}px; top:${V[1] + 106}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.5));
  text(st, 'THE CLAIM', `left:${NOW[0] - 200}px; top:${NOW[1] + 76}px; width:400px; text-align:center; text-indent:0;` + KICKER(0.78));
  statement(st, DEP_LINE, { top: 860, size: 40 });
});

cell('s7-b5', {
  scene: 'S7', beat: 5, frame: '—', klass: 'determined', review: 'determined',
  source: 'the deck’s sequenced-line treatment; the paired lines are the architecture’s own',
  caption: 'Beat 5 · the trade named honestly, as a pair on cleared black — the deck’s own sequenced-line treatment. FLAGGED: whether the detachment holds under these lines instead of clearing follows the beat-4 selection, and is not decided here.'
}, (st) => {
  statement(st, 'Portability improved.', { top: 452, size: 54 });
  statement(st, 'Trust moved to the issuer.', { top: 560, size: 54 });
});

// =========================================================== SCENE 8 (5 beats)

cell('s8-b1', {
  scene: 'S8', beat: 1, frame: 'S8-F1', klass: 'PORT', review: 'approved-port',
  source: 'P1’s five-form cross-dissolve — p1-b6 (paper) → p1-b7-glow (ledger_glow), both approved',
  caption: 'Beat 1 · MONEY BECAME INFORMATION. The landing of a transition the film already owns: the Prologue’s approved morph runs paper into the glowing ledger entry, and both of its frames are presenter-approved cells. The register’s one 3:2 render takes its own aspect in the approved box.'
}, (st) => {
  study(st, { subject: 'ledger_glow', box: 'threeTwo', alt: 'A glowing ledger entry emerging from darkness' });
  studyStatement(st, 'MONEY BECAME INFORMATION');
});

cell('s8-b2', {
  scene: 'S8', beat: 2, frame: 'S5-F3', klass: 'ADAPT', review: 'approved-adapt',
  source: '2-07-the-severance’s dated-fact treatment · the evidence grammar’s second specimen',
  caption: 'Beat 2 · 1971. The grammar’s second specimen — a date with no place — carrying `2-07`’s own decree sentence verbatim. VERIFIED 31 August 2026: the legacy composition and the generalized one look most alike here, because this is the specimen it was built on, and nothing else moved.'
}, (st) => { evidence(st, SPECIMEN.severance); });

cell('s8-b3', {
  scene: 'S8', beat: 3, frame: '—', klass: 'determined', review: 'determined',
  source: '2-08-the-pattern’s recorded thesis line 2',
  caption: 'Beat 3 · captured, not beaten. The legacy pattern slide’s own sentence, on cleared black at the deck’s statement register — the protected history, in the words the record already uses.'
}, (st) => {
  statement(st, 'The last incumbent didn’t fall the way the others did — it was captured: custody centralized, claims over-issued, redemption cancelled.',
    { top: 430, size: 46 });
});

cell('s8-b4', {
  scene: 'S8', beat: 4, frame: 'S8-F2', klass: 'PORT', review: 'approved-port',
  source: '2-07-the-severance’s chart — the frozen data and every draw rule, untouched',
  caption: 'Beat 4 · THE RECORD. Ported whole: `src/data/purchasing-power.js` unchanged, one vertex per observed year (“the line is the record, not a curve fit”), the frozen draw order and per-series alpha, the 1971 = 100 reference line, the end-label spread where USD and GBP finish within a label’s height, the index note. Ruled PORT on 31 Aug; an ADAPT is reserved only for a clash the presenter sees in context.'
}, (st) => { severanceChart(st); });

cell('s8-b5', {
  scene: 'S8', beat: 5, frame: '—', klass: 'determined', review: 'determined',
  source: '2-07-the-severance’s two balance lines, verbatim',
  caption: 'Beat 5 · both facts on one screen, because both are true. The legacy severance’s own closing pair, unchanged — the honest strength above, the measured wound below.'
}, (st) => {
  statement(st, 'The most universally accepted medium of exchange in history.', { top: 434, size: 46, a: 0.72 });
  statement(st, 'Extraordinary at moving value. Measurably poor at storing it.', { top: 566, size: 52 });
});

// =========================================================== SCENE 9 (5 beats)
//
// Beat 1 is the act's one confirmed-NEW ◆ frame whose candidates already exist.
// The map applies the systems sheet's three rather than generating parallel
// ones, so these cells RUN THOSE BUILDERS — the cell on this sheet and the cell
// on the systems sheet cannot drift, because they are the same function.

// SELECTED 31 August 2026: A — the hub dissolving (states.json `rulingsR2`).
// The beat cell runs the selected candidate's builder — the systems sheet's
// own, so the two cannot drift — and its render is the candidate's, carried
// byte-identical. The non-selected candidates stay registered on file.
cell('s9-b1', {
  scene: 'S9', beat: 1, frame: 'S9-F1', klass: 'NEW', review: 'approved-selection',
  system: SYSTEM_CELLS['s9f1-a'].system,
  source: 'the presenter’s selection, 31 August 2026 — s9-b1-a carried byte-identical (the systems sheet’s own builder)',
  caption: `Beat 1 · THE NETWORK FORMATION — the selected system: the hub dissolving. ${SYSTEM_CELLS['s9f1-a'].caption} Selected 31 August 2026; the render is the candidate’s, byte-identical.`
}, (st) => SYSTEM_CELLS['s9f1-a'].build(st));

['a', 'b', 'c'].forEach((k) => {
  const src = SYSTEM_CELLS[`s9f1-${k}`];
  const verdict = k === 'a'
    ? 'SELECTED 31 August 2026: this system lands as the beat cell s9-b1.'
    : 'NOT SELECTED (the presenter chose A, 31 August 2026); kept on file per the aesthetic law.';
  cell(`s9-b1-${k}`, {
    scene: 'S9', beat: 1, frame: 'S9-F1', klass: 'NEW', review: 'on-file',
    system: src.system,
    source: 'review/act-2/systems — the same builder, reused per the ruled map §6',
    caption: `Candidate ${k.toUpperCase()} — ${src.system.split('—')[1].trim()}. ${verdict}`
  }, (st) => src.build(st));
});

cell('s9-b2', {
  scene: 'S9', beat: 2, frame: 'S9-F2', klass: 'PORT', review: 'approved-port',
  source: '2-08-the-pattern builds 5–6 — the entrant block in the neutral register',
  caption: 'Beat 2 · the facts, in the deck’s most neutral register. The rail’s own entrant block, free-standing: the mark, the name in stop typography, and the recorded line — “2009: digital · no state, no company · supply fixed by its own rules.” Description, never argument.'
}, (st) => { entrantBlock(st); });

cell('s9-b3', {
  scene: 'S9', beat: 3, frame: 'S9-F2', klass: 'PORT', review: 'approved-port',
  source: '2-08-the-pattern builds 5–6',
  caption: 'Beat 3 · the three capabilities that had never coexisted, landing on their own advance while the facts recede to the dimmed-prior step. The caps register is the deck’s; the three names are the architecture’s.'
}, (st) => { entrantBlock(st, { capabilities: true }); });

cell('s9-b4', {
  scene: 'S9', beat: 4, frame: 'S9-F2', klass: 'PORT', review: 'approved-port',
  source: '2-08-the-pattern build 6 — the limitation as its own advance',
  caption: 'Beat 4 · the honest line, in the same breath. This is the whole reason S9-F2 is a port: the legacy treatment already gives the limitation ITS OWN ADVANCE at full voice, with everything above it receded — which is what turns “honesty in the same breath” from a hope into a composition. The sentence is the rail’s, verbatim.'
}, (st) => { entrantBlock(st, { capabilities: true, limitation: true }); });

cell('s9-b5', {
  scene: 'S9', beat: 5, frame: '—', klass: 'determined', review: 'determined',
  source: 'the deck’s sequenced-line treatment; the content is Ruling 5’s distribution',
  caption: 'Beat 5 · the two-question distinction, on cleared black. Ruling 5’s distributed stability content lands here as a spoken distinction with one line on screen — no frame was built for the stability scene, and none is built here.'
}, (st) => {
  statement(st, 'The market’s valuation of a young asset, and the architecture of the claim, are two different questions.',
    { top: 430, size: 46 });
  statement(st, 'Volatility is a stage, not a verdict.', { top: 616, size: 40, a: 0.72 });
});

// ========================================================== SCENE 10 (5 beats)

cell('s10-b1', {
  scene: 'S10', beat: 1, frame: 'S10-F1', klass: 'PORT', review: 'ruled-re-render',
  source: 'EvolutionRail’s grammar (icon grammar §4.5) + the rails law (31 Aug 2026) + the CERTIFICATE ruling (31 Aug 2026, Batch B brief §1.1)',
  caption: 'Beat 1 · THE STRIP — THE CERTIFICATE RULING STAGED. Beneath the line, the rail’s own drawn sentence is unchanged: the 12px marker on the line, the name at +26 in 25px/0.16em, the gain and the dependency where the wound sat, one shared rhythm, no staggered baselines. Above it, all four stations are now photographic: GOLD by its render, the claim station by the gold_certificate render relabeled CLAIM ON GOLD, LEDGER by ledger_glow, BITCOIN by its render per the C1 ruling — each at the band’s shared height in a box of its own aspect. The ClaimObject disc is never a station — it is the traveler, and its journey across the strip is motion the implementation builds, judged at the act viewing. BITCOIN is the live station; the three before it recede to the prior step. The disc-as-station staging is retired to file as s10-b1-disc.'
}, (st) => {
  strip(st);
});

cell('s10-b2', {
  scene: 'S10', beat: 2, frame: '—', klass: 'determined', review: 'ruled-re-render',
  source: 'the architecture’s own line, on the beat-1 composition — re-landed on the certificate strip',
  caption: 'Beat 2 · the history line, re-landed on the certificate strip. The line and its register are unchanged; only the station above it changed, by the CERTIFICATE ruling. The disc-as-station variant is retired to file as s10-b2-disc.'
}, (st) => {
  strip(st);
  statement(st, 'The history of money is a history of changing trade-offs.', { top: 866, size: 44 });
});

// The retired disc-as-station staging, kept on file per the aesthetic law:
// the r2 renders are carried byte-identical to these ids, and the builders
// below can re-render them if the selection is ever changed back.
cell('s10-b1-disc', {
  scene: 'S10', beat: 1, frame: 'S10-F1', klass: 'PORT', review: 'on-file',
  source: 'the r2 rails-law staging — the disc at CLAIM, retired by the CERTIFICATE ruling (31 Aug 2026)',
  caption: 'The disc-as-station strip, RETIRED TO FILE by the CERTIFICATE ruling of 31 August 2026 (Batch B brief §1.1); kept per the aesthetic law so the selection can be changed by changing one word. The render is the r2 staging, carried byte-identical.'
}, (st) => {
  stripDisc(st);
});

cell('s10-b2-disc', {
  scene: 'S10', beat: 2, frame: '—', klass: 'determined', review: 'on-file',
  source: 'the r2 rails-law staging — the history line on the disc strip, retired by the CERTIFICATE ruling (31 Aug 2026)',
  caption: 'The history line on the disc-as-station strip, RETIRED TO FILE by the CERTIFICATE ruling of 31 August 2026; kept per the aesthetic law. The render is the r2 staging, carried byte-identical.'
}, (st) => {
  stripDisc(st);
  statement(st, 'The history of money is a history of changing trade-offs.', { top: 866, size: 44 });
});

cell('s10-b3', {
  scene: 'S10', beat: 3, frame: 'S10-F2', klass: 'ADAPT', review: 'approved-adapt',
  source: '3-05-the-palladium-test · ruled change: Ruling 4, placed in Scene 10 as the bar the strip must clear',
  caption: 'Beat 3 · PALLADIUM. The legacy frame ported — the hook, and the two panels with their real sourced figures (annual mine supply beside the modern price record on a log axis, one vertex per observed year). VERIFIED 31 August 2026, placement confirmed: the beat stands against the strip, out of Act III’s judging position, nothing inside the frame moved, and the two-epoch honesty traveled with it.'
}, (st) => {
  const hook = document.createElement('p');
  hook.className = 's3f-palladium__hook';
  hook.dataset.visible = 'true';
  hook.textContent = 'Palladium: scarcer in supply than gold. Genuinely useful. At times more expensive. It never became money.';
  st.el.appendChild(hook);
  palladiumChart(st, 3);
  const timing = document.createElement('p');
  timing.className = 's3f-palladium__timing';
  timing.dataset.visible = 'true';
  timing.textContent = 'Discovered in 1803 — facing a monetary network thousands of years old.';
  st.el.appendChild(timing);
});

cell('s10-b4', {
  scene: 'S10', beat: 4, frame: 'S10-F2', klass: 'ADAPT', review: 'approved-adapt',
  source: '3-05-the-palladium-test build 5 — the bar',
  caption: 'Beat 4 · THE BAR — the sentence every later candidate is held to, landing at full voice with the two epoch lines settled small and receded beneath a chart still at full voice (R7.4 §F.6’s own budget). The sentence is the legacy’s, unchanged. VERIFIED 31 August 2026.'
}, (st) => {
  const hook = document.createElement('p');
  hook.className = 's3f-palladium__hook';
  hook.dataset.visible = 'true';
  hook.textContent = 'Palladium: scarcer in supply than gold. Genuinely useful. At times more expensive. It never became money.';
  st.el.appendChild(hook);
  palladiumChart(st, 5);
  const timing = document.createElement('p');
  timing.className = 's3f-palladium__timing';
  timing.dataset.visible = 'true';
  timing.textContent = 'Discovered in 1803 — facing a monetary network thousands of years old.';
  st.el.appendChild(timing);
  // The second epoch — the two-epoch honesty the map's note says travels with
  // the port, and the reason the beat can survive being compressed at all.
  const narrowed = document.createElement('p');
  narrowed.className = 's3f-palladium__narrowed';
  narrowed.dataset.visible = 'true';
  narrowed.textContent = 'And when gold’s role narrowed to store of value, palladium never touched that either. Central banks hold gold — not palladium.';
  st.el.appendChild(narrowed);
  const bar = document.createElement('p');
  bar.className = 's3f-palladium__bar';
  bar.dataset.visible = 'true';
  bar.textContent = 'Marginally better is structurally insufficient. Only a categorical difference on the deciding properties has ever moved the crown.';
  st.el.appendChild(bar);
});

cell('s10-b5', {
  scene: 'S10', beat: 5, frame: '—', klass: 'determined', review: 'determined',
  source: 'the deck’s question register (1.03’s s1q-what__question, the film’s big-question type)',
  caption: 'Beat 5 · the pivot that opens Act III, alone on cleared black. The question register the film uses for exactly this — a question the next act exists to answer.'
}, (st) => {
  text(st, 'Better for what job?',
    'left:240px; right:240px; top:490px; text-align:center; text-indent:0;' +
    'font-size:64px; font-weight:560; line-height:1.35; letter-spacing:-0.015em; color:#fff;');
});

// ---- the evidence grammar's third specimen ---------------------------------
//
// The S5-F3 ruling names three specimens — Zanzibar, 1971 and 1803 — and two of
// them are beats (S5 b6, S8 b2). The third is Scene 10's timing line, which
// lives inside a ported frame and therefore cannot show the grammar on its own.
// This proof cell renders it, so the ruled generalization is demonstrated on
// all three rather than asserted on the third. It is not a beat and it is not a
// frame the film builds; it is the system's proof, in the systems sheet's own
// tradition of rendering a treatment twice to show it degrade.

cell('s5f3-proof-1803', {
  scene: '—', beat: null, frame: 'S5-F3', klass: 'ADAPT', review: 'approved-adapt',
  system: 'system proof',
  source: 'the evidence grammar carrying its third specimen',
  caption: 'SYSTEM PROOF, not a beat · the evidence grammar carrying 1803 — the film’s third dated fact, and the one Scene 6 plants four scenes before Scene 10 pays it off. APPROVED 31 August 2026 with the two beat specimens, so the ruled generalization is demonstrated on all three rather than asserted on the third. In the film the line lives inside Scene 10’s ported palladium frame.'
}, (st) => { evidence(st, SPECIMEN.palladium); });

// ---- runtime ---------------------------------------------------------------

export const CELL_IDS = Object.keys(CELLS);

export function buildCell(id) {
  const c = CELLS[id];
  if (!c) throw new Error(`no cell builder for "${id}"`);
  const st = stage();
  c.build(st);
  return id;
}

export function cellMeta() {
  return Object.fromEntries(Object.keys(CELLS).map((id) => {
    const { build, ...meta } = CELLS[id];
    return [id, meta];
  }));
}

export function teardown() {
  const prev = document.getElementById(STAGE_ID);
  if (prev) prev.remove();
  cleanup.forEach((fn) => { try { fn(); } catch { /* torn down with the DOM */ } });
  cleanup = [];
}

export default buildCell;
