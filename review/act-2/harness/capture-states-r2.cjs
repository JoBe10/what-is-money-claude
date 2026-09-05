// Act II states r2 — the ruled re-render pipeline (docs/act-2-states-r2-brief.md).
//
// The r1 capture rendered all 40 cells; this session's law is the opposite:
// ZERO-PIXEL PROOF ON EVERY UNTOUCHED CELL. So this harness renders ONLY the
// cells a ruling re-staged (`--cells`), carries selected renders to their new
// ids byte-identically (`--carry old.png:new.png` — a file copy, never a
// re-render, so the proof is by construction), and then regenerates the sheet
// index and the states record around the untouched artifacts, which are never
// re-encoded. `proof-r2.cjs` closes the loop by hashing every cell against
// tag `act-2-states`.
//
// The sheet is ordered by what it asks of the presenter, and — under the
// plain-English rule (AGENTS.md §4.10) — every section that asks him for
// anything says so in full sentences.
//
// Usage: node capture-states-r2.cjs [--port 5273] [--cells a,b,c] [--carry src:dst,src:dst]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'states');
const CELLS_TO_RENDER = (flag('--cells', '') || '').split(',').map((s) => s.trim()).filter(Boolean);
const CARRIES = (flag('--carry', '') || '').split(',').map((s) => s.trim()).filter(Boolean)
  .map((pair) => pair.split(':'));

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
  ['S6', 'Scene 6 — Gold: Scarcity in Matter (9 beats — restored to the legacy pacing)'],
  ['S7', 'Scene 7 — Claims on Gold: Portability Through Trust (5 beats)'],
  ['S8', 'Scene 8 — Fiat: Money Becomes Information (5 beats)'],
  ['S9', 'Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats)'],
  ['S10', 'Scene 10 — The Trade-Off Keeps Moving (5 beats)']
];

// The restored elimination gets its own section: no formal burden (ports,
// approved by provenance), but the presenter said what his test is, and the
// sheet puts the run where his eye will look for it.
const RESTORED = ['s6-b2', 's6-b3', 's6-b4', 's6-b5', 's6-b6', 's6-b7'];

const SECTIONS = [
  ['pending-review', 'VERIFY THE RULED RE-RENDERS', 'These cells were re-rendered on your rulings and are waiting for your check. The vault restage (s7-b4) asks one question: did the photographic restage land at the standard of the Act I finals — the vault holding the gold, the certificate traveled outward, one thin dependency line back? The two rails (s5-b5 and s10-b1) and the history line on the strip (s10-b2) ask: do the renders carry the goods as one object band above the line, at one scale across both rails, with the drawn line, station marks, wounds and gain/dependency text beneath exactly as they were?'],
  ['restored', 'THE RESTORED ELIMINATION · one wave per advance', 'Ruling 3 is struck, and these six cells return the periodic elimination to the legacy pacing — each cell rendered from the legacy build it corresponds to, one wave of eliminations per advance, one wave line at a time, the verdict at the end. They are ports, approved by provenance, so they carry no formal review burden. The test is the one you set: walked in order, the sequence should simply look like it always did.'],
  ['approved-selection', 'THE SELECTIONS, LANDED', 'Your three selections of 31 August, landed as beat cells. The counted load (s6-b9) and the hub dissolving (s9-b1) are the selected candidate renders carried byte-identical — nothing was re-rendered. The third selection, the custody-boundary logic, was restaged photographically at your order and stands under pending review above.'],
  ['approved-adapt', 'ADAPTATIONS — VERIFIED 31 AUGUST', 'The five adaptations you verified: on each, the one ruled change landed and nothing else moved. No further burden; they are kept here as the record.'],
  ['approved-port', 'APPROVED BY PROVENANCE', 'Ports. Every one of these is a proven legacy treatment transplanted — several of them by mounting the very component the legacy slides run, at the state they run it. They are approved by provenance and carry no review burden: look only if something appears wrong.'],
  ['determined', 'DETERMINED', 'Script landings on compositions that are already approved above. No new treatment, no decision — rendered under the full-coverage rule so the sheet is complete.'],
  ['on-file', 'ON FILE — THE CANDIDATES KEPT', 'The selections are made, and these candidates stay on file per the aesthetic law, so any selection can still be changed by changing one letter. Nothing in this section asks you for anything.']
];

(async () => {
  // ---- carries: byte-identical by construction --------------------------------
  for (const [src, dst] of CARRIES) {
    fs.copyFileSync(path.join(OUT, src), path.join(OUT, dst));
    console.log(`carry  ${src} -> ${dst} (byte-identical copy)`);
  }

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
      window.__states = await import('/review/act-2/harness/states.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__states.cellMeta());
  const ids = Object.keys(meta);

  const missing = CELLS_TO_RENDER.filter((id) => !ids.includes(id));
  if (missing.length) throw new Error(`--cells names unknown cells: ${missing.join(', ')}`);

  let shots = 0;
  for (const id of CELLS_TO_RENDER) {
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
    console.log(`cell   ${id.padEnd(16)} ${String(meta[id].klass).padEnd(10)} ${meta[id].review}`);
  }
  if (CELLS_TO_RENDER.length) await page.evaluate(() => window.__states.teardown());

  // ---- the index --------------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const figure = (id) => {
    const m = meta[id];
    const head = m.beat ? `${m.scene} b${m.beat}` : m.scene === '—' ? 'proof' : m.scene;
    return `
    <figure data-review="${m.review}">
      <a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" loading="lazy" /></a>
      <figcaption>
        <b>${id}</b> · ${esc(head)} · <span class="frame">${esc(m.frame)}</span>
        <span class="pill pill--${m.review}">${esc(m.klass)}</span>
        <br>${esc(m.caption)}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
        <br><a href="./${id}.png" target="_blank">full size</a>
      </figcaption>
    </figure>`;
  };

  const inSection = (id, key) => (key === 'restored'
    ? RESTORED.includes(id)
    : meta[id].review === key && !RESTORED.includes(id));
  const sectionHtml = SECTIONS.map(([key, title, note]) => {
    const list = ids.filter((id) => inSection(id, key));
    if (!list.length) return '';
    return `<h2 class="h--${key}">${title} · ${list.length} cells</h2>
<p class="lang">${note}</p>
<div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const sceneSections = SCENES.map(([key, title]) => {
    const list = ids.filter((id) => meta[id].scene === key && meta[id].review !== 'on-file')
      .sort((a, b) => (meta[a].beat - meta[b].beat) || a.localeCompare(b));
    if (!list.length) return '';
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const classes = SECTIONS.map(([k]) => k).filter((k) => k !== 'restored');
  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const counts = classes.map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II — the beat-state sheet · r2</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h2.h--pending-review { color:#F7931A; }
  h2.h--restored { color:#FFD9A6; }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.58); margin:0 0 18px; max-width:1020px; line-height:1.7; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(247,147,26,.55); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--pending-review { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--approved-selection { color:#FFD9A6; border-color:rgba(255,217,166,.4); }
  .pill--approved-adapt { color:rgba(255,255,255,.55); }
  .pill--approved-port { color:rgba(255,255,255,.45); }
  .pill--determined { color:rgba(255,255,255,.35); }
  .pill--on-file { color:rgba(255,255,255,.3); }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:64px 0 0; }
</style></head><body>
<h1>Act II — the beat-state sheet · r2 — the rulings applied</h1>
<p class="note"><b>What this sheet now asks of you is small, and it is stated in plain English at each section.</b>
Your 31 August rulings are applied: the three selections landed, the five adaptations verified, the elimination restored
to the legacy pacing (Ruling 3 struck), the vault restaged photographically, and the rails law staged on both rails.
The cells outlined in orange are the ${byReview('pending-review').length} waiting for your verdict; the restored elimination is beneath them for your walk.
Current classes: <b>${counts}</b>. Every cell is examined at full size — click any image.</p>
<p class="note">The beat maps stand at <b>37 beats</b> — frozen at 33 on the installed scripts and amended to 37 by the
Ruling 3 strike (S6 = 9, at the legacy pacing). The claim through-line is on stage at <b>S5 b1 · S5 b7 · S6 b8 · S7 b1 · S7 b2</b>
and returns as S10's CLAIM station, which under the rails law carries the ClaimObject disc itself.</p>
${sectionHtml}
<hr>
<h2>The scene walk — the same cells, in beat order</h2>
<p class="lang">Every state of Act II in the order the film plays them, so the sheet can be read as a run as well as a review queue. The restored Scene 6 plays here exactly as the legacy played it: the table, then one wave per advance, then the verdict.</p>
${sceneSections}
</body></html>`);

  const prior = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-states-r2',
    beatMap: { S5: 8, S6: 9, S7: 5, S8: 5, S9: 5, S10: 5, total: 37 },
    beatMapAuthority: 'docs/batch-b-package.md §1 — frozen 31 August 2026 at the installed scripts’ [→] counts, amended the same day to 37 by the Ruling 3 strike (master §13)',
    provenanceAuthority: 'docs/act-2-provenance.md, ruled 31 August 2026, amended by the strike: 9 PORT · 2 ADAPT · 3 NEW',
    reviewProtocol: {
      'pending-review': 'the ruled re-renders — the plain-English question each cell asks is on the sheet',
      restored: 'the six restored elimination cells — ports, no formal burden; the test is that the run looks like it always did',
      'approved-selection': 'the selected candidates, landed as beat cells, carried byte-identical',
      'approved-adapt': 'verified 31 August 2026 — the one ruled change landed and nothing else moved',
      'approved-port': 'approved by provenance; optional spot-check only',
      determined: 'script landings on approved compositions; no decision',
      'on-file': 'non-selected candidates, kept per the aesthetic law; no burden'
    },
    rulingsR2: prior.rulingsR2,
    claimThroughLine: ['s5-b1', 's5-b7', 's5-b8', 's6-b8', 's7-b1', 's7-b2', 's10-b1', 's10-b2'],
    counts: Object.fromEntries(classes.map((r) => [r, byReview(r).length])),
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${CELLS_TO_RENDER.length} rendered · ${CARRIES.length} carried · ${ids.length} cells on the sheet -> review/act-2/states/`);
  console.log(counts);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
