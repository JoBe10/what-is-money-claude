// Gate 2 close — the landed-state proof for the path-2 approved record
// (docs/gate-2-close-and-prologue-states-brief.md §1, §5).
//
// One claim, made checkable: THE PROTOTYPE'S SETTLED STATES AT THE FOUR
// CHANGED SITES ARE THE NEW APPROVED CELLS, UNDER THE RULED DEFAULT. The
// prototype is mounted cold WITHOUT a ?path param — proving the default is
// the ruled path 2 (window.__gate2.path() === 2) — at S2 b3, S2 b4, S2 b5
// and S3 b1, and each settled frame is pixel-compared against a fresh
// same-pipeline render of its approved cell (s2-b3-p2, s2-b4-p2, s2-b5-b-p2,
// s3-b1-p2), and that fresh render against the archived PNG.
//
// A differing pixel is one whose max channel delta exceeds 2/255 (below that
// is rasterizer noise on a black stage). ANY differing pixel fails.
//
// Usage: node proof-close.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'states');
const STATES_DIR = OUT;

// [cell id, 1-based slide, beat]
const SITES = [
  ['s2-b3-p2', 1, 3],
  ['s2-b4-p2', 1, 4],
  ['s2-b5-b-p2', 1, 5],
  ['s3-b1-p2', 2, 1]
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

  // ---- pass 1 · the four cells, freshly rendered (same pipeline) -----------
  const cellShots = {};
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(async () => {
    window.__states = await import('/review/gate-2/harness/states.mjs');
  });
  for (const [id] of SITES) {
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(800);
    cellShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`cell   ${id}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- pass 2 · the prototype cold at each site, NO path param -------------
  const protoShots = {};
  let defaultPath = null;
  for (const [id, slide, beat] of SITES) {
    await freshPage();
    await page.goto(`${BASE}/?proto=gate2&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, beat - 1]);
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
    await ready();
    await page.waitForFunction(() => window.__gate2.settled(), null, { timeout: 30000 });
    defaultPath = await page.evaluate(() => window.__gate2.path());
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForTimeout(450);
    protoShots[id] = await page.screenshot({ clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`proto  (no param -> path=${defaultPath}) ${id}`);
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

  const results = [{ check: 'default path', value: defaultPath, pass: defaultPath === 2 }];
  console.log(`default path (no param): ${defaultPath}  ${defaultPath === 2 ? 'PASS' : 'FAIL'}`);
  for (const [id] of SITES) {
    const archived = fs.readFileSync(path.join(STATES_DIR, `${id}.png`));
    const freshVsArchived = await diff(cellShots[id], archived);
    results.push({ beat: id, against: `states/${id}.png (archived)`, ...freshVsArchived, pass: freshVsArchived.diffPixels === 0 });
    console.log(`cell   ${id.padEnd(11)} vs archived   ${String(freshVsArchived.diffPixels).padStart(6)} px (max ${freshVsArchived.maxDelta})  ${freshVsArchived.diffPixels === 0 ? 'MATCH' : 'MISMATCH'}`);
    const protoVsCell = await diff(protoShots[id], cellShots[id]);
    results.push({ beat: id, against: `${id} (fresh cell)`, ...protoVsCell, pass: protoVsCell.diffPixels === 0 });
    console.log(`proto  ${id.padEnd(11)} vs fresh cell ${String(protoVsCell.diffPixels).padStart(6)} px (max ${protoVsCell.maxDelta})  ${protoVsCell.diffPixels === 0 ? 'MATCH' : 'MISMATCH'}`);
    if (protoVsCell.diffPixels) {
      fs.writeFileSync(path.join(__dirname, `proof-close-fail-${id}.png`), protoShots[id]);
    }
  }

  const failed = results.filter((r) => !r.pass);
  fs.writeFileSync(path.join(__dirname, 'proof-close.json'), JSON.stringify({
    date: new Date().toISOString(),
    rule: 'with no ?path param the prototype runs the ruled default (path 2); its settled state at each of the four changed sites is the approved -p2 cell exactly (channel delta > 2/255 counts; any differing pixel fails)',
    pipeline: 'proto beats via cold direct entry at 1920×1080, no path param; cells via states.mjs buildCell on the same dev server',
    results,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${results.length - failed.length}/${results.length} checks green`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(failed.length || errors.length ? 1 : 0);
})();
