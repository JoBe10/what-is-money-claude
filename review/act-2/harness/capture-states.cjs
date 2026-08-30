// Act II — the beat-state sheet capture (docs/act-2-states-brief.md §2).
//
// All 33 beats of Scenes 5–10 plus the candidate alternates and the evidence
// grammar's third specimen, full-size at 1920×1080 through the states pipeline,
// with the index the presenter reviews from and the per-cell record.
//
// THE INDEX IS ORDERED BY REVIEW BURDEN, NOT BY BEAT. The brief's protocol is
// that review is only owed where design is live, so the sheet opens with the
// cells that need a decision — `pending-selection` first, then
// `pending-review` — and the ported cells follow in scene order for
// spot-checking. The beat order is still readable: every cell says its scene
// and beat, and the scene walk is the second half of the page.
//
// DETERMINISM. `ElementGrid` seeds per-cell drift, spin and stagger with
// `Math.random`, which are motion variables — but a re-render should be
// pixel-stable regardless, so this harness installs the same LCG the Prologue's
// proofs use, re-seeded at every element creation. Nothing else in the sheet is
// random; the line-grammar cells that scatter use a seeded LCG in the builder.
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
  ['S5', 'Scene 5 — The Function Stayed. The Carrier Changed. (8 beats)'],
  ['S6', 'Scene 6 — Gold: Scarcity in Matter (5 beats)'],
  ['S7', 'Scene 7 — Claims on Gold: Portability Through Trust (5 beats)'],
  ['S8', 'Scene 8 — Fiat: Money Becomes Information (5 beats)'],
  ['S9', 'Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats)'],
  ['S10', 'Scene 10 — The Trade-Off Keeps Moving (5 beats)']
];

const CLASS_NOTE = {
  'pending-selection': ['SELECT ONE PER FRAME',
    'These are the only frames Act II designs. The ruled provenance map confirms three frames as NEW — S6-F3 (the mass state), S7-F2 (the detachment) and S9-F1 (the network) — and each carries genuinely distinct candidates at full size. S9-F1’s three are the systems sheet’s own, carried over unchanged because the map applies them; the other two are this sheet’s. One selection per frame, examined at full size.'],
  'pending-review': ['VERIFY THE ONE CHANGE',
    'Adaptations. Each renders its named legacy treatment with exactly one ruled change and nothing else, and each caption says which change to look for. What is wanted is not a taste verdict but a check: did the ruled change land, and did anything else move?'],
  'approved-port': ['APPROVED BY PROVENANCE',
    'Ports. Every one of these is a proven legacy treatment transplanted — several of them by mounting the very component the legacy slides run, at the state they run it. They are approved by provenance and carry no review burden: look only if something appears wrong.'],
  determined: ['DETERMINED',
    'Script landings on compositions that are already approved above. No new treatment, no decision — rendered under the full-coverage rule so the sheet is complete.']
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
      window.__states = await import('/review/act-2/harness/states.mjs');
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
    console.log(`cell   ${id.padEnd(16)} ${String(meta[id].klass).padEnd(10)} ${meta[id].review}`);
  }
  await page.evaluate(() => window.__states.teardown());

  // ---- the index -----------------------------------------------------------
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

  const byReview = (r) => ids.filter((id) => meta[id].review === r);
  const reviewSections = ['pending-selection', 'pending-review'].map((r) => {
    const list = byReview(r);
    if (!list.length) return '';
    const [title, note] = CLASS_NOTE[r];
    return `<h2 class="h--${r}">${title} · ${list.length} cells</h2>
<p class="lang">${note}</p>
<div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const sceneSections = SCENES.map(([key, title]) => {
    const list = ids.filter((id) => meta[id].scene === key)
      .sort((a, b) => (meta[a].beat - meta[b].beat) || a.localeCompare(b));
    if (!list.length) return '';
    return `<h2>${title}</h2><div class="row">${list.map(figure).join('')}</div>`;
  }).join('\n');

  const counts = ['pending-selection', 'pending-review', 'approved-port', 'determined']
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II — the beat-state sheet</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h2.h--pending-selection { color:#F7931A; }
  h2.h--pending-review { color:#FFD9A6; }
  p.lang { font-size:12px; color:rgba(255,255,255,.5); margin:0 0 18px; max-width:1020px; line-height:1.65; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="pending-selection"] img { outline:1px solid rgba(247,147,26,.55); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(255,217,166,.4); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--pending-selection { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--pending-review { color:#FFD9A6; border-color:rgba(255,217,166,.4); }
  .pill--approved-port { color:rgba(255,255,255,.45); }
  .pill--determined { color:rgba(255,255,255,.35); }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:64px 0 0; }
</style></head><body>
<h1>Act II — the beat-state sheet · all 33 beats of Scenes 5–10</h1>
<p class="note"><b>Your review is only owed where design is live.</b> Every cell carries its provenance class from the ruled map
(<b>docs/act-2-provenance.md</b>) and is built by it, so this sheet is ordered by what it asks of you rather than by beat:
<b>${counts}</b>. Rule the ${byReview('pending-selection').length} candidate cells, verify the ${byReview('pending-review').length} adaptations, and the ports need you only if something looks wrong.
Every cell is examined at full size — click any image. The scene walk below carries the same cells in beat order.</p>
<p class="note">The beat maps are frozen at <b>33 beats</b> on the installed scripts’ own <code>[→]</code> counts
(batch-b package §1). The claim through-line is on stage at <b>S5 b1 · S5 b7 · S6 b4 · S7 b1 · S7 b2</b> and returns as
S10’s CLAIM station — the connective object Prototype Gate 3 will animate.</p>
${reviewSections}
<hr>
<h2>The scene walk — the same cells, in beat order</h2>
<p class="lang">Every state of Act II in the order the film plays them, so the sheet can be read as a run as well as a review queue.</p>
${sceneSections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-states',
    beatMap: { S5: 8, S6: 5, S7: 5, S8: 5, S9: 5, S10: 5, total: 33 },
    beatMapAuthority: 'docs/batch-b-package.md §1, frozen 31 August 2026 on the installed scripts’ [→] counts',
    provenanceAuthority: 'docs/act-2-provenance.md, ruled 31 August 2026',
    reviewProtocol: {
      'pending-selection': 'one selection per NEW frame, at full size',
      'pending-review': 'verify the one ruled change landed and nothing else moved',
      'approved-port': 'approved by provenance; optional spot-check only',
      determined: 'script landings on approved compositions; no decision'
    },
    claimThroughLine: ['s5-b1', 's5-b7', 's5-b8', 's6-b4', 's7-b1', 's7-b2', 's10-b1', 's10-b2'],
    counts: Object.fromEntries(['pending-selection', 'pending-review', 'approved-port', 'determined']
      .map((r) => [r, byReview(r).length])),
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-2/states/`);
  console.log(counts);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
