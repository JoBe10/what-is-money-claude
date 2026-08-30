// Batch A — the capture strip (docs/batch-a-implementation-brief.md §5).
//
// Every settled state of the five new scenes, captured out of the REAL DECK at
// 1920×1080 — not out of a states pipeline — because what this strip records is
// the film as it now runs. Plus ten gestures caught mid-flight, which the
// settled frames cannot show: the hours arriving, the absorption at three
// points of its 4.6 seconds, a form becoming the next, the light coming up on Act I, the strain that fails, the
// claim's birth, the two-phase demonstration, and the redemption.
//
// The settled frames are the same pixels the landed-state proof compares; this
// harness exists to put them, and the motion between them, in front of the
// presenter's eye in one page.
//
// Usage: node capture-batch-a.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'strip');
fs.mkdirSync(OUT, { recursive: true });

const SCENES = [
  {
    slide: 1, key: 'p1', title: 'P1 · Eighty Thousand Hours / What Is Money?',
    note: 'Eleven beats and the authored entry black. The field fills to eighty thousand, is absorbed into the restored legacy ball, and shape-shifts through five forms — one advance each — before the frame clears to the question and the title.',
    beats: [
      'entry · the authored black, spoken over',
      'b1 · the field complete, the counter at 80,000',
      'b2 · the hours line',
      'b3 · the condensation’s landing — the restored legacy ball (PORT, 30 Aug)',
      'b4 · SHELL',
      'b5 · GOLD',
      'b6 · PAPER',
      'b7 · LEDGER — the glowing entry (ruled 29 Aug)',
      'b8 · BITCOIN — the coin (C1 = A, ruled 29 Aug)',
      'b9 · the forms line, alone',
      'b10 · the question, alone',
      'b11 · the title'
    ]
  },
  {
    slide: 2, key: 'p2', title: 'P2 · The Stakes',
    note: 'One line on black, and it holds: the promise and the handoff to the exchange are carried entirely in the voice. The two beats are identical by design.',
    beats: ['b1 · the mercy line', 'b2 · the hold — the screen does not change']
  },
  {
    slide: 3, key: 's2', title: 'Scene 2 · The Direct Exchange',
    note: 'The stage assembles with warmth; the service is delivered; the frame turns to what the surgeon wants; the return fails as an absence — no line is ever drawn — and the binding line lands over the two people it is about.',
    beats: [
      'b1 · the assembled stage, capabilities at full voice',
      'b2 · the service delivered',
      'b3 · the wants, and the first strain',
      'b4 · the second, harder strain, subsided',
      'b5 · the binding line'
    ]
  },
  {
    slide: 4, key: 's3', title: 'Scene 3 · The Breakthrough',
    note: 'The heart of the film. The claim is born from the void the failed return left — the film’s first orange — detaches from the patient, and the interval opens: someone else, somewhere else, later.',
    beats: [
      'b1 · the birth, settled',
      'b2 · the contraction complete',
      'b3 · the patient released',
      'b4 · SOMEONE ELSE',
      'b5 · SOMEWHERE ELSE',
      'b6 · LATER',
      'b7 · the completion, two phases in one frame',
      'b8 · the reset to the held claim',
      'b9 · the separation'
    ]
  },
  {
    slide: 5, key: 's4', title: 'Scene 4 · Spend or Save',
    note: 'The fork, in system B throughout: two mirrored roads, the unchosen one dormant rather than absent. Spend closes the exchange; save keeps it open, and the road runs on into time it cannot see.',
    beats: [
      'b1 · the fork',
      'b2 · SPEND — the goods at the road’s end, contained',
      'b3 · the fork re-posed',
      'b4 · SAVE — the claim at rest on the road',
      'b5 · the closing pair'
    ]
  }
];

// [file, slide, from-build, wait after the advance (ms), caption]
const GESTURES = [
  ['g-p1-fill', 1, 0, 4200, 'P1 b0→b1 · the hours arriving, the counter climbing'],
  // The absorption at three points, because one frame cannot show a gesture
  // that runs 4.6s: the ball blooming just past its 0.22 emergence, the void
  // open with the field streaming inward, and the last of the field arriving.
  ['g-p1-condense-1', 1, 2, 1300, 'P1 b2→b3 · the absorption begins — the front opens, the ball blooms'],
  ['g-p1-condense-2', 1, 2, 2400, 'P1 b2→b3 · the absorption, mid-gesture — the hours falling inward'],
  ['g-p1-condense-3', 1, 2, 3900, 'P1 b2→b3 · the absorption near its end — the last of the field arriving'],
  ['g-p1-morph', 1, 5, 260, 'P1 b5→b6 · gold becoming paper, mid-dissolve'],
  ['g-s2-entry', 3, null, 1500, 'Scene 2 · the light coming up — the cold entry'],
  ['g-s2-strain', 3, 2, 2600, 'Scene 2 b2→b3 · the strain toward the surgeon'],
  ['g-s3-birth', 4, null, 3200, 'Scene 3 · the pool, mid-birth'],
  ['g-s3-demo', 4, 5, 1400, 'Scene 3 b6→b7 · the claim departing as the shoes arrive'],
  ['g-s4-spend', 5, 0, 1700, 'Scene 4 b1→b2 · the claim travelling the spend road']
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
      const a = window.__act1;
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
    await page.waitForTimeout(150);
  };
  const mountCold = async (slide, build) => {
    await freshPage();
    await page.goto(`${BASE}/?slide=${slide}`, { waitUntil: 'networkidle' });
    await page.evaluate(([i, b]) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: b }));
    }, [slide - 1, build]);
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await settled();
    await hideChrome();
  };

  const captured = [];
  for (const sc of SCENES) {
    for (let b = 0; b < sc.beats.length; b += 1) {
      await mountCold(sc.slide, b);
      const file = `${sc.key}-b${b}.png`;
      await page.screenshot({ path: path.join(OUT, file), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
      captured.push(file);
    }
    console.log(`${sc.key}: ${sc.beats.length} settled states`);
  }

  for (const [file, slide, from, wait, caption] of GESTURES) {
    if (from === null) {
      // The scene's own cold-entry gesture: mount at build 0 and catch it.
      await freshPage();
      await page.goto(`${BASE}/?slide=${slide}`, { waitUntil: 'networkidle' });
      await page.evaluate(([i]) => {
        sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: i, buildStep: 0 }));
      }, [slide - 1]);
      await page.reload({ waitUntil: 'domcontentloaded' });
      await ready();
      await page.evaluate(() => window.__deck._hideChrome());
      await page.waitForTimeout(wait);
    } else {
      await mountCold(slide, from);
      await page.evaluate(() => window.__deck.advanceStep());
      await page.waitForTimeout(wait);
    }
    await page.screenshot({ path: path.join(OUT, `${file}.png`), clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    captured.push(`${file}.png`);
    console.log(`gesture ${file} :: ${caption}`);
  }

  // ---- the strip page ----
  const cell = (src, caption) =>
    `      <figure><a href="./${src}" target="_blank"><img src="./${src}" alt="${src}" /></a>` +
    `<figcaption>${caption}</figcaption></figure>`;
  const groups = SCENES.map((sc) => `<h2>${sc.title}</h2>
<p class="lang">${sc.note}</p>
<div class="row">
${sc.beats.map((cap, i) => cell(`${sc.key}-b${i}.png`, cap)).join('\n')}
</div>`).join('\n');
  const gestures = `<h2>The gestures, mid-flight</h2>
<p class="lang">A settled frame cannot show motion, and the motion is half the argument. These ten are caught in the middle of their gesture, out of the running deck — the absorption at three points of it, because that one runs 4.6 seconds.</p>
<div class="row">
${GESTURES.map(([f, , , , cap]) => cell(`${f}.png`, cap)).join('\n')}
</div>`;

  fs.writeFileSync(path.join(OUT, 'strip.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch A — the Prologue and Act I in the deck</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 64px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 36px; max-width:980px; line-height:1.6; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:44px 0 6px; font-weight:500; }
  p.lang { font-size:12px; color:rgba(255,255,255,.45); margin:0 0 16px; max-width:980px; line-height:1.6; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  a { display:block; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.45); line-height:1.5; }
</style></head><body>
<h1>Batch A — the Prologue and Act I, in the deck</h1>
<p class="note">Thirty-three settled states, captured out of the running deck at 1920×1080 — every one of them proven identical to its
presenter-approved cell at zero differing pixels (<b>landed-proof.json</b>), and Act I's nineteen proven identical to the closed
prototype as well (<b>transplant-proof.json</b>). Click any frame for full size. <b>This strip is a record, not the review:</b>
the review is the deck itself, run from the top.</p>
${groups}
${gestures}
</body></html>`);

  // A fresh page for the strip: the capture page has just navigated forty-odd
  // times and its renderer aborts the next navigation often enough to matter.
  await freshPage();
  await page.setViewportSize({ width: 1860, height: 1200 });
  await page.goto(`${BASE}/review/batch-a/strip/strip.html`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, 'strip.png'), fullPage: true });

  fs.writeFileSync(path.join(OUT, 'strip.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-a',
    settled: 33,
    gestures: GESTURES.length,
    captured,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${captured.length} frames + strip -> review/batch-a/strip/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
