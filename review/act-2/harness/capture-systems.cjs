// Act II — the design-systems sheet capture
// (docs/p1-fix-and-act-2-systems-brief.md §3).
//
// Every candidate cell of systems.mjs, full-size at 1920×1080 through the
// states pipeline, plus the index the presenter reviews from and the per-cell
// record. The sheet's protocol is the same one every sheet in this project
// carries: full size, one verdict per ◆ frame, no bulk approvals.
//
// Usage: node capture-systems.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = path.join(__dirname, '..', 'systems');
fs.mkdirSync(OUT, { recursive: true });

// The five ◆ frames, in the order the act meets them.
const FRAMES = [
  ['S6-F2', 'S6-F2 — the elimination funnel',
    'The act’s one new diagrammatic system, and the frame that sets the film’s diagram grammar. Line grammar only; the content is the funnel’s own frozen sequence. All three candidates render the same mid-elimination state — three stages spent, THE FORGE landed and not yet run — so what is being compared is systems, not moments.'],
  ['S10-F1', 'S10-F1 — the trade-off strip',
    'GOLD → CLAIM → LEDGER → BITCOIN, one gain and one dependency each, activated one at a time. Every word on these frames is recorded film material — the per-slot provenance is in systems.json. Two things are flagged rather than decided: the bitcoin position (the register boundary says a diagram takes the glyph; the C1 coin ruling points at the render) and whether the CLAIM station should carry the accent.'],
  ['S9-F1', 'S9-F1 — the network formation',
    'The central layer receding, a distributed validation network forming. Line grammar. There is no text on any of the three — which is how “no advocacy vocabulary anywhere on the frame” is satisfied absolutely rather than by careful word choice.'],
  ['S5-F3', 'S5-F3 — the evidence grammar',
    'The dated-fact treatment, designed as a system because it returns for every dated fact in the film. Each candidate is rendered twice: on the Zanzibar specimen (place · date · fact) and on the 1971 specimen (date · fact, no place), which is how the system has to degrade. Both specimens are recorded film material; the 1971 cells are system proofs, not Scene 8 style frames.'],
  ['S8-F2', 'S8-F2 — the chart at film grade',
    'The four-currency purchasing-power record restyled to the deck’s system. The data is frozen and untouchable: every candidate reads src/data/purchasing-power.js, plots one vertex per observed year, and keeps the frozen draw order and per-series weight. The candidates vary axes, weight and labeling restraint, and nothing else.']
];

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
      window.__systems = await import('/review/act-2/harness/systems.mjs');
    });
  };
  await freshPage();

  const meta = await page.evaluate(() => window.__systems.cellMeta());
  const ids = Object.keys(meta);

  let shots = 0;
  for (const id of ids) {
    if (shots > 0 && shots % 8 === 0) await freshPage();
    shots += 1;
    await page.evaluate((cellId) => window.__systems.buildCell(cellId), id);
    await page.evaluate(async () => { await document.fonts.ready; });
    await page.waitForTimeout(280);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`cell   ${id.padEnd(14)} ${meta[id].frame}  ${meta[id].system}`);
  }
  await page.evaluate(() => window.__systems.teardown());

  // ---- the index -----------------------------------------------------------
  const figure = (id) => `
    <figure><a href="./${id}.png" target="_blank"><img src="./${id}.png" alt="${id}" /></a>
    <figcaption><b>${id}</b> · ${meta[id].system}<br>${meta[id].caption}
    · <a href="./${id}.png" target="_blank">full size</a></figcaption></figure>`;

  const sections = FRAMES.map(([key, title, note]) => {
    const rows = ids.filter((id) => meta[id].frame === key);
    return `<h2>${title}</h2><p class="lang">${note}</p><div class="row">${rows.map(figure).join('')}</div>`;
  }).join('\n');

  fs.writeFileSync(path.join(OUT, 'sheet.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Act II — the design-systems sheet</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 72px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.55); margin:0 0 14px; max-width:1000px; line-height:1.65; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:48px 0 8px; font-weight:500; }
  p.lang { font-size:12px; color:rgba(255,255,255,.45); margin:0 0 18px; max-width:1000px; line-height:1.6; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.04em; color:rgba(255,255,255,.5); line-height:1.6; }
  figcaption b { color:rgba(255,255,255,.85); font-weight:600; }
  a { color:#F7931A; text-decoration:none; }
</style></head><body>
<h1>Act II — the design-systems sheet · the five ◆ candidate frames, ahead of the scripts</h1>
<p class="note"><b>Review protocol:</b> the presenter selects <b>one system per ◆ frame</b>, examined <b>at full size</b> —
click any image or its “full size” link. No bulk verdicts. His selections plus the essay’s Act II section unlock the Act II
scripts and the full beat-state sheet, and the selected systems pre-seed every state on it.<br><br>
Every cell is <b>script-independent</b>: no frame depends on a word the essay has not written, and every word that appears
is traced to recorded film material — the per-slot provenance is in <b>systems.json</b>. Every cell is a shippable frame
under the composition law. <b>No accent appears anywhere on this sheet</b>: none of these five frames carries the Claim
Mark, and orange is the claim’s alone.</p>
${sections}
</body></html>`);

  fs.writeFileSync(path.join(OUT, 'systems.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-systems',
    scope: 'the five ◆ candidate frames of docs/batch-b-package.md §3, rendered ahead of the Act II scripts',
    frames: FRAMES.map(([key, title, note]) => ({
      frame: key,
      title,
      note,
      candidates: ids.filter((id) => meta[id].frame === key)
        .map((id) => ({ id, file: `${id}.png`, system: meta[id].system, caption: meta[id].caption }))
    })),
    provenance: {
      rule: 'every word on every cell is recorded film material; nothing is drawn from a script that has not been written',
      'S6-F2 stage names': 'GASES · REACTIVES · RADIOACTIVES · THE FORGE · SCARCITY — the funnel\'s frozen sequence (synthesis-architecture Scene 6 beat 2; batch-b package §2 S6: "gases escape, reactives corrode, radioactives are lethal; the forge leaves two; scarcity leaves one")',
      'S10-F1 GOLD gain': 'SCARCITY IN MATTER — synthesis-architecture, Scene 6 beat 1, verbatim display line',
      'S10-F1 GOLD dependency': 'as value grows, weight grows — batch-b package §2 S6, verbatim ("gold\'s weakness is mass — as value grows, weight grows")',
      'S10-F1 CLAIM gain': 'PORTABILITY — synthesis-architecture, Scene 7: "Portability improved." Compressed to the label register; the word is the recorded one',
      'S10-F1 CLAIM dependency': 'trust moved to the issuer — synthesis-architecture, Scene 7, verbatim',
      'S10-F1 LEDGER gain': 'INSTANT TRANSFER — synthesis-architecture, Scene 8 beat 1, verbatim ("instant transfer")',
      'S10-F1 LEDGER dependency': 'the window closed — synthesis-architecture, Scene 8 beat 3, verbatim ("when redemption was demanded, the window closed")',
      'S10-F1 BITCOIN gain': 'NON-DISCRETIONARY SUPPLY — synthesis-architecture, Scene 9, verbatim capability line',
      'S10-F1 BITCOIN dependency': 'not yet twenty years into a hundred-year question — synthesis-architecture, Scene 9, verbatim honesty line',
      'S5-F3 Zanzibar specimen': 'ZANZIBAR · 1800s; "Shiploads of cheaper imported cowries collapsed the shell rate." — synthesis-architecture Scene 5 beat 5 and batch-b package §2 S5 (tense adjusted for the frame)',
      'S5-F3 1971 specimen': '1971; "When redemption was demanded, the window closed." — synthesis-architecture, Scene 8 beat 3, verbatim',
      'S8-F2 data': 'src/data/purchasing-power.js, untouched — PURCHASING_POWER, PP_SERIES (frozen draw order and per-series alpha), PP_YEAR_MIN, PP_YEAR_MAX. One vertex per observed year, the legacy chart\'s own rule',
      'S9-F1': 'no text on any candidate'
    },
    flagged: [
      'S10-F1, the bitcoin position: the register boundary (master §6.3) says dark-field never enters a diagram, so a diagram-scale strip takes the struck-₿ glyph — which is what these candidates render. The presenter\'s C1 ruling as recorded (dark-field manifest §2.2) says the physical-coin render governs Scene 10\'s strip for consistency with P1. The two point different ways at exactly this position. Flagged, not resolved.',
      'S10-F1, the accent: the CLAIM station is a claim, and the accent is the claim\'s — but the strip\'s claim is the paper claim on gold, a carrier, and colouring it would collide with the Claim Mark. All three candidates are monochrome; the selection settles it.',
      'S6-F2 candidate A: the population is the periodic table\'s real silhouette and the eliminated regions are the real ones (the gases at the top right and along the p-block edge, columns 1–2 for the reactive metals, period 7 and the actinides for the radioactives). At dot scale no individual element is identifiable, so the frame asserts a shape and a sequence, not a specific chemistry.',
      'S5-F3: the third dated fact the system must carry — palladium, 1803 — has no recorded one-line form yet, so it is not rendered here. The two specimens that are recorded are.'
    ],
    cells: ids.map((id) => ({ id, file: `${id}.png`, ...meta[id] })),
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} cells -> review/act-2/systems/`);
  console.log(`console errors: ${errors.length}`);
  errors.forEach((e) => console.log('ERR', e));
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();
