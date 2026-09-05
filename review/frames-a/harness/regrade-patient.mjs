// Batch A selections — the `patient` corner regrade, in post.
//
// The Batch A gate held `patient` on one clause of five: the top-left corner
// patch measured 64.73 against a limit of 6, because the key light's shaft is
// in frame at the upper left. Everything else passed with room — border 2.79,
// 86.1% dark, R−B +122.6, 100% of the highlight population warm. This is the
// surgeon's failure class from R7.2: a light source reaching the frame, not a
// wrong grade, and the presenter ordered the R7.4-class fix attempted before
// any regeneration (docs/batch-a-selections-brief.md §1.7, §3).
//
// R7.4's pass on the surgeon could crop, because the lamp sat in a corner the
// subject did not need. Here it cannot: the subject already fills 0.70 × 0.90
// of the frame, and the crop that would remove the shaft removes the head. So
// this is the other move in the same set — a **corner window**: a burn anchored
// at the offending corner, black at its core and ramping back to untouched
// through a smoothstep, which is a colorist's power window and nothing more. No
// pixel is painted, retouched or invented.
//
// WHY THESE TWO NUMBERS, and why they are safe rather than merely tasteful:
//
//   The shaft is smooth; the subject has edges. Measuring local luminance
//   variance in 24px blocks separates them exactly, and the separation is
//   clean: the nearest *structured* block to the corner sits at r = 0.319 of
//   the frame diagonal, and the nearest pixel the key actually modelled
//   (L ≥ 90) at r = 0.331. Everything closer to the corner than that is shaft.
//
//   So the window ends at r = 0.30 — inside the shaft, short of the subject by
//   a measured margin — and reaches full black at r = 0.12, which contains the
//   whole failing corner patch (its far corner is r = 0.053) several times
//   over. The consequence is not an estimate: **zero pixels of L ≥ 90 change
//   at all**, and the brightest pixel anywhere inside the window's reach is
//   L = 80 — the shaft's own core. The subject cannot be clipped by an
//   operation that never touches it.
//
// WHAT WAS TRIED AND REJECTED. R7.4's third move, the global black-point crush,
// was tried at [14,34] — gentler than either parameter set R7.4 shipped — and
// it visibly collapsed the gown's shadow side: the right shoulder and the lower
// tie went to black. The patient is lit far lower-key than the surgeon or the
// steak, and its subject *lives* in the tones a crush lifts. That is the stop
// condition in §3 of the brief, so the crush is not here. A version masked to
// the window was also measured; it changes the ambient census by less than one
// unit, because what remains lies outside any window that can avoid the
// subject. The pass is one operation because one operation is what the image
// needs.
//
// Usage: node review/frames-a/harness/regrade-patient.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../..');
const EVIDENCE = path.join(here, '..', 'dark-field');
const SRC = path.join(EVIDENCE, 'patient--as-generated.png');
const DROP = path.join(repo, 'assets', 'dark-field', 'incoming');

// window: [inner, outer] as fractions of the frame diagonal, measured from the
// top-left corner. Inside `inner` the frame is stage black; between the two the
// multiplier smoothsteps back to 1; outside `outer` nothing is touched at all.
const PASS = {
  subject: 'patient',
  anchor: 'top-left',
  window: [0.12, 0.30],
  // recorded so the margin is auditable, not just asserted
  measured: {
    nearestStructuredBlock: 0.319,
    nearestModelledPixel: 0.331,
    failingCornerPatchOuterRadius: 0.053
  }
};

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<canvas id="c"></canvas>');

const buf = fs.readFileSync(SRC);
await page.evaluate((src) => new Promise((res, rej) => {
  const img = new Image();
  img.onload = () => { window.__img = img; res(); };
  img.onerror = rej;
  img.src = src;
}), `data:image/png;base64,${buf.toString('base64')}`);

const out = await page.evaluate(({ window: win }) => {
  const img = window.__img;
  const c = document.getElementById('c');
  const W = c.width = img.naturalWidth;
  const H = c.height = img.naturalHeight;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, W, H);
  const p = d.data;
  const diag = Math.hypot(W, H);
  const lum = (i) => 0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2];

  const [inner, outer] = win;
  let touched = 0;
  let brightestTouched = 0;
  let maxDropModelled = 0;
  for (let y = 0; y < H; y += 1) {
    for (let x = 0; x < W; x += 1) {
      const i = (y * W + x) * 4;
      const r = Math.hypot(x, y) / diag;
      if (r >= outer) continue;
      const before = lum(i);
      let f = 0;
      if (r > inner) {
        const t = (r - inner) / (outer - inner);
        f = t * t * (3 - 2 * t);          // smoothstep, so the falloff has no ring
      }
      p[i] *= f; p[i + 1] *= f; p[i + 2] *= f;
      touched += 1;
      if (before > brightestTouched) brightestTouched = before;
      if (before >= 90) {
        const drop = before - lum(i);
        if (drop > maxDropModelled) maxDropModelled = drop;
      }
    }
  }
  ctx.putImageData(d, 0, 0);
  return {
    width: W,
    height: H,
    pixelsTouched: touched,
    brightestPixelTouched: Number(brightestTouched.toFixed(1)),
    maxDropOnModelledSubject: Number(maxDropModelled.toFixed(2)),
    dataUrl: c.toDataURL('image/png')
  };
}, PASS);

await browser.close();

const png = Buffer.from(out.dataUrl.split(',')[1], 'base64');
fs.mkdirSync(DROP, { recursive: true });
fs.writeFileSync(path.join(DROP, 'patient.png'), png);
fs.writeFileSync(path.join(EVIDENCE, 'patient--regraded.png'), png);

const record = {
  phase: 'batch-a-selections',
  date: '2026-08-25',
  source: path.relative(repo, SRC).replace(/\\/g, '/'),
  pass: PASS,
  result: {
    width: out.width,
    height: out.height,
    bytes: png.length,
    pixelsTouched: out.pixelsTouched,
    brightestPixelTouched: out.brightestPixelTouched,
    maxDropOnModelledSubject: out.maxDropOnModelledSubject
  }
};
fs.writeFileSync(path.join(EVIDENCE, 'regrade-patient.json'), JSON.stringify(record, null, 2));

console.log(`patient: window ${PASS.window.join('–')} of the diagonal from the ${PASS.anchor} corner`);
console.log(`  ${out.pixelsTouched} px inside the window; brightest of them L=${out.brightestPixelTouched} (the shaft)`);
console.log(`  max drop on a pixel the key modelled (L>=90): ${out.maxDropOnModelledSubject}`);
console.log(`  → assets/dark-field/incoming/patient.png (${(png.length / 1024).toFixed(0)} kB)`);
console.log('\nrun the grade gate next:');
console.log('  node review/rebuild-r7-2/harness/grade-r7-2.cjs --dir assets/dark-field/incoming \\');
console.log('    --out review/frames-a/harness --name grade-selections-patient.json');
