// Batch C implementation, Session 2 — the landed-state proof for Scenes 14–15
// (docs/batch-c-implementation-brief.md §2).
//
// One claim, made checkable: EVERY SETTLED STATE OF SCENES 14–15 IS ITS
// APPROVED CELL — S14 against s14-b1 … s14-b4 (s14-b1 the thrice-carried r1
// cell), S15 against the six candidate-A cells the presenter selected. Ten
// states, three comparisons each, zero differing pixels; the mechanics are
// proof-impl1-scenes.cjs unchanged.
//
// Usage: node proof-impl2-scenes.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-3', 'states');

// [proto slide (1-based within ?proto=act3), build, cell id]
const STATES = [
  [4, 0, 's14-b1'], [4, 1, 's14-b2'], [4, 2, 's14-b3'], [4, 3, 's14-b4'],
  [5, 0, 's15-b1-a'], [5, 1, 's15-b2-a'], [5, 2, 's15-b3-a'],
  [5, 3, 's15-b4-a'], [5, 4, 's15-b5-a'], [5, 5, 's15-b6-a']
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
      const a = window.__act3;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own pipeline -------
  const cellShots = {};
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    window.__states = await import('/review/act-3/harness/states.mjs');
  });
  let n = 0;
  for (const [, , id] of STATES) {
    if (n > 0 && n % 8 === 0) {
      await freshPage();
      await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(async () => {
        window.__states = await import('/review/act-3/harness/states.mjs');
      });
    }
    n += 1;
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(800);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${id}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- pass 2 · the scenes cold at every build, through the real engine -----
  const sceneShots = {};
  for (const [slide, build, id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?proto=act3&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await ready();
    await settled();
    const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (at.i !== slide - 1 || at.b !== build) {
      throw new Error(`the route landed at ${at.i + 1}:${at.b}, expected ${slide}:${build}`);
    }
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    sceneShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`scene  ${String(slide)}:${String(build).padStart(2)}  ${id}`);
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
  for (const [slide, build, id] of STATES) {
    const archived = fs.readFileSync(path.join(CELLS, `${id}.png`));
    const sceneVsArchive = await diff(sceneShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const sceneVsCell = await diff(sceneShots[id], cellShots[id]);
    const pass = sceneVsCell.diffPixels === 0 &&
      sceneVsArchive.diffPixels === 0 && cellVsArchive.diffPixels === 0;
    if (!pass) failures += 1;
    results.push({ state: `${slide}:${build}`, cell: id, sceneVsArchive, cellVsArchive, sceneVsCell, pass });
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(12)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-impl2.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-c-impl-2',
    rule: 'each of the 10 settled states of Scenes 14–15, mounted cold through the real engine in the scratch route (?proto=act3) at 1920×1080, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
    states: results.length,
    passed: results.length - failures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failures}/${results.length} states proven`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
