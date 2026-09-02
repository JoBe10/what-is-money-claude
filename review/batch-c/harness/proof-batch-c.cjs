// Batch C — the batch landed-state proof (the implementation brief §3).
//
// One claim, made checkable across the whole act IN THE DECK: EVERY SETTLED
// STATE OF SCENES 11–15, mounted cold through the real engine at its deck
// position (`?slide=<id>` — the engine's own deep link — plus the restored
// build step), IS ITS APPROVED CELL. Twenty-five states, three comparisons
// each (scene↔archived cell, fresh cell↔archived, scene↔fresh cell), zero
// differing pixels (channel delta > 2/255 counts), through the spliced
// 39-slide deck rather than the scratch route.
//
// Usage: node proof-batch-c.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-3', 'states');

// [scene id, build, cell id]
const STATES = [
  ['three-familiar-jobs', 0, 's11-b1'], ['three-familiar-jobs', 1, 's11-b2'],
  ['three-familiar-jobs', 2, 's11-b3'], ['three-familiar-jobs', 3, 's11-b4'],
  ['three-familiar-jobs', 4, 's11-b5'],
  ['we-already-split-those-jobs', 0, 's12-b1'], ['we-already-split-those-jobs', 1, 's12-b2'],
  ['we-already-split-those-jobs', 2, 's12-b3'], ['we-already-split-those-jobs', 3, 's12-b4'],
  ['the-order-of-monetization', 0, 's13-b1'], ['the-order-of-monetization', 1, 's13-b2'],
  ['the-order-of-monetization', 2, 's13-b3'], ['the-order-of-monetization', 3, 's13-b4'],
  ['the-order-of-monetization', 4, 's13-b5'], ['the-order-of-monetization', 5, 's13-b6'],
  ['the-coffee-objection', 0, 's14-b1'], ['the-coffee-objection', 1, 's14-b2'],
  ['the-coffee-objection', 2, 's14-b3'], ['the-coffee-objection', 3, 's14-b4'],
  ['the-tower', 0, 's15-b1-a'], ['the-tower', 1, 's15-b2-a'], ['the-tower', 2, 's15-b3-a'],
  ['the-tower', 3, 's15-b4-a'], ['the-tower', 4, 's15-b5-a'], ['the-tower', 5, 's15-b6-a']
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

  // ---- pass 2 · the scenes cold at every build, at their deck positions -----
  const sceneShots = {};
  for (const [sceneId, build, id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    const idx = await page.evaluate((sid) =>
      window.__deck.slides.findIndex((s) => s.id === sid), sceneId);
    if (idx < 0) throw new Error(`${sceneId} is not in the deck`);
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await ready();
    await settled();
    const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (at.i !== idx || at.b !== build) {
      throw new Error(`the deck landed at ${at.i}:${at.b}, expected ${idx}:${build}`);
    }
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
    const archived = fs.readFileSync(path.join(CELLS, `${id}.png`));
    const sceneVsArchive = await diff(sceneShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const sceneVsCell = await diff(sceneShots[id], cellShots[id]);
    const pass = sceneVsCell.diffPixels === 0 &&
      sceneVsArchive.diffPixels === 0 && cellVsArchive.diffPixels === 0;
    if (!pass) failures += 1;
    results.push({ state: `${sceneId}:${build}`, cell: id, sceneVsArchive, cellVsArchive, sceneVsCell, pass });
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(12)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-batch-c.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-c',
    rule: 'each of the 25 settled states of Scenes 11–15, mounted cold through the real engine at its deck position in the spliced 39-slide deck, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
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
