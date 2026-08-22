// R3.1 frame-capture proof (§C.1 carried forward): navigation never
// manufactures black. Section 3's non-group slides open on authored black
// beats, so most of its boundaries belong to the authored-black class (they
// dim monotonically into designed darkness, never void-then-relight); the
// ladder group and the seam into Section 4 must show zero void frames.
//
// Two boundaries move at R3.1. 3-06 now exits from build 6 — the held
// question, whose stage is one lit line into darkness with no copy: the
// dimmest non-black frame in the section, and so the sharpest test of the
// authored-black classification. 3-05 → 3-06 joins the list, because both
// sides of that boundary changed.
//
// Method and thresholds inherited from the R2.2 detector: 15 frames at
// ~70ms, litFraction = share of pixels with any channel > 12/255, void
// below 0.01% lit. Calibration: 3-00 build 0 (the authored black beat
// before the waypoint return) must score exactly as void.
//
// Usage: node flash-check-r3-1.cjs [--rm]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4311';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r3-1', 'flash-frames');
const REDUCED = process.argv.includes('--rm');

const VOID_THRESHOLD = 0.0001;
const FRAMES = 15;
const FRAME_GAP_MS = 70;

// [name, fromId, fromSlideNo (1-based), fromBuild, key, mode]
const BOUNDARIES = [
  ['ladder fwd 3-03 b6 → 3-04 (handoff)', '3-03-the-order-of-monetization', 17, 6, 'ArrowRight', 'group'],
  ['ladder back 3-04 b0 → 3-03 b6 (handoff)', '3-04-stage-signatures', 18, 0, 'ArrowLeft', 'group'],
  ['the seam 3-08 b2 → 4-01 (crossfade)', '3-08-waypoint-judge', 22, 2, 'ArrowRight', 'crossfade'],
  ['S2→S3 seam 2-08 b6 → 3-00 lands on authored black', '2-08-the-pattern', 13, 6, 'ArrowRight', 'authored-black'],
  ['3-00 b2 → 3-01 lands on authored black', '3-00-waypoint-function', 14, 2, 'ArrowRight', 'authored-black'],
  ['3-02 b3 → 3-03 lands on authored black', '3-02-the-functions-separate', 16, 3, 'ArrowRight', 'authored-black'],
  ['3-04 b2 → 3-05 lands on authored black', '3-04-stage-signatures', 18, 2, 'ArrowRight', 'authored-black'],
  ['3-05 b5 → 3-06 lands on authored black', '3-05-the-palladium-test', 19, 5, 'ArrowRight', 'authored-black'],
  ['3-06 b6 → 3-07 lands on authored black', '3-06-what-your-money-is', 20, 6, 'ArrowRight', 'authored-black'],
  ['3-07 b5 → 3-08 lands on authored black', '3-07-where-bitcoin-is', 21, 5, 'ArrowRight', 'authored-black'],
  ['seam back 4-01 b0 → 3-08 lands on authored black', '4-01-ideal-store-of-value', 23, 0, 'ArrowLeft', 'authored-black'],
  ['back 3-03 b0 → 3-02 (black to black)', '3-03-the-order-of-monetization', 17, 0, 'ArrowLeft', 'authored-black']
];

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();

  const analyzer = await context.newPage();
  await analyzer.goto('about:blank');
  const scoreFrame = (buf) => analyzer.evaluate(async (dataUrl) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = dataUrl; });
    const w = 480;
    const h = 270;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const data = ctx.getImageData(0, 0, w, h).data;
    let lit = 0;
    const total = w * h;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 12 || data[i + 1] > 12 || data[i + 2] > 12) lit += 1;
    }
    return lit / total;
  }, `data:image/png;base64,${buf.toString('base64')}`);

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 25000 });

  const results = [];

  // Detector calibration: the authored black beat of 3-00 b0 reads as void.
  {
    await page.goto(`${BASE}/?slide=3-00-waypoint-function`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.addStyleTag({ content: '.deck-chrome, .jump-indicator { display: none !important; }' });
    await page.waitForTimeout(1600);
    const frac = await scoreFrame(await page.screenshot());
    const ok = frac < VOID_THRESHOLD;
    results.push({
      boundary: 'CALIBRATION: authored black beat (3-00 b0) reads as void',
      ok, mode: 'calibration', voidFrames: ok ? 1 : 0,
      minLitFraction: Number(frac.toFixed(5)), landed: '3-00-waypoint-function b0',
      fractions: [Number(frac.toFixed(5))]
    });
    console.log(`${ok ? 'ok  ' : 'FAIL'} CALIBRATION black beat :: lit=${(frac * 100).toFixed(4)}%`);
  }

  for (const [name, fromId, fromNo, fromBuild, key, mode] of BOUNDARIES) {
    await page.goto(`${BASE}/?slide=${fromId}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: fromNo, k: fromBuild });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.addStyleTag({ content: '.deck-chrome, .jump-indicator { display: none !important; }' });
    await page.waitForTimeout(1800);

    await page.keyboard.press(key);
    const fractions = [];
    let minFraction = 1;
    let voids = 0;
    for (let f = 0; f < FRAMES; f += 1) {
      const t0 = Date.now();
      const buf = await page.screenshot();
      const frac = await scoreFrame(buf);
      fractions.push(Number(frac.toFixed(5)));
      if (frac < minFraction) minFraction = frac;
      if (frac < VOID_THRESHOLD) {
        voids += 1;
        if (voids === 1) {
          fs.writeFileSync(path.join(SHOTS, `VOID-${name.replace(/[^\w-]+/g, '_')}-f${f}.png`), buf);
        }
      }
      const spent = Date.now() - t0;
      if (spent < FRAME_GAP_MS) await page.waitForTimeout(FRAME_GAP_MS - spent);
    }
    const landed = await page.evaluate(() => ({
      id: window.__deck.slides[window.__deck.index].id,
      build: window.__deck.buildStep
    }));
    let ok = true;
    if (mode === 'group' || mode === 'crossfade') ok = voids === 0;
    if (mode === 'authored-black') {
      // Must dim toward the authored darkness without a void-then-relight
      // dip: once a frame is void, every later frame stays void.
      const firstVoid = fractions.findIndex((v) => v < VOID_THRESHOLD);
      ok = firstVoid === -1 || fractions.slice(firstVoid).every((v) => v < VOID_THRESHOLD);
    }
    results.push({
      boundary: name, ok, mode, voidFrames: voids,
      minLitFraction: Number(minFraction.toFixed(5)),
      landed: `${landed.id} b${landed.build}`, fractions
    });
    console.log(`${ok ? 'ok  ' : 'FAIL'} [${mode}] ${name} :: voids=${voids}/${FRAMES} minLit=${(minFraction * 100).toFixed(3)}% → ${landed.id} b${landed.build}`);
  }

  const failures = results.filter((r) => !r.ok);
  const summary = {
    variant: REDUCED ? 'reduced-motion' : 'standard',
    date: new Date().toISOString(),
    threshold: VOID_THRESHOLD,
    frames: FRAMES,
    frameGapMs: FRAME_GAP_MS,
    boundaries: results.length,
    failures: failures.length,
    results
  };
  fs.writeFileSync(
    path.join(OUT, REDUCED ? 'flash-check-r3-1-results-rm.json' : 'flash-check-r3-1-results.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log(`flash-check ${summary.variant}: ${results.length} boundaries, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
