// Gate 2 r3 — the landed-state proof (docs/gate-2-r3-brief.md §4–§5).
//
// Two claims, made checkable:
//
//   1. EVERYTHING ELSE CHANGES ZERO PIXELS. Every non-target beat — all 15
//      beats outside the four reopened sites — mounted cold under EVERY path
//      candidate (?path=1|2|3) is pixel-compared against r2's approved render
//      of the same beat (review/gate-2/r2/<beat>.png, itself proven equal to
//      the approved cell at r2). Any differing pixel fails.
//   2. THE CONTAINED SPEND STATE IS THE MARKUP CELL. The prototype's settled
//      S4 b2 (under every path — Scene 4 must not see the path selection) is
//      pixel-compared against a fresh same-pipeline render of s4-b2-b2, and
//      that fresh render against the archived s4-b2-b2.png.
//
// The three reopened path-element sites (S2 b3, S2 b4, S3 b1) have no
// approved cells — they are the r3 candidates, judged live — so they are
// captured (capture-r3.cjs), not pixel-proven.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// Usage: node proof-r3.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'r3');
const R2_DIR = path.join(__dirname, '..', 'r2');
const STATES_DIR = path.join(__dirname, '..', 'states');
fs.mkdirSync(OUT, { recursive: true });

// The 15 non-target beats: [scene, 1-based slide, beat] — everything except
// the reopened S2 b3, S2 b4, S3 b1 and S4 b2.
const NON_TARGET = [
  ['s2', 1, 1], ['s2', 1, 2], ['s2', 1, 5],
  ['s3', 2, 2], ['s3', 2, 3], ['s3', 2, 4], ['s3', 2, 5], ['s3', 2, 6],
  ['s3', 2, 7], ['s3', 2, 8], ['s3', 2, 9],
  ['s4', 3, 1], ['s4', 3, 3], ['s4', 3, 4], ['s4', 3, 5]
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

  // ---- pass 1 · the markup cell, freshly rendered (same pipeline) ----------
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    window.__states = await import('/review/gate-2/harness/states.mjs');
  });
  await page.evaluate((id) => window.__states.buildCell(id), 's4-b2-b2');
  await ready();
  await page.waitForTimeout(800);
  const cellShot = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
  await page.evaluate(() => window.__states.teardown());
  console.log('cell   s4-b2-b2');

  // ---- pass 2 · every non-target beat + s4-b2, cold, per path --------------
  const protoShots = {};   // `${path}:${scene}-b${beat}` -> buffer
  let shots = 0;
  for (const p of [1, 2, 3]) {
    for (const [scene, slide, beat] of [...NON_TARGET, ['s4', 3, 2]]) {
      if (shots > 0 && shots % 6 === 0) await freshPage();
      shots += 1;
      await page.goto(`${BASE}/?proto=gate2&path=${p}&slide=${slide}`, { waitUntil: 'networkidle' });
      await page.evaluate(([i, b]) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
      }, [slide - 1, beat - 1]);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
      await ready();
      await page.waitForFunction(() => window.__gate2.settled(), null, { timeout: 30000 });
      await page.evaluate(() => window.__deck._hideChrome());
      await page.waitForTimeout(450);
      protoShots[`${p}:${scene}-b${beat}`] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      console.log(`proto  path=${p} ${scene}-b${beat}`);
    }
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
  // 1 · non-target beats vs r2's approved renders, per path.
  for (const p of [1, 2, 3]) {
    for (const [scene, , beat] of NON_TARGET) {
      const id = `${scene}-b${beat}`;
      const r2 = fs.readFileSync(path.join(R2_DIR, `${id}.png`));
      const d = await diff(protoShots[`${p}:${id}`], r2);
      const pass = d.diffPixels === 0;
      results.push({ path: p, beat: id, against: `r2/${id}.png`, ...d, pass });
      console.log(`path=${p} ${id.padEnd(7)} vs r2 approved  ${String(d.diffPixels).padStart(6)} px (max ${d.maxDelta})  ${pass ? 'MATCH' : 'MISMATCH'}`);
      if (!pass) {
        fs.writeFileSync(path.join(OUT, `proof-fail-p${p}-${id}.png`), protoShots[`${p}:${id}`]);
      }
    }
  }
  // 2 · the contained spend state vs the markup cell, per path.
  const archivedB2 = fs.readFileSync(path.join(STATES_DIR, 's4-b2-b2.png'));
  const cellVsArchived = await diff(cellShot, archivedB2);
  results.push({ beat: 's4-b2-b2 cell', against: 'states/s4-b2-b2.png (archived)', ...cellVsArchived, pass: cellVsArchived.diffPixels === 0 });
  console.log(`cell s4-b2-b2 vs archived  ${cellVsArchived.diffPixels} px (max ${cellVsArchived.maxDelta})  ${cellVsArchived.diffPixels === 0 ? 'MATCH' : 'MISMATCH'}`);
  for (const p of [1, 2, 3]) {
    const d = await diff(protoShots[`${p}:s4-b2`], cellShot);
    const pass = d.diffPixels === 0;
    results.push({ path: p, beat: 's4-b2', against: 's4-b2-b2 (fresh cell)', ...d, pass });
    console.log(`path=${p} s4-b2   vs s4-b2-b2     ${String(d.diffPixels).padStart(6)} px (max ${d.maxDelta})  ${pass ? 'MATCH' : 'MISMATCH'}`);
    if (!pass) fs.writeFileSync(path.join(OUT, `proof-fail-p${p}-s4-b2.png`), protoShots[`${p}:s4-b2`]);
  }

  const failed = results.filter((r) => !r.pass);
  fs.writeFileSync(path.join(OUT, 'landed-proof-r3.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: 'every non-target beat changes zero pixels against r2\'s approved renders, under every path candidate; S4 b2 is the s4-b2-b2 markup cell exactly (channel delta > 2/255 counts; any differing pixel fails)',
    pipeline: 'proto beats via cold direct entry at 1920×1080; the markup cell via states.mjs buildCell on the same dev server',
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failed.length}/${results.length} comparisons at zero differing pixels`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failed.length || errors.length ? 1 : 0);
})();
