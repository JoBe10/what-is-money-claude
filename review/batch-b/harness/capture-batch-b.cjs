// Batch B — the capture strip, started at Session 1
// (docs/batch-b-implementation-brief.md §2; completed by Session 2).
//
// Every settled state of Scenes 5–7, captured out of the running route at
// 1920×1080 — the same pixels the landed-state proof compares — plus the
// session's new connective motion caught mid-flight, which the settled
// frames cannot show: the claim's entry from Scene 4's world, the carrier's
// handoff to the record, the record transformation under the rails law, the
// evidence landing, the claim's return, the two act boundaries, an
// elimination wave, the mass state drawing, and the certificate travel at
// three points of its gesture.
//
// Usage: node capture-batch-b.cjs [--port 5275]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5275');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'strip');
fs.mkdirSync(OUT, { recursive: true });

const SCENES = [
  {
    slide: 1, key: 's5', title: 'Scene 5 · The Function Stayed. The Carrier Changed.',
    note: 'The held claim enters from Scene 4’s resting place and takes construction C’s carrier; the contender row takes its wounds exactly as the legacy landed them; the record transforms under the rails law with the goods riding the band; the Zanzibar receipt lands in the evidence grammar; and the same claim returns for the closing pair.',
    beats: [
      'b1 · the claim in its first body — SHELLS',
      'b2 · CATTLE falls',
      'b3 · SALT falls',
      'b4 · IRON falls',
      'b5 · the record — METALS rises, the goods on the band',
      'b6 · the Zanzibar receipt',
      'b7 · “The function stayed. The carrier changed.”',
      'b8 · the exit question'
    ]
  },
  {
    slide: 2, key: 's6', title: 'Scene 6 · Gold: Scarcity in Matter',
    note: 'The winner, studied. The elimination runs at the legacy pacing — one wave per advance, exactly as 2-05 performs it — then the claim returns wearing GOLD, and the counted load names gold’s own weakness.',
    beats: [
      'b1 · GOLD — SCARCITY IN MATTER',
      'b2 · the table rises',
      'b3 · the gases drift off',
      'b4 · the corrosion wave',
      'b5 · the radioactive row pulses out',
      'b6 · the shapeless settle',
      'b7 · the furnace decides — two survive',
      'b8 · the claim’s strongest body yet',
      'b9 · the mass state — the counted load'
    ]
  },
  {
    slide: 3, key: 's7', title: 'Scene 7 · Claims on Gold: Portability Through Trust',
    note: 'Gold’s weight answered by architecture: the weaknesses named on the body, the coin, the vault — and the certificate traveling out of the vault’s orbit with the dependency line drawing back. The trade named honestly.',
    beats: [
      'b1 · the weaknesses, on the body that has them',
      'b2 · the body becomes the coin',
      'b3 · custody — the gold stops',
      'b4 · the detachment — the certificate traveled, the line back',
      'b5 · “Portability improved.” / “Trust moved to the issuer.”'
    ]
  }
];

// [file, slide, from-build (null = cold entry), wait after the advance (ms), caption]
const GESTURES = [
  ['g-s5-entry-1', 1, null, 1400, 'S5 entry · the held claim finds its light where Scene 4 left it resting'],
  ['g-s5-entry-2', 1, null, 2900, 'S5 entry · the claim crosses into the act; the carrier begins to form'],
  ['g-s5-handoff', 1, 0, 900, 'S5 b1→b2 · the carrier hands the stage to the record'],
  ['g-s5-transform', 1, 3, 1500, 'S5 b4→b5 · the transformation — the camera opens, the goods stay riding the band'],
  ['g-s5-evidence', 1, 4, 1400, 'S5 b5→b6 · the receipt lands in the severance’s own reveal'],
  ['g-s5-return', 1, 5, 1100, 'S5 b6→b7 · the same claim returns — the argument made visible'],
  ['g-s5s6-cut', 2, null, 900, 'S5→S6 · the authored cut — the composition clears as the study reveals', 'morph'],
  ['g-s6-wave', 2, 3, 1300, 'S6 b4→b5 · the radioactive row pulses out — the legacy wave, mid-flight'],
  ['g-s6-mass', 2, 7, 2600, 'S6 b8→b9 · the counted load stacking — one, four, twelve'],
  ['g-s6s7-morph', 3, null, 1200, 'S6→S7 · the morph — the diagram recedes, the composition returns', 'morph'],
  ['g-s7-travel-1', 3, 2, 1100, 'S7 b3→b4 · the certificate travel — the vault settles into custody'],
  ['g-s7-travel-2', 3, 2, 2000, 'S7 b3→b4 · the certificate leaves the vault’s orbit'],
  ['g-s7-travel-3', 3, 2, 3000, 'S7 b3→b4 · the dependency line draws back — it went, and it still owes']
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

  const ready = async () => {
    await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const settled = async () => {
    await page.waitForFunction(() => {
      if (window.__deck && window.__deck.transitioning) return false;
      const a = window.__act2;
      if (a && !a.settled()) return false;
      return document.getAnimations()
        .filter((an) => an.playState === 'running' || an.playState === 'pending').length === 0;
    }, null, { timeout: 40000 });
  };
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck._hideChrome());
    await page.waitForFunction(() => {
      const c = document.querySelector('.deck-chrome');
      return !c || getComputedStyle(c).opacity === '0';
    }, null, { timeout: 15000 });
    await page.waitForTimeout(120);
  };
  const enter = async (slide, build) => {
    await page.goto(`${BASE}/?proto=act2&slide=${slide}`, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.__deck && !window.__deck.transitioning,
      null, { timeout: 30000 });
    if (build != null && build > 0) {
      await page.evaluate(([i, b]) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
      }, [slide - 1, build]);
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
    }
    await ready();
  };

  // ---- the settled frames -----------------------------------------------------
  const frames = [];
  for (const sc of SCENES) {
    for (let b = 0; b < sc.beats.length; b += 1) {
      await freshPage();
      await enter(sc.slide, b);
      await settled();
      await hideChrome();
      const file = `${sc.key}-b${b + 1}.png`;
      await page.screenshot({ path: path.join(OUT, file), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      frames.push({ file, scene: sc.key, caption: sc.beats[b] });
      console.log(`state  ${file.padEnd(14)} ${sc.beats[b]}`);
    }
  }

  // ---- the gestures, mid-flight ----------------------------------------------
  const gestures = [];
  for (const [file, slide, from, wait, caption, kind] of GESTURES) {
    await freshPage();
    if (kind === 'morph') {
      // A boundary gesture: enter the PREVIOUS scene at its end, hide the
      // chrome, then advance across the boundary and catch the morph.
      const prev = SCENES[slide - 2];
      await enter(prev.slide, prev.beats.length - 1);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
    } else if (from == null) {
      // A cold entry's own gesture: reload and catch it mid-flight.
      await enter(slide, 0);
      await hideChrome();
      await page.reload({ waitUntil: 'networkidle' });
      await ready();
      await page.evaluate(() => window.__deck._hideChrome());
    } else {
      await enter(slide, from);
      await settled();
      await hideChrome();
      await page.evaluate(() => window.__deck.advance());
    }
    await page.waitForTimeout(wait);
    await page.screenshot({ path: path.join(OUT, `${file}.png`), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    gestures.push({ file: `${file}.png`, caption });
    console.log(`flight ${(file + '.png').padEnd(20)} ${caption}`);
  }

  // ---- the strip page ---------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const fig = (f) => `
  <figure><a href="./${f.file}" target="_blank"><img src="./${f.file}" loading="lazy" alt="${f.file}"></a>
  <figcaption>${esc(f.caption)}</figcaption></figure>`;
  const sceneBlocks = SCENES.map((sc) => `
<h2>${esc(sc.title)}</h2>
<p class="lang">${esc(sc.note)}</p>
<div class="row">${frames.filter((f) => f.scene === sc.key).map(fig).join('')}</div>`).join('\n');

  fs.writeFileSync(path.join(OUT, 'strip.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch B — the capture strip · Session 1</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:48px 0 6px; font-weight:500; }
  p.note, p.lang { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 14px; max-width:1020px; line-height:1.65; }
  .row { display:flex; flex-wrap:wrap; gap:22px; }
  figure { margin:0; width:448px; }
  img { display:block; width:448px; height:252px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:6px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.55; }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Batch B — the capture strip · Session 1 (Scenes 5–7)</h1>
<p class="note">The 22 settled states of Scenes 5–7 as the route runs them — the same pixels the landed-state
proof compares — and the session's new connective motion caught mid-flight beneath them. <b>This strip is the
record, not the review: the review is the act, running, at the viewing that ruling 3 makes the gate.</b>
Session 2 completes the strip with Scenes 8–10 and the splice.</p>
${sceneBlocks}
<h2>The connective motion, mid-flight</h2>
<p class="lang">What the settled frames cannot show: the claim's entry from Scene 4's world, the handoff to the
record, the transformation under the rails law, the evidence landing, the return, both act boundaries, a legacy
wave, the counted load stacking, and the certificate travel at three points of its gesture.</p>
<div class="row">${gestures.map(fig).join('')}</div>
</body></html>`);

  console.log(`\n${frames.length} settled states · ${gestures.length} gestures -> review/batch-b/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
