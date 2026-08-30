// Batch A — the landed-state proof (docs/batch-a-implementation-brief.md §5).
//
// One claim, made checkable: EVERY SETTLED STATE OF THE FIVE NEW SCENES IS ITS
// PRESENTER-APPROVED CELL. Thirty-three states — P1's eleven beats plus its
// authored entry black, P2's two, and the closed gate's nineteen — each mounted
// cold in the real deck at 1920×1080 and compared per pixel against the
// archived cell PNG, and against a fresh render of that cell through its own
// states pipeline.
//
// Three comparisons per state, because they answer three different questions:
//   deck vs archived cell   — the claim: what ships is what he approved.
//   fresh cell vs archived  — the pipeline is unchanged since the cell was
//                             rendered (a control on the other two).
//   deck vs fresh cell      — the scene reproduces the builder exactly.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that is
// rasterizer noise on a black stage). ANY differing pixel fails.
//
// DETERMINISM. The hours field's per-unit brightness jitter is `Math.random`,
// unseeded, so two constructions of `UnitField` never paint the same texture —
// which is exactly why the approved Prologue cells ship as byte-copies rather
// than re-renders (prologue report §6.6). This harness holds that one variable
// still: an init script replaces `Math.random` with an LCG and re-seeds it on
// every canvas creation, so the field's texture is identical in the deck pass
// and the cell pass regardless of what either page consumed beforehand.
// Everything else in the frame is unaffected. The two field-bearing states
// therefore prove `deck vs fresh cell` at zero, and their delta against the
// ARCHIVED cell — rendered before this harness existed, from a different
// sampling — is reported honestly rather than hidden.
//
// Usage: node proof-batch-a.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const PROLOGUE_CELLS = path.join(REPO, 'review', 'prologue', 'states');
const GATE2_CELLS = path.join(REPO, 'review', 'gate-2', 'states');

// [1-based slide, build, cell id, cell source, cell directory]
const PROLOGUE = '/review/prologue/harness/states.mjs';
const GATE2 = '/review/gate-2/harness/states.mjs';

const STATES = [
  // P1 — the authored entry black plus eleven beats.
  [1, 0, 'p1-b0', PROLOGUE, PROLOGUE_CELLS],
  [1, 1, 'p1-b1', PROLOGUE, PROLOGUE_CELLS],
  [1, 2, 'p1-b2', PROLOGUE, PROLOGUE_CELLS],
  [1, 3, 'p1-b3', PROLOGUE, PROLOGUE_CELLS],
  [1, 4, 'p1-b4', PROLOGUE, PROLOGUE_CELLS],
  [1, 5, 'p1-b5', PROLOGUE, PROLOGUE_CELLS],
  [1, 6, 'p1-b6', PROLOGUE, PROLOGUE_CELLS],
  [1, 7, 'p1-b7-glow', PROLOGUE, PROLOGUE_CELLS],
  [1, 8, 'p1-b8-a', PROLOGUE, PROLOGUE_CELLS],
  [1, 9, 'p1-b9', PROLOGUE, PROLOGUE_CELLS],
  [1, 10, 'p1-b10', PROLOGUE, PROLOGUE_CELLS],
  [1, 11, 'p1-b11', PROLOGUE, PROLOGUE_CELLS],
  // P2 — the mercy line and its hold.
  [2, 0, 'p2-b1', PROLOGUE, PROLOGUE_CELLS],
  [2, 1, 'p2-b2', PROLOGUE, PROLOGUE_CELLS],
  // Scene 2.
  [3, 0, 's2-b1-a', GATE2, GATE2_CELLS],
  [3, 1, 's2-b2', GATE2, GATE2_CELLS],
  [3, 2, 's2-b3-p2', GATE2, GATE2_CELLS],
  [3, 3, 's2-b4-p2', GATE2, GATE2_CELLS],
  [3, 4, 's2-b5-b-p2', GATE2, GATE2_CELLS],
  // Scene 3.
  [4, 0, 's3-b1-p2', GATE2, GATE2_CELLS],
  [4, 1, 's3-b2', GATE2, GATE2_CELLS],
  [4, 2, 's3-b3', GATE2, GATE2_CELLS],
  [4, 3, 's3-b4-a', GATE2, GATE2_CELLS],
  [4, 4, 's3-b5-a', GATE2, GATE2_CELLS],
  [4, 5, 's3-b6-a', GATE2, GATE2_CELLS],
  [4, 6, 's3-b7-b', GATE2, GATE2_CELLS],
  [4, 7, 's3-b8-a', GATE2, GATE2_CELLS],
  [4, 8, 's3-b9-a', GATE2, GATE2_CELLS],
  // Scene 4.
  [5, 0, 's4-b1-b', GATE2, GATE2_CELLS],
  [5, 1, 's4-b2-b2', GATE2, GATE2_CELLS],
  [5, 2, 's4-b3-b', GATE2, GATE2_CELLS],
  [5, 3, 's4-b4-b', GATE2, GATE2_CELLS],
  [5, 4, 's4-b5-b', GATE2, GATE2_CELLS]
];

// The two states whose frame contains the hours field, and therefore the one
// unseeded variable in the register.
const FIELD_STATES = new Set(['p1-b1', 'p1-b2']);

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  // UnitField's brightness buckets and fill order are drawn immediately after
  // it creates its canvases. Re-seeding there makes the field's texture a
  // function of the component alone, not of whatever the page consumed first.
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
      const a = window.__act1;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };

  // ---- pass 1 · every cell, freshly rendered through its own pipeline -------
  const cellShots = {};
  for (const source of [PROLOGUE, GATE2]) {
    await freshPage();
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async (src) => { window.__states = await import(src); }, source);
    for (const [, , id, src] of STATES) {
      if (src !== source) continue;
      await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
      await ready();
      await page.waitForTimeout(800);
      cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      console.log(`cell   ${id}`);
    }
    await page.evaluate(() => window.__states.teardown());
  }

  // ---- pass 2 · the deck cold at every new-scene build ----------------------
  const deckShots = {};
  for (const [slide, build, id] of STATES) {
    await freshPage();
    await page.goto(`${BASE}/?slide=${slide}`, { waitUntil: 'networkidle' });
    // The engine re-persists its state after the 300ms crossfade; seeding the
    // build step before that lands would be overwritten. Wait for the mount.
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
      throw new Error(`deck landed at ${at.i + 1}:${at.b}, expected ${slide}:${build}`);
    }
    // The chrome fades over 400ms; wait for it to be gone rather than guessing.
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(150);
    deckShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`deck   ${String(slide)}:${String(build).padStart(2)}  ${id}`);
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
  let hardFailures = 0;
  for (const [slide, build, id, , dir] of STATES) {
    const archived = fs.readFileSync(path.join(dir, `${id}.png`));
    const isField = FIELD_STATES.has(id);
    const deckVsArchive = await diff(deckShots[id], archived);
    const cellVsArchive = await diff(cellShots[id], archived);
    const deckVsCell = await diff(deckShots[id], cellShots[id]);
    // The claim for every state is `deck vs fresh cell` at zero. For the 31
    // states whose pipeline is deterministic the archive is the same image and
    // both other comparisons are zero too; for the two field-bearing states the
    // archive carries its own unseeded sampling and is expected to differ.
    const pass = deckVsCell.diffPixels === 0 &&
      (isField || (deckVsArchive.diffPixels === 0 && cellVsArchive.diffPixels === 0));
    if (!pass) hardFailures += 1;
    results.push({
      state: `${slide}:${build}`, cell: id, fieldBearing: isField,
      deckVsArchive, cellVsArchive, deckVsCell, pass
    });
    const mark = pass ? (isField ? 'MATCH*' : 'MATCH ') : 'FAIL  ';
    console.log(`${mark} ${id.padEnd(12)} deck↔archive ${String(deckVsArchive.diffPixels).padStart(7)}` +
      `  cell↔archive ${String(cellVsArchive.diffPixels).padStart(7)}` +
      `  deck↔cell ${String(deckVsCell.diffPixels).padStart(7)}`);
    if (!pass) {
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-deck.png`), deckShots[id]);
      fs.writeFileSync(path.join(__dirname, `proof-fail-${id}-cell.png`), cellShots[id]);
    }
  }

  fs.writeFileSync(path.join(__dirname, '..', 'landed-proof.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: 'each of the 33 settled states of the five new scenes, mounted cold in the deck at 1920×1080, is its approved cell at zero differing pixels (channel delta > 2/255 counts). Comparisons: deck↔archived cell, fresh cell↔archived cell, deck↔fresh cell.',
    determinism: 'Math.random is an LCG re-seeded at every canvas creation, so the hours field paints identically in both passes. The two field-bearing states (p1-b1, p1-b2) are proven against a same-seed fresh cell; their delta against the archived cell is the field\'s own unseeded sampling, reported not hidden (prologue report §6.6).',
    states: results.length,
    passed: results.length - hardFailures,
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - hardFailures}/${results.length} states proven`);
  console.log('* the two field-bearing states: proven against a same-seed cell render; see landed-proof.json');
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(hardFailures || errors.length ? 1 : 0);
})();
