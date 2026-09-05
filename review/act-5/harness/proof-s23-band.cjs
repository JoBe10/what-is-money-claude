// Act V states — the landed-state proof on Scene 23 after the fit ruling (the
// presenter's Part A ruling of 4 September 2026, master §13: the score rows
// return to the legacy 60 px pitch and the header band shrinks to a 100 box;
// "re-render and re-prove that cell").
//
// One claim, made checkable IN THE DECK: every settled state of Scene 23 —
// the four candidate states that were not re-rendered (b1–b4) and the two
// table states that were (b5 · b6) — mounted cold through the real engine at
// its deck position in the spliced 32-slide deck, IS ITS APPROVED CELL. Six
// states, three comparisons each (scene↔archived cell, fresh cell↔archived,
// scene↔fresh cell), zero differing pixels (channel delta > 2/255 counts).
// The cells build through review/act-4/harness/states.mjs — the Act IV
// sheet's own record. b1–b4 prove the ruling moved nothing settled around the
// table; b5 and b6 prove the re-rendered cells are what the deck lands.
//
// The form is review/acts-3-4-final/harness/proof-acts-3-4-final.cjs,
// restricted to the six Scene 23 states — with one change, found and
// recorded at this session: EVERY FRESH CELL IS BUILT ON A FRESH PAGE. Built
// six-in-a-row on one page, s23-b5 and s23-b6 differed from the archive by
// 8,289 pixels inside the band alone (max channel delta 71) at every delay
// from 400 ms to 5 s, while the same cells built alone matched at zero at
// every delay, and the deck's cold mount matched the archive at zero. The
// cause is the browser's image cache: after the lineup draws the five
// subjects at the 180 × 150 display box (b1–b4), the band's draw of the same
// subjects at the 100 box in the same page resamples from that cached raster
// and lands a few levels off. A fresh page per cell is the cold mount the
// deck itself performs, so it is the honest form of the comparison; the
// archive was captured that way (the Act IV capture's --only run), and so is
// every Act V cell.
//
// Usage: node proof-s23-band.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');

const BUILDER = '/review/act-4/harness/states.mjs';
const ARCHIVE = 'review/act-4/states';
// [scene id, build, cell id]
const STATES = [
  ['the-comparison', 0, 's23-b1'],
  ['the-comparison', 1, 's23-b2'],
  ['the-comparison', 2, 's23-b3'],
  ['the-comparison', 3, 's23-b4'],
  ['the-comparison', 4, 's23-b5'],
  ['the-comparison', 5, 's23-b6']
];

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.addInitScript(SEED_SCRIPT);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };
  await freshPage();

  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      for (const key of ['__act3', '__act4']) {
        const a = window[key];
        if (a && a.settled && !a.settled()) return false;
      }
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through the Act IV sheet's
  // pipeline — each on a fresh page (the cold mount; see the header).
  const cellShots = {};
  for (const [, , id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async (m) => { window.__states = await import(m); }, BUILDER);
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(800);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    await page.evaluate(() => window.__states.teardown());
    console.log(`cell   ${id}`);
  }

  // ---- pass 2 · the scene cold at every build, at its deck position ---------
  const sceneShots = {};
  for (const [sceneId, build, id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });
    const idx = await page.evaluate((sid) => window.__deck.slides.findIndex((s) => s.id === sid), sceneId);
    if (idx < 0) throw new Error(`${sceneId} is not in the deck`);
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await ready();
    await settled();
    const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (at.i !== idx || at.b !== build) throw new Error(`the deck landed at ${at.i}:${at.b}, expected ${idx}:${build}`);
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    sceneShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`deck   ${sceneId}:${build}  ${id}`);
  }

  // ---- pass 3 · the pixel comparisons --------------------------------------
  await freshPage();
  await page.goto('about:blank');
  const diff = (bufA, bufB) => page.evaluate(async ([a, b]) => {
    const load = (src) => new Promise((res, rej) => {
      const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src;
    });
    const [ia, ib] = await Promise.all([load(a), load(b)]);
    const c = document.createElement('canvas'); c.width = 1920; c.height = 1080;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(ia, 0, 0);
    const da = ctx.getImageData(0, 0, 1920, 1080).data;
    ctx.clearRect(0, 0, 1920, 1080);
    ctx.drawImage(ib, 0, 0);
    const db = ctx.getImageData(0, 0, 1920, 1080).data;
    let diffPixels = 0; let maxDelta = 0;
    for (let p = 0; p < da.length; p += 4) {
      const d = Math.max(Math.abs(da[p] - db[p]), Math.abs(da[p + 1] - db[p + 1]), Math.abs(da[p + 2] - db[p + 2]));
      if (d > maxDelta) maxDelta = d;
      if (d > 2) diffPixels += 1;
    }
    return { diffPixels, maxDelta };
  }, [`data:image/png;base64,${bufA.toString('base64')}`, `data:image/png;base64,${bufB.toString('base64')}`]);

  const results = [];
  let failures = 0;
  for (const [sceneId, build, id] of STATES) {
    const archived = fs.readFileSync(path.join(REPO, ARCHIVE, `${id}.png`));
    const sceneVsArchive = await diff(sceneShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const sceneVsCell = await diff(sceneShots[id], cellShots[id]);
    const pass = sceneVsCell.diffPixels === 0 && sceneVsArchive.diffPixels === 0 && cellVsArchive.diffPixels === 0;
    if (!pass) failures += 1;
    results.push({ state: `${sceneId}:${build}`, cell: id, reRendered: build >= 4, sceneVsArchive, cellVsArchive, sceneVsCell, pass });
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(8)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  // The ruling's own numbers, measured in the deck at the table's last state.
  await freshPage();
  await page.goto(`${BASE}/?slide=the-comparison`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck && !window.__deck.transitioning, null, { timeout: 30000 });
  const idx = await page.evaluate(() => window.__deck.slides.findIndex((s) => s.id === 'the-comparison'));
  await page.evaluate(([i]) => { sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: 5 })); }, [idx]);
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  await ready();
  await settled();
  const geometry = await page.evaluate(() => {
    const box = (s) => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), bottom: Math.round(b.bottom), height: Math.round(b.height) }; };
    return {
      band: box('.s4-comparison__band'),
      bandRenders: [...document.querySelectorAll('.s4-comparison__band .df')].map((e) => { const b = e.getBoundingClientRect(); return { subject: e.dataset.subject, width: Math.round(b.width), height: Math.round(b.height), bottom: Math.round(b.bottom) }; }),
      table: box('.s4-comparison-table'),
      rowPitch: Math.round(document.querySelector('.s4-comparison-table__row').getBoundingClientRect().height),
      rows: document.querySelectorAll('.s4-comparison-table__row').length,
      finalLine: box('.s4-comparison__final')
    };
  });
  const geometryOk = geometry.rowPitch === 60 && geometry.rows === 10 && geometry.band.height === 100 &&
    geometry.bandRenders.length === 5 && geometry.bandRenders.every((r) => r.width <= 100 && r.height <= 100 && r.bottom === geometry.band.bottom) &&
    geometry.table.bottom < geometry.finalLine.top;
  console.log(`${geometryOk ? 'MATCH ' : 'FAIL  '} geometry  rows ${geometry.rows} × ${geometry.rowPitch}px · band ${geometry.band.height}px · table bottom ${geometry.table.bottom} < line ${geometry.finalLine.top}`);
  if (!geometryOk) failures += 1;

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-s23-band.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-5-states',
    ruling: 'the presenter’s fit ruling, 4 September 2026 (master §13): at Scene 23 the ten score rows return to the legacy 60 px pitch and the header band shrinks to a 100 × 100 contain box; s23-b5 and s23-b6 re-rendered and re-proven',
    rule: 'each of the six settled states of Scene 23 — b1–b4 not re-rendered, b5–b6 re-rendered under the ruling — mounted cold through the real engine at its deck position in the spliced 32-slide deck, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell. The ruling’s numbers are measured in the deck at the table’s last state.',
    states: results.length,
    passed: results.filter((r) => r.pass).length,
    results,
    geometry: { ...geometry, ok: geometryOk },
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.filter((r) => r.pass).length}/${results.length} states proven · geometry ${geometryOk ? 'ok' : 'FAILED'}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
