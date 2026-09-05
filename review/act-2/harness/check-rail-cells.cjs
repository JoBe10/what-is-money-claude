// Act II rail states — the per-cell checks (docs/act-2-rail-states-brief.md §4;
// re-run over the r2 re-render, docs/act-2-rail-r2-brief.md §4).
//
// The pipeline's own gates, in the dark-field gate's terms (limits from
// docs/dark-field-manifest.md §0), run over every NEW rail cell:
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255;
//   2. outer 2% border ring mean luminance ≤ 6/255 — the compositional
//      standard's nothing-touches-the-frame-edge rule, measured;
//   3. content present — pixels above luminance 32;
//   4. the cell is 1920×1080.
//
// Carried cells are skipped by design: their bytes are the approved states
// sheet's, already measured green at their own session (checked 47/47 at r2),
// and byte-identity is proven by the capture's file copy.
//
// Usage: node check-rail-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..', 'rail');

(async () => {
  const record = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  const cells = record.cells.filter((c) => c.kind !== 'carried');
  const skipped = record.cells.filter((c) => c.kind === 'carried').map((c) => c.id);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  const results = [];
  let failures = 0;

  for (const { id } of cells) {
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
      let above32 = 0; let max = 0;
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          const L = lum((y * w + x) * 4);
          if (x < ring || x >= w - ring || y < ring || y >= h - ring) { rSum += L; rN += 1; }
          if (L > 32) above32 += 1;
          if (L > max) max = L;
        }
      }
      return { w, h, cornerMean: cSum / cN, borderMean: rSum / rN, above32, maxLum: max };
    }, `/review/act-2/rail/${id}.png`);

    const checks = {
      corner: m.cornerMean <= 6,
      border: m.borderMean <= 6,
      content: m.above32 > 200,
      size: m.w === 1920 && m.h === 1080
    };
    const pass = Object.values(checks).every(Boolean);
    if (!pass) failures += 1;
    results.push({
      id, pass, checks,
      cornerMean: Number(m.cornerMean.toFixed(2)),
      borderMean: Number(m.borderMean.toFixed(2)),
      maxLum: Number(m.maxLum.toFixed(1)),
      pxAbove32: m.above32
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${id.padEnd(16)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}`);
  }

  fs.writeFileSync(path.join(__dirname, 'check-rail-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    session: 'act-2-rail-r2',
    limits: { cornerMean: 6, borderMean: 6 },
    skippedCarried: skipped,
    skippedReason: 'carried cells ship the approved states sheet’s bytes, measured green at their own session; byte-identity is by file copy',
    cells: results,
    failures
  }, null, 2));

  console.log(`\n${results.length} new cells checked (${skipped.length} carried skipped), ${failures} failure(s) -> harness/check-rail-cells.json`);
  await browser.close();
  process.exit(failures ? 1 : 0);
})();
