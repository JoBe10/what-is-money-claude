// Act II rail implementation, Session 1 — the landed-state proof
// (docs/act-2-rail-impl-brief.md §2).
//
// One claim, made checkable: EVERY SETTLED STATE OF SCENES 5–7 IS ITS APPROVED
// r2 CELL. Eighteen states, each mounted cold through the real engine in the
// deck (Act II is spliced at slides 6–11) at 1920×1080 and compared per pixel
// against the archived cell PNG, and against a fresh render of that cell
// through its own builder.
//
// THREE COMPARISONS PER STATE, because they answer three different questions:
//   scene vs archived cell   — the claim: what ships is what he approved.
//   fresh cell vs archived   — the sheet is still what its builders draw (a
//                              control on the other two). This is the one that
//                              caught the capture's page-reuse artifact in
//                              s7-b1, s7-b2 and s7-b3, and it is the reason
//                              the control exists at all.
//   scene vs fresh cell      — the scene reproduces the builder exactly.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// WHAT IS NOT HERE, and why. Scene 6's beats 3–7 are the elimination's
// interior: the sheet CARRIES those five cells byte-identical from the states
// sheet, so the approved cell is the overlay's own content WITHOUT the rail
// beneath it, while the deck holds the rail there at the legacy's deep dim.
// They cannot be compared pixel to pixel against a cell that does not contain
// them; their content is the legacy `ElementGrid`'s own waves, untouched, and
// the eleven-question scene test at Session 2 is where they are judged.
//
// The eighteenth state is not a build: Scene 6 carries `s6-b9-return` one
// state past its last beat — the rail returned with gold's dependency note,
// which Scene 7's morph launches from — so the harness applies it by name
// through the stage's one affordance.
//
// Usage: node proof-rail-impl1.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-2', 'rail');

// [deck slide index (0-based), build, cell id, applyAs?]
// Act II sits at deck indices 5–10: Scene 5 = 5, Scene 6 = 6, Scene 7 = 7.
const STATES = [
  [5, 0, 's5-b1'], [5, 1, 's5-b2'], [5, 2, 's5-b3'], [5, 3, 's5-b4'],
  [5, 4, 's5-b5'], [5, 5, 's5-b6'], [5, 6, 's5-b7'], [5, 7, 's5-b8'],
  [6, 0, 's6-b1'], [6, 1, 's6-b2'], [6, 7, 's6-b8'], [6, 8, 's6-b9'],
  [6, 8, 's6-b9-return', ['scarcity-in-matter', 9]],
  [7, 0, 's7-b1'], [7, 1, 's7-b2'], [7, 2, 's7-b3'], [7, 3, 's7-b4'], [7, 4, 's7-b5']
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

  // ---- pass 1 · every cell, freshly rendered through its own builder --------
  //
  // One page per cell, for the reason the capture now uses one page per cell:
  // a reused page does not always rasterize the same image the same way.
  const cellShots = {};
  const ids = [...new Set(STATES.map(([, , id]) => id))];
  for (const id of ids) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__rail = await import('/review/act-2/harness/rail.mjs');
    });
    await page.evaluate((cellId) => window.__rail.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(400);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${id}`);
  }

  // ---- pass 2 · the scenes cold at every state, through the real engine -----
  const sceneShots = {};
  for (const [slide, build, id, applyAs] of STATES) {
    await freshPage();
    // The engine reads the URL first and sessionStorage second, taking the
    // build step from storage only when the two name the same slide.
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide, build]);
    await page.goto(`${BASE}/?slide=${slide + 1}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    const at = await page.evaluate(() => ({ i: window.__deck.index, b: window.__deck.buildStep }));
    if (at.i !== slide || at.b !== build) {
      throw new Error(`the route landed at ${at.i}:${at.b}, expected ${slide}:${build}`);
    }
    if (applyAs) {
      await page.evaluate(([s, b]) => window.__act2.apply(s, b), applyAs);
    }
    await ready();
    await settled();
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
  for (const [slide, build, id, applyAs] of STATES) {
    const archived = fs.readFileSync(path.join(CELLS, `${id}.png`));
    const sceneVsArchive = await diff(sceneShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const sceneVsCell = await diff(sceneShots[id], cellShots[id]);
    const pass = sceneVsCell.diffPixels === 0 &&
      sceneVsArchive.diffPixels === 0 && cellVsArchive.diffPixels === 0;
    if (!pass) failures += 1;
    results.push({
      state: applyAs ? `${slide}:${build} → ${applyAs.join(':')}` : `${slide}:${build}`,
      cell: id, sceneVsArchive, cellVsArchive, sceneVsCell, pass
    });
    console.log(`${pass ? 'MATCH ' : 'FAIL  '} ${id.padEnd(14)} scene↔archive ${String(sceneVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  scene↔cell ${String(sceneVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-scene.png`), sceneShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.mkdirSync(path.join(__dirname, '..'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof-rail-impl1.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-rail-impl-1',
    authority: 'review/act-2/rail/states.json — approval, approvedSet (presenter-approved in full, 1 September 2026)',
    rule: 'each of the 18 settled rail states of Scenes 5–7, mounted cold through the real engine in the deck at 1920×1080, is its approved r2 cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: scene↔archived cell, fresh cell↔archived cell, scene↔fresh cell.',
    notCovered: 'S6 beats 3–7 — the elimination interiors the sheet carries byte-identical from the states sheet, which show the overlay without the rail the deck holds beneath it. Their content is the legacy ElementGrid\'s own waves, untouched.',
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
