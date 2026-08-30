// Batch A — the warm-path proof.
//
// The landed-state proof mounts every state COLD, through the engine's
// deep-link path. That is the strict test, but it is not the way the film is
// watched. This one walks the deck **from the top, forward, one advance at a
// time** — the presenter's own review protocol — and compares every settled
// frame to its approved cell.
//
// It exists because a real defect only showed on this path. The engine mounts
// the incoming slide before it calls the outgoing slide's `onExit`, so the
// scene leaving the stage was switching the deck canvas's layer hint back on
// underneath the scene that had just claimed it — and P2's text then rasterized
// differently from the cell it is supposed to be. Every cold entry passed
// while the forward walk did not. `components/rasterHint.js` refcounts the
// claim; this proof is what holds that.
//
// A differing pixel is one whose max channel delta exceeds 2/255. The two
// hours-field states carry the register's one unseeded variable and are held
// still the same way the landed-state proof holds it (an LCG re-seeded at every
// canvas creation), so they are compared against a same-seed cell render.
//
// Usage: node warm-path-proof.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const PROLOGUE = '/review/prologue/harness/states.mjs';
const GATE2 = '/review/gate-2/harness/states.mjs';
const DIRS = {
  [PROLOGUE]: path.join(REPO, 'review', 'prologue', 'states'),
  [GATE2]: path.join(REPO, 'review', 'gate-2', 'states')
};

// The 33 states, in walking order.
const WALK = [
  ...['p1-b0', 'p1-b1', 'p1-b2', 'p1-b3', 'p1-b4', 'p1-b5', 'p1-b6',
    'p1-b7-glow', 'p1-b8-a', 'p1-b9', 'p1-b10', 'p1-b11'].map((id) => [id, PROLOGUE]),
  ...['p2-b1', 'p2-b2'].map((id) => [id, PROLOGUE]),
  ...['s2-b1-a', 's2-b2', 's2-b3-p2', 's2-b4-p2', 's2-b5-b-p2'].map((id) => [id, GATE2]),
  ...['s3-b1-p2', 's3-b2', 's3-b3', 's3-b4-a', 's3-b5-a', 's3-b6-a', 's3-b7-b',
    's3-b8-a', 's3-b9-a'].map((id) => [id, GATE2]),
  ...['s4-b1-b', 's4-b2-b2', 's4-b3-b', 's4-b4-b', 's4-b5-b'].map((id) => [id, GATE2])
];
const FIELD_STATES = new Set(['p1-b1', 'p1-b2']);

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const create = Document.prototype.createElement;
  Document.prototype.createElement = function seeded(tag, ...rest) {
    if (String(tag).toLowerCase() === 'canvas') s = SEED >>> 0;
    return create.call(this, tag, ...rest);
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
  const ready = () => page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
  });
  // Settled: the engine is not mid-transition, Act I's timelines are done, no
  // CSS transition is running, and — the Prologue's own canvas gestures, which
  // are neither GSAP nor Web Animations — the fill has reached its count and
  // the collapse has taken the field out of the frame.
  const settled = () => page.waitForFunction(() => {
    if (window.__deck && window.__deck.transitioning) return false;
    const a = window.__act1;
    if (a && !a.settled()) return false;
    if (document.getAnimations()
      .filter((an) => an.playState === 'running' || an.playState === 'pending').length) return false;
    const root = document.querySelector('.deck-slide[data-active="true"] .s1q');
    if (root && root.classList.contains('p1')) {
      const step = Number(root.dataset.step || 0);
      const counter = root.querySelector('.s1q-hours__counter');
      if ((step === 1 || step === 2) && (!counter || counter.textContent !== '80,000')) return false;
      const canvas = root.querySelector('canvas');
      if (step >= 3 && canvas && canvas.parentElement.style.display !== 'none') return false;
    }
    return true;
  }, null, { timeout: 60000 });
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
  };

  // ---- pass 1 · the cells, freshly rendered ---------------------------------
  const cellShots = {};
  for (const source of [PROLOGUE, GATE2]) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async (src) => { window.__states = await import(src); }, source);
    for (const [id, src] of WALK) {
      if (src !== source) continue;
      await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
      await ready();
      await page.waitForTimeout(800);
      cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    }
    await page.evaluate(() => window.__states.teardown());
  }
  console.log(`cells rendered: ${Object.keys(cellShots).length}`);

  // ---- pass 2 · one continuous forward walk from the top --------------------
  await freshPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  await ready();
  await settled();
  await hideChrome();

  const deckShots = {};
  const landed = [];
  const hints = [];
  for (let i = 0; i < WALK.length; i += 1) {
    if (i > 0) {
      await page.evaluate(() => window.__deck.advance());
      await settled();
      await ready();
      await hideChrome();
    }
    const at = await page.evaluate(() => ({
      id: window.__deck.slides[window.__deck.index].id, b: window.__deck.buildStep,
      // The refcounted claim, read straight off the canvas: it must stay
      // released for the whole run of new scenes and be handed back after.
      hint: getComputedStyle(document.querySelector('.deck-canvas')).willChange
    }));
    landed.push(`${at.id}:${at.b}`);
    hints.push(at.hint);
    deckShots[WALK[i][0]] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`walk ${String(i).padStart(2)}  ${at.id}:${at.b}  → ${WALK[i][0]}`);
  }

  // ---- pass 3 · the comparisons --------------------------------------------
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
  for (let i = 0; i < WALK.length; i += 1) {
    const [id, src] = WALK[i];
    const isField = FIELD_STATES.has(id);
    const vsCell = await diff(deckShots[id], cellShots[id]);
    const archived = fs.readFileSync(path.join(DIRS[src], `${id}.png`));
    const vsArchive = isField ? null : await diff(deckShots[id], archived);
    const pass = vsCell.diffPixels === 0 && (isField || vsArchive.diffPixels === 0);
    if (!pass) failures += 1;
    results.push({ order: i, landedAt: landed[i], cell: id, fieldBearing: isField, vsCell, vsArchive, pass });
    console.log(`${pass ? (isField ? 'MATCH*' : 'MATCH ') : 'FAIL  '} ${id.padEnd(12)} ` +
      `walked↔cell ${String(vsCell.diffPixels).padStart(7)}` +
      (vsArchive ? `  walked↔archive ${String(vsArchive.diffPixels).padStart(7)}` : ''));
    if (!pass) fs.writeFileSync(path.join(__dirname, `warm-fail-${id}.png`), deckShots[id]);
  }

  // The hint must be released at every one of the 33 states, with no gap where
  // an outgoing scene handed it back under an incoming one.
  const hintHeld = hints.every((h) => h === 'auto');
  if (!hintHeld) failures += 1;
  console.log(`raster hint released across the walk: ${hintHeld ? 'yes, all 33' : `NO — ${hints.filter((h) => h !== 'auto').length} state(s) rasterized under the layer hint`}`);

  fs.writeFileSync(path.join(__dirname, '..', 'warm-path-proof.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: 'walked forward from the top of the deck, one advance at a time, every settled frame of the five new scenes is its approved cell at zero differing pixels, and the canvas layer hint stays released for the whole run',
    order: landed,
    rasterHint: { heldAcrossTheWalk: hintHeld, perState: hints },
    states: results.length,
    passed: results.length - failures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failures}/${results.length} states proven on the forward walk`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failures || errors.length ? 1 : 0);
})();
