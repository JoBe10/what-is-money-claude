// Prologue — the FAST-scope cell checks
// (docs/gate-2-close-and-prologue-states-brief.md §5: grade/brightness checks
// on every rendered cell through the states pipeline).
//
// Three measured checks per cell, in the dark-field gate's own terms
// (review/rebuild-r7-2/harness/grade-r7-2.cjs; limits from the manifest §0):
//   1. corner patches (6% of the short side) mean luminance ≤ 6/255 — the
//      authored black ground holds at the frame corners;
//   2. outer 2% border ring mean luminance ≤ 6/255 — nothing reaches the
//      frame edge (the compositional standard's fourth rule, measured);
//   3. content present — some pixels above luminance 32 (p1-b0, the authored
//      entry black, asserts the opposite: nothing above 6).
// Plus one identity proof: p2-b2 (the hold cell) against p2-b1 (the carried
// approval) — differing-pixel count reported, since the hold is the same
// composition by design.
//
// Measured in-page on a canvas (the repo's grade harnesses' technique; no
// image library is a dependency of this project).
//
// Usage: node check-cells.cjs [--port 5273]
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i > -1 ? args[i + 1] : d; };
const PORT = flag('--port', '5273');
const OUT = path.join(__dirname, '..', 'states');

(async () => {
  const record = JSON.parse(fs.readFileSync(path.join(OUT, 'states.json'), 'utf8'));
  const ids = record.cells.map((c) => c.id);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 300 } });
  await page.goto(`http://127.0.0.1:${PORT}/?proto=list`, { waitUntil: 'domcontentloaded' });

  const results = [];
  let failures = 0;

  for (const id of ids) {
    const url = `/review/prologue/states/${id}.png`;
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
      for (const [px, py] of corners) {
        for (let y = py; y < py + patch; y += 1) {
          for (let x = px; x < px + patch; x += 1) { cSum += lum((y * w + x) * 4); cN += 1; }
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
      let above32 = 0; let above6 = 0; let max = 0;
      for (let i = 0; i < d.length; i += 4) {
        const L = lum(i);
        if (L > 32) above32 += 1;
        if (L > 6) above6 += 1;
        if (L > max) max = L;
      }
      return {
        w, h,
        cornerMean: cSum / cN,
        borderMean: rSum / rN,
        above32, above6,
        maxLum: max
      };
    }, url);

    const checks = {
      corner: m.cornerMean <= 6,
      border: m.borderMean <= 6,
      content: id === 'p1-b0' ? m.above6 === 0 : m.above32 > 200,
      size: m.w === 1920 && m.h === 1080
    };
    const pass = Object.values(checks).every(Boolean);
    if (!pass) failures += 1;
    results.push({
      id,
      pass,
      checks,
      cornerMean: Number(m.cornerMean.toFixed(2)),
      borderMean: Number(m.borderMean.toFixed(2)),
      maxLum: Number(m.maxLum.toFixed(1)),
      pxAbove32: m.above32
    });
    console.log(`${pass ? 'PASS' : 'FAIL'}  ${id}  corner ${m.cornerMean.toFixed(2)}  border ${m.borderMean.toFixed(2)}  max ${m.maxLum.toFixed(0)}  lit ${m.above32}`);
  }

  // The hold-cell identity proof: p2-b2 vs p2-b1.
  const hold = await page.evaluate(async () => {
    const load = async (src) => {
      const img = new Image();
      img.src = src;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    };
    const a = await load('/review/prologue/states/p2-b1.png');
    const b = await load('/review/prologue/states/p2-b2.png');
    if (a.length !== b.length) return { comparable: false };
    let diff = 0; let maxDelta = 0;
    for (let i = 0; i < a.length; i += 4) {
      const d = Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2]));
      if (d > 0) diff += 1;
      if (d > maxDelta) maxDelta = d;
    }
    return { comparable: true, differingPixels: diff, maxChannelDelta: maxDelta };
  });
  console.log(`hold proof  p2-b2 vs p2-b1: ${JSON.stringify(hold)}`);

  fs.writeFileSync(path.join(__dirname, 'check-cells.json'), JSON.stringify({
    date: new Date().toISOString(),
    limits: { cornerMean: 6, borderMean: 6 },
    cells: results,
    holdProof: hold,
    failures
  }, null, 2));

  console.log(`\n${results.length} cells checked, ${failures} failure(s) -> harness/check-cells.json`);
  await browser.close();
  process.exit(failures ? 1 : 0);
})();
