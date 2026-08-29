// Prologue — the beat-state sheet capture
// (docs/gate-2-close-and-prologue-states-brief.md §3).
//
// One pass and an index:
//   1. Every cell in states.mjs, full-size at 1920×1080 — except the carried
//      approvals (p1-f1, p1-f2, p1-f3, p2-f1-plain), whose approved PNGs are
//      copied byte-identical into their cells: their inputs are unchanged, and
//      the hours field's per-unit jitter is Math.random-based, so a re-render
//      would replace approved pixels with a fresh sampling.
//   2. sheet.html — an index that links every full-size image (the presenter
//      reviews at 100%, never from thumbnails) — and states.json, the
//      per-cell record.
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
const FRAMES = path.join(__dirname, '..', '..', 'frames-a', 'frames');
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__states = await import('/review/prologue/harness/states.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__states.cellMeta());
  const ids = Object.keys(meta);

  let shots = 0;
  for (const id of ids) {
    if (meta[id].carriedFrom) {
      fs.copyFileSync(path.join(FRAMES, `${meta[id].carriedFrom}.png`),
        path.join(OUT, `${id}.png`));
      console.log(`carry  ${id}  <-  frames-a/${meta[id].carriedFrom}.png (byte-identical)`);
      continue;
    }
    if (shots > 0 && shots % 8 === 0) await freshPage();
    shots += 1;
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`cell   ${id}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- the index and the record --------------------------------------------
  const SCENES = [
    ['Scene P1 — Eighty Thousand Hours / What Is Money? (11 states + the entry black)',
      (id) => id.startsWith('p1-')],
    ['Scene P2 — The Stakes (2 states)', (id) => id.startsWith('p2-')]
  ];

  const figure = (file, caption) => `
    <figure><a href="./${file}.png" target="_blank"><img src="./${file}.png" alt="${file}" /></a>
    <figcaption><b>${file}</b> · ${caption} · <a href="./${file}.png" target="_blank">full size</a></figcaption></figure>`;

  const sections = SCENES.map(([title, match]) =>
    `<h2>${title}</h2><div class="row">${ids.filter(match).map((id) => figure(id, meta[id].caption)).join('')}</div>`
  ).join('\n');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Prologue — the beat-state sheet</title>
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
<h1>Prologue — the beat-state sheet · every state of P1 and P2 under the full-coverage rule</h1>
<p class="note"><b>Review protocol (the full-coverage rule):</b> every cell is examined at full size — click any image
or its “full size” link — and receives a per-cell verdict: <b>approved / approved-with-notes / redo / select A|B</b>.
No bulk verdicts; an unexamined cell stays unreviewed and blocks motion on its beat. CARRIED marks an approved frame
shipping byte-identical (p1-f1, p1-f2, p1-f3, p2-f1-plain — inputs unchanged). The one open selection is <b>C1, the
bitcoin form (p1-b8-a vs p1-b8-b)</b>; C2, the counter treatment, is determined by P1-F1’s approved counter. The beat
count is the script’s 11 advances (the §1 map’s 10-beat compression is flagged in the report). No accent color and no
Claim Mark appear anywhere in the Prologue — the disc is born in Scene 3.</p>
${sections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'prologue-states',
    beats: { p1: 11, p2: 2 },
    entryBlack: 'p1-b0',
    beatCountAuthority: 'the verbatim script’s [→] count (docs/batch-a-package.md §2) — 11 advances; the §1 map’s 10-beat compression of condensation-into-first-form is flagged in the session report, per the close brief',
    carried: {
      'p1-b2': 'p1-f1',
      'p1-b5': 'p1-f2',
      'p1-b11': 'p1-f3',
      'p2-b1': 'p2-f1-plain'
    },
    openDecisions: {
      C1: 'the bitcoin form — p1-b8-a (the coin render, on-grade and off-argument per manifest V-1) vs p1-b8-b (structured light from the unit grammar); presenter selects',
      C2: 'determined — the counter treatment is P1-F1’s approved s1q-hours__counter; rendered as the single determined cell p1-b1'
    },
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/prologue/states/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
