// Gate 2 r3 — the capture strips (docs/gate-2-r3-brief.md §5).
//
// Per failure-language candidate (?path=1|2|3): the three reopened sites
// settled (S2 b3, S2 b4, S3 b1) and their gestures mid-flight (the b3
// attempt, the b4 failure, the pool birth). Plus the contained spend state
// (S4 b2 = s4-b2-b2, path-independent) settled and the claim's redemption
// mid-gesture. The presenter's review medium is the live prototype — he runs
// each path value forward and backward, motion-on and reduced-motion; these
// frames are the record of what r3 looked like.
//
// Usage: node capture-r3.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'r3');
fs.mkdirSync(OUT, { recursive: true });

const PATHS = {
  1: { name: 'THE REACH', line: 'clean and full-weight, always: it extends, halts short, and withdraws — what settles is a whole short stroke with its terminal dot', b3T: 0.62, b4T: 0.45 },
  2: { name: 'THE ABSENCE', line: 'no return line exists: the service path stays whole and the terminal dot strains toward the surgeon and subsides — twice, harder at b4', b3T: 0.6, b4T: 0.48 },
  3: { name: 'THE FLOW', line: 'a faint warm stream flows, stalls, and disperses short of arrival — what settles is only a dim residual drift', b3T: 0.55, b4T: 0.42 }
};

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

  const ready = async () => {
    await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const settled = async () => {
    await page.waitForFunction(() => window.__gate2.settled(), null, { timeout: 30000 });
    await page.waitForTimeout(200);
  };
  const hideChrome = async (wait = 450) => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForTimeout(wait);
  };
  const mountCold = async (proto, slide, beat) => {
    await freshPage();
    await page.goto(`${BASE}/${proto}&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, beat - 1]);
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
  };
  const midGesture = async (tag, t, file) => {
    await page.evaluate(() => window.__deck.advanceStep());
    await page.waitForFunction(([g, p]) => {
      const v = window.__gate2 && window.__gate2.gestureT(g);
      return v !== null && v !== undefined && v >= p;
    }, [tag, t], { timeout: 30000 });
    await page.screenshot({ path: path.join(OUT, file) });
    await settled();
  };

  for (const p of [1, 2, 3]) {
    const proto = `?proto=gate2&path=${p}`;
    // S2 b3: settled, then the gesture from b2, caught mid-flight.
    await mountCold(proto, 1, 3);
    await page.screenshot({ path: path.join(OUT, `p${p}-s2-b3.png`) });
    await mountCold(proto, 1, 2);
    await midGesture('b3', PATHS[p].b3T, `p${p}-s2-b3-mid.png`);
    console.log(`path=${p} s2-b3 settled + mid`);
    // S2 b4 likewise, from b3.
    await mountCold(proto, 1, 4);
    await page.screenshot({ path: path.join(OUT, `p${p}-s2-b4.png`) });
    await mountCold(proto, 1, 3);
    await midGesture('b4', PATHS[p].b4T, `p${p}-s2-b4-mid.png`);
    console.log(`path=${p} s2-b4 settled + mid`);
    // S3 b1 settled, then the pool birth replayed and caught mid-flight.
    await freshPage();
    await page.goto(`${BASE}/?proto=the-breakthrough&birth=3&path=${p}`, { waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
    await page.screenshot({ path: path.join(OUT, `p${p}-s3-b1.png`) });
    await page.keyboard.press('3');
    await hideChrome(150);
    await page.waitForFunction((t) => {
      const v = window.__gate2 && window.__gate2.birthT();
      return v !== null && v !== undefined && v >= t;
    }, 0.5, { timeout: 30000 });
    await page.screenshot({ path: path.join(OUT, `p${p}-birth-mid.png`) });
    await settled();
    console.log(`path=${p} s3-b1 settled + pool mid-birth`);
  }

  // The contained spend state (path-independent) and the redemption mid-gesture.
  await mountCold('?proto=gate2&path=1', 3, 2);
  await page.screenshot({ path: path.join(OUT, 's4-b2.png') });
  await mountCold('?proto=gate2&path=1', 3, 1);
  await midGesture('spend', 0.35, 's4-spend-mid.png');
  console.log('s4-b2 settled + redemption mid-gesture');

  // ---- the strip ----
  const cell = (src, caption) => `
      <figure><img src="./${src}.png" alt="${src}" /><figcaption>${caption}</figcaption></figure>`;
  const groups = [1, 2, 3].map((p) => `<h2>path=${p} — ${PATHS[p].name}</h2>
<p class="lang">${PATHS[p].line}</p>
<div class="row">${
  cell(`p${p}-s2-b3`, 'S2 b3 · settled — the attempt, while the goods hang as possibilities') +
  cell(`p${p}-s2-b3-mid`, 'S2 b3 · mid-gesture') +
  cell(`p${p}-s2-b4`, 'S2 b4 · settled — the failure that sets up the statement') +
  cell(`p${p}-s2-b4-mid`, 'S2 b4 · mid-gesture') +
  cell(`p${p}-s3-b1`, 'S3 b1 · settled — what remains at the birth') +
  cell(`p${p}-birth-mid`, 'S3 b1 · the pool mid-birth, consuming it')
}</div>`).join('\n');
  const spend = `<h2>The spend goods, contained (s4-b2-b2 — direct markup, no candidates)</h2>
<div class="row">${
  cell('s4-b2', 'S4 b2 · settled — reduced uniform scale, a compact triangle wholly inside the left third') +
  cell('s4-spend-mid', 'S4 b2 · the claim’s redemption mid-gesture — unchanged')
}</div>`;

  fs.writeFileSync(path.join(OUT, 'strip.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Gate 2 r3 — the two targets</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 64px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 36px; max-width:920px; line-height:1.6; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:40px 0 6px; font-weight:500; }
  p.lang { font-size:12px; color:rgba(255,255,255,.45); margin:0 0 16px; max-width:920px; line-height:1.6; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.45); line-height:1.5; }
</style></head><body>
<h1>Prototype Gate 2 · r3 — the return path's failure language as three live candidates · the spend goods contained</h1>
<p class="note">The presenter's review medium is the live prototype: <b>?proto=gate2&amp;path=1</b>, <b>=2</b>, <b>=3</b> on the
dev server, forward and backward, motion-on and reduced-motion. Binding on every candidate: no degraded stroke ever
appears in a settled frame — failure is carried by motion, by absence, or by a medium that is not a line. Every
non-target beat is proven unchanged against r2's approved renders at zero differing pixels, under every path value
(landed-proof-r3.json). His selection re-enters the approved record at the gate close.</p>
${groups}
${spend}
</body></html>`);

  await page.setViewportSize({ width: 1860, height: 1200 });
  await page.goto(`${BASE}/review/gate-2/r3/strip.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'strip.png'), fullPage: true });

  fs.writeFileSync(path.join(OUT, 'r3.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'gate-2-r3',
    candidates: Object.fromEntries([1, 2, 3].map((p) => [p, PATHS[p].name])),
    captures: [1, 2, 3].flatMap((p) => [
      `p${p}-s2-b3`, `p${p}-s2-b3-mid`, `p${p}-s2-b4`, `p${p}-s2-b4-mid`,
      `p${p}-s3-b1`, `p${p}-birth-mid`
    ]).concat(['s4-b2', 's4-spend-mid']),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n20 frames + strip -> review/gate-2/r3/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
