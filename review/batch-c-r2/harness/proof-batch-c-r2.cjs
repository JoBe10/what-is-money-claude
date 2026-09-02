// Batch C r2 — the landed-state proof on the rewired scenes (the r2 brief §4).
//
// One claim, made checkable IN THE DECK: every settled state of the scenes
// the five rulings rewired — Scene 12 (the clean handoff, the objects),
// Scene 13 (the seven-beat split), Scene 14 (the fold), and Scene 9's
// affected beat (b1, whose settled state the forms-once fix must not move) —
// mounted cold through the real engine at its deck position, IS ITS APPROVED
// CELL. Sixteen states, three comparisons each (scene↔archived cell, fresh
// cell↔archived, scene↔fresh cell), zero differing pixels (channel delta >
// 2/255 counts), through the spliced 39-slide deck.
//
// The act-3 cells build through review/act-3/harness/states.mjs (the r2
// record); s9-b1 builds through review/act-2/harness/rail.mjs (its approved
// cell is untouched by this session — proving it here proves the gesture fix
// changed nothing settled).
//
// Usage: node proof-batch-c-r2.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS3 = path.join(REPO, 'review', 'act-3', 'states');
const CELLS2 = path.join(REPO, 'review', 'act-2', 'rail');

// [scene id, build, cell id, builder module]
const ACT3 = '/review/act-3/harness/states.mjs';
const ACT2 = '/review/act-2/harness/rail.mjs';
const STATES = [
  ['scarcity-becomes-digital', 0, 's9-b1', ACT2],
  ['we-already-split-those-jobs', 0, 's12-b1', ACT3],
  ['we-already-split-those-jobs', 1, 's12-b2', ACT3],
  ['we-already-split-those-jobs', 2, 's12-b3', ACT3],
  ['we-already-split-those-jobs', 3, 's12-b4', ACT3],
  ['the-order-of-monetization', 0, 's13-b1', ACT3],
  ['the-order-of-monetization', 1, 's13-b2', ACT3],
  ['the-order-of-monetization', 2, 's13-b3', ACT3],
  ['the-order-of-monetization', 3, 's13-b4', ACT3],
  ['the-order-of-monetization', 4, 's13-b5', ACT3],
  ['the-order-of-monetization', 5, 's13-b6', ACT3],
  ['the-order-of-monetization', 6, 's13-b7', ACT3],
  ['the-coffee-objection', 0, 's14-b1', ACT3],
  ['the-coffee-objection', 1, 's14-b2', ACT3],
  ['the-coffee-objection', 2, 's14-b3', ACT3],
  ['the-coffee-objection', 3, 's14-b4', ACT3]
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
      const a3 = window.__act3;
      if (a3 && !a3.settled()) return false;
      const a2 = window.__act2;
      if (a2 && !a2.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own pipeline -------
  const cellShots = {};
  const loadBuilder = async (mod) => {
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async (m) => {
      window.__states = await import(m);
    }, mod);
  };
  let loaded = null;
  let n = 0;
  for (const [, , id, mod] of STATES) {
    if (loaded !== mod || (n > 0 && n % 8 === 0)) {
      await freshPage();
      await loadBuilder(mod);
      loaded = mod;
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
  for (const [sceneId, build, id, mod] of STATES) {
    const archived = fs.readFileSync(path.join(mod === ACT2 ? CELLS2 : CELLS3, `${id}.png`));
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

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-batch-c-r2.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-c-r2',
    rule: 'each of the 16 settled states the five r2 rulings touch — S12 b1–b4, S13 b1–b7, S14 b1–b4, and S9 b1 — mounted cold through the real engine at its deck position in the spliced 39-slide deck, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell. s9-b1 and s13-b7 prove the fix and the renumbering moved nothing settled.',
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
