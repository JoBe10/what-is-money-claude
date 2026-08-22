// R7.3 Icon Studio — builds the contact sheet for the presenter's selection.
//
// This round STOPS HERE. The brief is explicit: three new candidates per glyph
// at a raised bar, rendered at every scale the glyph actually ships at, and the
// presenter's eye decides. Nothing is applied. `candidates-r7-3.js` has no
// importer in `src/`, so there is no path by which a proposal reaches a slide,
// and the only thing this script writes is evidence.
//
// The sheet puts the SHIPPING mark first in every row, at the same scales as
// the proposals. A candidate that cannot beat the mark already on stage is not
// a candidate, and the only way to see that is side by side at the size the
// viewer will see it — which is why every row carries the deployed sizes rather
// than one flattering display size. The riser marks are judged at 22px because
// 22px is where they live; the table assets at 96 and 56 for the same reason.
//
// Usage: node review/rebuild-r7-3/harness/glyph-studio-r7-3.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { CANDIDATES } from '../../../assets/icons/candidates/candidates.js';
import { R73_CANDIDATES, STROKE } from '../../../assets/icons/candidates/candidates-r7-3.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, '..', 'icon-studio');
fs.mkdirSync(out, { recursive: true });

// The shipping selection per glyph — the incumbent each proposal has to beat.
// Kept as a literal rather than imported from src/components/section-2/glyphs.js
// so this harness has no dependency on the deck's module graph; it is checked
// against that file by the gate.
const SHIPPING = {
  cattle: 'a', salt: 'b', shells: 'a', iron: 'a', metals: 'a', gold: 'b',
  coinage: 'a', paper: 'c', fiat: 'a', bitcoin: 'a',
  'through-time': 'a', 'between-people': 'b', measure: 'b', collectible: 'c',
  brick: 'a', palladium: 'a', 'real-estate': 'a', shares: 'a'
};

// Every size each glyph is rendered at in the shipping deck, measured from the
// call sites (EvolutionRail 48/22, contender mode ×1.3 → 62, StageLadder 40/36,
// 3.1 and 3.2 at 56, palladium 40, ComparisonAssetHeader 96/56, 4.06 carrier 76).
const DEPLOYED = {
  cattle: [62, 48], salt: [62, 48], shells: [76, 62, 48], iron: [62, 48],
  metals: [48], gold: [96, 56, 48], coinage: [22], paper: [22],
  fiat: [96, 56, 48], bitcoin: [96, 76, 56, 48, 36],
  'through-time': [56, 40], 'between-people': [56, 40], measure: [56, 40],
  collectible: [40], brick: [56], palladium: [40],
  'real-estate': [96, 56], shares: [96, 56]
};

const GROUPS = [
  ['The contenders — 2.4’s row and the rail’s first four stops', ['cattle', 'salt', 'shells', 'iron']],
  ['The rail’s remaining stops, risers and marks', ['metals', 'gold', 'coinage', 'paper', 'fiat', 'bitcoin']],
  ['The three functions — 3.1, and the ladder’s stages', ['through-time', 'between-people', 'measure', 'collectible']],
  ['Argentina, palladium, and the table’s two productive assets', ['brick', 'palladium', 'real-estate', 'shares']]
];

const svg = (body, size) =>
  `<svg viewBox="0 0 48 48" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${STROKE}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

const scales = (body, name) => DEPLOYED[name]
  .map((s) => `<span class="sc"><span class="sc__mark">${svg(body, s)}</span><span class="sc__n">${s}</span></span>`)
  .join('');

const cell = (name, letter, entry, shipping) => `
  <div class="cand${shipping ? ' cand--shipping' : ''}">
    <div class="cand__head">
      <span class="cand__tag">${shipping ? 'SHIPPING' : letter.toUpperCase()}</span>
      <span class="cand__title">${entry.title}</span>
    </div>
    <div class="cand__display">${svg(entry.body, 120)}</div>
    <div class="cand__scales">${scales(entry.body, name)}</div>
    <p class="cand__idea">${entry.idea.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</p>
  </div>`;

const row = (name) => {
  const ship = CANDIDATES[name][SHIPPING[name]];
  const props = R73_CANDIDATES[name];
  return `
  <section class="row" id="${name}">
    <h3>${name} <span class="row__scales">deployed at ${DEPLOYED[name].join(' · ')} px</span></h3>
    <div class="cands">
      ${cell(name, SHIPPING[name], ship, true)}
      ${['a', 'b', 'c'].map((l) => cell(name, l, props[l], false)).join('')}
    </div>
  </section>`;
};

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>WIM Icon Studio — R7.3 round</title>
<style>
  :root { color-scheme: dark; }
  body { margin: 0; padding: 40px 48px 64px; background: #000; color: #e9e4da;
    font: 14px/1.5 "Helvetica Neue", Arial, sans-serif; width: 2200px; }
  h1 { font-size: 24px; font-weight: 600; letter-spacing: 0.02em; margin: 0 0 8px; }
  .sub { color: #8d8d8d; margin: 0 0 8px; max-width: 1500px; font-size: 15px; }
  .rule { color: #f7931a; margin: 0 0 40px; max-width: 1500px; font-size: 15px; }
  h2 { font-size: 13px; letter-spacing: 0.22em; text-transform: uppercase;
    color: #8d8d8d; margin: 48px 0 14px; border-bottom: 1px solid #232323; padding-bottom: 10px; }
  h3 { font-size: 17px; font-weight: 600; letter-spacing: 0.04em; margin: 30px 0 12px; }
  .row__scales { font-size: 12px; font-weight: 400; letter-spacing: 0.08em; color: #6a6a6a; margin-left: 12px; }
  .cands { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .cand { border: 1px solid #1e1e1e; padding: 18px 18px 16px; border-radius: 3px; }
  .cand--shipping { border-color: #3a3020; background: #090705; }
  .cand__head { display: flex; align-items: baseline; gap: 10px; margin-bottom: 14px; }
  .cand__tag { font-size: 10px; letter-spacing: 0.2em; color: #f7931a; }
  .cand--shipping .cand__tag { color: #7d6a44; }
  .cand__title { font-size: 15px; font-weight: 600; }
  .cand__display { height: 130px; display: flex; align-items: center; justify-content: center; }
  .cand__scales { display: flex; align-items: flex-end; gap: 18px; height: 108px;
    border-top: 1px solid #191919; border-bottom: 1px solid #191919; padding: 12px 0 8px; }
  .sc { display: flex; flex-direction: column; align-items: center; gap: 5px; }
  .sc__mark { display: flex; align-items: flex-end; height: 100px; }
  .sc__n { font-size: 9px; color: #5c5c5c; letter-spacing: 0.1em; }
  .cand__idea { color: #9a9a9a; font-size: 12.5px; line-height: 1.5; margin: 12px 0 0; min-height: 76px; }
</style></head>
<body>
  <h1>Icon Studio — R7.3 round</h1>
  <p class="sub">Three new candidates for each of the eighteen deployed glyphs, beside the mark shipping today, at every scale each glyph is rendered at in the deck. Nothing here is applied: <code>assets/icons/candidates/candidates-r7-3.js</code> has no importer in <code>src/</code>.</p>
  <p class="rule">The bar: one memorable formal idea per mark — something describable in words after seeing it once — not a generic outline of the object.</p>
  ${GROUPS.map(([title, names], i) => `<div class="group" id="g${i}"><h2>${title}</h2>${names.map(row).join('')}</div>`).join('')}
</body></html>`;

const file = path.join(out, 'contact-sheet.html');
fs.writeFileSync(file, html);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 2200, height: 1400 } });
await page.goto('file://' + file.replace(/\\/g, '/'));
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(out, 'contact-sheet.png'), fullPage: true });

// A per-group sheet too: the whole page is tall, and a group is what a reader
// can actually hold in one look. Element captures rather than clips — a clip on
// a page this tall lands outside the viewport and fails.
const SLUGS = ['contenders', 'rail-stops', 'functions-and-stages', 'brick-palladium-table'];
for (let i = 0; i < GROUPS.length; i += 1) {
  await page.locator(`#g${i}`).screenshot({ path: path.join(out, `group-${SLUGS[i]}.png`) });
}
await browser.close();
console.log(`R7.3 icon studio: ${Object.keys(R73_CANDIDATES).length} glyphs × 3 candidates → ${path.relative(process.cwd(), out)}`);
