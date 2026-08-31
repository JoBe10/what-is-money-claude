// The rail-states session — the P1 gold-cell landed proof
// (docs/act-2-rail-states-brief.md §1.3, §4).
//
// The regenerated gold render (1672×941, the near-16:9 family) governs every
// box that displays gold, and the brief orders exactly one Batch A touch: P1's
// gold-form cell re-rendered from the re-measured row. This proves the touch
// landed, in the project's own measured terms:
//
//   RE-RENDERED   p1-b5.png differs from its bytes at tag `batch-b` — the cell
//                 was actually re-rendered, not left as the carried approval.
//   THE NEW BOX   the lit subject sits inside the new 960×540 box at (480, 380)
//                 — the recorded P1-F2 height and centre applied to the
//                 render's own aspect (the ledger_glow transcription repeated).
//   NOT THE OLD   the lit subject extends past both side edges of the retired
//                 4:3 box (720 wide at x 600–1320) — the widened aspect is
//                 visibly on the frame, so the proof cannot pass on a stale
//                 render.
//   THE GROUND    corner patches and border ring ≤ 6/255, 1920×1080 — the
//                 cell-check gate's own clauses, so the re-render holds the
//                 sheet's compositional floor.
//
// Usage: node proof-p1-gold.cjs [--port 5273]
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const REPO = path.join(__dirname, '..', '..', '..');
const CELL = path.join(REPO, 'review', 'prologue', 'states', 'p1-b5.png');
const TAG = 'batch-b';

// The new box (review/prologue/harness/states.mjs formWide) and the retired
// one (formLandscape), with a 24px margin for antialiased edges.
const NEW_BOX = { x0: 480, y0: 380, x1: 1440, y1: 920 };
const OLD_BOX = { x0: 600, x1: 1320 };
const M = 24;

(async () => {
  const now = crypto.createHash('sha256').update(fs.readFileSync(CELL)).digest('hex');
  const was = crypto.createHash('sha256').update(execSync(
    `git show ${TAG}:review/prologue/states/p1-b5.png`,
    { cwd: REPO, encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 }
  )).digest('hex');
  const reRendered = now !== was;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });
  const m = await page.evaluate(async (src) => {
    const img = new Image();
    img.src = src;
    await img.decode();
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, w, h).data;
    const lum = (i) => 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];

    const patch = Math.round(Math.min(w, h) * 0.06);
    const corners = [[0, 0], [w - patch, 0], [0, h - patch], [w - patch, h - patch]];
    let cSum = 0; let cN = 0;
    for (const [px0, py0] of corners) {
      for (let y = py0; y < py0 + patch; y += 1) {
        for (let x = px0; x < px0 + patch; x += 1) { cSum += lum((y * w + x) * 4); cN += 1; }
      }
    }
    const ring = Math.max(1, Math.round(Math.min(w, h) * 0.02));
    let rSum = 0; let rN = 0;
    let lit = null;
    for (let y = 0; y < h; y += 1) {
      for (let x = 0; x < w; x += 1) {
        const L = lum((y * w + x) * 4);
        if (x < ring || x >= w - ring || y < ring || y >= h - ring) { rSum += L; rN += 1; }
        if (L > 24) {
          if (!lit) lit = { x0: x, y0: y, x1: x, y1: y, n: 0 };
          if (x < lit.x0) lit.x0 = x;
          if (x > lit.x1) lit.x1 = x;
          if (y < lit.y0) lit.y0 = y;
          if (y > lit.y1) lit.y1 = y;
          lit.n += 1;
        }
      }
    }
    return { w, h, cornerMean: cSum / cN, borderMean: rSum / rN, lit };
  }, '/review/prologue/states/p1-b5.png');
  await browser.close();

  const lit = m.lit || { x0: 0, y0: 0, x1: 0, y1: 0, n: 0 };
  const checks = {
    reRendered,
    size: m.w === 1920 && m.h === 1080,
    corner: m.cornerMean <= 6,
    border: m.borderMean <= 6,
    content: lit.n > 200,
    insideNewBox: lit.x0 >= NEW_BOX.x0 - M && lit.x1 <= NEW_BOX.x1 + M
      && lit.y0 >= NEW_BOX.y0 - M && lit.y1 <= NEW_BOX.y1 + M,
    widerThanOldBox: lit.x0 < OLD_BOX.x0 - M && lit.x1 > OLD_BOX.x1 + M
  };
  const failures = Object.values(checks).filter((v) => !v).length;

  Object.entries(checks).forEach(([k, v]) => console.log(`${v ? 'PASS' : 'FAIL'}  ${k}`));
  console.log(`lit bbox x ${lit.x0}–${lit.x1} · y ${lit.y0}–${lit.y1} · ${lit.n} px` +
    ` · corner ${m.cornerMean.toFixed(2)} · border ${m.borderMean.toFixed(2)}`);

  fs.writeFileSync(path.join(__dirname, '..', 'proof-p1-gold.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-rail-states',
    cell: 'p1-b5',
    baseline: TAG,
    sha256: { now, atTag: was },
    newBox: NEW_BOX,
    retiredBoxX: OLD_BOX,
    litBBox: lit,
    cornerMean: Number(m.cornerMean.toFixed(2)),
    borderMean: Number(m.borderMean.toFixed(2)),
    checks,
    failures
  }, null, 2));

  console.log(`\np1-b5 landed proof: ${failures} failure(s) -> review/act-2/proof-p1-gold.json`);
  process.exit(failures ? 1 : 0);
})();
