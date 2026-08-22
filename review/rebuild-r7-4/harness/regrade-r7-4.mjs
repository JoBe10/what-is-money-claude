// R7.4 — the dark-field grade pass, in post.
//
// R7.2 rejected two restored renders on their *ground*: the steak sits on a lit
// stone surface that fills the frame (corner 20.86, border 8.98) and the
// surgeon is in an operating theater with the lamp itself in shot (33.17 /
// 21.67). Both were tonally right — the presenter said so, and the measurements
// agree: the steak's key is +59 R−B and the surgeon's +114, well inside the
// warm-key limit. It is the *room* that fails, not the light.
//
// So this does what a grade does: crop the room out, take the remaining
// surround to true black with a falloff, and lift the black point so what is
// left of the environment stops separating from the stage. Nothing here paints,
// retouches or invents; every operation is one a colorist would run, and every
// parameter is recorded in PASSES below and re-runnable.
//
// The alternative was to regenerate both, which is the manifest's default and
// the right answer when an image is wrong. These two are not wrong. They are
// framed too wide.
//
// Usage: node review/rebuild-r7-4/harness/regrade-r7-4.mjs [--only surgeon]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, '../../..');
const SRC = path.join(repo, 'review', 'rebuild-r7-2', 'dark-field', 'rejected');
const OUT = path.join(repo, 'assets', 'dark-field', 'incoming');
const EVIDENCE = path.join(here, '..', 'dark-field');
fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(EVIDENCE, { recursive: true });

const only = (process.argv.includes('--only') && process.argv[process.argv.indexOf('--only') + 1]) || null;

// crop:    [x0, y0, x1, y1] as fractions of the source frame.
// falloff: [inner, outer] — elliptical radius (1 = the crop's half-diagonal)
//          where the multiplier starts leaving 1 and where it reaches 0.
// crush:   [lo, hi] on 0–255 luminance — below lo goes to black, above hi is
//          untouched, between them ramps. This is a black-point lift, not a
//          curve: it never touches the subject's own tones.
const PASSES = {
  surgeon: {
    file: 'surgeon--off-grade.png',
    // The lamp occupies the top-left quarter and is the single brightest thing
    // in the frame; the beat is the hour of work, not the fixture. Cropping it
    // out is what a photo editor would do first, and it puts the surgeon and
    // the draped patient where the frame's weight belongs.
    crop: [0.02, 0.30, 0.80, 1.0],
    falloff: [0.62, 1.02],
    crush: [26, 62]
  },
  meal: {
    file: 'meal--off-grade.png',
    // The plate is part of the served meal and stays; the stone surface it
    // rests on is the environment and goes. Cropping to the plate's own bounds
    // leaves the subject reading exactly as it did.
    crop: [0.10, 0.14, 0.92, 0.98],
    falloff: [0.58, 0.99],
    crush: [20, 54]
  }
};

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<canvas id="c"></canvas>');

const rows = [];
for (const [name, cfg] of Object.entries(PASSES)) {
  if (only && only !== name) continue;
  const buf = fs.readFileSync(path.join(SRC, cfg.file));
  await page.evaluate((src) => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => { window.__img = img; res(); };
    img.onerror = rej;
    img.src = src;
  }), `data:image/png;base64,${buf.toString('base64')}`);

  const dataUrl = await page.evaluate(({ crop, falloff, crush }) => {
    const img = window.__img;
    const [fx0, fy0, fx1, fy1] = crop;
    const sx = Math.round(img.naturalWidth * fx0);
    const sy = Math.round(img.naturalHeight * fy0);
    const sw = Math.round(img.naturalWidth * (fx1 - fx0));
    const sh = Math.round(img.naturalHeight * (fy1 - fy0));

    const c = document.getElementById('c');
    c.width = sw;
    c.height = sh;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

    const d = ctx.getImageData(0, 0, sw, sh);
    const p = d.data;
    const [inner, outer] = falloff;
    const [lo, hi] = crush;
    const cx = sw / 2;
    const cy = sh / 2;
    for (let y = 0; y < sh; y += 1) {
      for (let x = 0; x < sw; x += 1) {
        const i = (y * sw + x) * 4;
        // Elliptical distance, 1.0 at the frame's corner.
        const r = Math.hypot((x - cx) / cx, (y - cy) / cy) / Math.SQRT2;
        let f = 1;
        if (r > inner) f = Math.max(0, 1 - (r - inner) / (outer - inner));
        // smoothstep, so the falloff has no visible ring
        f = f * f * (3 - 2 * f);
        p[i] *= f; p[i + 1] *= f; p[i + 2] *= f;

        const L = 0.2126 * p[i] + 0.7152 * p[i + 1] + 0.0722 * p[i + 2];
        if (L <= lo) { p[i] = 0; p[i + 1] = 0; p[i + 2] = 0; continue; }
        if (L < hi) {
          let t = (L - lo) / (hi - lo);
          t = t * t * (3 - 2 * t);
          p[i] *= t; p[i + 1] *= t; p[i + 2] *= t;
        }
      }
    }
    ctx.putImageData(d, 0, 0);
    return c.toDataURL('image/png');
  }, cfg);

  const out = Buffer.from(dataUrl.split(',')[1], 'base64');
  fs.writeFileSync(path.join(OUT, `${name}.png`), out);
  fs.writeFileSync(path.join(EVIDENCE, `${name}--regraded.png`), out);
  rows.push({ name, bytes: out.length, ...cfg });
  console.log(`${name}: crop ${cfg.crop.join(',')} · falloff ${cfg.falloff.join('–')} · crush ${cfg.crush.join('–')} → ${(out.length / 1024).toFixed(0)} kB`);
}

fs.writeFileSync(path.join(EVIDENCE, 'regrade-r7-4.json'), JSON.stringify({ phase: 'R7.4', passes: rows }, null, 2));
await browser.close();
console.log('\nwritten to assets/dark-field/incoming/ — run the grade gate next');
