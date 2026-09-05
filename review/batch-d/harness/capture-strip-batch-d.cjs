// Batch D — the capture strip, completed
// (docs/batch-d-implementation-brief.md §3; started at Session 1 across
// Scenes 16–19, completed here across all eight scenes through the spliced
// deck).
//
// The act as the engine plays it: one forward walk from Act III's exit
// question at speaking-ish pace, capturing every settled state (which the
// batch landed-state proof separately pins to its approved cell) and each
// forward gesture mid-flight — the splice seam into the homecoming (twice:
// the disc at the apex as the roads draw, and the claim riding the save road
// to rest), every in-scene advance, the seven in-act boundaries, and the
// splice seam out to the surviving legacy deck — so the motion the presenter
// will judge at the act viewing is on file as frames, not just as claims.
//
// Usage: node capture-strip-batch-d.cjs [--port 5273]
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
  ['s19-b1', 's19-b2'],
  ['s20-b1', 's20-b2', 's20-b3', 's20-b4', 's20-b5'],
  ['s21-b1', 's21-b2', 's21-b3', 's21-b4', 's21-b5'],
  ['s22-b1', 's22-b2', 's22-b3'],
  ['s23-b1', 's23-b2', 's23-b3', 's23-b4', 's23-b5', 's23-b6']
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
      for (const key of ['__act3', '__act4']) {
        const a = window[key];
        if (a && a.settled && !a.settled()) return false;
      }
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

  // Clear the Session 1 strip: the batch strip is the record.
  fs.readdirSync(OUT).filter((f) => f.endsWith('.png')).forEach((f) => fs.unlinkSync(path.join(OUT, f)));

  await page.goto(`${BASE}/?slide=the-tower`, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  await page.evaluate(() => window.__deck._hideChrome());
  await settled();
  // Walk S15 to its end — the exit question over the returned triad — then
  // cross the splice seam into the homecoming.
  for (let k = 0; k < 6; k += 1) { await page.evaluate(() => window.__deck.advance()); await settled(); }
  await shot('settled-s15-b7-the-exit-question');
  await page.evaluate(() => window.__deck.advance());
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
  // The act's exit: the splice seam out to the surviving legacy deck.
  await page.evaluate(() => window.__deck.advance());
  await page.waitForTimeout(600);
  await shot('gesture-exit-to-the-surviving-legacy-deck');
  await settled();
  await shot('settled-3-00-after-the-act');

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  fs.writeFileSync(path.join(OUT, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch D — the capture strip (the act, complete)</title>
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
<h1>Batch D — the capture strip · the act, complete (Scenes 16–23, ${shotIdx} settled states + the gestures)</h1>
<p>The act as the engine plays it through the spliced deck, walked forward once from Act III's exit question: every settled
state (each pinned to its approved cell by the batch landed-state proof, review/batch-d/landed-proof-batch-d.json), and every
forward gesture caught mid-flight — the splice seam into the homecoming, the disc's travel to the apex as the definition lands,
its re-centering to the carrier stage, the legacy's own advances, the seven in-act boundaries (the legacy deck's own crossfade),
the fifty scores landing at once, the closing line, and the splice seam out to the surviving legacy deck.</p>
<div class="row">
<figure class="settled"><a href="./settled-s15-b7-the-exit-question.png"><img src="./settled-s15-b7-the-exit-question.png"></a><figcaption>settled · Act III's exit question — where the act is entered from</figcaption></figure>
<figure><a href="./gesture-s16-entry-1.png"><img src="./gesture-s16-entry-1.png"></a><figcaption>gesture · the splice seam — the homecoming: the disc at the apex, the roads drawing out of it</figcaption></figure>
<figure><a href="./gesture-s16-entry-2.png"><img src="./gesture-s16-entry-2.png"></a><figcaption>gesture · the homecoming — the claim riding the save road to rest</figcaption></figure>
${frames.map((f) => `<figure class="${f.kind}"><a href="./${f.name}.png"><img src="./${f.name}.png" loading="lazy"></a><figcaption>${esc(f.kind)} · ${esc(f.name)}</figcaption></figure>`).join('\n')}
<figure><a href="./gesture-exit-to-the-surviving-legacy-deck.png"><img src="./gesture-exit-to-the-surviving-legacy-deck.png"></a><figcaption>gesture · the splice seam out — S23's line dissolving to the surviving legacy deck</figcaption></figure>
<figure class="settled"><a href="./settled-3-00-after-the-act.png"><img src="./settled-3-00-after-the-act.png"></a><figcaption>settled · 3-00, the flagged function waypoint, after the act (reported, not smoothed)</figcaption></figure>
</div>
</body></html>`);

  console.log(`\n${shotIdx} settled + ${frames.length - shotIdx + 3} gesture frames -> review/batch-d/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
