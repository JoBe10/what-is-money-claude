// Batch E — the batch landed-state proof, in the spliced deck
// (docs/batch-e-implementation-brief.md §3).
//
// The batch's whole visual claim, made checkable once more and in the place
// that ships: EVERY SETTLED STATE OF ACT V IS ITS APPROVED CELL — all
// twenty-seven, at their real deck positions, after the splice.
//
// The Session 1 and Session 2 proofs ran in the scratch route, where the
// scenes stood alone behind the untouched deck. This one runs where the film
// runs: Scenes 24–30 mounted cold at their manifest positions in the 31-scene
// deck, entered by the engine's own deep link, compared per pixel against the
// archived cells (review/act-5/states — presenter-approved in full 4 Sep 2026)
// and against a fresh render of each cell through its own states pipeline.
//
// Three comparisons per state, because they answer three different questions:
//   scene vs archived cell   — the claim: what ships is what he approved.
//   fresh cell vs archived   — the pipeline is unchanged since the cell was
//                              rendered (a control on the other two).
//   scene vs fresh cell      — the scene reproduces the builder exactly.
//
// EVERY SHOT IS TAKEN ON A FRESH PAGE — both passes. Act V draws the same five
// dark-field subjects at three box sizes, and the act-5-states session recorded
// that a subject painted at one box can resample from that cached raster when
// it is next painted at another; the archived cells were captured one per page
// for that reason, and a cold mount is what the deck performs on a direct
// entry anyway.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// Usage: node proof-batch-e.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-5', 'states');

// [scene id (its deep link, permanent), build, cell id] — the frozen beat map,
// S24 4 · S25 4 · S26 9 · S27 3 · S28 3 · S29 2 · S30 2 = 27.
const SCENES = [
  ['migration', 4, 's24'],
  ['the-monetary-premium', 4, 's25'],
  ['when-other-assets-do-moneys-job', 9, 's26'],
  ['the-marginal-decision', 3, 's27'],
  ['fixed-supply-reprices-at-the-margin', 3, 's28'],
  ['the-case-from-first-principles', 2, 's29'],
  ['the-close', 2, 's30']
];
const STATES = SCENES.flatMap(([sceneId, beats, prefix]) =>
  Array.from({ length: beats }, (_, b) => [sceneId, b, `${prefix}-b${b + 1}`]));

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

  // ---- pass 2 · the scenes cold at every build, at their deck positions -----
  const sceneShots = {};
  for (const [sceneId, build, id] of STATES) {
    let landed = false;
    for (let attempt = 1; attempt <= 3 && !landed; attempt += 1) {
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
      await page.goto(`${BASE}/?slide=${sceneId}`, { waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
      await ready();
      await settled();
      const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
      if (at.i === idx && at.b === build) {
        landed = true;
      } else if (attempt === 3) {
        throw new Error(`the deck landed at ${at.i}:${at.b}, expected ${idx}:${build} (${id})`);
      }
    }
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    sceneShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`deck   ${sceneId.padEnd(36)} b${build}  ${id}`);
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
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(12)} deck↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  deck↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-deck.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-batch-e.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-e',
    rule: 'each of the 27 settled states of Act V, mounted cold at its real deck position in the spliced 31-scene deck at 1920×1080, is its approved cell (review/act-5/states — presenter-approved in full 4 Sep 2026) at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell. Every shot on a fresh page, both passes.',
    states: results.length,
    passed: results.length - failures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failures}/${results.length} states proven in the spliced deck`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
