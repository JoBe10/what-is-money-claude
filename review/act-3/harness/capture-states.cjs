// Act III — the beat-state sheet capture, POST-APPROVAL (the Batch C
// implementation brief §1; the r2 capture this file amends is in history at
// tag `act-3-states-r2`).
//
// THE SHEET IS NOW THE RECORD OF THE APPROVED SET, not a review request.
// The presenter's two answers landed 2 September 2026 (master §13):
//   · SCENE 15 IS CANDIDATE A — the A cells are the approved S15 states;
//     candidate B retires to file (on disk, review 'on-file').
//   · THE GO-AHEAD IS GIVEN — the r2 sheet approved in full, the brick
//     glyph and the s14-b4 re-render seen and accepted by name; the
//     fourteen flags closed as accepted records.
// And ruling 3 of the same brief replaces the `medium` render (the handshake
// read as agreement, not exchange): the nine medium-bearing cells re-render
// as THE UPDATED APPROVED STATES — s11-b3 · s11-b4 · s11-b5 · s12-b1 ·
// s13-b5 · s13-b6 · s14-b2 · s14-b3 · s14-b4.
//
// Modes:
//   (default)        capture every non-carried cell, then cut the record.
//   --record-only    re-cut sheet.html + states.json from the meta and the
//                    PNGs on disk; no browser screenshots of cells.
//   --only a,b,c     capture exactly the named cells; every other PNG stays
//                    byte-identical on disk (the record proof checks this).
//
// CARRIED: s14-b1 keeps its r1 bytes always (meta `carried`).
// RETIRED: the r1 stagings stay on file — s12-b3-block, s15-b*-boxes.
//
// Usage: node capture-states.cjs [--port 5273] [--record-only] [--only ids]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const RECORD_ONLY = args.includes('--record-only');
const ONLY = flag('--only', null);
const ONLY_SET = ONLY ? new Set(ONLY.split(',').map((s) => s.trim()).filter(Boolean)) : null;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'states');
fs.mkdirSync(OUT, { recursive: true });

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const SCENES = [
  ['S11', 'Scene 11 — Three Familiar Jobs (5 beats)'],
  ['S12', 'Scene 12 — We Already Split Those Jobs (4 beats)'],
  ['S13', 'Scene 13 — The Order of Monetization (6 beats)'],
  ['S14', 'Scene 14 — The Coffee Objection (4 beats)'],
  ['S15', 'Scene 15 — The Tower (6 beats · CANDIDATE A SELECTED)']
];

const RETIRED = [
  { file: 's12-b3-block.png', was: 's12-b3', staging: 'the r1 dated-fact block over the deep-dimmed columns — retired by r2 ruling 2' },
  { file: 's15-b1-boxes.png', was: 's15-b1', staging: 'the three-box tower, build 1 — superseded by r2 ruling 4' },
  { file: 's15-b2-boxes.png', was: 's15-b2', staging: 'the three-box tower, build 2 — superseded by r2 ruling 4' },
  { file: 's15-b3-boxes.png', was: 's15-b3', staging: 'the three-box tower, build 3 — superseded by r2 ruling 4' },
  { file: 's15-b4-boxes.png', was: 's15-b4', staging: 'the three-box tower, build 4 — superseded by r2 ruling 4' },
  { file: 's15-b5-boxes.png', was: 's15-b5', staging: 'the three-box tower, build 5 — superseded by r2 ruling 4' },
  { file: 's15-b6-boxes.png', was: 's15-b6', staging: 'the three-box tower, build 6 with the r1 disc — superseded by r2 rulings 1 and 4' }
];

const CLASS_NOTE = {
  approved: ['THE APPROVED SET',
    'Every beat state of the act, approved in full at the flipbook walk of 2 September 2026 — the go-ahead is given, the fourteen flags are closed as accepted records, and these cells are the visual authority for the Batch C implementation: a settled scene state that is not its approved cell at zero pixels is a defect. The nine medium-bearing cells carry the replaced medium mark (ruling 3) as the updated approved states.'],
  'on-file': ['ON FILE — the unselected candidate',
    'Candidate B, the convergence of claims. Scene 15 is candidate A by the presenter’s selection; B stays on file under the aesthetic law so the selection can be changed by changing one letter, never by redrawing.']
};

(async () => {
  const errors = [];
  let browser = null;
  let page = null;
  let meta;

  if (RECORD_ONLY) {
    // The meta without a browser: states.mjs is an ES module for the page,
    // but its CELLS metadata is what we need — import it through node's ESM
    // loader with the page-root specifiers stubbed is more machinery than
    // the job wants, so record-only still uses the page for the import, just
    // never screenshots. Falls through to the same path with SKIP_ALL.
  }

  browser = await chromium.launch();
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.addInitScript(SEED_SCRIPT);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__states = await import('/review/act-3/harness/states.mjs');
    });
  };
  await freshPage();

  meta = await page.evaluate(() => window.__states.cellMeta());
  const ids = Object.keys(meta);

  let shots = 0;
  for (const id of ids) {
    const wants = !RECORD_ONLY && (!ONLY_SET || ONLY_SET.has(id)) && !meta[id].carried;
    if (!wants) {
      if (!fs.existsSync(path.join(OUT, `${id}.png`))) {
        throw new Error(`cell ${id} is not being captured and has no PNG on disk`);
      }
      const why = meta[id].carried ? 'CARRIED — byte-identical from r1'
        : (RECORD_ONLY ? 'record-only — bytes untouched' : 'outside --only — bytes untouched');
      console.log(`cell   ${id.padEnd(10)} ${String(meta[id].klass).padEnd(6)} ${why}`);
      continue;
    }
    if (shots > 0 && shots % 8 === 0) await freshPage();
    shots += 1;
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(320);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`cell   ${id.padEnd(10)} ${String(meta[id].klass).padEnd(6)} ${meta[id].review}${meta[id].system ? `  [candidate ${meta[id].system}]` : ''}  captured`);
  }
  if (!RECORD_ONLY) await page.evaluate(() => window.__states.teardown());

  // ---- the record ----------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const figure = (id) => {
    const m = meta[id];
    return `
    <figure data-review="${m.review}">
      <a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" loading="lazy" /></a>
      <figcaption>
        <b>${id}</b> · ${esc(m.scene)} b${m.beat}${m.system ? ` · <span class="cand">CANDIDATE ${m.system}${m.system === 'A' ? ' — SELECTED' : ' — ON FILE'}</span>` : ''} · <span class="frame">${esc(m.frame)}</span>
        <span class="pill pill--${m.review}">${esc(m.klass)}</span>${m.carried ? ' <span class="pill pill--carried">CARRIED</span>' : ''}
        <br>${esc(m.caption)}
        ${m.flag ? `<br><span class="flagline"><b>FLAG (closed by the approval):</b> ${esc(m.flag)}</span>` : ''}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
        <br><a href="./${id}.png" target="_blank">full size</a>
      </figcaption>
    </figure>`;
  };

  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const flagged = ids.filter((id) => meta[id].flag);
  const approvedSet = ids.filter((id) => meta[id].review === 'approved');

  const sceneSections = SCENES.map(([key, title]) => {
    if (key === 'S15') {
      const run = (sys, name) => {
        const list = ids.filter((id) => meta[id].scene === 'S15' && meta[id].system === sys)
          .sort((a, b) => meta[a].beat - meta[b].beat);
        return `<h3 class="run">${name}</h3><div class="row">${list.map(figure).join('')}</div>`;
      };
      return `<h2>${title}</h2>
${run('A', 'Candidate A — SELECTED (presenter, 2 Sep 2026): the approved S15 states')}
${run('B', 'Candidate B — on file (the unselected system, kept under the aesthetic law)')}`;
    }
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => meta[a].beat - meta[b].beat);
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const legend = Object.entries(CLASS_NOTE).map(([r, [title, note]]) =>
    `<h3 class="h--${r}">${title} · ${byReview(r).length} cells</h3><p class="lang">${note}</p>`).join('\n');

  const counts = ['approved', 'on-file']
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act III — the approved beat states · the record</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h3 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:22px 0 4px; font-weight:500; }
  h3.run { color:#F7931A; margin-top:30px; }
  h3.h--approved { color:#F7931A; }
  h3.h--on-file { color:rgba(255,255,255,.5); }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.7; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="approved"] img { outline:1px solid rgba(247,147,26,.35); }
  figure[data-review="on-file"] img { outline:1px dashed rgba(255,255,255,.18); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .cand { color:#F7931A; letter-spacing:.12em; }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .flagline { color:rgba(255,217,166,.6); }
  .flagline b { color:rgba(247,147,26,.7); }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--approved { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--on-file { color:rgba(255,255,255,.4); }
  .pill--carried { color:rgba(255,255,255,.4); border-style:dashed; }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:56px 0 0; }
</style></head><body>
<h1>Act III — the approved beat states · the record the implementation builds against</h1>
<p class="note"><b>This sheet is a record, not a review request.</b> The presenter's two answers landed on
2 September 2026: <b>Scene 15 is candidate A</b> (the proportional inverted tower — its six cells are the approved
S15 states, and candidate B stays on file), and <b>the go-ahead is given</b> — the whole r2 sheet approved, the
S12 brick glyph and the s14-b4 re-render seen and accepted by name, all fourteen flags closed as accepted records.
By ruling 3 of the same brief the <b>medium</b> render is replaced (the handshake read as agreement, not exchange)
and the nine medium-bearing cells — s11-b3 · s11-b4 · s11-b5 · s12-b1 · s13-b5 · s13-b6 · s14-b2 · s14-b3 · s14-b4 —
are re-rendered here as <b>the updated approved states</b>.</p>
<p class="note">The beat map stands at <b>25 beats</b> (S11 5 · S12 4 · S13 6 · S14 4 · S15 6). The disc holds the
triad's center wherever the home base appears; monetary assets appear on the ladder only as climbers; s14-b1 is
carried byte-identical from r1; the superseded r1 stagings stay on file (s12-b3-block, s15-b*-boxes). Cell classes:
<b>${counts}</b>. <b>The next gate is the act viewing</b>, after Session 2 splices the act into the deck.</p>
${legend}
<hr>
${sceneSections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-c-impl-1',
    beatMap: { S11: 5, S12: 4, S13: 6, S14: 4, S15: 6, total: 25 },
    cellCount: ids.length,
    beatMapAuthority: 'docs/batch-c-package.md §1 — frozen 2 September 2026',
    provenanceAuthority: 'docs/act-3-provenance.md as amended — 1 PORT (S12) · 3 ADAPT (S11, S13, S14) · S15 NEW closed by the candidate-A selection',
    approval: {
      date: '2 September 2026',
      authority: 'the Batch C implementation brief §1 (master §13, the three rulings)',
      selection: 'Scene 15 is CANDIDATE A — the proportional inverted tower; the A cells are the approved S15 states; candidate B on file',
      goAhead: 'the r2 sheet approved in full — the S12 brick glyph and the deliberate s14-b4 re-render seen and accepted by name; the fourteen flags closed as accepted records',
      mediumSwap: 'the medium render replaced (the handshake read as agreement, not exchange); the nine medium-bearing cells re-rendered as the updated approved states — s11-b3, s11-b4, s11-b5, s12-b1, s13-b5, s13-b6, s14-b2, s14-b3, s14-b4',
      gate: 'the act viewing, after the Session 2 splice'
    },
    approvedSet,
    discCells: ids.filter((id) => ['s11-b1', 's11-b2', 's11-b3', 's11-b4', 's11-b5', 's12-b1', 's14-b4'].includes(id)),
    carried: ids.filter((id) => meta[id].carried).map((id) => ({
      id,
      file: `${id}.png`,
      sha256: 'e7cc6fff9a1142573f5a30878505e8625f1c57ca1cac1b95f881167458821081',
      note: 'byte-identical from r1 — no ruling touches this cell'
    })),
    retired: RETIRED,
    counts: Object.fromEntries(['approved', 'on-file'].map((r) => [r, byReview(r).length])),
    flags: flagged.map((id) => ({ id, flag: meta[id].flag, status: 'closed by the approval of 2 September 2026' })),
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-3/states/ (${RECORD_ONLY ? 'record only' : ONLY ? `captured ${ONLY_SET.size}` : 'full capture'})`);
  console.log(counts);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
