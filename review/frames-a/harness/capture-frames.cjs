// Batch A style frames — capture the §3 stills (docs/batch-a-package.md §3).
//
// Drives the dev server at a 1920×1080 viewport: builds each frame through
// frames-a.mjs (real components, real tokens), waits for renders and fonts,
// and clips the exact stage. Then assembles the batch's one contact sheet from
// the captured stills and screenshots it. Output under review/frames-a/frames/.
//
// Usage: node capture-frames.cjs [--port 5273]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..', 'frames');
fs.mkdirSync(OUT, { recursive: true });

const CAPTIONS = {
  'p1-f1': 'P1-F1 — the completed hours field · counter at 80,000 · the hours line',
  'p1-f2': 'P1-F2 — mid-morph: the GOLD form · display scale, centered low',
  'p1-f3': 'P1-F3 — the title frame (the thumbnail candidate)',
  'p2-f1-plain': 'P2-F1 — the mercy line, alone',
  'p2-f1-ghost': 'P2-F1 — the mercy line over the hours-field ghost (0.14)',
  's2-f1-photo': 'S2-F1 — the exchange stage · photographic patient (render HELD at the gate)',
  's2-f1-mark': 'S2-F1 — the exchange stage · restrained patient mark',
  's2-f2': 'S2-F2 — the failure state: dim possibilities, the return path failing',
  's4-f1': 'S4-F1 — SPEND resolution: goods arrived, claim absent, closure legible',
  's4-f2-a': 'S4-F2 — SAVE final · candidate A',
  's4-f2-b': 'S4-F2 — SAVE final · candidate B',
  's4-f2-c': 'S4-F2 — SAVE final · candidate C'
};
for (const cand of ['a', 'b', 'c']) {
  const C = cand.toUpperCase();
  CAPTIONS[`s3-f1-a1-${cand}`] = `S3-F1 — the birth · attempt 1, the centered contraction · candidate ${C}`;
  CAPTIONS[`s3-f1-a2-${cand}`] = `S3-F1 — the birth · attempt 2, in the scene · candidate ${C}`;
  CAPTIONS[`s3-f1-a3-${cand}`] = `S3-F1 — the birth · attempt 3, display low center · candidate ${C}`;
  CAPTIONS[`s3-f2-${cand}`] = `S3-F2 — the open interval · candidate ${cand.toUpperCase()}`;
}

const GROUPS = [
  ['Prologue', ['p1-f1', 'p1-f2', 'p1-f3', 'p2-f1-plain', 'p2-f1-ghost']],
  ['Scene 2 — the direct exchange', ['s2-f1-photo', 's2-f1-mark', 's2-f2']],
  ['Scene 3 — the breakthrough (the signature image, 3 attempts × 3 candidates)',
    ['s3-f1-a1-a', 's3-f1-a1-b', 's3-f1-a1-c',
     's3-f1-a2-a', 's3-f1-a2-b', 's3-f1-a2-c',
     's3-f1-a3-a', 's3-f1-a3-b', 's3-f1-a3-c']],
  ['Scene 3 — the open interval', ['s3-f2-a', 's3-f2-b', 's3-f2-c']],
  ['Scene 4 — spend or save', ['s4-f1', 's4-f2-a', 's4-f2-b', 's4-f2-c']]
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'networkidle' });
  const ids = await page.evaluate(async () => {
    window.__frames = await import('/review/frames-a/harness/frames-a.mjs');
    return window.__frames.FRAME_IDS;
  });

  for (const id of ids) {
    await page.evaluate((frameId) => window.__frames.buildFrame(frameId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      const imgs = [...document.querySelectorAll('#frames-a-stage img')];
      await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(350);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`frame  ${id}`);
  }
  await page.evaluate(() => window.__frames.teardown());

  // ---- the batch's one contact sheet ----
  const sheetRows = GROUPS.map(([title, list]) => {
    const figs = list.map((id) => `
      <figure><img src="./${id}.png" alt="${id}" /><figcaption>${CAPTIONS[id]}</figcaption></figure>`).join('');
    return `<h2>${title}</h2><div class="row">${figs}</div>`;
  }).join('\n');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch A style frames</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 64px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 36px; max-width:920px; line-height:1.6; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:40px 0 16px; font-weight:500; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.45); line-height:1.5; }
</style></head><body>
<h1>Batch A style frames — the §3 stills</h1>
<p class="note">Every frame 1920×1080, real assets through the dark-field register, real type, brightness rules applied. Frames containing the Claim Mark render in all three Gate 1 candidates; S3-F1 in three compositional attempts. The presenter marks up this sheet; frames iterate as stills until approved; nothing animates before that.</p>
${sheetRows}
</body></html>`);

  await page.setViewportSize({ width: 1860, height: 1200 });
  await page.goto(`http://127.0.0.1:${PORT}/review/frames-a/frames/sheet.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'contact-sheet.png'), fullPage: true });

  fs.writeFileSync(path.join(OUT, 'frames.json'), JSON.stringify({
    date: new Date().toISOString(),
    frames: ids,
    count: ids.length,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} frames → review/frames-a/frames/ · contact-sheet.png assembled`);
  console.log(`console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
