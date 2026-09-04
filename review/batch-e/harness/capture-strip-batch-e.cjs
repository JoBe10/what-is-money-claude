// Batch E — the capture strip, COMPLETED across all seven scenes
// (docs/batch-e-implementation-brief.md §3).
//
// The act as the engine plays it IN THE SPLICED DECK — the strip Session 1
// started at `?proto=act5` for Scenes 24–27, re-walked here where the film
// runs and extended through Scenes 28, 29 and 30 to the last frame. The walk
// enters at Scene 24 and goes forward to "Thank you.", capturing every settled
// state and each forward gesture
// mid-flight — the legacy's own advances, the three in-act boundaries, and
// the merge inside Scene 26 where 4-19 hands to 4-20 — so the motion the
// presenter will judge at the act viewing is on file as frames, not just as
// claims.
//
// THE WALK IS ALSO EVIDENCE, and this is the reason it measures. The
// landed-state proof mounts every state COLD on a fresh page, which is what a
// direct entry does; a viewing is a CONTINUOUS WALK, and the act-5-states
// session recorded that a dark-field subject painted at one box size can
// resample from that cached raster when it is next painted at another. Act V
// paints the same five subjects at the display box (Scenes 24–26) and then at
// Scene 27's compact box, so the walk is exactly the sequence that could show
// it. Every settled frame here is therefore compared per pixel against its
// approved cell, and the count is reported rather than assumed. The proof
// remains the pixel authority for the cold mount; this answers the other
// question — whether the walk looks like the approved cells too.
//
// Usage: node capture-strip-impl1.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'strip');
const ENTRY = 'migration';
const REPO = path.join(__dirname, '..', '..', '..');
const CELLS = path.join(REPO, 'review', 'act-5', 'states');
fs.mkdirSync(OUT, { recursive: true });

const CELL_OF = [
  ['s24-b1', 's24-b2', 's24-b3', 's24-b4'],
  ['s25-b1', 's25-b2', 's25-b3', 's25-b4'],
  ['s26-b1', 's26-b2', 's26-b3', 's26-b4', 's26-b5', 's26-b6', 's26-b7', 's26-b8', 's26-b9'],
  ['s27-b1', 's27-b2', 's27-b3'],
  ['s28-b1', 's28-b2', 's28-b3'],
  ['s29-b1', 's29-b2'],
  ['s30-b1', 's30-b2']
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
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  await page.addInitScript(SEED_SCRIPT);
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act5;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(150);
  };
  // The close's last fade is a full second — longer than any other transition
  // in the act — so the settle wait is generous enough to catch its end.
  const settledLong = async () => { await settled(); await page.waitForTimeout(700); };
  const shot = async (name) => {
    const buf = await page.screenshot({
      path: path.join(OUT, `${name}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`strip  ${name}`);
    return buf;
  };

  // Enter at Scene 24 in the spliced deck. sessionStorage is cleared first:
  // the engine persists every landing, and a stale key would start the walk
  // somewhere else entirely.
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.removeItem('deck-state'));
  await page.goto(`${BASE}/?slide=${ENTRY}`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
    null, { timeout: 30000 });
  const startId = await page.evaluate(() => window.__deck.slides[window.__deck.index].id);
  if (startId !== ENTRY) throw new Error(`the strip must start at ${ENTRY}; it started at ${startId}`);
  await page.evaluate(() => window.__deck._hideChrome());
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
  });
  await settled();

  const frames = [];
  const record = (name, kind, cell) => frames.push({ name, kind, cell });
  const settledShots = {};

  let shotIdx = 0;
  for (let slide = 0; slide < CELL_OF.length; slide += 1) {
    for (let b = 0; b < CELL_OF[slide].length; b += 1) {
      const cell = CELL_OF[slide][b];
      if (!(slide === 0 && b === 0)) {
        await page.evaluate(() => window.__deck.advance());
        await page.waitForTimeout(600);
        const g = `gesture-${cell}-arriving`;
        await shot(g);
        record(g, 'gesture', null);
        await (cell === 's30-b2' ? settledLong() : settled());
      }
      shotIdx += 1;
      const s = `settled-${cell}`;
      settledShots[cell] = await shot(s);
      record(s, 'settled', cell);
    }
  }

  // ---- the walk measured against the approved cells -------------------------
  const measure = await browser.newPage();
  await measure.goto('about:blank');
  const diff = (bufA, bufB) => measure.evaluate(async ([a, b]) => {
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
    // The bounding box of the differing region, so a failure says WHERE.
    let x0 = 1e9; let y0 = 1e9; let x1 = -1; let y1 = -1;
    for (let p = 0; p < da.length; p += 4) {
      const d = Math.max(Math.abs(da[p] - db[p]), Math.abs(da[p + 1] - db[p + 1]), Math.abs(da[p + 2] - db[p + 2]));
      if (d > maxDelta) maxDelta = d;
      if (d > 2) {
        diffPixels += 1;
        const i = p / 4; const x = i % 1920; const y = (i - x) / 1920;
        if (x < x0) x0 = x; if (x > x1) x1 = x;
        if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
    const box = x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
    return { diffPixels, maxDelta, box };
  }, [`data:image/png;base64,${bufA.toString('base64')}`, `data:image/png;base64,${bufB.toString('base64')}`]);

  const walk = [];
  for (const row of CELL_OF) {
    for (const cell of row) {
      const archived = fs.readFileSync(path.join(CELLS, `${cell}.png`));
      const d = await diff(settledShots[cell], archived);
      walk.push({ cell, ...d });
      console.log(`walk   ${cell.padEnd(10)} vs its approved cell: ${String(d.diffPixels).padStart(7)} differing pixels`);
    }
  }
  const walkClean = walk.filter((w) => w.diffPixels === 0).length;
  await measure.close();

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const walkLine = walkClean === walk.length
    ? `All ${walk.length} settled frames of the continuous walk are their approved cells at <b>zero differing pixels</b> — the image-cache artefact the states session recorded does not reach Act V's walk.`
    : `<b>${walk.length - walkClean} of ${walk.length}</b> settled frames of the continuous walk differ from their approved cells: ${
      esc(walk.filter((w) => w.diffPixels).map((w) => `${w.cell} ${w.diffPixels}px`).join(' · '))}. The cold mount matches at zero (the landed-state proof); this is the walk only, and it is reported rather than smoothed.`;

  fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch E — the capture strip (Act V complete: Scenes 24–30)</title>
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:40px 44px; }
  h1 { font-size:15px; letter-spacing:.2em; text-transform:uppercase; color:#F7931A; font-weight:500; }
  p { font-size:13px; color:rgba(255,255,255,.55); max-width:960px; line-height:1.6; }
  p b { color:rgba(255,255,255,.85); }
  .row { display:flex; flex-wrap:wrap; gap:18px; margin-top:24px; }
  figure { margin:0; width:448px; }
  img { display:block; width:448px; height:252px; outline:1px solid rgba(255,255,255,.1); }
  figure.settled img { outline:1px solid rgba(247,147,26,.4); }
  figcaption { font-size:11px; color:rgba(255,255,255,.5); margin-top:5px; }
</style></head><body>
<h1>Batch E — the capture strip · Act V complete (Scenes 24–30, ${shotIdx} settled states + the gestures)</h1>
<p>The act as the engine plays it in the spliced 31-scene deck, walked forward once from fiat standing with its two jobs to
"Thank you.": every settled state (each pinned to its approved cell by the batch landed-state proof,
review/batch-e/landed-proof-batch-e.json — 27/27 at zero pixels on the cold mount), and every forward gesture caught
mid-flight — the legacy's own advances, the six in-act boundaries (the legacy deck's own crossfade), the merge inside
Scene 26 where 4-19 hands to 4-20, the full clear onto the kicker, and the last fade of all. Act V authors no motion of
its own; every frame here is the legacy's.</p>
<p><b>The walk, measured.</b> ${walkLine}</p>
<div class="row">
${frames.map((f) => `<figure class="${f.kind}"><a href="./${f.name}.png"><img src="./${f.name}.png" loading="lazy"></a><figcaption>${esc(f.kind)} · ${esc(f.name)}</figcaption></figure>`).join('\n')}
</div>
</body></html>`);

  fs.writeFileSync(path.join(__dirname, '..', 'strip-batch-e.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-e',
    settled: shotIdx,
    gestures: frames.length - shotIdx,
    walkVsApprovedCells: {
      rule: 'every settled frame of the CONTINUOUS forward walk compared per pixel with its approved cell (the proof measures the COLD mount instead)',
      clean: walkClean,
      of: walk.length,
      results: walk
    },
    frames,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${shotIdx} settled + ${frames.length - shotIdx} gesture frames -> review/batch-e/strip/`);
  console.log(`the act's 27 settled states: ${shotIdx === 27 ? 'all captured' : `ONLY ${shotIdx}`}`);
  console.log(`walk vs approved cells: ${walkClean}/${walk.length} at zero pixels`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
