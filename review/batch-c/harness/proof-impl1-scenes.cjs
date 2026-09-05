// Batch C implementation, Session 1 — the landed-state proof
// (docs/batch-c-implementation-brief.md §2).
//
// One claim, made checkable: EVERY SETTLED STATE OF SCENES 11–13 IS ITS
// APPROVED CELL. Fifteen states — S11's five, S12's four, S13's six — each
// mounted cold through the real engine in the scratch route (`?proto=act3`,
// where the scenes run in place until Session 2 splices them into the
// manifest) at 1920×1080 and compared per pixel against the archived cell
// PNG, and against a fresh render of that cell through its own states
// pipeline.
//
// Three comparisons per state, because they answer three different questions:
//   scene vs archived cell   — the claim: what ships is what he approved.
//   fresh cell vs archived   — the pipeline is unchanged since the cell was
//                              rendered (a control on the other two).
//   scene vs fresh cell      — the scene reproduces the builder exactly.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// Usage: node proof-impl1-scenes.cjs [--port 5273]
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
  [1, 0, 's11-b1'], [1, 1, 's11-b2'], [1, 2, 's11-b3'], [1, 3, 's11-b4'], [1, 4, 's11-b5'],
  [2, 0, 's12-b1'], [2, 1, 's12-b2'], [2, 2, 's12-b3'], [2, 3, 's12-b4'],
  [3, 0, 's13-b1'], [3, 1, 's13-b2'], [3, 2, 's13-b3'], [3, 3, 's13-b4'],
  [3, 4, 's13-b5'], [3, 5, 's13-b6']
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

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-impl1.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-c-impl-1',
    rule: 'each of the 15 settled states of Scenes 11–13, mounted cold through the real engine in the scratch route (?proto=act3) at 1920×1080, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
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
