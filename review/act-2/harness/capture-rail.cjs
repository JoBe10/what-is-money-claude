// Act II rail states — the capture pipeline (docs/act-2-rail-states-brief.md §2).
//
// Renders every NEW rail state from rail.mjs at 1920×1080, carries the
// overlay-interior states byte-identically from the approved states sheet
// (a file copy, never a re-render — the r2 carry discipline), and writes the
// sheet the presenter will read AS A FLIPBOOK: every cell in beat order, one
// scene per section, the review protocol stated in plain English at the top.
//
// Usage: node capture-rail.cjs [--port 5273] [--cells a,b,c]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const REPO = path.join(__dirname, '..', '..', '..');
const OUT = path.join(__dirname, '..', 'rail');
const ONLY = (flag('--cells', '') || '').split(',').map((s) => s.trim()).filter(Boolean);

const SEED_SCRIPT = () => {
  const SEED = 0x2545F491;
  let s = SEED >>> 0;
  Math.random = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
};

const SCENES = [
  ['S5', 'Scene 5 — The Function Stayed. The Carrier Changed. (8 beats)'],
  ['S6', 'Scene 6 — Gold: Scarcity in Matter (9 beats)'],
  ['S7', 'Scene 7 — Claims on Gold: Portability Through Trust (5 beats)'],
  ['S8', 'Scene 8 — Fiat: Money Becomes Information (5 beats)'],
  ['S9', 'Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats)'],
  ['S10', 'Scene 10 — The Trade-Off Keeps Moving (5 beats)']
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const errors = [];
  let page;
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.addInitScript(SEED_SCRIPT);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__rail = await import('/review/act-2/harness/rail.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__rail.cellMeta());
  const ids = Object.keys(meta).sort((a, b) => meta[a].ord - meta[b].ord);

  // ---- carries: byte-identical by construction ------------------------------
  let carried = 0;
  for (const id of ids) {
    if (!meta[id].carriedFrom) continue;
    const src = path.join(REPO, meta[id].carriedFrom);
    fs.copyFileSync(src, path.join(OUT, `${id}.png`));
    carried += 1;
    console.log(`carry  ${id.padEnd(16)} <- ${meta[id].carriedFrom} (byte-identical copy)`);
  }

  // ---- renders --------------------------------------------------------------
  const toRender = ids.filter((id) => !meta[id].carriedFrom)
    .filter((id) => !ONLY.length || ONLY.includes(id));
  let shots = 0;
  for (const id of toRender) {
    if (shots > 0 && shots % 8 === 0) await freshPage();
    shots += 1;
    await page.evaluate((cellId) => window.__rail.buildCell(cellId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(320);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`cell   ${id.padEnd(16)} ${String(meta[id].kind).padEnd(10)} ${meta[id].scene} b${meta[id].beat}`);
  }
  if (toRender.length) await page.evaluate(() => window.__rail.teardown());

  // ---- the sheet — a flipbook -----------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const figure = (id) => {
    const m = meta[id];
    const kindNote = {
      rail: 'rail', featured: 'featured moment', statement: 'statement',
      seam: 'overlay seam — entry', return: 'overlay seam — return', carried: 'carried, approved bytes'
    }[m.kind] || m.kind;
    return `
    <figure data-kind="${m.kind}">
      <a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" loading="lazy" /></a>
      <figcaption>
        <b>${id}</b> · ${esc(m.scene)} b${m.beat} <span class="pill pill--${m.kind}">${esc(kindNote)}</span>
        <br>${esc(m.caption)}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
      </figcaption>
    </figure>`;
  };

  const sceneSections = SCENES.map(([key, title]) => {
    const list = ids.filter((id) => meta[id].scene === key);
    if (!list.length) return '';
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const counts = {};
  ids.forEach((id) => { counts[meta[id].kind] = (counts[meta[id].kind] || 0) + 1; });

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II — the rail states · the staging amendment rendered</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13.5px; color:rgba(255,255,255,.62); margin:0 0 12px; max-width:1040px; line-height:1.7; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 14px; font-weight:500; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-kind="seam"] img, figure[data-kind="return"] img { outline:1px solid rgba(255,255,255,.22); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--rail { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--featured { color:#FFD9A6; border-color:rgba(255,217,166,.4); }
  .pill--seam, .pill--return { color:rgba(255,255,255,.6); }
  .pill--statement { color:rgba(255,255,255,.45); }
  .pill--carried { color:rgba(255,255,255,.3); }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Act II — the rail states · the staging amendment, rendered</h1>
<p class="note"><b>How to review this sheet: walk it top to bottom like a flipbook of the act.</b>
The cells are every settled state of Act II's 37 beats, in the exact order the film plays them —
the rail growing to the right as history advances, the overlays rising over it and returning,
the statements landing over the receded record. At every frame there is a single question:
<b>can you follow money's history by eye alone?</b> If the answer stays yes from the first frame
to the last, the staging is ready for implementation; if any frame breaks the thread, name that
frame, and it comes back re-staged. There are no candidates on this sheet — this is the approved
map rendered, and the few places the map genuinely underdetermined a composition are flagged in
plain English in the report (docs/act-2-rail-states-report.md §flags), each with the one honest
rendering it received.</p>
<p class="note">What the frames carry: every prior station stays visible as the rail grows (the
cumulative rule); the goods ride the object band above the line with the regenerated gold; an
undefeated station holds full voice and a fallen one dims with its wounds (the survival-brightness
ruling — watch SHELLS stay alive until Zanzibar lands at S5 b6); the claim disc is the traveler,
riding the line at its current carrier, never a station; the six overlays enter over the
deep-dimmed rail and return with their answers landed as station rows. Cells marked
<i>carried</i> are the approved overlay interiors, byte-identical to the states sheet — nothing
about them changed and nothing about them is asked.</p>
${sceneSections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-rail-states',
    authority: 'docs/act-2-staging-amendment.md — presenter-approved verbatim, 1 September 2026 (master §13)',
    beatMap: { S5: 8, S6: 9, S7: 5, S8: 5, S9: 5, S10: 5, total: 37 },
    sheet: {
      cells: ids.length,
      beats: 37,
      note: 'every beat has exactly one settled frame; the two overlays whose return seam is not itself a mapped beat (the mass state, the chart) carry an extra -return cell, so the sheet is 39 files over 37 beats'
    },
    reviewProtocol: 'The presenter walks sheet.html top to bottom like a flipbook of the act. The single question at every frame: can I follow money’s history by eye alone? He returns either the go-ahead or the frames that break the thread.',
    counts,
    claimPath: {
      note: 'the traveler’s station per stretch — derived from the map’s carrier chain, flagged in the report',
      path: 'shells (S5 b1–b6) → metals (S5 b7–b8) → gold (S6) → coinage (S7 b1–b2) → claim on gold (S7 b3–b5) → ledger (S8 through S10 — the carrier money wears today)'
    },
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${toRender.length} rendered · ${carried} carried · ${ids.length} cells -> review/act-2/rail/`);
  console.log(Object.entries(counts).map(([k, v]) => `${v} ${k}`).join(' · '));
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
