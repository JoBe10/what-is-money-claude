// Act II systems — the FAST-scope cell checks.
//
// The same measured discipline every sheet in this project carries, in the
// dark-field gate's own terms (limits from docs/dark-field-manifest.md §0):
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255 — the
//      authored black ground holds at the frame corners;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the frame
//      edge (the compositional standard's fourth rule, measured rather than
//      eyeballed);
//   3. content present — some pixels above luminance 32;
//   4. the cell is 1920 × 1080.
//
// Plus two checks this sheet needs and the others did not, both made at the
// SOURCE rather than at the pixel:
//
//   NO ACCENT. None of the five ◆ frames carries the Claim Mark, so nothing on
//   this sheet may be orange. The obvious test — a hue test on the rendered
//   pixels — was written first and then thrown away, because it cannot work:
//   subpixel text antialiasing puts colour fringes on white glyph edges that
//   measure r−b = 215 against the accent's own 221. The two are not separable
//   per pixel, and a gate that cannot tell them apart is worse than no gate.
//   The measurement is still reported below as evidence, with that caveat
//   attached; the *check* is that no builder references the accent token, the
//   accent hex, the ClaimMark or the disc.
//
//   THE FROZEN DATA. The chart candidates must read src/data/purchasing-power.js
//   and never carry their own copy of it, so the check is that the import is
//   there and no series literal is.
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..', 'systems');

(async () => {
  const record = JSON.parse(fs.readFileSync(path.join(OUT, 'systems.json'), 'utf8'));
  const ids = record.cells.map((c) => c.id);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  const results = [];
  let failures = 0;

  for (const id of ids) {
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
      for (let y = 0; y < h; y += 1) {
        for (let x = 0; x < w; x += 1) {
          if (x >= ring && x < w - ring && y >= ring && y < h - ring) continue;
          rSum += lum((y * w + x) * 4); rN += 1;
        }
      }
      let above32 = 0; let max = 0; let warm = 0; let maxRB = 0;
      for (let i = 0; i < d.length; i += 4) {
        const L = lum(i);
        if (L > max) max = L;
        if (L > 32) above32 += 1;
        if (L > 24) {
          const rb = d[i] - d[i + 2];
          if (rb > maxRB) maxRB = rb;
          if (rb > 12) warm += 1;     // reported, not gated — see the header
        }
      }
      return { w, h, cornerMean: cSum / cN, borderMean: rSum / rN, above32, maxLum: max, warmPixels: warm, maxRB };
    }, `/review/act-2/systems/${id}.png`);

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
      pxAbove32: m.above32,
      warmPixelsReported: m.warmPixels,
      maxRedMinusBlueReported: m.maxRB
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${id.padEnd(14)} corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${String(m.above32).padStart(7)}`);
  }

  // ---- the two source checks ------------------------------------------------
  const src = fs.readFileSync(path.join(__dirname, 'systems.mjs'), 'utf8');
  const accentHits = ['--accent', '#F7931A', '#f7931a', 'ClaimMark', 'luminous-disc', 'LuminousDisc']
    .filter((needle) => src.includes(needle));
  const noAccent = accentHits.length === 0;
  if (!noAccent) failures += 1;
  console.log(`${noAccent ? 'PASS' : 'FAIL'}  SOURCE: no accent, no Claim Mark, no disc in any builder` +
    `${noAccent ? '' : ` :: ${accentHits.join(', ')}`}`);

  const readsFrozen = src.includes("from '/src/data/purchasing-power.js'");
  // A series literal would be a long run of two-decimal numbers; the builders
  // carry none — they map the imported arrays.
  const inlinedData = /\d{1,3}\.\d{2},\s*\d{1,3}\.\d{2},\s*\d{1,3}\.\d{2}/.test(src);
  const frozenOk = readsFrozen && !inlinedData;
  if (!frozenOk) failures += 1;
  console.log(`${frozenOk ? 'PASS' : 'FAIL'}  SOURCE: the chart reads the frozen data and carries no copy of it`);

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    limits: { cornerMean: 6, borderMean: 6 },
    reportedNotGated: 'warmPixelsReported / maxRedMinusBlueReported — subpixel text antialiasing measures r−b up to 215 against the accent’s 221, so a per-pixel hue test cannot separate them. The accent check is made at the source instead (below). The three network cells carry no text and measure 0, which is what shows the reading is antialiasing.',
    sourceChecks: { noAccent, accentHits, readsFrozenData: readsFrozen, inlinedData },
    cells: results,
    failures
  }, null, 2));

  console.log(`\n${results.length} cells checked, ${failures} failure(s) -> harness/check-cells.json`);
  await browser.close();
  process.exit(failures ? 1 : 0);
})();
