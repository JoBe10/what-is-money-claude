// Act III — the beat-state sheet capture (the Act III states brief §2).
//
// All 25 beats of Scenes 11–15, full-size at 1920×1080 through the states
// pipeline, with the flipbook the presenter reviews from and the per-cell
// record.
//
// THE SHEET IS IN BEAT ORDER — THE FLIPBOOK. The brief's protocol is one
// walk in beat order: can the act's argument be followed by eye alone —
// three jobs, the split, the climb, the objection answered on the ladder,
// the tower, the held question? The review classes are the legend, and the
// flags are gathered at the top in plain English so nothing decided honestly
// is decided silently.
//
// DETERMINISM. No builder in states.mjs uses Math.random, but the same LCG
// every capture in this project installs is installed anyway, so a component
// that seeds motion variables cannot make a re-render unstable.
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
  ['S15', 'Scene 15 — The Tower (6 beats)']
];

const CLASS_NOTE = {
  'pending-review': ['VERIFY — the adaptations and the flagged ports',
    'Each of these renders a proven treatment with exactly one ruled change (the evidence grammar on the split; renders for the ladder’s stage marks; the coffee cup at display scale) or with one honestly flagged staging call on a port (the triad’s center; the disc’s return). Every caption says in plain English what to look for. What is wanted is not a taste verdict but a check: did the ruled change land, is the flagged call acceptable, and did anything else move?'],
  determined: ['DETERMINED',
    'A script landing on a composition approved above — no new treatment, no decision; rendered so the flipbook is complete.'],
  'approved-port': ['APPROVED BY PROVENANCE',
    'Ports. Proven legacy treatments transplanted — several by mounting the very component the legacy slides run, at the states they run it. They carry no review burden: look only if something appears wrong.']
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
    console.log(`cell   ${id.padEnd(10)} ${String(meta[id].klass).padEnd(6)} ${meta[id].review}${meta[id].flag ? '  [flagged]' : ''}`);
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
        <b>${id}</b> · ${esc(m.scene)} b${m.beat} · <span class="frame">${esc(m.frame)}</span>
        <span class="pill pill--${m.review}">${esc(m.klass)}</span>
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
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => meta[a].beat - meta[b].beat);
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const legend = Object.entries(CLASS_NOTE).map(([r, [title, note]]) =>
    `<h3 class="h--${r}">${title} · ${byReview(r).length} cells</h3><p class="lang">${note}</p>`).join('\n');

  const flagList = flagged.map((id) =>
    `<li><b>${id}</b> — ${esc(meta[id].flag)}</li>`).join('\n');

  const counts = ['pending-review', 'determined', 'approved-port']
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act III — the beat-state sheet · the flipbook</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h3 { font-size:12px; letter-spacing:.18em; text-transform:uppercase; margin:22px 0 4px; font-weight:500; }
  h3.h--pending-review { color:#F7931A; }
  h3.h--determined { color:rgba(255,255,255,.6); }
  h3.h--approved-port { color:rgba(255,255,255,.6); }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.7; }
  ul.flags { max-width:1020px; margin:0 0 14px; padding-left:20px; }
  ul.flags li { font-size:12.5px; color:rgba(255,255,255,.62); line-height:1.7; margin-bottom:8px; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(247,147,26,.55); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .flagline { color:#FFD9A6; }
  .flagline b { color:#F7931A; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--pending-review { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--determined { color:rgba(255,255,255,.35); }
  .pill--approved-port { color:rgba(255,255,255,.45); }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:56px 0 0; }
</style></head><body>
<h1>Act III — the beat-state sheet · all 25 beats of Scenes 11–15, in beat order</h1>
<p class="note"><b>The protocol, in plain English: walk this page once, top to bottom — it is the act, played as stills.</b>
The question at every frame is the same one: can you follow the act's argument by eye alone — the three jobs, the split,
the climb, the objection answered on the ladder, the tower, the held question? When the walk is done, two things are
asked of you: per-cell verdicts on the <b>${byReview('pending-review').length} pending-review cells</b> (each caption
says exactly what to check, and every honest judgment this sheet had to make is flagged in orange rather than decided
silently), and the go-ahead that unlocks implementation. The ports are approved by provenance and need you only if
something looks wrong.</p>
<p class="note">The beat maps are frozen at <b>25 beats</b> on the installed scripts' own <code>[→]</code> counts
(batch-c package §1: S11 5 · S12 4 · S13 6 · S14 4 · S15 6). The triad is the act's home base: drawn in Scene 11, split
into the columns in Scene 12, risen through by the ladder in Scene 13, returned to in Scene 14, left through the STORE
corner into the tower in Scene 15. <b>The ClaimObject returns at the held question — s15-b6 — and appears nowhere
earlier in the act.</b> Cell classes: <b>${counts}</b>. Every cell is examined at full size — click any image.</p>
${legend}
<h2>The flags — every honest call, gathered (${flagged.length})</h2>
<p class="lang">Each of these is also on its own cell. Nothing here was improvised silently: where a port or the approved
staging left something genuinely open, the sheet stands one honest render and asks.</p>
<ul class="flags">
${flagList}
</ul>
<hr>
${sceneSections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-3-states',
    beatMap: { S11: 5, S12: 4, S13: 6, S14: 4, S15: 6, total: 25 },
    beatMapAuthority: 'docs/batch-c-package.md §1 — frozen 2 September 2026 on the installed scripts’ [→] counts (ruling 4 of the Act III states brief)',
    provenanceAuthority: 'docs/act-3-provenance.md, ruled 2 September 2026 — 3 PORT · 3 ADAPT · the coordination-scales NEW row recorded as not built; no live NEW frame, no candidates anywhere',
    rulings: {
      ladder: 'The LADDER freeze amendment (master §13, 2 Sep 2026): Scene 13 is the ladder restored, Boyapati attributed on screen, stage marks as renders at lineup scale, the coordination logic inside the scene as its proof.',
      socialTechnology: 'Scene 13 beat 4 as drafted — the one good you use because everyone else uses it, in plain words; vocabulary confined to the notes armor; terminology law unamended.',
      staging: 'The kickoff’s staging map approved: the triad is the act’s home base; overlays follow the Act II overlay grammar.',
      scripts: 'Approved as drafted, installed at zero word differences, maps frozen at 25 (review/act-3/script-diff.json).',
      thread: 'The ClaimObject returns at the held question (s15-b6) and nowhere earlier in the act.'
    },
    reviewProtocol: {
      walk: 'One walk in beat order — the flipbook. The question at every frame: can the act’s argument be followed by eye alone (three jobs, the split, the climb, the objection answered on the ladder, the tower, the held question)?',
      'pending-review': 'per-cell verdicts: did the one ruled change land, is the flagged honest call acceptable, did anything else move?',
      determined: 'script landings on approved compositions; no decision',
      'approved-port': 'approved by provenance; optional spot-check only',
      then: 'the go-ahead that unlocks implementation'
    },
    claimThroughLine: ['s15-b6'],
    counts: Object.fromEntries(['pending-review', 'determined', 'approved-port']
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
