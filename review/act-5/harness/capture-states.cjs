// Act V — the beat-state sheet capture (the Act V kickoff brief, Session 2).
//
// Captures every cell of `states.mjs` at 1920 × 1080 through the dev server,
// runs each cell's probes (is the still showing the state it claims?), and
// cuts the record: `sheet.html` — the flipbook, in beat order, the review
// request the presenter walks — and `states.json`.
//
// THE SHEET IS PRESENTER-APPROVED IN FULL (4 September 2026, the Batch E
// implementation brief §1.1; master §13). It was cut as a review request and
// the walk answered it: all 27 cells are the approved set and the visual
// authority for every landed-state proof of Batch E — a settled state that is
// not its approved cell at zero pixels is a defect. The six flagged cells are
// approved AS RENDERED, Scene 27's legacy order standing, and their flags stay
// on the sheet as closed records. The map is RULED (4 Sep 2026, master §13:
// the six ARGUABLE rows at A · A · A · A · A · A; 22 PORT · 1 ADAPT · 0 NEW ·
// 1 retired) and the beat maps are frozen at 27, so every cell is a PORT or
// the one ruled ADAPT: the legacy slide module mounted at its build. The
// approved-as-rendered set is the cells that carried a wiring flag — the entry
// seam, the merge point inside Scene 26, the question standing from Scene 27's
// entry frame, the stock at rest and the claim's last journey, the full clear —
// and the ADAPT cell (the close's black), each rendered once, honestly, flagged
// in plain English, and approved exactly as it stands.
//
// THE RHYME: the Scene 28 cells are rendered from P1's field implementation —
// FixedSupplyField draws with UnitGrid from src/components/UnitField.js, the
// module P1's canvas field reads its grammar from — and the sheet stands the
// approved P1 cell (review/prologue/states/p1-b1.png, the field complete at
// 80,000) beside them as the bookend's other end. That cell is the Prologue
// sheet's own approved render, shown, not re-rendered.
//
// EVERY CELL IS BUILT ON A FRESH PAGE — the cold mount the deck itself
// performs on a direct entry. Found at this session (the Scene 23 proof,
// review/act-5/harness/proof-s23-band.cjs): a cell built after other cells
// on the same page can differ from its cold mount by a few thousand pixels
// inside its renders, because the browser's image cache resamples a subject
// already drawn at another box size from that cached raster. Act V draws the
// same five subjects at three box sizes (the display box, the compact box,
// and Scene 23's band before it), so each cell gets its own page and the
// sheet's stills are the deck's own direct-entry frames by construction.
//
// Modes:
//   (default)        capture every cell, then cut the record.
//   --record-only    re-cut sheet.html + states.json from the meta, the
//                    probes on file and the PNGs on disk; no screenshots.
//   --only a,b,c     capture exactly the named cells; every other PNG stays
//                    byte-identical on disk.
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

const BEAT_MAP = { S24: 4, S25: 4, S26: 9, S27: 3, S28: 3, S29: 2, S30: 2 };
const TOTAL_BEATS = 27;

const SCENES = [
  ['S24', 'Scene 24 — Migration (4 beats · fiat with its two jobs · the demand to save · it migrates · the final line)'],
  ['S25', 'Scene 25 — The Monetary Premium (4 beats · the equation opens · the easy part · the premium as a halo · the closing pair)'],
  ['S26', 'Scene 26 — When Other Assets Do Money’s Job (9 beats · the four roles · their final line · the three coexistence statements · the coexistence law, the falsifiability passage spoken over it)'],
  ['S27', 'Scene 27 — The Marginal Decision (3 beats · one claim · five paths, five candidates, the question · the supporting line)'],
  ['S28', 'Scene 28 — Fixed Supply Reprices at the Margin (3 beats · the margin · the demand arriving · the repricing — the UnitField, the film’s bookend)'],
  ['S29', 'Scene 29 — The Case from First Principles (2 beats · the four lines · the conclusion, the frozen final frame)'],
  ['S30', 'Scene 30 — Close (2 beats · silence · Thank you.)']
];

// The presenter's rulings of 4 September 2026 (master §13), recorded as their
// own commits before this pipeline was touched.
const RULINGS = [
  'Row 1 = A — the three entry lines become beats: S24 = 4 · S25 = 4 · S27 = 3; Act V is 27; S24-F1, S25-F1 and S27-F1 are PORT',
  'Row 2 = A — the falsifiability passage is spoken over Scene 26’s last frame, the coexistence law, with no advance; Scene 23 is not reopened',
  'Row 3 = A — the rules line sits before “The case is not that the price will behave.” in Scene 29’s second beat, as installed',
  'Row 4 = A — Scene 28’s field is legacy 4-22’s FixedSupplyField, ported whole; the rhyme with P1 is structural (UnitGrid from UnitField.js); S28-F1 … F4 are PORT',
  'Row 5 = A — the savings vehicles stay renders in Scenes 24 and 25; S24-F3 and S25-F2 stay PORT',
  'Row 6 = A — the silence is its own beat at the close; S30 = 2; S30-F1 stays ADAPT (the wayline retired), S30-F2 PORT; with this row the map is RULED (22 PORT · 1 ADAPT · 0 NEW · 1 retired) and the beat maps are frozen at 27',
  'Part A — Scene 23’s fit: the ten score rows return to the legacy 60 px pitch and the header band shrinks to a 100 × 100 box; s23-b5 and s23-b6 re-rendered and re-proven in the deck (review/act-5/landed-proof-s23-band.json); the exit’s two wiring numbers and Scene 16’s entry stand as built, to be judged at the viewing'
];

const CLASS_NOTE = {
  'approved-port': ['APPROVED BY PROVENANCE — the PORT cells',
    'A proven legacy treatment, transplanted verbatim: the legacy slide module itself mounted at the build the ruled map names, the legacy stylesheet placing every element. Review is optional under the provenance rule (AGENTS.md §4.9) — the presenter approved these treatments when the Section 4 deck shipped and when the argument froze, and the map’s ruling carries them home. A cell here asks nothing; it is on the sheet so the act can be walked whole.'],
  'approved-as-rendered': ['APPROVED AS RENDERED — the cells that carried a flag',
    'Five PORT cells rendered exactly as the map names them, each of which carried a wiring flag — the entry seam from the table into fiat standing alone, the merge point inside Scene 26, the question standing from Scene 27’s entry frame (a legacy fact the map’s row did not describe), the stock at rest and the claim’s last journey into the field, the full clear before the case — and the one ADAPT cell, the close’s black with its one change named. All six were walked and approved AS RENDERED on 4 September 2026, Scene 27’s legacy order standing. The flags stay beneath their cells as closed records: what was seen, and what was approved.']
};

const RHYME_NOTE = 'The rhyme, shown at both ends. Left: the approved P1 cell — the hours field complete, eighty thousand units at a 4.58 pitch, the Prologue sheet’s own render (review/prologue/states/p1-b1.png), not re-rendered here. Right: Scene 28’s field — thirty-five units at a 102 × 62 pitch, drawn by UnitGrid from the same src/components/UnitField.js. Both read UNIT_GRAMMAR: a unit fills 0.8235 of its horizontal pitch and 0.7419 of its vertical pitch. A life poured in; the container it is poured into. The rhyme is never pointed out in copy or spoken word — it lives in the code, and the check proves the mounted grid against the grammar in the source.';

(async () => {
  const errors = [];
  let browser = null;
  let page = null;

  browser = await chromium.launch();
  const freshPage = async () => {
    if (page) await page.close();
    page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
    await page.addInitScript(SEED_SCRIPT);
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto(`${BASE}/?proto=list`, { waitUntil: 'domcontentloaded' });
    await page.evaluate(async () => {
      window.__states = await import('/review/act-5/harness/states.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__states.cellMeta());
  const ids = Object.keys(meta);

  // The probes on file, for record-only and --only runs.
  const prior = fs.existsSync(path.join(OUT, 'states.json'))
    ? JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8')) : null;
  const priorProbes = Object.fromEntries((prior?.cells || []).map((c) => [c.id, c.probes]));
  const probes = {};

  let shots = 0;
  for (const id of ids) {
    const wants = !RECORD_ONLY && (!ONLY_SET || ONLY_SET.has(id));
    if (!wants) {
      if (!fs.existsSync(path.join(OUT, `${id}.png`))) {
        throw new Error(`cell ${id} is not being captured and has no PNG on disk`);
      }
      if (!priorProbes[id]) throw new Error(`cell ${id} is not being captured and has no probes on file`);
      probes[id] = priorProbes[id];
      console.log(`cell   ${id.padEnd(8)} ${meta[id].klass.padEnd(5)} ${RECORD_ONLY ? 'record-only — bytes untouched' : 'outside --only — bytes untouched'}`);
      continue;
    }
    // A fresh page per cell — the cold mount (see the header).
    if (shots > 0) await freshPage();
    shots += 1;
    await page.evaluate((cellId) => window.__states.buildCell(cellId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.querySelectorAll('img')].map((i) => i.decode().catch(() => {})));
    });
    // The reconstruction snap lifts after two frames; nothing transitions
    // after it, but the wait lets the compositor settle before the shot.
    await page.waitForTimeout(400);
    probes[id] = await page.evaluate((cellId) => window.__states.probe(cellId), id);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    const p = probes[id];
    console.log(`cell   ${id.padEnd(8)} ${meta[id].klass.padEnd(5)} ${meta[id].review.padEnd(15)} probes ${p.results.filter((r) => r.ok).length}/${p.results.length}${p.ok ? '' : '  PROBE FAILED'}  captured`);
  }
  if (!RECORD_ONLY && shots > 0) await page.evaluate(() => window.__states.teardown());

  // ---- the record ----------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const figure = (id) => {
    const m = meta[id];
    const p = probes[id];
    return `
    <figure data-review="${m.review}" id="${id}">
      <a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" loading="lazy" /></a>
      <figcaption>
        <b>${id}</b> · ${esc(m.scene)} b${m.beat} · <span class="frame">${esc(m.frame)}</span>
        <span class="pill pill--${m.review}">${esc(m.klass)} · ${esc(m.review)}</span>
        <br>${esc(m.caption)}
        ${m.flag ? `<br><span class="flagline"><b>FLAG — closed, approved as rendered 4 Sep 2026:</b> ${esc(m.flag)}</span>` : ''}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
        <br><span class="src">probes ${p.results.filter((r) => r.ok).length}/${p.results.length}${p.ok ? '' : ' — FAILED'}</span> · <a href="./${id}.png" target="_blank">full size</a>
      </figcaption>
    </figure>`;
  };

  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const flagged = ids.filter((id) => meta[id].flag);
  const REVIEW_CLASSES = ['approved-port', 'approved-as-rendered'];

  const rhymePanel = `
    <div class="rhyme">
      <figure class="rhyme__p1">
        <a href="../../prologue/states/p1-b1.png" target="_blank"><img src="../../prologue/states/p1-b1.png" alt="p1-b1 — the hours field complete" loading="lazy" /></a>
        <figcaption><b>p1-b1</b> · the Prologue’s approved cell — the hours field complete, the counter at 80,000. <span class="src">Shown from review/prologue/states/; not re-rendered here.</span></figcaption>
      </figure>
      <p class="lang">${esc(RHYME_NOTE)}</p>
    </div>`;

  const sceneSections = SCENES.map(([key, title]) => {
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => meta[a].beat - meta[b].beat);
    return `<h2>${title}</h2>${key === 'S28' ? rhymePanel : ''}<div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const legend = Object.entries(CLASS_NOTE).map(([r, [title, note]]) =>
    `<h3 class="h--${r}">${title} · ${byReview(r).length} cells</h3><p class="lang">${note}</p>`).join('\n');

  const flagList = flagged.map((id) =>
    `<li><a href="#${id}"><b>${id}</b></a> — ${esc(meta[id].flag)}</li>`).join('\n');

  const counts = REVIEW_CLASSES
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act V — the beat-state sheet · the approved set</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  p.note b { color:rgba(255,255,255,.85); font-weight:600; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h3 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:22px 0 4px; font-weight:500; }
  h3.h--approved-port { color:#F7931A; }
  h3.h--approved-as-rendered { color:rgba(255,217,166,.85); }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.7; }
  ol.rulings, ul.flags { font-size:12.5px; color:rgba(255,255,255,.55); max-width:1020px; line-height:1.7; padding-left:22px; }
  ul.flags b, ol.rulings b { color:rgba(255,255,255,.85); font-weight:600; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="approved-port"] img { outline:1px solid rgba(247,147,26,.35); }
  figure[data-review="approved-as-rendered"] img { outline:1px solid rgba(255,217,166,.45); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .flagline { color:rgba(255,217,166,.6); }
  .flagline b { color:rgba(247,147,26,.7); }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--approved-port { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--approved-as-rendered { color:rgba(255,217,166,.85); border-color:rgba(255,217,166,.5); }
  .rhyme { display:flex; gap:26px; align-items:flex-start; margin:0 0 22px; }
  .rhyme figure img { outline:1px solid rgba(253,233,212,.35); }
  .rhyme p.lang { max-width:560px; margin-top:0; }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:56px 0 0; }
</style></head><body>
<h1>Act V — the beat-state sheet · the approved set (approved in full, 4 September 2026)</h1>
<p class="note"><b>What this is.</b> The film’s ending as stills — every settled state of Scenes 24–30, one cell per beat,
<b>27 cells at the frozen map</b> (S24 4 · S25 4 · S26 9 · S27 3 · S28 3 · S29 2 · S30 2).
The ruled map (<i>docs/act-5-provenance.md</i>, 4 September 2026) is 22 PORT · 1 ADAPT · 0 NEW · 1 retired, so
<b>every cell is a PORT or the one ruled ADAPT, and this sheet designed nothing</b>: each cell mounts the legacy slide module itself
at the build the map names, and the legacy stylesheet places every element. The harness creates one element, the stage container,
and a check gates that at the source. The act’s anchor is the descent the map’s §0 records — nothing grows, everything narrows:
the world’s savings, one asset’s value, the assets doing money’s job, one claim, one field, four lines, one line, black.</p>
<p class="note"><b>Recorded first, as their own commits — your rulings of 4 September 2026</b> (master §13):</p>
<ol class="rulings">
${RULINGS.map((r) => `<li>${esc(r)}</li>`).join('\n')}
</ol>
<p class="note"><b>APPROVED IN FULL — 4 September 2026.</b> The walk was made and the sheet is the presenter’s approved set:
all ${ids.length} cells stand approved, the ${flagged.length} flagged cells <b>as rendered</b> — with <b>Scene 27’s legacy order standing</b>: the question
hangs over the lone claim before the paths appear. Their flags stay below as <b>closed records</b>, not open questions. The approved set is
the <b>visual authority for every landed-state proof of Batch E</b>: a settled state that is not its approved cell at zero pixels is a defect.</p>
<p class="note"><b>The walk this sheet was cut for</b>, kept for the record. Walk the film’s ending once, as stills, in beat order:
<b>the migration</b> (fiat standing with its two jobs; the demand to save; the lane, the three destinations, the claims traveling),
<b>the premium</b> (the equation assembling; the halo; the closing pair), <b>the other assets</b> (four roles, one per advance; the three coexistence
statements; the law), <b>the marginal decision</b> (one claim; five paths; the supporting line), <b>the field returning</b> (the margin; the demand
arriving; the repricing — the hours field’s rhyme, shown beside it), <b>the case</b> (four lines; the conclusion), and <b>the silence</b> (black; Thank you.).
At every frame the question is the one every sheet has asked: <i>can I follow the argument by eye alone?</i> It was walked, the verdicts
came back “as rendered” on all ${flagged.length} flagged cells, and <b>the go-ahead was given</b> — which unlocked the final implementation batch.</p>
<p class="note"><b>The flags, gathered</b> — each in plain English, each on its cell, <b>all closed as approved as rendered</b>:</p>
<ul class="flags">
${flagList}
</ul>
<p class="note">Cell classes: <b>${counts}</b>. Beneath every cell: its legacy source by slide and build, and its probes — the
count of elements the still is asserted to show (the four renders on the lane, the three halos, the five candidates, the thirty-five
units and the five at the margin, the two bold terms, the one line on black), measured in the mounted DOM at capture. The deck itself is
untouched by this sheet; the one deck change of the session is Scene 23’s fit ruling, proven in <i>review/act-5/landed-proof-s23-band.json</i>.</p>
${legend}
<hr>
${sceneSections}
</body></html>`);

  const cells = ids.map((id) => ({ id, file: `${id}.png`, ...meta[id], probes: probes[id] }));

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-5-states',
    status: 'the approved set — the film’s ending walked as stills, every cell approved, the go-ahead given (4 September 2026)',
    approval: 'presenter-approved in full at the flipbook walk, 4 September 2026 (the Batch E implementation brief §1.1, master §13) — the 27 cells are the approved set, the six flagged cells approved as rendered with Scene 27’s legacy order standing; a settled state that is not its approved cell at zero pixels is a defect',
    approvedSet: ids.slice(),
    beatMap: { ...BEAT_MAP, total: TOTAL_BEATS },
    cellCount: ids.length,
    beatMapAuthority: 'docs/batch-e-package.md §1 — derived from the legacy advance structure 3 September 2026 and frozen 4 September 2026 on the presenter’s rulings (master §13: the six ARGUABLE rows at A)',
    provenanceAuthority: 'docs/act-5-provenance.md — RULED 4 September 2026: 22 PORT · 1 ADAPT · 0 NEW · 1 retired',
    rulings: RULINGS,
    rhyme: {
      p1Cell: 'review/prologue/states/p1-b1.png — the approved Prologue cell, shown beside the Scene 28 cells, not re-rendered',
      module: 'src/components/UnitField.js — UNIT_GRAMMAR (PITCH_X 102 · PITCH_Y 62 · W_FRAC 0.8235 · H_FRAC 0.7419); UnitField (P1, canvas, 400 × 200 at 4.58) and UnitGrid (Scene 28, DOM, 7 × 5 at the grammar’s pitch)',
      note: RHYME_NOTE
    },
    protocol: 'walked, 4 September 2026 — the film’s ending as stills, the migration, the premium, the other assets, the marginal decision, the field returning, the case, the silence; the verdicts returned “as rendered” on all six flagged cells and the go-ahead was given, unlocking the final implementation batch',
    counts: Object.fromEntries(REVIEW_CLASSES.map((r) => [r, byReview(r).length])),
    approvedAsRenderedSet: byReview('approved-as-rendered'),
    approvedPortSet: byReview('approved-port'),
    flags: flagged.map((id) => ({ id, flag: meta[id].flag, status: 'closed — approved as rendered at the flipbook walk, 4 September 2026' })),
    probeFailures: ids.filter((id) => !probes[id].ok),
    cells,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-5/states/ (${RECORD_ONLY ? 'record only' : ONLY ? `captured ${ONLY_SET.size}` : 'full capture'})`);
  console.log(counts);
  const probeFails = ids.filter((id) => !probes[id].ok);
  console.log(`probe failures: ${probeFails.length}${probeFails.length ? ` — ${probeFails.join(', ')}` : ''}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length || probeFails.length ? 1 : 0);
})();
