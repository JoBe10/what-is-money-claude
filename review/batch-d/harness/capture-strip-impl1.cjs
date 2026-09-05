// Batch D implementation, Session 1 — the capture strip, started
// (docs/batch-d-implementation-brief.md §2; completed across all eight
// scenes at Session 2).
//
// The act as the engine plays it: one forward walk of `?proto=act4` at
// speaking-ish pace, capturing every settled state (which the landed-state
// proof separately pins to its approved cell) and each forward gesture
// mid-flight — the homecoming's entry (twice: the disc risen to the apex as
// the roads draw, and the claim riding the save road to rest), the three
// legacy-crossfade boundaries, and every in-scene advance — so the motion
// the presenter will judge at the act viewing is on file as frames, not
// just as claims.
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
  ['s16-b1', 's16-b2', 's16-b3', 's16-b4', 's16-b5', 's16-b6', 's16-b7', 's16-b8'],
  ['s17-b1', 's17-b2', 's17-b3', 's17-b4', 's17-b5'],
  ['s18-b1', 's18-b2', 's18-b3', 's18-b4', 's18-b5', 's18-b6', 's18-b7', 's18-b8'],
  ['s19-b1', 's19-b2']
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
      const a = window.__act4;
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

  await page.goto(`${BASE}/?proto=act4`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  await page.evaluate(() => window.__deck._hideChrome());
  // The homecoming's entry, mid-flight: the disc risen to the apex as the
  // roads draw out of it; then the claim riding the save road to its rest.
  await page.waitForTimeout(1500);
  await shot('gesture-s16-entry-1');
  await page.waitForTimeout(1900);
  await shot('gesture-s16-entry-2');
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
<html lang="en"><head><meta charset="utf-8"><title>Batch D — the capture strip (Session 1: Scenes 16–19)</title>
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
<h1>Batch D — the capture strip · Session 1 (Scenes 16–19, ${shotIdx} settled states + the gestures)</h1>
<p>The act as the engine plays it, walked forward once: every settled state (each pinned to its approved cell by the
landed-state proof, review/batch-d/landed-proof-impl1.json), and every forward gesture caught mid-flight — the homecoming's
entry, the disc's travel to the apex as the definition lands, its re-centering to the carrier stage, the legacy's own
advances, and the three in-act boundaries (the legacy deck's own crossfade). Completed across all eight scenes at Session 2.</p>
<div class="row">
<figure><a href="./gesture-s16-entry-1.png"><img src="./gesture-s16-entry-1.png"></a><figcaption>gesture · the S16 entry — the disc at the apex, the roads drawing out of it</figcaption></figure>
<figure><a href="./gesture-s16-entry-2.png"><img src="./gesture-s16-entry-2.png"></a><figcaption>gesture · the S16 entry — the claim riding the save road to rest</figcaption></figure>
${frames.map((f) => `<figure class="${f.kind}"><a href="./${f.name}.png"><img src="./${f.name}.png" loading="lazy"></a><figcaption>${esc(f.kind)} · ${esc(f.name)}</figcaption></figure>`).join('\n')}
</div>
</body></html>`);

  console.log(`\n${shotIdx} settled + ${frames.length - shotIdx + 2} gesture frames -> review/batch-d/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
