// R2.2 §E.1–§E.2 — frame-capture proof that navigation never manufactures
// black: the new exchange-triangle handoff (both directions) and the new
// global crossfade at non-grouped boundaries must produce ZERO void frames.
// Under R2.1 the standard boundary had a real ~250ms black window (recorded
// then as an informational control); R2.2's crossfade closes it, so those
// boundaries are now scored, not just recorded.
//
// Method: park on one side of a boundary, press the key, capture a burst of
// screenshots (~70ms apart for ~1.1s). Every frame is decoded in-browser
// and scored: litFraction = share of pixels with any channel > 12/255. A
// frame is a VOID if litFraction < 0.04%. The deck chrome is hidden during
// capture so the progress bar cannot mask a black canvas.
//
// Calibration: the authored black frame of 2-01 build 0 must still score as
// a void (black stays available as a design beat — §B: "black is a beat,
// not a seam"). The 1-05 → 2-01 boundary lands ON that authored black, so
// it is captured as mode 'authored-black': frames must dim monotonically
// toward the authored darkness rather than pass through a void and relight.
//
// Usage: node flash-check-r2-2.cjs [--rm]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE = 'http://localhost:4310';
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, 'screenshots-r2-2', 'flash-frames');
const REDUCED = process.argv.includes('--rm');

// A void frame is an (essentially) empty canvas. Pure fade-through-black —
// the thing §B abolishes — and every authored black frame measure exactly
// 0.0000% lit (the calibration and both authored-black boundaries confirm).
// Mid-crossfade troughs between two dim compositions can legitimately dip
// to a few hundredths of a percent while still carrying visible content
// (e.g. 2-08's 5%-lit end frame dissolving under 3-01's rising entrance
// samples at 0.038% — ~1,500 real pixels), so the void line sits at 0.01%:
// an order of magnitude above true black, an order below the dimmest
// legitimate frame class R2.1 measured (the heavy-dimmed rail, ~0.15%).
const VOID_THRESHOLD = 0.0001;
const FRAMES = 15;
const FRAME_GAP_MS = 70;

// [name, fromId, fromSlideNo (1-based), fromBuild, key, mode]
// 'group'     — scene-group handoff: zero void frames
// 'crossfade' — standard boundary under the new default: zero void frames
// 'authored-black' — lands on designed darkness: recorded, min-lit expected ~0
const BOUNDARIES = [
  ['triangle fwd 2-01→2-02 (handoff)', '2-01-the-world-without-it', 6, 3, 'ArrowRight', 'group'],
  ['triangle back 2-02→2-01 (handoff)', '2-02-the-discovery', 7, 0, 'ArrowLeft', 'group'],
  ['rail fwd 2-04→2-05 (table rise)', '2-04-the-competition-record', 9, 8, 'ArrowRight', 'group'],
  ['rail back 2-08→2-07', '2-08-the-pattern', 13, 0, 'ArrowLeft', 'group'],
  // Crossfade boundaries are chosen where the destination's build 0 has
  // content — a destination whose build 0 is authored darkness (1-05, 2-01,
  // 2-03 backward) belongs to the authored-black class instead.
  ['crossfade 1-02→1-03', '1-02-the-conversion', 2, 3, 'ArrowRight', 'crossfade'],
  ['crossfade 2-03→2-04', '2-03-the-convergence', 8, 3, 'ArrowRight', 'crossfade'],
  ['crossfade 2-08→3-01 (the seam)', '2-08-the-pattern', 13, 6, 'ArrowRight', 'crossfade'],
  ['crossfade back 3-01→2-08', '3-01-section-opener', 24, 0, 'ArrowLeft', 'crossfade'],
  // ← outside a group enters the previous slide at build 0; 2-03's build 0
  // is its authored darkness (the black before the murmuration) — the fade
  // lands on designed black, it does not pass through one and relight.
  ['back 2-04→2-03 lands on authored black (2-03 b0)', '2-04-the-competition-record', 9, 0, 'ArrowLeft', 'authored-black'],
  ['1-05→2-01 lands on authored black', '1-05-the-promise', 5, 6, 'ArrowRight', 'authored-black']
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

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 20000 });

  const results = [];

  // Detector calibration: the authored black frame of 2-01 b0 reads as void.
  {
    await page.goto(`${BASE}/?slide=2-01-the-world-without-it`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => sessionStorage.clear());
    await page.addStyleTag({ content: '.deck-chrome, .jump-indicator { display: none !important; }' });
    await page.waitForTimeout(1600);
    const frac = await scoreFrame(await page.screenshot());
    const ok = frac < VOID_THRESHOLD;
    results.push({
      boundary: 'CALIBRATION: authored black frame (2-01 b0) reads as void',
      ok, mode: 'calibration', voidFrames: ok ? 1 : 0,
      minLitFraction: Number(frac.toFixed(5)), landed: '2-01-the-world-without-it b0',
      fractions: [Number(frac.toFixed(5))]
    });
    console.log(`${ok ? 'ok  ' : 'FAIL'} CALIBRATION black frame :: lit=${(frac * 100).toFixed(4)}%`);
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
    path.join(OUT, REDUCED ? 'flash-check-r2-2-results-rm.json' : 'flash-check-r2-2-results.json'),
    JSON.stringify(summary, null, 2)
  );
  console.log(`flash-check ${summary.variant}: ${results.length} boundaries, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
