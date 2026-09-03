// Act IV — the beat-state sheet capture (the Act IV kickoff brief, Session 2).
//
// Captures every cell of `states.mjs` at 1920 × 1080 through the dev server,
// runs each cell's probes (is the still showing the state it claims?), and
// cuts the record: `sheet.html` — the flipbook, in beat order, the review
// request the presenter walks — and `states.json`.
//
// THE SHEET WAS A REVIEW REQUEST AND IS NOW THE APPROVED SET (presenter-
// approved in full at the flipbook walk, 3 Sep 2026 — the Batch D
// implementation brief §1.3, master §13). The map is ruled (3 Sep 2026,
// master §13: A · A · A; 21 PORT · 0 ADAPT · 0 NEW · 2 retired, then two
// ADAPT rows by the same day's rulings 1 and 2) and the beat maps are frozen
// at 42, so every cell is a PORT or a ruled ADAPT: the legacy slide module
// mounted at its build, or the film's own Act I stage at Scene 4's approved
// save state.
// The pending set is the cells that carry a wiring flag — the entry seam, the
// disc's travel and scale between Scene 16's frames, the legacy build-0
// compositions that have no advance in the merged act, the coin photograph —
// each rendered once, honestly, and flagged in plain English.
//
// THE BATCH D RULINGS (3 Sep 2026, ruled against this sheet at the flipbook
// walk — the Batch D implementation brief §1, master §13) are recorded in
// BATCH_D_RULINGS below and on the cells they answer (`ruling` in place of
// `flag`, review class `approved-ruled`). Ruling 1: Scene 19 restages — the
// carrier arrives at beat 2; S19-F1 is ADAPT. Ruling 2: Scene 22 merges its
// list beats — S22 = 3, the act = 42, 42 cells; S22-F2 is ADAPT
// (19 PORT · 2 ADAPT).
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

// S22 4 → 3 and 43 → 42 by the Batch D ruling 2 (3 Sep 2026, master §13).
const BEAT_MAP = { S16: 8, S17: 5, S18: 8, S19: 2, S20: 5, S21: 5, S22: 3, S23: 6 };
const TOTAL_BEATS = 42;

const SCENES = [
  ['S16', 'Scene 16 — Return to the Open Exchange (8 beats · the homecoming · the definition · the claim and its carrier, the crescendo included)'],
  ['S17', 'Scene 17 — What the Carrier Must Preserve (5 beats)'],
  ['S18', 'Scene 18 — The 100-Year Test (8 beats · the unknowable future merged in)'],
  ['S19', 'Scene 19 — Invert the Question (2 beats)'],
  ['S20', 'Scene 20 — How the Carrier Can Fail: I (5 beats)'],
  ['S21', 'Scene 21 — How the Carrier Can Fail: II (5 beats)'],
  ['S22', 'Scene 22 — From Failure to Requirement — the Ten Properties (3 beats · the ten properties in one advance, as ruled 3 Sep 2026)'],
  ['S23', 'Scene 23 — The Comparison (6 beats · the lineup whole, as ruled · the fifty scores at once · the closing line)']
];

// The presenter's rulings of 3 September 2026 (master §13), recorded as their
// own commits before this pipeline was touched.
const RULINGS = [
  'Row 1 = A — the candidate lineup ports whole before the table; S23-F1 is PORT, no ADAPT enters the map',
  'Row 2 = A — the phrase-under-a-lens beat (legacy 4-01) is retired; Scene 16 stays the homecoming',
  'Row 3 = A — the four claim-and-carrier beats close Scene 16, the crescendo included; S16 = 8, S17 = 5; the map is RULED',
  'the legacy waypoint 3-08-waypoint-judge is retired from the deck — the Batch C splice ruling it was waiting on; the file stays on disk; 39 → 38 slides',
  'Scene 15 stands at 7 beats — the kickoff brief’s 8 is corrected to the map',
  'Scene 22 stands at the default — four advances, three compositions; the Act IV beat maps are frozen at 43',
  'the two dead pointer sentences in Scene 23’s stability armor are cut — nothing written in their place',
  'Scene 16 beat 1’s join is written: the return line, then “The surgeon is still holding the claim he accepted that day.”, then the legacy passage uncut from “this is the moment to pay a debt” onward; the four pre-spoken sentences cut; the seam closed'
];

// The presenter's rulings at the flipbook walk (the Batch D implementation
// brief §1, 3 Sep 2026, master §13), recorded as their own commits.
const BATCH_D_RULINGS = [
  'Scene 19 restages — beat 1 is the inverted framing alone, no carrier on stage; the carrier (the claim in its shell, on the stress stage) arrives at beat 2, timed to “let’s put a carrier on the bench and try to break it.” The change is made at the source (legacy 4-10 keys the carrier to build 2); S19-F1 is ADAPT; the two cells re-rendered',
  'Scene 22 merges its list beats — all ten properties land in one advance; the two paragraphs merge at zero word changes, one [→] removed; S22 = 3 beats, the act = 42; S22-F2 is ADAPT; the merged cell is the complete two-column list, the five-row cell leaves the record',
  'The sheet is presenter-approved in full — the remaining flagged cells approved as rendered (the entry seam with the whole fork at rest and no words on the frame; the definition at the legacy build-3 composition; beat 2’s frame held for the social claim; the disc’s re-centering as wiring; the coin photograph as ruled; the unmapped grid as the first sweep’s first movement; the empty table entering with the scores’ gesture); the table-kicker spacing recorded as an accepted legacy fact; the go-ahead given — the 42 cells are the approved set, the visual authority for every landed-state proof of the Batch D implementation'
];
const APPROVAL = 'presenter-approved in full at the flipbook walk, 3 September 2026 (the Batch D implementation brief §1.3, master §13) — the 42 cells are the approved set; a settled state that is not its approved cell at zero pixels is a defect';

const CLASS_NOTE = {
  'approved-as-rendered': ['APPROVED AS RENDERED — the cells that carried a flag to the walk',
    'A cell that carried a wiring flag to the flipbook walk and was approved as rendered there (the Batch D implementation brief §1.3, 3 September 2026, master §13). The flag stays on the cell as a closed record of what was asked and answered; nothing here is pending. The two table cells also record the kicker-to-table spacing as an accepted legacy fact.'],
  'approved-ruled': ['RULED AT THE FLIPBOOK WALK — the cells the presenter answered with a ruling',
    'A cell whose flag the presenter answered with a ruling (the Batch D implementation brief §1, 3 September 2026, master §13). The ruling is recorded on the cell in the flag’s place, the record is amended where it lands (the map, the package, the source), and the cell is re-rendered on the ruling’s authority. Nothing here is pending.'],
  'approved-port': ['APPROVED BY PROVENANCE — the PORT cells',
    'A proven legacy treatment, transplanted verbatim: the legacy slide module itself mounted at the build the ruled map names, the legacy stylesheet placing every element. Review is optional under the provenance rule (AGENTS.md §4.9) — the presenter approved these treatments when the Section 4 deck shipped, and the map’s ruling carries them home. A cell here asks nothing; it is on the sheet so the act can be walked whole.'],
  'pending-review': ['PENDING REVIEW — the flagged cells',
    'Also PORT cells, rendered exactly as the map names them, but each carries a wiring flag the presenter should see: the entry seam (how much of Scene 4 returns, and that the recede is a gesture rather than a state), the disc’s travel and scale between Scene 16’s frames, the legacy build-0 compositions that have no spoken advance once two slides are one scene (the direct framing, the unmapped grid, the empty properties frame, the empty table), the coin photograph in the carrier lineage. Each is one honest render plus a plain-English flag; nothing is decided silently. Your verdict on each — “as rendered”, or one word that changes it — closes it.']
};

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
      window.__states = await import('/review/act-4/harness/states.mjs');
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
    if (shots > 0 && shots % 8 === 0) await freshPage();
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
  if (!RECORD_ONLY) await page.evaluate(() => window.__states.teardown());

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
        ${m.flag ? `<br><span class="flagline"><b>${m.review === 'pending-review' ? 'FLAG — for your word:' : 'FLAG — closed, approved as rendered 3 Sep 2026:'}</b> ${esc(m.flag)}</span>` : ''}
        ${m.ruling ? `<br><span class="ruleline"><b>${esc(m.ruling)}</b></span>` : ''}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
        <br><span class="src">probes ${p.results.filter((r) => r.ok).length}/${p.results.length}${p.ok ? '' : ' — FAILED'}</span> · <a href="./${id}.png" target="_blank">full size</a>
      </figcaption>
    </figure>`;
  };

  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const flagged = ids.filter((id) => meta[id].flag);
  const ruled = ids.filter((id) => meta[id].ruling);
  const REVIEW_CLASSES = ['approved-ruled', 'approved-as-rendered', 'approved-port', 'pending-review'];

  const sceneSections = SCENES.map(([key, title]) => {
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => meta[a].beat - meta[b].beat);
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const legend = Object.entries(CLASS_NOTE).map(([r, [title, note]]) =>
    `<h3 class="h--${r}">${title} · ${byReview(r).length} cells</h3><p class="lang">${note}</p>`).join('\n');

  const flagList = flagged.map((id) =>
    `<li><a href="#${id}"><b>${id}</b></a> — ${esc(meta[id].flag)}</li>`).join('\n');

  const counts = REVIEW_CLASSES
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');
  const ruledList = ruled.map((id) =>
    `<li><a href="#${id}"><b>${id}</b></a> — ${esc(meta[id].ruling)}</li>`).join('\n');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act IV — the beat-state sheet · the approved set</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  p.note b { color:rgba(255,255,255,.85); font-weight:600; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h3 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:22px 0 4px; font-weight:500; }
  h3.h--approved-port { color:#F7931A; }
  h3.h--pending-review { color:rgba(255,217,166,.85); }
  h3.h--approved-ruled { color:rgba(255,255,255,.85); }
  h3.h--approved-as-rendered { color:rgba(255,217,166,.85); }
  figure[data-review="approved-as-rendered"] img { outline:1px solid rgba(255,217,166,.45); }
  .pill--approved-as-rendered { color:rgba(255,217,166,.85); border-color:rgba(255,217,166,.5); }
  .ruleline { color:rgba(255,255,255,.62); }
  .ruleline b { color:rgba(255,255,255,.78); font-weight:500; }
  figure[data-review="approved-ruled"] img { outline:1px solid rgba(255,255,255,.35); }
  .pill--approved-ruled { color:rgba(255,255,255,.85); border-color:rgba(255,255,255,.45); }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.7; }
  ol.rulings, ul.flags { font-size:12.5px; color:rgba(255,255,255,.55); max-width:1020px; line-height:1.7; padding-left:22px; }
  ul.flags b, ol.rulings b { color:rgba(255,255,255,.85); font-weight:600; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="approved-port"] img { outline:1px solid rgba(247,147,26,.35); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(255,217,166,.45); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .flagline { color:rgba(255,217,166,.6); }
  .flagline b { color:rgba(247,147,26,.7); }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--approved-port { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--pending-review { color:rgba(255,217,166,.85); border-color:rgba(255,217,166,.5); }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:56px 0 0; }
</style></head><body>
<h1>Act IV — the beat-state sheet · the approved set (presenter-approved in full, 3 September 2026)</h1>
<p class="note"><b>Status.</b> ${esc(APPROVAL)}. The review-request text beneath is kept as the record of what was asked; the three rulings that answered it are listed after it.</p>
<p class="note"><b>What this is.</b> The frozen Section 4 argument coming home as stills — every settled state of Scenes 16–23,
one cell per beat, <b>42 cells at the frozen map</b> (S16 8 · S17 5 · S18 8 · S19 2 · S20 5 · S21 5 · S22 3 · S23 6 — 43 until the Batch D ruling 2 merged Scene 22's list beats).
The ruled map (<i>docs/act-4-provenance.md</i>, 3 September 2026) is 21 PORT · 0 ADAPT · 0 NEW · 2 retired, so
<b>every cell is a PORT and this sheet designed nothing</b>: each cell mounts the legacy slide module itself at the build
the map names, and the legacy stylesheet places every element; the one cell that is not a Section 4 slide — the homecoming,
s16-b1 — mounts the film's own Act I stage at Scene 4's approved save state (s4-b4-b) through the stage's own state law.
The harness creates one element, the stage container, and a check gates that at the source.</p>
<p class="note"><b>Recorded first, as their own commits — your rulings of 3 September 2026</b> (master §13):</p>
<ol class="rulings">
${RULINGS.map((r) => `<li>${esc(r)}</li>`).join('\n')}
</ol>
<p class="note"><b>The flipbook protocol — how to read this sheet.</b> Walk the act once, as stills, in beat order:
<b>the return</b> (s16-b1, the Scene 4 frame reconstructing with the claim held), <b>the definition</b> landing over the released
claim, <b>the claim and its carrier</b> with the crescendo, <b>the test</b> (the century, the arrival, the unknowns, the governing
question), <b>the inversion</b>, <b>the failures</b> (ten typographic rows), <b>the requirements</b> (the two sweeps, the ten properties),
<b>the candidates</b>, <b>the fifty scores landing at once</b>, and <b>the closing line</b>. At every frame the question is the same one
Act III's sheet asked: <i>can I follow the argument by eye alone?</i> Then return two things: your verdicts on the
<b>pending set</b> — the ${flagged.length} flagged cells listed below, each “as rendered” or one word that changes it — and
<b>the go-ahead</b> that unlocks Batch D implementation under the sizing law. The approved-port cells ask nothing.</p>
<p class="note"><b>Ruled at the flipbook walk — the Batch D implementation brief §1, 3 September 2026</b> (master §13), each ruling its own commit, each recorded on the cell it answers:</p>
<ol class="rulings">
${BATCH_D_RULINGS.map((r) => `<li>${esc(r)}</li>`).join('\n')}
</ol>
<ul class="flags">
${ruledList}
</ul>
<p class="note"><b>The flags, gathered — closed, approved as rendered 3 September 2026</b> — each in plain English, each on its cell:</p>
<ul class="flags">
${flagList}
</ul>
<p class="note">Cell classes: <b>${counts}</b>. Beneath every cell: its legacy source by slide and build, and its probes — the
count of elements the still is asserted to show (the fifty revealed scores, the ten mapped rows, the released claim, the shell's
future focus), measured in the mounted DOM at capture. The deck itself is untouched by this sheet; the one deck change of the
session is the ruled 3-08 splice (39 → 38 slides), proven in <i>review/act-4/smoke-deck.json</i>.</p>
${legend}
<hr>
${sceneSections}
</body></html>`);

  const cells = ids.map((id) => ({ id, file: `${id}.png`, ...meta[id], probes: probes[id] }));

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-4-states',
    status: 'the approved set — presenter-approved in full at the flipbook walk, 3 September 2026',
    approval: APPROVAL,
    approvedSet: ids,
    beatMap: { ...BEAT_MAP, total: TOTAL_BEATS },
    cellCount: ids.length,
    beatMapAuthority: 'docs/batch-d-package.md §1 — derived from the legacy advance structure 3 September 2026 and frozen the same day on the presenter’s rulings (master §13: the three ARGUABLE rows at A · A · A; Scene 22 at the default)',
    provenanceAuthority: 'docs/act-4-provenance.md — RULED 3 September 2026: 21 PORT · 0 ADAPT · 0 NEW · 2 retired; every cell a PORT of the named legacy treatment',
    rulings: RULINGS,
    batchDRulings: BATCH_D_RULINGS,
    splice: { was: 39, now: 38, retired: '3-08-waypoint-judge', fileOnDisk: true, proof: 'review/act-4/smoke-deck.json' },
    homecoming: {
      cell: 's16-b1',
      source: 'the approved s4-b4-b (review/gate-2/states/states.json approvedSetCurrent) — the Act I stage’s own applyState(\'spend-or-save\', 3)',
      law: 'src/scenes/act-1-the-unfinished-exchange/_exchangeStage.js GEOM: markSaveB · roads.save · fadeSaveB'
    },
    protocol: 'the presenter walks the act as stills — the return, the test, the inversion, the failures, the requirements, the fifty scores landing at once, the closing line — and returns his verdicts on the pending set plus the go-ahead that unlocks implementation',
    counts: Object.fromEntries(REVIEW_CLASSES.map((r) => [r, byReview(r).length])),
    pendingSet: byReview('pending-review'),
    approvedPortSet: byReview('approved-port'),
    approvedRuledSet: byReview('approved-ruled'),
    ruled: ruled.map((id) => ({ id, ruling: meta[id].ruling })),
    flags: flagged.map((id) => ({ id, flag: meta[id].flag, status: meta[id].review === 'pending-review' ? 'open — for the presenter’s word at the flipbook walk' : 'closed — approved as rendered, 3 September 2026 (the Batch D implementation brief §1.3, master §13)' })),
    probeFailures: ids.filter((id) => !probes[id].ok),
    cells,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-4/states/ (${RECORD_ONLY ? 'record only' : ONLY ? `captured ${ONLY_SET.size}` : 'full capture'})`);
  console.log(counts);
  const probeFails = ids.filter((id) => !probes[id].ok);
  console.log(`probe failures: ${probeFails.length}${probeFails.length ? ` — ${probeFails.join(', ')}` : ''}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length || probeFails.length ? 1 : 0);
})();
