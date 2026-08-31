// Batch B — the landed-state proof (docs/batch-b-implementation-brief.md §3).
//
// One claim, made checkable: EVERY SETTLED STATE OF ACT II IS ITS APPROVED
// CELL. Thirty-seven states — S5's eight, S6's nine, S7's five, S8's five,
// S9's five, S10's five — each mounted cold through the real engine at
// 1920×1080 and compared per pixel against the archived cell PNG, and against
// a fresh render of that cell through its own states pipeline.
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
// THE ROUTE IS RESOLVED BY SCENE ID, not by position, so the same harness
// proves the scenes in the scratch route before the splice and in the deck
// after it. `--route deck` (the default) runs the film; `--route act2` runs
// `?proto=act2`.
//
// Usage: node proof-batch-b.cjs [--port 5275] [--route deck|act2] [--only s8,s9]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5275');
const ROUTE = flag('--route', 'deck');
const ONLY = flag('--only', '');
const BASE = `http://127.0.0.1:${PORT}`;
// The engine accepts a slide id in `?slide=`, so a state is addressed by name
// on either route — and the query param is what lets the session-storage build
// step be honored on the reload (`_determineInitialState`: URL wins, storage
// supplies the build step when it matches).
const at = (sceneId) => (ROUTE === 'deck'
  ? `${BASE}/?slide=${sceneId}`
  : `${BASE}/?proto=act2&slide=${sceneId}`);
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-2', 'states');

// [scene id, build, cell id] — the approved set, in running order.
const SCENES = [
  ['the-function-stayed', 's5', 8],
  ['scarcity-in-matter', 's6', 9],
  ['claims-on-gold', 's7', 5],
  ['money-becomes-information', 's8', 5],
  ['scarcity-becomes-digital', 's9', 5],
  ['the-trade-off-keeps-moving', 's10', 5]
];
const STATES = SCENES.flatMap(([id, key, builds]) => {
  if (ONLY && !ONLY.split(',').includes(key)) return [];
  return Array.from({ length: builds }, (_, b) => [id, b, `${key}-b${b + 1}`]);
});

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
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own pipeline -------
  const cellShots = {};
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    window.__states = await import('/review/act-2/harness/states.mjs');
  });
  let n = 0;
  for (const [, , id] of STATES) {
    if (n > 0 && n % 8 === 0) {
      await freshPage();
      await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(async () => {
        window.__states = await import('/review/act-2/harness/states.mjs');
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
  for (const [sceneId, build, id] of STATES) {
    await freshPage();
    await page.goto(at(sceneId), { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    const idx = await page.evaluate((sid) => window.__deck.slides.findIndex((s) => s.id === sid), sceneId);
    if (idx < 0) throw new Error(`the route has no slide "${sceneId}"`);
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [idx, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await ready();
    await settled();
    const landed = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (landed.i !== idx || landed.b !== build) {
      throw new Error(`the route landed at ${landed.i}:${landed.b}, expected ${idx}:${build} (${id})`);
    }
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    sceneShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`scene  ${String(idx).padStart(2)}:${String(build).padStart(2)}  ${id}`);
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
    results.push({ scene: sceneId, build, cell: id, sceneVsArchive, cellVsArchive, sceneVsCell, pass });
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(12)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', `landed-proof-${ROUTE}.json`), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-b',
    route: ROUTE,
    rule: 'each settled state of Scenes 5–10, mounted cold through the real engine at 1920×1080, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
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
