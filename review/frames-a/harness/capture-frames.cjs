// Batch A style frames — capture the §3 stills (docs/batch-a-package.md §3).
//
// Drives the dev server at a 1920×1080 viewport: builds each frame through
// frames-a.mjs (real components, real tokens), waits for renders and fonts,
// and clips the exact stage. Then assembles the batch's one contact sheet from
// the captured stills and screenshots it. Output under review/frames-a/frames/.
//
// AMENDED at the selections session, 25 August 2026, in two respects and for
// the same reason R7.3 amended the grade gate rather than copying it: two
// harnesses that cut the same sheet stop agreeing about it.
//
//   --only <ids>   render just these frames. The presenter ruled on eight of
//                  the ten and changed two; re-rendering the eight would
//                  overwrite stills that have already been judged, which the
//                  aesthetic law's file-keeping clause forbids.
//   --sheet <name> which sheet to cut. `markup` is the original 24-cell sheet
//                  the presenter marked up, now written to contact-sheet-markup;
//                  `approved` is the ruled set of ten and takes the plain
//                  contact-sheet name, because that is the batch's live sheet
//                  from here on. Default cuts both.
//
// Usage: node capture-frames.cjs [--port 5273] [--only a,b] [--sheet approved]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const ONLY = (flag('--only', '') || '').split(',').map((v) => v.trim()).filter(Boolean);
const SHEET = flag('--sheet', 'both');
const OUT = path.join(__dirname, '..', 'frames');
fs.mkdirSync(OUT, { recursive: true });

const CAPTIONS = {
  'p1-f1': 'P1-F1 — the completed hours field · counter at 80,000 · the hours line',
  'p1-f2': 'P1-F2 — mid-morph: the GOLD form · display scale, centered low',
  'p1-f3': 'P1-F3 — the title frame (the thumbnail candidate)',
  'p2-f1-plain': 'P2-F1 — the mercy line, alone',
  'p2-f1-ghost': 'P2-F1 — the mercy line over the hours-field ghost (0.14)',
  's2-f1-photo': 'S2-F1 — the exchange stage · photographic patient (render HELD at the gate)',
  's2-f1-mark': 'S2-F1 — the exchange stage · restrained patient mark',
  's2-f1-final': 'S2-F1 FINAL — the exchange stage · the patient regraded, gated and shipping',
  's3-f1-final': 'S3-F1 FINAL — the birth, in the scene · attempt 2 · candidate A · photographic patient',
  's2-f2': 'S2-F2 — the failure state: dim possibilities, the return path failing',
  's4-f1': 'S4-F1 — SPEND resolution: goods arrived, claim absent, closure legible',
  's4-f2-a': 'S4-F2 — SAVE final · candidate A',
  's4-f2-b': 'S4-F2 — SAVE final · candidate B',
  's4-f2-c': 'S4-F2 — SAVE final · candidate C'
};
for (const cand of ['a', 'b', 'c']) {
  const C = cand.toUpperCase();
  CAPTIONS[`s3-f1-a1-${cand}`] = `S3-F1 — the birth · attempt 1, the centered contraction · candidate ${C}`;
  CAPTIONS[`s3-f1-a2-${cand}`] = `S3-F1 — the birth · attempt 2, in the scene · candidate ${C}`;
  CAPTIONS[`s3-f1-a3-${cand}`] = `S3-F1 — the birth · attempt 3, display low center · candidate ${C}`;
  CAPTIONS[`s3-f2-${cand}`] = `S3-F2 — the open interval · candidate ${cand.toUpperCase()}`;
}

const GROUPS = [
  ['Prologue', ['p1-f1', 'p1-f2', 'p1-f3', 'p2-f1-plain', 'p2-f1-ghost']],
  ['Scene 2 — the direct exchange', ['s2-f1-photo', 's2-f1-mark', 's2-f2']],
  ['Scene 3 — the breakthrough (the signature image, 3 attempts × 3 candidates)',
    ['s3-f1-a1-a', 's3-f1-a1-b', 's3-f1-a1-c',
     's3-f1-a2-a', 's3-f1-a2-b', 's3-f1-a2-c',
     's3-f1-a3-a', 's3-f1-a3-b', 's3-f1-a3-c']],
  ['Scene 3 — the open interval', ['s3-f2-a', 's3-f2-b', 's3-f2-c']],
  ['Scene 4 — spend or save', ['s4-f1', 's4-f2-a', 's4-f2-b', 's4-f2-c']]
];

// The ruled set: the two frames the rulings changed, and the eight approved as
// rendered — P2-F1 in its plain variant, S3-F2 and S4-F2 in candidate A.
// (docs/batch-a-selections-brief.md §1.)
const APPROVED = [
  ['Prologue', ['p1-f1', 'p1-f2', 'p1-f3', 'p2-f1-plain']],
  ['Scene 2 — the direct exchange', ['s2-f1-final', 's2-f2']],
  ['Scene 3 — the breakthrough, and the open interval', ['s3-f1-final', 's3-f2-a']],
  ['Scene 4 — spend or save', ['s4-f1', 's4-f2-a']]
];
const APPROVED_CAPTIONS = {
  'p1-f1': 'P1-F1 — the completed hours field · approved as rendered · no re-render (Gate 1 chose the disc)',
  'p2-f1-plain': 'P2-F1 — the mercy line, alone · RULED: the hours-field ghost retired for this frame',
  's3-f2-a': 'S3-F2 — the open interval · candidate A',
  's4-f2-a': 'S4-F2 — SAVE final · candidate A'
};

const SHEETS = {
  markup: {
    groups: GROUPS,
    stem: 'contact-sheet-markup',
    html: 'sheet-markup.html',
    title: 'Batch A style frames — the §3 stills, as marked up',
    note: 'Every frame 1920×1080, real assets through the dark-field register, real type, brightness rules applied. Frames containing the Claim Mark render in all three Gate 1 candidates; S3-F1 in three compositional attempts. <b>This sheet is the record of what was judged</b> — the rulings it produced are on contact-sheet.png.'
  },
  approved: {
    groups: APPROVED,
    stem: 'contact-sheet',
    html: 'sheet.html',
    title: 'Batch A style frames — the approved set',
    note: 'The ten §3 frames as ruled on 25 August 2026. Prototype Gate 1 chose <b>candidate A</b>, the luminous disc, so every mark here is A and P1-F1 did not re-render. S2-F1 takes the photographic patient, now regraded and shipping. S3-F1 takes compositional attempt 2 with that same photograph in place of the line glyph — the one frame whose composition changed. P2-F1 drops the hours-field ghost. Every alternative stays on file beside these stills, and the sheet the presenter marked up is contact-sheet-markup.png.'
  }
};

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'networkidle' });
  const all = await page.evaluate(async () => {
    window.__frames = await import('/review/frames-a/harness/frames-a.mjs');
    return window.__frames.FRAME_IDS;
  });
  const unknown = ONLY.filter((id) => !all.includes(id));
  if (unknown.length) throw new Error(`no frame builder for: ${unknown.join(', ')}`);
  const ids = ONLY.length ? ONLY : all;

  for (const id of ids) {
    await page.evaluate((frameId) => window.__frames.buildFrame(frameId), id);
    await page.evaluate(async () => {
      await document.fonts.ready;
      const imgs = [...document.querySelectorAll('#frames-a-stage img')];
      await Promise.all(imgs.map((i) => i.decode().catch(() => {})));
    });
    await page.waitForTimeout(350);
    await page.screenshot({
      path: path.join(OUT, `${id}.png`),
      clip: { x: 0, y: 0, width: 1920, height: 1080 }
    });
    console.log(`frame  ${id}`);
  }
  await page.evaluate(() => window.__frames.teardown());

  // ---- the contact sheets ----
  const wanted = SHEET === 'both' ? ['markup', 'approved'] : [SHEET];
  for (const key of wanted) {
    const spec = SHEETS[key];
    if (!spec) throw new Error(`no sheet named "${key}"`);
    const missing = spec.groups.flatMap(([, list]) => list)
      .filter((id) => !fs.existsSync(path.join(OUT, `${id}.png`)));
    if (missing.length) throw new Error(`sheet "${key}" wants stills not on disk: ${missing.join(', ')}`);
    await cutSheet(page, spec);
  }

  fs.writeFileSync(path.join(OUT, 'frames.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'batch-a-selections',
    rendered: ids,
    sheets: wanted.map((k) => `${SHEETS[k].stem}.png`),
    approved: APPROVED.flatMap(([, list]) => list),
    onFile: fs.readdirSync(OUT)
      .filter((f) => /\.png$/.test(f) && !f.startsWith('contact-sheet'))
      .map((f) => f.replace(/\.png$/, '')).sort(),
    count: ids.length,
    consoleErrors: errors
  }, null, 2));

  console.log(`\n${ids.length} frames rendered → review/frames-a/frames/ · sheets: ${wanted.join(', ')}`);
  console.log(`console errors: ${errors.length}`);
  await browser.close();
  process.exit(errors.length ? 1 : 0);
})();

async function cutSheet(page, spec) {
  const captions = { ...CAPTIONS, ...APPROVED_CAPTIONS };
  const sheetRows = spec.groups.map(([title, list]) => {
    const figs = list.map((id) => `
      <figure><img src="./${id}.png" alt="${id}" /><figcaption>${captions[id]}</figcaption></figure>`).join('');
    return `<h2>${title}</h2><div class="row">${figs}</div>`;
  }).join('\n');

  fs.writeFileSync(path.join(OUT, spec.html), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Batch A style frames</title>
<link rel="stylesheet" href="/src/styles/fonts.css">
<style>
  body { background:#000; color:#fff; font-family:Inter,sans-serif; margin:0; padding:44px 48px 64px; }
  h1 { font-size:15px; letter-spacing:.22em; text-transform:uppercase; color:#F7931A; margin:0 0 10px; font-weight:500; }
  p.note { font-size:13px; color:rgba(255,255,255,.5); margin:0 0 36px; max-width:920px; line-height:1.6; }
  h2 { font-size:13px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,255,255,.85); margin:40px 0 16px; font-weight:500; }
  .row { display:flex; flex-wrap:wrap; gap:26px; }
  figure { margin:0; width:560px; }
  img { display:block; width:560px; height:315px; outline:1px solid rgba(255,255,255,.09); }
  figcaption { margin-top:8px; font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.45); line-height:1.5; }
</style></head><body>
<h1>${spec.title}</h1>
<p class="note">${spec.note}</p>
${sheetRows}
</body></html>`);

  await page.setViewportSize({ width: 1860, height: 1200 });
  await page.goto(`http://127.0.0.1:${PORT}/review/frames-a/frames/${spec.html}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `${spec.stem}.png`), fullPage: true });
  console.log(`sheet  ${spec.stem}.png (${spec.groups.flatMap(([, l]) => l).length} cells)`);
}
