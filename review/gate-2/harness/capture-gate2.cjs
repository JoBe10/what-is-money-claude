// Prototype Gate 2 — the per-beat capture strip (docs/gate-2-r2-brief.md §5).
//
// Every one of the 19 builds mounted cold and captured at its settled state —
// the record of what this iteration looked like; the presenter's real review
// medium is the live prototype. Every caption names the approved cell the
// settled state IS (the landed-state proof, proof-r2.cjs, proves the match
// per pixel — nothing here is derived).
//
// Three gestures cannot be judged from settled frames and are caught
// mid-flight, twice each (per the brief §5):
//   · the pool birth (the ruled treatment) from a cold Scene 3 entry
//   · the S2 entry — D8's motion half: the light rising, the path drawing,
//     the capabilities landing
//   · the S3 b7 two-phase completion — the claim departing while the shoes
//     arrive
//
// Usage: node capture-gate2.cjs [--port 5273] [--iteration r2]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const ITER = flag('--iteration', 'r2');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', ITER);
fs.mkdirSync(OUT, { recursive: true });

const BEATS = [
  ['s2', 1, 1, 'APPROVED — s2-b1-a: the assembled stage; capabilities at full voice (R2, D8-A)'],
  ['s2', 1, 2, 'APPROVED — s2-b2: the delivery arrived, the terminal lit, the capabilities at the floor'],
  ['s2', 1, 3, 'APPROVED — s2-b3-a: the wants; patient dimmed in place (D1-A), goods at his side (D2-A), the attempt'],
  ['s2', 1, 4, 'APPROVED — s2-b4-c: the failure — the stroke thins and dies before arriving (D3-C)'],
  ['s2', 1, 5, 'APPROVED — s2-b5-b: the binding line; the two people stay legible as its anchor (D4-B)'],
  ['s3', 2, 1, 'APPROVED — s3-b1-c: the birth, mid-contraction, the remnant in language C'],
  ['s3', 2, 2, 'APPROVED — s3-b2: the contraction complete'],
  ['s3', 2, 3, 'APPROVED — s3-b3: the patient released'],
  ['s3', 2, 4, 'APPROVED — s3-b4-a: SOMEONE ELSE at full voice (D6-A)'],
  ['s3', 2, 5, 'APPROVED — s3-b5-a: SOMEWHERE ELSE lands; SOMEONE ELSE demotes'],
  ['s3', 2, 6, 'APPROVED — s3-b6-a: LATER lands — s3-f2-a exactly'],
  ['s3', 2, 7, 'APPROVED — s3-b7-b: the completion as two phases in one frame (D5-B)'],
  ['s3', 2, 8, 'APPROVED — s3-b8-a: the reset to the held claim'],
  ['s3', 2, 9, 'APPROVED — s3-b9-a: the full handoff to clean black under the pair (D4-A)'],
  ['s4', 3, 1, 'APPROVED — s4-b1-b: the symmetric fork, both roads real, neither taken (D7-B)'],
  ['s4', 3, 2, 'APPROVED — s4-b2-b: the spend road taken; the goods at its end; the save road dormant'],
  ['s4', 3, 3, 'APPROVED — s4-b3-b: the fork re-posed; the spend road subdued by its own telling'],
  ['s4', 3, 4, 'APPROVED — s4-b4-b: the claim rests on the save road; the road continues into unseen time'],
  ['s4', 3, 5, 'APPROVED — s4-b5-b: the pair lands beneath the held road']
];

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
  const hideChrome = async (wait = 450) => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForTimeout(wait);
  };

  // ---- the 19 settled beats, each mounted cold ----
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

  // ---- the three ruled gestures, mid-flight ----
  const gesture = async (name, tag, points, mount) => {
    await freshPage();
    await mount();
    for (const [suffix, t] of points) {
      await page.waitForFunction(([g, p]) => {
        const v = window.__gate2 && window.__gate2.gestureT(g);
        return v !== null && v !== undefined && v >= p;
      }, [tag, t], { timeout: 30000 });
      await page.screenshot({ path: path.join(OUT, `${name}-${suffix}.png`) });
    }
    await settled();
    console.log(`motion ${name}`);
  };

  // The pool birth, from a cold Scene 3 entry — replayed with its selector
  // key once the chrome is hidden, so the frames are clean.
  await gesture('birth-pool', 'birth', [['a', 0.4], ['b', 0.72]], async () => {
    await page.goto(`${BASE}/?proto=the-breakthrough&birth=3`, { waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
    await page.keyboard.press('3');
    await hideChrome();   // the keypress re-reveals the chrome; hide it again
  });

  // The S2 entry — caught live on a cold mount (the gesture is ~5s; the
  // chrome is hidden inside its first second).
  await gesture('s2-entry', 'entry', [['a', 0.42], ['b', 0.78]], async () => {
    await page.goto(`${BASE}/?proto=gate2`, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.__deck && window.__gate2, null, { timeout: 30000 });
    await hideChrome(200);
  });

  // The S3 b7 two-phase completion — settled at beat 6, then one advance.
  await gesture('s3-b7-two-phase', 'demo', [['a', 0.4], ['b', 0.72]], async () => {
    await page.goto(`${BASE}/?proto=gate2&slide=2`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: 1, buildStep: 5 }));
    });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
    await page.evaluate(() => window.__deck.advanceStep());
  });

  // ---- the strip ----
  const cell = (src, caption) => `
      <figure><img src="./${src}.png" alt="${src}" /><figcaption>${caption}</figcaption></figure>`;
  const groups = [
    ['Scene 2 — The Direct Exchange (5 beats)', BEATS.filter(([s]) => s === 's2')],
    ['Scene 3 — The Breakthrough (9 beats)', BEATS.filter(([s]) => s === 's3')],
    ['Scene 4 — Spend or Save (5 beats)', BEATS.filter(([s]) => s === 's4')]
  ].map(([title, list]) => `<h2>${title}</h2><div class="row">${
    list.map(([scene, , beat, caption]) => cell(`${scene}-b${beat}`, `Beat ${beat} · ${caption}`)).join('')
  }</div>`).join('\n');
  const motions = `<h2>The ruled gestures, mid-flight</h2><div class="row">${
    cell('birth-pool-a', 'The pool birth · early — the light draining into the pool') +
    cell('birth-pool-b', 'The pool birth · late — the form about to crystallize') +
    cell('s2-entry-a', 'The S2 entry · early — light rising, the path drawing') +
    cell('s2-entry-b', 'The S2 entry · late — the capabilities landing under his voice') +
    cell('s3-b7-two-phase-a', 'The completion · early — the claim departs; the shoes enter') +
    cell('s3-b7-two-phase-b', 'The completion · late — two events, opposite directions, about to freeze')
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
<p class="note">All 19 builds mounted cold and captured settled. Every settled state is an approved cell of the
beat-state sheet, matched per pixel by the landed-state proof (landed-proof.json) — derivation is banned. The
presenter's review medium is the live prototype: <b>?proto=gate2</b> on the dev server, beat by beat, forward and
backward, motion-on and reduced-motion; birth treatment via <b>?birth=1|2|3</b> or keys 1/2/3 on Scene 3 (the ruled
default is pool).</p>
${groups}
${motions}
</body></html>`);

  await page.setViewportSize({ width: 1860, height: 1200 });
  // waitUntil 'load': the dev server injects its client into raw .html and
  // 'networkidle' aborts the navigation.
  await page.goto(`${BASE}/review/gate-2/${ITER}/strip.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, 'strip.png'), fullPage: true });

  fs.writeFileSync(path.join(OUT, 'beats.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: `gate-2-${ITER}`,
    beats: BEATS.map(([scene, , beat, caption]) => ({ id: `${scene}-b${beat}`, caption })),
    motionCaptures: ['birth-pool-a', 'birth-pool-b', 's2-entry-a', 's2-entry-b',
      's3-b7-two-phase-a', 's3-b7-two-phase-b'],
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${BEATS.length} beats + 6 mid-gesture frames -> review/gate-2/${ITER}/`);
  console.log(`console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
