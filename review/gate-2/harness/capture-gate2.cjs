// Prototype Gate 2 — the per-beat capture strip (docs/gate-2-brief.md §8).
//
// Every one of the 17 builds mounted cold and captured at its settled state —
// the record of what this iteration looked like; the presenter's real review
// medium is the live prototype. Each caption says whether the state is an
// APPROVED still's composition or DERIVED from the system, matching the r1
// report's derivation list.
//
// The birth cannot be judged from settled frames — all three treatments land
// on the same approved still — so each treatment is also caught twice
// mid-gesture (~35% and ~70% of its timeline) from a cold Scene 3 entry.
//
// Usage: node capture-gate2.cjs [--port 5273] [--iteration r1]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const ITER = flag('--iteration', 'r1');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', ITER);
fs.mkdirSync(OUT, { recursive: true });

const BEATS = [
  ['s2', 1, 1, 'DERIVED — the stage assembles: s2-f1-final minus the capabilities'],
  ['s2', 1, 2, 'APPROVED — s2-f1-final: capabilities landed, the patient received'],
  ['s2', 1, 3, 'DERIVED — the return path attempting, from s2-f2’s system'],
  ['s2', 1, 4, 'APPROVED — s2-f2: the failure state'],
  ['s2', 1, 5, 'DERIVED — the binding line at display scale, the failure receded'],
  ['s3', 2, 1, 'APPROVED — s3-f1-final: the birth, mid-contraction'],
  ['s3', 2, 2, 'DERIVED — the contraction complete, the claim held between them'],
  ['s3', 2, 3, 'DERIVED — the patient released'],
  ['s3', 2, 4, 'APPROVED — s3-f2-a: the open interval'],
  ['s3', 2, 5, 'DERIVED — the completion demonstration’s end, from s4-f1’s system'],
  ['s3', 2, 6, 'APPROVED — s3-f2-a again: the reset to the held claim'],
  ['s3', 2, 7, 'DERIVED — the separation and unfinished pair, the interval receded'],
  ['s4', 3, 1, 'DERIVED — the fork named over the held claim'],
  ['s4', 3, 2, 'APPROVED — s4-f1: SPEND resolved'],
  ['s4', 3, 3, 'DERIVED — the held claim restored, SAVE alone'],
  ['s4', 3, 4, 'DERIVED — s4-f2-a minus the pair: the interval stretched'],
  ['s4', 3, 5, 'APPROVED — s4-f2-a: the closing pair']
];

const BIRTHS = { 1: 'collapse', 2: 'condense', 3: 'pool' };

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  // A fresh page every few full-asset navigations: the renders are megabytes
  // each, and one renderer accumulating dozens of loads runs out of resources
  // — an environment flake, not a prototype defect.
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };
  await freshPage();

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
  // The captures record the stage, not the deck's idle chrome — the counter
  // and the accent progress bar are review-tool furniture the idle timer hides
  // for the presenter too.
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForTimeout(450);
  };

  // ---- the 17 settled beats, each mounted cold ----
  let shots = 0;
  for (const [scene, slide, beat] of BEATS) {
    if (shots > 0 && shots % 6 === 0) await freshPage();
    shots += 1;
    await page.goto(`${BASE}/?proto=gate2&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, beat - 1]);
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
    await page.screenshot({ path: path.join(OUT, `${scene}-b${beat}.png`) });
    console.log(`beat   ${scene}-b${beat}`);
  }

  // ---- the three birth treatments, mid-gesture ----
  // Deterministic flow: let the entry birth finish, hide the chrome, then
  // replay the treatment with its selector key and catch it mid-gesture.
  for (const [k, name] of Object.entries(BIRTHS)) {
    await freshPage();
    await page.goto(`${BASE}/?proto=the-breakthrough&birth=${k}`, { waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
    await page.keyboard.press(k);
    await hideChrome();   // the keypress re-reveals the chrome; hide it again
    for (const [tag, t] of [['a', 0.4], ['b', 0.72]]) {
      await page.waitForFunction((p) => {
        const v = window.__gate2.birthT();
        return v !== null && v >= p;
      }, t, { timeout: 30000 });
      await page.screenshot({ path: path.join(OUT, `birth-${k}-${name}-${tag}.png`) });
    }
    await settled();
    console.log(`birth  ${k} · ${name}`);
  }

  // ---- the strip ----
  const cell = (src, caption) => `
      <figure><img src="./${src}.png" alt="${src}" /><figcaption>${caption}</figcaption></figure>`;
  const groups = [
    ['Scene 2 — The Direct Exchange (5 beats)', BEATS.filter(([s]) => s === 's2')],
    ['Scene 3 — The Breakthrough (7 beats)', BEATS.filter(([s]) => s === 's3')],
    ['Scene 4 — Spend or Save (5 beats)', BEATS.filter(([s]) => s === 's4')]
  ].map(([title, list]) => `<h2>${title}</h2><div class="row">${
    list.map(([scene, , beat, caption]) => cell(`${scene}-b${beat}`, `Beat ${beat} · ${caption}`)).join('')
  }</div>`).join('\n');
  const births = `<h2>The birth — three treatments, mid-gesture (settled state identical: s3-f1-final)</h2><div class="row">${
    Object.entries(BIRTHS).map(([k, name]) =>
      cell(`birth-${k}-${name}-a`, `Treatment ${k} · ${name} · early`) +
      cell(`birth-${k}-${name}-b`, `Treatment ${k} · ${name} · late`)).join('')
  }</div>`;

  fs.writeFileSync(path.join(OUT, 'strip.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Gate 2 ${ITER} — the per-beat strip</title>
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
<h1>Prototype Gate 2 · ${ITER} — Scenes 2–4, every beat at its settled state</h1>
<p class="note">All 17 builds mounted cold and captured settled. APPROVED marks a landed state that is an approved
still’s composition; DERIVED marks a state derived from the nearest approved frame’s system — the r1 report lists
each derivation. The presenter’s review medium is the live prototype: <b>?proto=gate2</b> on the dev server,
birth treatment via <b>?birth=1|2|3</b> or keys 1/2/3 on Scene 3.</p>
${groups}
${births}
</body></html>`);

  await page.setViewportSize({ width: 1860, height: 1200 });
  await page.goto(`${BASE}/review/gate-2/${ITER}/strip.html`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'strip.png'), fullPage: true });

  fs.writeFileSync(path.join(OUT, 'beats.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: `gate-2-${ITER}`,
    beats: BEATS.map(([scene, , beat, caption]) => ({ id: `${scene}-b${beat}`, caption })),
    birthCaptures: Object.entries(BIRTHS).flatMap(([k, name]) =>
      ['a', 'b'].map((t) => `birth-${k}-${name}-${t}`)),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${BEATS.length} beats + ${Object.keys(BIRTHS).length * 2} birth frames -> review/gate-2/${ITER}/`);
  console.log(`console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
