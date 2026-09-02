// Act III — the beat-state sheet capture, r2 (the Act III states r2 brief §2).
//
// The r1 sheet re-cut under the five presenter rulings of 2 September 2026:
// all S11 cells (the disc at center, the job objects at the spokes), all S12
// cells (the proven staging, the block retired), all S13 cells (the neutral
// marks), S14 b2–b4 (the marks, the coin's landing unchanged in logic; b4
// under ruling 1), and S15 as the two candidate runs — 12 cells, A and B
// across all six beats. 31 cells; 25 beats.
//
// CARRIED CELLS ARE NOT RE-CAPTURED. A cell whose meta says `carried: true`
// (s14-b1 — the one cell no ruling touches) keeps its r1 PNG byte-identical;
// this capture verifies the file exists and skips the screenshot, and the
// check harness proves the bytes against the recorded r1 hash.
//
// RETIRED TO FILE (the aesthetic law's file-keeping clause): s12-b3-block
// (the r1 dated-fact block staging) and s15-b1-boxes … s15-b6-boxes (the r1
// three-box tower). They stay in review/act-3/states/ under their retired
// names and are recorded in states.json, not walked in the flipbook.
//
// THE SHEET IS IN BEAT ORDER — THE FLIPBOOK — with Scene 15 as two candidate
// runs, A then B, each the scene played whole. THE REVIEW PROTOCOL IS TWO
// ANSWERS, and the sheet says so in plain English.
//
// DETERMINISM. No builder in states.mjs uses Math.random, but the same LCG
// every capture in this project installs is installed anyway.
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
  ['S15', 'Scene 15 — The Tower, reopened (6 beats × 2 candidate systems)']
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
  'pending-selection': ['THE SELECTION — Scene 15’s two candidate systems',
    'The act’s one open design, reopened by your ruling. Candidate A is the proportional inverted tower you specified — width is claim volume, solidity is realness, the reveal descending from PAYMENT APPS at the frame’s top to the small bright foundation. Candidate B is this session’s design under the same argument — the convergence of claims: many faint app marks fanning onto few deposit marks, converging on one bright base point, so “more claims than base” is drawn as counting instead of width. Walk each run whole, then pick the system: A or B. Both stay on file either way.'],
  'pending-review': ['VERIFY — the rulings landed, and the standing honest calls',
    'Each of these renders a ruling of this round (the disc at the center, the reverted Argentina landing, the neutral marks) or carries an honest call still standing from r1 (the household words, the berth readings, the word-pass items). Every caption says in plain English what to look for: did the ruling land, is the flagged call acceptable, and did anything else move?'],
  determined: ['DETERMINED',
    'Ruled outcomes with no open question — rendered so the flipbook is complete.']
};

(async () => {
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
      window.__states = await import('/review/act-3/harness/states.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__states.cellMeta());
  const ids = Object.keys(meta);

  let shots = 0;
  for (const id of ids) {
    if (meta[id].carried) {
      if (!fs.existsSync(path.join(OUT, `${id}.png`))) {
        throw new Error(`carried cell ${id} has no PNG on disk`);
      }
      console.log(`cell   ${id.padEnd(10)} ${String(meta[id].klass).padEnd(6)} CARRIED — byte-identical from r1, not re-captured`);
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
    console.log(`cell   ${id.padEnd(10)} ${String(meta[id].klass).padEnd(6)} ${meta[id].review}${meta[id].system ? `  [candidate ${meta[id].system}]` : ''}${meta[id].flag ? '  [flagged]' : ''}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- the flipbook ---------------------------------------------------------
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const figure = (id) => {
    const m = meta[id];
    return `
    <figure data-review="${m.review}">
      <a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" loading="lazy" /></a>
      <figcaption>
        <b>${id}</b> · ${esc(m.scene)} b${m.beat}${m.system ? ` · <span class="cand">CANDIDATE ${m.system}</span>` : ''} · <span class="frame">${esc(m.frame)}</span>
        <span class="pill pill--${m.review}">${esc(m.klass)}</span>${m.carried ? ' <span class="pill pill--carried">CARRIED</span>' : ''}
        <br>${esc(m.caption)}
        ${m.flag ? `<br><span class="flagline"><b>FLAG:</b> ${esc(m.flag)}</span>` : ''}
        ${m.source ? `<br><span class="src">source: ${esc(m.source)}</span>` : ''}
        <br><a href="./${id}.png" target="_blank">full size</a>
      </figcaption>
    </figure>`;
  };

  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const flagged = ids.filter((id) => meta[id].flag);

  const sceneSections = SCENES.map(([key, title]) => {
    if (key === 'S15') {
      const run = (sys, name) => {
        const list = ids.filter((id) => meta[id].scene === 'S15' && meta[id].system === sys)
          .sort((a, b) => meta[a].beat - meta[b].beat);
        return `<h3 class="run">${name}</h3><div class="row">${list.map(figure).join('')}</div>`;
      };
      return `<h2>${title}</h2>
${run('A', 'Candidate A — the proportional inverted tower (your spec): walk it as the scene, b1 → b6')}
${run('B', 'Candidate B — the convergence of claims (this session’s design): the same scene, same beats, same copy')}`;
    }
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => meta[a].beat - meta[b].beat);
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const legend = Object.entries(CLASS_NOTE).map(([r, [title, note]]) =>
    `<h3 class="h--${r}">${title} · ${byReview(r).length} cells</h3><p class="lang">${note}</p>`).join('\n');

  const flagList = flagged.map((id) =>
    `<li><b>${id}</b> — ${esc(meta[id].flag)}</li>`).join('\n');

  const counts = ['pending-selection', 'pending-review', 'determined']
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act III — the beat-state sheet, r2 · the flipbook</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h3 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:22px 0 4px; font-weight:500; }
  h3.run { color:#F7931A; margin-top:30px; }
  h3.h--pending-selection { color:#F7931A; }
  h3.h--pending-review { color:rgba(255,255,255,.75); }
  h3.h--determined { color:rgba(255,255,255,.6); }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.7; }
  ul.flags { max-width:1020px; margin:0 0 14px; padding-left:20px; }
  ul.flags li { font-size:12.5px; color:rgba(255,255,255,.62); line-height:1.7; margin-bottom:8px; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(255,255,255,.3); }
  figure[data-review="pending-selection"] img { outline:1px solid rgba(247,147,26,.55); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .cand { color:#F7931A; letter-spacing:.12em; }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .flagline { color:#FFD9A6; }
  .flagline b { color:#F7931A; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--pending-selection { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--pending-review { color:rgba(255,255,255,.6); }
  .pill--determined { color:rgba(255,255,255,.35); }
  .pill--carried { color:rgba(255,255,255,.4); border-style:dashed; }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:56px 0 0; }
</style></head><body>
<h1>Act III — the beat-state sheet, r2 · the five rulings landed, the tower reopened</h1>
<p class="note"><b>The protocol, in plain English: walk this page once, top to bottom — it is the act, played as stills —
and return two answers.</b> First: <b>the Scene 15 selection — candidate A or candidate B.</b> The scene renders twice,
each system across all six beats; walk each run whole and pick the one whose shape argues best. Second: <b>the
go-ahead.</b> Those two answers close Act III's states and unlock implementation. Along the way, the
${byReview('pending-review').length} pending-review cells show your five rulings landed (the disc at the triad's
center, Argentina landing the legacy way, the neutral marks on the ladder and at the spokes) plus the honest calls
still standing from r1 — each caption says exactly what to check, and every judgment this sheet had to make is
flagged in orange rather than decided silently.</p>
<p class="note">The beat maps are frozen at <b>25 beats</b> (S11 5 · S12 4 · S13 6 · S14 4 · S15 6); Scene 15 renders
its six beats twice, once per candidate — <b>31 cells</b>. The triad is the act's home base, and <b>the disc holds its
center wherever the home base appears</b> (S11 b1–b5 · S12 b1, receded · S14 b4) — never the tower. Monetary assets
appear on the ladder only as climbers: S14 b3's coin is the only monetary object in sight. <b>s14-b1 is carried
byte-identical from r1</b>; the superseded r1 stagings stay on file (s12-b3-block, s15-b1-boxes … s15-b6-boxes) and
are not part of the walk. Cell classes: <b>${counts}</b>. Every cell is examined at full size — click any image.</p>
${legend}
<h2>The flags — every honest call, gathered (${flagged.length})</h2>
<p class="lang">Each of these is also on its own cell. Nothing here was improvised silently: where a ruling left
something genuinely open, the sheet stands one honest render and asks.</p>
<ul class="flags">
${flagList}
</ul>
<hr>
${sceneSections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-3-states-r2',
    beatMap: { S11: 5, S12: 4, S13: 6, S14: 4, S15: 6, total: 25 },
    cellCount: ids.length,
    beatMapAuthority: 'docs/batch-c-package.md §1 — frozen 2 September 2026; S15 renders its six beats once per candidate under the r2 reopening',
    provenanceAuthority: 'docs/act-3-provenance.md as amended 2 September 2026 (the r2 rulings) — 1 PORT (S12) · 3 ADAPT (S11, S13, S14) · 2 NEW live (S15, presenter-reopened by name) · the coordination-scales row not built',
    rulings: {
      thread: 'r2.1 — the ClaimObject returns at S11 b1, the triad’s center, and lives there wherever the home base appears; the “held question and nowhere earlier” clause struck as over-extension with its trail (master §13); the disc is not on the tower.',
      argentina: 'r2.2 — Scene 12 reverts to its proven staging; the r1 dated-fact block retired to file (s12-b3-block); the row arrives in the columns under the legacy kicker, the span and the every-stripe clause spoken; S12-F1 is PORT again; the dated-fact grammar remains film law for Act II.',
      neutralMarks: 'r2.3 — the four presenter renders (collectible · store · medium · unit) gated and ingested, carry the ladder’s stages at the band scale, and replace S11’s grammar glyphs at the spokes; monetary assets on the ladder only as climbers — S14’s coin at stage two is the only monetary object in sight.',
      towerReopened: 'r2.4 — Scene 15 presenter-reopened by name; the three-box tower superseded and on file; two candidates across all six beats: A the proportional inverted tower (the presenter’s spec), B the convergence of claims (the session’s design); line grammar only, the shiver kept at b4, all legacy copy in its slots.',
      gate4: 'r2.5 — Prototype Gate 4 recorded as spent; the ladder’s motion is judged at the presenter’s act viewing, per the collapsed-gate precedent.'
    },
    reviewProtocol: {
      walk: 'One walk in beat order — the flipbook, Scene 15 as two whole candidate runs.',
      answers: [
        'THE SELECTION: Scene 15, candidate A or candidate B.',
        'THE GO-AHEAD: the word that closes Act III’s states and unlocks implementation.'
      ],
      'pending-review': 'did the ruling land, is the standing flagged call acceptable, did anything else move?',
      determined: 'ruled outcomes; no decision'
    },
    discCells: ids.filter((id) => ['s11-b1', 's11-b2', 's11-b3', 's11-b4', 's11-b5', 's12-b1', 's14-b4'].includes(id)),
    carried: ids.filter((id) => meta[id].carried).map((id) => ({
      id,
      file: `${id}.png`,
      sha256: 'e7cc6fff9a1142573f5a30878505e8625f1c57ca1cac1b95f881167458821081',
      note: 'byte-identical from r1 — no ruling touches this cell; proven by the check harness against this hash'
    })),
    retired: RETIRED,
    counts: Object.fromEntries(['pending-selection', 'pending-review', 'determined']
      .map((r) => [r, byReview(r).length])),
    flags: flagged.map((id) => ({ id, flag: meta[id].flag })),
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-3/states/`);
  console.log(counts);
  console.log(`flags: ${flagged.length}`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
