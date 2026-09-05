// Batch B implementation, Session 1 — the §1 ruled re-render pipeline
// (docs/batch-b-implementation-brief.md §1).
//
// The r2 law holds: ZERO-PIXEL PROOF ON EVERY UNTOUCHED CELL. This harness
// renders ONLY the cells a §1 ruling re-staged (`--cells`), carries retiring
// renders to their file ids byte-identically (`--carry old.png:new.png` — a
// file copy, never a re-render), and regenerates the sheet index and the
// states record around the untouched artifacts, which are never re-encoded.
// `proof-impl1.cjs` closes the loop by hashing every cell against tag
// `act-2-states-r2`.
//
// The §1 rulings this pipeline executes (each its own commit):
//   1.1  the strip's second station is the CERTIFICATE — s10-b1/s10-b2
//        re-rendered, the disc-as-station staging carried to file.
//   1.2  the bitcoin glyph retires at display scale — the entrant block
//        carries the coin render; s9-b2/s9-b3/s9-b4 re-rendered.
//   1.4  the beat maps stand frozen at 37 and the post-§1 record is the
//        approved set — the review classes brought current, no render.
//
// Usage: node capture-states-impl1.cjs [--port 5273] [--cells a,b,c] [--carry src:dst,...]
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
  ['S6', 'Scene 6 — Gold: Scarcity in Matter (9 beats — the legacy pacing)'],
  ['S7', 'Scene 7 — Claims on Gold: Portability Through Trust (5 beats)'],
  ['S8', 'Scene 8 — Fiat: Money Becomes Information (5 beats)'],
  ['S9', 'Scene 9 — Bitcoin: Can Scarcity Become Digital? (5 beats)'],
  ['S10', 'Scene 10 — The Trade-Off Keeps Moving (5 beats)']
];

const RESTORED = ['s6-b2', 's6-b3', 's6-b4', 's6-b5', 's6-b6', 's6-b7'];

const SECTIONS = [
  ['ruled-re-render', 'THE §1 RE-RENDERS — THE RECORD BY RULING', 'These cells were re-rendered exactly as the §1 rulings of 31 August order: the strip’s second station carries the gold_certificate render relabeled CLAIM ON GOLD with all four stations photographic (ruling 1 — the CERTIFICATE), and the entrant block carries the bitcoin coin render in place of the drawn glyph (ruling 2, per C1). They are the approved record by ruling 4, and they meet your eye at the act viewing — which ruling 3 makes the gate. Nothing here asks you for a verdict before that viewing.'],
  ['pending-review', 'PENDING YOUR VERDICT', 'Cells still waiting on a formal verdict. After ruling 4 of 31 August this section should be empty — if anything renders here, a review class was not brought current.'],
  ['restored', 'THE RESTORED ELIMINATION · one wave per advance', 'Ruling 3 of the r2 session struck the compression, and these six cells return the periodic elimination to the legacy pacing — each cell rendered from the legacy build it corresponds to. They are ports, approved by provenance. The test is the one you set: walked in order, the sequence should simply look like it always did.'],
  ['approved-selection', 'THE SELECTIONS, LANDED', 'Your selections, landed as beat cells: the counted load (s6-b9) and the hub dissolving (s9-b1) carried byte-identical, and the custody-boundary logic restaged photographically as s7-b4 — approved with the post-§1 record on 31 August.'],
  ['approved-adapt', 'ADAPTATIONS — VERIFIED 31 AUGUST', 'The five adaptations you verified: on each, the one ruled change landed and nothing else moved. No further burden; they are kept here as the record.'],
  ['approved-port', 'APPROVED BY PROVENANCE', 'Ports. Every one of these is a proven legacy treatment transplanted — several of them by mounting the very component the legacy slides run, at the state they run it. They carry no review burden: look only if something appears wrong.'],
  ['determined', 'DETERMINED', 'Script landings on compositions that are already approved above. No new treatment, no decision — rendered under the full-coverage rule so the sheet is complete.'],
  ['on-file', 'ON FILE — THE CANDIDATES AND RETIRED STAGINGS KEPT', 'Non-selected candidates and retired stagings, kept per the aesthetic law so any selection can still be changed by changing one letter — including the disc-as-station strip the CERTIFICATE ruling retired. Nothing in this section asks you for anything.']
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
  const counts = classes.filter((r) => byReview(r).length)
    .map((r) => `${byReview(r).length} ${r}`).join(' · ');
  const pending = byReview('pending-review').length;

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II — the beat-state sheet · Batch B Session 1</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 10px; max-width:1020px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:52px 0 6px; font-weight:500; }
  h2.h--ruled-re-render { color:#F7931A; }
  h2.h--pending-review { color:#F7931A; }
  h2.h--restored { color:#FFD9A6; }
  p.lang { font-size:12.5px; color:rgba(255,255,255,.58); margin:0 0 18px; max-width:1020px; line-height:1.7; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figure[data-review="ruled-re-render"] img { outline:1px solid rgba(247,147,26,.55); }
  figure[data-review="pending-review"] img { outline:1px solid rgba(247,147,26,.85); }
  figcaption { margin-top:8px; font-size:11.5px; color:rgba(255,255,255,.52); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  .frame { color:rgba(255,255,255,.68); }
  .src { color:rgba(255,255,255,.34); font-style:italic; }
  .pill { display:inline-block; margin-left:6px; padding:1px 7px; border-radius:9px; font-size:9.5px;
          letter-spacing:.12em; text-transform:uppercase; border:1px solid rgba(255,255,255,.2); }
  .pill--ruled-re-render { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--pending-review { color:#F7931A; border-color:rgba(247,147,26,.5); }
  .pill--approved-selection { color:#FFD9A6; border-color:rgba(255,217,166,.4); }
  .pill--approved-adapt { color:rgba(255,255,255,.55); }
  .pill--approved-port { color:rgba(255,255,255,.45); }
  .pill--determined { color:rgba(255,255,255,.35); }
  .pill--on-file { color:rgba(255,255,255,.3); }
  a { color:#F7931A; text-decoration:none; }
  hr { border:0; border-top:1px solid rgba(255,255,255,.1); margin:64px 0 0; }
</style></head><body>
<h1>Act II — the beat-state sheet · Batch B implementation, Session 1</h1>
<p class="note"><b>This sheet is the approved record for the implementation, and it asks you for nothing before the act viewing.</b>
The §1 rulings of 31 August are recorded and executed here: the strip's second station is the CERTIFICATE — the
gold_certificate render, relabeled CLAIM ON GOLD, every station photographic, the disc never a station — the bitcoin
glyph is retired at display scale (the entrant block carries the coin render), the prototype gate for the architecture
morph is collapsed into the implementation review (your live viewing of the implemented act is the gate), and the
post-§1 record is the approved set for every landed-state proof. ${pending ? `<b>${pending} cells still carry a pending verdict — see the section below.</b>` : 'No cell is pending.'}
Current classes: <b>${counts}</b>. Every cell is examined at full size — click any image.</p>
<p class="note">The beat maps stand frozen at <b>37 beats</b> (S5 8 · S6 9 · S7 5 · S8 5 · S9 5 · S10 5). The claim
through-line is on stage at <b>S5 b1 · S5 b7 · S6 b8 · S7 b1 · S7 b2</b>; on S10's strip the disc is the traveler,
never a station — its journey across the act (S5 entry → carrier → certificate travel → strip arrival) is the
connective motion the implementation builds and your viewing judges.</p>
${sectionHtml}
<hr>
<h2>The scene walk — the same cells, in beat order</h2>
<p class="lang">Every state of Act II in the order the film plays them, so the sheet can be read as a run as well as a record.</p>
${sceneSections}
</body></html>`);

  const prior = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  const beatCells = ids.filter((id) => meta[id].review !== 'on-file' && meta[id].beat);
  fs.writeFileSync(path.join(OUT, 'states.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-b-impl-1',
    beatMap: { S5: 8, S6: 9, S7: 5, S8: 5, S9: 5, S10: 5, total: 37 },
    beatMapAuthority: 'docs/batch-b-package.md §1 — frozen 31 August 2026, amended the same day to 37 by the Ruling 3 strike (master §13); ruling 4 of the Batch B brief §1 confirms the freeze at 37',
    provenanceAuthority: 'docs/act-2-provenance.md, ruled 31 August 2026, amended by the strike: 9 PORT · 2 ADAPT · 3 NEW',
    reviewProtocol: {
      'ruled-re-render': 're-rendered exactly as a §1 ruling of the Batch B brief orders (the certificate station; the coin in the entrant block); the approved record by ruling 4 — they meet the presenter’s eye at the act viewing, which ruling 3 makes the gate',
      'pending-review': 'awaiting a formal verdict — empty after ruling 4',
      restored: 'the six restored elimination cells — ports, no formal burden; the test is that the run looks like it always did',
      'approved-selection': 'the selected candidates, landed as beat cells — s6-b9 and s9-b1 carried byte-identical, s7-b4 the ruled photographic restage approved with the post-§1 record',
      'approved-adapt': 'verified 31 August 2026 — the one ruled change landed and nothing else moved',
      'approved-port': 'approved by provenance; optional spot-check only',
      determined: 'script landings on approved compositions; no decision',
      'on-file': 'non-selected candidates and retired stagings, kept per the aesthetic law; no burden'
    },
    rulingsR2: prior.rulingsR2,
    rulingsImpl1: prior.rulingsImpl1 || {
      date: '31 August 2026',
      recordedBy: 'Batch B implementation Session 1 — docs/batch-b-implementation-brief.md §1',
      stripStation: {
        ruling: 'CERTIFICATE',
        provenance: 'The Session 1 prompt’s ruling placeholder arrived unfilled ("[CERTIFICATE or DISC]"); the presenter supplied the letter in-session — CERTIFICATE — and it is recorded here per the brief’s own definition.',
        effect: 'The strip’s second station carries the gold_certificate render, relabeled CLAIM ON GOLD; all four stations are photographic; the ClaimObject disc is never a station — it is the traveler. s10-b1 and s10-b2 re-rendered; the disc-as-station staging retired to file as s10-b1-disc and s10-b2-disc, byte-identical to the r2 renders. The rails law’s CLAIM-station exception is superseded (AGENTS.md §6, master §6.3 — amended with the trail).'
      },
      glyphRetirement: {
        ruling: 'the bitcoin glyph retires at display scale in Act II',
        effect: 's9-b2’s entrant block carries the bitcoin coin render per the C1 ruling; the same builder serves s9-b3 and s9-b4, so the ruling re-renders all three. Sweep result: the entrant block was the only display-scale glyph stand-in for the asset among the act’s beat cells — the strip already carries the coin render by C1 and the rails law, the network formation and station marks are drawn grammar and stay drawn, and the on-file candidates keep their glyphs per the aesthetic law’s file-keeping clause. Nothing ambiguous was found; the legacy 2-08’s entrant glyph leaves the deck at Session 2’s splice.'
      },
      gate3: 'Collapsed into the implementation review (presenter process amendment) — recorded in docs/batch-b-package.md §4 and master §13. The presenter’s live viewing of the implemented act is the gate; the claim’s connective journey (S5 entry → carrier → certificate travel → strip arrival) is what he judges.',
      approvedSetRule: 'The beat maps stand frozen at 37; the states record post-§1 is the approved set for every landed-state proof (ruling 4). The four r2 pending-review verdicts land with it: s7-b4 approved as the restaged selection, s5-b5 approved as the rails-law port, s10-b1/s10-b2 re-staged by ruling 1 and approved as the record.'
    },
    approvedSet: beatCells,
    claimThroughLine: ['s5-b1', 's5-b7', 's5-b8', 's6-b8', 's7-b1', 's7-b2'],
    claimTravelerNote: 'On S10’s strip the disc is the traveler, never a station (the CERTIFICATE ruling) — its arrival is connective motion, not a settled still.',
    counts: Object.fromEntries(classes.filter((r) => byReview(r).length).map((r) => [r, byReview(r).length])),
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
