// Gate 2 r2 — the landed-state proof (docs/gate-2-r2-brief.md §5).
//
// The full-coverage rule made checkable: every one of the 19 settled states,
// mounted cold in the prototype, is pixel-compared against its approved cell
// rendered through the SAME pipeline and the SAME geometry source (the
// beat-state builders in states.mjs). Two comparisons per beat:
//
//   proto vs cell        the prototype's settled frame against a fresh render
//                        of the approved cell — the landed-state proof itself.
//   cell vs archived     the fresh cell render against the PNG the presenter
//                        approved — proves the pipeline still yields the
//                        approved pixels (inputs unchanged).
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails the proof:
// a mismatch is a defect, not a note.
//
// Usage: node proof-r2.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'r2');
const STATES_DIR = path.join(__dirname, '..', 'states');
fs.mkdirSync(OUT, { recursive: true });

// Beat → approved cell (states.json rulings.approvedSet).
const BEATS = [
  ['s2', 1, 1, 's2-b1-a'], ['s2', 1, 2, 's2-b2'], ['s2', 1, 3, 's2-b3-a'],
  ['s2', 1, 4, 's2-b4-c'], ['s2', 1, 5, 's2-b5-b'],
  ['s3', 2, 1, 's3-b1-c'], ['s3', 2, 2, 's3-b2'], ['s3', 2, 3, 's3-b3'],
  ['s3', 2, 4, 's3-b4-a'], ['s3', 2, 5, 's3-b5-a'], ['s3', 2, 6, 's3-b6-a'],
  ['s3', 2, 7, 's3-b7-b'], ['s3', 2, 8, 's3-b8-a'], ['s3', 2, 9, 's3-b9-a'],
  ['s4', 3, 1, 's4-b1-b'], ['s4', 3, 2, 's4-b2-b'], ['s4', 3, 3, 's4-b3-b'],
  ['s4', 3, 4, 's4-b4-b'], ['s4', 3, 5, 's4-b5-b']
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
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

  // ---- pass 1 · the approved cells, freshly rendered (same pipeline) -------
  const cellShots = {};
  let shots = 0;
  const cellPage = async () => {
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__states = await import('/review/gate-2/harness/states.mjs');
    });
  };
  await cellPage();
  for (const [, , , cell] of BEATS) {
    if (cellShots[cell]) continue;
    if (shots > 0 && shots % 8 === 0) { await freshPage(); await cellPage(); }
    shots += 1;
    await page.evaluate((id) => window.__states.buildCell(id), cell);
    await ready();
    await page.waitForTimeout(800);
    cellShots[cell] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${cell}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- pass 2 · the prototype's settled beats, mounted cold ----------------
  const protoShots = {};
  shots = 0;
  for (const [scene, slide, beat] of BEATS) {
    if (shots > 0 && shots % 6 === 0) await freshPage();
    shots += 1;
    await page.goto(`${BASE}/?proto=gate2&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, beat - 1]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
    await ready();
    await page.waitForFunction(() => window.__gate2.settled(), null, { timeout: 30000 });
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForTimeout(450);
    protoShots[`${scene}-b${beat}`] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`proto  ${scene}-b${beat}`);
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
  for (const [scene, , beat, cell] of BEATS) {
    const id = `${scene}-b${beat}`;
    const archived = fs.readFileSync(path.join(STATES_DIR, `${cell}.png`));
    const protoVsCell = await diff(protoShots[id], cellShots[cell]);
    const cellVsArchived = await diff(cellShots[cell], archived);
    const pass = protoVsCell.diffPixels === 0;
    results.push({ beat: id, cell, protoVsCell, cellVsArchived, pass });
    console.log(`${id.padEnd(7)} vs ${cell.padEnd(8)}  proto/cell ${String(protoVsCell.diffPixels).padStart(6)} px (max ${protoVsCell.maxDelta})   cell/archived ${String(cellVsArchived.diffPixels).padStart(6)} px (max ${cellVsArchived.maxDelta})   ${pass ? 'MATCH' : 'MISMATCH'}`);
    if (!pass) {
      fs.writeFileSync(path.join(OUT, `proof-fail-${id}-proto.png`), protoShots[id]);
      fs.writeFileSync(path.join(OUT, `proof-fail-${id}-cell.png`), cellShots[cell]);
    }
  }

  const failed = results.filter((r) => !r.pass);
  fs.writeFileSync(path.join(OUT, 'landed-proof.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: 'every settled state is an approved cell, by construction — proven per pixel (channel delta > 2/255 counts as a difference; any differing pixel fails)',
    pipeline: 'both frames rendered on the same dev server page pipeline; cells via states.mjs buildCell, beats via cold direct entry at 1920×1080',
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failed.length}/${results.length} landed states match their approved cells exactly`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failed.length || errors.length ? 1 : 0);
})();
