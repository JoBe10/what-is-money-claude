// Batch E implementation, Session 1 — the landed-state proof
// (docs/batch-e-implementation-brief.md §2).
//
// One claim, made checkable: EVERY SETTLED STATE OF SCENES 24–27 IS ITS
// APPROVED CELL. Twenty states — S24's four, S25's four, S26's nine, S27's
// three, the frozen beat map (master §13, 4 Sep 2026) — each mounted cold
// through the real engine in the scratch route (`?proto=act5`, where the
// scenes run in place until Session 2 splices them into the manifest) at
// 1920×1080 and compared per pixel against the archived cell PNG
// (review/act-5/states — the approved set, presenter-approved in full 4 Sep
// 2026), and against a fresh render of that cell through its own states
// pipeline.
//
// Three comparisons per state, because they answer three different questions:
//   scene vs archived cell   — the claim: what ships is what he approved.
//   fresh cell vs archived   — the pipeline is unchanged since the cell was
//                              rendered (a control on the other two).
//   scene vs fresh cell      — the scene reproduces the builder exactly.
//
// EVERY SHOT IS TAKEN ON A FRESH PAGE — both passes. This is the Act V
// discipline the states session recorded: Act V draws the same five dark-field
// subjects at three box sizes (the display box, Scene 27's compact box, and
// Scene 23's 100 band before them), and a subject painted at one box can
// resample from that cached raster when it is next painted at another. The
// archived cells were captured one per page for that reason; the proof
// compares against them the same way, which is also the cold mount the deck
// itself performs on a direct entry.
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
const CELLS = path.join(REPO, 'review', 'act-5', 'states');

// [proto slide (1-based within ?proto=act5), build, cell id]
const STATES = [
  ...[0, 1, 2, 3].map((b) => [1, b, `s24-b${b + 1}`]),
  ...[0, 1, 2, 3].map((b) => [2, b, `s25-b${b + 1}`]),
  ...[0, 1, 2, 3, 4, 5, 6, 7, 8].map((b) => [3, b, `s26-b${b + 1}`]),
  ...[0, 1, 2].map((b) => [4, b, `s27-b${b + 1}`])
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
      const a = window.__act5;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own pipeline -------
  // One cell per page — the cold mount (see the header).
  const cellShots = {};
  for (const [, , id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__states = await import('/review/act-5/harness/states.mjs');
    });
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(800);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${id}`);
  }

  // ---- pass 2 · the scenes cold at every build, through the real engine -----
  const sceneShots = {};
  for (const [slide, build, id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?proto=act5&slide=${slide}`, { waitUntil: 'networkidle' });
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
    session: 'act-5-impl-1',
    rule: 'each of the 20 settled states of Scenes 24–27, mounted cold through the real engine in the scratch route (?proto=act5) at 1920×1080, is its approved cell (review/act-5/states — presenter-approved in full 4 Sep 2026) at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell. Every shot on a fresh page, both passes — the Act V image-cache discipline the states session recorded.',
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
