// R2.1 §G.1 — frame-capture proof of zero black flashes inside scene
// groups, both directions, including the table rise/lift designed
// exception.
//
// Method: park on one side of a boundary, press the key, then capture a
// burst of screenshots (~90ms apart for ~1.4s — spanning the 480ms overlay
// crossfade and the engine's former 2×250ms fade window). Every frame is
// decoded in-browser and scored: litFraction = share of pixels with any
// channel > 12/255. A frame is a VOID if litFraction < 0.04% — pure
// fade-through-black scores ~0%, while the dimmest legitimate frame in a
// group (the rail at its heavy dim) scores an order of magnitude above the
// threshold. The deck chrome is hidden during capture so the progress bar
// cannot mask a black canvas.
//
// Calibration: the detector is proven against a deterministic void — the
// authored black frame of 2-01 build 0 must score below the threshold — and
// a live standard (non-group) boundary is captured as an informational
// control (its brief black window can fall between screenshot samples, so
// it is recorded, not scored).
//
// Usage: node flash-check.cjs [--rm]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4310';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r2-1', 'flash-frames');
const REDUCED = process.argv.includes('--rm');

const VOID_THRESHOLD = 0.0004; // litFraction below this = a void frame
const FRAMES = 15;
const FRAME_GAP_MS = 90;

// [name, fromId, fromSlideNo (1-based), fromBuild, key, mode]
// mode: 'group' = must have zero void frames; 'control' = informational
// capture of a standard boundary (recorded, not scored).
const BOUNDARIES = [
  ['hours-field fwd 1-01→1-02', '1-01-eighty-thousand-hours', 1, 2, 'ArrowRight', 'group'],
  ['hours-field back 1-02→1-01', '1-02-the-conversion', 2, 0, 'ArrowLeft', 'group'],
  ['rail fwd 2-04→2-05 (table rise)', '2-04-the-competition-record', 9, 8, 'ArrowRight', 'group'],
  ['rail back 2-05→2-04 (table lift)', '2-05-two-survivors', 10, 0, 'ArrowLeft', 'group'],
  ['rail fwd 2-05→2-06 (table lift)', '2-05-two-survivors', 10, 5, 'ArrowRight', 'group'],
  ['rail back 2-06→2-05 (table rise)', '2-06-the-abstraction-ladder', 11, 0, 'ArrowLeft', 'group'],
  ['rail fwd 2-06→2-07', '2-06-the-abstraction-ladder', 11, 4, 'ArrowRight', 'group'],
  ['rail back 2-07→2-06', '2-07-the-severance', 12, 0, 'ArrowLeft', 'group'],
  ['rail fwd 2-07→2-08', '2-07-the-severance', 12, 4, 'ArrowRight', 'group'],
  ['rail back 2-08→2-07', '2-08-the-pattern', 13, 0, 'ArrowLeft', 'group'],
  // A standard teardown → fade → mount boundary outside any group; its
  // black window is real but brief, so this capture is informational.
  ['CONTROL standard 2-03→2-04', '2-03-the-convergence', 8, 3, 'ArrowRight', 'control']
];

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();

  // The analyzer page decodes each captured PNG and scores it.
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

  const results = [];

  // Detector calibration: the authored black frame of 2-01 build 0 must
  // score as a void.
  {
    await page.goto(`${BASE}/?slide=2-01-the-world-without-it`, { waitUntil: 'networkidle' });
    await page.evaluate(() => sessionStorage.clear());
    await page.addStyleTag({ content: '.deck-chrome, .jump-indicator { display: none !important; }' });
    await page.waitForTimeout(1600);
    const frac = await scoreFrame(await page.screenshot());
    const ok = frac < VOID_THRESHOLD;
    results.push({
      boundary: 'CALIBRATION: authored black frame (2-01 b0) reads as void',
      ok, expectVoid: true, voidFrames: ok ? 1 : 0,
      minLitFraction: Number(frac.toFixed(5)), landed: '2-01-the-world-without-it b0',
      fractions: [Number(frac.toFixed(5))]
    });
    console.log(`${ok ? 'ok  ' : 'FAIL'} CALIBRATION black frame :: lit=${(frac * 100).toFixed(4)}% (threshold ${(VOID_THRESHOLD * 100).toFixed(2)}%)`);
  }

  for (const [name, fromId, fromNo, fromBuild, key, mode] of BOUNDARIES) {
    await page.goto(`${BASE}/?slide=${fromId}`, { waitUntil: 'networkidle' });
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: fromNo, k: fromBuild });
    await page.reload({ waitUntil: 'networkidle' });
    // Hide the chrome so the progress bar can't light up a black canvas.
    await page.addStyleTag({ content: '.deck-chrome, .jump-indicator { display: none !important; }' });
    await page.waitForTimeout(1600);

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
    const ok = mode === 'control' ? true : voids === 0;
    results.push({
      boundary: name, ok, mode, voidFrames: voids,
      minLitFraction: Number(minFraction.toFixed(5)),
      landed: `${landed.id} b${landed.build}`, fractions
    });
    console.log(`${mode === 'control' ? 'info' : ok ? 'ok  ' : 'FAIL'} ${name} :: voids=${voids}/${FRAMES} minLit=${(minFraction * 100).toFixed(3)}% → ${landed.id} b${landed.build}`);
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
    path.join(OUT, REDUCED ? 'flash-check-results-rm.json' : 'flash-check-results.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log(`flash-check ${summary.variant}: ${results.length} boundaries, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
