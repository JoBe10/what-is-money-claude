// R7 frame-capture proof — "black is a beat, not a seam" (rebuild brief §3.5).
//
// Method inherited from R2.2 §E and R3: park on one side of a boundary, press
// the key, capture 15 frames across the transition window, and score each
// frame's litFraction — the share of pixels with any channel above 12/255. A
// frame below 0.01% lit is a void. Decoding happens in a second page on a
// canvas, which is how the R4 regression harness reads PNGs without a decoder
// dependency. The deck chrome is hidden so the progress bar cannot mask a black
// canvas.
//
// Four boundary classes:
//   crossfade      — zero void frames permitted, in either direction
//   build          — a within-slide advance between two lit frames: zero voids
//   authored-black — the landing IS darkness (4.01, the close): the
//                    requirement is that it dims monotonically and never
//                    relights, which is what distinguishes a designed beat from
//                    a manufactured seam. Black→black landings belong here too:
//                    `←` enters the previous slide at build 0 (SlideEngine
//                    L267), so backing out of 4.01 b0 lands on 3.8's own
//                    authored black beat — R3 classified that same boundary this
//                    way, and its window is legitimately void end to end.
//   from-black     — a within-slide advance that RISES out of an authored black
//                    hold (the close b0 → b1). Its first frames are legitimately
//                    void; what must hold is that the window ends lit and never
//                    falls back to void once it has lit. Demanding zero voids
//                    here would be demanding the black hold not be black.
//
// Usage: node flash-r7.cjs [--rm] [--port 4312]
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i > -1 ? args[i + 1] : fallback;
};
const PORT = flag('--port', '4312');
const REDUCED = args.includes('--rm');
const BASE = `http://localhost:${PORT}`;
const OUT = path.join(__dirname, '..');
const SHOTS = path.join(OUT, REDUCED ? 'flash-frames-rm' : 'flash-frames');
fs.mkdirSync(SHOTS, { recursive: true });

const FRAMES = 15;
const FRAME_MS = 70;
const VOID_LIT = 0.0001; // 0.01%

const BOUNDARIES = [
  { name: 'CALIBRATION — 4.01 b0 authored black', from: ['4-01-define-the-job', 0], key: null, cls: 'calibration' },
  { name: 'S3→S4 seam · 3.8 b2 → 4.01 b0', from: ['3-08-waypoint-judge', 2], key: 'ArrowRight', cls: 'authored-black' },
  { name: 'S3→S4 seam back · 4.01 b0 → 3.8 b0', from: ['4-01-define-the-job', 0], key: 'ArrowLeft', cls: 'authored-black' },
  { name: '4.01 b4 → 4.03', from: ['4-01-define-the-job', 4], key: 'ArrowRight', cls: 'crossfade' },
  // R7.2: the deck's two register switches. 4.03 → 4.04 crosses from the
  // dark-field anchor to the line-led mechanism, and 2.4 b5 → b6 crosses
  // registers *within* a slide — a render fading out while a line draws in is
  // exactly the shape that could leave a void frame between them.
  { name: '4.03 b4 → 4.04 (dark-field → line grammar)', from: ['4-03-simple-exchange', 4], key: 'ArrowRight', cls: 'crossfade' },
  { name: '2.4 b5 → b6 (the register switch)', from: ['2-04-the-competition-record', 5], key: 'ArrowRight', cls: 'build' },
  { name: '2.4 b6 → b5 (back through the switch)', from: ['2-04-the-competition-record', 6], key: 'ArrowLeft', cls: 'build' },
  // R7.3: the pattern's de-crowding clears two 40px thesis lines on the same
  // advance that lands the entrant at the dark end of the rail. A build that
  // takes two things off the frame and puts one on at the far side of it is
  // exactly the shape that can leave a void frame in the middle.
  { name: '2.8 b4 → b5 (the thesis clears as the entrant lands)', from: ['2-08-the-pattern', 4], key: 'ArrowRight', cls: 'build' },
  { name: '2.8 b5 → b4 (back)', from: ['2-08-the-pattern', 5], key: 'ArrowLeft', cls: 'build' },
  { name: '4.04 b4 → 4.05 (the claim carried across)', from: ['4-04-unfinished-exchange', 4], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.05 b0 → 4.04 (back)', from: ['4-05-spend-or-save', 0], key: 'ArrowLeft', cls: 'crossfade' },
  { name: '4.06 b4 → 4.07', from: ['4-06-claim-and-carrier', 4], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.09 b5 → 4.10', from: ['4-09-future-is-unknowable', 5], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.14 b2 → 4.15', from: ['4-14-ten-properties', 2], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.16 b3 → 4.17', from: ['4-16-the-comparison', 3], key: 'ArrowRight', cls: 'crossfade' },
  // R7.1 §C2 gave 4.20 an eighth build, so the slide's last frame is b8. Left
  // at b7 this row advanced *within* the slide and passed while testing a
  // boundary that no longer existed.
  // R7.4 §D.4 deleted the falsifiability slide, so the boundary it sat between
  // is now one seam: 4.20's last build (7 after §E's rebuild) into 4.21.
  { name: '4.20 b7 → 4.21', from: ['4-20-bitcoin-does-not-replace-everything', 7], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.22 b3 → 4.23', from: ['4-22-fixed-supply-reprices-at-margin', 3], key: 'ArrowRight', cls: 'crossfade' },
  { name: '4.23 b2 → the close b0 (the black hold)', from: ['4-23-investment-case-from-first-principles', 2], key: 'ArrowRight', cls: 'authored-black' },
  { name: 'the close b0 → b1 (the road returns)', from: ['5-01-thank-you', 0], key: 'ArrowRight', cls: 'from-black' },
  { name: 'the close b1 → b2 (the line dissolves)', from: ['5-01-thank-you', 1], key: 'ArrowRight', cls: 'build' }
];

const results = [];
function check(name, ok, detail) {
  results.push({ name, ok: Boolean(ok), detail: detail == null ? '' : String(detail) });
  if (!ok) console.log(`FAIL  ${name} :: ${detail}`);
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    reducedMotion: REDUCED ? 'reduce' : 'no-preference'
  });
  const page = await context.newPage();
  const scorer = await context.newPage();
  await scorer.setContent('<canvas id="c"></canvas>');

  const litFraction = (buf) => scorer.evaluate(async (src) => {
    const img = new Image();
    await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = src; });
    const c = document.getElementById('c');
    // Downscale 4× — the measure is a share of the frame, and a quarter-scale
    // sample of a 1080p frame is a million pixels of evidence.
    c.width = Math.round(img.width / 4);
    c.height = Math.round(img.height / 4);
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, c.width, c.height);
    const { data } = ctx.getImageData(0, 0, c.width, c.height);
    let lit = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 12 || data[i + 1] > 12 || data[i + 2] > 12) lit += 1;
    }
    return lit / (c.width * c.height);
  }, `data:image/png;base64,${buf.toString('base64')}`);

  const ready = () => page.waitForFunction(() => window.__deck, null, { timeout: 30000 });
  const manifest = await (async () => {
    await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
    await ready();
    return page.evaluate(() => Object.fromEntries(
      window.__deck.slides.map((s, i) => [s.id, i + 1])
    ));
  })();

  const enter = async (id, build) => {
    await page.goto(`${BASE}/?slide=${id}`, { waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(({ n, k }) => {
      sessionStorage.setItem('deck-state', JSON.stringify({ slideIndex: n - 1, buildStep: k }));
    }, { n: manifest[id], k: build });
    await page.reload({ waitUntil: 'networkidle' });
    await ready();
    await page.evaluate(() => {
      const chrome = document.querySelector('.deck-chrome');
      if (chrome) chrome.style.display = 'none';
    });
    await page.waitForTimeout(REDUCED ? 600 : 1800);
  };

  const table = [];
  for (const b of BOUNDARIES) {
    await enter(b.from[0], b.from[1]);
    const fractions = [];
    if (b.key) await page.keyboard.press(b.key);
    for (let i = 0; i < FRAMES; i += 1) {
      const buf = await page.screenshot();
      fractions.push(await litFraction(buf));
      if (i === 0 || i === FRAMES - 1 || b.cls === 'calibration') {
        fs.writeFileSync(
          path.join(SHOTS, `${b.cls === 'calibration' ? 'CALIBRATION' : b.name.replace(/[^\w]+/g, '-')}-f${i}.png`),
          buf
        );
      }
      await page.waitForTimeout(FRAME_MS);
    }
    const voids = fractions.filter((f) => f < VOID_LIT).length;
    const min = Math.min(...fractions);
    const row = {
      boundary: b.name,
      cls: b.cls,
      voidFrames: voids,
      minLit: `${(min * 100).toFixed(4)}%`,
      frames: fractions.map((f) => Number((f * 100).toFixed(4)))
    };
    table.push(row);

    if (b.cls === 'calibration') {
      check(`${b.name} — the detector calls black black`, min < VOID_LIT, row.minLit);
    } else if (b.cls === 'crossfade' || b.cls === 'build') {
      check(`${b.name} — zero void frames`, voids === 0, `${voids}/${FRAMES} void, min ${row.minLit}`);
    } else if (b.cls === 'from-black') {
      // Rising out of the authored hold: leading voids are the hold itself. The
      // window must end lit, and once it lights it must not go dark again.
      const lastLit = fractions[fractions.length - 1] >= VOID_LIT;
      const firstLitAt = fractions.findIndex((f) => f >= VOID_LIT);
      const fellBack = firstLitAt > -1 &&
        fractions.slice(firstLitAt).some((f) => f < VOID_LIT);
      check(`${b.name} — rises out of the hold and stays lit`,
        lastLit && !fellBack,
        `lights at frame ${firstLitAt}, ends ${(fractions[fractions.length - 1] * 100).toFixed(4)}%` +
        `${fellBack ? ', FELL BACK TO VOID' : ''}`);
    } else {
      // Authored black: the landing is darkness, so the requirement is that it
      // arrives monotonically and never relights inside the window.
      let relit = false;
      let seenVoid = false;
      fractions.forEach((f) => {
        if (f < VOID_LIT) seenVoid = true;
        else if (seenVoid && f > VOID_LIT * 8) relit = true;
      });
      check(`${b.name} — dims into its authored darkness and never relights`,
        !relit, `min ${row.minLit}, ${voids}/${FRAMES} void`);
    }
  }

  const failures = results.filter((r) => !r.ok);
  fs.writeFileSync(
    path.join(OUT, REDUCED ? 'flash-r7-results-rm.json' : 'flash-r7-results.json'),
    JSON.stringify({
      phase: 'R7',
      variant: REDUCED ? 'reduced-motion' : 'standard',
      frames: FRAMES,
      frameMs: FRAME_MS,
      voidThreshold: VOID_LIT,
      checks: results.length,
      failures: failures.length,
      table,
      results
    }, null, 2)
  );
  console.log('\n| Boundary | class | void frames | min lit |');
  console.log('|---|---|---|---|');
  table.forEach((r) => console.log(`| ${r.boundary} | ${r.cls} | ${r.voidFrames}/${FRAMES} | ${r.minLit} |`));
  console.log(`\nR7 flash ${REDUCED ? 'reduced-motion' : 'standard'}: ${results.length} boundaries, ${failures.length} failures`);
  await browser.close();
  process.exit(failures.length ? 1 : 0);
})();
