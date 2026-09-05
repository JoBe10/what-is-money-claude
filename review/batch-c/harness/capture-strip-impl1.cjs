// Batch C implementation, Session 1 — the capture strip, started
// (docs/batch-c-implementation-brief.md §2; completed across all five scenes
// at Session 2).
//
// The act as the engine plays it: one forward walk of `?proto=act3` at
// speaking-ish pace, capturing every settled state (which the landed-state
// proof separately pins to its approved cell) and each forward gesture
// mid-flight — the entry, the two boundary seams, and every in-scene
// advance — so the motion the presenter will judge at the act viewing is on
// file as frames, not just as claims.
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
fs.mkdirSync(OUT, { recursive: true });

const CELL_OF = [
  ['s11-b1', 's11-b2', 's11-b3', 's11-b4', 's11-b5'],
  ['s12-b1', 's12-b2', 's12-b3', 's12-b4'],
  ['s13-b1', 's13-b2', 's13-b3', 's13-b4', 's13-b5', 's13-b6']
];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act3;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
    await page.waitForTimeout(150);
  };
  const shot = async (name) => {
    await page.screenshot({
      path: path.join(OUT, `${name}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`strip  ${name}`);
  };

  await page.goto(`${BASE}/?proto=act3`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  await page.evaluate(() => window.__deck._hideChrome());
  await page.waitForTimeout(400);
  // The entry gesture, mid-flight (the disc finding its light).
  await shot('gesture-s11-entry');
  await settled();
  const frames = [];
  const record = (name, kind) => frames.push({ name, kind });

  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
  });

  let shotIdx = 0;
  for (let slide = 0; slide < CELL_OF.length; slide += 1) {
    for (let b = 0; b < CELL_OF[slide].length; b += 1) {
      if (!(slide === 0 && b === 0)) {
        await page.evaluate(() => window.__deck.advance());
        await page.waitForTimeout(600);
        const g = `gesture-${CELL_OF[slide][b]}-arriving`;
        await shot(g);
        record(g, 'gesture');
        await settled();
      }
      shotIdx += 1;
      const s = `settled-${CELL_OF[slide][b]}`;
      await shot(s);
      record(s, 'settled');
    }
  }

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch C — the capture strip (Session 1: Scenes 11–13)</title>
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:40px 44px; }
  h1 { font-size:15px; letter-spacing:.2em; text-transform:uppercase; color:#F7931A; font-weight:500; }
  p { font-size:13px; color:rgba(255,255,255,.55); max-width:960px; line-height:1.6; }
  .row { display:flex; flex-wrap:wrap; gap:18px; margin-top:24px; }
  figure { margin:0; width:448px; }
  img { display:block; width:448px; height:252px; outline:1px solid rgba(255,255,255,.1); }
  figure.settled img { outline:1px solid rgba(247,147,26,.4); }
  figcaption { font-size:11px; color:rgba(255,255,255,.5); margin-top:5px; }
</style></head><body>
<h1>Batch C — the capture strip · Session 1 (Scenes 11–13, ${shotIdx} settled states + the gestures)</h1>
<p>The act as the engine plays it, walked forward once: every settled state (each pinned to its approved cell by the
landed-state proof, review/batch-c/landed-proof-impl1.json), and every forward gesture caught mid-flight — the disc's
entry, the recede-and-land seam into Scene 12, the cut into Scene 13, the stage arrivals and the foundation.
Completed across all five scenes at Session 2.</p>
<div class="row">
<figure><a href="./gesture-s11-entry.png"><img src="./gesture-s11-entry.png"></a><figcaption>gesture · the S11 entry — the disc finding its light</figcaption></figure>
${frames.map((f) => `<figure class="${f.kind}"><a href="./${f.name}.png"><img src="./${f.name}.png" loading="lazy"></a><figcaption>${esc(f.kind)} · ${esc(f.name)}</figcaption></figure>`).join('\n')}
</div>
</body></html>`);

  console.log(`\n${shotIdx} settled + ${frames.length - shotIdx + 1} gesture frames -> review/batch-c/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
