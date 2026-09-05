// Gate 2 — the beat-state sheet capture (docs/gate-2-states-brief.md §2).
//
// Two passes and an index:
//   1. The legacy deck's spend-or-save slide (4.05), every build captured as a
//      REFERENCE cell — the bar D7's two systems must beat.
//   2. Every cell in states.mjs, full-size at 1920×1080.
//   3. sheet.html — an index that links every full-size image (the presenter
//      reviews at 100%, never from thumbnails) — and states.json, the per-cell
//      record.
//
// Usage: node capture-states.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'states');
fs.mkdirSync(OUT, { recursive: true });

const LEGACY = {
  id: '4-05-spend-or-save',
  builds: [
    'build 0 — the claim, inherited and centered',
    'build 1 — the fork: two mirrored roads, both named',
    'build 2 — SPEND: the claim takes the road; the goods; exchange closed',
    'build 3 — SAVE: the claim carried forward; the shell; exchange open',
    'build 4 — the law: spending closes it, saving keeps it open'
  ]
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
  await freshPage();

  const ready = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
  };
  const hideChrome = async () => {
    await page.evaluate(() => window.__deck && window.__deck._hideChrome());
    await page.waitForTimeout(450);
  };

  // ---- 1 · the legacy references -------------------------------------------
  await page.goto(`${BASE}/?slide=${LEGACY.id}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__deck, null, { timeout: 60000 });
  await ready();
  await page.waitForTimeout(800);
  await hideChrome();
  for (let b = 0; b < LEGACY.builds.length; b += 1) {
    if (b > 0) {
      await page.evaluate(() => window.__deck.advanceStep());
      await page.waitForTimeout(1300);   // the slide's CSS reveals settle
      await hideChrome();
    }
    await page.screenshot({ path: path.join(OUT, `ref-4-05-b${b}.png`) });
    console.log(`ref    4-05 build ${b}`);
  }

  // ---- 2 · the cells -------------------------------------------------------
  await freshPage();
  await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
  let meta = await page.evaluate(async () => {
    window.__states = await import('/review/gate-2/harness/states.mjs');
    return window.__states.cellMeta();
  });
  const ids = Object.keys(meta);

  let shots = 0;
  for (const id of ids) {
    if (shots > 0 && shots % 8 === 0) {
      await freshPage();
      await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
      await page.evaluate(async () => {
        window.__states = await import('/review/gate-2/harness/states.mjs');
      });
    }
    shots += 1;
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await ready();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`cell   ${id}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- 3 · the index and the record ----------------------------------------
  const SCENES = [
    ['Scene 2 — The Direct Exchange (5 beats)', (id) => id.startsWith('s2-')],
    ['Scene 3 — The Breakthrough (9 beats)', (id) => id.startsWith('s3-')],
    ['Scene 4 — Spend or Save (5 beats) — and the bar it must clear', (id) => id.startsWith('s4-')]
  ];

  const figure = (file, caption) => `
    <figure><a href="./${file}.png" target="_blank"><img src="./${file}.png" alt="${file}" /></a>
    <figcaption><b>${file}</b> · ${caption} · <a href="./${file}.png" target="_blank">full size</a></figcaption></figure>`;

  const sections = SCENES.map(([title, match]) => {
    let cellsHtml = ids.filter(match).map((id) => figure(id, meta[id].caption)).join('');
    if (title.startsWith('Scene 4')) {
      const refs = LEGACY.builds.map((cap, b) =>
        figure(`ref-4-05-b${b}`, `REFERENCE — the legacy deck’s 4.05, ${cap}`)).join('');
      cellsHtml = refs + cellsHtml;
    }
    return `<h2>${title}</h2><div class="row">${cellsHtml}</div>`;
  }).join('\n');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Gate 2 — the beat-state sheet</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 64px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 12px; max-width:980px; line-height:1.6; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:44px 0 16px; font-weight:500; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.06em; color:rgba(255,255,255,.5); line-height:1.55; }
  figcaption b { color:rgba(255,255,255,.8); font-weight:600; }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Gate 2 — the beat-state sheet · every state of Scenes 2–4, with candidates at every open decision</h1>
<p class="note"><b>Review protocol (the full-coverage rule):</b> every cell is examined at full size — click any image
or its “full size” link — and receives a per-cell verdict: <b>approved / approved-with-notes / redo / select A|B|C</b>.
No bulk verdicts; an unexamined cell stays unreviewed and blocks motion on its beat. CARRIED marks a composition already
approved at the frames stage; REFERENCE marks the legacy deck’s treatment — the bar Scene 4’s two systems must beat;
everything labeled D1–D8 is a candidate awaiting selection. s2-f2 is formally reopened and superseded by the S2 beat 3–4
candidates (presenter-ruled 26 August 2026).</p>
${sections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'gate-2-states',
    beats: { s2: 5, s3: 9, s4: 5 },
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    references: LEGACY.builds.map((caption, b) => ({
      id: `ref-4-05-b${b}`, file: `ref-4-05-b${b}.png`, status: 'reference',
      caption: `The legacy deck’s 4.05 — ${caption}`
    })),
    retired: [{
      still: 's2-f2',
      note: 'Formally reopened and superseded by the S2 beat 3–4 candidates (presenter-ruled 26 August 2026); kept on file in review/frames-a/frames/.'
    }],
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells + ${LEGACY.builds.length} references -> review/gate-2/states/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
